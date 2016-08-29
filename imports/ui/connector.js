import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';

import { Components } from '../api/components.js';

import './connector.html';

Template.connector.onCreated(function connectorOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('showEditActions', false);
});

Template.connector.onRendered(function connectorOnRendered() {
});

Template.connector.helpers({
  points() {
	const data = Template.instance().data;
	const parent = Components.findOne({ _id: data.parentId });
	const child = Components.findOne({ _id: data.childId });


	return (parent.x +  92.5) + ',' + (parent.y + 159) + 
	  ' ' + (parent.x + 92.5) + ','  + (parent.y + 175) + 
	  ' ' + (child.x + 92.5) + ','  + (parent.y + 175) + 
	  ' ' + (child.x + 92.5) + ','  + (child.y); 
  },
  actionX() {
	const data = Template.instance().data;
	const child = Components.findOne({ _id: data.childId });

	return (child.x + 100);
  },
  actionY() {
	const data = Template.instance().data;
	const child = Components.findOne({ _id: data.childId });

	return (child.y - 20);

  },
  hidden() {
	const instance = Template.instance();
	return instance.state.get('showEditActions') ? '' : 'hidden';
  }
});


Template.connector.events({
  'mouseover .connector'(event, instance) {
	instance.state.set('showEditActions', true);
  },
  'mouseout .connector'(event, instance) {
	instance.state.set('showEditActions', false);
  },
  'click .action-delete'(event) {
	event.stopPropagation();
	Meteor.call('connectors.delete', this._id);
  }

});
