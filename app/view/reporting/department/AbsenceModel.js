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
        reportParams: {
            CompanyName: null,
            customerId: null,
            groupByDepartment: false,
            LogoInHeader: false,
            NameInHeader: false,
            RepSignature: false,
            ReportTitle: '',
            category_id: null,
            dStart: (new Date()),
            dEnd: (new Date()),
            conditional: null,
            conditional_amt: 0,
            conditional_type: 0
        }
    }
});