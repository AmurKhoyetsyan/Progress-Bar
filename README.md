# Progress Bar

## Get started

### html
	<div class="circle-1" data-count="85" style="width: 200px;"></div>

### JavaScript
	let Circle1 = document.getElementsByClassName('circle-1');

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
	new Progress(Circle1, options).inCount(5);
	new Progress(Circle1, options).inCounter();
