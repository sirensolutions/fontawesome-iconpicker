(function(a) {
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], a);
    } else {
        a(jQuery);
    }
})(function(a) {
    a.ui = a.ui || {};
    var b = a.ui.version = "1.12.1";
    (function() {
        var b, c = Math.max, d = Math.abs, e = /left|center|right/, f = /top|center|bottom/, g = /[\+\-]\d+(\.[\d]+)?%?/, h = /^\w+/, i = /%$/, j = a.fn.pos;
        function k(a, b, c) {
            return [ parseFloat(a[0]) * (i.test(a[0]) ? b / 100 : 1), parseFloat(a[1]) * (i.test(a[1]) ? c / 100 : 1) ];
        }
        function l(b, c) {
            return parseInt(a.css(b, c), 10) || 0;
        }
        function m(b) {
            var c = b[0];
            if (c.nodeType === 9) {
                return {
                    width: b.width(),
                    height: b.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                };
            }
            if (a.isWindow(c)) {
                return {
                    width: b.width(),
                    height: b.height(),
                    offset: {
                        top: b.scrollTop(),
                        left: b.scrollLeft()
                    }
                };
            }
            if (c.preventDefault) {
                return {
                    width: 0,
                    height: 0,
                    offset: {
                        top: c.pageY,
                        left: c.pageX
                    }
                };
            }
            return {
                width: b.outerWidth(),
                height: b.outerHeight(),
                offset: b.offset()
            };
        }
        a.pos = {
            scrollbarWidth: function() {
                if (b !== undefined) {
                    return b;
                }
                var c, d, e = a("<div " + "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" + "<div style='height:100px;width:auto;'></div></div>"), f = e.children()[0];
                a("body").append(e);
                c = f.offsetWidth;
                e.css("overflow", "scroll");
                d = f.offsetWidth;
                if (c === d) {
                    d = e[0].clientWidth;
                }
                e.remove();
                return b = c - d;
            },
            getScrollInfo: function(b) {
                var c = b.isWindow || b.isDocument ? "" : b.element.css("overflow-x"), d = b.isWindow || b.isDocument ? "" : b.element.css("overflow-y"), e = c === "scroll" || c === "auto" && b.width < b.element[0].scrollWidth, f = d === "scroll" || d === "auto" && b.height < b.element[0].scrollHeight;
                return {
                    width: f ? a.pos.scrollbarWidth() : 0,
                    height: e ? a.pos.scrollbarWidth() : 0
                };
            },
            getWithinInfo: function(b) {
                var c = a(b || window), d = a.isWindow(c[0]), e = !!c[0] && c[0].nodeType === 9, f = !d && !e;
                return {
                    element: c,
                    isWindow: d,
                    isDocument: e,
                    offset: f ? a(b).offset() : {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: c.scrollLeft(),
                    scrollTop: c.scrollTop(),
                    width: c.outerWidth(),
                    height: c.outerHeight()
                };
            }
        };
        a.fn.pos = function(b) {
            if (!b || !b.of) {
                return j.apply(this, arguments);
            }
            b = a.extend({}, b);
            var i, n, o, p, q, r, s = a(b.of), t = a.pos.getWithinInfo(b.within), u = a.pos.getScrollInfo(t), v = (b.collision || "flip").split(" "), w = {};
            r = m(s);
            if (s[0].preventDefault) {
                b.at = "left top";
            }
            n = r.width;
            o = r.height;
            p = r.offset;
            q = a.extend({}, p);
            a.each([ "my", "at" ], function() {
                var a = (b[this] || "").split(" "), c, d;
                if (a.length === 1) {
                    a = e.test(a[0]) ? a.concat([ "center" ]) : f.test(a[0]) ? [ "center" ].concat(a) : [ "center", "center" ];
                }
                a[0] = e.test(a[0]) ? a[0] : "center";
                a[1] = f.test(a[1]) ? a[1] : "center";
                c = g.exec(a[0]);
                d = g.exec(a[1]);
                w[this] = [ c ? c[0] : 0, d ? d[0] : 0 ];
                b[this] = [ h.exec(a[0])[0], h.exec(a[1])[0] ];
            });
            if (v.length === 1) {
                v[1] = v[0];
            }
            if (b.at[0] === "right") {
                q.left += n;
            } else if (b.at[0] === "center") {
                q.left += n / 2;
            }
            if (b.at[1] === "bottom") {
                q.top += o;
            } else if (b.at[1] === "center") {
                q.top += o / 2;
            }
            i = k(w.at, n, o);
            q.left += i[0];
            q.top += i[1];
            return this.each(function() {
                var e, f, g = a(this), h = g.outerWidth(), j = g.outerHeight(), m = l(this, "marginLeft"), r = l(this, "marginTop"), x = h + m + l(this, "marginRight") + u.width, y = j + r + l(this, "marginBottom") + u.height, z = a.extend({}, q), A = k(w.my, g.outerWidth(), g.outerHeight());
                if (b.my[0] === "right") {
                    z.left -= h;
                } else if (b.my[0] === "center") {
                    z.left -= h / 2;
                }
                if (b.my[1] === "bottom") {
                    z.top -= j;
                } else if (b.my[1] === "center") {
                    z.top -= j / 2;
                }
                z.left += A[0];
                z.top += A[1];
                e = {
                    marginLeft: m,
                    marginTop: r
                };
                a.each([ "left", "top" ], function(c, d) {
                    if (a.ui.pos[v[c]]) {
                        a.ui.pos[v[c]][d](z, {
                            targetWidth: n,
                            targetHeight: o,
                            elemWidth: h,
                            elemHeight: j,
                            collisionPosition: e,
                            collisionWidth: x,
                            collisionHeight: y,
                            offset: [ i[0] + A[0], i[1] + A[1] ],
                            my: b.my,
                            at: b.at,
                            within: t,
                            elem: g
                        });
                    }
                });
                if (b.using) {
                    f = function(a) {
                        var e = p.left - z.left, f = e + n - h, i = p.top - z.top, k = i + o - j, l = {
                            target: {
                                element: s,
                                left: p.left,
                                top: p.top,
                                width: n,
                                height: o
                            },
                            element: {
                                element: g,
                                left: z.left,
                                top: z.top,
                                width: h,
                                height: j
                            },
                            horizontal: f < 0 ? "left" : e > 0 ? "right" : "center",
                            vertical: k < 0 ? "top" : i > 0 ? "bottom" : "middle"
                        };
                        if (n < h && d(e + f) < n) {
                            l.horizontal = "center";
                        }
                        if (o < j && d(i + k) < o) {
                            l.vertical = "middle";
                        }
                        if (c(d(e), d(f)) > c(d(i), d(k))) {
                            l.important = "horizontal";
                        } else {
                            l.important = "vertical";
                        }
                        b.using.call(this, a, l);
                    };
                }
                g.offset(a.extend(z, {
                    using: f
                }));
            });
        };
        a.ui.pos = {
            _trigger: function(a, b, c, d) {
                if (b.elem) {
                    b.elem.trigger({
                        type: c,
                        position: a,
                        positionData: b,
                        triggered: d
                    });
                }
            },
            fit: {
                left: function(b, d) {
                    a.ui.pos._trigger(b, d, "posCollide", "fitLeft");
                    var e = d.within, f = e.isWindow ? e.scrollLeft : e.offset.left, g = e.width, h = b.left - d.collisionPosition.marginLeft, i = f - h, j = h + d.collisionWidth - g - f, k;
                    if (d.collisionWidth > g) {
                        if (i > 0 && j <= 0) {
                            k = b.left + i + d.collisionWidth - g - f;
                            b.left += i - k;
                        } else if (j > 0 && i <= 0) {
                            b.left = f;
                        } else {
                            if (i > j) {
                                b.left = f + g - d.collisionWidth;
                            } else {
                                b.left = f;
                            }
                        }
                    } else if (i > 0) {
                        b.left += i;
                    } else if (j > 0) {
                        b.left -= j;
                    } else {
                        b.left = c(b.left - h, b.left);
                    }
                    a.ui.pos._trigger(b, d, "posCollided", "fitLeft");
                },
                top: function(b, d) {
                    a.ui.pos._trigger(b, d, "posCollide", "fitTop");
                    var e = d.within, f = e.isWindow ? e.scrollTop : e.offset.top, g = d.within.height, h = b.top - d.collisionPosition.marginTop, i = f - h, j = h + d.collisionHeight - g - f, k;
                    if (d.collisionHeight > g) {
                        if (i > 0 && j <= 0) {
                            k = b.top + i + d.collisionHeight - g - f;
                            b.top += i - k;
                        } else if (j > 0 && i <= 0) {
                            b.top = f;
                        } else {
                            if (i > j) {
                                b.top = f + g - d.collisionHeight;
                            } else {
                                b.top = f;
                            }
                        }
                    } else if (i > 0) {
                        b.top += i;
                    } else if (j > 0) {
                        b.top -= j;
                    } else {
                        b.top = c(b.top - h, b.top);
                    }
                    a.ui.pos._trigger(b, d, "posCollided", "fitTop");
                }
            },
            flip: {
                left: function(b, c) {
                    a.ui.pos._trigger(b, c, "posCollide", "flipLeft");
                    var e = c.within, f = e.offset.left + e.scrollLeft, g = e.width, h = e.isWindow ? e.scrollLeft : e.offset.left, i = b.left - c.collisionPosition.marginLeft, j = i - h, k = i + c.collisionWidth - g - h, l = c.my[0] === "left" ? -c.elemWidth : c.my[0] === "right" ? c.elemWidth : 0, m = c.at[0] === "left" ? c.targetWidth : c.at[0] === "right" ? -c.targetWidth : 0, n = -2 * c.offset[0], o, p;
                    if (j < 0) {
                        o = b.left + l + m + n + c.collisionWidth - g - f;
                        if (o < 0 || o < d(j)) {
                            b.left += l + m + n;
                        }
                    } else if (k > 0) {
                        p = b.left - c.collisionPosition.marginLeft + l + m + n - h;
                        if (p > 0 || d(p) < k) {
                            b.left += l + m + n;
                        }
                    }
                    a.ui.pos._trigger(b, c, "posCollided", "flipLeft");
                },
                top: function(b, c) {
                    a.ui.pos._trigger(b, c, "posCollide", "flipTop");
                    var e = c.within, f = e.offset.top + e.scrollTop, g = e.height, h = e.isWindow ? e.scrollTop : e.offset.top, i = b.top - c.collisionPosition.marginTop, j = i - h, k = i + c.collisionHeight - g - h, l = c.my[1] === "top", m = l ? -c.elemHeight : c.my[1] === "bottom" ? c.elemHeight : 0, n = c.at[1] === "top" ? c.targetHeight : c.at[1] === "bottom" ? -c.targetHeight : 0, o = -2 * c.offset[1], p, q;
                    if (j < 0) {
                        q = b.top + m + n + o + c.collisionHeight - g - f;
                        if (q < 0 || q < d(j)) {
                            b.top += m + n + o;
                        }
                    } else if (k > 0) {
                        p = b.top - c.collisionPosition.marginTop + m + n + o - h;
                        if (p > 0 || d(p) < k) {
                            b.top += m + n + o;
                        }
                    }
                    a.ui.pos._trigger(b, c, "posCollided", "flipTop");
                }
            },
            flipfit: {
                left: function() {
                    a.ui.pos.flip.left.apply(this, arguments);
                    a.ui.pos.fit.left.apply(this, arguments);
                },
                top: function() {
                    a.ui.pos.flip.top.apply(this, arguments);
                    a.ui.pos.fit.top.apply(this, arguments);
                }
            }
        };
        (function() {
            var b, c, d, e, f, g = document.getElementsByTagName("body")[0], h = document.createElement("div");
            b = document.createElement(g ? "div" : "body");
            d = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            };
            if (g) {
                a.extend(d, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                });
            }
            for (f in d) {
                b.style[f] = d[f];
            }
            b.appendChild(h);
            c = g || document.documentElement;
            c.insertBefore(b, c.firstChild);
            h.style.cssText = "position: absolute; left: 10.7432222px;";
            e = a(h).offset().left;
            a.support.offsetFractions = e > 10 && e < 11;
            b.innerHTML = "";
            c.removeChild(b);
        })();
    })();
    var c = a.ui.position;
});

