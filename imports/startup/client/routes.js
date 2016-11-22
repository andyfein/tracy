import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';

// Import to load these templates
import '../../ui/layouts/list-body.js';
import '../../ui/pages/list-explore-page.js';
import '../../ui/pages/list-lcmodels-page.js';
import '../../ui/pages/list-riskmodels-page.js';
import '../../ui/pages/list-regions-page.js';

import '../../ui/pages/app-not-found.js';

import '../../ui/layouts/explore-body.js';
import '../../ui/pages/explore-lcmodel-page.js';
import '../../ui/pages/explore-map-page.js';

import '../../ui/layouts/show-body.js';
import '../../ui/pages/show-lcmodel-page.js';
import '../../ui/pages/show-riskmodel-page.js';

// override accounts templates
import '../../ui/accounts/accounts-templates.js';

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('List_body', { main: 'List_explore_page'});
  },
});
FlowRouter.route('/lcmodels/', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  name: 'LcModels',
  action() {
	BlazeLayout.render('List_body', { main: 'List_lcmodels_page' });
  }
});
FlowRouter.route('/riskmodels/', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  name: 'RiskModels',
  action() {
	BlazeLayout.render('List_body', { main: 'List_riskmodels_page' });
  }
}); 
FlowRouter.route('/regions/', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  name: 'Regions',
  action() {
	BlazeLayout.render('List_body', { main: 'List_regions_page' });
  }
}); 

FlowRouter.route('/explore/:lcModelId', {
  name: 'Explore.lcModel',
  action() {
	BlazeLayout.render('Explore_body', { main: 'Explore_lcmodel_page' })
  }
});
FlowRouter.route('/explore/:lcModelId/map', {
  name: 'Explore.lcModel.map',
  action() {
	BlazeLayout.render('Explore_body', { main: 'Explore_map_page' });
  }
});

FlowRouter.route('/lcmodels/:lcModelId', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  name: 'LcModels.lcModel',
  action() {
	BlazeLayout.render('Show_body', { main: 'Show_lcmodel_page' });
  }
});
FlowRouter.route('/riskmodels/:riskModelId', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  name: 'RiskModels.riskModel',
  action() {
	BlazeLayout.render('Show_body', { main: 'Show_riskmodel_page' });
  }
});


// unknown routes
FlowRouter.notFound = {
  action() {
	BlazeLayout.render('List_body', { main: 'App_notFound'});
  },
};

AccountsTemplates.configureRoute('signIn', {
  name: 'sigin',
  path: '/signin',
});
AccountsTemplates.configureRoute('signUp', {
  name: 'join',
  path: '/join',
});
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd', {
  name: 'resetPwd',
  path: '/reset-password',
});
