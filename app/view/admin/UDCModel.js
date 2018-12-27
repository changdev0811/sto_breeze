/**
 * View Model class for UDC Admin view
 * @class UDCModel
 * @namespace Breeze.view.admin.UDCModel
 * @alias viewmodel.admin.udc
 */
Ext.define('Breeze.view.admin.UDCModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin.udc',

    data: {
    	categoryData: null,
        catCol: '#00ff00',
        // Confirmation dialog box message text for deleting categories
        messages: {
            confirmDeleteInUse: `This category is in use.<br>
            Are you sure you want to delete this category?<br>
            This action cannot be undone (category history will be kept).`,
            confirmDeleteTiedToPoint: `This category is tied to at least one point category.<br>
            Are you sure you want to delete this category?<br>
            This action cannot be undone (category history will be kept).`
        }
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
        // Color presets
         colors:{
            fields: ['hex', 'r', 'g', 'b'],
            data: [
                { hex:'#293835', r:41,  g:56,  b:53  },
                { hex:'#5E6A67', r:94,  g:106, b:103 },
                { hex:'#939B99', r:147, g:155, b:153 },
                { hex:'#C9CDCC', r:201, g:205, b:204 },
                { hex:'#FFFFFF', r:255, g:255, b:255 },
                { hex:'#946663', r:148, g:102, b:99  },
                { hex:'#CB7D7B', r:203, g:125, b:123 },
                { hex:'#FF9595', r:255, g:149, b:149 },
                { hex:'#FFAFAE', r:255, g:175, b:174 },
                { hex:'#FFCAC9', r:255, g:202, b:201 },
                { hex:'#938162', r:147, g:129, b:98  },
                { hex:'#C9A779', r:201, g:167, b:121 },
                { hex:'#FECB95', r:254, g:203, b:149 },
                { hex:'#FFD9AC', r:255, g:217, b:172 },
                { hex:'#FFE5C8', r:255, g:229, b:200 },
                { hex:'#919C65', r:145, g:156, b:101 },
                { hex:'#C6CE7E', r:198, g:206, b:126 },
                { hex:'#FBFF9D', r:251, g:255, b:157 },
                { hex:'#FCFFB1', r:252, g:255, b:177 },
                { hex:'#FDFFCC', r:253, g:255, b:204 },
                { hex:'#608064', r:96,  g:128, b:100 },
                { hex:'#7DA47C', r:125, g:164, b:124 },
                { hex:'#9BC796', r:155, g:199, b:150 },
                { hex:'#B3D6AF', r:179, g:214, b:175 },
                { hex:'#CCE3CA', r:204, g:227, b:202 },
                { hex:'#4E786A', r:78,  g:120, b:106 },
                { hex:'#619885', r:97,  g:152, b:133 },
                { hex:'#77B9A1', r:119, g:185, b:161 },
                { hex:'#97CAB8', r:151, g:202, b:184 },
                { hex:'#BADCD0', r:186, g:220, b:208 },
                { hex:'#507E82', r:80,  g:126, b:130 },
                { hex:'#65A1AB', r:101, g:161, b:171 },
                { hex:'#7DC5D1', r:125, g:197, b:209 },
                { hex:'#9CD2DC', r:156, g:210, b:220 },
                { hex:'#BEE2E8', r:190, g:226, b:232 },
                { hex:'#57849A', r:87,  g:132, b:154 },
                { hex:'#6FAACE', r:111, g:170, b:206 },
                { hex:'#8AD0FF', r:138, g:208, b:255 },
                { hex:'#A5DBFF', r:165, g:219, b:255 },
                { hex:'#C4E8FF', r:196, g:232, b:255 },
                { hex:'#2B6C9C', r:43,  g:108, b:156 },
                { hex:'#2D88CF', r:45,  g:136, b:207 },
                { hex:'#38A4FF', r:149, g:155, b:210 },
                { hex:'#68BAFF', r:104, g:186, b:255 },
                { hex:'#9BD0FF', r:155, g:208, b:255 },
                { hex:'#5E6984', r:94,  g:105, b:132 },
                { hex:'#7981AB', r:121, g:129, b:171 },
                { hex:'#959BD2', r:149, g:155, b:210 },
                { hex:'#AFB3DF', r:175, g:179, b:223 },
                { hex:'#CACCEA', r:202, g:204, b:234 },
                { hex:'#796774', r:121, g:103, b:116 },
                { hex:'#A37E94', r:163, g:126, b:148 },
                { hex:'#CB97B4', r:203, g:151, b:180 },
                { hex:'#D9B0C7', r:217, g:176, b:199 },
                { hex:'#E6CBDA', r:230, g:203, b:218 }
            ]
        }


    }

});