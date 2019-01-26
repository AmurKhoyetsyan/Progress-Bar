/***********************************************************
*
*   create by Amur
*   Other Opportunities
*   Github https://github.com/AmurKhoyetsyan/Progress-Bar
*
************************************************************/

'use strict';

class GeterSeterParameters {
    constructor(elem){
        this.elem = elem;
    }

    get Height(){
        if(this.elem){
            return parseFloat(this.elem.clientHeight);
        }
    }

    set Height(height){
        if(this.elem){
            if((typeof height === 'number') && (!isNaN(height))){
                this.elem.style.height = height + 'px';
            }else if(typeof height === 'string'){
                this.elem.style.height = height;
            }
        }
    }

    get Width(){
        if(this.elem){
            return parseFloat(this.elem.clientWidth);
        }
    }

    set Width(width){
        if(this.elem){
            if((typeof width === 'number') && (!isNaN(width))){
                this.elem.style.width = width + 'px';
            }else if(typeof width === 'string'){
                this.elem.style.width = width;
            }
        }
    }

    replaceAll(count, search, replace){
        return count.split(search).join(replace);
    }
}