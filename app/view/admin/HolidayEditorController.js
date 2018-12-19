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
        'Breeze.store.record.Holidays',
        'Breeze.api.admin.HolidayEditor'
    ],

    /**
     * Called when the view is created
     */
    onInit: function (component) {
        var me = this,
            vm = me.getViewModel();
            vm.set('currentYear', (new Date()).getYear() + 1900);
            // changing current year automatically fires loadHolidays
        this.api = Ext.create('Breeze.api.admin.HolidayEditor');

        // this.loadHolidays(vm.get('currentYear'));
    },

    /**
     * Load holiday data for given year.
     * 
     * Marks first holiday as active after load completes
     * 
     * @param {(String|Number)} year Year to load data for
     */
    loadHolidays: function (year, id) {
        var me = this,
            dateSelector = me.lookup('dateSelector');

        // Restrict date selector range
        dateSelector.setMinDate(new Date(`1/1/${year}`));
        dateSelector.setMaxDate(new Date(`12/31/${year}`));


        // TODO: Finish selection of row by ID
        this.addStoreToViewModel(
            'Breeze.store.record.Holidays',
            'holidays',
            {
                load: true, createOpts: { year: year },
                loadOpts: {
                    callback: function (records, op, success) {
                        if (success && records.length > 0) {
                            var record = records[0];
                            if (!Object.isUnvalued(id)) {
                                record = records.find((r) => {
                                    return r.get('unique_Number') == id;
                                });
                            }
                            this.lookup('holidaysGrid').getSelectable()
                                .setSelectedRecord(record);
                        }
                    },
                    scope: me
                }
            }
        );
    },

    // ===[Event Handlers]===

    onHolidaySelect: function (grid, record, opts) {
        var vm = this.getViewModel();

        vm.set('holidayData', Ext.clone(record.getData()));

        vm.set('floatingDate',
            (
                vm.get('holidayData.float_Day') !== 0 ||
                vm.get('holidayData.float_Week') !== 0
            )
        );
        if (vm.get('floatingDate')) {
            // Adjust float day and week
            vm.set(
                'holidayData.float_Week',
                Math.max(0, vm.get('holidayData.float_Week') - 1)
            );
            vm.set(
                'holidayData.float_Day',
                Math.max(0, vm.get('holidayData.float_Day') - 1)
            );
        }
        this.lookup('dateSelector').setValue(vm.get('holidayData.holiday_Date'));
    },

    onHolidayCalendarDateSelect: function (picker) {
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
    onFloatingHolidayToggle: function (cmp, newVal, oldVal) {
        var vm = this.getViewModel();
        if (newVal !== oldVal) {
            if (newVal) {
                // Calculate floating date values
                this.floatsFromPickerDate();
            } else {
                var date = vm.get('holidayData.holiday_Date');
                // Reset floating date values
                vm.set('holidayData.float_Day', 0);
                vm.set('holidayData.float_Week', 0);
                vm.set('holidayData.holiday_Date', date);
                this.lookup('dateSelector').setValue(date);
            }
        }
    },

    onFloatingHolidayWeekChange: function (c, newVal, oldVal) {
        var floating = this.getViewModel().get('floatingDate');
        if (floating && newVal !== oldVal) {
            this.floatsFromSelectFields(
                newVal, null, null, null
            );
        }
    },

    onFloatingHolidayDayChange: function (c, newVal, oldVal) {
        var floating = this.getViewModel().get('floatingDate');
        if (floating && newVal !== oldVal) {
            this.floatsFromSelectFields(
                null, newVal, null, null
            );
        }
    },

    onFloatingHolidayMonthChange: function (c, newVal, oldVal) {
        if (newVal !== oldVal) {
            this.floatsFromSelectFields(
                null, null, newVal, null
            );
        }
    },

    /**
     * Handle event fired when year dropdown value changes
     */
    onYearChange: function(){
        var vm = this.getViewModel();

        this.loadHolidays(vm.get('currentYear'));
    },

    /**
     * handler for Save button click event
     */
    onSaveButton: function () {
        var vm = this.getViewModel(),
            data = vm.get('holidayData'),
            me = this;

        this.api.update(
            vm.get('currentYear'),
            data.holiday_Name,
            data.percentage,
            data.holiday_Date,
            data.unique_Number,
            vm.get('floatingDate'),
            data.float_Day,
            data.float_Week
        ).then((r) => {
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 5000
            });
            me.loadHolidays(vm.get('currentYear'), data.unique_Number);
        }).catch((e) => {
            Ext.toast({
                type: e.type,
                message: e.message,
                timeout: 5000
            });
        });


    },

    /**
     * Event handler for 'apply holiday schedule' button
     */
    onApplySchedule: function () {
        var me = this,
            vm = this.getViewModel();
        this.api.applyToEmployees(vm.get('currentYear')).then((r) => {
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 5000
            });
            // Reload 
            me.loadHolidays(vm.get('currentYear'));
        }).catch((e) => {
            Ext.toast({
                type: e.type,
                message: e.message,
                timeout: 5000
            });
        });
    },

    onAddHoliday: function () {
        var me = this,
            vm = this.getViewModel();
        this.api.add(vm.get('currentYear')).then((r) => {
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 5000
            });
            // Reload 
            me.loadHolidays(vm.get('currentYear'), r.id);
        }).catch((e) => {
            Ext.toast({
                type: e.type,
                message: e.message,
                timeout: 5000
            });
        });
    },

    onRemoveHoliday: function () {
        var me = this,
            vm = this.getViewModel();
        this.api.delete(vm.get('holidayData.unique_Number')).then((r) => {
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 5000
            });
            // Reload 
            me.loadHolidays(vm.get('currentYear'));
        }).catch((e) => {
            Ext.toast({
                type: e.type,
                message: e.message,
                timeout: 5000
            });
        });
    },

    showFutureSaveDialog: function(){
        var view = this.getView(),
            dialog = this.dialog;

        if(!dialog) {
            dialog = Ext.apply({
                ownerCmp: view
            }, view.dialog);
            this.dialog = dialog = Ext.create(dialog);
        }
        
        dialog.show();
    },


    onFutureSaveDialogCancel: function(){
        this.dialog.hide();
    },


    onSaveForFuture: function (btn) {
        
        var me = this,
            vm = this.getViewModel(),
            allYears = this.lookup('forwardMode').getValues().mode;
        this.dialog.hide();
        this.api.appendToYear(vm.get('currentYear'), allYears).then((r) => {
            Ext.toast({
                type: r.type,
                message: r.message,
                timeout: 5000
            });
            // Reload 
            me.loadHolidays(vm.get('currentYear'));
        }).catch((e) => {
            Ext.toast({
                type: e.type,
                message: e.message,
                timeout: 5000
            });
        });
    },

    // ===[Helper]==

    /**
     * Calculate floating holiday date from changed
     * select field values
     * @param {*} week 
     * @param {*} day 
     * @param {*} month 
     * @param {*} year 
     */
    floatsFromSelectFields: function (week, day, month, year) {
        var vm = this.getViewModel(),
            week = Object.defVal(
                week, vm.get('holidayData.float_Week'), true
            ),
            day = Object.defVal(
                day, vm.get('holidayData.float_Day'), true
            ),
            month = Object.defVal(
                month, vm.get('holidayData.holiday_Date').getMonth(),
                true
            ),
            year = Object.defVal(
                year, vm.get('currentYear'), true
            );
        vm.set('holidayData.holiday_Date',
            this.computeFloating(
                week, day, month, year
            )
        );
    },

    /**
     * Calculate floating holiday select field values
     * from current date picker value
     */
    floatsFromPickerDate: function () {
        var vm = this.getViewModel(),
            date = vm.get('holidayData.holiday_Date');
        vm.set(
            'holidayData.float_Week',
            Math.floor((date.getDate() - 1) / 7)
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