import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Connects } from '../connects.js';
import { LcModels } from '../../lcmodels/lcmodels.js';

Meteor.publishComposite('connects.inLcModel', function connectsInLcModel(lcmodelId) {
  //TODO publish/update/delete dependent on Comps?
  new SimpleSchema({
	lcmodelId: { type: String },
  }).validate({ lcmodelId });

  return {
	find() {
	  const query = {
		_id: lcmodelId,
	  };

	  const options =  {
		fields: { _id: 1 },
	  };

	  return LcModels.find(query, options);
	},

	children: [{
	  find(lcmodel) {
		return Connects.find({ lcmodelId: lcmodel._id }, { fields: Connects.publicFields });
	  },
	}],
  };
});
