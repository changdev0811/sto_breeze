/**
 * Common API calls shared by multiple scopes.
 * Extends Breeze.api.Base.
 * @class Common
 * @alias Breeze.api.Common
 */
Ext.define('Breeze.api.Common', {
    extend: 'Breeze.api.Base',
    // TODO: Implement

    /**
     * Wraps old homemade businessInfo method
     * Returns employee name and business name, using emp_info call
     * @api emp_info
     * @return {Promise} Promise resolving in data object, or rejecting with error
     */
    getHeaderInfo: function(){
        var api = this.api;
        return new Promise(function(resolve, reject){
            api.serviceRequest(
                'emp_info',
                {},
                true, true,
                function(resp){
                    var data = api.decodeJsonResponse(resp);
                    resolve(
                        {
                            fullname: data.fullname,
                            business: data.business
                        }
                    );
                },
                function(err){
                    reject(err);
                }
            )
        });
    }
});