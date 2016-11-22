import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { LcModels } from '../../api/lcmodels/lcmodels.js';

import { renderHold } from '../launch-screen.js';
import './explore-map-page.html';

import '../components/explore/explore-map.js';

Template.Explore_map_page.onCreated(function exploreMapPageOnCreated() {
  this.getLcModelId = () => FlowRouter.getParam('lcModelId');

  this.autorun(() => {
	this.subscribe('lcModelById', this.getLcModelId());
	//this.subscribe('comps.inLcModel', this.getLcModelId());
  });
});

Template.Explore_map_page.onRendered(function exploreMapPageOnRendered() {
  this.autorun(() => {
	if (this.subscriptionsReady()) {
	  renderHold.release();
	}
  })
});

Template.Explore_map_page.helpers({
  subsReady() {
	return Template.instance().subscriptionsReady();
  },
  lcModelId() {
	const instance = Template.instance();
	return instance.getLcModelId(); 
  },
  mapArgs(lcModelId) {
	const lcModel = LcModels.findOne(lcModelId);
	const comps = lcModel && lcModel.comps();
	const riskModel = lcModel && lcModel.riskModel();
	return {
	  lcModelId,
	  comps,
	  riskModel,
	}
  },
})
