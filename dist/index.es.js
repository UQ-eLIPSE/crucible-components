import { effectScope as Fe, ref as w, markRaw as G, hasInjectionContext as yt, inject as Be, getCurrentInstance as St, toRaw as ge, watch as He, reactive as Tt, isRef as re, isReactive as Ne, toRef as Se, nextTick as Pe, computed as qe, unref as T, getCurrentScope as wt, onScopeDispose as Et, toRefs as Me, defineComponent as q, openBlock as h, createElementBlock as g, Fragment as U, normalizeClass as R, createElementVNode as p, toDisplayString as Q, renderList as Z, createVNode as ee, createBlock as V, createCommentVNode as N, pushScopeId as Ge, popScopeId as Je, onMounted as We, resolveComponent as Ot, onBeforeMount as Ye, createTextVNode as Ke, withDirectives as xe, vModelText as kt, vModelSelect as Qt } from "vue";
var Xe = !1;
function de(e, s, n) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, s), e.splice(s, 1, n), n) : (e[s] = n, n);
}
function Te(e, s) {
  if (Array.isArray(e)) {
    e.splice(s, 1);
    return;
  }
  delete e[s];
}
function $t() {
  return Ze().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Ze() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Nt = typeof Proxy == "function", qt = "devtools-plugin:setup", It = "plugin:settings:set";
let Y, Ee;
function Ct() {
  var e;
  return Y !== void 0 || (typeof window < "u" && window.performance ? (Y = !0, Ee = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Y = !0, Ee = globalThis.perf_hooks.performance) : Y = !1), Y;
}
function Lt() {
  return Ct() ? Ee.now() : Date.now();
}
class Pt {
  constructor(s, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = s, this.hook = n;
    const t = {};
    if (s.settings)
      for (const r in s.settings) {
        const i = s.settings[r];
        t[r] = i.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${s.id}`;
    let a = Object.assign({}, t);
    try {
      const r = localStorage.getItem(o), i = JSON.parse(r);
      Object.assign(a, i);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return a;
      },
      setSettings(r) {
        try {
          localStorage.setItem(o, JSON.stringify(r));
        } catch {
        }
        a = r;
      },
      now() {
        return Lt();
      }
    }, n && n.on(It, (r, i) => {
      r === this.plugin.id && this.fallbacks.setSettings(i);
    }), this.proxiedOn = new Proxy({}, {
      get: (r, i) => this.target ? this.target.on[i] : (...u) => {
        this.onQueue.push({
          method: i,
          args: u
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (r, i) => this.target ? this.target[i] : i === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(i) ? (...u) => (this.targetQueue.push({
        method: i,
        args: u,
        resolve: () => {
        }
      }), this.fallbacks[i](...u)) : (...u) => new Promise((c) => {
        this.targetQueue.push({
          method: i,
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
function et(e, s) {
  const n = e, t = Ze(), o = $t(), a = Nt && n.enableEarlyProxy;
  if (o && (t.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a))
    o.emit(qt, e, s);
  else {
    const r = a ? new Pt(n, o) : null;
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
let oe;
const ae = (e) => oe = e, tt = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
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
const ve = typeof window < "u", ie = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && ve, Ae = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function Mt(e, { autoBom: s = !1 } = {}) {
  return s && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Ie(e, s, n) {
  const t = new XMLHttpRequest();
  t.open("GET", e), t.responseType = "blob", t.onload = function() {
    ot(t.response, s, n);
  }, t.onerror = function() {
    console.error("could not download file");
  }, t.send();
}
function nt(e) {
  const s = new XMLHttpRequest();
  s.open("HEAD", e, !1);
  try {
    s.send();
  } catch {
  }
  return s.status >= 200 && s.status <= 299;
}
function pe(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const n = document.createEvent("MouseEvents");
    n.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(n);
  }
}
const he = typeof navigator == "object" ? navigator : { userAgent: "" }, st = /Macintosh/.test(he.userAgent) && /AppleWebKit/.test(he.userAgent) && !/Safari/.test(he.userAgent), ot = ve ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !st ? xt : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in he ? At : (
      // Fallback to using FileReader and a popup
      Vt
    )
  )
) : () => {
};
function xt(e, s = "download", n) {
  const t = document.createElement("a");
  t.download = s, t.rel = "noopener", typeof e == "string" ? (t.href = e, t.origin !== location.origin ? nt(t.href) ? Ie(e, s, n) : (t.target = "_blank", pe(t)) : pe(t)) : (t.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(t.href);
  }, 4e4), setTimeout(function() {
    pe(t);
  }, 0));
}
function At(e, s = "download", n) {
  if (typeof e == "string")
    if (nt(e))
      Ie(e, s, n);
    else {
      const t = document.createElement("a");
      t.href = e, t.target = "_blank", setTimeout(function() {
        pe(t);
      });
    }
  else
    navigator.msSaveOrOpenBlob(Mt(e, n), s);
}
function Vt(e, s, n, t) {
  if (t = t || open("", "_blank"), t && (t.document.title = t.document.body.innerText = "downloading..."), typeof e == "string")
    return Ie(e, s, n);
  const o = e.type === "application/octet-stream", a = /constructor/i.test(String(Ae.HTMLElement)) || "safari" in Ae, r = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((r || o && a || st) && typeof FileReader < "u") {
    const i = new FileReader();
    i.onloadend = function() {
      let u = i.result;
      if (typeof u != "string")
        throw t = null, new Error("Wrong reader.result type");
      u = r ? u : u.replace(/^data:[^;]*;/, "data:attachment/file;"), t ? t.location.href = u : location.assign(u), t = null;
    }, i.readAsDataURL(e);
  } else {
    const i = URL.createObjectURL(e);
    t ? t.location.assign(i) : location.href = i, t = null, setTimeout(function() {
      URL.revokeObjectURL(i);
    }, 4e4);
  }
}
function O(e, s) {
  const n = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, s) : s === "error" ? console.error(n) : s === "warn" ? console.warn(n) : console.log(n);
}
function Ce(e) {
  return "_a" in e && "install" in e;
}
function it() {
  if (!("clipboard" in navigator))
    return O("Your browser doesn't support the Clipboard API", "error"), !0;
}
function rt(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (O('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Dt(e) {
  if (!it())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), O("Global state copied to clipboard.");
    } catch (s) {
      if (rt(s))
        return;
      O("Failed to serialize the state. Check the console for more details.", "error"), console.error(s);
    }
}
async function jt(e) {
  if (!it())
    try {
      at(e, JSON.parse(await navigator.clipboard.readText())), O("Global state pasted from clipboard.");
    } catch (s) {
      if (rt(s))
        return;
      O("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(s);
    }
}
async function zt(e) {
  try {
    ot(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (s) {
    O("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(s);
  }
}
let z;
function Ut() {
  z || (z = document.createElement("input"), z.type = "file", z.accept = ".json");
  function e() {
    return new Promise((s, n) => {
      z.onchange = async () => {
        const t = z.files;
        if (!t)
          return s(null);
        const o = t.item(0);
        return s(o ? { text: await o.text(), file: o } : null);
      }, z.oncancel = () => s(null), z.onerror = n, z.click();
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
    at(e, JSON.parse(t)), O(`Global state imported from "${o.name}".`);
  } catch (s) {
    O("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(s);
  }
}
function at(e, s) {
  for (const n in s) {
    const t = e.state.value[n];
    t ? Object.assign(t, s[n]) : e.state.value[n] = s[n];
  }
}
function A(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const ut = "🍍 Pinia (root)", Oe = "_root";
function Ft(e) {
  return Ce(e) ? {
    id: Oe,
    label: ut
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Bt(e) {
  if (Ce(e)) {
    const n = Array.from(e._s.keys()), t = e._s;
    return {
      state: n.map((a) => ({
        editable: !0,
        key: a,
        value: e.state.value[a]
      })),
      getters: n.filter((a) => t.get(a)._getters).map((a) => {
        const r = t.get(a);
        return {
          editable: !1,
          key: a,
          value: r._getters.reduce((i, u) => (i[u] = r[u], i), {})
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
    operation: A(e.type),
    key: A(e.key),
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
let X = !0;
const me = [], H = "pinia:mutations", k = "pinia", { assign: Jt } = Object, _e = (e) => "🍍 " + e;
function Wt(e, s) {
  et({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: me,
    app: e
  }, (n) => {
    typeof n.now != "function" && O("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
      id: H,
      label: "Pinia 🍍",
      color: 15064968
    }), n.addInspector({
      id: k,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            Dt(s);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await jt(s), n.sendInspectorTree(k), n.sendInspectorState(k);
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
            await Rt(s), n.sendInspectorTree(k), n.sendInspectorState(k);
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
            o ? typeof o.$reset != "function" ? O(`Cannot reset "${t}" store because it doesn't have a "$reset" method implemented.`, "warn") : (o.$reset(), O(`Store "${t}" reset.`)) : O(`Cannot reset "${t}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((t, o) => {
      const a = t.componentInstance && t.componentInstance.proxy;
      if (a && a._pStores) {
        const r = t.componentInstance.proxy._pStores;
        Object.values(r).forEach((i) => {
          t.instanceData.state.push({
            type: _e(i.$id),
            key: "state",
            editable: !0,
            value: i._isOptionsAPI ? {
              _custom: {
                value: ge(i.$state),
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
              Object.keys(i.$state).reduce((u, c) => (u[c] = i.$state[c], u), {})
            )
          }), i._getters && i._getters.length && t.instanceData.state.push({
            type: _e(i.$id),
            key: "getters",
            editable: !1,
            value: i._getters.reduce((u, c) => {
              try {
                u[c] = i[c];
              } catch (_) {
                u[c] = _;
              }
              return u;
            }, {})
          });
        });
      }
    }), n.on.getInspectorTree((t) => {
      if (t.app === e && t.inspectorId === k) {
        let o = [s];
        o = o.concat(Array.from(s._s.values())), t.rootNodes = (t.filter ? o.filter((a) => "$id" in a ? a.$id.toLowerCase().includes(t.filter.toLowerCase()) : ut.toLowerCase().includes(t.filter.toLowerCase())) : o).map(Ft);
      }
    }), n.on.getInspectorState((t) => {
      if (t.app === e && t.inspectorId === k) {
        const o = t.nodeId === Oe ? s : s._s.get(t.nodeId);
        if (!o)
          return;
        o && (t.state = Bt(o));
      }
    }), n.on.editInspectorState((t, o) => {
      if (t.app === e && t.inspectorId === k) {
        const a = t.nodeId === Oe ? s : s._s.get(t.nodeId);
        if (!a)
          return O(`store "${t.nodeId}" not found`, "error");
        const { path: r } = t;
        Ce(a) ? r.unshift("state") : (r.length !== 1 || !a._customProperties.has(r[0]) || r[0] in a.$state) && r.unshift("$state"), X = !1, t.set(a, r, t.state.value), X = !0;
      }
    }), n.on.editComponentState((t) => {
      if (t.type.startsWith("🍍")) {
        const o = t.type.replace(/^🍍\s*/, ""), a = s._s.get(o);
        if (!a)
          return O(`store "${o}" not found`, "error");
        const { path: r } = t;
        if (r[0] !== "state")
          return O(`Invalid path for store "${o}":
${r}
Only state can be modified.`);
        r[0] = "$state", X = !1, t.set(a, r, t.state.value), X = !0;
      }
    });
  });
}
function Yt(e, s) {
  me.includes(_e(s.$id)) || me.push(_e(s.$id)), et({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: me,
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
    s.$onAction(({ after: r, onError: i, name: u, args: c }) => {
      const _ = ct++;
      n.addTimelineEvent({
        layerId: H,
        event: {
          time: t(),
          title: "🛫 " + u,
          subtitle: "start",
          data: {
            store: A(s.$id),
            action: A(u),
            args: c
          },
          groupId: _
        }
      }), r((m) => {
        F = void 0, n.addTimelineEvent({
          layerId: H,
          event: {
            time: t(),
            title: "🛬 " + u,
            subtitle: "end",
            data: {
              store: A(s.$id),
              action: A(u),
              args: c,
              result: m
            },
            groupId: _
          }
        });
      }), i((m) => {
        F = void 0, n.addTimelineEvent({
          layerId: H,
          event: {
            time: t(),
            logType: "error",
            title: "💥 " + u,
            subtitle: "end",
            data: {
              store: A(s.$id),
              action: A(u),
              args: c,
              error: m
            },
            groupId: _
          }
        });
      });
    }, !0), s._customProperties.forEach((r) => {
      He(() => T(s[r]), (i, u) => {
        n.notifyComponentUpdate(), n.sendInspectorState(k), X && n.addTimelineEvent({
          layerId: H,
          event: {
            time: t(),
            title: "Change",
            subtitle: r,
            data: {
              newValue: i,
              oldValue: u
            },
            groupId: F
          }
        });
      }, { deep: !0 });
    }), s.$subscribe(({ events: r, type: i }, u) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState(k), !X)
        return;
      const c = {
        time: t(),
        title: Gt(i),
        data: Jt({ store: A(s.$id) }, Ht(r)),
        groupId: F
      };
      i === D.patchFunction ? c.subtitle = "⤵️" : i === D.patchObject ? c.subtitle = "🧩" : r && !Array.isArray(r) && (c.subtitle = r.type), r && (c.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: r
        }
      }), n.addTimelineEvent({
        layerId: H,
        event: c
      });
    }, { detached: !0, flush: "sync" });
    const o = s._hotUpdate;
    s._hotUpdate = G((r) => {
      o(r), n.addTimelineEvent({
        layerId: H,
        event: {
          time: t(),
          title: "🔥 " + s.$id,
          subtitle: "HMR update",
          data: {
            store: A(s.$id),
            info: A("HMR update")
          }
        }
      }), n.notifyComponentUpdate(), n.sendInspectorTree(k), n.sendInspectorState(k);
    });
    const { $dispose: a } = s;
    s.$dispose = () => {
      a(), n.notifyComponentUpdate(), n.sendInspectorTree(k), n.sendInspectorState(k), n.getSettings().logStoreChanges && O(`Disposed "${s.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree(k), n.sendInspectorState(k), n.getSettings().logStoreChanges && O(`"${s.$id}" store installed 🆕`);
  });
}
let ct = 0, F;
function Ve(e, s, n) {
  const t = s.reduce((o, a) => (o[a] = ge(e)[a], o), {});
  for (const o in t)
    e[o] = function() {
      const a = ct, r = n ? new Proxy(e, {
        get(...u) {
          return F = a, Reflect.get(...u);
        },
        set(...u) {
          return F = a, Reflect.set(...u);
        }
      }) : e;
      F = a;
      const i = t[o].apply(r, arguments);
      return F = void 0, i;
    };
}
function Kt({ app: e, store: s, options: n }) {
  if (s.$id.startsWith("__hot:"))
    return;
  s._isOptionsAPI = !!n.state, Ve(s, Object.keys(n.actions), s._isOptionsAPI);
  const t = s._hotUpdate;
  ge(s)._hotUpdate = function(o) {
    t.apply(this, arguments), Ve(s, Object.keys(o._hmrPayload.actions), !!s._isOptionsAPI);
  }, Yt(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    s
  );
}
function Xt() {
  const e = Fe(!0), s = e.run(() => w({}));
  let n = [], t = [];
  const o = G({
    install(a) {
      ae(o), o._a = a, a.provide(tt, o), a.config.globalProperties.$pinia = o, ie && Wt(a, o), t.forEach((r) => n.push(r)), t = [];
    },
    use(a) {
      return !this._a && !Xe ? t.push(a) : n.push(a), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: s
  });
  return ie && typeof Proxy < "u" && o.use(Kt), o;
}
function lt(e, s) {
  for (const n in s) {
    const t = s[n];
    if (!(n in e))
      continue;
    const o = e[n];
    J(o) && J(t) && !re(t) && !Ne(t) ? e[n] = lt(o, t) : e[n] = t;
  }
  return e;
}
const dt = () => {
};
function De(e, s, n, t = dt) {
  e.push(s);
  const o = () => {
    const a = e.indexOf(s);
    a > -1 && (e.splice(a, 1), t());
  };
  return !n && wt() && Et(o), o;
}
function K(e, ...s) {
  e.slice().forEach((n) => {
    n(...s);
  });
}
const Zt = (e) => e();
function ke(e, s) {
  e instanceof Map && s instanceof Map && s.forEach((n, t) => e.set(t, n)), e instanceof Set && s instanceof Set && s.forEach(e.add, e);
  for (const n in s) {
    if (!s.hasOwnProperty(n))
      continue;
    const t = s[n], o = e[n];
    J(o) && J(t) && e.hasOwnProperty(n) && !re(t) && !Ne(t) ? e[n] = ke(o, t) : e[n] = t;
  }
  return e;
}
const en = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function tn(e) {
  return !J(e) || !e.hasOwnProperty(en);
}
const { assign: L } = Object;
function je(e) {
  return !!(re(e) && e.effect);
}
function ze(e, s, n, t) {
  const { state: o, actions: a, getters: r } = s, i = n.state.value[e];
  let u;
  function c() {
    !i && (process.env.NODE_ENV === "production" || !t) && (n.state.value[e] = o ? o() : {});
    const _ = process.env.NODE_ENV !== "production" && t ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Me(w(o ? o() : {}).value)
    ) : Me(n.state.value[e]);
    return L(_, a, Object.keys(r || {}).reduce((m, v) => (process.env.NODE_ENV !== "production" && v in _ && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${v}" in store "${e}".`), m[v] = G(qe(() => {
      ae(n);
      const E = n._s.get(e);
      return r[v].call(E, E);
    })), m), {}));
  }
  return u = Qe(e, c, s, n, t, !0), u;
}
function Qe(e, s, n = {}, t, o, a) {
  let r;
  const i = L({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !t._e.active)
    throw new Error("Pinia destroyed");
  const u = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Xe && (u.onTrigger = (f) => {
    c ? E = f : c == !1 && !d._hotUpdating && (Array.isArray(E) ? E.push(f) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let c, _, m = [], v = [], E;
  const x = t.state.value[e];
  !a && !x && (process.env.NODE_ENV === "production" || !o) && (t.state.value[e] = {});
  const W = w({});
  let ce;
  function te(f) {
    let l;
    c = _ = !1, process.env.NODE_ENV !== "production" && (E = []), typeof f == "function" ? (f(t.state.value[e]), l = {
      type: D.patchFunction,
      storeId: e,
      events: E
    }) : (ke(t.state.value[e], f), l = {
      type: D.patchObject,
      payload: f,
      storeId: e,
      events: E
    });
    const y = ce = Symbol();
    Pe().then(() => {
      ce === y && (c = !0);
    }), _ = !0, K(m, l, t.state.value[e]);
  }
  const be = a ? function() {
    const { state: l } = n, y = l ? l() : {};
    this.$patch(($) => {
      L($, y);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : dt
  );
  function ye() {
    r.stop(), m = [], v = [], t._s.delete(e);
  }
  function le(f, l) {
    return function() {
      ae(t);
      const y = Array.from(arguments), $ = [], ne = [];
      function vt(C) {
        $.push(C);
      }
      function bt(C) {
        ne.push(C);
      }
      K(v, {
        args: y,
        name: f,
        store: d,
        after: vt,
        onError: bt
      });
      let se;
      try {
        se = l.apply(this && this.$id === e ? this : d, y);
      } catch (C) {
        throw K(ne, C), C;
      }
      return se instanceof Promise ? se.then((C) => (K($, C), C)).catch((C) => (K(ne, C), Promise.reject(C))) : (K($, se), se);
    };
  }
  const b = /* @__PURE__ */ G({
    actions: {},
    getters: {},
    state: [],
    hotState: W
  }), S = {
    _p: t,
    // _s: scope,
    $id: e,
    $onAction: De.bind(null, v),
    $patch: te,
    $reset: be,
    $subscribe(f, l = {}) {
      const y = De(m, f, l.detached, () => $()), $ = r.run(() => He(() => t.state.value[e], (ne) => {
        (l.flush === "sync" ? _ : c) && f({
          storeId: e,
          type: D.direct,
          events: E
        }, ne);
      }, L({}, u, l)));
      return y;
    },
    $dispose: ye
  }, d = Tt(process.env.NODE_ENV !== "production" || ie ? L(
    {
      _hmrPayload: b,
      _customProperties: G(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    S
    // must be added later
    // setupStore
  ) : S);
  t._s.set(e, d);
  const I = (t._a && t._a.runWithContext || Zt)(() => t._e.run(() => (r = Fe()).run(s)));
  for (const f in I) {
    const l = I[f];
    if (re(l) && !je(l) || Ne(l))
      process.env.NODE_ENV !== "production" && o ? de(W.value, f, Se(I, f)) : a || (x && tn(l) && (re(l) ? l.value = x[f] : ke(l, x[f])), t.state.value[e][f] = l), process.env.NODE_ENV !== "production" && b.state.push(f);
    else if (typeof l == "function") {
      const y = process.env.NODE_ENV !== "production" && o ? l : le(f, l);
      I[f] = y, process.env.NODE_ENV !== "production" && (b.actions[f] = l), i.actions[f] = l;
    } else
      process.env.NODE_ENV !== "production" && je(l) && (b.getters[f] = a ? (
        // @ts-expect-error
        n.getters[f]
      ) : l, ve && (I._getters || // @ts-expect-error: same
      (I._getters = G([]))).push(f));
  }
  if (L(d, I), L(ge(d), I), Object.defineProperty(d, "$state", {
    get: () => process.env.NODE_ENV !== "production" && o ? W.value : t.state.value[e],
    set: (f) => {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error("cannot set hotState");
      te((l) => {
        L(l, f);
      });
    }
  }), process.env.NODE_ENV !== "production" && (d._hotUpdate = G((f) => {
    d._hotUpdating = !0, f._hmrPayload.state.forEach((l) => {
      if (l in d.$state) {
        const y = f.$state[l], $ = d.$state[l];
        typeof y == "object" && J(y) && J($) ? lt(y, $) : f.$state[l] = $;
      }
      de(d, l, Se(f.$state, l));
    }), Object.keys(d.$state).forEach((l) => {
      l in f.$state || Te(d, l);
    }), c = !1, _ = !1, t.state.value[e] = Se(f._hmrPayload, "hotState"), _ = !0, Pe().then(() => {
      c = !0;
    });
    for (const l in f._hmrPayload.actions) {
      const y = f[l];
      de(d, l, le(l, y));
    }
    for (const l in f._hmrPayload.getters) {
      const y = f._hmrPayload.getters[l], $ = a ? (
        // special handling of options api
        qe(() => (ae(t), y.call(d, d)))
      ) : y;
      de(d, l, $);
    }
    Object.keys(d._hmrPayload.getters).forEach((l) => {
      l in f._hmrPayload.getters || Te(d, l);
    }), Object.keys(d._hmrPayload.actions).forEach((l) => {
      l in f._hmrPayload.actions || Te(d, l);
    }), d._hmrPayload = f._hmrPayload, d._getters = f._getters, d._hotUpdating = !1;
  })), ie) {
    const f = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((l) => {
      Object.defineProperty(d, l, L({ value: d[l] }, f));
    });
  }
  return t._p.forEach((f) => {
    if (ie) {
      const l = r.run(() => f({
        store: d,
        app: t._a,
        pinia: t,
        options: i
      }));
      Object.keys(l || {}).forEach((y) => d._customProperties.add(y)), L(d, l);
    } else
      L(d, r.run(() => f({
        store: d,
        app: t._a,
        pinia: t,
        options: i
      })));
  }), process.env.NODE_ENV !== "production" && d.$state && typeof d.$state == "object" && typeof d.$state.constructor == "function" && !d.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${d.$id}".`), x && a && n.hydrate && n.hydrate(d.$state, x), c = !0, _ = !0, d;
}
function nn(e, s, n) {
  let t, o;
  const a = typeof s == "function";
  if (typeof e == "string")
    t = e, o = a ? n : s;
  else if (o = e, t = e.id, process.env.NODE_ENV !== "production" && typeof t != "string")
    throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
  function r(i, u) {
    const c = yt();
    if (i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && oe && oe._testing ? null : i) || (c ? Be(tt, null) : null), i && ae(i), process.env.NODE_ENV !== "production" && !oe)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    i = oe, i._s.has(t) || (a ? Qe(t, s, o, i) : ze(t, o, i), process.env.NODE_ENV !== "production" && (r._pinia = i));
    const _ = i._s.get(t);
    if (process.env.NODE_ENV !== "production" && u) {
      const m = "__hot:" + t, v = a ? Qe(m, s, o, i, !0) : ze(m, L({}, o), i, !0);
      u._hotUpdate(v), delete i.state.value[m], i._s.delete(m);
    }
    if (process.env.NODE_ENV !== "production" && ve) {
      const m = St();
      if (m && m.proxy && // avoid adding stores that are just built for hot module replacement
      !u) {
        const v = m.proxy, E = "_pStores" in v ? v._pStores : v._pStores = {};
        E[t] = _;
      }
    }
    return _;
  }
  return r.$id = t, r;
}
const sn = ["id", "checked"], on = ["for", "innerHTML"], rn = /* @__PURE__ */ q({
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
    return (o, a) => (h(), g(U, null, [
      (h(), g("input", {
        id: "option-" + o.optionKey,
        key: o.optionKey,
        "test-id": "radio_options",
        type: "radio",
        name: "options",
        checked: o.checked,
        class: R(o.submitted && "ignore-hover")
      }, null, 10, sn)),
      (h(), g("label", {
        key: o.optionKey,
        for: "option-" + o.optionKey,
        class: R(o.submitted ? "mcq-option-label ignore-hover" : "mcq-option-label"),
        onClick: a[0] || (a[0] = (r) => t()),
        innerHTML: o.option.optionValue
      }, null, 10, on))
    ], 64));
  }
}), M = (e, s) => {
  const n = e.__vccOpts || e;
  for (const [t, o] of s)
    n[t] = o;
  return n;
}, an = /* @__PURE__ */ M(rn, [["__scopeId", "data-v-fdbfedc6"]]), un = ["disabled"], cn = /* @__PURE__ */ q({
  __name: "MCQButton",
  props: {
    submitted: { type: Boolean },
    selectedOption: {},
    hideSkip: { type: Boolean }
  },
  emits: ["submitAnswer", "nextQuestion", "skipQuestion"],
  setup(e, { emit: s }) {
    const n = w("skip"), t = w("Skip"), o = s, a = (u, c) => {
      !u && c ? r("next", "Next", "submitAnswer") : u && c ? r("skip", "Skip", "nextQuestion") : !u && !c && r("skip", "Skip", "skipQuestion");
    }, r = (u, c, _) => {
      n.value = u, t.value = c, o(_);
    }, i = (u, c) => u && c ? { class: "next", text: "Next" } : !u && c ? { class: "submit", text: "Submit" } : { class: n.value, text: t.value };
    return (u, c) => (h(), g("div", null, [
      p("button", {
        disabled: u.hideSkip && i(u.submitted, u.selectedOption).class === "skip",
        class: R(["mcq-button", i(u.submitted, u.selectedOption).class]),
        onClick: c[0] || (c[0] = (_) => a(u.submitted, u.selectedOption))
      }, Q(i(u.submitted, u.selectedOption).text), 11, un)
    ]));
  }
}), ln = /* @__PURE__ */ M(cn, [["__scopeId", "data-v-847b8dd5"]]), dn = /* @__PURE__ */ q({
  __name: "NextButton",
  props: {
    buttonName: {}
  },
  emits: ["nextQuestion", "prevQuestion"],
  setup(e, { emit: s }) {
    const { buttonName: n } = e, t = s, o = () => {
      a(n !== "←" ? "nextQuestion" : "prevQuestion");
    }, a = (r) => {
      t(r);
    };
    return (r, i) => (h(), g("div", null, [
      p("button", {
        class: R(r.buttonName === "Submit" ? "submit_btn" : "mcq-button"),
        onClick: i[0] || (i[0] = (u) => o())
      }, Q(r.buttonName), 3)
    ]));
  }
}), Ue = /* @__PURE__ */ M(dn, [["__scopeId", "data-v-8be7f61e"]]), fn = (e) => {
  for (let s = e.length - 1; s > 0; s--) {
    const n = Math.floor(Math.random() * (s + 1));
    [e[s], e[n]] = [e[n], e[s]];
  }
  return e;
}, pn = (e, s) => fn(s).slice(0, e);
function ft(e) {
  const s = e.reduce(
    (t, o) => (Object.keys(o).forEach((a) => {
      typeof a == "string" && a.trim() !== "" && (t[a] || (t[a] = /* @__PURE__ */ new Set()), t[a].add(o[a]));
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
const pt = (e, s) => s.findIndex((n) => {
  var t;
  return ((t = n.question._id) == null ? void 0 : t.$oid) === e;
}), j = nn("questionsQueue", {
  state: () => ({
    allQs: [],
    questionsQueue: [],
    questionsStack: [],
    quizStats: [],
    quizMode: "Tutor",
    selectedTags: { course: [] },
    timeLimit: 60
    // default time limit 1 min per qs
  }),
  actions: {
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
      const t = pt(e, this.quizStats);
      if (this.quizStats[t]) {
        if (n !== void 0) {
          if (this.quizStats[t][s]++, n === "-1") {
            this.quizStats[t].selectedValue = "Reached Time Limit";
            return;
          }
          const o = this.quizStats[t].question.optionsList.map((a) => a.optionCorrect).indexOf(!0);
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
}), mn = ["innerHTML"], _n = { class: "mcq-list" }, gn = ["onClick"], vn = { class: "next-prev-question" }, bn = /* @__PURE__ */ q({
  __name: "MCQQuestion",
  props: {
    _id: {},
    statement: {},
    optionsList: {}
  },
  emits: ["nextQuestion", "skipQuestion", "prevQuestion"],
  setup(e, { emit: s }) {
    const n = j(), { statement: t, optionsList: o, _id: a } = e, r = w(null), i = w(!1), u = s, c = w(n.getRemainingQuestions()), _ = () => {
      i.value = !0;
    }, m = () => {
      r.value = null, u("nextQuestion");
    }, v = (b) => {
      W(b), c.value = n.getRemainingQuestions(), u("nextQuestion");
    }, E = () => {
      W(a), u("skipQuestion");
    }, x = (b) => n.incrementStat(
      b.$oid,
      "attempts",
      r.value ?? void 0
    ), W = (b) => {
      x(b), i.value = !1, r.value = null;
    }, ce = () => {
      r.value = null, u("prevQuestion");
    }, te = (b, S) => {
      i.value || (r.value = r.value === S ? null : S), x(b);
    }, be = (b, S, d) => n.quizMode === "Timed" ? ye(b, S) : le(S, d);
    function ye(b, S) {
      const d = pt(b.$oid, n.quizStats), B = n.quizStats[d].selectedValue, I = hn(
        n.quizStats,
        d,
        B
      );
      return String(I) === S ? (r.value = S, "selected") : "";
    }
    function le(b, S) {
      const d = S[parseInt(b)], B = r.value === b;
      return i.value ? d.optionCorrect ? "correct ignore-hover" : B ? "wrong ignore-hover" : "ignore-hover" : B ? "selected" : "";
    }
    return (b, S) => (h(), g(U, null, [
      p("div", {
        class: "mcq-statement",
        innerHTML: b.statement
      }, null, 8, mn),
      p("div", _n, [
        (h(!0), g(U, null, Z(Object.entries(b.optionsList), ([d, B]) => (h(), g("div", {
          key: d,
          class: R(["mcq-option", be(b._id, d, b.optionsList)]),
          onClick: (I) => te(b._id, d)
        }, [
          ee(an, {
            "option-key": d,
            checked: r.value === d,
            option: B,
            submitted: i.value,
            onSelectOption: (I) => te(b._id, d)
          }, null, 8, ["option-key", "checked", "option", "submitted", "onSelectOption"])
        ], 10, gn))), 128))
      ]),
      T(n).quizMode === "Tutor" ? (h(), V(ln, {
        key: 0,
        submitted: i.value,
        "selected-option": r.value,
        "hide-skip": c.value <= 1,
        onSubmitAnswer: _,
        onNextQuestion: S[0] || (S[0] = (d) => v(b._id)),
        onSkipQuestion: E
      }, null, 8, ["submitted", "selected-option", "hide-skip"])) : N("", !0),
      p("div", vn, [
        T(n).quizMode === "Timed" ? (h(), V(Ue, {
          key: 0,
          "button-name": T(n).questionsQueue.length >= 1 ? "→" : "Submit",
          onNextQuestion: S[1] || (S[1] = (d) => m())
        }, null, 8, ["button-name"])) : N("", !0),
        T(n).quizMode === "Timed" && T(n).questionsStack.length > 1 ? (h(), V(Ue, {
          key: 1,
          "button-name": "←",
          onPrevQuestion: S[2] || (S[2] = (d) => ce())
        })) : N("", !0)
      ])
    ], 64));
  }
}), ht = /* @__PURE__ */ M(bn, [["__scopeId", "data-v-fc502993"]]), yn = (e) => (Ge("data-v-4ffecbcd"), e = e(), Je(), e), Sn = { class: "report-container" }, Tn = { class: "mcq-report" }, wn = { class: "table-container" }, En = /* @__PURE__ */ yn(() => /* @__PURE__ */ p("thead", null, [
  /* @__PURE__ */ p("tr", null, [
    /* @__PURE__ */ p("th", null, "question"),
    /* @__PURE__ */ p("th", null, "correct option"),
    /* @__PURE__ */ p("th", null, "your answer")
  ])
], -1)), On = { class: "question-row" }, kn = ["href", "innerHTML"], Qn = { class: "answer-row" }, $n = ["innerHTML"], Nn = { class: "answer-row" }, qn = ["innerHTML"], In = { class: "mcq-result" }, Cn = { class: "score" }, Ln = /* @__PURE__ */ q({
  __name: "MCQStatus",
  setup(e) {
    const s = j(), n = s.quizStats, t = s.quizStats.length, o = n.filter((r) => r.correct === 1).length, a = (o * 100 / t).toFixed(0);
    return (r, i) => (h(), g("div", Sn, [
      p("div", Tn, [
        p("div", wn, [
          p("table", null, [
            En,
            p("tbody", null, [
              (h(!0), g(U, null, Z(Object.entries(T(n)), ([u, c]) => (h(), g("tr", {
                key: u,
                class: "quiz-statment"
              }, [
                p("td", On, [
                  p("a", {
                    href: c.question.link,
                    target: "_blank",
                    innerHTML: c.question.statement
                  }, null, 8, kn)
                ]),
                p("td", Qn, [
                  (h(!0), g(U, null, Z(Object.entries(
                    c.question.optionsList
                  ), ([_, m]) => (h(), g("span", { key: _ }, [
                    m.optionCorrect ? (h(), g("span", {
                      key: 0,
                      innerHTML: m.optionValue
                    }, null, 8, $n)) : N("", !0)
                  ]))), 128))
                ]),
                p("td", Nn, [
                  p("span", {
                    class: R(
                      c.correct === 1 ? "correct-answer" : "wrong-answer"
                    ),
                    innerHTML: c.correct === 1 ? "<span> ✔</span> " : "<span> ✘</span> <span>     </span>" + c.selectedValue
                  }, null, 10, qn)
                ])
              ]))), 128))
            ])
          ])
        ])
      ]),
      p("div", null, [
        p("div", In, [
          p("span", Cn, "⌛ Result: " + Q(T(o)) + " out of " + Q(T(t)) + " - (" + Q(T(a)) + " %)", 1)
        ])
      ])
    ]));
  }
}), mt = /* @__PURE__ */ M(Ln, [["__scopeId", "data-v-4ffecbcd"]]), Pn = /* @__PURE__ */ q({
  __name: "MCQQuiz",
  setup(e) {
    const s = w(), n = j();
    We(() => {
      o();
    });
    const t = () => {
      n.enqueueQuestion(s.value), o();
    }, o = () => {
      s.value = n.dequeueQuestion();
    }, a = () => window.location.reload();
    return (r, i) => {
      const u = Ot("MCQInfoPanel");
      return h(), g("main", null, [
        ee(u),
        s.value ? (h(), V(ht, {
          key: 0,
          statement: s.value.statement,
          "options-list": s.value.optionsList,
          _id: s.value._id,
          onNextQuestion: o,
          onSkipQuestion: t
        }, null, 8, ["statement", "options-list", "_id"])) : N("", !0),
        s.value ? N("", !0) : (h(), V(mt, { key: 1 })),
        s.value ? N("", !0) : (h(), g("button", {
          key: 2,
          class: "btn-relocate",
          onClick: a
        }, " End "))
      ]);
    };
  }
}), Mn = /* @__PURE__ */ M(Pn, [["__scopeId", "data-v-937e1a1b"]]), xn = {
  key: 0,
  class: "time-left-header"
}, An = { class: "questions-left-header" }, Vn = /* @__PURE__ */ q({
  __name: "MCQInfoPanel",
  props: {
    timeLeft: {
      type: Number,
      default: 0
    }
  },
  setup(e) {
    const s = j(), n = (t) => {
      const o = Math.floor(t / 60), a = t % 60;
      return `${o}:${a < 10 ? "0" : ""}${a}`;
    };
    return (t, o) => (h(), g(U, null, [
      e.timeLeft ? (h(), g("h3", xn, " Time left: " + Q(n(e.timeLeft)), 1)) : N("", !0),
      p("h3", An, " Question " + Q(T(s).questionsStack.length) + " out of " + Q(T(s).questionsQueue.length + T(s).questionsStack.length), 1)
    ], 64));
  }
}), Re = 1e3, Dn = "-1", jn = /* @__PURE__ */ q({
  __name: "MCQTimedQuiz",
  setup(e) {
    const s = j(), n = w();
    let t = null, o = null;
    const a = w(s.timeLimit);
    We(() => {
      i();
    }), Ye(() => {
      c(), _();
    });
    const r = () => {
      n.value = s.removeFromLastHistory() ?? n.value;
    }, i = () => n.value = s.dequeueQuestion(), u = () => window.location.reload(), c = () => {
      t && clearTimeout(t), o && clearInterval(o);
    }, _ = () => {
      a.value = s.timeLimit;
      const v = () => n.value ? a.value ? a.value-- : m() : c();
      o = window.setInterval(v, Re), t = window.setTimeout(() => {
      }, s.timeLimit * Re);
    }, m = () => {
      var E;
      c();
      const v = (x) => s.incrementStat(x, "attempts", Dn);
      for (v(((E = n.value) == null ? void 0 : E._id.$oid) ?? ""); n.value = s.dequeueQuestion(); )
        v(n.value._id.$oid);
      return alert("Time's up! Quiz has ended."), i();
    };
    return (v, E) => (h(), g("main", null, [
      ee(Vn, { "time-left": a.value }, null, 8, ["time-left"]),
      n.value ? (h(), V(ht, {
        key: 0,
        statement: n.value.statement,
        "options-list": n.value.optionsList,
        _id: n.value._id,
        onNextQuestion: i,
        onPrevQuestion: r
      }, null, 8, ["statement", "options-list", "_id"])) : N("", !0),
      n.value ? N("", !0) : (h(), V(mt, { key: 1 })),
      n.value ? N("", !0) : (h(), g("button", {
        key: 2,
        class: "btn-relocate",
        onClick: u
      }, " End "))
    ]));
  }
}), zn = /* @__PURE__ */ M(jn, [["__scopeId", "data-v-cffdfe07"]]), Un = ["id", "name", "value", "disabled"], Rn = ["for"], Fn = {
  key: 0,
  class: "question-number"
}, Bn = /* @__PURE__ */ q({
  __name: "FilterCheckbox",
  props: {
    category: {},
    topics: {}
  },
  setup(e) {
    const { category: s, topics: n } = e, t = j(), o = qe(
      () => Object.entries(n).map(([i, u]) => {
        const c = r(u, s);
        return { idx: i, topic: u, num: c };
      }).filter(({ topic: i }) => i !== void 0)
    ), a = (i) => {
      if (!(i.target instanceof HTMLInputElement))
        return console.error("Trying to click on non-input element");
      const u = i.target.name, c = i.target.value;
      t.modifySelectedTags(i.target.checked, { category: u, topic: c });
    }, r = (i, u) => {
      var v;
      const c = t.getselectedtags();
      if (!c[u] || (v = c[u]) != null && v.includes(
        i
      ))
        return null;
      const _ = JSON.parse(
        JSON.stringify(t.getselectedtags())
      );
      _[u].includes(i) || _[u].push(i);
      const m = t.allQs;
      return Le(
        m,
        _
      ).length.toString();
    };
    return (i, u) => (h(), g("ul", null, [
      (h(!0), g(U, null, Z(o.value, ({ idx: c, num: _, topic: m }) => (h(), g("li", {
        key: c,
        class: R(["filter-options", { "grey-out": _ === "0" }])
      }, [
        p("input", {
          id: `${i.category}-${m}-checkbox`,
          type: "checkbox",
          name: i.category,
          value: m,
          disabled: _ === "0",
          onChange: u[0] || (u[0] = (v) => a(v))
        }, null, 40, Un),
        p("label", {
          for: `${i.category}-${m}-checkbox`
        }, [
          Ke(Q(m) + " ", 1),
          _ !== null && _ !== "0" ? (h(), g("span", Fn, Q(_), 1)) : N("", !0)
        ], 8, Rn)
      ], 2))), 128))
    ]));
  }
}), Hn = /* @__PURE__ */ M(Bn, [["__scopeId", "data-v-0f1deb69"]]), Gn = { class: "filter" }, Jn = { class: "category-heading" }, Wn = /* @__PURE__ */ q({
  __name: "MCQTagOptions",
  setup(e) {
    const t = j().allQs.map((a) => a.tags), o = ft(t);
    return (a, r) => (h(), g("div", Gn, [
      (h(!0), g(U, null, Z(Object.entries(T(o)), ([i, u]) => (h(), g("div", {
        key: i,
        class: "category"
      }, [
        p("h2", Jn, Q(i), 1),
        ee(Hn, {
          category: i,
          topics: u
        }, null, 8, ["category", "topics"])
      ]))), 128))
    ]));
  }
}), Yn = /* @__PURE__ */ M(Wn, [["__scopeId", "data-v-efaccb2c"]]), Kn = { for: "optionName" }, Xn = ["value"], Zn = /* @__PURE__ */ q({
  __name: "DropDownbox",
  props: {
    options: {},
    optionName: {},
    disabled: { type: Boolean }
  },
  setup(e) {
    const s = j(), n = w(0);
    function t(o) {
      const a = o.target;
      a.value && (n.value = parseFloat(a.value) * 60, s.setTimeLimit(n.value));
    }
    return (o, a) => (h(), g("div", {
      class: R(o.disabled ? "dropdown input-disabled" : "dropdown")
    }, [
      p("label", Kn, Q(o.optionName) + ":   ", 1),
      p("select", {
        id: "optionName",
        name: "optionName",
        onChange: t
      }, [
        (h(!0), g(U, null, Z(o.options, (r) => (h(), g("option", {
          key: r.value,
          value: r.value
        }, Q(r.value) + " " + Q(r.unit), 9, Xn))), 128))
      ], 32)
    ], 2));
  }
}), es = /* @__PURE__ */ M(Zn, [["__scopeId", "data-v-5f3ae97a"]]), ue = (e) => (Ge("data-v-30ab292c"), e = e(), Je(), e), ts = { class: "start-page-container" }, ns = /* @__PURE__ */ ue(() => /* @__PURE__ */ p("h1", null, "VetCloud Smart Quiz", -1)), ss = { class: "quiz-config-container" }, os = { class: "question-config-container" }, is = { class: "tag-text" }, rs = { class: "question-number" }, as = { class: "question-amount-container" }, us = /* @__PURE__ */ ue(() => /* @__PURE__ */ p("label", { for: "question-amount" }, "Select the amount of questions:", -1)), cs = ["max"], ls = {
  key: 0,
  class: "show-max-msg"
}, ds = /* @__PURE__ */ ue(() => /* @__PURE__ */ p("label", { for: "mode-select" }, "Select mode:", -1)), fs = /* @__PURE__ */ ue(() => /* @__PURE__ */ p("option", { value: "Tutor" }, "Tutor", -1)), ps = /* @__PURE__ */ ue(() => /* @__PURE__ */ p("option", { value: "Timed" }, "Timed", -1)), hs = [
  fs,
  ps
], ms = 3e3, _s = /* @__PURE__ */ q({
  __name: "StartPage",
  emits: ["start-quiz"],
  setup(e, { emit: s }) {
    const n = w(1), t = w("Tutor"), o = w(!1), a = w(null), r = s, i = j(), u = () => {
      r("start-quiz", {
        questionAmount: n.value,
        mode: t.value
      });
    }, c = () => {
      a.value && clearTimeout(a.value), n.value > i.getquestionnumber() && (n.value = i.getquestionnumber(), o.value = !0, a.value = window.setTimeout(() => {
        o.value = !1;
      }, ms));
    };
    return (_, m) => (h(), g("div", ts, [
      ns,
      ee(Yn),
      p("div", ss, [
        p("div", os, [
          p("p", is, [
            Ke(" Maximum possible questions: "),
            p("span", rs, Q(T(i).getquestionnumber()), 1)
          ]),
          p("div", as, [
            us,
            xe(p("input", {
              id: "question-amount",
              "onUpdate:modelValue": m[0] || (m[0] = (v) => n.value = v),
              type: "number",
              placeholder: "Question amount",
              min: "1",
              max: T(i).getquestionnumber(),
              onInput: c
            }, null, 40, cs), [
              [
                kt,
                n.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o.value ? (h(), g("p", ls, " Cannot select more than " + Q(T(i).getquestionnumber()) + " questions. ", 1)) : N("", !0),
          p("div", null, [
            ds,
            xe(p("select", {
              id: "mode-select",
              "onUpdate:modelValue": m[1] || (m[1] = (v) => t.value = v)
            }, hs, 512), [
              [Qt, t.value]
            ])
          ]),
          ee(es, {
            options: [
              { value: 1, label: "Time Option 2", unit: "Min." },
              { value: 1.5, label: "Time Option 1", unit: "Min." }
            ],
            "option-name": "Time per Question",
            class: R(t.value === "Timed" ? "" : "input-disabled"),
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
}), gs = /* @__PURE__ */ M(_s, [["__scopeId", "data-v-30ab292c"]]), vs = (e) => e.trim().toLowerCase().replace("_", " "), bs = (e) => e.reduce((s, n) => {
  if (!n.includes(":"))
    return s;
  let [t, o] = n.split(":");
  return [t, o] = [t.trim().toLowerCase(), vs(o)], s[t] = o, s;
}, {}), ys = (e) => e.map((s) => ({
  _id: { $oid: s._id.$oid },
  statement: s.statement,
  tags: bs(s.tags),
  optionsList: s.optionsList,
  link: s.link
})), Ss = { convertQuestions: ys }, P = {
  isString: (r) => typeof r == "string",
  isObject: (r) => typeof r == "object" && r !== null,
  isBoolean: (r) => typeof r == "boolean",
  isArray: (r, i) => Array.isArray(r) && r.every(i),
  isNumber: (r) => typeof r == "number",
  isFunction: (r) => typeof r == "function"
};
function $e(e) {
  const s = e.includes(":") && e.split(":").length === 2, n = !e.includes(":") && !e.includes(" ");
  return s || n;
}
function _t(e, s = !1) {
  return P.isArray(e, P.isString) ? s ? e.every($e) : e.some($e) : !1;
}
function Ts(e) {
  return P.isObject(e) && P.isString(e.optionValue) && (e.optionCorrect === void 0 || P.isBoolean(e.optionCorrect));
}
function gt(e) {
  return P.isObject(e) && P.isObject(e._id) && // Assuming _id is an object with $oid property
  P.isString(e._id.$oid) && P.isString(e.statement) && _t(e.tags) && // Modified to ensure tags are always checked
  P.isArray(e.optionsList, Ts) && P.isString(e.link);
}
function ws(e) {
  return P.isArray(e, gt);
}
const fe = {
  isMCQuestion: gt,
  isMCQuestionArray: ws,
  validateTags: _t,
  isTag: $e
}, Es = (e) => {
  try {
    if (!e)
      throw new Error("No question data found. Please Try again later.");
    return Ss.convertQuestions(Os(e));
  } catch (s) {
    return alert(s), [];
  }
};
function Os(e) {
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
  const s = {
    invalidTags: 0,
    noTags: 0,
    invalidQs: 0,
    totalTags: 0
  }, n = e.reduce((t, o) => {
    if (!fe.isMCQuestion(o))
      return { ...t, invalidQs: t.invalidQs + 1 };
    let { tags: a } = o;
    if (!a || Array.isArray(a) && !a.length)
      return { ...t, noTags: t.noTags + 1 };
    const r = t.totalTags + a.length;
    if (!fe.validateTags(a, !0)) {
      const i = a.filter((c) => fe.isTag(c)), u = t.invalidTags + a.length - i.length;
      return a = i, { ...t, invalidTags: u, totalTags: r };
    }
    return { ...t, totalTags: r };
  }, s);
  return ks(n, e.length), e;
}
function we(e, s) {
  e && console.warn(s, "color: #FF0000");
}
function ks(e, s) {
  const { invalidQs: n, invalidTags: t, noTags: o, totalTags: a } = e;
  we(
    n,
    `Invalid Questions Received: %c${n} out of ${s}`
  ), we(
    t,
    `Filtering out invalid tags: %c${t} out of ${a}`
  ), we(o, `Questions with no tags: %c${o}`);
}
const Qs = /* @__PURE__ */ q({
  __name: "CrucibleComponent",
  setup(e) {
    const s = w(0), n = j(), t = w(!1), o = w([]), a = Be("$dataLink");
    Ye(() => {
      o.value = Es(a.data.questions), console.info("All Questions:", o.value), n.allQs = o.value;
      const i = ft(
        o.value.map((u) => u.tags)
      );
      n.setselectedTags(
        Object.keys(i).reduce((u, c) => ({ ...u, [c]: [] }), {})
      );
    });
    const r = ({ questionAmount: i, mode: u }) => {
      const c = n.getselectedtags();
      if (!o.value.length)
        return alert("Trouble fetching questions, please try again later");
      const _ = Le(
        o.value,
        c
      ), m = pn(i, _);
      s.value = m.length, n.initialiseQuiz(m, u), u === "Timed" && n.setTimeLimit(i * n.timeLimit), t.value = !0;
    };
    return (i, u) => t.value && T(n).quizMode === "Tutor" ? (h(), V(Mn, { key: 0 })) : t.value && T(n).quizMode === "Timed" ? (h(), V(zn, { key: 1 })) : (h(), V(gs, {
      key: 2,
      onStartQuiz: r
    }));
  }
}), $s = /* @__PURE__ */ M(Qs, [["__scopeId", "data-v-7321a104"]]), Ns = {
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
function Is(e, s = {}) {
  const n = Xt();
  e.use(n), e.component("CrucibleComponent", $s), e.provide("$dataLink", s.dataLink || Ns);
}
export {
  $s as CrucibleComponent,
  Is as createViewerPlugin,
  Ns as defaultData
};
