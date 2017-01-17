import { Template } from 'meteor/templating';
import { CountryCodes } from 'meteor/3stack:country-codes';
import { ReactiveDict } from 'meteor/reactive-dict';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';

import './show-riskmodel.html';
//import { Regions } from '../../api/regions/regions.js';

import { 
  addEntry,
  deleteEntry,
} from '../../../api/riskmodels/methods.js';

Template.Show_riskmodel.onCreated(function showRiskModelOnCreated() {
  this.state = new ReactiveDict();
  this.state.setDefault({
	addedCountries: _.pluck(Template.currentData().riskModel.regions, 'regionId')
  });
});

Template.Show_riskmodel.onRendered(function riskModelShowOnRendered() {
  //console.log(CountryCodes.getList());

  $('select').material_select();
});

Template.Show_riskmodel.helpers({
  regionEntries() {
	return _.sortBy(this.riskModel.regions, function(entry) {
	  return CountryCodes.countryName(entry.regionId);
	});
  },
  regions() {
	const addedCountries = Template.instance().state.get('addedCountries');
	console.log('regions');
	console.log(Template.instance().state.get('addedCountries'));

	const countryArray = $.map(CountryCodes.getList(), function(value, index) {
	  if (!_.contains(addedCountries, index)) {
		return [{ code: index, name: value }];
	  }
	});
	return countryArray;
  },
  regionName(countryCode) {
	return CountryCodes.countryName(countryCode);
  },
  riskDesc(riskValue) {
	if (riskValue === -1) {
	  return 'undefined';
	} else if (riskValue === 0) {
	  return 'low';
	} else if (riskValue === 1) {
	  return 'medium';
	} else if (riskValue === 2) {
	  return 'high';
	}
  }
});

Template.Show_riskmodel.events({
  'click .js-add-region'() {
	$('#modal-add-region').openModal();
	$('select').material_select();
  },
  'click .js-add-new-region'(event, templateInstance) {
	const regionId = $('#select-region').val();
	console.log(regionId);
	const cl = $('#select-cl').val();
	const eo = $('#select-eo').val();
	const fa = $('#select-fa').val();
	const fl = $('#select-fl').val();
	const fs = $('#select-fs').val();
	const sb = $('#select-sb').val();
	const hs = $('#select-hs').val();
	const wh = $('#select-wh').val();
	addEntry.call({
	  riskmodelId: this.riskModel._id,
	  newEntry: {
		regionId,
		cl,
		eo,
		fa,
		fl,
		fs,
		sb,
		hs,
		wh,
	  },
	}, () => {
	  $('#modal-add-region').closeModal();
	  $('#select-cl').val("");
	  $('#select-eo').val("");
	  $('#select-fa').val("");
	  $('#select-fl').val("");
	  $('#select-fs').val("");
	  $('#select-sb').val("");
	  $('#select-hs').val("");
	  $('#select-wh').val("");	
	  templateInstance.state.set('addedCountries', _.pluck(templateInstance.data.riskModel.regions, 'regionId'));
	  console.log('added');
	  console.log(templateInstance.state.get('addedCountries'));
	  $('#select-region')[0].selectedIndex = 0;	
	  $('select').material_select();

	});

  },
  'click .js-cancel-add-region'() {
	$('#modal-add-region').closeModal();
	$('#select-cl').val("");
	$('#select-eo').val("");
	$('#select-fa').val("");
	$('#select-fl').val("");
	$('#select-fs').val("");
	$('#select-sb').val("");
	$('#select-hs').val("");
	$('#select-wh').val("");	
	$('#select-region')[0].selectedIndex = 0;	
	$('select').material_select();

  },
  'click .js-delete-entry'(event, templateInstance) {
	const riskModelId = templateInstance.data.riskModel._id;
	deleteEntry.call({
	  riskmodelId: riskModelId,
	  regionId: this.regionId,
	}, () => {

	  //templateInstance.state.set('addedCountries', _.pluck(templateInstance.data.riskModel.regions, 'regionId'));
	  $('#select-region')[0].selectedIndex = 0;	
	  $('select').material_select();
	});
  },


});
