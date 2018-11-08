/**
 * Admin API calls base class
 * Extends Breeze.api.Base.
 * @class Admin
 * @namespace Breeze.api.Admin
 */
Ext.define('Breeze.api.Admin', {
    extend: 'Breeze.api.Base',

    constructor: function(){
        this.accrualPolicies = Ext.create('Breeze.api.admin.AccrualPolicies');
    }

});