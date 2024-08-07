import { effectScope as Be, ref as T, markRaw as G, toRaw as be, hasInjectionContext as Tt, inject as $e, getCurrentInstance as St, watch as Oe, unref as y, reactive as Dt, isRef as ae, isReactive as Ve, toRef as ye, nextTick as Le, computed as qe, getCurrentScope as At, onScopeDispose as Ct, toRefs as De, defineComponent as V, openBlock as g, createElementBlock as _, Fragment as U, normalizeClass as H, createElementVNode as h, toDisplayString as E, renderList as ee, createVNode as te, createBlock as M, createCommentVNode as $, onMounted as _e, pushScopeId as We, popScopeId as Ge, resolveComponent as Et, onBeforeMount as Je, createTextVNode as Ye, watchEffect as kt, withDirectives as xe, vModelText as Qt, vModelSelect as $t } from "vue";
var Ke = !1;
function de(e, n, o) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, n), e.splice(n, 1, o), o) : (e[n] = o, o);
}
function Te(e, n) {
  if (Array.isArray(e)) {
    e.splice(n, 1);
    return;
  }
  delete e[n];
}
function Ot() {
  return Xe().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Xe() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Vt = typeof Proxy == "function", qt = "devtools-plugin:setup", Pt = "plugin:settings:set";
let K, Ae;
function Nt() {
  var e;
  return K !== void 0 || (typeof window < "u" && window.performance ? (K = !0, Ae = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (K = !0, Ae = globalThis.perf_hooks.performance) : K = !1), K;
}
function It() {
  return Nt() ? Ae.now() : Date.now();
}
class Lt {
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
        return It();
      }
    }, o && o.on(Pt, (r, c) => {
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
  const o = e, t = Xe(), s = Ot(), i = Vt && o.enableEarlyProxy;
  if (s && (t.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    s.emit(qt, e, n);
  else {
    const r = i ? new Lt(o, s) : null;
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
var j;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(j || (j = {}));
const we = typeof window < "u", re = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && we, Me = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function xt(e, { autoBom: n = !1 } = {}) {
  return n && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Pe(e, n, o) {
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
function me(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const o = document.createEvent("MouseEvents");
    o.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(o);
  }
}
const he = typeof navigator == "object" ? navigator : { userAgent: "" }, ot = /Macintosh/.test(he.userAgent) && /AppleWebKit/.test(he.userAgent) && !/Safari/.test(he.userAgent), nt = we ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !ot ? Mt : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in he ? jt : (
      // Fallback to using FileReader and a popup
      zt
    )
  )
) : () => {
};
function Mt(e, n = "download", o) {
  const t = document.createElement("a");
  t.download = n, t.rel = "noopener", typeof e == "string" ? (t.href = e, t.origin !== location.origin ? tt(t.href) ? Pe(e, n, o) : (t.target = "_blank", me(t)) : me(t)) : (t.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(t.href);
  }, 4e4), setTimeout(function() {
    me(t);
  }, 0));
}
function jt(e, n = "download", o) {
  if (typeof e == "string")
    if (tt(e))
      Pe(e, n, o);
    else {
      const t = document.createElement("a");
      t.href = e, t.target = "_blank", setTimeout(function() {
        me(t);
      });
    }
  else
    navigator.msSaveOrOpenBlob(xt(e, o), n);
}
function zt(e, n, o, t) {
  if (t = t || open("", "_blank"), t && (t.document.title = t.document.body.innerText = "downloading..."), typeof e == "string")
    return Pe(e, n, o);
  const s = e.type === "application/octet-stream", i = /constructor/i.test(String(Me.HTMLElement)) || "safari" in Me, r = /CriOS\/[\d]+/.test(navigator.userAgent);
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
function C(e, n) {
  const o = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(o, n) : n === "error" ? console.error(o) : n === "warn" ? console.warn(o) : console.log(o);
}
function Ne(e) {
  return "_a" in e && "install" in e;
}
function st() {
  if (!("clipboard" in navigator))
    return C("Your browser doesn't support the Clipboard API", "error"), !0;
}
function it(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (C('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Rt(e) {
  if (!st())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), C("Global state copied to clipboard.");
    } catch (n) {
      if (it(n))
        return;
      C("Failed to serialize the state. Check the console for more details.", "error"), console.error(n);
    }
}
async function Ut(e) {
  if (!st())
    try {
      rt(e, JSON.parse(await navigator.clipboard.readText())), C("Global state pasted from clipboard.");
    } catch (n) {
      if (it(n))
        return;
      C("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(n);
    }
}
async function Ht(e) {
  try {
    nt(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (n) {
    C("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(n);
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
    rt(e, JSON.parse(t)), C(`Global state imported from "${s.name}".`);
  } catch (n) {
    C("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(n);
  }
}
function rt(e, n) {
  for (const o in n) {
    const t = e.state.value[o];
    t ? Object.assign(t, n[o]) : e.state.value[o] = n[o];
  }
}
function L(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const at = "🍍 Pinia (root)", Ce = "_root";
function Wt(e) {
  return Ne(e) ? {
    id: Ce,
    label: at
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Gt(e) {
  if (Ne(e)) {
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
    operation: L(e.type),
    key: L(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function Yt(e) {
  switch (e) {
    case j.direct:
      return "mutation";
    case j.patchFunction:
      return "$patch";
    case j.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let Z = !0;
const ge = [], W = "pinia:mutations", k = "pinia", { assign: Kt } = Object, ve = (e) => "🍍 " + e;
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
    typeof o.now != "function" && C("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), o.addTimelineLayer({
      id: W,
      label: "Pinia 🍍",
      color: 15064968
    }), o.addInspector({
      id: k,
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
            await Ut(n), o.sendInspectorTree(k), o.sendInspectorState(k);
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
            await Bt(n), o.sendInspectorTree(k), o.sendInspectorState(k);
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
            s ? typeof s.$reset != "function" ? C(`Cannot reset "${t}" store because it doesn't have a "$reset" method implemented.`, "warn") : (s.$reset(), C(`Store "${t}" reset.`)) : C(`Cannot reset "${t}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), o.on.inspectComponent((t, s) => {
      const i = t.componentInstance && t.componentInstance.proxy;
      if (i && i._pStores) {
        const r = t.componentInstance.proxy._pStores;
        Object.values(r).forEach((c) => {
          t.instanceData.state.push({
            type: ve(c.$id),
            key: "state",
            editable: !0,
            value: c._isOptionsAPI ? {
              _custom: {
                value: be(c.$state),
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
            type: ve(c.$id),
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
      if (t.app === e && t.inspectorId === k) {
        let s = [n];
        s = s.concat(Array.from(n._s.values())), t.rootNodes = (t.filter ? s.filter((i) => "$id" in i ? i.$id.toLowerCase().includes(t.filter.toLowerCase()) : at.toLowerCase().includes(t.filter.toLowerCase())) : s).map(Wt);
      }
    }), o.on.getInspectorState((t) => {
      if (t.app === e && t.inspectorId === k) {
        const s = t.nodeId === Ce ? n : n._s.get(t.nodeId);
        if (!s)
          return;
        s && (t.state = Gt(s));
      }
    }), o.on.editInspectorState((t, s) => {
      if (t.app === e && t.inspectorId === k) {
        const i = t.nodeId === Ce ? n : n._s.get(t.nodeId);
        if (!i)
          return C(`store "${t.nodeId}" not found`, "error");
        const { path: r } = t;
        Ne(i) ? r.unshift("state") : (r.length !== 1 || !i._customProperties.has(r[0]) || r[0] in i.$state) && r.unshift("$state"), Z = !1, t.set(i, r, t.state.value), Z = !0;
      }
    }), o.on.editComponentState((t) => {
      if (t.type.startsWith("🍍")) {
        const s = t.type.replace(/^🍍\s*/, ""), i = n._s.get(s);
        if (!i)
          return C(`store "${s}" not found`, "error");
        const { path: r } = t;
        if (r[0] !== "state")
          return C(`Invalid path for store "${s}":
${r}
Only state can be modified.`);
        r[0] = "$state", Z = !1, t.set(i, r, t.state.value), Z = !0;
      }
    });
  });
}
function Zt(e, n) {
  ge.includes(ve(n.$id)) || ge.push(ve(n.$id)), Ze({
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
            store: L(n.$id),
            action: L(a),
            args: u
          },
          groupId: f
        }
      }), r((p) => {
        B = void 0, o.addTimelineEvent({
          layerId: W,
          event: {
            time: t(),
            title: "🛬 " + a,
            subtitle: "end",
            data: {
              store: L(n.$id),
              action: L(a),
              args: u,
              result: p
            },
            groupId: f
          }
        });
      }), c((p) => {
        B = void 0, o.addTimelineEvent({
          layerId: W,
          event: {
            time: t(),
            logType: "error",
            title: "💥 " + a,
            subtitle: "end",
            data: {
              store: L(n.$id),
              action: L(a),
              args: u,
              error: p
            },
            groupId: f
          }
        });
      });
    }, !0), n._customProperties.forEach((r) => {
      Oe(() => y(n[r]), (c, a) => {
        o.notifyComponentUpdate(), o.sendInspectorState(k), Z && o.addTimelineEvent({
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
      if (o.notifyComponentUpdate(), o.sendInspectorState(k), !Z)
        return;
      const u = {
        time: t(),
        title: Yt(c),
        data: Kt({ store: L(n.$id) }, Jt(r)),
        groupId: B
      };
      c === j.patchFunction ? u.subtitle = "⤵️" : c === j.patchObject ? u.subtitle = "🧩" : r && !Array.isArray(r) && (u.subtitle = r.type), r && (u.data["rawEvent(s)"] = {
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
            store: L(n.$id),
            info: L("HMR update")
          }
        }
      }), o.notifyComponentUpdate(), o.sendInspectorTree(k), o.sendInspectorState(k);
    });
    const { $dispose: i } = n;
    n.$dispose = () => {
      i(), o.notifyComponentUpdate(), o.sendInspectorTree(k), o.sendInspectorState(k), o.getSettings().logStoreChanges && C(`Disposed "${n.$id}" store 🗑`);
    }, o.notifyComponentUpdate(), o.sendInspectorTree(k), o.sendInspectorState(k), o.getSettings().logStoreChanges && C(`"${n.$id}" store installed 🆕`);
  });
}
let ct = 0, B;
function je(e, n, o) {
  const t = n.reduce((s, i) => (s[i] = be(e)[i], s), {});
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
  n._isOptionsAPI = !!o.state, je(n, Object.keys(o.actions), n._isOptionsAPI);
  const t = n._hotUpdate;
  be(n)._hotUpdate = function(s) {
    t.apply(this, arguments), je(n, Object.keys(s._hmrPayload.actions), !!n._isOptionsAPI);
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
    J(s) && J(t) && !ae(t) && !Ve(t) ? e[o] = ut(s, t) : e[o] = t;
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
  return !o && At() && Ct(s), s;
}
function X(e, ...n) {
  e.slice().forEach((o) => {
    o(...n);
  });
}
const oo = (e) => e();
function Ee(e, n) {
  e instanceof Map && n instanceof Map && n.forEach((o, t) => e.set(t, o)), e instanceof Set && n instanceof Set && n.forEach(e.add, e);
  for (const o in n) {
    if (!n.hasOwnProperty(o))
      continue;
    const t = n[o], s = e[o];
    J(s) && J(t) && e.hasOwnProperty(o) && !ae(t) && !Ve(t) ? e[o] = Ee(s, t) : e[o] = t;
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
const { assign: P } = Object;
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
      De(T(s ? s() : {}).value)
    ) : De(o.state.value[e]);
    return P(f, i, Object.keys(r || {}).reduce((p, m) => (process.env.NODE_ENV !== "production" && m in f && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${m}" in store "${e}".`), p[m] = G(qe(() => {
      ce(o);
      const b = o._s.get(e);
      return r[m].call(b, b);
    })), p), {}));
  }
  return a = ke(e, u, n, o, t, !0), a;
}
function ke(e, n, o = {}, t, s, i) {
  let r;
  const c = P({ actions: {} }, o);
  if (process.env.NODE_ENV !== "production" && !t._e.active)
    throw new Error("Pinia destroyed");
  const a = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Ke && (a.onTrigger = (d) => {
    u ? b = d : u == !1 && !v._hotUpdating && (Array.isArray(b) ? b.push(d) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let u, f, p = [], m = [], b;
  const Q = t.state.value[e];
  !i && !Q && (process.env.NODE_ENV === "production" || !s) && (t.state.value[e] = {});
  const oe = T({});
  let le;
  function pe(d) {
    let l;
    u = f = !1, process.env.NODE_ENV !== "production" && (b = []), typeof d == "function" ? (d(t.state.value[e]), l = {
      type: j.patchFunction,
      storeId: e,
      events: b
    }) : (Ee(t.state.value[e], d), l = {
      type: j.patchObject,
      payload: d,
      storeId: e,
      events: b
    });
    const w = le = Symbol();
    Le().then(() => {
      le === w && (u = !0);
    }), f = !0, X(p, l, t.state.value[e]);
  }
  const S = i ? function() {
    const { state: l } = o, w = l ? l() : {};
    this.$patch((O) => {
      P(O, w);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : lt
  );
  function D() {
    r.stop(), p = [], m = [], t._s.delete(e);
  }
  function A(d, l) {
    return function() {
      ce(t);
      const w = Array.from(arguments), O = [], ne = [];
      function wt(q) {
        O.push(q);
      }
      function yt(q) {
        ne.push(q);
      }
      X(m, {
        args: w,
        name: d,
        store: v,
        after: wt,
        onError: yt
      });
      let se;
      try {
        se = l.apply(this && this.$id === e ? this : v, w);
      } catch (q) {
        throw X(ne, q), q;
      }
      return se instanceof Promise ? se.then((q) => (X(O, q), q)).catch((q) => (X(ne, q), Promise.reject(q))) : (X(O, se), se);
    };
  }
  const I = /* @__PURE__ */ G({
    actions: {},
    getters: {},
    state: [],
    hotState: oe
  }), Y = {
    _p: t,
    // _s: scope,
    $id: e,
    $onAction: ze.bind(null, m),
    $patch: pe,
    $reset: S,
    $subscribe(d, l = {}) {
      const w = ze(p, d, l.detached, () => O()), O = r.run(() => Oe(() => t.state.value[e], (ne) => {
        (l.flush === "sync" ? f : u) && d({
          storeId: e,
          type: j.direct,
          events: b
        }, ne);
      }, P({}, a, l)));
      return w;
    },
    $dispose: D
  }, v = Dt(process.env.NODE_ENV !== "production" || re ? P(
    {
      _hmrPayload: I,
      _customProperties: G(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    Y
    // must be added later
    // setupStore
  ) : Y);
  t._s.set(e, v);
  const F = (t._a && t._a.runWithContext || oo)(() => t._e.run(() => (r = Be()).run(n)));
  for (const d in F) {
    const l = F[d];
    if (ae(l) && !Re(l) || Ve(l))
      process.env.NODE_ENV !== "production" && s ? de(oe.value, d, ye(F, d)) : i || (Q && so(l) && (ae(l) ? l.value = Q[d] : Ee(l, Q[d])), t.state.value[e][d] = l), process.env.NODE_ENV !== "production" && I.state.push(d);
    else if (typeof l == "function") {
      const w = process.env.NODE_ENV !== "production" && s ? l : A(d, l);
      F[d] = w, process.env.NODE_ENV !== "production" && (I.actions[d] = l), c.actions[d] = l;
    } else process.env.NODE_ENV !== "production" && Re(l) && (I.getters[d] = i ? (
      // @ts-expect-error
      o.getters[d]
    ) : l, we && (F._getters || // @ts-expect-error: same
    (F._getters = G([]))).push(d));
  }
  if (P(v, F), P(be(v), F), Object.defineProperty(v, "$state", {
    get: () => process.env.NODE_ENV !== "production" && s ? oe.value : t.state.value[e],
    set: (d) => {
      if (process.env.NODE_ENV !== "production" && s)
        throw new Error("cannot set hotState");
      pe((l) => {
        P(l, d);
      });
    }
  }), process.env.NODE_ENV !== "production" && (v._hotUpdate = G((d) => {
    v._hotUpdating = !0, d._hmrPayload.state.forEach((l) => {
      if (l in v.$state) {
        const w = d.$state[l], O = v.$state[l];
        typeof w == "object" && J(w) && J(O) ? ut(w, O) : d.$state[l] = O;
      }
      de(v, l, ye(d.$state, l));
    }), Object.keys(v.$state).forEach((l) => {
      l in d.$state || Te(v, l);
    }), u = !1, f = !1, t.state.value[e] = ye(d._hmrPayload, "hotState"), f = !0, Le().then(() => {
      u = !0;
    });
    for (const l in d._hmrPayload.actions) {
      const w = d[l];
      de(v, l, A(l, w));
    }
    for (const l in d._hmrPayload.getters) {
      const w = d._hmrPayload.getters[l], O = i ? (
        // special handling of options api
        qe(() => (ce(t), w.call(v, v)))
      ) : w;
      de(v, l, O);
    }
    Object.keys(v._hmrPayload.getters).forEach((l) => {
      l in d._hmrPayload.getters || Te(v, l);
    }), Object.keys(v._hmrPayload.actions).forEach((l) => {
      l in d._hmrPayload.actions || Te(v, l);
    }), v._hmrPayload = d._hmrPayload, v._getters = d._getters, v._hotUpdating = !1;
  })), re) {
    const d = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((l) => {
      Object.defineProperty(v, l, P({ value: v[l] }, d));
    });
  }
  return t._p.forEach((d) => {
    if (re) {
      const l = r.run(() => d({
        store: v,
        app: t._a,
        pinia: t,
        options: c
      }));
      Object.keys(l || {}).forEach((w) => v._customProperties.add(w)), P(v, l);
    } else
      P(v, r.run(() => d({
        store: v,
        app: t._a,
        pinia: t,
        options: c
      })));
  }), process.env.NODE_ENV !== "production" && v.$state && typeof v.$state == "object" && typeof v.$state.constructor == "function" && !v.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${v.$id}".`), Q && i && o.hydrate && o.hydrate(v.$state, Q), u = !0, f = !0, v;
}
function io(e, n, o) {
  let t, s;
  const i = typeof n == "function";
  t = e, s = i ? o : n;
  function r(c, a) {
    const u = Tt();
    if (c = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && ie && ie._testing ? null : c) || (u ? $e(et, null) : null), c && ce(c), process.env.NODE_ENV !== "production" && !ie)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    c = ie, c._s.has(t) || (i ? ke(t, n, s, c) : Ue(t, s, c), process.env.NODE_ENV !== "production" && (r._pinia = c));
    const f = c._s.get(t);
    if (process.env.NODE_ENV !== "production" && a) {
      const p = "__hot:" + t, m = i ? ke(p, n, s, c, !0) : Ue(p, P({}, s), c, !0);
      a._hotUpdate(m), delete c.state.value[p], c._s.delete(p);
    }
    if (process.env.NODE_ENV !== "production" && we) {
      const p = St();
      if (p && p.proxy && // avoid adding stores that are just built for hot module replacement
      !a) {
        const m = p.proxy, b = "_pStores" in m ? m._pStores : m._pStores = {};
        b[t] = f;
      }
    }
    return f;
  }
  return r.$id = t, r;
}
const ro = ["id", "checked"], ao = ["for", "innerHTML"], co = /* @__PURE__ */ V({
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
    return (s, i) => (g(), _(U, null, [
      (g(), _("input", {
        id: "option-" + s.optionKey,
        key: s.optionKey,
        "test-id": "radio_options",
        type: "radio",
        name: "options",
        checked: s.checked,
        class: H(s.submitted && "ignore-hover")
      }, null, 10, ro)),
      (g(), _("label", {
        key: s.optionKey,
        for: "option-" + s.optionKey,
        class: H(s.submitted ? "mcq-option-label ignore-hover" : "mcq-option-label"),
        onClick: i[0] || (i[0] = (r) => t()),
        innerHTML: s.option.optionValue
      }, null, 10, ao))
    ], 64));
  }
}), x = (e, n) => {
  const o = e.__vccOpts || e;
  for (const [t, s] of n)
    o[t] = s;
  return o;
}, uo = /* @__PURE__ */ x(co, [["__scopeId", "data-v-fdbfedc6"]]), lo = ["disabled"], po = /* @__PURE__ */ V({
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
    return (a, u) => (g(), _("div", null, [
      h("button", {
        disabled: a.hideSkip && c(a.submitted, a.selectedOption).class === "skip",
        class: H(["mcq-button", c(a.submitted, a.selectedOption).class]),
        onClick: u[0] || (u[0] = (f) => i(a.submitted, a.selectedOption))
      }, E(c(a.submitted, a.selectedOption).text), 11, lo)
    ]));
  }
}), fo = /* @__PURE__ */ x(po, [["__scopeId", "data-v-847b8dd5"]]), mo = /* @__PURE__ */ V({
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
    return (r, c) => (g(), _("div", null, [
      h("button", {
        class: H(r.buttonName === "Submit" ? "submit_btn" : "mcq-button"),
        onClick: c[0] || (c[0] = (a) => s())
      }, E(r.buttonName), 3)
    ]));
  }
}), He = /* @__PURE__ */ x(mo, [["__scopeId", "data-v-8be7f61e"]]), ho = (e) => e.sort(
  (n, o) => n.correctAttempts - o.correctAttempts
), go = (e, n) => {
  const o = ho(n);
  return console.log(o.slice(0, e)), o.slice(0, e);
};
function pt(e) {
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
function Ie(e, n) {
  return e.filter((o) => Object.keys(n).every((t) => {
    if (!n[t].length)
      return !0;
    const s = o.tags[t];
    if (s)
      return s.some((i) => n[t].includes(i));
  }));
}
function vo(e, n, o) {
  return e.filter((t) => {
    const s = t.tags[o];
    return s && s.includes(n);
  });
}
function bo(e, n, o) {
  const t = e[n].question.optionsList;
  for (let s = 0; s < t.length; s++)
    if (t[s].optionValue === o)
      return s;
}
const dt = (e, n) => n.findIndex((o) => {
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
      return Ie(e, this.selectedTags).length;
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
      const t = dt(e, this.quizStats);
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
}), _o = ["innerHTML"], wo = { class: "mcq-list" }, yo = ["onClick"], To = { class: "next-prev-question" }, So = /* @__PURE__ */ V({
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
      m(), r.value = o.getRemainingQuestions(), i("nextQuestion");
    }, f = () => {
      m(), i("skipQuestion");
    }, p = (S) => o.incrementStat(
      S.$oid,
      "attempts",
      t.value ?? void 0
    ), m = () => {
      s.value = !1, t.value = null;
    }, b = () => {
      t.value = null, i("prevQuestion");
    }, Q = (S, D) => {
      s.value || (t.value = t.value === D ? null : D), p(S);
    }, oe = (S, D, A) => o.quizMode === "Timed" ? le(S, D) : pe(D, A);
    function le(S, D) {
      const A = dt(S.$oid, o.quizStats), I = o.quizStats[A].selectedValue, Y = bo(
        o.quizStats,
        A,
        I
      );
      return String(Y) === D ? (t.value = D, "selected") : "";
    }
    function pe(S, D) {
      const A = D[parseInt(S)], I = t.value === S;
      return s.value ? A.optionCorrect ? "correct ignore-hover" : I ? "wrong ignore-hover" : "ignore-hover" : I ? "selected" : "";
    }
    return (S, D) => (g(), _(U, null, [
      h("div", {
        class: "mcq-statement",
        innerHTML: S.statement
      }, null, 8, _o),
      h("div", wo, [
        (g(!0), _(U, null, ee(Object.entries(S.optionsList), ([A, I]) => (g(), _("div", {
          key: A,
          class: H(["mcq-option", oe(S._id, A, S.optionsList)]),
          onClick: (Y) => Q(S._id, A)
        }, [
          te(uo, {
            "option-key": A,
            checked: t.value === A,
            option: I,
            submitted: s.value,
            onSelectOption: (Y) => Q(S._id, A)
          }, null, 8, ["option-key", "checked", "option", "submitted", "onSelectOption"])
        ], 10, yo))), 128))
      ]),
      y(o).quizMode === "Tutor" ? (g(), M(fo, {
        key: 0,
        submitted: s.value,
        "selected-option": t.value,
        "hide-skip": r.value <= 1,
        onSubmitAnswer: c,
        onNextQuestion: D[0] || (D[0] = (A) => u()),
        onSkipQuestion: f
      }, null, 8, ["submitted", "selected-option", "hide-skip"])) : $("", !0),
      h("div", To, [
        y(o).quizMode === "Timed" ? (g(), M(He, {
          key: 0,
          "button-name": y(o).questionsQueue.length >= 1 ? "→" : "Submit",
          onNextQuestion: D[1] || (D[1] = (A) => a())
        }, null, 8, ["button-name"])) : $("", !0),
        y(o).quizMode === "Timed" && y(o).questionsStack.length > 1 ? (g(), M(He, {
          key: 1,
          "button-name": "←",
          onPrevQuestion: D[2] || (D[2] = (A) => b())
        })) : $("", !0)
      ])
    ], 64));
  }
}), ft = /* @__PURE__ */ x(So, [["__scopeId", "data-v-181a554c"]]), Do = (e) => (We("data-v-38adb08e"), e = e(), Ge(), e), Ao = { class: "report-container" }, Co = { class: "mcq-report" }, Eo = { class: "table-container" }, ko = /* @__PURE__ */ Do(() => /* @__PURE__ */ h("thead", null, [
  /* @__PURE__ */ h("tr", null, [
    /* @__PURE__ */ h("th", null, "question"),
    /* @__PURE__ */ h("th", null, "correct option"),
    /* @__PURE__ */ h("th", null, "your answer")
  ])
], -1)), Qo = { class: "question-row" }, $o = ["href", "innerHTML"], Oo = { class: "answer-row" }, Vo = ["innerHTML"], qo = { class: "answer-row" }, Po = ["innerHTML"], No = { class: "mcq-result" }, Io = { class: "score" }, Lo = /* @__PURE__ */ V({
  __name: "MCQStatus",
  setup(e) {
    const n = $e("$updateQAttemptCallback") ?? _t, o = z(), t = o.quizStats, s = o.quizStats.length, i = t.filter((a) => a.correct === 1).length, r = (i * 100 / s).toFixed(0);
    return _e(() => {
      try {
        const a = t.filter((u) => u.attempts).map(
          (u) => n(u.question._id.$oid, !!u.correct)
        );
        a.length && Promise.allSettled(a);
      } catch (a) {
        throw console.error("Error updating question attempts", a), a;
      }
    }), (a, u) => (g(), _("div", Ao, [
      h("div", Co, [
        h("div", Eo, [
          h("table", null, [
            ko,
            h("tbody", null, [
              (g(!0), _(U, null, ee(Object.entries(y(t)), ([f, p]) => (g(), _("tr", {
                key: f,
                class: "quiz-statment"
              }, [
                h("td", Qo, [
                  h("a", {
                    href: p.question.link,
                    target: "_blank",
                    innerHTML: p.question.statement
                  }, null, 8, $o)
                ]),
                h("td", Oo, [
                  (g(!0), _(U, null, ee(Object.entries(
                    p.question.optionsList
                  ), ([m, b]) => (g(), _("span", { key: m }, [
                    b.optionCorrect ? (g(), _("span", {
                      key: 0,
                      innerHTML: b.optionValue
                    }, null, 8, Vo)) : $("", !0)
                  ]))), 128))
                ]),
                h("td", qo, [
                  h("span", {
                    class: H(
                      p.correct === 1 ? "correct-answer" : "wrong-answer"
                    ),
                    innerHTML: p.correct === 1 ? "<span> ✔</span> " : "<span> ✘</span> <span>     </span>" + p.selectedValue
                  }, null, 10, Po)
                ])
              ]))), 128))
            ])
          ])
        ])
      ]),
      h("div", null, [
        h("div", No, [
          h("span", Io, "⌛ Result: " + E(y(i)) + " out of " + E(y(s)) + " - (" + E(y(r)) + " %)", 1)
        ])
      ])
    ]));
  }
}), mt = /* @__PURE__ */ x(Lo, [["__scopeId", "data-v-38adb08e"]]), xo = { class: "questions-left-header" }, Mo = /* @__PURE__ */ V({
  __name: "MCQQuiz",
  setup(e) {
    const n = T(), o = z();
    _e(() => {
      s();
    });
    const t = () => {
      o.enqueueQuestion(n.value), n.value = o.dequeueQuestion();
    }, s = () => {
      o.setAnsweredQuestionsNum(), n.value = o.dequeueQuestion();
    }, i = () => window.location.reload();
    return (r, c) => {
      const a = Et("MCQInfoPanel");
      return g(), _("main", null, [
        te(a),
        h("h3", xo, " Question " + E(y(o).getAnsweredQuestionsNum()) + " out of " + E(y(o).quizStats.length), 1),
        n.value ? (g(), M(ft, {
          key: 0,
          statement: n.value.statement,
          "options-list": n.value.optionsList,
          _id: n.value._id,
          onNextQuestion: s,
          onSkipQuestion: t
        }, null, 8, ["statement", "options-list", "_id"])) : $("", !0),
        n.value ? $("", !0) : (g(), M(mt, { key: 1 })),
        n.value ? $("", !0) : (g(), _("button", {
          key: 2,
          class: "btn-relocate",
          onClick: i
        }, " End "))
      ]);
    };
  }
}), jo = /* @__PURE__ */ x(Mo, [["__scopeId", "data-v-edc7c7f1"]]), zo = {
  key: 0,
  class: "time-left-header"
}, Ro = { class: "questions-left-header" }, Uo = /* @__PURE__ */ V({
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
    return (t, s) => (g(), _(U, null, [
      e.timeLeft ? (g(), _("h3", zo, " Time left: " + E(o(e.timeLeft)), 1)) : $("", !0),
      h("h3", Ro, " Question " + E(y(n).questionsStack.length) + " out of " + E(y(n).quizStats.length), 1)
    ], 64));
  }
}), Fe = 1e3, Ho = "-1", Fo = /* @__PURE__ */ V({
  __name: "MCQTimedQuiz",
  setup(e) {
    const n = z(), o = T();
    let t = null, s = null;
    const i = T(n.timeLimit);
    _e(() => {
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
      const m = () => o.value ? i.value ? i.value-- : p() : u();
      s = window.setInterval(m, Fe), t = window.setTimeout(() => {
      }, n.timeLimit * Fe);
    }, p = () => {
      var b;
      u();
      const m = (Q) => n.incrementStat(Q, "attempts", Ho);
      for (m(((b = o.value) == null ? void 0 : b._id.$oid) ?? ""); o.value = n.dequeueQuestion(); )
        m(o.value._id.$oid);
      return alert("Time's up! Quiz has ended."), c();
    };
    return (m, b) => (g(), _("main", null, [
      te(Uo, { "time-left": i.value }, null, 8, ["time-left"]),
      o.value ? (g(), M(ft, {
        key: 0,
        statement: o.value.statement,
        "options-list": o.value.optionsList,
        _id: o.value._id,
        onNextQuestion: c,
        onPrevQuestion: r
      }, null, 8, ["statement", "options-list", "_id"])) : $("", !0),
      o.value ? $("", !0) : (g(), M(mt, { key: 1 })),
      o.value ? $("", !0) : (g(), _("button", {
        key: 2,
        class: "btn-relocate",
        onClick: a
      }, " End "))
    ]));
  }
}), Bo = /* @__PURE__ */ x(Fo, [["__scopeId", "data-v-4fd74e68"]]), Wo = ["id", "name", "value", "disabled"], Go = ["for"], Jo = {
  key: 0,
  class: "question-number"
}, Yo = /* @__PURE__ */ V({
  __name: "FilterCheckbox",
  props: {
    category: {},
    topics: {}
  },
  setup(e) {
    const { category: n, topics: o } = e, t = z(), s = (a) => n === "course" ? a.toUpperCase() : a, i = qe(
      () => Object.entries(o).map(([a, u]) => {
        const f = c(u, n), p = vo(
          t.allQs,
          u,
          n
        ).length.toString();
        return { idx: a, topic: u, num: f, questionamount: p };
      }).filter(({ topic: a }) => a !== void 0)
    ), r = (a) => {
      if (!(a.target instanceof HTMLInputElement))
        return console.error("Trying to click on non-input element");
      const u = a.target.name, f = a.target.value;
      t.modifySelectedTags(a.target.checked, { category: u, topic: f });
    }, c = (a, u) => {
      var b;
      const f = t.getselectedtags();
      if (!f[u] || (b = f[u]) != null && b.includes(
        a
      ))
        return null;
      const p = JSON.parse(
        JSON.stringify(t.getselectedtags())
      );
      p[u].includes(a) || p[u].push(a);
      const m = t.allQs;
      return Ie(
        m,
        p
      ).length.toString();
    };
    return (a, u) => (g(), _("ul", null, [
      (g(!0), _(U, null, ee(i.value, ({ idx: f, num: p, topic: m, questionamount: b }) => (g(), _("li", {
        key: f,
        class: H(["filter-options", { "grey-out": p === "0" }])
      }, [
        h("input", {
          id: `${a.category}-${m}-checkbox`,
          type: "checkbox",
          name: a.category,
          value: m,
          disabled: p === "0",
          onChange: u[0] || (u[0] = (Q) => r(Q))
        }, null, 40, Wo),
        h("label", {
          for: `${a.category}-${m}-checkbox`
        }, [
          Ye(E(s(m)) + " ", 1),
          p !== null && p !== "0" ? (g(), _("span", Jo, E(b), 1)) : $("", !0)
        ], 8, Go)
      ], 2))), 128))
    ]));
  }
}), Ko = /* @__PURE__ */ x(Yo, [["__scopeId", "data-v-43544b02"]]), Xo = {
  key: 0,
  class: "filter"
}, Zo = { class: "category-heading" }, en = /* @__PURE__ */ V({
  __name: "MCQTagOptions",
  setup(e) {
    const n = T([]), o = z();
    let t = {};
    return Oe(
      () => o.allQs,
      (s, i) => {
        o.setTagSet(), n.value = o.getTagSet(), t = pt(n.value);
      }
    ), (s, i) => y(o).allQs ? (g(), _("div", Xo, [
      (g(!0), _(U, null, ee(Object.entries(y(t)), ([r, c]) => (g(), _("div", {
        key: r,
        class: "category"
      }, [
        h("h2", Zo, E(r), 1),
        te(Ko, {
          category: r,
          topics: c
        }, null, 8, ["category", "topics"])
      ]))), 128))
    ])) : $("", !0);
  }
}), tn = /* @__PURE__ */ x(en, [["__scopeId", "data-v-ebc7fb2c"]]), on = { for: "optionName" }, nn = ["value"], sn = /* @__PURE__ */ V({
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
    return (s, i) => (g(), _("div", {
      class: H(s.disabled ? "dropdown input-disabled" : "dropdown")
    }, [
      h("label", on, E(s.optionName) + ":   ", 1),
      h("select", {
        id: "optionName",
        name: "optionName",
        onChange: t
      }, [
        (g(!0), _(U, null, ee(s.options, (r) => (g(), _("option", {
          key: r.value,
          value: r.value
        }, E(r.value) + " " + E(r.unit), 9, nn))), 128))
      ], 32)
    ], 2));
  }
}), rn = /* @__PURE__ */ x(sn, [["__scopeId", "data-v-5f3ae97a"]]), ue = (e) => (We("data-v-c3d686ea"), e = e(), Ge(), e), an = { class: "start-page-container" }, cn = /* @__PURE__ */ ue(() => /* @__PURE__ */ h("h1", null, "VetCloud Smart Quiz", -1)), un = { class: "quiz-config-container" }, ln = { class: "question-config-container" }, pn = { class: "tag-text" }, dn = { class: "question-number" }, fn = { class: "question-amount-container" }, mn = /* @__PURE__ */ ue(() => /* @__PURE__ */ h("label", { for: "question-amount" }, "Select the amount of questions:", -1)), hn = ["max"], gn = {
  key: 0,
  class: "show-max-msg"
}, vn = /* @__PURE__ */ ue(() => /* @__PURE__ */ h("label", { for: "mode-select" }, "Select mode:", -1)), bn = /* @__PURE__ */ ue(() => /* @__PURE__ */ h("option", { value: "Tutor" }, "Tutor", -1)), _n = /* @__PURE__ */ ue(() => /* @__PURE__ */ h("option", { value: "Timed" }, "Timed", -1)), wn = [
  bn,
  _n
], yn = 3e3, Tn = /* @__PURE__ */ V({
  __name: "StartPage",
  emits: ["start-quiz"],
  setup(e, { emit: n }) {
    const o = T(1), t = T("Tutor"), s = T(!1), i = T(null), r = n, c = z();
    _e(() => {
      kt(() => {
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
      }, yn));
    };
    return (f, p) => (g(), _("div", an, [
      cn,
      te(tn),
      h("div", un, [
        h("div", ln, [
          h("p", pn, [
            Ye(" Maximum possible questions: "),
            h("span", dn, E(y(c).getquestionnumber()), 1)
          ]),
          h("div", fn, [
            mn,
            xe(h("input", {
              id: "question-amount",
              "onUpdate:modelValue": p[0] || (p[0] = (m) => o.value = m),
              type: "number",
              placeholder: "Question amount",
              min: "1",
              max: y(c).getquestionnumber(),
              onInput: u
            }, null, 40, hn), [
              [
                Qt,
                o.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          s.value ? (g(), _("p", gn, " Cannot select more than " + E(y(c).getquestionnumber()) + " questions. ", 1)) : $("", !0),
          h("div", null, [
            vn,
            xe(h("select", {
              id: "mode-select",
              "onUpdate:modelValue": p[1] || (p[1] = (m) => t.value = m)
            }, wn, 512), [
              [$t, t.value]
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
      h("button", {
        class: "start-button",
        onClick: a
      }, "Start")
    ]));
  }
}), Sn = /* @__PURE__ */ x(Tn, [["__scopeId", "data-v-c3d686ea"]]), Dn = (e) => e.trim().toLowerCase().replace("_", " "), An = (e) => e.reduce((n, o) => {
  if (!o.includes(":")) return n;
  let [t, s] = o.split(":");
  return [t, s] = [t.trim().toLowerCase(), Dn(s)], n[t] ? n[t] = [...n[t], s] : n[t] = [s], n;
}, {}), Cn = (e) => e.map((n) => ({
  _id: { $oid: n._id.$oid },
  statement: n.statement,
  tags: An(n.tags),
  optionsList: n.optionsList,
  link: n.link,
  attempts: n.attempts,
  correctAttempts: n.correctAttempts,
  reviewDue: n.reviewDue
})), ht = { convertQuestions: Cn }, En = [
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
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Presynaptic terminal</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Cell body</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Dendrite</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Myelin</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af39b",
      attempts: 0,
      correctAttempts: 0,
      reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd",
    attempts: 0,
    correctAttempts: 0,
    reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Reaching the subthreshold level does not stimulate the post-synaptic membrane</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Threshold event generates an action potential</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Reaching the subthreshold level is enough to generate an action potential</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Depolarised synaptic membrane is more negative than the hyperpolarised membrane</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0b",
      attempts: 0,
      correctAttempts: 0,
      reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03",
    attempts: 0,
    correctAttempts: 0,
    reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>The effect of the subthreshold is enhanced</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Action potential is reached</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>A threshold event takes place</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>The membrane is hyperpolarised</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0a",
      attempts: 0,
      correctAttempts: 0,
      reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03",
    attempts: 0,
    correctAttempts: 0,
    reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>IPSP can hyperpolarise the membrane</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>They can reach action potential as a result of IPSP</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>An action potential will be reached if the number of EPSP &gt; IPSP</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0d",
      attempts: 0,
      correctAttempts: 0,
      reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03",
    attempts: 0,
    correctAttempts: 0,
    reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Relative refractory period</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Sodium conductance</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>EPSPs after IPSPs</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Hyperpolarised state</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0f",
      attempts: 0,
      correctAttempts: 0,
      reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03",
    attempts: 0,
    correctAttempts: 0,
    reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Schwann cells</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Muller cells</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Oligodendrocytes</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac11",
      attempts: 0,
      correctAttempts: 0,
      reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214413464c71f1df2110d07",
    attempts: 0,
    correctAttempts: 0,
    reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Cerebrospinal fluid synthesis</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Delivering nutrients</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Recycling of neurotransmitters</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Maintenance of terminal environment</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac10",
      attempts: 0,
      correctAttempts: 0,
      reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214413464c71f1df2110d07",
    attempts: 0,
    correctAttempts: 0,
    reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "The action of metabotropic receptors is slower than ionotropic receptors",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "Neurotransmitter binding to metabotropic receptors causes a conformational change, activating a signal transduction pathway",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "An example of an ionotropic receptor is the nicotinic acetylcholine receptor",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86faa",
      attempts: 0,
      correctAttempts: 0,
      reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d5a64c71f1df2110d16",
    attempts: 0,
    correctAttempts: 0,
    reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "Hyperpolarisation due to blocking of sodium channels",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "Hyperpolarisation due to opening of chloride channels",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "Excitation due to opening of sodium channels",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fac",
      attempts: 0,
      correctAttempts: 0,
      reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d5a64c71f1df2110d16",
    attempts: 0,
    correctAttempts: 0,
    reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "Hyperpolarisation due to blocking of sodium channels",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "Hyperpolarisation due to opening of chloride channels",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "Excitation due to opening of sodium channels",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fab",
      attempts: 0,
      correctAttempts: 0,
      reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d5a64c71f1df2110d16",
    attempts: 0,
    correctAttempts: 0,
    reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Facilitating diffusion of the transmitter to the post-synaptic membrane</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Splitting the neurotransmitter in the synaptic cleft, deactivating the transmitter</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Fusing the pre-synaptic vesicle with the pre-synaptic membrane, thus releasing the transmitter</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Metabolising the transmitter within the pre-synaptic vesicle</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fae",
      attempts: 0,
      correctAttempts: 0,
      reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d7064c71f1df2110d17",
    attempts: 0,
    correctAttempts: 0,
    reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Diffusion of acetylcholine away from the synapse is solely responsible</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Acetylcholinesterase rapidly breaks down acetylcholine into choline and acetate</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Dissociation of acetylcholine from the muscarinic receptor, after binding for several seconds, is solely responsible</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fad",
      attempts: 0,
      correctAttempts: 0,
      reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d7064c71f1df2110d17",
    attempts: 0,
    correctAttempts: 0,
    reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Presynaptic terminal</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Cell body</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Dendrite</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Myelin</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac06",
      attempts: 0,
      correctAttempts: 0,
      reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd",
    attempts: 0,
    correctAttempts: 0,
    reviewDue: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
  }
], N = {
  isString: (r) => typeof r == "string",
  isObject: (r) => typeof r == "object" && r !== null,
  isBoolean: (r) => typeof r == "boolean",
  isArray: (r, c) => Array.isArray(r) && r.every(c),
  isNumber: (r) => typeof r == "number",
  isFunction: (r) => typeof r == "function"
};
function Qe(e) {
  const n = e.includes(":") && e.split(":").length === 2, o = !e.includes(":") && !e.includes(" ");
  return n || o;
}
function gt(e, n = !1) {
  return N.isArray(e, N.isString) ? n ? e.every(Qe) : e.some(Qe) : !1;
}
function kn(e) {
  return N.isObject(e) && N.isString(e.optionValue) && (e.optionCorrect === void 0 || N.isBoolean(e.optionCorrect));
}
function vt(e) {
  return N.isObject(e) && N.isObject(e._id) && // Assuming _id is an object with $oid property
  N.isString(e._id.$oid) && N.isString(e.statement) && gt(e.tags) && // Modified to ensure tags are always checked
  N.isArray(e.optionsList, kn) && N.isString(e.link);
}
function Qn(e) {
  return N.isArray(e, vt);
}
const fe = {
  isMCQuestion: vt,
  isMCQuestionArray: Qn,
  validateTags: gt,
  isTag: Qe
}, $n = (e) => {
  try {
    if (!e)
      throw new Error("No question data found. Please Try again later.");
    return ht.convertQuestions(bt(e));
  } catch (n) {
    return alert(n), [];
  }
}, On = () => En, Vn = () => {
  const e = On();
  return ht.convertQuestions(bt(e));
};
function bt(e) {
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
  return qn(o, e.length), e;
}
function Se(e, n) {
  e && console.warn(n, "color: #FF0000");
}
function qn(e, n) {
  const { invalidQs: o, invalidTags: t, noTags: s, totalTags: i } = e;
  Se(
    o,
    `Invalid Questions Received: %c${o} out of ${n}`
  ), Se(
    t,
    `Filtering out invalid tags: %c${t} out of ${i}`
  ), Se(s, `Questions with no tags: %c${s}`);
}
const Pn = /* @__PURE__ */ V({
  __name: "CrucibleComponent",
  props: {
    level: {
      type: Number,
      default: 5
      // a default value is required for Vue props
    }
  },
  setup(e) {
    const n = e, o = T(0), t = z(), s = T(!1), i = T([]), r = $e("$dataLink") ?? "http://localhost:8080/api/resource/66b2e529d64a315b213ae8c7/getQuiz", { level: c } = De(n);
    console.log(r, "api"), Je(async () => {
      const f = await (async () => (await (await fetch(`${r}?level=${c.value}`)).json()).questions)();
      console.log(f[0]), i.value = r ? $n(f) : Vn(), t.allQs = i.value;
      const p = pt(
        i.value.map((m) => m.tags)
      );
      t.setselectedTags(
        Object.keys(p).reduce((m, b) => ({ ...m, [b]: [] }), {})
      ), t.setTagSet();
    });
    const a = ({ questionAmount: u, mode: f }) => {
      const p = t.getselectedtags();
      if (!i.value.length)
        return alert("Trouble fetching questions, please try again later");
      const m = Ie(
        i.value,
        p
      ), b = go(u, m);
      o.value = b.length, t.initialiseQuiz(b, f), f === "Timed" && t.setTimeLimit(u * t.timeLimit), s.value = !0;
    };
    return (u, f) => s.value && y(t).quizMode === "Tutor" ? (g(), M(jo, { key: 0 })) : s.value && y(t).quizMode === "Timed" ? (g(), M(Bo, { key: 1 })) : (g(), M(Sn, {
      key: 2,
      onStartQuiz: a
    }));
  }
}), Nn = {
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
}, _t = async (e, n) => {
};
function xn(e, n = {}) {
  const o = to();
  e.use(o), e.component("CrucibleComponent", Pn), e.provide("$dataLink", n.dataLink || Nn), e.provide(
    "$updateQAttemptCallback",
    n.updateQAttemptCallback || _t
  );
}
export {
  Pn as CrucibleComponent,
  xn as createViewerPlugin,
  Nn as defaultData,
  _t as defaultUpdateQAttemptCallback
};
