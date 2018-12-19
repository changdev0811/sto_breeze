/**
 * Custom override of standard Ext.panel.Date minicalendar
 * 
 * Fires event dateselect on date click
 * 
 * @class MiniCalendarSngle
 * @alias Breeze.widget.panel.MiniCalendarSingle
 */
Ext.define('Breeze.widget.panel.MiniCalendarSingle', {
    extend: 'Ext.panel.Date',
    alias: 'widget.panel.minicalendarsingle',

    config: {
        // showFooter: false
        autoConfirm: true,
        headerLength: 1,
        hideOutside: false,
        // Array of selected dates
        // selectedDates: [],
        // // Object containing start and end date of selected week
        // selectedWeek: {start: null, end: null}
    },

    nextText: '',
    prevText: '',

    initialize: function(){
        var me = this;
        this.showFooter = false;
        me.callParent();
        me.getHeader().hide();
    },



    // onDateClick: function(e){
    //     var me = this;
    //     this.callParent([e]);
    //     this.fireEvent('dateselect', me);
    // },

});