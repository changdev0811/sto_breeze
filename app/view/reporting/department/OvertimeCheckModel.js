/**
 * View Model class for Department Overtime Check reporting view
 * @class OvertimeCheckModel
 * @namespace Breeze.view.reporting.department.OvertimeCheckModel
 * @alias viewmodel.reporting.department.overtimecheck
 */
Ext.define('Breeze.view.reporting.department.OvertimeCheckModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.department.overtimecheck',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:
        users: {
            model: 'User',
            autoLoad: true
        }
        */

        /** Store will hold selected weeks
         * fields: 
         *  - start (date)
         *  - startText (short date string)
         */
        selectedWeeks: {
        }
    },
    
    constructor: function (cfg) {
        this.callSuper([cfg]);
        /**
         * Report params contains attributes that get submitted along with
         * report request. When possible, they have been bound to their
         * respective form fields so their values are automatically changed
         * when edits are made in form
         */
        var data = {
            reportParams: {
                GroupByDept: true,
                LogoInHeader: false,
                NameInHeader: false,
                RepSignature: false,
                ReportTitle: 'Overtime Check Report',
                inccats: '',
                hhmm_format: true,
                ot_value: 8.0,
                // Concerning selected departments/ids
                idtype: 'emps', // According to existing code, this is always 'emps'
                incids: ''
            }
        };
        this.setData(data);
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */

        /*
            TODO: Read from the following before submitting params to API call
            The following vars are bound to weekly/hourly radio buttons
            and associated values. Before submitting, set parameter ot_value
            from one of the below ot_hours_x values, based on the value
            of valType (1 = daily, 2 = weekly)
        */
        
        // used for hour mode binding
        ot_hours_daily: 8,
        ot_hours_weekly: 40,
        // whether to use daily or weekly
        valType: 1
    }

});
