/**
 * View Model class for MOTD Admin view
 * @class HolidayEditorModel
 * @namespace Breeze.view.admin.MOTDModel
 * @alias viewmodel.admin.motd
 */
Ext.define('Breeze.view.admin.MOTDModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin.motd',

    data: {
        // ID of selected department
        motdText: null
    },

    formulas: {
        /**
         * get the MODT HTML 
         * return MOTD striped of HTML tags and decode entities
         */
        motdText: function(get){
        	var str = get('MOTD').MOTDhtml;
				str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
				str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
			var element = document.createElement('div');
				element.innerHTML = str;
			return element.textContent	
        }
    },


    stores: {
    	MOTD:{
			MOTDhtml: "<span style=\"font-family: tahoma, arial, verdana, sans-serif;\">Hello!</span><font face=\"tahoma\">&nbsp;<b>Hi</b></font>",
			hasMOTD: true
		}
    }

});





