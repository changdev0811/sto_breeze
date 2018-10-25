/**
 * Custom override of standard Ext.panel.Date minicalendar
 * 
 * Fires event dateselect on date click
 * 
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
        hideOutside: false,
        // Array of selected dates
        selectedDates: [],
        // Object containing start and end date of selected week
        selectedWeek: {start: null, end: null}
    },

    nextText: '',
    prevText: '',

    initialize: function(){
        var me = this;
        this.showFooter = false;
        me.callParent();
        me.getHeader().hide();
    },


    /**
     * Change selected dates by providing an array of dates
     * representing the week to select; first date of week will be
     * passed on to the value attribute
     * @param {Array} week Array of days in week to apply
     */
    changeSelectedDates: function(week){
        this.setValue(week[0]);
    },

    /**
     * Changes value of selectedWeek when selectedDates property changes.
     * Doesn't affect the value of selected dates
     * @param {Object} value New selectedDates value
     * @param {Object} oldValue Old selectedDates value
     */
    updateSelectedDates: function(value, oldValue){
        this.setSelectedWeek({
            start: value[0],
            end: value[6]
        });
        // console.info(this.getSelectedWeek());
    },

    /**
     * Override updateValue handler to enable full week selection
     */
    updateValue: function(value, oldValue) {
        var me = this,
            handler = me.getHandler(),
            selectedCls = me.selectedCls,
            cell;

        var newWeek = me.collectWeek(value);

        if (oldValue) {
            cell = me.getCellByDate(oldValue);
            if (cell) {
                Ext.fly(cell).removeCls(selectedCls);
            }

            var oldWeek = me.collectWeek(oldValue);
            for(var i=0;i<oldWeek.length;i++){
                cell = me.getCellByDate(oldWeek[i]);
                if(cell){
                    Ext.fly(cell).removeCls(selectedCls);
                }
            }
        }

        if (!me.isConfiguring) {
            if (me.hasFocus) {
                me.focusDate(value);
            } else {
                me.setFocusableDate(value);
            }
            cell = me.getCellByDate(value);
            if (cell) {
                Ext.fly(cell).addCls(selectedCls);
            }
            for(var i=0;i<newWeek.length;i++){
                cell = me.getCellByDate(newWeek[i]);
                if(cell){
                    Ext.fly(cell).addCls(selectedCls);
                }
            }
            me.setSelectedDates(newWeek);
            me.setTitleByDate(value);

            me.fireEvent('change', me, value, oldValue);

            if (handler) {
                Ext.callback(handler, me.scope, [me, value, oldValue]);
            }
        }
    },

    onDateClick: function(e){
        var me = this;
        this.callParent([e]);
        this.fireEvent('dateselect', me);
    },

    privates: {
        /**
         * Collects the week surrounding a date
         */
        collectWeek: function(date){
            // console.group('Week Collection');
            // console.info('Date: ', date);
            var weekDay = date.getDay();
            var weekStart = moment(date).add(-weekDay, 'days').toDate();
            // var weekEnd = moment(date).add(6 - weekDay, 'days').toDate();
            var days = [];
            // console.info('Week Start: ', weekStart, ' Week End: ', weekEnd);
            for(var i=0;i<7;i++){
                days.push(moment(weekStart).add(i,'days').toDate());
            }
            // console.groupEnd();
            return days;
        }
    }
    // listeners: {
    //     change: function(ref, val, old){
    //         console.info('Date changed; new: ', val, ' old: ', old);
    //         var weekDay = val.getDay();
    //         var weekStart = val.getDate() - weekDay;
    //         var weekEnd = val.getDate() + (6 - weekDay);
    //         var workingDate = new Date(val);
    //         for(var d = weekStart; d < weekEnd; d++){
    //             workingDate.setDate(d);
    //             var cell = ref.getCellByDate(workingDate);
    //             Ext.fly(cell).addCls(Ext.baseCSSPrefix + 'selected');
    //         }
    //     }
    // }
});