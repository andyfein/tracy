import './lcmodels-show-page.html';

//TODO launch screen?

import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Materialize } from 'meteor/poetic:materialize-scss';
import { $ } from 'meteor/jquery';
import { LcModels } from '../../api/lcmodels/lcmodels.js';
import { RiskModels } from '../../api/riskmodels/riskmodels.js';

import { insert } from '../../api/lcmodels/methods.js';

//Components
import '../components/lcmodels-item.js';

//TODO Connection error handling

Template.LcModels_show_page.onCreated(function lcModelsShowPageOnCreated() {
   //this.subscribe('lcmodels.public');
   //this.subscribe('lcmodels.private');
   this.subscribe('lcmodels');
   this.subscribe('riskmodels.public');
   this.subscribe('riskmodels.private');
});

Template.LcModels_show_page.onRendered(function lcModelsShowPageOnRendered() {
  $('select').material_select();
});

Template.LcModels_show_page.helpers({
  lcmodels() {
	return LcModels.find({userId: Meteor.userId()});
  },
  riskmodels() {
	return RiskModels.find({userId: Meteor.userId()});
  }
});

Template.LcModels_show_page.events({
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
