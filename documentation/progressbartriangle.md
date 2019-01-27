## Example

<img src="../img/progresstriangle.gif" />

## Get started

### html

	<div class="triangle-1" data-count="85" style="width: 200px;"></div>
	<div class="triangle-2" data-count="4,55" style="width: 200px;"></div>
	<div class="triangle-3" data-count="70000" style="width: 200px;"></div>
	
	<script type="text/javascript" src="progress.js"></script>
	<!-- or -->
	<script type="text/javascript" src="progress.min.js"></script>

### JavaScript default options

	{
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

### JavaScript

	let Triangle1 = document.getElementsByClassName('triangle-1');
	let Triangle2 = document.getElementsByClassName('triangle-2');
	let Triangle3 = document.getElementsByClassName('triangle-3');

	let options = {
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

	new Progress(Triangle1, options).inPercent();
	new Progress(Triangle2, options).inCount(5);
	new Progress(Triangle3, options).inCounter();
	