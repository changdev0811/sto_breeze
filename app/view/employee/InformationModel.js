Ext.define('Breeze.view.employee.InformationModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.employee.information',

    data: {
        employeeName: 'X',
        employeeId: undefined,
        departmentName: 'X',
        points: '',
        // When true, fields will be read-only
        readOnly: true,
        config: {
            
        },
        lists: {
            
        }
    },

    stores: {

    },

    formulas: {
        hireDate: function(get){
            return Ext.util.Format.date(
                get('info.HireDate'), "m/d/Y"
            );
        },
        overtime_day1: function(get){
            return (get('info.punchPolicy.Ot_Day1')/60/60);
        },
        overtime_day2: function(get){
            return (get('info.punchPolicy.Ot_Day2')/60/60);
        },
        overtime_day3: function(get){
            return (get('info.punchPolicy.Ot_Day3')/60/60);
        },
        overtime_day4: function(get){
            return (get('info.punchPolicy.Ot_Day4')/60/60);
        },
        overtime_week1: function(get){
            return (get('info.punchPolicy.Ot_Week1')/60/60);
        },
        overtime_week2: function(get){
            return (get('info.punchPolicy.Ot_Week2')/60/60);
        },
        overtime_week3: function(get){
            return (get('info.punchPolicy.Ot_Week3')/60/60);
        },
        overtime_week4: function(get){
            return (get('info.punchPolicy.Ot_Week4')/60/60);
        }
        
    }

});