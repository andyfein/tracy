import { Template } from 'meteor/templating';

import { LcModels } from '../../api/lcmodels/lcmodels.js';

import { renderHold } from '../launch-screen.js';
import './list-explore-page.html';

// Components
import '../components/explore/list-explore.js';


Template.List_explore_page.onCreated(function listExplorePageOnCreated() {
  this.autorun(() => {
	this.subscribe('lcModels');
  });
});

Template.List_explore_page.onRendered(function listExplorePageOnRendered() {
  this.autorun(() => {
	if (this.subscriptionsReady()) {
	  renderHold.release();
	}
  });
});

Template.List_explore_page.helpers({
  subsReady() {
	return Template.instance().subscriptionsReady();

  },
  listArgs() {
	return {
	  lcModels: LcModels.find({}),
	}
  }
});
