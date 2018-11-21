/**
 * TreeRouter class - aids in connecting tree item selection to
 * router actions
 * @class TreeRouter
 * @namespace Breeze.helper.routing
 * @alias Breeze.helper.routing.TreeRouter
 */
Ext.define('Breeze.helper.routing.TreeRouter', {

    config: {
        controller: null,
        prefix: '',
        // attribute on tree data record specifying route
        routeAttribute: 'routeRef',
        // attribute on tree data record indicating no route action
        actAttribute: 'routeAct',
        // attribute indicating global event to fire off
        eventAttribute: 'routeEvent'
    },

    /**
     * @constructor
     * Class constructor
     * @param {Object} cfg Config parameters
     */
    constructor: function(cfg){
        this.initConfig();
        this.setConfig(cfg);
    },

    /**
     * Resolve route defined by tree record
     * @param {Object} treeRecord Tree record object
     * @param {Boolean} noRedirect If true, return route string instead of 
     *      redirecting (default false)
     * @return {String|Boolean} if noRedirect, returns name of resolved route,
     *      or false if route item has a routeAct value of false
     */
    resolve: function(treeRecord, noRedirect){
        var noRedirect = Object.defVal(noRedirect, false);
        var route = this.getPrefix() + treeRecord.data[this.getRouteAttribute()];
        var act = Object.defVal(treeRecord.data[this.getActAttribute()], true);
        var event = treeRecord.data[this.getEventAttribute()];
        if(act){
            if(!noRedirect){
                if(!Object.isUnvalued(event)){
                    Ext.globalEvents.fireEvent(event, {route: route});
                } else {
                    this.getController().redirectTo(route);
                }
            } else {
                return route;
            }
        } else {
            return false;
        }
    }
});