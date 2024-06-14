import { effectScope as He, ref as E, markRaw as G, toRaw as _e, hasInjectionContext as St, inject as Fe, getCurrentInstance as Tt, watch as Be, unref as S, reactive as wt, isRef as ae, isReactive as $e, toRef as ye, nextTick as Ie, computed as Oe, getCurrentScope as Ct, onScopeDispose as Et, toRefs as Le, defineComponent as P, openBlock as h, createElementBlock as _, Fragment as U, normalizeClass as H, createElementVNode as p, toDisplayString as Q, renderList as ee, createVNode as te, createBlock as j, createCommentVNode as q, pushScopeId as We, popScopeId as Ge, onMounted as Ve, resolveComponent as kt, onBeforeMount as Je, createTextVNode as Ye, watchEffect as Qt, withDirectives as Ae, vModelText as $t, vModelSelect as Ot } from "vue";
var Ke = !1;
function fe(e, n, o) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, n), e.splice(n, 1, o), o) : (e[n] = o, o);
}
function Se(e, n) {
  if (Array.isArray(e)) {
    e.splice(n, 1);
    return;
  }
  delete e[n];
}
function Vt() {
  return Xe().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Xe() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const qt = typeof Proxy == "function", Pt = "devtools-plugin:setup", Nt = "plugin:settings:set";
let K, we;
function It() {
  var e;
  return K !== void 0 || (typeof window < "u" && window.performance ? (K = !0, we = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (K = !0, we = globalThis.perf_hooks.performance) : K = !1), K;
}
function Lt() {
  return It() ? we.now() : Date.now();
}
class At {
  constructor(n, o) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = n, this.hook = o;
    const t = {};
    if (n.settings)
      for (const r in n.settings) {
        const a = n.settings[r];
        t[r] = a.defaultValue;
      }
    const s = `__vue-devtools-plugin-settings__${n.id}`;
    let i = Object.assign({}, t);
    try {
      const r = localStorage.getItem(s), a = JSON.parse(r);
      Object.assign(i, a);
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
        return Lt();
      }
    }, o && o.on(Nt, (r, a) => {
      r === this.plugin.id && this.fallbacks.setSettings(a);
    }), this.proxiedOn = new Proxy({}, {
      get: (r, a) => this.target ? this.target.on[a] : (...c) => {
        this.onQueue.push({
          method: a,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (r, a) => this.target ? this.target[a] : a === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(a) ? (...c) => (this.targetQueue.push({
        method: a,
        args: c,
        resolve: () => {
        }
      }), this.fallbacks[a](...c)) : (...c) => new Promise((u) => {
        this.targetQueue.push({
          method: a,
          args: c,
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
  const o = e, t = Xe(), s = Vt(), i = qt && o.enableEarlyProxy;
  if (s && (t.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    s.emit(Pt, e, n);
  else {
    const r = i ? new At(o, s) : null;
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
const ve = typeof window < "u", re = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && ve, xe = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function xt(e, { autoBom: n = !1 } = {}) {
  return n && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function qe(e, n, o) {
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
const me = typeof navigator == "object" ? navigator : { userAgent: "" }, ot = /Macintosh/.test(me.userAgent) && /AppleWebKit/.test(me.userAgent) && !/Safari/.test(me.userAgent), nt = ve ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !ot ? Mt : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in me ? jt : (
      // Fallback to using FileReader and a popup
      Dt
    )
  )
) : () => {
};
function Mt(e, n = "download", o) {
  const t = document.createElement("a");
  t.download = n, t.rel = "noopener", typeof e == "string" ? (t.href = e, t.origin !== location.origin ? tt(t.href) ? qe(e, n, o) : (t.target = "_blank", he(t)) : he(t)) : (t.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(t.href);
  }, 4e4), setTimeout(function() {
    he(t);
  }, 0));
}
function jt(e, n = "download", o) {
  if (typeof e == "string")
    if (tt(e))
      qe(e, n, o);
    else {
      const t = document.createElement("a");
      t.href = e, t.target = "_blank", setTimeout(function() {
        he(t);
      });
    }
  else
    navigator.msSaveOrOpenBlob(xt(e, o), n);
}
function Dt(e, n, o, t) {
  if (t = t || open("", "_blank"), t && (t.document.title = t.document.body.innerText = "downloading..."), typeof e == "string")
    return qe(e, n, o);
  const s = e.type === "application/octet-stream", i = /constructor/i.test(String(xe.HTMLElement)) || "safari" in xe, r = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((r || s && i || ot) && typeof FileReader < "u") {
    const a = new FileReader();
    a.onloadend = function() {
      let c = a.result;
      if (typeof c != "string")
        throw t = null, new Error("Wrong reader.result type");
      c = r ? c : c.replace(/^data:[^;]*;/, "data:attachment/file;"), t ? t.location.href = c : location.assign(c), t = null;
    }, a.readAsDataURL(e);
  } else {
    const a = URL.createObjectURL(e);
    t ? t.location.assign(a) : location.href = a, t = null, setTimeout(function() {
      URL.revokeObjectURL(a);
    }, 4e4);
  }
}
function k(e, n) {
  const o = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(o, n) : n === "error" ? console.error(o) : n === "warn" ? console.warn(o) : console.log(o);
}
function Pe(e) {
  return "_a" in e && "install" in e;
}
function st() {
  if (!("clipboard" in navigator))
    return k("Your browser doesn't support the Clipboard API", "error"), !0;
}
function it(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (k('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function zt(e) {
  if (!st())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), k("Global state copied to clipboard.");
    } catch (n) {
      if (it(n))
        return;
      k("Failed to serialize the state. Check the console for more details.", "error"), console.error(n);
    }
}
async function Rt(e) {
  if (!st())
    try {
      rt(e, JSON.parse(await navigator.clipboard.readText())), k("Global state pasted from clipboard.");
    } catch (n) {
      if (it(n))
        return;
      k("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(n);
    }
}
async function Ut(e) {
  try {
    nt(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (n) {
    k("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(n);
  }
}
let R;
function Ht() {
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
async function Ft(e) {
  try {
    const o = await Ht()();
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
const at = "🍍 Pinia (root)", Ce = "_root";
function Bt(e) {
  return Pe(e) ? {
    id: Ce,
    label: at
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Wt(e) {
  if (Pe(e)) {
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
          value: r._getters.reduce((a, c) => (a[c] = r[c], a), {})
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
function Gt(e) {
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
let Z = !0;
const ge = [], W = "pinia:mutations", $ = "pinia", { assign: Yt } = Object, be = (e) => "🍍 " + e;
function Kt(e, n) {
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
            zt(n);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await Rt(n), o.sendInspectorTree($), o.sendInspectorState($);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            Ut(n);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Ft(n), o.sendInspectorTree($), o.sendInspectorState($);
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
        Object.values(r).forEach((a) => {
          t.instanceData.state.push({
            type: be(a.$id),
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
              Object.keys(a.$state).reduce((c, u) => (c[u] = a.$state[u], c), {})
            )
          }), a._getters && a._getters.length && t.instanceData.state.push({
            type: be(a.$id),
            key: "getters",
            editable: !1,
            value: a._getters.reduce((c, u) => {
              try {
                c[u] = a[u];
              } catch (m) {
                c[u] = m;
              }
              return c;
            }, {})
          });
        });
      }
    }), o.on.getInspectorTree((t) => {
      if (t.app === e && t.inspectorId === $) {
        let s = [n];
        s = s.concat(Array.from(n._s.values())), t.rootNodes = (t.filter ? s.filter((i) => "$id" in i ? i.$id.toLowerCase().includes(t.filter.toLowerCase()) : at.toLowerCase().includes(t.filter.toLowerCase())) : s).map(Bt);
      }
    }), o.on.getInspectorState((t) => {
      if (t.app === e && t.inspectorId === $) {
        const s = t.nodeId === Ce ? n : n._s.get(t.nodeId);
        if (!s)
          return;
        s && (t.state = Wt(s));
      }
    }), o.on.editInspectorState((t, s) => {
      if (t.app === e && t.inspectorId === $) {
        const i = t.nodeId === Ce ? n : n._s.get(t.nodeId);
        if (!i)
          return k(`store "${t.nodeId}" not found`, "error");
        const { path: r } = t;
        Pe(i) ? r.unshift("state") : (r.length !== 1 || !i._customProperties.has(r[0]) || r[0] in i.$state) && r.unshift("$state"), Z = !1, t.set(i, r, t.state.value), Z = !0;
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
function Xt(e, n) {
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
    n.$onAction(({ after: r, onError: a, name: c, args: u }) => {
      const m = ct++;
      o.addTimelineEvent({
        layerId: W,
        event: {
          time: t(),
          title: "🛫 " + c,
          subtitle: "start",
          data: {
            store: x(n.$id),
            action: x(c),
            args: u
          },
          groupId: m
        }
      }), r((f) => {
        B = void 0, o.addTimelineEvent({
          layerId: W,
          event: {
            time: t(),
            title: "🛬 " + c,
            subtitle: "end",
            data: {
              store: x(n.$id),
              action: x(c),
              args: u,
              result: f
            },
            groupId: m
          }
        });
      }), a((f) => {
        B = void 0, o.addTimelineEvent({
          layerId: W,
          event: {
            time: t(),
            logType: "error",
            title: "💥 " + c,
            subtitle: "end",
            data: {
              store: x(n.$id),
              action: x(c),
              args: u,
              error: f
            },
            groupId: m
          }
        });
      });
    }, !0), n._customProperties.forEach((r) => {
      Be(() => S(n[r]), (a, c) => {
        o.notifyComponentUpdate(), o.sendInspectorState($), Z && o.addTimelineEvent({
          layerId: W,
          event: {
            time: t(),
            title: "Change",
            subtitle: r,
            data: {
              newValue: a,
              oldValue: c
            },
            groupId: B
          }
        });
      }, { deep: !0 });
    }), n.$subscribe(({ events: r, type: a }, c) => {
      if (o.notifyComponentUpdate(), o.sendInspectorState($), !Z)
        return;
      const u = {
        time: t(),
        title: Jt(a),
        data: Yt({ store: x(n.$id) }, Gt(r)),
        groupId: B
      };
      a === D.patchFunction ? u.subtitle = "⤵️" : a === D.patchObject ? u.subtitle = "🧩" : r && !Array.isArray(r) && (u.subtitle = r.type), r && (u.data["rawEvent(s)"] = {
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
function Me(e, n, o) {
  const t = n.reduce((s, i) => (s[i] = _e(e)[i], s), {});
  for (const s in t)
    e[s] = function() {
      const i = ct, r = o ? new Proxy(e, {
        get(...c) {
          return B = i, Reflect.get(...c);
        },
        set(...c) {
          return B = i, Reflect.set(...c);
        }
      }) : e;
      B = i;
      const a = t[s].apply(r, arguments);
      return B = void 0, a;
    };
}
function Zt({ app: e, store: n, options: o }) {
  if (n.$id.startsWith("__hot:"))
    return;
  n._isOptionsAPI = !!o.state, Me(n, Object.keys(o.actions), n._isOptionsAPI);
  const t = n._hotUpdate;
  _e(n)._hotUpdate = function(s) {
    t.apply(this, arguments), Me(n, Object.keys(s._hmrPayload.actions), !!n._isOptionsAPI);
  }, Xt(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    n
  );
}
function eo() {
  const e = He(!0), n = e.run(() => E({}));
  let o = [], t = [];
  const s = G({
    install(i) {
      ce(s), s._a = i, i.provide(et, s), i.config.globalProperties.$pinia = s, re && Kt(i, s), t.forEach((r) => o.push(r)), t = [];
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
  return re && typeof Proxy < "u" && s.use(Zt), s;
}
function ut(e, n) {
  for (const o in n) {
    const t = n[o];
    if (!(o in e))
      continue;
    const s = e[o];
    J(s) && J(t) && !ae(t) && !$e(t) ? e[o] = ut(s, t) : e[o] = t;
  }
  return e;
}
const lt = () => {
};
function je(e, n, o, t = lt) {
  e.push(n);
  const s = () => {
    const i = e.indexOf(n);
    i > -1 && (e.splice(i, 1), t());
  };
  return !o && Ct() && Et(s), s;
}
function X(e, ...n) {
  e.slice().forEach((o) => {
    o(...n);
  });
}
const to = (e) => e();
function Ee(e, n) {
  e instanceof Map && n instanceof Map && n.forEach((o, t) => e.set(t, o)), e instanceof Set && n instanceof Set && n.forEach(e.add, e);
  for (const o in n) {
    if (!n.hasOwnProperty(o))
      continue;
    const t = n[o], s = e[o];
    J(s) && J(t) && e.hasOwnProperty(o) && !ae(t) && !$e(t) ? e[o] = Ee(s, t) : e[o] = t;
  }
  return e;
}
const oo = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function no(e) {
  return !J(e) || !e.hasOwnProperty(oo);
}
const { assign: I } = Object;
function De(e) {
  return !!(ae(e) && e.effect);
}
function ze(e, n, o, t) {
  const { state: s, actions: i, getters: r } = n, a = o.state.value[e];
  let c;
  function u() {
    !a && (process.env.NODE_ENV === "production" || !t) && (o.state.value[e] = s ? s() : {});
    const m = process.env.NODE_ENV !== "production" && t ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Le(E(s ? s() : {}).value)
    ) : Le(o.state.value[e]);
    return I(m, i, Object.keys(r || {}).reduce((f, b) => (process.env.NODE_ENV !== "production" && b in m && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${b}" in store "${e}".`), f[b] = G(Oe(() => {
      ce(o);
      const v = o._s.get(e);
      return r[b].call(v, v);
    })), f), {}));
  }
  return c = ke(e, u, n, o, t, !0), c;
}
function ke(e, n, o = {}, t, s, i) {
  let r;
  const a = I({ actions: {} }, o);
  if (process.env.NODE_ENV !== "production" && !t._e.active)
    throw new Error("Pinia destroyed");
  const c = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Ke && (c.onTrigger = (d) => {
    u ? v = d : u == !1 && !g._hotUpdating && (Array.isArray(v) ? v.push(d) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let u, m, f = [], b = [], v;
  const O = t.state.value[e];
  !i && !O && (process.env.NODE_ENV === "production" || !s) && (t.state.value[e] = {});
  const oe = E({});
  let le;
  function de(d) {
    let l;
    u = m = !1, process.env.NODE_ENV !== "production" && (v = []), typeof d == "function" ? (d(t.state.value[e]), l = {
      type: D.patchFunction,
      storeId: e,
      events: v
    }) : (Ee(t.state.value[e], d), l = {
      type: D.patchObject,
      payload: d,
      storeId: e,
      events: v
    });
    const y = le = Symbol();
    Ie().then(() => {
      le === y && (u = !0);
    }), m = !0, X(f, l, t.state.value[e]);
  }
  const T = i ? function() {
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
  function w() {
    r.stop(), f = [], b = [], t._s.delete(e);
  }
  function C(d, l) {
    return function() {
      ce(t);
      const y = Array.from(arguments), V = [], ne = [];
      function vt(N) {
        V.push(N);
      }
      function yt(N) {
        ne.push(N);
      }
      X(b, {
        args: y,
        name: d,
        store: g,
        after: vt,
        onError: yt
      });
      let se;
      try {
        se = l.apply(this && this.$id === e ? this : g, y);
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
    $onAction: je.bind(null, b),
    $patch: de,
    $reset: T,
    $subscribe(d, l = {}) {
      const y = je(f, d, l.detached, () => V()), V = r.run(() => Be(() => t.state.value[e], (ne) => {
        (l.flush === "sync" ? m : u) && d({
          storeId: e,
          type: D.direct,
          events: v
        }, ne);
      }, I({}, c, l)));
      return y;
    },
    $dispose: w
  }, g = wt(process.env.NODE_ENV !== "production" || re ? I(
    {
      _hmrPayload: A,
      _customProperties: G(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    Y
    // must be added later
    // setupStore
  ) : Y);
  t._s.set(e, g);
  const F = (t._a && t._a.runWithContext || to)(() => t._e.run(() => (r = He()).run(n)));
  for (const d in F) {
    const l = F[d];
    if (ae(l) && !De(l) || $e(l))
      process.env.NODE_ENV !== "production" && s ? fe(oe.value, d, ye(F, d)) : i || (O && no(l) && (ae(l) ? l.value = O[d] : Ee(l, O[d])), t.state.value[e][d] = l), process.env.NODE_ENV !== "production" && A.state.push(d);
    else if (typeof l == "function") {
      const y = process.env.NODE_ENV !== "production" && s ? l : C(d, l);
      F[d] = y, process.env.NODE_ENV !== "production" && (A.actions[d] = l), a.actions[d] = l;
    } else process.env.NODE_ENV !== "production" && De(l) && (A.getters[d] = i ? (
      // @ts-expect-error
      o.getters[d]
    ) : l, ve && (F._getters || // @ts-expect-error: same
    (F._getters = G([]))).push(d));
  }
  if (I(g, F), I(_e(g), F), Object.defineProperty(g, "$state", {
    get: () => process.env.NODE_ENV !== "production" && s ? oe.value : t.state.value[e],
    set: (d) => {
      if (process.env.NODE_ENV !== "production" && s)
        throw new Error("cannot set hotState");
      de((l) => {
        I(l, d);
      });
    }
  }), process.env.NODE_ENV !== "production" && (g._hotUpdate = G((d) => {
    g._hotUpdating = !0, d._hmrPayload.state.forEach((l) => {
      if (l in g.$state) {
        const y = d.$state[l], V = g.$state[l];
        typeof y == "object" && J(y) && J(V) ? ut(y, V) : d.$state[l] = V;
      }
      fe(g, l, ye(d.$state, l));
    }), Object.keys(g.$state).forEach((l) => {
      l in d.$state || Se(g, l);
    }), u = !1, m = !1, t.state.value[e] = ye(d._hmrPayload, "hotState"), m = !0, Ie().then(() => {
      u = !0;
    });
    for (const l in d._hmrPayload.actions) {
      const y = d[l];
      fe(g, l, C(l, y));
    }
    for (const l in d._hmrPayload.getters) {
      const y = d._hmrPayload.getters[l], V = i ? (
        // special handling of options api
        Oe(() => (ce(t), y.call(g, g)))
      ) : y;
      fe(g, l, V);
    }
    Object.keys(g._hmrPayload.getters).forEach((l) => {
      l in d._hmrPayload.getters || Se(g, l);
    }), Object.keys(g._hmrPayload.actions).forEach((l) => {
      l in d._hmrPayload.actions || Se(g, l);
    }), g._hmrPayload = d._hmrPayload, g._getters = d._getters, g._hotUpdating = !1;
  })), re) {
    const d = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((l) => {
      Object.defineProperty(g, l, I({ value: g[l] }, d));
    });
  }
  return t._p.forEach((d) => {
    if (re) {
      const l = r.run(() => d({
        store: g,
        app: t._a,
        pinia: t,
        options: a
      }));
      Object.keys(l || {}).forEach((y) => g._customProperties.add(y)), I(g, l);
    } else
      I(g, r.run(() => d({
        store: g,
        app: t._a,
        pinia: t,
        options: a
      })));
  }), process.env.NODE_ENV !== "production" && g.$state && typeof g.$state == "object" && typeof g.$state.constructor == "function" && !g.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${g.$id}".`), O && i && o.hydrate && o.hydrate(g.$state, O), u = !0, m = !0, g;
}
function so(e, n, o) {
  let t, s;
  const i = typeof n == "function";
  t = e, s = i ? o : n;
  function r(a, c) {
    const u = St();
    if (a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && ie && ie._testing ? null : a) || (u ? Fe(et, null) : null), a && ce(a), process.env.NODE_ENV !== "production" && !ie)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    a = ie, a._s.has(t) || (i ? ke(t, n, s, a) : ze(t, s, a), process.env.NODE_ENV !== "production" && (r._pinia = a));
    const m = a._s.get(t);
    if (process.env.NODE_ENV !== "production" && c) {
      const f = "__hot:" + t, b = i ? ke(f, n, s, a, !0) : ze(f, I({}, s), a, !0);
      c._hotUpdate(b), delete a.state.value[f], a._s.delete(f);
    }
    if (process.env.NODE_ENV !== "production" && ve) {
      const f = Tt();
      if (f && f.proxy && // avoid adding stores that are just built for hot module replacement
      !c) {
        const b = f.proxy, v = "_pStores" in b ? b._pStores : b._pStores = {};
        v[t] = m;
      }
    }
    return m;
  }
  return r.$id = t, r;
}
const io = ["id", "checked"], ro = ["for", "innerHTML"], ao = /* @__PURE__ */ P({
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
    return (s, i) => (h(), _(U, null, [
      (h(), _("input", {
        id: "option-" + s.optionKey,
        key: s.optionKey,
        "test-id": "radio_options",
        type: "radio",
        name: "options",
        checked: s.checked,
        class: H(s.submitted && "ignore-hover")
      }, null, 10, io)),
      (h(), _("label", {
        key: s.optionKey,
        for: "option-" + s.optionKey,
        class: H(s.submitted ? "mcq-option-label ignore-hover" : "mcq-option-label"),
        onClick: i[0] || (i[0] = (r) => t()),
        innerHTML: s.option.optionValue
      }, null, 10, ro))
    ], 64));
  }
}), M = (e, n) => {
  const o = e.__vccOpts || e;
  for (const [t, s] of n)
    o[t] = s;
  return o;
}, co = /* @__PURE__ */ M(ao, [["__scopeId", "data-v-fdbfedc6"]]), uo = ["disabled"], lo = /* @__PURE__ */ P({
  __name: "MCQButton",
  props: {
    submitted: { type: Boolean },
    selectedOption: {},
    hideSkip: { type: Boolean }
  },
  emits: ["submitAnswer", "nextQuestion", "skipQuestion"],
  setup(e, { emit: n }) {
    const o = E("skip"), t = E("Skip"), s = n, i = (c, u) => {
      !c && u ? r("next", "Next", "submitAnswer") : c && u ? r("skip", "Skip", "nextQuestion") : !c && !u && r("skip", "Skip", "skipQuestion");
    }, r = (c, u, m) => {
      o.value = c, t.value = u, s(m);
    }, a = (c, u) => c && u ? { class: "next", text: "Next" } : !c && u ? { class: "submit", text: "Submit" } : { class: o.value, text: t.value };
    return (c, u) => (h(), _("div", null, [
      p("button", {
        disabled: c.hideSkip && a(c.submitted, c.selectedOption).class === "skip",
        class: H(["mcq-button", a(c.submitted, c.selectedOption).class]),
        onClick: u[0] || (u[0] = (m) => i(c.submitted, c.selectedOption))
      }, Q(a(c.submitted, c.selectedOption).text), 11, uo)
    ]));
  }
}), fo = /* @__PURE__ */ M(lo, [["__scopeId", "data-v-847b8dd5"]]), po = /* @__PURE__ */ P({
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
    return (r, a) => (h(), _("div", null, [
      p("button", {
        class: H(r.buttonName === "Submit" ? "submit_btn" : "mcq-button"),
        onClick: a[0] || (a[0] = (c) => s())
      }, Q(r.buttonName), 3)
    ]));
  }
}), Re = /* @__PURE__ */ M(po, [["__scopeId", "data-v-8be7f61e"]]), ho = (e) => {
  for (let n = e.length - 1; n > 0; n--) {
    const o = Math.floor(Math.random() * (n + 1));
    [e[n], e[o]] = [e[o], e[n]];
  }
  return e;
}, mo = (e, n) => ho(n).slice(0, e);
function dt(e) {
  const n = e.reduce(
    (t, s) => (Object.keys(s).forEach((i) => {
      i.trim() !== "" && (t[i] || (t[i] = /* @__PURE__ */ new Set()), s[i].forEach((a) => t[i].add(a)));
    }), t),
    {}
  );
  return Object.keys(n).reduce(
    (t, s) => (t[s] = [...n[s]], t),
    {}
  );
}
function Ne(e, n) {
  return e.filter((o) => Object.keys(n).every((t) => {
    if (!n[t].length)
      return !0;
    const s = o.tags[t];
    if (s)
      return s.some((i) => n[t].includes(i));
  }));
}
function go(e, n, o) {
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
const ft = (e, n) => n.findIndex((o) => {
  var t;
  return ((t = o.question._id) == null ? void 0 : t.$oid) === e;
}), z = so("questionsQueue", {
  state: () => ({
    allQs: [],
    questionsQueue: [],
    questionsStack: [],
    quizStats: [],
    quizMode: "Tutor",
    selectedTags: { course: [] },
    timeLimit: 60,
    // default time limit 1 min per qs
    AnsweredQuesiton: 0
  }),
  actions: {
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
      return Ne(e, this.selectedTags).length;
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
      const t = ft(e, this.quizStats);
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
}), _o = ["innerHTML"], vo = { class: "mcq-list" }, yo = ["onClick"], So = { class: "next-prev-question" }, To = /* @__PURE__ */ P({
  __name: "MCQQuestion",
  props: {
    _id: {},
    statement: {},
    optionsList: {}
  },
  emits: ["nextQuestion", "skipQuestion", "prevQuestion"],
  setup(e, { emit: n }) {
    const o = z(), t = E(null), s = E(!1), i = n, r = E(o.getRemainingQuestions()), a = () => {
      s.value = !0;
    }, c = () => {
      t.value = null, i("nextQuestion");
    }, u = () => {
      b(), r.value = o.getRemainingQuestions(), i("nextQuestion");
    }, m = () => {
      b(), i("skipQuestion");
    }, f = (T) => o.incrementStat(
      T.$oid,
      "attempts",
      t.value ?? void 0
    ), b = () => {
      s.value = !1, t.value = null;
    }, v = () => {
      t.value = null, i("prevQuestion");
    }, O = (T, w) => {
      s.value || (t.value = t.value === w ? null : w), f(T);
    }, oe = (T, w, C) => o.quizMode === "Timed" ? le(T, w) : de(w, C);
    function le(T, w) {
      const C = ft(T.$oid, o.quizStats), A = o.quizStats[C].selectedValue, Y = bo(
        o.quizStats,
        C,
        A
      );
      return String(Y) === w ? (t.value = w, "selected") : "";
    }
    function de(T, w) {
      const C = w[parseInt(T)], A = t.value === T;
      return s.value ? C.optionCorrect ? "correct ignore-hover" : A ? "wrong ignore-hover" : "ignore-hover" : A ? "selected" : "";
    }
    return (T, w) => (h(), _(U, null, [
      p("div", {
        class: "mcq-statement",
        innerHTML: T.statement
      }, null, 8, _o),
      p("div", vo, [
        (h(!0), _(U, null, ee(Object.entries(T.optionsList), ([C, A]) => (h(), _("div", {
          key: C,
          class: H(["mcq-option", oe(T._id, C, T.optionsList)]),
          onClick: (Y) => O(T._id, C)
        }, [
          te(co, {
            "option-key": C,
            checked: t.value === C,
            option: A,
            submitted: s.value,
            onSelectOption: (Y) => O(T._id, C)
          }, null, 8, ["option-key", "checked", "option", "submitted", "onSelectOption"])
        ], 10, yo))), 128))
      ]),
      S(o).quizMode === "Tutor" ? (h(), j(fo, {
        key: 0,
        submitted: s.value,
        "selected-option": t.value,
        "hide-skip": r.value <= 1,
        onSubmitAnswer: a,
        onNextQuestion: w[0] || (w[0] = (C) => u()),
        onSkipQuestion: m
      }, null, 8, ["submitted", "selected-option", "hide-skip"])) : q("", !0),
      p("div", So, [
        S(o).quizMode === "Timed" ? (h(), j(Re, {
          key: 0,
          "button-name": S(o).questionsQueue.length >= 1 ? "→" : "Submit",
          onNextQuestion: w[1] || (w[1] = (C) => c())
        }, null, 8, ["button-name"])) : q("", !0),
        S(o).quizMode === "Timed" && S(o).questionsStack.length > 1 ? (h(), j(Re, {
          key: 1,
          "button-name": "←",
          onPrevQuestion: w[2] || (w[2] = (C) => v())
        })) : q("", !0)
      ])
    ], 64));
  }
}), pt = /* @__PURE__ */ M(To, [["__scopeId", "data-v-181a554c"]]), wo = (e) => (We("data-v-4ffecbcd"), e = e(), Ge(), e), Co = { class: "report-container" }, Eo = { class: "mcq-report" }, ko = { class: "table-container" }, Qo = /* @__PURE__ */ wo(() => /* @__PURE__ */ p("thead", null, [
  /* @__PURE__ */ p("tr", null, [
    /* @__PURE__ */ p("th", null, "question"),
    /* @__PURE__ */ p("th", null, "correct option"),
    /* @__PURE__ */ p("th", null, "your answer")
  ])
], -1)), $o = { class: "question-row" }, Oo = ["href", "innerHTML"], Vo = { class: "answer-row" }, qo = ["innerHTML"], Po = { class: "answer-row" }, No = ["innerHTML"], Io = { class: "mcq-result" }, Lo = { class: "score" }, Ao = /* @__PURE__ */ P({
  __name: "MCQStatus",
  setup(e) {
    const n = z(), o = n.quizStats, t = n.quizStats.length, s = o.filter((r) => r.correct === 1).length, i = (s * 100 / t).toFixed(0);
    return (r, a) => (h(), _("div", Co, [
      p("div", Eo, [
        p("div", ko, [
          p("table", null, [
            Qo,
            p("tbody", null, [
              (h(!0), _(U, null, ee(Object.entries(S(o)), ([c, u]) => (h(), _("tr", {
                key: c,
                class: "quiz-statment"
              }, [
                p("td", $o, [
                  p("a", {
                    href: u.question.link,
                    target: "_blank",
                    innerHTML: u.question.statement
                  }, null, 8, Oo)
                ]),
                p("td", Vo, [
                  (h(!0), _(U, null, ee(Object.entries(
                    u.question.optionsList
                  ), ([m, f]) => (h(), _("span", { key: m }, [
                    f.optionCorrect ? (h(), _("span", {
                      key: 0,
                      innerHTML: f.optionValue
                    }, null, 8, qo)) : q("", !0)
                  ]))), 128))
                ]),
                p("td", Po, [
                  p("span", {
                    class: H(
                      u.correct === 1 ? "correct-answer" : "wrong-answer"
                    ),
                    innerHTML: u.correct === 1 ? "<span> ✔</span> " : "<span> ✘</span> <span>     </span>" + u.selectedValue
                  }, null, 10, No)
                ])
              ]))), 128))
            ])
          ])
        ])
      ]),
      p("div", null, [
        p("div", Io, [
          p("span", Lo, "⌛ Result: " + Q(S(s)) + " out of " + Q(S(t)) + " - (" + Q(S(i)) + " %)", 1)
        ])
      ])
    ]));
  }
}), ht = /* @__PURE__ */ M(Ao, [["__scopeId", "data-v-4ffecbcd"]]), xo = { class: "questions-left-header" }, Mo = /* @__PURE__ */ P({
  __name: "MCQQuiz",
  setup(e) {
    const n = E(), o = z();
    Ve(() => {
      s();
    });
    const t = () => {
      o.enqueueQuestion(n.value), n.value = o.dequeueQuestion();
    }, s = () => {
      o.setAnsweredQuestionsNum(), n.value = o.dequeueQuestion();
    }, i = () => window.location.reload();
    return (r, a) => {
      const c = kt("MCQInfoPanel");
      return h(), _("main", null, [
        te(c),
        p("h3", xo, " Question " + Q(S(o).getAnsweredQuestionsNum()) + " out of " + Q(S(o).quizStats.length), 1),
        n.value ? (h(), j(pt, {
          key: 0,
          statement: n.value.statement,
          "options-list": n.value.optionsList,
          _id: n.value._id,
          onNextQuestion: s,
          onSkipQuestion: t
        }, null, 8, ["statement", "options-list", "_id"])) : q("", !0),
        n.value ? q("", !0) : (h(), j(ht, { key: 1 })),
        n.value ? q("", !0) : (h(), _("button", {
          key: 2,
          class: "btn-relocate",
          onClick: i
        }, " End "))
      ]);
    };
  }
}), jo = /* @__PURE__ */ M(Mo, [["__scopeId", "data-v-edc7c7f1"]]), Do = {
  key: 0,
  class: "time-left-header"
}, zo = { class: "questions-left-header" }, Ro = /* @__PURE__ */ P({
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
    return (t, s) => (h(), _(U, null, [
      e.timeLeft ? (h(), _("h3", Do, " Time left: " + Q(o(e.timeLeft)), 1)) : q("", !0),
      p("h3", zo, " Question " + Q(S(n).questionsStack.length) + " out of " + Q(S(n).quizStats.length), 1)
    ], 64));
  }
}), Ue = 1e3, Uo = "-1", Ho = /* @__PURE__ */ P({
  __name: "MCQTimedQuiz",
  setup(e) {
    const n = z(), o = E();
    let t = null, s = null;
    const i = E(n.timeLimit);
    Ve(() => {
      a();
    }), Je(() => {
      u(), m();
    });
    const r = () => {
      o.value = n.removeFromLastHistory() ?? o.value;
    }, a = () => o.value = n.dequeueQuestion(), c = () => window.location.reload(), u = () => {
      t && clearTimeout(t), s && clearInterval(s);
    }, m = () => {
      i.value = n.timeLimit;
      const b = () => o.value ? i.value ? i.value-- : f() : u();
      s = window.setInterval(b, Ue), t = window.setTimeout(() => {
      }, n.timeLimit * Ue);
    }, f = () => {
      var v;
      u();
      const b = (O) => n.incrementStat(O, "attempts", Uo);
      for (b(((v = o.value) == null ? void 0 : v._id.$oid) ?? ""); o.value = n.dequeueQuestion(); )
        b(o.value._id.$oid);
      return alert("Time's up! Quiz has ended."), a();
    };
    return (b, v) => (h(), _("main", null, [
      te(Ro, { "time-left": i.value }, null, 8, ["time-left"]),
      o.value ? (h(), j(pt, {
        key: 0,
        statement: o.value.statement,
        "options-list": o.value.optionsList,
        _id: o.value._id,
        onNextQuestion: a,
        onPrevQuestion: r
      }, null, 8, ["statement", "options-list", "_id"])) : q("", !0),
      o.value ? q("", !0) : (h(), j(ht, { key: 1 })),
      o.value ? q("", !0) : (h(), _("button", {
        key: 2,
        class: "btn-relocate",
        onClick: c
      }, " End "))
    ]));
  }
}), Fo = /* @__PURE__ */ M(Ho, [["__scopeId", "data-v-4fd74e68"]]), Bo = ["id", "name", "value", "disabled"], Wo = ["for"], Go = {
  key: 0,
  class: "question-number"
}, Jo = /* @__PURE__ */ P({
  __name: "FilterCheckbox",
  props: {
    category: {},
    topics: {}
  },
  setup(e) {
    const { category: n, topics: o } = e, t = z(), s = (c) => n === "course" ? c.toUpperCase() : c, i = Oe(
      () => Object.entries(o).map(([c, u]) => {
        const m = a(u, n), f = go(
          t.allQs,
          u,
          n
        ).length.toString();
        return { idx: c, topic: u, num: m, questionamount: f };
      }).filter(({ topic: c }) => c !== void 0)
    ), r = (c) => {
      if (!(c.target instanceof HTMLInputElement))
        return console.error("Trying to click on non-input element");
      const u = c.target.name, m = c.target.value;
      t.modifySelectedTags(c.target.checked, { category: u, topic: m });
    }, a = (c, u) => {
      var v;
      const m = t.getselectedtags();
      if (!m[u] || (v = m[u]) != null && v.includes(
        c
      ))
        return null;
      const f = JSON.parse(
        JSON.stringify(t.getselectedtags())
      );
      f[u].includes(c) || f[u].push(c);
      const b = t.allQs;
      return Ne(
        b,
        f
      ).length.toString();
    };
    return (c, u) => (h(), _("ul", null, [
      (h(!0), _(U, null, ee(i.value, ({ idx: m, num: f, topic: b, questionamount: v }) => (h(), _("li", {
        key: m,
        class: H(["filter-options", { "grey-out": f === "0" }])
      }, [
        p("input", {
          id: `${c.category}-${b}-checkbox`,
          type: "checkbox",
          name: c.category,
          value: b,
          disabled: f === "0",
          onChange: u[0] || (u[0] = (O) => r(O))
        }, null, 40, Bo),
        p("label", {
          for: `${c.category}-${b}-checkbox`
        }, [
          Ye(Q(s(b)) + " ", 1),
          f !== null && f !== "0" ? (h(), _("span", Go, Q(v), 1)) : q("", !0)
        ], 8, Wo)
      ], 2))), 128))
    ]));
  }
}), Yo = /* @__PURE__ */ M(Jo, [["__scopeId", "data-v-43544b02"]]), Ko = { class: "filter" }, Xo = { class: "category-heading" }, Zo = /* @__PURE__ */ P({
  __name: "MCQTagOptions",
  setup(e) {
    const t = z().allQs.map((i) => i.tags), s = dt(t);
    return (i, r) => (h(), _("div", Ko, [
      (h(!0), _(U, null, ee(Object.entries(S(s)), ([a, c]) => (h(), _("div", {
        key: a,
        class: "category"
      }, [
        p("h2", Xo, Q(a), 1),
        te(Yo, {
          category: a,
          topics: c
        }, null, 8, ["category", "topics"])
      ]))), 128))
    ]));
  }
}), en = /* @__PURE__ */ M(Zo, [["__scopeId", "data-v-efaccb2c"]]), tn = { for: "optionName" }, on = ["value"], nn = /* @__PURE__ */ P({
  __name: "DropDownbox",
  props: {
    options: {},
    optionName: {},
    disabled: { type: Boolean }
  },
  setup(e) {
    const n = z(), o = E(0);
    function t(s) {
      const i = s.target;
      i.value && (o.value = parseFloat(i.value) * 60, n.setTimeLimit(o.value));
    }
    return (s, i) => (h(), _("div", {
      class: H(s.disabled ? "dropdown input-disabled" : "dropdown")
    }, [
      p("label", tn, Q(s.optionName) + ":   ", 1),
      p("select", {
        id: "optionName",
        name: "optionName",
        onChange: t
      }, [
        (h(!0), _(U, null, ee(s.options, (r) => (h(), _("option", {
          key: r.value,
          value: r.value
        }, Q(r.value) + " " + Q(r.unit), 9, on))), 128))
      ], 32)
    ], 2));
  }
}), sn = /* @__PURE__ */ M(nn, [["__scopeId", "data-v-5f3ae97a"]]), ue = (e) => (We("data-v-c3d686ea"), e = e(), Ge(), e), rn = { class: "start-page-container" }, an = /* @__PURE__ */ ue(() => /* @__PURE__ */ p("h1", null, "VetCloud Smart Quiz", -1)), cn = { class: "quiz-config-container" }, un = { class: "question-config-container" }, ln = { class: "tag-text" }, dn = { class: "question-number" }, fn = { class: "question-amount-container" }, pn = /* @__PURE__ */ ue(() => /* @__PURE__ */ p("label", { for: "question-amount" }, "Select the amount of questions:", -1)), hn = ["max"], mn = {
  key: 0,
  class: "show-max-msg"
}, gn = /* @__PURE__ */ ue(() => /* @__PURE__ */ p("label", { for: "mode-select" }, "Select mode:", -1)), bn = /* @__PURE__ */ ue(() => /* @__PURE__ */ p("option", { value: "Tutor" }, "Tutor", -1)), _n = /* @__PURE__ */ ue(() => /* @__PURE__ */ p("option", { value: "Timed" }, "Timed", -1)), vn = [
  bn,
  _n
], yn = 3e3, Sn = /* @__PURE__ */ P({
  __name: "StartPage",
  emits: ["start-quiz"],
  setup(e, { emit: n }) {
    const o = E(1), t = E("Tutor"), s = E(!1), i = E(null), r = n, a = z();
    Ve(() => {
      Qt(() => {
        const m = a.getquestionnumber();
        o.value = Math.min(10, m);
      });
    });
    const c = () => {
      r("start-quiz", {
        questionAmount: o.value,
        mode: t.value
      });
    }, u = () => {
      i.value && clearTimeout(i.value), o.value > a.getquestionnumber() && (o.value = a.getquestionnumber(), s.value = !0, i.value = window.setTimeout(() => {
        s.value = !1;
      }, yn));
    };
    return (m, f) => (h(), _("div", rn, [
      an,
      te(en),
      p("div", cn, [
        p("div", un, [
          p("p", ln, [
            Ye(" Maximum possible questions: "),
            p("span", dn, Q(S(a).getquestionnumber()), 1)
          ]),
          p("div", fn, [
            pn,
            Ae(p("input", {
              id: "question-amount",
              "onUpdate:modelValue": f[0] || (f[0] = (b) => o.value = b),
              type: "number",
              placeholder: "Question amount",
              min: "1",
              max: S(a).getquestionnumber(),
              onInput: u
            }, null, 40, hn), [
              [
                $t,
                o.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          s.value ? (h(), _("p", mn, " Cannot select more than " + Q(S(a).getquestionnumber()) + " questions. ", 1)) : q("", !0),
          p("div", null, [
            gn,
            Ae(p("select", {
              id: "mode-select",
              "onUpdate:modelValue": f[1] || (f[1] = (b) => t.value = b)
            }, vn, 512), [
              [Ot, t.value]
            ])
          ]),
          te(sn, {
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
      p("button", {
        class: "start-button",
        onClick: c
      }, "Start")
    ]));
  }
}), Tn = /* @__PURE__ */ M(Sn, [["__scopeId", "data-v-c3d686ea"]]), wn = (e) => e.trim().toLowerCase().replace("_", " "), Cn = (e) => e.reduce((n, o) => {
  if (!o.includes(":")) return n;
  let [t, s] = o.split(":");
  return [t, s] = [t.trim().toLowerCase(), wn(s)], n[t] ? n[t] = [...n[t], s] : n[t] = [s], n;
}, {}), En = (e) => e.map((n) => ({
  _id: { $oid: n._id.$oid },
  statement: n.statement,
  tags: Cn(n.tags),
  optionsList: n.optionsList,
  link: n.link
})), mt = { convertQuestions: En }, kn = [
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
  isArray: (r, a) => Array.isArray(r) && r.every(a),
  isNumber: (r) => typeof r == "number",
  isFunction: (r) => typeof r == "function"
};
function Qe(e) {
  const n = e.includes(":") && e.split(":").length === 2, o = !e.includes(":") && !e.includes(" ");
  return n || o;
}
function gt(e, n = !1) {
  return L.isArray(e, L.isString) ? n ? e.every(Qe) : e.some(Qe) : !1;
}
function Qn(e) {
  return L.isObject(e) && L.isString(e.optionValue) && (e.optionCorrect === void 0 || L.isBoolean(e.optionCorrect));
}
function bt(e) {
  return L.isObject(e) && L.isObject(e._id) && // Assuming _id is an object with $oid property
  L.isString(e._id.$oid) && L.isString(e.statement) && gt(e.tags) && // Modified to ensure tags are always checked
  L.isArray(e.optionsList, Qn) && L.isString(e.link);
}
function $n(e) {
  return L.isArray(e, bt);
}
const pe = {
  isMCQuestion: bt,
  isMCQuestionArray: $n,
  validateTags: gt,
  isTag: Qe
}, On = (e) => {
  try {
    if (!e)
      throw new Error("No question data found. Please Try again later.");
    return mt.convertQuestions(_t(e));
  } catch (n) {
    return alert(n), [];
  }
}, Vn = () => kn, qn = () => {
  const e = Vn();
  return mt.convertQuestions(_t(e));
};
function _t(e) {
  pe.isMCQuestionArray(e) ? console.info(
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
    if (!pe.isMCQuestion(s))
      return { ...t, invalidQs: t.invalidQs + 1 };
    let { tags: i } = s;
    if (!i || Array.isArray(i) && !i.length)
      return { ...t, noTags: t.noTags + 1 };
    const r = t.totalTags + i.length;
    if (!pe.validateTags(i, !0)) {
      const a = i.filter((u) => pe.isTag(u)), c = t.invalidTags + i.length - a.length;
      return i = a, { ...t, invalidTags: c, totalTags: r };
    }
    return { ...t, totalTags: r };
  }, n);
  return Pn(o, e.length), e;
}
function Te(e, n) {
  e && console.warn(n, "color: #FF0000");
}
function Pn(e, n) {
  const { invalidQs: o, invalidTags: t, noTags: s, totalTags: i } = e;
  Te(
    o,
    `Invalid Questions Received: %c${o} out of ${n}`
  ), Te(
    t,
    `Filtering out invalid tags: %c${t} out of ${i}`
  ), Te(s, `Questions with no tags: %c${s}`);
}
const Nn = /* @__PURE__ */ P({
  __name: "CrucibleComponent",
  setup(e) {
    const n = E(0), o = z(), t = E(!1), s = E([]), i = Fe("$dataLink");
    Je(() => {
      s.value = i ? On(i.data.questions) : qn(), o.allQs = s.value;
      const a = dt(
        s.value.map((c) => c.tags)
      );
      o.setselectedTags(
        Object.keys(a).reduce((c, u) => ({ ...c, [u]: [] }), {})
      );
    });
    const r = ({ questionAmount: a, mode: c }) => {
      const u = o.getselectedtags();
      if (!s.value.length)
        return alert("Trouble fetching questions, please try again later");
      const m = Ne(
        s.value,
        u
      ), f = mo(a, m);
      n.value = f.length, o.initialiseQuiz(f, c), c === "Timed" && o.setTimeLimit(a * o.timeLimit), t.value = !0;
    };
    return (a, c) => t.value && S(o).quizMode === "Tutor" ? (h(), j(jo, { key: 0 })) : t.value && S(o).quizMode === "Timed" ? (h(), j(Fo, { key: 1 })) : (h(), j(Tn, {
      key: 2,
      onStartQuiz: r
    }));
  }
}), In = {
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
function xn(e, n = {}) {
  const o = eo();
  e.use(o), e.component("CrucibleComponent", Nn), e.provide("$dataLink", n.dataLink || In);
}
export {
  Nn as CrucibleComponent,
  xn as createViewerPlugin,
  In as defaultData
};