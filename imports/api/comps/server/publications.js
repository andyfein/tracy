import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Comps } from '../comps.js';
import { LcModels } from '../../lcmodels/lcmodels.js';

//Meteor.publish('comps.inLcModel', function compsinLcModel(lcmodelId) {
//  return Comps.find({ lcmodelId });
//});
Meteor.publishComposite('comps.inLcModel', function compsInLcModel(lcmodelId) {
  new SimpleSchema({
	lcmodelId: { type: String },
  }).validate({ lcmodelId });

  return {
	find() {
	  const query = {
		_id: lcmodelId,
	  };

	  const options = {
		fields: { _id: 1 },
	  };

	  return LcModels.find(query, options);
	},

	children: [{
	  find(lcmodel) {
		return Comps.find({ lcmodelId: lcmodel._id }, { fields: Comps.publicFields });
	  },
	}],
  };
});
