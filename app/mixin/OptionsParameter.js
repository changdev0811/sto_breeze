/**
 * Mixin providing access to a `resolveOptions` method that 
 * can be used to combine an object with optional params with a 
 * set of default values, supporting recursion
 * @class OptionsParameter
 * @namespace Breeze.mixin.OptionsParameter
 * @extend Ext.Mixin
 */
Ext.define('Breeze.mixin.OptionsParameter', {
    extend: 'Ext.Mixin',

    /**
     * Provide values for any options not set from a default object.
     * Functions recursively.
     * @param {Object} options Object containing options to provide defaults for
     * @param {Object} defaultOptions Object containing all default values, including nested
     * @return {Object} Copy of input object with defaults applied
     */
    resolveOptions: function (options, defaultOptions) {
        var isObj = function (a) {
            return (a !== null && typeof a == 'object') ?
                (a.constructor.name == "Object") : false;
        },
            resolve = function (opts, defOpts) {
                // console.group('Resolve for ', defOpts);
                var names = Object.keys(defOpts),
                    opts = (opts) ? opts : {};
                for (var i = 0; i < names.length; i++) {
                    var optName = names[i],
                        optObject = isObj(defOpts[optName]);
                    if (opts[optName]) {
                        // console.info('Found ', optName);
                        if (optObject) {
                            // console.info('Expecting Object...');
                            if (!isObj(opts[optName])) {
                                // console.warn('Wasn\'t Object, defaulting..');
                                opts[optName] = {};
                            }
                            // console.info('Recursing');
                            resolve(opts[optName], defOpts[optName]);
                        }
                    } else {
                        // console.info('Didn\'t find ', optName, ' Using default ', defOpts[optName]);
                        opts[optName] = defOpts[optName];
                    }
                }
                console.groupEnd();
            },
            options = (options && isObj(options)) ? options : {},
            working = JSON.parse(JSON.stringify(options));
        resolve(working, defaultOptions);
        return working;
    }
});