import { Template } from 'meteor/templating';

import './list-riskmodels-page.html';

import { RiskModels } from '../../api/riskmodels/riskmodels.js';

import { renderHold } from '../launch-screen.js';

import '../components/riskmodels/list-riskmodels.js';

Template.List_riskmodels_page.onCreated(function listRiskModelsPageOnCreated() {
  this.autorun(() => {
	this.subscribe('riskModels');
  });
});
Template.List_riskmodels_page.onRendered(function listRiskModelsPageOnRendered() {
  this.autorun(() => {
	if (this.subscriptionsReady()) {
	  renderHold.release();
	}
  });
});

Template.List_riskmodels_page.helpers({
  subsReady() {
	return Template.instance().subscriptionsReady();
  },
  listArgs() {
	return {
	  riskModels: RiskModels.find({}),
	}
  }

});
