import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Regions } from './regions.js';

const REGION_ID_ONLY = new SimpleSchema({
  regionId: Regions.simpleSchema().schema('_id'),
}).validator({ clean: true, filter: false });

export const insert = new ValidatedMethod({
  name: 'regions.insert',
  validate: Regions.simpleSchema().pick(['name']).validator({ clean: true, filter: false }),
  run({ name }) {
	return Regions.insert({ name, regions: [] });
  },
});


export const remove = new ValidatedMethod({
  name: 'regions.remove',
  validate: REGION_ID_ONLY,
  run({ regionId }) {

	//TODO checkeditable etc
	
	Regions.remove(regionId);
  },
});

const REGIONS_METHODS = _.pluck([
  insert,
  remove,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 riskmodels operations per connection per second
  DDPRateLimiter.addRule({
	name(name) {
	  return _.contains(REGIONS_METHODS, name);
	},

	//Rate limit per connection ID
	connectionId() { return true; },

  }, 5, 1000)
}
