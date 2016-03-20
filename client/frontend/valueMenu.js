//Logic for valueMenu to select social Value

Template.valueMenu.helpers({
  selectedValue: function () {
	var selectedValue = Session.get('selectedValue');
	if (selectedValue == 's') return 'Social Sustainability Risk';
	else if (selectedValue == 'cl') return 'Child Labor Risk';
	else if (selectedValue == 'eo') return 'Discrimination Risk';
	else if (selectedValue == 'fa') return 'Freedom of Association Risk';
	else if (selectedValue == 'fl') return 'Forced Labor Risk';
	else if (selectedValue == 'fs') return 'Unfair Salary Risk';
	else if (selectedValue == 'hs') return 'Health and Safety Risk';
	else if (selectedValue == 'wh') return 'Working Hours Risk';
  }
});

Template.valueMenu.onRendered(function() {
  var items = document.querySelectorAll('.circle a');

  for(var i = 0, l = items.length; i < l; i++) {
	items[i].style.left = (-4 + 50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";

	items[i].style.top = (-4 + 50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
  }
});


Template.valueMenu.events({
  'click .icon': function(event, template) {
	  event.preventDefault();

	  if (! document.querySelector('.circle').classList.contains('open')) {
		document.querySelector('.circle').classList.add('open');
		document.querySelector('.main-button').classList.remove('icon-' + Session.get('selectedValue'));
		document.querySelector('.main-button').classList.add('icon-s');
	  } else {
		document.querySelector('.circle').classList.remove('open');
		document.querySelector('.main-button').classList.remove('icon-s');
		document.querySelector('.main-button').classList.add('icon-' + event.target.getAttribute('data-value'));
		Session.set('selectedValue', event.target.getAttribute('data-value'));
	  }

  }
});


