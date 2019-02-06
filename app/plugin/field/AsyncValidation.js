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
     * @inner
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
         * @member {Function}
         */
        validator: null,
        /**
         * If true, expect validator to return a promise, which
         * will be wrapped to correctly work with async. If false,
         * validator must match the structure of this class's wrapPromise
         * method
         * @member {Boolean}
         * @default
         */
        wrapPromise: true,
        /**
         * Event that triggers validation
         * @member {String}
         * @default
         */
        triggerEvent: 'change',
        /**
         * View controller reference; if not set, auto searches
         * through parents to find controller
         * @member {Object}
         */
        controller: null,
        /**
         * If true, validation occurs reguardless of readonly/disabled/editable state
         * @member {Boolean}
         * @default
         */
        force: true
    },
    
    init: function (host) {
        this.host = host;
        
        if(this.getController() == null){
            this.findController();
        }
        
        this.attach();
    },

    /**
     * Handle when enabled config property is updated.
     * Attatch or detatch based on value
     * @param {Boolean} newVal 
     * @param {Boolean} oldVal 
     */
    updateEnabled: function(newVal, oldVal){
        if(!this.host){
            return null;
        }
        if(newVal && !this.attached){
            this.attach();
        } else if(!newVal && this.attached){
            this.detatch();
        }
    },

    privates: {

        /**
         * Reference to host component
         * @memberof {Object} Breeze.plugin.field.AsyncValidation
         * @default
         */
        host: null,

        /**
         * Attach event listener to component
         * @memberOf Breeze.plugin.field.AsyncValidation
         * @private
         */
        attach: function () {
            var host = this.host,
                controller = this.getController(),
                validator = this.getValidator(),
                trigger = this.getTriggerEvent(),
                wrap = this.getWrapPromise(),
                call = this.callValidator,
                isAllowed = this.isAllowed,
                self = this;
            
            this.triggerListener = (cmp) => {
                if(isAllowed(self)){
                    call(
                        cmp,
                        controller[validator],
                        wrap
                    );
                }
            };

            host.addListener(trigger, this.triggerListener);
        },

        /**
         * Returns bool indicating whether validation is allowed, based
         * on whether field is readonly/disabled/editable. If force is true, the
         * other properties are ignored
         * @return {Boolean} True if validation is allowed, false otherwise
         * @memberof Breeze.plugin.field.AsyncValidation
         * @private
         */
        isAllowed: function(self){
            var host = self.host,
                def = (prop, val)=>{return Object.defVal(host[`get${prop}`](),val,true); };
            return (
                self.getForce() || 
                (!def('ReadOnly', false) && !def('Disabled', false) && def('Editable', true))
            );
        },

        /**
         * Execute validator function asynchronously, firing appropriate
         * aftervalidation event if listener is available on resolution
         * @param {Object} cmp Host component
         * @param {Function} fn Validator function
         * @param {Boolean} wrap Whether validation function needs to be wrapped
         * @memberOf Breeze.plugin.field.AsyncValidation
         * @private
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
         * @memberOf Breeze.plugin.field.AsyncValidation
         * @private
         */
        findController: function () {
            
            // // Generic upward scan for component with get property
            // var scanUp = (target) => {
            //     let fn = `get${target}`,
            //         match = host[fn](),
            //         loc = host;
            //     while(match == null && loc.getParent() !== null){
            //         loc = loc.getParent();
            //         match = loc[fn]();
            //     }

            //     return {cmp: loc, match: match};
            // };

            // // Scan for controller + owning component and viewModel + owning component
            // var controllerScan = scanUp('Controller'),
            //     viewModelScan = scanUp('ViewModel');
            
            // this.setController(controllerScan.match);
            // this.root = {
            //     components: {
            //         controller: controllerScan.cmp,
            //         viewModel: viewModelScan.cmp
            //     },
            //     viewModel: viewModelScan.match
            // };
            
            var controller = this.host.getController(),
                loc = this.host;
            while (controller == null && loc.getParent() !== null) {
                loc = loc.getParent();
                controller = loc.getController();
            }

            this.setController(controller);
        }
    }
});