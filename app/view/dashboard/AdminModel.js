Ext.define('Breeze.view.dashboard.AdminModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dashboard.admin',

    data: {
        employeeInfo: {}
    },

    stores: {
        // 'employee_fyi': null
    },

    formulas: {
        fullName: function(get){
            return (
                [
                    get('employeeInfo.FirstName'),
                    get('employeeInfo.MiddleName'),
                    get('employeeInfo.LastName')
                ].join(' ')
            );
        },
        profileImage: function(get){
            if(get('employeeInfo.PhotoFlag')){
                return get('employeeInfo.Photo');
            } else {
                return 'resources/photos/default_user.png'
            }
        }
    }

});