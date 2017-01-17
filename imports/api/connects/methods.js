import { Meteor } from 'meteor/meteor';

import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { Connects } from './connects.js';

export const connect = new ValidatedMethod({
  name: 'connects.connect',
  validate: Connects.simpleSchema().pick(['lcmodelId', 'parentCompId', 'childCompId']).validator({ clean: true, filter: false }),
  run({ lcmodelId, parentCompId, childCompId }) {
	const connect = {
	  lcmodelId,
	  parentCompId,
	  childCompId,
	  isRetracted: false,
	};

	Connects.insert(connect);
  }
});

export const disconnect = new ValidatedMethod({
  name: 'connects.disconnect',
  validate: new SimpleSchema({ connectId: Connects.simpleSchema().schema('_id'), }).validator({ clean: true, filter: false }),
  run({ connectId }) {
	Connects.remove(connectId);
  },
});

const CONNECTS_METHODS = _.pluck([
  connect,
  disconnect,
], 'name');

if (Meteor.isServer) {
  DDPRateLimiter.addRule({
	name(name) {
	  return _.contains(CONNECTS_METHODS, name);
	},
	connectionId() { return true; },
  }, 5, 1000);
}
