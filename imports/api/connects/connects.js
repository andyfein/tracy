import { Mongo } from 'meteor/mongo';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Comps } from '../comps/comps.js';

class ConnectsCollection extends Mongo.Collection {
  insert(connect) {
	super.insert(connect);
  }
  remove(selector) {
	super.remove(selector);
  }
}

export const Connects = new ConnectsCollection('Connects');

Connects.deny({
  insert() { return true; },
  remove() { return true; },
});

Connects.schema = new SimpleSchema({
  _id: {
	type: String,
	regEx: SimpleSchema.RegEx.Id,
  },
  lcmodelId: {
	type: String,
	regEx: SimpleSchema.RegEx.Id,
  },
  parentCompId: {
	type: String,
	regEx: SimpleSchema.RegEx.Id,
  },
  childCompId: {
	type: String,
	regEx: SimpleSchema.RegEx.Id,
  },
  isRetracted: {
	type: Boolean
  }
});

Connects.attachSchema(Connects.schema);

Connects.publicFields = {
  lcModelId: 1,
  parentCompId: 1,
  childCompId: 1,
};

Connects.helpers({
  parent() {
	return Comps.findOne({ _id: this.parentCompId });
  },
  child() {
	return Comps.findOne({ _id: this.childCompId });
  },
});
