(function (v, o) {
  typeof exports == "object" && typeof module < "u"
    ? o(exports, require("vue"))
    : typeof define == "function" && define.amd
      ? define(["exports", "vue"], o)
      : ((v = typeof globalThis < "u" ? globalThis : v || self),
        o((v.CruciblePlugin = {}), v.Vue));
})(this, function (v, o) {
  "use strict";
  var kn = Object.defineProperty;
  var vn = (v, o, j) =>
    o in v
      ? kn(v, o, { enumerable: !0, configurable: !0, writable: !0, value: j })
      : (v[o] = j);
  var V = (v, o, j) => vn(v, typeof o != "symbol" ? o + "" : o, j);
  var j = !1;
  function ot(s, t, n) {
    return Array.isArray(s)
      ? ((s.length = Math.max(s.length, t)), s.splice(t, 1, n), n)
      : ((s[t] = n), n);
  }
  function ft(s, t) {
    if (Array.isArray(s)) {
      s.splice(t, 1);
      return;
    }
    delete s[t];
  }
  function de() {
    return Nt().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function Nt() {
    return typeof navigator < "u" && typeof window < "u"
      ? window
      : typeof globalThis < "u"
        ? globalThis
        : {};
  }
  const pe = typeof Proxy == "function",
    fe = "devtools-plugin:setup",
    me = "plugin:settings:set";
  let G, mt;
  function he() {
    var s;
    return (
      G !== void 0 ||
        (typeof window < "u" && window.performance
          ? ((G = !0), (mt = window.performance))
          : typeof globalThis < "u" &&
              !((s = globalThis.perf_hooks) === null || s === void 0) &&
              s.performance
            ? ((G = !0), (mt = globalThis.perf_hooks.performance))
            : (G = !1)),
      G
    );
  }
  function ge() {
    return he() ? mt.now() : Date.now();
  }
  class _e {
    constructor(t, n) {
      (this.target = null),
        (this.targetQueue = []),
        (this.onQueue = []),
        (this.plugin = t),
        (this.hook = n);
      const e = {};
      if (t.settings)
        for (const a in t.settings) {
          const c = t.settings[a];
          e[a] = c.defaultValue;
        }
      const i = `__vue-devtools-plugin-settings__${t.id}`;
      let r = Object.assign({}, e);
      try {
        const a = localStorage.getItem(i),
          c = JSON.parse(a);
        Object.assign(r, c);
      } catch {}
      (this.fallbacks = {
        getSettings() {
          return r;
        },
        setSettings(a) {
          try {
            localStorage.setItem(i, JSON.stringify(a));
          } catch {}
          r = a;
        },
        now() {
          return ge();
        },
      }),
        n &&
          n.on(me, (a, c) => {
            a === this.plugin.id && this.fallbacks.setSettings(c);
          }),
        (this.proxiedOn = new Proxy(
          {},
          {
            get: (a, c) =>
              this.target
                ? this.target.on[c]
                : (...l) => {
                    this.onQueue.push({ method: c, args: l });
                  },
          },
        )),
        (this.proxiedTarget = new Proxy(
          {},
          {
            get: (a, c) =>
              this.target
                ? this.target[c]
                : c === "on"
                  ? this.proxiedOn
                  : Object.keys(this.fallbacks).includes(c)
                    ? (...l) => (
                        this.targetQueue.push({
                          method: c,
                          args: l,
                          resolve: () => {},
                        }),
                        this.fallbacks[c](...l)
                      )
                    : (...l) =>
                        new Promise((u) => {
                          this.targetQueue.push({
                            method: c,
                            args: l,
                            resolve: u,
                          });
                        }),
          },
        ));
    }
    async setRealTarget(t) {
      this.target = t;
      for (const n of this.onQueue) this.target.on[n.method](...n.args);
      for (const n of this.targetQueue)
        n.resolve(await this.target[n.method](...n.args));
    }
  }
  function Vt(s, t) {
    const n = s,
      e = Nt(),
      i = de(),
      r = pe && n.enableEarlyProxy;
    if (i && (e.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !r)) i.emit(fe, s, t);
    else {
      const a = r ? new _e(n, i) : null;
      (e.__VUE_DEVTOOLS_PLUGINS__ = e.__VUE_DEVTOOLS_PLUGINS__ || []).push({
        pluginDescriptor: n,
        setupFn: t,
        proxy: a,
      }),
        a && t(a.proxiedTarget);
    }
  }
  /*!
   * pinia v2.2.1
   * (c) 2024 Eduardo San Martin Morote
   * @license MIT
   */ let K;
  const X = (s) => (K = s),
    xt = process.env.NODE_ENV !== "production" ? Symbol("pinia") : Symbol();
  function z(s) {
    return (
      s &&
      typeof s == "object" &&
      Object.prototype.toString.call(s) === "[object Object]" &&
      typeof s.toJSON != "function"
    );
  }
  var L;
  (function (s) {
    (s.direct = "direct"),
      (s.patchObject = "patch object"),
      (s.patchFunction = "patch function");
  })(L || (L = {}));
  const F = typeof window < "u",
    Dt =
      typeof window == "object" && window.window === window
        ? window
        : typeof self == "object" && self.self === self
          ? self
          : typeof global == "object" && global.global === global
            ? global
            : typeof globalThis == "object"
              ? globalThis
              : { HTMLElement: null };
  function be(s, { autoBom: t = !1 } = {}) {
    return t &&
      /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
        s.type,
      )
      ? new Blob(["\uFEFF", s], { type: s.type })
      : s;
  }
  function ht(s, t, n) {
    const e = new XMLHttpRequest();
    e.open("GET", s),
      (e.responseType = "blob"),
      (e.onload = function () {
        Mt(e.response, t, n);
      }),
      (e.onerror = function () {
        console.error("could not download file");
      }),
      e.send();
  }
  function $t(s) {
    const t = new XMLHttpRequest();
    t.open("HEAD", s, !1);
    try {
      t.send();
    } catch {}
    return t.status >= 200 && t.status <= 299;
  }
  function it(s) {
    try {
      s.dispatchEvent(new MouseEvent("click"));
    } catch {
      const n = document.createEvent("MouseEvents");
      n.initMouseEvent(
        "click",
        !0,
        !0,
        window,
        0,
        0,
        0,
        80,
        20,
        !1,
        !1,
        !1,
        !1,
        0,
        null,
      ),
        s.dispatchEvent(n);
    }
  }
  const rt = typeof navigator == "object" ? navigator : { userAgent: "" },
    Qt =
      /Macintosh/.test(rt.userAgent) &&
      /AppleWebKit/.test(rt.userAgent) &&
      !/Safari/.test(rt.userAgent),
    Mt = F
      ? typeof HTMLAnchorElement < "u" &&
        "download" in HTMLAnchorElement.prototype &&
        !Qt
        ? ye
        : "msSaveOrOpenBlob" in rt
          ? we
          : Ae
      : () => {};
  function ye(s, t = "download", n) {
    const e = document.createElement("a");
    (e.download = t),
      (e.rel = "noopener"),
      typeof s == "string"
        ? ((e.href = s),
          e.origin !== location.origin
            ? $t(e.href)
              ? ht(s, t, n)
              : ((e.target = "_blank"), it(e))
            : it(e))
        : ((e.href = URL.createObjectURL(s)),
          setTimeout(function () {
            URL.revokeObjectURL(e.href);
          }, 4e4),
          setTimeout(function () {
            it(e);
          }, 0));
  }
  function we(s, t = "download", n) {
    if (typeof s == "string")
      if ($t(s)) ht(s, t, n);
      else {
        const e = document.createElement("a");
        (e.href = s),
          (e.target = "_blank"),
          setTimeout(function () {
            it(e);
          });
      }
    else navigator.msSaveOrOpenBlob(be(s, n), t);
  }
  function Ae(s, t, n, e) {
    if (
      ((e = e || open("", "_blank")),
      e && (e.document.title = e.document.body.innerText = "downloading..."),
      typeof s == "string")
    )
      return ht(s, t, n);
    const i = s.type === "application/octet-stream",
      r = /constructor/i.test(String(Dt.HTMLElement)) || "safari" in Dt,
      a = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((a || (i && r) || Qt) && typeof FileReader < "u") {
      const c = new FileReader();
      (c.onloadend = function () {
        let l = c.result;
        if (typeof l != "string")
          throw ((e = null), new Error("Wrong reader.result type"));
        (l = a ? l : l.replace(/^data:[^;]*;/, "data:attachment/file;")),
          e ? (e.location.href = l) : location.assign(l),
          (e = null);
      }),
        c.readAsDataURL(s);
    } else {
      const c = URL.createObjectURL(s);
      e ? e.location.assign(c) : (location.href = c),
        (e = null),
        setTimeout(function () {
          URL.revokeObjectURL(c);
        }, 4e4);
    }
  }
  function k(s, t) {
    const n = "🍍 " + s;
    typeof __VUE_DEVTOOLS_TOAST__ == "function"
      ? __VUE_DEVTOOLS_TOAST__(n, t)
      : t === "error"
        ? console.error(n)
        : t === "warn"
          ? console.warn(n)
          : console.log(n);
  }
  function gt(s) {
    return "_a" in s && "install" in s;
  }
  function Ot() {
    if (!("clipboard" in navigator))
      return k("Your browser doesn't support the Clipboard API", "error"), !0;
  }
  function qt(s) {
    return s instanceof Error &&
      s.message.toLowerCase().includes("document is not focused")
      ? (k(
          'You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.',
          "warn",
        ),
        !0)
      : !1;
  }
  async function Te(s) {
    if (!Ot())
      try {
        await navigator.clipboard.writeText(JSON.stringify(s.state.value)),
          k("Global state copied to clipboard.");
      } catch (t) {
        if (qt(t)) return;
        k(
          "Failed to serialize the state. Check the console for more details.",
          "error",
        ),
          console.error(t);
      }
  }
  async function Se(s) {
    if (!Ot())
      try {
        Lt(s, JSON.parse(await navigator.clipboard.readText())),
          k("Global state pasted from clipboard.");
      } catch (t) {
        if (qt(t)) return;
        k(
          "Failed to deserialize the state from clipboard. Check the console for more details.",
          "error",
        ),
          console.error(t);
      }
  }
  async function Ee(s) {
    try {
      Mt(
        new Blob([JSON.stringify(s.state.value)], {
          type: "text/plain;charset=utf-8",
        }),
        "pinia-state.json",
      );
    } catch (t) {
      k(
        "Failed to export the state as JSON. Check the console for more details.",
        "error",
      ),
        console.error(t);
    }
  }
  let I;
  function ke() {
    I ||
      ((I = document.createElement("input")),
      (I.type = "file"),
      (I.accept = ".json"));
    function s() {
      return new Promise((t, n) => {
        (I.onchange = async () => {
          const e = I.files;
          if (!e) return t(null);
          const i = e.item(0);
          return t(i ? { text: await i.text(), file: i } : null);
        }),
          (I.oncancel = () => t(null)),
          (I.onerror = n),
          I.click();
      });
    }
    return s;
  }
  async function ve(s) {
    try {
      const n = await ke()();
      if (!n) return;
      const { text: e, file: i } = n;
      Lt(s, JSON.parse(e)), k(`Global state imported from "${i.name}".`);
    } catch (t) {
      k(
        "Failed to import the state from JSON. Check the console for more details.",
        "error",
      ),
        console.error(t);
    }
  }
  function Lt(s, t) {
    for (const n in t) {
      const e = s.state.value[n];
      e ? Object.assign(e, t[n]) : (s.state.value[n] = t[n]);
    }
  }
  function M(s) {
    return { _custom: { display: s } };
  }
  const Pt = "🍍 Pinia (root)",
    at = "_root";
  function Ce(s) {
    return gt(s) ? { id: at, label: Pt } : { id: s.$id, label: s.$id };
  }
  function Ne(s) {
    if (gt(s)) {
      const n = Array.from(s._s.keys()),
        e = s._s;
      return {
        state: n.map((r) => ({
          editable: !0,
          key: r,
          value: s.state.value[r],
        })),
        getters: n
          .filter((r) => e.get(r)._getters)
          .map((r) => {
            const a = e.get(r);
            return {
              editable: !1,
              key: r,
              value: a._getters.reduce((c, l) => ((c[l] = a[l]), c), {}),
            };
          }),
      };
    }
    const t = {
      state: Object.keys(s.$state).map((n) => ({
        editable: !0,
        key: n,
        value: s.$state[n],
      })),
    };
    return (
      s._getters &&
        s._getters.length &&
        (t.getters = s._getters.map((n) => ({
          editable: !1,
          key: n,
          value: s[n],
        }))),
      s._customProperties.size &&
        (t.customProperties = Array.from(s._customProperties).map((n) => ({
          editable: !0,
          key: n,
          value: s[n],
        }))),
      t
    );
  }
  function Ve(s) {
    return s
      ? Array.isArray(s)
        ? s.reduce(
            (t, n) => (
              t.keys.push(n.key),
              t.operations.push(n.type),
              (t.oldValue[n.key] = n.oldValue),
              (t.newValue[n.key] = n.newValue),
              t
            ),
            { oldValue: {}, keys: [], operations: [], newValue: {} },
          )
        : {
            operation: M(s.type),
            key: M(s.key),
            oldValue: s.oldValue,
            newValue: s.newValue,
          }
      : {};
  }
  function xe(s) {
    switch (s) {
      case L.direct:
        return "mutation";
      case L.patchFunction:
        return "$patch";
      case L.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let W = !0;
  const ct = [],
    H = "pinia:mutations",
    C = "pinia",
    { assign: De } = Object,
    lt = (s) => "🍍 " + s;
  function $e(s, t) {
    Vt(
      {
        id: "dev.esm.pinia",
        label: "Pinia 🍍",
        logo: "https://pinia.vuejs.org/logo.svg",
        packageName: "pinia",
        homepage: "https://pinia.vuejs.org",
        componentStateTypes: ct,
        app: s,
      },
      (n) => {
        typeof n.now != "function" &&
          k(
            "You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.",
          ),
          n.addTimelineLayer({ id: H, label: "Pinia 🍍", color: 15064968 }),
          n.addInspector({
            id: C,
            label: "Pinia 🍍",
            icon: "storage",
            treeFilterPlaceholder: "Search stores",
            actions: [
              {
                icon: "content_copy",
                action: () => {
                  Te(t);
                },
                tooltip: "Serialize and copy the state",
              },
              {
                icon: "content_paste",
                action: async () => {
                  await Se(t), n.sendInspectorTree(C), n.sendInspectorState(C);
                },
                tooltip: "Replace the state with the content of your clipboard",
              },
              {
                icon: "save",
                action: () => {
                  Ee(t);
                },
                tooltip: "Save the state as a JSON file",
              },
              {
                icon: "folder_open",
                action: async () => {
                  await ve(t), n.sendInspectorTree(C), n.sendInspectorState(C);
                },
                tooltip: "Import the state from a JSON file",
              },
            ],
            nodeActions: [
              {
                icon: "restore",
                tooltip: 'Reset the state (with "$reset")',
                action: (e) => {
                  const i = t._s.get(e);
                  i
                    ? typeof i.$reset != "function"
                      ? k(
                          `Cannot reset "${e}" store because it doesn't have a "$reset" method implemented.`,
                          "warn",
                        )
                      : (i.$reset(), k(`Store "${e}" reset.`))
                    : k(
                        `Cannot reset "${e}" store because it wasn't found.`,
                        "warn",
                      );
                },
              },
            ],
          }),
          n.on.inspectComponent((e, i) => {
            const r = e.componentInstance && e.componentInstance.proxy;
            if (r && r._pStores) {
              const a = e.componentInstance.proxy._pStores;
              Object.values(a).forEach((c) => {
                e.instanceData.state.push({
                  type: lt(c.$id),
                  key: "state",
                  editable: !0,
                  value: c._isOptionsAPI
                    ? {
                        _custom: {
                          value: o.toRaw(c.$state),
                          actions: [
                            {
                              icon: "restore",
                              tooltip: "Reset the state of this store",
                              action: () => c.$reset(),
                            },
                          ],
                        },
                      }
                    : Object.keys(c.$state).reduce(
                        (l, u) => ((l[u] = c.$state[u]), l),
                        {},
                      ),
                }),
                  c._getters &&
                    c._getters.length &&
                    e.instanceData.state.push({
                      type: lt(c.$id),
                      key: "getters",
                      editable: !1,
                      value: c._getters.reduce((l, u) => {
                        try {
                          l[u] = c[u];
                        } catch (p) {
                          l[u] = p;
                        }
                        return l;
                      }, {}),
                    });
              });
            }
          }),
          n.on.getInspectorTree((e) => {
            if (e.app === s && e.inspectorId === C) {
              let i = [t];
              (i = i.concat(Array.from(t._s.values()))),
                (e.rootNodes = (
                  e.filter
                    ? i.filter((r) =>
                        "$id" in r
                          ? r.$id.toLowerCase().includes(e.filter.toLowerCase())
                          : Pt.toLowerCase().includes(e.filter.toLowerCase()),
                      )
                    : i
                ).map(Ce));
            }
          }),
          (globalThis.$pinia = t),
          n.on.getInspectorState((e) => {
            if (e.app === s && e.inspectorId === C) {
              const i = e.nodeId === at ? t : t._s.get(e.nodeId);
              if (!i) return;
              i &&
                (e.nodeId !== at && (globalThis.$store = o.toRaw(i)),
                (e.state = Ne(i)));
            }
          }),
          n.on.editInspectorState((e, i) => {
            if (e.app === s && e.inspectorId === C) {
              const r = e.nodeId === at ? t : t._s.get(e.nodeId);
              if (!r) return k(`store "${e.nodeId}" not found`, "error");
              const { path: a } = e;
              gt(r)
                ? a.unshift("state")
                : (a.length !== 1 ||
                    !r._customProperties.has(a[0]) ||
                    a[0] in r.$state) &&
                  a.unshift("$state"),
                (W = !1),
                e.set(r, a, e.state.value),
                (W = !0);
            }
          }),
          n.on.editComponentState((e) => {
            if (e.type.startsWith("🍍")) {
              const i = e.type.replace(/^🍍\s*/, ""),
                r = t._s.get(i);
              if (!r) return k(`store "${i}" not found`, "error");
              const { path: a } = e;
              if (a[0] !== "state")
                return k(`Invalid path for store "${i}":
${a}
Only state can be modified.`);
              (a[0] = "$state"), (W = !1), e.set(r, a, e.state.value), (W = !0);
            }
          });
      },
    );
  }
  function Qe(s, t) {
    ct.includes(lt(t.$id)) || ct.push(lt(t.$id)),
      Vt(
        {
          id: "dev.esm.pinia",
          label: "Pinia 🍍",
          logo: "https://pinia.vuejs.org/logo.svg",
          packageName: "pinia",
          homepage: "https://pinia.vuejs.org",
          componentStateTypes: ct,
          app: s,
          settings: {
            logStoreChanges: {
              label: "Notify about new/deleted stores",
              type: "boolean",
              defaultValue: !0,
            },
          },
        },
        (n) => {
          const e = typeof n.now == "function" ? n.now.bind(n) : Date.now;
          t.$onAction(({ after: a, onError: c, name: l, args: u }) => {
            const p = It++;
            n.addTimelineEvent({
              layerId: H,
              event: {
                time: e(),
                title: "🛫 " + l,
                subtitle: "start",
                data: { store: M(t.$id), action: M(l), args: u },
                groupId: p,
              },
            }),
              a((m) => {
                (B = void 0),
                  n.addTimelineEvent({
                    layerId: H,
                    event: {
                      time: e(),
                      title: "🛬 " + l,
                      subtitle: "end",
                      data: {
                        store: M(t.$id),
                        action: M(l),
                        args: u,
                        result: m,
                      },
                      groupId: p,
                    },
                  });
              }),
              c((m) => {
                (B = void 0),
                  n.addTimelineEvent({
                    layerId: H,
                    event: {
                      time: e(),
                      logType: "error",
                      title: "💥 " + l,
                      subtitle: "end",
                      data: {
                        store: M(t.$id),
                        action: M(l),
                        args: u,
                        error: m,
                      },
                      groupId: p,
                    },
                  });
              });
          }, !0),
            t._customProperties.forEach((a) => {
              o.watch(
                () => o.unref(t[a]),
                (c, l) => {
                  n.notifyComponentUpdate(),
                    n.sendInspectorState(C),
                    W &&
                      n.addTimelineEvent({
                        layerId: H,
                        event: {
                          time: e(),
                          title: "Change",
                          subtitle: a,
                          data: { newValue: c, oldValue: l },
                          groupId: B,
                        },
                      });
                },
                { deep: !0 },
              );
            }),
            t.$subscribe(
              ({ events: a, type: c }, l) => {
                if ((n.notifyComponentUpdate(), n.sendInspectorState(C), !W))
                  return;
                const u = {
                  time: e(),
                  title: xe(c),
                  data: De({ store: M(t.$id) }, Ve(a)),
                  groupId: B,
                };
                c === L.patchFunction
                  ? (u.subtitle = "⤵️")
                  : c === L.patchObject
                    ? (u.subtitle = "🧩")
                    : a && !Array.isArray(a) && (u.subtitle = a.type),
                  a &&
                    (u.data["rawEvent(s)"] = {
                      _custom: {
                        display: "DebuggerEvent",
                        type: "object",
                        tooltip: "raw DebuggerEvent[]",
                        value: a,
                      },
                    }),
                  n.addTimelineEvent({ layerId: H, event: u });
              },
              { detached: !0, flush: "sync" },
            );
          const i = t._hotUpdate;
          t._hotUpdate = o.markRaw((a) => {
            i(a),
              n.addTimelineEvent({
                layerId: H,
                event: {
                  time: e(),
                  title: "🔥 " + t.$id,
                  subtitle: "HMR update",
                  data: { store: M(t.$id), info: M("HMR update") },
                },
              }),
              n.notifyComponentUpdate(),
              n.sendInspectorTree(C),
              n.sendInspectorState(C);
          });
          const { $dispose: r } = t;
          (t.$dispose = () => {
            r(),
              n.notifyComponentUpdate(),
              n.sendInspectorTree(C),
              n.sendInspectorState(C),
              n.getSettings().logStoreChanges &&
                k(`Disposed "${t.$id}" store 🗑`);
          }),
            n.notifyComponentUpdate(),
            n.sendInspectorTree(C),
            n.sendInspectorState(C),
            n.getSettings().logStoreChanges &&
              k(`"${t.$id}" store installed 🆕`);
        },
      );
  }
  let It = 0,
    B;
  function Bt(s, t, n) {
    const e = t.reduce((i, r) => ((i[r] = o.toRaw(s)[r]), i), {});
    for (const i in e)
      s[i] = function () {
        const r = It,
          a = n
            ? new Proxy(s, {
                get(...l) {
                  return (B = r), Reflect.get(...l);
                },
                set(...l) {
                  return (B = r), Reflect.set(...l);
                },
              })
            : s;
        B = r;
        const c = e[i].apply(a, arguments);
        return (B = void 0), c;
      };
  }
  function Me({ app: s, store: t, options: n }) {
    if (!t.$id.startsWith("__hot:")) {
      if (((t._isOptionsAPI = !!n.state), !t._p._testing)) {
        Bt(t, Object.keys(n.actions), t._isOptionsAPI);
        const e = t._hotUpdate;
        o.toRaw(t)._hotUpdate = function (i) {
          e.apply(this, arguments),
            Bt(t, Object.keys(i._hmrPayload.actions), !!t._isOptionsAPI);
        };
      }
      Qe(s, t);
    }
  }
  function Oe() {
    const s = o.effectScope(!0),
      t = s.run(() => o.ref({}));
    let n = [],
      e = [];
    const i = o.markRaw({
      install(r) {
        X(i),
          (i._a = r),
          r.provide(xt, i),
          (r.config.globalProperties.$pinia = i),
          process.env.NODE_ENV !== "production" &&
            process.env.NODE_ENV !== "test" &&
            F &&
            $e(r, i),
          e.forEach((a) => n.push(a)),
          (e = []);
      },
      use(r) {
        return !this._a && !j ? e.push(r) : n.push(r), this;
      },
      _p: n,
      _a: null,
      _e: s,
      _s: new Map(),
      state: t,
    });
    return (
      process.env.NODE_ENV !== "production" &&
        process.env.NODE_ENV !== "test" &&
        typeof Proxy < "u" &&
        i.use(Me),
      i
    );
  }
  function Rt(s, t) {
    for (const n in t) {
      const e = t[n];
      if (!(n in s)) continue;
      const i = s[n];
      z(i) && z(e) && !o.isRef(e) && !o.isReactive(e)
        ? (s[n] = Rt(i, e))
        : (s[n] = e);
    }
    return s;
  }
  const jt = () => {};
  function zt(s, t, n, e = jt) {
    s.push(t);
    const i = () => {
      const r = s.indexOf(t);
      r > -1 && (s.splice(r, 1), e());
    };
    return !n && o.getCurrentScope() && o.onScopeDispose(i), i;
  }
  function J(s, ...t) {
    s.slice().forEach((n) => {
      n(...t);
    });
  }
  const qe = (s) => s(),
    Ft = Symbol(),
    _t = Symbol();
  function bt(s, t) {
    s instanceof Map && t instanceof Map
      ? t.forEach((n, e) => s.set(e, n))
      : s instanceof Set && t instanceof Set && t.forEach(s.add, s);
    for (const n in t) {
      if (!t.hasOwnProperty(n)) continue;
      const e = t[n],
        i = s[n];
      z(i) && z(e) && s.hasOwnProperty(n) && !o.isRef(e) && !o.isReactive(e)
        ? (s[n] = bt(i, e))
        : (s[n] = e);
    }
    return s;
  }
  const Le =
    process.env.NODE_ENV !== "production"
      ? Symbol("pinia:skipHydration")
      : Symbol();
  function Pe(s) {
    return !z(s) || !s.hasOwnProperty(Le);
  }
  const { assign: x } = Object;
  function Ht(s) {
    return !!(o.isRef(s) && s.effect);
  }
  function Ut(s, t, n, e) {
    const { state: i, actions: r, getters: a } = t,
      c = n.state.value[s];
    let l;
    function u() {
      !c &&
        (process.env.NODE_ENV === "production" || !e) &&
        (n.state.value[s] = i ? i() : {});
      const p =
        process.env.NODE_ENV !== "production" && e
          ? o.toRefs(o.ref(i ? i() : {}).value)
          : o.toRefs(n.state.value[s]);
      return x(
        p,
        r,
        Object.keys(a || {}).reduce(
          (m, g) => (
            process.env.NODE_ENV !== "production" &&
              g in p &&
              console.warn(
                `[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${g}" in store "${s}".`,
              ),
            (m[g] = o.markRaw(
              o.computed(() => {
                X(n);
                const y = n._s.get(s);
                return a[g].call(y, y);
              }),
            )),
            m
          ),
          {},
        ),
      );
    }
    return (l = yt(s, u, t, n, e, !0)), l;
  }
  function yt(s, t, n = {}, e, i, r) {
    let a;
    const c = x({ actions: {} }, n);
    if (process.env.NODE_ENV !== "production" && !e._e.active)
      throw new Error("Pinia destroyed");
    const l = { deep: !0 };
    process.env.NODE_ENV !== "production" &&
      !j &&
      (l.onTrigger = (h) => {
        u
          ? (y = h)
          : u == !1 &&
            !_._hotUpdating &&
            (Array.isArray(y)
              ? y.push(h)
              : console.error(
                  "🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.",
                ));
      });
    let u,
      p,
      m = [],
      g = [],
      y;
    const N = e.state.value[s];
    !r &&
      !N &&
      (process.env.NODE_ENV === "production" || !i) &&
      (e.state.value[s] = {});
    const et = o.ref({});
    let dt;
    function pt(h) {
      let f;
      (u = p = !1),
        process.env.NODE_ENV !== "production" && (y = []),
        typeof h == "function"
          ? (h(e.state.value[s]),
            (f = { type: L.patchFunction, storeId: s, events: y }))
          : (bt(e.state.value[s], h),
            (f = { type: L.patchObject, payload: h, storeId: s, events: y }));
      const A = (dt = Symbol());
      o.nextTick().then(() => {
        dt === A && (u = !0);
      }),
        (p = !0),
        J(m, f, e.state.value[s]);
    }
    const S = r
      ? function () {
          const { state: f } = n,
            A = f ? f() : {};
          this.$patch(($) => {
            x($, A);
          });
        }
      : process.env.NODE_ENV !== "production"
        ? () => {
            throw new Error(
              `🍍: Store "${s}" is built using the setup syntax and does not implement $reset().`,
            );
          }
        : jt;
    function E() {
      a.stop(), (m = []), (g = []), e._s.delete(s);
    }
    const T = (h, f = "") => {
        if (Ft in h) return (h[_t] = f), h;
        const A = function () {
          X(e);
          const $ = Array.from(arguments),
            st = [],
            Ct = [];
          function Sn(Q) {
            st.push(Q);
          }
          function En(Q) {
            Ct.push(Q);
          }
          J(g, { args: $, name: A[_t], store: _, after: Sn, onError: En });
          let nt;
          try {
            nt = h.apply(this && this.$id === s ? this : _, $);
          } catch (Q) {
            throw (J(Ct, Q), Q);
          }
          return nt instanceof Promise
            ? nt
                .then((Q) => (J(st, Q), Q))
                .catch((Q) => (J(Ct, Q), Promise.reject(Q)))
            : (J(st, nt), nt);
        };
        return (A[Ft] = !0), (A[_t] = f), A;
      },
      q = o.markRaw({ actions: {}, getters: {}, state: [], hotState: et }),
      Y = {
        _p: e,
        $id: s,
        $onAction: zt.bind(null, g),
        $patch: pt,
        $reset: S,
        $subscribe(h, f = {}) {
          const A = zt(m, h, f.detached, () => $()),
            $ = a.run(() =>
              o.watch(
                () => e.state.value[s],
                (st) => {
                  (f.flush === "sync" ? p : u) &&
                    h({ storeId: s, type: L.direct, events: y }, st);
                },
                x({}, l, f),
              ),
            );
          return A;
        },
        $dispose: E,
      },
      _ = o.reactive(
        process.env.NODE_ENV !== "production" ||
          (process.env.NODE_ENV !== "production" &&
            process.env.NODE_ENV !== "test" &&
            F)
          ? x({ _hmrPayload: q, _customProperties: o.markRaw(new Set()) }, Y)
          : Y,
      );
    e._s.set(s, _);
    const R = ((e._a && e._a.runWithContext) || qe)(() =>
      e._e.run(() => (a = o.effectScope()).run(() => t({ action: T }))),
    );
    for (const h in R) {
      const f = R[h];
      if ((o.isRef(f) && !Ht(f)) || o.isReactive(f))
        process.env.NODE_ENV !== "production" && i
          ? ot(et.value, h, o.toRef(R, h))
          : r ||
            (N && Pe(f) && (o.isRef(f) ? (f.value = N[h]) : bt(f, N[h])),
            (e.state.value[s][h] = f)),
          process.env.NODE_ENV !== "production" && q.state.push(h);
      else if (typeof f == "function") {
        const A = process.env.NODE_ENV !== "production" && i ? f : T(f, h);
        (R[h] = A),
          process.env.NODE_ENV !== "production" && (q.actions[h] = f),
          (c.actions[h] = f);
      } else
        process.env.NODE_ENV !== "production" &&
          Ht(f) &&
          ((q.getters[h] = r ? n.getters[h] : f),
          F && (R._getters || (R._getters = o.markRaw([]))).push(h));
    }
    if (
      (x(_, R),
      x(o.toRaw(_), R),
      Object.defineProperty(_, "$state", {
        get: () =>
          process.env.NODE_ENV !== "production" && i
            ? et.value
            : e.state.value[s],
        set: (h) => {
          if (process.env.NODE_ENV !== "production" && i)
            throw new Error("cannot set hotState");
          pt((f) => {
            x(f, h);
          });
        },
      }),
      process.env.NODE_ENV !== "production" &&
        (_._hotUpdate = o.markRaw((h) => {
          (_._hotUpdating = !0),
            h._hmrPayload.state.forEach((f) => {
              if (f in _.$state) {
                const A = h.$state[f],
                  $ = _.$state[f];
                typeof A == "object" && z(A) && z($)
                  ? Rt(A, $)
                  : (h.$state[f] = $);
              }
              ot(_, f, o.toRef(h.$state, f));
            }),
            Object.keys(_.$state).forEach((f) => {
              f in h.$state || ft(_, f);
            }),
            (u = !1),
            (p = !1),
            (e.state.value[s] = o.toRef(h._hmrPayload, "hotState")),
            (p = !0),
            o.nextTick().then(() => {
              u = !0;
            });
          for (const f in h._hmrPayload.actions) {
            const A = h[f];
            ot(_, f, T(A, f));
          }
          for (const f in h._hmrPayload.getters) {
            const A = h._hmrPayload.getters[f],
              $ = r ? o.computed(() => (X(e), A.call(_, _))) : A;
            ot(_, f, $);
          }
          Object.keys(_._hmrPayload.getters).forEach((f) => {
            f in h._hmrPayload.getters || ft(_, f);
          }),
            Object.keys(_._hmrPayload.actions).forEach((f) => {
              f in h._hmrPayload.actions || ft(_, f);
            }),
            (_._hmrPayload = h._hmrPayload),
            (_._getters = h._getters),
            (_._hotUpdating = !1);
        })),
      process.env.NODE_ENV !== "production" &&
        process.env.NODE_ENV !== "test" &&
        F)
    ) {
      const h = { writable: !0, configurable: !0, enumerable: !1 };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((f) => {
        Object.defineProperty(_, f, x({ value: _[f] }, h));
      });
    }
    return (
      e._p.forEach((h) => {
        if (
          process.env.NODE_ENV !== "production" &&
          process.env.NODE_ENV !== "test" &&
          F
        ) {
          const f = a.run(() =>
            h({ store: _, app: e._a, pinia: e, options: c }),
          );
          Object.keys(f || {}).forEach((A) => _._customProperties.add(A)),
            x(_, f);
        } else
          x(
            _,
            a.run(() => h({ store: _, app: e._a, pinia: e, options: c })),
          );
      }),
      process.env.NODE_ENV !== "production" &&
        _.$state &&
        typeof _.$state == "object" &&
        typeof _.$state.constructor == "function" &&
        !_.$state.constructor.toString().includes("[native code]") &&
        console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${_.$id}".`),
      N && r && n.hydrate && n.hydrate(_.$state, N),
      (u = !0),
      (p = !0),
      _
    );
  }
  function Ie(s, t, n) {
    let e, i;
    const r = typeof t == "function";
    (e = s), (i = r ? n : t);
    function a(c, l) {
      const u = o.hasInjectionContext();
      if (
        ((c =
          (process.env.NODE_ENV === "test" && K && K._testing ? null : c) ||
          (u ? o.inject(xt, null) : null)),
        c && X(c),
        process.env.NODE_ENV !== "production" && !K)
      )
        throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
      (c = K),
        c._s.has(e) ||
          (r ? yt(e, t, i, c) : Ut(e, i, c),
          process.env.NODE_ENV !== "production" && (a._pinia = c));
      const p = c._s.get(e);
      if (process.env.NODE_ENV !== "production" && l) {
        const m = "__hot:" + e,
          g = r ? yt(m, t, i, c, !0) : Ut(m, x({}, i), c, !0);
        l._hotUpdate(g), delete c.state.value[m], c._s.delete(m);
      }
      if (process.env.NODE_ENV !== "production" && F) {
        const m = o.getCurrentInstance();
        if (m && m.proxy && !l) {
          const g = m.proxy,
            y = "_pStores" in g ? g._pStores : (g._pStores = {});
          y[e] = p;
        }
      }
      return p;
    }
    return (a.$id = e), a;
  }
  const Be = ["id", "checked"],
    Re = ["for", "innerHTML"],
    je = o.defineComponent({
      __name: "MCQOption",
      props: {
        optionKey: {},
        checked: { type: Boolean },
        option: {},
        submitted: { type: Boolean },
      },
      emits: ["selectOption"],
      setup(s, { emit: t }) {
        const n = t,
          e = () => n("selectOption");
        return (i, r) => (
          o.openBlock(),
          o.createElementBlock(
            o.Fragment,
            null,
            [
              (o.openBlock(),
              o.createElementBlock(
                "input",
                {
                  id: "option-" + i.optionKey,
                  key: i.optionKey,
                  "test-id": "radio_options",
                  type: "radio",
                  name: "options",
                  checked: i.checked,
                  class: o.normalizeClass(i.submitted && "ignore-hover"),
                },
                null,
                10,
                Be,
              )),
              (o.openBlock(),
              o.createElementBlock(
                "label",
                {
                  key: i.optionKey,
                  for: "option-" + i.optionKey,
                  class: o.normalizeClass(
                    i.submitted
                      ? "mcq-option-label ignore-hover"
                      : "mcq-option-label",
                  ),
                  onClick: r[0] || (r[0] = (a) => e()),
                  innerHTML: i.option.optionValue,
                },
                null,
                10,
                Re,
              )),
            ],
            64,
          )
        );
      },
    }),
    O = (s, t) => {
      const n = s.__vccOpts || s;
      for (const [e, i] of t) n[e] = i;
      return n;
    },
    ze = O(je, [["__scopeId", "data-v-fdbfedc6"]]),
    Fe = ["disabled"],
    He = O(
      o.defineComponent({
        __name: "MCQButton",
        props: {
          submitted: { type: Boolean },
          selectedOption: {},
          hideSkip: { type: Boolean },
        },
        emits: ["submitAnswer", "nextQuestion", "skipQuestion"],
        setup(s, { emit: t }) {
          const n = o.ref("skip"),
            e = o.ref("Skip"),
            i = t,
            r = (l, u) => {
              !l && u
                ? a("next", "Next", "submitAnswer")
                : l && u
                  ? a("skip", "Skip", "nextQuestion")
                  : !l && !u && a("skip", "Skip", "skipQuestion");
            },
            a = (l, u, p) => {
              (n.value = l), (e.value = u), i(p);
            },
            c = (l, u) =>
              l && u
                ? { class: "next", text: "Next" }
                : !l && u
                  ? { class: "submit", text: "Submit" }
                  : { class: n.value, text: e.value };
          return (l, u) => (
            o.openBlock(),
            o.createElementBlock("div", null, [
              o.createElementVNode(
                "button",
                {
                  disabled:
                    l.hideSkip &&
                    c(l.submitted, l.selectedOption).class === "skip",
                  class: o.normalizeClass([
                    "mcq-button",
                    c(l.submitted, l.selectedOption).class,
                  ]),
                  onClick:
                    u[0] || (u[0] = (p) => r(l.submitted, l.selectedOption)),
                },
                o.toDisplayString(c(l.submitted, l.selectedOption).text),
                11,
                Fe,
              ),
            ])
          );
        },
      }),
      [["__scopeId", "data-v-847b8dd5"]],
    ),
    Gt = O(
      o.defineComponent({
        __name: "NextButton",
        props: { buttonName: {} },
        emits: ["nextQuestion", "prevQuestion"],
        setup(s, { emit: t }) {
          const { buttonName: n } = s,
            e = t,
            i = () => {
              r(n !== "←" ? "nextQuestion" : "prevQuestion");
            },
            r = (a) => {
              e(a);
            };
          return (a, c) => (
            o.openBlock(),
            o.createElementBlock("div", null, [
              o.createElementVNode(
                "button",
                {
                  class: o.normalizeClass(
                    a.buttonName === "Submit" ? "submit_btn" : "mcq-button",
                  ),
                  onClick: c[0] || (c[0] = (l) => i()),
                },
                o.toDisplayString(a.buttonName),
                3,
              ),
            ])
          );
        },
      }),
      [["__scopeId", "data-v-8be7f61e"]],
    );
  var w = ((s) => (
      (s[(s.New = 0)] = "New"),
      (s[(s.Learning = 1)] = "Learning"),
      (s[(s.Review = 2)] = "Review"),
      (s[(s.Relearning = 3)] = "Relearning"),
      s
    ))(w || {}),
    d = ((s) => (
      (s[(s.Manual = 0)] = "Manual"),
      (s[(s.Again = 1)] = "Again"),
      (s[(s.Hard = 2)] = "Hard"),
      (s[(s.Good = 3)] = "Good"),
      (s[(s.Easy = 4)] = "Easy"),
      s
    ))(d || {});
  class b {
    static card(t) {
      return {
        ...t,
        state: b.state(t.state),
        due: b.time(t.due),
        last_review: t.last_review ? b.time(t.last_review) : void 0,
      };
    }
    static rating(t) {
      if (typeof t == "string") {
        const n = t.charAt(0).toUpperCase(),
          e = t.slice(1).toLowerCase(),
          i = d[`${n}${e}`];
        if (i === void 0) throw new Error(`Invalid rating:[${t}]`);
        return i;
      } else if (typeof t == "number") return t;
      throw new Error(`Invalid rating:[${t}]`);
    }
    static state(t) {
      if (typeof t == "string") {
        const n = t.charAt(0).toUpperCase(),
          e = t.slice(1).toLowerCase(),
          i = w[`${n}${e}`];
        if (i === void 0) throw new Error(`Invalid state:[${t}]`);
        return i;
      } else if (typeof t == "number") return t;
      throw new Error(`Invalid state:[${t}]`);
    }
    static time(t) {
      if (typeof t == "object" && t instanceof Date) return t;
      if (typeof t == "string") {
        const n = Date.parse(t);
        if (isNaN(n)) throw new Error(`Invalid date:[${t}]`);
        return new Date(n);
      } else if (typeof t == "number") return new Date(t);
      throw new Error(`Invalid date:[${t}]`);
    }
    static review_log(t) {
      return {
        ...t,
        due: b.time(t.due),
        rating: b.rating(t.rating),
        state: b.state(t.state),
        review: b.time(t.review),
      };
    }
  }
  const Ue = 0.9,
    Ge = 36500,
    We = [
      0.4072, 1.1829, 3.1262, 15.4722, 7.2102, 0.5316, 1.0651, 0.0234, 1.616,
      0.1544, 1.0824, 1.9813, 0.0953, 0.2975, 2.2042, 0.2407, 2.9466, 0.5034,
      0.6567,
    ],
    Je = !1,
    Ye = !0,
    wt = (s) => {
      let t = We;
      return (
        s != null &&
          s.w &&
          (s.w.length === 19
            ? (t = s == null ? void 0 : s.w)
            : s.w.length === 17 &&
              ((t = s == null ? void 0 : s.w.concat([0, 0])),
              console.debug("[FSRS V5]auto fill w to 19 length"))),
        {
          request_retention: (s == null ? void 0 : s.request_retention) || Ue,
          maximum_interval: (s == null ? void 0 : s.maximum_interval) || Ge,
          w: t,
          enable_fuzz: (s == null ? void 0 : s.enable_fuzz) ?? Je,
          enable_short_term: (s == null ? void 0 : s.enable_short_term) ?? Ye,
        }
      );
    };
  (Date.prototype.scheduler = function (s, t) {
    return Wt(this, s, t);
  }),
    (Date.prototype.diff = function (s, t) {
      return Ke(this, s, t);
    }),
    (Date.prototype.format = function () {
      return Xe(this);
    }),
    (Date.prototype.dueFormat = function (s, t, n) {
      return Ze(this, s, t, n);
    });
  function Wt(s, t, n) {
    return new Date(
      n
        ? U(s).getTime() + t * 24 * 60 * 60 * 1e3
        : U(s).getTime() + t * 60 * 1e3,
    );
  }
  function Ke(s, t, n) {
    if (!s || !t) throw new Error("Invalid date");
    const e = U(s).getTime() - U(t).getTime();
    let i = 0;
    switch (n) {
      case "days":
        i = Math.floor(e / (24 * 60 * 60 * 1e3));
        break;
      case "minutes":
        i = Math.floor(e / (60 * 1e3));
        break;
    }
    return i;
  }
  function Xe(s) {
    const t = U(s),
      n = t.getFullYear(),
      e = t.getMonth() + 1,
      i = t.getDate(),
      r = t.getHours(),
      a = t.getMinutes(),
      c = t.getSeconds();
    return `${n}-${Z(e)}-${Z(i)} ${Z(r)}:${Z(a)}:${Z(c)}`;
  }
  function Z(s) {
    return s < 10 ? `0${s}` : `${s}`;
  }
  const At = [60, 60, 24, 31, 12],
    Tt = ["second", "min", "hour", "day", "month", "year"];
  function Ze(s, t, n, e = Tt) {
    (s = U(s)), (t = U(t)), e.length !== Tt.length && (e = Tt);
    let i = s.getTime() - t.getTime(),
      r;
    for (i /= 1e3, r = 0; r < At.length && !(i < At[r]); r++) i /= At[r];
    return `${Math.floor(i)}${n ? e[r] : ""}`;
  }
  function U(s) {
    return b.time(s);
  }
  d.Again, d.Hard, d.Good, d.Easy;
  const ts = [
    { start: 2.5, end: 7, factor: 0.15 },
    { start: 7, end: 20, factor: 0.1 },
    { start: 20, end: 1 / 0, factor: 0.05 },
  ];
  function es(s, t, n) {
    let e = 1;
    for (const a of ts)
      e += a.factor * Math.max(Math.min(s, a.end) - a.start, 0);
    s = Math.min(s, n);
    let i = Math.max(2, Math.round(s - e));
    const r = Math.min(Math.round(s + e), n);
    return (
      s > t && (i = Math.max(i, t + 1)),
      (i = Math.min(i, r)),
      { min_ivl: i, max_ivl: r }
    );
  }
  class ss {
    constructor(t) {
      V(this, "c");
      V(this, "s0");
      V(this, "s1");
      V(this, "s2");
      const n = ns();
      (this.c = 1),
        (this.s0 = n(" ")),
        (this.s1 = n(" ")),
        (this.s2 = n(" ")),
        t == null && (t = +new Date()),
        (this.s0 -= n(t)),
        this.s0 < 0 && (this.s0 += 1),
        (this.s1 -= n(t)),
        this.s1 < 0 && (this.s1 += 1),
        (this.s2 -= n(t)),
        this.s2 < 0 && (this.s2 += 1);
    }
    next() {
      const t = 2091639 * this.s0 + this.c * 23283064365386963e-26;
      return (
        (this.s0 = this.s1),
        (this.s1 = this.s2),
        (this.s2 = t - (this.c = t | 0)),
        this.s2
      );
    }
    set state(t) {
      (this.c = t.c), (this.s0 = t.s0), (this.s1 = t.s1), (this.s2 = t.s2);
    }
    get state() {
      return { c: this.c, s0: this.s0, s1: this.s1, s2: this.s2 };
    }
  }
  function ns() {
    let s = 4022871197;
    return function (t) {
      t = String(t);
      for (let n = 0; n < t.length; n++) {
        s += t.charCodeAt(n);
        let e = 0.02519603282416938 * s;
        (s = e >>> 0),
          (e -= s),
          (e *= s),
          (s = e >>> 0),
          (e -= s),
          (s += e * 4294967296);
      }
      return (s >>> 0) * 23283064365386963e-26;
    };
  }
  function os(s) {
    const t = new ss(s),
      n = () => t.next();
    return (
      (n.int32 = () => (t.next() * 4294967296) | 0),
      (n.double = () => n() + ((n() * 2097152) | 0) * 11102230246251565e-32),
      (n.state = () => t.state),
      (n.importState = (e) => ((t.state = e), n)),
      n
    );
  }
  const Jt = -0.5,
    Yt = 19 / 81;
  class is {
    constructor(t) {
      V(this, "param");
      V(this, "intervalModifier");
      V(this, "_seed");
      (this.param = new Proxy(wt(t), this.params_handler_proxy())),
        (this.intervalModifier = this.calculate_interval_modifier(
          this.param.request_retention,
        ));
    }
    get interval_modifier() {
      return this.intervalModifier;
    }
    set seed(t) {
      this._seed = t;
    }
    calculate_interval_modifier(t) {
      if (t <= 0 || t > 1)
        throw new Error(
          "Requested retention rate should be in the range (0,1]",
        );
      return +((Math.pow(t, 1 / Jt) - 1) / Yt).toFixed(8);
    }
    get parameters() {
      return this.param;
    }
    set parameters(t) {
      this.update_parameters(t);
    }
    params_handler_proxy() {
      const t = this;
      return {
        set: function (n, e, i) {
          return (
            e === "request_retention" &&
              Number.isFinite(i) &&
              (t.intervalModifier = t.calculate_interval_modifier(Number(i))),
            Reflect.set(n, e, i),
            !0
          );
        },
      };
    }
    update_parameters(t) {
      const n = wt(t);
      for (const e in n)
        if (e in this.param) {
          const i = e;
          this.param[i] = n[i];
        }
    }
    init_stability(t) {
      return Math.max(this.param.w[t - 1], 0.1);
    }
    init_difficulty(t) {
      return this.constrain_difficulty(
        this.param.w[4] - Math.exp((t - 1) * this.param.w[5]) + 1,
      );
    }
    apply_fuzz(t, n, e) {
      if (!e || t < 2.5) return Math.round(t);
      const i = os(this.seed)(),
        { min_ivl: r, max_ivl: a } = es(t, n, this.param.maximum_interval);
      return Math.floor(i * (a - r + 1) + r);
    }
    next_interval(t, n, e = this.param.enable_fuzz) {
      const i = Math.min(
        Math.max(1, Math.round(t * this.intervalModifier)),
        this.param.maximum_interval,
      );
      return this.apply_fuzz(i, n, e);
    }
    next_difficulty(t, n) {
      const e = t - this.param.w[6] * (n - 3);
      return this.constrain_difficulty(
        this.mean_reversion(this.init_difficulty(d.Easy), e),
      );
    }
    constrain_difficulty(t) {
      return Math.min(Math.max(+t.toFixed(8), 1), 10);
    }
    mean_reversion(t, n) {
      return +(this.param.w[7] * t + (1 - this.param.w[7]) * n).toFixed(8);
    }
    next_recall_stability(t, n, e, i) {
      const r = d.Hard === i ? this.param.w[15] : 1,
        a = d.Easy === i ? this.param.w[16] : 1;
      return +(
        n *
        (1 +
          Math.exp(this.param.w[8]) *
            (11 - t) *
            Math.pow(n, -this.param.w[9]) *
            (Math.exp((1 - e) * this.param.w[10]) - 1) *
            r *
            a)
      ).toFixed(8);
    }
    next_forget_stability(t, n, e) {
      return +(
        this.param.w[11] *
        Math.pow(t, -this.param.w[12]) *
        (Math.pow(n + 1, this.param.w[13]) - 1) *
        Math.exp((1 - e) * this.param.w[14])
      ).toFixed(8);
    }
    next_short_term_stability(t, n) {
      return +(
        t * Math.exp(this.param.w[17] * (n - 3 + this.param.w[18]))
      ).toFixed(8);
    }
    forgetting_curve(t, n) {
      return +Math.pow(1 + (Yt * t) / n, Jt).toFixed(8);
    }
  }
  class Kt {
    constructor(t, n, e) {
      V(this, "last");
      V(this, "current");
      V(this, "review_time");
      V(this, "next", new Map());
      V(this, "algorithm");
      (this.algorithm = e),
        (this.last = b.card(t)),
        (this.current = b.card(t)),
        (this.review_time = b.time(n)),
        this.init();
    }
    init() {
      const { state: t, last_review: n } = this.current;
      let e = 0;
      t !== w.New && n && (e = this.review_time.diff(n, "days")),
        (this.current.last_review = this.review_time),
        (this.current.elapsed_days = e),
        (this.current.reps += 1),
        this.initSeed();
    }
    preview() {
      return {
        [d.Again]: this.review(d.Again),
        [d.Hard]: this.review(d.Hard),
        [d.Good]: this.review(d.Good),
        [d.Easy]: this.review(d.Easy),
      };
    }
    review(t) {
      const { state: n } = this.last;
      let e;
      switch (n) {
        case w.New:
          e = this.newState(t);
          break;
        case w.Learning:
        case w.Relearning:
          e = this.learningState(t);
          break;
        case w.Review:
          e = this.reviewState(t);
          break;
      }
      if (e) return e;
      throw new Error("Invalid grade");
    }
    initSeed() {
      const t = this.review_time.getTime(),
        n = this.current.reps,
        e = this.current.difficulty * this.current.stability;
      this.algorithm.seed = `${t}_${n}_${e}`;
    }
    buildLog(t) {
      const { last_review: n, due: e, elapsed_days: i } = this.last;
      return {
        rating: t,
        state: this.current.state,
        due: n || e,
        stability: this.current.stability,
        difficulty: this.current.difficulty,
        elapsed_days: this.current.elapsed_days,
        last_elapsed_days: i,
        scheduled_days: this.current.scheduled_days,
        review: this.review_time,
      };
    }
  }
  class Xt extends Kt {
    newState(t) {
      const n = this.next.get(t);
      if (n) return n;
      const e = b.card(this.current);
      switch (
        ((e.difficulty = this.algorithm.init_difficulty(t)),
        (e.stability = this.algorithm.init_stability(t)),
        t)
      ) {
        case d.Again:
          (e.scheduled_days = 0),
            (e.due = this.review_time.scheduler(1)),
            (e.state = w.Learning);
          break;
        case d.Hard:
          (e.scheduled_days = 0),
            (e.due = this.review_time.scheduler(5)),
            (e.state = w.Learning);
          break;
        case d.Good:
          (e.scheduled_days = 0),
            (e.due = this.review_time.scheduler(10)),
            (e.state = w.Learning);
          break;
        case d.Easy: {
          const r = this.algorithm.next_interval(
            e.stability,
            this.current.elapsed_days,
            this.algorithm.parameters.enable_fuzz,
          );
          (e.scheduled_days = r),
            (e.due = this.review_time.scheduler(r, !0)),
            (e.state = w.Review);
          break;
        }
        default:
          throw new Error("Invalid grade");
      }
      const i = { card: e, log: this.buildLog(t) };
      return this.next.set(t, i), i;
    }
    learningState(t) {
      const n = this.next.get(t);
      if (n) return n;
      const { state: e, difficulty: i, stability: r } = this.last,
        a = b.card(this.current),
        c = this.current.elapsed_days;
      switch (
        ((a.difficulty = this.algorithm.next_difficulty(i, t)),
        (a.stability = this.algorithm.next_short_term_stability(r, t)),
        t)
      ) {
        case d.Again: {
          (a.scheduled_days = 0),
            (a.due = this.review_time.scheduler(5, !1)),
            (a.state = e);
          break;
        }
        case d.Hard: {
          (a.scheduled_days = 0),
            (a.due = this.review_time.scheduler(10)),
            (a.state = e);
          break;
        }
        case d.Good: {
          const u = this.algorithm.next_interval(a.stability, c);
          (a.scheduled_days = u),
            (a.due = this.review_time.scheduler(u, !0)),
            (a.state = w.Review);
          break;
        }
        case d.Easy: {
          const u = this.algorithm.next_short_term_stability(r, d.Good),
            p = this.algorithm.next_interval(u, c),
            m = Math.max(this.algorithm.next_interval(a.stability, c), p + 1);
          (a.scheduled_days = m),
            (a.due = this.review_time.scheduler(m, !0)),
            (a.state = w.Review);
          break;
        }
        default:
          throw new Error("Invalid grade");
      }
      const l = { card: a, log: this.buildLog(t) };
      return this.next.set(t, l), l;
    }
    reviewState(t) {
      const n = this.next.get(t);
      if (n) return n;
      const e = this.current.elapsed_days,
        { difficulty: i, stability: r } = this.last,
        a = this.algorithm.forgetting_curve(e, r),
        c = b.card(this.current),
        l = b.card(this.current),
        u = b.card(this.current),
        p = b.card(this.current);
      this.next_ds(c, l, u, p, i, r, a),
        this.next_interval(c, l, u, p, e),
        this.next_state(c, l, u, p),
        (c.lapses += 1);
      const m = { card: c, log: this.buildLog(d.Again) },
        g = { card: l, log: super.buildLog(d.Hard) },
        y = { card: u, log: super.buildLog(d.Good) },
        N = { card: p, log: super.buildLog(d.Easy) };
      return (
        this.next.set(d.Again, m),
        this.next.set(d.Hard, g),
        this.next.set(d.Good, y),
        this.next.set(d.Easy, N),
        this.next.get(t)
      );
    }
    next_ds(t, n, e, i, r, a, c) {
      (t.difficulty = this.algorithm.next_difficulty(r, d.Again)),
        (t.stability = this.algorithm.next_forget_stability(r, a, c)),
        (n.difficulty = this.algorithm.next_difficulty(r, d.Hard)),
        (n.stability = this.algorithm.next_recall_stability(r, a, c, d.Hard)),
        (e.difficulty = this.algorithm.next_difficulty(r, d.Good)),
        (e.stability = this.algorithm.next_recall_stability(r, a, c, d.Good)),
        (i.difficulty = this.algorithm.next_difficulty(r, d.Easy)),
        (i.stability = this.algorithm.next_recall_stability(r, a, c, d.Easy));
    }
    next_interval(t, n, e, i, r) {
      let a, c;
      (a = this.algorithm.next_interval(n.stability, r)),
        (c = this.algorithm.next_interval(e.stability, r)),
        (a = Math.min(a, c)),
        (c = Math.max(c, a + 1));
      const l = Math.max(this.algorithm.next_interval(i.stability, r), c + 1);
      (t.scheduled_days = 0),
        (t.due = this.review_time.scheduler(5)),
        (n.scheduled_days = a),
        (n.due = this.review_time.scheduler(a, !0)),
        (e.scheduled_days = c),
        (e.due = this.review_time.scheduler(c, !0)),
        (i.scheduled_days = l),
        (i.due = this.review_time.scheduler(l, !0));
    }
    next_state(t, n, e, i) {
      (t.state = w.Relearning),
        (n.state = w.Review),
        (e.state = w.Review),
        (i.state = w.Review);
    }
  }
  class Zt extends Kt {
    newState(t) {
      const n = this.next.get(t);
      if (n) return n;
      (this.current.scheduled_days = 0), (this.current.elapsed_days = 0);
      const e = b.card(this.current),
        i = b.card(this.current),
        r = b.card(this.current),
        a = b.card(this.current);
      return (
        this.init_ds(e, i, r, a),
        this.next_interval(e, i, r, a, 0),
        this.next_state(e, i, r, a),
        this.update_next(e, i, r, a),
        this.next.get(t)
      );
    }
    init_ds(t, n, e, i) {
      (t.difficulty = this.algorithm.init_difficulty(d.Again)),
        (t.stability = this.algorithm.init_stability(d.Again)),
        (n.difficulty = this.algorithm.init_difficulty(d.Hard)),
        (n.stability = this.algorithm.init_stability(d.Hard)),
        (e.difficulty = this.algorithm.init_difficulty(d.Good)),
        (e.stability = this.algorithm.init_stability(d.Good)),
        (i.difficulty = this.algorithm.init_difficulty(d.Easy)),
        (i.stability = this.algorithm.init_stability(d.Easy));
    }
    learningState(t) {
      return this.reviewState(t);
    }
    reviewState(t) {
      const n = this.next.get(t);
      if (n) return n;
      const e = this.current.elapsed_days,
        { difficulty: i, stability: r } = this.last,
        a = this.algorithm.forgetting_curve(e, r),
        c = b.card(this.current),
        l = b.card(this.current),
        u = b.card(this.current),
        p = b.card(this.current);
      return (
        this.next_ds(c, l, u, p, i, r, a),
        this.next_interval(c, l, u, p, e),
        this.next_state(c, l, u, p),
        (c.lapses += 1),
        this.update_next(c, l, u, p),
        this.next.get(t)
      );
    }
    next_ds(t, n, e, i, r, a, c) {
      (t.difficulty = this.algorithm.next_difficulty(r, d.Again)),
        (t.stability = this.algorithm.next_forget_stability(r, a, c)),
        (n.difficulty = this.algorithm.next_difficulty(r, d.Hard)),
        (n.stability = this.algorithm.next_recall_stability(r, a, c, d.Hard)),
        (e.difficulty = this.algorithm.next_difficulty(r, d.Good)),
        (e.stability = this.algorithm.next_recall_stability(r, a, c, d.Good)),
        (i.difficulty = this.algorithm.next_difficulty(r, d.Easy)),
        (i.stability = this.algorithm.next_recall_stability(r, a, c, d.Easy));
    }
    next_interval(t, n, e, i, r) {
      let a, c, l, u;
      (a = this.algorithm.next_interval(t.stability, r)),
        (c = this.algorithm.next_interval(n.stability, r)),
        (l = this.algorithm.next_interval(e.stability, r)),
        (u = this.algorithm.next_interval(i.stability, r)),
        (a = Math.min(a, c)),
        (c = Math.max(c, a + 1)),
        (l = Math.max(l, c + 1)),
        (u = Math.max(u, l + 1)),
        (t.scheduled_days = a),
        (t.due = this.review_time.scheduler(a, !0)),
        (n.scheduled_days = c),
        (n.due = this.review_time.scheduler(c, !0)),
        (e.scheduled_days = l),
        (e.due = this.review_time.scheduler(l, !0)),
        (i.scheduled_days = u),
        (i.due = this.review_time.scheduler(u, !0));
    }
    next_state(t, n, e, i) {
      (t.state = w.Review),
        (n.state = w.Review),
        (e.state = w.Review),
        (i.state = w.Review);
    }
    update_next(t, n, e, i) {
      const r = { card: t, log: this.buildLog(d.Again) },
        a = { card: n, log: super.buildLog(d.Hard) },
        c = { card: e, log: super.buildLog(d.Good) },
        l = { card: i, log: super.buildLog(d.Easy) };
      this.next.set(d.Again, r),
        this.next.set(d.Hard, a),
        this.next.set(d.Good, c),
        this.next.set(d.Easy, l);
    }
  }
  class rs extends is {
    constructor(n) {
      super(n);
      V(this, "Schduler");
      const { enable_short_term: e } = this.parameters;
      this.Schduler = e ? Xt : Zt;
    }
    params_handler_proxy() {
      const n = this;
      return {
        set: function (e, i, r) {
          return (
            i === "request_retention" && Number.isFinite(r)
              ? (n.intervalModifier = n.calculate_interval_modifier(Number(r)))
              : i === "enable_short_term" && (n.Schduler = r === !0 ? Xt : Zt),
            Reflect.set(e, i, r),
            !0
          );
        },
      };
    }
    repeat(n, e, i) {
      const r = this.Schduler,
        a = new r(n, e, this).preview();
      return i && typeof i == "function" ? i(a) : a;
    }
    next(n, e, i, r) {
      const a = this.Schduler,
        c = new a(n, e, this),
        l = b.rating(i);
      if (l === d.Manual) throw new Error("Cannot review a manual rating");
      const u = c.review(l);
      return r && typeof r == "function" ? r(u) : u;
    }
    get_retrievability(n, e, i = !0) {
      const r = b.card(n);
      if (((e = b.time(e)), r.state !== w.Review)) return;
      const a = Math.max(e.diff(r.last_review, "days"), 0),
        c = this.forgetting_curve(a, +r.stability.toFixed(2));
      return i ? `${(c * 100).toFixed(2)}%` : c;
    }
    rollback(n, e, i) {
      const r = b.card(n),
        a = b.review_log(e);
      if (a.rating === d.Manual)
        throw new Error("Cannot rollback a manual rating");
      let c, l, u;
      switch (a.state) {
        case w.New:
          (c = a.due), (l = void 0), (u = 0);
          break;
        case w.Learning:
        case w.Relearning:
        case w.Review:
          (c = a.review),
            (l = a.due),
            (u =
              r.lapses -
              (a.rating === d.Again && a.state === w.Review ? 1 : 0));
          break;
      }
      const p = {
        ...r,
        due: c,
        stability: a.stability,
        difficulty: a.difficulty,
        elapsed_days: a.last_elapsed_days,
        scheduled_days: a.scheduled_days,
        reps: Math.max(0, r.reps - 1),
        lapses: Math.max(0, u),
        state: a.state,
        last_review: l,
      };
      return i && typeof i == "function" ? i(p) : p;
    }
    forget(n, e, i = !1, r) {
      const a = b.card(n);
      e = b.time(e);
      const c = a.state === w.New ? 0 : e.diff(a.last_review, "days"),
        l = {
          rating: d.Manual,
          state: a.state,
          due: a.due,
          stability: a.stability,
          difficulty: a.difficulty,
          elapsed_days: 0,
          last_elapsed_days: a.elapsed_days,
          scheduled_days: c,
          review: e,
        },
        u = {
          card: {
            ...a,
            due: e,
            stability: 0,
            difficulty: 0,
            elapsed_days: 0,
            scheduled_days: 0,
            reps: i ? 0 : a.reps,
            lapses: i ? 0 : a.lapses,
            state: w.New,
            last_review: a.last_review,
          },
          log: l,
        };
      return r && typeof r == "function" ? r(u) : u;
    }
    reschedule(n, e = {}) {
      if (!Array.isArray(n)) throw new Error("cards must be an array");
      const i = [];
      for (const r of n) {
        if (b.state(r.state) !== w.Review || !r.last_review) continue;
        const a = Math.floor(r.scheduled_days),
          c = this.next_interval(
            +r.stability.toFixed(2),
            Math.round(r.elapsed_days),
            e.enable_fuzz ?? !0,
          );
        if (c === a || c === 0) continue;
        const l = { ...r };
        l.scheduled_days = c;
        const u = Wt(l.last_review, c, !0);
        e.dateHandler && typeof e.dateHandler == "function"
          ? (l.due = e.dateHandler(u))
          : (l.due = u),
          i.push(l);
      }
      return i;
    }
  }
  const as = (s) => new rs(s || {}),
    cs = wt({ enable_fuzz: !0 }),
    ls = as(cs),
    us = (s) => ({
      id: s._id.$oid,
      last_review: s.lastAttempted,
      due: new Date(),
      stability: 1,
      difficulty: 2.5,
      elapsed_days: Math.floor(
        (new Date().getTime() - new Date(s.lastAttempted).getTime()) /
          (1e3 * 60 * 60 * 24),
      ),
      scheduled_days: 1,
      reps: 0,
      lapses: 0,
      state: s.correctAttempts === 0 ? 0 : 1,
    });
  function ds(s) {
    const t = new Date(),
      n = us(s),
      e = ls.repeat(n, t),
      i = s.correctAttempts / (s.attempts + 0.1) > 0.5 ? d.Good : d.Again,
      { card: r } = e[i];
    return { ...r, reviewDue: r.due };
  }
  const ps = (s) =>
      s.map((t) => {
        const n = ds(t);
        return { ...t, reviewDue: n.reviewDue };
      }),
    fs = (s) =>
      ps(s).sort((t, n) => t.reviewDue.getTime() - n.reviewDue.getTime()),
    ms = (s) => {
      for (let t = s.length - 1; t > 0; t--) {
        const n = Math.floor(Math.random() * (t + 1));
        [s[t], s[n]] = [s[n], s[t]];
      }
      return s;
    },
    hs = (s, t) => {
      const n = fs(t);
      return ms(n.slice(0, s));
    };
  function te(s) {
    const t = s.reduce(
      (e, i) => (
        Object.keys(i).forEach((r) => {
          r.trim() !== "" &&
            (e[r] || (e[r] = new Set()), i[r].forEach((c) => e[r].add(c)));
        }),
        e
      ),
      {},
    );
    return Object.keys(t).reduce((e, i) => ((e[i] = [...t[i]]), e), {});
  }
  function St(s, t) {
    return s.filter((n) =>
      Object.keys(t).every((e) => {
        if (!t[e].length) return !0;
        const i = n.tags[e];
        if (i) return i.some((r) => t[e].includes(r));
      }),
    );
  }
  function gs(s, t, n) {
    return s.filter((e) => {
      const i = e.tags[n];
      return i && i.includes(t);
    });
  }
  function _s(s, t, n) {
    const e = s[t].question.optionsList;
    for (let i = 0; i < e.length; i++) if (e[i].optionValue === n) return i;
  }
  const ee = (s, t) =>
      t.findIndex((n) => {
        var e;
        return ((e = n.question._id) == null ? void 0 : e.$oid) === s;
      }),
    P = Ie("questionsQueue", {
      state: () => ({
        allQs: [],
        questionsQueue: [],
        questionsStack: [],
        quizStats: [],
        quizMode: "Tutor",
        selectedTags: { course: [] },
        timeLimit: 60,
        AnsweredQuesiton: 0,
        tagSets: [],
      }),
      actions: {
        setTagSet() {
          this.tagSets = this.allQs.map((s) => s.tags);
        },
        getTagSet() {
          return this.tagSets;
        },
        getAnsweredQuestionsNum() {
          return this.AnsweredQuesiton;
        },
        setAnsweredQuestionsNum() {
          this.AnsweredQuesiton = Math.min(
            this.AnsweredQuesiton + 1,
            this.quizStats.length,
          );
        },
        getquestionnumber() {
          const s = this.allQs;
          return St(s, this.selectedTags).length;
        },
        setselectedTags(s) {
          this.selectedTags = s;
        },
        getselectedtags() {
          return this.selectedTags;
        },
        modifySelectedTags(s, { category: t, topic: n }) {
          this.selectedTags[t] &&
            (this.selectedTags[t] = s
              ? [...this.selectedTags[t], n]
              : this.selectedTags[t].filter((e) => e !== n));
        },
        initialiseQuiz(s, t) {
          (this.questionsQueue = s),
            (this.questionsStack = []),
            (this.quizMode = t),
            (this.quizStats = s.map((n) => ({
              question: n,
              correct: 0,
              skipped: 0,
              attempts: 0,
              selectedValue: "",
            })));
        },
        incrementStat(s, t, n) {
          const e = ee(s, this.quizStats);
          if (this.quizStats[e]) {
            if (n !== void 0) {
              if ((this.quizStats[e][t]++, n === "-1")) {
                this.quizStats[e].selectedValue = "Reached Time Limit";
                return;
              }
              const i = this.quizStats[e].question.optionsList
                .map((r) => r.optionCorrect)
                .indexOf(!0);
              Number(n) === Number(i)
                ? (this.quizStats[e].correct = 1)
                : (this.quizStats[e].correct = 0);
            }
            this.quizStats[e].selectedValue =
              n !== void 0
                ? this.quizStats[e].question.optionsList[Number(n)].optionValue
                : "";
          }
        },
        pushToHistoryStack(s) {
          this.questionsStack.push(s);
        },
        enqueueQuestion(s) {
          this.questionsQueue.push(s);
        },
        dequeueQuestion() {
          for (; this.questionsQueue.length > 0; ) {
            const s = this.questionsQueue.shift();
            return this.pushToHistoryStack(s), s;
          }
          return this.questionsQueue.shift();
        },
        removeFromLastHistory() {
          if (!(this.questionsStack.length < 1))
            return (
              this.questionsQueue.unshift(this.questionsStack.pop()),
              this.questionsStack[this.questionsStack.length - 1]
            );
        },
        getTimeLimit() {
          return this.timeLimit;
        },
        setTimeLimit(s) {
          this.timeLimit = s;
        },
        getRemainingQuestions() {
          return this.questionsQueue.length;
        },
      },
    }),
    bs = ["innerHTML"],
    ys = { class: "mcq-list" },
    ws = ["onClick"],
    As = { class: "next-prev-question" },
    se = O(
      o.defineComponent({
        __name: "MCQQuestion",
        props: { _id: {}, statement: {}, optionsList: {} },
        emits: ["nextQuestion", "skipQuestion", "prevQuestion"],
        setup(s, { emit: t }) {
          const n = P(),
            e = o.ref(null),
            i = o.ref(!1),
            r = t,
            a = o.ref(n.getRemainingQuestions()),
            c = () => {
              i.value = !0;
            },
            l = () => {
              (e.value = null), r("nextQuestion");
            },
            u = () => {
              g(), (a.value = n.getRemainingQuestions()), r("nextQuestion");
            },
            p = () => {
              g(), r("skipQuestion");
            },
            m = (S) => n.incrementStat(S.$oid, "attempts", e.value ?? void 0),
            g = () => {
              (i.value = !1), (e.value = null);
            },
            y = () => {
              (e.value = null), r("prevQuestion");
            },
            N = (S, E) => {
              i.value || (e.value = e.value === E ? null : E), m(S);
            },
            et = (S, E, T) => (n.quizMode === "Timed" ? dt(S, E) : pt(E, T));
          function dt(S, E) {
            const T = ee(S.$oid, n.quizStats),
              q = n.quizStats[T].selectedValue,
              Y = _s(n.quizStats, T, q);
            return String(Y) === E ? ((e.value = E), "selected") : "";
          }
          function pt(S, E) {
            const T = E[parseInt(S)],
              q = e.value === S;
            return i.value
              ? T.optionCorrect
                ? "correct ignore-hover"
                : q
                  ? "wrong ignore-hover"
                  : "ignore-hover"
              : q
                ? "selected"
                : "";
          }
          return (S, E) => (
            o.openBlock(),
            o.createElementBlock(
              o.Fragment,
              null,
              [
                o.createElementVNode(
                  "div",
                  { class: "mcq-statement", innerHTML: S.statement },
                  null,
                  8,
                  bs,
                ),
                o.createElementVNode("div", ys, [
                  (o.openBlock(!0),
                  o.createElementBlock(
                    o.Fragment,
                    null,
                    o.renderList(
                      Object.entries(S.optionsList),
                      ([T, q]) => (
                        o.openBlock(),
                        o.createElementBlock(
                          "div",
                          {
                            key: T,
                            class: o.normalizeClass([
                              "mcq-option",
                              et(S._id, T, S.optionsList),
                            ]),
                            onClick: (Y) => N(S._id, T),
                          },
                          [
                            o.createVNode(
                              ze,
                              {
                                "option-key": T,
                                checked: e.value === T,
                                option: q,
                                submitted: i.value,
                                onSelectOption: (Y) => N(S._id, T),
                              },
                              null,
                              8,
                              [
                                "option-key",
                                "checked",
                                "option",
                                "submitted",
                                "onSelectOption",
                              ],
                            ),
                          ],
                          10,
                          ws,
                        )
                      ),
                    ),
                    128,
                  )),
                ]),
                o.unref(n).quizMode === "Tutor"
                  ? (o.openBlock(),
                    o.createBlock(
                      He,
                      {
                        key: 0,
                        submitted: i.value,
                        "selected-option": e.value,
                        "hide-skip": a.value <= 1,
                        onSubmitAnswer: c,
                        onNextQuestion: E[0] || (E[0] = (T) => u()),
                        onSkipQuestion: p,
                      },
                      null,
                      8,
                      ["submitted", "selected-option", "hide-skip"],
                    ))
                  : o.createCommentVNode("", !0),
                o.createElementVNode("div", As, [
                  o.unref(n).quizMode === "Timed"
                    ? (o.openBlock(),
                      o.createBlock(
                        Gt,
                        {
                          key: 0,
                          "button-name":
                            o.unref(n).questionsQueue.length >= 1
                              ? "→"
                              : "Submit",
                          onNextQuestion: E[1] || (E[1] = (T) => l()),
                        },
                        null,
                        8,
                        ["button-name"],
                      ))
                    : o.createCommentVNode("", !0),
                  o.unref(n).quizMode === "Timed" &&
                  o.unref(n).questionsStack.length > 1
                    ? (o.openBlock(),
                      o.createBlock(Gt, {
                        key: 1,
                        "button-name": "←",
                        onPrevQuestion: E[2] || (E[2] = (T) => y()),
                      }))
                    : o.createCommentVNode("", !0),
                ]),
              ],
              64,
            )
          );
        },
      }),
      [["__scopeId", "data-v-181a554c"]],
    ),
    Ts = (s) => (
      o.pushScopeId("data-v-38adb08e"), (s = s()), o.popScopeId(), s
    ),
    Ss = { class: "report-container" },
    Es = { class: "mcq-report" },
    ks = { class: "table-container" },
    vs = Ts(() =>
      o.createElementVNode(
        "thead",
        null,
        [
          o.createElementVNode("tr", null, [
            o.createElementVNode("th", null, "question"),
            o.createElementVNode("th", null, "correct option"),
            o.createElementVNode("th", null, "your answer"),
          ]),
        ],
        -1,
      ),
    ),
    Cs = { class: "question-row" },
    Ns = ["href", "innerHTML"],
    Vs = { class: "answer-row" },
    xs = ["innerHTML"],
    Ds = { class: "answer-row" },
    $s = ["innerHTML"],
    Qs = { class: "mcq-result" },
    Ms = { class: "score" },
    ne = O(
      o.defineComponent({
        __name: "MCQStatus",
        setup(s) {
          const t = o.inject("$updateQAttemptCallback") ?? vt,
            n = P(),
            e = n.quizStats,
            i = n.quizStats.length,
            r = e.filter((l) => l.correct === 1).length,
            a = ((r * 100) / i).toFixed(0),
            c = () => {
              try {
                const l = e
                  .filter((u) => u.attempts)
                  .map((u) => t(u.question._id.$oid, !!u.correct));
                l.length && Promise.allSettled(l);
              } catch (l) {
                throw (console.error("Error updating question attempts", l), l);
              }
            };
          return (
            o.onMounted(c),
            (l, u) => (
              o.openBlock(),
              o.createElementBlock("div", Ss, [
                o.createElementVNode("div", Es, [
                  o.createElementVNode("div", ks, [
                    o.createElementVNode("table", null, [
                      vs,
                      o.createElementVNode("tbody", null, [
                        (o.openBlock(!0),
                        o.createElementBlock(
                          o.Fragment,
                          null,
                          o.renderList(
                            Object.entries(o.unref(e)),
                            ([p, m]) => (
                              o.openBlock(),
                              o.createElementBlock(
                                "tr",
                                { key: p, class: "quiz-statment" },
                                [
                                  o.createElementVNode("td", Cs, [
                                    o.createElementVNode(
                                      "a",
                                      {
                                        href: m.question.link,
                                        target: "_blank",
                                        innerHTML: m.question.statement,
                                      },
                                      null,
                                      8,
                                      Ns,
                                    ),
                                  ]),
                                  o.createElementVNode("td", Vs, [
                                    (o.openBlock(!0),
                                    o.createElementBlock(
                                      o.Fragment,
                                      null,
                                      o.renderList(
                                        Object.entries(m.question.optionsList),
                                        ([g, y]) => (
                                          o.openBlock(),
                                          o.createElementBlock(
                                            "span",
                                            { key: g },
                                            [
                                              y.optionCorrect
                                                ? (o.openBlock(),
                                                  o.createElementBlock(
                                                    "span",
                                                    {
                                                      key: 0,
                                                      innerHTML: y.optionValue,
                                                    },
                                                    null,
                                                    8,
                                                    xs,
                                                  ))
                                                : o.createCommentVNode("", !0),
                                            ],
                                          )
                                        ),
                                      ),
                                      128,
                                    )),
                                  ]),
                                  o.createElementVNode("td", Ds, [
                                    o.createElementVNode(
                                      "span",
                                      {
                                        class: o.normalizeClass(
                                          m.correct === 1
                                            ? "correct-answer"
                                            : "wrong-answer",
                                        ),
                                        innerHTML:
                                          m.correct === 1
                                            ? "<span> ✔</span> "
                                            : "<span> ✘</span> <span>     </span>" +
                                              m.selectedValue,
                                      },
                                      null,
                                      10,
                                      $s,
                                    ),
                                  ]),
                                ],
                              )
                            ),
                          ),
                          128,
                        )),
                      ]),
                    ]),
                  ]),
                ]),
                o.createElementVNode("div", null, [
                  o.createElementVNode("div", Qs, [
                    o.createElementVNode(
                      "span",
                      Ms,
                      "⌛ Result: " +
                        o.toDisplayString(o.unref(r)) +
                        " out of " +
                        o.toDisplayString(o.unref(i)) +
                        " - (" +
                        o.toDisplayString(o.unref(a)) +
                        " %)",
                      1,
                    ),
                  ]),
                ]),
              ])
            )
          );
        },
      }),
      [["__scopeId", "data-v-38adb08e"]],
    ),
    Os = { class: "questions-left-header" },
    qs = O(
      o.defineComponent({
        __name: "MCQQuiz",
        setup(s) {
          const t = o.ref(),
            n = P();
          o.onMounted(() => {
            i();
          });
          const e = () => {
              n.enqueueQuestion(t.value), (t.value = n.dequeueQuestion());
            },
            i = () => {
              n.setAnsweredQuestionsNum(), (t.value = n.dequeueQuestion());
            },
            r = () => window.location.reload();
          return (a, c) => {
            const l = o.resolveComponent("MCQInfoPanel");
            return (
              o.openBlock(),
              o.createElementBlock("main", null, [
                o.createVNode(l),
                o.createElementVNode(
                  "h3",
                  Os,
                  " Question " +
                    o.toDisplayString(o.unref(n).getAnsweredQuestionsNum()) +
                    " out of " +
                    o.toDisplayString(o.unref(n).quizStats.length),
                  1,
                ),
                t.value
                  ? (o.openBlock(),
                    o.createBlock(
                      se,
                      {
                        key: 0,
                        statement: t.value.statement,
                        "options-list": t.value.optionsList,
                        _id: t.value._id,
                        onNextQuestion: i,
                        onSkipQuestion: e,
                      },
                      null,
                      8,
                      ["statement", "options-list", "_id"],
                    ))
                  : o.createCommentVNode("", !0),
                t.value
                  ? o.createCommentVNode("", !0)
                  : (o.openBlock(), o.createBlock(ne, { key: 1 })),
                t.value
                  ? o.createCommentVNode("", !0)
                  : (o.openBlock(),
                    o.createElementBlock(
                      "button",
                      { key: 2, class: "btn-relocate", onClick: r },
                      " End ",
                    )),
              ])
            );
          };
        },
      }),
      [["__scopeId", "data-v-edc7c7f1"]],
    ),
    Ls = { key: 0, class: "time-left-header" },
    Ps = { class: "questions-left-header" },
    Is = o.defineComponent({
      __name: "MCQInfoPanel",
      props: { timeLeft: { type: Number, default: 0 } },
      setup(s) {
        const t = P(),
          n = (e) => {
            const i = Math.floor(e / 60),
              r = e % 60;
            return `${i}:${r < 10 ? "0" : ""}${r}`;
          };
        return (e, i) => (
          o.openBlock(),
          o.createElementBlock(
            o.Fragment,
            null,
            [
              s.timeLeft
                ? (o.openBlock(),
                  o.createElementBlock(
                    "h3",
                    Ls,
                    " Time left: " + o.toDisplayString(n(s.timeLeft)),
                    1,
                  ))
                : o.createCommentVNode("", !0),
              o.createElementVNode(
                "h3",
                Ps,
                " Question " +
                  o.toDisplayString(o.unref(t).questionsStack.length) +
                  " out of " +
                  o.toDisplayString(o.unref(t).quizStats.length),
                1,
              ),
            ],
            64,
          )
        );
      },
    }),
    oe = 1e3,
    Bs = "-1",
    Rs = O(
      o.defineComponent({
        __name: "MCQTimedQuiz",
        setup(s) {
          const t = P(),
            n = o.ref();
          let e = null,
            i = null;
          const r = o.ref(t.timeLimit);
          o.onMounted(() => {
            c();
          }),
            o.onBeforeMount(() => {
              u(), p();
            });
          const a = () => {
              n.value = t.removeFromLastHistory() ?? n.value;
            },
            c = () => (n.value = t.dequeueQuestion()),
            l = () => window.location.reload(),
            u = () => {
              e && clearTimeout(e), i && clearInterval(i);
            },
            p = () => {
              r.value = t.timeLimit;
              const g = () => (n.value ? (r.value ? r.value-- : m()) : u());
              (i = window.setInterval(g, oe)),
                (e = window.setTimeout(() => {}, t.timeLimit * oe));
            },
            m = () => {
              var y;
              u();
              const g = (N) => t.incrementStat(N, "attempts", Bs);
              for (
                g(((y = n.value) == null ? void 0 : y._id.$oid) ?? "");
                (n.value = t.dequeueQuestion());

              )
                g(n.value._id.$oid);
              return alert("Time's up! Quiz has ended."), c();
            };
          return (g, y) => (
            o.openBlock(),
            o.createElementBlock("main", null, [
              o.createVNode(Is, { "time-left": r.value }, null, 8, [
                "time-left",
              ]),
              n.value
                ? (o.openBlock(),
                  o.createBlock(
                    se,
                    {
                      key: 0,
                      statement: n.value.statement,
                      "options-list": n.value.optionsList,
                      _id: n.value._id,
                      onNextQuestion: c,
                      onPrevQuestion: a,
                    },
                    null,
                    8,
                    ["statement", "options-list", "_id"],
                  ))
                : o.createCommentVNode("", !0),
              n.value
                ? o.createCommentVNode("", !0)
                : (o.openBlock(), o.createBlock(ne, { key: 1 })),
              n.value
                ? o.createCommentVNode("", !0)
                : (o.openBlock(),
                  o.createElementBlock(
                    "button",
                    { key: 2, class: "btn-relocate", onClick: l },
                    " End ",
                  )),
            ])
          );
        },
      }),
      [["__scopeId", "data-v-4fd74e68"]],
    ),
    js = ["id", "name", "value", "disabled"],
    zs = ["for"],
    Fs = { key: 0, class: "question-number" },
    Hs = O(
      o.defineComponent({
        __name: "FilterCheckbox",
        props: { category: {}, topics: {} },
        setup(s) {
          const { category: t, topics: n } = s,
            e = P(),
            i = (l) => (t === "course" ? l.toUpperCase() : l),
            r = o.computed(() =>
              Object.entries(n)
                .map(([l, u]) => {
                  const p = c(u, t),
                    m = gs(e.allQs, u, t).length.toString();
                  return { idx: l, topic: u, num: p, questionamount: m };
                })
                .filter(({ topic: l }) => l !== void 0),
            ),
            a = (l) => {
              if (!(l.target instanceof HTMLInputElement))
                return console.error("Trying to click on non-input element");
              const u = l.target.name,
                p = l.target.value;
              e.modifySelectedTags(l.target.checked, { category: u, topic: p });
            },
            c = (l, u) => {
              var y;
              const p = e.getselectedtags();
              if (!p[u] || ((y = p[u]) != null && y.includes(l))) return null;
              const m = JSON.parse(JSON.stringify(e.getselectedtags()));
              m[u].includes(l) || m[u].push(l);
              const g = e.allQs;
              return St(g, m).length.toString();
            };
          return (l, u) => (
            o.openBlock(),
            o.createElementBlock("ul", null, [
              (o.openBlock(!0),
              o.createElementBlock(
                o.Fragment,
                null,
                o.renderList(
                  r.value,
                  ({ idx: p, num: m, topic: g, questionamount: y }) => (
                    o.openBlock(),
                    o.createElementBlock(
                      "li",
                      {
                        key: p,
                        class: o.normalizeClass([
                          "filter-options",
                          { "grey-out": m === "0" },
                        ]),
                      },
                      [
                        o.createElementVNode(
                          "input",
                          {
                            id: `${l.category}-${g}-checkbox`,
                            type: "checkbox",
                            name: l.category,
                            value: g,
                            disabled: m === "0",
                            onChange: u[0] || (u[0] = (N) => a(N)),
                          },
                          null,
                          40,
                          js,
                        ),
                        o.createElementVNode(
                          "label",
                          { for: `${l.category}-${g}-checkbox` },
                          [
                            o.createTextVNode(o.toDisplayString(i(g)) + " ", 1),
                            m !== null && m !== "0"
                              ? (o.openBlock(),
                                o.createElementBlock(
                                  "span",
                                  Fs,
                                  o.toDisplayString(y),
                                  1,
                                ))
                              : o.createCommentVNode("", !0),
                          ],
                          8,
                          zs,
                        ),
                      ],
                      2,
                    )
                  ),
                ),
                128,
              )),
            ])
          );
        },
      }),
      [["__scopeId", "data-v-43544b02"]],
    ),
    Us = { key: 0, class: "filter" },
    Gs = { class: "category-heading" },
    Ws = O(
      o.defineComponent({
        __name: "MCQTagOptions",
        setup(s) {
          const t = o.ref([]),
            n = P();
          let e = {};
          return (
            o.watch(
              () => n.allQs,
              (i, r) => {
                n.setTagSet(), (t.value = n.getTagSet()), (e = te(t.value));
              },
            ),
            (i, r) =>
              o.unref(n).allQs
                ? (o.openBlock(),
                  o.createElementBlock("div", Us, [
                    (o.openBlock(!0),
                    o.createElementBlock(
                      o.Fragment,
                      null,
                      o.renderList(
                        Object.entries(o.unref(e)),
                        ([a, c]) => (
                          o.openBlock(),
                          o.createElementBlock(
                            "div",
                            { key: a, class: "category" },
                            [
                              o.createElementVNode(
                                "h2",
                                Gs,
                                o.toDisplayString(a),
                                1,
                              ),
                              o.createVNode(
                                Hs,
                                { category: a, topics: c },
                                null,
                                8,
                                ["category", "topics"],
                              ),
                            ],
                          )
                        ),
                      ),
                      128,
                    )),
                  ]))
                : o.createCommentVNode("", !0)
          );
        },
      }),
      [["__scopeId", "data-v-0ae43360"]],
    ),
    Js = { for: "optionName" },
    Ys = ["value"],
    Ks = O(
      o.defineComponent({
        __name: "DropDownbox",
        props: { options: {}, optionName: {}, disabled: { type: Boolean } },
        setup(s) {
          const t = P(),
            n = o.ref(0);
          function e(i) {
            const r = i.target;
            r.value &&
              ((n.value = parseFloat(r.value) * 60), t.setTimeLimit(n.value));
          }
          return (i, r) => (
            o.openBlock(),
            o.createElementBlock(
              "div",
              {
                class: o.normalizeClass(
                  i.disabled ? "dropdown input-disabled" : "dropdown",
                ),
              },
              [
                o.createElementVNode(
                  "label",
                  Js,
                  o.toDisplayString(i.optionName) + ":   ",
                  1,
                ),
                o.createElementVNode(
                  "select",
                  { id: "optionName", name: "optionName", onChange: e },
                  [
                    (o.openBlock(!0),
                    o.createElementBlock(
                      o.Fragment,
                      null,
                      o.renderList(
                        i.options,
                        (a) => (
                          o.openBlock(),
                          o.createElementBlock(
                            "option",
                            { key: a.value, value: a.value },
                            o.toDisplayString(a.value) +
                              " " +
                              o.toDisplayString(a.unit),
                            9,
                            Ys,
                          )
                        ),
                      ),
                      128,
                    )),
                  ],
                  32,
                ),
              ],
              2,
            )
          );
        },
      }),
      [["__scopeId", "data-v-5f3ae97a"]],
    ),
    tt = (s) => (
      o.pushScopeId("data-v-c3d686ea"), (s = s()), o.popScopeId(), s
    ),
    Xs = { class: "start-page-container" },
    Zs = tt(() => o.createElementVNode("h1", null, "VetCloud Smart Quiz", -1)),
    tn = { class: "quiz-config-container" },
    en = { class: "question-config-container" },
    sn = { class: "tag-text" },
    nn = { class: "question-number" },
    on = { class: "question-amount-container" },
    rn = tt(() =>
      o.createElementVNode(
        "label",
        { for: "question-amount" },
        "Select the amount of questions:",
        -1,
      ),
    ),
    an = ["max"],
    cn = { key: 0, class: "show-max-msg" },
    ln = tt(() =>
      o.createElementVNode("label", { for: "mode-select" }, "Select mode:", -1),
    ),
    un = [
      tt(() => o.createElementVNode("option", { value: "Tutor" }, "Tutor", -1)),
      tt(() => o.createElementVNode("option", { value: "Timed" }, "Timed", -1)),
    ],
    dn = 3e3,
    pn = O(
      o.defineComponent({
        __name: "StartPage",
        emits: ["start-quiz"],
        setup(s, { emit: t }) {
          const n = o.ref(1),
            e = o.ref("Tutor"),
            i = o.ref(!1),
            r = o.ref(null),
            a = t,
            c = P();
          o.onMounted(() => {
            o.watchEffect(() => {
              const p = c.getquestionnumber();
              n.value = Math.min(10, p);
            });
          });
          const l = () => {
              a("start-quiz", { questionAmount: n.value, mode: e.value });
            },
            u = () => {
              r.value && clearTimeout(r.value),
                n.value > c.getquestionnumber() &&
                  ((n.value = c.getquestionnumber()),
                  (i.value = !0),
                  (r.value = window.setTimeout(() => {
                    i.value = !1;
                  }, dn)));
            };
          return (p, m) => (
            o.openBlock(),
            o.createElementBlock("div", Xs, [
              Zs,
              o.createVNode(Ws),
              o.createElementVNode("div", tn, [
                o.createElementVNode("div", en, [
                  o.createElementVNode("p", sn, [
                    o.createTextVNode(" Maximum possible questions: "),
                    o.createElementVNode(
                      "span",
                      nn,
                      o.toDisplayString(o.unref(c).getquestionnumber()),
                      1,
                    ),
                  ]),
                  o.createElementVNode("div", on, [
                    rn,
                    o.withDirectives(
                      o.createElementVNode(
                        "input",
                        {
                          id: "question-amount",
                          "onUpdate:modelValue":
                            m[0] || (m[0] = (g) => (n.value = g)),
                          type: "number",
                          placeholder: "Question amount",
                          min: "1",
                          max: o.unref(c).getquestionnumber(),
                          onInput: u,
                        },
                        null,
                        40,
                        an,
                      ),
                      [[o.vModelText, n.value, void 0, { number: !0 }]],
                    ),
                  ]),
                  i.value
                    ? (o.openBlock(),
                      o.createElementBlock(
                        "p",
                        cn,
                        " Cannot select more than " +
                          o.toDisplayString(o.unref(c).getquestionnumber()) +
                          " questions. ",
                        1,
                      ))
                    : o.createCommentVNode("", !0),
                  o.createElementVNode("div", null, [
                    ln,
                    o.withDirectives(
                      o.createElementVNode(
                        "select",
                        {
                          id: "mode-select",
                          "onUpdate:modelValue":
                            m[1] || (m[1] = (g) => (e.value = g)),
                        },
                        un,
                        512,
                      ),
                      [[o.vModelSelect, e.value]],
                    ),
                  ]),
                  o.createVNode(
                    Ks,
                    {
                      options: [
                        { value: 1, label: "Time Option 2", unit: "Min." },
                        { value: 1.5, label: "Time Option 1", unit: "Min." },
                      ],
                      "option-name": "Time per Question",
                      class: o.normalizeClass(
                        e.value === "Timed" ? "" : "input-disabled",
                      ),
                      disabled: e.value !== "Timed",
                    },
                    null,
                    8,
                    ["class", "disabled"],
                  ),
                ]),
              ]),
              o.createElementVNode(
                "button",
                { class: "start-button", onClick: l },
                "Start",
              ),
            ])
          );
        },
      }),
      [["__scopeId", "data-v-c3d686ea"]],
    ),
    fn = (s) => s.trim().toLowerCase().replace("_", " "),
    mn = (s) =>
      s.reduce((t, n) => {
        if (!n.includes(":")) return t;
        let [e, i] = n.split(":");
        return (
          ([e, i] = [e.trim().toLowerCase(), fn(i)]),
          t[e] ? (t[e] = [...t[e], i]) : (t[e] = [i]),
          t
        );
      }, {}),
    ie = {
      convertQuestions: (s) =>
        s.map((t) => ({
          _id: { $oid: t._id.$oid },
          statement: t.statement,
          tags: mn(t.tags),
          optionsList: t.optionsList,
          link: t.link,
          attempts: t.attempts,
          correctAttempts: t.correctAttempts,
          lastAttempted: t.lastAttempted,
        })),
    },
    hn = [
      {
        tags: [
          "course:vets2011",
          "course:vets2011",
          "subject:physiology",
          "system:nervous_system",
          "234:tagvalue",
          "  @#:wr ",
        ],
        statement:
          "<p>Which part of a neuron receives information from surrounding cells?</p>",
        optionsList: [
          {
            optionValue: "<p>Axon</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>Presynaptic terminal</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>Cell body</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>Dendrite</p>",
            optionCorrect: !0,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>Myelin</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
        ],
        _id: {
          $oid: "6625c7c8c8259deb8c3af39b",
          attempts: 0,
          correctAttempts: 0,
          lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
        },
        label: "Placeholder label 1",
        link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd",
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
      },
      {
        tags: [
          "course: VETS2012",
          "course:vets2016",
          "subject: Physiology",
          "system: Nervous System",
        ],
        statement:
          "<p>Which of the following statements regarding action potentials is TRUE?</p>",
        optionsList: [
          {
            optionValue:
              "<p>Multiple depolarising events minimises the chance of action potential generation</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue:
              "<p>Reaching the subthreshold level does not stimulate the post-synaptic membrane</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>Threshold event generates an action potential</p>",
            optionCorrect: !0,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue:
              "<p>Reaching the subthreshold level is enough to generate an action potential</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue:
              "<p>Depolarised synaptic membrane is more negative than the hyperpolarised membrane</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
        ],
        _id: {
          $oid: "6615c7fb49fbda0108a9ac0b",
          attempts: 0,
          correctAttempts: 0,
          lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
        },
        label: "Placeholder label 1",
        link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03",
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
      },
      {
        tags: ["course:vets2012", "subject:physiology", "animal:horse"],
        statement:
          "<p>Action potentials are transmitted along which part of a neuron?</p>",
        optionsList: [
          {
            optionValue: "<p>The membrane is more depolarised</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>The effect of the subthreshold is enhanced</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>Action potential is reached</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>A threshold event takes place</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>The membrane is hyperpolarised</p>",
            optionCorrect: !0,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
        ],
        _id: {
          $oid: "6615c7fb49fbda0108a9ac0a",
          attempts: 0,
          correctAttempts: 0,
          lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
        },
        label: "Placeholder label 1",
        link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03",
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
      },
      {
        tags: ["course:vets2012", "subject:physiology", "animal:horse"],
        statement:
          "<p>Which of the following would NOT be possible occurrences when signal build-up occurs?</p>",
        optionsList: [
          {
            optionValue:
              "<p>They can reach action potential as a result of EPSP</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>IPSP can hyperpolarise the membrane</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue:
              "<p>They can reach action potential as a result of IPSP</p>",
            optionCorrect: !0,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue:
              "<p>An action potential will be reached if the number of EPSP &gt; IPSP</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
        ],
        _id: {
          $oid: "6615c7fb49fbda0108a9ac0d",
          attempts: 0,
          correctAttempts: 0,
          lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
        },
        label: "Placeholder label 1",
        link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03",
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
      },
      {
        tags: ["course: VETS2012", "subject:Physiology", "animal:dog"],
        statement:
          "<p>When is it impossible to generate an action potential?</p>",
        optionsList: [
          {
            optionValue: "<p>Absolute refractory period</p>",
            optionCorrect: !0,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>Relative refractory period</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>Sodium conductance</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>EPSPs after IPSPs</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>Hyperpolarised state</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
        ],
        _id: {
          $oid: "6615c7fb49fbda0108a9ac0f",
          attempts: 0,
          correctAttempts: 0,
          lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
        },
        label: "Placeholder label 1",
        link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03",
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
      },
      {
        tags: ["course: VETS2013", "course:vets2016", "subject:Physiology"],
        statement:
          "<p>Which of the following types of glial cells myelinate neurons in the peripheral nervous system?</p>",
        optionsList: [
          {
            optionValue: "<p>Ependymal cells</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>Schwann cells</p>",
            optionCorrect: !0,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>Muller cells</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>Oligodendrocytes</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
        ],
        _id: {
          $oid: "6615c7fb49fbda0108a9ac11",
          attempts: 0,
          correctAttempts: 0,
          lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
        },
        label: "Placeholder label 1",
        link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214413464c71f1df2110d07",
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
      },
      {
        tags: ["course: VETS2012", "subject:Atonomy", "animal:Horse"],
        statement:
          "<p>Which of the following is an attribute of ependymal cells?</p>",
        optionsList: [
          {
            optionValue: "<p>Repair processes</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>Cerebrospinal fluid synthesis</p>",
            optionCorrect: !0,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>Delivering nutrients</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>Recycling of neurotransmitters</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>Maintenance of terminal environment</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
        ],
        _id: {
          $oid: "6615c7fb49fbda0108a9ac10",
          attempts: 0,
          correctAttempts: 0,
          lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
        },
        label: "Placeholder label 1",
        link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214413464c71f1df2110d07",
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
      },
      {
        tags: ["course: VETS2013", "subject:Physiology", "animal:cat"],
        statement:
          "<p>Depending on the pre-synaptic neurotransmitter released and the post-synaptic receptor activated, the post-synaptic membrane can either be depolarised or hyperpolarised. Which of the following statements is FALSE?</p>",
        optionsList: [
          {
            optionValue:
              "<p>Neurotransmitter binding to metabotropic receptors causes a conformational change in pore proteins</p>",
            optionCorrect: !0,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue:
              "The action of metabotropic receptors is slower than ionotropic receptors",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue:
              "Neurotransmitter binding to metabotropic receptors causes a conformational change, activating a signal transduction pathway",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue:
              "An example of an ionotropic receptor is the nicotinic acetylcholine receptor",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
        ],
        _id: {
          $oid: "6539c0bdeb2b18699ed86faa",
          attempts: 0,
          correctAttempts: 0,
          lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
        },
        label: "Placeholder label 1",
        link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d5a64c71f1df2110d16",
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
      },
      {
        tags: ["course: VETS2012", "subject:Physiology", "animal:Horse"],
        statement:
          "Nicotine (mimics acetylcholine) can bind to nicotinic cholinergic receptors. You would expect the response on the post-synaptic membrane to be:",
        optionsList: [
          {
            optionValue: "Excitation due to opening of chloride channels",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "Hyperpolarisation due to blocking of sodium channels",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue:
              "Hyperpolarisation due to opening of chloride channels",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "Excitation due to opening of sodium channels",
            optionCorrect: !0,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
        ],
        _id: {
          $oid: "6539c0bdeb2b18699ed86fac",
          attempts: 0,
          correctAttempts: 0,
          lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
        },
        label: "Placeholder label 1",
        link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d5a64c71f1df2110d16",
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
      },
      {
        tags: ["course: VETS2012", "subject:Physiology", "animal:Horse"],
        statement:
          "&gamma;-aminobutyric acid (GABA) is a rapidly acting neurotransmitter. You would expect the response on the post-synaptic membrane to be:",
        optionsList: [
          {
            optionValue: "Excitation due to opening of chloride channels",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "Hyperpolarisation due to blocking of sodium channels",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue:
              "Hyperpolarisation due to opening of chloride channels",
            optionCorrect: !0,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "Excitation due to opening of sodium channels",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
        ],
        _id: {
          $oid: "6539c0bdeb2b18699ed86fab",
          attempts: 0,
          correctAttempts: 0,
          lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
        },
        label: "Placeholder label 1",
        link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d5a64c71f1df2110d16",
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
      },
      {
        tags: ["course: VETS2012", "subject:Physiology", "animal:Horse"],
        statement:
          "<p>At the neuromuscular junction, Ca<sup>2+</sup>&nbsp;ions are necessary for:</p>",
        optionsList: [
          {
            optionValue:
              "<p>Binding the transmitter with the post-synaptic receptor</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue:
              "<p>Facilitating diffusion of the transmitter to the post-synaptic membrane</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue:
              "<p>Splitting the neurotransmitter in the synaptic cleft, deactivating the transmitter</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue:
              "<p>Fusing the pre-synaptic vesicle with the pre-synaptic membrane, thus releasing the transmitter</p>",
            optionCorrect: !0,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue:
              "<p>Metabolising the transmitter within the pre-synaptic vesicle</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
        ],
        _id: {
          $oid: "6539c0bdeb2b18699ed86fae",
          attempts: 0,
          correctAttempts: 0,
          lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
        },
        label: "Placeholder label 1",
        link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d7064c71f1df2110d17",
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
      },
      {
        tags: ["course: VETS2012", "subject:Physiology", "animal:Horse"],
        statement:
          "<p>Which of the following statements is TRUE with regard to the termination of the synaptic action at the neuromuscular junction?</p>",
        optionsList: [
          {
            optionValue:
              "<p>The re-uptake of intact acetylcholine molecules into the motor neuron terminal is responsible</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue:
              "<p>Diffusion of acetylcholine away from the synapse is solely responsible</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue:
              "<p>Acetylcholinesterase rapidly breaks down acetylcholine into choline and acetate</p>",
            optionCorrect: !0,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue:
              "<p>Dissociation of acetylcholine from the muscarinic receptor, after binding for several seconds, is solely responsible</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
        ],
        _id: {
          $oid: "6539c0bdeb2b18699ed86fad",
          attempts: 0,
          correctAttempts: 0,
          lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
        },
        label: "Placeholder label 1",
        link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d7064c71f1df2110d17",
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
      },
      {
        tags: ["course: VETS2012", "subject:Physiology", "animal:Horse"],
        statement:
          "<p>Which part of a neuron receives information from surrounding cells?</p>",
        optionsList: [
          {
            optionValue: "<p>Axon</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>Presynaptic terminal</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>Cell body</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>Dendrite</p>",
            optionCorrect: !0,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
          {
            optionValue: "<p>Myelin</p>",
            optionCorrect: !1,
            attempts: 0,
            correctAttempts: 0,
            lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
          },
        ],
        _id: {
          $oid: "6615c7fb49fbda0108a9ac06",
          attempts: 0,
          correctAttempts: 0,
          lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
        },
        label: "Placeholder label 1",
        link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd",
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
      },
    ],
    D = {
      isString: (a) => typeof a == "string",
      isObject: (a) => typeof a == "object" && a !== null,
      isBoolean: (a) => typeof a == "boolean",
      isArray: (a, c) => Array.isArray(a) && a.every(c),
      isNumber: (a) => typeof a == "number",
      isFunction: (a) => typeof a == "function",
    };
  function Et(s) {
    const t = s.includes(":") && s.split(":").length === 2,
      n = !s.includes(":") && !s.includes(" ");
    return t || n;
  }
  function re(s, t = !1) {
    return D.isArray(s, D.isString) ? (t ? s.every(Et) : s.some(Et)) : !1;
  }
  function gn(s) {
    return (
      D.isObject(s) &&
      D.isString(s.optionValue) &&
      (s.optionCorrect === void 0 || D.isBoolean(s.optionCorrect))
    );
  }
  function ae(s) {
    return (
      D.isObject(s) &&
      D.isObject(s._id) &&
      D.isString(s._id.$oid) &&
      D.isString(s.statement) &&
      re(s.tags) &&
      D.isArray(s.optionsList, gn) &&
      D.isString(s.link)
    );
  }
  function _n(s) {
    return D.isArray(s, ae);
  }
  const ut = {
      isMCQuestion: ae,
      isMCQuestionArray: _n,
      validateTags: re,
      isTag: Et,
    },
    bn = (s) => {
      try {
        if (!s)
          throw new Error("No question data found. Please Try again later.");
        return ie.convertQuestions(ce(s));
      } catch (t) {
        return alert(t), [];
      }
    },
    yn = () => hn,
    wn = () => {
      const s = yn();
      return ie.convertQuestions(ce(s));
    };
  function ce(s) {
    ut.isMCQuestionArray(s)
      ? console.info(
          "%cAll questions are valid",
          "color: #00FF00",
          `
Total Questions Validated:`,
          s.length,
        )
      : console.warn(
          "%cWARNING: Some questions contains invalid structure",
          "color: #FF0000",
        );
    const t = { invalidTags: 0, noTags: 0, invalidQs: 0, totalTags: 0 },
      n = s.reduce((e, i) => {
        if (!ut.isMCQuestion(i)) return { ...e, invalidQs: e.invalidQs + 1 };
        let { tags: r } = i;
        if (!r || (Array.isArray(r) && !r.length))
          return { ...e, noTags: e.noTags + 1 };
        const a = e.totalTags + r.length;
        if (!ut.validateTags(r, !0)) {
          const c = r.filter((u) => ut.isTag(u)),
            l = e.invalidTags + r.length - c.length;
          return (r = c), { ...e, invalidTags: l, totalTags: a };
        }
        return { ...e, totalTags: a };
      }, t);
    return An(n, s.length), s;
  }
  function kt(s, t) {
    s && console.warn(t, "color: #FF0000");
  }
  function An(s, t) {
    const { invalidQs: n, invalidTags: e, noTags: i, totalTags: r } = s;
    kt(n, `Invalid Questions Received: %c${n} out of ${t}`),
      kt(e, `Filtering out invalid tags: %c${e} out of ${r}`),
      kt(i, `Questions with no tags: %c${i}`);
  }
  const le = o.defineComponent({
      __name: "CrucibleComponent",
      props: { level: { type: Number, default: 5 } },
      setup(s) {
        const t = s,
          n = o.ref(0),
          e = P(),
          i = o.ref(!1),
          r = o.ref([]),
          a = o.inject("$dataLink"),
          { level: c } = o.toRefs(t);
        o.onBeforeMount(async () => {
          if (a) {
            const m = await (async () =>
              (await (await fetch(`${a}?level=${c.value}`)).json())
                .questions)();
            r.value = bn(m);
          } else r.value = wn();
          e.allQs = r.value;
          const u = te(r.value.map((p) => p.tags));
          e.setselectedTags(
            Object.keys(u).reduce((p, m) => ({ ...p, [m]: [] }), {}),
          ),
            e.setTagSet();
        });
        const l = ({ questionAmount: u, mode: p }) => {
          const m = e.getselectedtags();
          if (!r.value.length)
            return alert("Trouble fetching questions, please try again later");
          const g = St(r.value, m),
            y = hs(u, g);
          (n.value = y.length),
            e.initialiseQuiz(y, p),
            p === "Timed" && e.setTimeLimit(u * e.timeLimit),
            (i.value = !0);
        };
        return (u, p) =>
          i.value && o.unref(e).quizMode === "Tutor"
            ? (o.openBlock(), o.createBlock(qs, { key: 0 }))
            : i.value && o.unref(e).quizMode === "Timed"
              ? (o.openBlock(), o.createBlock(Rs, { key: 1 }))
              : (o.openBlock(), o.createBlock(pn, { key: 2, onStartQuiz: l }));
      },
    }),
    ue = {
      data: {
        questions: [
          {
            _id: { $oid: "6625c7c8c8259deb8c3af39e" },
            statement: "",
            tags: [""],
            optionsList: { optionValue: "", optionCorrect: !1 },
            link: "",
          },
        ],
      },
    },
    vt = async (s, t) => {};
  function Tn(s, t = {}) {
    const n = Oe();
    s.use(n),
      s.component("CrucibleComponent", le),
      s.provide("$dataLink", t.dataLink || ue),
      s.provide("$updateQAttemptCallback", t.updateQAttemptCallback || vt);
  }
  (v.CrucibleComponent = le),
    (v.createViewerPlugin = Tn),
    (v.defaultData = ue),
    (v.defaultUpdateQAttemptCallback = vt),
    Object.defineProperty(v, Symbol.toStringTag, { value: "Module" });
});
