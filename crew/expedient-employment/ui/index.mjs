import { jsx as t, jsxs as o } from "react/jsx-runtime";
import * as te from "react";
import { forwardRef as Nt, createElement as Qe, useState as b, useCallback as fe, useEffect as K, useRef as et, useMemo as Re } from "react";
import { useAppApi as da } from "@codexcrew/app-sdk";
import * as pa from "react-dom";
const ua = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), ha = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (a, r, s) => s ? s.toUpperCase() : r.toLowerCase()
), ct = (e) => {
  const a = ha(e);
  return a.charAt(0).toUpperCase() + a.slice(1);
}, _t = (...e) => e.filter((a, r, s) => !!a && a.trim() !== "" && s.indexOf(a) === r).join(" ").trim(), ma = (e) => {
  for (const a in e)
    if (a.startsWith("aria-") || a === "role" || a === "title")
      return !0;
};
var ga = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const ba = Nt(
  ({
    color: e = "currentColor",
    size: a = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: s,
    className: i = "",
    children: l,
    iconNode: n,
    ...c
  }, p) => Qe(
    "svg",
    {
      ref: p,
      ...ga,
      width: a,
      height: a,
      stroke: e,
      strokeWidth: s ? Number(r) * 24 / Number(a) : r,
      className: _t("lucide", i),
      ...!l && !ma(c) && { "aria-hidden": "true" },
      ...c
    },
    [
      ...n.map(([d, m]) => Qe(d, m)),
      ...Array.isArray(l) ? l : [l]
    ]
  )
);
const j = (e, a) => {
  const r = Nt(
    ({ className: s, ...i }, l) => Qe(ba, {
      ref: l,
      iconNode: a,
      className: _t(
        `lucide-${ua(ct(e))}`,
        `lucide-${e}`,
        s
      ),
      ...i
    })
  );
  return r.displayName = ct(e), r;
};
const va = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
], fa = j("arrow-left", va);
const wa = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
], xa = j("arrow-right", wa);
const ya = [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
], ka = j("arrow-up-down", ya);
const Na = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
], Ye = j("bot", Na);
const _a = [
  [
    "path",
    { d: "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1", key: "ezmyqa" }
  ],
  [
    "path",
    {
      d: "M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",
      key: "e1hn23"
    }
  ]
], Ca = j("braces", _a);
const za = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
], Sa = j("briefcase", za);
const Ra = [
  ["path", { d: "M16 14v2.2l1.6 1", key: "fo4ql5" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5", key: "1osxxc" }],
  ["path", { d: "M3 10h5", key: "r794hk" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }]
], Ct = j("calendar-clock", Ra);
const Pa = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], Ma = j("circle-check", Pa);
const Ea = [
  ["path", { d: "M18 20a6 6 0 0 0-12 0", key: "1qehca" }],
  ["circle", { cx: "12", cy: "10", r: "4", key: "1h16sb" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], Aa = j("circle-user-round", Ea);
const ja = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "m9 14 2 2 4-4", key: "df797q" }]
], Ta = j("clipboard-check", ja);
const $a = [
  ["path", { d: "M12 6v6h4", key: "135r8i" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], La = j("clock-3", $a);
const Oa = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
], zt = j("external-link", Oa);
const Ia = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["circle", { cx: "11.5", cy: "14.5", r: "2.5", key: "1bq0ko" }],
  ["path", { d: "M13.3 16.3 15 18", key: "2quom7" }]
], Ba = j("file-search", Ia);
const qa = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
], Da = j("file-text", qa);
const Fa = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
], Va = j("globe", Fa);
const Wa = [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
], Ua = j("image-plus", Wa);
const Ga = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
], Ha = j("image", Ga);
const Ja = [
  [
    "path",
    {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
], St = j("key-round", Ja);
const Qa = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
], Ya = j("layout-dashboard", Qa);
const Za = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], Ka = j("loader-circle", Za);
const Xa = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ],
  ["path", { d: "M7 11h10", key: "1twpyw" }],
  ["path", { d: "M7 15h6", key: "d9of3u" }],
  ["path", { d: "M7 7h8", key: "af5zfr" }]
], er = j("message-square-text", Xa);
const tr = [
  ["path", { d: "m9 10 3-3 3 3", key: "11gsxs" }],
  ["path", { d: "M12 13V7", key: "h0r20n" }],
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }]
], Rt = j("monitor-up", tr);
const ar = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
], rr = j("pencil", ar);
const or = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], tt = j("play", or);
const sr = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Pt = j("plus", sr);
const ir = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
], at = j("power", ir);
const nr = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], Le = j("refresh-cw", nr);
const lr = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
], Mt = j("rotate-ccw", lr);
const cr = [
  ["path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8", key: "1p45f6" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }]
], dr = j("rotate-cw", cr);
const pr = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
], ur = j("save", pr);
const hr = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], Et = j("search", hr);
const mr = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
], gr = j("send", mr);
const br = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], vr = j("settings", br);
const fr = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], rt = j("shield-check", fr);
const wr = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], xr = j("trash-2", wr);
const yr = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], kr = j("triangle-alert", yr);
const Nr = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
], _r = j("users", Nr);
const Cr = [
  [
    "path",
    {
      d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",
      key: "1ngwbx"
    }
  ]
], At = j("wrench", Cr);
const zr = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], jt = j("x", zr);
var Sr = Object.defineProperty, ot = (e, a) => Sr(e, "name", { value: a, configurable: !0 });
function Ze(e, a) {
  if (typeof e == "function")
    return e(a);
  e != null && (e.current = a);
}
ot(Ze, "setRef");
function Tt(...e) {
  return (a) => {
    let r = !1;
    const s = e.map((i) => {
      const l = Ze(i, a);
      return !r && typeof l == "function" && (r = !0), l;
    });
    if (r)
      return () => {
        for (let i = 0; i < s.length; i++) {
          const l = s[i];
          typeof l == "function" ? l() : Ze(e[i], null);
        }
      };
  };
}
ot(Tt, "composeRefs");
function $t(...e) {
  return te.useCallback(Tt(...e), e);
}
ot($t, "useComposedRefs");
var Rr = Object.defineProperty, se = (e, a) => Rr(e, "name", { value: a, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function st(e) {
  const a = te.forwardRef((r, s) => {
    let { children: i, ...l } = r, n = null, c = !1;
    const p = [];
    Ke(i) && typeof Ie == "function" && (i = Ie(i._payload)), te.Children.forEach(i, (h) => {
      if (qt(h)) {
        c = !0;
        const C = h;
        let x = "child" in C.props ? C.props.child : C.props.children;
        Ke(x) && typeof Ie == "function" && (x = Ie(x._payload)), n = Mr(C, x), p.push(n?.props?.children);
      } else
        p.push(h);
    }), n ? n = te.cloneElement(n, void 0, p) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !c && te.Children.count(i) === 1 && te.isValidElement(i) && (n = i)
    );
    const d = n ? Bt(n) : void 0, m = $t(s, d);
    if (!n) {
      if (i || i === 0)
        throw new Error(
          c ? jr(e) : Ar(e)
        );
      return i;
    }
    const f = It(l, n.props ?? {});
    return n.type !== te.Fragment && (f.ref = s ? m : d), te.cloneElement(n, f);
  });
  return a.displayName = `${e}.Slot`, a;
}
se(st, "createSlot");
var Lt = /* @__PURE__ */ st("Slot"), Ot = /* @__PURE__ */ Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Pr(e) {
  const a = /* @__PURE__ */ se((r) => "child" in r ? r.children(r.child) : r.children, "Slottable");
  return a.displayName = `${e}.Slottable`, a.__radixId = Ot, a;
}
se(Pr, "createSlottable");
var Mr = /* @__PURE__ */ se((e, a) => {
  if ("child" in e.props) {
    const r = e.props.child;
    return te.isValidElement(r) ? te.cloneElement(r, void 0, e.props.children(r.props.children)) : null;
  }
  return te.isValidElement(a) ? a : null;
}, "getSlottableElementFromSlottable");
function It(e, a) {
  const r = { ...a };
  for (const s in a) {
    const i = e[s], l = a[s];
    /^on[A-Z]/.test(s) ? i && l ? r[s] = (...c) => {
      const p = l(...c);
      return i(...c), p;
    } : i && (r[s] = i) : s === "style" ? r[s] = { ...i, ...l } : s === "className" && (r[s] = [i, l].filter(Boolean).join(" "));
  }
  return { ...e, ...r };
}
se(It, "mergeProps");
function Bt(e) {
  let a = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = a && "isReactWarning" in a && a.isReactWarning;
  return r ? e.ref : (a = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = a && "isReactWarning" in a && a.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
se(Bt, "getElementRef");
function qt(e) {
  return te.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Ot;
}
se(qt, "isSlottable");
var Er = /* @__PURE__ */ Symbol.for("react.lazy");
function Ke(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === Er && "_payload" in e && Dt(e._payload);
}
se(Ke, "isLazyComponent");
function Dt(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
se(Dt, "isPromiseLike");
var Ar = /* @__PURE__ */ se((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), jr = /* @__PURE__ */ se((e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), Ie = te[" use ".trim().toString()];
function Ft(e) {
  var a, r, s = "";
  if (typeof e == "string" || typeof e == "number") s += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var i = e.length;
    for (a = 0; a < i; a++) e[a] && (r = Ft(e[a])) && (s && (s += " "), s += r);
  } else for (r in e) e[r] && (s && (s += " "), s += r);
  return s;
}
function Vt() {
  for (var e, a, r = 0, s = "", i = arguments.length; r < i; r++) (e = arguments[r]) && (a = Ft(e)) && (s && (s += " "), s += a);
  return s;
}
const dt = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, pt = Vt, Wt = (e, a) => (r) => {
  var s;
  if (a?.variants == null) return pt(e, r?.class, r?.className);
  const { variants: i, defaultVariants: l } = a, n = Object.keys(i).map((d) => {
    const m = r?.[d], f = l?.[d];
    if (m === null) return null;
    const h = dt(m) || dt(f);
    return i[d][h];
  }), c = r && Object.entries(r).reduce((d, m) => {
    let [f, h] = m;
    return h === void 0 || (d[f] = h), d;
  }, {}), p = a == null || (s = a.compoundVariants) === null || s === void 0 ? void 0 : s.reduce((d, m) => {
    let { class: f, className: h, ...C } = m;
    return Object.entries(C).every((x) => {
      let [N, _] = x;
      return Array.isArray(_) ? _.includes({
        ...l,
        ...c
      }[N]) : {
        ...l,
        ...c
      }[N] === _;
    }) ? [
      ...d,
      f,
      h
    ] : d;
  }, []);
  return pt(e, n, p, r?.class, r?.className);
}, Tr = (e, a) => {
  const r = new Array(e.length + a.length);
  for (let s = 0; s < e.length; s++)
    r[s] = e[s];
  for (let s = 0; s < a.length; s++)
    r[e.length + s] = a[s];
  return r;
}, $r = (e, a) => ({
  classGroupId: e,
  validator: a
}), Ut = (e = /* @__PURE__ */ new Map(), a = null, r) => ({
  nextPart: e,
  validators: a,
  classGroupId: r
}), Ve = "-", ut = [], Lr = "arbitrary..", Or = (e) => {
  const a = Br(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: s
  } = e;
  return {
    getClassGroupId: (n) => {
      if (n.startsWith("[") && n.endsWith("]"))
        return Ir(n);
      const c = n.split(Ve), p = c[0] === "" && c.length > 1 ? 1 : 0;
      return Gt(c, p, a);
    },
    getConflictingClassGroupIds: (n, c) => {
      if (c) {
        const p = s[n], d = r[n];
        return p ? d ? Tr(d, p) : p : d || ut;
      }
      return r[n] || ut;
    }
  };
}, Gt = (e, a, r) => {
  if (e.length - a === 0)
    return r.classGroupId;
  const i = e[a], l = r.nextPart.get(i);
  if (l) {
    const d = Gt(e, a + 1, l);
    if (d) return d;
  }
  const n = r.validators;
  if (n === null)
    return;
  const c = a === 0 ? e.join(Ve) : e.slice(a).join(Ve), p = n.length;
  for (let d = 0; d < p; d++) {
    const m = n[d];
    if (m.validator(c))
      return m.classGroupId;
  }
}, Ir = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const a = e.slice(1, -1), r = a.indexOf(":"), s = a.slice(0, r);
  return s ? Lr + s : void 0;
})(), Br = (e) => {
  const {
    theme: a,
    classGroups: r
  } = e;
  return qr(r, a);
}, qr = (e, a) => {
  const r = Ut();
  for (const s in e) {
    const i = e[s];
    it(i, r, s, a);
  }
  return r;
}, it = (e, a, r, s) => {
  const i = e.length;
  for (let l = 0; l < i; l++) {
    const n = e[l];
    Dr(n, a, r, s);
  }
}, Dr = (e, a, r, s) => {
  if (typeof e == "string") {
    Fr(e, a, r);
    return;
  }
  if (typeof e == "function") {
    Vr(e, a, r, s);
    return;
  }
  Wr(e, a, r, s);
}, Fr = (e, a, r) => {
  const s = e === "" ? a : Ht(a, e);
  s.classGroupId = r;
}, Vr = (e, a, r, s) => {
  if (Ur(e)) {
    it(e(s), a, r, s);
    return;
  }
  a.validators === null && (a.validators = []), a.validators.push($r(r, e));
}, Wr = (e, a, r, s) => {
  const i = Object.entries(e), l = i.length;
  for (let n = 0; n < l; n++) {
    const [c, p] = i[n];
    it(p, Ht(a, c), r, s);
  }
}, Ht = (e, a) => {
  let r = e;
  const s = a.split(Ve), i = s.length;
  for (let l = 0; l < i; l++) {
    const n = s[l];
    let c = r.nextPart.get(n);
    c || (c = Ut(), r.nextPart.set(n, c)), r = c;
  }
  return r;
}, Ur = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, Gr = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let a = 0, r = /* @__PURE__ */ Object.create(null), s = /* @__PURE__ */ Object.create(null);
  const i = (l, n) => {
    r[l] = n, a++, a > e && (a = 0, s = r, r = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(l) {
      let n = r[l];
      if (n !== void 0)
        return n;
      if ((n = s[l]) !== void 0)
        return i(l, n), n;
    },
    set(l, n) {
      l in r ? r[l] = n : i(l, n);
    }
  };
}, Xe = "!", ht = ":", Hr = [], mt = (e, a, r, s, i) => ({
  modifiers: e,
  hasImportantModifier: a,
  baseClassName: r,
  maybePostfixModifierPosition: s,
  isExternal: i
}), Jr = (e) => {
  const {
    prefix: a,
    experimentalParseClassName: r
  } = e;
  let s = (i) => {
    const l = [];
    let n = 0, c = 0, p = 0, d;
    const m = i.length;
    for (let N = 0; N < m; N++) {
      const _ = i[N];
      if (n === 0 && c === 0) {
        if (_ === ht) {
          l.push(i.slice(p, N)), p = N + 1;
          continue;
        }
        if (_ === "/") {
          d = N;
          continue;
        }
      }
      _ === "[" ? n++ : _ === "]" ? n-- : _ === "(" ? c++ : _ === ")" && c--;
    }
    const f = l.length === 0 ? i : i.slice(p);
    let h = f, C = !1;
    f.endsWith(Xe) ? (h = f.slice(0, -1), C = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      f.startsWith(Xe) && (h = f.slice(1), C = !0)
    );
    const x = d && d > p ? d - p : void 0;
    return mt(l, C, h, x);
  };
  if (a) {
    const i = a + ht, l = s;
    s = (n) => n.startsWith(i) ? l(n.slice(i.length)) : mt(Hr, !1, n, void 0, !0);
  }
  if (r) {
    const i = s;
    s = (l) => r({
      className: l,
      parseClassName: i
    });
  }
  return s;
}, Qr = (e) => {
  const a = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((r, s) => {
    a.set(r, 1e6 + s);
  }), (r) => {
    const s = [];
    let i = [];
    for (let l = 0; l < r.length; l++) {
      const n = r[l], c = n[0] === "[", p = a.has(n);
      c || p ? (i.length > 0 && (i.sort(), s.push(...i), i = []), s.push(n)) : i.push(n);
    }
    return i.length > 0 && (i.sort(), s.push(...i)), s;
  };
}, Yr = (e) => ({
  cache: Gr(e.cacheSize),
  parseClassName: Jr(e),
  sortModifiers: Qr(e),
  postfixLookupClassGroupIds: Zr(e),
  ...Or(e)
}), Zr = (e) => {
  const a = /* @__PURE__ */ Object.create(null), r = e.postfixLookupClassGroups;
  if (r)
    for (let s = 0; s < r.length; s++)
      a[r[s]] = !0;
  return a;
}, Kr = /\s+/, Xr = (e, a) => {
  const {
    parseClassName: r,
    getClassGroupId: s,
    getConflictingClassGroupIds: i,
    sortModifiers: l,
    postfixLookupClassGroupIds: n
  } = a, c = [], p = e.trim().split(Kr);
  let d = "";
  for (let m = p.length - 1; m >= 0; m -= 1) {
    const f = p[m], {
      isExternal: h,
      modifiers: C,
      hasImportantModifier: x,
      baseClassName: N,
      maybePostfixModifierPosition: _
    } = r(f);
    if (h) {
      d = f + (d.length > 0 ? " " + d : d);
      continue;
    }
    let $ = !!_, M;
    if ($) {
      const R = N.substring(0, _);
      M = s(R);
      const v = M && n[M] ? s(N) : void 0;
      v && v !== M && (M = v, $ = !1);
    } else
      M = s(N);
    if (!M) {
      if (!$) {
        d = f + (d.length > 0 ? " " + d : d);
        continue;
      }
      if (M = s(N), !M) {
        d = f + (d.length > 0 ? " " + d : d);
        continue;
      }
      $ = !1;
    }
    const D = C.length === 0 ? "" : C.length === 1 ? C[0] : l(C).join(":"), q = x ? D + Xe : D, z = q + M;
    if (c.indexOf(z) > -1)
      continue;
    c.push(z);
    const u = i(M, $);
    for (let R = 0; R < u.length; ++R) {
      const v = u[R];
      c.push(q + v);
    }
    d = f + (d.length > 0 ? " " + d : d);
  }
  return d;
}, eo = (...e) => {
  let a = 0, r, s, i = "";
  for (; a < e.length; )
    (r = e[a++]) && (s = Jt(r)) && (i && (i += " "), i += s);
  return i;
}, Jt = (e) => {
  if (typeof e == "string")
    return e;
  let a, r = "";
  for (let s = 0; s < e.length; s++)
    e[s] && (a = Jt(e[s])) && (r && (r += " "), r += a);
  return r;
}, to = (e, ...a) => {
  let r, s, i, l;
  const n = (p) => {
    const d = a.reduce((m, f) => f(m), e());
    return r = Yr(d), s = r.cache.get, i = r.cache.set, l = c, c(p);
  }, c = (p) => {
    const d = s(p);
    if (d)
      return d;
    const m = Xr(p, r);
    return i(p, m), m;
  };
  return l = n, (...p) => l(eo(...p));
}, ao = [], U = (e) => {
  const a = (r) => r[e] || ao;
  return a.isThemeGetter = !0, a;
}, Qt = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Yt = /^\((?:(\w[\w-]*):)?(.+)\)$/i, ro = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, oo = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, so = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, io = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, no = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, lo = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ve = (e) => ro.test(e), A = (e) => !!e && !Number.isNaN(Number(e)), ne = (e) => !!e && Number.isInteger(Number(e)), Ge = (e) => e.endsWith("%") && A(e.slice(0, -1)), ue = (e) => oo.test(e), Zt = () => !0, co = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  so.test(e) && !io.test(e)
), nt = () => !1, po = (e) => no.test(e), uo = (e) => lo.test(e), ho = (e) => !y(e) && !k(e), mo = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), go = (e) => we(e, ea, nt), y = (e) => Qt.test(e), xe = (e) => we(e, ta, co), gt = (e) => we(e, No, A), bo = (e) => we(e, ra, Zt), vo = (e) => we(e, aa, nt), bt = (e) => we(e, Kt, nt), fo = (e) => we(e, Xt, uo), Be = (e) => we(e, oa, po), k = (e) => Yt.test(e), Ae = (e) => ye(e, ta), wo = (e) => ye(e, aa), vt = (e) => ye(e, Kt), xo = (e) => ye(e, ea), yo = (e) => ye(e, Xt), qe = (e) => ye(e, oa, !0), ko = (e) => ye(e, ra, !0), we = (e, a, r) => {
  const s = Qt.exec(e);
  return s ? s[1] ? a(s[1]) : r(s[2]) : !1;
}, ye = (e, a, r = !1) => {
  const s = Yt.exec(e);
  return s ? s[1] ? a(s[1]) : r : !1;
}, Kt = (e) => e === "position" || e === "percentage", Xt = (e) => e === "image" || e === "url", ea = (e) => e === "length" || e === "size" || e === "bg-size", ta = (e) => e === "length", No = (e) => e === "number", aa = (e) => e === "family-name", ra = (e) => e === "number" || e === "weight", oa = (e) => e === "shadow", _o = () => {
  const e = U("color"), a = U("font"), r = U("text"), s = U("font-weight"), i = U("tracking"), l = U("leading"), n = U("breakpoint"), c = U("container"), p = U("spacing"), d = U("radius"), m = U("shadow"), f = U("inset-shadow"), h = U("text-shadow"), C = U("drop-shadow"), x = U("blur"), N = U("perspective"), _ = U("aspect"), $ = U("ease"), M = U("animate"), D = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], q = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], z = () => [...q(), k, y], u = () => ["auto", "hidden", "clip", "visible", "scroll"], R = () => ["auto", "contain", "none"], v = () => [k, y, p], L = () => [ve, "full", "auto", ...v()], X = () => [ne, "none", "subgrid", k, y], re = () => ["auto", {
    span: ["full", ne, k, y]
  }, ne, k, y], E = () => [ne, "auto", k, y], de = () => ["auto", "min", "max", "fr", k, y], ge = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], I = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], ee = () => ["auto", ...v()], ie = () => [ve, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...v()], pe = () => [ve, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...v()], ae = () => [ve, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...v()], P = () => [e, k, y], oe = () => [...q(), vt, bt, {
    position: [k, y]
  }], Pe = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], be = () => ["auto", "cover", "contain", xo, go, {
    size: [k, y]
  }], ke = () => [Ge, Ae, xe], G = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    d,
    k,
    y
  ], H = () => ["", A, Ae, xe], Ne = () => ["solid", "dashed", "dotted", "double"], Me = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], F = () => [A, Ge, vt, bt], Oe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    x,
    k,
    y
  ], _e = () => ["none", A, k, y], Ce = () => ["none", A, k, y], Ee = () => [A, k, y], ze = () => [ve, "full", ...v()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [ue],
      breakpoint: [ue],
      color: [Zt],
      container: [ue],
      "drop-shadow": [ue],
      ease: ["in", "out", "in-out"],
      font: [ho],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [ue],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [ue],
      shadow: [ue],
      spacing: ["px", A],
      text: [ue],
      "text-shadow": [ue],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", ve, y, k, _]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Container Type
       * @see https://tailwindcss.com/docs/responsive-design#container-queries
       */
      "container-type": [{
        "@container": ["", "normal", "size", k, y]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [mo],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [A, y, k, c]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": D()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": D()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: z()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: u()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": u()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": u()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: R()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": R()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": R()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: L()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": L()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": L()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": L(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: L()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": L(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: L()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": L()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": L()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: L()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: L()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: L()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: L()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [ne, "auto", k, y]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [ve, "full", "auto", c, ...v()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [A, ve, "auto", "initial", "none", y]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", A, k, y]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", A, k, y]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [ne, "first", "last", "none", k, y]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": X()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: re()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": E()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": E()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": X()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: re()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": E()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": E()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": de()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": de()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: v()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": v()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": v()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...ge(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...I(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...I()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...ge()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...I(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...I(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": ge()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...I(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...I()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: v()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: v()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: v()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: v()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: v()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: v()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: v()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: v()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: v()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: v()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: v()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: ee()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: ee()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: ee()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: ee()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: ee()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: ee()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: ee()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: ee()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: ee()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: ee()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: ee()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": v()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": v()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: ie()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...pe()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...pe()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...pe()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...ae()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...ae()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...ae()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [c, "screen", ...ie()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          c,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...ie()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          c,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [n]
          },
          ...ie()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...ie()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...ie()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...ie()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, Ae, xe]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [s, ko, bo]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Ge, y]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [wo, vo, a]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [y]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [i, k, y]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [A, "none", k, gt]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          l,
          ...v()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", k, y]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", k, y]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: P()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: P()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...Ne(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [A, "from-font", "auto", k, xe]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: P()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [A, "auto", k, y]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: v()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [ne, k, y]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", k, y]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", k, y]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: oe()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: Pe()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: be()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, ne, k, y],
          radial: ["", k, y],
          conic: [ne, k, y]
        }, yo, fo]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: P()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: ke()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: ke()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: ke()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: P()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: P()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: P()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: G()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": G()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": G()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": G()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": G()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": G()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": G()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": G()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": G()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": G()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": G()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": G()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": G()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": G()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": G()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: H()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": H()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": H()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": H()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": H()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": H()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": H()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": H()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": H()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": H()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": H()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": H()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": H()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...Ne(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...Ne(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: P()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": P()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": P()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": P()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": P()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": P()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": P()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": P()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": P()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": P()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": P()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: P()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...Ne(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [A, k, y]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", A, Ae, xe]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: P()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          m,
          qe,
          Be
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: P()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", f, qe, Be]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": P()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: H()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: P()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [A, xe]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": P()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": H()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": P()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", h, qe, Be]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": P()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [A, k, y]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Me(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Me()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [A]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": F()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": F()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": P()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": P()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": F()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": F()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": P()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": P()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": F()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": F()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": P()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": P()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": F()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": F()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": P()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": P()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": F()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": F()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": P()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": P()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": F()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": F()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": P()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": P()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": F()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": F()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": P()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": P()
      }],
      "mask-image-radial": [{
        "mask-radial": [k, y]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": F()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": F()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": P()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": P()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": q()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [A]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": F()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": F()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": P()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": P()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: oe()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: Pe()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: be()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", k, y]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          k,
          y
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: Oe()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [A, k, y]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [A, k, y]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          C,
          qe,
          Be
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": P()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", A, k, y]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [A, k, y]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", A, k, y]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [A, k, y]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", A, k, y]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          k,
          y
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": Oe()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [A, k, y]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [A, k, y]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", A, k, y]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [A, k, y]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", A, k, y]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [A, k, y]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [A, k, y]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", A, k, y]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": v()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": v()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": v()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", k, y]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [A, "initial", k, y]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", $, k, y]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [A, k, y]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", M, k, y]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [N, k, y]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": z()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: _e()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": _e()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": _e()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": _e()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: Ce()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": Ce()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": Ce()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": Ce()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: Ee()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Ee()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Ee()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [k, y, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: z()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: ze()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": ze()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": ze()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": ze()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      /**
       * Zoom
       * @see https://tailwindcss.com/docs/zoom
       */
      zoom: [{
        zoom: [ne, k, y]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: P()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: P()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", k, y]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scrollbar Thumb Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-thumb-color": [{
        "scrollbar-thumb": P()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": P()
      }],
      /**
       * Scrollbar Gutter
       * @see https://tailwindcss.com/docs/scrollbar-gutter
       */
      "scrollbar-gutter": [{
        "scrollbar-gutter": ["auto", "stable", "both"]
      }],
      /**
       * Scrollbar Width
       * @see https://tailwindcss.com/docs/scrollbar-width
       */
      "scrollbar-w": [{
        scrollbar: ["auto", "thin", "none"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": v()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": v()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": v()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": v()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": v()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": v()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": v()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": v()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": v()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": v()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": v()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": v()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": v()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": v()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": v()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": v()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": v()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": v()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": v()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": v()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": v()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": v()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", k, y]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...P()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [A, Ae, xe, gt]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...P()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      "container-named": ["container-type"],
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    postfixLookupClassGroups: ["container-type"],
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, Co = /* @__PURE__ */ to(_o);
function me(...e) {
  return Co(Vt(e));
}
const zo = Wt(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function O({
  className: e,
  variant: a = "default",
  size: r = "default",
  asChild: s = !1,
  ...i
}) {
  return /* @__PURE__ */ t(
    s ? Lt : "button",
    {
      "data-slot": "button",
      "data-variant": a,
      "data-size": r,
      className: me(zo({ variant: a, size: r, className: e })),
      ...i
    }
  );
}
function Y({ className: e, ...a }) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "card",
      className: me(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        e
      ),
      ...a
    }
  );
}
function le({ className: e, ...a }) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "card-header",
      className: me(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        e
      ),
      ...a
    }
  );
}
function ce({ className: e, ...a }) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "card-title",
      className: me("leading-none font-semibold", e),
      ...a
    }
  );
}
function Z({ className: e, ...a }) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "card-content",
      className: me("px-6", e),
      ...a
    }
  );
}
const So = Wt(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function $e({
  className: e,
  variant: a,
  asChild: r = !1,
  ...s
}) {
  return /* @__PURE__ */ t(
    r ? Lt : "span",
    {
      "data-slot": "badge",
      className: me(So({ variant: a }), e),
      ...s
    }
  );
}
let sa;
const g = { get api() {
  return sa || (typeof window < "u" ? window.api : void 0);
} };
let J = typeof window < "u" && !!window.api, Q = !1;
function ft(e) {
  sa = e, Q = !!e, J = !!e || typeof window < "u" && !!window.api;
}
const Ro = {
  code: 0,
  output: [
    "Expedient Employment doctor",
    "python ............ ok (3.12)",
    "webclaw ........... ok (demo)",
    "serper ............ ok (key present)",
    "reports dir ....... ok",
    "",
    "(browser preview — demo data; run inside Electron for live checks)"
  ].join(`
`)
}, Po = {
  awb: { up: !1, app: null, isBridge: !1, raw: "desktop-only" },
  paperclip: { up: !1, raw: "desktop-only" },
  resumeMatcher: { up: !1, raw: "desktop-only" }
}, Mo = {
  name: "FreeChain",
  ready: !1,
  reachable: !1,
  authenticated: !1,
  model_count: 0,
  credential_configured: !1,
  detail: "Desktop control service is not connected."
}, He = {
  configured: !1,
  saved: !1,
  source: "unavailable"
}, Eo = [
  {
    score: "92",
    fit_label: "Strong Fit",
    title: "Senior Recruiting Coordinator",
    company: "ExampleCo Talent",
    location: "San Francisco, CA",
    work_mode: "Hybrid",
    salary: "$85k-$105k",
    matched_skills: "scheduling; ATS; sourcing",
    gaps: "greenhouse",
    url: "https://example.com/job/1"
  },
  {
    score: "81",
    fit_label: "Good Fit",
    title: "Talent Acquisition Specialist",
    company: "BlueWave HR",
    location: "Irvine, CA",
    work_mode: "Remote",
    salary: "$75k-$95k",
    matched_skills: "sourcing; interviewing",
    gaps: "workday",
    url: "https://example.com/job/2"
  },
  {
    score: "64",
    fit_label: "Stretch",
    title: "HR Operations Analyst",
    company: "Coastline Group",
    location: "Costa Mesa, CA",
    work_mode: "Onsite",
    salary: "$70k-$88k",
    matched_skills: "reporting",
    gaps: "people analytics; sql",
    url: "https://example.com/job/3"
  }
], S = {
  doctor: () => g.api ? g.api.doctor() : Promise.resolve(Ro),
  services: () => g.api ? g.api.services() : Promise.resolve(Po),
  servicesStart: (e) => g.api ? g.api.servicesStart(e) : Promise.resolve(
    e === "paperclip" || e === "all" ? { paperclip: { up: !1, error: "desktop-only feature" } } : { resumeMatcher: { up: !1, dockerMissing: !0, error: "desktop-only feature" } }
  ),
  searchCancel: () => g.api?.searchCancel() || Promise.reject(new Error("No active Crew search")),
  browserRequest: (e, a, r) => g.api?.browserRequest(e, a, r) || Promise.reject(new Error("Use the LLM Browser Crew app")),
  searchSpawn: (e) => g.api ? g.api.searchSpawn(e) : Promise.resolve({ code: 0, output: "demo run (browser preview)" }),
  onSearchLog: (e) => g.api ? g.api.onSearchLog(e) : (() => () => {
  }),
  jobsRead: () => g.api ? g.api.jobsRead() : Promise.resolve({ exists: !0, rows: Eo }),
  reportOpen: () => g.api ? g.api.reportOpen() : Promise.resolve({ ok: !1, error: "desktop-only feature" }),
  applicationsRead: () => g.api ? g.api.applicationsRead() : Promise.resolve({ exists: !0, summary: {}, applications: [] }),
  applicationsRefresh: () => g.api ? g.api.applicationsRefresh() : Promise.resolve({ code: 0, output: "browser preview refreshed" }),
  applicationsFlag: (e, a) => g.api ? g.api.applicationsFlag(e, a) : Promise.resolve({ code: 0, output: "browser preview updated" }),
  applicationsUndo: (e) => g.api ? g.api.applicationsUndo(e) : Promise.resolve({ code: 0, output: "browser preview restored" }),
  applicationsReportOpen: () => g.api ? g.api.applicationsReportOpen() : Promise.resolve({ ok: !1, error: "desktop-only feature" }),
  agentsList: () => g.api ? g.api.agentsList() : Promise.resolve({
    online: !1,
    agents: [],
    message: "Paperclip offline — start it with scripts/paperclip-start-local.ps1"
  }),
  configRead: (e) => g.api ? g.api.configRead(e) : Promise.resolve({ exists: !1, text: "", error: `desktop-only: cannot read ${e}` }),
  configWrite: (e, a) => g.api ? g.api.configWrite(e, a) : Promise.resolve({ ok: !1, error: `desktop-only: cannot write ${e}` }),
  sessionsRead: () => g.api ? g.api.sessionsRead() : Promise.resolve({ exists: !1, data: {} }),
  awbLaunch: () => g.api ? g.api.awbLaunch() : Promise.resolve({ launched: !1, bridgeUp: !1, error: "desktop-only feature" }),
  loginUrl: (e) => g.api ? g.api.loginUrl(e) : Promise.resolve({ ok: !1, error: `desktop-only: no login url for ${e}` }),
  controlStatus: () => g.api ? g.api.controlStatus() : Promise.resolve({ ready: !1, port: null, error: "desktop-only feature" }),
  providerCredentialStatus: () => g.api ? g.api.providerCredentialStatus() : Promise.resolve(He),
  providerCredentialReimport: () => g.api ? g.api.providerCredentialReimport() : Promise.resolve(He),
  providerCredentialClear: () => g.api ? g.api.providerCredentialClear() : Promise.resolve(He),
  assistantProviders: () => g.api ? g.api.assistantProviders() : Promise.resolve([Mo]),
  assistantModels: (e) => g.api ? g.api.assistantModels(e) : Promise.resolve([]),
  assistantConversations: () => g.api ? g.api.assistantConversations() : Promise.resolve([]),
  assistantCreate: (e) => g.api ? g.api.assistantCreate(e) : Promise.resolve({
    id: "demo-conversation",
    title: e.title || "New conversation",
    provider: e.provider,
    model: e.model,
    allow_image_upload: !!e.allow_image_upload,
    created_at: (/* @__PURE__ */ new Date()).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }),
  assistantMessages: (e) => g.api ? g.api.assistantMessages(e) : Promise.resolve([]),
  assistantQueue: (e) => g.api ? g.api.assistantQueue(e) : Promise.resolve([]),
  assistantEvents: (e) => g.api ? g.api.assistantEvents(e) : Promise.resolve([]),
  assistantAttach: (e, a) => g.api ? g.api.assistantAttach(e, a) : Promise.resolve({
    id: `demo-attachment-${Date.now()}`,
    conversation_id: e,
    filename: a.filename,
    mime_type: a.mime_type,
    byte_count: a.data_base64.length,
    digest: "browser-preview",
    created_at: (/* @__PURE__ */ new Date()).toISOString()
  }),
  assistantSend: (e, a) => g.api ? g.api.assistantSend(e, a) : Promise.resolve({
    id: `demo-message-${Date.now()}`,
    conversation_id: e,
    role: "user",
    content: a.content,
    status: "queued",
    sequence: 1,
    retry_of: "",
    created_at: (/* @__PURE__ */ new Date()).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }),
  assistantRun: (e) => g.api ? g.api.assistantRun(e) : Promise.resolve(null),
  assistantEdit: (e, a) => g.api ? g.api.assistantEdit(e, a) : Promise.reject(new Error("Editing queued messages requires the desktop app.")),
  assistantCancel: (e) => g.api ? g.api.assistantCancel(e) : Promise.reject(new Error("Cancelling messages requires the desktop app.")),
  assistantRetry: (e) => g.api ? g.api.assistantRetry(e) : Promise.reject(new Error("Retrying messages requires the desktop app.")),
  assistantClear: (e) => g.api ? g.api.assistantClear(e) : Promise.resolve({ cleared: !0 }),
  toolsList: () => g.api ? g.api.toolsList() : Promise.resolve([]),
  workflowsDryRun: (e) => g.api ? g.api.workflowsDryRun(e) : Promise.resolve({ status: "dry_run", input: e }),
  workflowsRun: (e) => g.api ? g.api.workflowsRun(e) : Promise.resolve({ status: "succeeded", input: e }),
  schedulesList: () => g.api ? g.api.schedulesList() : Promise.resolve([]),
  schedulesCreate: (e) => g.api ? g.api.schedulesCreate(e) : Promise.reject(new Error("Schedules require the desktop app.")),
  schedulesToggle: (e, a) => g.api ? g.api.schedulesToggle(e, a) : Promise.reject(new Error("Schedules require the desktop app.")),
  schedulesRunDue: () => g.api ? g.api.schedulesRunDue() : Promise.resolve([]),
  schedulesHistory: (e) => g.api ? g.api.schedulesHistory(e) : Promise.resolve([]),
  schedulesInstallWake: () => g.api ? g.api.schedulesInstallWake() : Promise.resolve({ code: -1, output: "Background wake requires the desktop app." })
};
function Ao({ up: e }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: `inline-block h-2.5 w-2.5 rounded-full ${e ? "bg-emerald-400" : "bg-rose-500"}`
    }
  );
}
function wt(e, a) {
  const r = e.split(`
`).find((s) => s.toLowerCase().includes(a.toLowerCase()));
  return r ? { found: !0, ok: !/fail|missing|error|not found|not configured|not installed|not running|unavailable|no .*key/i.test(r) } : { found: !1, ok: !1 };
}
function jo() {
  const [e, a] = b(null), [r, s] = b(!1), [i, l] = b(null), [n, c] = b(null), [p, d] = b(null), m = fe(async () => {
    s(!0);
    try {
      a(await S.doctor());
    } finally {
      s(!1);
    }
  }, []), f = fe(async () => {
    l(await S.services());
  }, []), h = fe(
    async (_) => {
      d(_);
      try {
        await S.servicesStart(_), await f();
      } finally {
        d(null);
      }
    },
    [f]
  );
  K(() => {
    const _ = window.setTimeout(() => {
      m(), f(), S.sessionsRead().then(c);
    }, 0);
    return () => window.clearTimeout(_);
  }, [m, f]);
  const C = e ? wt(e.output, "webclaw") : null, x = e ? wt(e.output, "serper") : null, N = n?.data ? Object.keys(n.data) : [];
  return /* @__PURE__ */ o("div", { className: "space-y-6", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("h1", { className: "text-2xl font-bold text-slate-100", children: "Expedient Employment" }),
        /* @__PURE__ */ o("p", { className: "text-sm text-slate-400", children: [
          "Job-hunting pipeline control center",
          !J && " · browser preview (demo data)"
        ] })
      ] }),
      /* @__PURE__ */ o(
        O,
        {
          variant: "outline",
          className: "border-slate-600 bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-white",
          onClick: m,
          disabled: r,
          children: [
            /* @__PURE__ */ t(Le, { className: `mr-2 h-4 w-4 ${r ? "animate-spin" : ""}` }),
            "Re-run doctor"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ o(Y, { className: "border-slate-800 bg-slate-900/60", children: [
      /* @__PURE__ */ t(le, { children: /* @__PURE__ */ t(ce, { className: "text-slate-200", children: "Pipeline doctor" }) }),
      /* @__PURE__ */ o(Z, { children: [
        /* @__PURE__ */ t("pre", { className: "max-h-72 overflow-auto whitespace-pre-wrap rounded-md bg-slate-950 p-4 text-xs text-slate-300", children: e ? e.output || "(no output)" : "Running doctor…" }),
        e && /* @__PURE__ */ o("p", { className: "mt-2 text-xs text-slate-500", children: [
          "exit code: ",
          e.code ?? "n/a"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3", children: [
      /* @__PURE__ */ t(
        je,
        {
          title: "WebClaw",
          subtitle: "scraping service (via doctor)",
          up: C ? C.found && C.ok : null
        }
      ),
      /* @__PURE__ */ t(
        je,
        {
          title: Q ? "Optional search API" : "Serper",
          subtitle: Q ? "Public discovery also works without a search key" : "search API key (via doctor)",
          up: x ? x.found && x.ok : null
        }
      ),
      /* @__PURE__ */ t(
        je,
        {
          title: Q ? "LLM Browser" : "AWB bridge",
          subtitle: Q ? String(i?.awb.raw || "Checking managed browser") : i?.awb.up ? i.awb.isBridge ? "Agent Web Browser on :7896" : `port 7896 serves "${i.awb.app ?? "unknown"}"` : "down (:7896)",
          up: i ? i.awb.up && !!i.awb.isBridge : null,
          warn: i?.awb.up && !i.awb.isBridge
        }
      ),
      /* @__PURE__ */ t(
        je,
        {
          title: "Paperclip",
          subtitle: i?.paperclip.up ? "online (:3100)" : "offline (:3100)",
          up: i ? i.paperclip.up : null,
          action: i && !i.paperclip.up ? {
            label: p === "paperclip" ? "Starting…" : "Engine Start",
            busy: p === "paperclip",
            onClick: () => h("paperclip")
          } : void 0
        }
      ),
      /* @__PURE__ */ t(
        je,
        {
          title: "Resume-Matcher",
          subtitle: i?.resumeMatcher.up ? "online (:3000)" : "offline (:3000)",
          up: i ? i.resumeMatcher.up : null,
          action: i && !i.resumeMatcher.up ? {
            label: p === "resume-matcher" ? "Starting…" : "Engine Start",
            busy: p === "resume-matcher",
            onClick: () => h("resume-matcher")
          } : void 0
        }
      ),
      /* @__PURE__ */ o(Y, { className: "border-slate-800 bg-slate-900/60", children: [
        /* @__PURE__ */ t(le, { className: "pb-2", children: /* @__PURE__ */ t(ce, { className: "text-sm text-slate-200", children: "Session sites" }) }),
        /* @__PURE__ */ t(Z, { className: "flex flex-wrap gap-2", children: N.length > 0 ? N.map((_) => /* @__PURE__ */ t($e, { className: "bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/15", children: _ }, _)) : /* @__PURE__ */ t("span", { className: "text-xs text-slate-500", children: n?.exists === !1 ? "no saved sessions yet" : "none recorded" }) })
      ] })
    ] })
  ] });
}
function je({
  title: e,
  subtitle: a,
  up: r,
  warn: s,
  action: i
}) {
  return /* @__PURE__ */ o(Y, { className: "border-slate-800 bg-slate-900/60", children: [
    /* @__PURE__ */ t(le, { className: "pb-2", children: /* @__PURE__ */ o("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ t(ce, { className: "text-sm text-slate-200", children: e }),
      r === null ? /* @__PURE__ */ t("span", { className: "inline-block h-2.5 w-2.5 rounded-full bg-slate-600" }) : s ? /* @__PURE__ */ t("span", { className: "inline-block h-2.5 w-2.5 rounded-full bg-amber-400" }) : /* @__PURE__ */ t(Ao, { up: r })
    ] }) }),
    /* @__PURE__ */ o(Z, { className: "space-y-2", children: [
      /* @__PURE__ */ t("p", { className: "text-xs text-slate-400", children: a }),
      i && /* @__PURE__ */ o(
        O,
        {
          size: "sm",
          variant: "outline",
          className: "border-slate-600 bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-white",
          onClick: i.onClick,
          disabled: i.busy || !J,
          children: [
            /* @__PURE__ */ t(at, { className: "mr-1 h-3 w-3" }),
            i.label
          ]
        }
      )
    ] })
  ] });
}
function he({ className: e, type: a, ...r }) {
  return /* @__PURE__ */ t(
    "input",
    {
      type: a,
      "data-slot": "input",
      className: me(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        e
      ),
      ...r
    }
  );
}
var To = Object.defineProperty, $o = (e, a) => To(e, "name", { value: a, configurable: !0 }), Lo = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], Oo = Lo.reduce((e, a) => {
  const r = /* @__PURE__ */ st(`Primitive.${a}`), s = te.forwardRef((i, l) => {
    const { asChild: n, ...c } = i, p = n ? r : a;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ t(p, { ...c, ref: l });
  });
  return s.displayName = `Primitive.${a}`, { ...e, [a]: s };
}, {});
function Io(e, a) {
  e && pa.flushSync(() => e.dispatchEvent(a));
}
$o(Io, "dispatchDiscreteCustomEvent");
var Bo = Object.defineProperty, qo = (e, a) => Bo(e, "name", { value: a, configurable: !0 }), Do = /* @__PURE__ */ te.forwardRef(
  /* @__PURE__ */ qo(function(a, r) {
    return /* @__PURE__ */ t(
      Oo.label,
      {
        ...a,
        ref: r,
        onMouseDown: (s) => {
          s.target.closest("button, input, select, textarea") || (a.onMouseDown?.(s), !s.defaultPrevented && s.detail > 1 && s.preventDefault());
        }
      }
    );
  }, "Label")
), Fo = Do;
function Te({
  className: e,
  ...a
}) {
  return /* @__PURE__ */ t(
    Fo,
    {
      "data-slot": "label",
      className: me(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        e
      ),
      ...a
    }
  );
}
function Vo() {
  const [e, a] = b(Q ? "Microsoft Azure remote jobs" : "Recruiting Coordinator"), [r, s] = b(Q ? "Remote" : "San Francisco, CA"), [i, l] = b(720), [n, c] = b(10), [p, d] = b(Q ? 1 : 3), [m, f] = b(!1), [h, C] = b(""), [x, N] = b([]), [_, $] = b(null), [M, D] = b(null), q = et(null);
  return K(() => S.onSearchLog((R) => {
    N((v) => [...v.slice(-2e3), R.line]);
  }), []), K(() => {
    q.current && (q.current.scrollTop = q.current.scrollHeight);
  }, [x]), /* @__PURE__ */ o("div", { className: "space-y-6", children: [
    /* @__PURE__ */ t("h1", { className: "text-2xl font-bold text-slate-100", children: "Search" }),
    h && /* @__PURE__ */ t("p", { role: "alert", className: "text-rose-300", children: h }),
    /* @__PURE__ */ o(Y, { className: "border-slate-800 bg-slate-900/60", children: [
      /* @__PURE__ */ t(le, { children: /* @__PURE__ */ t(ce, { className: "text-slate-200", children: "Agent A — find & triage" }) }),
      /* @__PURE__ */ o(Z, { className: "space-y-4", children: [
        /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5", children: [
          /* @__PURE__ */ o("div", { className: "space-y-1 xl:col-span-2", children: [
            /* @__PURE__ */ t(Te, { className: "text-slate-300", children: "Query" }),
            /* @__PURE__ */ t(
              he,
              {
                "aria-label": "Search query",
                value: e,
                onChange: (u) => a(u.target.value),
                className: "border-slate-700 bg-slate-950 text-slate-200"
              }
            )
          ] }),
          /* @__PURE__ */ o("div", { className: "space-y-1", children: [
            /* @__PURE__ */ t(Te, { className: "text-slate-300", children: "Location" }),
            /* @__PURE__ */ t(
              he,
              {
                "aria-label": "Search location",
                value: r,
                onChange: (u) => s(u.target.value),
                className: "border-slate-700 bg-slate-950 text-slate-200"
              }
            )
          ] }),
          /* @__PURE__ */ o("div", { className: "space-y-1", children: [
            /* @__PURE__ */ t(Te, { className: "text-slate-300", children: "Hours old" }),
            /* @__PURE__ */ t(
              he,
              {
                "aria-label": "Maximum posting age in hours",
                type: "number",
                value: i,
                onChange: (u) => l(Number(u.target.value)),
                className: "border-slate-700 bg-slate-950 text-slate-200"
              }
            )
          ] }),
          /* @__PURE__ */ o("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ o("div", { className: "space-y-1", children: [
              /* @__PURE__ */ t(Te, { className: "text-slate-300", children: "Results" }),
              /* @__PURE__ */ t(
                he,
                {
                  type: "number",
                  value: n,
                  onChange: (u) => c(Number(u.target.value)),
                  className: "border-slate-700 bg-slate-950 text-slate-200"
                }
              )
            ] }),
            /* @__PURE__ */ o("div", { className: "space-y-1", children: [
              /* @__PURE__ */ t(Te, { className: "text-slate-300", children: "Concurrency" }),
              /* @__PURE__ */ t(
                he,
                {
                  type: "number",
                  value: p,
                  onChange: (u) => d(Number(u.target.value)),
                  className: "border-slate-700 bg-slate-950 text-slate-200"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ o(
            O,
            {
              onClick: async () => {
                f(!0), C(""), N([]), $(null), D(null);
                try {
                  const u = await S.searchSpawn({ query: e, location: r, hoursOld: i, resultsWanted: n, concurrency: p });
                  $(u.code);
                  const R = await S.jobsRead();
                  D(R.rows);
                } catch (u) {
                  C(u instanceof Error ? u.message : "Search failed. Saved jobs were preserved.");
                } finally {
                  f(!1);
                }
              },
              disabled: m || !J,
              className: "bg-cyan-500 text-slate-950 hover:bg-cyan-400",
              children: [
                /* @__PURE__ */ t(tt, { className: "mr-2 h-4 w-4" }),
                m ? "Running…" : "Run search"
              ]
            }
          ),
          Q && m && /* @__PURE__ */ t(O, { variant: "outline", onClick: () => {
            S.searchCancel().catch((u) => N((R) => [...R, String(u)]));
          }, children: "Cancel search" }),
          !J && /* @__PURE__ */ t("span", { className: "text-xs text-slate-500", children: "desktop-only: launch via Electron to run the pipeline" }),
          _ !== null && /* @__PURE__ */ o("span", { className: `text-xs ${_ === 0 ? "text-emerald-400" : "text-rose-400"}`, children: [
            "exit code ",
            _
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ o(Y, { className: "border-slate-800 bg-slate-900/60", children: [
      /* @__PURE__ */ t(le, { children: /* @__PURE__ */ t(ce, { className: "text-slate-200", children: "Live log" }) }),
      /* @__PURE__ */ t(Z, { children: /* @__PURE__ */ t(
        "div",
        {
          ref: q,
          className: "h-64 overflow-auto rounded-md bg-slate-950 p-4 font-mono text-xs text-slate-300",
          children: x.length === 0 ? /* @__PURE__ */ t("span", { className: "text-slate-600", children: "output will stream here…" }) : x.map((u, R) => /* @__PURE__ */ t("div", { children: u }, R))
        }
      ) })
    ] }),
    M && /* @__PURE__ */ o(Y, { className: "border-slate-800 bg-slate-900/60", children: [
      /* @__PURE__ */ o(le, { className: "flex flex-row items-center justify-between", children: [
        /* @__PURE__ */ o(ce, { className: "text-slate-200", children: [
          "Results (",
          M.length,
          ")"
        ] }),
        /* @__PURE__ */ o(
          O,
          {
            variant: "outline",
            className: "border-slate-600 bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-white",
            onClick: () => S.reportOpen(),
            disabled: !J,
            children: [
              /* @__PURE__ */ t(zt, { className: "mr-2 h-4 w-4" }),
              "Open HTML report"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ t(Z, { children: /* @__PURE__ */ t("div", { className: "overflow-auto", children: /* @__PURE__ */ o("table", { className: "w-full text-left text-sm", children: [
        /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { className: "border-b border-slate-800 text-xs uppercase text-slate-500", children: [
          /* @__PURE__ */ t("th", { className: "p-2", children: "Score" }),
          /* @__PURE__ */ t("th", { className: "p-2", children: "Fit" }),
          /* @__PURE__ */ t("th", { className: "p-2", children: "Title" }),
          /* @__PURE__ */ t("th", { className: "p-2", children: "Company" }),
          /* @__PURE__ */ t("th", { className: "p-2", children: "Location" })
        ] }) }),
        /* @__PURE__ */ t("tbody", { children: M.map((u, R) => /* @__PURE__ */ o("tr", { className: "border-b border-slate-800/50 text-slate-300", children: [
          /* @__PURE__ */ t("td", { className: "p-2 font-semibold text-cyan-300", children: u.score }),
          /* @__PURE__ */ t("td", { className: "p-2", children: u.fit_label || u.fit }),
          /* @__PURE__ */ t("td", { className: "p-2", children: u.title }),
          /* @__PURE__ */ t("td", { className: "p-2", children: u.company }),
          /* @__PURE__ */ t("td", { className: "p-2", children: u.location })
        ] }, R)) })
      ] }) }) })
    ] })
  ] });
}
const Je = [
  { key: "score", label: "Score" },
  { key: "fit_label", label: "Fit" },
  { key: "title", label: "Title" },
  { key: "company", label: "Company" },
  { key: "location", label: "Location" },
  { key: "work_mode", label: "Mode" },
  { key: "salary", label: "Salary" },
  { key: "matched_skills", label: "Matched skills" },
  { key: "gaps", label: "Gaps" },
  { key: "url", label: "Link" }
];
function Wo() {
  const [e, a] = b([]), [r, s] = b(!0), [i, l] = b(""), [n, c] = b("score"), [p, d] = b("desc");
  K(() => {
    S.jobsRead().then((h) => {
      a(h.rows), s(h.exists);
    }).catch((h) => l(h instanceof Error ? h.message : "Saved jobs could not be loaded. Retry after checking app status."));
  }, []);
  const m = Re(() => {
    const h = [...e];
    return h.sort((C, x) => {
      const N = C[n] ?? "", _ = x[n] ?? "", $ = Number(N), M = Number(_);
      let D;
      return !Number.isNaN($) && !Number.isNaN(M) && N !== "" && _ !== "" ? D = $ - M : D = String(N).localeCompare(String(_)), p === "asc" ? D : -D;
    }), h;
  }, [e, n, p]), f = (h) => {
    h === n ? d((C) => C === "asc" ? "desc" : "asc") : (c(h), d(h === "score" ? "desc" : "asc"));
  };
  return /* @__PURE__ */ o("div", { className: "space-y-6", children: [
    /* @__PURE__ */ t("h1", { className: "text-2xl font-bold text-slate-100", children: "Jobs" }),
    i && /* @__PURE__ */ t("p", { role: "alert", className: "text-rose-300", children: i }),
    /* @__PURE__ */ o(Y, { className: "border-slate-800 bg-slate-900/60", children: [
      /* @__PURE__ */ t(le, { children: /* @__PURE__ */ o(ce, { className: "text-slate-200", children: [
        Q ? "Saved jobs" : "reports/job_matches.csv",
        " ",
        !r && "(run a search to add jobs)"
      ] }) }),
      /* @__PURE__ */ t(Z, { children: /* @__PURE__ */ t("div", { className: "overflow-auto", children: /* @__PURE__ */ o("table", { className: "w-full text-left text-sm", children: [
        /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: "border-b border-slate-800 text-xs uppercase text-slate-500", children: Je.map((h) => /* @__PURE__ */ t(
          "th",
          {
            className: "cursor-pointer select-none p-2 hover:text-cyan-300",
            onClick: () => f(h.key),
            children: /* @__PURE__ */ o("span", { className: "inline-flex items-center gap-1", children: [
              h.label,
              /* @__PURE__ */ t(ka, { className: "h-3 w-3" }),
              n === h.key && (p === "asc" ? "↑" : "↓")
            ] })
          },
          h.key
        )) }) }),
        /* @__PURE__ */ o("tbody", { children: [
          m.map((h, C) => /* @__PURE__ */ t("tr", { className: "border-b border-slate-800/50 text-slate-300", children: Je.map((x) => /* @__PURE__ */ t("td", { className: "max-w-56 truncate p-2", title: h[x.key], children: x.key === "url" ? h.url ? /* @__PURE__ */ t(
            "a",
            {
              href: h.url,
              target: "_blank",
              rel: "noreferrer",
              className: "text-cyan-400 hover:underline",
              children: "open"
            }
          ) : "" : x.key === "score" ? /* @__PURE__ */ t("span", { className: "font-semibold text-cyan-300", children: h[x.key] }) : h[x.key] }, x.key)) }, C)),
          m.length === 0 && /* @__PURE__ */ t("tr", { children: /* @__PURE__ */ t("td", { colSpan: Je.length, className: "p-6 text-center text-slate-500", children: "no rows" }) })
        ] })
      ] }) }) })
    ] })
  ] });
}
const Uo = {
  exists: !1,
  summary: {},
  applications: []
}, xt = [
  { value: "interview", label: "Interview" },
  { value: "denied", label: "Denied" },
  { value: "not_selected", label: "Not selected" }
];
function Go(e) {
  return e ? e.slice(0, 10) : "Not recorded";
}
function Ho() {
  const [e, a] = b(Uo), [r, s] = b(!0), [i, l] = b(""), [n, c] = b(""), [p, d] = b(""), [m, f] = b(null), [h, C] = b(""), x = async () => {
    s(!0);
    try {
      const u = await S.applicationsRead();
      a(u), f(u.error ? { tone: "bad", text: u.error } : null);
    } finally {
      s(!1);
    }
  };
  K(() => {
    let u = !0;
    return S.applicationsRead().then((R) => {
      u && (a(R), f(R.error ? { tone: "bad", text: R.error } : null), s(!1));
    }), () => {
      u = !1;
    };
  }, []);
  const N = async () => {
    f(null), s(!0);
    try {
      const u = await S.applicationsRefresh();
      u.code !== 0 && f({ tone: "bad", text: u.output || "Application refresh failed." }), await x();
    } finally {
      s(!1);
    }
  }, _ = async (u, R) => {
    const v = xt.find((L) => L.value === R)?.label || R;
    if (window.confirm(`Set ${u.company}, ${u.title} to ${v}?`)) {
      l(u.identity_key), f(null);
      try {
        const L = await S.applicationsFlag(u.identity_key, R);
        if (L.code !== 0) {
          f({ tone: "bad", text: L.output || "The outcome could not be saved." });
          return;
        }
        C(u.identity_key), f({ tone: "good", text: `${u.company} is now marked ${v}.` }), await x();
      } finally {
        l("");
      }
    }
  }, $ = async () => {
    if (h) {
      l(h);
      try {
        const u = await S.applicationsUndo(h);
        if (u.code !== 0) {
          f({ tone: "bad", text: u.output || "The last change could not be undone." });
          return;
        }
        C(""), f({ tone: "good", text: "The previous application state was restored." }), await x();
      } finally {
        l("");
      }
    }
  }, M = Re(() => {
    const u = n.trim().toLowerCase();
    return e.applications.filter((R) => {
      const v = !p || R.status === p, L = [R.company, R.title, R.location, R.source, R.notes].join(" ").toLowerCase();
      return v && (!u || L.includes(u));
    });
  }, [n, e.applications, p]), D = Re(
    () => [...new Set(e.applications.map((u) => u.status).filter(Boolean))].sort(),
    [e.applications]
  ), q = e.summary, z = [
    ["Tracked", q.total ?? 0],
    ["Active", q.active ?? 0],
    ["Interviewing", q.interviewing ?? 0],
    ["Offers", q.offers ?? 0],
    ["Closed", q.closed ?? 0]
  ];
  return /* @__PURE__ */ o("section", { className: "mx-auto max-w-[1500px] space-y-7", children: [
    /* @__PURE__ */ o("header", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ o("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ t("h1", { className: "text-3xl font-semibold tracking-[-0.03em] text-slate-50", children: "Applications" }),
        /* @__PURE__ */ t("p", { className: "mt-2 text-sm leading-6 text-slate-400", children: "One durable record of drafts, submitted roles, interviews, and closed outcomes." })
      ] }),
      /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ o(
          O,
          {
            variant: "outline",
            disabled: !e.exists,
            onClick: () => {
              S.applicationsReportOpen();
            },
            className: "border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800",
            children: [
              /* @__PURE__ */ t(Da, { className: "mr-2 h-4 w-4" }),
              "Open report"
            ]
          }
        ),
        /* @__PURE__ */ o(
          O,
          {
            disabled: r,
            onClick: () => {
              N();
            },
            className: "bg-cyan-400 text-slate-950 hover:bg-cyan-300",
            children: [
              /* @__PURE__ */ t(Le, { className: `mr-2 h-4 w-4 ${r ? "animate-spin" : ""}` }),
              "Refresh data"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid grid-cols-2 border-y border-slate-800 md:grid-cols-5", children: z.map(([u, R], v) => /* @__PURE__ */ o(
      "div",
      {
        className: `px-4 py-5 ${v > 0 ? "border-l border-slate-800" : ""}`,
        children: [
          /* @__PURE__ */ t("div", { className: "font-mono text-2xl tabular-nums text-slate-100", children: R }),
          /* @__PURE__ */ t("div", { className: "mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-500", children: u })
        ]
      },
      u
    )) }),
    m && /* @__PURE__ */ o(
      "div",
      {
        role: m.tone === "bad" ? "alert" : "status",
        className: `flex flex-wrap items-center gap-3 rounded-md border px-4 py-3 text-sm ${m.tone === "bad" ? "border-rose-800 bg-rose-950/40 text-rose-200" : "border-emerald-800 bg-emerald-950/35 text-emerald-200"}`,
        children: [
          /* @__PURE__ */ t("span", { children: m.text }),
          m.tone === "good" && h && /* @__PURE__ */ o(
            O,
            {
              size: "sm",
              variant: "outline",
              disabled: i === h,
              onClick: () => {
                $();
              },
              className: "border-emerald-700 bg-transparent text-emerald-100 hover:bg-emerald-900",
              children: [
                /* @__PURE__ */ t(Mt, { className: "mr-2 h-3.5 w-3.5" }),
                "Undo change"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ o("div", { className: "relative min-w-64 flex-1", children: [
        /* @__PURE__ */ t(Et, { className: "pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-500" }),
        /* @__PURE__ */ t(
          he,
          {
            value: n,
            onChange: (u) => c(u.target.value),
            placeholder: "Search company, role, location, or note",
            className: "border-slate-700 bg-slate-900 pl-9 text-slate-100 placeholder:text-slate-500"
          }
        )
      ] }),
      /* @__PURE__ */ o(
        "select",
        {
          "aria-label": "Filter by application status",
          value: p,
          onChange: (u) => d(u.target.value),
          className: "h-10 rounded-md border border-slate-700 bg-slate-900 px-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-cyan-400",
          children: [
            /* @__PURE__ */ t("option", { value: "", children: "All statuses" }),
            D.map((u) => /* @__PURE__ */ t("option", { value: u, children: u.replaceAll("_", " ") }, u))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "overflow-hidden rounded-md border border-slate-800 bg-slate-900/45", children: [
      /* @__PURE__ */ t("div", { className: "overflow-auto", children: /* @__PURE__ */ o("table", { className: "w-full min-w-[980px] text-left text-sm", children: [
        /* @__PURE__ */ t("thead", { className: "bg-slate-900 text-xs uppercase tracking-[0.1em] text-slate-500", children: /* @__PURE__ */ o("tr", { children: [
          /* @__PURE__ */ t("th", { className: "px-4 py-3 font-medium", children: "Company and role" }),
          /* @__PURE__ */ t("th", { className: "px-4 py-3 font-medium", children: "Status" }),
          /* @__PURE__ */ t("th", { className: "px-4 py-3 font-medium", children: "Outcome" }),
          /* @__PURE__ */ t("th", { className: "px-4 py-3 font-medium", children: "Applied" }),
          /* @__PURE__ */ t("th", { className: "px-4 py-3 font-medium", children: "Location" }),
          /* @__PURE__ */ t("th", { className: "px-4 py-3 font-medium", children: "Fit" }),
          /* @__PURE__ */ t("th", { className: "px-4 py-3 font-medium", children: "Source" })
        ] }) }),
        /* @__PURE__ */ t("tbody", { children: M.map((u) => /* @__PURE__ */ o("tr", { className: "border-t border-slate-800 text-slate-300", children: [
          /* @__PURE__ */ o("td", { className: "max-w-80 px-4 py-4", children: [
            /* @__PURE__ */ t("div", { className: "font-medium text-slate-100", children: u.company }),
            /* @__PURE__ */ t("div", { className: "mt-1 text-slate-400", children: u.title })
          ] }),
          /* @__PURE__ */ t("td", { className: "px-4 py-4", children: /* @__PURE__ */ t("span", { className: "rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs text-cyan-200", children: u.status_inferred ? "Applied, outcome not recorded" : u.status_label }) }),
          /* @__PURE__ */ t("td", { className: "px-4 py-4", children: /* @__PURE__ */ o(
            "select",
            {
              "aria-label": `Set outcome for ${u.company}, ${u.title}`,
              value: u.outcome_flag,
              disabled: i === u.identity_key,
              onChange: (R) => {
                const v = R.target.value;
                v && _(u, v);
              },
              className: "h-9 min-w-36 rounded-md border border-slate-700 bg-slate-950 px-2 text-xs text-slate-200 outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50",
              children: [
                /* @__PURE__ */ t("option", { value: "", children: "Set outcome" }),
                xt.map((R) => /* @__PURE__ */ t("option", { value: R.value, children: R.label }, R.value))
              ]
            }
          ) }),
          /* @__PURE__ */ t("td", { className: "px-4 py-4 font-mono text-xs tabular-nums text-slate-400", children: Go(u.applied_at) }),
          /* @__PURE__ */ t("td", { className: "max-w-52 px-4 py-4 text-slate-400", children: u.location || "Not recorded" }),
          /* @__PURE__ */ t("td", { className: "px-4 py-4 font-mono tabular-nums text-cyan-200", children: u.fit_score }),
          /* @__PURE__ */ t("td", { className: "max-w-40 truncate px-4 py-4 text-xs text-slate-500", title: u.source, children: u.source || "Unknown" })
        ] }, u.identity_key)) })
      ] }) }),
      !r && M.length === 0 && /* @__PURE__ */ o("div", { className: "border-t border-slate-800 px-6 py-14 text-center", children: [
        /* @__PURE__ */ t("p", { className: "font-medium text-slate-200", children: e.applications.length === 0 ? "No applications recorded yet." : "No applications match these filters." }),
        /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-slate-500", children: e.applications.length === 0 ? "Approved application drafts and submitted roles will appear here." : "Clear a filter or try a broader search." })
      ] }),
      r && /* @__PURE__ */ t("div", { className: "border-t border-slate-800 px-6 py-14 text-center text-sm text-slate-400", children: "Loading application history..." })
    ] })
  ] });
}
function Jo() {
  const [e, a] = b(null), [r, s] = b(!1), [i, l] = b(!1), [n, c] = b(null), p = fe(async () => {
    s(!0);
    try {
      a(await S.agentsList());
    } finally {
      s(!1);
    }
  }, []);
  K(() => {
    const m = window.setTimeout(() => {
      p();
    }, 0);
    return () => window.clearTimeout(m);
  }, [p]);
  const d = async () => {
    l(!0), c("launching…");
    try {
      const m = await S.servicesStart("paperclip");
      m.paperclip?.up ? (c(null), await p()) : c(m.paperclip?.error ? `failed: ${m.paperclip.error}` : "failed to start");
    } finally {
      l(!1);
    }
  };
  return /* @__PURE__ */ o("div", { className: "space-y-6", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ t("h1", { className: "text-2xl font-bold text-slate-100", children: "Agents" }),
      /* @__PURE__ */ o(
        O,
        {
          variant: "outline",
          className: "border-slate-600 bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-white",
          onClick: p,
          disabled: r,
          children: [
            /* @__PURE__ */ t(Le, { className: `mr-2 h-4 w-4 ${r ? "animate-spin" : ""}` }),
            "Refresh"
          ]
        }
      )
    ] }),
    e && !e.online && /* @__PURE__ */ t(Y, { className: "border-amber-800/50 bg-amber-950/20", children: /* @__PURE__ */ o(Z, { className: "flex flex-col items-start gap-4 pt-6", children: [
      /* @__PURE__ */ t("p", { className: "text-sm text-amber-300", children: e.message || "Paperclip offline — start it with scripts/paperclip-start-local.ps1" }),
      /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ o(
          O,
          {
            onClick: d,
            disabled: i || !J,
            className: "bg-cyan-500 text-slate-950 hover:bg-cyan-400",
            children: [
              /* @__PURE__ */ t(at, { className: "mr-2 h-4 w-4" }),
              i ? "Starting…" : "Engine Start"
            ]
          }
        ),
        n && /* @__PURE__ */ t("span", { className: `text-xs ${n.startsWith("failed") ? "text-rose-400" : "text-slate-400"}`, children: n })
      ] })
    ] }) }),
    e?.online && /* @__PURE__ */ o("p", { className: "text-sm text-slate-400", children: [
      "company: ",
      /* @__PURE__ */ t("span", { className: "text-slate-200", children: e.company ?? "—" }),
      e.message && /* @__PURE__ */ t("span", { className: "ml-2 text-amber-300", children: e.message })
    ] }),
    /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3", children: [
      (e?.agents ?? []).map((m, f) => /* @__PURE__ */ o(Y, { className: "border-slate-800 bg-slate-900/60", children: [
        /* @__PURE__ */ t(le, { className: "pb-2", children: /* @__PURE__ */ o("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ t(ce, { className: "text-sm text-slate-200", children: m.name ?? "agent" }),
          /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
            m.paused && /* @__PURE__ */ t($e, { className: "bg-amber-500/15 text-amber-300 hover:bg-amber-500/15", children: "paused" }),
            /* @__PURE__ */ t($e, { className: "bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/15", children: m.status ?? "unknown" })
          ] })
        ] }) }),
        /* @__PURE__ */ t(Z, { children: /* @__PURE__ */ o("p", { className: "text-xs text-slate-400", children: [
          "adapter: ",
          m.adapterType ?? "—"
        ] }) })
      ] }, m.id ?? f)),
      e?.online && e.agents.length === 0 && /* @__PURE__ */ t("p", { className: "text-sm text-slate-500", children: "no agents returned" })
    ] })
  ] });
}
function Qo({ request: e, title: a = "Browser" } = {}) {
  const [r, s] = b("https://apply.careers.microsoft.com/careers?query=Azure"), [i, l] = b("lean"), [n, c] = b({}), [p, d] = b({}), [m, f] = b(""), [h, C] = b(""), [x, N] = b(!1), [_, $] = b(""), [M, D] = b(""), [q, z] = b(""), u = async (E, de, ge) => {
    const I = await (e || S.browserRequest)(E, de, ge);
    if (I.ok === !1) throw new Error(String(I.error || I.remedy || I.refused || "Browser operation refused"));
    return I;
  }, R = async () => {
    const E = await u("GET", "/api/status");
    c(E), C(String(E.user_agent || ""));
  }, v = async (E) => {
    N(!0), $("");
    try {
      await E();
    } catch (de) {
      $(de instanceof Error ? de.message : "Browser operation failed");
    } finally {
      N(!1);
    }
  };
  K(() => {
    R().catch((E) => $(String(E.message || E)));
  }, []);
  const L = async () => {
    d(await u("GET", "/api/read")), D(""), f("");
  }, X = p.handles?.find((E) => String(E.h) === M), re = !X || X.private || X.hidden || X.disabled || ["password", "email", "tel", "file"].includes(X.type || "") || p.needs_handoff;
  return /* @__PURE__ */ o("div", { className: "space-y-5", children: [
    /* @__PURE__ */ o("header", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("h1", { className: "text-2xl font-bold text-slate-100", children: a }),
        /* @__PURE__ */ t("p", { className: "text-sm text-slate-400", children: "LLM Browser owns this persistent research session." })
      ] }),
      /* @__PURE__ */ o("span", { role: "status", className: "text-sm text-slate-300", children: [
        String(n.tier || "Checking"),
        " ",
        n.running ? "running" : "idle"
      ] })
    ] }),
    _ && /* @__PURE__ */ t("p", { role: "alert", className: "rounded-md border border-rose-800 p-3 text-rose-300", children: _ }),
    /* @__PURE__ */ o("div", { className: "flex flex-wrap items-end gap-3", children: [
      /* @__PURE__ */ o("label", { className: "text-sm text-slate-300", children: [
        "Tier",
        /* @__PURE__ */ o("select", { "aria-label": "Browser tier", value: i, onChange: (E) => l(E.target.value), className: "ml-2 p-2", children: [
          /* @__PURE__ */ t("option", { value: "light", children: "Light: public HTML" }),
          /* @__PURE__ */ t("option", { value: "lean", children: "Lean: JavaScript pages" }),
          /* @__PURE__ */ t("option", { value: "full", children: "Full: owned browser window" })
        ] })
      ] }),
      /* @__PURE__ */ t(O, { disabled: x, onClick: () => v(async () => {
        await u("POST", "/api/start", { tier: i }), await R();
      }), children: "Start tier" }),
      /* @__PURE__ */ t(O, { disabled: x, variant: "outline", onClick: () => v(async () => {
        await u("POST", "/api/stop", {}), d({}), f(""), await R();
      }), children: "Stop owned browser" }),
      /* @__PURE__ */ t(O, { disabled: x, variant: "outline", onClick: () => v(R), children: "Refresh status" })
    ] }),
    /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ t(he, { "aria-label": "Page URL", value: r, onChange: (E) => s(E.target.value), className: "min-w-64 flex-1" }),
      /* @__PURE__ */ t(O, { disabled: x, onClick: () => v(async () => {
        await u("POST", "/api/navigate", { url: r }), d({}), f(""), await R();
      }), children: "Navigate" }),
      /* @__PURE__ */ t(O, { disabled: x, variant: "outline", onClick: () => v(L), children: "Read page" }),
      /* @__PURE__ */ t(O, { disabled: x, variant: "outline", onClick: () => v(async () => {
        const E = await u("GET", "/api/frame");
        if (!E.ok) throw new Error(String(E.error || "Frame unavailable"));
        f("data:image/png;base64," + E.image_base64);
      }), children: "Show frame" })
    ] }),
    p.needs_handoff && /* @__PURE__ */ o("div", { role: "status", className: "rounded-md border border-amber-700 p-3 text-sm text-amber-300", children: [
      /* @__PURE__ */ t("p", { children: p.remedy || "Complete this verification or sign-in directly in the owned full browser." }),
      /* @__PURE__ */ t(O, { disabled: x, variant: "outline", onClick: () => v(async () => {
        await u("POST", "/api/swap", { painted: !0 }), await R();
      }), children: "Open full browser for sign-in" }),
      /* @__PURE__ */ t("p", { className: "mt-2", children: "The window opens minimized. Restore it from the Windows taskbar, then re-read the page here." })
    ] }),
    /* @__PURE__ */ o("details", { className: "rounded-md border border-slate-700 p-3", children: [
      /* @__PURE__ */ t("summary", { className: "cursor-pointer text-sm text-slate-200", children: "Browser compatibility" }),
      /* @__PURE__ */ o("label", { className: "mt-3 block text-sm text-slate-300", children: [
        "User agent",
        /* @__PURE__ */ t(he, { "aria-label": "Compatibility user agent", value: h, onChange: (E) => C(E.target.value), placeholder: "Empty uses the browser default", className: "mt-2" })
      ] }),
      /* @__PURE__ */ t("p", { className: "my-2 text-xs text-slate-400", children: "Changes future requests. Site challenges still require owner verification." }),
      /* @__PURE__ */ t(O, { disabled: x, variant: "outline", onClick: () => v(async () => {
        await u("POST", "/api/settings", { user_agent: h }), await R();
      }), children: "Save user agent" })
    ] }),
    p.text && /* @__PURE__ */ o("section", { className: "space-y-3", children: [
      /* @__PURE__ */ t("h2", { className: "text-lg font-semibold text-slate-100", children: p.title || "Readable page" }),
      /* @__PURE__ */ t("pre", { className: "max-h-96 overflow-auto whitespace-pre-wrap rounded-md border border-slate-800 bg-slate-950 p-4 text-slate-300", children: p.text }),
      /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ o("select", { "aria-label": "Page handle", value: M, onChange: (E) => D(E.target.value), className: "max-w-full p-2", children: [
          /* @__PURE__ */ t("option", { value: "", children: "Choose a current page control" }),
          p.handles?.slice(0, 200).map((E) => /* @__PURE__ */ o("option", { value: E.h, children: [
            "[",
            E.h,
            "] ",
            E.role,
            ": ",
            E.name
          ] }, E.h))
        ] }),
        /* @__PURE__ */ t(he, { "aria-label": "Control value", value: q, onChange: (E) => z(E.target.value), disabled: !!re, className: "min-w-48 flex-1" }),
        /* @__PURE__ */ t(O, { disabled: x || !!re, variant: "outline", onClick: () => v(async () => {
          await u("POST", "/api/act", { handle: Number(M), document_id: p.document_id, action: "set_value", value: q }), await L();
        }), children: "Set value" }),
        /* @__PURE__ */ t(O, { disabled: x || !!re, variant: "outline", onClick: () => v(async () => {
          await u("POST", "/api/realclick", { handle: Number(M), document_id: p.document_id }), await L();
        }), children: "Click control" })
      ] }),
      /* @__PURE__ */ t("p", { className: "text-xs text-slate-400", children: "Handles belong to the latest read. Private fields and consequential application actions use the owner workflow." })
    ] }),
    m && /* @__PURE__ */ t("img", { src: m, alt: "Requested frame from the owned LLM Browser session", className: "max-w-full rounded-md border border-slate-700" })
  ] });
}
const De = [
  { key: "linkedin", label: "LinkedIn", fallbackUrl: "https://www.linkedin.com/login" },
  { key: "glassdoor", label: "Glassdoor", fallbackUrl: "https://www.glassdoor.com/profile/login_input.htm" },
  { key: "zip_recruiter", label: "ZipRecruiter", fallbackUrl: "https://www.ziprecruiter.com/login" },
  { key: "indeed", label: "Indeed", fallbackUrl: "https://secure.indeed.com/auth" }
];
function Yo() {
  const [e, a] = b(De[0].key), [r, s] = b({}), [i, l] = b(!1), [n, c] = b(null), p = et({});
  K(() => {
    (async () => {
      const h = {};
      for (const C of De) {
        const x = await S.loginUrl(C.key);
        h[C.key] = x.ok && x.url ? x.url : C.fallbackUrl;
      }
      s(h);
    })();
  }, []);
  const d = fe(async (h) => {
    const C = await S.loginUrl(h);
    C.ok && C.url && s((x) => ({ ...x, [h]: C.url })), a(h);
  }, []), m = async () => {
    l(!0), c(null);
    try {
      const h = await S.awbLaunch();
      h.error ? c(`error: ${h.error}`) : c(h.bridgeUp ? "bridge online: Agent Web Browser (:7896)" : "launched, bridge not detected yet");
    } finally {
      l(!1);
    }
  }, f = p.current[e];
  return /* @__PURE__ */ o("div", { className: "flex h-full flex-col space-y-4", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ t("h1", { className: "text-2xl font-bold text-slate-100", children: "Browser" }),
      /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
        n && /* @__PURE__ */ t("span", { className: "text-xs text-slate-400", children: n }),
        /* @__PURE__ */ o(
          O,
          {
            variant: "outline",
            className: "border-slate-600 bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-white",
            onClick: m,
            disabled: i || !J,
            children: [
              /* @__PURE__ */ t(Rt, { className: "mr-2 h-4 w-4" }),
              i ? "Launching…" : "Open standalone AWB"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "rounded-md border border-cyan-900/50 bg-cyan-950/20 px-4 py-2 text-xs text-cyan-300", children: [
      "Log in once — sessions persist locally (partition ",
      /* @__PURE__ */ t("code", { children: "persist:ee-browser" }),
      ")."
    ] }),
    /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      De.map((h) => /* @__PURE__ */ t(
        O,
        {
          size: "sm",
          variant: e === h.key ? "default" : "outline",
          className: e === h.key ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400" : "border-slate-600 bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-white",
          onClick: () => d(h.key),
          children: h.label
        },
        h.key
      )),
      /* @__PURE__ */ o("div", { className: "ml-auto flex items-center gap-1", children: [
        /* @__PURE__ */ t(
          O,
          {
            size: "icon",
            variant: "ghost",
            className: "text-slate-300 hover:bg-slate-800",
            onClick: () => f?.goBack(),
            disabled: !J,
            children: /* @__PURE__ */ t(fa, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ t(
          O,
          {
            size: "icon",
            variant: "ghost",
            className: "text-slate-300 hover:bg-slate-800",
            onClick: () => f?.goForward(),
            disabled: !J,
            children: /* @__PURE__ */ t(xa, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ t(
          O,
          {
            size: "icon",
            variant: "ghost",
            className: "text-slate-300 hover:bg-slate-800",
            onClick: () => f?.reload(),
            disabled: !J,
            children: /* @__PURE__ */ t(dr, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ t(
          O,
          {
            size: "icon",
            variant: "ghost",
            className: "text-slate-300 hover:bg-slate-800",
            onClick: () => {
              const h = f?.getURL?.() ?? r[e];
              h && window.open(h, "_blank");
            },
            children: /* @__PURE__ */ t(zt, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ t(Y, { className: "min-h-0 flex-1 border-slate-800 bg-slate-900/60", children: /* @__PURE__ */ t(Z, { className: "h-full p-0", children: J ? /* @__PURE__ */ t("div", { className: "relative h-full", children: De.map((h) => /* @__PURE__ */ t(
      "webview",
      {
        ref: (C) => {
          p.current[h.key] = C;
        },
        src: r[h.key] ?? h.fallbackUrl,
        partition: "persist:ee-browser",
        className: "absolute inset-0 h-full w-full",
        style: { display: e === h.key ? "flex" : "none" }
      },
      h.key
    )) }) : /* @__PURE__ */ o("div", { className: "flex h-full flex-col items-center justify-center gap-3 p-8 text-center", children: [
      /* @__PURE__ */ t($e, { className: "bg-slate-800 text-slate-300 hover:bg-slate-800", children: "desktop-only" }),
      /* @__PURE__ */ o("p", { className: "max-w-md text-sm text-slate-400", children: [
        "Embedded job-board tabs render as Electron ",
        /* @__PURE__ */ t("code", { children: "<webview>" }),
        " panels. Run the desktop app to log in to LinkedIn, Glassdoor, ZipRecruiter, and Indeed."
      ] })
    ] }) }) })
  ] });
}
function Zo() {
  return Q ? /* @__PURE__ */ t(Qo, {}) : /* @__PURE__ */ t(Yo, {});
}
const Ko = "border-slate-600 bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-white";
function ia({
  title: e,
  subtitle: a,
  service: r,
  serviceKey: s,
  url: i,
  partition: l
}) {
  const [n, c] = b(null), [p, d] = b(!1), [m, f] = b(null), [h, C] = b(!1), x = fe(async () => {
    const _ = await S.services();
    return c(_[s].up), _[s].up;
  }, [s]);
  K(() => {
    const _ = window.setTimeout(() => {
      x();
    }, 0);
    return () => window.clearTimeout(_);
  }, [x]);
  const N = async () => {
    d(!0), f("launching…"), C(!1);
    try {
      const _ = await S.servicesStart(r), $ = s === "paperclip" ? _.paperclip : _.resumeMatcher;
      await x() ? f(null) : ($?.dockerMissing && C(!0), f($?.error ? `failed: ${$.error}` : "failed to start — see logs"));
    } finally {
      d(!1);
    }
  };
  return /* @__PURE__ */ o("div", { className: "flex h-full flex-col space-y-4", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("h1", { className: "text-2xl font-bold text-slate-100", children: e }),
        /* @__PURE__ */ t("p", { className: "text-sm text-slate-400", children: a })
      ] }),
      /* @__PURE__ */ o(
        O,
        {
          variant: "outline",
          className: Ko,
          onClick: () => x(),
          disabled: p,
          children: [
            /* @__PURE__ */ t(Le, { className: "mr-2 h-4 w-4" }),
            "Re-check"
          ]
        }
      )
    ] }),
    n ? Q ? /* @__PURE__ */ t(Y, { className: "border-slate-800 bg-slate-900/60", children: /* @__PURE__ */ o(Z, { className: "p-6", children: [
      /* @__PURE__ */ o("p", { className: "text-sm text-slate-300", children: [
        e,
        " is available as an optional connected service."
      ] }),
      /* @__PURE__ */ o("a", { href: i, target: "_blank", rel: "noopener noreferrer", className: "text-sm text-cyan-300 underline", children: [
        "Open ",
        e
      ] })
    ] }) }) : J ? /* @__PURE__ */ t(Y, { className: "min-h-0 flex-1 border-slate-800 bg-slate-900/60", children: /* @__PURE__ */ t(Z, { className: "h-full p-0", children: /* @__PURE__ */ t("webview", { src: i, partition: l, className: "h-full w-full" }) }) }) : /* @__PURE__ */ o("p", { className: "text-sm text-slate-500", children: [
      "embedded view is desktop-only — open ",
      i,
      " in your browser."
    ] }) : /* @__PURE__ */ t(Y, { className: "flex flex-1 items-center justify-center border-slate-800 bg-slate-900/60", children: /* @__PURE__ */ o(Z, { className: "flex flex-col items-center gap-4 p-8 text-center", children: [
      /* @__PURE__ */ t("p", { className: "text-sm text-slate-400", children: n === null ? `Checking ${e} status…` : `${e} is offline.` }),
      n === !1 && /* @__PURE__ */ o(
        O,
        {
          onClick: N,
          disabled: p || !J,
          className: "bg-cyan-500 text-slate-950 hover:bg-cyan-400",
          children: [
            /* @__PURE__ */ t(at, { className: "mr-2 h-4 w-4" }),
            p ? "Starting…" : "Engine Start"
          ]
        }
      ),
      h && /* @__PURE__ */ t("p", { className: "max-w-md text-xs text-amber-300", children: "Docker was not found on PATH — Docker Desktop is required to run Resume-Matcher." }),
      m && /* @__PURE__ */ t("p", { className: `max-w-md text-xs ${m.startsWith("failed") ? "text-rose-400" : "text-slate-400"}`, children: m }),
      !J && /* @__PURE__ */ t("p", { className: "text-xs text-slate-500", children: "desktop-only: launch via Electron to start services" })
    ] }) })
  ] });
}
function Xo() {
  return /* @__PURE__ */ t(
    ia,
    {
      title: "Paperclip",
      subtitle: "multi-agent orchestrator (:3100)",
      service: "paperclip",
      serviceKey: "paperclip",
      url: "http://127.0.0.1:3100",
      partition: "persist:ee-paperclip"
    }
  );
}
function es() {
  return /* @__PURE__ */ t(
    ia,
    {
      title: "Resume-Matcher",
      subtitle: "resume tailoring service (:3000, Docker)",
      service: "resume-matcher",
      serviceKey: "resumeMatcher",
      url: "http://127.0.0.1:3000",
      partition: "persist:ee-resume-matcher"
    }
  );
}
function ts({ className: e, ...a }) {
  return /* @__PURE__ */ t(
    "textarea",
    {
      "data-slot": "textarea",
      className: me(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        e
      ),
      ...a
    }
  );
}
function yt({ name: e, title: a }) {
  const [r, s] = b(""), [i, l] = b(null), [n, c] = b(!1);
  K(() => {
    S.configRead(e).then((m) => {
      s(m.text), c(!0), m.error ? l({ ok: !1, msg: m.error }) : m.exists || l({ ok: !1, msg: `${e} not found` });
    });
  }, [e]);
  const p = () => {
    try {
      return JSON.parse(r), l({ ok: !0, msg: "valid JSON" }), !0;
    } catch (m) {
      return l({ ok: !1, msg: `invalid JSON: ${m.message}` }), !1;
    }
  }, d = async () => {
    if (!p()) return;
    const m = await S.configWrite(e, r);
    l(
      m.ok ? { ok: !0, msg: `saved (backup written to ${e}.bak)` } : { ok: !1, msg: m.error ?? "save failed" }
    );
  };
  return /* @__PURE__ */ o(Y, { className: "border-slate-800 bg-slate-900/60", children: [
    /* @__PURE__ */ o(le, { className: "flex flex-row items-center justify-between", children: [
      /* @__PURE__ */ t(ce, { className: "text-sm text-slate-200", children: a }),
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
        i && /* @__PURE__ */ t("span", { className: `text-xs ${i.ok ? "text-emerald-400" : "text-rose-400"}`, children: i.msg }),
        /* @__PURE__ */ t(
          O,
          {
            size: "sm",
            variant: "outline",
            className: "border-slate-600 bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-white",
            onClick: p,
            children: "Validate"
          }
        ),
        /* @__PURE__ */ o(
          O,
          {
            size: "sm",
            className: "bg-cyan-500 text-slate-950 hover:bg-cyan-400",
            onClick: d,
            disabled: !J || !n,
            children: [
              /* @__PURE__ */ t(ur, { className: "mr-1 h-4 w-4" }),
              "Save"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ t(Z, { children: /* @__PURE__ */ t(
      ts,
      {
        value: r,
        onChange: (m) => s(m.target.value),
        spellCheck: !1,
        className: "h-72 border-slate-700 bg-slate-950 font-mono text-xs text-slate-200",
        placeholder: J ? "loading…" : "desktop-only: config editing needs Electron"
      }
    ) })
  ] });
}
function as() {
  const [e, a] = b(null), r = fe(() => {
    S.sessionsRead().then(a);
  }, []);
  K(() => {
    r();
  }, [r]);
  const s = Object.entries(e?.data ?? {});
  return /* @__PURE__ */ o("div", { className: "space-y-6", children: [
    /* @__PURE__ */ t("h1", { className: "text-2xl font-bold text-slate-100", children: "Settings" }),
    /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-6 xl:grid-cols-2", children: [
      /* @__PURE__ */ t(yt, { name: "profile.json", title: "config/profile.json" }),
      /* @__PURE__ */ t(yt, { name: "searches.json", title: "config/searches.json" })
    ] }),
    /* @__PURE__ */ o(Y, { className: "border-slate-800 bg-slate-900/60", children: [
      /* @__PURE__ */ t(le, { children: /* @__PURE__ */ t(ce, { className: "text-sm text-slate-200", children: "Session sites (data/site_sessions.json)" }) }),
      /* @__PURE__ */ t(Z, { children: s.length === 0 ? /* @__PURE__ */ t("p", { className: "text-sm text-slate-500", children: e?.exists ? "no session entries" : "file not found — log in via the Browser page first" }) : /* @__PURE__ */ o("table", { className: "w-full text-left text-sm", children: [
        /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { className: "border-b border-slate-800 text-xs uppercase text-slate-500", children: [
          /* @__PURE__ */ t("th", { className: "p-2", children: "Site" }),
          /* @__PURE__ */ t("th", { className: "p-2", children: "Status" })
        ] }) }),
        /* @__PURE__ */ t("tbody", { children: s.map(([i, l]) => /* @__PURE__ */ o("tr", { className: "border-b border-slate-800/50 text-slate-300", children: [
          /* @__PURE__ */ t("td", { className: "p-2", children: i }),
          /* @__PURE__ */ o("td", { className: "p-2", children: [
            /* @__PURE__ */ t($e, { className: "bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/15", children: "saved" }),
            /* @__PURE__ */ t("span", { className: "ml-2 text-xs text-slate-500", children: typeof l == "object" && l !== null ? Object.keys(l).join(", ") : String(l) })
          ] })
        ] }, i)) })
      ] }) })
    ] }),
    /* @__PURE__ */ t(Y, { className: "border-slate-800 bg-slate-900/60", children: /* @__PURE__ */ t(Z, { className: "pt-6", children: /* @__PURE__ */ o("p", { className: "text-sm text-slate-400", children: [
      "The ",
      /* @__PURE__ */ t("code", { className: "text-cyan-300", children: "SERPER" }),
      " API key is configured in the pipeline's",
      " ",
      /* @__PURE__ */ t("code", { className: "text-cyan-300", children: ".env" }),
      " file. For security it is never displayed here."
    ] }) }) })
  ] });
}
function rs({ attachments: e, onRemove: a }) {
  return e.length === 0 ? null : /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-2", "aria-label": "Images attached to the queued message", children: e.map((r) => /* @__PURE__ */ o(
    "div",
    {
      className: "flex max-w-56 items-center gap-2 rounded-md border border-slate-700 bg-slate-900 px-2.5 py-2 text-xs text-slate-300",
      children: [
        /* @__PURE__ */ t(Ha, { className: "h-3.5 w-3.5 shrink-0 text-cyan-300", "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { className: "truncate", children: r.filename }),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => a(r.id),
            "aria-label": `Remove ${r.filename}`,
            className: "ml-auto rounded p-0.5 text-slate-500 hover:bg-slate-800 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400",
            children: /* @__PURE__ */ t(jt, { className: "h-3.5 w-3.5" })
          }
        )
      ]
    },
    r.id
  )) });
}
function os({
  attachments: e,
  disabled: a,
  onAttach: r,
  onRemoveAttachment: s,
  onSend: i
}) {
  const [l, n] = b(""), c = et(null), p = async () => {
    const d = l.trim();
    if (!(!d || a)) {
      n("");
      try {
        await i(d);
      } catch {
        n(d);
      }
    }
  };
  return /* @__PURE__ */ o("div", { className: "space-y-3 border-t border-slate-800 bg-slate-900/65 p-4", children: [
    /* @__PURE__ */ t(rs, { attachments: e, onRemove: s }),
    /* @__PURE__ */ t("label", { className: "block text-[11px] font-semibold text-slate-500", htmlFor: "assistant-message", children: "Message" }),
    /* @__PURE__ */ t(
      "textarea",
      {
        id: "assistant-message",
        value: l,
        disabled: a,
        onChange: (d) => n(d.target.value),
        onKeyDown: (d) => {
          d.key === "Enter" && !d.shiftKey && (d.preventDefault(), p());
        },
        placeholder: "Describe what you want to search, process, draft, or troubleshoot",
        className: "min-h-24 w-full resize-y rounded-md border border-slate-700 bg-slate-950 px-3 py-3 text-sm leading-6 text-slate-100 outline-none placeholder:text-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/25 disabled:opacity-50"
      }
    ),
    /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ t(
        "input",
        {
          ref: c,
          type: "file",
          accept: "image/png,image/jpeg,image/webp,image/gif",
          multiple: !0,
          className: "hidden",
          onChange: (d) => {
            d.target.files && r(d.target.files), d.target.value = "";
          }
        }
      ),
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          disabled: a || e.length >= 5,
          onClick: () => c.current?.click(),
          className: "inline-flex h-9 items-center gap-2 rounded-md border border-slate-700 bg-slate-900 px-3 text-xs font-medium text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-40",
          children: [
            /* @__PURE__ */ t(Ua, { className: "h-4 w-4" }),
            "Attach images"
          ]
        }
      ),
      /* @__PURE__ */ t("span", { className: "text-[10px] text-slate-600", children: "Enter to add, Shift+Enter for newline" }),
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          disabled: a || !l.trim(),
          onClick: () => {
            p();
          },
          className: "ml-auto inline-flex h-9 items-center gap-2 rounded-md bg-cyan-300 px-4 text-xs font-semibold text-cyan-950 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:opacity-40",
          children: [
            /* @__PURE__ */ t(gr, { className: "h-3.5 w-3.5" }),
            "Add to queue"
          ]
        }
      )
    ] })
  ] });
}
function ss({ messages: e, onEdit: a, onCancel: r, onRetry: s }) {
  const i = e.filter((n) => n.role === "user" && n.status === "queued"), l = e.filter((n) => n.role === "user" && [
    "failed",
    "cancelled",
    "awaiting_approval",
    "needs_handoff"
  ].includes(n.status)).slice(-4);
  return /* @__PURE__ */ o("aside", { className: "border-l border-slate-800 bg-slate-950/50 lg:w-72", "aria-label": "Message queue", children: [
    /* @__PURE__ */ o("div", { className: "border-b border-slate-800 px-4 py-3", children: [
      /* @__PURE__ */ t("div", { className: "text-xs font-semibold uppercase tracking-[0.12em] text-slate-400", children: "Message queue" }),
      /* @__PURE__ */ o("div", { className: "mt-1 text-xs text-slate-600", children: [
        i.length,
        " waiting"
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "max-h-64 space-y-2 overflow-auto p-3 lg:max-h-none", children: [
      i.map((n, c) => /* @__PURE__ */ o("div", { className: "rounded-md border border-slate-800 bg-slate-900/70 p-3", children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-cyan-300", children: [
          /* @__PURE__ */ o("span", { children: [
            "Queue ",
            c + 1
          ] }),
          /* @__PURE__ */ t("span", { className: "ml-auto text-slate-600", children: "waiting" })
        ] }),
        /* @__PURE__ */ t("p", { className: "mt-2 line-clamp-3 text-xs leading-5 text-slate-300", children: n.content }),
        /* @__PURE__ */ o("div", { className: "mt-3 flex gap-1", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => a(n),
              className: "rounded p-1.5 text-slate-500 hover:bg-slate-800 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400",
              "aria-label": "Edit queued message",
              children: /* @__PURE__ */ t(rr, { className: "h-3.5 w-3.5" })
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => r(n),
              className: "rounded p-1.5 text-rose-400 hover:bg-rose-950 hover:text-rose-200 focus:outline-none focus:ring-2 focus:ring-cyan-400",
              "aria-label": "Cancel queued message",
              children: /* @__PURE__ */ t(jt, { className: "h-3.5 w-3.5" })
            }
          )
        ] })
      ] }, n.id)),
      i.length === 0 && /* @__PURE__ */ t("p", { className: "px-1 py-5 text-xs leading-5 text-slate-600", children: "New messages wait here while the assistant is busy." }),
      l.map((n) => /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => s(n),
          className: "flex w-full items-center gap-2 rounded-md border border-slate-800 px-3 py-2 text-left text-xs text-slate-400 hover:border-slate-700 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400",
          children: [
            /* @__PURE__ */ t(Mt, { className: "h-3.5 w-3.5 shrink-0" }),
            /* @__PURE__ */ o("span", { className: "truncate", children: [
              "Retry ",
              n.status.replaceAll("_", " ")
            ] })
          ]
        },
        n.id
      ))
    ] })
  ] });
}
const is = {
  tool_start: Ka,
  tool_result: Ma,
  approval_required: St,
  browser_handoff_required: Rt,
  message_failed: kr
};
function ns({ event: e }) {
  const a = is[e.event_type] || At, r = typeof e.payload.tool_name == "string" ? e.payload.tool_name : e.event_type.replaceAll("_", " "), s = typeof e.payload.summary == "string" ? e.payload.summary : "", i = e.event_type === "approval_required" || e.event_type === "browser_handoff_required" || e.event_type === "message_failed";
  return /* @__PURE__ */ o("details", { className: `group rounded-md border px-3 py-2 text-xs ${i ? "border-amber-800/80 bg-amber-950/25 text-amber-100" : "border-slate-800 bg-slate-950/70 text-slate-400"}`, children: [
    /* @__PURE__ */ o("summary", { className: "flex cursor-pointer list-none items-center gap-2 font-medium outline-none focus-visible:ring-2 focus-visible:ring-cyan-400", children: [
      /* @__PURE__ */ t(a, { className: `h-3.5 w-3.5 ${e.event_type === "tool_start" ? "animate-spin" : ""}` }),
      /* @__PURE__ */ t("span", { className: "truncate", children: r }),
      /* @__PURE__ */ t("span", { className: "ml-auto text-[10px] uppercase tracking-[0.1em] opacity-70", children: e.event_type.replaceAll("_", " ") })
    ] }),
    /* @__PURE__ */ t("div", { className: "mt-2 border-t border-current/15 pt-2 leading-5 opacity-80", children: s || "No content was stored in the tool audit event." })
  ] });
}
function ls({ messages: e, events: a, loading: r }) {
  const s = e.filter((i) => i.status !== "queued" && i.status !== "cancelled");
  return !r && s.length === 0 && a.length === 0 ? /* @__PURE__ */ o("div", { className: "flex min-h-72 flex-col items-center justify-center px-8 text-center", children: [
    /* @__PURE__ */ t(Ye, { className: "h-8 w-8 text-cyan-300", "aria-hidden": "true" }),
    /* @__PURE__ */ t("p", { className: "mt-4 text-sm font-medium text-slate-200", children: "Ready for a connection question." }),
    /* @__PURE__ */ t("p", { className: "mt-2 max-w-md text-sm leading-6 text-slate-500", children: "Ask the assistant to search, inspect a page with only-cli, process job data, or prepare a local application draft." })
  ] }) : /* @__PURE__ */ o("div", { className: "space-y-6 p-5", "aria-live": "polite", "aria-busy": r, children: [
    s.map((i) => {
      const l = a.filter((c) => c.message_id === i.id && [
        "tool_start",
        "tool_result",
        "approval_required",
        "browser_handoff_required",
        "message_failed"
      ].includes(c.event_type)), n = i.role === "user";
      return /* @__PURE__ */ o("article", { className: "grid grid-cols-[28px_minmax(0,1fr)] gap-3", children: [
        /* @__PURE__ */ t("div", { className: `mt-0.5 flex h-7 w-7 items-center justify-center rounded-md ${n ? "bg-slate-800 text-slate-300" : "bg-cyan-400/10 text-cyan-200"}`, children: n ? /* @__PURE__ */ t(Aa, { className: "h-4 w-4" }) : /* @__PURE__ */ t(Ye, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ o("div", { className: "min-w-0", children: [
          /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500", children: n ? "You" : "Assistant" }),
            i.status !== "completed" && /* @__PURE__ */ t("span", { className: "rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400", children: i.status.replaceAll("_", " ") })
          ] }),
          /* @__PURE__ */ t("div", { className: "mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-200", children: i.content }),
          l.length > 0 && /* @__PURE__ */ t("div", { className: "mt-3 space-y-2", children: l.map((c) => /* @__PURE__ */ t(ns, { event: c }, c.id)) })
        ] })
      ] }, i.id);
    }),
    r && /* @__PURE__ */ o("div", { className: "flex items-center gap-2 text-xs text-slate-500", role: "status", children: [
      /* @__PURE__ */ t("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" }),
      "Assistant is processing the queue."
    ] })
  ] });
}
async function cs(e) {
  return new Promise((a, r) => {
    const s = new FileReader();
    s.onerror = () => r(new Error(`Could not read ${e.name}.`)), s.onload = () => {
      const i = String(s.result || "");
      a(i.includes(",") ? i.split(",", 2)[1] : i);
    }, s.readAsDataURL(e);
  });
}
function Se(e) {
  return !!(e?.ready && e.reachable && e.authenticated && e.model_count > 0);
}
function ds(e) {
  if (e === "Crew-managed FreeChain") return "FreeChain in Crew";
  switch (e) {
    case "saved":
      return "Encrypted local storage";
    case "configured file":
      return "Configured local file";
    case "FreeChain file":
      return "Local FreeChain file";
    case "environment":
      return "Process environment";
    default:
      return "Unavailable";
  }
}
function ps(e) {
  return e ? e.credential_configured ? e.reachable ? e.authenticated ? e.model_count < 1 ? "Provider returned no usable models." : e.ready ? "Provider and model probe succeeded." : "Provider needs attention." : "Provider authorization failed." : "Provider is unreachable." : "Provider key is not configured." : "Provider readiness is unavailable.";
}
async function kt(e) {
  const [a, r] = await Promise.all([
    S.providerCredentialStatus(),
    S.assistantProviders()
  ]), s = r.find((c) => c.name === e) || r.find((c) => Se(c)) || r[0], i = s?.name || e || "FreeChain";
  let l = [], n = !1;
  if (Se(s))
    try {
      l = (await S.assistantModels(i)).filter((p) => typeof p == "string" && p.trim()).slice(0, 200), n = l.length === 0;
    } catch {
      n = !0;
    }
  return { credential: a, providers: r, provider: i, models: l, modelProbeFailed: n };
}
function us() {
  const [e, a] = b([]), [r, s] = b("FreeChain"), [i, l] = b([]), [n, c] = b(""), [p, d] = b(!1), [m, f] = b(!1), [h, C] = b(null), [x, N] = b(null), [_, $] = b(""), [M, D] = b(null), [q, z] = b([]), [u, R] = b([]), [v, L] = b([]), [X, re] = b(!1), [E, de] = b(!0), [ge, I] = b(""), [ee, ie] = b(!1), pe = Re(
    () => e.find((w) => w.name === r),
    [r, e]
  ), ae = Se(pe) && !p && !m && i.length > 0, P = M?.id, oe = fe(async (w) => {
    const T = w || M?.id;
    if (!T) return;
    const [B, V] = await Promise.all([
      S.assistantMessages(T),
      S.assistantEvents(T)
    ]);
    z(B), R(V);
  }, [M?.id]), Pe = (w, T) => {
    C(w.credential), a(w.providers), s(w.provider), l(w.models), d(w.modelProbeFailed), f(!1), c(
      T && w.models.includes(T) ? T : w.models[0] || ""
    );
  }, be = (w) => {
    w && C(w), a((T) => T.map((B) => B.name === r ? {
      ...B,
      ready: !1,
      reachable: !1,
      authenticated: !1,
      model_count: 0,
      credential_configured: w?.configured ?? B.credential_configured
    } : B)), l([]), c(""), d(!0), f(!0);
  }, ke = async (w, T = !1) => {
    const B = await kt(w || r);
    if (Pe(B, n), B.modelProbeFailed && I("The provider model probe failed. Restore provider access, then refresh readiness."), T && !M && B.models.length > 0) {
      const V = B.providers.find((W) => W.name === B.provider);
      if (Se(V) && !B.modelProbeFailed) {
        const W = await S.assistantCreate({
          provider: B.provider,
          model: B.models[0],
          title: "Job hunting control",
          allow_image_upload: ee
        });
        D(W), z([]), R([]), L([]);
      }
    }
    return B;
  }, G = async (w) => {
    re(!0), I("");
    try {
      await ke(w, !0);
    } catch {
      be(), I("Provider readiness could not be refreshed. Try again after the local provider recovers.");
    } finally {
      re(!1);
    }
  };
  K(() => {
    let w = !0;
    return (async () => {
      try {
        const B = (await S.assistantConversations())[0] || null, V = await kt(B?.provider);
        if (!w) return;
        Pe(V, B?.model);
        let W = B;
        const We = V.providers.find((ca) => ca.name === V.provider);
        if (!W && Se(We) && V.models.length > 0 && (W = await S.assistantCreate({
          provider: V.provider,
          model: V.models[0],
          title: "Job hunting control"
        })), !w || !W) return;
        D(W), ie(W.allow_image_upload);
        const [Ue, la] = await Promise.all([
          S.assistantMessages(W.id),
          S.assistantEvents(W.id)
        ]);
        if (!w) return;
        z(Ue), R(la);
      } catch {
        w && (a([]), l([]), c(""), d(!0), f(!0), I("The assistant could not connect safely. Refresh provider readiness to try again."));
      } finally {
        w && de(!1);
      }
    })(), () => {
      w = !1;
    };
  }, []);
  const H = async (w) => {
    if (!(w === "clear" && !window.confirm(
      "Clear the encrypted key saved for the current Windows user? The provider will remain unavailable until a key is re-imported."
    ))) {
      N(w), $(""), I(""), w === "clear" && be();
      try {
        let T;
        try {
          T = w === "reimport" ? await S.providerCredentialReimport() : await S.providerCredentialClear();
        } catch {
          I(
            w === "reimport" ? "The local key could not be re-imported. Try again or refresh provider readiness." : "The saved key could not be cleared. Try again before another person uses this account."
          );
          return;
        }
        if (!(w === "reimport" ? T.configured && (Q || T.saved) : !T.configured && !T.saved)) {
          be(T), I(
            w === "reimport" ? "The local key was found but could not be saved. Check local encryption availability and try again." : "The saved key could not be cleared. Try again before another person uses this account."
          );
          return;
        }
        w === "clear" && be(T);
        let V;
        try {
          V = await ke(r, !0);
        } catch {
          be(T), I(
            w === "reimport" ? "The local key was saved, but provider readiness could not be refreshed. Refresh provider readiness to continue." : "The saved key was cleared, but provider readiness could not be refreshed. Refresh provider readiness to continue."
          );
          return;
        }
        const W = V.providers.find((Ue) => Ue.name === V.provider), We = Se(W) && !V.modelProbeFailed && V.models.length > 0;
        $(
          w === "reimport" ? We ? "Local key re-imported. Provider is ready." : "Local key re-imported. Provider still needs attention." : "Saved key cleared. Provider readiness and models refreshed."
        );
      } finally {
        N(null);
      }
    }
  };
  K(() => {
    if (!P) return;
    const w = window.setInterval(() => {
      oe(P).catch(() => {
      });
    }, 2e3);
    return () => window.clearInterval(w);
  }, [P, oe]);
  const Ne = async () => {
    if (!ae || !n) {
      I("A ready provider with at least one verified model is required for a new conversation.");
      return;
    }
    re(!0), I("");
    try {
      const w = await S.assistantCreate({
        provider: r,
        model: n,
        title: "Job hunting control",
        allow_image_upload: ee
      });
      D(w), z([]), R([]), L([]);
    } catch {
      I("The conversation could not be created. Refresh provider readiness and try again.");
    } finally {
      re(!1);
    }
  }, Me = async (w) => {
    re(!0);
    try {
      for (let T = 0; T < 50 && (await S.assistantQueue(w)).length !== 0; T += 1)
        await S.assistantRun(w), await oe(w);
    } catch {
      I("The assistant queue stopped safely. Check provider readiness before retrying.");
    } finally {
      re(!1), await oe(w).catch(() => {
      });
    }
  }, F = async (w) => {
    if (!M || !ae || !n)
      throw I("Restore provider readiness and select a verified model before sending."), new Error();
    I(""), await S.assistantSend(M.id, {
      content: w,
      attachment_ids: v.map((T) => T.id)
    }), L([]), await oe(M.id), Me(M.id);
  }, Oe = async (w) => {
    if (M) {
      I("");
      try {
        const T = Math.max(0, 5 - v.length), B = Array.from(w).slice(0, T), V = [];
        for (const W of B)
          V.push(await S.assistantAttach(M.id, {
            filename: W.name,
            mime_type: W.type,
            data_base64: await cs(W)
          }));
        L((W) => [...W, ...V]);
      } catch {
        I("The image could not be attached. Try the file again after checking the local service.");
      }
    }
  }, _e = async (w) => {
    const T = window.prompt("Edit queued message", w.content);
    !T || T.trim() === w.content || (await S.assistantEdit(w.id, T), await oe(w.conversation_id));
  }, Ce = async (w) => {
    await S.assistantCancel(w.id), await oe(w.conversation_id);
  }, Ee = async (w) => {
    const T = await S.assistantRetry(w.id);
    await oe(w.conversation_id), Me(T.conversation_id);
  }, ze = async () => {
    !M || !window.confirm("Clear this local transcript and its image attachments?") || (await S.assistantClear(M.id), z([]), R([]), L([]));
  }, na = h ? h.saved ? "Encrypted and saved for the current Windows user." : h.configured ? "Available for this session, but not saved for the current Windows user." : "Provider key is not saved for the current Windows user." : "Checking saved key status.", lt = m ? "Refresh provider readiness to restore model-dependent actions." : pe?.credential_configured ? pe?.reachable ? pe?.authenticated ? ae ? "" : "No verified models are available. Refresh provider readiness after the provider recovers." : "Re-import a local key, then refresh provider readiness." : "Start or reconnect the local provider, then refresh provider readiness." : "Re-import a local key, then refresh provider readiness.";
  return /* @__PURE__ */ o("section", { className: "mx-auto flex min-h-[calc(100vh-3rem)] max-w-[1600px] flex-col gap-5", children: [
    /* @__PURE__ */ o("header", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ o("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ t("h1", { className: "text-3xl font-semibold tracking-[-0.03em] text-slate-50", children: "Connection assistant" }),
        /* @__PURE__ */ t("p", { className: "mt-2 text-sm leading-6 text-slate-400", children: "Queue requests, add image context, run only-cli and pipeline tools, and keep external actions behind exact approval." })
      ] }),
      /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            disabled: X || !M,
            onClick: () => {
              ze();
            },
            className: "inline-flex h-9 items-center gap-2 rounded-md border border-slate-700 px-3 text-xs text-slate-400 hover:bg-slate-900 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-40",
            children: [
              /* @__PURE__ */ t(xr, { className: "h-3.5 w-3.5" }),
              "Clear transcript"
            ]
          }
        ),
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            disabled: X || E || !!x || !ae || !n,
            onClick: () => {
              Ne();
            },
            className: "inline-flex h-9 items-center gap-2 rounded-md bg-cyan-300 px-3 text-xs font-semibold text-cyan-950 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 disabled:opacity-40",
            children: [
              /* @__PURE__ */ t(Pt, { className: "h-3.5 w-3.5" }),
              "New conversation"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 shadow-[0_18px_55px_rgba(0,0,0,0.28)]", children: [
      /* @__PURE__ */ o("div", { className: "grid gap-3 border-b border-slate-800 p-4 md:grid-cols-[minmax(180px,1fr)_minmax(180px,1fr)_auto]", children: [
        /* @__PURE__ */ o("label", { className: "text-[11px] font-semibold text-slate-500", children: [
          "Provider",
          /* @__PURE__ */ t(
            "select",
            {
              value: r,
              disabled: E || X || !!x,
              onChange: (w) => {
                s(w.target.value), l([]), c(""), G(w.target.value);
              },
              className: "mt-2 h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:cursor-not-allowed disabled:opacity-50",
              children: e.map((w) => /* @__PURE__ */ t("option", { children: w.name }, w.name))
            }
          )
        ] }),
        /* @__PURE__ */ o("label", { className: "text-[11px] font-semibold text-slate-500", children: [
          "Model",
          /* @__PURE__ */ t(
            "select",
            {
              value: n,
              disabled: i.length === 0 || X || !!x,
              onChange: (w) => c(w.target.value),
              className: "mt-2 h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:cursor-not-allowed disabled:opacity-50",
              children: i.map((w) => /* @__PURE__ */ t("option", { children: w }, w))
            }
          )
        ] }),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            disabled: E || X || !!x,
            onClick: () => {
              G(r);
            },
            "aria-label": "Refresh provider readiness and models",
            className: "mt-5 inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:cursor-not-allowed disabled:opacity-40",
            children: /* @__PURE__ */ t(Le, { className: "h-4 w-4" })
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "border-b border-slate-800 px-4 py-3", children: [
        /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ t("span", { className: `rounded-full border px-2 py-1 text-[10px] font-medium ${ae ? "border-emerald-800 bg-emerald-950/40 text-emerald-300" : "border-amber-800 bg-amber-950/35 text-amber-300"}`, children: ae ? "Provider ready" : "Provider needs attention" }),
          ae ? /* @__PURE__ */ o("span", { className: "rounded-full border border-slate-700 px-2 py-1 text-[10px] text-slate-400", children: [
            i.length,
            " model",
            i.length === 1 ? "" : "s"
          ] }) : /* @__PURE__ */ t("span", { className: "rounded-full border border-slate-700 px-2 py-1 text-[10px] text-slate-400", children: "No verified models" }),
          /* @__PURE__ */ o("label", { className: "ml-auto flex cursor-pointer items-center gap-2 text-[10px] text-slate-500", children: [
            /* @__PURE__ */ t(
              "input",
              {
                type: "checkbox",
                checked: ee,
                onChange: (w) => ie(w.target.checked),
                className: "h-3.5 w-3.5 accent-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              }
            ),
            "Share images with provider on new conversations"
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start", children: [
          /* @__PURE__ */ o("div", { className: "min-w-0 text-xs leading-5 text-slate-400", children: [
            /* @__PURE__ */ t("p", { className: "break-words text-slate-300", children: m ? "Provider readiness must be refreshed." : ps(pe) }),
            lt && /* @__PURE__ */ t("p", { className: "mt-1 break-words text-amber-300", children: lt }),
            /* @__PURE__ */ o("p", { className: "mt-2 inline-flex max-w-full items-start gap-1.5 break-words text-slate-500", children: [
              /* @__PURE__ */ t(St, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }),
              /* @__PURE__ */ o("span", { className: "min-w-0 break-words", children: [
                na,
                " Source: ",
                ds(h?.source),
                "."
              ] })
            ] }),
            /* @__PURE__ */ t("p", { className: "mt-1 break-words text-slate-500", children: Q ? "Provider credentials stay in the FreeChain Crew app. This workspace keeps its own conversations." : "The encrypted key is tied to the current Windows user and should be cleared before another person uses the same account." })
          ] }),
          /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-2 lg:justify-end", children: [
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                disabled: !!x || E,
                onClick: () => {
                  H("reimport");
                },
                className: "inline-flex h-9 items-center rounded-md border border-slate-700 px-3 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:cursor-not-allowed disabled:opacity-40",
                children: Q ? x === "reimport" ? "Reconnecting" : "Reconnect provider" : x === "reimport" ? "Re-importing local key" : "Re-import local key"
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                disabled: !!x || E || (Q ? !h?.configured : !h?.saved),
                onClick: () => {
                  H("clear");
                },
                className: "inline-flex h-9 items-center rounded-md border border-slate-700 px-3 text-xs font-medium text-slate-300 hover:border-rose-800 hover:text-rose-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:cursor-not-allowed disabled:opacity-40",
                children: Q ? x === "clear" ? "Disconnecting" : "Disconnect this workspace" : x === "clear" ? "Clearing saved key" : "Clear saved key"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ t("div", { role: "status", "aria-live": "polite", "aria-atomic": "true", className: "min-h-5 pt-2 text-xs text-cyan-200", children: _ })
      ] }),
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2 border-b border-slate-800 px-4 py-3 text-xs text-slate-500", children: [
        /* @__PURE__ */ t(rt, { className: "h-3.5 w-3.5 text-cyan-300" }),
        M && ae ? `Ready in ${M.title}` : M ? "Existing conversation preserved. Restore provider access to continue." : ae ? "Ready to create a conversation" : "Connecting to the local control service"
      ] }),
      ge && /* @__PURE__ */ t("div", { role: "alert", className: "border-b border-rose-900 bg-rose-950/35 px-4 py-3 text-sm text-rose-200", children: ge }),
      /* @__PURE__ */ o("div", { className: "grid min-h-[460px] lg:grid-cols-[minmax(0,1fr)_288px]", children: [
        /* @__PURE__ */ o("div", { className: "flex min-w-0 flex-col", children: [
          /* @__PURE__ */ t("div", { className: "min-h-0 flex-1 overflow-auto", children: /* @__PURE__ */ t(ls, { messages: q, events: u, loading: E || X }) }),
          /* @__PURE__ */ t(
            os,
            {
              attachments: v,
              disabled: !M || E || !ae || !n,
              onAttach: (w) => {
                Oe(w);
              },
              onRemoveAttachment: (w) => L((T) => T.filter((B) => B.id !== w)),
              onSend: F
            }
          )
        ] }),
        /* @__PURE__ */ t(ss, { messages: q, onEdit: _e, onCancel: Ce, onRetry: Ee })
      ] })
    ] })
  ] });
}
function hs(e) {
  return e ? new Intl.DateTimeFormat(void 0, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(e)) : "Not scheduled";
}
function ms() {
  const [e, a] = b([]), [r, s] = b("Recruiting discovery and scoring"), [i, l] = b(360), [n, c] = b(250), [p, d] = b(72), [m, f] = b(!1), [h, C] = b(""), [x, N] = b(""), _ = async () => a(await S.schedulesList());
  K(() => {
    let z = !0;
    return S.schedulesList().then((u) => {
      z && a(u);
    }).catch((u) => {
      z && N(u instanceof Error ? u.message : "Schedules could not load.");
    }), () => {
      z = !1;
    };
  }, []);
  const $ = async () => {
    f(!0), N(""), C("");
    const z = {
      name: "scheduled-recruiting-hunt",
      steps: [{
        id: "discover_score_report",
        tool: "jobs.pipeline.run",
        arguments: {
          max_jobs: n,
          concurrency: 4,
          min_score: p
        },
        max_attempts: 2
      }]
    };
    try {
      await S.schedulesCreate({
        name: r,
        workflow: z,
        recurrence: {
          kind: "interval",
          interval_minutes: i,
          local_time: "",
          timezone_name: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
        }
      }), await _(), C("Automation saved. It can discover, score, store, and report without submitting applications.");
    } catch (u) {
      N(u instanceof Error ? u.message : "Automation could not be saved.");
    } finally {
      f(!1);
    }
  }, M = async (z) => {
    f(!0);
    try {
      await S.schedulesToggle(z.id, !z.enabled), await _();
    } finally {
      f(!1);
    }
  }, D = async () => {
    f(!0), N("");
    try {
      const z = await S.schedulesRunDue();
      C(z.length ? `Completed ${z.length} due automation run.` : "No automation is due right now."), await _();
    } catch (z) {
      N(z instanceof Error ? z.message : "Due automations could not run.");
    } finally {
      f(!1);
    }
  }, q = async () => {
    f(!0), N("");
    try {
      const z = await S.schedulesInstallWake();
      if (z.code !== 0) throw new Error(z.output || "Background wake installation failed.");
      C("Background wake installed. Due schedules can now recover after app restarts.");
    } catch (z) {
      N(z instanceof Error ? z.message : "Background wake installation failed.");
    } finally {
      f(!1);
    }
  };
  return /* @__PURE__ */ o("section", { className: "mx-auto max-w-[1500px] space-y-7", children: [
    /* @__PURE__ */ o("header", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ o("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ t("h1", { className: "text-3xl font-semibold tracking-[-0.03em] text-slate-50", children: "Automations" }),
        /* @__PURE__ */ t("p", { className: "mt-2 text-sm leading-6 text-slate-400", children: "Restart-safe scheduled discovery, scoring, data processing, and local draft work." })
      ] }),
      /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            disabled: m,
            onClick: () => {
              q();
            },
            className: "inline-flex h-10 items-center gap-2 rounded-md border border-slate-700 bg-slate-900 px-4 text-sm text-slate-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-40",
            children: [
              /* @__PURE__ */ t(La, { className: "h-4 w-4" }),
              "Install background wake"
            ]
          }
        ),
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            disabled: m,
            onClick: () => {
              D();
            },
            className: "inline-flex h-10 items-center gap-2 rounded-md border border-slate-700 bg-slate-900 px-4 text-sm text-slate-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-40",
            children: [
              /* @__PURE__ */ t(tt, { className: "h-4 w-4" }),
              "Run due now"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]", children: [
      /* @__PURE__ */ o("div", { className: "overflow-hidden rounded-lg border border-slate-800 bg-slate-900/35", children: [
        /* @__PURE__ */ o("div", { className: "grid grid-cols-[minmax(0,1fr)_160px_100px] border-b border-slate-800 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500", children: [
          /* @__PURE__ */ t("span", { children: "Workflow" }),
          /* @__PURE__ */ t("span", { children: "Next run" }),
          /* @__PURE__ */ t("span", { children: "Status" })
        ] }),
        e.map((z) => /* @__PURE__ */ o("div", { className: "grid grid-cols-[minmax(0,1fr)_160px_100px] items-center border-b border-slate-800/80 px-4 py-4 last:border-b-0", children: [
          /* @__PURE__ */ o("div", { className: "min-w-0 pr-4", children: [
            /* @__PURE__ */ t("div", { className: "truncate text-sm font-medium text-slate-100", children: z.name }),
            /* @__PURE__ */ t("div", { className: "mt-1 text-xs text-slate-500", children: z.recurrence.kind === "interval" ? `Every ${z.recurrence.interval_minutes} minutes` : `Daily at ${z.recurrence.local_time}` })
          ] }),
          /* @__PURE__ */ t("div", { className: "font-mono text-xs tabular-nums text-slate-400", children: hs(z.next_run_at) }),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              disabled: m,
              onClick: () => {
                M(z);
              },
              "aria-pressed": z.enabled,
              className: `rounded-full border px-2.5 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400 ${z.enabled ? "border-emerald-800 bg-emerald-950/40 text-emerald-300" : "border-slate-700 text-slate-500"}`,
              children: z.enabled ? "Enabled" : "Paused"
            }
          )
        ] }, z.id)),
        e.length === 0 && /* @__PURE__ */ o("div", { className: "px-6 py-16 text-center", children: [
          /* @__PURE__ */ t(Ct, { className: "mx-auto h-7 w-7 text-cyan-300" }),
          /* @__PURE__ */ t("p", { className: "mt-4 text-sm font-medium text-slate-200", children: "No scheduled hunts yet." }),
          /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-slate-500", children: "Create one from the controls beside this list." })
        ] })
      ] }),
      /* @__PURE__ */ o("div", { className: "self-start rounded-lg border border-slate-800 bg-slate-900/45 p-5", children: [
        /* @__PURE__ */ t("h2", { className: "text-lg font-semibold tracking-[-0.02em] text-slate-100", children: "Schedule a job hunt" }),
        /* @__PURE__ */ t("p", { className: "mt-2 text-xs leading-5 text-slate-500", children: "Each run processes a large bounded batch. Missed intervals coalesce into one recovery run." }),
        /* @__PURE__ */ o("div", { className: "mt-5 space-y-4", children: [
          /* @__PURE__ */ o("label", { className: "block text-xs font-medium text-slate-400", children: [
            "Name",
            /* @__PURE__ */ t(
              "input",
              {
                value: r,
                onChange: (z) => s(z.target.value),
                className: "mt-2 h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-cyan-400"
              }
            )
          ] }),
          /* @__PURE__ */ o("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ o("label", { className: "block text-xs font-medium text-slate-400", children: [
              "Every, minutes",
              /* @__PURE__ */ t(
                "input",
                {
                  type: "number",
                  min: 5,
                  max: 10080,
                  value: i,
                  onChange: (z) => l(Number(z.target.value)),
                  className: "mt-2 h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 font-mono text-sm text-slate-100 outline-none focus:ring-2 focus:ring-cyan-400"
                }
              )
            ] }),
            /* @__PURE__ */ o("label", { className: "block text-xs font-medium text-slate-400", children: [
              "Jobs per run",
              /* @__PURE__ */ t(
                "input",
                {
                  type: "number",
                  min: 1,
                  max: 500,
                  value: n,
                  onChange: (z) => c(Number(z.target.value)),
                  className: "mt-2 h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 font-mono text-sm text-slate-100 outline-none focus:ring-2 focus:ring-cyan-400"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ o("label", { className: "block text-xs font-medium text-slate-400", children: [
            "Minimum fit score",
            /* @__PURE__ */ t(
              "input",
              {
                type: "number",
                min: 0,
                max: 100,
                value: p,
                onChange: (z) => d(Number(z.target.value)),
                className: "mt-2 h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 font-mono text-sm text-slate-100 outline-none focus:ring-2 focus:ring-cyan-400"
              }
            )
          ] }),
          /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              disabled: m || !r.trim(),
              onClick: () => {
                $();
              },
              className: "inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-cyan-300 text-sm font-semibold text-cyan-950 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 disabled:opacity-40",
              children: [
                /* @__PURE__ */ t(Pt, { className: "h-4 w-4" }),
                "Create automation"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "mt-5 flex gap-2 border-t border-slate-800 pt-4 text-xs leading-5 text-slate-500", children: [
          /* @__PURE__ */ t(rt, { className: "mt-0.5 h-4 w-4 shrink-0 text-cyan-300" }),
          "Submissions and employer messages cannot be placed in unattended schedules. Draft preparation remains local and review-required."
        ] })
      ] })
    ] }),
    (h || x) && /* @__PURE__ */ t("div", { role: x ? "alert" : "status", className: `rounded-md border px-4 py-3 text-sm ${x ? "border-rose-900 bg-rose-950/35 text-rose-200" : "border-emerald-900 bg-emerald-950/30 text-emerald-200"}`, children: x || h })
  ] });
}
function gs() {
  const [e, a] = b([]), [r, s] = b("web.only_cli.sites"), [i, l] = b('{"args":[]}'), [n, c] = b(null), [p, d] = b(!1), [m, f] = b("");
  K(() => {
    let N = !0;
    return S.toolsList().then((_) => {
      if (!N) return;
      a(_);
      const $ = _.find((M) => M.name === "web.only_cli.sites") || _[0];
      $ && s($.name);
    }).catch((_) => {
      N && f(_ instanceof Error ? _.message : "Tools could not load.");
    }), () => {
      N = !1;
    };
  }, []);
  const h = Re(
    () => e.find((N) => N.name === r),
    [r, e]
  ), C = () => ({
    name: "interactive-web-workbench",
    steps: [{
      id: "command",
      tool: r,
      arguments: JSON.parse(i),
      max_attempts: 1
    }]
  }), x = async (N) => {
    d(!0), f(""), c(null);
    try {
      const _ = C();
      c(N ? await S.workflowsDryRun(_) : await S.workflowsRun(_));
    } catch (_) {
      f(_ instanceof Error ? _.message : "Workflow could not run.");
    } finally {
      d(!1);
    }
  };
  return /* @__PURE__ */ o("section", { className: "mx-auto max-w-[1500px] space-y-7", children: [
    /* @__PURE__ */ o("header", { className: "max-w-3xl", children: [
      /* @__PURE__ */ t("h1", { className: "text-3xl font-semibold tracking-[-0.03em] text-slate-50", children: "Web workbench" }),
      /* @__PURE__ */ t("p", { className: "mt-2 text-sm leading-6 text-slate-400", children: "Inspect the typed agent tool surface, dry-run workflows, and execute bounded only-cli or pipeline operations." })
    ] }),
    /* @__PURE__ */ o("div", { className: "grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]", children: [
      /* @__PURE__ */ o("div", { className: "rounded-lg border border-slate-800 bg-slate-900/45 p-5", children: [
        /* @__PURE__ */ o("label", { className: "block text-xs font-medium text-slate-400", children: [
          "Tool",
          /* @__PURE__ */ t(
            "select",
            {
              value: r,
              onChange: (N) => s(N.target.value),
              className: "mt-2 h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-cyan-400",
              children: e.map((N) => /* @__PURE__ */ t("option", { children: N.name }, N.name))
            }
          )
        ] }),
        /* @__PURE__ */ t("p", { className: "mt-3 min-h-12 text-xs leading-5 text-slate-500", children: h?.description || "Waiting for the local tool catalog." }),
        /* @__PURE__ */ o("div", { className: "mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-slate-500", children: [
          /* @__PURE__ */ t(rt, { className: "h-3.5 w-3.5 text-cyan-300" }),
          "Policy: ",
          h?.policy?.replaceAll("_", " ") || "unknown"
        ] }),
        /* @__PURE__ */ o("label", { className: "mt-5 block text-xs font-medium text-slate-400", children: [
          "Arguments, JSON",
          /* @__PURE__ */ t(
            "textarea",
            {
              value: i,
              onChange: (N) => l(N.target.value),
              spellCheck: !1,
              className: "mt-2 min-h-44 w-full resize-y rounded-md border border-slate-700 bg-slate-950 p-3 font-mono text-xs leading-5 text-slate-200 outline-none focus:ring-2 focus:ring-cyan-400"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "mt-4 grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              disabled: p || !h,
              onClick: () => {
                x(!0);
              },
              className: "inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-700 text-sm text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-40",
              children: [
                /* @__PURE__ */ t(Ca, { className: "h-4 w-4" }),
                "Dry run"
              ]
            }
          ),
          /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              disabled: p || !h,
              onClick: () => {
                x(!1);
              },
              className: "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-cyan-300 text-sm font-semibold text-cyan-950 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 disabled:opacity-40",
              children: [
                /* @__PURE__ */ t(tt, { className: "h-4 w-4" }),
                "Execute"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ o("div", { className: "min-w-0 overflow-hidden rounded-lg border border-slate-800 bg-slate-950/65", children: [
        /* @__PURE__ */ o("div", { className: "flex items-center justify-between border-b border-slate-800 px-4 py-3", children: [
          /* @__PURE__ */ t("span", { className: "text-xs font-semibold uppercase tracking-[0.12em] text-slate-400", children: "Structured result" }),
          /* @__PURE__ */ t("span", { className: "font-mono text-[10px] text-slate-600", children: "content remains local" })
        ] }),
        m ? /* @__PURE__ */ t("div", { role: "alert", className: "m-4 rounded-md border border-rose-900 bg-rose-950/35 px-4 py-3 text-sm text-rose-200", children: m }) : /* @__PURE__ */ t("pre", { className: "min-h-[480px] overflow-auto p-5 font-mono text-xs leading-6 text-slate-300", children: n ? JSON.stringify(n, null, 2) : "Run a dry check or execute a typed workflow to inspect its result." })
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "overflow-hidden rounded-lg border border-slate-800", children: [
      /* @__PURE__ */ o("div", { className: "grid grid-cols-[minmax(220px,1fr)_130px_minmax(260px,2fr)] bg-slate-900 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500", children: [
        /* @__PURE__ */ t("span", { children: "Tool" }),
        /* @__PURE__ */ t("span", { children: "Policy" }),
        /* @__PURE__ */ t("span", { children: "Purpose" })
      ] }),
      e.map((N) => /* @__PURE__ */ o("div", { className: "grid grid-cols-[minmax(220px,1fr)_130px_minmax(260px,2fr)] border-t border-slate-800 px-4 py-3 text-xs", children: [
        /* @__PURE__ */ t("code", { className: "truncate font-mono text-cyan-200", children: N.name }),
        /* @__PURE__ */ t("span", { className: "text-slate-500", children: N.policy.replaceAll("_", " ") }),
        /* @__PURE__ */ t("span", { className: "text-slate-400", children: N.description })
      ] }, N.name))
    ] })
  ] });
}
const bs = [
  { key: "dashboard", label: "Dashboard", icon: Ya },
  { key: "assistant", label: "Assistant", icon: er },
  { key: "automations", label: "Automations", icon: Ct },
  { key: "workbench", label: "Web workbench", icon: At },
  { key: "search", label: "Search", icon: Et },
  { key: "jobs", label: "Jobs", icon: Sa },
  { key: "applications", label: "Applications", icon: Ta },
  { key: "agents", label: "Agents", icon: _r },
  { key: "browser", label: "Browser", icon: Va },
  { key: "paperclip", label: "Paperclip", icon: Ye },
  { key: "resume-matcher", label: "Resume-Matcher", icon: Ba },
  { key: "settings", label: "Settings", icon: vr }
];
function vs() {
  const [e, a] = b("dashboard");
  return /* @__PURE__ */ o("div", { className: "flex h-screen bg-slate-950 text-slate-100", children: [
    /* @__PURE__ */ o("aside", { className: "flex w-[76px] shrink-0 flex-col border-r border-slate-800 bg-slate-900/55 lg:w-56", children: [
      /* @__PURE__ */ o("div", { className: "flex items-center gap-3 border-b border-slate-800 px-4 py-5 lg:px-5", children: [
        /* @__PURE__ */ t("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/15 font-bold text-cyan-300", children: "EE" }),
        /* @__PURE__ */ o("div", { className: "hidden lg:block", children: [
          /* @__PURE__ */ t("div", { className: "text-sm font-semibold text-slate-100", children: "Expedient" }),
          /* @__PURE__ */ t("div", { className: "text-xs text-slate-500", children: "Employment" })
        ] })
      ] }),
      /* @__PURE__ */ t("nav", { className: "flex-1 space-y-1 p-3", children: bs.map((r) => {
        const s = r.icon, i = e === r.key;
        return /* @__PURE__ */ o(
          "button",
          {
            onClick: () => a(r.key),
            title: r.label,
            "aria-label": r.label,
            className: `flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${i ? "bg-cyan-500/15 text-cyan-300" : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"}`,
            children: [
              /* @__PURE__ */ t(s, { className: "h-4 w-4" }),
              /* @__PURE__ */ t("span", { className: "hidden lg:inline", children: r.label })
            ]
          },
          r.key
        );
      }) }),
      /* @__PURE__ */ t("div", { className: "hidden border-t border-slate-800 px-5 py-3 text-[10px] text-slate-600 lg:block", children: "job search agent on your computer" })
    ] }),
    /* @__PURE__ */ o("main", { className: "min-w-0 flex-1 overflow-auto p-4 md:p-6", children: [
      e === "dashboard" && /* @__PURE__ */ t(jo, {}),
      e === "assistant" && /* @__PURE__ */ t(us, {}),
      e === "automations" && /* @__PURE__ */ t(ms, {}),
      e === "workbench" && /* @__PURE__ */ t(gs, {}),
      e === "search" && /* @__PURE__ */ t(Vo, {}),
      e === "jobs" && /* @__PURE__ */ t(Wo, {}),
      e === "applications" && /* @__PURE__ */ t(Ho, {}),
      e === "agents" && /* @__PURE__ */ t(Jo, {}),
      e === "browser" && /* @__PURE__ */ t(Zo, {}),
      e === "paperclip" && /* @__PURE__ */ t(Xo, {}),
      e === "resume-matcher" && /* @__PURE__ */ t(es, {}),
      e === "settings" && /* @__PURE__ */ t(as, {})
    ] })
  ] });
}
const Fe = "/apps/expedient-employment/api", fs = () => new Promise((e) => setTimeout(e, 750));
function ws(e) {
  const a = /* @__PURE__ */ new Set();
  let r = "";
  const s = (l, n = []) => e.post(Fe + "/bridge", { operation: l, args: n }), i = async (l) => {
    const n = window.open("about:blank", "_blank", "noopener,noreferrer"), c = await s(l);
    if (c.ok && c.html) {
      const p = URL.createObjectURL(new Blob([c.html], { type: "text/html" }));
      n ? n.location.href = p : window.open(p, "_blank", "noopener,noreferrer"), setTimeout(() => URL.revokeObjectURL(p), 6e4);
    } else n?.close();
    return c;
  };
  return new Proxy({}, {
    get(l, n) {
      return n === "onSearchLog" ? (c) => (a.add(c), () => {
        a.delete(c);
      }) : n === "searchCancel" ? () => r ? e.delete(Fe + "/runs/" + r) : Promise.reject(new Error("No active search")) : n === "browserRequest" ? (c, p, d) => e.post(Fe + "/browser", { method: c, route: p, ...d ? { body: d } : {} }) : n === "reportOpen" || n === "applicationsReportOpen" ? () => i(n) : n === "searchSpawn" ? async (c) => {
        r = (await s("searchSpawn", [c])).run_id;
        let d = "";
        try {
          for (; ; ) {
            const m = await e.get(Fe + "/runs/" + r);
            if (m.output !== d) {
              for (const f of m.output.split(`
`)) for (const h of a) h({ line: f, stream: "stdout" });
              d = m.output;
            }
            if (m.status !== "running") return { code: m.code, output: m.output };
            await fs();
          }
        } finally {
          r = "";
        }
      } : (...c) => s(n, c);
    }
  });
}
const xs = `@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-border-style:solid;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:""}}}:root,:host{--font-sans:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-amber-100:oklch(96.2% .059 95.617);--color-amber-300:oklch(87.9% .169 91.605);--color-amber-400:oklch(82.8% .189 84.429);--color-amber-500:oklch(76.9% .188 70.08);--color-amber-700:oklch(55.5% .163 48.998);--color-amber-800:oklch(47.3% .137 46.201);--color-amber-950:oklch(27.9% .077 45.635);--color-emerald-100:oklch(95% .052 163.051);--color-emerald-200:oklch(90.5% .093 164.15);--color-emerald-300:oklch(84.5% .143 164.978);--color-emerald-400:oklch(76.5% .177 163.223);--color-emerald-700:oklch(50.8% .118 165.612);--color-emerald-800:oklch(43.2% .095 166.913);--color-emerald-900:oklch(37.8% .077 168.94);--color-emerald-950:oklch(26.2% .051 172.552);--color-cyan-100:oklch(95.6% .045 203.388);--color-cyan-200:oklch(91.7% .08 205.041);--color-cyan-300:oklch(86.5% .127 207.078);--color-cyan-400:oklch(78.9% .154 211.53);--color-cyan-500:oklch(71.5% .143 215.221);--color-cyan-900:oklch(39.8% .07 227.392);--color-cyan-950:oklch(30.2% .056 229.695);--color-rose-200:oklch(89.2% .058 10.001);--color-rose-300:oklch(81% .117 11.638);--color-rose-400:oklch(71.2% .194 13.428);--color-rose-500:oklch(64.5% .246 16.439);--color-rose-800:oklch(45.5% .188 13.697);--color-rose-900:oklch(41% .159 10.272);--color-rose-950:oklch(27.1% .105 12.094);--color-slate-50:oklch(98.4% .003 247.858);--color-slate-100:oklch(96.8% .007 247.896);--color-slate-200:oklch(92.9% .013 255.508);--color-slate-300:oklch(86.9% .022 252.894);--color-slate-400:oklch(70.4% .04 256.788);--color-slate-500:oklch(55.4% .046 257.417);--color-slate-600:oklch(44.6% .043 257.281);--color-slate-700:oklch(37.2% .044 257.287);--color-slate-800:oklch(27.9% .041 260.031);--color-slate-900:oklch(20.8% .042 265.755);--color-slate-950:oklch(12.9% .042 264.695);--color-black:#000;--color-white:#fff;--spacing:.25rem;--container-sm:24rem;--container-md:28rem;--container-lg:32rem;--container-2xl:42rem;--container-3xl:48rem;--text-xs:.75rem;--text-xs--line-height:calc(1 / .75);--text-sm:.875rem;--text-sm--line-height:calc(1.25 / .875);--text-base:1rem;--text-base--line-height: 1.5 ;--text-lg:1.125rem;--text-lg--line-height:calc(1.75 / 1.125);--text-2xl:1.5rem;--text-2xl--line-height:calc(2 / 1.5);--text-3xl:1.875rem;--text-3xl--line-height: 1.2 ;--font-weight-normal:400;--font-weight-medium:500;--font-weight-semibold:600;--font-weight-bold:700;--tracking-tight:-.025em;--tracking-widest:.1em;--leading-snug:1.375;--leading-normal:1.5;--leading-relaxed:1.625;--radius-xs:.125rem;--radius-sm:.25rem;--radius-md:.375rem;--radius-lg:.5rem;--radius-xl:.75rem;--ease-out:cubic-bezier(0, 0, .2, 1);--ease-in-out:cubic-bezier(.4, 0, .2, 1);--animate-spin:spin 1s linear infinite;--animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--aspect-video:16 / 9;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--color-border:var(--border);--color-background:var(--bg);--color-foreground:var(--text);--color-muted:var(--muted);--color-primary:var(--accent);--color-card:var(--card)}.\\@container\\/card-header{container:card-header/inline-size}.\\@container\\/field-group{container:field-group/inline-size}.pointer-events-none{pointer-events:none}.invisible{visibility:hidden}.visible{visibility:visible}.sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.inset-0{inset:0}.inset-x-0{inset-inline:0}.inset-y-0{inset-block:0}.-top-12{top:calc(var(--spacing) * -12)}.top-0{top:0}.top-1\\.5{top:calc(var(--spacing) * 1.5)}.top-1\\/2{top:50%}.top-3{top:calc(var(--spacing) * 3)}.top-3\\.5{top:calc(var(--spacing) * 3.5)}.top-4{top:calc(var(--spacing) * 4)}.top-\\[1px\\]{top:1px}.top-\\[50\\%\\]{top:50%}.top-\\[60\\%\\]{top:60%}.top-full{top:100%}.-right-12{right:calc(var(--spacing) * -12)}.right-0{right:0}.right-1{right:var(--spacing)}.right-2{right:calc(var(--spacing) * 2)}.right-3{right:calc(var(--spacing) * 3)}.right-4{right:calc(var(--spacing) * 4)}.-bottom-12{bottom:calc(var(--spacing) * -12)}.bottom-0{bottom:0}.-left-12{left:calc(var(--spacing) * -12)}.left-0{left:0}.left-1\\/2{left:50%}.left-2{left:calc(var(--spacing) * 2)}.left-3{left:calc(var(--spacing) * 3)}.left-\\[50\\%\\]{left:50%}.isolate{isolation:isolate}.z-10{z-index:10}.z-20{z-index:20}.z-50{z-index:50}.z-\\[1\\]{z-index:1}.order-first{order:-9999}.order-last{order:9999}.col-start-2{grid-column-start:2}.row-span-2{grid-row:span 2/span 2}.row-start-1{grid-row-start:1}.container{width:100%}@media(min-width:40rem){.container{max-width:40rem}}@media(min-width:48rem){.container{max-width:48rem}}@media(min-width:64rem){.container{max-width:64rem}}@media(min-width:80rem){.container{max-width:80rem}}@media(min-width:96rem){.container{max-width:96rem}}.\\!m-0{margin:0!important}.m-4{margin:calc(var(--spacing) * 4)}.-mx-1{margin-inline:calc(var(--spacing) * -1)}.mx-2{margin-inline:calc(var(--spacing) * 2)}.mx-3\\.5{margin-inline:calc(var(--spacing) * 3.5)}.mx-auto{margin-inline:auto}.-my-2{margin-block:calc(var(--spacing) * -2)}.my-0{margin-block:0}.my-0\\.5{margin-block:calc(var(--spacing) * .5)}.my-1{margin-block:var(--spacing)}.my-2{margin-block:calc(var(--spacing) * 2)}.-mt-4{margin-top:calc(var(--spacing) * -4)}.mt-0\\.5{margin-top:calc(var(--spacing) * .5)}.mt-1{margin-top:var(--spacing)}.mt-1\\.5{margin-top:calc(var(--spacing) * 1.5)}.mt-2{margin-top:calc(var(--spacing) * 2)}.mt-3{margin-top:calc(var(--spacing) * 3)}.mt-4{margin-top:calc(var(--spacing) * 4)}.mt-5{margin-top:calc(var(--spacing) * 5)}.mt-auto{margin-top:auto}.mr-1{margin-right:var(--spacing)}.mr-2{margin-right:calc(var(--spacing) * 2)}.mb-2{margin-bottom:calc(var(--spacing) * 2)}.mb-3{margin-bottom:calc(var(--spacing) * 3)}.-ml-4{margin-left:calc(var(--spacing) * -4)}.ml-1{margin-left:var(--spacing)}.ml-2{margin-left:calc(var(--spacing) * 2)}.ml-4{margin-left:calc(var(--spacing) * 4)}.ml-auto{margin-left:auto}.line-clamp-1{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.line-clamp-2{-webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.block{display:block}.contents{display:contents}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline-block{display:inline-block}.inline-flex{display:inline-flex}.table{display:table}.table-caption{display:table-caption}.table-cell{display:table-cell}.table-row{display:table-row}.field-sizing-content{field-sizing:content}.aspect-square{aspect-ratio:1}.aspect-video{aspect-ratio:var(--aspect-video)}.size-\\(--cell-size\\){width:var(--cell-size);height:var(--cell-size)}.size-2{width:calc(var(--spacing) * 2);height:calc(var(--spacing) * 2)}.size-2\\.5{width:calc(var(--spacing) * 2.5);height:calc(var(--spacing) * 2.5)}.size-3{width:calc(var(--spacing) * 3);height:calc(var(--spacing) * 3)}.size-3\\.5{width:calc(var(--spacing) * 3.5);height:calc(var(--spacing) * 3.5)}.size-4{width:calc(var(--spacing) * 4);height:calc(var(--spacing) * 4)}.size-6{width:calc(var(--spacing) * 6);height:calc(var(--spacing) * 6)}.size-7{width:calc(var(--spacing) * 7);height:calc(var(--spacing) * 7)}.size-8{width:calc(var(--spacing) * 8);height:calc(var(--spacing) * 8)}.size-9{width:calc(var(--spacing) * 9);height:calc(var(--spacing) * 9)}.size-10{width:calc(var(--spacing) * 10);height:calc(var(--spacing) * 10)}.size-auto{width:auto;height:auto}.size-full{width:100%;height:100%}.h-\\(--cell-size\\){height:var(--cell-size)}.h-1\\.5{height:calc(var(--spacing) * 1.5)}.h-2{height:calc(var(--spacing) * 2)}.h-2\\.5{height:calc(var(--spacing) * 2.5)}.h-3{height:calc(var(--spacing) * 3)}.h-3\\.5{height:calc(var(--spacing) * 3.5)}.h-4{height:calc(var(--spacing) * 4)}.h-5{height:calc(var(--spacing) * 5)}.h-6{height:calc(var(--spacing) * 6)}.h-7{height:calc(var(--spacing) * 7)}.h-8{height:calc(var(--spacing) * 8)}.h-9{height:calc(var(--spacing) * 9)}.h-10{height:calc(var(--spacing) * 10)}.h-12{height:calc(var(--spacing) * 12)}.h-64{height:calc(var(--spacing) * 64)}.h-72{height:calc(var(--spacing) * 72)}.h-\\[1\\.15rem\\]{height:1.15rem}.h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.h-\\[var\\(--radix-navigation-menu-viewport-height\\)\\]{height:var(--radix-navigation-menu-viewport-height)}.h-\\[var\\(--radix-select-trigger-height\\)\\]{height:var(--radix-select-trigger-height)}.h-auto{height:auto}.h-full{height:100%}.h-px{height:1px}.h-screen{height:100vh}.h-svh{height:100svh}.max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.max-h-64{max-height:calc(var(--spacing) * 64)}.max-h-72{max-height:calc(var(--spacing) * 72)}.max-h-96{max-height:calc(var(--spacing) * 96)}.max-h-\\[300px\\]{max-height:300px}.min-h-0{min-height:0}.min-h-4{min-height:calc(var(--spacing) * 4)}.min-h-5{min-height:calc(var(--spacing) * 5)}.min-h-12{min-height:calc(var(--spacing) * 12)}.min-h-16{min-height:calc(var(--spacing) * 16)}.min-h-24{min-height:calc(var(--spacing) * 24)}.min-h-44{min-height:calc(var(--spacing) * 44)}.min-h-72{min-height:calc(var(--spacing) * 72)}.min-h-\\[460px\\]{min-height:460px}.min-h-\\[480px\\]{min-height:480px}.min-h-\\[calc\\(100vh-3rem\\)\\]{min-height:calc(100vh - 3rem)}.min-h-svh{min-height:100svh}.w-\\(--cell-size\\){width:var(--cell-size)}.w-\\(--sidebar-width\\){width:var(--sidebar-width)}.w-0{width:0}.w-1{width:var(--spacing)}.w-1\\.5{width:calc(var(--spacing) * 1.5)}.w-2{width:calc(var(--spacing) * 2)}.w-2\\.5{width:calc(var(--spacing) * 2.5)}.w-3{width:calc(var(--spacing) * 3)}.w-3\\.5{width:calc(var(--spacing) * 3.5)}.w-3\\/4{width:75%}.w-4{width:calc(var(--spacing) * 4)}.w-5{width:calc(var(--spacing) * 5)}.w-7{width:calc(var(--spacing) * 7)}.w-8{width:calc(var(--spacing) * 8)}.w-9{width:calc(var(--spacing) * 9)}.w-10{width:calc(var(--spacing) * 10)}.w-64{width:calc(var(--spacing) * 64)}.w-72{width:calc(var(--spacing) * 72)}.w-\\[76px\\]{width:76px}.w-\\[100px\\]{width:100px}.w-auto{width:auto}.w-fit{width:fit-content}.w-full{width:100%}.w-max{width:max-content}.w-px{width:1px}.max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.max-w-2xl{max-width:var(--container-2xl)}.max-w-3xl{max-width:var(--container-3xl)}.max-w-40{max-width:calc(var(--spacing) * 40)}.max-w-52{max-width:calc(var(--spacing) * 52)}.max-w-56{max-width:calc(var(--spacing) * 56)}.max-w-80{max-width:calc(var(--spacing) * 80)}.max-w-\\[1500px\\]{max-width:1500px}.max-w-\\[1600px\\]{max-width:1600px}.max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.max-w-full{max-width:100%}.max-w-max{max-width:max-content}.max-w-md{max-width:var(--container-md)}.max-w-sm{max-width:var(--container-sm)}.min-w-\\(--cell-size\\){min-width:var(--cell-size)}.min-w-0{min-width:0}.min-w-5{min-width:calc(var(--spacing) * 5)}.min-w-8{min-width:calc(var(--spacing) * 8)}.min-w-9{min-width:calc(var(--spacing) * 9)}.min-w-10{min-width:calc(var(--spacing) * 10)}.min-w-36{min-width:calc(var(--spacing) * 36)}.min-w-48{min-width:calc(var(--spacing) * 48)}.min-w-64{min-width:calc(var(--spacing) * 64)}.min-w-\\[8rem\\]{min-width:8rem}.min-w-\\[12rem\\]{min-width:12rem}.min-w-\\[980px\\]{min-width:980px}.min-w-\\[var\\(--radix-select-trigger-width\\)\\]{min-width:var(--radix-select-trigger-width)}.flex-1{flex:1}.shrink-0{flex-shrink:0}.grow{flex-grow:1}.grow-0{flex-grow:0}.basis-full{flex-basis:100%}.caption-bottom{caption-side:bottom}.border-collapse{border-collapse:collapse}.origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.origin-\\(--radix-hover-card-content-transform-origin\\){transform-origin:var(--radix-hover-card-content-transform-origin)}.origin-\\(--radix-menubar-content-transform-origin\\){transform-origin:var(--radix-menubar-content-transform-origin)}.origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.-translate-x-1\\/2{--tw-translate-x: -50% ;translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-\\[-50\\%\\]{--tw-translate-x:-50%;translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-1\\/2{--tw-translate-y: -50% ;translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-0\\.5{--tw-translate-y:calc(var(--spacing) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-\\[-50\\%\\]{--tw-translate-y:-50%;translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-\\[calc\\(-50\\%_-_2px\\)\\]{--tw-translate-y: calc(-50% - 2px) ;translate:var(--tw-translate-x) var(--tw-translate-y)}.rotate-45{rotate:45deg}.rotate-90{rotate:90deg}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.animate-pulse{animation:var(--animate-pulse)}.animate-spin{animation:var(--animate-spin)}.cursor-default{cursor:default}.cursor-pointer{cursor:pointer}.cursor-text{cursor:text}.touch-none{touch-action:none}.resize-none{resize:none}.resize-y{resize:vertical}.scroll-my-1{scroll-margin-block:var(--spacing)}.scroll-py-1{scroll-padding-block:var(--spacing)}.list-disc{list-style-type:disc}.list-none{list-style-type:none}.auto-rows-min{grid-auto-rows:min-content}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-\\[0_1fr\\]{grid-template-columns:0 1fr}.grid-cols-\\[28px_minmax\\(0\\,1fr\\)\\]{grid-template-columns:28px minmax(0,1fr)}.grid-cols-\\[minmax\\(0\\,1fr\\)_160px_100px\\]{grid-template-columns:minmax(0,1fr) 160px 100px}.grid-cols-\\[minmax\\(220px\\,1fr\\)_130px_minmax\\(260px\\,2fr\\)\\]{grid-template-columns:minmax(220px,1fr) 130px minmax(260px,2fr)}.grid-rows-\\[auto_auto\\]{grid-template-rows:auto auto}.flex-col{flex-direction:column}.flex-col-reverse{flex-direction:column-reverse}.flex-row{flex-direction:row}.flex-wrap{flex-wrap:wrap}.place-content-center{place-content:center}.items-center{align-items:center}.items-end{align-items:flex-end}.items-start{align-items:flex-start}.items-stretch{align-items:stretch}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.justify-start{justify-content:flex-start}.justify-items-start{justify-items:start}.gap-0\\.5{gap:calc(var(--spacing) * .5)}.gap-1{gap:var(--spacing)}.gap-1\\.5{gap:calc(var(--spacing) * 1.5)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-2\\.5{gap:calc(var(--spacing) * 2.5)}.gap-3{gap:calc(var(--spacing) * 3)}.gap-4{gap:calc(var(--spacing) * 4)}.gap-5{gap:calc(var(--spacing) * 5)}.gap-6{gap:calc(var(--spacing) * 6)}.gap-7{gap:calc(var(--spacing) * 7)}.gap-\\[--spacing\\(var\\(--gap\\)\\)\\]{gap:calc(var(--spacing) * var(--gap))}:where(.space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(var(--spacing) * var(--tw-space-y-reverse));margin-block-end:calc(var(--spacing) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 5) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-7>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 7) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 7) * calc(1 - var(--tw-space-y-reverse)))}.gap-y-0\\.5{row-gap:calc(var(--spacing) * .5)}.self-start{align-self:flex-start}.self-stretch{align-self:stretch}.justify-self-end{justify-self:flex-end}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.overflow-auto{overflow:auto}.overflow-hidden{overflow:hidden}.overflow-x-auto{overflow-x:auto}.overflow-x-hidden{overflow-x:hidden}.overflow-y-auto{overflow-y:auto}.rounded{border-radius:.25rem}.rounded-\\[2px\\]{border-radius:2px}.rounded-\\[4px\\]{border-radius:4px}.rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]{border-radius:calc(var(--radius) - 5px)}.rounded-\\[inherit\\]{border-radius:inherit}.rounded-full{border-radius:3.40282e38px}.rounded-lg{border-radius:var(--radius-lg)}.rounded-md{border-radius:var(--radius-md)}.rounded-none{border-radius:0}.rounded-sm{border-radius:var(--radius-sm)}.rounded-xl{border-radius:var(--radius-xl)}.rounded-xs{border-radius:var(--radius-xs)}.rounded-l-md{border-top-left-radius:var(--radius-md);border-bottom-left-radius:var(--radius-md)}.rounded-tl-sm{border-top-left-radius:var(--radius-sm)}.rounded-r-md{border-top-right-radius:var(--radius-md);border-bottom-right-radius:var(--radius-md)}.border{border-style:var(--tw-border-style);border-width:1px}.border-0{border-style:var(--tw-border-style);border-width:0}.border-\\[1\\.5px\\]{border-style:var(--tw-border-style);border-width:1.5px}.border-y{border-block-style:var(--tw-border-style);border-block-width:1px}.border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.border-r{border-right-style:var(--tw-border-style);border-right-width:1px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-l{border-left-style:var(--tw-border-style);border-left-width:1px}.border-dashed{--tw-border-style:dashed;border-style:dashed}.border-\\(--color-border\\){border-color:var(--color-border)}.border-amber-700{border-color:var(--color-amber-700)}.border-amber-800{border-color:var(--color-amber-800)}.border-amber-800\\/50{border-color:#953d0080}@supports (color:color-mix(in lab,red,red)){.border-amber-800\\/50{border-color:color-mix(in oklab,var(--color-amber-800) 50%,transparent)}}.border-amber-800\\/80{border-color:#953d00cc}@supports (color:color-mix(in lab,red,red)){.border-amber-800\\/80{border-color:color-mix(in oklab,var(--color-amber-800) 80%,transparent)}}.border-border,.border-border\\/50{border-color:var(--color-border)}@supports (color:color-mix(in lab,red,red)){.border-border\\/50{border-color:color-mix(in oklab,var(--color-border) 50%,transparent)}}.border-current\\/15{border-color:currentColor}@supports (color:color-mix(in lab,red,red)){.border-current\\/15{border-color:color-mix(in oklab,currentcolor 15%,transparent)}}.border-cyan-900\\/50{border-color:#104e6480}@supports (color:color-mix(in lab,red,red)){.border-cyan-900\\/50{border-color:color-mix(in oklab,var(--color-cyan-900) 50%,transparent)}}.border-emerald-700{border-color:var(--color-emerald-700)}.border-emerald-800{border-color:var(--color-emerald-800)}.border-emerald-900{border-color:var(--color-emerald-900)}.border-primary{border-color:var(--color-primary)}.border-rose-800{border-color:var(--color-rose-800)}.border-rose-900{border-color:var(--color-rose-900)}.border-slate-600{border-color:var(--color-slate-600)}.border-slate-700{border-color:var(--color-slate-700)}.border-slate-800{border-color:var(--color-slate-800)}.border-slate-800\\/50{border-color:#1d293d80}@supports (color:color-mix(in lab,red,red)){.border-slate-800\\/50{border-color:color-mix(in oklab,var(--color-slate-800) 50%,transparent)}}.border-slate-800\\/80{border-color:#1d293dcc}@supports (color:color-mix(in lab,red,red)){.border-slate-800\\/80{border-color:color-mix(in oklab,var(--color-slate-800) 80%,transparent)}}.border-transparent{border-color:#0000}.border-t-transparent{border-top-color:#0000}.border-l-transparent{border-left-color:#0000}.bg-\\(--color-bg\\){background-color:var(--color-bg)}.bg-amber-400{background-color:var(--color-amber-400)}.bg-amber-500\\/15{background-color:#f99c0026}@supports (color:color-mix(in lab,red,red)){.bg-amber-500\\/15{background-color:color-mix(in oklab,var(--color-amber-500) 15%,transparent)}}.bg-amber-950\\/20{background-color:#46190133}@supports (color:color-mix(in lab,red,red)){.bg-amber-950\\/20{background-color:color-mix(in oklab,var(--color-amber-950) 20%,transparent)}}.bg-amber-950\\/25{background-color:#46190140}@supports (color:color-mix(in lab,red,red)){.bg-amber-950\\/25{background-color:color-mix(in oklab,var(--color-amber-950) 25%,transparent)}}.bg-amber-950\\/35{background-color:#46190159}@supports (color:color-mix(in lab,red,red)){.bg-amber-950\\/35{background-color:color-mix(in oklab,var(--color-amber-950) 35%,transparent)}}.bg-background{background-color:var(--color-background)}.bg-black\\/50{background-color:#00000080}@supports (color:color-mix(in lab,red,red)){.bg-black\\/50{background-color:color-mix(in oklab,var(--color-black) 50%,transparent)}}.bg-border{background-color:var(--color-border)}.bg-card{background-color:var(--color-card)}.bg-cyan-300{background-color:var(--color-cyan-300)}.bg-cyan-400{background-color:var(--color-cyan-400)}.bg-cyan-400\\/10{background-color:#00d2ef1a}@supports (color:color-mix(in lab,red,red)){.bg-cyan-400\\/10{background-color:color-mix(in oklab,var(--color-cyan-400) 10%,transparent)}}.bg-cyan-500{background-color:var(--color-cyan-500)}.bg-cyan-500\\/15{background-color:#00b7d726}@supports (color:color-mix(in lab,red,red)){.bg-cyan-500\\/15{background-color:color-mix(in oklab,var(--color-cyan-500) 15%,transparent)}}.bg-cyan-950\\/20{background-color:#05334533}@supports (color:color-mix(in lab,red,red)){.bg-cyan-950\\/20{background-color:color-mix(in oklab,var(--color-cyan-950) 20%,transparent)}}.bg-emerald-400{background-color:var(--color-emerald-400)}.bg-emerald-950\\/30{background-color:#002c224d}@supports (color:color-mix(in lab,red,red)){.bg-emerald-950\\/30{background-color:color-mix(in oklab,var(--color-emerald-950) 30%,transparent)}}.bg-emerald-950\\/35{background-color:#002c2259}@supports (color:color-mix(in lab,red,red)){.bg-emerald-950\\/35{background-color:color-mix(in oklab,var(--color-emerald-950) 35%,transparent)}}.bg-emerald-950\\/40{background-color:#002c2266}@supports (color:color-mix(in lab,red,red)){.bg-emerald-950\\/40{background-color:color-mix(in oklab,var(--color-emerald-950) 40%,transparent)}}.bg-foreground{background-color:var(--color-foreground)}.bg-muted,.bg-muted\\/50{background-color:var(--color-muted)}@supports (color:color-mix(in lab,red,red)){.bg-muted\\/50{background-color:color-mix(in oklab,var(--color-muted) 50%,transparent)}}.bg-primary,.bg-primary\\/20{background-color:var(--color-primary)}@supports (color:color-mix(in lab,red,red)){.bg-primary\\/20{background-color:color-mix(in oklab,var(--color-primary) 20%,transparent)}}.bg-rose-500{background-color:var(--color-rose-500)}.bg-rose-950\\/35{background-color:#4d021859}@supports (color:color-mix(in lab,red,red)){.bg-rose-950\\/35{background-color:color-mix(in oklab,var(--color-rose-950) 35%,transparent)}}.bg-rose-950\\/40{background-color:#4d021866}@supports (color:color-mix(in lab,red,red)){.bg-rose-950\\/40{background-color:color-mix(in oklab,var(--color-rose-950) 40%,transparent)}}.bg-slate-600{background-color:var(--color-slate-600)}.bg-slate-800{background-color:var(--color-slate-800)}.bg-slate-900{background-color:var(--color-slate-900)}.bg-slate-900\\/35{background-color:#0f172b59}@supports (color:color-mix(in lab,red,red)){.bg-slate-900\\/35{background-color:color-mix(in oklab,var(--color-slate-900) 35%,transparent)}}.bg-slate-900\\/40{background-color:#0f172b66}@supports (color:color-mix(in lab,red,red)){.bg-slate-900\\/40{background-color:color-mix(in oklab,var(--color-slate-900) 40%,transparent)}}.bg-slate-900\\/45{background-color:#0f172b73}@supports (color:color-mix(in lab,red,red)){.bg-slate-900\\/45{background-color:color-mix(in oklab,var(--color-slate-900) 45%,transparent)}}.bg-slate-900\\/55{background-color:#0f172b8c}@supports (color:color-mix(in lab,red,red)){.bg-slate-900\\/55{background-color:color-mix(in oklab,var(--color-slate-900) 55%,transparent)}}.bg-slate-900\\/60{background-color:#0f172b99}@supports (color:color-mix(in lab,red,red)){.bg-slate-900\\/60{background-color:color-mix(in oklab,var(--color-slate-900) 60%,transparent)}}.bg-slate-900\\/65{background-color:#0f172ba6}@supports (color:color-mix(in lab,red,red)){.bg-slate-900\\/65{background-color:color-mix(in oklab,var(--color-slate-900) 65%,transparent)}}.bg-slate-900\\/70{background-color:#0f172bb3}@supports (color:color-mix(in lab,red,red)){.bg-slate-900\\/70{background-color:color-mix(in oklab,var(--color-slate-900) 70%,transparent)}}.bg-slate-950{background-color:var(--color-slate-950)}.bg-slate-950\\/50{background-color:#02061880}@supports (color:color-mix(in lab,red,red)){.bg-slate-950\\/50{background-color:color-mix(in oklab,var(--color-slate-950) 50%,transparent)}}.bg-slate-950\\/65{background-color:#020618a6}@supports (color:color-mix(in lab,red,red)){.bg-slate-950\\/65{background-color:color-mix(in oklab,var(--color-slate-950) 65%,transparent)}}.bg-slate-950\\/70{background-color:#020618b3}@supports (color:color-mix(in lab,red,red)){.bg-slate-950\\/70{background-color:color-mix(in oklab,var(--color-slate-950) 70%,transparent)}}.bg-transparent{background-color:#0000}.bg-white{background-color:var(--color-white)}.fill-current{fill:currentColor}.fill-foreground{fill:var(--color-foreground)}.fill-primary{fill:var(--color-primary)}.p-0{padding:0}.p-0\\.5{padding:calc(var(--spacing) * .5)}.p-1{padding:var(--spacing)}.p-1\\.5{padding:calc(var(--spacing) * 1.5)}.p-2{padding:calc(var(--spacing) * 2)}.p-3{padding:calc(var(--spacing) * 3)}.p-4{padding:calc(var(--spacing) * 4)}.p-5{padding:calc(var(--spacing) * 5)}.p-6{padding:calc(var(--spacing) * 6)}.p-8{padding:calc(var(--spacing) * 8)}.p-\\[3px\\]{padding:3px}.p-px{padding:1px}.px-\\(--cell-size\\){padding-inline:var(--cell-size)}.px-1{padding-inline:var(--spacing)}.px-1\\.5{padding-inline:calc(var(--spacing) * 1.5)}.px-2{padding-inline:calc(var(--spacing) * 2)}.px-2\\.5{padding-inline:calc(var(--spacing) * 2.5)}.px-3{padding-inline:calc(var(--spacing) * 3)}.px-4{padding-inline:calc(var(--spacing) * 4)}.px-5{padding-inline:calc(var(--spacing) * 5)}.px-6{padding-inline:calc(var(--spacing) * 6)}.px-8{padding-inline:calc(var(--spacing) * 8)}.py-0\\.5{padding-block:calc(var(--spacing) * .5)}.py-1{padding-block:var(--spacing)}.py-1\\.5{padding-block:calc(var(--spacing) * 1.5)}.py-2{padding-block:calc(var(--spacing) * 2)}.py-3{padding-block:calc(var(--spacing) * 3)}.py-4{padding-block:calc(var(--spacing) * 4)}.py-5{padding-block:calc(var(--spacing) * 5)}.py-6{padding-block:calc(var(--spacing) * 6)}.py-14{padding-block:calc(var(--spacing) * 14)}.py-16{padding-block:calc(var(--spacing) * 16)}.pt-0{padding-top:0}.pt-2{padding-top:calc(var(--spacing) * 2)}.pt-3{padding-top:calc(var(--spacing) * 3)}.pt-4{padding-top:calc(var(--spacing) * 4)}.pt-6{padding-top:calc(var(--spacing) * 6)}.pr-1{padding-right:var(--spacing)}.pr-2{padding-right:calc(var(--spacing) * 2)}.pr-2\\.5{padding-right:calc(var(--spacing) * 2.5)}.pr-3{padding-right:calc(var(--spacing) * 3)}.pr-4{padding-right:calc(var(--spacing) * 4)}.pr-8{padding-right:calc(var(--spacing) * 8)}.pb-2{padding-bottom:calc(var(--spacing) * 2)}.pb-3{padding-bottom:calc(var(--spacing) * 3)}.pb-4{padding-bottom:calc(var(--spacing) * 4)}.pl-2{padding-left:calc(var(--spacing) * 2)}.pl-3{padding-left:calc(var(--spacing) * 3)}.pl-4{padding-left:calc(var(--spacing) * 4)}.pl-8{padding-left:calc(var(--spacing) * 8)}.pl-9{padding-left:calc(var(--spacing) * 9)}.text-center{text-align:center}.text-left{text-align:left}.align-middle{vertical-align:middle}.font-mono{font-family:var(--font-mono)}.font-sans{font-family:var(--font-sans)}.text-2xl{font-size:var(--text-2xl);line-height:var(--tw-leading,var(--text-2xl--line-height))}.text-3xl{font-size:var(--text-3xl);line-height:var(--tw-leading,var(--text-3xl--line-height))}.text-base{font-size:var(--text-base);line-height:var(--tw-leading,var(--text-base--line-height))}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-sm\\/relaxed{font-size:var(--text-sm);line-height:var(--leading-relaxed)}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.text-\\[0\\.8rem\\]{font-size:.8rem}.text-\\[10px\\]{font-size:10px}.text-\\[11px\\]{font-size:11px}.leading-5{--tw-leading:calc(var(--spacing) * 5);line-height:calc(var(--spacing) * 5)}.leading-6{--tw-leading:calc(var(--spacing) * 6);line-height:calc(var(--spacing) * 6)}.leading-none{--tw-leading:1;line-height:1}.leading-normal{--tw-leading:var(--leading-normal);line-height:var(--leading-normal)}.leading-snug{--tw-leading:var(--leading-snug);line-height:var(--leading-snug)}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.font-normal{--tw-font-weight:var(--font-weight-normal);font-weight:var(--font-weight-normal)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-\\[-0\\.02em\\]{--tw-tracking:-.02em;letter-spacing:-.02em}.tracking-\\[-0\\.03em\\]{--tw-tracking:-.03em;letter-spacing:-.03em}.tracking-\\[0\\.1em\\]{--tw-tracking:.1em;letter-spacing:.1em}.tracking-\\[0\\.12em\\]{--tw-tracking:.12em;letter-spacing:.12em}.tracking-tight{--tw-tracking:var(--tracking-tight);letter-spacing:var(--tracking-tight)}.tracking-widest{--tw-tracking:var(--tracking-widest);letter-spacing:var(--tracking-widest)}.text-balance{text-wrap:balance}.break-words{overflow-wrap:break-word}.whitespace-nowrap{white-space:nowrap}.whitespace-pre-wrap{white-space:pre-wrap}.text-amber-100{color:var(--color-amber-100)}.text-amber-300{color:var(--color-amber-300)}.text-background{color:var(--color-background)}.text-current{color:currentColor}.text-cyan-200{color:var(--color-cyan-200)}.text-cyan-300{color:var(--color-cyan-300)}.text-cyan-400{color:var(--color-cyan-400)}.text-cyan-950{color:var(--color-cyan-950)}.text-emerald-100{color:var(--color-emerald-100)}.text-emerald-200{color:var(--color-emerald-200)}.text-emerald-300{color:var(--color-emerald-300)}.text-emerald-400{color:var(--color-emerald-400)}.text-foreground{color:var(--color-foreground)}.text-primary{color:var(--color-primary)}.text-rose-200{color:var(--color-rose-200)}.text-rose-300{color:var(--color-rose-300)}.text-rose-400{color:var(--color-rose-400)}.text-slate-50{color:var(--color-slate-50)}.text-slate-100{color:var(--color-slate-100)}.text-slate-200{color:var(--color-slate-200)}.text-slate-300{color:var(--color-slate-300)}.text-slate-400{color:var(--color-slate-400)}.text-slate-500{color:var(--color-slate-500)}.text-slate-600{color:var(--color-slate-600)}.text-slate-950{color:var(--color-slate-950)}.text-white{color:var(--color-white)}.uppercase{text-transform:uppercase}.tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.underline{text-decoration-line:underline}.underline-offset-4{text-underline-offset:4px}.accent-cyan-300{accent-color:var(--color-cyan-300)}.accent-foreground{accent-color:var(--color-foreground)}.opacity-0{opacity:0}.opacity-50{opacity:.5}.opacity-70{opacity:.7}.opacity-80{opacity:.8}.shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-border\\)\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,hsl(var(--sidebar-border)));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-\\[0_18px_55px_rgba\\(0\\,0\\,0\\,0\\.28\\)\\]{--tw-shadow:0 18px 55px var(--tw-shadow-color,#00000047);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-xs{--tw-shadow:0 1px 2px 0 var(--tw-shadow-color,#0000000d);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.ring{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.ring-offset-background{--tw-ring-offset-color:var(--color-background)}.outline-hidden{--tw-outline-style:none;outline-style:none}@media(forced-colors:active){.outline-hidden{outline-offset:2px;outline:2px solid #0000}}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[margin\\,opacity\\]{transition-property:margin,opacity;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-shadow{transition-property:box-shadow;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-none{transition-property:none}.duration-100{--tw-duration:.1s;transition-duration:.1s}.duration-200{--tw-duration:.2s;transition-duration:.2s}.duration-300{--tw-duration:.3s;transition-duration:.3s}.duration-1000{--tw-duration:1s;transition-duration:1s}.ease-in-out{--tw-ease:var(--ease-in-out);transition-timing-function:var(--ease-in-out)}.ease-linear{--tw-ease:linear;transition-timing-function:linear}.ease-out{--tw-ease:var(--ease-out);transition-timing-function:var(--ease-out)}.outline-none{--tw-outline-style:none;outline-style:none}.select-none{-webkit-user-select:none;user-select:none}.\\[--cell-size\\:--spacing\\(8\\)\\]{--cell-size:calc(var(--spacing) * 8)}.group-focus-within\\/menu-item\\:opacity-100:is(:where(.group\\/menu-item):focus-within *){opacity:1}@media(hover:hover){.group-hover\\/menu-item\\:opacity-100:is(:where(.group\\/menu-item):hover *){opacity:1}}.group-has-data-\\[sidebar\\=menu-action\\]\\/menu-item\\:pr-8:is(:where(.group\\/menu-item):has([data-sidebar=menu-action]) *){padding-right:calc(var(--spacing) * 8)}.group-has-\\[\\[data-orientation\\=horizontal\\]\\]\\/field\\:text-balance:is(:where(.group\\/field):has([data-orientation=horizontal]) *){text-wrap:balance}.group-has-\\[\\[data-slot\\=item-description\\]\\]\\/item\\:translate-y-0\\.5:is(:where(.group\\/item):has([data-slot=item-description]) *){--tw-translate-y:calc(var(--spacing) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}.group-has-\\[\\[data-slot\\=item-description\\]\\]\\/item\\:self-start:is(:where(.group\\/item):has([data-slot=item-description]) *){align-self:flex-start}.group-has-\\[\\>input\\]\\/input-group\\:pt-2\\.5:is(:where(.group\\/input-group):has(>input) *){padding-top:calc(var(--spacing) * 2.5)}.group-has-\\[\\>input\\]\\/input-group\\:pb-2\\.5:is(:where(.group\\/input-group):has(>input) *){padding-bottom:calc(var(--spacing) * 2.5)}.group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.group)[data-collapsible=icon] *){margin-top:calc(var(--spacing) * -8)}.group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.group)[data-collapsible=icon] *){display:none}.group-data-\\[collapsible\\=icon\\]\\:size-8\\!:is(:where(.group)[data-collapsible=icon] *){width:calc(var(--spacing) * 8)!important;height:calc(var(--spacing) * 8)!important}.group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(var(--spacing) * 4)))}.group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\+2px\\)\\]:is(:where(.group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(var(--spacing) * 4)) + 2px)}.group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.group)[data-collapsible=icon] *){overflow:hidden}.group-data-\\[collapsible\\=icon\\]\\:p-0\\!:is(:where(.group)[data-collapsible=icon] *){padding:0!important}.group-data-\\[collapsible\\=icon\\]\\:p-2\\!:is(:where(.group)[data-collapsible=icon] *){padding:calc(var(--spacing) * 2)!important}.group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.group)[data-collapsible=icon] *){opacity:0}.group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.group)[data-collapsible=offcanvas] *){width:0}.group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.group)[data-collapsible=offcanvas] *){--tw-translate-x:0px;translate:var(--tw-translate-x) var(--tw-translate-y)}.group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.group)[data-disabled=true] *){pointer-events:none}.group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.group)[data-disabled=true] *),.group-data-\\[disabled\\=true\\]\\/field\\:opacity-50:is(:where(.group\\/field)[data-disabled=true] *),.group-data-\\[disabled\\=true\\]\\/input-group\\:opacity-50:is(:where(.group\\/input-group)[data-disabled=true] *){opacity:.5}.group-data-\\[focused\\=true\\]\\/day\\:relative:is(:where(.group\\/day)[data-focused=true] *){position:relative}.group-data-\\[focused\\=true\\]\\/day\\:z-10:is(:where(.group\\/day)[data-focused=true] *){z-index:10}.group-data-\\[focused\\=true\\]\\/day\\:ring-\\[3px\\]:is(:where(.group\\/day)[data-focused=true] *){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.group-data-\\[side\\=left\\]\\:-right-4:is(:where(.group)[data-side=left] *){right:calc(var(--spacing) * -4)}.group-data-\\[side\\=left\\]\\:border-r:is(:where(.group)[data-side=left] *){border-right-style:var(--tw-border-style);border-right-width:1px}.group-data-\\[side\\=right\\]\\:left-0:is(:where(.group)[data-side=right] *){left:0}.group-data-\\[side\\=right\\]\\:rotate-180:is(:where(.group)[data-side=right] *){rotate:180deg}.group-data-\\[side\\=right\\]\\:border-l:is(:where(.group)[data-side=right] *){border-left-style:var(--tw-border-style);border-left-width:1px}.group-data-\\[state\\=open\\]\\:rotate-180:is(:where(.group)[data-state=open] *){rotate:180deg}.group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.group)[data-variant=floating] *){border-radius:var(--radius-lg)}.group-data-\\[variant\\=floating\\]\\:border:is(:where(.group)[data-variant=floating] *){border-style:var(--tw-border-style);border-width:1px}.group-data-\\[variant\\=floating\\]\\:shadow-sm:is(:where(.group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.group-data-\\[variant\\=outline\\]\\/field-group\\:-mb-2:is(:where(.group\\/field-group)[data-variant=outline] *){margin-bottom:calc(var(--spacing) * -2)}.group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:block:is(:where(.group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){display:block}.group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:text-center:is(:where(.group\\/drawer-content)[data-vaul-drawer-direction=bottom] *),.group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:text-center:is(:where(.group\\/drawer-content)[data-vaul-drawer-direction=top] *){text-align:center}.group-data-\\[viewport\\=false\\]\\/navigation-menu\\:top-full:is(:where(.group\\/navigation-menu)[data-viewport=false] *){top:100%}.group-data-\\[viewport\\=false\\]\\/navigation-menu\\:mt-1\\.5:is(:where(.group\\/navigation-menu)[data-viewport=false] *){margin-top:calc(var(--spacing) * 1.5)}.group-data-\\[viewport\\=false\\]\\/navigation-menu\\:overflow-hidden:is(:where(.group\\/navigation-menu)[data-viewport=false] *){overflow:hidden}.group-data-\\[viewport\\=false\\]\\/navigation-menu\\:rounded-md:is(:where(.group\\/navigation-menu)[data-viewport=false] *){border-radius:var(--radius-md)}.group-data-\\[viewport\\=false\\]\\/navigation-menu\\:border:is(:where(.group\\/navigation-menu)[data-viewport=false] *){border-style:var(--tw-border-style);border-width:1px}.group-data-\\[viewport\\=false\\]\\/navigation-menu\\:shadow:is(:where(.group\\/navigation-menu)[data-viewport=false] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.group-data-\\[viewport\\=false\\]\\/navigation-menu\\:duration-200:is(:where(.group\\/navigation-menu)[data-viewport=false] *){--tw-duration:.2s;transition-duration:.2s}.peer-disabled\\:cursor-not-allowed:is(:where(.peer):disabled~*){cursor:not-allowed}.peer-disabled\\:opacity-50:is(:where(.peer):disabled~*){opacity:.5}.peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.peer\\/menu-button)[data-size=default]~*){top:calc(var(--spacing) * 1.5)}.peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.peer\\/menu-button)[data-size=lg]~*){top:calc(var(--spacing) * 2.5)}.peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.peer\\/menu-button)[data-size=sm]~*){top:var(--spacing)}.selection\\:bg-primary ::selection{background-color:var(--color-primary)}.selection\\:bg-primary::selection{background-color:var(--color-primary)}.file\\:inline-flex::file-selector-button{display:inline-flex}.file\\:h-7::file-selector-button{height:calc(var(--spacing) * 7)}.file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.file\\:bg-transparent::file-selector-button{background-color:#0000}.file\\:text-sm::file-selector-button{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.file\\:font-medium::file-selector-button{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.file\\:text-foreground::file-selector-button{color:var(--color-foreground)}.placeholder\\:text-slate-500::placeholder{color:var(--color-slate-500)}.placeholder\\:text-slate-600::placeholder{color:var(--color-slate-600)}.after\\:absolute:after{content:var(--tw-content);position:absolute}.after\\:-inset-2:after{content:var(--tw-content);inset:calc(var(--spacing) * -2)}.after\\:inset-y-0:after{content:var(--tw-content);inset-block:0}.after\\:left-1\\/2:after{content:var(--tw-content);left:50%}.after\\:w-1:after{content:var(--tw-content);width:var(--spacing)}.after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x: -50% ;translate:var(--tw-translate-x) var(--tw-translate-y)}.group-data-\\[collapsible\\=offcanvas\\]\\:after\\:left-full:is(:where(.group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);left:100%}.first\\:rounded-l-md:first-child{border-top-left-radius:var(--radius-md);border-bottom-left-radius:var(--radius-md)}.first\\:border-l:first-child{border-left-style:var(--tw-border-style);border-left-width:1px}.last\\:mt-0:last-child{margin-top:0}.last\\:rounded-r-md:last-child{border-top-right-radius:var(--radius-md);border-bottom-right-radius:var(--radius-md)}.last\\:border-b-0:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}@media(hover:hover){.hover\\:border-rose-800:hover{border-color:var(--color-rose-800)}.hover\\:border-slate-700:hover{border-color:var(--color-slate-700)}.hover\\:bg-amber-500\\/15:hover{background-color:#f99c0026}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-amber-500\\/15:hover{background-color:color-mix(in oklab,var(--color-amber-500) 15%,transparent)}}.hover\\:bg-cyan-200:hover{background-color:var(--color-cyan-200)}.hover\\:bg-cyan-300:hover{background-color:var(--color-cyan-300)}.hover\\:bg-cyan-400:hover{background-color:var(--color-cyan-400)}.hover\\:bg-cyan-500\\/15:hover{background-color:#00b7d726}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-cyan-500\\/15:hover{background-color:color-mix(in oklab,var(--color-cyan-500) 15%,transparent)}}.hover\\:bg-emerald-900:hover{background-color:var(--color-emerald-900)}.hover\\:bg-muted:hover,.hover\\:bg-muted\\/50:hover{background-color:var(--color-muted)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab,var(--color-muted) 50%,transparent)}}.hover\\:bg-primary\\/90:hover{background-color:var(--color-primary)}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab,var(--color-primary) 90%,transparent)}}.hover\\:bg-rose-950:hover{background-color:var(--color-rose-950)}.hover\\:bg-slate-700:hover{background-color:var(--color-slate-700)}.hover\\:bg-slate-800:hover{background-color:var(--color-slate-800)}.hover\\:bg-slate-800\\/60:hover{background-color:#1d293d99}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-slate-800\\/60:hover{background-color:color-mix(in oklab,var(--color-slate-800) 60%,transparent)}}.hover\\:bg-slate-900:hover{background-color:var(--color-slate-900)}.hover\\:text-cyan-300:hover{color:var(--color-cyan-300)}.hover\\:text-foreground:hover{color:var(--color-foreground)}.hover\\:text-rose-200:hover{color:var(--color-rose-200)}.hover\\:text-slate-100:hover{color:var(--color-slate-100)}.hover\\:text-slate-200:hover{color:var(--color-slate-200)}.hover\\:text-white:hover{color:var(--color-white)}.hover\\:underline:hover{text-decoration-line:underline}.hover\\:opacity-100:hover{opacity:1}.hover\\:shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-accent\\)\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,hsl(var(--sidebar-accent)));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.hover\\:ring-4:hover{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}}.focus\\:z-10:focus{z-index:10}.focus\\:border-cyan-500:focus{border-color:var(--color-cyan-500)}.focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus\\:ring-cyan-100:focus{--tw-ring-color:var(--color-cyan-100)}.focus\\:ring-cyan-400:focus{--tw-ring-color:var(--color-cyan-400)}.focus\\:ring-cyan-500\\/25:focus{--tw-ring-color:#00b7d740}@supports (color:color-mix(in lab,red,red)){.focus\\:ring-cyan-500\\/25:focus{--tw-ring-color:color-mix(in oklab, var(--color-cyan-500) 25%, transparent)}}.focus\\:ring-offset-2:focus{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media(forced-colors:active){.focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}.focus\\:outline-none:focus{--tw-outline-style:none;outline-style:none}.focus-visible\\:z-10:focus-visible{z-index:10}.focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus-visible\\:ring-4:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus-visible\\:ring-cyan-400:focus-visible{--tw-ring-color:var(--color-cyan-400)}.focus-visible\\:ring-offset-1:focus-visible{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media(forced-colors:active){.focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.focus-visible\\:outline-none:focus-visible{--tw-outline-style:none;outline-style:none}.disabled\\:pointer-events-none:disabled{pointer-events:none}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-40:disabled{opacity:.4}.disabled\\:opacity-50:disabled{opacity:.5}:where([data-side=left]) .in-data-\\[side\\=left\\]\\:cursor-w-resize{cursor:w-resize}:where([data-side=right]) .in-data-\\[side\\=right\\]\\:cursor-e-resize{cursor:e-resize}.has-focus\\:ring-\\[3px\\]:has(:focus){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.has-disabled\\:opacity-50:has(:disabled){opacity:.5}.has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.has-data-\\[state\\=checked\\]\\:border-primary:has([data-state=checked]){border-color:var(--color-primary)}.has-data-\\[state\\=checked\\]\\:bg-primary\\/5:has([data-state=checked]){background-color:var(--color-primary)}@supports (color:color-mix(in lab,red,red)){.has-data-\\[state\\=checked\\]\\:bg-primary\\/5:has([data-state=checked]){background-color:color-mix(in oklab,var(--color-primary) 5%,transparent)}}.has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-\\[3px\\]:has([data-slot=input-group-control]:focus-visible){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.has-\\[\\>\\[data-align\\=block-end\\]\\]\\:h-auto:has(>[data-align=block-end]){height:auto}.has-\\[\\>\\[data-align\\=block-end\\]\\]\\:flex-col:has(>[data-align=block-end]){flex-direction:column}.has-\\[\\>\\[data-align\\=block-start\\]\\]\\:h-auto:has(>[data-align=block-start]){height:auto}.has-\\[\\>\\[data-align\\=block-start\\]\\]\\:flex-col:has(>[data-align=block-start]){flex-direction:column}.has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(var(--spacing) * 2)}.has-\\[\\>\\[data-slot\\=checkbox-group\\]\\]\\:gap-3:has(>[data-slot=checkbox-group]){gap:calc(var(--spacing) * 3)}.has-\\[\\>\\[data-slot\\=field-content\\]\\]\\:items-start:has(>[data-slot=field-content]){align-items:flex-start}.has-\\[\\>\\[data-slot\\=field\\]\\]\\:w-full:has(>[data-slot=field]){width:100%}.has-\\[\\>\\[data-slot\\=field\\]\\]\\:flex-col:has(>[data-slot=field]){flex-direction:column}.has-\\[\\>\\[data-slot\\=field\\]\\]\\:rounded-md:has(>[data-slot=field]){border-radius:var(--radius-md)}.has-\\[\\>\\[data-slot\\=field\\]\\]\\:border:has(>[data-slot=field]){border-style:var(--tw-border-style);border-width:1px}.has-\\[\\>\\[data-slot\\=radio-group\\]\\]\\:gap-3:has(>[data-slot=radio-group]){gap:calc(var(--spacing) * 3)}.has-\\[\\>button\\]\\:mr-\\[-0\\.45rem\\]:has(>button){margin-right:-.45rem}.has-\\[\\>button\\]\\:ml-\\[-0\\.45rem\\]:has(>button){margin-left:-.45rem}.has-\\[\\>kbd\\]\\:mr-\\[-0\\.35rem\\]:has(>kbd){margin-right:-.35rem}.has-\\[\\>kbd\\]\\:ml-\\[-0\\.35rem\\]:has(>kbd){margin-left:-.35rem}.has-\\[\\>svg\\]\\:grid-cols-\\[calc\\(var\\(--spacing\\)\\*4\\)_1fr\\]:has(>svg){grid-template-columns:calc(var(--spacing) * 4) 1fr}.has-\\[\\>svg\\]\\:gap-x-3:has(>svg){column-gap:calc(var(--spacing) * 3)}.has-\\[\\>svg\\]\\:p-0:has(>svg){padding:0}.has-\\[\\>svg\\]\\:px-2:has(>svg){padding-inline:calc(var(--spacing) * 2)}.has-\\[\\>svg\\]\\:px-2\\.5:has(>svg){padding-inline:calc(var(--spacing) * 2.5)}.has-\\[\\>svg\\]\\:px-3:has(>svg){padding-inline:calc(var(--spacing) * 3)}.has-\\[\\>svg\\]\\:px-4:has(>svg){padding-inline:calc(var(--spacing) * 4)}.has-\\[\\>textarea\\]\\:h-auto:has(>textarea){height:auto}.aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.data-\\[active\\=true\\]\\:z-10[data-active=true]{z-index:10}.data-\\[active\\=true\\]\\:font-medium[data-active=true]{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.data-\\[active\\=true\\]\\:ring-\\[3px\\][data-active=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.data-\\[disabled\\]\\:pointer-events-none[data-disabled]{pointer-events:none}.data-\\[disabled\\]\\:opacity-50[data-disabled]{opacity:.5}.data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.data-\\[inset\\]\\:pl-8[data-inset]{padding-left:calc(var(--spacing) * 8)}.data-\\[orientation\\=horizontal\\]\\:h-1\\.5[data-orientation=horizontal]{height:calc(var(--spacing) * 1.5)}.data-\\[orientation\\=horizontal\\]\\:h-full[data-orientation=horizontal]{height:100%}.data-\\[orientation\\=horizontal\\]\\:h-px[data-orientation=horizontal]{height:1px}.data-\\[orientation\\=horizontal\\]\\:w-full[data-orientation=horizontal]{width:100%}.data-\\[orientation\\=vertical\\]\\:h-auto[data-orientation=vertical]{height:auto}.data-\\[orientation\\=vertical\\]\\:h-full[data-orientation=vertical]{height:100%}.data-\\[orientation\\=vertical\\]\\:min-h-44[data-orientation=vertical]{min-height:calc(var(--spacing) * 44)}.data-\\[orientation\\=vertical\\]\\:w-1\\.5[data-orientation=vertical]{width:calc(var(--spacing) * 1.5)}.data-\\[orientation\\=vertical\\]\\:w-auto[data-orientation=vertical]{width:auto}.data-\\[orientation\\=vertical\\]\\:w-full[data-orientation=vertical]{width:100%}.data-\\[orientation\\=vertical\\]\\:w-px[data-orientation=vertical]{width:1px}.data-\\[orientation\\=vertical\\]\\:flex-col[data-orientation=vertical]{flex-direction:column}.data-\\[panel-group-direction\\=vertical\\]\\:h-px[data-panel-group-direction=vertical]{height:1px}.data-\\[panel-group-direction\\=vertical\\]\\:w-full[data-panel-group-direction=vertical]{width:100%}.data-\\[panel-group-direction\\=vertical\\]\\:flex-col[data-panel-group-direction=vertical]{flex-direction:column}.data-\\[panel-group-direction\\=vertical\\]\\:after\\:left-0[data-panel-group-direction=vertical]:after{content:var(--tw-content);left:0}.data-\\[panel-group-direction\\=vertical\\]\\:after\\:h-1[data-panel-group-direction=vertical]:after{content:var(--tw-content);height:var(--spacing)}.data-\\[panel-group-direction\\=vertical\\]\\:after\\:w-full[data-panel-group-direction=vertical]:after{content:var(--tw-content);width:100%}.data-\\[panel-group-direction\\=vertical\\]\\:after\\:translate-x-0[data-panel-group-direction=vertical]:after{content:var(--tw-content);--tw-translate-x:0px;translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[panel-group-direction\\=vertical\\]\\:after\\:-translate-y-1\\/2[data-panel-group-direction=vertical]:after{content:var(--tw-content);--tw-translate-y: -50% ;translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[range-end\\=true\\]\\:rounded-md[data-range-end=true]{border-radius:var(--radius-md)}.data-\\[range-end\\=true\\]\\:rounded-r-md[data-range-end=true]{border-top-right-radius:var(--radius-md);border-bottom-right-radius:var(--radius-md)}.data-\\[range-end\\=true\\]\\:bg-primary[data-range-end=true]{background-color:var(--color-primary)}.data-\\[range-middle\\=true\\]\\:rounded-none[data-range-middle=true]{border-radius:0}.data-\\[range-start\\=true\\]\\:rounded-md[data-range-start=true]{border-radius:var(--radius-md)}.data-\\[range-start\\=true\\]\\:rounded-l-md[data-range-start=true]{border-top-left-radius:var(--radius-md);border-bottom-left-radius:var(--radius-md)}.data-\\[range-start\\=true\\]\\:bg-primary[data-range-start=true],.data-\\[selected-single\\=true\\]\\:bg-primary[data-selected-single=true]{background-color:var(--color-primary)}.data-\\[selected\\=true\\]\\:rounded-none[data-selected=true]{border-radius:0}.data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:var(--spacing);translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(var(--spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:var(--spacing);translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(var(--spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[size\\=default\\]\\:h-9[data-size=default]{height:calc(var(--spacing) * 9)}.data-\\[size\\=sm\\]\\:h-8[data-size=sm]{height:calc(var(--spacing) * 8)}.data-\\[slot\\=checkbox-group\\]\\:gap-3[data-slot=checkbox-group]{gap:calc(var(--spacing) * 3)}:is(.\\*\\*\\:data-\\[slot\\=command-input-wrapper\\]\\:h-12 *)[data-slot=command-input-wrapper]{height:calc(var(--spacing) * 12)}:is(.\\*\\*\\:data-\\[slot\\=navigation-menu-link\\]\\:focus\\:ring-0 *)[data-slot=navigation-menu-link]:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}:is(.\\*\\*\\:data-\\[slot\\=navigation-menu-link\\]\\:focus\\:outline-none *)[data-slot=navigation-menu-link]:focus{--tw-outline-style:none;outline-style:none}:is(.\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.\\*\\:data-\\[slot\\=select-value\\]\\:gap-2>*)[data-slot=select-value]{gap:calc(var(--spacing) * 2)}.data-\\[spacing\\=0\\]\\:rounded-none[data-spacing="0"]{border-radius:0}.data-\\[spacing\\=0\\]\\:shadow-none[data-spacing="0"]{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.data-\\[spacing\\=0\\]\\:first\\:rounded-l-md[data-spacing="0"]:first-child{border-top-left-radius:var(--radius-md);border-bottom-left-radius:var(--radius-md)}.data-\\[spacing\\=0\\]\\:last\\:rounded-r-md[data-spacing="0"]:last-child{border-top-right-radius:var(--radius-md);border-bottom-right-radius:var(--radius-md)}.data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--color-background)}.data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.data-\\[state\\=checked\\]\\:translate-x-\\[calc\\(100\\%-2px\\)\\][data-state=checked]{--tw-translate-x: calc(100% - 2px) ;translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[state\\=checked\\]\\:border-primary[data-state=checked]{border-color:var(--color-primary)}.data-\\[state\\=checked\\]\\:bg-primary[data-state=checked]{background-color:var(--color-primary)}.data-\\[state\\=closed\\]\\:duration-300[data-state=closed]{--tw-duration:.3s;transition-duration:.3s}.data-\\[state\\=open\\]\\:opacity-100[data-state=open]{opacity:1}.data-\\[state\\=open\\]\\:duration-500[data-state=open]{--tw-duration:.5s;transition-duration:.5s}.data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--color-muted)}.data-\\[state\\=unchecked\\]\\:translate-x-0[data-state=unchecked]{--tw-translate-x:0px;translate:var(--tw-translate-x) var(--tw-translate-y)}.data-\\[variant\\=label\\]\\:text-sm[data-variant=label]{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.data-\\[variant\\=legend\\]\\:text-base[data-variant=legend]{font-size:var(--text-base);line-height:var(--tw-leading,var(--text-base--line-height))}.data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-l-0[data-spacing="0"][data-variant=outline]{border-left-style:var(--tw-border-style);border-left-width:0}.data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-l[data-spacing="0"][data-variant=outline]:first-child{border-left-style:var(--tw-border-style);border-left-width:1px}.data-\\[spacing\\=default\\]\\:data-\\[variant\\=outline\\]\\:shadow-xs[data-spacing=default][data-variant=outline]{--tw-shadow:0 1px 2px 0 var(--tw-shadow-color,#0000000d);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.data-\\[vaul-drawer-direction\\=bottom\\]\\:inset-x-0[data-vaul-drawer-direction=bottom]{inset-inline:0}.data-\\[vaul-drawer-direction\\=bottom\\]\\:bottom-0[data-vaul-drawer-direction=bottom]{bottom:0}.data-\\[vaul-drawer-direction\\=bottom\\]\\:mt-24[data-vaul-drawer-direction=bottom]{margin-top:calc(var(--spacing) * 24)}.data-\\[vaul-drawer-direction\\=bottom\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=bottom]{max-height:80vh}.data-\\[vaul-drawer-direction\\=bottom\\]\\:rounded-t-lg[data-vaul-drawer-direction=bottom]{border-top-left-radius:var(--radius-lg);border-top-right-radius:var(--radius-lg)}.data-\\[vaul-drawer-direction\\=bottom\\]\\:border-t[data-vaul-drawer-direction=bottom]{border-top-style:var(--tw-border-style);border-top-width:1px}.data-\\[vaul-drawer-direction\\=left\\]\\:inset-y-0[data-vaul-drawer-direction=left]{inset-block:0}.data-\\[vaul-drawer-direction\\=left\\]\\:left-0[data-vaul-drawer-direction=left]{left:0}.data-\\[vaul-drawer-direction\\=left\\]\\:w-3\\/4[data-vaul-drawer-direction=left]{width:75%}.data-\\[vaul-drawer-direction\\=left\\]\\:border-r[data-vaul-drawer-direction=left]{border-right-style:var(--tw-border-style);border-right-width:1px}.data-\\[vaul-drawer-direction\\=right\\]\\:inset-y-0[data-vaul-drawer-direction=right]{inset-block:0}.data-\\[vaul-drawer-direction\\=right\\]\\:right-0[data-vaul-drawer-direction=right]{right:0}.data-\\[vaul-drawer-direction\\=right\\]\\:w-3\\/4[data-vaul-drawer-direction=right]{width:75%}.data-\\[vaul-drawer-direction\\=right\\]\\:border-l[data-vaul-drawer-direction=right]{border-left-style:var(--tw-border-style);border-left-width:1px}.data-\\[vaul-drawer-direction\\=top\\]\\:inset-x-0[data-vaul-drawer-direction=top]{inset-inline:0}.data-\\[vaul-drawer-direction\\=top\\]\\:top-0[data-vaul-drawer-direction=top]{top:0}.data-\\[vaul-drawer-direction\\=top\\]\\:mb-24[data-vaul-drawer-direction=top]{margin-bottom:calc(var(--spacing) * 24)}.data-\\[vaul-drawer-direction\\=top\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=top]{max-height:80vh}.data-\\[vaul-drawer-direction\\=top\\]\\:rounded-b-lg[data-vaul-drawer-direction=top]{border-bottom-right-radius:var(--radius-lg);border-bottom-left-radius:var(--radius-lg)}.data-\\[vaul-drawer-direction\\=top\\]\\:border-b[data-vaul-drawer-direction=top]{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.nth-last-2\\:-mt-1:nth-last-child(2){margin-top:calc(var(--spacing) * -1)}@media(min-width:40rem){.sm\\:block{display:block}.sm\\:flex{display:flex}.sm\\:max-w-lg{max-width:var(--container-lg)}.sm\\:max-w-sm{max-width:var(--container-sm)}.sm\\:flex-row{flex-direction:row}.sm\\:justify-end{justify-content:flex-end}.sm\\:gap-2\\.5{gap:calc(var(--spacing) * 2.5)}.sm\\:pr-2\\.5{padding-right:calc(var(--spacing) * 2.5)}.sm\\:pl-2\\.5{padding-left:calc(var(--spacing) * 2.5)}.sm\\:text-left{text-align:left}.data-\\[vaul-drawer-direction\\=left\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=left],.data-\\[vaul-drawer-direction\\=right\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=right]{max-width:var(--container-sm)}}@media(min-width:48rem){.md\\:absolute{position:absolute}.md\\:block{display:block}.md\\:flex{display:flex}.md\\:w-\\[var\\(--radix-navigation-menu-viewport-width\\)\\]{width:var(--radix-navigation-menu-viewport-width)}.md\\:w-auto{width:auto}.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.md\\:grid-cols-5{grid-template-columns:repeat(5,minmax(0,1fr))}.md\\:grid-cols-\\[minmax\\(180px\\,1fr\\)_minmax\\(180px\\,1fr\\)_auto\\]{grid-template-columns:minmax(180px,1fr) minmax(180px,1fr) auto}.md\\:flex-row{flex-direction:row}.md\\:gap-1\\.5{gap:calc(var(--spacing) * 1.5)}.md\\:p-6{padding:calc(var(--spacing) * 6)}.md\\:p-12{padding:calc(var(--spacing) * 12)}.md\\:text-left{text-align:left}.md\\:text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.md\\:opacity-0{opacity:0}.md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.peer)[data-variant=inset]~*){margin:calc(var(--spacing) * 2)}.md\\:peer-data-\\[variant\\=inset\\]\\:ml-0:is(:where(.peer)[data-variant=inset]~*){margin-left:0}.md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.peer)[data-variant=inset]~*){border-radius:var(--radius-xl)}.md\\:peer-data-\\[variant\\=inset\\]\\:shadow-sm:is(:where(.peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.md\\:peer-data-\\[variant\\=inset\\]\\:peer-data-\\[state\\=collapsed\\]\\:ml-2:is(:where(.peer)[data-variant=inset]~*):is(:where(.peer)[data-state=collapsed]~*){margin-left:calc(var(--spacing) * 2)}.md\\:after\\:hidden:after{content:var(--tw-content);display:none}}@media(min-width:64rem){.lg\\:block{display:block}.lg\\:inline{display:inline}.lg\\:max-h-none{max-height:none}.lg\\:w-56{width:calc(var(--spacing) * 56)}.lg\\:w-72{width:calc(var(--spacing) * 72)}.lg\\:grid-cols-\\[minmax\\(0\\,1fr\\)_288px\\]{grid-template-columns:minmax(0,1fr) 288px}.lg\\:grid-cols-\\[minmax\\(0\\,1fr\\)_auto\\]{grid-template-columns:minmax(0,1fr) auto}.lg\\:items-start{align-items:flex-start}.lg\\:justify-end{justify-content:flex-end}.lg\\:px-5{padding-inline:calc(var(--spacing) * 5)}}@media(min-width:80rem){.xl\\:col-span-2{grid-column:span 2/span 2}.xl\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.xl\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.xl\\:grid-cols-5{grid-template-columns:repeat(5,minmax(0,1fr))}.xl\\:grid-cols-\\[380px_minmax\\(0\\,1fr\\)\\]{grid-template-columns:380px minmax(0,1fr)}.xl\\:grid-cols-\\[minmax\\(0\\,1fr\\)_380px\\]{grid-template-columns:minmax(0,1fr) 380px}}@container field-group (min-width:28rem){.\\@md\\/field-group\\:flex-row{flex-direction:row}.\\@md\\/field-group\\:items-center{align-items:center}.\\@md\\/field-group\\:has-\\[\\>\\[data-slot\\=field-content\\]\\]\\:items-start:has(>[data-slot=field-content]){align-items:flex-start}}@media(prefers-color-scheme:dark){.dark\\:bg-transparent{background-color:#0000}.dark\\:has-data-\\[state\\=checked\\]\\:bg-primary\\/10:has([data-state=checked]){background-color:var(--color-primary)}@supports (color:color-mix(in lab,red,red)){.dark\\:has-data-\\[state\\=checked\\]\\:bg-primary\\/10:has([data-state=checked]){background-color:color-mix(in oklab,var(--color-primary) 10%,transparent)}}.dark\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--color-foreground)}.dark\\:data-\\[state\\=checked\\]\\:bg-primary[data-state=checked]{background-color:var(--color-primary)}.dark\\:data-\\[state\\=unchecked\\]\\:bg-foreground[data-state=unchecked]{background-color:var(--color-foreground)}}.\\[\\&_\\.recharts-cartesian-grid_line\\[stroke\\=\\'\\#ccc\\'\\]\\]\\:stroke-border\\/50 .recharts-cartesian-grid line[stroke="#ccc"]{stroke:var(--color-border)}@supports (color:color-mix(in lab,red,red)){.\\[\\&_\\.recharts-cartesian-grid_line\\[stroke\\=\\'\\#ccc\\'\\]\\]\\:stroke-border\\/50 .recharts-cartesian-grid line[stroke="#ccc"]{stroke:color-mix(in oklab,var(--color-border) 50%,transparent)}}.\\[\\&_\\.recharts-curve\\.recharts-tooltip-cursor\\]\\:stroke-border .recharts-curve.recharts-tooltip-cursor{stroke:var(--color-border)}.\\[\\&_\\.recharts-dot\\[stroke\\=\\'\\#fff\\'\\]\\]\\:stroke-transparent .recharts-dot[stroke="#fff"]{stroke:#0000}.\\[\\&_\\.recharts-layer\\]\\:outline-hidden .recharts-layer{--tw-outline-style:none;outline-style:none}@media(forced-colors:active){.\\[\\&_\\.recharts-layer\\]\\:outline-hidden .recharts-layer{outline-offset:2px;outline:2px solid #0000}}.\\[\\&_\\.recharts-polar-grid_\\[stroke\\=\\'\\#ccc\\'\\]\\]\\:stroke-border .recharts-polar-grid [stroke="#ccc"]{stroke:var(--color-border)}.\\[\\&_\\.recharts-radial-bar-background-sector\\]\\:fill-muted .recharts-radial-bar-background-sector,.\\[\\&_\\.recharts-rectangle\\.recharts-tooltip-cursor\\]\\:fill-muted .recharts-rectangle.recharts-tooltip-cursor{fill:var(--color-muted)}.\\[\\&_\\.recharts-reference-line_\\[stroke\\=\\'\\#ccc\\'\\]\\]\\:stroke-border .recharts-reference-line [stroke="#ccc"]{stroke:var(--color-border)}.\\[\\&_\\.recharts-sector\\]\\:outline-hidden .recharts-sector{--tw-outline-style:none;outline-style:none}@media(forced-colors:active){.\\[\\&_\\.recharts-sector\\]\\:outline-hidden .recharts-sector{outline-offset:2px;outline:2px solid #0000}}.\\[\\&_\\.recharts-sector\\[stroke\\=\\'\\#fff\\'\\]\\]\\:stroke-transparent .recharts-sector[stroke="#fff"]{stroke:#0000}.\\[\\&_\\.recharts-surface\\]\\:outline-hidden .recharts-surface{--tw-outline-style:none;outline-style:none}@media(forced-colors:active){.\\[\\&_\\.recharts-surface\\]\\:outline-hidden .recharts-surface{outline-offset:2px;outline:2px solid #0000}}.\\[\\&_\\[cmdk-group-heading\\]\\]\\:px-2 [cmdk-group-heading]{padding-inline:calc(var(--spacing) * 2)}.\\[\\&_\\[cmdk-group-heading\\]\\]\\:py-1\\.5 [cmdk-group-heading]{padding-block:calc(var(--spacing) * 1.5)}.\\[\\&_\\[cmdk-group-heading\\]\\]\\:text-xs [cmdk-group-heading]{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.\\[\\&_\\[cmdk-group-heading\\]\\]\\:font-medium [cmdk-group-heading]{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.\\[\\&_\\[cmdk-group\\]\\]\\:px-2 [cmdk-group]{padding-inline:calc(var(--spacing) * 2)}.\\[\\&_\\[cmdk-group\\]\\:not\\(\\[hidden\\]\\)_\\~\\[cmdk-group\\]\\]\\:pt-0 [cmdk-group]:not([hidden])~[cmdk-group]{padding-top:0}.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:h-5 [cmdk-input-wrapper] svg{height:calc(var(--spacing) * 5)}.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:w-5 [cmdk-input-wrapper] svg{width:calc(var(--spacing) * 5)}.\\[\\&_\\[cmdk-input\\]\\]\\:h-12 [cmdk-input]{height:calc(var(--spacing) * 12)}.\\[\\&_\\[cmdk-item\\]\\]\\:px-2 [cmdk-item]{padding-inline:calc(var(--spacing) * 2)}.\\[\\&_\\[cmdk-item\\]\\]\\:py-3 [cmdk-item]{padding-block:calc(var(--spacing) * 3)}.\\[\\&_\\[cmdk-item\\]_svg\\]\\:h-5 [cmdk-item] svg{height:calc(var(--spacing) * 5)}.\\[\\&_\\[cmdk-item\\]_svg\\]\\:w-5 [cmdk-item] svg{width:calc(var(--spacing) * 5)}.\\[\\&_img\\]\\:size-full img{width:100%;height:100%}.\\[\\&_img\\]\\:object-cover img{object-fit:cover}.\\[\\&_p\\]\\:leading-relaxed p{--tw-leading:var(--leading-relaxed);line-height:var(--leading-relaxed)}.\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.\\[\\&_svg\\:not\\(\\[class\\*\\=\\'size-\\'\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(var(--spacing) * 3);height:calc(var(--spacing) * 3)}.\\[\\&_svg\\:not\\(\\[class\\*\\=\\'size-\\'\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(var(--spacing) * 4);height:calc(var(--spacing) * 4)}.\\[\\&_svg\\:not\\(\\[class\\*\\=\\'size-\\'\\]\\)\\]\\:size-6 svg:not([class*=size-]){width:calc(var(--spacing) * 6);height:calc(var(--spacing) * 6)}.\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.\\[\\&\\+\\[data-slot\\=item-content\\]\\]\\:flex-none+[data-slot=item-content]{flex:none}.\\[\\&\\:first-child\\[data-selected\\=true\\]_button\\]\\:rounded-l-md:first-child[data-selected=true] button{border-top-left-radius:var(--radius-md);border-bottom-left-radius:var(--radius-md)}.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-0:has([role=checkbox]){padding-right:0}.\\[\\.border-b\\]\\:pb-3.border-b{padding-bottom:calc(var(--spacing) * 3)}.\\[\\.border-b\\]\\:pb-6.border-b{padding-bottom:calc(var(--spacing) * 6)}.\\[\\.border-t\\]\\:pt-3.border-t{padding-top:calc(var(--spacing) * 3)}.\\[\\.border-t\\]\\:pt-6.border-t{padding-top:calc(var(--spacing) * 6)}:is(.rtl\\:\\*\\*\\:\\[\\.rdp-button\\\\_next\\>svg\\]\\:rotate-180:where(:dir(rtl),[dir=rtl],[dir=rtl] *) *):is(.rdp-button_next>svg),:is(.rtl\\:\\*\\*\\:\\[\\.rdp-button\\\\_previous\\>svg\\]\\:rotate-180:where(:dir(rtl),[dir=rtl],[dir=rtl] *) *):is(.rdp-button_previous>svg){rotate:180deg}.\\[a\\]\\:transition-colors:is(a){transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}:is(.\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(var(--spacing) * 2)}.\\[\\&\\:last-child\\[data-selected\\=true\\]_button\\]\\:rounded-r-md:last-child[data-selected=true] button{border-top-right-radius:var(--radius-md);border-bottom-right-radius:var(--radius-md)}.\\[\\&\\:nth-child\\(2\\)\\[data-selected\\=true\\]_button\\]\\:rounded-l-md:nth-child(2)[data-selected=true] button{border-top-left-radius:var(--radius-md);border-bottom-left-radius:var(--radius-md)}.\\[\\&\\>\\*\\]\\:w-full>*{width:100%}.\\[\\&\\>\\*\\]\\:focus-visible\\:relative>:focus-visible{position:relative}.\\[\\&\\>\\*\\]\\:focus-visible\\:z-10>:focus-visible{z-index:10}.\\[\\&\\>\\*\\]\\:data-\\[slot\\=field\\]\\:p-4>[data-slot=field]{padding:calc(var(--spacing) * 4)}@container field-group (min-width:28rem){.\\@md\\/field-group\\:\\[\\&\\>\\*\\]\\:w-auto>*{width:auto}}.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-l-none>:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0}.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-l-0>:not(:first-child){border-left-style:var(--tw-border-style);border-left-width:0}.\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-r-none>:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0}.\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.\\[\\&\\>\\.sr-only\\]\\:w-auto>.sr-only{width:auto}.\\[\\&\\>\\[data-slot\\=field-group\\]\\]\\:gap-4>[data-slot=field-group]{gap:calc(var(--spacing) * 4)}.\\[\\&\\>\\[data-slot\\=field-label\\]\\]\\:flex-auto>[data-slot=field-label]{flex:auto}@container field-group (min-width:28rem){.\\@md\\/field-group\\:\\[\\&\\>\\[data-slot\\=field-label\\]\\]\\:flex-auto>[data-slot=field-label]{flex:auto}}.has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-r-md:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-top-right-radius:var(--radius-md);border-bottom-right-radius:var(--radius-md)}.\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=\\'w-\\'\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.\\[\\&\\>\\[role\\=checkbox\\]\\]\\:translate-y-\\[2px\\]>[role=checkbox]{--tw-translate-y:2px;translate:var(--tw-translate-x) var(--tw-translate-y)}.has-\\[\\>\\[data-slot\\=field-content\\]\\]\\:\\[\\&\\>\\[role\\=checkbox\\]\\,\\[role\\=radio\\]\\]\\:mt-px:has(>[data-slot=field-content])>[role=checkbox],.has-\\[\\>\\[data-slot\\=field-content\\]\\]\\:\\[\\&\\>\\[role\\=checkbox\\]\\,\\[role\\=radio\\]\\]\\:mt-px:has(>[data-slot=field-content]) [role=radio]{margin-top:1px}@container field-group (min-width:28rem){.\\@md\\/field-group\\:has-\\[\\>\\[data-slot\\=field-content\\]\\]\\:\\[\\&\\>\\[role\\=checkbox\\]\\,\\[role\\=radio\\]\\]\\:mt-px:has(>[data-slot=field-content])>[role=checkbox],.\\@md\\/field-group\\:has-\\[\\>\\[data-slot\\=field-content\\]\\]\\:\\[\\&\\>\\[role\\=checkbox\\]\\,\\[role\\=radio\\]\\]\\:mt-px:has(>[data-slot=field-content]) [role=radio]{margin-top:1px}}.\\[\\&\\>a\\]\\:underline>a{text-decoration-line:underline}.\\[\\&\\>a\\]\\:underline-offset-4>a{text-underline-offset:4px}.\\[\\&\\>a\\:hover\\]\\:text-primary>a:hover{color:var(--color-primary)}.\\[\\&\\>button\\]\\:hidden>button{display:none}.\\[\\&\\>input\\]\\:flex-1>input{flex:1}.has-\\[\\>\\[data-align\\=block-end\\]\\]\\:\\[\\&\\>input\\]\\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(var(--spacing) * 3)}.has-\\[\\>\\[data-align\\=block-start\\]\\]\\:\\[\\&\\>input\\]\\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(var(--spacing) * 3)}.has-\\[\\>\\[data-align\\=inline-end\\]\\]\\:\\[\\&\\>input\\]\\:pr-2:has(>[data-align=inline-end])>input{padding-right:calc(var(--spacing) * 2)}.has-\\[\\>\\[data-align\\=inline-start\\]\\]\\:\\[\\&\\>input\\]\\:pl-2:has(>[data-align=inline-start])>input{padding-left:calc(var(--spacing) * 2)}.\\[\\&\\>kbd\\]\\:rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]>kbd{border-radius:calc(var(--radius) - 5px)}.\\[\\&\\>span\\]\\:text-xs>span{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.\\[\\&\\>span\\]\\:opacity-70>span{opacity:.7}.\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.\\[\\&\\>svg\\]\\:size-3>svg{width:calc(var(--spacing) * 3);height:calc(var(--spacing) * 3)}.\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(var(--spacing) * 3.5);height:calc(var(--spacing) * 3.5)}.\\[\\&\\>svg\\]\\:size-4>svg{width:calc(var(--spacing) * 4);height:calc(var(--spacing) * 4)}.\\[\\&\\>svg\\]\\:h-2\\.5>svg{height:calc(var(--spacing) * 2.5)}.\\[\\&\\>svg\\]\\:h-3>svg{height:calc(var(--spacing) * 3)}.\\[\\&\\>svg\\]\\:w-2\\.5>svg{width:calc(var(--spacing) * 2.5)}.\\[\\&\\>svg\\]\\:w-3>svg{width:calc(var(--spacing) * 3)}.\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.\\[\\&\\>svg\\]\\:translate-y-0\\.5>svg{--tw-translate-y:calc(var(--spacing) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}.\\[\\&\\>svg\\]\\:text-current>svg{color:currentColor}.\\[\\&\\>svg\\:not\\(\\[class\\*\\=\\'size-\\'\\]\\)\\]\\:size-3\\.5>svg:not([class*=size-]){width:calc(var(--spacing) * 3.5);height:calc(var(--spacing) * 3.5)}.\\[\\&\\>svg\\:not\\(\\[class\\*\\=\\'size-\\'\\]\\)\\]\\:size-4>svg:not([class*=size-]){width:calc(var(--spacing) * 4);height:calc(var(--spacing) * 4)}.\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.\\[\\&\\[data-panel-group-direction\\=vertical\\]\\>div\\]\\:rotate-90[data-panel-group-direction=vertical]>div{rotate:90deg}.\\[\\&\\[data-state\\=open\\]\\>svg\\]\\:rotate-180[data-state=open]>svg{rotate:180deg}[data-side=left][data-collapsible=offcanvas] .\\[\\[data-side\\=left\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-right-2{right:calc(var(--spacing) * -2)}[data-side=left][data-state=collapsed] .\\[\\[data-side\\=left\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=right][data-collapsible=offcanvas] .\\[\\[data-side\\=right\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-left-2{left:calc(var(--spacing) * -2)}[data-side=right][data-state=collapsed] .\\[\\[data-side\\=right\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-slot=card-content] .\\[\\[data-slot\\=card-content\\]_\\&\\]\\:bg-transparent,[data-slot=popover-content] .\\[\\[data-slot\\=popover-content\\]_\\&\\]\\:bg-transparent{background-color:#0000}[data-slot=tooltip-content] .\\[\\[data-slot\\=tooltip-content\\]_\\&\\]\\:bg-background\\/20{background-color:var(--color-background)}@supports (color:color-mix(in lab,red,red)){[data-slot=tooltip-content] .\\[\\[data-slot\\=tooltip-content\\]_\\&\\]\\:bg-background\\/20{background-color:color-mix(in oklab,var(--color-background) 20%,transparent)}}[data-slot=tooltip-content] .\\[\\[data-slot\\=tooltip-content\\]_\\&\\]\\:text-background{color:var(--color-background)}@media(prefers-color-scheme:dark){[data-slot=tooltip-content] .dark\\:\\[\\[data-slot\\=tooltip-content\\]_\\&\\]\\:bg-background\\/10{background-color:var(--color-background)}@supports (color:color-mix(in lab,red,red)){[data-slot=tooltip-content] .dark\\:\\[\\[data-slot\\=tooltip-content\\]_\\&\\]\\:bg-background\\/10{background-color:color-mix(in oklab,var(--color-background) 10%,transparent)}}}[data-variant=legend]+.\\[\\[data-variant\\=legend\\]\\+\\&\\]\\:-mt-1\\.5{margin-top:calc(var(--spacing) * -1.5)}@media(hover:hover){a.\\[a\\&\\]\\:hover\\:bg-primary\\/90:hover{background-color:var(--color-primary)}@supports (color:color-mix(in lab,red,red)){a.\\[a\\&\\]\\:hover\\:bg-primary\\/90:hover{background-color:color-mix(in oklab,var(--color-primary) 90%,transparent)}}}.expedient-crew{height:100%;min-height:620px;color:var(--text);background:var(--bg);font:14px/1.5 var(--font-body,system-ui,sans-serif);isolation:isolate}.expedient-crew *,.expedient-crew :before,.expedient-crew :after{box-sizing:border-box;border-color:var(--border)}.expedient-crew>.flex{height:100%;min-height:620px}.expedient-crew [class*=bg-slate-9]{background-color:var(--card)!important}.expedient-crew .bg-slate-950{background-color:var(--bg)!important}.expedient-crew [class*=bg-slate-8],.expedient-crew [class*=bg-slate-7]{background-color:var(--text)!important}@supports (color:color-mix(in lab,red,red)){.expedient-crew [class*=bg-slate-8],.expedient-crew [class*=bg-slate-7]{background-color:color-mix(in srgb,var(--text) 5%,var(--card))!important}}.expedient-crew [class*=text-slate-1],.expedient-crew [class*=text-slate-2],.expedient-crew [class*=text-slate-3]{color:var(--text)!important}.expedient-crew [class*=text-slate-4],.expedient-crew [class*=text-slate-5],.expedient-crew [class*=text-slate-6]{color:var(--muted)!important}.expedient-crew [class*=border-slate]{border-color:var(--border)!important}.expedient-crew [class*=text-cyan]{color:var(--accent)!important}.expedient-crew [class*=bg-cyan-5]{background-color:var(--accent)!important;color:var(--accent-fg,#fff)!important}.expedient-crew [class*="bg-cyan-500/"],.expedient-crew [class*=bg-cyan-9]{background-color:var(--accent)!important}@supports (color:color-mix(in lab,red,red)){.expedient-crew [class*="bg-cyan-500/"],.expedient-crew [class*=bg-cyan-9]{background-color:color-mix(in srgb,var(--accent) 12%,var(--card))!important}}.expedient-crew [class*="bg-cyan-500/"],.expedient-crew [class*=bg-cyan-9]{color:var(--accent)!important}.expedient-crew [class*=text-rose],.expedient-crew [class*=text-red]{color:var(--danger,#c74343)!important}.expedient-crew [class*=text-emerald]{color:var(--ok,#26916d)!important}.expedient-crew input,.expedient-crew select,.expedient-crew textarea{color:var(--text);background:var(--bg);border:1px solid var(--border);border-radius:6px}.expedient-crew input::placeholder,.expedient-crew textarea::placeholder{color:var(--muted);opacity:1}.expedient-crew :focus-visible{outline:2px solid var(--accent);outline-offset:3px}.expedient-crew ::selection{background:var(--accent);color:var(--accent-fg,#fff)}.expedient-crew button,.expedient-crew a{min-height:32px}.expedient-crew button{font:inherit;border:1px solid var(--border);color:inherit;cursor:pointer;background-color:#0000}.expedient-crew nav button{border:0}.expedient-crew nav button:not(:hover):not([class*=bg-cyan]){background-color:#0000!important}.expedient-crew .bg-primary{background-color:var(--accent)!important;color:var(--accent-fg,#fff)!important}.expedient-crew .text-primary-foreground{color:var(--accent-fg,#fff)!important}.expedient-crew button:disabled{cursor:not-allowed;opacity:.55}.expedient-crew pre{font-size:12px;line-height:1.6}.expedient-crew main{min-width:0}.expedient-crew h1{font-size:26px;line-height:1.25}.expedient-crew .h-screen{height:100%!important}@media(max-width:700px){.expedient-crew aside{width:64px}.expedient-crew main{padding:16px}.expedient-crew button{min-height:40px}}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}`;
function _s() {
  const e = da(), a = Re(() => ws(e), [e]);
  return ft(a), K(() => () => ft(void 0), []), /* @__PURE__ */ o("div", { className: "expedient-crew", children: [
    /* @__PURE__ */ t("style", { children: xs }),
    /* @__PURE__ */ t(vs, {})
  ] });
}
export {
  _s as default
};
