Ext.define('Breeze.view.employee.fyi.AccrualItemController', {
    extend: 'Breeze.controller.Base',
    alias: 'controller.employee.fyi.accrualitem',

    onItemClick: function(){
        console.info('Fyi item clicked');
        var id = this.getView().getRecord().get('CatID');
        this.redirectTo(`personal/accrual_policy/${id}`);
    }

});