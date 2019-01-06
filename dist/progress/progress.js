/*********************************************
*
*   create by Amur
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

class SetOptions {
    _getOptions(newOptions, options){
        if(newOptions){
            for(let key in newOptions){
                options[key] = newOptions[key];
            }
        }
    }

    _replaceAll(count, search, replace){
        return count.split(search).join(replace);
    }

    _setPercent(count, option){
        let percent,
            progressCount = this._replaceAll(option.progressCount, ',', '.');
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
}

class CreateSvg extends Animation {
    _setText(count, option, symbolPercent, position){
        let countInterval;
        let progressCount = this._replaceAll(option.progressCount, ',', '.');
        let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

        text.setAttribute('fill', option.fontColor);
        text.setAttribute('x', '50%');
        text.setAttribute('y', '50%');
        text.setAttribute('font-size', option.fontSize);
        text.setAttribute('font-weight', option.fontWeight);
        text.setAttribute('alignment-baseline', 'middle');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('transform', 'rotate(90,'+ position +','+ position +')');

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

    _setSvg(elem, option, count, prTrue ){
        let setGet = new GeterSeterParameters(elem);

        let percent = this._setPercent(count, option);
        
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let width = setGet.Width / 2;
        let radius = width - (option.strokeWidthChild / 2);
        let circleWidth = 2 * Math.PI * radius;
        let circlePercent = (circleWidth * percent) / 100;

        svg.setAttribute('height', setGet.Width);
        svg.setAttribute('width', setGet.Width);
        svg.setAttribute('transform', 'rotate(270)');
        svg.setAttribute('viewbox', '0 0 ' + setGet.Width + ' ' + setGet.Width);

        let circleParent = this._setCircle(option.fillParent, option.progressParentCircleColor, option.strokeWidthParent, radius, width);
        let circleChild = this._setCircle(option.fillChild, option.progressColor, option.strokeWidthChild, radius, width);
        let text = this._setText(count, option, prTrue, width);

        if(option.animated){
            this._animatedCircle(circleWidth, circlePercent, option.interval, circleChild);
        }else{
            circleChild.setAttribute('stroke-dashoffset', circlePercent);
        }

        circleChild.setAttribute('stroke-dasharray', circleWidth);

        svg.appendChild(circleParent);
        svg.appendChild(circleChild);
        svg.appendChild(text);

        return svg;
    }
}

class Progress extends CreateSvg {
    constructor(elem, options = null){
        super();
        this.elem = elem;
        this.options = options;
        this.defaultOptions = {
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
            progressParentCircleColor: '#E0E0E0',
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