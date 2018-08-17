/**
 * Punch Button component used in Nav
 * @class PunchButton
 * @namespace Breeze.widget.punch.PunchButton
 * @alias widget.breeze.punch.punchbutton
 * @extends Ext.Container
 */
Ext.define('Breeze.widget.punch.PunchButton', {
    extend: 'Ext.Container',
    alias: 'widget.breeze.punch.punchbutton',
    xtype: 'breeze-punchbutton',

    config: {
        micro: false,
    },

    // Class names toggled for micro/full mode
    fullCls: 'full',
    microCls: 'micro',

    fullLayout: 'hbox',
    microLayout: 'vbox',

    layout: 'hbox',

    baseCls: 'breeze-punch-punchclock',

    requires: [
        'Breeze.widget.punch.AnalogClock',
        'Breeze.widget.punch.DigitalClock'
    ],

    /**
     * Update appearance based on micro value
     */
    updateMicro: function(newVal, oldVal){
        // update abbreviations for digital clock
        this.getComponent('digitalClock').setAbbreviated(newVal);
        // update layout
        if(newVal == true){
            this.setLayout(this.microLayout);
        } else {
            this.setLayout(this.fullLayout);
        }
    },

    items: [
        {
            xtype:'breeze.punch.analogclock',
            itemId: 'analogClock'
        },{
            
            xtype:'breeze.punch.digitalclock',
            itemId: 'digitalClock',
            clockedIn:false,
            abbreviated:false
        }
    ]
    

});