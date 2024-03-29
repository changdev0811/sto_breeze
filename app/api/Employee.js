/**
 * API Calls for Employee scope. Extends Breeze.api.Base, providing helper access.
 * Provides access to instances of Employee sub-scoped API classes as well as common methods
 * @class Employee
 * @alias Breeze.api.Employee
 */
Ext.define('Breeze.api.Employee', {
    extend: 'Breeze.api.Base',
    requires: [
        'Breeze.api.employee.Fyi',
        'Breeze.api.employee.Information',
        'Breeze.api.employee.WorkTimeRecords'
    ],

    constructor: function(){
        this.fyi = Ext.create('Breeze.api.employee.Fyi');
        this.information = Breeze.api.employee.Information;
        this.workTimeRecords = Ext.create('Breeze.api.employee.WorkTimeRecords');
    },

    // References to specific scopes
    fyi: null,
    information: null,
    workTimeRecords: null,

    // Class API methods

    statics: {
        // Access level constants, as returned by getAccess
        accessLevel: Breeze.helper.Auth.accessLevel
    },

    /**
     * Get employee access level
     * (Port homemade.js/getEmpAccess and getEmpAccessLogin functions)
     * @param {Boolean} reloadCookies If true, force auth cookie reload (functions
     *  like original getEmpAccessLogin function) Default false
     * @return {Promise} promise resolving to numerical access level, or rejecting with error
     */
    getAccess: function(reloadCookies){
        var reloadCookies = Object.defVal(reloadCookies,false);
        var auth = this.auth;
        var api = this.api;
        return new Promise(function(resolve, reject){
            api.serviceRequest('getAccess', 
                {},
                true,
                true,
                function(res, req){
                    if(reloadCookies){
                        auth.reloadCookies(-1);
                    }
                    resolve(api.decodeJsonResponse(res).level);
                },
                function(err){
                    console.warn('Problem with API Employee.getAccess', err);
                    reject(err);
                }
            );
        });
    },

    /**
     * Get security role / security rights for employee
     * (Ported from homemade.js/getSecurityRightsForEmployee)
     * @api getSecRightsForEmployee
     * @param {String} employee_id Employee ID
     * @return {Promise} promise resolving with api response or rejecting with error
     */
    getSecurityRights: function(employee_id){
        var api = this.api;
        var me = this;
        return new Promise(function(resolve, reject){
            api.serviceRequest(
                'getSecRightsForEmployee',
                { employee_id: employee_id },
                true,
                true,
                function(res, req){
                    resolve(api.decodeJsonResponse(res));
                },
                function(err){
                    // console.warn('Problem with API Employee.getSecurityRights', err)
                    reject(err);
                }
            )
        });
    },

    /**
     * Wraps old homemade businessInfo method
     * Returns employee name and business name, using emp_info call
     * @api emp_info
     * @param {String} employeeId ID of employee to lookup, if undefined uses auth cookie
     * @return {Promise} Promise resolving in data object, or rejecting with error
     */
    getHeaderInfo: function(employeeId){
        var employeeId = Object.defVal(employeeId, this.auth.getCookies().emp);
        var api = this.api;
        return new Promise(function(resolve, reject){
            api.serviceRequest(
                'emp_info',
                {lookup: employeeId},
                true, true,
                function(resp){
                    var data = api.decodeJsonResponse(resp);
                    delete data.__type;
                    resolve(
                        data
                    );
                },
                function(err){
                    reject(err);
                }
            )
        });
    },

    /**
     * Get default project code for current employee
     * @api getCurrentEmployeeDefaultProjectCode
     * @return {Promise} promise resolving with code or rejecting with error
     */
    getDefaultProjectCode: function(){
        var api = this.api;
        return new Promise(function(resolve, reject){
            api.serviceRequest(
                'getCurrentEmployeeDefaultProjectCode',
                {}, true, true,
                function(resp){
                    resolve(
                        api.decodeJsonResponse(resp)
                    );
                },
                function(err){
                    reject(err);
                }
            )
        });
    },

    /**
     * Gets employee shift time for given employee
     * Ported from homemade.js
     * @api getEmpShiftTime
     * @param {String} employeeId Employee ID
     * @return {Promise} Promise resolving with minutes, schedule_id and recording_mode
     */
    getShiftTime: function(employeeId){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'getEmpShiftTime',
                {
                    emp_id_ret: employeeId
                },
                true, false,
                function(r){
                    resolve(api.decodeJsonResponse(r));
                },
                function(err){
                    reject(err);
                }
            )
        });
    }
});