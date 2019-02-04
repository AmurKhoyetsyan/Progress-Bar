/***********************************************************
 *
 *   Create by Amur
 *   Progress Bar And Other Opportunities
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
    };

    /**
     * Getter type Browser
     */

    getBrowser(){
        return (function(agent){
            switch(true){
                case agent.indexOf("edge") > -1: return "edge";
                case agent.indexOf("opr") > -1 && !!window.opr: return "opera";
                case agent.indexOf("chrome") > -1 && !!window.chrome: return "chrome";
                case agent.indexOf("trident") > -1: return "ie";
                case agent.indexOf("firefox") > -1: return "firefox";
                case agent.indexOf("safari") > -1: return "safari";
                default: return "other";
            }
        })(window.navigator.userAgent.toLowerCase());
    };
}

class AnimateType{

    /**
     * @param figure
     * @param duration
     * @param counter
     * @param count
     * @param step
     * @constructor
     */

    EaseOut(figure, duration, counter, count, step){

        /**
         * @param timing
         * @returns {Function}
         */

        function makeEaseOut(timing) {
            return function(timeFraction) {
                return 1 - timing(1 - timeFraction);
            }
        }

        /**
         * @param timeFraction
         * @returns {number}
         */

        function bounce(timeFraction) {
            for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
                if (timeFraction >= (7 - 4 * a) / 11) {
                    return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
                }
            }
        }

        let bounceEaseOut = makeEaseOut(bounce);

        /**
         * @param timing
         * @param draw
         * @param duration
         */

        function animate({timing, draw, duration}) {

            let start = performance.now();

            requestAnimationFrame(function animate(time) {
                // timeFraction goes from 0 to 1
                let timeFraction = (time - start) / duration;
                if (timeFraction > 1) timeFraction = 1;

                // calculate the current animation state
                let progress = timing(timeFraction);

                draw(progress); // draw it

                if (timeFraction < 1) {
                    requestAnimationFrame(animate);
                }

            });
        }

        animate({
            duration: duration,
            timing: bounceEaseOut,
            draw: function(progress) {
                if(counter <= count){
                    figure.setAttribute('stroke-dashoffset', progress * count);
                }else{
                    figure.setAttribute('stroke-dashoffset', counter);
                    counter -= step;
                }
            }
        });
    };

    /**
     * @param figure
     * @param duration
     * @param counter
     * @param count
     * @param step
     * @constructor
     */

    Linear(figure, duration, counter, count, step){
        const animated = ()=>{
            counter -= step;
            if(counter <= count){
                figure.setAttribute('stroke-dashoffset', count);
            }else{
                figure.setAttribute('stroke-dashoffset', counter);
                setTimeout(animated, duration);
            }
        };

        animated();
    };
}

class SetOptions {

    /**
     * @param newOptions
     * @param options
     * @private
     */

    _getOptions(newOptions, options){
        if(newOptions){
            for(let key in newOptions){
                options[key] = newOptions[key];
            }
        }
    };

    /**
     * @param count
     * @param option
     * @returns {*}
     * @private
     */

    _setPercent(count, option){
        let percent,
            progressCount = new GetterSetterParameters().replaceAll(option.progressCount, ',', '.');
        if(!isNaN(parseFloat(option.progressCount))){
            if(parseFloat(option.progressCount).toFixed(2) <= count){
                percent = (100 - ((100 * parseFloat(progressCount).toFixed(2)) / count)).toFixed(2);
            }
        }
        return percent;
    };
}

class Animation extends SetOptions {
    constructor(){
        super();
        this.state = {
            time: 1000 / 24
        }
    }

    /**
     * @param count
     * @param duration
     * @param textTag
     * @param symbolPercent
     * @private
     */

    _animatedText(count, duration, textTag, symbolPercent){
        let start = 0;
        let step = (count / duration) * this.state.time;

        /**
         * @param text
         * @param symbol
         * @returns {*}
         */

        const setParseText = (text, symbol)=>{
            let percent = (Math.ceil(text) > text)?(parseFloat(parseFloat(text).toFixed(2))):(parseInt(text));
            if(symbol){
                return percent + '%';
            }else{
                return percent;
            }
        };

        const animated = ()=>{
            start += step;
            if(start >= count){
                textTag.innerHTML = setParseText(count, symbolPercent);
            }else{
                textTag.innerHTML = setParseText(start, symbolPercent);
                setTimeout(animated, this.state.time);
            }
        };

        animated();
    };

    /**
     * @param start
     * @param count
     * @param duration
     * @param circle
     * @private
     */

    _animatedCircle(start, count, duration, circle, typeAnimation){
        let counter = start;
        let interval = Math.abs(count - start);
        let step = (interval / duration) * this.state.time;
        circle.setAttribute('stroke-dashoffset', counter);

        switch(typeAnimation){
            case 'linear': new AnimateType().Linear(circle, this.state.time, counter, count, step); break;
            case 'easeOut':  new AnimateType().EaseOut(circle, duration, counter, count, step); break;
        }
    };

    /**
     * @param start
     * @param count
     * @param duration
     * @param path
     * @private
     */

    _animateTriangleAndCubic(start, count, duration, path, typeAnimation){
        let counter = start;
        let interval = Math.abs(count - start);
        let step = (interval / duration) * this.state.time;

        switch(typeAnimation){
            case 'linear': new AnimateType().Linear(path, this.state.time, counter, count, step); break;
            case 'easeOut':  new AnimateType().EaseOut(path, duration, counter, count, step); break;
        }
    };
}

class CreateSvg extends Animation {

    /**
     * @param count
     * @param option
     * @param symbolPercent
     * @param position
     * @returns {Element}
     * @private
     */

