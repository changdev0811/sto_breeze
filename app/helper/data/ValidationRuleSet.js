/**
 * Helper class for running multiple validation rules on a set of
 * values at once, executing logic conditional on pass/fail of each rule,
 * and ability to check if all tests passed or one or more failed
 * @class ValidationRuleSet
 * @namespace Breeze.helper.data.ValidationRuleSet
 * @author wadevh
 */
Ext.define('Breeze.helper.data.ValidationRuleSet', {

    config: {
        // Default name of post-pass function
        passFunction: 'passFn',
        // Name of post-fail function
        failFunction: 'failFn',
        // Name of test function
        testFunction: 'fn',
        // Validation rules, stored in Obj with named keys
        /* Example
        {
            equal: {
                fn: (get)=>{return (get('a') == get('b'));},
                passFn: (get, ruleName) => {console.info(`${ruleName} passed`)},
                failFn: (get, ruleName)=>{console.warn(`${ruleName} failed`)}
            }
        }
        */
        rules: {},
        // Auto populated in constructor
        ruleNames: [],
        errors: []
    },

    /**
     * 
     * Include named rules in rules attribute in constructor.
     * This method will move a unique copy of said rules into rules,
     * and store an array of the rule names in ruleNames
     * 
     * @param {Object} cfg 
     */
    constructor: function (cfg) {
        this.initConfig(cfg || {});
        this.setRuleNames(Object.keys(this.getRules()));
    },

    /**
     * Run single rule, returning true/false based on pass, and
     * executing passFn or failFn if defined for rule
     * @param {String} ruleName Name of rule to run
     * @param {Object} values Object containing key named variables accessible by get
     * @param {Boolean} preserveErrors If true, allows error messages to accumulate between runs
     * @return {Boolean} True for pass, fail for fail; undefined if invalid rule 
     *  name given
     */
    run: function (ruleName, values, preserveErrors=false) {
        if(!preserveErrors){
            this.setErrors([]);
        }
        /**
         * Helper function passed to rule functions allowing named lookup of values
         * included in values param
         * @param {String} name value key name
         */
        var get = function (name) { return values[name]; },
            rules = this.getRules(),
            names = this.getRuleNames(),
            passFn = this.getPassFunction(),
            failFn = this.getFailFunction(),
            testFn = this.getTestFunction();

        if (names.includes(ruleName)) {
            let rule = rules[ruleName],
                result = rule[testFn](get);
            if (result) {
                // Rule test passed, run passFn if defined
                if (rule[passFn]) {
                    rule[passFn](get, ruleName);
                }
                // Return passing bool
                return true;
            } else {
                // Rule test failed, run failFn if defined
                if (rule[failFn]) {
                    let error = rule[failFn](get, ruleName);
                    if(error){
                        this.addError(error);
                    }
                }
                // Return fail bool
                return false;
            }
        } else {
            return undefined;
        }
    },

    /**
     * Run all test rules in set and return object with results stored by rule name
     * @param {Object} values Object containing key named variables accessible by get
     * @return {Object} Test results, stored under rule names
     */
    runAll: function (values) {
        this.setErrors([]);
        var get = function (name) { return values[name]; },
            names = this.getRuleNames(),
            results = {};

        for (var i = 0; i < names.length; i++) {
            let name = names[i];
            results[name] = this.run(name, values, true);
        }

        return results;
    },

    /**
     * Return bool indicating if all passed, or one or more failed
     * @param {Object} result Result object returned from runAll
     * @return {Boolean} True if all passed, false if one or more failed
     */
    allPassed: function (result) {
        var names = this.getRuleNames(),
            passed = true;
        for (var i = 0; i < names.length; i++) {
            passed = passed && result[names[i]];
        }
        return passed;
    },

    privates: {
        addError: function(message){
            var errors = this.getErrors();
            errors.push(message)
            this.setErrors(errors);
        }
    }

});