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
	//TODO clean set to false to allow for empty strings - any better idea?
  }).validator({ clean: false, filter: false }),
  run( { compId, name, firmName, siteLocation } ) {
	//TODO validate
	console.log("Server: " + siteLocation);
	Comps.update(compId, {
	  $set: { name, firmName, siteLocation },
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
	Comps.update(compId, {
	  $set: { x: newX, y: newY },
	});
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

const COMPS_METHODS = _.pluck([
  insert,
  updateInfo,
  updatePosition,
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


