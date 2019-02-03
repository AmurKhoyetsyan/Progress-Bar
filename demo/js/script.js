//Progress Bar

let Circle1 = document.getElementsByClassName('circle-1');
let Circle2 = document.getElementsByClassName('circle-2');
let Circle3 = document.getElementsByClassName('circle-3');

let options = {
    animationType: 'linear',
    type: 'circle',
    text: true,
    fontColor: '#FFFFFF',
    fontSize: 18,
    fontWeight: 3000,
    fillParent: '#6949D7',
    fillChild: 'transparent',
    interval: 1000,
    animated: true,
    strokeWidthParent: 5,
    strokeWidthChild: 5,
    progressColor: '#FE3F44',
    progressParentColor: '#FFD200'
};

new Progress(Circle1, options).inPercent();
new Progress(Circle2, options).inCount(5);
new Progress(Circle3, options).inCounter();


let triangle = document.getElementsByClassName('triangle');

let options1 = {
    animationType: 'linear',
    type: 'triangle',
    text: true,
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
    progressParentColor: '#FFD200'
};

new Progress(triangle, options1).inPercent();

let cubic = document.getElementsByClassName('cubic-1');

let options2 = {
    animationType: 'linear',
    type: 'cubic',
    text: true,
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
    progressParentColor: '#FFD200'
};

new Progress(cubic, options2).inPercent();

// Other Opportunities

let elem = document.getElementsByClassName('other')[0];

let parameters = new GetterSetterParameters(elem);

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


/*---------demo answer ---------*/

const counter = (arr) =>{
    let count = 0;
    for(let i = 0; i < arr.length; i++){
        count += arr[i];
    }
    return parseFloat(count / arr.length);
}

let answers = [
    4,
    1,
    5,
    3,
    2,
    5,
    5,
    5
];

let answerProgress = document.querySelectorAll('.answer');
let answerButton = document.querySelectorAll('.button-evaluate');

answerProgress[0].setAttribute('data-count', counter(answers));

let ansvwerOptions = {
    type: 'circle',
    text: true,
    fontColor: '#FFFFFF',
    fontSize: 15,
    fontWeight: 900,
    fillParent: '#009688',
    fillChild: 'transparent',
    interval: 500,
    animated: true,
    strokeWidthParent: 5,
    strokeWidthChild: 5,
    progressColor: '#8bc34a',
    progressParentColor: '#ff9800'
};

let answerrCirce = new Progress(answerProgress, ansvwerOptions).inCount(5);
let cliked = true;

for(let i = 0; i < answerButton.length; i++){
    answerButton[i].addEventListener('click', ()=>{
        if(cliked){
            let count = (parseFloat(parseFloat(new GetterSetterParameters().replaceAll(answerProgress[0].getAttribute('data-count'), ',', '.')) + (i + 1))) / 2;
            answers.push(count);
            answerProgress[0].setAttribute('data-count', counter(answers));
            answerProgress[0].innerHTML = '';
            ansvwerOptions.animated = false;
            new Progress(answerProgress, ansvwerOptions).inCount(5);
            cliked = false;
        }
    });
}