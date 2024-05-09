import { effectScope as je, ref as w, markRaw as F, hasInjectionContext as ht, inject as ze, getCurrentInstance as mt, toRaw as me, watch as Ue, reactive as _t, isRef as ie, isReactive as ke, toRef as be, nextTick as Ce, computed as Oe, unref as T, getCurrentScope as gt, onScopeDispose as vt, toRefs as Ne, defineComponent as C, openBlock as h, createElementBlock as g, Fragment as z, normalizeClass as U, withModifiers as bt, createElementVNode as p, toDisplayString as $, renderList as X, createVNode as Z, createBlock as M, createCommentVNode as q, pushScopeId as Re, popScopeId as He, onMounted as Be, resolveComponent as yt, onBeforeMount as Fe, createTextVNode as Ge, withDirectives as Ie, vModelText as St, vModelSelect as Tt } from "vue";
var Je = !1;
function le(e, o, t) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, o), e.splice(o, 1, t), t) : (e[o] = t, t);
}
function ye(e, o) {
  if (Array.isArray(e)) {
    e.splice(o, 1);
    return;
  }
  delete e[o];
}
function wt() {
  return We().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function We() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Et = typeof Proxy == "function", kt = "devtools-plugin:setup", Ot = "plugin:settings:set";
let W, Se;
function $t() {
  var e;
  return W !== void 0 || (typeof window < "u" && window.performance ? (W = !0, Se = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (W = !0, Se = globalThis.perf_hooks.performance) : W = !1), W;
}
function Qt() {
  return $t() ? Se.now() : Date.now();
}
class qt {
  constructor(o, t) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = o, this.hook = t;
    const n = {};
    if (o.settings)
      for (const a in o.settings) {
        const i = o.settings[a];
        n[a] = i.defaultValue;
      }
    const s = `__vue-devtools-plugin-settings__${o.id}`;
    let r = Object.assign({}, n);
    try {
      const a = localStorage.getItem(s), i = JSON.parse(a);
      Object.assign(r, i);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return r;
      },
      setSettings(a) {
        try {
          localStorage.setItem(s, JSON.stringify(a));
        } catch {
        }
        r = a;
      },
      now() {
        return Qt();
      }
    }, t && t.on(Ot, (a, i) => {
      a === this.plugin.id && this.fallbacks.setSettings(i);
    }), this.proxiedOn = new Proxy({}, {
      get: (a, i) => this.target ? this.target.on[i] : (...c) => {
        this.onQueue.push({
          method: i,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (a, i) => this.target ? this.target[i] : i === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(i) ? (...c) => (this.targetQueue.push({
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
  async setRealTarget(o) {
    this.target = o;
    for (const t of this.onQueue)
      this.target.on[t.method](...t.args);
    for (const t of this.targetQueue)
      t.resolve(await this.target[t.method](...t.args));
  }
}
function Ye(e, o) {
  const t = e, n = We(), s = wt(), r = Et && t.enableEarlyProxy;
  if (s && (n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !r))
    s.emit(kt, e, o);
  else {
    const a = r ? new qt(t, s) : null;
    (n.__VUE_DEVTOOLS_PLUGINS__ = n.__VUE_DEVTOOLS_PLUGINS__ || []).push({
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
let oe;
const re = (e) => oe = e, Ke = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function G(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var A;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(A || (A = {}));
const _e = typeof window < "u", se = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && _e, Le = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function Ct(e, { autoBom: o = !1 } = {}) {
  return o && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function $e(e, o, t) {
  const n = new XMLHttpRequest();
  n.open("GET", e), n.responseType = "blob", n.onload = function() {
    et(n.response, o, t);
  }, n.onerror = function() {
    console.error("could not download file");
  }, n.send();
}
function Xe(e) {
  const o = new XMLHttpRequest();
  o.open("HEAD", e, !1);
  try {
    o.send();
  } catch {
  }
  return o.status >= 200 && o.status <= 299;
}
function de(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const t = document.createEvent("MouseEvents");
    t.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(t);
  }
}
const fe = typeof navigator == "object" ? navigator : { userAgent: "" }, Ze = /Macintosh/.test(fe.userAgent) && /AppleWebKit/.test(fe.userAgent) && !/Safari/.test(fe.userAgent), et = _e ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Ze ? Nt : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in fe ? It : (
      // Fallback to using FileReader and a popup
      Lt
    )
  )
) : () => {
};
function Nt(e, o = "download", t) {
  const n = document.createElement("a");
  n.download = o, n.rel = "noopener", typeof e == "string" ? (n.href = e, n.origin !== location.origin ? Xe(n.href) ? $e(e, o, t) : (n.target = "_blank", de(n)) : de(n)) : (n.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(n.href);
  }, 4e4), setTimeout(function() {
    de(n);
  }, 0));
}
function It(e, o = "download", t) {
  if (typeof e == "string")
    if (Xe(e))
      $e(e, o, t);
    else {
      const n = document.createElement("a");
      n.href = e, n.target = "_blank", setTimeout(function() {
        de(n);
      });
    }
  else
    navigator.msSaveOrOpenBlob(Ct(e, t), o);
}
function Lt(e, o, t, n) {
  if (n = n || open("", "_blank"), n && (n.document.title = n.document.body.innerText = "downloading..."), typeof e == "string")
    return $e(e, o, t);
  const s = e.type === "application/octet-stream", r = /constructor/i.test(String(Le.HTMLElement)) || "safari" in Le, a = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((a || s && r || Ze) && typeof FileReader < "u") {
    const i = new FileReader();
    i.onloadend = function() {
      let c = i.result;
      if (typeof c != "string")
        throw n = null, new Error("Wrong reader.result type");
      c = a ? c : c.replace(/^data:[^;]*;/, "data:attachment/file;"), n ? n.location.href = c : location.assign(c), n = null;
    }, i.readAsDataURL(e);
  } else {
    const i = URL.createObjectURL(e);
    n ? n.location.assign(i) : location.href = i, n = null, setTimeout(function() {
      URL.revokeObjectURL(i);
    }, 4e4);
  }
}
function k(e, o) {
  const t = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(t, o) : o === "error" ? console.error(t) : o === "warn" ? console.warn(t) : console.log(t);
}
function Qe(e) {
  return "_a" in e && "install" in e;
}
function tt() {
  if (!("clipboard" in navigator))
    return k("Your browser doesn't support the Clipboard API", "error"), !0;
}
function nt(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (k('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Pt(e) {
  if (!tt())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), k("Global state copied to clipboard.");
    } catch (o) {
      if (nt(o))
        return;
      k("Failed to serialize the state. Check the console for more details.", "error"), console.error(o);
    }
}
async function Vt(e) {
  if (!tt())
    try {
      ot(e, JSON.parse(await navigator.clipboard.readText())), k("Global state pasted from clipboard.");
    } catch (o) {
      if (nt(o))
        return;
      k("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(o);
    }
}
async function xt(e) {
  try {
    et(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (o) {
    k("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(o);
  }
}
let j;
function Mt() {
  j || (j = document.createElement("input"), j.type = "file", j.accept = ".json");
  function e() {
    return new Promise((o, t) => {
      j.onchange = async () => {
        const n = j.files;
        if (!n)
          return o(null);
        const s = n.item(0);
        return o(s ? { text: await s.text(), file: s } : null);
      }, j.oncancel = () => o(null), j.onerror = t, j.click();
    });
  }
  return e;
}
async function At(e) {
  try {
    const t = await Mt()();
    if (!t)
      return;
    const { text: n, file: s } = t;
    ot(e, JSON.parse(n)), k(`Global state imported from "${s.name}".`);
  } catch (o) {
    k("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(o);
  }
}
function ot(e, o) {
  for (const t in o) {
    const n = e.state.value[t];
    n ? Object.assign(n, o[t]) : e.state.value[t] = o[t];
  }
}
function x(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const st = "🍍 Pinia (root)", Te = "_root";
function Dt(e) {
  return Qe(e) ? {
    id: Te,
    label: st
  } : {
    id: e.$id,
    label: e.$id
  };
}
function jt(e) {
  if (Qe(e)) {
    const t = Array.from(e._s.keys()), n = e._s;
    return {
      state: t.map((r) => ({
        editable: !0,
        key: r,
        value: e.state.value[r]
      })),
      getters: t.filter((r) => n.get(r)._getters).map((r) => {
        const a = n.get(r);
        return {
          editable: !1,
          key: r,
          value: a._getters.reduce((i, c) => (i[c] = a[c], i), {})
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
    operation: x(e.type),
    key: x(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function Ut(e) {
  switch (e) {
    case A.direct:
      return "mutation";
    case A.patchFunction:
      return "$patch";
    case A.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let K = !0;
const pe = [], B = "pinia:mutations", O = "pinia", { assign: Rt } = Object, he = (e) => "🍍 " + e;
function Ht(e, o) {
  Ye({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: pe,
    app: e
  }, (t) => {
    typeof t.now != "function" && k("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), t.addTimelineLayer({
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
            Pt(o);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await Vt(o), t.sendInspectorTree(O), t.sendInspectorState(O);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            xt(o);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await At(o), t.sendInspectorTree(O), t.sendInspectorState(O);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (n) => {
            const s = o._s.get(n);
            s ? typeof s.$reset != "function" ? k(`Cannot reset "${n}" store because it doesn't have a "$reset" method implemented.`, "warn") : (s.$reset(), k(`Store "${n}" reset.`)) : k(`Cannot reset "${n}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), t.on.inspectComponent((n, s) => {
      const r = n.componentInstance && n.componentInstance.proxy;
      if (r && r._pStores) {
        const a = n.componentInstance.proxy._pStores;
        Object.values(a).forEach((i) => {
          n.instanceData.state.push({
            type: he(i.$id),
            key: "state",
            editable: !0,
            value: i._isOptionsAPI ? {
              _custom: {
                value: me(i.$state),
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
          }), i._getters && i._getters.length && n.instanceData.state.push({
            type: he(i.$id),
            key: "getters",
            editable: !1,
            value: i._getters.reduce((c, u) => {
              try {
                c[u] = i[u];
              } catch (_) {
                c[u] = _;
              }
              return c;
            }, {})
          });
        });
      }
    }), t.on.getInspectorTree((n) => {
      if (n.app === e && n.inspectorId === O) {
        let s = [o];
        s = s.concat(Array.from(o._s.values())), n.rootNodes = (n.filter ? s.filter((r) => "$id" in r ? r.$id.toLowerCase().includes(n.filter.toLowerCase()) : st.toLowerCase().includes(n.filter.toLowerCase())) : s).map(Dt);
      }
    }), t.on.getInspectorState((n) => {
      if (n.app === e && n.inspectorId === O) {
        const s = n.nodeId === Te ? o : o._s.get(n.nodeId);
        if (!s)
          return;
        s && (n.state = jt(s));
      }
    }), t.on.editInspectorState((n, s) => {
      if (n.app === e && n.inspectorId === O) {
        const r = n.nodeId === Te ? o : o._s.get(n.nodeId);
        if (!r)
          return k(`store "${n.nodeId}" not found`, "error");
        const { path: a } = n;
        Qe(r) ? a.unshift("state") : (a.length !== 1 || !r._customProperties.has(a[0]) || a[0] in r.$state) && a.unshift("$state"), K = !1, n.set(r, a, n.state.value), K = !0;
      }
    }), t.on.editComponentState((n) => {
      if (n.type.startsWith("🍍")) {
        const s = n.type.replace(/^🍍\s*/, ""), r = o._s.get(s);
        if (!r)
          return k(`store "${s}" not found`, "error");
        const { path: a } = n;
        if (a[0] !== "state")
          return k(`Invalid path for store "${s}":
${a}
Only state can be modified.`);
        a[0] = "$state", K = !1, n.set(r, a, n.state.value), K = !0;
      }
    });
  });
}
function Bt(e, o) {
  pe.includes(he(o.$id)) || pe.push(he(o.$id)), Ye({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: pe,
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
    o.$onAction(({ after: a, onError: i, name: c, args: u }) => {
      const _ = it++;
      t.addTimelineEvent({
        layerId: B,
        event: {
          time: n(),
          title: "🛫 " + c,
          subtitle: "start",
          data: {
            store: x(o.$id),
            action: x(c),
            args: u
          },
          groupId: _
        }
      }), a((m) => {
        R = void 0, t.addTimelineEvent({
          layerId: B,
          event: {
            time: n(),
            title: "🛬 " + c,
            subtitle: "end",
            data: {
              store: x(o.$id),
              action: x(c),
              args: u,
              result: m
            },
            groupId: _
          }
        });
      }), i((m) => {
        R = void 0, t.addTimelineEvent({
          layerId: B,
          event: {
            time: n(),
            logType: "error",
            title: "💥 " + c,
            subtitle: "end",
            data: {
              store: x(o.$id),
              action: x(c),
              args: u,
              error: m
            },
            groupId: _
          }
        });
      });
    }, !0), o._customProperties.forEach((a) => {
      Ue(() => T(o[a]), (i, c) => {
        t.notifyComponentUpdate(), t.sendInspectorState(O), K && t.addTimelineEvent({
          layerId: B,
          event: {
            time: n(),
            title: "Change",
            subtitle: a,
            data: {
              newValue: i,
              oldValue: c
            },
            groupId: R
          }
        });
      }, { deep: !0 });
    }), o.$subscribe(({ events: a, type: i }, c) => {
      if (t.notifyComponentUpdate(), t.sendInspectorState(O), !K)
        return;
      const u = {
        time: n(),
        title: Ut(i),
        data: Rt({ store: x(o.$id) }, zt(a)),
        groupId: R
      };
      i === A.patchFunction ? u.subtitle = "⤵️" : i === A.patchObject ? u.subtitle = "🧩" : a && !Array.isArray(a) && (u.subtitle = a.type), a && (u.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: a
        }
      }), t.addTimelineEvent({
        layerId: B,
        event: u
      });
    }, { detached: !0, flush: "sync" });
    const s = o._hotUpdate;
    o._hotUpdate = F((a) => {
      s(a), t.addTimelineEvent({
        layerId: B,
        event: {
          time: n(),
          title: "🔥 " + o.$id,
          subtitle: "HMR update",
          data: {
            store: x(o.$id),
            info: x("HMR update")
          }
        }
      }), t.notifyComponentUpdate(), t.sendInspectorTree(O), t.sendInspectorState(O);
    });
    const { $dispose: r } = o;
    o.$dispose = () => {
      r(), t.notifyComponentUpdate(), t.sendInspectorTree(O), t.sendInspectorState(O), t.getSettings().logStoreChanges && k(`Disposed "${o.$id}" store 🗑`);
    }, t.notifyComponentUpdate(), t.sendInspectorTree(O), t.sendInspectorState(O), t.getSettings().logStoreChanges && k(`"${o.$id}" store installed 🆕`);
  });
}
let it = 0, R;
function Pe(e, o, t) {
  const n = o.reduce((s, r) => (s[r] = me(e)[r], s), {});
  for (const s in n)
    e[s] = function() {
      const r = it, a = t ? new Proxy(e, {
        get(...c) {
          return R = r, Reflect.get(...c);
        },
        set(...c) {
          return R = r, Reflect.set(...c);
        }
      }) : e;
      R = r;
      const i = n[s].apply(a, arguments);
      return R = void 0, i;
    };
}
function Ft({ app: e, store: o, options: t }) {
  if (o.$id.startsWith("__hot:"))
    return;
  o._isOptionsAPI = !!t.state, Pe(o, Object.keys(t.actions), o._isOptionsAPI);
  const n = o._hotUpdate;
  me(o)._hotUpdate = function(s) {
    n.apply(this, arguments), Pe(o, Object.keys(s._hmrPayload.actions), !!o._isOptionsAPI);
  }, Bt(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    o
  );
}
function Gt() {
  const e = je(!0), o = e.run(() => w({}));
  let t = [], n = [];
  const s = F({
    install(r) {
      re(s), s._a = r, r.provide(Ke, s), r.config.globalProperties.$pinia = s, se && Ht(r, s), n.forEach((a) => t.push(a)), n = [];
    },
    use(r) {
      return !this._a && !Je ? n.push(r) : t.push(r), this;
    },
    _p: t,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: o
  });
  return se && typeof Proxy < "u" && s.use(Ft), s;
}
function rt(e, o) {
  for (const t in o) {
    const n = o[t];
    if (!(t in e))
      continue;
    const s = e[t];
    G(s) && G(n) && !ie(n) && !ke(n) ? e[t] = rt(s, n) : e[t] = n;
  }
  return e;
}
const at = () => {
};
function Ve(e, o, t, n = at) {
  e.push(o);
  const s = () => {
    const r = e.indexOf(o);
    r > -1 && (e.splice(r, 1), n());
  };
  return !t && gt() && vt(s), s;
}
function Y(e, ...o) {
  e.slice().forEach((t) => {
    t(...o);
  });
}
const Jt = (e) => e();
function we(e, o) {
  e instanceof Map && o instanceof Map && o.forEach((t, n) => e.set(n, t)), e instanceof Set && o instanceof Set && o.forEach(e.add, e);
  for (const t in o) {
    if (!o.hasOwnProperty(t))
      continue;
    const n = o[t], s = e[t];
    G(s) && G(n) && e.hasOwnProperty(t) && !ie(n) && !ke(n) ? e[t] = we(s, n) : e[t] = n;
  }
  return e;
}
const Wt = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Yt(e) {
  return !G(e) || !e.hasOwnProperty(Wt);
}
const { assign: L } = Object;
function xe(e) {
  return !!(ie(e) && e.effect);
}
function Me(e, o, t, n) {
  const { state: s, actions: r, getters: a } = o, i = t.state.value[e];
  let c;
  function u() {
    !i && (process.env.NODE_ENV === "production" || !n) && (t.state.value[e] = s ? s() : {});
    const _ = process.env.NODE_ENV !== "production" && n ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Ne(w(s ? s() : {}).value)
    ) : Ne(t.state.value[e]);
    return L(_, r, Object.keys(a || {}).reduce((m, v) => (process.env.NODE_ENV !== "production" && v in _ && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${v}" in store "${e}".`), m[v] = F(Oe(() => {
      re(t);
      const E = t._s.get(e);
      return a[v].call(E, E);
    })), m), {}));
  }
  return c = Ee(e, u, o, t, n, !0), c;
}
function Ee(e, o, t = {}, n, s, r) {
  let a;
  const i = L({ actions: {} }, t);
  if (process.env.NODE_ENV !== "production" && !n._e.active)
    throw new Error("Pinia destroyed");
  const c = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Je && (c.onTrigger = (f) => {
    u ? E = f : u == !1 && !d._hotUpdating && (Array.isArray(E) ? E.push(f) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let u, _, m = [], v = [], E;
  const V = n.state.value[e];
  !r && !V && (process.env.NODE_ENV === "production" || !s) && (n.state.value[e] = {});
  const J = w({});
  let ce;
  function ee(f) {
    let l;
    u = _ = !1, process.env.NODE_ENV !== "production" && (E = []), typeof f == "function" ? (f(n.state.value[e]), l = {
      type: A.patchFunction,
      storeId: e,
      events: E
    }) : (we(n.state.value[e], f), l = {
      type: A.patchObject,
      payload: f,
      storeId: e,
      events: E
    });
    const y = ce = Symbol();
    Ce().then(() => {
      ce === y && (u = !0);
    }), _ = !0, Y(m, l, n.state.value[e]);
  }
  const ge = r ? function() {
    const { state: l } = t, y = l ? l() : {};
    this.$patch((Q) => {
      L(Q, y);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : at
  );
  function ve() {
    a.stop(), m = [], v = [], n._s.delete(e);
  }
  function ue(f, l) {
    return function() {
      re(n);
      const y = Array.from(arguments), Q = [], te = [];
      function ft(I) {
        Q.push(I);
      }
      function pt(I) {
        te.push(I);
      }
      Y(v, {
        args: y,
        name: f,
        store: d,
        after: ft,
        onError: pt
      });
      let ne;
      try {
        ne = l.apply(this && this.$id === e ? this : d, y);
      } catch (I) {
        throw Y(te, I), I;
      }
      return ne instanceof Promise ? ne.then((I) => (Y(Q, I), I)).catch((I) => (Y(te, I), Promise.reject(I))) : (Y(Q, ne), ne);
    };
  }
  const b = /* @__PURE__ */ F({
    actions: {},
    getters: {},
    state: [],
    hotState: J
  }), S = {
    _p: n,
    // _s: scope,
    $id: e,
    $onAction: Ve.bind(null, v),
    $patch: ee,
    $reset: ge,
    $subscribe(f, l = {}) {
      const y = Ve(m, f, l.detached, () => Q()), Q = a.run(() => Ue(() => n.state.value[e], (te) => {
        (l.flush === "sync" ? _ : u) && f({
          storeId: e,
          type: A.direct,
          events: E
        }, te);
      }, L({}, c, l)));
      return y;
    },
    $dispose: ve
  }, d = _t(process.env.NODE_ENV !== "production" || se ? L(
    {
      _hmrPayload: b,
      _customProperties: F(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    S
    // must be added later
    // setupStore
  ) : S);
  n._s.set(e, d);
  const N = (n._a && n._a.runWithContext || Jt)(() => n._e.run(() => (a = je()).run(o)));
  for (const f in N) {
    const l = N[f];
    if (ie(l) && !xe(l) || ke(l))
      process.env.NODE_ENV !== "production" && s ? le(J.value, f, be(N, f)) : r || (V && Yt(l) && (ie(l) ? l.value = V[f] : we(l, V[f])), n.state.value[e][f] = l), process.env.NODE_ENV !== "production" && b.state.push(f);
    else if (typeof l == "function") {
      const y = process.env.NODE_ENV !== "production" && s ? l : ue(f, l);
      N[f] = y, process.env.NODE_ENV !== "production" && (b.actions[f] = l), i.actions[f] = l;
    } else
      process.env.NODE_ENV !== "production" && xe(l) && (b.getters[f] = r ? (
        // @ts-expect-error
        t.getters[f]
      ) : l, _e && (N._getters || // @ts-expect-error: same
      (N._getters = F([]))).push(f));
  }
  if (L(d, N), L(me(d), N), Object.defineProperty(d, "$state", {
    get: () => process.env.NODE_ENV !== "production" && s ? J.value : n.state.value[e],
    set: (f) => {
      if (process.env.NODE_ENV !== "production" && s)
        throw new Error("cannot set hotState");
      ee((l) => {
        L(l, f);
      });
    }
  }), process.env.NODE_ENV !== "production" && (d._hotUpdate = F((f) => {
    d._hotUpdating = !0, f._hmrPayload.state.forEach((l) => {
      if (l in d.$state) {
        const y = f.$state[l], Q = d.$state[l];
        typeof y == "object" && G(y) && G(Q) ? rt(y, Q) : f.$state[l] = Q;
      }
      le(d, l, be(f.$state, l));
    }), Object.keys(d.$state).forEach((l) => {
      l in f.$state || ye(d, l);
    }), u = !1, _ = !1, n.state.value[e] = be(f._hmrPayload, "hotState"), _ = !0, Ce().then(() => {
      u = !0;
    });
    for (const l in f._hmrPayload.actions) {
      const y = f[l];
      le(d, l, ue(l, y));
    }
    for (const l in f._hmrPayload.getters) {
      const y = f._hmrPayload.getters[l], Q = r ? (
        // special handling of options api
        Oe(() => (re(n), y.call(d, d)))
      ) : y;
      le(d, l, Q);
    }
    Object.keys(d._hmrPayload.getters).forEach((l) => {
      l in f._hmrPayload.getters || ye(d, l);
    }), Object.keys(d._hmrPayload.actions).forEach((l) => {
      l in f._hmrPayload.actions || ye(d, l);
    }), d._hmrPayload = f._hmrPayload, d._getters = f._getters, d._hotUpdating = !1;
  })), se) {
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
  return n._p.forEach((f) => {
    if (se) {
      const l = a.run(() => f({
        store: d,
        app: n._a,
        pinia: n,
        options: i
      }));
      Object.keys(l || {}).forEach((y) => d._customProperties.add(y)), L(d, l);
    } else
      L(d, a.run(() => f({
        store: d,
        app: n._a,
        pinia: n,
        options: i
      })));
  }), process.env.NODE_ENV !== "production" && d.$state && typeof d.$state == "object" && typeof d.$state.constructor == "function" && !d.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${d.$id}".`), V && r && t.hydrate && t.hydrate(d.$state, V), u = !0, _ = !0, d;
}
function Kt(e, o, t) {
  let n, s;
  const r = typeof o == "function";
  if (typeof e == "string")
    n = e, s = r ? t : o;
  else if (s = e, n = e.id, process.env.NODE_ENV !== "production" && typeof n != "string")
    throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
  function a(i, c) {
    const u = ht();
    if (i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && oe && oe._testing ? null : i) || (u ? ze(Ke, null) : null), i && re(i), process.env.NODE_ENV !== "production" && !oe)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    i = oe, i._s.has(n) || (r ? Ee(n, o, s, i) : Me(n, s, i), process.env.NODE_ENV !== "production" && (a._pinia = i));
    const _ = i._s.get(n);
    if (process.env.NODE_ENV !== "production" && c) {
      const m = "__hot:" + n, v = r ? Ee(m, o, s, i, !0) : Me(m, L({}, s), i, !0);
      c._hotUpdate(v), delete i.state.value[m], i._s.delete(m);
    }
    if (process.env.NODE_ENV !== "production" && _e) {
      const m = mt();
      if (m && m.proxy && // avoid adding stores that are just built for hot module replacement
      !c) {
        const v = m.proxy, E = "_pStores" in v ? v._pStores : v._pStores = {};
        E[n] = _;
      }
    }
    return _;
  }
  return a.$id = n, a;
}
const Xt = ["id", "checked"], Zt = ["for", "innerHTML"], en = /* @__PURE__ */ C({
  __name: "MCQOption",
  props: {
    optionKey: {},
    checked: { type: Boolean },
    option: {},
    submitted: { type: Boolean }
  },
  emits: ["selectOption"],
  setup(e, { emit: o }) {
    const t = o, n = () => t("selectOption");
    return (s, r) => (h(), g(z, null, [
      (h(), g("input", {
        id: "option-" + s.optionKey,
        key: s.optionKey,
        "test-id": "radio_options",
        type: "radio",
        name: "options",
        checked: s.checked,
        class: U(s.submitted && "ignore-hover"),
        onClick: [
          r[0] || (r[0] = (a) => n()),
          r[1] || (r[1] = bt(() => {
          }, ["stop"]))
        ]
      }, null, 10, Xt)),
      (h(), g("label", {
        key: s.optionKey,
        for: "option-" + s.optionKey,
        class: U(s.submitted ? "mcq-option-label ignore-hover" : "mcq-option-label"),
        onClick: r[2] || (r[2] = (a) => n()),
        innerHTML: s.option.optionValue
      }, null, 10, Zt))
    ], 64));
  }
}), P = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [n, s] of o)
    t[n] = s;
  return t;
}, tn = /* @__PURE__ */ P(en, [["__scopeId", "data-v-e5ddf38c"]]), nn = ["disabled"], on = /* @__PURE__ */ C({
  __name: "MCQButton",
  props: {
    submitted: { type: Boolean },
    selectedOption: {},
    hideSkip: { type: Boolean }
  },
  emits: ["submitAnswer", "nextQuestion", "skipQuestion"],
  setup(e, { emit: o }) {
    const t = w("skip"), n = w("Skip"), s = o, r = (c, u) => {
      !c && u ? a("next", "Next", "submitAnswer") : c && u ? a("skip", "Skip", "nextQuestion") : !c && !u && a("skip", "Skip", "skipQuestion");
    }, a = (c, u, _) => {
      t.value = c, n.value = u, s(_);
    }, i = (c, u) => c && u ? { class: "next", text: "Next" } : !c && u ? { class: "submit", text: "Submit" } : { class: t.value, text: n.value };
    return (c, u) => (h(), g("div", null, [
      p("button", {
        disabled: c.hideSkip && i(c.submitted, c.selectedOption).class === "skip",
        class: U(["mcq-button", i(c.submitted, c.selectedOption).class]),
        onClick: u[0] || (u[0] = (_) => r(c.submitted, c.selectedOption))
      }, $(i(c.submitted, c.selectedOption).text), 11, nn)
    ]));
  }
}), sn = /* @__PURE__ */ P(on, [["__scopeId", "data-v-847b8dd5"]]), rn = /* @__PURE__ */ C({
  __name: "NextButton",
  props: {
    buttonName: {}
  },
  emits: ["nextQuestion", "prevQuestion"],
  setup(e, { emit: o }) {
    const { buttonName: t } = e, n = o, s = () => {
      r(t !== "←" ? "nextQuestion" : "prevQuestion");
    }, r = (a) => {
      n(a);
    };
    return (a, i) => (h(), g("div", null, [
      p("button", {
        class: U(a.buttonName === "Submit" ? "submit_btn" : "mcq-button"),
        onClick: i[0] || (i[0] = (c) => s())
      }, $(a.buttonName), 3)
    ]));
  }
}), Ae = /* @__PURE__ */ P(rn, [["__scopeId", "data-v-8be7f61e"]]), an = (e) => {
  for (let o = e.length - 1; o > 0; o--) {
    const t = Math.floor(Math.random() * (o + 1));
    [e[o], e[t]] = [e[t], e[o]];
  }
  return e;
}, cn = (e, o) => an(o).slice(0, e);
function ct(e) {
  const o = e.reduce(
    (n, s) => (Object.keys(s).forEach((r) => {
      n[r] || (n[r] = /* @__PURE__ */ new Set()), n[r].add(s[r]);
    }), n),
    {}
  );
  return Object.keys(o).reduce(
    (n, s) => (n[s] = [...o[s]], n),
    {}
  );
}
function qe(e, o) {
  return e.filter((t) => Object.keys(o).every((n) => !o[n].length || o[n].includes(t.tags[n])));
}
function un(e, o, t) {
  const n = e[o].question.optionsList;
  for (let s = 0; s < n.length; s++)
    if (n[s].optionValue === t)
      return s;
}
const ut = (e, o) => o.findIndex((t) => {
  var n;
  return ((n = t.question._id) == null ? void 0 : n.$oid) === e;
}), D = Kt("questionsQueue", {
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
      return qe(e, this.selectedTags).length;
    },
    setselectedTags(e) {
      this.selectedTags = e;
    },
    getselectedtags() {
      return this.selectedTags;
    },
    modifySelectedTags(e, { category: o, topic: t }) {
      this.selectedTags[o] && (this.selectedTags[o] = e ? [...this.selectedTags[o], t] : this.selectedTags[o].filter(
        (n) => n !== t
      ));
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
      const n = ut(e, this.quizStats);
      if (this.quizStats[n]) {
        if (t !== void 0) {
          if (this.quizStats[n][o]++, t === "-1") {
            this.quizStats[n].selectedValue = "Reached Time Limit";
            return;
          }
          const s = this.quizStats[n].question.optionsList.map((r) => r.optionCorrect).indexOf(!0);
          Number(t) === Number(s) ? this.quizStats[n].correct = 1 : this.quizStats[n].correct = 0;
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
}), ln = ["innerHTML"], dn = { class: "mcq-list" }, fn = ["onClick"], pn = { class: "next-prev-question" }, hn = /* @__PURE__ */ C({
  __name: "MCQQuestion",
  props: {
    _id: {},
    statement: {},
    optionsList: {}
  },
  emits: ["nextQuestion", "skipQuestion", "prevQuestion"],
  setup(e, { emit: o }) {
    const t = D(), { statement: n, optionsList: s, _id: r } = e, a = w(null), i = w(!1), c = o, u = w(t.getRemainingQuestions()), _ = () => {
      i.value = !0;
    }, m = () => {
      a.value = null, c("nextQuestion");
    }, v = (b) => {
      J(b), u.value = t.getRemainingQuestions(), c("nextQuestion");
    }, E = () => {
      J(r), c("skipQuestion");
    }, V = (b) => t.incrementStat(
      b.$oid,
      "attempts",
      a.value ?? void 0
    ), J = (b) => {
      V(b), i.value = !1, a.value = null;
    }, ce = () => {
      c("prevQuestion");
    }, ee = (b, S) => {
      i.value || (a.value = a.value === S ? null : S), V(b);
    }, ge = (b, S, d) => t.quizMode === "Timed" ? ve(b, S) : ue(S, d);
    function ve(b, S) {
      const d = ut(b.$oid, t.quizStats), H = t.quizStats[d].selectedValue, N = un(
        t.quizStats,
        d,
        H
      );
      return String(N) === S ? "selected" : "";
    }
    function ue(b, S) {
      const d = S[parseInt(b)], H = a.value === b;
      return i.value ? d.optionCorrect ? "correct ignore-hover" : H ? "wrong ignore-hover" : "ignore-hover" : H ? "selected" : "";
    }
    return (b, S) => (h(), g(z, null, [
      p("div", {
        class: "mcq-statement",
        innerHTML: b.statement
      }, null, 8, ln),
      p("div", dn, [
        (h(!0), g(z, null, X(Object.entries(b.optionsList), ([d, H]) => (h(), g("div", {
          key: d,
          class: U(["mcq-option", ge(b._id, d, b.optionsList)]),
          onClick: (N) => ee(b._id, d)
        }, [
          Z(tn, {
            "option-key": d,
            checked: a.value === d,
            option: H,
            submitted: i.value,
            onSelectOption: (N) => ee(b._id, d)
          }, null, 8, ["option-key", "checked", "option", "submitted", "onSelectOption"])
        ], 10, fn))), 128))
      ]),
      T(t).quizMode === "Tutor" ? (h(), M(sn, {
        key: 0,
        submitted: i.value,
        "selected-option": a.value,
        "hide-skip": u.value <= 1,
        onSubmitAnswer: _,
        onNextQuestion: S[0] || (S[0] = (d) => v(b._id)),
        onSkipQuestion: E
      }, null, 8, ["submitted", "selected-option", "hide-skip"])) : q("", !0),
      p("div", pn, [
        T(t).quizMode === "Timed" ? (h(), M(Ae, {
          key: 0,
          "button-name": T(t).questionsQueue.length >= 1 ? "→" : "Submit",
          onNextQuestion: S[1] || (S[1] = (d) => m())
        }, null, 8, ["button-name"])) : q("", !0),
        T(t).quizMode === "Timed" && T(t).questionsStack.length > 1 ? (h(), M(Ae, {
          key: 1,
          "button-name": "←",
          onPrevQuestion: S[2] || (S[2] = (d) => ce())
        })) : q("", !0)
      ])
    ], 64));
  }
}), lt = /* @__PURE__ */ P(hn, [["__scopeId", "data-v-6e8339a0"]]), mn = (e) => (Re("data-v-4ffecbcd"), e = e(), He(), e), _n = { class: "report-container" }, gn = { class: "mcq-report" }, vn = { class: "table-container" }, bn = /* @__PURE__ */ mn(() => /* @__PURE__ */ p("thead", null, [
  /* @__PURE__ */ p("tr", null, [
    /* @__PURE__ */ p("th", null, "question"),
    /* @__PURE__ */ p("th", null, "correct option"),
    /* @__PURE__ */ p("th", null, "your answer")
  ])
], -1)), yn = { class: "question-row" }, Sn = ["href", "innerHTML"], Tn = { class: "answer-row" }, wn = ["innerHTML"], En = { class: "answer-row" }, kn = ["innerHTML"], On = { class: "mcq-result" }, $n = { class: "score" }, Qn = /* @__PURE__ */ C({
  __name: "MCQStatus",
  setup(e) {
    const o = D(), t = o.quizStats, n = o.quizStats.length, s = t.filter((a) => a.correct === 1).length, r = (s * 100 / n).toFixed(0);
    return (a, i) => (h(), g("div", _n, [
      p("div", gn, [
        p("div", vn, [
          p("table", null, [
            bn,
            p("tbody", null, [
              (h(!0), g(z, null, X(Object.entries(T(t)), ([c, u]) => (h(), g("tr", {
                key: c,
                class: "quiz-statment"
              }, [
                p("td", yn, [
                  p("a", {
                    href: u.question.link,
                    target: "_blank",
                    innerHTML: u.question.statement
                  }, null, 8, Sn)
                ]),
                p("td", Tn, [
                  (h(!0), g(z, null, X(Object.entries(
                    u.question.optionsList
                  ), ([_, m]) => (h(), g("span", { key: _ }, [
                    m.optionCorrect ? (h(), g("span", {
                      key: 0,
                      innerHTML: m.optionValue
                    }, null, 8, wn)) : q("", !0)
                  ]))), 128))
                ]),
                p("td", En, [
                  p("span", {
                    class: U(
                      u.correct === 1 ? "correct-answer" : "wrong-answer"
                    ),
                    innerHTML: u.correct === 1 ? "<span> ✔</span> " : "<span> ✘</span> <span>     </span>" + u.selectedValue
                  }, null, 10, kn)
                ])
              ]))), 128))
            ])
          ])
        ])
      ]),
      p("div", null, [
        p("div", On, [
          p("span", $n, "⌛ Result: " + $(T(s)) + " out of " + $(T(n)) + " - (" + $(T(r)) + " %)", 1)
        ])
      ])
    ]));
  }
}), dt = /* @__PURE__ */ P(Qn, [["__scopeId", "data-v-4ffecbcd"]]), qn = /* @__PURE__ */ C({
  __name: "MCQQuiz",
  setup(e) {
    const o = w(), t = D();
    Be(() => {
      s();
    });
    const n = () => {
      t.enqueueQuestion(o.value), s();
    }, s = () => {
      o.value = t.dequeueQuestion();
    }, r = () => window.location.reload();
    return (a, i) => {
      const c = yt("MCQInfoPanel");
      return h(), g("main", null, [
        Z(c),
        o.value ? (h(), M(lt, {
          key: 0,
          statement: o.value.statement,
          "options-list": o.value.optionsList,
          _id: o.value._id,
          onNextQuestion: s,
          onSkipQuestion: n
        }, null, 8, ["statement", "options-list", "_id"])) : q("", !0),
        o.value ? q("", !0) : (h(), M(dt, { key: 1 })),
        o.value ? q("", !0) : (h(), g("button", {
          key: 2,
          class: "btn-relocate",
          onClick: r
        }, " End "))
      ]);
    };
  }
}), Cn = /* @__PURE__ */ P(qn, [["__scopeId", "data-v-937e1a1b"]]), Nn = {
  key: 0,
  class: "time-left-header"
}, In = { class: "questions-left-header" }, Ln = /* @__PURE__ */ C({
  __name: "MCQInfoPanel",
  props: {
    timeLeft: {
      type: Number,
      default: 0
    }
  },
  setup(e) {
    const o = D(), t = (n) => {
      const s = Math.floor(n / 60), r = n % 60;
      return `${s}:${r < 10 ? "0" : ""}${r}`;
    };
    return (n, s) => (h(), g(z, null, [
      e.timeLeft ? (h(), g("h3", Nn, " Time left: " + $(t(e.timeLeft)), 1)) : q("", !0),
      p("h3", In, " Question " + $(T(o).questionsStack.length) + " out of " + $(T(o).questionsQueue.length + T(o).questionsStack.length), 1)
    ], 64));
  }
}), De = 1e3, Pn = "-1", Vn = /* @__PURE__ */ C({
  __name: "MCQTimedQuiz",
  setup(e) {
    const o = D(), t = w();
    let n = null, s = null;
    const r = w(o.timeLimit);
    Be(() => {
      i();
    }), Fe(() => {
      u(), _();
    });
    const a = () => {
      t.value = o.removeFromLastHistory() ?? t.value;
    }, i = () => t.value = o.dequeueQuestion(), c = () => window.location.reload(), u = () => {
      n && clearTimeout(n), s && clearInterval(s);
    }, _ = () => {
      r.value = o.timeLimit;
      const v = () => t.value ? r.value ? r.value-- : m() : u();
      s = window.setInterval(v, De), n = window.setTimeout(() => {
      }, o.timeLimit * De);
    }, m = () => {
      var E;
      u();
      const v = (V) => o.incrementStat(V, "attempts", Pn);
      for (v(((E = t.value) == null ? void 0 : E._id.$oid) ?? ""); t.value = o.dequeueQuestion(); )
        v(t.value._id.$oid);
      return alert("Time's up! Quiz has ended."), i();
    };
    return (v, E) => (h(), g("main", null, [
      Z(Ln, { "time-left": r.value }, null, 8, ["time-left"]),
      t.value ? (h(), M(lt, {
        key: 0,
        statement: t.value.statement,
        "options-list": t.value.optionsList,
        _id: t.value._id,
        onNextQuestion: i,
        onPrevQuestion: a
      }, null, 8, ["statement", "options-list", "_id"])) : q("", !0),
      t.value ? q("", !0) : (h(), M(dt, { key: 1 })),
      t.value ? q("", !0) : (h(), g("button", {
        key: 2,
        class: "btn-relocate",
        onClick: c
      }, " End "))
    ]));
  }
}), xn = /* @__PURE__ */ P(Vn, [["__scopeId", "data-v-cffdfe07"]]), Mn = ["id", "name", "value", "disabled"], An = ["for"], Dn = {
  key: 0,
  class: "question-number"
}, jn = /* @__PURE__ */ C({
  __name: "FilterCheckbox",
  props: {
    category: {},
    topics: {}
  },
  setup(e) {
    const { category: o, topics: t } = e, n = D(), s = Oe(
      () => Object.entries(t).map(([i, c]) => {
        const u = a(c, o);
        return { idx: i, topic: c, num: u };
      }).filter(({ topic: i }) => i !== void 0)
    ), r = (i) => {
      if (!(i.target instanceof HTMLInputElement))
        return console.error("Trying to click on non-input element");
      const c = i.target.name, u = i.target.value;
      n.modifySelectedTags(i.target.checked, { category: c, topic: u });
    }, a = (i, c) => {
      var v;
      const u = n.getselectedtags();
      if (!u[c] || (v = u[c]) != null && v.includes(
        i
      ))
        return null;
      const _ = JSON.parse(
        JSON.stringify(n.getselectedtags())
      );
      _[c].includes(i) || _[c].push(i);
      const m = n.allQs;
      return qe(
        m,
        _
      ).length.toString();
    };
    return (i, c) => (h(), g("ul", null, [
      (h(!0), g(z, null, X(s.value, ({ idx: u, num: _, topic: m }) => (h(), g("li", {
        key: u,
        class: U(["filter-options", { "grey-out": _ === "0" }])
      }, [
        p("input", {
          id: `${i.category}-${m}-checkbox`,
          type: "checkbox",
          name: i.category,
          value: m,
          disabled: _ === "0",
          onChange: c[0] || (c[0] = (v) => r(v))
        }, null, 40, Mn),
        p("label", {
          for: `${i.category}-${m}-checkbox`
        }, [
          Ge($(m) + " ", 1),
          _ !== null && _ !== "0" ? (h(), g("span", Dn, $(_), 1)) : q("", !0)
        ], 8, An)
      ], 2))), 128))
    ]));
  }
}), zn = /* @__PURE__ */ P(jn, [["__scopeId", "data-v-0f1deb69"]]), Un = { class: "filter" }, Rn = { class: "category-heading" }, Hn = /* @__PURE__ */ C({
  __name: "MCQTagOptions",
  setup(e) {
    const n = D().allQs.map((r) => r.tags), s = ct(n);
    return (r, a) => (h(), g("div", Un, [
      (h(!0), g(z, null, X(Object.entries(T(s)), ([i, c]) => (h(), g("div", {
        key: i,
        class: "category"
      }, [
        p("h2", Rn, $(i), 1),
        Z(zn, {
          category: i,
          topics: c
        }, null, 8, ["category", "topics"])
      ]))), 128))
    ]));
  }
}), Bn = /* @__PURE__ */ P(Hn, [["__scopeId", "data-v-efaccb2c"]]), Fn = { for: "optionName" }, Gn = ["value"], Jn = /* @__PURE__ */ C({
  __name: "DropDownbox",
  props: {
    options: {},
    optionName: {},
    disabled: { type: Boolean }
  },
  setup(e) {
    const o = D(), t = w(0);
    function n(s) {
      const r = s.target;
      r.value && (t.value = parseFloat(r.value) * 60, o.setTimeLimit(t.value));
    }
    return (s, r) => (h(), g("div", {
      class: U(s.disabled ? "dropdown input-disabled" : "dropdown")
    }, [
      p("label", Fn, $(s.optionName) + ":   ", 1),
      p("select", {
        id: "optionName",
        name: "optionName",
        onChange: n
      }, [
        (h(!0), g(z, null, X(s.options, (a) => (h(), g("option", {
          key: a.value,
          value: a.value
        }, $(a.value) + " " + $(a.unit), 9, Gn))), 128))
      ], 32)
    ], 2));
  }
}), Wn = /* @__PURE__ */ P(Jn, [["__scopeId", "data-v-5f3ae97a"]]), ae = (e) => (Re("data-v-30ab292c"), e = e(), He(), e), Yn = { class: "start-page-container" }, Kn = /* @__PURE__ */ ae(() => /* @__PURE__ */ p("h1", null, "VetCloud Smart Quiz", -1)), Xn = { class: "quiz-config-container" }, Zn = { class: "question-config-container" }, eo = { class: "tag-text" }, to = { class: "question-number" }, no = { class: "question-amount-container" }, oo = /* @__PURE__ */ ae(() => /* @__PURE__ */ p("label", { for: "question-amount" }, "Select the amount of questions:", -1)), so = ["max"], io = {
  key: 0,
  class: "show-max-msg"
}, ro = /* @__PURE__ */ ae(() => /* @__PURE__ */ p("label", { for: "mode-select" }, "Select mode:", -1)), ao = /* @__PURE__ */ ae(() => /* @__PURE__ */ p("option", { value: "Tutor" }, "Tutor", -1)), co = /* @__PURE__ */ ae(() => /* @__PURE__ */ p("option", { value: "Timed" }, "Timed", -1)), uo = [
  ao,
  co
], lo = 3e3, fo = /* @__PURE__ */ C({
  __name: "StartPage",
  emits: ["start-quiz"],
  setup(e, { emit: o }) {
    const t = w(1), n = w("Tutor"), s = w(!1), r = w(null), a = o, i = D(), c = () => {
      a("start-quiz", {
        questionAmount: t.value,
        mode: n.value
      });
    }, u = () => {
      r.value && clearTimeout(r.value), t.value > i.getquestionnumber() && (t.value = i.getquestionnumber(), s.value = !0, r.value = window.setTimeout(() => {
        s.value = !1;
      }, lo));
    };
    return (_, m) => (h(), g("div", Yn, [
      Kn,
      Z(Bn),
      p("div", Xn, [
        p("div", Zn, [
          p("p", eo, [
            Ge(" Maximum possible questions: "),
            p("span", to, $(T(i).getquestionnumber()), 1)
          ]),
          p("div", no, [
            oo,
            Ie(p("input", {
              id: "question-amount",
              "onUpdate:modelValue": m[0] || (m[0] = (v) => t.value = v),
              type: "number",
              placeholder: "Question amount",
              min: "1",
              max: T(i).getquestionnumber(),
              onInput: u
            }, null, 40, so), [
              [
                St,
                t.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          s.value ? (h(), g("p", io, " Cannot select more than " + $(T(i).getquestionnumber()) + " questions. ", 1)) : q("", !0),
          p("div", null, [
            ro,
            Ie(p("select", {
              id: "mode-select",
              "onUpdate:modelValue": m[1] || (m[1] = (v) => n.value = v)
            }, uo, 512), [
              [Tt, n.value]
            ])
          ]),
          Z(Wn, {
            options: [
              { value: 1, label: "Time Option 2", unit: "Min." },
              { value: 1.5, label: "Time Option 1", unit: "Min." }
            ],
            "option-name": "Time per Question",
            class: U(n.value === "Timed" ? "" : "input-disabled"),
            disabled: n.value !== "Timed"
          }, null, 8, ["options", "class", "disabled"])
        ])
      ]),
      p("button", {
        class: "start-button",
        onClick: c
      }, "Start")
    ]));
  }
}), po = /* @__PURE__ */ P(fo, [["__scopeId", "data-v-30ab292c"]]);
Array.from(
  { length: 10 },
  (e, o) => `VETS20${o + 10}`
);
const ho = (e) => e.reduce((o, t) => {
  if (!t.includes(":"))
    return o;
  const [n, s] = t.split(":");
  return o[n] = s.trim(), o;
}, {}), mo = (e) => e.map((o) => ({
  _id: { $oid: o._id.$oid },
  statement: o.statement,
  tags: ho(o.tags),
  optionsList: o.optionsList,
  link: o.link
})), _o = { convertQuestions: mo }, go = [
  {
    tags: ["course: VETS2011", "subject: Physiology", "system: Nervous System"],
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
    tags: ["course: VETS2012", "subject: Physiology", "system: Nervous System"],
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
    tags: ["course: VETS2012", "subject: Physiology", "animal: Horse"],
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
  }
], vo = () => _o.convertQuestions(go), bo = /* @__PURE__ */ C({
  __name: "CrucibleComponent",
  setup(e) {
    const o = w(0), t = D(), n = w(!1), s = w([]), r = ze("$dataLink");
    console.log(r), Fe(() => {
      s.value = vo(), console.log(s.value), t.allQs = s.value;
      const i = ct(
        s.value.map((c) => c.tags)
      );
      t.setselectedTags(
        Object.keys(i).reduce((c, u) => ({ ...c, [u]: [] }), {})
      );
    });
    const a = ({ questionAmount: i, mode: c }) => {
      console.log("dataLink: ", r);
      const u = t.getselectedtags();
      if (!s.value.length)
        return alert("Trouble fetching questions, please try again later");
      const _ = qe(
        s.value,
        u
      ), m = cn(i, _);
      o.value = m.length, t.initialiseQuiz(m, c), c === "Timed" && t.setTimeLimit(i * t.timeLimit), n.value = !0;
    };
    return (i, c) => n.value && T(t).quizMode === "Tutor" ? (h(), M(Cn, { key: 0 })) : n.value && T(t).quizMode === "Timed" ? (h(), M(xn, { key: 1 })) : (h(), M(po, {
      key: 2,
      onStartQuiz: a
    }));
  }
}), yo = /* @__PURE__ */ P(bo, [["__scopeId", "data-v-8bdacccf"]]), So = "http://localhost:8080/api/resource/getQuiz";
function wo(e, o = {}) {
  const t = Gt();
  e.use(t), e.component("CrucibleComponent", yo), e.provide("dataLink", o.dataLink || So), console.log(o.dataLink);
}
export {
  yo as CrucibleComponent,
  wo as createViewerPlugin
};
