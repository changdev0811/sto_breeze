/**
 * API calls for Employee sub-scope Information. 
 * Extends Breeze.api.Base, providing access to helpers.
 * Should be accessed indirectly through Breeze.api.Employee
 * @class Information
 * @alias Breeze.api.employee.Information
 */
Ext.define('Breeze.api.employee.Information', {
    extend: 'Breeze.api.Base',

    /**
     * Gets employee info
     * @api getEmployeeInfo
     * @param {String} employeeId ID of employee
     * @param {String} storeId name of store to load into
     */
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
                true,
                true,
                function (response) {
                    var respJson = api.decodeJsonResponse(response);
                    // var store = Ext.create(
                    //     'Ext.data.Store', {
                    //         model: 'Breeze.model.employee.Information',
                    //         id: storeId,
                    //         data: [respJson.employee],
                    //         proxy: {
                    //             type: 'memory',
                    //             reader: {
                    //                 type: 'json'
                    //             }
                    //         }
                    //     }
                    // );
                    // var store = Ext.create(
                    //     'Breeze.model.employee.Information',
                    //     { data: respJson.Employee }
                    // );
                    resolve({
                        employee: respJson.employee,
                        punchPolicy: respJson.punchPolicy
                    });
                }, 
                function(response) {
                    reject(response);
                }
            )
        });
    },

    /**
     * Get current employee info
     * @api getCurrentEmployeeInfo
     * @param {boolean} resolveDefaultProject If true, make secondary ajax
     *  call to getProjectByID if response's DefaultProject isn't null 
     *  (default true)
     * @return {Promise} Promise resolving with response (object) or rejecting 
     *  with error
     */
    getCurrentInfo: function(resolveDefaultProject){
        // var authInfo = this.auth.getCookies();
        var resolveDefaultProject = this.defVal(resolveDefaultProject, true);
        var api = this.api;
        return new Promise(function(resolve, reject){
            api.serviceRequest(
                'getCurrentEmployeeInfo',
                {},
                true, true,
                function(response){
                    var info = api.decodeJsonResponse(response);
                    if(info.DefaultProject !== null && resolveDefaultProject){
                        var prjApi = Ext.create('Breeze.api.company.Project');
                        prjApi.getById(info.DefaultProject).then(
                            function(r){
                                info.defaultProjectCode = r;
                            }
                        ).catch(function(err){
                            console.warn('Got error from getProjectById: ', err);
                            info.defaultProjectCode = "";
                        });
                    } else {
                        info.defaultProjectCode = "";
                    }
                    resolve(info);
                },
                function(err){
                    reject(err);
                }
            )
        })
    },

    // TODO: Implement addNewEmployee
    addNewEmployee: function(){},
    
});