import './modal-edit-comp.html';


import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { Regions } from '../../api/regions/regions.js';
import {
  updateInfo,
} from '../../api/comps/methods.js';

Template.Modal_editComp.helpers({
  regions() {
	return Regions.find({});
  },
  selected(regionId) {
	if(!Template.currentData().editComp)
	  return;
	if (Template.currentData().editComp.siteLocation === regionId) {
	  return 'selected';
	}
  }
});

Template.Modal_editComp.events({
  'click .js-save-edit-comp'(event, instance) {
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
  },
  'click .js-cancel-edit-comp'(event, instance) {
	$('#modal-edit-comp').closeModal();
  },
});
