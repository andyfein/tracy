import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { Comps } from './comps.js';
import { Connects } from '../connects/connects.js';

export const insert = new ValidatedMethod({
  name: 'comps.insert',
  validate: Comps.simpleSchema().pick(['lcmodelId', 'name', 'firmName', 'siteLocation', 'x', 'y']).validator({ clean: true, filter: false }),
  //applyOptions: {
  //  onResultReceived: (error, result) => {
  //    console.log('method call');
  //    console.log(result);
  //  }
  //},
  run({ lcmodelId, name, firmName, siteLocation, x, y }) {
	//TODO sanity checks
	
	const comp = {
	  lcmodelId,
	  name,
	  firmName,
	  siteLocation,
	  x,
	  y,
	  contacted: false,
	  visited: false,
	  negotiating: false,
	  hasRetracted: false,
	  isRetracted: false,
	}

	return Comps.insert(comp);
  }
});

export const updateInfo = new ValidatedMethod({
  name: 'comps.updateInfo',
  validate: new SimpleSchema({
	compId: Comps.simpleSchema().schema('_id'),
	name: Comps.simpleSchema().schema('name'),
	firmName: Comps.simpleSchema().schema('firmName'),
	siteLocation: Comps.simpleSchema().schema('siteLocation'),
	contacted: Comps.simpleSchema().schema('contacted'),
	visited: Comps.simpleSchema().schema('visited'),
	negotiating: Comps.simpleSchema().schema('negotiating')
	//TODO clean set to false to allow for empty strings - any better idea?
  }).validator({ clean: false, filter: false }),
  run( { compId, name, firmName, siteLocation, contacted, visited, negotiating } ) {
	//TODO validate
	Comps.update(compId, {
	  $set: { name, firmName, siteLocation, contacted, visited, negotiating },
	});
  },
});

export const updatePosition = new ValidatedMethod({
  name: 'comps.updatePosition',
  validate: new SimpleSchema({
	compId: Comps.simpleSchema().schema('_id'),
	newX: Comps.simpleSchema().schema('x'),
	newY: Comps.simpleSchema().schema('y'),
  }).validator({ clean: true, filter: false }),
  run( { compId, newX, newY } ) {
	//TODO validate
	let initialComp = Comps.findOne({_id: compId});
	let oldX = initialComp.x;
	let oldY = initialComp.y;
	let diffX = newX - oldX;
	let diffY = newY - oldY;
	Comps.update(compId, {
	  $set: { x: newX, y: newY },
	});
	moveChildren(compId);
	function moveChildren(parentCompId) {
	  let connects = Connects.find({ parentCompId: parentCompId });	
	  connects.forEach(function(connect) {
		let childComp = Comps.findOne({_id: connect.childCompId});
		oldX = childComp.x;
		oldY = childComp.y;
		newX = oldX + diffX; 	
		newY = oldY + diffY;
		Comps.update(connect.childCompId, {$set: { x: newX, y: newY }})
		moveChildren(connect.childCompId);
	  });
	}
  },
});

export const remove = new ValidatedMethod({
  name: 'comps.remove',
  validate: new SimpleSchema({ compId: Comps.simpleSchema().schema('_id'), }).validator({ clean: true, filter: false }),
  run({ compId }) {
	//TODO sanity checks
	Connects.remove({ $or: [{ parentCompId: compId }, { childCompId: compId }] });
	Comps.remove(compId);
  },
});

export const toggleRetract = new ValidatedMethod({
  name: 'comps.toggleRetract',
  validate: new SimpleSchema({ compId: Comps.simpleSchema().schema('_id'), }).validator({ clean: true, filter: false }),
  run({ compId }) {
	let initialComp = Comps.findOne({_id: compId});
	let retractState = initialComp.hasRetracted;
	Comps.update(compId, {$set: {hasRetracted: !retractState}});
	retractChildren(compId);
	function retractChildren(parentCompId) {
	  let connects = Connects.find({ parentCompId: parentCompId });	
	  connects.forEach(function(connect) {
		Connects.update({childCompId: connect.childCompId}, {$set: {isRetracted: !retractState}})
		Comps.update(connect.childCompId, {$set: { isRetracted: !retractState, hasRetracted: false }})
		retractChildren(connect.childCompId);
	  });
	}
  }
});

const COMPS_METHODS = _.pluck([
  insert,
  updateInfo,
  updatePosition,
  toggleRetract,
  remove,
], 'name');

if (Meteor.isServer) {
  DDPRateLimiter.addRule({
	name(name) {
	  return _.contains(COMPS_METHODS, name);
	},
	connectionId() { return true; },
  }, 5, 1000);
}


