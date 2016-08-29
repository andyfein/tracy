import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Match } from 'meteor/check';
import { check } from 'meteor/check';

export const Connectors = new Mongo.Collection('connectors');

if (Meteor.isServer) {
  Meteor.publish('connectors', function connectorsPublication() {
	return Connectors.find();
  });
}

Meteor.methods({
  'connectors.insert'(parentId, childId) {
	check(parentId, String);
	check(childId, String);

	Connectors.insert({ parentId, childId });
  },
  'connectors.delete'(connectorId) {
	check(connectorId, String);

	Connectors.remove(connectorId);

  }

});
