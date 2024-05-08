import { effectScope as Ue, ref as w, markRaw as F, hasInjectionContext as ht, inject as Re, getCurrentInstance as _t, toRaw as he, watch as He, reactive as gt, isRef as ie, isReactive as Ee, toRef as be, nextTick as Ce, computed as Oe, unref as T, getCurrentScope as vt, onScopeDispose as bt, toRefs as Le, defineComponent as N, openBlock as m, createElementBlock as g, Fragment as D, normalizeClass as z, withModifiers as yt, createElementVNode as p, toDisplayString as $, renderList as X, createVNode as Z, createBlock as V, createCommentVNode as q, pushScopeId as Be, popScopeId as Fe, onMounted as $e, resolveComponent as St, onBeforeMount as Tt, createTextVNode as Ge, withDirectives as Pe, vModelText as wt, vModelSelect as kt } from "vue";
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
function Et() {
  return We().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function We() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Ot = typeof Proxy == "function", $t = "devtools-plugin:setup", Qt = "plugin:settings:set";
let W, Se;
function qt() {
  var e;
  return W !== void 0 || (typeof window < "u" && window.performance ? (W = !0, Se = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (W = !0, Se = globalThis.perf_hooks.performance) : W = !1), W;
}
function Nt() {
  return qt() ? Se.now() : Date.now();
}
class It {
  constructor(o, t) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = o, this.hook = t;
    const n = {};
    if (o.settings)
      for (const r in o.settings) {
        const i = o.settings[r];
        n[r] = i.defaultValue;
      }
    const s = `__vue-devtools-plugin-settings__${o.id}`;
    let a = Object.assign({}, n);
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
        return Nt();
      }
    }, t && t.on(Qt, (r, i) => {
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
  async setRealTarget(o) {
    this.target = o;
    for (const t of this.onQueue)
      this.target.on[t.method](...t.args);
    for (const t of this.targetQueue)
      t.resolve(await this.target[t.method](...t.args));
  }
}
function Ye(e, o) {
  const t = e, n = We(), s = Et(), a = Ot && t.enableEarlyProxy;
  if (s && (n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a))
    s.emit($t, e, o);
  else {
    const r = a ? new It(t, s) : null;
    (n.__VUE_DEVTOOLS_PLUGINS__ = n.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: t,
      setupFn: o,
      proxy: r
    }), r && o(r.proxiedTarget);
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
const _e = typeof window < "u", se = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && _e, xe = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function Ct(e, { autoBom: o = !1 } = {}) {
  return o && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Qe(e, o, t) {
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
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Ze ? Lt : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in fe ? Pt : (
      // Fallback to using FileReader and a popup
      xt
    )
  )
) : () => {
};
function Lt(e, o = "download", t) {
  const n = document.createElement("a");
  n.download = o, n.rel = "noopener", typeof e == "string" ? (n.href = e, n.origin !== location.origin ? Xe(n.href) ? Qe(e, o, t) : (n.target = "_blank", de(n)) : de(n)) : (n.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(n.href);
  }, 4e4), setTimeout(function() {
    de(n);
  }, 0));
}
function Pt(e, o = "download", t) {
  if (typeof e == "string")
    if (Xe(e))
      Qe(e, o, t);
    else {
      const n = document.createElement("a");
      n.href = e, n.target = "_blank", setTimeout(function() {
        de(n);
      });
    }
  else
    navigator.msSaveOrOpenBlob(Ct(e, t), o);
}
function xt(e, o, t, n) {
  if (n = n || open("", "_blank"), n && (n.document.title = n.document.body.innerText = "downloading..."), typeof e == "string")
    return Qe(e, o, t);
  const s = e.type === "application/octet-stream", a = /constructor/i.test(String(xe.HTMLElement)) || "safari" in xe, r = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((r || s && a || Ze) && typeof FileReader < "u") {
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
function E(e, o) {
  const t = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(t, o) : o === "error" ? console.error(t) : o === "warn" ? console.warn(t) : console.log(t);
}
function qe(e) {
  return "_a" in e && "install" in e;
}
function tt() {
  if (!("clipboard" in navigator))
    return E("Your browser doesn't support the Clipboard API", "error"), !0;
}
function nt(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (E('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Mt(e) {
  if (!tt())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), E("Global state copied to clipboard.");
    } catch (o) {
      if (nt(o))
        return;
      E("Failed to serialize the state. Check the console for more details.", "error"), console.error(o);
    }
}
async function Vt(e) {
  if (!tt())
    try {
      ot(e, JSON.parse(await navigator.clipboard.readText())), E("Global state pasted from clipboard.");
    } catch (o) {
      if (nt(o))
        return;
      E("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(o);
    }
}
async function At(e) {
  try {
    et(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (o) {
    E("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(o);
  }
}
let j;
function jt() {
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
async function Dt(e) {
  try {
    const t = await jt()();
    if (!t)
      return;
    const { text: n, file: s } = t;
    ot(e, JSON.parse(n)), E(`Global state imported from "${s.name}".`);
  } catch (o) {
    E("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(o);
  }
}
function ot(e, o) {
  for (const t in o) {
    const n = e.state.value[t];
    n ? Object.assign(n, o[t]) : e.state.value[t] = o[t];
  }
}
function M(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const st = "🍍 Pinia (root)", Te = "_root";
function zt(e) {
  return qe(e) ? {
    id: Te,
    label: st
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Ut(e) {
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
function Rt(e) {
  return e ? Array.isArray(e) ? e.reduce((o, t) => (o.keys.push(t.key), o.operations.push(t.type), o.oldValue[t.key] = t.oldValue, o.newValue[t.key] = t.newValue, o), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: M(e.type),
    key: M(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function Ht(e) {
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
const pe = [], B = "pinia:mutations", O = "pinia", { assign: Bt } = Object, me = (e) => "🍍 " + e;
function Ft(e, o) {
  Ye({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: pe,
    app: e
  }, (t) => {
    typeof t.now != "function" && E("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), t.addTimelineLayer({
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
            Mt(o);
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
            At(o);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Dt(o), t.sendInspectorTree(O), t.sendInspectorState(O);
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
            s ? typeof s.$reset != "function" ? E(`Cannot reset "${n}" store because it doesn't have a "$reset" method implemented.`, "warn") : (s.$reset(), E(`Store "${n}" reset.`)) : E(`Cannot reset "${n}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), t.on.inspectComponent((n, s) => {
      const a = n.componentInstance && n.componentInstance.proxy;
      if (a && a._pStores) {
        const r = n.componentInstance.proxy._pStores;
        Object.values(r).forEach((i) => {
          n.instanceData.state.push({
            type: me(i.$id),
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
              Object.keys(i.$state).reduce((u, c) => (u[c] = i.$state[c], u), {})
            )
          }), i._getters && i._getters.length && n.instanceData.state.push({
            type: me(i.$id),
            key: "getters",
            editable: !1,
            value: i._getters.reduce((u, c) => {
              try {
                u[c] = i[c];
              } catch (h) {
                u[c] = h;
              }
              return u;
            }, {})
          });
        });
      }
    }), t.on.getInspectorTree((n) => {
      if (n.app === e && n.inspectorId === O) {
        let s = [o];
        s = s.concat(Array.from(o._s.values())), n.rootNodes = (n.filter ? s.filter((a) => "$id" in a ? a.$id.toLowerCase().includes(n.filter.toLowerCase()) : st.toLowerCase().includes(n.filter.toLowerCase())) : s).map(zt);
      }
    }), t.on.getInspectorState((n) => {
      if (n.app === e && n.inspectorId === O) {
        const s = n.nodeId === Te ? o : o._s.get(n.nodeId);
        if (!s)
          return;
        s && (n.state = Ut(s));
      }
    }), t.on.editInspectorState((n, s) => {
      if (n.app === e && n.inspectorId === O) {
        const a = n.nodeId === Te ? o : o._s.get(n.nodeId);
        if (!a)
          return E(`store "${n.nodeId}" not found`, "error");
        const { path: r } = n;
        qe(a) ? r.unshift("state") : (r.length !== 1 || !a._customProperties.has(r[0]) || r[0] in a.$state) && r.unshift("$state"), K = !1, n.set(a, r, n.state.value), K = !0;
      }
    }), t.on.editComponentState((n) => {
      if (n.type.startsWith("🍍")) {
        const s = n.type.replace(/^🍍\s*/, ""), a = o._s.get(s);
        if (!a)
          return E(`store "${s}" not found`, "error");
        const { path: r } = n;
        if (r[0] !== "state")
          return E(`Invalid path for store "${s}":
${r}
Only state can be modified.`);
        r[0] = "$state", K = !1, n.set(a, r, n.state.value), K = !0;
      }
    });
  });
}
function Gt(e, o) {
  pe.includes(me(o.$id)) || pe.push(me(o.$id)), Ye({
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
    o.$onAction(({ after: r, onError: i, name: u, args: c }) => {
      const h = it++;
      t.addTimelineEvent({
        layerId: B,
        event: {
          time: n(),
          title: "🛫 " + u,
          subtitle: "start",
          data: {
            store: M(o.$id),
            action: M(u),
            args: c
          },
          groupId: h
        }
      }), r((_) => {
        R = void 0, t.addTimelineEvent({
          layerId: B,
          event: {
            time: n(),
            title: "🛬 " + u,
            subtitle: "end",
            data: {
              store: M(o.$id),
              action: M(u),
              args: c,
              result: _
            },
            groupId: h
          }
        });
      }), i((_) => {
        R = void 0, t.addTimelineEvent({
          layerId: B,
          event: {
            time: n(),
            logType: "error",
            title: "💥 " + u,
            subtitle: "end",
            data: {
              store: M(o.$id),
              action: M(u),
              args: c,
              error: _
            },
            groupId: h
          }
        });
      });
    }, !0), o._customProperties.forEach((r) => {
      He(() => T(o[r]), (i, u) => {
        t.notifyComponentUpdate(), t.sendInspectorState(O), K && t.addTimelineEvent({
          layerId: B,
          event: {
            time: n(),
            title: "Change",
            subtitle: r,
            data: {
              newValue: i,
              oldValue: u
            },
            groupId: R
          }
        });
      }, { deep: !0 });
    }), o.$subscribe(({ events: r, type: i }, u) => {
      if (t.notifyComponentUpdate(), t.sendInspectorState(O), !K)
        return;
      const c = {
        time: n(),
        title: Ht(i),
        data: Bt({ store: M(o.$id) }, Rt(r)),
        groupId: R
      };
      i === A.patchFunction ? c.subtitle = "⤵️" : i === A.patchObject ? c.subtitle = "🧩" : r && !Array.isArray(r) && (c.subtitle = r.type), r && (c.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: r
        }
      }), t.addTimelineEvent({
        layerId: B,
        event: c
      });
    }, { detached: !0, flush: "sync" });
    const s = o._hotUpdate;
    o._hotUpdate = F((r) => {
      s(r), t.addTimelineEvent({
        layerId: B,
        event: {
          time: n(),
          title: "🔥 " + o.$id,
          subtitle: "HMR update",
          data: {
            store: M(o.$id),
            info: M("HMR update")
          }
        }
      }), t.notifyComponentUpdate(), t.sendInspectorTree(O), t.sendInspectorState(O);
    });
    const { $dispose: a } = o;
    o.$dispose = () => {
      a(), t.notifyComponentUpdate(), t.sendInspectorTree(O), t.sendInspectorState(O), t.getSettings().logStoreChanges && E(`Disposed "${o.$id}" store 🗑`);
    }, t.notifyComponentUpdate(), t.sendInspectorTree(O), t.sendInspectorState(O), t.getSettings().logStoreChanges && E(`"${o.$id}" store installed 🆕`);
  });
}
let it = 0, R;
function Me(e, o, t) {
  const n = o.reduce((s, a) => (s[a] = he(e)[a], s), {});
  for (const s in n)
    e[s] = function() {
      const a = it, r = t ? new Proxy(e, {
        get(...u) {
          return R = a, Reflect.get(...u);
        },
        set(...u) {
          return R = a, Reflect.set(...u);
        }
      }) : e;
      R = a;
      const i = n[s].apply(r, arguments);
      return R = void 0, i;
    };
}
function Jt({ app: e, store: o, options: t }) {
  if (o.$id.startsWith("__hot:"))
    return;
  o._isOptionsAPI = !!t.state, Me(o, Object.keys(t.actions), o._isOptionsAPI);
  const n = o._hotUpdate;
  he(o)._hotUpdate = function(s) {
    n.apply(this, arguments), Me(o, Object.keys(s._hmrPayload.actions), !!o._isOptionsAPI);
  }, Gt(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    o
  );
}
function Wt() {
  const e = Ue(!0), o = e.run(() => w({}));
  let t = [], n = [];
  const s = F({
    install(a) {
      re(s), s._a = a, a.provide(Ke, s), a.config.globalProperties.$pinia = s, se && Ft(a, s), n.forEach((r) => t.push(r)), n = [];
    },
    use(a) {
      return !this._a && !Je ? n.push(a) : t.push(a), this;
    },
    _p: t,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: o
  });
  return se && typeof Proxy < "u" && s.use(Jt), s;
}
function rt(e, o) {
  for (const t in o) {
    const n = o[t];
    if (!(t in e))
      continue;
    const s = e[t];
    G(s) && G(n) && !ie(n) && !Ee(n) ? e[t] = rt(s, n) : e[t] = n;
  }
  return e;
}
const at = () => {
};
function Ve(e, o, t, n = at) {
  e.push(o);
  const s = () => {
    const a = e.indexOf(o);
    a > -1 && (e.splice(a, 1), n());
  };
  return !t && vt() && bt(s), s;
}
function Y(e, ...o) {
  e.slice().forEach((t) => {
    t(...o);
  });
}
const Yt = (e) => e();
function we(e, o) {
  e instanceof Map && o instanceof Map && o.forEach((t, n) => e.set(n, t)), e instanceof Set && o instanceof Set && o.forEach(e.add, e);
  for (const t in o) {
    if (!o.hasOwnProperty(t))
      continue;
    const n = o[t], s = e[t];
    G(s) && G(n) && e.hasOwnProperty(t) && !ie(n) && !Ee(n) ? e[t] = we(s, n) : e[t] = n;
  }
  return e;
}
const Kt = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Xt(e) {
  return !G(e) || !e.hasOwnProperty(Kt);
}
const { assign: L } = Object;
function Ae(e) {
  return !!(ie(e) && e.effect);
}
function je(e, o, t, n) {
  const { state: s, actions: a, getters: r } = o, i = t.state.value[e];
  let u;
  function c() {
    !i && (process.env.NODE_ENV === "production" || !n) && (t.state.value[e] = s ? s() : {});
    const h = process.env.NODE_ENV !== "production" && n ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Le(w(s ? s() : {}).value)
    ) : Le(t.state.value[e]);
    return L(h, a, Object.keys(r || {}).reduce((_, v) => (process.env.NODE_ENV !== "production" && v in h && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${v}" in store "${e}".`), _[v] = F(Oe(() => {
      re(t);
      const k = t._s.get(e);
      return r[v].call(k, k);
    })), _), {}));
  }
  return u = ke(e, c, o, t, n, !0), u;
}
function ke(e, o, t = {}, n, s, a) {
  let r;
  const i = L({ actions: {} }, t);
  if (process.env.NODE_ENV !== "production" && !n._e.active)
    throw new Error("Pinia destroyed");
  const u = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Je && (u.onTrigger = (f) => {
    c ? k = f : c == !1 && !d._hotUpdating && (Array.isArray(k) ? k.push(f) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let c, h, _ = [], v = [], k;
  const x = n.state.value[e];
  !a && !x && (process.env.NODE_ENV === "production" || !s) && (n.state.value[e] = {});
  const J = w({});
  let ue;
  function ee(f) {
    let l;
    c = h = !1, process.env.NODE_ENV !== "production" && (k = []), typeof f == "function" ? (f(n.state.value[e]), l = {
      type: A.patchFunction,
      storeId: e,
      events: k
    }) : (we(n.state.value[e], f), l = {
      type: A.patchObject,
      payload: f,
      storeId: e,
      events: k
    });
    const y = ue = Symbol();
    Ce().then(() => {
      ue === y && (c = !0);
    }), h = !0, Y(_, l, n.state.value[e]);
  }
  const ge = a ? function() {
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
    r.stop(), _ = [], v = [], n._s.delete(e);
  }
  function ce(f, l) {
    return function() {
      re(n);
      const y = Array.from(arguments), Q = [], te = [];
      function pt(C) {
        Q.push(C);
      }
      function mt(C) {
        te.push(C);
      }
      Y(v, {
        args: y,
        name: f,
        store: d,
        after: pt,
        onError: mt
      });
      let ne;
      try {
        ne = l.apply(this && this.$id === e ? this : d, y);
      } catch (C) {
        throw Y(te, C), C;
      }
      return ne instanceof Promise ? ne.then((C) => (Y(Q, C), C)).catch((C) => (Y(te, C), Promise.reject(C))) : (Y(Q, ne), ne);
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
      const y = Ve(_, f, l.detached, () => Q()), Q = r.run(() => He(() => n.state.value[e], (te) => {
        (l.flush === "sync" ? h : c) && f({
          storeId: e,
          type: A.direct,
          events: k
        }, te);
      }, L({}, u, l)));
      return y;
    },
    $dispose: ve
  }, d = gt(process.env.NODE_ENV !== "production" || se ? L(
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
  const I = (n._a && n._a.runWithContext || Yt)(() => n._e.run(() => (r = Ue()).run(o)));
  for (const f in I) {
    const l = I[f];
    if (ie(l) && !Ae(l) || Ee(l))
      process.env.NODE_ENV !== "production" && s ? le(J.value, f, be(I, f)) : a || (x && Xt(l) && (ie(l) ? l.value = x[f] : we(l, x[f])), n.state.value[e][f] = l), process.env.NODE_ENV !== "production" && b.state.push(f);
    else if (typeof l == "function") {
      const y = process.env.NODE_ENV !== "production" && s ? l : ce(f, l);
      I[f] = y, process.env.NODE_ENV !== "production" && (b.actions[f] = l), i.actions[f] = l;
    } else
      process.env.NODE_ENV !== "production" && Ae(l) && (b.getters[f] = a ? (
        // @ts-expect-error
        t.getters[f]
      ) : l, _e && (I._getters || // @ts-expect-error: same
      (I._getters = F([]))).push(f));
  }
  if (L(d, I), L(he(d), I), Object.defineProperty(d, "$state", {
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
    }), c = !1, h = !1, n.state.value[e] = be(f._hmrPayload, "hotState"), h = !0, Ce().then(() => {
      c = !0;
    });
    for (const l in f._hmrPayload.actions) {
      const y = f[l];
      le(d, l, ce(l, y));
    }
    for (const l in f._hmrPayload.getters) {
      const y = f._hmrPayload.getters[l], Q = a ? (
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
      const l = r.run(() => f({
        store: d,
        app: n._a,
        pinia: n,
        options: i
      }));
      Object.keys(l || {}).forEach((y) => d._customProperties.add(y)), L(d, l);
    } else
      L(d, r.run(() => f({
        store: d,
        app: n._a,
        pinia: n,
        options: i
      })));
  }), process.env.NODE_ENV !== "production" && d.$state && typeof d.$state == "object" && typeof d.$state.constructor == "function" && !d.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${d.$id}".`), x && a && t.hydrate && t.hydrate(d.$state, x), c = !0, h = !0, d;
}
function Zt(e, o, t) {
  let n, s;
  const a = typeof o == "function";
  n = e, s = a ? t : o;
  function r(i, u) {
    const c = ht();
    if (i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && oe && oe._testing ? null : i) || (c ? Re(Ke, null) : null), i && re(i), process.env.NODE_ENV !== "production" && !oe)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    i = oe, i._s.has(n) || (a ? ke(n, o, s, i) : je(n, s, i), process.env.NODE_ENV !== "production" && (r._pinia = i));
    const h = i._s.get(n);
    if (process.env.NODE_ENV !== "production" && u) {
      const _ = "__hot:" + n, v = a ? ke(_, o, s, i, !0) : je(_, L({}, s), i, !0);
      u._hotUpdate(v), delete i.state.value[_], i._s.delete(_);
    }
    if (process.env.NODE_ENV !== "production" && _e) {
      const _ = _t();
      if (_ && _.proxy && // avoid adding stores that are just built for hot module replacement
      !u) {
        const v = _.proxy, k = "_pStores" in v ? v._pStores : v._pStores = {};
        k[n] = h;
      }
    }
    return h;
  }
  return r.$id = n, r;
}
const en = ["id", "checked"], tn = ["for", "innerHTML"], nn = /* @__PURE__ */ N({
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
    return (s, a) => (m(), g(D, null, [
      (m(), g("input", {
        id: "option-" + s.optionKey,
        key: s.optionKey,
        "test-id": "radio_options",
        type: "radio",
        name: "options",
        checked: s.checked,
        class: z(s.submitted && "ignore-hover"),
        onClick: [
          a[0] || (a[0] = (r) => n()),
          a[1] || (a[1] = yt(() => {
          }, ["stop"]))
        ]
      }, null, 10, en)),
      (m(), g("label", {
        key: s.optionKey,
        for: "option-" + s.optionKey,
        class: z(s.submitted ? "mcq-option-label ignore-hover" : "mcq-option-label"),
        onClick: a[2] || (a[2] = (r) => n()),
        innerHTML: s.option.optionValue
      }, null, 10, tn))
    ], 64));
  }
}), P = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [n, s] of o)
    t[n] = s;
  return t;
}, on = /* @__PURE__ */ P(nn, [["__scopeId", "data-v-e5ddf38c"]]), sn = ["disabled"], rn = /* @__PURE__ */ N({
  __name: "MCQButton",
  props: {
    submitted: { type: Boolean },
    selectedOption: {},
    hideSkip: { type: Boolean }
  },
  emits: ["submitAnswer", "nextQuestion", "skipQuestion"],
  setup(e, { emit: o }) {
    const t = w("skip"), n = w("Skip"), s = o, a = (u, c) => {
      !u && c ? r("next", "Next", "submitAnswer") : u && c ? r("skip", "Skip", "nextQuestion") : !u && !c && r("skip", "Skip", "skipQuestion");
    }, r = (u, c, h) => {
      t.value = u, n.value = c, s(h);
    }, i = (u, c) => u && c ? { class: "next", text: "Next" } : !u && c ? { class: "submit", text: "Submit" } : { class: t.value, text: n.value };
    return (u, c) => (m(), g("div", null, [
      p("button", {
        disabled: u.hideSkip && i(u.submitted, u.selectedOption).class === "skip",
        class: z(["mcq-button", i(u.submitted, u.selectedOption).class]),
        onClick: c[0] || (c[0] = (h) => a(u.submitted, u.selectedOption))
      }, $(i(u.submitted, u.selectedOption).text), 11, sn)
    ]));
  }
}), an = /* @__PURE__ */ P(rn, [["__scopeId", "data-v-847b8dd5"]]), un = /* @__PURE__ */ N({
  __name: "NextButton",
  props: {
    buttonName: {}
  },
  emits: ["nextQuestion", "prevQuestion"],
  setup(e, { emit: o }) {
    const { buttonName: t } = e, n = o, s = () => {
      a(t !== "←" ? "nextQuestion" : "prevQuestion");
    }, a = (r) => {
      n(r);
    };
    return (r, i) => (m(), g("div", null, [
      p("button", {
        class: z(r.buttonName === "Submit" ? "submit_btn" : "mcq-button"),
        onClick: i[0] || (i[0] = (u) => s())
      }, $(r.buttonName), 3)
    ]));
  }
}), De = /* @__PURE__ */ P(un, [["__scopeId", "data-v-8be7f61e"]]);
Array.from(
  { length: 10 },
  (e, o) => `VETS20${o + 10}`
);
const cn = (e) => e.reduce((o, t) => {
  if (!t.includes(":"))
    return o;
  const [n, s] = t.split(":");
  return o[n] = s.trim(), o;
}, {}), ln = (e) => e.map((o) => ({
  _id: { $oid: o._id.$oid },
  statement: o.statement,
  tags: cn(o.tags),
  optionsList: o.optionsList,
  link: o.link
})), dn = { convertQuestions: ln }, ut = () => {
  const e = Re("dataLink");
  return dn.convertQuestions(e);
};
function Ne() {
  return ut();
}
const fn = (e) => {
  for (let o = e.length - 1; o > 0; o--) {
    const t = Math.floor(Math.random() * (o + 1));
    [e[o], e[t]] = [e[t], e[o]];
  }
  return e;
}, pn = (e, o) => fn(o).slice(0, e);
function ct(e) {
  const o = e.reduce(
    (n, s) => (Object.keys(s).forEach((a) => {
      n[a] || (n[a] = /* @__PURE__ */ new Set()), n[a].add(s[a]);
    }), n),
    {}
  ), t = Object.keys(o).reduce(
    (n, s) => (n[s] = [...o[s]], n),
    {}
  );
  return console.log("result", t), t;
}
function Ie(e, o) {
  return e.filter((t) => Object.keys(o).every((n) => !o[n].length || o[n].includes(t.tags[n])));
}
function mn(e, o, t) {
  const n = e[o].question.optionsList;
  for (let s = 0; s < n.length; s++)
    if (n[s].optionValue === t)
      return s;
}
const lt = (e, o) => o.findIndex((t) => {
  var n;
  return ((n = t.question._id) == null ? void 0 : n.$oid) === e;
}), U = Zt("questionsQueue", {
  state: () => ({
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
      const e = Ne();
      return Ie(e, this.selectedTags).length;
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
      const n = lt(e, this.quizStats);
      if (this.quizStats[n]) {
        if (t !== void 0) {
          if (this.quizStats[n][o]++, t === "-1") {
            this.quizStats[n].selectedValue = "Reached Time Limit";
            return;
          }
          const s = this.quizStats[n].question.optionsList.map((a) => a.optionCorrect).indexOf(!0);
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
}), hn = ["innerHTML"], _n = { class: "mcq-list" }, gn = ["onClick"], vn = { class: "next-prev-question" }, bn = /* @__PURE__ */ N({
  __name: "MCQQuestion",
  props: {
    _id: {},
    statement: {},
    optionsList: {}
  },
  emits: ["nextQuestion", "skipQuestion", "prevQuestion"],
  setup(e, { emit: o }) {
    const t = U(), { statement: n, optionsList: s, _id: a } = e, r = w(null), i = w(!1), u = o, c = w(t.getRemainingQuestions()), h = () => {
      i.value = !0;
    }, _ = () => {
      r.value = null, u("nextQuestion");
    }, v = (b) => {
      J(b), c.value = t.getRemainingQuestions(), u("nextQuestion");
    }, k = () => {
      J(a), u("skipQuestion");
    }, x = (b) => t.incrementStat(
      b.$oid,
      "attempts",
      r.value ?? void 0
    ), J = (b) => {
      x(b), i.value = !1, r.value = null;
    }, ue = () => {
      u("prevQuestion");
    }, ee = (b, S) => {
      i.value || (r.value = r.value === S ? null : S), x(b);
    }, ge = (b, S, d) => t.quizMode === "Timed" ? ve(b, S) : ce(S, d);
    function ve(b, S) {
      const d = lt(b.$oid, t.quizStats), H = t.quizStats[d].selectedValue, I = mn(
        t.quizStats,
        d,
        H
      );
      return String(I) === S ? "selected" : "";
    }
    function ce(b, S) {
      const d = S[parseInt(b)], H = r.value === b;
      return i.value ? d.optionCorrect ? "correct ignore-hover" : H ? "wrong ignore-hover" : "ignore-hover" : H ? "selected" : "";
    }
    return (b, S) => (m(), g(D, null, [
      p("div", {
        class: "mcq-statement",
        innerHTML: b.statement
      }, null, 8, hn),
      p("div", _n, [
        (m(!0), g(D, null, X(Object.entries(b.optionsList), ([d, H]) => (m(), g("div", {
          key: d,
          class: z(["mcq-option", ge(b._id, d, b.optionsList)]),
          onClick: (I) => ee(b._id, d)
        }, [
          Z(on, {
            "option-key": d,
            checked: r.value === d,
            option: H,
            submitted: i.value,
            onSelectOption: (I) => ee(b._id, d)
          }, null, 8, ["option-key", "checked", "option", "submitted", "onSelectOption"])
        ], 10, gn))), 128))
      ]),
      T(t).quizMode === "Tutor" ? (m(), V(an, {
        key: 0,
        submitted: i.value,
        "selected-option": r.value,
        "hide-skip": c.value <= 1,
        onSubmitAnswer: h,
        onNextQuestion: S[0] || (S[0] = (d) => v(b._id)),
        onSkipQuestion: k
      }, null, 8, ["submitted", "selected-option", "hide-skip"])) : q("", !0),
      p("div", vn, [
        T(t).quizMode === "Timed" ? (m(), V(De, {
          key: 0,
          "button-name": T(t).questionsQueue.length >= 1 ? "→" : "Submit",
          onNextQuestion: S[1] || (S[1] = (d) => _())
        }, null, 8, ["button-name"])) : q("", !0),
        T(t).quizMode === "Timed" && T(t).questionsStack.length > 1 ? (m(), V(De, {
          key: 1,
          "button-name": "←",
          onPrevQuestion: S[2] || (S[2] = (d) => ue())
        })) : q("", !0)
      ])
    ], 64));
  }
}), dt = /* @__PURE__ */ P(bn, [["__scopeId", "data-v-6e8339a0"]]), yn = (e) => (Be("data-v-4ffecbcd"), e = e(), Fe(), e), Sn = { class: "report-container" }, Tn = { class: "mcq-report" }, wn = { class: "table-container" }, kn = /* @__PURE__ */ yn(() => /* @__PURE__ */ p("thead", null, [
  /* @__PURE__ */ p("tr", null, [
    /* @__PURE__ */ p("th", null, "question"),
    /* @__PURE__ */ p("th", null, "correct option"),
    /* @__PURE__ */ p("th", null, "your answer")
  ])
], -1)), En = { class: "question-row" }, On = ["href", "innerHTML"], $n = { class: "answer-row" }, Qn = ["innerHTML"], qn = { class: "answer-row" }, Nn = ["innerHTML"], In = { class: "mcq-result" }, Cn = { class: "score" }, Ln = /* @__PURE__ */ N({
  __name: "MCQStatus",
  setup(e) {
    const o = U(), t = o.quizStats, n = o.quizStats.length, s = t.filter((r) => r.correct === 1).length, a = (s * 100 / n).toFixed(0);
    return (r, i) => (m(), g("div", Sn, [
      p("div", Tn, [
        p("div", wn, [
          p("table", null, [
            kn,
            p("tbody", null, [
              (m(!0), g(D, null, X(Object.entries(T(t)), ([u, c]) => (m(), g("tr", {
                key: u,
                class: "quiz-statment"
              }, [
                p("td", En, [
                  p("a", {
                    href: c.question.link,
                    target: "_blank",
                    innerHTML: c.question.statement
                  }, null, 8, On)
                ]),
                p("td", $n, [
                  (m(!0), g(D, null, X(Object.entries(
                    c.question.optionsList
                  ), ([h, _]) => (m(), g("span", { key: h }, [
                    _.optionCorrect ? (m(), g("span", {
                      key: 0,
                      innerHTML: _.optionValue
                    }, null, 8, Qn)) : q("", !0)
                  ]))), 128))
                ]),
                p("td", qn, [
                  p("span", {
                    class: z(
                      c.correct === 1 ? "correct-answer" : "wrong-answer"
                    ),
                    innerHTML: c.correct === 1 ? "<span> ✔</span> " : "<span> ✘</span> <span>     </span>" + c.selectedValue
                  }, null, 10, Nn)
                ])
              ]))), 128))
            ])
          ])
        ])
      ]),
      p("div", null, [
        p("div", In, [
          p("span", Cn, "⌛ Result: " + $(T(s)) + " out of " + $(T(n)) + " - (" + $(T(a)) + " %)", 1)
        ])
      ])
    ]));
  }
}), ft = /* @__PURE__ */ P(Ln, [["__scopeId", "data-v-4ffecbcd"]]), Pn = /* @__PURE__ */ N({
  __name: "MCQQuiz",
  setup(e) {
    const o = w(), t = U();
    $e(() => {
      s();
    });
    const n = () => {
      t.enqueueQuestion(o.value), s();
    }, s = () => {
      o.value = t.dequeueQuestion();
    }, a = () => window.location.reload();
    return (r, i) => {
      const u = St("MCQInfoPanel");
      return m(), g("main", null, [
        Z(u),
        o.value ? (m(), V(dt, {
          key: 0,
          statement: o.value.statement,
          "options-list": o.value.optionsList,
          _id: o.value._id,
          onNextQuestion: s,
          onSkipQuestion: n
        }, null, 8, ["statement", "options-list", "_id"])) : q("", !0),
        o.value ? q("", !0) : (m(), V(ft, { key: 1 })),
        o.value ? q("", !0) : (m(), g("button", {
          key: 2,
          class: "btn-relocate",
          onClick: a
        }, " End "))
      ]);
    };
  }
}), xn = /* @__PURE__ */ P(Pn, [["__scopeId", "data-v-937e1a1b"]]), Mn = {
  key: 0,
  class: "time-left-header"
}, Vn = { class: "questions-left-header" }, An = /* @__PURE__ */ N({
  __name: "MCQInfoPanel",
  props: {
    timeLeft: {
      type: Number,
      default: 0
    }
  },
  setup(e) {
    const o = U(), t = (n) => {
      const s = Math.floor(n / 60), a = n % 60;
      return `${s}:${a < 10 ? "0" : ""}${a}`;
    };
    return (n, s) => (m(), g(D, null, [
      e.timeLeft ? (m(), g("h3", Mn, " Time left: " + $(t(e.timeLeft)), 1)) : q("", !0),
      p("h3", Vn, " Question " + $(T(o).questionsStack.length) + " out of " + $(T(o).questionsQueue.length + T(o).questionsStack.length), 1)
    ], 64));
  }
}), ze = 1e3, jn = "-1", Dn = /* @__PURE__ */ N({
  __name: "MCQTimedQuiz",
  setup(e) {
    const o = U(), t = w();
    let n = null, s = null;
    const a = w(o.timeLimit);
    $e(() => {
      i();
    }), Tt(() => {
      c(), h();
    });
    const r = () => {
      t.value = o.removeFromLastHistory() ?? t.value;
    }, i = () => t.value = o.dequeueQuestion(), u = () => window.location.reload(), c = () => {
      n && clearTimeout(n), s && clearInterval(s);
    }, h = () => {
      a.value = o.timeLimit;
      const v = () => t.value ? a.value ? a.value-- : _() : c();
      s = window.setInterval(v, ze), n = window.setTimeout(() => {
      }, o.timeLimit * ze);
    }, _ = () => {
      var k;
      c();
      const v = (x) => o.incrementStat(x, "attempts", jn);
      for (v(((k = t.value) == null ? void 0 : k._id.$oid) ?? ""); t.value = o.dequeueQuestion(); )
        v(t.value._id.$oid);
      return alert("Time's up! Quiz has ended."), i();
    };
    return (v, k) => (m(), g("main", null, [
      Z(An, { "time-left": a.value }, null, 8, ["time-left"]),
      t.value ? (m(), V(dt, {
        key: 0,
        statement: t.value.statement,
        "options-list": t.value.optionsList,
        _id: t.value._id,
        onNextQuestion: i,
        onPrevQuestion: r
      }, null, 8, ["statement", "options-list", "_id"])) : q("", !0),
      t.value ? q("", !0) : (m(), V(ft, { key: 1 })),
      t.value ? q("", !0) : (m(), g("button", {
        key: 2,
        class: "btn-relocate",
        onClick: u
      }, " End "))
    ]));
  }
}), zn = /* @__PURE__ */ P(Dn, [["__scopeId", "data-v-cffdfe07"]]), Un = ["id", "name", "value", "disabled"], Rn = ["for"], Hn = {
  key: 0,
  class: "question-number"
}, Bn = /* @__PURE__ */ N({
  __name: "FilterCheckbox",
  props: {
    category: {},
    topics: {}
  },
  setup(e) {
    const { category: o, topics: t } = e, n = U(), s = Oe(
      () => Object.entries(t).map(([i, u]) => {
        const c = r(u, o);
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
      const h = JSON.parse(
        JSON.stringify(n.getselectedtags())
      );
      h[u].includes(i) || h[u].push(i);
      const _ = Ne();
      return Ie(
        _,
        h
      ).length.toString();
    };
    return (i, u) => (m(), g("ul", null, [
      (m(!0), g(D, null, X(s.value, ({ idx: c, num: h, topic: _ }) => (m(), g("li", {
        key: c,
        class: z(["filter-options", { "grey-out": h === "0" }])
      }, [
        p("input", {
          id: `${i.category}-${_}-checkbox`,
          type: "checkbox",
          name: i.category,
          value: _,
          disabled: h === "0",
          onChange: u[0] || (u[0] = (v) => a(v))
        }, null, 40, Un),
        p("label", {
          for: `${i.category}-${_}-checkbox`
        }, [
          Ge($(_) + " ", 1),
          h !== null && h !== "0" ? (m(), g("span", Hn, $(h), 1)) : q("", !0)
        ], 8, Rn)
      ], 2))), 128))
    ]));
  }
}), Fn = /* @__PURE__ */ P(Bn, [["__scopeId", "data-v-258e254f"]]), Gn = { class: "filter" }, Jn = { class: "category-heading" }, Wn = /* @__PURE__ */ N({
  __name: "MCQTagOptions",
  setup(e) {
    const t = Ne().map((s) => s.tags), n = ct(t);
    return (s, a) => (m(), g("div", Gn, [
      (m(!0), g(D, null, X(Object.entries(T(n)), ([r, i]) => (m(), g("div", {
        key: r,
        class: "category"
      }, [
        p("h2", Jn, $(r), 1),
        Z(Fn, {
          category: r,
          topics: i
        }, null, 8, ["category", "topics"])
      ]))), 128))
    ]));
  }
}), Yn = /* @__PURE__ */ P(Wn, [["__scopeId", "data-v-6ff4ea70"]]), Kn = { for: "optionName" }, Xn = ["value"], Zn = /* @__PURE__ */ N({
  __name: "DropDownbox",
  props: {
    options: {},
    optionName: {},
    disabled: { type: Boolean }
  },
  setup(e) {
    const o = U(), t = w(0);
    function n(s) {
      const a = s.target;
      a.value && (t.value = parseFloat(a.value) * 60, o.setTimeLimit(t.value));
    }
    return (s, a) => (m(), g("div", {
      class: z(s.disabled ? "dropdown input-disabled" : "dropdown")
    }, [
      p("label", Kn, $(s.optionName) + ":   ", 1),
      p("select", {
        id: "optionName",
        name: "optionName",
        onChange: n
      }, [
        (m(!0), g(D, null, X(s.options, (r) => (m(), g("option", {
          key: r.value,
          value: r.value
        }, $(r.value) + " " + $(r.unit), 9, Xn))), 128))
      ], 32)
    ], 2));
  }
}), eo = /* @__PURE__ */ P(Zn, [["__scopeId", "data-v-5f3ae97a"]]), ae = (e) => (Be("data-v-30ab292c"), e = e(), Fe(), e), to = { class: "start-page-container" }, no = /* @__PURE__ */ ae(() => /* @__PURE__ */ p("h1", null, "VetCloud Smart Quiz", -1)), oo = { class: "quiz-config-container" }, so = { class: "question-config-container" }, io = { class: "tag-text" }, ro = { class: "question-number" }, ao = { class: "question-amount-container" }, uo = /* @__PURE__ */ ae(() => /* @__PURE__ */ p("label", { for: "question-amount" }, "Select the amount of questions:", -1)), co = ["max"], lo = {
  key: 0,
  class: "show-max-msg"
}, fo = /* @__PURE__ */ ae(() => /* @__PURE__ */ p("label", { for: "mode-select" }, "Select mode:", -1)), po = /* @__PURE__ */ ae(() => /* @__PURE__ */ p("option", { value: "Tutor" }, "Tutor", -1)), mo = /* @__PURE__ */ ae(() => /* @__PURE__ */ p("option", { value: "Timed" }, "Timed", -1)), ho = [
  po,
  mo
], _o = 3e3, go = /* @__PURE__ */ N({
  __name: "StartPage",
  emits: ["start-quiz"],
  setup(e, { emit: o }) {
    const t = w(1), n = w("Tutor"), s = w(!1), a = w(null), r = o, i = U(), u = () => {
      r("start-quiz", {
        questionAmount: t.value,
        mode: n.value
      });
    }, c = () => {
      a.value && clearTimeout(a.value), t.value > i.getquestionnumber() && (t.value = i.getquestionnumber(), s.value = !0, a.value = window.setTimeout(() => {
        s.value = !1;
      }, _o));
    };
    return (h, _) => (m(), g("div", to, [
      no,
      Z(Yn),
      p("div", oo, [
        p("div", so, [
          p("p", io, [
            Ge(" Maximum possible questions: "),
            p("span", ro, $(T(i).getquestionnumber()), 1)
          ]),
          p("div", ao, [
            uo,
            Pe(p("input", {
              id: "question-amount",
              "onUpdate:modelValue": _[0] || (_[0] = (v) => t.value = v),
              type: "number",
              placeholder: "Question amount",
              min: "1",
              max: T(i).getquestionnumber(),
              onInput: c
            }, null, 40, co), [
              [
                wt,
                t.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          s.value ? (m(), g("p", lo, " Cannot select more than " + $(T(i).getquestionnumber()) + " questions. ", 1)) : q("", !0),
          p("div", null, [
            fo,
            Pe(p("select", {
              id: "mode-select",
              "onUpdate:modelValue": _[1] || (_[1] = (v) => n.value = v)
            }, ho, 512), [
              [kt, n.value]
            ])
          ]),
          Z(eo, {
            options: [
              { value: 1, label: "Time Option 2", unit: "Min." },
              { value: 1.5, label: "Time Option 1", unit: "Min." }
            ],
            "option-name": "Time per Question",
            class: z(n.value === "Timed" ? "" : "input-disabled"),
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
}), vo = /* @__PURE__ */ P(go, [["__scopeId", "data-v-30ab292c"]]), bo = /* @__PURE__ */ N({
  __name: "CrucibleComponent",
  setup(e) {
    const o = w(0), t = U(), n = w(!1), s = w([]);
    $e(async () => {
      s.value = ut();
      const r = ct(
        s.value.map((i) => i.tags)
      );
      t.setselectedTags(
        Object.keys(r).reduce((i, u) => ({ ...i, [u]: [] }), {})
      );
    });
    const a = ({ questionAmount: r, mode: i }) => {
      const u = t.getselectedtags();
      if (!s.value.length)
        return alert("Trouble fetching questions, please try again later");
      const c = Ie(
        s.value,
        u
      ), h = pn(r, c);
      o.value = h.length, t.initialiseQuiz(h, i), i === "Timed" && t.setTimeLimit(r * t.timeLimit), n.value = !0;
    };
    return (r, i) => n.value && T(t).quizMode === "Tutor" ? (m(), V(xn, { key: 0 })) : n.value && T(t).quizMode === "Timed" ? (m(), V(zn, { key: 1 })) : (m(), V(vo, {
      key: 2,
      onStartQuiz: a
    }));
  }
}), yo = /* @__PURE__ */ P(bo, [["__scopeId", "data-v-99fe8c45"]]), So = "http://localhost:8080/api/resource/getQuiz";
function wo(e, o = {}) {
  const t = Wt();
  e.use(t), e.component("CrucibleComponent", yo), e.provide("dataLink", o.dataLink || So), console.log(o.dataLink);
}
export {
  yo as CrucibleComponent,
  wo as createViewerPlugin
};
