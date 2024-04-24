import { effectScope as Me, ref as w, markRaw as F, hasInjectionContext as uo, inject as fo, getCurrentInstance as ho, toRaw as he, watch as Qe, reactive as bo, isRef as ie, isReactive as we, toRef as Ve, nextTick as $e, computed as Se, unref as _, getCurrentScope as mo, onScopeDispose as yo, toRefs as Ne, defineComponent as j, openBlock as h, createElementBlock as y, Fragment as H, normalizeClass as K, withModifiers as go, createElementVNode as d, toDisplayString as E, renderList as Y, createVNode as Ee, createBlock as A, createCommentVNode as L, pushScopeId as De, popScopeId as Be, onMounted as ze, onBeforeMount as Vo, createTextVNode as Co, withDirectives as xe, vModelText as vo, vModelSelect as Po } from "vue";
var Fe = !1;
function le(e, t, o) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, o), o) : (e[t] = o, o);
}
function Ce(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
function _o() {
  return Ue().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Ue() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const To = typeof Proxy == "function", wo = "devtools-plugin:setup", So = "plugin:settings:set";
let G, ve;
function Eo() {
  var e;
  return G !== void 0 || (typeof window < "u" && window.performance ? (G = !0, ve = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (G = !0, ve = globalThis.perf_hooks.performance) : G = !1), G;
}
function ko() {
  return Eo() ? ve.now() : Date.now();
}
class Lo {
  constructor(t, o) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = o;
    const s = {};
    if (t.settings)
      for (const n in t.settings) {
        const a = t.settings[n];
        s[n] = a.defaultValue;
      }
    const i = `__vue-devtools-plugin-settings__${t.id}`;
    let r = Object.assign({}, s);
    try {
      const n = localStorage.getItem(i), a = JSON.parse(n);
      Object.assign(r, a);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return r;
      },
      setSettings(n) {
        try {
          localStorage.setItem(i, JSON.stringify(n));
        } catch {
        }
        r = n;
      },
      now() {
        return ko();
      }
    }, o && o.on(So, (n, a) => {
      n === this.plugin.id && this.fallbacks.setSettings(a);
    }), this.proxiedOn = new Proxy({}, {
      get: (n, a) => this.target ? this.target.on[a] : (...c) => {
        this.onQueue.push({
          method: a,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (n, a) => this.target ? this.target[a] : a === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(a) ? (...c) => (this.targetQueue.push({
        method: a,
        args: c,
        resolve: () => {
        }
      }), this.fallbacks[a](...c)) : (...c) => new Promise((l) => {
        this.targetQueue.push({
          method: a,
          args: c,
          resolve: l
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const o of this.onQueue)
      this.target.on[o.method](...o.args);
    for (const o of this.targetQueue)
      o.resolve(await this.target[o.method](...o.args));
  }
}
function Ge(e, t) {
  const o = e, s = Ue(), i = _o(), r = To && o.enableEarlyProxy;
  if (i && (s.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !r))
    i.emit(wo, e, t);
  else {
    const n = r ? new Lo(o, i) : null;
    (s.__VUE_DEVTOOLS_PLUGINS__ = s.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: o,
      setupFn: t,
      proxy: n
    }), n && t(n.proxiedTarget);
  }
}
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let te;
const ae = (e) => te = e, Je = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function U(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var W;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(W || (W = {}));
const be = typeof window < "u", se = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && be, je = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function qo(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function ke(e, t, o) {
  const s = new XMLHttpRequest();
  s.open("GET", e), s.responseType = "blob", s.onload = function() {
    Ye(s.response, t, o);
  }, s.onerror = function() {
    console.error("could not download file");
  }, s.send();
}
function Ze(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function pe(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const o = document.createEvent("MouseEvents");
    o.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(o);
  }
}
const ue = typeof navigator == "object" ? navigator : { userAgent: "" }, Ke = /Macintosh/.test(ue.userAgent) && /AppleWebKit/.test(ue.userAgent) && !/Safari/.test(ue.userAgent), Ye = be ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Ke ? $o : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in ue ? No : (
      // Fallback to using FileReader and a popup
      xo
    )
  )
) : () => {
};
function $o(e, t = "download", o) {
  const s = document.createElement("a");
  s.download = t, s.rel = "noopener", typeof e == "string" ? (s.href = e, s.origin !== location.origin ? Ze(s.href) ? ke(e, t, o) : (s.target = "_blank", pe(s)) : pe(s)) : (s.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(s.href);
  }, 4e4), setTimeout(function() {
    pe(s);
  }, 0));
}
function No(e, t = "download", o) {
  if (typeof e == "string")
    if (Ze(e))
      ke(e, t, o);
    else {
      const s = document.createElement("a");
      s.href = e, s.target = "_blank", setTimeout(function() {
        pe(s);
      });
    }
  else
    navigator.msSaveOrOpenBlob(qo(e, o), t);
}
function xo(e, t, o, s) {
  if (s = s || open("", "_blank"), s && (s.document.title = s.document.body.innerText = "downloading..."), typeof e == "string")
    return ke(e, t, o);
  const i = e.type === "application/octet-stream", r = /constructor/i.test(String(je.HTMLElement)) || "safari" in je, n = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((n || i && r || Ke) && typeof FileReader < "u") {
    const a = new FileReader();
    a.onloadend = function() {
      let c = a.result;
      if (typeof c != "string")
        throw s = null, new Error("Wrong reader.result type");
      c = n ? c : c.replace(/^data:[^;]*;/, "data:attachment/file;"), s ? s.location.href = c : location.assign(c), s = null;
    }, a.readAsDataURL(e);
  } else {
    const a = URL.createObjectURL(e);
    s ? s.location.assign(a) : location.href = a, s = null, setTimeout(function() {
      URL.revokeObjectURL(a);
    }, 4e4);
  }
}
function T(e, t) {
  const o = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(o, t) : t === "error" ? console.error(o) : t === "warn" ? console.warn(o) : console.log(o);
}
function Le(e) {
  return "_a" in e && "install" in e;
}
function Xe() {
  if (!("clipboard" in navigator))
    return T("Your browser doesn't support the Clipboard API", "error"), !0;
}
function eo(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (T('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function jo(e) {
  if (!Xe())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), T("Global state copied to clipboard.");
    } catch (t) {
      if (eo(t))
        return;
      T("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function Oo(e) {
  if (!Xe())
    try {
      oo(e, JSON.parse(await navigator.clipboard.readText())), T("Global state pasted from clipboard.");
    } catch (t) {
      if (eo(t))
        return;
      T("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function Io(e) {
  try {
    Ye(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    T("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let R;
function Ao() {
  R || (R = document.createElement("input"), R.type = "file", R.accept = ".json");
  function e() {
    return new Promise((t, o) => {
      R.onchange = async () => {
        const s = R.files;
        if (!s)
          return t(null);
        const i = s.item(0);
        return t(i ? { text: await i.text(), file: i } : null);
      }, R.oncancel = () => t(null), R.onerror = o, R.click();
    });
  }
  return e;
}
async function Wo(e) {
  try {
    const o = await Ao()();
    if (!o)
      return;
    const { text: s, file: i } = o;
    oo(e, JSON.parse(s)), T(`Global state imported from "${i.name}".`);
  } catch (t) {
    T("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function oo(e, t) {
  for (const o in t) {
    const s = e.state.value[o];
    s ? Object.assign(s, t[o]) : e.state.value[o] = t[o];
  }
}
function I(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const to = "🍍 Pinia (root)", Pe = "_root";
function Ho(e) {
  return Le(e) ? {
    id: Pe,
    label: to
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Ro(e) {
  if (Le(e)) {
    const o = Array.from(e._s.keys()), s = e._s;
    return {
      state: o.map((r) => ({
        editable: !0,
        key: r,
        value: e.state.value[r]
      })),
      getters: o.filter((r) => s.get(r)._getters).map((r) => {
        const n = s.get(r);
        return {
          editable: !1,
          key: r,
          value: n._getters.reduce((a, c) => (a[c] = n[c], a), {})
        };
      })
    };
  }
  const t = {
    state: Object.keys(e.$state).map((o) => ({
      editable: !0,
      key: o,
      value: e.$state[o]
    }))
  };
  return e._getters && e._getters.length && (t.getters = e._getters.map((o) => ({
    editable: !1,
    key: o,
    value: e[o]
  }))), e._customProperties.size && (t.customProperties = Array.from(e._customProperties).map((o) => ({
    editable: !0,
    key: o,
    value: e[o]
  }))), t;
}
function Mo(e) {
  return e ? Array.isArray(e) ? e.reduce((t, o) => (t.keys.push(o.key), t.operations.push(o.type), t.oldValue[o.key] = o.oldValue, t.newValue[o.key] = o.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: I(e.type),
    key: I(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function Qo(e) {
  switch (e) {
    case W.direct:
      return "mutation";
    case W.patchFunction:
      return "$patch";
    case W.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let Z = !0;
const fe = [], z = "pinia:mutations", S = "pinia", { assign: Do } = Object, de = (e) => "🍍 " + e;
function Bo(e, t) {
  Ge({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: fe,
    app: e
  }, (o) => {
    typeof o.now != "function" && T("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), o.addTimelineLayer({
      id: z,
      label: "Pinia 🍍",
      color: 15064968
    }), o.addInspector({
      id: S,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            jo(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await Oo(t), o.sendInspectorTree(S), o.sendInspectorState(S);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            Io(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Wo(t), o.sendInspectorTree(S), o.sendInspectorState(S);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (s) => {
            const i = t._s.get(s);
            i ? typeof i.$reset != "function" ? T(`Cannot reset "${s}" store because it doesn't have a "$reset" method implemented.`, "warn") : (i.$reset(), T(`Store "${s}" reset.`)) : T(`Cannot reset "${s}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), o.on.inspectComponent((s, i) => {
      const r = s.componentInstance && s.componentInstance.proxy;
      if (r && r._pStores) {
        const n = s.componentInstance.proxy._pStores;
        Object.values(n).forEach((a) => {
          s.instanceData.state.push({
            type: de(a.$id),
            key: "state",
            editable: !0,
            value: a._isOptionsAPI ? {
              _custom: {
                value: he(a.$state),
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
              Object.keys(a.$state).reduce((c, l) => (c[l] = a.$state[l], c), {})
            )
          }), a._getters && a._getters.length && s.instanceData.state.push({
            type: de(a.$id),
            key: "getters",
            editable: !1,
            value: a._getters.reduce((c, l) => {
              try {
                c[l] = a[l];
              } catch (b) {
                c[l] = b;
              }
              return c;
            }, {})
          });
        });
      }
    }), o.on.getInspectorTree((s) => {
      if (s.app === e && s.inspectorId === S) {
        let i = [t];
        i = i.concat(Array.from(t._s.values())), s.rootNodes = (s.filter ? i.filter((r) => "$id" in r ? r.$id.toLowerCase().includes(s.filter.toLowerCase()) : to.toLowerCase().includes(s.filter.toLowerCase())) : i).map(Ho);
      }
    }), o.on.getInspectorState((s) => {
      if (s.app === e && s.inspectorId === S) {
        const i = s.nodeId === Pe ? t : t._s.get(s.nodeId);
        if (!i)
          return;
        i && (s.state = Ro(i));
      }
    }), o.on.editInspectorState((s, i) => {
      if (s.app === e && s.inspectorId === S) {
        const r = s.nodeId === Pe ? t : t._s.get(s.nodeId);
        if (!r)
          return T(`store "${s.nodeId}" not found`, "error");
        const { path: n } = s;
        Le(r) ? n.unshift("state") : (n.length !== 1 || !r._customProperties.has(n[0]) || n[0] in r.$state) && n.unshift("$state"), Z = !1, s.set(r, n, s.state.value), Z = !0;
      }
    }), o.on.editComponentState((s) => {
      if (s.type.startsWith("🍍")) {
        const i = s.type.replace(/^🍍\s*/, ""), r = t._s.get(i);
        if (!r)
          return T(`store "${i}" not found`, "error");
        const { path: n } = s;
        if (n[0] !== "state")
          return T(`Invalid path for store "${i}":
${n}
Only state can be modified.`);
        n[0] = "$state", Z = !1, s.set(r, n, s.state.value), Z = !0;
      }
    });
  });
}
function zo(e, t) {
  fe.includes(de(t.$id)) || fe.push(de(t.$id)), Ge({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: fe,
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
    const s = typeof o.now == "function" ? o.now.bind(o) : Date.now;
    t.$onAction(({ after: n, onError: a, name: c, args: l }) => {
      const b = so++;
      o.addTimelineEvent({
        layerId: z,
        event: {
          time: s(),
          title: "🛫 " + c,
          subtitle: "start",
          data: {
            store: I(t.$id),
            action: I(c),
            args: l
          },
          groupId: b
        }
      }), n((m) => {
        M = void 0, o.addTimelineEvent({
          layerId: z,
          event: {
            time: s(),
            title: "🛬 " + c,
            subtitle: "end",
            data: {
              store: I(t.$id),
              action: I(c),
              args: l,
              result: m
            },
            groupId: b
          }
        });
      }), a((m) => {
        M = void 0, o.addTimelineEvent({
          layerId: z,
          event: {
            time: s(),
            logType: "error",
            title: "💥 " + c,
            subtitle: "end",
            data: {
              store: I(t.$id),
              action: I(c),
              args: l,
              error: m
            },
            groupId: b
          }
        });
      });
    }, !0), t._customProperties.forEach((n) => {
      Qe(() => _(t[n]), (a, c) => {
        o.notifyComponentUpdate(), o.sendInspectorState(S), Z && o.addTimelineEvent({
          layerId: z,
          event: {
            time: s(),
            title: "Change",
            subtitle: n,
            data: {
              newValue: a,
              oldValue: c
            },
            groupId: M
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: n, type: a }, c) => {
      if (o.notifyComponentUpdate(), o.sendInspectorState(S), !Z)
        return;
      const l = {
        time: s(),
        title: Qo(a),
        data: Do({ store: I(t.$id) }, Mo(n)),
        groupId: M
      };
      a === W.patchFunction ? l.subtitle = "⤵️" : a === W.patchObject ? l.subtitle = "🧩" : n && !Array.isArray(n) && (l.subtitle = n.type), n && (l.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: n
        }
      }), o.addTimelineEvent({
        layerId: z,
        event: l
      });
    }, { detached: !0, flush: "sync" });
    const i = t._hotUpdate;
    t._hotUpdate = F((n) => {
      i(n), o.addTimelineEvent({
        layerId: z,
        event: {
          time: s(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: I(t.$id),
            info: I("HMR update")
          }
        }
      }), o.notifyComponentUpdate(), o.sendInspectorTree(S), o.sendInspectorState(S);
    });
    const { $dispose: r } = t;
    t.$dispose = () => {
      r(), o.notifyComponentUpdate(), o.sendInspectorTree(S), o.sendInspectorState(S), o.getSettings().logStoreChanges && T(`Disposed "${t.$id}" store 🗑`);
    }, o.notifyComponentUpdate(), o.sendInspectorTree(S), o.sendInspectorState(S), o.getSettings().logStoreChanges && T(`"${t.$id}" store installed 🆕`);
  });
}
let so = 0, M;
function Oe(e, t, o) {
  const s = t.reduce((i, r) => (i[r] = he(e)[r], i), {});
  for (const i in s)
    e[i] = function() {
      const r = so, n = o ? new Proxy(e, {
        get(...c) {
          return M = r, Reflect.get(...c);
        },
        set(...c) {
          return M = r, Reflect.set(...c);
        }
      }) : e;
      M = r;
      const a = s[i].apply(n, arguments);
      return M = void 0, a;
    };
}
function Fo({ app: e, store: t, options: o }) {
  if (t.$id.startsWith("__hot:"))
    return;
  t._isOptionsAPI = !!o.state, Oe(t, Object.keys(o.actions), t._isOptionsAPI);
  const s = t._hotUpdate;
  he(t)._hotUpdate = function(i) {
    s.apply(this, arguments), Oe(t, Object.keys(i._hmrPayload.actions), !!t._isOptionsAPI);
  }, zo(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    t
  );
}
function Uo() {
  const e = Me(!0), t = e.run(() => w({}));
  let o = [], s = [];
  const i = F({
    install(r) {
      ae(i), i._a = r, r.provide(Je, i), r.config.globalProperties.$pinia = i, se && Bo(r, i), s.forEach((n) => o.push(n)), s = [];
    },
    use(r) {
      return !this._a && !Fe ? s.push(r) : o.push(r), this;
    },
    _p: o,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return se && typeof Proxy < "u" && i.use(Fo), i;
}
function io(e, t) {
  for (const o in t) {
    const s = t[o];
    if (!(o in e))
      continue;
    const i = e[o];
    U(i) && U(s) && !ie(s) && !we(s) ? e[o] = io(i, s) : e[o] = s;
  }
  return e;
}
const ao = () => {
};
function Ie(e, t, o, s = ao) {
  e.push(t);
  const i = () => {
    const r = e.indexOf(t);
    r > -1 && (e.splice(r, 1), s());
  };
  return !o && mo() && yo(i), i;
}
function J(e, ...t) {
  e.slice().forEach((o) => {
    o(...t);
  });
}
const Go = (e) => e();
function _e(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((o, s) => e.set(s, o)), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const o in t) {
    if (!t.hasOwnProperty(o))
      continue;
    const s = t[o], i = e[o];
    U(i) && U(s) && e.hasOwnProperty(o) && !ie(s) && !we(s) ? e[o] = _e(i, s) : e[o] = s;
  }
  return e;
}
const Jo = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Zo(e) {
  return !U(e) || !e.hasOwnProperty(Jo);
}
const { assign: x } = Object;
function Ae(e) {
  return !!(ie(e) && e.effect);
}
function We(e, t, o, s) {
  const { state: i, actions: r, getters: n } = t, a = o.state.value[e];
  let c;
  function l() {
    !a && (process.env.NODE_ENV === "production" || !s) && (o.state.value[e] = i ? i() : {});
    const b = process.env.NODE_ENV !== "production" && s ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Ne(w(i ? i() : {}).value)
    ) : Ne(o.state.value[e]);
    return x(b, r, Object.keys(n || {}).reduce((m, g) => (process.env.NODE_ENV !== "production" && g in b && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${g}" in store "${e}".`), m[g] = F(Se(() => {
      ae(o);
      const C = o._s.get(e);
      return n[g].call(C, C);
    })), m), {}));
  }
  return c = Te(e, l, t, o, s, !0), c;
}
function Te(e, t, o = {}, s, i, r) {
  let n;
  const a = x({ actions: {} }, o);
  if (process.env.NODE_ENV !== "production" && !s._e.active)
    throw new Error("Pinia destroyed");
  const c = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Fe && (c.onTrigger = (f) => {
    l ? C = f : l == !1 && !u._hotUpdating && (Array.isArray(C) ? C.push(f) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let l, b, m = [], g = [], C;
  const k = s.state.value[e];
  !r && !k && (process.env.NODE_ENV === "production" || !i) && (s.state.value[e] = {});
  const O = w({});
  let re;
  function X(f) {
    let p;
    l = b = !1, process.env.NODE_ENV !== "production" && (C = []), typeof f == "function" ? (f(s.state.value[e]), p = {
      type: W.patchFunction,
      storeId: e,
      events: C
    }) : (_e(s.state.value[e], f), p = {
      type: W.patchObject,
      payload: f,
      storeId: e,
      events: C
    });
    const v = re = Symbol();
    $e().then(() => {
      re === v && (l = !0);
    }), b = !0, J(m, p, s.state.value[e]);
  }
  const ye = r ? function() {
    const { state: p } = o, v = p ? p() : {};
    this.$patch((q) => {
      x(q, v);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : ao
  );
  function ge() {
    n.stop(), m = [], g = [], s._s.delete(e);
  }
  function ce(f, p) {
    return function() {
      ae(s);
      const v = Array.from(arguments), q = [], ee = [];
      function lo(N) {
        q.push(N);
      }
      function po(N) {
        ee.push(N);
      }
      J(g, {
        args: v,
        name: f,
        store: u,
        after: lo,
        onError: po
      });
      let oe;
      try {
        oe = p.apply(this && this.$id === e ? this : u, v);
      } catch (N) {
        throw J(ee, N), N;
      }
      return oe instanceof Promise ? oe.then((N) => (J(q, N), N)).catch((N) => (J(ee, N), Promise.reject(N))) : (J(q, oe), oe);
    };
  }
  const V = /* @__PURE__ */ F({
    actions: {},
    getters: {},
    state: [],
    hotState: O
  }), P = {
    _p: s,
    // _s: scope,
    $id: e,
    $onAction: Ie.bind(null, g),
    $patch: X,
    $reset: ye,
    $subscribe(f, p = {}) {
      const v = Ie(m, f, p.detached, () => q()), q = n.run(() => Qe(() => s.state.value[e], (ee) => {
        (p.flush === "sync" ? b : l) && f({
          storeId: e,
          type: W.direct,
          events: C
        }, ee);
      }, x({}, c, p)));
      return v;
    },
    $dispose: ge
  }, u = bo(process.env.NODE_ENV !== "production" || se ? x(
    {
      _hmrPayload: V,
      _customProperties: F(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    P
    // must be added later
    // setupStore
  ) : P);
  s._s.set(e, u);
  const $ = (s._a && s._a.runWithContext || Go)(() => s._e.run(() => (n = Me()).run(t)));
  for (const f in $) {
    const p = $[f];
    if (ie(p) && !Ae(p) || we(p))
      process.env.NODE_ENV !== "production" && i ? le(O.value, f, Ve($, f)) : r || (k && Zo(p) && (ie(p) ? p.value = k[f] : _e(p, k[f])), s.state.value[e][f] = p), process.env.NODE_ENV !== "production" && V.state.push(f);
    else if (typeof p == "function") {
      const v = process.env.NODE_ENV !== "production" && i ? p : ce(f, p);
      $[f] = v, process.env.NODE_ENV !== "production" && (V.actions[f] = p), a.actions[f] = p;
    } else
      process.env.NODE_ENV !== "production" && Ae(p) && (V.getters[f] = r ? (
        // @ts-expect-error
        o.getters[f]
      ) : p, be && ($._getters || // @ts-expect-error: same
      ($._getters = F([]))).push(f));
  }
  if (x(u, $), x(he(u), $), Object.defineProperty(u, "$state", {
    get: () => process.env.NODE_ENV !== "production" && i ? O.value : s.state.value[e],
    set: (f) => {
      if (process.env.NODE_ENV !== "production" && i)
        throw new Error("cannot set hotState");
      X((p) => {
        x(p, f);
      });
    }
  }), process.env.NODE_ENV !== "production" && (u._hotUpdate = F((f) => {
    u._hotUpdating = !0, f._hmrPayload.state.forEach((p) => {
      if (p in u.$state) {
        const v = f.$state[p], q = u.$state[p];
        typeof v == "object" && U(v) && U(q) ? io(v, q) : f.$state[p] = q;
      }
      le(u, p, Ve(f.$state, p));
    }), Object.keys(u.$state).forEach((p) => {
      p in f.$state || Ce(u, p);
    }), l = !1, b = !1, s.state.value[e] = Ve(f._hmrPayload, "hotState"), b = !0, $e().then(() => {
      l = !0;
    });
    for (const p in f._hmrPayload.actions) {
      const v = f[p];
      le(u, p, ce(p, v));
    }
    for (const p in f._hmrPayload.getters) {
      const v = f._hmrPayload.getters[p], q = r ? (
        // special handling of options api
        Se(() => (ae(s), v.call(u, u)))
      ) : v;
      le(u, p, q);
    }
    Object.keys(u._hmrPayload.getters).forEach((p) => {
      p in f._hmrPayload.getters || Ce(u, p);
    }), Object.keys(u._hmrPayload.actions).forEach((p) => {
      p in f._hmrPayload.actions || Ce(u, p);
    }), u._hmrPayload = f._hmrPayload, u._getters = f._getters, u._hotUpdating = !1;
  })), se) {
    const f = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
      Object.defineProperty(u, p, x({ value: u[p] }, f));
    });
  }
  return s._p.forEach((f) => {
    if (se) {
      const p = n.run(() => f({
        store: u,
        app: s._a,
        pinia: s,
        options: a
      }));
      Object.keys(p || {}).forEach((v) => u._customProperties.add(v)), x(u, p);
    } else
      x(u, n.run(() => f({
        store: u,
        app: s._a,
        pinia: s,
        options: a
      })));
  }), process.env.NODE_ENV !== "production" && u.$state && typeof u.$state == "object" && typeof u.$state.constructor == "function" && !u.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${u.$id}".`), k && r && o.hydrate && o.hydrate(u.$state, k), l = !0, b = !0, u;
}
function Ko(e, t, o) {
  let s, i;
  const r = typeof t == "function";
  if (typeof e == "string")
    s = e, i = r ? o : t;
  else if (i = e, s = e.id, process.env.NODE_ENV !== "production" && typeof s != "string")
    throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
  function n(a, c) {
    const l = uo();
    if (a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && te && te._testing ? null : a) || (l ? fo(Je, null) : null), a && ae(a), process.env.NODE_ENV !== "production" && !te)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    a = te, a._s.has(s) || (r ? Te(s, t, i, a) : We(s, i, a), process.env.NODE_ENV !== "production" && (n._pinia = a));
    const b = a._s.get(s);
    if (process.env.NODE_ENV !== "production" && c) {
      const m = "__hot:" + s, g = r ? Te(m, t, i, a, !0) : We(m, x({}, i), a, !0);
      c._hotUpdate(g), delete a.state.value[m], a._s.delete(m);
    }
    if (process.env.NODE_ENV !== "production" && be) {
      const m = ho();
      if (m && m.proxy && // avoid adding stores that are just built for hot module replacement
      !c) {
        const g = m.proxy, C = "_pStores" in g ? g._pStores : g._pStores = {};
        C[s] = b;
      }
    }
    return b;
  }
  return n.$id = s, n;
}
const Yo = ["id", "checked"], Xo = ["for", "innerHTML"], et = /* @__PURE__ */ j({
  __name: "MCQOption",
  props: {
    optionKey: {},
    checked: { type: Boolean },
    option: {},
    submitted: { type: Boolean }
  },
  emits: ["selectOption"],
  setup(e, { emit: t }) {
    const o = t, s = () => o("selectOption");
    return (i, r) => (h(), y(H, null, [
      (h(), y("input", {
        id: "option-" + i.optionKey,
        key: i.optionKey,
        "test-id": "radio_options",
        type: "radio",
        name: "options",
        checked: i.checked,
        class: K(i.submitted && "ignore-hover"),
        onClick: [
          r[0] || (r[0] = (n) => s()),
          r[1] || (r[1] = go(() => {
          }, ["stop"]))
        ]
      }, null, 10, Yo)),
      (h(), y("label", {
        key: i.optionKey,
        for: "option-" + i.optionKey,
        class: K(i.submitted ? "mcq-option-label ignore-hover" : "mcq-option-label"),
        onClick: r[2] || (r[2] = (n) => s()),
        innerHTML: i.option.optionValue
      }, null, 10, Xo))
    ], 64));
  }
}), Q = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [s, i] of t)
    o[s] = i;
  return o;
}, ot = /* @__PURE__ */ Q(et, [["__scopeId", "data-v-a56daaa2"]]), tt = ["disabled"], st = /* @__PURE__ */ j({
  __name: "MCQButton",
  props: {
    submitted: { type: Boolean },
    selectedOption: {},
    hideSkip: { type: Boolean }
  },
  emits: ["submitAnswer", "nextQuestion", "skipQuestion"],
  setup(e, { emit: t }) {
    const o = w("skip"), s = w("Skip"), i = t, r = (c, l) => {
      !c && l ? n("next", "Next", "submitAnswer") : c && l ? n("skip", "Skip", "nextQuestion") : !c && !l && n("skip", "Skip", "skipQuestion");
    }, n = (c, l, b) => {
      o.value = c, s.value = l, i(b);
    }, a = (c, l) => c && l ? { class: "next", text: "Next" } : !c && l ? { class: "submit", text: "Submit" } : { class: o.value, text: s.value };
    return (c, l) => (h(), y("div", null, [
      d("button", {
        disabled: c.hideSkip && a(c.submitted, c.selectedOption).class === "skip",
        class: K(["mcq-button", a(c.submitted, c.selectedOption).class]),
        onClick: l[0] || (l[0] = (b) => r(c.submitted, c.selectedOption))
      }, E(a(c.submitted, c.selectedOption).text), 11, tt)
    ]));
  }
}), it = /* @__PURE__ */ Q(st, [["__scopeId", "data-v-2e313e3c"]]), at = /* @__PURE__ */ j({
  __name: "NextButton",
  props: {
    buttonName: {}
  },
  emits: ["nextQuestion", "prevQuestion"],
  setup(e, { emit: t }) {
    const { buttonName: o } = e, s = t, i = () => {
      r(o !== "←" ? "nextQuestion" : "prevQuestion");
    }, r = (n) => {
      s(n);
    };
    return (n, a) => (h(), y("div", null, [
      d("button", {
        class: "mcq-button",
        onClick: a[0] || (a[0] = (c) => i())
      }, E(n.buttonName), 1)
    ]));
  }
}), He = /* @__PURE__ */ Q(at, [["__scopeId", "data-v-081c5673"]]), nt = [
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
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
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
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
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>The resting membrane potential of a mammalian neuron is:</p>",
    optionsList: [
      {
        optionValue: "<p>&minus;55 mV</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>0 mV</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>70 mV</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>&minus;70 mV</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af39d"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>The membrane potential is due to:</p>",
    optionsList: [
      {
        optionValue: "<p>Na<sup>+</sup> diffusion in, K<sup>+</sup> diffusion out, the Na<sup>+</sup>/K<sup>+</sup> pump</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Na<sup>+</sup> diffusion out, K<sup>+</sup> diffusion in, the Na<sup>+</sup>/K<sup>+</sup> pump</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Na<sup>+</sup> diffusion out, K<sup>+</sup> diffusion out, the Na<sup>+</sup>/K<sup>+</sup> pump</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af39c"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
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
      $oid: "6625c7c8c8259deb8c3af3a1"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>What happens when an IPSP is generated after EPSP?</p>",
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
      $oid: "6625c7c8c8259deb8c3af39f"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
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
      $oid: "6625c7c8c8259deb8c3af3a0"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>What is the term used to describe an action potential that &ldquo;jumps&rdquo; from one node of Ranvier to another?</p>",
    optionsList: [
      {
        optionValue: "<p>EPSP conduction</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Saltatory conduction</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Myelinated conduction</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>IPSP conduction</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af3a3"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>What happens when the membrane potential goes below &minus;70 mV?</p>",
    optionsList: [
      {
        optionValue: "<p>Potassium conductance leads to potassium equilibrium potential</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Sodium equilibrium potential is reached</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Sodium conductance causes depolarisation</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Sodium conductance leads to potassium equilibrium potential</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>The membrane is depolarised</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af3a4"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
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
      $oid: "6625c7c8c8259deb8c3af3a2"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
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
      $oid: "6625c7c8c8259deb8c3af3a6"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214413464c71f1df2110d07"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
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
      $oid: "6625c7c8c8259deb8c3af3a5"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214413464c71f1df2110d07"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Which of the following statements is TRUE?</p>",
    optionsList: [
      {
        optionValue: "<p>Electrical synapses are mediated by neurotransmitters</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Connexons are ion channels connecting 2 adjacent cells,&nbsp;and their opening is modulated by intracellular K<sup>+</sup> concentration</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Neurotransmitter molecules are stored in vesicles in the pre-synaptic terminal</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>The synaptic cleft in an electrical synapse is 20&ndash;40 nm wide</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fa8"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d3a64c71f1df2110d15"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>During chemical neurotransmission, Ca<sup>2+</sup>&nbsp;ions are necessary for:</p>",
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
        optionValue: "<p>Fusing the pre-synaptic vesicle with the pre-synaptic membrane, thus releasing the transmitter</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Metabolising the transmitter within the pre-synaptic vesicle</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fa9"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d3a64c71f1df2110d15"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
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
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
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
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
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
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
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
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
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
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Which of the following structures is NOT a site where signal integration takes place?</p>",
    optionsList: [
      {
        optionValue: "<p>Brain nuclei</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Tracts</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Ganglia</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Grey matter</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed870d6"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bee64c71f1df2110d10/64005d36e322761352e0f0bf"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Which of the following statements about grey matter is TRUE?</p>",
    optionsList: [
      {
        optionValue: "<p>It forms the outer segment of the spinal cord</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It is found in tracts and nerves</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It is a site of signal integration</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>It is a site where axons are grouped together</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed870d8"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bee64c71f1df2110d10/64005d36e322761352e0f0bf"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Which of the following is a characteristic of a reflex?</p>",
    optionsList: [
      {
        optionValue: "<p>It requires conscious thought</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It does not require a stimulus to occur</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Sensory information is carried into the spinal cord via the ventral root</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It is reproducible</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed870d7"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bee64c71f1df2110d10/64005d36e322761352e0f0bf"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Which of the following statements is INCORRECT?</p>",
    optionsList: [
      {
        optionValue: "<p>The muscle fibre and neuronal cell membranes are similar because they both have a resting membrane potential</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>A whole muscle, such as the semitendinosus muscle, can be made to contract more forcefully by increasing the number of motor units contracting</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>The muscle cell membrane transmits action potentials by saltatory conduction</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>The shortening of a skeletal muscle during contraction is caused by the sliding together of actin and myosin filaments</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86faf"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bee64c71f1df2110d10/621846c064c71f1df2110d23"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>What class of muscle nerve fibre associated with muscle spindles fires quickly, and responds to a change in length?</p>",
    optionsList: [
      {
        optionValue: "<p>&alpha;</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>&gamma;</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Ia</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Ib</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>II</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fb3"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bee64c71f1df2110d10/621846c064c71f1df2110d23"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>What class of muscle nerve fibre associated with muscle spindles provides sensory input regarding the amount the muscle has stretched?</p>",
    optionsList: [
      {
        optionValue: "<p>&alpha;</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>&gamma;</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Ia</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Ib</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>II</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fb2"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bee64c71f1df2110d10/621846c064c71f1df2110d23"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Which of the following statements regarding the process of co-activation is FALSE?</p>",
    optionsList: [
      {
        optionValue: "<p>Intrafusal fibres receive motor innervation via &gamma;&nbsp;motor neurons</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>&gamma; motor neurons&nbsp;maintain the relative length of the muscle spindle, to the main muscle during contraction and relaxation</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>When muscle fibres contract, the muscle spindle shortens and the rate of action potentials in the afferent fibre increases</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>The purpose of maintaining muscle spindle tension is so that sensory information regarding changes in muscle length can still be signalled</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fb0"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bee64c71f1df2110d10/621846c064c71f1df2110d23"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Which of the following statements regarding Golgi tendon organs is FALSE?</p>",
    optionsList: [
      {
        optionValue: "<p>Golgi tendon organs are located in the muscular tendinous junctions</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Goldi tendon organs provide sensory information regarding muscle stretch</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Golgi tendon organs are innervated by Ib sensory afferents</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Golgi tendon organs provide sensory information regarding muscle tension</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fb1"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bee64c71f1df2110d10/621846c064c71f1df2110d23"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Tension is sensed by the Golgi tendon organ. Which of the following statements describes what happens next?</p>",
    optionsList: [
      {
        optionValue: "<p>Type Ib afferent is excited, synapses with an inhibitory interneuron to the &alpha; motor neuron to decrease forced output</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Type Ib afferent is excited, synapses with an inhibitory interneuron to the &gamma; motor neuron to decrease forced output</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Type Ib afferent is excited, synapses with an inhibitory interneuron to the &gamma; motor neuron to decrease forced output</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Type Ib afferent is excited, synapses with an inhibitory interneuron to the &alpha; motor neuron to increase forced output</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fb4"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bee64c71f1df2110d10/621846c064c71f1df2110d23"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Which of the following statements best describes the pain withdrawal reflex?</p>",
    optionsList: [
      {
        optionValue: "<p>A noxious stimulus results in inhibition of the flexor muscles and stimulation of the extensor muscles in the affected limb, and stimulation of the flexor muscles and inhibition of the extensor muscles in the contralateral limb</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>A noxious stimulus results in stimulation of the flexor muscles, and stimulation of the flexor muscles in the contralateral limb</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>The pain withdrawal reflex results in contraction of the extensor muscles of the opposite limb to a painful stimulus, and relaxation of the flexor muscles in the affected limb</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>A noxious stimulus results in stimulation of the flexor muscles and&nbsp;inhibition of the extensor muscles in the affected limb, and inhibition of the flexor muscles and stimulation of the extensor muscles in the contralateral limb</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fb5"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bee64c71f1df2110d10/621846cd64c71f1df2110d24"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>A gross skeletal muscle belly can be instructed (by the central nervous system) to contract more forcefully by:</p>",
    optionsList: [
      {
        optionValue: "<p>Causing more of its motor units to contract simultaneously</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Increasing the amount of acetylcholine released during each neuromuscular synaptic transmission</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Increasing the frequency of action potentials in the &alpha; motor neuron&rsquo;s axon</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Both a and c</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Both b and c</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fb6"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bee64c71f1df2110d10/621846db64c71f1df2110d25"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which mechanoreceptors are rapidly adapting and responsive to light touch?",
    optionsList: [
      {
        optionValue: "Pacini corpuscles",
        optionCorrect: !1
      },
      {
        optionValue: "Merkel disks",
        optionCorrect: !1
      },
      {
        optionValue: "Meissner corpuscles",
        optionCorrect: !0
      },
      {
        optionValue: "Ruffini endings",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fb7"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bf664c71f1df2110d11/6218483164c71f1df2110d2f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which mechanoreceptors sense vibration?",
    optionsList: [
      {
        optionValue: "Ruffini endings",
        optionCorrect: !1
      },
      {
        optionValue: "Pacinian corpuscles",
        optionCorrect: !0
      },
      {
        optionValue: "Hair follicle receptors",
        optionCorrect: !1
      },
      {
        optionValue: "Meissner corpuscles",
        optionCorrect: !1
      },
      {
        optionValue: "Merkel corpuscles",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fb9"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bf664c71f1df2110d11/6218483164c71f1df2110d2f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which of the following sensations are perceived by Merkel cells?",
    optionsList: [
      {
        optionValue: "Light pressure",
        optionCorrect: !0
      },
      {
        optionValue: "Crude touch",
        optionCorrect: !1
      },
      {
        optionValue: "Pain",
        optionCorrect: !1
      },
      {
        optionValue: "Vibration",
        optionCorrect: !1
      },
      {
        optionValue: "Temperature",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fb8"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bf664c71f1df2110d11/6218483164c71f1df2110d2f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which of the following receptors respond to stretch and have a wide receptive field?",
    optionsList: [
      {
        optionValue: "Meissner corpuscles",
        optionCorrect: !1
      },
      {
        optionValue: "Ruffini endings",
        optionCorrect: !0
      },
      {
        optionValue: "Merkel cells",
        optionCorrect: !1
      },
      {
        optionValue: "Pacinian corpuscles",
        optionCorrect: !1
      },
      {
        optionValue: "Hair cells",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fba"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bf664c71f1df2110d11/6218483164c71f1df2110d2f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Sensory nerve afferents can release substances that can cause pain. Which of the following substances would be the most likely to be derived from a sensory nerve?</p>",
    optionsList: [
      {
        optionValue: "<p>Histamine</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Acetylcholine</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Hydrogen ions</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Substance P</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fbd"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bf664c71f1df2110d11/6218484164c71f1df2110d30"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Peripheral sensitisation of the nociceptors decreases the pain threshold. Which of the following substances sensitises the nociceptor endings?</p>",
    optionsList: [
      {
        optionValue: "<p>Histamine</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Bradykinin</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Serotonin</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Potassium</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fbb"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bf664c71f1df2110d11/6218484164c71f1df2110d30"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Which of the following statements regarding <strong>secondary</strong> hyperalgesia is FALSE?</p>",
    optionsList: [
      {
        optionValue: "<p>The area surrounding a trauma can become tender</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Hypersensitivity is restricted to those nociceptors directly exposed to the injured or inflamed tissue</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Secondary hyperalgesia can alter central nociceptive processing in the spinal cord</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Central sensitisation manifests as pain hypersensitivity</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fbc"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bf664c71f1df2110d11/6218484164c71f1df2110d30"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Which of the following processes is the cerebral cortex NOT involved in?</p>",
    optionsList: [
      {
        optionValue: "Motor planning and execution",
        optionCorrect: !1
      },
      {
        optionValue: "Visual and auditory processing",
        optionCorrect: !1
      },
      {
        optionValue: "Somatosensory and spatial processing",
        optionCorrect: !1
      },
      {
        optionValue: "Helps provide smooth, coordinated body movement",
        optionCorrect: !0
      },
      {
        optionValue: "Learning and memory",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fbe"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bfc64c71f1df2110d12/62184c2564c71f1df2110d37"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which part of the cortex is responsible for visual processing?",
    optionsList: [
      {
        optionValue: "Broca&rsquo;s area",
        optionCorrect: !1
      },
      {
        optionValue: "Frontal lobe",
        optionCorrect: !1
      },
      {
        optionValue: "Occipital lobe",
        optionCorrect: !0
      },
      {
        optionValue: "Temporal lobe",
        optionCorrect: !1
      },
      {
        optionValue: "Limbic system",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fc1"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bfc64c71f1df2110d12/62184c2564c71f1df2110d37"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Where in the cortex does language comprehension take place?",
    optionsList: [
      {
        optionValue: "Wernicke&rsquo;s area",
        optionCorrect: !0
      },
      {
        optionValue: "Frontal lobe",
        optionCorrect: !1
      },
      {
        optionValue: "Occipital lobe",
        optionCorrect: !1
      },
      {
        optionValue: "Temporal lobe",
        optionCorrect: !1
      },
      {
        optionValue: "Limbic system",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fc0"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bfc64c71f1df2110d12/62184c2564c71f1df2110d37"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "The limbic system is the part of the brain involved in which of the following?",
    optionsList: [
      {
        optionValue: "Voluntary motor activity",
        optionCorrect: !1
      },
      {
        optionValue: "Long-term memory",
        optionCorrect: !0
      },
      {
        optionValue: "Planning movement",
        optionCorrect: !1
      },
      {
        optionValue: "Higher-order visual processing",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fc2"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bfc64c71f1df2110d12/62184c2564c71f1df2110d37"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which sensory pathway does NOT pass through the thalamus?",
    optionsList: [
      {
        optionValue: "Proprioception",
        optionCorrect: !1
      },
      {
        optionValue: "Olfactory",
        optionCorrect: !0
      },
      {
        optionValue: "Vestibular",
        optionCorrect: !1
      },
      {
        optionValue: "Visual",
        optionCorrect: !1
      },
      {
        optionValue: "Auditory",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fbf"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bfc64c71f1df2110d12/62184c2564c71f1df2110d37"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Which of the following is NOT a feature of habituation?</p>",
    optionsList: [
      {
        optionValue: "<p>Desensitisation is related to a decrease in synaptic connectivity between sensory and motor neurons</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Strengthens the response to a potentially dangerous stimulus</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Decreases the amplitude of excitatory post-synaptic potentials</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Long-term habituation results in a structural change in synaptic connections (they decrease in number)</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fc5"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bfc64c71f1df2110d12/62184c3564c71f1df2110d38"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>A client calls because their dog is getting more and more fearful when walking in their neighbourhood, where there&rsquo;s a lot of road traffic. Last week, a car back-fired noisily in the driveway, right next to the dog. What is this an example of?</p>",
    optionsList: [
      {
        optionValue: "<p>Classical conditioning</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Operant conditioning</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Habituation</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Sensitisation</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fc3"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bfc64c71f1df2110d12/62184c3564c71f1df2110d38"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "An animal trainer forms an association between a signal and the desired response by re-enforcing when this is achieved. For example, if a dog is barking at everyone that walks past a house, the trainer might start associating the word &ldquo;speak&rdquo; with the act of barking, by saying it every time the behaviour occurs. They then reinforce this with a treat. What is this an example of?",
    optionsList: [
      {
        optionValue: "Classical conditioning",
        optionCorrect: !1
      },
      {
        optionValue: "Operant conditioning",
        optionCorrect: !0
      },
      {
        optionValue: "Habituation",
        optionCorrect: !1
      },
      {
        optionValue: "Sensitisation",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fc4"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bfc64c71f1df2110d12/62184c3564c71f1df2110d38"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>During short-term sensitisation of a stimulus/response pathway, which neurotransmitter is released from the axon terminal of the facilitating interneuron?</p>",
    optionsList: [
      {
        optionValue: "<p>Dopamine</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Acetylcholine</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Glutamate</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Serotonin</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fc6"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bfc64c71f1df2110d12/62184c4564c71f1df2110d39"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Long-term sensitisation of a stimulus/response pathway will facilitate learning. Which of the following is NOT a feature of this process?</p>",
    optionsList: [
      {
        optionValue: "<p>Increased number of action potentials along motor neurons&nbsp;to carry out movement</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Increased number of vesicles</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Increased number of vesicle release sites</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Increased number of pre-synaptic terminals</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fc7"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bfc64c71f1df2110d12/62184c4564c71f1df2110d39"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Long-term memories are&nbsp;stored in which part of the brain?</p>",
    optionsList: [
      {
        optionValue: "<p>Occipital lobe</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Frontal lobe</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Hippocampus</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Wernicke&rsquo;s area</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fc8"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183bfc64c71f1df2110d12/62184c4564c71f1df2110d39"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Where does the calcium bind in the thin filament?</p>",
    optionsList: [
      {
        optionValue: "<p>Troponin C</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Troponin I</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Actin</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Tropomyosin</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Troponin T</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fc9"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218633464c71f1df2110d4c"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Which of the following is NOT a part of the thin filament?</p>",
    optionsList: [
      {
        optionValue: "<p>Tropomyosin</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Actin</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Myosin heads</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Troponin C</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Troponin T</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fca"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218633464c71f1df2110d4c"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which of the following is activated by membrane depolarisation within the T-tubule of a skeletal myocyte?",
    optionsList: [
      {
        optionValue: "Ionotropic nicotinic receptor",
        optionCorrect: !1
      },
      {
        optionValue: "Ryanodine receptor",
        optionCorrect: !1
      },
      {
        optionValue: "5HT receptor",
        optionCorrect: !1
      },
      {
        optionValue: "Metabotropic nicotinic receptor",
        optionCorrect: !1
      },
      {
        optionValue: "Dihydropyridine receptor",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fcb"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218634464c71f1df2110d4d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which neurotransmitter is responsible for the initiation of skeletal muscle contraction?",
    optionsList: [
      {
        optionValue: "GABA",
        optionCorrect: !1
      },
      {
        optionValue: "Norepinephrine",
        optionCorrect: !1
      },
      {
        optionValue: "Acetylcholine",
        optionCorrect: !0
      },
      {
        optionValue: "Glutamine",
        optionCorrect: !1
      },
      {
        optionValue: "Glycine",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fcc"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218634464c71f1df2110d4d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which of the following allows for Ca<sup>2+</sup> to re-enter the sarcoplasmic reticulum and terminate the muscle contraction?",
    optionsList: [
      {
        optionValue: "The ionotropic nicotinic receptor",
        optionCorrect: !1
      },
      {
        optionValue: "Sarco/endoplasmic reticulum calcium-ATPase (SERCA)",
        optionCorrect: !0
      },
      {
        optionValue: "The muscarinic receptor",
        optionCorrect: !1
      },
      {
        optionValue: "The dihydropyridine receptor",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fcd"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218634464c71f1df2110d4d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Which of the following molecules is bound to myosin when the myosin head binds to the actin site?</p>",
    optionsList: [
      {
        optionValue: "<p>ADP</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>AMP</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>UDP</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>UTP</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>ATP</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fcf"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218635864c71f1df2110d4e"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Which of the following is NOT a step in the muscle contraction process?</p>",
    optionsList: [
      {
        optionValue: "<p>Tropomyosin covering the active site on actin</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>ADP molecule released during the power stroke</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>ATP binds to myosin causing the dissociation of the myosin head from the actin filament</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Hydrolysis of ATP allows for the cocking of the myosin head</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Calcium binds to troponin C, which moves tropomyosin from the active site on the actin filament</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fce"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218635864c71f1df2110d4e"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which of the following contributes to planning movement?",
    optionsList: [
      {
        optionValue: "Brainstem",
        optionCorrect: !1
      },
      {
        optionValue: "Motor cortex",
        optionCorrect: !1
      },
      {
        optionValue: "Broca&rsquo;s area",
        optionCorrect: !1
      },
      {
        optionValue: "Cerebellum",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fd0"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218636964c71f1df2110d4f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "What is the brainstem&rsquo;s involvement in locomotion?",
    optionsList: [
      {
        optionValue: "Fine tunes locomotion",
        optionCorrect: !1
      },
      {
        optionValue: "Controls speed",
        optionCorrect: !0
      },
      {
        optionValue: "Plans voluntary movements",
        optionCorrect: !1
      },
      {
        optionValue: "Processes sensory feedback",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fd1"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218636964c71f1df2110d4f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which of the following tracts provides sensory information from muscles to the CNS?",
    optionsList: [
      {
        optionValue: "Corticobulbar tract",
        optionCorrect: !1
      },
      {
        optionValue: "Spinocerebellar tract",
        optionCorrect: !0
      },
      {
        optionValue: "Lateral corticospinal tract",
        optionCorrect: !1
      },
      {
        optionValue: "Anterior corticospinal tract",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fd2"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218637d64c71f1df2110d50"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which of the following pathways is responsible for controlling the movement of limb muscles?",
    optionsList: [
      {
        optionValue: "Corticobulbar tract",
        optionCorrect: !1
      },
      {
        optionValue: "Spinocerebellar tract",
        optionCorrect: !1
      },
      {
        optionValue: "Lateral corticospinal tract",
        optionCorrect: !0
      },
      {
        optionValue: "Anterior corticospinal tract",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fd7"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218637d64c71f1df2110d50"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "The corticospinal tract has many functions. Which of the following is the MOST important function?",
    optionsList: [
      {
        optionValue: "Control of afferent inputs",
        optionCorrect: !1
      },
      {
        optionValue: "Spinal&nbsp;reflexes",
        optionCorrect: !1
      },
      {
        optionValue: "Motor&nbsp;neuron&nbsp;activity",
        optionCorrect: !1
      },
      {
        optionValue: "Mediation of voluntary distal movements",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fd4"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218637d64c71f1df2110d50"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which of the following statements regarding lower motor neurons is FALSE?",
    optionsList: [
      {
        optionValue: "They contact skeletal muscle, leading to muscle contraction",
        optionCorrect: !1
      },
      {
        optionValue: "They travel in the corticospinal tract",
        optionCorrect: !0
      },
      {
        optionValue: "Their cell body is in the spinal cord",
        optionCorrect: !1
      },
      {
        optionValue: "They synapse with upper motor neurons",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fd3"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218637d64c71f1df2110d50"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "The corticobulbar tract is responsible for innervating muscles of the:",
    optionsList: [
      {
        optionValue: "Face, head, and neck",
        optionCorrect: !0
      },
      {
        optionValue: "Limbs",
        optionCorrect: !1
      },
      {
        optionValue: "Trunk, neck, and shoulders",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fd5"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218637d64c71f1df2110d50"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "When the right forelimb is moved, where in the brain does the signal originate?",
    optionsList: [
      {
        optionValue: "Right cortex",
        optionCorrect: !1
      },
      {
        optionValue: "Cerebellum",
        optionCorrect: !1
      },
      {
        optionValue: "Medulla",
        optionCorrect: !1
      },
      {
        optionValue: "Left cortex",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fd6"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218637d64c71f1df2110d50"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Which of the following statements regarding the basal ganglia is FALSE?</p>",
    optionsList: [
      {
        optionValue: "<p>It doesn&rsquo;t receive spinal input</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It receives direct input from the cerebral cortex</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It modulates activity at the brainstem level</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>It is primarily associated with voluntary motor control</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fd8"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218639064c71f1df2110d51"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Which of the following is NOT a function of the basal ganglia?</p>",
    optionsList: [
      {
        optionValue: "Cognitive function",
        optionCorrect: !1
      },
      {
        optionValue: "Initiating movement",
        optionCorrect: !0
      },
      {
        optionValue: "Voluntary motor control",
        optionCorrect: !1
      },
      {
        optionValue: "Learning routine behaviours",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fd9"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0264c71f1df2110d13/6218639064c71f1df2110d51"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Into which chamber of the eye does the ciliary body secrete fluid?</p>",
    optionsList: [
      {
        optionValue: "<p>Posterior chamber</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Anterior chamber</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Vitreous chamber</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Sclera chamber</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fdc"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb55d64c71f1df2110d53"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>What is a blind spot in the eye?</p>",
    optionsList: [
      {
        optionValue: "<p>Optic disc</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Cornea</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Choroid</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Fovea</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Retina</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fdd"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb55d64c71f1df2110d53"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Which of the following regions of the eye has the highest number of cone cells?</p>",
    optionsList: [
      {
        optionValue: "<p>Optic disc</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Retina</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Choroid</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Fovea</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Zonule fibres</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fdb"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb55d64c71f1df2110d53"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Which of the following is considered a normal intraocular pressure in a dog?</p>",
    optionsList: [
      {
        optionValue: "<p>13 mmHg</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>26 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>7 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>5 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>32 mmHg</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fda"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb55d64c71f1df2110d53"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>In which sequence does light enter and course through the eye?</p>",
    optionsList: [
      {
        optionValue: "<p>Object &ndash; lens &ndash; aqueous humor &ndash; vitreous humor &ndash; retina</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Air &ndash; object &ndash; lens &ndash; retina</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Object &ndash; air &ndash; cornea &ndash; aqueous humor &ndash; lens &ndash; vitreous humor &ndash; retina</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Object &ndash; lens &ndash; air &ndash; retina &ndash; vitreous humor</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Lens &ndash; aqueous humor &ndash; cornea &ndash; air &ndash; object</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fde"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb57364c71f1df2110d54"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Which of the following would cause the lens to relax?</p>",
    optionsList: [
      {
        optionValue: "<p>Taut zonule fibres</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Contraction of ciliary muscles</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Bright light</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Relaxation of ciliary muscles</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Object far away</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fe1"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb57364c71f1df2110d54"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>What acts as an aperture to restrict light entry into the eye?</p>",
    optionsList: [
      {
        optionValue: "<p>Lens</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Cornea</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Iris</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Sclera</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Retina</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fe0"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb57364c71f1df2110d54"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>The structure in the eye responsible for the greatest refraction of light is the:</p>",
    optionsList: [
      {
        optionValue: "<p>Cornea</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Aqueous humor</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Lens</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Vitreous humor</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fdf"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb57364c71f1df2110d54"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>In an eye that is longer than normal, how is the image focussed incorrectly?</p>",
    optionsList: [
      {
        optionValue: "<p>Light is not bent enough, leading to the image being focussed beyond the retina</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>The image is split into 2 focal points, creating blurred vision at all distances</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Light transmission is obscured</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Light rays from distant objects are focussed in front of the retina</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fe2"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb58864c71f1df2110d55"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>A dog with emmetropia will have:</p>",
    optionsList: [
      {
        optionValue: "<p>Less light transmission</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Normal vision</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Difficulty focussing on objects close by</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Blurry vision at all distances</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fe4"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb58864c71f1df2110d55"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Birds&nbsp;can tell relative distances using one eye. What method of depth perception do they use to do this?</p>",
    optionsList: [
      {
        optionValue: "<p>Stereopsis</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Comparing the size of the image with a known object</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Moving parallax</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fe3"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb58864c71f1df2110d55"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Sunlight changes the retinal component rhodopsin into which of the following configurations?</p>",
    optionsList: [
      {
        optionValue: "<p>All-<em>trans</em> retinal</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>11-<em>cis</em> retinal</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>3&rsquo; GMP retinal</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Transducin</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fe6"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb5aa64c71f1df2110d56"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Where are specialised photoreceptor response elements located in photoreceptor cells?</p>",
    optionsList: [
      {
        optionValue: "<p>Inner segments</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Synaptic terminal</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Outer segment</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Basal cells</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Pigment epithelium</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fe5"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb5aa64c71f1df2110d56"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Which of the following will contribute to the hyperpolarisation of the photoreceptor membrane?</p>",
    optionsList: [
      {
        optionValue: "<p>Inactive phosphodiesterase</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Increase in cAMP</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Darkness</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Sodium influx</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Decrease in cGMP</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fe7"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb5aa64c71f1df2110d56"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>What happens when light photons reach the retina?</p>",
    optionsList: [
      {
        optionValue: "<p>Potassium channels open</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Potassium channels close</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Calcium channels open</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Sodium channels close</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Sodium channels open</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fe8"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb5aa64c71f1df2110d56"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>When a dog sees an object in the distance and stares at it, which of the following is NOT a component of how they process the visual information to determine what it is?</p>",
    optionsList: [
      {
        optionValue: "<p>The colour of the object is determined by cones</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Stereopsis is used to determine how far away the object is</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Contraction of ciliary muscles</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Light rays from the object are focussed on the retina by accommodation of the lens</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fe9"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183c0764c71f1df2110d14/621eb5bb64c71f1df2110d57"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "In which part of the ear does amplification of sound occur?",
    optionsList: [
      {
        optionValue: "Internal ear",
        optionCorrect: !1
      },
      {
        optionValue: "Incus",
        optionCorrect: !1
      },
      {
        optionValue: "Middle ear",
        optionCorrect: !0
      },
      {
        optionValue: "Malleus",
        optionCorrect: !1
      },
      {
        optionValue: "External ear",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fea"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac0d64c71f1df2110d82"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which chamber of the cochlea houses the Organ of Corti?",
    optionsList: [
      {
        optionValue: "Anterior chamber",
        optionCorrect: !1
      },
      {
        optionValue: "Middle chamber",
        optionCorrect: !0
      },
      {
        optionValue: "Upper chamber",
        optionCorrect: !1
      },
      {
        optionValue: "Lower chamber",
        optionCorrect: !1
      },
      {
        optionValue: "Posterior chamber",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fec"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac0d64c71f1df2110d82"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which muscle dampens soundwaves when it contracts?",
    optionsList: [
      {
        optionValue: "Stapedius",
        optionCorrect: !0
      },
      {
        optionValue: "Tensor veli palatini",
        optionCorrect: !1
      },
      {
        optionValue: "Lateral pterygoid",
        optionCorrect: !1
      },
      {
        optionValue: "Medial pterygoid",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86feb"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac0d64c71f1df2110d82"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which structure senses soundwave frequency?",
    optionsList: [
      {
        optionValue: "Tympanic membrane",
        optionCorrect: !1
      },
      {
        optionValue: "Incus",
        optionCorrect: !1
      },
      {
        optionValue: "Stapes",
        optionCorrect: !1
      },
      {
        optionValue: "Hair cells",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ff0"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac1a64c71f1df2110d83"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "A high pitch (<em>i.e.</em>, 12 kHz) sound stimulates hair cells closest to which cochlear-related structure?",
    optionsList: [
      {
        optionValue: "Oval window",
        optionCorrect: !0
      },
      {
        optionValue: "Apex of the basilar membrane",
        optionCorrect: !1
      },
      {
        optionValue: "Apex of the scala tympani",
        optionCorrect: !1
      },
      {
        optionValue: "Helicotrema",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fed"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac1a64c71f1df2110d83"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which of the following fluids in the ear has the highest potassium concentration?",
    optionsList: [
      {
        optionValue: "Plasma",
        optionCorrect: !1
      },
      {
        optionValue: "Endolymph",
        optionCorrect: !0
      },
      {
        optionValue: "Perilymph",
        optionCorrect: !1
      },
      {
        optionValue: "Hair cell cytosol",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ff1"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac1a64c71f1df2110d83"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "At the auditory nerve synapse level, depolarisation of the pre-synaptic membrane causes calcium influx which results in the release of which of the following substances from the synaptic vesicles?",
    optionsList: [
      {
        optionValue: "Acetylcholine",
        optionCorrect: !1
      },
      {
        optionValue: "Glutamate",
        optionCorrect: !0
      },
      {
        optionValue: "Adrenaline",
        optionCorrect: !1
      },
      {
        optionValue: "GABA",
        optionCorrect: !1
      },
      {
        optionValue: "Serotonin",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fef"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac1a64c71f1df2110d83"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which ion enters hair cells after membrane depolarisation?",
    optionsList: [
      {
        optionValue: "Sodium",
        optionCorrect: !1
      },
      {
        optionValue: "Chloride",
        optionCorrect: !1
      },
      {
        optionValue: "Calcium",
        optionCorrect: !0
      },
      {
        optionValue: "Potassium",
        optionCorrect: !1
      },
      {
        optionValue: "Magnesium",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fee"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac1a64c71f1df2110d83"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which of the following occurs during rotation of the head?",
    optionsList: [
      {
        optionValue: "The endolymph moves in the opposite direction of the rotation",
        optionCorrect: !0
      },
      {
        optionValue: "The resting discharge rate does not change",
        optionCorrect: !1
      },
      {
        optionValue: "Some of the hair cells bend in the opposite direction, causing them to depolarise",
        optionCorrect: !1
      },
      {
        optionValue: "Some of the hair cells bend in the same direction, causing them to hyperpolarise",
        optionCorrect: !1
      },
      {
        optionValue: "The endolymph moves in the same direction of the rotation.",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ff2"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac2c64c71f1df2110d84"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which of the following is NOT a part of the vestibular system?",
    optionsList: [
      {
        optionValue: "Saccule",
        optionCorrect: !1
      },
      {
        optionValue: "Semicircular canals",
        optionCorrect: !1
      },
      {
        optionValue: "Utricle",
        optionCorrect: !1
      },
      {
        optionValue: "Malleus",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ff5"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac2c64c71f1df2110d84"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which of the following is produced when hair cells are bent toward the kinocilium?",
    optionsList: [
      {
        optionValue: "Depolarisation",
        optionCorrect: !0
      },
      {
        optionValue: "Hyperpolarisation",
        optionCorrect: !1
      },
      {
        optionValue: "No change",
        optionCorrect: !1
      },
      {
        optionValue: "Decreased conductance of potassium ions",
        optionCorrect: !1
      },
      {
        optionValue: "Decreased resting potential",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ff4"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac2c64c71f1df2110d84"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "The hair cells get bent in one direction due to the presence of which of the following substances?",
    optionsList: [
      {
        optionValue: "Water",
        optionCorrect: !1
      },
      {
        optionValue: "Gelatinous material",
        optionCorrect: !1
      },
      {
        optionValue: "Plasma",
        optionCorrect: !1
      },
      {
        optionValue: "Gelatinous material and calcium stones",
        optionCorrect: !0
      },
      {
        optionValue: "Calcium stones",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ff3"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6232ac2c64c71f1df2110d84"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "<p>Which of the following can be a normal physiological process, as well as a pathologic one?</p>",
    optionsList: [
      {
        optionValue: "<p>Ataxia</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Head tilt</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Nystagmus</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Altered mentation</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ff6"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6232abf264c71f1df2110d81/6237a6c664c71f1df2110d8f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which of the given primary taste stimuli depend on G protein-coupled receptors to depolarise the cell?",
    optionsList: [
      {
        optionValue: "Bitter and sweet",
        optionCorrect: !0
      },
      {
        optionValue: "Sour and sweet",
        optionCorrect: !1
      },
      {
        optionValue: "Salty and sour",
        optionCorrect: !1
      },
      {
        optionValue: "Salty and bitter",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099e7f"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6242d73f64c71f1df2110ded/6242d7a264c71f1df2110df0"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which cranial nerve contains sensory neurons that contribute to the gag reflex?",
    optionsList: [
      {
        optionValue: "Facial nerve (CN VII)",
        optionCorrect: !1
      },
      {
        optionValue: "Glossopharyngeal nerve (CN IX)",
        optionCorrect: !1
      },
      {
        optionValue: "Vagus nerve (CN X)",
        optionCorrect: !0
      },
      {
        optionValue: "Hypoglossal nerve (CN XII)",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099e81"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6242d73f64c71f1df2110ded/6242d7a264c71f1df2110df0"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which of the given primary taste stimuli are triggered by ions in the saliva?",
    optionsList: [
      {
        optionValue: "Bitter and sweet",
        optionCorrect: !1
      },
      {
        optionValue: "Sour and sweet",
        optionCorrect: !1
      },
      {
        optionValue: "Salty and sour",
        optionCorrect: !0
      },
      {
        optionValue: "Salty and bitter",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099e80"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6242d73f64c71f1df2110ded/6242d7a264c71f1df2110df0"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Binding of an odorant to an odorant receptor on olfactory cells results in which of the following?",
    optionsList: [
      {
        optionValue: "Inflow of calcium",
        optionCorrect: !0
      },
      {
        optionValue: "Inflow of chloride",
        optionCorrect: !1
      },
      {
        optionValue: "Outflow of calcium",
        optionCorrect: !1
      },
      {
        optionValue: "Outflow of calcium and sodium",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099e82"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6242d73f64c71f1df2110ded/6242d7a864c71f1df2110df1"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "What is the mechanism of smell transduction via the olfactory nerve?",
    optionsList: [
      {
        optionValue: "Tyrosine kinase-mediated",
        optionCorrect: !1
      },
      {
        optionValue: "G protein-mediated cGMP activation",
        optionCorrect: !1
      },
      {
        optionValue: "G protein-mediated cAMP activation",
        optionCorrect: !0
      },
      {
        optionValue: "Interaction of potassium and chloride",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099e83"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/6242d73f64c71f1df2110ded/6242d7a864c71f1df2110df1"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Where are the autonomic ganglia of the parasympathetic nervous system predominantly located?",
    optionsList: [
      {
        optionValue: "Far from the end organ",
        optionCorrect: !1
      },
      {
        optionValue: "Within the dorsal root of the spinal cord",
        optionCorrect: !1
      },
      {
        optionValue: "Close to the spinal cord",
        optionCorrect: !1
      },
      {
        optionValue: "Close to the end organ",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ff7"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc22d64c71f1df2110dae"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "What receptor is used in the autonomic ganglia in the parasympathetic nervous system to transduce their signals to the post-ganglionic nerve fibre?",
    optionsList: [
      {
        optionValue: "Muscarinic type 1",
        optionCorrect: !1
      },
      {
        optionValue: "Nicotinic type 2",
        optionCorrect: !0
      },
      {
        optionValue: "Nicotinic type 1",
        optionCorrect: !1
      },
      {
        optionValue: "Muscarinic type 2",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ff8"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc22d64c71f1df2110dae"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Acetylcholine released from preganglionic neurons binds to which of the following receptors in the sympathetic nervous system?",
    optionsList: [
      {
        optionValue: "Nicotinic type 2",
        optionCorrect: !0
      },
      {
        optionValue: "Muscarinic type 1",
        optionCorrect: !1
      },
      {
        optionValue: "Muscarinic type 3",
        optionCorrect: !1
      },
      {
        optionValue: "Nicotinic type 1",
        optionCorrect: !1
      },
      {
        optionValue: "Muscarinic type 2",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ffa"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc22d64c71f1df2110dae"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which of the following statements is TRUE regarding the length of the nerves in the parasympathetic nervous system?",
    optionsList: [
      {
        optionValue: "Post-synaptic nerves are long",
        optionCorrect: !1
      },
      {
        optionValue: "Pre-synaptic nerves are long",
        optionCorrect: !0
      },
      {
        optionValue: "Pre-synaptic nerves are short",
        optionCorrect: !1
      },
      {
        optionValue: "Length is not important for determining the action",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ff9"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc22d64c71f1df2110dae"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Where are the autonomic ganglia of the sympathetic nervous system predominantly located?",
    optionsList: [
      {
        optionValue: "Within the dorsal root of the spinal cord",
        optionCorrect: !1
      },
      {
        optionValue: "Close to the spinal cord in the sympathetic chain",
        optionCorrect: !0
      },
      {
        optionValue: "Close to the end organ",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ffb"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc35e64c71f1df2110daf"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which part of the central nervous system is the main integration centre for the autonomic nervous system?",
    optionsList: [
      {
        optionValue: "Spinal cord",
        optionCorrect: !1
      },
      {
        optionValue: "Brainstem",
        optionCorrect: !1
      },
      {
        optionValue: "Hypothalamus",
        optionCorrect: !0
      },
      {
        optionValue: "Limbic lobe",
        optionCorrect: !1
      },
      {
        optionValue: "Cerebral cortex",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ffd"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc35e64c71f1df2110daf"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which part of the central nervous system provides emotional input for the autonomic nervous system?",
    optionsList: [
      {
        optionValue: "Brainstem",
        optionCorrect: !1
      },
      {
        optionValue: "Hypothalamus",
        optionCorrect: !1
      },
      {
        optionValue: "Limbic lobe",
        optionCorrect: !0
      },
      {
        optionValue: "Spinal cord",
        optionCorrect: !1
      },
      {
        optionValue: "Cerebral cortex",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ffc"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc35e64c71f1df2110daf"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "In which part of the central nervous system is the respiratory centre located?",
    optionsList: [
      {
        optionValue: "Spinal cord",
        optionCorrect: !1
      },
      {
        optionValue: "Brainstem",
        optionCorrect: !0
      },
      {
        optionValue: "Hypothalamus",
        optionCorrect: !1
      },
      {
        optionValue: "Limbic lobe",
        optionCorrect: !1
      },
      {
        optionValue: "Cerebral cortex",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86ffe"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc35e64c71f1df2110daf"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which of the following receptors in the sympathetic system increases the heart rate when engaged?",
    optionsList: [
      {
        optionValue: "Muscarinic type 1",
        optionCorrect: !1
      },
      {
        optionValue: "Beta-2 adrenergic",
        optionCorrect: !1
      },
      {
        optionValue: "Beta-1 adrenergic",
        optionCorrect: !0
      },
      {
        optionValue: "Nicotinic",
        optionCorrect: !1
      },
      {
        optionValue: "Muscarinic type 2",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fff"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc37364c71f1df2110db0"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which of the following nerves is an important component of the parasympathetic nervous system?",
    optionsList: [
      {
        optionValue: "Vagus",
        optionCorrect: !0
      },
      {
        optionValue: "Occulomotor",
        optionCorrect: !1
      },
      {
        optionValue: "Glossopharangeal",
        optionCorrect: !1
      },
      {
        optionValue: "Abducent",
        optionCorrect: !1
      },
      {
        optionValue: "Facial",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87001"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc37364c71f1df2110db0"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which of the following receptors induces vasoconstriction of blood vessels in the skin when engaged?",
    optionsList: [
      {
        optionValue: "Alpha adrenergic",
        optionCorrect: !0
      },
      {
        optionValue: "Beta-2 adrenergic",
        optionCorrect: !1
      },
      {
        optionValue: "Muscarinic type 1",
        optionCorrect: !1
      },
      {
        optionValue: "Nicotinic",
        optionCorrect: !1
      },
      {
        optionValue: "Beta-1 adrenergic",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87000"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc37364c71f1df2110db0"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which of the following receptors of the sympathetic system induces bronchiole dilation in the lungs when engaged?",
    optionsList: [
      {
        optionValue: "Nicotinic",
        optionCorrect: !1
      },
      {
        optionValue: "Muscarinic type 1",
        optionCorrect: !1
      },
      {
        optionValue: "Alpha adrenergic",
        optionCorrect: !1
      },
      {
        optionValue: "Muscarinic type 2",
        optionCorrect: !1
      },
      {
        optionValue: "Beta adrenergic",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87002"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc37364c71f1df2110db0"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which of the following receptors in the sympathetic system contracts sphincters in the GI tract, slowing the passage of food?",
    optionsList: [
      {
        optionValue: "Muscarinic type 1",
        optionCorrect: !1
      },
      {
        optionValue: "Beta-2 adrenergic",
        optionCorrect: !1
      },
      {
        optionValue: "Alpha-1 adrenergic",
        optionCorrect: !0
      },
      {
        optionValue: "Nicotinic",
        optionCorrect: !1
      },
      {
        optionValue: "Muscarinic type 2",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87003"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc38064c71f1df2110db1"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which of the following receptors in the sympathetic system contracts the radial muscle in the iris, and what is its effect on the pupil?",
    optionsList: [
      {
        optionValue: "Muscarinic type 1; Dilates the pupil",
        optionCorrect: !1
      },
      {
        optionValue: "Beta-2 adrenergic; Dilates the pupil",
        optionCorrect: !1
      },
      {
        optionValue: "Alpha-1 adrenergic; Constricts the pupil",
        optionCorrect: !1
      },
      {
        optionValue: "Nicotinic; Constricts the pupil",
        optionCorrect: !1
      },
      {
        optionValue: "Alpha-1 adrenergic; Dilates the pupil",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87005"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc38064c71f1df2110db1"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "Which of the following receptors in the parasympathetic system contracts the circular sphincter muscle in the iris, and what is its effect on the pupil?",
    optionsList: [
      {
        optionValue: "Muscarinic; Constricts the pupil",
        optionCorrect: !0
      },
      {
        optionValue: "Beta-2 adrenergic; Dilates the pupil",
        optionCorrect: !1
      },
      {
        optionValue: "Nicotinic; Constricts the pupil",
        optionCorrect: !1
      },
      {
        optionValue: "Alpha-1 adrenergic; Dilates the pupil",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87004"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc38064c71f1df2110db1"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology"
    },
    statement: "In a racehorse,&nbsp;which of the following receptors in the sympathetic system increases the production of sweat?",
    optionsList: [
      {
        optionValue: "Muscarinic type 1",
        optionCorrect: !1
      },
      {
        optionValue: "Beta-2 adrenergic",
        optionCorrect: !1
      },
      {
        optionValue: "Alpha-1 adrenergic",
        optionCorrect: !1
      },
      {
        optionValue: "Nicotinic",
        optionCorrect: !1
      },
      {
        optionValue: "Muscarinic type 3",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87006"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/623bbfad64c71f1df2110dad/623bc38064c71f1df2110db1"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>If intrapleural pressure begins at &minus;5 cm H<sub>2</sub>O, what would it be during a normal resting inhalation?</p>",
    optionsList: [
      {
        optionValue: "<p>Higher than &minus;5 but still less than 0</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Positive (above 0)</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>More negative (lower than &minus;5)</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Intrapleural pressure does not change</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87007"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a37e64c71f1df2110e05"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>When the muscles of inspiration contract:</p>",
    optionsList: [
      {
        optionValue: "<p>The thoracic cavity increases in size, the pleural pressure decreases, the alveolar pressure decreases, and air flows in</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>The thoracic cavity increases in size, the pleural pressure increases, the alveolar pressure decreases, and air flows in</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>The thoracic cavity decreases in size, the pleural pressure increases, the alveolar pressure increases, and air flows out</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>The thoracic cavity decreases in size, the pleural pressure decreases, the alveolar pressure decreases, and air flows in</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87008"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a37e64c71f1df2110e05"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Which of the following statements best represents Tidal Volume (TV or VT)?</p>",
    optionsList: [
      {
        optionValue: "<p>Maximum amount of air that can be moved in or out of the lungs in a single respiratory cycle</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Amount of air inhaled and exhaled during a normal breath</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Volume of air remaining after a normal exhalation</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Amount of air that can be further inhaled after a normal inhalation</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87009"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a38f64c71f1df2110e06"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Which of the following statements best represents Functional Residual Capacity (FRC)?</p>",
    optionsList: [
      {
        optionValue: "<p>Volume of air remaining after a normal exhalation</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Air left in the lungs after a forced exhalation</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Total volume of air in the lungs after a maximal inspiration</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Amount of air that can be exhaled after a normal exhalation</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed8700a"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a38f64c71f1df2110e06"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Which of the following is NOT an example of obstructive lung disease?</p>",
    optionsList: [
      {
        optionValue: "<p>Severe equine asthma</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Pulmonary oedema</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Foreign object</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Emphysema</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed8700b"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a39e64c71f1df2110e07"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Which of the following statements is TRUE for Poiseuille&rsquo;s Law?</p>",
    optionsList: [
      {
        optionValue: "<p>Resistance is eight times the length of the tube</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Resistance is inversely proportional to the radius to the 4th power</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Resistance is inversely proportional to the viscosity</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Resistance is nine times the radius of the tube</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed8700c"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a39e64c71f1df2110e07"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Which of the following does NOT occur in emphysema?</p>",
    optionsList: [
      {
        optionValue: "<p>Pleural pressure equals zero</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Elastic recoil of the lungs is decreased</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Airway resistance is increased</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Dynamic obstruction of the airways takes place</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed8700d"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a39e64c71f1df2110e07"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>What is the alveolar ventilation of a patient who is breathing 15 times per minute and has a dead space volume of 300 mL and a tidal volume of 500 mL?</p>",
    optionsList: [
      {
        optionValue: "<p>7500 mL/min</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>3000 mL/min</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>4500 mL/min</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>200 mL/min</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed8700e"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a3b464c71f1df2110e08"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>What is the minute ventilation of a patient who is breathing 8 times per minute and has a dead space volume of 200 mL and a tidal volume of 300 mL?</p>",
    optionsList: [
      {
        optionValue: "<p>800 mL/min</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>2400 mL/min</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>1600 mL/min</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>300 mL/min</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed8700f"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a3b464c71f1df2110e08"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>In which pathological or physiological condition would lung compliance be greater than normal?</p>",
    optionsList: [
      {
        optionValue: "<p>Emphysema</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Fibrosis</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Atelectasis</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87010"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a3c164c71f1df2110e09"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Which of the following pneumocyte types would still be immature in a premature foal, putting them at risk for respiratory distress?</p>",
    optionsList: [
      {
        optionValue: "<p>Type I</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Type II</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Type III</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Type IV</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87011"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a3c164c71f1df2110e09"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Which of the following statements is INCORRECT regarding the surfactant?</p>",
    optionsList: [
      {
        optionValue: "<p>It reduces surface tension</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It is produced by type II pneumocytes</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It is a mix of lipids and proteins</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It has polar and non-polar sides</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It has only non-polar sides</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87012"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a3c164c71f1df2110e09"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Which of the following does NOT occur in restrictive lung disease?</p>",
    optionsList: [
      {
        optionValue: "<p>Increase in respiratory rate</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Use of accessory muscles during respiration</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Decrease in lung compliance</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Absent breath sounds on the affected side</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed87013"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/624e617164c71f1df2110e03/6254a3cd64c71f1df2110e0a"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Which of the following represents normal values for PAO<sub>2</sub>, PaO<sub>2</sub>, and PvO<sub>2</sub> in dogs, respectively?</p>",
    optionsList: [
      {
        optionValue: "<p>40 mmHg, 95 mmHg, and 100 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>95 mmHg, 55 mmHg, 200 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>100 mmHg, 95 mmHg, and 40 mmHg</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>95 mmHg, 100 mmHg, and 40 mmHg</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed870f0"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6269bf3564c71f1df2110e3b/649250f9ffeb1a9baa030b6a"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Which of the following represents normal values for PaCO<sub>2</sub>, PACO<sub>2</sub>, and PvCO<sub>2</sub> in dogs, respectively?</p>",
    optionsList: [
      {
        optionValue: "<p>40 mmHg, 95 mmHg, 100 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>90 mmHg, 40 mmHg, 44 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>44 mmHg, 40 mmHg, 40 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>40 mmHg, 40 mmHg, 44 mmHg</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed870f1"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6269bf3564c71f1df2110e3b/649250f9ffeb1a9baa030b6a"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "Which of the following is the dissolved concentration of O<sub>2</sub> in a normothermic patient, with a PaO<sub>2</sub> of 90 mmHg?",
    optionsList: [
      {
        optionValue: "0.124 mL of O<sub>2</sub> per dL of blood",
        optionCorrect: !1
      },
      {
        optionValue: "0.325 mL of O<sub>2</sub> per dL of blood",
        optionCorrect: !1
      },
      {
        optionValue: "0.279 mL of O<sub>2</sub> per dL of blood",
        optionCorrect: !0
      },
      {
        optionValue: "0.295 mL of O<sub>2</sub> per dL of blood",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87019"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6269bf3564c71f1df2110e3b/6269d02464c71f1df2110e4d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "How many oxygen molecules can bind to one haemoglobin protein?",
    optionsList: [
      {
        optionValue: "1",
        optionCorrect: !1
      },
      {
        optionValue: "2",
        optionCorrect: !1
      },
      {
        optionValue: "3",
        optionCorrect: !1
      },
      {
        optionValue: "4",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87014"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6269bf3564c71f1df2110e3b/6269d02464c71f1df2110e4d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "Why does the oxygen-haemoglobin dissociation curve have a sigmoidal shape?",
    optionsList: [
      {
        optionValue: "As each oxygen molecule unloads from haemoglobin, the affinity for the next oxygen molecule is increased",
        optionCorrect: !1
      },
      {
        optionValue: "As each oxygen molecule binds to haemoglobin, the affinity for the next oxygen molecule is increased",
        optionCorrect: !0
      },
      {
        optionValue: "As each oxygen molecule binds to haemoglobin, the dissolved oxygen content decreases",
        optionCorrect: !1
      },
      {
        optionValue: "As each oxygen molecule binds to haemoglobin, the affinity for the next oxygen molecule is decreased",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87015"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6269bf3564c71f1df2110e3b/6269d02464c71f1df2110e4d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "Which of the following variables changes when a patient with polycythaemia is at 100% saturation?",
    optionsList: [
      {
        optionValue: "The oxygen concentration",
        optionCorrect: !0
      },
      {
        optionValue: "The dissolved arterial oxygen content",
        optionCorrect: !1
      },
      {
        optionValue: "The partial pressure of carbon dioxide",
        optionCorrect: !1
      },
      {
        optionValue: "The partial pressure of oxygen",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87017"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6269bf3564c71f1df2110e3b/6269d02464c71f1df2110e4d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "Which of the following factors shifts the oxygen-haemoglobin dissociation curve to the left?",
    optionsList: [
      {
        optionValue: "High temperature",
        optionCorrect: !1
      },
      {
        optionValue: "Increase in pH",
        optionCorrect: !0
      },
      {
        optionValue: "High concentration of CO<sub>2</sub>",
        optionCorrect: !1
      },
      {
        optionValue: "Decrease in pH",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87016"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6269bf3564c71f1df2110e3b/6269d02464c71f1df2110e4d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "Which of the following factors shifts the oxygen-haemoglobin dissociation curve to the right?",
    optionsList: [
      {
        optionValue: "Decrease in pH",
        optionCorrect: !0
      },
      {
        optionValue: "Decrease in body temperature",
        optionCorrect: !1
      },
      {
        optionValue: "Decrease in 2,3 DPG",
        optionCorrect: !1
      },
      {
        optionValue: "Decrease in hydrogen ion concentration",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87018"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6269bf3564c71f1df2110e3b/6269d02464c71f1df2110e4d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Which of the following ions is bicarbonate exchanged for in a red blood cell?</p>",
    optionsList: [
      {
        optionValue: "<p>Potassium</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Calcium</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Chloride</p>",
        optionCorrect: !0
      },
      {
        optionValue: "Hydrogen",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8701c"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6269bf3564c71f1df2110e3b/6269d2fb64c71f1df2110e53"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "Which of the following statements is CORRECT when comparing the CO<sub>2</sub>-haemoglobin dissociation curve to the O<sub>2</sub>-haemoglobin dissociation curve?",
    optionsList: [
      {
        optionValue: "They are both sigmoidal in shape",
        optionCorrect: !1
      },
      {
        optionValue: "They both have higher partial pressures on the arterial side than the venous side",
        optionCorrect: !1
      },
      {
        optionValue: "Neither molecule affects the other molecule's curve",
        optionCorrect: !1
      },
      {
        optionValue: "The CO<sub>2</sub>-haemoglobin dissociation curve is more linear",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8701a"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6269bf3564c71f1df2110e3b/6269d2fb64c71f1df2110e53"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "Which of the following statements is INCORRECT regarding carbon dioxide transport in the blood?",
    optionsList: [
      {
        optionValue: "There is more CO<sub>2</sub> dissolved in the blood than O<sub>2</sub>",
        optionCorrect: !1
      },
      {
        optionValue: "The solubility of oxygen is greater than that of carbon dioxide",
        optionCorrect: !0
      },
      {
        optionValue: "Less carbon dioxide is bound to haemoglobin as compared to oxygen",
        optionCorrect: !1
      },
      {
        optionValue: "The majority of the carbon dioxide in the body is in the form of bicarbonate ions",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8701b"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6269bf3564c71f1df2110e3b/6269d2fb64c71f1df2110e53"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "Which of the following will have the highest partial pressure of oxygen, at sea level?",
    optionsList: [
      {
        optionValue: "Alveolar air",
        optionCorrect: !1
      },
      {
        optionValue: "Mixed venous blood",
        optionCorrect: !1
      },
      {
        optionValue: "Humidified tracheal air",
        optionCorrect: !0
      },
      {
        optionValue: "Blood in the capillaries",
        optionCorrect: !1
      },
      {
        optionValue: "Blood in the pulmonary vein",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099e9f"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54b564c71f1df2110e5b"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "What is the partial pressure of carbon dioxide in the arterial blood in the systemic circulation?",
    optionsList: [
      {
        optionValue: "20 mmHg",
        optionCorrect: !1
      },
      {
        optionValue: "10 mmHg",
        optionCorrect: !1
      },
      {
        optionValue: "30 mmHg",
        optionCorrect: !1
      },
      {
        optionValue: "40 mmHg",
        optionCorrect: !0
      },
      {
        optionValue: "0 mmHg",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099e9e"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54b564c71f1df2110e5b"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "Which of the following is the a-v O<sub>2</sub> gradient very dependent on?",
    optionsList: [
      {
        optionValue: "Physiological shunting",
        optionCorrect: !1
      },
      {
        optionValue: "Metabolism",
        optionCorrect: !0
      },
      {
        optionValue: "Sodium concentration",
        optionCorrect: !1
      },
      {
        optionValue: "Potassium concentration",
        optionCorrect: !1
      },
      {
        optionValue: "Water vapour pressure",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099ea0"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54b564c71f1df2110e5b"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "Which of the following is NOT a cause of hypoxia?",
    optionsList: [
      {
        optionValue: "Increased fraction of inspired oxygen",
        optionCorrect: !0
      },
      {
        optionValue: "Hypoxaemia",
        optionCorrect: !1
      },
      {
        optionValue: "Low tissue perfusion",
        optionCorrect: !1
      },
      {
        optionValue: "Low cardiac output",
        optionCorrect: !1
      },
      {
        optionValue: "Anaemia",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099e9d"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54b564c71f1df2110e5b"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "Which of the following is NOT a cause of hypoxaemia?",
    optionsList: [
      {
        optionValue: "Right to left shunt",
        optionCorrect: !1
      },
      {
        optionValue: "An A-a gradient of 7 mmHg",
        optionCorrect: !0
      },
      {
        optionValue: "A decreased partial pressure of inspired O<sub>2</sub>",
        optionCorrect: !1
      },
      {
        optionValue: "V/Q inequality",
        optionCorrect: !1
      },
      {
        optionValue: "Diffusion impairment",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099ea5"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54d264c71f1df2110e5d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "Which of the following conditions increases diffusional capacity in the lung?",
    optionsList: [
      {
        optionValue: "Pulmonary fibrosis",
        optionCorrect: !1
      },
      {
        optionValue: "A lower partial pressure gradient",
        optionCorrect: !1
      },
      {
        optionValue: "Increased surface area",
        optionCorrect: !0
      },
      {
        optionValue: "Lower gas solubility",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099ea3"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54d264c71f1df2110e5d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "How does a right-to-left shunt lead to hypoxaemia?",
    optionsList: [
      {
        optionValue: "Some arterial blood bypasses the bronchial circulation, causing a decrease in PaO<sub>2</sub>",
        optionCorrect: !1
      },
      {
        optionValue: "It allows more blood to be channelled through under-ventilated areas of the lungs, causing a decrease in PaO<sub>2</sub>",
        optionCorrect: !1
      },
      {
        optionValue: "Some venous blood bypasses the pulmonary circulation, which decreases PaO<sub>2</sub>",
        optionCorrect: !0
      },
      {
        optionValue: "It allows more blood to travel through the pulmonary circulation, causing a dilution in PaO<sub>2</sub>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099ea1"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54d264c71f1df2110e5d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "The alveolar to arterial oxygen gradient should be less than which of the following to be considered a non-pathologic shunt?",
    optionsList: [
      {
        optionValue: "15 mmHg",
        optionCorrect: !0
      },
      {
        optionValue: "7 mmHg",
        optionCorrect: !1
      },
      {
        optionValue: "12 mmHg",
        optionCorrect: !1
      },
      {
        optionValue: "10 mmHg",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099ea4"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54d264c71f1df2110e5d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "Which of the following will increase the uptake of oxygen in the blood?",
    optionsList: [
      {
        optionValue: "An increase in blood flow through a right-to-left shunt",
        optionCorrect: !1
      },
      {
        optionValue: "A decrease in blood flow through the lungs",
        optionCorrect: !1
      },
      {
        optionValue: "An increase in cardiac output",
        optionCorrect: !0
      },
      {
        optionValue: "A decrease in PAO<sub>2</sub> to 50 mmHg",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "64ba560447d01bfdcb099ea2"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54d264c71f1df2110e5d"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Which of the following statements is CORRECT about V/Q matching?</p>",
    optionsList: [
      {
        optionValue: "<p>A high V/Q ratio is always better</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>If blood flow is restricted to a single alveolus, the resulting blood will have a decreased oxygen saturation</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>A low V/Q ratio is always better</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Any V/Q mismatch will result in a lower overall PaO<sub>2</sub></p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af3a7"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54f864c71f1df2110e5f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Which zone of the lung is best described by the following pressures: Pa &gt; PA &gt; Pv?</p>",
    optionsList: [
      {
        optionValue: "<p>Zone 1</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Zone 2</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Zone 3</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Zone 4</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af3a8"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54f864c71f1df2110e5f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Alveolar pressure will be lower than the arterial and venous pressures in which zone of the lung?</p>",
    optionsList: [
      {
        optionValue: "<p>Zone 1</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Zone 2</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Zone 3</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Zone 4</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af3a9"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54f864c71f1df2110e5f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>The ventilation-perfusion ratio is normal in which zone of the lung?</p>",
    optionsList: [
      {
        optionValue: "<p>Zone 1</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Zone 2</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Zone 3</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Zone 4</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af3aa"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a54f864c71f1df2110e5f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Which of the following PaCO<sub>2</sub> levels corresponds with decreased alveolar ventilation?</p>",
    optionsList: [
      {
        optionValue: "<p>50 mmHg</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>40 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>30 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>20 mmHg</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87021"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/626a4d7664c71f1df2110e58/626a551e64c71f1df2110e61"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "Which type of sensory respiratory neural input is found outside of the lungs?",
    optionsList: [
      {
        optionValue: "Central chemoreceptors",
        optionCorrect: !0
      },
      {
        optionValue: "Lung stretch receptors",
        optionCorrect: !1
      },
      {
        optionValue: "Bronchial C-fibres",
        optionCorrect: !1
      },
      {
        optionValue: "Irritant receptors",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87022"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6271f93964c71f1df2110e72/6271f9bf64c71f1df2110e75"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "Which of the following ions do the central chemoreceptors sense?",
    optionsList: [
      {
        optionValue: "Calcium",
        optionCorrect: !1
      },
      {
        optionValue: "Hydrogen",
        optionCorrect: !0
      },
      {
        optionValue: "Sodium",
        optionCorrect: !1
      },
      {
        optionValue: "Magnesium",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87023"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6271f93964c71f1df2110e72/6271f9bf64c71f1df2110e75"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "Where is the pneumotaxic centre located?",
    optionsList: [
      {
        optionValue: "In the pons",
        optionCorrect: !0
      },
      {
        optionValue: "In the cerebellum",
        optionCorrect: !1
      },
      {
        optionValue: "In the medulla",
        optionCorrect: !1
      },
      {
        optionValue: "In the cerebrum",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87024"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6271f93964c71f1df2110e72/6271f9bf64c71f1df2110e75"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "Which of the following structures sets the central rhythm and frequency of inspiration?",
    optionsList: [
      {
        optionValue: "The caudal portion of the ventral respiratory group neurons",
        optionCorrect: !1
      },
      {
        optionValue: "The dorsal respiratory group neurons",
        optionCorrect: !0
      },
      {
        optionValue: "The pneumotaxic centre",
        optionCorrect: !1
      },
      {
        optionValue: "The apneustic centre",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87025"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6271f93964c71f1df2110e72/6271f9bf64c71f1df2110e75"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Where are the hydrogen ions that stimulate the central chemoreceptors produced?</p>",
    optionsList: [
      {
        optionValue: "<p>In the astrocytes</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>In the CSF</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>In the neuronal intracellular fluid</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>In the Schwann cells</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87026"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6271f93964c71f1df2110e72/6271f9dd64c71f1df2110e77"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Which of the following types of channels are present on type I glomus cells?</p>",
    optionsList: [
      {
        optionValue: "<p>Oxygen-dependent chloride channels</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Oxygen-dependent potassium channels</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Oxygen-dependent sodium channels</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Oxygen-dependent calcium channels</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87028"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6271f93964c71f1df2110e72/6271f9f864c71f1df2110e79"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Which of the following types of channels open after depolarisation of glomus cells at low partial pressures of O<sub>2</sub>?</p>",
    optionsList: [
      {
        optionValue: "<p>T-type calcium channels</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>L-type potassium channels</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>L-type sodium channels</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>L-type calcium channels</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87027"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6271f93964c71f1df2110e72/6271f9f864c71f1df2110e79"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Which of the following changes will occur in the body in response to PO<sub>2</sub> &lt; 60 mmHg?</p>",
    optionsList: [
      {
        optionValue: "<p>Increase in ventilation</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Relaxation of diaphragm</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Decrease in carbon dioxide</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Decrease in ventilation</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87029"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/6271f93964c71f1df2110e72/6271fa1b64c71f1df2110e7b"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>What is the total pressure 30 m below the surface of the ocean?</p>",
    optionsList: [
      {
        optionValue: "<p>1 atm</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>2 atm</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>3 atm</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>4 atm</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8702a"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/62736fea64c71f1df2110e8d/6273701364c71f1df2110e8f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "Compared to the volume at the surface, how much volume would the same amount of gas take up 40 m below the surface of the ocean?",
    optionsList: [
      {
        optionValue: "17%",
        optionCorrect: !1
      },
      {
        optionValue: "20%",
        optionCorrect: !0
      },
      {
        optionValue: "33%",
        optionCorrect: !1
      },
      {
        optionValue: "50%",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8702c"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/62736fea64c71f1df2110e8d/6273701364c71f1df2110e8f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "Which of the following is NOT a respiratory limitation under water?",
    optionsList: [
      {
        optionValue: "Limited O<sub>2</sub> supply",
        optionCorrect: !1
      },
      {
        optionValue: "Increasing PCO<sub>2</sub> and acidosis",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Increased blood volume (20% body volume)</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Extreme external pressure causing collapse of alveoli</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8702b"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/62736fea64c71f1df2110e8d/6273701364c71f1df2110e8f"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>How much oxygen is extracted from water by the gills?</p>",
    optionsList: [
      {
        optionValue: "<p>20%</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>50%</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>60%</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>80%</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8702d"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/62736fea64c71f1df2110e8d/6273703064c71f1df2110e91"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Which of the following is NOT a feature of counter-current flow?</p>",
    optionsList: [
      {
        optionValue: "<p>It decreases the concentration gradient</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>It increases the efficiency of gas exchange</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It ensures the maximum possible gas exchange occurs</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>It increases the concentration gradient</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8702e"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/62736fea64c71f1df2110e8d/6273703064c71f1df2110e91"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Which of the following is NOT a feature of the avian respiratory system?</p>",
    optionsList: [
      {
        optionValue: "<p>Flow through system</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>4 stages of air flow</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Mixing of air</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Counter-current blood and air flow</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8702f"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/62736fea64c71f1df2110e8d/6273704e64c71f1df2110e93"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Birds that fly at altitude have adapted to prevent hypoxia. Which of the following is NOT an adaptation consistent with this goal?</p>",
    optionsList: [
      {
        optionValue: "<p>Hollow bones with air sacs</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Increased haemoglobin affinity for oxygen</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Counter-current blood and air flow</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Thickened blood-gas barrier</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87030"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/62736fea64c71f1df2110e8d/6273704e64c71f1df2110e93"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>Which of the following is NOT a potential consequence of altitude hypoxia in susceptible cattle?</p>",
    optionsList: [
      {
        optionValue: "<p>Localised alveolar hypoxia, causing vasoconstriction in the lungs to correct the V/Q ratio</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Generalised pulmonary hypoxic vasoconstriction</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Increased respiratory rate</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Right sided heart failure</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87031"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/62736fea64c71f1df2110e8d/6273706664c71f1df2110e95"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Respiratory"
    },
    statement: "<p>In a healthy animal, what is the normal net pressure difference between the pulmonary capillary and the pulmonary interstitial space?</p>",
    optionsList: [
      {
        optionValue: "<p>&minus;1 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>+1 mmHg</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>&minus;28 mmHg</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>+29 mmHg</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87032"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/624380e164c71f1df2110dfd/62736fea64c71f1df2110e8d/6273706664c71f1df2110e95"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "Which of the following is NOT a contributing factor to the performance capacity of horses?",
    optionsList: [
      {
        optionValue: "Upper airway function",
        optionCorrect: !1
      },
      {
        optionValue: "Increase in oxygen carrying capacity of blood due to splenic contraction",
        optionCorrect: !1
      },
      {
        optionValue: "Increase in maximum heart rate in response to training",
        optionCorrect: !0
      },
      {
        optionValue: "Enhanced oxidative enzymatic activity in response to training",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87033"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290792c64c71f1df2110ece"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "Which of the following is NOT a muscular adaptation to training?",
    optionsList: [
      {
        optionValue: "Increase in muscle capillary density",
        optionCorrect: !1
      },
      {
        optionValue: "Increased density of mitochondria",
        optionCorrect: !1
      },
      {
        optionValue: "Enhanced oxidative enzymatic activity",
        optionCorrect: !1
      },
      {
        optionValue: "Decreased size of mitochondria",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87036"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290792c64c71f1df2110ece"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "Which of the following best describes in order from greatest to least, the aerobic contribution to overall energy production of these equine performance disciplines?",
    optionsList: [
      {
        optionValue: "Endurance &gt; Thoroughbred racing &gt; Barrel racing",
        optionCorrect: !0
      },
      {
        optionValue: "Barrel racing &gt; Thoroughbred racing &gt; Endurance",
        optionCorrect: !1
      },
      {
        optionValue: "Thoroughbred racing &gt; Barrel racing &gt; Endurance",
        optionCorrect: !1
      },
      {
        optionValue: "Endurance &gt; Barrel racing &gt; Thoroughbred racing",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87035"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290792c64c71f1df2110ece"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "Which of the following does NOT cause a low arterial partial pressure of oxygen?",
    optionsList: [
      {
        optionValue: "Hypoventilation",
        optionCorrect: !1
      },
      {
        optionValue: "V/Q mismatch",
        optionCorrect: !1
      },
      {
        optionValue: "Right-to-left shunt",
        optionCorrect: !1
      },
      {
        optionValue: "Decreased cardiac output",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87034"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290792c64c71f1df2110ece"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "<p>Horses experience exercise-induced hypoxaemia. However, there are several factors which theoretically should work to increase the oxygen diffusion capacity during exercise. Which of the following does NOT contribute to the theoretical increased diffusion capacity of oxygen during exercise?</p>",
    optionsList: [
      {
        optionValue: "<p>Low mixed venous oxygen partial pressure</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Decreased capillary transit time due to increased cardiac output</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Increased surface area for gas exchange</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Dilation and recruitment of poorly perfused or non-perfused sections of the pulmonary capillary bed</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87037"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290794564c71f1df2110ecf"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "<p>Which of the following features of respiratory function during exercise is NOT a contributing factor to the limitation of performance?</p>",
    optionsList: [
      {
        optionValue: "<p>Mechanical constraint on ventilation due to the coupling between breathing and stride frequency (LRC)</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Increased resistance of the upper airways</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Nostril flare</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Increased energy demands of the respiratory muscles</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87038"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290794564c71f1df2110ecf"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "<p>Which of the following parameters can be calculated using treadmill exercise to assess the anaerobic capacity of an individual?</p>",
    optionsList: [
      {
        optionValue: "<p>V̇O<sub>2</sub>max (Maximum oxygen consumption)</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>MAOD (Maximum accumulated oxygen deficit)</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>V200 (Speed at which the heart rate reaches 200 bpm)</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>V̇O<sub>2</sub>peak (Peak oxygen consumption)</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87039"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290796264c71f1df2110ed0"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "<p>Which of the following is NOT a challenge/limitation of performing an exercise test in the field?</p>",
    optionsList: [
      {
        optionValue: "<p>Accurate representation of energy demands a horse experiences for its performance discipline</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Variable weather and track conditions</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Difficult control of speed</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Difficult blood sampling during exercise</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8703a"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290796264c71f1df2110ed0"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "<p>Which of the following can NOT be measured in the field?</p>",
    optionsList: [
      {
        optionValue: "<p>Oxygen consumption (aerobic capacity)</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Maximum accumulated oxygen deficit (anaerobic capacity)</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Peak blood lactate</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Heart rate</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8703b"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290796264c71f1df2110ed0"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "<p>Which of the following does NOT affect the maximal oxygen consumption of a horse?</p>",
    optionsList: [
      {
        optionValue: "<p>Lung function</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Cardiac output</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Efficiency of gas exchange</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Exercise intensity (above that which is required to elicit a plateau in oxygen consumption)</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8703d"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290797c64c71f1df2110ed1"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "<p>Which of the following is NOT an effect of a high-intensity warm-up?</p>",
    optionsList: [
      {
        optionValue: "<p>Vasodilatation and increased blood flow at the onset of the subsequent exercise</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Increased blood lactate accumulation rate</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Increase in acidaemia induces a right-shift in the oxyhaemoglobin equilibrium curve</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Increased pulmonary arterial temperature</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8703c"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290797c64c71f1df2110ed1"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "<p>Which of the following statements regarding blood lactate is TRUE?</p>",
    optionsList: [
      {
        optionValue: "<p>There is a linear relationship between blood lactate concentration and speed</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Blood lactate concentration peaks 30 minutes after the completion of high-intensity exercise</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>There is an exponential relationship between blood lactate concentration and speed</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>Arabians will have a higher maximum blood lactate concentration than Thoroughbreds under supramaximal exercise conditions</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8703e"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290799064c71f1df2110ed2"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "<p>The anaerobic threshold is the level of work at which lactate starts to accumulate in the blood. This is arbitrarily defined as the horse&rsquo;s speed at the point where blood lactate reaches 4 mmol/L. Respiratory disease can impair oxygen exchange. What impact might this respiratory disease have on VLa4, when compared to the same horse earlier in the season (before the onset of disease)?</p>",
    optionsList: [
      {
        optionValue: "<p>Higher than expected</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>No change from expected</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>Lower than expected</p>",
        optionCorrect: !0
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed8703f"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290799064c71f1df2110ed2"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "<p>A higher than expected heart rate for a given exercise intensity might be a sign of what?</p>",
    optionsList: [
      {
        optionValue: "<p>The horse is in pain and should be assessed further</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>The horse is fit in comparison to a cohort control group</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>The horse is ready to compete</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87040"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/629079a364c71f1df2110ed3"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse"
    },
    statement: "<p>During an incremental speed test, the horse needs to complete ___ at each speed, in order to reach steady-state at that workload, before increasing in speed to the next step.</p>",
    optionsList: [
      {
        optionValue: "<p>15&ndash;30 seconds</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>30&ndash;45 seconds</p>",
        optionCorrect: !1
      },
      {
        optionValue: "<p>45&ndash;60 seconds</p>",
        optionCorrect: !0
      },
      {
        optionValue: "<p>75&ndash;90 seconds</p>",
        optionCorrect: !1
      }
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87041"
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/629079a364c71f1df2110ed3"
  }
];
Array.from(
  { length: 10 },
  (e, t) => `VETS20${t + 10}`
);
const rt = () => nt;
function me() {
  return rt();
}
const ct = (e) => {
  for (let t = e.length - 1; t > 0; t--) {
    const o = Math.floor(Math.random() * (t + 1));
    [e[t], e[o]] = [e[o], e[t]];
  }
  return e;
}, lt = (e, t) => ct(t).slice(0, e);
function pt(e) {
  const t = {
    course: /* @__PURE__ */ new Set(),
    subject: /* @__PURE__ */ new Set(),
    system: /* @__PURE__ */ new Set(),
    animal: /* @__PURE__ */ new Set()
  };
  for (const o of e)
    t.course.add(o.course), t.subject.add(o.subject), t.system.add(o.system), t.animal.add(o.animal);
  return {
    course: [...t.course],
    subject: [...t.subject],
    system: [...t.system],
    animal: [...t.animal]
  };
}
function qe(e, t) {
  return e.filter((o) => (t.course.length === 0 || t.course.includes(o.tags.course)) && (t.subject.length === 0 || t.subject.includes(o.tags.subject)) && (t.system.length === 0 || t.system.includes(o.tags.system)) && (t.animal.length === 0 || t.animal.includes(o.tags.animal)));
}
function ut(e, t, o) {
  const s = e[t].question.optionsList;
  for (let i = 0; i < s.length; i++)
    if (s[i].optionValue === o)
      return i;
}
const no = (e, t) => t.findIndex((o) => {
  var s;
  return ((s = o.question._id) == null ? void 0 : s.$oid) === e;
}), D = Ko("questionsQueue", {
  state: () => ({
    questionsQueue: [],
    questionsStack: [],
    quizStats: [],
    quizMode: "Tutor",
    selectedTags: {
      course: [],
      subject: [],
      system: [],
      animal: []
    },
    timeLimit: 60
    // default time limit 1 min per qs
  }),
  actions: {
    getquestionnumber() {
      const e = me();
      return qe(e, this.selectedTags).length;
    },
    setselectedTags(e) {
      this.selectedTags = e;
    },
    getselectedtags() {
      return this.selectedTags;
    },
    modifySelectedTags(e, { category: t, topic: o }) {
      this.selectedTags[t] = e ? [...this.selectedTags[t], o] : this.selectedTags[t].filter(
        (s) => s !== o
      );
    },
    initialiseQuiz(e, t) {
      this.questionsQueue = e, this.questionsStack = [], this.quizMode = t, this.quizStats = e.map((o) => ({
        question: o,
        correct: 0,
        skipped: 0,
        attempts: 0,
        selectedValue: ""
      }));
    },
    incrementStat(e, t, o) {
      const s = no(e, this.quizStats);
      if (this.quizStats[s]) {
        if (o !== void 0) {
          if (this.quizStats[s][t]++, o === "-1") {
            this.quizStats[s].selectedValue = "Reached Time Limit";
            return;
          }
          const i = this.quizStats[s].question.optionsList.map((r) => r.optionCorrect).indexOf(!0);
          Number(o) === Number(i) ? this.quizStats[s].correct = 1 : this.quizStats[s].correct = 0;
        }
        this.quizStats[s].selectedValue = o !== void 0 ? this.quizStats[s].question.optionsList[Number(o)].optionValue : "";
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
}), ft = ["innerHTML"], dt = { class: "mcq-list" }, ht = ["onClick"], bt = { class: "next-prev-question" }, mt = /* @__PURE__ */ j({
  __name: "MCQQuestion",
  props: {
    _id: {},
    statement: {},
    optionsList: {}
  },
  emits: ["nextQuestion", "skipQuestion", "prevQuestion"],
  setup(e, { emit: t }) {
    const o = D(), { statement: s, optionsList: i, _id: r } = e, n = w(null), a = w(!1), c = t, l = w(o.getRemainingQuestions()), b = () => {
      a.value = !0;
    }, m = () => {
      n.value = null, c("nextQuestion");
    }, g = (V) => {
      O(V), l.value = o.getRemainingQuestions(), c("nextQuestion");
    }, C = () => {
      O(r), c("skipQuestion");
    }, k = (V) => o.incrementStat(
      V.$oid,
      "attempts",
      n.value ?? void 0
    ), O = (V) => {
      k(V), a.value = !1, n.value = null;
    }, re = () => {
      c("prevQuestion");
    }, X = (V, P) => {
      a.value || (n.value = n.value === P ? null : P), k(V);
    }, ye = (V, P, u) => o.quizMode === "Timed" ? ge(V, P) : ce(P, u);
    function ge(V, P) {
      const u = no(V.$oid, o.quizStats), B = o.quizStats[u].selectedValue, $ = ut(
        o.quizStats,
        u,
        B
      );
      return String($) === P ? "selected" : "";
    }
    function ce(V, P) {
      const u = P[parseInt(V)], B = n.value === V;
      return a.value ? u.optionCorrect ? "correct ignore-hover" : B ? "wrong ignore-hover" : "ignore-hover" : B ? "selected" : "";
    }
    return (V, P) => (h(), y(H, null, [
      d("div", {
        class: "mcq-statement",
        innerHTML: V.statement
      }, null, 8, ft),
      d("div", dt, [
        (h(!0), y(H, null, Y(Object.entries(V.optionsList), ([u, B]) => (h(), y("div", {
          key: u,
          class: K(["mcq-option", ye(V._id, u, V.optionsList)]),
          onClick: ($) => X(V._id, u)
        }, [
          Ee(ot, {
            "option-key": u,
            checked: n.value === u,
            option: B,
            submitted: a.value,
            onSelectOption: ($) => X(V._id, u)
          }, null, 8, ["option-key", "checked", "option", "submitted", "onSelectOption"])
        ], 10, ht))), 128))
      ]),
      _(o).quizMode === "Tutor" ? (h(), A(it, {
        key: 0,
        submitted: a.value,
        "selected-option": n.value,
        "hide-skip": l.value <= 1,
        onSubmitAnswer: b,
        onNextQuestion: P[0] || (P[0] = (u) => g(V._id)),
        onSkipQuestion: C
      }, null, 8, ["submitted", "selected-option", "hide-skip"])) : L("", !0),
      d("div", bt, [
        _(o).quizMode === "Timed" ? (h(), A(He, {
          key: 0,
          "button-name": _(o).questionsQueue.length >= 1 ? "→" : "submit",
          onNextQuestion: P[1] || (P[1] = (u) => m())
        }, null, 8, ["button-name"])) : L("", !0),
        _(o).quizMode === "Timed" && _(o).questionsStack.length > 1 ? (h(), A(He, {
          key: 1,
          "button-name": "←",
          onPrevQuestion: P[2] || (P[2] = (u) => re())
        })) : L("", !0)
      ])
    ], 64));
  }
}), ro = /* @__PURE__ */ Q(mt, [["__scopeId", "data-v-4de54040"]]), yt = (e) => (De("data-v-48b61e74"), e = e(), Be(), e), gt = { class: "report-container" }, Vt = { class: "mcq-report" }, Ct = { class: "table-container" }, vt = /* @__PURE__ */ yt(() => /* @__PURE__ */ d("thead", null, [
  /* @__PURE__ */ d("tr", null, [
    /* @__PURE__ */ d("th", null, "question"),
    /* @__PURE__ */ d("th", null, "correct option"),
    /* @__PURE__ */ d("th", null, "your answer")
  ])
], -1)), Pt = { class: "question-row" }, _t = ["href", "innerHTML"], Tt = { class: "answer-row" }, wt = ["innerHTML"], St = { class: "answer-row" }, Et = ["innerHTML"], kt = { class: "mcq-result" }, Lt = { class: "score" }, qt = /* @__PURE__ */ j({
  __name: "MCQStatus",
  setup(e) {
    const t = D(), o = t.quizStats, s = t.quizStats.length, i = o.filter((n) => n.correct === 1).length, r = (i * 100 / s).toFixed(0);
    return (n, a) => (h(), y("div", gt, [
      d("div", Vt, [
        d("div", Ct, [
          d("table", null, [
            vt,
            d("tbody", null, [
              (h(!0), y(H, null, Y(Object.entries(_(o)), ([c, l]) => (h(), y("tr", {
                key: c,
                class: "quiz-statment"
              }, [
                d("td", Pt, [
                  d("a", {
                    href: l.question.link,
                    target: "_blank",
                    innerHTML: l.question.statement
                  }, null, 8, _t)
                ]),
                d("td", Tt, [
                  (h(!0), y(H, null, Y(Object.entries(
                    l.question.optionsList
                  ), ([b, m]) => (h(), y("span", { key: b }, [
                    m.optionCorrect ? (h(), y("span", {
                      key: 0,
                      innerHTML: m.optionValue
                    }, null, 8, wt)) : L("", !0)
                  ]))), 128))
                ]),
                d("td", St, [
                  d("span", {
                    class: K(
                      l.correct === 1 ? "correct-answer" : "wrong-answer"
                    ),
                    innerHTML: l.correct === 1 ? "<span> ✔</span> " : "<span> ✘</span> <span>     </span>" + l.selectedValue
                  }, null, 10, Et)
                ])
              ]))), 128))
            ])
          ])
        ])
      ]),
      d("div", null, [
        d("div", kt, [
          d("span", Lt, "⌛ Result: " + E(_(i)) + " out of " + E(_(s)) + " - (" + E(_(r)) + " %)", 1)
        ])
      ])
    ]));
  }
}), co = /* @__PURE__ */ Q(qt, [["__scopeId", "data-v-48b61e74"]]), $t = /* @__PURE__ */ j({
  __name: "MCQQuiz",
  setup(e) {
    const t = w(), o = D();
    ze(() => {
      i();
    });
    const s = () => {
      o.enqueueQuestion(t.value), i();
    }, i = () => {
      t.value = o.dequeueQuestion();
    }, r = () => window.location.reload();
    return (n, a) => (h(), y(H, null, [
      t.value ? (h(), A(ro, {
        key: 0,
        statement: t.value.statement,
        "options-list": t.value.optionsList,
        _id: t.value._id,
        onNextQuestion: i,
        onSkipQuestion: s
      }, null, 8, ["statement", "options-list", "_id"])) : L("", !0),
      t.value ? L("", !0) : (h(), A(co, { key: 1 })),
      t.value ? L("", !0) : (h(), y("button", {
        key: 2,
        class: "btn-relocate",
        onClick: r
      }, " End "))
    ], 64));
  }
}), Nt = { key: 0 }, Re = 1e3, xt = "-1", jt = /* @__PURE__ */ j({
  __name: "MCQTimedQuiz",
  setup(e) {
    const t = D(), o = w();
    let s = null, i = null;
    const r = w(t.timeLimit);
    ze(() => {
      a();
    }), Vo(() => {
      l(), b();
    });
    const n = () => {
      o.value = t.removeFromLastHistory() ?? o.value;
    }, a = () => o.value = t.dequeueQuestion(), c = () => window.location.reload(), l = () => {
      s && clearTimeout(s), i && clearInterval(i);
    }, b = () => {
      r.value = t.timeLimit;
      const C = () => o.value ? r.value ? r.value-- : g() : l();
      i = window.setInterval(C, Re), s = window.setTimeout(() => {
      }, t.timeLimit * Re);
    }, m = (C) => {
      const k = Math.floor(C / 60), O = C % 60;
      return `${k}:${O < 10 ? "0" : ""}${O}`;
    }, g = () => {
      var k;
      l();
      const C = (O) => t.incrementStat(O, "attempts", xt);
      for (C(((k = o.value) == null ? void 0 : k._id.$oid) ?? ""); o.value = t.dequeueQuestion(); )
        C(o.value._id.$oid);
      return alert("Time's up! Quiz has ended."), a();
    };
    return (C, k) => (h(), y(H, null, [
      r.value ? (h(), y("h3", Nt, "Time left: " + E(m(r.value)), 1)) : L("", !0),
      d("h3", null, " Question " + E(_(t).questionsStack.length) + " out of " + E(_(t).questionsQueue.length + _(t).questionsStack.length), 1),
      o.value ? (h(), A(ro, {
        key: 1,
        statement: o.value.statement,
        "options-list": o.value.optionsList,
        _id: o.value._id,
        onNextQuestion: a,
        onPrevQuestion: n
      }, null, 8, ["statement", "options-list", "_id"])) : L("", !0),
      o.value ? L("", !0) : (h(), A(co, { key: 2 })),
      o.value ? L("", !0) : (h(), y("button", {
        key: 3,
        class: "btn-relocate",
        onClick: c
      }, " End "))
    ], 64));
  }
}), Ot = ["id", "name", "value", "disabled"], It = ["for"], At = {
  key: 0,
  class: "question-number"
}, Wt = /* @__PURE__ */ j({
  __name: "FilterCheckbox",
  props: {
    category: {},
    topics: {}
  },
  setup(e) {
    const { category: t, topics: o } = e, s = D(), i = Se(
      () => Object.entries(o).map(([a, c]) => {
        const l = n(c, t);
        return { idx: a, topic: c, num: l };
      }).filter(({ topic: a }) => a !== void 0)
    ), r = (a) => {
      if (!(a.target instanceof HTMLInputElement))
        return console.error("Trying to click on non-input element");
      const c = a.target.name, l = a.target.value;
      s.modifySelectedTags(a.target.checked, { category: c, topic: l });
    }, n = (a, c) => {
      var g;
      if ((g = s.getselectedtags()[c]) != null && g.includes(
        a
      ))
        return null;
      const b = JSON.parse(
        JSON.stringify(s.getselectedtags())
      );
      b[c].includes(a) || b[c].push(a);
      const m = me();
      return qe(
        m,
        b
      ).length.toString();
    };
    return (a, c) => (h(), y("ul", null, [
      (h(!0), y(H, null, Y(i.value, ({ idx: l, num: b, topic: m }) => (h(), y("li", {
        key: l,
        class: K(["filter-options", { "grey-out": b === "0" }])
      }, [
        d("input", {
          id: `${a.category}-${m}-checkbox`,
          type: "checkbox",
          name: a.category,
          value: m,
          disabled: b === "0",
          onChange: c[0] || (c[0] = (g) => r(g))
        }, null, 40, Ot),
        d("label", {
          for: `${a.category}-${m}-checkbox`
        }, [
          Co(E(m) + " ", 1),
          b !== null && b !== "0" ? (h(), y("span", At, E(b), 1)) : L("", !0)
        ], 8, It)
      ], 2))), 128))
    ]));
  }
}), Ht = /* @__PURE__ */ Q(Wt, [["__scopeId", "data-v-2ed0a288"]]), Rt = { class: "filter" }, Mt = /* @__PURE__ */ j({
  __name: "MCQTagOptions",
  setup(e) {
    const o = me().flatMap((i) => i.tags), s = pt(o);
    return (i, r) => (h(), y("div", Rt, [
      (h(!0), y(H, null, Y(Object.entries(_(s)), ([n, a]) => (h(), y("div", {
        key: n,
        class: "category"
      }, [
        d("h2", null, E(n), 1),
        Ee(Ht, {
          category: n,
          topics: a
        }, null, 8, ["category", "topics"])
      ]))), 128))
    ]));
  }
}), Qt = { class: "dropdown" }, Dt = { for: "optionName" }, Bt = /* @__PURE__ */ d("option", { value: "" }, "--Please choose an option--", -1), zt = ["value"], Ft = /* @__PURE__ */ j({
  __name: "DropDownbox",
  props: {
    options: {},
    optionName: {}
  },
  setup(e) {
    const t = D(), o = w(0);
    function s(i) {
      const r = i.target;
      r.value && (o.value = parseFloat(r.value) * 60, t.setTimeLimit(o.value));
    }
    return (i, r) => (h(), y("div", Qt, [
      d("label", Dt, E(i.optionName) + ":   ", 1),
      d("select", {
        id: "optionName",
        name: "optionName",
        onChange: s
      }, [
        Bt,
        (h(!0), y(H, null, Y(i.options, (n) => (h(), y("option", {
          key: n.value,
          value: n.value
        }, E(n.value) + " " + E(n.unit), 9, zt))), 128))
      ], 32)
    ]));
  }
}), ne = (e) => (De("data-v-817bbbb1"), e = e(), Be(), e), Ut = { class: "start-page-container" }, Gt = /* @__PURE__ */ ne(() => /* @__PURE__ */ d("h1", null, "VetCloud Smart Quiz", -1)), Jt = { class: "quiz-config-container" }, Zt = { class: "question-config-container" }, Kt = { class: "tag-text" }, Yt = { class: "question-amount-container" }, Xt = /* @__PURE__ */ ne(() => /* @__PURE__ */ d("label", { for: "question-amount" }, "Select the amount of questions:", -1)), es = ["max"], os = {
  key: 0,
  class: "show-max-msg"
}, ts = /* @__PURE__ */ ne(() => /* @__PURE__ */ d("label", { for: "mode-select" }, "Select mode:", -1)), ss = /* @__PURE__ */ ne(() => /* @__PURE__ */ d("option", { value: "Tutor" }, "Tutor mode", -1)), is = /* @__PURE__ */ ne(() => /* @__PURE__ */ d("option", { value: "Timed" }, "Timed mode", -1)), as = [
  ss,
  is
], ns = 3e3, rs = /* @__PURE__ */ j({
  __name: "StartPage",
  emits: ["start-quiz"],
  setup(e, { emit: t }) {
    const o = w(1), s = w("Tutor"), i = w(!1), r = w(null), n = t, a = D(), c = () => {
      n("start-quiz", {
        questionAmount: o.value,
        mode: s.value
      });
    }, l = () => {
      r.value && clearTimeout(r.value), o.value > a.getquestionnumber() && (o.value = a.getquestionnumber(), i.value = !0, r.value = window.setTimeout(() => {
        i.value = !1;
      }, ns));
    };
    return (b, m) => (h(), y("div", Ut, [
      Gt,
      Ee(Mt),
      d("div", Jt, [
        d("div", Zt, [
          d("p", Kt, " Maximum possible questions: " + E(_(a).getquestionnumber()), 1),
          d("div", Yt, [
            Xt,
            xe(d("input", {
              id: "question-amount",
              "onUpdate:modelValue": m[0] || (m[0] = (g) => o.value = g),
              type: "number",
              placeholder: "Question amount",
              min: "1",
              max: _(a).getquestionnumber(),
              onInput: l
            }, null, 40, es), [
              [
                vo,
                o.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          i.value ? (h(), y("p", os, " Cannot select more than " + E(_(a).getquestionnumber()) + " questions. ", 1)) : L("", !0),
          d("div", null, [
            ts,
            xe(d("select", {
              id: "mode-select",
              "onUpdate:modelValue": m[1] || (m[1] = (g) => s.value = g)
            }, as, 512), [
              [Po, s.value]
            ])
          ]),
          s.value === "Timed" ? (h(), A(Ft, {
            key: 1,
            options: [
              { value: 1.5, label: "Time Option 1", unit: "Min." },
              { value: 1, label: "Time Option 2", unit: "Min." }
            ],
            "option-name": "Time per Question"
          }, null, 8, ["options"])) : L("", !0)
        ])
      ]),
      d("button", {
        class: "start-button",
        onClick: c
      }, "Start")
    ]));
  }
}), cs = /* @__PURE__ */ Q(rs, [["__scopeId", "data-v-817bbbb1"]]), ls = /* @__PURE__ */ j({
  __name: "CrucibleComponent",
  setup(e) {
    const t = w(0), o = D(), s = w(!1), i = ({ questionAmount: r, mode: n }) => {
      const a = o.getselectedtags(), c = me(), l = qe(
        c,
        a
      ), b = lt(r, l);
      t.value = b.length, o.initialiseQuiz(b, n), n === "Timed" && o.setTimeLimit(r * o.timeLimit), s.value = !0;
    };
    return (r, n) => s.value && _(o).quizMode === "Tutor" ? (h(), A($t, { key: 0 })) : s.value && _(o).quizMode === "Timed" ? (h(), A(jt, { key: 1 })) : (h(), A(cs, {
      key: 2,
      onStartQuiz: i
    }));
  }
}), ps = /* @__PURE__ */ Q(ls, [["__scopeId", "data-v-a9c91ee9"]]);
function fs(e) {
  const t = Uo();
  e.use(t), e.component("CrucibleComponent", ps);
}
export {
  ps as CrucibleComponent,
  fs as createViewerPlugin
};
