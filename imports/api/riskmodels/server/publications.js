import { Meteor } from 'meteor/meteor';

import { RiskModels } from '../riskmodels.js';

//Todo public, private
Meteor.publish('riskModels', function riskModelsPublic() {
  return RiskModels.find({});
});

Meteor.publishComposite('riskModelById', function riskModelById(riskModelId) {
  return {
	find() {
	  return RiskModels.find({_id: riskModelId});
	}
  }
});
