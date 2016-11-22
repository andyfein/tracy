import './regions-item.html';

import { Template } from 'meteor/templating';

import { remove } from '../../api/regions/regions.js';

Template.Regions_item.events({
  'click .js-delete-region'() {
	remove.call({
	  regionId: this._id,
	});
  },
});
