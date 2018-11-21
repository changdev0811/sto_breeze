/**
 * Company-scoped API calls.
 * Extends Breeze.api.Base.
 * @todo TODO: Decide if a Company scope is needed
 * @class Company
 * @alias Breeze.api.Company
 * @extends Breeze.api.Base
 */
Ext.define('Breeze.api.Company', {
    extend: 'Breeze.api.Base',
    
    constructor: function(){
        this.project = Breeze.api.company.Project;
    },

    // References to subclasses
    project: null,
    category: Breeze.api.company.Category,

    /**
     * Check if Company is a support company
     * (Ported from homemade.js/getIsSupport)
     * @todo TODO: Document where this is used
     * @return {Promise} promise resolving to support level (int) or rejecting w/ error
     */
    isSupport: function(){
        var api = this.api;
        return new Promise(function(resolve, reject){
            api.serviceRequest(
                'getIsSupport', 
                {}, true, true,
                function(result){
                    resolve(api.decodeJsonResponse(result).level)
                },
                function(err){
                    warn('Error from API isSupport call ', err);
                    reject(err);
                }
            )
        });
    }

});