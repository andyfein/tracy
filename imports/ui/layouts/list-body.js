import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './list-body.html';

Template.List_body.onRendered(function appBodyOnRendered() { 
  // init side navigation for mobile screens
  $('.button-collapse').sideNav();

  // init drop down for large screen nav
  $('.dropdown-button').dropdown({
	constrain_width: false,
	belowOrigin: true,
	alignment: 'left'
  });
});

Template.List_body.events({
  'click .js-logout'() {
	Meteor.logout();
	//TODO maybe rerouting in private content
  }
});
