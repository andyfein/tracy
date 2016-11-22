import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { LcModels } from '../../api/lcmodels/lcmodels.js';

import { renderHold } from '../launch-screen.js';
import './show-lcmodel-page.html';

import '../components/lcmodels/show-lcmodel.js';

Template.Show_lcmodel_page.onCreated(function showLcModelPageOnCreated() {
  this.getLcModelId = () => FlowRouter.getParam('lcModelId');

  this.autorun(() => {
	this.subscribe('lcModelById', this.getLcModelId());
  });
});

Template.Show_lcmodel_page.onRendered(function showLcModelPageOnRendered() {
  this.autorun(() => {
	if (this.subscriptionsReady()) {
	  renderHold.release();
	}
  });
});

Template.Show_lcmodel_page.helpers({
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

	//	const instance = Template.instance();
	//	const lcmodel = LcModels.findOne(lcmodelId, { fields: { _id: true } });
	//	const comps = lcmodel && lcmodel.comps();
	//	const connects = lcmodel && lcmodel.connects();
	//	return {
	//	  subsReady: instance.subscriptionsReady(),
	//	  lcmodel() {
	//		return LcModels.findOne(lcmodelId);
	//	  },
	//	  comps,
	//	  connects,
	//	};
  },
});
