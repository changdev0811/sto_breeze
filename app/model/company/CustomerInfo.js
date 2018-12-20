/**
 * Customer Info model
 * (from /CustomerInfo)
 * 
 * @class CustomerInfo
 * @namespace Breeze.model.company.CustomerInfo
 */
Ext.define('Breeze.model.company.CustomerInfo', {
	extend: 'Breeze.model.Base',
	fields: [
		{name: 'company_code', type: 'string'},
		{name: 'customer_id', type: 'string'},
		{name: 'contact_first_name',	type: 'string'},
		{name: 'contact_last_name', type: 'string'},
		{name: 'contact_job_title', type: 'string'},
		{name: 'contact_mobile',	type: 'string'},
		{name: 'contact_email', type: 'string'},
		{name: 'business_name', type: 'string'},
		{name: 'logo_path',	type: 'string'},
		{name: 'address', type: 'string'},
		{name: 'address2', type: 'string'},
		{name: 'city',	type: 'string'},
		{name: 'zip_code', type: 'string'},
		{name: 'state_id', type: 'integer'},
		{name: 'state_other',	type: 'string'},
		{name: 'time_zone_code', type: 'integer'},
		{name: 'country_id', type: 'integer'},
		{name: 'phone_no',	type: 'string'},
		{name: 'phone_no2', type: 'string'},
		{name: 'alternate_email', type: 'string'},
		{name: 'status_code',	type: 'integer'},
		{name: 'employee_licenses', type: 'integer'},
		{name: 'AMOSId', type: 'string'},
		{name: 'renewal_date',	type: 'string'},
		{name: 'salesperson', type: 'string'},
		{name: 'note', type: 'string'},
		{name: 'amount',	type: 'number'},
		{name: 'activeemps', type: 'integer'},
		{name: 'termemps', type: 'integer'},
		{name: 'delemps', type: 'integer'},
		{name: 'product', type: 'string'},
		{name: 'server_name', type: 'string'},
		{name: 'date_created', type: 'string'},
	    {name: 'has_timekron', type: 'boolean'}
	]	
});



