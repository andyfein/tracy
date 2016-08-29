import { Meteor } from 'meteor/meteor';

import { LcModels } from '../lcmodels.js';

Meteor.publish('lcmodels', function lcmodelsPublic() {
  return LcModels.find({}, 
					   {
						 fields: LcModels.publicFields,
					   });
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
