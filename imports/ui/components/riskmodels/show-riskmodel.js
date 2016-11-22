import { Template } from 'meteor/templating';
import { CountryCodes } from 'meteor/3stack:country-codes';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';

import './show-riskmodel.html';
//import { Regions } from '../../api/regions/regions.js';

import { 
  addEntry,
  deleteEntry,
} from '../../../api/riskmodels/methods.js';

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
	const addedCountries = _.pluck(this.riskModel.regions, 'regionId');
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
  },
  'click .js-add-new-region'() {
	const regionId = $('#select-region').val();
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
	  $('select').material_select();
	});
	//update select field to show only  countries that were not added before

	$('#modal-add-region').closeModal();
  },
  'click .js-cancel-add-region'() {
	$('#modal-add-region').closeModal();
  },
  'click .js-delete-entry'(event, templateInstance) {
	const riskModelId = templateInstance.data.riskModel._id;
	deleteEntry.call({
	  riskmodelId: riskModelId,
	  regionId: this.regionId,
	}, () => {
	  $('select').material_select();
	});
  },


});
