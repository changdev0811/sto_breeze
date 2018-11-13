/**
 * View Controller for Audit Admin view
 * @class AuditController
 * @namespace Breeze.view.admin.AuditController
 * @alias controller.admin.audit
 */
Ext.define('Breeze.view.admin.AuditController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.admin.audit',

    /**
     * Called when the view is created
     */
    onInit: function (component) {

        // Load User-Defined Categories list store
        this.addStoreToViewModel(
            'Breeze.store.company.History',
            'auditHistory',
            { load: true }
        );
    
        console.info('Audit controller inited');
    },
    
    // === [Event Handlers] ===

    /**
     * Apply search filter as user types in text
     * @param {Object} field Search field component
     * @param {String} newVal Search query text
     */
    onSearchTextChange: function(field, newVal){
        var vm = this.getViewModel(),
            history = vm.get('auditHistory');
        console.info('Search text', newVal);
        if(newVal.trim()==''){
            history.clearFilter();
        } else {
            history.clearFilter();
            history.filterBy((record, id)=>{
                var show = false;
                if(!newVal || newVal == ''){
                    show = true;
                } else {
                    var parts = newVal.split(' ');
                    show = true;
                    for(var i=0;i<parts.length;i++){
                        show = true;
                        let part = parts[i].toLowerCase();
                        if(
                            part !== '' &&
                            !record.get('AuditMessage').toLowerCase().includes(part)
                        ){
                            show = false;
                        }
                    }
                    return show;
                }
            });
        }
    }
    
});