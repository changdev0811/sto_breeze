/**
 * Punch API calls
 * @class Punch
 * @namespace Breeze.api.Punch
 * @alias breeze.api.punch
 */
Ext.define('Breeze.api.Punch', {
    extend: 'Breeze.api.Base',
    alias: 'breeze.api.punch',


    statics: {
        /**
         * Punch status constants
         */
        status: {
            OUT: 0,
            IN: 1
        },
        // Default value for timezone_id in punch submission
        timeZoneId: "UTC"
    },

    /**
     * Load punch policy information for current user
     * @api getCurrentPunchPolicyInfo_Plus
     * @return {Promise} promise resolving with punch data, or rejecting with error
     */
    getCurrentPolicy: function(){
        var api = this.api;
        return new Promise(function(resolve, reject){
            api.serviceRequest(
                'getCurrentPolicyInfo_Plus',
                {},
                true, true,
                function(resp){
                    var data = api.decodeJsonResponse(resp);
                    resolve (
                        {
                            hasTimeKron: data.hasTimeKron,
                            info: data.punchPolicy
                        }
                    );
                },
                function(err){
                    reject(err);
                }
            )
        });
    },

    /**
     * Implements getPolicyForEmployee
     * @api getPunchPolicyForEmp
     */
    getPolicyForEmployee: function(employeeId){
        var api = this.api,
            cookie = this.cookie.getCookies();
        return new Promise((resolve, reject)=>{
            api.serviceRequest(
                'getPunchPolicyForEmp',
                {
                    employee_id: Object.defVal(employeeId, cookie.emp),
                    asof: new Date()
                },
                true, false,
                function(r){
                    var resp = api.decodeJsonResponse(resp)
                    resolve(resp.d);
                },
                function(err){
                    reject(err);
                }
            );
        });
    },

    /**
     * Get attendance status for employee
     * @param {String} employeeId ID of employee to get status of; if undefined,
     *  uses cookie to get employee id (e.g. ID of logged in employee)
     * @return {Promise} Promise resolving with status, or rejecting with error
     */
    getAttendanceStatus: function(employeeId){
        var employeeId = Object.defVal(employeeId, this.auth.getCookies().emp);
        var api = this.api;
        return new Promise(function(resolve, reject){
            api.serviceRequest(
                'GetAttendanceStatus',
                { employee_id: employeeId },
                true, true,
                function(resp){
                    resolve(
                        api.decodeJsonResponse(resp).Status
                    );
                },
                function(err){
                    reject(err);
                }
            )
        });
    },

    /**
     * Submit punch API call
     * Submits punch for current user
     * TODO: Consider wrapping in proxy in Breeze.model.record.Punch
     * @param {String|Number} projectCode Code of current project (def is defaultProjectCode from emp info)
     */
    submit: function(projectCode){
        var authCook = this.auth.getCookies();
        var now = new Date();
        var api = this.api;
        // TODO: Determine if this is even necessary to go through making a new date
        // using existing date and .getUTCxyz
        // var utc = new Date(
        //     now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate(),
        //     now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()
        // );
        var utc = now.toUTC({
            out: Date.UTC_OUT.STRING,
            format: Date.UTC_FORMAT.UTC
        });
        var data = {
            Punch_Time: utc,
            TimeZone_ID: this.statics.timeZoneId,
            Customer_ID: authCook.cust,
            Employee_ID: authCook.emp,
            project_code: projectCode
        };

        return new Promise(function(resolve, reject){
            // try adding geolocation info
            // TODO: Address geolocation needs for mobile version
            // TODO: Re-enable GPS when security cert is fixed
            if(false && navigator.geolocation){
                navigator.geolocation.getCurrentPosition(function(loc){
                    data.lat = loc.coords.latitude;
                    data.lng = loc.coords.longitude;
                    data.acc = loc.coords.accuracy;        
                });

                var params = {
                    punchData: data,
                    // not sure if this is used, but required by call
                    Async: false
                };
                
                api.serviceRequest(
                    'SubmitPunch',
                    params,
                    true, true,
                    function(resp){
                        resolve(api.decodeJsonResponse(resp));
                    },
                    function(err){
                        reject(err);
                    }
                );
            } else {
                
                var params = {
                    punchData: data,
                    // not sure if this is used, but required by call
                    Async: false
                };

                // No geolocation info
                api.serviceRequest(
                    'SubmitPunch',
                    params,
                    true, true,
                    function(resp){
                        resolve(api.decodeJsonResponse(resp));
                    },
                    function(err){
                        reject(err);
                    }
                );
            }
        });

    }



});