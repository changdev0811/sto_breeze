/**
 * View Model class for Holiday Editor Admin view
 * @class HolidayEditorModel
 * @namespace Breeze.view.admin.HolidayEditorModel
 * @alias viewmodel.admin.holidayeditor
 */
Ext.define('Breeze.view.admin.HolidayEditorModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin.holidayeditor',

    requires: [
        'Breeze.model.data.Condition'
    ],

    data: {
        currentYear: (new Date()).getYear() + 1900
    },

    stores: {
        // Week
        week: {
            model: 'Breeze.model.data.Condition',
            data: [
    			{ text: "1st", data: '0'},
    			{ text: "2nd", data: '1'},
    			{ text: "3rd", data: '2'},
    			{ text: "4th", data: '3'},
    			{ text: "Last", data: '4'},
    		]
        },

         // Weekdays
         weekday: {
            model: 'Breeze.model.data.Condition',
            data: [
    			{ text: "Sunday", data: '0'},
    			{ text: "Monday", data: '1'},
    			{ text: "Tuesday", data: '2'},
    			{ text: "Wednesday", data: '3'},
    			{ text: "Thursday", data: '4'},
    			{ text: "Friday", data: '5'},
    			{ text: "Saturday", data: '6'},
    		]
        },

         // Months
         month: {
            model: 'Breeze.model.data.Condition',
            data: [
    			{ text: "January", data: '0'},
    			{ text: "February", data: '1'},
    			{ text: "March", data: '2'},
    			{ text: "April", data: '3'},
    			{ text: "May", data: '4'},
    			{ text: "June", data: '5'},
    			{ text: "July", data: '6'},
    			{ text: "August", data: '7'},
    			{ text: "September", data: '8'},
    			{ text: "October", data: '9'},
    			{ text: "November", data: '10'},
    			{ text: "December", data: '11'},
    		]
        }
    },

    formulas: {
        holidayPercentage: {
            get: function(get){
                return get('holidayData.percentage') * 100.0;
            },
            set: function(value){
                this.set(
                    'holidayData.percentage',
                    value / 100.0
                );
            }
        },
        holidayFloats: function(get){
            return (get('holidayData.float_Day') !== 0 || get('holidayData.float_Week') !== 0);
        }
    }


});