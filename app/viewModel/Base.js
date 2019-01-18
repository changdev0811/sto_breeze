/**
 * Extended version ViewModel class
 * @class Base
 * @namespace Breeze.viewmodel.Base
 * @extends Ext.app.ViewModel
 */
Ext.define('Breeze.viewmodel.Base', {
    extend: 'Ext.app.ViewModel',

    /**
     * Assign the same value to multiple data attributes at once
     * @param {(Array|String)} names Destination data field name (string) or
     *       names (Array)
     * @param {Object} value Value to assign to all targets
     */
    setMultiple: function (names, value) {
        var names = Array.wrap(names);
        for (var i = 0, n = names[0]; i < names.length; i++ , n = names[i]) {
            this.set(n, value);
        }
    },

    mapFromRecord: function(map, source, flat=false, toString=false){
        var output = Ext.clone(map),
            keys = Object.keys(map);
        for(var i = 0; i < keys.length; i++){
            var name = keys[i],
                prop = map[name];
            if(typeof prop == 'function'){
                output[name] = prop(source);
            } else {
                if(flat){
                    output[name] = source[prop];
                } else {
                    output[name] = source.get(prop);
                }
            }
            if(toString){
                output[name] = output[name].toString();
            }
        }
        return output;
    },

    mapFromRecords: function(map, source, flat=false){
        var output = {},
            templ = Ext.clone(map),
            keys = Object.keys(map),
            records = null;
        for(let i=0;i<keys.length;i++){
            // fill output values with empty arrays
            output[keys[i]]=[];
        }
        if(flat){
            records = source;
        } else {
            records = source.getData().items;
        }
        for(let i=0;i<records.length;i++){
            let record = records[i];
            for(let k=0;k<keys.length;k++){
                let key = keys[k],
                    prop = map[key];
                if(typeof prop == 'function'){
                    output[key].push(prop(record));
                } else {
                    output[key].push(
                        (flat)? record[prop] : record.get(prop)
                    );
                }
            }
        }
        for(let i=0;i<keys.length;i++){
            // fill output values with empty arrays
            output[keys[i]] = output[keys[i]].join(',');
        }

        return output;
    }
});