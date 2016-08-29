import './riskmodels-show-page.html';

import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Materialize } from 'meteor/poetic:materialize-scss';
import { $ } from 'meteor/jquery';
import { RiskModels } from '../../api/riskmodels/riskmodels.js';

import { insert } from '../../api/riskmodels/methods.js';

import '../components/riskmodels-item.js';

Template.RiskModels_show_page.onCreated(function riskModelsShowPageOnCreated() {
  this.subscribe('riskmodels.public');
  this.subscribe('riskmodels.private');
});

Template.RiskModels_show_page.helpers({
  riskmodels() {
	return RiskModels.find({userId: Meteor.userId()});
  },
});

Template.RiskModels_show_page.events({
  'click .js-new-riskmodel'() {
	$('#modal-new-riskmodel').openModal();
  },
  'click .js-create-new-riskmodel'() {
	const name = $('#riskmodel-name').val().trim();
	insert.call({
	  name: name,
	  userId: Meteor.userId(),
	});

	$('#modal-new-riskmodel').closeModal();
  },
  'click .js-cancel-new-riskmodel'() {
	$('#modal-new-riskmodel').closeModal();
  },
});
