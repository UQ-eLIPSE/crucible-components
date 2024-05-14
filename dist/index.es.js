import { effectScope as Be, ref as E, markRaw as G, hasInjectionContext as yt, inject as He, getCurrentInstance as St, toRaw as _e, watch as Ge, reactive as Tt, isRef as re, isReactive as qe, toRef as Se, nextTick as Me, computed as Ne, unref as w, getCurrentScope as wt, onScopeDispose as Et, toRefs as xe, defineComponent as N, openBlock as h, createElementBlock as v, Fragment as U, normalizeClass as R, createElementVNode as m, toDisplayString as Q, renderList as Z, createVNode as ee, createBlock as V, createCommentVNode as q, pushScopeId as Je, popScopeId as We, onMounted as Ie, resolveComponent as Ot, onBeforeMount as Ye, createTextVNode as Ke, watchEffect as kt, withDirectives as Ae, vModelText as Qt, vModelSelect as $t } from "vue";
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
function qt() {
  return Ze().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Ze() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Nt = typeof Proxy == "function", It = "devtools-plugin:setup", Ct = "plugin:settings:set";
let Y, Ee;
function Lt() {
  var e;
  return Y !== void 0 || (typeof window < "u" && window.performance ? (Y = !0, Ee = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Y = !0, Ee = globalThis.perf_hooks.performance) : Y = !1), Y;
}
function Pt() {
  return Lt() ? Ee.now() : Date.now();
}
class Mt {
  constructor(s, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = s, this.hook = n;
    const t = {};
    if (s.settings)
      for (const i in s.settings) {
        const a = s.settings[i];
        t[i] = a.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${s.id}`;
    let r = Object.assign({}, t);
    try {
      const i = localStorage.getItem(o), a = JSON.parse(i);
      Object.assign(r, a);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return r;
      },
      setSettings(i) {
        try {
          localStorage.setItem(o, JSON.stringify(i));
        } catch {
        }
        r = i;
      },
      now() {
        return Pt();
      }
    }, n && n.on(Ct, (i, a) => {
      i === this.plugin.id && this.fallbacks.setSettings(a);
    }), this.proxiedOn = new Proxy({}, {
      get: (i, a) => this.target ? this.target.on[a] : (...u) => {
        this.onQueue.push({
          method: a,
          args: u
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (i, a) => this.target ? this.target[a] : a === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(a) ? (...u) => (this.targetQueue.push({
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
function et(e, s) {
  const n = e, t = Ze(), o = qt(), r = Nt && n.enableEarlyProxy;
  if (o && (t.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !r))
    o.emit(It, e, s);
  else {
    const i = r ? new Mt(n, o) : null;
    (t.__VUE_DEVTOOLS_PLUGINS__ = t.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: s,
      proxy: i
    }), i && s(i.proxiedTarget);
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
const ve = typeof window < "u", ie = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && ve, Ve = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function xt(e, { autoBom: s = !1 } = {}) {
  return s && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Ce(e, s, n) {
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
const me = typeof navigator == "object" ? navigator : { userAgent: "" }, st = /Macintosh/.test(me.userAgent) && /AppleWebKit/.test(me.userAgent) && !/Safari/.test(me.userAgent), ot = ve ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !st ? At : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in me ? Vt : (
      // Fallback to using FileReader and a popup
      Dt
    )
  )
) : () => {
};
function At(e, s = "download", n) {
  const t = document.createElement("a");
  t.download = s, t.rel = "noopener", typeof e == "string" ? (t.href = e, t.origin !== location.origin ? nt(t.href) ? Ce(e, s, n) : (t.target = "_blank", pe(t)) : pe(t)) : (t.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(t.href);
  }, 4e4), setTimeout(function() {
    pe(t);
  }, 0));
}
function Vt(e, s = "download", n) {
  if (typeof e == "string")
    if (nt(e))
      Ce(e, s, n);
    else {
      const t = document.createElement("a");
      t.href = e, t.target = "_blank", setTimeout(function() {
        pe(t);
      });
    }
  else
    navigator.msSaveOrOpenBlob(xt(e, n), s);
}
function Dt(e, s, n, t) {
  if (t = t || open("", "_blank"), t && (t.document.title = t.document.body.innerText = "downloading..."), typeof e == "string")
    return Ce(e, s, n);
  const o = e.type === "application/octet-stream", r = /constructor/i.test(String(Ve.HTMLElement)) || "safari" in Ve, i = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((i || o && r || st) && typeof FileReader < "u") {
    const a = new FileReader();
    a.onloadend = function() {
      let u = a.result;
      if (typeof u != "string")
        throw t = null, new Error("Wrong reader.result type");
      u = i ? u : u.replace(/^data:[^;]*;/, "data:attachment/file;"), t ? t.location.href = u : location.assign(u), t = null;
    }, a.readAsDataURL(e);
  } else {
    const a = URL.createObjectURL(e);
    t ? t.location.assign(a) : location.href = a, t = null, setTimeout(function() {
      URL.revokeObjectURL(a);
    }, 4e4);
  }
}
function O(e, s) {
  const n = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, s) : s === "error" ? console.error(n) : s === "warn" ? console.warn(n) : console.log(n);
}
function Le(e) {
  return "_a" in e && "install" in e;
}
function it() {
  if (!("clipboard" in navigator))
    return O("Your browser doesn't support the Clipboard API", "error"), !0;
}
function rt(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (O('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function jt(e) {
  if (!it())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), O("Global state copied to clipboard.");
    } catch (s) {
      if (rt(s))
        return;
      O("Failed to serialize the state. Check the console for more details.", "error"), console.error(s);
    }
}
async function zt(e) {
  if (!it())
    try {
      at(e, JSON.parse(await navigator.clipboard.readText())), O("Global state pasted from clipboard.");
    } catch (s) {
      if (rt(s))
        return;
      O("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(s);
    }
}
async function Ut(e) {
  try {
    ot(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (s) {
    O("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(s);
  }
}
let z;
function Rt() {
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
async function Ft(e) {
  try {
    const n = await Rt()();
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
function Bt(e) {
  return Le(e) ? {
    id: Oe,
    label: ut
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Ht(e) {
  if (Le(e)) {
    const n = Array.from(e._s.keys()), t = e._s;
    return {
      state: n.map((r) => ({
        editable: !0,
        key: r,
        value: e.state.value[r]
      })),
      getters: n.filter((r) => t.get(r)._getters).map((r) => {
        const i = t.get(r);
        return {
          editable: !1,
          key: r,
          value: i._getters.reduce((a, u) => (a[u] = i[u], a), {})
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
function Gt(e) {
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
function Jt(e) {
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
const he = [], H = "pinia:mutations", k = "pinia", { assign: Wt } = Object, ge = (e) => "🍍 " + e;
function Yt(e, s) {
  et({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: he,
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
            jt(s);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await zt(s), n.sendInspectorTree(k), n.sendInspectorState(k);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            Ut(s);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Ft(s), n.sendInspectorTree(k), n.sendInspectorState(k);
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
      const r = t.componentInstance && t.componentInstance.proxy;
      if (r && r._pStores) {
        const i = t.componentInstance.proxy._pStores;
        Object.values(i).forEach((a) => {
          t.instanceData.state.push({
            type: ge(a.$id),
            key: "state",
            editable: !0,
            value: a._isOptionsAPI ? {
              _custom: {
                value: _e(a.$state),
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
              } catch (g) {
                u[c] = g;
              }
              return u;
            }, {})
          });
        });
      }
    }), n.on.getInspectorTree((t) => {
      if (t.app === e && t.inspectorId === k) {
        let o = [s];
        o = o.concat(Array.from(s._s.values())), t.rootNodes = (t.filter ? o.filter((r) => "$id" in r ? r.$id.toLowerCase().includes(t.filter.toLowerCase()) : ut.toLowerCase().includes(t.filter.toLowerCase())) : o).map(Bt);
      }
    }), n.on.getInspectorState((t) => {
      if (t.app === e && t.inspectorId === k) {
        const o = t.nodeId === Oe ? s : s._s.get(t.nodeId);
        if (!o)
          return;
        o && (t.state = Ht(o));
      }
    }), n.on.editInspectorState((t, o) => {
      if (t.app === e && t.inspectorId === k) {
        const r = t.nodeId === Oe ? s : s._s.get(t.nodeId);
        if (!r)
          return O(`store "${t.nodeId}" not found`, "error");
        const { path: i } = t;
        Le(r) ? i.unshift("state") : (i.length !== 1 || !r._customProperties.has(i[0]) || i[0] in r.$state) && i.unshift("$state"), X = !1, t.set(r, i, t.state.value), X = !0;
      }
    }), n.on.editComponentState((t) => {
      if (t.type.startsWith("🍍")) {
        const o = t.type.replace(/^🍍\s*/, ""), r = s._s.get(o);
        if (!r)
          return O(`store "${o}" not found`, "error");
        const { path: i } = t;
        if (i[0] !== "state")
          return O(`Invalid path for store "${o}":
${i}
Only state can be modified.`);
        i[0] = "$state", X = !1, t.set(r, i, t.state.value), X = !0;
      }
    });
  });
}
function Kt(e, s) {
  he.includes(ge(s.$id)) || he.push(ge(s.$id)), et({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: he,
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
    s.$onAction(({ after: i, onError: a, name: u, args: c }) => {
      const g = ct++;
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
          groupId: g
        }
      }), i((p) => {
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
              result: p
            },
            groupId: g
          }
        });
      }), a((p) => {
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
              error: p
            },
            groupId: g
          }
        });
      });
    }, !0), s._customProperties.forEach((i) => {
      Ge(() => w(s[i]), (a, u) => {
        n.notifyComponentUpdate(), n.sendInspectorState(k), X && n.addTimelineEvent({
          layerId: H,
          event: {
            time: t(),
            title: "Change",
            subtitle: i,
            data: {
              newValue: a,
              oldValue: u
            },
            groupId: F
          }
        });
      }, { deep: !0 });
    }), s.$subscribe(({ events: i, type: a }, u) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState(k), !X)
        return;
      const c = {
        time: t(),
        title: Jt(a),
        data: Wt({ store: A(s.$id) }, Gt(i)),
        groupId: F
      };
      a === D.patchFunction ? c.subtitle = "⤵️" : a === D.patchObject ? c.subtitle = "🧩" : i && !Array.isArray(i) && (c.subtitle = i.type), i && (c.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: i
        }
      }), n.addTimelineEvent({
        layerId: H,
        event: c
      });
    }, { detached: !0, flush: "sync" });
    const o = s._hotUpdate;
    s._hotUpdate = G((i) => {
      o(i), n.addTimelineEvent({
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
    const { $dispose: r } = s;
    s.$dispose = () => {
      r(), n.notifyComponentUpdate(), n.sendInspectorTree(k), n.sendInspectorState(k), n.getSettings().logStoreChanges && O(`Disposed "${s.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree(k), n.sendInspectorState(k), n.getSettings().logStoreChanges && O(`"${s.$id}" store installed 🆕`);
  });
}
let ct = 0, F;
function De(e, s, n) {
  const t = s.reduce((o, r) => (o[r] = _e(e)[r], o), {});
  for (const o in t)
    e[o] = function() {
      const r = ct, i = n ? new Proxy(e, {
        get(...u) {
          return F = r, Reflect.get(...u);
        },
        set(...u) {
          return F = r, Reflect.set(...u);
        }
      }) : e;
      F = r;
      const a = t[o].apply(i, arguments);
      return F = void 0, a;
    };
}
function Xt({ app: e, store: s, options: n }) {
  if (s.$id.startsWith("__hot:"))
    return;
  s._isOptionsAPI = !!n.state, De(s, Object.keys(n.actions), s._isOptionsAPI);
  const t = s._hotUpdate;
  _e(s)._hotUpdate = function(o) {
    t.apply(this, arguments), De(s, Object.keys(o._hmrPayload.actions), !!s._isOptionsAPI);
  }, Kt(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    s
  );
}
function Zt() {
  const e = Be(!0), s = e.run(() => E({}));
  let n = [], t = [];
  const o = G({
    install(r) {
      ae(o), o._a = r, r.provide(tt, o), r.config.globalProperties.$pinia = o, ie && Yt(r, o), t.forEach((i) => n.push(i)), t = [];
    },
    use(r) {
      return !this._a && !Xe ? t.push(r) : n.push(r), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: s
  });
  return ie && typeof Proxy < "u" && o.use(Xt), o;
}
function lt(e, s) {
  for (const n in s) {
    const t = s[n];
    if (!(n in e))
      continue;
    const o = e[n];
    J(o) && J(t) && !re(t) && !qe(t) ? e[n] = lt(o, t) : e[n] = t;
  }
  return e;
}
const dt = () => {
};
function je(e, s, n, t = dt) {
  e.push(s);
  const o = () => {
    const r = e.indexOf(s);
    r > -1 && (e.splice(r, 1), t());
  };
  return !n && wt() && Et(o), o;
}
function K(e, ...s) {
  e.slice().forEach((n) => {
    n(...s);
  });
}
const en = (e) => e();
function ke(e, s) {
  e instanceof Map && s instanceof Map && s.forEach((n, t) => e.set(t, n)), e instanceof Set && s instanceof Set && s.forEach(e.add, e);
  for (const n in s) {
    if (!s.hasOwnProperty(n))
      continue;
    const t = s[n], o = e[n];
    J(o) && J(t) && e.hasOwnProperty(n) && !re(t) && !qe(t) ? e[n] = ke(o, t) : e[n] = t;
  }
  return e;
}
const tn = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function nn(e) {
  return !J(e) || !e.hasOwnProperty(tn);
}
const { assign: L } = Object;
function ze(e) {
  return !!(re(e) && e.effect);
}
function Ue(e, s, n, t) {
  const { state: o, actions: r, getters: i } = s, a = n.state.value[e];
  let u;
  function c() {
    !a && (process.env.NODE_ENV === "production" || !t) && (n.state.value[e] = o ? o() : {});
    const g = process.env.NODE_ENV !== "production" && t ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      xe(E(o ? o() : {}).value)
    ) : xe(n.state.value[e]);
    return L(g, r, Object.keys(i || {}).reduce((p, _) => (process.env.NODE_ENV !== "production" && _ in g && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${_}" in store "${e}".`), p[_] = G(Ne(() => {
      ae(n);
      const y = n._s.get(e);
      return i[_].call(y, y);
    })), p), {}));
  }
  return u = Qe(e, c, s, n, t, !0), u;
}
function Qe(e, s, n = {}, t, o, r) {
  let i;
  const a = L({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !t._e.active)
    throw new Error("Pinia destroyed");
  const u = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Xe && (u.onTrigger = (f) => {
    c ? y = f : c == !1 && !d._hotUpdating && (Array.isArray(y) ? y.push(f) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let c, g, p = [], _ = [], y;
  const x = t.state.value[e];
  !r && !x && (process.env.NODE_ENV === "production" || !o) && (t.state.value[e] = {});
  const W = E({});
  let ce;
  function te(f) {
    let l;
    c = g = !1, process.env.NODE_ENV !== "production" && (y = []), typeof f == "function" ? (f(t.state.value[e]), l = {
      type: D.patchFunction,
      storeId: e,
      events: y
    }) : (ke(t.state.value[e], f), l = {
      type: D.patchObject,
      payload: f,
      storeId: e,
      events: y
    });
    const S = ce = Symbol();
    Me().then(() => {
      ce === S && (c = !0);
    }), g = !0, K(p, l, t.state.value[e]);
  }
  const be = r ? function() {
    const { state: l } = n, S = l ? l() : {};
    this.$patch(($) => {
      L($, S);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : dt
  );
  function ye() {
    i.stop(), p = [], _ = [], t._s.delete(e);
  }
  function le(f, l) {
    return function() {
      ae(t);
      const S = Array.from(arguments), $ = [], ne = [];
      function vt(C) {
        $.push(C);
      }
      function bt(C) {
        ne.push(C);
      }
      K(_, {
        args: S,
        name: f,
        store: d,
        after: vt,
        onError: bt
      });
      let se;
      try {
        se = l.apply(this && this.$id === e ? this : d, S);
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
  }), T = {
    _p: t,
    // _s: scope,
    $id: e,
    $onAction: je.bind(null, _),
    $patch: te,
    $reset: be,
    $subscribe(f, l = {}) {
      const S = je(p, f, l.detached, () => $()), $ = i.run(() => Ge(() => t.state.value[e], (ne) => {
        (l.flush === "sync" ? g : c) && f({
          storeId: e,
          type: D.direct,
          events: y
        }, ne);
      }, L({}, u, l)));
      return S;
    },
    $dispose: ye
  }, d = Tt(process.env.NODE_ENV !== "production" || ie ? L(
    {
      _hmrPayload: b,
      _customProperties: G(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    T
    // must be added later
    // setupStore
  ) : T);
  t._s.set(e, d);
  const I = (t._a && t._a.runWithContext || en)(() => t._e.run(() => (i = Be()).run(s)));
  for (const f in I) {
    const l = I[f];
    if (re(l) && !ze(l) || qe(l))
      process.env.NODE_ENV !== "production" && o ? de(W.value, f, Se(I, f)) : r || (x && nn(l) && (re(l) ? l.value = x[f] : ke(l, x[f])), t.state.value[e][f] = l), process.env.NODE_ENV !== "production" && b.state.push(f);
    else if (typeof l == "function") {
      const S = process.env.NODE_ENV !== "production" && o ? l : le(f, l);
      I[f] = S, process.env.NODE_ENV !== "production" && (b.actions[f] = l), a.actions[f] = l;
    } else
      process.env.NODE_ENV !== "production" && ze(l) && (b.getters[f] = r ? (
        // @ts-expect-error
        n.getters[f]
      ) : l, ve && (I._getters || // @ts-expect-error: same
      (I._getters = G([]))).push(f));
  }
  if (L(d, I), L(_e(d), I), Object.defineProperty(d, "$state", {
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
        const S = f.$state[l], $ = d.$state[l];
        typeof S == "object" && J(S) && J($) ? lt(S, $) : f.$state[l] = $;
      }
      de(d, l, Se(f.$state, l));
    }), Object.keys(d.$state).forEach((l) => {
      l in f.$state || Te(d, l);
    }), c = !1, g = !1, t.state.value[e] = Se(f._hmrPayload, "hotState"), g = !0, Me().then(() => {
      c = !0;
    });
    for (const l in f._hmrPayload.actions) {
      const S = f[l];
      de(d, l, le(l, S));
    }
    for (const l in f._hmrPayload.getters) {
      const S = f._hmrPayload.getters[l], $ = r ? (
        // special handling of options api
        Ne(() => (ae(t), S.call(d, d)))
      ) : S;
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
      const l = i.run(() => f({
        store: d,
        app: t._a,
        pinia: t,
        options: a
      }));
      Object.keys(l || {}).forEach((S) => d._customProperties.add(S)), L(d, l);
    } else
      L(d, i.run(() => f({
        store: d,
        app: t._a,
        pinia: t,
        options: a
      })));
  }), process.env.NODE_ENV !== "production" && d.$state && typeof d.$state == "object" && typeof d.$state.constructor == "function" && !d.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${d.$id}".`), x && r && n.hydrate && n.hydrate(d.$state, x), c = !0, g = !0, d;
}
function sn(e, s, n) {
  let t, o;
  const r = typeof s == "function";
  if (typeof e == "string")
    t = e, o = r ? n : s;
  else if (o = e, t = e.id, process.env.NODE_ENV !== "production" && typeof t != "string")
    throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
  function i(a, u) {
    const c = yt();
    if (a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && oe && oe._testing ? null : a) || (c ? He(tt, null) : null), a && ae(a), process.env.NODE_ENV !== "production" && !oe)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    a = oe, a._s.has(t) || (r ? Qe(t, s, o, a) : Ue(t, o, a), process.env.NODE_ENV !== "production" && (i._pinia = a));
    const g = a._s.get(t);
    if (process.env.NODE_ENV !== "production" && u) {
      const p = "__hot:" + t, _ = r ? Qe(p, s, o, a, !0) : Ue(p, L({}, o), a, !0);
      u._hotUpdate(_), delete a.state.value[p], a._s.delete(p);
    }
    if (process.env.NODE_ENV !== "production" && ve) {
      const p = St();
      if (p && p.proxy && // avoid adding stores that are just built for hot module replacement
      !u) {
        const _ = p.proxy, y = "_pStores" in _ ? _._pStores : _._pStores = {};
        y[t] = g;
      }
    }
    return g;
  }
  return i.$id = t, i;
}
const on = ["id", "checked"], rn = ["for", "innerHTML"], an = /* @__PURE__ */ N({
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
    return (o, r) => (h(), v(U, null, [
      (h(), v("input", {
        id: "option-" + o.optionKey,
        key: o.optionKey,
        "test-id": "radio_options",
        type: "radio",
        name: "options",
        checked: o.checked,
        class: R(o.submitted && "ignore-hover")
      }, null, 10, on)),
      (h(), v("label", {
        key: o.optionKey,
        for: "option-" + o.optionKey,
        class: R(o.submitted ? "mcq-option-label ignore-hover" : "mcq-option-label"),
        onClick: r[0] || (r[0] = (i) => t()),
        innerHTML: o.option.optionValue
      }, null, 10, rn))
    ], 64));
  }
}), M = (e, s) => {
  const n = e.__vccOpts || e;
  for (const [t, o] of s)
    n[t] = o;
  return n;
}, un = /* @__PURE__ */ M(an, [["__scopeId", "data-v-fdbfedc6"]]), cn = ["disabled"], ln = /* @__PURE__ */ N({
  __name: "MCQButton",
  props: {
    submitted: { type: Boolean },
    selectedOption: {},
    hideSkip: { type: Boolean }
  },
  emits: ["submitAnswer", "nextQuestion", "skipQuestion"],
  setup(e, { emit: s }) {
    const n = E("skip"), t = E("Skip"), o = s, r = (u, c) => {
      !u && c ? i("next", "Next", "submitAnswer") : u && c ? i("skip", "Skip", "nextQuestion") : !u && !c && i("skip", "Skip", "skipQuestion");
    }, i = (u, c, g) => {
      n.value = u, t.value = c, o(g);
    }, a = (u, c) => u && c ? { class: "next", text: "Next" } : !u && c ? { class: "submit", text: "Submit" } : { class: n.value, text: t.value };
    return (u, c) => (h(), v("div", null, [
      m("button", {
        disabled: u.hideSkip && a(u.submitted, u.selectedOption).class === "skip",
        class: R(["mcq-button", a(u.submitted, u.selectedOption).class]),
        onClick: c[0] || (c[0] = (g) => r(u.submitted, u.selectedOption))
      }, Q(a(u.submitted, u.selectedOption).text), 11, cn)
    ]));
  }
}), dn = /* @__PURE__ */ M(ln, [["__scopeId", "data-v-847b8dd5"]]), fn = /* @__PURE__ */ N({
  __name: "NextButton",
  props: {
    buttonName: {}
  },
  emits: ["nextQuestion", "prevQuestion"],
  setup(e, { emit: s }) {
    const { buttonName: n } = e, t = s, o = () => {
      r(n !== "←" ? "nextQuestion" : "prevQuestion");
    }, r = (i) => {
      t(i);
    };
    return (i, a) => (h(), v("div", null, [
      m("button", {
        class: R(i.buttonName === "Submit" ? "submit_btn" : "mcq-button"),
        onClick: a[0] || (a[0] = (u) => o())
      }, Q(i.buttonName), 3)
    ]));
  }
}), Re = /* @__PURE__ */ M(fn, [["__scopeId", "data-v-8be7f61e"]]), pn = (e) => {
  for (let s = e.length - 1; s > 0; s--) {
    const n = Math.floor(Math.random() * (s + 1));
    [e[s], e[n]] = [e[n], e[s]];
  }
  return e;
}, mn = (e, s) => pn(s).slice(0, e);
function ft(e) {
  const s = e.reduce(
    (t, o) => (Object.keys(o).forEach((r) => {
      typeof r == "string" && r.trim() !== "" && (t[r] || (t[r] = /* @__PURE__ */ new Set()), t[r].add(o[r]));
    }), t),
    {}
  );
  return Object.keys(s).reduce(
    (t, o) => (t[o] = [...s[o]], t),
    {}
  );
}
function Pe(e, s) {
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
}), j = sn("questionsQueue", {
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
      return Pe(e, this.selectedTags).length;
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
          const o = this.quizStats[t].question.optionsList.map((r) => r.optionCorrect).indexOf(!0);
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
}), gn = ["innerHTML"], _n = { class: "mcq-list" }, vn = ["onClick"], bn = { class: "next-prev-question" }, yn = /* @__PURE__ */ N({
  __name: "MCQQuestion",
  props: {
    _id: {},
    statement: {},
    optionsList: {}
  },
  emits: ["nextQuestion", "skipQuestion", "prevQuestion"],
  setup(e, { emit: s }) {
    const n = j(), { statement: t, optionsList: o, _id: r } = e, i = E(null), a = E(!1), u = s, c = E(n.getRemainingQuestions()), g = () => {
      a.value = !0;
    }, p = () => {
      i.value = null, u("nextQuestion");
    }, _ = (b) => {
      W(b), c.value = n.getRemainingQuestions(), u("nextQuestion");
    }, y = () => {
      W(r), u("skipQuestion");
    }, x = (b) => n.incrementStat(
      b.$oid,
      "attempts",
      i.value ?? void 0
    ), W = (b) => {
      x(b), a.value = !1, i.value = null;
    }, ce = () => {
      i.value = null, u("prevQuestion");
    }, te = (b, T) => {
      a.value || (i.value = i.value === T ? null : T), x(b);
    }, be = (b, T, d) => n.quizMode === "Timed" ? ye(b, T) : le(T, d);
    function ye(b, T) {
      const d = pt(b.$oid, n.quizStats), B = n.quizStats[d].selectedValue, I = hn(
        n.quizStats,
        d,
        B
      );
      return String(I) === T ? (i.value = T, "selected") : "";
    }
    function le(b, T) {
      const d = T[parseInt(b)], B = i.value === b;
      return a.value ? d.optionCorrect ? "correct ignore-hover" : B ? "wrong ignore-hover" : "ignore-hover" : B ? "selected" : "";
    }
    return (b, T) => (h(), v(U, null, [
      m("div", {
        class: "mcq-statement",
        innerHTML: b.statement
      }, null, 8, gn),
      m("div", _n, [
        (h(!0), v(U, null, Z(Object.entries(b.optionsList), ([d, B]) => (h(), v("div", {
          key: d,
          class: R(["mcq-option", be(b._id, d, b.optionsList)]),
          onClick: (I) => te(b._id, d)
        }, [
          ee(un, {
            "option-key": d,
            checked: i.value === d,
            option: B,
            submitted: a.value,
            onSelectOption: (I) => te(b._id, d)
          }, null, 8, ["option-key", "checked", "option", "submitted", "onSelectOption"])
        ], 10, vn))), 128))
      ]),
      w(n).quizMode === "Tutor" ? (h(), V(dn, {
        key: 0,
        submitted: a.value,
        "selected-option": i.value,
        "hide-skip": c.value <= 1,
        onSubmitAnswer: g,
        onNextQuestion: T[0] || (T[0] = (d) => _(b._id)),
        onSkipQuestion: y
      }, null, 8, ["submitted", "selected-option", "hide-skip"])) : q("", !0),
      m("div", bn, [
        w(n).quizMode === "Timed" ? (h(), V(Re, {
          key: 0,
          "button-name": w(n).questionsQueue.length >= 1 ? "→" : "Submit",
          onNextQuestion: T[1] || (T[1] = (d) => p())
        }, null, 8, ["button-name"])) : q("", !0),
        w(n).quizMode === "Timed" && w(n).questionsStack.length > 1 ? (h(), V(Re, {
          key: 1,
          "button-name": "←",
          onPrevQuestion: T[2] || (T[2] = (d) => ce())
        })) : q("", !0)
      ])
    ], 64));
  }
}), mt = /* @__PURE__ */ M(yn, [["__scopeId", "data-v-fc502993"]]), Sn = (e) => (Je("data-v-4ffecbcd"), e = e(), We(), e), Tn = { class: "report-container" }, wn = { class: "mcq-report" }, En = { class: "table-container" }, On = /* @__PURE__ */ Sn(() => /* @__PURE__ */ m("thead", null, [
  /* @__PURE__ */ m("tr", null, [
    /* @__PURE__ */ m("th", null, "question"),
    /* @__PURE__ */ m("th", null, "correct option"),
    /* @__PURE__ */ m("th", null, "your answer")
  ])
], -1)), kn = { class: "question-row" }, Qn = ["href", "innerHTML"], $n = { class: "answer-row" }, qn = ["innerHTML"], Nn = { class: "answer-row" }, In = ["innerHTML"], Cn = { class: "mcq-result" }, Ln = { class: "score" }, Pn = /* @__PURE__ */ N({
  __name: "MCQStatus",
  setup(e) {
    const s = j(), n = s.quizStats, t = s.quizStats.length, o = n.filter((i) => i.correct === 1).length, r = (o * 100 / t).toFixed(0);
    return (i, a) => (h(), v("div", Tn, [
      m("div", wn, [
        m("div", En, [
          m("table", null, [
            On,
            m("tbody", null, [
              (h(!0), v(U, null, Z(Object.entries(w(n)), ([u, c]) => (h(), v("tr", {
                key: u,
                class: "quiz-statment"
              }, [
                m("td", kn, [
                  m("a", {
                    href: c.question.link,
                    target: "_blank",
                    innerHTML: c.question.statement
                  }, null, 8, Qn)
                ]),
                m("td", $n, [
                  (h(!0), v(U, null, Z(Object.entries(
                    c.question.optionsList
                  ), ([g, p]) => (h(), v("span", { key: g }, [
                    p.optionCorrect ? (h(), v("span", {
                      key: 0,
                      innerHTML: p.optionValue
                    }, null, 8, qn)) : q("", !0)
                  ]))), 128))
                ]),
                m("td", Nn, [
                  m("span", {
                    class: R(
                      c.correct === 1 ? "correct-answer" : "wrong-answer"
                    ),
                    innerHTML: c.correct === 1 ? "<span> ✔</span> " : "<span> ✘</span> <span>     </span>" + c.selectedValue
                  }, null, 10, In)
                ])
              ]))), 128))
            ])
          ])
        ])
      ]),
      m("div", null, [
        m("div", Cn, [
          m("span", Ln, "⌛ Result: " + Q(w(o)) + " out of " + Q(w(t)) + " - (" + Q(w(r)) + " %)", 1)
        ])
      ])
    ]));
  }
}), ht = /* @__PURE__ */ M(Pn, [["__scopeId", "data-v-4ffecbcd"]]), Mn = /* @__PURE__ */ N({
  __name: "MCQQuiz",
  setup(e) {
    const s = E(), n = j();
    Ie(() => {
      o();
    });
    const t = () => {
      n.enqueueQuestion(s.value), o();
    }, o = () => {
      s.value = n.dequeueQuestion();
    }, r = () => window.location.reload();
    return (i, a) => {
      const u = Ot("MCQInfoPanel");
      return h(), v("main", null, [
        ee(u),
        s.value ? (h(), V(mt, {
          key: 0,
          statement: s.value.statement,
          "options-list": s.value.optionsList,
          _id: s.value._id,
          onNextQuestion: o,
          onSkipQuestion: t
        }, null, 8, ["statement", "options-list", "_id"])) : q("", !0),
        s.value ? q("", !0) : (h(), V(ht, { key: 1 })),
        s.value ? q("", !0) : (h(), v("button", {
          key: 2,
          class: "btn-relocate",
          onClick: r
        }, " End "))
      ]);
    };
  }
}), xn = /* @__PURE__ */ M(Mn, [["__scopeId", "data-v-937e1a1b"]]), An = {
  key: 0,
  class: "time-left-header"
}, Vn = { class: "questions-left-header" }, Dn = /* @__PURE__ */ N({
  __name: "MCQInfoPanel",
  props: {
    timeLeft: {
      type: Number,
      default: 0
    }
  },
  setup(e) {
    const s = j(), n = (t) => {
      const o = Math.floor(t / 60), r = t % 60;
      return `${o}:${r < 10 ? "0" : ""}${r}`;
    };
    return (t, o) => (h(), v(U, null, [
      e.timeLeft ? (h(), v("h3", An, " Time left: " + Q(n(e.timeLeft)), 1)) : q("", !0),
      m("h3", Vn, " Question " + Q(w(s).questionsStack.length) + " out of " + Q(w(s).questionsQueue.length + w(s).questionsStack.length), 1)
    ], 64));
  }
}), Fe = 1e3, jn = "-1", zn = /* @__PURE__ */ N({
  __name: "MCQTimedQuiz",
  setup(e) {
    const s = j(), n = E();
    let t = null, o = null;
    const r = E(s.timeLimit);
    Ie(() => {
      a();
    }), Ye(() => {
      c(), g();
    });
    const i = () => {
      n.value = s.removeFromLastHistory() ?? n.value;
    }, a = () => n.value = s.dequeueQuestion(), u = () => window.location.reload(), c = () => {
      t && clearTimeout(t), o && clearInterval(o);
    }, g = () => {
      r.value = s.timeLimit;
      const _ = () => n.value ? r.value ? r.value-- : p() : c();
      o = window.setInterval(_, Fe), t = window.setTimeout(() => {
      }, s.timeLimit * Fe);
    }, p = () => {
      var y;
      c();
      const _ = (x) => s.incrementStat(x, "attempts", jn);
      for (_(((y = n.value) == null ? void 0 : y._id.$oid) ?? ""); n.value = s.dequeueQuestion(); )
        _(n.value._id.$oid);
      return alert("Time's up! Quiz has ended."), a();
    };
    return (_, y) => (h(), v("main", null, [
      ee(Dn, { "time-left": r.value }, null, 8, ["time-left"]),
      n.value ? (h(), V(mt, {
        key: 0,
        statement: n.value.statement,
        "options-list": n.value.optionsList,
        _id: n.value._id,
        onNextQuestion: a,
        onPrevQuestion: i
      }, null, 8, ["statement", "options-list", "_id"])) : q("", !0),
      n.value ? q("", !0) : (h(), V(ht, { key: 1 })),
      n.value ? q("", !0) : (h(), v("button", {
        key: 2,
        class: "btn-relocate",
        onClick: u
      }, " End "))
    ]));
  }
}), Un = /* @__PURE__ */ M(zn, [["__scopeId", "data-v-cffdfe07"]]), Rn = ["id", "name", "value", "disabled"], Fn = ["for"], Bn = {
  key: 0,
  class: "question-number"
}, Hn = /* @__PURE__ */ N({
  __name: "FilterCheckbox",
  props: {
    category: {},
    topics: {}
  },
  setup(e) {
    const { category: s, topics: n } = e, t = j(), o = (u) => s === "course" ? u.toUpperCase() : u, r = Ne(
      () => Object.entries(n).map(([u, c]) => {
        const g = a(c, s);
        return { idx: u, topic: c, num: g };
      }).filter(({ topic: u }) => u !== void 0)
    ), i = (u) => {
      if (!(u.target instanceof HTMLInputElement))
        return console.error("Trying to click on non-input element");
      const c = u.target.name, g = u.target.value;
      t.modifySelectedTags(u.target.checked, { category: c, topic: g });
    }, a = (u, c) => {
      var y;
      const g = t.getselectedtags();
      if (!g[c] || (y = g[c]) != null && y.includes(
        u
      ))
        return null;
      const p = JSON.parse(
        JSON.stringify(t.getselectedtags())
      );
      p[c].includes(u) || p[c].push(u);
      const _ = t.allQs;
      return Pe(
        _,
        p
      ).length.toString();
    };
    return (u, c) => (h(), v("ul", null, [
      (h(!0), v(U, null, Z(r.value, ({ idx: g, num: p, topic: _ }) => (h(), v("li", {
        key: g,
        class: R(["filter-options", { "grey-out": p === "0" }])
      }, [
        m("input", {
          id: `${u.category}-${_}-checkbox`,
          type: "checkbox",
          name: u.category,
          value: _,
          disabled: p === "0",
          onChange: c[0] || (c[0] = (y) => i(y))
        }, null, 40, Rn),
        m("label", {
          for: `${u.category}-${_}-checkbox`
        }, [
          Ke(Q(o(_)) + " ", 1),
          p !== null && p !== "0" ? (h(), v("span", Bn, Q(p), 1)) : q("", !0)
        ], 8, Fn)
      ], 2))), 128))
    ]));
  }
}), Gn = /* @__PURE__ */ M(Hn, [["__scopeId", "data-v-e575c3ac"]]), Jn = { class: "filter" }, Wn = { class: "category-heading" }, Yn = /* @__PURE__ */ N({
  __name: "MCQTagOptions",
  setup(e) {
    const t = j().allQs.map((r) => r.tags), o = ft(t);
    return (r, i) => (h(), v("div", Jn, [
      (h(!0), v(U, null, Z(Object.entries(w(o)), ([a, u]) => (h(), v("div", {
        key: a,
        class: "category"
      }, [
        m("h2", Wn, Q(a), 1),
        ee(Gn, {
          category: a,
          topics: u
        }, null, 8, ["category", "topics"])
      ]))), 128))
    ]));
  }
}), Kn = /* @__PURE__ */ M(Yn, [["__scopeId", "data-v-efaccb2c"]]), Xn = { for: "optionName" }, Zn = ["value"], es = /* @__PURE__ */ N({
  __name: "DropDownbox",
  props: {
    options: {},
    optionName: {},
    disabled: { type: Boolean }
  },
  setup(e) {
    const s = j(), n = E(0);
    function t(o) {
      const r = o.target;
      r.value && (n.value = parseFloat(r.value) * 60, s.setTimeLimit(n.value));
    }
    return (o, r) => (h(), v("div", {
      class: R(o.disabled ? "dropdown input-disabled" : "dropdown")
    }, [
      m("label", Xn, Q(o.optionName) + ":   ", 1),
      m("select", {
        id: "optionName",
        name: "optionName",
        onChange: t
      }, [
        (h(!0), v(U, null, Z(o.options, (i) => (h(), v("option", {
          key: i.value,
          value: i.value
        }, Q(i.value) + " " + Q(i.unit), 9, Zn))), 128))
      ], 32)
    ], 2));
  }
}), ts = /* @__PURE__ */ M(es, [["__scopeId", "data-v-5f3ae97a"]]), ue = (e) => (Je("data-v-c3d686ea"), e = e(), We(), e), ns = { class: "start-page-container" }, ss = /* @__PURE__ */ ue(() => /* @__PURE__ */ m("h1", null, "VetCloud Smart Quiz", -1)), os = { class: "quiz-config-container" }, is = { class: "question-config-container" }, rs = { class: "tag-text" }, as = { class: "question-number" }, us = { class: "question-amount-container" }, cs = /* @__PURE__ */ ue(() => /* @__PURE__ */ m("label", { for: "question-amount" }, "Select the amount of questions:", -1)), ls = ["max"], ds = {
  key: 0,
  class: "show-max-msg"
}, fs = /* @__PURE__ */ ue(() => /* @__PURE__ */ m("label", { for: "mode-select" }, "Select mode:", -1)), ps = /* @__PURE__ */ ue(() => /* @__PURE__ */ m("option", { value: "Tutor" }, "Tutor", -1)), ms = /* @__PURE__ */ ue(() => /* @__PURE__ */ m("option", { value: "Timed" }, "Timed", -1)), hs = [
  ps,
  ms
], gs = 3e3, _s = /* @__PURE__ */ N({
  __name: "StartPage",
  emits: ["start-quiz"],
  setup(e, { emit: s }) {
    const n = E(1), t = E("Tutor"), o = E(!1), r = E(null), i = s, a = j();
    Ie(() => {
      kt(() => {
        const g = a.getquestionnumber();
        n.value = Math.min(10, g);
      });
    });
    const u = () => {
      i("start-quiz", {
        questionAmount: n.value,
        mode: t.value
      });
    }, c = () => {
      r.value && clearTimeout(r.value), n.value > a.getquestionnumber() && (n.value = a.getquestionnumber(), o.value = !0, r.value = window.setTimeout(() => {
        o.value = !1;
      }, gs));
    };
    return (g, p) => (h(), v("div", ns, [
      ss,
      ee(Kn),
      m("div", os, [
        m("div", is, [
          m("p", rs, [
            Ke(" Maximum possible questions: "),
            m("span", as, Q(w(a).getquestionnumber()), 1)
          ]),
          m("div", us, [
            cs,
            Ae(m("input", {
              id: "question-amount",
              "onUpdate:modelValue": p[0] || (p[0] = (_) => n.value = _),
              type: "number",
              placeholder: "Question amount",
              min: "1",
              max: w(a).getquestionnumber(),
              onInput: c
            }, null, 40, ls), [
              [
                Qt,
                n.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o.value ? (h(), v("p", ds, " Cannot select more than " + Q(w(a).getquestionnumber()) + " questions. ", 1)) : q("", !0),
          m("div", null, [
            fs,
            Ae(m("select", {
              id: "mode-select",
              "onUpdate:modelValue": p[1] || (p[1] = (_) => t.value = _)
            }, hs, 512), [
              [$t, t.value]
            ])
          ]),
          ee(ts, {
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
      m("button", {
        class: "start-button",
        onClick: u
      }, "Start")
    ]));
  }
}), vs = /* @__PURE__ */ M(_s, [["__scopeId", "data-v-c3d686ea"]]), bs = (e) => e.trim().toLowerCase().replace("_", " "), ys = (e) => e.reduce((s, n) => {
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
  isString: (i) => typeof i == "string",
  isObject: (i) => typeof i == "object" && i !== null,
  isBoolean: (i) => typeof i == "boolean",
  isArray: (i, a) => Array.isArray(i) && i.every(a),
  isNumber: (i) => typeof i == "number",
  isFunction: (i) => typeof i == "function"
};
function $e(e) {
  const s = e.includes(":") && e.split(":").length === 2, n = !e.includes(":") && !e.includes(" ");
  return s || n;
}
function gt(e, s = !1) {
  return P.isArray(e, P.isString) ? s ? e.every($e) : e.some($e) : !1;
}
function ws(e) {
  return P.isObject(e) && P.isString(e.optionValue) && (e.optionCorrect === void 0 || P.isBoolean(e.optionCorrect));
}
function _t(e) {
  return P.isObject(e) && P.isObject(e._id) && // Assuming _id is an object with $oid property
  P.isString(e._id.$oid) && P.isString(e.statement) && gt(e.tags) && // Modified to ensure tags are always checked
  P.isArray(e.optionsList, ws) && P.isString(e.link);
}
function Es(e) {
  return P.isArray(e, _t);
}
const fe = {
  isMCQuestion: _t,
  isMCQuestionArray: Es,
  validateTags: gt,
  isTag: $e
}, Os = (e) => {
  try {
    if (!e)
      throw new Error("No question data found. Please Try again later.");
    return Ts.convertQuestions(ks(e));
  } catch (s) {
    return alert(s), [];
  }
};
function ks(e) {
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
    let { tags: r } = o;
    if (!r || Array.isArray(r) && !r.length)
      return { ...t, noTags: t.noTags + 1 };
    const i = t.totalTags + r.length;
    if (!fe.validateTags(r, !0)) {
      const a = r.filter((c) => fe.isTag(c)), u = t.invalidTags + r.length - a.length;
      return r = a, { ...t, invalidTags: u, totalTags: i };
    }
    return { ...t, totalTags: i };
  }, s);
  return Qs(n, e.length), e;
}
function we(e, s) {
  e && console.warn(s, "color: #FF0000");
}
function Qs(e, s) {
  const { invalidQs: n, invalidTags: t, noTags: o, totalTags: r } = e;
  we(
    n,
    `Invalid Questions Received: %c${n} out of ${s}`
  ), we(
    t,
    `Filtering out invalid tags: %c${t} out of ${r}`
  ), we(o, `Questions with no tags: %c${o}`);
}
const $s = /* @__PURE__ */ N({
  __name: "CrucibleComponent",
  setup(e) {
    const s = E(0), n = j(), t = E(!1), o = E([]), r = He("$dataLink");
    Ye(() => {
      o.value = Os(r.data.questions), console.info("All Questions:", o.value), n.allQs = o.value;
      const a = ft(
        o.value.map((u) => u.tags)
      );
      n.setselectedTags(
        Object.keys(a).reduce((u, c) => ({ ...u, [c]: [] }), {})
      );
    });
    const i = ({ questionAmount: a, mode: u }) => {
      const c = n.getselectedtags();
      if (!o.value.length)
        return alert("Trouble fetching questions, please try again later");
      const g = Pe(
        o.value,
        c
      ), p = mn(a, g);
      s.value = p.length, n.initialiseQuiz(p, u), u === "Timed" && n.setTimeLimit(a * n.timeLimit), t.value = !0;
    };
    return (a, u) => t.value && w(n).quizMode === "Tutor" ? (h(), V(xn, { key: 0 })) : t.value && w(n).quizMode === "Timed" ? (h(), V(Un, { key: 1 })) : (h(), V(vs, {
      key: 2,
      onStartQuiz: i
    }));
  }
}), qs = /* @__PURE__ */ M($s, [["__scopeId", "data-v-7321a104"]]), Ns = {
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
function Cs(e, s = {}) {
  const n = Zt();
  e.use(n), e.component("CrucibleComponent", qs), e.provide("$dataLink", s.dataLink || Ns);
}
export {
  qs as CrucibleComponent,
  Cs as createViewerPlugin,
  Ns as defaultData
};
