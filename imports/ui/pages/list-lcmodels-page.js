//TODO launch screen?

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './list-lcmodels-page.html';

import { LcModels } from '../../api/lcmodels/lcmodels.js';
import { RiskModels } from '../../api/riskmodels/riskmodels.js';

import { insert } from '../../api/lcmodels/methods.js';

//Components
import '../components/lcmodels-item.js';

//TODO Connection error handling

Template.List_lcmodels_page.onCreated(function listLcModelsPageOnCreated() {
   //this.subscribe('lcmodels.public');
   //this.subscribe('lcmodels.private');
   this.subscribe('lcmodels');
   this.subscribe('riskmodels.public');
   this.subscribe('riskmodels.private');
});

Template.List_lcmodels_page.onRendered(function listLcModelsPageOnRendered() {
  $('select').material_select();
});

Template.List_lcmodels_page.helpers({
  lcmodels() {
	return LcModels.find({userId: Meteor.userId()});
  },
  riskmodels() {
	return RiskModels.find({userId: Meteor.userId()});
  }
});

Template.List_lcmodels_page.events({
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
  },
  'click .js-cancel-new-lcmodel'() {
	$('#modal-new-lcmodel').closeModal();
  },
});
