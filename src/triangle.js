/***********************************************************
*
*   Create by Amur
*   Triangle
*   Github https://github.com/AmurKhoyetsyan/Progress-Bar
*
************************************************************/

'use strict';

class CreateTriangle {
    constructor(elem){
        this.elem = elem;
    };

    /**
     * @returns {Number}
     */

    width(){
        if(this.elem){
            return parseFloat(this.elem.clientWidth);
        }
    }

    triangle(){
        let width = this.width();
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('fill', 'transparent');
        path.setAttribute('stroke', '#00AAFF');
        path.setAttribute('d', `M ${width / 2}, ${0 + 3} L ${width - 3}, ${width - 3} L ${0 + 3}, ${width - 3} L ${width / 2}, ${0 + 3} Z`);
        path.setAttribute('stroke-width', 3);

        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('height', width);
        svg.setAttribute('width', width);
        svg.setAttribute('viewBox', '0 0 ' + width + ' ' + width);

        svg.appendChild(path);

        this.elem.appendChild(svg);
    };
}