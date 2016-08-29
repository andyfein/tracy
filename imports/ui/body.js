import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Components } from '../api/components.js';
import { Connectors } from '../api/connectors.js';

import './component.js';
import './connector.js';
import './modalEditComponent.js';
import './modalEditRisks.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('gridWidth', 250);
  this.state.set('gridHeight', 250);
  this.state.set('currentAction', 'none');
  this.state.set('currentPanX', 0);
  this.state.set('currentPanY', 0);
  this.state.set('currentZoom', 1);

  
  Session.set('connectorParent', null);
  Session.set('connectorChild', null);
  Session.set('selectedRisk', 's');

  this.snapShadowToGrid = (positionX, positionY) => {
	const canvasOffset = $('.canvas').offset();
	const gridMultiplierX = Math.round((positionX - 
										canvasOffset.left - 
										this.state.get('currentPanX')) 
									 / this.state.get('gridWidth'));
	let gridMultiplierY = Math.round((positionY - 
									  canvasOffset.top - 
									  this.state.get('currentPanY')) 
									 / this.state.get('gridHeight'));
	this.state.set('shadowX', gridMultiplierX 
					   * this.state.get('gridWidth')
					   );
	this.state.set('shadowY', gridMultiplierY 
					   * this.state.get('gridHeight')
					   );
	d3.select('#shadow-component')
	  .attr('x', this.state.get('shadowX'))
	  .attr('y', this.state.get('shadowY'));
  }
  this.drawTemporaryConnector = (parentX, parentY, mouseX, mouseY) => {
	let pointsString = (parentX + 92.5) + ',' + (parentY + 159) +
	  ' ' + (parentX + 92.5) + ','  + (parentY + 175); 

	if (Session.get('connectorChild') != null) {
	  const child = Components.findOne({ _id: Session.get('connectorChild')});
	  pointsString += ' ' + (child.x + 92.5) + ',' + (parentY + 175) +
		' ' + (child.x + 92.5) + ',' + (child.y);

	} else {
	  pointsString += ' ' + mouseX + ',' + (parentY + 175);
	}

	d3.select('#temporary-connector')
	  .attr('points', pointsString);
	
  }

  Meteor.subscribe('components');
  Meteor.subscribe('connectors');
});

Template.body.onRendered(function bodyOnRendered() {
  $('select').material_select();
});

Template.body.helpers({
  risks() {
	let risks = [
	  { 
		id: "cl",
		name: "Child Labor",
	  },
	  {
		id: "eo",
		name: "Equal Opportunity",
	  },
	  {
		id: "fa",
		name: "Freedom of Association",
	  },
	  {
		id: "fl",
		name: "Forced Labor",
	  },
	  {
		id: "fs",
		name: "Fair Salary"
	  },
	  {
		id: "hs",
		name: "Health and Safety",
	  },
	  {
		id: "sb",
		name: "Social Security"
	  },
	  {
		id: "wh",
		name: "Working Hours"
	  }


	];

	for (let i = 0; i < risks.length; i++) {
	  risks[i].style = "top: " + (i * 65) + "px; ";
	  risks[i].style += "left: " + 5 + "px; ";
	  if (i > 0) {
		risks[i].style += "position: absolute; "
	  }
	}

	return risks;
  },
  components() {
	return Components.find({});
  },
  connectors() {
	return Connectors.find({});
  }
});

