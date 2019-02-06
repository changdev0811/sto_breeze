/**
 * Plugin allowing easier attachment of asynchronous 
 * validation functions to field components.
 * @class AsyncValidation
 * @memberof Breeze.plugin.field
 */
Ext.define('Breeze.plugin.field.AsyncValidation', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.breeze.field.asyncvalidation',

    /**
     * @memberof Breeze.plugin.field.AsyncValidation
     * @class
     * @static
     */
    config: {
        /**
         * Name of async validation function to call in controller
         * 
         * if aftervalidationfail or aftervalidationpass listeners are 
         * defined on host component, one is fired after validation finishes
         * based on outcome
         * 
         * If validator returns a promise directly, wrapPromise should be true
         * Otherwise, validator should be a promise returning resolve or reject
         * (See inner method wrap in callValidator function)
         */
        validator: null,
        /**
         * If true, expect validator to return a promise, which
         * will be wrapped to correctly work with async. If false,
         * validator must match the structure of this class's wrapPromise
         * method
         * @member {Boolean}
         */
        wrapPromise: true,
        /**
         * Event that triggers validation
         */
        triggerEvent: 'change',
        /**
         * View controller reference; if not set, auto searches
         * through parents to find controller
         */
        controller: null,
    },

    init: function (host) {
        if (this.getController() == null) {
            this.findController(host);
        }
        this.attach(host);
    },

    privates: {
        /**
         * Attach event listener to component
         * @param {Object} host Component
         */
        attach: function (host) {
            var controller = this.getController(),
                validator = this.getValidator(),
                trigger = this.getTriggerEvent(),
                wrap = this.getWrapPromise(),
                call = this.callValidator;
            host.addListener(trigger, (cmp) => {
                call(
                    cmp,
                    controller[validator],
                    wrap
                );
            });
        },
        /**
         * Execute validator function asynchronously, firing appropriate
         * aftervalidation event if listener is available on resolution
         * @param {Object} cmp Host component
         * @param {Function} fn Validator function
         * @param {Boolean} wrap Whether validation function needs to be wrapped
         */
        callValidator: async function (cmp, fn, wrap) {
            var hasAfterFail = cmp.hasListener('aftervalidationfail'),
                hasAfterPass = cmp.hasListener('aftervalidationpass');

            /** 
             * Function used to wrap validator function if wrap
             * is true, meaning it returns a regular promise 
             */
            var wrapper = async function (promiseFn, val) {
                return new Promise((resolve, reject) => {
                    promiseFn(val).then((r) => {
                        return resolve(r);
                    }).catch((err) => {
                        return reject(err);
                    });
                });
            };

            try {
                let result = (wrap)? await wrapper(fn, cmp.getValue()) : fn(cmp.getValue());
                cmp.clearInvalid();
                if (hasAfterPass) {
                    cmp.fireEvent('aftervalidationpass', cmp, result);
                }
            } catch (err) {
                cmp.markInvalid(err);
                if (hasAfterFail) {
                    cmp.fireEvent('aftervalidationfail', cmp, err);
                }
            }
        },
        /**
         * Traverse host component's parents until one is found with a 
         * view controller
         * @param {Object} host Host component
         */
        findController: function (host) {
            var controller = host.getController(),
                loc = host;
            while (controller == null && loc.getParent() !== null) {
                controller = loc.getController();
                loc = loc.getParent();
            }
            this.setController(controller);
        }
    }
});