import { effectScope as Fe, ref as E, markRaw as G, hasInjectionContext as Tt, inject as $e, getCurrentInstance as wt, toRaw as _e, watch as Be, reactive as Ct, isRef as ae, isReactive as Ve, toRef as ye, nextTick as Ae, computed as qe, unref as S, getCurrentScope as Et, onScopeDispose as kt, toRefs as Le, defineComponent as N, openBlock as h, createElementBlock as _, Fragment as U, normalizeClass as H, createElementVNode as f, toDisplayString as Q, renderList as ee, createVNode as te, createBlock as j, createCommentVNode as O, pushScopeId as We, popScopeId as Ge, onMounted as Oe, resolveComponent as Qt, onBeforeMount as Je, createTextVNode as Ye, watchEffect as $t, withDirectives as xe, vModelText as Vt, vModelSelect as qt } from "vue";
var Ke = !1;
function pe(e, n, o) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, n), e.splice(n, 1, o), o) : (e[n] = o, o);
}
function Se(e, n) {
  if (Array.isArray(e)) {
    e.splice(n, 1);
    return;
  }
  delete e[n];
}
function Ot() {
  return Xe().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Xe() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Nt = typeof Proxy == "function", Pt = "devtools-plugin:setup", It = "plugin:settings:set";
let K, we;
function At() {
  var e;
  return K !== void 0 || (typeof window < "u" && window.performance ? (K = !0, we = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (K = !0, we = globalThis.perf_hooks.performance) : K = !1), K;
}
function Lt() {
  return At() ? we.now() : Date.now();
}
class xt {
  constructor(n, o) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = n, this.hook = o;
    const t = {};
    if (n.settings)
      for (const r in n.settings) {
        const c = n.settings[r];
        t[r] = c.defaultValue;
      }
    const s = `__vue-devtools-plugin-settings__${n.id}`;
    let i = Object.assign({}, t);
    try {
      const r = localStorage.getItem(s), c = JSON.parse(r);
      Object.assign(i, c);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return i;
      },
      setSettings(r) {
        try {
          localStorage.setItem(s, JSON.stringify(r));
        } catch {
        }
        i = r;
      },
      now() {
        return Lt();
      }
    }, o && o.on(It, (r, c) => {
      r === this.plugin.id && this.fallbacks.setSettings(c);
    }), this.proxiedOn = new Proxy({}, {
      get: (r, c) => this.target ? this.target.on[c] : (...a) => {
        this.onQueue.push({
          method: c,
          args: a
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (r, c) => this.target ? this.target[c] : c === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(c) ? (...a) => (this.targetQueue.push({
        method: c,
        args: a,
        resolve: () => {
        }
      }), this.fallbacks[c](...a)) : (...a) => new Promise((u) => {
        this.targetQueue.push({
          method: c,
          args: a,
          resolve: u
        });
      })
    });
  }
  async setRealTarget(n) {
    this.target = n;
    for (const o of this.onQueue)
      this.target.on[o.method](...o.args);
    for (const o of this.targetQueue)
      o.resolve(await this.target[o.method](...o.args));
  }
}
function Ze(e, n) {
  const o = e, t = Xe(), s = Ot(), i = Nt && o.enableEarlyProxy;
  if (s && (t.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    s.emit(Pt, e, n);
  else {
    const r = i ? new xt(o, s) : null;
    (t.__VUE_DEVTOOLS_PLUGINS__ = t.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: o,
      setupFn: n,
      proxy: r
    }), r && n(r.proxiedTarget);
  }
}
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let ie;
const ce = (e) => ie = e, et = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function J(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var D;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(D || (D = {}));
const ve = typeof window < "u", re = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && ve, Me = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function Mt(e, { autoBom: n = !1 } = {}) {
  return n && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Ne(e, n, o) {
  const t = new XMLHttpRequest();
  t.open("GET", e), t.responseType = "blob", t.onload = function() {
    nt(t.response, n, o);
  }, t.onerror = function() {
    console.error("could not download file");
  }, t.send();
}
function tt(e) {
  const n = new XMLHttpRequest();
  n.open("HEAD", e, !1);
  try {
    n.send();
  } catch {
  }
  return n.status >= 200 && n.status <= 299;
}
function he(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const o = document.createEvent("MouseEvents");
    o.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(o);
  }
}
const me = typeof navigator == "object" ? navigator : { userAgent: "" }, ot = /Macintosh/.test(me.userAgent) && /AppleWebKit/.test(me.userAgent) && !/Safari/.test(me.userAgent), nt = ve ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !ot ? jt : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in me ? Dt : (
      // Fallback to using FileReader and a popup
      zt
    )
  )
) : () => {
};
function jt(e, n = "download", o) {
  const t = document.createElement("a");
  t.download = n, t.rel = "noopener", typeof e == "string" ? (t.href = e, t.origin !== location.origin ? tt(t.href) ? Ne(e, n, o) : (t.target = "_blank", he(t)) : he(t)) : (t.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(t.href);
  }, 4e4), setTimeout(function() {
    he(t);
  }, 0));
}
function Dt(e, n = "download", o) {
  if (typeof e == "string")
    if (tt(e))
      Ne(e, n, o);
    else {
      const t = document.createElement("a");
      t.href = e, t.target = "_blank", setTimeout(function() {
        he(t);
      });
    }
  else
    navigator.msSaveOrOpenBlob(Mt(e, o), n);
}
function zt(e, n, o, t) {
  if (t = t || open("", "_blank"), t && (t.document.title = t.document.body.innerText = "downloading..."), typeof e == "string")
    return Ne(e, n, o);
  const s = e.type === "application/octet-stream", i = /constructor/i.test(String(Me.HTMLElement)) || "safari" in Me, r = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((r || s && i || ot) && typeof FileReader < "u") {
    const c = new FileReader();
    c.onloadend = function() {
      let a = c.result;
      if (typeof a != "string")
        throw t = null, new Error("Wrong reader.result type");
      a = r ? a : a.replace(/^data:[^;]*;/, "data:attachment/file;"), t ? t.location.href = a : location.assign(a), t = null;
    }, c.readAsDataURL(e);
  } else {
    const c = URL.createObjectURL(e);
    t ? t.location.assign(c) : location.href = c, t = null, setTimeout(function() {
      URL.revokeObjectURL(c);
    }, 4e4);
  }
}
function k(e, n) {
  const o = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(o, n) : n === "error" ? console.error(o) : n === "warn" ? console.warn(o) : console.log(o);
}
function Pe(e) {
  return "_a" in e && "install" in e;
}
function st() {
  if (!("clipboard" in navigator))
    return k("Your browser doesn't support the Clipboard API", "error"), !0;
}
function it(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (k('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Rt(e) {
  if (!st())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), k("Global state copied to clipboard.");
    } catch (n) {
      if (it(n))
        return;
      k("Failed to serialize the state. Check the console for more details.", "error"), console.error(n);
    }
}
async function Ut(e) {
  if (!st())
    try {
      rt(e, JSON.parse(await navigator.clipboard.readText())), k("Global state pasted from clipboard.");
    } catch (n) {
      if (it(n))
        return;
      k("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(n);
    }
}
async function Ht(e) {
  try {
    nt(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (n) {
    k("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(n);
  }
}
let R;
function Ft() {
  R || (R = document.createElement("input"), R.type = "file", R.accept = ".json");
  function e() {
    return new Promise((n, o) => {
      R.onchange = async () => {
        const t = R.files;
        if (!t)
          return n(null);
        const s = t.item(0);
        return n(s ? { text: await s.text(), file: s } : null);
      }, R.oncancel = () => n(null), R.onerror = o, R.click();
    });
  }
  return e;
}
async function Bt(e) {
  try {
    const o = await Ft()();
    if (!o)
      return;
    const { text: t, file: s } = o;
    rt(e, JSON.parse(t)), k(`Global state imported from "${s.name}".`);
  } catch (n) {
    k("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(n);
  }
}
function rt(e, n) {
  for (const o in n) {
    const t = e.state.value[o];
    t ? Object.assign(t, n[o]) : e.state.value[o] = n[o];
  }
}
function x(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const at = "🍍 Pinia (root)", Ce = "_root";
function Wt(e) {
  return Pe(e) ? {
    id: Ce,
    label: at
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Gt(e) {
  if (Pe(e)) {
    const o = Array.from(e._s.keys()), t = e._s;
    return {
      state: o.map((i) => ({
        editable: !0,
        key: i,
        value: e.state.value[i]
      })),
      getters: o.filter((i) => t.get(i)._getters).map((i) => {
        const r = t.get(i);
        return {
          editable: !1,
          key: i,
          value: r._getters.reduce((c, a) => (c[a] = r[a], c), {})
        };
      })
    };
  }
  const n = {
    state: Object.keys(e.$state).map((o) => ({
      editable: !0,
      key: o,
      value: e.$state[o]
    }))
  };
  return e._getters && e._getters.length && (n.getters = e._getters.map((o) => ({
    editable: !1,
    key: o,
    value: e[o]
  }))), e._customProperties.size && (n.customProperties = Array.from(e._customProperties).map((o) => ({
    editable: !0,
    key: o,
    value: e[o]
  }))), n;
}
function Jt(e) {
  return e ? Array.isArray(e) ? e.reduce((n, o) => (n.keys.push(o.key), n.operations.push(o.type), n.oldValue[o.key] = o.oldValue, n.newValue[o.key] = o.newValue, n), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: x(e.type),
    key: x(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function Yt(e) {
  switch (e) {
    case D.direct:
      return "mutation";
    case D.patchFunction:
      return "$patch";
    case D.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let Z = !0;
const ge = [], W = "pinia:mutations", $ = "pinia", { assign: Kt } = Object, be = (e) => "🍍 " + e;
function Xt(e, n) {
  Ze({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: ge,
    app: e
  }, (o) => {
    typeof o.now != "function" && k("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), o.addTimelineLayer({
      id: W,
      label: "Pinia 🍍",
      color: 15064968
    }), o.addInspector({
      id: $,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            Rt(n);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await Ut(n), o.sendInspectorTree($), o.sendInspectorState($);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            Ht(n);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Bt(n), o.sendInspectorTree($), o.sendInspectorState($);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (t) => {
            const s = n._s.get(t);
            s ? typeof s.$reset != "function" ? k(`Cannot reset "${t}" store because it doesn't have a "$reset" method implemented.`, "warn") : (s.$reset(), k(`Store "${t}" reset.`)) : k(`Cannot reset "${t}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), o.on.inspectComponent((t, s) => {
      const i = t.componentInstance && t.componentInstance.proxy;
      if (i && i._pStores) {
        const r = t.componentInstance.proxy._pStores;
        Object.values(r).forEach((c) => {
          t.instanceData.state.push({
            type: be(c.$id),
            key: "state",
            editable: !0,
            value: c._isOptionsAPI ? {
              _custom: {
                value: _e(c.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => c.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(c.$state).reduce((a, u) => (a[u] = c.$state[u], a), {})
            )
          }), c._getters && c._getters.length && t.instanceData.state.push({
            type: be(c.$id),
            key: "getters",
            editable: !1,
            value: c._getters.reduce((a, u) => {
              try {
                a[u] = c[u];
              } catch (m) {
                a[u] = m;
              }
              return a;
            }, {})
          });
        });
      }
    }), o.on.getInspectorTree((t) => {
      if (t.app === e && t.inspectorId === $) {
        let s = [n];
        s = s.concat(Array.from(n._s.values())), t.rootNodes = (t.filter ? s.filter((i) => "$id" in i ? i.$id.toLowerCase().includes(t.filter.toLowerCase()) : at.toLowerCase().includes(t.filter.toLowerCase())) : s).map(Wt);
      }
    }), o.on.getInspectorState((t) => {
      if (t.app === e && t.inspectorId === $) {
        const s = t.nodeId === Ce ? n : n._s.get(t.nodeId);
        if (!s)
          return;
        s && (t.state = Gt(s));
      }
    }), o.on.editInspectorState((t, s) => {
      if (t.app === e && t.inspectorId === $) {
        const i = t.nodeId === Ce ? n : n._s.get(t.nodeId);
        if (!i)
          return k(`store "${t.nodeId}" not found`, "error");
        const { path: r } = t;
        Pe(i) ? r.unshift("state") : (r.length !== 1 || !i._customProperties.has(r[0]) || r[0] in i.$state) && r.unshift("$state"), Z = !1, t.set(i, r, t.state.value), Z = !0;
      }
    }), o.on.editComponentState((t) => {
      if (t.type.startsWith("🍍")) {
        const s = t.type.replace(/^🍍\s*/, ""), i = n._s.get(s);
        if (!i)
          return k(`store "${s}" not found`, "error");
        const { path: r } = t;
        if (r[0] !== "state")
          return k(`Invalid path for store "${s}":
${r}
Only state can be modified.`);
        r[0] = "$state", Z = !1, t.set(i, r, t.state.value), Z = !0;
      }
    });
  });
}
function Zt(e, n) {
  ge.includes(be(n.$id)) || ge.push(be(n.$id)), Ze({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: ge,
    app: e,
    settings: {
      logStoreChanges: {
        label: "Notify about new/deleted stores",
        type: "boolean",
        defaultValue: !0
      }
      // useEmojis: {
      //   label: 'Use emojis in messages ⚡️',
      //   type: 'boolean',
      //   defaultValue: true,
      // },
    }
  }, (o) => {
    const t = typeof o.now == "function" ? o.now.bind(o) : Date.now;
    n.$onAction(({ after: r, onError: c, name: a, args: u }) => {
      const m = ct++;
      o.addTimelineEvent({
        layerId: W,
        event: {
          time: t(),
          title: "🛫 " + a,
          subtitle: "start",
          data: {
            store: x(n.$id),
            action: x(a),
            args: u
          },
          groupId: m
        }
      }), r((p) => {
        B = void 0, o.addTimelineEvent({
          layerId: W,
          event: {
            time: t(),
            title: "🛬 " + a,
            subtitle: "end",
            data: {
              store: x(n.$id),
              action: x(a),
              args: u,
              result: p
            },
            groupId: m
          }
        });
      }), c((p) => {
        B = void 0, o.addTimelineEvent({
          layerId: W,
          event: {
            time: t(),
            logType: "error",
            title: "💥 " + a,
            subtitle: "end",
            data: {
              store: x(n.$id),
              action: x(a),
              args: u,
              error: p
            },
            groupId: m
          }
        });
      });
    }, !0), n._customProperties.forEach((r) => {
      Be(() => S(n[r]), (c, a) => {
        o.notifyComponentUpdate(), o.sendInspectorState($), Z && o.addTimelineEvent({
          layerId: W,
          event: {
            time: t(),
            title: "Change",
            subtitle: r,
            data: {
              newValue: c,
              oldValue: a
            },
            groupId: B
          }
        });
      }, { deep: !0 });
    }), n.$subscribe(({ events: r, type: c }, a) => {
      if (o.notifyComponentUpdate(), o.sendInspectorState($), !Z)
        return;
      const u = {
        time: t(),
        title: Yt(c),
        data: Kt({ store: x(n.$id) }, Jt(r)),
        groupId: B
      };
      c === D.patchFunction ? u.subtitle = "⤵️" : c === D.patchObject ? u.subtitle = "🧩" : r && !Array.isArray(r) && (u.subtitle = r.type), r && (u.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: r
        }
      }), o.addTimelineEvent({
        layerId: W,
        event: u
      });
    }, { detached: !0, flush: "sync" });
    const s = n._hotUpdate;
    n._hotUpdate = G((r) => {
      s(r), o.addTimelineEvent({
        layerId: W,
        event: {
          time: t(),
          title: "🔥 " + n.$id,
          subtitle: "HMR update",
          data: {
            store: x(n.$id),
            info: x("HMR update")
          }
        }
      }), o.notifyComponentUpdate(), o.sendInspectorTree($), o.sendInspectorState($);
    });
    const { $dispose: i } = n;
    n.$dispose = () => {
      i(), o.notifyComponentUpdate(), o.sendInspectorTree($), o.sendInspectorState($), o.getSettings().logStoreChanges && k(`Disposed "${n.$id}" store 🗑`);
    }, o.notifyComponentUpdate(), o.sendInspectorTree($), o.sendInspectorState($), o.getSettings().logStoreChanges && k(`"${n.$id}" store installed 🆕`);
  });
}
let ct = 0, B;
function je(e, n, o) {
  const t = n.reduce((s, i) => (s[i] = _e(e)[i], s), {});
  for (const s in t)
    e[s] = function() {
      const i = ct, r = o ? new Proxy(e, {
        get(...a) {
          return B = i, Reflect.get(...a);
        },
        set(...a) {
          return B = i, Reflect.set(...a);
        }
      }) : e;
      B = i;
      const c = t[s].apply(r, arguments);
      return B = void 0, c;
    };
}
function eo({ app: e, store: n, options: o }) {
  if (n.$id.startsWith("__hot:"))
    return;
  n._isOptionsAPI = !!o.state, je(n, Object.keys(o.actions), n._isOptionsAPI);
  const t = n._hotUpdate;
  _e(n)._hotUpdate = function(s) {
    t.apply(this, arguments), je(n, Object.keys(s._hmrPayload.actions), !!n._isOptionsAPI);
  }, Zt(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    n
  );
}
function to() {
  const e = Fe(!0), n = e.run(() => E({}));
  let o = [], t = [];
  const s = G({
    install(i) {
      ce(s), s._a = i, i.provide(et, s), i.config.globalProperties.$pinia = s, re && Xt(i, s), t.forEach((r) => o.push(r)), t = [];
    },
    use(i) {
      return !this._a && !Ke ? t.push(i) : o.push(i), this;
    },
    _p: o,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: n
  });
  return re && typeof Proxy < "u" && s.use(eo), s;
}
function ut(e, n) {
  for (const o in n) {
    const t = n[o];
    if (!(o in e))
      continue;
    const s = e[o];
    J(s) && J(t) && !ae(t) && !Ve(t) ? e[o] = ut(s, t) : e[o] = t;
  }
  return e;
}
const lt = () => {
};
function De(e, n, o, t = lt) {
  e.push(n);
  const s = () => {
    const i = e.indexOf(n);
    i > -1 && (e.splice(i, 1), t());
  };
  return !o && Et() && kt(s), s;
}
function X(e, ...n) {
  e.slice().forEach((o) => {
    o(...n);
  });
}
const oo = (e) => e();
function Ee(e, n) {
  e instanceof Map && n instanceof Map && n.forEach((o, t) => e.set(t, o)), e instanceof Set && n instanceof Set && n.forEach(e.add, e);
  for (const o in n) {
    if (!n.hasOwnProperty(o))
      continue;
    const t = n[o], s = e[o];
    J(s) && J(t) && e.hasOwnProperty(o) && !ae(t) && !Ve(t) ? e[o] = Ee(s, t) : e[o] = t;
  }
  return e;
}
const no = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function so(e) {
  return !J(e) || !e.hasOwnProperty(no);
}
const { assign: I } = Object;
function ze(e) {
  return !!(ae(e) && e.effect);
}
function Re(e, n, o, t) {
  const { state: s, actions: i, getters: r } = n, c = o.state.value[e];
  let a;
  function u() {
    !c && (process.env.NODE_ENV === "production" || !t) && (o.state.value[e] = s ? s() : {});
    const m = process.env.NODE_ENV !== "production" && t ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Le(E(s ? s() : {}).value)
    ) : Le(o.state.value[e]);
    return I(m, i, Object.keys(r || {}).reduce((p, b) => (process.env.NODE_ENV !== "production" && b in m && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${b}" in store "${e}".`), p[b] = G(qe(() => {
      ce(o);
      const v = o._s.get(e);
      return r[b].call(v, v);
    })), p), {}));
  }
  return a = ke(e, u, n, o, t, !0), a;
}
function ke(e, n, o = {}, t, s, i) {
  let r;
  const c = I({ actions: {} }, o);
  if (process.env.NODE_ENV !== "production" && !t._e.active)
    throw new Error("Pinia destroyed");
  const a = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Ke && (a.onTrigger = (d) => {
    u ? v = d : u == !1 && !g._hotUpdating && (Array.isArray(v) ? v.push(d) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let u, m, p = [], b = [], v;
  const V = t.state.value[e];
  !i && !V && (process.env.NODE_ENV === "production" || !s) && (t.state.value[e] = {});
  const oe = E({});
  let le;
  function de(d) {
    let l;
    u = m = !1, process.env.NODE_ENV !== "production" && (v = []), typeof d == "function" ? (d(t.state.value[e]), l = {
      type: D.patchFunction,
      storeId: e,
      events: v
    }) : (Ee(t.state.value[e], d), l = {
      type: D.patchObject,
      payload: d,
      storeId: e,
      events: v
    });
    const y = le = Symbol();
    Ae().then(() => {
      le === y && (u = !0);
    }), m = !0, X(p, l, t.state.value[e]);
  }
  const T = i ? function() {
    const { state: l } = o, y = l ? l() : {};
    this.$patch((q) => {
      I(q, y);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : lt
  );
  function w() {
    r.stop(), p = [], b = [], t._s.delete(e);
  }
  function C(d, l) {
    return function() {
      ce(t);
      const y = Array.from(arguments), q = [], ne = [];
      function yt(P) {
        q.push(P);
      }
      function St(P) {
        ne.push(P);
      }
      X(b, {
        args: y,
        name: d,
        store: g,
        after: yt,
        onError: St
      });
      let se;
      try {
        se = l.apply(this && this.$id === e ? this : g, y);
      } catch (P) {
        throw X(ne, P), P;
      }
      return se instanceof Promise ? se.then((P) => (X(q, P), P)).catch((P) => (X(ne, P), Promise.reject(P))) : (X(q, se), se);
    };
  }
  const L = /* @__PURE__ */ G({
    actions: {},
    getters: {},
    state: [],
    hotState: oe
  }), Y = {
    _p: t,
    // _s: scope,
    $id: e,
    $onAction: De.bind(null, b),
    $patch: de,
    $reset: T,
    $subscribe(d, l = {}) {
      const y = De(p, d, l.detached, () => q()), q = r.run(() => Be(() => t.state.value[e], (ne) => {
        (l.flush === "sync" ? m : u) && d({
          storeId: e,
          type: D.direct,
          events: v
        }, ne);
      }, I({}, a, l)));
      return y;
    },
    $dispose: w
  }, g = Ct(process.env.NODE_ENV !== "production" || re ? I(
    {
      _hmrPayload: L,
      _customProperties: G(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    Y
    // must be added later
    // setupStore
  ) : Y);
  t._s.set(e, g);
  const F = (t._a && t._a.runWithContext || oo)(() => t._e.run(() => (r = Fe()).run(n)));
  for (const d in F) {
    const l = F[d];
    if (ae(l) && !ze(l) || Ve(l))
      process.env.NODE_ENV !== "production" && s ? pe(oe.value, d, ye(F, d)) : i || (V && so(l) && (ae(l) ? l.value = V[d] : Ee(l, V[d])), t.state.value[e][d] = l), process.env.NODE_ENV !== "production" && L.state.push(d);
    else if (typeof l == "function") {
      const y = process.env.NODE_ENV !== "production" && s ? l : C(d, l);
      F[d] = y, process.env.NODE_ENV !== "production" && (L.actions[d] = l), c.actions[d] = l;
    } else
      process.env.NODE_ENV !== "production" && ze(l) && (L.getters[d] = i ? (
        // @ts-expect-error
        o.getters[d]
      ) : l, ve && (F._getters || // @ts-expect-error: same
      (F._getters = G([]))).push(d));
  }
  if (I(g, F), I(_e(g), F), Object.defineProperty(g, "$state", {
    get: () => process.env.NODE_ENV !== "production" && s ? oe.value : t.state.value[e],
    set: (d) => {
      if (process.env.NODE_ENV !== "production" && s)
        throw new Error("cannot set hotState");
      de((l) => {
        I(l, d);
      });
    }
  }), process.env.NODE_ENV !== "production" && (g._hotUpdate = G((d) => {
    g._hotUpdating = !0, d._hmrPayload.state.forEach((l) => {
      if (l in g.$state) {
        const y = d.$state[l], q = g.$state[l];
        typeof y == "object" && J(y) && J(q) ? ut(y, q) : d.$state[l] = q;
      }
      pe(g, l, ye(d.$state, l));
    }), Object.keys(g.$state).forEach((l) => {
      l in d.$state || Se(g, l);
    }), u = !1, m = !1, t.state.value[e] = ye(d._hmrPayload, "hotState"), m = !0, Ae().then(() => {
      u = !0;
    });
    for (const l in d._hmrPayload.actions) {
      const y = d[l];
      pe(g, l, C(l, y));
    }
    for (const l in d._hmrPayload.getters) {
      const y = d._hmrPayload.getters[l], q = i ? (
        // special handling of options api
        qe(() => (ce(t), y.call(g, g)))
      ) : y;
      pe(g, l, q);
    }
    Object.keys(g._hmrPayload.getters).forEach((l) => {
      l in d._hmrPayload.getters || Se(g, l);
    }), Object.keys(g._hmrPayload.actions).forEach((l) => {
      l in d._hmrPayload.actions || Se(g, l);
    }), g._hmrPayload = d._hmrPayload, g._getters = d._getters, g._hotUpdating = !1;
  })), re) {
    const d = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((l) => {
      Object.defineProperty(g, l, I({ value: g[l] }, d));
    });
  }
  return t._p.forEach((d) => {
    if (re) {
      const l = r.run(() => d({
        store: g,
        app: t._a,
        pinia: t,
        options: c
      }));
      Object.keys(l || {}).forEach((y) => g._customProperties.add(y)), I(g, l);
    } else
      I(g, r.run(() => d({
        store: g,
        app: t._a,
        pinia: t,
        options: c
      })));
  }), process.env.NODE_ENV !== "production" && g.$state && typeof g.$state == "object" && typeof g.$state.constructor == "function" && !g.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${g.$id}".`), V && i && o.hydrate && o.hydrate(g.$state, V), u = !0, m = !0, g;
}
function io(e, n, o) {
  let t, s;
  const i = typeof n == "function";
  if (typeof e == "string")
    t = e, s = i ? o : n;
  else if (s = e, t = e.id, process.env.NODE_ENV !== "production" && typeof t != "string")
    throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
  function r(c, a) {
    const u = Tt();
    if (c = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && ie && ie._testing ? null : c) || (u ? $e(et, null) : null), c && ce(c), process.env.NODE_ENV !== "production" && !ie)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    c = ie, c._s.has(t) || (i ? ke(t, n, s, c) : Re(t, s, c), process.env.NODE_ENV !== "production" && (r._pinia = c));
    const m = c._s.get(t);
    if (process.env.NODE_ENV !== "production" && a) {
      const p = "__hot:" + t, b = i ? ke(p, n, s, c, !0) : Re(p, I({}, s), c, !0);
      a._hotUpdate(b), delete c.state.value[p], c._s.delete(p);
    }
    if (process.env.NODE_ENV !== "production" && ve) {
      const p = wt();
      if (p && p.proxy && // avoid adding stores that are just built for hot module replacement
      !a) {
        const b = p.proxy, v = "_pStores" in b ? b._pStores : b._pStores = {};
        v[t] = m;
      }
    }
    return m;
  }
  return r.$id = t, r;
}
const ro = ["id", "checked"], ao = ["for", "innerHTML"], co = /* @__PURE__ */ N({
  __name: "MCQOption",
  props: {
    optionKey: {},
    checked: { type: Boolean },
    option: {},
    submitted: { type: Boolean }
  },
  emits: ["selectOption"],
  setup(e, { emit: n }) {
    const o = n, t = () => o("selectOption");
    return (s, i) => (h(), _(U, null, [
      (h(), _("input", {
        id: "option-" + s.optionKey,
        key: s.optionKey,
        "test-id": "radio_options",
        type: "radio",
        name: "options",
        checked: s.checked,
        class: H(s.submitted && "ignore-hover")
      }, null, 10, ro)),
      (h(), _("label", {
        key: s.optionKey,
        for: "option-" + s.optionKey,
        class: H(s.submitted ? "mcq-option-label ignore-hover" : "mcq-option-label"),
        onClick: i[0] || (i[0] = (r) => t()),
        innerHTML: s.option.optionValue
      }, null, 10, ao))
    ], 64));
  }
}), M = (e, n) => {
  const o = e.__vccOpts || e;
  for (const [t, s] of n)
    o[t] = s;
  return o;
}, uo = /* @__PURE__ */ M(co, [["__scopeId", "data-v-fdbfedc6"]]), lo = ["disabled"], po = /* @__PURE__ */ N({
  __name: "MCQButton",
  props: {
    submitted: { type: Boolean },
    selectedOption: {},
    hideSkip: { type: Boolean }
  },
  emits: ["submitAnswer", "nextQuestion", "skipQuestion"],
  setup(e, { emit: n }) {
    const o = E("skip"), t = E("Skip"), s = n, i = (a, u) => {
      !a && u ? r("next", "Next", "submitAnswer") : a && u ? r("skip", "Skip", "nextQuestion") : !a && !u && r("skip", "Skip", "skipQuestion");
    }, r = (a, u, m) => {
      o.value = a, t.value = u, s(m);
    }, c = (a, u) => a && u ? { class: "next", text: "Next" } : !a && u ? { class: "submit", text: "Submit" } : { class: o.value, text: t.value };
    return (a, u) => (h(), _("div", null, [
      f("button", {
        disabled: a.hideSkip && c(a.submitted, a.selectedOption).class === "skip",
        class: H(["mcq-button", c(a.submitted, a.selectedOption).class]),
        onClick: u[0] || (u[0] = (m) => i(a.submitted, a.selectedOption))
      }, Q(c(a.submitted, a.selectedOption).text), 11, lo)
    ]));
  }
}), fo = /* @__PURE__ */ M(po, [["__scopeId", "data-v-847b8dd5"]]), ho = /* @__PURE__ */ N({
  __name: "NextButton",
  props: {
    buttonName: {}
  },
  emits: ["nextQuestion", "prevQuestion"],
  setup(e, { emit: n }) {
    const { buttonName: o } = e, t = n, s = () => {
      i(o !== "←" ? "nextQuestion" : "prevQuestion");
    }, i = (r) => {
      t(r);
    };
    return (r, c) => (h(), _("div", null, [
      f("button", {
        class: H(r.buttonName === "Submit" ? "submit_btn" : "mcq-button"),
        onClick: c[0] || (c[0] = (a) => s())
      }, Q(r.buttonName), 3)
    ]));
  }
}), Ue = /* @__PURE__ */ M(ho, [["__scopeId", "data-v-8be7f61e"]]), mo = (e) => {
  for (let n = e.length - 1; n > 0; n--) {
    const o = Math.floor(Math.random() * (n + 1));
    [e[n], e[o]] = [e[o], e[n]];
  }
  return e;
}, go = (e, n) => mo(n).slice(0, e);
function dt(e) {
  const n = e.reduce(
    (t, s) => (Object.keys(s).forEach((i) => {
      i.trim() !== "" && (t[i] || (t[i] = /* @__PURE__ */ new Set()), s[i].forEach((c) => t[i].add(c)));
    }), t),
    {}
  );
  return Object.keys(n).reduce(
    (t, s) => (t[s] = [...n[s]], t),
    {}
  );
}
function Ie(e, n) {
  return e.filter((o) => Object.keys(n).every((t) => {
    if (!n[t].length)
      return !0;
    const s = o.tags[t];
    if (s)
      return s.some((i) => n[t].includes(i));
  }));
}
function bo(e, n, o) {
  return e.filter((t) => {
    const s = t.tags[o];
    return s && s.includes(n);
  });
}
function _o(e, n, o) {
  const t = e[n].question.optionsList;
  for (let s = 0; s < t.length; s++)
    if (t[s].optionValue === o)
      return s;
}
const pt = (e, n) => n.findIndex((o) => {
  var t;
  return ((t = o.question._id) == null ? void 0 : t.$oid) === e;
}), z = io("questionsQueue", {
  state: () => ({
    allQs: [],
    questionsQueue: [],
    questionsStack: [],
    quizStats: [],
    quizMode: "Tutor",
    selectedTags: { course: [] },
    timeLimit: 60,
    // default time limit 1 min per qs
    AnsweredQuesiton: 0
  }),
  actions: {
    getAnsweredQuestionsNum() {
      return this.AnsweredQuesiton;
    },
    setAnsweredQuestionsNum() {
      this.AnsweredQuesiton = Math.min(
        this.AnsweredQuesiton + 1,
        this.quizStats.length
      );
    },
    getquestionnumber() {
      const e = this.allQs;
      return Ie(e, this.selectedTags).length;
    },
    setselectedTags(e) {
      this.selectedTags = e;
    },
    getselectedtags() {
      return this.selectedTags;
    },
    modifySelectedTags(e, { category: n, topic: o }) {
      this.selectedTags[n] && (this.selectedTags[n] = e ? [...this.selectedTags[n], o] : this.selectedTags[n].filter(
        (t) => t !== o
      ));
    },
    initialiseQuiz(e, n) {
      this.questionsQueue = e, this.questionsStack = [], this.quizMode = n, this.quizStats = e.map((o) => ({
        question: o,
        correct: 0,
        skipped: 0,
        attempts: 0,
        selectedValue: ""
      }));
    },
    incrementStat(e, n, o) {
      const t = pt(e, this.quizStats);
      if (this.quizStats[t]) {
        if (o !== void 0) {
          if (this.quizStats[t][n]++, o === "-1") {
            this.quizStats[t].selectedValue = "Reached Time Limit";
            return;
          }
          const s = this.quizStats[t].question.optionsList.map((i) => i.optionCorrect).indexOf(!0);
          console.log("question id", e), console.log(
            "is correct",
            Number(o) === Number(s)
          ), Number(o) === Number(s) ? this.quizStats[t].correct = 1 : this.quizStats[t].correct = 0;
        }
        this.quizStats[t].selectedValue = o !== void 0 ? this.quizStats[t].question.optionsList[Number(o)].optionValue : "";
      }
    },
    pushToHistoryStack(e) {
      this.questionsStack.push(e);
    },
    enqueueQuestion(e) {
      this.questionsQueue.push(e);
    },
    dequeueQuestion() {
      for (; this.questionsQueue.length > 0; ) {
        const e = this.questionsQueue.shift();
        return this.pushToHistoryStack(e), e;
      }
      return this.questionsQueue.shift();
    },
    removeFromLastHistory() {
      if (!(this.questionsStack.length < 1))
        return this.questionsQueue.unshift(this.questionsStack.pop()), this.questionsStack[this.questionsStack.length - 1];
    },
    getTimeLimit() {
      return this.timeLimit;
    },
    setTimeLimit(e) {
      this.timeLimit = e;
    },
    getRemainingQuestions() {
      return this.questionsQueue.length;
    }
  }
}), vo = ["innerHTML"], yo = { class: "mcq-list" }, So = ["onClick"], To = { class: "next-prev-question" }, wo = /* @__PURE__ */ N({
  __name: "MCQQuestion",
  props: {
    _id: {},
    statement: {},
    optionsList: {}
  },
  emits: ["nextQuestion", "skipQuestion", "prevQuestion"],
  setup(e, { emit: n }) {
    const o = z(), t = E(null), s = E(!1), i = n, r = E(o.getRemainingQuestions()), c = () => {
      s.value = !0;
    }, a = () => {
      t.value = null, i("nextQuestion");
    }, u = () => {
      b(), r.value = o.getRemainingQuestions(), i("nextQuestion");
    }, m = () => {
      b(), i("skipQuestion");
    }, p = (T) => o.incrementStat(
      T.$oid,
      "attempts",
      t.value ?? void 0
    ), b = () => {
      s.value = !1, t.value = null;
    }, v = () => {
      t.value = null, i("prevQuestion");
    }, V = (T, w) => {
      s.value || (t.value = t.value === w ? null : w), p(T);
    }, oe = (T, w, C) => o.quizMode === "Timed" ? le(T, w) : de(w, C);
    function le(T, w) {
      const C = pt(T.$oid, o.quizStats), L = o.quizStats[C].selectedValue, Y = _o(
        o.quizStats,
        C,
        L
      );
      return String(Y) === w ? (t.value = w, "selected") : "";
    }
    function de(T, w) {
      const C = w[parseInt(T)], L = t.value === T;
      return s.value ? C.optionCorrect ? "correct ignore-hover" : L ? "wrong ignore-hover" : "ignore-hover" : L ? "selected" : "";
    }
    return (T, w) => (h(), _(U, null, [
      f("div", {
        class: "mcq-statement",
        innerHTML: T.statement
      }, null, 8, vo),
      f("div", yo, [
        (h(!0), _(U, null, ee(Object.entries(T.optionsList), ([C, L]) => (h(), _("div", {
          key: C,
          class: H(["mcq-option", oe(T._id, C, T.optionsList)]),
          onClick: (Y) => V(T._id, C)
        }, [
          te(uo, {
            "option-key": C,
            checked: t.value === C,
            option: L,
            submitted: s.value,
            onSelectOption: (Y) => V(T._id, C)
          }, null, 8, ["option-key", "checked", "option", "submitted", "onSelectOption"])
        ], 10, So))), 128))
      ]),
      S(o).quizMode === "Tutor" ? (h(), j(fo, {
        key: 0,
        submitted: s.value,
        "selected-option": t.value,
        "hide-skip": r.value <= 1,
        onSubmitAnswer: c,
        onNextQuestion: w[0] || (w[0] = (C) => u()),
        onSkipQuestion: m
      }, null, 8, ["submitted", "selected-option", "hide-skip"])) : O("", !0),
      f("div", To, [
        S(o).quizMode === "Timed" ? (h(), j(Ue, {
          key: 0,
          "button-name": S(o).questionsQueue.length >= 1 ? "→" : "Submit",
          onNextQuestion: w[1] || (w[1] = (C) => a())
        }, null, 8, ["button-name"])) : O("", !0),
        S(o).quizMode === "Timed" && S(o).questionsStack.length > 1 ? (h(), j(Ue, {
          key: 1,
          "button-name": "←",
          onPrevQuestion: w[2] || (w[2] = (C) => v())
        })) : O("", !0)
      ])
    ], 64));
  }
}), ft = /* @__PURE__ */ M(wo, [["__scopeId", "data-v-9c642a04"]]), Co = (e) => (We("data-v-61b19fc9"), e = e(), Ge(), e), Eo = { class: "report-container" }, ko = { class: "mcq-report" }, Qo = { class: "table-container" }, $o = /* @__PURE__ */ Co(() => /* @__PURE__ */ f("thead", null, [
  /* @__PURE__ */ f("tr", null, [
    /* @__PURE__ */ f("th", null, "question"),
    /* @__PURE__ */ f("th", null, "correct option"),
    /* @__PURE__ */ f("th", null, "your answer")
  ])
], -1)), Vo = { class: "question-row" }, qo = ["href", "innerHTML"], Oo = { class: "answer-row" }, No = ["innerHTML"], Po = { class: "answer-row" }, Io = ["innerHTML"], Ao = { class: "mcq-result" }, Lo = { class: "score" }, xo = /* @__PURE__ */ N({
  __name: "MCQStatus",
  setup(e) {
    const n = $e("$updateQAttemptCallback") ?? vt;
    console.log(n);
    const o = z(), t = o.quizStats;
    console.log("FINAL QUIZ STATUS", t);
    const s = o.quizStats.length, i = t.filter((a) => a.correct === 1).length, r = (i * 100 / s).toFixed(0);
    return (async () => {
      t.filter((a) => a.attempts).forEach((a) => {
        try {
          n(a.question._id.$oid, !!a.correct);
        } catch (u) {
          console.error("Error updating question attempts", u);
        }
      });
    })(), (a, u) => (h(), _("div", Eo, [
      f("div", ko, [
        f("div", Qo, [
          f("table", null, [
            $o,
            f("tbody", null, [
              (h(!0), _(U, null, ee(Object.entries(S(t)), ([m, p]) => (h(), _("tr", {
                key: m,
                class: "quiz-statment"
              }, [
                f("td", Vo, [
                  f("a", {
                    href: p.question.link,
                    target: "_blank",
                    innerHTML: p.question.statement
                  }, null, 8, qo)
                ]),
                f("td", Oo, [
                  (h(!0), _(U, null, ee(Object.entries(
                    p.question.optionsList
                  ), ([b, v]) => (h(), _("span", { key: b }, [
                    v.optionCorrect ? (h(), _("span", {
                      key: 0,
                      innerHTML: v.optionValue
                    }, null, 8, No)) : O("", !0)
                  ]))), 128))
                ]),
                f("td", Po, [
                  f("span", {
                    class: H(
                      p.correct === 1 ? "correct-answer" : "wrong-answer"
                    ),
                    innerHTML: p.correct === 1 ? "<span> ✔</span> " : "<span> ✘</span> <span>     </span>" + p.selectedValue
                  }, null, 10, Io)
                ])
              ]))), 128))
            ])
          ])
        ])
      ]),
      f("div", null, [
        f("div", Ao, [
          f("span", Lo, "⌛ Result: " + Q(S(i)) + " out of " + Q(S(s)) + " - (" + Q(S(r)) + " %)", 1)
        ])
      ])
    ]));
  }
}), ht = /* @__PURE__ */ M(xo, [["__scopeId", "data-v-61b19fc9"]]), Mo = { class: "questions-left-header" }, jo = /* @__PURE__ */ N({
  __name: "MCQQuiz",
  setup(e) {
    const n = E(), o = z();
    Oe(() => {
      s();
    });
    const t = () => {
      o.enqueueQuestion(n.value), n.value = o.dequeueQuestion();
    }, s = () => {
      o.setAnsweredQuestionsNum(), n.value = o.dequeueQuestion();
    }, i = () => window.location.reload();
    return (r, c) => {
      const a = Qt("MCQInfoPanel");
      return h(), _("main", null, [
        te(a),
        f("h3", Mo, " Question " + Q(S(o).getAnsweredQuestionsNum()) + " out of " + Q(S(o).quizStats.length), 1),
        n.value ? (h(), j(ft, {
          key: 0,
          statement: n.value.statement,
          "options-list": n.value.optionsList,
          _id: n.value._id,
          onNextQuestion: s,
          onSkipQuestion: t
        }, null, 8, ["statement", "options-list", "_id"])) : O("", !0),
        n.value ? O("", !0) : (h(), j(ht, { key: 1 })),
        n.value ? O("", !0) : (h(), _("button", {
          key: 2,
          class: "btn-relocate",
          onClick: i
        }, " End "))
      ]);
    };
  }
}), Do = /* @__PURE__ */ M(jo, [["__scopeId", "data-v-edc7c7f1"]]), zo = {
  key: 0,
  class: "time-left-header"
}, Ro = { class: "questions-left-header" }, Uo = /* @__PURE__ */ N({
  __name: "MCQInfoPanel",
  props: {
    timeLeft: {
      type: Number,
      default: 0
    }
  },
  setup(e) {
    const n = z(), o = (t) => {
      const s = Math.floor(t / 60), i = t % 60;
      return `${s}:${i < 10 ? "0" : ""}${i}`;
    };
    return (t, s) => (h(), _(U, null, [
      e.timeLeft ? (h(), _("h3", zo, " Time left: " + Q(o(e.timeLeft)), 1)) : O("", !0),
      f("h3", Ro, " Question " + Q(S(n).questionsStack.length) + " out of " + Q(S(n).quizStats.length), 1)
    ], 64));
  }
}), He = 1e3, Ho = "-1", Fo = /* @__PURE__ */ N({
  __name: "MCQTimedQuiz",
  setup(e) {
    const n = z(), o = E();
    let t = null, s = null;
    const i = E(n.timeLimit);
    Oe(() => {
      c();
    }), Je(() => {
      u(), m();
    });
    const r = () => {
      o.value = n.removeFromLastHistory() ?? o.value;
    }, c = () => o.value = n.dequeueQuestion(), a = () => window.location.reload(), u = () => {
      t && clearTimeout(t), s && clearInterval(s);
    }, m = () => {
      i.value = n.timeLimit;
      const b = () => o.value ? i.value ? i.value-- : p() : u();
      s = window.setInterval(b, He), t = window.setTimeout(() => {
      }, n.timeLimit * He);
    }, p = () => {
      var v;
      u();
      const b = (V) => n.incrementStat(V, "attempts", Ho);
      for (b(((v = o.value) == null ? void 0 : v._id.$oid) ?? ""); o.value = n.dequeueQuestion(); )
        b(o.value._id.$oid);
      return alert("Time's up! Quiz has ended."), c();
    };
    return (b, v) => (h(), _("main", null, [
      te(Uo, { "time-left": i.value }, null, 8, ["time-left"]),
      o.value ? (h(), j(ft, {
        key: 0,
        statement: o.value.statement,
        "options-list": o.value.optionsList,
        _id: o.value._id,
        onNextQuestion: c,
        onPrevQuestion: r
      }, null, 8, ["statement", "options-list", "_id"])) : O("", !0),
      o.value ? O("", !0) : (h(), j(ht, { key: 1 })),
      o.value ? O("", !0) : (h(), _("button", {
        key: 2,
        class: "btn-relocate",
        onClick: a
      }, " End "))
    ]));
  }
}), Bo = /* @__PURE__ */ M(Fo, [["__scopeId", "data-v-4fd74e68"]]), Wo = ["id", "name", "value", "disabled"], Go = ["for"], Jo = {
  key: 0,
  class: "question-number"
}, Yo = /* @__PURE__ */ N({
  __name: "FilterCheckbox",
  props: {
    category: {},
    topics: {}
  },
  setup(e) {
    const { category: n, topics: o } = e, t = z(), s = (a) => n === "course" ? a.toUpperCase() : a, i = qe(
      () => Object.entries(o).map(([a, u]) => {
        const m = c(u, n), p = bo(
          t.allQs,
          u,
          n
        ).length.toString();
        return { idx: a, topic: u, num: m, questionamount: p };
      }).filter(({ topic: a }) => a !== void 0)
    ), r = (a) => {
      if (!(a.target instanceof HTMLInputElement))
        return console.error("Trying to click on non-input element");
      const u = a.target.name, m = a.target.value;
      t.modifySelectedTags(a.target.checked, { category: u, topic: m });
    }, c = (a, u) => {
      var v;
      const m = t.getselectedtags();
      if (!m[u] || (v = m[u]) != null && v.includes(
        a
      ))
        return null;
      const p = JSON.parse(
        JSON.stringify(t.getselectedtags())
      );
      p[u].includes(a) || p[u].push(a);
      const b = t.allQs;
      return Ie(
        b,
        p
      ).length.toString();
    };
    return (a, u) => (h(), _("ul", null, [
      (h(!0), _(U, null, ee(i.value, ({ idx: m, num: p, topic: b, questionamount: v }) => (h(), _("li", {
        key: m,
        class: H(["filter-options", { "grey-out": p === "0" }])
      }, [
        f("input", {
          id: `${a.category}-${b}-checkbox`,
          type: "checkbox",
          name: a.category,
          value: b,
          disabled: p === "0",
          onChange: u[0] || (u[0] = (V) => r(V))
        }, null, 40, Wo),
        f("label", {
          for: `${a.category}-${b}-checkbox`
        }, [
          Ye(Q(s(b)) + " ", 1),
          p !== null && p !== "0" ? (h(), _("span", Jo, Q(v), 1)) : O("", !0)
        ], 8, Go)
      ], 2))), 128))
    ]));
  }
}), Ko = /* @__PURE__ */ M(Yo, [["__scopeId", "data-v-43544b02"]]), Xo = { class: "filter" }, Zo = { class: "category-heading" }, en = /* @__PURE__ */ N({
  __name: "MCQTagOptions",
  setup(e) {
    const t = z().allQs.map((i) => i.tags), s = dt(t);
    return (i, r) => (h(), _("div", Xo, [
      (h(!0), _(U, null, ee(Object.entries(S(s)), ([c, a]) => (h(), _("div", {
        key: c,
        class: "category"
      }, [
        f("h2", Zo, Q(c), 1),
        te(Ko, {
          category: c,
          topics: a
        }, null, 8, ["category", "topics"])
      ]))), 128))
    ]));
  }
}), tn = /* @__PURE__ */ M(en, [["__scopeId", "data-v-efaccb2c"]]), on = { for: "optionName" }, nn = ["value"], sn = /* @__PURE__ */ N({
  __name: "DropDownbox",
  props: {
    options: {},
    optionName: {},
    disabled: { type: Boolean }
  },
  setup(e) {
    const n = z(), o = E(0);
    function t(s) {
      const i = s.target;
      i.value && (o.value = parseFloat(i.value) * 60, n.setTimeLimit(o.value));
    }
    return (s, i) => (h(), _("div", {
      class: H(s.disabled ? "dropdown input-disabled" : "dropdown")
    }, [
      f("label", on, Q(s.optionName) + ":   ", 1),
      f("select", {
        id: "optionName",
        name: "optionName",
        onChange: t
      }, [
        (h(!0), _(U, null, ee(s.options, (r) => (h(), _("option", {
          key: r.value,
          value: r.value
        }, Q(r.value) + " " + Q(r.unit), 9, nn))), 128))
      ], 32)
    ], 2));
  }
}), rn = /* @__PURE__ */ M(sn, [["__scopeId", "data-v-5f3ae97a"]]), ue = (e) => (We("data-v-c3d686ea"), e = e(), Ge(), e), an = { class: "start-page-container" }, cn = /* @__PURE__ */ ue(() => /* @__PURE__ */ f("h1", null, "VetCloud Smart Quiz", -1)), un = { class: "quiz-config-container" }, ln = { class: "question-config-container" }, dn = { class: "tag-text" }, pn = { class: "question-number" }, fn = { class: "question-amount-container" }, hn = /* @__PURE__ */ ue(() => /* @__PURE__ */ f("label", { for: "question-amount" }, "Select the amount of questions:", -1)), mn = ["max"], gn = {
  key: 0,
  class: "show-max-msg"
}, bn = /* @__PURE__ */ ue(() => /* @__PURE__ */ f("label", { for: "mode-select" }, "Select mode:", -1)), _n = /* @__PURE__ */ ue(() => /* @__PURE__ */ f("option", { value: "Tutor" }, "Tutor", -1)), vn = /* @__PURE__ */ ue(() => /* @__PURE__ */ f("option", { value: "Timed" }, "Timed", -1)), yn = [
  _n,
  vn
], Sn = 3e3, Tn = /* @__PURE__ */ N({
  __name: "StartPage",
  emits: ["start-quiz"],
  setup(e, { emit: n }) {
    const o = E(1), t = E("Tutor"), s = E(!1), i = E(null), r = n, c = z();
    Oe(() => {
      $t(() => {
        const m = c.getquestionnumber();
        o.value = Math.min(10, m);
      });
    });
    const a = () => {
      r("start-quiz", {
        questionAmount: o.value,
        mode: t.value
      });
    }, u = () => {
      i.value && clearTimeout(i.value), o.value > c.getquestionnumber() && (o.value = c.getquestionnumber(), s.value = !0, i.value = window.setTimeout(() => {
        s.value = !1;
      }, Sn));
    };
    return (m, p) => (h(), _("div", an, [
      cn,
      te(tn),
      f("div", un, [
        f("div", ln, [
          f("p", dn, [
            Ye(" Maximum possible questions: "),
            f("span", pn, Q(S(c).getquestionnumber()), 1)
          ]),
          f("div", fn, [
            hn,
            xe(f("input", {
              id: "question-amount",
              "onUpdate:modelValue": p[0] || (p[0] = (b) => o.value = b),
              type: "number",
              placeholder: "Question amount",
              min: "1",
              max: S(c).getquestionnumber(),
              onInput: u
            }, null, 40, mn), [
              [
                Vt,
                o.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          s.value ? (h(), _("p", gn, " Cannot select more than " + Q(S(c).getquestionnumber()) + " questions. ", 1)) : O("", !0),
          f("div", null, [
            bn,
            xe(f("select", {
              id: "mode-select",
              "onUpdate:modelValue": p[1] || (p[1] = (b) => t.value = b)
            }, yn, 512), [
              [qt, t.value]
            ])
          ]),
          te(rn, {
            options: [
              { value: 1, label: "Time Option 2", unit: "Min." },
              { value: 1.5, label: "Time Option 1", unit: "Min." }
            ],
            "option-name": "Time per Question",
            class: H(t.value === "Timed" ? "" : "input-disabled"),
            disabled: t.value !== "Timed"
          }, null, 8, ["options", "class", "disabled"])
        ])
      ]),
      f("button", {
        class: "start-button",
        onClick: a
      }, "Start")
    ]));
  }
}), wn = /* @__PURE__ */ M(Tn, [["__scopeId", "data-v-c3d686ea"]]), Cn = (e) => e.trim().toLowerCase().replace("_", " "), En = (e) => e.reduce((n, o) => {
  if (!o.includes(":"))
    return n;
  let [t, s] = o.split(":");
  return [t, s] = [t.trim().toLowerCase(), Cn(s)], n[t] ? n[t] = [...n[t], s] : n[t] = [s], n;
}, {}), kn = (e) => e.map((n) => ({
  _id: { $oid: n._id.$oid },
  statement: n.statement,
  tags: En(n.tags),
  optionsList: n.optionsList,
  link: n.link
})), mt = { convertQuestions: kn }, Qn = [
  {
    tags: [
      "course:vets2011",
      "course:vets2011",
      "subject:physiology",
      "system:nervous_system",
      "234:tagvalue",
      "  @#:wr "
    ],
    statement: "<p>Which part of a neuron receives information from surrounding cells?</p>",
    optionsList: [
      {
        optionValue: "<p>Axon</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Presynaptic terminal</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Cell body</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Dendrite</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Myelin</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af39b"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd"
  },
  {
    tags: [
      "course: VETS2012",
      "course:vets2016",
      "subject: Physiology",
      "system: Nervous System"
    ],
    statement: "<p>Which of the following statements regarding action potentials is TRUE?</p>",
    optionsList: [
      {
        optionValue: "<p>Multiple depolarising events minimises the chance of action potential generation</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Reaching the subthreshold level does not stimulate the post-synaptic membrane</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Threshold event generates an action potential</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Reaching the subthreshold level is enough to generate an action potential</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Depolarised synaptic membrane is more negative than the hyperpolarised membrane</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0b"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03"
  },
  {
    tags: ["course:vets2012", "subject:physiology", "animal:horse"],
    statement: "<p>Action potentials are transmitted along which part of a neuron?</p>",
    optionsList: [
      {
        optionValue: "<p>The membrane is more depolarised</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>The effect of the subthreshold is enhanced</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Action potential is reached</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>A threshold event takes place</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>The membrane is hyperpolarised</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0a"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03"
  },
  {
    tags: ["course:vets2012", "subject:physiology", "animal:horse"],
    statement: "<p>Which of the following would NOT be possible occurrences when signal build-up occurs?</p>",
    optionsList: [
      {
        optionValue: "<p>They can reach action potential as a result of EPSP</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>IPSP can hyperpolarise the membrane</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>They can reach action potential as a result of IPSP</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>An action potential will be reached if the number of EPSP &gt; IPSP</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0d"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03"
  },
  {
    tags: ["course: VETS2012", "subject:Physiology", "animal:dog"],
    statement: "<p>When is it impossible to generate an action potential?</p>",
    optionsList: [
      {
        optionValue: "<p>Absolute refractory period</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Relative refractory period</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Sodium conductance</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>EPSPs after IPSPs</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Hyperpolarised state</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0f"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03"
  },
  {
    tags: ["course: VETS2013", "course:vets2016", "subject:Physiology"],
    statement: "<p>Which of the following types of glial cells myelinate neurons in the peripheral nervous system?</p>",
    optionsList: [
      {
        optionValue: "<p>Ependymal cells</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Schwann cells</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Muller cells</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Oligodendrocytes</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac11"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214413464c71f1df2110d07"
  },
  {
    tags: ["course: VETS2012", "subject:Atonomy", "animal:Horse"],
    statement: "<p>Which of the following is an attribute of ependymal cells?</p>",
    optionsList: [
      {
        optionValue: "<p>Repair processes</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Cerebrospinal fluid synthesis</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Delivering nutrients</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Recycling of neurotransmitters</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Maintenance of terminal environment</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac10"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214413464c71f1df2110d07"
  },
  {
    tags: ["course: VETS2013", "subject:Physiology", "animal:cat"],
    statement: "<p>Depending on the pre-synaptic neurotransmitter released and the post-synaptic receptor activated, the post-synaptic membrane can either be depolarised or hyperpolarised. Which of the following statements is FALSE?</p>",
    optionsList: [
      {
        optionValue: "<p>Neurotransmitter binding to metabotropic receptors causes a conformational change in pore proteins</p>",
        optionCorrect: !0
      },
      {
        optionValue: "The action of metabotropic receptors is slower than ionotropic receptors",
        optionCorrect: !1
      },
      {
        optionValue: "Neurotransmitter binding to metabotropic receptors causes a conformational change, activating a signal transduction pathway",
        optionCorrect: !1
      },
      {
        optionValue: "An example of an ionotropic receptor is the nicotinic acetylcholine receptor",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86faa"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d5a64c71f1df2110d16"
  },
  {
    tags: ["course: VETS2012", "subject:Physiology", "animal:Horse"],
    statement: "Nicotine (mimics acetylcholine) can bind to nicotinic cholinergic receptors. You would expect the response on the post-synaptic membrane to be:",
    optionsList: [
      {
        optionValue: "Excitation due to opening of chloride channels",
        optionCorrect: !1
      },
      {
        optionValue: "Hyperpolarisation due to blocking of sodium channels",
        optionCorrect: !1
      },
      {
        optionValue: "Hyperpolarisation due to opening of chloride channels",
        optionCorrect: !1
      },
      {
        optionValue: "Excitation due to opening of sodium channels",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fac"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d5a64c71f1df2110d16"
  },
  {
    tags: ["course: VETS2012", "subject:Physiology", "animal:Horse"],
    statement: "&gamma;-aminobutyric acid (GABA) is a rapidly acting neurotransmitter. You would expect the response on the post-synaptic membrane to be:",
    optionsList: [
      {
        optionValue: "Excitation due to opening of chloride channels",
        optionCorrect: !1
      },
      {
        optionValue: "Hyperpolarisation due to blocking of sodium channels",
        optionCorrect: !1
      },
      {
        optionValue: "Hyperpolarisation due to opening of chloride channels",
        optionCorrect: !0
      },
      {
        optionValue: "Excitation due to opening of sodium channels",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fab"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d5a64c71f1df2110d16"
  },
  {
    tags: ["course: VETS2012", "subject:Physiology", "animal:Horse"],
    statement: "<p>At the neuromuscular junction, Ca<sup>2+</sup>&nbsp;ions are necessary for:</p>",
    optionsList: [
      {
        optionValue: "<p>Binding the transmitter with the post-synaptic receptor</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Facilitating diffusion of the transmitter to the post-synaptic membrane</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Splitting the neurotransmitter in the synaptic cleft, deactivating the transmitter</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Fusing the pre-synaptic vesicle with the pre-synaptic membrane, thus releasing the transmitter</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Metabolising the transmitter within the pre-synaptic vesicle</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fae"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d7064c71f1df2110d17"
  },
  {
    tags: ["course: VETS2012", "subject:Physiology", "animal:Horse"],
    statement: "<p>Which of the following statements is TRUE with regard to the termination of the synaptic action at the neuromuscular junction?</p>",
    optionsList: [
      {
        optionValue: "<p>The re-uptake of intact acetylcholine molecules into the motor neuron terminal is responsible</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Diffusion of acetylcholine away from the synapse is solely responsible</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Acetylcholinesterase rapidly breaks down acetylcholine into choline and acetate</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Dissociation of acetylcholine from the muscarinic receptor, after binding for several seconds, is solely responsible</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fad"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d7064c71f1df2110d17"
  },
  {
    tags: ["course: VETS2012", "subject:Physiology", "animal:Horse"],
    statement: "<p>Which part of a neuron receives information from surrounding cells?</p>",
    optionsList: [
      {
        optionValue: "<p>Axon</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Presynaptic terminal</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Cell body</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Dendrite</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Myelin</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac06"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd"
  }
], A = {
  isString: (r) => typeof r == "string",
  isObject: (r) => typeof r == "object" && r !== null,
  isBoolean: (r) => typeof r == "boolean",
  isArray: (r, c) => Array.isArray(r) && r.every(c),
  isNumber: (r) => typeof r == "number",
  isFunction: (r) => typeof r == "function"
};
function Qe(e) {
  const n = e.includes(":") && e.split(":").length === 2, o = !e.includes(":") && !e.includes(" ");
  return n || o;
}
function gt(e, n = !1) {
  return A.isArray(e, A.isString) ? n ? e.every(Qe) : e.some(Qe) : !1;
}
function $n(e) {
  return A.isObject(e) && A.isString(e.optionValue) && (e.optionCorrect === void 0 || A.isBoolean(e.optionCorrect));
}
function bt(e) {
  return A.isObject(e) && A.isObject(e._id) && // Assuming _id is an object with $oid property
  A.isString(e._id.$oid) && A.isString(e.statement) && gt(e.tags) && // Modified to ensure tags are always checked
  A.isArray(e.optionsList, $n) && A.isString(e.link);
}
function Vn(e) {
  return A.isArray(e, bt);
}
const fe = {
  isMCQuestion: bt,
  isMCQuestionArray: Vn,
  validateTags: gt,
  isTag: Qe
}, qn = (e) => {
  try {
    if (!e)
      throw new Error("No question data found. Please Try again later.");
    return mt.convertQuestions(_t(e));
  } catch (n) {
    return alert(n), [];
  }
}, On = () => Qn, Nn = () => {
  const e = On();
  return mt.convertQuestions(_t(e));
};
function _t(e) {
  fe.isMCQuestionArray(e) ? console.info(
    "%cAll questions are valid",
    "color: #00FF00",
    `
Total Questions Validated:`,
    e.length
  ) : console.warn(
    "%cWARNING: Some questions contains invalid structure",
    "color: #FF0000"
  );
  const n = {
    invalidTags: 0,
    noTags: 0,
    invalidQs: 0,
    totalTags: 0
  }, o = e.reduce((t, s) => {
    if (!fe.isMCQuestion(s))
      return { ...t, invalidQs: t.invalidQs + 1 };
    let { tags: i } = s;
    if (!i || Array.isArray(i) && !i.length)
      return { ...t, noTags: t.noTags + 1 };
    const r = t.totalTags + i.length;
    if (!fe.validateTags(i, !0)) {
      const c = i.filter((u) => fe.isTag(u)), a = t.invalidTags + i.length - c.length;
      return i = c, { ...t, invalidTags: a, totalTags: r };
    }
    return { ...t, totalTags: r };
  }, n);
  return Pn(o, e.length), e;
}
function Te(e, n) {
  e && console.warn(n, "color: #FF0000");
}
function Pn(e, n) {
  const { invalidQs: o, invalidTags: t, noTags: s, totalTags: i } = e;
  Te(
    o,
    `Invalid Questions Received: %c${o} out of ${n}`
  ), Te(
    t,
    `Filtering out invalid tags: %c${t} out of ${i}`
  ), Te(s, `Questions with no tags: %c${s}`);
}
const In = /* @__PURE__ */ N({
  __name: "CrucibleComponent",
  setup(e) {
    const n = E(0), o = z(), t = E(!1), s = E([]), i = $e("$dataLink");
    Je(() => {
      s.value = i ? qn(i.data.questions) : Nn(), o.allQs = s.value;
      const c = dt(
        s.value.map((a) => a.tags)
      );
      o.setselectedTags(
        Object.keys(c).reduce((a, u) => ({ ...a, [u]: [] }), {})
      );
    });
    const r = ({ questionAmount: c, mode: a }) => {
      const u = o.getselectedtags();
      if (!s.value.length)
        return alert("Trouble fetching questions, please try again later");
      const m = Ie(
        s.value,
        u
      ), p = go(c, m);
      n.value = p.length, o.initialiseQuiz(p, a), a === "Timed" && o.setTimeLimit(c * o.timeLimit), t.value = !0;
    };
    return (c, a) => t.value && S(o).quizMode === "Tutor" ? (h(), j(Do, { key: 0 })) : t.value && S(o).quizMode === "Timed" ? (h(), j(Bo, { key: 1 })) : (h(), j(wn, {
      key: 2,
      onStartQuiz: r
    }));
  }
}), An = {
  data: {
    questions: [
      {
        _id: { $oid: "6625c7c8c8259deb8c3af39e" },
        statement: "",
        tags: [""],
        optionsList: { optionValue: "", optionCorrect: !1 },
        link: ""
      }
    ]
  }
}, vt = async (e, n) => {
  console.info(
    `Default updateQAttemptCallback called on ${e} and is correct: ${n}`
  );
};
function Mn(e, n = {}) {
  const o = to();
  e.use(o), e.component("CrucibleComponent", In), e.provide("$dataLink", n.dataLink || An), e.provide(
    "$updateQAttemptCallback",
    n.updateQAttemptCallback || vt
  );
}
export {
  In as CrucibleComponent,
  Mn as createViewerPlugin,
  An as defaultData,
  vt as defaultUpdateQAttemptCallback
};
