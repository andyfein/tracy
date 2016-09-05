import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';

// Import to load these templates
import '../../ui/layouts/list-body.js';
import '../../ui/pages/list-explore-page.js';
import '../../ui/pages/list-lcmodels-page.js';
import '../../ui/pages/list-riskmodels-page.js';

import '../../ui/layouts/public-body.js';


import '../../ui/layouts/model-body.js';

import '../../ui/pages/lcmodel-public-page.js';
import '../../ui/pages/riskmodel-modeler-page.js';
import '../../ui/pages/lcmodel-modeler-page.js';
import '../../ui/pages/lcmodel-map-page.js';
import '../../ui/pages/regions-show-page.js';
import '../../ui/pages/app-not-found.js';

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


FlowRouter.route('/explore/:lcmodelId', {
  name: 'Explore',
  action() {
	BlazeLayout.render('Public_body', { main: 'LcModel_public_page' })
  }
});
FlowRouter.route('/explore/:lcmodelId/map', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  name: 'Explore.map',
  action() {
	BlazeLayout.render('Public_body', { main: 'LcModel_map_page' });
  }
});

FlowRouter.route('/lcmodels/:lcmodelId', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  name: 'LcModels.edit',
  action() {
	BlazeLayout.render('Model_body', { main: 'LcModel_modeler_page' });
  }

});

FlowRouter.route('/lcmodels/:lcmodelId/map', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  name: 'LcModels.map',
  action() {
	BlazeLayout.render('Model_body', { main: 'LcModel_map_page' });
  }

});

FlowRouter.route('/riskmodels/', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  name: 'RiskModels.show',
  action() {
	BlazeLayout.render('List_body', { main: 'RiskModels_show_page' });
  }
}); 

FlowRouter.route('/riskmodels/:riskmodelId', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  name: 'RiskModels.edit',
  action() {
	BlazeLayout.render('Model_body', { main: 'RiskModel_modeler_page' });
  }
});

FlowRouter.route('/regions/', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  name: 'Regions.show',
  action() {
	BlazeLayout.render('List_body', { main: 'Regions_show_page' });
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
})
