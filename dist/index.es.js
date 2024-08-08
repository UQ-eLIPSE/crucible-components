import { effectScope as Bt, ref as T, markRaw as G, hasInjectionContext as Te, inject as $t, getCurrentInstance as we, toRaw as _t, watch as Vt, reactive as Se, isRef as at, isReactive as Ot, toRef as At, nextTick as Lt, computed as qt, unref as A, getCurrentScope as Ce, onScopeDispose as Ee, toRefs as St, defineComponent as O, openBlock as g, createElementBlock as v, Fragment as U, normalizeClass as H, createElementVNode as h, toDisplayString as k, renderList as tt, createVNode as et, createBlock as M, createCommentVNode as $, onMounted as vt, pushScopeId as Wt, popScopeId as Gt, resolveComponent as ke, onBeforeMount as Jt, createTextVNode as Yt, watchEffect as Qe, withDirectives as xt, vModelText as De, vModelSelect as $e } from "vue";
var Kt = !1;
function dt(t, s, o) {
  return Array.isArray(t) ? (t.length = Math.max(t.length, s), t.splice(s, 1, o), o) : (t[s] = o, o);
}
function Tt(t, s) {
  if (Array.isArray(t)) {
    t.splice(s, 1);
    return;
  }
  delete t[s];
}
function Ve() {
  return Xt().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Xt() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Oe = typeof Proxy == "function", qe = "devtools-plugin:setup", Ne = "plugin:settings:set";
let K, Ct;
function Pe() {
  var t;
  return K !== void 0 || (typeof window < "u" && window.performance ? (K = !0, Ct = window.performance) : typeof globalThis < "u" && (!((t = globalThis.perf_hooks) === null || t === void 0) && t.performance) ? (K = !0, Ct = globalThis.perf_hooks.performance) : K = !1), K;
}
function Ie() {
  return Pe() ? Ct.now() : Date.now();
}
class Le {
  constructor(s, o) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = s, this.hook = o;
    const e = {};
    if (s.settings)
      for (const r in s.settings) {
        const c = s.settings[r];
        e[r] = c.defaultValue;
      }
    const n = `__vue-devtools-plugin-settings__${s.id}`;
    let i = Object.assign({}, e);
    try {
      const r = localStorage.getItem(n), c = JSON.parse(r);
      Object.assign(i, c);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return i;
      },
      setSettings(r) {
        try {
          localStorage.setItem(n, JSON.stringify(r));
        } catch {
        }
        i = r;
      },
      now() {
        return Ie();
      }
    }, o && o.on(Ne, (r, c) => {
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
      }), this.fallbacks[c](...a)) : (...a) => new Promise((l) => {
        this.targetQueue.push({
          method: c,
          args: a,
          resolve: l
        });
      })
    });
  }
  async setRealTarget(s) {
    this.target = s;
    for (const o of this.onQueue)
      this.target.on[o.method](...o.args);
    for (const o of this.targetQueue)
      o.resolve(await this.target[o.method](...o.args));
  }
}
function Zt(t, s) {
  const o = t, e = Xt(), n = Ve(), i = Oe && o.enableEarlyProxy;
  if (n && (e.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i))
    n.emit(qe, t, s);
  else {
    const r = i ? new Le(o, n) : null;
    (e.__VUE_DEVTOOLS_PLUGINS__ = e.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: o,
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
let it;
const ct = (t) => it = t, te = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function J(t) {
  return t && typeof t == "object" && Object.prototype.toString.call(t) === "[object Object]" && typeof t.toJSON != "function";
}
var j;
(function(t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function";
})(j || (j = {}));
const yt = typeof window < "u", rt = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && yt, Mt = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function xe(t, { autoBom: s = !1 } = {}) {
  return s && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type) ? new Blob(["\uFEFF", t], { type: t.type }) : t;
}
function Nt(t, s, o) {
  const e = new XMLHttpRequest();
  e.open("GET", t), e.responseType = "blob", e.onload = function() {
    se(e.response, s, o);
  }, e.onerror = function() {
    console.error("could not download file");
  }, e.send();
}
function ee(t) {
  const s = new XMLHttpRequest();
  s.open("HEAD", t, !1);
  try {
    s.send();
  } catch {
  }
  return s.status >= 200 && s.status <= 299;
}
function mt(t) {
  try {
    t.dispatchEvent(new MouseEvent("click"));
  } catch {
    const o = document.createEvent("MouseEvents");
    o.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), t.dispatchEvent(o);
  }
}
const ht = typeof navigator == "object" ? navigator : { userAgent: "" }, oe = /Macintosh/.test(ht.userAgent) && /AppleWebKit/.test(ht.userAgent) && !/Safari/.test(ht.userAgent), se = yt ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !oe ? Me : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in ht ? je : (
      // Fallback to using FileReader and a popup
      ze
    )
  )
) : () => {
};
function Me(t, s = "download", o) {
  const e = document.createElement("a");
  e.download = s, e.rel = "noopener", typeof t == "string" ? (e.href = t, e.origin !== location.origin ? ee(e.href) ? Nt(t, s, o) : (e.target = "_blank", mt(e)) : mt(e)) : (e.href = URL.createObjectURL(t), setTimeout(function() {
    URL.revokeObjectURL(e.href);
  }, 4e4), setTimeout(function() {
    mt(e);
  }, 0));
}
function je(t, s = "download", o) {
  if (typeof t == "string")
    if (ee(t))
      Nt(t, s, o);
    else {
      const e = document.createElement("a");
      e.href = t, e.target = "_blank", setTimeout(function() {
        mt(e);
      });
    }
  else
    navigator.msSaveOrOpenBlob(xe(t, o), s);
}
function ze(t, s, o, e) {
  if (e = e || open("", "_blank"), e && (e.document.title = e.document.body.innerText = "downloading..."), typeof t == "string")
    return Nt(t, s, o);
  const n = t.type === "application/octet-stream", i = /constructor/i.test(String(Mt.HTMLElement)) || "safari" in Mt, r = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((r || n && i || oe) && typeof FileReader < "u") {
    const c = new FileReader();
    c.onloadend = function() {
      let a = c.result;
      if (typeof a != "string")
        throw e = null, new Error("Wrong reader.result type");
      a = r ? a : a.replace(/^data:[^;]*;/, "data:attachment/file;"), e ? e.location.href = a : location.assign(a), e = null;
    }, c.readAsDataURL(t);
  } else {
    const c = URL.createObjectURL(t);
    e ? e.location.assign(c) : location.href = c, e = null, setTimeout(function() {
      URL.revokeObjectURL(c);
    }, 4e4);
  }
}
function E(t, s) {
  const o = "🍍 " + t;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(o, s) : s === "error" ? console.error(o) : s === "warn" ? console.warn(o) : console.log(o);
}
function Pt(t) {
  return "_a" in t && "install" in t;
}
function ne() {
  if (!("clipboard" in navigator))
    return E("Your browser doesn't support the Clipboard API", "error"), !0;
}
function ie(t) {
  return t instanceof Error && t.message.toLowerCase().includes("document is not focused") ? (E('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Re(t) {
  if (!ne())
    try {
      await navigator.clipboard.writeText(JSON.stringify(t.state.value)), E("Global state copied to clipboard.");
    } catch (s) {
      if (ie(s))
        return;
      E("Failed to serialize the state. Check the console for more details.", "error"), console.error(s);
    }
}
async function Ue(t) {
  if (!ne())
    try {
      re(t, JSON.parse(await navigator.clipboard.readText())), E("Global state pasted from clipboard.");
    } catch (s) {
      if (ie(s))
        return;
      E("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(s);
    }
}
async function He(t) {
  try {
    se(new Blob([JSON.stringify(t.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (s) {
    E("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(s);
  }
}
let R;
function Fe() {
  R || (R = document.createElement("input"), R.type = "file", R.accept = ".json");
  function t() {
    return new Promise((s, o) => {
      R.onchange = async () => {
        const e = R.files;
        if (!e)
          return s(null);
        const n = e.item(0);
        return s(n ? { text: await n.text(), file: n } : null);
      }, R.oncancel = () => s(null), R.onerror = o, R.click();
    });
  }
  return t;
}
async function Be(t) {
  try {
    const o = await Fe()();
    if (!o)
      return;
    const { text: e, file: n } = o;
    re(t, JSON.parse(e)), E(`Global state imported from "${n.name}".`);
  } catch (s) {
    E("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(s);
  }
}
function re(t, s) {
  for (const o in s) {
    const e = t.state.value[o];
    e ? Object.assign(e, s[o]) : t.state.value[o] = s[o];
  }
}
function L(t) {
  return {
    _custom: {
      display: t
    }
  };
}
const ae = "🍍 Pinia (root)", Et = "_root";
function We(t) {
  return Pt(t) ? {
    id: Et,
    label: ae
  } : {
    id: t.$id,
    label: t.$id
  };
}
function Ge(t) {
  if (Pt(t)) {
    const o = Array.from(t._s.keys()), e = t._s;
    return {
      state: o.map((i) => ({
        editable: !0,
        key: i,
        value: t.state.value[i]
      })),
      getters: o.filter((i) => e.get(i)._getters).map((i) => {
        const r = e.get(i);
        return {
          editable: !1,
          key: i,
          value: r._getters.reduce((c, a) => (c[a] = r[a], c), {})
        };
      })
    };
  }
  const s = {
    state: Object.keys(t.$state).map((o) => ({
      editable: !0,
      key: o,
      value: t.$state[o]
    }))
  };
  return t._getters && t._getters.length && (s.getters = t._getters.map((o) => ({
    editable: !1,
    key: o,
    value: t[o]
  }))), t._customProperties.size && (s.customProperties = Array.from(t._customProperties).map((o) => ({
    editable: !0,
    key: o,
    value: t[o]
  }))), s;
}
function Je(t) {
  return t ? Array.isArray(t) ? t.reduce((s, o) => (s.keys.push(o.key), s.operations.push(o.type), s.oldValue[o.key] = o.oldValue, s.newValue[o.key] = o.newValue, s), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: L(t.type),
    key: L(t.key),
    oldValue: t.oldValue,
    newValue: t.newValue
  } : {};
}
function Ye(t) {
  switch (t) {
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
const gt = [], W = "pinia:mutations", Q = "pinia", { assign: Ke } = Object, bt = (t) => "🍍 " + t;
function Xe(t, s) {
  Zt({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: gt,
    app: t
  }, (o) => {
    typeof o.now != "function" && E("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), o.addTimelineLayer({
      id: W,
      label: "Pinia 🍍",
      color: 15064968
    }), o.addInspector({
      id: Q,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            Re(s);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await Ue(s), o.sendInspectorTree(Q), o.sendInspectorState(Q);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            He(s);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Be(s), o.sendInspectorTree(Q), o.sendInspectorState(Q);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (e) => {
            const n = s._s.get(e);
            n ? typeof n.$reset != "function" ? E(`Cannot reset "${e}" store because it doesn't have a "$reset" method implemented.`, "warn") : (n.$reset(), E(`Store "${e}" reset.`)) : E(`Cannot reset "${e}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), o.on.inspectComponent((e, n) => {
      const i = e.componentInstance && e.componentInstance.proxy;
      if (i && i._pStores) {
        const r = e.componentInstance.proxy._pStores;
        Object.values(r).forEach((c) => {
          e.instanceData.state.push({
            type: bt(c.$id),
            key: "state",
            editable: !0,
            value: c._isOptionsAPI ? {
              _custom: {
                value: _t(c.$state),
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
              Object.keys(c.$state).reduce((a, l) => (a[l] = c.$state[l], a), {})
            )
          }), c._getters && c._getters.length && e.instanceData.state.push({
            type: bt(c.$id),
            key: "getters",
            editable: !1,
            value: c._getters.reduce((a, l) => {
              try {
                a[l] = c[l];
              } catch (f) {
                a[l] = f;
              }
              return a;
            }, {})
          });
        });
      }
    }), o.on.getInspectorTree((e) => {
      if (e.app === t && e.inspectorId === Q) {
        let n = [s];
        n = n.concat(Array.from(s._s.values())), e.rootNodes = (e.filter ? n.filter((i) => "$id" in i ? i.$id.toLowerCase().includes(e.filter.toLowerCase()) : ae.toLowerCase().includes(e.filter.toLowerCase())) : n).map(We);
      }
    }), o.on.getInspectorState((e) => {
      if (e.app === t && e.inspectorId === Q) {
        const n = e.nodeId === Et ? s : s._s.get(e.nodeId);
        if (!n)
          return;
        n && (e.state = Ge(n));
      }
    }), o.on.editInspectorState((e, n) => {
      if (e.app === t && e.inspectorId === Q) {
        const i = e.nodeId === Et ? s : s._s.get(e.nodeId);
        if (!i)
          return E(`store "${e.nodeId}" not found`, "error");
        const { path: r } = e;
        Pt(i) ? r.unshift("state") : (r.length !== 1 || !i._customProperties.has(r[0]) || r[0] in i.$state) && r.unshift("$state"), Z = !1, e.set(i, r, e.state.value), Z = !0;
      }
    }), o.on.editComponentState((e) => {
      if (e.type.startsWith("🍍")) {
        const n = e.type.replace(/^🍍\s*/, ""), i = s._s.get(n);
        if (!i)
          return E(`store "${n}" not found`, "error");
        const { path: r } = e;
        if (r[0] !== "state")
          return E(`Invalid path for store "${n}":
${r}
Only state can be modified.`);
        r[0] = "$state", Z = !1, e.set(i, r, e.state.value), Z = !0;
      }
    });
  });
}
function Ze(t, s) {
  gt.includes(bt(s.$id)) || gt.push(bt(s.$id)), Zt({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: gt,
    app: t,
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
    const e = typeof o.now == "function" ? o.now.bind(o) : Date.now;
    s.$onAction(({ after: r, onError: c, name: a, args: l }) => {
      const f = ce++;
      o.addTimelineEvent({
        layerId: W,
        event: {
          time: e(),
          title: "🛫 " + a,
          subtitle: "start",
          data: {
            store: L(s.$id),
            action: L(a),
            args: l
          },
          groupId: f
        }
      }), r((p) => {
        B = void 0, o.addTimelineEvent({
          layerId: W,
          event: {
            time: e(),
            title: "🛬 " + a,
            subtitle: "end",
            data: {
              store: L(s.$id),
              action: L(a),
              args: l,
              result: p
            },
            groupId: f
          }
        });
      }), c((p) => {
        B = void 0, o.addTimelineEvent({
          layerId: W,
          event: {
            time: e(),
            logType: "error",
            title: "💥 " + a,
            subtitle: "end",
            data: {
              store: L(s.$id),
              action: L(a),
              args: l,
              error: p
            },
            groupId: f
          }
        });
      });
    }, !0), s._customProperties.forEach((r) => {
      Vt(() => A(s[r]), (c, a) => {
        o.notifyComponentUpdate(), o.sendInspectorState(Q), Z && o.addTimelineEvent({
          layerId: W,
          event: {
            time: e(),
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
    }), s.$subscribe(({ events: r, type: c }, a) => {
      if (o.notifyComponentUpdate(), o.sendInspectorState(Q), !Z)
        return;
      const l = {
        time: e(),
        title: Ye(c),
        data: Ke({ store: L(s.$id) }, Je(r)),
        groupId: B
      };
      c === j.patchFunction ? l.subtitle = "⤵️" : c === j.patchObject ? l.subtitle = "🧩" : r && !Array.isArray(r) && (l.subtitle = r.type), r && (l.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: r
        }
      }), o.addTimelineEvent({
        layerId: W,
        event: l
      });
    }, { detached: !0, flush: "sync" });
    const n = s._hotUpdate;
    s._hotUpdate = G((r) => {
      n(r), o.addTimelineEvent({
        layerId: W,
        event: {
          time: e(),
          title: "🔥 " + s.$id,
          subtitle: "HMR update",
          data: {
            store: L(s.$id),
            info: L("HMR update")
          }
        }
      }), o.notifyComponentUpdate(), o.sendInspectorTree(Q), o.sendInspectorState(Q);
    });
    const { $dispose: i } = s;
    s.$dispose = () => {
      i(), o.notifyComponentUpdate(), o.sendInspectorTree(Q), o.sendInspectorState(Q), o.getSettings().logStoreChanges && E(`Disposed "${s.$id}" store 🗑`);
    }, o.notifyComponentUpdate(), o.sendInspectorTree(Q), o.sendInspectorState(Q), o.getSettings().logStoreChanges && E(`"${s.$id}" store installed 🆕`);
  });
}
let ce = 0, B;
function jt(t, s, o) {
  const e = s.reduce((n, i) => (n[i] = _t(t)[i], n), {});
  for (const n in e)
    t[n] = function() {
      const i = ce, r = o ? new Proxy(t, {
        get(...a) {
          return B = i, Reflect.get(...a);
        },
        set(...a) {
          return B = i, Reflect.set(...a);
        }
      }) : t;
      B = i;
      const c = e[n].apply(r, arguments);
      return B = void 0, c;
    };
}
function to({ app: t, store: s, options: o }) {
  if (s.$id.startsWith("__hot:"))
    return;
  s._isOptionsAPI = !!o.state, jt(s, Object.keys(o.actions), s._isOptionsAPI);
  const e = s._hotUpdate;
  _t(s)._hotUpdate = function(n) {
    e.apply(this, arguments), jt(s, Object.keys(n._hmrPayload.actions), !!s._isOptionsAPI);
  }, Ze(
    t,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    s
  );
}
function eo() {
  const t = Bt(!0), s = t.run(() => T({}));
  let o = [], e = [];
  const n = G({
    install(i) {
      ct(n), n._a = i, i.provide(te, n), i.config.globalProperties.$pinia = n, rt && Xe(i, n), e.forEach((r) => o.push(r)), e = [];
    },
    use(i) {
      return !this._a && !Kt ? e.push(i) : o.push(i), this;
    },
    _p: o,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: t,
    _s: /* @__PURE__ */ new Map(),
    state: s
  });
  return rt && typeof Proxy < "u" && n.use(to), n;
}
function le(t, s) {
  for (const o in s) {
    const e = s[o];
    if (!(o in t))
      continue;
    const n = t[o];
    J(n) && J(e) && !at(e) && !Ot(e) ? t[o] = le(n, e) : t[o] = e;
  }
  return t;
}
const ue = () => {
};
function zt(t, s, o, e = ue) {
  t.push(s);
  const n = () => {
    const i = t.indexOf(s);
    i > -1 && (t.splice(i, 1), e());
  };
  return !o && Ce() && Ee(n), n;
}
function X(t, ...s) {
  t.slice().forEach((o) => {
    o(...s);
  });
}
const oo = (t) => t();
function kt(t, s) {
  t instanceof Map && s instanceof Map && s.forEach((o, e) => t.set(e, o)), t instanceof Set && s instanceof Set && s.forEach(t.add, t);
  for (const o in s) {
    if (!s.hasOwnProperty(o))
      continue;
    const e = s[o], n = t[o];
    J(n) && J(e) && t.hasOwnProperty(o) && !at(e) && !Ot(e) ? t[o] = kt(n, e) : t[o] = e;
  }
  return t;
}
const so = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function no(t) {
  return !J(t) || !t.hasOwnProperty(so);
}
const { assign: N } = Object;
function Rt(t) {
  return !!(at(t) && t.effect);
}
function Ut(t, s, o, e) {
  const { state: n, actions: i, getters: r } = s, c = o.state.value[t];
  let a;
  function l() {
    !c && (process.env.NODE_ENV === "production" || !e) && (o.state.value[t] = n ? n() : {});
    const f = process.env.NODE_ENV !== "production" && e ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      St(T(n ? n() : {}).value)
    ) : St(o.state.value[t]);
    return N(f, i, Object.keys(r || {}).reduce((p, m) => (process.env.NODE_ENV !== "production" && m in f && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${m}" in store "${t}".`), p[m] = G(qt(() => {
      ct(o);
      const _ = o._s.get(t);
      return r[m].call(_, _);
    })), p), {}));
  }
  return a = Qt(t, l, s, o, e, !0), a;
}
function Qt(t, s, o = {}, e, n, i) {
  let r;
  const c = N({ actions: {} }, o);
  if (process.env.NODE_ENV !== "production" && !e._e.active)
    throw new Error("Pinia destroyed");
  const a = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Kt && (a.onTrigger = (d) => {
    l ? _ = d : l == !1 && !b._hotUpdating && (Array.isArray(_) ? _.push(d) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let l, f, p = [], m = [], _;
  const D = e.state.value[t];
  !i && !D && (process.env.NODE_ENV === "production" || !n) && (e.state.value[t] = {});
  const ot = T({});
  let ut;
  function pt(d) {
    let u;
    l = f = !1, process.env.NODE_ENV !== "production" && (_ = []), typeof d == "function" ? (d(e.state.value[t]), u = {
      type: j.patchFunction,
      storeId: t,
      events: _
    }) : (kt(e.state.value[t], d), u = {
      type: j.patchObject,
      payload: d,
      storeId: t,
      events: _
    });
    const y = ut = Symbol();
    Lt().then(() => {
      ut === y && (l = !0);
    }), f = !0, X(p, u, e.state.value[t]);
  }
  const w = i ? function() {
    const { state: u } = o, y = u ? u() : {};
    this.$patch((V) => {
      N(V, y);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${t}" is built using the setup syntax and does not implement $reset().`);
    } : ue
  );
  function S() {
    r.stop(), p = [], m = [], e._s.delete(t);
  }
  function C(d, u) {
    return function() {
      ct(e);
      const y = Array.from(arguments), V = [], st = [];
      function ye(q) {
        V.push(q);
      }
      function Ae(q) {
        st.push(q);
      }
      X(m, {
        args: y,
        name: d,
        store: b,
        after: ye,
        onError: Ae
      });
      let nt;
      try {
        nt = u.apply(this && this.$id === t ? this : b, y);
      } catch (q) {
        throw X(st, q), q;
      }
      return nt instanceof Promise ? nt.then((q) => (X(V, q), q)).catch((q) => (X(st, q), Promise.reject(q))) : (X(V, nt), nt);
    };
  }
  const I = /* @__PURE__ */ G({
    actions: {},
    getters: {},
    state: [],
    hotState: ot
  }), Y = {
    _p: e,
    // _s: scope,
    $id: t,
    $onAction: zt.bind(null, m),
    $patch: pt,
    $reset: w,
    $subscribe(d, u = {}) {
      const y = zt(p, d, u.detached, () => V()), V = r.run(() => Vt(() => e.state.value[t], (st) => {
        (u.flush === "sync" ? f : l) && d({
          storeId: t,
          type: j.direct,
          events: _
        }, st);
      }, N({}, a, u)));
      return y;
    },
    $dispose: S
  }, b = Se(process.env.NODE_ENV !== "production" || rt ? N(
    {
      _hmrPayload: I,
      _customProperties: G(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    Y
    // must be added later
    // setupStore
  ) : Y);
  e._s.set(t, b);
  const F = (e._a && e._a.runWithContext || oo)(() => e._e.run(() => (r = Bt()).run(s)));
  for (const d in F) {
    const u = F[d];
    if (at(u) && !Rt(u) || Ot(u))
      process.env.NODE_ENV !== "production" && n ? dt(ot.value, d, At(F, d)) : i || (D && no(u) && (at(u) ? u.value = D[d] : kt(u, D[d])), e.state.value[t][d] = u), process.env.NODE_ENV !== "production" && I.state.push(d);
    else if (typeof u == "function") {
      const y = process.env.NODE_ENV !== "production" && n ? u : C(d, u);
      F[d] = y, process.env.NODE_ENV !== "production" && (I.actions[d] = u), c.actions[d] = u;
    } else
      process.env.NODE_ENV !== "production" && Rt(u) && (I.getters[d] = i ? (
        // @ts-expect-error
        o.getters[d]
      ) : u, yt && (F._getters || // @ts-expect-error: same
      (F._getters = G([]))).push(d));
  }
  if (N(b, F), N(_t(b), F), Object.defineProperty(b, "$state", {
    get: () => process.env.NODE_ENV !== "production" && n ? ot.value : e.state.value[t],
    set: (d) => {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error("cannot set hotState");
      pt((u) => {
        N(u, d);
      });
    }
  }), process.env.NODE_ENV !== "production" && (b._hotUpdate = G((d) => {
    b._hotUpdating = !0, d._hmrPayload.state.forEach((u) => {
      if (u in b.$state) {
        const y = d.$state[u], V = b.$state[u];
        typeof y == "object" && J(y) && J(V) ? le(y, V) : d.$state[u] = V;
      }
      dt(b, u, At(d.$state, u));
    }), Object.keys(b.$state).forEach((u) => {
      u in d.$state || Tt(b, u);
    }), l = !1, f = !1, e.state.value[t] = At(d._hmrPayload, "hotState"), f = !0, Lt().then(() => {
      l = !0;
    });
    for (const u in d._hmrPayload.actions) {
      const y = d[u];
      dt(b, u, C(u, y));
    }
    for (const u in d._hmrPayload.getters) {
      const y = d._hmrPayload.getters[u], V = i ? (
        // special handling of options api
        qt(() => (ct(e), y.call(b, b)))
      ) : y;
      dt(b, u, V);
    }
    Object.keys(b._hmrPayload.getters).forEach((u) => {
      u in d._hmrPayload.getters || Tt(b, u);
    }), Object.keys(b._hmrPayload.actions).forEach((u) => {
      u in d._hmrPayload.actions || Tt(b, u);
    }), b._hmrPayload = d._hmrPayload, b._getters = d._getters, b._hotUpdating = !1;
  })), rt) {
    const d = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((u) => {
      Object.defineProperty(b, u, N({ value: b[u] }, d));
    });
  }
  return e._p.forEach((d) => {
    if (rt) {
      const u = r.run(() => d({
        store: b,
        app: e._a,
        pinia: e,
        options: c
      }));
      Object.keys(u || {}).forEach((y) => b._customProperties.add(y)), N(b, u);
    } else
      N(b, r.run(() => d({
        store: b,
        app: e._a,
        pinia: e,
        options: c
      })));
  }), process.env.NODE_ENV !== "production" && b.$state && typeof b.$state == "object" && typeof b.$state.constructor == "function" && !b.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${b.$id}".`), D && i && o.hydrate && o.hydrate(b.$state, D), l = !0, f = !0, b;
}
function io(t, s, o) {
  let e, n;
  const i = typeof s == "function";
  if (typeof t == "string")
    e = t, n = i ? o : s;
  else if (n = t, e = t.id, process.env.NODE_ENV !== "production" && typeof e != "string")
    throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
  function r(c, a) {
    const l = Te();
    if (c = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && it && it._testing ? null : c) || (l ? $t(te, null) : null), c && ct(c), process.env.NODE_ENV !== "production" && !it)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    c = it, c._s.has(e) || (i ? Qt(e, s, n, c) : Ut(e, n, c), process.env.NODE_ENV !== "production" && (r._pinia = c));
    const f = c._s.get(e);
    if (process.env.NODE_ENV !== "production" && a) {
      const p = "__hot:" + e, m = i ? Qt(p, s, n, c, !0) : Ut(p, N({}, n), c, !0);
      a._hotUpdate(m), delete c.state.value[p], c._s.delete(p);
    }
    if (process.env.NODE_ENV !== "production" && yt) {
      const p = we();
      if (p && p.proxy && // avoid adding stores that are just built for hot module replacement
      !a) {
        const m = p.proxy, _ = "_pStores" in m ? m._pStores : m._pStores = {};
        _[e] = f;
      }
    }
    return f;
  }
  return r.$id = e, r;
}
const ro = ["id", "checked"], ao = ["for", "innerHTML"], co = /* @__PURE__ */ O({
  __name: "MCQOption",
  props: {
    optionKey: {},
    checked: { type: Boolean },
    option: {},
    submitted: { type: Boolean }
  },
  emits: ["selectOption"],
  setup(t, { emit: s }) {
    const o = s, e = () => o("selectOption");
    return (n, i) => (g(), v(U, null, [
      (g(), v("input", {
        id: "option-" + n.optionKey,
        key: n.optionKey,
        "test-id": "radio_options",
        type: "radio",
        name: "options",
        checked: n.checked,
        class: H(n.submitted && "ignore-hover")
      }, null, 10, ro)),
      (g(), v("label", {
        key: n.optionKey,
        for: "option-" + n.optionKey,
        class: H(n.submitted ? "mcq-option-label ignore-hover" : "mcq-option-label"),
        onClick: i[0] || (i[0] = (r) => e()),
        innerHTML: n.option.optionValue
      }, null, 10, ao))
    ], 64));
  }
}), x = (t, s) => {
  const o = t.__vccOpts || t;
  for (const [e, n] of s)
    o[e] = n;
  return o;
}, lo = /* @__PURE__ */ x(co, [["__scopeId", "data-v-fdbfedc6"]]), uo = ["disabled"], po = /* @__PURE__ */ O({
  __name: "MCQButton",
  props: {
    submitted: { type: Boolean },
    selectedOption: {},
    hideSkip: { type: Boolean }
  },
  emits: ["submitAnswer", "nextQuestion", "skipQuestion"],
  setup(t, { emit: s }) {
    const o = T("skip"), e = T("Skip"), n = s, i = (a, l) => {
      !a && l ? r("next", "Next", "submitAnswer") : a && l ? r("skip", "Skip", "nextQuestion") : !a && !l && r("skip", "Skip", "skipQuestion");
    }, r = (a, l, f) => {
      o.value = a, e.value = l, n(f);
    }, c = (a, l) => a && l ? { class: "next", text: "Next" } : !a && l ? { class: "submit", text: "Submit" } : { class: o.value, text: e.value };
    return (a, l) => (g(), v("div", null, [
      h("button", {
        disabled: a.hideSkip && c(a.submitted, a.selectedOption).class === "skip",
        class: H(["mcq-button", c(a.submitted, a.selectedOption).class]),
        onClick: l[0] || (l[0] = (f) => i(a.submitted, a.selectedOption))
      }, k(c(a.submitted, a.selectedOption).text), 11, uo)
    ]));
  }
}), fo = /* @__PURE__ */ x(po, [["__scopeId", "data-v-847b8dd5"]]), mo = /* @__PURE__ */ O({
  __name: "NextButton",
  props: {
    buttonName: {}
  },
  emits: ["nextQuestion", "prevQuestion"],
  setup(t, { emit: s }) {
    const { buttonName: o } = t, e = s, n = () => {
      i(o !== "←" ? "nextQuestion" : "prevQuestion");
    }, i = (r) => {
      e(r);
    };
    return (r, c) => (g(), v("div", null, [
      h("button", {
        class: H(r.buttonName === "Submit" ? "submit_btn" : "mcq-button"),
        onClick: c[0] || (c[0] = (a) => n())
      }, k(r.buttonName), 3)
    ]));
  }
}), Ht = /* @__PURE__ */ x(mo, [["__scopeId", "data-v-8be7f61e"]]), ho = (t) => {
  for (let s = t.length - 1; s > 0; s--) {
    const o = Math.floor(Math.random() * (s + 1));
    [t[s], t[o]] = [t[o], t[s]];
  }
  return t;
}, go = (t) => t.sort(
  (s, o) => s.lastAttempted > o.lastAttempted ? 1 : s.lastAttempted < o.lastAttempted ? -1 : 0
  //todo:replace this with reviewTime once algorithm implemented
), bo = (t, s) => {
  const o = go(s);
  return ho(o.slice(0, t));
};
function pe(t) {
  const s = t.reduce(
    (e, n) => (Object.keys(n).forEach((i) => {
      i.trim() !== "" && (e[i] || (e[i] = /* @__PURE__ */ new Set()), n[i].forEach((c) => e[i].add(c)));
    }), e),
    {}
  );
  return Object.keys(s).reduce(
    (e, n) => (e[n] = [...s[n]], e),
    {}
  );
}
function It(t, s) {
  return t.filter((o) => Object.keys(s).every((e) => {
    if (!s[e].length)
      return !0;
    const n = o.tags[e];
    if (n)
      return n.some((i) => s[e].includes(i));
  }));
}
function _o(t, s, o) {
  return t.filter((e) => {
    const n = e.tags[o];
    return n && n.includes(s);
  });
}
function vo(t, s, o) {
  const e = t[s].question.optionsList;
  for (let n = 0; n < e.length; n++)
    if (e[n].optionValue === o)
      return n;
}
const de = (t, s) => s.findIndex((o) => {
  var e;
  return ((e = o.question._id) == null ? void 0 : e.$oid) === t;
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
      this.tagSets = this.allQs.map((t) => t.tags);
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
      const t = this.allQs;
      return It(t, this.selectedTags).length;
    },
    setselectedTags(t) {
      this.selectedTags = t;
    },
    getselectedtags() {
      return this.selectedTags;
    },
    modifySelectedTags(t, { category: s, topic: o }) {
      this.selectedTags[s] && (this.selectedTags[s] = t ? [...this.selectedTags[s], o] : this.selectedTags[s].filter(
        (e) => e !== o
      ));
    },
    initialiseQuiz(t, s) {
      this.questionsQueue = t, this.questionsStack = [], this.quizMode = s, this.quizStats = t.map((o) => ({
        question: o,
        correct: 0,
        skipped: 0,
        attempts: 0,
        selectedValue: ""
      }));
    },
    incrementStat(t, s, o) {
      const e = de(t, this.quizStats);
      if (this.quizStats[e]) {
        if (o !== void 0) {
          if (this.quizStats[e][s]++, o === "-1") {
            this.quizStats[e].selectedValue = "Reached Time Limit";
            return;
          }
          const n = this.quizStats[e].question.optionsList.map((i) => i.optionCorrect).indexOf(!0);
          Number(o) === Number(n) ? this.quizStats[e].correct = 1 : this.quizStats[e].correct = 0;
        }
        this.quizStats[e].selectedValue = o !== void 0 ? this.quizStats[e].question.optionsList[Number(o)].optionValue : "";
      }
    },
    pushToHistoryStack(t) {
      this.questionsStack.push(t);
    },
    enqueueQuestion(t) {
      this.questionsQueue.push(t);
    },
    dequeueQuestion() {
      for (; this.questionsQueue.length > 0; ) {
        const t = this.questionsQueue.shift();
        return this.pushToHistoryStack(t), t;
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
    setTimeLimit(t) {
      this.timeLimit = t;
    },
    getRemainingQuestions() {
      return this.questionsQueue.length;
    }
  }
}), yo = ["innerHTML"], Ao = { class: "mcq-list" }, To = ["onClick"], wo = { class: "next-prev-question" }, So = /* @__PURE__ */ O({
  __name: "MCQQuestion",
  props: {
    _id: {},
    statement: {},
    optionsList: {}
  },
  emits: ["nextQuestion", "skipQuestion", "prevQuestion"],
  setup(t, { emit: s }) {
    const o = z(), e = T(null), n = T(!1), i = s, r = T(o.getRemainingQuestions()), c = () => {
      n.value = !0;
    }, a = () => {
      e.value = null, i("nextQuestion");
    }, l = () => {
      m(), r.value = o.getRemainingQuestions(), i("nextQuestion");
    }, f = () => {
      m(), i("skipQuestion");
    }, p = (w) => o.incrementStat(
      w.$oid,
      "attempts",
      e.value ?? void 0
    ), m = () => {
      n.value = !1, e.value = null;
    }, _ = () => {
      e.value = null, i("prevQuestion");
    }, D = (w, S) => {
      n.value || (e.value = e.value === S ? null : S), p(w);
    }, ot = (w, S, C) => o.quizMode === "Timed" ? ut(w, S) : pt(S, C);
    function ut(w, S) {
      const C = de(w.$oid, o.quizStats), I = o.quizStats[C].selectedValue, Y = vo(
        o.quizStats,
        C,
        I
      );
      return String(Y) === S ? (e.value = S, "selected") : "";
    }
    function pt(w, S) {
      const C = S[parseInt(w)], I = e.value === w;
      return n.value ? C.optionCorrect ? "correct ignore-hover" : I ? "wrong ignore-hover" : "ignore-hover" : I ? "selected" : "";
    }
    return (w, S) => (g(), v(U, null, [
      h("div", {
        class: "mcq-statement",
        innerHTML: w.statement
      }, null, 8, yo),
      h("div", Ao, [
        (g(!0), v(U, null, tt(Object.entries(w.optionsList), ([C, I]) => (g(), v("div", {
          key: C,
          class: H(["mcq-option", ot(w._id, C, w.optionsList)]),
          onClick: (Y) => D(w._id, C)
        }, [
          et(lo, {
            "option-key": C,
            checked: e.value === C,
            option: I,
            submitted: n.value,
            onSelectOption: (Y) => D(w._id, C)
          }, null, 8, ["option-key", "checked", "option", "submitted", "onSelectOption"])
        ], 10, To))), 128))
      ]),
      A(o).quizMode === "Tutor" ? (g(), M(fo, {
        key: 0,
        submitted: n.value,
        "selected-option": e.value,
        "hide-skip": r.value <= 1,
        onSubmitAnswer: c,
        onNextQuestion: S[0] || (S[0] = (C) => l()),
        onSkipQuestion: f
      }, null, 8, ["submitted", "selected-option", "hide-skip"])) : $("", !0),
      h("div", wo, [
        A(o).quizMode === "Timed" ? (g(), M(Ht, {
          key: 0,
          "button-name": A(o).questionsQueue.length >= 1 ? "→" : "Submit",
          onNextQuestion: S[1] || (S[1] = (C) => a())
        }, null, 8, ["button-name"])) : $("", !0),
        A(o).quizMode === "Timed" && A(o).questionsStack.length > 1 ? (g(), M(Ht, {
          key: 1,
          "button-name": "←",
          onPrevQuestion: S[2] || (S[2] = (C) => _())
        })) : $("", !0)
      ])
    ], 64));
  }
}), fe = /* @__PURE__ */ x(So, [["__scopeId", "data-v-181a554c"]]), Co = (t) => (Wt("data-v-38adb08e"), t = t(), Gt(), t), Eo = { class: "report-container" }, ko = { class: "mcq-report" }, Qo = { class: "table-container" }, Do = /* @__PURE__ */ Co(() => /* @__PURE__ */ h("thead", null, [
  /* @__PURE__ */ h("tr", null, [
    /* @__PURE__ */ h("th", null, "question"),
    /* @__PURE__ */ h("th", null, "correct option"),
    /* @__PURE__ */ h("th", null, "your answer")
  ])
], -1)), $o = { class: "question-row" }, Vo = ["href", "innerHTML"], Oo = { class: "answer-row" }, qo = ["innerHTML"], No = { class: "answer-row" }, Po = ["innerHTML"], Io = { class: "mcq-result" }, Lo = { class: "score" }, xo = /* @__PURE__ */ O({
  __name: "MCQStatus",
  setup(t) {
    const s = $t("$updateQAttemptCallback") ?? ve, o = z(), e = o.quizStats, n = o.quizStats.length, i = e.filter((a) => a.correct === 1).length, r = (i * 100 / n).toFixed(0);
    return vt(() => {
      try {
        const a = e.filter((l) => l.attempts).map(
          (l) => s(l.question._id.$oid, !!l.correct)
        );
        a.length && Promise.allSettled(a);
      } catch (a) {
        throw console.error("Error updating question attempts", a), a;
      }
    }), (a, l) => (g(), v("div", Eo, [
      h("div", ko, [
        h("div", Qo, [
          h("table", null, [
            Do,
            h("tbody", null, [
              (g(!0), v(U, null, tt(Object.entries(A(e)), ([f, p]) => (g(), v("tr", {
                key: f,
                class: "quiz-statment"
              }, [
                h("td", $o, [
                  h("a", {
                    href: p.question.link,
                    target: "_blank",
                    innerHTML: p.question.statement
                  }, null, 8, Vo)
                ]),
                h("td", Oo, [
                  (g(!0), v(U, null, tt(Object.entries(
                    p.question.optionsList
                  ), ([m, _]) => (g(), v("span", { key: m }, [
                    _.optionCorrect ? (g(), v("span", {
                      key: 0,
                      innerHTML: _.optionValue
                    }, null, 8, qo)) : $("", !0)
                  ]))), 128))
                ]),
                h("td", No, [
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
        h("div", Io, [
          h("span", Lo, "⌛ Result: " + k(A(i)) + " out of " + k(A(n)) + " - (" + k(A(r)) + " %)", 1)
        ])
      ])
    ]));
  }
}), me = /* @__PURE__ */ x(xo, [["__scopeId", "data-v-38adb08e"]]), Mo = { class: "questions-left-header" }, jo = /* @__PURE__ */ O({
  __name: "MCQQuiz",
  setup(t) {
    const s = T(), o = z();
    vt(() => {
      n();
    });
    const e = () => {
      o.enqueueQuestion(s.value), s.value = o.dequeueQuestion();
    }, n = () => {
      o.setAnsweredQuestionsNum(), s.value = o.dequeueQuestion();
    }, i = () => window.location.reload();
    return (r, c) => {
      const a = ke("MCQInfoPanel");
      return g(), v("main", null, [
        et(a),
        h("h3", Mo, " Question " + k(A(o).getAnsweredQuestionsNum()) + " out of " + k(A(o).quizStats.length), 1),
        s.value ? (g(), M(fe, {
          key: 0,
          statement: s.value.statement,
          "options-list": s.value.optionsList,
          _id: s.value._id,
          onNextQuestion: n,
          onSkipQuestion: e
        }, null, 8, ["statement", "options-list", "_id"])) : $("", !0),
        s.value ? $("", !0) : (g(), M(me, { key: 1 })),
        s.value ? $("", !0) : (g(), v("button", {
          key: 2,
          class: "btn-relocate",
          onClick: i
        }, " End "))
      ]);
    };
  }
}), zo = /* @__PURE__ */ x(jo, [["__scopeId", "data-v-edc7c7f1"]]), Ro = {
  key: 0,
  class: "time-left-header"
}, Uo = { class: "questions-left-header" }, Ho = /* @__PURE__ */ O({
  __name: "MCQInfoPanel",
  props: {
    timeLeft: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const s = z(), o = (e) => {
      const n = Math.floor(e / 60), i = e % 60;
      return `${n}:${i < 10 ? "0" : ""}${i}`;
    };
    return (e, n) => (g(), v(U, null, [
      t.timeLeft ? (g(), v("h3", Ro, " Time left: " + k(o(t.timeLeft)), 1)) : $("", !0),
      h("h3", Uo, " Question " + k(A(s).questionsStack.length) + " out of " + k(A(s).quizStats.length), 1)
    ], 64));
  }
}), Ft = 1e3, Fo = "-1", Bo = /* @__PURE__ */ O({
  __name: "MCQTimedQuiz",
  setup(t) {
    const s = z(), o = T();
    let e = null, n = null;
    const i = T(s.timeLimit);
    vt(() => {
      c();
    }), Jt(() => {
      l(), f();
    });
    const r = () => {
      o.value = s.removeFromLastHistory() ?? o.value;
    }, c = () => o.value = s.dequeueQuestion(), a = () => window.location.reload(), l = () => {
      e && clearTimeout(e), n && clearInterval(n);
    }, f = () => {
      i.value = s.timeLimit;
      const m = () => o.value ? i.value ? i.value-- : p() : l();
      n = window.setInterval(m, Ft), e = window.setTimeout(() => {
      }, s.timeLimit * Ft);
    }, p = () => {
      var _;
      l();
      const m = (D) => s.incrementStat(D, "attempts", Fo);
      for (m(((_ = o.value) == null ? void 0 : _._id.$oid) ?? ""); o.value = s.dequeueQuestion(); )
        m(o.value._id.$oid);
      return alert("Time's up! Quiz has ended."), c();
    };
    return (m, _) => (g(), v("main", null, [
      et(Ho, { "time-left": i.value }, null, 8, ["time-left"]),
      o.value ? (g(), M(fe, {
        key: 0,
        statement: o.value.statement,
        "options-list": o.value.optionsList,
        _id: o.value._id,
        onNextQuestion: c,
        onPrevQuestion: r
      }, null, 8, ["statement", "options-list", "_id"])) : $("", !0),
      o.value ? $("", !0) : (g(), M(me, { key: 1 })),
      o.value ? $("", !0) : (g(), v("button", {
        key: 2,
        class: "btn-relocate",
        onClick: a
      }, " End "))
    ]));
  }
}), Wo = /* @__PURE__ */ x(Bo, [["__scopeId", "data-v-4fd74e68"]]), Go = ["id", "name", "value", "disabled"], Jo = ["for"], Yo = {
  key: 0,
  class: "question-number"
}, Ko = /* @__PURE__ */ O({
  __name: "FilterCheckbox",
  props: {
    category: {},
    topics: {}
  },
  setup(t) {
    const { category: s, topics: o } = t, e = z(), n = (a) => s === "course" ? a.toUpperCase() : a, i = qt(
      () => Object.entries(o).map(([a, l]) => {
        const f = c(l, s), p = _o(
          e.allQs,
          l,
          s
        ).length.toString();
        return { idx: a, topic: l, num: f, questionamount: p };
      }).filter(({ topic: a }) => a !== void 0)
    ), r = (a) => {
      if (!(a.target instanceof HTMLInputElement))
        return console.error("Trying to click on non-input element");
      const l = a.target.name, f = a.target.value;
      e.modifySelectedTags(a.target.checked, { category: l, topic: f });
    }, c = (a, l) => {
      var _;
      const f = e.getselectedtags();
      if (!f[l] || (_ = f[l]) != null && _.includes(
        a
      ))
        return null;
      const p = JSON.parse(
        JSON.stringify(e.getselectedtags())
      );
      p[l].includes(a) || p[l].push(a);
      const m = e.allQs;
      return It(
        m,
        p
      ).length.toString();
    };
    return (a, l) => (g(), v("ul", null, [
      (g(!0), v(U, null, tt(i.value, ({ idx: f, num: p, topic: m, questionamount: _ }) => (g(), v("li", {
        key: f,
        class: H(["filter-options", { "grey-out": p === "0" }])
      }, [
        h("input", {
          id: `${a.category}-${m}-checkbox`,
          type: "checkbox",
          name: a.category,
          value: m,
          disabled: p === "0",
          onChange: l[0] || (l[0] = (D) => r(D))
        }, null, 40, Go),
        h("label", {
          for: `${a.category}-${m}-checkbox`
        }, [
          Yt(k(n(m)) + " ", 1),
          p !== null && p !== "0" ? (g(), v("span", Yo, k(_), 1)) : $("", !0)
        ], 8, Jo)
      ], 2))), 128))
    ]));
  }
}), Xo = /* @__PURE__ */ x(Ko, [["__scopeId", "data-v-43544b02"]]), Zo = {
  key: 0,
  class: "filter"
}, ts = { class: "category-heading" }, es = /* @__PURE__ */ O({
  __name: "MCQTagOptions",
  setup(t) {
    const s = T([]), o = z();
    let e = {};
    return Vt(
      () => o.allQs,
      (n, i) => {
        o.setTagSet(), s.value = o.getTagSet(), e = pe(s.value);
      }
    ), (n, i) => A(o).allQs ? (g(), v("div", Zo, [
      (g(!0), v(U, null, tt(Object.entries(A(e)), ([r, c]) => (g(), v("div", {
        key: r,
        class: "category"
      }, [
        h("h2", ts, k(r), 1),
        et(Xo, {
          category: r,
          topics: c
        }, null, 8, ["category", "topics"])
      ]))), 128))
    ])) : $("", !0);
  }
}), os = /* @__PURE__ */ x(es, [["__scopeId", "data-v-ebc7fb2c"]]), ss = { for: "optionName" }, ns = ["value"], is = /* @__PURE__ */ O({
  __name: "DropDownbox",
  props: {
    options: {},
    optionName: {},
    disabled: { type: Boolean }
  },
  setup(t) {
    const s = z(), o = T(0);
    function e(n) {
      const i = n.target;
      i.value && (o.value = parseFloat(i.value) * 60, s.setTimeLimit(o.value));
    }
    return (n, i) => (g(), v("div", {
      class: H(n.disabled ? "dropdown input-disabled" : "dropdown")
    }, [
      h("label", ss, k(n.optionName) + ":   ", 1),
      h("select", {
        id: "optionName",
        name: "optionName",
        onChange: e
      }, [
        (g(!0), v(U, null, tt(n.options, (r) => (g(), v("option", {
          key: r.value,
          value: r.value
        }, k(r.value) + " " + k(r.unit), 9, ns))), 128))
      ], 32)
    ], 2));
  }
}), rs = /* @__PURE__ */ x(is, [["__scopeId", "data-v-5f3ae97a"]]), lt = (t) => (Wt("data-v-c3d686ea"), t = t(), Gt(), t), as = { class: "start-page-container" }, cs = /* @__PURE__ */ lt(() => /* @__PURE__ */ h("h1", null, "VetCloud Smart Quiz", -1)), ls = { class: "quiz-config-container" }, us = { class: "question-config-container" }, ps = { class: "tag-text" }, ds = { class: "question-number" }, fs = { class: "question-amount-container" }, ms = /* @__PURE__ */ lt(() => /* @__PURE__ */ h("label", { for: "question-amount" }, "Select the amount of questions:", -1)), hs = ["max"], gs = {
  key: 0,
  class: "show-max-msg"
}, bs = /* @__PURE__ */ lt(() => /* @__PURE__ */ h("label", { for: "mode-select" }, "Select mode:", -1)), _s = /* @__PURE__ */ lt(() => /* @__PURE__ */ h("option", { value: "Tutor" }, "Tutor", -1)), vs = /* @__PURE__ */ lt(() => /* @__PURE__ */ h("option", { value: "Timed" }, "Timed", -1)), ys = [
  _s,
  vs
], As = 3e3, Ts = /* @__PURE__ */ O({
  __name: "StartPage",
  emits: ["start-quiz"],
  setup(t, { emit: s }) {
    const o = T(1), e = T("Tutor"), n = T(!1), i = T(null), r = s, c = z();
    vt(() => {
      Qe(() => {
        const f = c.getquestionnumber();
        o.value = Math.min(10, f);
      });
    });
    const a = () => {
      r("start-quiz", {
        questionAmount: o.value,
        mode: e.value
      });
    }, l = () => {
      i.value && clearTimeout(i.value), o.value > c.getquestionnumber() && (o.value = c.getquestionnumber(), n.value = !0, i.value = window.setTimeout(() => {
        n.value = !1;
      }, As));
    };
    return (f, p) => (g(), v("div", as, [
      cs,
      et(os),
      h("div", ls, [
        h("div", us, [
          h("p", ps, [
            Yt(" Maximum possible questions: "),
            h("span", ds, k(A(c).getquestionnumber()), 1)
          ]),
          h("div", fs, [
            ms,
            xt(h("input", {
              id: "question-amount",
              "onUpdate:modelValue": p[0] || (p[0] = (m) => o.value = m),
              type: "number",
              placeholder: "Question amount",
              min: "1",
              max: A(c).getquestionnumber(),
              onInput: l
            }, null, 40, hs), [
              [
                De,
                o.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          n.value ? (g(), v("p", gs, " Cannot select more than " + k(A(c).getquestionnumber()) + " questions. ", 1)) : $("", !0),
          h("div", null, [
            bs,
            xt(h("select", {
              id: "mode-select",
              "onUpdate:modelValue": p[1] || (p[1] = (m) => e.value = m)
            }, ys, 512), [
              [$e, e.value]
            ])
          ]),
          et(rs, {
            options: [
              { value: 1, label: "Time Option 2", unit: "Min." },
              { value: 1.5, label: "Time Option 1", unit: "Min." }
            ],
            "option-name": "Time per Question",
            class: H(e.value === "Timed" ? "" : "input-disabled"),
            disabled: e.value !== "Timed"
          }, null, 8, ["options", "class", "disabled"])
        ])
      ]),
      h("button", {
        class: "start-button",
        onClick: a
      }, "Start")
    ]));
  }
}), ws = /* @__PURE__ */ x(Ts, [["__scopeId", "data-v-c3d686ea"]]), Ss = (t) => t.trim().toLowerCase().replace("_", " "), Cs = (t) => t.reduce((s, o) => {
  if (!o.includes(":"))
    return s;
  let [e, n] = o.split(":");
  return [e, n] = [e.trim().toLowerCase(), Ss(n)], s[e] ? s[e] = [...s[e], n] : s[e] = [n], s;
}, {}), Es = (t) => t.map((s) => ({
  _id: { $oid: s._id.$oid },
  statement: s.statement,
  tags: Cs(s.tags),
  optionsList: s.optionsList,
  link: s.link,
  attempts: s.attempts,
  correctAttempts: s.correctAttempts,
  lastAttempted: s.lastAttempted
})), he = { convertQuestions: Es }, ks = [
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
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Presynaptic terminal</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Cell body</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Dendrite</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Myelin</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af39b",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Reaching the subthreshold level does not stimulate the post-synaptic membrane</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Threshold event generates an action potential</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Reaching the subthreshold level is enough to generate an action potential</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Depolarised synaptic membrane is more negative than the hyperpolarised membrane</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0b",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>The effect of the subthreshold is enhanced</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Action potential is reached</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>A threshold event takes place</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>The membrane is hyperpolarised</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0a",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>IPSP can hyperpolarise the membrane</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>They can reach action potential as a result of IPSP</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>An action potential will be reached if the number of EPSP &gt; IPSP</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0d",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Relative refractory period</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Sodium conductance</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>EPSPs after IPSPs</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Hyperpolarised state</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0f",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Schwann cells</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Muller cells</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Oligodendrocytes</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac11",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214413464c71f1df2110d07",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Cerebrospinal fluid synthesis</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Delivering nutrients</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Recycling of neurotransmitters</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Maintenance of terminal environment</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac10",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214413464c71f1df2110d07",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "The action of metabotropic receptors is slower than ionotropic receptors",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "Neurotransmitter binding to metabotropic receptors causes a conformational change, activating a signal transduction pathway",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "An example of an ionotropic receptor is the nicotinic acetylcholine receptor",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86faa",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d5a64c71f1df2110d16",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "Hyperpolarisation due to blocking of sodium channels",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "Hyperpolarisation due to opening of chloride channels",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "Excitation due to opening of sodium channels",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fac",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d5a64c71f1df2110d16",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "Hyperpolarisation due to blocking of sodium channels",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "Hyperpolarisation due to opening of chloride channels",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "Excitation due to opening of sodium channels",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fab",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d5a64c71f1df2110d16",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Facilitating diffusion of the transmitter to the post-synaptic membrane</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Splitting the neurotransmitter in the synaptic cleft, deactivating the transmitter</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Fusing the pre-synaptic vesicle with the pre-synaptic membrane, thus releasing the transmitter</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Metabolising the transmitter within the pre-synaptic vesicle</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fae",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d7064c71f1df2110d17",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Diffusion of acetylcholine away from the synapse is solely responsible</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Acetylcholinesterase rapidly breaks down acetylcholine into choline and acetate</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Dissociation of acetylcholine from the muscarinic receptor, after binding for several seconds, is solely responsible</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fad",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d7064c71f1df2110d17",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
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
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Presynaptic terminal</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Cell body</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Dendrite</p>",
        optionCorrect: !0,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      },
      {
        optionValue: "<p>Myelin</p>",
        optionCorrect: !1,
        attempts: 0,
        correctAttempts: 0,
        lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
      }
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac06",
      attempts: 0,
      correctAttempts: 0,
      lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd",
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: /* @__PURE__ */ new Date("2024-08-07T09:55:35.944+00:00")
  }
], P = {
  isString: (r) => typeof r == "string",
  isObject: (r) => typeof r == "object" && r !== null,
  isBoolean: (r) => typeof r == "boolean",
  isArray: (r, c) => Array.isArray(r) && r.every(c),
  isNumber: (r) => typeof r == "number",
  isFunction: (r) => typeof r == "function"
};
function Dt(t) {
  const s = t.includes(":") && t.split(":").length === 2, o = !t.includes(":") && !t.includes(" ");
  return s || o;
}
function ge(t, s = !1) {
  return P.isArray(t, P.isString) ? s ? t.every(Dt) : t.some(Dt) : !1;
}
function Qs(t) {
  return P.isObject(t) && P.isString(t.optionValue) && (t.optionCorrect === void 0 || P.isBoolean(t.optionCorrect));
}
function be(t) {
  return P.isObject(t) && P.isObject(t._id) && // Assuming _id is an object with $oid property
  P.isString(t._id.$oid) && P.isString(t.statement) && ge(t.tags) && // Modified to ensure tags are always checked
  P.isArray(t.optionsList, Qs) && P.isString(t.link);
}
function Ds(t) {
  return P.isArray(t, be);
}
const ft = {
  isMCQuestion: be,
  isMCQuestionArray: Ds,
  validateTags: ge,
  isTag: Dt
}, $s = (t) => {
  try {
    if (!t)
      throw new Error("No question data found. Please Try again later.");
    return he.convertQuestions(_e(t));
  } catch (s) {
    return alert(s), [];
  }
}, Vs = () => ks, Os = () => {
  const t = Vs();
  return he.convertQuestions(_e(t));
};
function _e(t) {
  ft.isMCQuestionArray(t) ? console.info(
    "%cAll questions are valid",
    "color: #00FF00",
    `
Total Questions Validated:`,
    t.length
  ) : console.warn(
    "%cWARNING: Some questions contains invalid structure",
    "color: #FF0000"
  );
  const s = {
    invalidTags: 0,
    noTags: 0,
    invalidQs: 0,
    totalTags: 0
  }, o = t.reduce((e, n) => {
    if (!ft.isMCQuestion(n))
      return { ...e, invalidQs: e.invalidQs + 1 };
    let { tags: i } = n;
    if (!i || Array.isArray(i) && !i.length)
      return { ...e, noTags: e.noTags + 1 };
    const r = e.totalTags + i.length;
    if (!ft.validateTags(i, !0)) {
      const c = i.filter((l) => ft.isTag(l)), a = e.invalidTags + i.length - c.length;
      return i = c, { ...e, invalidTags: a, totalTags: r };
    }
    return { ...e, totalTags: r };
  }, s);
  return qs(o, t.length), t;
}
function wt(t, s) {
  t && console.warn(s, "color: #FF0000");
}
function qs(t, s) {
  const { invalidQs: o, invalidTags: e, noTags: n, totalTags: i } = t;
  wt(
    o,
    `Invalid Questions Received: %c${o} out of ${s}`
  ), wt(
    e,
    `Filtering out invalid tags: %c${e} out of ${i}`
  ), wt(n, `Questions with no tags: %c${n}`);
}
const Ns = /* @__PURE__ */ O({
  __name: "CrucibleComponent",
  props: {
    level: {
      type: Number,
      default: 5
      // a default value is required for Vue props
    }
  },
  setup(t) {
    const s = t, o = T(0), e = z(), n = T(!1), i = T([]), r = $t("$dataLink"), { level: c } = St(s);
    Jt(async () => {
      const f = await (async () => (await (await fetch(`${r}?level=${c.value}`)).json()).questions)();
      i.value = r ? $s(f) : Os(), e.allQs = i.value;
      const p = pe(
        i.value.map((m) => m.tags)
      );
      e.setselectedTags(
        Object.keys(p).reduce((m, _) => ({ ...m, [_]: [] }), {})
      ), e.setTagSet();
    });
    const a = ({ questionAmount: l, mode: f }) => {
      const p = e.getselectedtags();
      if (!i.value.length)
        return alert("Trouble fetching questions, please try again later");
      const m = It(
        i.value,
        p
      ), _ = bo(l, m);
      o.value = _.length, e.initialiseQuiz(_, f), f === "Timed" && e.setTimeLimit(l * e.timeLimit), n.value = !0;
    };
    return (l, f) => n.value && A(e).quizMode === "Tutor" ? (g(), M(zo, { key: 0 })) : n.value && A(e).quizMode === "Timed" ? (g(), M(Wo, { key: 1 })) : (g(), M(ws, {
      key: 2,
      onStartQuiz: a
    }));
  }
}), Ps = {
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
}, ve = async (t, s) => {
};
function xs(t, s = {}) {
  const o = eo();
  t.use(o), t.component("CrucibleComponent", Ns), t.provide("$dataLink", s.dataLink || Ps), t.provide(
    "$updateQAttemptCallback",
    s.updateQAttemptCallback || ve
  );
}
export {
  Ns as CrucibleComponent,
  xs as createViewerPlugin,
  Ps as defaultData,
  ve as defaultUpdateQAttemptCallback
};
