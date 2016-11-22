import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
//import { $ } from 'meteor/jquery';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

//import { insert, remove } from '../../../api/riskmodels/methods.js';
import './list-riskmodels.html';

Template.List_riskmodels.onCreated(function listRiskModelsOnCreated(){
  this.autorun(() => {
	new SimpleSchema({
	  riskModels: { type: Mongo.Cursor },
	}).validate(Template.currentData);
  });
});

Template.List_riskmodels.helpers({
  email() {
	return Meteor.user().emails[0].address;
  },
});

Template.List_riskmodels.events({
//  'click .js-new-riskmodel'() {
//	$('#modal-new-riskmodel').openModal();
//  },
//  'click .js-create-new-riskmodel'() {
//	const name = $('#riskmodel-name').val().trim();
//	insert.call({
//	  name: name,
//	  userId: Meteor.userId(),
//	});
//
//	$('#modal-new-riskmodel').closeModal();
//  },
//  'click .js-cancel-new-riskmodel'() {
//	$('#modal-new-riskmodel').closeModal();
//  },
//  'click .js-delete-riskmodel'() {
//	remove.call({
//	  riskmodelId: this._id,
//	});
//  },

});
