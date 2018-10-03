/**
 * Store used for resolving report views based on their url route params
 * 
 * Format for url is reports/<category>/<type>
 * 
 * @class ViewRoutes
 * @namespace Breeze.store.reporting.Routes
 */
Ext.define('Breeze.store.reporting.Routes', {
    extend: 'Ext.data.Store',
    autoLoad: true,

    // Fields for store-- not backed by model
    fields: [
        { name: 'category', type: 'string' },
        { name: 'type', type: 'string' },
        { name: 'view', type: 'string' }
    ],

    /**
     * Route data goes here
     * category: first url part (e.g. department)
     * type: second url part (should be lowercase, e.g. 'absence' for Absence)
     * controller: Full namespace path to view for report
     * 
     * example:
     * 
     * Breeze.view.report.department.Absence ->
     *  { 
     *      category: 'department', type: 'absence', 
     *      view: 'Breeze.view.report.department.Absence' 
     *  }
     */
    data: [
        { 
            category: 'department', type: 'absence', 
            view: 'Breeze.view.reporting.department.Absence' 
        },
        {
            category: 'department', type: 'absencesummary', 
            view: 'Breeze.view.reporting.department.AbsenceSummary'             
        },
        {
            category: 'department', type: 'adjustment', 
            view: 'Breeze.view.reporting.department.Adjustment'             
        },
        {
            category: 'department', type: 'daily', 
            view: 'Breeze.view.reporting.department.Daily'             
        }

    ],

    resolve: function(category, type){
        var idx = this.findBy((e) => {
            return (e.data.category === category && e.data.type === type);
        });
        if(idx !== -1){
            return this.getAt(idx).data.view;
        } else {
            return null;
        }
    }
});