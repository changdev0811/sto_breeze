/**
 * View Controller for top SubNav
 * @class SubNavController
 * @namespace Breeze.view.main.employees.SubNavController
 * @extends Breeze.controller.Base
 * @alias controller.main.employees.subnav
 */

Ext.define('Breeze.view.main.employees.SubNavController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.main.employees.subnav',

    /**
     * Called when the view is created
     */
    onInit: function () {


    },

    /** 
     * When tapped in the link of top subnav, redirect
    */
    onNavTap: function(t, e, eOpts){
        var type = t.getItemId(),
            urlObj = new URL(window.location.href),
            arr = urlObj.hash.split('/'),
            cat = arr[0].substring(1),
            id = arr[arr.length - 1];
            
        var itemId_arr = ['cal', 'empinfo', 'fyi', 'yag', 'wtv'];

        itemId_arr.forEach(function(itemId){
            var btn = t.parent.getComponent(itemId);
            if(itemId != type){
                btn.setPressed(false);
            }
        });

        this.redirectTo(
            `${cat}/${type}/${id}`
        );
    }
   
});