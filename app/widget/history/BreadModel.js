Ext.define('Breeze.widget.history.BreadModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.breeze.history.bread',
    stores: {
        crumbs: {
            model: 'Breeze.model.data.HistoryCrumb',
            data: []
        }
    }
});