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
    }

});