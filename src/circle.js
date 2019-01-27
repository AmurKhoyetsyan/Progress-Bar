/***********************************************************
*
*   Create by Amur
*   Circle
*   Github https://github.com/AmurKhoyetsyan/Progress-Bar
*
************************************************************/

'use strict';

class CreateCicle {
    constructor(elem){
        this.elem = elem;
    }

    width(){
        if(this.elem){
            return parseFloat(this.elem.clientWidth);
        }
    }

    circle(){
        let width = this.width();
        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('fill', 'transparent');
        circle.setAttribute('stroke', '#00AAFF');
        circle.setAttribute('cx', width / 2);
        circle.setAttribute('cy', width / 2);
        circle.setAttribute('r', (width / 2) - 3);
        circle.setAttribute('stroke-width', 3);

        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('height', width);
        svg.setAttribute('width', width);
        svg.setAttribute('viewBox', '0 0 ' + width + ' ' + width);

        svg.appendChild(circle);

        this.elem.appendChild(svg);
    }
}