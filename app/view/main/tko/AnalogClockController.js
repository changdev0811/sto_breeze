Ext.define('Breeze.view.main.tko.AnalogClockController', {
	extend:'Ext.app.ViewController',
	alias:'controller.main.tko.analogClock',

	onInit:function(component, options){
		//+++ Insoect
		console.log("[onInit Analog Clock Controller]");
		console.log(component.el);

		var min = component.el.createChild( { tag:'div', 'class':'tko-analog-clock-min' } );
		var hrs = component.el.createChild( { tag:'div', 'class':'tko-analog-clock-hrs' } );
		var sec = component.el.createChild( { tag:'div', 'class':'tko-analog-clock-sec' } );

		console.log(min);

		// set the time
		var t = new Date();
		var s = (t.getSeconds() + (t.getMilliseconds() / 1000)) * 6;
		var m = (t.getMinutes() + (s / 360)) * 6;
		var h = ((t.getHours() % 12) + (m / 360)) * 30;

		min.dom.style.transform = 'rotateZ('+ m +'deg)';
		hrs.dom.style.transform = 'rotateZ('+ h +'deg)';
		sec.dom.style.transform = 'rotateZ('+ s +'deg)';

	}


});