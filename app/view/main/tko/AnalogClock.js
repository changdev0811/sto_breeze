Ext.define('Breeze.view.main.tko.AnalogClock', {
	alias:'widget.main.tko.analogClock',
    extend: 'Ext.Container',

    requires:[
    	'Breeze.view.main.tko.AnalogClockController'
    ],

    controller:'main.tko.analogClock',

    items:[
    	{
    		xtype:'component',
    		userCls:'tko-analog-clock',
    		listeners:{
    			initialize:'onInit'
    		}
    	}
    ]


});