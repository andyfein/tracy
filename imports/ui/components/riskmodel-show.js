import './riskmodel-show.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Regions } from '../../api/regions/regions.js';

import { 
  addEntry,
  deleteEntry,
} from '../../api/riskmodels/methods.js';

Template.RiskModel_show.onRendered(function riskModelShowOnRendered() {
  $('select').material_select();
});

Template.RiskModel_show.helpers({
  entryArgs(entry) {
	entry.riskmodelId = Template.currentData().riskmodel._id;
	return entry;
  },
});

Template.RiskModel_show.events({
  'click .js-add-region'() {
	$('#modal-add-region').openModal();
  },
  'click .js-add-new-region'(event, instance) {
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
	  riskmodelId: this.riskmodel._id,
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
	});

	$('#modal-add-region').closeModal();
  },
  'click .js-cancel-add-region'() {
	$('#modal-add-region').closeModal();
  }

});

Template.RiskModel_entry.helpers({
  //TODO better in riskmodel-modeler-page.js? or via join?
  regionName(regionId) {
	return Regions.findOne( regionId ).name;
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

Template.RiskModel_entry.events({
  'click .js-delete-entry'(event, instance) {
	console.log(this);
	deleteEntry.call({
	  riskmodelId: this.riskmodelId,
	  regionId: this.regionId,
	});
  },
});
