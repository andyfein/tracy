/* global Materialize */
import { Template } from 'meteor/templating';
import { CountryCodes } from 'meteor/3stack:country-codes';
import { $ } from 'meteor/jquery';

import './modal-edit-comp.html';
import {
  updateInfo,
} from '../../../api/comps/methods.js';

Template.Modal_editcomp.onRendered(function modalEditCompOnRendered() {
});

Template.Modal_editcomp.helpers({
  regions() {
	const countryArray = $.map(CountryCodes.getList(), function(value, index) {
	  return [{ code: index, name: value }];
	});
	return countryArray;
  },
  selected(regionId) {
	if(!Template.currentData().editComp)
	  return;
	if (Template.currentData().editComp.siteLocation === regionId) {
	  $('select').material_select();
	  return 'selected';
	}
  }
});

Template.Modal_editcomp.events({
  'click .js-save-edit-comp'() {
	const name = $('#comp-name').val().trim();
	const firmName = $('#comp-firmname').val().trim();
	const siteLocation = $('#comp-sitelocation').val();

	updateInfo.call({
	  compId: this.editComp._id,
	  name: name,
	  firmName: firmName,
	  siteLocation: siteLocation,
	});
	$('#modal-edit-comp').closeModal();
	$('#comp-name').val("");
	$('#comp-firmname').val("");
	$('#comp-sitelocation').val("");
	$('#comp-sitelocation').material_select();
	Materialize.updateTextFields();
  },
  'click .js-cancel-edit-comp'() {
	$('#modal-edit-comp').closeModal();
	$('#comp-name').val("");
	$('#comp-firmname').val("");
	$('#comp-sitelocation').val("");
	$('#comp-sitelocation').material_select();
	Materialize.updateTextFields();

	Materialize.updateTextFields();
  },

});
