import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
//import { Components } from '../../api/models/components.js';

import './root-redirector.html';

Template.app_rootRedirector.onCreated(() => {
  Meteor.defer(() => {
	//FlowRouter.go('Main.Modeler', Models.findOne());
	FlowRouter.go('RiskModels.show');
  });
})
