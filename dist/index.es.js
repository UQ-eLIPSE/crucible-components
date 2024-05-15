import { effectScope as Fe, ref as Q, markRaw as J, hasInjectionContext as bt, inject as Be, getCurrentInstance as yt, toRaw as ve, watch as He, reactive as St, isRef as ae, isReactive as $e, toRef as ye, nextTick as Pe, computed as qe, unref as S, getCurrentScope as Tt, onScopeDispose as wt, toRefs as Ae, defineComponent as I, openBlock as h, createElementBlock as v, Fragment as R, normalizeClass as F, createElementVNode as p, toDisplayString as k, renderList as ee, createVNode as te, createBlock as j, createCommentVNode as N, pushScopeId as Ge, popScopeId as Je, onMounted as Ne, resolveComponent as Ot, onBeforeMount as We, createTextVNode as Ye, watchEffect as Qt, withDirectives as Me, vModelText as Et, vModelSelect as kt } from "vue";
var Ke = !1;
function fe(e, s, n) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, s), e.splice(s, 1, n), n) : (e[s] = n, n);
}
function Se(e, s) {
  if (Array.isArray(e)) {
    e.splice(s, 1);
    return;
  }
  delete e[s];
}
function $t() {
  return Xe().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Xe() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const qt = typeof Proxy == "function", Nt = "devtools-plugin:setup", It = "plugin:settings:set";
let K, we;
function Ct() {
  var e;
  return K !== void 0 || (typeof window < "u" && window.performance ? (K = !0, we = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (K = !0, we = globalThis.perf_hooks.performance) : K = !1), K;
}
function Lt() {
  return Ct() ? we.now() : Date.now();
}
class Pt {
  constructor(s, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = s, this.hook = n;
    const t = {};
    if (s.settings)
      for (const r in s.settings) {
        const a = s.settings[r];
        t[r] = a.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${s.id}`;
    let i = Object.assign({}, t);
    try {
      const r = localStorage.getItem(o), a = JSON.parse(r);
      Object.assign(i, a);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return i;
      },
      setSettings(r) {
        try {
          localStorage.setItem(o, JSON.stringify(r));
        } catch {
        }
        i = r;
      },
      now() {
        return Lt();
      }
    }, n && n.on(It, (r, a) => {
      r === this.plugin.id && this.fallbacks.setSettings(a);
    }), this.proxiedOn = new Proxy({}, {
      get: (r, a) => this.target ? this.target.on[a] : (...u) => {
        this.onQueue.push({
          method: a,
          args: u
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (r, a) => this.target ? this.target[a] : a === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(a) ? (...u) => (this.targetQueue.push({
        method: a,
        args: u,
        resolve: () => {
        }
      }), this.fallbacks[a](...u)) : (...u) => new Promise((c) => {
        this.targetQueue.push({
          method: a,
          args: u,
          resolve: c
        });
      })
    });
  }
  async setRealTarget(s) {
    this.target = s;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function Ze(e, s) {
  const n = e, t = Xe(), o = $t(), i = qt && n.enableEarlyProxy;
  if (o && (t.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    o.emit(Nt, e, s);
  else {
    const r = i ? new Pt(n, o) : null;
    (t.__VUE_DEVTOOLS_PLUGINS__ = t.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: s,
      proxy: r
    }), r && s(r.proxiedTarget);
  }
}
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let ie;
const ue = (e) => ie = e, et = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function W(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var D;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(D || (D = {}));
const be = typeof window < "u", re = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && be, xe = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function At(e, { autoBom: s = !1 } = {}) {
  return s && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Ie(e, s, n) {
  const t = new XMLHttpRequest();
  t.open("GET", e), t.responseType = "blob", t.onload = function() {
    st(t.response, s, n);
  }, t.onerror = function() {
    console.error("could not download file");
  }, t.send();
}
function tt(e) {
  const s = new XMLHttpRequest();
  s.open("HEAD", e, !1);
  try {
    s.send();
  } catch {
  }
  return s.status >= 200 && s.status <= 299;
}
function he(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const n = document.createEvent("MouseEvents");
    n.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(n);
  }
}
const me = typeof navigator == "object" ? navigator : { userAgent: "" }, nt = /Macintosh/.test(me.userAgent) && /AppleWebKit/.test(me.userAgent) && !/Safari/.test(me.userAgent), st = be ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !nt ? Mt : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in me ? xt : (
      // Fallback to using FileReader and a popup
      Vt
    )
  )
) : () => {
};
function Mt(e, s = "download", n) {
  const t = document.createElement("a");
  t.download = s, t.rel = "noopener", typeof e == "string" ? (t.href = e, t.origin !== location.origin ? tt(t.href) ? Ie(e, s, n) : (t.target = "_blank", he(t)) : he(t)) : (t.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(t.href);
  }, 4e4), setTimeout(function() {
    he(t);
  }, 0));
}
function xt(e, s = "download", n) {
  if (typeof e == "string")
    if (tt(e))
      Ie(e, s, n);
    else {
      const t = document.createElement("a");
      t.href = e, t.target = "_blank", setTimeout(function() {
        he(t);
      });
    }
  else
    navigator.msSaveOrOpenBlob(At(e, n), s);
}
function Vt(e, s, n, t) {
  if (t = t || open("", "_blank"), t && (t.document.title = t.document.body.innerText = "downloading..."), typeof e == "string")
    return Ie(e, s, n);
  const o = e.type === "application/octet-stream", i = /constructor/i.test(String(xe.HTMLElement)) || "safari" in xe, r = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((r || o && i || nt) && typeof FileReader < "u") {
    const a = new FileReader();
    a.onloadend = function() {
      let u = a.result;
      if (typeof u != "string")
        throw t = null, new Error("Wrong reader.result type");
      u = r ? u : u.replace(/^data:[^;]*;/, "data:attachment/file;"), t ? t.location.href = u : location.assign(u), t = null;
    }, a.readAsDataURL(e);
  } else {
    const a = URL.createObjectURL(e);
    t ? t.location.assign(a) : location.href = a, t = null, setTimeout(function() {
      URL.revokeObjectURL(a);
    }, 4e4);
  }
}
function E(e, s) {
  const n = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, s) : s === "error" ? console.error(n) : s === "warn" ? console.warn(n) : console.log(n);
}
function Ce(e) {
  return "_a" in e && "install" in e;
}
function ot() {
  if (!("clipboard" in navigator))
    return E("Your browser doesn't support the Clipboard API", "error"), !0;
}
function it(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (E('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function jt(e) {
  if (!ot())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), E("Global state copied to clipboard.");
    } catch (s) {
      if (it(s))
        return;
      E("Failed to serialize the state. Check the console for more details.", "error"), console.error(s);
    }
}
async function Dt(e) {
  if (!ot())
    try {
      rt(e, JSON.parse(await navigator.clipboard.readText())), E("Global state pasted from clipboard.");
    } catch (s) {
      if (it(s))
        return;
      E("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(s);
    }
}
async function zt(e) {
  try {
    st(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (s) {
    E("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(s);
  }
}
let U;
function Ut() {
  U || (U = document.createElement("input"), U.type = "file", U.accept = ".json");
  function e() {
    return new Promise((s, n) => {
      U.onchange = async () => {
        const t = U.files;
        if (!t)
          return s(null);
        const o = t.item(0);
        return s(o ? { text: await o.text(), file: o } : null);
      }, U.oncancel = () => s(null), U.onerror = n, U.click();
    });
  }
  return e;
}
async function Rt(e) {
  try {
    const n = await Ut()();
    if (!n)
      return;
    const { text: t, file: o } = n;
    rt(e, JSON.parse(t)), E(`Global state imported from "${o.name}".`);
  } catch (s) {
    E("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(s);
  }
}
function rt(e, s) {
  for (const n in s) {
    const t = e.state.value[n];
    t ? Object.assign(t, s[n]) : e.state.value[n] = s[n];
  }
}
function V(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const at = "🍍 Pinia (root)", Oe = "_root";
function Ft(e) {
  return Ce(e) ? {
    id: Oe,
    label: at
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Bt(e) {
  if (Ce(e)) {
    const n = Array.from(e._s.keys()), t = e._s;
    return {
      state: n.map((i) => ({
        editable: !0,
        key: i,
        value: e.state.value[i]
      })),
      getters: n.filter((i) => t.get(i)._getters).map((i) => {
        const r = t.get(i);
        return {
          editable: !1,
          key: i,
          value: r._getters.reduce((a, u) => (a[u] = r[u], a), {})
        };
      })
    };
  }
  const s = {
    state: Object.keys(e.$state).map((n) => ({
      editable: !0,
      key: n,
      value: e.$state[n]
    }))
  };
  return e._getters && e._getters.length && (s.getters = e._getters.map((n) => ({
    editable: !1,
    key: n,
    value: e[n]
  }))), e._customProperties.size && (s.customProperties = Array.from(e._customProperties).map((n) => ({
    editable: !0,
    key: n,
    value: e[n]
  }))), s;
}
function Ht(e) {
  return e ? Array.isArray(e) ? e.reduce((s, n) => (s.keys.push(n.key), s.operations.push(n.type), s.oldValue[n.key] = n.oldValue, s.newValue[n.key] = n.newValue, s), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: V(e.type),
    key: V(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function Gt(e) {
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
const _e = [], G = "pinia:mutations", $ = "pinia", { assign: Jt } = Object, ge = (e) => "🍍 " + e;
function Wt(e, s) {
  Ze({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: _e,
    app: e
  }, (n) => {
    typeof n.now != "function" && E("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
      id: G,
      label: "Pinia 🍍",
      color: 15064968
    }), n.addInspector({
      id: $,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            jt(s);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await Dt(s), n.sendInspectorTree($), n.sendInspectorState($);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            zt(s);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Rt(s), n.sendInspectorTree($), n.sendInspectorState($);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (t) => {
            const o = s._s.get(t);
            o ? typeof o.$reset != "function" ? E(`Cannot reset "${t}" store because it doesn't have a "$reset" method implemented.`, "warn") : (o.$reset(), E(`Store "${t}" reset.`)) : E(`Cannot reset "${t}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((t, o) => {
      const i = t.componentInstance && t.componentInstance.proxy;
      if (i && i._pStores) {
        const r = t.componentInstance.proxy._pStores;
        Object.values(r).forEach((a) => {
          t.instanceData.state.push({
            type: ge(a.$id),
            key: "state",
            editable: !0,
            value: a._isOptionsAPI ? {
              _custom: {
                value: ve(a.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => a.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(a.$state).reduce((u, c) => (u[c] = a.$state[c], u), {})
            )
          }), a._getters && a._getters.length && t.instanceData.state.push({
            type: ge(a.$id),
            key: "getters",
            editable: !1,
            value: a._getters.reduce((u, c) => {
              try {
                u[c] = a[c];
              } catch (m) {
                u[c] = m;
              }
              return u;
            }, {})
          });
        });
      }
    }), n.on.getInspectorTree((t) => {
      if (t.app === e && t.inspectorId === $) {
        let o = [s];
        o = o.concat(Array.from(s._s.values())), t.rootNodes = (t.filter ? o.filter((i) => "$id" in i ? i.$id.toLowerCase().includes(t.filter.toLowerCase()) : at.toLowerCase().includes(t.filter.toLowerCase())) : o).map(Ft);
      }
    }), n.on.getInspectorState((t) => {
      if (t.app === e && t.inspectorId === $) {
        const o = t.nodeId === Oe ? s : s._s.get(t.nodeId);
        if (!o)
          return;
        o && (t.state = Bt(o));
      }
    }), n.on.editInspectorState((t, o) => {
      if (t.app === e && t.inspectorId === $) {
        const i = t.nodeId === Oe ? s : s._s.get(t.nodeId);
        if (!i)
          return E(`store "${t.nodeId}" not found`, "error");
        const { path: r } = t;
        Ce(i) ? r.unshift("state") : (r.length !== 1 || !i._customProperties.has(r[0]) || r[0] in i.$state) && r.unshift("$state"), Z = !1, t.set(i, r, t.state.value), Z = !0;
      }
    }), n.on.editComponentState((t) => {
      if (t.type.startsWith("🍍")) {
        const o = t.type.replace(/^🍍\s*/, ""), i = s._s.get(o);
        if (!i)
          return E(`store "${o}" not found`, "error");
        const { path: r } = t;
        if (r[0] !== "state")
          return E(`Invalid path for store "${o}":
${r}
Only state can be modified.`);
        r[0] = "$state", Z = !1, t.set(i, r, t.state.value), Z = !0;
      }
    });
  });
}
function Yt(e, s) {
  _e.includes(ge(s.$id)) || _e.push(ge(s.$id)), Ze({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: _e,
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
  }, (n) => {
    const t = typeof n.now == "function" ? n.now.bind(n) : Date.now;
    s.$onAction(({ after: r, onError: a, name: u, args: c }) => {
      const m = ut++;
      n.addTimelineEvent({
        layerId: G,
        event: {
          time: t(),
          title: "🛫 " + u,
          subtitle: "start",
          data: {
            store: V(s.$id),
            action: V(u),
            args: c
          },
          groupId: m
        }
      }), r((f) => {
        H = void 0, n.addTimelineEvent({
          layerId: G,
          event: {
            time: t(),
            title: "🛬 " + u,
            subtitle: "end",
            data: {
              store: V(s.$id),
              action: V(u),
              args: c,
              result: f
            },
            groupId: m
          }
        });
      }), a((f) => {
        H = void 0, n.addTimelineEvent({
          layerId: G,
          event: {
            time: t(),
            logType: "error",
            title: "💥 " + u,
            subtitle: "end",
            data: {
              store: V(s.$id),
              action: V(u),
              args: c,
              error: f
            },
            groupId: m
          }
        });
      });
    }, !0), s._customProperties.forEach((r) => {
      He(() => S(s[r]), (a, u) => {
        n.notifyComponentUpdate(), n.sendInspectorState($), Z && n.addTimelineEvent({
          layerId: G,
          event: {
            time: t(),
            title: "Change",
            subtitle: r,
            data: {
              newValue: a,
              oldValue: u
            },
            groupId: H
          }
        });
      }, { deep: !0 });
    }), s.$subscribe(({ events: r, type: a }, u) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState($), !Z)
        return;
      const c = {
        time: t(),
        title: Gt(a),
        data: Jt({ store: V(s.$id) }, Ht(r)),
        groupId: H
      };
      a === D.patchFunction ? c.subtitle = "⤵️" : a === D.patchObject ? c.subtitle = "🧩" : r && !Array.isArray(r) && (c.subtitle = r.type), r && (c.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: r
        }
      }), n.addTimelineEvent({
        layerId: G,
        event: c
      });
    }, { detached: !0, flush: "sync" });
    const o = s._hotUpdate;
    s._hotUpdate = J((r) => {
      o(r), n.addTimelineEvent({
        layerId: G,
        event: {
          time: t(),
          title: "🔥 " + s.$id,
          subtitle: "HMR update",
          data: {
            store: V(s.$id),
            info: V("HMR update")
          }
        }
      }), n.notifyComponentUpdate(), n.sendInspectorTree($), n.sendInspectorState($);
    });
    const { $dispose: i } = s;
    s.$dispose = () => {
      i(), n.notifyComponentUpdate(), n.sendInspectorTree($), n.sendInspectorState($), n.getSettings().logStoreChanges && E(`Disposed "${s.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree($), n.sendInspectorState($), n.getSettings().logStoreChanges && E(`"${s.$id}" store installed 🆕`);
  });
}
let ut = 0, H;
function Ve(e, s, n) {
  const t = s.reduce((o, i) => (o[i] = ve(e)[i], o), {});
  for (const o in t)
    e[o] = function() {
      const i = ut, r = n ? new Proxy(e, {
        get(...u) {
          return H = i, Reflect.get(...u);
        },
        set(...u) {
          return H = i, Reflect.set(...u);
        }
      }) : e;
      H = i;
      const a = t[o].apply(r, arguments);
      return H = void 0, a;
    };
}
function Kt({ app: e, store: s, options: n }) {
  if (s.$id.startsWith("__hot:"))
    return;
  s._isOptionsAPI = !!n.state, Ve(s, Object.keys(n.actions), s._isOptionsAPI);
  const t = s._hotUpdate;
  ve(s)._hotUpdate = function(o) {
    t.apply(this, arguments), Ve(s, Object.keys(o._hmrPayload.actions), !!s._isOptionsAPI);
  }, Yt(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    s
  );
}
function Xt() {
  const e = Fe(!0), s = e.run(() => Q({}));
  let n = [], t = [];
  const o = J({
    install(i) {
      ue(o), o._a = i, i.provide(et, o), i.config.globalProperties.$pinia = o, re && Wt(i, o), t.forEach((r) => n.push(r)), t = [];
    },
    use(i) {
      return !this._a && !Ke ? t.push(i) : n.push(i), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: s
  });
  return re && typeof Proxy < "u" && o.use(Kt), o;
}
function ct(e, s) {
  for (const n in s) {
    const t = s[n];
    if (!(n in e))
      continue;
    const o = e[n];
    W(o) && W(t) && !ae(t) && !$e(t) ? e[n] = ct(o, t) : e[n] = t;
  }
  return e;
}
const lt = () => {
};
function je(e, s, n, t = lt) {
  e.push(s);
  const o = () => {
    const i = e.indexOf(s);
    i > -1 && (e.splice(i, 1), t());
  };
  return !n && Tt() && wt(o), o;
}
function X(e, ...s) {
  e.slice().forEach((n) => {
    n(...s);
  });
}
const Zt = (e) => e();
function Qe(e, s) {
  e instanceof Map && s instanceof Map && s.forEach((n, t) => e.set(t, n)), e instanceof Set && s instanceof Set && s.forEach(e.add, e);
  for (const n in s) {
    if (!s.hasOwnProperty(n))
      continue;
    const t = s[n], o = e[n];
    W(o) && W(t) && e.hasOwnProperty(n) && !ae(t) && !$e(t) ? e[n] = Qe(o, t) : e[n] = t;
  }
  return e;
}
const en = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function tn(e) {
  return !W(e) || !e.hasOwnProperty(en);
}
const { assign: L } = Object;
function De(e) {
  return !!(ae(e) && e.effect);
}
function ze(e, s, n, t) {
  const { state: o, actions: i, getters: r } = s, a = n.state.value[e];
  let u;
  function c() {
    !a && (process.env.NODE_ENV === "production" || !t) && (n.state.value[e] = o ? o() : {});
    const m = process.env.NODE_ENV !== "production" && t ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Ae(Q(o ? o() : {}).value)
    ) : Ae(n.state.value[e]);
    return L(m, i, Object.keys(r || {}).reduce((f, g) => (process.env.NODE_ENV !== "production" && g in m && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${g}" in store "${e}".`), f[g] = J(qe(() => {
      ue(n);
      const b = n._s.get(e);
      return r[g].call(b, b);
    })), f), {}));
  }
  return u = Ee(e, c, s, n, t, !0), u;
}
function Ee(e, s, n = {}, t, o, i) {
  let r;
  const a = L({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !t._e.active)
    throw new Error("Pinia destroyed");
  const u = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Ke && (u.onTrigger = (d) => {
    c ? b = d : c == !1 && !_._hotUpdating && (Array.isArray(b) ? b.push(d) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let c, m, f = [], g = [], b;
  const M = t.state.value[e];
  !i && !M && (process.env.NODE_ENV === "production" || !o) && (t.state.value[e] = {});
  const ne = Q({});
  let le;
  function de(d) {
    let l;
    c = m = !1, process.env.NODE_ENV !== "production" && (b = []), typeof d == "function" ? (d(t.state.value[e]), l = {
      type: D.patchFunction,
      storeId: e,
      events: b
    }) : (Qe(t.state.value[e], d), l = {
      type: D.patchObject,
      payload: d,
      storeId: e,
      events: b
    });
    const y = le = Symbol();
    Pe().then(() => {
      le === y && (c = !0);
    }), m = !0, X(f, l, t.state.value[e]);
  }
  const T = i ? function() {
    const { state: l } = n, y = l ? l() : {};
    this.$patch((q) => {
      L(q, y);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : lt
  );
  function w() {
    r.stop(), f = [], g = [], t._s.delete(e);
  }
  function O(d, l) {
    return function() {
      ue(t);
      const y = Array.from(arguments), q = [], se = [];
      function gt(C) {
        q.push(C);
      }
      function vt(C) {
        se.push(C);
      }
      X(g, {
        args: y,
        name: d,
        store: _,
        after: gt,
        onError: vt
      });
      let oe;
      try {
        oe = l.apply(this && this.$id === e ? this : _, y);
      } catch (C) {
        throw X(se, C), C;
      }
      return oe instanceof Promise ? oe.then((C) => (X(q, C), C)).catch((C) => (X(se, C), Promise.reject(C))) : (X(q, oe), oe);
    };
  }
  const x = /* @__PURE__ */ J({
    actions: {},
    getters: {},
    state: [],
    hotState: ne
  }), Y = {
    _p: t,
    // _s: scope,
    $id: e,
    $onAction: je.bind(null, g),
    $patch: de,
    $reset: T,
    $subscribe(d, l = {}) {
      const y = je(f, d, l.detached, () => q()), q = r.run(() => He(() => t.state.value[e], (se) => {
        (l.flush === "sync" ? m : c) && d({
          storeId: e,
          type: D.direct,
          events: b
        }, se);
      }, L({}, u, l)));
      return y;
    },
    $dispose: w
  }, _ = St(process.env.NODE_ENV !== "production" || re ? L(
    {
      _hmrPayload: x,
      _customProperties: J(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    Y
    // must be added later
    // setupStore
  ) : Y);
  t._s.set(e, _);
  const B = (t._a && t._a.runWithContext || Zt)(() => t._e.run(() => (r = Fe()).run(s)));
  for (const d in B) {
    const l = B[d];
    if (ae(l) && !De(l) || $e(l))
      process.env.NODE_ENV !== "production" && o ? fe(ne.value, d, ye(B, d)) : i || (M && tn(l) && (ae(l) ? l.value = M[d] : Qe(l, M[d])), t.state.value[e][d] = l), process.env.NODE_ENV !== "production" && x.state.push(d);
    else if (typeof l == "function") {
      const y = process.env.NODE_ENV !== "production" && o ? l : O(d, l);
      B[d] = y, process.env.NODE_ENV !== "production" && (x.actions[d] = l), a.actions[d] = l;
    } else
      process.env.NODE_ENV !== "production" && De(l) && (x.getters[d] = i ? (
        // @ts-expect-error
        n.getters[d]
      ) : l, be && (B._getters || // @ts-expect-error: same
      (B._getters = J([]))).push(d));
  }
  if (L(_, B), L(ve(_), B), Object.defineProperty(_, "$state", {
    get: () => process.env.NODE_ENV !== "production" && o ? ne.value : t.state.value[e],
    set: (d) => {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error("cannot set hotState");
      de((l) => {
        L(l, d);
      });
    }
  }), process.env.NODE_ENV !== "production" && (_._hotUpdate = J((d) => {
    _._hotUpdating = !0, d._hmrPayload.state.forEach((l) => {
      if (l in _.$state) {
        const y = d.$state[l], q = _.$state[l];
        typeof y == "object" && W(y) && W(q) ? ct(y, q) : d.$state[l] = q;
      }
      fe(_, l, ye(d.$state, l));
    }), Object.keys(_.$state).forEach((l) => {
      l in d.$state || Se(_, l);
    }), c = !1, m = !1, t.state.value[e] = ye(d._hmrPayload, "hotState"), m = !0, Pe().then(() => {
      c = !0;
    });
    for (const l in d._hmrPayload.actions) {
      const y = d[l];
      fe(_, l, O(l, y));
    }
    for (const l in d._hmrPayload.getters) {
      const y = d._hmrPayload.getters[l], q = i ? (
        // special handling of options api
        qe(() => (ue(t), y.call(_, _)))
      ) : y;
      fe(_, l, q);
    }
    Object.keys(_._hmrPayload.getters).forEach((l) => {
      l in d._hmrPayload.getters || Se(_, l);
    }), Object.keys(_._hmrPayload.actions).forEach((l) => {
      l in d._hmrPayload.actions || Se(_, l);
    }), _._hmrPayload = d._hmrPayload, _._getters = d._getters, _._hotUpdating = !1;
  })), re) {
    const d = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((l) => {
      Object.defineProperty(_, l, L({ value: _[l] }, d));
    });
  }
  return t._p.forEach((d) => {
    if (re) {
      const l = r.run(() => d({
        store: _,
        app: t._a,
        pinia: t,
        options: a
      }));
      Object.keys(l || {}).forEach((y) => _._customProperties.add(y)), L(_, l);
    } else
      L(_, r.run(() => d({
        store: _,
        app: t._a,
        pinia: t,
        options: a
      })));
  }), process.env.NODE_ENV !== "production" && _.$state && typeof _.$state == "object" && typeof _.$state.constructor == "function" && !_.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${_.$id}".`), M && i && n.hydrate && n.hydrate(_.$state, M), c = !0, m = !0, _;
}
function nn(e, s, n) {
  let t, o;
  const i = typeof s == "function";
  t = e, o = i ? n : s;
  function r(a, u) {
    const c = bt();
    if (a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && ie && ie._testing ? null : a) || (c ? Be(et, null) : null), a && ue(a), process.env.NODE_ENV !== "production" && !ie)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    a = ie, a._s.has(t) || (i ? Ee(t, s, o, a) : ze(t, o, a), process.env.NODE_ENV !== "production" && (r._pinia = a));
    const m = a._s.get(t);
    if (process.env.NODE_ENV !== "production" && u) {
      const f = "__hot:" + t, g = i ? Ee(f, s, o, a, !0) : ze(f, L({}, o), a, !0);
      u._hotUpdate(g), delete a.state.value[f], a._s.delete(f);
    }
    if (process.env.NODE_ENV !== "production" && be) {
      const f = yt();
      if (f && f.proxy && // avoid adding stores that are just built for hot module replacement
      !u) {
        const g = f.proxy, b = "_pStores" in g ? g._pStores : g._pStores = {};
        b[t] = m;
      }
    }
    return m;
  }
  return r.$id = t, r;
}
const sn = ["id", "checked"], on = ["for", "innerHTML"], rn = /* @__PURE__ */ I({
  __name: "MCQOption",
  props: {
    optionKey: {},
    checked: { type: Boolean },
    option: {},
    submitted: { type: Boolean }
  },
  emits: ["selectOption"],
  setup(e, { emit: s }) {
    const n = s, t = () => n("selectOption");
    return (o, i) => (h(), v(R, null, [
      (h(), v("input", {
        id: "option-" + o.optionKey,
        key: o.optionKey,
        "test-id": "radio_options",
        type: "radio",
        name: "options",
        checked: o.checked,
        class: F(o.submitted && "ignore-hover")
      }, null, 10, sn)),
      (h(), v("label", {
        key: o.optionKey,
        for: "option-" + o.optionKey,
        class: F(o.submitted ? "mcq-option-label ignore-hover" : "mcq-option-label"),
        onClick: i[0] || (i[0] = (r) => t()),
        innerHTML: o.option.optionValue
      }, null, 10, on))
    ], 64));
  }
}), A = (e, s) => {
  const n = e.__vccOpts || e;
  for (const [t, o] of s)
    n[t] = o;
  return n;
}, an = /* @__PURE__ */ A(rn, [["__scopeId", "data-v-fdbfedc6"]]), un = ["disabled"], cn = /* @__PURE__ */ I({
  __name: "MCQButton",
  props: {
    submitted: { type: Boolean },
    selectedOption: {},
    hideSkip: { type: Boolean }
  },
  emits: ["submitAnswer", "nextQuestion", "skipQuestion"],
  setup(e, { emit: s }) {
    const n = Q("skip"), t = Q("Skip"), o = s, i = (u, c) => {
      !u && c ? r("next", "Next", "submitAnswer") : u && c ? r("skip", "Skip", "nextQuestion") : !u && !c && r("skip", "Skip", "skipQuestion");
    }, r = (u, c, m) => {
      n.value = u, t.value = c, o(m);
    }, a = (u, c) => u && c ? { class: "next", text: "Next" } : !u && c ? { class: "submit", text: "Submit" } : { class: n.value, text: t.value };
    return (u, c) => (h(), v("div", null, [
      p("button", {
        disabled: u.hideSkip && a(u.submitted, u.selectedOption).class === "skip",
        class: F(["mcq-button", a(u.submitted, u.selectedOption).class]),
        onClick: c[0] || (c[0] = (m) => i(u.submitted, u.selectedOption))
      }, k(a(u.submitted, u.selectedOption).text), 11, un)
    ]));
  }
}), ln = /* @__PURE__ */ A(cn, [["__scopeId", "data-v-847b8dd5"]]), dn = /* @__PURE__ */ I({
  __name: "NextButton",
  props: {
    buttonName: {}
  },
  emits: ["nextQuestion", "prevQuestion"],
  setup(e, { emit: s }) {
    const { buttonName: n } = e, t = s, o = () => {
      i(n !== "←" ? "nextQuestion" : "prevQuestion");
    }, i = (r) => {
      t(r);
    };
    return (r, a) => (h(), v("div", null, [
      p("button", {
        class: F(r.buttonName === "Submit" ? "submit_btn" : "mcq-button"),
        onClick: a[0] || (a[0] = (u) => o())
      }, k(r.buttonName), 3)
    ]));
  }
}), Ue = /* @__PURE__ */ A(dn, [["__scopeId", "data-v-8be7f61e"]]), fn = (e) => {
  for (let s = e.length - 1; s > 0; s--) {
    const n = Math.floor(Math.random() * (s + 1));
    [e[s], e[n]] = [e[n], e[s]];
  }
  return e;
}, pn = (e, s) => fn(s).slice(0, e);
function dt(e) {
  const s = e.reduce(
    (t, o) => (Object.keys(o).forEach((i) => {
      typeof i == "string" && i.trim() !== "" && (t[i] || (t[i] = /* @__PURE__ */ new Set()), t[i].add(o[i]));
    }), t),
    {}
  );
  return Object.keys(s).reduce(
    (t, o) => (t[o] = [...s[o]], t),
    {}
  );
}
function Le(e, s) {
  return e.filter((n) => Object.keys(s).every((t) => !s[t].length || s[t].includes(n.tags[t])));
}
function hn(e, s, n) {
  const t = e[s].question.optionsList;
  for (let o = 0; o < t.length; o++)
    if (t[o].optionValue === n)
      return o;
}
const ft = (e, s) => s.findIndex((n) => {
  var t;
  return ((t = n.question._id) == null ? void 0 : t.$oid) === e;
}), z = nn("questionsQueue", {
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
      return Le(e, this.selectedTags).length;
    },
    setselectedTags(e) {
      this.selectedTags = e;
    },
    getselectedtags() {
      return this.selectedTags;
    },
    modifySelectedTags(e, { category: s, topic: n }) {
      this.selectedTags[s] && (this.selectedTags[s] = e ? [...this.selectedTags[s], n] : this.selectedTags[s].filter(
        (t) => t !== n
      ));
    },
    initialiseQuiz(e, s) {
      this.questionsQueue = e, this.questionsStack = [], this.quizMode = s, this.quizStats = e.map((n) => ({
        question: n,
        correct: 0,
        skipped: 0,
        attempts: 0,
        selectedValue: ""
      }));
    },
    incrementStat(e, s, n) {
      const t = ft(e, this.quizStats);
      if (this.quizStats[t]) {
        if (n !== void 0) {
          if (this.quizStats[t][s]++, n === "-1") {
            this.quizStats[t].selectedValue = "Reached Time Limit";
            return;
          }
          const o = this.quizStats[t].question.optionsList.map((i) => i.optionCorrect).indexOf(!0);
          Number(n) === Number(o) ? this.quizStats[t].correct = 1 : this.quizStats[t].correct = 0;
        }
        this.quizStats[t].selectedValue = n !== void 0 ? this.quizStats[t].question.optionsList[Number(n)].optionValue : "";
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
}), mn = ["innerHTML"], _n = { class: "mcq-list" }, gn = ["onClick"], vn = { class: "next-prev-question" }, bn = /* @__PURE__ */ I({
  __name: "MCQQuestion",
  props: {
    _id: {},
    statement: {},
    optionsList: {}
  },
  emits: ["nextQuestion", "skipQuestion", "prevQuestion"],
  setup(e, { emit: s }) {
    const n = z(), t = Q(null), o = Q(!1), i = s, r = Q(n.getRemainingQuestions()), a = () => {
      o.value = !0;
    }, u = () => {
      t.value = null, i("nextQuestion");
    }, c = () => {
      g(), r.value = n.getRemainingQuestions(), i("nextQuestion");
    }, m = () => {
      g(), i("skipQuestion");
    }, f = (T) => n.incrementStat(
      T.$oid,
      "attempts",
      t.value ?? void 0
    ), g = () => {
      o.value = !1, t.value = null;
    }, b = () => {
      t.value = null, i("prevQuestion");
    }, M = (T, w) => {
      o.value || (t.value = t.value === w ? null : w), f(T);
    }, ne = (T, w, O) => n.quizMode === "Timed" ? le(T, w) : de(w, O);
    function le(T, w) {
      const O = ft(T.$oid, n.quizStats), x = n.quizStats[O].selectedValue, Y = hn(
        n.quizStats,
        O,
        x
      );
      return String(Y) === w ? (t.value = w, "selected") : "";
    }
    function de(T, w) {
      const O = w[parseInt(T)], x = t.value === T;
      return o.value ? O.optionCorrect ? "correct ignore-hover" : x ? "wrong ignore-hover" : "ignore-hover" : x ? "selected" : "";
    }
    return (T, w) => (h(), v(R, null, [
      p("div", {
        class: "mcq-statement",
        innerHTML: T.statement
      }, null, 8, mn),
      p("div", _n, [
        (h(!0), v(R, null, ee(Object.entries(T.optionsList), ([O, x]) => (h(), v("div", {
          key: O,
          class: F(["mcq-option", ne(T._id, O, T.optionsList)]),
          onClick: (Y) => M(T._id, O)
        }, [
          te(an, {
            "option-key": O,
            checked: t.value === O,
            option: x,
            submitted: o.value,
            onSelectOption: (Y) => M(T._id, O)
          }, null, 8, ["option-key", "checked", "option", "submitted", "onSelectOption"])
        ], 10, gn))), 128))
      ]),
      S(n).quizMode === "Tutor" ? (h(), j(ln, {
        key: 0,
        submitted: o.value,
        "selected-option": t.value,
        "hide-skip": r.value <= 1,
        onSubmitAnswer: a,
        onNextQuestion: w[0] || (w[0] = (O) => c()),
        onSkipQuestion: m
      }, null, 8, ["submitted", "selected-option", "hide-skip"])) : N("", !0),
      p("div", vn, [
        S(n).quizMode === "Timed" ? (h(), j(Ue, {
          key: 0,
          "button-name": S(n).questionsQueue.length >= 1 ? "→" : "Submit",
          onNextQuestion: w[1] || (w[1] = (O) => u())
        }, null, 8, ["button-name"])) : N("", !0),
        S(n).quizMode === "Timed" && S(n).questionsStack.length > 1 ? (h(), j(Ue, {
          key: 1,
          "button-name": "←",
          onPrevQuestion: w[2] || (w[2] = (O) => b())
        })) : N("", !0)
      ])
    ], 64));
  }
}), pt = /* @__PURE__ */ A(bn, [["__scopeId", "data-v-f5ec9042"]]), yn = (e) => (Ge("data-v-4ffecbcd"), e = e(), Je(), e), Sn = { class: "report-container" }, Tn = { class: "mcq-report" }, wn = { class: "table-container" }, On = /* @__PURE__ */ yn(() => /* @__PURE__ */ p("thead", null, [
  /* @__PURE__ */ p("tr", null, [
    /* @__PURE__ */ p("th", null, "question"),
    /* @__PURE__ */ p("th", null, "correct option"),
    /* @__PURE__ */ p("th", null, "your answer")
  ])
], -1)), Qn = { class: "question-row" }, En = ["href", "innerHTML"], kn = { class: "answer-row" }, $n = ["innerHTML"], qn = { class: "answer-row" }, Nn = ["innerHTML"], In = { class: "mcq-result" }, Cn = { class: "score" }, Ln = /* @__PURE__ */ I({
  __name: "MCQStatus",
  setup(e) {
    const s = z(), n = s.quizStats, t = s.quizStats.length, o = n.filter((r) => r.correct === 1).length, i = (o * 100 / t).toFixed(0);
    return (r, a) => (h(), v("div", Sn, [
      p("div", Tn, [
        p("div", wn, [
          p("table", null, [
            On,
            p("tbody", null, [
              (h(!0), v(R, null, ee(Object.entries(S(n)), ([u, c]) => (h(), v("tr", {
                key: u,
                class: "quiz-statment"
              }, [
                p("td", Qn, [
                  p("a", {
                    href: c.question.link,
                    target: "_blank",
                    innerHTML: c.question.statement
                  }, null, 8, En)
                ]),
                p("td", kn, [
                  (h(!0), v(R, null, ee(Object.entries(
                    c.question.optionsList
                  ), ([m, f]) => (h(), v("span", { key: m }, [
                    f.optionCorrect ? (h(), v("span", {
                      key: 0,
                      innerHTML: f.optionValue
                    }, null, 8, $n)) : N("", !0)
                  ]))), 128))
                ]),
                p("td", qn, [
                  p("span", {
                    class: F(
                      c.correct === 1 ? "correct-answer" : "wrong-answer"
                    ),
                    innerHTML: c.correct === 1 ? "<span> ✔</span> " : "<span> ✘</span> <span>     </span>" + c.selectedValue
                  }, null, 10, Nn)
                ])
              ]))), 128))
            ])
          ])
        ])
      ]),
      p("div", null, [
        p("div", In, [
          p("span", Cn, "⌛ Result: " + k(S(o)) + " out of " + k(S(t)) + " - (" + k(S(i)) + " %)", 1)
        ])
      ])
    ]));
  }
}), ht = /* @__PURE__ */ A(Ln, [["__scopeId", "data-v-4ffecbcd"]]), Pn = { class: "questions-left-header" }, An = /* @__PURE__ */ I({
  __name: "MCQQuiz",
  setup(e) {
    const s = Q(), n = z();
    Ne(() => {
      o();
    });
    const t = () => {
      n.enqueueQuestion(s.value), s.value = n.dequeueQuestion();
    }, o = () => {
      n.setAnsweredQuestionsNum(), s.value = n.dequeueQuestion();
    }, i = () => window.location.reload();
    return (r, a) => {
      const u = Ot("MCQInfoPanel");
      return h(), v("main", null, [
        te(u),
        p("h3", Pn, " Question " + k(S(n).getAnsweredQuestionsNum()) + " out of " + k(S(n).quizStats.length), 1),
        s.value ? (h(), j(pt, {
          key: 0,
          statement: s.value.statement,
          "options-list": s.value.optionsList,
          _id: s.value._id,
          onNextQuestion: o,
          onSkipQuestion: t
        }, null, 8, ["statement", "options-list", "_id"])) : N("", !0),
        s.value ? N("", !0) : (h(), j(ht, { key: 1 })),
        s.value ? N("", !0) : (h(), v("button", {
          key: 2,
          class: "btn-relocate",
          onClick: i
        }, " End "))
      ]);
    };
  }
}), Mn = /* @__PURE__ */ A(An, [["__scopeId", "data-v-edc7c7f1"]]), xn = {
  key: 0,
  class: "time-left-header"
}, Vn = { class: "questions-left-header" }, jn = /* @__PURE__ */ I({
  __name: "MCQInfoPanel",
  props: {
    timeLeft: {
      type: Number,
      default: 0
    }
  },
  setup(e) {
    const s = z(), n = (t) => {
      const o = Math.floor(t / 60), i = t % 60;
      return `${o}:${i < 10 ? "0" : ""}${i}`;
    };
    return (t, o) => (h(), v(R, null, [
      e.timeLeft ? (h(), v("h3", xn, " Time left: " + k(n(e.timeLeft)), 1)) : N("", !0),
      p("h3", Vn, " Question " + k(S(s).questionsStack.length) + " out of " + k(S(s).quizStats.length), 1)
    ], 64));
  }
}), Re = 1e3, Dn = "-1", zn = /* @__PURE__ */ I({
  __name: "MCQTimedQuiz",
  setup(e) {
    const s = z(), n = Q();
    let t = null, o = null;
    const i = Q(s.timeLimit);
    Ne(() => {
      a();
    }), We(() => {
      c(), m();
    });
    const r = () => {
      n.value = s.removeFromLastHistory() ?? n.value;
    }, a = () => n.value = s.dequeueQuestion(), u = () => window.location.reload(), c = () => {
      t && clearTimeout(t), o && clearInterval(o);
    }, m = () => {
      i.value = s.timeLimit;
      const g = () => n.value ? i.value ? i.value-- : f() : c();
      o = window.setInterval(g, Re), t = window.setTimeout(() => {
      }, s.timeLimit * Re);
    }, f = () => {
      var b;
      c();
      const g = (M) => s.incrementStat(M, "attempts", Dn);
      for (g(((b = n.value) == null ? void 0 : b._id.$oid) ?? ""); n.value = s.dequeueQuestion(); )
        g(n.value._id.$oid);
      return alert("Time's up! Quiz has ended."), a();
    };
    return (g, b) => (h(), v("main", null, [
      te(jn, { "time-left": i.value }, null, 8, ["time-left"]),
      n.value ? (h(), j(pt, {
        key: 0,
        statement: n.value.statement,
        "options-list": n.value.optionsList,
        _id: n.value._id,
        onNextQuestion: a,
        onPrevQuestion: r
      }, null, 8, ["statement", "options-list", "_id"])) : N("", !0),
      n.value ? N("", !0) : (h(), j(ht, { key: 1 })),
      n.value ? N("", !0) : (h(), v("button", {
        key: 2,
        class: "btn-relocate",
        onClick: u
      }, " End "))
    ]));
  }
}), Un = /* @__PURE__ */ A(zn, [["__scopeId", "data-v-4fd74e68"]]), Rn = ["id", "name", "value", "disabled"], Fn = ["for"], Bn = {
  key: 0,
  class: "question-number"
}, Hn = /* @__PURE__ */ I({
  __name: "FilterCheckbox",
  props: {
    category: {},
    topics: {}
  },
  setup(e) {
    const { category: s, topics: n } = e, t = z(), o = (u) => s === "course" ? u.toUpperCase() : u, i = qe(
      () => Object.entries(n).map(([u, c]) => {
        const m = a(c, s);
        return { idx: u, topic: c, num: m };
      }).filter(({ topic: u }) => u !== void 0)
    ), r = (u) => {
      if (!(u.target instanceof HTMLInputElement))
        return console.error("Trying to click on non-input element");
      const c = u.target.name, m = u.target.value;
      t.modifySelectedTags(u.target.checked, { category: c, topic: m });
    }, a = (u, c) => {
      var b;
      const m = t.getselectedtags();
      if (!m[c] || (b = m[c]) != null && b.includes(
        u
      ))
        return null;
      const f = JSON.parse(
        JSON.stringify(t.getselectedtags())
      );
      f[c].includes(u) || f[c].push(u);
      const g = t.allQs;
      return Le(
        g,
        f
      ).length.toString();
    };
    return (u, c) => (h(), v("ul", null, [
      (h(!0), v(R, null, ee(i.value, ({ idx: m, num: f, topic: g }) => (h(), v("li", {
        key: m,
        class: F(["filter-options", { "grey-out": f === "0" }])
      }, [
        p("input", {
          id: `${u.category}-${g}-checkbox`,
          type: "checkbox",
          name: u.category,
          value: g,
          disabled: f === "0",
          onChange: c[0] || (c[0] = (b) => r(b))
        }, null, 40, Rn),
        p("label", {
          for: `${u.category}-${g}-checkbox`
        }, [
          Ye(k(o(g)) + " ", 1),
          f !== null && f !== "0" ? (h(), v("span", Bn, k(f), 1)) : N("", !0)
        ], 8, Fn)
      ], 2))), 128))
    ]));
  }
}), Gn = /* @__PURE__ */ A(Hn, [["__scopeId", "data-v-e575c3ac"]]), Jn = { class: "filter" }, Wn = { class: "category-heading" }, Yn = /* @__PURE__ */ I({
  __name: "MCQTagOptions",
  setup(e) {
    const t = z().allQs.map((i) => i.tags), o = dt(t);
    return (i, r) => (h(), v("div", Jn, [
      (h(!0), v(R, null, ee(Object.entries(S(o)), ([a, u]) => (h(), v("div", {
        key: a,
        class: "category"
      }, [
        p("h2", Wn, k(a), 1),
        te(Gn, {
          category: a,
          topics: u
        }, null, 8, ["category", "topics"])
      ]))), 128))
    ]));
  }
}), Kn = /* @__PURE__ */ A(Yn, [["__scopeId", "data-v-efaccb2c"]]), Xn = { for: "optionName" }, Zn = ["value"], es = /* @__PURE__ */ I({
  __name: "DropDownbox",
  props: {
    options: {},
    optionName: {},
    disabled: { type: Boolean }
  },
  setup(e) {
    const s = z(), n = Q(0);
    function t(o) {
      const i = o.target;
      i.value && (n.value = parseFloat(i.value) * 60, s.setTimeLimit(n.value));
    }
    return (o, i) => (h(), v("div", {
      class: F(o.disabled ? "dropdown input-disabled" : "dropdown")
    }, [
      p("label", Xn, k(o.optionName) + ":   ", 1),
      p("select", {
        id: "optionName",
        name: "optionName",
        onChange: t
      }, [
        (h(!0), v(R, null, ee(o.options, (r) => (h(), v("option", {
          key: r.value,
          value: r.value
        }, k(r.value) + " " + k(r.unit), 9, Zn))), 128))
      ], 32)
    ], 2));
  }
}), ts = /* @__PURE__ */ A(es, [["__scopeId", "data-v-5f3ae97a"]]), ce = (e) => (Ge("data-v-c3d686ea"), e = e(), Je(), e), ns = { class: "start-page-container" }, ss = /* @__PURE__ */ ce(() => /* @__PURE__ */ p("h1", null, "VetCloud Smart Quiz", -1)), os = { class: "quiz-config-container" }, is = { class: "question-config-container" }, rs = { class: "tag-text" }, as = { class: "question-number" }, us = { class: "question-amount-container" }, cs = /* @__PURE__ */ ce(() => /* @__PURE__ */ p("label", { for: "question-amount" }, "Select the amount of questions:", -1)), ls = ["max"], ds = {
  key: 0,
  class: "show-max-msg"
}, fs = /* @__PURE__ */ ce(() => /* @__PURE__ */ p("label", { for: "mode-select" }, "Select mode:", -1)), ps = /* @__PURE__ */ ce(() => /* @__PURE__ */ p("option", { value: "Tutor" }, "Tutor", -1)), hs = /* @__PURE__ */ ce(() => /* @__PURE__ */ p("option", { value: "Timed" }, "Timed", -1)), ms = [
  ps,
  hs
], _s = 3e3, gs = /* @__PURE__ */ I({
  __name: "StartPage",
  emits: ["start-quiz"],
  setup(e, { emit: s }) {
    const n = Q(1), t = Q("Tutor"), o = Q(!1), i = Q(null), r = s, a = z();
    Ne(() => {
      Qt(() => {
        const m = a.getquestionnumber();
        n.value = Math.min(10, m);
      });
    });
    const u = () => {
      r("start-quiz", {
        questionAmount: n.value,
        mode: t.value
      });
    }, c = () => {
      i.value && clearTimeout(i.value), n.value > a.getquestionnumber() && (n.value = a.getquestionnumber(), o.value = !0, i.value = window.setTimeout(() => {
        o.value = !1;
      }, _s));
    };
    return (m, f) => (h(), v("div", ns, [
      ss,
      te(Kn),
      p("div", os, [
        p("div", is, [
          p("p", rs, [
            Ye(" Maximum possible questions: "),
            p("span", as, k(S(a).getquestionnumber()), 1)
          ]),
          p("div", us, [
            cs,
            Me(p("input", {
              id: "question-amount",
              "onUpdate:modelValue": f[0] || (f[0] = (g) => n.value = g),
              type: "number",
              placeholder: "Question amount",
              min: "1",
              max: S(a).getquestionnumber(),
              onInput: c
            }, null, 40, ls), [
              [
                Et,
                n.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o.value ? (h(), v("p", ds, " Cannot select more than " + k(S(a).getquestionnumber()) + " questions. ", 1)) : N("", !0),
          p("div", null, [
            fs,
            Me(p("select", {
              id: "mode-select",
              "onUpdate:modelValue": f[1] || (f[1] = (g) => t.value = g)
            }, ms, 512), [
              [kt, t.value]
            ])
          ]),
          te(ts, {
            options: [
              { value: 1, label: "Time Option 2", unit: "Min." },
              { value: 1.5, label: "Time Option 1", unit: "Min." }
            ],
            "option-name": "Time per Question",
            class: F(t.value === "Timed" ? "" : "input-disabled"),
            disabled: t.value !== "Timed"
          }, null, 8, ["options", "class", "disabled"])
        ])
      ]),
      p("button", {
        class: "start-button",
        onClick: u
      }, "Start")
    ]));
  }
}), vs = /* @__PURE__ */ A(gs, [["__scopeId", "data-v-c3d686ea"]]), bs = (e) => e.trim().toLowerCase().replace("_", " "), ys = (e) => e.reduce((s, n) => {
  if (!n.includes(":"))
    return s;
  let [t, o] = n.split(":");
  return [t, o] = [t.trim().toLowerCase(), bs(o)], s[t] = o, s;
}, {}), Ss = (e) => e.map((s) => ({
  _id: { $oid: s._id.$oid },
  statement: s.statement,
  tags: ys(s.tags),
  optionsList: s.optionsList,
  link: s.link
})), Ts = { convertQuestions: Ss }, P = {
  isString: (r) => typeof r == "string",
  isObject: (r) => typeof r == "object" && r !== null,
  isBoolean: (r) => typeof r == "boolean",
  isArray: (r, a) => Array.isArray(r) && r.every(a),
  isNumber: (r) => typeof r == "number",
  isFunction: (r) => typeof r == "function"
};
function ke(e) {
  const s = e.includes(":") && e.split(":").length === 2, n = !e.includes(":") && !e.includes(" ");
  return s || n;
}
function mt(e, s = !1) {
  return P.isArray(e, P.isString) ? s ? e.every(ke) : e.some(ke) : !1;
}
function ws(e) {
  return P.isObject(e) && P.isString(e.optionValue) && (e.optionCorrect === void 0 || P.isBoolean(e.optionCorrect));
}
function _t(e) {
  return P.isObject(e) && P.isObject(e._id) && // Assuming _id is an object with $oid property
  P.isString(e._id.$oid) && P.isString(e.statement) && mt(e.tags) && // Modified to ensure tags are always checked
  P.isArray(e.optionsList, ws) && P.isString(e.link);
}
function Os(e) {
  return P.isArray(e, _t);
}
const pe = {
  isMCQuestion: _t,
  isMCQuestionArray: Os,
  validateTags: mt,
  isTag: ke
}, Qs = (e) => {
  try {
    if (!e)
      throw new Error("No question data found. Please Try again later.");
    return Ts.convertQuestions(Es(e));
  } catch (s) {
    return alert(s), [];
  }
};
function Es(e) {
  pe.isMCQuestionArray(e) ? console.info(
    "%cAll questions are valid",
    "color: #00FF00",
    `
Total Questions Validated:`,
    e.length
  ) : console.warn(
    "%cWARNING: Some questions contains invalid structure",
    "color: #FF0000"
  );
  const s = {
    invalidTags: 0,
    noTags: 0,
    invalidQs: 0,
    totalTags: 0
  }, n = e.reduce((t, o) => {
    if (!pe.isMCQuestion(o))
      return { ...t, invalidQs: t.invalidQs + 1 };
    let { tags: i } = o;
    if (!i || Array.isArray(i) && !i.length)
      return { ...t, noTags: t.noTags + 1 };
    const r = t.totalTags + i.length;
    if (!pe.validateTags(i, !0)) {
      const a = i.filter((c) => pe.isTag(c)), u = t.invalidTags + i.length - a.length;
      return i = a, { ...t, invalidTags: u, totalTags: r };
    }
    return { ...t, totalTags: r };
  }, s);
  return ks(n, e.length), e;
}
function Te(e, s) {
  e && console.warn(s, "color: #FF0000");
}
function ks(e, s) {
  const { invalidQs: n, invalidTags: t, noTags: o, totalTags: i } = e;
  Te(
    n,
    `Invalid Questions Received: %c${n} out of ${s}`
  ), Te(
    t,
    `Filtering out invalid tags: %c${t} out of ${i}`
  ), Te(o, `Questions with no tags: %c${o}`);
}
const $s = /* @__PURE__ */ I({
  __name: "CrucibleComponent",
  setup(e) {
    const s = Q(0), n = z(), t = Q(!1), o = Q([]), i = Be("$dataLink");
    We(() => {
      o.value = Qs(i.data.questions), console.info("All Questions:", o.value), n.allQs = o.value;
      const a = dt(
        o.value.map((u) => u.tags)
      );
      n.setselectedTags(
        Object.keys(a).reduce((u, c) => ({ ...u, [c]: [] }), {})
      );
    });
    const r = ({ questionAmount: a, mode: u }) => {
      const c = n.getselectedtags();
      if (!o.value.length)
        return alert("Trouble fetching questions, please try again later");
      const m = Le(
        o.value,
        c
      ), f = pn(a, m);
      s.value = f.length, n.initialiseQuiz(f, u), u === "Timed" && n.setTimeLimit(a * n.timeLimit), t.value = !0;
    };
    return (a, u) => t.value && S(n).quizMode === "Tutor" ? (h(), j(Mn, { key: 0 })) : t.value && S(n).quizMode === "Timed" ? (h(), j(Un, { key: 1 })) : (h(), j(vs, {
      key: 2,
      onStartQuiz: r
    }));
  }
}), qs = /* @__PURE__ */ A($s, [["__scopeId", "data-v-b0b475ef"]]), Ns = {
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
};
function Ls(e, s = {}) {
  const n = Xt();
  e.use(n), e.component("CrucibleComponent", qs), e.provide("$dataLink", s.dataLink || Ns);
}
export {
  qs as CrucibleComponent,
  Ls as createViewerPlugin,
  Ns as defaultData
};
