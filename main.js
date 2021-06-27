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

var J = $("#img")

var u = {
	j: (x, y) => {
		u.cj.clearRect(j.x, j.y, ...j.sz())
		u.cj.drawImage(J, j.x = x, j.y = y, ...j.sz())
	},
	b: (x, y, v) => {
		m.a[x][y] = v
		u.cs.fillStyle = m.T[v].c
		u.cs.fillRect(x * 30 + 1, y * 15 + 1, 28, 14)
	},
	p: x => {
		u.cp.fillStyle = "red"
		u.cp.clearRect(p.x - .5, p.y, p.l() + 1, 15)
		u.cp.fillRect(p.x = x, p.y, ...p.sz())
	},
	N: (s, t) => {
		u.cn.clearRect(0, 100, 600, 150)
		u.cn.fillText(s, 300, 200)

		if (t) N.tid = setTimeout(() => u.N(""), t)
	}
}

var D = {
	vk: dat("Movement line scale", 1, 15, 1) (5),
	iR: dat("If resultant force") (true),

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

	gen: R => R || D
		.globalClear()
		.watchMovement(p, "x")
		.watchBox(p)
		.watchMovement(j, "xy")
		.watchBox(j)
		.watchBlockCollision()
}

var G = {
	pts: null,
	ing: false,

	start: R => {
		R && G.end("")

		log("G", R ? "Restart" : "Start")
		G.pts = 0
		G.ing = true

		; [ m, p, j, D, T, N ].forEach(M => M.gen(R))
	},
	end: t => {
		G.ing = false

		u.cn.font = "40px Serif"
		u.cn.fillStyle = "red"

		clearTimeout(N.tid)
		u.N(t)

		clearInterval(T.tid)
	},

	over: () => {
		log("G", "Over")
		G.end(`Pjt over, ${G.pts}pts`)
	},
	clear: () => {
		log("G", "Clear")
		G.end(`Stage clear, ${G.pts}pts`)
	}
}

var m = {
	a: null, b: 0,

	mr: 4,		Mr: (4 + 1) * 15,
	mw: 20,		Mw: 20 * 30,
	mh: 20,		Mh: 20 * 15,

	T: {
		empty:	{ c: "white",		p: 20 },
		normal:	{ c: "black",		p: 50,	pts: 1
		},
		paddy:	{ c: "yellow",		p: 20,	pts: 2, sg: true,
			a: dat("Block.paddy acceleration", .1, 2, .1) (1),
			f: () => j.vy = Math.abs(j.vy) + m.T.paddy.a()
		},
		sticky: { c: "springgreen",	p: 5,	pts: 3,
			a: dat("Block.sticky deceleration", .1, 1, .1) (.3),
			f: () => j.S = "SM"
		},
		noisy:	{ c: "orange",		p: 5,	pts: 3, sg: true,
			f: () => {
				m.T.paddy.f()
				u.N(N.res(), 3000)
			}
		},

		map: f => {
			for (let K in m.T) if (K !== "map") if (! f(m.T[K], K)) return
		}
	},

	gen: R => {
		m.a = Array.from({ length: m.mh }, () => [])

		if (! R) {
			let pa = 0
			m.T.map(V => pa = V.p += pa)

			u.cs.fillStyle = "white"
			u.cs.fillRect(0, 0, 600, 400)
		}

		for (let r = 0; r <= m.mr; r ++) for (let c = 0; c < m.mw; c ++) {
			const p =  ~~ (Math.random() * 100)
			m.T.map((V, K) => {
				if (p < V.p) {
					if (K !== "empty") m.b ++
					u.b(c, r, K)
				}
				else return true
			})
		}
	}
}

var T = dat("Ms per tick", 50, 500, 50) (50)
Object.assign(T, {
	tid: null,
	_h: [],
	hook: o => T._h.push(() => o.rep()),
	gen: _R => T.tid = setInterval(() => T._h.forEach(f => f()), T())
})

