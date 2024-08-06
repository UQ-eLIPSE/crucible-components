import { effectScope as Gt, ref as T, markRaw as J, toRaw as vt, hasInjectionContext as Se, inject as Nt, getCurrentInstance as Te, watch as Ct, unref as S, reactive as we, isRef as at, isReactive as It, toRef as St, nextTick as xt, computed as Lt, getCurrentScope as Qe, onScopeDispose as Oe, toRefs as Qt, defineComponent as I, openBlock as g, createElementBlock as b, Fragment as R, normalizeClass as F, createElementVNode as h, toDisplayString as k, renderList as tt, createVNode as et, createBlock as j, createCommentVNode as N, onMounted as bt, pushScopeId as Jt, popScopeId as Wt, resolveComponent as Ee, onBeforeMount as Yt, createTextVNode as Kt, watchEffect as ke, withDirectives as Vt, vModelText as $e, vModelSelect as qe } from "vue";
var Xt = !1;
function ft(t, s, n) {
  return Array.isArray(t) ? (t.length = Math.max(t.length, s), t.splice(s, 1, n), n) : (t[s] = n, n);
}
function Tt(t, s) {
  if (Array.isArray(t)) {
    t.splice(s, 1);
    return;
  }
  delete t[s];
}
function Ne() {
  return Zt().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Zt() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Ce = typeof Proxy == "function", Ie = "devtools-plugin:setup", Le = "plugin:settings:set";
let K, Ot;
function Ae() {
  var t;
  return K !== void 0 || (typeof window < "u" && window.performance ? (K = !0, Ot = window.performance) : typeof globalThis < "u" && (!((t = globalThis.perf_hooks) === null || t === void 0) && t.performance) ? (K = !0, Ot = globalThis.perf_hooks.performance) : K = !1), K;
}
function Pe() {
  return Ae() ? Ot.now() : Date.now();
}
class Me {
  constructor(s, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = s, this.hook = n;
    const e = {};
    if (s.settings)
      for (const r in s.settings) {
        const u = s.settings[r];
        e[r] = u.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${s.id}`;
    let i = Object.assign({}, e);
    try {
      const r = localStorage.getItem(o), u = JSON.parse(r);
      Object.assign(i, u);
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
        return Pe();
      }
    }, n && n.on(Le, (r, u) => {
      r === this.plugin.id && this.fallbacks.setSettings(u);
    }), this.proxiedOn = new Proxy({}, {
      get: (r, u) => this.target ? this.target.on[u] : (...a) => {
        this.onQueue.push({
          method: u,
          args: a
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (r, u) => this.target ? this.target[u] : u === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(u) ? (...a) => (this.targetQueue.push({
        method: u,
        args: a,
        resolve: () => {
        }
      }), this.fallbacks[u](...a)) : (...a) => new Promise((c) => {
        this.targetQueue.push({
          method: u,
          args: a,
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
function te(t, s) {
  const n = t, e = Zt(), o = Ne(), i = Ce && n.enableEarlyProxy;
  if (o && (e.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    o.emit(Ie, t, s);
  else {
    const r = i ? new Me(n, o) : null;
    (e.__VUE_DEVTOOLS_PLUGINS__ = e.__VUE_DEVTOOLS_PLUGINS__ || []).push({
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
let it;
const ut = (t) => it = t, ee = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function W(t) {
  return t && typeof t == "object" && Object.prototype.toString.call(t) === "[object Object]" && typeof t.toJSON != "function";
}
var D;
(function(t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function";
})(D || (D = {}));
const yt = typeof window < "u", rt = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && yt, jt = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function xe(t, { autoBom: s = !1 } = {}) {
  return s && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type) ? new Blob(["\uFEFF", t], { type: t.type }) : t;
}
function At(t, s, n) {
  const e = new XMLHttpRequest();
  e.open("GET", t), e.responseType = "blob", e.onload = function() {
    oe(e.response, s, n);
  }, e.onerror = function() {
    console.error("could not download file");
  }, e.send();
}
function ne(t) {
  const s = new XMLHttpRequest();
  s.open("HEAD", t, !1);
  try {
    s.send();
  } catch {
  }
  return s.status >= 200 && s.status <= 299;
}
function mt(t) {
  try {
    t.dispatchEvent(new MouseEvent("click"));
  } catch {
    const n = document.createEvent("MouseEvents");
    n.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), t.dispatchEvent(n);
  }
}
const ht = typeof navigator == "object" ? navigator : { userAgent: "" }, se = /Macintosh/.test(ht.userAgent) && /AppleWebKit/.test(ht.userAgent) && !/Safari/.test(ht.userAgent), oe = yt ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !se ? Ve : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in ht ? je : (
      // Fallback to using FileReader and a popup
      De
    )
  )
) : () => {
};
function Ve(t, s = "download", n) {
  const e = document.createElement("a");
  e.download = s, e.rel = "noopener", typeof t == "string" ? (e.href = t, e.origin !== location.origin ? ne(e.href) ? At(t, s, n) : (e.target = "_blank", mt(e)) : mt(e)) : (e.href = URL.createObjectURL(t), setTimeout(function() {
    URL.revokeObjectURL(e.href);
  }, 4e4), setTimeout(function() {
    mt(e);
  }, 0));
}
function je(t, s = "download", n) {
  if (typeof t == "string")
    if (ne(t))
      At(t, s, n);
    else {
      const e = document.createElement("a");
      e.href = t, e.target = "_blank", setTimeout(function() {
        mt(e);
      });
    }
  else
    navigator.msSaveOrOpenBlob(xe(t, n), s);
}
function De(t, s, n, e) {
  if (e = e || open("", "_blank"), e && (e.document.title = e.document.body.innerText = "downloading..."), typeof t == "string")
    return At(t, s, n);
  const o = t.type === "application/octet-stream", i = /constructor/i.test(String(jt.HTMLElement)) || "safari" in jt, r = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((r || o && i || se) && typeof FileReader < "u") {
    const u = new FileReader();
    u.onloadend = function() {
      let a = u.result;
      if (typeof a != "string")
        throw e = null, new Error("Wrong reader.result type");
      a = r ? a : a.replace(/^data:[^;]*;/, "data:attachment/file;"), e ? e.location.href = a : location.assign(a), e = null;
    }, u.readAsDataURL(t);
  } else {
    const u = URL.createObjectURL(t);
    e ? e.location.assign(u) : location.href = u, e = null, setTimeout(function() {
      URL.revokeObjectURL(u);
    }, 4e4);
  }
}
function E(t, s) {
  const n = "🍍 " + t;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, s) : s === "error" ? console.error(n) : s === "warn" ? console.warn(n) : console.log(n);
}
function Pt(t) {
  return "_a" in t && "install" in t;
}
function ie() {
  if (!("clipboard" in navigator))
    return E("Your browser doesn't support the Clipboard API", "error"), !0;
}
function re(t) {
  return t instanceof Error && t.message.toLowerCase().includes("document is not focused") ? (E('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function ze(t) {
  if (!ie())
    try {
      await navigator.clipboard.writeText(JSON.stringify(t.state.value)), E("Global state copied to clipboard.");
    } catch (s) {
      if (re(s))
        return;
      E("Failed to serialize the state. Check the console for more details.", "error"), console.error(s);
    }
}
async function Ue(t) {
  if (!ie())
    try {
      ae(t, JSON.parse(await navigator.clipboard.readText())), E("Global state pasted from clipboard.");
    } catch (s) {
      if (re(s))
        return;
      E("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(s);
    }
}
async function Re(t) {
  try {
    oe(new Blob([JSON.stringify(t.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (s) {
    E("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(s);
  }
}
let U;
function Fe() {
  U || (U = document.createElement("input"), U.type = "file", U.accept = ".json");
  function t() {
    return new Promise((s, n) => {
      U.onchange = async () => {
        const e = U.files;
        if (!e)
          return s(null);
        const o = e.item(0);
        return s(o ? { text: await o.text(), file: o } : null);
      }, U.oncancel = () => s(null), U.onerror = n, U.click();
    });
  }
  return t;
}
async function Be(t) {
  try {
    const n = await Fe()();
    if (!n)
      return;
    const { text: e, file: o } = n;
    ae(t, JSON.parse(e)), E(`Global state imported from "${o.name}".`);
  } catch (s) {
    E("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(s);
  }
}
function ae(t, s) {
  for (const n in s) {
    const e = t.state.value[n];
    e ? Object.assign(e, s[n]) : t.state.value[n] = s[n];
  }
}
function x(t) {
  return {
    _custom: {
      display: t
    }
  };
}
const ue = "🍍 Pinia (root)", Et = "_root";
function He(t) {
  return Pt(t) ? {
    id: Et,
    label: ue
  } : {
    id: t.$id,
    label: t.$id
  };
}
function Ge(t) {
  if (Pt(t)) {
    const n = Array.from(t._s.keys()), e = t._s;
    return {
      state: n.map((i) => ({
        editable: !0,
        key: i,
        value: t.state.value[i]
      })),
      getters: n.filter((i) => e.get(i)._getters).map((i) => {
        const r = e.get(i);
        return {
          editable: !1,
          key: i,
          value: r._getters.reduce((u, a) => (u[a] = r[a], u), {})
        };
      })
    };
  }
  const s = {
    state: Object.keys(t.$state).map((n) => ({
      editable: !0,
      key: n,
      value: t.$state[n]
    }))
  };
  return t._getters && t._getters.length && (s.getters = t._getters.map((n) => ({
    editable: !1,
    key: n,
    value: t[n]
  }))), t._customProperties.size && (s.customProperties = Array.from(t._customProperties).map((n) => ({
    editable: !0,
    key: n,
    value: t[n]
  }))), s;
}
function Je(t) {
  return t ? Array.isArray(t) ? t.reduce((s, n) => (s.keys.push(n.key), s.operations.push(n.type), s.oldValue[n.key] = n.oldValue, s.newValue[n.key] = n.newValue, s), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: x(t.type),
    key: x(t.key),
    oldValue: t.oldValue,
    newValue: t.newValue
  } : {};
}
function We(t) {
  switch (t) {
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
const gt = [], G = "pinia:mutations", $ = "pinia", { assign: Ye } = Object, _t = (t) => "🍍 " + t;
function Ke(t, s) {
  te({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: gt,
    app: t
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
            ze(s);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await Ue(s), n.sendInspectorTree($), n.sendInspectorState($);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            Re(s);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Be(s), n.sendInspectorTree($), n.sendInspectorState($);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (e) => {
            const o = s._s.get(e);
            o ? typeof o.$reset != "function" ? E(`Cannot reset "${e}" store because it doesn't have a "$reset" method implemented.`, "warn") : (o.$reset(), E(`Store "${e}" reset.`)) : E(`Cannot reset "${e}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((e, o) => {
      const i = e.componentInstance && e.componentInstance.proxy;
      if (i && i._pStores) {
        const r = e.componentInstance.proxy._pStores;
        Object.values(r).forEach((u) => {
          e.instanceData.state.push({
            type: _t(u.$id),
            key: "state",
            editable: !0,
            value: u._isOptionsAPI ? {
              _custom: {
                value: vt(u.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => u.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(u.$state).reduce((a, c) => (a[c] = u.$state[c], a), {})
            )
          }), u._getters && u._getters.length && e.instanceData.state.push({
            type: _t(u.$id),
            key: "getters",
            editable: !1,
            value: u._getters.reduce((a, c) => {
              try {
                a[c] = u[c];
              } catch (p) {
                a[c] = p;
              }
              return a;
            }, {})
          });
        });
      }
    }), n.on.getInspectorTree((e) => {
      if (e.app === t && e.inspectorId === $) {
        let o = [s];
        o = o.concat(Array.from(s._s.values())), e.rootNodes = (e.filter ? o.filter((i) => "$id" in i ? i.$id.toLowerCase().includes(e.filter.toLowerCase()) : ue.toLowerCase().includes(e.filter.toLowerCase())) : o).map(He);
      }
    }), n.on.getInspectorState((e) => {
      if (e.app === t && e.inspectorId === $) {
        const o = e.nodeId === Et ? s : s._s.get(e.nodeId);
        if (!o)
          return;
        o && (e.state = Ge(o));
      }
    }), n.on.editInspectorState((e, o) => {
      if (e.app === t && e.inspectorId === $) {
        const i = e.nodeId === Et ? s : s._s.get(e.nodeId);
        if (!i)
          return E(`store "${e.nodeId}" not found`, "error");
        const { path: r } = e;
        Pt(i) ? r.unshift("state") : (r.length !== 1 || !i._customProperties.has(r[0]) || r[0] in i.$state) && r.unshift("$state"), Z = !1, e.set(i, r, e.state.value), Z = !0;
      }
    }), n.on.editComponentState((e) => {
      if (e.type.startsWith("🍍")) {
        const o = e.type.replace(/^🍍\s*/, ""), i = s._s.get(o);
        if (!i)
          return E(`store "${o}" not found`, "error");
        const { path: r } = e;
        if (r[0] !== "state")
          return E(`Invalid path for store "${o}":
${r}
Only state can be modified.`);
        r[0] = "$state", Z = !1, e.set(i, r, e.state.value), Z = !0;
      }
    });
  });
}
function Xe(t, s) {
  gt.includes(_t(s.$id)) || gt.push(_t(s.$id)), te({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: gt,
    app: t,
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
    const e = typeof n.now == "function" ? n.now.bind(n) : Date.now;
    s.$onAction(({ after: r, onError: u, name: a, args: c }) => {
      const p = ce++;
      n.addTimelineEvent({
        layerId: G,
        event: {
          time: e(),
          title: "🛫 " + a,
          subtitle: "start",
          data: {
            store: x(s.$id),
            action: x(a),
            args: c
          },
          groupId: p
        }
      }), r((d) => {
        H = void 0, n.addTimelineEvent({
          layerId: G,
          event: {
            time: e(),
            title: "🛬 " + a,
            subtitle: "end",
            data: {
              store: x(s.$id),
              action: x(a),
              args: c,
              result: d
            },
            groupId: p
          }
        });
      }), u((d) => {
        H = void 0, n.addTimelineEvent({
          layerId: G,
          event: {
            time: e(),
            logType: "error",
            title: "💥 " + a,
            subtitle: "end",
            data: {
              store: x(s.$id),
              action: x(a),
              args: c,
              error: d
            },
            groupId: p
          }
        });
      });
    }, !0), s._customProperties.forEach((r) => {
      Ct(() => S(s[r]), (u, a) => {
        n.notifyComponentUpdate(), n.sendInspectorState($), Z && n.addTimelineEvent({
          layerId: G,
          event: {
            time: e(),
            title: "Change",
            subtitle: r,
            data: {
              newValue: u,
              oldValue: a
            },
            groupId: H
          }
        });
      }, { deep: !0 });
    }), s.$subscribe(({ events: r, type: u }, a) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState($), !Z)
        return;
      const c = {
        time: e(),
        title: We(u),
        data: Ye({ store: x(s.$id) }, Je(r)),
        groupId: H
      };
      u === D.patchFunction ? c.subtitle = "⤵️" : u === D.patchObject ? c.subtitle = "🧩" : r && !Array.isArray(r) && (c.subtitle = r.type), r && (c.data["rawEvent(s)"] = {
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
          time: e(),
          title: "🔥 " + s.$id,
          subtitle: "HMR update",
          data: {
            store: x(s.$id),
            info: x("HMR update")
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
let ce = 0, H;
function Dt(t, s, n) {
  const e = s.reduce((o, i) => (o[i] = vt(t)[i], o), {});
  for (const o in e)
    t[o] = function() {
      const i = ce, r = n ? new Proxy(t, {
        get(...a) {
          return H = i, Reflect.get(...a);
        },
        set(...a) {
          return H = i, Reflect.set(...a);
        }
      }) : t;
      H = i;
      const u = e[o].apply(r, arguments);
      return H = void 0, u;
    };
}
function Ze({ app: t, store: s, options: n }) {
  if (s.$id.startsWith("__hot:"))
    return;
  s._isOptionsAPI = !!n.state, Dt(s, Object.keys(n.actions), s._isOptionsAPI);
  const e = s._hotUpdate;
  vt(s)._hotUpdate = function(o) {
    e.apply(this, arguments), Dt(s, Object.keys(o._hmrPayload.actions), !!s._isOptionsAPI);
  }, Xe(
    t,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    s
  );
}
function tn() {
  const t = Gt(!0), s = t.run(() => T({}));
  let n = [], e = [];
  const o = J({
    install(i) {
      ut(o), o._a = i, i.provide(ee, o), i.config.globalProperties.$pinia = o, rt && Ke(i, o), e.forEach((r) => n.push(r)), e = [];
    },
    use(i) {
      return !this._a && !Xt ? e.push(i) : n.push(i), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: t,
    _s: /* @__PURE__ */ new Map(),
    state: s
  });
  return rt && typeof Proxy < "u" && o.use(Ze), o;
}
function le(t, s) {
  for (const n in s) {
    const e = s[n];
    if (!(n in t))
      continue;
    const o = t[n];
    W(o) && W(e) && !at(e) && !It(e) ? t[n] = le(o, e) : t[n] = e;
  }
  return t;
}
const de = () => {
};
function zt(t, s, n, e = de) {
  t.push(s);
  const o = () => {
    const i = t.indexOf(s);
    i > -1 && (t.splice(i, 1), e());
  };
  return !n && Qe() && Oe(o), o;
}
function X(t, ...s) {
  t.slice().forEach((n) => {
    n(...s);
  });
}
const en = (t) => t();
function kt(t, s) {
  t instanceof Map && s instanceof Map && s.forEach((n, e) => t.set(e, n)), t instanceof Set && s instanceof Set && s.forEach(t.add, t);
  for (const n in s) {
    if (!s.hasOwnProperty(n))
      continue;
    const e = s[n], o = t[n];
    W(o) && W(e) && t.hasOwnProperty(n) && !at(e) && !It(e) ? t[n] = kt(o, e) : t[n] = e;
  }
  return t;
}
const nn = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function sn(t) {
  return !W(t) || !t.hasOwnProperty(nn);
}
const { assign: A } = Object;
function Ut(t) {
  return !!(at(t) && t.effect);
}
function Rt(t, s, n, e) {
  const { state: o, actions: i, getters: r } = s, u = n.state.value[t];
  let a;
  function c() {
    !u && (process.env.NODE_ENV === "production" || !e) && (n.state.value[t] = o ? o() : {});
    const p = process.env.NODE_ENV !== "production" && e ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Qt(T(o ? o() : {}).value)
    ) : Qt(n.state.value[t]);
    return A(p, i, Object.keys(r || {}).reduce((d, m) => (process.env.NODE_ENV !== "production" && m in p && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${m}" in store "${t}".`), d[m] = J(Lt(() => {
      ut(n);
      const v = n._s.get(t);
      return r[m].call(v, v);
    })), d), {}));
  }
  return a = $t(t, c, s, n, e, !0), a;
}
function $t(t, s, n = {}, e, o, i) {
  let r;
  const u = A({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !e._e.active)
    throw new Error("Pinia destroyed");
  const a = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Xt && (a.onTrigger = (f) => {
    c ? v = f : c == !1 && !_._hotUpdating && (Array.isArray(v) ? v.push(f) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let c, p, d = [], m = [], v;
  const q = e.state.value[t];
  !i && !q && (process.env.NODE_ENV === "production" || !o) && (e.state.value[t] = {});
  const nt = T({});
  let lt;
  function dt(f) {
    let l;
    c = p = !1, process.env.NODE_ENV !== "production" && (v = []), typeof f == "function" ? (f(e.state.value[t]), l = {
      type: D.patchFunction,
      storeId: t,
      events: v
    }) : (kt(e.state.value[t], f), l = {
      type: D.patchObject,
      payload: f,
      storeId: t,
      events: v
    });
    const y = lt = Symbol();
    xt().then(() => {
      lt === y && (c = !0);
    }), p = !0, X(d, l, e.state.value[t]);
  }
  const w = i ? function() {
    const { state: l } = n, y = l ? l() : {};
    this.$patch((C) => {
      A(C, y);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${t}" is built using the setup syntax and does not implement $reset().`);
    } : de
  );
  function Q() {
    r.stop(), d = [], m = [], e._s.delete(t);
  }
  function O(f, l) {
    return function() {
      ut(e);
      const y = Array.from(arguments), C = [], st = [];
      function be(L) {
        C.push(L);
      }
      function ye(L) {
        st.push(L);
      }
      X(m, {
        args: y,
        name: f,
        store: _,
        after: be,
        onError: ye
      });
      let ot;
      try {
        ot = l.apply(this && this.$id === t ? this : _, y);
      } catch (L) {
        throw X(st, L), L;
      }
      return ot instanceof Promise ? ot.then((L) => (X(C, L), L)).catch((L) => (X(st, L), Promise.reject(L))) : (X(C, ot), ot);
    };
  }
  const M = /* @__PURE__ */ J({
    actions: {},
    getters: {},
    state: [],
    hotState: nt
  }), Y = {
    _p: e,
    // _s: scope,
    $id: t,
    $onAction: zt.bind(null, m),
    $patch: dt,
    $reset: w,
    $subscribe(f, l = {}) {
      const y = zt(d, f, l.detached, () => C()), C = r.run(() => Ct(() => e.state.value[t], (st) => {
        (l.flush === "sync" ? p : c) && f({
          storeId: t,
          type: D.direct,
          events: v
        }, st);
      }, A({}, a, l)));
      return y;
    },
    $dispose: Q
  }, _ = we(process.env.NODE_ENV !== "production" || rt ? A(
    {
      _hmrPayload: M,
      _customProperties: J(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    Y
    // must be added later
    // setupStore
  ) : Y);
  e._s.set(t, _);
  const B = (e._a && e._a.runWithContext || en)(() => e._e.run(() => (r = Gt()).run(s)));
  for (const f in B) {
    const l = B[f];
    if (at(l) && !Ut(l) || It(l))
      process.env.NODE_ENV !== "production" && o ? ft(nt.value, f, St(B, f)) : i || (q && sn(l) && (at(l) ? l.value = q[f] : kt(l, q[f])), e.state.value[t][f] = l), process.env.NODE_ENV !== "production" && M.state.push(f);
    else if (typeof l == "function") {
      const y = process.env.NODE_ENV !== "production" && o ? l : O(f, l);
      B[f] = y, process.env.NODE_ENV !== "production" && (M.actions[f] = l), u.actions[f] = l;
    } else process.env.NODE_ENV !== "production" && Ut(l) && (M.getters[f] = i ? (
      // @ts-expect-error
      n.getters[f]
    ) : l, yt && (B._getters || // @ts-expect-error: same
    (B._getters = J([]))).push(f));
  }
  if (A(_, B), A(vt(_), B), Object.defineProperty(_, "$state", {
    get: () => process.env.NODE_ENV !== "production" && o ? nt.value : e.state.value[t],
    set: (f) => {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error("cannot set hotState");
      dt((l) => {
        A(l, f);
      });
    }
  }), process.env.NODE_ENV !== "production" && (_._hotUpdate = J((f) => {
    _._hotUpdating = !0, f._hmrPayload.state.forEach((l) => {
      if (l in _.$state) {
        const y = f.$state[l], C = _.$state[l];
        typeof y == "object" && W(y) && W(C) ? le(y, C) : f.$state[l] = C;
      }
      ft(_, l, St(f.$state, l));
    }), Object.keys(_.$state).forEach((l) => {
      l in f.$state || Tt(_, l);
    }), c = !1, p = !1, e.state.value[t] = St(f._hmrPayload, "hotState"), p = !0, xt().then(() => {
      c = !0;
    });
    for (const l in f._hmrPayload.actions) {
      const y = f[l];
      ft(_, l, O(l, y));
    }
    for (const l in f._hmrPayload.getters) {
      const y = f._hmrPayload.getters[l], C = i ? (
        // special handling of options api
        Lt(() => (ut(e), y.call(_, _)))
      ) : y;
      ft(_, l, C);
    }
    Object.keys(_._hmrPayload.getters).forEach((l) => {
      l in f._hmrPayload.getters || Tt(_, l);
    }), Object.keys(_._hmrPayload.actions).forEach((l) => {
      l in f._hmrPayload.actions || Tt(_, l);
    }), _._hmrPayload = f._hmrPayload, _._getters = f._getters, _._hotUpdating = !1;
  })), rt) {
    const f = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((l) => {
      Object.defineProperty(_, l, A({ value: _[l] }, f));
    });
  }
  return e._p.forEach((f) => {
    if (rt) {
      const l = r.run(() => f({
        store: _,
        app: e._a,
        pinia: e,
        options: u
      }));
      Object.keys(l || {}).forEach((y) => _._customProperties.add(y)), A(_, l);
    } else
      A(_, r.run(() => f({
        store: _,
        app: e._a,
        pinia: e,
        options: u
      })));
  }), process.env.NODE_ENV !== "production" && _.$state && typeof _.$state == "object" && typeof _.$state.constructor == "function" && !_.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${_.$id}".`), q && i && n.hydrate && n.hydrate(_.$state, q), c = !0, p = !0, _;
}
function on(t, s, n) {
  let e, o;
  const i = typeof s == "function";
  e = t, o = i ? n : s;
  function r(u, a) {
    const c = Se();
    if (u = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && it && it._testing ? null : u) || (c ? Nt(ee, null) : null), u && ut(u), process.env.NODE_ENV !== "production" && !it)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    u = it, u._s.has(e) || (i ? $t(e, s, o, u) : Rt(e, o, u), process.env.NODE_ENV !== "production" && (r._pinia = u));
    const p = u._s.get(e);
    if (process.env.NODE_ENV !== "production" && a) {
      const d = "__hot:" + e, m = i ? $t(d, s, o, u, !0) : Rt(d, A({}, o), u, !0);
      a._hotUpdate(m), delete u.state.value[d], u._s.delete(d);
    }
    if (process.env.NODE_ENV !== "production" && yt) {
      const d = Te();
      if (d && d.proxy && // avoid adding stores that are just built for hot module replacement
      !a) {
        const m = d.proxy, v = "_pStores" in m ? m._pStores : m._pStores = {};
        v[e] = p;
      }
    }
    return p;
  }
  return r.$id = e, r;
}
const rn = ["id", "checked"], an = ["for", "innerHTML"], un = /* @__PURE__ */ I({
  __name: "MCQOption",
  props: {
    optionKey: {},
    checked: { type: Boolean },
    option: {},
    submitted: { type: Boolean }
  },
  emits: ["selectOption"],
  setup(t, { emit: s }) {
    const n = s, e = () => n("selectOption");
    return (o, i) => (g(), b(R, null, [
      (g(), b("input", {
        id: "option-" + o.optionKey,
        key: o.optionKey,
        "test-id": "radio_options",
        type: "radio",
        name: "options",
        checked: o.checked,
        class: F(o.submitted && "ignore-hover")
      }, null, 10, rn)),
      (g(), b("label", {
        key: o.optionKey,
        for: "option-" + o.optionKey,
        class: F(o.submitted ? "mcq-option-label ignore-hover" : "mcq-option-label"),
        onClick: i[0] || (i[0] = (r) => e()),
        innerHTML: o.option.optionValue
      }, null, 10, an))
    ], 64));
  }
}), V = (t, s) => {
  const n = t.__vccOpts || t;
  for (const [e, o] of s)
    n[e] = o;
  return n;
}, cn = /* @__PURE__ */ V(un, [["__scopeId", "data-v-fdbfedc6"]]), ln = ["disabled"], dn = /* @__PURE__ */ I({
  __name: "MCQButton",
  props: {
    submitted: { type: Boolean },
    selectedOption: {},
    hideSkip: { type: Boolean }
  },
  emits: ["submitAnswer", "nextQuestion", "skipQuestion"],
  setup(t, { emit: s }) {
    const n = T("skip"), e = T("Skip"), o = s, i = (a, c) => {
      !a && c ? r("next", "Next", "submitAnswer") : a && c ? r("skip", "Skip", "nextQuestion") : !a && !c && r("skip", "Skip", "skipQuestion");
    }, r = (a, c, p) => {
      n.value = a, e.value = c, o(p);
    }, u = (a, c) => a && c ? { class: "next", text: "Next" } : !a && c ? { class: "submit", text: "Submit" } : { class: n.value, text: e.value };
    return (a, c) => (g(), b("div", null, [
      h("button", {
        disabled: a.hideSkip && u(a.submitted, a.selectedOption).class === "skip",
        class: F(["mcq-button", u(a.submitted, a.selectedOption).class]),
        onClick: c[0] || (c[0] = (p) => i(a.submitted, a.selectedOption))
      }, k(u(a.submitted, a.selectedOption).text), 11, ln)
    ]));
  }
}), fn = /* @__PURE__ */ V(dn, [["__scopeId", "data-v-847b8dd5"]]), pn = /* @__PURE__ */ I({
  __name: "NextButton",
  props: {
    buttonName: {}
  },
  emits: ["nextQuestion", "prevQuestion"],
  setup(t, { emit: s }) {
    const { buttonName: n } = t, e = s, o = () => {
      i(n !== "←" ? "nextQuestion" : "prevQuestion");
    }, i = (r) => {
      e(r);
    };
    return (r, u) => (g(), b("div", null, [
      h("button", {
        class: F(r.buttonName === "Submit" ? "submit_btn" : "mcq-button"),
        onClick: u[0] || (u[0] = (a) => o())
      }, k(r.buttonName), 3)
    ]));
  }
}), Ft = /* @__PURE__ */ V(pn, [["__scopeId", "data-v-8be7f61e"]]), mn = (t) => {
  for (let s = t.length - 1; s > 0; s--) {
    const n = Math.floor(Math.random() * (s + 1));
    [t[s], t[n]] = [t[n], t[s]];
  }
  return t;
}, hn = (t, s) => mn(s).slice(0, t);
function fe(t) {
  const s = t.reduce(
    (e, o) => (Object.keys(o).forEach((i) => {
      i.trim() !== "" && (e[i] || (e[i] = /* @__PURE__ */ new Set()), o[i].forEach((u) => e[i].add(u)));
    }), e),
    {}
  );
  return Object.keys(s).reduce(
    (e, o) => (e[o] = [...s[o]], e),
    {}
  );
}
function Mt(t, s) {
  return t.filter((n) => Object.keys(s).every((e) => {
    if (!s[e].length)
      return !0;
    const o = n.tags[e];
    if (o)
      return o.some((i) => s[e].includes(i));
  }));
}
function gn(t, s, n) {
  return t.filter((e) => {
    const o = e.tags[n];
    return o && o.includes(s);
  });
}
function _n(t, s, n) {
  const e = t[s].question.optionsList;
  for (let o = 0; o < e.length; o++)
    if (e[o].optionValue === n)
      return o;
}
const pe = (t, s) => s.findIndex((n) => {
  var e;
  return ((e = n.question._id) == null ? void 0 : e.$oid) === t;
}), z = on("questionsQueue", {
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
    tagsets: []
  }),
  actions: {
    setTagsset() {
      this.tagsets = this.allQs.map((t) => t.tags), console.log("tagsets2 in store", this.tagsets);
    },
    getTagsets() {
      return console.log("tagsets3 in store get", this.tagsets), this.tagsets;
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
      const t = this.allQs;
      return Mt(t, this.selectedTags).length;
    },
    setselectedTags(t) {
      this.selectedTags = t;
    },
    getselectedtags() {
      return this.selectedTags;
    },
    modifySelectedTags(t, { category: s, topic: n }) {
      this.selectedTags[s] && (this.selectedTags[s] = t ? [...this.selectedTags[s], n] : this.selectedTags[s].filter(
        (e) => e !== n
      ));
    },
    initialiseQuiz(t, s) {
      this.questionsQueue = t, this.questionsStack = [], this.quizMode = s, this.quizStats = t.map((n) => ({
        question: n,
        correct: 0,
        skipped: 0,
        attempts: 0,
        selectedValue: ""
      }));
    },
    incrementStat(t, s, n) {
      const e = pe(t, this.quizStats);
      if (this.quizStats[e]) {
        if (n !== void 0) {
          if (this.quizStats[e][s]++, n === "-1") {
            this.quizStats[e].selectedValue = "Reached Time Limit";
            return;
          }
          const o = this.quizStats[e].question.optionsList.map((i) => i.optionCorrect).indexOf(!0);
          Number(n) === Number(o) ? this.quizStats[e].correct = 1 : this.quizStats[e].correct = 0;
        }
        this.quizStats[e].selectedValue = n !== void 0 ? this.quizStats[e].question.optionsList[Number(n)].optionValue : "";
      }
    },
    pushToHistoryStack(t) {
      this.questionsStack.push(t);
    },
    enqueueQuestion(t) {
      this.questionsQueue.push(t);
    },
    dequeueQuestion() {
      for (; this.questionsQueue.length > 0; ) {
        const t = this.questionsQueue.shift();
        return this.pushToHistoryStack(t), t;
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
    setTimeLimit(t) {
      this.timeLimit = t;
    },
    getRemainingQuestions() {
      return this.questionsQueue.length;
    }
  }
}), vn = ["innerHTML"], bn = { class: "mcq-list" }, yn = ["onClick"], Sn = { class: "next-prev-question" }, Tn = /* @__PURE__ */ I({
  __name: "MCQQuestion",
  props: {
    _id: {},
    statement: {},
    optionsList: {}
  },
  emits: ["nextQuestion", "skipQuestion", "prevQuestion"],
  setup(t, { emit: s }) {
    const n = z(), e = T(null), o = T(!1), i = s, r = T(n.getRemainingQuestions()), u = () => {
      o.value = !0;
    }, a = () => {
      e.value = null, i("nextQuestion");
    }, c = () => {
      m(), r.value = n.getRemainingQuestions(), i("nextQuestion");
    }, p = () => {
      m(), i("skipQuestion");
    }, d = (w) => n.incrementStat(
      w.$oid,
      "attempts",
      e.value ?? void 0
    ), m = () => {
      o.value = !1, e.value = null;
    }, v = () => {
      e.value = null, i("prevQuestion");
    }, q = (w, Q) => {
      o.value || (e.value = e.value === Q ? null : Q), d(w);
    }, nt = (w, Q, O) => n.quizMode === "Timed" ? lt(w, Q) : dt(Q, O);
    function lt(w, Q) {
      const O = pe(w.$oid, n.quizStats), M = n.quizStats[O].selectedValue, Y = _n(
        n.quizStats,
        O,
        M
      );
      return String(Y) === Q ? (e.value = Q, "selected") : "";
    }
    function dt(w, Q) {
      const O = Q[parseInt(w)], M = e.value === w;
      return o.value ? O.optionCorrect ? "correct ignore-hover" : M ? "wrong ignore-hover" : "ignore-hover" : M ? "selected" : "";
    }
    return (w, Q) => (g(), b(R, null, [
      h("div", {
        class: "mcq-statement",
        innerHTML: w.statement
      }, null, 8, vn),
      h("div", bn, [
        (g(!0), b(R, null, tt(Object.entries(w.optionsList), ([O, M]) => (g(), b("div", {
          key: O,
          class: F(["mcq-option", nt(w._id, O, w.optionsList)]),
          onClick: (Y) => q(w._id, O)
        }, [
          et(cn, {
            "option-key": O,
            checked: e.value === O,
            option: M,
            submitted: o.value,
            onSelectOption: (Y) => q(w._id, O)
          }, null, 8, ["option-key", "checked", "option", "submitted", "onSelectOption"])
        ], 10, yn))), 128))
      ]),
      S(n).quizMode === "Tutor" ? (g(), j(fn, {
        key: 0,
        submitted: o.value,
        "selected-option": e.value,
        "hide-skip": r.value <= 1,
        onSubmitAnswer: u,
        onNextQuestion: Q[0] || (Q[0] = (O) => c()),
        onSkipQuestion: p
      }, null, 8, ["submitted", "selected-option", "hide-skip"])) : N("", !0),
      h("div", Sn, [
        S(n).quizMode === "Timed" ? (g(), j(Ft, {
          key: 0,
          "button-name": S(n).questionsQueue.length >= 1 ? "→" : "Submit",
          onNextQuestion: Q[1] || (Q[1] = (O) => a())
        }, null, 8, ["button-name"])) : N("", !0),
        S(n).quizMode === "Timed" && S(n).questionsStack.length > 1 ? (g(), j(Ft, {
          key: 1,
          "button-name": "←",
          onPrevQuestion: Q[2] || (Q[2] = (O) => v())
        })) : N("", !0)
      ])
    ], 64));
  }
}), me = /* @__PURE__ */ V(Tn, [["__scopeId", "data-v-181a554c"]]), wn = (t) => (Jt("data-v-38adb08e"), t = t(), Wt(), t), Qn = { class: "report-container" }, On = { class: "mcq-report" }, En = { class: "table-container" }, kn = /* @__PURE__ */ wn(() => /* @__PURE__ */ h("thead", null, [
  /* @__PURE__ */ h("tr", null, [
    /* @__PURE__ */ h("th", null, "question"),
    /* @__PURE__ */ h("th", null, "correct option"),
    /* @__PURE__ */ h("th", null, "your answer")
  ])
], -1)), $n = { class: "question-row" }, qn = ["href", "innerHTML"], Nn = { class: "answer-row" }, Cn = ["innerHTML"], In = { class: "answer-row" }, Ln = ["innerHTML"], An = { class: "mcq-result" }, Pn = { class: "score" }, Mn = /* @__PURE__ */ I({
  __name: "MCQStatus",
  setup(t) {
    const s = Nt("$updateQAttemptCallback") ?? ve, n = z(), e = n.quizStats, o = n.quizStats.length, i = e.filter((a) => a.correct === 1).length, r = (i * 100 / o).toFixed(0);
    return bt(() => {
      try {
        const a = e.filter((c) => c.attempts).map(
          (c) => s(c.question._id.$oid, !!c.correct)
        );
        a.length && Promise.allSettled(a);
      } catch (a) {
        throw console.error("Error updating question attempts", a), a;
      }
    }), (a, c) => (g(), b("div", Qn, [
      h("div", On, [
        h("div", En, [
          h("table", null, [
            kn,
            h("tbody", null, [
              (g(!0), b(R, null, tt(Object.entries(S(e)), ([p, d]) => (g(), b("tr", {
                key: p,
                class: "quiz-statment"
              }, [
                h("td", $n, [
                  h("a", {
                    href: d.question.link,
                    target: "_blank",
                    innerHTML: d.question.statement
                  }, null, 8, qn)
                ]),
                h("td", Nn, [
                  (g(!0), b(R, null, tt(Object.entries(
                    d.question.optionsList
                  ), ([m, v]) => (g(), b("span", { key: m }, [
                    v.optionCorrect ? (g(), b("span", {
                      key: 0,
                      innerHTML: v.optionValue
                    }, null, 8, Cn)) : N("", !0)
                  ]))), 128))
                ]),
                h("td", In, [
                  h("span", {
                    class: F(
                      d.correct === 1 ? "correct-answer" : "wrong-answer"
                    ),
                    innerHTML: d.correct === 1 ? "<span> ✔</span> " : "<span> ✘</span> <span>     </span>" + d.selectedValue
                  }, null, 10, Ln)
                ])
              ]))), 128))
            ])
          ])
        ])
      ]),
      h("div", null, [
        h("div", An, [
          h("span", Pn, "⌛ Result: " + k(S(i)) + " out of " + k(S(o)) + " - (" + k(S(r)) + " %)", 1)
        ])
      ])
    ]));
  }
}), he = /* @__PURE__ */ V(Mn, [["__scopeId", "data-v-38adb08e"]]), xn = { class: "questions-left-header" }, Vn = /* @__PURE__ */ I({
  __name: "MCQQuiz",
  setup(t) {
    const s = T(), n = z();
    bt(() => {
      o();
    });
    const e = () => {
      n.enqueueQuestion(s.value), s.value = n.dequeueQuestion();
    }, o = () => {
      n.setAnsweredQuestionsNum(), s.value = n.dequeueQuestion();
    }, i = () => window.location.reload();
    return (r, u) => {
      const a = Ee("MCQInfoPanel");
      return g(), b("main", null, [
        et(a),
        h("h3", xn, " Question " + k(S(n).getAnsweredQuestionsNum()) + " out of " + k(S(n).quizStats.length), 1),
        s.value ? (g(), j(me, {
          key: 0,
          statement: s.value.statement,
          "options-list": s.value.optionsList,
          _id: s.value._id,
          onNextQuestion: o,
          onSkipQuestion: e
        }, null, 8, ["statement", "options-list", "_id"])) : N("", !0),
        s.value ? N("", !0) : (g(), j(he, { key: 1 })),
        s.value ? N("", !0) : (g(), b("button", {
          key: 2,
          class: "btn-relocate",
          onClick: i
        }, " End "))
      ]);
    };
  }
}), jn = /* @__PURE__ */ V(Vn, [["__scopeId", "data-v-edc7c7f1"]]), Dn = {
  key: 0,
  class: "time-left-header"
}, zn = { class: "questions-left-header" }, Un = /* @__PURE__ */ I({
  __name: "MCQInfoPanel",
  props: {
    timeLeft: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const s = z(), n = (e) => {
      const o = Math.floor(e / 60), i = e % 60;
      return `${o}:${i < 10 ? "0" : ""}${i}`;
    };
    return (e, o) => (g(), b(R, null, [
      t.timeLeft ? (g(), b("h3", Dn, " Time left: " + k(n(t.timeLeft)), 1)) : N("", !0),
      h("h3", zn, " Question " + k(S(s).questionsStack.length) + " out of " + k(S(s).quizStats.length), 1)
    ], 64));
  }
}), Bt = 1e3, Rn = "-1", Fn = /* @__PURE__ */ I({
  __name: "MCQTimedQuiz",
  setup(t) {
    const s = z(), n = T();
    let e = null, o = null;
    const i = T(s.timeLimit);
    bt(() => {
      u();
    }), Yt(() => {
      c(), p();
    });
    const r = () => {
      n.value = s.removeFromLastHistory() ?? n.value;
    }, u = () => n.value = s.dequeueQuestion(), a = () => window.location.reload(), c = () => {
      e && clearTimeout(e), o && clearInterval(o);
    }, p = () => {
      i.value = s.timeLimit;
      const m = () => n.value ? i.value ? i.value-- : d() : c();
      o = window.setInterval(m, Bt), e = window.setTimeout(() => {
      }, s.timeLimit * Bt);
    }, d = () => {
      var v;
      c();
      const m = (q) => s.incrementStat(q, "attempts", Rn);
      for (m(((v = n.value) == null ? void 0 : v._id.$oid) ?? ""); n.value = s.dequeueQuestion(); )
        m(n.value._id.$oid);
      return alert("Time's up! Quiz has ended."), u();
    };
    return (m, v) => (g(), b("main", null, [
      et(Un, { "time-left": i.value }, null, 8, ["time-left"]),
      n.value ? (g(), j(me, {
        key: 0,
        statement: n.value.statement,
        "options-list": n.value.optionsList,
        _id: n.value._id,
        onNextQuestion: u,
        onPrevQuestion: r
      }, null, 8, ["statement", "options-list", "_id"])) : N("", !0),
      n.value ? N("", !0) : (g(), j(he, { key: 1 })),
      n.value ? N("", !0) : (g(), b("button", {
        key: 2,
        class: "btn-relocate",
        onClick: a
      }, " End "))
    ]));
  }
}), Bn = /* @__PURE__ */ V(Fn, [["__scopeId", "data-v-4fd74e68"]]), Hn = ["id", "name", "value", "disabled"], Gn = ["for"], Jn = {
  key: 0,
  class: "question-number"
}, Wn = /* @__PURE__ */ I({
  __name: "FilterCheckbox",
  props: {
    category: {},
    topics: {}
  },
  setup(t) {
    const { category: s, topics: n } = t, e = z(), o = (a) => s === "course" ? a.toUpperCase() : a, i = Lt(
      () => Object.entries(n).map(([a, c]) => {
        const p = u(c, s), d = gn(
          e.allQs,
          c,
          s
        ).length.toString();
        return { idx: a, topic: c, num: p, questionamount: d };
      }).filter(({ topic: a }) => a !== void 0)
    ), r = (a) => {
      if (!(a.target instanceof HTMLInputElement))
        return console.error("Trying to click on non-input element");
      const c = a.target.name, p = a.target.value;
      e.modifySelectedTags(a.target.checked, { category: c, topic: p });
    }, u = (a, c) => {
      var v;
      const p = e.getselectedtags();
      if (!p[c] || (v = p[c]) != null && v.includes(
        a
      ))
        return null;
      const d = JSON.parse(
        JSON.stringify(e.getselectedtags())
      );
      d[c].includes(a) || d[c].push(a);
      const m = e.allQs;
      return Mt(
        m,
        d
      ).length.toString();
    };
    return (a, c) => (g(), b("ul", null, [
      (g(!0), b(R, null, tt(i.value, ({ idx: p, num: d, topic: m, questionamount: v }) => (g(), b("li", {
        key: p,
        class: F(["filter-options", { "grey-out": d === "0" }])
      }, [
        h("input", {
          id: `${a.category}-${m}-checkbox`,
          type: "checkbox",
          name: a.category,
          value: m,
          disabled: d === "0",
          onChange: c[0] || (c[0] = (q) => r(q))
        }, null, 40, Hn),
        h("label", {
          for: `${a.category}-${m}-checkbox`
        }, [
          Kt(k(o(m)) + " ", 1),
          d !== null && d !== "0" ? (g(), b("span", Jn, k(v), 1)) : N("", !0)
        ], 8, Gn)
      ], 2))), 128))
    ]));
  }
}), Yn = /* @__PURE__ */ V(Wn, [["__scopeId", "data-v-43544b02"]]), Kn = {
  key: 0,
  class: "filter"
}, Xn = { class: "category-heading" }, Zn = /* @__PURE__ */ I({
  __name: "MCQTagOptions",
  setup(t) {
    const s = T([]), n = z();
    let e = {};
    return Ct(
      () => n.allQs,
      (o, i) => {
        n.setTagsset(), s.value = n.getTagsets(), e = fe(s.value);
      }
    ), (o, i) => S(n).allQs ? (g(), b("div", Kn, [
      (g(!0), b(R, null, tt(Object.entries(S(e)), ([r, u]) => (g(), b("div", {
        key: r,
        class: "category"
      }, [
        h("h2", Xn, k(r), 1),
        et(Yn, {
          category: r,
          topics: u
        }, null, 8, ["category", "topics"])
      ]))), 128))
    ])) : N("", !0);
  }
}), ts = /* @__PURE__ */ V(Zn, [["__scopeId", "data-v-9ddbcbf8"]]), es = { for: "optionName" }, ns = ["value"], ss = /* @__PURE__ */ I({
  __name: "DropDownbox",
  props: {
    options: {},
    optionName: {},
    disabled: { type: Boolean }
  },
  setup(t) {
    const s = z(), n = T(0);
    function e(o) {
      const i = o.target;
      i.value && (n.value = parseFloat(i.value) * 60, s.setTimeLimit(n.value));
    }
    return (o, i) => (g(), b("div", {
      class: F(o.disabled ? "dropdown input-disabled" : "dropdown")
    }, [
      h("label", es, k(o.optionName) + ":   ", 1),
      h("select", {
        id: "optionName",
        name: "optionName",
        onChange: e
      }, [
        (g(!0), b(R, null, tt(o.options, (r) => (g(), b("option", {
          key: r.value,
          value: r.value
        }, k(r.value) + " " + k(r.unit), 9, ns))), 128))
      ], 32)
    ], 2));
  }
}), os = /* @__PURE__ */ V(ss, [["__scopeId", "data-v-5f3ae97a"]]), ct = (t) => (Jt("data-v-c3d686ea"), t = t(), Wt(), t), is = { class: "start-page-container" }, rs = /* @__PURE__ */ ct(() => /* @__PURE__ */ h("h1", null, "VetCloud Smart Quiz", -1)), as = { class: "quiz-config-container" }, us = { class: "question-config-container" }, cs = { class: "tag-text" }, ls = { class: "question-number" }, ds = { class: "question-amount-container" }, fs = /* @__PURE__ */ ct(() => /* @__PURE__ */ h("label", { for: "question-amount" }, "Select the amount of questions:", -1)), ps = ["max"], ms = {
  key: 0,
  class: "show-max-msg"
}, hs = /* @__PURE__ */ ct(() => /* @__PURE__ */ h("label", { for: "mode-select" }, "Select mode:", -1)), gs = /* @__PURE__ */ ct(() => /* @__PURE__ */ h("option", { value: "Tutor" }, "Tutor", -1)), _s = /* @__PURE__ */ ct(() => /* @__PURE__ */ h("option", { value: "Timed" }, "Timed", -1)), vs = [
  gs,
  _s
], bs = 3e3, ys = /* @__PURE__ */ I({
  __name: "StartPage",
  emits: ["start-quiz"],
  setup(t, { emit: s }) {
    const n = T(1), e = T("Tutor"), o = T(!1), i = T(null), r = s, u = z();
    bt(() => {
      ke(() => {
        const p = u.getquestionnumber();
        n.value = Math.min(10, p);
      });
    });
    const a = () => {
      r("start-quiz", {
        questionAmount: n.value,
        mode: e.value
      });
    }, c = () => {
      i.value && clearTimeout(i.value), n.value > u.getquestionnumber() && (n.value = u.getquestionnumber(), o.value = !0, i.value = window.setTimeout(() => {
        o.value = !1;
      }, bs));
    };
    return (p, d) => (g(), b("div", is, [
      rs,
      et(ts),
      h("div", as, [
        h("div", us, [
          h("p", cs, [
            Kt(" Maximum possible questions: "),
            h("span", ls, k(S(u).getquestionnumber()), 1)
          ]),
          h("div", ds, [
            fs,
            Vt(h("input", {
              id: "question-amount",
              "onUpdate:modelValue": d[0] || (d[0] = (m) => n.value = m),
              type: "number",
              placeholder: "Question amount",
              min: "1",
              max: S(u).getquestionnumber(),
              onInput: c
            }, null, 40, ps), [
              [
                $e,
                n.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o.value ? (g(), b("p", ms, " Cannot select more than " + k(S(u).getquestionnumber()) + " questions. ", 1)) : N("", !0),
          h("div", null, [
            hs,
            Vt(h("select", {
              id: "mode-select",
              "onUpdate:modelValue": d[1] || (d[1] = (m) => e.value = m)
            }, vs, 512), [
              [qe, e.value]
            ])
          ]),
          et(os, {
            options: [
              { value: 1, label: "Time Option 2", unit: "Min." },
              { value: 1.5, label: "Time Option 1", unit: "Min." }
            ],
            "option-name": "Time per Question",
            class: F(e.value === "Timed" ? "" : "input-disabled"),
            disabled: e.value !== "Timed"
          }, null, 8, ["class", "disabled"])
        ])
      ]),
      h("button", {
        class: "start-button",
        onClick: a
      }, "Start")
    ]));
  }
}), Ss = /* @__PURE__ */ V(ys, [["__scopeId", "data-v-c3d686ea"]]), Ts = (t) => t.trim().toLowerCase().replace("_", " "), ws = (t) => t.reduce((s, n) => {
  if (!n.includes(":")) return s;
  let [e, o] = n.split(":");
  return [e, o] = [e.trim().toLowerCase(), Ts(o)], s[e] ? s[e] = [...s[e], o] : s[e] = [o], s;
}, {}), Qs = (t) => t.map((s) => ({
  _id: { $oid: s._id.$oid },
  statement: s.statement,
  tags: ws(s.tags),
  optionsList: s.optionsList,
  link: s.link
})), Os = { convertQuestions: Qs }, P = {
  isString: (r) => typeof r == "string",
  isObject: (r) => typeof r == "object" && r !== null,
  isBoolean: (r) => typeof r == "boolean",
  isArray: (r, u) => Array.isArray(r) && r.every(u),
  isNumber: (r) => typeof r == "number",
  isFunction: (r) => typeof r == "function"
};
function qt(t) {
  const s = t.includes(":") && t.split(":").length === 2, n = !t.includes(":") && !t.includes(" ");
  return s || n;
}
function ge(t, s = !1) {
  return P.isArray(t, P.isString) ? s ? t.every(qt) : t.some(qt) : !1;
}
function Es(t) {
  return P.isObject(t) && P.isString(t.optionValue) && (t.optionCorrect === void 0 || P.isBoolean(t.optionCorrect));
}
function _e(t) {
  return P.isObject(t) && P.isObject(t._id) && // Assuming _id is an object with $oid property
  P.isString(t._id.$oid) && P.isString(t.statement) && ge(t.tags) && // Modified to ensure tags are always checked
  P.isArray(t.optionsList, Es) && P.isString(t.link);
}
function ks(t) {
  return P.isArray(t, _e);
}
const pt = {
  isMCQuestion: _e,
  isMCQuestionArray: ks,
  validateTags: ge,
  isTag: qt
}, Ht = (t) => {
  try {
    if (!t)
      throw new Error("No question data found. Please Try again later.");
    return Os.convertQuestions($s(t));
  } catch (s) {
    return alert(s), [];
  }
};
function $s(t) {
  pt.isMCQuestionArray(t) ? console.info(
    "%cAll questions are valid",
    "color: #00FF00",
    `
Total Questions Validated:`,
    t.length
  ) : console.warn(
    "%cWARNING: Some questions contains invalid structure",
    "color: #FF0000"
  );
  const s = {
    invalidTags: 0,
    noTags: 0,
    invalidQs: 0,
    totalTags: 0
  }, n = t.reduce((e, o) => {
    if (!pt.isMCQuestion(o))
      return { ...e, invalidQs: e.invalidQs + 1 };
    let { tags: i } = o;
    if (!i || Array.isArray(i) && !i.length)
      return { ...e, noTags: e.noTags + 1 };
    const r = e.totalTags + i.length;
    if (!pt.validateTags(i, !0)) {
      const u = i.filter((c) => pt.isTag(c)), a = e.invalidTags + i.length - u.length;
      return i = u, { ...e, invalidTags: a, totalTags: r };
    }
    return { ...e, totalTags: r };
  }, s);
  return qs(n, t.length), t;
}
function wt(t, s) {
  t && console.warn(s, "color: #FF0000");
}
function qs(t, s) {
  const { invalidQs: n, invalidTags: e, noTags: o, totalTags: i } = t;
  wt(
    n,
    `Invalid Questions Received: %c${n} out of ${s}`
  ), wt(
    e,
    `Filtering out invalid tags: %c${e} out of ${i}`
  ), wt(o, `Questions with no tags: %c${o}`);
}
const Ns = /* @__PURE__ */ I({
  __name: "CrucibleComponent",
  props: {
    level: {
      type: Number,
      default: 5
    }
  },
  setup(t) {
    const s = t, n = T(0), e = z(), o = T(!1), i = T([]), r = Nt("$dataLink"), { level: u } = Qt(s);
    Yt(async () => {
      const p = await (async () => (await (await fetch(`${r}?level=${u.value}`)).json()).questions)();
      i.value = Ht(p), e.allQs = i.value;
      const d = fe(
        i.value.map((m) => m.tags)
      );
      e.setselectedTags(
        Object.keys(d).reduce((m, v) => ({ ...m, [v]: [] }), {})
      ), e.setTagsset();
    });
    const a = ({ questionAmount: c, mode: p }) => {
      const d = e.getselectedtags();
      if (!i.value.length)
        return alert("Trouble fetching questions, please try again later");
      const m = Mt(
        i.value,
        d
      ), v = hn(c, m);
      n.value = v.length, e.initialiseQuiz(v, p), p === "Timed" && e.setTimeLimit(c * e.timeLimit), o.value = !0;
    };
    return (c, p) => o.value && S(e).quizMode === "Tutor" ? (g(), j(jn, { key: 0 })) : o.value && S(e).quizMode === "Timed" ? (g(), j(Bn, { key: 1 })) : (g(), j(Ss, {
      key: 2,
      onStartQuiz: a
    }));
  }
}), Cs = {
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
}, ve = async (t, s) => {
};
function As(t, s = {}) {
  const n = tn();
  t.use(n), t.component("CrucibleComponent", Ns), t.provide("$dataLink", s.dataLink || Cs), t.provide(
    "$updateQAttemptCallback",
    s.updateQAttemptCallback || ve
  );
}
export {
  Ns as CrucibleComponent,
  As as createViewerPlugin,
  Cs as defaultData,
  ve as defaultUpdateQAttemptCallback
};
