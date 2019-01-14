/**
 * Override class adding method for finding child components by itemId inside
 * container field components
 * @class Container
 * @namespace Breeze.overrides.field.Container
 * @override Ext.field.Container
 */
Ext.define('Breeze.overrides.field.Container', {
    override: 'Ext.field.Container',

    /**
     * Mimicks `getComponent` except finds item with matching itemId
     * located inside field container's items collection
     * @param {String} itemId ItemID string value to search for
     * @return {Object} Component found by itemId, or null if none found
     */
    getComponentInItems: function (itemId) {
        var items = this.getItems(),
            // Method for finding item by itemId inside item collection
            byId = (item, id) => { return item.getItemId() == id; };
        
        return items.findBy((i)=>{return byId(i,itemId);});
    }

});