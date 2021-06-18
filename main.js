var log = (t, s) => console.log("%c%s%c %s", `
border-radius: 5px; padding: 0 5px;
background-color: ${ log.c[t] }; color: white;"
`, t, "", s)
log.c = { V: "black" }

var ctx = id => document.getElementById(id).getContext("2d")
var J = document.getElementById("img")

var u = {
	cs: ctx("stage"),
	ca: ctx("action"),

	j: (x, y) => {
		u.ca.clearRect(j.x, j.y, j.s(), j.s())
		u.ca.drawImage(J, j.x = x, j.y = y, j.s(), j.s())
	},
	b: (x, y, v = 1) => {
		m.a[x][y] = v
		u.cs.fillStyle = [ "white", "black" ][+ v]
		u.cs.fillRect(x * 30 + 1, y * 15 + 1, 28, 14)
	},
	p: (x) => {
		if (x < 0 || x > m.mh * 30 - p.l()) {
			p.v = 0
			log("V", "H 0")
			return
		}
		u.cs.fillStyle = "red"
		u.cs.clearRect(m.p - 0.5, m.mh * 15, p.l() + 1,15)
		u.cs.fillRect(m.p = x, m.mh * 15, p.l(), 15)
	}
}

var m = {
	a: null,
	p: null,
	mr: 4,
	mw: 20,
	mh: 20,
	gen: () => {
		m.a = Array.from({ length: m.mh }, () => [])
		for (let r = 0; r <= m.mr; r ++)
			for (let c = 0; c < m.mw; c ++)
				u.b(c, r, ~~ (Math.random() * 100) < (m.mr - r) * 20)
	}
}

var dat = (id, min, max, step) => {
	const [ $d, $l, $s ] = [ "div", "label", "input" ].map(l => document.createElement(l))

	$l.for = $l.innerHTML = id
	Object.assign($s, { type: "range", id, min, max, step })
	; [ $l, $s ].forEach($e => $d.appendChild($e))
	document.getElementById("dat").appendChild($d)

	let v
	const f = x => x === undefined
		? v
		: ($s.value = $s.dataset.v = v = x, f)
	$s.onchange = e => f($s.value)
	return f
}

var p = {
	alive: true,
	l: dat("Plate length", 10, 200, 5)(60),
	a: dat("Plate acceleration", 0, 10, 1)(5),
	mv: dat("Plate speed limit", 0, 30, 1)(20),
	f: dat("Plate friction", 0, 10, 1)(1),
	v: 0,

	gen: () => {
		window.onkeydown = e => {
			if (! p.alive) return
			let d = [ "ArrowLeft",  "ArrowRight" ].indexOf(e.key)
			if (d < 0) return
			d = d ? 1 : -1
			p.v += d * p.a()
			if (Math.abs(p.v) > p.mv()) p.v = d * p.mv()
			log("V", "A " + p.v)
		}
		setInterval(() => {
			if (! p.v) return
			const d = p.v / Math.abs(p.v)
			p.v -= d * p.f() * 0.1
			if (p.v * d < 0) p.v = 0
			log("V", "F " + p.v)
			u.p(m.p + p.v)
		}, 100)
		u.p((m.mw / 2 - 1) * 30)
	}
}

var j = {
	s: dat("Pjt size", 20, 100, 10)(60),
	x: null, y: null,

	vx: 0, vy: 0,

	gen: () => {
		u.j((m.mw * 30 - j.s()) / 2, m.mr * 15 + 5)
	}
}

window.onload = () => {
	m.gen()
	p.gen()
	j.gen()

	
}
