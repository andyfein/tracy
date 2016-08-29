import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class RegionsCollection extends Mongo.Collection {
  insert(region, callback) {
	return super.insert(region, callback);
  }
  remove(selector, callback) {
	return super.remove(selector, callback);
  }
}

export const Regions = new RegionsCollection('Regions');

Regions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Regions.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  name: { type: String },
 // lat: { type: Number },
 // lng: { type: Number },
});

Regions.attachSchema(Regions.schema);

Regions.publicFields = {
  name: 1,
  //lat: 1,
  //lng: 1,
};

Regions.helpers({

});
