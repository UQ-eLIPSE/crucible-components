import { effectScope as Ue, ref as w, markRaw as G, hasInjectionContext as bt, inject as Fe, getCurrentInstance as yt, toRaw as _e, watch as He, reactive as St, isRef as re, isReactive as Oe, toRef as Se, nextTick as Le, computed as Ce, unref as T, getCurrentScope as Tt, onScopeDispose as wt, toRefs as Pe, defineComponent as N, openBlock as h, createElementBlock as _, Fragment as R, normalizeClass as U, withModifiers as Et, createElementVNode as p, toDisplayString as O, renderList as Z, createVNode as ee, createBlock as x, createCommentVNode as q, pushScopeId as Be, popScopeId as Ge, onMounted as Je, resolveComponent as kt, onBeforeMount as We, createTextVNode as Ye, withDirectives as Ve, vModelText as $t, vModelSelect as Ot } from "vue";
var Ke = !1;
function de(e, o, t) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, o), e.splice(o, 1, t), t) : (e[o] = t, t);
}
function Te(e, o) {
  if (Array.isArray(e)) {
    e.splice(o, 1);
    return;
  }
  delete e[o];
}
function Ct() {
  return Xe().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Xe() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Qt = typeof Proxy == "function", qt = "devtools-plugin:setup", Nt = "plugin:settings:set";
let Y, we;
function It() {
  var e;
  return Y !== void 0 || (typeof window < "u" && window.performance ? (Y = !0, we = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Y = !0, we = globalThis.perf_hooks.performance) : Y = !1), Y;
}
function Lt() {
  return It() ? we.now() : Date.now();
}
class Pt {
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
        return Lt();
      }
    }, t && t.on(Nt, (r, i) => {
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
function Ze(e, o) {
  const t = e, n = Xe(), s = Ct(), a = Qt && t.enableEarlyProxy;
  if (s && (n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a))
    s.emit(qt, e, o);
  else {
    const r = a ? new Pt(t, s) : null;
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
let se;
const ae = (e) => se = e, et = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
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
function Vt(e, { autoBom: o = !1 } = {}) {
  return o && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Qe(e, o, t) {
  const n = new XMLHttpRequest();
  n.open("GET", e), n.responseType = "blob", n.onload = function() {
    ot(n.response, o, t);
  }, n.onerror = function() {
    console.error("could not download file");
  }, n.send();
}
function tt(e) {
  const o = new XMLHttpRequest();
  o.open("HEAD", e, !1);
  try {
    o.send();
  } catch {
  }
  return o.status >= 200 && o.status <= 299;
}
function pe(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const t = document.createEvent("MouseEvents");
    t.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(t);
  }
}
const he = typeof navigator == "object" ? navigator : { userAgent: "" }, nt = /Macintosh/.test(he.userAgent) && /AppleWebKit/.test(he.userAgent) && !/Safari/.test(he.userAgent), ot = ve ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !nt ? At : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in he ? Mt : (
      // Fallback to using FileReader and a popup
      xt
    )
  )
) : () => {
};
function At(e, o = "download", t) {
  const n = document.createElement("a");
  n.download = o, n.rel = "noopener", typeof e == "string" ? (n.href = e, n.origin !== location.origin ? tt(n.href) ? Qe(e, o, t) : (n.target = "_blank", pe(n)) : pe(n)) : (n.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(n.href);
  }, 4e4), setTimeout(function() {
    pe(n);
  }, 0));
}
function Mt(e, o = "download", t) {
  if (typeof e == "string")
    if (tt(e))
      Qe(e, o, t);
    else {
      const n = document.createElement("a");
      n.href = e, n.target = "_blank", setTimeout(function() {
        pe(n);
      });
    }
  else
    navigator.msSaveOrOpenBlob(Vt(e, t), o);
}
function xt(e, o, t, n) {
  if (n = n || open("", "_blank"), n && (n.document.title = n.document.body.innerText = "downloading..."), typeof e == "string")
    return Qe(e, o, t);
  const s = e.type === "application/octet-stream", a = /constructor/i.test(String(Ae.HTMLElement)) || "safari" in Ae, r = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((r || s && a || nt) && typeof FileReader < "u") {
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
function qe(e) {
  return "_a" in e && "install" in e;
}
function st() {
  if (!("clipboard" in navigator))
    return k("Your browser doesn't support the Clipboard API", "error"), !0;
}
function it(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (k('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Dt(e) {
  if (!st())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), k("Global state copied to clipboard.");
    } catch (o) {
      if (it(o))
        return;
      k("Failed to serialize the state. Check the console for more details.", "error"), console.error(o);
    }
}
async function jt(e) {
  if (!st())
    try {
      rt(e, JSON.parse(await navigator.clipboard.readText())), k("Global state pasted from clipboard.");
    } catch (o) {
      if (it(o))
        return;
      k("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(o);
    }
}
async function zt(e) {
  try {
    ot(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (o) {
    k("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(o);
  }
}
let z;
function Rt() {
  z || (z = document.createElement("input"), z.type = "file", z.accept = ".json");
  function e() {
    return new Promise((o, t) => {
      z.onchange = async () => {
        const n = z.files;
        if (!n)
          return o(null);
        const s = n.item(0);
        return o(s ? { text: await s.text(), file: s } : null);
      }, z.oncancel = () => o(null), z.onerror = t, z.click();
    });
  }
  return e;
}
async function Ut(e) {
  try {
    const t = await Rt()();
    if (!t)
      return;
    const { text: n, file: s } = t;
    rt(e, JSON.parse(n)), k(`Global state imported from "${s.name}".`);
  } catch (o) {
    k("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(o);
  }
}
function rt(e, o) {
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
function Ht(e) {
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
function Bt(e) {
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
const me = [], B = "pinia:mutations", $ = "pinia", { assign: Jt } = Object, ge = (e) => "🍍 " + e;
function Wt(e, o) {
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
      id: B,
      label: "Pinia 🍍",
      color: 15064968
    }), t.addInspector({
      id: $,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            Dt(o);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await jt(o), t.sendInspectorTree($), t.sendInspectorState($);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            zt(o);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Ut(o), t.sendInspectorTree($), t.sendInspectorState($);
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
            type: ge(i.$id),
            key: "state",
            editable: !0,
            value: i._isOptionsAPI ? {
              _custom: {
                value: _e(i.$state),
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
            type: ge(i.$id),
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
      if (n.app === e && n.inspectorId === $) {
        let s = [o];
        s = s.concat(Array.from(o._s.values())), n.rootNodes = (n.filter ? s.filter((a) => "$id" in a ? a.$id.toLowerCase().includes(n.filter.toLowerCase()) : at.toLowerCase().includes(n.filter.toLowerCase())) : s).map(Ft);
      }
    }), t.on.getInspectorState((n) => {
      if (n.app === e && n.inspectorId === $) {
        const s = n.nodeId === Ee ? o : o._s.get(n.nodeId);
        if (!s)
          return;
        s && (n.state = Ht(s));
      }
    }), t.on.editInspectorState((n, s) => {
      if (n.app === e && n.inspectorId === $) {
        const a = n.nodeId === Ee ? o : o._s.get(n.nodeId);
        if (!a)
          return k(`store "${n.nodeId}" not found`, "error");
        const { path: r } = n;
        qe(a) ? r.unshift("state") : (r.length !== 1 || !a._customProperties.has(r[0]) || r[0] in a.$state) && r.unshift("$state"), X = !1, n.set(a, r, n.state.value), X = !0;
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
        r[0] = "$state", X = !1, n.set(a, r, n.state.value), X = !0;
      }
    });
  });
}
function Yt(e, o) {
  me.includes(ge(o.$id)) || me.push(ge(o.$id)), Ze({
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
    o.$onAction(({ after: r, onError: i, name: c, args: u }) => {
      const m = ct++;
      t.addTimelineEvent({
        layerId: B,
        event: {
          time: n(),
          title: "🛫 " + c,
          subtitle: "start",
          data: {
            store: M(o.$id),
            action: M(c),
            args: u
          },
          groupId: m
        }
      }), r((g) => {
        F = void 0, t.addTimelineEvent({
          layerId: B,
          event: {
            time: n(),
            title: "🛬 " + c,
            subtitle: "end",
            data: {
              store: M(o.$id),
              action: M(c),
              args: u,
              result: g
            },
            groupId: m
          }
        });
      }), i((g) => {
        F = void 0, t.addTimelineEvent({
          layerId: B,
          event: {
            time: n(),
            logType: "error",
            title: "💥 " + c,
            subtitle: "end",
            data: {
              store: M(o.$id),
              action: M(c),
              args: u,
              error: g
            },
            groupId: m
          }
        });
      });
    }, !0), o._customProperties.forEach((r) => {
      He(() => T(o[r]), (i, c) => {
        t.notifyComponentUpdate(), t.sendInspectorState($), X && t.addTimelineEvent({
          layerId: B,
          event: {
            time: n(),
            title: "Change",
            subtitle: r,
            data: {
              newValue: i,
              oldValue: c
            },
            groupId: F
          }
        });
      }, { deep: !0 });
    }), o.$subscribe(({ events: r, type: i }, c) => {
      if (t.notifyComponentUpdate(), t.sendInspectorState($), !X)
        return;
      const u = {
        time: n(),
        title: Gt(i),
        data: Jt({ store: M(o.$id) }, Bt(r)),
        groupId: F
      };
      i === D.patchFunction ? u.subtitle = "⤵️" : i === D.patchObject ? u.subtitle = "🧩" : r && !Array.isArray(r) && (u.subtitle = r.type), r && (u.data["rawEvent(s)"] = {
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
    o._hotUpdate = G((r) => {
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
      }), t.notifyComponentUpdate(), t.sendInspectorTree($), t.sendInspectorState($);
    });
    const { $dispose: a } = o;
    o.$dispose = () => {
      a(), t.notifyComponentUpdate(), t.sendInspectorTree($), t.sendInspectorState($), t.getSettings().logStoreChanges && k(`Disposed "${o.$id}" store 🗑`);
    }, t.notifyComponentUpdate(), t.sendInspectorTree($), t.sendInspectorState($), t.getSettings().logStoreChanges && k(`"${o.$id}" store installed 🆕`);
  });
}
let ct = 0, F;
function Me(e, o, t) {
  const n = o.reduce((s, a) => (s[a] = _e(e)[a], s), {});
  for (const s in n)
    e[s] = function() {
      const a = ct, r = t ? new Proxy(e, {
        get(...c) {
          return F = a, Reflect.get(...c);
        },
        set(...c) {
          return F = a, Reflect.set(...c);
        }
      }) : e;
      F = a;
      const i = n[s].apply(r, arguments);
      return F = void 0, i;
    };
}
function Kt({ app: e, store: o, options: t }) {
  if (o.$id.startsWith("__hot:"))
    return;
  o._isOptionsAPI = !!t.state, Me(o, Object.keys(t.actions), o._isOptionsAPI);
  const n = o._hotUpdate;
  _e(o)._hotUpdate = function(s) {
    n.apply(this, arguments), Me(o, Object.keys(s._hmrPayload.actions), !!o._isOptionsAPI);
  }, Yt(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    o
  );
}
function Xt() {
  const e = Ue(!0), o = e.run(() => w({}));
  let t = [], n = [];
  const s = G({
    install(a) {
      ae(s), s._a = a, a.provide(et, s), a.config.globalProperties.$pinia = s, ie && Wt(a, s), n.forEach((r) => t.push(r)), n = [];
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
    state: o
  });
  return ie && typeof Proxy < "u" && s.use(Kt), s;
}
function ut(e, o) {
  for (const t in o) {
    const n = o[t];
    if (!(t in e))
      continue;
    const s = e[t];
    J(s) && J(n) && !re(n) && !Oe(n) ? e[t] = ut(s, n) : e[t] = n;
  }
  return e;
}
const lt = () => {
};
function xe(e, o, t, n = lt) {
  e.push(o);
  const s = () => {
    const a = e.indexOf(o);
    a > -1 && (e.splice(a, 1), n());
  };
  return !t && Tt() && wt(s), s;
}
function K(e, ...o) {
  e.slice().forEach((t) => {
    t(...o);
  });
}
const Zt = (e) => e();
function ke(e, o) {
  e instanceof Map && o instanceof Map && o.forEach((t, n) => e.set(n, t)), e instanceof Set && o instanceof Set && o.forEach(e.add, e);
  for (const t in o) {
    if (!o.hasOwnProperty(t))
      continue;
    const n = o[t], s = e[t];
    J(s) && J(n) && e.hasOwnProperty(t) && !re(n) && !Oe(n) ? e[t] = ke(s, n) : e[t] = n;
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
function je(e, o, t, n) {
  const { state: s, actions: a, getters: r } = o, i = t.state.value[e];
  let c;
  function u() {
    !i && (process.env.NODE_ENV === "production" || !n) && (t.state.value[e] = s ? s() : {});
    const m = process.env.NODE_ENV !== "production" && n ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Pe(w(s ? s() : {}).value)
    ) : Pe(t.state.value[e]);
    return P(m, a, Object.keys(r || {}).reduce((g, v) => (process.env.NODE_ENV !== "production" && v in m && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${v}" in store "${e}".`), g[v] = G(Ce(() => {
      ae(t);
      const E = t._s.get(e);
      return r[v].call(E, E);
    })), g), {}));
  }
  return c = $e(e, u, o, t, n, !0), c;
}
function $e(e, o, t = {}, n, s, a) {
  let r;
  const i = P({ actions: {} }, t);
  if (process.env.NODE_ENV !== "production" && !n._e.active)
    throw new Error("Pinia destroyed");
  const c = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Ke && (c.onTrigger = (f) => {
    u ? E = f : u == !1 && !d._hotUpdating && (Array.isArray(E) ? E.push(f) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let u, m, g = [], v = [], E;
  const A = n.state.value[e];
  !a && !A && (process.env.NODE_ENV === "production" || !s) && (n.state.value[e] = {});
  const W = w({});
  let ue;
  function te(f) {
    let l;
    u = m = !1, process.env.NODE_ENV !== "production" && (E = []), typeof f == "function" ? (f(n.state.value[e]), l = {
      type: D.patchFunction,
      storeId: e,
      events: E
    }) : (ke(n.state.value[e], f), l = {
      type: D.patchObject,
      payload: f,
      storeId: e,
      events: E
    });
    const y = ue = Symbol();
    Le().then(() => {
      ue === y && (u = !0);
    }), m = !0, K(g, l, n.state.value[e]);
  }
  const be = a ? function() {
    const { state: l } = t, y = l ? l() : {};
    this.$patch((Q) => {
      P(Q, y);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : lt
  );
  function ye() {
    r.stop(), g = [], v = [], n._s.delete(e);
  }
  function le(f, l) {
    return function() {
      ae(n);
      const y = Array.from(arguments), Q = [], ne = [];
      function _t(L) {
        Q.push(L);
      }
      function vt(L) {
        ne.push(L);
      }
      K(v, {
        args: y,
        name: f,
        store: d,
        after: _t,
        onError: vt
      });
      let oe;
      try {
        oe = l.apply(this && this.$id === e ? this : d, y);
      } catch (L) {
        throw K(ne, L), L;
      }
      return oe instanceof Promise ? oe.then((L) => (K(Q, L), L)).catch((L) => (K(ne, L), Promise.reject(L))) : (K(Q, oe), oe);
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
    $onAction: xe.bind(null, v),
    $patch: te,
    $reset: be,
    $subscribe(f, l = {}) {
      const y = xe(g, f, l.detached, () => Q()), Q = r.run(() => He(() => n.state.value[e], (ne) => {
        (l.flush === "sync" ? m : u) && f({
          storeId: e,
          type: D.direct,
          events: E
        }, ne);
      }, P({}, c, l)));
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
  const I = (n._a && n._a.runWithContext || Zt)(() => n._e.run(() => (r = Ue()).run(o)));
  for (const f in I) {
    const l = I[f];
    if (re(l) && !De(l) || Oe(l))
      process.env.NODE_ENV !== "production" && s ? de(W.value, f, Se(I, f)) : a || (A && tn(l) && (re(l) ? l.value = A[f] : ke(l, A[f])), n.state.value[e][f] = l), process.env.NODE_ENV !== "production" && b.state.push(f);
    else if (typeof l == "function") {
      const y = process.env.NODE_ENV !== "production" && s ? l : le(f, l);
      I[f] = y, process.env.NODE_ENV !== "production" && (b.actions[f] = l), i.actions[f] = l;
    } else
      process.env.NODE_ENV !== "production" && De(l) && (b.getters[f] = a ? (
        // @ts-expect-error
        t.getters[f]
      ) : l, ve && (I._getters || // @ts-expect-error: same
      (I._getters = G([]))).push(f));
  }
  if (P(d, I), P(_e(d), I), Object.defineProperty(d, "$state", {
    get: () => process.env.NODE_ENV !== "production" && s ? W.value : n.state.value[e],
    set: (f) => {
      if (process.env.NODE_ENV !== "production" && s)
        throw new Error("cannot set hotState");
      te((l) => {
        P(l, f);
      });
    }
  }), process.env.NODE_ENV !== "production" && (d._hotUpdate = G((f) => {
    d._hotUpdating = !0, f._hmrPayload.state.forEach((l) => {
      if (l in d.$state) {
        const y = f.$state[l], Q = d.$state[l];
        typeof y == "object" && J(y) && J(Q) ? ut(y, Q) : f.$state[l] = Q;
      }
      de(d, l, Se(f.$state, l));
    }), Object.keys(d.$state).forEach((l) => {
      l in f.$state || Te(d, l);
    }), u = !1, m = !1, n.state.value[e] = Se(f._hmrPayload, "hotState"), m = !0, Le().then(() => {
      u = !0;
    });
    for (const l in f._hmrPayload.actions) {
      const y = f[l];
      de(d, l, le(l, y));
    }
    for (const l in f._hmrPayload.getters) {
      const y = f._hmrPayload.getters[l], Q = a ? (
        // special handling of options api
        Ce(() => (ae(n), y.call(d, d)))
      ) : y;
      de(d, l, Q);
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
Found in store "${d.$id}".`), A && a && t.hydrate && t.hydrate(d.$state, A), u = !0, m = !0, d;
}
function nn(e, o, t) {
  let n, s;
  const a = typeof o == "function";
  if (typeof e == "string")
    n = e, s = a ? t : o;
  else if (s = e, n = e.id, process.env.NODE_ENV !== "production" && typeof n != "string")
    throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
  function r(i, c) {
    const u = bt();
    if (i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && se && se._testing ? null : i) || (u ? Fe(et, null) : null), i && ae(i), process.env.NODE_ENV !== "production" && !se)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    i = se, i._s.has(n) || (a ? $e(n, o, s, i) : je(n, s, i), process.env.NODE_ENV !== "production" && (r._pinia = i));
    const m = i._s.get(n);
    if (process.env.NODE_ENV !== "production" && c) {
      const g = "__hot:" + n, v = a ? $e(g, o, s, i, !0) : je(g, P({}, s), i, !0);
      c._hotUpdate(v), delete i.state.value[g], i._s.delete(g);
    }
    if (process.env.NODE_ENV !== "production" && ve) {
      const g = yt();
      if (g && g.proxy && // avoid adding stores that are just built for hot module replacement
      !c) {
        const v = g.proxy, E = "_pStores" in v ? v._pStores : v._pStores = {};
        E[n] = m;
      }
    }
    return m;
  }
  return r.$id = n, r;
}
const on = ["id", "checked"], sn = ["for", "innerHTML"], rn = /* @__PURE__ */ N({
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
    return (s, a) => (h(), _(R, null, [
      (h(), _("input", {
        id: "option-" + s.optionKey,
        key: s.optionKey,
        "test-id": "radio_options",
        type: "radio",
        name: "options",
        checked: s.checked,
        class: U(s.submitted && "ignore-hover"),
        onClick: [
          a[0] || (a[0] = (r) => n()),
          a[1] || (a[1] = Et(() => {
          }, ["stop"]))
        ]
      }, null, 10, on)),
      (h(), _("label", {
        key: s.optionKey,
        for: "option-" + s.optionKey,
        class: U(s.submitted ? "mcq-option-label ignore-hover" : "mcq-option-label"),
        onClick: a[2] || (a[2] = (r) => n()),
        innerHTML: s.option.optionValue
      }, null, 10, sn))
    ], 64));
  }
}), V = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [n, s] of o)
    t[n] = s;
  return t;
}, an = /* @__PURE__ */ V(rn, [["__scopeId", "data-v-e5ddf38c"]]), cn = ["disabled"], un = /* @__PURE__ */ N({
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
    return (c, u) => (h(), _("div", null, [
      p("button", {
        disabled: c.hideSkip && i(c.submitted, c.selectedOption).class === "skip",
        class: U(["mcq-button", i(c.submitted, c.selectedOption).class]),
        onClick: u[0] || (u[0] = (m) => a(c.submitted, c.selectedOption))
      }, O(i(c.submitted, c.selectedOption).text), 11, cn)
    ]));
  }
}), ln = /* @__PURE__ */ V(un, [["__scopeId", "data-v-847b8dd5"]]), dn = /* @__PURE__ */ N({
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
    return (r, i) => (h(), _("div", null, [
      p("button", {
        class: U(r.buttonName === "Submit" ? "submit_btn" : "mcq-button"),
        onClick: i[0] || (i[0] = (c) => s())
      }, O(r.buttonName), 3)
    ]));
  }
}), ze = /* @__PURE__ */ V(dn, [["__scopeId", "data-v-8be7f61e"]]), fn = (e) => {
  for (let o = e.length - 1; o > 0; o--) {
    const t = Math.floor(Math.random() * (o + 1));
    [e[o], e[t]] = [e[t], e[o]];
  }
  return e;
}, pn = (e, o) => fn(o).slice(0, e);
function dt(e) {
  const o = e.reduce(
    (n, s) => (Object.keys(s).forEach((a) => {
      n[a] || (n[a] = /* @__PURE__ */ new Set()), n[a].add(s[a]);
    }), n),
    {}
  );
  return Object.keys(o).reduce(
    (n, s) => (n[s] = [...o[s]], n),
    {}
  );
}
function Ne(e, o) {
  return e.filter((t) => Object.keys(o).every((n) => !o[n].length || o[n].includes(t.tags[n])));
}
function hn(e, o, t) {
  const n = e[o].question.optionsList;
  for (let s = 0; s < n.length; s++)
    if (n[s].optionValue === t)
      return s;
}
const ft = (e, o) => o.findIndex((t) => {
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
      const n = ft(e, this.quizStats);
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
}), mn = ["innerHTML"], gn = { class: "mcq-list" }, _n = ["onClick"], vn = { class: "next-prev-question" }, bn = /* @__PURE__ */ N({
  __name: "MCQQuestion",
  props: {
    _id: {},
    statement: {},
    optionsList: {}
  },
  emits: ["nextQuestion", "skipQuestion", "prevQuestion"],
  setup(e, { emit: o }) {
    const t = j(), { statement: n, optionsList: s, _id: a } = e, r = w(null), i = w(!1), c = o, u = w(t.getRemainingQuestions()), m = () => {
      i.value = !0;
    }, g = () => {
      r.value = null, c("nextQuestion");
    }, v = (b) => {
      W(b), u.value = t.getRemainingQuestions(), c("nextQuestion");
    }, E = () => {
      W(a), c("skipQuestion");
    }, A = (b) => t.incrementStat(
      b.$oid,
      "attempts",
      r.value ?? void 0
    ), W = (b) => {
      A(b), i.value = !1, r.value = null;
    }, ue = () => {
      c("prevQuestion");
    }, te = (b, S) => {
      i.value || (r.value = r.value === S ? null : S), A(b);
    }, be = (b, S, d) => t.quizMode === "Timed" ? ye(b, S) : le(S, d);
    function ye(b, S) {
      const d = ft(b.$oid, t.quizStats), H = t.quizStats[d].selectedValue, I = hn(
        t.quizStats,
        d,
        H
      );
      return String(I) === S ? "selected" : "";
    }
    function le(b, S) {
      const d = S[parseInt(b)], H = r.value === b;
      return i.value ? d.optionCorrect ? "correct ignore-hover" : H ? "wrong ignore-hover" : "ignore-hover" : H ? "selected" : "";
    }
    return (b, S) => (h(), _(R, null, [
      p("div", {
        class: "mcq-statement",
        innerHTML: b.statement
      }, null, 8, mn),
      p("div", gn, [
        (h(!0), _(R, null, Z(Object.entries(b.optionsList), ([d, H]) => (h(), _("div", {
          key: d,
          class: U(["mcq-option", be(b._id, d, b.optionsList)]),
          onClick: (I) => te(b._id, d)
        }, [
          ee(an, {
            "option-key": d,
            checked: r.value === d,
            option: H,
            submitted: i.value,
            onSelectOption: (I) => te(b._id, d)
          }, null, 8, ["option-key", "checked", "option", "submitted", "onSelectOption"])
        ], 10, _n))), 128))
      ]),
      T(t).quizMode === "Tutor" ? (h(), x(ln, {
        key: 0,
        submitted: i.value,
        "selected-option": r.value,
        "hide-skip": u.value <= 1,
        onSubmitAnswer: m,
        onNextQuestion: S[0] || (S[0] = (d) => v(b._id)),
        onSkipQuestion: E
      }, null, 8, ["submitted", "selected-option", "hide-skip"])) : q("", !0),
      p("div", vn, [
        T(t).quizMode === "Timed" ? (h(), x(ze, {
          key: 0,
          "button-name": T(t).questionsQueue.length >= 1 ? "→" : "Submit",
          onNextQuestion: S[1] || (S[1] = (d) => g())
        }, null, 8, ["button-name"])) : q("", !0),
        T(t).quizMode === "Timed" && T(t).questionsStack.length > 1 ? (h(), x(ze, {
          key: 1,
          "button-name": "←",
          onPrevQuestion: S[2] || (S[2] = (d) => ue())
        })) : q("", !0)
      ])
    ], 64));
  }
}), pt = /* @__PURE__ */ V(bn, [["__scopeId", "data-v-6e8339a0"]]), yn = (e) => (Be("data-v-4ffecbcd"), e = e(), Ge(), e), Sn = { class: "report-container" }, Tn = { class: "mcq-report" }, wn = { class: "table-container" }, En = /* @__PURE__ */ yn(() => /* @__PURE__ */ p("thead", null, [
  /* @__PURE__ */ p("tr", null, [
    /* @__PURE__ */ p("th", null, "question"),
    /* @__PURE__ */ p("th", null, "correct option"),
    /* @__PURE__ */ p("th", null, "your answer")
  ])
], -1)), kn = { class: "question-row" }, $n = ["href", "innerHTML"], On = { class: "answer-row" }, Cn = ["innerHTML"], Qn = { class: "answer-row" }, qn = ["innerHTML"], Nn = { class: "mcq-result" }, In = { class: "score" }, Ln = /* @__PURE__ */ N({
  __name: "MCQStatus",
  setup(e) {
    const o = j(), t = o.quizStats, n = o.quizStats.length, s = t.filter((r) => r.correct === 1).length, a = (s * 100 / n).toFixed(0);
    return (r, i) => (h(), _("div", Sn, [
      p("div", Tn, [
        p("div", wn, [
          p("table", null, [
            En,
            p("tbody", null, [
              (h(!0), _(R, null, Z(Object.entries(T(t)), ([c, u]) => (h(), _("tr", {
                key: c,
                class: "quiz-statment"
              }, [
                p("td", kn, [
                  p("a", {
                    href: u.question.link,
                    target: "_blank",
                    innerHTML: u.question.statement
                  }, null, 8, $n)
                ]),
                p("td", On, [
                  (h(!0), _(R, null, Z(Object.entries(
                    u.question.optionsList
                  ), ([m, g]) => (h(), _("span", { key: m }, [
                    g.optionCorrect ? (h(), _("span", {
                      key: 0,
                      innerHTML: g.optionValue
                    }, null, 8, Cn)) : q("", !0)
                  ]))), 128))
                ]),
                p("td", Qn, [
                  p("span", {
                    class: U(
                      u.correct === 1 ? "correct-answer" : "wrong-answer"
                    ),
                    innerHTML: u.correct === 1 ? "<span> ✔</span> " : "<span> ✘</span> <span>     </span>" + u.selectedValue
                  }, null, 10, qn)
                ])
              ]))), 128))
            ])
          ])
        ])
      ]),
      p("div", null, [
        p("div", Nn, [
          p("span", In, "⌛ Result: " + O(T(s)) + " out of " + O(T(n)) + " - (" + O(T(a)) + " %)", 1)
        ])
      ])
    ]));
  }
}), ht = /* @__PURE__ */ V(Ln, [["__scopeId", "data-v-4ffecbcd"]]), Pn = /* @__PURE__ */ N({
  __name: "MCQQuiz",
  setup(e) {
    const o = w(), t = j();
    Je(() => {
      s();
    });
    const n = () => {
      t.enqueueQuestion(o.value), s();
    }, s = () => {
      o.value = t.dequeueQuestion();
    }, a = () => window.location.reload();
    return (r, i) => {
      const c = kt("MCQInfoPanel");
      return h(), _("main", null, [
        ee(c),
        o.value ? (h(), x(pt, {
          key: 0,
          statement: o.value.statement,
          "options-list": o.value.optionsList,
          _id: o.value._id,
          onNextQuestion: s,
          onSkipQuestion: n
        }, null, 8, ["statement", "options-list", "_id"])) : q("", !0),
        o.value ? q("", !0) : (h(), x(ht, { key: 1 })),
        o.value ? q("", !0) : (h(), _("button", {
          key: 2,
          class: "btn-relocate",
          onClick: a
        }, " End "))
      ]);
    };
  }
}), Vn = /* @__PURE__ */ V(Pn, [["__scopeId", "data-v-937e1a1b"]]), An = {
  key: 0,
  class: "time-left-header"
}, Mn = { class: "questions-left-header" }, xn = /* @__PURE__ */ N({
  __name: "MCQInfoPanel",
  props: {
    timeLeft: {
      type: Number,
      default: 0
    }
  },
  setup(e) {
    const o = j(), t = (n) => {
      const s = Math.floor(n / 60), a = n % 60;
      return `${s}:${a < 10 ? "0" : ""}${a}`;
    };
    return (n, s) => (h(), _(R, null, [
      e.timeLeft ? (h(), _("h3", An, " Time left: " + O(t(e.timeLeft)), 1)) : q("", !0),
      p("h3", Mn, " Question " + O(T(o).questionsStack.length) + " out of " + O(T(o).questionsQueue.length + T(o).questionsStack.length), 1)
    ], 64));
  }
}), Re = 1e3, Dn = "-1", jn = /* @__PURE__ */ N({
  __name: "MCQTimedQuiz",
  setup(e) {
    const o = j(), t = w();
    let n = null, s = null;
    const a = w(o.timeLimit);
    Je(() => {
      i();
    }), We(() => {
      u(), m();
    });
    const r = () => {
      t.value = o.removeFromLastHistory() ?? t.value;
    }, i = () => t.value = o.dequeueQuestion(), c = () => window.location.reload(), u = () => {
      n && clearTimeout(n), s && clearInterval(s);
    }, m = () => {
      a.value = o.timeLimit;
      const v = () => t.value ? a.value ? a.value-- : g() : u();
      s = window.setInterval(v, Re), n = window.setTimeout(() => {
      }, o.timeLimit * Re);
    }, g = () => {
      var E;
      u();
      const v = (A) => o.incrementStat(A, "attempts", Dn);
      for (v(((E = t.value) == null ? void 0 : E._id.$oid) ?? ""); t.value = o.dequeueQuestion(); )
        v(t.value._id.$oid);
      return alert("Time's up! Quiz has ended."), i();
    };
    return (v, E) => (h(), _("main", null, [
      ee(xn, { "time-left": a.value }, null, 8, ["time-left"]),
      t.value ? (h(), x(pt, {
        key: 0,
        statement: t.value.statement,
        "options-list": t.value.optionsList,
        _id: t.value._id,
        onNextQuestion: i,
        onPrevQuestion: r
      }, null, 8, ["statement", "options-list", "_id"])) : q("", !0),
      t.value ? q("", !0) : (h(), x(ht, { key: 1 })),
      t.value ? q("", !0) : (h(), _("button", {
        key: 2,
        class: "btn-relocate",
        onClick: c
      }, " End "))
    ]));
  }
}), zn = /* @__PURE__ */ V(jn, [["__scopeId", "data-v-cffdfe07"]]), Rn = ["id", "name", "value", "disabled"], Un = ["for"], Fn = {
  key: 0,
  class: "question-number"
}, Hn = /* @__PURE__ */ N({
  __name: "FilterCheckbox",
  props: {
    category: {},
    topics: {}
  },
  setup(e) {
    const { category: o, topics: t } = e, n = j(), s = Ce(
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
      const g = n.allQs;
      return Ne(
        g,
        m
      ).length.toString();
    };
    return (i, c) => (h(), _("ul", null, [
      (h(!0), _(R, null, Z(s.value, ({ idx: u, num: m, topic: g }) => (h(), _("li", {
        key: u,
        class: U(["filter-options", { "grey-out": m === "0" }])
      }, [
        p("input", {
          id: `${i.category}-${g}-checkbox`,
          type: "checkbox",
          name: i.category,
          value: g,
          disabled: m === "0",
          onChange: c[0] || (c[0] = (v) => a(v))
        }, null, 40, Rn),
        p("label", {
          for: `${i.category}-${g}-checkbox`
        }, [
          Ye(O(g) + " ", 1),
          m !== null && m !== "0" ? (h(), _("span", Fn, O(m), 1)) : q("", !0)
        ], 8, Un)
      ], 2))), 128))
    ]));
  }
}), Bn = /* @__PURE__ */ V(Hn, [["__scopeId", "data-v-0f1deb69"]]), Gn = { class: "filter" }, Jn = { class: "category-heading" }, Wn = /* @__PURE__ */ N({
  __name: "MCQTagOptions",
  setup(e) {
    const n = j().allQs.map((a) => a.tags), s = dt(n);
    return (a, r) => (h(), _("div", Gn, [
      (h(!0), _(R, null, Z(Object.entries(T(s)), ([i, c]) => (h(), _("div", {
        key: i,
        class: "category"
      }, [
        p("h2", Jn, O(i), 1),
        ee(Bn, {
          category: i,
          topics: c
        }, null, 8, ["category", "topics"])
      ]))), 128))
    ]));
  }
}), Yn = /* @__PURE__ */ V(Wn, [["__scopeId", "data-v-efaccb2c"]]), Kn = { for: "optionName" }, Xn = ["value"], Zn = /* @__PURE__ */ N({
  __name: "DropDownbox",
  props: {
    options: {},
    optionName: {},
    disabled: { type: Boolean }
  },
  setup(e) {
    const o = j(), t = w(0);
    function n(s) {
      const a = s.target;
      a.value && (t.value = parseFloat(a.value) * 60, o.setTimeLimit(t.value));
    }
    return (s, a) => (h(), _("div", {
      class: U(s.disabled ? "dropdown input-disabled" : "dropdown")
    }, [
      p("label", Kn, O(s.optionName) + ":   ", 1),
      p("select", {
        id: "optionName",
        name: "optionName",
        onChange: n
      }, [
        (h(!0), _(R, null, Z(s.options, (r) => (h(), _("option", {
          key: r.value,
          value: r.value
        }, O(r.value) + " " + O(r.unit), 9, Xn))), 128))
      ], 32)
    ], 2));
  }
}), eo = /* @__PURE__ */ V(Zn, [["__scopeId", "data-v-5f3ae97a"]]), ce = (e) => (Be("data-v-30ab292c"), e = e(), Ge(), e), to = { class: "start-page-container" }, no = /* @__PURE__ */ ce(() => /* @__PURE__ */ p("h1", null, "VetCloud Smart Quiz", -1)), oo = { class: "quiz-config-container" }, so = { class: "question-config-container" }, io = { class: "tag-text" }, ro = { class: "question-number" }, ao = { class: "question-amount-container" }, co = /* @__PURE__ */ ce(() => /* @__PURE__ */ p("label", { for: "question-amount" }, "Select the amount of questions:", -1)), uo = ["max"], lo = {
  key: 0,
  class: "show-max-msg"
}, fo = /* @__PURE__ */ ce(() => /* @__PURE__ */ p("label", { for: "mode-select" }, "Select mode:", -1)), po = /* @__PURE__ */ ce(() => /* @__PURE__ */ p("option", { value: "Tutor" }, "Tutor", -1)), ho = /* @__PURE__ */ ce(() => /* @__PURE__ */ p("option", { value: "Timed" }, "Timed", -1)), mo = [
  po,
  ho
], go = 3e3, _o = /* @__PURE__ */ N({
  __name: "StartPage",
  emits: ["start-quiz"],
  setup(e, { emit: o }) {
    const t = w(1), n = w("Tutor"), s = w(!1), a = w(null), r = o, i = j(), c = () => {
      r("start-quiz", {
        questionAmount: t.value,
        mode: n.value
      });
    }, u = () => {
      a.value && clearTimeout(a.value), t.value > i.getquestionnumber() && (t.value = i.getquestionnumber(), s.value = !0, a.value = window.setTimeout(() => {
        s.value = !1;
      }, go));
    };
    return (m, g) => (h(), _("div", to, [
      no,
      ee(Yn),
      p("div", oo, [
        p("div", so, [
          p("p", io, [
            Ye(" Maximum possible questions: "),
            p("span", ro, O(T(i).getquestionnumber()), 1)
          ]),
          p("div", ao, [
            co,
            Ve(p("input", {
              id: "question-amount",
              "onUpdate:modelValue": g[0] || (g[0] = (v) => t.value = v),
              type: "number",
              placeholder: "Question amount",
              min: "1",
              max: T(i).getquestionnumber(),
              onInput: u
            }, null, 40, uo), [
              [
                $t,
                t.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          s.value ? (h(), _("p", lo, " Cannot select more than " + O(T(i).getquestionnumber()) + " questions. ", 1)) : q("", !0),
          p("div", null, [
            fo,
            Ve(p("select", {
              id: "mode-select",
              "onUpdate:modelValue": g[1] || (g[1] = (v) => n.value = v)
            }, mo, 512), [
              [Ot, n.value]
            ])
          ]),
          ee(eo, {
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
}), vo = /* @__PURE__ */ V(_o, [["__scopeId", "data-v-30ab292c"]]);
Array.from(
  { length: 10 },
  (e, o) => `VETS20${o + 10}`
);
const bo = (e) => e.reduce((o, t) => {
  if (!t.includes(":"))
    return o;
  let [n, s] = t.split(":");
  return [n, s] = [n.trim().toLowerCase(), s.trim().toLowerCase()], o[n] = s, o;
}, {}), yo = (e) => e.map((o) => ({
  _id: { $oid: o._id.$oid },
  statement: o.statement,
  tags: bo(o.tags),
  optionsList: o.optionsList,
  link: o.link
})), So = { convertQuestions: yo }, To = [
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
  },
  {
    tags: ["course: VETS2012", "subject:Physiology", "animal:Horse"],
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
], C = {
  isString: (r) => typeof r == "string",
  isObject: (r) => typeof r == "object" && r !== null,
  isBoolean: (r) => typeof r == "boolean",
  isArray: (r, i) => Array.isArray(r) && r.every(i),
  isNumber: (r) => typeof r == "number",
  isFunction: (r) => typeof r == "function"
};
function Ie(e) {
  const o = e.includes(":") && e.split(":").length === 2, t = !e.includes(":") && e.split(" ").length === 1;
  return o || t;
}
function mt(e) {
  return C.isArray(e, C.isString) && e.some(Ie);
}
function wo(e) {
  return C.isArray(e, C.isString) && e.every(Ie);
}
function Eo(e) {
  return C.isObject(e) && C.isString(e.optionValue) && (e.optionCorrect === void 0 || C.isBoolean(e.optionCorrect));
}
function gt(e) {
  return C.isObject(e) && C.isObject(e._id) && C.isString(e._id.$oid) && C.isString(e.statement) && mt(e.tags) && C.isArray(e.optionsList, Eo) && C.isString(e.link);
}
function ko(e) {
  return C.isArray(e, gt);
}
const fe = {
  isMCQuestion: gt,
  isMCQuestionArray: ko,
  isAllTags: wo,
  isTags: mt,
  isTag: Ie,
  validate: C
}, $o = () => To, Oo = () => {
  const e = $o();
  return So.convertQuestions(Co(e));
};
function Co(e) {
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
  let o = 0, t = 0, n = 0, s = 0;
  const a = e.length;
  for (const r of e) {
    fe.isMCQuestion(r) || n++;
    let { tags: i } = r;
    if (!i || Array.isArray(i) && !i.length) {
      t++;
      continue;
    }
    if (s += i.length, !fe.isAllTags(i)) {
      const c = i.filter((u) => fe.isTag(u));
      o += i.length - c.length, i = c;
    }
  }
  return Qo(n, a, o, s, t), e;
}
function Qo(e, o, t, n, s) {
  e && console.warn(
    `Invalid Questions Received: %c${e} out of ${o}`,
    "color: #FF0000"
  ), t && console.warn(
    `Filtering out invalid tags: %c${t} out of ${n}`,
    "color: #FF0000"
  ), s && console.warn(`Questions with no tags: %c${s}`, "color: #FF0000");
}
const qo = /* @__PURE__ */ N({
  __name: "CrucibleComponent",
  setup(e) {
    const o = w(0), t = j(), n = w(!1), s = w([]);
    Fe("$dataLink"), We(() => {
      s.value = Oo(), console.info("All Questions:", s.value), t.allQs = s.value;
      const r = dt(
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
      ), m = pn(r, u);
      o.value = m.length, t.initialiseQuiz(m, i), i === "Timed" && t.setTimeLimit(r * t.timeLimit), n.value = !0;
    };
    return (r, i) => n.value && T(t).quizMode === "Tutor" ? (h(), x(Vn, { key: 0 })) : n.value && T(t).quizMode === "Timed" ? (h(), x(zn, { key: 1 })) : (h(), x(vo, {
      key: 2,
      onStartQuiz: a
    }));
  }
}), No = /* @__PURE__ */ V(qo, [["__scopeId", "data-v-b4f8b4f4"]]), Io = {
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
function Po(e, o = {}) {
  const t = Xt();
  e.use(t), e.component("CrucibleComponent", No), e.provide("$dataLink", o.dataLink || Io);
}
export {
  No as CrucibleComponent,
  Po as createViewerPlugin,
  Io as defaultData
};
