/**
 * Custom override of standard Ext.panel.Date minicalendar
 * @class MiniCalendar
 * @alias Breeze.widget.panel.MiniCalendar
 */
Ext.define('Breeze.widget.panel.MiniCalendar', {
    extend: 'Ext.panel.Date',
    alias: 'widget.panel.minicalendar',

    config: {
        // showFooter: false
        autoConfirm: true,
        headerLength: 1,

    },
    initialize: function(){
        var me = this;
        this.showFooter = false;
        me.callParent();
        me.getHeader().hide();
    }
});