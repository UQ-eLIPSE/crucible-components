import { effectScope as Ae, ref as S, markRaw as R, hasInjectionContext as ut, inject as lt, getCurrentInstance as dt, toRaw as de, watch as ce, reactive as ft, isRef as te, isReactive as Se, toRef as me, nextTick as qe, computed as Ee, unref as N, getCurrentScope as pt, onScopeDispose as ht, toRefs as Ie, defineComponent as x, mergeModels as mt, useModel as Qe, openBlock as m, createElementBlock as v, Fragment as M, createElementVNode as p, renderList as W, normalizeClass as ue, createCommentVNode as q, toDisplayString as O, pushScopeId as De, popScopeId as Ue, onMounted as we, createBlock as j, onBeforeMount as gt, createTextVNode as _t, createVNode as ze, withDirectives as Pe, vModelText as vt, vModelSelect as bt } from "vue";
var Re = !1;
function se(e, t, n) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, n), n) : (e[t] = n, n);
}
function ge(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
function yt() {
  return Fe().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Fe() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const St = typeof Proxy == "function", Et = "devtools-plugin:setup", wt = "plugin:settings:set";
let B, _e;
function Tt() {
  var e;
  return B !== void 0 || (typeof window < "u" && window.performance ? (B = !0, _e = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (B = !0, _e = globalThis.perf_hooks.performance) : B = !1), B;
}
function kt() {
  return Tt() ? _e.now() : Date.now();
}
class Ot {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const i in t.settings) {
        const r = t.settings[i];
        o[i] = r.defaultValue;
      }
    const s = `__vue-devtools-plugin-settings__${t.id}`;
    let a = Object.assign({}, o);
    try {
      const i = localStorage.getItem(s), r = JSON.parse(i);
      Object.assign(a, r);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return a;
      },
      setSettings(i) {
        try {
          localStorage.setItem(s, JSON.stringify(i));
        } catch {
        }
        a = i;
      },
      now() {
        return kt();
      }
    }, n && n.on(wt, (i, r) => {
      i === this.plugin.id && this.fallbacks.setSettings(r);
    }), this.proxiedOn = new Proxy({}, {
      get: (i, r) => this.target ? this.target.on[r] : (...c) => {
        this.onQueue.push({
          method: r,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (i, r) => this.target ? this.target[r] : r === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(r) ? (...c) => (this.targetQueue.push({
        method: r,
        args: c,
        resolve: () => {
        }
      }), this.fallbacks[r](...c)) : (...c) => new Promise((u) => {
        this.targetQueue.push({
          method: r,
          args: c,
          resolve: u
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function He(e, t) {
  const n = e, o = Fe(), s = yt(), a = St && n.enableEarlyProxy;
  if (s && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a))
    s.emit(Et, e, t);
  else {
    const i = a ? new Ot(n, s) : null;
    (o.__VUE_DEVTOOLS_PLUGINS__ = o.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: i
    }), i && t(i.proxiedTarget);
  }
}
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let K;
const ne = (e) => K = e, Be = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function F(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var V;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(V || (V = {}));
const fe = typeof window < "u", ee = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && fe, Ce = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function Nt(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Te(e, t, n) {
  const o = new XMLHttpRequest();
  o.open("GET", e), o.responseType = "blob", o.onload = function() {
    We(o.response, t, n);
  }, o.onerror = function() {
    console.error("could not download file");
  }, o.send();
}
function Ge(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function ie(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const n = document.createEvent("MouseEvents");
    n.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(n);
  }
}
const re = typeof navigator == "object" ? navigator : { userAgent: "" }, Je = /Macintosh/.test(re.userAgent) && /AppleWebKit/.test(re.userAgent) && !/Safari/.test(re.userAgent), We = fe ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Je ? $t : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in re ? qt : (
      // Fallback to using FileReader and a popup
      It
    )
  )
) : () => {
};
function $t(e, t = "download", n) {
  const o = document.createElement("a");
  o.download = t, o.rel = "noopener", typeof e == "string" ? (o.href = e, o.origin !== location.origin ? Ge(o.href) ? Te(e, t, n) : (o.target = "_blank", ie(o)) : ie(o)) : (o.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(o.href);
  }, 4e4), setTimeout(function() {
    ie(o);
  }, 0));
}
function qt(e, t = "download", n) {
  if (typeof e == "string")
    if (Ge(e))
      Te(e, t, n);
    else {
      const o = document.createElement("a");
      o.href = e, o.target = "_blank", setTimeout(function() {
        ie(o);
      });
    }
  else
    navigator.msSaveOrOpenBlob(Nt(e, n), t);
}
function It(e, t, n, o) {
  if (o = o || open("", "_blank"), o && (o.document.title = o.document.body.innerText = "downloading..."), typeof e == "string")
    return Te(e, t, n);
  const s = e.type === "application/octet-stream", a = /constructor/i.test(String(Ce.HTMLElement)) || "safari" in Ce, i = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((i || s && a || Je) && typeof FileReader < "u") {
    const r = new FileReader();
    r.onloadend = function() {
      let c = r.result;
      if (typeof c != "string")
        throw o = null, new Error("Wrong reader.result type");
      c = i ? c : c.replace(/^data:[^;]*;/, "data:attachment/file;"), o ? o.location.href = c : location.assign(c), o = null;
    }, r.readAsDataURL(e);
  } else {
    const r = URL.createObjectURL(e);
    o ? o.location.assign(r) : location.href = r, o = null, setTimeout(function() {
      URL.revokeObjectURL(r);
    }, 4e4);
  }
}
function w(e, t) {
  const n = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, t) : t === "error" ? console.error(n) : t === "warn" ? console.warn(n) : console.log(n);
}
function ke(e) {
  return "_a" in e && "install" in e;
}
function Ye() {
  if (!("clipboard" in navigator))
    return w("Your browser doesn't support the Clipboard API", "error"), !0;
}
function Xe(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (w('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Qt(e) {
  if (!Ye())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), w("Global state copied to clipboard.");
    } catch (t) {
      if (Xe(t))
        return;
      w("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function Pt(e) {
  if (!Ye())
    try {
      Ze(e, JSON.parse(await navigator.clipboard.readText())), w("Global state pasted from clipboard.");
    } catch (t) {
      if (Xe(t))
        return;
      w("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function Ct(e) {
  try {
    We(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    w("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let L;
function Vt() {
  L || (L = document.createElement("input"), L.type = "file", L.accept = ".json");
  function e() {
    return new Promise((t, n) => {
      L.onchange = async () => {
        const o = L.files;
        if (!o)
          return t(null);
        const s = o.item(0);
        return t(s ? { text: await s.text(), file: s } : null);
      }, L.oncancel = () => t(null), L.onerror = n, L.click();
    });
  }
  return e;
}
async function xt(e) {
  try {
    const n = await Vt()();
    if (!n)
      return;
    const { text: o, file: s } = n;
    Ze(e, JSON.parse(o)), w(`Global state imported from "${s.name}".`);
  } catch (t) {
    w("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function Ze(e, t) {
  for (const n in t) {
    const o = e.state.value[n];
    o ? Object.assign(o, t[n]) : e.state.value[n] = t[n];
  }
}
function C(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const Ke = "🍍 Pinia (root)", ve = "_root";
function Lt(e) {
  return ke(e) ? {
    id: ve,
    label: Ke
  } : {
    id: e.$id,
    label: e.$id
  };
}
function jt(e) {
  if (ke(e)) {
    const n = Array.from(e._s.keys()), o = e._s;
    return {
      state: n.map((a) => ({
        editable: !0,
        key: a,
        value: e.state.value[a]
      })),
      getters: n.filter((a) => o.get(a)._getters).map((a) => {
        const i = o.get(a);
        return {
          editable: !1,
          key: a,
          value: i._getters.reduce((r, c) => (r[c] = i[c], r), {})
        };
      })
    };
  }
  const t = {
    state: Object.keys(e.$state).map((n) => ({
      editable: !0,
      key: n,
      value: e.$state[n]
    }))
  };
  return e._getters && e._getters.length && (t.getters = e._getters.map((n) => ({
    editable: !1,
    key: n,
    value: e[n]
  }))), e._customProperties.size && (t.customProperties = Array.from(e._customProperties).map((n) => ({
    editable: !0,
    key: n,
    value: e[n]
  }))), t;
}
function Mt(e) {
  return e ? Array.isArray(e) ? e.reduce((t, n) => (t.keys.push(n.key), t.operations.push(n.type), t.oldValue[n.key] = n.oldValue, t.newValue[n.key] = n.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: C(e.type),
    key: C(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function At(e) {
  switch (e) {
    case V.direct:
      return "mutation";
    case V.patchFunction:
      return "$patch";
    case V.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let J = !0;
const ae = [], z = "pinia:mutations", k = "pinia", { assign: Dt } = Object, le = (e) => "🍍 " + e;
function Ut(e, t) {
  He({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: ae,
    app: e
  }, (n) => {
    typeof n.now != "function" && w("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
      id: z,
      label: "Pinia 🍍",
      color: 15064968
    }), n.addInspector({
      id: k,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            Qt(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await Pt(t), n.sendInspectorTree(k), n.sendInspectorState(k);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            Ct(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await xt(t), n.sendInspectorTree(k), n.sendInspectorState(k);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (o) => {
            const s = t._s.get(o);
            s ? typeof s.$reset != "function" ? w(`Cannot reset "${o}" store because it doesn't have a "$reset" method implemented.`, "warn") : (s.$reset(), w(`Store "${o}" reset.`)) : w(`Cannot reset "${o}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((o, s) => {
      const a = o.componentInstance && o.componentInstance.proxy;
      if (a && a._pStores) {
        const i = o.componentInstance.proxy._pStores;
        Object.values(i).forEach((r) => {
          o.instanceData.state.push({
            type: le(r.$id),
            key: "state",
            editable: !0,
            value: r._isOptionsAPI ? {
              _custom: {
                value: de(r.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => r.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(r.$state).reduce((c, u) => (c[u] = r.$state[u], c), {})
            )
          }), r._getters && r._getters.length && o.instanceData.state.push({
            type: le(r.$id),
            key: "getters",
            editable: !1,
            value: r._getters.reduce((c, u) => {
              try {
                c[u] = r[u];
              } catch (f) {
                c[u] = f;
              }
              return c;
            }, {})
          });
        });
      }
    }), n.on.getInspectorTree((o) => {
      if (o.app === e && o.inspectorId === k) {
        let s = [t];
        s = s.concat(Array.from(t._s.values())), o.rootNodes = (o.filter ? s.filter((a) => "$id" in a ? a.$id.toLowerCase().includes(o.filter.toLowerCase()) : Ke.toLowerCase().includes(o.filter.toLowerCase())) : s).map(Lt);
      }
    }), n.on.getInspectorState((o) => {
      if (o.app === e && o.inspectorId === k) {
        const s = o.nodeId === ve ? t : t._s.get(o.nodeId);
        if (!s)
          return;
        s && (o.state = jt(s));
      }
    }), n.on.editInspectorState((o, s) => {
      if (o.app === e && o.inspectorId === k) {
        const a = o.nodeId === ve ? t : t._s.get(o.nodeId);
        if (!a)
          return w(`store "${o.nodeId}" not found`, "error");
        const { path: i } = o;
        ke(a) ? i.unshift("state") : (i.length !== 1 || !a._customProperties.has(i[0]) || i[0] in a.$state) && i.unshift("$state"), J = !1, o.set(a, i, o.state.value), J = !0;
      }
    }), n.on.editComponentState((o) => {
      if (o.type.startsWith("🍍")) {
        const s = o.type.replace(/^🍍\s*/, ""), a = t._s.get(s);
        if (!a)
          return w(`store "${s}" not found`, "error");
        const { path: i } = o;
        if (i[0] !== "state")
          return w(`Invalid path for store "${s}":
${i}
Only state can be modified.`);
        i[0] = "$state", J = !1, o.set(a, i, o.state.value), J = !0;
      }
    });
  });
}
function zt(e, t) {
  ae.includes(le(t.$id)) || ae.push(le(t.$id)), He({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: ae,
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
  }, (n) => {
    const o = typeof n.now == "function" ? n.now.bind(n) : Date.now;
    t.$onAction(({ after: i, onError: r, name: c, args: u }) => {
      const f = et++;
      n.addTimelineEvent({
        layerId: z,
        event: {
          time: o(),
          title: "🛫 " + c,
          subtitle: "start",
          data: {
            store: C(t.$id),
            action: C(c),
            args: u
          },
          groupId: f
        }
      }), i((g) => {
        D = void 0, n.addTimelineEvent({
          layerId: z,
          event: {
            time: o(),
            title: "🛬 " + c,
            subtitle: "end",
            data: {
              store: C(t.$id),
              action: C(c),
              args: u,
              result: g
            },
            groupId: f
          }
        });
      }), r((g) => {
        D = void 0, n.addTimelineEvent({
          layerId: z,
          event: {
            time: o(),
            logType: "error",
            title: "💥 " + c,
            subtitle: "end",
            data: {
              store: C(t.$id),
              action: C(c),
              args: u,
              error: g
            },
            groupId: f
          }
        });
      });
    }, !0), t._customProperties.forEach((i) => {
      ce(() => N(t[i]), (r, c) => {
        n.notifyComponentUpdate(), n.sendInspectorState(k), J && n.addTimelineEvent({
          layerId: z,
          event: {
            time: o(),
            title: "Change",
            subtitle: i,
            data: {
              newValue: r,
              oldValue: c
            },
            groupId: D
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: i, type: r }, c) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState(k), !J)
        return;
      const u = {
        time: o(),
        title: At(r),
        data: Dt({ store: C(t.$id) }, Mt(i)),
        groupId: D
      };
      r === V.patchFunction ? u.subtitle = "⤵️" : r === V.patchObject ? u.subtitle = "🧩" : i && !Array.isArray(i) && (u.subtitle = i.type), i && (u.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: i
        }
      }), n.addTimelineEvent({
        layerId: z,
        event: u
      });
    }, { detached: !0, flush: "sync" });
    const s = t._hotUpdate;
    t._hotUpdate = R((i) => {
      s(i), n.addTimelineEvent({
        layerId: z,
        event: {
          time: o(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: C(t.$id),
            info: C("HMR update")
          }
        }
      }), n.notifyComponentUpdate(), n.sendInspectorTree(k), n.sendInspectorState(k);
    });
    const { $dispose: a } = t;
    t.$dispose = () => {
      a(), n.notifyComponentUpdate(), n.sendInspectorTree(k), n.sendInspectorState(k), n.getSettings().logStoreChanges && w(`Disposed "${t.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree(k), n.sendInspectorState(k), n.getSettings().logStoreChanges && w(`"${t.$id}" store installed 🆕`);
  });
}
let et = 0, D;
function Ve(e, t, n) {
  const o = t.reduce((s, a) => (s[a] = de(e)[a], s), {});
  for (const s in o)
    e[s] = function() {
      const a = et, i = n ? new Proxy(e, {
        get(...c) {
          return D = a, Reflect.get(...c);
        },
        set(...c) {
          return D = a, Reflect.set(...c);
        }
      }) : e;
      D = a;
      const r = o[s].apply(i, arguments);
      return D = void 0, r;
    };
}
function Rt({ app: e, store: t, options: n }) {
  if (t.$id.startsWith("__hot:"))
    return;
  t._isOptionsAPI = !!n.state, Ve(t, Object.keys(n.actions), t._isOptionsAPI);
  const o = t._hotUpdate;
  de(t)._hotUpdate = function(s) {
    o.apply(this, arguments), Ve(t, Object.keys(s._hmrPayload.actions), !!t._isOptionsAPI);
  }, zt(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    t
  );
}
function Ft() {
  const e = Ae(!0), t = e.run(() => S({}));
  let n = [], o = [];
  const s = R({
    install(a) {
      ne(s), s._a = a, a.provide(Be, s), a.config.globalProperties.$pinia = s, ee && Ut(a, s), o.forEach((i) => n.push(i)), o = [];
    },
    use(a) {
      return !this._a && !Re ? o.push(a) : n.push(a), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return ee && typeof Proxy < "u" && s.use(Rt), s;
}
function tt(e, t) {
  for (const n in t) {
    const o = t[n];
    if (!(n in e))
      continue;
    const s = e[n];
    F(s) && F(o) && !te(o) && !Se(o) ? e[n] = tt(s, o) : e[n] = o;
  }
  return e;
}
const nt = () => {
};
function xe(e, t, n, o = nt) {
  e.push(t);
  const s = () => {
    const a = e.indexOf(t);
    a > -1 && (e.splice(a, 1), o());
  };
  return !n && pt() && ht(s), s;
}
function G(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const Ht = (e) => e();
function be(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((n, o) => e.set(o, n)), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const o = t[n], s = e[n];
    F(s) && F(o) && e.hasOwnProperty(n) && !te(o) && !Se(o) ? e[n] = be(s, o) : e[n] = o;
  }
  return e;
}
const Bt = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Gt(e) {
  return !F(e) || !e.hasOwnProperty(Bt);
}
const { assign: P } = Object;
function Le(e) {
  return !!(te(e) && e.effect);
}
function je(e, t, n, o) {
  const { state: s, actions: a, getters: i } = t, r = n.state.value[e];
  let c;
  function u() {
    !r && (process.env.NODE_ENV === "production" || !o) && (n.state.value[e] = s ? s() : {});
    const f = process.env.NODE_ENV !== "production" && o ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Ie(S(s ? s() : {}).value)
    ) : Ie(n.state.value[e]);
    return P(f, a, Object.keys(i || {}).reduce((g, b) => (process.env.NODE_ENV !== "production" && b in f && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${b}" in store "${e}".`), g[b] = R(Ee(() => {
      ne(n);
      const _ = n._s.get(e);
      return i[b].call(_, _);
    })), g), {}));
  }
  return c = ye(e, u, t, n, o, !0), c;
}
function ye(e, t, n = {}, o, s, a) {
  let i;
  const r = P({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !o._e.active)
    throw new Error("Pinia destroyed");
  const c = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Re && (c.onTrigger = (d) => {
    u ? _ = d : u == !1 && !h._hotUpdating && (Array.isArray(_) ? _.push(d) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let u, f, g = [], b = [], _;
  const E = o.state.value[e];
  !a && !E && (process.env.NODE_ENV === "production" || !s) && (o.state.value[e] = {});
  const T = S({});
  let I;
  function U(d) {
    let l;
    u = f = !1, process.env.NODE_ENV !== "production" && (_ = []), typeof d == "function" ? (d(o.state.value[e]), l = {
      type: V.patchFunction,
      storeId: e,
      events: _
    }) : (be(o.state.value[e], d), l = {
      type: V.patchObject,
      payload: d,
      storeId: e,
      events: _
    });
    const y = I = Symbol();
    qe().then(() => {
      I === y && (u = !0);
    }), f = !0, G(g, l, o.state.value[e]);
  }
  const it = a ? function() {
    const { state: l } = n, y = l ? l() : {};
    this.$patch(($) => {
      P($, y);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : nt
  );
  function rt() {
    i.stop(), g = [], b = [], o._s.delete(e);
  }
  function Ne(d, l) {
    return function() {
      ne(o);
      const y = Array.from(arguments), $ = [], X = [];
      function at(Q) {
        $.push(Q);
      }
      function ct(Q) {
        X.push(Q);
      }
      G(b, {
        args: y,
        name: d,
        store: h,
        after: at,
        onError: ct
      });
      let Z;
      try {
        Z = l.apply(this && this.$id === e ? this : h, y);
      } catch (Q) {
        throw G(X, Q), Q;
      }
      return Z instanceof Promise ? Z.then((Q) => (G($, Q), Q)).catch((Q) => (G(X, Q), Promise.reject(Q))) : (G($, Z), Z);
    };
  }
  const oe = /* @__PURE__ */ R({
    actions: {},
    getters: {},
    state: [],
    hotState: T
  }), $e = {
    _p: o,
    // _s: scope,
    $id: e,
    $onAction: xe.bind(null, b),
    $patch: U,
    $reset: it,
    $subscribe(d, l = {}) {
      const y = xe(g, d, l.detached, () => $()), $ = i.run(() => ce(() => o.state.value[e], (X) => {
        (l.flush === "sync" ? f : u) && d({
          storeId: e,
          type: V.direct,
          events: _
        }, X);
      }, P({}, c, l)));
      return y;
    },
    $dispose: rt
  }, h = ft(process.env.NODE_ENV !== "production" || ee ? P(
    {
      _hmrPayload: oe,
      _customProperties: R(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    $e
    // must be added later
    // setupStore
  ) : $e);
  o._s.set(e, h);
  const A = (o._a && o._a.runWithContext || Ht)(() => o._e.run(() => (i = Ae()).run(t)));
  for (const d in A) {
    const l = A[d];
    if (te(l) && !Le(l) || Se(l))
      process.env.NODE_ENV !== "production" && s ? se(T.value, d, me(A, d)) : a || (E && Gt(l) && (te(l) ? l.value = E[d] : be(l, E[d])), o.state.value[e][d] = l), process.env.NODE_ENV !== "production" && oe.state.push(d);
    else if (typeof l == "function") {
      const y = process.env.NODE_ENV !== "production" && s ? l : Ne(d, l);
      A[d] = y, process.env.NODE_ENV !== "production" && (oe.actions[d] = l), r.actions[d] = l;
    } else
      process.env.NODE_ENV !== "production" && Le(l) && (oe.getters[d] = a ? (
        // @ts-expect-error
        n.getters[d]
      ) : l, fe && (A._getters || // @ts-expect-error: same
      (A._getters = R([]))).push(d));
  }
  if (P(h, A), P(de(h), A), Object.defineProperty(h, "$state", {
    get: () => process.env.NODE_ENV !== "production" && s ? T.value : o.state.value[e],
    set: (d) => {
      if (process.env.NODE_ENV !== "production" && s)
        throw new Error("cannot set hotState");
      U((l) => {
        P(l, d);
      });
    }
  }), process.env.NODE_ENV !== "production" && (h._hotUpdate = R((d) => {
    h._hotUpdating = !0, d._hmrPayload.state.forEach((l) => {
      if (l in h.$state) {
        const y = d.$state[l], $ = h.$state[l];
        typeof y == "object" && F(y) && F($) ? tt(y, $) : d.$state[l] = $;
      }
      se(h, l, me(d.$state, l));
    }), Object.keys(h.$state).forEach((l) => {
      l in d.$state || ge(h, l);
    }), u = !1, f = !1, o.state.value[e] = me(d._hmrPayload, "hotState"), f = !0, qe().then(() => {
      u = !0;
    });
    for (const l in d._hmrPayload.actions) {
      const y = d[l];
      se(h, l, Ne(l, y));
    }
    for (const l in d._hmrPayload.getters) {
      const y = d._hmrPayload.getters[l], $ = a ? (
        // special handling of options api
        Ee(() => (ne(o), y.call(h, h)))
      ) : y;
      se(h, l, $);
    }
    Object.keys(h._hmrPayload.getters).forEach((l) => {
      l in d._hmrPayload.getters || ge(h, l);
    }), Object.keys(h._hmrPayload.actions).forEach((l) => {
      l in d._hmrPayload.actions || ge(h, l);
    }), h._hmrPayload = d._hmrPayload, h._getters = d._getters, h._hotUpdating = !1;
  })), ee) {
    const d = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((l) => {
      Object.defineProperty(h, l, P({ value: h[l] }, d));
    });
  }
  return o._p.forEach((d) => {
    if (ee) {
      const l = i.run(() => d({
        store: h,
        app: o._a,
        pinia: o,
        options: r
      }));
      Object.keys(l || {}).forEach((y) => h._customProperties.add(y)), P(h, l);
    } else
      P(h, i.run(() => d({
        store: h,
        app: o._a,
        pinia: o,
        options: r
      })));
  }), process.env.NODE_ENV !== "production" && h.$state && typeof h.$state == "object" && typeof h.$state.constructor == "function" && !h.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${h.$id}".`), E && a && n.hydrate && n.hydrate(h.$state, E), u = !0, f = !0, h;
}
function Jt(e, t, n) {
  let o, s;
  const a = typeof t == "function";
  if (typeof e == "string")
    o = e, s = a ? n : t;
  else if (s = e, o = e.id, process.env.NODE_ENV !== "production" && typeof o != "string")
    throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
  function i(r, c) {
    const u = ut();
    if (r = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && K && K._testing ? null : r) || (u ? lt(Be, null) : null), r && ne(r), process.env.NODE_ENV !== "production" && !K)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    r = K, r._s.has(o) || (a ? ye(o, t, s, r) : je(o, s, r), process.env.NODE_ENV !== "production" && (i._pinia = r));
    const f = r._s.get(o);
    if (process.env.NODE_ENV !== "production" && c) {
      const g = "__hot:" + o, b = a ? ye(g, t, s, r, !0) : je(g, P({}, s), r, !0);
      c._hotUpdate(b), delete r.state.value[g], r._s.delete(g);
    }
    if (process.env.NODE_ENV !== "production" && fe) {
      const g = dt();
      if (g && g.proxy && // avoid adding stores that are just built for hot module replacement
      !c) {
        const b = g.proxy, _ = "_pStores" in b ? b._pStores : b._pStores = {};
        _[o] = f;
      }
    }
    return f;
  }
  return i.$id = o, i;
}
const Wt = ["innerHTML"], Yt = { class: "mcq-list" }, Xt = ["onClick"], Zt = ["id", "checked", "onClick"], Kt = ["for", "innerHTML"], en = /* @__PURE__ */ x({
  __name: "MCQQuestion",
  props: /* @__PURE__ */ mt({
    statement: {},
    optionsList: {},
    className: {}
  }, {
    selectedQuestion: {
      type: Boolean,
      default: null
    },
    selectedQuestionModifiers: {},
    selectedOption: {
      type: String,
      default: null
    },
    selectedOptionModifiers: {}
  }),
  emits: ["update:selectedQuestion", "update:selectedOption"],
  setup(e) {
    const t = Qe(e, "selectedQuestion"), n = Qe(e, "selectedOption"), o = (s) => {
      n.value = s, t.value = !0;
    };
    return (s, a) => (m(), v(M, null, [
      p("div", {
        class: "mcq-statement",
        innerHTML: s.statement
      }, null, 8, Wt),
      p("div", Yt, [
        (m(!0), v(M, null, W(Object.entries(s.optionsList), ([i, r]) => (m(), v("div", {
          key: i,
          class: "mcq-option",
          onClick: (c) => o(i)
        }, [
          (m(), v("input", {
            id: "option-" + i,
            key: i,
            "test-id": "radio_options",
            type: "radio",
            name: "options",
            checked: n.value === i,
            class: ue(s.className),
            onClick: (c) => o(i)
          }, null, 10, Zt)),
          p("label", {
            for: "option-" + i,
            class: ue(s.className),
            innerHTML: r.optionValue
          }, null, 10, Kt)
        ], 8, Xt))), 128))
      ])
    ], 64));
  }
}), Y = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, ot = /* @__PURE__ */ Y(en, [["__scopeId", "data-v-8a5145b4"]]);
Array.from(
  { length: 10 },
  (e, t) => `VETS20${t + 10}`
);
const tn = [
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System",
      animal: ""
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
      $oid: "6615c7fb49fbda0108a9ac0b"
    },
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03"
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System",
      animal: "horse"
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
      $oid: "6615c7fb49fbda0108a9ac0b"
    },
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03"
  }
], nn = () => tn;
function pe() {
  return nn();
}
const on = (e) => {
  for (let t = e.length - 1; t > 0; t--) {
    const n = Math.floor(Math.random() * (t + 1));
    [e[t], e[n]] = [e[n], e[t]];
  }
  return e;
}, sn = (e, t) => on(t).slice(0, e);
function rn(e) {
  const t = {
    course: /* @__PURE__ */ new Set(),
    subject: /* @__PURE__ */ new Set(),
    system: /* @__PURE__ */ new Set(),
    animal: /* @__PURE__ */ new Set()
  };
  for (const n of e)
    t.course.add(n.course), t.subject.add(n.subject), t.system.add(n.system), t.animal.add(n.animal);
  return {
    course: [...t.course],
    subject: [...t.subject],
    system: [...t.system],
    animal: [...t.animal]
  };
}
function Oe(e, t) {
  return e.filter((n) => (t.course.length === 0 || t.course.includes(n.tags.course)) && (t.subject.length === 0 || t.subject.includes(n.tags.subject)) && (t.system.length === 0 || t.system.includes(n.tags.system)) && (t.animal.length === 0 || t.animal.includes(n.tags.animal)));
}
const an = (e, t) => t.findIndex((n) => {
  var o;
  return ((o = n.question._id) == null ? void 0 : o.$oid) === e;
}), H = Jt("questionsQueue", {
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
      const e = pe();
      return Oe(e, this.selectedTags).length;
    },
    setselectedTags(e) {
      this.selectedTags = e;
    },
    getselectedtags() {
      return this.selectedTags;
    },
    modifySelectedTags(e, { category: t, topic: n }) {
      this.selectedTags[t] = e ? [...this.selectedTags[t], n] : this.selectedTags[t].filter(
        (o) => o !== n
      );
    },
    initialiseQuiz(e, t) {
      this.questionsQueue = e, this.questionsStack = [], this.quizMode = t, this.quizStats = e.map((n) => ({
        question: n,
        correct: 0,
        skipped: 0,
        attempts: 0,
        selectedValue: ""
      }));
    },
    incrementStat(e, t, n) {
      const o = an(e, this.quizStats);
      if (this.quizStats[o] && n !== void 0) {
        if (this.quizStats[o][t]++, n === "-1") {
          this.quizStats[o].selectedValue = "Reached Time Limit";
          return;
        }
        const s = this.quizStats[o].question.optionsList.map((a) => a.optionCorrect).indexOf(!0);
        Number(n) === Number(s) ? this.quizStats[o].correct = 1 : this.quizStats[o].correct = 0, this.quizStats[o].selectedValue = n !== void 0 ? this.quizStats[o].question.optionsList[Number(n)].optionValue : "";
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
}), cn = (e) => (De("data-v-e105f042"), e = e(), Ue(), e), un = { class: "report-container" }, ln = { class: "mcq-report" }, dn = { class: "table-container" }, fn = /* @__PURE__ */ cn(() => /* @__PURE__ */ p("thead", null, [
  /* @__PURE__ */ p("tr", null, [
    /* @__PURE__ */ p("th", null, "question"),
    /* @__PURE__ */ p("th", null, "correct option"),
    /* @__PURE__ */ p("th", null, "your answer")
  ])
], -1)), pn = { class: "question-row" }, hn = ["href", "innerHTML"], mn = { class: "answer-row" }, gn = ["innerHTML"], _n = { class: "answer-row" }, vn = ["innerHTML"], bn = { class: "mcq-result" }, yn = { class: "score" }, Sn = /* @__PURE__ */ x({
  __name: "MCQStatus",
  setup(e) {
    const t = H(), n = t.quizStats, o = t.quizStats.length, s = n.filter((i) => i.correct === 1).length, a = (s * 100 / o).toFixed(0);
    return (i, r) => (m(), v("div", un, [
      p("div", ln, [
        p("div", dn, [
          p("table", null, [
            fn,
            p("tbody", null, [
              (m(!0), v(M, null, W(Object.entries(N(n)), ([c, u]) => (m(), v("tr", {
                key: c,
                class: "quiz-statment"
              }, [
                p("td", pn, [
                  p("a", {
                    href: u.question.link,
                    target: "_blank",
                    innerHTML: u.question.statement
                  }, null, 8, hn)
                ]),
                p("td", mn, [
                  (m(!0), v(M, null, W(Object.entries(
                    u.question.optionsList
                  ), ([f, g]) => (m(), v("span", { key: f }, [
                    g.optionCorrect ? (m(), v("span", {
                      key: 0,
                      innerHTML: g.optionValue
                    }, null, 8, gn)) : q("", !0)
                  ]))), 128))
                ]),
                p("td", _n, [
                  p("span", {
                    class: ue(
                      u.correct === 1 ? "correct-answer" : "wrong-answer"
                    ),
                    innerHTML: u.correct === 1 ? "<span> ✔</span> " : "<span> ✘</span> <span>     </span>" + u.selectedValue
                  }, null, 10, vn)
                ])
              ]))), 128))
            ])
          ])
        ])
      ]),
      p("div", null, [
        p("div", bn, [
          p("span", yn, "⌛ Result: " + O(N(s)) + " out of " + O(N(o)) + " - (" + O(N(a)) + " %)", 1)
        ])
      ])
    ]));
  }
}), st = /* @__PURE__ */ Y(Sn, [["__scopeId", "data-v-e105f042"]]), En = /* @__PURE__ */ x({
  __name: "ButtonUi",
  props: {
    buttonFuc: {},
    buttonName: {}
  },
  emits: [
    "nextQuestion",
    "prevQuestion",
    "submit",
    "save",
    "timedNextQuestion",
    "skipQuestion"
  ],
  setup(e, { emit: t }) {
    const n = t, o = (s) => {
      [
        "nextQuestion",
        "prevQuestion",
        "submit",
        "save",
        "timedNextQuestion",
        "skipQuestion"
      ].includes(s) && n(
        s
      );
    };
    return (s, a) => (m(), v("div", null, [
      p("button", {
        class: "mcq-button",
        onClick: a[0] || (a[0] = (i) => o(s.buttonFuc.toString()))
      }, O(s.buttonName), 1)
    ]));
  }
}), wn = /* @__PURE__ */ Y(En, [["__scopeId", "data-v-cb91440f"]]), Tn = {
  key: 1,
  class: "next-prev-question"
}, kn = /* @__PURE__ */ x({
  __name: "MCQQuiz",
  setup(e) {
    const t = S(), n = S(null), o = S(!1), s = H(), a = S({
      buttonName: "Skip",
      buttonFunc: "skipQuestion"
    }), i = S("initial"), r = S(!1), c = S(s.getRemainingQuestions());
    we(() => {
      f();
    }), ce(o, (T) => {
      console.log("isSelected", o.value), i.value === "initial" && T && (i.value = "next");
    }), ce(i, (T) => {
      switch (console.log("Quiz state changed", T), T) {
        case "initial":
          a.value.buttonName = "Skip", a.value.buttonFunc = "skipQuestion";
          break;
        case "next":
          a.value.buttonName = "Next", a.value.buttonFunc = "nextQuestion";
          break;
        case "prev":
          a.value.buttonName = "Previous", a.value.buttonFunc = "prevQuestion";
          break;
        case "submit":
          a.value.buttonName = "Submit", a.value.buttonFunc = "submit";
          break;
      }
    });
    const u = () => {
      r.value = !0;
    }, f = () => {
      o.value = !1, i.value = "initial", console.log("next clicked", i.value), _(), c.value = s.getRemainingQuestions(), t.value = s.dequeueQuestion();
    }, g = () => {
      o.value = !1, _(), s.enqueueQuestion(t.value), console.log("Skip question", "isSelected", o.value), f();
    }, b = () => {
      var T, I;
      console.log(
        "questionID",
        (T = t.value) == null ? void 0 : T._id.$oid,
        "optionIdex",
        n.value
      ), s.incrementStat(
        //_id.$oid,
        ((I = t.value) == null ? void 0 : I._id.$oid) ?? "",
        "attempts",
        n.value ?? void 0
      );
    }, _ = () => {
      t.value && b();
    }, E = () => window.location.reload();
    return (T, I) => (m(), v(M, null, [
      t.value ? (m(), j(ot, {
        key: 0,
        "selected-option": n.value,
        "onUpdate:selectedOption": I[0] || (I[0] = (U) => n.value = U),
        "selected-question": o.value,
        "onUpdate:selectedQuestion": I[1] || (I[1] = (U) => o.value = U),
        statement: t.value.statement,
        "options-list": t.value.optionsList,
        onNextQuestion: f,
        onSkipQuestion: g
      }, null, 8, ["selected-option", "selected-question", "statement", "options-list"])) : q("", !0),
      t.value ? (m(), v("div", Tn, [
        N(s).quizMode === "Tutor" ? (m(), j(wn, {
          key: 0,
          "button-name": a.value.buttonName,
          "button-fuc": a.value.buttonFunc,
          onNextQuestion: I[2] || (I[2] = (U) => f()),
          onSubmitAnswer: u,
          onSkipQuestion: g
        }, null, 8, ["button-name", "button-fuc"])) : q("", !0)
      ])) : q("", !0),
      t.value ? q("", !0) : (m(), j(st, { key: 2 })),
      t.value ? q("", !0) : (m(), v("button", {
        key: 3,
        class: "btn-relocate",
        onClick: E
      }, " End "))
    ], 64));
  }
}), On = { key: 0 }, Me = 1e3, Nn = "-1", $n = /* @__PURE__ */ x({
  __name: "MCQTimedQuiz",
  setup(e) {
    const t = H(), n = S();
    let o = null, s = null;
    const a = S(t.timeLimit);
    we(() => {
      r();
    }), gt(() => {
      u(), f();
    });
    const i = () => {
      n.value = t.removeFromLastHistory() ?? n.value;
    }, r = () => n.value = t.dequeueQuestion(), c = () => window.location.reload(), u = () => {
      o && clearTimeout(o), s && clearInterval(s);
    }, f = () => {
      a.value = t.timeLimit;
      const _ = () => n.value ? a.value ? a.value-- : b() : u();
      s = window.setInterval(_, Me), o = window.setTimeout(() => {
      }, t.timeLimit * Me);
    }, g = (_) => {
      const E = Math.floor(_ / 60), T = _ % 60;
      return `${E}:${T < 10 ? "0" : ""}${T}`;
    }, b = () => {
      var E;
      u();
      const _ = (T) => t.incrementStat(T, "attempts", Nn);
      for (_(((E = n.value) == null ? void 0 : E._id.$oid) ?? ""); n.value = t.dequeueQuestion(); )
        _(n.value._id.$oid);
      return alert("Time's up! Quiz has ended."), r();
    };
    return (_, E) => (m(), v(M, null, [
      a.value ? (m(), v("h3", On, "Time left: " + O(g(a.value)), 1)) : q("", !0),
      p("h3", null, " Question " + O(N(t).questionsStack.length) + " out of " + O(N(t).questionsQueue.length + N(t).questionsStack.length), 1),
      n.value ? (m(), j(ot, {
        key: 1,
        statement: n.value.statement,
        "options-list": n.value.optionsList,
        _id: n.value._id,
        onNextQuestion: r,
        onPrevQuestion: i
      }, null, 8, ["statement", "options-list", "_id"])) : q("", !0),
      n.value ? q("", !0) : (m(), j(st, { key: 2 })),
      n.value ? q("", !0) : (m(), v("button", {
        key: 3,
        class: "btn-relocate",
        onClick: c
      }, " End "))
    ], 64));
  }
}), qn = ["id", "name", "value", "disabled"], In = ["for"], Qn = {
  key: 0,
  class: "question-number"
}, Pn = /* @__PURE__ */ x({
  __name: "FilterCheckbox",
  props: {
    category: {},
    topics: {}
  },
  setup(e) {
    const { category: t, topics: n } = e, o = H(), s = Ee(
      () => Object.entries(n).map(([r, c]) => {
        const u = i(c, t);
        return { idx: r, topic: c, num: u };
      }).filter(({ topic: r }) => r !== void 0)
    ), a = (r) => {
      if (!(r.target instanceof HTMLInputElement))
        return console.error("Trying to click on non-input element");
      const c = r.target.name, u = r.target.value;
      o.modifySelectedTags(r.target.checked, { category: c, topic: u });
    }, i = (r, c) => {
      var b;
      if ((b = o.getselectedtags()[c]) != null && b.includes(
        r
      ))
        return null;
      const f = JSON.parse(
        JSON.stringify(o.getselectedtags())
      );
      f[c].includes(r) || f[c].push(r);
      const g = pe();
      return Oe(
        g,
        f
      ).length.toString();
    };
    return (r, c) => (m(), v("ul", null, [
      (m(!0), v(M, null, W(s.value, ({ idx: u, num: f, topic: g }) => (m(), v("li", {
        key: u,
        class: ue(["filter-options", { "grey-out": f === "0" }])
      }, [
        p("input", {
          id: `${r.category}-${g}-checkbox`,
          type: "checkbox",
          name: r.category,
          value: g,
          disabled: f === "0",
          onChange: c[0] || (c[0] = (b) => a(b))
        }, null, 40, qn),
        p("label", {
          for: `${r.category}-${g}-checkbox`
        }, [
          _t(O(g) + " ", 1),
          f !== null && f !== "0" ? (m(), v("span", Qn, O(f), 1)) : q("", !0)
        ], 8, In)
      ], 2))), 128))
    ]));
  }
}), Cn = /* @__PURE__ */ Y(Pn, [["__scopeId", "data-v-2ed0a288"]]), Vn = { class: "filter" }, xn = /* @__PURE__ */ x({
  __name: "MCQTagOptions",
  setup(e) {
    const n = pe().flatMap((s) => s.tags), o = rn(n);
    return (s, a) => (m(), v("div", Vn, [
      (m(!0), v(M, null, W(Object.entries(N(o)), ([i, r]) => (m(), v("div", {
        key: i,
        class: "category"
      }, [
        p("h2", null, O(i), 1),
        ze(Cn, {
          category: i,
          topics: r
        }, null, 8, ["category", "topics"])
      ]))), 128))
    ]));
  }
}), Ln = { class: "dropdown" }, jn = { for: "optionName" }, Mn = /* @__PURE__ */ p("option", { value: "" }, "--Please choose an option--", -1), An = ["value"], Dn = /* @__PURE__ */ x({
  __name: "DropDownbox",
  props: {
    options: {},
    optionName: {}
  },
  setup(e) {
    const t = H(), n = S(0);
    function o(s) {
      const a = s.target;
      a.value && (n.value = parseFloat(a.value) * 60, t.setTimeLimit(n.value));
    }
    return (s, a) => (m(), v("div", Ln, [
      p("label", jn, O(s.optionName) + ":   ", 1),
      p("select", {
        id: "optionName",
        name: "optionName",
        onChange: o
      }, [
        Mn,
        (m(!0), v(M, null, W(s.options, (i) => (m(), v("option", {
          key: i.value,
          value: i.value
        }, O(i.value) + " " + O(i.unit), 9, An))), 128))
      ], 32)
    ]));
  }
}), he = (e) => (De("data-v-89d59f09"), e = e(), Ue(), e), Un = { class: "start-page-container" }, zn = { class: "quiz-config-container" }, Rn = { class: "question-config-container" }, Fn = { class: "tag-text" }, Hn = { class: "question-amount-container" }, Bn = /* @__PURE__ */ he(() => /* @__PURE__ */ p("label", { for: "question-amount" }, "Select the amount of questions:", -1)), Gn = ["max"], Jn = {
  key: 0,
  class: "show-max-msg"
}, Wn = /* @__PURE__ */ he(() => /* @__PURE__ */ p("label", { for: "mode-select" }, "Select mode:", -1)), Yn = /* @__PURE__ */ he(() => /* @__PURE__ */ p("option", { value: "Tutor" }, "Tutor mode", -1)), Xn = /* @__PURE__ */ he(() => /* @__PURE__ */ p("option", { value: "Timed" }, "Timed mode", -1)), Zn = [
  Yn,
  Xn
], Kn = 3e3, eo = /* @__PURE__ */ x({
  __name: "StartPage",
  props: {
    link: {}
  },
  emits: ["start-quiz"],
  setup(e, { emit: t }) {
    const n = e, o = S(1), s = S("Tutor"), a = S(null), i = S(!1), r = S(null), c = t, u = H();
    we(() => {
      console.log("APIaddress", n), console.log("questionAPI", a);
    });
    const f = () => {
      c("start-quiz", {
        questionAmount: o.value,
        mode: s.value
      });
    }, g = () => {
      r.value && clearTimeout(r.value), o.value > u.getquestionnumber() && (o.value = u.getquestionnumber(), i.value = !0, r.value = window.setTimeout(() => {
        i.value = !1;
      }, Kn));
    };
    return (b, _) => (m(), v("div", Un, [
      p("h1", null, "VetCloud Smart Quiz From: " + O(n.link), 1),
      ze(xn),
      p("div", zn, [
        p("div", Rn, [
          p("p", Fn, " Maximum possible questions: " + O(N(u).getquestionnumber()), 1),
          p("div", Hn, [
            Bn,
            Pe(p("input", {
              id: "question-amount",
              "onUpdate:modelValue": _[0] || (_[0] = (E) => o.value = E),
              type: "number",
              placeholder: "Question amount",
              min: "1",
              max: N(u).getquestionnumber(),
              onInput: g
            }, null, 40, Gn), [
              [
                vt,
                o.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          i.value ? (m(), v("p", Jn, " Cannot select more than " + O(N(u).getquestionnumber()) + " questions. ", 1)) : q("", !0),
          p("div", null, [
            Wn,
            Pe(p("select", {
              id: "mode-select",
              "onUpdate:modelValue": _[1] || (_[1] = (E) => s.value = E)
            }, Zn, 512), [
              [bt, s.value]
            ])
          ]),
          s.value === "Timed" ? (m(), j(Dn, {
            key: 1,
            options: [
              { value: 1.5, label: "Time Option 1", unit: "Min." },
              { value: 1, label: "Time Option 2", unit: "Min." }
            ],
            "option-name": "Time per Question"
          }, null, 8, ["options"])) : q("", !0)
        ])
      ]),
      p("button", {
        class: "start-button",
        onClick: f
      }, "Start")
    ]));
  }
}), to = /* @__PURE__ */ Y(eo, [["__scopeId", "data-v-89d59f09"]]), no = /* @__PURE__ */ x({
  __name: "CrucibleComponent",
  setup(e) {
    const t = S(0), n = H(), o = S(!1), s = ({ questionAmount: a, mode: i }) => {
      const r = n.getselectedtags(), c = pe(), u = Oe(
        c,
        r
      ), f = sn(a, u);
      t.value = f.length, n.initialiseQuiz(f, i), i === "Timed" && n.setTimeLimit(a * n.timeLimit), o.value = !0;
    };
    return (a, i) => o.value && N(n).quizMode === "Tutor" ? (m(), j(kn, { key: 0 })) : o.value && N(n).quizMode === "Timed" ? (m(), j($n, { key: 1 })) : (m(), j(to, {
      key: 2,
      link: "placeholder",
      onStartQuiz: s
    }));
  }
}), oo = /* @__PURE__ */ Y(no, [["__scopeId", "data-v-0960ac91"]]);
function ro(e) {
  const t = Ft();
  e.use(t), e.component("CrucibleComponent", oo);
}
export {
  oo as CrucibleComponent,
  ro as createViewerPlugin
};
