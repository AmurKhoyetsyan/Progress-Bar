# Progress Bar
## Example
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Progress</title>
        <link rel="stylesheet" type="text/css" href="css/style.css" />
    </head>
    <body class="">
        <div class="container">
            <div class="row">
                <div class="progress-prent">
                    <div class="circle-1" data-count="85"></div>
                </div>
                <div class="progress-prent">
                    <div class="circle-2" data-count="4,55"></div>
                </div>
                <div class="progress-prent">
                    <div class="circle-3" data-count="70000"></div>
                </div>
            </div>
        </div>
    </body>
    <script type="text/javascript" src="demo/dist/progress.js"></script>
    <script type="text/javascript" src="demojs/script.js"></script>
</html>
## Get started

### html
	<div class="circle-1" data-count="85" style="width: 200px;"></div>
	<div class="circle-2" data-count="4,55" style="width: 200px;"></div>
	<div class="circle-3" data-count="70000" style="width: 200px;"></div>

### JavaScript
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
	
### JavaScript default options
	{
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
