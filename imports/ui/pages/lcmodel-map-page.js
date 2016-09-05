import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { LcModels } from '../../api/lcmodels/lcmodels.js';

import './lcmodel-map-page.html';
import '../components/lcmodel-map.js';

Template.LcModel_map_page.onCreated(function lcModelMapPageOnCreated() {
  this.getLcModelId = () => FlowRouter.getParam('lcmodelId');

  this.autorun(() => {
	this.subscribe('comps.inLcModel', this.getLcModelId());
  });

});

Template.LcModel_map_page.helpers({
  lcmodelIdArray() {
	const instance = Template.instance();
	const lcmodelId = instance.getLcModelId();
	return LcModels.findOne(lcmodelId) ? [lcmodelId] : [];
  },
  lcmodelArgs(lcmodelId) {
	const instance = Template.instance();
	const lcmodel = LcModels.findOne(lcmodelId);
	const comps = lcmodel && lcmodel.comps();

	return {
	  subsReady: instance.subscriptionsReady(),
	  lcmodel() {
		return LcModels.findOne(lcmodelId);
	  },
	  comps,
	}
  },
})
