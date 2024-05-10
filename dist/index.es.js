import { effectScope as Re, ref as w, markRaw as G, hasInjectionContext as bt, inject as Fe, getCurrentInstance as yt, toRaw as ge, watch as Be, reactive as St, isRef as re, isReactive as $e, toRef as Se, nextTick as Le, computed as Qe, unref as T, getCurrentScope as Tt, onScopeDispose as wt, toRefs as Pe, defineComponent as I, openBlock as h, createElementBlock as g, Fragment as U, normalizeClass as R, withModifiers as Et, createElementVNode as p, toDisplayString as $, renderList as Z, createVNode as ee, createBlock as V, createCommentVNode as q, pushScopeId as He, popScopeId as Ge, onMounted as Je, resolveComponent as kt, onBeforeMount as We, createTextVNode as Ye, withDirectives as Ae, vModelText as Ot, vModelSelect as $t } from "vue";
var Ke = !1;
function de(e, s, t) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, s), e.splice(s, 1, t), t) : (e[s] = t, t);
}
function Te(e, s) {
  if (Array.isArray(e)) {
    e.splice(s, 1);
    return;
  }
  delete e[s];
}
function Qt() {
  return Xe().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Xe() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Nt = typeof Proxy == "function", qt = "devtools-plugin:setup", It = "plugin:settings:set";
let Y, we;
function Ct() {
  var e;
  return Y !== void 0 || (typeof window < "u" && window.performance ? (Y = !0, we = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Y = !0, we = globalThis.perf_hooks.performance) : Y = !1), Y;
}
function Lt() {
  return Ct() ? we.now() : Date.now();
}
class Pt {
  constructor(s, t) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = s, this.hook = t;
    const n = {};
    if (s.settings)
      for (const r in s.settings) {
        const i = s.settings[r];
        n[r] = i.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${s.id}`;
    let a = Object.assign({}, n);
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
    }, t && t.on(It, (r, i) => {
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
    for (const t of this.onQueue)
      this.target.on[t.method](...t.args);
    for (const t of this.targetQueue)
      t.resolve(await this.target[t.method](...t.args));
  }
}
function Ze(e, s) {
  const t = e, n = Xe(), o = Qt(), a = Nt && t.enableEarlyProxy;
  if (o && (n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a))
    o.emit(qt, e, s);
  else {
    const r = a ? new Pt(t, o) : null;
    (n.__VUE_DEVTOOLS_PLUGINS__ = n.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: t,
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
const ae = (e) => oe = e, et = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
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
const ve = typeof window < "u", ie = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && ve, Me = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function At(e, { autoBom: s = !1 } = {}) {
  return s && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Ne(e, s, t) {
  const n = new XMLHttpRequest();
  n.open("GET", e), n.responseType = "blob", n.onload = function() {
    st(n.response, s, t);
  }, n.onerror = function() {
    console.error("could not download file");
  }, n.send();
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
function pe(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const t = document.createEvent("MouseEvents");
    t.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(t);
  }
}
const he = typeof navigator == "object" ? navigator : { userAgent: "" }, nt = /Macintosh/.test(he.userAgent) && /AppleWebKit/.test(he.userAgent) && !/Safari/.test(he.userAgent), st = ve ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !nt ? Mt : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in he ? xt : (
      // Fallback to using FileReader and a popup
      Vt
    )
  )
) : () => {
};
function Mt(e, s = "download", t) {
  const n = document.createElement("a");
  n.download = s, n.rel = "noopener", typeof e == "string" ? (n.href = e, n.origin !== location.origin ? tt(n.href) ? Ne(e, s, t) : (n.target = "_blank", pe(n)) : pe(n)) : (n.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(n.href);
  }, 4e4), setTimeout(function() {
    pe(n);
  }, 0));
}
function xt(e, s = "download", t) {
  if (typeof e == "string")
    if (tt(e))
      Ne(e, s, t);
    else {
      const n = document.createElement("a");
      n.href = e, n.target = "_blank", setTimeout(function() {
        pe(n);
      });
    }
  else
    navigator.msSaveOrOpenBlob(At(e, t), s);
}
function Vt(e, s, t, n) {
  if (n = n || open("", "_blank"), n && (n.document.title = n.document.body.innerText = "downloading..."), typeof e == "string")
    return Ne(e, s, t);
  const o = e.type === "application/octet-stream", a = /constructor/i.test(String(Me.HTMLElement)) || "safari" in Me, r = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((r || o && a || nt) && typeof FileReader < "u") {
    const i = new FileReader();
    i.onloadend = function() {
      let u = i.result;
      if (typeof u != "string")
        throw n = null, new Error("Wrong reader.result type");
      u = r ? u : u.replace(/^data:[^;]*;/, "data:attachment/file;"), n ? n.location.href = u : location.assign(u), n = null;
    }, i.readAsDataURL(e);
  } else {
    const i = URL.createObjectURL(e);
    n ? n.location.assign(i) : location.href = i, n = null, setTimeout(function() {
      URL.revokeObjectURL(i);
    }, 4e4);
  }
}
function k(e, s) {
  const t = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(t, s) : s === "error" ? console.error(t) : s === "warn" ? console.warn(t) : console.log(t);
}
function qe(e) {
  return "_a" in e && "install" in e;
}
function ot() {
  if (!("clipboard" in navigator))
    return k("Your browser doesn't support the Clipboard API", "error"), !0;
}
function it(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (k('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Dt(e) {
  if (!ot())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), k("Global state copied to clipboard.");
    } catch (s) {
      if (it(s))
        return;
      k("Failed to serialize the state. Check the console for more details.", "error"), console.error(s);
    }
}
async function jt(e) {
  if (!ot())
    try {
      rt(e, JSON.parse(await navigator.clipboard.readText())), k("Global state pasted from clipboard.");
    } catch (s) {
      if (it(s))
        return;
      k("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(s);
    }
}
async function zt(e) {
  try {
    st(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (s) {
    k("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(s);
  }
}
let z;
function Ut() {
  z || (z = document.createElement("input"), z.type = "file", z.accept = ".json");
  function e() {
    return new Promise((s, t) => {
      z.onchange = async () => {
        const n = z.files;
        if (!n)
          return s(null);
        const o = n.item(0);
        return s(o ? { text: await o.text(), file: o } : null);
      }, z.oncancel = () => s(null), z.onerror = t, z.click();
    });
  }
  return e;
}
async function Rt(e) {
  try {
    const t = await Ut()();
    if (!t)
      return;
    const { text: n, file: o } = t;
    rt(e, JSON.parse(n)), k(`Global state imported from "${o.name}".`);
  } catch (s) {
    k("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(s);
  }
}
function rt(e, s) {
  for (const t in s) {
    const n = e.state.value[t];
    n ? Object.assign(n, s[t]) : e.state.value[t] = s[t];
  }
}
function x(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const at = "🍍 Pinia (root)", Ee = "_root";
function Ft(e) {
  return qe(e) ? {
    id: Ee,
    label: at
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Bt(e) {
  if (qe(e)) {
    const t = Array.from(e._s.keys()), n = e._s;
    return {
      state: t.map((a) => ({
        editable: !0,
        key: a,
        value: e.state.value[a]
      })),
      getters: t.filter((a) => n.get(a)._getters).map((a) => {
        const r = n.get(a);
        return {
          editable: !1,
          key: a,
          value: r._getters.reduce((i, u) => (i[u] = r[u], i), {})
        };
      })
    };
  }
  const s = {
    state: Object.keys(e.$state).map((t) => ({
      editable: !0,
      key: t,
      value: e.$state[t]
    }))
  };
  return e._getters && e._getters.length && (s.getters = e._getters.map((t) => ({
    editable: !1,
    key: t,
    value: e[t]
  }))), e._customProperties.size && (s.customProperties = Array.from(e._customProperties).map((t) => ({
    editable: !0,
    key: t,
    value: e[t]
  }))), s;
}
function Ht(e) {
  return e ? Array.isArray(e) ? e.reduce((s, t) => (s.keys.push(t.key), s.operations.push(t.type), s.oldValue[t.key] = t.oldValue, s.newValue[t.key] = t.newValue, s), {
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
const me = [], H = "pinia:mutations", O = "pinia", { assign: Jt } = Object, _e = (e) => "🍍 " + e;
function Wt(e, s) {
  Ze({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: me,
    app: e
  }, (t) => {
    typeof t.now != "function" && k("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), t.addTimelineLayer({
      id: H,
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
            Dt(s);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await jt(s), t.sendInspectorTree(O), t.sendInspectorState(O);
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
            await Rt(s), t.sendInspectorTree(O), t.sendInspectorState(O);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (n) => {
            const o = s._s.get(n);
            o ? typeof o.$reset != "function" ? k(`Cannot reset "${n}" store because it doesn't have a "$reset" method implemented.`, "warn") : (o.$reset(), k(`Store "${n}" reset.`)) : k(`Cannot reset "${n}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), t.on.inspectComponent((n, o) => {
      const a = n.componentInstance && n.componentInstance.proxy;
      if (a && a._pStores) {
        const r = n.componentInstance.proxy._pStores;
        Object.values(r).forEach((i) => {
          n.instanceData.state.push({
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
          }), i._getters && i._getters.length && n.instanceData.state.push({
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
    }), t.on.getInspectorTree((n) => {
      if (n.app === e && n.inspectorId === O) {
        let o = [s];
        o = o.concat(Array.from(s._s.values())), n.rootNodes = (n.filter ? o.filter((a) => "$id" in a ? a.$id.toLowerCase().includes(n.filter.toLowerCase()) : at.toLowerCase().includes(n.filter.toLowerCase())) : o).map(Ft);
      }
    }), t.on.getInspectorState((n) => {
      if (n.app === e && n.inspectorId === O) {
        const o = n.nodeId === Ee ? s : s._s.get(n.nodeId);
        if (!o)
          return;
        o && (n.state = Bt(o));
      }
    }), t.on.editInspectorState((n, o) => {
      if (n.app === e && n.inspectorId === O) {
        const a = n.nodeId === Ee ? s : s._s.get(n.nodeId);
        if (!a)
          return k(`store "${n.nodeId}" not found`, "error");
        const { path: r } = n;
        qe(a) ? r.unshift("state") : (r.length !== 1 || !a._customProperties.has(r[0]) || r[0] in a.$state) && r.unshift("$state"), X = !1, n.set(a, r, n.state.value), X = !0;
      }
    }), t.on.editComponentState((n) => {
      if (n.type.startsWith("🍍")) {
        const o = n.type.replace(/^🍍\s*/, ""), a = s._s.get(o);
        if (!a)
          return k(`store "${o}" not found`, "error");
        const { path: r } = n;
        if (r[0] !== "state")
          return k(`Invalid path for store "${o}":
${r}
Only state can be modified.`);
        r[0] = "$state", X = !1, n.set(a, r, n.state.value), X = !0;
      }
    });
  });
}
function Yt(e, s) {
  me.includes(_e(s.$id)) || me.push(_e(s.$id)), Ze({
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
  }, (t) => {
    const n = typeof t.now == "function" ? t.now.bind(t) : Date.now;
    s.$onAction(({ after: r, onError: i, name: u, args: c }) => {
      const _ = ut++;
      t.addTimelineEvent({
        layerId: H,
        event: {
          time: n(),
          title: "🛫 " + u,
          subtitle: "start",
          data: {
            store: x(s.$id),
            action: x(u),
            args: c
          },
          groupId: _
        }
      }), r((m) => {
        F = void 0, t.addTimelineEvent({
          layerId: H,
          event: {
            time: n(),
            title: "🛬 " + u,
            subtitle: "end",
            data: {
              store: x(s.$id),
              action: x(u),
              args: c,
              result: m
            },
            groupId: _
          }
        });
      }), i((m) => {
        F = void 0, t.addTimelineEvent({
          layerId: H,
          event: {
            time: n(),
            logType: "error",
            title: "💥 " + u,
            subtitle: "end",
            data: {
              store: x(s.$id),
              action: x(u),
              args: c,
              error: m
            },
            groupId: _
          }
        });
      });
    }, !0), s._customProperties.forEach((r) => {
      Be(() => T(s[r]), (i, u) => {
        t.notifyComponentUpdate(), t.sendInspectorState(O), X && t.addTimelineEvent({
          layerId: H,
          event: {
            time: n(),
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
      if (t.notifyComponentUpdate(), t.sendInspectorState(O), !X)
        return;
      const c = {
        time: n(),
        title: Gt(i),
        data: Jt({ store: x(s.$id) }, Ht(r)),
        groupId: F
      };
      i === D.patchFunction ? c.subtitle = "⤵️" : i === D.patchObject ? c.subtitle = "🧩" : r && !Array.isArray(r) && (c.subtitle = r.type), r && (c.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: r
        }
      }), t.addTimelineEvent({
        layerId: H,
        event: c
      });
    }, { detached: !0, flush: "sync" });
    const o = s._hotUpdate;
    s._hotUpdate = G((r) => {
      o(r), t.addTimelineEvent({
        layerId: H,
        event: {
          time: n(),
          title: "🔥 " + s.$id,
          subtitle: "HMR update",
          data: {
            store: x(s.$id),
            info: x("HMR update")
          }
        }
      }), t.notifyComponentUpdate(), t.sendInspectorTree(O), t.sendInspectorState(O);
    });
    const { $dispose: a } = s;
    s.$dispose = () => {
      a(), t.notifyComponentUpdate(), t.sendInspectorTree(O), t.sendInspectorState(O), t.getSettings().logStoreChanges && k(`Disposed "${s.$id}" store 🗑`);
    }, t.notifyComponentUpdate(), t.sendInspectorTree(O), t.sendInspectorState(O), t.getSettings().logStoreChanges && k(`"${s.$id}" store installed 🆕`);
  });
}
let ut = 0, F;
function xe(e, s, t) {
  const n = s.reduce((o, a) => (o[a] = ge(e)[a], o), {});
  for (const o in n)
    e[o] = function() {
      const a = ut, r = t ? new Proxy(e, {
        get(...u) {
          return F = a, Reflect.get(...u);
        },
        set(...u) {
          return F = a, Reflect.set(...u);
        }
      }) : e;
      F = a;
      const i = n[o].apply(r, arguments);
      return F = void 0, i;
    };
}
function Kt({ app: e, store: s, options: t }) {
  if (s.$id.startsWith("__hot:"))
    return;
  s._isOptionsAPI = !!t.state, xe(s, Object.keys(t.actions), s._isOptionsAPI);
  const n = s._hotUpdate;
  ge(s)._hotUpdate = function(o) {
    n.apply(this, arguments), xe(s, Object.keys(o._hmrPayload.actions), !!s._isOptionsAPI);
  }, Yt(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    s
  );
}
function Xt() {
  const e = Re(!0), s = e.run(() => w({}));
  let t = [], n = [];
  const o = G({
    install(a) {
      ae(o), o._a = a, a.provide(et, o), a.config.globalProperties.$pinia = o, ie && Wt(a, o), n.forEach((r) => t.push(r)), n = [];
    },
    use(a) {
      return !this._a && !Ke ? n.push(a) : t.push(a), this;
    },
    _p: t,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: s
  });
  return ie && typeof Proxy < "u" && o.use(Kt), o;
}
function ct(e, s) {
  for (const t in s) {
    const n = s[t];
    if (!(t in e))
      continue;
    const o = e[t];
    J(o) && J(n) && !re(n) && !$e(n) ? e[t] = ct(o, n) : e[t] = n;
  }
  return e;
}
const lt = () => {
};
function Ve(e, s, t, n = lt) {
  e.push(s);
  const o = () => {
    const a = e.indexOf(s);
    a > -1 && (e.splice(a, 1), n());
  };
  return !t && Tt() && wt(o), o;
}
function K(e, ...s) {
  e.slice().forEach((t) => {
    t(...s);
  });
}
const Zt = (e) => e();
function ke(e, s) {
  e instanceof Map && s instanceof Map && s.forEach((t, n) => e.set(n, t)), e instanceof Set && s instanceof Set && s.forEach(e.add, e);
  for (const t in s) {
    if (!s.hasOwnProperty(t))
      continue;
    const n = s[t], o = e[t];
    J(o) && J(n) && e.hasOwnProperty(t) && !re(n) && !$e(n) ? e[t] = ke(o, n) : e[t] = n;
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
const { assign: P } = Object;
function De(e) {
  return !!(re(e) && e.effect);
}
function je(e, s, t, n) {
  const { state: o, actions: a, getters: r } = s, i = t.state.value[e];
  let u;
  function c() {
    !i && (process.env.NODE_ENV === "production" || !n) && (t.state.value[e] = o ? o() : {});
    const _ = process.env.NODE_ENV !== "production" && n ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Pe(w(o ? o() : {}).value)
    ) : Pe(t.state.value[e]);
    return P(_, a, Object.keys(r || {}).reduce((m, v) => (process.env.NODE_ENV !== "production" && v in _ && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${v}" in store "${e}".`), m[v] = G(Qe(() => {
      ae(t);
      const E = t._s.get(e);
      return r[v].call(E, E);
    })), m), {}));
  }
  return u = Oe(e, c, s, t, n, !0), u;
}
function Oe(e, s, t = {}, n, o, a) {
  let r;
  const i = P({ actions: {} }, t);
  if (process.env.NODE_ENV !== "production" && !n._e.active)
    throw new Error("Pinia destroyed");
  const u = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Ke && (u.onTrigger = (f) => {
    c ? E = f : c == !1 && !d._hotUpdating && (Array.isArray(E) ? E.push(f) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let c, _, m = [], v = [], E;
  const M = n.state.value[e];
  !a && !M && (process.env.NODE_ENV === "production" || !o) && (n.state.value[e] = {});
  const W = w({});
  let ce;
  function te(f) {
    let l;
    c = _ = !1, process.env.NODE_ENV !== "production" && (E = []), typeof f == "function" ? (f(n.state.value[e]), l = {
      type: D.patchFunction,
      storeId: e,
      events: E
    }) : (ke(n.state.value[e], f), l = {
      type: D.patchObject,
      payload: f,
      storeId: e,
      events: E
    });
    const y = ce = Symbol();
    Le().then(() => {
      ce === y && (c = !0);
    }), _ = !0, K(m, l, n.state.value[e]);
  }
  const be = a ? function() {
    const { state: l } = t, y = l ? l() : {};
    this.$patch((N) => {
      P(N, y);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : lt
  );
  function ye() {
    r.stop(), m = [], v = [], n._s.delete(e);
  }
  function le(f, l) {
    return function() {
      ae(n);
      const y = Array.from(arguments), N = [], ne = [];
      function gt(L) {
        N.push(L);
      }
      function vt(L) {
        ne.push(L);
      }
      K(v, {
        args: y,
        name: f,
        store: d,
        after: gt,
        onError: vt
      });
      let se;
      try {
        se = l.apply(this && this.$id === e ? this : d, y);
      } catch (L) {
        throw K(ne, L), L;
      }
      return se instanceof Promise ? se.then((L) => (K(N, L), L)).catch((L) => (K(ne, L), Promise.reject(L))) : (K(N, se), se);
    };
  }
  const b = /* @__PURE__ */ G({
    actions: {},
    getters: {},
    state: [],
    hotState: W
  }), S = {
    _p: n,
    // _s: scope,
    $id: e,
    $onAction: Ve.bind(null, v),
    $patch: te,
    $reset: be,
    $subscribe(f, l = {}) {
      const y = Ve(m, f, l.detached, () => N()), N = r.run(() => Be(() => n.state.value[e], (ne) => {
        (l.flush === "sync" ? _ : c) && f({
          storeId: e,
          type: D.direct,
          events: E
        }, ne);
      }, P({}, u, l)));
      return y;
    },
    $dispose: ye
  }, d = St(process.env.NODE_ENV !== "production" || ie ? P(
    {
      _hmrPayload: b,
      _customProperties: G(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    S
    // must be added later
    // setupStore
  ) : S);
  n._s.set(e, d);
  const C = (n._a && n._a.runWithContext || Zt)(() => n._e.run(() => (r = Re()).run(s)));
  for (const f in C) {
    const l = C[f];
    if (re(l) && !De(l) || $e(l))
      process.env.NODE_ENV !== "production" && o ? de(W.value, f, Se(C, f)) : a || (M && tn(l) && (re(l) ? l.value = M[f] : ke(l, M[f])), n.state.value[e][f] = l), process.env.NODE_ENV !== "production" && b.state.push(f);
    else if (typeof l == "function") {
      const y = process.env.NODE_ENV !== "production" && o ? l : le(f, l);
      C[f] = y, process.env.NODE_ENV !== "production" && (b.actions[f] = l), i.actions[f] = l;
    } else
      process.env.NODE_ENV !== "production" && De(l) && (b.getters[f] = a ? (
        // @ts-expect-error
        t.getters[f]
      ) : l, ve && (C._getters || // @ts-expect-error: same
      (C._getters = G([]))).push(f));
  }
  if (P(d, C), P(ge(d), C), Object.defineProperty(d, "$state", {
    get: () => process.env.NODE_ENV !== "production" && o ? W.value : n.state.value[e],
    set: (f) => {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error("cannot set hotState");
      te((l) => {
        P(l, f);
      });
    }
  }), process.env.NODE_ENV !== "production" && (d._hotUpdate = G((f) => {
    d._hotUpdating = !0, f._hmrPayload.state.forEach((l) => {
      if (l in d.$state) {
        const y = f.$state[l], N = d.$state[l];
        typeof y == "object" && J(y) && J(N) ? ct(y, N) : f.$state[l] = N;
      }
      de(d, l, Se(f.$state, l));
    }), Object.keys(d.$state).forEach((l) => {
      l in f.$state || Te(d, l);
    }), c = !1, _ = !1, n.state.value[e] = Se(f._hmrPayload, "hotState"), _ = !0, Le().then(() => {
      c = !0;
    });
    for (const l in f._hmrPayload.actions) {
      const y = f[l];
      de(d, l, le(l, y));
    }
    for (const l in f._hmrPayload.getters) {
      const y = f._hmrPayload.getters[l], N = a ? (
        // special handling of options api
        Qe(() => (ae(n), y.call(d, d)))
      ) : y;
      de(d, l, N);
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
      Object.defineProperty(d, l, P({ value: d[l] }, f));
    });
  }
  return n._p.forEach((f) => {
    if (ie) {
      const l = r.run(() => f({
        store: d,
        app: n._a,
        pinia: n,
        options: i
      }));
      Object.keys(l || {}).forEach((y) => d._customProperties.add(y)), P(d, l);
    } else
      P(d, r.run(() => f({
        store: d,
        app: n._a,
        pinia: n,
        options: i
      })));
  }), process.env.NODE_ENV !== "production" && d.$state && typeof d.$state == "object" && typeof d.$state.constructor == "function" && !d.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${d.$id}".`), M && a && t.hydrate && t.hydrate(d.$state, M), c = !0, _ = !0, d;
}
function nn(e, s, t) {
  let n, o;
  const a = typeof s == "function";
  if (typeof e == "string")
    n = e, o = a ? t : s;
  else if (o = e, n = e.id, process.env.NODE_ENV !== "production" && typeof n != "string")
    throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
  function r(i, u) {
    const c = bt();
    if (i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && oe && oe._testing ? null : i) || (c ? Fe(et, null) : null), i && ae(i), process.env.NODE_ENV !== "production" && !oe)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    i = oe, i._s.has(n) || (a ? Oe(n, s, o, i) : je(n, o, i), process.env.NODE_ENV !== "production" && (r._pinia = i));
    const _ = i._s.get(n);
    if (process.env.NODE_ENV !== "production" && u) {
      const m = "__hot:" + n, v = a ? Oe(m, s, o, i, !0) : je(m, P({}, o), i, !0);
      u._hotUpdate(v), delete i.state.value[m], i._s.delete(m);
    }
    if (process.env.NODE_ENV !== "production" && ve) {
      const m = yt();
      if (m && m.proxy && // avoid adding stores that are just built for hot module replacement
      !u) {
        const v = m.proxy, E = "_pStores" in v ? v._pStores : v._pStores = {};
        E[n] = _;
      }
    }
    return _;
  }
  return r.$id = n, r;
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
    const t = s, n = () => t("selectOption");
    return (o, a) => (h(), g(U, null, [
      (h(), g("input", {
        id: "option-" + o.optionKey,
        key: o.optionKey,
        "test-id": "radio_options",
        type: "radio",
        name: "options",
        checked: o.checked,
        class: R(o.submitted && "ignore-hover"),
        onClick: [
          a[0] || (a[0] = (r) => n()),
          a[1] || (a[1] = Et(() => {
          }, ["stop"]))
        ]
      }, null, 10, sn)),
      (h(), g("label", {
        key: o.optionKey,
        for: "option-" + o.optionKey,
        class: R(o.submitted ? "mcq-option-label ignore-hover" : "mcq-option-label"),
        onClick: a[2] || (a[2] = (r) => n()),
        innerHTML: o.option.optionValue
      }, null, 10, on))
    ], 64));
  }
}), A = (e, s) => {
  const t = e.__vccOpts || e;
  for (const [n, o] of s)
    t[n] = o;
  return t;
}, an = /* @__PURE__ */ A(rn, [["__scopeId", "data-v-e5ddf38c"]]), un = ["disabled"], cn = /* @__PURE__ */ I({
  __name: "MCQButton",
  props: {
    submitted: { type: Boolean },
    selectedOption: {},
    hideSkip: { type: Boolean }
  },
  emits: ["submitAnswer", "nextQuestion", "skipQuestion"],
  setup(e, { emit: s }) {
    const t = w("skip"), n = w("Skip"), o = s, a = (u, c) => {
      !u && c ? r("next", "Next", "submitAnswer") : u && c ? r("skip", "Skip", "nextQuestion") : !u && !c && r("skip", "Skip", "skipQuestion");
    }, r = (u, c, _) => {
      t.value = u, n.value = c, o(_);
    }, i = (u, c) => u && c ? { class: "next", text: "Next" } : !u && c ? { class: "submit", text: "Submit" } : { class: t.value, text: n.value };
    return (u, c) => (h(), g("div", null, [
      p("button", {
        disabled: u.hideSkip && i(u.submitted, u.selectedOption).class === "skip",
        class: R(["mcq-button", i(u.submitted, u.selectedOption).class]),
        onClick: c[0] || (c[0] = (_) => a(u.submitted, u.selectedOption))
      }, $(i(u.submitted, u.selectedOption).text), 11, un)
    ]));
  }
}), ln = /* @__PURE__ */ A(cn, [["__scopeId", "data-v-847b8dd5"]]), dn = /* @__PURE__ */ I({
  __name: "NextButton",
  props: {
    buttonName: {}
  },
  emits: ["nextQuestion", "prevQuestion"],
  setup(e, { emit: s }) {
    const { buttonName: t } = e, n = s, o = () => {
      a(t !== "←" ? "nextQuestion" : "prevQuestion");
    }, a = (r) => {
      n(r);
    };
    return (r, i) => (h(), g("div", null, [
      p("button", {
        class: R(r.buttonName === "Submit" ? "submit_btn" : "mcq-button"),
        onClick: i[0] || (i[0] = (u) => o())
      }, $(r.buttonName), 3)
    ]));
  }
}), ze = /* @__PURE__ */ A(dn, [["__scopeId", "data-v-8be7f61e"]]), fn = (e) => {
  for (let s = e.length - 1; s > 0; s--) {
    const t = Math.floor(Math.random() * (s + 1));
    [e[s], e[t]] = [e[t], e[s]];
  }
  return e;
}, pn = (e, s) => fn(s).slice(0, e);
function dt(e) {
  const s = e.reduce(
    (n, o) => (Object.keys(o).forEach((a) => {
      n[a] || (n[a] = /* @__PURE__ */ new Set()), n[a].add(o[a]);
    }), n),
    {}
  );
  return Object.keys(s).reduce(
    (n, o) => (n[o] = [...s[o]], n),
    {}
  );
}
function Ie(e, s) {
  return e.filter((t) => Object.keys(s).every((n) => !s[n].length || s[n].includes(t.tags[n])));
}
function hn(e, s, t) {
  const n = e[s].question.optionsList;
  for (let o = 0; o < n.length; o++)
    if (n[o].optionValue === t)
      return o;
}
const ft = (e, s) => s.findIndex((t) => {
  var n;
  return ((n = t.question._id) == null ? void 0 : n.$oid) === e;
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
      return Ie(e, this.selectedTags).length;
    },
    setselectedTags(e) {
      this.selectedTags = e;
    },
    getselectedtags() {
      return this.selectedTags;
    },
    modifySelectedTags(e, { category: s, topic: t }) {
      this.selectedTags[s] && (this.selectedTags[s] = e ? [...this.selectedTags[s], t] : this.selectedTags[s].filter(
        (n) => n !== t
      ));
    },
    initialiseQuiz(e, s) {
      this.questionsQueue = e, this.questionsStack = [], this.quizMode = s, this.quizStats = e.map((t) => ({
        question: t,
        correct: 0,
        skipped: 0,
        attempts: 0,
        selectedValue: ""
      }));
    },
    incrementStat(e, s, t) {
      const n = ft(e, this.quizStats);
      if (this.quizStats[n]) {
        if (t !== void 0) {
          if (this.quizStats[n][s]++, t === "-1") {
            this.quizStats[n].selectedValue = "Reached Time Limit";
            return;
          }
          const o = this.quizStats[n].question.optionsList.map((a) => a.optionCorrect).indexOf(!0);
          Number(t) === Number(o) ? this.quizStats[n].correct = 1 : this.quizStats[n].correct = 0;
        }
        this.quizStats[n].selectedValue = t !== void 0 ? this.quizStats[n].question.optionsList[Number(t)].optionValue : "";
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
    const t = j(), { statement: n, optionsList: o, _id: a } = e, r = w(null), i = w(!1), u = s, c = w(t.getRemainingQuestions()), _ = () => {
      i.value = !0;
    }, m = () => {
      r.value = null, u("nextQuestion");
    }, v = (b) => {
      W(b), c.value = t.getRemainingQuestions(), u("nextQuestion");
    }, E = () => {
      W(a), u("skipQuestion");
    }, M = (b) => t.incrementStat(
      b.$oid,
      "attempts",
      r.value ?? void 0
    ), W = (b) => {
      M(b), i.value = !1, r.value = null;
    }, ce = () => {
      u("prevQuestion");
    }, te = (b, S) => {
      i.value || (r.value = r.value === S ? null : S), M(b);
    }, be = (b, S, d) => t.quizMode === "Timed" ? ye(b, S) : le(S, d);
    function ye(b, S) {
      const d = ft(b.$oid, t.quizStats), B = t.quizStats[d].selectedValue, C = hn(
        t.quizStats,
        d,
        B
      );
      return String(C) === S ? "selected" : "";
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
          onClick: (C) => te(b._id, d)
        }, [
          ee(an, {
            "option-key": d,
            checked: r.value === d,
            option: B,
            submitted: i.value,
            onSelectOption: (C) => te(b._id, d)
          }, null, 8, ["option-key", "checked", "option", "submitted", "onSelectOption"])
        ], 10, gn))), 128))
      ]),
      T(t).quizMode === "Tutor" ? (h(), V(ln, {
        key: 0,
        submitted: i.value,
        "selected-option": r.value,
        "hide-skip": c.value <= 1,
        onSubmitAnswer: _,
        onNextQuestion: S[0] || (S[0] = (d) => v(b._id)),
        onSkipQuestion: E
      }, null, 8, ["submitted", "selected-option", "hide-skip"])) : q("", !0),
      p("div", vn, [
        T(t).quizMode === "Timed" ? (h(), V(ze, {
          key: 0,
          "button-name": T(t).questionsQueue.length >= 1 ? "→" : "Submit",
          onNextQuestion: S[1] || (S[1] = (d) => m())
        }, null, 8, ["button-name"])) : q("", !0),
        T(t).quizMode === "Timed" && T(t).questionsStack.length > 1 ? (h(), V(ze, {
          key: 1,
          "button-name": "←",
          onPrevQuestion: S[2] || (S[2] = (d) => ce())
        })) : q("", !0)
      ])
    ], 64));
  }
}), pt = /* @__PURE__ */ A(bn, [["__scopeId", "data-v-6e8339a0"]]), yn = (e) => (He("data-v-4ffecbcd"), e = e(), Ge(), e), Sn = { class: "report-container" }, Tn = { class: "mcq-report" }, wn = { class: "table-container" }, En = /* @__PURE__ */ yn(() => /* @__PURE__ */ p("thead", null, [
  /* @__PURE__ */ p("tr", null, [
    /* @__PURE__ */ p("th", null, "question"),
    /* @__PURE__ */ p("th", null, "correct option"),
    /* @__PURE__ */ p("th", null, "your answer")
  ])
], -1)), kn = { class: "question-row" }, On = ["href", "innerHTML"], $n = { class: "answer-row" }, Qn = ["innerHTML"], Nn = { class: "answer-row" }, qn = ["innerHTML"], In = { class: "mcq-result" }, Cn = { class: "score" }, Ln = /* @__PURE__ */ I({
  __name: "MCQStatus",
  setup(e) {
    const s = j(), t = s.quizStats, n = s.quizStats.length, o = t.filter((r) => r.correct === 1).length, a = (o * 100 / n).toFixed(0);
    return (r, i) => (h(), g("div", Sn, [
      p("div", Tn, [
        p("div", wn, [
          p("table", null, [
            En,
            p("tbody", null, [
              (h(!0), g(U, null, Z(Object.entries(T(t)), ([u, c]) => (h(), g("tr", {
                key: u,
                class: "quiz-statment"
              }, [
                p("td", kn, [
                  p("a", {
                    href: c.question.link,
                    target: "_blank",
                    innerHTML: c.question.statement
                  }, null, 8, On)
                ]),
                p("td", $n, [
                  (h(!0), g(U, null, Z(Object.entries(
                    c.question.optionsList
                  ), ([_, m]) => (h(), g("span", { key: _ }, [
                    m.optionCorrect ? (h(), g("span", {
                      key: 0,
                      innerHTML: m.optionValue
                    }, null, 8, Qn)) : q("", !0)
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
          p("span", Cn, "⌛ Result: " + $(T(o)) + " out of " + $(T(n)) + " - (" + $(T(a)) + " %)", 1)
        ])
      ])
    ]));
  }
}), ht = /* @__PURE__ */ A(Ln, [["__scopeId", "data-v-4ffecbcd"]]), Pn = /* @__PURE__ */ I({
  __name: "MCQQuiz",
  setup(e) {
    const s = w(), t = j();
    Je(() => {
      o();
    });
    const n = () => {
      t.enqueueQuestion(s.value), o();
    }, o = () => {
      s.value = t.dequeueQuestion();
    }, a = () => window.location.reload();
    return (r, i) => {
      const u = kt("MCQInfoPanel");
      return h(), g("main", null, [
        ee(u),
        s.value ? (h(), V(pt, {
          key: 0,
          statement: s.value.statement,
          "options-list": s.value.optionsList,
          _id: s.value._id,
          onNextQuestion: o,
          onSkipQuestion: n
        }, null, 8, ["statement", "options-list", "_id"])) : q("", !0),
        s.value ? q("", !0) : (h(), V(ht, { key: 1 })),
        s.value ? q("", !0) : (h(), g("button", {
          key: 2,
          class: "btn-relocate",
          onClick: a
        }, " End "))
      ]);
    };
  }
}), An = /* @__PURE__ */ A(Pn, [["__scopeId", "data-v-937e1a1b"]]), Mn = {
  key: 0,
  class: "time-left-header"
}, xn = { class: "questions-left-header" }, Vn = /* @__PURE__ */ I({
  __name: "MCQInfoPanel",
  props: {
    timeLeft: {
      type: Number,
      default: 0
    }
  },
  setup(e) {
    const s = j(), t = (n) => {
      const o = Math.floor(n / 60), a = n % 60;
      return `${o}:${a < 10 ? "0" : ""}${a}`;
    };
    return (n, o) => (h(), g(U, null, [
      e.timeLeft ? (h(), g("h3", Mn, " Time left: " + $(t(e.timeLeft)), 1)) : q("", !0),
      p("h3", xn, " Question " + $(T(s).questionsStack.length) + " out of " + $(T(s).questionsQueue.length + T(s).questionsStack.length), 1)
    ], 64));
  }
}), Ue = 1e3, Dn = "-1", jn = /* @__PURE__ */ I({
  __name: "MCQTimedQuiz",
  setup(e) {
    const s = j(), t = w();
    let n = null, o = null;
    const a = w(s.timeLimit);
    Je(() => {
      i();
    }), We(() => {
      c(), _();
    });
    const r = () => {
      t.value = s.removeFromLastHistory() ?? t.value;
    }, i = () => t.value = s.dequeueQuestion(), u = () => window.location.reload(), c = () => {
      n && clearTimeout(n), o && clearInterval(o);
    }, _ = () => {
      a.value = s.timeLimit;
      const v = () => t.value ? a.value ? a.value-- : m() : c();
      o = window.setInterval(v, Ue), n = window.setTimeout(() => {
      }, s.timeLimit * Ue);
    }, m = () => {
      var E;
      c();
      const v = (M) => s.incrementStat(M, "attempts", Dn);
      for (v(((E = t.value) == null ? void 0 : E._id.$oid) ?? ""); t.value = s.dequeueQuestion(); )
        v(t.value._id.$oid);
      return alert("Time's up! Quiz has ended."), i();
    };
    return (v, E) => (h(), g("main", null, [
      ee(Vn, { "time-left": a.value }, null, 8, ["time-left"]),
      t.value ? (h(), V(pt, {
        key: 0,
        statement: t.value.statement,
        "options-list": t.value.optionsList,
        _id: t.value._id,
        onNextQuestion: i,
        onPrevQuestion: r
      }, null, 8, ["statement", "options-list", "_id"])) : q("", !0),
      t.value ? q("", !0) : (h(), V(ht, { key: 1 })),
      t.value ? q("", !0) : (h(), g("button", {
        key: 2,
        class: "btn-relocate",
        onClick: u
      }, " End "))
    ]));
  }
}), zn = /* @__PURE__ */ A(jn, [["__scopeId", "data-v-cffdfe07"]]), Un = ["id", "name", "value", "disabled"], Rn = ["for"], Fn = {
  key: 0,
  class: "question-number"
}, Bn = /* @__PURE__ */ I({
  __name: "FilterCheckbox",
  props: {
    category: {},
    topics: {}
  },
  setup(e) {
    const { category: s, topics: t } = e, n = j(), o = Qe(
      () => Object.entries(t).map(([i, u]) => {
        const c = r(u, s);
        return { idx: i, topic: u, num: c };
      }).filter(({ topic: i }) => i !== void 0)
    ), a = (i) => {
      if (!(i.target instanceof HTMLInputElement))
        return console.error("Trying to click on non-input element");
      const u = i.target.name, c = i.target.value;
      n.modifySelectedTags(i.target.checked, { category: u, topic: c });
    }, r = (i, u) => {
      var v;
      const c = n.getselectedtags();
      if (!c[u] || (v = c[u]) != null && v.includes(
        i
      ))
        return null;
      const _ = JSON.parse(
        JSON.stringify(n.getselectedtags())
      );
      _[u].includes(i) || _[u].push(i);
      const m = n.allQs;
      return Ie(
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
          Ye($(m) + " ", 1),
          _ !== null && _ !== "0" ? (h(), g("span", Fn, $(_), 1)) : q("", !0)
        ], 8, Rn)
      ], 2))), 128))
    ]));
  }
}), Hn = /* @__PURE__ */ A(Bn, [["__scopeId", "data-v-0f1deb69"]]), Gn = { class: "filter" }, Jn = { class: "category-heading" }, Wn = /* @__PURE__ */ I({
  __name: "MCQTagOptions",
  setup(e) {
    const n = j().allQs.map((a) => a.tags), o = dt(n);
    return (a, r) => (h(), g("div", Gn, [
      (h(!0), g(U, null, Z(Object.entries(T(o)), ([i, u]) => (h(), g("div", {
        key: i,
        class: "category"
      }, [
        p("h2", Jn, $(i), 1),
        ee(Hn, {
          category: i,
          topics: u
        }, null, 8, ["category", "topics"])
      ]))), 128))
    ]));
  }
}), Yn = /* @__PURE__ */ A(Wn, [["__scopeId", "data-v-efaccb2c"]]), Kn = { for: "optionName" }, Xn = ["value"], Zn = /* @__PURE__ */ I({
  __name: "DropDownbox",
  props: {
    options: {},
    optionName: {},
    disabled: { type: Boolean }
  },
  setup(e) {
    const s = j(), t = w(0);
    function n(o) {
      const a = o.target;
      a.value && (t.value = parseFloat(a.value) * 60, s.setTimeLimit(t.value));
    }
    return (o, a) => (h(), g("div", {
      class: R(o.disabled ? "dropdown input-disabled" : "dropdown")
    }, [
      p("label", Kn, $(o.optionName) + ":   ", 1),
      p("select", {
        id: "optionName",
        name: "optionName",
        onChange: n
      }, [
        (h(!0), g(U, null, Z(o.options, (r) => (h(), g("option", {
          key: r.value,
          value: r.value
        }, $(r.value) + " " + $(r.unit), 9, Xn))), 128))
      ], 32)
    ], 2));
  }
}), es = /* @__PURE__ */ A(Zn, [["__scopeId", "data-v-5f3ae97a"]]), ue = (e) => (He("data-v-30ab292c"), e = e(), Ge(), e), ts = { class: "start-page-container" }, ns = /* @__PURE__ */ ue(() => /* @__PURE__ */ p("h1", null, "VetCloud Smart Quiz", -1)), ss = { class: "quiz-config-container" }, os = { class: "question-config-container" }, is = { class: "tag-text" }, rs = { class: "question-number" }, as = { class: "question-amount-container" }, us = /* @__PURE__ */ ue(() => /* @__PURE__ */ p("label", { for: "question-amount" }, "Select the amount of questions:", -1)), cs = ["max"], ls = {
  key: 0,
  class: "show-max-msg"
}, ds = /* @__PURE__ */ ue(() => /* @__PURE__ */ p("label", { for: "mode-select" }, "Select mode:", -1)), fs = /* @__PURE__ */ ue(() => /* @__PURE__ */ p("option", { value: "Tutor" }, "Tutor", -1)), ps = /* @__PURE__ */ ue(() => /* @__PURE__ */ p("option", { value: "Timed" }, "Timed", -1)), hs = [
  fs,
  ps
], ms = 3e3, _s = /* @__PURE__ */ I({
  __name: "StartPage",
  emits: ["start-quiz"],
  setup(e, { emit: s }) {
    const t = w(1), n = w("Tutor"), o = w(!1), a = w(null), r = s, i = j(), u = () => {
      r("start-quiz", {
        questionAmount: t.value,
        mode: n.value
      });
    }, c = () => {
      a.value && clearTimeout(a.value), t.value > i.getquestionnumber() && (t.value = i.getquestionnumber(), o.value = !0, a.value = window.setTimeout(() => {
        o.value = !1;
      }, ms));
    };
    return (_, m) => (h(), g("div", ts, [
      ns,
      ee(Yn),
      p("div", ss, [
        p("div", os, [
          p("p", is, [
            Ye(" Maximum possible questions: "),
            p("span", rs, $(T(i).getquestionnumber()), 1)
          ]),
          p("div", as, [
            us,
            Ae(p("input", {
              id: "question-amount",
              "onUpdate:modelValue": m[0] || (m[0] = (v) => t.value = v),
              type: "number",
              placeholder: "Question amount",
              min: "1",
              max: T(i).getquestionnumber(),
              onInput: c
            }, null, 40, cs), [
              [
                Ot,
                t.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o.value ? (h(), g("p", ls, " Cannot select more than " + $(T(i).getquestionnumber()) + " questions. ", 1)) : q("", !0),
          p("div", null, [
            ds,
            Ae(p("select", {
              id: "mode-select",
              "onUpdate:modelValue": m[1] || (m[1] = (v) => n.value = v)
            }, hs, 512), [
              [$t, n.value]
            ])
          ]),
          ee(es, {
            options: [
              { value: 1, label: "Time Option 2", unit: "Min." },
              { value: 1.5, label: "Time Option 1", unit: "Min." }
            ],
            "option-name": "Time per Question",
            class: R(n.value === "Timed" ? "" : "input-disabled"),
            disabled: n.value !== "Timed"
          }, null, 8, ["options", "class", "disabled"])
        ])
      ]),
      p("button", {
        class: "start-button",
        onClick: u
      }, "Start")
    ]));
  }
}), gs = /* @__PURE__ */ A(_s, [["__scopeId", "data-v-30ab292c"]]);
Array.from(
  { length: 10 },
  (e, s) => `VETS20${s + 10}`
);
const vs = (e) => e.reduce((s, t) => {
  if (!t.includes(":"))
    return s;
  let [n, o] = t.split(":");
  return [n, o] = [n.trim().toLowerCase(), o.trim().toLowerCase()], s[n] = o, s;
}, {}), bs = (e) => e.map((s) => ({
  _id: { $oid: s._id.$oid },
  statement: s.statement,
  tags: vs(s.tags),
  optionsList: s.optionsList,
  link: s.link
})), ys = { convertQuestions: bs }, Q = {
  isString: (r) => typeof r == "string",
  isObject: (r) => typeof r == "object" && r !== null,
  isBoolean: (r) => typeof r == "boolean",
  isArray: (r, i) => Array.isArray(r) && r.every(i),
  isNumber: (r) => typeof r == "number",
  isFunction: (r) => typeof r == "function"
};
function Ce(e) {
  const s = e.includes(":") && e.split(":").length === 2, t = !e.includes(":") && e.split(" ").length === 1;
  return s || t;
}
function mt(e) {
  return Q.isArray(e, Q.isString) && e.some(Ce);
}
function Ss(e) {
  return Q.isArray(e, Q.isString) && e.every(Ce);
}
function Ts(e) {
  return Q.isObject(e) && Q.isString(e.optionValue) && (e.optionCorrect === void 0 || Q.isBoolean(e.optionCorrect));
}
function _t(e) {
  return Q.isObject(e) && Q.isObject(e._id) && Q.isString(e._id.$oid) && Q.isString(e.statement) && mt(e.tags) && Q.isArray(e.optionsList, Ts) && Q.isString(e.link);
}
function ws(e) {
  return Q.isArray(e, _t);
}
const fe = {
  isMCQuestion: _t,
  isMCQuestionArray: ws,
  isAllTags: Ss,
  isTags: mt,
  isTag: Ce,
  validate: Q
}, Es = (e) => {
  try {
    if (!e)
      throw new Error("No question data found. Please Try again later.");
    return ys.convertQuestions(ks(e));
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
  let s = 0, t = 0, n = 0, o = 0;
  const a = e.length;
  for (const r of e) {
    fe.isMCQuestion(r) || n++;
    let { tags: i } = r;
    if (!i || Array.isArray(i) && !i.length) {
      t++;
      continue;
    }
    if (o += i.length, !fe.isAllTags(i)) {
      const u = i.filter((c) => fe.isTag(c));
      s += i.length - u.length, i = u;
    }
  }
  return Os(n, a, s, o, t), e;
}
function Os(e, s, t, n, o) {
  e && console.warn(
    `Invalid Questions Received: %c${e} out of ${s}`,
    "color: #FF0000"
  ), t && console.warn(
    `Filtering out invalid tags: %c${t} out of ${n}`,
    "color: #FF0000"
  ), o && console.warn(`Questions with no tags: %c${o}`, "color: #FF0000");
}
const $s = /* @__PURE__ */ I({
  __name: "CrucibleComponent",
  setup(e) {
    const s = w(0), t = j(), n = w(!1), o = w([]), a = Fe("$dataLink");
    We(() => {
      o.value = Es(a.data.questions), console.info("All Questions:", o.value), t.allQs = o.value;
      const i = dt(
        o.value.map((u) => u.tags)
      );
      t.setselectedTags(
        Object.keys(i).reduce((u, c) => ({ ...u, [c]: [] }), {})
      );
    });
    const r = ({ questionAmount: i, mode: u }) => {
      const c = t.getselectedtags();
      if (!o.value.length)
        return alert("Trouble fetching questions, please try again later");
      const _ = Ie(
        o.value,
        c
      ), m = pn(i, _);
      s.value = m.length, t.initialiseQuiz(m, u), u === "Timed" && t.setTimeLimit(i * t.timeLimit), n.value = !0;
    };
    return (i, u) => n.value && T(t).quizMode === "Tutor" ? (h(), V(An, { key: 0 })) : n.value && T(t).quizMode === "Timed" ? (h(), V(zn, { key: 1 })) : (h(), V(gs, {
      key: 2,
      onStartQuiz: r
    }));
  }
}), Qs = /* @__PURE__ */ A($s, [["__scopeId", "data-v-b4f8b4f4"]]), Ns = {
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
  const t = Xt();
  e.use(t), e.component("CrucibleComponent", Qs), e.provide("$dataLink", s.dataLink || Ns);
}
export {
  Qs as CrucibleComponent,
  Is as createViewerPlugin,
  Ns as defaultData
};
