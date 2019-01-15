/**
 * Override for CellEditing plugin allowing additional event
 * listeners to be added.
 * 
 * Events added to owning grid:
 * - beforeedit: Editor's beforestartedit event (handler params [location, editor])
 * - edit: Editor's complete event (handler params [location, editor])
 * - beforecompleteedit: Editor's beforecomplete event (handler params [location, editor])
 * 
 * Credit: http://www.coding-ideas.de/2018/06/06/adding-events-to-cellediting-plugin-in-modern-toolkit/
 */
Ext.define('Overrides.grid.plugin.CellEditing', {
    override: 'Ext.grid.plugin.CellEditing',

    getEditor: function (location) {
        var editor = this.callParent([location]);
        if (editor) {
            this.addEditorEvents(editor, location);
        }
        return editor;
    },

    addEditorEvents: function (editor, location) {
        // Event handler for beforestartedit (beforeedit)
        editor.on('beforestartedit', function () {
            var handlerResult = this.getGrid().fireEvent('beforeedit', location, editor);
            if (handlerResult === false) {
                editor.hide();
            }
            return handlerResult;
        }, this, {
                single: true
            }
        );

        // Event handler for complete (edit)
        editor.on('complete', function () {
            this.getGrid().fireEvent('edit', location, editor);
        }, this, {
                single: true
            }
        );

        // Event handler for before complete (beforecompleteevent)
        editor.on('beforecomplete', function (c, currentVal, startVal) {
            this.getGrid().fireEvent(
                'beforecompleteedit', location, editor, currentVal, startVal
            );
        }, this, {
                single: true
            }
        );
    }

});