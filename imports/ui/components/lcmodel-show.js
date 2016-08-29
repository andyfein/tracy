import './lcmodel-show.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ReactiveDict } from 'meteor/reactive-dict';
import { $ } from 'meteor/jquery';

import './comps-item.js';
import './comps-shadow.js';
import './modal-edit-comp.js';
import './connect-item.js';

import {
  insert, 
} from '../../api/comps/methods.js';

import {
  connect,
} from '../../api/connects/methods.js';

Template.LcModel_show.onCreated(function lcmodelShowOnCreated() {
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

	// moving components
	movingComp: false,
	currentMoveX: 0,
	currentMoveY: 0,

	// connecting components
	connectingComp: false,
	parentComp: null,
	childComp: null,

	// editing components,
	editComp: null,

	// selecting risk view
	selectedValue: 's',
  });

  this.gridX = () => {
	return Math.round((this.state.get('currentMoveX') - this.state.get('currentPanX') - (this.state.get('compWidth') / 2)) / this.state.get('gridWidth'));
  };

  this.gridY = () => {
	return Math.round((this.state.get('currentMoveY') - this.state.get('currentPanY') - (this.state.get('compHeight') /2)) / this.state.get('gridHeight'));
  };

  this.drawTemporaryConnector = (parentX, parentY, mouseX, mouseY) => {
	parentX *= this.state.get('gridWidth');
	parentY *= this.state.get('gridHeight');

	let points = parentX + (this.state.get('compWidth') / 2);
	points += ',' + (parentY + this.state.get('compHeight') + 20);
	points += ' ' + (parentX + (this.state.get('compWidth') / 2));
	points += ',' + (parentY + this.state.get('compHeight') + 40);

	points += ' ' + (mouseX - this.state.get('currentPanX')) + ',' + (parentY + this.state.get('compHeight') + 40);

	$('#temporary-connector').attr('points', points);
  };
});

Template.LcModel_show.onRendered(function lcmodelShowOnRendered() {
  const initX = ($(window).width() / 2) - (this.state.get('compWidth') /2),
	initY = this.state.get('compHeight');
  this.state.set('currentPanX', initX); 
  this.state.set('currentPanY', initY); 

  $('select').material_select();
});

Template.LcModel_show.helpers({
  compArgs(comp) {
	const instance = Template.instance();
	const state = instance.state;
	return {
	  comp,
	  selectedValue: state.get('selectedValue'),
	  //TODO better pass risk value directly?
	  riskModelId: instance.data.lcmodel().riskModelId,
	  width: state.get('compWidth'),
	  height: state.get('compHeight'),
	  moving: state.equals('movingComp', comp._id),
	  onMovingChange(moving) {
		state.set('movingComp', moving ? comp._id : false);
	  },
	  connecting: state.equals('connectingComp', comp._id),
	  onConnectingChange(connecting) {
		state.set('parentComp', connecting ? comp : null);
		state.set('connectingComp', connecting ? comp._id : false);
	  },
	  onConnectingChildChange(connectingChild) {
		if(state.get('parentComp')) {
		  state.set('childComp', connectingChild ? comp : null); 
		} else {
		  state.set('childComp', null);
		}
	  },
	  tempX : state.get('currentMoveX'),
	  tempY : state.get('currentMoveY'),
	  gridX : instance.gridX(),
	  gridY : instance.gridY(),
	  gridWidth: state.get('gridWidth'),
	  gridHeight: state.get('gridHeight'),
	};
  },
  editArgs() {
	const state = Template.instance().state;
	return {
	  editComp: state.get('editComp'),
	}
  },
  shadowArgs() {
	const instance = Template.instance();
	return {
	  x: instance.gridX() * instance.state.get('gridWidth'),
	  y: instance.gridY() * instance.state.get('gridHeight'),
	  isVisible: (Boolean(instance.state.get('movingComp')) || Boolean(instance.state.get('connectingComp'))),
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

Template.LcModel_show.events({
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
	} else if(state.get('connectingComp')) {
	  const parentComp = state.get('parentComp');
	  instance.drawTemporaryConnector(parentComp.x, parentComp.y, event.pageX, event.pageY);
	}
  },
  'mouseup'(event, instance) {
	const state = instance.state;
	
	if(state.get('panning')) {
	  state.set('panning', false);
	  state.set('lastPanX', state.get('currentPanX'));
	  state.set('lastPanY', state.get('currentPanY'));
	} else if (state.get('movingComp')) {
	  state.set('movingComp', false);
	} else if (state.get('connectingComp')) {

	  if(state.get('childComp')) {
		const lcmodelId = instance.data.lcmodel()._id;
		connect.call({
		  lcmodelId: lcmodelId,
		  parentCompId: state.get('parentComp')._id,
		  childCompId: state.get('childComp')._id,
		})

	  } else {
		const lcmodelId = instance.data.lcmodel()._id;
		insert.call({
		  lcmodelId: lcmodelId,
		  //parentCompId: state.get('parentComp')._id,
		  x: Number(instance.gridX()),
		  y: Number(instance.gridY()),
		}, (error, result) => {
		  connect.call({
			lcmodelId: lcmodelId,
			parentCompId: state.get('parentComp')._id,
			childCompId: result,
		  });
		});
	  }
	  

	  state.set('connectingComp', false);
	  $('#temporary-connector').attr('points', '');
	}
  },
  'click .js-edit-comp'(event, instance) {
	const state = instance.state;
	// in this case "this" refers to a Comps_item instance
	// TODO -> better in comps-item.js?
	state.set('editComp', this.comp);
	$('#modal-edit-comp').openModal();
  },
  'change .js-select-risk'(event, instance) {
	const  state = instance.state;

	state.set('selectedValue', $(event.target).val());
  },
});
