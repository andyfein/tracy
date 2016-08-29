import './lcmodels-item.html';

import { Template } from 'meteor/templating';

import { remove } from '../../api/lcmodels/methods.js';

Template.LcModels_item.helpers({
  email() {
	return Meteor.user().emails[0].address;
  }

});

Template.LcModels_item.events({
  'click .js-delete-lcmodel'() {
	remove.call({
	  lcmodelId: this._id,
	});
  }
});
