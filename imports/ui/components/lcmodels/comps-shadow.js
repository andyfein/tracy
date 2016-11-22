import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import './comps-shadow.html';

Template.Comps_shadow.onCreated(function compsShadowOnCreated() {
  this.autorun(() => {
	new SimpleSchema({
	  x: { type: Number },
	  y: { type: Number },
      gridWidth: { type: Number },
      gridHeight: { type: Number },
	  isVisible: { type: Boolean },
	}).validate(Template.currentData());
  });
});

Template.Comps_shadow.helpers({
  display(){
	if(!this.isVisible) {
	  return 'display: none;';
	}
  },
  transform() {
	return 'translate(' + this.x * this.gridWidth + ',' + this.y * this.gridHeight + ')';
  }
});
