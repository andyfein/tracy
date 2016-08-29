import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
//import { Factory } from 'meteor/factory';
//
import { Comps } from '../comps/comps.js';
import { Connects } from '../connects/connects.js';

class LcModelsCollection extends Mongo.Collection {
  insert(lcmodel, callback) {
	//TODO validation
	return super.insert(lcmodel, callback);
  }
  remove(selector, callback) {
	// TODO  remove components etc
	return super.remove(selector, callback);
  }
}

export const LcModels = new LcModelsCollection('LcModels');

// Deny all client-side updates since we will be using methods to manage this collection
LcModels.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

LcModels.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  name: { type: String },
  riskModelId: { type: String, regEx: SimpleSchema.RegEx.Id },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id},
});

LcModels.attachSchema(LcModels.schema);

// This represents the keys from objects that should be published
// to the client. If we add secret properties to objects, don't list
// them here to keep them private to the server.
LcModels.publicFields = {
  name: 1,
  riskModelId: 1,
  userId: 1,
};

//Factory.define('list', Lists, {});

LcModels.helpers({
  // A list is considered to be private if it has a userId set
//  isPrivate() {
//	return !!this.userId;
//  },
//  isLastPublicList() {
//	const publicListCount = Lists.find({ userId: { $exists: false } }).count();
//	return !this.isPrivate() && publicListCount === 1;
//  },
//  editableBy(userId) {
//	if (!this.userId) {
//	  return true;
//	}
//
//	return this.userId === userId;
//  },
  
  comps() {
	return Comps.find({ lcmodelId: this._id });
  },
  connects() {
	return Connects.find({ lcmodelId: this._id });
  },
});
