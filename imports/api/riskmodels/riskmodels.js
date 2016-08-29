import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
//import { Factory } from 'meteor/factory';

//TODO import Countries etc

class RiskModelsCollection extends Mongo.Collection {
  insert(riskModel, callback) {
	// TODO possible to insert custom logic
	return super.insert(riskModel, callback);
  }

  update(selector, callback) {
	return super.update(selector, callback);
  }

  remove(selector, callback) {
	// TODO possible to insert custom logic
	return super.remove(selector, callback);
  }
}

export const RiskModels = new RiskModelsCollection('RiskModels');

// Deny all client-side udpates
RiskModels.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

RiskModels.entrySchema = new SimpleSchema({
  regionId: { type: String, regEx: SimpleSchema.RegEx.Id },
  cl: { type: Number, min: -1, max: 2 },
  eo: { type: Number, min: -1, max: 2 },
  fa: { type: Number, min: -1, max: 2 },
  fl: { type: Number, min: -1, max: 2 },
  fs: { type: Number, min: -1, max: 2 },
  sb: { type: Number, min: -1, max: 2 },
  hs: { type: Number, min: -1, max: 2 },
  wh: { type: Number, min: -1, max: 2 },
});

RiskModels.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  name: { type: String },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  regions: {type: [RiskModels.entrySchema]},
});

RiskModels.attachSchema(RiskModels.schema);

RiskModels.publicFields = {
  _id: 1,
  name: 1,
  userId: 1,
  regions: 1,
};

//Factory.define('riskModels', RiskModels, {});

RiskModels.helpers({
  // TODO define helpers (e.g. get all countries());

});
