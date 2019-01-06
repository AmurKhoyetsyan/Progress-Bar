/*********************************************
*
*   create by Amur
*   Other Opportunities
*
*********************************************/

'use strict';

class GeterSeterParameters {
    constructor(elem){
        this.elem = elem;
    }

    get Height(){
        return parseFloat(this.elem.clientHeight);
    }

    set Height(height){
        if((typeof height === 'number') && (!isNaN(height))){
            this.elem.style.height = height + 'px';
        }else if(typeof height === 'string'){
            this.elem.style.height = height;
        }
    }

    get Width(){
        return parseFloat(this.elem.clientWidth);
    }

    set Width(width){
        if((typeof width === 'number') && (!isNaN(width))){
            this.elem.style.width = width + 'px';
        }else if(typeof width === 'string'){
            this.elem.style.width = width;
        }
    }
}