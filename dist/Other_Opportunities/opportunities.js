/***********************************************************
*
*   create by Amur
*   Other Opportunities
*   Github https://github.com/AmurKhoyetsyan/Progress-Bar
*
************************************************************/

'use strict';

class GetterSetterParameters {
    constructor(elem){
        this.elem = elem;
    };

    /**
     * @returns {Number}
     * @constructor
     */
    get Height(){
        if(this.elem){
            return parseFloat(this.elem.clientHeight);
        }
    };

    /**
     * @param height
     * @constructor
     */

    set Height(height){
        if(this.elem){
            if((typeof height === 'number') && (!isNaN(height))){
                this.elem.style.height = height + 'px';
            }else if(typeof height === 'string'){
                this.elem.style.height = height;
            }
        }
    };

    /**
     * @returns {Number}
     * @constructor
     */

    get Width(){
        if(this.elem){
            return parseFloat(this.elem.clientWidth);
        }
    };

    /**
     * @param width
     * @constructor
     */

    set Width(width){
        if(this.elem){
            if((typeof width === 'number') && (!isNaN(width))){
                this.elem.style.width = width + 'px';
            }else if(typeof width === 'string'){
                this.elem.style.width = width;
            }
        }
    };

    /**
     * Replace Char or Text in String
     * @param count
     * @param search
     * @param replace
     * @returns {string}
     */

    replaceAll(count, search, replace){
        return count.split(search).join(replace);
    };

    /**
     * Getter Coefficient for Stroke
     * @param parent
     * @param child
     * @returns {{parent: number, child: number}}
     * @private
     */

    getCoefficient(parent, child){
        if(parent > child){
            if(parent / 2 > child){
                return {
                    parent: 0,
                    child: (parent / 2) - child
                };
            }else{
                return {
                    parent: 0,
                    child: 0
                };
            }
        }else if(parent < child){
            if(child / 2 > parent){
                return {
                    parent: (child / 2) - parent,
                    child: 0
                };
            }else{
                return {
                    parent: 0,
                    child: 0
                };
            }
        }else {
            return {
                parent: 0,
                child: 0
            };
        }
    }
}