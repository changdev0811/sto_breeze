/**
 * View Model class for Department Department Details reporting view
 * @class DeptDetailsModel
 * @namespace Breeze.view.reporting.department.DeptDetailsModel
 * @alias viewmodel.reporting.department.deptdetails
 */
Ext.define('Breeze.view.reporting.department.DeptDetailsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.department.deptdetails',
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
            ReportTitle: 'Department Details Report',
            category_id: null,
            ShowChart: null,
            recyear: null
        }
    }
});