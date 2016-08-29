import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { RiskModels } from './riskmodels.js';
import { Regions } from '../regions/regions.js';

const RISKMODEL_ID_ONLY = new SimpleSchema({
  riskmodelId: RiskModels.simpleSchema().schema('_id'),
}).validator({ clean: true, filter: false });

export const insert = new ValidatedMethod({
  name: 'riskmodels.insert',
  validate: RiskModels.simpleSchema().pick(['name', 'userId']).validator({ clean: true, filter: false }),
  run({ name, userId }) {
	return RiskModels.insert({ name, userId, regions: [] });
  },
});

export const addEntry = new ValidatedMethod({
  name: 'riskmodels.addEntry',
  validate: new SimpleSchema({
	riskmodelId: RiskModels.simpleSchema().schema('_id'),
	newEntry: { type: RiskModels.entrySchema }, 
  }).validator({ clean: true, filter: false }),
  run({ riskmodelId, newEntry }) {
	RiskModels.update(riskmodelId, {
	  $push: { regions: newEntry }
	});
  },
});

export const deleteEntry = new ValidatedMethod({
  name: 'riskmodels.deleteEntry',
  validate: new SimpleSchema({
	riskmodelId: RiskModels.simpleSchema().schema('_id'),
	regionId: Regions.simpleSchema().schema('_id'),
  }).validator({ clean: true, filter: false }),
  run({ riskmodelId, regionId }) {
	RiskModels.update(riskmodelId, {
	  $pull: { regions: { regionId: regionId } }
	});
  },
});

export const remove = new ValidatedMethod({
  name: 'riskmodels.remove',
  validate: RISKMODEL_ID_ONLY,
  run({ riskmodelId }) {
	//TODO checkeditable etc
	RiskModels.remove(riskmodelId);
  },
});

const RISKMODELS_METHODS = _.pluck([
  insert,
  addEntry,
  deleteEntry,
  remove,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 riskmodels operations per connection per second
  DDPRateLimiter.addRule({
	name(name) {
	  return _.contains(RISKMODELS_METHODS, name);
	},

	//Rate limit per connection ID
	connectionId() { return true; },

  }, 5, 1000)
}
