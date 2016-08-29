import './lcmodel-public.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ReactiveDict } from 'meteor/reactive-dict';
import { $ } from 'meteor/jquery';

import './comps-item-public.js';
import './connect-item.js';


Template.LcModel_public.onCreated(function lcmodelPublicOnCreated() {
  this.autorun(() => {
    new SimpleSchema({
      lcmodel: { type: Function },
      subsReady: { type: Boolean },
      comps: { type: Mongo.Cursor },
      connects: { type: Mongo.Cursor },
    }).validate(Template.currentData());
  });

  this.state = new ReactiveDict();
  this.state.setDefault({
	// canvas settings
	gridWidth: 250,
	gridHeight: 200,
	compWidth: 185,
	compHeight: 135,

	// panning canvas
	panning: false,
	oldMouseX: 0,
	oldMouseY: 0,
	currentPanX: 0,
	currentPanY: 0,

	// selecting risk view
	selectedValue: 's',
  });

  this.gridX = () => {
	return Math.round((this.state.get('currentMoveX') - this.state.get('currentPanX') - (this.state.get('compWidth') / 2)) / this.state.get('gridWidth'));
  };

  this.gridY = () => {
	return Math.round((this.state.get('currentMoveY') - this.state.get('currentPanY') - (this.state.get('compHeight') /2)) / this.state.get('gridHeight'));
  };

});

Template.LcModel_public.onRendered(function lcmodelPublicOnRendered() {
  const initX = ($(window).width() / 2) - (this.state.get('compWidth') /2),
	initY = this.state.get('compHeight');
  this.state.set('currentPanX', initX); 
  this.state.set('currentPanY', initY); 

  $('select').material_select();
});

Template.LcModel_public.helpers({
  compArgs(comp) {
	const instance = Template.instance();
	const state = instance.state;
	const riskModelId = instance.data.lcmodel().riskModelId;
	return {
	  comp,
	  selectedValue: state.get('selectedValue'),
	  ////TODO better pass risk value directly?
	  riskModelId: riskModelId,
	  width: state.get('compWidth'),
	  height: state.get('compHeight'),
	  gridWidth: state.get('gridWidth'),
	  gridHeight: state.get('gridHeight'),
	};
  },
  connectArgs(connect) {
	const state = Template.instance().state;
	const parent = connect && connect.parent();
	const child = connect && connect.child();
	return {
	  connect,
	  parent,
	  child,
	  compWidth: state.get('compWidth'),
	  compHeight: state.get('compHeight'),
	  gridWidth: state.get('gridWidth'),
	  gridHeight: state.get('gridHeight'),
	};
  },
  transform() {
	const state = Template.instance().state;
	
	const panX = state.get('currentPanX'),
	  panY = state.get('currentPanY');
	return 'transform: translate(' + panX+ 'px,' + panY + 'px)';

  },
});

Template.LcModel_public.events({
  'mousedown .canvas'(event, instance) {
	if(event.button != 0) return;
	event.preventDefault();
	const state = instance.state;

	state.set('panning', true);
	state.set('oldMouseX', event.pageX);
	state.set('oldMouseY', event.pageY);
  },
  'mousemove'(event, instance) {
	const state = instance.state;

	//tracking mouse for moving components -> TODO performance optimization?
	state.set('currentMoveX', event.pageX);
	state.set('currentMoveY', event.pageY);

	if(state.get('panning')) {
	  const newMouseX = event.pageX,
	  newMouseY = event.pageY;
	  const diffPanX = newMouseX - state.get('oldMouseX'),
	  diffPanY = newMouseY - state.get('oldMouseY');
	  state.set('oldMouseX', newMouseX);
	  state.set('oldMouseY', newMouseY);
	  state.set('currentPanX', state.get('currentPanX') + diffPanX);
	  state.set('currentPanY', state.get('currentPanY') + diffPanY);
	} 
  },
  'mouseup'(event, instance) {
	const state = instance.state;
	
	if(state.get('panning')) {
	  state.set('panning', false);
	  state.set('lastPanX', state.get('currentPanX'));
	  state.set('lastPanY', state.get('currentPanY'));
	}
  },
  'change .js-select-risk'(event, instance) {
	const  state = instance.state;

	state.set('selectedValue', $(event.target).val());
  },
});
