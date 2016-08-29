import './lcmodel-public-page.html';

import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { LcModels } from '../../api/lcmodels/lcmodels.js';

import '../components/lcmodel-public.js';

Template.LcModel_public_page.onCreated(function lcmodelPublicPageOnCreated() {
  this.getLcModelId = () => FlowRouter.getParam('lcmodelId');

  this.autorun(() => {
	this.subscribe('comps.inLcModel', this.getLcModelId());
	this.subscribe('connects.inLcModel', this.getLcModelId());
  });
});

Template.LcModel_public_page.onRendered(function lcmodelPublicPageOnRendered() {
  this.autorun(() => {
	if (this.subscriptionsReady()) {
	  // hold release
	}
  });
});

Template.LcModel_public_page.helpers({
  // for animation purposes
  lcmodelIdArray() {
	const instance = Template.instance();
	const lcmodelId = instance.getLcModelId();
	return LcModels.findOne(lcmodelId) ? [lcmodelId] : []; 
  },
  lcmodelArgs(lcmodelId) {
	const instance = Template.instance();
	const lcmodel = LcModels.findOne(lcmodelId, { fields: { _id: true } });
	const comps = lcmodel && lcmodel.comps();
	const connects = lcmodel && lcmodel.connects();
	return {
	  subsReady: instance.subscriptionsReady(),
	  lcmodel() {
		return LcModels.findOne(lcmodelId);
	  },
	  comps,
	  connects,
	};
  },
});
