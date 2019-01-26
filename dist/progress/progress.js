/***********************************************************
*
*   Create by Amur
*   Progress Bar And Other Opportunities
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

class SetOptions {
    _getOptions(newOptions, options){
        if(newOptions){
            for(let key in newOptions){
                options[key] = newOptions[key];
            }
        }
    }

    _setPercent(count, option){
        let percent,
            progressCount = new GeterSeterParameters().replaceAll(option.progressCount, ',', '.');
        if(!isNaN(parseFloat(option.progressCount))){
            if(parseFloat(option.progressCount).toFixed(2) <= count){
                percent = (100 - ((100 * parseFloat(progressCount).toFixed(2)) / count)).toFixed(2);
            }
        }
        return percent;
    }
}

class Animation extends SetOptions {
    _animatedText(count, duration, textTag, symbolPercent){
        let start = 0;
        let step = (count / duration) * 20;

        const setParseText = (text, symbol)=>{
            let percent = (Math.ceil(text) > text)?(parseFloat(parseFloat(text).toFixed(2))):(parseInt(text));
            if(symbol){
                return percent + '%';
            }else{
                return percent;
            }
        }

        const animated = ()=>{
            start += step;
            if(start >= count){
                textTag.innerHTML = setParseText(count, symbolPercent);
            }else{
                textTag.innerHTML = setParseText(start, symbolPercent);
                setTimeout(animated, 20);
            }
        }

        animated();
    }

    _animatedCircle(start, count, duration, circle){
        let counter = start;
        let interval = Math.abs(count - start);
        let step = (interval / duration) * 20;
        circle.setAttribute('stroke-dashoffset', counter);
        const animated = ()=>{
            counter -= step;
            if(counter <= count){
                circle.setAttribute('stroke-dashoffset', count);
            }else{
                circle.setAttribute('stroke-dashoffset', counter);
                setTimeout(animated, 20);
            }
        }

        animated();
    }

    _animateTriangle(start, count, duration, path){
        let counter = start;
        let interval = Math.abs(count - start);
        let animated = ()=>{
            let step = (interval / duration) * 20;
            counter -= step;
            if(counter <= count){
                path.setAttribute('stroke-dashoffset', count);
            }else{
                path.setAttribute('stroke-dashoffset', counter);
                setTimeout(animated, 20);
            }
        }

        animated();
    }
}

class CreateSvg extends Animation {
    _setText(count, option, symbolPercent, position){
        let countInterval;
        let progressCount = new GeterSeterParameters().replaceAll(option.progressCount, ',', '.');
        let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

        text.setAttribute('fill', option.fontColor);
        text.setAttribute('x', '50%');
        
        text.setAttribute('font-size', option.fontSize);
        text.setAttribute('font-weight', option.fontWeight);
        text.setAttribute('alignment-baseline', 'middle');
        text.setAttribute('text-anchor', 'middle');

        if(option.type === 'circle'){
            text.setAttribute('transform', 'rotate(90,'+ position +','+ position +')');
        }

        if(option.type === 'triangle'){
            text.setAttribute('y', '70%');
        }else{
            text.setAttribute('y', '50%');
        }

        if(!isNaN(parseFloat(progressCount))){
            if(parseFloat(progressCount).toFixed(2) <= count){
                countInterval = parseFloat(progressCount).toFixed(2);
                if(option.animated){
                    text.innerHTML = 0;
                }else{
                    text.innerHTML = (symbolPercent)?(countInterval + '%'):(countInterval);
                }
            }
        }

        if(option.animated){
            this._animatedText(countInterval, option.interval, text, symbolPercent)
        }
        return text;
    }

    _setCircle(fill, stroke, strokeWidth, radius, width){
        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('fill', fill);
        circle.setAttribute('stroke', stroke);
        circle.setAttribute('cx', width);
        circle.setAttribute('cy', width);
        circle.setAttribute('r', radius);
        circle.setAttribute('stroke-width', strokeWidth);
        return circle;
    }

    _setTriangle(fill, stroke, strokeWidth, width){
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path'); // create path
        path.setAttribute('d', `M ${width / 2}, ${0 + strokeWidth} L ${width - strokeWidth}, ${width - strokeWidth} L ${0 + strokeWidth}, ${width - strokeWidth} L ${width / 2}, ${0 + strokeWidth} Z`);
        path.setAttribute('fill', fill);
        path.setAttribute('stroke', stroke);
        path.setAttribute('stroke-width', strokeWidth);
        path.setAttribute('stroke-linecap', 'round');
        return path;
    }

    _setSvg(elem, option, count, prTrue){
        let setGet = new GeterSeterParameters(elem);
        let percent = this._setPercent(count, option);
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        let width,
            progressParent,
            progressChild;

        svg.setAttribute('height', setGet.Width);
        svg.setAttribute('width', setGet.Width);
        svg.setAttribute('viewBox', '0 0 ' + setGet.Width + ' ' + setGet.Width);

        switch(option.type){
            case 'circle':
                width = setGet.Width / 2;
                let radius = width - (option.strokeWidthChild / 2);
                let circleWidth = 2 * Math.PI * radius;
                let circlePercent = (circleWidth * percent) / 100;

                svg.setAttribute('transform', 'rotate(270)');

                progressParent = this._setCircle(option.fillParent, option.progressParentColor, option.strokeWidthParent, radius, width);
                progressChild = this._setCircle(option.fillChild, option.progressColor, option.strokeWidthChild, radius, width);
                
                progressChild.setAttribute('stroke-dasharray', circleWidth);

                if(option.animated){
                    this._animatedCircle(circleWidth, circlePercent, option.interval, progressChild);
                }else{
                    progressChild.setAttribute('stroke-dashoffset', circlePercent);
                }

                break;
            case 'triangle':
                width = setGet.Width;
                let a = Math.sqrt(Math.pow(width, 2) + Math.pow(width / 2, 2));
                let triangleWidth = a + a + width;
                let per = (triangleWidth * percent) / 100;

                progressParent = this._setTriangle(option.fillParent, option.progressParentColor, option.strokeWidthParent, width); 
                progressChild = this._setTriangle(option.fillChild, option.progressColor, option.strokeWidthChild, width);

                progressChild.setAttribute('stroke-dasharray', `${triangleWidth} , ${triangleWidth}`);

                if(option.animated){
                    this._animateTriangle(triangleWidth, per, option.interval, progressChild);
                }else{
                    progressChild.setAttribute('stroke-dashoffset', per);
                }

                break;
            default: console.log('%c%s', 'color: red; font-size: 32px; font-weight: 700; text-transform: uppercase;', 'type not fount');
        }


        try{
            svg.appendChild(progressParent);
            svg.appendChild(progressChild);
            if(option.text){
                let text = this._setText(count, option, prTrue, width);
                svg.appendChild(text);
            }
        }catch(error){
            console.log('%c%s', 'color: red; font-size: 32px; font-weight: 700; text-transform: uppercase;', 'ERROR VALIDATE', error);
        }
        return svg;
    }
}

class Progress extends CreateSvg {
    constructor(elem, options = null){
        super();
        this.elem = elem;
        this.options = options;
        this.defaultOptions = {
            type: 'circle',
            text: true,
            fontColor: '#000000',
            fontSize: 16,
            fontWeight: 400,
            fillParent: 'none',
            fillChild: 'none',
            interval: 1000,
            animated: false,
            strokeWidthParent: 3,
            strokeWidthChild: 5,
            progressColor: '#00AAFF',
            progressParentColor: '#E0E0E0',
        }
    }

    inPercent(){
        if(this.elem){
            for(let i = 0; i < this.elem.length; i++){
                let option = {
                    progressCount : this.elem[i].getAttribute('data-count') || null,
                };
                this._getOptions(this.defaultOptions, option);
                this._getOptions(this.options, option);

                let svg = this._setSvg(this.elem[i], option, 100, true);

                this.elem[i].append(svg);
            }
        }
    }

    inCounter(){
        if(this.elem){
            for(let i = 0; i < this.elem.length; i++){
                let option = {
                    progressCount : this.elem[i].getAttribute('data-count') || null,
                };
                this._getOptions(this.defaultOptions, option);
                this._getOptions(this.options, option);

                let svg = this._setSvg(this.elem[i], option, parseFloat(option.progressCount), false);

                this.elem[i].append(svg);
            }
        }
    }

    inCount(count){
        if(this.elem){
            for(let i = 0; i < this.elem.length; i++){
                let option = {
                    progressCount : this.elem[i].getAttribute('data-count') || null,
                };
                this._getOptions(this.defaultOptions, option);
                this._getOptions(this.options, option);

                let svg = this._setSvg(this.elem[i], option, count, false);

                this.elem[i].append(svg);
            }
        }
    }
}