import './riskmodels-item.html';

import { Template } from 'meteor/templating';

import { remove } from '../../api/riskmodels/methods.js';

Template.RiskModels_item.helpers({
  email() {
	return Meteor.user().emails[0].address;
  },
});

Template.RiskModels_item.events({
  'click .js-delete-riskmodel'() {
	remove.call({
	  riskmodelId: this._id,
	});
  },
});
