var Re = Object.defineProperty;
var je = (e, t, n) => t in e ? Re(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var V = (e, t, n) => je(e, typeof t != "symbol" ? t + "" : t, n);
import { effectScope as ae, ref as E, markRaw as X, toRaw as ht, hasInjectionContext as ze, inject as Rt, getCurrentInstance as He, watch as jt, unref as S, reactive as Fe, isRef as mt, isReactive as zt, toRef as $t, nextTick as Bt, computed as Ht, getCurrentScope as Ue, onScopeDispose as Ge, toRefs as Vt, defineComponent as M, openBlock as _, createElementBlock as y, Fragment as B, normalizeClass as W, createElementVNode as m, toDisplayString as N, renderList as ct, createVNode as lt, createBlock as H, createCommentVNode as O, onMounted as xt, pushScopeId as ce, popScopeId as le, resolveComponent as Be, onBeforeMount as ue, createTextVNode as de, watchEffect as We, withDirectives as Wt, vModelText as Je, vModelSelect as Ye } from "vue";
var pe = !1;
function vt(e, t, n) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, n), n) : (e[t] = n, n);
}
function Dt(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
function Ke() {
  return fe().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function fe() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Xe = typeof Proxy == "function", Ze = "devtools-plugin:setup", ts = "plugin:settings:set";
let it, Mt;
function es() {
  var e;
  return it !== void 0 || (typeof window < "u" && window.performance ? (it = !0, Mt = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (it = !0, Mt = globalThis.perf_hooks.performance) : it = !1), it;
}
function ss() {
  return es() ? Mt.now() : Date.now();
}
class ns {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const s = {};
    if (t.settings)
      for (const r in t.settings) {
        const a = t.settings[r];
        s[r] = a.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${t.id}`;
    let i = Object.assign({}, s);
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
        return ss();
      }
    }, n && n.on(ts, (r, a) => {
      r === this.plugin.id && this.fallbacks.setSettings(a);
    }), this.proxiedOn = new Proxy({}, {
      get: (r, a) => this.target ? this.target.on[a] : (...c) => {
        this.onQueue.push({
          method: a,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (r, a) => this.target ? this.target[a] : a === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(a) ? (...c) => (this.targetQueue.push({
        method: a,
        args: c,
        resolve: () => {
        }
      }), this.fallbacks[a](...c)) : (...c) => new Promise((l) => {
        this.targetQueue.push({
          method: a,
          args: c,
          resolve: l
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function he(e, t) {
  const n = e, s = fe(), o = Ke(), i = Xe && n.enableEarlyProxy;
  if (o && (s.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    o.emit(Ze, e, t);
  else {
    const r = i ? new ns(n, o) : null;
    (s.__VUE_DEVTOOLS_PLUGINS__ = s.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: r
    }), r && t(r.proxiedTarget);
  }
}
/*!
 * pinia v2.2.1
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */
let ft;
const gt = (e) => ft = e, me = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function tt(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var F;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(F || (F = {}));
const Z = typeof window < "u", Jt = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function os(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Ft(e, t, n) {
  const s = new XMLHttpRequest();
  s.open("GET", e), s.responseType = "blob", s.onload = function() {
    be(s.response, t, n);
  }, s.onerror = function() {
    console.error("could not download file");
  }, s.send();
}
function ge(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function wt(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const n = document.createEvent("MouseEvents");
    n.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(n);
  }
}
const At = typeof navigator == "object" ? navigator : { userAgent: "" }, _e = /Macintosh/.test(At.userAgent) && /AppleWebKit/.test(At.userAgent) && !/Safari/.test(At.userAgent), be = Z ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !_e ? is : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in At ? rs : (
      // Fallback to using FileReader and a popup
      as
    )
  )
) : () => {
};
function is(e, t = "download", n) {
  const s = document.createElement("a");
  s.download = t, s.rel = "noopener", typeof e == "string" ? (s.href = e, s.origin !== location.origin ? ge(s.href) ? Ft(e, t, n) : (s.target = "_blank", wt(s)) : wt(s)) : (s.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(s.href);
  }, 4e4), setTimeout(function() {
    wt(s);
  }, 0));
}
function rs(e, t = "download", n) {
  if (typeof e == "string")
    if (ge(e))
      Ft(e, t, n);
    else {
      const s = document.createElement("a");
      s.href = e, s.target = "_blank", setTimeout(function() {
        wt(s);
      });
    }
  else
    navigator.msSaveOrOpenBlob(os(e, n), t);
}
function as(e, t, n, s) {
  if (s = s || open("", "_blank"), s && (s.document.title = s.document.body.innerText = "downloading..."), typeof e == "string")
    return Ft(e, t, n);
  const o = e.type === "application/octet-stream", i = /constructor/i.test(String(Jt.HTMLElement)) || "safari" in Jt, r = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((r || o && i || _e) && typeof FileReader < "u") {
    const a = new FileReader();
    a.onloadend = function() {
      let c = a.result;
      if (typeof c != "string")
        throw s = null, new Error("Wrong reader.result type");
      c = r ? c : c.replace(/^data:[^;]*;/, "data:attachment/file;"), s ? s.location.href = c : location.assign(c), s = null;
    }, a.readAsDataURL(e);
  } else {
    const a = URL.createObjectURL(e);
    s ? s.location.assign(a) : location.href = a, s = null, setTimeout(function() {
      URL.revokeObjectURL(a);
    }, 4e4);
  }
}
function k(e, t) {
  const n = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, t) : t === "error" ? console.error(n) : t === "warn" ? console.warn(n) : console.log(n);
}
function Ut(e) {
  return "_a" in e && "install" in e;
}
function ve() {
  if (!("clipboard" in navigator))
    return k("Your browser doesn't support the Clipboard API", "error"), !0;
}
function ye(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (k('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function cs(e) {
  if (!ve())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), k("Global state copied to clipboard.");
    } catch (t) {
      if (ye(t))
        return;
      k("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function ls(e) {
  if (!ve())
    try {
      we(e, JSON.parse(await navigator.clipboard.readText())), k("Global state pasted from clipboard.");
    } catch (t) {
      if (ye(t))
        return;
      k("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function us(e) {
  try {
    be(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    k("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let G;
function ds() {
  G || (G = document.createElement("input"), G.type = "file", G.accept = ".json");
  function e() {
    return new Promise((t, n) => {
      G.onchange = async () => {
        const s = G.files;
        if (!s)
          return t(null);
        const o = s.item(0);
        return t(o ? { text: await o.text(), file: o } : null);
      }, G.oncancel = () => t(null), G.onerror = n, G.click();
    });
  }
  return e;
}
async function ps(e) {
  try {
    const n = await ds()();
    if (!n)
      return;
    const { text: s, file: o } = n;
    we(e, JSON.parse(s)), k(`Global state imported from "${o.name}".`);
  } catch (t) {
    k("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function we(e, t) {
  for (const n in t) {
    const s = e.state.value[n];
    s ? Object.assign(s, t[n]) : e.state.value[n] = t[n];
  }
}
function j(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const Ae = "🍍 Pinia (root)", Tt = "_root";
function fs(e) {
  return Ut(e) ? {
    id: Tt,
    label: Ae
  } : {
    id: e.$id,
    label: e.$id
  };
}
function hs(e) {
  if (Ut(e)) {
    const n = Array.from(e._s.keys()), s = e._s;
    return {
      state: n.map((i) => ({
        editable: !0,
        key: i,
        value: e.state.value[i]
      })),
      getters: n.filter((i) => s.get(i)._getters).map((i) => {
        const r = s.get(i);
        return {
          editable: !1,
          key: i,
          value: r._getters.reduce((a, c) => (a[c] = r[c], a), {})
        };
      })
    };
  }
  const t = {
    state: Object.keys(e.$state).map((n) => ({
      editable: !0,
      key: n,
      value: e.$state[n]
    }))
  };
  return e._getters && e._getters.length && (t.getters = e._getters.map((n) => ({
    editable: !1,
    key: n,
    value: e[n]
  }))), e._customProperties.size && (t.customProperties = Array.from(e._customProperties).map((n) => ({
    editable: !0,
    key: n,
    value: e[n]
  }))), t;
}
function ms(e) {
  return e ? Array.isArray(e) ? e.reduce((t, n) => (t.keys.push(n.key), t.operations.push(n.type), t.oldValue[n.key] = n.oldValue, t.newValue[n.key] = n.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: j(e.type),
    key: j(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function gs(e) {
  switch (e) {
    case F.direct:
      return "mutation";
    case F.patchFunction:
      return "$patch";
    case F.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let at = !0;
const St = [], K = "pinia:mutations", Q = "pinia", { assign: _s } = Object, Et = (e) => "🍍 " + e;
function bs(e, t) {
  he({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: St,
    app: e
  }, (n) => {
    typeof n.now != "function" && k("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
      id: K,
      label: "Pinia 🍍",
      color: 15064968
    }), n.addInspector({
      id: Q,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            cs(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await ls(t), n.sendInspectorTree(Q), n.sendInspectorState(Q);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            us(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await ps(t), n.sendInspectorTree(Q), n.sendInspectorState(Q);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (s) => {
            const o = t._s.get(s);
            o ? typeof o.$reset != "function" ? k(`Cannot reset "${s}" store because it doesn't have a "$reset" method implemented.`, "warn") : (o.$reset(), k(`Store "${s}" reset.`)) : k(`Cannot reset "${s}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((s, o) => {
      const i = s.componentInstance && s.componentInstance.proxy;
      if (i && i._pStores) {
        const r = s.componentInstance.proxy._pStores;
        Object.values(r).forEach((a) => {
          s.instanceData.state.push({
            type: Et(a.$id),
            key: "state",
            editable: !0,
            value: a._isOptionsAPI ? {
              _custom: {
                value: ht(a.$state),
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
              Object.keys(a.$state).reduce((c, l) => (c[l] = a.$state[l], c), {})
            )
          }), a._getters && a._getters.length && s.instanceData.state.push({
            type: Et(a.$id),
            key: "getters",
            editable: !1,
            value: a._getters.reduce((c, l) => {
              try {
                c[l] = a[l];
              } catch (p) {
                c[l] = p;
              }
              return c;
            }, {})
          });
        });
      }
    }), n.on.getInspectorTree((s) => {
      if (s.app === e && s.inspectorId === Q) {
        let o = [t];
        o = o.concat(Array.from(t._s.values())), s.rootNodes = (s.filter ? o.filter((i) => "$id" in i ? i.$id.toLowerCase().includes(s.filter.toLowerCase()) : Ae.toLowerCase().includes(s.filter.toLowerCase())) : o).map(fs);
      }
    }), globalThis.$pinia = t, n.on.getInspectorState((s) => {
      if (s.app === e && s.inspectorId === Q) {
        const o = s.nodeId === Tt ? t : t._s.get(s.nodeId);
        if (!o)
          return;
        o && (s.nodeId !== Tt && (globalThis.$store = ht(o)), s.state = hs(o));
      }
    }), n.on.editInspectorState((s, o) => {
      if (s.app === e && s.inspectorId === Q) {
        const i = s.nodeId === Tt ? t : t._s.get(s.nodeId);
        if (!i)
          return k(`store "${s.nodeId}" not found`, "error");
        const { path: r } = s;
        Ut(i) ? r.unshift("state") : (r.length !== 1 || !i._customProperties.has(r[0]) || r[0] in i.$state) && r.unshift("$state"), at = !1, s.set(i, r, s.state.value), at = !0;
      }
    }), n.on.editComponentState((s) => {
      if (s.type.startsWith("🍍")) {
        const o = s.type.replace(/^🍍\s*/, ""), i = t._s.get(o);
        if (!i)
          return k(`store "${o}" not found`, "error");
        const { path: r } = s;
        if (r[0] !== "state")
          return k(`Invalid path for store "${o}":
${r}
Only state can be modified.`);
        r[0] = "$state", at = !1, s.set(i, r, s.state.value), at = !0;
      }
    });
  });
}
function vs(e, t) {
  St.includes(Et(t.$id)) || St.push(Et(t.$id)), he({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: St,
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
    const s = typeof n.now == "function" ? n.now.bind(n) : Date.now;
    t.$onAction(({ after: r, onError: a, name: c, args: l }) => {
      const p = Te++;
      n.addTimelineEvent({
        layerId: K,
        event: {
          time: s(),
          title: "🛫 " + c,
          subtitle: "start",
          data: {
            store: j(t.$id),
            action: j(c),
            args: l
          },
          groupId: p
        }
      }), r((d) => {
        Y = void 0, n.addTimelineEvent({
          layerId: K,
          event: {
            time: s(),
            title: "🛬 " + c,
            subtitle: "end",
            data: {
              store: j(t.$id),
              action: j(c),
              args: l,
              result: d
            },
            groupId: p
          }
        });
      }), a((d) => {
        Y = void 0, n.addTimelineEvent({
          layerId: K,
          event: {
            time: s(),
            logType: "error",
            title: "💥 " + c,
            subtitle: "end",
            data: {
              store: j(t.$id),
              action: j(c),
              args: l,
              error: d
            },
            groupId: p
          }
        });
      });
    }, !0), t._customProperties.forEach((r) => {
      jt(() => S(t[r]), (a, c) => {
        n.notifyComponentUpdate(), n.sendInspectorState(Q), at && n.addTimelineEvent({
          layerId: K,
          event: {
            time: s(),
            title: "Change",
            subtitle: r,
            data: {
              newValue: a,
              oldValue: c
            },
            groupId: Y
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: r, type: a }, c) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState(Q), !at)
        return;
      const l = {
        time: s(),
        title: gs(a),
        data: _s({ store: j(t.$id) }, ms(r)),
        groupId: Y
      };
      a === F.patchFunction ? l.subtitle = "⤵️" : a === F.patchObject ? l.subtitle = "🧩" : r && !Array.isArray(r) && (l.subtitle = r.type), r && (l.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: r
        }
      }), n.addTimelineEvent({
        layerId: K,
        event: l
      });
    }, { detached: !0, flush: "sync" });
    const o = t._hotUpdate;
    t._hotUpdate = X((r) => {
      o(r), n.addTimelineEvent({
        layerId: K,
        event: {
          time: s(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: j(t.$id),
            info: j("HMR update")
          }
        }
      }), n.notifyComponentUpdate(), n.sendInspectorTree(Q), n.sendInspectorState(Q);
    });
    const { $dispose: i } = t;
    t.$dispose = () => {
      i(), n.notifyComponentUpdate(), n.sendInspectorTree(Q), n.sendInspectorState(Q), n.getSettings().logStoreChanges && k(`Disposed "${t.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree(Q), n.sendInspectorState(Q), n.getSettings().logStoreChanges && k(`"${t.$id}" store installed 🆕`);
  });
}
let Te = 0, Y;
function Yt(e, t, n) {
  const s = t.reduce((o, i) => (o[i] = ht(e)[i], o), {});
  for (const o in s)
    e[o] = function() {
      const i = Te, r = n ? new Proxy(e, {
        get(...c) {
          return Y = i, Reflect.get(...c);
        },
        set(...c) {
          return Y = i, Reflect.set(...c);
        }
      }) : e;
      Y = i;
      const a = s[o].apply(r, arguments);
      return Y = void 0, a;
    };
}
function ys({ app: e, store: t, options: n }) {
  if (!t.$id.startsWith("__hot:")) {
    if (t._isOptionsAPI = !!n.state, !t._p._testing) {
      Yt(t, Object.keys(n.actions), t._isOptionsAPI);
      const s = t._hotUpdate;
      ht(t)._hotUpdate = function(o) {
        s.apply(this, arguments), Yt(t, Object.keys(o._hmrPayload.actions), !!t._isOptionsAPI);
      };
    }
    vs(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      t
    );
  }
}
function ws() {
  const e = ae(!0), t = e.run(() => E({}));
  let n = [], s = [];
  const o = X({
    install(i) {
      gt(o), o._a = i, i.provide(me, o), i.config.globalProperties.$pinia = o, process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Z && bs(i, o), s.forEach((r) => n.push(r)), s = [];
    },
    use(i) {
      return !this._a && !pe ? s.push(i) : n.push(i), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && typeof Proxy < "u" && o.use(ys), o;
}
function Se(e, t) {
  for (const n in t) {
    const s = t[n];
    if (!(n in e))
      continue;
    const o = e[n];
    tt(o) && tt(s) && !mt(s) && !zt(s) ? e[n] = Se(o, s) : e[n] = s;
  }
  return e;
}
const Ee = () => {
};
function Kt(e, t, n, s = Ee) {
  e.push(t);
  const o = () => {
    const i = e.indexOf(t);
    i > -1 && (e.splice(i, 1), s());
  };
  return !n && Ue() && Ge(o), o;
}
function rt(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const As = (e) => e(), Xt = Symbol(), kt = Symbol();
function qt(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, s) => e.set(s, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const s = t[n], o = e[n];
    tt(o) && tt(s) && e.hasOwnProperty(n) && !mt(s) && !zt(s) ? e[n] = qt(o, s) : e[n] = s;
  }
  return e;
}
const Ts = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Ss(e) {
  return !tt(e) || !e.hasOwnProperty(Ts);
}
const { assign: I } = Object;
function Zt(e) {
  return !!(mt(e) && e.effect);
}
function te(e, t, n, s) {
  const { state: o, actions: i, getters: r } = t, a = n.state.value[e];
  let c;
  function l() {
    !a && (process.env.NODE_ENV === "production" || !s) && (n.state.value[e] = o ? o() : {});
    const p = process.env.NODE_ENV !== "production" && s ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Vt(E(o ? o() : {}).value)
    ) : Vt(n.state.value[e]);
    return I(p, i, Object.keys(r || {}).reduce((d, g) => (process.env.NODE_ENV !== "production" && g in p && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${g}" in store "${e}".`), d[g] = X(Ht(() => {
      gt(n);
      const w = n._s.get(e);
      return r[g].call(w, w);
    })), d), {}));
  }
  return c = Pt(e, l, t, n, s, !0), c;
}
function Pt(e, t, n = {}, s, o, i) {
  let r;
  const a = I({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !s._e.active)
    throw new Error("Pinia destroyed");
  const c = { deep: !0 };
  process.env.NODE_ENV !== "production" && !pe && (c.onTrigger = (h) => {
    l ? w = h : l == !1 && !b._hotUpdating && (Array.isArray(w) ? w.push(h) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let l, p, d = [], g = [], w;
  const C = s.state.value[e];
  !i && !C && (process.env.NODE_ENV === "production" || !o) && (s.state.value[e] = {});
  const nt = E({});
  let _t;
  function bt(h) {
    let f;
    l = p = !1, process.env.NODE_ENV !== "production" && (w = []), typeof h == "function" ? (h(s.state.value[e]), f = {
      type: F.patchFunction,
      storeId: e,
      events: w
    }) : (qt(s.state.value[e], h), f = {
      type: F.patchObject,
      payload: h,
      storeId: e,
      events: w
    });
    const T = _t = Symbol();
    Bt().then(() => {
      _t === T && (l = !0);
    }), p = !0, rt(d, f, s.state.value[e]);
  }
  const $ = i ? function() {
    const { state: f } = n, T = f ? f() : {};
    this.$patch((q) => {
      I(q, T);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : Ee
  );
  function D() {
    r.stop(), d = [], g = [], s._s.delete(e);
  }
  const x = (h, f = "") => {
    if (Xt in h)
      return h[kt] = f, h;
    const T = function() {
      gt(s);
      const q = Array.from(arguments), ut = [], Ct = [];
      function Ie(P) {
        ut.push(P);
      }
      function Le(P) {
        Ct.push(P);
      }
      rt(g, {
        args: q,
        name: T[kt],
        store: b,
        after: Ie,
        onError: Le
      });
      let dt;
      try {
        dt = h.apply(this && this.$id === e ? this : b, q);
      } catch (P) {
        throw rt(Ct, P), P;
      }
      return dt instanceof Promise ? dt.then((P) => (rt(ut, P), P)).catch((P) => (rt(Ct, P), Promise.reject(P))) : (rt(ut, dt), dt);
    };
    return T[Xt] = !0, T[kt] = f, T;
  }, R = /* @__PURE__ */ X({
    actions: {},
    getters: {},
    state: [],
    hotState: nt
  }), ot = {
    _p: s,
    // _s: scope,
    $id: e,
    $onAction: Kt.bind(null, g),
    $patch: bt,
    $reset: $,
    $subscribe(h, f = {}) {
      const T = Kt(d, h, f.detached, () => q()), q = r.run(() => jt(() => s.state.value[e], (ut) => {
        (f.flush === "sync" ? p : l) && h({
          storeId: e,
          type: F.direct,
          events: w
        }, ut);
      }, I({}, c, f)));
      return T;
    },
    $dispose: D
  }, b = Fe(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Z ? I(
    {
      _hmrPayload: R,
      _customProperties: X(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    ot
    // must be added later
    // setupStore
  ) : ot);
  s._s.set(e, b);
  const J = (s._a && s._a.runWithContext || As)(() => s._e.run(() => (r = ae()).run(() => t({ action: x }))));
  for (const h in J) {
    const f = J[h];
    if (mt(f) && !Zt(f) || zt(f))
      process.env.NODE_ENV !== "production" && o ? vt(nt.value, h, $t(J, h)) : i || (C && Ss(f) && (mt(f) ? f.value = C[h] : qt(f, C[h])), s.state.value[e][h] = f), process.env.NODE_ENV !== "production" && R.state.push(h);
    else if (typeof f == "function") {
      const T = process.env.NODE_ENV !== "production" && o ? f : x(f, h);
      J[h] = T, process.env.NODE_ENV !== "production" && (R.actions[h] = f), a.actions[h] = f;
    } else process.env.NODE_ENV !== "production" && Zt(f) && (R.getters[h] = i ? (
      // @ts-expect-error
      n.getters[h]
    ) : f, Z && (J._getters || // @ts-expect-error: same
    (J._getters = X([]))).push(h));
  }
  if (I(b, J), I(ht(b), J), Object.defineProperty(b, "$state", {
    get: () => process.env.NODE_ENV !== "production" && o ? nt.value : s.state.value[e],
    set: (h) => {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error("cannot set hotState");
      bt((f) => {
        I(f, h);
      });
    }
  }), process.env.NODE_ENV !== "production" && (b._hotUpdate = X((h) => {
    b._hotUpdating = !0, h._hmrPayload.state.forEach((f) => {
      if (f in b.$state) {
        const T = h.$state[f], q = b.$state[f];
        typeof T == "object" && tt(T) && tt(q) ? Se(T, q) : h.$state[f] = q;
      }
      vt(b, f, $t(h.$state, f));
    }), Object.keys(b.$state).forEach((f) => {
      f in h.$state || Dt(b, f);
    }), l = !1, p = !1, s.state.value[e] = $t(h._hmrPayload, "hotState"), p = !0, Bt().then(() => {
      l = !0;
    });
    for (const f in h._hmrPayload.actions) {
      const T = h[f];
      vt(b, f, x(T, f));
    }
    for (const f in h._hmrPayload.getters) {
      const T = h._hmrPayload.getters[f], q = i ? (
        // special handling of options api
        Ht(() => (gt(s), T.call(b, b)))
      ) : T;
      vt(b, f, q);
    }
    Object.keys(b._hmrPayload.getters).forEach((f) => {
      f in h._hmrPayload.getters || Dt(b, f);
    }), Object.keys(b._hmrPayload.actions).forEach((f) => {
      f in h._hmrPayload.actions || Dt(b, f);
    }), b._hmrPayload = h._hmrPayload, b._getters = h._getters, b._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Z) {
    const h = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((f) => {
      Object.defineProperty(b, f, I({ value: b[f] }, h));
    });
  }
  return s._p.forEach((h) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Z) {
      const f = r.run(() => h({
        store: b,
        app: s._a,
        pinia: s,
        options: a
      }));
      Object.keys(f || {}).forEach((T) => b._customProperties.add(T)), I(b, f);
    } else
      I(b, r.run(() => h({
        store: b,
        app: s._a,
        pinia: s,
        options: a
      })));
  }), process.env.NODE_ENV !== "production" && b.$state && typeof b.$state == "object" && typeof b.$state.constructor == "function" && !b.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${b.$id}".`), C && i && n.hydrate && n.hydrate(b.$state, C), l = !0, p = !0, b;
}
function Es(e, t, n) {
  let s, o;
  const i = typeof t == "function";
  s = e, o = i ? n : t;
  function r(a, c) {
    const l = ze();
    if (a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && ft && ft._testing ? null : a) || (l ? Rt(me, null) : null), a && gt(a), process.env.NODE_ENV !== "production" && !ft)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    a = ft, a._s.has(s) || (i ? Pt(s, t, o, a) : te(s, o, a), process.env.NODE_ENV !== "production" && (r._pinia = a));
    const p = a._s.get(s);
    if (process.env.NODE_ENV !== "production" && c) {
      const d = "__hot:" + s, g = i ? Pt(d, t, o, a, !0) : te(d, I({}, o), a, !0);
      c._hotUpdate(g), delete a.state.value[d], a._s.delete(d);
    }
    if (process.env.NODE_ENV !== "production" && Z) {
      const d = He();
      if (d && d.proxy && // avoid adding stores that are just built for hot module replacement
      !c) {
        const g = d.proxy, w = "_pStores" in g ? g._pStores : g._pStores = {};
        w[s] = p;
      }
    }
    return p;
  }
  return r.$id = s, r;
}
const xs = ["id", "checked"], Cs = ["for", "innerHTML"], $s = /* @__PURE__ */ M({
  __name: "MCQOption",
  props: {
    optionKey: {},
    checked: { type: Boolean },
    option: {},
    submitted: { type: Boolean }
  },
  emits: ["selectOption"],
  setup(e, { emit: t }) {
    const n = t, s = () => n("selectOption");
    return (o, i) => (_(), y(B, null, [
      (_(), y("input", {
        id: "option-" + o.optionKey,
        key: o.optionKey,
        "test-id": "radio_options",
        type: "radio",
        name: "options",
        checked: o.checked,
        class: W(o.submitted && "ignore-hover")
      }, null, 10, xs)),
      (_(), y("label", {
        key: o.optionKey,
        for: "option-" + o.optionKey,
        class: W(o.submitted ? "mcq-option-label ignore-hover" : "mcq-option-label"),
        onClick: i[0] || (i[0] = (r) => s()),
        innerHTML: o.option.optionValue
      }, null, 10, Cs))
    ], 64));
  }
}), z = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, o] of t)
    n[s] = o;
  return n;
}, Ds = /* @__PURE__ */ z($s, [["__scopeId", "data-v-fdbfedc6"]]), ks = ["disabled"], Ns = /* @__PURE__ */ M({
  __name: "MCQButton",
  props: {
    submitted: { type: Boolean },
    selectedOption: {},
    hideSkip: { type: Boolean }
  },
  emits: ["submitAnswer", "nextQuestion", "skipQuestion"],
  setup(e, { emit: t }) {
    const n = E("skip"), s = E("Skip"), o = t, i = (c, l) => {
      !c && l ? r("next", "Next", "submitAnswer") : c && l ? r("skip", "Skip", "nextQuestion") : !c && !l && r("skip", "Skip", "skipQuestion");
    }, r = (c, l, p) => {
      n.value = c, s.value = l, o(p);
    }, a = (c, l) => c && l ? { class: "next", text: "Next" } : !c && l ? { class: "submit", text: "Submit" } : { class: n.value, text: s.value };
    return (c, l) => (_(), y("div", null, [
      m("button", {
        disabled: c.hideSkip && a(c.submitted, c.selectedOption).class === "skip",
        class: W(["mcq-button", a(c.submitted, c.selectedOption).class]),
        onClick: l[0] || (l[0] = (p) => i(c.submitted, c.selectedOption))
      }, N(a(c.submitted, c.selectedOption).text), 11, ks)
    ]));
  }
}), Qs = /* @__PURE__ */ z(Ns, [["__scopeId", "data-v-847b8dd5"]]), Os = /* @__PURE__ */ M({
  __name: "NextButton",
  props: {
    buttonName: {}
  },
  emits: ["nextQuestion", "prevQuestion"],
  setup(e, { emit: t }) {
    const { buttonName: n } = e, s = t, o = () => {
      i(n !== "←" ? "nextQuestion" : "prevQuestion");
    }, i = (r) => {
      s(r);
    };
    return (r, a) => (_(), y("div", null, [
      m("button", {
        class: W(r.buttonName === "Submit" ? "submit_btn" : "mcq-button"),
        onClick: a[0] || (a[0] = (c) => o())
      }, N(r.buttonName), 3)
    ]));
  }
}), ee = /* @__PURE__ */ z(Os, [["__scopeId", "data-v-8be7f61e"]]);
var A = ((e) => (e[e.New = 0] = "New", e[e.Learning = 1] = "Learning", e[e.Review = 2] = "Review", e[e.Relearning = 3] = "Relearning", e))(A || {}), u = ((e) => (e[e.Manual = 0] = "Manual", e[e.Again = 1] = "Again", e[e.Hard = 2] = "Hard", e[e.Good = 3] = "Good", e[e.Easy = 4] = "Easy", e))(u || {});
class v {
  static card(t) {
    return { ...t, state: v.state(t.state), due: v.time(t.due), last_review: t.last_review ? v.time(t.last_review) : void 0 };
  }
  static rating(t) {
    if (typeof t == "string") {
      const n = t.charAt(0).toUpperCase(), s = t.slice(1).toLowerCase(), o = u[`${n}${s}`];
      if (o === void 0) throw new Error(`Invalid rating:[${t}]`);
      return o;
    } else if (typeof t == "number") return t;
    throw new Error(`Invalid rating:[${t}]`);
  }
  static state(t) {
    if (typeof t == "string") {
      const n = t.charAt(0).toUpperCase(), s = t.slice(1).toLowerCase(), o = A[`${n}${s}`];
      if (o === void 0) throw new Error(`Invalid state:[${t}]`);
      return o;
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
    return { ...t, due: v.time(t.due), rating: v.rating(t.rating), state: v.state(t.state), review: v.time(t.review) };
  }
}
const Vs = 0.9, Ms = 36500, qs = [0.4072, 1.1829, 3.1262, 15.4722, 7.2102, 0.5316, 1.0651, 0.0234, 1.616, 0.1544, 1.0824, 1.9813, 0.0953, 0.2975, 2.2042, 0.2407, 2.9466, 0.5034, 0.6567], Ps = !1, Is = !0, It = (e) => {
  let t = qs;
  return e != null && e.w && (e.w.length === 19 ? t = e == null ? void 0 : e.w : e.w.length === 17 && (t = e == null ? void 0 : e.w.concat([0, 0]), console.debug("[FSRS V5]auto fill w to 19 length"))), { request_retention: (e == null ? void 0 : e.request_retention) || Vs, maximum_interval: (e == null ? void 0 : e.maximum_interval) || Ms, w: t, enable_fuzz: (e == null ? void 0 : e.enable_fuzz) ?? Ps, enable_short_term: (e == null ? void 0 : e.enable_short_term) ?? Is };
};
Date.prototype.scheduler = function(e, t) {
  return xe(this, e, t);
}, Date.prototype.diff = function(e, t) {
  return Ls(this, e, t);
}, Date.prototype.format = function() {
  return Rs(this);
}, Date.prototype.dueFormat = function(e, t, n) {
  return js(this, e, t, n);
};
function xe(e, t, n) {
  return new Date(n ? et(e).getTime() + t * 24 * 60 * 60 * 1e3 : et(e).getTime() + t * 60 * 1e3);
}
function Ls(e, t, n) {
  if (!e || !t) throw new Error("Invalid date");
  const s = et(e).getTime() - et(t).getTime();
  let o = 0;
  switch (n) {
    case "days":
      o = Math.floor(s / (24 * 60 * 60 * 1e3));
      break;
    case "minutes":
      o = Math.floor(s / (60 * 1e3));
      break;
  }
  return o;
}
function Rs(e) {
  const t = et(e), n = t.getFullYear(), s = t.getMonth() + 1, o = t.getDate(), i = t.getHours(), r = t.getMinutes(), a = t.getSeconds();
  return `${n}-${pt(s)}-${pt(o)} ${pt(i)}:${pt(r)}:${pt(a)}`;
}
function pt(e) {
  return e < 10 ? `0${e}` : `${e}`;
}
const Nt = [60, 60, 24, 31, 12], Qt = ["second", "min", "hour", "day", "month", "year"];
function js(e, t, n, s = Qt) {
  e = et(e), t = et(t), s.length !== Qt.length && (s = Qt);
  let o = e.getTime() - t.getTime(), i;
  for (o /= 1e3, i = 0; i < Nt.length && !(o < Nt[i]); i++) o /= Nt[i];
  return `${Math.floor(o)}${n ? s[i] : ""}`;
}
function et(e) {
  return v.time(e);
}
u.Again, u.Hard, u.Good, u.Easy;
const zs = [{ start: 2.5, end: 7, factor: 0.15 }, { start: 7, end: 20, factor: 0.1 }, { start: 20, end: 1 / 0, factor: 0.05 }];
function Hs(e, t, n) {
  let s = 1;
  for (const r of zs) s += r.factor * Math.max(Math.min(e, r.end) - r.start, 0);
  e = Math.min(e, n);
  let o = Math.max(2, Math.round(e - s));
  const i = Math.min(Math.round(e + s), n);
  return e > t && (o = Math.max(o, t + 1)), o = Math.min(o, i), { min_ivl: o, max_ivl: i };
}
class Fs {
  constructor(t) {
    V(this, "c");
    V(this, "s0");
    V(this, "s1");
    V(this, "s2");
    const n = Us();
    this.c = 1, this.s0 = n(" "), this.s1 = n(" "), this.s2 = n(" "), t == null && (t = +/* @__PURE__ */ new Date()), this.s0 -= n(t), this.s0 < 0 && (this.s0 += 1), this.s1 -= n(t), this.s1 < 0 && (this.s1 += 1), this.s2 -= n(t), this.s2 < 0 && (this.s2 += 1);
  }
  next() {
    const t = 2091639 * this.s0 + this.c * 23283064365386963e-26;
    return this.s0 = this.s1, this.s1 = this.s2, this.s2 = t - (this.c = t | 0), this.s2;
  }
  set state(t) {
    this.c = t.c, this.s0 = t.s0, this.s1 = t.s1, this.s2 = t.s2;
  }
  get state() {
    return { c: this.c, s0: this.s0, s1: this.s1, s2: this.s2 };
  }
}
function Us() {
  let e = 4022871197;
  return function(t) {
    t = String(t);
    for (let n = 0; n < t.length; n++) {
      e += t.charCodeAt(n);
      let s = 0.02519603282416938 * e;
      e = s >>> 0, s -= e, s *= e, e = s >>> 0, s -= e, e += s * 4294967296;
    }
    return (e >>> 0) * 23283064365386963e-26;
  };
}
function Gs(e) {
  const t = new Fs(e), n = () => t.next();
  return n.int32 = () => t.next() * 4294967296 | 0, n.double = () => n() + (n() * 2097152 | 0) * 11102230246251565e-32, n.state = () => t.state, n.importState = (s) => (t.state = s, n), n;
}
const se = -0.5, ne = 19 / 81;
class Bs {
  constructor(t) {
    V(this, "param");
    V(this, "intervalModifier");
    V(this, "_seed");
    this.param = new Proxy(It(t), this.params_handler_proxy()), this.intervalModifier = this.calculate_interval_modifier(this.param.request_retention);
  }
  get interval_modifier() {
    return this.intervalModifier;
  }
  set seed(t) {
    this._seed = t;
  }
  calculate_interval_modifier(t) {
    if (t <= 0 || t > 1) throw new Error("Requested retention rate should be in the range (0,1]");
    return +((Math.pow(t, 1 / se) - 1) / ne).toFixed(8);
  }
  get parameters() {
    return this.param;
  }
  set parameters(t) {
    this.update_parameters(t);
  }
  params_handler_proxy() {
    const t = this;
    return { set: function(n, s, o) {
      return s === "request_retention" && Number.isFinite(o) && (t.intervalModifier = t.calculate_interval_modifier(Number(o))), Reflect.set(n, s, o), !0;
    } };
  }
  update_parameters(t) {
    const n = It(t);
    for (const s in n) if (s in this.param) {
      const o = s;
      this.param[o] = n[o];
    }
  }
  init_stability(t) {
    return Math.max(this.param.w[t - 1], 0.1);
  }
  init_difficulty(t) {
    return this.constrain_difficulty(this.param.w[4] - Math.exp((t - 1) * this.param.w[5]) + 1);
  }
  apply_fuzz(t, n, s) {
    if (!s || t < 2.5) return Math.round(t);
    const o = Gs(this.seed)(), { min_ivl: i, max_ivl: r } = Hs(t, n, this.param.maximum_interval);
    return Math.floor(o * (r - i + 1) + i);
  }
  next_interval(t, n, s = this.param.enable_fuzz) {
    const o = Math.min(Math.max(1, Math.round(t * this.intervalModifier)), this.param.maximum_interval);
    return this.apply_fuzz(o, n, s);
  }
  next_difficulty(t, n) {
    const s = t - this.param.w[6] * (n - 3);
    return this.constrain_difficulty(this.mean_reversion(this.init_difficulty(u.Easy), s));
  }
  constrain_difficulty(t) {
    return Math.min(Math.max(+t.toFixed(8), 1), 10);
  }
  mean_reversion(t, n) {
    return +(this.param.w[7] * t + (1 - this.param.w[7]) * n).toFixed(8);
  }
  next_recall_stability(t, n, s, o) {
    const i = u.Hard === o ? this.param.w[15] : 1, r = u.Easy === o ? this.param.w[16] : 1;
    return +(n * (1 + Math.exp(this.param.w[8]) * (11 - t) * Math.pow(n, -this.param.w[9]) * (Math.exp((1 - s) * this.param.w[10]) - 1) * i * r)).toFixed(8);
  }
  next_forget_stability(t, n, s) {
    return +(this.param.w[11] * Math.pow(t, -this.param.w[12]) * (Math.pow(n + 1, this.param.w[13]) - 1) * Math.exp((1 - s) * this.param.w[14])).toFixed(8);
  }
  next_short_term_stability(t, n) {
    return +(t * Math.exp(this.param.w[17] * (n - 3 + this.param.w[18]))).toFixed(8);
  }
  forgetting_curve(t, n) {
    return +Math.pow(1 + ne * t / n, se).toFixed(8);
  }
}
class Ce {
  constructor(t, n, s) {
    V(this, "last");
    V(this, "current");
    V(this, "review_time");
    V(this, "next", /* @__PURE__ */ new Map());
    V(this, "algorithm");
    this.algorithm = s, this.last = v.card(t), this.current = v.card(t), this.review_time = v.time(n), this.init();
  }
  init() {
    const { state: t, last_review: n } = this.current;
    let s = 0;
    t !== A.New && n && (s = this.review_time.diff(n, "days")), this.current.last_review = this.review_time, this.current.elapsed_days = s, this.current.reps += 1, this.initSeed();
  }
  preview() {
    return { [u.Again]: this.review(u.Again), [u.Hard]: this.review(u.Hard), [u.Good]: this.review(u.Good), [u.Easy]: this.review(u.Easy) };
  }
  review(t) {
    const { state: n } = this.last;
    let s;
    switch (n) {
      case A.New:
        s = this.newState(t);
        break;
      case A.Learning:
      case A.Relearning:
        s = this.learningState(t);
        break;
      case A.Review:
        s = this.reviewState(t);
        break;
    }
    if (s) return s;
    throw new Error("Invalid grade");
  }
  initSeed() {
    const t = this.review_time.getTime(), n = this.current.reps, s = this.current.difficulty * this.current.stability;
    this.algorithm.seed = `${t}_${n}_${s}`;
  }
  buildLog(t) {
    const { last_review: n, due: s, elapsed_days: o } = this.last;
    return { rating: t, state: this.current.state, due: n || s, stability: this.current.stability, difficulty: this.current.difficulty, elapsed_days: this.current.elapsed_days, last_elapsed_days: o, scheduled_days: this.current.scheduled_days, review: this.review_time };
  }
}
class oe extends Ce {
  newState(t) {
    const n = this.next.get(t);
    if (n) return n;
    const s = v.card(this.current);
    switch (s.difficulty = this.algorithm.init_difficulty(t), s.stability = this.algorithm.init_stability(t), t) {
      case u.Again:
        s.scheduled_days = 0, s.due = this.review_time.scheduler(1), s.state = A.Learning;
        break;
      case u.Hard:
        s.scheduled_days = 0, s.due = this.review_time.scheduler(5), s.state = A.Learning;
        break;
      case u.Good:
        s.scheduled_days = 0, s.due = this.review_time.scheduler(10), s.state = A.Learning;
        break;
      case u.Easy: {
        const i = this.algorithm.next_interval(s.stability, this.current.elapsed_days, this.algorithm.parameters.enable_fuzz);
        s.scheduled_days = i, s.due = this.review_time.scheduler(i, !0), s.state = A.Review;
        break;
      }
      default:
        throw new Error("Invalid grade");
    }
    const o = { card: s, log: this.buildLog(t) };
    return this.next.set(t, o), o;
  }
  learningState(t) {
    const n = this.next.get(t);
    if (n) return n;
    const { state: s, difficulty: o, stability: i } = this.last, r = v.card(this.current), a = this.current.elapsed_days;
    switch (r.difficulty = this.algorithm.next_difficulty(o, t), r.stability = this.algorithm.next_short_term_stability(i, t), t) {
      case u.Again: {
        r.scheduled_days = 0, r.due = this.review_time.scheduler(5, !1), r.state = s;
        break;
      }
      case u.Hard: {
        r.scheduled_days = 0, r.due = this.review_time.scheduler(10), r.state = s;
        break;
      }
      case u.Good: {
        const l = this.algorithm.next_interval(r.stability, a);
        r.scheduled_days = l, r.due = this.review_time.scheduler(l, !0), r.state = A.Review;
        break;
      }
      case u.Easy: {
        const l = this.algorithm.next_short_term_stability(i, u.Good), p = this.algorithm.next_interval(l, a), d = Math.max(this.algorithm.next_interval(r.stability, a), p + 1);
        r.scheduled_days = d, r.due = this.review_time.scheduler(d, !0), r.state = A.Review;
        break;
      }
      default:
        throw new Error("Invalid grade");
    }
    const c = { card: r, log: this.buildLog(t) };
    return this.next.set(t, c), c;
  }
  reviewState(t) {
    const n = this.next.get(t);
    if (n) return n;
    const s = this.current.elapsed_days, { difficulty: o, stability: i } = this.last, r = this.algorithm.forgetting_curve(s, i), a = v.card(this.current), c = v.card(this.current), l = v.card(this.current), p = v.card(this.current);
    this.next_ds(a, c, l, p, o, i, r), this.next_interval(a, c, l, p, s), this.next_state(a, c, l, p), a.lapses += 1;
    const d = { card: a, log: this.buildLog(u.Again) }, g = { card: c, log: super.buildLog(u.Hard) }, w = { card: l, log: super.buildLog(u.Good) }, C = { card: p, log: super.buildLog(u.Easy) };
    return this.next.set(u.Again, d), this.next.set(u.Hard, g), this.next.set(u.Good, w), this.next.set(u.Easy, C), this.next.get(t);
  }
  next_ds(t, n, s, o, i, r, a) {
    t.difficulty = this.algorithm.next_difficulty(i, u.Again), t.stability = this.algorithm.next_forget_stability(i, r, a), n.difficulty = this.algorithm.next_difficulty(i, u.Hard), n.stability = this.algorithm.next_recall_stability(i, r, a, u.Hard), s.difficulty = this.algorithm.next_difficulty(i, u.Good), s.stability = this.algorithm.next_recall_stability(i, r, a, u.Good), o.difficulty = this.algorithm.next_difficulty(i, u.Easy), o.stability = this.algorithm.next_recall_stability(i, r, a, u.Easy);
  }
  next_interval(t, n, s, o, i) {
    let r, a;
    r = this.algorithm.next_interval(n.stability, i), a = this.algorithm.next_interval(s.stability, i), r = Math.min(r, a), a = Math.max(a, r + 1);
    const c = Math.max(this.algorithm.next_interval(o.stability, i), a + 1);
    t.scheduled_days = 0, t.due = this.review_time.scheduler(5), n.scheduled_days = r, n.due = this.review_time.scheduler(r, !0), s.scheduled_days = a, s.due = this.review_time.scheduler(a, !0), o.scheduled_days = c, o.due = this.review_time.scheduler(c, !0);
  }
  next_state(t, n, s, o) {
    t.state = A.Relearning, n.state = A.Review, s.state = A.Review, o.state = A.Review;
  }
}
class ie extends Ce {
  newState(t) {
    const n = this.next.get(t);
    if (n) return n;
    this.current.scheduled_days = 0, this.current.elapsed_days = 0;
    const s = v.card(this.current), o = v.card(this.current), i = v.card(this.current), r = v.card(this.current);
    return this.init_ds(s, o, i, r), this.next_interval(s, o, i, r, 0), this.next_state(s, o, i, r), this.update_next(s, o, i, r), this.next.get(t);
  }
  init_ds(t, n, s, o) {
    t.difficulty = this.algorithm.init_difficulty(u.Again), t.stability = this.algorithm.init_stability(u.Again), n.difficulty = this.algorithm.init_difficulty(u.Hard), n.stability = this.algorithm.init_stability(u.Hard), s.difficulty = this.algorithm.init_difficulty(u.Good), s.stability = this.algorithm.init_stability(u.Good), o.difficulty = this.algorithm.init_difficulty(u.Easy), o.stability = this.algorithm.init_stability(u.Easy);
  }
  learningState(t) {
    return this.reviewState(t);
  }
  reviewState(t) {
    const n = this.next.get(t);
    if (n) return n;
    const s = this.current.elapsed_days, { difficulty: o, stability: i } = this.last, r = this.algorithm.forgetting_curve(s, i), a = v.card(this.current), c = v.card(this.current), l = v.card(this.current), p = v.card(this.current);
    return this.next_ds(a, c, l, p, o, i, r), this.next_interval(a, c, l, p, s), this.next_state(a, c, l, p), a.lapses += 1, this.update_next(a, c, l, p), this.next.get(t);
  }
  next_ds(t, n, s, o, i, r, a) {
    t.difficulty = this.algorithm.next_difficulty(i, u.Again), t.stability = this.algorithm.next_forget_stability(i, r, a), n.difficulty = this.algorithm.next_difficulty(i, u.Hard), n.stability = this.algorithm.next_recall_stability(i, r, a, u.Hard), s.difficulty = this.algorithm.next_difficulty(i, u.Good), s.stability = this.algorithm.next_recall_stability(i, r, a, u.Good), o.difficulty = this.algorithm.next_difficulty(i, u.Easy), o.stability = this.algorithm.next_recall_stability(i, r, a, u.Easy);
  }
  next_interval(t, n, s, o, i) {
    let r, a, c, l;
    r = this.algorithm.next_interval(t.stability, i), a = this.algorithm.next_interval(n.stability, i), c = this.algorithm.next_interval(s.stability, i), l = this.algorithm.next_interval(o.stability, i), r = Math.min(r, a), a = Math.max(a, r + 1), c = Math.max(c, a + 1), l = Math.max(l, c + 1), t.scheduled_days = r, t.due = this.review_time.scheduler(r, !0), n.scheduled_days = a, n.due = this.review_time.scheduler(a, !0), s.scheduled_days = c, s.due = this.review_time.scheduler(c, !0), o.scheduled_days = l, o.due = this.review_time.scheduler(l, !0);
  }
  next_state(t, n, s, o) {
    t.state = A.Review, n.state = A.Review, s.state = A.Review, o.state = A.Review;
  }
  update_next(t, n, s, o) {
    const i = { card: t, log: this.buildLog(u.Again) }, r = { card: n, log: super.buildLog(u.Hard) }, a = { card: s, log: super.buildLog(u.Good) }, c = { card: o, log: super.buildLog(u.Easy) };
    this.next.set(u.Again, i), this.next.set(u.Hard, r), this.next.set(u.Good, a), this.next.set(u.Easy, c);
  }
}
class Ws extends Bs {
  constructor(n) {
    super(n);
    V(this, "Schduler");
    const { enable_short_term: s } = this.parameters;
    this.Schduler = s ? oe : ie;
  }
  params_handler_proxy() {
    const n = this;
    return { set: function(s, o, i) {
      return o === "request_retention" && Number.isFinite(i) ? n.intervalModifier = n.calculate_interval_modifier(Number(i)) : o === "enable_short_term" && (n.Schduler = i === !0 ? oe : ie), Reflect.set(s, o, i), !0;
    } };
  }
  repeat(n, s, o) {
    const i = this.Schduler, r = new i(n, s, this).preview();
    return o && typeof o == "function" ? o(r) : r;
  }
  next(n, s, o, i) {
    const r = this.Schduler, a = new r(n, s, this), c = v.rating(o);
    if (c === u.Manual) throw new Error("Cannot review a manual rating");
    const l = a.review(c);
    return i && typeof i == "function" ? i(l) : l;
  }
  get_retrievability(n, s, o = !0) {
    const i = v.card(n);
    if (s = v.time(s), i.state !== A.Review) return;
    const r = Math.max(s.diff(i.last_review, "days"), 0), a = this.forgetting_curve(r, +i.stability.toFixed(2));
    return o ? `${(a * 100).toFixed(2)}%` : a;
  }
  rollback(n, s, o) {
    const i = v.card(n), r = v.review_log(s);
    if (r.rating === u.Manual) throw new Error("Cannot rollback a manual rating");
    let a, c, l;
    switch (r.state) {
      case A.New:
        a = r.due, c = void 0, l = 0;
        break;
      case A.Learning:
      case A.Relearning:
      case A.Review:
        a = r.review, c = r.due, l = i.lapses - (r.rating === u.Again && r.state === A.Review ? 1 : 0);
        break;
    }
    const p = { ...i, due: a, stability: r.stability, difficulty: r.difficulty, elapsed_days: r.last_elapsed_days, scheduled_days: r.scheduled_days, reps: Math.max(0, i.reps - 1), lapses: Math.max(0, l), state: r.state, last_review: c };
    return o && typeof o == "function" ? o(p) : p;
  }
  forget(n, s, o = !1, i) {
    const r = v.card(n);
    s = v.time(s);
    const a = r.state === A.New ? 0 : s.diff(r.last_review, "days"), c = { rating: u.Manual, state: r.state, due: r.due, stability: r.stability, difficulty: r.difficulty, elapsed_days: 0, last_elapsed_days: r.elapsed_days, scheduled_days: a, review: s }, l = { card: { ...r, due: s, stability: 0, difficulty: 0, elapsed_days: 0, scheduled_days: 0, reps: o ? 0 : r.reps, lapses: o ? 0 : r.lapses, state: A.New, last_review: r.last_review }, log: c };
    return i && typeof i == "function" ? i(l) : l;
  }
  reschedule(n, s = {}) {
    if (!Array.isArray(n)) throw new Error("cards must be an array");
    const o = [];
    for (const i of n) {
      if (v.state(i.state) !== A.Review || !i.last_review) continue;
      const r = Math.floor(i.scheduled_days), a = this.next_interval(+i.stability.toFixed(2), Math.round(i.elapsed_days), s.enable_fuzz ?? !0);
      if (a === r || a === 0) continue;
      const c = { ...i };
      c.scheduled_days = a;
      const l = xe(c.last_review, a, !0);
      s.dateHandler && typeof s.dateHandler == "function" ? c.due = s.dateHandler(l) : c.due = l, o.push(c);
    }
    return o;
  }
}
const Js = (e) => new Ws(e || {}), Ys = It({ enable_fuzz: !0 }), Ks = Js(Ys), Xs = (e) => ({
  id: e._id.$oid,
  last_review: e.lastAttempted,
  due: /* @__PURE__ */ new Date(),
  // Default due date; you may adjust based on your logic
  stability: 1,
  // initial value
  difficulty: 2.5,
  // initial value
  elapsed_days: Math.floor(
    ((/* @__PURE__ */ new Date()).getTime() - new Date(e.lastAttempted).getTime()) / (1e3 * 60 * 60 * 24)
    // convert minisecond to days
  ),
  scheduled_days: 1,
  // Example initial value
  reps: 0,
  // Number of repetitions so far
  lapses: 0,
  // Number of lapses so far
  state: e.correctAttempts === 0 ? 0 : 1
  // correctAttempts
});
function Zs(e) {
  const t = /* @__PURE__ */ new Date(), n = Xs(e), s = Ks.repeat(n, t), o = e.correctAttempts / (e.attempts + 0.1) > 0.5 ? u.Good : u.Again, { card: i } = s[o];
  return {
    ...i,
    reviewDue: i.due
  };
}
const tn = (e) => e.map((t) => {
  const n = Zs(t);
  return {
    ...t,
    reviewDue: n.reviewDue
  };
}), en = (e) => tn(e).sort(
  (t, n) => t.reviewDue.getTime() - n.reviewDue.getTime()
), $e = (e) => {
  for (let t = e.length - 1; t > 0; t--) {
    const n = Math.floor(Math.random() * (t + 1));
    [e[t], e[n]] = [e[n], e[t]];
  }
  return e;
}, sn = (e, t) => $e(t).slice(0, e), nn = (e, t) => {
  const n = en(t);
  return $e(n.slice(0, e));
};
function De(e) {
  const t = e.reduce(
    (s, o) => (Object.keys(o).forEach((i) => {
      i.trim() !== "" && (s[i] || (s[i] = /* @__PURE__ */ new Set()), o[i].forEach((a) => s[i].add(a)));
    }), s),
    {}
  );
  return Object.keys(t).reduce(
    (s, o) => (s[o] = [...t[o]], s),
    {}
  );
}
function Gt(e, t) {
  return e.filter((n) => Object.keys(t).every((s) => {
    if (!t[s].length)
      return !0;
    const o = n.tags[s];
    if (o)
      return o.some((i) => t[s].includes(i));
  }));
}
function on(e, t, n) {
  return e.filter((s) => {
    const o = s.tags[n];
    return o && o.includes(t);
  });
}
function rn(e, t, n) {
  const s = e[t].question.optionsList;
  for (let o = 0; o < s.length; o++)
    if (s[o].optionValue === n)
      return o;
}
const ke = (e, t) => t.findIndex((n) => {
  var s;
  return ((s = n.question._id) == null ? void 0 : s.$oid) === e;
}), U = Es("questionsQueue", {
  state: () => ({
    allQs: [],
    questionsQueue: [],
    questionsStack: [],
    quizStats: [],
    quizMode: "Tutor",
    selectedTags: { course: [] },
    timeLimit: 60,
    // default time limit 1 min per qs
    AnsweredQuesiton: 0,
    tagSets: []
  }),
  actions: {
    setTagSet() {
      this.tagSets = this.allQs.map((e) => e.tags);
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
        this.quizStats.length
      );
    },
    getquestionnumber() {
      const e = this.allQs;
      return Gt(e, this.selectedTags).length;
    },
    setselectedTags(e) {
      this.selectedTags = e;
    },
    getselectedtags() {
      return this.selectedTags;
    },
    modifySelectedTags(e, { category: t, topic: n }) {
      this.selectedTags[t] && (this.selectedTags[t] = e ? [...this.selectedTags[t], n] : this.selectedTags[t].filter(
        (s) => s !== n
      ));
    },
    initialiseQuiz(e, t) {
      this.questionsQueue = e, this.questionsStack = [], this.quizMode = t, this.quizStats = e.map((n) => ({
        question: n,
        correct: 0,
        skipped: 0,
        attempts: 0,
        selectedValue: ""
      }));
    },
    incrementStat(e, t, n) {
      const s = ke(e, this.quizStats);
      if (this.quizStats[s]) {
        if (n !== void 0) {
          if (this.quizStats[s][t]++, n === "-1") {
            this.quizStats[s].selectedValue = "Reached Time Limit";
            return;
          }
          const o = this.quizStats[s].question.optionsList.map((i) => i.optionCorrect).indexOf(!0);
          Number(n) === Number(o) ? this.quizStats[s].correct = 1 : this.quizStats[s].correct = 0;
        }
        this.quizStats[s].selectedValue = n !== void 0 ? this.quizStats[s].question.optionsList[Number(n)].optionValue : "";
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
}), an = ["innerHTML"], cn = { class: "mcq-list" }, ln = ["onClick"], un = { class: "next-prev-question" }, dn = /* @__PURE__ */ M({
  __name: "MCQQuestion",
  props: {
    _id: {},
    statement: {},
    optionsList: {}
  },
  emits: ["nextQuestion", "skipQuestion", "prevQuestion"],
  setup(e, { emit: t }) {
    const n = U(), s = E(null), o = E(!1), i = t, r = E(n.getRemainingQuestions()), a = () => {
      o.value = !0;
    }, c = () => {
      s.value = null, i("nextQuestion");
    }, l = () => {
      g(), r.value = n.getRemainingQuestions(), i("nextQuestion");
    }, p = () => {
      g(), i("skipQuestion");
    }, d = ($) => n.incrementStat(
      $.$oid,
      "attempts",
      s.value ?? void 0
    ), g = () => {
      o.value = !1, s.value = null;
    }, w = () => {
      s.value = null, i("prevQuestion");
    }, C = ($, D) => {
      o.value || (s.value = s.value === D ? null : D), d($);
    }, nt = ($, D, x) => n.quizMode === "Timed" ? _t($, D) : bt(D, x);
    function _t($, D) {
      const x = ke($.$oid, n.quizStats), R = n.quizStats[x].selectedValue, ot = rn(
        n.quizStats,
        x,
        R
      );
      return String(ot) === D ? (s.value = D, "selected") : "";
    }
    function bt($, D) {
      const x = D[parseInt($)], R = s.value === $;
      return o.value ? x.optionCorrect ? "correct ignore-hover" : R ? "wrong ignore-hover" : "ignore-hover" : R ? "selected" : "";
    }
    return ($, D) => (_(), y(B, null, [
      m("div", {
        class: "mcq-statement",
        innerHTML: $.statement
      }, null, 8, an),
      m("div", cn, [
        (_(!0), y(B, null, ct(Object.entries($.optionsList), ([x, R]) => (_(), y("div", {
          key: x,
          class: W(["mcq-option", nt($._id, x, $.optionsList)]),
          onClick: (ot) => C($._id, x)
        }, [
          lt(Ds, {
            "option-key": x,
            checked: s.value === x,
            option: R,
            submitted: o.value,
            onSelectOption: (ot) => C($._id, x)
          }, null, 8, ["option-key", "checked", "option", "submitted", "onSelectOption"])
        ], 10, ln))), 128))
      ]),
      S(n).quizMode === "Tutor" ? (_(), H(Qs, {
        key: 0,
        submitted: o.value,
        "selected-option": s.value,
        "hide-skip": r.value <= 1,
        onSubmitAnswer: a,
        onNextQuestion: D[0] || (D[0] = (x) => l()),
        onSkipQuestion: p
      }, null, 8, ["submitted", "selected-option", "hide-skip"])) : O("", !0),
      m("div", un, [
        S(n).quizMode === "Timed" ? (_(), H(ee, {
          key: 0,
          "button-name": S(n).questionsQueue.length >= 1 ? "→" : "Submit",
          onNextQuestion: D[1] || (D[1] = (x) => c())
        }, null, 8, ["button-name"])) : O("", !0),
        S(n).quizMode === "Timed" && S(n).questionsStack.length > 1 ? (_(), H(ee, {
          key: 1,
          "button-name": "←",
          onPrevQuestion: D[2] || (D[2] = (x) => w())
        })) : O("", !0)
      ])
    ], 64));
  }
}), Ne = /* @__PURE__ */ z(dn, [["__scopeId", "data-v-181a554c"]]), pn = (e) => (ce("data-v-38adb08e"), e = e(), le(), e), fn = { class: "report-container" }, hn = { class: "mcq-report" }, mn = { class: "table-container" }, gn = /* @__PURE__ */ pn(() => /* @__PURE__ */ m("thead", null, [
  /* @__PURE__ */ m("tr", null, [
    /* @__PURE__ */ m("th", null, "question"),
    /* @__PURE__ */ m("th", null, "correct option"),
    /* @__PURE__ */ m("th", null, "your answer")
  ])
], -1)), _n = { class: "question-row" }, bn = ["href", "innerHTML"], vn = { class: "answer-row" }, yn = ["innerHTML"], wn = { class: "answer-row" }, An = ["innerHTML"], Tn = { class: "mcq-result" }, Sn = { class: "score" }, En = /* @__PURE__ */ M({
  __name: "MCQStatus",
  setup(e) {
    const t = Rt("$updateQAttemptCallback") ?? Pe, n = U(), s = n.quizStats, o = n.quizStats.length, i = s.filter((c) => c.correct === 1).length, r = (i * 100 / o).toFixed(0);
    return xt(() => {
      try {
        const c = s.filter((l) => l.attempts).map(
          (l) => t(l.question._id.$oid, !!l.correct)
        );
        c.length && Promise.allSettled(c);
      } catch (c) {
        throw console.error("Error updating question attempts", c), c;
      }
    }), (c, l) => (_(), y("div", fn, [
      m("div", hn, [
        m("div", mn, [
          m("table", null, [
            gn,
            m("tbody", null, [
              (_(!0), y(B, null, ct(Object.entries(S(s)), ([p, d]) => (_(), y("tr", {
                key: p,
                class: "quiz-statment"
              }, [
                m("td", _n, [
                  m("a", {
                    href: d.question.link,
                    target: "_blank",
                    innerHTML: d.question.statement
                  }, null, 8, bn)
                ]),
                m("td", vn, [
                  (_(!0), y(B, null, ct(Object.entries(
                    d.question.optionsList
                  ), ([g, w]) => (_(), y("span", { key: g }, [
                    w.optionCorrect ? (_(), y("span", {
                      key: 0,
                      innerHTML: w.optionValue
                    }, null, 8, yn)) : O("", !0)
                  ]))), 128))
                ]),
                m("td", wn, [
                  m("span", {
                    class: W(
                      d.correct === 1 ? "correct-answer" : "wrong-answer"
                    ),
                    innerHTML: d.correct === 1 ? "<span> ✔</span> " : "<span> ✘</span> <span>     </span>" + d.selectedValue
                  }, null, 10, An)
                ])
              ]))), 128))
            ])
          ])
        ])
      ]),
      m("div", null, [
        m("div", Tn, [
          m("span", Sn, "⌛ Result: " + N(S(i)) + " out of " + N(S(o)) + " - (" + N(S(r)) + " %)", 1)
        ])
      ])
    ]));
  }
}), Qe = /* @__PURE__ */ z(En, [["__scopeId", "data-v-38adb08e"]]), xn = { class: "questions-left-header" }, Cn = /* @__PURE__ */ M({
  __name: "MCQQuiz",
  setup(e) {
    const t = E(), n = U();
    xt(() => {
      o();
    });
    const s = () => {
      n.enqueueQuestion(t.value), t.value = n.dequeueQuestion();
    }, o = () => {
      n.setAnsweredQuestionsNum(), t.value = n.dequeueQuestion();
    }, i = () => window.location.reload();
    return (r, a) => {
      const c = Be("MCQInfoPanel");
      return _(), y("main", null, [
        lt(c),
        m("h3", xn, " Question " + N(S(n).getAnsweredQuestionsNum()) + " out of " + N(S(n).quizStats.length), 1),
        t.value ? (_(), H(Ne, {
          key: 0,
          statement: t.value.statement,
          "options-list": t.value.optionsList,
          _id: t.value._id,
          onNextQuestion: o,
          onSkipQuestion: s
        }, null, 8, ["statement", "options-list", "_id"])) : O("", !0),
        t.value ? O("", !0) : (_(), H(Qe, { key: 1 })),
        t.value ? O("", !0) : (_(), y("button", {
          key: 2,
          class: "btn-relocate",
          onClick: i
        }, " End "))
      ]);
    };
  }
}), $n = /* @__PURE__ */ z(Cn, [["__scopeId", "data-v-edc7c7f1"]]), Dn = {
  key: 0,
  class: "time-left-header"
}, kn = { class: "questions-left-header" }, Nn = /* @__PURE__ */ M({
  __name: "MCQInfoPanel",
  props: {
    timeLeft: {
      type: Number,
      default: 0
    }
  },
  setup(e) {
    const t = U(), n = (s) => {
      const o = Math.floor(s / 60), i = s % 60;
      return `${o}:${i < 10 ? "0" : ""}${i}`;
    };
    return (s, o) => (_(), y(B, null, [
      e.timeLeft ? (_(), y("h3", Dn, " Time left: " + N(n(e.timeLeft)), 1)) : O("", !0),
      m("h3", kn, " Question " + N(S(t).questionsStack.length) + " out of " + N(S(t).quizStats.length), 1)
    ], 64));
  }
}), re = 1e3, Qn = "-1", On = /* @__PURE__ */ M({
  __name: "MCQTimedQuiz",
  setup(e) {
    const t = U(), n = E();
    let s = null, o = null;
    const i = E(t.timeLimit);
    xt(() => {
      a();
    }), ue(() => {
      l(), p();
    });
    const r = () => {
      n.value = t.removeFromLastHistory() ?? n.value;
    }, a = () => n.value = t.dequeueQuestion(), c = () => window.location.reload(), l = () => {
      s && clearTimeout(s), o && clearInterval(o);
    }, p = () => {
      i.value = t.timeLimit;
      const g = () => n.value ? i.value ? i.value-- : d() : l();
      o = window.setInterval(g, re), s = window.setTimeout(() => {
      }, t.timeLimit * re);
    }, d = () => {
      var w;
      l();
      const g = (C) => t.incrementStat(C, "attempts", Qn);
      for (g(((w = n.value) == null ? void 0 : w._id.$oid) ?? ""); n.value = t.dequeueQuestion(); )
        g(n.value._id.$oid);
      return alert("Time's up! Quiz has ended."), a();
    };
    return (g, w) => (_(), y("main", null, [
      lt(Nn, { "time-left": i.value }, null, 8, ["time-left"]),
      n.value ? (_(), H(Ne, {
        key: 0,
        statement: n.value.statement,
        "options-list": n.value.optionsList,
        _id: n.value._id,
        onNextQuestion: a,
        onPrevQuestion: r
      }, null, 8, ["statement", "options-list", "_id"])) : O("", !0),
      n.value ? O("", !0) : (_(), H(Qe, { key: 1 })),
      n.value ? O("", !0) : (_(), y("button", {
        key: 2,
        class: "btn-relocate",
        onClick: c
      }, " End "))
    ]));
  }
}), Vn = /* @__PURE__ */ z(On, [["__scopeId", "data-v-4fd74e68"]]), Mn = ["id", "name", "value", "disabled"], qn = ["for"], Pn = {
  key: 0,
  class: "question-number"
}, In = /* @__PURE__ */ M({
  __name: "FilterCheckbox",
  props: {
    category: {},
    topics: {}
  },
  setup(e) {
    const { category: t, topics: n } = e, s = U(), o = (c) => t === "course" ? c.toUpperCase() : c, i = Ht(
      () => Object.entries(n).map(([c, l]) => {
        const p = a(l, t), d = on(
          s.allQs,
          l,
          t
        ).length.toString();
        return { idx: c, topic: l, num: p, questionamount: d };
      }).filter(({ topic: c }) => c !== void 0)
    ), r = (c) => {
      if (!(c.target instanceof HTMLInputElement))
        return console.error("Trying to click on non-input element");
      const l = c.target.name, p = c.target.value;
      s.modifySelectedTags(c.target.checked, { category: l, topic: p });
    }, a = (c, l) => {
      var w;
      const p = s.getselectedtags();
      if (!p[l] || (w = p[l]) != null && w.includes(
        c
      ))
        return null;
      const d = JSON.parse(
        JSON.stringify(s.getselectedtags())
      );
      d[l].includes(c) || d[l].push(c);
      const g = s.allQs;
      return Gt(
        g,
        d
      ).length.toString();
    };
    return (c, l) => (_(), y("ul", null, [
      (_(!0), y(B, null, ct(i.value, ({ idx: p, num: d, topic: g, questionamount: w }) => (_(), y("li", {
        key: p,
        class: W(["filter-options", { "grey-out": d === "0" }])
      }, [
        m("input", {
          id: `${c.category}-${g}-checkbox`,
          type: "checkbox",
          name: c.category,
          value: g,
          disabled: d === "0",
          onChange: l[0] || (l[0] = (C) => r(C))
        }, null, 40, Mn),
        m("label", {
          for: `${c.category}-${g}-checkbox`
        }, [
          de(N(o(g)) + " ", 1),
          d !== null && d !== "0" ? (_(), y("span", Pn, N(w), 1)) : O("", !0)
        ], 8, qn)
      ], 2))), 128))
    ]));
  }
}), Ln = /* @__PURE__ */ z(In, [["__scopeId", "data-v-43544b02"]]), Rn = {
  key: 0,
  class: "filter"
}, jn = { class: "category-heading" }, zn = /* @__PURE__ */ M({
  __name: "MCQTagOptions",
  setup(e) {
    const t = E([]), n = U();
    let s = {};
    return jt(
      () => n.allQs,
      (o, i) => {
        n.setTagSet(), t.value = n.getTagSet(), s = De(t.value);
      }
    ), (o, i) => S(n).allQs ? (_(), y("div", Rn, [
      (_(!0), y(B, null, ct(Object.entries(S(s)), ([r, a]) => (_(), y("div", {
        key: r,
        class: "category"
      }, [
        m("h2", jn, N(r), 1),
        lt(Ln, {
          category: r,
          topics: a
        }, null, 8, ["category", "topics"])
      ]))), 128))
    ])) : O("", !0);
  }
}), Hn = /* @__PURE__ */ z(zn, [["__scopeId", "data-v-0ae43360"]]), Fn = { for: "optionName" }, Un = ["value"], Gn = /* @__PURE__ */ M({
  __name: "DropDownbox",
  props: {
    options: {},
    optionName: {},
    disabled: { type: Boolean }
  },
  setup(e) {
    const t = U(), n = E(0);
    function s(o) {
      const i = o.target;
      i.value && (n.value = parseFloat(i.value) * 60, t.setTimeLimit(n.value));
    }
    return (o, i) => (_(), y("div", {
      class: W(o.disabled ? "dropdown input-disabled" : "dropdown")
    }, [
      m("label", Fn, N(o.optionName) + ":   ", 1),
      m("select", {
        id: "optionName",
        name: "optionName",
        onChange: s
      }, [
        (_(!0), y(B, null, ct(o.options, (r) => (_(), y("option", {
          key: r.value,
          value: r.value
        }, N(r.value) + " " + N(r.unit), 9, Un))), 128))
      ], 32)
    ], 2));
  }
}), Bn = /* @__PURE__ */ z(Gn, [["__scopeId", "data-v-5f3ae97a"]]), st = (e) => (ce("data-v-3d509e7a"), e = e(), le(), e), Wn = { class: "start-page-container" }, Jn = /* @__PURE__ */ st(() => /* @__PURE__ */ m("h1", null, "VetCloud Smart Quiz", -1)), Yn = { class: "quiz-config-container" }, Kn = { class: "question-config-container" }, Xn = { class: "tag-text" }, Zn = { class: "question-number" }, to = { class: "question-amount-container" }, eo = /* @__PURE__ */ st(() => /* @__PURE__ */ m("label", { for: "question-amount" }, "Select the amount of questions:", -1)), so = ["max"], no = {
  key: 0,
  class: "show-max-msg"
}, oo = /* @__PURE__ */ st(() => /* @__PURE__ */ m("label", { for: "mode-select" }, "Select mode:", -1)), io = /* @__PURE__ */ st(() => /* @__PURE__ */ m("option", { value: "Tutor" }, "Tutor", -1)), ro = /* @__PURE__ */ st(() => /* @__PURE__ */ m("option", { value: "Timed" }, "Timed", -1)), ao = [
  io,
  ro
], co = {
  key: 0,
  class: "srs-toggle-frame"
}, lo = /* @__PURE__ */ st(() => /* @__PURE__ */ m("span", null, "Enable Spaced Repetition Scheduled", -1)), uo = /* @__PURE__ */ st(() => /* @__PURE__ */ m("label", {
  class: "srs-label",
  for: "switch"
}, "toggle", -1)), po = 3e3, fo = /* @__PURE__ */ M({
  __name: "StartPage",
  emits: ["start-quiz", "enable-srs"],
  setup(e, { emit: t }) {
    const n = E(1), s = E("Tutor"), o = E(!1), i = E(null), r = t, a = U();
    xt(() => {
      We(() => {
        const p = a.getquestionnumber();
        n.value = Math.min(10, p);
      });
    });
    const c = () => {
      r("start-quiz", {
        questionAmount: n.value,
        mode: s.value
      });
    }, l = () => {
      i.value && clearTimeout(i.value), n.value > a.getquestionnumber() && (n.value = a.getquestionnumber(), o.value = !0, i.value = window.setTimeout(() => {
        o.value = !1;
      }, po));
    };
    return (p, d) => (_(), y("div", Wn, [
      Jn,
      lt(Hn),
      m("div", Yn, [
        m("div", Kn, [
          m("p", Xn, [
            de(" Maximum possible questions: "),
            m("span", Zn, N(S(a).getquestionnumber()), 1)
          ]),
          m("div", to, [
            eo,
            Wt(m("input", {
              id: "question-amount",
              "onUpdate:modelValue": d[0] || (d[0] = (g) => n.value = g),
              type: "number",
              placeholder: "Question amount",
              min: "1",
              max: S(a).getquestionnumber(),
              onInput: l
            }, null, 40, so), [
              [
                Je,
                n.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o.value ? (_(), y("p", no, " Cannot select more than " + N(S(a).getquestionnumber()) + " questions. ", 1)) : O("", !0),
          m("div", null, [
            oo,
            Wt(m("select", {
              id: "mode-select",
              "onUpdate:modelValue": d[1] || (d[1] = (g) => s.value = g)
            }, ao, 512), [
              [Ye, s.value]
            ])
          ]),
          lt(Bn, {
            options: [
              { value: 1, label: "Time Option 2", unit: "Min." },
              { value: 1.5, label: "Time Option 1", unit: "Min." }
            ],
            "option-name": "Time per Question",
            class: W(s.value === "Timed" ? "" : "input-disabled"),
            disabled: s.value !== "Timed"
          }, null, 8, ["class", "disabled"])
        ])
      ]),
      s.value === "Tutor" ? (_(), y("div", co, [
        lo,
        m("input", {
          id: "switch",
          class: "srs-toggle",
          type: "checkbox",
          onClick: d[2] || (d[2] = (g) => r("enable-srs"))
        }),
        uo
      ])) : O("", !0),
      m("button", {
        class: "start-button",
        onClick: c
      }, "Start")
    ]));
  }
}), ho = /* @__PURE__ */ z(fo, [["__scopeId", "data-v-3d509e7a"]]), mo = (e) => e.trim().toLowerCase().replace("_", " "), go = (e) => e.reduce((t, n) => {
  if (!n.includes(":")) return t;
  let [s, o] = n.split(":");
  return [s, o] = [s.trim().toLowerCase(), mo(o)], t[s] ? t[s] = [...t[s], o] : t[s] = [o], t;
}, {}), _o = (e) => e.map((t) => ({
  _id: { $oid: t._id.$oid },
  statement: t.statement,
  tags: go(t.tags),
  optionsList: t.optionsList,
  link: t.link,
  attempts: t.attempts,
  correctAttempts: t.correctAttempts,
  lastAttempted: t.lastAttempted
})), Oe = { convertQuestions: _o }, bo = [
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
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Presynaptic terminal</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Cell body</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Dendrite</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Myelin</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af39b",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Reaching the subthreshold level does not stimulate the post-synaptic membrane</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Threshold event generates an action potential</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Reaching the subthreshold level is enough to generate an action potential</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Depolarised synaptic membrane is more negative than the hyperpolarised membrane</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0b",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
  },
  {
    tags: ["course:vets2012", "subject:physiology", "animal:horse"],
    statement: "<p>Action potentials are transmitted along which part of a neuron?</p>",
    optionsList: [
      {
        optionValue: "<p>The membrane is more depolarised</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>The effect of the subthreshold is enhanced</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Action potential is reached</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>A threshold event takes place</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>The membrane is hyperpolarised</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0a",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
  },
  {
    tags: ["course:vets2012", "subject:physiology", "animal:horse"],
    statement: "<p>Which of the following would NOT be possible occurrences when signal build-up occurs?</p>",
    optionsList: [
      {
        optionValue: "<p>They can reach action potential as a result of EPSP</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>IPSP can hyperpolarise the membrane</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>They can reach action potential as a result of IPSP</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>An action potential will be reached if the number of EPSP &gt; IPSP</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0d",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
  },
  {
    tags: ["course: VETS2012", "subject:Physiology", "animal:dog"],
    statement: "<p>When is it impossible to generate an action potential?</p>",
    optionsList: [
      {
        optionValue: "<p>Absolute refractory period</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Relative refractory period</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Sodium conductance</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>EPSPs after IPSPs</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Hyperpolarised state</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0f",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
  },
  {
    tags: ["course: VETS2013", "course:vets2016", "subject:Physiology"],
    statement: "<p>Which of the following types of glial cells myelinate neurons in the peripheral nervous system?</p>",
    optionsList: [
      {
        optionValue: "<p>Ependymal cells</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Schwann cells</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Muller cells</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Oligodendrocytes</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac11",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214413464c71f1df2110d07",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
  },
  {
    tags: ["course: VETS2012", "subject:Atonomy", "animal:Horse"],
    statement: "<p>Which of the following is an attribute of ependymal cells?</p>",
    optionsList: [
      {
        optionValue: "<p>Repair processes</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Cerebrospinal fluid synthesis</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Delivering nutrients</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Recycling of neurotransmitters</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Maintenance of terminal environment</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac10",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214413464c71f1df2110d07",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
  },
  {
    tags: ["course: VETS2013", "subject:Physiology", "animal:cat"],
    statement: "<p>Depending on the pre-synaptic neurotransmitter released and the post-synaptic receptor activated, the post-synaptic membrane can either be depolarised or hyperpolarised. Which of the following statements is FALSE?</p>",
    optionsList: [
      {
        optionValue: "<p>Neurotransmitter binding to metabotropic receptors causes a conformational change in pore proteins</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "The action of metabotropic receptors is slower than ionotropic receptors",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "Neurotransmitter binding to metabotropic receptors causes a conformational change, activating a signal transduction pathway",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "An example of an ionotropic receptor is the nicotinic acetylcholine receptor",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86faa",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d5a64c71f1df2110d16",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
  },
  {
    tags: ["course: VETS2012", "subject:Physiology", "animal:Horse"],
    statement: "Nicotine (mimics acetylcholine) can bind to nicotinic cholinergic receptors. You would expect the response on the post-synaptic membrane to be:",
    optionsList: [
      {
        optionValue: "Excitation due to opening of chloride channels",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "Hyperpolarisation due to blocking of sodium channels",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "Hyperpolarisation due to opening of chloride channels",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "Excitation due to opening of sodium channels",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fac",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d5a64c71f1df2110d16",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
  },
  {
    tags: ["course: VETS2012", "subject:Physiology", "animal:Horse"],
    statement: "&gamma;-aminobutyric acid (GABA) is a rapidly acting neurotransmitter. You would expect the response on the post-synaptic membrane to be:",
    optionsList: [
      {
        optionValue: "Excitation due to opening of chloride channels",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "Hyperpolarisation due to blocking of sodium channels",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "Hyperpolarisation due to opening of chloride channels",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "Excitation due to opening of sodium channels",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fab",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d5a64c71f1df2110d16",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
  },
  {
    tags: ["course: VETS2012", "subject:Physiology", "animal:Horse"],
    statement: "<p>At the neuromuscular junction, Ca<sup>2+</sup>&nbsp;ions are necessary for:</p>",
    optionsList: [
      {
        optionValue: "<p>Binding the transmitter with the post-synaptic receptor</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Facilitating diffusion of the transmitter to the post-synaptic membrane</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Splitting the neurotransmitter in the synaptic cleft, deactivating the transmitter</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Fusing the pre-synaptic vesicle with the pre-synaptic membrane, thus releasing the transmitter</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Metabolising the transmitter within the pre-synaptic vesicle</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fae",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d7064c71f1df2110d17",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
  },
  {
    tags: ["course: VETS2012", "subject:Physiology", "animal:Horse"],
    statement: "<p>Which of the following statements is TRUE with regard to the termination of the synaptic action at the neuromuscular junction?</p>",
    optionsList: [
      {
        optionValue: "<p>The re-uptake of intact acetylcholine molecules into the motor neuron terminal is responsible</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Diffusion of acetylcholine away from the synapse is solely responsible</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Acetylcholinesterase rapidly breaks down acetylcholine into choline and acetate</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Dissociation of acetylcholine from the muscarinic receptor, after binding for several seconds, is solely responsible</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fad",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d7064c71f1df2110d17",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
  },
  {
    tags: ["course: VETS2012", "subject:Physiology", "animal:Horse"],
    statement: "<p>Which part of a neuron receives information from surrounding cells?</p>",
    optionsList: [
      {
        optionValue: "<p>Axon</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Presynaptic terminal</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Cell body</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Dendrite</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Myelin</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac06",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
  }
], L = {
  isString: (r) => typeof r == "string",
  isObject: (r) => typeof r == "object" && r !== null,
  isBoolean: (r) => typeof r == "boolean",
  isArray: (r, a) => Array.isArray(r) && r.every(a),
  isNumber: (r) => typeof r == "number",
  isFunction: (r) => typeof r == "function"
};
function Lt(e) {
  const t = e.includes(":") && e.split(":").length === 2, n = !e.includes(":") && !e.includes(" ");
  return t || n;
}
function Ve(e, t = !1) {
  return L.isArray(e, L.isString) ? t ? e.every(Lt) : e.some(Lt) : !1;
}
function vo(e) {
  return L.isObject(e) && L.isString(e.optionValue) && (e.optionCorrect === void 0 || L.isBoolean(e.optionCorrect));
}
function Me(e) {
  return L.isObject(e) && L.isObject(e._id) && // Assuming _id is an object with $oid property
  L.isString(e._id.$oid) && L.isString(e.statement) && Ve(e.tags) && // Modified to ensure tags are always checked
  L.isArray(e.optionsList, vo) && L.isString(e.link);
}
function yo(e) {
  return L.isArray(e, Me);
}
const yt = {
  isMCQuestion: Me,
  isMCQuestionArray: yo,
  validateTags: Ve,
  isTag: Lt
}, wo = (e) => {
  try {
    if (!e)
      throw new Error("No question data found. Please Try again later.");
    return Oe.convertQuestions(qe(e));
  } catch (t) {
    return alert(t), [];
  }
}, Ao = () => bo, To = () => {
  const e = Ao();
  return Oe.convertQuestions(qe(e));
};
function qe(e) {
  yt.isMCQuestionArray(e) ? console.info(
    "%cAll questions are valid",
    "color: #00FF00",
    `
Total Questions Validated:`,
    e.length
  ) : console.warn(
    "%cWARNING: Some questions contains invalid structure",
    "color: #FF0000"
  );
  const t = {
    invalidTags: 0,
    noTags: 0,
    invalidQs: 0,
    totalTags: 0
  }, n = e.reduce((s, o) => {
    if (!yt.isMCQuestion(o))
      return { ...s, invalidQs: s.invalidQs + 1 };
    let { tags: i } = o;
    if (!i || Array.isArray(i) && !i.length)
      return { ...s, noTags: s.noTags + 1 };
    const r = s.totalTags + i.length;
    if (!yt.validateTags(i, !0)) {
      const a = i.filter((l) => yt.isTag(l)), c = s.invalidTags + i.length - a.length;
      return i = a, { ...s, invalidTags: c, totalTags: r };
    }
    return { ...s, totalTags: r };
  }, t);
  return So(n, e.length), e;
}
function Ot(e, t) {
  e && console.warn(t, "color: #FF0000");
}
function So(e, t) {
  const { invalidQs: n, invalidTags: s, noTags: o, totalTags: i } = e;
  Ot(
    n,
    `Invalid Questions Received: %c${n} out of ${t}`
  ), Ot(
    s,
    `Filtering out invalid tags: %c${s} out of ${i}`
  ), Ot(o, `Questions with no tags: %c${o}`);
}
const Eo = /* @__PURE__ */ M({
  __name: "CrucibleComponent",
  props: {
    level: {
      type: Number,
      default: 5
      // a default value is required for Vue props
    }
  },
  setup(e) {
    const t = e, n = E(!1), s = E(0), o = U(), i = E(!1), r = E([]), a = Rt("$dataLink"), { level: c } = Vt(t);
    ue(async () => {
      if (a) {
        const g = await (async () => (await (await fetch(`${a}?level=${c.value}`)).json()).questions)();
        r.value = wo(g);
      } else
        r.value = To();
      o.allQs = r.value;
      const p = De(
        r.value.map((d) => d.tags)
      );
      o.setselectedTags(
        Object.keys(p).reduce((d, g) => ({ ...d, [g]: [] }), {})
      ), o.setTagSet();
    });
    const l = ({ questionAmount: p, mode: d }) => {
      const g = o.getselectedtags();
      if (!r.value.length)
        return alert("Trouble fetching questions, please try again later");
      const w = Gt(
        r.value,
        g
      ), C = n.value && d === "Tutor" ? nn(p, w) : sn(p, w);
      s.value = C.length, o.initialiseQuiz(C, d), d === "Timed" && o.setTimeLimit(p * o.timeLimit), i.value = !0;
    };
    return (p, d) => i.value && S(o).quizMode === "Tutor" ? (_(), H($n, { key: 0 })) : i.value && S(o).quizMode === "Timed" ? (_(), H(Vn, { key: 1 })) : (_(), H(ho, {
      key: 2,
      onStartQuiz: l,
      onEnableSrs: d[0] || (d[0] = () => n.value = !n.value)
    }));
  }
}), xo = {
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
}, Pe = async (e, t) => {
};
function ko(e, t = {}) {
  const n = ws();
  e.use(n), e.component("CrucibleComponent", Eo), e.provide("$dataLink", t.dataLink || xo), e.provide(
    "$updateQAttemptCallback",
    t.updateQAttemptCallback || Pe
  );
}
export {
  Eo as CrucibleComponent,
  ko as createViewerPlugin,
  xo as defaultData,
  Pe as defaultUpdateQAttemptCallback
};
