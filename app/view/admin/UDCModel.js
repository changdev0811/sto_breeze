/**
 * View Model class for UDC Admin view
 * @class UDCModel
 * @namespace Breeze.view.admin.UDCModel
 * @alias viewmodel.admin.udc
 */
Ext.define('Breeze.view.admin.UDCModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin.udc',

    constructor: function(cfg){
        this.callParent([cfg]);
    },

    data: {
    	// TODO: change to null
    	selectedCat: null
    },


    /*
    formulas: {
    	selectedCat: function(get){
    		var cat = get('cats').findRecord('Category_Id', get('selectedCategoryID'));
    		return cat;
    	},
    },
    */

	stores: {
        // TODO: Remove when API dummy is available
        /*
        cats: {
            data: [
            	{
					"Category_Id": "1",
					"Category_Name": "New Category",
					"Category_Abbreviated": "New Cat",
					"Category_Order": 0,
					"Category_Code": "",
					"HexColor": "#000000",
					"Category_Paycode": "PayCode", //<-- NEW 
					"Picture_Path": "",
					"Picture_Abbreviated": "",
					"isAllowed": true,
					"isActive": true,
					"minUse_Amount": 0,
					"minUse_Unit": 49,
					"minUse_waitDays": 0,
					"ShowName": true,
					"isLeaveRequest": true,
					"isPaid": true,
					"isOverTime": true,
					"isAccrued": true,
					"color_red": 0,
					"color_green": 0,
					"color_blue": 0
				}
            ]
        },

                minUseUnit:{
        	fields: ['code', 'description'],
            data: [
                { "code": 48, "description": "Days" },
                { "code": 49, "description": "Hours" },
                { "code": 50, "description": "Minutes" }

            ]
        }
        */
    }

});