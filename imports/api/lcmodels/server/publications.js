import { Meteor } from 'meteor/meteor';

import { LcModels } from '../lcmodels.js';
import { RiskModels } from '../../riskmodels/riskmodels.js';
import { Comps } from '../../comps/comps.js';
import { Connects } from '../../connects/connects.js';

// Publish all Life Cycle Models (without comps/connects/ for lists
Meteor.publishComposite('lcModels', function lcModels() {
  return {
	find() {
	  return LcModels.find({});
	},
	children: [
	  {
		find(lcModel) {
		  return RiskModels.find({ _id: lcModel.riskModelId });
		},
	  }
	],
  };
});

// Publish details of one Life Cycle Model
Meteor.publishComposite('lcModelById', function lcModelById(lcModelId) {
  return {
	find() {
	  return LcModels.find({_id: lcModelId});
	},
	children: [
	  {
		find(lcModel) {
		  return RiskModels.find({ _id: lcModel.riskModelId });
		},
	  },
	  {
		find(lcModel) {
		  return Comps.find({ lcmodelId: lcModel._id });
		},
	  },
	  {
		find(lcModel) {
		  return Connects.find({ lcmodelId: lcModel._id });
		},
	  },
	],
  };
});

//Meteor.publish('lcmodels.public', function lcmodelsPublic() {
//  return LcModels.find({
//    userId: { $exists: false },
//  }, {
//    fields: LcModels.publicFields,
//  });
//});
//
//Meteor.publish('lcmodels.private', function lcmodelsPrivate() {
//  if (!this.userId) {
//    return this.ready();
//  }
//
//  return LcModels.find({
//    userId: this.userId,
//  }, {
//    fields: LcModels.publicFields,
//  });
//});
