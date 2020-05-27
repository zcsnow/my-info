!function() {
    function n(n) {
        if (0 === sn.$(".loading").length)
            return s();
        var o = 3e3
          , e = !1;
        window.__snTimeOut__ = setTimeout(function() {
            e = !0,
            sn.evt.unbind(window, "load"),
            t(n)
        }, o),
        sn.evt.bind(document, l, function(n) {
            n.stopPropagation(),
            n.preventDefault()
        }),
        sn.evt.bind(window, "load", function() {
            clearTimeout(window.__snTimeOut__),
            e || t(n)
        })
    }
    function t(n) {
        sn("body").css("add", "loaded");
        var t = sn(".loading");
        t.css("add", "hiding"),
        sn.evt.unbind(document, l),
        t.css("add", "hide"),
        a(),
        n()
    }
    function o() {
        if (!sn.css(sn.$("body")[0])._contains("nogo2top")) {
            if (0 === sn.$(".go2top").length) {
                var n = document.createElement("div");
                n.className = "go2top",
                n.setAttribute("clstag", "pageclick|keycount|zanH_bottom3_201603051|10"),
                n.innerHTML = '<img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="icon rock" data-event-agent="touchend|go2top">',
                document.body.appendChild(n),
                sn.css(sn.$("body")[0])._contains("global-event-agent") ? sn.agent.touchend.go2top = function(n, t) {
                    if (!t) {
                        var o = this.parentNode
                          , e = this;
                        sn.css(e).add("rocking");
                        var o = e.parentNode;
                        setTimeout(function() {
                            i(),
                            sn.css(e).remove("rocking"),
                            sn.css(o.parentNode).remove("show")
                        }, 400)
                    }
                }
                : sn(".go2top img").bind("touchend", function(n, t) {
                    sn.obstructClick();
                    var o = this.parentNode;
                    i(),
                    sn.css(o.parentNode).remove("show")
                })
            }
            sn.evt.on(window, "scroll", function() {
                var n = 0;
                document.documentElement && (n = document.documentElement.scrollTop),
                0 === n && document.body && (n = document.body.scrollTop),
                e(n)
            })
        }
    }
    function e(n) {
        var t = sn.body().wh;
        if (t > n || m)
            return void sn.css(sn.$(".go2top")[0]).remove("show");
        var o = .5 * t;
        document.body.scrollHeight - t;
        n > o ? sn.css(sn.$(".go2top")[0]).add("show") : sn.css(sn.$(".go2top")[0]).remove("show")
    }
    function i() {
        var n = (sn.body().wh,
        document.body.scrollTop)
          , t = function() {
            m = !0;
            var t = 10
              , o = Math.floor(n / t);
            sn.animate(function(t, e) {
                document.documentElement && (document.documentElement.scrollTop = n - o * t),
                document.body && (document.body.scrollTop = n - o * t)
            }, t, 40, function() {
                document.documentElement && (document.documentElement.scrollTop = 0),
                document.body && (document.body.scrollTop = 0),
                m = !1
            }, -1)
        };
        t()
    }
    function s() {
        a(),
        window.globalZJdComTask = {
            push: function(n) {
                n()
            }
        }
    }
    function a() {
        sn.css(sn.$("body")[0])._contains("global-event-agent") && sn.Agent(),
        sn.css(sn.$("body")[0])._contains("global-lazy-load") && sn.snload(),
        o(),
        r()
    }
    function r() {}
    function u(n) {
        var t, o = 12, e = o, i = sn.$("html")[0].getAttribute("data-dpr");
        i && i in f && (e = f[i](2 * o)),
        0 === sn.$(".fadeOutTags").length ? (t = sn.createDom({
            tag: "div",
            className: "fadeOutTags"
        }),
        document.body.appendChild(t)) : t = sn.$(".fadeOutTags")[0],
        t.style.display = "block",
        t.style.fontSize = e + "px",
        u.one || (u.one = !0,
        sn.evt.bind(t, "touchmove", function(n) {
            n.stopPropagation(),
            n.preventDefault()
        }),
        sn.evt.bind(t, "webkitAnimationEnd", function() {
            t.style.display = "none"
        })),
        t.innerHTML = "<span>" + n + "</span>"
    }
    function c(n) {
        function t(n, t) {
            o.history && sn.cookie(r, n),
            sn.transition(n + 1, o.name, s, o.cardCurr, {
                begin: function(n, t, e, i) {
                    o.begin(n, t, e, i)
                },
                end: function(s, a, r, u, c) {
                    i = !1,
                    e = n,
                    o.end(s, a, r, u, c),
                    "function" == typeof t && t()
                }
            })
        }
        n = n || {};
        var o = {
            navCls: "card-nav-item",
            navCurr: "curr",
            cardCls: "card-page",
            cardCurr: "show",
            ajax_begin: void 0,
            name: "move",
            begin: function(n, t, o, e) {},
            end: function(n, t, o, e, i) {},
            root: document.body,
            history: !0
        };
        sn.copy(o, n);
        for (var e = 0, i = !1, s = sn.$("." + o.cardCls, o.root), a = sn.$("." + o.navCls, o.root), r = encodeURIComponent(window.location.pathname), u = sn.cookie(r), c = 0, d = a.length; d > c; c++)
            if (sn.css(a[c])._contains(o.navCurr)) {
                e = c;
                break
            }
        o.history && null !== u && "string" == typeof u && !isNaN(u - 0) && u - 0 >= 0 && u - 0 < a.length && (sn.css(a[e]).remove(o.navCurr),
        e = u - 0,
        sn.css(a[e]).add(o.navCurr)),
        t(e);
        var l = function(n) {
            if ("undefined" != typeof n) {
                var t = n.parentNode;
                t.getAttribute("data-fix-height") && (t.style.height = n.offsetHeight + "px")
            }
        };
        return l(sn.$("." + o.cardCls + "." + o.cardCurr, o.root)[0]),
        sn(a).unbind("click"),
        sn(a).bind("click", function(n) {
            n.preventDefault();
            var r, u = (this.parentNode,
            sn.index(this) - 0), c = function() {
                sn(s).unbind("touchstart,touchmove,touchend"),
                i = !1
            };
            return u === e || i ? void (r = setTimeout(function() {
                c()
            }, 300)) : (clearTimeout(r),
            i = !0,
            sn.css(a[e]).remove(o.navCurr),
            sn.css(this).add(o.navCurr),
            sn(s).bind("touchstart,touchmove,touchend", function(n) {
                n.stopPropagation(),
                n.preventDefault()
            }),
            "function" == typeof o.ajax_begin && o.ajax_begin(e, u, s, function() {
                t(u, function() {
                    c()
                })
            }),
            void ("undefined" == typeof o.ajax_begin && t(u, function() {
                c()
            })))
        }),
        {
            fixHeight: function() {
                l(sn.$("." + o.cardCls + "." + o.cardCurr, o.root)[0])
            }
        }
    }
    function d(n) {
        var t;
        0 === sn.$(".sn-ui-tips").length ? (t = sn.createDom({
            tag: "div",
            className: "sn-ui-tips"
        }),
        document.body.appendChild(t)) : t = sn.$(".sn-ui-tips")[0],
        t.style.display = "block",
        d.one || (d.one = !0,
        sn.evt.bind(t, "touchmove", function(n) {
            n.stopPropagation(),
            n.preventDefault()
        }),
        sn.evt.bind(t, "webkitAnimationEnd", function() {
            t.style.display = "none"
        })),
        t.innerHTML = "<span>" + n + "</span>"
    }
    var l = "touchstart,touchmove,touchend";
    window.globalZJdComTask = [],
    window.ctags = u,
    window.commonCard = c,
    window.stips = d;
    var m = !1;
    n(function() {
        for (var n; n = globalZJdComTask.shift(); )
            n()
    });
    var f = {
        2: function(n) {
            return 1 * n
        },
        2.5: function(n) {
            return 1 * Math.round(2.5 * n / 2)
        },
        2.75: function(n) {
            return 1 * Math.round(2.75 * n / 2)
        },
        3: function(n) {
            return 1 * Math.round(3 * n / 2)
        },
        4: function(n) {
            return 2 * n
        }
    }
}("common loading gotop"),
function() {
    window.validate_middleware = function() {
        function n(n, e) {
            var i = o(e);
            for (var s in i) {
                var e = i[s];
                n[s] = t(s, e)
            }
            return n
        }
        function t(n, t) {
            return function(o) {
                return "function" == typeof t ? t(o) : e(n, o, t)
            }
        }
        function o(n) {
            var t = {};
            for (var o in n) {
                var e = n[o];
                i(e) ? t[o] = {
                    min: e[2] ? e[2][0] : !1,
                    max: e[2] ? e[2][1] : !1,
                    reg: e[3] || null,
                    exist: e[1],
                    name: e[0] || "",
                    reg_msg: e[4] || ""
                } : t[o] = e
            }
            return t
        }
        function e(n, t, o) {
            var e = ""
              , i = !0;
            if ("string" != typeof t && "number" != typeof t)
                return !1;
            var s = "";
            s = o.name,
            t = t.toString();
            var a = t.length;
            return o.exist && "" === t ? (e = s + "不能为空",
            i = !1) : o.min && a < o.min ? (e = s + "不能小于" + o.min + "位," + s + "长度为" + o.min + " ~ " + o.max + "位",
            i = !1) : o.max && a > o.max ? (e = s + "不能大于" + o.max + "位," + s + "长度为" + o.min + " ~ " + o.max + "位",
            i = !1) : o.reg && !o.reg.test(t) && (e = o.reg_msg,
            i = !1),
            {
                status: i,
                msg: e,
                key: n
            }
        }
        function i(n) {
            return "[object Array]" === Object.prototype.toString.call(n)
        }
        function s(n, t) {
            for (var o in t)
                n[o] = t[o];
            return n
        }
        var a = {}
          , r = {}
          , u = {
            email: ["邮箱", !0, [1, 100], /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/i, "邮箱地址无效"],
            captcha: ["验证码", !0, void 0, /^\d{4,10}$/, "验证码不正确"],
            mobile: ["移动电话", !0, null, /^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/, "手机号格式不正确"],
            username: ["用户名", !0, [4, 16], /^[a-zA-Z][\w\-]+$/, "用户名只允许字母、数字、下划线、横线组成，首位只能为字母, 且至少需要 4 个字符"],
            password: ["密码", !0, [6, 26], /^.{5,25}$/, "密码只能为 6 - 26 位数字，字母及常用符号组成"],
            code: ["短信验证码", !0, null, /^\d{6}$/, "请填写6位数字验证码"],
            ID_card: ["身份证号码", !0, null, /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/, "请输入正确的身份证号码"],
            time: ["时间", !0, null, /^([01]\d|2[0-3])(:[0-5]\d){1,2}$/, "请输入正确的时间,例:14:30或14:30:00"],
            url: ["网址", !0, null, /^(https?|ftp):\/\/[^\s]+$/i, "网址格式不正确"],
            postcode: ["邮政编码", !0, null, /^(https?|ftp):\/\/[^\s]+$/i, "邮政编码格式不正确"],
            chinese: ["中文", !0, null, /^[\u0391-\uFFE5]+$/, "请输入中文"],
            chineseName: ["中文名", !0, null, /^[\u0391-\uFFE5]{2,6}$/, "请输入2-6个汉字中文"],
            address: ["地址", !0, null, /^[\u0391-\uFFE5][\u0391-\uFFE5\d]+$/, "填写正确的地址"],
            agreement: ["注册协议", !0, null, /^.{1,10}$/, "填阅读注册协议"],
            date: ["日期", !0, null, /^[\u0391-\uFFE5][\u0391-\uFFE5\d]+$/, "日期格式:yyyy-mm-dd"]
        };
        return a.REG = u,
        a.validate = function(t) {
            return t = t || {},
            n(r, s(u, t))
        }
        ,
        a
    }()
}("vld");