Template.body.events({
  'mousemove'(event, instance) {
	let state = instance.state;
	// ... when adding a new component
	if (state.get('currentAction') == 'draggingCopy') {
	  // make component copy follow mouse
	  const copyPositionX = event.pageX - state.get('offsetX');
	  const copyPositionY = event.pageY - state.get('offsetY');
	  d3.select('#copy-' + state.get('draggedCopy'))
		.style('left', copyPositionX + 'px')
		.style('top',  copyPositionY + 'px');

	  // snap component shadow to grid
	  if (state.get('draggedCopy') == 'template-component') {
		instance.snapShadowToGrid(copyPositionX, copyPositionY);
	  }

	// ... when moving a component
	} else if (state.get('currentAction') == 'draggingComponent') {
	  // make component follow mouse
	  const canvasOffset = $('.canvas').offset();
	  const draggedComponentId = state.get('draggedComponentId');
	  const compPositionX = event.pageX - state.get('offsetX') 
		- canvasOffset.left - state.get('currentPanX');
	  const compPositionY = event.pageY  - state.get('offsetY') -
		state.get('currentPanY');
	  $('#' + draggedComponentId).attr('transform', 'translate(' + compPositionX
									   + ',' + compPositionY + ')');

	  // snap component shadow to grid
	  instance.snapShadowToGrid(compPositionX + canvasOffset.left + state.get('currentPanX'), compPositionY + state.get('currentPanY'));

	} else if (Session.get('connectorParent') != null) {
	  // draw temporary connector
	  const connectorParent = Components.findOne( {_id: Session.get('connectorParent') } );
	  const canvasOffset = $('.canvas').offset();

	  instance.drawTemporaryConnector(connectorParent.x, 
									  connectorParent.y,
									  event.pageX - canvasOffset.left - state.get('currentPanX'),
									  event.pageY);

	} else if (instance.state.get('currentAction') == 'panning') {
	  let state = instance.state;
	  const panDiffX = event.pageX - state.get('panStartX');
	  const panDiffY = event.pageY - state.get('panStartY');
	  state.set('lastPanX', state.get('currentPanX') + panDiffX);
	  state.set('lastPanY', state.get('currentPanY') + panDiffY);
	  d3.select('.zoom-pan')
		.attr('transform', 'translate(' + (state.get('currentPanX') + panDiffX) + ',' + (state.get('currentPanY') + panDiffY) + ')');

	}
  },
  'mousedown .canvas'(event, instance) {
	console.log('start panning')
	instance.state.set('currentAction', 'panning');
	instance.state.set('panStartX', event.pageX);
	instance.state.set('panStartY', event.pageY);
  },
  'mousedown .component'(event, instance) {
	event.preventDefault();
	event.stopPropagation();
	instance.state.set('draggedComponentId', event.currentTarget.id);
	instance.state.set('currentAction', 'draggingComponent');

	const offset = $('#' + event.currentTarget.id).offset();
	instance.state.set('offsetX', event.pageX  - offset.left);
	instance.state.set('offsetY', event.pageY - offset.top);

	//snap component shadow to grid
	const canvasOffset = $('.canvas').offset();
	const compPositionX = event.pageX - instance.state.get('offsetX') 
		- canvasOffset.left;
	const compPositionY = event.pageY  - instance.state.get('offsetY');
	instance.snapShadowToGrid(compPositionX + canvasOffset.left, compPositionY);
  },
  'mousedown .template'(event, instance) {
	event.preventDefault();

	let state = instance.state;
	state.set('currentAction', 'draggingCopy');
	state.set('draggedCopy', event.target.id);
	d3.select('#copy-' + state.get('draggedCopy'))
		.style('visibility', 'visible');

	let offset = $(event.target).offset();
	state.set('offsetX', event.pageX - offset.left);
	state.set('offsetY', event.pageY - offset.top);
  },
  'mouseup'(event, instance) {
	let state = instance.state;
	if (state.get('currentAction') == 'draggingCopy') {
	  // reset grabbed component copy
	  d3.select('#copy-' + state.get('draggedCopy'))
		.style('visibility', 'hidden');

	  // create new component with empty data
	  if (state.get('draggedCopy') == 'template-component') {
		Meteor.call('components.insert', 'unknownComponent', '', '', '', [''],
		  instance.state.get('shadowX'), instance.state.get('shadowY'));

	  }

	} else if (instance.state.get('currentAction') == 'draggingComponent') {
	  // snap component back to grid in case it was just moved a bit
	  $('#' + instance.state.get('draggedComponentId'))
		.attr('transform', 'translate(' + instance.state.get('shadowX') + 
			  ',' + instance.state.get('shadowY') + ')');

	  // set new x and y of component
	  Meteor.call('components.setPosition', 
				  instance.state.get('draggedComponentId').substr(1),
				  instance.state.get('shadowX'),
				  instance.state.get('shadowY'));
	} else if (Session.get('connectorParent') != null) {
	  // reset temporary connector 
	  Session.set('connectorParent', null);
	  d3.select('#temporary-connector')
		.attr('points', '');

	} else if (instance.state.get('currentAction') == 'panning') {
	  instance.state.set('currentPanX', instance.state.get('lastPanX'));
	  instance.state.set('currentPanY', instance.state.get('lastPanY'));
	}

	// remove component shadow and reset action state
	d3.select('#shadow-component').attr('x', -500).attr('y', -500);
	instance.state.set('currentAction', 'none');
  },
  'drag'(event) {
	event.preventDefault();
	event.stopPropagation();
  },
  'change .risk-select'(event) {
	Session.set('selectedRisk', event.target.value);


  },
  'click .action-edit-risks'(event) {
	$('#modal-edit-risks').openModal();
  }

});
