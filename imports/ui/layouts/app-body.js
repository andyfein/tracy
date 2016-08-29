import './app-body.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '../components/loading.js';

Template.App_body.onCreated(function appBodyOnCreated() {

});

Template.App_body.onRendered(function appBodyOnRendered() {

  $('.dropdown-button').dropdown({
	constrain_width: false,
	belowOrigin: true,
	alignment: 'left'
  });
});

Template.App_body.events({
  'click .js-logout'() {
	Meteor.logout();
	//TODO maybe rerouting in private content
  }
});
