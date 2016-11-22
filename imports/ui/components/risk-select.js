import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { $ } from 'meteor/jquery';

import './risk-select.html';

Template.Risk_select.onCreated(function riskSelectOnCreated() {
	Session.set('selectedRisk', 's');
});

Template.Risk_select.onRendered(function riskSelectOnRendered() {
  $('select').material_select();
})

Template.Risk_select.events({
  'change .js-select-risk'(event) {
	Session.set('selectedRisk', $(event.target).val());
  },
});
