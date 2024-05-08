import { effectScope as Ue, ref as w, markRaw as F, hasInjectionContext as ht, inject as Re, getCurrentInstance as mt, toRaw as me, watch as He, reactive as _t, isRef as ie, isReactive as Oe, toRef as ye, nextTick as Ie, computed as $e, unref as T, getCurrentScope as gt, onScopeDispose as vt, toRefs as Pe, defineComponent as C, openBlock as h, createElementBlock as g, Fragment as D, normalizeClass as z, withModifiers as bt, createElementVNode as p, toDisplayString as $, renderList as X, createVNode as Z, createBlock as M, createCommentVNode as q, pushScopeId as Be, popScopeId as Fe, onMounted as Qe, resolveComponent as yt, onBeforeMount as St, createTextVNode as Ge, withDirectives as Le, vModelText as Tt, vModelSelect as wt } from "vue";
var Je = !1;
function le(e, o, t) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, o), e.splice(o, 1, t), t) : (e[o] = t, t);
}
function Se(e, o) {
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
const kt = typeof Proxy == "function", Ot = "devtools-plugin:setup", $t = "plugin:settings:set";
let W, Te;
function Qt() {
  var e;
  return W !== void 0 || (typeof window < "u" && window.performance ? (W = !0, Te = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (W = !0, Te = globalThis.perf_hooks.performance) : W = !1), W;
}
function qt() {
  return Qt() ? Te.now() : Date.now();
}
class Ct {
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
        return qt();
      }
    }, t && t.on($t, (r, i) => {
      r === this.plugin.id && this.fallbacks.setSettings(i);
    }), this.proxiedOn = new Proxy({}, {
      get: (r, i) => this.target ? this.target.on[i] : (...c) => {
        this.onQueue.push({
          method: i,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (r, i) => this.target ? this.target[i] : i === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(i) ? (...c) => (this.targetQueue.push({
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
  const t = e, n = We(), s = Et(), a = kt && t.enableEarlyProxy;
  if (s && (n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a))
    s.emit(Ot, e, o);
  else {
    const r = a ? new Ct(t, s) : null;
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
const _e = typeof window < "u", se = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && _e, Ve = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function Nt(e, { autoBom: o = !1 } = {}) {
  return o && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function qe(e, o, t) {
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
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Ze ? It : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in fe ? Pt : (
      // Fallback to using FileReader and a popup
      Lt
    )
  )
) : () => {
};
function It(e, o = "download", t) {
  const n = document.createElement("a");
  n.download = o, n.rel = "noopener", typeof e == "string" ? (n.href = e, n.origin !== location.origin ? Xe(n.href) ? qe(e, o, t) : (n.target = "_blank", de(n)) : de(n)) : (n.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(n.href);
  }, 4e4), setTimeout(function() {
    de(n);
  }, 0));
}
function Pt(e, o = "download", t) {
  if (typeof e == "string")
    if (Xe(e))
      qe(e, o, t);
    else {
      const n = document.createElement("a");
      n.href = e, n.target = "_blank", setTimeout(function() {
        de(n);
      });
    }
  else
    navigator.msSaveOrOpenBlob(Nt(e, t), o);
}
function Lt(e, o, t, n) {
  if (n = n || open("", "_blank"), n && (n.document.title = n.document.body.innerText = "downloading..."), typeof e == "string")
    return qe(e, o, t);
  const s = e.type === "application/octet-stream", a = /constructor/i.test(String(Ve.HTMLElement)) || "safari" in Ve, r = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((r || s && a || Ze) && typeof FileReader < "u") {
    const i = new FileReader();
    i.onloadend = function() {
      let c = i.result;
      if (typeof c != "string")
        throw n = null, new Error("Wrong reader.result type");
      c = r ? c : c.replace(/^data:[^;]*;/, "data:attachment/file;"), n ? n.location.href = c : location.assign(c), n = null;
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
function Ce(e) {
  return "_a" in e && "install" in e;
}
function tt() {
  if (!("clipboard" in navigator))
    return k("Your browser doesn't support the Clipboard API", "error"), !0;
}
function nt(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (k('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Vt(e) {
  if (!tt())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), k("Global state copied to clipboard.");
    } catch (o) {
      if (nt(o))
        return;
      k("Failed to serialize the state. Check the console for more details.", "error"), console.error(o);
    }
}
async function xt(e) {
  if (!tt())
    try {
      ot(e, JSON.parse(await navigator.clipboard.readText())), k("Global state pasted from clipboard.");
    } catch (o) {
      if (nt(o))
        return;
      k("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(o);
    }
}
async function Mt(e) {
  try {
    et(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (o) {
    k("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(o);
  }
}
let j;
function At() {
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
async function jt(e) {
  try {
    const t = await At()();
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
const st = "🍍 Pinia (root)", we = "_root";
function Dt(e) {
  return Ce(e) ? {
    id: we,
    label: st
  } : {
    id: e.$id,
    label: e.$id
  };
}
function zt(e) {
  if (Ce(e)) {
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
          value: r._getters.reduce((i, c) => (i[c] = r[c], i), {})
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
function Ut(e) {
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
function Rt(e) {
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
const pe = [], B = "pinia:mutations", O = "pinia", { assign: Ht } = Object, he = (e) => "🍍 " + e;
function Bt(e, o) {
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
            Vt(o);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await xt(o), t.sendInspectorTree(O), t.sendInspectorState(O);
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
            await jt(o), t.sendInspectorTree(O), t.sendInspectorState(O);
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
      const a = n.componentInstance && n.componentInstance.proxy;
      if (a && a._pStores) {
        const r = n.componentInstance.proxy._pStores;
        Object.values(r).forEach((i) => {
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
              } catch (m) {
                c[u] = m;
              }
              return c;
            }, {})
          });
        });
      }
    }), t.on.getInspectorTree((n) => {
      if (n.app === e && n.inspectorId === O) {
        let s = [o];
        s = s.concat(Array.from(o._s.values())), n.rootNodes = (n.filter ? s.filter((a) => "$id" in a ? a.$id.toLowerCase().includes(n.filter.toLowerCase()) : st.toLowerCase().includes(n.filter.toLowerCase())) : s).map(Dt);
      }
    }), t.on.getInspectorState((n) => {
      if (n.app === e && n.inspectorId === O) {
        const s = n.nodeId === we ? o : o._s.get(n.nodeId);
        if (!s)
          return;
        s && (n.state = zt(s));
      }
    }), t.on.editInspectorState((n, s) => {
      if (n.app === e && n.inspectorId === O) {
        const a = n.nodeId === we ? o : o._s.get(n.nodeId);
        if (!a)
          return k(`store "${n.nodeId}" not found`, "error");
        const { path: r } = n;
        Ce(a) ? r.unshift("state") : (r.length !== 1 || !a._customProperties.has(r[0]) || r[0] in a.$state) && r.unshift("$state"), K = !1, n.set(a, r, n.state.value), K = !0;
      }
    }), t.on.editComponentState((n) => {
      if (n.type.startsWith("🍍")) {
        const s = n.type.replace(/^🍍\s*/, ""), a = o._s.get(s);
        if (!a)
          return k(`store "${s}" not found`, "error");
        const { path: r } = n;
        if (r[0] !== "state")
          return k(`Invalid path for store "${s}":
${r}
Only state can be modified.`);
        r[0] = "$state", K = !1, n.set(a, r, n.state.value), K = !0;
      }
    });
  });
}
function Ft(e, o) {
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
    o.$onAction(({ after: r, onError: i, name: c, args: u }) => {
      const m = it++;
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
          groupId: m
        }
      }), r((_) => {
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
              result: _
            },
            groupId: m
          }
        });
      }), i((_) => {
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
              error: _
            },
            groupId: m
          }
        });
      });
    }, !0), o._customProperties.forEach((r) => {
      He(() => T(o[r]), (i, c) => {
        t.notifyComponentUpdate(), t.sendInspectorState(O), K && t.addTimelineEvent({
          layerId: B,
          event: {
            time: n(),
            title: "Change",
            subtitle: r,
            data: {
              newValue: i,
              oldValue: c
            },
            groupId: R
          }
        });
      }, { deep: !0 });
    }), o.$subscribe(({ events: r, type: i }, c) => {
      if (t.notifyComponentUpdate(), t.sendInspectorState(O), !K)
        return;
      const u = {
        time: n(),
        title: Rt(i),
        data: Ht({ store: x(o.$id) }, Ut(r)),
        groupId: R
      };
      i === A.patchFunction ? u.subtitle = "⤵️" : i === A.patchObject ? u.subtitle = "🧩" : r && !Array.isArray(r) && (u.subtitle = r.type), r && (u.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: r
        }
      }), t.addTimelineEvent({
        layerId: B,
        event: u
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
            store: x(o.$id),
            info: x("HMR update")
          }
        }
      }), t.notifyComponentUpdate(), t.sendInspectorTree(O), t.sendInspectorState(O);
    });
    const { $dispose: a } = o;
    o.$dispose = () => {
      a(), t.notifyComponentUpdate(), t.sendInspectorTree(O), t.sendInspectorState(O), t.getSettings().logStoreChanges && k(`Disposed "${o.$id}" store 🗑`);
    }, t.notifyComponentUpdate(), t.sendInspectorTree(O), t.sendInspectorState(O), t.getSettings().logStoreChanges && k(`"${o.$id}" store installed 🆕`);
  });
}
let it = 0, R;
function xe(e, o, t) {
  const n = o.reduce((s, a) => (s[a] = me(e)[a], s), {});
  for (const s in n)
    e[s] = function() {
      const a = it, r = t ? new Proxy(e, {
        get(...c) {
          return R = a, Reflect.get(...c);
        },
        set(...c) {
          return R = a, Reflect.set(...c);
        }
      }) : e;
      R = a;
      const i = n[s].apply(r, arguments);
      return R = void 0, i;
    };
}
function Gt({ app: e, store: o, options: t }) {
  if (o.$id.startsWith("__hot:"))
    return;
  o._isOptionsAPI = !!t.state, xe(o, Object.keys(t.actions), o._isOptionsAPI);
  const n = o._hotUpdate;
  me(o)._hotUpdate = function(s) {
    n.apply(this, arguments), xe(o, Object.keys(s._hmrPayload.actions), !!o._isOptionsAPI);
  }, Ft(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    o
  );
}
function Jt() {
  const e = Ue(!0), o = e.run(() => w({}));
  let t = [], n = [];
  const s = F({
    install(a) {
      re(s), s._a = a, a.provide(Ke, s), a.config.globalProperties.$pinia = s, se && Bt(a, s), n.forEach((r) => t.push(r)), n = [];
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
  return se && typeof Proxy < "u" && s.use(Gt), s;
}
function rt(e, o) {
  for (const t in o) {
    const n = o[t];
    if (!(t in e))
      continue;
    const s = e[t];
    G(s) && G(n) && !ie(n) && !Oe(n) ? e[t] = rt(s, n) : e[t] = n;
  }
  return e;
}
const at = () => {
};
function Me(e, o, t, n = at) {
  e.push(o);
  const s = () => {
    const a = e.indexOf(o);
    a > -1 && (e.splice(a, 1), n());
  };
  return !t && gt() && vt(s), s;
}
function Y(e, ...o) {
  e.slice().forEach((t) => {
    t(...o);
  });
}
const Wt = (e) => e();
function Ee(e, o) {
  e instanceof Map && o instanceof Map && o.forEach((t, n) => e.set(n, t)), e instanceof Set && o instanceof Set && o.forEach(e.add, e);
  for (const t in o) {
    if (!o.hasOwnProperty(t))
      continue;
    const n = o[t], s = e[t];
    G(s) && G(n) && e.hasOwnProperty(t) && !ie(n) && !Oe(n) ? e[t] = Ee(s, n) : e[t] = n;
  }
  return e;
}
const Yt = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Kt(e) {
  return !G(e) || !e.hasOwnProperty(Yt);
}
const { assign: P } = Object;
function Ae(e) {
  return !!(ie(e) && e.effect);
}
function je(e, o, t, n) {
  const { state: s, actions: a, getters: r } = o, i = t.state.value[e];
  let c;
  function u() {
    !i && (process.env.NODE_ENV === "production" || !n) && (t.state.value[e] = s ? s() : {});
    const m = process.env.NODE_ENV !== "production" && n ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Pe(w(s ? s() : {}).value)
    ) : Pe(t.state.value[e]);
    return P(m, a, Object.keys(r || {}).reduce((_, v) => (process.env.NODE_ENV !== "production" && v in m && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${v}" in store "${e}".`), _[v] = F($e(() => {
      re(t);
      const E = t._s.get(e);
      return r[v].call(E, E);
    })), _), {}));
  }
  return c = ke(e, u, o, t, n, !0), c;
}
function ke(e, o, t = {}, n, s, a) {
  let r;
  const i = P({ actions: {} }, t);
  if (process.env.NODE_ENV !== "production" && !n._e.active)
    throw new Error("Pinia destroyed");
  const c = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Je && (c.onTrigger = (f) => {
    u ? E = f : u == !1 && !d._hotUpdating && (Array.isArray(E) ? E.push(f) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let u, m, _ = [], v = [], E;
  const V = n.state.value[e];
  !a && !V && (process.env.NODE_ENV === "production" || !s) && (n.state.value[e] = {});
  const J = w({});
  let ce;
  function ee(f) {
    let l;
    u = m = !1, process.env.NODE_ENV !== "production" && (E = []), typeof f == "function" ? (f(n.state.value[e]), l = {
      type: A.patchFunction,
      storeId: e,
      events: E
    }) : (Ee(n.state.value[e], f), l = {
      type: A.patchObject,
      payload: f,
      storeId: e,
      events: E
    });
    const y = ce = Symbol();
    Ie().then(() => {
      ce === y && (u = !0);
    }), m = !0, Y(_, l, n.state.value[e]);
  }
  const ve = a ? function() {
    const { state: l } = t, y = l ? l() : {};
    this.$patch((Q) => {
      P(Q, y);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : at
  );
  function be() {
    r.stop(), _ = [], v = [], n._s.delete(e);
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
    $onAction: Me.bind(null, v),
    $patch: ee,
    $reset: ve,
    $subscribe(f, l = {}) {
      const y = Me(_, f, l.detached, () => Q()), Q = r.run(() => He(() => n.state.value[e], (te) => {
        (l.flush === "sync" ? m : u) && f({
          storeId: e,
          type: A.direct,
          events: E
        }, te);
      }, P({}, c, l)));
      return y;
    },
    $dispose: be
  }, d = _t(process.env.NODE_ENV !== "production" || se ? P(
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
  const N = (n._a && n._a.runWithContext || Wt)(() => n._e.run(() => (r = Ue()).run(o)));
  for (const f in N) {
    const l = N[f];
    if (ie(l) && !Ae(l) || Oe(l))
      process.env.NODE_ENV !== "production" && s ? le(J.value, f, ye(N, f)) : a || (V && Kt(l) && (ie(l) ? l.value = V[f] : Ee(l, V[f])), n.state.value[e][f] = l), process.env.NODE_ENV !== "production" && b.state.push(f);
    else if (typeof l == "function") {
      const y = process.env.NODE_ENV !== "production" && s ? l : ue(f, l);
      N[f] = y, process.env.NODE_ENV !== "production" && (b.actions[f] = l), i.actions[f] = l;
    } else
      process.env.NODE_ENV !== "production" && Ae(l) && (b.getters[f] = a ? (
        // @ts-expect-error
        t.getters[f]
      ) : l, _e && (N._getters || // @ts-expect-error: same
      (N._getters = F([]))).push(f));
  }
  if (P(d, N), P(me(d), N), Object.defineProperty(d, "$state", {
    get: () => process.env.NODE_ENV !== "production" && s ? J.value : n.state.value[e],
    set: (f) => {
      if (process.env.NODE_ENV !== "production" && s)
        throw new Error("cannot set hotState");
      ee((l) => {
        P(l, f);
      });
    }
  }), process.env.NODE_ENV !== "production" && (d._hotUpdate = F((f) => {
    d._hotUpdating = !0, f._hmrPayload.state.forEach((l) => {
      if (l in d.$state) {
        const y = f.$state[l], Q = d.$state[l];
        typeof y == "object" && G(y) && G(Q) ? rt(y, Q) : f.$state[l] = Q;
      }
      le(d, l, ye(f.$state, l));
    }), Object.keys(d.$state).forEach((l) => {
      l in f.$state || Se(d, l);
    }), u = !1, m = !1, n.state.value[e] = ye(f._hmrPayload, "hotState"), m = !0, Ie().then(() => {
      u = !0;
    });
    for (const l in f._hmrPayload.actions) {
      const y = f[l];
      le(d, l, ue(l, y));
    }
    for (const l in f._hmrPayload.getters) {
      const y = f._hmrPayload.getters[l], Q = a ? (
        // special handling of options api
        $e(() => (re(n), y.call(d, d)))
      ) : y;
      le(d, l, Q);
    }
    Object.keys(d._hmrPayload.getters).forEach((l) => {
      l in f._hmrPayload.getters || Se(d, l);
    }), Object.keys(d._hmrPayload.actions).forEach((l) => {
      l in f._hmrPayload.actions || Se(d, l);
    }), d._hmrPayload = f._hmrPayload, d._getters = f._getters, d._hotUpdating = !1;
  })), se) {
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
    if (se) {
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
Found in store "${d.$id}".`), V && a && t.hydrate && t.hydrate(d.$state, V), u = !0, m = !0, d;
}
function Xt(e, o, t) {
  let n, s;
  const a = typeof o == "function";
  n = e, s = a ? t : o;
  function r(i, c) {
    const u = ht();
    if (i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && oe && oe._testing ? null : i) || (u ? Re(Ke, null) : null), i && re(i), process.env.NODE_ENV !== "production" && !oe)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    i = oe, i._s.has(n) || (a ? ke(n, o, s, i) : je(n, s, i), process.env.NODE_ENV !== "production" && (r._pinia = i));
    const m = i._s.get(n);
    if (process.env.NODE_ENV !== "production" && c) {
      const _ = "__hot:" + n, v = a ? ke(_, o, s, i, !0) : je(_, P({}, s), i, !0);
      c._hotUpdate(v), delete i.state.value[_], i._s.delete(_);
    }
    if (process.env.NODE_ENV !== "production" && _e) {
      const _ = mt();
      if (_ && _.proxy && // avoid adding stores that are just built for hot module replacement
      !c) {
        const v = _.proxy, E = "_pStores" in v ? v._pStores : v._pStores = {};
        E[n] = m;
      }
    }
    return m;
  }
  return r.$id = n, r;
}
const Zt = ["id", "checked"], en = ["for", "innerHTML"], tn = /* @__PURE__ */ C({
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
    return (s, a) => (h(), g(D, null, [
      (h(), g("input", {
        id: "option-" + s.optionKey,
        key: s.optionKey,
        "test-id": "radio_options",
        type: "radio",
        name: "options",
        checked: s.checked,
        class: z(s.submitted && "ignore-hover"),
        onClick: [
          a[0] || (a[0] = (r) => n()),
          a[1] || (a[1] = bt(() => {
          }, ["stop"]))
        ]
      }, null, 10, Zt)),
      (h(), g("label", {
        key: s.optionKey,
        for: "option-" + s.optionKey,
        class: z(s.submitted ? "mcq-option-label ignore-hover" : "mcq-option-label"),
        onClick: a[2] || (a[2] = (r) => n()),
        innerHTML: s.option.optionValue
      }, null, 10, en))
    ], 64));
  }
}), L = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [n, s] of o)
    t[n] = s;
  return t;
}, nn = /* @__PURE__ */ L(tn, [["__scopeId", "data-v-e5ddf38c"]]), on = ["disabled"], sn = /* @__PURE__ */ C({
  __name: "MCQButton",
  props: {
    submitted: { type: Boolean },
    selectedOption: {},
    hideSkip: { type: Boolean }
  },
  emits: ["submitAnswer", "nextQuestion", "skipQuestion"],
  setup(e, { emit: o }) {
    const t = w("skip"), n = w("Skip"), s = o, a = (c, u) => {
      !c && u ? r("next", "Next", "submitAnswer") : c && u ? r("skip", "Skip", "nextQuestion") : !c && !u && r("skip", "Skip", "skipQuestion");
    }, r = (c, u, m) => {
      t.value = c, n.value = u, s(m);
    }, i = (c, u) => c && u ? { class: "next", text: "Next" } : !c && u ? { class: "submit", text: "Submit" } : { class: t.value, text: n.value };
    return (c, u) => (h(), g("div", null, [
      p("button", {
        disabled: c.hideSkip && i(c.submitted, c.selectedOption).class === "skip",
        class: z(["mcq-button", i(c.submitted, c.selectedOption).class]),
        onClick: u[0] || (u[0] = (m) => a(c.submitted, c.selectedOption))
      }, $(i(c.submitted, c.selectedOption).text), 11, on)
    ]));
  }
}), rn = /* @__PURE__ */ L(sn, [["__scopeId", "data-v-847b8dd5"]]), an = /* @__PURE__ */ C({
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
    return (r, i) => (h(), g("div", null, [
      p("button", {
        class: z(r.buttonName === "Submit" ? "submit_btn" : "mcq-button"),
        onClick: i[0] || (i[0] = (c) => s())
      }, $(r.buttonName), 3)
    ]));
  }
}), De = /* @__PURE__ */ L(an, [["__scopeId", "data-v-8be7f61e"]]);
Array.from(
  { length: 10 },
  (e, o) => `VETS20${o + 10}`
);
const cn = (e) => e.reduce((o, t) => {
  if (!t.includes(":"))
    return o;
  const [n, s] = t.split(":");
  return o[n] = s.trim(), o;
}, {}), un = (e) => e.map((o) => ({
  _id: { $oid: o._id.$oid },
  statement: o.statement,
  tags: cn(o.tags),
  optionsList: o.optionsList,
  link: o.link
})), ln = { convertQuestions: un }, dn = [
  {
    tags: [
      "course: VETS2011",
      "subject: Physiology",
      "system: Nervous System"
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
      "subject: Physiology",
      "system: Nervous System"
    ],
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
    tags: [
      "course: VETS2012",
      "subject: Physiology",
      "animal: Horse"
    ],
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
], fn = () => {
  const e = Re("dataLink");
  return console.log("data from server", e), ln.convertQuestions(dn);
};
function ge() {
  return fn();
}
const pn = (e) => {
  for (let o = e.length - 1; o > 0; o--) {
    const t = Math.floor(Math.random() * (o + 1));
    [e[o], e[t]] = [e[t], e[o]];
  }
  return e;
}, hn = (e, o) => pn(o).slice(0, e);
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
function Ne(e, o) {
  return e.filter((t) => Object.keys(o).every((n) => !o[n].length || o[n].includes(t.tags[n])));
}
function mn(e, o, t) {
  const n = e[o].question.optionsList;
  for (let s = 0; s < n.length; s++)
    if (n[s].optionValue === t)
      return s;
}
const ut = (e, o) => o.findIndex((t) => {
  var n;
  return ((n = t.question._id) == null ? void 0 : n.$oid) === e;
}), U = Xt("questionsQueue", {
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
      const e = ge();
      return Ne(e, this.selectedTags).length;
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
}), _n = ["innerHTML"], gn = { class: "mcq-list" }, vn = ["onClick"], bn = { class: "next-prev-question" }, yn = /* @__PURE__ */ C({
  __name: "MCQQuestion",
  props: {
    _id: {},
    statement: {},
    optionsList: {}
  },
  emits: ["nextQuestion", "skipQuestion", "prevQuestion"],
  setup(e, { emit: o }) {
    const t = U(), { statement: n, optionsList: s, _id: a } = e, r = w(null), i = w(!1), c = o, u = w(t.getRemainingQuestions()), m = () => {
      i.value = !0;
    }, _ = () => {
      r.value = null, c("nextQuestion");
    }, v = (b) => {
      J(b), u.value = t.getRemainingQuestions(), c("nextQuestion");
    }, E = () => {
      J(a), c("skipQuestion");
    }, V = (b) => t.incrementStat(
      b.$oid,
      "attempts",
      r.value ?? void 0
    ), J = (b) => {
      V(b), i.value = !1, r.value = null;
    }, ce = () => {
      c("prevQuestion");
    }, ee = (b, S) => {
      i.value || (r.value = r.value === S ? null : S), V(b);
    }, ve = (b, S, d) => t.quizMode === "Timed" ? be(b, S) : ue(S, d);
    function be(b, S) {
      const d = ut(b.$oid, t.quizStats), H = t.quizStats[d].selectedValue, N = mn(
        t.quizStats,
        d,
        H
      );
      return String(N) === S ? "selected" : "";
    }
    function ue(b, S) {
      const d = S[parseInt(b)], H = r.value === b;
      return i.value ? d.optionCorrect ? "correct ignore-hover" : H ? "wrong ignore-hover" : "ignore-hover" : H ? "selected" : "";
    }
    return (b, S) => (h(), g(D, null, [
      p("div", {
        class: "mcq-statement",
        innerHTML: b.statement
      }, null, 8, _n),
      p("div", gn, [
        (h(!0), g(D, null, X(Object.entries(b.optionsList), ([d, H]) => (h(), g("div", {
          key: d,
          class: z(["mcq-option", ve(b._id, d, b.optionsList)]),
          onClick: (N) => ee(b._id, d)
        }, [
          Z(nn, {
            "option-key": d,
            checked: r.value === d,
            option: H,
            submitted: i.value,
            onSelectOption: (N) => ee(b._id, d)
          }, null, 8, ["option-key", "checked", "option", "submitted", "onSelectOption"])
        ], 10, vn))), 128))
      ]),
      T(t).quizMode === "Tutor" ? (h(), M(rn, {
        key: 0,
        submitted: i.value,
        "selected-option": r.value,
        "hide-skip": u.value <= 1,
        onSubmitAnswer: m,
        onNextQuestion: S[0] || (S[0] = (d) => v(b._id)),
        onSkipQuestion: E
      }, null, 8, ["submitted", "selected-option", "hide-skip"])) : q("", !0),
      p("div", bn, [
        T(t).quizMode === "Timed" ? (h(), M(De, {
          key: 0,
          "button-name": T(t).questionsQueue.length >= 1 ? "→" : "Submit",
          onNextQuestion: S[1] || (S[1] = (d) => _())
        }, null, 8, ["button-name"])) : q("", !0),
        T(t).quizMode === "Timed" && T(t).questionsStack.length > 1 ? (h(), M(De, {
          key: 1,
          "button-name": "←",
          onPrevQuestion: S[2] || (S[2] = (d) => ce())
        })) : q("", !0)
      ])
    ], 64));
  }
}), lt = /* @__PURE__ */ L(yn, [["__scopeId", "data-v-6e8339a0"]]), Sn = (e) => (Be("data-v-4ffecbcd"), e = e(), Fe(), e), Tn = { class: "report-container" }, wn = { class: "mcq-report" }, En = { class: "table-container" }, kn = /* @__PURE__ */ Sn(() => /* @__PURE__ */ p("thead", null, [
  /* @__PURE__ */ p("tr", null, [
    /* @__PURE__ */ p("th", null, "question"),
    /* @__PURE__ */ p("th", null, "correct option"),
    /* @__PURE__ */ p("th", null, "your answer")
  ])
], -1)), On = { class: "question-row" }, $n = ["href", "innerHTML"], Qn = { class: "answer-row" }, qn = ["innerHTML"], Cn = { class: "answer-row" }, Nn = ["innerHTML"], In = { class: "mcq-result" }, Pn = { class: "score" }, Ln = /* @__PURE__ */ C({
  __name: "MCQStatus",
  setup(e) {
    const o = U(), t = o.quizStats, n = o.quizStats.length, s = t.filter((r) => r.correct === 1).length, a = (s * 100 / n).toFixed(0);
    return (r, i) => (h(), g("div", Tn, [
      p("div", wn, [
        p("div", En, [
          p("table", null, [
            kn,
            p("tbody", null, [
              (h(!0), g(D, null, X(Object.entries(T(t)), ([c, u]) => (h(), g("tr", {
                key: c,
                class: "quiz-statment"
              }, [
                p("td", On, [
                  p("a", {
                    href: u.question.link,
                    target: "_blank",
                    innerHTML: u.question.statement
                  }, null, 8, $n)
                ]),
                p("td", Qn, [
                  (h(!0), g(D, null, X(Object.entries(
                    u.question.optionsList
                  ), ([m, _]) => (h(), g("span", { key: m }, [
                    _.optionCorrect ? (h(), g("span", {
                      key: 0,
                      innerHTML: _.optionValue
                    }, null, 8, qn)) : q("", !0)
                  ]))), 128))
                ]),
                p("td", Cn, [
                  p("span", {
                    class: z(
                      u.correct === 1 ? "correct-answer" : "wrong-answer"
                    ),
                    innerHTML: u.correct === 1 ? "<span> ✔</span> " : "<span> ✘</span> <span>     </span>" + u.selectedValue
                  }, null, 10, Nn)
                ])
              ]))), 128))
            ])
          ])
        ])
      ]),
      p("div", null, [
        p("div", In, [
          p("span", Pn, "⌛ Result: " + $(T(s)) + " out of " + $(T(n)) + " - (" + $(T(a)) + " %)", 1)
        ])
      ])
    ]));
  }
}), dt = /* @__PURE__ */ L(Ln, [["__scopeId", "data-v-4ffecbcd"]]), Vn = /* @__PURE__ */ C({
  __name: "MCQQuiz",
  setup(e) {
    const o = w(), t = U();
    Qe(() => {
      s();
    });
    const n = () => {
      t.enqueueQuestion(o.value), s();
    }, s = () => {
      o.value = t.dequeueQuestion();
    }, a = () => window.location.reload();
    return (r, i) => {
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
          onClick: a
        }, " End "))
      ]);
    };
  }
}), xn = /* @__PURE__ */ L(Vn, [["__scopeId", "data-v-937e1a1b"]]), Mn = {
  key: 0,
  class: "time-left-header"
}, An = { class: "questions-left-header" }, jn = /* @__PURE__ */ C({
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
    return (n, s) => (h(), g(D, null, [
      e.timeLeft ? (h(), g("h3", Mn, " Time left: " + $(t(e.timeLeft)), 1)) : q("", !0),
      p("h3", An, " Question " + $(T(o).questionsStack.length) + " out of " + $(T(o).questionsQueue.length + T(o).questionsStack.length), 1)
    ], 64));
  }
}), ze = 1e3, Dn = "-1", zn = /* @__PURE__ */ C({
  __name: "MCQTimedQuiz",
  setup(e) {
    const o = U(), t = w();
    let n = null, s = null;
    const a = w(o.timeLimit);
    Qe(() => {
      i();
    }), St(() => {
      u(), m();
    });
    const r = () => {
      t.value = o.removeFromLastHistory() ?? t.value;
    }, i = () => t.value = o.dequeueQuestion(), c = () => window.location.reload(), u = () => {
      n && clearTimeout(n), s && clearInterval(s);
    }, m = () => {
      a.value = o.timeLimit;
      const v = () => t.value ? a.value ? a.value-- : _() : u();
      s = window.setInterval(v, ze), n = window.setTimeout(() => {
      }, o.timeLimit * ze);
    }, _ = () => {
      var E;
      u();
      const v = (V) => o.incrementStat(V, "attempts", Dn);
      for (v(((E = t.value) == null ? void 0 : E._id.$oid) ?? ""); t.value = o.dequeueQuestion(); )
        v(t.value._id.$oid);
      return alert("Time's up! Quiz has ended."), i();
    };
    return (v, E) => (h(), g("main", null, [
      Z(jn, { "time-left": a.value }, null, 8, ["time-left"]),
      t.value ? (h(), M(lt, {
        key: 0,
        statement: t.value.statement,
        "options-list": t.value.optionsList,
        _id: t.value._id,
        onNextQuestion: i,
        onPrevQuestion: r
      }, null, 8, ["statement", "options-list", "_id"])) : q("", !0),
      t.value ? q("", !0) : (h(), M(dt, { key: 1 })),
      t.value ? q("", !0) : (h(), g("button", {
        key: 2,
        class: "btn-relocate",
        onClick: c
      }, " End "))
    ]));
  }
}), Un = /* @__PURE__ */ L(zn, [["__scopeId", "data-v-cffdfe07"]]), Rn = ["id", "name", "value", "disabled"], Hn = ["for"], Bn = {
  key: 0,
  class: "question-number"
}, Fn = /* @__PURE__ */ C({
  __name: "FilterCheckbox",
  props: {
    category: {},
    topics: {}
  },
  setup(e) {
    const { category: o, topics: t } = e, n = U(), s = $e(
      () => Object.entries(t).map(([i, c]) => {
        const u = r(c, o);
        return { idx: i, topic: c, num: u };
      }).filter(({ topic: i }) => i !== void 0)
    ), a = (i) => {
      if (!(i.target instanceof HTMLInputElement))
        return console.error("Trying to click on non-input element");
      const c = i.target.name, u = i.target.value;
      n.modifySelectedTags(i.target.checked, { category: c, topic: u });
    }, r = (i, c) => {
      var v;
      const u = n.getselectedtags();
      if (!u[c] || (v = u[c]) != null && v.includes(
        i
      ))
        return null;
      const m = JSON.parse(
        JSON.stringify(n.getselectedtags())
      );
      m[c].includes(i) || m[c].push(i);
      const _ = ge();
      return Ne(
        _,
        m
      ).length.toString();
    };
    return (i, c) => (h(), g("ul", null, [
      (h(!0), g(D, null, X(s.value, ({ idx: u, num: m, topic: _ }) => (h(), g("li", {
        key: u,
        class: z(["filter-options", { "grey-out": m === "0" }])
      }, [
        p("input", {
          id: `${i.category}-${_}-checkbox`,
          type: "checkbox",
          name: i.category,
          value: _,
          disabled: m === "0",
          onChange: c[0] || (c[0] = (v) => a(v))
        }, null, 40, Rn),
        p("label", {
          for: `${i.category}-${_}-checkbox`
        }, [
          Ge($(_) + " ", 1),
          m !== null && m !== "0" ? (h(), g("span", Bn, $(m), 1)) : q("", !0)
        ], 8, Hn)
      ], 2))), 128))
    ]));
  }
}), Gn = /* @__PURE__ */ L(Fn, [["__scopeId", "data-v-258e254f"]]), Jn = { class: "filter" }, Wn = { class: "category-heading" }, Yn = /* @__PURE__ */ C({
  __name: "MCQTagOptions",
  setup(e) {
    const t = ge().map((s) => s.tags), n = ct(t);
    return (s, a) => (h(), g("div", Jn, [
      (h(!0), g(D, null, X(Object.entries(T(n)), ([r, i]) => (h(), g("div", {
        key: r,
        class: "category"
      }, [
        p("h2", Wn, $(r), 1),
        Z(Gn, {
          category: r,
          topics: i
        }, null, 8, ["category", "topics"])
      ]))), 128))
    ]));
  }
}), Kn = /* @__PURE__ */ L(Yn, [["__scopeId", "data-v-6ff4ea70"]]), Xn = { for: "optionName" }, Zn = ["value"], eo = /* @__PURE__ */ C({
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
    return (s, a) => (h(), g("div", {
      class: z(s.disabled ? "dropdown input-disabled" : "dropdown")
    }, [
      p("label", Xn, $(s.optionName) + ":   ", 1),
      p("select", {
        id: "optionName",
        name: "optionName",
        onChange: n
      }, [
        (h(!0), g(D, null, X(s.options, (r) => (h(), g("option", {
          key: r.value,
          value: r.value
        }, $(r.value) + " " + $(r.unit), 9, Zn))), 128))
      ], 32)
    ], 2));
  }
}), to = /* @__PURE__ */ L(eo, [["__scopeId", "data-v-5f3ae97a"]]), ae = (e) => (Be("data-v-30ab292c"), e = e(), Fe(), e), no = { class: "start-page-container" }, oo = /* @__PURE__ */ ae(() => /* @__PURE__ */ p("h1", null, "VetCloud Smart Quiz", -1)), so = { class: "quiz-config-container" }, io = { class: "question-config-container" }, ro = { class: "tag-text" }, ao = { class: "question-number" }, co = { class: "question-amount-container" }, uo = /* @__PURE__ */ ae(() => /* @__PURE__ */ p("label", { for: "question-amount" }, "Select the amount of questions:", -1)), lo = ["max"], fo = {
  key: 0,
  class: "show-max-msg"
}, po = /* @__PURE__ */ ae(() => /* @__PURE__ */ p("label", { for: "mode-select" }, "Select mode:", -1)), ho = /* @__PURE__ */ ae(() => /* @__PURE__ */ p("option", { value: "Tutor" }, "Tutor", -1)), mo = /* @__PURE__ */ ae(() => /* @__PURE__ */ p("option", { value: "Timed" }, "Timed", -1)), _o = [
  ho,
  mo
], go = 3e3, vo = /* @__PURE__ */ C({
  __name: "StartPage",
  emits: ["start-quiz"],
  setup(e, { emit: o }) {
    const t = w(1), n = w("Tutor"), s = w(!1), a = w(null), r = o, i = U(), c = () => {
      r("start-quiz", {
        questionAmount: t.value,
        mode: n.value
      });
    }, u = () => {
      a.value && clearTimeout(a.value), t.value > i.getquestionnumber() && (t.value = i.getquestionnumber(), s.value = !0, a.value = window.setTimeout(() => {
        s.value = !1;
      }, go));
    };
    return (m, _) => (h(), g("div", no, [
      oo,
      Z(Kn),
      p("div", so, [
        p("div", io, [
          p("p", ro, [
            Ge(" Maximum possible questions: "),
            p("span", ao, $(T(i).getquestionnumber()), 1)
          ]),
          p("div", co, [
            uo,
            Le(p("input", {
              id: "question-amount",
              "onUpdate:modelValue": _[0] || (_[0] = (v) => t.value = v),
              type: "number",
              placeholder: "Question amount",
              min: "1",
              max: T(i).getquestionnumber(),
              onInput: u
            }, null, 40, lo), [
              [
                Tt,
                t.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          s.value ? (h(), g("p", fo, " Cannot select more than " + $(T(i).getquestionnumber()) + " questions. ", 1)) : q("", !0),
          p("div", null, [
            po,
            Le(p("select", {
              id: "mode-select",
              "onUpdate:modelValue": _[1] || (_[1] = (v) => n.value = v)
            }, _o, 512), [
              [wt, n.value]
            ])
          ]),
          Z(to, {
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
        onClick: c
      }, "Start")
    ]));
  }
}), bo = /* @__PURE__ */ L(vo, [["__scopeId", "data-v-30ab292c"]]), yo = /* @__PURE__ */ C({
  __name: "CrucibleComponent",
  setup(e) {
    const o = w(0), t = U(), n = w(!1), s = w([]);
    Qe(async () => {
      s.value = ge();
      const r = ct(
        s.value.map((i) => i.tags)
      );
      t.setselectedTags(
        Object.keys(r).reduce((i, c) => ({ ...i, [c]: [] }), {})
      );
    });
    const a = ({ questionAmount: r, mode: i }) => {
      const c = t.getselectedtags();
      if (!s.value.length)
        return alert("Trouble fetching questions, please try again later");
      const u = Ne(
        s.value,
        c
      ), m = hn(r, u);
      o.value = m.length, t.initialiseQuiz(m, i), i === "Timed" && t.setTimeLimit(r * t.timeLimit), n.value = !0;
    };
    return (r, i) => n.value && T(t).quizMode === "Tutor" ? (h(), M(xn, { key: 0 })) : n.value && T(t).quizMode === "Timed" ? (h(), M(Un, { key: 1 })) : (h(), M(bo, {
      key: 2,
      onStartQuiz: a
    }));
  }
}), So = /* @__PURE__ */ L(yo, [["__scopeId", "data-v-ca22e053"]]), To = "http://localhost:8080/api/resource/getQuiz";
function Eo(e, o = {}) {
  const t = Jt();
  e.use(t), e.component("CrucibleComponent", So), e.provide("dataLink", o.dataLink || To), console.log(o.dataLink);
}
export {
  So as CrucibleComponent,
  Eo as createViewerPlugin
};
