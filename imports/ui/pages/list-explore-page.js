import { Template } from 'meteor/templating';

import './list-explore-page.html';

import { LcModels } from '../../api/lcmodels/lcmodels.js';

Template.List_explore_page.onCreated(function listExplorePageOnCreated() {
  this.subscribe('lcmodels');
});

Template.List_explore_page.helpers({
  lcmodels() {
	return LcModels.find({});
  },
});
