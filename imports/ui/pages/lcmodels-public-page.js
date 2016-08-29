import './lcmodels-public-page.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { LcModels } from '../../api/lcmodels/lcmodels.js';

Template.LcModels_public_page.onCreated(function lcModelsPublicPageOnCreated() {
  this.subscribe('lcmodels');
});

Template.LcModels_public_page.helpers({
  lcmodels() {
	return LcModels.find({});
  },
});
