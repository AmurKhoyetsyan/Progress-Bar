//Progress Bar

let Circle1 = document.getElementsByClassName('circle-1');
let Circle2 = document.getElementsByClassName('circle-2');
let Circle3 = document.getElementsByClassName('circle-3');

let options = {
    fontColor: '#FFFFFF',
    fontSize: 18,
    fontWeight: 900,
    fillParent: '#6949D7',
    fillChild: 'transparent',
    interval: 1000,
    animated: true,
    strokeWidthParent: 5,
    strokeWidthChild: 5,
    progressColor: '#FE3F44',
    progressParentCircleColor: '#FFD200'
};

new Progress(Circle1, options).inPercent();
new Progress(Circle2, options).inCount(5);
new Progress(Circle3, options).inCounter();


// Other Opportunities

let elem = document.getElementsByClassName('other')[0];

let parameters = new GeterSeterParameters(elem);

console.log("Elem Width ", parameters.Width);
console.log("Elem Height ", parameters.Height);
setTimeout(()=>{
    parameters.Width = 100;
    parameters.Height = "75px";
}, 1000);

setTimeout(()=>{
    console.log("Elem New Width ", parameters.Width);
    console.log("Elem New Height ", parameters.Height);
}, 1400);