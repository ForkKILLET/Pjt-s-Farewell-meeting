var log = (t, s) => console.log("%c%s%c %s", `
border-radius: 5px; padding: 0 5px;
background-color: ${ log.c[t] }; color: white;"
`, t, "", s)
log.c = {
	V: "black",
	D: "lawngreen"
}

var dat = (id, min, max, step) => {
	const b = id.startsWith("If "), K = b ? "checked" : "value"
	const [ $d, $l, $s ] = [ "div", "label", "input" ].map(l => document.createElement(l))

	$l.for = $l.innerHTML = id
	Object.assign($s, { id, ...(b ? { type: "checkbox" } : { type: "range", min, max, step }) })
	; [ $l, $s ].forEach($e => $d.appendChild($e))
	$("#dat").appendChild($d)

	let v, l = true
	const f = x => x === undefined
		? v
		: (localStorage["Pjt.dat:" + id] = $s[K] = $s.dataset.v = v = eval((l ? (l = false, localStorage["Pjt.dat:" + id]) : null) ?? x), f)
	$s.onchange = () => f($s[K])
	return f
}

var $ = (...P) => document.querySelector(...P)

var ctx = id => $("#" + id).getContext("2d")
var J = $("#img")

var u = {
	cs: ctx("stage"),
	ca: ctx("action"),
	cd: ctx("debug"),

	j: (x, y) => {
		u.ca.clearRect(j.x, j.y, j.s(), j.s())
		u.ca.drawImage(J, j.x = x, j.y = y, j.s(), j.s())
	},
	b: (x, y, v = 1) => {
		m.a[x][y] = v
		u.cs.fillStyle = [ "white", "black" ][+ v]
		u.cs.fillRect(x * 30 + 1, y * 15 + 1, 28, 14)
	},
	p: x => {
		u.cs.fillStyle = "red"
		u.cs.clearRect(p.x - 0.5, m.Mh, p.l() + 1, 15)
		u.cs.fillRect(p.x = x, m.Mh, p.l(), 15)
	}
}

var D = {
	on: dat("If debug")							(false),

	vk: dat("Velocity line scale", 1, 15, 1)	(5),

	hid: 100,
	hook: f => {
		log("D", "Hook #" + D.hid)
		T._h[D.hid ++] = f
	},

	globalClear: () => {
		D.hook(() => u.cd.clearRect(0, 0, 600, 400))
		return D
	},

	watchMovement: (o, d) => {
		const
			vx = { x: "v", y: null, xy: "vx" }[d],
			vy = { x: null, y: "v", xy: "vy" }[d]

		let ctr, pvx, pvy

		D.hook(() => {
			ctr = o.ctr()

			u.cd.strokeStyle = "transparent"
			u.cd.fillStyle = "lawngreen"
			u.cd.beginPath()
			u.cd.arc(...ctr, 3, 0, Math.PI * 2, false)
			u.cd.stroke()
			u.cd.fill()

			u.cd.strokeStyle = "blue"
			u.cd.lineWidth = 1
			u.cd.beginPath()
			if (o[vx]) {
				u.cd.moveTo(...ctr)
				pvx = [ ctr[0] + o[vx] * D.vk(), ctr[1] ]
				u.cd.lineTo(...pvx)
			}
			else pvx = null
			if (o[vy]) {
				u.cd.moveTo(...ctr)
				pvy = [ ctr[0], ctr[1] + o[vy] * D.vk() ]
				u.cd.lineTo(...pvy)
			}
			else pvy = null
			u.cd.stroke()
		})

		return D
	},

	gen: () => {
		if (D.on()) D
			.globalClear()
			.watchMovement(p, "x")
			.watchMovement(j, "xy")
	}
}

var m = {
	a: null,
	mr: 4,		Mr: 4 * 15,
	mw: 20,		Mw: 20 * 30,
	mh: 20,		Mh: 20 * 15,
	gen: () => {
		m.a = Array.from({ length: m.mh }, () => [])
		for (let r = 0; r <= m.mr; r ++)
			for (let c = 0; c < m.mw; c ++)
				u.b(c, r, ~~ (Math.random() * 100) < (m.mr - r) * 20)
	}
}

var T = dat("Ms per tick", 50, 500, 50)			(50)
Object.assign(T, {
	_h: [],
	hook: o => T._h.push(() => o.rep()),
	gen: () => setInterval(() => T._h.forEach(f => f()), T())
})

var p = {
	alive: true,
	l: dat("Plate length", 10, 200, 5)			(60),
	a: dat("Plate acceleration", 0, 10, 1)		(5),
	mv: dat("Plate speed limit", 0, 30, 1)		(20),
	f: dat("Plate friction", 0, 10, 1)			(1),
	v: 0,

	ctr: () => [ p.x + p.l() / 2, m.Mh + 15 / 2 ],

	gen: () => {
		window.onkeydown = e => {
			if (! p.alive) return
			let d = [ "ArrowLeft",  "ArrowRight" ].indexOf(e.key)
			if (d < 0) return
			d = d ? 1 : -1
			p.v += d * p.a()
			if (Math.abs(p.v) > p.mv()) p.v = d * p.mv()
			log("V", "A " + p.v.toFixed(2))
		}
		T.hook(p)
		u.p((m.Mw - p.l()) / 2)
	},
	rep: () => {
		if (! p.v) return
		const d = p.v / Math.abs(p.v)
		p.v -= d * p.f() * 0.1
		if (p.v * d < 0) p.v = 0
		log("V", "F " + p.v.toFixed(2))

		let x_ = p.x + p.v
		const lx = 0, rx = m.Mw - p.l()
		if (x_ < lx || x_ > rx) {
			p.v = 0
			log("V", "H 0")
			x_ = d < 0 ? lx : rx
		}
		u.p(x_)
	}
}

var j = {
	s: dat("Pjt size", 20, 100, 10)				(60),
	x: null, y: null,

	g: dat("Gravity acceleration", 1, 20, 1)	(1),
	vx: 0, vy: 0,

	ctr: () => [ j.x + j.s() / 2, j.y + j.s() / 2 ],

	gen: () => {
		u.j((m.Mw - j.s()) / 2, m.Mr + 5)

		T.hook(j)
	},
	rep: () => {
		j.vy += j.g()

		let x_ = j.x + j.vx, y_ = j.y + j.vy

		const fy = m.Mh - j.s()
		if (y_ >= fy) {
			y_ = fy
		}
		u.j(x_, y_)
	}
}

window.onload = () => {
	$("#start").onclick = () =>
		[ m, p, j, D, T ].forEach(M => M.gen())
	$("#reload").onclick = () => {
		history.go()
	}
}

