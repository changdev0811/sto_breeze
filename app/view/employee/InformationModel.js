Ext.define('Breeze.view.employee.InformationModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.employee.information',

    data: {
        employeeName: 'X',
        departmentName: 'X',
        points: ''
    },

    stores: {

    },

    formulas: {
        hireDate: function(get){
            return Ext.util.Format.date(
                get('info.HireDate'), "m/d/Y"
            );
        }
    }

});