(function(a) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], a);
    } else if (window.jQuery && !window.jQuery.fn.iconpicker) {
        a(window.jQuery);
    }
})(function(a) {
    "use strict";
    var b = {
        isEmpty: function(a) {
            return a === false || a === "" || a === null || a === undefined;
        },
        isEmptyObject: function(a) {
            return this.isEmpty(a) === true || a.length === 0;
        },
        isElement: function(b) {
            return a(b).length > 0;
        },
        isString: function(a) {
            return typeof a === "string" || a instanceof String;
        },
        isArray: function(b) {
            return a.isArray(b);
        },
        inArray: function(b, c) {
            return a.inArray(b, c) !== -1;
        },
        throwError: function(a) {
            throw "Font Awesome Icon Picker Exception: " + a;
        }
    };
    var c = function(d, e) {
        this._id = c._idCounter++;
        this.element = a(d).addClass("iconpicker-element");
        this._trigger("iconpickerCreate");
        this.options = a.extend({}, c.defaultOptions, this.element.data(), e);
        this.options.templates = a.extend({}, c.defaultOptions.templates, this.options.templates);
        this.options.originalPlacement = this.options.placement;
        this.container = b.isElement(this.options.container) ? a(this.options.container) : false;
        if (this.container === false) {
            if (this.element.is(".dropdown-toggle")) {
                this.container = a("~ .dropdown-menu:first", this.element);
            } else {
                this.container = this.element.is("input,textarea,button,.btn") ? this.element.parent() : this.element;
            }
        }
        this.container.addClass("iconpicker-container");
        if (this.isDropdownMenu()) {
            this.options.templates.search = false;
            this.options.templates.buttons = false;
            this.options.placement = "inline";
        }
        this.input = this.element.is("input,textarea") ? this.element.addClass("iconpicker-input") : false;
        if (this.input === false) {
            this.input = this.container.find(this.options.input);
            if (!this.input.is("input,textarea")) {
                this.input = false;
            }
        }
        this.component = this.isDropdownMenu() ? this.container.parent().find(this.options.component) : this.container.find(this.options.component);
        if (this.component.length === 0) {
            this.component = false;
        } else {
            this.component.find("i").addClass("iconpicker-component");
        }
        this._createPopover();
        this._createIconpicker();
        if (this.getAcceptButton().length === 0) {
            this.options.mustAccept = false;
        }
        if (this.isInputGroup()) {
            this.container.parent().append(this.popover);
        } else {
            this.container.append(this.popover);
        }
        this._bindElementEvents();
        this._bindWindowEvents();
        this.update(this.options.selected);
        if (this.isInline()) {
            this.show();
        }
        this._trigger("iconpickerCreated");
    };
    c._idCounter = 0;
    c.defaultOptions = {
        title: false,
        selected: false,
        defaultValue: false,
        placement: "bottom",
        collision: "none",
        animation: true,
        hideOnSelect: false,
        showFooter: false,
        searchInFooter: false,
        mustAccept: false,
        selectedCustomClass: "bg-primary",
        icons: [],
        fullClassFormatter: function(a) {
            return a;
        },
        input: "input,.iconpicker-input",
        inputSearch: false,
        container: false,
        component: ".input-group-addon,.iconpicker-component",
        templates: {
            popover: '<div class="iconpicker-popover popover"><div class="arrow"></div>' + '<div class="popover-title"></div><div class="popover-content"></div></div>',
            footer: '<div class="popover-footer"></div>',
            buttons: '<button class="iconpicker-btn iconpicker-btn-cancel btn btn-default btn-sm">Cancel</button>' + ' <button class="iconpicker-btn iconpicker-btn-accept btn btn-primary btn-sm">Accept</button>',
            search: '<input type="search" class="form-control iconpicker-search" placeholder="Type to filter" />',
            iconpicker: '<div class="iconpicker"><div class="iconpicker-items"></div></div>',
            iconpickerItem: '<a role="button" href="#" class="iconpicker-item"><i></i></a>'
        }
    };
    c.batch = function(b, c) {
        var d = Array.prototype.slice.call(arguments, 2);
        return a(b).each(function() {
            var b = a(this).data("iconpicker");
            if (!!b) {
                b[c].apply(b, d);
            }
        });
    };
    c.prototype = {
        constructor: c,
        options: {},
        _id: 0,
        _trigger: function(b, c) {
            c = c || {};
            this.element.trigger(a.extend({
                type: b,
                iconpickerInstance: this
            }, c));
        },
        _createPopover: function() {
            this.popover = a(this.options.templates.popover);
            var c = this.popover.find(".popover-title");
            if (!!this.options.title) {
                c.append(a('<div class="popover-title-text">' + this.options.title + "</div>"));
            }
            if (this.hasSeparatedSearchInput() && !this.options.searchInFooter) {
                c.append(this.options.templates.search);
            } else if (!this.options.title) {
                c.remove();
            }
            if (this.options.showFooter && !b.isEmpty(this.options.templates.footer)) {
                var d = a(this.options.templates.footer);
                if (this.hasSeparatedSearchInput() && this.options.searchInFooter) {
                    d.append(a(this.options.templates.search));
                }
                if (!b.isEmpty(this.options.templates.buttons)) {
                    d.append(a(this.options.templates.buttons));
                }
                this.popover.append(d);
            }
            if (this.options.animation === true) {
                this.popover.addClass("fade");
            }
            return this.popover;
        },
        _createIconpicker: function() {
            var b = this;
            this.iconpicker = a(this.options.templates.iconpicker);
            var c = function(c) {
                var d = a(this);
                if (d.is("i")) {
                    d = d.parent();
                }
                b._trigger("iconpickerSelect", {
                    iconpickerItem: d,
                    iconpickerValue: b.iconpickerValue
                });
                if (b.options.mustAccept === false) {
                    b.update(d.data("iconpickerValue"));
                    b._trigger("iconpickerSelected", {
                        iconpickerItem: this,
                        iconpickerValue: b.iconpickerValue
                    });
                } else {
                    b.update(d.data("iconpickerValue"), true);
                }
                if (b.options.hideOnSelect && b.options.mustAccept === false) {
                    b.hide();
                }
                c.preventDefault();
                return false;
            };
            for (var d in this.options.icons) {
                if (typeof this.options.icons[d] === "string") {
                    var e = a(this.options.templates.iconpickerItem);
                    e.find("i").addClass(this.options.fullClassFormatter(this.options.icons[d]));
                    e.data("iconpickerValue", this.options.icons[d]).on("click.iconpicker", c);
                    this.iconpicker.find(".iconpicker-items").append(e.attr("title", "." + this.options.icons[d]));
                }
            }
            this.popover.find(".popover-content").append(this.iconpicker);
            return this.iconpicker;
        },
        _isEventInsideIconpicker: function(b) {
            var c = a(b.target);
            if ((!c.hasClass("iconpicker-element") || c.hasClass("iconpicker-element") && !c.is(this.element)) && c.parents(".iconpicker-popover").length === 0) {
                return false;
            }
            return true;
        },
        _bindElementEvents: function() {
            var c = this;
            this.getSearchInput().on("keyup.iconpicker", function() {
                c.filter(a(this).val().toLowerCase());
            });
            this.getAcceptButton().on("click.iconpicker", function() {
                var a = c.iconpicker.find(".iconpicker-selected").get(0);
                c.update(c.iconpickerValue);
                c._trigger("iconpickerSelected", {
                    iconpickerItem: a,
                    iconpickerValue: c.iconpickerValue
                });
                if (!c.isInline()) {
                    c.hide();
                }
            });
            this.getCancelButton().on("click.iconpicker", function() {
                if (!c.isInline()) {
                    c.hide();
                }
            });
            this.element.on("focus.iconpicker", function(a) {
                c.show();
                a.stopPropagation();
            });
            if (this.hasComponent()) {
                this.component.on("click.iconpicker", function() {
                    c.toggle();
                });
            }
            if (this.hasInput()) {
                this.input.on("keyup.iconpicker", function(d) {
                    if (!b.inArray(d.keyCode, [ 38, 40, 37, 39, 16, 17, 18, 9, 8, 91, 93, 20, 46, 186, 190, 46, 78, 188, 44, 86 ])) {
                        c.update();
                    } else {
                        c._updateFormGroupStatus(c.getValid(this.value) !== false);
                    }
                    if (c.options.inputSearch === true) {
                        c.filter(a(this).val().toLowerCase());
                    }
                });
            }
        },
        _bindWindowEvents: function() {
            var b = a(window.document);
            var c = this;
            var d = ".iconpicker.inst" + this._id;
            a(window).on("resize.iconpicker" + d + " orientationchange.iconpicker" + d, function(a) {
                if (c.popover.hasClass("in")) {
                    c.updatePlacement();
                }
            });
            if (!c.isInline()) {
                b.on("mouseup" + d, function(a) {
                    if (!c._isEventInsideIconpicker(a) && !c.isInline()) {
                        c.hide();
                        return;
                    }
                    a.stopPropagation();
                    a.preventDefault();
                    return false;
                });
            }
            return false;
        },
        _unbindElementEvents: function() {
            this.popover.off(".iconpicker");
            this.element.off(".iconpicker");
            if (this.hasInput()) {
                this.input.off(".iconpicker");
            }
            if (this.hasComponent()) {
                this.component.off(".iconpicker");
            }
            if (this.hasContainer()) {
                this.container.off(".iconpicker");
            }
        },
        _unbindWindowEvents: function() {
            a(window).off(".iconpicker.inst" + this._id);
            a(window.document).off(".iconpicker.inst" + this._id);
        },
        updatePlacement: function(b, c) {
            b = b || this.options.placement;
            this.options.placement = b;
            c = c || this.options.collision;
            c = c === true ? "flip" : c;
            var d = {
                at: "right bottom",
                my: "right top",
                of: this.hasInput() && !this.isInputGroup() ? this.input : this.container,
                collision: c === true ? "flip" : c,
                within: window
            };
            this.popover.removeClass("inline topLeftCorner topLeft top topRight topRightCorner " + "rightTop right rightBottom bottomRight bottomRightCorner " + "bottom bottomLeft bottomLeftCorner leftBottom left leftTop");
            if (typeof b === "object") {
                return this.popover.pos(a.extend({}, d, b));
            }
            switch (b) {
              case "inline":
                {
                    d = false;
                }
                break;

              case "topLeftCorner":
                {
                    d.my = "right bottom";
                    d.at = "left top";
                }
                break;

              case "topLeft":
                {
                    d.my = "left bottom";
                    d.at = "left top";
                }
                break;

              case "top":
                {
                    d.my = "center bottom";
                    d.at = "center top";
                }
                break;

              case "topRight":
                {
                    d.my = "right bottom";
                    d.at = "right top";
                }
                break;

              case "topRightCorner":
                {
                    d.my = "left bottom";
                    d.at = "right top";
                }
                break;

              case "rightTop":
                {
                    d.my = "left bottom";
                    d.at = "right center";
                }
                break;

              case "right":
                {
                    d.my = "left center";
                    d.at = "right center";
                }
                break;

              case "rightBottom":
                {
                    d.my = "left top";
                    d.at = "right center";
                }
                break;

              case "bottomRightCorner":
                {
                    d.my = "left top";
                    d.at = "right bottom";
                }
                break;

              case "bottomRight":
                {
                    d.my = "right top";
                    d.at = "right bottom";
                }
                break;

              case "bottom":
                {
                    d.my = "center top";
                    d.at = "center bottom";
                }
                break;

              case "bottomLeft":
                {
                    d.my = "left top";
                    d.at = "left bottom";
                }
                break;

              case "bottomLeftCorner":
                {
                    d.my = "right top";
                    d.at = "left bottom";
                }
                break;

              case "leftBottom":
                {
                    d.my = "right top";
                    d.at = "left center";
                }
                break;

              case "left":
                {
                    d.my = "right center";
                    d.at = "left center";
                }
                break;

              case "leftTop":
                {
                    d.my = "right bottom";
                    d.at = "left center";
                }
                break;

              default:
                {
                    return false;
                }
                break;
            }
            this.popover.css({
                display: this.options.placement === "inline" ? "" : "block"
            });
            if (d !== false) {
                this.popover.pos(d).css("maxWidth", a(window).width() - this.container.offset().left - 5);
            } else {
                this.popover.css({
                    top: "auto",
                    right: "auto",
                    bottom: "auto",
                    left: "auto",
                    maxWidth: "none"
                });
            }
            this.popover.addClass(this.options.placement);
            return true;
        },
        _updateComponents: function() {
            this.iconpicker.find(".iconpicker-item.iconpicker-selected").removeClass("iconpicker-selected " + this.options.selectedCustomClass);
            if (this.iconpickerValue) {
                this.iconpicker.find("." + this.options.fullClassFormatter(this.iconpickerValue).replace(/ /g, ".")).parent().addClass("iconpicker-selected " + this.options.selectedCustomClass);
            }
            if (this.hasComponent()) {
                var a = this.component.find("i");
                if (a.length > 0) {
                    a.attr("class", this.options.fullClassFormatter(this.iconpickerValue));
                } else {
                    this.component.html(this.getHtml());
                }
            }
        },
        _updateFormGroupStatus: function(a) {
            if (this.hasInput()) {
                if (a !== false) {
                    this.input.parents(".form-group:first").removeClass("has-error");
                } else {
                    this.input.parents(".form-group:first").addClass("has-error");
                }
                return true;
            }
            return false;
        },
        getValid: function(c) {
            if (!b.isString(c)) {
                c = "";
            }
            var d = c === "";
            c = a.trim(c);
            if (b.inArray(c, this.options.icons) || d) {
                return c;
            }
            return false;
        },
        setValue: function(a) {
            var b = this.getValid(a);
            if (b !== false) {
                this.iconpickerValue = b;
                this._trigger("iconpickerSetValue", {
                    iconpickerValue: b
                });
                return this.iconpickerValue;
            } else {
                this._trigger("iconpickerInvalid", {
                    iconpickerValue: a
                });
                return false;
            }
        },
        getHtml: function() {
            return '<i class="' + this.options.fullClassFormatter(this.iconpickerValue) + '"></i>';
        },
        setSourceValue: function(a) {
            a = this.setValue(a);
            if (a !== false && a !== "") {
                if (this.hasInput()) {
                    this.input.val(this.iconpickerValue);
                } else {
                    this.element.data("iconpickerValue", this.iconpickerValue);
                }
                this._trigger("iconpickerSetSourceValue", {
                    iconpickerValue: a
                });
            }
            return a;
        },
        getSourceValue: function(a) {
            a = a || this.options.defaultValue;
            var b = a;
            if (this.hasInput()) {
                b = this.input.val();
            } else {
                b = this.element.data("iconpickerValue");
            }
            if (b === undefined || b === "" || b === null || b === false) {
                b = a;
            }
            return b;
        },
        hasInput: function() {
            return this.input !== false;
        },
        isInputSearch: function() {
            return this.hasInput() && this.options.inputSearch === true;
        },
        isInputGroup: function() {
            return this.container.is(".input-group");
        },
        isDropdownMenu: function() {
            return this.container.is(".dropdown-menu");
        },
        hasSeparatedSearchInput: function() {
            return this.options.templates.search !== false && !this.isInputSearch();
        },
        hasComponent: function() {
            return this.component !== false;
        },
        hasContainer: function() {
            return this.container !== false;
        },
        getAcceptButton: function() {
            return this.popover.find(".iconpicker-btn-accept");
        },
        getCancelButton: function() {
            return this.popover.find(".iconpicker-btn-cancel");
        },
        getSearchInput: function() {
            return this.popover.find(".iconpicker-search");
        },
        filter: function(c) {
            if (b.isEmpty(c)) {
                this.iconpicker.find(".iconpicker-item").show();
                return a(false);
            } else {
                var d = [];
                this.iconpicker.find(".iconpicker-item").each(function() {
                    var b = a(this);
                    var e = b.attr("title").toLowerCase();
                    var f = false;
                    try {
                        f = new RegExp(c, "g");
                    } catch (a) {
                        f = false;
                    }
                    if (f !== false && e.match(f)) {
                        d.push(b);
                        b.show();
                    } else {
                        b.hide();
                    }
                });
                return d;
            }
        },
        show: function() {
            if (this.popover.hasClass("in")) {
                return false;
            }
            a.iconpicker.batch(a(".iconpicker-popover.in:not(.inline)").not(this.popover), "hide");
            this._trigger("iconpickerShow");
            this.updatePlacement();
            this.popover.addClass("in");
            setTimeout(a.proxy(function() {
                this.popover.css("display", this.isInline() ? "" : "block");
                this._trigger("iconpickerShown");
            }, this), this.options.animation ? 300 : 1);
        },
        hide: function() {
            if (!this.popover.hasClass("in")) {
                return false;
            }
            this._trigger("iconpickerHide");
            this.popover.removeClass("in");
            setTimeout(a.proxy(function() {
                this.popover.css("display", "none");
                this.getSearchInput().val("");
                this.filter("");
                this._trigger("iconpickerHidden");
            }, this), this.options.animation ? 300 : 1);
        },
        toggle: function() {
            if (this.popover.is(":visible")) {
                this.hide();
            } else {
                this.show(true);
            }
        },
        update: function(a, b) {
            a = a ? a : this.getSourceValue(this.iconpickerValue);
            this._trigger("iconpickerUpdate");
            if (b === true) {
                a = this.setValue(a);
            } else {
                a = this.setSourceValue(a);
                this._updateFormGroupStatus(a !== false);
            }
            if (a !== false) {
                this._updateComponents();
            }
            this._trigger("iconpickerUpdated");
            return a;
        },
        destroy: function() {
            this._trigger("iconpickerDestroy");
            this.element.removeData("iconpicker").removeData("iconpickerValue").removeClass("iconpicker-element");
            this._unbindElementEvents();
            this._unbindWindowEvents();
            a(this.popover).remove();
            this._trigger("iconpickerDestroyed");
        },
        disable: function() {
            if (this.hasInput()) {
                this.input.prop("disabled", true);
                return true;
            }
            return false;
        },
        enable: function() {
            if (this.hasInput()) {
                this.input.prop("disabled", false);
                return true;
            }
            return false;
        },
        isDisabled: function() {
            if (this.hasInput()) {
                return this.input.prop("disabled") === true;
            }
            return false;
        },
        isInline: function() {
            return this.options.placement === "inline" || this.popover.hasClass("inline");
        }
    };
    a.iconpicker = c;
    a.fn.iconpicker = function(b) {
        return this.each(function() {
            var d = a(this);
            if (!d.data("iconpicker")) {
                d.data("iconpicker", new c(this, typeof b === "object" ? b : {}));
            }
        });
    };
    c.defaultOptions = a.extend(c.defaultOptions, {
        icons: [ "fab fa-500px", "fab fa-accessible-icon", "fab fa-accusoft", "fas fa-address-book", "far fa-address-book", "fal fa-address-book", "fas fa-address-card", "far fa-address-card", "fal fa-address-card", "fas fa-adjust", "far fa-adjust", "fal fa-adjust", "fab fa-adn", "fab fa-adversal", "fab fa-affiliatetheme", "fas fa-alarm-clock", "far fa-alarm-clock", "fal fa-alarm-clock", "fab fa-algolia", "fas fa-align-center", "far fa-align-center", "fal fa-align-center", "fas fa-align-justify", "far fa-align-justify", "fal fa-align-justify", "fas fa-align-left", "far fa-align-left", "fal fa-align-left", "fas fa-align-right", "far fa-align-right", "fal fa-align-right", "fab fa-amazon", "fab fa-amazon-pay", "fas fa-ambulance", "far fa-ambulance", "fal fa-ambulance", "fas fa-american-sign-language-interpreting", "far fa-american-sign-language-interpreting", "fal fa-american-sign-language-interpreting", "fab fa-amilia", "fas fa-anchor", "far fa-anchor", "fal fa-anchor", "fab fa-android", "fab fa-angellist", "fas fa-angle-double-down", "far fa-angle-double-down", "fal fa-angle-double-down", "fas fa-angle-double-left", "far fa-angle-double-left", "fal fa-angle-double-left", "fas fa-angle-double-right", "far fa-angle-double-right", "fal fa-angle-double-right", "fas fa-angle-double-up", "far fa-angle-double-up", "fal fa-angle-double-up", "fas fa-angle-down", "far fa-angle-down", "fal fa-angle-down", "fas fa-angle-left", "far fa-angle-left", "fal fa-angle-left", "fas fa-angle-right", "far fa-angle-right", "fal fa-angle-right", "fas fa-angle-up", "far fa-angle-up", "fal fa-angle-up", "fab fa-angrycreative", "fab fa-angular", "fab fa-app-store", "fab fa-app-store-ios", "fab fa-apper", "fab fa-apple", "fab fa-apple-pay", "fas fa-archive", "far fa-archive", "fal fa-archive", "fas fa-arrow-alt-circle-down", "far fa-arrow-alt-circle-down", "fal fa-arrow-alt-circle-down", "fas fa-arrow-alt-circle-left", "far fa-arrow-alt-circle-left", "fal fa-arrow-alt-circle-left", "fas fa-arrow-alt-circle-right", "far fa-arrow-alt-circle-right", "fal fa-arrow-alt-circle-right", "fas fa-arrow-alt-circle-up", "far fa-arrow-alt-circle-up", "fal fa-arrow-alt-circle-up", "fas fa-arrow-alt-down", "far fa-arrow-alt-down", "fal fa-arrow-alt-down", "fas fa-arrow-alt-from-bottom", "far fa-arrow-alt-from-bottom", "fal fa-arrow-alt-from-bottom", "fas fa-arrow-alt-from-left", "far fa-arrow-alt-from-left", "fal fa-arrow-alt-from-left", "fas fa-arrow-alt-from-right", "far fa-arrow-alt-from-right", "fal fa-arrow-alt-from-right", "fas fa-arrow-alt-from-top", "far fa-arrow-alt-from-top", "fal fa-arrow-alt-from-top", "fas fa-arrow-alt-left", "far fa-arrow-alt-left", "fal fa-arrow-alt-left", "fas fa-arrow-alt-right", "far fa-arrow-alt-right", "fal fa-arrow-alt-right", "fas fa-arrow-alt-square-down", "far fa-arrow-alt-square-down", "fal fa-arrow-alt-square-down", "fas fa-arrow-alt-square-left", "far fa-arrow-alt-square-left", "fal fa-arrow-alt-square-left", "fas fa-arrow-alt-square-right", "far fa-arrow-alt-square-right", "fal fa-arrow-alt-square-right", "fas fa-arrow-alt-square-up", "far fa-arrow-alt-square-up", "fal fa-arrow-alt-square-up", "fas fa-arrow-alt-to-bottom", "far fa-arrow-alt-to-bottom", "fal fa-arrow-alt-to-bottom", "fas fa-arrow-alt-to-left", "far fa-arrow-alt-to-left", "fal fa-arrow-alt-to-left", "fas fa-arrow-alt-to-right", "far fa-arrow-alt-to-right", "fal fa-arrow-alt-to-right", "fas fa-arrow-alt-to-top", "far fa-arrow-alt-to-top", "fal fa-arrow-alt-to-top", "fas fa-arrow-alt-up", "far fa-arrow-alt-up", "fal fa-arrow-alt-up", "fas fa-arrow-circle-down", "far fa-arrow-circle-down", "fal fa-arrow-circle-down", "fas fa-arrow-circle-left", "far fa-arrow-circle-left", "fal fa-arrow-circle-left", "fas fa-arrow-circle-right", "far fa-arrow-circle-right", "fal fa-arrow-circle-right", "fas fa-arrow-circle-up", "far fa-arrow-circle-up", "fal fa-arrow-circle-up", "fas fa-arrow-down", "far fa-arrow-down", "fal fa-arrow-down", "fas fa-arrow-from-bottom", "far fa-arrow-from-bottom", "fal fa-arrow-from-bottom", "fas fa-arrow-from-left", "far fa-arrow-from-left", "fal fa-arrow-from-left", "fas fa-arrow-from-right", "far fa-arrow-from-right", "fal fa-arrow-from-right", "fas fa-arrow-from-top", "far fa-arrow-from-top", "fal fa-arrow-from-top", "fas fa-arrow-left", "far fa-arrow-left", "fal fa-arrow-left", "fas fa-arrow-right", "far fa-arrow-right", "fal fa-arrow-right", "fas fa-arrow-square-down", "far fa-arrow-square-down", "fal fa-arrow-square-down", "fas fa-arrow-square-left", "far fa-arrow-square-left", "fal fa-arrow-square-left", "fas fa-arrow-square-right", "far fa-arrow-square-right", "fal fa-arrow-square-right", "fas fa-arrow-square-up", "far fa-arrow-square-up", "fal fa-arrow-square-up", "fas fa-arrow-to-bottom", "far fa-arrow-to-bottom", "fal fa-arrow-to-bottom", "fas fa-arrow-to-left", "far fa-arrow-to-left", "fal fa-arrow-to-left", "fas fa-arrow-to-right", "far fa-arrow-to-right", "fal fa-arrow-to-right", "fas fa-arrow-to-top", "far fa-arrow-to-top", "fal fa-arrow-to-top", "fas fa-arrow-up", "far fa-arrow-up", "fal fa-arrow-up", "fas fa-arrows", "far fa-arrows", "fal fa-arrows", "fas fa-arrows-alt", "far fa-arrows-alt", "fal fa-arrows-alt", "fas fa-arrows-alt-h", "far fa-arrows-alt-h", "fal fa-arrows-alt-h", "fas fa-arrows-alt-v", "far fa-arrows-alt-v", "fal fa-arrows-alt-v", "fas fa-arrows-h", "far fa-arrows-h", "fal fa-arrows-h", "fas fa-arrows-v", "far fa-arrows-v", "fal fa-arrows-v", "fas fa-assistive-listening-systems", "far fa-assistive-listening-systems", "fal fa-assistive-listening-systems", "fas fa-asterisk", "far fa-asterisk", "fal fa-asterisk", "fab fa-asymmetrik", "fas fa-at", "far fa-at", "fal fa-at", "fab fa-audible", "fas fa-audio-description", "far fa-audio-description", "fal fa-audio-description", "fab fa-autoprefixer", "fab fa-avianex", "fab fa-aviato", "fab fa-aws", "fas fa-backward", "far fa-backward", "fal fa-backward", "fas fa-badge", "far fa-badge", "fal fa-badge", "fas fa-badge-check", "far fa-badge-check", "fal fa-badge-check", "fas fa-balance-scale", "far fa-balance-scale", "fal fa-balance-scale", "fas fa-ban", "far fa-ban", "fal fa-ban", "fab fa-bandcamp", "fas fa-barcode", "far fa-barcode", "fal fa-barcode", "fas fa-bars", "far fa-bars", "fal fa-bars", "fas fa-baseball", "far fa-baseball", "fal fa-baseball", "fas fa-baseball-ball", "far fa-baseball-ball", "fal fa-baseball-ball", "fas fa-basketball-ball", "far fa-basketball-ball", "fal fa-basketball-ball", "fas fa-basketball-hoop", "far fa-basketball-hoop", "fal fa-basketball-hoop", "fas fa-bath", "far fa-bath", "fal fa-bath", "fas fa-battery-bolt", "far fa-battery-bolt", "fal fa-battery-bolt", "fas fa-battery-empty", "far fa-battery-empty", "fal fa-battery-empty", "fas fa-battery-full", "far fa-battery-full", "fal fa-battery-full", "fas fa-battery-half", "far fa-battery-half", "fal fa-battery-half", "fas fa-battery-quarter", "far fa-battery-quarter", "fal fa-battery-quarter", "fas fa-battery-slash", "far fa-battery-slash", "fal fa-battery-slash", "fas fa-battery-three-quarters", "far fa-battery-three-quarters", "fal fa-battery-three-quarters", "fas fa-bed", "far fa-bed", "fal fa-bed", "fas fa-beer", "far fa-beer", "fal fa-beer", "fab fa-behance", "fab fa-behance-square", "fas fa-bell", "far fa-bell", "fal fa-bell", "fas fa-bell-slash", "far fa-bell-slash", "fal fa-bell-slash", "fas fa-bicycle", "far fa-bicycle", "fal fa-bicycle", "fab fa-bimobject", "fas fa-binoculars", "far fa-binoculars", "fal fa-binoculars", "fas fa-birthday-cake", "far fa-birthday-cake", "fal fa-birthday-cake", "fab fa-bitbucket", "fab fa-bitcoin", "fab fa-bity", "fab fa-black-tie", "fab fa-blackberry", "fas fa-blind", "far fa-blind", "fal fa-blind", "fab fa-blogger", "fab fa-blogger-b", "fab fa-bluetooth", "fab fa-bluetooth-b", "fas fa-bold", "far fa-bold", "fal fa-bold", "fas fa-bolt", "far fa-bolt", "fal fa-bolt", "fas fa-bomb", "far fa-bomb", "fal fa-bomb", "fas fa-book", "far fa-book", "fal fa-book", "fas fa-bookmark", "far fa-bookmark", "fal fa-bookmark", "fas fa-bowling-ball", "far fa-bowling-ball", "fal fa-bowling-ball", "fas fa-bowling-pins", "far fa-bowling-pins", "fal fa-bowling-pins", "fas fa-boxing-glove", "far fa-boxing-glove", "fal fa-boxing-glove", "fas fa-braille", "far fa-braille", "fal fa-braille", "fas fa-briefcase", "far fa-briefcase", "fal fa-briefcase", "fas fa-browser", "far fa-browser", "fal fa-browser", "fab fa-btc", "fas fa-bug", "far fa-bug", "fal fa-bug", "fas fa-building", "far fa-building", "fal fa-building", "fas fa-bullhorn", "far fa-bullhorn", "fal fa-bullhorn", "fas fa-bullseye", "far fa-bullseye", "fal fa-bullseye", "fab fa-buromobelexperte", "fas fa-bus", "far fa-bus", "fal fa-bus", "fab fa-buysellads", "fas fa-calculator", "far fa-calculator", "fal fa-calculator", "fas fa-calendar", "far fa-calendar", "fal fa-calendar", "fas fa-calendar-alt", "far fa-calendar-alt", "fal fa-calendar-alt", "fas fa-calendar-check", "far fa-calendar-check", "fal fa-calendar-check", "fas fa-calendar-edit", "far fa-calendar-edit", "fal fa-calendar-edit", "fas fa-calendar-exclamation", "far fa-calendar-exclamation", "fal fa-calendar-exclamation", "fas fa-calendar-minus", "far fa-calendar-minus", "fal fa-calendar-minus", "fas fa-calendar-plus", "far fa-calendar-plus", "fal fa-calendar-plus", "fas fa-calendar-times", "far fa-calendar-times", "fal fa-calendar-times", "fas fa-camera", "far fa-camera", "fal fa-camera", "fas fa-camera-alt", "far fa-camera-alt", "fal fa-camera-alt", "fas fa-camera-retro", "far fa-camera-retro", "fal fa-camera-retro", "fas fa-car", "far fa-car", "fal fa-car", "fas fa-caret-circle-down", "far fa-caret-circle-down", "fal fa-caret-circle-down", "fas fa-caret-circle-left", "far fa-caret-circle-left", "fal fa-caret-circle-left", "fas fa-caret-circle-right", "far fa-caret-circle-right", "fal fa-caret-circle-right", "fas fa-caret-circle-up", "far fa-caret-circle-up", "fal fa-caret-circle-up", "fas fa-caret-down", "far fa-caret-down", "fal fa-caret-down", "fas fa-caret-left", "far fa-caret-left", "fal fa-caret-left", "fas fa-caret-right", "far fa-caret-right", "fal fa-caret-right", "fas fa-caret-square-down", "far fa-caret-square-down", "fal fa-caret-square-down", "fas fa-caret-square-left", "far fa-caret-square-left", "fal fa-caret-square-left", "fas fa-caret-square-right", "far fa-caret-square-right", "fal fa-caret-square-right", "fas fa-caret-square-up", "far fa-caret-square-up", "fal fa-caret-square-up", "fas fa-caret-up", "far fa-caret-up", "fal fa-caret-up", "fas fa-cart-arrow-down", "far fa-cart-arrow-down", "fal fa-cart-arrow-down", "fas fa-cart-plus", "far fa-cart-plus", "fal fa-cart-plus", "fab fa-cc-amazon-pay", "fab fa-cc-amex", "fab fa-cc-apple-pay", "fab fa-cc-diners-club", "fab fa-cc-discover", "fab fa-cc-jcb", "fab fa-cc-mastercard", "fab fa-cc-paypal", "fab fa-cc-stripe", "fab fa-cc-visa", "fab fa-centercode", "fas fa-certificate", "far fa-certificate", "fal fa-certificate", "fas fa-chart-area", "far fa-chart-area", "fal fa-chart-area", "fas fa-chart-bar", "far fa-chart-bar", "fal fa-chart-bar", "fas fa-chart-line", "far fa-chart-line", "fal fa-chart-line", "fas fa-chart-pie", "far fa-chart-pie", "fal fa-chart-pie", "fas fa-check", "far fa-check", "fal fa-check", "fas fa-check-circle", "far fa-check-circle", "fal fa-check-circle", "fas fa-check-square", "far fa-check-square", "fal fa-check-square", "fas fa-chess", "far fa-chess", "fal fa-chess", "fas fa-chess-bishop", "far fa-chess-bishop", "fal fa-chess-bishop", "fas fa-chess-bishop-alt", "far fa-chess-bishop-alt", "fal fa-chess-bishop-alt", "fas fa-chess-board", "far fa-chess-board", "fal fa-chess-board", "fas fa-chess-clock", "far fa-chess-clock", "fal fa-chess-clock", "fas fa-chess-clock-alt", "far fa-chess-clock-alt", "fal fa-chess-clock-alt", "fas fa-chess-king", "far fa-chess-king", "fal fa-chess-king", "fas fa-chess-king-alt", "far fa-chess-king-alt", "fal fa-chess-king-alt", "fas fa-chess-knight", "far fa-chess-knight", "fal fa-chess-knight", "fas fa-chess-knight-alt", "far fa-chess-knight-alt", "fal fa-chess-knight-alt", "fas fa-chess-pawn", "far fa-chess-pawn", "fal fa-chess-pawn", "fas fa-chess-pawn-alt", "far fa-chess-pawn-alt", "fal fa-chess-pawn-alt", "fas fa-chess-queen", "far fa-chess-queen", "fal fa-chess-queen", "fas fa-chess-queen-alt", "far fa-chess-queen-alt", "fal fa-chess-queen-alt", "fas fa-chess-rook", "far fa-chess-rook", "fal fa-chess-rook", "fas fa-chess-rook-alt", "far fa-chess-rook-alt", "fal fa-chess-rook-alt", "fas fa-chevron-circle-down", "far fa-chevron-circle-down", "fal fa-chevron-circle-down", "fas fa-chevron-circle-left", "far fa-chevron-circle-left", "fal fa-chevron-circle-left", "fas fa-chevron-circle-right", "far fa-chevron-circle-right", "fal fa-chevron-circle-right", "fas fa-chevron-circle-up", "far fa-chevron-circle-up", "fal fa-chevron-circle-up", "fas fa-chevron-double-down", "far fa-chevron-double-down", "fal fa-chevron-double-down", "fas fa-chevron-double-left", "far fa-chevron-double-left", "fal fa-chevron-double-left", "fas fa-chevron-double-right", "far fa-chevron-double-right", "fal fa-chevron-double-right", "fas fa-chevron-double-up", "far fa-chevron-double-up", "fal fa-chevron-double-up", "fas fa-chevron-down", "far fa-chevron-down", "fal fa-chevron-down", "fas fa-chevron-left", "far fa-chevron-left", "fal fa-chevron-left", "fas fa-chevron-right", "far fa-chevron-right", "fal fa-chevron-right", "fas fa-chevron-square-down", "far fa-chevron-square-down", "fal fa-chevron-square-down", "fas fa-chevron-square-left", "far fa-chevron-square-left", "fal fa-chevron-square-left", "fas fa-chevron-square-right", "far fa-chevron-square-right", "fal fa-chevron-square-right", "fas fa-chevron-square-up", "far fa-chevron-square-up", "fal fa-chevron-square-up", "fas fa-chevron-up", "far fa-chevron-up", "fal fa-chevron-up", "fas fa-child", "far fa-child", "fal fa-child", "fab fa-chrome", "fas fa-circle", "far fa-circle", "fal fa-circle", "fas fa-circle-notch", "far fa-circle-notch", "fal fa-circle-notch", "fas fa-clipboard", "far fa-clipboard", "fal fa-clipboard", "fas fa-clock", "far fa-clock", "fal fa-clock", "fas fa-clone", "far fa-clone", "fal fa-clone", "fas fa-closed-captioning", "far fa-closed-captioning", "fal fa-closed-captioning", "fas fa-cloud", "far fa-cloud", "fal fa-cloud", "fas fa-cloud-download", "far fa-cloud-download", "fal fa-cloud-download", "fas fa-cloud-download-alt", "far fa-cloud-download-alt", "fal fa-cloud-download-alt", "fas fa-cloud-upload", "far fa-cloud-upload", "fal fa-cloud-upload", "fas fa-cloud-upload-alt", "far fa-cloud-upload-alt", "fal fa-cloud-upload-alt", "fab fa-cloudscale", "fab fa-cloudsmith", "fab fa-cloudversify", "fas fa-club", "far fa-club", "fal fa-club", "fas fa-code", "far fa-code", "fal fa-code", "fas fa-code-branch", "far fa-code-branch", "fal fa-code-branch", "fas fa-code-commit", "far fa-code-commit", "fal fa-code-commit", "fas fa-code-merge", "far fa-code-merge", "fal fa-code-merge", "fab fa-codepen", "fab fa-codiepie", "fas fa-coffee", "far fa-coffee", "fal fa-coffee", "fas fa-cog", "far fa-cog", "fal fa-cog", "fas fa-cogs", "far fa-cogs", "fal fa-cogs", "fas fa-columns", "far fa-columns", "fal fa-columns", "fas fa-comment", "far fa-comment", "fal fa-comment", "fas fa-comment-alt", "far fa-comment-alt", "fal fa-comment-alt", "fas fa-comments", "far fa-comments", "fal fa-comments", "fas fa-compass", "far fa-compass", "fal fa-compass", "fas fa-compress", "far fa-compress", "fal fa-compress", "fas fa-compress-alt", "far fa-compress-alt", "fal fa-compress-alt", "fas fa-compress-wide", "far fa-compress-wide", "fal fa-compress-wide", "fab fa-connectdevelop", "fab fa-contao", "fas fa-copy", "far fa-copy", "fal fa-copy", "fas fa-copyright", "far fa-copyright", "fal fa-copyright", "fab fa-cpanel", "fab fa-creative-commons", "fas fa-credit-card", "far fa-credit-card", "fal fa-credit-card", "fas fa-credit-card-blank", "far fa-credit-card-blank", "fal fa-credit-card-blank", "fas fa-credit-card-front", "far fa-credit-card-front", "fal fa-credit-card-front", "fas fa-cricket", "far fa-cricket", "fal fa-cricket", "fas fa-crop", "far fa-crop", "fal fa-crop", "fas fa-crosshairs", "far fa-crosshairs", "fal fa-crosshairs", "fab fa-css3", "fab fa-css3-alt", "fas fa-cube", "far fa-cube", "fal fa-cube", "fas fa-cubes", "far fa-cubes", "fal fa-cubes", "fas fa-curling", "far fa-curling", "fal fa-curling", "fas fa-cut", "far fa-cut", "fal fa-cut", "fab fa-cuttlefish", "fab fa-d-and-d", "fab fa-dashcube", "fas fa-database", "far fa-database", "fal fa-database", "fas fa-deaf", "far fa-deaf", "fal fa-deaf", "fab fa-delicious", "fab fa-deploydog", "fab fa-deskpro", "fas fa-desktop", "far fa-desktop", "fal fa-desktop", "fas fa-desktop-alt", "far fa-desktop-alt", "fal fa-desktop-alt", "fab fa-deviantart", "fas fa-diamond", "far fa-diamond", "fal fa-diamond", "fab fa-digg", "fab fa-digital-ocean", "fab fa-discord", "fab fa-discourse", "fab fa-dochub", "fab fa-docker", "fas fa-dollar-sign", "far fa-dollar-sign", "fal fa-dollar-sign", "fas fa-dot-circle", "far fa-dot-circle", "fal fa-dot-circle", "fas fa-download", "far fa-download", "fal fa-download", "fab fa-draft2digital", "fab fa-dribbble", "fab fa-dribbble-square", "fab fa-dropbox", "fab fa-drupal", "fas fa-dumbbell", "far fa-dumbbell", "fal fa-dumbbell", "fab fa-dyalog", "fab fa-earlybirds", "fab fa-edge", "fas fa-edit", "far fa-edit", "fal fa-edit", "fas fa-eject", "far fa-eject", "fal fa-eject", "fab fa-elementor", "fas fa-ellipsis-h", "far fa-ellipsis-h", "fal fa-ellipsis-h", "fas fa-ellipsis-h-alt", "far fa-ellipsis-h-alt", "fal fa-ellipsis-h-alt", "fas fa-ellipsis-v", "far fa-ellipsis-v", "fal fa-ellipsis-v", "fas fa-ellipsis-v-alt", "far fa-ellipsis-v-alt", "fal fa-ellipsis-v-alt", "fab fa-ember", "fab fa-empire", "fas fa-envelope", "far fa-envelope", "fal fa-envelope", "fas fa-envelope-open", "far fa-envelope-open", "fal fa-envelope-open", "fas fa-envelope-square", "far fa-envelope-square", "fal fa-envelope-square", "fab fa-envira", "fas fa-eraser", "far fa-eraser", "fal fa-eraser", "fab fa-erlang", "fab fa-ethereum", "fab fa-etsy", "fas fa-euro-sign", "far fa-euro-sign", "fal fa-euro-sign", "fas fa-exchange", "far fa-exchange", "fal fa-exchange", "fas fa-exchange-alt", "far fa-exchange-alt", "fal fa-exchange-alt", "fas fa-exclamation", "far fa-exclamation", "fal fa-exclamation", "fas fa-exclamation-circle", "far fa-exclamation-circle", "fal fa-exclamation-circle", "fas fa-exclamation-square", "far fa-exclamation-square", "fal fa-exclamation-square", "fas fa-exclamation-triangle", "far fa-exclamation-triangle", "fal fa-exclamation-triangle", "fas fa-expand", "far fa-expand", "fal fa-expand", "fas fa-expand-alt", "far fa-expand-alt", "fal fa-expand-alt", "fas fa-expand-arrows", "far fa-expand-arrows", "fal fa-expand-arrows", "fas fa-expand-arrows-alt", "far fa-expand-arrows-alt", "fal fa-expand-arrows-alt", "fas fa-expand-wide", "far fa-expand-wide", "fal fa-expand-wide", "fab fa-expeditedssl", "fas fa-external-link", "far fa-external-link", "fal fa-external-link", "fas fa-external-link-alt", "far fa-external-link-alt", "fal fa-external-link-alt", "fas fa-external-link-square", "far fa-external-link-square", "fal fa-external-link-square", "fas fa-external-link-square-alt", "far fa-external-link-square-alt", "fal fa-external-link-square-alt", "fas fa-eye", "far fa-eye", "fal fa-eye", "fas fa-eye-dropper", "far fa-eye-dropper", "fal fa-eye-dropper", "fas fa-eye-slash", "far fa-eye-slash", "fal fa-eye-slash", "fab fa-facebook", "fab fa-facebook-f", "fab fa-facebook-messenger", "fab fa-facebook-square", "fas fa-fast-backward", "far fa-fast-backward", "fal fa-fast-backward", "fas fa-fast-forward", "far fa-fast-forward", "fal fa-fast-forward", "fas fa-fax", "far fa-fax", "fal fa-fax", "fas fa-female", "far fa-female", "fal fa-female", "fas fa-field-hockey", "far fa-field-hockey", "fal fa-field-hockey", "fas fa-fighter-jet", "far fa-fighter-jet", "fal fa-fighter-jet", "fas fa-file", "far fa-file", "fal fa-file", "fas fa-file-alt", "far fa-file-alt", "fal fa-file-alt", "fas fa-file-archive", "far fa-file-archive", "fal fa-file-archive", "fas fa-file-audio", "far fa-file-audio", "fal fa-file-audio", "fas fa-file-check", "far fa-file-check", "fal fa-file-check", "fas fa-file-code", "far fa-file-code", "fal fa-file-code", "fas fa-file-edit", "far fa-file-edit", "fal fa-file-edit", "fas fa-file-excel", "far fa-file-excel", "fal fa-file-excel", "fas fa-file-exclamation", "far fa-file-exclamation", "fal fa-file-exclamation", "fas fa-file-image", "far fa-file-image", "fal fa-file-image", "fas fa-file-minus", "far fa-file-minus", "fal fa-file-minus", "fas fa-file-pdf", "far fa-file-pdf", "fal fa-file-pdf", "fas fa-file-plus", "far fa-file-plus", "fal fa-file-plus", "fas fa-file-powerpoint", "far fa-file-powerpoint", "fal fa-file-powerpoint", "fas fa-file-times", "far fa-file-times", "fal fa-file-times", "fas fa-file-video", "far fa-file-video", "fal fa-file-video", "fas fa-file-word", "far fa-file-word", "fal fa-file-word", "fas fa-film", "far fa-film", "fal fa-film", "fas fa-film-alt", "far fa-film-alt", "fal fa-film-alt", "fas fa-filter", "far fa-filter", "fal fa-filter", "fas fa-fire", "far fa-fire", "fal fa-fire", "fas fa-fire-extinguisher", "far fa-fire-extinguisher", "fal fa-fire-extinguisher", "fab fa-firefox", "fab fa-first-order", "fab fa-firstdraft", "fas fa-flag", "far fa-flag", "fal fa-flag", "fas fa-flag-checkered", "far fa-flag-checkered", "fal fa-flag-checkered", "fas fa-flask", "far fa-flask", "fal fa-flask", "fab fa-flickr", "fab fa-flipboard", "fab fa-fly", "fas fa-folder", "far fa-folder", "fal fa-folder", "fas fa-folder-open", "far fa-folder-open", "fal fa-folder-open", "fas fa-font", "far fa-font", "fal fa-font", "fab fa-font-awesome", "fab fa-font-awesome-alt", "fab fa-font-awesome-flag", "fab fa-fonticons", "fab fa-fonticons-fi", "fas fa-football-ball", "far fa-football-ball", "fal fa-football-ball", "fas fa-football-helmet", "far fa-football-helmet", "fal fa-football-helmet", "fab fa-fort-awesome", "fab fa-fort-awesome-alt", "fab fa-forumbee", "fas fa-forward", "far fa-forward", "fal fa-forward", "fab fa-foursquare", "fab fa-free-code-camp", "fab fa-freebsd", "fas fa-frown", "far fa-frown", "fal fa-frown", "fas fa-futbol", "far fa-futbol", "fal fa-futbol", "fas fa-gamepad", "far fa-gamepad", "fal fa-gamepad", "fas fa-gavel", "far fa-gavel", "fal fa-gavel", "fas fa-gem", "far fa-gem", "fal fa-gem", "fas fa-genderless", "far fa-genderless", "fal fa-genderless", "fab fa-get-pocket", "fab fa-gg", "fab fa-gg-circle", "fas fa-gift", "far fa-gift", "fal fa-gift", "fab fa-git", "fab fa-git-square", "fab fa-github", "fab fa-github-alt", "fab fa-github-square", "fab fa-gitkraken", "fab fa-gitlab", "fab fa-gitter", "fas fa-glass-martini", "far fa-glass-martini", "fal fa-glass-martini", "fab fa-glide", "fab fa-glide-g", "fas fa-globe", "far fa-globe", "fal fa-globe", "fab fa-gofore", "fas fa-golf-ball", "far fa-golf-ball", "fal fa-golf-ball", "fas fa-golf-club", "far fa-golf-club", "fal fa-golf-club", "fab fa-goodreads", "fab fa-goodreads-g", "fab fa-google", "fab fa-google-drive", "fab fa-google-play", "fab fa-google-plus", "fab fa-google-plus-g", "fab fa-google-plus-square", "fab fa-google-wallet", "fas fa-graduation-cap", "far fa-graduation-cap", "fal fa-graduation-cap", "fab fa-gratipay", "fab fa-grav", "fab fa-gripfire", "fab fa-grunt", "fab fa-gulp", "fas fa-h-square", "far fa-h-square", "fal fa-h-square", "fas fa-h1", "far fa-h1", "fal fa-h1", "fas fa-h2", "far fa-h2", "fal fa-h2", "fas fa-h3", "far fa-h3", "fal fa-h3", "fab fa-hacker-news", "fab fa-hacker-news-square", "fas fa-hand-lizard", "far fa-hand-lizard", "fal fa-hand-lizard", "fas fa-hand-paper", "far fa-hand-paper", "fal fa-hand-paper", "fas fa-hand-peace", "far fa-hand-peace", "fal fa-hand-peace", "fas fa-hand-point-down", "far fa-hand-point-down", "fal fa-hand-point-down", "fas fa-hand-point-left", "far fa-hand-point-left", "fal fa-hand-point-left", "fas fa-hand-point-right", "far fa-hand-point-right", "fal fa-hand-point-right", "fas fa-hand-point-up", "far fa-hand-point-up", "fal fa-hand-point-up", "fas fa-hand-pointer", "far fa-hand-pointer", "fal fa-hand-pointer", "fas fa-hand-rock", "far fa-hand-rock", "fal fa-hand-rock", "fas fa-hand-scissors", "far fa-hand-scissors", "fal fa-hand-scissors", "fas fa-hand-spock", "far fa-hand-spock", "fal fa-hand-spock", "fas fa-handshake", "far fa-handshake", "fal fa-handshake", "fas fa-hashtag", "far fa-hashtag", "fal fa-hashtag", "fas fa-hdd", "far fa-hdd", "fal fa-hdd", "fas fa-heading", "far fa-heading", "fal fa-heading", "fas fa-headphones", "far fa-headphones", "fal fa-headphones", "fas fa-heart", "far fa-heart", "fal fa-heart", "fas fa-heartbeat", "far fa-heartbeat", "fal fa-heartbeat", "fas fa-hexagon", "far fa-hexagon", "fal fa-hexagon", "fab fa-hips", "fab fa-hire-a-helper", "fas fa-history", "far fa-history", "fal fa-history", "fas fa-hockey-puck", "far fa-hockey-puck", "fal fa-hockey-puck", "fas fa-hockey-sticks", "far fa-hockey-sticks", "fal fa-hockey-sticks", "fas fa-home", "far fa-home", "fal fa-home", "fab fa-hooli", "fas fa-hospital", "far fa-hospital", "fal fa-hospital", "fab fa-hotjar", "fas fa-hourglass", "far fa-hourglass", "fal fa-hourglass", "fas fa-hourglass-end", "far fa-hourglass-end", "fal fa-hourglass-end", "fas fa-hourglass-half", "far fa-hourglass-half", "fal fa-hourglass-half", "fas fa-hourglass-start", "far fa-hourglass-start", "fal fa-hourglass-start", "fab fa-houzz", "fab fa-html5", "fab fa-hubspot", "fas fa-i-cursor", "far fa-i-cursor", "fal fa-i-cursor", "fas fa-id-badge", "far fa-id-badge", "fal fa-id-badge", "fas fa-id-card", "far fa-id-card", "fal fa-id-card", "fas fa-image", "far fa-image", "fal fa-image", "fas fa-images", "far fa-images", "fal fa-images", "fab fa-imdb", "fas fa-inbox", "far fa-inbox", "fal fa-inbox", "fas fa-inbox-in", "far fa-inbox-in", "fal fa-inbox-in", "fas fa-inbox-out", "far fa-inbox-out", "fal fa-inbox-out", "fas fa-indent", "far fa-indent", "fal fa-indent", "fas fa-industry", "far fa-industry", "fal fa-industry", "fas fa-industry-alt", "far fa-industry-alt", "fal fa-industry-alt", "fas fa-info", "far fa-info", "fal fa-info", "fas fa-info-circle", "far fa-info-circle", "fal fa-info-circle", "fas fa-info-square", "far fa-info-square", "fal fa-info-square", "fab fa-instagram", "fab fa-internet-explorer", "fab fa-ioxhost", "fas fa-italic", "far fa-italic", "fal fa-italic", "fab fa-itunes", "fab fa-itunes-note", "fas fa-jack-o-lantern", "far fa-jack-o-lantern", "fal fa-jack-o-lantern", "fab fa-jenkins", "fab fa-joget", "fab fa-joomla", "fab fa-js", "fab fa-js-square", "fab fa-jsfiddle", "fas fa-key", "far fa-key", "fal fa-key", "fas fa-keyboard", "far fa-keyboard", "fal fa-keyboard", "fab fa-keycdn", "fab fa-kickstarter", "fab fa-kickstarter-k", "fab fa-korvue", "fas fa-language", "far fa-language", "fal fa-language", "fas fa-laptop", "far fa-laptop", "fal fa-laptop", "fab fa-laravel", "fab fa-lastfm", "fab fa-lastfm-square", "fas fa-leaf", "far fa-leaf", "fal fa-leaf", "fab fa-leanpub", "fas fa-lemon", "far fa-lemon", "fal fa-lemon", "fab fa-less", "fas fa-level-down", "far fa-level-down", "fal fa-level-down", "fas fa-level-down-alt", "far fa-level-down-alt", "fal fa-level-down-alt", "fas fa-level-up", "far fa-level-up", "fal fa-level-up", "fas fa-level-up-alt", "far fa-level-up-alt", "fal fa-level-up-alt", "fas fa-life-ring", "far fa-life-ring", "fal fa-life-ring", "fas fa-lightbulb", "far fa-lightbulb", "fal fa-lightbulb", "fab fa-line", "fas fa-link", "far fa-link", "fal fa-link", "fab fa-linkedin", "fab fa-linkedin-in", "fab fa-linode", "fab fa-linux", "fas fa-lira-sign", "far fa-lira-sign", "fal fa-lira-sign", "fas fa-list", "far fa-list", "fal fa-list", "fas fa-list-alt", "far fa-list-alt", "fal fa-list-alt", "fas fa-list-ol", "far fa-list-ol", "fal fa-list-ol", "fas fa-list-ul", "far fa-list-ul", "fal fa-list-ul", "fas fa-location-arrow", "far fa-location-arrow", "fal fa-location-arrow", "fas fa-lock", "far fa-lock", "fal fa-lock", "fas fa-lock-alt", "far fa-lock-alt", "fal fa-lock-alt", "fas fa-lock-open", "far fa-lock-open", "fal fa-lock-open", "fas fa-lock-open-alt", "far fa-lock-open-alt", "fal fa-lock-open-alt", "fas fa-long-arrow-alt-down", "far fa-long-arrow-alt-down", "fal fa-long-arrow-alt-down", "fas fa-long-arrow-alt-left", "far fa-long-arrow-alt-left", "fal fa-long-arrow-alt-left", "fas fa-long-arrow-alt-right", "far fa-long-arrow-alt-right", "fal fa-long-arrow-alt-right", "fas fa-long-arrow-alt-up", "far fa-long-arrow-alt-up", "fal fa-long-arrow-alt-up", "fas fa-long-arrow-down", "far fa-long-arrow-down", "fal fa-long-arrow-down", "fas fa-long-arrow-left", "far fa-long-arrow-left", "fal fa-long-arrow-left", "fas fa-long-arrow-right", "far fa-long-arrow-right", "fal fa-long-arrow-right", "fas fa-long-arrow-up", "far fa-long-arrow-up", "fal fa-long-arrow-up", "fas fa-low-vision", "far fa-low-vision", "fal fa-low-vision", "fas fa-luchador", "far fa-luchador", "fal fa-luchador", "fab fa-lyft", "fab fa-magento", "fas fa-magic", "far fa-magic", "fal fa-magic", "fas fa-magnet", "far fa-magnet", "fal fa-magnet", "fas fa-male", "far fa-male", "fal fa-male", "fas fa-map", "far fa-map", "fal fa-map", "fas fa-map-marker", "far fa-map-marker", "fal fa-map-marker", "fas fa-map-marker-alt", "far fa-map-marker-alt", "fal fa-map-marker-alt", "fas fa-map-pin", "far fa-map-pin", "fal fa-map-pin", "fas fa-map-signs", "far fa-map-signs", "fal fa-map-signs", "fas fa-mars", "far fa-mars", "fal fa-mars", "fas fa-mars-double", "far fa-mars-double", "fal fa-mars-double", "fas fa-mars-stroke", "far fa-mars-stroke", "fal fa-mars-stroke", "fas fa-mars-stroke-h", "far fa-mars-stroke-h", "fal fa-mars-stroke-h", "fas fa-mars-stroke-v", "far fa-mars-stroke-v", "fal fa-mars-stroke-v", "fab fa-maxcdn", "fab fa-medapps", "fab fa-medium", "fab fa-medium-m", "fas fa-medkit", "far fa-medkit", "fal fa-medkit", "fab fa-medrt", "fab fa-meetup", "fas fa-meh", "far fa-meh", "fal fa-meh", "fas fa-mercury", "far fa-mercury", "fal fa-mercury", "fas fa-microchip", "far fa-microchip", "fal fa-microchip", "fas fa-microphone", "far fa-microphone", "fal fa-microphone", "fas fa-microphone-alt", "far fa-microphone-alt", "fal fa-microphone-alt", "fas fa-microphone-slash", "far fa-microphone-slash", "fal fa-microphone-slash", "fab fa-microsoft", "fas fa-minus", "far fa-minus", "fal fa-minus", "fas fa-minus-circle", "far fa-minus-circle", "fal fa-minus-circle", "fas fa-minus-hexagon", "far fa-minus-hexagon", "fal fa-minus-hexagon", "fas fa-minus-octagon", "far fa-minus-octagon", "fal fa-minus-octagon", "fas fa-minus-square", "far fa-minus-square", "fal fa-minus-square", "fab fa-mix", "fab fa-mixcloud", "fab fa-mizuni", "fas fa-mobile", "far fa-mobile", "fal fa-mobile", "fas fa-mobile-alt", "far fa-mobile-alt", "fal fa-mobile-alt", "fas fa-mobile-android", "far fa-mobile-android", "fal fa-mobile-android", "fas fa-mobile-android-alt", "far fa-mobile-android-alt", "fal fa-mobile-android-alt", "fab fa-modx", "fab fa-monero", "fas fa-money-bill", "far fa-money-bill", "fal fa-money-bill", "fas fa-money-bill-alt", "far fa-money-bill-alt", "fal fa-money-bill-alt", "fas fa-moon", "far fa-moon", "fal fa-moon", "fas fa-motorcycle", "far fa-motorcycle", "fal fa-motorcycle", "fas fa-mouse-pointer", "far fa-mouse-pointer", "fal fa-mouse-pointer", "fas fa-music", "far fa-music", "fal fa-music", "fab fa-napster", "fas fa-neuter", "far fa-neuter", "fal fa-neuter", "fas fa-newspaper", "far fa-newspaper", "fal fa-newspaper", "fab fa-nintendo-switch", "fab fa-node", "fab fa-node-js", "fab fa-npm", "fab fa-ns8", "fab fa-nutritionix", "fas fa-object-group", "far fa-object-group", "fal fa-object-group", "fas fa-object-ungroup", "far fa-object-ungroup", "fal fa-object-ungroup", "fas fa-octagon", "far fa-octagon", "fal fa-octagon", "fab fa-odnoklassniki", "fab fa-odnoklassniki-square", "fab fa-opencart", "fab fa-openid", "fab fa-opera", "fab fa-optin-monster", "fab fa-osi", "fas fa-outdent", "far fa-outdent", "fal fa-outdent", "fab fa-page4", "fab fa-pagelines", "fas fa-paint-brush", "far fa-paint-brush", "fal fa-paint-brush", "fab fa-palfed", "fas fa-paper-plane", "far fa-paper-plane", "fal fa-paper-plane", "fas fa-paperclip", "far fa-paperclip", "fal fa-paperclip", "fas fa-paragraph", "far fa-paragraph", "fal fa-paragraph", "fas fa-paste", "far fa-paste", "fal fa-paste", "fab fa-patreon", "fas fa-pause", "far fa-pause", "fal fa-pause", "fas fa-pause-circle", "far fa-pause-circle", "fal fa-pause-circle", "fas fa-paw", "far fa-paw", "fal fa-paw", "fab fa-paypal", "fas fa-pen", "far fa-pen", "fal fa-pen", "fas fa-pen-alt", "far fa-pen-alt", "fal fa-pen-alt", "fas fa-pen-square", "far fa-pen-square", "fal fa-pen-square", "fas fa-pencil", "far fa-pencil", "fal fa-pencil", "fas fa-pencil-alt", "far fa-pencil-alt", "fal fa-pencil-alt", "fas fa-pennant", "far fa-pennant", "fal fa-pennant", "fas fa-percent", "far fa-percent", "fal fa-percent", "fab fa-periscope", "fab fa-phabricator", "fab fa-phoenix-framework", "fas fa-phone", "far fa-phone", "fal fa-phone", "fas fa-phone-slash", "far fa-phone-slash", "fal fa-phone-slash", "fas fa-phone-square", "far fa-phone-square", "fal fa-phone-square", "fas fa-phone-volume", "far fa-phone-volume", "fal fa-phone-volume", "fab fa-php", "fab fa-pied-piper", "fab fa-pied-piper-alt", "fab fa-pied-piper-pp", "fab fa-pinterest", "fab fa-pinterest-p", "fab fa-pinterest-square", "fas fa-plane", "far fa-plane", "fal fa-plane", "fas fa-plane-alt", "far fa-plane-alt", "fal fa-plane-alt", "fas fa-play", "far fa-play", "fal fa-play", "fas fa-play-circle", "far fa-play-circle", "fal fa-play-circle", "fab fa-playstation", "fas fa-plug", "far fa-plug", "fal fa-plug", "fas fa-plus", "far fa-plus", "fal fa-plus", "fas fa-plus-circle", "far fa-plus-circle", "fal fa-plus-circle", "fas fa-plus-hexagon", "far fa-plus-hexagon", "fal fa-plus-hexagon", "fas fa-plus-octagon", "far fa-plus-octagon", "fal fa-plus-octagon", "fas fa-plus-square", "far fa-plus-square", "fal fa-plus-square", "fas fa-podcast", "far fa-podcast", "fal fa-podcast", "fas fa-poo", "far fa-poo", "fal fa-poo", "fas fa-portrait", "far fa-portrait", "fal fa-portrait", "fas fa-pound-sign", "far fa-pound-sign", "fal fa-pound-sign", "fas fa-power-off", "far fa-power-off", "fal fa-power-off", "fas fa-print", "far fa-print", "fal fa-print", "fab fa-product-hunt", "fab fa-pushed", "fas fa-puzzle-piece", "far fa-puzzle-piece", "fal fa-puzzle-piece", "fab fa-python", "fab fa-qq", "fas fa-qrcode", "far fa-qrcode", "fal fa-qrcode", "fas fa-question", "far fa-question", "fal fa-question", "fas fa-question-circle", "far fa-question-circle", "fal fa-question-circle", "fas fa-question-square", "far fa-question-square", "fal fa-question-square", "fas fa-quidditch", "far fa-quidditch", "fal fa-quidditch", "fab fa-quinscape", "fab fa-quora", "fas fa-quote-left", "far fa-quote-left", "fal fa-quote-left", "fas fa-quote-right", "far fa-quote-right", "fal fa-quote-right", "fas fa-racquet", "far fa-racquet", "fal fa-racquet", "fas fa-random", "far fa-random", "fal fa-random", "fab fa-ravelry", "fab fa-react", "fab fa-rebel", "fas fa-rectangle-landscape", "far fa-rectangle-landscape", "fal fa-rectangle-landscape", "fas fa-rectangle-portrait", "far fa-rectangle-portrait", "fal fa-rectangle-portrait", "fas fa-rectangle-wide", "far fa-rectangle-wide", "fal fa-rectangle-wide", "fas fa-recycle", "far fa-recycle", "fal fa-recycle", "fab fa-red-river", "fab fa-reddit", "fab fa-reddit-alien", "fab fa-reddit-square", "fas fa-redo", "far fa-redo", "fal fa-redo", "fas fa-redo-alt", "far fa-redo-alt", "fal fa-redo-alt", "fas fa-registered", "far fa-registered", "fal fa-registered", "fab fa-rendact", "fab fa-renren", "fas fa-repeat", "far fa-repeat", "fal fa-repeat", "fas fa-repeat-1", "far fa-repeat-1", "fal fa-repeat-1", "fas fa-repeat-1-alt", "far fa-repeat-1-alt", "fal fa-repeat-1-alt", "fas fa-repeat-alt", "far fa-repeat-alt", "fal fa-repeat-alt", "fas fa-reply", "far fa-reply", "fal fa-reply", "fas fa-reply-all", "far fa-reply-all", "fal fa-reply-all", "fab fa-replyd", "fab fa-resolving", "fas fa-retweet", "far fa-retweet", "fal fa-retweet", "fas fa-retweet-alt", "far fa-retweet-alt", "fal fa-retweet-alt", "fas fa-road", "far fa-road", "fal fa-road", "fas fa-rocket", "far fa-rocket", "fal fa-rocket", "fab fa-rocketchat", "fab fa-rockrms", "fas fa-rss", "far fa-rss", "fal fa-rss", "fas fa-rss-square", "far fa-rss-square", "fal fa-rss-square", "fas fa-ruble-sign", "far fa-ruble-sign", "fal fa-ruble-sign", "fas fa-rupee-sign", "far fa-rupee-sign", "fal fa-rupee-sign", "fab fa-safari", "fab fa-sass", "fas fa-save", "far fa-save", "fal fa-save", "fab fa-schlix", "fab fa-scribd", "fas fa-scrubber", "far fa-scrubber", "fal fa-scrubber", "fas fa-search", "far fa-search", "fal fa-search", "fas fa-search-minus", "far fa-search-minus", "fal fa-search-minus", "fas fa-search-plus", "far fa-search-plus", "fal fa-search-plus", "fab fa-searchengin", "fab fa-sellcast", "fab fa-sellsy", "fas fa-server", "far fa-server", "fal fa-server", "fab fa-servicestack", "fas fa-share", "far fa-share", "fal fa-share", "fas fa-share-all", "far fa-share-all", "fal fa-share-all", "fas fa-share-alt", "far fa-share-alt", "fal fa-share-alt", "fas fa-share-alt-square", "far fa-share-alt-square", "fal fa-share-alt-square", "fas fa-share-square", "far fa-share-square", "fal fa-share-square", "fas fa-shekel-sign", "far fa-shekel-sign", "fal fa-shekel-sign", "fas fa-shield", "far fa-shield", "fal fa-shield", "fas fa-shield-alt", "far fa-shield-alt", "fal fa-shield-alt", "fas fa-shield-check", "far fa-shield-check", "fal fa-shield-check", "fas fa-ship", "far fa-ship", "fal fa-ship", "fab fa-shirtsinbulk", "fas fa-shopping-bag", "far fa-shopping-bag", "fal fa-shopping-bag", "fas fa-shopping-basket", "far fa-shopping-basket", "fal fa-shopping-basket", "fas fa-shopping-cart", "far fa-shopping-cart", "fal fa-shopping-cart", "fas fa-shower", "far fa-shower", "fal fa-shower", "fas fa-shuttlecock", "far fa-shuttlecock", "fal fa-shuttlecock", "fas fa-sign-in", "far fa-sign-in", "fal fa-sign-in", "fas fa-sign-in-alt", "far fa-sign-in-alt", "fal fa-sign-in-alt", "fas fa-sign-language", "far fa-sign-language", "fal fa-sign-language", "fas fa-sign-out", "far fa-sign-out", "fal fa-sign-out", "fas fa-sign-out-alt", "far fa-sign-out-alt", "fal fa-sign-out-alt", "fas fa-signal", "far fa-signal", "fal fa-signal", "fab fa-simplybuilt", "fab fa-sistrix", "fas fa-sitemap", "far fa-sitemap", "fal fa-sitemap", "fab fa-skyatlas", "fab fa-skype", "fab fa-slack", "fab fa-slack-hash", "fas fa-sliders-h", "far fa-sliders-h", "fal fa-sliders-h", "fas fa-sliders-h-square", "far fa-sliders-h-square", "fal fa-sliders-h-square", "fas fa-sliders-v", "far fa-sliders-v", "fal fa-sliders-v", "fas fa-sliders-v-square", "far fa-sliders-v-square", "fal fa-sliders-v-square", "fab fa-slideshare", "fas fa-smile", "far fa-smile", "fal fa-smile", "fab fa-snapchat", "fab fa-snapchat-ghost", "fab fa-snapchat-square", "fas fa-snowflake", "far fa-snowflake", "fal fa-snowflake", "fas fa-sort", "far fa-sort", "fal fa-sort", "fas fa-sort-alpha-down", "far fa-sort-alpha-down", "fal fa-sort-alpha-down", "fas fa-sort-alpha-up", "far fa-sort-alpha-up", "fal fa-sort-alpha-up", "fas fa-sort-amount-down", "far fa-sort-amount-down", "fal fa-sort-amount-down", "fas fa-sort-amount-up", "far fa-sort-amount-up", "fal fa-sort-amount-up", "fas fa-sort-down", "far fa-sort-down", "fal fa-sort-down", "fas fa-sort-numeric-down", "far fa-sort-numeric-down", "fal fa-sort-numeric-down", "fas fa-sort-numeric-up", "far fa-sort-numeric-up", "fal fa-sort-numeric-up", "fas fa-sort-up", "far fa-sort-up", "fal fa-sort-up", "fab fa-soundcloud", "fas fa-space-shuttle", "far fa-space-shuttle", "fal fa-space-shuttle", "fas fa-spade", "far fa-spade", "fal fa-spade", "fab fa-speakap", "fas fa-spinner", "far fa-spinner", "fal fa-spinner", "fas fa-spinner-third", "far fa-spinner-third", "fal fa-spinner-third", "fab fa-spotify", "fas fa-square", "far fa-square", "fal fa-square", "fas fa-square-full", "far fa-square-full", "fal fa-square-full", "fab fa-stack-exchange", "fab fa-stack-overflow", "fas fa-star", "far fa-star", "fal fa-star", "fas fa-star-exclamation", "far fa-star-exclamation", "fal fa-star-exclamation", "fas fa-star-half", "far fa-star-half", "fal fa-star-half", "fab fa-staylinked", "fab fa-steam", "fab fa-steam-square", "fab fa-steam-symbol", "fas fa-step-backward", "far fa-step-backward", "fal fa-step-backward", "fas fa-step-forward", "far fa-step-forward", "fal fa-step-forward", "fas fa-stethoscope", "far fa-stethoscope", "fal fa-stethoscope", "fab fa-sticker-mule", "fas fa-sticky-note", "far fa-sticky-note", "fal fa-sticky-note", "fas fa-stop", "far fa-stop", "fal fa-stop", "fas fa-stop-circle", "far fa-stop-circle", "fal fa-stop-circle", "fas fa-stopwatch", "far fa-stopwatch", "fal fa-stopwatch", "fab fa-strava", "fas fa-street-view", "far fa-street-view", "fal fa-street-view", "fas fa-strikethrough", "far fa-strikethrough", "fal fa-strikethrough", "fab fa-stripe", "fab fa-stripe-s", "fab fa-studiovinari", "fab fa-stumbleupon", "fab fa-stumbleupon-circle", "fas fa-subscript", "far fa-subscript", "fal fa-subscript", "fas fa-subway", "far fa-subway", "fal fa-subway", "fas fa-suitcase", "far fa-suitcase", "fal fa-suitcase", "fas fa-sun", "far fa-sun", "fal fa-sun", "fab fa-superpowers", "fas fa-superscript", "far fa-superscript", "fal fa-superscript", "fab fa-supple", "fas fa-sync", "far fa-sync", "fal fa-sync", "fas fa-sync-alt", "far fa-sync-alt", "fal fa-sync-alt", "fas fa-table", "far fa-table", "fal fa-table", "fas fa-table-tennis", "far fa-table-tennis", "fal fa-table-tennis", "fas fa-tablet", "far fa-tablet", "fal fa-tablet", "fas fa-tablet-alt", "far fa-tablet-alt", "fal fa-tablet-alt", "fas fa-tablet-android", "far fa-tablet-android", "fal fa-tablet-android", "fas fa-tablet-android-alt", "far fa-tablet-android-alt", "fal fa-tablet-android-alt", "fas fa-tachometer", "far fa-tachometer", "fal fa-tachometer", "fas fa-tachometer-alt", "far fa-tachometer-alt", "fal fa-tachometer-alt", "fas fa-tag", "far fa-tag", "fal fa-tag", "fas fa-tags", "far fa-tags", "fal fa-tags", "fas fa-tasks", "far fa-tasks", "fal fa-tasks", "fas fa-taxi", "far fa-taxi", "fal fa-taxi", "fab fa-telegram", "fab fa-telegram-plane", "fab fa-tencent-weibo", "fas fa-tennis-ball", "far fa-tennis-ball", "fal fa-tennis-ball", "fas fa-terminal", "far fa-terminal", "fal fa-terminal", "fas fa-text-height", "far fa-text-height", "fal fa-text-height", "fas fa-text-width", "far fa-text-width", "fal fa-text-width", "fas fa-th", "far fa-th", "fal fa-th", "fas fa-th-large", "far fa-th-large", "fal fa-th-large", "fas fa-th-list", "far fa-th-list", "fal fa-th-list", "fab fa-themeisle", "fas fa-thermometer-empty", "far fa-thermometer-empty", "fal fa-thermometer-empty", "fas fa-thermometer-full", "far fa-thermometer-full", "fal fa-thermometer-full", "fas fa-thermometer-half", "far fa-thermometer-half", "fal fa-thermometer-half", "fas fa-thermometer-quarter", "far fa-thermometer-quarter", "fal fa-thermometer-quarter", "fas fa-thermometer-three-quarters", "far fa-thermometer-three-quarters", "fal fa-thermometer-three-quarters", "fas fa-thumbs-down", "far fa-thumbs-down", "fal fa-thumbs-down", "fas fa-thumbs-up", "far fa-thumbs-up", "fal fa-thumbs-up", "fas fa-thumbtack", "far fa-thumbtack", "fal fa-thumbtack", "fas fa-ticket", "far fa-ticket", "fal fa-ticket", "fas fa-ticket-alt", "far fa-ticket-alt", "fal fa-ticket-alt", "fas fa-times", "far fa-times", "fal fa-times", "fas fa-times-circle", "far fa-times-circle", "fal fa-times-circle", "fas fa-times-hexagon", "far fa-times-hexagon", "fal fa-times-hexagon", "fas fa-times-octagon", "far fa-times-octagon", "fal fa-times-octagon", "fas fa-times-square", "far fa-times-square", "fal fa-times-square", "fas fa-tint", "far fa-tint", "fal fa-tint", "fas fa-toggle-off", "far fa-toggle-off", "fal fa-toggle-off", "fas fa-toggle-on", "far fa-toggle-on", "fal fa-toggle-on", "fas fa-trademark", "far fa-trademark", "fal fa-trademark", "fas fa-train", "far fa-train", "fal fa-train", "fas fa-transgender", "far fa-transgender", "fal fa-transgender", "fas fa-transgender-alt", "far fa-transgender-alt", "fal fa-transgender-alt", "fas fa-trash", "far fa-trash", "fal fa-trash", "fas fa-trash-alt", "far fa-trash-alt", "fal fa-trash-alt", "fas fa-tree", "far fa-tree", "fal fa-tree", "fas fa-tree-alt", "far fa-tree-alt", "fal fa-tree-alt", "fab fa-trello", "fas fa-triangle", "far fa-triangle", "fal fa-triangle", "fab fa-tripadvisor", "fas fa-trophy", "far fa-trophy", "fal fa-trophy", "fas fa-trophy-alt", "far fa-trophy-alt", "fal fa-trophy-alt", "fas fa-truck", "far fa-truck", "fal fa-truck", "fas fa-tty", "far fa-tty", "fal fa-tty", "fab fa-tumblr", "fab fa-tumblr-square", "fas fa-tv", "far fa-tv", "fal fa-tv", "fas fa-tv-retro", "far fa-tv-retro", "fal fa-tv-retro", "fab fa-twitch", "fab fa-twitter", "fab fa-twitter-square", "fab fa-typo3", "fab fa-uber", "fab fa-uikit", "fas fa-umbrella", "far fa-umbrella", "fal fa-umbrella", "fas fa-underline", "far fa-underline", "fal fa-underline", "fas fa-undo", "far fa-undo", "fal fa-undo", "fas fa-undo-alt", "far fa-undo-alt", "fal fa-undo-alt", "fab fa-uniregistry", "fas fa-universal-access", "far fa-universal-access", "fal fa-universal-access", "fas fa-university", "far fa-university", "fal fa-university", "fas fa-unlink", "far fa-unlink", "fal fa-unlink", "fas fa-unlock", "far fa-unlock", "fal fa-unlock", "fas fa-unlock-alt", "far fa-unlock-alt", "fal fa-unlock-alt", "fab fa-untappd", "fas fa-upload", "far fa-upload", "fal fa-upload", "fab fa-usb", "fas fa-usd-circle", "far fa-usd-circle", "fal fa-usd-circle", "fas fa-usd-square", "far fa-usd-square", "fal fa-usd-square", "fas fa-user", "far fa-user", "fal fa-user", "fas fa-user-alt", "far fa-user-alt", "fal fa-user-alt", "fas fa-user-circle", "far fa-user-circle", "fal fa-user-circle", "fas fa-user-md", "far fa-user-md", "fal fa-user-md", "fas fa-user-plus", "far fa-user-plus", "fal fa-user-plus", "fas fa-user-secret", "far fa-user-secret", "fal fa-user-secret", "fas fa-user-times", "far fa-user-times", "fal fa-user-times", "fas fa-users", "far fa-users", "fal fa-users", "fab fa-ussunnah", "fas fa-utensil-fork", "far fa-utensil-fork", "fal fa-utensil-fork", "fas fa-utensil-knife", "far fa-utensil-knife", "fal fa-utensil-knife", "fas fa-utensil-spoon", "far fa-utensil-spoon", "fal fa-utensil-spoon", "fas fa-utensils", "far fa-utensils", "fal fa-utensils", "fas fa-utensils-alt", "far fa-utensils-alt", "fal fa-utensils-alt", "fab fa-vaadin", "fas fa-venus", "far fa-venus", "fal fa-venus", "fas fa-venus-double", "far fa-venus-double", "fal fa-venus-double", "fas fa-venus-mars", "far fa-venus-mars", "fal fa-venus-mars", "fab fa-viacoin", "fab fa-viadeo", "fab fa-viadeo-square", "fab fa-viber", "fas fa-video", "far fa-video", "fal fa-video", "fab fa-vimeo", "fab fa-vimeo-square", "fab fa-vimeo-v", "fab fa-vine", "fab fa-vk", "fab fa-vnv", "fas fa-volleyball-ball", "far fa-volleyball-ball", "fal fa-volleyball-ball", "fas fa-volume-down", "far fa-volume-down", "fal fa-volume-down", "fas fa-volume-mute", "far fa-volume-mute", "fal fa-volume-mute", "fas fa-volume-off", "far fa-volume-off", "fal fa-volume-off", "fas fa-volume-up", "far fa-volume-up", "fal fa-volume-up", "fab fa-vuejs", "fas fa-watch", "far fa-watch", "fal fa-watch", "fab fa-weibo", "fab fa-weixin", "fab fa-whatsapp", "fab fa-whatsapp-square", "fas fa-wheelchair", "far fa-wheelchair", "fal fa-wheelchair", "fas fa-whistle", "far fa-whistle", "fal fa-whistle", "fab fa-whmcs", "fas fa-wifi", "far fa-wifi", "fal fa-wifi", "fab fa-wikipedia-w", "fas fa-window", "far fa-window", "fal fa-window", "fas fa-window-alt", "far fa-window-alt", "fal fa-window-alt", "fas fa-window-close", "far fa-window-close", "fal fa-window-close", "fas fa-window-maximize", "far fa-window-maximize", "fal fa-window-maximize", "fas fa-window-minimize", "far fa-window-minimize", "fal fa-window-minimize", "fas fa-window-restore", "far fa-window-restore", "fal fa-window-restore", "fab fa-windows", "fas fa-won-sign", "far fa-won-sign", "fal fa-won-sign", "fab fa-wordpress", "fab fa-wordpress-simple", "fab fa-wpbeginner", "fab fa-wpexplorer", "fab fa-wpforms", "fas fa-wrench", "far fa-wrench", "fal fa-wrench", "fab fa-xbox", "fab fa-xing", "fab fa-xing-square", "fab fa-y-combinator", "fab fa-yahoo", "fab fa-yandex", "fab fa-yandex-international", "fab fa-yelp", "fas fa-yen-sign", "far fa-yen-sign", "fal fa-yen-sign", "fab fa-yoast", "fab fa-youtube", "fab fa-youtube-square" ]
    });
});