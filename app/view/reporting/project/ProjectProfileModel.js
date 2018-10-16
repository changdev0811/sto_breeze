/**
 * View Model class for Project Profile reporting view
 * @class ProjectProfileModel
 * @namespace Breeze.view.reporting.project.ProjectProfileModel
 * @alias viewmodel.reporting.project.projectprofile
 */
Ext.define('Breeze.view.reporting.project.ProjectProfileModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.project.projectprofile',
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
            ReportTitle: 'Project Profile Report',
            dStart: (new Date()),
            dEnd: (new Date()),
            conditional: null,
            conditional_amt: 0,
            conditional_type: 0
        }
    }
});