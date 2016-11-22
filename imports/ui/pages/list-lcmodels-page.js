import { Template } from 'meteor/templating';

import { LcModels } from '../../api/lcmodels/lcmodels.js';
import { RiskModels } from '../../api/riskmodels/riskmodels.js';

import { renderHold } from '../launch-screen.js';
import './list-lcmodels-page.html';

import '../components/lcmodels/list-lcmodels.js';

Template.List_lcmodels_page.onCreated(function listLcModelsPageOnCreated() {
  this.autorun(() => {
	this.subscribe('lcModels');
	this.subscribe('riskModels');
  });
});

Template.List_lcmodels_page.onRendered(function listLcModelsPageOnRendered() {
  this.autorun(() => {
	if (this.subscriptionsReady()) {
	  renderHold.release();
	}
  });
});

Template.List_lcmodels_page.helpers({
  subsReady() {
	return Template.instance().subscriptionsReady();
  },
  listArgs() {
	return {
	  lcModels: LcModels.find({}),
	  riskModels: RiskModels.find({}),
	}
  }

});