    _setText(count, option, symbolPercent, position){
        let countInterval;
        let progressCount = new GetterSetterParameters().replaceAll(option.progressCount, ',', '.');
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
    };

    /**
     * @param fill
     * @param stroke
     * @param strokeWidth
     * @param radius
     * @param width
     * @returns {Element}
     * @private
     */

    _setCircle(fill, stroke, strokeWidth, radius, width){
        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('fill', fill);
        circle.setAttribute('stroke', stroke);
        circle.setAttribute('cx', width);
        circle.setAttribute('cy', width);
        circle.setAttribute('r', radius);
        circle.setAttribute('stroke-width', strokeWidth);
        circle.setAttribute('stroke-linecap', 'round');
        return circle;
    };

    /**
     * @param fill
     * @param stroke
     * @param strokeWidth
     * @param width
     * @param coefficient
     * @param bigStroke
     * @returns {Element}
     * @private
     */

    _setTriangle(fill, stroke, strokeWidth, width, coefficient, bigStroke){
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path'); // create path
        path.setAttribute('d', `M ${width / 2}, ${bigStroke - (coefficient / 2)} L ${width - (bigStroke - (coefficient / 2))}, ${width - (bigStroke - (coefficient / 2))} L ${bigStroke - (coefficient / 2)}, ${width - (bigStroke - (coefficient / 2))} L ${width / 2}, ${bigStroke - (coefficient / 2)} Z`);
        path.setAttribute('fill', fill);
        path.setAttribute('stroke', stroke);
        path.setAttribute('stroke-width', strokeWidth);
        path.setAttribute('stroke-linecap', 'round');
        return path;
    };

    /**
     * @param fill
     * @param stroke
     * @param strokeWidth
     * @param width
     * @param coefficient
     * @param bigStroke
     * @returns {Element}
     * @private
     */

    _setCubic(fill, stroke, strokeWidth, width, coefficient, bigStroke){
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${bigStroke - (coefficient / 2)}, ${bigStroke - (coefficient / 2)} L ${width - (bigStroke - (coefficient / 2))}, ${bigStroke - (coefficient / 2)} L ${width - (bigStroke - (coefficient / 2))}, ${width - (bigStroke - (coefficient / 2))} L ${bigStroke - (coefficient / 2)}, ${width - (bigStroke - (coefficient / 2))} L ${bigStroke - (coefficient / 2)}, ${bigStroke - (coefficient / 2)} Z`);
        path.setAttribute('fill', fill);
        path.setAttribute('stroke', stroke);
        path.setAttribute('stroke-width', strokeWidth);
        path.setAttribute('stroke-linecap', 'square');
        return path;
    };

    /**
     * @param elem
     * @param option
     * @param count
     * @param prTrue
     * @returns {Element}
     * @private
     */

    _setSvg(elem, option, count, prTrue){
        let setGet = new GetterSetterParameters(elem);
        let percent = this._setPercent(count, option);
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        let per,
            width,
            progressParent,
            progressChild;

        let coefficient = new GetterSetterParameters().getCoefficient(option.strokeWidthParent, option.strokeWidthChild);
        let bigStroke = Math.max(option.strokeWidthParent, option.strokeWidthChild);

        svg.setAttribute('height', setGet.Width);
        svg.setAttribute('width', setGet.Width);
        svg.setAttribute('viewBox', `0 0 ${setGet.Width} ${setGet.Width}`);
        svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
        svg.setAttribute('xmlns:xlink','http://www.w3.org/1999/xlink');

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
                    this._animatedCircle(circleWidth, circlePercent, option.interval, progressChild, option.animationType);
                }else{
                    progressChild.setAttribute('stroke-dashoffset', circlePercent);
                }

                break;
            case 'triangle':
                width = setGet.Width;
                let side = width - (2 * (bigStroke - (coefficient.child / 2)));
                let a = Math.sqrt(Math.pow(side, 2) + Math.pow(side / 2, 2));
                let triangleWidth = a + a + side;
                per = (triangleWidth * percent) / 100;

                progressParent = this._setTriangle(option.fillParent, option.progressParentColor, option.strokeWidthParent, width, coefficient.parent, bigStroke);
                progressChild = this._setTriangle(option.fillChild, option.progressColor, option.strokeWidthChild, width, coefficient.child, bigStroke);

                progressChild.setAttribute('stroke-dasharray', `${triangleWidth} , ${triangleWidth}`);

                if(option.animated){
                    this._animateTriangleAndCubic(triangleWidth, per, option.interval, progressChild, option.animationType);
                }else{
                    progressChild.setAttribute('stroke-dashoffset', per);
                }

                break;
            case 'cubic':
                width = setGet.Width;
                let cubicWidth = 4 * (width - (2 * (bigStroke - (coefficient.child / 2))));
                per = (cubicWidth * percent) / 100;

                progressParent = this._setCubic(option.fillParent, option.progressParentColor, option.strokeWidthParent, width, coefficient.parent, bigStroke);
                progressChild = this._setCubic(option.fillChild, option.progressColor, option.strokeWidthChild, width, coefficient.child, bigStroke);

                progressChild.setAttribute('stroke-dasharray', `${cubicWidth} , ${cubicWidth}`);

                if(option.animated){
                    this._animateTriangleAndCubic(cubicWidth, per, option.interval, progressChild, option.animationType);
                }else{
                    progressChild.setAttribute('stroke-dashoffset', per);
                }

                break;
            default: console.log('%c%s', 'color: red; font-size: 32px; font-weight: 700; text-transform: uppercase;', 'type not found');
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
    };
}

class Progress extends CreateSvg {
    constructor(elem, options = null){
        super();
        this.elem = elem;
        this.options = options;
        this.defaultOptions = {
            animationType: 'linear',
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
    };

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
    };

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
    };

    /**
     * @param count
     */

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
    };
}