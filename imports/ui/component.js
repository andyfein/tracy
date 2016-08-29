import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';

import { Countries } from '../api/countries.js';

import './component.html';

Template.component.onCreated(function componentOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('showEditActions', false);

  Meteor.subscribe('countries');
});

Template.component.onRendered(function componentOnRendered() {
});

Template.component.helpers({
  hidden() {
	const instance = Template.instance();
	return instance.state.get('showEditActions') ? '' : 'hidden';
  },
  strokeWidth() {
	const instance = Template.instance();
	return instance.state.get('highlight') ? 2 : 1;
  },
  isUnknownComponent(type) {
	return type == 'unknownComponent';
  },
  contains(activities, activity) {
	if ($.inArray(activity, activities) != -1) {
	  return true;
	} else {
	  return false;
	}

  },
  activityX(activities, activity) {
	if (activities.length == 1) {
	  return 90;
	} else if (activities.length == 2){
	  return 60 + ($.inArray(activity, activities) * 40);
	} else if (activities.length == 3){
	  return 40 + ($.inArray(activity, activities) * 40);
	}

  },
  locationName(locationId) {
	  console.log(locationId);
	if (locationId == 'unknown') {
	  return 'unknown';
	} else if (Countries.findOne({ _id: locationId })){
	  return Countries.findOne({ _id: locationId }).name;
	}

  },
  riskLevel(locationId, type) {
	if (type == 'unknownComponent') {
	  return 'Unknown';
	} else {
	  const selectedRisk = Session.get('selectedRisk');
	  const country = Countries.findOne({ _id: locationId });
	  if (country) {
		return country.risks[selectedRisk];
	  } else {
		return 'Unknown';
	  }
	}

  }

});

Template.component.events({
  'mouseover .component'(event, instance) {
	// only show edit actions, if currently not connecting
	if (!Session.get('connectorParent')) {
	  instance.state.set('showEditActions', true);
	} else {
	  instance.state.set('highlight', true);
	  Session.set('connectorChild', instance.data._id);
	}
  },
  'mouseout .component'(event, instance) {
	instance.state.set('showEditActions', false);
	instance.state.set('highlight', false);
	Session.set('connectorChild', null);
  },
  'mouseup'(event, instance) {
	// if is currently connecting - create connection
	if (Session.get('connectorParent')) {
	  Meteor.call('connectors.insert', Session.get('connectorParent'),
				  instance.data._id);

	  Session.set('connectorParent', null);
	  d3.select('#temporary-connector')
		.attr('points', '');
	}
  },
  'mousedown .action-connect'(event, instance) {
	event.stopPropagation();
	event.preventDefault();
	// initialize connector
	if (!Session.get('connectorParent')) {
	  Session.set('connectorParent', instance.data._id);
	}
  },
  'click .action-edit'(event, instance) {
	event.stopPropagation();
	$('#modal-edit-component').openModal();
	Session.set('editedComponentId', instance.data._id);
  },
  'click .action-delete'(event) {
	event.stopPropagation();
	Meteor.call('components.delete', this._id);
  },
});
