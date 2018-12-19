/**
 * View Controller for Holiday Editor Admin view
 * @class HolidayEditorController
 * @namespace Breeze.view.admin.HolidayEditorController
 * @alias controller.admin.holidayeditor
 */
Ext.define('Breeze.view.admin.HolidayEditorController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.holidayeditor',

    requires: [
        'Breeze.store.record.Holidays'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {
        var me = this,
            vm = me.getViewModel();
        
        this.loadHolidays(2018);
    },

    /**
     * Load holiday data for given year.
     * 
     * Marks first holiday as active after load completes
     * 
     * @param {(String|Number)} year Year to load data for
     */
    loadHolidays: function(year){
        var me = this;

        this.addStoreToViewModel(
            'Breeze.store.record.Holidays',
            'holidays',
            { 
                load: true, createOpts: { year: year },
                loadOpts: {
                    callback: function(records, op, success){
                        if(success && records.length > 0){
                            this.lookup('holidaysGrid').getSelectable()
                                .selectRange(0,0,false);
                        }
                    },
                    scope: me
                }
            }
        );
    },

    // ===[Event Handlers]===

    onHolidaySelect: function(grid, record, opts){
        var vm = this.getViewModel();

        vm.set('holidayData', Ext.clone(record.getData()));
        vm.set('floatingDate',
            (
                vm.get('holidayData.float_Day') !== 0 || 
                vm.get('holidayData.float_Week') !== 0
            )
        );
    },

    onHolidayCalendarDateSelect: function(picker){
        var vm = this.getViewModel(),
            date = picker.getValue();
        
        vm.set('holidayData.holiday_Date', date);
        this.floatsFromPickerDate();
    },

    /**
     * Handle floating holiday checkbox value change event
     * @param {Object} cmp 
     * @param {Boolean} newVal 
     * @param {Boolean} oldVal 
     */
    onFloatingHolidayToggle: function(cmp, newVal, oldVal){
        var vm = this.getViewModel();
        if(newVal !== oldVal){
            if(newVal){
                // Calculate floating date values
                this.floatsFromPickerDate();
            } else {
                // Reset floating date values
                vm.set('holidayData.float_Day',0);
                vm.set('holidayData.float_Week',0);
            }
        }
    },

    onFloatingHolidaySelectChange: function(cmp){
        console.info('Floating holiday selectors changed');
    },

    // ===[Helper]==

    floatsFromPickerDate: function(){
        var vm = this.getViewModel(),
            date = vm.get('holidayData.holiday_Date');
        vm.set(
            'holidayData.float_Week',
            Math.floor((date.getDate()-1)/7)
        );
        vm.set(
            'holidayData.float_Day',
            date.getDay()
        );
        this.lookup('floatMonth').setValue(
            date.getMonth()
        );
    },

    /**
     * From homemade/computeFloatingDate
     * @param {*} week 
     * @param {*} day 
     * @param {*} month 
     * @param {*} year 
     */
    computeFloating(week, day, month, year) {
        var date = new Date((+month + 1) + '/1/' + year)
    
        if (week != 4) { //if week is not 'last'
            date.setDate(1);
            var i = 1;
            //get the right week day
            while (date.getDay() != day) {
                date.setDate(++i);
            }
            date.setDate(i + (7 * week));
        } else {
            date.setMonth(date.getMonth() + 1);
            date.setDate(0);
            var i = (date.getDate() - 6);
            date.setDate(i);
            //get the right week day
            while (date.getDay() != day) {
                date.setDate(++i);
            }
        }
        return date
    }

});