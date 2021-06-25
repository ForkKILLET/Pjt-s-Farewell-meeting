var log = (t, s, D) => {
	console.log("%c%s%c %s", `
		border-radius: 5px; padding: 0 5px;
		background-color: ${ log.c[t] }; color: white;"
	`, t, "", s)

	log._h.forEach(({ t: t_, r, f }) => {
		if (t === t_ && s.match(r)) f(D)
	})
}
Object.assign(log, {
	c: {
		Vp:	"black",
		D:	"lawngreen",
		C:	"orange",
		G:	"silver"
	},
	_h: []
})

var L = new Proxy({
	clear: () => localStorage.clear()
}, {
	get: (_, K) => {
		if ([ "clear" ].includes(K)) return _[K]
		const V = localStorage.getItem(K)
		return V ? JSON.parse(V) : V
	},
	set: (_, K, V) => localStorage.setItem(K, JSON.stringify(V)),
	deleteProperty: (_, K) => localStorage.removeItem(K)
})

var dat = (id, min, max, step) => {
	const b = id.startsWith("If "), A = b ? "checked" : "value"
	const p = id.endsWith(" %")
	const [ $d, $l, $s ] = [ "div", "label", "input" ].map(l => document.createElement(l))

	$l.for = $l.innerHTML = id
	Object.assign($s, { id, ...(b ? { type: "checkbox" } : { type: "range", min, max, step }) })
	; [ $l, $s ].forEach($e => $d.appendChild($e))
	$("#dat").appendChild($d)

	let v, l = true
	const f = x => {
		if (x === undefined) return p ? v * .01 : v
		L["dat:" + id] = $s[A] = $s.dataset.v = v = (l ? L["dat:" + id] : null) ?? x
		l = false
		return f
	}
	$s.addEventListener("change", () => f(+ $s[A]))
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
		u.ca.clearRect(j.x, j.y, ...j.sz())
		u.ca.drawImage(J, j.x = x, j.y = y, ...j.sz())
	},
	b: (x, y, v) => {
		m.a[x][y] = v
		u.cs.fillStyle = m.T[v].c
		u.cs.fillRect(x * 30 + 1, y * 15 + 1, 28, 14)
	},
	p: x => {
		u.cs.fillStyle = "red"
		u.cs.clearRect(p.x - .5, p.y, p.l() + 1, 15)
		u.cs.fillRect(p.x = x, p.y, ...p.sz())
	}
}

var D = {
	iO: dat("If debug")							(false),

	vk: dat("Movement line scale", 1, 15, 1)	(5),
	iR: dat("If resultant force")				(true),

	hid: 100,
	h_rep: f => {
		log("D", "rep #" + D.hid)
		T._h[D.hid ++] = f
		return D
	},
	h_log: (t, r, f) => {
		log("D", "log #" + D.hid)
		log._h[D.hid ++] = { t, r, f }
		return D
	},

	globalClear: () => D.h_rep(() => u.cd.clearRect(0, 0, 600, 400)),

	watchMovement: (o, d) => {
		const
			vx = { x: "v", y: null, xy: "vx" }[d],
			vy = { x: null, y: "v", xy: "vy" }[d]

		let ctr

		return D.h_rep(() => {
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
			if (D.iR && o[vx] && o[vy]) {
				u.cd.moveTo(...ctr)
				u.cd.lineTo(ctr[0] + o[vx] * D.vk(), ctr[1] + o[vy] * D.vk())
			}
			else {
				if (o[vx]) {
					u.cd.moveTo(...ctr)
					u.cd.lineTo(ctr[0] + o[vx] * D.vk(), ctr[1])
				}
				if (o[vy]) {
					u.cd.moveTo(...ctr)
					u.cd.lineTo(ctr[0], ctr[1] + o[vy] * D.vk())
				}
			}
			u.cd.stroke()
		})
	},

	watchBox: o => D.h_rep(() => {
		u.cd.strokeStyle = "lawngreen"
		u.cd.strokeRect(o.x, o.y, ...o.sz())
	}),

	watchBlockCollision: () => {
		const bs = []
		return D.h_log("C", /^Block/, P => bs.push(P)).h_rep(() => {
			while (bs.length) {
				const { c, r } = bs.pop()

				u.cd.strokeStyle = "red"
				u.cd.strokeRect(c * 30, r * 15, 30, 15)
			}
		})
	},

	gen: () => {
		if (D.iO()) D
			.globalClear()
			.watchMovement(p, "x")
			.watchBox(p)
			.watchMovement(j, "xy")
			.watchBox(j)
			.watchBlockCollision()
	}
}

var G = {
	start: () => {
		log("G", "Start")
		G.alive = true

		; [ m, p, j, D, T ].forEach(M => M.gen())
	},
	die: () => {
		log("G", "Die")
		G.alive = false

		clearInterval(T.tid)

		u.cs.font = "40px Serif"
		u.cs.textAlign = "center"
		u.cs.fillStyle = "red"

		u.cs.fillText("Pjt over", 300, 200)
	}
}

var m = {
	a: null,
	mr: 4,		Mr: (4 + 1) * 15,
	mw: 20,		Mw: 20 * 30,
	mh: 20,		Mh: 20 * 15,

	T: {
		empty:	{ c: "white",		p: 10 },
		normal:	{ c: "black",		p: 60 },
		paddy:	{ c: "yellow",		p: 20 },
		sticky: { c: "springgreen",	p: 10 },
		
		map: f => {
			for (let K in m.T) if (K !== "map") if (f(m.T[K], K) === false) return
		}
	},

	gen: () => {
		m.a = Array.from({ length: m.mh }, () => [])

		let pa = 0
		m.T.map(V => pa = V.p += pa)

		for (let r = 0; r <= m.mr; r ++) for (let c = 0; c < m.mw; c ++) {
			const p =  ~~ (Math.random() * 100)
			m.T.map((V, K) => {
				if (p < V.p) {
					u.b(c, r, K)
					return false
				}
			})
		}
	}
}

