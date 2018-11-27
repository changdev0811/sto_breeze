/**
 * API Calls for Employees scope. Extends Breeze.api.Base, providing helper access.
 * 
 * @class Employees
 * @namespace Breeze.api.Employees
 * @extends Breeze.api.Base
 */
Ext.define('Breeze.api.Employees', {
    extend: 'Breeze.api.Base',

    /**
     * Make call to getEmployeeCount API method
     * @return {Promise} Promise resolving with array of counts or rejecting with
     *      error data
     * @api getEmployeeCounts
     */
    employeeCounts: function(){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'getEmployeeCounts',
                {},
                true, true,
                (resp) => {
                    // Success
                    var r = api.decodeJsonResponse(resp);
                    if(r.success){
                        resolve(
                            r.info
                        );
                    } else {
                        // console.warn('Unsuccessful call to getEmployeeCounts ', r.err);
                        reject(r.err);
                    }
                },
                (err) => {
                    // Failure
                    // console.warn('Failed to get employee counts ', err);
                    reject(err);
                }
            );
        });
    },

    /**
     * See if employee can be deleted (ported from ./DepartmentTree.js)
     * @param {(Number|String)} employeeId ID of employee to check if deletable
     * @return {Promise} Promise resolving if able to delete, or 
     *      rejecting with error obj otherwise
     * @api canDeleteEmployee
     */
    canDelete: function(employeeId){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'canDeleteEmployee',
                { employee_id: employeeId },
                true, false,
                (resp) => {
                    var r = api.decodeJsonResponse(resp);
                    if (r.success == true){
                        resolve(true);
                    } else {
                        reject(r.err);
                    }
                },
                (err) => {
                    reject('Employee cannot be deleted (error)');
                }
            )
        });
    },

    /**
     * Delete employee (ported from ./DepartmentTree.js)
     * @param {(Number|String)} employeeId ID of employee to delete
     * @return {Promise} Promise resolving with true on success, error or reject
     * @api deleteEmployee
     */
    delete: function(employeeId){
        var api = this.api;
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'deleteEmployee',
                { employee_id: employeeId },
                true, false,
                (resp) => {
                    var r = api.decodeJsonResponse(resp);
                    if(r.success == true){
                        resolve(r.info.join(''));
                    } else {
                        reject(r.err);
                    }
                },
                (err) => {
                    reject('Failed to delete employee (error)');
                }
            )
        })
    }

});