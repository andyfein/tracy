import './regions-show-page.html';

import { Template } from 'meteor/templating';
import { Materialize } from 'meteor/poetic:materialize-scss';
import { $ } from 'meteor/jquery';
import { Regions } from '../../api/regions/regions.js';

import { insert } from '../../api/regions/methods.js';

import '../components/regions-item.js';

Template.Regions_show_page.onCreated(function regionsShowPageOnCreated() {
  this.subscribe('regions');
});

Template.Regions_show_page.helpers({
  regions() {
	return Regions.find({});
  },
});

Template.Regions_show_page.events({
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