var T = dat("Ms per tick", 50, 500, 50)			(50)
Object.assign(T, {
	tid: null,
	_h: [],
	hook: o => T._h.push(() => o.rep()),
	gen: () => T.tid = setInterval(() => T._h.forEach(f => f()), T())
})

var p = {
	l: dat("Plate length", 10, 200, 5)			(100),
	a: dat("Plate acceleration", 1, 10, 1)		(5),
	Mv: dat("Plate speed limit", 1, 30, 1)		(20),
	r: dat("Plate resistance", .1, 1, .1)		(1),
	μ: dat("Plate friction %", 0, 100, 5)		(50),

	v: 0,
	x: null, y: m.Mh,

	ctr: () => [ p.x + p.l() / 2, p.y + 15 / 2 ],
	sz: () => [ p.l(), 15 ],

	gen: () => {
		window.addEventListener("keydown", e => {
			if (! G.alive) return

			let d = [ "ArrowLeft",  "ArrowRight" ].indexOf(e.key)
			if (d < 0) return
			d = d ? 1 : -1
			p.v += d * p.a()
			if (Math.abs(p.v) > p.Mv()) p.v = d * p.Mv()
			log("Vp", "A " + p.v.toFixed(2))
		})
		T.hook(p)

		if (G.alive) u.p((m.Mw - p.l()) / 2)
	},
	rep: () => {
		if (! p.v) return
		const d = p.v / Math.abs(p.v)
		p.v -= d * p.r()
		if (p.v * d < 0) p.v = 0
		log("Vp", "F " + p.v.toFixed(2))

		let x_ = p.x + p.v
		const lx = 0, rx = m.Mw - p.l()
		if (x_ < lx || x_ > rx) {
			p.v = 0
			log("Vp", "H 0")
			x_ = d < 0 ? lx : rx
		}
		u.p(x_)
	}
}

var j = {
	s: dat("Pjt size", 20, 100, 10)				(60),
	ds: dat("Pjt spring deformation", 1, 50, 5)	(10),
	vs: dat("Pjt spring speed", 1, 20, 1)		(10),
	es: dat("Pjt spring energy %", 0, 120, 5)	(100),
	x: null, y: null,

	fy: null, sy: null,
	S: null,

	g: dat("Gravity acceleration", 1, 20, 1)	(1),
	vx: 0, vy: 0,

	ctr: () => [ j.x + j.s() / 2, j.y + (j.s() + j.sy) / 2 ],
	sz: () => [ j.s(), j.s() + j.sy ],

	gen: () => {
		j.S = "M"
		u.j((m.Mw - j.s()) / 2, m.Mr)

		T.hook(j)
	},
	rep: () => {
		switch (j.S) {
		case "M":
			let x_ = j.x + j.vx, y_ = j.y + j.vy

			j.fy = m.Mh - j.s()
			if (y_ >= j.fy) {
				y_ = j.fy

				const fx = j.ctr()[0]
				
				if (fx >= p.x && fx <= p.x + p.l()) {
					log("C", "Plate")

					j.sy = 0
					j.S = "D-"

					j.vx += p.v * p.μ()
					j.vy = - j.vy * j.es()
				}
				else {
					log("C", "Floor")
					G.die()
				}
			}
			else {
				if (y_ < m.Mr) {
					const lc = Math.max(~~ (x_ / 30), 0), rc = Math.min(~~ ((x_ + j.s()) / 30 - .5), m.mw)
					const ur = Math.max(~~ (y_ / 15), 0), dr = Math.min(~~ ((y_ + j.s()) / 15 - .5), m.mr)
					const R = j.s() / 2, cx = x_ + R, cy = y_ + R

					for (let r = ur; r <= dr; r ++) for (let c = lc; c <= rc; c ++) {
						if (Math.sqrt(
							Math.min(Math.abs(cx - c * 30), Math.abs(cx - (c + 1) * 30)) ** 2 +
							Math.min(Math.abs(cy - r * 15), Math.abs(cy - (r + 1) * 15)) ** 2
						) < R) {
							log("C", `Block (${c}, ${r})`, { c, r })
						}
					}
				}
				j.vy += j.g()
			}

			if (x_ < 0) x_ += 600
			if (x_ > 600) x_ -= 600

			u.j(x_, y_)

			break

		case "D-":
			j.sy -= j.vs()
			if (j.sy <= - j.ds()) {
				j.sy = - j.ds()
				j.S = "D+"
			}
			u.j(j.x, j.fy - j.sy)
			break

		case "D+":
			j.sy += j.vs()
			if (j.sy >= 0) {
				j.sy = 0
				j.S = "M"
			}
			u.j(j.x, j.fy - j.sy)
			break
		}
	}
}

window.onload = () => {
	const actions = {
		start: () => {
			$("#start").disabled = "disabled"
			G.start()
		},
		reload: () => {
			L.start = "reload"
			history.go()
		},
		clear: () => {
			L.clear()
			history.go()
		}
	}

	if (L.start === "reload") {
		delete L.start
		actions.start()
	}

	const k = {}
	for (let [ a, f ] of Object.entries(actions)) {
		$("#" + a).addEventListener("click", f)
		k[a[0]] = f
	}

	window.addEventListener("keypress", e => k[e.key]?.())
}

