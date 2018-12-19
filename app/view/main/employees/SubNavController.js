/**
 * View Controller for Employees Panel
 * @class PanelController
 * @namespace Breeze.view.main.employees.PanelController
 * @extends Breeze.controller.Base
 * @alias main.employees.panel
 */

Ext.define('Breeze.view.main.employees.SubNavController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.main.employees.subnav',

    /**
     * Called when the view is created
     */
    onInit: function () {


    },


    onNavTap: function(bp){
        //setPressed:true/false
        console.log("[onNavTap]");
        
        var b_arr = ['cal', 'empinfo', 'fyi', 'yag', 'wtv'];
        //var cb_itemId = bp.get('itemId');

        console.log(bp);

        for(var i = 0; i < b_arr.length; i++){
            var btn = bp.parent.getComponent(b_arr[i]);
            if(btn != bp){
                btn.setPressed(false);
            }
        }
        


    }
   
});