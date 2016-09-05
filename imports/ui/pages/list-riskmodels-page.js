import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './list-riskmodels-page.html';

import { RiskModels } from '../../api/riskmodels/riskmodels.js';

import { insert } from '../../api/riskmodels/methods.js';

import '../components/riskmodels-item.js';

Template.List_riskmodels_page.onCreated(function listRiskModelsPageOnCreated() {
  this.subscribe('riskmodels.public');
  this.subscribe('riskmodels.private');
});

Template.List_riskmodels_page.helpers({
  riskmodels() {
	return RiskModels.find({userId: Meteor.userId()});
  },
});

Template.List_riskmodels_page.events({
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
