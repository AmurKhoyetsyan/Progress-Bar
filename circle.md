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

###Example

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
        stroke="#000000"></path>
    </svg>