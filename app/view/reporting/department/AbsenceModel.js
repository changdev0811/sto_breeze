/**
 * View Model class for Department Absence reporting view
 * @class AbsenceModel
 * @namespace Breeze.view.reporting.department.AbsenceModel
 * @alias viewmodel.reporting.department.absence
 */
Ext.define('Breeze.view.reporting.department.AbsenceModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reporting.department.absence',
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
            GroupByDept: true,
            LogoInHeader: false,
            NameInHeader: false,
            RepSignature: false,
            ReportTitle: 'Absence Report',
            category_id: null,
            dStart: (new Date()),
            dEnd: (new Date()),
            conditional: '>',
            conditional_amt: 0,
            conditional_type: '20',
            // Concerning selected departments/ids
            idtype: 'emps', // According to existing code, this is always 'emps'
            myinclist: ''
        }
    }
});