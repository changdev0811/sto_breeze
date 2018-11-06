/**
 * Mixin giving list API response rule-based node styling functionality
 * to TreeStores
 * @class ListStylable
 * @namespace Breeze.mixin.ListStyleable
 * @alias mixin.liststyleable
 */
Ext.define('Breeze.mixin.ListStylable', {
    extend: 'Ext.Mixin',
    alias: 'mixin.liststyleable',
    
    ruleSet: null,
    ruleNames: null,

    /**
     * Recursively style all nodes using provided ruleset
     * @param {Array} records Collection of records to style
     */
    applyStyling: function(records){
        this.rules = Breeze.helper.settings.StyleRules[this.ruleSet];
        this.ruleNames = Object.keys(this.rules);

        var me = this,
            travel = (rec) => {
                me.styleNode(rec);
                if(rec.childNodes.length > 0){
                    rec.childNodes.forEach((c)=>{travel(c);});
                }
        };
        records.forEach((r)=>{travel(r);});
    },

    /**
     * Apply styling to node based on available rule set
     * @param {Object} node Node to style
     */
    styleNode: function (node) {
        var data = node.getData(),
            rules = this.rules,
            ruleNames = this.ruleNames;
        
        // Automatically make node function as leaf if it has no children
        if(node.childNodes == null || node.childNodes.length == 0){
            node.set('leaf', true);
        }

        if(ruleNames.includes(data.type)){
            var rule = rules[data.type];
            if(rule.conditional){
                // Deep conditional rule, resolve condition
                var p = Object.resolveNestedPath(data, rule.attribute, true);
                if(p !== null){
                    // Condition resolved, apply styles
                    var val = rule.choices[p],
                        attrs = Object.keys(val);
                    attrs.forEach((a)=>{
                        node.set(a, val[a]);
                    })
                }
            } else {
                // Apply direct rule
                var attrs = Object.keys(rule);
                attrs.forEach((a)=>{
                    node.set(a, rule[a]);
                });
            }
        }
    }

});