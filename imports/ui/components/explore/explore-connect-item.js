import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import './explore-connect-item.html';
import { Connects } from '../../../api/connects/connects.js';
import { Comps } from '../../../api/comps/comps.js';


Template.Explore_connect_item.onCreated(function exploreConnectItemOnCreated() {
  this.autorun(() => {
	new SimpleSchema({
	  connect: { type: Connects._helpers },
	  parent: { type: Comps._helpers },
	  child: { type: Comps._helpers },
	  compWidth: { type: Number },
	  compHeight: { type: Number },
	  gridWidth: { type: Number },
	  gridHeight: { type: Number },
	}).validate(Template.currentData());
  }); 
});

Template.Explore_connect_item.helpers({
  points() {
	const parentX = (this.parent.x * this.gridWidth) + (this.compWidth / 2),
	  parentY = (this.parent.y * this.gridHeight) + this.compHeight + 20,
	  childX = (this.child.x * this.gridWidth) + (this.compWidth / 2),
	  childY = (this.child.y * this.gridHeight);
	
	let pointsString = parentX + ',' + parentY;
	pointsString += ' ' + parentX + ',' + (parentY + 20);
	pointsString += ' ' + childX + ',' + (parentY + 20);
	pointsString += ' ' + childX + ',' + childY;

	return pointsString;
  },
});
