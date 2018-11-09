/**
 * View Model for WorkTimeRecords view
 * @class WorkTimeRecordsModel
 * @namespace Breeze.view.employee.WorkTimeRecordsModel
 * @alias viewmodel.employee.worktimerecords
 */
Ext.define('Breeze.view.employee.WorkTimeRecordsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.employee.worktimerecords',

    requires: [
        'Breeze.helper.Time'
    ],

    data: {
        employeeId: undefined,
        name: '',
        startDate: undefined,
        endDate: undefined,
        showPunches: false,
        workTimeRecords: null,
        // Labels for columns in time sheet view, updated when selected dates change
        sheetDayLabels: {
            day1: 'Day 1',
            day2: 'Day 2',
            day3: 'Day 3',
            day4: 'Day 4',
            day5: 'Day 5',
            day6: 'Day 6',
            day7: 'Day 7'
        },
        // at a glance data
        atAGlance: {
            regular: 0,
            ot1: null,
            ot2: null,
            ot3: null,
            ot4: null
        }
    },

    // stores: {
    //     workTimeRecords: {
    //         type: 'Breeze.store.record.WorkTime'
    //     }
    // }

    formulas: {
        titleDateStart: function(get){
            var startDate = get('startDate');
            console.info('titleDateStart');
            if(typeof startDate !== "object"){
                return '';
            } else {
                return Breeze.helper.Time.shortDate(startDate,'/');
            }
        },
        titleDateEnd: function(get){
            var endDate = get('endDate');
            if(typeof endDate !== "object"){
                return '';
            } else {
                return Breeze.helper.Time.shortDate(endDate,'/');
            }
        },
        glanceRegularHours: function(get){
            var t = get('atAGlance.regular');
            t = (t == null)? 0 : t;
            return t.toFixed(2);
        },
        glanceOt1Hours: function(get){
            var t = get('atAGlance.ot1');
            t = (t == null)? 0 : t;
            return t.toFixed(2);
        },
        glanceOt2Hours: function(get){
            var t = get('atAGlance.ot2');
            t = (t == null)? 0 : t;
            return t.toFixed(2);
        },
        glanceOt3Hours: function(get){
            var t = get('atAGlance.ot3');
            t = (t == null)? 0 : t;
            return t.toFixed(2);
        },
        glanceOt4Hours: function(get){
            var t = get('atAGlance.ot4');
            t = (t == null)? 0 : t;
            return t.toFixed(2);
        },
        glanceTotalHours: function(get){
            var t = 
                get('atAGlance.regular') + get('atAGlance.ot1') +
                get('atAGlance.ot2') + get('atAGlance.ot3') +
                get('atAGlance.ot4');
            t = (t == null)? 0 : t;
            return t.toFixed(2);
        },
        showOt1Hours: function(get){ return (get('atAGlance.ot1') !== null); },
        showOt2Hours: function(get){ return (get('atAGlance.ot2') !== null); },
        showOt3Hours: function(get){ return (get('atAGlance.ot3') !== null); },
        showOt4Hours: function(get){ return (get('atAGlance.ot4') !== null); }
    }
});