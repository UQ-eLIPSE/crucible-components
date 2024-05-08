import { effectScope as ze, ref as _, markRaw as U, hasInjectionContext as mt, inject as Be, getCurrentInstance as yt, toRaw as me, watch as Fe, reactive as gt, isRef as ne, isReactive as Te, toRef as Ce, nextTick as xe, computed as Ee, unref as S, getCurrentScope as Vt, onScopeDispose as Ct, toRefs as je, defineComponent as q, openBlock as b, createElementBlock as y, Fragment as R, normalizeClass as Q, withModifiers as vt, createElementVNode as d, toDisplayString as E, renderList as X, createVNode as ee, createBlock as W, createCommentVNode as L, pushScopeId as Ue, popScopeId as Ge, onMounted as ke, resolveComponent as St, onBeforeMount as _t, createTextVNode as Je, withDirectives as Oe, vModelText as Pt, vModelSelect as wt } from "vue";
var Ze = !1;
function pe(e, o, t) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, o), e.splice(o, 1, t), t) : (e[o] = t, t);
}
function ve(e, o) {
  if (Array.isArray(e)) {
    e.splice(o, 1);
    return;
  }
  delete e[o];
}
function Tt() {
  return Ke().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Ke() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Et = typeof Proxy == "function", kt = "devtools-plugin:setup", Lt = "plugin:settings:set";
let Z, Se;
function qt() {
  var e;
  return Z !== void 0 || (typeof window < "u" && window.performance ? (Z = !0, Se = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Z = !0, Se = globalThis.perf_hooks.performance) : Z = !1), Z;
}
function $t() {
  return qt() ? Se.now() : Date.now();
}
class Nt {
  constructor(o, t) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = o, this.hook = t;
    const s = {};
    if (o.settings)
      for (const a in o.settings) {
        const n = o.settings[a];
        s[a] = n.defaultValue;
      }
    const i = `__vue-devtools-plugin-settings__${o.id}`;
    let r = Object.assign({}, s);
    try {
      const a = localStorage.getItem(i), n = JSON.parse(a);
      Object.assign(r, n);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return r;
      },
      setSettings(a) {
        try {
          localStorage.setItem(i, JSON.stringify(a));
        } catch {
        }
        r = a;
      },
      now() {
        return $t();
      }
    }, t && t.on(Lt, (a, n) => {
      a === this.plugin.id && this.fallbacks.setSettings(n);
    }), this.proxiedOn = new Proxy({}, {
      get: (a, n) => this.target ? this.target.on[n] : (...c) => {
        this.onQueue.push({
          method: n,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (a, n) => this.target ? this.target[n] : n === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(n) ? (...c) => (this.targetQueue.push({
        method: n,
        args: c,
        resolve: () => {
        }
      }), this.fallbacks[n](...c)) : (...c) => new Promise((l) => {
        this.targetQueue.push({
          method: n,
          args: c,
          resolve: l
        });
      })
    });
  }
  async setRealTarget(o) {
    this.target = o;
    for (const t of this.onQueue)
      this.target.on[t.method](...t.args);
    for (const t of this.targetQueue)
      t.resolve(await this.target[t.method](...t.args));
  }
}
function Ye(e, o) {
  const t = e, s = Ke(), i = Tt(), r = Et && t.enableEarlyProxy;
  if (i && (s.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !r))
    i.emit(kt, e, o);
  else {
    const a = r ? new Nt(t, i) : null;
    (s.__VUE_DEVTOOLS_PLUGINS__ = s.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: t,
      setupFn: o,
      proxy: a
    }), a && o(a.proxiedTarget);
  }
}
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let ie;
const re = (e) => ie = e, Xe = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function G(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var M;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(M || (M = {}));
const ye = typeof window < "u", ae = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && ye, Ie = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function xt(e, { autoBom: o = !1 } = {}) {
  return o && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Le(e, o, t) {
  const s = new XMLHttpRequest();
  s.open("GET", e), s.responseType = "blob", s.onload = function() {
    ot(s.response, o, t);
  }, s.onerror = function() {
    console.error("could not download file");
  }, s.send();
}
function et(e) {
  const o = new XMLHttpRequest();
  o.open("HEAD", e, !1);
  try {
    o.send();
  } catch {
  }
  return o.status >= 200 && o.status <= 299;
}
function fe(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const t = document.createEvent("MouseEvents");
    t.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(t);
  }
}
const de = typeof navigator == "object" ? navigator : { userAgent: "" }, tt = /Macintosh/.test(de.userAgent) && /AppleWebKit/.test(de.userAgent) && !/Safari/.test(de.userAgent), ot = ye ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !tt ? jt : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in de ? Ot : (
      // Fallback to using FileReader and a popup
      It
    )
  )
) : () => {
};
function jt(e, o = "download", t) {
  const s = document.createElement("a");
  s.download = o, s.rel = "noopener", typeof e == "string" ? (s.href = e, s.origin !== location.origin ? et(s.href) ? Le(e, o, t) : (s.target = "_blank", fe(s)) : fe(s)) : (s.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(s.href);
  }, 4e4), setTimeout(function() {
    fe(s);
  }, 0));
}
function Ot(e, o = "download", t) {
  if (typeof e == "string")
    if (et(e))
      Le(e, o, t);
    else {
      const s = document.createElement("a");
      s.href = e, s.target = "_blank", setTimeout(function() {
        fe(s);
      });
    }
  else
    navigator.msSaveOrOpenBlob(xt(e, t), o);
}
function It(e, o, t, s) {
  if (s = s || open("", "_blank"), s && (s.document.title = s.document.body.innerText = "downloading..."), typeof e == "string")
    return Le(e, o, t);
  const i = e.type === "application/octet-stream", r = /constructor/i.test(String(Ie.HTMLElement)) || "safari" in Ie, a = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((a || i && r || tt) && typeof FileReader < "u") {
    const n = new FileReader();
    n.onloadend = function() {
      let c = n.result;
      if (typeof c != "string")
        throw s = null, new Error("Wrong reader.result type");
      c = a ? c : c.replace(/^data:[^;]*;/, "data:attachment/file;"), s ? s.location.href = c : location.assign(c), s = null;
    }, n.readAsDataURL(e);
  } else {
    const n = URL.createObjectURL(e);
    s ? s.location.assign(n) : location.href = n, s = null, setTimeout(function() {
      URL.revokeObjectURL(n);
    }, 4e4);
  }
}
function w(e, o) {
  const t = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(t, o) : o === "error" ? console.error(t) : o === "warn" ? console.warn(t) : console.log(t);
}
function qe(e) {
  return "_a" in e && "install" in e;
}
function st() {
  if (!("clipboard" in navigator))
    return w("Your browser doesn't support the Clipboard API", "error"), !0;
}
function it(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (w('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function At(e) {
  if (!st())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), w("Global state copied to clipboard.");
    } catch (o) {
      if (it(o))
        return;
      w("Failed to serialize the state. Check the console for more details.", "error"), console.error(o);
    }
}
async function Wt(e) {
  if (!st())
    try {
      at(e, JSON.parse(await navigator.clipboard.readText())), w("Global state pasted from clipboard.");
    } catch (o) {
      if (it(o))
        return;
      w("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(o);
    }
}
async function Mt(e) {
  try {
    ot(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (o) {
    w("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(o);
  }
}
let H;
function Ht() {
  H || (H = document.createElement("input"), H.type = "file", H.accept = ".json");
  function e() {
    return new Promise((o, t) => {
      H.onchange = async () => {
        const s = H.files;
        if (!s)
          return o(null);
        const i = s.item(0);
        return o(i ? { text: await i.text(), file: i } : null);
      }, H.oncancel = () => o(null), H.onerror = t, H.click();
    });
  }
  return e;
}
async function Rt(e) {
  try {
    const t = await Ht()();
    if (!t)
      return;
    const { text: s, file: i } = t;
    at(e, JSON.parse(s)), w(`Global state imported from "${i.name}".`);
  } catch (o) {
    w("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(o);
  }
}
function at(e, o) {
  for (const t in o) {
    const s = e.state.value[t];
    s ? Object.assign(s, o[t]) : e.state.value[t] = o[t];
  }
}
function I(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const nt = "🍍 Pinia (root)", _e = "_root";
function Qt(e) {
  return qe(e) ? {
    id: _e,
    label: nt
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Dt(e) {
  if (qe(e)) {
    const t = Array.from(e._s.keys()), s = e._s;
    return {
      state: t.map((r) => ({
        editable: !0,
        key: r,
        value: e.state.value[r]
      })),
      getters: t.filter((r) => s.get(r)._getters).map((r) => {
        const a = s.get(r);
        return {
          editable: !1,
          key: r,
          value: a._getters.reduce((n, c) => (n[c] = a[c], n), {})
        };
      })
    };
  }
  const o = {
    state: Object.keys(e.$state).map((t) => ({
      editable: !0,
      key: t,
      value: e.$state[t]
    }))
  };
  return e._getters && e._getters.length && (o.getters = e._getters.map((t) => ({
    editable: !1,
    key: t,
    value: e[t]
  }))), e._customProperties.size && (o.customProperties = Array.from(e._customProperties).map((t) => ({
    editable: !0,
    key: t,
    value: e[t]
  }))), o;
}
function zt(e) {
  return e ? Array.isArray(e) ? e.reduce((o, t) => (o.keys.push(t.key), o.operations.push(t.type), o.oldValue[t.key] = t.oldValue, o.newValue[t.key] = t.newValue, o), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: I(e.type),
    key: I(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function Bt(e) {
  switch (e) {
    case M.direct:
      return "mutation";
    case M.patchFunction:
      return "$patch";
    case M.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let Y = !0;
const be = [], F = "pinia:mutations", T = "pinia", { assign: Ft } = Object, he = (e) => "🍍 " + e;
function Ut(e, o) {
  Ye({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: be,
    app: e
  }, (t) => {
    typeof t.now != "function" && w("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), t.addTimelineLayer({
      id: F,
      label: "Pinia 🍍",
      color: 15064968
    }), t.addInspector({
      id: T,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            At(o);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await Wt(o), t.sendInspectorTree(T), t.sendInspectorState(T);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            Mt(o);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Rt(o), t.sendInspectorTree(T), t.sendInspectorState(T);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (s) => {
            const i = o._s.get(s);
            i ? typeof i.$reset != "function" ? w(`Cannot reset "${s}" store because it doesn't have a "$reset" method implemented.`, "warn") : (i.$reset(), w(`Store "${s}" reset.`)) : w(`Cannot reset "${s}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), t.on.inspectComponent((s, i) => {
      const r = s.componentInstance && s.componentInstance.proxy;
      if (r && r._pStores) {
        const a = s.componentInstance.proxy._pStores;
        Object.values(a).forEach((n) => {
          s.instanceData.state.push({
            type: he(n.$id),
            key: "state",
            editable: !0,
            value: n._isOptionsAPI ? {
              _custom: {
                value: me(n.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => n.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(n.$state).reduce((c, l) => (c[l] = n.$state[l], c), {})
            )
          }), n._getters && n._getters.length && s.instanceData.state.push({
            type: he(n.$id),
            key: "getters",
            editable: !1,
            value: n._getters.reduce((c, l) => {
              try {
                c[l] = n[l];
              } catch (m) {
                c[l] = m;
              }
              return c;
            }, {})
          });
        });
      }
    }), t.on.getInspectorTree((s) => {
      if (s.app === e && s.inspectorId === T) {
        let i = [o];
        i = i.concat(Array.from(o._s.values())), s.rootNodes = (s.filter ? i.filter((r) => "$id" in r ? r.$id.toLowerCase().includes(s.filter.toLowerCase()) : nt.toLowerCase().includes(s.filter.toLowerCase())) : i).map(Qt);
      }
    }), t.on.getInspectorState((s) => {
      if (s.app === e && s.inspectorId === T) {
        const i = s.nodeId === _e ? o : o._s.get(s.nodeId);
        if (!i)
          return;
        i && (s.state = Dt(i));
      }
    }), t.on.editInspectorState((s, i) => {
      if (s.app === e && s.inspectorId === T) {
        const r = s.nodeId === _e ? o : o._s.get(s.nodeId);
        if (!r)
          return w(`store "${s.nodeId}" not found`, "error");
        const { path: a } = s;
        qe(r) ? a.unshift("state") : (a.length !== 1 || !r._customProperties.has(a[0]) || a[0] in r.$state) && a.unshift("$state"), Y = !1, s.set(r, a, s.state.value), Y = !0;
      }
    }), t.on.editComponentState((s) => {
      if (s.type.startsWith("🍍")) {
        const i = s.type.replace(/^🍍\s*/, ""), r = o._s.get(i);
        if (!r)
          return w(`store "${i}" not found`, "error");
        const { path: a } = s;
        if (a[0] !== "state")
          return w(`Invalid path for store "${i}":
${a}
Only state can be modified.`);
        a[0] = "$state", Y = !1, s.set(r, a, s.state.value), Y = !0;
      }
    });
  });
}
function Gt(e, o) {
  be.includes(he(o.$id)) || be.push(he(o.$id)), Ye({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: be,
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
    const s = typeof t.now == "function" ? t.now.bind(t) : Date.now;
    o.$onAction(({ after: a, onError: n, name: c, args: l }) => {
      const m = rt++;
      t.addTimelineEvent({
        layerId: F,
        event: {
          time: s(),
          title: "🛫 " + c,
          subtitle: "start",
          data: {
            store: I(o.$id),
            action: I(c),
            args: l
          },
          groupId: m
        }
      }), a((h) => {
        z = void 0, t.addTimelineEvent({
          layerId: F,
          event: {
            time: s(),
            title: "🛬 " + c,
            subtitle: "end",
            data: {
              store: I(o.$id),
              action: I(c),
              args: l,
              result: h
            },
            groupId: m
          }
        });
      }), n((h) => {
        z = void 0, t.addTimelineEvent({
          layerId: F,
          event: {
            time: s(),
            logType: "error",
            title: "💥 " + c,
            subtitle: "end",
            data: {
              store: I(o.$id),
              action: I(c),
              args: l,
              error: h
            },
            groupId: m
          }
        });
      });
    }, !0), o._customProperties.forEach((a) => {
      Fe(() => S(o[a]), (n, c) => {
        t.notifyComponentUpdate(), t.sendInspectorState(T), Y && t.addTimelineEvent({
          layerId: F,
          event: {
            time: s(),
            title: "Change",
            subtitle: a,
            data: {
              newValue: n,
              oldValue: c
            },
            groupId: z
          }
        });
      }, { deep: !0 });
    }), o.$subscribe(({ events: a, type: n }, c) => {
      if (t.notifyComponentUpdate(), t.sendInspectorState(T), !Y)
        return;
      const l = {
        time: s(),
        title: Bt(n),
        data: Ft({ store: I(o.$id) }, zt(a)),
        groupId: z
      };
      n === M.patchFunction ? l.subtitle = "⤵️" : n === M.patchObject ? l.subtitle = "🧩" : a && !Array.isArray(a) && (l.subtitle = a.type), a && (l.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: a
        }
      }), t.addTimelineEvent({
        layerId: F,
        event: l
      });
    }, { detached: !0, flush: "sync" });
    const i = o._hotUpdate;
    o._hotUpdate = U((a) => {
      i(a), t.addTimelineEvent({
        layerId: F,
        event: {
          time: s(),
          title: "🔥 " + o.$id,
          subtitle: "HMR update",
          data: {
            store: I(o.$id),
            info: I("HMR update")
          }
        }
      }), t.notifyComponentUpdate(), t.sendInspectorTree(T), t.sendInspectorState(T);
    });
    const { $dispose: r } = o;
    o.$dispose = () => {
      r(), t.notifyComponentUpdate(), t.sendInspectorTree(T), t.sendInspectorState(T), t.getSettings().logStoreChanges && w(`Disposed "${o.$id}" store 🗑`);
    }, t.notifyComponentUpdate(), t.sendInspectorTree(T), t.sendInspectorState(T), t.getSettings().logStoreChanges && w(`"${o.$id}" store installed 🆕`);
  });
}
let rt = 0, z;
function Ae(e, o, t) {
  const s = o.reduce((i, r) => (i[r] = me(e)[r], i), {});
  for (const i in s)
    e[i] = function() {
      const r = rt, a = t ? new Proxy(e, {
        get(...c) {
          return z = r, Reflect.get(...c);
        },
        set(...c) {
          return z = r, Reflect.set(...c);
        }
      }) : e;
      z = r;
      const n = s[i].apply(a, arguments);
      return z = void 0, n;
    };
}
function Jt({ app: e, store: o, options: t }) {
  if (o.$id.startsWith("__hot:"))
    return;
  o._isOptionsAPI = !!t.state, Ae(o, Object.keys(t.actions), o._isOptionsAPI);
  const s = o._hotUpdate;
  me(o)._hotUpdate = function(i) {
    s.apply(this, arguments), Ae(o, Object.keys(i._hmrPayload.actions), !!o._isOptionsAPI);
  }, Gt(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    o
  );
}
function Zt() {
  const e = ze(!0), o = e.run(() => _({}));
  let t = [], s = [];
  const i = U({
    install(r) {
      re(i), i._a = r, r.provide(Xe, i), r.config.globalProperties.$pinia = i, ae && Ut(r, i), s.forEach((a) => t.push(a)), s = [];
    },
    use(r) {
      return !this._a && !Ze ? s.push(r) : t.push(r), this;
    },
    _p: t,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: o
  });
  return ae && typeof Proxy < "u" && i.use(Jt), i;
}
function ct(e, o) {
  for (const t in o) {
    const s = o[t];
    if (!(t in e))
      continue;
    const i = e[t];
    G(i) && G(s) && !ne(s) && !Te(s) ? e[t] = ct(i, s) : e[t] = s;
  }
  return e;
}
const lt = () => {
};
function We(e, o, t, s = lt) {
  e.push(o);
  const i = () => {
    const r = e.indexOf(o);
    r > -1 && (e.splice(r, 1), s());
  };
  return !t && Vt() && Ct(i), i;
}
function K(e, ...o) {
  e.slice().forEach((t) => {
    t(...o);
  });
}
const Kt = (e) => e();
function Pe(e, o) {
  e instanceof Map && o instanceof Map && o.forEach((t, s) => e.set(s, t)), e instanceof Set && o instanceof Set && o.forEach(e.add, e);
  for (const t in o) {
    if (!o.hasOwnProperty(t))
      continue;
    const s = o[t], i = e[t];
    G(i) && G(s) && e.hasOwnProperty(t) && !ne(s) && !Te(s) ? e[t] = Pe(i, s) : e[t] = s;
  }
  return e;
}
const Yt = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Xt(e) {
  return !G(e) || !e.hasOwnProperty(Yt);
}
const { assign: x } = Object;
function Me(e) {
  return !!(ne(e) && e.effect);
}
function He(e, o, t, s) {
  const { state: i, actions: r, getters: a } = o, n = t.state.value[e];
  let c;
  function l() {
    !n && (process.env.NODE_ENV === "production" || !s) && (t.state.value[e] = i ? i() : {});
    const m = process.env.NODE_ENV !== "production" && s ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      je(_(i ? i() : {}).value)
    ) : je(t.state.value[e]);
    return x(m, r, Object.keys(a || {}).reduce((h, g) => (process.env.NODE_ENV !== "production" && g in m && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${g}" in store "${e}".`), h[g] = U(Ee(() => {
      re(t);
      const P = t._s.get(e);
      return a[g].call(P, P);
    })), h), {}));
  }
  return c = we(e, l, o, t, s, !0), c;
}
function we(e, o, t = {}, s, i, r) {
  let a;
  const n = x({ actions: {} }, t);
  if (process.env.NODE_ENV !== "production" && !s._e.active)
    throw new Error("Pinia destroyed");
  const c = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Ze && (c.onTrigger = (f) => {
    l ? P = f : l == !1 && !p._hotUpdating && (Array.isArray(P) ? P.push(f) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let l, m, h = [], g = [], P;
  const O = s.state.value[e];
  !r && !O && (process.env.NODE_ENV === "production" || !i) && (s.state.value[e] = {});
  const J = _({});
  let le;
  function te(f) {
    let u;
    l = m = !1, process.env.NODE_ENV !== "production" && (P = []), typeof f == "function" ? (f(s.state.value[e]), u = {
      type: M.patchFunction,
      storeId: e,
      events: P
    }) : (Pe(s.state.value[e], f), u = {
      type: M.patchObject,
      payload: f,
      storeId: e,
      events: P
    });
    const C = le = Symbol();
    xe().then(() => {
      le === C && (l = !0);
    }), m = !0, K(h, u, s.state.value[e]);
  }
  const ge = r ? function() {
    const { state: u } = t, C = u ? u() : {};
    this.$patch((k) => {
      x(k, C);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : lt
  );
  function Ve() {
    a.stop(), h = [], g = [], s._s.delete(e);
  }
  function ue(f, u) {
    return function() {
      re(s);
      const C = Array.from(arguments), k = [], oe = [];
      function bt(N) {
        k.push(N);
      }
      function ht(N) {
        oe.push(N);
      }
      K(g, {
        args: C,
        name: f,
        store: p,
        after: bt,
        onError: ht
      });
      let se;
      try {
        se = u.apply(this && this.$id === e ? this : p, C);
      } catch (N) {
        throw K(oe, N), N;
      }
      return se instanceof Promise ? se.then((N) => (K(k, N), N)).catch((N) => (K(oe, N), Promise.reject(N))) : (K(k, se), se);
    };
  }
  const V = /* @__PURE__ */ U({
    actions: {},
    getters: {},
    state: [],
    hotState: J
  }), v = {
    _p: s,
    // _s: scope,
    $id: e,
    $onAction: We.bind(null, g),
    $patch: te,
    $reset: ge,
    $subscribe(f, u = {}) {
      const C = We(h, f, u.detached, () => k()), k = a.run(() => Fe(() => s.state.value[e], (oe) => {
        (u.flush === "sync" ? m : l) && f({
          storeId: e,
          type: M.direct,
          events: P
        }, oe);
      }, x({}, c, u)));
      return C;
    },
    $dispose: Ve
  }, p = gt(process.env.NODE_ENV !== "production" || ae ? x(
    {
      _hmrPayload: V,
      _customProperties: U(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    v
    // must be added later
    // setupStore
  ) : v);
  s._s.set(e, p);
  const $ = (s._a && s._a.runWithContext || Kt)(() => s._e.run(() => (a = ze()).run(o)));
  for (const f in $) {
    const u = $[f];
    if (ne(u) && !Me(u) || Te(u))
      process.env.NODE_ENV !== "production" && i ? pe(J.value, f, Ce($, f)) : r || (O && Xt(u) && (ne(u) ? u.value = O[f] : Pe(u, O[f])), s.state.value[e][f] = u), process.env.NODE_ENV !== "production" && V.state.push(f);
    else if (typeof u == "function") {
      const C = process.env.NODE_ENV !== "production" && i ? u : ue(f, u);
      $[f] = C, process.env.NODE_ENV !== "production" && (V.actions[f] = u), n.actions[f] = u;
    } else
      process.env.NODE_ENV !== "production" && Me(u) && (V.getters[f] = r ? (
        // @ts-expect-error
        t.getters[f]
      ) : u, ye && ($._getters || // @ts-expect-error: same
      ($._getters = U([]))).push(f));
  }
  if (x(p, $), x(me(p), $), Object.defineProperty(p, "$state", {
    get: () => process.env.NODE_ENV !== "production" && i ? J.value : s.state.value[e],
    set: (f) => {
      if (process.env.NODE_ENV !== "production" && i)
        throw new Error("cannot set hotState");
      te((u) => {
        x(u, f);
      });
    }
  }), process.env.NODE_ENV !== "production" && (p._hotUpdate = U((f) => {
    p._hotUpdating = !0, f._hmrPayload.state.forEach((u) => {
      if (u in p.$state) {
        const C = f.$state[u], k = p.$state[u];
        typeof C == "object" && G(C) && G(k) ? ct(C, k) : f.$state[u] = k;
      }
      pe(p, u, Ce(f.$state, u));
    }), Object.keys(p.$state).forEach((u) => {
      u in f.$state || ve(p, u);
    }), l = !1, m = !1, s.state.value[e] = Ce(f._hmrPayload, "hotState"), m = !0, xe().then(() => {
      l = !0;
    });
    for (const u in f._hmrPayload.actions) {
      const C = f[u];
      pe(p, u, ue(u, C));
    }
    for (const u in f._hmrPayload.getters) {
      const C = f._hmrPayload.getters[u], k = r ? (
        // special handling of options api
        Ee(() => (re(s), C.call(p, p)))
      ) : C;
      pe(p, u, k);
    }
    Object.keys(p._hmrPayload.getters).forEach((u) => {
      u in f._hmrPayload.getters || ve(p, u);
    }), Object.keys(p._hmrPayload.actions).forEach((u) => {
      u in f._hmrPayload.actions || ve(p, u);
    }), p._hmrPayload = f._hmrPayload, p._getters = f._getters, p._hotUpdating = !1;
  })), ae) {
    const f = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((u) => {
      Object.defineProperty(p, u, x({ value: p[u] }, f));
    });
  }
  return s._p.forEach((f) => {
    if (ae) {
      const u = a.run(() => f({
        store: p,
        app: s._a,
        pinia: s,
        options: n
      }));
      Object.keys(u || {}).forEach((C) => p._customProperties.add(C)), x(p, u);
    } else
      x(p, a.run(() => f({
        store: p,
        app: s._a,
        pinia: s,
        options: n
      })));
  }), process.env.NODE_ENV !== "production" && p.$state && typeof p.$state == "object" && typeof p.$state.constructor == "function" && !p.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${p.$id}".`), O && r && t.hydrate && t.hydrate(p.$state, O), l = !0, m = !0, p;
}
function eo(e, o, t) {
  let s, i;
  const r = typeof o == "function";
  s = e, i = r ? t : o;
  function a(n, c) {
    const l = mt();
    if (n = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && ie && ie._testing ? null : n) || (l ? Be(Xe, null) : null), n && re(n), process.env.NODE_ENV !== "production" && !ie)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    n = ie, n._s.has(s) || (r ? we(s, o, i, n) : He(s, i, n), process.env.NODE_ENV !== "production" && (a._pinia = n));
    const m = n._s.get(s);
    if (process.env.NODE_ENV !== "production" && c) {
      const h = "__hot:" + s, g = r ? we(h, o, i, n, !0) : He(h, x({}, i), n, !0);
      c._hotUpdate(g), delete n.state.value[h], n._s.delete(h);
    }
    if (process.env.NODE_ENV !== "production" && ye) {
      const h = yt();
      if (h && h.proxy && // avoid adding stores that are just built for hot module replacement
      !c) {
        const g = h.proxy, P = "_pStores" in g ? g._pStores : g._pStores = {};
        P[s] = m;
      }
    }
    return m;
  }
  return a.$id = s, a;
}
const to = ["id", "checked"], oo = ["for", "innerHTML"], so = /* @__PURE__ */ q({
  __name: "MCQOption",
  props: {
    optionKey: {},
    checked: { type: Boolean },
    option: {},
    submitted: { type: Boolean }
  },
  emits: ["selectOption"],
  setup(e, { emit: o }) {
    const t = o, s = () => t("selectOption");
    return (i, r) => (b(), y(R, null, [
      (b(), y("input", {
        id: "option-" + i.optionKey,
        key: i.optionKey,
        "test-id": "radio_options",
        type: "radio",
        name: "options",
        checked: i.checked,
        class: Q(i.submitted && "ignore-hover"),
        onClick: [
          r[0] || (r[0] = (a) => s()),
          r[1] || (r[1] = vt(() => {
          }, ["stop"]))
        ]
      }, null, 10, to)),
      (b(), y("label", {
        key: i.optionKey,
        for: "option-" + i.optionKey,
        class: Q(i.submitted ? "mcq-option-label ignore-hover" : "mcq-option-label"),
        onClick: r[2] || (r[2] = (a) => s()),
        innerHTML: i.option.optionValue
      }, null, 10, oo))
    ], 64));
  }
}), j = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [s, i] of o)
    t[s] = i;
  return t;
}, io = /* @__PURE__ */ j(so, [["__scopeId", "data-v-e5ddf38c"]]), ao = ["disabled"], no = /* @__PURE__ */ q({
  __name: "MCQButton",
  props: {
    submitted: { type: Boolean },
    selectedOption: {},
    hideSkip: { type: Boolean }
  },
  emits: ["submitAnswer", "nextQuestion", "skipQuestion"],
  setup(e, { emit: o }) {
    const t = _("skip"), s = _("Skip"), i = o, r = (c, l) => {
      !c && l ? a("next", "Next", "submitAnswer") : c && l ? a("skip", "Skip", "nextQuestion") : !c && !l && a("skip", "Skip", "skipQuestion");
    }, a = (c, l, m) => {
      t.value = c, s.value = l, i(m);
    }, n = (c, l) => c && l ? { class: "next", text: "Next" } : !c && l ? { class: "submit", text: "Submit" } : { class: t.value, text: s.value };
    return (c, l) => (b(), y("div", null, [
      d("button", {
        disabled: c.hideSkip && n(c.submitted, c.selectedOption).class === "skip",
        class: Q(["mcq-button", n(c.submitted, c.selectedOption).class]),
        onClick: l[0] || (l[0] = (m) => r(c.submitted, c.selectedOption))
      }, E(n(c.submitted, c.selectedOption).text), 11, ao)
    ]));
  }
}), ro = /* @__PURE__ */ j(no, [["__scopeId", "data-v-847b8dd5"]]), co = /* @__PURE__ */ q({
  __name: "NextButton",
  props: {
    buttonName: {}
  },
  emits: ["nextQuestion", "prevQuestion"],
  setup(e, { emit: o }) {
    const { buttonName: t } = e, s = o, i = () => {
      r(t !== "←" ? "nextQuestion" : "prevQuestion");
    }, r = (a) => {
      s(a);
    };
    return (a, n) => (b(), y("div", null, [
      d("button", {
        class: Q(a.buttonName === "Submit" ? "submit_btn" : "mcq-button"),
        onClick: n[0] || (n[0] = (c) => i())
      }, E(a.buttonName), 3)
    ]));
  }
}), Re = /* @__PURE__ */ j(co, [["__scopeId", "data-v-8be7f61e"]]), lo = [
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
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
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Action potentials are transmitted along which part of a neuron?</p>",
    optionsList: [
      {
        optionValue: "<p>Axon</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Pre-synaptic terminal</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Cell body</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Dendrite</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Myelin</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af39e"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>The resting membrane potential of a mammalian neuron is:</p>",
    optionsList: [
      {
        optionValue: "<p>&minus;55 mV</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>0 mV</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>70 mV</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>&minus;70 mV</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af39d"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>The membrane potential is due to:</p>",
    optionsList: [
      {
        optionValue: "<p>Na<sup>+</sup> diffusion in, K<sup>+</sup> diffusion out, the Na<sup>+</sup>/K<sup>+</sup> pump</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Na<sup>+</sup> diffusion out, K<sup>+</sup> diffusion in, the Na<sup>+</sup>/K<sup>+</sup> pump</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Na<sup>+</sup> diffusion out, K<sup>+</sup> diffusion out, the Na<sup>+</sup>/K<sup>+</sup> pump</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af39c"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
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
      $oid: "6625c7c8c8259deb8c3af3a1"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>What happens when an IPSP is generated after EPSP?</p>",
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
      $oid: "6625c7c8c8259deb8c3af39f"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
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
      $oid: "6625c7c8c8259deb8c3af3a0"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>What is the term used to describe an action potential that &ldquo;jumps&rdquo; from one node of Ranvier to another?</p>",
    optionsList: [
      {
        optionValue: "<p>EPSP conduction</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Saltatory conduction</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Myelinated conduction</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>IPSP conduction</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af3a3"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>What happens when the membrane potential goes below &minus;70 mV?</p>",
    optionsList: [
      {
        optionValue: "<p>Potassium conductance leads to potassium equilibrium potential</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Sodium equilibrium potential is reached</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Sodium conductance causes depolarisation</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Sodium conductance leads to potassium equilibrium potential</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>The membrane is depolarised</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af3a4"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
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
      $oid: "6625c7c8c8259deb8c3af3a2"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
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
      $oid: "6625c7c8c8259deb8c3af3a6"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214413464c71f1df2110d07"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
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
      $oid: "6625c7c8c8259deb8c3af3a5"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214413464c71f1df2110d07"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Which of the following statements is TRUE?</p>",
    optionsList: [
      {
        optionValue: "<p>Electrical synapses are mediated by neurotransmitters</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Connexons are ion channels connecting 2 adjacent cells,&nbsp;and their opening is modulated by intracellular K<sup>+</sup> concentration</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Neurotransmitter molecules are stored in vesicles in the pre-synaptic terminal</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>The synaptic cleft in an electrical synapse is 20&ndash;40 nm wide</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fa8"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d3a64c71f1df2110d15"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>During chemical neurotransmission, Ca<sup>2+</sup>&nbsp;ions are necessary for:</p>",
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
        optionValue: "<p>Fusing the pre-synaptic vesicle with the pre-synaptic membrane, thus releasing the transmitter</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Metabolising the transmitter within the pre-synaptic vesicle</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fa9"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d3a64c71f1df2110d15"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
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
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
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
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
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
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
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
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
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
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Which of the following structures is NOT a site where signal integration takes place?</p>",
    optionsList: [
      {
        optionValue: "<p>Brain nuclei</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Tracts</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Ganglia</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Grey matter</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed870d6"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bee64c71f1df2110d10/64005d36e322761352e0f0bf"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Which of the following statements about grey matter is TRUE?</p>",
    optionsList: [
      {
        optionValue: "<p>It forms the outer segment of the spinal cord</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It is found in tracts and nerves</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It is a site of signal integration</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>It is a site where axons are grouped together</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed870d8"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bee64c71f1df2110d10/64005d36e322761352e0f0bf"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Which of the following is a characteristic of a reflex?</p>",
    optionsList: [
      {
        optionValue: "<p>It requires conscious thought</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It does not require a stimulus to occur</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Sensory information is carried into the spinal cord via the ventral root</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It is reproducible</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed870d7"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bee64c71f1df2110d10/64005d36e322761352e0f0bf"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Which of the following statements is INCORRECT?</p>",
    optionsList: [
      {
        optionValue: "<p>The muscle fibre and neuronal cell membranes are similar because they both have a resting membrane potential</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>A whole muscle, such as the semitendinosus muscle, can be made to contract more forcefully by increasing the number of motor units contracting</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>The muscle cell membrane transmits action potentials by saltatory conduction</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>The shortening of a skeletal muscle during contraction is caused by the sliding together of actin and myosin filaments</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86faf"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bee64c71f1df2110d10/621846c064c71f1df2110d23"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>What class of muscle nerve fibre associated with muscle spindles fires quickly, and responds to a change in length?</p>",
    optionsList: [
      {
        optionValue: "<p>&alpha;</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>&gamma;</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Ia</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Ib</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>II</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fb3"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bee64c71f1df2110d10/621846c064c71f1df2110d23"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>What class of muscle nerve fibre associated with muscle spindles provides sensory input regarding the amount the muscle has stretched?</p>",
    optionsList: [
      {
        optionValue: "<p>&alpha;</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>&gamma;</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Ia</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Ib</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>II</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fb2"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bee64c71f1df2110d10/621846c064c71f1df2110d23"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Which of the following statements regarding the process of co-activation is FALSE?</p>",
    optionsList: [
      {
        optionValue: "<p>Intrafusal fibres receive motor innervation via &gamma;&nbsp;motor neurons</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>&gamma; motor neurons&nbsp;maintain the relative length of the muscle spindle, to the main muscle during contraction and relaxation</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>When muscle fibres contract, the muscle spindle shortens and the rate of action potentials in the afferent fibre increases</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>The purpose of maintaining muscle spindle tension is so that sensory information regarding changes in muscle length can still be signalled</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fb0"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bee64c71f1df2110d10/621846c064c71f1df2110d23"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Which of the following statements regarding Golgi tendon organs is FALSE?</p>",
    optionsList: [
      {
        optionValue: "<p>Golgi tendon organs are located in the muscular tendinous junctions</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Goldi tendon organs provide sensory information regarding muscle stretch</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Golgi tendon organs are innervated by Ib sensory afferents</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Golgi tendon organs provide sensory information regarding muscle tension</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fb1"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bee64c71f1df2110d10/621846c064c71f1df2110d23"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Tension is sensed by the Golgi tendon organ. Which of the following statements describes what happens next?</p>",
    optionsList: [
      {
        optionValue: "<p>Type Ib afferent is excited, synapses with an inhibitory interneuron to the &alpha; motor neuron to decrease forced output</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Type Ib afferent is excited, synapses with an inhibitory interneuron to the &gamma; motor neuron to decrease forced output</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Type Ib afferent is excited, synapses with an inhibitory interneuron to the &gamma; motor neuron to decrease forced output</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Type Ib afferent is excited, synapses with an inhibitory interneuron to the &alpha; motor neuron to increase forced output</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fb4"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bee64c71f1df2110d10/621846c064c71f1df2110d23"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Which of the following statements best describes the pain withdrawal reflex?</p>",
    optionsList: [
      {
        optionValue: "<p>A noxious stimulus results in inhibition of the flexor muscles and stimulation of the extensor muscles in the affected limb, and stimulation of the flexor muscles and inhibition of the extensor muscles in the contralateral limb</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>A noxious stimulus results in stimulation of the flexor muscles, and stimulation of the flexor muscles in the contralateral limb</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>The pain withdrawal reflex results in contraction of the extensor muscles of the opposite limb to a painful stimulus, and relaxation of the flexor muscles in the affected limb</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>A noxious stimulus results in stimulation of the flexor muscles and&nbsp;inhibition of the extensor muscles in the affected limb, and inhibition of the flexor muscles and stimulation of the extensor muscles in the contralateral limb</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fb5"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bee64c71f1df2110d10/621846cd64c71f1df2110d24"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>A gross skeletal muscle belly can be instructed (by the central nervous system) to contract more forcefully by:</p>",
    optionsList: [
      {
        optionValue: "<p>Causing more of its motor units to contract simultaneously</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Increasing the amount of acetylcholine released during each neuromuscular synaptic transmission</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Increasing the frequency of action potentials in the &alpha; motor neuron&rsquo;s axon</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Both a and c</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Both b and c</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fb6"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bee64c71f1df2110d10/621846db64c71f1df2110d25"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which mechanoreceptors are rapidly adapting and responsive to light touch?",
    optionsList: [
      {
        optionValue: "Pacini corpuscles",
        optionCorrect: !1
      },
      {
        optionValue: "Merkel disks",
        optionCorrect: !1
      },
      {
        optionValue: "Meissner corpuscles",
        optionCorrect: !0
      },
      {
        optionValue: "Ruffini endings",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fb7"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bf664c71f1df2110d11/6218483164c71f1df2110d2f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which mechanoreceptors sense vibration?",
    optionsList: [
      {
        optionValue: "Ruffini endings",
        optionCorrect: !1
      },
      {
        optionValue: "Pacinian corpuscles",
        optionCorrect: !0
      },
      {
        optionValue: "Hair follicle receptors",
        optionCorrect: !1
      },
      {
        optionValue: "Meissner corpuscles",
        optionCorrect: !1
      },
      {
        optionValue: "Merkel corpuscles",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fb9"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bf664c71f1df2110d11/6218483164c71f1df2110d2f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which of the following sensations are perceived by Merkel cells?",
    optionsList: [
      {
        optionValue: "Light pressure",
        optionCorrect: !0
      },
      {
        optionValue: "Crude touch",
        optionCorrect: !1
      },
      {
        optionValue: "Pain",
        optionCorrect: !1
      },
      {
        optionValue: "Vibration",
        optionCorrect: !1
      },
      {
        optionValue: "Temperature",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fb8"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bf664c71f1df2110d11/6218483164c71f1df2110d2f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which of the following receptors respond to stretch and have a wide receptive field?",
    optionsList: [
      {
        optionValue: "Meissner corpuscles",
        optionCorrect: !1
      },
      {
        optionValue: "Ruffini endings",
        optionCorrect: !0
      },
      {
        optionValue: "Merkel cells",
        optionCorrect: !1
      },
      {
        optionValue: "Pacinian corpuscles",
        optionCorrect: !1
      },
      {
        optionValue: "Hair cells",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fba"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bf664c71f1df2110d11/6218483164c71f1df2110d2f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Sensory nerve afferents can release substances that can cause pain. Which of the following substances would be the most likely to be derived from a sensory nerve?</p>",
    optionsList: [
      {
        optionValue: "<p>Histamine</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Acetylcholine</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Hydrogen ions</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Substance P</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fbd"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bf664c71f1df2110d11/6218484164c71f1df2110d30"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Peripheral sensitisation of the nociceptors decreases the pain threshold. Which of the following substances sensitises the nociceptor endings?</p>",
    optionsList: [
      {
        optionValue: "<p>Histamine</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Bradykinin</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Serotonin</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Potassium</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fbb"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bf664c71f1df2110d11/6218484164c71f1df2110d30"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Which of the following statements regarding <strong>secondary</strong> hyperalgesia is FALSE?</p>",
    optionsList: [
      {
        optionValue: "<p>The area surrounding a trauma can become tender</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Hypersensitivity is restricted to those nociceptors directly exposed to the injured or inflamed tissue</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Secondary hyperalgesia can alter central nociceptive processing in the spinal cord</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Central sensitisation manifests as pain hypersensitivity</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fbc"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bf664c71f1df2110d11/6218484164c71f1df2110d30"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Which of the following processes is the cerebral cortex NOT involved in?</p>",
    optionsList: [
      {
        optionValue: "Motor planning and execution",
        optionCorrect: !1
      },
      {
        optionValue: "Visual and auditory processing",
        optionCorrect: !1
      },
      {
        optionValue: "Somatosensory and spatial processing",
        optionCorrect: !1
      },
      {
        optionValue: "Helps provide smooth, coordinated body movement",
        optionCorrect: !0
      },
      {
        optionValue: "Learning and memory",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fbe"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bfc64c71f1df2110d12/62184c2564c71f1df2110d37"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which part of the cortex is responsible for visual processing?",
    optionsList: [
      {
        optionValue: "Broca&rsquo;s area",
        optionCorrect: !1
      },
      {
        optionValue: "Frontal lobe",
        optionCorrect: !1
      },
      {
        optionValue: "Occipital lobe",
        optionCorrect: !0
      },
      {
        optionValue: "Temporal lobe",
        optionCorrect: !1
      },
      {
        optionValue: "Limbic system",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fc1"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bfc64c71f1df2110d12/62184c2564c71f1df2110d37"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Where in the cortex does language comprehension take place?",
    optionsList: [
      {
        optionValue: "Wernicke&rsquo;s area",
        optionCorrect: !0
      },
      {
        optionValue: "Frontal lobe",
        optionCorrect: !1
      },
      {
        optionValue: "Occipital lobe",
        optionCorrect: !1
      },
      {
        optionValue: "Temporal lobe",
        optionCorrect: !1
      },
      {
        optionValue: "Limbic system",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fc0"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bfc64c71f1df2110d12/62184c2564c71f1df2110d37"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "The limbic system is the part of the brain involved in which of the following?",
    optionsList: [
      {
        optionValue: "Voluntary motor activity",
        optionCorrect: !1
      },
      {
        optionValue: "Long-term memory",
        optionCorrect: !0
      },
      {
        optionValue: "Planning movement",
        optionCorrect: !1
      },
      {
        optionValue: "Higher-order visual processing",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fc2"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bfc64c71f1df2110d12/62184c2564c71f1df2110d37"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which sensory pathway does NOT pass through the thalamus?",
    optionsList: [
      {
        optionValue: "Proprioception",
        optionCorrect: !1
      },
      {
        optionValue: "Olfactory",
        optionCorrect: !0
      },
      {
        optionValue: "Vestibular",
        optionCorrect: !1
      },
      {
        optionValue: "Visual",
        optionCorrect: !1
      },
      {
        optionValue: "Auditory",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fbf"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bfc64c71f1df2110d12/62184c2564c71f1df2110d37"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Which of the following is NOT a feature of habituation?</p>",
    optionsList: [
      {
        optionValue: "<p>Desensitisation is related to a decrease in synaptic connectivity between sensory and motor neurons</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Strengthens the response to a potentially dangerous stimulus</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Decreases the amplitude of excitatory post-synaptic potentials</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Long-term habituation results in a structural change in synaptic connections (they decrease in number)</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fc5"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bfc64c71f1df2110d12/62184c3564c71f1df2110d38"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>A client calls because their dog is getting more and more fearful when walking in their neighbourhood, where there&rsquo;s a lot of road traffic. Last week, a car back-fired noisily in the driveway, right next to the dog. What is this an example of?</p>",
    optionsList: [
      {
        optionValue: "<p>Classical conditioning</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Operant conditioning</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Habituation</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Sensitisation</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fc3"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bfc64c71f1df2110d12/62184c3564c71f1df2110d38"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "An animal trainer forms an association between a signal and the desired response by re-enforcing when this is achieved. For example, if a dog is barking at everyone that walks past a house, the trainer might start associating the word &ldquo;speak&rdquo; with the act of barking, by saying it every time the behaviour occurs. They then reinforce this with a treat. What is this an example of?",
    optionsList: [
      {
        optionValue: "Classical conditioning",
        optionCorrect: !1
      },
      {
        optionValue: "Operant conditioning",
        optionCorrect: !0
      },
      {
        optionValue: "Habituation",
        optionCorrect: !1
      },
      {
        optionValue: "Sensitisation",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fc4"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bfc64c71f1df2110d12/62184c3564c71f1df2110d38"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>During short-term sensitisation of a stimulus/response pathway, which neurotransmitter is released from the axon terminal of the facilitating interneuron?</p>",
    optionsList: [
      {
        optionValue: "<p>Dopamine</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Acetylcholine</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Glutamate</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Serotonin</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fc6"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bfc64c71f1df2110d12/62184c4564c71f1df2110d39"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Long-term sensitisation of a stimulus/response pathway will facilitate learning. Which of the following is NOT a feature of this process?</p>",
    optionsList: [
      {
        optionValue: "<p>Increased number of action potentials along motor neurons&nbsp;to carry out movement</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Increased number of vesicles</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Increased number of vesicle release sites</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Increased number of pre-synaptic terminals</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fc7"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bfc64c71f1df2110d12/62184c4564c71f1df2110d39"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Long-term memories are&nbsp;stored in which part of the brain?</p>",
    optionsList: [
      {
        optionValue: "<p>Occipital lobe</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Frontal lobe</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Hippocampus</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Wernicke&rsquo;s area</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fc8"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bfc64c71f1df2110d12/62184c4564c71f1df2110d39"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Where does the calcium bind in the thin filament?</p>",
    optionsList: [
      {
        optionValue: "<p>Troponin C</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Troponin I</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Actin</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Tropomyosin</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Troponin T</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fc9"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218633464c71f1df2110d4c"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Which of the following is NOT a part of the thin filament?</p>",
    optionsList: [
      {
        optionValue: "<p>Tropomyosin</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Actin</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Myosin heads</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Troponin C</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Troponin T</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fca"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218633464c71f1df2110d4c"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which of the following is activated by membrane depolarisation within the T-tubule of a skeletal myocyte?",
    optionsList: [
      {
        optionValue: "Ionotropic nicotinic receptor",
        optionCorrect: !1
      },
      {
        optionValue: "Ryanodine receptor",
        optionCorrect: !1
      },
      {
        optionValue: "5HT receptor",
        optionCorrect: !1
      },
      {
        optionValue: "Metabotropic nicotinic receptor",
        optionCorrect: !1
      },
      {
        optionValue: "Dihydropyridine receptor",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fcb"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218634464c71f1df2110d4d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which neurotransmitter is responsible for the initiation of skeletal muscle contraction?",
    optionsList: [
      {
        optionValue: "GABA",
        optionCorrect: !1
      },
      {
        optionValue: "Norepinephrine",
        optionCorrect: !1
      },
      {
        optionValue: "Acetylcholine",
        optionCorrect: !0
      },
      {
        optionValue: "Glutamine",
        optionCorrect: !1
      },
      {
        optionValue: "Glycine",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fcc"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218634464c71f1df2110d4d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which of the following allows for Ca<sup>2+</sup> to re-enter the sarcoplasmic reticulum and terminate the muscle contraction?",
    optionsList: [
      {
        optionValue: "The ionotropic nicotinic receptor",
        optionCorrect: !1
      },
      {
        optionValue: "Sarco/endoplasmic reticulum calcium-ATPase (SERCA)",
        optionCorrect: !0
      },
      {
        optionValue: "The muscarinic receptor",
        optionCorrect: !1
      },
      {
        optionValue: "The dihydropyridine receptor",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fcd"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218634464c71f1df2110d4d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Which of the following molecules is bound to myosin when the myosin head binds to the actin site?</p>",
    optionsList: [
      {
        optionValue: "<p>ADP</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>AMP</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>UDP</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>UTP</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>ATP</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fcf"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218635864c71f1df2110d4e"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Which of the following is NOT a step in the muscle contraction process?</p>",
    optionsList: [
      {
        optionValue: "<p>Tropomyosin covering the active site on actin</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>ADP molecule released during the power stroke</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>ATP binds to myosin causing the dissociation of the myosin head from the actin filament</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Hydrolysis of ATP allows for the cocking of the myosin head</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Calcium binds to troponin C, which moves tropomyosin from the active site on the actin filament</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fce"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218635864c71f1df2110d4e"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which of the following contributes to planning movement?",
    optionsList: [
      {
        optionValue: "Brainstem",
        optionCorrect: !1
      },
      {
        optionValue: "Motor cortex",
        optionCorrect: !1
      },
      {
        optionValue: "Broca&rsquo;s area",
        optionCorrect: !1
      },
      {
        optionValue: "Cerebellum",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fd0"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218636964c71f1df2110d4f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "What is the brainstem&rsquo;s involvement in locomotion?",
    optionsList: [
      {
        optionValue: "Fine tunes locomotion",
        optionCorrect: !1
      },
      {
        optionValue: "Controls speed",
        optionCorrect: !0
      },
      {
        optionValue: "Plans voluntary movements",
        optionCorrect: !1
      },
      {
        optionValue: "Processes sensory feedback",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fd1"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218636964c71f1df2110d4f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which of the following tracts provides sensory information from muscles to the CNS?",
    optionsList: [
      {
        optionValue: "Corticobulbar tract",
        optionCorrect: !1
      },
      {
        optionValue: "Spinocerebellar tract",
        optionCorrect: !0
      },
      {
        optionValue: "Lateral corticospinal tract",
        optionCorrect: !1
      },
      {
        optionValue: "Anterior corticospinal tract",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fd2"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218637d64c71f1df2110d50"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which of the following pathways is responsible for controlling the movement of limb muscles?",
    optionsList: [
      {
        optionValue: "Corticobulbar tract",
        optionCorrect: !1
      },
      {
        optionValue: "Spinocerebellar tract",
        optionCorrect: !1
      },
      {
        optionValue: "Lateral corticospinal tract",
        optionCorrect: !0
      },
      {
        optionValue: "Anterior corticospinal tract",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fd7"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218637d64c71f1df2110d50"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "The corticospinal tract has many functions. Which of the following is the MOST important function?",
    optionsList: [
      {
        optionValue: "Control of afferent inputs",
        optionCorrect: !1
      },
      {
        optionValue: "Spinal&nbsp;reflexes",
        optionCorrect: !1
      },
      {
        optionValue: "Motor&nbsp;neuron&nbsp;activity",
        optionCorrect: !1
      },
      {
        optionValue: "Mediation of voluntary distal movements",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fd4"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218637d64c71f1df2110d50"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which of the following statements regarding lower motor neurons is FALSE?",
    optionsList: [
      {
        optionValue: "They contact skeletal muscle, leading to muscle contraction",
        optionCorrect: !1
      },
      {
        optionValue: "They travel in the corticospinal tract",
        optionCorrect: !0
      },
      {
        optionValue: "Their cell body is in the spinal cord",
        optionCorrect: !1
      },
      {
        optionValue: "They synapse with upper motor neurons",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fd3"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218637d64c71f1df2110d50"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "The corticobulbar tract is responsible for innervating muscles of the:",
    optionsList: [
      {
        optionValue: "Face, head, and neck",
        optionCorrect: !0
      },
      {
        optionValue: "Limbs",
        optionCorrect: !1
      },
      {
        optionValue: "Trunk, neck, and shoulders",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fd5"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218637d64c71f1df2110d50"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "When the right forelimb is moved, where in the brain does the signal originate?",
    optionsList: [
      {
        optionValue: "Right cortex",
        optionCorrect: !1
      },
      {
        optionValue: "Cerebellum",
        optionCorrect: !1
      },
      {
        optionValue: "Medulla",
        optionCorrect: !1
      },
      {
        optionValue: "Left cortex",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fd6"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218637d64c71f1df2110d50"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Which of the following statements regarding the basal ganglia is FALSE?</p>",
    optionsList: [
      {
        optionValue: "<p>It doesn&rsquo;t receive spinal input</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It receives direct input from the cerebral cortex</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It modulates activity at the brainstem level</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>It is primarily associated with voluntary motor control</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fd8"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218639064c71f1df2110d51"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Which of the following is NOT a function of the basal ganglia?</p>",
    optionsList: [
      {
        optionValue: "Cognitive function",
        optionCorrect: !1
      },
      {
        optionValue: "Initiating movement",
        optionCorrect: !0
      },
      {
        optionValue: "Voluntary motor control",
        optionCorrect: !1
      },
      {
        optionValue: "Learning routine behaviours",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fd9"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218639064c71f1df2110d51"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Into which chamber of the eye does the ciliary body secrete fluid?</p>",
    optionsList: [
      {
        optionValue: "<p>Posterior chamber</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Anterior chamber</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Vitreous chamber</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Sclera chamber</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fdc"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb55d64c71f1df2110d53"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>What is a blind spot in the eye?</p>",
    optionsList: [
      {
        optionValue: "<p>Optic disc</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Cornea</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Choroid</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Fovea</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Retina</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fdd"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb55d64c71f1df2110d53"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Which of the following regions of the eye has the highest number of cone cells?</p>",
    optionsList: [
      {
        optionValue: "<p>Optic disc</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Retina</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Choroid</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Fovea</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Zonule fibres</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fdb"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb55d64c71f1df2110d53"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Which of the following is considered a normal intraocular pressure in a dog?</p>",
    optionsList: [
      {
        optionValue: "<p>13 mmHg</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>26 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>7 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>5 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>32 mmHg</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fda"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb55d64c71f1df2110d53"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>In which sequence does light enter and course through the eye?</p>",
    optionsList: [
      {
        optionValue: "<p>Object &ndash; lens &ndash; aqueous humor &ndash; vitreous humor &ndash; retina</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Air &ndash; object &ndash; lens &ndash; retina</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Object &ndash; air &ndash; cornea &ndash; aqueous humor &ndash; lens &ndash; vitreous humor &ndash; retina</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Object &ndash; lens &ndash; air &ndash; retina &ndash; vitreous humor</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Lens &ndash; aqueous humor &ndash; cornea &ndash; air &ndash; object</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fde"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb57364c71f1df2110d54"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Which of the following would cause the lens to relax?</p>",
    optionsList: [
      {
        optionValue: "<p>Taut zonule fibres</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Contraction of ciliary muscles</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Bright light</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Relaxation of ciliary muscles</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Object far away</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fe1"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb57364c71f1df2110d54"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>What acts as an aperture to restrict light entry into the eye?</p>",
    optionsList: [
      {
        optionValue: "<p>Lens</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Cornea</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Iris</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Sclera</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Retina</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fe0"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb57364c71f1df2110d54"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>The structure in the eye responsible for the greatest refraction of light is the:</p>",
    optionsList: [
      {
        optionValue: "<p>Cornea</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Aqueous humor</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Lens</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Vitreous humor</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fdf"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb57364c71f1df2110d54"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>In an eye that is longer than normal, how is the image focussed incorrectly?</p>",
    optionsList: [
      {
        optionValue: "<p>Light is not bent enough, leading to the image being focussed beyond the retina</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>The image is split into 2 focal points, creating blurred vision at all distances</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Light transmission is obscured</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Light rays from distant objects are focussed in front of the retina</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fe2"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb58864c71f1df2110d55"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>A dog with emmetropia will have:</p>",
    optionsList: [
      {
        optionValue: "<p>Less light transmission</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Normal vision</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Difficulty focussing on objects close by</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Blurry vision at all distances</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fe4"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb58864c71f1df2110d55"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Birds&nbsp;can tell relative distances using one eye. What method of depth perception do they use to do this?</p>",
    optionsList: [
      {
        optionValue: "<p>Stereopsis</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Comparing the size of the image with a known object</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Moving parallax</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fe3"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb58864c71f1df2110d55"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Sunlight changes the retinal component rhodopsin into which of the following configurations?</p>",
    optionsList: [
      {
        optionValue: "<p>All-<em>trans</em> retinal</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>11-<em>cis</em> retinal</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>3&rsquo; GMP retinal</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Transducin</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fe6"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb5aa64c71f1df2110d56"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Where are specialised photoreceptor response elements located in photoreceptor cells?</p>",
    optionsList: [
      {
        optionValue: "<p>Inner segments</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Synaptic terminal</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Outer segment</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Basal cells</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Pigment epithelium</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fe5"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb5aa64c71f1df2110d56"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Which of the following will contribute to the hyperpolarisation of the photoreceptor membrane?</p>",
    optionsList: [
      {
        optionValue: "<p>Inactive phosphodiesterase</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Increase in cAMP</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Darkness</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Sodium influx</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Decrease in cGMP</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fe7"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb5aa64c71f1df2110d56"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>What happens when light photons reach the retina?</p>",
    optionsList: [
      {
        optionValue: "<p>Potassium channels open</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Potassium channels close</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Calcium channels open</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Sodium channels close</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Sodium channels open</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fe8"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb5aa64c71f1df2110d56"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>When a dog sees an object in the distance and stares at it, which of the following is NOT a component of how they process the visual information to determine what it is?</p>",
    optionsList: [
      {
        optionValue: "<p>The colour of the object is determined by cones</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Stereopsis is used to determine how far away the object is</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Contraction of ciliary muscles</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Light rays from the object are focussed on the retina by accommodation of the lens</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fe9"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb5bb64c71f1df2110d57"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "In which part of the ear does amplification of sound occur?",
    optionsList: [
      {
        optionValue: "Internal ear",
        optionCorrect: !1
      },
      {
        optionValue: "Incus",
        optionCorrect: !1
      },
      {
        optionValue: "Middle ear",
        optionCorrect: !0
      },
      {
        optionValue: "Malleus",
        optionCorrect: !1
      },
      {
        optionValue: "External ear",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fea"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac0d64c71f1df2110d82"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which chamber of the cochlea houses the Organ of Corti?",
    optionsList: [
      {
        optionValue: "Anterior chamber",
        optionCorrect: !1
      },
      {
        optionValue: "Middle chamber",
        optionCorrect: !0
      },
      {
        optionValue: "Upper chamber",
        optionCorrect: !1
      },
      {
        optionValue: "Lower chamber",
        optionCorrect: !1
      },
      {
        optionValue: "Posterior chamber",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fec"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac0d64c71f1df2110d82"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which muscle dampens soundwaves when it contracts?",
    optionsList: [
      {
        optionValue: "Stapedius",
        optionCorrect: !0
      },
      {
        optionValue: "Tensor veli palatini",
        optionCorrect: !1
      },
      {
        optionValue: "Lateral pterygoid",
        optionCorrect: !1
      },
      {
        optionValue: "Medial pterygoid",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86feb"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac0d64c71f1df2110d82"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which structure senses soundwave frequency?",
    optionsList: [
      {
        optionValue: "Tympanic membrane",
        optionCorrect: !1
      },
      {
        optionValue: "Incus",
        optionCorrect: !1
      },
      {
        optionValue: "Stapes",
        optionCorrect: !1
      },
      {
        optionValue: "Hair cells",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ff0"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac1a64c71f1df2110d83"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "A high pitch (<em>i.e.</em>, 12 kHz) sound stimulates hair cells closest to which cochlear-related structure?",
    optionsList: [
      {
        optionValue: "Oval window",
        optionCorrect: !0
      },
      {
        optionValue: "Apex of the basilar membrane",
        optionCorrect: !1
      },
      {
        optionValue: "Apex of the scala tympani",
        optionCorrect: !1
      },
      {
        optionValue: "Helicotrema",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fed"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac1a64c71f1df2110d83"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which of the following fluids in the ear has the highest potassium concentration?",
    optionsList: [
      {
        optionValue: "Plasma",
        optionCorrect: !1
      },
      {
        optionValue: "Endolymph",
        optionCorrect: !0
      },
      {
        optionValue: "Perilymph",
        optionCorrect: !1
      },
      {
        optionValue: "Hair cell cytosol",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ff1"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac1a64c71f1df2110d83"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "At the auditory nerve synapse level, depolarisation of the pre-synaptic membrane causes calcium influx which results in the release of which of the following substances from the synaptic vesicles?",
    optionsList: [
      {
        optionValue: "Acetylcholine",
        optionCorrect: !1
      },
      {
        optionValue: "Glutamate",
        optionCorrect: !0
      },
      {
        optionValue: "Adrenaline",
        optionCorrect: !1
      },
      {
        optionValue: "GABA",
        optionCorrect: !1
      },
      {
        optionValue: "Serotonin",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fef"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac1a64c71f1df2110d83"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which ion enters hair cells after membrane depolarisation?",
    optionsList: [
      {
        optionValue: "Sodium",
        optionCorrect: !1
      },
      {
        optionValue: "Chloride",
        optionCorrect: !1
      },
      {
        optionValue: "Calcium",
        optionCorrect: !0
      },
      {
        optionValue: "Potassium",
        optionCorrect: !1
      },
      {
        optionValue: "Magnesium",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fee"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac1a64c71f1df2110d83"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which of the following occurs during rotation of the head?",
    optionsList: [
      {
        optionValue: "The endolymph moves in the opposite direction of the rotation",
        optionCorrect: !0
      },
      {
        optionValue: "The resting discharge rate does not change",
        optionCorrect: !1
      },
      {
        optionValue: "Some of the hair cells bend in the opposite direction, causing them to depolarise",
        optionCorrect: !1
      },
      {
        optionValue: "Some of the hair cells bend in the same direction, causing them to hyperpolarise",
        optionCorrect: !1
      },
      {
        optionValue: "The endolymph moves in the same direction of the rotation.",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ff2"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac2c64c71f1df2110d84"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which of the following is NOT a part of the vestibular system?",
    optionsList: [
      {
        optionValue: "Saccule",
        optionCorrect: !1
      },
      {
        optionValue: "Semicircular canals",
        optionCorrect: !1
      },
      {
        optionValue: "Utricle",
        optionCorrect: !1
      },
      {
        optionValue: "Malleus",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ff5"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac2c64c71f1df2110d84"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which of the following is produced when hair cells are bent toward the kinocilium?",
    optionsList: [
      {
        optionValue: "Depolarisation",
        optionCorrect: !0
      },
      {
        optionValue: "Hyperpolarisation",
        optionCorrect: !1
      },
      {
        optionValue: "No change",
        optionCorrect: !1
      },
      {
        optionValue: "Decreased conductance of potassium ions",
        optionCorrect: !1
      },
      {
        optionValue: "Decreased resting potential",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ff4"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac2c64c71f1df2110d84"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "The hair cells get bent in one direction due to the presence of which of the following substances?",
    optionsList: [
      {
        optionValue: "Water",
        optionCorrect: !1
      },
      {
        optionValue: "Gelatinous material",
        optionCorrect: !1
      },
      {
        optionValue: "Plasma",
        optionCorrect: !1
      },
      {
        optionValue: "Gelatinous material and calcium stones",
        optionCorrect: !0
      },
      {
        optionValue: "Calcium stones",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ff3"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac2c64c71f1df2110d84"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "<p>Which of the following can be a normal physiological process, as well as a pathologic one?</p>",
    optionsList: [
      {
        optionValue: "<p>Ataxia</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Head tilt</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Nystagmus</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Altered mentation</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ff6"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6237a6c664c71f1df2110d8f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which of the given primary taste stimuli depend on G protein-coupled receptors to depolarise the cell?",
    optionsList: [
      {
        optionValue: "Bitter and sweet",
        optionCorrect: !0
      },
      {
        optionValue: "Sour and sweet",
        optionCorrect: !1
      },
      {
        optionValue: "Salty and sour",
        optionCorrect: !1
      },
      {
        optionValue: "Salty and bitter",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099e7f"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6242d73f64c71f1df2110ded/6242d7a264c71f1df2110df0"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which cranial nerve contains sensory neurons that contribute to the gag reflex?",
    optionsList: [
      {
        optionValue: "Facial nerve (CN VII)",
        optionCorrect: !1
      },
      {
        optionValue: "Glossopharyngeal nerve (CN IX)",
        optionCorrect: !1
      },
      {
        optionValue: "Vagus nerve (CN X)",
        optionCorrect: !0
      },
      {
        optionValue: "Hypoglossal nerve (CN XII)",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099e81"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6242d73f64c71f1df2110ded/6242d7a264c71f1df2110df0"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which of the given primary taste stimuli are triggered by ions in the saliva?",
    optionsList: [
      {
        optionValue: "Bitter and sweet",
        optionCorrect: !1
      },
      {
        optionValue: "Sour and sweet",
        optionCorrect: !1
      },
      {
        optionValue: "Salty and sour",
        optionCorrect: !0
      },
      {
        optionValue: "Salty and bitter",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099e80"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6242d73f64c71f1df2110ded/6242d7a264c71f1df2110df0"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Binding of an odorant to an odorant receptor on olfactory cells results in which of the following?",
    optionsList: [
      {
        optionValue: "Inflow of calcium",
        optionCorrect: !0
      },
      {
        optionValue: "Inflow of chloride",
        optionCorrect: !1
      },
      {
        optionValue: "Outflow of calcium",
        optionCorrect: !1
      },
      {
        optionValue: "Outflow of calcium and sodium",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099e82"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6242d73f64c71f1df2110ded/6242d7a864c71f1df2110df1"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "What is the mechanism of smell transduction via the olfactory nerve?",
    optionsList: [
      {
        optionValue: "Tyrosine kinase-mediated",
        optionCorrect: !1
      },
      {
        optionValue: "G protein-mediated cGMP activation",
        optionCorrect: !1
      },
      {
        optionValue: "G protein-mediated cAMP activation",
        optionCorrect: !0
      },
      {
        optionValue: "Interaction of potassium and chloride",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099e83"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6242d73f64c71f1df2110ded/6242d7a864c71f1df2110df1"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Where are the autonomic ganglia of the parasympathetic nervous system predominantly located?",
    optionsList: [
      {
        optionValue: "Far from the end organ",
        optionCorrect: !1
      },
      {
        optionValue: "Within the dorsal root of the spinal cord",
        optionCorrect: !1
      },
      {
        optionValue: "Close to the spinal cord",
        optionCorrect: !1
      },
      {
        optionValue: "Close to the end organ",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ff7"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc22d64c71f1df2110dae"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "What receptor is used in the autonomic ganglia in the parasympathetic nervous system to transduce their signals to the post-ganglionic nerve fibre?",
    optionsList: [
      {
        optionValue: "Muscarinic type 1",
        optionCorrect: !1
      },
      {
        optionValue: "Nicotinic type 2",
        optionCorrect: !0
      },
      {
        optionValue: "Nicotinic type 1",
        optionCorrect: !1
      },
      {
        optionValue: "Muscarinic type 2",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ff8"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc22d64c71f1df2110dae"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Acetylcholine released from preganglionic neurons binds to which of the following receptors in the sympathetic nervous system?",
    optionsList: [
      {
        optionValue: "Nicotinic type 2",
        optionCorrect: !0
      },
      {
        optionValue: "Muscarinic type 1",
        optionCorrect: !1
      },
      {
        optionValue: "Muscarinic type 3",
        optionCorrect: !1
      },
      {
        optionValue: "Nicotinic type 1",
        optionCorrect: !1
      },
      {
        optionValue: "Muscarinic type 2",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ffa"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc22d64c71f1df2110dae"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which of the following statements is TRUE regarding the length of the nerves in the parasympathetic nervous system?",
    optionsList: [
      {
        optionValue: "Post-synaptic nerves are long",
        optionCorrect: !1
      },
      {
        optionValue: "Pre-synaptic nerves are long",
        optionCorrect: !0
      },
      {
        optionValue: "Pre-synaptic nerves are short",
        optionCorrect: !1
      },
      {
        optionValue: "Length is not important for determining the action",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ff9"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc22d64c71f1df2110dae"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Where are the autonomic ganglia of the sympathetic nervous system predominantly located?",
    optionsList: [
      {
        optionValue: "Within the dorsal root of the spinal cord",
        optionCorrect: !1
      },
      {
        optionValue: "Close to the spinal cord in the sympathetic chain",
        optionCorrect: !0
      },
      {
        optionValue: "Close to the end organ",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ffb"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc35e64c71f1df2110daf"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which part of the central nervous system is the main integration centre for the autonomic nervous system?",
    optionsList: [
      {
        optionValue: "Spinal cord",
        optionCorrect: !1
      },
      {
        optionValue: "Brainstem",
        optionCorrect: !1
      },
      {
        optionValue: "Hypothalamus",
        optionCorrect: !0
      },
      {
        optionValue: "Limbic lobe",
        optionCorrect: !1
      },
      {
        optionValue: "Cerebral cortex",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ffd"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc35e64c71f1df2110daf"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which part of the central nervous system provides emotional input for the autonomic nervous system?",
    optionsList: [
      {
        optionValue: "Brainstem",
        optionCorrect: !1
      },
      {
        optionValue: "Hypothalamus",
        optionCorrect: !1
      },
      {
        optionValue: "Limbic lobe",
        optionCorrect: !0
      },
      {
        optionValue: "Spinal cord",
        optionCorrect: !1
      },
      {
        optionValue: "Cerebral cortex",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ffc"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc35e64c71f1df2110daf"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "In which part of the central nervous system is the respiratory centre located?",
    optionsList: [
      {
        optionValue: "Spinal cord",
        optionCorrect: !1
      },
      {
        optionValue: "Brainstem",
        optionCorrect: !0
      },
      {
        optionValue: "Hypothalamus",
        optionCorrect: !1
      },
      {
        optionValue: "Limbic lobe",
        optionCorrect: !1
      },
      {
        optionValue: "Cerebral cortex",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ffe"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc35e64c71f1df2110daf"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which of the following receptors in the sympathetic system increases the heart rate when engaged?",
    optionsList: [
      {
        optionValue: "Muscarinic type 1",
        optionCorrect: !1
      },
      {
        optionValue: "Beta-2 adrenergic",
        optionCorrect: !1
      },
      {
        optionValue: "Beta-1 adrenergic",
        optionCorrect: !0
      },
      {
        optionValue: "Nicotinic",
        optionCorrect: !1
      },
      {
        optionValue: "Muscarinic type 2",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fff"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc37364c71f1df2110db0"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which of the following nerves is an important component of the parasympathetic nervous system?",
    optionsList: [
      {
        optionValue: "Vagus",
        optionCorrect: !0
      },
      {
        optionValue: "Occulomotor",
        optionCorrect: !1
      },
      {
        optionValue: "Glossopharangeal",
        optionCorrect: !1
      },
      {
        optionValue: "Abducent",
        optionCorrect: !1
      },
      {
        optionValue: "Facial",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87001"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc37364c71f1df2110db0"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which of the following receptors induces vasoconstriction of blood vessels in the skin when engaged?",
    optionsList: [
      {
        optionValue: "Alpha adrenergic",
        optionCorrect: !0
      },
      {
        optionValue: "Beta-2 adrenergic",
        optionCorrect: !1
      },
      {
        optionValue: "Muscarinic type 1",
        optionCorrect: !1
      },
      {
        optionValue: "Nicotinic",
        optionCorrect: !1
      },
      {
        optionValue: "Beta-1 adrenergic",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87000"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc37364c71f1df2110db0"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which of the following receptors of the sympathetic system induces bronchiole dilation in the lungs when engaged?",
    optionsList: [
      {
        optionValue: "Nicotinic",
        optionCorrect: !1
      },
      {
        optionValue: "Muscarinic type 1",
        optionCorrect: !1
      },
      {
        optionValue: "Alpha adrenergic",
        optionCorrect: !1
      },
      {
        optionValue: "Muscarinic type 2",
        optionCorrect: !1
      },
      {
        optionValue: "Beta adrenergic",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87002"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc37364c71f1df2110db0"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which of the following receptors in the sympathetic system contracts sphincters in the GI tract, slowing the passage of food?",
    optionsList: [
      {
        optionValue: "Muscarinic type 1",
        optionCorrect: !1
      },
      {
        optionValue: "Beta-2 adrenergic",
        optionCorrect: !1
      },
      {
        optionValue: "Alpha-1 adrenergic",
        optionCorrect: !0
      },
      {
        optionValue: "Nicotinic",
        optionCorrect: !1
      },
      {
        optionValue: "Muscarinic type 2",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87003"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc38064c71f1df2110db1"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which of the following receptors in the sympathetic system contracts the radial muscle in the iris, and what is its effect on the pupil?",
    optionsList: [
      {
        optionValue: "Muscarinic type 1; Dilates the pupil",
        optionCorrect: !1
      },
      {
        optionValue: "Beta-2 adrenergic; Dilates the pupil",
        optionCorrect: !1
      },
      {
        optionValue: "Alpha-1 adrenergic; Constricts the pupil",
        optionCorrect: !1
      },
      {
        optionValue: "Nicotinic; Constricts the pupil",
        optionCorrect: !1
      },
      {
        optionValue: "Alpha-1 adrenergic; Dilates the pupil",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87005"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc38064c71f1df2110db1"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "Which of the following receptors in the parasympathetic system contracts the circular sphincter muscle in the iris, and what is its effect on the pupil?",
    optionsList: [
      {
        optionValue: "Muscarinic; Constricts the pupil",
        optionCorrect: !0
      },
      {
        optionValue: "Beta-2 adrenergic; Dilates the pupil",
        optionCorrect: !1
      },
      {
        optionValue: "Nicotinic; Constricts the pupil",
        optionCorrect: !1
      },
      {
        optionValue: "Alpha-1 adrenergic; Dilates the pupil",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87004"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc38064c71f1df2110db1"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System"
    },
    statement: "In a racehorse,&nbsp;which of the following receptors in the sympathetic system increases the production of sweat?",
    optionsList: [
      {
        optionValue: "Muscarinic type 1",
        optionCorrect: !1
      },
      {
        optionValue: "Beta-2 adrenergic",
        optionCorrect: !1
      },
      {
        optionValue: "Alpha-1 adrenergic",
        optionCorrect: !1
      },
      {
        optionValue: "Nicotinic",
        optionCorrect: !1
      },
      {
        optionValue: "Muscarinic type 3",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87006"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc38064c71f1df2110db1"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>If intrapleural pressure begins at &minus;5 cm H<sub>2</sub>O, what would it be during a normal resting inhalation?</p>",
    optionsList: [
      {
        optionValue: "<p>Higher than &minus;5 but still less than 0</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Positive (above 0)</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>More negative (lower than &minus;5)</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Intrapleural pressure does not change</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87007"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a37e64c71f1df2110e05"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>When the muscles of inspiration contract:</p>",
    optionsList: [
      {
        optionValue: "<p>The thoracic cavity increases in size, the pleural pressure decreases, the alveolar pressure decreases, and air flows in</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>The thoracic cavity increases in size, the pleural pressure increases, the alveolar pressure decreases, and air flows in</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>The thoracic cavity decreases in size, the pleural pressure increases, the alveolar pressure increases, and air flows out</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>The thoracic cavity decreases in size, the pleural pressure decreases, the alveolar pressure decreases, and air flows in</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87008"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a37e64c71f1df2110e05"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Which of the following statements best represents Tidal Volume (TV or VT)?</p>",
    optionsList: [
      {
        optionValue: "<p>Maximum amount of air that can be moved in or out of the lungs in a single respiratory cycle</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Amount of air inhaled and exhaled during a normal breath</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Volume of air remaining after a normal exhalation</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Amount of air that can be further inhaled after a normal inhalation</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87009"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a38f64c71f1df2110e06"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Which of the following statements best represents Functional Residual Capacity (FRC)?</p>",
    optionsList: [
      {
        optionValue: "<p>Volume of air remaining after a normal exhalation</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Air left in the lungs after a forced exhalation</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Total volume of air in the lungs after a maximal inspiration</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Amount of air that can be exhaled after a normal exhalation</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed8700a"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a38f64c71f1df2110e06"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Which of the following is NOT an example of obstructive lung disease?</p>",
    optionsList: [
      {
        optionValue: "<p>Severe equine asthma</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Pulmonary oedema</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Foreign object</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Emphysema</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed8700b"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a39e64c71f1df2110e07"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Which of the following statements is TRUE for Poiseuille&rsquo;s Law?</p>",
    optionsList: [
      {
        optionValue: "<p>Resistance is eight times the length of the tube</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Resistance is inversely proportional to the radius to the 4th power</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Resistance is inversely proportional to the viscosity</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Resistance is nine times the radius of the tube</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed8700c"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a39e64c71f1df2110e07"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Which of the following does NOT occur in emphysema?</p>",
    optionsList: [
      {
        optionValue: "<p>Pleural pressure equals zero</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Elastic recoil of the lungs is decreased</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Airway resistance is increased</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Dynamic obstruction of the airways takes place</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed8700d"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a39e64c71f1df2110e07"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>What is the alveolar ventilation of a patient who is breathing 15 times per minute and has a dead space volume of 300 mL and a tidal volume of 500 mL?</p>",
    optionsList: [
      {
        optionValue: "<p>7500 mL/min</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>3000 mL/min</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>4500 mL/min</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>200 mL/min</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed8700e"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a3b464c71f1df2110e08"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>What is the minute ventilation of a patient who is breathing 8 times per minute and has a dead space volume of 200 mL and a tidal volume of 300 mL?</p>",
    optionsList: [
      {
        optionValue: "<p>800 mL/min</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>2400 mL/min</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>1600 mL/min</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>300 mL/min</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed8700f"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a3b464c71f1df2110e08"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>In which pathological or physiological condition would lung compliance be greater than normal?</p>",
    optionsList: [
      {
        optionValue: "<p>Emphysema</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Fibrosis</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Atelectasis</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87010"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a3c164c71f1df2110e09"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Which of the following pneumocyte types would still be immature in a premature foal, putting them at risk for respiratory distress?</p>",
    optionsList: [
      {
        optionValue: "<p>Type I</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Type II</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Type III</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Type IV</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87011"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a3c164c71f1df2110e09"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Which of the following statements is INCORRECT regarding the surfactant?</p>",
    optionsList: [
      {
        optionValue: "<p>It reduces surface tension</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It is produced by type II pneumocytes</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It is a mix of lipids and proteins</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It has polar and non-polar sides</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It has only non-polar sides</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87012"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a3c164c71f1df2110e09"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Which of the following does NOT occur in restrictive lung disease?</p>",
    optionsList: [
      {
        optionValue: "<p>Increase in respiratory rate</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Use of accessory muscles during respiration</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Decrease in lung compliance</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Absent breath sounds on the affected side</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87013"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a3cd64c71f1df2110e0a"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Which of the following represents normal values for PAO<sub>2</sub>, PaO<sub>2</sub>, and PvO<sub>2</sub> in dogs, respectively?</p>",
    optionsList: [
      {
        optionValue: "<p>40 mmHg, 95 mmHg, and 100 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>95 mmHg, 55 mmHg, 200 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>100 mmHg, 95 mmHg, and 40 mmHg</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>95 mmHg, 100 mmHg, and 40 mmHg</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed870f0"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6269bf3564c71f1df2110e3b/649250f9ffeb1a9baa030b6a"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Which of the following represents normal values for PaCO<sub>2</sub>, PACO<sub>2</sub>, and PvCO<sub>2</sub> in dogs, respectively?</p>",
    optionsList: [
      {
        optionValue: "<p>40 mmHg, 95 mmHg, 100 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>90 mmHg, 40 mmHg, 44 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>44 mmHg, 40 mmHg, 40 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>40 mmHg, 40 mmHg, 44 mmHg</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed870f1"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6269bf3564c71f1df2110e3b/649250f9ffeb1a9baa030b6a"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "Which of the following is the dissolved concentration of O<sub>2</sub> in a normothermic patient, with a PaO<sub>2</sub> of 90 mmHg?",
    optionsList: [
      {
        optionValue: "0.124 mL of O<sub>2</sub> per dL of blood",
        optionCorrect: !1
      },
      {
        optionValue: "0.325 mL of O<sub>2</sub> per dL of blood",
        optionCorrect: !1
      },
      {
        optionValue: "0.279 mL of O<sub>2</sub> per dL of blood",
        optionCorrect: !0
      },
      {
        optionValue: "0.295 mL of O<sub>2</sub> per dL of blood",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87019"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6269bf3564c71f1df2110e3b/6269d02464c71f1df2110e4d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "How many oxygen molecules can bind to one haemoglobin protein?",
    optionsList: [
      {
        optionValue: "1",
        optionCorrect: !1
      },
      {
        optionValue: "2",
        optionCorrect: !1
      },
      {
        optionValue: "3",
        optionCorrect: !1
      },
      {
        optionValue: "4",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87014"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6269bf3564c71f1df2110e3b/6269d02464c71f1df2110e4d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "Why does the oxygen-haemoglobin dissociation curve have a sigmoidal shape?",
    optionsList: [
      {
        optionValue: "As each oxygen molecule unloads from haemoglobin, the affinity for the next oxygen molecule is increased",
        optionCorrect: !1
      },
      {
        optionValue: "As each oxygen molecule binds to haemoglobin, the affinity for the next oxygen molecule is increased",
        optionCorrect: !0
      },
      {
        optionValue: "As each oxygen molecule binds to haemoglobin, the dissolved oxygen content decreases",
        optionCorrect: !1
      },
      {
        optionValue: "As each oxygen molecule binds to haemoglobin, the affinity for the next oxygen molecule is decreased",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87015"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6269bf3564c71f1df2110e3b/6269d02464c71f1df2110e4d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "Which of the following variables changes when a patient with polycythaemia is at 100% saturation?",
    optionsList: [
      {
        optionValue: "The oxygen concentration",
        optionCorrect: !0
      },
      {
        optionValue: "The dissolved arterial oxygen content",
        optionCorrect: !1
      },
      {
        optionValue: "The partial pressure of carbon dioxide",
        optionCorrect: !1
      },
      {
        optionValue: "The partial pressure of oxygen",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87017"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6269bf3564c71f1df2110e3b/6269d02464c71f1df2110e4d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "Which of the following factors shifts the oxygen-haemoglobin dissociation curve to the left?",
    optionsList: [
      {
        optionValue: "High temperature",
        optionCorrect: !1
      },
      {
        optionValue: "Increase in pH",
        optionCorrect: !0
      },
      {
        optionValue: "High concentration of CO<sub>2</sub>",
        optionCorrect: !1
      },
      {
        optionValue: "Decrease in pH",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87016"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6269bf3564c71f1df2110e3b/6269d02464c71f1df2110e4d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "Which of the following factors shifts the oxygen-haemoglobin dissociation curve to the right?",
    optionsList: [
      {
        optionValue: "Decrease in pH",
        optionCorrect: !0
      },
      {
        optionValue: "Decrease in body temperature",
        optionCorrect: !1
      },
      {
        optionValue: "Decrease in 2,3 DPG",
        optionCorrect: !1
      },
      {
        optionValue: "Decrease in hydrogen ion concentration",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87018"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6269bf3564c71f1df2110e3b/6269d02464c71f1df2110e4d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Which of the following ions is bicarbonate exchanged for in a red blood cell?</p>",
    optionsList: [
      {
        optionValue: "<p>Potassium</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Calcium</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Chloride</p>",
        optionCorrect: !0
      },
      {
        optionValue: "Hydrogen",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8701c"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6269bf3564c71f1df2110e3b/6269d2fb64c71f1df2110e53"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "Which of the following statements is CORRECT when comparing the CO<sub>2</sub>-haemoglobin dissociation curve to the O<sub>2</sub>-haemoglobin dissociation curve?",
    optionsList: [
      {
        optionValue: "They are both sigmoidal in shape",
        optionCorrect: !1
      },
      {
        optionValue: "They both have higher partial pressures on the arterial side than the venous side",
        optionCorrect: !1
      },
      {
        optionValue: "Neither molecule affects the other molecule's curve",
        optionCorrect: !1
      },
      {
        optionValue: "The CO<sub>2</sub>-haemoglobin dissociation curve is more linear",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8701a"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6269bf3564c71f1df2110e3b/6269d2fb64c71f1df2110e53"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "Which of the following statements is INCORRECT regarding carbon dioxide transport in the blood?",
    optionsList: [
      {
        optionValue: "There is more CO<sub>2</sub> dissolved in the blood than O<sub>2</sub>",
        optionCorrect: !1
      },
      {
        optionValue: "The solubility of oxygen is greater than that of carbon dioxide",
        optionCorrect: !0
      },
      {
        optionValue: "Less carbon dioxide is bound to haemoglobin as compared to oxygen",
        optionCorrect: !1
      },
      {
        optionValue: "The majority of the carbon dioxide in the body is in the form of bicarbonate ions",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8701b"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6269bf3564c71f1df2110e3b/6269d2fb64c71f1df2110e53"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "Which of the following will have the highest partial pressure of oxygen, at sea level?",
    optionsList: [
      {
        optionValue: "Alveolar air",
        optionCorrect: !1
      },
      {
        optionValue: "Mixed venous blood",
        optionCorrect: !1
      },
      {
        optionValue: "Humidified tracheal air",
        optionCorrect: !0
      },
      {
        optionValue: "Blood in the capillaries",
        optionCorrect: !1
      },
      {
        optionValue: "Blood in the pulmonary vein",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099e9f"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54b564c71f1df2110e5b"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "What is the partial pressure of carbon dioxide in the arterial blood in the systemic circulation?",
    optionsList: [
      {
        optionValue: "20 mmHg",
        optionCorrect: !1
      },
      {
        optionValue: "10 mmHg",
        optionCorrect: !1
      },
      {
        optionValue: "30 mmHg",
        optionCorrect: !1
      },
      {
        optionValue: "40 mmHg",
        optionCorrect: !0
      },
      {
        optionValue: "0 mmHg",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099e9e"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54b564c71f1df2110e5b"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "Which of the following is the a-v O<sub>2</sub> gradient very dependent on?",
    optionsList: [
      {
        optionValue: "Physiological shunting",
        optionCorrect: !1
      },
      {
        optionValue: "Metabolism",
        optionCorrect: !0
      },
      {
        optionValue: "Sodium concentration",
        optionCorrect: !1
      },
      {
        optionValue: "Potassium concentration",
        optionCorrect: !1
      },
      {
        optionValue: "Water vapour pressure",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099ea0"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54b564c71f1df2110e5b"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "Which of the following is NOT a cause of hypoxia?",
    optionsList: [
      {
        optionValue: "Increased fraction of inspired oxygen",
        optionCorrect: !0
      },
      {
        optionValue: "Hypoxaemia",
        optionCorrect: !1
      },
      {
        optionValue: "Low tissue perfusion",
        optionCorrect: !1
      },
      {
        optionValue: "Low cardiac output",
        optionCorrect: !1
      },
      {
        optionValue: "Anaemia",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099e9d"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54b564c71f1df2110e5b"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "Which of the following is NOT a cause of hypoxaemia?",
    optionsList: [
      {
        optionValue: "Right to left shunt",
        optionCorrect: !1
      },
      {
        optionValue: "An A-a gradient of 7 mmHg",
        optionCorrect: !0
      },
      {
        optionValue: "A decreased partial pressure of inspired O<sub>2</sub>",
        optionCorrect: !1
      },
      {
        optionValue: "V/Q inequality",
        optionCorrect: !1
      },
      {
        optionValue: "Diffusion impairment",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099ea5"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54d264c71f1df2110e5d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "Which of the following conditions increases diffusional capacity in the lung?",
    optionsList: [
      {
        optionValue: "Pulmonary fibrosis",
        optionCorrect: !1
      },
      {
        optionValue: "A lower partial pressure gradient",
        optionCorrect: !1
      },
      {
        optionValue: "Increased surface area",
        optionCorrect: !0
      },
      {
        optionValue: "Lower gas solubility",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099ea3"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54d264c71f1df2110e5d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "How does a right-to-left shunt lead to hypoxaemia?",
    optionsList: [
      {
        optionValue: "Some arterial blood bypasses the bronchial circulation, causing a decrease in PaO<sub>2</sub>",
        optionCorrect: !1
      },
      {
        optionValue: "It allows more blood to be channelled through under-ventilated areas of the lungs, causing a decrease in PaO<sub>2</sub>",
        optionCorrect: !1
      },
      {
        optionValue: "Some venous blood bypasses the pulmonary circulation, which decreases PaO<sub>2</sub>",
        optionCorrect: !0
      },
      {
        optionValue: "It allows more blood to travel through the pulmonary circulation, causing a dilution in PaO<sub>2</sub>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099ea1"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54d264c71f1df2110e5d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "The alveolar to arterial oxygen gradient should be less than which of the following to be considered a non-pathologic shunt?",
    optionsList: [
      {
        optionValue: "15 mmHg",
        optionCorrect: !0
      },
      {
        optionValue: "7 mmHg",
        optionCorrect: !1
      },
      {
        optionValue: "12 mmHg",
        optionCorrect: !1
      },
      {
        optionValue: "10 mmHg",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099ea4"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54d264c71f1df2110e5d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "Which of the following will increase the uptake of oxygen in the blood?",
    optionsList: [
      {
        optionValue: "An increase in blood flow through a right-to-left shunt",
        optionCorrect: !1
      },
      {
        optionValue: "A decrease in blood flow through the lungs",
        optionCorrect: !1
      },
      {
        optionValue: "An increase in cardiac output",
        optionCorrect: !0
      },
      {
        optionValue: "A decrease in PAO<sub>2</sub> to 50 mmHg",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099ea2"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54d264c71f1df2110e5d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Which of the following statements is CORRECT about V/Q matching?</p>",
    optionsList: [
      {
        optionValue: "<p>A high V/Q ratio is always better</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>If blood flow is restricted to a single alveolus, the resulting blood will have a decreased oxygen saturation</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>A low V/Q ratio is always better</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Any V/Q mismatch will result in a lower overall PaO<sub>2</sub></p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af3a7"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54f864c71f1df2110e5f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Which zone of the lung is best described by the following pressures: Pa &gt; PA &gt; Pv?</p>",
    optionsList: [
      {
        optionValue: "<p>Zone 1</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Zone 2</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Zone 3</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Zone 4</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af3a8"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54f864c71f1df2110e5f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Alveolar pressure will be lower than the arterial and venous pressures in which zone of the lung?</p>",
    optionsList: [
      {
        optionValue: "<p>Zone 1</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Zone 2</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Zone 3</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Zone 4</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af3a9"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54f864c71f1df2110e5f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>The ventilation-perfusion ratio is normal in which zone of the lung?</p>",
    optionsList: [
      {
        optionValue: "<p>Zone 1</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Zone 2</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Zone 3</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Zone 4</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af3aa"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54f864c71f1df2110e5f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Which of the following PaCO<sub>2</sub> levels corresponds with decreased alveolar ventilation?</p>",
    optionsList: [
      {
        optionValue: "<p>50 mmHg</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>40 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>30 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>20 mmHg</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87021"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a551e64c71f1df2110e61"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "Which type of sensory respiratory neural input is found outside of the lungs?",
    optionsList: [
      {
        optionValue: "Central chemoreceptors",
        optionCorrect: !0
      },
      {
        optionValue: "Lung stretch receptors",
        optionCorrect: !1
      },
      {
        optionValue: "Bronchial C-fibres",
        optionCorrect: !1
      },
      {
        optionValue: "Irritant receptors",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87022"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6271f93964c71f1df2110e72/6271f9bf64c71f1df2110e75"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "Which of the following ions do the central chemoreceptors sense?",
    optionsList: [
      {
        optionValue: "Calcium",
        optionCorrect: !1
      },
      {
        optionValue: "Hydrogen",
        optionCorrect: !0
      },
      {
        optionValue: "Sodium",
        optionCorrect: !1
      },
      {
        optionValue: "Magnesium",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87023"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6271f93964c71f1df2110e72/6271f9bf64c71f1df2110e75"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "Where is the pneumotaxic centre located?",
    optionsList: [
      {
        optionValue: "In the pons",
        optionCorrect: !0
      },
      {
        optionValue: "In the cerebellum",
        optionCorrect: !1
      },
      {
        optionValue: "In the medulla",
        optionCorrect: !1
      },
      {
        optionValue: "In the cerebrum",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87024"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6271f93964c71f1df2110e72/6271f9bf64c71f1df2110e75"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "Which of the following structures sets the central rhythm and frequency of inspiration?",
    optionsList: [
      {
        optionValue: "The caudal portion of the ventral respiratory group neurons",
        optionCorrect: !1
      },
      {
        optionValue: "The dorsal respiratory group neurons",
        optionCorrect: !0
      },
      {
        optionValue: "The pneumotaxic centre",
        optionCorrect: !1
      },
      {
        optionValue: "The apneustic centre",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87025"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6271f93964c71f1df2110e72/6271f9bf64c71f1df2110e75"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Where are the hydrogen ions that stimulate the central chemoreceptors produced?</p>",
    optionsList: [
      {
        optionValue: "<p>In the astrocytes</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>In the CSF</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>In the neuronal intracellular fluid</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>In the Schwann cells</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87026"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6271f93964c71f1df2110e72/6271f9dd64c71f1df2110e77"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Which of the following types of channels are present on type I glomus cells?</p>",
    optionsList: [
      {
        optionValue: "<p>Oxygen-dependent chloride channels</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Oxygen-dependent potassium channels</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Oxygen-dependent sodium channels</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Oxygen-dependent calcium channels</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87028"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6271f93964c71f1df2110e72/6271f9f864c71f1df2110e79"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Which of the following types of channels open after depolarisation of glomus cells at low partial pressures of O<sub>2</sub>?</p>",
    optionsList: [
      {
        optionValue: "<p>T-type calcium channels</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>L-type potassium channels</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>L-type sodium channels</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>L-type calcium channels</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87027"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6271f93964c71f1df2110e72/6271f9f864c71f1df2110e79"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Which of the following changes will occur in the body in response to PO<sub>2</sub> &lt; 60 mmHg?</p>",
    optionsList: [
      {
        optionValue: "<p>Increase in ventilation</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Relaxation of diaphragm</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Decrease in carbon dioxide</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Decrease in ventilation</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87029"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6271f93964c71f1df2110e72/6271fa1b64c71f1df2110e7b"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>What is the total pressure 30 m below the surface of the ocean?</p>",
    optionsList: [
      {
        optionValue: "<p>1 atm</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>2 atm</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>3 atm</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>4 atm</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8702a"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/62736fea64c71f1df2110e8d/6273701364c71f1df2110e8f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "Compared to the volume at the surface, how much volume would the same amount of gas take up 40 m below the surface of the ocean?",
    optionsList: [
      {
        optionValue: "17%",
        optionCorrect: !1
      },
      {
        optionValue: "20%",
        optionCorrect: !0
      },
      {
        optionValue: "33%",
        optionCorrect: !1
      },
      {
        optionValue: "50%",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8702c"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/62736fea64c71f1df2110e8d/6273701364c71f1df2110e8f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "Which of the following is NOT a respiratory limitation under water?",
    optionsList: [
      {
        optionValue: "Limited O<sub>2</sub> supply",
        optionCorrect: !1
      },
      {
        optionValue: "Increasing PCO<sub>2</sub> and acidosis",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Increased blood volume (20% body volume)</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Extreme external pressure causing collapse of alveoli</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8702b"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/62736fea64c71f1df2110e8d/6273701364c71f1df2110e8f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>How much oxygen is extracted from water by the gills?</p>",
    optionsList: [
      {
        optionValue: "<p>20%</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>50%</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>60%</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>80%</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8702d"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/62736fea64c71f1df2110e8d/6273703064c71f1df2110e91"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Which of the following is NOT a feature of counter-current flow?</p>",
    optionsList: [
      {
        optionValue: "<p>It decreases the concentration gradient</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>It increases the efficiency of gas exchange</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It ensures the maximum possible gas exchange occurs</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It increases the concentration gradient</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8702e"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/62736fea64c71f1df2110e8d/6273703064c71f1df2110e91"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Which of the following is NOT a feature of the avian respiratory system?</p>",
    optionsList: [
      {
        optionValue: "<p>Flow through system</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>4 stages of air flow</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Mixing of air</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Counter-current blood and air flow</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8702f"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/62736fea64c71f1df2110e8d/6273704e64c71f1df2110e93"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Birds that fly at altitude have adapted to prevent hypoxia. Which of the following is NOT an adaptation consistent with this goal?</p>",
    optionsList: [
      {
        optionValue: "<p>Hollow bones with air sacs</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Increased haemoglobin affinity for oxygen</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Counter-current blood and air flow</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Thickened blood-gas barrier</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87030"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/62736fea64c71f1df2110e8d/6273704e64c71f1df2110e93"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>Which of the following is NOT a potential consequence of altitude hypoxia in susceptible cattle?</p>",
    optionsList: [
      {
        optionValue: "<p>Localised alveolar hypoxia, causing vasoconstriction in the lungs to correct the V/Q ratio</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Generalised pulmonary hypoxic vasoconstriction</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Increased respiratory rate</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Right sided heart failure</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87031"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/62736fea64c71f1df2110e8d/6273706664c71f1df2110e95"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory System"
    },
    statement: "<p>In a healthy animal, what is the normal net pressure difference between the pulmonary capillary and the pulmonary interstitial space?</p>",
    optionsList: [
      {
        optionValue: "<p>&minus;1 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>+1 mmHg</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>&minus;28 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>+29 mmHg</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87032"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/62736fea64c71f1df2110e8d/6273706664c71f1df2110e95"
  },
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
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "<p>Horses experience exercise-induced hypoxaemia. However, there are several factors which theoretically should work to increase the oxygen diffusion capacity during exercise. Which of the following does NOT contribute to the theoretical increased diffusion capacity of oxygen during exercise?</p>",
    optionsList: [
      {
        optionValue: "<p>Low mixed venous oxygen partial pressure</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Decreased capillary transit time due to increased cardiac output</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Increased surface area for gas exchange</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Dilation and recruitment of poorly perfused or non-perfused sections of the pulmonary capillary bed</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87037"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290794564c71f1df2110ecf"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "<p>Which of the following features of respiratory function during exercise is NOT a contributing factor to the limitation of performance?</p>",
    optionsList: [
      {
        optionValue: "<p>Mechanical constraint on ventilation due to the coupling between breathing and stride frequency (LRC)</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Increased resistance of the upper airways</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Nostril flare</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Increased energy demands of the respiratory muscles</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87038"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290794564c71f1df2110ecf"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "<p>Which of the following parameters can be calculated using treadmill exercise to assess the anaerobic capacity of an individual?</p>",
    optionsList: [
      {
        optionValue: "<p>V̇O<sub>2</sub>max (Maximum oxygen consumption)</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>MAOD (Maximum accumulated oxygen deficit)</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>V200 (Speed at which the heart rate reaches 200 bpm)</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>V̇O<sub>2</sub>peak (Peak oxygen consumption)</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87039"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290796264c71f1df2110ed0"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "<p>Which of the following is NOT a challenge/limitation of performing an exercise test in the field?</p>",
    optionsList: [
      {
        optionValue: "<p>Accurate representation of energy demands a horse experiences for its performance discipline</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Variable weather and track conditions</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Difficult control of speed</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Difficult blood sampling during exercise</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8703a"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290796264c71f1df2110ed0"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "<p>Which of the following can NOT be measured in the field?</p>",
    optionsList: [
      {
        optionValue: "<p>Oxygen consumption (aerobic capacity)</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Maximum accumulated oxygen deficit (anaerobic capacity)</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Peak blood lactate</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Heart rate</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8703b"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290796264c71f1df2110ed0"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "<p>Which of the following does NOT affect the maximal oxygen consumption of a horse?</p>",
    optionsList: [
      {
        optionValue: "<p>Lung function</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Cardiac output</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Efficiency of gas exchange</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Exercise intensity (above that which is required to elicit a plateau in oxygen consumption)</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8703d"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290797c64c71f1df2110ed1"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "<p>Which of the following is NOT an effect of a high-intensity warm-up?</p>",
    optionsList: [
      {
        optionValue: "<p>Vasodilatation and increased blood flow at the onset of the subsequent exercise</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Increased blood lactate accumulation rate</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Increase in acidaemia induces a right-shift in the oxyhaemoglobin equilibrium curve</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Increased pulmonary arterial temperature</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8703c"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290797c64c71f1df2110ed1"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "<p>Which of the following statements regarding blood lactate is TRUE?</p>",
    optionsList: [
      {
        optionValue: "<p>There is a linear relationship between blood lactate concentration and speed</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Blood lactate concentration peaks 30 minutes after the completion of high-intensity exercise</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>There is an exponential relationship between blood lactate concentration and speed</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Arabians will have a higher maximum blood lactate concentration than Thoroughbreds under supramaximal exercise conditions</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8703e"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290799064c71f1df2110ed2"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "<p>The anaerobic threshold is the level of work at which lactate starts to accumulate in the blood. This is arbitrarily defined as the horse&rsquo;s speed at the point where blood lactate reaches 4 mmol/L. Respiratory disease can impair oxygen exchange. What impact might this respiratory disease have on VLa4, when compared to the same horse earlier in the season (before the onset of disease)?</p>",
    optionsList: [
      {
        optionValue: "<p>Higher than expected</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>No change from expected</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Lower than expected</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8703f"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290799064c71f1df2110ed2"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "<p>A higher than expected heart rate for a given exercise intensity might be a sign of what?</p>",
    optionsList: [
      {
        optionValue: "<p>The horse is in pain and should be assessed further</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>The horse is fit in comparison to a cohort control group</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>The horse is ready to compete</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87040"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/629079a364c71f1df2110ed3"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "<p>During an incremental speed test, the horse needs to complete ___ at each speed, in order to reach steady-state at that workload, before increasing in speed to the next step.</p>",
    optionsList: [
      {
        optionValue: "<p>15&ndash;30 seconds</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>30&ndash;45 seconds</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>45&ndash;60 seconds</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>75&ndash;90 seconds</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87041"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/629079a364c71f1df2110ed3"
  }
];
Array.from(
  { length: 10 },
  (e, o) => `VETS20${o + 10}`
);
const uo = "http://localhost:8080";
async function po(e, o) {
  const t = {
    ...o,
    credentials: "include"
  };
  return fetch(e, t);
}
const fo = async () => {
  try {
    const o = await (await po(
      uo + "/api/resource/getQuiz"
    )).json(), { questions: t } = o;
    if (!t)
      throw new Error("No questions from response");
    return t;
  } catch (e) {
    return console.error("An error occurred while fetching the quiz: ", e), [];
  }
}, bo = { getQuiz: fo }, A = {
  isString: (a) => typeof a == "string",
  isObject: (a) => typeof a == "object" && a !== null,
  isBoolean: (a) => typeof a == "boolean",
  isArray: (a, n) => Array.isArray(a) && a.every(n),
  isNumber: (a) => typeof a == "number",
  isFunction: (a) => typeof a == "function"
};
function ho(e) {
  return A.isObject(e) && A.isString(e.optionValue) && (e.optionCorrect === void 0 || A.isBoolean(e.optionCorrect));
}
function ut(e) {
  return A.isObject(e) && A.isObject(e._id) && A.isString(e._id.$oid) && A.isString(e.statement) && A.isObject(e.tags) && A.isArray(e.optionsList, ho) && A.isString(e.link);
}
function mo(e) {
  return A.isArray(e, ut);
}
const Qe = { isMCQuestion: ut, isMCQuestionArray: mo }, yo = () => lo;
function $e() {
  return yo();
}
const go = async () => {
  const e = await bo.getQuiz(), o = e.length;
  if (Qe.isMCQuestionArray(e))
    return e;
  const t = e.filter(
    Qe.isMCQuestion
  );
  return console.warn(
    "Invalid quiz data received from the server. Retrieved questions: ",
    o,
    `
Continuing with valid questions only:`,
    t.length,
    `
${o - t.length}`,
    "questions needs checking"
  ), t;
}, Vo = (e) => {
  for (let o = e.length - 1; o > 0; o--) {
    const t = Math.floor(Math.random() * (o + 1));
    [e[o], e[t]] = [e[t], e[o]];
  }
  return e;
}, Co = (e, o) => Vo(o).slice(0, e);
function vo(e) {
  const o = {
    course: /* @__PURE__ */ new Set(),
    subject: /* @__PURE__ */ new Set(),
    system: /* @__PURE__ */ new Set(),
    animal: /* @__PURE__ */ new Set()
  };
  for (const t of e)
    o.course.add(t.course), o.subject.add(t.subject), o.system.add(t.system), o.animal.add(t.animal);
  return {
    course: [...o.course],
    subject: [...o.subject],
    system: [...o.system],
    animal: [...o.animal]
  };
}
function Ne(e, o) {
  return e.filter((t) => (o.course.length === 0 || o.course.includes(t.tags.course)) && (o.subject.length === 0 || o.subject.includes(t.tags.subject)) && (o.system.length === 0 || o.system.includes(t.tags.system)) && (o.animal.length === 0 || o.animal.includes(t.tags.animal)));
}
function So(e, o, t) {
  const s = e[o].question.optionsList;
  for (let i = 0; i < s.length; i++)
    if (s[i].optionValue === t)
      return i;
}
const pt = (e, o) => o.findIndex((t) => {
  var s;
  return ((s = t.question._id) == null ? void 0 : s.$oid) === e;
}), D = eo("questionsQueue", {
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
      const e = $e();
      return Ne(e, this.selectedTags).length;
    },
    setselectedTags(e) {
      this.selectedTags = e;
    },
    getselectedtags() {
      return this.selectedTags;
    },
    modifySelectedTags(e, { category: o, topic: t }) {
      this.selectedTags[o] = e ? [...this.selectedTags[o], t] : this.selectedTags[o].filter(
        (s) => s !== t
      );
    },
    initialiseQuiz(e, o) {
      this.questionsQueue = e, this.questionsStack = [], this.quizMode = o, this.quizStats = e.map((t) => ({
        question: t,
        correct: 0,
        skipped: 0,
        attempts: 0,
        selectedValue: ""
      }));
    },
    incrementStat(e, o, t) {
      const s = pt(e, this.quizStats);
      if (this.quizStats[s]) {
        if (t !== void 0) {
          if (this.quizStats[s][o]++, t === "-1") {
            this.quizStats[s].selectedValue = "Reached Time Limit";
            return;
          }
          const i = this.quizStats[s].question.optionsList.map((r) => r.optionCorrect).indexOf(!0);
          Number(t) === Number(i) ? this.quizStats[s].correct = 1 : this.quizStats[s].correct = 0;
        }
        this.quizStats[s].selectedValue = t !== void 0 ? this.quizStats[s].question.optionsList[Number(t)].optionValue : "";
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
}), _o = ["innerHTML"], Po = { class: "mcq-list" }, wo = ["onClick"], To = { class: "next-prev-question" }, Eo = /* @__PURE__ */ q({
  __name: "MCQQuestion",
  props: {
    _id: {},
    statement: {},
    optionsList: {}
  },
  emits: ["nextQuestion", "skipQuestion", "prevQuestion"],
  setup(e, { emit: o }) {
    const t = D(), { statement: s, optionsList: i, _id: r } = e, a = _(null), n = _(!1), c = o, l = _(t.getRemainingQuestions()), m = () => {
      n.value = !0;
    }, h = () => {
      a.value = null, c("nextQuestion");
    }, g = (V) => {
      J(V), l.value = t.getRemainingQuestions(), c("nextQuestion");
    }, P = () => {
      J(r), c("skipQuestion");
    }, O = (V) => t.incrementStat(
      V.$oid,
      "attempts",
      a.value ?? void 0
    ), J = (V) => {
      O(V), n.value = !1, a.value = null;
    }, le = () => {
      c("prevQuestion");
    }, te = (V, v) => {
      n.value || (a.value = a.value === v ? null : v), O(V);
    }, ge = (V, v, p) => t.quizMode === "Timed" ? Ve(V, v) : ue(v, p);
    function Ve(V, v) {
      const p = pt(V.$oid, t.quizStats), B = t.quizStats[p].selectedValue, $ = So(
        t.quizStats,
        p,
        B
      );
      return String($) === v ? "selected" : "";
    }
    function ue(V, v) {
      const p = v[parseInt(V)], B = a.value === V;
      return n.value ? p.optionCorrect ? "correct ignore-hover" : B ? "wrong ignore-hover" : "ignore-hover" : B ? "selected" : "";
    }
    return (V, v) => (b(), y(R, null, [
      d("div", {
        class: "mcq-statement",
        innerHTML: V.statement
      }, null, 8, _o),
      d("div", Po, [
        (b(!0), y(R, null, X(Object.entries(V.optionsList), ([p, B]) => (b(), y("div", {
          key: p,
          class: Q(["mcq-option", ge(V._id, p, V.optionsList)]),
          onClick: ($) => te(V._id, p)
        }, [
          ee(io, {
            "option-key": p,
            checked: a.value === p,
            option: B,
            submitted: n.value,
            onSelectOption: ($) => te(V._id, p)
          }, null, 8, ["option-key", "checked", "option", "submitted", "onSelectOption"])
        ], 10, wo))), 128))
      ]),
      S(t).quizMode === "Tutor" ? (b(), W(ro, {
        key: 0,
        submitted: n.value,
        "selected-option": a.value,
        "hide-skip": l.value <= 1,
        onSubmitAnswer: m,
        onNextQuestion: v[0] || (v[0] = (p) => g(V._id)),
        onSkipQuestion: P
      }, null, 8, ["submitted", "selected-option", "hide-skip"])) : L("", !0),
      d("div", To, [
        S(t).quizMode === "Timed" ? (b(), W(Re, {
          key: 0,
          "button-name": S(t).questionsQueue.length >= 1 ? "→" : "Submit",
          onNextQuestion: v[1] || (v[1] = (p) => h())
        }, null, 8, ["button-name"])) : L("", !0),
        S(t).quizMode === "Timed" && S(t).questionsStack.length > 1 ? (b(), W(Re, {
          key: 1,
          "button-name": "←",
          onPrevQuestion: v[2] || (v[2] = (p) => le())
        })) : L("", !0)
      ])
    ], 64));
  }
}), ft = /* @__PURE__ */ j(Eo, [["__scopeId", "data-v-6e8339a0"]]), ko = (e) => (Ue("data-v-4ffecbcd"), e = e(), Ge(), e), Lo = { class: "report-container" }, qo = { class: "mcq-report" }, $o = { class: "table-container" }, No = /* @__PURE__ */ ko(() => /* @__PURE__ */ d("thead", null, [
  /* @__PURE__ */ d("tr", null, [
    /* @__PURE__ */ d("th", null, "question"),
    /* @__PURE__ */ d("th", null, "correct option"),
    /* @__PURE__ */ d("th", null, "your answer")
  ])
], -1)), xo = { class: "question-row" }, jo = ["href", "innerHTML"], Oo = { class: "answer-row" }, Io = ["innerHTML"], Ao = { class: "answer-row" }, Wo = ["innerHTML"], Mo = { class: "mcq-result" }, Ho = { class: "score" }, Ro = /* @__PURE__ */ q({
  __name: "MCQStatus",
  setup(e) {
    const o = D(), t = o.quizStats, s = o.quizStats.length, i = t.filter((a) => a.correct === 1).length, r = (i * 100 / s).toFixed(0);
    return (a, n) => (b(), y("div", Lo, [
      d("div", qo, [
        d("div", $o, [
          d("table", null, [
            No,
            d("tbody", null, [
              (b(!0), y(R, null, X(Object.entries(S(t)), ([c, l]) => (b(), y("tr", {
                key: c,
                class: "quiz-statment"
              }, [
                d("td", xo, [
                  d("a", {
                    href: l.question.link,
                    target: "_blank",
                    innerHTML: l.question.statement
                  }, null, 8, jo)
                ]),
                d("td", Oo, [
                  (b(!0), y(R, null, X(Object.entries(
                    l.question.optionsList
                  ), ([m, h]) => (b(), y("span", { key: m }, [
                    h.optionCorrect ? (b(), y("span", {
                      key: 0,
                      innerHTML: h.optionValue
                    }, null, 8, Io)) : L("", !0)
                  ]))), 128))
                ]),
                d("td", Ao, [
                  d("span", {
                    class: Q(
                      l.correct === 1 ? "correct-answer" : "wrong-answer"
                    ),
                    innerHTML: l.correct === 1 ? "<span> ✔</span> " : "<span> ✘</span> <span>     </span>" + l.selectedValue
                  }, null, 10, Wo)
                ])
              ]))), 128))
            ])
          ])
        ])
      ]),
      d("div", null, [
        d("div", Mo, [
          d("span", Ho, "⌛ Result: " + E(S(i)) + " out of " + E(S(s)) + " - (" + E(S(r)) + " %)", 1)
        ])
      ])
    ]));
  }
}), dt = /* @__PURE__ */ j(Ro, [["__scopeId", "data-v-4ffecbcd"]]), Qo = /* @__PURE__ */ q({
  __name: "MCQQuiz",
  setup(e) {
    const o = _(), t = D();
    ke(() => {
      i();
    });
    const s = () => {
      t.enqueueQuestion(o.value), i();
    }, i = () => {
      o.value = t.dequeueQuestion();
    }, r = () => window.location.reload();
    return (a, n) => {
      const c = St("MCQInfoPanel");
      return b(), y("main", null, [
        ee(c),
        o.value ? (b(), W(ft, {
          key: 0,
          statement: o.value.statement,
          "options-list": o.value.optionsList,
          _id: o.value._id,
          onNextQuestion: i,
          onSkipQuestion: s
        }, null, 8, ["statement", "options-list", "_id"])) : L("", !0),
        o.value ? L("", !0) : (b(), W(dt, { key: 1 })),
        o.value ? L("", !0) : (b(), y("button", {
          key: 2,
          class: "btn-relocate",
          onClick: r
        }, " End "))
      ]);
    };
  }
}), Do = /* @__PURE__ */ j(Qo, [["__scopeId", "data-v-937e1a1b"]]), zo = {
  key: 0,
  class: "time-left-header"
}, Bo = { class: "questions-left-header" }, Fo = /* @__PURE__ */ q({
  __name: "MCQInfoPanel",
  props: {
    timeLeft: {
      type: Number,
      default: 0
    }
  },
  setup(e) {
    const o = D(), t = (s) => {
      const i = Math.floor(s / 60), r = s % 60;
      return `${i}:${r < 10 ? "0" : ""}${r}`;
    };
    return (s, i) => (b(), y(R, null, [
      e.timeLeft ? (b(), y("h3", zo, " Time left: " + E(t(e.timeLeft)), 1)) : L("", !0),
      d("h3", Bo, " Question " + E(S(o).questionsStack.length) + " out of " + E(S(o).questionsQueue.length + S(o).questionsStack.length), 1)
    ], 64));
  }
}), De = 1e3, Uo = "-1", Go = /* @__PURE__ */ q({
  __name: "MCQTimedQuiz",
  setup(e) {
    const o = D(), t = _();
    let s = null, i = null;
    const r = _(o.timeLimit);
    ke(() => {
      n();
    }), _t(() => {
      l(), m();
    });
    const a = () => {
      t.value = o.removeFromLastHistory() ?? t.value;
    }, n = () => t.value = o.dequeueQuestion(), c = () => window.location.reload(), l = () => {
      s && clearTimeout(s), i && clearInterval(i);
    }, m = () => {
      r.value = o.timeLimit;
      const g = () => t.value ? r.value ? r.value-- : h() : l();
      i = window.setInterval(g, De), s = window.setTimeout(() => {
      }, o.timeLimit * De);
    }, h = () => {
      var P;
      l();
      const g = (O) => o.incrementStat(O, "attempts", Uo);
      for (g(((P = t.value) == null ? void 0 : P._id.$oid) ?? ""); t.value = o.dequeueQuestion(); )
        g(t.value._id.$oid);
      return alert("Time's up! Quiz has ended."), n();
    };
    return (g, P) => (b(), y("main", null, [
      ee(Fo, { "time-left": r.value }, null, 8, ["time-left"]),
      t.value ? (b(), W(ft, {
        key: 0,
        statement: t.value.statement,
        "options-list": t.value.optionsList,
        _id: t.value._id,
        onNextQuestion: n,
        onPrevQuestion: a
      }, null, 8, ["statement", "options-list", "_id"])) : L("", !0),
      t.value ? L("", !0) : (b(), W(dt, { key: 1 })),
      t.value ? L("", !0) : (b(), y("button", {
        key: 2,
        class: "btn-relocate",
        onClick: c
      }, " End "))
    ]));
  }
}), Jo = /* @__PURE__ */ j(Go, [["__scopeId", "data-v-cffdfe07"]]), Zo = ["id", "name", "value", "disabled"], Ko = ["for"], Yo = {
  key: 0,
  class: "question-number"
}, Xo = /* @__PURE__ */ q({
  __name: "FilterCheckbox",
  props: {
    category: {},
    topics: {}
  },
  setup(e) {
    const { category: o, topics: t } = e, s = D(), i = Ee(
      () => Object.entries(t).map(([n, c]) => {
        const l = a(c, o);
        return { idx: n, topic: c, num: l };
      }).filter(({ topic: n }) => n !== void 0)
    ), r = (n) => {
      if (!(n.target instanceof HTMLInputElement))
        return console.error("Trying to click on non-input element");
      const c = n.target.name, l = n.target.value;
      s.modifySelectedTags(n.target.checked, { category: c, topic: l });
    }, a = (n, c) => {
      var g;
      if ((g = s.getselectedtags()[c]) != null && g.includes(
        n
      ))
        return null;
      const m = JSON.parse(
        JSON.stringify(s.getselectedtags())
      );
      m[c].includes(n) || m[c].push(n);
      const h = $e();
      return Ne(
        h,
        m
      ).length.toString();
    };
    return (n, c) => (b(), y("ul", null, [
      (b(!0), y(R, null, X(i.value, ({ idx: l, num: m, topic: h }) => (b(), y("li", {
        key: l,
        class: Q(["filter-options", { "grey-out": m === "0" }])
      }, [
        d("input", {
          id: `${n.category}-${h}-checkbox`,
          type: "checkbox",
          name: n.category,
          value: h,
          disabled: m === "0",
          onChange: c[0] || (c[0] = (g) => r(g))
        }, null, 40, Zo),
        d("label", {
          for: `${n.category}-${h}-checkbox`
        }, [
          Je(E(h) + " ", 1),
          m !== null && m !== "0" ? (b(), y("span", Yo, E(m), 1)) : L("", !0)
        ], 8, Ko)
      ], 2))), 128))
    ]));
  }
}), es = /* @__PURE__ */ j(Xo, [["__scopeId", "data-v-3b065bc7"]]), ts = { class: "filter" }, os = { class: "category-heading" }, ss = /* @__PURE__ */ q({
  __name: "MCQTagOptions",
  setup(e) {
    const t = $e().flatMap((i) => i.tags), s = vo(t);
    return (i, r) => (b(), y("div", ts, [
      (b(!0), y(R, null, X(Object.entries(S(s)), ([a, n]) => (b(), y("div", {
        key: a,
        class: "category"
      }, [
        d("h2", os, E(a), 1),
        ee(es, {
          category: a,
          topics: n
        }, null, 8, ["category", "topics"])
      ]))), 128))
    ]));
  }
}), is = /* @__PURE__ */ j(ss, [["__scopeId", "data-v-54f50f41"]]), as = { for: "optionName" }, ns = ["value"], rs = /* @__PURE__ */ q({
  __name: "DropDownbox",
  props: {
    options: {},
    optionName: {},
    disabled: { type: Boolean }
  },
  setup(e) {
    const o = D(), t = _(0);
    function s(i) {
      const r = i.target;
      r.value && (t.value = parseFloat(r.value) * 60, o.setTimeLimit(t.value));
    }
    return (i, r) => (b(), y("div", {
      class: Q(i.disabled ? "dropdown input-disabled" : "dropdown")
    }, [
      d("label", as, E(i.optionName) + ":   ", 1),
      d("select", {
        id: "optionName",
        name: "optionName",
        onChange: s
      }, [
        (b(!0), y(R, null, X(i.options, (a) => (b(), y("option", {
          key: a.value,
          value: a.value
        }, E(a.value) + " " + E(a.unit), 9, ns))), 128))
      ], 32)
    ], 2));
  }
}), cs = /* @__PURE__ */ j(rs, [["__scopeId", "data-v-5f3ae97a"]]), ce = (e) => (Ue("data-v-30ab292c"), e = e(), Ge(), e), ls = { class: "start-page-container" }, us = /* @__PURE__ */ ce(() => /* @__PURE__ */ d("h1", null, "VetCloud Smart Quiz", -1)), ps = { class: "quiz-config-container" }, fs = { class: "question-config-container" }, ds = { class: "tag-text" }, bs = { class: "question-number" }, hs = { class: "question-amount-container" }, ms = /* @__PURE__ */ ce(() => /* @__PURE__ */ d("label", { for: "question-amount" }, "Select the amount of questions:", -1)), ys = ["max"], gs = {
  key: 0,
  class: "show-max-msg"
}, Vs = /* @__PURE__ */ ce(() => /* @__PURE__ */ d("label", { for: "mode-select" }, "Select mode:", -1)), Cs = /* @__PURE__ */ ce(() => /* @__PURE__ */ d("option", { value: "Tutor" }, "Tutor", -1)), vs = /* @__PURE__ */ ce(() => /* @__PURE__ */ d("option", { value: "Timed" }, "Timed", -1)), Ss = [
  Cs,
  vs
], _s = 3e3, Ps = /* @__PURE__ */ q({
  __name: "StartPage",
  emits: ["start-quiz"],
  setup(e, { emit: o }) {
    const t = _(1), s = _("Tutor"), i = _(!1), r = _(null), a = o, n = D(), c = () => {
      a("start-quiz", {
        questionAmount: t.value,
        mode: s.value
      });
    }, l = () => {
      r.value && clearTimeout(r.value), t.value > n.getquestionnumber() && (t.value = n.getquestionnumber(), i.value = !0, r.value = window.setTimeout(() => {
        i.value = !1;
      }, _s));
    };
    return (m, h) => (b(), y("div", ls, [
      us,
      ee(is),
      d("div", ps, [
        d("div", fs, [
          d("p", ds, [
            Je(" Maximum possible questions: "),
            d("span", bs, E(S(n).getquestionnumber()), 1)
          ]),
          d("div", hs, [
            ms,
            Oe(d("input", {
              id: "question-amount",
              "onUpdate:modelValue": h[0] || (h[0] = (g) => t.value = g),
              type: "number",
              placeholder: "Question amount",
              min: "1",
              max: S(n).getquestionnumber(),
              onInput: l
            }, null, 40, ys), [
              [
                Pt,
                t.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          i.value ? (b(), y("p", gs, " Cannot select more than " + E(S(n).getquestionnumber()) + " questions. ", 1)) : L("", !0),
          d("div", null, [
            Vs,
            Oe(d("select", {
              id: "mode-select",
              "onUpdate:modelValue": h[1] || (h[1] = (g) => s.value = g)
            }, Ss, 512), [
              [wt, s.value]
            ])
          ]),
          ee(cs, {
            options: [
              { value: 1, label: "Time Option 2", unit: "Min." },
              { value: 1.5, label: "Time Option 1", unit: "Min." }
            ],
            "option-name": "Time per Question",
            class: Q(s.value === "Timed" ? "" : "input-disabled"),
            disabled: s.value !== "Timed"
          }, null, 8, ["options", "class", "disabled"])
        ])
      ]),
      d("button", {
        class: "start-button",
        onClick: c
      }, "Start")
    ]));
  }
}), ws = /* @__PURE__ */ j(Ps, [["__scopeId", "data-v-30ab292c"]]), Ts = /* @__PURE__ */ q({
  __name: "CrucibleComponent",
  setup(e) {
    const o = _(0), t = D(), s = _(!1), i = _([]);
    ke(async () => {
      i.value = await go();
    });
    const r = Be("dataLink"), a = ({ questionAmount: n, mode: c }) => {
      console.log("dataLink: ", r);
      const l = t.getselectedtags();
      if (!i.value.length)
        return alert("Trouble fetching questions, please try again later");
      const m = Ne(
        i.value,
        l
      ), h = Co(n, m);
      o.value = h.length, t.initialiseQuiz(h, c), c === "Timed" && t.setTimeLimit(n * t.timeLimit), s.value = !0;
    };
    return (n, c) => s.value && S(t).quizMode === "Tutor" ? (b(), W(Do, { key: 0 })) : s.value && S(t).quizMode === "Timed" ? (b(), W(Jo, { key: 1 })) : (b(), W(ws, {
      key: 2,
      onStartQuiz: a
    }));
  }
}), Es = /* @__PURE__ */ j(Ts, [["__scopeId", "data-v-c4eafbfc"]]), ks = "http://localhost:8080/api/resource/getQuiz";
function qs(e, o = {}) {
  const t = Zt();
  e.use(t), e.component("CrucibleComponent", Es), e.provide("dataLink", o.dataLink || ks), console.log(o.dataLink);
}
export {
  Es as CrucibleComponent,
  qs as createViewerPlugin
};