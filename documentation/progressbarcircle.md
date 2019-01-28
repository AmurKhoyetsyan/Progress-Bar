## Example

<img src="../img/progresscircle.gif" />

## Get started

### html

	<div class="circle-1" data-count="85" style="width: 200px;"></div>
	<div class="circle-2" data-count="4,55" style="width: 200px;"></div>
	<div class="circle-3" data-count="70000" style="width: 200px;"></div>
	
	<script type="text/javascript" src="progress.js"></script>
	<!-- or -->
	<script type="text/javascript" src="progress.min.js"></script>

### JavaScript

	let Circle1 = document.getElementsByClassName('circle-1');
	let Circle2 = document.getElementsByClassName('circle-2');
	let Circle3 = document.getElementsByClassName('circle-3');

	let options = {
		type: 'circle',
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

	new Progress(Circle1, options).inPercent();
	new Progress(Circle2, options).inCount(5);
	new Progress(Circle3, options).inCounter();

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
		progressParentColor: '#E0E0E0'
	}	

## Options

| Key                 | Type               | Value                               |
| ------------------- | :----------------: | ----------------------------------: |
| type                | String             | "circle" or "triangle" or "cubic"   |
| text                | Boolean            | true or false                       |
| fontColor           | String             | exp "#000000"                       |
| fontSize            | Number             | exp 17                              |
| fontWeight          | String or Number   | exp "bold" or 700                   |
| fillParent          | String             | exp "#00AAFF"                       |
| fillChild           | String             | exp "#00AAFF"                       |
| interval            | Number             | exp 1000                            |
| animated            | Boolean            | true or false                       |
| strokeWidthParent   | Number             | exp 3                               |
| strokeWidthChild    | Number             | exp 5                               |
| progressColor       | String             | exp "#00AAFF"                       |
| progressParentColor | String             | exp "#00AAFF"                       |
