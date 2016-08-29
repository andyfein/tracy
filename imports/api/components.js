import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Match } from 'meteor/check';
import { check } from 'meteor/check';

import { Connectors } from './connectors.js';

export const Components = new Mongo.Collection('components');

if (Meteor.isServer) {
  Meteor.publish('components', function componentsPublication() {
	return Components.find();
  });
}

Meteor.methods({
  'components.insert'(type, name, firmName, siteLocation, activities, x, y) {
	check(type, String);
	check(name, String);
	check(firmName, String);
	check(siteLocation, String);
	check(x, Match.Integer);
	check(y, Match.Integer);
	check(activities, [String]);

	//todo check user authorization
	Components.insert({ type, name, firmName, siteLocation, activities, x, y,
					  lastUpdated: new Date().valueOf() });
  },
  'components.delete'(componentId) {
	check(componentId, String);

	Connectors.remove({ $or: [ {parentId: componentId}, {childId: componentId} ] });

	Components.remove(componentId);
  },
  'components.setData'(componentId, type, name, firmName, siteLocation, activities) {
	check(type, String);
	check(name, String);
	check(firmName, String);
	check(siteLocation, String);
	check(activities, [String]);

	Components.update(componentId, { $set: { type, name, firmName,
					  siteLocation, activities, lastUpdated: new Date().valueOf() }});
  },
  'components.setPosition'(componentId, x, y) {
	check(componentId, String);
	check(x, Match.Integer);
	check(y, Match.Integer);

	Components.update(componentId, { $set: { x, y,
					  lastUpdated: new Date().valueOf() }});
  }
});
