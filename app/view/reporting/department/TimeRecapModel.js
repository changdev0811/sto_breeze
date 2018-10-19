/**
 * View Model class for Department Time Recap reporting view
 * @class TimeRecapModel
 * @namespace Breeze.view.reporting.department.TimeRecapModel
 * @alias viewmodel.reporting.department.timerecap
 */
Ext.define('Breeze.view.reporting.department.TimeRecapModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.department.timerecap',
    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:
        users: {
            model: 'User',
            autoLoad: true
        }
        */
       tempCat: {
           type: 'tree',
           root: {
               children: [
                   {
                       text: 'Category'
                   }
               ]
           }
       }
    },
    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */

        /**
         * Report params contains attributes that get submitted along with
         * report request. When possible, they have been bound to their
         * respective form fields so their values are automatically changed
         * when edits are made in form
         */
        reportParams: {
            CompanyName: null,
            customerId: null,
            groupByDepartment: true,
            LogoInHeader: false,
            NameInHeader: false,
            RepSignature: false,
            ReportTitle: 'Time Recap Report',
            category_id: null,
            hourly_only: null,
            hhmm_format: true,
            submit_approve: true,
            submit_submit: null,
            submit_unsubmit: null
        }
    }
});