/**
 * Punch Button component used in Nav
 * 
 * Has one listenable event, 'punch' which gives 
 *  function(comp, quick, kind) with quick as a bool indicating 
 *  if quick punch and kind as kind ('in', 'out', 'regular').
 * 
 * Events:
 *  - Fires event 'punch' when body or menu items are clicked
 *  - handler function(
 *      punchButtonRef:Object, quick:Boolean,
 *      kind ('in', 'out', 'regular'),
 *      eventObject:Object
 *    )
 * 
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
        clockedIn: false,
        allowed: {
            // Allow quick punches (clock in/out menu items)
            quick: true,
            // Allow regular punch (punch window menu item)
            regular: true
        }
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
        this.getComponent('punchBodyButton').getComponent('digitalClock').setAbbreviated(newVal);
        // update layout
        if(newVal == true){
            this.setLayout(this.microLayout);
            this.getComponent('punchBodyButton').setLayout('vbox');
        } else {
            this.setLayout(this.fullLayout);
            this.getComponent('punchBodyButton').setLayout('hbox');
        }
    },

    /**
     * Passes new property value along to contained digitalClock and
     * updates style classes applied to component to make appearance reflect
     * new state
     */
    updateClockedIn: function(newVal, oldVal){
        this.getComponent('punchBodyButton').getComponent('digitalClock').setClockedIn(newVal);
        this.toggleCls('in', newVal);
        this.toggleCls('out', !newVal);
        var menu = this.getComponent('menuButton').getMenu();
        menu.getComponent('mnuClockIn').setHidden(newVal || !this.getAllowed().quick);
        menu.getComponent('mnuClockOut').setHidden(!newVal || !this.getAllowed().quick);
        console.info('Clocked in? ', newVal);
    },

    /**
     * Handle the value of allowed getting changed
     */
    updateAllowed: function(newVal, oldVal){
        var menu = this.getComponent('menuButton').getMenu();
        menu.getComponent('mnuClockIn').setHidden(
            this.getClockedIn() || !newVal.quick
        );
        menu.getComponent('mnuClockOut').setHidden(
            !this.getClockedIn() || !newVal.quick
        );
        menu.getComponent('mnuPunchWindow').setHidden(
            !newVal.regular
        );
    },

    /**
     * Attach event listeners
     */
    afterRender: function(){
        var me = this;
        var menu = me.getComponent('menuButton').getMenu();
        menu.getComponent('mnuClockIn').setHandler(function(c,e,eOpts){
            me.fireEvent('punch', me, true, 'in', eOpts);
        });
        menu.getComponent('mnuClockOut').setHandler(function(c,e,eOpts){
            me.fireEvent('punch', me, true, 'out', eOpts);
        });
        menu.getComponent('mnuPunchWindow').setHandler(function(c,e,eOpts){
            me.fireEvent('punch', me, false, 'regular', eOpts);
        });
        me.getComponent('punchBodyButton').el.on('click',function(c,e,eOpts){
            me.fireEvent('punch', me, true, (me.getClockedIn())? 'out' : 'in');
        });
    },

    items: [
        {
            xtype: 'container',
            itemId: 'punchBodyButton',
            padding: 0, margin: 0,
            bodyAlign: 'stretch',
            flex: 1, layout: 'hbox',
            items: [
                {
                    xtype:'breeze.punch.analogclock',
                    itemId: 'analogClock'
                }, {
                    
                    xtype:'breeze.punch.digitalclock',
                    itemId: 'digitalClock',
                    clockedIn:false,
                    abbreviated:false
                }
            ]
        },
        {
            xtype: 'button',
            itemId: 'menuButton',
            docked: 'right',
            menuAlign: 'tr',
            userCls: 'breeze-punch-button',
            ui: ['punchclock-button', 'punchclock-button-sm'],
            arrow: false,
            iconCls: 'x-fas fa-angle-right',
            menu: {
                xtype: 'menu',
                floated: true,
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
                    }, {
                        text: 'Punch Window',
                        itemId: 'mnuPunchWindow',
                        disabled: true
                    }
                ]
            }
        }
    ]
    

});