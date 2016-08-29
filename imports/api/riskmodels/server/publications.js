import { Meteor } from 'meteor/meteor';

import { RiskModels } from '../riskmodels.js';

//Todo public, private
Meteor.publish('riskmodels.public', function riskModelsPublic() {
  return RiskModels.find({ 
	userId: { $exists: false },
  }, {
	fields: RiskModels.publicFields,
  });
});

Meteor.publish('riskmodels.private', function lcmodelsPrivate() {
  if (!this.userId) {
    return this.ready();
  }

  return RiskModels.find({
    userId: this.userId,
  }, {
    fields: RiskModels.publicFields,
  });
});
