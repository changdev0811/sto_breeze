Ext.define('Breeze.view.employee.fyi.AccrualItem', {
    alias: 'widget.employee.fyi.accrualItem',
    extend: 'Ext.dataview.ListItem',
    requires: [
        'Ext.XTemplate'
    ],
    flex: 1,
    layout: 'vbox',
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'component',
                    flex: 1,
                    reference: 'categoryName'
                },
                {
                    xtype: 'component',
                    reference: 'usage'
                }
            ]
        },
        {
            xtype: 'progress',
            ui: 'employeefyi-progress',
            reference: 'bar',
            value: 0.5
            
        }
    ],
    updateRecord: function(record){
        this.lookup('categoryName').setHtml(record.get('CatDesc'));
        this.lookup('usage').setHtml(
            [record.get('CatRecorded'),'of',record.get('CatAllowed')].join(' ')
        );
        var bar = this.lookup('bar');
        bar.setValue(
            parseFloat(record.get('CatRecorded'))/parseFloat(record.get('CatAllowed'))
        );
        bar.el.child('.x-progress-bar', true).style.backgroundColor = record.get('CatColor');
        bar.el.child('.x-progress-bar', true).style.backgroundImage = 'none';

        
    }
});