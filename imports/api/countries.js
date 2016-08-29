import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Match } from 'meteor/check';
import { check } from 'meteor/check';

export const Countries = new Mongo.Collection('countries');

if (Meteor.isServer) {
  Meteor.publish('countries', function componentsPublication() {
	return Countries.find();
  });
}

Meteor.methods({
  'countries.insert'(name, position, risks) {
	check(name, String);
	check(position, [Number]);
	check(risks, [String]);

	//todo check user authorization
	Countries.insert({name, position, risks});
  },
  'countries.delete'(countryId) {
	check(countryId, String);

	Countries.remove(countryId);
  },
  'countries.setRisk'(countryId, risk, value) {
	check(countryId, String);
	check(risk, String);
	check(value, String);

	Countries.update();
  },
});
