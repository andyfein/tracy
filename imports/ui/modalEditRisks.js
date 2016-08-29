import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { Countries } from '../api/countries.js';

import './modalEditRisks.html';

Template.modalEditRisks.onCreated(function modalEditRisksOnCreated() {
  Meteor.subscribe('countries');
});

Template.modalEditRisks.onRendered(function modalEditRisksOnRendered() {
});
Template.modalEditRisks.helpers({
  countries() {
	return Countries.find({});
  },
  riskList() {
	let risks = this.risks;
	let riskArray = [];
	for (risk in risks) {
	  riskArray.push({name: risk, value: risks[risk]})
	}
	return riskArray;
  }
});
Template.modalEditRisks.events({
});

