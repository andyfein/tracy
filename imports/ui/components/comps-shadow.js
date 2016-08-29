import './comps-shadow.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

Template.Comps_shadow.onCreated(function compsShadowOnCreated() {
  this.autorun(() => {
	new SimpleSchema({
	  x: { type: Number },
	  y: { type: Number },
	  isVisible: { type: Boolean },
	}).validate(Template.currentData());
  });
});

Template.Comps_shadow.helpers({
  display(){
	if(!this.isVisible) {
	  return 'display: none;';
	}
  }
});
