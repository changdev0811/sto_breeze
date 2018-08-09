/**
 * Company config store
 * from /ConfigStore
 * @class Config
 * @alias Breeze.store.company.Config
 */
Ext.define('Breeze.store.company.Config', {
	extend: 'Breeze.store.Base',
	model: 'Breeze.model.company.Config',
	autoLoad: false,
	storeId: 'CompanyConfig',
	listeners: {
		beforeload: function() {
			this.provideAuthCookieToProxy();
		},
		// load: function() {
		// 	//Set the logo
		// 	var theData = Ext.getStore('ConfigStore').getAt(0);
			
		// 	var thisPanel =Ext.getCmp('workArea');
		// 	var xpoint = (thisPanel.getWidth() / 2) - (theData.get('LogoWidth')/ 2);
		// 	var ypoint = (thisPanel.getHeight() / 2) - (theData.get('LogoHeight')/ 2);
		// 	var myLogo =Ext.getCmp('CenterLogo');
		// 	if (myLogo) { 
		// 		myLogo.destroy();
		// 		}
		// 	var newImage = new Ext.Img(
		// 		{
		// 			x: xpoint,
		// 			y: ypoint,
		// 			id: 'CenterLogo',
		// 			width: Ext.getStore('ConfigStore').getAt(0).get('LogoWidth'),
		// 			height: Ext.getStore('ConfigStore').getAt(0).get('LogoHeight'),
		// 			style: {
		// 				opacity:0.4,
		// 				filter:'alpha(opacity=40)'
		// 			},
		// 			src: Ext.getStore('ConfigStore').getAt(0).get('LogoPath')+"?bob="+randomString()
		// 		}
		// 	);
			
		// 	Ext.form.field.Date.prototype.startDay = theData.get('StartOfWeek') - 1;
		// 	thisPanel.add(newImage);
		// 	//.update('<div class="vcenter"><div class="center"><img src="' + Ext.getStore('ConfigStore').getAt(0).get('LogoPath') + '"/></div></div>')
		// }
	
	},
	proxy: {
		type: 'ajax', // Because it's a cross-domain request
		url : Breeze.helper.Store.api.url('getCompanyConfig'),
		headers: { 'Content-Type': 'application/json;' },
		actionMethods: {
			create : 'POST',
			read   : 'POST',
			update : 'POST',
			destroy: 'POST'
		},
		reader: {
			type: 'json',
			rootProperty: 'd' // The returned JSON will have array
					  // of users under a "users" property
		},
		// Don't want proxy to include these params in request
		pageParam: undefined,
		startParam: undefined
	}
});