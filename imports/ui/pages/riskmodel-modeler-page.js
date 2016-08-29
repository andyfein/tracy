import './riskmodel-modeler-page.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { RiskModels } from '../../api/riskmodels/riskmodels.js';
import { Regions } from '../../api/regions/regions.js';

import '../components/riskmodel-show.js';

Template.RiskModel_modeler_page.onCreated(function riskmodelModelerPageOnCreated() {
  this.getRiskModelId = () => FlowRouter.getParam('riskmodelId');

  this.autorun(() => {
	//TODO subscribe to countries and aspects
	//this.subscribe('comps.inLcModel', this.getLcModelId());
	//this.subscribe('connects.inLcModel', this.getLcModelId());
  });

});

Template.RiskModel_modeler_page.helpers({
  // for animation purposes
  riskmodelIdArray() {
	const instance = Template.instance();
	const riskmodelId = instance.getRiskModelId();
	return RiskModels.findOne(riskmodelId) ? [riskmodelId] : []; 
  },
  riskmodelArgs(riskmodelId) {
	const riskmodel = RiskModels.findOne(riskmodelId);
	const regions  = Regions.find({});
	//const connects = lcmodel && lcmodel.connects();
	return {
	  //subsReady: instance.subscriptionsReady(),
	  riskmodel,
	  //riskmodel() {
	  //  return RiskModels.findOne(riskmodelId);
	  //},
	  regions,
	  //connects,
	};
  },
});
