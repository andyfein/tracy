import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { renderHold } from '../launch-screen.js';
import './show-riskmodel-page.html';

import { RiskModels } from '../../api/riskmodels/riskmodels.js';

import '../components/riskmodels/show-riskmodel.js';

Template.Show_riskmodel_page.onCreated(function showRiskModelPageOnCreated() {
  this.getRiskModelId = () => FlowRouter.getParam('riskModelId');

  this.autorun(() => {
	this.subscribe('riskModelById', this.getRiskModelId());
  });

});

Template.Show_riskmodel_page.onRendered(function exploreRiskModelPageOnRendered() {
  this.autorun(() => {
	if (this.subscriptionsReady()) {
	  renderHold.release();
	}
  });
});


Template.Show_riskmodel_page.helpers({
  subsReady() {
	return Template.instance().subscriptionsReady();
  },
  riskModelId() {
	const instance = Template.instance();
	return instance.getRiskModelId();
  },
  riskModelArgs(riskModelId) {
	const riskModel = RiskModels.findOne(riskModelId);
	return {
	  riskModel,
	};
  },
});
