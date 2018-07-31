/**
 * API calls for Employee sub-scope Information. 
 * Extends Breeze.api.Base, providing access to helpers.
 * Should be accessed indirectly through Breeze.api.Employee
 * @class Information
 * @alias Breeze.api.employee.Information
 */
Ext.define('Breeze.api.employee.Information', {
    extend: 'Breeze.api.Base',

    // TODO: Implement
    getEmployeeInfo: function(employeeId, storeId){
        var authInfo = this.auth.getCookies();
        var employeeId = this.defVal(employeeId, authInfo.emp);
        var storeId = this.defVal(storeId, 'employee_info');
        var api = this.api;
        return new Promise(function(resolve, reject){
            api.serviceRequest(
                'getEmployeeInfo',
                {
                    'employee_id': employeeId
                },
                false,
                function (response) {
                    var respJson = api.decodeJsonResponse(response);
                    // var store = Ext.create(
                    //     'Ext.data.Store', {
                    //         model: 'Breeze.model.employee.Information',
                    //         id: storeId,
                    //         data: [respJson.Employee],
                    //         proxy: {
                    //             type: 'memory',
                    //             reader: {
                    //                 type: 'json'
                    //             }
                    //         }
                    //     }
                    // );
                    var store = Ext.create(
                        'Breeze.model.employee.Information',
                        { data: respJson.Employee }
                    );
                    resolve(store);
                }, 
                function(response) {
                    reject(response);
                }
            )
        });
    },
    addNewEmployee: function(){},
    
});