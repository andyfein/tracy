import { Mongo } from 'meteor/mongo';
//import { Factory }
//import faker
//

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { LcModels } from '../lcmodels/lcmodels.js';

class CompsCollection extends Mongo.Collection {
  insert(comp) {
	return super.insert(comp);
  }
  update(selector, modifier) {
	return super.update(selector, modifier);
  }
  remove(selector) {
	return super.remove(selector);
  }
}

export const Comps = new CompsCollection('Comps');

Comps.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Comps.schema = new SimpleSchema({
  _id: {
	type: String,
	regEx: SimpleSchema.RegEx.Id,
  },
  lcmodelId: {
	type: String,
	regEx: SimpleSchema.RegEx.Id,
	denyUpdate: true,
  },
  name: {
	type: String,
	max: 100,
	optional: true,
  },
  firmName: {
	type: String,
	max: 100,
	optional: true,
  },
  siteLocation: {
	type: String,
	max: 100,
	//TODO no regex to allow empty strings - better idea?
	//regEx: SimpleSchema.RegEx.Id,
	optional: true,
  },
  x: {
	type: Number,
  },
  y: {
	type: Number,
  },
});

Comps.attachSchema(Comps.schema);

Comps.publicFields = {
  lcmodelId: 1,
  name: 1,
  firmName: 1,
  siteLocation: 1,
  x: 1,
  y: 1,
};

Comps.helpers({
  // for some reasons needed in comps-item.js SimpleSchema -> Comps._helpers
});
