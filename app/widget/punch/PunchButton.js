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

    isButton: true,

    config: {
        micro: false,
        clockedIn: false
    },

    // === Style Class / Layout Constants ===

    // Class names toggled for micro/full mode
    fullCls: 'full',
    microCls: 'micro',

    // Class names for in/out
    inCls: 'in',
    outCls: 'out',

    // Layout modes
    fullLayout: 'hbox',
    microLayout: 'vbox',

    layout: 'hbox',

    baseCls: 'breeze-punch-punchclock',

    // === End of Constants ===

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

    /**
     * Passes new property value along to contained digitalClock and
     * updates style classes applied to component to make appearance reflect
     * new state
     */
    updateClockedIn: function(newVal, oldVal){
        this.getComponent('digitalClock').setClockedIn(newVal);
        this.toggleCls('in', newVal);
        this.toggleCls('out', !newVal);

    },

    items: [
        {
            xtype:'breeze.punch.analogclock',
            itemId: 'analogClock'
        }, {
            
            xtype:'breeze.punch.digitalclock',
            itemId: 'digitalClock',
            clockedIn:false,
            abbreviated:false
        }, {
            xtype: 'button',
            itemId: 'menuButton',
            docked: 'right',
            menuAlign: 'tr',
            ui: ['punchclock-button', 'punchclock-button-sm'],
            arrow: false,
            iconCls: 'x-fas fa-angle-right',
            menu: {
                xtype: 'menu',
                floated: true,
                reference: 'punchPopupMenu',
                defaults: { xtype: 'menuitem' },
                items: [
                    { 
                        text: 'Clock In',
                        icon: 'resources/icons/clock-in.svg',
                        itemId: 'mnuClockIn'
                    }, {
                        text: 'Clock Out',
                        icon: 'resources/icons/clock-out.svg',
                        itemId: 'mnuClockOut'
                    }
                ]
            }
        }
    ]
    

});