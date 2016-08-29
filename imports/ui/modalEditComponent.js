import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { Components } from '../api/components.js';
import { Countries } from '../api/countries.js';

import './modalEditComponent.html';

Template.modalEditComponent.onCreated(function modalEditComponentOnRendered() {
  Meteor.subscribe('countries');
});

Template.modalEditComponent.onRendered(function modalEditComponentOnRendered() {

});

Template.modalEditComponent.helpers({
  currentComponent() {
	if (Session.get('editedComponentId')) {
	  return Components.findOne({ _id: Session.get('editedComponentId')});
	}
  },
  checked(activities, activity) {
	if ($.inArray(activity, activities) != -1) {
	  return "checked";
	}
  },
  countries() {
	return Countries.find({});
  },
  updateSelect() {
	$('select').material_select();
  },
  selected(countryId) {
	const currentComponent = Components.findOne({ _id: Session.get('editedComponentId') });
	if (countryId == currentComponent.siteLocation) {
	  return "selected";
	} else if (countryId == "unknown") {
	  return "selected";
	}
  }

});
Template.modalEditComponent.events({
  'submit .edit-component'(event) {
	event.preventDefault();

	// get values from form element
	const target = event.target;
	const name = target.formComponentName.value;
	const firmName = target.formFirmName.value;
	const siteLocation = target.formSiteLocation.value;
	let activities = [];
	if (target.formContacted.checked) {
	  activities.push('contacted');
	}
	if (target.formVisited.checked) {
	  activities.push('visited');
	}
	if (target.formNegotiating.checked) {
	  activities.push('negotiating');
	}


	// if all values are empty, component type is unknown
	let type = 'component';
	if ( ! (name || firmName || siteLocation ) ) {
	  type = 'unknownComponent';
	}
	// set data and make component type not unknown
	Meteor.call('components.setData', Session.get('editedComponentId'),
				type , name, firmName, siteLocation, activities);

  }
})
