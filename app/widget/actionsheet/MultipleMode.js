/**
 * Extended ActionSheet that can contain multiple fields
 * that are shown or hidden based on the set mode
 * 
 * @example
 *      data object structure:
 *      {
 *          modes: {
 *              <modename>: {
 *                  title: 'title text',
 *                  show: [array of itemIds to show]
 *              }
 *          },
 *          mode: current modename
 *      }
 *  
 *      modes and mode values can also be passed as configs
 * @class MultipleMode
 * @namespace Breeze.widget.actionsheet.MultipleMode
 * @alias breeze.actionsheet.multiplemode
 * @xtype breeze-actionsheet-multiplemode
 * @extends Ext.ActionSheet
 * @author wvh <wade@ventureinteractive.com>
 */
Ext.define('Breeze.widget.actionsheet.MultipleMode', {
    extend: 'Ext.ActionSheet',
    alias: 'widget.breeze.actionsheet.multiplemode',
    xtype: 'breeze-actionsheet-multiplemode',

    config: {
        // Optional modes object, set as config
        modes: null,
        // Optional mode value, set as config
        mode: null
    },

    /**
     * Initialize component
     * If config values are provided, data object is updated accordingly
     */
    initialize: function(){
        this.callParent(arguments);
        var currentData = this.getData();
        if(!Object.isUnvalued(this.getModes())){
            currentData.modes = this.getModes();
        }
        if(!Object.isUnvalued(this.getMode())){
            currentData.mode = this.getMode();
        }
        this.setData(currentData);
        
    },

    /**
     * Change sheet mode, updating title and which items are visible
     * @param {String} mode Mode name; if not given, uses config mode value
     */
    setMode: function (mode) {
        var data = this.getData(),
            mode = Object.defVal(mode, this.getMode());
        if(!Object.isUnvalued(mode)){
            // Apply data and visibility update if mode given
            var modeOpts = data.modes[mode];
            data.title = modeOpts.title;
            data.mode = mode;

            this.setData(data);
            this.getItems().items.forEach((item)=>{
                if(modeOpts.show.includes(item.getItemId())){
                    item.setHidden(false);
                } else {
                    item.setHidden(true);
                }
            });
        }
    },

    /**
     * Remove sheet from shared Viewport without triggering destroy
     */
    removeFromViewport: function(){
        if(Ext.Viewport.getItems().contains(this)){
            Ext.Viewport.remove(this,false);
        }
    }

});