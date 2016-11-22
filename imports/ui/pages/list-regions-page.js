import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './list-regions-page.html';

import { Regions } from '../../api/regions/regions.js';

import { insert } from '../../api/regions/methods.js';

//import '../components/regions/regions-item.js';

Template.List_regions_page.onCreated(function listRegionsPageOnCreated() {
  this.subscribe('regions');
});

Template.List_regions_page.helpers({
  regions() {
	return Regions.find({});
  },
});

Template.List_regions_page.events({
  'click .js-new-region'() {
	$('#modal-new-region').openModal();
  },
  'click .js-create-new-region'() {
	const name = $('#region-name').val().trim();
	insert.call({
	name: name,
	});

	$('#modal-new-region').closeModal();
  },
  'click .js-cancel-new-region'() {
	$('#modal-new-region').closeModal();
  }
})
