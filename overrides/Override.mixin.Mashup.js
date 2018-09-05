Ext.define('Override.mixin.Mashup', {
    override: 'Ext.mixin.Mashup',
    
    onClassMixedIn: function (targetClass) {
        if (targetClass.$className === 'Ext.ux.google.Map') {
            targetClass.prototype.requiredScripts = [
                '//maps.googleapis.com/maps/api/js?key=AIzaSyD33E6cI1FJh4cj6z7TaEUDzwMEvzlapqg&v=3.exp&sensor=true'
            ]
        }
        this.callParent([targetClass]);
    } 
});