var p = {
	l: dat("Plate length", 10, 200, 5) (100),
	a: dat("Plate acceleration", 1, 10, 1) (5),
	Mv: dat("Plate speed limit", 1, 30, 1) (20),
	r: dat("Plate resistance", .1, 1, .1) (1),
	μ: dat("Plate friction %", 0, 100, 5) (50),

	v: null,
	x: null, y: m.Mh,

	ctr: () => [ p.x + p.l() / 2, p.y + 15 / 2 ],
	sz: () => [ p.l(), 15 ],

	gen: R => {
		p.v = 0
		u.p((m.Mw - p.l()) / 2)

		R || T.hook(p)
		R || window.addEventListener("keydown", e => {
			if (! G.ing) return

			let d = [ "ArrowLeft",  "ArrowRight" ].indexOf(e.key)
			if (d < 0) return
			d = d ? 1 : -1
			p.v += d * p.a()
			if (Math.abs(p.v) > p.Mv()) p.v = d * p.Mv()
			log("Vp", "A " + p.v.toFixed(2))
		})
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

var N = {
	_r: [
		"干嘛哒！",
		"就要这样！",
		"你脑子有点问题。",
		"你也不要读书了。",
		"我好好读书的！",
		"是的是的！",
		"摆事实讲道理……",
		"老师我想出去溜达一下！",
		"爸爸爸爸爸爸爸爸",
		"🎺↑↓↑↓"
	],
	res: () => N._r[ ~~ (Math.random() * 1.e8) % N._r.length ],

	gen: R => {
		if (! R) {
			u.cn.font = "40px Sans-serif"
			u.cn.textAlign = "center"
		}
		u.cn.fillStyle = "orange"
	}
}

var j = {
	s: dat("Pjt size", 20, 100, 10) (60),

	ds: dat("Pjt spring deformation", 1, 50, 5) (10),
	vs: dat("Pjt spring speed", 1, 20, 1) (10),
	es: dat("Pjt spring energy %", 0, 120, 5) (100),
	fy: null, sy: null,
	S: null,

	g: dat("Gravity acceleration", .1, 2, .1) (1),
	vx: null, vy: null,

	x: null, y: null,

	ctr: () => [ j.x + j.s() / 2, j.y + (j.s() + j.sy) / 2 ],
	sz: () => [ j.s(), j.s() + j.sy ],

	gen: R => {
		j.S = "M"
		j.vx = j.vy = 0

		u.j((m.Mw - j.s()) / 2, m.Mr)

		R || T.hook(j)
	},
	rep: () => {
		switch (j.S) {
		case "SM":
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
					G.over()
				}
			}
			else {
				if (y_ < m.Mr) {
					const lc = Math.max(~~ (x_ / 30), 0), rc = Math.min(~~ ((x_ + j.s()) / 30 - .001), m.mw - 1)
					const ur = Math.max(~~ (y_ / 15), 0), dr = Math.min(~~ ((y_ + j.s()) / 15 - .001), m.mr)
					const R = j.s() / 2, cx = x_ + R, cy = y_ + R

					for (let r = ur; r <= dr; r ++) for (let c = lc; c <= rc; c ++) {
						const lx = c * 30, rx = lx + 30
						const uy = r * 15, dy = uy + 15
						const Δx = Math.min(Math.abs(cx - lx), Math.abs(cx - rx))
						const Δy = Math.min(Math.abs(cy - uy), Math.abs(cy - dy))

						if (
							Math.sqrt(Δx ** 2 + Δy ** 2) < R ||
							lx <= cx && cx <= rx && Δy < R ||
							uy <= cy && cy <= dy && Δx < R
						) {
							const K = m.a[c][r], V = m.T[K]
							if (K === "empty") continue
							u.b(c, r, "empty")

							log("C", `Block (${c}, ${r})`, { c, r })

							V.f?.()
							G.pts += V.pts
							if (! -- m.b) G.clear()

							if (V.sg) break
						}
					}
				}

				j.vy += j.g()
				if (j.vy > 0 && j.S === "SM") j.vy -= m.T.sticky.a()
			}

			if (j.vx < 0 && x_ + j.s() < 0) {
				x_ += 600
				log("C", "Left wall")
			}
			if (j.vx > 0 && x_ > 600) {
				x_ -= 600
				log("C", "Right wall")
			}

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
	const $c = $("#canvas")
	const cvs = [ "stage", "plate", "jintao", "noise", "debug" ]
	for (const [ z, c ] of cvs.entries()) {
		const $i = document.createElement("canvas")
		$i.id = "c-" + c
		$i.width = "600"; $i.height = "400"
		$i.style.zIndex = z
		if (c === "debug") $i.style.display = "none"
		$c.appendChild($i)

		u["c" + c[0]] = $i.getContext("2d")
	}

	let R = false
	const ops = {
		start: () => {
			if (! R) $("#a-start").innerHTML = "Restart"
			G.start(R)
			R = true
		},
		clear: () => L.clear(),
		debug: () => {
			const s = $("#c-debug").style
			s.display = { block: "none", none: "block" } [ s.display ]
		},
		pause: () => { debugger }
	}
	const $o = $("#op"), k = {}
	for (const [ o, f ] of Object.entries(ops)) {
		const $i = document.createElement("button")
		$i.id = "a-" + o
		$i.innerHTML = o.replace(/^[a-z]/, c => c.toUpperCase())
		$o.appendChild($i)
		$i.addEventListener("click", f)

		k[o[0]] = f
	}
	window.addEventListener("keypress", e => k[e.key]?.())
}

