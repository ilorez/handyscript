/**
 * 
 * @returns {object} an object containing the operators
 * @example
 * // 1.
 * import {and, or, not, is, get} from "./syntax/operateurs.js";
 * and(true, true, true) // true
 * // ......
 * // 2.
 * import * as operateurs from "./syntax/operateurs.js";
 * operateurs.and(true, true, true) // true
 * // ......
 */
const operateurs = {
// export default {    
    /**
     * it returns true if all the arguments are true
     * @param  {...any} args
     * @returns {boolean}
     * @example
     * and(true, true, true) // true
     */
    and : (...args) => args.every(arg => arg === true),

    /**
     * it returns true if any of the arguments is true
     * @param  {...any} args
     * @returns {boolean}
     * @example
     * or(true, false, false) // true
     */
    or : (...args) => args.some(arg => arg === true),

    /**
     * it returns the opposite of the argument given
     * @param {any} arg
     * @returns {boolean}
     * @example
     * not(true) // false
     */
    not : arg => !arg,

    /**
     * the `is` function is used to compare two values if they are truly equal
     * @param {any} value1
     * @param {any} value2
     * @returns {boolean}
     * @example
     * is(1, 1) // true
     * is("hello", "hi") // false
     * // Objects are compared by their keys recursively
     * const obj1 = {name: "john", age: 20};
     * const obj2 = {name: "john", age: 20};
     * is(obj1, obj2) // true
     * 
     * // Functions are compared by their source code
     * const fn1 = () => console.log("hello");
     * const fn2 = () => console.log("hi");
     * is(fn1, fn2) // false
     * 
     * // Dates are compared by their millisecond representation
     * const date1 = new Date();
     * const date2 = new Date(date1.getTime());
     * is(date1, date2) // true
     * 
     * // Regular expressions are compared by their source code
     * const reg1 = /hello/;
     * const reg2 = /hi/;
     * is(reg1, reg2) // false
     */
    is: (value1, value2) => {
        switch (typeof value1) {
            // compare functions by their source code
            case 'function': return value1.toString() === value2.toString();

            // compare object by keys recursively
            case 'object': 
                if (or(value1 === null, value2 === null)) { return value1 === value2 };

                switch (value1.constructor) {
                    // compare dates by their millisecond representation
                    case Date: return value1.getTime() === value2.getTime();
                    // compare regular expressions by their source code
                    case RegExp: return value1.toString() === value2.toString();

                    default:
                        if (not(is(value1.constructor, value2.constructor))) { return false }

                        const keys1 = Object.keys(value1);
                        const keys2 = Object.keys(value2);

                        if (not(is(keys1.length, keys2.length))){ return false };
                        
                        return keys1.every(key => is(value1[key], value2[key]));
                }

            default: return value1 === value2;
        }
    },

    /**
     * loops through the given iterations and calls the callback function with the index ```i``` as argument
     * @param {number} iterations// the number of iterations to loop through
     * @param {CallableFunction} callback // the function to call in each iteration with the `index` ```i``` as argument
     * @example
     * loop(5, i=>console.log(i)) // 0 1 2 3 4
     */
    loop : (iterations,cb)=>{for (let i = 0; i < iterations; i++) {cb(i)}},

    /**
     * loops through the given `object` and calls the `callback` function with the `key` as argument
     * @param {object} obj // the object to loop through
     * @param {CallableFunction} callback // the function to call in each iteration with the `key` as argument
     * @example
     * const obj = {name:"ahmed", age: 20};
     * objloop(obj, (key, val) => console.log(key, val))
     * // name ahmed
     * // age 20
     */
    objloop : (obj, cb) => { for ( const key in obj) {cb(key, obj[key])} },

    /**
     * @deprecated use `objloop` instead
     * 
     */
    keyloop : (obj, cb) => { for ( const key in obj) {cb(key)} },
    print :  console.log,
    log :  console.log,
    
}

export const {and, or, not, is, loop, objloop, keyloop, print, log} = operateurs;