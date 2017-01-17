/* global Materialize */
import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Session } from 'meteor/session';
import { ReactiveDict } from 'meteor/reactive-dict';
import { $ } from 'meteor/jquery';

import './show-lcmodel.html';

import { LcModelTreeEditable } from '../lcmodel-editable.js';
import '../legend.html';
import '../risk-select.js';

import './comps-item.js';
import './comps-shadow.js';
import './modal-edit-comp.js';
import './connect-item.js';

import { RiskModels } from '../../../api/riskmodels/riskmodels.js';


Template.Show_lcmodel.onCreated(function showLcModelOnCreated() {
  this.autorun(() => {
	new SimpleSchema({
	  lcModelId: { type: SimpleSchema.RegEx.Id },
      comps: { type: Mongo.Cursor },
      connects: { type: Mongo.Cursor },
	  // TODO: unsatisfying .. I have no idea what RiskModels._helpers does - RiskModels.schema doesn't work as I think it should
      riskModel: { type: RiskModels._helpers },

	}).validate(Template.currentData());
  });

  this.state = new ReactiveDict();
  this.state.setDefault({
	// canvas settings
	gridWidth: 250,
	gridHeight: 220,
	compWidth: 185,
	compHeight: 135,

	// panning canvas
	panning: false,
	oldMouseX: 0,
	oldMouseY: 0,
	currentPanX: 0,
	currentPanY: 0,
	currentScale: 1,

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

  // Mouse Position (X) on grid
  this.gridX = () => {
	let gridX;
	if(this.state.get('currentMoveX') <= 0) {
	  gridX = parseInt((this.state.get('currentMoveX') - (this.state.get('compWidth') /2)) / this.state.get('gridWidth') );
	} else {
	  gridX = parseInt((this.state.get('currentMoveX') + (this.state.get('compWidth') /2)) / this.state.get('gridWidth') );
	}
	return  gridX;
  };

  // Mouse Position (Y) on grid
  this.gridY = () => {
	let gridY;
	if(this.state.get('currentMoveY') <= 0) {
	  gridY = parseInt((this.state.get('currentMoveY') - (this.state.get('compHeight')/2)) / this.state.get('gridHeight') );
	} else {
	  gridY = parseInt((this.state.get('currentMoveY') + (this.state.get('compHeight')/2)) / this.state.get('gridHeight') );
	}
	return  gridY;
  };

  this.drawTemporaryConnector = (parentX, parentY) => {
	parentX *= this.state.get('gridWidth');
	parentY *= this.state.get('gridHeight');

	//starting at bottom of first component
	let points = parentX + (this.state.get('compWidth') / 2);
	points += ',' + (parentY + this.state.get('compHeight') + 20);
	//first edge of connector
	points += ' ' + (parentX + (this.state.get('compWidth') / 2));
	points += ',' + (parentY + this.state.get('compHeight') + 40);
	//second edge of connector
	points += ' ' + (this.gridX() * this.state.get('gridWidth') + this.state.get('compWidth')/2);
	//points += ' ' + this.gridX() * this.state.get('gridWidth');
	points += ',' + (parentY + this.state.get('compHeight') + 40);
	//ending at shadow component
	points += ' ' + (this.gridX() * this.state.get('gridWidth') + this.state.get('compWidth')/2);
	points += ',' + this.gridY() * this.state.get('gridHeight');

	//points += ' ' + ((mouseX - this.state.get('currentPanX'))/this.state.get('currentScale')) + ',' + (parentY + this.state.get('compHeight') + 40);

	$('#temporary-connector').attr('points', points);
  };
});

Template.Show_lcmodel.onRendered(function lcmodelShowOnRendered() {
  const initX = ($(window).width() / 2) - (this.state.get('compWidth') /2),
	initY = this.state.get('compHeight');
  this.state.set('currentPanX', initX); 
  this.state.set('currentPanY', initY); 

  let lcModel;
  lcModel = new LcModelTreeEditable('#lcmodel-canvas', Template.currentData().riskModel, Template.currentData().lcModelId, this);
  Template.currentData().comps.observe({
	added: function(doc) {
	  lcModel.addComp(doc);
	},
	changed: function(doc) {
	  lcModel.updateComp(doc);
	},
	removed: function(doc) {
	  lcModel.removeComp(doc);
	}
  });
  Template.currentData().connects.observe({
	added: function(doc) {
	  lcModel.addConnect(doc);
	},
	// TODO removed etc
  });
  this.autorun(() => {
	if(Session.get('selectedRisk')) {
	  lcModel.updateRisks();
	}
	
  });

});

Template.Show_lcmodel.helpers({
//  mouseFollowerX() {
//	return Template.instance().gridX() * Template.instance().state.get('gridWidth');
//  },
//  mouseFollowerY() {
//	return Template.instance().gridY() * Template.instance().state.get('gridHeight');
//  },
  compArgs(comp) {
	const templateInstance = Template.instance();
	const state = templateInstance.state;
	return {
	  comp,
	  riskModel: this.riskModel,
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
	  gridX : templateInstance.gridX(),
	  gridY : templateInstance.gridY(),
	  gridWidth: state.get('gridWidth'),
	  gridHeight: state.get('gridHeight'),
	  currentScale: state.get('currentScale'),
	};
  },
  editArgs() {
	const state = Template.instance().state;
	console.log(state.get('editComp'));
	return {
	  editComp: state.get('editComp'),
	  state: state,
	}
  },
  shadowArgs() {
	const templateInstance = Template.instance();
	const state = templateInstance.state;
	return {
	  x: templateInstance.gridX() ,
	  y: templateInstance.gridY() ,
	  gridWidth: state.get('gridWidth'),
	  gridHeight: state.get('gridHeight'),
	  //currentScale: state.get('currentScale'),
	  isVisible: (Boolean(templateInstance.state.get('movingComp')) || Boolean(templateInstance.state.get('connectingComp'))),
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
	  panY = state.get('currentPanY'),
	  scale = state.get('currentScale');

	return 'transform: translate(' + panX+ 'px,' + panY + 'px)scale(' + scale + ')';

  },
});

Template.Show_lcmodel.events({
//  'mousedown .canvas'(event, templateInstance) {
//	if(event.button != 0) return;
//	event.preventDefault();
//	const state = templateInstance.state;
//
//	state.set('panning', true);
//	state.set('oldMouseX', event.pageX);
//	state.set('oldMouseY', event.pageY);
//  },
//  'mousemove'(event, templateInstance) {
//	const state = templateInstance.state;
//
//	//tracking mouse for moving components -> TODO performance optimization?
//	state.set('currentMoveX', (event.pageX - state.get('currentPanX'))/state.get('currentScale'));
//	state.set('currentMoveY', (event.pageY - state.get('currentPanY'))/state.get('currentScale'));
//
//	if(state.get('panning')) {
//	  const newMouseX = event.pageX,
//		newMouseY = event.pageY;
//	  const diffPanX = newMouseX - state.get('oldMouseX'),
//		diffPanY = newMouseY - state.get('oldMouseY');
//	  state.set('oldMouseX', newMouseX);
//	  state.set('oldMouseY', newMouseY);
//	  state.set('currentPanX', state.get('currentPanX') + diffPanX);
//	  state.set('currentPanY', state.get('currentPanY') + diffPanY);
//	} else if(state.get('connectingComp')) {
//	  const parentComp = state.get('parentComp');
//	  templateInstance.drawTemporaryConnector(parentComp.x, parentComp.y);
//	}
//  },
//  'mouseup'(event, templateInstance) {
//	const state = templateInstance.state;
//
//	if(state.get('panning')) {
//	  state.set('panning', false);
//	  state.set('lastPanX', state.get('currentPanX'));
//	  state.set('lastPanY', state.get('currentPanY'));
//	} else if (state.get('movingComp')) {
//	  state.set('movingComp', false);
//	} else if (state.get('connectingComp')) {
//
//	  if(state.get('childComp')) {
//		connect.call({
//		  //TODO ... change to lcModelId ... has some consequences..
//		  lcmodelId: templateInstance.data.lcModelId,
//		  parentCompId: state.get('parentComp')._id,
//		  childCompId: state.get('childComp')._id,
//		});
//
//	  } else {
//		insert.call({
//		  lcmodelId: templateInstance.data.lcModelId,
//		  //parentCompId: state.get('parentComp')._id,
//		  x: Number(templateInstance.gridX()),
//		  y: Number(templateInstance.gridY()),
//		}, (error, result) => {
//		  connect.call({
//			lcmodelId: templateInstance.data.lcModelId,
//			parentCompId: state.get('parentComp')._id,
//			childCompId: result,
//		  });
//		});
//	  }
//
//
//	  state.set('connectingComp', false);
//	  $('#temporary-connector').attr('points', '');
//	}
//  },
//  'click .js-edit-comp'(event, templateInstance) {
//	const state = templateInstance.state;
//	// in this case "this" refers to a Comps_item templateInstance
//	// TODO -> better in comps-item.js?
//	state.set('editComp', this.comp);
//	$('#modal-edit-comp').openModal();
//
//	$('#comp-sitelocation').material_select();
//	Materialize.updateTextFields();
//  },
//  'change .js-select-risk'(event, templateInstance) {
//	const  state = templateInstance.state;
//
//	state.set('selectedValue', $(event.target).val());
//  },
//  'wheel svg'(event, templateInstance) {
//	const state = templateInstance.state;
//	const direction = event.originalEvent.deltaY;
//
//	if (direction > 0) {
//	  state.set('currentScale', state.get('currentScale') - 0.1);
//	} else if (direction < 0) {
//	  state.set('currentScale', state.get('currentScale') + 0.1);
//	}
//  },
//
});
