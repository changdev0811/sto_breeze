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
            var api = Breeze.helper.api;
            return new Promise(function(resolve,reject){
                api.serviceRequest(
                    me.getSecurityRights, false,
                    function(response){
                        resolve(api.decodeJsonResponse(response));
                    },
                    function(){
                        reject(false);
                    }
                )
            });
        }
    }

});