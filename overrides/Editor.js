/**
 * Override for `Ext.Editor` that fixes bug for onEditComplete when field is a
 * container field
 * @class Editor
 * @namespace Breeze.overrides.Editor
 * @override Ext.Editor
 */
Ext.define('Breeze.overrides.Editor', {
    override: 'Ext.Editor',


    /**
     * Overrides Ext.Editor.onEditComplete to prevent an error when fired on editor
     * consisting of a Ext.field.Container component
     * 
     * @param {Boolean} remainVisible 
     * @param {Boolean} cancelling 
     * @override
     */
    onEditComplete: function (remainVisible, cancelling) {
        var me = this,
            field = me.getField();
        if(
            (field.getXTypes() && field.getXTypes().endsWith('fieldcontainer')) ||
            field.xtype == 'fieldcontainer'
        ){
            // If field is a field container, do everything except set style on input elements
            me.editing = false; 
            if(remainVisible !== true){
                me.hide();
                me.toggleBoundEl(true)
            };
            field.getItems().items.forEach((itm)=>{
                try{
                    itm.inputElement.setStyle('font',null);
                }catch(ex){
                    console.warn('onEditComplete setStyle failed');
                }
            });
        } else {
            // If field isn't a field container, use default behavior
            this.callParent(arguments);
        }
        

    }

});