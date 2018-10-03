/**
 * View Model class for Department Daily reporting view
 * @class DailyModel
 * @namespace Breeze.view.reporting.department.DailyModel
 * @alias viewmodel.reporting.department.daily
 */
Ext.define('Breeze.view.reporting.department.DailyModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.department.daily',
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
            groupByDepartment: false,
            LogoInHeader: false,
            NameInHeader: false,
            RepSignature: false,
            ReportTitle: 'Daily Report',
            sDate: (new Date()),
            showadj: false,
            showacc: false
        }
    }
});