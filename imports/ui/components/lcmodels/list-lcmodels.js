import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

//import { LcModels } from '../../../api/lcmodels/lcmodels.js';
//import { RiskModels } from '../../../api/riskmodels/riskmodels.js';

import './list-lcmodels.html'
//import './lcmodels-item.js';


import { insert, remove } from '../../../api/lcmodels/methods.js';

Template.List_lcModels.onCreated(function listLcModelsOnCreated() {
  this.autorun(() => {
	new SimpleSchema({
	  lcModels: { type: Mongo.Cursor },
	  riskModels: { type: Mongo.Cursor },
	}).validate(Template.currentData());
  })
})

Template.List_lcModels.onRendered(function listLcModelsOnRendered() {
  $('select').material_select();
});

Template.List_lcModels.events({
  'click .js-new-lcmodel'() {
	//Materialize.updateTextFields();
	$('#modal-new-lcmodel').openModal();
  },
  'click .js-create-new-lcmodel'() {
	const name = $('#lcmodel-name').val().trim();
	const riskModelId = $('#riskmodel-id').val();
	insert.call({
	  name: name,
	  riskModelId: riskModelId,
	  userId: Meteor.userId(),
	});

	$('#modal-new-lcmodel').closeModal();
	//TODO better reset?
	$('#lcmodel-name').val('');
  },
  'click .js-cancel-new-lcmodel'() {
	$('#modal-new-lcmodel').closeModal();
	$('#lcmodel-name').val('');
  },
  'click .js-delete-lcmodel'() {
	remove.call({
	  lcModelId: this._id
	});
  }
});
