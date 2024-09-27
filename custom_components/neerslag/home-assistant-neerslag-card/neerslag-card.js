(() => {
    "use strict";
    const t = globalThis,
        e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
        i = Symbol(), s = new WeakMap;

    class n {
        constructor(t, e, s) {
            if (this._$cssResult$ = !0, s !== i) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
            this.cssText = t, this.t = e
        }

        get styleSheet() {
            let t = this.o;
            const i = this.t;
            if (e && void 0 === t) {
                const e = void 0 !== i && 1 === i.length;
                e && (t = s.get(i)), void 0 === t && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText), e && s.set(i, t))
            }
            return t
        }

        toString() {
            return this.cssText
        }
    }

    const o = (t, ...e) => {
            const s = 1 === t.length ? t[0] : e.reduce(((e, i, s) => e + (t => {
                if (!0 === t._$cssResult$) return t.cssText;
                if ("number" == typeof t) return t;
                throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")
            })(i) + t[s + 1]), t[0]);
            return new n(s, t, i)
        }, r = (i, s) => {
            if (e) i.adoptedStyleSheets = s.map((t => t instanceof CSSStyleSheet ? t : t.styleSheet)); else for (const e of s) {
                const s = document.createElement("style"), n = t.litNonce;
                void 0 !== n && s.setAttribute("nonce", n), s.textContent = e.cssText, i.appendChild(s)
            }
        }, a = e ? t => t : t => t instanceof CSSStyleSheet ? (t => {
            let e = "";
            for (const i of t.cssRules) e += i.cssText;
            return (t => new n("string" == typeof t ? t : t + "", void 0, i))(e)
        })(t) : t, {
            is: l,
            defineProperty: h,
            getOwnPropertyDescriptor: c,
            getOwnPropertyNames: d,
            getOwnPropertySymbols: u,
            getPrototypeOf: f
        } = Object, g = globalThis, p = g.trustedTypes, m = p ? p.emptyScript : "", b = g.reactiveElementPolyfillSupport,
        x = (t, e) => t, y = {
            toAttribute(t, e) {
                switch (e) {
                    case Boolean:
                        t = t ? m : null;
                        break;
                    case Object:
                    case Array:
                        t = null == t ? t : JSON.stringify(t)
                }
                return t
            }, fromAttribute(t, e) {
                let i = t;
                switch (e) {
                    case Boolean:
                        i = null !== t;
                        break;
                    case Number:
                        i = null === t ? null : Number(t);
                        break;
                    case Object:
                    case Array:
                        try {
                            i = JSON.parse(t)
                        } catch (t) {
                            i = null
                        }
                }
                return i
            }
        }, _ = (t, e) => !l(t, e), v = {attribute: !0, type: String, converter: y, reflect: !1, hasChanged: _};
    Symbol.metadata ??= Symbol("metadata"), g.litPropertyMetadata ??= new WeakMap;

    class w extends HTMLElement {
        static addInitializer(t) {
            this._$Ei(), (this.l ??= []).push(t)
        }

        static get observedAttributes() {
            return this.finalize(), this._$Eh && [...this._$Eh.keys()]
        }

        static createProperty(t, e = v) {
            if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
                const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
                void 0 !== s && h(this.prototype, t, s)
            }
        }

        static getPropertyDescriptor(t, e, i) {
            const {get: s, set: n} = c(this.prototype, t) ?? {
                get() {
                    return this[e]
                }, set(t) {
                    this[e] = t
                }
            };
            return {
                get() {
                    return s?.call(this)
                }, set(e) {
                    const o = s?.call(this);
                    n.call(this, e), this.requestUpdate(t, o, i)
                }, configurable: !0, enumerable: !0
            }
        }

        static getPropertyOptions(t) {
            return this.elementProperties.get(t) ?? v
        }

        static _$Ei() {
            if (this.hasOwnProperty(x("elementProperties"))) return;
            const t = f(this);
            t.finalize(), void 0 !== t.l && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties)
        }

        static finalize() {
            if (this.hasOwnProperty(x("finalized"))) return;
            if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(x("properties"))) {
                const t = this.properties, e = [...d(t), ...u(t)];
                for (const i of e) this.createProperty(i, t[i])
            }
            const t = this[Symbol.metadata];
            if (null !== t) {
                const e = litPropertyMetadata.get(t);
                if (void 0 !== e) for (const [t, i] of e) this.elementProperties.set(t, i)
            }
            this._$Eh = new Map;
            for (const [t, e] of this.elementProperties) {
                const i = this._$Eu(t, e);
                void 0 !== i && this._$Eh.set(i, t)
            }
            this.elementStyles = this.finalizeStyles(this.styles)
        }

        static finalizeStyles(t) {
            const e = [];
            if (Array.isArray(t)) {
                const i = new Set(t.flat(1 / 0).reverse());
                for (const t of i) e.unshift(a(t))
            } else void 0 !== t && e.push(a(t));
            return e
        }

        static _$Eu(t, e) {
            const i = e.attribute;
            return !1 === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0
        }

        constructor() {
            super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev()
        }

        _$Ev() {
            this._$ES = new Promise((t => this.enableUpdating = t)), this._$AL = new Map, this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t => t(this)))
        }

        addController(t) {
            (this._$EO ??= new Set).add(t), void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.()
        }

        removeController(t) {
            this._$EO?.delete(t)
        }

        _$E_() {
            const t = new Map, e = this.constructor.elementProperties;
            for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
            t.size > 0 && (this._$Ep = t)
        }

        createRenderRoot() {
            const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
            return r(t, this.constructor.elementStyles), t
        }

        connectedCallback() {
            this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t => t.hostConnected?.()))
        }

        enableUpdating(t) {
        }

        disconnectedCallback() {
            this._$EO?.forEach((t => t.hostDisconnected?.()))
        }

        attributeChangedCallback(t, e, i) {
            this._$AK(t, i)
        }

        _$EC(t, e) {
            const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
            if (void 0 !== s && !0 === i.reflect) {
                const n = (void 0 !== i.converter?.toAttribute ? i.converter : y).toAttribute(e, i.type);
                this._$Em = t, null == n ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null
            }
        }

        _$AK(t, e) {
            const i = this.constructor, s = i._$Eh.get(t);
            if (void 0 !== s && this._$Em !== s) {
                const t = i.getPropertyOptions(s),
                    n = "function" == typeof t.converter ? {fromAttribute: t.converter} : void 0 !== t.converter?.fromAttribute ? t.converter : y;
                this._$Em = s, this[s] = n.fromAttribute(e, t.type), this._$Em = null
            }
        }

        requestUpdate(t, e, i) {
            if (void 0 !== t) {
                if (i ??= this.constructor.getPropertyOptions(t), !(i.hasChanged ?? _)(this[t], e)) return;
                this.P(t, e, i)
            }
            !1 === this.isUpdatePending && (this._$ES = this._$ET())
        }

        P(t, e, i) {
            this._$AL.has(t) || this._$AL.set(t, e), !0 === i.reflect && this._$Em !== t && (this._$Ej ??= new Set).add(t)
        }

        async _$ET() {
            this.isUpdatePending = !0;
            try {
                await this._$ES
            } catch (t) {
                Promise.reject(t)
            }
            const t = this.scheduleUpdate();
            return null != t && await t, !this.isUpdatePending
        }

        scheduleUpdate() {
            return this.performUpdate()
        }

        performUpdate() {
            if (!this.isUpdatePending) return;
            if (!this.hasUpdated) {
                if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
                    for (const [t, e] of this._$Ep) this[t] = e;
                    this._$Ep = void 0
                }
                const t = this.constructor.elementProperties;
                if (t.size > 0) for (const [e, i] of t) !0 !== i.wrapped || this._$AL.has(e) || void 0 === this[e] || this.P(e, this[e], i)
            }
            let t = !1;
            const e = this._$AL;
            try {
                t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((t => t.hostUpdate?.())), this.update(e)) : this._$EU()
            } catch (e) {
                throw t = !1, this._$EU(), e
            }
            t && this._$AE(e)
        }

        willUpdate(t) {
        }

        _$AE(t) {
            this._$EO?.forEach((t => t.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t)
        }

        _$EU() {
            this._$AL = new Map, this.isUpdatePending = !1
        }

        get updateComplete() {
            return this.getUpdateComplete()
        }

        getUpdateComplete() {
            return this._$ES
        }

        shouldUpdate(t) {
            return !0
        }

        update(t) {
            this._$Ej &&= this._$Ej.forEach((t => this._$EC(t, this[t]))), this._$EU()
        }

        updated(t) {
        }

        firstUpdated(t) {
        }
    }

    w.elementStyles = [], w.shadowRootOptions = {mode: "open"}, w[x("elementProperties")] = new Map, w[x("finalized")] = new Map, b?.({ReactiveElement: w}), (g.reactiveElementVersions ??= []).push("2.0.4");
    const M = globalThis, k = M.trustedTypes, S = k ? k.createPolicy("lit-html", {createHTML: t => t}) : void 0,
        C = "$lit$", A = `lit$${Math.random().toFixed(9).slice(2)}$`, P = "?" + A, D = `<${P}>`, O = document,
        E = () => O.createComment(""), T = t => null === t || "object" != typeof t && "function" != typeof t,
        R = Array.isArray, L = "[ \t\n\f\r]", I = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $ = /-->/g,
        z = />/g, F = RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), W = /'/g,
        V = /"/g, B = /^(?:script|style|textarea|title)$/i,
        N = t => (e, ...i) => ({_$litType$: t, strings: e, values: i}), j = N(1),
        H = (N(2), Symbol.for("lit-noChange")), U = Symbol.for("lit-nothing"), Y = new WeakMap,
        X = O.createTreeWalker(O, 129);

    function G(t, e) {
        if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
        return void 0 !== S ? S.createHTML(e) : e
    }

    const q = (t, e) => {
        const i = t.length - 1, s = [];
        let n, o = 2 === e ? "<svg>" : "", r = I;
        for (let e = 0; e < i; e++) {
            const i = t[e];
            let a, l, h = -1, c = 0;
            for (; c < i.length && (r.lastIndex = c, l = r.exec(i), null !== l);) c = r.lastIndex, r === I ? "!--" === l[1] ? r = $ : void 0 !== l[1] ? r = z : void 0 !== l[2] ? (B.test(l[2]) && (n = RegExp("</" + l[2], "g")), r = F) : void 0 !== l[3] && (r = F) : r === F ? ">" === l[0] ? (r = n ?? I, h = -1) : void 0 === l[1] ? h = -2 : (h = r.lastIndex - l[2].length, a = l[1], r = void 0 === l[3] ? F : '"' === l[3] ? V : W) : r === V || r === W ? r = F : r === $ || r === z ? r = I : (r = F, n = void 0);
            const d = r === F && t[e + 1].startsWith("/>") ? " " : "";
            o += r === I ? i + D : h >= 0 ? (s.push(a), i.slice(0, h) + C + i.slice(h) + A + d) : i + A + (-2 === h ? e : d)
        }
        return [G(t, o + (t[i] || "<?>") + (2 === e ? "</svg>" : "")), s]
    };

    class K {
        constructor({strings: t, _$litType$: e}, i) {
            let s;
            this.parts = [];
            let n = 0, o = 0;
            const r = t.length - 1, a = this.parts, [l, h] = q(t, e);
            if (this.el = K.createElement(l, i), X.currentNode = this.el.content, 2 === e) {
                const t = this.el.content.firstChild;
                t.replaceWith(...t.childNodes)
            }
            for (; null !== (s = X.nextNode()) && a.length < r;) {
                if (1 === s.nodeType) {
                    if (s.hasAttributes()) for (const t of s.getAttributeNames()) if (t.endsWith(C)) {
                        const e = h[o++], i = s.getAttribute(t).split(A), r = /([.?@])?(.*)/.exec(e);
                        a.push({
                            type: 1,
                            index: n,
                            name: r[2],
                            strings: i,
                            ctor: "." === r[1] ? et : "?" === r[1] ? it : "@" === r[1] ? st : tt
                        }), s.removeAttribute(t)
                    } else t.startsWith(A) && (a.push({type: 6, index: n}), s.removeAttribute(t));
                    if (B.test(s.tagName)) {
                        const t = s.textContent.split(A), e = t.length - 1;
                        if (e > 0) {
                            s.textContent = k ? k.emptyScript : "";
                            for (let i = 0; i < e; i++) s.append(t[i], E()), X.nextNode(), a.push({
                                type: 2,
                                index: ++n
                            });
                            s.append(t[e], E())
                        }
                    }
                } else if (8 === s.nodeType) if (s.data === P) a.push({type: 2, index: n}); else {
                    let t = -1;
                    for (; -1 !== (t = s.data.indexOf(A, t + 1));) a.push({type: 7, index: n}), t += A.length - 1
                }
                n++
            }
        }

        static createElement(t, e) {
            const i = O.createElement("template");
            return i.innerHTML = t, i
        }
    }

    function J(t, e, i = t, s) {
        if (e === H) return e;
        let n = void 0 !== s ? i._$Co?.[s] : i._$Cl;
        const o = T(e) ? void 0 : e._$litDirective$;
        return n?.constructor !== o && (n?._$AO?.(!1), void 0 === o ? n = void 0 : (n = new o(t), n._$AT(t, i, s)), void 0 !== s ? (i._$Co ??= [])[s] = n : i._$Cl = n), void 0 !== n && (e = J(t, n._$AS(t, e.values), n, s)), e
    }

    class Z {
        constructor(t, e) {
            this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e
        }

        get parentNode() {
            return this._$AM.parentNode
        }

        get _$AU() {
            return this._$AM._$AU
        }

        u(t) {
            const {el: {content: e}, parts: i} = this._$AD, s = (t?.creationScope ?? O).importNode(e, !0);
            X.currentNode = s;
            let n = X.nextNode(), o = 0, r = 0, a = i[0];
            for (; void 0 !== a;) {
                if (o === a.index) {
                    let e;
                    2 === a.type ? e = new Q(n, n.nextSibling, this, t) : 1 === a.type ? e = new a.ctor(n, a.name, a.strings, this, t) : 6 === a.type && (e = new nt(n, this, t)), this._$AV.push(e), a = i[++r]
                }
                o !== a?.index && (n = X.nextNode(), o++)
            }
            return X.currentNode = O, s
        }

        p(t) {
            let e = 0;
            for (const i of this._$AV) void 0 !== i && (void 0 !== i.strings ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++
        }
    }

    class Q {
        get _$AU() {
            return this._$AM?._$AU ?? this._$Cv
        }

        constructor(t, e, i, s) {
            this.type = 2, this._$AH = U, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0
        }

        get parentNode() {
            let t = this._$AA.parentNode;
            const e = this._$AM;
            return void 0 !== e && 11 === t?.nodeType && (t = e.parentNode), t
        }

        get startNode() {
            return this._$AA
        }

        get endNode() {
            return this._$AB
        }

        _$AI(t, e = this) {
            t = J(this, t, e), T(t) ? t === U || null == t || "" === t ? (this._$AH !== U && this._$AR(), this._$AH = U) : t !== this._$AH && t !== H && this._(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : (t => R(t) || "function" == typeof t?.[Symbol.iterator])(t) ? this.k(t) : this._(t)
        }

        S(t) {
            return this._$AA.parentNode.insertBefore(t, this._$AB)
        }

        T(t) {
            this._$AH !== t && (this._$AR(), this._$AH = this.S(t))
        }

        _(t) {
            this._$AH !== U && T(this._$AH) ? this._$AA.nextSibling.data = t : this.T(O.createTextNode(t)), this._$AH = t
        }

        $(t) {
            const {values: e, _$litType$: i} = t,
                s = "number" == typeof i ? this._$AC(t) : (void 0 === i.el && (i.el = K.createElement(G(i.h, i.h[0]), this.options)), i);
            if (this._$AH?._$AD === s) this._$AH.p(e); else {
                const t = new Z(s, this), i = t.u(this.options);
                t.p(e), this.T(i), this._$AH = t
            }
        }

        _$AC(t) {
            let e = Y.get(t.strings);
            return void 0 === e && Y.set(t.strings, e = new K(t)), e
        }

        k(t) {
            R(this._$AH) || (this._$AH = [], this._$AR());
            const e = this._$AH;
            let i, s = 0;
            for (const n of t) s === e.length ? e.push(i = new Q(this.S(E()), this.S(E()), this, this.options)) : i = e[s], i._$AI(n), s++;
            s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s)
        }

        _$AR(t = this._$AA.nextSibling, e) {
            for (this._$AP?.(!1, !0, e); t && t !== this._$AB;) {
                const e = t.nextSibling;
                t.remove(), t = e
            }
        }

        setConnected(t) {
            void 0 === this._$AM && (this._$Cv = t, this._$AP?.(t))
        }
    }

    class tt {
        get tagName() {
            return this.element.tagName
        }

        get _$AU() {
            return this._$AM._$AU
        }

        constructor(t, e, i, s, n) {
            this.type = 1, this._$AH = U, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = n, i.length > 2 || "" !== i[0] || "" !== i[1] ? (this._$AH = Array(i.length - 1).fill(new String), this.strings = i) : this._$AH = U
        }

        _$AI(t, e = this, i, s) {
            const n = this.strings;
            let o = !1;
            if (void 0 === n) t = J(this, t, e, 0), o = !T(t) || t !== this._$AH && t !== H, o && (this._$AH = t); else {
                const s = t;
                let r, a;
                for (t = n[0], r = 0; r < n.length - 1; r++) a = J(this, s[i + r], e, r), a === H && (a = this._$AH[r]), o ||= !T(a) || a !== this._$AH[r], a === U ? t = U : t !== U && (t += (a ?? "") + n[r + 1]), this._$AH[r] = a
            }
            o && !s && this.j(t)
        }

        j(t) {
            t === U ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "")
        }
    }

    class et extends tt {
        constructor() {
            super(...arguments), this.type = 3
        }

        j(t) {
            this.element[this.name] = t === U ? void 0 : t
        }
    }

    class it extends tt {
        constructor() {
            super(...arguments), this.type = 4
        }

        j(t) {
            this.element.toggleAttribute(this.name, !!t && t !== U)
        }
    }

    class st extends tt {
        constructor(t, e, i, s, n) {
            super(t, e, i, s, n), this.type = 5
        }

        _$AI(t, e = this) {
            if ((t = J(this, t, e, 0) ?? U) === H) return;
            const i = this._$AH,
                s = t === U && i !== U || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive,
                n = t !== U && (i === U || s);
            s && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t
        }

        handleEvent(t) {
            "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t)
        }
    }

    class nt {
        constructor(t, e, i) {
            this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i
        }

        get _$AU() {
            return this._$AM._$AU
        }

        _$AI(t) {
            J(this, t)
        }
    }

    const ot = M.litHtmlPolyfillSupport;
    ot?.(K, Q), (M.litHtmlVersions ??= []).push("3.1.3");

    class rt extends w {
        constructor() {
            super(...arguments), this.renderOptions = {host: this}, this._$Do = void 0
        }

        createRenderRoot() {
            const t = super.createRenderRoot();
            return this.renderOptions.renderBefore ??= t.firstChild, t
        }

        update(t) {
            const e = this.render();
            this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ((t, e, i) => {
                const s = i?.renderBefore ?? e;
                let n = s._$litPart$;
                if (void 0 === n) {
                    const t = i?.renderBefore ?? null;
                    s._$litPart$ = n = new Q(e.insertBefore(E(), t), t, void 0, i ?? {})
                }
                return n._$AI(t), n
            })(e, this.renderRoot, this.renderOptions)
        }

        connectedCallback() {
            super.connectedCallback(), this._$Do?.setConnected(!0)
        }

        disconnectedCallback() {
            super.disconnectedCallback(), this._$Do?.setConnected(!1)
        }

        render() {
            return H
        }
    }

    rt._$litElement$ = !0, rt.finalized = !0, globalThis.litElementHydrateSupport?.({LitElement: rt});
    const at = globalThis.litElementPolyfillSupport;
    at?.({LitElement: rt}), (globalThis.litElementVersions ??= []).push("4.0.5");
    const lt = "undefined" == typeof window ? function (t) {
        return t()
    } : window.requestAnimationFrame;

    function ht(t, e, i) {
        const s = i || (t => Array.prototype.slice.call(t));
        let n = !1, o = [];
        return function (...i) {
            o = s(i), n || (n = !0, lt.call(window, (() => {
                n = !1, t.apply(e, o)
            })))
        }
    }

    const ct = t => "start" === t ? "left" : "end" === t ? "right" : "center",
        dt = (t, e, i) => "start" === t ? e : "end" === t ? i : (e + i) / 2;

    function ut() {
    }

    const ft = function () {
        let t = 0;
        return function () {
            return t++
        }
    }();

    function gt(t) {
        return null == t
    }

    function pt(t) {
        if (Array.isArray && Array.isArray(t)) return !0;
        const e = Object.prototype.toString.call(t);
        return "[object" === e.slice(0, 7) && "Array]" === e.slice(-6)
    }

    function mt(t) {
        return null !== t && "[object Object]" === Object.prototype.toString.call(t)
    }

    const bt = t => ("number" == typeof t || t instanceof Number) && isFinite(+t);

    function xt(t, e) {
        return bt(t) ? t : e
    }

    function yt(t, e) {
        return void 0 === t ? e : t
    }

    const _t = (t, e) => "string" == typeof t && t.endsWith("%") ? parseFloat(t) / 100 * e : +t;

    function vt(t, e, i) {
        if (t && "function" == typeof t.call) return t.apply(i, e)
    }

    function wt(t, e, i, s) {
        let n, o, r;
        if (pt(t)) if (o = t.length, s) for (n = o - 1; n >= 0; n--) e.call(i, t[n], n); else for (n = 0; n < o; n++) e.call(i, t[n], n); else if (mt(t)) for (r = Object.keys(t), o = r.length, n = 0; n < o; n++) e.call(i, t[r[n]], r[n])
    }

    function Mt(t, e) {
        let i, s, n, o;
        if (!t || !e || t.length !== e.length) return !1;
        for (i = 0, s = t.length; i < s; ++i) if (n = t[i], o = e[i], n.datasetIndex !== o.datasetIndex || n.index !== o.index) return !1;
        return !0
    }

    function kt(t) {
        if (pt(t)) return t.map(kt);
        if (mt(t)) {
            const e = Object.create(null), i = Object.keys(t), s = i.length;
            let n = 0;
            for (; n < s; ++n) e[i[n]] = kt(t[i[n]]);
            return e
        }
        return t
    }

    function St(t) {
        return -1 === ["__proto__", "prototype", "constructor"].indexOf(t)
    }

    function Ct(t, e, i, s) {
        if (!St(t)) return;
        const n = e[t], o = i[t];
        mt(n) && mt(o) ? At(n, o, s) : e[t] = kt(o)
    }

    function At(t, e, i) {
        const s = pt(e) ? e : [e], n = s.length;
        if (!mt(t)) return t;
        const o = (i = i || {}).merger || Ct;
        for (let r = 0; r < n; ++r) {
            if (!mt(e = s[r])) continue;
            const n = Object.keys(e);
            for (let s = 0, r = n.length; s < r; ++s) o(n[s], t, e, i)
        }
        return t
    }

    function Pt(t, e) {
        return At(t, e, {merger: Dt})
    }

    function Dt(t, e, i) {
        if (!St(t)) return;
        const s = e[t], n = i[t];
        mt(s) && mt(n) ? Pt(s, n) : Object.prototype.hasOwnProperty.call(e, t) || (e[t] = kt(n))
    }

    const Ot = "", Et = ".";

    function Tt(t, e) {
        const i = t.indexOf(Et, e);
        return -1 === i ? t.length : i
    }

    function Rt(t, e) {
        if (e === Ot) return t;
        let i = 0, s = Tt(e, i);
        for (; t && s > i;) t = t[e.slice(i, s)], i = s + 1, s = Tt(e, i);
        return t
    }

    function Lt(t) {
        return t.charAt(0).toUpperCase() + t.slice(1)
    }

    const It = t => void 0 !== t, $t = t => "function" == typeof t, zt = (t, e) => {
            if (t.size !== e.size) return !1;
            for (const i of t) if (!e.has(i)) return !1;
            return !0
        }, Ft = Math.PI, Wt = 2 * Ft, Vt = Wt + Ft, Bt = Number.POSITIVE_INFINITY, Nt = Ft / 180, jt = Ft / 2, Ht = Ft / 4,
        Ut = 2 * Ft / 3, Yt = Math.log10, Xt = Math.sign;

    function Gt(t) {
        const e = Math.round(t);
        t = Kt(t, e, t / 1e3) ? e : t;
        const i = Math.pow(10, Math.floor(Yt(t))), s = t / i;
        return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 5 ? 5 : 10) * i
    }

    function qt(t) {
        return !isNaN(parseFloat(t)) && isFinite(t)
    }

    function Kt(t, e, i) {
        return Math.abs(t - e) < i
    }

    function Jt(t, e, i) {
        let s, n, o;
        for (s = 0, n = t.length; s < n; s++) o = t[s][i], isNaN(o) || (e.min = Math.min(e.min, o), e.max = Math.max(e.max, o))
    }

    function Zt(t) {
        return t * (Ft / 180)
    }

    function Qt(t) {
        return t * (180 / Ft)
    }

    function te(t) {
        if (!bt(t)) return;
        let e = 1, i = 0;
        for (; Math.round(t * e) / e !== t;) e *= 10, i++;
        return i
    }

    function ee(t, e) {
        const i = e.x - t.x, s = e.y - t.y, n = Math.sqrt(i * i + s * s);
        let o = Math.atan2(s, i);
        return o < -.5 * Ft && (o += Wt), {angle: o, distance: n}
    }

    function ie(t, e) {
        return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
    }

    function se(t, e) {
        return (t - e + Vt) % Wt - Ft
    }

    function ne(t) {
        return (t % Wt + Wt) % Wt
    }

    function oe(t, e, i, s) {
        const n = ne(t), o = ne(e), r = ne(i), a = ne(o - n), l = ne(r - n), h = ne(n - o), c = ne(n - r);
        return n === o || n === r || s && o === r || a > l && h < c
    }

    function re(t, e, i) {
        return Math.max(e, Math.min(i, t))
    }

    function ae(t, e, i, s = 1e-6) {
        return t >= Math.min(e, i) - s && t <= Math.max(e, i) + s
    }

    const le = t => 0 === t || 1 === t, he = (t, e, i) => -Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * Wt / i),
        ce = (t, e, i) => Math.pow(2, -10 * t) * Math.sin((t - e) * Wt / i) + 1, de = {
            linear: t => t,
            easeInQuad: t => t * t,
            easeOutQuad: t => -t * (t - 2),
            easeInOutQuad: t => (t /= .5) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1),
            easeInCubic: t => t * t * t,
            easeOutCubic: t => (t -= 1) * t * t + 1,
            easeInOutCubic: t => (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2),
            easeInQuart: t => t * t * t * t,
            easeOutQuart: t => -((t -= 1) * t * t * t - 1),
            easeInOutQuart: t => (t /= .5) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2),
            easeInQuint: t => t * t * t * t * t,
            easeOutQuint: t => (t -= 1) * t * t * t * t + 1,
            easeInOutQuint: t => (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2),
            easeInSine: t => 1 - Math.cos(t * jt),
            easeOutSine: t => Math.sin(t * jt),
            easeInOutSine: t => -.5 * (Math.cos(Ft * t) - 1),
            easeInExpo: t => 0 === t ? 0 : Math.pow(2, 10 * (t - 1)),
            easeOutExpo: t => 1 === t ? 1 : 1 - Math.pow(2, -10 * t),
            easeInOutExpo: t => le(t) ? t : t < .5 ? .5 * Math.pow(2, 10 * (2 * t - 1)) : .5 * (2 - Math.pow(2, -10 * (2 * t - 1))),
            easeInCirc: t => t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1),
            easeOutCirc: t => Math.sqrt(1 - (t -= 1) * t),
            easeInOutCirc: t => (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
            easeInElastic: t => le(t) ? t : he(t, .075, .3),
            easeOutElastic: t => le(t) ? t : ce(t, .075, .3),
            easeInOutElastic(t) {
                const e = .1125;
                return le(t) ? t : t < .5 ? .5 * he(2 * t, e, .45) : .5 + .5 * ce(2 * t - 1, e, .45)
            },
            easeInBack(t) {
                const e = 1.70158;
                return t * t * ((e + 1) * t - e)
            },
            easeOutBack(t) {
                const e = 1.70158;
                return (t -= 1) * t * ((e + 1) * t + e) + 1
            },
            easeInOutBack(t) {
                let e = 1.70158;
                return (t /= .5) < 1 ? t * t * ((1 + (e *= 1.525)) * t - e) * .5 : .5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2)
            },
            easeInBounce: t => 1 - de.easeOutBounce(1 - t),
            easeOutBounce(t) {
                const e = 7.5625, i = 2.75;
                return t < 1 / i ? e * t * t : t < 2 / i ? e * (t -= 1.5 / i) * t + .75 : t < 2.5 / i ? e * (t -= 2.25 / i) * t + .9375 : e * (t -= 2.625 / i) * t + .984375
            },
            easeInOutBounce: t => t < .5 ? .5 * de.easeInBounce(2 * t) : .5 * de.easeOutBounce(2 * t - 1) + .5
        };

    function ue(t) {
        return t + .5 | 0
    }

    const fe = (t, e, i) => Math.max(Math.min(t, i), e);

    function ge(t) {
        return fe(ue(2.55 * t), 0, 255)
    }

    function pe(t) {
        return fe(ue(255 * t), 0, 255)
    }

    function me(t) {
        return fe(ue(t / 2.55) / 100, 0, 1)
    }

    function be(t) {
        return fe(ue(100 * t), 0, 100)
    }

    const xe = {
            0: 0,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
            A: 10,
            B: 11,
            C: 12,
            D: 13,
            E: 14,
            F: 15,
            a: 10,
            b: 11,
            c: 12,
            d: 13,
            e: 14,
            f: 15
        }, ye = [..."0123456789ABCDEF"], _e = t => ye[15 & t], ve = t => ye[(240 & t) >> 4] + ye[15 & t],
        we = t => (240 & t) >> 4 == (15 & t);
    const Me = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;

    function ke(t, e, i) {
        const s = e * Math.min(i, 1 - i),
            n = (e, n = (e + t / 30) % 12) => i - s * Math.max(Math.min(n - 3, 9 - n, 1), -1);
        return [n(0), n(8), n(4)]
    }

    function Se(t, e, i) {
        const s = (s, n = (s + t / 60) % 6) => i - i * e * Math.max(Math.min(n, 4 - n, 1), 0);
        return [s(5), s(3), s(1)]
    }

    function Ce(t, e, i) {
        const s = ke(t, 1, .5);
        let n;
        for (e + i > 1 && (n = 1 / (e + i), e *= n, i *= n), n = 0; n < 3; n++) s[n] *= 1 - e - i, s[n] += e;
        return s
    }

    function Ae(t) {
        const e = t.r / 255, i = t.g / 255, s = t.b / 255, n = Math.max(e, i, s), o = Math.min(e, i, s),
            r = (n + o) / 2;
        let a, l, h;
        return n !== o && (h = n - o, l = r > .5 ? h / (2 - n - o) : h / (n + o), a = function (t, e, i, s, n) {
            return t === n ? (e - i) / s + (e < i ? 6 : 0) : e === n ? (i - t) / s + 2 : (t - e) / s + 4
        }(e, i, s, h, n), a = 60 * a + .5), [0 | a, l || 0, r]
    }

    function Pe(t, e, i, s) {
        return (Array.isArray(e) ? t(e[0], e[1], e[2]) : t(e, i, s)).map(pe)
    }

    function De(t, e, i) {
        return Pe(ke, t, e, i)
    }

    function Oe(t) {
        return (t % 360 + 360) % 360
    }

    const Ee = {
        x: "dark",
        Z: "light",
        Y: "re",
        X: "blu",
        W: "gr",
        V: "medium",
        U: "slate",
        A: "ee",
        T: "ol",
        S: "or",
        B: "ra",
        C: "lateg",
        D: "ights",
        R: "in",
        Q: "turquois",
        E: "hi",
        P: "ro",
        O: "al",
        N: "le",
        M: "de",
        L: "yello",
        F: "en",
        K: "ch",
        G: "arks",
        H: "ea",
        I: "ightg",
        J: "wh"
    }, Te = {
        OiceXe: "f0f8ff",
        antiquewEte: "faebd7",
        aqua: "ffff",
        aquamarRe: "7fffd4",
        azuY: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "0",
        blanKedOmond: "ffebcd",
        Xe: "ff",
        XeviTet: "8a2be2",
        bPwn: "a52a2a",
        burlywood: "deb887",
        caMtXe: "5f9ea0",
        KartYuse: "7fff00",
        KocTate: "d2691e",
        cSO: "ff7f50",
        cSnflowerXe: "6495ed",
        cSnsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "ffff",
        xXe: "8b",
        xcyan: "8b8b",
        xgTMnPd: "b8860b",
        xWay: "a9a9a9",
        xgYF: "6400",
        xgYy: "a9a9a9",
        xkhaki: "bdb76b",
        xmagFta: "8b008b",
        xTivegYF: "556b2f",
        xSange: "ff8c00",
        xScEd: "9932cc",
        xYd: "8b0000",
        xsOmon: "e9967a",
        xsHgYF: "8fbc8f",
        xUXe: "483d8b",
        xUWay: "2f4f4f",
        xUgYy: "2f4f4f",
        xQe: "ced1",
        xviTet: "9400d3",
        dAppRk: "ff1493",
        dApskyXe: "bfff",
        dimWay: "696969",
        dimgYy: "696969",
        dodgerXe: "1e90ff",
        fiYbrick: "b22222",
        flSOwEte: "fffaf0",
        foYstWAn: "228b22",
        fuKsia: "ff00ff",
        gaRsbSo: "dcdcdc",
        ghostwEte: "f8f8ff",
        gTd: "ffd700",
        gTMnPd: "daa520",
        Way: "808080",
        gYF: "8000",
        gYFLw: "adff2f",
        gYy: "808080",
        honeyMw: "f0fff0",
        hotpRk: "ff69b4",
        RdianYd: "cd5c5c",
        Rdigo: "4b0082",
        ivSy: "fffff0",
        khaki: "f0e68c",
        lavFMr: "e6e6fa",
        lavFMrXsh: "fff0f5",
        lawngYF: "7cfc00",
        NmoncEffon: "fffacd",
        ZXe: "add8e6",
        ZcSO: "f08080",
        Zcyan: "e0ffff",
        ZgTMnPdLw: "fafad2",
        ZWay: "d3d3d3",
        ZgYF: "90ee90",
        ZgYy: "d3d3d3",
        ZpRk: "ffb6c1",
        ZsOmon: "ffa07a",
        ZsHgYF: "20b2aa",
        ZskyXe: "87cefa",
        ZUWay: "778899",
        ZUgYy: "778899",
        ZstAlXe: "b0c4de",
        ZLw: "ffffe0",
        lime: "ff00",
        limegYF: "32cd32",
        lRF: "faf0e6",
        magFta: "ff00ff",
        maPon: "800000",
        VaquamarRe: "66cdaa",
        VXe: "cd",
        VScEd: "ba55d3",
        VpurpN: "9370db",
        VsHgYF: "3cb371",
        VUXe: "7b68ee",
        VsprRggYF: "fa9a",
        VQe: "48d1cc",
        VviTetYd: "c71585",
        midnightXe: "191970",
        mRtcYam: "f5fffa",
        mistyPse: "ffe4e1",
        moccasR: "ffe4b5",
        navajowEte: "ffdead",
        navy: "80",
        Tdlace: "fdf5e6",
        Tive: "808000",
        TivedBb: "6b8e23",
        Sange: "ffa500",
        SangeYd: "ff4500",
        ScEd: "da70d6",
        pOegTMnPd: "eee8aa",
        pOegYF: "98fb98",
        pOeQe: "afeeee",
        pOeviTetYd: "db7093",
        papayawEp: "ffefd5",
        pHKpuff: "ffdab9",
        peru: "cd853f",
        pRk: "ffc0cb",
        plum: "dda0dd",
        powMrXe: "b0e0e6",
        purpN: "800080",
        YbeccapurpN: "663399",
        Yd: "ff0000",
        Psybrown: "bc8f8f",
        PyOXe: "4169e1",
        saddNbPwn: "8b4513",
        sOmon: "fa8072",
        sandybPwn: "f4a460",
        sHgYF: "2e8b57",
        sHshell: "fff5ee",
        siFna: "a0522d",
        silver: "c0c0c0",
        skyXe: "87ceeb",
        UXe: "6a5acd",
        UWay: "708090",
        UgYy: "708090",
        snow: "fffafa",
        sprRggYF: "ff7f",
        stAlXe: "4682b4",
        tan: "d2b48c",
        teO: "8080",
        tEstN: "d8bfd8",
        tomato: "ff6347",
        Qe: "40e0d0",
        viTet: "ee82ee",
        JHt: "f5deb3",
        wEte: "ffffff",
        wEtesmoke: "f5f5f5",
        Lw: "ffff00",
        LwgYF: "9acd32"
    };
    let Re;
    const Le = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/,
        Ie = t => t <= .0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055,
        $e = t => t <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4);

    function ze(t, e, i) {
        if (t) {
            let s = Ae(t);
            s[e] = Math.max(0, Math.min(s[e] + s[e] * i, 0 === e ? 360 : 1)), s = De(s), t.r = s[0], t.g = s[1], t.b = s[2]
        }
    }

    function Fe(t, e) {
        return t ? Object.assign(e || {}, t) : t
    }

    function We(t) {
        var e = {r: 0, g: 0, b: 0, a: 255};
        return Array.isArray(t) ? t.length >= 3 && (e = {
            r: t[0],
            g: t[1],
            b: t[2],
            a: 255
        }, t.length > 3 && (e.a = pe(t[3]))) : (e = Fe(t, {r: 0, g: 0, b: 0, a: 1})).a = pe(e.a), e
    }

    function Ve(t) {
        return "r" === t.charAt(0) ? function (t) {
            const e = Le.exec(t);
            let i, s, n, o = 255;
            if (e) {
                if (e[7] !== i) {
                    const t = +e[7];
                    o = e[8] ? ge(t) : fe(255 * t, 0, 255)
                }
                return i = +e[1], s = +e[3], n = +e[5], i = 255 & (e[2] ? ge(i) : fe(i, 0, 255)), s = 255 & (e[4] ? ge(s) : fe(s, 0, 255)), n = 255 & (e[6] ? ge(n) : fe(n, 0, 255)), {
                    r: i,
                    g: s,
                    b: n,
                    a: o
                }
            }
        }(t) : function (t) {
            const e = Me.exec(t);
            let i, s = 255;
            if (!e) return;
            e[5] !== i && (s = e[6] ? ge(+e[5]) : pe(+e[5]));
            const n = Oe(+e[2]), o = +e[3] / 100, r = +e[4] / 100;
            return i = "hwb" === e[1] ? function (t, e, i) {
                return Pe(Ce, t, e, i)
            }(n, o, r) : "hsv" === e[1] ? function (t, e, i) {
                return Pe(Se, t, e, i)
            }(n, o, r) : De(n, o, r), {r: i[0], g: i[1], b: i[2], a: s}
        }(t)
    }

    class Be {
        constructor(t) {
            if (t instanceof Be) return t;
            const e = typeof t;
            let i;
            var s, n, o;
            "object" === e ? i = We(t) : "string" === e && (o = (s = t).length, "#" === s[0] && (4 === o || 5 === o ? n = {
                r: 255 & 17 * xe[s[1]],
                g: 255 & 17 * xe[s[2]],
                b: 255 & 17 * xe[s[3]],
                a: 5 === o ? 17 * xe[s[4]] : 255
            } : 7 !== o && 9 !== o || (n = {
                r: xe[s[1]] << 4 | xe[s[2]],
                g: xe[s[3]] << 4 | xe[s[4]],
                b: xe[s[5]] << 4 | xe[s[6]],
                a: 9 === o ? xe[s[7]] << 4 | xe[s[8]] : 255
            })), i = n || function (t) {
                Re || (Re = function () {
                    const t = {}, e = Object.keys(Te), i = Object.keys(Ee);
                    let s, n, o, r, a;
                    for (s = 0; s < e.length; s++) {
                        for (r = a = e[s], n = 0; n < i.length; n++) o = i[n], a = a.replace(o, Ee[o]);
                        o = parseInt(Te[r], 16), t[a] = [o >> 16 & 255, o >> 8 & 255, 255 & o]
                    }
                    return t
                }(), Re.transparent = [0, 0, 0, 0]);
                const e = Re[t.toLowerCase()];
                return e && {r: e[0], g: e[1], b: e[2], a: 4 === e.length ? e[3] : 255}
            }(t) || Ve(t)), this._rgb = i, this._valid = !!i
        }

        get valid() {
            return this._valid
        }

        get rgb() {
            var t = Fe(this._rgb);
            return t && (t.a = me(t.a)), t
        }

        set rgb(t) {
            this._rgb = We(t)
        }

        rgbString() {
            return this._valid ? function (t) {
                return t && (t.a < 255 ? `rgba(${t.r}, ${t.g}, ${t.b}, ${me(t.a)})` : `rgb(${t.r}, ${t.g}, ${t.b})`)
            }(this._rgb) : void 0
        }

        hexString() {
            return this._valid ? function (t) {
                var e = (t => we(t.r) && we(t.g) && we(t.b) && we(t.a))(t) ? _e : ve;
                return t ? "#" + e(t.r) + e(t.g) + e(t.b) + ((t, e) => t < 255 ? e(t) : "")(t.a, e) : void 0
            }(this._rgb) : void 0
        }

        hslString() {
            return this._valid ? function (t) {
                if (!t) return;
                const e = Ae(t), i = e[0], s = be(e[1]), n = be(e[2]);
                return t.a < 255 ? `hsla(${i}, ${s}%, ${n}%, ${me(t.a)})` : `hsl(${i}, ${s}%, ${n}%)`
            }(this._rgb) : void 0
        }

        mix(t, e) {
            if (t) {
                const i = this.rgb, s = t.rgb;
                let n;
                const o = e === n ? .5 : e, r = 2 * o - 1, a = i.a - s.a,
                    l = ((r * a == -1 ? r : (r + a) / (1 + r * a)) + 1) / 2;
                n = 1 - l, i.r = 255 & l * i.r + n * s.r + .5, i.g = 255 & l * i.g + n * s.g + .5, i.b = 255 & l * i.b + n * s.b + .5, i.a = o * i.a + (1 - o) * s.a, this.rgb = i
            }
            return this
        }

        interpolate(t, e) {
            return t && (this._rgb = function (t, e, i) {
                const s = $e(me(t.r)), n = $e(me(t.g)), o = $e(me(t.b));
                return {
                    r: pe(Ie(s + i * ($e(me(e.r)) - s))),
                    g: pe(Ie(n + i * ($e(me(e.g)) - n))),
                    b: pe(Ie(o + i * ($e(me(e.b)) - o))),
                    a: t.a + i * (e.a - t.a)
                }
            }(this._rgb, t._rgb, e)), this
        }

        clone() {
            return new Be(this.rgb)
        }

        alpha(t) {
            return this._rgb.a = pe(t), this
        }

        clearer(t) {
            return this._rgb.a *= 1 - t, this
        }

        greyscale() {
            const t = this._rgb, e = ue(.3 * t.r + .59 * t.g + .11 * t.b);
            return t.r = t.g = t.b = e, this
        }

        opaquer(t) {
            return this._rgb.a *= 1 + t, this
        }

        negate() {
            const t = this._rgb;
            return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this
        }

        lighten(t) {
            return ze(this._rgb, 2, t), this
        }

        darken(t) {
            return ze(this._rgb, 2, -t), this
        }

        saturate(t) {
            return ze(this._rgb, 1, t), this
        }

        desaturate(t) {
            return ze(this._rgb, 1, -t), this
        }

        rotate(t) {
            return function (t, e) {
                var i = Ae(t);
                i[0] = Oe(i[0] + e), i = De(i), t.r = i[0], t.g = i[1], t.b = i[2]
            }(this._rgb, t), this
        }
    }

    function Ne(t) {
        return new Be(t)
    }

    function je(t) {
        if (t && "object" == typeof t) {
            const e = t.toString();
            return "[object CanvasPattern]" === e || "[object CanvasGradient]" === e
        }
        return !1
    }

    function He(t) {
        return je(t) ? t : Ne(t)
    }

    function Ue(t) {
        return je(t) ? t : Ne(t).saturate(.5).darken(.1).hexString()
    }

    const Ye = Object.create(null), Xe = Object.create(null);

    function Ge(t, e) {
        if (!e) return t;
        const i = e.split(".");
        for (let e = 0, s = i.length; e < s; ++e) {
            const s = i[e];
            t = t[s] || (t[s] = Object.create(null))
        }
        return t
    }

    function qe(t, e, i) {
        return "string" == typeof e ? At(Ge(t, e), i) : At(Ge(t, ""), e)
    }

    var Ke = new class {
        constructor(t) {
            this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = t => t.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = ["mousemove", "mouseout", "click", "touchstart", "touchmove"], this.font = {
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                size: 12,
                style: "normal",
                lineHeight: 1.2,
                weight: null
            }, this.hover = {}, this.hoverBackgroundColor = (t, e) => Ue(e.backgroundColor), this.hoverBorderColor = (t, e) => Ue(e.borderColor), this.hoverColor = (t, e) => Ue(e.color), this.indexAxis = "x", this.interaction = {
                mode: "nearest",
                intersect: !0,
                includeInvisible: !1
            }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t)
        }

        set(t, e) {
            return qe(this, t, e)
        }

        get(t) {
            return Ge(this, t)
        }

        describe(t, e) {
            return qe(Xe, t, e)
        }

        override(t, e) {
            return qe(Ye, t, e)
        }

        route(t, e, i, s) {
            const n = Ge(this, t), o = Ge(this, i), r = "_" + e;
            Object.defineProperties(n, {
                [r]: {value: n[e], writable: !0}, [e]: {
                    enumerable: !0, get() {
                        const t = this[r], e = o[s];
                        return mt(t) ? Object.assign({}, e, t) : yt(t, e)
                    }, set(t) {
                        this[r] = t
                    }
                }
            })
        }
    }({
        _scriptable: t => !t.startsWith("on"),
        _indexable: t => "events" !== t,
        hover: {_fallback: "interaction"},
        interaction: {_scriptable: !1, _indexable: !1}
    });

    function Je(t, e, i, s, n) {
        let o = e[n];
        return o || (o = e[n] = t.measureText(n).width, i.push(n)), o > s && (s = o), s
    }

    function Ze(t, e, i, s) {
        let n = (s = s || {}).data = s.data || {}, o = s.garbageCollect = s.garbageCollect || [];
        s.font !== e && (n = s.data = {}, o = s.garbageCollect = [], s.font = e), t.save(), t.font = e;
        let r = 0;
        const a = i.length;
        let l, h, c, d, u;
        for (l = 0; l < a; l++) if (d = i[l], null != d && !0 !== pt(d)) r = Je(t, n, o, r, d); else if (pt(d)) for (h = 0, c = d.length; h < c; h++) u = d[h], null == u || pt(u) || (r = Je(t, n, o, r, u));
        t.restore();
        const f = o.length / 2;
        if (f > i.length) {
            for (l = 0; l < f; l++) delete n[o[l]];
            o.splice(0, f)
        }
        return r
    }

    function Qe(t, e, i) {
        const s = t.currentDevicePixelRatio, n = 0 !== i ? Math.max(i / 2, .5) : 0;
        return Math.round((e - n) * s) / s + n
    }

    function ti(t, e) {
        (e = e || t.getContext("2d")).save(), e.resetTransform(), e.clearRect(0, 0, t.width, t.height), e.restore()
    }

    function ei(t, e, i, s) {
        let n, o, r, a, l;
        const h = e.pointStyle, c = e.rotation, d = e.radius;
        let u = (c || 0) * Nt;
        if (h && "object" == typeof h && (n = h.toString(), "[object HTMLImageElement]" === n || "[object HTMLCanvasElement]" === n)) return t.save(), t.translate(i, s), t.rotate(u), t.drawImage(h, -h.width / 2, -h.height / 2, h.width, h.height), void t.restore();
        if (!(isNaN(d) || d <= 0)) {
            switch (t.beginPath(), h) {
                default:
                    t.arc(i, s, d, 0, Wt), t.closePath();
                    break;
                case"triangle":
                    t.moveTo(i + Math.sin(u) * d, s - Math.cos(u) * d), u += Ut, t.lineTo(i + Math.sin(u) * d, s - Math.cos(u) * d), u += Ut, t.lineTo(i + Math.sin(u) * d, s - Math.cos(u) * d), t.closePath();
                    break;
                case"rectRounded":
                    l = .516 * d, a = d - l, o = Math.cos(u + Ht) * a, r = Math.sin(u + Ht) * a, t.arc(i - o, s - r, l, u - Ft, u - jt), t.arc(i + r, s - o, l, u - jt, u), t.arc(i + o, s + r, l, u, u + jt), t.arc(i - r, s + o, l, u + jt, u + Ft), t.closePath();
                    break;
                case"rect":
                    if (!c) {
                        a = Math.SQRT1_2 * d, t.rect(i - a, s - a, 2 * a, 2 * a);
                        break
                    }
                    u += Ht;
                case"rectRot":
                    o = Math.cos(u) * d, r = Math.sin(u) * d, t.moveTo(i - o, s - r), t.lineTo(i + r, s - o), t.lineTo(i + o, s + r), t.lineTo(i - r, s + o), t.closePath();
                    break;
                case"crossRot":
                    u += Ht;
                case"cross":
                    o = Math.cos(u) * d, r = Math.sin(u) * d, t.moveTo(i - o, s - r), t.lineTo(i + o, s + r), t.moveTo(i + r, s - o), t.lineTo(i - r, s + o);
                    break;
                case"star":
                    o = Math.cos(u) * d, r = Math.sin(u) * d, t.moveTo(i - o, s - r), t.lineTo(i + o, s + r), t.moveTo(i + r, s - o), t.lineTo(i - r, s + o), u += Ht, o = Math.cos(u) * d, r = Math.sin(u) * d, t.moveTo(i - o, s - r), t.lineTo(i + o, s + r), t.moveTo(i + r, s - o), t.lineTo(i - r, s + o);
                    break;
                case"line":
                    o = Math.cos(u) * d, r = Math.sin(u) * d, t.moveTo(i - o, s - r), t.lineTo(i + o, s + r);
                    break;
                case"dash":
                    t.moveTo(i, s), t.lineTo(i + Math.cos(u) * d, s + Math.sin(u) * d)
            }
            t.fill(), e.borderWidth > 0 && t.stroke()
        }
    }

    function ii(t, e, i) {
        return i = i || .5, !e || t && t.x > e.left - i && t.x < e.right + i && t.y > e.top - i && t.y < e.bottom + i
    }

    function si(t, e) {
        t.save(), t.beginPath(), t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), t.clip()
    }

    function ni(t) {
        t.restore()
    }

    function oi(t, e, i, s, n) {
        if (!e) return t.lineTo(i.x, i.y);
        if ("middle" === n) {
            const s = (e.x + i.x) / 2;
            t.lineTo(s, e.y), t.lineTo(s, i.y)
        } else "after" === n != !!s ? t.lineTo(e.x, i.y) : t.lineTo(i.x, e.y);
        t.lineTo(i.x, i.y)
    }

    function ri(t, e, i, s) {
        if (!e) return t.lineTo(i.x, i.y);
        t.bezierCurveTo(s ? e.cp1x : e.cp2x, s ? e.cp1y : e.cp2y, s ? i.cp2x : i.cp1x, s ? i.cp2y : i.cp1y, i.x, i.y)
    }

    function ai(t, e, i, s, n, o = {}) {
        const r = pt(e) ? e : [e], a = o.strokeWidth > 0 && "" !== o.strokeColor;
        let l, h;
        for (t.save(), t.font = n.string, function (t, e) {
            e.translation && t.translate(e.translation[0], e.translation[1]), gt(e.rotation) || t.rotate(e.rotation), e.color && (t.fillStyle = e.color), e.textAlign && (t.textAlign = e.textAlign), e.textBaseline && (t.textBaseline = e.textBaseline)
        }(t, o), l = 0; l < r.length; ++l) h = r[l], a && (o.strokeColor && (t.strokeStyle = o.strokeColor), gt(o.strokeWidth) || (t.lineWidth = o.strokeWidth), t.strokeText(h, i, s, o.maxWidth)), t.fillText(h, i, s, o.maxWidth), li(t, i, s, h, o), s += n.lineHeight;
        t.restore()
    }

    function li(t, e, i, s, n) {
        if (n.strikethrough || n.underline) {
            const o = t.measureText(s), r = e - o.actualBoundingBoxLeft, a = e + o.actualBoundingBoxRight,
                l = i - o.actualBoundingBoxAscent, h = i + o.actualBoundingBoxDescent,
                c = n.strikethrough ? (l + h) / 2 : h;
            t.strokeStyle = t.fillStyle, t.beginPath(), t.lineWidth = n.decorationWidth || 2, t.moveTo(r, c), t.lineTo(a, c), t.stroke()
        }
    }

    function hi(t, e) {
        const {x: i, y: s, w: n, h: o, radius: r} = e;
        t.arc(i + r.topLeft, s + r.topLeft, r.topLeft, -jt, Ft, !0), t.lineTo(i, s + o - r.bottomLeft), t.arc(i + r.bottomLeft, s + o - r.bottomLeft, r.bottomLeft, Ft, jt, !0), t.lineTo(i + n - r.bottomRight, s + o), t.arc(i + n - r.bottomRight, s + o - r.bottomRight, r.bottomRight, jt, 0, !0), t.lineTo(i + n, s + r.topRight), t.arc(i + n - r.topRight, s + r.topRight, r.topRight, 0, -jt, !0), t.lineTo(i + r.topLeft, s)
    }

    const ci = new RegExp(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/),
        di = new RegExp(/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/);

    function ui(t, e) {
        const i = ("" + t).match(ci);
        if (!i || "normal" === i[1]) return 1.2 * e;
        switch (t = +i[2], i[3]) {
            case"px":
                return t;
            case"%":
                t /= 100
        }
        return e * t
    }

    const fi = t => +t || 0;

    function gi(t, e) {
        const i = {}, s = mt(e), n = s ? Object.keys(e) : e,
            o = mt(t) ? s ? i => yt(t[i], t[e[i]]) : e => t[e] : () => t;
        for (const t of n) i[t] = fi(o(t));
        return i
    }

    function pi(t) {
        return gi(t, {top: "y", right: "x", bottom: "y", left: "x"})
    }

    function mi(t) {
        return gi(t, ["topLeft", "topRight", "bottomLeft", "bottomRight"])
    }

    function bi(t) {
        const e = pi(t);
        return e.width = e.left + e.right, e.height = e.top + e.bottom, e
    }

    function xi(t, e) {
        t = t || {}, e = e || Ke.font;
        let i = yt(t.size, e.size);
        "string" == typeof i && (i = parseInt(i, 10));
        let s = yt(t.style, e.style);
        s && !("" + s).match(di) && (console.warn('Invalid font style specified: "' + s + '"'), s = "");
        const n = {
            family: yt(t.family, e.family),
            lineHeight: ui(yt(t.lineHeight, e.lineHeight), i),
            size: i,
            style: s,
            weight: yt(t.weight, e.weight),
            string: ""
        };
        return n.string = function (t) {
            return !t || gt(t.size) || gt(t.family) ? null : (t.style ? t.style + " " : "") + (t.weight ? t.weight + " " : "") + t.size + "px " + t.family
        }(n), n
    }

    function yi(t, e, i, s) {
        let n, o, r, a = !0;
        for (n = 0, o = t.length; n < o; ++n) if (r = t[n], void 0 !== r && (void 0 !== e && "function" == typeof r && (r = r(e), a = !1), void 0 !== i && pt(r) && (r = r[i % r.length], a = !1), void 0 !== r)) return s && !a && (s.cacheable = !1), r
    }

    function _i(t, e) {
        return Object.assign(Object.create(t), e)
    }

    function vi(t, e, i) {
        i = i || (i => t[i] < e);
        let s, n = t.length - 1, o = 0;
        for (; n - o > 1;) s = o + n >> 1, i(s) ? o = s : n = s;
        return {lo: o, hi: n}
    }

    const wi = (t, e, i) => vi(t, i, (s => t[s][e] < i)), Mi = (t, e, i) => vi(t, i, (s => t[s][e] >= i)),
        ki = ["push", "pop", "shift", "splice", "unshift"];

    function Si(t, e) {
        const i = t._chartjs;
        if (!i) return;
        const s = i.listeners, n = s.indexOf(e);
        -1 !== n && s.splice(n, 1), s.length > 0 || (ki.forEach((e => {
            delete t[e]
        })), delete t._chartjs)
    }

    function Ci(t) {
        const e = new Set;
        let i, s;
        for (i = 0, s = t.length; i < s; ++i) e.add(t[i]);
        return e.size === s ? t : Array.from(e)
    }

    function Ai(t, e = [""], i = t, s, n = (() => t[0])) {
        It(s) || (s = Fi("_fallback", t));
        const o = {
            [Symbol.toStringTag]: "Object",
            _cacheable: !0,
            _scopes: t,
            _rootScopes: i,
            _fallback: s,
            _getTarget: n,
            override: n => Ai([n, ...t], e, i, s)
        };
        return new Proxy(o, {
            deleteProperty: (e, i) => (delete e[i], delete e._keys, delete t[0][i], !0),
            get: (i, s) => Ti(i, s, (() => function (t, e, i, s) {
                let n;
                for (const o of e) if (n = Fi(Oi(o, t), i), It(n)) return Ei(t, n) ? $i(i, s, t, n) : n
            }(s, e, t, i))),
            getOwnPropertyDescriptor: (t, e) => Reflect.getOwnPropertyDescriptor(t._scopes[0], e),
            getPrototypeOf: () => Reflect.getPrototypeOf(t[0]),
            has: (t, e) => Wi(t).includes(e),
            ownKeys: t => Wi(t),
            set(t, e, i) {
                const s = t._storage || (t._storage = n());
                return t[e] = s[e] = i, delete t._keys, !0
            }
        })
    }

    function Pi(t, e, i, s) {
        const n = {
            _cacheable: !1,
            _proxy: t,
            _context: e,
            _subProxy: i,
            _stack: new Set,
            _descriptors: Di(t, s),
            setContext: e => Pi(t, e, i, s),
            override: n => Pi(t.override(n), e, i, s)
        };
        return new Proxy(n, {
            deleteProperty: (e, i) => (delete e[i], delete t[i], !0),
            get: (t, e, i) => Ti(t, e, (() => function (t, e, i) {
                const {_proxy: s, _context: n, _subProxy: o, _descriptors: r} = t;
                let a = s[e];
                return $t(a) && r.isScriptable(e) && (a = function (t, e, i, s) {
                    const {_proxy: n, _context: o, _subProxy: r, _stack: a} = i;
                    if (a.has(t)) throw new Error("Recursion detected: " + Array.from(a).join("->") + "->" + t);
                    return a.add(t), e = e(o, r || s), a.delete(t), Ei(t, e) && (e = $i(n._scopes, n, t, e)), e
                }(e, a, t, i)), pt(a) && a.length && (a = function (t, e, i, s) {
                    const {_proxy: n, _context: o, _subProxy: r, _descriptors: a} = i;
                    if (It(o.index) && s(t)) e = e[o.index % e.length]; else if (mt(e[0])) {
                        const i = e, s = n._scopes.filter((t => t !== i));
                        e = [];
                        for (const l of i) {
                            const i = $i(s, n, t, l);
                            e.push(Pi(i, o, r && r[t], a))
                        }
                    }
                    return e
                }(e, a, t, r.isIndexable)), Ei(e, a) && (a = Pi(a, n, o && o[e], r)), a
            }(t, e, i))),
            getOwnPropertyDescriptor: (e, i) => e._descriptors.allKeys ? Reflect.has(t, i) ? {
                enumerable: !0,
                configurable: !0
            } : void 0 : Reflect.getOwnPropertyDescriptor(t, i),
            getPrototypeOf: () => Reflect.getPrototypeOf(t),
            has: (e, i) => Reflect.has(t, i),
            ownKeys: () => Reflect.ownKeys(t),
            set: (e, i, s) => (t[i] = s, delete e[i], !0)
        })
    }

    function Di(t, e = {scriptable: !0, indexable: !0}) {
        const {_scriptable: i = e.scriptable, _indexable: s = e.indexable, _allKeys: n = e.allKeys} = t;
        return {
            allKeys: n,
            scriptable: i,
            indexable: s,
            isScriptable: $t(i) ? i : () => i,
            isIndexable: $t(s) ? s : () => s
        }
    }

    const Oi = (t, e) => t ? t + Lt(e) : e,
        Ei = (t, e) => mt(e) && "adapters" !== t && (null === Object.getPrototypeOf(e) || e.constructor === Object);

    function Ti(t, e, i) {
        if (Object.prototype.hasOwnProperty.call(t, e)) return t[e];
        const s = i();
        return t[e] = s, s
    }

    function Ri(t, e, i) {
        return $t(t) ? t(e, i) : t
    }

    const Li = (t, e) => !0 === t ? e : "string" == typeof t ? Rt(e, t) : void 0;

    function Ii(t, e, i, s, n) {
        for (const o of e) {
            const e = Li(i, o);
            if (e) {
                t.add(e);
                const o = Ri(e._fallback, i, n);
                if (It(o) && o !== i && o !== s) return o
            } else if (!1 === e && It(s) && i !== s) return null
        }
        return !1
    }

    function $i(t, e, i, s) {
        const n = e._rootScopes, o = Ri(e._fallback, i, s), r = [...t, ...n], a = new Set;
        a.add(s);
        let l = zi(a, r, i, o || i, s);
        return null !== l && (!It(o) || o === i || (l = zi(a, r, o, l, s), null !== l)) && Ai(Array.from(a), [""], n, o, (() => function (t, e, i) {
            const s = t._getTarget();
            e in s || (s[e] = {});
            const n = s[e];
            return pt(n) && mt(i) ? i : n
        }(e, i, s)))
    }

    function zi(t, e, i, s, n) {
        for (; i;) i = Ii(t, e, i, s, n);
        return i
    }

    function Fi(t, e) {
        for (const i of e) {
            if (!i) continue;
            const e = i[t];
            if (It(e)) return e
        }
    }

    function Wi(t) {
        let e = t._keys;
        return e || (e = t._keys = function (t) {
            const e = new Set;
            for (const i of t) for (const t of Object.keys(i).filter((t => !t.startsWith("_")))) e.add(t);
            return Array.from(e)
        }(t._scopes)), e
    }

    function Vi(t, e, i, s) {
        const {iScale: n} = t, {key: o = "r"} = this._parsing, r = new Array(s);
        let a, l, h, c;
        for (a = 0, l = s; a < l; ++a) h = a + i, c = e[h], r[a] = {r: n.parse(Rt(c, o), h)};
        return r
    }

    const Bi = Number.EPSILON || 1e-14, Ni = (t, e) => e < t.length && !t[e].skip && t[e],
        ji = t => "x" === t ? "y" : "x";

    function Hi(t, e, i, s) {
        const n = t.skip ? e : t, o = e, r = i.skip ? e : i, a = ie(o, n), l = ie(r, o);
        let h = a / (a + l), c = l / (a + l);
        h = isNaN(h) ? 0 : h, c = isNaN(c) ? 0 : c;
        const d = s * h, u = s * c;
        return {
            previous: {x: o.x - d * (r.x - n.x), y: o.y - d * (r.y - n.y)},
            next: {x: o.x + u * (r.x - n.x), y: o.y + u * (r.y - n.y)}
        }
    }

    function Ui(t, e, i) {
        return Math.max(Math.min(t, i), e)
    }

    function Yi(t, e, i, s, n) {
        let o, r, a, l;
        if (e.spanGaps && (t = t.filter((t => !t.skip))), "monotone" === e.cubicInterpolationMode) !function (t, e = "x") {
            const i = ji(e), s = t.length, n = Array(s).fill(0), o = Array(s);
            let r, a, l, h = Ni(t, 0);
            for (r = 0; r < s; ++r) if (a = l, l = h, h = Ni(t, r + 1), l) {
                if (h) {
                    const t = h[e] - l[e];
                    n[r] = 0 !== t ? (h[i] - l[i]) / t : 0
                }
                o[r] = a ? h ? Xt(n[r - 1]) !== Xt(n[r]) ? 0 : (n[r - 1] + n[r]) / 2 : n[r - 1] : n[r]
            }
            !function (t, e, i) {
                const s = t.length;
                let n, o, r, a, l, h = Ni(t, 0);
                for (let c = 0; c < s - 1; ++c) l = h, h = Ni(t, c + 1), l && h && (Kt(e[c], 0, Bi) ? i[c] = i[c + 1] = 0 : (n = i[c] / e[c], o = i[c + 1] / e[c], a = Math.pow(n, 2) + Math.pow(o, 2), a <= 9 || (r = 3 / Math.sqrt(a), i[c] = n * r * e[c], i[c + 1] = o * r * e[c])))
            }(t, n, o), function (t, e, i = "x") {
                const s = ji(i), n = t.length;
                let o, r, a, l = Ni(t, 0);
                for (let h = 0; h < n; ++h) {
                    if (r = a, a = l, l = Ni(t, h + 1), !a) continue;
                    const n = a[i], c = a[s];
                    r && (o = (n - r[i]) / 3, a[`cp1${i}`] = n - o, a[`cp1${s}`] = c - o * e[h]), l && (o = (l[i] - n) / 3, a[`cp2${i}`] = n + o, a[`cp2${s}`] = c + o * e[h])
                }
            }(t, o, e)
        }(t, n); else {
            let i = s ? t[t.length - 1] : t[0];
            for (o = 0, r = t.length; o < r; ++o) a = t[o], l = Hi(i, a, t[Math.min(o + 1, r - (s ? 0 : 1)) % r], e.tension), a.cp1x = l.previous.x, a.cp1y = l.previous.y, a.cp2x = l.next.x, a.cp2y = l.next.y, i = a
        }
        e.capBezierPoints && function (t, e) {
            let i, s, n, o, r, a = ii(t[0], e);
            for (i = 0, s = t.length; i < s; ++i) r = o, o = a, a = i < s - 1 && ii(t[i + 1], e), o && (n = t[i], r && (n.cp1x = Ui(n.cp1x, e.left, e.right), n.cp1y = Ui(n.cp1y, e.top, e.bottom)), a && (n.cp2x = Ui(n.cp2x, e.left, e.right), n.cp2y = Ui(n.cp2y, e.top, e.bottom)))
        }(t, i)
    }

    function Xi() {
        return "undefined" != typeof window && "undefined" != typeof document
    }

    function Gi(t) {
        let e = t.parentNode;
        return e && "[object ShadowRoot]" === e.toString() && (e = e.host), e
    }

    function qi(t, e, i) {
        let s;
        return "string" == typeof t ? (s = parseInt(t, 10), -1 !== t.indexOf("%") && (s = s / 100 * e.parentNode[i])) : s = t, s
    }

    const Ki = t => window.getComputedStyle(t, null), Ji = ["top", "right", "bottom", "left"];

    function Zi(t, e, i) {
        const s = {};
        i = i ? "-" + i : "";
        for (let n = 0; n < 4; n++) {
            const o = Ji[n];
            s[o] = parseFloat(t[e + "-" + o + i]) || 0
        }
        return s.width = s.left + s.right, s.height = s.top + s.bottom, s
    }

    const Qi = (t, e, i) => (t > 0 || e > 0) && (!i || !i.shadowRoot);

    function ts(t, e) {
        if ("native" in t) return t;
        const {canvas: i, currentDevicePixelRatio: s} = e, n = Ki(i), o = "border-box" === n.boxSizing,
            r = Zi(n, "padding"), a = Zi(n, "border", "width"), {x: l, y: h, box: c} = function (t, e) {
                const i = t.touches, s = i && i.length ? i[0] : t, {offsetX: n, offsetY: o} = s;
                let r, a, l = !1;
                if (Qi(n, o, t.target)) r = n, a = o; else {
                    const t = e.getBoundingClientRect();
                    r = s.clientX - t.left, a = s.clientY - t.top, l = !0
                }
                return {x: r, y: a, box: l}
            }(t, i), d = r.left + (c && a.left), u = r.top + (c && a.top);
        let {width: f, height: g} = e;
        return o && (f -= r.width + a.width, g -= r.height + a.height), {
            x: Math.round((l - d) / f * i.width / s),
            y: Math.round((h - u) / g * i.height / s)
        }
    }

    const es = t => Math.round(10 * t) / 10;

    function is(t, e, i) {
        const s = e || 1, n = Math.floor(t.height * s), o = Math.floor(t.width * s);
        t.height = n / s, t.width = o / s;
        const r = t.canvas;
        return r.style && (i || !r.style.height && !r.style.width) && (r.style.height = `${t.height}px`, r.style.width = `${t.width}px`), (t.currentDevicePixelRatio !== s || r.height !== n || r.width !== o) && (t.currentDevicePixelRatio = s, r.height = n, r.width = o, t.ctx.setTransform(s, 0, 0, s, 0, 0), !0)
    }

    const ss = function () {
        let t = !1;
        try {
            const e = {
                get passive() {
                    return t = !0, !1
                }
            };
            window.addEventListener("test", null, e), window.removeEventListener("test", null, e)
        } catch (t) {
        }
        return t
    }();

    function ns(t, e) {
        const i = function (t, e) {
            return Ki(t).getPropertyValue(e)
        }(t, e), s = i && i.match(/^(\d+)(\.\d+)?px$/);
        return s ? +s[1] : void 0
    }

    function os(t, e, i, s) {
        return {x: t.x + i * (e.x - t.x), y: t.y + i * (e.y - t.y)}
    }

    function rs(t, e, i, s) {
        return {
            x: t.x + i * (e.x - t.x),
            y: "middle" === s ? i < .5 ? t.y : e.y : "after" === s ? i < 1 ? t.y : e.y : i > 0 ? e.y : t.y
        }
    }

    function as(t, e, i, s) {
        const n = {x: t.cp2x, y: t.cp2y}, o = {x: e.cp1x, y: e.cp1y}, r = os(t, n, i), a = os(n, o, i), l = os(o, e, i),
            h = os(r, a, i), c = os(a, l, i);
        return os(h, c, i)
    }

    const ls = new Map;

    function hs(t, e, i) {
        return function (t, e) {
            e = e || {};
            const i = t + JSON.stringify(e);
            let s = ls.get(i);
            return s || (s = new Intl.NumberFormat(t, e), ls.set(i, s)), s
        }(e, i).format(t)
    }

    function cs(t, e, i) {
        return t ? function (t, e) {
            return {
                x: i => t + t + e - i,
                setWidth(t) {
                    e = t
                },
                textAlign: t => "center" === t ? t : "right" === t ? "left" : "right",
                xPlus: (t, e) => t - e,
                leftForLtr: (t, e) => t - e
            }
        }(e, i) : {
            x: t => t, setWidth(t) {
            }, textAlign: t => t, xPlus: (t, e) => t + e, leftForLtr: (t, e) => t
        }
    }

    function ds(t, e) {
        let i, s;
        "ltr" !== e && "rtl" !== e || (i = t.canvas.style, s = [i.getPropertyValue("direction"), i.getPropertyPriority("direction")], i.setProperty("direction", e, "important"), t.prevTextDirection = s)
    }

    function us(t, e) {
        void 0 !== e && (delete t.prevTextDirection, t.canvas.style.setProperty("direction", e[0], e[1]))
    }

    function fs(t) {
        return "angle" === t ? {between: oe, compare: se, normalize: ne} : {
            between: ae,
            compare: (t, e) => t - e,
            normalize: t => t
        }
    }

    function gs({start: t, end: e, count: i, loop: s, style: n}) {
        return {start: t % i, end: e % i, loop: s && (e - t + 1) % i == 0, style: n}
    }

    function ps(t, e, i) {
        if (!i) return [t];
        const {property: s, start: n, end: o} = i, r = e.length, {
            compare: a,
            between: l,
            normalize: h
        } = fs(s), {start: c, end: d, loop: u, style: f} = function (t, e, i) {
            const {property: s, start: n, end: o} = i, {between: r, normalize: a} = fs(s), l = e.length;
            let h, c, {start: d, end: u, loop: f} = t;
            if (f) {
                for (d += l, u += l, h = 0, c = l; h < c && r(a(e[d % l][s]), n, o); ++h) d--, u--;
                d %= l, u %= l
            }
            return u < d && (u += l), {start: d, end: u, loop: f, style: t.style}
        }(t, e, i), g = [];
        let p, m, b, x = !1, y = null;
        for (let t = c, i = c; t <= d; ++t) m = e[t % r], m.skip || (p = h(m[s]), p !== b && (x = l(p, n, o), null === y && (x || l(n, b, p) && 0 !== a(n, b)) && (y = 0 === a(p, n) ? t : i), null !== y && (!x || 0 === a(o, p) || l(o, b, p)) && (g.push(gs({
            start: y,
            end: t,
            loop: u,
            count: r,
            style: f
        })), y = null), i = t, b = p));
        return null !== y && g.push(gs({start: y, end: d, loop: u, count: r, style: f})), g
    }

    function ms(t, e) {
        const i = [], s = t.segments;
        for (let n = 0; n < s.length; n++) {
            const o = ps(s[n], t.points, e);
            o.length && i.push(...o)
        }
        return i
    }

    function bs(t) {
        return {
            backgroundColor: t.backgroundColor,
            borderCapStyle: t.borderCapStyle,
            borderDash: t.borderDash,
            borderDashOffset: t.borderDashOffset,
            borderJoinStyle: t.borderJoinStyle,
            borderWidth: t.borderWidth,
            borderColor: t.borderColor
        }
    }

    function xs(t, e) {
        return e && JSON.stringify(t) !== JSON.stringify(e)
    }

    var ys = new class {
        constructor() {
            this._request = null, this._charts = new Map, this._running = !1, this._lastDate = void 0
        }

        _notify(t, e, i, s) {
            const n = e.listeners[s], o = e.duration;
            n.forEach((s => s({chart: t, initial: e.initial, numSteps: o, currentStep: Math.min(i - e.start, o)})))
        }

        _refresh() {
            this._request || (this._running = !0, this._request = lt.call(window, (() => {
                this._update(), this._request = null, this._running && this._refresh()
            })))
        }

        _update(t = Date.now()) {
            let e = 0;
            this._charts.forEach(((i, s) => {
                if (!i.running || !i.items.length) return;
                const n = i.items;
                let o, r = n.length - 1, a = !1;
                for (; r >= 0; --r) o = n[r], o._active ? (o._total > i.duration && (i.duration = o._total), o.tick(t), a = !0) : (n[r] = n[n.length - 1], n.pop());
                a && (s.draw(), this._notify(s, i, t, "progress")), n.length || (i.running = !1, this._notify(s, i, t, "complete"), i.initial = !1), e += n.length
            })), this._lastDate = t, 0 === e && (this._running = !1)
        }

        _getAnims(t) {
            const e = this._charts;
            let i = e.get(t);
            return i || (i = {
                running: !1,
                initial: !0,
                items: [],
                listeners: {complete: [], progress: []}
            }, e.set(t, i)), i
        }

        listen(t, e, i) {
            this._getAnims(t).listeners[e].push(i)
        }

        add(t, e) {
            e && e.length && this._getAnims(t).items.push(...e)
        }

        has(t) {
            return this._getAnims(t).items.length > 0
        }

        start(t) {
            const e = this._charts.get(t);
            e && (e.running = !0, e.start = Date.now(), e.duration = e.items.reduce(((t, e) => Math.max(t, e._duration)), 0), this._refresh())
        }

        running(t) {
            if (!this._running) return !1;
            const e = this._charts.get(t);
            return !!(e && e.running && e.items.length)
        }

        stop(t) {
            const e = this._charts.get(t);
            if (!e || !e.items.length) return;
            const i = e.items;
            let s = i.length - 1;
            for (; s >= 0; --s) i[s].cancel();
            e.items = [], this._notify(t, e, Date.now(), "complete")
        }

        remove(t) {
            return this._charts.delete(t)
        }
    };
    const _s = "transparent", vs = {
        boolean: (t, e, i) => i > .5 ? e : t, color(t, e, i) {
            const s = He(t || _s), n = s.valid && He(e || _s);
            return n && n.valid ? n.mix(s, i).hexString() : e
        }, number: (t, e, i) => t + (e - t) * i
    };

    class ws {
        constructor(t, e, i, s) {
            const n = e[i];
            s = yi([t.to, s, n, t.from]);
            const o = yi([t.from, n, s]);
            this._active = !0, this._fn = t.fn || vs[t.type || typeof o], this._easing = de[t.easing] || de.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = e, this._prop = i, this._from = o, this._to = s, this._promises = void 0
        }

        active() {
            return this._active
        }

        update(t, e, i) {
            if (this._active) {
                this._notify(!1);
                const s = this._target[this._prop], n = i - this._start, o = this._duration - n;
                this._start = i, this._duration = Math.floor(Math.max(o, t.duration)), this._total += n, this._loop = !!t.loop, this._to = yi([t.to, e, s, t.from]), this._from = yi([t.from, s, e])
            }
        }

        cancel() {
            this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1))
        }

        tick(t) {
            const e = t - this._start, i = this._duration, s = this._prop, n = this._from, o = this._loop, r = this._to;
            let a;
            if (this._active = n !== r && (o || e < i), !this._active) return this._target[s] = r, void this._notify(!0);
            e < 0 ? this._target[s] = n : (a = e / i % 2, a = o && a > 1 ? 2 - a : a, a = this._easing(Math.min(1, Math.max(0, a))), this._target[s] = this._fn(n, r, a))
        }

        wait() {
            const t = this._promises || (this._promises = []);
            return new Promise(((e, i) => {
                t.push({res: e, rej: i})
            }))
        }

        _notify(t) {
            const e = t ? "res" : "rej", i = this._promises || [];
            for (let t = 0; t < i.length; t++) i[t][e]()
        }
    }

    Ke.set("animation", {
        delay: void 0,
        duration: 1e3,
        easing: "easeOutQuart",
        fn: void 0,
        from: void 0,
        loop: void 0,
        to: void 0,
        type: void 0
    });
    const Ms = Object.keys(Ke.animation);
    Ke.describe("animation", {
        _fallback: !1,
        _indexable: !1,
        _scriptable: t => "onProgress" !== t && "onComplete" !== t && "fn" !== t
    }), Ke.set("animations", {
        colors: {type: "color", properties: ["color", "borderColor", "backgroundColor"]},
        numbers: {type: "number", properties: ["x", "y", "borderWidth", "radius", "tension"]}
    }), Ke.describe("animations", {_fallback: "animation"}), Ke.set("transitions", {
        active: {animation: {duration: 400}},
        resize: {animation: {duration: 0}},
        show: {animations: {colors: {from: "transparent"}, visible: {type: "boolean", duration: 0}}},
        hide: {animations: {colors: {to: "transparent"}, visible: {type: "boolean", easing: "linear", fn: t => 0 | t}}}
    });

    class ks {
        constructor(t, e) {
            this._chart = t, this._properties = new Map, this.configure(e)
        }

        configure(t) {
            if (!mt(t)) return;
            const e = this._properties;
            Object.getOwnPropertyNames(t).forEach((i => {
                const s = t[i];
                if (!mt(s)) return;
                const n = {};
                for (const t of Ms) n[t] = s[t];
                (pt(s.properties) && s.properties || [i]).forEach((t => {
                    t !== i && e.has(t) || e.set(t, n)
                }))
            }))
        }

        _animateOptions(t, e) {
            const i = e.options, s = function (t, e) {
                if (!e) return;
                let i = t.options;
                if (i) return i.$shared && (t.options = i = Object.assign({}, i, {$shared: !1, $animations: {}})), i;
                t.options = e
            }(t, i);
            if (!s) return [];
            const n = this._createAnimations(s, i);
            return i.$shared && function (t, e) {
                const i = [], s = Object.keys(e);
                for (let e = 0; e < s.length; e++) {
                    const n = t[s[e]];
                    n && n.active() && i.push(n.wait())
                }
                return Promise.all(i)
            }(t.options.$animations, i).then((() => {
                t.options = i
            }), (() => {
            })), n
        }

        _createAnimations(t, e) {
            const i = this._properties, s = [], n = t.$animations || (t.$animations = {}), o = Object.keys(e),
                r = Date.now();
            let a;
            for (a = o.length - 1; a >= 0; --a) {
                const l = o[a];
                if ("$" === l.charAt(0)) continue;
                if ("options" === l) {
                    s.push(...this._animateOptions(t, e));
                    continue
                }
                const h = e[l];
                let c = n[l];
                const d = i.get(l);
                if (c) {
                    if (d && c.active()) {
                        c.update(d, h, r);
                        continue
                    }
                    c.cancel()
                }
                d && d.duration ? (n[l] = c = new ws(d, t, l, h), s.push(c)) : t[l] = h
            }
            return s
        }

        update(t, e) {
            if (0 === this._properties.size) return void Object.assign(t, e);
            const i = this._createAnimations(t, e);
            return i.length ? (ys.add(this._chart, i), !0) : void 0
        }
    }

    function Ss(t, e) {
        const i = t && t.options || {}, s = i.reverse, n = void 0 === i.min ? e : 0, o = void 0 === i.max ? e : 0;
        return {start: s ? o : n, end: s ? n : o}
    }

    function Cs(t, e) {
        const i = [], s = t._getSortedDatasetMetas(e);
        let n, o;
        for (n = 0, o = s.length; n < o; ++n) i.push(s[n].index);
        return i
    }

    function As(t, e, i, s = {}) {
        const n = t.keys, o = "single" === s.mode;
        let r, a, l, h;
        if (null !== e) {
            for (r = 0, a = n.length; r < a; ++r) {
                if (l = +n[r], l === i) {
                    if (s.all) continue;
                    break
                }
                h = t.values[l], bt(h) && (o || 0 === e || Xt(e) === Xt(h)) && (e += h)
            }
            return e
        }
    }

    function Ps(t, e) {
        const i = t && t.options.stacked;
        return i || void 0 === i && void 0 !== e.stack
    }

    function Ds(t, e, i) {
        const s = t[e] || (t[e] = {});
        return s[i] || (s[i] = {})
    }

    function Os(t, e, i, s) {
        for (const n of e.getMatchingVisibleMetas(s).reverse()) {
            const e = t[n.index];
            if (i && e > 0 || !i && e < 0) return n.index
        }
        return null
    }

    function Es(t, e) {
        const {chart: i, _cachedMeta: s} = t, n = i._stacks || (i._stacks = {}), {iScale: o, vScale: r, index: a} = s,
            l = o.axis, h = r.axis, c = function (t, e, i) {
                return `${t.id}.${e.id}.${i.stack || i.type}`
            }(o, r, s), d = e.length;
        let u;
        for (let t = 0; t < d; ++t) {
            const i = e[t], {[l]: o, [h]: d} = i;
            u = (i._stacks || (i._stacks = {}))[h] = Ds(n, c, o), u[a] = d, u._top = Os(u, r, !0, s.type), u._bottom = Os(u, r, !1, s.type)
        }
    }

    function Ts(t, e) {
        const i = t.scales;
        return Object.keys(i).filter((t => i[t].axis === e)).shift()
    }

    function Rs(t, e) {
        const i = t.controller.index, s = t.vScale && t.vScale.axis;
        if (s) {
            e = e || t._parsed;
            for (const t of e) {
                const e = t._stacks;
                if (!e || void 0 === e[s] || void 0 === e[s][i]) return;
                delete e[s][i]
            }
        }
    }

    const Ls = t => "reset" === t || "none" === t, Is = (t, e) => e ? t : Object.assign({}, t);

    class $s {
        constructor(t, e) {
            this.chart = t, this._ctx = t.ctx, this.index = e, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.initialize()
        }

        initialize() {
            const t = this._cachedMeta;
            this.configure(), this.linkScales(), t._stacked = Ps(t.vScale, t), this.addElements()
        }

        updateIndex(t) {
            this.index !== t && Rs(this._cachedMeta), this.index = t
        }

        linkScales() {
            const t = this.chart, e = this._cachedMeta, i = this.getDataset(),
                s = (t, e, i, s) => "x" === t ? e : "r" === t ? s : i, n = e.xAxisID = yt(i.xAxisID, Ts(t, "x")),
                o = e.yAxisID = yt(i.yAxisID, Ts(t, "y")), r = e.rAxisID = yt(i.rAxisID, Ts(t, "r")), a = e.indexAxis,
                l = e.iAxisID = s(a, n, o, r), h = e.vAxisID = s(a, o, n, r);
            e.xScale = this.getScaleForId(n), e.yScale = this.getScaleForId(o), e.rScale = this.getScaleForId(r), e.iScale = this.getScaleForId(l), e.vScale = this.getScaleForId(h)
        }

        getDataset() {
            return this.chart.data.datasets[this.index]
        }

        getMeta() {
            return this.chart.getDatasetMeta(this.index)
        }

        getScaleForId(t) {
            return this.chart.scales[t]
        }

        _getOtherScale(t) {
            const e = this._cachedMeta;
            return t === e.iScale ? e.vScale : e.iScale
        }

        reset() {
            this._update("reset")
        }

        _destroy() {
            const t = this._cachedMeta;
            this._data && Si(this._data, this), t._stacked && Rs(t)
        }

        _dataCheck() {
            const t = this.getDataset(), e = t.data || (t.data = []), i = this._data;
            if (mt(e)) this._data = function (t) {
                const e = Object.keys(t), i = new Array(e.length);
                let s, n, o;
                for (s = 0, n = e.length; s < n; ++s) o = e[s], i[s] = {x: o, y: t[o]};
                return i
            }(e); else if (i !== e) {
                if (i) {
                    Si(i, this);
                    const t = this._cachedMeta;
                    Rs(t), t._parsed = []
                }
                e && Object.isExtensible(e) && (this, (s = e)._chartjs ? s._chartjs.listeners.push(this) : (Object.defineProperty(s, "_chartjs", {
                    configurable: !0,
                    enumerable: !1,
                    value: {listeners: [this]}
                }), ki.forEach((t => {
                    const e = "_onData" + Lt(t), i = s[t];
                    Object.defineProperty(s, t, {
                        configurable: !0, enumerable: !1, value(...t) {
                            const n = i.apply(this, t);
                            return s._chartjs.listeners.forEach((i => {
                                "function" == typeof i[e] && i[e](...t)
                            })), n
                        }
                    })
                })))), this._syncList = [], this._data = e
            }
            var s
        }

        addElements() {
            const t = this._cachedMeta;
            this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType)
        }

        buildOrUpdateElements(t) {
            const e = this._cachedMeta, i = this.getDataset();
            let s = !1;
            this._dataCheck();
            const n = e._stacked;
            e._stacked = Ps(e.vScale, e), e.stack !== i.stack && (s = !0, Rs(e), e.stack = i.stack), this._resyncElements(t), (s || n !== e._stacked) && Es(this, e._parsed)
        }

        configure() {
            const t = this.chart.config, e = t.datasetScopeKeys(this._type),
                i = t.getOptionScopes(this.getDataset(), e, !0);
            this.options = t.createResolver(i, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {}
        }

        parse(t, e) {
            const {_cachedMeta: i, _data: s} = this, {iScale: n, _stacked: o} = i, r = n.axis;
            let a, l, h, c = 0 === t && e === s.length || i._sorted, d = t > 0 && i._parsed[t - 1];
            if (!1 === this._parsing) i._parsed = s, i._sorted = !0, h = s; else {
                h = pt(s[t]) ? this.parseArrayData(i, s, t, e) : mt(s[t]) ? this.parseObjectData(i, s, t, e) : this.parsePrimitiveData(i, s, t, e);
                const n = () => null === l[r] || d && l[r] < d[r];
                for (a = 0; a < e; ++a) i._parsed[a + t] = l = h[a], c && (n() && (c = !1), d = l);
                i._sorted = c
            }
            o && Es(this, h)
        }

        parsePrimitiveData(t, e, i, s) {
            const {iScale: n, vScale: o} = t, r = n.axis, a = o.axis, l = n.getLabels(), h = n === o, c = new Array(s);
            let d, u, f;
            for (d = 0, u = s; d < u; ++d) f = d + i, c[d] = {[r]: h || n.parse(l[f], f), [a]: o.parse(e[f], f)};
            return c
        }

        parseArrayData(t, e, i, s) {
            const {xScale: n, yScale: o} = t, r = new Array(s);
            let a, l, h, c;
            for (a = 0, l = s; a < l; ++a) h = a + i, c = e[h], r[a] = {x: n.parse(c[0], h), y: o.parse(c[1], h)};
            return r
        }

        parseObjectData(t, e, i, s) {
            const {xScale: n, yScale: o} = t, {xAxisKey: r = "x", yAxisKey: a = "y"} = this._parsing, l = new Array(s);
            let h, c, d, u;
            for (h = 0, c = s; h < c; ++h) d = h + i, u = e[d], l[h] = {
                x: n.parse(Rt(u, r), d),
                y: o.parse(Rt(u, a), d)
            };
            return l
        }

        getParsed(t) {
            return this._cachedMeta._parsed[t]
        }

        getDataElement(t) {
            return this._cachedMeta.data[t]
        }

        applyStack(t, e, i) {
            const s = this.chart, n = this._cachedMeta, o = e[t.axis];
            return As({keys: Cs(s, !0), values: e._stacks[t.axis]}, o, n.index, {mode: i})
        }

        updateRangeFromParsed(t, e, i, s) {
            const n = i[e.axis];
            let o = null === n ? NaN : n;
            const r = s && i._stacks[e.axis];
            s && r && (s.values = r, o = As(s, n, this._cachedMeta.index)), t.min = Math.min(t.min, o), t.max = Math.max(t.max, o)
        }

        getMinMax(t, e) {
            const i = this._cachedMeta, s = i._parsed, n = i._sorted && t === i.iScale, o = s.length,
                r = this._getOtherScale(t),
                a = ((t, e, i) => t && !e.hidden && e._stacked && {keys: Cs(i, !0), values: null})(e, i, this.chart),
                l = {min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY}, {min: h, max: c} = function (t) {
                    const {min: e, max: i, minDefined: s, maxDefined: n} = t.getUserBounds();
                    return {min: s ? e : Number.NEGATIVE_INFINITY, max: n ? i : Number.POSITIVE_INFINITY}
                }(r);
            let d, u;

            function f() {
                u = s[d];
                const e = u[r.axis];
                return !bt(u[t.axis]) || h > e || c < e
            }

            for (d = 0; d < o && (f() || (this.updateRangeFromParsed(l, t, u, a), !n)); ++d) ;
            if (n) for (d = o - 1; d >= 0; --d) if (!f()) {
                this.updateRangeFromParsed(l, t, u, a);
                break
            }
            return l
        }

        getAllParsedValues(t) {
            const e = this._cachedMeta._parsed, i = [];
            let s, n, o;
            for (s = 0, n = e.length; s < n; ++s) o = e[s][t.axis], bt(o) && i.push(o);
            return i
        }

        getMaxOverflow() {
            return !1
        }

        getLabelAndValue(t) {
            const e = this._cachedMeta, i = e.iScale, s = e.vScale, n = this.getParsed(t);
            return {
                label: i ? "" + i.getLabelForValue(n[i.axis]) : "",
                value: s ? "" + s.getLabelForValue(n[s.axis]) : ""
            }
        }

        _update(t) {
            const e = this._cachedMeta;
            this.update(t || "default"), e._clip = function (t) {
                let e, i, s, n;
                return mt(t) ? (e = t.top, i = t.right, s = t.bottom, n = t.left) : e = i = s = n = t, {
                    top: e,
                    right: i,
                    bottom: s,
                    left: n,
                    disabled: !1 === t
                }
            }(yt(this.options.clip, function (t, e, i) {
                if (!1 === i) return !1;
                const s = Ss(t, i), n = Ss(e, i);
                return {top: n.end, right: s.end, bottom: n.start, left: s.start}
            }(e.xScale, e.yScale, this.getMaxOverflow())))
        }

        update(t) {
        }

        draw() {
            const t = this._ctx, e = this.chart, i = this._cachedMeta, s = i.data || [], n = e.chartArea, o = [],
                r = this._drawStart || 0, a = this._drawCount || s.length - r, l = this.options.drawActiveElementsOnTop;
            let h;
            for (i.dataset && i.dataset.draw(t, n, r, a), h = r; h < r + a; ++h) {
                const e = s[h];
                e.hidden || (e.active && l ? o.push(e) : e.draw(t, n))
            }
            for (h = 0; h < o.length; ++h) o[h].draw(t, n)
        }

        getStyle(t, e) {
            const i = e ? "active" : "default";
            return void 0 === t && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(i) : this.resolveDataElementOptions(t || 0, i)
        }

        getContext(t, e, i) {
            const s = this.getDataset();
            let n;
            if (t >= 0 && t < this._cachedMeta.data.length) {
                const e = this._cachedMeta.data[t];
                n = e.$context || (e.$context = function (t, e, i) {
                    return _i(t, {
                        active: !1,
                        dataIndex: e,
                        parsed: void 0,
                        raw: void 0,
                        element: i,
                        index: e,
                        mode: "default",
                        type: "data"
                    })
                }(this.getContext(), t, e)), n.parsed = this.getParsed(t), n.raw = s.data[t], n.index = n.dataIndex = t
            } else n = this.$context || (this.$context = function (t, e) {
                return _i(t, {active: !1, dataset: void 0, datasetIndex: e, index: e, mode: "default", type: "dataset"})
            }(this.chart.getContext(), this.index)), n.dataset = s, n.index = n.datasetIndex = this.index;
            return n.active = !!e, n.mode = i, n
        }

        resolveDatasetElementOptions(t) {
            return this._resolveElementOptions(this.datasetElementType.id, t)
        }

        resolveDataElementOptions(t, e) {
            return this._resolveElementOptions(this.dataElementType.id, e, t)
        }

        _resolveElementOptions(t, e = "default", i) {
            const s = "active" === e, n = this._cachedDataOpts, o = t + "-" + e, r = n[o],
                a = this.enableOptionSharing && It(i);
            if (r) return Is(r, a);
            const l = this.chart.config, h = l.datasetElementScopeKeys(this._type, t),
                c = s ? [`${t}Hover`, "hover", t, ""] : [t, ""], d = l.getOptionScopes(this.getDataset(), h),
                u = Object.keys(Ke.elements[t]), f = l.resolveNamedOptions(d, u, (() => this.getContext(i, s)), c);
            return f.$shared && (f.$shared = a, n[o] = Object.freeze(Is(f, a))), f
        }

        _resolveAnimations(t, e, i) {
            const s = this.chart, n = this._cachedDataOpts, o = `animation-${e}`, r = n[o];
            if (r) return r;
            let a;
            if (!1 !== s.options.animation) {
                const s = this.chart.config, n = s.datasetAnimationScopeKeys(this._type, e),
                    o = s.getOptionScopes(this.getDataset(), n);
                a = s.createResolver(o, this.getContext(t, i, e))
            }
            const l = new ks(s, a && a.animations);
            return a && a._cacheable && (n[o] = Object.freeze(l)), l
        }

        getSharedOptions(t) {
            if (t.$shared) return this._sharedOptions || (this._sharedOptions = Object.assign({}, t))
        }

        includeOptions(t, e) {
            return !e || Ls(t) || this.chart._animationsDisabled
        }

        updateElement(t, e, i, s) {
            Ls(s) ? Object.assign(t, i) : this._resolveAnimations(e, s).update(t, i)
        }

        updateSharedOptions(t, e, i) {
            t && !Ls(e) && this._resolveAnimations(void 0, e).update(t, i)
        }

        _setStyle(t, e, i, s) {
            t.active = s;
            const n = this.getStyle(e, s);
            this._resolveAnimations(e, i, s).update(t, {options: !s && this.getSharedOptions(n) || n})
        }

        removeHoverStyle(t, e, i) {
            this._setStyle(t, i, "active", !1)
        }

        setHoverStyle(t, e, i) {
            this._setStyle(t, i, "active", !0)
        }

        _removeDatasetHoverStyle() {
            const t = this._cachedMeta.dataset;
            t && this._setStyle(t, void 0, "active", !1)
        }

        _setDatasetHoverStyle() {
            const t = this._cachedMeta.dataset;
            t && this._setStyle(t, void 0, "active", !0)
        }

        _resyncElements(t) {
            const e = this._data, i = this._cachedMeta.data;
            for (const [t, e, i] of this._syncList) this[t](e, i);
            this._syncList = [];
            const s = i.length, n = e.length, o = Math.min(n, s);
            o && this.parse(0, o), n > s ? this._insertElements(s, n - s, t) : n < s && this._removeElements(n, s - n)
        }

        _insertElements(t, e, i = !0) {
            const s = this._cachedMeta, n = s.data, o = t + e;
            let r;
            const a = t => {
                for (t.length += e, r = t.length - 1; r >= o; r--) t[r] = t[r - e]
            };
            for (a(n), r = t; r < o; ++r) n[r] = new this.dataElementType;
            this._parsing && a(s._parsed), this.parse(t, e), i && this.updateElements(n, t, e, "reset")
        }

        updateElements(t, e, i, s) {
        }

        _removeElements(t, e) {
            const i = this._cachedMeta;
            if (this._parsing) {
                const s = i._parsed.splice(t, e);
                i._stacked && Rs(i, s)
            }
            i.data.splice(t, e)
        }

        _sync(t) {
            if (this._parsing) this._syncList.push(t); else {
                const [e, i, s] = t;
                this[e](i, s)
            }
            this.chart._dataChanges.push([this.index, ...t])
        }

        _onDataPush() {
            const t = arguments.length;
            this._sync(["_insertElements", this.getDataset().data.length - t, t])
        }

        _onDataPop() {
            this._sync(["_removeElements", this._cachedMeta.data.length - 1, 1])
        }

        _onDataShift() {
            this._sync(["_removeElements", 0, 1])
        }

        _onDataSplice(t, e) {
            e && this._sync(["_removeElements", t, e]);
            const i = arguments.length - 2;
            i && this._sync(["_insertElements", t, i])
        }

        _onDataUnshift() {
            this._sync(["_insertElements", 0, arguments.length])
        }
    }

    function zs(t) {
        const e = t.iScale, i = function (t, e) {
            if (!t._cache.$bar) {
                const i = t.getMatchingVisibleMetas(e);
                let s = [];
                for (let e = 0, n = i.length; e < n; e++) s = s.concat(i[e].controller.getAllParsedValues(t));
                t._cache.$bar = Ci(s.sort(((t, e) => t - e)))
            }
            return t._cache.$bar
        }(e, t.type);
        let s, n, o, r, a = e._length;
        const l = () => {
            32767 !== o && -32768 !== o && (It(r) && (a = Math.min(a, Math.abs(o - r) || a)), r = o)
        };
        for (s = 0, n = i.length; s < n; ++s) o = e.getPixelForValue(i[s]), l();
        for (r = void 0, s = 0, n = e.ticks.length; s < n; ++s) o = e.getPixelForTick(s), l();
        return a
    }

    function Fs(t, e, i, s) {
        return pt(t) ? function (t, e, i, s) {
            const n = i.parse(t[0], s), o = i.parse(t[1], s), r = Math.min(n, o), a = Math.max(n, o);
            let l = r, h = a;
            Math.abs(r) > Math.abs(a) && (l = a, h = r), e[i.axis] = h, e._custom = {
                barStart: l,
                barEnd: h,
                start: n,
                end: o,
                min: r,
                max: a
            }
        }(t, e, i, s) : e[i.axis] = i.parse(t, s), e
    }

    function Ws(t, e, i, s) {
        const n = t.iScale, o = t.vScale, r = n.getLabels(), a = n === o, l = [];
        let h, c, d, u;
        for (h = i, c = i + s; h < c; ++h) u = e[h], d = {}, d[n.axis] = a || n.parse(r[h], h), l.push(Fs(u, d, o, h));
        return l
    }

    function Vs(t) {
        return t && void 0 !== t.barStart && void 0 !== t.barEnd
    }

    function Bs(t, e, i, s) {
        let n = e.borderSkipped;
        const o = {};
        if (!n) return void (t.borderSkipped = o);
        const {start: r, end: a, reverse: l, top: h, bottom: c} = function (t) {
            let e, i, s, n, o;
            return t.horizontal ? (e = t.base > t.x, i = "left", s = "right") : (e = t.base < t.y, i = "bottom", s = "top"), e ? (n = "end", o = "start") : (n = "start", o = "end"), {
                start: i,
                end: s,
                reverse: e,
                top: n,
                bottom: o
            }
        }(t);
        "middle" === n && i && (t.enableBorderRadius = !0, (i._top || 0) === s ? n = h : (i._bottom || 0) === s ? n = c : (o[Ns(c, r, a, l)] = !0, n = h)), o[Ns(n, r, a, l)] = !0, t.borderSkipped = o
    }

    function Ns(t, e, i, s) {
        var n, o, r;
        return s ? (r = i, t = js(t = (n = t) === (o = e) ? r : n === r ? o : n, i, e)) : t = js(t, e, i), t
    }

    function js(t, e, i) {
        return "start" === t ? e : "end" === t ? i : t
    }

    function Hs(t, {inflateAmount: e}, i) {
        t.inflateAmount = "auto" === e ? 1 === i ? .33 : 0 : e
    }

    $s.defaults = {}, $s.prototype.datasetElementType = null, $s.prototype.dataElementType = null;

    class Us extends $s {
        parsePrimitiveData(t, e, i, s) {
            return Ws(t, e, i, s)
        }

        parseArrayData(t, e, i, s) {
            return Ws(t, e, i, s)
        }

        parseObjectData(t, e, i, s) {
            const {iScale: n, vScale: o} = t, {xAxisKey: r = "x", yAxisKey: a = "y"} = this._parsing,
                l = "x" === n.axis ? r : a, h = "x" === o.axis ? r : a, c = [];
            let d, u, f, g;
            for (d = i, u = i + s; d < u; ++d) g = e[d], f = {}, f[n.axis] = n.parse(Rt(g, l), d), c.push(Fs(Rt(g, h), f, o, d));
            return c
        }

        updateRangeFromParsed(t, e, i, s) {
            super.updateRangeFromParsed(t, e, i, s);
            const n = i._custom;
            n && e === this._cachedMeta.vScale && (t.min = Math.min(t.min, n.min), t.max = Math.max(t.max, n.max))
        }

        getMaxOverflow() {
            return 0
        }

        getLabelAndValue(t) {
            const e = this._cachedMeta, {iScale: i, vScale: s} = e, n = this.getParsed(t), o = n._custom,
                r = Vs(o) ? "[" + o.start + ", " + o.end + "]" : "" + s.getLabelForValue(n[s.axis]);
            return {label: "" + i.getLabelForValue(n[i.axis]), value: r}
        }

        initialize() {
            this.enableOptionSharing = !0, super.initialize(), this._cachedMeta.stack = this.getDataset().stack
        }

        update(t) {
            const e = this._cachedMeta;
            this.updateElements(e.data, 0, e.data.length, t)
        }

        updateElements(t, e, i, s) {
            const n = "reset" === s, {index: o, _cachedMeta: {vScale: r}} = this, a = r.getBasePixel(),
                l = r.isHorizontal(), h = this._getRuler(), c = this.resolveDataElementOptions(e, s),
                d = this.getSharedOptions(c), u = this.includeOptions(s, d);
            this.updateSharedOptions(d, s, c);
            for (let c = e; c < e + i; c++) {
                const e = this.getParsed(c),
                    i = n || gt(e[r.axis]) ? {base: a, head: a} : this._calculateBarValuePixels(c),
                    f = this._calculateBarIndexPixels(c, h), g = (e._stacks || {})[r.axis], p = {
                        horizontal: l,
                        base: i.base,
                        enableBorderRadius: !g || Vs(e._custom) || o === g._top || o === g._bottom,
                        x: l ? i.head : f.center,
                        y: l ? f.center : i.head,
                        height: l ? f.size : Math.abs(i.size),
                        width: l ? Math.abs(i.size) : f.size
                    };
                u && (p.options = d || this.resolveDataElementOptions(c, t[c].active ? "active" : s));
                const m = p.options || t[c].options;
                Bs(p, m, g, o), Hs(p, m, h.ratio), this.updateElement(t[c], c, p, s)
            }
        }

        _getStacks(t, e) {
            const i = this._cachedMeta.iScale, s = i.getMatchingVisibleMetas(this._type), n = i.options.stacked,
                o = s.length, r = [];
            let a, l;
            for (a = 0; a < o; ++a) if (l = s[a], l.controller.options.grouped) {
                if (void 0 !== e) {
                    const t = l.controller.getParsed(e)[l.controller._cachedMeta.vScale.axis];
                    if (gt(t) || isNaN(t)) continue
                }
                if ((!1 === n || -1 === r.indexOf(l.stack) || void 0 === n && void 0 === l.stack) && r.push(l.stack), l.index === t) break
            }
            return r.length || r.push(void 0), r
        }

        _getStackCount(t) {
            return this._getStacks(void 0, t).length
        }

        _getStackIndex(t, e, i) {
            const s = this._getStacks(t, i), n = void 0 !== e ? s.indexOf(e) : -1;
            return -1 === n ? s.length - 1 : n
        }

        _getRuler() {
            const t = this.options, e = this._cachedMeta, i = e.iScale, s = [];
            let n, o;
            for (n = 0, o = e.data.length; n < o; ++n) s.push(i.getPixelForValue(this.getParsed(n)[i.axis], n));
            const r = t.barThickness;
            return {
                min: r || zs(e),
                pixels: s,
                start: i._startPixel,
                end: i._endPixel,
                stackCount: this._getStackCount(),
                scale: i,
                grouped: t.grouped,
                ratio: r ? 1 : t.categoryPercentage * t.barPercentage
            }
        }

        _calculateBarValuePixels(t) {
            const {_cachedMeta: {vScale: e, _stacked: i}, options: {base: s, minBarLength: n}} = this, o = s || 0,
                r = this.getParsed(t), a = r._custom, l = Vs(a);
            let h, c, d = r[e.axis], u = 0, f = i ? this.applyStack(e, r, i) : d;
            f !== d && (u = f - d, f = d), l && (d = a.barStart, f = a.barEnd - a.barStart, 0 !== d && Xt(d) !== Xt(a.barEnd) && (u = 0), u += d);
            const g = gt(s) || l ? u : s;
            let p = e.getPixelForValue(g);
            if (h = this.chart.getDataVisibility(t) ? e.getPixelForValue(u + f) : p, c = h - p, Math.abs(c) < n) {
                c = function (t, e, i) {
                    return 0 !== t ? Xt(t) : (e.isHorizontal() ? 1 : -1) * (e.min >= i ? 1 : -1)
                }(c, e, o) * n, d === o && (p -= c / 2);
                const t = e.getPixelForDecimal(0), i = e.getPixelForDecimal(1), s = Math.min(t, i), r = Math.max(t, i);
                p = Math.max(Math.min(p, r), s), h = p + c
            }
            if (p === e.getPixelForValue(o)) {
                const t = Xt(c) * e.getLineWidthForValue(o) / 2;
                p += t, c -= t
            }
            return {size: c, base: p, head: h, center: h + c / 2}
        }

        _calculateBarIndexPixels(t, e) {
            const i = e.scale, s = this.options, n = s.skipNull, o = yt(s.maxBarThickness, 1 / 0);
            let r, a;
            if (e.grouped) {
                const i = n ? this._getStackCount(t) : e.stackCount,
                    l = "flex" === s.barThickness ? function (t, e, i, s) {
                        const n = e.pixels, o = n[t];
                        let r = t > 0 ? n[t - 1] : null, a = t < n.length - 1 ? n[t + 1] : null;
                        const l = i.categoryPercentage;
                        null === r && (r = o - (null === a ? e.end - e.start : a - o)), null === a && (a = o + o - r);
                        const h = o - (o - Math.min(r, a)) / 2 * l;
                        return {chunk: Math.abs(a - r) / 2 * l / s, ratio: i.barPercentage, start: h}
                    }(t, e, s, i) : function (t, e, i, s) {
                        const n = i.barThickness;
                        let o, r;
                        return gt(n) ? (o = e.min * i.categoryPercentage, r = i.barPercentage) : (o = n * s, r = 1), {
                            chunk: o / s,
                            ratio: r,
                            start: e.pixels[t] - o / 2
                        }
                    }(t, e, s, i), h = this._getStackIndex(this.index, this._cachedMeta.stack, n ? t : void 0);
                r = l.start + l.chunk * h + l.chunk / 2, a = Math.min(o, l.chunk * l.ratio)
            } else r = i.getPixelForValue(this.getParsed(t)[i.axis], t), a = Math.min(o, e.min * e.ratio);
            return {base: r - a / 2, head: r + a / 2, center: r, size: a}
        }

        draw() {
            const t = this._cachedMeta, e = t.vScale, i = t.data, s = i.length;
            let n = 0;
            for (; n < s; ++n) null !== this.getParsed(n)[e.axis] && i[n].draw(this._ctx)
        }
    }

    Us.id = "bar", Us.defaults = {
        datasetElementType: !1,
        dataElementType: "bar",
        categoryPercentage: .8,
        barPercentage: .9,
        grouped: !0,
        animations: {numbers: {type: "number", properties: ["x", "y", "base", "width", "height"]}}
    }, Us.overrides = {
        scales: {
            _index_: {type: "category", offset: !0, grid: {offset: !0}},
            _value_: {type: "linear", beginAtZero: !0}
        }
    };

    class Ys extends $s {
        initialize() {
            this.enableOptionSharing = !0, super.initialize()
        }

        parsePrimitiveData(t, e, i, s) {
            const n = super.parsePrimitiveData(t, e, i, s);
            for (let t = 0; t < n.length; t++) n[t]._custom = this.resolveDataElementOptions(t + i).radius;
            return n
        }

        parseArrayData(t, e, i, s) {
            const n = super.parseArrayData(t, e, i, s);
            for (let t = 0; t < n.length; t++) {
                const s = e[i + t];
                n[t]._custom = yt(s[2], this.resolveDataElementOptions(t + i).radius)
            }
            return n
        }

        parseObjectData(t, e, i, s) {
            const n = super.parseObjectData(t, e, i, s);
            for (let t = 0; t < n.length; t++) {
                const s = e[i + t];
                n[t]._custom = yt(s && s.r && +s.r, this.resolveDataElementOptions(t + i).radius)
            }
            return n
        }

        getMaxOverflow() {
            const t = this._cachedMeta.data;
            let e = 0;
            for (let i = t.length - 1; i >= 0; --i) e = Math.max(e, t[i].size(this.resolveDataElementOptions(i)) / 2);
            return e > 0 && e
        }

        getLabelAndValue(t) {
            const e = this._cachedMeta, {xScale: i, yScale: s} = e, n = this.getParsed(t), o = i.getLabelForValue(n.x),
                r = s.getLabelForValue(n.y), a = n._custom;
            return {label: e.label, value: "(" + o + ", " + r + (a ? ", " + a : "") + ")"}
        }

        update(t) {
            const e = this._cachedMeta.data;
            this.updateElements(e, 0, e.length, t)
        }

        updateElements(t, e, i, s) {
            const n = "reset" === s, {iScale: o, vScale: r} = this._cachedMeta,
                a = this.resolveDataElementOptions(e, s), l = this.getSharedOptions(a), h = this.includeOptions(s, l),
                c = o.axis, d = r.axis;
            for (let a = e; a < e + i; a++) {
                const e = t[a], i = !n && this.getParsed(a), l = {},
                    u = l[c] = n ? o.getPixelForDecimal(.5) : o.getPixelForValue(i[c]),
                    f = l[d] = n ? r.getBasePixel() : r.getPixelForValue(i[d]);
                l.skip = isNaN(u) || isNaN(f), h && (l.options = this.resolveDataElementOptions(a, e.active ? "active" : s), n && (l.options.radius = 0)), this.updateElement(e, a, l, s)
            }
            this.updateSharedOptions(l, s, a)
        }

        resolveDataElementOptions(t, e) {
            const i = this.getParsed(t);
            let s = super.resolveDataElementOptions(t, e);
            s.$shared && (s = Object.assign({}, s, {$shared: !1}));
            const n = s.radius;
            return "active" !== e && (s.radius = 0), s.radius += yt(i && i._custom, n), s
        }
    }

    Ys.id = "bubble", Ys.defaults = {
        datasetElementType: !1,
        dataElementType: "point",
        animations: {numbers: {type: "number", properties: ["x", "y", "borderWidth", "radius"]}}
    }, Ys.overrides = {
        scales: {x: {type: "linear"}, y: {type: "linear"}},
        plugins: {tooltip: {callbacks: {title: () => ""}}}
    };

    class Xs extends $s {
        constructor(t, e) {
            super(t, e), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0
        }

        linkScales() {
        }

        parse(t, e) {
            const i = this.getDataset().data, s = this._cachedMeta;
            if (!1 === this._parsing) s._parsed = i; else {
                let n, o, r = t => +i[t];
                if (mt(i[t])) {
                    const {key: t = "value"} = this._parsing;
                    r = e => +Rt(i[e], t)
                }
                for (n = t, o = t + e; n < o; ++n) s._parsed[n] = r(n)
            }
        }

        _getRotation() {
            return Zt(this.options.rotation - 90)
        }

        _getCircumference() {
            return Zt(this.options.circumference)
        }

        _getRotationExtents() {
            let t = Wt, e = -Wt;
            for (let i = 0; i < this.chart.data.datasets.length; ++i) if (this.chart.isDatasetVisible(i)) {
                const s = this.chart.getDatasetMeta(i).controller, n = s._getRotation(), o = s._getCircumference();
                t = Math.min(t, n), e = Math.max(e, n + o)
            }
            return {rotation: t, circumference: e - t}
        }

        update(t) {
            const e = this.chart, {chartArea: i} = e, s = this._cachedMeta, n = s.data,
                o = this.getMaxBorderWidth() + this.getMaxOffset(n) + this.options.spacing,
                r = Math.max((Math.min(i.width, i.height) - o) / 2, 0),
                a = Math.min((h = r, "string" == typeof (l = this.options.cutout) && l.endsWith("%") ? parseFloat(l) / 100 : l / h), 1);
            var l, h;
            const c = this._getRingWeight(this.index), {
                    circumference: d,
                    rotation: u
                } = this._getRotationExtents(), {ratioX: f, ratioY: g, offsetX: p, offsetY: m} = function (t, e, i) {
                    let s = 1, n = 1, o = 0, r = 0;
                    if (e < Wt) {
                        const a = t, l = a + e, h = Math.cos(a), c = Math.sin(a), d = Math.cos(l), u = Math.sin(l),
                            f = (t, e, s) => oe(t, a, l, !0) ? 1 : Math.max(e, e * i, s, s * i),
                            g = (t, e, s) => oe(t, a, l, !0) ? -1 : Math.min(e, e * i, s, s * i), p = f(0, h, d),
                            m = f(jt, c, u), b = g(Ft, h, d), x = g(Ft + jt, c, u);
                        s = (p - b) / 2, n = (m - x) / 2, o = -(p + b) / 2, r = -(m + x) / 2
                    }
                    return {ratioX: s, ratioY: n, offsetX: o, offsetY: r}
                }(u, d, a), b = (i.width - o) / f, x = (i.height - o) / g, y = Math.max(Math.min(b, x) / 2, 0),
                _ = _t(this.options.radius, y), v = (_ - Math.max(_ * a, 0)) / this._getVisibleDatasetWeightTotal();
            this.offsetX = p * _, this.offsetY = m * _, s.total = this.calculateTotal(), this.outerRadius = _ - v * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - v * c, 0), this.updateElements(n, 0, n.length, t)
        }

        _circumference(t, e) {
            const i = this.options, s = this._cachedMeta, n = this._getCircumference();
            return e && i.animation.animateRotate || !this.chart.getDataVisibility(t) || null === s._parsed[t] || s.data[t].hidden ? 0 : this.calculateCircumference(s._parsed[t] * n / Wt)
        }

        updateElements(t, e, i, s) {
            const n = "reset" === s, o = this.chart, r = o.chartArea, a = o.options.animation,
                l = (r.left + r.right) / 2, h = (r.top + r.bottom) / 2, c = n && a.animateScale,
                d = c ? 0 : this.innerRadius, u = c ? 0 : this.outerRadius, f = this.resolveDataElementOptions(e, s),
                g = this.getSharedOptions(f), p = this.includeOptions(s, g);
            let m, b = this._getRotation();
            for (m = 0; m < e; ++m) b += this._circumference(m, n);
            for (m = e; m < e + i; ++m) {
                const e = this._circumference(m, n), i = t[m], o = {
                    x: l + this.offsetX,
                    y: h + this.offsetY,
                    startAngle: b,
                    endAngle: b + e,
                    circumference: e,
                    outerRadius: u,
                    innerRadius: d
                };
                p && (o.options = g || this.resolveDataElementOptions(m, i.active ? "active" : s)), b += e, this.updateElement(i, m, o, s)
            }
            this.updateSharedOptions(g, s, f)
        }

        calculateTotal() {
            const t = this._cachedMeta, e = t.data;
            let i, s = 0;
            for (i = 0; i < e.length; i++) {
                const n = t._parsed[i];
                null === n || isNaN(n) || !this.chart.getDataVisibility(i) || e[i].hidden || (s += Math.abs(n))
            }
            return s
        }

        calculateCircumference(t) {
            const e = this._cachedMeta.total;
            return e > 0 && !isNaN(t) ? Wt * (Math.abs(t) / e) : 0
        }

        getLabelAndValue(t) {
            const e = this._cachedMeta, i = this.chart, s = i.data.labels || [], n = hs(e._parsed[t], i.options.locale);
            return {label: s[t] || "", value: n}
        }

        getMaxBorderWidth(t) {
            let e = 0;
            const i = this.chart;
            let s, n, o, r, a;
            if (!t) for (s = 0, n = i.data.datasets.length; s < n; ++s) if (i.isDatasetVisible(s)) {
                o = i.getDatasetMeta(s), t = o.data, r = o.controller;
                break
            }
            if (!t) return 0;
            for (s = 0, n = t.length; s < n; ++s) a = r.resolveDataElementOptions(s), "inner" !== a.borderAlign && (e = Math.max(e, a.borderWidth || 0, a.hoverBorderWidth || 0));
            return e
        }

        getMaxOffset(t) {
            let e = 0;
            for (let i = 0, s = t.length; i < s; ++i) {
                const t = this.resolveDataElementOptions(i);
                e = Math.max(e, t.offset || 0, t.hoverOffset || 0)
            }
            return e
        }

        _getRingWeightOffset(t) {
            let e = 0;
            for (let i = 0; i < t; ++i) this.chart.isDatasetVisible(i) && (e += this._getRingWeight(i));
            return e
        }

        _getRingWeight(t) {
            return Math.max(yt(this.chart.data.datasets[t].weight, 1), 0)
        }

        _getVisibleDatasetWeightTotal() {
            return this._getRingWeightOffset(this.chart.data.datasets.length) || 1
        }
    }

    Xs.id = "doughnut", Xs.defaults = {
        datasetElementType: !1,
        dataElementType: "arc",
        animation: {animateRotate: !0, animateScale: !1},
        animations: {
            numbers: {
                type: "number",
                properties: ["circumference", "endAngle", "innerRadius", "outerRadius", "startAngle", "x", "y", "offset", "borderWidth", "spacing"]
            }
        },
        cutout: "50%",
        rotation: 0,
        circumference: 360,
        radius: "100%",
        spacing: 0,
        indexAxis: "r"
    }, Xs.descriptors = {
        _scriptable: t => "spacing" !== t,
        _indexable: t => "spacing" !== t
    }, Xs.overrides = {
        aspectRatio: 1, plugins: {
            legend: {
                labels: {
                    generateLabels(t) {
                        const e = t.data;
                        if (e.labels.length && e.datasets.length) {
                            const {labels: {pointStyle: i}} = t.legend.options;
                            return e.labels.map(((e, s) => {
                                const n = t.getDatasetMeta(0).controller.getStyle(s);
                                return {
                                    text: e,
                                    fillStyle: n.backgroundColor,
                                    strokeStyle: n.borderColor,
                                    lineWidth: n.borderWidth,
                                    pointStyle: i,
                                    hidden: !t.getDataVisibility(s),
                                    index: s
                                }
                            }))
                        }
                        return []
                    }
                }, onClick(t, e, i) {
                    i.chart.toggleDataVisibility(e.index), i.chart.update()
                }
            }, tooltip: {
                callbacks: {
                    title: () => "", label(t) {
                        let e = t.label;
                        const i = ": " + t.formattedValue;
                        return pt(e) ? (e = e.slice(), e[0] += i) : e += i, e
                    }
                }
            }
        }
    };

    class Gs extends $s {
        initialize() {
            this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize()
        }

        update(t) {
            const e = this._cachedMeta, {dataset: i, data: s = [], _dataset: n} = e, o = this.chart._animationsDisabled;
            let {start: r, count: a} = function (t, e, i) {
                const s = e.length;
                let n = 0, o = s;
                if (t._sorted) {
                    const {iScale: r, _parsed: a} = t, l = r.axis, {
                        min: h,
                        max: c,
                        minDefined: d,
                        maxDefined: u
                    } = r.getUserBounds();
                    d && (n = re(Math.min(wi(a, r.axis, h).lo, i ? s : wi(e, l, r.getPixelForValue(h)).lo), 0, s - 1)), o = u ? re(Math.max(wi(a, r.axis, c).hi + 1, i ? 0 : wi(e, l, r.getPixelForValue(c)).hi + 1), n, s) - n : s - n
                }
                return {start: n, count: o}
            }(e, s, o);
            this._drawStart = r, this._drawCount = a, function (t) {
                const {xScale: e, yScale: i, _scaleRanges: s} = t,
                    n = {xmin: e.min, xmax: e.max, ymin: i.min, ymax: i.max};
                if (!s) return t._scaleRanges = n, !0;
                const o = s.xmin !== e.min || s.xmax !== e.max || s.ymin !== i.min || s.ymax !== i.max;
                return Object.assign(s, n), o
            }(e) && (r = 0, a = s.length), i._chart = this.chart, i._datasetIndex = this.index, i._decimated = !!n._decimated, i.points = s;
            const l = this.resolveDatasetElementOptions(t);
            this.options.showLine || (l.borderWidth = 0), l.segment = this.options.segment, this.updateElement(i, void 0, {
                animated: !o,
                options: l
            }, t), this.updateElements(s, r, a, t)
        }

        updateElements(t, e, i, s) {
            const n = "reset" === s, {iScale: o, vScale: r, _stacked: a, _dataset: l} = this._cachedMeta,
                h = this.resolveDataElementOptions(e, s), c = this.getSharedOptions(h), d = this.includeOptions(s, c),
                u = o.axis, f = r.axis, {spanGaps: g, segment: p} = this.options,
                m = qt(g) ? g : Number.POSITIVE_INFINITY, b = this.chart._animationsDisabled || n || "none" === s;
            let x = e > 0 && this.getParsed(e - 1);
            for (let h = e; h < e + i; ++h) {
                const e = t[h], i = this.getParsed(h), g = b ? e : {}, y = gt(i[f]),
                    _ = g[u] = o.getPixelForValue(i[u], h),
                    v = g[f] = n || y ? r.getBasePixel() : r.getPixelForValue(a ? this.applyStack(r, i, a) : i[f], h);
                g.skip = isNaN(_) || isNaN(v) || y, g.stop = h > 0 && Math.abs(i[u] - x[u]) > m, p && (g.parsed = i, g.raw = l.data[h]), d && (g.options = c || this.resolveDataElementOptions(h, e.active ? "active" : s)), b || this.updateElement(e, h, g, s), x = i
            }
            this.updateSharedOptions(c, s, h)
        }

        getMaxOverflow() {
            const t = this._cachedMeta, e = t.dataset, i = e.options && e.options.borderWidth || 0, s = t.data || [];
            if (!s.length) return i;
            const n = s[0].size(this.resolveDataElementOptions(0)),
                o = s[s.length - 1].size(this.resolveDataElementOptions(s.length - 1));
            return Math.max(i, n, o) / 2
        }

        draw() {
            const t = this._cachedMeta;
            t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw()
        }
    }

    Gs.id = "line", Gs.defaults = {
        datasetElementType: "line",
        dataElementType: "point",
        showLine: !0,
        spanGaps: !1
    }, Gs.overrides = {scales: {_index_: {type: "category"}, _value_: {type: "linear"}}};

    class qs extends $s {
        constructor(t, e) {
            super(t, e), this.innerRadius = void 0, this.outerRadius = void 0
        }

        getLabelAndValue(t) {
            const e = this._cachedMeta, i = this.chart, s = i.data.labels || [],
                n = hs(e._parsed[t].r, i.options.locale);
            return {label: s[t] || "", value: n}
        }

        parseObjectData(t, e, i, s) {
            return Vi.bind(this)(t, e, i, s)
        }

        update(t) {
            const e = this._cachedMeta.data;
            this._updateRadius(), this.updateElements(e, 0, e.length, t)
        }

        getMinMax() {
            const t = this._cachedMeta, e = {min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY};
            return t.data.forEach(((t, i) => {
                const s = this.getParsed(i).r;
                !isNaN(s) && this.chart.getDataVisibility(i) && (s < e.min && (e.min = s), s > e.max && (e.max = s))
            })), e
        }

        _updateRadius() {
            const t = this.chart, e = t.chartArea, i = t.options, s = Math.min(e.right - e.left, e.bottom - e.top),
                n = Math.max(s / 2, 0),
                o = (n - Math.max(i.cutoutPercentage ? n / 100 * i.cutoutPercentage : 1, 0)) / t.getVisibleDatasetCount();
            this.outerRadius = n - o * this.index, this.innerRadius = this.outerRadius - o
        }

        updateElements(t, e, i, s) {
            const n = "reset" === s, o = this.chart, r = o.options.animation, a = this._cachedMeta.rScale,
                l = a.xCenter, h = a.yCenter, c = a.getIndexAngle(0) - .5 * Ft;
            let d, u = c;
            const f = 360 / this.countVisibleElements();
            for (d = 0; d < e; ++d) u += this._computeAngle(d, s, f);
            for (d = e; d < e + i; d++) {
                const e = t[d];
                let i = u, g = u + this._computeAngle(d, s, f),
                    p = o.getDataVisibility(d) ? a.getDistanceFromCenterForValue(this.getParsed(d).r) : 0;
                u = g, n && (r.animateScale && (p = 0), r.animateRotate && (i = g = c));
                const m = {
                    x: l,
                    y: h,
                    innerRadius: 0,
                    outerRadius: p,
                    startAngle: i,
                    endAngle: g,
                    options: this.resolveDataElementOptions(d, e.active ? "active" : s)
                };
                this.updateElement(e, d, m, s)
            }
        }

        countVisibleElements() {
            const t = this._cachedMeta;
            let e = 0;
            return t.data.forEach(((t, i) => {
                !isNaN(this.getParsed(i).r) && this.chart.getDataVisibility(i) && e++
            })), e
        }

        _computeAngle(t, e, i) {
            return this.chart.getDataVisibility(t) ? Zt(this.resolveDataElementOptions(t, e).angle || i) : 0
        }
    }

    qs.id = "polarArea", qs.defaults = {
        dataElementType: "arc",
        animation: {animateRotate: !0, animateScale: !0},
        animations: {
            numbers: {
                type: "number",
                properties: ["x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius"]
            }
        },
        indexAxis: "r",
        startAngle: 0
    }, qs.overrides = {
        aspectRatio: 1,
        plugins: {
            legend: {
                labels: {
                    generateLabels(t) {
                        const e = t.data;
                        if (e.labels.length && e.datasets.length) {
                            const {labels: {pointStyle: i}} = t.legend.options;
                            return e.labels.map(((e, s) => {
                                const n = t.getDatasetMeta(0).controller.getStyle(s);
                                return {
                                    text: e,
                                    fillStyle: n.backgroundColor,
                                    strokeStyle: n.borderColor,
                                    lineWidth: n.borderWidth,
                                    pointStyle: i,
                                    hidden: !t.getDataVisibility(s),
                                    index: s
                                }
                            }))
                        }
                        return []
                    }
                }, onClick(t, e, i) {
                    i.chart.toggleDataVisibility(e.index), i.chart.update()
                }
            },
            tooltip: {
                callbacks: {
                    title: () => "",
                    label: t => t.chart.data.labels[t.dataIndex] + ": " + t.formattedValue
                }
            }
        },
        scales: {
            r: {
                type: "radialLinear",
                angleLines: {display: !1},
                beginAtZero: !0,
                grid: {circular: !0},
                pointLabels: {display: !1},
                startAngle: 0
            }
        }
    };

    class Ks extends Xs {
    }

    Ks.id = "pie", Ks.defaults = {cutout: 0, rotation: 0, circumference: 360, radius: "100%"};

    class Js extends $s {
        getLabelAndValue(t) {
            const e = this._cachedMeta.vScale, i = this.getParsed(t);
            return {label: e.getLabels()[t], value: "" + e.getLabelForValue(i[e.axis])}
        }

        parseObjectData(t, e, i, s) {
            return Vi.bind(this)(t, e, i, s)
        }

        update(t) {
            const e = this._cachedMeta, i = e.dataset, s = e.data || [], n = e.iScale.getLabels();
            if (i.points = s, "resize" !== t) {
                const e = this.resolveDatasetElementOptions(t);
                this.options.showLine || (e.borderWidth = 0);
                const o = {_loop: !0, _fullLoop: n.length === s.length, options: e};
                this.updateElement(i, void 0, o, t)
            }
            this.updateElements(s, 0, s.length, t)
        }

        updateElements(t, e, i, s) {
            const n = this._cachedMeta.rScale, o = "reset" === s;
            for (let r = e; r < e + i; r++) {
                const e = t[r], i = this.resolveDataElementOptions(r, e.active ? "active" : s),
                    a = n.getPointPositionForValue(r, this.getParsed(r).r), l = o ? n.xCenter : a.x,
                    h = o ? n.yCenter : a.y, c = {x: l, y: h, angle: a.angle, skip: isNaN(l) || isNaN(h), options: i};
                this.updateElement(e, r, c, s)
            }
        }
    }

    Js.id = "radar", Js.defaults = {
        datasetElementType: "line",
        dataElementType: "point",
        indexAxis: "r",
        showLine: !0,
        elements: {line: {fill: "start"}}
    }, Js.overrides = {aspectRatio: 1, scales: {r: {type: "radialLinear"}}};

    class Zs extends Gs {
    }

    Zs.id = "scatter", Zs.defaults = {showLine: !1, fill: !1}, Zs.overrides = {
        interaction: {mode: "point"},
        plugins: {tooltip: {callbacks: {title: () => "", label: t => "(" + t.label + ", " + t.formattedValue + ")"}}},
        scales: {x: {type: "linear"}, y: {type: "linear"}}
    };
    var Qs = Object.freeze({
        __proto__: null,
        BarController: Us,
        BubbleController: Ys,
        DoughnutController: Xs,
        LineController: Gs,
        PolarAreaController: qs,
        PieController: Ks,
        RadarController: Js,
        ScatterController: Zs
    });

    function tn() {
        throw new Error("This method is not implemented: Check that a complete date adapter is provided.")
    }

    class en {
        constructor(t) {
            this.options = t || {}
        }

        formats() {
            return tn()
        }

        parse(t, e) {
            return tn()
        }

        format(t, e) {
            return tn()
        }

        add(t, e, i) {
            return tn()
        }

        diff(t, e, i) {
            return tn()
        }

        startOf(t, e, i) {
            return tn()
        }

        endOf(t, e) {
            return tn()
        }
    }

    en.override = function (t) {
        Object.assign(en.prototype, t)
    };
    var sn = {_date: en};

    function nn(t, e, i, s) {
        const {controller: n, data: o, _sorted: r} = t, a = n._cachedMeta.iScale;
        if (a && e === a.axis && "r" !== e && r && o.length) {
            const t = a._reversePixels ? Mi : wi;
            if (!s) return t(o, e, i);
            if (n._sharedOptions) {
                const s = o[0], n = "function" == typeof s.getRange && s.getRange(e);
                if (n) {
                    const s = t(o, e, i - n), r = t(o, e, i + n);
                    return {lo: s.lo, hi: r.hi}
                }
            }
        }
        return {lo: 0, hi: o.length - 1}
    }

    function on(t, e, i, s, n) {
        const o = t.getSortedVisibleDatasetMetas(), r = i[e];
        for (let t = 0, i = o.length; t < i; ++t) {
            const {index: i, data: a} = o[t], {lo: l, hi: h} = nn(o[t], e, r, n);
            for (let t = l; t <= h; ++t) {
                const e = a[t];
                e.skip || s(e, i, t)
            }
        }
    }

    function rn(t, e, i, s, n) {
        const o = [];
        return n || t.isPointInArea(e) ? (on(t, i, e, (function (i, r, a) {
            (n || ii(i, t.chartArea, 0)) && i.inRange(e.x, e.y, s) && o.push({element: i, datasetIndex: r, index: a})
        }), !0), o) : o
    }

    function an(t, e, i, s, n, o) {
        return o || t.isPointInArea(e) ? "r" !== i || s ? function (t, e, i, s, n, o) {
            let r = [];
            const a = function (t) {
                const e = -1 !== t.indexOf("x"), i = -1 !== t.indexOf("y");
                return function (t, s) {
                    const n = e ? Math.abs(t.x - s.x) : 0, o = i ? Math.abs(t.y - s.y) : 0;
                    return Math.sqrt(Math.pow(n, 2) + Math.pow(o, 2))
                }
            }(i);
            let l = Number.POSITIVE_INFINITY;
            return on(t, i, e, (function (i, h, c) {
                const d = i.inRange(e.x, e.y, n);
                if (s && !d) return;
                const u = i.getCenterPoint(n);
                if (!o && !t.isPointInArea(u) && !d) return;
                const f = a(e, u);
                f < l ? (r = [{element: i, datasetIndex: h, index: c}], l = f) : f === l && r.push({
                    element: i,
                    datasetIndex: h,
                    index: c
                })
            })), r
        }(t, e, i, s, n, o) : function (t, e, i, s) {
            let n = [];
            return on(t, i, e, (function (t, i, o) {
                const {
                    startAngle: r,
                    endAngle: a
                } = t.getProps(["startAngle", "endAngle"], s), {angle: l} = ee(t, {x: e.x, y: e.y});
                oe(l, r, a) && n.push({element: t, datasetIndex: i, index: o})
            })), n
        }(t, e, i, n) : []
    }

    function ln(t, e, i, s, n) {
        const o = [], r = "x" === i ? "inXRange" : "inYRange";
        let a = !1;
        return on(t, i, e, ((t, s, l) => {
            t[r](e[i], n) && (o.push({element: t, datasetIndex: s, index: l}), a = a || t.inRange(e.x, e.y, n))
        })), s && !a ? [] : o
    }

    var hn = {
        evaluateInteractionItems: on, modes: {
            index(t, e, i, s) {
                const n = ts(e, t), o = i.axis || "x", r = i.includeInvisible || !1,
                    a = i.intersect ? rn(t, n, o, s, r) : an(t, n, o, !1, s, r), l = [];
                return a.length ? (t.getSortedVisibleDatasetMetas().forEach((t => {
                    const e = a[0].index, i = t.data[e];
                    i && !i.skip && l.push({element: i, datasetIndex: t.index, index: e})
                })), l) : []
            },
            dataset(t, e, i, s) {
                const n = ts(e, t), o = i.axis || "xy", r = i.includeInvisible || !1;
                let a = i.intersect ? rn(t, n, o, s, r) : an(t, n, o, !1, s, r);
                if (a.length > 0) {
                    const e = a[0].datasetIndex, i = t.getDatasetMeta(e).data;
                    a = [];
                    for (let t = 0; t < i.length; ++t) a.push({element: i[t], datasetIndex: e, index: t})
                }
                return a
            },
            point: (t, e, i, s) => rn(t, ts(e, t), i.axis || "xy", s, i.includeInvisible || !1),
            nearest(t, e, i, s) {
                const n = ts(e, t), o = i.axis || "xy", r = i.includeInvisible || !1;
                return an(t, n, o, i.intersect, s, r)
            },
            x: (t, e, i, s) => ln(t, ts(e, t), "x", i.intersect, s),
            y: (t, e, i, s) => ln(t, ts(e, t), "y", i.intersect, s)
        }
    };
    const cn = ["left", "top", "right", "bottom"];

    function dn(t, e) {
        return t.filter((t => t.pos === e))
    }

    function un(t, e) {
        return t.filter((t => -1 === cn.indexOf(t.pos) && t.box.axis === e))
    }

    function fn(t, e) {
        return t.sort(((t, i) => {
            const s = e ? i : t, n = e ? t : i;
            return s.weight === n.weight ? s.index - n.index : s.weight - n.weight
        }))
    }

    function gn(t, e, i, s) {
        return Math.max(t[i], e[i]) + Math.max(t[s], e[s])
    }

    function pn(t, e) {
        t.top = Math.max(t.top, e.top), t.left = Math.max(t.left, e.left), t.bottom = Math.max(t.bottom, e.bottom), t.right = Math.max(t.right, e.right)
    }

    function mn(t, e, i, s) {
        const {pos: n, box: o} = i, r = t.maxPadding;
        if (!mt(n)) {
            i.size && (t[n] -= i.size);
            const e = s[i.stack] || {size: 0, count: 1};
            e.size = Math.max(e.size, i.horizontal ? o.height : o.width), i.size = e.size / e.count, t[n] += i.size
        }
        o.getPadding && pn(r, o.getPadding());
        const a = Math.max(0, e.outerWidth - gn(r, t, "left", "right")),
            l = Math.max(0, e.outerHeight - gn(r, t, "top", "bottom")), h = a !== t.w, c = l !== t.h;
        return t.w = a, t.h = l, i.horizontal ? {same: h, other: c} : {same: c, other: h}
    }

    function bn(t, e) {
        const i = e.maxPadding;
        return function (t) {
            const s = {left: 0, top: 0, right: 0, bottom: 0};
            return t.forEach((t => {
                s[t] = Math.max(e[t], i[t])
            })), s
        }(t ? ["left", "right"] : ["top", "bottom"])
    }

    function xn(t, e, i, s) {
        const n = [];
        let o, r, a, l, h, c;
        for (o = 0, r = t.length, h = 0; o < r; ++o) {
            a = t[o], l = a.box, l.update(a.width || e.w, a.height || e.h, bn(a.horizontal, e));
            const {same: r, other: d} = mn(e, i, a, s);
            h |= r && n.length, c = c || d, l.fullSize || n.push(a)
        }
        return h && xn(n, e, i, s) || c
    }

    function yn(t, e, i, s, n) {
        t.top = i, t.left = e, t.right = e + s, t.bottom = i + n, t.width = s, t.height = n
    }

    function _n(t, e, i, s) {
        const n = i.padding;
        let {x: o, y: r} = e;
        for (const a of t) {
            const t = a.box, l = s[a.stack] || {count: 1, placed: 0, weight: 1}, h = a.stackWeight / l.weight || 1;
            if (a.horizontal) {
                const s = e.w * h, o = l.size || t.height;
                It(l.start) && (r = l.start), t.fullSize ? yn(t, n.left, r, i.outerWidth - n.right - n.left, o) : yn(t, e.left + l.placed, r, s, o), l.start = r, l.placed += s, r = t.bottom
            } else {
                const s = e.h * h, r = l.size || t.width;
                It(l.start) && (o = l.start), t.fullSize ? yn(t, o, n.top, r, i.outerHeight - n.bottom - n.top) : yn(t, o, e.top + l.placed, r, s), l.start = o, l.placed += s, o = t.right
            }
        }
        e.x = o, e.y = r
    }

    Ke.set("layout", {autoPadding: !0, padding: {top: 0, right: 0, bottom: 0, left: 0}});
    var vn = {
        addBox(t, e) {
            t.boxes || (t.boxes = []), e.fullSize = e.fullSize || !1, e.position = e.position || "top", e.weight = e.weight || 0, e._layers = e._layers || function () {
                return [{
                    z: 0, draw(t) {
                        e.draw(t)
                    }
                }]
            }, t.boxes.push(e)
        }, removeBox(t, e) {
            const i = t.boxes ? t.boxes.indexOf(e) : -1;
            -1 !== i && t.boxes.splice(i, 1)
        }, configure(t, e, i) {
            e.fullSize = i.fullSize, e.position = i.position, e.weight = i.weight
        }, update(t, e, i, s) {
            if (!t) return;
            const n = bi(t.options.layout.padding), o = Math.max(e - n.width, 0), r = Math.max(i - n.height, 0),
                a = function (t) {
                    const e = function (t) {
                            const e = [];
                            let i, s, n, o, r, a;
                            for (i = 0, s = (t || []).length; i < s; ++i) n = t[i], ({
                                position: o,
                                options: {stack: r, stackWeight: a = 1}
                            } = n), e.push({
                                index: i,
                                box: n,
                                pos: o,
                                horizontal: n.isHorizontal(),
                                weight: n.weight,
                                stack: r && o + r,
                                stackWeight: a
                            });
                            return e
                        }(t), i = fn(e.filter((t => t.box.fullSize)), !0), s = fn(dn(e, "left"), !0),
                        n = fn(dn(e, "right")), o = fn(dn(e, "top"), !0), r = fn(dn(e, "bottom")), a = un(e, "x"),
                        l = un(e, "y");
                    return {
                        fullSize: i,
                        leftAndTop: s.concat(o),
                        rightAndBottom: n.concat(l).concat(r).concat(a),
                        chartArea: dn(e, "chartArea"),
                        vertical: s.concat(n).concat(l),
                        horizontal: o.concat(r).concat(a)
                    }
                }(t.boxes), l = a.vertical, h = a.horizontal;
            wt(t.boxes, (t => {
                "function" == typeof t.beforeLayout && t.beforeLayout()
            }));
            const c = l.reduce(((t, e) => e.box.options && !1 === e.box.options.display ? t : t + 1), 0) || 1,
                d = Object.freeze({
                    outerWidth: e,
                    outerHeight: i,
                    padding: n,
                    availableWidth: o,
                    availableHeight: r,
                    vBoxMaxWidth: o / 2 / c,
                    hBoxMaxHeight: r / 2
                }), u = Object.assign({}, n);
            pn(u, bi(s));
            const f = Object.assign({maxPadding: u, w: o, h: r, x: n.left, y: n.top}, n), g = function (t, e) {
                const i = function (t) {
                    const e = {};
                    for (const i of t) {
                        const {stack: t, pos: s, stackWeight: n} = i;
                        if (!t || !cn.includes(s)) continue;
                        const o = e[t] || (e[t] = {count: 0, placed: 0, weight: 0, size: 0});
                        o.count++, o.weight += n
                    }
                    return e
                }(t), {vBoxMaxWidth: s, hBoxMaxHeight: n} = e;
                let o, r, a;
                for (o = 0, r = t.length; o < r; ++o) {
                    a = t[o];
                    const {fullSize: r} = a.box, l = i[a.stack], h = l && a.stackWeight / l.weight;
                    a.horizontal ? (a.width = h ? h * s : r && e.availableWidth, a.height = n) : (a.width = s, a.height = h ? h * n : r && e.availableHeight)
                }
                return i
            }(l.concat(h), d);
            xn(a.fullSize, f, d, g), xn(l, f, d, g), xn(h, f, d, g) && xn(l, f, d, g), function (t) {
                const e = t.maxPadding;

                function i(i) {
                    const s = Math.max(e[i] - t[i], 0);
                    return t[i] += s, s
                }

                t.y += i("top"), t.x += i("left"), i("right"), i("bottom")
            }(f), _n(a.leftAndTop, f, d, g), f.x += f.w, f.y += f.h, _n(a.rightAndBottom, f, d, g), t.chartArea = {
                left: f.left,
                top: f.top,
                right: f.left + f.w,
                bottom: f.top + f.h,
                height: f.h,
                width: f.w
            }, wt(a.chartArea, (e => {
                const i = e.box;
                Object.assign(i, t.chartArea), i.update(f.w, f.h, {left: 0, top: 0, right: 0, bottom: 0})
            }))
        }
    };

    class wn {
        acquireContext(t, e) {
        }

        releaseContext(t) {
            return !1
        }

        addEventListener(t, e, i) {
        }

        removeEventListener(t, e, i) {
        }

        getDevicePixelRatio() {
            return 1
        }

        getMaximumSize(t, e, i, s) {
            return e = Math.max(0, e || t.width), i = i || t.height, {
                width: e,
                height: Math.max(0, s ? Math.floor(e / s) : i)
            }
        }

        isAttached(t) {
            return !0
        }

        updateConfig(t) {
        }
    }

    class Mn extends wn {
        acquireContext(t) {
            return t && t.getContext && t.getContext("2d") || null
        }

        updateConfig(t) {
            t.options.animation = !1
        }
    }

    const kn = "$chartjs", Sn = {
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup",
        pointerenter: "mouseenter",
        pointerdown: "mousedown",
        pointermove: "mousemove",
        pointerup: "mouseup",
        pointerleave: "mouseout",
        pointerout: "mouseout"
    }, Cn = t => null === t || "" === t, An = !!ss && {passive: !0};

    function Pn(t, e, i) {
        t.canvas.removeEventListener(e, i, An)
    }

    function Dn(t, e) {
        for (const i of t) if (i === e || i.contains(e)) return !0
    }

    function On(t, e, i) {
        const s = t.canvas, n = new MutationObserver((t => {
            let e = !1;
            for (const i of t) e = e || Dn(i.addedNodes, s), e = e && !Dn(i.removedNodes, s);
            e && i()
        }));
        return n.observe(document, {childList: !0, subtree: !0}), n
    }

    function En(t, e, i) {
        const s = t.canvas, n = new MutationObserver((t => {
            let e = !1;
            for (const i of t) e = e || Dn(i.removedNodes, s), e = e && !Dn(i.addedNodes, s);
            e && i()
        }));
        return n.observe(document, {childList: !0, subtree: !0}), n
    }

    const Tn = new Map;
    let Rn = 0;

    function Ln() {
        const t = window.devicePixelRatio;
        t !== Rn && (Rn = t, Tn.forEach(((e, i) => {
            i.currentDevicePixelRatio !== t && e()
        })))
    }

    function In(t, e, i) {
        const s = t.canvas, n = s && Gi(s);
        if (!n) return;
        const o = ht(((t, e) => {
            const s = n.clientWidth;
            i(t, e), s < n.clientWidth && i()
        }), window), r = new ResizeObserver((t => {
            const e = t[0], i = e.contentRect.width, s = e.contentRect.height;
            0 === i && 0 === s || o(i, s)
        }));
        return r.observe(n), function (t, e) {
            Tn.size || window.addEventListener("resize", Ln), Tn.set(t, e)
        }(t, o), r
    }

    function $n(t, e, i) {
        i && i.disconnect(), "resize" === e && function (t) {
            Tn.delete(t), Tn.size || window.removeEventListener("resize", Ln)
        }(t)
    }

    function zn(t, e, i) {
        const s = t.canvas, n = ht((e => {
            null !== t.ctx && i(function (t, e) {
                const i = Sn[t.type] || t.type, {x: s, y: n} = ts(t, e);
                return {type: i, chart: e, native: t, x: void 0 !== s ? s : null, y: void 0 !== n ? n : null}
            }(e, t))
        }), t, (t => {
            const e = t[0];
            return [e, e.offsetX, e.offsetY]
        }));
        return function (t, e, i) {
            t.addEventListener(e, i, An)
        }(s, e, n), n
    }

    class Fn extends wn {
        acquireContext(t, e) {
            const i = t && t.getContext && t.getContext("2d");
            return i && i.canvas === t ? (function (t, e) {
                const i = t.style, s = t.getAttribute("height"), n = t.getAttribute("width");
                if (t[kn] = {
                    initial: {
                        height: s,
                        width: n,
                        style: {display: i.display, height: i.height, width: i.width}
                    }
                }, i.display = i.display || "block", i.boxSizing = i.boxSizing || "border-box", Cn(n)) {
                    const e = ns(t, "width");
                    void 0 !== e && (t.width = e)
                }
                if (Cn(s)) if ("" === t.style.height) t.height = t.width / (e || 2); else {
                    const e = ns(t, "height");
                    void 0 !== e && (t.height = e)
                }
            }(t, e), i) : null
        }

        releaseContext(t) {
            const e = t.canvas;
            if (!e[kn]) return !1;
            const i = e[kn].initial;
            ["height", "width"].forEach((t => {
                const s = i[t];
                gt(s) ? e.removeAttribute(t) : e.setAttribute(t, s)
            }));
            const s = i.style || {};
            return Object.keys(s).forEach((t => {
                e.style[t] = s[t]
            })), e.width = e.width, delete e[kn], !0
        }

        addEventListener(t, e, i) {
            this.removeEventListener(t, e);
            const s = t.$proxies || (t.$proxies = {}), n = {attach: On, detach: En, resize: In}[e] || zn;
            s[e] = n(t, e, i)
        }

        removeEventListener(t, e) {
            const i = t.$proxies || (t.$proxies = {}), s = i[e];
            s && (({attach: $n, detach: $n, resize: $n}[e] || Pn)(t, e, s), i[e] = void 0)
        }

        getDevicePixelRatio() {
            return window.devicePixelRatio
        }

        getMaximumSize(t, e, i, s) {
            return function (t, e, i, s) {
                const n = Ki(t), o = Zi(n, "margin"), r = qi(n.maxWidth, t, "clientWidth") || Bt,
                    a = qi(n.maxHeight, t, "clientHeight") || Bt, l = function (t, e, i) {
                        let s, n;
                        if (void 0 === e || void 0 === i) {
                            const o = Gi(t);
                            if (o) {
                                const t = o.getBoundingClientRect(), r = Ki(o), a = Zi(r, "border", "width"),
                                    l = Zi(r, "padding");
                                e = t.width - l.width - a.width, i = t.height - l.height - a.height, s = qi(r.maxWidth, o, "clientWidth"), n = qi(r.maxHeight, o, "clientHeight")
                            } else e = t.clientWidth, i = t.clientHeight
                        }
                        return {width: e, height: i, maxWidth: s || Bt, maxHeight: n || Bt}
                    }(t, e, i);
                let {width: h, height: c} = l;
                if ("content-box" === n.boxSizing) {
                    const t = Zi(n, "border", "width"), e = Zi(n, "padding");
                    h -= e.width + t.width, c -= e.height + t.height
                }
                return h = Math.max(0, h - o.width), c = Math.max(0, s ? Math.floor(h / s) : c - o.height), h = es(Math.min(h, r, l.maxWidth)), c = es(Math.min(c, a, l.maxHeight)), h && !c && (c = es(h / 2)), {
                    width: h,
                    height: c
                }
            }(t, e, i, s)
        }

        isAttached(t) {
            const e = Gi(t);
            return !(!e || !e.isConnected)
        }
    }

    class Wn {
        constructor() {
            this.x = void 0, this.y = void 0, this.active = !1, this.options = void 0, this.$animations = void 0
        }

        tooltipPosition(t) {
            const {x: e, y: i} = this.getProps(["x", "y"], t);
            return {x: e, y: i}
        }

        hasValue() {
            return qt(this.x) && qt(this.y)
        }

        getProps(t, e) {
            const i = this.$animations;
            if (!e || !i) return this;
            const s = {};
            return t.forEach((t => {
                s[t] = i[t] && i[t].active() ? i[t]._to : this[t]
            })), s
        }
    }

    Wn.defaults = {}, Wn.defaultRoutes = void 0;
    const Vn = {
        values: t => pt(t) ? t : "" + t, numeric(t, e, i) {
            if (0 === t) return "0";
            const s = this.chart.options.locale;
            let n, o = t;
            if (i.length > 1) {
                const e = Math.max(Math.abs(i[0].value), Math.abs(i[i.length - 1].value));
                (e < 1e-4 || e > 1e15) && (n = "scientific"), o = function (t, e) {
                    let i = e.length > 3 ? e[2].value - e[1].value : e[1].value - e[0].value;
                    return Math.abs(i) >= 1 && t !== Math.floor(t) && (i = t - Math.floor(t)), i
                }(t, i)
            }
            const r = Yt(Math.abs(o)), a = Math.max(Math.min(-1 * Math.floor(r), 20), 0),
                l = {notation: n, minimumFractionDigits: a, maximumFractionDigits: a};
            return Object.assign(l, this.options.ticks.format), hs(t, s, l)
        }, logarithmic(t, e, i) {
            if (0 === t) return "0";
            const s = t / Math.pow(10, Math.floor(Yt(t)));
            return 1 === s || 2 === s || 5 === s ? Vn.numeric.call(this, t, e, i) : ""
        }
    };
    var Bn = {formatters: Vn};

    function Nn(t, e, i, s, n) {
        const o = yt(s, 0), r = Math.min(yt(n, t.length), t.length);
        let a, l, h, c = 0;
        for (i = Math.ceil(i), n && (a = n - s, i = a / Math.floor(a / i)), h = o; h < 0;) c++, h = Math.round(o + c * i);
        for (l = Math.max(o, 0); l < r; l++) l === h && (e.push(t[l]), c++, h = Math.round(o + c * i))
    }

    Ke.set("scale", {
        display: !0,
        offset: !1,
        reverse: !1,
        beginAtZero: !1,
        bounds: "ticks",
        grace: 0,
        grid: {
            display: !0,
            lineWidth: 1,
            drawBorder: !0,
            drawOnChartArea: !0,
            drawTicks: !0,
            tickLength: 8,
            tickWidth: (t, e) => e.lineWidth,
            tickColor: (t, e) => e.color,
            offset: !1,
            borderDash: [],
            borderDashOffset: 0,
            borderWidth: 1
        },
        title: {display: !1, text: "", padding: {top: 4, bottom: 4}},
        ticks: {
            minRotation: 0,
            maxRotation: 50,
            mirror: !1,
            textStrokeWidth: 0,
            textStrokeColor: "",
            padding: 3,
            display: !0,
            autoSkip: !0,
            autoSkipPadding: 3,
            labelOffset: 0,
            callback: Bn.formatters.values,
            minor: {},
            major: {},
            align: "center",
            crossAlign: "near",
            showLabelBackdrop: !1,
            backdropColor: "rgba(255, 255, 255, 0.75)",
            backdropPadding: 2
        }
    }), Ke.route("scale.ticks", "color", "", "color"), Ke.route("scale.grid", "color", "", "borderColor"), Ke.route("scale.grid", "borderColor", "", "borderColor"), Ke.route("scale.title", "color", "", "color"), Ke.describe("scale", {
        _fallback: !1,
        _scriptable: t => !t.startsWith("before") && !t.startsWith("after") && "callback" !== t && "parser" !== t,
        _indexable: t => "borderDash" !== t && "tickBorderDash" !== t
    }), Ke.describe("scales", {_fallback: "scale"}), Ke.describe("scale.ticks", {
        _scriptable: t => "backdropPadding" !== t && "callback" !== t,
        _indexable: t => "backdropPadding" !== t
    });
    const jn = (t, e, i) => "top" === e || "left" === e ? t[e] + i : t[e] - i;

    function Hn(t, e) {
        const i = [], s = t.length / e, n = t.length;
        let o = 0;
        for (; o < n; o += s) i.push(t[Math.floor(o)]);
        return i
    }

    function Un(t, e, i) {
        const s = t.ticks.length, n = Math.min(e, s - 1), o = t._startPixel, r = t._endPixel, a = 1e-6;
        let l, h = t.getPixelForTick(n);
        if (!(i && (l = 1 === s ? Math.max(h - o, r - h) : 0 === e ? (t.getPixelForTick(1) - h) / 2 : (h - t.getPixelForTick(n - 1)) / 2, h += n < e ? l : -l, h < o - a || h > r + a))) return h
    }

    function Yn(t) {
        return t.drawTicks ? t.tickLength : 0
    }

    function Xn(t, e) {
        if (!t.display) return 0;
        const i = xi(t.font, e), s = bi(t.padding);
        return (pt(t.text) ? t.text.length : 1) * i.lineHeight + s.height
    }

    function Gn(t, e, i) {
        let s = ct(t);
        return (i && "right" !== e || !i && "right" === e) && (s = (t => "left" === t ? "right" : "right" === t ? "left" : t)(s)), s
    }

    class qn extends Wn {
        constructor(t) {
            super(), this.id = t.id, this.type = t.type, this.options = void 0, this.ctx = t.ctx, this.chart = t.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0
        }

        init(t) {
            this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax)
        }

        parse(t, e) {
            return t
        }

        getUserBounds() {
            let {_userMin: t, _userMax: e, _suggestedMin: i, _suggestedMax: s} = this;
            return t = xt(t, Number.POSITIVE_INFINITY), e = xt(e, Number.NEGATIVE_INFINITY), i = xt(i, Number.POSITIVE_INFINITY), s = xt(s, Number.NEGATIVE_INFINITY), {
                min: xt(t, i),
                max: xt(e, s),
                minDefined: bt(t),
                maxDefined: bt(e)
            }
        }

        getMinMax(t) {
            let e, {min: i, max: s, minDefined: n, maxDefined: o} = this.getUserBounds();
            if (n && o) return {min: i, max: s};
            const r = this.getMatchingVisibleMetas();
            for (let a = 0, l = r.length; a < l; ++a) e = r[a].controller.getMinMax(this, t), n || (i = Math.min(i, e.min)), o || (s = Math.max(s, e.max));
            return i = o && i > s ? s : i, s = n && i > s ? i : s, {min: xt(i, xt(s, i)), max: xt(s, xt(i, s))}
        }

        getPadding() {
            return {
                left: this.paddingLeft || 0,
                top: this.paddingTop || 0,
                right: this.paddingRight || 0,
                bottom: this.paddingBottom || 0
            }
        }

        getTicks() {
            return this.ticks
        }

        getLabels() {
            const t = this.chart.data;
            return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || []
        }

        beforeLayout() {
            this._cache = {}, this._dataLimitsCached = !1
        }

        beforeUpdate() {
            vt(this.options.beforeUpdate, [this])
        }

        update(t, e, i) {
            const {beginAtZero: s, grace: n, ticks: o} = this.options, r = o.sampleSize;
            this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this._margins = i = Object.assign({
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }, i), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + i.left + i.right : this.height + i.top + i.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = function (t, e, i) {
                const {min: s, max: n} = t, o = _t(e, (n - s) / 2), r = (t, e) => i && 0 === t ? 0 : t + e;
                return {min: r(s, -Math.abs(o)), max: r(n, o)}
            }(this, n, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
            const a = r < this.ticks.length;
            this._convertTicksToLabels(a ? Hn(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), o.display && (o.autoSkip || "auto" === o.source) && (this.ticks = function (t, e) {
                const i = t.options.ticks, s = i.maxTicksLimit || function (t) {
                    const e = t.options.offset, i = t._tickSize(), s = t._length / i + (e ? 0 : 1),
                        n = t._maxLength / i;
                    return Math.floor(Math.min(s, n))
                }(t), n = i.major.enabled ? function (t) {
                    const e = [];
                    let i, s;
                    for (i = 0, s = t.length; i < s; i++) t[i].major && e.push(i);
                    return e
                }(e) : [], o = n.length, r = n[0], a = n[o - 1], l = [];
                if (o > s) return function (t, e, i, s) {
                    let n, o = 0, r = i[0];
                    for (s = Math.ceil(s), n = 0; n < t.length; n++) n === r && (e.push(t[n]), o++, r = i[o * s])
                }(e, l, n, o / s), l;
                const h = function (t, e, i) {
                    const s = function (t) {
                        const e = t.length;
                        let i, s;
                        if (e < 2) return !1;
                        for (s = t[0], i = 1; i < e; ++i) if (t[i] - t[i - 1] !== s) return !1;
                        return s
                    }(t), n = e.length / i;
                    if (!s) return Math.max(n, 1);
                    const o = function (t) {
                        const e = [], i = Math.sqrt(t);
                        let s;
                        for (s = 1; s < i; s++) t % s == 0 && (e.push(s), e.push(t / s));
                        return i === (0 | i) && e.push(i), e.sort(((t, e) => t - e)).pop(), e
                    }(s);
                    for (let t = 0, e = o.length - 1; t < e; t++) {
                        const e = o[t];
                        if (e > n) return e
                    }
                    return Math.max(n, 1)
                }(n, e, s);
                if (o > 0) {
                    let t, i;
                    const s = o > 1 ? Math.round((a - r) / (o - 1)) : null;
                    for (Nn(e, l, h, gt(s) ? 0 : r - s, r), t = 0, i = o - 1; t < i; t++) Nn(e, l, h, n[t], n[t + 1]);
                    return Nn(e, l, h, a, gt(s) ? e.length : a + s), l
                }
                return Nn(e, l, h), l
            }(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), a && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate()
        }

        configure() {
            let t, e, i = this.options.reverse;
            this.isHorizontal() ? (t = this.left, e = this.right) : (t = this.top, e = this.bottom, i = !i), this._startPixel = t, this._endPixel = e, this._reversePixels = i, this._length = e - t, this._alignToPixels = this.options.alignToPixels
        }

        afterUpdate() {
            vt(this.options.afterUpdate, [this])
        }

        beforeSetDimensions() {
            vt(this.options.beforeSetDimensions, [this])
        }

        setDimensions() {
            this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0
        }

        afterSetDimensions() {
            vt(this.options.afterSetDimensions, [this])
        }

        _callHooks(t) {
            this.chart.notifyPlugins(t, this.getContext()), vt(this.options[t], [this])
        }

        beforeDataLimits() {
            this._callHooks("beforeDataLimits")
        }

        determineDataLimits() {
        }

        afterDataLimits() {
            this._callHooks("afterDataLimits")
        }

        beforeBuildTicks() {
            this._callHooks("beforeBuildTicks")
        }

        buildTicks() {
            return []
        }

        afterBuildTicks() {
            this._callHooks("afterBuildTicks")
        }

        beforeTickToLabelConversion() {
            vt(this.options.beforeTickToLabelConversion, [this])
        }

        generateTickLabels(t) {
            const e = this.options.ticks;
            let i, s, n;
            for (i = 0, s = t.length; i < s; i++) n = t[i], n.label = vt(e.callback, [n.value, i, t], this)
        }

        afterTickToLabelConversion() {
            vt(this.options.afterTickToLabelConversion, [this])
        }

        beforeCalculateLabelRotation() {
            vt(this.options.beforeCalculateLabelRotation, [this])
        }

        calculateLabelRotation() {
            const t = this.options, e = t.ticks, i = this.ticks.length, s = e.minRotation || 0, n = e.maxRotation;
            let o, r, a, l = s;
            if (!this._isVisible() || !e.display || s >= n || i <= 1 || !this.isHorizontal()) return void (this.labelRotation = s);
            const h = this._getLabelSizes(), c = h.widest.width, d = h.highest.height,
                u = re(this.chart.width - c, 0, this.maxWidth);
            o = t.offset ? this.maxWidth / i : u / (i - 1), c + 6 > o && (o = u / (i - (t.offset ? .5 : 1)), r = this.maxHeight - Yn(t.grid) - e.padding - Xn(t.title, this.chart.options.font), a = Math.sqrt(c * c + d * d), l = Qt(Math.min(Math.asin(re((h.highest.height + 6) / o, -1, 1)), Math.asin(re(r / a, -1, 1)) - Math.asin(re(d / a, -1, 1)))), l = Math.max(s, Math.min(n, l))), this.labelRotation = l
        }

        afterCalculateLabelRotation() {
            vt(this.options.afterCalculateLabelRotation, [this])
        }

        afterAutoSkip() {
        }

        beforeFit() {
            vt(this.options.beforeFit, [this])
        }

        fit() {
            const t = {width: 0, height: 0}, {chart: e, options: {ticks: i, title: s, grid: n}} = this,
                o = this._isVisible(), r = this.isHorizontal();
            if (o) {
                const o = Xn(s, e.options.font);
                if (r ? (t.width = this.maxWidth, t.height = Yn(n) + o) : (t.height = this.maxHeight, t.width = Yn(n) + o), i.display && this.ticks.length) {
                    const {first: e, last: s, widest: n, highest: o} = this._getLabelSizes(), a = 2 * i.padding,
                        l = Zt(this.labelRotation), h = Math.cos(l), c = Math.sin(l);
                    if (r) {
                        const e = i.mirror ? 0 : c * n.width + h * o.height;
                        t.height = Math.min(this.maxHeight, t.height + e + a)
                    } else {
                        const e = i.mirror ? 0 : h * n.width + c * o.height;
                        t.width = Math.min(this.maxWidth, t.width + e + a)
                    }
                    this._calculatePadding(e, s, c, h)
                }
            }
            this._handleMargins(), r ? (this.width = this._length = e.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = e.height - this._margins.top - this._margins.bottom)
        }

        _calculatePadding(t, e, i, s) {
            const {ticks: {align: n, padding: o}, position: r} = this.options, a = 0 !== this.labelRotation,
                l = "top" !== r && "x" === this.axis;
            if (this.isHorizontal()) {
                const r = this.getPixelForTick(0) - this.left,
                    h = this.right - this.getPixelForTick(this.ticks.length - 1);
                let c = 0, d = 0;
                a ? l ? (c = s * t.width, d = i * e.height) : (c = i * t.height, d = s * e.width) : "start" === n ? d = e.width : "end" === n ? c = t.width : "inner" !== n && (c = t.width / 2, d = e.width / 2), this.paddingLeft = Math.max((c - r + o) * this.width / (this.width - r), 0), this.paddingRight = Math.max((d - h + o) * this.width / (this.width - h), 0)
            } else {
                let i = e.height / 2, s = t.height / 2;
                "start" === n ? (i = 0, s = t.height) : "end" === n && (i = e.height, s = 0), this.paddingTop = i + o, this.paddingBottom = s + o
            }
        }

        _handleMargins() {
            this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom))
        }

        afterFit() {
            vt(this.options.afterFit, [this])
        }

        isHorizontal() {
            const {axis: t, position: e} = this.options;
            return "top" === e || "bottom" === e || "x" === t
        }

        isFullSize() {
            return this.options.fullSize
        }

        _convertTicksToLabels(t) {
            let e, i;
            for (this.beforeTickToLabelConversion(), this.generateTickLabels(t), e = 0, i = t.length; e < i; e++) gt(t[e].label) && (t.splice(e, 1), i--, e--);
            this.afterTickToLabelConversion()
        }

        _getLabelSizes() {
            let t = this._labelSizes;
            if (!t) {
                const e = this.options.ticks.sampleSize;
                let i = this.ticks;
                e < i.length && (i = Hn(i, e)), this._labelSizes = t = this._computeLabelSizes(i, i.length)
            }
            return t
        }

        _computeLabelSizes(t, e) {
            const {ctx: i, _longestTextCache: s} = this, n = [], o = [];
            let r, a, l, h, c, d, u, f, g, p, m, b = 0, x = 0;
            for (r = 0; r < e; ++r) {
                if (h = t[r].label, c = this._resolveTickFontOptions(r), i.font = d = c.string, u = s[d] = s[d] || {
                    data: {},
                    gc: []
                }, f = c.lineHeight, g = p = 0, gt(h) || pt(h)) {
                    if (pt(h)) for (a = 0, l = h.length; a < l; ++a) m = h[a], gt(m) || pt(m) || (g = Je(i, u.data, u.gc, g, m), p += f)
                } else g = Je(i, u.data, u.gc, g, h), p = f;
                n.push(g), o.push(p), b = Math.max(g, b), x = Math.max(p, x)
            }
            !function (t, e) {
                wt(t, (t => {
                    const i = t.gc, s = i.length / 2;
                    let n;
                    if (s > e) {
                        for (n = 0; n < s; ++n) delete t.data[i[n]];
                        i.splice(0, s)
                    }
                }))
            }(s, e);
            const y = n.indexOf(b), _ = o.indexOf(x), v = t => ({width: n[t] || 0, height: o[t] || 0});
            return {first: v(0), last: v(e - 1), widest: v(y), highest: v(_), widths: n, heights: o}
        }

        getLabelForValue(t) {
            return t
        }

        getPixelForValue(t, e) {
            return NaN
        }

        getValueForPixel(t) {
        }

        getPixelForTick(t) {
            const e = this.ticks;
            return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value)
        }

        getPixelForDecimal(t) {
            this._reversePixels && (t = 1 - t);
            const e = this._startPixel + t * this._length;
            return re(this._alignToPixels ? Qe(this.chart, e, 0) : e, -32768, 32767)
        }

        getDecimalForPixel(t) {
            const e = (t - this._startPixel) / this._length;
            return this._reversePixels ? 1 - e : e
        }

        getBasePixel() {
            return this.getPixelForValue(this.getBaseValue())
        }

        getBaseValue() {
            const {min: t, max: e} = this;
            return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0
        }

        getContext(t) {
            const e = this.ticks || [];
            if (t >= 0 && t < e.length) {
                const i = e[t];
                return i.$context || (i.$context = function (t, e, i) {
                    return _i(t, {tick: i, index: e, type: "tick"})
                }(this.getContext(), t, i))
            }
            return this.$context || (this.$context = _i(this.chart.getContext(), {scale: this, type: "scale"}))
        }

        _tickSize() {
            const t = this.options.ticks, e = Zt(this.labelRotation), i = Math.abs(Math.cos(e)),
                s = Math.abs(Math.sin(e)), n = this._getLabelSizes(), o = t.autoSkipPadding || 0,
                r = n ? n.widest.width + o : 0, a = n ? n.highest.height + o : 0;
            return this.isHorizontal() ? a * i > r * s ? r / i : a / s : a * s < r * i ? a / i : r / s
        }

        _isVisible() {
            const t = this.options.display;
            return "auto" !== t ? !!t : this.getMatchingVisibleMetas().length > 0
        }

        _computeGridLineItems(t) {
            const e = this.axis, i = this.chart, s = this.options, {grid: n, position: o} = s, r = n.offset,
                a = this.isHorizontal(), l = this.ticks.length + (r ? 1 : 0), h = Yn(n), c = [],
                d = n.setContext(this.getContext()), u = d.drawBorder ? d.borderWidth : 0, f = u / 2, g = function (t) {
                    return Qe(i, t, u)
                };
            let p, m, b, x, y, _, v, w, M, k, S, C;
            if ("top" === o) p = g(this.bottom), _ = this.bottom - h, w = p - f, k = g(t.top) + f, C = t.bottom; else if ("bottom" === o) p = g(this.top), k = t.top, C = g(t.bottom) - f, _ = p + f, w = this.top + h; else if ("left" === o) p = g(this.right), y = this.right - h, v = p - f, M = g(t.left) + f, S = t.right; else if ("right" === o) p = g(this.left), M = t.left, S = g(t.right) - f, y = p + f, v = this.left + h; else if ("x" === e) {
                if ("center" === o) p = g((t.top + t.bottom) / 2 + .5); else if (mt(o)) {
                    const t = Object.keys(o)[0], e = o[t];
                    p = g(this.chart.scales[t].getPixelForValue(e))
                }
                k = t.top, C = t.bottom, _ = p + f, w = _ + h
            } else if ("y" === e) {
                if ("center" === o) p = g((t.left + t.right) / 2); else if (mt(o)) {
                    const t = Object.keys(o)[0], e = o[t];
                    p = g(this.chart.scales[t].getPixelForValue(e))
                }
                y = p - f, v = y - h, M = t.left, S = t.right
            }
            const A = yt(s.ticks.maxTicksLimit, l), P = Math.max(1, Math.ceil(l / A));
            for (m = 0; m < l; m += P) {
                const t = n.setContext(this.getContext(m)), e = t.lineWidth, s = t.color, o = n.borderDash || [],
                    l = t.borderDashOffset, h = t.tickWidth, d = t.tickColor, u = t.tickBorderDash || [],
                    f = t.tickBorderDashOffset;
                b = Un(this, m, r), void 0 !== b && (x = Qe(i, b, e), a ? y = v = M = S = x : _ = w = k = C = x, c.push({
                    tx1: y,
                    ty1: _,
                    tx2: v,
                    ty2: w,
                    x1: M,
                    y1: k,
                    x2: S,
                    y2: C,
                    width: e,
                    color: s,
                    borderDash: o,
                    borderDashOffset: l,
                    tickWidth: h,
                    tickColor: d,
                    tickBorderDash: u,
                    tickBorderDashOffset: f
                }))
            }
            return this._ticksLength = l, this._borderValue = p, c
        }

        _computeLabelItems(t) {
            const e = this.axis, i = this.options, {position: s, ticks: n} = i, o = this.isHorizontal(),
                r = this.ticks, {align: a, crossAlign: l, padding: h, mirror: c} = n, d = Yn(i.grid), u = d + h,
                f = c ? -h : u, g = -Zt(this.labelRotation), p = [];
            let m, b, x, y, _, v, w, M, k, S, C, A, P = "middle";
            if ("top" === s) v = this.bottom - f, w = this._getXAxisLabelAlignment(); else if ("bottom" === s) v = this.top + f, w = this._getXAxisLabelAlignment(); else if ("left" === s) {
                const t = this._getYAxisLabelAlignment(d);
                w = t.textAlign, _ = t.x
            } else if ("right" === s) {
                const t = this._getYAxisLabelAlignment(d);
                w = t.textAlign, _ = t.x
            } else if ("x" === e) {
                if ("center" === s) v = (t.top + t.bottom) / 2 + u; else if (mt(s)) {
                    const t = Object.keys(s)[0], e = s[t];
                    v = this.chart.scales[t].getPixelForValue(e) + u
                }
                w = this._getXAxisLabelAlignment()
            } else if ("y" === e) {
                if ("center" === s) _ = (t.left + t.right) / 2 - u; else if (mt(s)) {
                    const t = Object.keys(s)[0], e = s[t];
                    _ = this.chart.scales[t].getPixelForValue(e)
                }
                w = this._getYAxisLabelAlignment(d).textAlign
            }
            "y" === e && ("start" === a ? P = "top" : "end" === a && (P = "bottom"));
            const D = this._getLabelSizes();
            for (m = 0, b = r.length; m < b; ++m) {
                x = r[m], y = x.label;
                const t = n.setContext(this.getContext(m));
                M = this.getPixelForTick(m) + n.labelOffset, k = this._resolveTickFontOptions(m), S = k.lineHeight, C = pt(y) ? y.length : 1;
                const e = C / 2, i = t.color, a = t.textStrokeColor, h = t.textStrokeWidth;
                let d, u = w;
                if (o ? (_ = M, "inner" === w && (u = m === b - 1 ? this.options.reverse ? "left" : "right" : 0 === m ? this.options.reverse ? "right" : "left" : "center"), A = "top" === s ? "near" === l || 0 !== g ? -C * S + S / 2 : "center" === l ? -D.highest.height / 2 - e * S + S : -D.highest.height + S / 2 : "near" === l || 0 !== g ? S / 2 : "center" === l ? D.highest.height / 2 - e * S : D.highest.height - C * S, c && (A *= -1)) : (v = M, A = (1 - C) * S / 2), t.showLabelBackdrop) {
                    const e = bi(t.backdropPadding), i = D.heights[m], s = D.widths[m];
                    let n = v + A - e.top, o = _ - e.left;
                    switch (P) {
                        case"middle":
                            n -= i / 2;
                            break;
                        case"bottom":
                            n -= i
                    }
                    switch (w) {
                        case"center":
                            o -= s / 2;
                            break;
                        case"right":
                            o -= s
                    }
                    d = {left: o, top: n, width: s + e.width, height: i + e.height, color: t.backdropColor}
                }
                p.push({
                    rotation: g,
                    label: y,
                    font: k,
                    color: i,
                    strokeColor: a,
                    strokeWidth: h,
                    textOffset: A,
                    textAlign: u,
                    textBaseline: P,
                    translation: [_, v],
                    backdrop: d
                })
            }
            return p
        }

        _getXAxisLabelAlignment() {
            const {position: t, ticks: e} = this.options;
            if (-Zt(this.labelRotation)) return "top" === t ? "left" : "right";
            let i = "center";
            return "start" === e.align ? i = "left" : "end" === e.align ? i = "right" : "inner" === e.align && (i = "inner"), i
        }

        _getYAxisLabelAlignment(t) {
            const {position: e, ticks: {crossAlign: i, mirror: s, padding: n}} = this.options, o = t + n,
                r = this._getLabelSizes().widest.width;
            let a, l;
            return "left" === e ? s ? (l = this.right + n, "near" === i ? a = "left" : "center" === i ? (a = "center", l += r / 2) : (a = "right", l += r)) : (l = this.right - o, "near" === i ? a = "right" : "center" === i ? (a = "center", l -= r / 2) : (a = "left", l = this.left)) : "right" === e ? s ? (l = this.left + n, "near" === i ? a = "right" : "center" === i ? (a = "center", l -= r / 2) : (a = "left", l -= r)) : (l = this.left + o, "near" === i ? a = "left" : "center" === i ? (a = "center", l += r / 2) : (a = "right", l = this.right)) : a = "right", {
                textAlign: a,
                x: l
            }
        }

        _computeLabelArea() {
            if (this.options.ticks.mirror) return;
            const t = this.chart, e = this.options.position;
            return "left" === e || "right" === e ? {
                top: 0,
                left: this.left,
                bottom: t.height,
                right: this.right
            } : "top" === e || "bottom" === e ? {top: this.top, left: 0, bottom: this.bottom, right: t.width} : void 0
        }

        drawBackground() {
            const {ctx: t, options: {backgroundColor: e}, left: i, top: s, width: n, height: o} = this;
            e && (t.save(), t.fillStyle = e, t.fillRect(i, s, n, o), t.restore())
        }

        getLineWidthForValue(t) {
            const e = this.options.grid;
            if (!this._isVisible() || !e.display) return 0;
            const i = this.ticks.findIndex((e => e.value === t));
            return i >= 0 ? e.setContext(this.getContext(i)).lineWidth : 0
        }

        drawGrid(t) {
            const e = this.options.grid, i = this.ctx,
                s = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
            let n, o;
            const r = (t, e, s) => {
                s.width && s.color && (i.save(), i.lineWidth = s.width, i.strokeStyle = s.color, i.setLineDash(s.borderDash || []), i.lineDashOffset = s.borderDashOffset, i.beginPath(), i.moveTo(t.x, t.y), i.lineTo(e.x, e.y), i.stroke(), i.restore())
            };
            if (e.display) for (n = 0, o = s.length; n < o; ++n) {
                const t = s[n];
                e.drawOnChartArea && r({x: t.x1, y: t.y1}, {x: t.x2, y: t.y2}, t), e.drawTicks && r({
                    x: t.tx1,
                    y: t.ty1
                }, {x: t.tx2, y: t.ty2}, {
                    color: t.tickColor,
                    width: t.tickWidth,
                    borderDash: t.tickBorderDash,
                    borderDashOffset: t.tickBorderDashOffset
                })
            }
        }

        drawBorder() {
            const {chart: t, ctx: e, options: {grid: i}} = this, s = i.setContext(this.getContext()),
                n = i.drawBorder ? s.borderWidth : 0;
            if (!n) return;
            const o = i.setContext(this.getContext(0)).lineWidth, r = this._borderValue;
            let a, l, h, c;
            this.isHorizontal() ? (a = Qe(t, this.left, n) - n / 2, l = Qe(t, this.right, o) + o / 2, h = c = r) : (h = Qe(t, this.top, n) - n / 2, c = Qe(t, this.bottom, o) + o / 2, a = l = r), e.save(), e.lineWidth = s.borderWidth, e.strokeStyle = s.borderColor, e.beginPath(), e.moveTo(a, h), e.lineTo(l, c), e.stroke(), e.restore()
        }

        drawLabels(t) {
            if (!this.options.ticks.display) return;
            const e = this.ctx, i = this._computeLabelArea();
            i && si(e, i);
            const s = this._labelItems || (this._labelItems = this._computeLabelItems(t));
            let n, o;
            for (n = 0, o = s.length; n < o; ++n) {
                const t = s[n], i = t.font, o = t.label;
                t.backdrop && (e.fillStyle = t.backdrop.color, e.fillRect(t.backdrop.left, t.backdrop.top, t.backdrop.width, t.backdrop.height)), ai(e, o, 0, t.textOffset, i, t)
            }
            i && ni(e)
        }

        drawTitle() {
            const {ctx: t, options: {position: e, title: i, reverse: s}} = this;
            if (!i.display) return;
            const n = xi(i.font), o = bi(i.padding), r = i.align;
            let a = n.lineHeight / 2;
            "bottom" === e || "center" === e || mt(e) ? (a += o.bottom, pt(i.text) && (a += n.lineHeight * (i.text.length - 1))) : a += o.top;
            const {titleX: l, titleY: h, maxWidth: c, rotation: d} = function (t, e, i, s) {
                const {top: n, left: o, bottom: r, right: a, chart: l} = t, {chartArea: h, scales: c} = l;
                let d, u, f, g = 0;
                const p = r - n, m = a - o;
                if (t.isHorizontal()) {
                    if (u = dt(s, o, a), mt(i)) {
                        const t = Object.keys(i)[0], s = i[t];
                        f = c[t].getPixelForValue(s) + p - e
                    } else f = "center" === i ? (h.bottom + h.top) / 2 + p - e : jn(t, i, e);
                    d = a - o
                } else {
                    if (mt(i)) {
                        const t = Object.keys(i)[0], s = i[t];
                        u = c[t].getPixelForValue(s) - m + e
                    } else u = "center" === i ? (h.left + h.right) / 2 - m + e : jn(t, i, e);
                    f = dt(s, r, n), g = "left" === i ? -jt : jt
                }
                return {titleX: u, titleY: f, maxWidth: d, rotation: g}
            }(this, a, e, r);
            ai(t, i.text, 0, 0, n, {
                color: i.color,
                maxWidth: c,
                rotation: d,
                textAlign: Gn(r, e, s),
                textBaseline: "middle",
                translation: [l, h]
            })
        }

        draw(t) {
            this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t))
        }

        _layers() {
            const t = this.options, e = t.ticks && t.ticks.z || 0, i = yt(t.grid && t.grid.z, -1);
            return this._isVisible() && this.draw === qn.prototype.draw ? [{
                z: i, draw: t => {
                    this.drawBackground(), this.drawGrid(t), this.drawTitle()
                }
            }, {
                z: i + 1, draw: () => {
                    this.drawBorder()
                }
            }, {
                z: e, draw: t => {
                    this.drawLabels(t)
                }
            }] : [{
                z: e, draw: t => {
                    this.draw(t)
                }
            }]
        }

        getMatchingVisibleMetas(t) {
            const e = this.chart.getSortedVisibleDatasetMetas(), i = this.axis + "AxisID", s = [];
            let n, o;
            for (n = 0, o = e.length; n < o; ++n) {
                const o = e[n];
                o[i] !== this.id || t && o.type !== t || s.push(o)
            }
            return s
        }

        _resolveTickFontOptions(t) {
            return xi(this.options.ticks.setContext(this.getContext(t)).font)
        }

        _maxDigits() {
            const t = this._resolveTickFontOptions(0).lineHeight;
            return (this.isHorizontal() ? this.width : this.height) / t
        }
    }

    class Kn {
        constructor(t, e, i) {
            this.type = t, this.scope = e, this.override = i, this.items = Object.create(null)
        }

        isForType(t) {
            return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype)
        }

        register(t) {
            const e = Object.getPrototypeOf(t);
            let i;
            (function (t) {
                return "id" in t && "defaults" in t
            })(e) && (i = this.register(e));
            const s = this.items, n = t.id, o = this.scope + "." + n;
            if (!n) throw new Error("class does not have id: " + t);
            return n in s || (s[n] = t, function (t, e, i) {
                const s = At(Object.create(null), [i ? Ke.get(i) : {}, Ke.get(e), t.defaults]);
                Ke.set(e, s), t.defaultRoutes && function (t, e) {
                    Object.keys(e).forEach((i => {
                        const s = i.split("."), n = s.pop(), o = [t].concat(s).join("."), r = e[i].split("."),
                            a = r.pop(), l = r.join(".");
                        Ke.route(o, n, l, a)
                    }))
                }(e, t.defaultRoutes), t.descriptors && Ke.describe(e, t.descriptors)
            }(t, o, i), this.override && Ke.override(t.id, t.overrides)), o
        }

        get(t) {
            return this.items[t]
        }

        unregister(t) {
            const e = this.items, i = t.id, s = this.scope;
            i in e && delete e[i], s && i in Ke[s] && (delete Ke[s][i], this.override && delete Ye[i])
        }
    }

    var Jn = new class {
        constructor() {
            this.controllers = new Kn($s, "datasets", !0), this.elements = new Kn(Wn, "elements"), this.plugins = new Kn(Object, "plugins"), this.scales = new Kn(qn, "scales"), this._typedRegistries = [this.controllers, this.scales, this.elements]
        }

        add(...t) {
            this._each("register", t)
        }

        remove(...t) {
            this._each("unregister", t)
        }

        addControllers(...t) {
            this._each("register", t, this.controllers)
        }

        addElements(...t) {
            this._each("register", t, this.elements)
        }

        addPlugins(...t) {
            this._each("register", t, this.plugins)
        }

        addScales(...t) {
            this._each("register", t, this.scales)
        }

        getController(t) {
            return this._get(t, this.controllers, "controller")
        }

        getElement(t) {
            return this._get(t, this.elements, "element")
        }

        getPlugin(t) {
            return this._get(t, this.plugins, "plugin")
        }

        getScale(t) {
            return this._get(t, this.scales, "scale")
        }

        removeControllers(...t) {
            this._each("unregister", t, this.controllers)
        }

        removeElements(...t) {
            this._each("unregister", t, this.elements)
        }

        removePlugins(...t) {
            this._each("unregister", t, this.plugins)
        }

        removeScales(...t) {
            this._each("unregister", t, this.scales)
        }

        _each(t, e, i) {
            [...e].forEach((e => {
                const s = i || this._getRegistryForType(e);
                i || s.isForType(e) || s === this.plugins && e.id ? this._exec(t, s, e) : wt(e, (e => {
                    const s = i || this._getRegistryForType(e);
                    this._exec(t, s, e)
                }))
            }))
        }

        _exec(t, e, i) {
            const s = Lt(t);
            vt(i["before" + s], [], i), e[t](i), vt(i["after" + s], [], i)
        }

        _getRegistryForType(t) {
            for (let e = 0; e < this._typedRegistries.length; e++) {
                const i = this._typedRegistries[e];
                if (i.isForType(t)) return i
            }
            return this.plugins
        }

        _get(t, e, i) {
            const s = e.get(t);
            if (void 0 === s) throw new Error('"' + t + '" is not a registered ' + i + ".");
            return s
        }
    };

    class Zn {
        constructor() {
            this._init = []
        }

        notify(t, e, i, s) {
            "beforeInit" === e && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install"));
            const n = s ? this._descriptors(t).filter(s) : this._descriptors(t), o = this._notify(n, t, e, i);
            return "afterDestroy" === e && (this._notify(n, t, "stop"), this._notify(this._init, t, "uninstall")), o
        }

        _notify(t, e, i, s) {
            s = s || {};
            for (const n of t) {
                const t = n.plugin;
                if (!1 === vt(t[i], [e, s, n.options], t) && s.cancelable) return !1
            }
            return !0
        }

        invalidate() {
            gt(this._cache) || (this._oldCache = this._cache, this._cache = void 0)
        }

        _descriptors(t) {
            if (this._cache) return this._cache;
            const e = this._cache = this._createDescriptors(t);
            return this._notifyStateChanges(t), e
        }

        _createDescriptors(t, e) {
            const i = t && t.config, s = yt(i.options && i.options.plugins, {}), n = function (t) {
                const e = [], i = Object.keys(Jn.plugins.items);
                for (let t = 0; t < i.length; t++) e.push(Jn.getPlugin(i[t]));
                const s = t.plugins || [];
                for (let t = 0; t < s.length; t++) {
                    const i = s[t];
                    -1 === e.indexOf(i) && e.push(i)
                }
                return e
            }(i);
            return !1 !== s || e ? function (t, e, i, s) {
                const n = [], o = t.getContext();
                for (let r = 0; r < e.length; r++) {
                    const a = e[r], l = Qn(i[a.id], s);
                    null !== l && n.push({plugin: a, options: to(t.config, a, l, o)})
                }
                return n
            }(t, n, s, e) : []
        }

        _notifyStateChanges(t) {
            const e = this._oldCache || [], i = this._cache,
                s = (t, e) => t.filter((t => !e.some((e => t.plugin.id === e.plugin.id))));
            this._notify(s(e, i), t, "stop"), this._notify(s(i, e), t, "start")
        }
    }

    function Qn(t, e) {
        return e || !1 !== t ? !0 === t ? {} : t : null
    }

    function to(t, e, i, s) {
        const n = t.pluginScopeKeys(e), o = t.getOptionScopes(i, n);
        return t.createResolver(o, s, [""], {scriptable: !1, indexable: !1, allKeys: !0})
    }

    function eo(t, e) {
        const i = Ke.datasets[t] || {};
        return ((e.datasets || {})[t] || {}).indexAxis || e.indexAxis || i.indexAxis || "x"
    }

    function io(t, e) {
        return "x" === t || "y" === t ? t : e.axis || ("top" === (i = e.position) || "bottom" === i ? "x" : "left" === i || "right" === i ? "y" : void 0) || t.charAt(0).toLowerCase();
        var i
    }

    function so(t) {
        const e = t.options || (t.options = {});
        e.plugins = yt(e.plugins, {}), e.scales = function (t, e) {
            const i = Ye[t.type] || {scales: {}}, s = e.scales || {}, n = eo(t.type, e), o = Object.create(null),
                r = Object.create(null);
            return Object.keys(s).forEach((t => {
                const e = s[t];
                if (!mt(e)) return console.error(`Invalid scale configuration for scale: ${t}`);
                if (e._proxy) return console.warn(`Ignoring resolver passed as options for scale: ${t}`);
                const a = io(t, e), l = function (t, e) {
                    return t === e ? "_index_" : "_value_"
                }(a, n), h = i.scales || {};
                o[a] = o[a] || t, r[t] = Pt(Object.create(null), [{axis: a}, e, h[a], h[l]])
            })), t.data.datasets.forEach((i => {
                const n = i.type || t.type, a = i.indexAxis || eo(n, e), l = (Ye[n] || {}).scales || {};
                Object.keys(l).forEach((t => {
                    const e = function (t, e) {
                        let i = t;
                        return "_index_" === t ? i = e : "_value_" === t && (i = "x" === e ? "y" : "x"), i
                    }(t, a), n = i[e + "AxisID"] || o[e] || e;
                    r[n] = r[n] || Object.create(null), Pt(r[n], [{axis: e}, s[n], l[t]])
                }))
            })), Object.keys(r).forEach((t => {
                const e = r[t];
                Pt(e, [Ke.scales[e.type], Ke.scale])
            })), r
        }(t, e)
    }

    function no(t) {
        return (t = t || {}).datasets = t.datasets || [], t.labels = t.labels || [], t
    }

    const oo = new Map, ro = new Set;

    function ao(t, e) {
        let i = oo.get(t);
        return i || (i = e(), oo.set(t, i), ro.add(i)), i
    }

    const lo = (t, e, i) => {
        const s = Rt(e, i);
        void 0 !== s && t.add(s)
    };

    class ho {
        constructor(t) {
            this._config = function (t) {
                return (t = t || {}).data = no(t.data), so(t), t
            }(t), this._scopeCache = new Map, this._resolverCache = new Map
        }

        get platform() {
            return this._config.platform
        }

        get type() {
            return this._config.type
        }

        set type(t) {
            this._config.type = t
        }

        get data() {
            return this._config.data
        }

        set data(t) {
            this._config.data = no(t)
        }

        get options() {
            return this._config.options
        }

        set options(t) {
            this._config.options = t
        }

        get plugins() {
            return this._config.plugins
        }

        update() {
            const t = this._config;
            this.clearCache(), so(t)
        }

        clearCache() {
            this._scopeCache.clear(), this._resolverCache.clear()
        }

        datasetScopeKeys(t) {
            return ao(t, (() => [[`datasets.${t}`, ""]]))
        }

        datasetAnimationScopeKeys(t, e) {
            return ao(`${t}.transition.${e}`, (() => [[`datasets.${t}.transitions.${e}`, `transitions.${e}`], [`datasets.${t}`, ""]]))
        }

        datasetElementScopeKeys(t, e) {
            return ao(`${t}-${e}`, (() => [[`datasets.${t}.elements.${e}`, `datasets.${t}`, `elements.${e}`, ""]]))
        }

        pluginScopeKeys(t) {
            const e = t.id;
            return ao(`${this.type}-plugin-${e}`, (() => [[`plugins.${e}`, ...t.additionalOptionScopes || []]]))
        }

        _cachedScopes(t, e) {
            const i = this._scopeCache;
            let s = i.get(t);
            return s && !e || (s = new Map, i.set(t, s)), s
        }

        getOptionScopes(t, e, i) {
            const {options: s, type: n} = this, o = this._cachedScopes(t, i), r = o.get(e);
            if (r) return r;
            const a = new Set;
            e.forEach((e => {
                t && (a.add(t), e.forEach((e => lo(a, t, e)))), e.forEach((t => lo(a, s, t))), e.forEach((t => lo(a, Ye[n] || {}, t))), e.forEach((t => lo(a, Ke, t))), e.forEach((t => lo(a, Xe, t)))
            }));
            const l = Array.from(a);
            return 0 === l.length && l.push(Object.create(null)), ro.has(e) && o.set(e, l), l
        }

        chartOptionScopes() {
            const {options: t, type: e} = this;
            return [t, Ye[e] || {}, Ke.datasets[e] || {}, {type: e}, Ke, Xe]
        }

        resolveNamedOptions(t, e, i, s = [""]) {
            const n = {$shared: !0}, {resolver: o, subPrefixes: r} = co(this._resolverCache, t, s);
            let a = o;
            (function (t, e) {
                const {isScriptable: i, isIndexable: s} = Di(t);
                for (const n of e) {
                    const e = i(n), o = s(n), r = (o || e) && t[n];
                    if (e && ($t(r) || uo(r)) || o && pt(r)) return !0
                }
                return !1
            })(o, e) && (n.$shared = !1, a = Pi(o, i = $t(i) ? i() : i, this.createResolver(t, i, r)));
            for (const t of e) n[t] = a[t];
            return n
        }

        createResolver(t, e, i = [""], s) {
            const {resolver: n} = co(this._resolverCache, t, i);
            return mt(e) ? Pi(n, e, void 0, s) : n
        }
    }

    function co(t, e, i) {
        let s = t.get(e);
        s || (s = new Map, t.set(e, s));
        const n = i.join();
        let o = s.get(n);
        return o || (o = {
            resolver: Ai(e, i),
            subPrefixes: i.filter((t => !t.toLowerCase().includes("hover")))
        }, s.set(n, o)), o
    }

    const uo = t => mt(t) && Object.getOwnPropertyNames(t).reduce(((e, i) => e || $t(t[i])), !1),
        fo = ["top", "bottom", "left", "right", "chartArea"];

    function go(t, e) {
        return "top" === t || "bottom" === t || -1 === fo.indexOf(t) && "x" === e
    }

    function po(t, e) {
        return function (i, s) {
            return i[t] === s[t] ? i[e] - s[e] : i[t] - s[t]
        }
    }

    function mo(t) {
        const e = t.chart, i = e.options.animation;
        e.notifyPlugins("afterRender"), vt(i && i.onComplete, [t], e)
    }

    function bo(t) {
        const e = t.chart, i = e.options.animation;
        vt(i && i.onProgress, [t], e)
    }

    function xo(t) {
        return Xi() && "string" == typeof t ? t = document.getElementById(t) : t && t.length && (t = t[0]), t && t.canvas && (t = t.canvas), t
    }

    const yo = {}, _o = t => {
        const e = xo(t);
        return Object.values(yo).filter((t => t.canvas === e)).pop()
    };

    function vo(t, e, i) {
        const s = Object.keys(t);
        for (const n of s) {
            const s = +n;
            if (s >= e) {
                const o = t[n];
                delete t[n], (i > 0 || s > e) && (t[s + i] = o)
            }
        }
    }

    class wo {
        constructor(t, e) {
            const i = this.config = new ho(e), s = xo(t), n = _o(s);
            if (n) throw new Error("Canvas is already in use. Chart with ID '" + n.id + "' must be destroyed before the canvas can be reused.");
            const o = i.createResolver(i.chartOptionScopes(), this.getContext());
            this.platform = new (i.platform || function (t) {
                return !Xi() || "undefined" != typeof OffscreenCanvas && t instanceof OffscreenCanvas ? Mn : Fn
            }(s)), this.platform.updateConfig(i);
            const r = this.platform.acquireContext(s, o.aspectRatio), a = r && r.canvas, l = a && a.height,
                h = a && a.width;
            this.id = ft(), this.ctx = r, this.canvas = a, this.width = h, this.height = l, this._options = o, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Zn, this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = function (t, e) {
                let i;
                return function (...s) {
                    return e ? (clearTimeout(i), i = setTimeout(t, e, s)) : t.apply(this, s), e
                }
            }((t => this.update(t)), o.resizeDelay || 0), this._dataChanges = [], yo[this.id] = this, r && a ? (ys.listen(this, "complete", mo), ys.listen(this, "progress", bo), this._initialize(), this.attached && this.update()) : console.error("Failed to create chart: can't acquire context from the given item")
        }

        get aspectRatio() {
            const {options: {aspectRatio: t, maintainAspectRatio: e}, width: i, height: s, _aspectRatio: n} = this;
            return gt(t) ? e && n ? n : s ? i / s : null : t
        }

        get data() {
            return this.config.data
        }

        set data(t) {
            this.config.data = t
        }

        get options() {
            return this._options
        }

        set options(t) {
            this.config.options = t
        }

        _initialize() {
            return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : is(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this
        }

        clear() {
            return ti(this.canvas, this.ctx), this
        }

        stop() {
            return ys.stop(this), this
        }

        resize(t, e) {
            ys.running(this) ? this._resizeBeforeDraw = {width: t, height: e} : this._resize(t, e)
        }

        _resize(t, e) {
            const i = this.options, s = this.canvas, n = i.maintainAspectRatio && this.aspectRatio,
                o = this.platform.getMaximumSize(s, t, e, n),
                r = i.devicePixelRatio || this.platform.getDevicePixelRatio(), a = this.width ? "resize" : "attach";
            this.width = o.width, this.height = o.height, this._aspectRatio = this.aspectRatio, is(this, r, !0) && (this.notifyPlugins("resize", {size: o}), vt(i.onResize, [this, o], this), this.attached && this._doResize(a) && this.render())
        }

        ensureScalesHaveIDs() {
            wt(this.options.scales || {}, ((t, e) => {
                t.id = e
            }))
        }

        buildOrUpdateScales() {
            const t = this.options, e = t.scales, i = this.scales,
                s = Object.keys(i).reduce(((t, e) => (t[e] = !1, t)), {});
            let n = [];
            e && (n = n.concat(Object.keys(e).map((t => {
                const i = e[t], s = io(t, i), n = "r" === s, o = "x" === s;
                return {
                    options: i,
                    dposition: n ? "chartArea" : o ? "bottom" : "left",
                    dtype: n ? "radialLinear" : o ? "category" : "linear"
                }
            })))), wt(n, (e => {
                const n = e.options, o = n.id, r = io(o, n), a = yt(n.type, e.dtype);
                void 0 !== n.position && go(n.position, r) === go(e.dposition) || (n.position = e.dposition), s[o] = !0;
                let l = null;
                o in i && i[o].type === a ? l = i[o] : (l = new (Jn.getScale(a))({
                    id: o,
                    type: a,
                    ctx: this.ctx,
                    chart: this
                }), i[l.id] = l), l.init(n, t)
            })), wt(s, ((t, e) => {
                t || delete i[e]
            })), wt(i, (t => {
                vn.configure(this, t, t.options), vn.addBox(this, t)
            }))
        }

        _updateMetasets() {
            const t = this._metasets, e = this.data.datasets.length, i = t.length;
            if (t.sort(((t, e) => t.index - e.index)), i > e) {
                for (let t = e; t < i; ++t) this._destroyDatasetMeta(t);
                t.splice(e, i - e)
            }
            this._sortedMetasets = t.slice(0).sort(po("order", "index"))
        }

        _removeUnreferencedMetasets() {
            const {_metasets: t, data: {datasets: e}} = this;
            t.length > e.length && delete this._stacks, t.forEach(((t, i) => {
                0 === e.filter((e => e === t._dataset)).length && this._destroyDatasetMeta(i)
            }))
        }

        buildOrUpdateControllers() {
            const t = [], e = this.data.datasets;
            let i, s;
            for (this._removeUnreferencedMetasets(), i = 0, s = e.length; i < s; i++) {
                const s = e[i];
                let n = this.getDatasetMeta(i);
                const o = s.type || this.config.type;
                if (n.type && n.type !== o && (this._destroyDatasetMeta(i), n = this.getDatasetMeta(i)), n.type = o, n.indexAxis = s.indexAxis || eo(o, this.options), n.order = s.order || 0, n.index = i, n.label = "" + s.label, n.visible = this.isDatasetVisible(i), n.controller) n.controller.updateIndex(i), n.controller.linkScales(); else {
                    const e = Jn.getController(o), {datasetElementType: s, dataElementType: r} = Ke.datasets[o];
                    Object.assign(e.prototype, {
                        dataElementType: Jn.getElement(r),
                        datasetElementType: s && Jn.getElement(s)
                    }), n.controller = new e(this, i), t.push(n.controller)
                }
            }
            return this._updateMetasets(), t
        }

        _resetElements() {
            wt(this.data.datasets, ((t, e) => {
                this.getDatasetMeta(e).controller.reset()
            }), this)
        }

        reset() {
            this._resetElements(), this.notifyPlugins("reset")
        }

        update(t) {
            const e = this.config;
            e.update();
            const i = this._options = e.createResolver(e.chartOptionScopes(), this.getContext()),
                s = this._animationsDisabled = !i.animation;
            if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), !1 === this.notifyPlugins("beforeUpdate", {
                mode: t,
                cancelable: !0
            })) return;
            const n = this.buildOrUpdateControllers();
            this.notifyPlugins("beforeElementsUpdate");
            let o = 0;
            for (let t = 0, e = this.data.datasets.length; t < e; t++) {
                const {controller: e} = this.getDatasetMeta(t), i = !s && -1 === n.indexOf(e);
                e.buildOrUpdateElements(i), o = Math.max(+e.getMaxOverflow(), o)
            }
            o = this._minPadding = i.layout.autoPadding ? o : 0, this._updateLayout(o), s || wt(n, (t => {
                t.reset()
            })), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {mode: t}), this._layers.sort(po("z", "_idx"));
            const {_active: r, _lastEvent: a} = this;
            a ? this._eventHandler(a, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render()
        }

        _updateScales() {
            wt(this.scales, (t => {
                vn.removeBox(this, t)
            })), this.ensureScalesHaveIDs(), this.buildOrUpdateScales()
        }

        _checkEventBindings() {
            const t = this.options, e = new Set(Object.keys(this._listeners)), i = new Set(t.events);
            zt(e, i) && !!this._responsiveListeners === t.responsive || (this.unbindEvents(), this.bindEvents())
        }

        _updateHiddenIndices() {
            const {_hiddenIndices: t} = this, e = this._getUniformDataChanges() || [];
            for (const {method: i, start: s, count: n} of e) vo(t, s, "_removeElements" === i ? -n : n)
        }

        _getUniformDataChanges() {
            const t = this._dataChanges;
            if (!t || !t.length) return;
            this._dataChanges = [];
            const e = this.data.datasets.length,
                i = e => new Set(t.filter((t => t[0] === e)).map(((t, e) => e + "," + t.splice(1).join(",")))),
                s = i(0);
            for (let t = 1; t < e; t++) if (!zt(s, i(t))) return;
            return Array.from(s).map((t => t.split(","))).map((t => ({method: t[1], start: +t[2], count: +t[3]})))
        }

        _updateLayout(t) {
            if (!1 === this.notifyPlugins("beforeLayout", {cancelable: !0})) return;
            vn.update(this, this.width, this.height, t);
            const e = this.chartArea, i = e.width <= 0 || e.height <= 0;
            this._layers = [], wt(this.boxes, (t => {
                i && "chartArea" === t.position || (t.configure && t.configure(), this._layers.push(...t._layers()))
            }), this), this._layers.forEach(((t, e) => {
                t._idx = e
            })), this.notifyPlugins("afterLayout")
        }

        _updateDatasets(t) {
            if (!1 !== this.notifyPlugins("beforeDatasetsUpdate", {mode: t, cancelable: !0})) {
                for (let t = 0, e = this.data.datasets.length; t < e; ++t) this.getDatasetMeta(t).controller.configure();
                for (let e = 0, i = this.data.datasets.length; e < i; ++e) this._updateDataset(e, $t(t) ? t({datasetIndex: e}) : t);
                this.notifyPlugins("afterDatasetsUpdate", {mode: t})
            }
        }

        _updateDataset(t, e) {
            const i = this.getDatasetMeta(t), s = {meta: i, index: t, mode: e, cancelable: !0};
            !1 !== this.notifyPlugins("beforeDatasetUpdate", s) && (i.controller._update(e), s.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", s))
        }

        render() {
            !1 !== this.notifyPlugins("beforeRender", {cancelable: !0}) && (ys.has(this) ? this.attached && !ys.running(this) && ys.start(this) : (this.draw(), mo({chart: this})))
        }

        draw() {
            let t;
            if (this._resizeBeforeDraw) {
                const {width: t, height: e} = this._resizeBeforeDraw;
                this._resize(t, e), this._resizeBeforeDraw = null
            }
            if (this.clear(), this.width <= 0 || this.height <= 0) return;
            if (!1 === this.notifyPlugins("beforeDraw", {cancelable: !0})) return;
            const e = this._layers;
            for (t = 0; t < e.length && e[t].z <= 0; ++t) e[t].draw(this.chartArea);
            for (this._drawDatasets(); t < e.length; ++t) e[t].draw(this.chartArea);
            this.notifyPlugins("afterDraw")
        }

        _getSortedDatasetMetas(t) {
            const e = this._sortedMetasets, i = [];
            let s, n;
            for (s = 0, n = e.length; s < n; ++s) {
                const n = e[s];
                t && !n.visible || i.push(n)
            }
            return i
        }

        getSortedVisibleDatasetMetas() {
            return this._getSortedDatasetMetas(!0)
        }

        _drawDatasets() {
            if (!1 === this.notifyPlugins("beforeDatasetsDraw", {cancelable: !0})) return;
            const t = this.getSortedVisibleDatasetMetas();
            for (let e = t.length - 1; e >= 0; --e) this._drawDataset(t[e]);
            this.notifyPlugins("afterDatasetsDraw")
        }

        _drawDataset(t) {
            const e = this.ctx, i = t._clip, s = !i.disabled, n = this.chartArea,
                o = {meta: t, index: t.index, cancelable: !0};
            !1 !== this.notifyPlugins("beforeDatasetDraw", o) && (s && si(e, {
                left: !1 === i.left ? 0 : n.left - i.left,
                right: !1 === i.right ? this.width : n.right + i.right,
                top: !1 === i.top ? 0 : n.top - i.top,
                bottom: !1 === i.bottom ? this.height : n.bottom + i.bottom
            }), t.controller.draw(), s && ni(e), o.cancelable = !1, this.notifyPlugins("afterDatasetDraw", o))
        }

        isPointInArea(t) {
            return ii(t, this.chartArea, this._minPadding)
        }

        getElementsAtEventForMode(t, e, i, s) {
            const n = hn.modes[e];
            return "function" == typeof n ? n(this, t, i, s) : []
        }

        getDatasetMeta(t) {
            const e = this.data.datasets[t], i = this._metasets;
            let s = i.filter((t => t && t._dataset === e)).pop();
            return s || (s = {
                type: null,
                data: [],
                dataset: null,
                controller: null,
                hidden: null,
                xAxisID: null,
                yAxisID: null,
                order: e && e.order || 0,
                index: t,
                _dataset: e,
                _parsed: [],
                _sorted: !1
            }, i.push(s)), s
        }

        getContext() {
            return this.$context || (this.$context = _i(null, {chart: this, type: "chart"}))
        }

        getVisibleDatasetCount() {
            return this.getSortedVisibleDatasetMetas().length
        }

        isDatasetVisible(t) {
            const e = this.data.datasets[t];
            if (!e) return !1;
            const i = this.getDatasetMeta(t);
            return "boolean" == typeof i.hidden ? !i.hidden : !e.hidden
        }

        setDatasetVisibility(t, e) {
            this.getDatasetMeta(t).hidden = !e
        }

        toggleDataVisibility(t) {
            this._hiddenIndices[t] = !this._hiddenIndices[t]
        }

        getDataVisibility(t) {
            return !this._hiddenIndices[t]
        }

        _updateVisibility(t, e, i) {
            const s = i ? "show" : "hide", n = this.getDatasetMeta(t), o = n.controller._resolveAnimations(void 0, s);
            It(e) ? (n.data[e].hidden = !i, this.update()) : (this.setDatasetVisibility(t, i), o.update(n, {visible: i}), this.update((e => e.datasetIndex === t ? s : void 0)))
        }

        hide(t, e) {
            this._updateVisibility(t, e, !1)
        }

        show(t, e) {
            this._updateVisibility(t, e, !0)
        }

        _destroyDatasetMeta(t) {
            const e = this._metasets[t];
            e && e.controller && e.controller._destroy(), delete this._metasets[t]
        }

        _stop() {
            let t, e;
            for (this.stop(), ys.remove(this), t = 0, e = this.data.datasets.length; t < e; ++t) this._destroyDatasetMeta(t)
        }

        destroy() {
            this.notifyPlugins("beforeDestroy");
            const {canvas: t, ctx: e} = this;
            this._stop(), this.config.clearCache(), t && (this.unbindEvents(), ti(t, e), this.platform.releaseContext(e), this.canvas = null, this.ctx = null), this.notifyPlugins("destroy"), delete yo[this.id], this.notifyPlugins("afterDestroy")
        }

        toBase64Image(...t) {
            return this.canvas.toDataURL(...t)
        }

        bindEvents() {
            this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0
        }

        bindUserEvents() {
            const t = this._listeners, e = this.platform, i = (i, s) => {
                e.addEventListener(this, i, s), t[i] = s
            }, s = (t, e, i) => {
                t.offsetX = e, t.offsetY = i, this._eventHandler(t)
            };
            wt(this.options.events, (t => i(t, s)))
        }

        bindResponsiveEvents() {
            this._responsiveListeners || (this._responsiveListeners = {});
            const t = this._responsiveListeners, e = this.platform, i = (i, s) => {
                e.addEventListener(this, i, s), t[i] = s
            }, s = (i, s) => {
                t[i] && (e.removeEventListener(this, i, s), delete t[i])
            }, n = (t, e) => {
                this.canvas && this.resize(t, e)
            };
            let o;
            const r = () => {
                s("attach", r), this.attached = !0, this.resize(), i("resize", n), i("detach", o)
            };
            o = () => {
                this.attached = !1, s("resize", n), this._stop(), this._resize(0, 0), i("attach", r)
            }, e.isAttached(this.canvas) ? r() : o()
        }

        unbindEvents() {
            wt(this._listeners, ((t, e) => {
                this.platform.removeEventListener(this, e, t)
            })), this._listeners = {}, wt(this._responsiveListeners, ((t, e) => {
                this.platform.removeEventListener(this, e, t)
            })), this._responsiveListeners = void 0
        }

        updateHoverStyle(t, e, i) {
            const s = i ? "set" : "remove";
            let n, o, r, a;
            for ("dataset" === e && (n = this.getDatasetMeta(t[0].datasetIndex), n.controller["_" + s + "DatasetHoverStyle"]()), r = 0, a = t.length; r < a; ++r) {
                o = t[r];
                const e = o && this.getDatasetMeta(o.datasetIndex).controller;
                e && e[s + "HoverStyle"](o.element, o.datasetIndex, o.index)
            }
        }

        getActiveElements() {
            return this._active || []
        }

        setActiveElements(t) {
            const e = this._active || [], i = t.map((({datasetIndex: t, index: e}) => {
                const i = this.getDatasetMeta(t);
                if (!i) throw new Error("No dataset found at index " + t);
                return {datasetIndex: t, element: i.data[e], index: e}
            }));
            !Mt(i, e) && (this._active = i, this._lastEvent = null, this._updateHoverStyles(i, e))
        }

        notifyPlugins(t, e, i) {
            return this._plugins.notify(this, t, e, i)
        }

        _updateHoverStyles(t, e, i) {
            const s = this.options.hover,
                n = (t, e) => t.filter((t => !e.some((e => t.datasetIndex === e.datasetIndex && t.index === e.index)))),
                o = n(e, t), r = i ? t : n(t, e);
            o.length && this.updateHoverStyle(o, s.mode, !1), r.length && s.mode && this.updateHoverStyle(r, s.mode, !0)
        }

        _eventHandler(t, e) {
            const i = {event: t, replay: e, cancelable: !0, inChartArea: this.isPointInArea(t)},
                s = e => (e.options.events || this.options.events).includes(t.native.type);
            if (!1 === this.notifyPlugins("beforeEvent", i, s)) return;
            const n = this._handleEvent(t, e, i.inChartArea);
            return i.cancelable = !1, this.notifyPlugins("afterEvent", i, s), (n || i.changed) && this.render(), this
        }

        _handleEvent(t, e, i) {
            const {_active: s = [], options: n} = this, o = e, r = this._getActiveElements(t, s, i, o),
                a = function (t) {
                    return "mouseup" === t.type || "click" === t.type || "contextmenu" === t.type
                }(t), l = function (t, e, i, s) {
                    return i && "mouseout" !== t.type ? s ? e : t : null
                }(t, this._lastEvent, i, a);
            i && (this._lastEvent = null, vt(n.onHover, [t, r, this], this), a && vt(n.onClick, [t, r, this], this));
            const h = !Mt(r, s);
            return (h || e) && (this._active = r, this._updateHoverStyles(r, s, e)), this._lastEvent = l, h
        }

        _getActiveElements(t, e, i, s) {
            if ("mouseout" === t.type) return [];
            if (!i) return e;
            const n = this.options.hover;
            return this.getElementsAtEventForMode(t, n.mode, n, s)
        }
    }

    const Mo = () => wt(wo.instances, (t => t._plugins.invalidate())), ko = !0;

    function So(t, e, i) {
        const {startAngle: s, pixelMargin: n, x: o, y: r, outerRadius: a, innerRadius: l} = e;
        let h = n / a;
        t.beginPath(), t.arc(o, r, a, s - h, i + h), l > n ? (h = n / l, t.arc(o, r, l, i + h, s - h, !0)) : t.arc(o, r, n, i + jt, s - jt), t.closePath(), t.clip()
    }

    function Co(t, e, i, s) {
        return {x: i + t * Math.cos(e), y: s + t * Math.sin(e)}
    }

    function Ao(t, e, i, s, n) {
        const {x: o, y: r, startAngle: a, pixelMargin: l, innerRadius: h} = e,
            c = Math.max(e.outerRadius + s + i - l, 0), d = h > 0 ? h + s + i + l : 0;
        let u = 0;
        const f = n - a;
        if (s) {
            const t = ((h > 0 ? h - s : 0) + (c > 0 ? c - s : 0)) / 2;
            u = (f - (0 !== t ? f * t / (t + s) : f)) / 2
        }
        const g = (f - Math.max(.001, f * c - i / Ft) / c) / 2, p = a + g + u, m = n - g - u, {
                outerStart: b,
                outerEnd: x,
                innerStart: y,
                innerEnd: _
            } = function (t, e, i, s) {
                const n = gi(t.options.borderRadius, ["outerStart", "outerEnd", "innerStart", "innerEnd"]), o = (i - e) / 2,
                    r = Math.min(o, s * e / 2), a = t => {
                        const e = (i - Math.min(o, t)) * s / 2;
                        return re(t, 0, Math.min(o, e))
                    };
                return {
                    outerStart: a(n.outerStart),
                    outerEnd: a(n.outerEnd),
                    innerStart: re(n.innerStart, 0, r),
                    innerEnd: re(n.innerEnd, 0, r)
                }
            }(e, d, c, m - p), v = c - b, w = c - x, M = p + b / v, k = m - x / w, S = d + y, C = d + _, A = p + y / S,
            P = m - _ / C;
        if (t.beginPath(), t.arc(o, r, c, M, k), x > 0) {
            const e = Co(w, k, o, r);
            t.arc(e.x, e.y, x, k, m + jt)
        }
        const D = Co(C, m, o, r);
        if (t.lineTo(D.x, D.y), _ > 0) {
            const e = Co(C, P, o, r);
            t.arc(e.x, e.y, _, m + jt, P + Math.PI)
        }
        if (t.arc(o, r, d, m - _ / d, p + y / d, !0), y > 0) {
            const e = Co(S, A, o, r);
            t.arc(e.x, e.y, y, A + Math.PI, p - jt)
        }
        const O = Co(v, p, o, r);
        if (t.lineTo(O.x, O.y), b > 0) {
            const e = Co(v, M, o, r);
            t.arc(e.x, e.y, b, p - jt, M)
        }
        t.closePath()
    }

    Object.defineProperties(wo, {
        defaults: {enumerable: ko, value: Ke},
        instances: {enumerable: ko, value: yo},
        overrides: {enumerable: ko, value: Ye},
        registry: {enumerable: ko, value: Jn},
        version: {enumerable: ko, value: "3.8.0"},
        getChart: {enumerable: ko, value: _o},
        register: {
            enumerable: ko, value: (...t) => {
                Jn.add(...t), Mo()
            }
        },
        unregister: {
            enumerable: ko, value: (...t) => {
                Jn.remove(...t), Mo()
            }
        }
    });

    class Po extends Wn {
        constructor(t) {
            super(), this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, t && Object.assign(this, t)
        }

        inRange(t, e, i) {
            const s = this.getProps(["x", "y"], i), {angle: n, distance: o} = ee(s, {x: t, y: e}), {
                    startAngle: r,
                    endAngle: a,
                    innerRadius: l,
                    outerRadius: h,
                    circumference: c
                } = this.getProps(["startAngle", "endAngle", "innerRadius", "outerRadius", "circumference"], i),
                d = this.options.spacing / 2, u = yt(c, a - r) >= Wt || oe(n, r, a), f = ae(o, l + d, h + d);
            return u && f
        }

        getCenterPoint(t) {
            const {
                x: e,
                y: i,
                startAngle: s,
                endAngle: n,
                innerRadius: o,
                outerRadius: r
            } = this.getProps(["x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius", "circumference"], t), {
                offset: a,
                spacing: l
            } = this.options, h = (s + n) / 2, c = (o + r + l + a) / 2;
            return {x: e + Math.cos(h) * c, y: i + Math.sin(h) * c}
        }

        tooltipPosition(t) {
            return this.getCenterPoint(t)
        }

        draw(t) {
            const {options: e, circumference: i} = this, s = (e.offset || 0) / 2, n = (e.spacing || 0) / 2;
            if (this.pixelMargin = "inner" === e.borderAlign ? .33 : 0, this.fullCircles = i > Wt ? Math.floor(i / Wt) : 0, 0 === i || this.innerRadius < 0 || this.outerRadius < 0) return;
            t.save();
            let o = 0;
            if (s) {
                o = s / 2;
                const e = (this.startAngle + this.endAngle) / 2;
                t.translate(Math.cos(e) * o, Math.sin(e) * o), this.circumference >= Ft && (o = s)
            }
            t.fillStyle = e.backgroundColor, t.strokeStyle = e.borderColor;
            const r = function (t, e, i, s) {
                const {fullCircles: n, startAngle: o, circumference: r} = e;
                let a = e.endAngle;
                if (n) {
                    Ao(t, e, i, s, o + Wt);
                    for (let e = 0; e < n; ++e) t.fill();
                    isNaN(r) || (a = o + r % Wt, r % Wt == 0 && (a += Wt))
                }
                return Ao(t, e, i, s, a), t.fill(), a
            }(t, this, o, n);
            (function (t, e, i, s, n) {
                const {options: o} = e, {borderWidth: r, borderJoinStyle: a} = o, l = "inner" === o.borderAlign;
                r && (l ? (t.lineWidth = 2 * r, t.lineJoin = a || "round") : (t.lineWidth = r, t.lineJoin = a || "bevel"), e.fullCircles && function (t, e, i) {
                    const {x: s, y: n, startAngle: o, pixelMargin: r, fullCircles: a} = e,
                        l = Math.max(e.outerRadius - r, 0), h = e.innerRadius + r;
                    let c;
                    for (i && So(t, e, o + Wt), t.beginPath(), t.arc(s, n, h, o + Wt, o, !0), c = 0; c < a; ++c) t.stroke();
                    for (t.beginPath(), t.arc(s, n, l, o, o + Wt), c = 0; c < a; ++c) t.stroke()
                }(t, e, l), l && So(t, e, n), Ao(t, e, i, s, n), t.stroke())
            })(t, this, o, n, r), t.restore()
        }
    }

    function Do(t, e, i = e) {
        t.lineCap = yt(i.borderCapStyle, e.borderCapStyle), t.setLineDash(yt(i.borderDash, e.borderDash)), t.lineDashOffset = yt(i.borderDashOffset, e.borderDashOffset), t.lineJoin = yt(i.borderJoinStyle, e.borderJoinStyle), t.lineWidth = yt(i.borderWidth, e.borderWidth), t.strokeStyle = yt(i.borderColor, e.borderColor)
    }

    function Oo(t, e, i) {
        t.lineTo(i.x, i.y)
    }

    function Eo(t, e, i = {}) {
        const s = t.length, {start: n = 0, end: o = s - 1} = i, {start: r, end: a} = e, l = Math.max(n, r),
            h = Math.min(o, a), c = n < r && o < r || n > a && o > a;
        return {count: s, start: l, loop: e.loop, ilen: h < l && !c ? s + h - l : h - l}
    }

    function To(t, e, i, s) {
        const {points: n, options: o} = e, {count: r, start: a, loop: l, ilen: h} = Eo(n, i, s), c = function (t) {
            return t.stepped ? oi : t.tension || "monotone" === t.cubicInterpolationMode ? ri : Oo
        }(o);
        let d, u, f, {move: g = !0, reverse: p} = s || {};
        for (d = 0; d <= h; ++d) u = n[(a + (p ? h - d : d)) % r], u.skip || (g ? (t.moveTo(u.x, u.y), g = !1) : c(t, f, u, p, o.stepped), f = u);
        return l && (u = n[(a + (p ? h : 0)) % r], c(t, f, u, p, o.stepped)), !!l
    }

    function Ro(t, e, i, s) {
        const n = e.points, {count: o, start: r, ilen: a} = Eo(n, i, s), {move: l = !0, reverse: h} = s || {};
        let c, d, u, f, g, p, m = 0, b = 0;
        const x = t => (r + (h ? a - t : t)) % o, y = () => {
            f !== g && (t.lineTo(m, g), t.lineTo(m, f), t.lineTo(m, p))
        };
        for (l && (d = n[x(0)], t.moveTo(d.x, d.y)), c = 0; c <= a; ++c) {
            if (d = n[x(c)], d.skip) continue;
            const e = d.x, i = d.y, s = 0 | e;
            s === u ? (i < f ? f = i : i > g && (g = i), m = (b * m + e) / ++b) : (y(), t.lineTo(e, i), u = s, b = 0, f = g = i), p = i
        }
        y()
    }

    function Lo(t) {
        const e = t.options, i = e.borderDash && e.borderDash.length;
        return t._decimated || t._loop || e.tension || "monotone" === e.cubicInterpolationMode || e.stepped || i ? To : Ro
    }

    Po.id = "arc", Po.defaults = {
        borderAlign: "center",
        borderColor: "#fff",
        borderJoinStyle: void 0,
        borderRadius: 0,
        borderWidth: 2,
        offset: 0,
        spacing: 0,
        angle: void 0
    }, Po.defaultRoutes = {backgroundColor: "backgroundColor"};
    const Io = "function" == typeof Path2D;

    class $o extends Wn {
        constructor(t) {
            super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t)
        }

        updateControlPoints(t, e) {
            const i = this.options;
            if ((i.tension || "monotone" === i.cubicInterpolationMode) && !i.stepped && !this._pointsUpdated) {
                const s = i.spanGaps ? this._loop : this._fullLoop;
                Yi(this._points, i, t, s, e), this._pointsUpdated = !0
            }
        }

        set points(t) {
            this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1
        }

        get points() {
            return this._points
        }

        get segments() {
            return this._segments || (this._segments = function (t, e) {
                const i = t.points, s = t.options.spanGaps, n = i.length;
                if (!n) return [];
                const o = !!t._loop, {start: r, end: a} = function (t, e, i, s) {
                    let n = 0, o = e - 1;
                    if (i && !s) for (; n < e && !t[n].skip;) n++;
                    for (; n < e && t[n].skip;) n++;
                    for (n %= e, i && (o += n); o > n && t[o % e].skip;) o--;
                    return o %= e, {start: n, end: o}
                }(i, n, o, s);
                return function (t, e, i, s) {
                    return s && s.setContext && i ? function (t, e, i, s) {
                        const n = t._chart.getContext(), o = bs(t.options), {
                            _datasetIndex: r,
                            options: {spanGaps: a}
                        } = t, l = i.length, h = [];
                        let c = o, d = e[0].start, u = d;

                        function f(t, e, s, n) {
                            const o = a ? -1 : 1;
                            if (t !== e) {
                                for (t += l; i[t % l].skip;) t -= o;
                                for (; i[e % l].skip;) e += o;
                                t % l != e % l && (h.push({
                                    start: t % l,
                                    end: e % l,
                                    loop: s,
                                    style: n
                                }), c = n, d = e % l)
                            }
                        }

                        for (const t of e) {
                            d = a ? d : t.start;
                            let e, o = i[d % l];
                            for (u = d + 1; u <= t.end; u++) {
                                const a = i[u % l];
                                e = bs(s.setContext(_i(n, {
                                    type: "segment",
                                    p0: o,
                                    p1: a,
                                    p0DataIndex: (u - 1) % l,
                                    p1DataIndex: u % l,
                                    datasetIndex: r
                                }))), xs(e, c) && f(d, u - 1, t.loop, c), o = a, c = e
                            }
                            d < u - 1 && f(d, u - 1, t.loop, c)
                        }
                        return h
                    }(t, e, i, s) : e
                }(t, !0 === s ? [{start: r, end: a, loop: o}] : function (t, e, i, s) {
                    const n = t.length, o = [];
                    let r, a = e, l = t[e];
                    for (r = e + 1; r <= i; ++r) {
                        const i = t[r % n];
                        i.skip || i.stop ? l.skip || (s = !1, o.push({
                            start: e % n,
                            end: (r - 1) % n,
                            loop: s
                        }), e = a = i.stop ? r : null) : (a = r, l.skip && (e = r)), l = i
                    }
                    return null !== a && o.push({start: e % n, end: a % n, loop: s}), o
                }(i, r, a < r ? a + n : a, !!t._fullLoop && 0 === r && a === n - 1), i, e)
            }(this, this.options.segment))
        }

        first() {
            const t = this.segments, e = this.points;
            return t.length && e[t[0].start]
        }

        last() {
            const t = this.segments, e = this.points, i = t.length;
            return i && e[t[i - 1].end]
        }

        interpolate(t, e) {
            const i = this.options, s = t[e], n = this.points, o = ms(this, {property: e, start: s, end: s});
            if (!o.length) return;
            const r = [], a = function (t) {
                return t.stepped ? rs : t.tension || "monotone" === t.cubicInterpolationMode ? as : os
            }(i);
            let l, h;
            for (l = 0, h = o.length; l < h; ++l) {
                const {start: h, end: c} = o[l], d = n[h], u = n[c];
                if (d === u) {
                    r.push(d);
                    continue
                }
                const f = a(d, u, Math.abs((s - d[e]) / (u[e] - d[e])), i.stepped);
                f[e] = t[e], r.push(f)
            }
            return 1 === r.length ? r[0] : r
        }

        pathSegment(t, e, i) {
            return Lo(this)(t, this, e, i)
        }

        path(t, e, i) {
            const s = this.segments, n = Lo(this);
            let o = this._loop;
            e = e || 0, i = i || this.points.length - e;
            for (const r of s) o &= n(t, this, r, {start: e, end: e + i - 1});
            return !!o
        }

        draw(t, e, i, s) {
            const n = this.options || {};
            (this.points || []).length && n.borderWidth && (t.save(), function (t, e, i, s) {
                Io && !e.options.segment ? function (t, e, i, s) {
                    let n = e._path;
                    n || (n = e._path = new Path2D, e.path(n, i, s) && n.closePath()), Do(t, e.options), t.stroke(n)
                }(t, e, i, s) : function (t, e, i, s) {
                    const {segments: n, options: o} = e, r = Lo(e);
                    for (const a of n) Do(t, o, a.style), t.beginPath(), r(t, e, a, {
                        start: i,
                        end: i + s - 1
                    }) && t.closePath(), t.stroke()
                }(t, e, i, s)
            }(t, this, i, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0)
        }
    }

    function zo(t, e, i, s) {
        const n = t.options, {[i]: o} = t.getProps([i], s);
        return Math.abs(e - o) < n.radius + n.hitRadius
    }

    $o.id = "line", $o.defaults = {
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0,
        borderJoinStyle: "miter",
        borderWidth: 3,
        capBezierPoints: !0,
        cubicInterpolationMode: "default",
        fill: !1,
        spanGaps: !1,
        stepped: !1,
        tension: 0
    }, $o.defaultRoutes = {
        backgroundColor: "backgroundColor",
        borderColor: "borderColor"
    }, $o.descriptors = {_scriptable: !0, _indexable: t => "borderDash" !== t && "fill" !== t};

    class Fo extends Wn {
        constructor(t) {
            super(), this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, t && Object.assign(this, t)
        }

        inRange(t, e, i) {
            const s = this.options, {x: n, y: o} = this.getProps(["x", "y"], i);
            return Math.pow(t - n, 2) + Math.pow(e - o, 2) < Math.pow(s.hitRadius + s.radius, 2)
        }

        inXRange(t, e) {
            return zo(this, t, "x", e)
        }

        inYRange(t, e) {
            return zo(this, t, "y", e)
        }

        getCenterPoint(t) {
            const {x: e, y: i} = this.getProps(["x", "y"], t);
            return {x: e, y: i}
        }

        size(t) {
            let e = (t = t || this.options || {}).radius || 0;
            return e = Math.max(e, e && t.hoverRadius || 0), 2 * (e + (e && t.borderWidth || 0))
        }

        draw(t, e) {
            const i = this.options;
            this.skip || i.radius < .1 || !ii(this, e, this.size(i) / 2) || (t.strokeStyle = i.borderColor, t.lineWidth = i.borderWidth, t.fillStyle = i.backgroundColor, ei(t, i, this.x, this.y))
        }

        getRange() {
            const t = this.options || {};
            return t.radius + t.hitRadius
        }
    }

    function Wo(t, e) {
        const {x: i, y: s, base: n, width: o, height: r} = t.getProps(["x", "y", "base", "width", "height"], e);
        let a, l, h, c, d;
        return t.horizontal ? (d = r / 2, a = Math.min(i, n), l = Math.max(i, n), h = s - d, c = s + d) : (d = o / 2, a = i - d, l = i + d, h = Math.min(s, n), c = Math.max(s, n)), {
            left: a,
            top: h,
            right: l,
            bottom: c
        }
    }

    function Vo(t, e, i, s) {
        return t ? 0 : re(e, i, s)
    }

    function Bo(t, e, i, s) {
        const n = null === e, o = null === i, r = t && !(n && o) && Wo(t, s);
        return r && (n || ae(e, r.left, r.right)) && (o || ae(i, r.top, r.bottom))
    }

    function No(t, e) {
        t.rect(e.x, e.y, e.w, e.h)
    }

    function jo(t, e, i = {}) {
        const s = t.x !== i.x ? -e : 0, n = t.y !== i.y ? -e : 0, o = (t.x + t.w !== i.x + i.w ? e : 0) - s,
            r = (t.y + t.h !== i.y + i.h ? e : 0) - n;
        return {x: t.x + s, y: t.y + n, w: t.w + o, h: t.h + r, radius: t.radius}
    }

    Fo.id = "point", Fo.defaults = {
        borderWidth: 1,
        hitRadius: 1,
        hoverBorderWidth: 1,
        hoverRadius: 4,
        pointStyle: "circle",
        radius: 3,
        rotation: 0
    }, Fo.defaultRoutes = {backgroundColor: "backgroundColor", borderColor: "borderColor"};

    class Ho extends Wn {
        constructor(t) {
            super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, t && Object.assign(this, t)
        }

        draw(t) {
            const {inflateAmount: e, options: {borderColor: i, backgroundColor: s}} = this, {
                inner: n,
                outer: o
            } = function (t) {
                const e = Wo(t), i = e.right - e.left, s = e.bottom - e.top, n = function (t, e, i) {
                    const s = t.options.borderWidth, n = t.borderSkipped, o = pi(s);
                    return {
                        t: Vo(n.top, o.top, 0, i),
                        r: Vo(n.right, o.right, 0, e),
                        b: Vo(n.bottom, o.bottom, 0, i),
                        l: Vo(n.left, o.left, 0, e)
                    }
                }(t, i / 2, s / 2), o = function (t, e, i) {
                    const {enableBorderRadius: s} = t.getProps(["enableBorderRadius"]), n = t.options.borderRadius,
                        o = mi(n), r = Math.min(e, i), a = t.borderSkipped, l = s || mt(n);
                    return {
                        topLeft: Vo(!l || a.top || a.left, o.topLeft, 0, r),
                        topRight: Vo(!l || a.top || a.right, o.topRight, 0, r),
                        bottomLeft: Vo(!l || a.bottom || a.left, o.bottomLeft, 0, r),
                        bottomRight: Vo(!l || a.bottom || a.right, o.bottomRight, 0, r)
                    }
                }(t, i / 2, s / 2);
                return {
                    outer: {x: e.left, y: e.top, w: i, h: s, radius: o},
                    inner: {
                        x: e.left + n.l,
                        y: e.top + n.t,
                        w: i - n.l - n.r,
                        h: s - n.t - n.b,
                        radius: {
                            topLeft: Math.max(0, o.topLeft - Math.max(n.t, n.l)),
                            topRight: Math.max(0, o.topRight - Math.max(n.t, n.r)),
                            bottomLeft: Math.max(0, o.bottomLeft - Math.max(n.b, n.l)),
                            bottomRight: Math.max(0, o.bottomRight - Math.max(n.b, n.r))
                        }
                    }
                }
            }(this), r = (a = o.radius).topLeft || a.topRight || a.bottomLeft || a.bottomRight ? hi : No;
            var a;
            t.save(), o.w === n.w && o.h === n.h || (t.beginPath(), r(t, jo(o, e, n)), t.clip(), r(t, jo(n, -e, o)), t.fillStyle = i, t.fill("evenodd")), t.beginPath(), r(t, jo(n, e)), t.fillStyle = s, t.fill(), t.restore()
        }

        inRange(t, e, i) {
            return Bo(this, t, e, i)
        }

        inXRange(t, e) {
            return Bo(this, t, null, e)
        }

        inYRange(t, e) {
            return Bo(this, null, t, e)
        }

        getCenterPoint(t) {
            const {x: e, y: i, base: s, horizontal: n} = this.getProps(["x", "y", "base", "horizontal"], t);
            return {x: n ? (e + s) / 2 : e, y: n ? i : (i + s) / 2}
        }

        getRange(t) {
            return "x" === t ? this.width / 2 : this.height / 2
        }
    }

    Ho.id = "bar", Ho.defaults = {
        borderSkipped: "start",
        borderWidth: 0,
        borderRadius: 0,
        inflateAmount: "auto",
        pointStyle: void 0
    }, Ho.defaultRoutes = {backgroundColor: "backgroundColor", borderColor: "borderColor"};
    var Uo = Object.freeze({__proto__: null, ArcElement: Po, LineElement: $o, PointElement: Fo, BarElement: Ho});

    function Yo(t) {
        if (t._decimated) {
            const e = t._data;
            delete t._decimated, delete t._data, Object.defineProperty(t, "data", {value: e})
        }
    }

    function Xo(t) {
        t.data.datasets.forEach((t => {
            Yo(t)
        }))
    }

    var Go = {
        id: "decimation", defaults: {algorithm: "min-max", enabled: !1}, beforeElementsUpdate: (t, e, i) => {
            if (!i.enabled) return void Xo(t);
            const s = t.width;
            t.data.datasets.forEach(((e, n) => {
                const {_data: o, indexAxis: r} = e, a = t.getDatasetMeta(n), l = o || e.data;
                if ("y" === yi([r, t.options.indexAxis])) return;
                if (!a.controller.supportsDecimation) return;
                const h = t.scales[a.xAxisID];
                if ("linear" !== h.type && "time" !== h.type) return;
                if (t.options.parsing) return;
                let c, {start: d, count: u} = function (t, e) {
                    const i = e.length;
                    let s, n = 0;
                    const {iScale: o} = t, {min: r, max: a, minDefined: l, maxDefined: h} = o.getUserBounds();
                    return l && (n = re(wi(e, o.axis, r).lo, 0, i - 1)), s = h ? re(wi(e, o.axis, a).hi + 1, n, i) - n : i - n, {
                        start: n,
                        count: s
                    }
                }(a, l);
                if (u <= (i.threshold || 4 * s)) Yo(e); else {
                    switch (gt(o) && (e._data = l, delete e.data, Object.defineProperty(e, "data", {
                        configurable: !0,
                        enumerable: !0,
                        get: function () {
                            return this._decimated
                        },
                        set: function (t) {
                            this._data = t
                        }
                    })), i.algorithm) {
                        case"lttb":
                            c = function (t, e, i, s, n) {
                                const o = n.samples || s;
                                if (o >= i) return t.slice(e, e + i);
                                const r = [], a = (i - 2) / (o - 2);
                                let l = 0;
                                const h = e + i - 1;
                                let c, d, u, f, g, p = e;
                                for (r[l++] = t[p], c = 0; c < o - 2; c++) {
                                    let s, n = 0, o = 0;
                                    const h = Math.floor((c + 1) * a) + 1 + e,
                                        m = Math.min(Math.floor((c + 2) * a) + 1, i) + e, b = m - h;
                                    for (s = h; s < m; s++) n += t[s].x, o += t[s].y;
                                    n /= b, o /= b;
                                    const x = Math.floor(c * a) + 1 + e,
                                        y = Math.min(Math.floor((c + 1) * a) + 1, i) + e, {x: _, y: v} = t[p];
                                    for (u = f = -1, s = x; s < y; s++) f = .5 * Math.abs((_ - n) * (t[s].y - v) - (_ - t[s].x) * (o - v)), f > u && (u = f, d = t[s], g = s);
                                    r[l++] = d, p = g
                                }
                                return r[l++] = t[h], r
                            }(l, d, u, s, i);
                            break;
                        case"min-max":
                            c = function (t, e, i, s) {
                                let n, o, r, a, l, h, c, d, u, f, g = 0, p = 0;
                                const m = [], b = e + i - 1, x = t[e].x, y = t[b].x - x;
                                for (n = e; n < e + i; ++n) {
                                    o = t[n], r = (o.x - x) / y * s, a = o.y;
                                    const e = 0 | r;
                                    if (e === l) a < u ? (u = a, h = n) : a > f && (f = a, c = n), g = (p * g + o.x) / ++p; else {
                                        const i = n - 1;
                                        if (!gt(h) && !gt(c)) {
                                            const e = Math.min(h, c), s = Math.max(h, c);
                                            e !== d && e !== i && m.push({
                                                ...t[e],
                                                x: g
                                            }), s !== d && s !== i && m.push({...t[s], x: g})
                                        }
                                        n > 0 && i !== d && m.push(t[i]), m.push(o), l = e, p = 0, u = f = a, h = c = d = n
                                    }
                                }
                                return m
                            }(l, d, u, s);
                            break;
                        default:
                            throw new Error(`Unsupported decimation algorithm '${i.algorithm}'`)
                    }
                    e._decimated = c
                }
            }))
        }, destroy(t) {
            Xo(t)
        }
    };

    function qo(t, e, i, s) {
        if (s) return;
        let n = e[t], o = i[t];
        return "angle" === t && (n = ne(n), o = ne(o)), {property: t, start: n, end: o}
    }

    function Ko(t, e, i) {
        for (; e > t; e--) {
            const t = i[e];
            if (!isNaN(t.x) && !isNaN(t.y)) break
        }
        return e
    }

    function Jo(t, e, i, s) {
        return t && e ? s(t[i], e[i]) : t ? t[i] : e ? e[i] : 0
    }

    function Zo(t, e) {
        let i = [], s = !1;
        return pt(t) ? (s = !0, i = t) : i = function (t, e) {
            const {x: i = null, y: s = null} = t || {}, n = e.points, o = [];
            return e.segments.forEach((({start: t, end: e}) => {
                e = Ko(t, e, n);
                const r = n[t], a = n[e];
                null !== s ? (o.push({x: r.x, y: s}), o.push({x: a.x, y: s})) : null !== i && (o.push({
                    x: i,
                    y: r.y
                }), o.push({x: i, y: a.y}))
            })), o
        }(t, e), i.length ? new $o({points: i, options: {tension: 0}, _loop: s, _fullLoop: s}) : null
    }

    function Qo(t, e, i) {
        let s = t[e].fill;
        const n = [e];
        let o;
        if (!i) return s;
        for (; !1 !== s && -1 === n.indexOf(s);) {
            if (!bt(s)) return s;
            if (o = t[s], !o) return !1;
            if (o.visible) return s;
            n.push(s), s = o.fill
        }
        return !1
    }

    function tr(t, e, i) {
        const s = function (t) {
            const e = t.options, i = e.fill;
            let s = yt(i && i.target, i);
            return void 0 === s && (s = !!e.backgroundColor), !1 !== s && null !== s && (!0 === s ? "origin" : s)
        }(t);
        if (mt(s)) return !isNaN(s.value) && s;
        let n = parseFloat(s);
        return bt(n) && Math.floor(n) === n ? function (t, e, i, s) {
            return "-" !== t && "+" !== t || (i = e + i), !(i === e || i < 0 || i >= s) && i
        }(s[0], e, n, i) : ["origin", "start", "end", "stack", "shape"].indexOf(s) >= 0 && s
    }

    function er(t, e, i) {
        const s = [];
        for (let n = 0; n < i.length; n++) {
            const o = i[n], {first: r, last: a, point: l} = ir(o, e, "x");
            if (!(!l || r && a)) if (r) s.unshift(l); else if (t.push(l), !a) break
        }
        t.push(...s)
    }

    function ir(t, e, i) {
        const s = t.interpolate(e, i);
        if (!s) return {};
        const n = s[i], o = t.segments, r = t.points;
        let a = !1, l = !1;
        for (let t = 0; t < o.length; t++) {
            const e = o[t], s = r[e.start][i], h = r[e.end][i];
            if (ae(n, s, h)) {
                a = n === s, l = n === h;
                break
            }
        }
        return {first: a, last: l, point: s}
    }

    class sr {
        constructor(t) {
            this.x = t.x, this.y = t.y, this.radius = t.radius
        }

        pathSegment(t, e, i) {
            const {x: s, y: n, radius: o} = this;
            return e = e || {start: 0, end: Wt}, t.arc(s, n, o, e.end, e.start, !0), !i.bounds
        }

        interpolate(t) {
            const {x: e, y: i, radius: s} = this, n = t.angle;
            return {x: e + Math.cos(n) * s, y: i + Math.sin(n) * s, angle: n}
        }
    }

    function nr(t, e, i) {
        const s = function (t) {
            const {chart: e, fill: i, line: s} = t;
            if (bt(i)) return function (t, e) {
                const i = t.getDatasetMeta(e);
                return i && t.isDatasetVisible(e) ? i.dataset : null
            }(e, i);
            if ("stack" === i) return function (t) {
                const {scale: e, index: i, line: s} = t, n = [], o = s.segments, r = s.points, a = function (t, e) {
                    const i = [], s = t.getMatchingVisibleMetas("line");
                    for (let t = 0; t < s.length; t++) {
                        const n = s[t];
                        if (n.index === e) break;
                        n.hidden || i.unshift(n.dataset)
                    }
                    return i
                }(e, i);
                a.push(Zo({x: null, y: e.bottom}, s));
                for (let t = 0; t < o.length; t++) {
                    const e = o[t];
                    for (let t = e.start; t <= e.end; t++) er(n, r[t], a)
                }
                return new $o({points: n, options: {}})
            }(t);
            if ("shape" === i) return !0;
            const n = function (t) {
                return (t.scale || {}).getPointPositionForValue ? function (t) {
                    const {scale: e, fill: i} = t, s = e.options, n = e.getLabels().length,
                        o = s.reverse ? e.max : e.min, r = function (t, e, i) {
                            let s;
                            return s = "start" === t ? i : "end" === t ? e.options.reverse ? e.min : e.max : mt(t) ? t.value : e.getBaseValue(), s
                        }(i, e, o), a = [];
                    if (s.grid.circular) {
                        const t = e.getPointPositionForValue(0, o);
                        return new sr({x: t.x, y: t.y, radius: e.getDistanceFromCenterForValue(r)})
                    }
                    for (let t = 0; t < n; ++t) a.push(e.getPointPositionForValue(t, r));
                    return a
                }(t) : function (t) {
                    const {scale: e = {}, fill: i} = t, s = function (t, e) {
                        let i = null;
                        return "start" === t ? i = e.bottom : "end" === t ? i = e.top : mt(t) ? i = e.getPixelForValue(t.value) : e.getBasePixel && (i = e.getBasePixel()), i
                    }(i, e);
                    if (bt(s)) {
                        const t = e.isHorizontal();
                        return {x: t ? s : null, y: t ? null : s}
                    }
                    return null
                }(t)
            }(t);
            return n instanceof sr ? n : Zo(n, s)
        }(e), {line: n, scale: o, axis: r} = e, a = n.options, l = a.fill, h = a.backgroundColor, {
            above: c = h,
            below: d = h
        } = l || {};
        s && n.points.length && (si(t, i), function (t, e) {
            const {line: i, target: s, above: n, below: o, area: r, scale: a} = e, l = i._loop ? "angle" : e.axis;
            t.save(), "x" === l && o !== n && (or(t, s, r.top), rr(t, {
                line: i,
                target: s,
                color: n,
                scale: a,
                property: l
            }), t.restore(), t.save(), or(t, s, r.bottom)), rr(t, {
                line: i,
                target: s,
                color: o,
                scale: a,
                property: l
            }), t.restore()
        }(t, {line: n, target: s, above: c, below: d, area: i, scale: o, axis: r}), ni(t))
    }

    function or(t, e, i) {
        const {segments: s, points: n} = e;
        let o = !0, r = !1;
        t.beginPath();
        for (const a of s) {
            const {start: s, end: l} = a, h = n[s], c = n[Ko(s, l, n)];
            o ? (t.moveTo(h.x, h.y), o = !1) : (t.lineTo(h.x, i), t.lineTo(h.x, h.y)), r = !!e.pathSegment(t, a, {move: r}), r ? t.closePath() : t.lineTo(c.x, i)
        }
        t.lineTo(e.first().x, i), t.closePath(), t.clip()
    }

    function rr(t, e) {
        const {line: i, target: s, property: n, color: o, scale: r} = e, a = function (t, e, i) {
            const s = t.segments, n = t.points, o = e.points, r = [];
            for (const t of s) {
                let {start: s, end: a} = t;
                a = Ko(s, a, n);
                const l = qo(i, n[s], n[a], t.loop);
                if (!e.segments) {
                    r.push({source: t, target: l, start: n[s], end: n[a]});
                    continue
                }
                const h = ms(e, l);
                for (const e of h) {
                    const s = qo(i, o[e.start], o[e.end], e.loop), a = ps(t, n, s);
                    for (const t of a) r.push({
                        source: t,
                        target: e,
                        start: {[i]: Jo(l, s, "start", Math.max)},
                        end: {[i]: Jo(l, s, "end", Math.min)}
                    })
                }
            }
            return r
        }(i, s, n);
        for (const {source: e, target: l, start: h, end: c} of a) {
            const {style: {backgroundColor: a = o} = {}} = e, d = !0 !== s;
            t.save(), t.fillStyle = a, ar(t, r, d && qo(n, h, c)), t.beginPath();
            const u = !!i.pathSegment(t, e);
            let f;
            if (d) {
                u ? t.closePath() : lr(t, s, c, n);
                const e = !!s.pathSegment(t, l, {move: u, reverse: !0});
                f = u && e, f || lr(t, s, h, n)
            }
            t.closePath(), t.fill(f ? "evenodd" : "nonzero"), t.restore()
        }
    }

    function ar(t, e, i) {
        const {top: s, bottom: n} = e.chart.chartArea, {property: o, start: r, end: a} = i || {};
        "x" === o && (t.beginPath(), t.rect(r, s, a - r, n - s), t.clip())
    }

    function lr(t, e, i, s) {
        const n = e.interpolate(i, s);
        n && t.lineTo(n.x, n.y)
    }

    var hr = {
        id: "filler", afterDatasetsUpdate(t, e, i) {
            const s = (t.data.datasets || []).length, n = [];
            let o, r, a, l;
            for (r = 0; r < s; ++r) o = t.getDatasetMeta(r), a = o.dataset, l = null, a && a.options && a instanceof $o && (l = {
                visible: t.isDatasetVisible(r),
                index: r,
                fill: tr(a, r, s),
                chart: t,
                axis: o.controller.options.indexAxis,
                scale: o.vScale,
                line: a
            }), o.$filler = l, n.push(l);
            for (r = 0; r < s; ++r) l = n[r], l && !1 !== l.fill && (l.fill = Qo(n, r, i.propagate))
        }, beforeDraw(t, e, i) {
            const s = "beforeDraw" === i.drawTime, n = t.getSortedVisibleDatasetMetas(), o = t.chartArea;
            for (let e = n.length - 1; e >= 0; --e) {
                const i = n[e].$filler;
                i && (i.line.updateControlPoints(o, i.axis), s && nr(t.ctx, i, o))
            }
        }, beforeDatasetsDraw(t, e, i) {
            if ("beforeDatasetsDraw" !== i.drawTime) return;
            const s = t.getSortedVisibleDatasetMetas();
            for (let e = s.length - 1; e >= 0; --e) {
                const i = s[e].$filler;
                i && nr(t.ctx, i, t.chartArea)
            }
        }, beforeDatasetDraw(t, e, i) {
            const s = e.meta.$filler;
            s && !1 !== s.fill && "beforeDatasetDraw" === i.drawTime && nr(t.ctx, s, t.chartArea)
        }, defaults: {propagate: !0, drawTime: "beforeDatasetDraw"}
    };
    const cr = (t, e) => {
        let {boxHeight: i = e, boxWidth: s = e} = t;
        return t.usePointStyle && (i = Math.min(i, e), s = Math.min(s, e)), {
            boxWidth: s,
            boxHeight: i,
            itemHeight: Math.max(e, i)
        }
    };

    class dr extends Wn {
        constructor(t) {
            super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0
        }

        update(t, e, i) {
            this.maxWidth = t, this.maxHeight = e, this._margins = i, this.setDimensions(), this.buildLabels(), this.fit()
        }

        setDimensions() {
            this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height)
        }

        buildLabels() {
            const t = this.options.labels || {};
            let e = vt(t.generateLabels, [this.chart], this) || [];
            t.filter && (e = e.filter((e => t.filter(e, this.chart.data)))), t.sort && (e = e.sort(((e, i) => t.sort(e, i, this.chart.data)))), this.options.reverse && e.reverse(), this.legendItems = e
        }

        fit() {
            const {options: t, ctx: e} = this;
            if (!t.display) return void (this.width = this.height = 0);
            const i = t.labels, s = xi(i.font), n = s.size, o = this._computeTitleHeight(), {
                boxWidth: r,
                itemHeight: a
            } = cr(i, n);
            let l, h;
            e.font = s.string, this.isHorizontal() ? (l = this.maxWidth, h = this._fitRows(o, n, r, a) + 10) : (h = this.maxHeight, l = this._fitCols(o, n, r, a) + 10), this.width = Math.min(l, t.maxWidth || this.maxWidth), this.height = Math.min(h, t.maxHeight || this.maxHeight)
        }

        _fitRows(t, e, i, s) {
            const {ctx: n, maxWidth: o, options: {labels: {padding: r}}} = this, a = this.legendHitBoxes = [],
                l = this.lineWidths = [0], h = s + r;
            let c = t;
            n.textAlign = "left", n.textBaseline = "middle";
            let d = -1, u = -h;
            return this.legendItems.forEach(((t, f) => {
                const g = i + e / 2 + n.measureText(t.text).width;
                (0 === f || l[l.length - 1] + g + 2 * r > o) && (c += h, l[l.length - (f > 0 ? 0 : 1)] = 0, u += h, d++), a[f] = {
                    left: 0,
                    top: u,
                    row: d,
                    width: g,
                    height: s
                }, l[l.length - 1] += g + r
            })), c
        }

        _fitCols(t, e, i, s) {
            const {ctx: n, maxHeight: o, options: {labels: {padding: r}}} = this, a = this.legendHitBoxes = [],
                l = this.columnSizes = [], h = o - t;
            let c = r, d = 0, u = 0, f = 0, g = 0;
            return this.legendItems.forEach(((t, o) => {
                const p = i + e / 2 + n.measureText(t.text).width;
                o > 0 && u + s + 2 * r > h && (c += d + r, l.push({
                    width: d,
                    height: u
                }), f += d + r, g++, d = u = 0), a[o] = {
                    left: f,
                    top: u,
                    col: g,
                    width: p,
                    height: s
                }, d = Math.max(d, p), u += s + r
            })), c += d, l.push({width: d, height: u}), c
        }

        adjustHitBoxes() {
            if (!this.options.display) return;
            const t = this._computeTitleHeight(), {
                legendHitBoxes: e,
                options: {align: i, labels: {padding: s}, rtl: n}
            } = this, o = cs(n, this.left, this.width);
            if (this.isHorizontal()) {
                let n = 0, r = dt(i, this.left + s, this.right - this.lineWidths[n]);
                for (const a of e) n !== a.row && (n = a.row, r = dt(i, this.left + s, this.right - this.lineWidths[n])), a.top += this.top + t + s, a.left = o.leftForLtr(o.x(r), a.width), r += a.width + s
            } else {
                let n = 0, r = dt(i, this.top + t + s, this.bottom - this.columnSizes[n].height);
                for (const a of e) a.col !== n && (n = a.col, r = dt(i, this.top + t + s, this.bottom - this.columnSizes[n].height)), a.top = r, a.left += this.left + s, a.left = o.leftForLtr(o.x(a.left), a.width), r += a.height + s
            }
        }

        isHorizontal() {
            return "top" === this.options.position || "bottom" === this.options.position
        }

        draw() {
            if (this.options.display) {
                const t = this.ctx;
                si(t, this), this._draw(), ni(t)
            }
        }

        _draw() {
            const {options: t, columnSizes: e, lineWidths: i, ctx: s} = this, {align: n, labels: o} = t, r = Ke.color,
                a = cs(t.rtl, this.left, this.width), l = xi(o.font), {color: h, padding: c} = o, d = l.size, u = d / 2;
            let f;
            this.drawTitle(), s.textAlign = a.textAlign("left"), s.textBaseline = "middle", s.lineWidth = .5, s.font = l.string;
            const {boxWidth: g, boxHeight: p, itemHeight: m} = cr(o, d), b = this.isHorizontal(),
                x = this._computeTitleHeight();
            f = b ? {x: dt(n, this.left + c, this.right - i[0]), y: this.top + c + x, line: 0} : {
                x: this.left + c,
                y: dt(n, this.top + x + c, this.bottom - e[0].height),
                line: 0
            }, ds(this.ctx, t.textDirection);
            const y = m + c;
            this.legendItems.forEach(((_, v) => {
                s.strokeStyle = _.fontColor || h, s.fillStyle = _.fontColor || h;
                const w = s.measureText(_.text).width, M = a.textAlign(_.textAlign || (_.textAlign = o.textAlign)),
                    k = g + u + w;
                let S = f.x, C = f.y;
                a.setWidth(this.width), b ? v > 0 && S + k + c > this.right && (C = f.y += y, f.line++, S = f.x = dt(n, this.left + c, this.right - i[f.line])) : v > 0 && C + y > this.bottom && (S = f.x = S + e[f.line].width + c, f.line++, C = f.y = dt(n, this.top + x + c, this.bottom - e[f.line].height)), function (t, e, i) {
                    if (isNaN(g) || g <= 0 || isNaN(p) || p < 0) return;
                    s.save();
                    const n = yt(i.lineWidth, 1);
                    if (s.fillStyle = yt(i.fillStyle, r), s.lineCap = yt(i.lineCap, "butt"), s.lineDashOffset = yt(i.lineDashOffset, 0), s.lineJoin = yt(i.lineJoin, "miter"), s.lineWidth = n, s.strokeStyle = yt(i.strokeStyle, r), s.setLineDash(yt(i.lineDash, [])), o.usePointStyle) {
                        const o = {
                            radius: g * Math.SQRT2 / 2,
                            pointStyle: i.pointStyle,
                            rotation: i.rotation,
                            borderWidth: n
                        }, r = a.xPlus(t, g / 2);
                        ei(s, o, r, e + u)
                    } else {
                        const o = e + Math.max((d - p) / 2, 0), r = a.leftForLtr(t, g), l = mi(i.borderRadius);
                        s.beginPath(), Object.values(l).some((t => 0 !== t)) ? hi(s, {
                            x: r,
                            y: o,
                            w: g,
                            h: p,
                            radius: l
                        }) : s.rect(r, o, g, p), s.fill(), 0 !== n && s.stroke()
                    }
                    s.restore()
                }(a.x(S), C, _), S = ((t, e, i, s) => t === (s ? "left" : "right") ? i : "center" === t ? (e + i) / 2 : e)(M, S + g + u, b ? S + k : this.right, t.rtl), function (t, e, i) {
                    ai(s, i.text, t, e + m / 2, l, {strikethrough: i.hidden, textAlign: a.textAlign(i.textAlign)})
                }(a.x(S), C, _), b ? f.x += k + c : f.y += y
            })), us(this.ctx, t.textDirection)
        }

        drawTitle() {
            const t = this.options, e = t.title, i = xi(e.font), s = bi(e.padding);
            if (!e.display) return;
            const n = cs(t.rtl, this.left, this.width), o = this.ctx, r = e.position, a = i.size / 2, l = s.top + a;
            let h, c = this.left, d = this.width;
            if (this.isHorizontal()) d = Math.max(...this.lineWidths), h = this.top + l, c = dt(t.align, c, this.right - d); else {
                const e = this.columnSizes.reduce(((t, e) => Math.max(t, e.height)), 0);
                h = l + dt(t.align, this.top, this.bottom - e - t.labels.padding - this._computeTitleHeight())
            }
            const u = dt(r, c, c + d);
            o.textAlign = n.textAlign(ct(r)), o.textBaseline = "middle", o.strokeStyle = e.color, o.fillStyle = e.color, o.font = i.string, ai(o, e.text, u, h, i)
        }

        _computeTitleHeight() {
            const t = this.options.title, e = xi(t.font), i = bi(t.padding);
            return t.display ? e.lineHeight + i.height : 0
        }

        _getLegendItemAt(t, e) {
            let i, s, n;
            if (ae(t, this.left, this.right) && ae(e, this.top, this.bottom)) for (n = this.legendHitBoxes, i = 0; i < n.length; ++i) if (s = n[i], ae(t, s.left, s.left + s.width) && ae(e, s.top, s.top + s.height)) return this.legendItems[i];
            return null
        }

        handleEvent(t) {
            const e = this.options;
            if (!function (t, e) {
                return !("mousemove" !== t && "mouseout" !== t || !e.onHover && !e.onLeave) || !(!e.onClick || "click" !== t && "mouseup" !== t)
            }(t.type, e)) return;
            const i = this._getLegendItemAt(t.x, t.y);
            if ("mousemove" === t.type || "mouseout" === t.type) {
                const s = this._hoveredItem,
                    n = ((t, e) => null !== t && null !== e && t.datasetIndex === e.datasetIndex && t.index === e.index)(s, i);
                s && !n && vt(e.onLeave, [t, s, this], this), this._hoveredItem = i, i && !n && vt(e.onHover, [t, i, this], this)
            } else i && vt(e.onClick, [t, i, this], this)
        }
    }

    var ur = {
        id: "legend",
        _element: dr,
        start(t, e, i) {
            const s = t.legend = new dr({ctx: t.ctx, options: i, chart: t});
            vn.configure(t, s, i), vn.addBox(t, s)
        },
        stop(t) {
            vn.removeBox(t, t.legend), delete t.legend
        },
        beforeUpdate(t, e, i) {
            const s = t.legend;
            vn.configure(t, s, i), s.options = i
        },
        afterUpdate(t) {
            const e = t.legend;
            e.buildLabels(), e.adjustHitBoxes()
        },
        afterEvent(t, e) {
            e.replay || t.legend.handleEvent(e.event)
        },
        defaults: {
            display: !0,
            position: "top",
            align: "center",
            fullSize: !0,
            reverse: !1,
            weight: 1e3,
            onClick(t, e, i) {
                const s = e.datasetIndex, n = i.chart;
                n.isDatasetVisible(s) ? (n.hide(s), e.hidden = !0) : (n.show(s), e.hidden = !1)
            },
            onHover: null,
            onLeave: null,
            labels: {
                color: t => t.chart.options.color, boxWidth: 40, padding: 10, generateLabels(t) {
                    const e = t.data.datasets, {
                        labels: {
                            usePointStyle: i,
                            pointStyle: s,
                            textAlign: n,
                            color: o
                        }
                    } = t.legend.options;
                    return t._getSortedDatasetMetas().map((t => {
                        const r = t.controller.getStyle(i ? 0 : void 0), a = bi(r.borderWidth);
                        return {
                            text: e[t.index].label,
                            fillStyle: r.backgroundColor,
                            fontColor: o,
                            hidden: !t.visible,
                            lineCap: r.borderCapStyle,
                            lineDash: r.borderDash,
                            lineDashOffset: r.borderDashOffset,
                            lineJoin: r.borderJoinStyle,
                            lineWidth: (a.width + a.height) / 4,
                            strokeStyle: r.borderColor,
                            pointStyle: s || r.pointStyle,
                            rotation: r.rotation,
                            textAlign: n || r.textAlign,
                            borderRadius: 0,
                            datasetIndex: t.index
                        }
                    }), this)
                }
            },
            title: {color: t => t.chart.options.color, display: !1, position: "center", text: ""}
        },
        descriptors: {
            _scriptable: t => !t.startsWith("on"),
            labels: {_scriptable: t => !["generateLabels", "filter", "sort"].includes(t)}
        }
    };

    class fr extends Wn {
        constructor(t) {
            super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0
        }

        update(t, e) {
            const i = this.options;
            if (this.left = 0, this.top = 0, !i.display) return void (this.width = this.height = this.right = this.bottom = 0);
            this.width = this.right = t, this.height = this.bottom = e;
            const s = pt(i.text) ? i.text.length : 1;
            this._padding = bi(i.padding);
            const n = s * xi(i.font).lineHeight + this._padding.height;
            this.isHorizontal() ? this.height = n : this.width = n
        }

        isHorizontal() {
            const t = this.options.position;
            return "top" === t || "bottom" === t
        }

        _drawArgs(t) {
            const {top: e, left: i, bottom: s, right: n, options: o} = this, r = o.align;
            let a, l, h, c = 0;
            return this.isHorizontal() ? (l = dt(r, i, n), h = e + t, a = n - i) : ("left" === o.position ? (l = i + t, h = dt(r, s, e), c = -.5 * Ft) : (l = n - t, h = dt(r, e, s), c = .5 * Ft), a = s - e), {
                titleX: l,
                titleY: h,
                maxWidth: a,
                rotation: c
            }
        }

        draw() {
            const t = this.ctx, e = this.options;
            if (!e.display) return;
            const i = xi(e.font), s = i.lineHeight / 2 + this._padding.top, {
                titleX: n,
                titleY: o,
                maxWidth: r,
                rotation: a
            } = this._drawArgs(s);
            ai(t, e.text, 0, 0, i, {
                color: e.color,
                maxWidth: r,
                rotation: a,
                textAlign: ct(e.align),
                textBaseline: "middle",
                translation: [n, o]
            })
        }
    }

    var gr = {
        id: "title",
        _element: fr,
        start(t, e, i) {
            !function (t, e) {
                const i = new fr({ctx: t.ctx, options: e, chart: t});
                vn.configure(t, i, e), vn.addBox(t, i), t.titleBlock = i
            }(t, i)
        },
        stop(t) {
            const e = t.titleBlock;
            vn.removeBox(t, e), delete t.titleBlock
        },
        beforeUpdate(t, e, i) {
            const s = t.titleBlock;
            vn.configure(t, s, i), s.options = i
        },
        defaults: {
            align: "center",
            display: !1,
            font: {weight: "bold"},
            fullSize: !0,
            padding: 10,
            position: "top",
            text: "",
            weight: 2e3
        },
        defaultRoutes: {color: "color"},
        descriptors: {_scriptable: !0, _indexable: !1}
    };
    const pr = new WeakMap;
    var mr = {
        id: "subtitle",
        start(t, e, i) {
            const s = new fr({ctx: t.ctx, options: i, chart: t});
            vn.configure(t, s, i), vn.addBox(t, s), pr.set(t, s)
        },
        stop(t) {
            vn.removeBox(t, pr.get(t)), pr.delete(t)
        },
        beforeUpdate(t, e, i) {
            const s = pr.get(t);
            vn.configure(t, s, i), s.options = i
        },
        defaults: {
            align: "center",
            display: !1,
            font: {weight: "normal"},
            fullSize: !0,
            padding: 0,
            position: "top",
            text: "",
            weight: 1500
        },
        defaultRoutes: {color: "color"},
        descriptors: {_scriptable: !0, _indexable: !1}
    };
    const br = {
        average(t) {
            if (!t.length) return !1;
            let e, i, s = 0, n = 0, o = 0;
            for (e = 0, i = t.length; e < i; ++e) {
                const i = t[e].element;
                if (i && i.hasValue()) {
                    const t = i.tooltipPosition();
                    s += t.x, n += t.y, ++o
                }
            }
            return {x: s / o, y: n / o}
        }, nearest(t, e) {
            if (!t.length) return !1;
            let i, s, n, o = e.x, r = e.y, a = Number.POSITIVE_INFINITY;
            for (i = 0, s = t.length; i < s; ++i) {
                const s = t[i].element;
                if (s && s.hasValue()) {
                    const t = ie(e, s.getCenterPoint());
                    t < a && (a = t, n = s)
                }
            }
            if (n) {
                const t = n.tooltipPosition();
                o = t.x, r = t.y
            }
            return {x: o, y: r}
        }
    };

    function xr(t, e) {
        return e && (pt(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t
    }

    function yr(t) {
        return ("string" == typeof t || t instanceof String) && t.indexOf("\n") > -1 ? t.split("\n") : t
    }

    function _r(t, e) {
        const {element: i, datasetIndex: s, index: n} = e, o = t.getDatasetMeta(s).controller, {
            label: r,
            value: a
        } = o.getLabelAndValue(n);
        return {
            chart: t,
            label: r,
            parsed: o.getParsed(n),
            raw: t.data.datasets[s].data[n],
            formattedValue: a,
            dataset: o.getDataset(),
            dataIndex: n,
            datasetIndex: s,
            element: i
        }
    }

    function vr(t, e) {
        const i = t.chart.ctx, {body: s, footer: n, title: o} = t, {boxWidth: r, boxHeight: a} = e, l = xi(e.bodyFont),
            h = xi(e.titleFont), c = xi(e.footerFont), d = o.length, u = n.length, f = s.length, g = bi(e.padding);
        let p = g.height, m = 0, b = s.reduce(((t, e) => t + e.before.length + e.lines.length + e.after.length), 0);
        b += t.beforeBody.length + t.afterBody.length, d && (p += d * h.lineHeight + (d - 1) * e.titleSpacing + e.titleMarginBottom), b && (p += f * (e.displayColors ? Math.max(a, l.lineHeight) : l.lineHeight) + (b - f) * l.lineHeight + (b - 1) * e.bodySpacing), u && (p += e.footerMarginTop + u * c.lineHeight + (u - 1) * e.footerSpacing);
        let x = 0;
        const y = function (t) {
            m = Math.max(m, i.measureText(t).width + x)
        };
        return i.save(), i.font = h.string, wt(t.title, y), i.font = l.string, wt(t.beforeBody.concat(t.afterBody), y), x = e.displayColors ? r + 2 + e.boxPadding : 0, wt(s, (t => {
            wt(t.before, y), wt(t.lines, y), wt(t.after, y)
        })), x = 0, i.font = c.string, wt(t.footer, y), i.restore(), m += g.width, {width: m, height: p}
    }

    function wr(t, e, i, s) {
        const {x: n, width: o} = i, {width: r, chartArea: {left: a, right: l}} = t;
        let h = "center";
        return "center" === s ? h = n <= (a + l) / 2 ? "left" : "right" : n <= o / 2 ? h = "left" : n >= r - o / 2 && (h = "right"), function (t, e, i, s) {
            const {x: n, width: o} = s, r = i.caretSize + i.caretPadding;
            return "left" === t && n + o + r > e.width || "right" === t && n - o - r < 0 || void 0
        }(h, t, e, i) && (h = "center"), h
    }

    function Mr(t, e, i) {
        const s = i.yAlign || e.yAlign || function (t, e) {
            const {y: i, height: s} = e;
            return i < s / 2 ? "top" : i > t.height - s / 2 ? "bottom" : "center"
        }(t, i);
        return {xAlign: i.xAlign || e.xAlign || wr(t, e, i, s), yAlign: s}
    }

    function kr(t, e, i, s) {
        const {caretSize: n, caretPadding: o, cornerRadius: r} = t, {xAlign: a, yAlign: l} = i, h = n + o, {
            topLeft: c,
            topRight: d,
            bottomLeft: u,
            bottomRight: f
        } = mi(r);
        let g = function (t, e) {
            let {x: i, width: s} = t;
            return "right" === e ? i -= s : "center" === e && (i -= s / 2), i
        }(e, a);
        const p = function (t, e, i) {
            let {y: s, height: n} = t;
            return "top" === e ? s += i : s -= "bottom" === e ? n + i : n / 2, s
        }(e, l, h);
        return "center" === l ? "left" === a ? g += h : "right" === a && (g -= h) : "left" === a ? g -= Math.max(c, u) + n : "right" === a && (g += Math.max(d, f) + n), {
            x: re(g, 0, s.width - e.width),
            y: re(p, 0, s.height - e.height)
        }
    }

    function Sr(t, e, i) {
        const s = bi(i.padding);
        return "center" === e ? t.x + t.width / 2 : "right" === e ? t.x + t.width - s.right : t.x + s.left
    }

    function Cr(t) {
        return xr([], yr(t))
    }

    function Ar(t, e) {
        const i = e && e.dataset && e.dataset.tooltip && e.dataset.tooltip.callbacks;
        return i ? t.override(i) : t
    }

    class Pr extends Wn {
        constructor(t) {
            super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = t.chart || t._chart, this._chart = this.chart, this.options = t.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0
        }

        initialize(t) {
            this.options = t, this._cachedAnimations = void 0, this.$context = void 0
        }

        _resolveAnimations() {
            const t = this._cachedAnimations;
            if (t) return t;
            const e = this.chart, i = this.options.setContext(this.getContext()),
                s = i.enabled && e.options.animation && i.animations, n = new ks(this.chart, s);
            return s._cacheable && (this._cachedAnimations = Object.freeze(n)), n
        }

        getContext() {
            return this.$context || (this.$context = (this, _i(this.chart.getContext(), {
                tooltip: this,
                tooltipItems: this._tooltipItems,
                type: "tooltip"
            })))
        }

        getTitle(t, e) {
            const {callbacks: i} = e, s = i.beforeTitle.apply(this, [t]), n = i.title.apply(this, [t]),
                o = i.afterTitle.apply(this, [t]);
            let r = [];
            return r = xr(r, yr(s)), r = xr(r, yr(n)), r = xr(r, yr(o)), r
        }

        getBeforeBody(t, e) {
            return Cr(e.callbacks.beforeBody.apply(this, [t]))
        }

        getBody(t, e) {
            const {callbacks: i} = e, s = [];
            return wt(t, (t => {
                const e = {before: [], lines: [], after: []}, n = Ar(i, t);
                xr(e.before, yr(n.beforeLabel.call(this, t))), xr(e.lines, n.label.call(this, t)), xr(e.after, yr(n.afterLabel.call(this, t))), s.push(e)
            })), s
        }

        getAfterBody(t, e) {
            return Cr(e.callbacks.afterBody.apply(this, [t]))
        }

        getFooter(t, e) {
            const {callbacks: i} = e, s = i.beforeFooter.apply(this, [t]), n = i.footer.apply(this, [t]),
                o = i.afterFooter.apply(this, [t]);
            let r = [];
            return r = xr(r, yr(s)), r = xr(r, yr(n)), r = xr(r, yr(o)), r
        }

        _createItems(t) {
            const e = this._active, i = this.chart.data, s = [], n = [], o = [];
            let r, a, l = [];
            for (r = 0, a = e.length; r < a; ++r) l.push(_r(this.chart, e[r]));
            return t.filter && (l = l.filter(((e, s, n) => t.filter(e, s, n, i)))), t.itemSort && (l = l.sort(((e, s) => t.itemSort(e, s, i)))), wt(l, (e => {
                const i = Ar(t.callbacks, e);
                s.push(i.labelColor.call(this, e)), n.push(i.labelPointStyle.call(this, e)), o.push(i.labelTextColor.call(this, e))
            })), this.labelColors = s, this.labelPointStyles = n, this.labelTextColors = o, this.dataPoints = l, l
        }

        update(t, e) {
            const i = this.options.setContext(this.getContext()), s = this._active;
            let n, o = [];
            if (s.length) {
                const t = br[i.position].call(this, s, this._eventPosition);
                o = this._createItems(i), this.title = this.getTitle(o, i), this.beforeBody = this.getBeforeBody(o, i), this.body = this.getBody(o, i), this.afterBody = this.getAfterBody(o, i), this.footer = this.getFooter(o, i);
                const e = this._size = vr(this, i), r = Object.assign({}, t, e), a = Mr(this.chart, i, r),
                    l = kr(i, r, a, this.chart);
                this.xAlign = a.xAlign, this.yAlign = a.yAlign, n = {
                    opacity: 1,
                    x: l.x,
                    y: l.y,
                    width: e.width,
                    height: e.height,
                    caretX: t.x,
                    caretY: t.y
                }
            } else 0 !== this.opacity && (n = {opacity: 0});
            this._tooltipItems = o, this.$context = void 0, n && this._resolveAnimations().update(this, n), t && i.external && i.external.call(this, {
                chart: this.chart,
                tooltip: this,
                replay: e
            })
        }

        drawCaret(t, e, i, s) {
            const n = this.getCaretPosition(t, i, s);
            e.lineTo(n.x1, n.y1), e.lineTo(n.x2, n.y2), e.lineTo(n.x3, n.y3)
        }

        getCaretPosition(t, e, i) {
            const {xAlign: s, yAlign: n} = this, {caretSize: o, cornerRadius: r} = i, {
                topLeft: a,
                topRight: l,
                bottomLeft: h,
                bottomRight: c
            } = mi(r), {x: d, y: u} = t, {width: f, height: g} = e;
            let p, m, b, x, y, _;
            return "center" === n ? (y = u + g / 2, "left" === s ? (p = d, m = p - o, x = y + o, _ = y - o) : (p = d + f, m = p + o, x = y - o, _ = y + o), b = p) : (m = "left" === s ? d + Math.max(a, h) + o : "right" === s ? d + f - Math.max(l, c) - o : this.caretX, "top" === n ? (x = u, y = x - o, p = m - o, b = m + o) : (x = u + g, y = x + o, p = m + o, b = m - o), _ = x), {
                x1: p,
                x2: m,
                x3: b,
                y1: x,
                y2: y,
                y3: _
            }
        }

        drawTitle(t, e, i) {
            const s = this.title, n = s.length;
            let o, r, a;
            if (n) {
                const l = cs(i.rtl, this.x, this.width);
                for (t.x = Sr(this, i.titleAlign, i), e.textAlign = l.textAlign(i.titleAlign), e.textBaseline = "middle", o = xi(i.titleFont), r = i.titleSpacing, e.fillStyle = i.titleColor, e.font = o.string, a = 0; a < n; ++a) e.fillText(s[a], l.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + r, a + 1 === n && (t.y += i.titleMarginBottom - r)
            }
        }

        _drawColorBox(t, e, i, s, n) {
            const o = this.labelColors[i], r = this.labelPointStyles[i], {boxHeight: a, boxWidth: l, boxPadding: h} = n,
                c = xi(n.bodyFont), d = Sr(this, "left", n), u = s.x(d),
                f = a < c.lineHeight ? (c.lineHeight - a) / 2 : 0, g = e.y + f;
            if (n.usePointStyle) {
                const e = {radius: Math.min(l, a) / 2, pointStyle: r.pointStyle, rotation: r.rotation, borderWidth: 1},
                    i = s.leftForLtr(u, l) + l / 2, h = g + a / 2;
                t.strokeStyle = n.multiKeyBackground, t.fillStyle = n.multiKeyBackground, ei(t, e, i, h), t.strokeStyle = o.borderColor, t.fillStyle = o.backgroundColor, ei(t, e, i, h)
            } else {
                t.lineWidth = o.borderWidth || 1, t.strokeStyle = o.borderColor, t.setLineDash(o.borderDash || []), t.lineDashOffset = o.borderDashOffset || 0;
                const e = s.leftForLtr(u, l - h), i = s.leftForLtr(s.xPlus(u, 1), l - h - 2), r = mi(o.borderRadius);
                Object.values(r).some((t => 0 !== t)) ? (t.beginPath(), t.fillStyle = n.multiKeyBackground, hi(t, {
                    x: e,
                    y: g,
                    w: l,
                    h: a,
                    radius: r
                }), t.fill(), t.stroke(), t.fillStyle = o.backgroundColor, t.beginPath(), hi(t, {
                    x: i,
                    y: g + 1,
                    w: l - 2,
                    h: a - 2,
                    radius: r
                }), t.fill()) : (t.fillStyle = n.multiKeyBackground, t.fillRect(e, g, l, a), t.strokeRect(e, g, l, a), t.fillStyle = o.backgroundColor, t.fillRect(i, g + 1, l - 2, a - 2))
            }
            t.fillStyle = this.labelTextColors[i]
        }

        drawBody(t, e, i) {
            const {body: s} = this, {
                bodySpacing: n,
                bodyAlign: o,
                displayColors: r,
                boxHeight: a,
                boxWidth: l,
                boxPadding: h
            } = i, c = xi(i.bodyFont);
            let d = c.lineHeight, u = 0;
            const f = cs(i.rtl, this.x, this.width), g = function (i) {
                e.fillText(i, f.x(t.x + u), t.y + d / 2), t.y += d + n
            }, p = f.textAlign(o);
            let m, b, x, y, _, v, w;
            for (e.textAlign = o, e.textBaseline = "middle", e.font = c.string, t.x = Sr(this, p, i), e.fillStyle = i.bodyColor, wt(this.beforeBody, g), u = r && "right" !== p ? "center" === o ? l / 2 + h : l + 2 + h : 0, y = 0, v = s.length; y < v; ++y) {
                for (m = s[y], b = this.labelTextColors[y], e.fillStyle = b, wt(m.before, g), x = m.lines, r && x.length && (this._drawColorBox(e, t, y, f, i), d = Math.max(c.lineHeight, a)), _ = 0, w = x.length; _ < w; ++_) g(x[_]), d = c.lineHeight;
                wt(m.after, g)
            }
            u = 0, d = c.lineHeight, wt(this.afterBody, g), t.y -= n
        }

        drawFooter(t, e, i) {
            const s = this.footer, n = s.length;
            let o, r;
            if (n) {
                const a = cs(i.rtl, this.x, this.width);
                for (t.x = Sr(this, i.footerAlign, i), t.y += i.footerMarginTop, e.textAlign = a.textAlign(i.footerAlign), e.textBaseline = "middle", o = xi(i.footerFont), e.fillStyle = i.footerColor, e.font = o.string, r = 0; r < n; ++r) e.fillText(s[r], a.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + i.footerSpacing
            }
        }

        drawBackground(t, e, i, s) {
            const {xAlign: n, yAlign: o} = this, {x: r, y: a} = t, {width: l, height: h} = i, {
                topLeft: c,
                topRight: d,
                bottomLeft: u,
                bottomRight: f
            } = mi(s.cornerRadius);
            e.fillStyle = s.backgroundColor, e.strokeStyle = s.borderColor, e.lineWidth = s.borderWidth, e.beginPath(), e.moveTo(r + c, a), "top" === o && this.drawCaret(t, e, i, s), e.lineTo(r + l - d, a), e.quadraticCurveTo(r + l, a, r + l, a + d), "center" === o && "right" === n && this.drawCaret(t, e, i, s), e.lineTo(r + l, a + h - f), e.quadraticCurveTo(r + l, a + h, r + l - f, a + h), "bottom" === o && this.drawCaret(t, e, i, s), e.lineTo(r + u, a + h), e.quadraticCurveTo(r, a + h, r, a + h - u), "center" === o && "left" === n && this.drawCaret(t, e, i, s), e.lineTo(r, a + c), e.quadraticCurveTo(r, a, r + c, a), e.closePath(), e.fill(), s.borderWidth > 0 && e.stroke()
        }

        _updateAnimationTarget(t) {
            const e = this.chart, i = this.$animations, s = i && i.x, n = i && i.y;
            if (s || n) {
                const i = br[t.position].call(this, this._active, this._eventPosition);
                if (!i) return;
                const o = this._size = vr(this, t), r = Object.assign({}, i, this._size), a = Mr(e, t, r),
                    l = kr(t, r, a, e);
                s._to === l.x && n._to === l.y || (this.xAlign = a.xAlign, this.yAlign = a.yAlign, this.width = o.width, this.height = o.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, l))
            }
        }

        _willRender() {
            return !!this.opacity
        }

        draw(t) {
            const e = this.options.setContext(this.getContext());
            let i = this.opacity;
            if (!i) return;
            this._updateAnimationTarget(e);
            const s = {width: this.width, height: this.height}, n = {x: this.x, y: this.y};
            i = Math.abs(i) < .001 ? 0 : i;
            const o = bi(e.padding),
                r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
            e.enabled && r && (t.save(), t.globalAlpha = i, this.drawBackground(n, t, s, e), ds(t, e.textDirection), n.y += o.top, this.drawTitle(n, t, e), this.drawBody(n, t, e), this.drawFooter(n, t, e), us(t, e.textDirection), t.restore())
        }

        getActiveElements() {
            return this._active || []
        }

        setActiveElements(t, e) {
            const i = this._active, s = t.map((({datasetIndex: t, index: e}) => {
                const i = this.chart.getDatasetMeta(t);
                if (!i) throw new Error("Cannot find a dataset at index " + t);
                return {datasetIndex: t, element: i.data[e], index: e}
            })), n = !Mt(i, s), o = this._positionChanged(s, e);
            (n || o) && (this._active = s, this._eventPosition = e, this._ignoreReplayEvents = !0, this.update(!0))
        }

        handleEvent(t, e, i = !0) {
            if (e && this._ignoreReplayEvents) return !1;
            this._ignoreReplayEvents = !1;
            const s = this.options, n = this._active || [], o = this._getActiveElements(t, n, e, i),
                r = this._positionChanged(o, t), a = e || !Mt(o, n) || r;
            return a && (this._active = o, (s.enabled || s.external) && (this._eventPosition = {
                x: t.x,
                y: t.y
            }, this.update(!0, e))), a
        }

        _getActiveElements(t, e, i, s) {
            const n = this.options;
            if ("mouseout" === t.type) return [];
            if (!s) return e;
            const o = this.chart.getElementsAtEventForMode(t, n.mode, n, i);
            return n.reverse && o.reverse(), o
        }

        _positionChanged(t, e) {
            const {caretX: i, caretY: s, options: n} = this, o = br[n.position].call(this, t, e);
            return !1 !== o && (i !== o.x || s !== o.y)
        }
    }

    Pr.positioners = br;
    var Dr = {
        id: "tooltip",
        _element: Pr,
        positioners: br,
        afterInit(t, e, i) {
            i && (t.tooltip = new Pr({chart: t, options: i}))
        },
        beforeUpdate(t, e, i) {
            t.tooltip && t.tooltip.initialize(i)
        },
        reset(t, e, i) {
            t.tooltip && t.tooltip.initialize(i)
        },
        afterDraw(t) {
            const e = t.tooltip;
            if (e && e._willRender()) {
                const i = {tooltip: e};
                if (!1 === t.notifyPlugins("beforeTooltipDraw", i)) return;
                e.draw(t.ctx), t.notifyPlugins("afterTooltipDraw", i)
            }
        },
        afterEvent(t, e) {
            if (t.tooltip) {
                const i = e.replay;
                t.tooltip.handleEvent(e.event, i, e.inChartArea) && (e.changed = !0)
            }
        },
        defaults: {
            enabled: !0,
            external: null,
            position: "average",
            backgroundColor: "rgba(0,0,0,0.8)",
            titleColor: "#fff",
            titleFont: {weight: "bold"},
            titleSpacing: 2,
            titleMarginBottom: 6,
            titleAlign: "left",
            bodyColor: "#fff",
            bodySpacing: 2,
            bodyFont: {},
            bodyAlign: "left",
            footerColor: "#fff",
            footerSpacing: 2,
            footerMarginTop: 6,
            footerFont: {weight: "bold"},
            footerAlign: "left",
            padding: 6,
            caretPadding: 2,
            caretSize: 5,
            cornerRadius: 6,
            boxHeight: (t, e) => e.bodyFont.size,
            boxWidth: (t, e) => e.bodyFont.size,
            multiKeyBackground: "#fff",
            displayColors: !0,
            boxPadding: 0,
            borderColor: "rgba(0,0,0,0)",
            borderWidth: 0,
            animation: {duration: 400, easing: "easeOutQuart"},
            animations: {
                numbers: {type: "number", properties: ["x", "y", "width", "height", "caretX", "caretY"]},
                opacity: {easing: "linear", duration: 200}
            },
            callbacks: {
                beforeTitle: ut, title(t) {
                    if (t.length > 0) {
                        const e = t[0], i = e.chart.data.labels, s = i ? i.length : 0;
                        if (this && this.options && "dataset" === this.options.mode) return e.dataset.label || "";
                        if (e.label) return e.label;
                        if (s > 0 && e.dataIndex < s) return i[e.dataIndex]
                    }
                    return ""
                }, afterTitle: ut, beforeBody: ut, beforeLabel: ut, label(t) {
                    if (this && this.options && "dataset" === this.options.mode) return t.label + ": " + t.formattedValue || t.formattedValue;
                    let e = t.dataset.label || "";
                    e && (e += ": ");
                    const i = t.formattedValue;
                    return gt(i) || (e += i), e
                }, labelColor(t) {
                    const e = t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);
                    return {
                        borderColor: e.borderColor,
                        backgroundColor: e.backgroundColor,
                        borderWidth: e.borderWidth,
                        borderDash: e.borderDash,
                        borderDashOffset: e.borderDashOffset,
                        borderRadius: 0
                    }
                }, labelTextColor() {
                    return this.options.bodyColor
                }, labelPointStyle(t) {
                    const e = t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);
                    return {pointStyle: e.pointStyle, rotation: e.rotation}
                }, afterLabel: ut, afterBody: ut, beforeFooter: ut, footer: ut, afterFooter: ut
            }
        },
        defaultRoutes: {bodyFont: "font", footerFont: "font", titleFont: "font"},
        descriptors: {
            _scriptable: t => "filter" !== t && "itemSort" !== t && "external" !== t,
            _indexable: !1,
            callbacks: {_scriptable: !1, _indexable: !1},
            animation: {_fallback: !1},
            animations: {_fallback: "animation"}
        },
        additionalOptionScopes: ["interaction"]
    }, Or = Object.freeze({
        __proto__: null,
        Decimation: Go,
        Filler: hr,
        Legend: ur,
        SubTitle: mr,
        Title: gr,
        Tooltip: Dr
    });

    class Er extends qn {
        constructor(t) {
            super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = []
        }

        init(t) {
            const e = this._addedLabels;
            if (e.length) {
                const t = this.getLabels();
                for (const {index: i, label: s} of e) t[i] === s && t.splice(i, 1);
                this._addedLabels = []
            }
            super.init(t)
        }

        parse(t, e) {
            if (gt(t)) return null;
            const i = this.getLabels();
            return ((t, e) => null === t ? null : re(Math.round(t), 0, e))(e = isFinite(e) && i[e] === t ? e : function (t, e, i, s) {
                const n = t.indexOf(e);
                return -1 === n ? ((t, e, i, s) => ("string" == typeof e ? (i = t.push(e) - 1, s.unshift({
                    index: i,
                    label: e
                })) : isNaN(e) && (i = null), i))(t, e, i, s) : n !== t.lastIndexOf(e) ? i : n
            }(i, t, yt(e, t), this._addedLabels), i.length - 1)
        }

        determineDataLimits() {
            const {minDefined: t, maxDefined: e} = this.getUserBounds();
            let {min: i, max: s} = this.getMinMax(!0);
            "ticks" === this.options.bounds && (t || (i = 0), e || (s = this.getLabels().length - 1)), this.min = i, this.max = s
        }

        buildTicks() {
            const t = this.min, e = this.max, i = this.options.offset, s = [];
            let n = this.getLabels();
            n = 0 === t && e === n.length - 1 ? n : n.slice(t, e + 1), this._valueRange = Math.max(n.length - (i ? 0 : 1), 1), this._startValue = this.min - (i ? .5 : 0);
            for (let i = t; i <= e; i++) s.push({value: i});
            return s
        }

        getLabelForValue(t) {
            const e = this.getLabels();
            return t >= 0 && t < e.length ? e[t] : t
        }

        configure() {
            super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels)
        }

        getPixelForValue(t) {
            return "number" != typeof t && (t = this.parse(t)), null === t ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange)
        }

        getPixelForTick(t) {
            const e = this.ticks;
            return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value)
        }

        getValueForPixel(t) {
            return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange)
        }

        getBasePixel() {
            return this.bottom
        }
    }

    function Tr(t, e, {horizontal: i, minRotation: s}) {
        const n = Zt(s), o = (i ? Math.sin(n) : Math.cos(n)) || .001, r = .75 * e * ("" + t).length;
        return Math.min(e / o, r)
    }

    Er.id = "category", Er.defaults = {ticks: {callback: Er.prototype.getLabelForValue}};

    class Rr extends qn {
        constructor(t) {
            super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0
        }

        parse(t, e) {
            return gt(t) || ("number" == typeof t || t instanceof Number) && !isFinite(+t) ? null : +t
        }

        handleTickRangeOptions() {
            const {beginAtZero: t} = this.options, {minDefined: e, maxDefined: i} = this.getUserBounds();
            let {min: s, max: n} = this;
            const o = t => s = e ? s : t, r = t => n = i ? n : t;
            if (t) {
                const t = Xt(s), e = Xt(n);
                t < 0 && e < 0 ? r(0) : t > 0 && e > 0 && o(0)
            }
            if (s === n) {
                let e = 1;
                (n >= Number.MAX_SAFE_INTEGER || s <= Number.MIN_SAFE_INTEGER) && (e = Math.abs(.05 * n)), r(n + e), t || o(s - e)
            }
            this.min = s, this.max = n
        }

        getTickLimit() {
            const t = this.options.ticks;
            let e, {maxTicksLimit: i, stepSize: s} = t;
            return s ? (e = Math.ceil(this.max / s) - Math.floor(this.min / s) + 1, e > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${e} ticks. Limiting to 1000.`), e = 1e3)) : (e = this.computeTickLimit(), i = i || 11), i && (e = Math.min(i, e)), e
        }

        computeTickLimit() {
            return Number.POSITIVE_INFINITY
        }

        buildTicks() {
            const t = this.options, e = t.ticks;
            let i = this.getTickLimit();
            i = Math.max(2, i);
            const s = function (t, e) {
                const i = [], {
                        bounds: s,
                        step: n,
                        min: o,
                        max: r,
                        precision: a,
                        count: l,
                        maxTicks: h,
                        maxDigits: c,
                        includeBounds: d
                    } = t, u = n || 1, f = h - 1, {min: g, max: p} = e, m = !gt(o), b = !gt(r), x = !gt(l),
                    y = (p - g) / (c + 1);
                let _, v, w, M, k = Gt((p - g) / f / u) * u;
                if (k < 1e-14 && !m && !b) return [{value: g}, {value: p}];
                M = Math.ceil(p / k) - Math.floor(g / k), M > f && (k = Gt(M * k / f / u) * u), gt(a) || (_ = Math.pow(10, a), k = Math.ceil(k * _) / _), "ticks" === s ? (v = Math.floor(g / k) * k, w = Math.ceil(p / k) * k) : (v = g, w = p), m && b && n && function (t, e) {
                    const i = Math.round(t);
                    return i - e <= t && i + e >= t
                }((r - o) / n, k / 1e3) ? (M = Math.round(Math.min((r - o) / k, h)), k = (r - o) / M, v = o, w = r) : x ? (v = m ? o : v, w = b ? r : w, M = l - 1, k = (w - v) / M) : (M = (w - v) / k, M = Kt(M, Math.round(M), k / 1e3) ? Math.round(M) : Math.ceil(M));
                const S = Math.max(te(k), te(v));
                _ = Math.pow(10, gt(a) ? S : a), v = Math.round(v * _) / _, w = Math.round(w * _) / _;
                let C = 0;
                for (m && (d && v !== o ? (i.push({value: o}), v < o && C++, Kt(Math.round((v + C * k) * _) / _, o, Tr(o, y, t)) && C++) : v < o && C++); C < M; ++C) i.push({value: Math.round((v + C * k) * _) / _});
                return b && d && w !== r ? i.length && Kt(i[i.length - 1].value, r, Tr(r, y, t)) ? i[i.length - 1].value = r : i.push({value: r}) : b && w !== r || i.push({value: w}), i
            }({
                maxTicks: i,
                bounds: t.bounds,
                min: t.min,
                max: t.max,
                precision: e.precision,
                step: e.stepSize,
                count: e.count,
                maxDigits: this._maxDigits(),
                horizontal: this.isHorizontal(),
                minRotation: e.minRotation || 0,
                includeBounds: !1 !== e.includeBounds
            }, this._range || this);
            return "ticks" === t.bounds && Jt(s, this, "value"), t.reverse ? (s.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), s
        }

        configure() {
            const t = this.ticks;
            let e = this.min, i = this.max;
            if (super.configure(), this.options.offset && t.length) {
                const s = (i - e) / Math.max(t.length - 1, 1) / 2;
                e -= s, i += s
            }
            this._startValue = e, this._endValue = i, this._valueRange = i - e
        }

        getLabelForValue(t) {
            return hs(t, this.chart.options.locale, this.options.ticks.format)
        }
    }

    class Lr extends Rr {
        determineDataLimits() {
            const {min: t, max: e} = this.getMinMax(!0);
            this.min = bt(t) ? t : 0, this.max = bt(e) ? e : 1, this.handleTickRangeOptions()
        }

        computeTickLimit() {
            const t = this.isHorizontal(), e = t ? this.width : this.height, i = Zt(this.options.ticks.minRotation),
                s = (t ? Math.sin(i) : Math.cos(i)) || .001, n = this._resolveTickFontOptions(0);
            return Math.ceil(e / Math.min(40, n.lineHeight / s))
        }

        getPixelForValue(t) {
            return null === t ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange)
        }

        getValueForPixel(t) {
            return this._startValue + this.getDecimalForPixel(t) * this._valueRange
        }
    }

    function Ir(t) {
        return 1 == t / Math.pow(10, Math.floor(Yt(t)))
    }

    Lr.id = "linear", Lr.defaults = {ticks: {callback: Bn.formatters.numeric}};

    class $r extends qn {
        constructor(t) {
            super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0
        }

        parse(t, e) {
            const i = Rr.prototype.parse.apply(this, [t, e]);
            if (0 !== i) return bt(i) && i > 0 ? i : null;
            this._zero = !0
        }

        determineDataLimits() {
            const {min: t, max: e} = this.getMinMax(!0);
            this.min = bt(t) ? Math.max(0, t) : null, this.max = bt(e) ? Math.max(0, e) : null, this.options.beginAtZero && (this._zero = !0), this.handleTickRangeOptions()
        }

        handleTickRangeOptions() {
            const {minDefined: t, maxDefined: e} = this.getUserBounds();
            let i = this.min, s = this.max;
            const n = e => i = t ? i : e, o = t => s = e ? s : t, r = (t, e) => Math.pow(10, Math.floor(Yt(t)) + e);
            i === s && (i <= 0 ? (n(1), o(10)) : (n(r(i, -1)), o(r(s, 1)))), i <= 0 && n(r(s, -1)), s <= 0 && o(r(i, 1)), this._zero && this.min !== this._suggestedMin && i === r(this.min, 0) && n(r(i, -1)), this.min = i, this.max = s
        }

        buildTicks() {
            const t = this.options, e = function (t, e) {
                const i = Math.floor(Yt(e.max)), s = Math.ceil(e.max / Math.pow(10, i)), n = [];
                let o = xt(t.min, Math.pow(10, Math.floor(Yt(e.min)))), r = Math.floor(Yt(o)),
                    a = Math.floor(o / Math.pow(10, r)), l = r < 0 ? Math.pow(10, Math.abs(r)) : 1;
                do {
                    n.push({
                        value: o,
                        major: Ir(o)
                    }), ++a, 10 === a && (a = 1, ++r, l = r >= 0 ? 1 : l), o = Math.round(a * Math.pow(10, r) * l) / l
                } while (r < i || r === i && a < s);
                const h = xt(t.max, o);
                return n.push({value: h, major: Ir(o)}), n
            }({min: this._userMin, max: this._userMax}, this);
            return "ticks" === t.bounds && Jt(e, this, "value"), t.reverse ? (e.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), e
        }

        getLabelForValue(t) {
            return void 0 === t ? "0" : hs(t, this.chart.options.locale, this.options.ticks.format)
        }

        configure() {
            const t = this.min;
            super.configure(), this._startValue = Yt(t), this._valueRange = Yt(this.max) - Yt(t)
        }

        getPixelForValue(t) {
            return void 0 !== t && 0 !== t || (t = this.min), null === t || isNaN(t) ? NaN : this.getPixelForDecimal(t === this.min ? 0 : (Yt(t) - this._startValue) / this._valueRange)
        }

        getValueForPixel(t) {
            const e = this.getDecimalForPixel(t);
            return Math.pow(10, this._startValue + e * this._valueRange)
        }
    }

    function zr(t) {
        const e = t.ticks;
        if (e.display && t.display) {
            const t = bi(e.backdropPadding);
            return yt(e.font && e.font.size, Ke.font.size) + t.height
        }
        return 0
    }

    function Fr(t, e, i, s, n) {
        return t === s || t === n ? {start: e - i / 2, end: e + i / 2} : t < s || t > n ? {
            start: e - i,
            end: e
        } : {start: e, end: e + i}
    }

    function Wr(t, e, i, s, n) {
        const o = Math.abs(Math.sin(i)), r = Math.abs(Math.cos(i));
        let a = 0, l = 0;
        s.start < e.l ? (a = (e.l - s.start) / o, t.l = Math.min(t.l, e.l - a)) : s.end > e.r && (a = (s.end - e.r) / o, t.r = Math.max(t.r, e.r + a)), n.start < e.t ? (l = (e.t - n.start) / r, t.t = Math.min(t.t, e.t - l)) : n.end > e.b && (l = (n.end - e.b) / r, t.b = Math.max(t.b, e.b + l))
    }

    function Vr(t) {
        return 0 === t || 180 === t ? "center" : t < 180 ? "left" : "right"
    }

    function Br(t, e, i) {
        return "right" === i ? t -= e : "center" === i && (t -= e / 2), t
    }

    function Nr(t, e, i) {
        return 90 === i || 270 === i ? t -= e / 2 : (i > 270 || i < 90) && (t -= e), t
    }

    function jr(t, e, i, s) {
        const {ctx: n} = t;
        if (i) n.arc(t.xCenter, t.yCenter, e, 0, Wt); else {
            let i = t.getPointPosition(0, e);
            n.moveTo(i.x, i.y);
            for (let o = 1; o < s; o++) i = t.getPointPosition(o, e), n.lineTo(i.x, i.y)
        }
    }

    $r.id = "logarithmic", $r.defaults = {ticks: {callback: Bn.formatters.logarithmic, major: {enabled: !0}}};

    class Hr extends Rr {
        constructor(t) {
            super(t), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = []
        }

        setDimensions() {
            const t = this._padding = bi(zr(this.options) / 2), e = this.width = this.maxWidth - t.width,
                i = this.height = this.maxHeight - t.height;
            this.xCenter = Math.floor(this.left + e / 2 + t.left), this.yCenter = Math.floor(this.top + i / 2 + t.top), this.drawingArea = Math.floor(Math.min(e, i) / 2)
        }

        determineDataLimits() {
            const {min: t, max: e} = this.getMinMax(!1);
            this.min = bt(t) && !isNaN(t) ? t : 0, this.max = bt(e) && !isNaN(e) ? e : 0, this.handleTickRangeOptions()
        }

        computeTickLimit() {
            return Math.ceil(this.drawingArea / zr(this.options))
        }

        generateTickLabels(t) {
            Rr.prototype.generateTickLabels.call(this, t), this._pointLabels = this.getLabels().map(((t, e) => {
                const i = vt(this.options.pointLabels.callback, [t, e], this);
                return i || 0 === i ? i : ""
            })).filter(((t, e) => this.chart.getDataVisibility(e)))
        }

        fit() {
            const t = this.options;
            t.display && t.pointLabels.display ? function (t) {
                const e = {
                        l: t.left + t._padding.left,
                        r: t.right - t._padding.right,
                        t: t.top + t._padding.top,
                        b: t.bottom - t._padding.bottom
                    }, i = Object.assign({}, e), s = [], n = [], o = t._pointLabels.length, r = t.options.pointLabels,
                    a = r.centerPointLabels ? Ft / o : 0;
                for (let d = 0; d < o; d++) {
                    const o = r.setContext(t.getPointLabelContext(d));
                    n[d] = o.padding;
                    const u = t.getPointPosition(d, t.drawingArea + n[d], a), f = xi(o.font),
                        g = (l = t.ctx, h = f, c = pt(c = t._pointLabels[d]) ? c : [c], {
                            w: Ze(l, h.string, c),
                            h: c.length * h.lineHeight
                        });
                    s[d] = g;
                    const p = ne(t.getIndexAngle(d) + a), m = Math.round(Qt(p));
                    Wr(i, e, p, Fr(m, u.x, g.w, 0, 180), Fr(m, u.y, g.h, 90, 270))
                }
                var l, h, c;
                t.setCenterPoint(e.l - i.l, i.r - e.r, e.t - i.t, i.b - e.b), t._pointLabelItems = function (t, e, i) {
                    const s = [], n = t._pointLabels.length, o = t.options, r = zr(o) / 2, a = t.drawingArea,
                        l = o.pointLabels.centerPointLabels ? Ft / n : 0;
                    for (let o = 0; o < n; o++) {
                        const n = t.getPointPosition(o, a + r + i[o], l), h = Math.round(Qt(ne(n.angle + jt))),
                            c = e[o], d = Nr(n.y, c.h, h), u = Vr(h), f = Br(n.x, c.w, u);
                        s.push({x: n.x, y: d, textAlign: u, left: f, top: d, right: f + c.w, bottom: d + c.h})
                    }
                    return s
                }(t, s, n)
            }(this) : this.setCenterPoint(0, 0, 0, 0)
        }

        setCenterPoint(t, e, i, s) {
            this.xCenter += Math.floor((t - e) / 2), this.yCenter += Math.floor((i - s) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(t, e, i, s))
        }

        getIndexAngle(t) {
            return ne(t * (Wt / (this._pointLabels.length || 1)) + Zt(this.options.startAngle || 0))
        }

        getDistanceFromCenterForValue(t) {
            if (gt(t)) return NaN;
            const e = this.drawingArea / (this.max - this.min);
            return this.options.reverse ? (this.max - t) * e : (t - this.min) * e
        }

        getValueForDistanceFromCenter(t) {
            if (gt(t)) return NaN;
            const e = t / (this.drawingArea / (this.max - this.min));
            return this.options.reverse ? this.max - e : this.min + e
        }

        getPointLabelContext(t) {
            const e = this._pointLabels || [];
            if (t >= 0 && t < e.length) {
                const i = e[t];
                return function (t, e, i) {
                    return _i(t, {label: i, index: e, type: "pointLabel"})
                }(this.getContext(), t, i)
            }
        }

        getPointPosition(t, e, i = 0) {
            const s = this.getIndexAngle(t) - jt + i;
            return {x: Math.cos(s) * e + this.xCenter, y: Math.sin(s) * e + this.yCenter, angle: s}
        }

        getPointPositionForValue(t, e) {
            return this.getPointPosition(t, this.getDistanceFromCenterForValue(e))
        }

        getBasePosition(t) {
            return this.getPointPositionForValue(t || 0, this.getBaseValue())
        }

        getPointLabelPosition(t) {
            const {left: e, top: i, right: s, bottom: n} = this._pointLabelItems[t];
            return {left: e, top: i, right: s, bottom: n}
        }

        drawBackground() {
            const {backgroundColor: t, grid: {circular: e}} = this.options;
            if (t) {
                const i = this.ctx;
                i.save(), i.beginPath(), jr(this, this.getDistanceFromCenterForValue(this._endValue), e, this._pointLabels.length), i.closePath(), i.fillStyle = t, i.fill(), i.restore()
            }
        }

        drawGrid() {
            const t = this.ctx, e = this.options, {angleLines: i, grid: s} = e, n = this._pointLabels.length;
            let o, r, a;
            if (e.pointLabels.display && function (t, e) {
                const {ctx: i, options: {pointLabels: s}} = t;
                for (let n = e - 1; n >= 0; n--) {
                    const e = s.setContext(t.getPointLabelContext(n)), o = xi(e.font), {
                        x: r,
                        y: a,
                        textAlign: l,
                        left: h,
                        top: c,
                        right: d,
                        bottom: u
                    } = t._pointLabelItems[n], {backdropColor: f} = e;
                    if (!gt(f)) {
                        const t = mi(e.borderRadius), s = bi(e.backdropPadding);
                        i.fillStyle = f;
                        const n = h - s.left, o = c - s.top, r = d - h + s.width, a = u - c + s.height;
                        Object.values(t).some((t => 0 !== t)) ? (i.beginPath(), hi(i, {
                            x: n,
                            y: o,
                            w: r,
                            h: a,
                            radius: t
                        }), i.fill()) : i.fillRect(n, o, r, a)
                    }
                    ai(i, t._pointLabels[n], r, a + o.lineHeight / 2, o, {
                        color: e.color,
                        textAlign: l,
                        textBaseline: "middle"
                    })
                }
            }(this, n), s.display && this.ticks.forEach(((t, e) => {
                0 !== e && (r = this.getDistanceFromCenterForValue(t.value), function (t, e, i, s) {
                    const n = t.ctx, o = e.circular, {color: r, lineWidth: a} = e;
                    !o && !s || !r || !a || i < 0 || (n.save(), n.strokeStyle = r, n.lineWidth = a, n.setLineDash(e.borderDash), n.lineDashOffset = e.borderDashOffset, n.beginPath(), jr(t, i, o, s), n.closePath(), n.stroke(), n.restore())
                }(this, s.setContext(this.getContext(e - 1)), r, n))
            })), i.display) {
                for (t.save(), o = n - 1; o >= 0; o--) {
                    const s = i.setContext(this.getPointLabelContext(o)), {color: n, lineWidth: l} = s;
                    l && n && (t.lineWidth = l, t.strokeStyle = n, t.setLineDash(s.borderDash), t.lineDashOffset = s.borderDashOffset, r = this.getDistanceFromCenterForValue(e.ticks.reverse ? this.min : this.max), a = this.getPointPosition(o, r), t.beginPath(), t.moveTo(this.xCenter, this.yCenter), t.lineTo(a.x, a.y), t.stroke())
                }
                t.restore()
            }
        }

        drawBorder() {
        }

        drawLabels() {
            const t = this.ctx, e = this.options, i = e.ticks;
            if (!i.display) return;
            const s = this.getIndexAngle(0);
            let n, o;
            t.save(), t.translate(this.xCenter, this.yCenter), t.rotate(s), t.textAlign = "center", t.textBaseline = "middle", this.ticks.forEach(((s, r) => {
                if (0 === r && !e.reverse) return;
                const a = i.setContext(this.getContext(r)), l = xi(a.font);
                if (n = this.getDistanceFromCenterForValue(this.ticks[r].value), a.showLabelBackdrop) {
                    t.font = l.string, o = t.measureText(s.label).width, t.fillStyle = a.backdropColor;
                    const e = bi(a.backdropPadding);
                    t.fillRect(-o / 2 - e.left, -n - l.size / 2 - e.top, o + e.width, l.size + e.height)
                }
                ai(t, s.label, 0, -n, l, {color: a.color})
            })), t.restore()
        }

        drawTitle() {
        }
    }

    Hr.id = "radialLinear", Hr.defaults = {
        display: !0,
        animate: !0,
        position: "chartArea",
        angleLines: {display: !0, lineWidth: 1, borderDash: [], borderDashOffset: 0},
        grid: {circular: !1},
        startAngle: 0,
        ticks: {showLabelBackdrop: !0, callback: Bn.formatters.numeric},
        pointLabels: {
            backdropColor: void 0,
            backdropPadding: 2,
            display: !0,
            font: {size: 10},
            callback: t => t,
            padding: 5,
            centerPointLabels: !1
        }
    }, Hr.defaultRoutes = {
        "angleLines.color": "borderColor",
        "pointLabels.color": "color",
        "ticks.color": "color"
    }, Hr.descriptors = {angleLines: {_fallback: "grid"}};
    const Ur = {
        millisecond: {common: !0, size: 1, steps: 1e3},
        second: {common: !0, size: 1e3, steps: 60},
        minute: {common: !0, size: 6e4, steps: 60},
        hour: {common: !0, size: 36e5, steps: 24},
        day: {common: !0, size: 864e5, steps: 30},
        week: {common: !1, size: 6048e5, steps: 4},
        month: {common: !0, size: 2628e6, steps: 12},
        quarter: {common: !1, size: 7884e6, steps: 4},
        year: {common: !0, size: 3154e7}
    }, Yr = Object.keys(Ur);

    function Xr(t, e) {
        return t - e
    }

    function Gr(t, e) {
        if (gt(e)) return null;
        const i = t._adapter, {parser: s, round: n, isoWeekday: o} = t._parseOpts;
        let r = e;
        return "function" == typeof s && (r = s(r)), bt(r) || (r = "string" == typeof s ? i.parse(r, s) : i.parse(r)), null === r ? null : (n && (r = "week" !== n || !qt(o) && !0 !== o ? i.startOf(r, n) : i.startOf(r, "isoWeek", o)), +r)
    }

    function qr(t, e, i, s) {
        const n = Yr.length;
        for (let o = Yr.indexOf(t); o < n - 1; ++o) {
            const t = Ur[Yr[o]], n = t.steps ? t.steps : Number.MAX_SAFE_INTEGER;
            if (t.common && Math.ceil((i - e) / (n * t.size)) <= s) return Yr[o]
        }
        return Yr[n - 1]
    }

    function Kr(t, e, i) {
        if (i) {
            if (i.length) {
                const {lo: s, hi: n} = vi(i, e);
                t[i[s] >= e ? i[s] : i[n]] = !0
            }
        } else t[e] = !0
    }

    function Jr(t, e, i) {
        const s = [], n = {}, o = e.length;
        let r, a;
        for (r = 0; r < o; ++r) a = e[r], n[a] = r, s.push({value: a, major: !1});
        return 0 !== o && i ? function (t, e, i, s) {
            const n = t._adapter, o = +n.startOf(e[0].value, s), r = e[e.length - 1].value;
            let a, l;
            for (a = o; a <= r; a = +n.add(a, 1, s)) l = i[a], l >= 0 && (e[l].major = !0);
            return e
        }(t, s, n, i) : s
    }

    class Zr extends qn {
        constructor(t) {
            super(t), this._cache = {
                data: [],
                labels: [],
                all: []
            }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0
        }

        init(t, e) {
            const i = t.time || (t.time = {}), s = this._adapter = new sn._date(t.adapters.date);
            Pt(i.displayFormats, s.formats()), this._parseOpts = {
                parser: i.parser,
                round: i.round,
                isoWeekday: i.isoWeekday
            }, super.init(t), this._normalized = e.normalized
        }

        parse(t, e) {
            return void 0 === t ? null : Gr(this, t)
        }

        beforeLayout() {
            super.beforeLayout(), this._cache = {data: [], labels: [], all: []}
        }

        determineDataLimits() {
            const t = this.options, e = this._adapter, i = t.time.unit || "day";
            let {min: s, max: n, minDefined: o, maxDefined: r} = this.getUserBounds();

            function a(t) {
                o || isNaN(t.min) || (s = Math.min(s, t.min)), r || isNaN(t.max) || (n = Math.max(n, t.max))
            }

            o && r || (a(this._getLabelBounds()), "ticks" === t.bounds && "labels" === t.ticks.source || a(this.getMinMax(!1))), s = bt(s) && !isNaN(s) ? s : +e.startOf(Date.now(), i), n = bt(n) && !isNaN(n) ? n : +e.endOf(Date.now(), i) + 1, this.min = Math.min(s, n - 1), this.max = Math.max(s + 1, n)
        }

        _getLabelBounds() {
            const t = this.getLabelTimestamps();
            let e = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY;
            return t.length && (e = t[0], i = t[t.length - 1]), {min: e, max: i}
        }

        buildTicks() {
            const t = this.options, e = t.time, i = t.ticks,
                s = "labels" === i.source ? this.getLabelTimestamps() : this._generate();
            "ticks" === t.bounds && s.length && (this.min = this._userMin || s[0], this.max = this._userMax || s[s.length - 1]);
            const n = this.min, o = function (t, e, i) {
                let s = 0, n = t.length;
                for (; s < n && t[s] < e;) s++;
                for (; n > s && t[n - 1] > i;) n--;
                return s > 0 || n < t.length ? t.slice(s, n) : t
            }(s, n, this.max);
            return this._unit = e.unit || (i.autoSkip ? qr(e.minUnit, this.min, this.max, this._getLabelCapacity(n)) : function (t, e, i, s, n) {
                for (let o = Yr.length - 1; o >= Yr.indexOf(i); o--) {
                    const i = Yr[o];
                    if (Ur[i].common && t._adapter.diff(n, s, i) >= e - 1) return i
                }
                return Yr[i ? Yr.indexOf(i) : 0]
            }(this, o.length, e.minUnit, this.min, this.max)), this._majorUnit = i.major.enabled && "year" !== this._unit ? function (t) {
                for (let e = Yr.indexOf(t) + 1, i = Yr.length; e < i; ++e) if (Ur[Yr[e]].common) return Yr[e]
            }(this._unit) : void 0, this.initOffsets(s), t.reverse && o.reverse(), Jr(this, o, this._majorUnit)
        }

        afterAutoSkip() {
            this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t => +t.value)))
        }

        initOffsets(t) {
            let e, i, s = 0, n = 0;
            this.options.offset && t.length && (e = this.getDecimalForValue(t[0]), s = 1 === t.length ? 1 - e : (this.getDecimalForValue(t[1]) - e) / 2, i = this.getDecimalForValue(t[t.length - 1]), n = 1 === t.length ? i : (i - this.getDecimalForValue(t[t.length - 2])) / 2);
            const o = t.length < 3 ? .5 : .25;
            s = re(s, 0, o), n = re(n, 0, o), this._offsets = {start: s, end: n, factor: 1 / (s + 1 + n)}
        }

        _generate() {
            const t = this._adapter, e = this.min, i = this.max, s = this.options, n = s.time,
                o = n.unit || qr(n.minUnit, e, i, this._getLabelCapacity(e)), r = yt(n.stepSize, 1),
                a = "week" === o && n.isoWeekday, l = qt(a) || !0 === a, h = {};
            let c, d, u = e;
            if (l && (u = +t.startOf(u, "isoWeek", a)), u = +t.startOf(u, l ? "day" : o), t.diff(i, e, o) > 1e5 * r) throw new Error(e + " and " + i + " are too far apart with stepSize of " + r + " " + o);
            const f = "data" === s.ticks.source && this.getDataTimestamps();
            for (c = u, d = 0; c < i; c = +t.add(c, r, o), d++) Kr(h, c, f);
            return c !== i && "ticks" !== s.bounds && 1 !== d || Kr(h, c, f), Object.keys(h).sort(((t, e) => t - e)).map((t => +t))
        }

        getLabelForValue(t) {
            const e = this._adapter, i = this.options.time;
            return i.tooltipFormat ? e.format(t, i.tooltipFormat) : e.format(t, i.displayFormats.datetime)
        }

        _tickFormatFunction(t, e, i, s) {
            const n = this.options, o = n.time.displayFormats, r = this._unit, a = this._majorUnit, l = r && o[r],
                h = a && o[a], c = i[e], d = a && h && c && c.major, u = this._adapter.format(t, s || (d ? h : l)),
                f = n.ticks.callback;
            return f ? vt(f, [u, e, i], this) : u
        }

        generateTickLabels(t) {
            let e, i, s;
            for (e = 0, i = t.length; e < i; ++e) s = t[e], s.label = this._tickFormatFunction(s.value, e, t)
        }

        getDecimalForValue(t) {
            return null === t ? NaN : (t - this.min) / (this.max - this.min)
        }

        getPixelForValue(t) {
            const e = this._offsets, i = this.getDecimalForValue(t);
            return this.getPixelForDecimal((e.start + i) * e.factor)
        }

        getValueForPixel(t) {
            const e = this._offsets, i = this.getDecimalForPixel(t) / e.factor - e.end;
            return this.min + i * (this.max - this.min)
        }

        _getLabelSize(t) {
            const e = this.options.ticks, i = this.ctx.measureText(t).width,
                s = Zt(this.isHorizontal() ? e.maxRotation : e.minRotation), n = Math.cos(s), o = Math.sin(s),
                r = this._resolveTickFontOptions(0).size;
            return {w: i * n + r * o, h: i * o + r * n}
        }

        _getLabelCapacity(t) {
            const e = this.options.time, i = e.displayFormats, s = i[e.unit] || i.millisecond,
                n = this._tickFormatFunction(t, 0, Jr(this, [t], this._majorUnit), s), o = this._getLabelSize(n),
                r = Math.floor(this.isHorizontal() ? this.width / o.w : this.height / o.h) - 1;
            return r > 0 ? r : 1
        }

        getDataTimestamps() {
            let t, e, i = this._cache.data || [];
            if (i.length) return i;
            const s = this.getMatchingVisibleMetas();
            if (this._normalized && s.length) return this._cache.data = s[0].controller.getAllParsedValues(this);
            for (t = 0, e = s.length; t < e; ++t) i = i.concat(s[t].controller.getAllParsedValues(this));
            return this._cache.data = this.normalize(i)
        }

        getLabelTimestamps() {
            const t = this._cache.labels || [];
            let e, i;
            if (t.length) return t;
            const s = this.getLabels();
            for (e = 0, i = s.length; e < i; ++e) t.push(Gr(this, s[e]));
            return this._cache.labels = this._normalized ? t : this.normalize(t)
        }

        normalize(t) {
            return Ci(t.sort(Xr))
        }
    }

    function Qr(t, e, i) {
        let s, n, o, r, a = 0, l = t.length - 1;
        i ? (e >= t[a].pos && e <= t[l].pos && ({lo: a, hi: l} = wi(t, "pos", e)), ({pos: s, time: o} = t[a]), ({
            pos: n,
            time: r
        } = t[l])) : (e >= t[a].time && e <= t[l].time && ({lo: a, hi: l} = wi(t, "time", e)), ({
            time: s,
            pos: o
        } = t[a]), ({time: n, pos: r} = t[l]));
        const h = n - s;
        return h ? o + (r - o) * (e - s) / h : o
    }

    Zr.id = "time", Zr.defaults = {
        bounds: "data",
        adapters: {},
        time: {parser: !1, unit: !1, round: !1, isoWeekday: !1, minUnit: "millisecond", displayFormats: {}},
        ticks: {source: "auto", major: {enabled: !1}}
    };

    class ta extends Zr {
        constructor(t) {
            super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0
        }

        initOffsets() {
            const t = this._getTimestampsForTable(), e = this._table = this.buildLookupTable(t);
            this._minPos = Qr(e, this.min), this._tableRange = Qr(e, this.max) - this._minPos, super.initOffsets(t)
        }

        buildLookupTable(t) {
            const {min: e, max: i} = this, s = [], n = [];
            let o, r, a, l, h;
            for (o = 0, r = t.length; o < r; ++o) l = t[o], l >= e && l <= i && s.push(l);
            if (s.length < 2) return [{time: e, pos: 0}, {time: i, pos: 1}];
            for (o = 0, r = s.length; o < r; ++o) h = s[o + 1], a = s[o - 1], l = s[o], Math.round((h + a) / 2) !== l && n.push({
                time: l,
                pos: o / (r - 1)
            });
            return n
        }

        _getTimestampsForTable() {
            let t = this._cache.all || [];
            if (t.length) return t;
            const e = this.getDataTimestamps(), i = this.getLabelTimestamps();
            return t = e.length && i.length ? this.normalize(e.concat(i)) : e.length ? e : i, t = this._cache.all = t, t
        }

        getDecimalForValue(t) {
            return (Qr(this._table, t) - this._minPos) / this._tableRange
        }

        getValueForPixel(t) {
            const e = this._offsets, i = this.getDecimalForPixel(t) / e.factor - e.end;
            return Qr(this._table, i * this._tableRange + this._minPos, !0)
        }
    }

    ta.id = "timeseries", ta.defaults = Zr.defaults;
    const ea = [Qs, Uo, Or, Object.freeze({
        __proto__: null,
        CategoryScale: Er,
        LinearScale: Lr,
        LogarithmicScale: $r,
        RadialLinearScale: Hr,
        TimeScale: Zr,
        TimeSeriesScale: ta
    })], ia = ["click", "dblclick"], sa = ["enter", "leave"], na = ia.concat(sa);

    function oa(t, e, i) {
        vt(t, [e.$context, i])
    }

    function ra(t, e) {
        let i = Number.POSITIVE_INFINITY;
        return t.filter((t => t.options.display && t.inRange(e.x, e.y))).reduce(((t, s) => {
            const n = s.getCenterPoint(), o = ie(e, n);
            return o < i ? (t = [s], i = o) : o === i && t.push(s), t
        }), []).sort(((t, e) => t._index - e._index)).slice(0, 1)[0]
    }

    function aa(t, e, i, s) {
        if (bt(e[i]) && !function (t, e, i) {
            return It(t[e]) || It(t[i])
        }(t.options, i, s)) {
            const s = t[i] !== e[i];
            return t[i] = e[i], s
        }
    }

    function la(t, e) {
        for (const i of ["scaleID", "xScaleID", "yScaleID"]) t[i] && !e[t[i]] && ha(t, i) && console.warn(`No scale found with id '${t[i]}' for annotation '${t.id}'`)
    }

    function ha(t, e) {
        if ("scaleID" === e) return !0;
        const i = e.charAt(0);
        for (const e of ["Min", "Max", "Value"]) if (It(t[i + e])) return !0;
        return !1
    }

    function ca(t, e, i, s) {
        for (const n of i) {
            const i = t[n];
            if (It(i)) {
                const t = e.parse(i);
                s.min = Math.min(s.min, t), s.max = Math.max(s.max, t)
            }
        }
    }

    const da = .001, ua = (t, e, i) => Math.min(i, Math.max(e, t));

    function fa(t, e, i) {
        for (const s of Object.keys(t)) t[s] = ua(t[s], e, i);
        return t
    }

    function ga(t, e, {x: i, y: s, width: n, height: o}, r) {
        const a = r / 2;
        return t >= i - a - da && t <= i + n + a + da && e >= s - a - da && e <= s + o + a + da
    }

    function pa(t, e) {
        const {x: i, y: s} = t.getProps(["x", "y"], e);
        return {x: i, y: s}
    }

    const ma = (t, e) => e > t || t.length > e.length && t.substr(0, e.length) === e,
        ba = t => "string" == typeof t && t.endsWith("%"), xa = t => ua(parseFloat(t) / 100, 0, 1);

    function ya(t, e) {
        return "start" === e ? 0 : "end" === e ? t : ba(e) ? xa(e) * t : t / 2
    }

    function _a(t, e) {
        return "number" == typeof e ? e : ba(e) ? xa(e) * t : t
    }

    function va(t) {
        return mt(t) ? {x: yt(t.x, "center"), y: yt(t.y, "center")} : {x: t = yt(t, "center"), y: t}
    }

    function wa(t) {
        return t && (It(t.xValue) || It(t.yValue))
    }

    const Ma = new Map;

    function ka(t) {
        if (t && "object" == typeof t) {
            const e = t.toString();
            return "[object HTMLImageElement]" === e || "[object HTMLCanvasElement]" === e
        }
    }

    function Sa(t, e, i) {
        if (i) {
            const s = e.getCenterPoint();
            t.translate(s.x, s.y), t.rotate(Zt(i)), t.translate(-s.x, -s.y)
        }
    }

    function Ca(t, e) {
        if (e && e.borderWidth) return t.lineCap = e.borderCapStyle, t.setLineDash(e.borderDash), t.lineDashOffset = e.borderDashOffset, t.lineJoin = e.borderJoinStyle, t.lineWidth = e.borderWidth, t.strokeStyle = e.borderColor, !0
    }

    function Aa(t, e) {
        t.shadowColor = e.backgroundShadowColor, t.shadowBlur = e.shadowBlur, t.shadowOffsetX = e.shadowOffsetX, t.shadowOffsetY = e.shadowOffsetY
    }

    function Pa(t, e) {
        const i = e.content;
        if (ka(i)) return {width: _a(i.width, e.width), height: _a(i.height, e.height)};
        const s = xi(e.font), n = e.textStrokeWidth, o = pt(i) ? i : [i],
            r = o.join() + s.string + n + (t._measureText ? "-spriting" : "");
        if (!Ma.has(r)) {
            t.save(), t.font = s.string;
            const e = o.length;
            let i = 0;
            for (let s = 0; s < e; s++) {
                const e = o[s];
                i = Math.max(i, t.measureText(e).width + n)
            }
            t.restore();
            const a = e * s.lineHeight + n;
            Ma.set(r, {width: i, height: a})
        }
        return Ma.get(r)
    }

    function Da(t, e, i) {
        const {x: s, y: n, width: o, height: r} = e;
        t.save(), Aa(t, i);
        const a = Ca(t, i);
        t.fillStyle = i.backgroundColor, t.beginPath(), hi(t, {
            x: s,
            y: n,
            w: o,
            h: r,
            radius: fa(mi(yt(i.cornerRadius, i.borderRadius)), 0, Math.min(o, r) / 2)
        }), t.closePath(), t.fill(), a && (t.shadowColor = i.borderShadowColor, t.stroke()), t.restore()
    }

    function Oa(t, e, i) {
        const s = i.content;
        if (ka(s)) return void t.drawImage(s, e.x, e.y, e.width, e.height);
        const n = pt(s) ? s : [s], o = xi(i.font), r = o.lineHeight, a = function (t, e) {
            const {x: i, width: s} = t, n = e.textAlign;
            return "center" === n ? i + s / 2 : "end" === n || "right" === n ? i + s : i
        }(e, i), l = e.y + r / 2 + i.textStrokeWidth / 2;
        t.save(), t.font = o.string, t.textBaseline = "middle", t.textAlign = i.textAlign, function (t, e) {
            if (e.textStrokeWidth > 0) return t.lineJoin = "round", t.miterLimit = 2, t.lineWidth = e.textStrokeWidth, t.strokeStyle = e.textStrokeColor, !0
        }(t, i) && n.forEach(((e, i) => t.strokeText(e, a, l + i * r))), t.fillStyle = i.color, n.forEach(((e, i) => t.fillText(e, a, l + i * r))), t.restore()
    }

    function Ea(t) {
        const {x: e, y: i, width: s, height: n} = t;
        return {x: e + s / 2, y: i + n / 2}
    }

    function Ta(t, e, i) {
        const s = Math.cos(i), n = Math.sin(i), o = e.x, r = e.y;
        return {x: o + s * (t.x - o) - n * (t.y - r), y: r + n * (t.x - o) + s * (t.y - r)}
    }

    function Ra(t, e, i) {
        return e = "number" == typeof e ? e : t.parse(e), bt(e) ? t.getPixelForValue(e) : i
    }

    function La(t, e) {
        if (t) {
            const i = Ra(t, e.min, e.start), s = Ra(t, e.max, e.end);
            return {start: Math.min(i, s), end: Math.max(i, s)}
        }
        return {start: e.start, end: e.end}
    }

    function Ia(t, e) {
        const {chartArea: i, scales: s} = t, n = s[e.xScaleID], o = s[e.yScaleID];
        let r = i.width / 2, a = i.height / 2;
        return n && (r = Ra(n, e.xValue, r)), o && (a = Ra(o, e.yValue, a)), {x: r, y: a}
    }

    function $a(t, e) {
        const i = t.scales[e.xScaleID], s = t.scales[e.yScaleID];
        let {top: n, left: o, bottom: r, right: a} = t.chartArea;
        if (!i && !s) return {};
        const l = La(i, {min: e.xMin, max: e.xMax, start: o, end: a});
        o = l.start, a = l.end;
        const h = La(s, {min: e.yMin, max: e.yMax, start: n, end: r});
        return n = h.start, r = h.end, {x: o, y: n, x2: a, y2: r, width: a - o, height: r - n}
    }

    function za(t, e) {
        if (!wa(e)) {
            const i = $a(t, e), s = Ea(i);
            let n = e.radius;
            return n && !isNaN(n) || (n = Math.min(i.width, i.height) / 2, e.radius = n), {
                x: s.x + e.xAdjust,
                y: s.y + e.yAdjust,
                width: 2 * n,
                height: 2 * n
            }
        }
        return function (t, e) {
            const i = Ia(t, e);
            return {x: i.x + e.xAdjust, y: i.y + e.yAdjust, width: 2 * e.radius, height: 2 * e.radius}
        }(t, e)
    }

    class Fa extends Wn {
        inRange(t, e, i) {
            const {x: s, y: n} = Ta({x: t, y: e}, this.getCenterPoint(i), Zt(-this.options.rotation));
            return ga(s, n, this.getProps(["x", "y", "width", "height"], i), this.options.borderWidth)
        }

        getCenterPoint(t) {
            return Ea(this.getProps(["x", "y", "width", "height"], t))
        }

        draw(t) {
            t.save(), Sa(t, this, this.options.rotation), Da(t, this, this.options), t.restore()
        }

        drawLabel(t) {
            const {x: e, y: i, width: s, height: n, options: o} = this, {label: r, borderWidth: a} = o, l = a / 2,
                h = va(r.position), c = bi(r.padding), d = Pa(t, r),
                u = {x: Wa(this, d, h, c), y: Va(this, d, h, c), width: d.width, height: d.height};
            t.save(), Sa(t, this, r.rotation), t.beginPath(), t.rect(e + l + c.left, i + l + c.top, s - a - c.width, n - a - c.height), t.clip(), Oa(t, u, r), t.restore()
        }

        resolveElementProperties(t, e) {
            return $a(t, e)
        }
    }

    function Wa(t, e, i, s) {
        const {x: n, x2: o, width: r, options: a} = t, {xAdjust: l, borderWidth: h} = a.label;
        return Ba({start: n, end: o, size: r}, {
            position: i.x,
            padding: {start: s.left, end: s.right},
            adjust: l,
            borderWidth: h,
            size: e.width
        })
    }

    function Va(t, e, i, s) {
        const {y: n, y2: o, height: r, options: a} = t, {yAdjust: l, borderWidth: h} = a.label;
        return Ba({start: n, end: o, size: r}, {
            position: i.y,
            padding: {start: s.top, end: s.bottom},
            adjust: l,
            borderWidth: h,
            size: e.height
        })
    }

    function Ba(t, e) {
        const {start: i, end: s} = t, {position: n, padding: {start: o, end: r}, adjust: a, borderWidth: l} = e;
        return i + l / 2 + a + o + ya(s - l - i - o - r - e.size, n)
    }

    Fa.id = "boxAnnotation", Fa.defaults = {
        adjustScaleRange: !0,
        backgroundShadowColor: "transparent",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0,
        borderJoinStyle: "miter",
        borderRadius: 0,
        borderShadowColor: "transparent",
        borderWidth: 1,
        cornerRadius: void 0,
        display: !0,
        label: {
            borderWidth: void 0,
            color: "black",
            content: null,
            drawTime: void 0,
            enabled: !1,
            font: {family: void 0, lineHeight: void 0, size: void 0, style: void 0, weight: "bold"},
            height: void 0,
            padding: 6,
            position: "center",
            rotation: void 0,
            textAlign: "start",
            textStrokeColor: void 0,
            textStrokeWidth: 0,
            xAdjust: 0,
            yAdjust: 0,
            width: void 0
        },
        rotation: 0,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        xMax: void 0,
        xMin: void 0,
        xScaleID: "x",
        yMax: void 0,
        yMin: void 0,
        yScaleID: "y"
    }, Fa.defaultRoutes = {borderColor: "color", backgroundColor: "color"}, Fa.descriptors = {label: {_fallback: !0}};
    const Na = (t, e, i) => ({x: t.x + i * (e.x - t.x), y: t.y + i * (e.y - t.y)}),
        ja = (t, e, i) => Na(e, i, Math.abs((t - e.y) / (i.y - e.y))).x,
        Ha = (t, e, i) => Na(e, i, Math.abs((t - e.x) / (i.x - e.x))).y, Ua = t => t * t, Ya = .001;

    function Xa({x: t, y: e, x2: i, y2: s}, {top: n, right: o, bottom: r, left: a}) {
        return !(t < a && i < a || t > o && i > o || e < n && s < n || e > r && s > r)
    }

    function Ga({x: t, y: e}, i, {top: s, right: n, bottom: o, left: r}) {
        return t < r && (e = Ha(r, {x: t, y: e}, i), t = r), t > n && (e = Ha(n, {
            x: t,
            y: e
        }, i), t = n), e < s && (t = ja(s, {x: t, y: e}, i), e = s), e > o && (t = ja(o, {
            x: t,
            y: e
        }, i), e = o), {x: t, y: e}
    }

    class qa extends Wn {
        intersects(t, e, i = .001, s) {
            const {x: n, y: o, x2: r, y2: a} = this.getProps(["x", "y", "x2", "y2"], s), l = r - n, h = a - o,
                c = Ua(l) + Ua(h), d = 0 === c ? -1 : ((t - n) * l + (e - o) * h) / c;
            let u, f;
            return d < 0 ? (u = n, f = o) : d > 1 ? (u = r, f = a) : (u = n + d * l, f = o + d * h), Ua(t - u) + Ua(e - f) <= i
        }

        labelIsVisible(t, e) {
            const i = this.options.label;
            return !(!i || !i.enabled) && (!e || Xa(this.getProps(["x", "y", "x2", "y2"], t), e))
        }

        isOnLabel(t, e, i) {
            if (!this.labelIsVisible(i)) return !1;
            const {
                    labelX: s,
                    labelY: n,
                    labelWidth: o,
                    labelHeight: r,
                    labelRotation: a
                } = this.getProps(["labelX", "labelY", "labelWidth", "labelHeight", "labelRotation"], i), {
                    x: l,
                    y: h
                } = Ta({x: t, y: e}, {x: s, y: n}, -a), c = this.options.label.borderWidth / 2 || 0, d = o / 2 + c,
                u = r / 2 + c;
            return l >= s - d - Ya && l <= s + d + Ya && h >= n - u - Ya && h <= n + u + Ya
        }

        inRange(t, e, i) {
            const s = Ua(this.options.borderWidth / 2);
            return this.intersects(t, e, s, i) || this.isOnLabel(t, e, i)
        }

        getCenterPoint() {
            return {x: (this.x2 + this.x) / 2, y: (this.y2 + this.y) / 2}
        }

        draw(t) {
            const {x: e, y: i, x2: s, y2: n, options: o} = this;
            if (t.save(), !Ca(t, o)) return t.restore();
            Aa(t, o);
            const r = Math.atan2(n - i, s - e), a = Math.sqrt(Math.pow(s - e, 2) + Math.pow(n - i, 2)), {
                startOpts: l,
                endOpts: h,
                startAdjust: c,
                endAdjust: d
            } = function (t) {
                const e = t.options, i = e.arrowHeads && e.arrowHeads.start, s = e.arrowHeads && e.arrowHeads.end;
                return {startOpts: i, endOpts: s, startAdjust: Qa(t, i), endAdjust: Qa(t, s)}
            }(this);
            t.translate(e, i), t.rotate(r), t.beginPath(), t.moveTo(0 + c, 0), t.lineTo(a - d, 0), t.shadowColor = o.borderShadowColor, t.stroke(), tl(t, 0, c, l), tl(t, a, -d, h), t.restore()
        }

        drawLabel(t, e) {
            if (!this.labelIsVisible(!1, e)) return;
            const {
                labelX: i,
                labelY: s,
                labelWidth: n,
                labelHeight: o,
                labelRotation: r,
                labelPadding: a,
                labelTextSize: l,
                options: {label: h}
            } = this;
            t.save(), t.translate(i, s), t.rotate(r), Da(t, {
                x: -n / 2,
                y: -o / 2,
                width: n,
                height: o
            }, h), Oa(t, {
                x: -n / 2 + a.left + h.borderWidth / 2,
                y: -o / 2 + a.top + h.borderWidth / 2,
                width: l.width,
                height: l.height
            }, h), t.restore()
        }

        resolveElementProperties(t, e) {
            const i = t.scales[e.scaleID];
            let s, n, {top: o, left: r, bottom: a, right: l} = t.chartArea;
            if (i) s = Ra(i, e.value, NaN), n = Ra(i, e.endValue, s), i.isHorizontal() ? (r = s, l = n) : (o = s, a = n); else {
                const i = t.scales[e.xScaleID], s = t.scales[e.yScaleID];
                i && (r = Ra(i, e.xMin, r), l = Ra(i, e.xMax, l)), s && (o = Ra(s, e.yMin, o), a = Ra(s, e.yMax, a))
            }
            const h = Xa({x: r, y: o, x2: l, y2: a}, t.chartArea) ? function (t, e, i) {
                const {x: s, y: n} = Ga(t, e, i), {x: o, y: r} = Ga(e, t, i);
                return {x: s, y: n, x2: o, y2: r, width: Math.abs(o - s), height: Math.abs(r - n)}
            }({x: r, y: o}, {x: l, y: a}, t.chartArea) : {
                x: r,
                y: o,
                x2: l,
                y2: a,
                width: Math.abs(l - r),
                height: Math.abs(a - o)
            }, c = e.label;
            return c && c.content ? function (t, e, i) {
                const {padding: s, xPadding: n, yPadding: o, borderWidth: r} = i, a = function (t, e, i) {
                    let s = t;
                    return (e || i) && (s = {x: e || 6, y: i || 6}), bi(s)
                }(s, n, o), l = Pa(e.ctx, i), h = function (t, e, i, s) {
                    const {width: n, height: o, padding: r} = i, {xAdjust: a, yAdjust: l} = e, h = {x: t.x, y: t.y},
                        c = {x: t.x2, y: t.y2}, d = "auto" === e.rotation ? function (t) {
                            const {x: e, y: i, x2: s, y2: n} = t, o = Math.atan2(n - i, s - e);
                            return o > Ft / 2 ? o - Ft : o < Ft / -2 ? o + Ft : o
                        }(t) : Zt(e.rotation), u = function (t, e, i) {
                            const s = Math.cos(i), n = Math.sin(i);
                            return {w: Math.abs(t * s) + Math.abs(e * n), h: Math.abs(t * n) + Math.abs(e * s)}
                        }(n, o, d), f = function (t, e, i, s) {
                            let n;
                            const o = function (t, e) {
                                const {x: i, x2: s, y: n, y2: o} = t, r = Math.min(n, o) - e.top,
                                    a = Math.min(i, s) - e.left, l = e.bottom - Math.max(n, o),
                                    h = e.right - Math.max(i, s);
                                return {x: Math.min(a, h), y: Math.min(r, l), dx: a <= h ? 1 : -1, dy: r <= l ? 1 : -1}
                            }(t, s);
                            return n = "start" === e.position ? Ja({
                                w: t.x2 - t.x,
                                h: t.y2 - t.y
                            }, i, 0, o) : "end" === e.position ? 1 - Ja({
                                w: t.x - t.x2,
                                h: t.y - t.y2
                            }, i, 0, o) : ya(1, e.position), n
                        }(t, e, {labelSize: u, padding: r}, s), g = Na(h, c, f),
                        p = {size: u.w, min: s.left, max: s.right, padding: r.left},
                        m = {size: u.h, min: s.top, max: s.bottom, padding: r.top};
                    return {x: Za(g.x, p) + a, y: Za(g.y, m) + l, width: n, height: o, rotation: d}
                }(t, i, {width: l.width + a.width + r, height: l.height + a.height + r, padding: a}, e.chartArea);
                return t.labelX = h.x, t.labelY = h.y, t.labelWidth = h.width, t.labelHeight = h.height, t.labelRotation = h.rotation, t.labelPadding = a, t.labelTextSize = l, t
            }(h, t, c) : h
        }
    }

    qa.id = "lineAnnotation";
    const Ka = {
        backgroundColor: void 0,
        backgroundShadowColor: void 0,
        borderColor: void 0,
        borderDash: void 0,
        borderDashOffset: void 0,
        borderShadowColor: void 0,
        borderWidth: void 0,
        enabled: void 0,
        fill: void 0,
        length: void 0,
        shadowBlur: void 0,
        shadowOffsetX: void 0,
        shadowOffsetY: void 0,
        width: void 0
    };

    function Ja(t, e, i, s) {
        const {labelSize: n, padding: o} = e, r = t.w * s.dx, a = t.h * s.dy, l = r > 0 && (n.w / 2 + o.left - s.x) / r,
            h = a > 0 && (n.h / 2 + o.top - s.y) / a;
        return ua(Math.max(l, h), 0, .25)
    }

    function Za(t, e) {
        const {size: i, min: s, max: n, padding: o} = e, r = i / 2;
        return i > n - s ? (n + s) / 2 : (s >= t - o - r && (t = s + o + r), n <= t + o + r && (t = n - o - r), t)
    }

    function Qa(t, e) {
        if (!e || !e.enabled) return 0;
        const {length: i, width: s} = e, n = t.options.borderWidth / 2, o = {x: i, y: s + n}, r = {x: 0, y: n};
        return Math.abs(ja(0, o, r))
    }

    function tl(t, e, i, s) {
        if (!s || !s.enabled) return;
        const {length: n, width: o, fill: r, backgroundColor: a, borderColor: l} = s, h = Math.abs(e - n) + i;
        t.beginPath(), Aa(t, s), Ca(t, s), t.moveTo(h, -o), t.lineTo(e + i, 0), t.lineTo(h, o), !0 === r ? (t.fillStyle = a || l, t.closePath(), t.fill(), t.shadowColor = "transparent") : t.shadowColor = s.borderShadowColor, t.stroke()
    }

    qa.defaults = {
        adjustScaleRange: !0,
        arrowHeads: {
            enabled: !1,
            end: Object.assign({}, Ka),
            fill: !1,
            length: 12,
            start: Object.assign({}, Ka),
            width: 6
        },
        borderDash: [],
        borderDashOffset: 0,
        borderShadowColor: "transparent",
        borderWidth: 2,
        display: !0,
        endValue: void 0,
        label: {
            backgroundColor: "rgba(0,0,0,0.8)",
            backgroundShadowColor: "transparent",
            borderCapStyle: "butt",
            borderColor: "black",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            borderRadius: 6,
            borderShadowColor: "transparent",
            borderWidth: 0,
            color: "#fff",
            content: null,
            cornerRadius: void 0,
            drawTime: void 0,
            enabled: !1,
            font: {family: void 0, lineHeight: void 0, size: void 0, style: void 0, weight: "bold"},
            height: void 0,
            padding: 6,
            position: "center",
            rotation: 0,
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            textAlign: "center",
            textStrokeColor: void 0,
            textStrokeWidth: 0,
            width: void 0,
            xAdjust: 0,
            xPadding: void 0,
            yAdjust: 0,
            yPadding: void 0
        },
        scaleID: void 0,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        value: void 0,
        xMax: void 0,
        xMin: void 0,
        xScaleID: "x",
        yMax: void 0,
        yMin: void 0,
        yScaleID: "y"
    }, qa.descriptors = {
        arrowHeads: {
            start: {_fallback: !0},
            end: {_fallback: !0},
            _fallback: !0
        }
    }, qa.defaultRoutes = {borderColor: "color"};

    class el extends Wn {
        inRange(t, e, i) {
            return function (t, e, i, s) {
                const {width: n, height: o} = e, r = e.getCenterPoint(!0), a = n / 2, l = o / 2;
                if (a <= 0 || l <= 0) return !1;
                const h = Zt(i || 0), c = s / 2 || 0, d = Math.cos(h), u = Math.sin(h),
                    f = Math.pow(d * (t.x - r.x) + u * (t.y - r.y), 2),
                    g = Math.pow(u * (t.x - r.x) - d * (t.y - r.y), 2);
                return f / Math.pow(a + c, 2) + g / Math.pow(l + c, 2) <= 1.0001
            }({x: t, y: e}, this.getProps(["width", "height"], i), this.options.rotation, this.options.borderWidth)
        }

        getCenterPoint(t) {
            return Ea(this.getProps(["x", "y", "width", "height"], t))
        }

        draw(t) {
            const {width: e, height: i, options: s} = this, n = this.getCenterPoint();
            t.save(), Sa(t, this, s.rotation), Aa(t, this.options), t.beginPath(), t.fillStyle = s.backgroundColor;
            const o = Ca(t, s);
            t.ellipse(n.x, n.y, i / 2, e / 2, Ft / 2, 0, 2 * Ft), t.fill(), o && (t.shadowColor = s.borderShadowColor, t.stroke()), t.restore()
        }

        resolveElementProperties(t, e) {
            return $a(t, e)
        }
    }

    el.id = "ellipseAnnotation", el.defaults = {
        adjustScaleRange: !0,
        backgroundShadowColor: "transparent",
        borderDash: [],
        borderDashOffset: 0,
        borderShadowColor: "transparent",
        borderWidth: 1,
        display: !0,
        rotation: 0,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        xMax: void 0,
        xMin: void 0,
        xScaleID: "x",
        yMax: void 0,
        yMin: void 0,
        yScaleID: "y"
    }, el.defaultRoutes = {borderColor: "color", backgroundColor: "color"};

    class il extends Wn {
        inRange(t, e, i) {
            const {x: s, y: n} = Ta({x: t, y: e}, this.getCenterPoint(i), Zt(-this.options.rotation));
            return ga(s, n, this.getProps(["x", "y", "width", "height"], i), this.options.borderWidth)
        }

        getCenterPoint(t) {
            return Ea(this.getProps(["x", "y", "width", "height"], t))
        }

        draw(t) {
            if (!this.options.content) return;
            const {labelX: e, labelY: i, labelWidth: s, labelHeight: n, options: o} = this;
            t.save(), Sa(t, this, o.rotation), function (t, e) {
                const {pointX: i, pointY: s, calloutPosition: n, options: o} = e;
                if (!n || e.inRange(i, s)) return;
                const r = o.callout;
                t.save(), t.beginPath();
                if (!Ca(t, r)) return t.restore();
                const {separatorStart: a, separatorEnd: l} = function (t, e) {
                    const {x: i, y: s, width: n, height: o} = t, r = function (t, e) {
                        const {width: i, height: s, options: n} = t, o = n.callout.margin + n.borderWidth / 2;
                        return "right" === e ? i + o : "bottom" === e ? s + o : -o
                    }(t, e);
                    let a, l;
                    return "left" === e || "right" === e ? (a = {x: i + r, y: s}, l = {
                        x: a.x,
                        y: a.y + o
                    }) : (a = {x: i, y: s + r}, l = {x: a.x + n, y: a.y}), {separatorStart: a, separatorEnd: l}
                }(e, n), {sideStart: h, sideEnd: c} = function (t, e, i) {
                    const {y: s, width: n, height: o, options: r} = t, a = r.callout.start, l = function (t, e) {
                        const i = e.side;
                        return "left" === t || "top" === t ? -i : i
                    }(e, r.callout);
                    let h, c;
                    return "left" === e || "right" === e ? (h = {x: i.x, y: s + _a(o, a)}, c = {
                        x: h.x + l,
                        y: h.y
                    }) : (h = {x: i.x + _a(n, a), y: i.y}, c = {x: h.x, y: h.y + l}), {sideStart: h, sideEnd: c}
                }(e, n, a);
                (r.margin > 0 || 0 === o.borderWidth) && (t.moveTo(a.x, a.y), t.lineTo(l.x, l.y)), t.moveTo(h.x, h.y), t.lineTo(c.x, c.y);
                const d = Ta({x: i, y: s}, e.getCenterPoint(), Zt(-o.rotation));
                t.lineTo(d.x, d.y), t.stroke(), t.restore()
            }(t, this), Da(t, this, o), Oa(t, {x: e, y: i, width: s, height: n}, o), t.restore()
        }

        resolveElementProperties(t, e) {
            const i = wa(e) ? Ia(t, e) : Ea($a(t, e)), s = bi(e.padding), n = Pa(t.ctx, e), o = function (t, e, i, s) {
                const n = e.width + s.width + i.borderWidth, o = e.height + s.height + i.borderWidth,
                    r = va(i.position);
                return {x: sl(t.x, n, i.xAdjust, r.x), y: sl(t.y, o, i.yAdjust, r.y), width: n, height: o}
            }(i, n, e, s), r = e.borderWidth / 2, a = {
                pointX: i.x,
                pointY: i.y, ...o,
                labelX: o.x + s.left + r,
                labelY: o.y + s.top + r,
                labelWidth: n.width,
                labelHeight: n.height
            };
            return a.calloutPosition = e.callout.enabled && function (t, e, i) {
                const s = e.position;
                return "left" === s || "right" === s || "top" === s || "bottom" === s ? s : function (t, e, i) {
                    const {x: s, y: n, width: o, height: r, pointX: a, pointY: l} = t, h = {x: s + o / 2, y: n + r / 2},
                        c = e.start, d = _a(o, c), u = _a(r, c), f = [s, s + d, s + d, s + o],
                        g = [n + u, n + r, n, n + u], p = [];
                    for (let t = 0; t < 4; t++) {
                        const e = Ta({x: f[t], y: g[t]}, h, Zt(i));
                        p.push({position: nl[t], distance: ie(e, {x: a, y: l})})
                    }
                    return p.sort(((t, e) => t.distance - e.distance))[0].position
                }(t, e, i)
            }(a, e.callout, e.rotation), a
        }
    }

    function sl(t, e, i = 0, s) {
        return t - ya(e, s) + i
    }

    il.id = "labelAnnotation", il.defaults = {
        adjustScaleRange: !0,
        backgroundColor: "transparent",
        backgroundShadowColor: "transparent",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0,
        borderJoinStyle: "miter",
        borderRadius: 0,
        borderShadowColor: "transparent",
        borderWidth: 0,
        callout: {
            borderCapStyle: "butt",
            borderColor: void 0,
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            borderWidth: 1,
            enabled: !1,
            margin: 5,
            position: "auto",
            side: 5,
            start: "50%"
        },
        color: "black",
        content: null,
        display: !0,
        font: {family: void 0, lineHeight: void 0, size: void 0, style: void 0, weight: void 0},
        height: void 0,
        padding: 6,
        position: "center",
        rotation: 0,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        textAlign: "center",
        textStrokeColor: void 0,
        textStrokeWidth: 0,
        width: void 0,
        xAdjust: 0,
        xMax: void 0,
        xMin: void 0,
        xScaleID: "x",
        xValue: void 0,
        yAdjust: 0,
        yMax: void 0,
        yMin: void 0,
        yScaleID: "y",
        yValue: void 0
    }, il.defaultRoutes = {borderColor: "color"};
    const nl = ["left", "bottom", "top", "right"];

    class ol extends Wn {
        inRange(t, e, i) {
            const {width: s} = this.getProps(["width"], i);
            return function (t, e, i, s) {
                if (!t || !e || i <= 0) return !1;
                const n = s / 2 || 0;
                return Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2) <= Math.pow(i + n, 2)
            }({x: t, y: e}, this.getCenterPoint(i), s / 2, this.options.borderWidth)
        }

        getCenterPoint(t) {
            return pa(this, t)
        }

        draw(t) {
            const e = this.options, i = e.borderWidth;
            if (e.radius < .1) return;
            t.save(), t.fillStyle = e.backgroundColor, Aa(t, e);
            const s = Ca(t, e);
            e.borderWidth = 0, ei(t, e, this.x, this.y), s && !ka(e.pointStyle) && (t.shadowColor = e.borderShadowColor, t.stroke()), t.restore(), e.borderWidth = i
        }

        resolveElementProperties(t, e) {
            return za(t, e)
        }
    }

    ol.id = "pointAnnotation", ol.defaults = {
        adjustScaleRange: !0,
        backgroundShadowColor: "transparent",
        borderDash: [],
        borderDashOffset: 0,
        borderShadowColor: "transparent",
        borderWidth: 1,
        display: !0,
        pointStyle: "circle",
        radius: 10,
        rotation: 0,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        xAdjust: 0,
        xMax: void 0,
        xMin: void 0,
        xScaleID: "x",
        xValue: void 0,
        yAdjust: 0,
        yMax: void 0,
        yMin: void 0,
        yScaleID: "y",
        yValue: void 0
    }, ol.defaultRoutes = {borderColor: "color", backgroundColor: "color"};

    class rl extends Wn {
        inRange(t, e, i) {
            return this.options.radius >= .1 && this.elements.length > 1 && function (t, e, i, s) {
                let n = !1, o = t[t.length - 1].getProps(["bX", "bY"], s);
                for (const r of t) {
                    const t = r.getProps(["bX", "bY"], s);
                    t.bY > i != o.bY > i && e < (o.bX - t.bX) * (i - t.bY) / (o.bY - t.bY) + t.bX && (n = !n), o = t
                }
                return n
            }(this.elements, t, e, i)
        }

        getCenterPoint(t) {
            return pa(this, t)
        }

        draw(t) {
            const {elements: e, options: i} = this;
            t.save(), t.beginPath(), t.fillStyle = i.backgroundColor, Aa(t, i);
            const s = Ca(t, i);
            let n = !0;
            for (const i of e) n ? (t.moveTo(i.x, i.y), n = !1) : t.lineTo(i.x, i.y);
            t.closePath(), t.fill(), s && (t.shadowColor = i.borderShadowColor, t.stroke()), t.restore()
        }

        resolveElementProperties(t, e) {
            const {x: i, y: s, width: n, height: o} = za(t, e), {sides: r, radius: a, rotation: l, borderWidth: h} = e,
                c = h / 2, d = [], u = 2 * Ft / r;
            let f = l * Nt;
            for (let t = 0; t < r; t++, f += u) {
                const t = Math.sin(f), e = Math.cos(f);
                d.push({
                    type: "point",
                    optionScope: "point",
                    properties: {x: i + t * a, y: s - e * a, bX: i + t * (a + c), bY: s - e * (a + c)}
                })
            }
            return {x: i, y: s, width: n, height: o, elements: d, initProperties: {x: i, y: s}}
        }
    }

    rl.id = "polygonAnnotation", rl.defaults = {
        adjustScaleRange: !0,
        backgroundShadowColor: "transparent",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0,
        borderJoinStyle: "miter",
        borderShadowColor: "transparent",
        borderWidth: 1,
        display: !0,
        point: {radius: 0},
        radius: 10,
        rotation: 0,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        sides: 3,
        xAdjust: 0,
        xMax: void 0,
        xMin: void 0,
        xScaleID: "x",
        xValue: void 0,
        yAdjust: 0,
        yMax: void 0,
        yMin: void 0,
        yScaleID: "y",
        yValue: void 0
    }, rl.defaultRoutes = {borderColor: "color", backgroundColor: "color"};
    const al = {box: Fa, ellipse: el, label: il, line: qa, point: ol, polygon: rl};
    Object.keys(al).forEach((t => {
        Ke.describe(`elements.${al[t].id}`, {_fallback: "plugins.annotation"})
    }));
    const ll = {update: Object.assign};

    function hl(t = "line") {
        return al[t] ? t : (console.warn(`Unknown annotation type: '${t}', defaulting to 'line'`), "line")
    }

    function cl(t) {
        return isNaN(t.x) || isNaN(t.y)
    }

    function dl(t, {elements: e, initProperties: i}, s, n) {
        const o = t.elements || (t.elements = []);
        o.length = e.length;
        for (let t = 0; t < e.length; t++) {
            const r = e[t], a = r.properties, l = ul(o, t, r.type, i), h = s[r.optionScope].override(r);
            a.options = fl(h), n.update(l, a)
        }
    }

    function ul(t, e, i, s) {
        const n = al[hl(i)];
        let o = t[e];
        return o && o instanceof n || (o = t[e] = new n, mt(s) && Object.assign(o, s)), o
    }

    function fl(t) {
        const e = al[hl(t.type)], i = {};
        i.id = t.id, i.type = t.type, i.drawTime = t.drawTime, Object.assign(i, gl(t, e.defaults), gl(t, e.defaultRoutes));
        for (const e of na) i[e] = t[e];
        return i
    }

    function gl(t, e) {
        const i = {};
        for (const s of Object.keys(e)) {
            const n = e[s], o = t[s];
            i[s] = mt(n) ? gl(o, n) : o
        }
        return i
    }

    function pl(t, e, i) {
        return e.$context || (e.$context = Object.assign(Object.create(t.getContext()), {
            element: e,
            id: i.id,
            type: "annotation"
        }))
    }

    const ml = new Map;
    var bl = {
        id: "annotation",
        version: "1.4.0",
        afterRegister() {
            wo.register(al), function (t, e, i, s = !0) {
                const n = i.split(".");
                let o = 0;
                for (const r of e.split(".")) {
                    const a = n[o++];
                    if (parseInt(r, 10) < parseInt(a, 10)) break;
                    if (ma(a, r)) {
                        if (s) throw new Error(`${t} v${i} is not supported. v${e} or newer is required.`);
                        return !1
                    }
                }
                return !0
            }("chart.js", "3.7", wo.version, !1) || (console.warn("chartjs-plugin-annotation has known issues with chart.js versions prior to 3.7, please consider upgrading."), wo.defaults.set("elements.lineAnnotation", {
                callout: {},
                font: {},
                padding: 6
            }))
        },
        afterUnregister() {
            wo.unregister(al)
        },
        beforeInit(t) {
            ml.set(t, {
                annotations: [],
                elements: [],
                visibleElements: [],
                listeners: {},
                listened: !1,
                moveListened: !1
            })
        },
        beforeUpdate(t, e, i) {
            const s = ml.get(t).annotations = [];
            let n = i.annotations;
            mt(n) ? Object.keys(n).forEach((t => {
                const e = n[t];
                mt(e) && (e.id = t, s.push(e))
            })) : pt(n) && s.push(...n), function (t, e) {
                for (const i of t) la(i, e)
            }(s, t.scales)
        },
        afterDataLimits(t, e) {
            const i = ml.get(t);
            !function (t, e, i) {
                const s = function (t, e) {
                    const i = t.axis, s = t.id, n = i + "ScaleID",
                        o = {min: yt(t.min, Number.NEGATIVE_INFINITY), max: yt(t.max, Number.POSITIVE_INFINITY)};
                    for (const r of e) r.scaleID === s ? ca(r, t, ["value", "endValue"], o) : r[n] === s && ca(r, t, [i + "Min", i + "Max", i + "Value"], o);
                    return o
                }(e, i);
                let n = aa(e, s, "min", "suggestedMin");
                n = aa(e, s, "max", "suggestedMax") || n, n && "function" == typeof e.handleTickRangeOptions && e.handleTickRangeOptions()
            }(0, e.scale, i.annotations.filter((t => t.display && t.adjustScaleRange)))
        },
        afterUpdate(t, e, i) {
            const s = ml.get(t);
            !function (t, e, i) {
                e.listened = !1, e.moveListened = !1, na.forEach((t => {
                    "function" == typeof i[t] ? (e.listened = !0, e.listeners[t] = i[t]) : It(e.listeners[t]) && delete e.listeners[t]
                })), sa.forEach((t => {
                    "function" == typeof i[t] && (e.moveListened = !0)
                })), e.listened && e.moveListened || e.annotations.forEach((t => {
                    e.listened || ia.forEach((i => {
                        "function" == typeof t[i] && (e.listened = !0)
                    })), e.moveListened || sa.forEach((i => {
                        "function" == typeof t[i] && (e.listened = !0, e.moveListened = !0)
                    }))
                }))
            }(0, s, i), function (t, e, i, s) {
                const n = function (t, e, i) {
                    return "reset" === i || "none" === i || "resize" === i ? ll : new ks(t, e)
                }(t, i.animations, s), o = e.annotations, r = function (t, e) {
                    const i = e.length, s = t.length;
                    if (s < i) {
                        const e = i - s;
                        t.splice(s, 0, ...new Array(e))
                    } else s > i && t.splice(i, s - i);
                    return t
                }(e.elements, o);
                for (let e = 0; e < o.length; e++) {
                    const i = o[e], s = ul(r, e, i.type), a = i.setContext(pl(t, s, i)),
                        l = s.resolveElementProperties(t, a);
                    l.skip = cl(l), "elements" in l && (dl(s, l, a, n), delete l.elements), It(s.x) || Object.assign(s, l), l.options = fl(a), n.update(s, l)
                }
            }(t, s, i, e.mode), s.visibleElements = s.elements.filter((t => !t.skip && t.options.display))
        },
        beforeDatasetsDraw(t, e, i) {
            xl(t, "beforeDatasetsDraw", i.clip)
        },
        afterDatasetsDraw(t, e, i) {
            xl(t, "afterDatasetsDraw", i.clip)
        },
        beforeDraw(t, e, i) {
            xl(t, "beforeDraw", i.clip)
        },
        afterDraw(t, e, i) {
            xl(t, "afterDraw", i.clip)
        },
        beforeEvent(t, e, i) {
            !function (t, e, i) {
                if (t.listened) switch (e.type) {
                    case"mousemove":
                    case"mouseout":
                        !function (t, e) {
                            if (!t.moveListened) return;
                            let i;
                            "mousemove" === e.type && (i = ra(t.elements, e));
                            const s = t.hovered;
                            t.hovered = i, function (t, e, i) {
                                const {previous: s, element: n} = e;
                                s && s !== n && oa(s.options.leave || t.listeners.leave, s, i), n && n !== s && oa(n.options.enter || t.listeners.enter, n, i)
                            }(t, {previous: s, element: i}, e)
                        }(t, e);
                        break;
                    case"click":
                        !function (t, e, i) {
                            const s = t.listeners, n = ra(t.elements, e);
                            if (n) {
                                const t = n.options, o = t.dblclick || s.dblclick, r = t.click || s.click;
                                n.clickTimeout ? (clearTimeout(n.clickTimeout), delete n.clickTimeout, oa(o, n, e)) : o ? n.clickTimeout = setTimeout((() => {
                                    delete n.clickTimeout, oa(r, n, e)
                                }), i.dblClickSpeed) : oa(r, n, e)
                            }
                        }(t, e, i)
                }
            }(ml.get(t), e.event, i)
        },
        destroy(t) {
            ml.delete(t)
        },
        _getState: t => ml.get(t),
        defaults: {
            animations: {
                numbers: {
                    properties: ["x", "y", "x2", "y2", "width", "height", "pointX", "pointY", "labelX", "labelY", "labelWidth", "labelHeight", "radius"],
                    type: "number"
                }
            }, clip: !0, dblClickSpeed: 350, drawTime: "afterDatasetsDraw", label: {drawTime: null}
        },
        descriptors: {
            _indexable: !1,
            _scriptable: t => !na.includes(t),
            annotations: {_allKeys: !1, _fallback: (t, e) => `elements.${al[hl(e.type)].id}`}
        },
        additionalOptionScopes: [""]
    };

    function xl(t, e, i) {
        const {ctx: s, chartArea: n} = t, {visibleElements: o} = ml.get(t);
        i && si(s, n), yl(s, o, e), function (t, e, i) {
            for (const s of e) pt(s.elements) && yl(t, s.elements, i)
        }(s, o, e), i && ni(s), o.forEach((t => {
            if (!("drawLabel" in t)) return;
            const i = t.options.label;
            i && i.enabled && i.content && (i.drawTime || t.options.drawTime) === e && t.drawLabel(s, n)
        }))
    }

    function yl(t, e, i) {
        for (const s of e) s.options.drawTime === i && s.draw(t)
    }

    wo.register(...ea), wo.register(bl), customElements.define("neerslag-card", class extends rt {
        static get properties() {
            return {hass: {}, _config: {}, myChart: {}}
        }

        static getStubConfig() {
            return {entity: "sensor.neerslag_buienalarm_regen_data", title: "Neerslag"}
        }

        static get styles() {
            return o`
			ha-card {
				position: relative;
			}
			ha-icon {
				position: absolute;
				top: 30px;
				right: 40px;
			}
			#plotGraphCard {
				padding: 0px 16px 16px 16px;
			}
		`
        }

        setConfig(t) {
            if (!t.entity && !t.entities) throw new Error("You need to define an entity or a list of entities. See readme file for available entities (sensors)");
            this._config = t, this.zoomwaarde = 5.5
        }

        getCardSize() {
            return 2
        }

        vertaling = {
            nl: {
                regenMmUur: "Regen (mm / uur)",
                regenvalVoorspelling: "Regenval voorspelling",
                licht: "Licht",
                matig: "Matig",
                zwaar: "Zwaar",
                geenDataBeschikbaar: "Geen sensor data beschikbaar"
            },
            en: {
                regenMmUur: "Rain (mm / hr)",
                regenvalVoorspelling: "Rainfall forecast",
                licht: "Light",
                matig: "Moderate",
                zwaar: "Heavy",
                geenDataBeschikbaar: "No sensor data available"
            },
            fr: {
                regenMmUur: "Pluie (mm / h)",
                regenvalVoorspelling: "Prévision de précipitations",
                licht: "Légère",
                matig: "Moyenne",
                zwaar: "Forte",
                geenDataBeschikbaar: "Pas de données du senseur disponibles"
            }
        };

        localize(t) {
            let e, i = this.getCurrentLanguage();
            return this.vertaling[i] || (i = "nl"), this.vertaling[i][t] ? e = this.vertaling[i][t] : "nl" != i && (i = "nl", e = this.vertaling[i][t] ? this.vertaling[i][t] : "No translation text found"), e
        }

        getCurrentLanguage() {
            let t = (localStorage.getItem("selectedLanguage") || "").replace(/['"]+/g, "").replace("-", "_");
            return "" == t && (t = (navigator.language || navigator.userLanguage).replace(/['"]+/g, "").replace("-", " ").substring(0, 2)), t
        }

        render() {
            if (!this._config || !this.hass) return j``;
            let t;
            const e = [];
            return this._config.entity && (t = this.hass.states[this._config.entity]), this._config.entities && this._config.entities.forEach((t => {
                e.push(this.hass.states[t])
            })), !0 === this._config.autozoom && (this.zoomwaarde = .5), t || e ? customElements.get("buien-rain-forecast") ? j`
				<style>
					.not-found {
						flex: 1;
						background-color: red;
						padding: 8px;
					}
				</style>
			<ha-card>

				<ha-icon style="right:20px" icon="mdi:weather-rainy"></ha-icon>

				<h1 class="card-header">
					<div class="name">
						${this._config.title}
					</div>

				</h1>

				<div id="plotGraphCard">
					<div class="not-found">
						Error: Incompatible integration detected
						<ol>
							<li>buien-rain-forecast</li>
						</ol>
						This integration/plugin is known for causing problems with the Neerslag Card. Please remove it from your Home Assistant installation and filesystem.
					</div>
				</div>
			</ha-card>
			` : (this.dontMakeGraph = !1, void 0 === this.prepareChartDataSets().getChartsDataAlsArray()[0] ? (this.dontMakeGraph = !0, this.myChart = null, j`

			<ha-card>

				<ha-icon style="right:20px" icon="mdi:weather-rainy"></ha-icon>

				<h1 class="card-header">
					<div class="name">
						${this._config.title}
					</div>

				</h1>

				<div id="plotGraphCard">
					<div style="display: block;">
						${this.localize("geenDataBeschikbaar")}
					</div>
				</div>


			</ha-card>
		`) : j`

			<ha-card>

				<ha-icon style="right:20px" icon="mdi:weather-rainy"></ha-icon>

				<h1 class="card-header">
					<div class="name">
						${this._config.title}
					</div>

				</h1>

				<div id="plotGraphCard">
					<div id="neerslagChartContainer" style="display: block;">
						<canvas id="neerslagChart"></canvas>
					</div>
				</div>


			</ha-card>
		`) : j`
				<style>
					.not-found {
						flex: 1;
						background-color: red;
						padding: 8px;
					}
				</style>
				<ha-card>
					<h1 class="card-header">${this._config.title}</h1>

					<div class="not-found">
						Entity or Entities not available.
					</div>
					<ha-icon icon="mdi:weather-rainy"></ha-icon>
				</ha-card>
				`
        }

        firstUpdated(t) {
            1 != this.dontMakeGraph && (this.makeGraph(), 0 === this.myChart.width && this.myChart.resize())
        }

        updated(t) {
            null === this.myChart && this.makeGraph(), this.myChart && 0 === this.myChart.width && this.myChart.resize(), t.forEach(((t, e) => {
                if ("_config" == e && this.makeGraph(), "hass" == e && void 0 !== t && (this._config.entity && this.hass.states[this._config.entity].attributes.data !== t.states[this._config.entity].attributes.data && this.updateGrafiek(), this._config.entities)) for (const e of this._config.entities) this.hass.states[e].attributes.data !== t.states[e].attributes.data && this.updateGrafiek()
            }))
        }

        makeGraph() {
            if (1 == this.dontMakeGraph) return;
            const t = t => (Math.max(0, Math.min(100, t)), Math.round(t / 100 * 255).toString(16).padStart(2, "0").toUpperCase());

            function e(t) {
                return 0 == t.includes("#") && (t = function (t) {
                    let e = t.replace(/rgba?\(/, "").replace(/\)/, "").replace(/[\s+]/g, "").split(","),
                        i = parseFloat(e[3] || 1), s = Math.floor(i * parseInt(e[0]) + 255 * (1 - i)),
                        n = Math.floor(i * parseInt(e[1]) + 255 * (1 - i)),
                        o = Math.floor(i * parseInt(e[2]) + 255 * (1 - i));
                    return "#" + ("0" + s.toString(16)).slice(-2) + ("0" + n.toString(16)).slice(-2) + ("0" + o.toString(16)).slice(-2)
                }(t)), t
            }

            let i = getComputedStyle(document.body), s = e(i.getPropertyValue("--primary-color")),
                n = (e(i.getPropertyValue("--accent-color")), e(i.getPropertyValue("--primary-text-color"))),
                o = e(i.getPropertyValue("--secondary-text-color"));
            if (this.myChart) {
                this.myChart = null, this.renderRoot.getElementById("neerslagChart").remove();
                let t = document.createElement("canvas");
                t.setAttribute("id", "neerslagChart"), this.renderRoot.getElementById("neerslagChartContainer").appendChild(t)
            }
            if (!this.myChart) {
                let e;
                this.shadowRoot && (e = this.shadowRoot.getElementById("neerslagChart").getContext("2d")), this.myChart = new wo(e, {
                    type: "line",
                    options: {
                        backgroundColor: [s.replace(" ", "") + t(20)],
                        borderColor: [s],
                        scales: {
                            y: {
                                ticks: {color: o},
                                beginAtZero: !0,
                                title: {display: !0, text: this.localize("regenMmUur"), color: n},
                                suggestedMax: this.zoomwaarde,
                                suggestedMin: 0,
                                beginAtZero: !0,
                                stepSize: 10
                            },
                            x: {
                                ticks: {color: o},
                                title: {display: !0, text: this.localize("regenvalVoorspelling"), color: n}
                            }
                        },
                        animation: !1,
                        interaction: {intersect: !1, mode: "index"},
                        borderWidth: 2,
                        tension: .4,
                        pointRadius: 0,
                        spanGaps: !0,
                        fill: !0,
                        plugins: {
                            legend: {display: !1},
                            tooltip: {
                                displayColors: !1, callbacks: {
                                    label: function (t) {
                                        let e = t.dataset.label || "";
                                        return e && (e += ": "), null !== t.parsed.y && (e += t.parsed.y + " mm/u"), e
                                    }
                                }
                            },
                            annotation: {
                                annotations: {
                                    lineZwaar: {
                                        type: "line",
                                        yMin: 5,
                                        yMax: 5,
                                        borderColor: "grey",
                                        borderWidth: 1,
                                        label: {
                                            enabled: !0,
                                            content: this.localize("zwaar"),
                                            position: "end",
                                            font: {size: 10},
                                            xPadding: 3,
                                            yPadding: 3,
                                            yAdjust: 10
                                        }
                                    },
                                    lineMatig: {
                                        type: "line",
                                        yMin: 2,
                                        yMax: 2,
                                        borderColor: "grey",
                                        borderWidth: 1,
                                        label: {
                                            enabled: !0,
                                            content: this.localize("matig"),
                                            position: "end",
                                            font: {size: 10},
                                            xPadding: 3,
                                            yPadding: 3,
                                            yAdjust: -11
                                        }
                                    },
                                    lineLicht: {
                                        type: "line",
                                        yMin: .4,
                                        yMax: .4,
                                        borderColor: "grey",
                                        borderWidth: 1,
                                        label: {
                                            enabled: !0,
                                            content: this.localize("licht"),
                                            position: "end",
                                            font: {size: 10},
                                            xPadding: 3,
                                            yPadding: 3,
                                            yAdjust: -11
                                        }
                                    }
                                }
                            }
                        }
                    },
                    plugins: [{
                        beforeDraw: t => {
                            if (t.tooltip?._active?.length) {
                                let e = t.tooltip._active[0].element.x, i = t.scales.y, s = t.ctx;
                                s.save(), s.beginPath(), s.moveTo(e, i.top), s.lineTo(e, i.bottom), s.lineWidth = 1, s.strokeStyle = "rgba(190, 190, 190, 1)", s.stroke(), s.restore()
                            }
                        }
                    }],
                    data: {
                        labels: this.prepareChartDataSets().getChartsDataAlsArray()[0][0],
                        datasets: this.prepareChartDataSets().getChartDatasets()
                    }
                })
            }
        }

        generateDatasetObject(t, e = "Regen") {
            return e.includes("arm") && (e = "Buienalarm"), e.includes("dar") && (e = "Buienradar"), {label: e, data: t}
        }

        combineTwoArray(t, e) {
            if (t && e && e[0] && t[0]) {
                for (const i of t[0]) if (!e[0].includes(i)) {
                    let s = t[0].indexOf(i);
                    e[0].splice(s, 0, t[0][s]), e[1].splice(s, 0, "0")
                }
                for (const i of e[0]) if (!t[0].includes(i)) {
                    let s = e[0].indexOf(i);
                    t[0].splice(s, 0, e[0][s]), t[1].splice(s, 0, "0")
                }
            }
        }

        prepareChartDataSets() {
            let t, e = [], i = [];
            if (this._config.entity) this.hass.states[this._config.entity].attributes.data && (t = this.prepareData(this.hass.states[this._config.entity].attributes.data, this._config.entity), e.push(t), i.push(this.generateDatasetObject(t[1]))); else {
                for (const s of this._config.entities) t = this.prepareData(this.hass.states[s].attributes.data, s), t.length > 0 && (e.push(t), i.push(this.generateDatasetObject(t[1], s)));
                this.combineTwoArray(e[0], e[1])
            }
            return {
                getChartsDataAlsArray: function () {
                    return e
                }, getChartDatasets: function () {
                    return i
                }
            }
        }

        prepareData(t, e) {
            return t && 0 !== t.length ? "sensor.neerslag_buienradar_regen_data" == e ? this.formatBuienradarData(t) : "sensor.neerslag_buienalarm_regen_data_oud" == e ? this.formatBuienalarmData(t) : "sensor.neerslag_buienalarm_regen_data" == e ? this.formatBuienalarmDataAndere(t) : void 0 : j``
        }

        formatBuienradarData(t) {
            const e = t.trim().split(" ");
            let i = [], s = [];
            for (const t of e) {
                let e = Math.pow(10, parseInt(t.split("|")[0] - 109) / 32), n = Math.round(100 * e) / 100;
                s.push(n), i.push(t.split("|")[1])
            }
            let n = [];
            return n[0] = i, n[1] = s, n
        }

        formatBuienalarmData(t) {
            function e(t) {
                return t < 10 && (t = "0" + t), t
            }

            let i = [], s = [];
            t.forEach((function (t, e) {
                i.push(t.rain)
            })), t.forEach((function (t, i) {
                let n = new Date(t.date);
                s.push(e(n.getHours()) + ":" + e(n.getMinutes()))
            }));
            let n = [];
            return n[0] = s, n[1] = i, n
        }

        formatBuienalarmDataAndere(t) {
            function e(t) {
                return t < 10 && (t = "0" + t), t
            }

            let i = [], s = [];
            t.precip.forEach((function (t, e) {
                s.push(parseFloat(Math.pow(10, (t - 109) / 32)).toFixed(2))
            })), t.precip.forEach((function (s, n) {
                let o = n * t.delta, r = t.start + o, a = new Date(0);
                a.setUTCSeconds(r), i.push(e(a.getHours()) + ":" + e(a.getMinutes()))
            }));
            let n = [];
            return n[0] = i, n[1] = s, n
        }

        updateGrafiek() {
            !0 !== this.dontMakeGraph ? (this.myChart.data.labels = this.prepareChartDataSets().getChartsDataAlsArray()[0][0], this.myChart.data.datasets = this.prepareChartDataSets().getChartDatasets(), this.myChart.update()) : console.log("updateGrafiek - dontMakeGraph")
        }
    }), window.customCards = window.customCards || [], window.customCards.push({
        type: "neerslag-card",
        name: "Neerslag Card",
        preview: !0,
        description: "Display rain forecast using BuienAlarm and/or BuienRadar data."
    }), console.info("%c NEERSLAG-CARD %c 2024.05.05.0", "Color: white; font-weight: bold; background: red;", "")
})();
