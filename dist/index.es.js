import { effectScope as Be, ref as T, markRaw as G, toRaw as _e, hasInjectionContext as Tt, inject as Ve, getCurrentInstance as wt, watch as qe, unref as S, reactive as Ct, isRef as ae, isReactive as Pe, toRef as Se, nextTick as xe, computed as Ne, getCurrentScope as Et, onScopeDispose as kt, toRefs as Ce, defineComponent as P, openBlock as g, createElementBlock as v, Fragment as U, normalizeClass as H, createElementVNode as m, toDisplayString as Q, renderList as ee, createVNode as te, createBlock as j, createCommentVNode as q, onMounted as ve, pushScopeId as We, popScopeId as Ge, resolveComponent as Qt, onBeforeMount as Je, createTextVNode as Ye, watchEffect as $t, withDirectives as Me, vModelText as Ot, vModelSelect as Vt } from "vue";
var Ke = !1;
function pe(e, n, o) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, n), e.splice(n, 1, o), o) : (e[n] = o, o);
}
function Te(e, n) {
  if (Array.isArray(e)) {
    e.splice(n, 1);
    return;
  }
  delete e[n];
}
function qt() {
  return Xe().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Xe() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Pt = typeof Proxy == "function", Nt = "devtools-plugin:setup", It = "plugin:settings:set";
let K, Ee;
function Lt() {
  var e;
  return K !== void 0 || (typeof window < "u" && window.performance ? (K = !0, Ee = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (K = !0, Ee = globalThis.perf_hooks.performance) : K = !1), K;
}
function At() {
  return Lt() ? Ee.now() : Date.now();
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
        return At();
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
  const o = e, t = Xe(), s = qt(), i = Pt && o.enableEarlyProxy;
  if (s && (t.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    s.emit(Nt, e, n);
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
const ye = typeof window < "u", re = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && ye, je = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function Mt(e, { autoBom: n = !1 } = {}) {
  return n && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Ie(e, n, o) {
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
const me = typeof navigator == "object" ? navigator : { userAgent: "" }, ot = /Macintosh/.test(me.userAgent) && /AppleWebKit/.test(me.userAgent) && !/Safari/.test(me.userAgent), nt = ye ? (
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
  t.download = n, t.rel = "noopener", typeof e == "string" ? (t.href = e, t.origin !== location.origin ? tt(t.href) ? Ie(e, n, o) : (t.target = "_blank", he(t)) : he(t)) : (t.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(t.href);
  }, 4e4), setTimeout(function() {
    he(t);
  }, 0));
}
function Dt(e, n = "download", o) {
  if (typeof e == "string")
    if (tt(e))
      Ie(e, n, o);
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
    return Ie(e, n, o);
  const s = e.type === "application/octet-stream", i = /constructor/i.test(String(je.HTMLElement)) || "safari" in je, r = /CriOS\/[\d]+/.test(navigator.userAgent);
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
function Le(e) {
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
const at = "🍍 Pinia (root)", ke = "_root";
function Wt(e) {
  return Le(e) ? {
    id: ke,
    label: at
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Gt(e) {
  if (Le(e)) {
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
              } catch (f) {
                a[u] = f;
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
        const s = t.nodeId === ke ? n : n._s.get(t.nodeId);
        if (!s)
          return;
        s && (t.state = Gt(s));
      }
    }), o.on.editInspectorState((t, s) => {
      if (t.app === e && t.inspectorId === $) {
        const i = t.nodeId === ke ? n : n._s.get(t.nodeId);
        if (!i)
          return k(`store "${t.nodeId}" not found`, "error");
        const { path: r } = t;
        Le(i) ? r.unshift("state") : (r.length !== 1 || !i._customProperties.has(r[0]) || r[0] in i.$state) && r.unshift("$state"), Z = !1, t.set(i, r, t.state.value), Z = !0;
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
      const f = ct++;
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
          groupId: f
        }
      }), r((d) => {
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
              result: d
            },
            groupId: f
          }
        });
      }), c((d) => {
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
              error: d
            },
            groupId: f
          }
        });
      });
    }, !0), n._customProperties.forEach((r) => {
      qe(() => S(n[r]), (c, a) => {
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
function De(e, n, o) {
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
  n._isOptionsAPI = !!o.state, De(n, Object.keys(o.actions), n._isOptionsAPI);
  const t = n._hotUpdate;
  _e(n)._hotUpdate = function(s) {
    t.apply(this, arguments), De(n, Object.keys(s._hmrPayload.actions), !!n._isOptionsAPI);
  }, Zt(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    n
  );
}
function to() {
  const e = Be(!0), n = e.run(() => T({}));
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
    J(s) && J(t) && !ae(t) && !Pe(t) ? e[o] = ut(s, t) : e[o] = t;
  }
  return e;
}
const lt = () => {
};
function ze(e, n, o, t = lt) {
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
function Qe(e, n) {
  e instanceof Map && n instanceof Map && n.forEach((o, t) => e.set(t, o)), e instanceof Set && n instanceof Set && n.forEach(e.add, e);
  for (const o in n) {
    if (!n.hasOwnProperty(o))
      continue;
    const t = n[o], s = e[o];
    J(s) && J(t) && e.hasOwnProperty(o) && !ae(t) && !Pe(t) ? e[o] = Qe(s, t) : e[o] = t;
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
function Re(e) {
  return !!(ae(e) && e.effect);
}
function Ue(e, n, o, t) {
  const { state: s, actions: i, getters: r } = n, c = o.state.value[e];
  let a;
  function u() {
    !c && (process.env.NODE_ENV === "production" || !t) && (o.state.value[e] = s ? s() : {});
    const f = process.env.NODE_ENV !== "production" && t ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Ce(T(s ? s() : {}).value)
    ) : Ce(o.state.value[e]);
    return I(f, i, Object.keys(r || {}).reduce((d, h) => (process.env.NODE_ENV !== "production" && h in f && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${h}" in store "${e}".`), d[h] = G(Ne(() => {
      ce(o);
      const _ = o._s.get(e);
      return r[h].call(_, _);
    })), d), {}));
  }
  return a = $e(e, u, n, o, t, !0), a;
}
function $e(e, n, o = {}, t, s, i) {
  let r;
  const c = I({ actions: {} }, o);
  if (process.env.NODE_ENV !== "production" && !t._e.active)
    throw new Error("Pinia destroyed");
  const a = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Ke && (a.onTrigger = (p) => {
    u ? _ = p : u == !1 && !b._hotUpdating && (Array.isArray(_) ? _.push(p) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let u, f, d = [], h = [], _;
  const O = t.state.value[e];
  !i && !O && (process.env.NODE_ENV === "production" || !s) && (t.state.value[e] = {});
  const oe = T({});
  let le;
  function de(p) {
    let l;
    u = f = !1, process.env.NODE_ENV !== "production" && (_ = []), typeof p == "function" ? (p(t.state.value[e]), l = {
      type: D.patchFunction,
      storeId: e,
      events: _
    }) : (Qe(t.state.value[e], p), l = {
      type: D.patchObject,
      payload: p,
      storeId: e,
      events: _
    });
    const y = le = Symbol();
    xe().then(() => {
      le === y && (u = !0);
    }), f = !0, X(d, l, t.state.value[e]);
  }
  const w = i ? function() {
    const { state: l } = o, y = l ? l() : {};
    this.$patch((V) => {
      I(V, y);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : lt
  );
  function C() {
    r.stop(), d = [], h = [], t._s.delete(e);
  }
  function E(p, l) {
    return function() {
      ce(t);
      const y = Array.from(arguments), V = [], ne = [];
      function yt(N) {
        V.push(N);
      }
      function St(N) {
        ne.push(N);
      }
      X(h, {
        args: y,
        name: p,
        store: b,
        after: yt,
        onError: St
      });
      let se;
      try {
        se = l.apply(this && this.$id === e ? this : b, y);
      } catch (N) {
        throw X(ne, N), N;
      }
      return se instanceof Promise ? se.then((N) => (X(V, N), N)).catch((N) => (X(ne, N), Promise.reject(N))) : (X(V, se), se);
    };
  }
  const A = /* @__PURE__ */ G({
    actions: {},
    getters: {},
    state: [],
    hotState: oe
  }), Y = {
    _p: t,
    // _s: scope,
    $id: e,
    $onAction: ze.bind(null, h),
    $patch: de,
    $reset: w,
    $subscribe(p, l = {}) {
      const y = ze(d, p, l.detached, () => V()), V = r.run(() => qe(() => t.state.value[e], (ne) => {
        (l.flush === "sync" ? f : u) && p({
          storeId: e,
          type: D.direct,
          events: _
        }, ne);
      }, I({}, a, l)));
      return y;
    },
    $dispose: C
  }, b = Ct(process.env.NODE_ENV !== "production" || re ? I(
    {
      _hmrPayload: A,
      _customProperties: G(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    Y
    // must be added later
    // setupStore
  ) : Y);
  t._s.set(e, b);
  const F = (t._a && t._a.runWithContext || oo)(() => t._e.run(() => (r = Be()).run(n)));
  for (const p in F) {
    const l = F[p];
    if (ae(l) && !Re(l) || Pe(l))
      process.env.NODE_ENV !== "production" && s ? pe(oe.value, p, Se(F, p)) : i || (O && so(l) && (ae(l) ? l.value = O[p] : Qe(l, O[p])), t.state.value[e][p] = l), process.env.NODE_ENV !== "production" && A.state.push(p);
    else if (typeof l == "function") {
      const y = process.env.NODE_ENV !== "production" && s ? l : E(p, l);
      F[p] = y, process.env.NODE_ENV !== "production" && (A.actions[p] = l), c.actions[p] = l;
    } else process.env.NODE_ENV !== "production" && Re(l) && (A.getters[p] = i ? (
      // @ts-expect-error
      o.getters[p]
    ) : l, ye && (F._getters || // @ts-expect-error: same
    (F._getters = G([]))).push(p));
  }
  if (I(b, F), I(_e(b), F), Object.defineProperty(b, "$state", {
    get: () => process.env.NODE_ENV !== "production" && s ? oe.value : t.state.value[e],
    set: (p) => {
      if (process.env.NODE_ENV !== "production" && s)
        throw new Error("cannot set hotState");
      de((l) => {
        I(l, p);
      });
    }
  }), process.env.NODE_ENV !== "production" && (b._hotUpdate = G((p) => {
    b._hotUpdating = !0, p._hmrPayload.state.forEach((l) => {
      if (l in b.$state) {
        const y = p.$state[l], V = b.$state[l];
        typeof y == "object" && J(y) && J(V) ? ut(y, V) : p.$state[l] = V;
      }
      pe(b, l, Se(p.$state, l));
    }), Object.keys(b.$state).forEach((l) => {
      l in p.$state || Te(b, l);
    }), u = !1, f = !1, t.state.value[e] = Se(p._hmrPayload, "hotState"), f = !0, xe().then(() => {
      u = !0;
    });
    for (const l in p._hmrPayload.actions) {
      const y = p[l];
      pe(b, l, E(l, y));
    }
    for (const l in p._hmrPayload.getters) {
      const y = p._hmrPayload.getters[l], V = i ? (
        // special handling of options api
        Ne(() => (ce(t), y.call(b, b)))
      ) : y;
      pe(b, l, V);
    }
    Object.keys(b._hmrPayload.getters).forEach((l) => {
      l in p._hmrPayload.getters || Te(b, l);
    }), Object.keys(b._hmrPayload.actions).forEach((l) => {
      l in p._hmrPayload.actions || Te(b, l);
    }), b._hmrPayload = p._hmrPayload, b._getters = p._getters, b._hotUpdating = !1;
  })), re) {
    const p = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((l) => {
      Object.defineProperty(b, l, I({ value: b[l] }, p));
    });
  }
  return t._p.forEach((p) => {
    if (re) {
      const l = r.run(() => p({
        store: b,
        app: t._a,
        pinia: t,
        options: c
      }));
      Object.keys(l || {}).forEach((y) => b._customProperties.add(y)), I(b, l);
    } else
      I(b, r.run(() => p({
        store: b,
        app: t._a,
        pinia: t,
        options: c
      })));
  }), process.env.NODE_ENV !== "production" && b.$state && typeof b.$state == "object" && typeof b.$state.constructor == "function" && !b.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${b.$id}".`), O && i && o.hydrate && o.hydrate(b.$state, O), u = !0, f = !0, b;
}
function io(e, n, o) {
  let t, s;
  const i = typeof n == "function";
  t = e, s = i ? o : n;
  function r(c, a) {
    const u = Tt();
    if (c = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && ie && ie._testing ? null : c) || (u ? Ve(et, null) : null), c && ce(c), process.env.NODE_ENV !== "production" && !ie)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    c = ie, c._s.has(t) || (i ? $e(t, n, s, c) : Ue(t, s, c), process.env.NODE_ENV !== "production" && (r._pinia = c));
    const f = c._s.get(t);
    if (process.env.NODE_ENV !== "production" && a) {
      const d = "__hot:" + t, h = i ? $e(d, n, s, c, !0) : Ue(d, I({}, s), c, !0);
      a._hotUpdate(h), delete c.state.value[d], c._s.delete(d);
    }
    if (process.env.NODE_ENV !== "production" && ye) {
      const d = wt();
      if (d && d.proxy && // avoid adding stores that are just built for hot module replacement
      !a) {
        const h = d.proxy, _ = "_pStores" in h ? h._pStores : h._pStores = {};
        _[t] = f;
      }
    }
    return f;
  }
  return r.$id = t, r;
}
const ro = ["id", "checked"], ao = ["for", "innerHTML"], co = /* @__PURE__ */ P({
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
    return (s, i) => (g(), v(U, null, [
      (g(), v("input", {
        id: "option-" + s.optionKey,
        key: s.optionKey,
        "test-id": "radio_options",
        type: "radio",
        name: "options",
        checked: s.checked,
        class: H(s.submitted && "ignore-hover")
      }, null, 10, ro)),
      (g(), v("label", {
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
}, uo = /* @__PURE__ */ M(co, [["__scopeId", "data-v-fdbfedc6"]]), lo = ["disabled"], po = /* @__PURE__ */ P({
  __name: "MCQButton",
  props: {
    submitted: { type: Boolean },
    selectedOption: {},
    hideSkip: { type: Boolean }
  },
  emits: ["submitAnswer", "nextQuestion", "skipQuestion"],
  setup(e, { emit: n }) {
    const o = T("skip"), t = T("Skip"), s = n, i = (a, u) => {
      !a && u ? r("next", "Next", "submitAnswer") : a && u ? r("skip", "Skip", "nextQuestion") : !a && !u && r("skip", "Skip", "skipQuestion");
    }, r = (a, u, f) => {
      o.value = a, t.value = u, s(f);
    }, c = (a, u) => a && u ? { class: "next", text: "Next" } : !a && u ? { class: "submit", text: "Submit" } : { class: o.value, text: t.value };
    return (a, u) => (g(), v("div", null, [
      m("button", {
        disabled: a.hideSkip && c(a.submitted, a.selectedOption).class === "skip",
        class: H(["mcq-button", c(a.submitted, a.selectedOption).class]),
        onClick: u[0] || (u[0] = (f) => i(a.submitted, a.selectedOption))
      }, Q(c(a.submitted, a.selectedOption).text), 11, lo)
    ]));
  }
}), fo = /* @__PURE__ */ M(po, [["__scopeId", "data-v-847b8dd5"]]), ho = /* @__PURE__ */ P({
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
    return (r, c) => (g(), v("div", null, [
      m("button", {
        class: H(r.buttonName === "Submit" ? "submit_btn" : "mcq-button"),
        onClick: c[0] || (c[0] = (a) => s())
      }, Q(r.buttonName), 3)
    ]));
  }
}), He = /* @__PURE__ */ M(ho, [["__scopeId", "data-v-8be7f61e"]]), mo = (e) => {
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
function Ae(e, n) {
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
      return Ae(e, this.selectedTags).length;
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
          Number(o) === Number(s) ? this.quizStats[t].correct = 1 : this.quizStats[t].correct = 0;
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
}), vo = ["innerHTML"], yo = { class: "mcq-list" }, So = ["onClick"], To = { class: "next-prev-question" }, wo = /* @__PURE__ */ P({
  __name: "MCQQuestion",
  props: {
    _id: {},
    statement: {},
    optionsList: {}
  },
  emits: ["nextQuestion", "skipQuestion", "prevQuestion"],
  setup(e, { emit: n }) {
    const o = z(), t = T(null), s = T(!1), i = n, r = T(o.getRemainingQuestions()), c = () => {
      s.value = !0;
    }, a = () => {
      t.value = null, i("nextQuestion");
    }, u = () => {
      h(), r.value = o.getRemainingQuestions(), i("nextQuestion");
    }, f = () => {
      h(), i("skipQuestion");
    }, d = (w) => o.incrementStat(
      w.$oid,
      "attempts",
      t.value ?? void 0
    ), h = () => {
      s.value = !1, t.value = null;
    }, _ = () => {
      t.value = null, i("prevQuestion");
    }, O = (w, C) => {
      s.value || (t.value = t.value === C ? null : C), d(w);
    }, oe = (w, C, E) => o.quizMode === "Timed" ? le(w, C) : de(C, E);
    function le(w, C) {
      const E = pt(w.$oid, o.quizStats), A = o.quizStats[E].selectedValue, Y = _o(
        o.quizStats,
        E,
        A
      );
      return String(Y) === C ? (t.value = C, "selected") : "";
    }
    function de(w, C) {
      const E = C[parseInt(w)], A = t.value === w;
      return s.value ? E.optionCorrect ? "correct ignore-hover" : A ? "wrong ignore-hover" : "ignore-hover" : A ? "selected" : "";
    }
    return (w, C) => (g(), v(U, null, [
      m("div", {
        class: "mcq-statement",
        innerHTML: w.statement
      }, null, 8, vo),
      m("div", yo, [
        (g(!0), v(U, null, ee(Object.entries(w.optionsList), ([E, A]) => (g(), v("div", {
          key: E,
          class: H(["mcq-option", oe(w._id, E, w.optionsList)]),
          onClick: (Y) => O(w._id, E)
        }, [
          te(uo, {
            "option-key": E,
            checked: t.value === E,
            option: A,
            submitted: s.value,
            onSelectOption: (Y) => O(w._id, E)
          }, null, 8, ["option-key", "checked", "option", "submitted", "onSelectOption"])
        ], 10, So))), 128))
      ]),
      S(o).quizMode === "Tutor" ? (g(), j(fo, {
        key: 0,
        submitted: s.value,
        "selected-option": t.value,
        "hide-skip": r.value <= 1,
        onSubmitAnswer: c,
        onNextQuestion: C[0] || (C[0] = (E) => u()),
        onSkipQuestion: f
      }, null, 8, ["submitted", "selected-option", "hide-skip"])) : q("", !0),
      m("div", To, [
        S(o).quizMode === "Timed" ? (g(), j(He, {
          key: 0,
          "button-name": S(o).questionsQueue.length >= 1 ? "→" : "Submit",
          onNextQuestion: C[1] || (C[1] = (E) => a())
        }, null, 8, ["button-name"])) : q("", !0),
        S(o).quizMode === "Timed" && S(o).questionsStack.length > 1 ? (g(), j(He, {
          key: 1,
          "button-name": "←",
          onPrevQuestion: C[2] || (C[2] = (E) => _())
        })) : q("", !0)
      ])
    ], 64));
  }
}), ft = /* @__PURE__ */ M(wo, [["__scopeId", "data-v-181a554c"]]), Co = (e) => (We("data-v-38adb08e"), e = e(), Ge(), e), Eo = { class: "report-container" }, ko = { class: "mcq-report" }, Qo = { class: "table-container" }, $o = /* @__PURE__ */ Co(() => /* @__PURE__ */ m("thead", null, [
  /* @__PURE__ */ m("tr", null, [
    /* @__PURE__ */ m("th", null, "question"),
    /* @__PURE__ */ m("th", null, "correct option"),
    /* @__PURE__ */ m("th", null, "your answer")
  ])
], -1)), Oo = { class: "question-row" }, Vo = ["href", "innerHTML"], qo = { class: "answer-row" }, Po = ["innerHTML"], No = { class: "answer-row" }, Io = ["innerHTML"], Lo = { class: "mcq-result" }, Ao = { class: "score" }, xo = /* @__PURE__ */ P({
  __name: "MCQStatus",
  setup(e) {
    const n = Ve("$updateQAttemptCallback") ?? vt, o = z(), t = o.quizStats, s = o.quizStats.length, i = t.filter((a) => a.correct === 1).length, r = (i * 100 / s).toFixed(0);
    return ve(() => {
      try {
        const a = t.filter((u) => u.attempts).map(
          (u) => n(u.question._id.$oid, !!u.correct)
        );
        a.length && Promise.allSettled(a);
      } catch (a) {
        throw console.error("Error updating question attempts", a), a;
      }
    }), (a, u) => (g(), v("div", Eo, [
      m("div", ko, [
        m("div", Qo, [
          m("table", null, [
            $o,
            m("tbody", null, [
              (g(!0), v(U, null, ee(Object.entries(S(t)), ([f, d]) => (g(), v("tr", {
                key: f,
                class: "quiz-statment"
              }, [
                m("td", Oo, [
                  m("a", {
                    href: d.question.link,
                    target: "_blank",
                    innerHTML: d.question.statement
                  }, null, 8, Vo)
                ]),
                m("td", qo, [
                  (g(!0), v(U, null, ee(Object.entries(
                    d.question.optionsList
                  ), ([h, _]) => (g(), v("span", { key: h }, [
                    _.optionCorrect ? (g(), v("span", {
                      key: 0,
                      innerHTML: _.optionValue
                    }, null, 8, Po)) : q("", !0)
                  ]))), 128))
                ]),
                m("td", No, [
                  m("span", {
                    class: H(
                      d.correct === 1 ? "correct-answer" : "wrong-answer"
                    ),
                    innerHTML: d.correct === 1 ? "<span> ✔</span> " : "<span> ✘</span> <span>     </span>" + d.selectedValue
                  }, null, 10, Io)
                ])
              ]))), 128))
            ])
          ])
        ])
      ]),
      m("div", null, [
        m("div", Lo, [
          m("span", Ao, "⌛ Result: " + Q(S(i)) + " out of " + Q(S(s)) + " - (" + Q(S(r)) + " %)", 1)
        ])
      ])
    ]));
  }
}), ht = /* @__PURE__ */ M(xo, [["__scopeId", "data-v-38adb08e"]]), Mo = { class: "questions-left-header" }, jo = /* @__PURE__ */ P({
  __name: "MCQQuiz",
  setup(e) {
    const n = T(), o = z();
    ve(() => {
      s();
    });
    const t = () => {
      o.enqueueQuestion(n.value), n.value = o.dequeueQuestion();
    }, s = () => {
      o.setAnsweredQuestionsNum(), n.value = o.dequeueQuestion();
    }, i = () => window.location.reload();
    return (r, c) => {
      const a = Qt("MCQInfoPanel");
      return g(), v("main", null, [
        te(a),
        m("h3", Mo, " Question " + Q(S(o).getAnsweredQuestionsNum()) + " out of " + Q(S(o).quizStats.length), 1),
        n.value ? (g(), j(ft, {
          key: 0,
          statement: n.value.statement,
          "options-list": n.value.optionsList,
          _id: n.value._id,
          onNextQuestion: s,
          onSkipQuestion: t
        }, null, 8, ["statement", "options-list", "_id"])) : q("", !0),
        n.value ? q("", !0) : (g(), j(ht, { key: 1 })),
        n.value ? q("", !0) : (g(), v("button", {
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
}, Ro = { class: "questions-left-header" }, Uo = /* @__PURE__ */ P({
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
    return (t, s) => (g(), v(U, null, [
      e.timeLeft ? (g(), v("h3", zo, " Time left: " + Q(o(e.timeLeft)), 1)) : q("", !0),
      m("h3", Ro, " Question " + Q(S(n).questionsStack.length) + " out of " + Q(S(n).quizStats.length), 1)
    ], 64));
  }
}), Fe = 1e3, Ho = "-1", Fo = /* @__PURE__ */ P({
  __name: "MCQTimedQuiz",
  setup(e) {
    const n = z(), o = T();
    let t = null, s = null;
    const i = T(n.timeLimit);
    ve(() => {
      c();
    }), Je(() => {
      u(), f();
    });
    const r = () => {
      o.value = n.removeFromLastHistory() ?? o.value;
    }, c = () => o.value = n.dequeueQuestion(), a = () => window.location.reload(), u = () => {
      t && clearTimeout(t), s && clearInterval(s);
    }, f = () => {
      i.value = n.timeLimit;
      const h = () => o.value ? i.value ? i.value-- : d() : u();
      s = window.setInterval(h, Fe), t = window.setTimeout(() => {
      }, n.timeLimit * Fe);
    }, d = () => {
      var _;
      u();
      const h = (O) => n.incrementStat(O, "attempts", Ho);
      for (h(((_ = o.value) == null ? void 0 : _._id.$oid) ?? ""); o.value = n.dequeueQuestion(); )
        h(o.value._id.$oid);
      return alert("Time's up! Quiz has ended."), c();
    };
    return (h, _) => (g(), v("main", null, [
      te(Uo, { "time-left": i.value }, null, 8, ["time-left"]),
      o.value ? (g(), j(ft, {
        key: 0,
        statement: o.value.statement,
        "options-list": o.value.optionsList,
        _id: o.value._id,
        onNextQuestion: c,
        onPrevQuestion: r
      }, null, 8, ["statement", "options-list", "_id"])) : q("", !0),
      o.value ? q("", !0) : (g(), j(ht, { key: 1 })),
      o.value ? q("", !0) : (g(), v("button", {
        key: 2,
        class: "btn-relocate",
        onClick: a
      }, " End "))
    ]));
  }
}), Bo = /* @__PURE__ */ M(Fo, [["__scopeId", "data-v-4fd74e68"]]), Wo = ["id", "name", "value", "disabled"], Go = ["for"], Jo = {
  key: 0,
  class: "question-number"
}, Yo = /* @__PURE__ */ P({
  __name: "FilterCheckbox",
  props: {
    category: {},
    topics: {}
  },
  setup(e) {
    const { category: n, topics: o } = e, t = z(), s = (a) => n === "course" ? a.toUpperCase() : a, i = Ne(
      () => Object.entries(o).map(([a, u]) => {
        const f = c(u, n), d = bo(
          t.allQs,
          u,
          n
        ).length.toString();
        return { idx: a, topic: u, num: f, questionamount: d };
      }).filter(({ topic: a }) => a !== void 0)
    ), r = (a) => {
      if (!(a.target instanceof HTMLInputElement))
        return console.error("Trying to click on non-input element");
      const u = a.target.name, f = a.target.value;
      t.modifySelectedTags(a.target.checked, { category: u, topic: f });
    }, c = (a, u) => {
      var _;
      const f = t.getselectedtags();
      if (!f[u] || (_ = f[u]) != null && _.includes(
        a
      ))
        return null;
      const d = JSON.parse(
        JSON.stringify(t.getselectedtags())
      );
      d[u].includes(a) || d[u].push(a);
      const h = t.allQs;
      return Ae(
        h,
        d
      ).length.toString();
    };
    return (a, u) => (g(), v("ul", null, [
      (g(!0), v(U, null, ee(i.value, ({ idx: f, num: d, topic: h, questionamount: _ }) => (g(), v("li", {
        key: f,
        class: H(["filter-options", { "grey-out": d === "0" }])
      }, [
        m("input", {
          id: `${a.category}-${h}-checkbox`,
          type: "checkbox",
          name: a.category,
          value: h,
          disabled: d === "0",
          onChange: u[0] || (u[0] = (O) => r(O))
        }, null, 40, Wo),
        m("label", {
          for: `${a.category}-${h}-checkbox`
        }, [
          Ye(Q(s(h)) + " ", 1),
          d !== null && d !== "0" ? (g(), v("span", Jo, Q(_), 1)) : q("", !0)
        ], 8, Go)
      ], 2))), 128))
    ]));
  }
}), Ko = /* @__PURE__ */ M(Yo, [["__scopeId", "data-v-43544b02"]]), Xo = { class: "filter" }, Zo = { class: "category-heading" }, en = /* @__PURE__ */ P({
  __name: "MCQTagOptions",
  setup(e) {
    const n = T([]), o = z();
    let t = {};
    return qe(
      () => o.allQs,
      (s, i) => {
        o.setTagSet(), n.value = o.getTagSet(), t = dt(n.value);
      }
    ), (s, i) => (g(), v("div", Xo, [
      (g(!0), v(U, null, ee(Object.entries(S(t)), ([r, c]) => (g(), v("div", {
        key: r,
        class: "category"
      }, [
        m("h2", Zo, Q(r), 1),
        te(Ko, {
          category: r,
          topics: c
        }, null, 8, ["category", "topics"])
      ]))), 128))
    ]));
  }
}), tn = /* @__PURE__ */ M(en, [["__scopeId", "data-v-f644e565"]]), on = { for: "optionName" }, nn = ["value"], sn = /* @__PURE__ */ P({
  __name: "DropDownbox",
  props: {
    options: {},
    optionName: {},
    disabled: { type: Boolean }
  },
  setup(e) {
    const n = z(), o = T(0);
    function t(s) {
      const i = s.target;
      i.value && (o.value = parseFloat(i.value) * 60, n.setTimeLimit(o.value));
    }
    return (s, i) => (g(), v("div", {
      class: H(s.disabled ? "dropdown input-disabled" : "dropdown")
    }, [
      m("label", on, Q(s.optionName) + ":   ", 1),
      m("select", {
        id: "optionName",
        name: "optionName",
        onChange: t
      }, [
        (g(!0), v(U, null, ee(s.options, (r) => (g(), v("option", {
          key: r.value,
          value: r.value
        }, Q(r.value) + " " + Q(r.unit), 9, nn))), 128))
      ], 32)
    ], 2));
  }
}), rn = /* @__PURE__ */ M(sn, [["__scopeId", "data-v-5f3ae97a"]]), ue = (e) => (We("data-v-c3d686ea"), e = e(), Ge(), e), an = { class: "start-page-container" }, cn = /* @__PURE__ */ ue(() => /* @__PURE__ */ m("h1", null, "VetCloud Smart Quiz", -1)), un = { class: "quiz-config-container" }, ln = { class: "question-config-container" }, dn = { class: "tag-text" }, pn = { class: "question-number" }, fn = { class: "question-amount-container" }, hn = /* @__PURE__ */ ue(() => /* @__PURE__ */ m("label", { for: "question-amount" }, "Select the amount of questions:", -1)), mn = ["max"], gn = {
  key: 0,
  class: "show-max-msg"
}, bn = /* @__PURE__ */ ue(() => /* @__PURE__ */ m("label", { for: "mode-select" }, "Select mode:", -1)), _n = /* @__PURE__ */ ue(() => /* @__PURE__ */ m("option", { value: "Tutor" }, "Tutor", -1)), vn = /* @__PURE__ */ ue(() => /* @__PURE__ */ m("option", { value: "Timed" }, "Timed", -1)), yn = [
  _n,
  vn
], Sn = 3e3, Tn = /* @__PURE__ */ P({
  __name: "StartPage",
  emits: ["start-quiz"],
  setup(e, { emit: n }) {
    const o = T(1), t = T("Tutor"), s = T(!1), i = T(null), r = n, c = z();
    ve(() => {
      $t(() => {
        const f = c.getquestionnumber();
        o.value = Math.min(10, f);
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
    return (f, d) => (g(), v("div", an, [
      cn,
      te(tn),
      m("div", un, [
        m("div", ln, [
          m("p", dn, [
            Ye(" Maximum possible questions: "),
            m("span", pn, Q(S(c).getquestionnumber()), 1)
          ]),
          m("div", fn, [
            hn,
            Me(m("input", {
              id: "question-amount",
              "onUpdate:modelValue": d[0] || (d[0] = (h) => o.value = h),
              type: "number",
              placeholder: "Question amount",
              min: "1",
              max: S(c).getquestionnumber(),
              onInput: u
            }, null, 40, mn), [
              [
                Ot,
                o.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          s.value ? (g(), v("p", gn, " Cannot select more than " + Q(S(c).getquestionnumber()) + " questions. ", 1)) : q("", !0),
          m("div", null, [
            bn,
            Me(m("select", {
              id: "mode-select",
              "onUpdate:modelValue": d[1] || (d[1] = (h) => t.value = h)
            }, yn, 512), [
              [Vt, t.value]
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
          }, null, 8, ["class", "disabled"])
        ])
      ]),
      m("button", {
        class: "start-button",
        onClick: a
      }, "Start")
    ]));
  }
}), wn = /* @__PURE__ */ M(Tn, [["__scopeId", "data-v-c3d686ea"]]), Cn = (e) => e.trim().toLowerCase().replace("_", " "), En = (e) => e.reduce((n, o) => {
  if (!o.includes(":")) return n;
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
], L = {
  isString: (r) => typeof r == "string",
  isObject: (r) => typeof r == "object" && r !== null,
  isBoolean: (r) => typeof r == "boolean",
  isArray: (r, c) => Array.isArray(r) && r.every(c),
  isNumber: (r) => typeof r == "number",
  isFunction: (r) => typeof r == "function"
};
function Oe(e) {
  const n = e.includes(":") && e.split(":").length === 2, o = !e.includes(":") && !e.includes(" ");
  return n || o;
}
function gt(e, n = !1) {
  return L.isArray(e, L.isString) ? n ? e.every(Oe) : e.some(Oe) : !1;
}
function $n(e) {
  return L.isObject(e) && L.isString(e.optionValue) && (e.optionCorrect === void 0 || L.isBoolean(e.optionCorrect));
}
function bt(e) {
  return L.isObject(e) && L.isObject(e._id) && // Assuming _id is an object with $oid property
  L.isString(e._id.$oid) && L.isString(e.statement) && gt(e.tags) && // Modified to ensure tags are always checked
  L.isArray(e.optionsList, $n) && L.isString(e.link);
}
function On(e) {
  return L.isArray(e, bt);
}
const fe = {
  isMCQuestion: bt,
  isMCQuestionArray: On,
  validateTags: gt,
  isTag: Oe
}, Vn = (e) => {
  try {
    if (!e)
      throw new Error("No question data found. Please Try again later.");
    return mt.convertQuestions(_t(e));
  } catch (n) {
    return alert(n), [];
  }
}, qn = () => Qn, Pn = () => {
  const e = qn();
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
  return Nn(o, e.length), e;
}
function we(e, n) {
  e && console.warn(n, "color: #FF0000");
}
function Nn(e, n) {
  const { invalidQs: o, invalidTags: t, noTags: s, totalTags: i } = e;
  we(
    o,
    `Invalid Questions Received: %c${o} out of ${n}`
  ), we(
    t,
    `Filtering out invalid tags: %c${t} out of ${i}`
  ), we(s, `Questions with no tags: %c${s}`);
}
const In = /* @__PURE__ */ P({
  __name: "CrucibleComponent",
  props: {
    level: {
      type: Number,
      default: 0
      // a default value is required for Vue props
    }
  },
  setup(e) {
    const n = e, o = T(0), t = z(), s = T(!1), i = T([]), r = Ve("$dataLink"), { level: c } = Ce(n);
    Je(async () => {
      const f = await (async () => (await (await fetch(`${r}?level=${c.value}`)).json()).questions)();
      i.value = r ? Vn(f) : Pn(), t.allQs = i.value;
      const d = dt(
        i.value.map((h) => h.tags)
      );
      t.setselectedTags(
        Object.keys(d).reduce((h, _) => ({ ...h, [_]: [] }), {})
      ), t.setTagSet();
    });
    const a = ({ questionAmount: u, mode: f }) => {
      const d = t.getselectedtags();
      if (!i.value.length)
        return alert("Trouble fetching questions, please try again later");
      const h = Ae(
        i.value,
        d
      ), _ = go(u, h);
      o.value = _.length, t.initialiseQuiz(_, f), f === "Timed" && t.setTimeLimit(u * t.timeLimit), s.value = !0;
    };
    return (u, f) => s.value && S(t).quizMode === "Tutor" ? (g(), j(Do, { key: 0 })) : s.value && S(t).quizMode === "Timed" ? (g(), j(Bo, { key: 1 })) : (g(), j(wn, {
      key: 2,
      onStartQuiz: a
    }));
  }
}), Ln = {
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
};
function Mn(e, n = {}) {
  const o = to();
  e.use(o), e.component("CrucibleComponent", In), e.provide("$dataLink", n.dataLink || Ln), e.provide(
    "$updateQAttemptCallback",
    n.updateQAttemptCallback || vt
  );
}
export {
  In as CrucibleComponent,
  Mn as createViewerPlugin,
  Ln as defaultData,
  vt as defaultUpdateQAttemptCallback
};
