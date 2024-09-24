var Pe = Object.defineProperty;
var Le = (e, t, n) => t in e ? Pe(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var M = (e, t, n) => Le(e, typeof t != "symbol" ? t + "" : t, n);
import { effectScope as ce, ref as S, markRaw as X, toRaw as ft, hasInjectionContext as Ie, inject as jt, getCurrentInstance as Re, watch as zt, unref as E, reactive as je, isRef as ht, isReactive as Ht, toRef as Ct, nextTick as Wt, computed as Ft, getCurrentScope as ze, onScopeDispose as He, toRefs as Ot, defineComponent as V, openBlock as g, createElementBlock as w, Fragment as B, normalizeClass as Y, createElementVNode as m, toDisplayString as k, renderList as at, createVNode as rt, createBlock as H, createCommentVNode as O, onMounted as gt, resolveComponent as Fe, onBeforeMount as le, createTextVNode as ue, watchEffect as Ue, withDirectives as Jt, vModelText as Ge, vModelSelect as Be } from "vue";
var de = !1;
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
function We() {
  return pe().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function pe() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Je = typeof Proxy == "function", Ye = "devtools-plugin:setup", Ke = "plugin:settings:set";
let nt, Vt;
function Xe() {
  var e;
  return nt !== void 0 || (typeof window < "u" && window.performance ? (nt = !0, Vt = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (nt = !0, Vt = globalThis.perf_hooks.performance) : nt = !1), nt;
}
function Ze() {
  return Xe() ? Vt.now() : Date.now();
}
class ts {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const s = {};
    if (t.settings)
      for (const i in t.settings) {
        const r = t.settings[i];
        s[i] = r.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${t.id}`;
    let a = Object.assign({}, s);
    try {
      const i = localStorage.getItem(o), r = JSON.parse(i);
      Object.assign(a, r);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return a;
      },
      setSettings(i) {
        try {
          localStorage.setItem(o, JSON.stringify(i));
        } catch {
        }
        a = i;
      },
      now() {
        return Ze();
      }
    }, n && n.on(Ke, (i, r) => {
      i === this.plugin.id && this.fallbacks.setSettings(r);
    }), this.proxiedOn = new Proxy({}, {
      get: (i, r) => this.target ? this.target.on[r] : (...c) => {
        this.onQueue.push({
          method: r,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (i, r) => this.target ? this.target[r] : r === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(r) ? (...c) => (this.targetQueue.push({
        method: r,
        args: c,
        resolve: () => {
        }
      }), this.fallbacks[r](...c)) : (...c) => new Promise((l) => {
        this.targetQueue.push({
          method: r,
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
function fe(e, t) {
  const n = e, s = pe(), o = We(), a = Je && n.enableEarlyProxy;
  if (o && (s.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a))
    o.emit(Ye, e, t);
  else {
    const i = a ? new ts(n, o) : null;
    (s.__VUE_DEVTOOLS_PLUGINS__ = s.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: i
    }), i && t(i.proxiedTarget);
  }
}
/*!
 * pinia v2.2.2
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */
let pt;
const mt = (e) => pt = e, he = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
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
const Z = typeof window < "u", Yt = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function es(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Ut(e, t, n) {
  const s = new XMLHttpRequest();
  s.open("GET", e), s.responseType = "blob", s.onload = function() {
    _e(s.response, t, n);
  }, s.onerror = function() {
    console.error("could not download file");
  }, s.send();
}
function me(e) {
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
const At = typeof navigator == "object" ? navigator : { userAgent: "" }, ge = /Macintosh/.test(At.userAgent) && /AppleWebKit/.test(At.userAgent) && !/Safari/.test(At.userAgent), _e = Z ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !ge ? ss : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in At ? ns : (
      // Fallback to using FileReader and a popup
      os
    )
  )
) : () => {
};
function ss(e, t = "download", n) {
  const s = document.createElement("a");
  s.download = t, s.rel = "noopener", typeof e == "string" ? (s.href = e, s.origin !== location.origin ? me(s.href) ? Ut(e, t, n) : (s.target = "_blank", wt(s)) : wt(s)) : (s.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(s.href);
  }, 4e4), setTimeout(function() {
    wt(s);
  }, 0));
}
function ns(e, t = "download", n) {
  if (typeof e == "string")
    if (me(e))
      Ut(e, t, n);
    else {
      const s = document.createElement("a");
      s.href = e, s.target = "_blank", setTimeout(function() {
        wt(s);
      });
    }
  else
    navigator.msSaveOrOpenBlob(es(e, n), t);
}
function os(e, t, n, s) {
  if (s = s || open("", "_blank"), s && (s.document.title = s.document.body.innerText = "downloading..."), typeof e == "string")
    return Ut(e, t, n);
  const o = e.type === "application/octet-stream", a = /constructor/i.test(String(Yt.HTMLElement)) || "safari" in Yt, i = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((i || o && a || ge) && typeof FileReader < "u") {
    const r = new FileReader();
    r.onloadend = function() {
      let c = r.result;
      if (typeof c != "string")
        throw s = null, new Error("Wrong reader.result type");
      c = i ? c : c.replace(/^data:[^;]*;/, "data:attachment/file;"), s ? s.location.href = c : location.assign(c), s = null;
    }, r.readAsDataURL(e);
  } else {
    const r = URL.createObjectURL(e);
    s ? s.location.assign(r) : location.href = r, s = null, setTimeout(function() {
      URL.revokeObjectURL(r);
    }, 4e4);
  }
}
function $(e, t) {
  const n = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, t) : t === "error" ? console.error(n) : t === "warn" ? console.warn(n) : console.log(n);
}
function Gt(e) {
  return "_a" in e && "install" in e;
}
function be() {
  if (!("clipboard" in navigator))
    return $("Your browser doesn't support the Clipboard API", "error"), !0;
}
function ve(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? ($('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function is(e) {
  if (!be())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), $("Global state copied to clipboard.");
    } catch (t) {
      if (ve(t))
        return;
      $("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function as(e) {
  if (!be())
    try {
      ye(e, JSON.parse(await navigator.clipboard.readText())), $("Global state pasted from clipboard.");
    } catch (t) {
      if (ve(t))
        return;
      $("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function rs(e) {
  try {
    _e(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    $("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let G;
function cs() {
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
async function ls(e) {
  try {
    const n = await cs()();
    if (!n)
      return;
    const { text: s, file: o } = n;
    ye(e, JSON.parse(s)), $(`Global state imported from "${o.name}".`);
  } catch (t) {
    $("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function ye(e, t) {
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
const we = "🍍 Pinia (root)", Tt = "_root";
function us(e) {
  return Gt(e) ? {
    id: Tt,
    label: we
  } : {
    id: e.$id,
    label: e.$id
  };
}
function ds(e) {
  if (Gt(e)) {
    const n = Array.from(e._s.keys()), s = e._s;
    return {
      state: n.map((a) => ({
        editable: !0,
        key: a,
        value: e.state.value[a]
      })),
      getters: n.filter((a) => s.get(a)._getters).map((a) => {
        const i = s.get(a);
        return {
          editable: !1,
          key: a,
          value: i._getters.reduce((r, c) => (r[c] = i[c], r), {})
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
function ps(e) {
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
function fs(e) {
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
let it = !0;
const St = [], K = "pinia:mutations", N = "pinia", { assign: hs } = Object, xt = (e) => "🍍 " + e;
function ms(e, t) {
  fe({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: St,
    app: e
  }, (n) => {
    typeof n.now != "function" && $("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
      id: K,
      label: "Pinia 🍍",
      color: 15064968
    }), n.addInspector({
      id: N,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            is(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await as(t), n.sendInspectorTree(N), n.sendInspectorState(N);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            rs(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await ls(t), n.sendInspectorTree(N), n.sendInspectorState(N);
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
            o ? typeof o.$reset != "function" ? $(`Cannot reset "${s}" store because it doesn't have a "$reset" method implemented.`, "warn") : (o.$reset(), $(`Store "${s}" reset.`)) : $(`Cannot reset "${s}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((s, o) => {
      const a = s.componentInstance && s.componentInstance.proxy;
      if (a && a._pStores) {
        const i = s.componentInstance.proxy._pStores;
        Object.values(i).forEach((r) => {
          s.instanceData.state.push({
            type: xt(r.$id),
            key: "state",
            editable: !0,
            value: r._isOptionsAPI ? {
              _custom: {
                value: ft(r.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => r.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(r.$state).reduce((c, l) => (c[l] = r.$state[l], c), {})
            )
          }), r._getters && r._getters.length && s.instanceData.state.push({
            type: xt(r.$id),
            key: "getters",
            editable: !1,
            value: r._getters.reduce((c, l) => {
              try {
                c[l] = r[l];
              } catch (f) {
                c[l] = f;
              }
              return c;
            }, {})
          });
        });
      }
    }), n.on.getInspectorTree((s) => {
      if (s.app === e && s.inspectorId === N) {
        let o = [t];
        o = o.concat(Array.from(t._s.values())), s.rootNodes = (s.filter ? o.filter((a) => "$id" in a ? a.$id.toLowerCase().includes(s.filter.toLowerCase()) : we.toLowerCase().includes(s.filter.toLowerCase())) : o).map(us);
      }
    }), globalThis.$pinia = t, n.on.getInspectorState((s) => {
      if (s.app === e && s.inspectorId === N) {
        const o = s.nodeId === Tt ? t : t._s.get(s.nodeId);
        if (!o)
          return;
        o && (s.nodeId !== Tt && (globalThis.$store = ft(o)), s.state = ds(o));
      }
    }), n.on.editInspectorState((s, o) => {
      if (s.app === e && s.inspectorId === N) {
        const a = s.nodeId === Tt ? t : t._s.get(s.nodeId);
        if (!a)
          return $(`store "${s.nodeId}" not found`, "error");
        const { path: i } = s;
        Gt(a) ? i.unshift("state") : (i.length !== 1 || !a._customProperties.has(i[0]) || i[0] in a.$state) && i.unshift("$state"), it = !1, s.set(a, i, s.state.value), it = !0;
      }
    }), n.on.editComponentState((s) => {
      if (s.type.startsWith("🍍")) {
        const o = s.type.replace(/^🍍\s*/, ""), a = t._s.get(o);
        if (!a)
          return $(`store "${o}" not found`, "error");
        const { path: i } = s;
        if (i[0] !== "state")
          return $(`Invalid path for store "${o}":
${i}
Only state can be modified.`);
        i[0] = "$state", it = !1, s.set(a, i, s.state.value), it = !0;
      }
    });
  });
}
function gs(e, t) {
  St.includes(xt(t.$id)) || St.push(xt(t.$id)), fe({
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
    t.$onAction(({ after: i, onError: r, name: c, args: l }) => {
      const f = Ae++;
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
          groupId: f
        }
      }), i((d) => {
        J = void 0, n.addTimelineEvent({
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
            groupId: f
          }
        });
      }), r((d) => {
        J = void 0, n.addTimelineEvent({
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
            groupId: f
          }
        });
      });
    }, !0), t._customProperties.forEach((i) => {
      zt(() => E(t[i]), (r, c) => {
        n.notifyComponentUpdate(), n.sendInspectorState(N), it && n.addTimelineEvent({
          layerId: K,
          event: {
            time: s(),
            title: "Change",
            subtitle: i,
            data: {
              newValue: r,
              oldValue: c
            },
            groupId: J
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: i, type: r }, c) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState(N), !it)
        return;
      const l = {
        time: s(),
        title: fs(r),
        data: hs({ store: j(t.$id) }, ps(i)),
        groupId: J
      };
      r === F.patchFunction ? l.subtitle = "⤵️" : r === F.patchObject ? l.subtitle = "🧩" : i && !Array.isArray(i) && (l.subtitle = i.type), i && (l.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: i
        }
      }), n.addTimelineEvent({
        layerId: K,
        event: l
      });
    }, { detached: !0, flush: "sync" });
    const o = t._hotUpdate;
    t._hotUpdate = X((i) => {
      o(i), n.addTimelineEvent({
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
      }), n.notifyComponentUpdate(), n.sendInspectorTree(N), n.sendInspectorState(N);
    });
    const { $dispose: a } = t;
    t.$dispose = () => {
      a(), n.notifyComponentUpdate(), n.sendInspectorTree(N), n.sendInspectorState(N), n.getSettings().logStoreChanges && $(`Disposed "${t.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree(N), n.sendInspectorState(N), n.getSettings().logStoreChanges && $(`"${t.$id}" store installed 🆕`);
  });
}
let Ae = 0, J;
function Kt(e, t, n) {
  const s = t.reduce((o, a) => (o[a] = ft(e)[a], o), {});
  for (const o in s)
    e[o] = function() {
      const a = Ae, i = n ? new Proxy(e, {
        get(...c) {
          return J = a, Reflect.get(...c);
        },
        set(...c) {
          return J = a, Reflect.set(...c);
        }
      }) : e;
      J = a;
      const r = s[o].apply(i, arguments);
      return J = void 0, r;
    };
}
function _s({ app: e, store: t, options: n }) {
  if (!t.$id.startsWith("__hot:")) {
    if (t._isOptionsAPI = !!n.state, !t._p._testing) {
      Kt(t, Object.keys(n.actions), t._isOptionsAPI);
      const s = t._hotUpdate;
      ft(t)._hotUpdate = function(o) {
        s.apply(this, arguments), Kt(t, Object.keys(o._hmrPayload.actions), !!t._isOptionsAPI);
      };
    }
    gs(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      t
    );
  }
}
function bs() {
  const e = ce(!0), t = e.run(() => S({}));
  let n = [], s = [];
  const o = X({
    install(a) {
      mt(o), o._a = a, a.provide(he, o), a.config.globalProperties.$pinia = o, process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Z && ms(a, o), s.forEach((i) => n.push(i)), s = [];
    },
    use(a) {
      return !this._a && !de ? s.push(a) : n.push(a), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && typeof Proxy < "u" && o.use(_s), o;
}
function Te(e, t) {
  for (const n in t) {
    const s = t[n];
    if (!(n in e))
      continue;
    const o = e[n];
    tt(o) && tt(s) && !ht(s) && !Ht(s) ? e[n] = Te(o, s) : e[n] = s;
  }
  return e;
}
const Se = () => {
};
function Xt(e, t, n, s = Se) {
  e.push(t);
  const o = () => {
    const a = e.indexOf(t);
    a > -1 && (e.splice(a, 1), s());
  };
  return !n && ze() && He(o), o;
}
function ot(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const vs = (e) => e(), Zt = Symbol(), $t = Symbol();
function qt(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, s) => e.set(s, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const s = t[n], o = e[n];
    tt(o) && tt(s) && e.hasOwnProperty(n) && !ht(s) && !Ht(s) ? e[n] = qt(o, s) : e[n] = s;
  }
  return e;
}
const ys = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function ws(e) {
  return !tt(e) || !e.hasOwnProperty(ys);
}
const { assign: L } = Object;
function te(e) {
  return !!(ht(e) && e.effect);
}
function ee(e, t, n, s) {
  const { state: o, actions: a, getters: i } = t, r = n.state.value[e];
  let c;
  function l() {
    !r && (process.env.NODE_ENV === "production" || !s) && (n.state.value[e] = o ? o() : {});
    const f = process.env.NODE_ENV !== "production" && s ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Ot(S(o ? o() : {}).value)
    ) : Ot(n.state.value[e]);
    return L(f, a, Object.keys(i || {}).reduce((d, b) => (process.env.NODE_ENV !== "production" && b in f && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${b}" in store "${e}".`), d[b] = X(Ft(() => {
      mt(n);
      const A = n._s.get(e);
      return i[b].call(A, A);
    })), d), {}));
  }
  return c = Pt(e, l, t, n, s, !0), c;
}
function Pt(e, t, n = {}, s, o, a) {
  let i;
  const r = L({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !s._e.active)
    throw new Error("Pinia destroyed");
  const c = { deep: !0 };
  process.env.NODE_ENV !== "production" && !de && (c.onTrigger = (h) => {
    l ? A = h : l == !1 && !_._hotUpdating && (Array.isArray(A) ? A.push(h) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let l, f, d = [], b = [], A;
  const Q = s.state.value[e];
  !a && !Q && (process.env.NODE_ENV === "production" || !o) && (s.state.value[e] = {});
  const ct = S({});
  let _t;
  function bt(h) {
    let p;
    l = f = !1, process.env.NODE_ENV !== "production" && (A = []), typeof h == "function" ? (h(s.state.value[e]), p = {
      type: F.patchFunction,
      storeId: e,
      events: A
    }) : (qt(s.state.value[e], h), p = {
      type: F.patchObject,
      payload: h,
      storeId: e,
      events: A
    });
    const T = _t = Symbol();
    Wt().then(() => {
      _t === T && (l = !0);
    }), f = !0, ot(d, p, s.state.value[e]);
  }
  const C = a ? function() {
    const { state: p } = n, T = p ? p() : {};
    this.$patch((q) => {
      L(q, T);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : Se
  );
  function D() {
    i.stop(), d = [], b = [], s._s.delete(e);
  }
  const x = (h, p = "") => {
    if (Zt in h)
      return h[$t] = p, h;
    const T = function() {
      mt(s);
      const q = Array.from(arguments), lt = [], Et = [];
      function Ve(P) {
        lt.push(P);
      }
      function qe(P) {
        Et.push(P);
      }
      ot(b, {
        args: q,
        name: T[$t],
        store: _,
        after: Ve,
        onError: qe
      });
      let ut;
      try {
        ut = h.apply(this && this.$id === e ? this : _, q);
      } catch (P) {
        throw ot(Et, P), P;
      }
      return ut instanceof Promise ? ut.then((P) => (ot(lt, P), P)).catch((P) => (ot(Et, P), Promise.reject(P))) : (ot(lt, ut), ut);
    };
    return T[Zt] = !0, T[$t] = p, T;
  }, R = /* @__PURE__ */ X({
    actions: {},
    getters: {},
    state: [],
    hotState: ct
  }), st = {
    _p: s,
    // _s: scope,
    $id: e,
    $onAction: Xt.bind(null, b),
    $patch: bt,
    $reset: C,
    $subscribe(h, p = {}) {
      const T = Xt(d, h, p.detached, () => q()), q = i.run(() => zt(() => s.state.value[e], (lt) => {
        (p.flush === "sync" ? f : l) && h({
          storeId: e,
          type: F.direct,
          events: A
        }, lt);
      }, L({}, c, p)));
      return T;
    },
    $dispose: D
  }, _ = je(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Z ? L(
    {
      _hmrPayload: R,
      _customProperties: X(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    st
    // must be added later
    // setupStore
  ) : st);
  s._s.set(e, _);
  const W = (s._a && s._a.runWithContext || vs)(() => s._e.run(() => (i = ce()).run(() => t({ action: x }))));
  for (const h in W) {
    const p = W[h];
    if (ht(p) && !te(p) || Ht(p))
      process.env.NODE_ENV !== "production" && o ? vt(ct.value, h, Ct(W, h)) : a || (Q && ws(p) && (ht(p) ? p.value = Q[h] : qt(p, Q[h])), s.state.value[e][h] = p), process.env.NODE_ENV !== "production" && R.state.push(h);
    else if (typeof p == "function") {
      const T = process.env.NODE_ENV !== "production" && o ? p : x(p, h);
      W[h] = T, process.env.NODE_ENV !== "production" && (R.actions[h] = p), r.actions[h] = p;
    } else process.env.NODE_ENV !== "production" && te(p) && (R.getters[h] = a ? (
      // @ts-expect-error
      n.getters[h]
    ) : p, Z && (W._getters || // @ts-expect-error: same
    (W._getters = X([]))).push(h));
  }
  if (L(_, W), L(ft(_), W), Object.defineProperty(_, "$state", {
    get: () => process.env.NODE_ENV !== "production" && o ? ct.value : s.state.value[e],
    set: (h) => {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error("cannot set hotState");
      bt((p) => {
        L(p, h);
      });
    }
  }), process.env.NODE_ENV !== "production" && (_._hotUpdate = X((h) => {
    _._hotUpdating = !0, h._hmrPayload.state.forEach((p) => {
      if (p in _.$state) {
        const T = h.$state[p], q = _.$state[p];
        typeof T == "object" && tt(T) && tt(q) ? Te(T, q) : h.$state[p] = q;
      }
      vt(_, p, Ct(h.$state, p));
    }), Object.keys(_.$state).forEach((p) => {
      p in h.$state || Dt(_, p);
    }), l = !1, f = !1, s.state.value[e] = Ct(h._hmrPayload, "hotState"), f = !0, Wt().then(() => {
      l = !0;
    });
    for (const p in h._hmrPayload.actions) {
      const T = h[p];
      vt(_, p, x(T, p));
    }
    for (const p in h._hmrPayload.getters) {
      const T = h._hmrPayload.getters[p], q = a ? (
        // special handling of options api
        Ft(() => (mt(s), T.call(_, _)))
      ) : T;
      vt(_, p, q);
    }
    Object.keys(_._hmrPayload.getters).forEach((p) => {
      p in h._hmrPayload.getters || Dt(_, p);
    }), Object.keys(_._hmrPayload.actions).forEach((p) => {
      p in h._hmrPayload.actions || Dt(_, p);
    }), _._hmrPayload = h._hmrPayload, _._getters = h._getters, _._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Z) {
    const h = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
      Object.defineProperty(_, p, L({ value: _[p] }, h));
    });
  }
  return s._p.forEach((h) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Z) {
      const p = i.run(() => h({
        store: _,
        app: s._a,
        pinia: s,
        options: r
      }));
      Object.keys(p || {}).forEach((T) => _._customProperties.add(T)), L(_, p);
    } else
      L(_, i.run(() => h({
        store: _,
        app: s._a,
        pinia: s,
        options: r
      })));
  }), process.env.NODE_ENV !== "production" && _.$state && typeof _.$state == "object" && typeof _.$state.constructor == "function" && !_.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${_.$id}".`), Q && a && n.hydrate && n.hydrate(_.$state, Q), l = !0, f = !0, _;
}
// @__NO_SIDE_EFFECTS__
function As(e, t, n) {
  let s, o;
  const a = typeof t == "function";
  s = e, o = a ? n : t;
  function i(r, c) {
    const l = Ie();
    if (r = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && pt && pt._testing ? null : r) || (l ? jt(he, null) : null), r && mt(r), process.env.NODE_ENV !== "production" && !pt)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    r = pt, r._s.has(s) || (a ? Pt(s, t, o, r) : ee(s, o, r), process.env.NODE_ENV !== "production" && (i._pinia = r));
    const f = r._s.get(s);
    if (process.env.NODE_ENV !== "production" && c) {
      const d = "__hot:" + s, b = a ? Pt(d, t, o, r, !0) : ee(d, L({}, o), r, !0);
      c._hotUpdate(b), delete r.state.value[d], r._s.delete(d);
    }
    if (process.env.NODE_ENV !== "production" && Z) {
      const d = Re();
      if (d && d.proxy && // avoid adding stores that are just built for hot module replacement
      !c) {
        const b = d.proxy, A = "_pStores" in b ? b._pStores : b._pStores = {};
        A[s] = f;
      }
    }
    return f;
  }
  return i.$id = s, i;
}
const Ts = ["id", "checked"], Ss = ["for", "innerHTML"], xs = /* @__PURE__ */ V({
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
    return (o, a) => (g(), w(B, null, [
      (g(), w("input", {
        id: "option-" + o.optionKey,
        key: o.optionKey,
        "test-id": "radio_options",
        type: "radio",
        name: "options",
        checked: o.checked,
        class: Y(o.submitted && "ignore-hover")
      }, null, 10, Ts)),
      (g(), w("label", {
        key: o.optionKey,
        for: "option-" + o.optionKey,
        class: Y(o.submitted ? "mcq-option-label ignore-hover" : "mcq-option-label"),
        onClick: a[0] || (a[0] = (i) => s()),
        innerHTML: o.option.optionValue
      }, null, 10, Ss))
    ], 64));
  }
}), z = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, o] of t)
    n[s] = o;
  return n;
}, Es = /* @__PURE__ */ z(xs, [["__scopeId", "data-v-fdbfedc6"]]), Cs = ["disabled"], Ds = /* @__PURE__ */ V({
  __name: "MCQButton",
  props: {
    submitted: { type: Boolean },
    selectedOption: {},
    hideSkip: { type: Boolean }
  },
  emits: ["submitAnswer", "nextQuestion", "skipQuestion"],
  setup(e, { emit: t }) {
    const n = S("skip"), s = S("Skip"), o = t, a = (c, l) => {
      !c && l ? i("next", "Next", "submitAnswer") : c && l ? i("skip", "Skip", "nextQuestion") : !c && !l && i("skip", "Skip", "skipQuestion");
    }, i = (c, l, f) => {
      n.value = c, s.value = l, o(f);
    }, r = (c, l) => c && l ? { class: "next", text: "Next" } : !c && l ? { class: "submit", text: "Submit" } : { class: n.value, text: s.value };
    return (c, l) => (g(), w("div", null, [
      m("button", {
        disabled: c.hideSkip && r(c.submitted, c.selectedOption).class === "skip",
        class: Y(["mcq-button", r(c.submitted, c.selectedOption).class]),
        onClick: l[0] || (l[0] = (f) => a(c.submitted, c.selectedOption))
      }, k(r(c.submitted, c.selectedOption).text), 11, Cs)
    ]));
  }
}), $s = /* @__PURE__ */ z(Ds, [["__scopeId", "data-v-847b8dd5"]]), ks = /* @__PURE__ */ V({
  __name: "NextButton",
  props: {
    buttonName: {}
  },
  emits: ["nextQuestion", "prevQuestion"],
  setup(e, { emit: t }) {
    const n = t, s = () => {
      e.buttonName !== "←" ? o("nextQuestion") : o("prevQuestion");
    }, o = (a) => {
      n(a);
    };
    return (a, i) => (g(), w("div", null, [
      m("button", {
        class: Y(a.buttonName === "Submit" ? "submit_btn" : "mcq-button"),
        onClick: i[0] || (i[0] = (r) => s())
      }, k(a.buttonName), 3)
    ]));
  }
}), se = /* @__PURE__ */ z(ks, [["__scopeId", "data-v-8be7f61e"]]);
var y = ((e) => (e[e.New = 0] = "New", e[e.Learning = 1] = "Learning", e[e.Review = 2] = "Review", e[e.Relearning = 3] = "Relearning", e))(y || {}), u = ((e) => (e[e.Manual = 0] = "Manual", e[e.Again = 1] = "Again", e[e.Hard = 2] = "Hard", e[e.Good = 3] = "Good", e[e.Easy = 4] = "Easy", e))(u || {});
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
      const n = t.charAt(0).toUpperCase(), s = t.slice(1).toLowerCase(), o = y[`${n}${s}`];
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
const Ns = 0.9, Qs = 36500, Ms = [0.4072, 1.1829, 3.1262, 15.4722, 7.2102, 0.5316, 1.0651, 0.0234, 1.616, 0.1544, 1.0824, 1.9813, 0.0953, 0.2975, 2.2042, 0.2407, 2.9466, 0.5034, 0.6567], Os = !1, Vs = !0, Lt = (e) => {
  let t = Ms;
  return e != null && e.w && (e.w.length === 19 ? t = e == null ? void 0 : e.w : e.w.length === 17 && (t = e == null ? void 0 : e.w.concat([0, 0]), console.debug("[FSRS V5]auto fill w to 19 length"))), { request_retention: (e == null ? void 0 : e.request_retention) || Ns, maximum_interval: (e == null ? void 0 : e.maximum_interval) || Qs, w: t, enable_fuzz: (e == null ? void 0 : e.enable_fuzz) ?? Os, enable_short_term: (e == null ? void 0 : e.enable_short_term) ?? Vs };
};
Date.prototype.scheduler = function(e, t) {
  return xe(this, e, t);
}, Date.prototype.diff = function(e, t) {
  return qs(this, e, t);
}, Date.prototype.format = function() {
  return Ps(this);
}, Date.prototype.dueFormat = function(e, t, n) {
  return Ls(this, e, t, n);
};
function xe(e, t, n) {
  return new Date(n ? et(e).getTime() + t * 24 * 60 * 60 * 1e3 : et(e).getTime() + t * 60 * 1e3);
}
function qs(e, t, n) {
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
function Ps(e) {
  const t = et(e), n = t.getFullYear(), s = t.getMonth() + 1, o = t.getDate(), a = t.getHours(), i = t.getMinutes(), r = t.getSeconds();
  return `${n}-${dt(s)}-${dt(o)} ${dt(a)}:${dt(i)}:${dt(r)}`;
}
function dt(e) {
  return e < 10 ? `0${e}` : `${e}`;
}
const kt = [60, 60, 24, 31, 12], Nt = ["second", "min", "hour", "day", "month", "year"];
function Ls(e, t, n, s = Nt) {
  e = et(e), t = et(t), s.length !== Nt.length && (s = Nt);
  let o = e.getTime() - t.getTime(), a;
  for (o /= 1e3, a = 0; a < kt.length && !(o < kt[a]); a++) o /= kt[a];
  return `${Math.floor(o)}${n ? s[a] : ""}`;
}
function et(e) {
  return v.time(e);
}
const Is = [u.Again, u.Hard, u.Good, u.Easy], Rs = [{ start: 2.5, end: 7, factor: 0.15 }, { start: 7, end: 20, factor: 0.1 }, { start: 20, end: 1 / 0, factor: 0.05 }];
function js(e, t, n) {
  let s = 1;
  for (const i of Rs) s += i.factor * Math.max(Math.min(e, i.end) - i.start, 0);
  e = Math.min(e, n);
  let o = Math.max(2, Math.round(e - s));
  const a = Math.min(Math.round(e + s), n);
  return e > t && (o = Math.max(o, t + 1)), o = Math.min(o, a), { min_ivl: o, max_ivl: a };
}
function Qt(e, t, n) {
  return Math.min(Math.max(e, t), n);
}
class zs {
  constructor(t) {
    M(this, "c");
    M(this, "s0");
    M(this, "s1");
    M(this, "s2");
    const n = Hs();
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
function Hs() {
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
function Fs(e) {
  const t = new zs(e), n = () => t.next();
  return n.int32 = () => t.next() * 4294967296 | 0, n.double = () => n() + (n() * 2097152 | 0) * 11102230246251565e-32, n.state = () => t.state, n.importState = (s) => (t.state = s, n), n;
}
const ne = -0.5, oe = 19 / 81;
class Us {
  constructor(t) {
    M(this, "param");
    M(this, "intervalModifier");
    M(this, "_seed");
    this.param = new Proxy(Lt(t), this.params_handler_proxy()), this.intervalModifier = this.calculate_interval_modifier(this.param.request_retention);
  }
  get interval_modifier() {
    return this.intervalModifier;
  }
  set seed(t) {
    this._seed = t;
  }
  calculate_interval_modifier(t) {
    if (t <= 0 || t > 1) throw new Error("Requested retention rate should be in the range (0,1]");
    return +((Math.pow(t, 1 / ne) - 1) / oe).toFixed(8);
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
    const n = Lt(t);
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
    const o = Fs(this._seed)(), { min_ivl: a, max_ivl: i } = js(t, n, this.param.maximum_interval);
    return Math.floor(o * (i - a + 1) + a);
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
    const a = u.Hard === o ? this.param.w[15] : 1, i = u.Easy === o ? this.param.w[16] : 1;
    return +Qt(n * (1 + Math.exp(this.param.w[8]) * (11 - t) * Math.pow(n, -this.param.w[9]) * (Math.exp((1 - s) * this.param.w[10]) - 1) * a * i), 0.01, 36500).toFixed(8);
  }
  next_forget_stability(t, n, s) {
    return +Qt(this.param.w[11] * Math.pow(t, -this.param.w[12]) * (Math.pow(n + 1, this.param.w[13]) - 1) * Math.exp((1 - s) * this.param.w[14]), 0.01, 36500).toFixed(8);
  }
  next_short_term_stability(t, n) {
    return +Qt(t * Math.exp(this.param.w[17] * (n - 3 + this.param.w[18])), 0.01, 36500).toFixed(8);
  }
  forgetting_curve(t, n) {
    return +Math.pow(1 + oe * t / n, ne).toFixed(8);
  }
}
class Ee {
  constructor(t, n, s) {
    M(this, "last");
    M(this, "current");
    M(this, "review_time");
    M(this, "next", /* @__PURE__ */ new Map());
    M(this, "algorithm");
    this.algorithm = s, this.last = v.card(t), this.current = v.card(t), this.review_time = v.time(n), this.init();
  }
  init() {
    const { state: t, last_review: n } = this.current;
    let s = 0;
    t !== y.New && n && (s = this.review_time.diff(n, "days")), this.current.last_review = this.review_time, this.current.elapsed_days = s, this.current.reps += 1, this.initSeed();
  }
  preview() {
    return { [u.Again]: this.review(u.Again), [u.Hard]: this.review(u.Hard), [u.Good]: this.review(u.Good), [u.Easy]: this.review(u.Easy), [Symbol.iterator]: this.previewIterator.bind(this) };
  }
  *previewIterator() {
    for (const t of Is) yield this.review(t);
  }
  review(t) {
    const { state: n } = this.last;
    let s;
    switch (n) {
      case y.New:
        s = this.newState(t);
        break;
      case y.Learning:
      case y.Relearning:
        s = this.learningState(t);
        break;
      case y.Review:
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
class ie extends Ee {
  newState(t) {
    const n = this.next.get(t);
    if (n) return n;
    const s = v.card(this.current);
    switch (s.difficulty = this.algorithm.init_difficulty(t), s.stability = this.algorithm.init_stability(t), t) {
      case u.Again:
        s.scheduled_days = 0, s.due = this.review_time.scheduler(1), s.state = y.Learning;
        break;
      case u.Hard:
        s.scheduled_days = 0, s.due = this.review_time.scheduler(5), s.state = y.Learning;
        break;
      case u.Good:
        s.scheduled_days = 0, s.due = this.review_time.scheduler(10), s.state = y.Learning;
        break;
      case u.Easy: {
        const a = this.algorithm.next_interval(s.stability, this.current.elapsed_days, this.algorithm.parameters.enable_fuzz);
        s.scheduled_days = a, s.due = this.review_time.scheduler(a, !0), s.state = y.Review;
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
    const { state: s, difficulty: o, stability: a } = this.last, i = v.card(this.current), r = this.current.elapsed_days;
    switch (i.difficulty = this.algorithm.next_difficulty(o, t), i.stability = this.algorithm.next_short_term_stability(a, t), t) {
      case u.Again: {
        i.scheduled_days = 0, i.due = this.review_time.scheduler(5, !1), i.state = s;
        break;
      }
      case u.Hard: {
        i.scheduled_days = 0, i.due = this.review_time.scheduler(10), i.state = s;
        break;
      }
      case u.Good: {
        const l = this.algorithm.next_interval(i.stability, r);
        i.scheduled_days = l, i.due = this.review_time.scheduler(l, !0), i.state = y.Review;
        break;
      }
      case u.Easy: {
        const l = this.algorithm.next_short_term_stability(a, u.Good), f = this.algorithm.next_interval(l, r), d = Math.max(this.algorithm.next_interval(i.stability, r), f + 1);
        i.scheduled_days = d, i.due = this.review_time.scheduler(d, !0), i.state = y.Review;
        break;
      }
      default:
        throw new Error("Invalid grade");
    }
    const c = { card: i, log: this.buildLog(t) };
    return this.next.set(t, c), c;
  }
  reviewState(t) {
    const n = this.next.get(t);
    if (n) return n;
    const s = this.current.elapsed_days, { difficulty: o, stability: a } = this.last, i = this.algorithm.forgetting_curve(s, a), r = v.card(this.current), c = v.card(this.current), l = v.card(this.current), f = v.card(this.current);
    this.next_ds(r, c, l, f, o, a, i), this.next_interval(r, c, l, f, s), this.next_state(r, c, l, f), r.lapses += 1;
    const d = { card: r, log: this.buildLog(u.Again) }, b = { card: c, log: super.buildLog(u.Hard) }, A = { card: l, log: super.buildLog(u.Good) }, Q = { card: f, log: super.buildLog(u.Easy) };
    return this.next.set(u.Again, d), this.next.set(u.Hard, b), this.next.set(u.Good, A), this.next.set(u.Easy, Q), this.next.get(t);
  }
  next_ds(t, n, s, o, a, i, r) {
    t.difficulty = this.algorithm.next_difficulty(a, u.Again), t.stability = this.algorithm.next_forget_stability(a, i, r), n.difficulty = this.algorithm.next_difficulty(a, u.Hard), n.stability = this.algorithm.next_recall_stability(a, i, r, u.Hard), s.difficulty = this.algorithm.next_difficulty(a, u.Good), s.stability = this.algorithm.next_recall_stability(a, i, r, u.Good), o.difficulty = this.algorithm.next_difficulty(a, u.Easy), o.stability = this.algorithm.next_recall_stability(a, i, r, u.Easy);
  }
  next_interval(t, n, s, o, a) {
    let i, r;
    i = this.algorithm.next_interval(n.stability, a), r = this.algorithm.next_interval(s.stability, a), i = Math.min(i, r), r = Math.max(r, i + 1);
    const c = Math.max(this.algorithm.next_interval(o.stability, a), r + 1);
    t.scheduled_days = 0, t.due = this.review_time.scheduler(5), n.scheduled_days = i, n.due = this.review_time.scheduler(i, !0), s.scheduled_days = r, s.due = this.review_time.scheduler(r, !0), o.scheduled_days = c, o.due = this.review_time.scheduler(c, !0);
  }
  next_state(t, n, s, o) {
    t.state = y.Relearning, n.state = y.Review, s.state = y.Review, o.state = y.Review;
  }
}
class ae extends Ee {
  newState(t) {
    const n = this.next.get(t);
    if (n) return n;
    this.current.scheduled_days = 0, this.current.elapsed_days = 0;
    const s = v.card(this.current), o = v.card(this.current), a = v.card(this.current), i = v.card(this.current);
    return this.init_ds(s, o, a, i), this.next_interval(s, o, a, i, 0), this.next_state(s, o, a, i), this.update_next(s, o, a, i), this.next.get(t);
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
    const s = this.current.elapsed_days, { difficulty: o, stability: a } = this.last, i = this.algorithm.forgetting_curve(s, a), r = v.card(this.current), c = v.card(this.current), l = v.card(this.current), f = v.card(this.current);
    return this.next_ds(r, c, l, f, o, a, i), this.next_interval(r, c, l, f, s), this.next_state(r, c, l, f), r.lapses += 1, this.update_next(r, c, l, f), this.next.get(t);
  }
  next_ds(t, n, s, o, a, i, r) {
    t.difficulty = this.algorithm.next_difficulty(a, u.Again), t.stability = this.algorithm.next_forget_stability(a, i, r), n.difficulty = this.algorithm.next_difficulty(a, u.Hard), n.stability = this.algorithm.next_recall_stability(a, i, r, u.Hard), s.difficulty = this.algorithm.next_difficulty(a, u.Good), s.stability = this.algorithm.next_recall_stability(a, i, r, u.Good), o.difficulty = this.algorithm.next_difficulty(a, u.Easy), o.stability = this.algorithm.next_recall_stability(a, i, r, u.Easy);
  }
  next_interval(t, n, s, o, a) {
    let i, r, c, l;
    i = this.algorithm.next_interval(t.stability, a), r = this.algorithm.next_interval(n.stability, a), c = this.algorithm.next_interval(s.stability, a), l = this.algorithm.next_interval(o.stability, a), i = Math.min(i, r), r = Math.max(r, i + 1), c = Math.max(c, r + 1), l = Math.max(l, c + 1), t.scheduled_days = i, t.due = this.review_time.scheduler(i, !0), n.scheduled_days = r, n.due = this.review_time.scheduler(r, !0), s.scheduled_days = c, s.due = this.review_time.scheduler(c, !0), o.scheduled_days = l, o.due = this.review_time.scheduler(l, !0);
  }
  next_state(t, n, s, o) {
    t.state = y.Review, n.state = y.Review, s.state = y.Review, o.state = y.Review;
  }
  update_next(t, n, s, o) {
    const a = { card: t, log: this.buildLog(u.Again) }, i = { card: n, log: super.buildLog(u.Hard) }, r = { card: s, log: super.buildLog(u.Good) }, c = { card: o, log: super.buildLog(u.Easy) };
    this.next.set(u.Again, a), this.next.set(u.Hard, i), this.next.set(u.Good, r), this.next.set(u.Easy, c);
  }
}
class Gs extends Us {
  constructor(n) {
    super(n);
    M(this, "Scheduler");
    const { enable_short_term: s } = this.parameters;
    this.Scheduler = s ? ie : ae;
  }
  params_handler_proxy() {
    const n = this;
    return { set: function(s, o, a) {
      return o === "request_retention" && Number.isFinite(a) ? n.intervalModifier = n.calculate_interval_modifier(Number(a)) : o === "enable_short_term" && (n.Scheduler = a === !0 ? ie : ae), Reflect.set(s, o, a), !0;
    } };
  }
  repeat(n, s, o) {
    const a = this.Scheduler, i = new a(n, s, this).preview();
    return o && typeof o == "function" ? o(i) : i;
  }
  next(n, s, o, a) {
    const i = this.Scheduler, r = new i(n, s, this), c = v.rating(o);
    if (c === u.Manual) throw new Error("Cannot review a manual rating");
    const l = r.review(c);
    return a && typeof a == "function" ? a(l) : l;
  }
  get_retrievability(n, s, o = !0) {
    const a = v.card(n);
    s = s ? v.time(s) : /* @__PURE__ */ new Date();
    const i = a.state !== y.New ? Math.max(s.diff(a.last_review, "days"), 0) : 0, r = a.state !== y.New ? this.forgetting_curve(i, +a.stability.toFixed(8)) : 0;
    return o ? `${(r * 100).toFixed(2)}%` : r;
  }
  rollback(n, s, o) {
    const a = v.card(n), i = v.review_log(s);
    if (i.rating === u.Manual) throw new Error("Cannot rollback a manual rating");
    let r, c, l;
    switch (i.state) {
      case y.New:
        r = i.due, c = void 0, l = 0;
        break;
      case y.Learning:
      case y.Relearning:
      case y.Review:
        r = i.review, c = i.due, l = a.lapses - (i.rating === u.Again && i.state === y.Review ? 1 : 0);
        break;
    }
    const f = { ...a, due: r, stability: i.stability, difficulty: i.difficulty, elapsed_days: i.last_elapsed_days, scheduled_days: i.scheduled_days, reps: Math.max(0, a.reps - 1), lapses: Math.max(0, l), state: i.state, last_review: c };
    return o && typeof o == "function" ? o(f) : f;
  }
  forget(n, s, o = !1, a) {
    const i = v.card(n);
    s = v.time(s);
    const r = i.state === y.New ? 0 : s.diff(i.last_review, "days"), c = { rating: u.Manual, state: i.state, due: i.due, stability: i.stability, difficulty: i.difficulty, elapsed_days: 0, last_elapsed_days: i.elapsed_days, scheduled_days: r, review: s }, l = { card: { ...i, due: s, stability: 0, difficulty: 0, elapsed_days: 0, scheduled_days: 0, reps: o ? 0 : i.reps, lapses: o ? 0 : i.lapses, state: y.New, last_review: i.last_review }, log: c };
    return a && typeof a == "function" ? a(l) : l;
  }
  reschedule(n, s = {}) {
    if (!Array.isArray(n)) throw new Error("cards must be an array");
    const o = [];
    for (const a of n) {
      if (v.state(a.state) !== y.Review || !a.last_review) continue;
      const i = Math.floor(a.scheduled_days), r = this.next_interval(+a.stability.toFixed(2), Math.round(a.elapsed_days), s.enable_fuzz ?? !0);
      if (r === i || r === 0) continue;
      const c = { ...a };
      c.scheduled_days = r;
      const l = xe(c.last_review, r, !0);
      s.dateHandler && typeof s.dateHandler == "function" ? c.due = s.dateHandler(l) : c.due = l, o.push(c);
    }
    return o;
  }
}
const Bs = (e) => new Gs(e || {}), Ws = Lt({ enable_fuzz: !0 }), Js = Bs(Ws), Ys = (e) => ({
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
function Ks(e) {
  const t = /* @__PURE__ */ new Date(), n = Ys(e), s = Js.repeat(n, t), o = e.correctAttempts / (e.attempts + 0.1) > 0.5 ? u.Good : u.Again, { card: a } = s[o];
  return {
    ...a,
    reviewDue: a.due
  };
}
const Xs = (e) => e.map((t) => {
  const n = Ks(t);
  return {
    ...t,
    reviewDue: n.reviewDue
  };
}), Zs = (e) => Xs(e).sort(
  (t, n) => t.reviewDue.getTime() - n.reviewDue.getTime()
), tn = (e) => {
  for (let t = e.length - 1; t > 0; t--) {
    const n = Math.floor(Math.random() * (t + 1));
    [e[t], e[n]] = [e[n], e[t]];
  }
  return e;
}, en = (e, t) => {
  const n = Zs(t);
  return tn(n.slice(0, e));
};
function It(e) {
  const t = e.reduce(
    (s, o) => (Object.keys(o).forEach((a) => {
      a.trim() !== "" && (s[a] || (s[a] = /* @__PURE__ */ new Set()), o[a].forEach((r) => s[a].add(r)));
    }), s),
    {}
  );
  return Object.keys(t).reduce(
    (s, o) => (s[o] = [...t[o]], s),
    {}
  );
}
function Bt(e, t) {
  return e.filter((n) => Object.keys(t).every((s) => {
    if (!t[s].length)
      return !0;
    const o = n.tags[s];
    if (o)
      return o.some((a) => t[s].includes(a));
  }));
}
function sn(e, t, n) {
  return e.filter((s) => {
    const o = s.tags[n];
    return o && o.includes(t);
  });
}
function nn(e, t, n) {
  const s = e[t].question.optionsList;
  for (let o = 0; o < s.length; o++)
    if (s[o].optionValue === n)
      return o;
}
const Ce = (e, t) => t.findIndex((n) => {
  var s;
  return ((s = n.question._id) == null ? void 0 : s.$oid) === e;
}), U = /* @__PURE__ */ As("questionsQueue", {
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
      return Bt(e, this.selectedTags).length;
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
      const s = Ce(e, this.quizStats);
      if (this.quizStats[s]) {
        if (n !== void 0) {
          if (this.quizStats[s][t]++, n === "-1") {
            this.quizStats[s].selectedValue = "Reached Time Limit";
            return;
          }
          const o = this.quizStats[s].question.optionsList.map((a) => a.optionCorrect).indexOf(!0);
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
}), on = ["innerHTML"], an = { class: "mcq-list" }, rn = ["onClick"], cn = { class: "next-prev-question" }, ln = /* @__PURE__ */ V({
  __name: "MCQQuestion",
  props: {
    _id: {},
    statement: {},
    optionsList: {}
  },
  emits: ["nextQuestion", "skipQuestion", "prevQuestion"],
  setup(e, { emit: t }) {
    const n = U(), s = S(null), o = S(!1), a = t, i = S(n.getRemainingQuestions()), r = () => {
      o.value = !0;
    }, c = () => {
      s.value = null, a("nextQuestion");
    }, l = () => {
      b(), i.value = n.getRemainingQuestions(), a("nextQuestion");
    }, f = () => {
      b(), a("skipQuestion");
    }, d = (C) => n.incrementStat(
      C.$oid,
      "attempts",
      s.value ?? void 0
    ), b = () => {
      o.value = !1, s.value = null;
    }, A = () => {
      s.value = null, a("prevQuestion");
    }, Q = (C, D) => {
      o.value || (s.value = s.value === D ? null : D), d(C);
    }, ct = (C, D, x) => n.quizMode === "Timed" ? _t(C, D) : bt(D, x);
    function _t(C, D) {
      const x = Ce(C.$oid, n.quizStats), R = n.quizStats[x].selectedValue, st = nn(
        n.quizStats,
        x,
        R
      );
      return String(st) === D ? (s.value = D, "selected") : "";
    }
    function bt(C, D) {
      const x = D[parseInt(C)], R = s.value === C;
      return o.value ? x.optionCorrect ? "correct ignore-hover" : R ? "wrong ignore-hover" : "ignore-hover" : R ? "selected" : "";
    }
    return (C, D) => (g(), w(B, null, [
      m("div", {
        class: "mcq-statement",
        innerHTML: C.statement
      }, null, 8, on),
      m("div", an, [
        (g(!0), w(B, null, at(Object.entries(C.optionsList), ([x, R]) => (g(), w("div", {
          key: x,
          class: Y(["mcq-option", ct(C._id, x, C.optionsList)]),
          onClick: (st) => Q(C._id, x)
        }, [
          rt(Es, {
            "option-key": x,
            checked: s.value === x,
            option: R,
            submitted: o.value,
            onSelectOption: (st) => Q(C._id, x)
          }, null, 8, ["option-key", "checked", "option", "submitted", "onSelectOption"])
        ], 10, rn))), 128))
      ]),
      E(n).quizMode === "Tutor" ? (g(), H($s, {
        key: 0,
        submitted: o.value,
        "selected-option": s.value,
        "hide-skip": i.value <= 1,
        onSubmitAnswer: r,
        onNextQuestion: D[0] || (D[0] = (x) => l()),
        onSkipQuestion: f
      }, null, 8, ["submitted", "selected-option", "hide-skip"])) : O("", !0),
      m("div", cn, [
        E(n).quizMode === "Timed" ? (g(), H(se, {
          key: 0,
          "button-name": E(n).questionsQueue.length >= 1 ? "→" : "Submit",
          onNextQuestion: D[1] || (D[1] = (x) => c())
        }, null, 8, ["button-name"])) : O("", !0),
        E(n).quizMode === "Timed" && E(n).questionsStack.length > 1 ? (g(), H(se, {
          key: 1,
          "button-name": "←",
          onPrevQuestion: D[2] || (D[2] = (x) => A())
        })) : O("", !0)
      ])
    ], 64));
  }
}), De = /* @__PURE__ */ z(ln, [["__scopeId", "data-v-181a554c"]]), un = { class: "report-container" }, dn = { class: "mcq-report" }, pn = { class: "table-container" }, fn = { class: "question-row" }, hn = ["href", "innerHTML"], mn = { class: "answer-row" }, gn = ["innerHTML"], _n = { class: "answer-row" }, bn = ["innerHTML"], vn = { class: "mcq-result" }, yn = { class: "score" }, wn = /* @__PURE__ */ V({
  __name: "MCQStatus",
  setup(e) {
    const t = jt("$updateQAttemptCallback") ?? Oe, n = U(), s = n.quizStats, o = n.quizStats.length, a = s.filter((c) => c.correct === 1).length, i = (a * 100 / o).toFixed(0);
    return gt(() => {
      try {
        const c = s.filter((l) => l.attempts).map(
          (l) => t(l.question._id.$oid, !!l.correct)
        );
        c.length && Promise.allSettled(c);
      } catch (c) {
        throw console.error("Error updating question attempts", c), c;
      }
    }), (c, l) => (g(), w("div", un, [
      m("div", dn, [
        m("div", pn, [
          m("table", null, [
            l[0] || (l[0] = m("thead", null, [
              m("tr", null, [
                m("th", null, "question"),
                m("th", null, "correct option"),
                m("th", null, "your answer")
              ])
            ], -1)),
            m("tbody", null, [
              (g(!0), w(B, null, at(Object.entries(E(s)), ([f, d]) => (g(), w("tr", {
                key: f,
                class: "quiz-statment"
              }, [
                m("td", fn, [
                  m("a", {
                    href: d.question.link,
                    target: "_blank",
                    innerHTML: d.question.statement
                  }, null, 8, hn)
                ]),
                m("td", mn, [
                  (g(!0), w(B, null, at(Object.entries(
                    d.question.optionsList
                  ), ([b, A]) => (g(), w("span", { key: b }, [
                    A.optionCorrect ? (g(), w("span", {
                      key: 0,
                      innerHTML: A.optionValue
                    }, null, 8, gn)) : O("", !0)
                  ]))), 128))
                ]),
                m("td", _n, [
                  m("span", {
                    class: Y(
                      d.correct === 1 ? "correct-answer" : "wrong-answer"
                    ),
                    innerHTML: d.correct === 1 ? "<span> ✔</span> " : "<span> ✘</span> <span>     </span>" + d.selectedValue
                  }, null, 10, bn)
                ])
              ]))), 128))
            ])
          ])
        ])
      ]),
      m("div", null, [
        m("div", vn, [
          m("span", yn, "⌛ Result: " + k(E(a)) + " out of " + k(E(o)) + " - (" + k(E(i)) + " %)", 1)
        ])
      ])
    ]));
  }
}), $e = /* @__PURE__ */ z(wn, [["__scopeId", "data-v-38adb08e"]]), An = { class: "questions-left-header" }, Tn = /* @__PURE__ */ V({
  __name: "MCQQuiz",
  setup(e) {
    const t = S(), n = U();
    gt(() => {
      o();
    });
    const s = () => {
      n.enqueueQuestion(t.value), t.value = n.dequeueQuestion();
    }, o = () => {
      n.setAnsweredQuestionsNum(), t.value = n.dequeueQuestion();
    }, a = () => window.location.reload();
    return (i, r) => {
      const c = Fe("MCQInfoPanel");
      return g(), w("main", null, [
        rt(c),
        m("h3", An, " Question " + k(E(n).getAnsweredQuestionsNum()) + " out of " + k(E(n).quizStats.length), 1),
        t.value ? (g(), H(De, {
          key: 0,
          statement: t.value.statement,
          "options-list": t.value.optionsList,
          _id: t.value._id,
          onNextQuestion: o,
          onSkipQuestion: s
        }, null, 8, ["statement", "options-list", "_id"])) : O("", !0),
        t.value ? O("", !0) : (g(), H($e, { key: 1 })),
        t.value ? O("", !0) : (g(), w("button", {
          key: 2,
          class: "btn-relocate",
          onClick: a
        }, " End "))
      ]);
    };
  }
}), Sn = /* @__PURE__ */ z(Tn, [["__scopeId", "data-v-edc7c7f1"]]), xn = {
  key: 0,
  class: "time-left-header"
}, En = { class: "questions-left-header" }, Cn = /* @__PURE__ */ V({
  __name: "MCQInfoPanel",
  props: {
    timeLeft: {
      type: Number,
      default: 0
    }
  },
  setup(e) {
    const t = U(), n = (s) => {
      const o = Math.floor(s / 60), a = s % 60;
      return `${o}:${a < 10 ? "0" : ""}${a}`;
    };
    return (s, o) => (g(), w(B, null, [
      e.timeLeft ? (g(), w("h3", xn, " Time left: " + k(n(e.timeLeft)), 1)) : O("", !0),
      m("h3", En, " Question " + k(E(t).questionsStack.length) + " out of " + k(E(t).quizStats.length), 1)
    ], 64));
  }
}), re = 1e3, Dn = "-1", $n = /* @__PURE__ */ V({
  __name: "MCQTimedQuiz",
  setup(e) {
    const t = U(), n = S();
    let s = null, o = null;
    const a = S(t.timeLimit);
    gt(() => {
      r();
    }), le(() => {
      l(), f();
    });
    const i = () => {
      n.value = t.removeFromLastHistory() ?? n.value;
    }, r = () => n.value = t.dequeueQuestion(), c = () => window.location.reload(), l = () => {
      s && clearTimeout(s), o && clearInterval(o);
    }, f = () => {
      a.value = t.timeLimit;
      const b = () => n.value ? a.value ? a.value-- : d() : l();
      o = window.setInterval(b, re), s = window.setTimeout(() => {
      }, t.timeLimit * re);
    }, d = () => {
      var A;
      l();
      const b = (Q) => t.incrementStat(Q, "attempts", Dn);
      for (b(((A = n.value) == null ? void 0 : A._id.$oid) ?? ""); n.value = t.dequeueQuestion(); )
        b(n.value._id.$oid);
      return alert("Time's up! Quiz has ended."), r();
    };
    return (b, A) => (g(), w("main", null, [
      rt(Cn, { "time-left": a.value }, null, 8, ["time-left"]),
      n.value ? (g(), H(De, {
        key: 0,
        statement: n.value.statement,
        "options-list": n.value.optionsList,
        _id: n.value._id,
        onNextQuestion: r,
        onPrevQuestion: i
      }, null, 8, ["statement", "options-list", "_id"])) : O("", !0),
      n.value ? O("", !0) : (g(), H($e, { key: 1 })),
      n.value ? O("", !0) : (g(), w("button", {
        key: 2,
        class: "btn-relocate",
        onClick: c
      }, " End "))
    ]));
  }
}), kn = /* @__PURE__ */ z($n, [["__scopeId", "data-v-4fd74e68"]]), Nn = ["id", "name", "value"], Qn = ["for"], Mn = { class: "question-number" }, On = /* @__PURE__ */ V({
  __name: "FilterCheckbox",
  props: {
    category: {},
    topics: {}
  },
  setup(e) {
    const t = U(), n = (i) => e.category === "course" ? i.toUpperCase() : i, s = Ft(
      () => Object.entries(e.topics).map(([i, r]) => {
        const c = a(r, e.category), l = sn(
          t.allQs,
          r,
          e.category
        ).length.toString();
        return { idx: i, topic: r, num: c, questionamount: l };
      }).filter(({ topic: i }) => i !== void 0)
    ), o = (i) => {
      if (!(i.target instanceof HTMLInputElement))
        return console.error("Trying to click on non-input element");
      const r = i.target.name, c = i.target.value;
      t.modifySelectedTags(i.target.checked, { category: r, topic: c });
    }, a = (i, r) => {
      var d;
      const c = t.getselectedtags();
      if (!c[r] || (d = c[r]) != null && d.includes(
        i
      ))
        return null;
      const l = JSON.parse(
        JSON.stringify(t.getselectedtags())
      );
      l[r].includes(i) || l[r].push(i);
      const f = t.allQs;
      return Bt(
        f,
        l
      ).length.toString();
    };
    return (i, r) => (g(), w("ul", null, [
      (g(!0), w(B, null, at(s.value, ({ idx: c, topic: l, questionamount: f }) => (g(), w("li", {
        key: c,
        class: "filter-options"
      }, [
        m("input", {
          id: `${i.category}-${l}-checkbox`,
          type: "checkbox",
          name: i.category,
          value: l,
          onChange: r[0] || (r[0] = (d) => o(d))
        }, null, 40, Nn),
        m("label", {
          for: `${i.category}-${l}-checkbox`
        }, [
          ue(k(n(l)) + " ", 1),
          m("span", Mn, k(f), 1)
        ], 8, Qn)
      ]))), 128))
    ]));
  }
}), Vn = /* @__PURE__ */ z(On, [["__scopeId", "data-v-345f2833"]]), qn = {
  key: 0,
  class: "filter"
}, Pn = { class: "category-heading" }, Ln = /* @__PURE__ */ V({
  __name: "MCQTagOptions",
  setup(e) {
    const t = S([]), n = U(), s = S({});
    return gt(() => {
      t.value = n.getTagSet(), s.value = It(t.value);
    }), zt(
      () => n.allQs,
      (o, a) => {
        n.setTagSet(), t.value = n.getTagSet(), s.value = It(t.value);
      }
    ), (o, a) => E(n).allQs ? (g(), w("div", qn, [
      (g(!0), w(B, null, at(Object.entries(s.value), ([i, r]) => (g(), w("div", {
        key: i,
        class: "category"
      }, [
        m("h2", Pn, k(i), 1),
        rt(Vn, {
          category: i,
          topics: r
        }, null, 8, ["category", "topics"])
      ]))), 128))
    ])) : O("", !0);
  }
}), In = /* @__PURE__ */ z(Ln, [["__scopeId", "data-v-a8cb9e79"]]), Rn = { for: "optionName" }, jn = ["value"], zn = /* @__PURE__ */ V({
  __name: "DropDownbox",
  props: {
    options: {},
    optionName: {},
    disabled: { type: Boolean }
  },
  setup(e) {
    const t = U(), n = S(0);
    function s(o) {
      const a = o.target;
      a.value && (n.value = parseFloat(a.value) * 60, t.setTimeLimit(n.value));
    }
    return (o, a) => (g(), w("div", {
      class: Y(o.disabled ? "dropdown input-disabled" : "dropdown")
    }, [
      m("label", Rn, k(o.optionName) + ":   ", 1),
      m("select", {
        id: "optionName",
        name: "optionName",
        onChange: s
      }, [
        (g(!0), w(B, null, at(o.options, (i) => (g(), w("option", {
          key: i.value,
          value: i.value
        }, k(i.value) + " " + k(i.unit), 9, jn))), 128))
      ], 32)
    ], 2));
  }
}), Hn = /* @__PURE__ */ z(zn, [["__scopeId", "data-v-5f3ae97a"]]), Fn = { class: "start-page-container" }, Un = { class: "quiz-config-container" }, Gn = { class: "question-config-container" }, Bn = { class: "tag-text" }, Wn = { class: "question-number" }, Jn = { class: "question-amount-container" }, Yn = ["max"], Kn = {
  key: 0,
  class: "show-max-msg"
}, Xn = 3e3, Zn = /* @__PURE__ */ V({
  __name: "StartPage",
  emits: ["start-quiz", "enable-srs"],
  setup(e, { emit: t }) {
    const n = S(1), s = S("Tutor"), o = S(!1), a = S(null), i = t, r = U();
    gt(() => {
      Ue(() => {
        const f = r.getquestionnumber();
        n.value = Math.min(10, f);
      });
    });
    const c = () => {
      i("start-quiz", {
        questionAmount: n.value,
        mode: s.value
      });
    }, l = () => {
      a.value && clearTimeout(a.value), n.value > r.getquestionnumber() && (n.value = r.getquestionnumber(), o.value = !0, a.value = window.setTimeout(() => {
        o.value = !1;
      }, Xn));
    };
    return (f, d) => (g(), w("div", Fn, [
      d[6] || (d[6] = m("h1", null, "VetCloud Smart Quiz", -1)),
      rt(In),
      m("div", Un, [
        m("div", Gn, [
          m("p", Bn, [
            d[2] || (d[2] = ue(" Maximum possible questions: ")),
            m("span", Wn, k(E(r).getquestionnumber()), 1)
          ]),
          m("div", Jn, [
            d[3] || (d[3] = m("label", { for: "question-amount" }, "Select the amount of questions:", -1)),
            Jt(m("input", {
              id: "question-amount",
              "onUpdate:modelValue": d[0] || (d[0] = (b) => n.value = b),
              type: "number",
              placeholder: "Question amount",
              min: "1",
              max: E(r).getquestionnumber(),
              onInput: l
            }, null, 40, Yn), [
              [
                Ge,
                n.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o.value ? (g(), w("p", Kn, " Cannot select more than " + k(E(r).getquestionnumber()) + " questions. ", 1)) : O("", !0),
          m("div", null, [
            d[5] || (d[5] = m("label", { for: "mode-select" }, "Select mode:", -1)),
            Jt(m("select", {
              id: "mode-select",
              "onUpdate:modelValue": d[1] || (d[1] = (b) => s.value = b)
            }, d[4] || (d[4] = [
              m("option", { value: "Tutor" }, "Tutor", -1),
              m("option", { value: "Timed" }, "Timed", -1)
            ]), 512), [
              [Be, s.value]
            ])
          ]),
          rt(Hn, {
            options: [
              { value: 1, label: "Time Option 2", unit: "Min." },
              { value: 1.5, label: "Time Option 1", unit: "Min." }
            ],
            "option-name": "Time per Question",
            class: Y(s.value === "Timed" ? "" : "input-disabled"),
            disabled: s.value !== "Timed"
          }, null, 8, ["class", "disabled"])
        ])
      ]),
      m("button", {
        class: "start-button",
        onClick: c
      }, "Start")
    ]));
  }
}), to = /* @__PURE__ */ z(Zn, [["__scopeId", "data-v-84467fb8"]]), eo = (e) => e.trim().toLowerCase().replace(/_+/g, " "), so = (e) => e.reduce((t, n) => {
  if (!n.includes(":")) return t;
  let [s, o] = n.split(":");
  return [s, o] = [s.trim().toLowerCase(), eo(o)], t[s] ? t[s] = [...t[s], o] : t[s] = [o], t;
}, {}), no = (e) => e.map((t) => ({
  _id: { $oid: t._id.$oid },
  statement: t.statement,
  tags: so(t.tags),
  optionsList: t.optionsList,
  link: t.link,
  attempts: t.attempts,
  correctAttempts: t.correctAttempts,
  lastAttempted: t.lastAttempted
})), ke = { convertQuestions: no }, oo = [
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
], I = {
  isString: (i) => typeof i == "string",
  isObject: (i) => typeof i == "object" && i !== null,
  isBoolean: (i) => typeof i == "boolean",
  isArray: (i, r) => Array.isArray(i) && i.every(r),
  isNumber: (i) => typeof i == "number",
  isFunction: (i) => typeof i == "function"
};
function Rt(e) {
  const t = e.includes(":") && e.split(":").length === 2, n = !e.includes(":") && !e.includes(" ");
  return t || n;
}
function Ne(e, t = !1) {
  return I.isArray(e, I.isString) ? t ? e.every(Rt) : e.some(Rt) : !1;
}
function io(e) {
  return I.isObject(e) && I.isString(e.optionValue) && (e.optionCorrect === void 0 || I.isBoolean(e.optionCorrect));
}
function Qe(e) {
  return I.isObject(e) && I.isObject(e._id) && // Assuming _id is an object with $oid property
  I.isString(e._id.$oid) && I.isString(e.statement) && Ne(e.tags) && // Modified to ensure tags are always checked
  I.isArray(e.optionsList, io) && I.isString(e.link);
}
function ao(e) {
  return I.isArray(e, Qe);
}
const yt = {
  isMCQuestion: Qe,
  isMCQuestionArray: ao,
  validateTags: Ne,
  isTag: Rt
}, ro = (e) => {
  try {
    if (!e)
      throw new Error("No question data found. Please Try again later.");
    return ke.convertQuestions(Me(e));
  } catch (t) {
    return alert(t), [];
  }
}, co = () => oo, lo = () => {
  const e = co();
  return ke.convertQuestions(Me(e));
};
function Me(e) {
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
    let { tags: a } = o;
    if (!a || Array.isArray(a) && !a.length)
      return { ...s, noTags: s.noTags + 1 };
    const i = s.totalTags + a.length;
    if (!yt.validateTags(a, !0)) {
      const r = a.filter((l) => yt.isTag(l)), c = s.invalidTags + a.length - r.length;
      return a = r, { ...s, invalidTags: c, totalTags: i };
    }
    return { ...s, totalTags: i };
  }, t);
  return uo(n, e.length), e;
}
function Mt(e, t) {
  e && console.warn(t, "color: #FF0000");
}
function uo(e, t) {
  const { invalidQs: n, invalidTags: s, noTags: o, totalTags: a } = e;
  Mt(
    n,
    `Invalid Questions Received: %c${n} out of ${t}`
  ), Mt(
    s,
    `Filtering out invalid tags: %c${s} out of ${a}`
  ), Mt(o, `Questions with no tags: %c${o}`);
}
const po = /* @__PURE__ */ V({
  __name: "CrucibleComponent",
  props: {
    level: {
      type: Number,
      default: 5
      // a default value is required for Vue props
    }
  },
  setup(e) {
    const t = e, n = S(0), s = U(), o = S(!1), a = S([]), i = jt("$dataLink"), { level: r } = Ot(t);
    le(async () => {
      if (i) {
        const d = await (async () => (await (await fetch(`${i}?level=${r.value}`)).json()).questions)();
        a.value = ro(d);
      } else
        a.value = lo();
      s.allQs = a.value;
      const l = It(
        a.value.map((f) => f.tags)
      );
      s.setselectedTags(
        Object.keys(l).reduce((f, d) => ({ ...f, [d]: [] }), {})
      ), s.setTagSet();
    });
    const c = ({ questionAmount: l, mode: f }) => {
      const d = s.getselectedtags();
      if (!a.value.length)
        return alert("Trouble fetching questions, please try again later");
      const b = Bt(
        a.value,
        d
      ), A = en(l, b);
      n.value = A.length, s.initialiseQuiz(A, f), f === "Timed" && s.setTimeLimit(l * s.timeLimit), o.value = !0;
    };
    return (l, f) => o.value && E(s).quizMode === "Tutor" ? (g(), H(Sn, { key: 0 })) : o.value && E(s).quizMode === "Timed" ? (g(), H(kn, { key: 1 })) : (g(), H(to, {
      key: 2,
      onStartQuiz: c
    }));
  }
}), fo = {
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
}, Oe = async (e, t) => {
};
function _o(e, t = {}) {
  const n = bs();
  e.use(n), e.component("CrucibleComponent", po), e.provide("$dataLink", t.dataLink || fo), e.provide(
    "$updateQAttemptCallback",
    t.updateQAttemptCallback || Oe
  );
}
export {
  po as CrucibleComponent,
  _o as createViewerPlugin,
  fo as defaultData,
  Oe as defaultUpdateQAttemptCallback
};
