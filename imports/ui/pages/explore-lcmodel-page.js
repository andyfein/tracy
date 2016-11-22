import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { LcModels } from '../../api/lcmodels/lcmodels.js';

import { renderHold } from '../launch-screen.js';
import './explore-lcmodel-page.html';

import '../components/explore/explore-lcmodel.js';

Template.Explore_lcmodel_page.onCreated(function exploreLcModelPageOnCreated() {
  this.getLcModelId = () => FlowRouter.getParam('lcModelId');

  this.autorun(() => {
	this.subscribe('lcModelById', this.getLcModelId());
  });
});

Template.Explore_lcmodel_page.onRendered(function exploreLcModelPageOnRendered() {
  this.autorun(() => {
	if (this.subscriptionsReady()) {
	  renderHold.release();
	}
  });
});

Template.Explore_lcmodel_page.helpers({
  subsReady() {
	return Template.instance().subscriptionsReady();
  },
  lcModelId() {
	const instance = Template.instance();
	return instance.getLcModelId(); 
  },
  lcModelArgs(lcModelId) {
	const lcModel = LcModels.findOne(lcModelId);
	const comps = lcModel && lcModel.comps();
	const connects = lcModel && lcModel.connects();
	const riskModel = lcModel && lcModel.riskModel();
	return {
	  lcModelId,
	  comps,
	  connects,
	  riskModel
	};
  },
});
