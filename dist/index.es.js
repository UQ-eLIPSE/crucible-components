import { effectScope as ze, ref as k, markRaw as F, hasInjectionContext as dt, inject as ft, getCurrentInstance as pt, toRaw as he, watch as Ue, reactive as ht, isRef as se, isReactive as ke, toRef as be, nextTick as Ce, computed as Oe, unref as w, getCurrentScope as mt, onScopeDispose as gt, toRefs as Ie, defineComponent as V, openBlock as h, createElementBlock as _, Fragment as A, normalizeClass as K, withModifiers as _t, createElementVNode as p, toDisplayString as $, renderList as X, createVNode as $e, createBlock as M, createCommentVNode as q, pushScopeId as Re, popScopeId as He, onMounted as Be, onBeforeMount as vt, createTextVNode as bt, withDirectives as Pe, vModelText as yt, vModelSelect as St } from "vue";
var Fe = !1;
function ue(e, n, t) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, n), e.splice(n, 1, t), t) : (e[n] = t, t);
}
function ye(e, n) {
  if (Array.isArray(e)) {
    e.splice(n, 1);
    return;
  }
  delete e[n];
}
function Et() {
  return Ge().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Ge() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const wt = typeof Proxy == "function", Tt = "devtools-plugin:setup", kt = "plugin:settings:set";
let W, Se;
function Ot() {
  var e;
  return W !== void 0 || (typeof window < "u" && window.performance ? (W = !0, Se = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (W = !0, Se = globalThis.perf_hooks.performance) : W = !1), W;
}
function $t() {
  return Ot() ? Se.now() : Date.now();
}
class Nt {
  constructor(n, t) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = n, this.hook = t;
    const o = {};
    if (n.settings)
      for (const r in n.settings) {
        const i = n.settings[r];
        o[r] = i.defaultValue;
      }
    const s = `__vue-devtools-plugin-settings__${n.id}`;
    let a = Object.assign({}, o);
    try {
      const r = localStorage.getItem(s), i = JSON.parse(r);
      Object.assign(a, i);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return a;
      },
      setSettings(r) {
        try {
          localStorage.setItem(s, JSON.stringify(r));
        } catch {
        }
        a = r;
      },
      now() {
        return $t();
      }
    }, t && t.on(kt, (r, i) => {
      r === this.plugin.id && this.fallbacks.setSettings(i);
    }), this.proxiedOn = new Proxy({}, {
      get: (r, i) => this.target ? this.target.on[i] : (...c) => {
        this.onQueue.push({
          method: i,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (r, i) => this.target ? this.target[i] : i === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(i) ? (...c) => (this.targetQueue.push({
        method: i,
        args: c,
        resolve: () => {
        }
      }), this.fallbacks[i](...c)) : (...c) => new Promise((u) => {
        this.targetQueue.push({
          method: i,
          args: c,
          resolve: u
        });
      })
    });
  }
  async setRealTarget(n) {
    this.target = n;
    for (const t of this.onQueue)
      this.target.on[t.method](...t.args);
    for (const t of this.targetQueue)
      t.resolve(await this.target[t.method](...t.args));
  }
}
function We(e, n) {
  const t = e, o = Ge(), s = Et(), a = wt && t.enableEarlyProxy;
  if (s && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a))
    s.emit(Tt, e, n);
  else {
    const r = a ? new Nt(t, s) : null;
    (o.__VUE_DEVTOOLS_PLUGINS__ = o.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: t,
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
let ne;
const ie = (e) => ne = e, Je = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function G(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var j;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(j || (j = {}));
const me = typeof window < "u", oe = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && me, Ve = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function qt(e, { autoBom: n = !1 } = {}) {
  return n && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Ne(e, n, t) {
  const o = new XMLHttpRequest();
  o.open("GET", e), o.responseType = "blob", o.onload = function() {
    Xe(o.response, n, t);
  }, o.onerror = function() {
    console.error("could not download file");
  }, o.send();
}
function Ye(e) {
  const n = new XMLHttpRequest();
  n.open("HEAD", e, !1);
  try {
    n.send();
  } catch {
  }
  return n.status >= 200 && n.status <= 299;
}
function le(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const t = document.createEvent("MouseEvents");
    t.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(t);
  }
}
const de = typeof navigator == "object" ? navigator : { userAgent: "" }, Ke = /Macintosh/.test(de.userAgent) && /AppleWebKit/.test(de.userAgent) && !/Safari/.test(de.userAgent), Xe = me ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Ke ? Qt : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in de ? Ct : (
      // Fallback to using FileReader and a popup
      It
    )
  )
) : () => {
};
function Qt(e, n = "download", t) {
  const o = document.createElement("a");
  o.download = n, o.rel = "noopener", typeof e == "string" ? (o.href = e, o.origin !== location.origin ? Ye(o.href) ? Ne(e, n, t) : (o.target = "_blank", le(o)) : le(o)) : (o.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(o.href);
  }, 4e4), setTimeout(function() {
    le(o);
  }, 0));
}
function Ct(e, n = "download", t) {
  if (typeof e == "string")
    if (Ye(e))
      Ne(e, n, t);
    else {
      const o = document.createElement("a");
      o.href = e, o.target = "_blank", setTimeout(function() {
        le(o);
      });
    }
  else
    navigator.msSaveOrOpenBlob(qt(e, t), n);
}
function It(e, n, t, o) {
  if (o = o || open("", "_blank"), o && (o.document.title = o.document.body.innerText = "downloading..."), typeof e == "string")
    return Ne(e, n, t);
  const s = e.type === "application/octet-stream", a = /constructor/i.test(String(Ve.HTMLElement)) || "safari" in Ve, r = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((r || s && a || Ke) && typeof FileReader < "u") {
    const i = new FileReader();
    i.onloadend = function() {
      let c = i.result;
      if (typeof c != "string")
        throw o = null, new Error("Wrong reader.result type");
      c = r ? c : c.replace(/^data:[^;]*;/, "data:attachment/file;"), o ? o.location.href = c : location.assign(c), o = null;
    }, i.readAsDataURL(e);
  } else {
    const i = URL.createObjectURL(e);
    o ? o.location.assign(i) : location.href = i, o = null, setTimeout(function() {
      URL.revokeObjectURL(i);
    }, 4e4);
  }
}
function T(e, n) {
  const t = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(t, n) : n === "error" ? console.error(t) : n === "warn" ? console.warn(t) : console.log(t);
}
function qe(e) {
  return "_a" in e && "install" in e;
}
function Ze() {
  if (!("clipboard" in navigator))
    return T("Your browser doesn't support the Clipboard API", "error"), !0;
}
function et(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (T('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Pt(e) {
  if (!Ze())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), T("Global state copied to clipboard.");
    } catch (n) {
      if (et(n))
        return;
      T("Failed to serialize the state. Check the console for more details.", "error"), console.error(n);
    }
}
async function Vt(e) {
  if (!Ze())
    try {
      tt(e, JSON.parse(await navigator.clipboard.readText())), T("Global state pasted from clipboard.");
    } catch (n) {
      if (et(n))
        return;
      T("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(n);
    }
}
async function xt(e) {
  try {
    Xe(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (n) {
    T("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(n);
  }
}
let D;
function Lt() {
  D || (D = document.createElement("input"), D.type = "file", D.accept = ".json");
  function e() {
    return new Promise((n, t) => {
      D.onchange = async () => {
        const o = D.files;
        if (!o)
          return n(null);
        const s = o.item(0);
        return n(s ? { text: await s.text(), file: s } : null);
      }, D.oncancel = () => n(null), D.onerror = t, D.click();
    });
  }
  return e;
}
async function Mt(e) {
  try {
    const t = await Lt()();
    if (!t)
      return;
    const { text: o, file: s } = t;
    tt(e, JSON.parse(o)), T(`Global state imported from "${s.name}".`);
  } catch (n) {
    T("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(n);
  }
}
function tt(e, n) {
  for (const t in n) {
    const o = e.state.value[t];
    o ? Object.assign(o, n[t]) : e.state.value[t] = n[t];
  }
}
function L(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const nt = "🍍 Pinia (root)", Ee = "_root";
function jt(e) {
  return qe(e) ? {
    id: Ee,
    label: nt
  } : {
    id: e.$id,
    label: e.$id
  };
}
function At(e) {
  if (qe(e)) {
    const t = Array.from(e._s.keys()), o = e._s;
    return {
      state: t.map((a) => ({
        editable: !0,
        key: a,
        value: e.state.value[a]
      })),
      getters: t.filter((a) => o.get(a)._getters).map((a) => {
        const r = o.get(a);
        return {
          editable: !1,
          key: a,
          value: r._getters.reduce((i, c) => (i[c] = r[c], i), {})
        };
      })
    };
  }
  const n = {
    state: Object.keys(e.$state).map((t) => ({
      editable: !0,
      key: t,
      value: e.$state[t]
    }))
  };
  return e._getters && e._getters.length && (n.getters = e._getters.map((t) => ({
    editable: !1,
    key: t,
    value: e[t]
  }))), e._customProperties.size && (n.customProperties = Array.from(e._customProperties).map((t) => ({
    editable: !0,
    key: t,
    value: e[t]
  }))), n;
}
function Dt(e) {
  return e ? Array.isArray(e) ? e.reduce((n, t) => (n.keys.push(t.key), n.operations.push(t.type), n.oldValue[t.key] = t.oldValue, n.newValue[t.key] = t.newValue, n), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: L(e.type),
    key: L(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function zt(e) {
  switch (e) {
    case j.direct:
      return "mutation";
    case j.patchFunction:
      return "$patch";
    case j.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let Y = !0;
const fe = [], B = "pinia:mutations", O = "pinia", { assign: Ut } = Object, pe = (e) => "🍍 " + e;
function Rt(e, n) {
  We({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: fe,
    app: e
  }, (t) => {
    typeof t.now != "function" && T("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), t.addTimelineLayer({
      id: B,
      label: "Pinia 🍍",
      color: 15064968
    }), t.addInspector({
      id: O,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            Pt(n);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await Vt(n), t.sendInspectorTree(O), t.sendInspectorState(O);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            xt(n);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Mt(n), t.sendInspectorTree(O), t.sendInspectorState(O);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (o) => {
            const s = n._s.get(o);
            s ? typeof s.$reset != "function" ? T(`Cannot reset "${o}" store because it doesn't have a "$reset" method implemented.`, "warn") : (s.$reset(), T(`Store "${o}" reset.`)) : T(`Cannot reset "${o}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), t.on.inspectComponent((o, s) => {
      const a = o.componentInstance && o.componentInstance.proxy;
      if (a && a._pStores) {
        const r = o.componentInstance.proxy._pStores;
        Object.values(r).forEach((i) => {
          o.instanceData.state.push({
            type: pe(i.$id),
            key: "state",
            editable: !0,
            value: i._isOptionsAPI ? {
              _custom: {
                value: he(i.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => i.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(i.$state).reduce((c, u) => (c[u] = i.$state[u], c), {})
            )
          }), i._getters && i._getters.length && o.instanceData.state.push({
            type: pe(i.$id),
            key: "getters",
            editable: !1,
            value: i._getters.reduce((c, u) => {
              try {
                c[u] = i[u];
              } catch (m) {
                c[u] = m;
              }
              return c;
            }, {})
          });
        });
      }
    }), t.on.getInspectorTree((o) => {
      if (o.app === e && o.inspectorId === O) {
        let s = [n];
        s = s.concat(Array.from(n._s.values())), o.rootNodes = (o.filter ? s.filter((a) => "$id" in a ? a.$id.toLowerCase().includes(o.filter.toLowerCase()) : nt.toLowerCase().includes(o.filter.toLowerCase())) : s).map(jt);
      }
    }), t.on.getInspectorState((o) => {
      if (o.app === e && o.inspectorId === O) {
        const s = o.nodeId === Ee ? n : n._s.get(o.nodeId);
        if (!s)
          return;
        s && (o.state = At(s));
      }
    }), t.on.editInspectorState((o, s) => {
      if (o.app === e && o.inspectorId === O) {
        const a = o.nodeId === Ee ? n : n._s.get(o.nodeId);
        if (!a)
          return T(`store "${o.nodeId}" not found`, "error");
        const { path: r } = o;
        qe(a) ? r.unshift("state") : (r.length !== 1 || !a._customProperties.has(r[0]) || r[0] in a.$state) && r.unshift("$state"), Y = !1, o.set(a, r, o.state.value), Y = !0;
      }
    }), t.on.editComponentState((o) => {
      if (o.type.startsWith("🍍")) {
        const s = o.type.replace(/^🍍\s*/, ""), a = n._s.get(s);
        if (!a)
          return T(`store "${s}" not found`, "error");
        const { path: r } = o;
        if (r[0] !== "state")
          return T(`Invalid path for store "${s}":
${r}
Only state can be modified.`);
        r[0] = "$state", Y = !1, o.set(a, r, o.state.value), Y = !0;
      }
    });
  });
}
function Ht(e, n) {
  fe.includes(pe(n.$id)) || fe.push(pe(n.$id)), We({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: fe,
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
  }, (t) => {
    const o = typeof t.now == "function" ? t.now.bind(t) : Date.now;
    n.$onAction(({ after: r, onError: i, name: c, args: u }) => {
      const m = ot++;
      t.addTimelineEvent({
        layerId: B,
        event: {
          time: o(),
          title: "🛫 " + c,
          subtitle: "start",
          data: {
            store: L(n.$id),
            action: L(c),
            args: u
          },
          groupId: m
        }
      }), r((g) => {
        z = void 0, t.addTimelineEvent({
          layerId: B,
          event: {
            time: o(),
            title: "🛬 " + c,
            subtitle: "end",
            data: {
              store: L(n.$id),
              action: L(c),
              args: u,
              result: g
            },
            groupId: m
          }
        });
      }), i((g) => {
        z = void 0, t.addTimelineEvent({
          layerId: B,
          event: {
            time: o(),
            logType: "error",
            title: "💥 " + c,
            subtitle: "end",
            data: {
              store: L(n.$id),
              action: L(c),
              args: u,
              error: g
            },
            groupId: m
          }
        });
      });
    }, !0), n._customProperties.forEach((r) => {
      Ue(() => w(n[r]), (i, c) => {
        t.notifyComponentUpdate(), t.sendInspectorState(O), Y && t.addTimelineEvent({
          layerId: B,
          event: {
            time: o(),
            title: "Change",
            subtitle: r,
            data: {
              newValue: i,
              oldValue: c
            },
            groupId: z
          }
        });
      }, { deep: !0 });
    }), n.$subscribe(({ events: r, type: i }, c) => {
      if (t.notifyComponentUpdate(), t.sendInspectorState(O), !Y)
        return;
      const u = {
        time: o(),
        title: zt(i),
        data: Ut({ store: L(n.$id) }, Dt(r)),
        groupId: z
      };
      i === j.patchFunction ? u.subtitle = "⤵️" : i === j.patchObject ? u.subtitle = "🧩" : r && !Array.isArray(r) && (u.subtitle = r.type), r && (u.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: r
        }
      }), t.addTimelineEvent({
        layerId: B,
        event: u
      });
    }, { detached: !0, flush: "sync" });
    const s = n._hotUpdate;
    n._hotUpdate = F((r) => {
      s(r), t.addTimelineEvent({
        layerId: B,
        event: {
          time: o(),
          title: "🔥 " + n.$id,
          subtitle: "HMR update",
          data: {
            store: L(n.$id),
            info: L("HMR update")
          }
        }
      }), t.notifyComponentUpdate(), t.sendInspectorTree(O), t.sendInspectorState(O);
    });
    const { $dispose: a } = n;
    n.$dispose = () => {
      a(), t.notifyComponentUpdate(), t.sendInspectorTree(O), t.sendInspectorState(O), t.getSettings().logStoreChanges && T(`Disposed "${n.$id}" store 🗑`);
    }, t.notifyComponentUpdate(), t.sendInspectorTree(O), t.sendInspectorState(O), t.getSettings().logStoreChanges && T(`"${n.$id}" store installed 🆕`);
  });
}
let ot = 0, z;
function xe(e, n, t) {
  const o = n.reduce((s, a) => (s[a] = he(e)[a], s), {});
  for (const s in o)
    e[s] = function() {
      const a = ot, r = t ? new Proxy(e, {
        get(...c) {
          return z = a, Reflect.get(...c);
        },
        set(...c) {
          return z = a, Reflect.set(...c);
        }
      }) : e;
      z = a;
      const i = o[s].apply(r, arguments);
      return z = void 0, i;
    };
}
function Bt({ app: e, store: n, options: t }) {
  if (n.$id.startsWith("__hot:"))
    return;
  n._isOptionsAPI = !!t.state, xe(n, Object.keys(t.actions), n._isOptionsAPI);
  const o = n._hotUpdate;
  he(n)._hotUpdate = function(s) {
    o.apply(this, arguments), xe(n, Object.keys(s._hmrPayload.actions), !!n._isOptionsAPI);
  }, Ht(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    n
  );
}
function Ft() {
  const e = ze(!0), n = e.run(() => k({}));
  let t = [], o = [];
  const s = F({
    install(a) {
      ie(s), s._a = a, a.provide(Je, s), a.config.globalProperties.$pinia = s, oe && Rt(a, s), o.forEach((r) => t.push(r)), o = [];
    },
    use(a) {
      return !this._a && !Fe ? o.push(a) : t.push(a), this;
    },
    _p: t,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: n
  });
  return oe && typeof Proxy < "u" && s.use(Bt), s;
}
function st(e, n) {
  for (const t in n) {
    const o = n[t];
    if (!(t in e))
      continue;
    const s = e[t];
    G(s) && G(o) && !se(o) && !ke(o) ? e[t] = st(s, o) : e[t] = o;
  }
  return e;
}
const it = () => {
};
function Le(e, n, t, o = it) {
  e.push(n);
  const s = () => {
    const a = e.indexOf(n);
    a > -1 && (e.splice(a, 1), o());
  };
  return !t && mt() && gt(s), s;
}
function J(e, ...n) {
  e.slice().forEach((t) => {
    t(...n);
  });
}
const Gt = (e) => e();
function we(e, n) {
  e instanceof Map && n instanceof Map && n.forEach((t, o) => e.set(o, t)), e instanceof Set && n instanceof Set && n.forEach(e.add, e);
  for (const t in n) {
    if (!n.hasOwnProperty(t))
      continue;
    const o = n[t], s = e[t];
    G(s) && G(o) && e.hasOwnProperty(t) && !se(o) && !ke(o) ? e[t] = we(s, o) : e[t] = o;
  }
  return e;
}
const Wt = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Jt(e) {
  return !G(e) || !e.hasOwnProperty(Wt);
}
const { assign: P } = Object;
function Me(e) {
  return !!(se(e) && e.effect);
}
function je(e, n, t, o) {
  const { state: s, actions: a, getters: r } = n, i = t.state.value[e];
  let c;
  function u() {
    !i && (process.env.NODE_ENV === "production" || !o) && (t.state.value[e] = s ? s() : {});
    const m = process.env.NODE_ENV !== "production" && o ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Ie(k(s ? s() : {}).value)
    ) : Ie(t.state.value[e]);
    return P(m, a, Object.keys(r || {}).reduce((g, v) => (process.env.NODE_ENV !== "production" && v in m && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${v}" in store "${e}".`), g[v] = F(Oe(() => {
      ie(t);
      const y = t._s.get(e);
      return r[v].call(y, y);
    })), g), {}));
  }
  return c = Te(e, u, n, t, o, !0), c;
}
function Te(e, n, t = {}, o, s, a) {
  let r;
  const i = P({ actions: {} }, t);
  if (process.env.NODE_ENV !== "production" && !o._e.active)
    throw new Error("Pinia destroyed");
  const c = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Fe && (c.onTrigger = (f) => {
    u ? y = f : u == !1 && !d._hotUpdating && (Array.isArray(y) ? y.push(f) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let u, m, g = [], v = [], y;
  const N = o.state.value[e];
  !a && !N && (process.env.NODE_ENV === "production" || !s) && (o.state.value[e] = {});
  const x = k({});
  let ae;
  function Z(f) {
    let l;
    u = m = !1, process.env.NODE_ENV !== "production" && (y = []), typeof f == "function" ? (f(o.state.value[e]), l = {
      type: j.patchFunction,
      storeId: e,
      events: y
    }) : (we(o.state.value[e], f), l = {
      type: j.patchObject,
      payload: f,
      storeId: e,
      events: y
    });
    const S = ae = Symbol();
    Ce().then(() => {
      ae === S && (u = !0);
    }), m = !0, J(g, l, o.state.value[e]);
  }
  const _e = a ? function() {
    const { state: l } = t, S = l ? l() : {};
    this.$patch((Q) => {
      P(Q, S);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : it
  );
  function ve() {
    r.stop(), g = [], v = [], o._s.delete(e);
  }
  function ce(f, l) {
    return function() {
      ie(o);
      const S = Array.from(arguments), Q = [], ee = [];
      function ut(I) {
        Q.push(I);
      }
      function lt(I) {
        ee.push(I);
      }
      J(v, {
        args: S,
        name: f,
        store: d,
        after: ut,
        onError: lt
      });
      let te;
      try {
        te = l.apply(this && this.$id === e ? this : d, S);
      } catch (I) {
        throw J(ee, I), I;
      }
      return te instanceof Promise ? te.then((I) => (J(Q, I), I)).catch((I) => (J(ee, I), Promise.reject(I))) : (J(Q, te), te);
    };
  }
  const b = /* @__PURE__ */ F({
    actions: {},
    getters: {},
    state: [],
    hotState: x
  }), E = {
    _p: o,
    // _s: scope,
    $id: e,
    $onAction: Le.bind(null, v),
    $patch: Z,
    $reset: _e,
    $subscribe(f, l = {}) {
      const S = Le(g, f, l.detached, () => Q()), Q = r.run(() => Ue(() => o.state.value[e], (ee) => {
        (l.flush === "sync" ? m : u) && f({
          storeId: e,
          type: j.direct,
          events: y
        }, ee);
      }, P({}, c, l)));
      return S;
    },
    $dispose: ve
  }, d = ht(process.env.NODE_ENV !== "production" || oe ? P(
    {
      _hmrPayload: b,
      _customProperties: F(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    E
    // must be added later
    // setupStore
  ) : E);
  o._s.set(e, d);
  const C = (o._a && o._a.runWithContext || Gt)(() => o._e.run(() => (r = ze()).run(n)));
  for (const f in C) {
    const l = C[f];
    if (se(l) && !Me(l) || ke(l))
      process.env.NODE_ENV !== "production" && s ? ue(x.value, f, be(C, f)) : a || (N && Jt(l) && (se(l) ? l.value = N[f] : we(l, N[f])), o.state.value[e][f] = l), process.env.NODE_ENV !== "production" && b.state.push(f);
    else if (typeof l == "function") {
      const S = process.env.NODE_ENV !== "production" && s ? l : ce(f, l);
      C[f] = S, process.env.NODE_ENV !== "production" && (b.actions[f] = l), i.actions[f] = l;
    } else
      process.env.NODE_ENV !== "production" && Me(l) && (b.getters[f] = a ? (
        // @ts-expect-error
        t.getters[f]
      ) : l, me && (C._getters || // @ts-expect-error: same
      (C._getters = F([]))).push(f));
  }
  if (P(d, C), P(he(d), C), Object.defineProperty(d, "$state", {
    get: () => process.env.NODE_ENV !== "production" && s ? x.value : o.state.value[e],
    set: (f) => {
      if (process.env.NODE_ENV !== "production" && s)
        throw new Error("cannot set hotState");
      Z((l) => {
        P(l, f);
      });
    }
  }), process.env.NODE_ENV !== "production" && (d._hotUpdate = F((f) => {
    d._hotUpdating = !0, f._hmrPayload.state.forEach((l) => {
      if (l in d.$state) {
        const S = f.$state[l], Q = d.$state[l];
        typeof S == "object" && G(S) && G(Q) ? st(S, Q) : f.$state[l] = Q;
      }
      ue(d, l, be(f.$state, l));
    }), Object.keys(d.$state).forEach((l) => {
      l in f.$state || ye(d, l);
    }), u = !1, m = !1, o.state.value[e] = be(f._hmrPayload, "hotState"), m = !0, Ce().then(() => {
      u = !0;
    });
    for (const l in f._hmrPayload.actions) {
      const S = f[l];
      ue(d, l, ce(l, S));
    }
    for (const l in f._hmrPayload.getters) {
      const S = f._hmrPayload.getters[l], Q = a ? (
        // special handling of options api
        Oe(() => (ie(o), S.call(d, d)))
      ) : S;
      ue(d, l, Q);
    }
    Object.keys(d._hmrPayload.getters).forEach((l) => {
      l in f._hmrPayload.getters || ye(d, l);
    }), Object.keys(d._hmrPayload.actions).forEach((l) => {
      l in f._hmrPayload.actions || ye(d, l);
    }), d._hmrPayload = f._hmrPayload, d._getters = f._getters, d._hotUpdating = !1;
  })), oe) {
    const f = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((l) => {
      Object.defineProperty(d, l, P({ value: d[l] }, f));
    });
  }
  return o._p.forEach((f) => {
    if (oe) {
      const l = r.run(() => f({
        store: d,
        app: o._a,
        pinia: o,
        options: i
      }));
      Object.keys(l || {}).forEach((S) => d._customProperties.add(S)), P(d, l);
    } else
      P(d, r.run(() => f({
        store: d,
        app: o._a,
        pinia: o,
        options: i
      })));
  }), process.env.NODE_ENV !== "production" && d.$state && typeof d.$state == "object" && typeof d.$state.constructor == "function" && !d.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${d.$id}".`), N && a && t.hydrate && t.hydrate(d.$state, N), u = !0, m = !0, d;
}
function Yt(e, n, t) {
  let o, s;
  const a = typeof n == "function";
  if (typeof e == "string")
    o = e, s = a ? t : n;
  else if (s = e, o = e.id, process.env.NODE_ENV !== "production" && typeof o != "string")
    throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
  function r(i, c) {
    const u = dt();
    if (i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && ne && ne._testing ? null : i) || (u ? ft(Je, null) : null), i && ie(i), process.env.NODE_ENV !== "production" && !ne)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    i = ne, i._s.has(o) || (a ? Te(o, n, s, i) : je(o, s, i), process.env.NODE_ENV !== "production" && (r._pinia = i));
    const m = i._s.get(o);
    if (process.env.NODE_ENV !== "production" && c) {
      const g = "__hot:" + o, v = a ? Te(g, n, s, i, !0) : je(g, P({}, s), i, !0);
      c._hotUpdate(v), delete i.state.value[g], i._s.delete(g);
    }
    if (process.env.NODE_ENV !== "production" && me) {
      const g = pt();
      if (g && g.proxy && // avoid adding stores that are just built for hot module replacement
      !c) {
        const v = g.proxy, y = "_pStores" in v ? v._pStores : v._pStores = {};
        y[o] = m;
      }
    }
    return m;
  }
  return r.$id = o, r;
}
const Kt = ["id", "checked"], Xt = ["for", "innerHTML"], Zt = /* @__PURE__ */ V({
  __name: "MCQOption",
  props: {
    optionKey: {},
    checked: { type: Boolean },
    option: {},
    submitted: { type: Boolean }
  },
  emits: ["selectOption"],
  setup(e, { emit: n }) {
    const t = n, o = () => t("selectOption");
    return (s, a) => (h(), _(A, null, [
      (h(), _("input", {
        id: "option-" + s.optionKey,
        key: s.optionKey,
        "test-id": "radio_options",
        type: "radio",
        name: "options",
        checked: s.checked,
        class: K(s.submitted && "ignore-hover"),
        onClick: [
          a[0] || (a[0] = (r) => o()),
          a[1] || (a[1] = _t(() => {
          }, ["stop"]))
        ]
      }, null, 10, Kt)),
      (h(), _("label", {
        key: s.optionKey,
        for: "option-" + s.optionKey,
        class: K(s.submitted ? "mcq-option-label ignore-hover" : "mcq-option-label"),
        onClick: a[2] || (a[2] = (r) => o()),
        innerHTML: s.option.optionValue
      }, null, 10, Xt))
    ], 64));
  }
}), U = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [o, s] of n)
    t[o] = s;
  return t;
}, en = /* @__PURE__ */ U(Zt, [["__scopeId", "data-v-a56daaa2"]]), tn = ["disabled"], nn = /* @__PURE__ */ V({
  __name: "MCQButton",
  props: {
    submitted: { type: Boolean },
    selectedOption: {},
    hideSkip: { type: Boolean }
  },
  emits: ["submitAnswer", "nextQuestion", "skipQuestion"],
  setup(e, { emit: n }) {
    const t = k("skip"), o = k("Skip"), s = n, a = (c, u) => {
      !c && u ? r("next", "Next", "submitAnswer") : c && u ? r("skip", "Skip", "nextQuestion") : !c && !u && r("skip", "Skip", "skipQuestion");
    }, r = (c, u, m) => {
      t.value = c, o.value = u, s(m);
    }, i = (c, u) => c && u ? { class: "next", text: "Next" } : !c && u ? { class: "submit", text: "Submit" } : { class: t.value, text: o.value };
    return (c, u) => (h(), _("div", null, [
      p("button", {
        disabled: c.hideSkip && i(c.submitted, c.selectedOption).class === "skip",
        class: K(["mcq-button", i(c.submitted, c.selectedOption).class]),
        onClick: u[0] || (u[0] = (m) => a(c.submitted, c.selectedOption))
      }, $(i(c.submitted, c.selectedOption).text), 11, tn)
    ]));
  }
}), on = /* @__PURE__ */ U(nn, [["__scopeId", "data-v-2e313e3c"]]), sn = /* @__PURE__ */ V({
  __name: "NextButton",
  props: {
    buttonName: {}
  },
  emits: ["nextQuestion", "prevQuestion"],
  setup(e, { emit: n }) {
    const { buttonName: t } = e, o = n, s = () => {
      a(t !== "←" ? "nextQuestion" : "prevQuestion");
    }, a = (r) => {
      o(r);
    };
    return (r, i) => (h(), _("div", null, [
      p("button", {
        class: "mcq-button",
        onClick: i[0] || (i[0] = (c) => s())
      }, $(r.buttonName), 1)
    ]));
  }
}), Ae = /* @__PURE__ */ U(sn, [["__scopeId", "data-v-081c5673"]]);
Array.from(
  { length: 10 },
  (e, n) => `VETS20${n + 10}`
);
const rn = [
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "Which of the following is NOT a contributing factor to the performance capacity of horses?",
    optionsList: [
      {
        optionValue: "Upper airway function",
        optionCorrect: !1
      },
      {
        optionValue: "Increase in oxygen carrying capacity of blood due to splenic contraction",
        optionCorrect: !1
      },
      {
        optionValue: "Increase in maximum heart rate in response to training",
        optionCorrect: !0
      },
      {
        optionValue: "Enhanced oxidative enzymatic activity in response to training",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87033"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290792c64c71f1df2110ece"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "Which of the following is NOT a muscular adaptation to training?",
    optionsList: [
      {
        optionValue: "Increase in muscle capillary density",
        optionCorrect: !1
      },
      {
        optionValue: "Increased density of mitochondria",
        optionCorrect: !1
      },
      {
        optionValue: "Enhanced oxidative enzymatic activity",
        optionCorrect: !1
      },
      {
        optionValue: "Decreased size of mitochondria",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87036"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290792c64c71f1df2110ece"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "Which of the following best describes in order from greatest to least, the aerobic contribution to overall energy production of these equine performance disciplines?",
    optionsList: [
      {
        optionValue: "Endurance &gt; Thoroughbred racing &gt; Barrel racing",
        optionCorrect: !0
      },
      {
        optionValue: "Barrel racing &gt; Thoroughbred racing &gt; Endurance",
        optionCorrect: !1
      },
      {
        optionValue: "Thoroughbred racing &gt; Barrel racing &gt; Endurance",
        optionCorrect: !1
      },
      {
        optionValue: "Endurance &gt; Barrel racing &gt; Thoroughbred racing",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87035"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290792c64c71f1df2110ece"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "Which of the following does NOT cause a low arterial partial pressure of oxygen?",
    optionsList: [
      {
        optionValue: "Hypoventilation",
        optionCorrect: !1
      },
      {
        optionValue: "V/Q mismatch",
        optionCorrect: !1
      },
      {
        optionValue: "Right-to-left shunt",
        optionCorrect: !1
      },
      {
        optionValue: "Decreased cardiac output",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87034"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290792c64c71f1df2110ece"
  }
], an = () => rn;
function ge() {
  return an();
}
const cn = (e) => {
  for (let n = e.length - 1; n > 0; n--) {
    const t = Math.floor(Math.random() * (n + 1));
    [e[n], e[t]] = [e[t], e[n]];
  }
  return e;
}, un = (e, n) => cn(n).slice(0, e);
function ln(e) {
  const n = {
    course: /* @__PURE__ */ new Set(),
    subject: /* @__PURE__ */ new Set(),
    system: /* @__PURE__ */ new Set(),
    animal: /* @__PURE__ */ new Set()
  };
  for (const t of e)
    n.course.add(t.course), n.subject.add(t.subject), n.system.add(t.system), n.animal.add(t.animal);
  return {
    course: [...n.course],
    subject: [...n.subject],
    system: [...n.system],
    animal: [...n.animal]
  };
}
function Qe(e, n) {
  return e.filter((t) => (n.course.length === 0 || n.course.includes(t.tags.course)) && (n.subject.length === 0 || n.subject.includes(t.tags.subject)) && (n.system.length === 0 || n.system.includes(t.tags.system)) && (n.animal.length === 0 || n.animal.includes(t.tags.animal)));
}
function dn(e, n, t) {
  const o = e[n].question.optionsList;
  for (let s = 0; s < o.length; s++)
    if (o[s].optionValue === t)
      return s;
}
const rt = (e, n) => n.findIndex((t) => {
  var o;
  return ((o = t.question._id) == null ? void 0 : o.$oid) === e;
}), R = Yt("questionsQueue", {
  state: () => ({
    questionsQueue: [],
    questionsStack: [],
    quizStats: [],
    quizMode: "Tutor",
    selectedTags: {
      course: [],
      subject: [],
      system: [],
      animal: []
    },
    timeLimit: 60
    // default time limit 1 min per qs
  }),
  actions: {
    getquestionnumber() {
      const e = ge();
      return Qe(e, this.selectedTags).length;
    },
    setselectedTags(e) {
      this.selectedTags = e;
    },
    getselectedtags() {
      return this.selectedTags;
    },
    modifySelectedTags(e, { category: n, topic: t }) {
      this.selectedTags[n] = e ? [...this.selectedTags[n], t] : this.selectedTags[n].filter(
        (o) => o !== t
      );
    },
    initialiseQuiz(e, n) {
      this.questionsQueue = e, this.questionsStack = [], this.quizMode = n, this.quizStats = e.map((t) => ({
        question: t,
        correct: 0,
        skipped: 0,
        attempts: 0,
        selectedValue: ""
      }));
    },
    incrementStat(e, n, t) {
      const o = rt(e, this.quizStats);
      if (this.quizStats[o]) {
        if (t !== void 0) {
          if (this.quizStats[o][n]++, t === "-1") {
            this.quizStats[o].selectedValue = "Reached Time Limit";
            return;
          }
          const s = this.quizStats[o].question.optionsList.map((a) => a.optionCorrect).indexOf(!0);
          Number(t) === Number(s) ? this.quizStats[o].correct = 1 : this.quizStats[o].correct = 0;
        }
        this.quizStats[o].selectedValue = t !== void 0 ? this.quizStats[o].question.optionsList[Number(t)].optionValue : "";
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
}), fn = ["innerHTML"], pn = { class: "mcq-list" }, hn = ["onClick"], mn = { class: "next-prev-question" }, gn = /* @__PURE__ */ V({
  __name: "MCQQuestion",
  props: {
    _id: {},
    statement: {},
    optionsList: {}
  },
  emits: ["nextQuestion", "skipQuestion", "prevQuestion"],
  setup(e, { emit: n }) {
    const t = R(), { statement: o, optionsList: s, _id: a } = e, r = k(null), i = k(!1), c = n, u = k(t.getRemainingQuestions()), m = () => {
      i.value = !0;
    }, g = () => {
      r.value = null, c("nextQuestion");
    }, v = (b) => {
      x(b), u.value = t.getRemainingQuestions(), c("nextQuestion");
    }, y = () => {
      x(a), c("skipQuestion");
    }, N = (b) => t.incrementStat(
      b.$oid,
      "attempts",
      r.value ?? void 0
    ), x = (b) => {
      N(b), i.value = !1, r.value = null;
    }, ae = () => {
      c("prevQuestion");
    }, Z = (b, E) => {
      i.value || (r.value = r.value === E ? null : E), N(b);
    }, _e = (b, E, d) => t.quizMode === "Timed" ? ve(b, E) : ce(E, d);
    function ve(b, E) {
      const d = rt(b.$oid, t.quizStats), H = t.quizStats[d].selectedValue, C = dn(
        t.quizStats,
        d,
        H
      );
      return String(C) === E ? "selected" : "";
    }
    function ce(b, E) {
      const d = E[parseInt(b)], H = r.value === b;
      return i.value ? d.optionCorrect ? "correct ignore-hover" : H ? "wrong ignore-hover" : "ignore-hover" : H ? "selected" : "";
    }
    return (b, E) => (h(), _(A, null, [
      p("div", {
        class: "mcq-statement",
        innerHTML: b.statement
      }, null, 8, fn),
      p("div", pn, [
        (h(!0), _(A, null, X(Object.entries(b.optionsList), ([d, H]) => (h(), _("div", {
          key: d,
          class: K(["mcq-option", _e(b._id, d, b.optionsList)]),
          onClick: (C) => Z(b._id, d)
        }, [
          $e(en, {
            "option-key": d,
            checked: r.value === d,
            option: H,
            submitted: i.value,
            onSelectOption: (C) => Z(b._id, d)
          }, null, 8, ["option-key", "checked", "option", "submitted", "onSelectOption"])
        ], 10, hn))), 128))
      ]),
      w(t).quizMode === "Tutor" ? (h(), M(on, {
        key: 0,
        submitted: i.value,
        "selected-option": r.value,
        "hide-skip": u.value <= 1,
        onSubmitAnswer: m,
        onNextQuestion: E[0] || (E[0] = (d) => v(b._id)),
        onSkipQuestion: y
      }, null, 8, ["submitted", "selected-option", "hide-skip"])) : q("", !0),
      p("div", mn, [
        w(t).quizMode === "Timed" ? (h(), M(Ae, {
          key: 0,
          "button-name": w(t).questionsQueue.length >= 1 ? "→" : "submit",
          onNextQuestion: E[1] || (E[1] = (d) => g())
        }, null, 8, ["button-name"])) : q("", !0),
        w(t).quizMode === "Timed" && w(t).questionsStack.length > 1 ? (h(), M(Ae, {
          key: 1,
          "button-name": "←",
          onPrevQuestion: E[2] || (E[2] = (d) => ae())
        })) : q("", !0)
      ])
    ], 64));
  }
}), at = /* @__PURE__ */ U(gn, [["__scopeId", "data-v-4de54040"]]), _n = (e) => (Re("data-v-48b61e74"), e = e(), He(), e), vn = { class: "report-container" }, bn = { class: "mcq-report" }, yn = { class: "table-container" }, Sn = /* @__PURE__ */ _n(() => /* @__PURE__ */ p("thead", null, [
  /* @__PURE__ */ p("tr", null, [
    /* @__PURE__ */ p("th", null, "question"),
    /* @__PURE__ */ p("th", null, "correct option"),
    /* @__PURE__ */ p("th", null, "your answer")
  ])
], -1)), En = { class: "question-row" }, wn = ["href", "innerHTML"], Tn = { class: "answer-row" }, kn = ["innerHTML"], On = { class: "answer-row" }, $n = ["innerHTML"], Nn = { class: "mcq-result" }, qn = { class: "score" }, Qn = /* @__PURE__ */ V({
  __name: "MCQStatus",
  setup(e) {
    const n = R(), t = n.quizStats, o = n.quizStats.length, s = t.filter((r) => r.correct === 1).length, a = (s * 100 / o).toFixed(0);
    return (r, i) => (h(), _("div", vn, [
      p("div", bn, [
        p("div", yn, [
          p("table", null, [
            Sn,
            p("tbody", null, [
              (h(!0), _(A, null, X(Object.entries(w(t)), ([c, u]) => (h(), _("tr", {
                key: c,
                class: "quiz-statment"
              }, [
                p("td", En, [
                  p("a", {
                    href: u.question.link,
                    target: "_blank",
                    innerHTML: u.question.statement
                  }, null, 8, wn)
                ]),
                p("td", Tn, [
                  (h(!0), _(A, null, X(Object.entries(
                    u.question.optionsList
                  ), ([m, g]) => (h(), _("span", { key: m }, [
                    g.optionCorrect ? (h(), _("span", {
                      key: 0,
                      innerHTML: g.optionValue
                    }, null, 8, kn)) : q("", !0)
                  ]))), 128))
                ]),
                p("td", On, [
                  p("span", {
                    class: K(
                      u.correct === 1 ? "correct-answer" : "wrong-answer"
                    ),
                    innerHTML: u.correct === 1 ? "<span> ✔</span> " : "<span> ✘</span> <span>     </span>" + u.selectedValue
                  }, null, 10, $n)
                ])
              ]))), 128))
            ])
          ])
        ])
      ]),
      p("div", null, [
        p("div", Nn, [
          p("span", qn, "⌛ Result: " + $(w(s)) + " out of " + $(w(o)) + " - (" + $(w(a)) + " %)", 1)
        ])
      ])
    ]));
  }
}), ct = /* @__PURE__ */ U(Qn, [["__scopeId", "data-v-48b61e74"]]), Cn = /* @__PURE__ */ V({
  __name: "MCQQuiz",
  setup(e) {
    const n = k(), t = R();
    Be(() => {
      s();
    });
    const o = () => {
      t.enqueueQuestion(n.value), s();
    }, s = () => {
      n.value = t.dequeueQuestion();
    }, a = () => window.location.reload();
    return (r, i) => (h(), _(A, null, [
      n.value ? (h(), M(at, {
        key: 0,
        statement: n.value.statement,
        "options-list": n.value.optionsList,
        _id: n.value._id,
        onNextQuestion: s,
        onSkipQuestion: o
      }, null, 8, ["statement", "options-list", "_id"])) : q("", !0),
      n.value ? q("", !0) : (h(), M(ct, { key: 1 })),
      n.value ? q("", !0) : (h(), _("button", {
        key: 2,
        class: "btn-relocate",
        onClick: a
      }, " End "))
    ], 64));
  }
}), In = { key: 0 }, De = 1e3, Pn = "-1", Vn = /* @__PURE__ */ V({
  __name: "MCQTimedQuiz",
  setup(e) {
    const n = R(), t = k();
    let o = null, s = null;
    const a = k(n.timeLimit);
    Be(() => {
      i();
    }), vt(() => {
      u(), m();
    });
    const r = () => {
      t.value = n.removeFromLastHistory() ?? t.value;
    }, i = () => t.value = n.dequeueQuestion(), c = () => window.location.reload(), u = () => {
      o && clearTimeout(o), s && clearInterval(s);
    }, m = () => {
      a.value = n.timeLimit;
      const y = () => t.value ? a.value ? a.value-- : v() : u();
      s = window.setInterval(y, De), o = window.setTimeout(() => {
      }, n.timeLimit * De);
    }, g = (y) => {
      const N = Math.floor(y / 60), x = y % 60;
      return `${N}:${x < 10 ? "0" : ""}${x}`;
    }, v = () => {
      var N;
      u();
      const y = (x) => n.incrementStat(x, "attempts", Pn);
      for (y(((N = t.value) == null ? void 0 : N._id.$oid) ?? ""); t.value = n.dequeueQuestion(); )
        y(t.value._id.$oid);
      return alert("Time's up! Quiz has ended."), i();
    };
    return (y, N) => (h(), _(A, null, [
      a.value ? (h(), _("h3", In, "Time left: " + $(g(a.value)), 1)) : q("", !0),
      p("h3", null, " Question " + $(w(n).questionsStack.length) + " out of " + $(w(n).questionsQueue.length + w(n).questionsStack.length), 1),
      t.value ? (h(), M(at, {
        key: 1,
        statement: t.value.statement,
        "options-list": t.value.optionsList,
        _id: t.value._id,
        onNextQuestion: i,
        onPrevQuestion: r
      }, null, 8, ["statement", "options-list", "_id"])) : q("", !0),
      t.value ? q("", !0) : (h(), M(ct, { key: 2 })),
      t.value ? q("", !0) : (h(), _("button", {
        key: 3,
        class: "btn-relocate",
        onClick: c
      }, " End "))
    ], 64));
  }
}), xn = ["id", "name", "value", "disabled"], Ln = ["for"], Mn = {
  key: 0,
  class: "question-number"
}, jn = /* @__PURE__ */ V({
  __name: "FilterCheckbox",
  props: {
    category: {},
    topics: {}
  },
  setup(e) {
    const { category: n, topics: t } = e, o = R(), s = Oe(
      () => Object.entries(t).map(([i, c]) => {
        const u = r(c, n);
        return { idx: i, topic: c, num: u };
      }).filter(({ topic: i }) => i !== void 0)
    ), a = (i) => {
      if (!(i.target instanceof HTMLInputElement))
        return console.error("Trying to click on non-input element");
      const c = i.target.name, u = i.target.value;
      o.modifySelectedTags(i.target.checked, { category: c, topic: u });
    }, r = (i, c) => {
      var v;
      if ((v = o.getselectedtags()[c]) != null && v.includes(
        i
      ))
        return null;
      const m = JSON.parse(
        JSON.stringify(o.getselectedtags())
      );
      m[c].includes(i) || m[c].push(i);
      const g = ge();
      return Qe(
        g,
        m
      ).length.toString();
    };
    return (i, c) => (h(), _("ul", null, [
      (h(!0), _(A, null, X(s.value, ({ idx: u, num: m, topic: g }) => (h(), _("li", {
        key: u,
        class: K(["filter-options", { "grey-out": m === "0" }])
      }, [
        p("input", {
          id: `${i.category}-${g}-checkbox`,
          type: "checkbox",
          name: i.category,
          value: g,
          disabled: m === "0",
          onChange: c[0] || (c[0] = (v) => a(v))
        }, null, 40, xn),
        p("label", {
          for: `${i.category}-${g}-checkbox`
        }, [
          bt($(g) + " ", 1),
          m !== null && m !== "0" ? (h(), _("span", Mn, $(m), 1)) : q("", !0)
        ], 8, Ln)
      ], 2))), 128))
    ]));
  }
}), An = /* @__PURE__ */ U(jn, [["__scopeId", "data-v-2ed0a288"]]), Dn = { class: "filter" }, zn = /* @__PURE__ */ V({
  __name: "MCQTagOptions",
  setup(e) {
    const t = ge().flatMap((s) => s.tags), o = ln(t);
    return (s, a) => (h(), _("div", Dn, [
      (h(!0), _(A, null, X(Object.entries(w(o)), ([r, i]) => (h(), _("div", {
        key: r,
        class: "category"
      }, [
        p("h2", null, $(r), 1),
        $e(An, {
          category: r,
          topics: i
        }, null, 8, ["category", "topics"])
      ]))), 128))
    ]));
  }
}), Un = { class: "dropdown" }, Rn = { for: "optionName" }, Hn = /* @__PURE__ */ p("option", { value: "" }, "--Please choose an option--", -1), Bn = ["value"], Fn = /* @__PURE__ */ V({
  __name: "DropDownbox",
  props: {
    options: {},
    optionName: {}
  },
  setup(e) {
    const n = R(), t = k(0);
    function o(s) {
      const a = s.target;
      a.value && (t.value = parseFloat(a.value) * 60, n.setTimeLimit(t.value));
    }
    return (s, a) => (h(), _("div", Un, [
      p("label", Rn, $(s.optionName) + ":   ", 1),
      p("select", {
        id: "optionName",
        name: "optionName",
        onChange: o
      }, [
        Hn,
        (h(!0), _(A, null, X(s.options, (r) => (h(), _("option", {
          key: r.value,
          value: r.value
        }, $(r.value) + " " + $(r.unit), 9, Bn))), 128))
      ], 32)
    ]));
  }
}), re = (e) => (Re("data-v-817bbbb1"), e = e(), He(), e), Gn = { class: "start-page-container" }, Wn = /* @__PURE__ */ re(() => /* @__PURE__ */ p("h1", null, "VetCloud Smart Quiz", -1)), Jn = { class: "quiz-config-container" }, Yn = { class: "question-config-container" }, Kn = { class: "tag-text" }, Xn = { class: "question-amount-container" }, Zn = /* @__PURE__ */ re(() => /* @__PURE__ */ p("label", { for: "question-amount" }, "Select the amount of questions:", -1)), eo = ["max"], to = {
  key: 0,
  class: "show-max-msg"
}, no = /* @__PURE__ */ re(() => /* @__PURE__ */ p("label", { for: "mode-select" }, "Select mode:", -1)), oo = /* @__PURE__ */ re(() => /* @__PURE__ */ p("option", { value: "Tutor" }, "Tutor mode", -1)), so = /* @__PURE__ */ re(() => /* @__PURE__ */ p("option", { value: "Timed" }, "Timed mode", -1)), io = [
  oo,
  so
], ro = 3e3, ao = /* @__PURE__ */ V({
  __name: "StartPage",
  emits: ["start-quiz"],
  setup(e, { emit: n }) {
    const t = k(1), o = k("Tutor"), s = k(!1), a = k(null), r = n, i = R(), c = () => {
      r("start-quiz", {
        questionAmount: t.value,
        mode: o.value
      });
    }, u = () => {
      a.value && clearTimeout(a.value), t.value > i.getquestionnumber() && (t.value = i.getquestionnumber(), s.value = !0, a.value = window.setTimeout(() => {
        s.value = !1;
      }, ro));
    };
    return (m, g) => (h(), _("div", Gn, [
      Wn,
      $e(zn),
      p("div", Jn, [
        p("div", Yn, [
          p("p", Kn, " Maximum possible questions: " + $(w(i).getquestionnumber()), 1),
          p("div", Xn, [
            Zn,
            Pe(p("input", {
              id: "question-amount",
              "onUpdate:modelValue": g[0] || (g[0] = (v) => t.value = v),
              type: "number",
              placeholder: "Question amount",
              min: "1",
              max: w(i).getquestionnumber(),
              onInput: u
            }, null, 40, eo), [
              [
                yt,
                t.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          s.value ? (h(), _("p", to, " Cannot select more than " + $(w(i).getquestionnumber()) + " questions. ", 1)) : q("", !0),
          p("div", null, [
            no,
            Pe(p("select", {
              id: "mode-select",
              "onUpdate:modelValue": g[1] || (g[1] = (v) => o.value = v)
            }, io, 512), [
              [St, o.value]
            ])
          ]),
          o.value === "Timed" ? (h(), M(Fn, {
            key: 1,
            options: [
              { value: 1.5, label: "Time Option 1", unit: "Min." },
              { value: 1, label: "Time Option 2", unit: "Min." }
            ],
            "option-name": "Time per Question"
          }, null, 8, ["options"])) : q("", !0)
        ])
      ]),
      p("button", {
        class: "start-button",
        onClick: c
      }, "Start")
    ]));
  }
}), co = /* @__PURE__ */ U(ao, [["__scopeId", "data-v-817bbbb1"]]), uo = /* @__PURE__ */ V({
  __name: "CrucibleComponent",
  setup(e) {
    const n = k(0), t = R(), o = k(!1), s = ({ questionAmount: a, mode: r }) => {
      const i = t.getselectedtags(), c = ge(), u = Qe(
        c,
        i
      ), m = un(a, u);
      n.value = m.length, t.initialiseQuiz(m, r), r === "Timed" && t.setTimeLimit(a * t.timeLimit), o.value = !0;
    };
    return (a, r) => o.value && w(t).quizMode === "Tutor" ? (h(), M(Cn, { key: 0 })) : o.value && w(t).quizMode === "Timed" ? (h(), M(Vn, { key: 1 })) : (h(), M(co, {
      key: 2,
      onStartQuiz: s
    }));
  }
}), lo = /* @__PURE__ */ U(uo, [["__scopeId", "data-v-a9c91ee9"]]);
function po(e) {
  const n = Ft();
  e.use(n), e.component("CrucibleComponent", lo);
}
export {
  lo as CrucibleComponent,
  po as createViewerPlugin
};
