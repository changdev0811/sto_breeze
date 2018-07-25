(function(){
    /**
     * TreeRouter class - aids in connecting tree item selection to
     * router actions
     * @class TreeRouter
     * @namespace Breeze.helper.routing
     * @alias Breeze.helper.routing.TreeRouter
     */
    Ext.define('Breeze.helper.routing.TreeRouter', {
        controllerContext: null,
        routePrefix: '',
        // attribute on tree data record specifying route
        routeAttribute: 'routeRef', 
        // attribute on tree data record indicating no route action
        actAttribute: 'routeAct',
        /**
         * @constructor
         * @param {String} controller Controller context to execute redirects within
         * @param {String} prefix Optional prefix to prepend to resolved routes
         * @param {String} attribute Optional attribute name to pull from records (def 'routeRef')
         */
        constructor: function(controller, prefix, attribute){
            this.controllerContext = controller;
            this.routePrefix = defVal(prefix, this.routePrefix);
            this.routeAttribute = defVal(attribute, this.routeAttribute);
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
            var noRedirect = defVal(noRedirect, false);
            var route = this.routePrefix + treeRecord.data[this.routeAttribute];
            var act = defVal(treeRecord.data[this.actAttribute], true);
            if(act){
                if(!noRedirect){
                    this.controllerContext.redirectTo(route);
                } else {
                    return route;
                }
            } else {
                return false;
            }
        }
    });
    /** If a is undefined, return b, else return a 
     * (for handling undefined optional params) */
    var defVal = function(a,b){return"undefined"==typeof a?b:a};
})();