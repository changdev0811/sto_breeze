(function(){
    /**
     * Class defining static Employee-related service calls
     */
    Ext.define('Breeze.service.Employee', {
        requires: [
            'Breeze.helper.Api'
        ],


        statics: {

            // call service names
            services: {
                getSecurityRights: 'getSecRightsForEmployee'
            },

            /**
             * Get employee security rights via AJAX call.
             * converted from original in homemade.js, now using promises
             * @param {String} employeeId Employee ID
             * @return {Promise} Promise resolving with response, or rejecting with false
             */
            getSecurityRights: function(employeeId){
                var me = this;
                var api = Breeze.helper.Api;
                return new Promise(function(resolve,reject){
                    api.serviceRequest(
                        me.getSecurityRights, {}, false,
                        function(response){
                            resolve(api.decodeJsonResponse(response));
                        },
                        function(){
                            reject(false);
                        }
                    )
                });
            },

            /**
             * getFYI API Call (ported from old FYI view)
             * @param {String} employeeId Employee ID
             * @param {Number} year Recorded year
             * @param {String} day Active day (m/d/y)
             * @param {Boolean} scheduled Whether to limit to scheduled FYI
             * @param {String} storeID ID of store to put results in
             * @return {Promise} promise resolving to object with fields and store,
             *      or rejecting with error
             */
            getFYI: function(employeeId, year, day, scheduled, storeId){
                var scheduled = defVal(scheduled, false);
                var storeId = defVal(storeId, 'employee_fyi');
                var year = defVal(year,(new Date()).getFullYear());
                var api = Breeze.helper.Api;
                return new Promise(function(resolve, reject){
                    api.serviceRequest(
                        'getFYI',
                        {
                            'employee_id': employeeId,
                            'recyear': year,
                            'activeDay': day,
                            'showScheduled': scheduled
                        },
                        false,
                        function(response){
                            var respJson = api.decodeJsonResponse(response);
                            var store = Ext.create(
                                'Ext.data.Store', {
                                    autoLoad: true,
                                    model: 'Breeze.model.employee.Fyi',
                                    id: storeId,
                                    data: respJson.Rows,
                                    proxy: {
                                        type: 'memory',
                                        reader: {
                                            type: 'json'
                                        }
                                    }
                                }
                            );
                            var result = {
                                store: store,
                                data: {
                                    employeeName: respJson.EmployeeName,
                                    departmentName: respJson.DepartmentName,
                                    hireDate: respJson.HireDate,
                                    points: respJson.Points
                                }
                            };
                            resolve(result);
                        },
                        function(response){
                            reject(response);
                        }
                    );
                });
            },
            /**
             * getFYI API Call (ported from old FYI view)
             * @param {String} employeeId Employee ID
             * @param {Number} year Recorded year
             * @param {String} day Active day (m/d/y)
             * @param {Boolean} scheduled Whether to limit to scheduled FYI
             * @param {String} storeID ID of store to put results in
             * @return {Promise} promise resolving to object with fields and store,
             *      or rejecting with error
             */
            getFYITest: function(employeeId, year, day, scheduled, storeId){
                var scheduled = defVal(scheduled, false);
                var storeId = defVal(storeId, 'employee_fyi');
                var year = defVal(year,(new Date()).getFullYear());
                var api = Breeze.helper.Api;
                return new Promise(function(resolve, reject){
                    api.request(
                        '','resources/dummy_api/getFYI/default.json',
                        {
                            'employee_id': employeeId,
                            'recyear': year,
                            'activeDay': day,
                            'showScheduled': scheduled
                        },
                        false,
                        function(response){
                            var respJson = api.decodeJsonResponse(response);
                            var store = Ext.create(
                                'Ext.data.Store', {
                                    autoLoad: true,
                                    model: 'Breeze.model.employee.Fyi',
                                    id: storeId,
                                    data: respJson.Rows,
                                    proxy: {
                                        type: 'memory',
                                        reader: {
                                            type: 'json'
                                        }
                                    }
                                }
                            );
                            var result = {
                                store: store,
                                data: {
                                    employeeName: respJson.EmployeeName,
                                    departmentName: respJson.DepartmentName,
                                    hireDate: respJson.HireDate,
                                    points: respJson.Points
                                }
                            };
                            resolve(result);
                        },
                        function(response){
                            reject(response);
                        }
                    );
                });
            }
        }

    });
    var defVal = function(a,b){return"undefined"==typeof a?b:a};
})();