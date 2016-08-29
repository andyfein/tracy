import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { LcModels } from './lcmodels.js';
import { Comps } from '../comps/comps.js';

const LCMODEL_ID_ONLY = new SimpleSchema({
  lcmodelId: LcModels.simpleSchema().schema('_id'),
}).validator({ clean: true, filter: false });

export const insert = new ValidatedMethod({
  name: 'lcmodels.insert',
  validate: LcModels.simpleSchema().pick(['name', 'riskModelId', 'userId']).validator({ clean: true, filter: false }),
  run({ name, riskModelId, userId }) {
    const lcmodelId = LcModels.insert({ name, riskModelId, userId });

	const initialComp = {
	  lcmodelId,
	  name: name,
	  firmName: 'unknown',
	  siteLocation: 'unknown',
	  x: 0,
	  y: 0,
	}
	Comps.insert(initialComp);

	return lcmodelId;
  },
});

//export const makePrivate = new ValidatedMethod({
//  name: 'lists.makePrivate',
//  validate: LIST_ID_ONLY,
//  run({ listId }) {
//    if (!this.userId) {
//      throw new Meteor.Error('lists.makePrivate.notLoggedIn',
//        'Must be logged in to make private lists.');
//    }
//
//    const list = Lists.findOne(listId);
//
//    if (list.isLastPublicList()) {
//      throw new Meteor.Error('lists.makePrivate.lastPublicList',
//        'Cannot make the last public list private.');
//    }
//
//    Lists.update(listId, {
//      $set: { userId: this.userId },
//    });
//  },
//});
//
//export const makePublic = new ValidatedMethod({
//  name: 'lists.makePublic',
//  validate: LIST_ID_ONLY,
//  run({ listId }) {
//    if (!this.userId) {
//      throw new Meteor.Error('lists.makePublic.notLoggedIn',
//        'Must be logged in.');
//    }
//
//    const list = Lists.findOne(listId);
//
//    if (!list.editableBy(this.userId)) {
//      throw new Meteor.Error('lists.makePublic.accessDenied',
//        'You don\'t have permission to edit this list.');
//    }

    // XXX the security check above is not atomic, so in theory a race condition could
//    // result in exposing private data
//    Lists.update(listId, {
//      $unset: { userId: true },
//    });
//  },
//});

//export const updateName = new ValidatedMethod({
//  name: 'lists.updateName',
//  validate: new SimpleSchema({
//    listId: Lists.simpleSchema().schema('_id'),
//    newName: Lists.simpleSchema().schema('name'),
//  }).validator({ clean: true, filter: false }),
//  run({ listId, newName }) {
//    const list = Lists.findOne(listId);
//
//    if (!list.editableBy(this.userId)) {
//      throw new Meteor.Error('lists.updateName.accessDenied',
//        'You don\'t have permission to edit this list.');
//    }
//
//    // XXX the security check above is not atomic, so in theory a race condition could
//    // result in exposing private data
//
//    Lists.update(listId, {
//      $set: { name: newName },
//    });
//  },
//});

export const remove = new ValidatedMethod({
  name: 'lcmodels.remove',
  validate: LCMODEL_ID_ONLY,
  run({ lcmodelId }) {
//    const list = Lists.findOne(listId);
//
//    if (!list.editableBy(this.userId)) {
//      throw new Meteor.Error('lists.remove.accessDenied',
//        'You don\'t have permission to remove this list.');
//    }
//
//    // XXX the security check above is not atomic, so in theory a race condition could
//    // result in exposing private data
//
//    if (list.isLastPublicList()) {
//      throw new Meteor.Error('lists.remove.lastPublicList',
//        'Cannot delete the last public list.');
//    }

    LcModels.remove(lcmodelId);
  },
});

// Get list of all method names on Lists
const LISTS_METHODS = _.pluck([
  insert,
  remove,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 list operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(LISTS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
