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
        hideOutside: false,
        selectedDates: []
    },
    
    initialize: function(){
        var me = this;
        this.showFooter = false;
        me.callParent();
        me.getHeader().hide();
    },


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

    privates: {
        collectWeek: function(date){
            var weekDay = date.getDay();
            var weekStart = date.getDate() - weekDay;
            var weekEnd = date.getDate() + (6 - weekDay);
            var workingDate = new Date(date);
            var days = [];
            for(var d = weekStart; d < weekEnd + 1; d++){
                workingDate.setDate(d);
                days.push(new Date(workingDate));
            }
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