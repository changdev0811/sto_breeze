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

    /**
     * Apply styling to node based on available rule set
     * @param {Object} node Node to style
     */
    styleFromRule: function (node) {
        var data = node.getData(),
            rules = Breeze.helper.settings.StyleRules[this.getRuleSet()],
            ruleNames = Object.keys(rules);
        
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