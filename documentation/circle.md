# Create SVG Circle With circle or With path

	<circle cx="" cy="" r="" />

    <path d="
        M cx, cy
        m -r, 0
        a r,r 0 1,0 (r * 2),0
        a r,r 0 1,0 -(r * 2),0
    "/>

    ...or a bit shorter (merging the two moves) 

    <path d="
        M cx - r, cy
        a r,r 0 1,0 (r * 2),0
        a r,r 0 1,0 -(r * 2),0
    "/>

### Example

    <svg viewBox="0 0 200 200" width="100" height="100">
        <circle
            cx="100"
            cy="100"
            r="75"
            fill="transparent"
            stroke-width="1"
            stroke="#000000"
        ></circle>
    </svg>

    <svg viewBox="0 0 200 200" width="100" height="100">
        <path d="
            M 100, 100
            m -75, 0
            a 75,75 0 1,0 150,0
            a 75,75 0 1,0 -150,0" 
	        fill="transparent"
	        stroke-width="1"
	        stroke="#000000"
        ></path>
    </svg>

# Triangle SVG With path

	<path d="
		M 70, 5 
		L 135, 135 
		L 5, 135 
		L 70, 5 
		Z" 
	/>

### Example
	
	<svg height="140" width="140" viewBox="0 0 140 140">
		<path 
			d="M 70, 5 
			L 135, 135 
			L 5, 135 
			L 70, 5 
			Z" 
			fill="#6949D7" 
			stroke="#FFD200" 
			stroke-width="5" 
			stroke-linecap="round"
		></path>
	</svg>

### SVG defines 6 types of path commands, for a total of 20 commands:

	MoveTo: M, m
	LineTo: L, l, H, h, V, v
	Cubic Bézier Curve: C, c, S, s
	Quadratic Bézier Curve: Q, q, T, t
	Elliptical Arc Curve: A, a
	ClosePath: Z, z