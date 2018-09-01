/**
 * API class for Company Projects
 * @class Project
 * @namespace Breeze.api.company.Project
 * @alias Breeze.api.company.Project
 * @extends Breeze.api.Base
 */
Ext.define('Breeze.api.company.Project', {
    extend: 'Breeze.api.Base',
    
    /**
     * Get project by ID
     * @api getProjectByID
     * @param {String} id Project ID
     * @return {Promise} resolves to default project code value, or rejects with error
     */
    getById: function(id) {
        var api = this.api;
        return new Promise(function(resolve, reject){
            api.serviceRequest(
                'getProjectByID',
                { project_id: id },
                true, true,
                function(response){
                    resolve(api.decodeJsonResponse(response).Code);
                },
                function(err){
                    reject(err);
                }
            )
        })
    },

    /**
     * Get flat list of projects
     * @api getFlatProjectList
     * @return {Promise} promise resolving with flat project list store or rejecting with error records
     */
    flatList: function(){
        var me = this;
        return new Promise(function(resolve, reject){
            var store = Ext.create('Breeze.store.company.FlatProjectList');
            store.load(function(r,o,success){
                if(success){
                    resolve(store);
                } else {
                    reject(r);
                }
            });
        });
    }

});