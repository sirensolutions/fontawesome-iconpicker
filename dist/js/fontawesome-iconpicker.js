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
                if (typeof this.options.icons[d].title === "string") {
                    var e = a(this.options.templates.iconpickerItem);
                    e.find("i").addClass(this.options.fullClassFormatter(this.options.icons[d].title));
                    e.data("iconpickerValue", this.options.icons[d].title).on("click.iconpicker", c);
                    this.iconpicker.find(".iconpicker-items").append(e.attr("title", "." + this.options.icons[d].title));
                    if (this.options.icons[d].searchTerms.length > 0) {
                        var f = "";
                        for (var g = 0; g < this.options.icons[d].searchTerms.length; g++) {
                            f = f + this.options.icons[d].searchTerms[g] + " ";
                        }
                        this.iconpicker.find(".iconpicker-items").append(e.attr("data-search-terms", f));
                    }
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
            var e = false;
            for (var f = 0; f < this.options.icons.length; f++) {
                if (this.options.icons[f].title === c) {
                    e = true;
                    break;
                }
            }
            if (e || d) {
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
                    var f = b.attr("data-search-terms") ? b.attr("data-search-terms").toLowerCase() : "";
                    e = e + " " + f;
                    var g = false;
                    try {
                        g = new RegExp("(^|\\W)" + c, "g");
                    } catch (a) {
                        g = false;
                    }
                    if (g !== false && e.match(g)) {
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
        icons: [ {
            title: "fab fa-500px",
            searchTerms: []
        }, {
            title: "fab fa-accessible-icon",
            searchTerms: [ "accessibility", "wheelchair", "handicap", "person", "wheelchair-alt" ]
        }, {
            title: "fab fa-accusoft",
            searchTerms: []
        }, {
            title: "fas fa-address-book",
            searchTerms: []
        }, {
            title: "far fa-address-book",
            searchTerms: []
        }, {
            title: "fal fa-address-book",
            searchTerms: []
        }, {
            title: "fas fa-address-card",
            searchTerms: []
        }, {
            title: "far fa-address-card",
            searchTerms: []
        }, {
            title: "fal fa-address-card",
            searchTerms: []
        }, {
            title: "fas fa-adjust",
            searchTerms: [ "contrast" ]
        }, {
            title: "far fa-adjust",
            searchTerms: [ "contrast" ]
        }, {
            title: "fal fa-adjust",
            searchTerms: [ "contrast" ]
        }, {
            title: "fab fa-adn",
            searchTerms: []
        }, {
            title: "fab fa-adversal",
            searchTerms: []
        }, {
            title: "fab fa-affiliatetheme",
            searchTerms: []
        }, {
            title: "fas fa-alarm-clock",
            searchTerms: [ "watch", "timer", "late", "timestamp", "date" ]
        }, {
            title: "far fa-alarm-clock",
            searchTerms: [ "watch", "timer", "late", "timestamp", "date" ]
        }, {
            title: "fal fa-alarm-clock",
            searchTerms: [ "watch", "timer", "late", "timestamp", "date" ]
        }, {
            title: "fab fa-algolia",
            searchTerms: []
        }, {
            title: "fas fa-align-center",
            searchTerms: [ "middle", "text" ]
        }, {
            title: "far fa-align-center",
            searchTerms: [ "middle", "text" ]
        }, {
            title: "fal fa-align-center",
            searchTerms: [ "middle", "text" ]
        }, {
            title: "fas fa-align-justify",
            searchTerms: [ "text" ]
        }, {
            title: "far fa-align-justify",
            searchTerms: [ "text" ]
        }, {
            title: "fal fa-align-justify",
            searchTerms: [ "text" ]
        }, {
            title: "fas fa-align-left",
            searchTerms: [ "text" ]
        }, {
            title: "far fa-align-left",
            searchTerms: [ "text" ]
        }, {
            title: "fal fa-align-left",
            searchTerms: [ "text" ]
        }, {
            title: "fas fa-align-right",
            searchTerms: [ "text" ]
        }, {
            title: "far fa-align-right",
            searchTerms: [ "text" ]
        }, {
            title: "fal fa-align-right",
            searchTerms: [ "text" ]
        }, {
            title: "fas fa-allergies",
            searchTerms: [ "intolerances", "pox", "hand", "freckles", "spots" ]
        }, {
            title: "far fa-allergies",
            searchTerms: [ "intolerances", "pox", "hand", "freckles", "spots" ]
        }, {
            title: "fal fa-allergies",
            searchTerms: [ "intolerances", "pox", "hand", "freckles", "spots" ]
        }, {
            title: "fab fa-amazon",
            searchTerms: []
        }, {
            title: "fab fa-amazon-pay",
            searchTerms: []
        }, {
            title: "fas fa-ambulance",
            searchTerms: [ "vehicle", "support", "help", "machine" ]
        }, {
            title: "far fa-ambulance",
            searchTerms: [ "vehicle", "support", "help", "machine" ]
        }, {
            title: "fal fa-ambulance",
            searchTerms: [ "vehicle", "support", "help", "machine" ]
        }, {
            title: "fas fa-american-sign-language-interpreting",
            searchTerms: []
        }, {
            title: "far fa-american-sign-language-interpreting",
            searchTerms: []
        }, {
            title: "fal fa-american-sign-language-interpreting",
            searchTerms: []
        }, {
            title: "fab fa-amilia",
            searchTerms: []
        }, {
            title: "fas fa-anchor",
            searchTerms: [ "link" ]
        }, {
            title: "far fa-anchor",
            searchTerms: [ "link" ]
        }, {
            title: "fal fa-anchor",
            searchTerms: [ "link" ]
        }, {
            title: "fab fa-android",
            searchTerms: [ "robot" ]
        }, {
            title: "fab fa-angellist",
            searchTerms: []
        }, {
            title: "fas fa-angle-double-down",
            searchTerms: [ "arrows" ]
        }, {
            title: "far fa-angle-double-down",
            searchTerms: [ "arrows" ]
        }, {
            title: "fal fa-angle-double-down",
            searchTerms: [ "arrows" ]
        }, {
            title: "fas fa-angle-double-left",
            searchTerms: [ "laquo", "quote", "previous", "back", "arrows" ]
        }, {
            title: "far fa-angle-double-left",
            searchTerms: [ "laquo", "quote", "previous", "back", "arrows" ]
        }, {
            title: "fal fa-angle-double-left",
            searchTerms: [ "laquo", "quote", "previous", "back", "arrows" ]
        }, {
            title: "fas fa-angle-double-right",
            searchTerms: [ "raquo", "quote", "next", "forward", "arrows" ]
        }, {
            title: "far fa-angle-double-right",
            searchTerms: [ "raquo", "quote", "next", "forward", "arrows" ]
        }, {
            title: "fal fa-angle-double-right",
            searchTerms: [ "raquo", "quote", "next", "forward", "arrows" ]
        }, {
            title: "fas fa-angle-double-up",
            searchTerms: [ "arrows" ]
        }, {
            title: "far fa-angle-double-up",
            searchTerms: [ "arrows" ]
        }, {
            title: "fal fa-angle-double-up",
            searchTerms: [ "arrows" ]
        }, {
            title: "fas fa-angle-down",
            searchTerms: [ "arrow" ]
        }, {
            title: "far fa-angle-down",
            searchTerms: [ "arrow" ]
        }, {
            title: "fal fa-angle-down",
            searchTerms: [ "arrow" ]
        }, {
            title: "fas fa-angle-left",
            searchTerms: [ "previous", "back", "arrow" ]
        }, {
            title: "far fa-angle-left",
            searchTerms: [ "previous", "back", "arrow" ]
        }, {
            title: "fal fa-angle-left",
            searchTerms: [ "previous", "back", "arrow" ]
        }, {
            title: "fas fa-angle-right",
            searchTerms: [ "next", "forward", "arrow" ]
        }, {
            title: "far fa-angle-right",
            searchTerms: [ "next", "forward", "arrow" ]
        }, {
            title: "fal fa-angle-right",
            searchTerms: [ "next", "forward", "arrow" ]
        }, {
            title: "fas fa-angle-up",
            searchTerms: [ "arrow" ]
        }, {
            title: "far fa-angle-up",
            searchTerms: [ "arrow" ]
        }, {
            title: "fal fa-angle-up",
            searchTerms: [ "arrow" ]
        }, {
            title: "fab fa-angrycreative",
            searchTerms: []
        }, {
            title: "fab fa-angular",
            searchTerms: []
        }, {
            title: "fab fa-app-store",
            searchTerms: []
        }, {
            title: "fab fa-app-store-ios",
            searchTerms: []
        }, {
            title: "fab fa-apper",
            searchTerms: []
        }, {
            title: "fab fa-apple",
            searchTerms: [ "osx", "food" ]
        }, {
            title: "fab fa-apple-pay",
            searchTerms: []
        }, {
            title: "fas fa-archive",
            searchTerms: [ "box", "storage", "package" ]
        }, {
            title: "far fa-archive",
            searchTerms: [ "box", "storage", "package" ]
        }, {
            title: "fal fa-archive",
            searchTerms: [ "box", "storage", "package" ]
        }, {
            title: "fas fa-arrow-alt-circle-down",
            searchTerms: [ "download", "arrow-circle-o-down" ]
        }, {
            title: "far fa-arrow-alt-circle-down",
            searchTerms: [ "download", "arrow-circle-o-down" ]
        }, {
            title: "fal fa-arrow-alt-circle-down",
            searchTerms: [ "download", "arrow-circle-o-down" ]
        }, {
            title: "fas fa-arrow-alt-circle-left",
            searchTerms: [ "previous", "back", "arrow-circle-o-left" ]
        }, {
            title: "far fa-arrow-alt-circle-left",
            searchTerms: [ "previous", "back", "arrow-circle-o-left" ]
        }, {
            title: "fal fa-arrow-alt-circle-left",
            searchTerms: [ "previous", "back", "arrow-circle-o-left" ]
        }, {
            title: "fas fa-arrow-alt-circle-right",
            searchTerms: [ "next", "forward", "arrow-circle-o-right" ]
        }, {
            title: "far fa-arrow-alt-circle-right",
            searchTerms: [ "next", "forward", "arrow-circle-o-right" ]
        }, {
            title: "fal fa-arrow-alt-circle-right",
            searchTerms: [ "next", "forward", "arrow-circle-o-right" ]
        }, {
            title: "fas fa-arrow-alt-circle-up",
            searchTerms: [ "arrow-circle-o-up" ]
        }, {
            title: "far fa-arrow-alt-circle-up",
            searchTerms: [ "arrow-circle-o-up" ]
        }, {
            title: "fal fa-arrow-alt-circle-up",
            searchTerms: [ "arrow-circle-o-up" ]
        }, {
            title: "fas fa-arrow-alt-down",
            searchTerms: []
        }, {
            title: "far fa-arrow-alt-down",
            searchTerms: []
        }, {
            title: "fal fa-arrow-alt-down",
            searchTerms: []
        }, {
            title: "fas fa-arrow-alt-from-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "far fa-arrow-alt-from-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "fal fa-arrow-alt-from-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "fas fa-arrow-alt-from-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "far fa-arrow-alt-from-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "fal fa-arrow-alt-from-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "fas fa-arrow-alt-from-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "far fa-arrow-alt-from-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "fal fa-arrow-alt-from-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "fas fa-arrow-alt-from-top",
            searchTerms: []
        }, {
            title: "far fa-arrow-alt-from-top",
            searchTerms: []
        }, {
            title: "fal fa-arrow-alt-from-top",
            searchTerms: []
        }, {
            title: "fas fa-arrow-alt-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "far fa-arrow-alt-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "fal fa-arrow-alt-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "fas fa-arrow-alt-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "far fa-arrow-alt-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "fal fa-arrow-alt-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "fas fa-arrow-alt-square-down",
            searchTerms: []
        }, {
            title: "far fa-arrow-alt-square-down",
            searchTerms: []
        }, {
            title: "fal fa-arrow-alt-square-down",
            searchTerms: []
        }, {
            title: "fas fa-arrow-alt-square-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "far fa-arrow-alt-square-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "fal fa-arrow-alt-square-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "fas fa-arrow-alt-square-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "far fa-arrow-alt-square-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "fal fa-arrow-alt-square-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "fas fa-arrow-alt-square-up",
            searchTerms: []
        }, {
            title: "far fa-arrow-alt-square-up",
            searchTerms: []
        }, {
            title: "fal fa-arrow-alt-square-up",
            searchTerms: []
        }, {
            title: "fas fa-arrow-alt-to-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "far fa-arrow-alt-to-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "fal fa-arrow-alt-to-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "fas fa-arrow-alt-to-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "far fa-arrow-alt-to-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "fal fa-arrow-alt-to-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "fas fa-arrow-alt-to-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "far fa-arrow-alt-to-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "fal fa-arrow-alt-to-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "fas fa-arrow-alt-to-top",
            searchTerms: []
        }, {
            title: "far fa-arrow-alt-to-top",
            searchTerms: []
        }, {
            title: "fal fa-arrow-alt-to-top",
            searchTerms: []
        }, {
            title: "fas fa-arrow-alt-up",
            searchTerms: []
        }, {
            title: "far fa-arrow-alt-up",
            searchTerms: []
        }, {
            title: "fal fa-arrow-alt-up",
            searchTerms: []
        }, {
            title: "fas fa-arrow-circle-down",
            searchTerms: [ "download" ]
        }, {
            title: "far fa-arrow-circle-down",
            searchTerms: [ "download" ]
        }, {
            title: "fal fa-arrow-circle-down",
            searchTerms: [ "download" ]
        }, {
            title: "fas fa-arrow-circle-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "far fa-arrow-circle-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "fal fa-arrow-circle-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "fas fa-arrow-circle-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "far fa-arrow-circle-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "fal fa-arrow-circle-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "fas fa-arrow-circle-up",
            searchTerms: []
        }, {
            title: "far fa-arrow-circle-up",
            searchTerms: []
        }, {
            title: "fal fa-arrow-circle-up",
            searchTerms: []
        }, {
            title: "fas fa-arrow-down",
            searchTerms: [ "download" ]
        }, {
            title: "far fa-arrow-down",
            searchTerms: [ "download" ]
        }, {
            title: "fal fa-arrow-down",
            searchTerms: [ "download" ]
        }, {
            title: "fas fa-arrow-from-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "far fa-arrow-from-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "fal fa-arrow-from-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "fas fa-arrow-from-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "far fa-arrow-from-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "fal fa-arrow-from-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "fas fa-arrow-from-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "far fa-arrow-from-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "fal fa-arrow-from-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "fas fa-arrow-from-top",
            searchTerms: []
        }, {
            title: "far fa-arrow-from-top",
            searchTerms: []
        }, {
            title: "fal fa-arrow-from-top",
            searchTerms: []
        }, {
            title: "fas fa-arrow-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "far fa-arrow-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "fal fa-arrow-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "fas fa-arrow-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "far fa-arrow-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "fal fa-arrow-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "fas fa-arrow-square-down",
            searchTerms: []
        }, {
            title: "far fa-arrow-square-down",
            searchTerms: []
        }, {
            title: "fal fa-arrow-square-down",
            searchTerms: []
        }, {
            title: "fas fa-arrow-square-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "far fa-arrow-square-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "fal fa-arrow-square-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "fas fa-arrow-square-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "far fa-arrow-square-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "fal fa-arrow-square-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "fas fa-arrow-square-up",
            searchTerms: []
        }, {
            title: "far fa-arrow-square-up",
            searchTerms: []
        }, {
            title: "fal fa-arrow-square-up",
            searchTerms: []
        }, {
            title: "fas fa-arrow-to-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "far fa-arrow-to-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "fal fa-arrow-to-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "fas fa-arrow-to-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "far fa-arrow-to-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "fal fa-arrow-to-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "fas fa-arrow-to-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "far fa-arrow-to-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "fal fa-arrow-to-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "fas fa-arrow-to-top",
            searchTerms: []
        }, {
            title: "far fa-arrow-to-top",
            searchTerms: []
        }, {
            title: "fal fa-arrow-to-top",
            searchTerms: []
        }, {
            title: "fas fa-arrow-up",
            searchTerms: []
        }, {
            title: "far fa-arrow-up",
            searchTerms: []
        }, {
            title: "fal fa-arrow-up",
            searchTerms: []
        }, {
            title: "fas fa-arrows",
            searchTerms: [ "move", "reorder", "resize" ]
        }, {
            title: "far fa-arrows",
            searchTerms: [ "move", "reorder", "resize" ]
        }, {
            title: "fal fa-arrows",
            searchTerms: [ "move", "reorder", "resize" ]
        }, {
            title: "fas fa-arrows-alt",
            searchTerms: [ "expand", "enlarge", "fullscreen", "bigger", "move", "reorder", "resize", "arrow", "arrows" ]
        }, {
            title: "far fa-arrows-alt",
            searchTerms: [ "expand", "enlarge", "fullscreen", "bigger", "move", "reorder", "resize", "arrow", "arrows" ]
        }, {
            title: "fal fa-arrows-alt",
            searchTerms: [ "expand", "enlarge", "fullscreen", "bigger", "move", "reorder", "resize", "arrow", "arrows" ]
        }, {
            title: "fas fa-arrows-alt-h",
            searchTerms: [ "resize", "arrows-h" ]
        }, {
            title: "far fa-arrows-alt-h",
            searchTerms: [ "resize", "arrows-h" ]
        }, {
            title: "fal fa-arrows-alt-h",
            searchTerms: [ "resize", "arrows-h" ]
        }, {
            title: "fas fa-arrows-alt-v",
            searchTerms: [ "resize", "arrows-v" ]
        }, {
            title: "far fa-arrows-alt-v",
            searchTerms: [ "resize", "arrows-v" ]
        }, {
            title: "fal fa-arrows-alt-v",
            searchTerms: [ "resize", "arrows-v" ]
        }, {
            title: "fas fa-arrows-h",
            searchTerms: [ "resize" ]
        }, {
            title: "far fa-arrows-h",
            searchTerms: [ "resize" ]
        }, {
            title: "fal fa-arrows-h",
            searchTerms: [ "resize" ]
        }, {
            title: "fas fa-arrows-v",
            searchTerms: [ "resize" ]
        }, {
            title: "far fa-arrows-v",
            searchTerms: [ "resize" ]
        }, {
            title: "fal fa-arrows-v",
            searchTerms: [ "resize" ]
        }, {
            title: "fas fa-assistive-listening-systems",
            searchTerms: []
        }, {
            title: "far fa-assistive-listening-systems",
            searchTerms: []
        }, {
            title: "fal fa-assistive-listening-systems",
            searchTerms: []
        }, {
            title: "fas fa-asterisk",
            searchTerms: [ "details" ]
        }, {
            title: "far fa-asterisk",
            searchTerms: [ "details" ]
        }, {
            title: "fal fa-asterisk",
            searchTerms: [ "details" ]
        }, {
            title: "fab fa-asymmetrik",
            searchTerms: []
        }, {
            title: "fas fa-at",
            searchTerms: [ "email", "e-mail" ]
        }, {
            title: "far fa-at",
            searchTerms: [ "email", "e-mail" ]
        }, {
            title: "fal fa-at",
            searchTerms: [ "email", "e-mail" ]
        }, {
            title: "fab fa-audible",
            searchTerms: []
        }, {
            title: "fas fa-audio-description",
            searchTerms: []
        }, {
            title: "far fa-audio-description",
            searchTerms: []
        }, {
            title: "fal fa-audio-description",
            searchTerms: []
        }, {
            title: "fab fa-autoprefixer",
            searchTerms: []
        }, {
            title: "fab fa-avianex",
            searchTerms: []
        }, {
            title: "fab fa-aviato",
            searchTerms: []
        }, {
            title: "fab fa-aws",
            searchTerms: []
        }, {
            title: "fas fa-backward",
            searchTerms: [ "rewind", "previous" ]
        }, {
            title: "far fa-backward",
            searchTerms: [ "rewind", "previous" ]
        }, {
            title: "fal fa-backward",
            searchTerms: [ "rewind", "previous" ]
        }, {
            title: "fas fa-badge",
            searchTerms: []
        }, {
            title: "far fa-badge",
            searchTerms: []
        }, {
            title: "fal fa-badge",
            searchTerms: []
        }, {
            title: "fas fa-badge-check",
            searchTerms: [ "award", "achievement", "security", "winner", "done", "agree", "accept", "confirm", "ok", "select", "success", "yes", "correct" ]
        }, {
            title: "far fa-badge-check",
            searchTerms: [ "award", "achievement", "security", "winner", "done", "agree", "accept", "confirm", "ok", "select", "success", "yes", "correct" ]
        }, {
            title: "fal fa-badge-check",
            searchTerms: [ "award", "achievement", "security", "winner", "done", "agree", "accept", "confirm", "ok", "select", "success", "yes", "correct" ]
        }, {
            title: "fas fa-balance-scale",
            searchTerms: []
        }, {
            title: "far fa-balance-scale",
            searchTerms: []
        }, {
            title: "fal fa-balance-scale",
            searchTerms: []
        }, {
            title: "fas fa-ban",
            searchTerms: [ "delete", "remove", "trash", "hide", "block", "stop", "abort", "cancel", "ban", "prohibit" ]
        }, {
            title: "far fa-ban",
            searchTerms: [ "delete", "remove", "trash", "hide", "block", "stop", "abort", "cancel", "ban", "prohibit" ]
        }, {
            title: "fal fa-ban",
            searchTerms: [ "delete", "remove", "trash", "hide", "block", "stop", "abort", "cancel", "ban", "prohibit" ]
        }, {
            title: "fas fa-band-aid",
            searchTerms: [ "bandage", "ouch", "boo boo" ]
        }, {
            title: "far fa-band-aid",
            searchTerms: [ "bandage", "ouch", "boo boo" ]
        }, {
            title: "fal fa-band-aid",
            searchTerms: [ "bandage", "ouch", "boo boo" ]
        }, {
            title: "fab fa-bandcamp",
            searchTerms: []
        }, {
            title: "fas fa-barcode",
            searchTerms: [ "scan" ]
        }, {
            title: "far fa-barcode",
            searchTerms: [ "scan" ]
        }, {
            title: "fal fa-barcode",
            searchTerms: [ "scan" ]
        }, {
            title: "fas fa-barcode-alt",
            searchTerms: []
        }, {
            title: "far fa-barcode-alt",
            searchTerms: []
        }, {
            title: "fal fa-barcode-alt",
            searchTerms: []
        }, {
            title: "fas fa-barcode-read",
            searchTerms: []
        }, {
            title: "far fa-barcode-read",
            searchTerms: []
        }, {
            title: "fal fa-barcode-read",
            searchTerms: []
        }, {
            title: "fas fa-barcode-scan",
            searchTerms: []
        }, {
            title: "far fa-barcode-scan",
            searchTerms: []
        }, {
            title: "fal fa-barcode-scan",
            searchTerms: []
        }, {
            title: "fas fa-bars",
            searchTerms: [ "menu", "drag", "reorder", "settings", "list", "ul", "ol", "checklist", "todo", "hamburger", "navigation", "nav" ]
        }, {
            title: "far fa-bars",
            searchTerms: [ "menu", "drag", "reorder", "settings", "list", "ul", "ol", "checklist", "todo", "hamburger", "navigation", "nav" ]
        }, {
            title: "fal fa-bars",
            searchTerms: [ "menu", "drag", "reorder", "settings", "list", "ul", "ol", "checklist", "todo", "hamburger", "navigation", "nav" ]
        }, {
            title: "fas fa-baseball",
            searchTerms: []
        }, {
            title: "far fa-baseball",
            searchTerms: []
        }, {
            title: "fal fa-baseball",
            searchTerms: []
        }, {
            title: "fas fa-baseball-ball",
            searchTerms: []
        }, {
            title: "far fa-baseball-ball",
            searchTerms: []
        }, {
            title: "fal fa-baseball-ball",
            searchTerms: []
        }, {
            title: "fas fa-basketball-ball",
            searchTerms: []
        }, {
            title: "far fa-basketball-ball",
            searchTerms: []
        }, {
            title: "fal fa-basketball-ball",
            searchTerms: []
        }, {
            title: "fas fa-basketball-hoop",
            searchTerms: []
        }, {
            title: "far fa-basketball-hoop",
            searchTerms: []
        }, {
            title: "fal fa-basketball-hoop",
            searchTerms: []
        }, {
            title: "fas fa-bath",
            searchTerms: []
        }, {
            title: "far fa-bath",
            searchTerms: []
        }, {
            title: "fal fa-bath",
            searchTerms: []
        }, {
            title: "fas fa-battery-bolt",
            searchTerms: [ "power", "status" ]
        }, {
            title: "far fa-battery-bolt",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fal fa-battery-bolt",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fas fa-battery-empty",
            searchTerms: [ "power", "status" ]
        }, {
            title: "far fa-battery-empty",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fal fa-battery-empty",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fas fa-battery-full",
            searchTerms: [ "power", "status" ]
        }, {
            title: "far fa-battery-full",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fal fa-battery-full",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fas fa-battery-half",
            searchTerms: [ "power", "status" ]
        }, {
            title: "far fa-battery-half",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fal fa-battery-half",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fas fa-battery-quarter",
            searchTerms: [ "power", "status" ]
        }, {
            title: "far fa-battery-quarter",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fal fa-battery-quarter",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fas fa-battery-slash",
            searchTerms: [ "power", "status" ]
        }, {
            title: "far fa-battery-slash",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fal fa-battery-slash",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fas fa-battery-three-quarters",
            searchTerms: [ "power", "status" ]
        }, {
            title: "far fa-battery-three-quarters",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fal fa-battery-three-quarters",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fas fa-bed",
            searchTerms: [ "travel" ]
        }, {
            title: "far fa-bed",
            searchTerms: [ "travel" ]
        }, {
            title: "fal fa-bed",
            searchTerms: [ "travel" ]
        }, {
            title: "fas fa-beer",
            searchTerms: [ "alcohol", "stein", "drink", "mug", "bar", "liquor" ]
        }, {
            title: "far fa-beer",
            searchTerms: [ "alcohol", "stein", "drink", "mug", "bar", "liquor" ]
        }, {
            title: "fal fa-beer",
            searchTerms: [ "alcohol", "stein", "drink", "mug", "bar", "liquor" ]
        }, {
            title: "fab fa-behance",
            searchTerms: []
        }, {
            title: "fab fa-behance-square",
            searchTerms: []
        }, {
            title: "fas fa-bell",
            searchTerms: [ "alert", "reminder", "notification" ]
        }, {
            title: "far fa-bell",
            searchTerms: [ "alert", "reminder", "notification" ]
        }, {
            title: "fal fa-bell",
            searchTerms: [ "alert", "reminder", "notification" ]
        }, {
            title: "fas fa-bell-slash",
            searchTerms: []
        }, {
            title: "far fa-bell-slash",
            searchTerms: []
        }, {
            title: "fal fa-bell-slash",
            searchTerms: []
        }, {
            title: "fas fa-bicycle",
            searchTerms: [ "vehicle", "transportation", "bike", "gears" ]
        }, {
            title: "far fa-bicycle",
            searchTerms: [ "vehicle", "transportation", "bike", "gears" ]
        }, {
            title: "fal fa-bicycle",
            searchTerms: [ "vehicle", "transportation", "bike", "gears" ]
        }, {
            title: "fab fa-bimobject",
            searchTerms: []
        }, {
            title: "fas fa-binoculars",
            searchTerms: []
        }, {
            title: "far fa-binoculars",
            searchTerms: []
        }, {
            title: "fal fa-binoculars",
            searchTerms: []
        }, {
            title: "fas fa-birthday-cake",
            searchTerms: []
        }, {
            title: "far fa-birthday-cake",
            searchTerms: []
        }, {
            title: "fal fa-birthday-cake",
            searchTerms: []
        }, {
            title: "fab fa-bitbucket",
            searchTerms: [ "git", "bitbucket-square" ]
        }, {
            title: "fab fa-bitcoin",
            searchTerms: []
        }, {
            title: "fab fa-bity",
            searchTerms: []
        }, {
            title: "fab fa-black-tie",
            searchTerms: []
        }, {
            title: "fab fa-blackberry",
            searchTerms: []
        }, {
            title: "fas fa-blanket",
            searchTerms: []
        }, {
            title: "far fa-blanket",
            searchTerms: []
        }, {
            title: "fal fa-blanket",
            searchTerms: []
        }, {
            title: "fas fa-blind",
            searchTerms: []
        }, {
            title: "far fa-blind",
            searchTerms: []
        }, {
            title: "fal fa-blind",
            searchTerms: []
        }, {
            title: "fab fa-blogger",
            searchTerms: []
        }, {
            title: "fab fa-blogger-b",
            searchTerms: []
        }, {
            title: "fab fa-bluetooth",
            searchTerms: []
        }, {
            title: "fab fa-bluetooth-b",
            searchTerms: []
        }, {
            title: "fas fa-bold",
            searchTerms: []
        }, {
            title: "far fa-bold",
            searchTerms: []
        }, {
            title: "fal fa-bold",
            searchTerms: []
        }, {
            title: "fas fa-bolt",
            searchTerms: [ "lightning", "weather" ]
        }, {
            title: "far fa-bolt",
            searchTerms: [ "lightning", "weather" ]
        }, {
            title: "fal fa-bolt",
            searchTerms: [ "lightning", "weather" ]
        }, {
            title: "fas fa-bomb",
            searchTerms: []
        }, {
            title: "far fa-bomb",
            searchTerms: []
        }, {
            title: "fal fa-bomb",
            searchTerms: []
        }, {
            title: "fas fa-book",
            searchTerms: [ "read", "documentation" ]
        }, {
            title: "far fa-book",
            searchTerms: [ "read", "documentation" ]
        }, {
            title: "fal fa-book",
            searchTerms: [ "read", "documentation" ]
        }, {
            title: "fas fa-book-heart",
            searchTerms: []
        }, {
            title: "far fa-book-heart",
            searchTerms: []
        }, {
            title: "fal fa-book-heart",
            searchTerms: []
        }, {
            title: "fas fa-bookmark",
            searchTerms: [ "save" ]
        }, {
            title: "far fa-bookmark",
            searchTerms: [ "save" ]
        }, {
            title: "fal fa-bookmark",
            searchTerms: [ "save" ]
        }, {
            title: "fas fa-bowling-ball",
            searchTerms: []
        }, {
            title: "far fa-bowling-ball",
            searchTerms: []
        }, {
            title: "fal fa-bowling-ball",
            searchTerms: []
        }, {
            title: "fas fa-bowling-pins",
            searchTerms: []
        }, {
            title: "far fa-bowling-pins",
            searchTerms: []
        }, {
            title: "fal fa-bowling-pins",
            searchTerms: []
        }, {
            title: "fas fa-box",
            searchTerms: [ "package" ]
        }, {
            title: "far fa-box",
            searchTerms: [ "package" ]
        }, {
            title: "fal fa-box",
            searchTerms: [ "package" ]
        }, {
            title: "fas fa-box-alt",
            searchTerms: []
        }, {
            title: "far fa-box-alt",
            searchTerms: []
        }, {
            title: "fal fa-box-alt",
            searchTerms: []
        }, {
            title: "fas fa-box-check",
            searchTerms: [ "todo", "done", "agree", "accept", "confirm", "ok", "select", "success", "yes", "correct", "ackage" ]
        }, {
            title: "far fa-box-check",
            searchTerms: [ "todo", "done", "agree", "accept", "confirm", "ok", "select", "success", "yes", "correct", "ackage" ]
        }, {
            title: "fal fa-box-check",
            searchTerms: [ "todo", "done", "agree", "accept", "confirm", "ok", "select", "success", "yes", "correct", "ackage" ]
        }, {
            title: "fas fa-box-fragile",
            searchTerms: [ "package" ]
        }, {
            title: "far fa-box-fragile",
            searchTerms: [ "package" ]
        }, {
            title: "fal fa-box-fragile",
            searchTerms: [ "package" ]
        }, {
            title: "fas fa-box-full",
            searchTerms: [ "package", "packed" ]
        }, {
            title: "far fa-box-full",
            searchTerms: [ "package", "packed" ]
        }, {
            title: "fal fa-box-full",
            searchTerms: [ "package", "packed" ]
        }, {
            title: "fas fa-box-heart",
            searchTerms: [ "care", "package" ]
        }, {
            title: "far fa-box-heart",
            searchTerms: [ "care", "package" ]
        }, {
            title: "fal fa-box-heart",
            searchTerms: [ "care", "package" ]
        }, {
            title: "fas fa-box-open",
            searchTerms: []
        }, {
            title: "far fa-box-open",
            searchTerms: []
        }, {
            title: "fal fa-box-open",
            searchTerms: []
        }, {
            title: "fas fa-box-up",
            searchTerms: []
        }, {
            title: "far fa-box-up",
            searchTerms: []
        }, {
            title: "fal fa-box-up",
            searchTerms: []
        }, {
            title: "fas fa-box-usd",
            searchTerms: [ "dollar-sign" ]
        }, {
            title: "far fa-box-usd",
            searchTerms: [ "dollar-sign" ]
        }, {
            title: "fal fa-box-usd",
            searchTerms: [ "dollar-sign" ]
        }, {
            title: "fas fa-boxes",
            searchTerms: []
        }, {
            title: "far fa-boxes",
            searchTerms: []
        }, {
            title: "fal fa-boxes",
            searchTerms: []
        }, {
            title: "fas fa-boxes-alt",
            searchTerms: []
        }, {
            title: "far fa-boxes-alt",
            searchTerms: []
        }, {
            title: "fal fa-boxes-alt",
            searchTerms: []
        }, {
            title: "fas fa-boxing-glove",
            searchTerms: []
        }, {
            title: "far fa-boxing-glove",
            searchTerms: []
        }, {
            title: "fal fa-boxing-glove",
            searchTerms: []
        }, {
            title: "fas fa-braille",
            searchTerms: []
        }, {
            title: "far fa-braille",
            searchTerms: []
        }, {
            title: "fal fa-braille",
            searchTerms: []
        }, {
            title: "fas fa-briefcase",
            searchTerms: [ "work", "business", "office", "luggage", "bag" ]
        }, {
            title: "far fa-briefcase",
            searchTerms: [ "work", "business", "office", "luggage", "bag" ]
        }, {
            title: "fal fa-briefcase",
            searchTerms: [ "work", "business", "office", "luggage", "bag" ]
        }, {
            title: "fas fa-briefcase-medical",
            searchTerms: [ "health briefcase" ]
        }, {
            title: "far fa-briefcase-medical",
            searchTerms: [ "health briefcase" ]
        }, {
            title: "fal fa-briefcase-medical",
            searchTerms: [ "health briefcase" ]
        }, {
            title: "fas fa-browser",
            searchTerms: [ "website" ]
        }, {
            title: "far fa-browser",
            searchTerms: [ "website" ]
        }, {
            title: "fal fa-browser",
            searchTerms: [ "website" ]
        }, {
            title: "fab fa-btc",
            searchTerms: []
        }, {
            title: "fas fa-bug",
            searchTerms: [ "report", "insect" ]
        }, {
            title: "far fa-bug",
            searchTerms: [ "report", "insect" ]
        }, {
            title: "fal fa-bug",
            searchTerms: [ "report", "insect" ]
        }, {
            title: "fas fa-building",
            searchTerms: [ "work", "business", "apartment", "office", "company" ]
        }, {
            title: "far fa-building",
            searchTerms: [ "work", "business", "apartment", "office", "company" ]
        }, {
            title: "fal fa-building",
            searchTerms: [ "work", "business", "apartment", "office", "company" ]
        }, {
            title: "fas fa-bullhorn",
            searchTerms: [ "announcement", "share", "broadcast", "louder", "megaphone" ]
        }, {
            title: "far fa-bullhorn",
            searchTerms: [ "announcement", "share", "broadcast", "louder", "megaphone" ]
        }, {
            title: "fal fa-bullhorn",
            searchTerms: [ "announcement", "share", "broadcast", "louder", "megaphone" ]
        }, {
            title: "fas fa-bullseye",
            searchTerms: [ "target" ]
        }, {
            title: "far fa-bullseye",
            searchTerms: [ "target" ]
        }, {
            title: "fal fa-bullseye",
            searchTerms: [ "target" ]
        }, {
            title: "fas fa-burn",
            searchTerms: [ "energy" ]
        }, {
            title: "far fa-burn",
            searchTerms: [ "energy" ]
        }, {
            title: "fal fa-burn",
            searchTerms: [ "energy" ]
        }, {
            title: "fab fa-buromobelexperte",
            searchTerms: []
        }, {
            title: "fas fa-bus",
            searchTerms: [ "vehicle", "machine", "public transportation", "transportation" ]
        }, {
            title: "far fa-bus",
            searchTerms: [ "vehicle", "machine", "public transportation", "transportation" ]
        }, {
            title: "fal fa-bus",
            searchTerms: [ "vehicle", "machine", "public transportation", "transportation" ]
        }, {
            title: "fab fa-buysellads",
            searchTerms: []
        }, {
            title: "fas fa-calculator",
            searchTerms: []
        }, {
            title: "far fa-calculator",
            searchTerms: []
        }, {
            title: "fal fa-calculator",
            searchTerms: []
        }, {
            title: "fas fa-calendar",
            searchTerms: [ "date", "time", "when", "event", "calendar-o", "schedule" ]
        }, {
            title: "far fa-calendar",
            searchTerms: [ "date", "time", "when", "event", "calendar-o", "schedule" ]
        }, {
            title: "fal fa-calendar",
            searchTerms: [ "date", "time", "when", "event", "calendar-o", "schedule" ]
        }, {
            title: "fas fa-calendar-alt",
            searchTerms: [ "date", "time", "when", "event", "calendar", "schedule" ]
        }, {
            title: "far fa-calendar-alt",
            searchTerms: [ "date", "time", "when", "event", "calendar", "schedule" ]
        }, {
            title: "fal fa-calendar-alt",
            searchTerms: [ "date", "time", "when", "event", "calendar", "schedule" ]
        }, {
            title: "fas fa-calendar-check",
            searchTerms: [ "todo", "done", "agree", "accept", "confirm", "ok", "select", "success", "appointment", "correct" ]
        }, {
            title: "far fa-calendar-check",
            searchTerms: [ "todo", "done", "agree", "accept", "confirm", "ok", "select", "success", "appointment", "correct" ]
        }, {
            title: "fal fa-calendar-check",
            searchTerms: [ "todo", "done", "agree", "accept", "confirm", "ok", "select", "success", "appointment", "correct" ]
        }, {
            title: "fas fa-calendar-edit",
            searchTerms: []
        }, {
            title: "far fa-calendar-edit",
            searchTerms: []
        }, {
            title: "fal fa-calendar-edit",
            searchTerms: []
        }, {
            title: "fas fa-calendar-exclamation",
            searchTerms: []
        }, {
            title: "far fa-calendar-exclamation",
            searchTerms: []
        }, {
            title: "fal fa-calendar-exclamation",
            searchTerms: []
        }, {
            title: "fas fa-calendar-minus",
            searchTerms: []
        }, {
            title: "far fa-calendar-minus",
            searchTerms: []
        }, {
            title: "fal fa-calendar-minus",
            searchTerms: []
        }, {
            title: "fas fa-calendar-plus",
            searchTerms: []
        }, {
            title: "far fa-calendar-plus",
            searchTerms: []
        }, {
            title: "fal fa-calendar-plus",
            searchTerms: []
        }, {
            title: "fas fa-calendar-times",
            searchTerms: []
        }, {
            title: "far fa-calendar-times",
            searchTerms: []
        }, {
            title: "fal fa-calendar-times",
            searchTerms: []
        }, {
            title: "fas fa-camera",
            searchTerms: [ "photo", "picture", "record" ]
        }, {
            title: "far fa-camera",
            searchTerms: [ "photo", "picture", "record" ]
        }, {
            title: "fal fa-camera",
            searchTerms: [ "photo", "picture", "record" ]
        }, {
            title: "fas fa-camera-alt",
            searchTerms: [ "photo", "picture", "record" ]
        }, {
            title: "far fa-camera-alt",
            searchTerms: [ "photo", "picture", "record" ]
        }, {
            title: "fal fa-camera-alt",
            searchTerms: [ "photo", "picture", "record" ]
        }, {
            title: "fas fa-camera-retro",
            searchTerms: [ "photo", "picture", "record" ]
        }, {
            title: "far fa-camera-retro",
            searchTerms: [ "photo", "picture", "record" ]
        }, {
            title: "fal fa-camera-retro",
            searchTerms: [ "photo", "picture", "record" ]
        }, {
            title: "fas fa-capsules",
            searchTerms: [ "medicine", "drugs" ]
        }, {
            title: "far fa-capsules",
            searchTerms: [ "medicine", "drugs" ]
        }, {
            title: "fal fa-capsules",
            searchTerms: [ "medicine", "drugs" ]
        }, {
            title: "fas fa-car",
            searchTerms: [ "vehicle", "machine", "transportation" ]
        }, {
            title: "far fa-car",
            searchTerms: [ "vehicle", "machine", "transportation" ]
        }, {
            title: "fal fa-car",
            searchTerms: [ "vehicle", "machine", "transportation" ]
        }, {
            title: "fas fa-caret-circle-down",
            searchTerms: [ "more", "dropdown", "menu" ]
        }, {
            title: "far fa-caret-circle-down",
            searchTerms: [ "more", "dropdown", "menu" ]
        }, {
            title: "fal fa-caret-circle-down",
            searchTerms: [ "more", "dropdown", "menu" ]
        }, {
            title: "fas fa-caret-circle-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "far fa-caret-circle-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "fal fa-caret-circle-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "fas fa-caret-circle-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "far fa-caret-circle-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "fal fa-caret-circle-right",
            searchTerms: [ "next", "forward" ]
        }, {
            title: "fas fa-caret-circle-up",
            searchTerms: []
        }, {
            title: "far fa-caret-circle-up",
            searchTerms: []
        }, {
            title: "fal fa-caret-circle-up",
            searchTerms: []
        }, {
            title: "fas fa-caret-down",
            searchTerms: [ "more", "dropdown", "menu", "triangle down", "arrow" ]
        }, {
            title: "far fa-caret-down",
            searchTerms: [ "more", "dropdown", "menu", "triangle down", "arrow" ]
        }, {
            title: "fal fa-caret-down",
            searchTerms: [ "more", "dropdown", "menu", "triangle down", "arrow" ]
        }, {
            title: "fas fa-caret-left",
            searchTerms: [ "previous", "back", "triangle left", "arrow" ]
        }, {
            title: "far fa-caret-left",
            searchTerms: [ "previous", "back", "triangle left", "arrow" ]
        }, {
            title: "fal fa-caret-left",
            searchTerms: [ "previous", "back", "triangle left", "arrow" ]
        }, {
            title: "fas fa-caret-right",
            searchTerms: [ "next", "forward", "triangle right", "arrow" ]
        }, {
            title: "far fa-caret-right",
            searchTerms: [ "next", "forward", "triangle right", "arrow" ]
        }, {
            title: "fal fa-caret-right",
            searchTerms: [ "next", "forward", "triangle right", "arrow" ]
        }, {
            title: "fas fa-caret-square-down",
            searchTerms: [ "more", "dropdown", "menu", "caret-square-o-down" ]
        }, {
            title: "far fa-caret-square-down",
            searchTerms: [ "more", "dropdown", "menu", "caret-square-o-down" ]
        }, {
            title: "fal fa-caret-square-down",
            searchTerms: [ "more", "dropdown", "menu", "caret-square-o-down" ]
        }, {
            title: "fas fa-caret-square-left",
            searchTerms: [ "previous", "back", "caret-square-o-left" ]
        }, {
            title: "far fa-caret-square-left",
            searchTerms: [ "previous", "back", "caret-square-o-left" ]
        }, {
            title: "fal fa-caret-square-left",
            searchTerms: [ "previous", "back", "caret-square-o-left" ]
        }, {
            title: "fas fa-caret-square-right",
            searchTerms: [ "next", "forward", "caret-square-o-right" ]
        }, {
            title: "far fa-caret-square-right",
            searchTerms: [ "next", "forward", "caret-square-o-right" ]
        }, {
            title: "fal fa-caret-square-right",
            searchTerms: [ "next", "forward", "caret-square-o-right" ]
        }, {
            title: "fas fa-caret-square-up",
            searchTerms: [ "caret-square-o-up" ]
        }, {
            title: "far fa-caret-square-up",
            searchTerms: [ "caret-square-o-up" ]
        }, {
            title: "fal fa-caret-square-up",
            searchTerms: [ "caret-square-o-up" ]
        }, {
            title: "fas fa-caret-up",
            searchTerms: [ "triangle up", "arrow" ]
        }, {
            title: "far fa-caret-up",
            searchTerms: [ "triangle up", "arrow" ]
        }, {
            title: "fal fa-caret-up",
            searchTerms: [ "triangle up", "arrow" ]
        }, {
            title: "fas fa-cart-arrow-down",
            searchTerms: [ "shopping" ]
        }, {
            title: "far fa-cart-arrow-down",
            searchTerms: [ "shopping" ]
        }, {
            title: "fal fa-cart-arrow-down",
            searchTerms: [ "shopping" ]
        }, {
            title: "fas fa-cart-plus",
            searchTerms: [ "add", "shopping" ]
        }, {
            title: "far fa-cart-plus",
            searchTerms: [ "add", "shopping" ]
        }, {
            title: "fal fa-cart-plus",
            searchTerms: [ "add", "shopping" ]
        }, {
            title: "fab fa-cc-amazon-pay",
            searchTerms: []
        }, {
            title: "fab fa-cc-amex",
            searchTerms: [ "amex" ]
        }, {
            title: "fab fa-cc-apple-pay",
            searchTerms: []
        }, {
            title: "fab fa-cc-diners-club",
            searchTerms: []
        }, {
            title: "fab fa-cc-discover",
            searchTerms: []
        }, {
            title: "fab fa-cc-jcb",
            searchTerms: []
        }, {
            title: "fab fa-cc-mastercard",
            searchTerms: []
        }, {
            title: "fab fa-cc-paypal",
            searchTerms: []
        }, {
            title: "fab fa-cc-stripe",
            searchTerms: []
        }, {
            title: "fab fa-cc-visa",
            searchTerms: []
        }, {
            title: "fab fa-centercode",
            searchTerms: []
        }, {
            title: "fas fa-certificate",
            searchTerms: [ "badge", "star" ]
        }, {
            title: "far fa-certificate",
            searchTerms: [ "badge", "star" ]
        }, {
            title: "fal fa-certificate",
            searchTerms: [ "badge", "star" ]
        }, {
            title: "fas fa-chart-area",
            searchTerms: [ "graph", "analytics", "area-chart" ]
        }, {
            title: "far fa-chart-area",
            searchTerms: [ "graph", "analytics", "area-chart" ]
        }, {
            title: "fal fa-chart-area",
            searchTerms: [ "graph", "analytics", "area-chart" ]
        }, {
            title: "fas fa-chart-bar",
            searchTerms: [ "graph", "analytics", "bar-chart" ]
        }, {
            title: "far fa-chart-bar",
            searchTerms: [ "graph", "analytics", "bar-chart" ]
        }, {
            title: "fal fa-chart-bar",
            searchTerms: [ "graph", "analytics", "bar-chart" ]
        }, {
            title: "fas fa-chart-line",
            searchTerms: [ "graph", "analytics", "line-chart", "dashboard" ]
        }, {
            title: "far fa-chart-line",
            searchTerms: [ "graph", "analytics", "line-chart", "dashboard" ]
        }, {
            title: "fal fa-chart-line",
            searchTerms: [ "graph", "analytics", "line-chart", "dashboard" ]
        }, {
            title: "fas fa-chart-pie",
            searchTerms: [ "graph", "analytics", "pie-chart" ]
        }, {
            title: "far fa-chart-pie",
            searchTerms: [ "graph", "analytics", "pie-chart" ]
        }, {
            title: "fal fa-chart-pie",
            searchTerms: [ "graph", "analytics", "pie-chart" ]
        }, {
            title: "fas fa-check",
            searchTerms: [ "checkmark", "done", "todo", "agree", "accept", "confirm", "tick", "ok", "select", "success", "notification", "notify", "notice", "yes", "correct" ]
        }, {
            title: "far fa-check",
            searchTerms: [ "checkmark", "done", "todo", "agree", "accept", "confirm", "tick", "ok", "select", "success", "notification", "notify", "notice", "yes", "correct" ]
        }, {
            title: "fal fa-check",
            searchTerms: [ "checkmark", "done", "todo", "agree", "accept", "confirm", "tick", "ok", "select", "success", "notification", "notify", "notice", "yes", "correct" ]
        }, {
            title: "fas fa-check-circle",
            searchTerms: [ "todo", "done", "agree", "accept", "confirm", "ok", "select", "success", "yes", "correct" ]
        }, {
            title: "far fa-check-circle",
            searchTerms: [ "todo", "done", "agree", "accept", "confirm", "ok", "select", "success", "yes", "correct" ]
        }, {
            title: "fal fa-check-circle",
            searchTerms: [ "todo", "done", "agree", "accept", "confirm", "ok", "select", "success", "yes", "correct" ]
        }, {
            title: "fas fa-check-square",
            searchTerms: [ "checkmark", "done", "todo", "agree", "accept", "confirm", "ok", "select", "success", "yes", "correct" ]
        }, {
            title: "far fa-check-square",
            searchTerms: [ "checkmark", "done", "todo", "agree", "accept", "confirm", "ok", "select", "success", "yes", "correct" ]
        }, {
            title: "fal fa-check-square",
            searchTerms: [ "checkmark", "done", "todo", "agree", "accept", "confirm", "ok", "select", "success", "yes", "correct" ]
        }, {
            title: "fas fa-chess",
            searchTerms: []
        }, {
            title: "far fa-chess",
            searchTerms: []
        }, {
            title: "fal fa-chess",
            searchTerms: []
        }, {
            title: "fas fa-chess-bishop",
            searchTerms: []
        }, {
            title: "far fa-chess-bishop",
            searchTerms: []
        }, {
            title: "fal fa-chess-bishop",
            searchTerms: []
        }, {
            title: "fas fa-chess-bishop-alt",
            searchTerms: []
        }, {
            title: "far fa-chess-bishop-alt",
            searchTerms: []
        }, {
            title: "fal fa-chess-bishop-alt",
            searchTerms: []
        }, {
            title: "fas fa-chess-board",
            searchTerms: []
        }, {
            title: "far fa-chess-board",
            searchTerms: []
        }, {
            title: "fal fa-chess-board",
            searchTerms: []
        }, {
            title: "fas fa-chess-clock",
            searchTerms: []
        }, {
            title: "far fa-chess-clock",
            searchTerms: []
        }, {
            title: "fal fa-chess-clock",
            searchTerms: []
        }, {
            title: "fas fa-chess-clock-alt",
            searchTerms: []
        }, {
            title: "far fa-chess-clock-alt",
            searchTerms: []
        }, {
            title: "fal fa-chess-clock-alt",
            searchTerms: []
        }, {
            title: "fas fa-chess-king",
            searchTerms: []
        }, {
            title: "far fa-chess-king",
            searchTerms: []
        }, {
            title: "fal fa-chess-king",
            searchTerms: []
        }, {
            title: "fas fa-chess-king-alt",
            searchTerms: []
        }, {
            title: "far fa-chess-king-alt",
            searchTerms: []
        }, {
            title: "fal fa-chess-king-alt",
            searchTerms: []
        }, {
            title: "fas fa-chess-knight",
            searchTerms: []
        }, {
            title: "far fa-chess-knight",
            searchTerms: []
        }, {
            title: "fal fa-chess-knight",
            searchTerms: []
        }, {
            title: "fas fa-chess-knight-alt",
            searchTerms: []
        }, {
            title: "far fa-chess-knight-alt",
            searchTerms: []
        }, {
            title: "fal fa-chess-knight-alt",
            searchTerms: []
        }, {
            title: "fas fa-chess-pawn",
            searchTerms: []
        }, {
            title: "far fa-chess-pawn",
            searchTerms: []
        }, {
            title: "fal fa-chess-pawn",
            searchTerms: []
        }, {
            title: "fas fa-chess-pawn-alt",
            searchTerms: []
        }, {
            title: "far fa-chess-pawn-alt",
            searchTerms: []
        }, {
            title: "fal fa-chess-pawn-alt",
            searchTerms: []
        }, {
            title: "fas fa-chess-queen",
            searchTerms: []
        }, {
            title: "far fa-chess-queen",
            searchTerms: []
        }, {
            title: "fal fa-chess-queen",
            searchTerms: []
        }, {
            title: "fas fa-chess-queen-alt",
            searchTerms: []
        }, {
            title: "far fa-chess-queen-alt",
            searchTerms: []
        }, {
            title: "fal fa-chess-queen-alt",
            searchTerms: []
        }, {
            title: "fas fa-chess-rook",
            searchTerms: []
        }, {
            title: "far fa-chess-rook",
            searchTerms: []
        }, {
            title: "fal fa-chess-rook",
            searchTerms: []
        }, {
            title: "fas fa-chess-rook-alt",
            searchTerms: []
        }, {
            title: "far fa-chess-rook-alt",
            searchTerms: []
        }, {
            title: "fal fa-chess-rook-alt",
            searchTerms: []
        }, {
            title: "fas fa-chevron-circle-down",
            searchTerms: [ "more", "dropdown", "menu", "arrow" ]
        }, {
            title: "far fa-chevron-circle-down",
            searchTerms: [ "more", "dropdown", "menu", "arrow" ]
        }, {
            title: "fal fa-chevron-circle-down",
            searchTerms: [ "more", "dropdown", "menu", "arrow" ]
        }, {
            title: "fas fa-chevron-circle-left",
            searchTerms: [ "previous", "back", "arrow" ]
        }, {
            title: "far fa-chevron-circle-left",
            searchTerms: [ "previous", "back", "arrow" ]
        }, {
            title: "fal fa-chevron-circle-left",
            searchTerms: [ "previous", "back", "arrow" ]
        }, {
            title: "fas fa-chevron-circle-right",
            searchTerms: [ "next", "forward", "arrow" ]
        }, {
            title: "far fa-chevron-circle-right",
            searchTerms: [ "next", "forward", "arrow" ]
        }, {
            title: "fal fa-chevron-circle-right",
            searchTerms: [ "next", "forward", "arrow" ]
        }, {
            title: "fas fa-chevron-circle-up",
            searchTerms: [ "arrow" ]
        }, {
            title: "far fa-chevron-circle-up",
            searchTerms: [ "arrow" ]
        }, {
            title: "fal fa-chevron-circle-up",
            searchTerms: [ "arrow" ]
        }, {
            title: "fas fa-chevron-double-down",
            searchTerms: []
        }, {
            title: "far fa-chevron-double-down",
            searchTerms: []
        }, {
            title: "fal fa-chevron-double-down",
            searchTerms: []
        }, {
            title: "fas fa-chevron-double-left",
            searchTerms: [ "bracket", "previous", "back" ]
        }, {
            title: "far fa-chevron-double-left",
            searchTerms: [ "bracket", "previous", "back" ]
        }, {
            title: "fal fa-chevron-double-left",
            searchTerms: [ "bracket", "previous", "back" ]
        }, {
            title: "fas fa-chevron-double-right",
            searchTerms: [ "bracket", "next", "forward" ]
        }, {
            title: "far fa-chevron-double-right",
            searchTerms: [ "bracket", "next", "forward" ]
        }, {
            title: "fal fa-chevron-double-right",
            searchTerms: [ "bracket", "next", "forward" ]
        }, {
            title: "fas fa-chevron-double-up",
            searchTerms: []
        }, {
            title: "far fa-chevron-double-up",
            searchTerms: []
        }, {
            title: "fal fa-chevron-double-up",
            searchTerms: []
        }, {
            title: "fas fa-chevron-down",
            searchTerms: []
        }, {
            title: "far fa-chevron-down",
            searchTerms: []
        }, {
            title: "fal fa-chevron-down",
            searchTerms: []
        }, {
            title: "fas fa-chevron-left",
            searchTerms: [ "bracket", "previous", "back" ]
        }, {
            title: "far fa-chevron-left",
            searchTerms: [ "bracket", "previous", "back" ]
        }, {
            title: "fal fa-chevron-left",
            searchTerms: [ "bracket", "previous", "back" ]
        }, {
            title: "fas fa-chevron-right",
            searchTerms: [ "bracket", "next", "forward" ]
        }, {
            title: "far fa-chevron-right",
            searchTerms: [ "bracket", "next", "forward" ]
        }, {
            title: "fal fa-chevron-right",
            searchTerms: [ "bracket", "next", "forward" ]
        }, {
            title: "fas fa-chevron-square-down",
            searchTerms: [ "more", "dropdown", "menu", "arrow" ]
        }, {
            title: "far fa-chevron-square-down",
            searchTerms: [ "more", "dropdown", "menu", "arrow" ]
        }, {
            title: "fal fa-chevron-square-down",
            searchTerms: [ "more", "dropdown", "menu", "arrow" ]
        }, {
            title: "fas fa-chevron-square-left",
            searchTerms: [ "previous", "back", "arrow" ]
        }, {
            title: "far fa-chevron-square-left",
            searchTerms: [ "previous", "back", "arrow" ]
        }, {
            title: "fal fa-chevron-square-left",
            searchTerms: [ "previous", "back", "arrow" ]
        }, {
            title: "fas fa-chevron-square-right",
            searchTerms: [ "next", "forward", "arrow" ]
        }, {
            title: "far fa-chevron-square-right",
            searchTerms: [ "next", "forward", "arrow" ]
        }, {
            title: "fal fa-chevron-square-right",
            searchTerms: [ "next", "forward", "arrow" ]
        }, {
            title: "fas fa-chevron-square-up",
            searchTerms: [ "arrow" ]
        }, {
            title: "far fa-chevron-square-up",
            searchTerms: [ "arrow" ]
        }, {
            title: "fal fa-chevron-square-up",
            searchTerms: [ "arrow" ]
        }, {
            title: "fas fa-chevron-up",
            searchTerms: []
        }, {
            title: "far fa-chevron-up",
            searchTerms: []
        }, {
            title: "fal fa-chevron-up",
            searchTerms: []
        }, {
            title: "fas fa-child",
            searchTerms: []
        }, {
            title: "far fa-child",
            searchTerms: []
        }, {
            title: "fal fa-child",
            searchTerms: []
        }, {
            title: "fab fa-chrome",
            searchTerms: [ "browser" ]
        }, {
            title: "fas fa-circle",
            searchTerms: [ "dot", "notification", "circle-thin" ]
        }, {
            title: "far fa-circle",
            searchTerms: [ "dot", "notification", "circle-thin" ]
        }, {
            title: "fal fa-circle",
            searchTerms: [ "dot", "notification", "circle-thin" ]
        }, {
            title: "fas fa-circle-notch",
            searchTerms: [ "circle-o-notch" ]
        }, {
            title: "far fa-circle-notch",
            searchTerms: [ "circle-o-notch" ]
        }, {
            title: "fal fa-circle-notch",
            searchTerms: [ "circle-o-notch" ]
        }, {
            title: "fas fa-clipboard",
            searchTerms: [ "paste" ]
        }, {
            title: "far fa-clipboard",
            searchTerms: [ "paste" ]
        }, {
            title: "fal fa-clipboard",
            searchTerms: [ "paste" ]
        }, {
            title: "fas fa-clipboard-check",
            searchTerms: [ "todo", "done", "agree", "accept", "confirm", "ok", "select", "success", "yes" ]
        }, {
            title: "far fa-clipboard-check",
            searchTerms: [ "todo", "done", "agree", "accept", "confirm", "ok", "select", "success", "yes" ]
        }, {
            title: "fal fa-clipboard-check",
            searchTerms: [ "todo", "done", "agree", "accept", "confirm", "ok", "select", "success", "yes" ]
        }, {
            title: "fas fa-clipboard-list",
            searchTerms: [ "todo", "ul", "ol", "checklist", "finished", "completed", "done", "schedule", "intinerary" ]
        }, {
            title: "far fa-clipboard-list",
            searchTerms: [ "todo", "ul", "ol", "checklist", "finished", "completed", "done", "schedule", "intinerary" ]
        }, {
            title: "fal fa-clipboard-list",
            searchTerms: [ "todo", "ul", "ol", "checklist", "finished", "completed", "done", "schedule", "intinerary" ]
        }, {
            title: "fas fa-clock",
            searchTerms: [ "watch", "timer", "late", "timestamp", "date", "schedule" ]
        }, {
            title: "far fa-clock",
            searchTerms: [ "watch", "timer", "late", "timestamp", "date", "schedule" ]
        }, {
            title: "fal fa-clock",
            searchTerms: [ "watch", "timer", "late", "timestamp", "date", "schedule" ]
        }, {
            title: "fas fa-clone",
            searchTerms: [ "copy" ]
        }, {
            title: "far fa-clone",
            searchTerms: [ "copy" ]
        }, {
            title: "fal fa-clone",
            searchTerms: [ "copy" ]
        }, {
            title: "fas fa-closed-captioning",
            searchTerms: [ "cc" ]
        }, {
            title: "far fa-closed-captioning",
            searchTerms: [ "cc" ]
        }, {
            title: "fal fa-closed-captioning",
            searchTerms: [ "cc" ]
        }, {
            title: "fas fa-cloud",
            searchTerms: [ "save" ]
        }, {
            title: "far fa-cloud",
            searchTerms: [ "save" ]
        }, {
            title: "fal fa-cloud",
            searchTerms: [ "save" ]
        }, {
            title: "fas fa-cloud-download",
            searchTerms: [ "import" ]
        }, {
            title: "far fa-cloud-download",
            searchTerms: [ "import" ]
        }, {
            title: "fal fa-cloud-download",
            searchTerms: [ "import" ]
        }, {
            title: "fas fa-cloud-download-alt",
            searchTerms: [ "cloud-download" ]
        }, {
            title: "far fa-cloud-download-alt",
            searchTerms: [ "cloud-download" ]
        }, {
            title: "fal fa-cloud-download-alt",
            searchTerms: [ "cloud-download" ]
        }, {
            title: "fas fa-cloud-upload",
            searchTerms: [ "import" ]
        }, {
            title: "far fa-cloud-upload",
            searchTerms: [ "import" ]
        }, {
            title: "fal fa-cloud-upload",
            searchTerms: [ "import" ]
        }, {
            title: "fas fa-cloud-upload-alt",
            searchTerms: [ "cloud-upload" ]
        }, {
            title: "far fa-cloud-upload-alt",
            searchTerms: [ "cloud-upload" ]
        }, {
            title: "fal fa-cloud-upload-alt",
            searchTerms: [ "cloud-upload" ]
        }, {
            title: "fab fa-cloudscale",
            searchTerms: []
        }, {
            title: "fab fa-cloudsmith",
            searchTerms: []
        }, {
            title: "fab fa-cloudversify",
            searchTerms: []
        }, {
            title: "fas fa-club",
            searchTerms: [ "suit", "card" ]
        }, {
            title: "far fa-club",
            searchTerms: [ "suit", "card" ]
        }, {
            title: "fal fa-club",
            searchTerms: [ "suit", "card" ]
        }, {
            title: "fas fa-code",
            searchTerms: [ "html", "brackets" ]
        }, {
            title: "far fa-code",
            searchTerms: [ "html", "brackets" ]
        }, {
            title: "fal fa-code",
            searchTerms: [ "html", "brackets" ]
        }, {
            title: "fas fa-code-branch",
            searchTerms: [ "git", "fork", "vcs", "svn", "github", "rebase", "version", "branch", "code-fork" ]
        }, {
            title: "far fa-code-branch",
            searchTerms: [ "git", "fork", "vcs", "svn", "github", "rebase", "version", "branch", "code-fork" ]
        }, {
            title: "fal fa-code-branch",
            searchTerms: [ "git", "fork", "vcs", "svn", "github", "rebase", "version", "branch", "code-fork" ]
        }, {
            title: "fas fa-code-commit",
            searchTerms: [ "git", "vcs", "svn", "github", "rebase", "version", "commit", "hash" ]
        }, {
            title: "far fa-code-commit",
            searchTerms: [ "git", "vcs", "svn", "github", "rebase", "version", "commit", "hash" ]
        }, {
            title: "fal fa-code-commit",
            searchTerms: [ "git", "vcs", "svn", "github", "rebase", "version", "commit", "hash" ]
        }, {
            title: "fas fa-code-merge",
            searchTerms: [ "git", "vcs", "svn", "github", "rebase", "version", "merge", "pr" ]
        }, {
            title: "far fa-code-merge",
            searchTerms: [ "git", "vcs", "svn", "github", "rebase", "version", "merge", "pr" ]
        }, {
            title: "fal fa-code-merge",
            searchTerms: [ "git", "vcs", "svn", "github", "rebase", "version", "merge", "pr" ]
        }, {
            title: "fab fa-codepen",
            searchTerms: []
        }, {
            title: "fab fa-codiepie",
            searchTerms: []
        }, {
            title: "fas fa-coffee",
            searchTerms: [ "morning", "mug", "breakfast", "tea", "drink", "cafe" ]
        }, {
            title: "far fa-coffee",
            searchTerms: [ "morning", "mug", "breakfast", "tea", "drink", "cafe" ]
        }, {
            title: "fal fa-coffee",
            searchTerms: [ "morning", "mug", "breakfast", "tea", "drink", "cafe" ]
        }, {
            title: "fas fa-cog",
            searchTerms: [ "settings" ]
        }, {
            title: "far fa-cog",
            searchTerms: [ "settings" ]
        }, {
            title: "fal fa-cog",
            searchTerms: [ "settings" ]
        }, {
            title: "fas fa-cogs",
            searchTerms: [ "settings", "gears" ]
        }, {
            title: "far fa-cogs",
            searchTerms: [ "settings", "gears" ]
        }, {
            title: "fal fa-cogs",
            searchTerms: [ "settings", "gears" ]
        }, {
            title: "fas fa-columns",
            searchTerms: [ "split", "panes", "dashboard" ]
        }, {
            title: "far fa-columns",
            searchTerms: [ "split", "panes", "dashboard" ]
        }, {
            title: "fal fa-columns",
            searchTerms: [ "split", "panes", "dashboard" ]
        }, {
            title: "fas fa-comment",
            searchTerms: [ "speech", "notification", "note", "chat", "bubble", "feedback", "message", "texting", "sms", "conversation" ]
        }, {
            title: "far fa-comment",
            searchTerms: [ "speech", "notification", "note", "chat", "bubble", "feedback", "message", "texting", "sms", "conversation" ]
        }, {
            title: "fal fa-comment",
            searchTerms: [ "speech", "notification", "note", "chat", "bubble", "feedback", "message", "texting", "sms", "conversation" ]
        }, {
            title: "fas fa-comment-alt",
            searchTerms: [ "speech", "notification", "note", "chat", "bubble", "feedback", "message", "texting", "sms", "conversation", "commenting", "commenting" ]
        }, {
            title: "far fa-comment-alt",
            searchTerms: [ "speech", "notification", "note", "chat", "bubble", "feedback", "message", "texting", "sms", "conversation", "commenting", "commenting" ]
        }, {
            title: "fal fa-comment-alt",
            searchTerms: [ "speech", "notification", "note", "chat", "bubble", "feedback", "message", "texting", "sms", "conversation", "commenting", "commenting" ]
        }, {
            title: "fas fa-comment-alt-check",
            searchTerms: []
        }, {
            title: "far fa-comment-alt-check",
            searchTerms: []
        }, {
            title: "fal fa-comment-alt-check",
            searchTerms: []
        }, {
            title: "fas fa-comment-alt-dots",
            searchTerms: []
        }, {
            title: "far fa-comment-alt-dots",
            searchTerms: []
        }, {
            title: "fal fa-comment-alt-dots",
            searchTerms: []
        }, {
            title: "fas fa-comment-alt-edit",
            searchTerms: []
        }, {
            title: "far fa-comment-alt-edit",
            searchTerms: []
        }, {
            title: "fal fa-comment-alt-edit",
            searchTerms: []
        }, {
            title: "fas fa-comment-alt-exclamation",
            searchTerms: []
        }, {
            title: "far fa-comment-alt-exclamation",
            searchTerms: []
        }, {
            title: "fal fa-comment-alt-exclamation",
            searchTerms: []
        }, {
            title: "fas fa-comment-alt-lines",
            searchTerms: []
        }, {
            title: "far fa-comment-alt-lines",
            searchTerms: []
        }, {
            title: "fal fa-comment-alt-lines",
            searchTerms: []
        }, {
            title: "fas fa-comment-alt-minus",
            searchTerms: []
        }, {
            title: "far fa-comment-alt-minus",
            searchTerms: []
        }, {
            title: "fal fa-comment-alt-minus",
            searchTerms: []
        }, {
            title: "fas fa-comment-alt-plus",
            searchTerms: []
        }, {
            title: "far fa-comment-alt-plus",
            searchTerms: []
        }, {
            title: "fal fa-comment-alt-plus",
            searchTerms: []
        }, {
            title: "fas fa-comment-alt-slash",
            searchTerms: []
        }, {
            title: "far fa-comment-alt-slash",
            searchTerms: []
        }, {
            title: "fal fa-comment-alt-slash",
            searchTerms: []
        }, {
            title: "fas fa-comment-alt-smile",
            searchTerms: []
        }, {
            title: "far fa-comment-alt-smile",
            searchTerms: []
        }, {
            title: "fal fa-comment-alt-smile",
            searchTerms: []
        }, {
            title: "fas fa-comment-alt-times",
            searchTerms: []
        }, {
            title: "far fa-comment-alt-times",
            searchTerms: []
        }, {
            title: "fal fa-comment-alt-times",
            searchTerms: []
        }, {
            title: "fas fa-comment-check",
            searchTerms: []
        }, {
            title: "far fa-comment-check",
            searchTerms: []
        }, {
            title: "fal fa-comment-check",
            searchTerms: []
        }, {
            title: "fas fa-comment-dots",
            searchTerms: []
        }, {
            title: "far fa-comment-dots",
            searchTerms: []
        }, {
            title: "fal fa-comment-dots",
            searchTerms: []
        }, {
            title: "fas fa-comment-edit",
            searchTerms: []
        }, {
            title: "far fa-comment-edit",
            searchTerms: []
        }, {
            title: "fal fa-comment-edit",
            searchTerms: []
        }, {
            title: "fas fa-comment-exclamation",
            searchTerms: []
        }, {
            title: "far fa-comment-exclamation",
            searchTerms: []
        }, {
            title: "fal fa-comment-exclamation",
            searchTerms: []
        }, {
            title: "fas fa-comment-lines",
            searchTerms: []
        }, {
            title: "far fa-comment-lines",
            searchTerms: []
        }, {
            title: "fal fa-comment-lines",
            searchTerms: []
        }, {
            title: "fas fa-comment-minus",
            searchTerms: []
        }, {
            title: "far fa-comment-minus",
            searchTerms: []
        }, {
            title: "fal fa-comment-minus",
            searchTerms: []
        }, {
            title: "fas fa-comment-plus",
            searchTerms: []
        }, {
            title: "far fa-comment-plus",
            searchTerms: []
        }, {
            title: "fal fa-comment-plus",
            searchTerms: []
        }, {
            title: "fas fa-comment-slash",
            searchTerms: []
        }, {
            title: "far fa-comment-slash",
            searchTerms: []
        }, {
            title: "fal fa-comment-slash",
            searchTerms: []
        }, {
            title: "fas fa-comment-smile",
            searchTerms: []
        }, {
            title: "far fa-comment-smile",
            searchTerms: []
        }, {
            title: "fal fa-comment-smile",
            searchTerms: []
        }, {
            title: "fas fa-comment-times",
            searchTerms: []
        }, {
            title: "far fa-comment-times",
            searchTerms: []
        }, {
            title: "fal fa-comment-times",
            searchTerms: []
        }, {
            title: "fas fa-comments",
            searchTerms: [ "speech", "notification", "note", "chat", "bubble", "feedback", "message", "texting", "sms", "conversation" ]
        }, {
            title: "far fa-comments",
            searchTerms: [ "speech", "notification", "note", "chat", "bubble", "feedback", "message", "texting", "sms", "conversation" ]
        }, {
            title: "fal fa-comments",
            searchTerms: [ "speech", "notification", "note", "chat", "bubble", "feedback", "message", "texting", "sms", "conversation" ]
        }, {
            title: "fas fa-comments-alt",
            searchTerms: []
        }, {
            title: "far fa-comments-alt",
            searchTerms: []
        }, {
            title: "fal fa-comments-alt",
            searchTerms: []
        }, {
            title: "fas fa-compass",
            searchTerms: [ "safari", "directory", "menu", "location" ]
        }, {
            title: "far fa-compass",
            searchTerms: [ "safari", "directory", "menu", "location" ]
        }, {
            title: "fal fa-compass",
            searchTerms: [ "safari", "directory", "menu", "location" ]
        }, {
            title: "fas fa-compress",
            searchTerms: [ "collapse", "combine", "contract", "merge", "smaller" ]
        }, {
            title: "far fa-compress",
            searchTerms: [ "collapse", "combine", "contract", "merge", "smaller" ]
        }, {
            title: "fal fa-compress",
            searchTerms: [ "collapse", "combine", "contract", "merge", "smaller" ]
        }, {
            title: "fas fa-compress-alt",
            searchTerms: [ "collapse", "combine", "contract", "merge", "smaller" ]
        }, {
            title: "far fa-compress-alt",
            searchTerms: [ "collapse", "combine", "contract", "merge", "smaller" ]
        }, {
            title: "fal fa-compress-alt",
            searchTerms: [ "collapse", "combine", "contract", "merge", "smaller" ]
        }, {
            title: "fas fa-compress-wide",
            searchTerms: [ "collapse", "combine", "contract", "merge", "smaller" ]
        }, {
            title: "far fa-compress-wide",
            searchTerms: [ "collapse", "combine", "contract", "merge", "smaller" ]
        }, {
            title: "fal fa-compress-wide",
            searchTerms: [ "collapse", "combine", "contract", "merge", "smaller" ]
        }, {
            title: "fab fa-connectdevelop",
            searchTerms: []
        }, {
            title: "fas fa-container-storage",
            searchTerms: []
        }, {
            title: "far fa-container-storage",
            searchTerms: []
        }, {
            title: "fal fa-container-storage",
            searchTerms: []
        }, {
            title: "fab fa-contao",
            searchTerms: []
        }, {
            title: "fas fa-conveyor-belt",
            searchTerms: []
        }, {
            title: "far fa-conveyor-belt",
            searchTerms: []
        }, {
            title: "fal fa-conveyor-belt",
            searchTerms: []
        }, {
            title: "fas fa-conveyor-belt-alt",
            searchTerms: []
        }, {
            title: "far fa-conveyor-belt-alt",
            searchTerms: []
        }, {
            title: "fal fa-conveyor-belt-alt",
            searchTerms: []
        }, {
            title: "fas fa-copy",
            searchTerms: [ "duplicate", "clone", "file", "files-o" ]
        }, {
            title: "far fa-copy",
            searchTerms: [ "duplicate", "clone", "file", "files-o" ]
        }, {
            title: "fal fa-copy",
            searchTerms: [ "duplicate", "clone", "file", "files-o" ]
        }, {
            title: "fas fa-copyright",
            searchTerms: []
        }, {
            title: "far fa-copyright",
            searchTerms: []
        }, {
            title: "fal fa-copyright",
            searchTerms: []
        }, {
            title: "fas fa-couch",
            searchTerms: []
        }, {
            title: "far fa-couch",
            searchTerms: []
        }, {
            title: "fal fa-couch",
            searchTerms: []
        }, {
            title: "fab fa-cpanel",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons",
            searchTerms: []
        }, {
            title: "fas fa-credit-card",
            searchTerms: [ "money", "buy", "debit", "checkout", "purchase", "payment", "credit-card-alt" ]
        }, {
            title: "far fa-credit-card",
            searchTerms: [ "money", "buy", "debit", "checkout", "purchase", "payment", "credit-card-alt" ]
        }, {
            title: "fal fa-credit-card",
            searchTerms: [ "money", "buy", "debit", "checkout", "purchase", "payment", "credit-card-alt" ]
        }, {
            title: "fas fa-credit-card-blank",
            searchTerms: [ "money", "buy", "debit", "checkout", "purchase", "payment" ]
        }, {
            title: "far fa-credit-card-blank",
            searchTerms: [ "money", "buy", "debit", "checkout", "purchase", "payment" ]
        }, {
            title: "fal fa-credit-card-blank",
            searchTerms: [ "money", "buy", "debit", "checkout", "purchase", "payment" ]
        }, {
            title: "fas fa-credit-card-front",
            searchTerms: [ "money", "buy", "debit", "checkout", "purchase", "payment", "chip" ]
        }, {
            title: "far fa-credit-card-front",
            searchTerms: [ "money", "buy", "debit", "checkout", "purchase", "payment", "chip" ]
        }, {
            title: "fal fa-credit-card-front",
            searchTerms: [ "money", "buy", "debit", "checkout", "purchase", "payment", "chip" ]
        }, {
            title: "fas fa-cricket",
            searchTerms: []
        }, {
            title: "far fa-cricket",
            searchTerms: []
        }, {
            title: "fal fa-cricket",
            searchTerms: []
        }, {
            title: "fas fa-crop",
            searchTerms: [ "design" ]
        }, {
            title: "far fa-crop",
            searchTerms: [ "design" ]
        }, {
            title: "fal fa-crop",
            searchTerms: [ "design" ]
        }, {
            title: "fas fa-crosshairs",
            searchTerms: [ "picker", "gpd" ]
        }, {
            title: "far fa-crosshairs",
            searchTerms: [ "picker", "gpd" ]
        }, {
            title: "fal fa-crosshairs",
            searchTerms: [ "picker", "gpd" ]
        }, {
            title: "fab fa-css3",
            searchTerms: [ "code" ]
        }, {
            title: "fab fa-css3-alt",
            searchTerms: []
        }, {
            title: "fas fa-cube",
            searchTerms: [ "package" ]
        }, {
            title: "far fa-cube",
            searchTerms: [ "package" ]
        }, {
            title: "fal fa-cube",
            searchTerms: [ "package" ]
        }, {
            title: "fas fa-cubes",
            searchTerms: [ "packages" ]
        }, {
            title: "far fa-cubes",
            searchTerms: [ "packages" ]
        }, {
            title: "fal fa-cubes",
            searchTerms: [ "packages" ]
        }, {
            title: "fas fa-curling",
            searchTerms: []
        }, {
            title: "far fa-curling",
            searchTerms: []
        }, {
            title: "fal fa-curling",
            searchTerms: []
        }, {
            title: "fas fa-cut",
            searchTerms: [ "scissors", "scissors" ]
        }, {
            title: "far fa-cut",
            searchTerms: [ "scissors", "scissors" ]
        }, {
            title: "fal fa-cut",
            searchTerms: [ "scissors", "scissors" ]
        }, {
            title: "fab fa-cuttlefish",
            searchTerms: []
        }, {
            title: "fab fa-d-and-d",
            searchTerms: []
        }, {
            title: "fab fa-dashcube",
            searchTerms: []
        }, {
            title: "fas fa-database",
            searchTerms: []
        }, {
            title: "far fa-database",
            searchTerms: []
        }, {
            title: "fal fa-database",
            searchTerms: []
        }, {
            title: "fas fa-deaf",
            searchTerms: []
        }, {
            title: "far fa-deaf",
            searchTerms: []
        }, {
            title: "fal fa-deaf",
            searchTerms: []
        }, {
            title: "fab fa-delicious",
            searchTerms: []
        }, {
            title: "fab fa-deploydog",
            searchTerms: []
        }, {
            title: "fab fa-deskpro",
            searchTerms: []
        }, {
            title: "fas fa-desktop",
            searchTerms: [ "monitor", "screen", "desktop", "computer", "demo", "device", "pc", "machine" ]
        }, {
            title: "far fa-desktop",
            searchTerms: [ "monitor", "screen", "desktop", "computer", "demo", "device", "pc", "machine" ]
        }, {
            title: "fal fa-desktop",
            searchTerms: [ "monitor", "screen", "desktop", "computer", "demo", "device", "pc", "machine" ]
        }, {
            title: "fas fa-desktop-alt",
            searchTerms: [ "monitor", "screen", "desktop", "computer", "demo", "device", "apple", "imac", "machine" ]
        }, {
            title: "far fa-desktop-alt",
            searchTerms: [ "monitor", "screen", "desktop", "computer", "demo", "device", "apple", "imac", "machine" ]
        }, {
            title: "fal fa-desktop-alt",
            searchTerms: [ "monitor", "screen", "desktop", "computer", "demo", "device", "apple", "imac", "machine" ]
        }, {
            title: "fab fa-deviantart",
            searchTerms: []
        }, {
            title: "fas fa-diagnoses",
            searchTerms: []
        }, {
            title: "far fa-diagnoses",
            searchTerms: []
        }, {
            title: "fal fa-diagnoses",
            searchTerms: []
        }, {
            title: "fas fa-diamond",
            searchTerms: [ "gem", "gemstone" ]
        }, {
            title: "far fa-diamond",
            searchTerms: [ "gem", "gemstone" ]
        }, {
            title: "fal fa-diamond",
            searchTerms: [ "gem", "gemstone" ]
        }, {
            title: "fab fa-digg",
            searchTerms: []
        }, {
            title: "fab fa-digital-ocean",
            searchTerms: []
        }, {
            title: "fab fa-discord",
            searchTerms: []
        }, {
            title: "fab fa-discourse",
            searchTerms: []
        }, {
            title: "fas fa-dna",
            searchTerms: [ "double helix", "helix" ]
        }, {
            title: "far fa-dna",
            searchTerms: [ "double helix", "helix" ]
        }, {
            title: "fal fa-dna",
            searchTerms: [ "double helix", "helix" ]
        }, {
            title: "fab fa-dochub",
            searchTerms: []
        }, {
            title: "fab fa-docker",
            searchTerms: []
        }, {
            title: "fas fa-dollar-sign",
            searchTerms: [ "usd", "price" ]
        }, {
            title: "far fa-dollar-sign",
            searchTerms: [ "usd", "price" ]
        }, {
            title: "fal fa-dollar-sign",
            searchTerms: [ "usd", "price" ]
        }, {
            title: "fas fa-dolly",
            searchTerms: []
        }, {
            title: "far fa-dolly",
            searchTerms: []
        }, {
            title: "fal fa-dolly",
            searchTerms: []
        }, {
            title: "fas fa-dolly-empty",
            searchTerms: []
        }, {
            title: "far fa-dolly-empty",
            searchTerms: []
        }, {
            title: "fal fa-dolly-empty",
            searchTerms: []
        }, {
            title: "fas fa-dolly-flatbed",
            searchTerms: []
        }, {
            title: "far fa-dolly-flatbed",
            searchTerms: []
        }, {
            title: "fal fa-dolly-flatbed",
            searchTerms: []
        }, {
            title: "fas fa-dolly-flatbed-alt",
            searchTerms: []
        }, {
            title: "far fa-dolly-flatbed-alt",
            searchTerms: []
        }, {
            title: "fal fa-dolly-flatbed-alt",
            searchTerms: []
        }, {
            title: "fas fa-dolly-flatbed-empty",
            searchTerms: []
        }, {
            title: "far fa-dolly-flatbed-empty",
            searchTerms: []
        }, {
            title: "fal fa-dolly-flatbed-empty",
            searchTerms: []
        }, {
            title: "fas fa-donate",
            searchTerms: [ "give", "generosity" ]
        }, {
            title: "far fa-donate",
            searchTerms: [ "give", "generosity" ]
        }, {
            title: "fal fa-donate",
            searchTerms: [ "give", "generosity" ]
        }, {
            title: "fas fa-dot-circle",
            searchTerms: [ "target", "bullseye", "notification" ]
        }, {
            title: "far fa-dot-circle",
            searchTerms: [ "target", "bullseye", "notification" ]
        }, {
            title: "fal fa-dot-circle",
            searchTerms: [ "target", "bullseye", "notification" ]
        }, {
            title: "fas fa-dove",
            searchTerms: []
        }, {
            title: "far fa-dove",
            searchTerms: []
        }, {
            title: "fal fa-dove",
            searchTerms: []
        }, {
            title: "fas fa-download",
            searchTerms: [ "import" ]
        }, {
            title: "far fa-download",
            searchTerms: [ "import" ]
        }, {
            title: "fal fa-download",
            searchTerms: [ "import" ]
        }, {
            title: "fab fa-draft2digital",
            searchTerms: []
        }, {
            title: "fab fa-dribbble",
            searchTerms: []
        }, {
            title: "fab fa-dribbble-square",
            searchTerms: []
        }, {
            title: "fab fa-dropbox",
            searchTerms: []
        }, {
            title: "fab fa-drupal",
            searchTerms: []
        }, {
            title: "fas fa-dumbbell",
            searchTerms: []
        }, {
            title: "far fa-dumbbell",
            searchTerms: []
        }, {
            title: "fal fa-dumbbell",
            searchTerms: []
        }, {
            title: "fab fa-dyalog",
            searchTerms: []
        }, {
            title: "fab fa-earlybirds",
            searchTerms: []
        }, {
            title: "fab fa-edge",
            searchTerms: [ "browser", "ie" ]
        }, {
            title: "fas fa-edit",
            searchTerms: [ "write", "edit", "update", "pencil", "pen" ]
        }, {
            title: "far fa-edit",
            searchTerms: [ "write", "edit", "update", "pencil", "pen" ]
        }, {
            title: "fal fa-edit",
            searchTerms: [ "write", "edit", "update", "pencil", "pen" ]
        }, {
            title: "fas fa-eject",
            searchTerms: []
        }, {
            title: "far fa-eject",
            searchTerms: []
        }, {
            title: "fal fa-eject",
            searchTerms: []
        }, {
            title: "fab fa-elementor",
            searchTerms: []
        }, {
            title: "fas fa-ellipsis-h",
            searchTerms: [ "dots", "menu", "drag", "reorder", "settings", "list", "ul", "ol", "kebab", "navigation", "nav" ]
        }, {
            title: "far fa-ellipsis-h",
            searchTerms: [ "dots", "menu", "drag", "reorder", "settings", "list", "ul", "ol", "kebab", "navigation", "nav" ]
        }, {
            title: "fal fa-ellipsis-h",
            searchTerms: [ "dots", "menu", "drag", "reorder", "settings", "list", "ul", "ol", "kebab", "navigation", "nav" ]
        }, {
            title: "fas fa-ellipsis-h-alt",
            searchTerms: [ "dots", "menu", "drag", "reorder", "settings", "list", "ul", "ol", "kebab", "navigation", "nav" ]
        }, {
            title: "far fa-ellipsis-h-alt",
            searchTerms: [ "dots", "menu", "drag", "reorder", "settings", "list", "ul", "ol", "kebab", "navigation", "nav" ]
        }, {
            title: "fal fa-ellipsis-h-alt",
            searchTerms: [ "dots", "menu", "drag", "reorder", "settings", "list", "ul", "ol", "kebab", "navigation", "nav" ]
        }, {
            title: "fas fa-ellipsis-v",
            searchTerms: [ "dots", "menu", "drag", "reorder", "settings", "list", "ul", "ol", "kebab", "navigation", "nav" ]
        }, {
            title: "far fa-ellipsis-v",
            searchTerms: [ "dots", "menu", "drag", "reorder", "settings", "list", "ul", "ol", "kebab", "navigation", "nav" ]
        }, {
            title: "fal fa-ellipsis-v",
            searchTerms: [ "dots", "menu", "drag", "reorder", "settings", "list", "ul", "ol", "kebab", "navigation", "nav" ]
        }, {
            title: "fas fa-ellipsis-v-alt",
            searchTerms: [ "dots", "menu", "drag", "reorder", "settings", "list", "ul", "ol", "kebab", "navigation", "nav" ]
        }, {
            title: "far fa-ellipsis-v-alt",
            searchTerms: [ "dots", "menu", "drag", "reorder", "settings", "list", "ul", "ol", "kebab", "navigation", "nav" ]
        }, {
            title: "fal fa-ellipsis-v-alt",
            searchTerms: [ "dots", "menu", "drag", "reorder", "settings", "list", "ul", "ol", "kebab", "navigation", "nav" ]
        }, {
            title: "fab fa-ember",
            searchTerms: []
        }, {
            title: "fab fa-empire",
            searchTerms: []
        }, {
            title: "fas fa-envelope",
            searchTerms: [ "email", "e-mail", "letter", "support", "mail", "message", "notification" ]
        }, {
            title: "far fa-envelope",
            searchTerms: [ "email", "e-mail", "letter", "support", "mail", "message", "notification" ]
        }, {
            title: "fal fa-envelope",
            searchTerms: [ "email", "e-mail", "letter", "support", "mail", "message", "notification" ]
        }, {
            title: "fas fa-envelope-open",
            searchTerms: [ "email", "e-mail", "letter", "support", "mail", "message", "notification" ]
        }, {
            title: "far fa-envelope-open",
            searchTerms: [ "email", "e-mail", "letter", "support", "mail", "message", "notification" ]
        }, {
            title: "fal fa-envelope-open",
            searchTerms: [ "email", "e-mail", "letter", "support", "mail", "message", "notification" ]
        }, {
            title: "fas fa-envelope-square",
            searchTerms: [ "email", "e-mail", "letter", "support", "mail", "message", "notification" ]
        }, {
            title: "far fa-envelope-square",
            searchTerms: [ "email", "e-mail", "letter", "support", "mail", "message", "notification" ]
        }, {
            title: "fal fa-envelope-square",
            searchTerms: [ "email", "e-mail", "letter", "support", "mail", "message", "notification" ]
        }, {
            title: "fab fa-envira",
            searchTerms: [ "leaf" ]
        }, {
            title: "fas fa-eraser",
            searchTerms: [ "remove", "delete" ]
        }, {
            title: "far fa-eraser",
            searchTerms: [ "remove", "delete" ]
        }, {
            title: "fal fa-eraser",
            searchTerms: [ "remove", "delete" ]
        }, {
            title: "fab fa-erlang",
            searchTerms: []
        }, {
            title: "fab fa-ethereum",
            searchTerms: []
        }, {
            title: "fab fa-etsy",
            searchTerms: []
        }, {
            title: "fas fa-euro-sign",
            searchTerms: [ "eur", "eur" ]
        }, {
            title: "far fa-euro-sign",
            searchTerms: [ "eur", "eur" ]
        }, {
            title: "fal fa-euro-sign",
            searchTerms: [ "eur", "eur" ]
        }, {
            title: "fas fa-exchange",
            searchTerms: [ "transfer", "arrows", "arrow", "swap", "return", "reciprocate" ]
        }, {
            title: "far fa-exchange",
            searchTerms: [ "transfer", "arrows", "arrow", "swap", "return", "reciprocate" ]
        }, {
            title: "fal fa-exchange",
            searchTerms: [ "transfer", "arrows", "arrow", "swap", "return", "reciprocate" ]
        }, {
            title: "fas fa-exchange-alt",
            searchTerms: [ "transfer", "arrows", "arrow", "exchange", "swap", "return", "reciprocate" ]
        }, {
            title: "far fa-exchange-alt",
            searchTerms: [ "transfer", "arrows", "arrow", "exchange", "swap", "return", "reciprocate" ]
        }, {
            title: "fal fa-exchange-alt",
            searchTerms: [ "transfer", "arrows", "arrow", "exchange", "swap", "return", "reciprocate" ]
        }, {
            title: "fas fa-exclamation",
            searchTerms: [ "warning", "error", "problem", "notification", "notify", "notice", "alert", "danger" ]
        }, {
            title: "far fa-exclamation",
            searchTerms: [ "warning", "error", "problem", "notification", "notify", "notice", "alert", "danger" ]
        }, {
            title: "fal fa-exclamation",
            searchTerms: [ "warning", "error", "problem", "notification", "notify", "notice", "alert", "danger" ]
        }, {
            title: "fas fa-exclamation-circle",
            searchTerms: [ "warning", "error", "problem", "notification", "notify", "notice", "alert", "danger" ]
        }, {
            title: "far fa-exclamation-circle",
            searchTerms: [ "warning", "error", "problem", "notification", "notify", "notice", "alert", "danger" ]
        }, {
            title: "fal fa-exclamation-circle",
            searchTerms: [ "warning", "error", "problem", "notification", "notify", "notice", "alert", "danger" ]
        }, {
            title: "fas fa-exclamation-square",
            searchTerms: [ "warning", "error", "problem", "notification", "notify", "notice", "alert", "danger" ]
        }, {
            title: "far fa-exclamation-square",
            searchTerms: [ "warning", "error", "problem", "notification", "notify", "notice", "alert", "danger" ]
        }, {
            title: "fal fa-exclamation-square",
            searchTerms: [ "warning", "error", "problem", "notification", "notify", "notice", "alert", "danger" ]
        }, {
            title: "fas fa-exclamation-triangle",
            searchTerms: [ "warning", "error", "problem", "notification", "notify", "notice", "alert", "danger" ]
        }, {
            title: "far fa-exclamation-triangle",
            searchTerms: [ "warning", "error", "problem", "notification", "notify", "notice", "alert", "danger" ]
        }, {
            title: "fal fa-exclamation-triangle",
            searchTerms: [ "warning", "error", "problem", "notification", "notify", "notice", "alert", "danger" ]
        }, {
            title: "fas fa-expand",
            searchTerms: [ "enlarge", "bigger", "resize" ]
        }, {
            title: "far fa-expand",
            searchTerms: [ "enlarge", "bigger", "resize" ]
        }, {
            title: "fal fa-expand",
            searchTerms: [ "enlarge", "bigger", "resize" ]
        }, {
            title: "fas fa-expand-alt",
            searchTerms: [ "enlarge", "bigger", "resize" ]
        }, {
            title: "far fa-expand-alt",
            searchTerms: [ "enlarge", "bigger", "resize" ]
        }, {
            title: "fal fa-expand-alt",
            searchTerms: [ "enlarge", "bigger", "resize" ]
        }, {
            title: "fas fa-expand-arrows",
            searchTerms: [ "enlarge", "bigger", "resize", "move" ]
        }, {
            title: "far fa-expand-arrows",
            searchTerms: [ "enlarge", "bigger", "resize", "move" ]
        }, {
            title: "fal fa-expand-arrows",
            searchTerms: [ "enlarge", "bigger", "resize", "move" ]
        }, {
            title: "fas fa-expand-arrows-alt",
            searchTerms: [ "enlarge", "bigger", "resize", "move", "arrows-alt" ]
        }, {
            title: "far fa-expand-arrows-alt",
            searchTerms: [ "enlarge", "bigger", "resize", "move", "arrows-alt" ]
        }, {
            title: "fal fa-expand-arrows-alt",
            searchTerms: [ "enlarge", "bigger", "resize", "move", "arrows-alt" ]
        }, {
            title: "fas fa-expand-wide",
            searchTerms: [ "enlarge", "bigger", "resize" ]
        }, {
            title: "far fa-expand-wide",
            searchTerms: [ "enlarge", "bigger", "resize" ]
        }, {
            title: "fal fa-expand-wide",
            searchTerms: [ "enlarge", "bigger", "resize" ]
        }, {
            title: "fab fa-expeditedssl",
            searchTerms: []
        }, {
            title: "fas fa-external-link",
            searchTerms: [ "open", "new" ]
        }, {
            title: "far fa-external-link",
            searchTerms: [ "open", "new" ]
        }, {
            title: "fal fa-external-link",
            searchTerms: [ "open", "new" ]
        }, {
            title: "fas fa-external-link-alt",
            searchTerms: [ "open", "new", "external-link" ]
        }, {
            title: "far fa-external-link-alt",
            searchTerms: [ "open", "new", "external-link" ]
        }, {
            title: "fal fa-external-link-alt",
            searchTerms: [ "open", "new", "external-link" ]
        }, {
            title: "fas fa-external-link-square",
            searchTerms: [ "open", "new" ]
        }, {
            title: "far fa-external-link-square",
            searchTerms: [ "open", "new" ]
        }, {
            title: "fal fa-external-link-square",
            searchTerms: [ "open", "new" ]
        }, {
            title: "fas fa-external-link-square-alt",
            searchTerms: [ "open", "new", "external-link-square" ]
        }, {
            title: "far fa-external-link-square-alt",
            searchTerms: [ "open", "new", "external-link-square" ]
        }, {
            title: "fal fa-external-link-square-alt",
            searchTerms: [ "open", "new", "external-link-square" ]
        }, {
            title: "fas fa-eye",
            searchTerms: [ "show", "visible", "views", "see", "seen", "sight", "optic" ]
        }, {
            title: "far fa-eye",
            searchTerms: [ "show", "visible", "views", "see", "seen", "sight", "optic" ]
        }, {
            title: "fal fa-eye",
            searchTerms: [ "show", "visible", "views", "see", "seen", "sight", "optic" ]
        }, {
            title: "fas fa-eye-dropper",
            searchTerms: [ "eyedropper" ]
        }, {
            title: "far fa-eye-dropper",
            searchTerms: [ "eyedropper" ]
        }, {
            title: "fal fa-eye-dropper",
            searchTerms: [ "eyedropper" ]
        }, {
            title: "fas fa-eye-slash",
            searchTerms: [ "toggle", "show", "hide", "visible", "visiblity", "views", "unseen", "blind" ]
        }, {
            title: "far fa-eye-slash",
            searchTerms: [ "toggle", "show", "hide", "visible", "visiblity", "views", "unseen", "blind" ]
        }, {
            title: "fal fa-eye-slash",
            searchTerms: [ "toggle", "show", "hide", "visible", "visiblity", "views", "unseen", "blind" ]
        }, {
            title: "fab fa-facebook",
            searchTerms: [ "social network", "facebook-official" ]
        }, {
            title: "fab fa-facebook-f",
            searchTerms: [ "facebook" ]
        }, {
            title: "fab fa-facebook-messenger",
            searchTerms: []
        }, {
            title: "fab fa-facebook-square",
            searchTerms: [ "social network" ]
        }, {
            title: "fas fa-fast-backward",
            searchTerms: [ "rewind", "previous", "beginning", "start", "first" ]
        }, {
            title: "far fa-fast-backward",
            searchTerms: [ "rewind", "previous", "beginning", "start", "first" ]
        }, {
            title: "fal fa-fast-backward",
            searchTerms: [ "rewind", "previous", "beginning", "start", "first" ]
        }, {
            title: "fas fa-fast-forward",
            searchTerms: [ "next", "end", "last" ]
        }, {
            title: "far fa-fast-forward",
            searchTerms: [ "next", "end", "last" ]
        }, {
            title: "fal fa-fast-forward",
            searchTerms: [ "next", "end", "last" ]
        }, {
            title: "fas fa-fax",
            searchTerms: []
        }, {
            title: "far fa-fax",
            searchTerms: []
        }, {
            title: "fal fa-fax",
            searchTerms: []
        }, {
            title: "fas fa-female",
            searchTerms: [ "woman", "human", "user", "person", "profile" ]
        }, {
            title: "far fa-female",
            searchTerms: [ "woman", "human", "user", "person", "profile" ]
        }, {
            title: "fal fa-female",
            searchTerms: [ "woman", "human", "user", "person", "profile" ]
        }, {
            title: "fas fa-field-hockey",
            searchTerms: []
        }, {
            title: "far fa-field-hockey",
            searchTerms: []
        }, {
            title: "fal fa-field-hockey",
            searchTerms: []
        }, {
            title: "fas fa-fighter-jet",
            searchTerms: [ "fly", "plane", "airplane", "quick", "fast", "travel", "transportation", "maverick", "goose", "top gun" ]
        }, {
            title: "far fa-fighter-jet",
            searchTerms: [ "fly", "plane", "airplane", "quick", "fast", "travel", "transportation", "maverick", "goose", "top gun" ]
        }, {
            title: "fal fa-fighter-jet",
            searchTerms: [ "fly", "plane", "airplane", "quick", "fast", "travel", "transportation", "maverick", "goose", "top gun" ]
        }, {
            title: "fas fa-file",
            searchTerms: [ "new", "page", "pdf", "document" ]
        }, {
            title: "far fa-file",
            searchTerms: [ "new", "page", "pdf", "document" ]
        }, {
            title: "fal fa-file",
            searchTerms: [ "new", "page", "pdf", "document" ]
        }, {
            title: "fas fa-file-alt",
            searchTerms: [ "new", "page", "pdf", "document", "file-text", "invoice" ]
        }, {
            title: "far fa-file-alt",
            searchTerms: [ "new", "page", "pdf", "document", "file-text", "invoice" ]
        }, {
            title: "fal fa-file-alt",
            searchTerms: [ "new", "page", "pdf", "document", "file-text", "invoice" ]
        }, {
            title: "fas fa-file-archive",
            searchTerms: [ "zip", ".zip", "compress", "compression", "bundle", "download" ]
        }, {
            title: "far fa-file-archive",
            searchTerms: [ "zip", ".zip", "compress", "compression", "bundle", "download" ]
        }, {
            title: "fal fa-file-archive",
            searchTerms: [ "zip", ".zip", "compress", "compression", "bundle", "download" ]
        }, {
            title: "fas fa-file-audio",
            searchTerms: []
        }, {
            title: "far fa-file-audio",
            searchTerms: []
        }, {
            title: "fal fa-file-audio",
            searchTerms: []
        }, {
            title: "fas fa-file-check",
            searchTerms: [ "todo", "done", "agree", "accept", "confirm", "ok", "select", "success", "synced" ]
        }, {
            title: "far fa-file-check",
            searchTerms: [ "todo", "done", "agree", "accept", "confirm", "ok", "select", "success", "synced" ]
        }, {
            title: "fal fa-file-check",
            searchTerms: [ "todo", "done", "agree", "accept", "confirm", "ok", "select", "success", "synced" ]
        }, {
            title: "fas fa-file-code",
            searchTerms: []
        }, {
            title: "far fa-file-code",
            searchTerms: []
        }, {
            title: "fal fa-file-code",
            searchTerms: []
        }, {
            title: "fas fa-file-edit",
            searchTerms: [ "pen" ]
        }, {
            title: "far fa-file-edit",
            searchTerms: [ "pen" ]
        }, {
            title: "fal fa-file-edit",
            searchTerms: [ "pen" ]
        }, {
            title: "fas fa-file-excel",
            searchTerms: []
        }, {
            title: "far fa-file-excel",
            searchTerms: []
        }, {
            title: "fal fa-file-excel",
            searchTerms: []
        }, {
            title: "fas fa-file-exclamation",
            searchTerms: []
        }, {
            title: "far fa-file-exclamation",
            searchTerms: []
        }, {
            title: "fal fa-file-exclamation",
            searchTerms: []
        }, {
            title: "fas fa-file-image",
            searchTerms: []
        }, {
            title: "far fa-file-image",
            searchTerms: []
        }, {
            title: "fal fa-file-image",
            searchTerms: []
        }, {
            title: "fas fa-file-medical",
            searchTerms: []
        }, {
            title: "far fa-file-medical",
            searchTerms: []
        }, {
            title: "fal fa-file-medical",
            searchTerms: []
        }, {
            title: "fas fa-file-medical-alt",
            searchTerms: []
        }, {
            title: "far fa-file-medical-alt",
            searchTerms: []
        }, {
            title: "fal fa-file-medical-alt",
            searchTerms: []
        }, {
            title: "fas fa-file-minus",
            searchTerms: []
        }, {
            title: "far fa-file-minus",
            searchTerms: []
        }, {
            title: "fal fa-file-minus",
            searchTerms: []
        }, {
            title: "fas fa-file-pdf",
            searchTerms: []
        }, {
            title: "far fa-file-pdf",
            searchTerms: []
        }, {
            title: "fal fa-file-pdf",
            searchTerms: []
        }, {
            title: "fas fa-file-plus",
            searchTerms: []
        }, {
            title: "far fa-file-plus",
            searchTerms: []
        }, {
            title: "fal fa-file-plus",
            searchTerms: []
        }, {
            title: "fas fa-file-powerpoint",
            searchTerms: []
        }, {
            title: "far fa-file-powerpoint",
            searchTerms: []
        }, {
            title: "fal fa-file-powerpoint",
            searchTerms: []
        }, {
            title: "fas fa-file-times",
            searchTerms: []
        }, {
            title: "far fa-file-times",
            searchTerms: []
        }, {
            title: "fal fa-file-times",
            searchTerms: []
        }, {
            title: "fas fa-file-video",
            searchTerms: []
        }, {
            title: "far fa-file-video",
            searchTerms: []
        }, {
            title: "fal fa-file-video",
            searchTerms: []
        }, {
            title: "fas fa-file-word",
            searchTerms: []
        }, {
            title: "far fa-file-word",
            searchTerms: []
        }, {
            title: "fal fa-file-word",
            searchTerms: []
        }, {
            title: "fas fa-film",
            searchTerms: [ "movie" ]
        }, {
            title: "far fa-film",
            searchTerms: [ "movie" ]
        }, {
            title: "fal fa-film",
            searchTerms: [ "movie" ]
        }, {
            title: "fas fa-film-alt",
            searchTerms: []
        }, {
            title: "far fa-film-alt",
            searchTerms: []
        }, {
            title: "fal fa-film-alt",
            searchTerms: []
        }, {
            title: "fas fa-filter",
            searchTerms: [ "funnel", "options" ]
        }, {
            title: "far fa-filter",
            searchTerms: [ "funnel", "options" ]
        }, {
            title: "fal fa-filter",
            searchTerms: [ "funnel", "options" ]
        }, {
            title: "fas fa-fire",
            searchTerms: [ "flame", "hot", "popular" ]
        }, {
            title: "far fa-fire",
            searchTerms: [ "flame", "hot", "popular" ]
        }, {
            title: "fal fa-fire",
            searchTerms: [ "flame", "hot", "popular" ]
        }, {
            title: "fas fa-fire-extinguisher",
            searchTerms: []
        }, {
            title: "far fa-fire-extinguisher",
            searchTerms: []
        }, {
            title: "fal fa-fire-extinguisher",
            searchTerms: []
        }, {
            title: "fab fa-firefox",
            searchTerms: [ "browser" ]
        }, {
            title: "fas fa-first-aid",
            searchTerms: []
        }, {
            title: "far fa-first-aid",
            searchTerms: []
        }, {
            title: "fal fa-first-aid",
            searchTerms: []
        }, {
            title: "fab fa-first-order",
            searchTerms: []
        }, {
            title: "fab fa-firstdraft",
            searchTerms: []
        }, {
            title: "fas fa-flag",
            searchTerms: [ "report", "notification", "notify", "notice" ]
        }, {
            title: "far fa-flag",
            searchTerms: [ "report", "notification", "notify", "notice" ]
        }, {
            title: "fal fa-flag",
            searchTerms: [ "report", "notification", "notify", "notice" ]
        }, {
            title: "fas fa-flag-checkered",
            searchTerms: [ "report", "notification", "notify", "notice" ]
        }, {
            title: "far fa-flag-checkered",
            searchTerms: [ "report", "notification", "notify", "notice" ]
        }, {
            title: "fal fa-flag-checkered",
            searchTerms: [ "report", "notification", "notify", "notice" ]
        }, {
            title: "fas fa-flask",
            searchTerms: [ "science", "beaker", "experimental", "labs" ]
        }, {
            title: "far fa-flask",
            searchTerms: [ "science", "beaker", "experimental", "labs" ]
        }, {
            title: "fal fa-flask",
            searchTerms: [ "science", "beaker", "experimental", "labs" ]
        }, {
            title: "fab fa-flickr",
            searchTerms: []
        }, {
            title: "fab fa-flipboard",
            searchTerms: []
        }, {
            title: "fab fa-fly",
            searchTerms: []
        }, {
            title: "fas fa-folder",
            searchTerms: []
        }, {
            title: "far fa-folder",
            searchTerms: []
        }, {
            title: "fal fa-folder",
            searchTerms: []
        }, {
            title: "fas fa-folder-open",
            searchTerms: []
        }, {
            title: "far fa-folder-open",
            searchTerms: []
        }, {
            title: "fal fa-folder-open",
            searchTerms: []
        }, {
            title: "fas fa-font",
            searchTerms: [ "text" ]
        }, {
            title: "far fa-font",
            searchTerms: [ "text" ]
        }, {
            title: "fal fa-font",
            searchTerms: [ "text" ]
        }, {
            title: "fab fa-font-awesome",
            searchTerms: [ "meanpath" ]
        }, {
            title: "fab fa-font-awesome-alt",
            searchTerms: []
        }, {
            title: "fab fa-font-awesome-flag",
            searchTerms: []
        }, {
            title: "fab fa-fonticons",
            searchTerms: []
        }, {
            title: "fab fa-fonticons-fi",
            searchTerms: []
        }, {
            title: "fas fa-football-ball",
            searchTerms: []
        }, {
            title: "far fa-football-ball",
            searchTerms: []
        }, {
            title: "fal fa-football-ball",
            searchTerms: []
        }, {
            title: "fas fa-football-helmet",
            searchTerms: []
        }, {
            title: "far fa-football-helmet",
            searchTerms: []
        }, {
            title: "fal fa-football-helmet",
            searchTerms: []
        }, {
            title: "fas fa-forklift",
            searchTerms: []
        }, {
            title: "far fa-forklift",
            searchTerms: []
        }, {
            title: "fal fa-forklift",
            searchTerms: []
        }, {
            title: "fab fa-fort-awesome",
            searchTerms: [ "castle" ]
        }, {
            title: "fab fa-fort-awesome-alt",
            searchTerms: [ "castle" ]
        }, {
            title: "fab fa-forumbee",
            searchTerms: []
        }, {
            title: "fas fa-forward",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "far fa-forward",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-forward",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fab fa-foursquare",
            searchTerms: []
        }, {
            title: "fas fa-fragile",
            searchTerms: []
        }, {
            title: "far fa-fragile",
            searchTerms: []
        }, {
            title: "fal fa-fragile",
            searchTerms: []
        }, {
            title: "fab fa-free-code-camp",
            searchTerms: []
        }, {
            title: "fab fa-freebsd",
            searchTerms: []
        }, {
            title: "fas fa-frown",
            searchTerms: [ "face", "emoticon", "sad", "disapprove", "rating" ]
        }, {
            title: "far fa-frown",
            searchTerms: [ "face", "emoticon", "sad", "disapprove", "rating" ]
        }, {
            title: "fal fa-frown",
            searchTerms: [ "face", "emoticon", "sad", "disapprove", "rating" ]
        }, {
            title: "fas fa-futbol",
            searchTerms: [ "soccer", "football", "ball" ]
        }, {
            title: "far fa-futbol",
            searchTerms: [ "soccer", "football", "ball" ]
        }, {
            title: "fal fa-futbol",
            searchTerms: [ "soccer", "football", "ball" ]
        }, {
            title: "fas fa-gamepad",
            searchTerms: [ "controller" ]
        }, {
            title: "far fa-gamepad",
            searchTerms: [ "controller" ]
        }, {
            title: "fal fa-gamepad",
            searchTerms: [ "controller" ]
        }, {
            title: "fas fa-gavel",
            searchTerms: [ "judge", "lawyer", "opinion", "hammer" ]
        }, {
            title: "far fa-gavel",
            searchTerms: [ "judge", "lawyer", "opinion", "hammer" ]
        }, {
            title: "fal fa-gavel",
            searchTerms: [ "judge", "lawyer", "opinion", "hammer" ]
        }, {
            title: "fas fa-gem",
            searchTerms: [ "diamond" ]
        }, {
            title: "far fa-gem",
            searchTerms: [ "diamond" ]
        }, {
            title: "fal fa-gem",
            searchTerms: [ "diamond" ]
        }, {
            title: "fas fa-genderless",
            searchTerms: []
        }, {
            title: "far fa-genderless",
            searchTerms: []
        }, {
            title: "fal fa-genderless",
            searchTerms: []
        }, {
            title: "fab fa-get-pocket",
            searchTerms: []
        }, {
            title: "fab fa-gg",
            searchTerms: []
        }, {
            title: "fab fa-gg-circle",
            searchTerms: []
        }, {
            title: "fas fa-gift",
            searchTerms: [ "present", "party", "wrapped", "giving", "generosity" ]
        }, {
            title: "far fa-gift",
            searchTerms: [ "present", "party", "wrapped", "giving", "generosity" ]
        }, {
            title: "fal fa-gift",
            searchTerms: [ "present", "party", "wrapped", "giving", "generosity" ]
        }, {
            title: "fab fa-git",
            searchTerms: []
        }, {
            title: "fab fa-git-square",
            searchTerms: []
        }, {
            title: "fab fa-github",
            searchTerms: [ "octocat" ]
        }, {
            title: "fab fa-github-alt",
            searchTerms: [ "octocat" ]
        }, {
            title: "fab fa-github-square",
            searchTerms: [ "octocat" ]
        }, {
            title: "fab fa-gitkraken",
            searchTerms: []
        }, {
            title: "fab fa-gitlab",
            searchTerms: [ "Axosoft" ]
        }, {
            title: "fab fa-gitter",
            searchTerms: []
        }, {
            title: "fas fa-glass-martini",
            searchTerms: [ "martini", "drink", "bar", "alcohol", "liquor", "glass" ]
        }, {
            title: "far fa-glass-martini",
            searchTerms: [ "martini", "drink", "bar", "alcohol", "liquor", "glass" ]
        }, {
            title: "fal fa-glass-martini",
            searchTerms: [ "martini", "drink", "bar", "alcohol", "liquor", "glass" ]
        }, {
            title: "fab fa-glide",
            searchTerms: []
        }, {
            title: "fab fa-glide-g",
            searchTerms: []
        }, {
            title: "fas fa-globe",
            searchTerms: [ "world", "planet", "map", "place", "travel", "earth", "global", "translate", "all", "language", "localize", "location", "coordinates", "country", "gps", "online" ]
        }, {
            title: "far fa-globe",
            searchTerms: [ "world", "planet", "map", "place", "travel", "earth", "global", "translate", "all", "language", "localize", "location", "coordinates", "country", "gps", "online" ]
        }, {
            title: "fal fa-globe",
            searchTerms: [ "world", "planet", "map", "place", "travel", "earth", "global", "translate", "all", "language", "localize", "location", "coordinates", "country", "gps", "online" ]
        }, {
            title: "fab fa-gofore",
            searchTerms: []
        }, {
            title: "fas fa-golf-ball",
            searchTerms: []
        }, {
            title: "far fa-golf-ball",
            searchTerms: []
        }, {
            title: "fal fa-golf-ball",
            searchTerms: []
        }, {
            title: "fas fa-golf-club",
            searchTerms: []
        }, {
            title: "far fa-golf-club",
            searchTerms: []
        }, {
            title: "fal fa-golf-club",
            searchTerms: []
        }, {
            title: "fab fa-goodreads",
            searchTerms: []
        }, {
            title: "fab fa-goodreads-g",
            searchTerms: []
        }, {
            title: "fab fa-google",
            searchTerms: []
        }, {
            title: "fab fa-google-drive",
            searchTerms: []
        }, {
            title: "fab fa-google-play",
            searchTerms: []
        }, {
            title: "fab fa-google-plus",
            searchTerms: [ "google-plus-circle", "google-plus-official" ]
        }, {
            title: "fab fa-google-plus-g",
            searchTerms: [ "social network", "google-plus" ]
        }, {
            title: "fab fa-google-plus-square",
            searchTerms: [ "social network" ]
        }, {
            title: "fab fa-google-wallet",
            searchTerms: []
        }, {
            title: "fas fa-graduation-cap",
            searchTerms: [ "learning", "school", "student" ]
        }, {
            title: "far fa-graduation-cap",
            searchTerms: [ "learning", "school", "student" ]
        }, {
            title: "fal fa-graduation-cap",
            searchTerms: [ "learning", "school", "student" ]
        }, {
            title: "fab fa-gratipay",
            searchTerms: [ "heart", "like", "favorite", "love" ]
        }, {
            title: "fab fa-grav",
            searchTerms: []
        }, {
            title: "fab fa-gripfire",
            searchTerms: []
        }, {
            title: "fab fa-grunt",
            searchTerms: []
        }, {
            title: "fab fa-gulp",
            searchTerms: []
        }, {
            title: "fas fa-h-square",
            searchTerms: [ "hospital", "hotel" ]
        }, {
            title: "far fa-h-square",
            searchTerms: [ "hospital", "hotel" ]
        }, {
            title: "fal fa-h-square",
            searchTerms: [ "hospital", "hotel" ]
        }, {
            title: "fas fa-h1",
            searchTerms: [ "header" ]
        }, {
            title: "far fa-h1",
            searchTerms: [ "header" ]
        }, {
            title: "fal fa-h1",
            searchTerms: [ "header" ]
        }, {
            title: "fas fa-h2",
            searchTerms: [ "header" ]
        }, {
            title: "far fa-h2",
            searchTerms: [ "header" ]
        }, {
            title: "fal fa-h2",
            searchTerms: [ "header" ]
        }, {
            title: "fas fa-h3",
            searchTerms: [ "header" ]
        }, {
            title: "far fa-h3",
            searchTerms: [ "header" ]
        }, {
            title: "fal fa-h3",
            searchTerms: [ "header" ]
        }, {
            title: "fab fa-hacker-news",
            searchTerms: []
        }, {
            title: "fab fa-hacker-news-square",
            searchTerms: []
        }, {
            title: "fas fa-hand-heart",
            searchTerms: []
        }, {
            title: "far fa-hand-heart",
            searchTerms: []
        }, {
            title: "fal fa-hand-heart",
            searchTerms: []
        }, {
            title: "fas fa-hand-holding",
            searchTerms: []
        }, {
            title: "far fa-hand-holding",
            searchTerms: []
        }, {
            title: "fal fa-hand-holding",
            searchTerms: []
        }, {
            title: "fas fa-hand-holding-box",
            searchTerms: []
        }, {
            title: "far fa-hand-holding-box",
            searchTerms: []
        }, {
            title: "fal fa-hand-holding-box",
            searchTerms: []
        }, {
            title: "fas fa-hand-holding-heart",
            searchTerms: []
        }, {
            title: "far fa-hand-holding-heart",
            searchTerms: []
        }, {
            title: "fal fa-hand-holding-heart",
            searchTerms: []
        }, {
            title: "fas fa-hand-holding-seedling",
            searchTerms: []
        }, {
            title: "far fa-hand-holding-seedling",
            searchTerms: []
        }, {
            title: "fal fa-hand-holding-seedling",
            searchTerms: []
        }, {
            title: "fas fa-hand-holding-usd",
            searchTerms: [ "dollar sign", "price", "donation", "giving" ]
        }, {
            title: "far fa-hand-holding-usd",
            searchTerms: [ "dollar sign", "price", "donation", "giving" ]
        }, {
            title: "fal fa-hand-holding-usd",
            searchTerms: [ "dollar sign", "price", "donation", "giving" ]
        }, {
            title: "fas fa-hand-holding-water",
            searchTerms: []
        }, {
            title: "far fa-hand-holding-water",
            searchTerms: []
        }, {
            title: "fal fa-hand-holding-water",
            searchTerms: []
        }, {
            title: "fas fa-hand-lizard",
            searchTerms: []
        }, {
            title: "far fa-hand-lizard",
            searchTerms: []
        }, {
            title: "fal fa-hand-lizard",
            searchTerms: []
        }, {
            title: "fas fa-hand-paper",
            searchTerms: [ "stop" ]
        }, {
            title: "far fa-hand-paper",
            searchTerms: [ "stop" ]
        }, {
            title: "fal fa-hand-paper",
            searchTerms: [ "stop" ]
        }, {
            title: "fas fa-hand-peace",
            searchTerms: []
        }, {
            title: "far fa-hand-peace",
            searchTerms: []
        }, {
            title: "fal fa-hand-peace",
            searchTerms: []
        }, {
            title: "fas fa-hand-point-down",
            searchTerms: [ "point", "finger", "hand-o-down" ]
        }, {
            title: "far fa-hand-point-down",
            searchTerms: [ "point", "finger", "hand-o-down" ]
        }, {
            title: "fal fa-hand-point-down",
            searchTerms: [ "point", "finger", "hand-o-down" ]
        }, {
            title: "fas fa-hand-point-left",
            searchTerms: [ "point", "left", "previous", "back", "finger", "hand-o-left" ]
        }, {
            title: "far fa-hand-point-left",
            searchTerms: [ "point", "left", "previous", "back", "finger", "hand-o-left" ]
        }, {
            title: "fal fa-hand-point-left",
            searchTerms: [ "point", "left", "previous", "back", "finger", "hand-o-left" ]
        }, {
            title: "fas fa-hand-point-right",
            searchTerms: [ "point", "right", "next", "forward", "finger", "hand-o-right" ]
        }, {
            title: "far fa-hand-point-right",
            searchTerms: [ "point", "right", "next", "forward", "finger", "hand-o-right" ]
        }, {
            title: "fal fa-hand-point-right",
            searchTerms: [ "point", "right", "next", "forward", "finger", "hand-o-right" ]
        }, {
            title: "fas fa-hand-point-up",
            searchTerms: [ "point", "finger", "hand-o-up" ]
        }, {
            title: "far fa-hand-point-up",
            searchTerms: [ "point", "finger", "hand-o-up" ]
        }, {
            title: "fal fa-hand-point-up",
            searchTerms: [ "point", "finger", "hand-o-up" ]
        }, {
            title: "fas fa-hand-pointer",
            searchTerms: [ "select" ]
        }, {
            title: "far fa-hand-pointer",
            searchTerms: [ "select" ]
        }, {
            title: "fal fa-hand-pointer",
            searchTerms: [ "select" ]
        }, {
            title: "fas fa-hand-receiving",
            searchTerms: []
        }, {
            title: "far fa-hand-receiving",
            searchTerms: []
        }, {
            title: "fal fa-hand-receiving",
            searchTerms: []
        }, {
            title: "fas fa-hand-rock",
            searchTerms: []
        }, {
            title: "far fa-hand-rock",
            searchTerms: []
        }, {
            title: "fal fa-hand-rock",
            searchTerms: []
        }, {
            title: "fas fa-hand-scissors",
            searchTerms: []
        }, {
            title: "far fa-hand-scissors",
            searchTerms: []
        }, {
            title: "fal fa-hand-scissors",
            searchTerms: []
        }, {
            title: "fas fa-hand-spock",
            searchTerms: []
        }, {
            title: "far fa-hand-spock",
            searchTerms: []
        }, {
            title: "fal fa-hand-spock",
            searchTerms: []
        }, {
            title: "fas fa-hands",
            searchTerms: []
        }, {
            title: "far fa-hands",
            searchTerms: []
        }, {
            title: "fal fa-hands",
            searchTerms: []
        }, {
            title: "fas fa-hands-heart",
            searchTerms: []
        }, {
            title: "far fa-hands-heart",
            searchTerms: []
        }, {
            title: "fal fa-hands-heart",
            searchTerms: []
        }, {
            title: "fas fa-hands-helping",
            searchTerms: [ "assistance", "aid", "partnership", "volunteering" ]
        }, {
            title: "far fa-hands-helping",
            searchTerms: [ "assistance", "aid", "partnership", "volunteering" ]
        }, {
            title: "fal fa-hands-helping",
            searchTerms: [ "assistance", "aid", "partnership", "volunteering" ]
        }, {
            title: "fas fa-hands-usd",
            searchTerms: [ "dollar sign", "price", "donation", "giving" ]
        }, {
            title: "far fa-hands-usd",
            searchTerms: [ "dollar sign", "price", "donation", "giving" ]
        }, {
            title: "fal fa-hands-usd",
            searchTerms: [ "dollar sign", "price", "donation", "giving" ]
        }, {
            title: "fas fa-handshake",
            searchTerms: [ "greeting", "partnership" ]
        }, {
            title: "far fa-handshake",
            searchTerms: [ "greeting", "partnership" ]
        }, {
            title: "fal fa-handshake",
            searchTerms: [ "greeting", "partnership" ]
        }, {
            title: "fas fa-handshake-alt",
            searchTerms: [ "greeting", "partnership" ]
        }, {
            title: "far fa-handshake-alt",
            searchTerms: [ "greeting", "partnership" ]
        }, {
            title: "fal fa-handshake-alt",
            searchTerms: [ "greeting", "partnership" ]
        }, {
            title: "fas fa-hashtag",
            searchTerms: []
        }, {
            title: "far fa-hashtag",
            searchTerms: []
        }, {
            title: "fal fa-hashtag",
            searchTerms: []
        }, {
            title: "fas fa-hdd",
            searchTerms: [ "harddrive", "hard drive", "storage", "save", "machine" ]
        }, {
            title: "far fa-hdd",
            searchTerms: [ "harddrive", "hard drive", "storage", "save", "machine" ]
        }, {
            title: "fal fa-hdd",
            searchTerms: [ "harddrive", "hard drive", "storage", "save", "machine" ]
        }, {
            title: "fas fa-heading",
            searchTerms: [ "header", "header" ]
        }, {
            title: "far fa-heading",
            searchTerms: [ "header", "header" ]
        }, {
            title: "fal fa-heading",
            searchTerms: [ "header", "header" ]
        }, {
            title: "fas fa-headphones",
            searchTerms: [ "sound", "listen", "music", "audio", "speaker" ]
        }, {
            title: "far fa-headphones",
            searchTerms: [ "sound", "listen", "music", "audio", "speaker" ]
        }, {
            title: "fal fa-headphones",
            searchTerms: [ "sound", "listen", "music", "audio", "speaker" ]
        }, {
            title: "fas fa-heart",
            searchTerms: [ "love", "like", "favorite" ]
        }, {
            title: "far fa-heart",
            searchTerms: [ "love", "like", "favorite" ]
        }, {
            title: "fal fa-heart",
            searchTerms: [ "love", "like", "favorite" ]
        }, {
            title: "fas fa-heart-circle",
            searchTerms: [ "love", "like", "favorite" ]
        }, {
            title: "far fa-heart-circle",
            searchTerms: [ "love", "like", "favorite" ]
        }, {
            title: "fal fa-heart-circle",
            searchTerms: [ "love", "like", "favorite" ]
        }, {
            title: "fas fa-heart-square",
            searchTerms: [ "love", "like", "favorite" ]
        }, {
            title: "far fa-heart-square",
            searchTerms: [ "love", "like", "favorite" ]
        }, {
            title: "fal fa-heart-square",
            searchTerms: [ "love", "like", "favorite" ]
        }, {
            title: "fas fa-heartbeat",
            searchTerms: [ "ekg", "vital signs", "lifeline" ]
        }, {
            title: "far fa-heartbeat",
            searchTerms: [ "ekg", "vital signs", "lifeline" ]
        }, {
            title: "fal fa-heartbeat",
            searchTerms: [ "ekg", "vital signs", "lifeline" ]
        }, {
            title: "fas fa-hexagon",
            searchTerms: []
        }, {
            title: "far fa-hexagon",
            searchTerms: []
        }, {
            title: "fal fa-hexagon",
            searchTerms: []
        }, {
            title: "fab fa-hips",
            searchTerms: []
        }, {
            title: "fab fa-hire-a-helper",
            searchTerms: []
        }, {
            title: "fas fa-history",
            searchTerms: []
        }, {
            title: "far fa-history",
            searchTerms: []
        }, {
            title: "fal fa-history",
            searchTerms: []
        }, {
            title: "fas fa-hockey-puck",
            searchTerms: []
        }, {
            title: "far fa-hockey-puck",
            searchTerms: []
        }, {
            title: "fal fa-hockey-puck",
            searchTerms: []
        }, {
            title: "fas fa-hockey-sticks",
            searchTerms: []
        }, {
            title: "far fa-hockey-sticks",
            searchTerms: []
        }, {
            title: "fal fa-hockey-sticks",
            searchTerms: []
        }, {
            title: "fas fa-home",
            searchTerms: [ "main", "house" ]
        }, {
            title: "far fa-home",
            searchTerms: [ "main", "house" ]
        }, {
            title: "fal fa-home",
            searchTerms: [ "main", "house" ]
        }, {
            title: "fas fa-home-heart",
            searchTerms: []
        }, {
            title: "far fa-home-heart",
            searchTerms: []
        }, {
            title: "fal fa-home-heart",
            searchTerms: []
        }, {
            title: "fab fa-hooli",
            searchTerms: []
        }, {
            title: "fas fa-hospital",
            searchTerms: [ "building", "medical center", "emergency room" ]
        }, {
            title: "far fa-hospital",
            searchTerms: [ "building", "medical center", "emergency room" ]
        }, {
            title: "fal fa-hospital",
            searchTerms: [ "building", "medical center", "emergency room" ]
        }, {
            title: "fas fa-hospital-alt",
            searchTerms: [ "building", "medical center", "emergency room" ]
        }, {
            title: "far fa-hospital-alt",
            searchTerms: [ "building", "medical center", "emergency room" ]
        }, {
            title: "fal fa-hospital-alt",
            searchTerms: [ "building", "medical center", "emergency room" ]
        }, {
            title: "fas fa-hospital-symbol",
            searchTerms: []
        }, {
            title: "far fa-hospital-symbol",
            searchTerms: []
        }, {
            title: "fal fa-hospital-symbol",
            searchTerms: []
        }, {
            title: "fab fa-hotjar",
            searchTerms: []
        }, {
            title: "fas fa-hourglass",
            searchTerms: []
        }, {
            title: "far fa-hourglass",
            searchTerms: []
        }, {
            title: "fal fa-hourglass",
            searchTerms: []
        }, {
            title: "fas fa-hourglass-end",
            searchTerms: []
        }, {
            title: "far fa-hourglass-end",
            searchTerms: []
        }, {
            title: "fal fa-hourglass-end",
            searchTerms: []
        }, {
            title: "fas fa-hourglass-half",
            searchTerms: []
        }, {
            title: "far fa-hourglass-half",
            searchTerms: []
        }, {
            title: "fal fa-hourglass-half",
            searchTerms: []
        }, {
            title: "fas fa-hourglass-start",
            searchTerms: []
        }, {
            title: "far fa-hourglass-start",
            searchTerms: []
        }, {
            title: "fal fa-hourglass-start",
            searchTerms: []
        }, {
            title: "fab fa-houzz",
            searchTerms: []
        }, {
            title: "fab fa-html5",
            searchTerms: []
        }, {
            title: "fab fa-hubspot",
            searchTerms: []
        }, {
            title: "fas fa-i-cursor",
            searchTerms: []
        }, {
            title: "far fa-i-cursor",
            searchTerms: []
        }, {
            title: "fal fa-i-cursor",
            searchTerms: []
        }, {
            title: "fas fa-id-badge",
            searchTerms: []
        }, {
            title: "far fa-id-badge",
            searchTerms: []
        }, {
            title: "fal fa-id-badge",
            searchTerms: []
        }, {
            title: "fas fa-id-card",
            searchTerms: []
        }, {
            title: "far fa-id-card",
            searchTerms: []
        }, {
            title: "fal fa-id-card",
            searchTerms: []
        }, {
            title: "fas fa-id-card-alt",
            searchTerms: [ "demographics" ]
        }, {
            title: "far fa-id-card-alt",
            searchTerms: [ "demographics" ]
        }, {
            title: "fal fa-id-card-alt",
            searchTerms: [ "demographics" ]
        }, {
            title: "fas fa-image",
            searchTerms: [ "photo", "album", "picture", "picture" ]
        }, {
            title: "far fa-image",
            searchTerms: [ "photo", "album", "picture", "picture" ]
        }, {
            title: "fal fa-image",
            searchTerms: [ "photo", "album", "picture", "picture" ]
        }, {
            title: "fas fa-images",
            searchTerms: [ "photo", "album", "picture" ]
        }, {
            title: "far fa-images",
            searchTerms: [ "photo", "album", "picture" ]
        }, {
            title: "fal fa-images",
            searchTerms: [ "photo", "album", "picture" ]
        }, {
            title: "fab fa-imdb",
            searchTerms: []
        }, {
            title: "fas fa-inbox",
            searchTerms: []
        }, {
            title: "far fa-inbox",
            searchTerms: []
        }, {
            title: "fal fa-inbox",
            searchTerms: []
        }, {
            title: "fas fa-inbox-in",
            searchTerms: []
        }, {
            title: "far fa-inbox-in",
            searchTerms: []
        }, {
            title: "fal fa-inbox-in",
            searchTerms: []
        }, {
            title: "fas fa-inbox-out",
            searchTerms: []
        }, {
            title: "far fa-inbox-out",
            searchTerms: []
        }, {
            title: "fal fa-inbox-out",
            searchTerms: []
        }, {
            title: "fas fa-indent",
            searchTerms: []
        }, {
            title: "far fa-indent",
            searchTerms: []
        }, {
            title: "fal fa-indent",
            searchTerms: []
        }, {
            title: "fas fa-industry",
            searchTerms: [ "factory", "manufacturing" ]
        }, {
            title: "far fa-industry",
            searchTerms: [ "factory", "manufacturing" ]
        }, {
            title: "fal fa-industry",
            searchTerms: [ "factory", "manufacturing" ]
        }, {
            title: "fas fa-industry-alt",
            searchTerms: [ "factory", "manufacturing" ]
        }, {
            title: "far fa-industry-alt",
            searchTerms: [ "factory", "manufacturing" ]
        }, {
            title: "fal fa-industry-alt",
            searchTerms: [ "factory", "manufacturing" ]
        }, {
            title: "fas fa-info",
            searchTerms: [ "help", "information", "more", "details" ]
        }, {
            title: "far fa-info",
            searchTerms: [ "help", "information", "more", "details" ]
        }, {
            title: "fal fa-info",
            searchTerms: [ "help", "information", "more", "details" ]
        }, {
            title: "fas fa-info-circle",
            searchTerms: [ "help", "information", "more", "details" ]
        }, {
            title: "far fa-info-circle",
            searchTerms: [ "help", "information", "more", "details" ]
        }, {
            title: "fal fa-info-circle",
            searchTerms: [ "help", "information", "more", "details" ]
        }, {
            title: "fas fa-info-square",
            searchTerms: [ "help", "information", "more", "details" ]
        }, {
            title: "far fa-info-square",
            searchTerms: [ "help", "information", "more", "details" ]
        }, {
            title: "fal fa-info-square",
            searchTerms: [ "help", "information", "more", "details" ]
        }, {
            title: "fab fa-instagram",
            searchTerms: []
        }, {
            title: "fab fa-internet-explorer",
            searchTerms: [ "browser", "ie" ]
        }, {
            title: "fas fa-inventory",
            searchTerms: []
        }, {
            title: "far fa-inventory",
            searchTerms: []
        }, {
            title: "fal fa-inventory",
            searchTerms: []
        }, {
            title: "fab fa-ioxhost",
            searchTerms: []
        }, {
            title: "fas fa-italic",
            searchTerms: [ "italics" ]
        }, {
            title: "far fa-italic",
            searchTerms: [ "italics" ]
        }, {
            title: "fal fa-italic",
            searchTerms: [ "italics" ]
        }, {
            title: "fab fa-itunes",
            searchTerms: []
        }, {
            title: "fab fa-itunes-note",
            searchTerms: []
        }, {
            title: "fas fa-jack-o-lantern",
            searchTerms: []
        }, {
            title: "far fa-jack-o-lantern",
            searchTerms: []
        }, {
            title: "fal fa-jack-o-lantern",
            searchTerms: []
        }, {
            title: "fab fa-jenkins",
            searchTerms: []
        }, {
            title: "fab fa-joget",
            searchTerms: []
        }, {
            title: "fab fa-joomla",
            searchTerms: []
        }, {
            title: "fab fa-js",
            searchTerms: []
        }, {
            title: "fab fa-js-square",
            searchTerms: []
        }, {
            title: "fab fa-jsfiddle",
            searchTerms: []
        }, {
            title: "fas fa-key",
            searchTerms: [ "unlock", "password" ]
        }, {
            title: "far fa-key",
            searchTerms: [ "unlock", "password" ]
        }, {
            title: "fal fa-key",
            searchTerms: [ "unlock", "password" ]
        }, {
            title: "fas fa-keyboard",
            searchTerms: [ "type", "input" ]
        }, {
            title: "far fa-keyboard",
            searchTerms: [ "type", "input" ]
        }, {
            title: "fal fa-keyboard",
            searchTerms: [ "type", "input" ]
        }, {
            title: "fab fa-keycdn",
            searchTerms: []
        }, {
            title: "fab fa-kickstarter",
            searchTerms: []
        }, {
            title: "fab fa-kickstarter-k",
            searchTerms: []
        }, {
            title: "fab fa-korvue",
            searchTerms: []
        }, {
            title: "fas fa-lamp",
            searchTerms: []
        }, {
            title: "far fa-lamp",
            searchTerms: []
        }, {
            title: "fal fa-lamp",
            searchTerms: []
        }, {
            title: "fas fa-language",
            searchTerms: []
        }, {
            title: "far fa-language",
            searchTerms: []
        }, {
            title: "fal fa-language",
            searchTerms: []
        }, {
            title: "fas fa-laptop",
            searchTerms: [ "demo", "computer", "device", "pc", "mac", "pc", "macbook", "dell", "dude you're getting", "machine" ]
        }, {
            title: "far fa-laptop",
            searchTerms: [ "demo", "computer", "device", "pc", "mac", "pc", "macbook", "dell", "dude you're getting", "machine" ]
        }, {
            title: "fal fa-laptop",
            searchTerms: [ "demo", "computer", "device", "pc", "mac", "pc", "macbook", "dell", "dude you're getting", "machine" ]
        }, {
            title: "fab fa-laravel",
            searchTerms: []
        }, {
            title: "fab fa-lastfm",
            searchTerms: []
        }, {
            title: "fab fa-lastfm-square",
            searchTerms: []
        }, {
            title: "fas fa-leaf",
            searchTerms: [ "eco", "nature", "plant" ]
        }, {
            title: "far fa-leaf",
            searchTerms: [ "eco", "nature", "plant" ]
        }, {
            title: "fal fa-leaf",
            searchTerms: [ "eco", "nature", "plant" ]
        }, {
            title: "fas fa-leaf-heart",
            searchTerms: []
        }, {
            title: "far fa-leaf-heart",
            searchTerms: []
        }, {
            title: "fal fa-leaf-heart",
            searchTerms: []
        }, {
            title: "fab fa-leanpub",
            searchTerms: []
        }, {
            title: "fas fa-lemon",
            searchTerms: [ "food" ]
        }, {
            title: "far fa-lemon",
            searchTerms: [ "food" ]
        }, {
            title: "fal fa-lemon",
            searchTerms: [ "food" ]
        }, {
            title: "fab fa-less",
            searchTerms: []
        }, {
            title: "fas fa-level-down",
            searchTerms: [ "arrow" ]
        }, {
            title: "far fa-level-down",
            searchTerms: [ "arrow" ]
        }, {
            title: "fal fa-level-down",
            searchTerms: [ "arrow" ]
        }, {
            title: "fas fa-level-down-alt",
            searchTerms: [ "level-down" ]
        }, {
            title: "far fa-level-down-alt",
            searchTerms: [ "level-down" ]
        }, {
            title: "fal fa-level-down-alt",
            searchTerms: [ "level-down" ]
        }, {
            title: "fas fa-level-up",
            searchTerms: [ "arrow" ]
        }, {
            title: "far fa-level-up",
            searchTerms: [ "arrow" ]
        }, {
            title: "fal fa-level-up",
            searchTerms: [ "arrow" ]
        }, {
            title: "fas fa-level-up-alt",
            searchTerms: [ "level-up" ]
        }, {
            title: "far fa-level-up-alt",
            searchTerms: [ "level-up" ]
        }, {
            title: "fal fa-level-up-alt",
            searchTerms: [ "level-up" ]
        }, {
            title: "fas fa-life-ring",
            searchTerms: [ "support" ]
        }, {
            title: "far fa-life-ring",
            searchTerms: [ "support" ]
        }, {
            title: "fal fa-life-ring",
            searchTerms: [ "support" ]
        }, {
            title: "fas fa-lightbulb",
            searchTerms: [ "idea", "inspiration" ]
        }, {
            title: "far fa-lightbulb",
            searchTerms: [ "idea", "inspiration" ]
        }, {
            title: "fal fa-lightbulb",
            searchTerms: [ "idea", "inspiration" ]
        }, {
            title: "fab fa-line",
            searchTerms: []
        }, {
            title: "fas fa-link",
            searchTerms: [ "chain" ]
        }, {
            title: "far fa-link",
            searchTerms: [ "chain" ]
        }, {
            title: "fal fa-link",
            searchTerms: [ "chain" ]
        }, {
            title: "fab fa-linkedin",
            searchTerms: [ "linkedin-square" ]
        }, {
            title: "fab fa-linkedin-in",
            searchTerms: [ "linkedin" ]
        }, {
            title: "fab fa-linode",
            searchTerms: []
        }, {
            title: "fab fa-linux",
            searchTerms: [ "tux" ]
        }, {
            title: "fas fa-lira-sign",
            searchTerms: [ "try", "turkish", "try" ]
        }, {
            title: "far fa-lira-sign",
            searchTerms: [ "try", "turkish", "try" ]
        }, {
            title: "fal fa-lira-sign",
            searchTerms: [ "try", "turkish", "try" ]
        }, {
            title: "fas fa-list",
            searchTerms: [ "ul", "ol", "checklist", "finished", "completed", "done", "todo" ]
        }, {
            title: "far fa-list",
            searchTerms: [ "ul", "ol", "checklist", "finished", "completed", "done", "todo" ]
        }, {
            title: "fal fa-list",
            searchTerms: [ "ul", "ol", "checklist", "finished", "completed", "done", "todo" ]
        }, {
            title: "fas fa-list-alt",
            searchTerms: [ "ul", "ol", "checklist", "finished", "completed", "done", "todo" ]
        }, {
            title: "far fa-list-alt",
            searchTerms: [ "ul", "ol", "checklist", "finished", "completed", "done", "todo" ]
        }, {
            title: "fal fa-list-alt",
            searchTerms: [ "ul", "ol", "checklist", "finished", "completed", "done", "todo" ]
        }, {
            title: "fas fa-list-ol",
            searchTerms: [ "ul", "ol", "checklist", "list", "todo", "list", "numbers" ]
        }, {
            title: "far fa-list-ol",
            searchTerms: [ "ul", "ol", "checklist", "list", "todo", "list", "numbers" ]
        }, {
            title: "fal fa-list-ol",
            searchTerms: [ "ul", "ol", "checklist", "list", "todo", "list", "numbers" ]
        }, {
            title: "fas fa-list-ul",
            searchTerms: [ "ul", "ol", "checklist", "todo", "list" ]
        }, {
            title: "far fa-list-ul",
            searchTerms: [ "ul", "ol", "checklist", "todo", "list" ]
        }, {
            title: "fal fa-list-ul",
            searchTerms: [ "ul", "ol", "checklist", "todo", "list" ]
        }, {
            title: "fas fa-location-arrow",
            searchTerms: [ "map", "coordinates", "location", "address", "place", "where", "gps" ]
        }, {
            title: "far fa-location-arrow",
            searchTerms: [ "map", "coordinates", "location", "address", "place", "where", "gps" ]
        }, {
            title: "fal fa-location-arrow",
            searchTerms: [ "map", "coordinates", "location", "address", "place", "where", "gps" ]
        }, {
            title: "fas fa-lock",
            searchTerms: [ "protect", "admin", "security" ]
        }, {
            title: "far fa-lock",
            searchTerms: [ "protect", "admin", "security" ]
        }, {
            title: "fal fa-lock",
            searchTerms: [ "protect", "admin", "security" ]
        }, {
            title: "fas fa-lock-alt",
            searchTerms: [ "protect", "admin", "security" ]
        }, {
            title: "far fa-lock-alt",
            searchTerms: [ "protect", "admin", "security" ]
        }, {
            title: "fal fa-lock-alt",
            searchTerms: [ "protect", "admin", "security" ]
        }, {
            title: "fas fa-lock-open",
            searchTerms: [ "protect", "admin", "password", "lock", "open" ]
        }, {
            title: "far fa-lock-open",
            searchTerms: [ "protect", "admin", "password", "lock", "open" ]
        }, {
            title: "fal fa-lock-open",
            searchTerms: [ "protect", "admin", "password", "lock", "open" ]
        }, {
            title: "fas fa-lock-open-alt",
            searchTerms: [ "protect", "admin", "password", "lock" ]
        }, {
            title: "far fa-lock-open-alt",
            searchTerms: [ "protect", "admin", "password", "lock" ]
        }, {
            title: "fal fa-lock-open-alt",
            searchTerms: [ "protect", "admin", "password", "lock" ]
        }, {
            title: "fas fa-long-arrow-alt-down",
            searchTerms: [ "long-arrow-down" ]
        }, {
            title: "far fa-long-arrow-alt-down",
            searchTerms: [ "long-arrow-down" ]
        }, {
            title: "fal fa-long-arrow-alt-down",
            searchTerms: [ "long-arrow-down" ]
        }, {
            title: "fas fa-long-arrow-alt-left",
            searchTerms: [ "previous", "back", "long-arrow-left" ]
        }, {
            title: "far fa-long-arrow-alt-left",
            searchTerms: [ "previous", "back", "long-arrow-left" ]
        }, {
            title: "fal fa-long-arrow-alt-left",
            searchTerms: [ "previous", "back", "long-arrow-left" ]
        }, {
            title: "fas fa-long-arrow-alt-right",
            searchTerms: [ "long-arrow-right" ]
        }, {
            title: "far fa-long-arrow-alt-right",
            searchTerms: [ "long-arrow-right" ]
        }, {
            title: "fal fa-long-arrow-alt-right",
            searchTerms: [ "long-arrow-right" ]
        }, {
            title: "fas fa-long-arrow-alt-up",
            searchTerms: [ "long-arrow-up" ]
        }, {
            title: "far fa-long-arrow-alt-up",
            searchTerms: [ "long-arrow-up" ]
        }, {
            title: "fal fa-long-arrow-alt-up",
            searchTerms: [ "long-arrow-up" ]
        }, {
            title: "fas fa-long-arrow-down",
            searchTerms: []
        }, {
            title: "far fa-long-arrow-down",
            searchTerms: []
        }, {
            title: "fal fa-long-arrow-down",
            searchTerms: []
        }, {
            title: "fas fa-long-arrow-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "far fa-long-arrow-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "fal fa-long-arrow-left",
            searchTerms: [ "previous", "back" ]
        }, {
            title: "fas fa-long-arrow-right",
            searchTerms: []
        }, {
            title: "far fa-long-arrow-right",
            searchTerms: []
        }, {
            title: "fal fa-long-arrow-right",
            searchTerms: []
        }, {
            title: "fas fa-long-arrow-up",
            searchTerms: []
        }, {
            title: "far fa-long-arrow-up",
            searchTerms: []
        }, {
            title: "fal fa-long-arrow-up",
            searchTerms: []
        }, {
            title: "fas fa-loveseat",
            searchTerms: []
        }, {
            title: "far fa-loveseat",
            searchTerms: []
        }, {
            title: "fal fa-loveseat",
            searchTerms: []
        }, {
            title: "fas fa-low-vision",
            searchTerms: []
        }, {
            title: "far fa-low-vision",
            searchTerms: []
        }, {
            title: "fal fa-low-vision",
            searchTerms: []
        }, {
            title: "fas fa-luchador",
            searchTerms: []
        }, {
            title: "far fa-luchador",
            searchTerms: []
        }, {
            title: "fal fa-luchador",
            searchTerms: []
        }, {
            title: "fab fa-lyft",
            searchTerms: []
        }, {
            title: "fab fa-magento",
            searchTerms: []
        }, {
            title: "fas fa-magic",
            searchTerms: [ "wizard", "automatic", "autocomplete" ]
        }, {
            title: "far fa-magic",
            searchTerms: [ "wizard", "automatic", "autocomplete" ]
        }, {
            title: "fal fa-magic",
            searchTerms: [ "wizard", "automatic", "autocomplete" ]
        }, {
            title: "fas fa-magnet",
            searchTerms: []
        }, {
            title: "far fa-magnet",
            searchTerms: []
        }, {
            title: "fal fa-magnet",
            searchTerms: []
        }, {
            title: "fas fa-male",
            searchTerms: [ "man", "human", "user", "person", "profile" ]
        }, {
            title: "far fa-male",
            searchTerms: [ "man", "human", "user", "person", "profile" ]
        }, {
            title: "fal fa-male",
            searchTerms: [ "man", "human", "user", "person", "profile" ]
        }, {
            title: "fas fa-map",
            searchTerms: []
        }, {
            title: "far fa-map",
            searchTerms: []
        }, {
            title: "fal fa-map",
            searchTerms: []
        }, {
            title: "fas fa-map-marker",
            searchTerms: [ "map", "pin", "location", "coordinates", "localize", "address", "travel", "where", "place", "gps" ]
        }, {
            title: "far fa-map-marker",
            searchTerms: [ "map", "pin", "location", "coordinates", "localize", "address", "travel", "where", "place", "gps" ]
        }, {
            title: "fal fa-map-marker",
            searchTerms: [ "map", "pin", "location", "coordinates", "localize", "address", "travel", "where", "place", "gps" ]
        }, {
            title: "fas fa-map-marker-alt",
            searchTerms: [ "map-marker", "gps" ]
        }, {
            title: "far fa-map-marker-alt",
            searchTerms: [ "map-marker", "gps" ]
        }, {
            title: "fal fa-map-marker-alt",
            searchTerms: [ "map-marker", "gps" ]
        }, {
            title: "fas fa-map-pin",
            searchTerms: []
        }, {
            title: "far fa-map-pin",
            searchTerms: []
        }, {
            title: "fal fa-map-pin",
            searchTerms: []
        }, {
            title: "fas fa-map-signs",
            searchTerms: []
        }, {
            title: "far fa-map-signs",
            searchTerms: []
        }, {
            title: "fal fa-map-signs",
            searchTerms: []
        }, {
            title: "fas fa-mars",
            searchTerms: [ "male" ]
        }, {
            title: "far fa-mars",
            searchTerms: [ "male" ]
        }, {
            title: "fal fa-mars",
            searchTerms: [ "male" ]
        }, {
            title: "fas fa-mars-double",
            searchTerms: []
        }, {
            title: "far fa-mars-double",
            searchTerms: []
        }, {
            title: "fal fa-mars-double",
            searchTerms: []
        }, {
            title: "fas fa-mars-stroke",
            searchTerms: []
        }, {
            title: "far fa-mars-stroke",
            searchTerms: []
        }, {
            title: "fal fa-mars-stroke",
            searchTerms: []
        }, {
            title: "fas fa-mars-stroke-h",
            searchTerms: []
        }, {
            title: "far fa-mars-stroke-h",
            searchTerms: []
        }, {
            title: "fal fa-mars-stroke-h",
            searchTerms: []
        }, {
            title: "fas fa-mars-stroke-v",
            searchTerms: []
        }, {
            title: "far fa-mars-stroke-v",
            searchTerms: []
        }, {
            title: "fal fa-mars-stroke-v",
            searchTerms: []
        }, {
            title: "fab fa-maxcdn",
            searchTerms: []
        }, {
            title: "fab fa-medapps",
            searchTerms: []
        }, {
            title: "fab fa-medium",
            searchTerms: []
        }, {
            title: "fab fa-medium-m",
            searchTerms: []
        }, {
            title: "fas fa-medkit",
            searchTerms: [ "first aid", "firstaid", "help", "support", "health" ]
        }, {
            title: "far fa-medkit",
            searchTerms: [ "first aid", "firstaid", "help", "support", "health" ]
        }, {
            title: "fal fa-medkit",
            searchTerms: [ "first aid", "firstaid", "help", "support", "health" ]
        }, {
            title: "fab fa-medrt",
            searchTerms: []
        }, {
            title: "fab fa-meetup",
            searchTerms: []
        }, {
            title: "fas fa-meh",
            searchTerms: [ "face", "emoticon", "rating", "neutral" ]
        }, {
            title: "far fa-meh",
            searchTerms: [ "face", "emoticon", "rating", "neutral" ]
        }, {
            title: "fal fa-meh",
            searchTerms: [ "face", "emoticon", "rating", "neutral" ]
        }, {
            title: "fas fa-mercury",
            searchTerms: [ "transgender" ]
        }, {
            title: "far fa-mercury",
            searchTerms: [ "transgender" ]
        }, {
            title: "fal fa-mercury",
            searchTerms: [ "transgender" ]
        }, {
            title: "fas fa-microchip",
            searchTerms: []
        }, {
            title: "far fa-microchip",
            searchTerms: []
        }, {
            title: "fal fa-microchip",
            searchTerms: []
        }, {
            title: "fas fa-microphone",
            searchTerms: [ "record", "voice", "sound" ]
        }, {
            title: "far fa-microphone",
            searchTerms: [ "record", "voice", "sound" ]
        }, {
            title: "fal fa-microphone",
            searchTerms: [ "record", "voice", "sound" ]
        }, {
            title: "fas fa-microphone-alt",
            searchTerms: []
        }, {
            title: "far fa-microphone-alt",
            searchTerms: []
        }, {
            title: "fal fa-microphone-alt",
            searchTerms: []
        }, {
            title: "fas fa-microphone-slash",
            searchTerms: [ "record", "voice", "sound", "mute" ]
        }, {
            title: "far fa-microphone-slash",
            searchTerms: [ "record", "voice", "sound", "mute" ]
        }, {
            title: "fal fa-microphone-slash",
            searchTerms: [ "record", "voice", "sound", "mute" ]
        }, {
            title: "fab fa-microsoft",
            searchTerms: []
        }, {
            title: "fas fa-minus",
            searchTerms: [ "hide", "minify", "delete", "remove", "trash", "hide", "collapse" ]
        }, {
            title: "far fa-minus",
            searchTerms: [ "hide", "minify", "delete", "remove", "trash", "hide", "collapse" ]
        }, {
            title: "fal fa-minus",
            searchTerms: [ "hide", "minify", "delete", "remove", "trash", "hide", "collapse" ]
        }, {
            title: "fas fa-minus-circle",
            searchTerms: [ "delete", "remove", "trash", "hide" ]
        }, {
            title: "far fa-minus-circle",
            searchTerms: [ "delete", "remove", "trash", "hide" ]
        }, {
            title: "fal fa-minus-circle",
            searchTerms: [ "delete", "remove", "trash", "hide" ]
        }, {
            title: "fas fa-minus-hexagon",
            searchTerms: [ "delete", "remove", "trash", "hide" ]
        }, {
            title: "far fa-minus-hexagon",
            searchTerms: [ "delete", "remove", "trash", "hide" ]
        }, {
            title: "fal fa-minus-hexagon",
            searchTerms: [ "delete", "remove", "trash", "hide" ]
        }, {
            title: "fas fa-minus-octagon",
            searchTerms: [ "delete", "remove", "trash", "hide" ]
        }, {
            title: "far fa-minus-octagon",
            searchTerms: [ "delete", "remove", "trash", "hide" ]
        }, {
            title: "fal fa-minus-octagon",
            searchTerms: [ "delete", "remove", "trash", "hide" ]
        }, {
            title: "fas fa-minus-square",
            searchTerms: [ "hide", "minify", "delete", "remove", "trash", "hide", "collapse" ]
        }, {
            title: "far fa-minus-square",
            searchTerms: [ "hide", "minify", "delete", "remove", "trash", "hide", "collapse" ]
        }, {
            title: "fal fa-minus-square",
            searchTerms: [ "hide", "minify", "delete", "remove", "trash", "hide", "collapse" ]
        }, {
            title: "fab fa-mix",
            searchTerms: []
        }, {
            title: "fab fa-mixcloud",
            searchTerms: []
        }, {
            title: "fab fa-mizuni",
            searchTerms: []
        }, {
            title: "fas fa-mobile",
            searchTerms: [ "cell phone", "cellphone", "text", "call", "number", "telephone", "device", "screen", "apple", "iphone" ]
        }, {
            title: "far fa-mobile",
            searchTerms: [ "cell phone", "cellphone", "text", "call", "number", "telephone", "device", "screen", "apple", "iphone" ]
        }, {
            title: "fal fa-mobile",
            searchTerms: [ "cell phone", "cellphone", "text", "call", "number", "telephone", "device", "screen", "apple", "iphone" ]
        }, {
            title: "fas fa-mobile-alt",
            searchTerms: [ "cell phone", "cellphone", "text", "call", "number", "telephone", "device", "screen", "apple", "iphone" ]
        }, {
            title: "far fa-mobile-alt",
            searchTerms: [ "cell phone", "cellphone", "text", "call", "number", "telephone", "device", "screen", "apple", "iphone" ]
        }, {
            title: "fal fa-mobile-alt",
            searchTerms: [ "cell phone", "cellphone", "text", "call", "number", "telephone", "device", "screen", "apple", "iphone" ]
        }, {
            title: "fas fa-mobile-android",
            searchTerms: [ "cell phone", "cellphone", "text", "call", "number", "telephone", "device", "screen", "android" ]
        }, {
            title: "far fa-mobile-android",
            searchTerms: [ "cell phone", "cellphone", "text", "call", "number", "telephone", "device", "screen", "android" ]
        }, {
            title: "fal fa-mobile-android",
            searchTerms: [ "cell phone", "cellphone", "text", "call", "number", "telephone", "device", "screen", "android" ]
        }, {
            title: "fas fa-mobile-android-alt",
            searchTerms: [ "cell phone", "cellphone", "text", "call", "number", "telephone", "device", "screen", "android" ]
        }, {
            title: "far fa-mobile-android-alt",
            searchTerms: [ "cell phone", "cellphone", "text", "call", "number", "telephone", "device", "screen", "android" ]
        }, {
            title: "fal fa-mobile-android-alt",
            searchTerms: [ "cell phone", "cellphone", "text", "call", "number", "telephone", "device", "screen", "android" ]
        }, {
            title: "fab fa-modx",
            searchTerms: []
        }, {
            title: "fab fa-monero",
            searchTerms: []
        }, {
            title: "fas fa-money-bill",
            searchTerms: [ "cash", "money", "buy", "checkout", "purchase", "payment", "price" ]
        }, {
            title: "far fa-money-bill",
            searchTerms: [ "cash", "money", "buy", "checkout", "purchase", "payment", "price" ]
        }, {
            title: "fal fa-money-bill",
            searchTerms: [ "cash", "money", "buy", "checkout", "purchase", "payment", "price" ]
        }, {
            title: "fas fa-money-bill-alt",
            searchTerms: [ "cash", "money", "buy", "checkout", "purchase", "payment", "price" ]
        }, {
            title: "far fa-money-bill-alt",
            searchTerms: [ "cash", "money", "buy", "checkout", "purchase", "payment", "price" ]
        }, {
            title: "fal fa-money-bill-alt",
            searchTerms: [ "cash", "money", "buy", "checkout", "purchase", "payment", "price" ]
        }, {
            title: "fas fa-moon",
            searchTerms: [ "night", "darker", "contrast" ]
        }, {
            title: "far fa-moon",
            searchTerms: [ "night", "darker", "contrast" ]
        }, {
            title: "fal fa-moon",
            searchTerms: [ "night", "darker", "contrast" ]
        }, {
            title: "fas fa-motorcycle",
            searchTerms: [ "vehicle", "machine", "transportation", "bike" ]
        }, {
            title: "far fa-motorcycle",
            searchTerms: [ "vehicle", "machine", "transportation", "bike" ]
        }, {
            title: "fal fa-motorcycle",
            searchTerms: [ "vehicle", "machine", "transportation", "bike" ]
        }, {
            title: "fas fa-mouse-pointer",
            searchTerms: [ "select" ]
        }, {
            title: "far fa-mouse-pointer",
            searchTerms: [ "select" ]
        }, {
            title: "fal fa-mouse-pointer",
            searchTerms: [ "select" ]
        }, {
            title: "fas fa-music",
            searchTerms: [ "note", "sound" ]
        }, {
            title: "far fa-music",
            searchTerms: [ "note", "sound" ]
        }, {
            title: "fal fa-music",
            searchTerms: [ "note", "sound" ]
        }, {
            title: "fab fa-napster",
            searchTerms: []
        }, {
            title: "fas fa-neuter",
            searchTerms: []
        }, {
            title: "far fa-neuter",
            searchTerms: []
        }, {
            title: "fal fa-neuter",
            searchTerms: []
        }, {
            title: "fas fa-newspaper",
            searchTerms: [ "press", "article" ]
        }, {
            title: "far fa-newspaper",
            searchTerms: [ "press", "article" ]
        }, {
            title: "fal fa-newspaper",
            searchTerms: [ "press", "article" ]
        }, {
            title: "fab fa-nintendo-switch",
            searchTerms: []
        }, {
            title: "fab fa-node",
            searchTerms: []
        }, {
            title: "fab fa-node-js",
            searchTerms: []
        }, {
            title: "fas fa-notes-medical",
            searchTerms: []
        }, {
            title: "far fa-notes-medical",
            searchTerms: []
        }, {
            title: "fal fa-notes-medical",
            searchTerms: []
        }, {
            title: "fab fa-npm",
            searchTerms: []
        }, {
            title: "fab fa-ns8",
            searchTerms: []
        }, {
            title: "fab fa-nutritionix",
            searchTerms: []
        }, {
            title: "fas fa-object-group",
            searchTerms: [ "design" ]
        }, {
            title: "far fa-object-group",
            searchTerms: [ "design" ]
        }, {
            title: "fal fa-object-group",
            searchTerms: [ "design" ]
        }, {
            title: "fas fa-object-ungroup",
            searchTerms: [ "design" ]
        }, {
            title: "far fa-object-ungroup",
            searchTerms: [ "design" ]
        }, {
            title: "fal fa-object-ungroup",
            searchTerms: [ "design" ]
        }, {
            title: "fas fa-octagon",
            searchTerms: []
        }, {
            title: "far fa-octagon",
            searchTerms: []
        }, {
            title: "fal fa-octagon",
            searchTerms: []
        }, {
            title: "fab fa-odnoklassniki",
            searchTerms: []
        }, {
            title: "fab fa-odnoklassniki-square",
            searchTerms: []
        }, {
            title: "fab fa-opencart",
            searchTerms: []
        }, {
            title: "fab fa-openid",
            searchTerms: []
        }, {
            title: "fab fa-opera",
            searchTerms: []
        }, {
            title: "fab fa-optin-monster",
            searchTerms: []
        }, {
            title: "fab fa-osi",
            searchTerms: []
        }, {
            title: "fas fa-outdent",
            searchTerms: []
        }, {
            title: "far fa-outdent",
            searchTerms: []
        }, {
            title: "fal fa-outdent",
            searchTerms: []
        }, {
            title: "fab fa-page4",
            searchTerms: []
        }, {
            title: "fab fa-pagelines",
            searchTerms: [ "leaf", "leaves", "tree", "plant", "eco", "nature" ]
        }, {
            title: "fas fa-paint-brush",
            searchTerms: []
        }, {
            title: "far fa-paint-brush",
            searchTerms: []
        }, {
            title: "fal fa-paint-brush",
            searchTerms: []
        }, {
            title: "fab fa-palfed",
            searchTerms: []
        }, {
            title: "fas fa-pallet",
            searchTerms: []
        }, {
            title: "far fa-pallet",
            searchTerms: []
        }, {
            title: "fal fa-pallet",
            searchTerms: []
        }, {
            title: "fas fa-pallet-alt",
            searchTerms: []
        }, {
            title: "far fa-pallet-alt",
            searchTerms: []
        }, {
            title: "fal fa-pallet-alt",
            searchTerms: []
        }, {
            title: "fas fa-paper-plane",
            searchTerms: []
        }, {
            title: "far fa-paper-plane",
            searchTerms: []
        }, {
            title: "fal fa-paper-plane",
            searchTerms: []
        }, {
            title: "fas fa-paperclip",
            searchTerms: [ "attachment" ]
        }, {
            title: "far fa-paperclip",
            searchTerms: [ "attachment" ]
        }, {
            title: "fal fa-paperclip",
            searchTerms: [ "attachment" ]
        }, {
            title: "fas fa-parachute-box",
            searchTerms: [ "aid", "assistance", "rescue", "supplies" ]
        }, {
            title: "far fa-parachute-box",
            searchTerms: [ "aid", "assistance", "rescue", "supplies" ]
        }, {
            title: "fal fa-parachute-box",
            searchTerms: [ "aid", "assistance", "rescue", "supplies" ]
        }, {
            title: "fas fa-paragraph",
            searchTerms: []
        }, {
            title: "far fa-paragraph",
            searchTerms: []
        }, {
            title: "fal fa-paragraph",
            searchTerms: []
        }, {
            title: "fas fa-paste",
            searchTerms: [ "copy", "clipboard" ]
        }, {
            title: "far fa-paste",
            searchTerms: [ "copy", "clipboard" ]
        }, {
            title: "fal fa-paste",
            searchTerms: [ "copy", "clipboard" ]
        }, {
            title: "fab fa-patreon",
            searchTerms: []
        }, {
            title: "fas fa-pause",
            searchTerms: [ "wait" ]
        }, {
            title: "far fa-pause",
            searchTerms: [ "wait" ]
        }, {
            title: "fal fa-pause",
            searchTerms: [ "wait" ]
        }, {
            title: "fas fa-pause-circle",
            searchTerms: []
        }, {
            title: "far fa-pause-circle",
            searchTerms: []
        }, {
            title: "fal fa-pause-circle",
            searchTerms: []
        }, {
            title: "fas fa-paw",
            searchTerms: [ "pet" ]
        }, {
            title: "far fa-paw",
            searchTerms: [ "pet" ]
        }, {
            title: "fal fa-paw",
            searchTerms: [ "pet" ]
        }, {
            title: "fab fa-paypal",
            searchTerms: []
        }, {
            title: "fas fa-pen",
            searchTerms: [ "write", "edit", "update", "design" ]
        }, {
            title: "far fa-pen",
            searchTerms: [ "write", "edit", "update", "design" ]
        }, {
            title: "fal fa-pen",
            searchTerms: [ "write", "edit", "update", "design" ]
        }, {
            title: "fas fa-pen-alt",
            searchTerms: [ "write", "edit", "update", "design" ]
        }, {
            title: "far fa-pen-alt",
            searchTerms: [ "write", "edit", "update", "design" ]
        }, {
            title: "fal fa-pen-alt",
            searchTerms: [ "write", "edit", "update", "design" ]
        }, {
            title: "fas fa-pen-square",
            searchTerms: [ "write", "edit", "update", "pencil-square" ]
        }, {
            title: "far fa-pen-square",
            searchTerms: [ "write", "edit", "update", "pencil-square" ]
        }, {
            title: "fal fa-pen-square",
            searchTerms: [ "write", "edit", "update", "pencil-square" ]
        }, {
            title: "fas fa-pencil",
            searchTerms: [ "write", "edit", "update", "design" ]
        }, {
            title: "far fa-pencil",
            searchTerms: [ "write", "edit", "update", "design" ]
        }, {
            title: "fal fa-pencil",
            searchTerms: [ "write", "edit", "update", "design" ]
        }, {
            title: "fas fa-pencil-alt",
            searchTerms: [ "write", "edit", "update", "pencil", "design" ]
        }, {
            title: "far fa-pencil-alt",
            searchTerms: [ "write", "edit", "update", "pencil", "design" ]
        }, {
            title: "fal fa-pencil-alt",
            searchTerms: [ "write", "edit", "update", "pencil", "design" ]
        }, {
            title: "fas fa-pennant",
            searchTerms: []
        }, {
            title: "far fa-pennant",
            searchTerms: []
        }, {
            title: "fal fa-pennant",
            searchTerms: []
        }, {
            title: "fas fa-people-carry",
            searchTerms: [ "movers" ]
        }, {
            title: "far fa-people-carry",
            searchTerms: [ "movers" ]
        }, {
            title: "fal fa-people-carry",
            searchTerms: [ "movers" ]
        }, {
            title: "fas fa-percent",
            searchTerms: []
        }, {
            title: "far fa-percent",
            searchTerms: []
        }, {
            title: "fal fa-percent",
            searchTerms: []
        }, {
            title: "fab fa-periscope",
            searchTerms: []
        }, {
            title: "fas fa-person-carry",
            searchTerms: [ "mover" ]
        }, {
            title: "far fa-person-carry",
            searchTerms: [ "mover" ]
        }, {
            title: "fal fa-person-carry",
            searchTerms: [ "mover" ]
        }, {
            title: "fas fa-person-dolly",
            searchTerms: [ "mover dolly" ]
        }, {
            title: "far fa-person-dolly",
            searchTerms: [ "mover dolly" ]
        }, {
            title: "fal fa-person-dolly",
            searchTerms: [ "mover dolly" ]
        }, {
            title: "fas fa-person-dolly-empty",
            searchTerms: [ "mover" ]
        }, {
            title: "far fa-person-dolly-empty",
            searchTerms: [ "mover" ]
        }, {
            title: "fal fa-person-dolly-empty",
            searchTerms: [ "mover" ]
        }, {
            title: "fab fa-phabricator",
            searchTerms: []
        }, {
            title: "fab fa-phoenix-framework",
            searchTerms: []
        }, {
            title: "fas fa-phone",
            searchTerms: [ "call", "voice", "number", "support", "earphone", "telephone" ]
        }, {
            title: "far fa-phone",
            searchTerms: [ "call", "voice", "number", "support", "earphone", "telephone" ]
        }, {
            title: "fal fa-phone",
            searchTerms: [ "call", "voice", "number", "support", "earphone", "telephone" ]
        }, {
            title: "fas fa-phone-plus",
            searchTerms: []
        }, {
            title: "far fa-phone-plus",
            searchTerms: []
        }, {
            title: "fal fa-phone-plus",
            searchTerms: []
        }, {
            title: "fas fa-phone-slash",
            searchTerms: []
        }, {
            title: "far fa-phone-slash",
            searchTerms: []
        }, {
            title: "fal fa-phone-slash",
            searchTerms: []
        }, {
            title: "fas fa-phone-square",
            searchTerms: [ "call", "voice", "number", "support", "telephone" ]
        }, {
            title: "far fa-phone-square",
            searchTerms: [ "call", "voice", "number", "support", "telephone" ]
        }, {
            title: "fal fa-phone-square",
            searchTerms: [ "call", "voice", "number", "support", "telephone" ]
        }, {
            title: "fas fa-phone-volume",
            searchTerms: [ "telephone", "volume-control-phone" ]
        }, {
            title: "far fa-phone-volume",
            searchTerms: [ "telephone", "volume-control-phone" ]
        }, {
            title: "fal fa-phone-volume",
            searchTerms: [ "telephone", "volume-control-phone" ]
        }, {
            title: "fab fa-php",
            searchTerms: []
        }, {
            title: "fab fa-pied-piper",
            searchTerms: []
        }, {
            title: "fab fa-pied-piper-alt",
            searchTerms: []
        }, {
            title: "fab fa-pied-piper-pp",
            searchTerms: []
        }, {
            title: "fas fa-piggy-bank",
            searchTerms: [ "savings", "save" ]
        }, {
            title: "far fa-piggy-bank",
            searchTerms: [ "savings", "save" ]
        }, {
            title: "fal fa-piggy-bank",
            searchTerms: [ "savings", "save" ]
        }, {
            title: "fas fa-pills",
            searchTerms: [ "medicine", "drugs" ]
        }, {
            title: "far fa-pills",
            searchTerms: [ "medicine", "drugs" ]
        }, {
            title: "fal fa-pills",
            searchTerms: [ "medicine", "drugs" ]
        }, {
            title: "fab fa-pinterest",
            searchTerms: []
        }, {
            title: "fab fa-pinterest-p",
            searchTerms: []
        }, {
            title: "fab fa-pinterest-square",
            searchTerms: []
        }, {
            title: "fas fa-plane",
            searchTerms: [ "travel", "trip", "location", "destination", "airplane", "fly", "mode" ]
        }, {
            title: "far fa-plane",
            searchTerms: [ "travel", "trip", "location", "destination", "airplane", "fly", "mode" ]
        }, {
            title: "fal fa-plane",
            searchTerms: [ "travel", "trip", "location", "destination", "airplane", "fly", "mode" ]
        }, {
            title: "fas fa-plane-alt",
            searchTerms: []
        }, {
            title: "far fa-plane-alt",
            searchTerms: []
        }, {
            title: "fal fa-plane-alt",
            searchTerms: []
        }, {
            title: "fas fa-play",
            searchTerms: [ "start", "playing", "music", "sound" ]
        }, {
            title: "far fa-play",
            searchTerms: [ "start", "playing", "music", "sound" ]
        }, {
            title: "fal fa-play",
            searchTerms: [ "start", "playing", "music", "sound" ]
        }, {
            title: "fas fa-play-circle",
            searchTerms: [ "start", "playing" ]
        }, {
            title: "far fa-play-circle",
            searchTerms: [ "start", "playing" ]
        }, {
            title: "fal fa-play-circle",
            searchTerms: [ "start", "playing" ]
        }, {
            title: "fab fa-playstation",
            searchTerms: []
        }, {
            title: "fas fa-plug",
            searchTerms: [ "power", "connect", "online" ]
        }, {
            title: "far fa-plug",
            searchTerms: [ "power", "connect", "online" ]
        }, {
            title: "fal fa-plug",
            searchTerms: [ "power", "connect", "online" ]
        }, {
            title: "fas fa-plus",
            searchTerms: [ "add", "new", "create", "expand" ]
        }, {
            title: "far fa-plus",
            searchTerms: [ "add", "new", "create", "expand" ]
        }, {
            title: "fal fa-plus",
            searchTerms: [ "add", "new", "create", "expand" ]
        }, {
            title: "fas fa-plus-circle",
            searchTerms: [ "add", "new", "create", "expand" ]
        }, {
            title: "far fa-plus-circle",
            searchTerms: [ "add", "new", "create", "expand" ]
        }, {
            title: "fal fa-plus-circle",
            searchTerms: [ "add", "new", "create", "expand" ]
        }, {
            title: "fas fa-plus-hexagon",
            searchTerms: [ "add", "new", "create", "expand" ]
        }, {
            title: "far fa-plus-hexagon",
            searchTerms: [ "add", "new", "create", "expand" ]
        }, {
            title: "fal fa-plus-hexagon",
            searchTerms: [ "add", "new", "create", "expand" ]
        }, {
            title: "fas fa-plus-octagon",
            searchTerms: [ "add", "new", "create", "expand" ]
        }, {
            title: "far fa-plus-octagon",
            searchTerms: [ "add", "new", "create", "expand" ]
        }, {
            title: "fal fa-plus-octagon",
            searchTerms: [ "add", "new", "create", "expand" ]
        }, {
            title: "fas fa-plus-square",
            searchTerms: [ "add", "new", "create", "expand" ]
        }, {
            title: "far fa-plus-square",
            searchTerms: [ "add", "new", "create", "expand" ]
        }, {
            title: "fal fa-plus-square",
            searchTerms: [ "add", "new", "create", "expand" ]
        }, {
            title: "fas fa-podcast",
            searchTerms: []
        }, {
            title: "far fa-podcast",
            searchTerms: []
        }, {
            title: "fal fa-podcast",
            searchTerms: []
        }, {
            title: "fas fa-poo",
            searchTerms: []
        }, {
            title: "far fa-poo",
            searchTerms: []
        }, {
            title: "fal fa-poo",
            searchTerms: []
        }, {
            title: "fas fa-portrait",
            searchTerms: []
        }, {
            title: "far fa-portrait",
            searchTerms: []
        }, {
            title: "fal fa-portrait",
            searchTerms: []
        }, {
            title: "fas fa-pound-sign",
            searchTerms: [ "gbp", "gbp" ]
        }, {
            title: "far fa-pound-sign",
            searchTerms: [ "gbp", "gbp" ]
        }, {
            title: "fal fa-pound-sign",
            searchTerms: [ "gbp", "gbp" ]
        }, {
            title: "fas fa-power-off",
            searchTerms: [ "on" ]
        }, {
            title: "far fa-power-off",
            searchTerms: [ "on" ]
        }, {
            title: "fal fa-power-off",
            searchTerms: [ "on" ]
        }, {
            title: "fas fa-prescription-bottle",
            searchTerms: [ "prescription", "rx" ]
        }, {
            title: "far fa-prescription-bottle",
            searchTerms: [ "prescription", "rx" ]
        }, {
            title: "fal fa-prescription-bottle",
            searchTerms: [ "prescription", "rx" ]
        }, {
            title: "fas fa-prescription-bottle-alt",
            searchTerms: [ "prescription", "rx" ]
        }, {
            title: "far fa-prescription-bottle-alt",
            searchTerms: [ "prescription", "rx" ]
        }, {
            title: "fal fa-prescription-bottle-alt",
            searchTerms: [ "prescription", "rx" ]
        }, {
            title: "fas fa-print",
            searchTerms: []
        }, {
            title: "far fa-print",
            searchTerms: []
        }, {
            title: "fal fa-print",
            searchTerms: []
        }, {
            title: "fas fa-procedures",
            searchTerms: []
        }, {
            title: "far fa-procedures",
            searchTerms: []
        }, {
            title: "fal fa-procedures",
            searchTerms: []
        }, {
            title: "fab fa-product-hunt",
            searchTerms: []
        }, {
            title: "fab fa-pushed",
            searchTerms: []
        }, {
            title: "fas fa-puzzle-piece",
            searchTerms: [ "addon", "add-on", "section" ]
        }, {
            title: "far fa-puzzle-piece",
            searchTerms: [ "addon", "add-on", "section" ]
        }, {
            title: "fal fa-puzzle-piece",
            searchTerms: [ "addon", "add-on", "section" ]
        }, {
            title: "fab fa-python",
            searchTerms: []
        }, {
            title: "fab fa-qq",
            searchTerms: []
        }, {
            title: "fas fa-qrcode",
            searchTerms: [ "scan" ]
        }, {
            title: "far fa-qrcode",
            searchTerms: [ "scan" ]
        }, {
            title: "fal fa-qrcode",
            searchTerms: [ "scan" ]
        }, {
            title: "fas fa-question",
            searchTerms: [ "help", "information", "unknown", "support" ]
        }, {
            title: "far fa-question",
            searchTerms: [ "help", "information", "unknown", "support" ]
        }, {
            title: "fal fa-question",
            searchTerms: [ "help", "information", "unknown", "support" ]
        }, {
            title: "fas fa-question-circle",
            searchTerms: [ "help", "information", "unknown", "support" ]
        }, {
            title: "far fa-question-circle",
            searchTerms: [ "help", "information", "unknown", "support" ]
        }, {
            title: "fal fa-question-circle",
            searchTerms: [ "help", "information", "unknown", "support" ]
        }, {
            title: "fas fa-question-square",
            searchTerms: [ "help", "information", "unknown", "support" ]
        }, {
            title: "far fa-question-square",
            searchTerms: [ "help", "information", "unknown", "support" ]
        }, {
            title: "fal fa-question-square",
            searchTerms: [ "help", "information", "unknown", "support" ]
        }, {
            title: "fas fa-quidditch",
            searchTerms: []
        }, {
            title: "far fa-quidditch",
            searchTerms: []
        }, {
            title: "fal fa-quidditch",
            searchTerms: []
        }, {
            title: "fab fa-quinscape",
            searchTerms: []
        }, {
            title: "fab fa-quora",
            searchTerms: []
        }, {
            title: "fas fa-quote-left",
            searchTerms: []
        }, {
            title: "far fa-quote-left",
            searchTerms: []
        }, {
            title: "fal fa-quote-left",
            searchTerms: []
        }, {
            title: "fas fa-quote-right",
            searchTerms: []
        }, {
            title: "far fa-quote-right",
            searchTerms: []
        }, {
            title: "fal fa-quote-right",
            searchTerms: []
        }, {
            title: "fas fa-racquet",
            searchTerms: []
        }, {
            title: "far fa-racquet",
            searchTerms: []
        }, {
            title: "fal fa-racquet",
            searchTerms: []
        }, {
            title: "fas fa-ramp-loading",
            searchTerms: []
        }, {
            title: "far fa-ramp-loading",
            searchTerms: []
        }, {
            title: "fal fa-ramp-loading",
            searchTerms: []
        }, {
            title: "fas fa-random",
            searchTerms: [ "sort", "shuffle" ]
        }, {
            title: "far fa-random",
            searchTerms: [ "sort", "shuffle" ]
        }, {
            title: "fal fa-random",
            searchTerms: [ "sort", "shuffle" ]
        }, {
            title: "fab fa-ravelry",
            searchTerms: []
        }, {
            title: "fab fa-react",
            searchTerms: []
        }, {
            title: "fab fa-readme",
            searchTerms: []
        }, {
            title: "fab fa-rebel",
            searchTerms: []
        }, {
            title: "fas fa-rectangle-landscape",
            searchTerms: []
        }, {
            title: "far fa-rectangle-landscape",
            searchTerms: []
        }, {
            title: "fal fa-rectangle-landscape",
            searchTerms: []
        }, {
            title: "fas fa-rectangle-portrait",
            searchTerms: []
        }, {
            title: "far fa-rectangle-portrait",
            searchTerms: []
        }, {
            title: "fal fa-rectangle-portrait",
            searchTerms: []
        }, {
            title: "fas fa-rectangle-wide",
            searchTerms: []
        }, {
            title: "far fa-rectangle-wide",
            searchTerms: []
        }, {
            title: "fal fa-rectangle-wide",
            searchTerms: []
        }, {
            title: "fas fa-recycle",
            searchTerms: []
        }, {
            title: "far fa-recycle",
            searchTerms: []
        }, {
            title: "fal fa-recycle",
            searchTerms: []
        }, {
            title: "fab fa-red-river",
            searchTerms: []
        }, {
            title: "fab fa-reddit",
            searchTerms: []
        }, {
            title: "fab fa-reddit-alien",
            searchTerms: []
        }, {
            title: "fab fa-reddit-square",
            searchTerms: []
        }, {
            title: "fas fa-redo",
            searchTerms: [ "forward", "repeat", "repeat" ]
        }, {
            title: "far fa-redo",
            searchTerms: [ "forward", "repeat", "repeat" ]
        }, {
            title: "fal fa-redo",
            searchTerms: [ "forward", "repeat", "repeat" ]
        }, {
            title: "fas fa-redo-alt",
            searchTerms: [ "forward", "repeat" ]
        }, {
            title: "far fa-redo-alt",
            searchTerms: [ "forward", "repeat" ]
        }, {
            title: "fal fa-redo-alt",
            searchTerms: [ "forward", "repeat" ]
        }, {
            title: "fas fa-registered",
            searchTerms: []
        }, {
            title: "far fa-registered",
            searchTerms: []
        }, {
            title: "fal fa-registered",
            searchTerms: []
        }, {
            title: "fab fa-rendact",
            searchTerms: []
        }, {
            title: "fab fa-renren",
            searchTerms: []
        }, {
            title: "fas fa-repeat",
            searchTerms: []
        }, {
            title: "far fa-repeat",
            searchTerms: []
        }, {
            title: "fal fa-repeat",
            searchTerms: []
        }, {
            title: "fas fa-repeat-1",
            searchTerms: []
        }, {
            title: "far fa-repeat-1",
            searchTerms: []
        }, {
            title: "fal fa-repeat-1",
            searchTerms: []
        }, {
            title: "fas fa-repeat-1-alt",
            searchTerms: []
        }, {
            title: "far fa-repeat-1-alt",
            searchTerms: []
        }, {
            title: "fal fa-repeat-1-alt",
            searchTerms: []
        }, {
            title: "fas fa-repeat-alt",
            searchTerms: []
        }, {
            title: "far fa-repeat-alt",
            searchTerms: []
        }, {
            title: "fal fa-repeat-alt",
            searchTerms: []
        }, {
            title: "fas fa-reply",
            searchTerms: []
        }, {
            title: "far fa-reply",
            searchTerms: []
        }, {
            title: "fal fa-reply",
            searchTerms: []
        }, {
            title: "fas fa-reply-all",
            searchTerms: []
        }, {
            title: "far fa-reply-all",
            searchTerms: []
        }, {
            title: "fal fa-reply-all",
            searchTerms: []
        }, {
            title: "fab fa-replyd",
            searchTerms: []
        }, {
            title: "fab fa-resolving",
            searchTerms: []
        }, {
            title: "fas fa-retweet",
            searchTerms: [ "refresh", "reload", "share", "swap" ]
        }, {
            title: "far fa-retweet",
            searchTerms: [ "refresh", "reload", "share", "swap" ]
        }, {
            title: "fal fa-retweet",
            searchTerms: [ "refresh", "reload", "share", "swap" ]
        }, {
            title: "fas fa-retweet-alt",
            searchTerms: [ "refresh", "reload", "share", "swap" ]
        }, {
            title: "far fa-retweet-alt",
            searchTerms: [ "refresh", "reload", "share", "swap" ]
        }, {
            title: "fal fa-retweet-alt",
            searchTerms: [ "refresh", "reload", "share", "swap" ]
        }, {
            title: "fas fa-ribbon",
            searchTerms: [ "cause", "badge", "pin", "lapel" ]
        }, {
            title: "far fa-ribbon",
            searchTerms: [ "cause", "badge", "pin", "lapel" ]
        }, {
            title: "fal fa-ribbon",
            searchTerms: [ "cause", "badge", "pin", "lapel" ]
        }, {
            title: "fas fa-road",
            searchTerms: [ "street" ]
        }, {
            title: "far fa-road",
            searchTerms: [ "street" ]
        }, {
            title: "fal fa-road",
            searchTerms: [ "street" ]
        }, {
            title: "fas fa-rocket",
            searchTerms: [ "app" ]
        }, {
            title: "far fa-rocket",
            searchTerms: [ "app" ]
        }, {
            title: "fal fa-rocket",
            searchTerms: [ "app" ]
        }, {
            title: "fab fa-rocketchat",
            searchTerms: []
        }, {
            title: "fab fa-rockrms",
            searchTerms: []
        }, {
            title: "fas fa-route",
            searchTerms: []
        }, {
            title: "far fa-route",
            searchTerms: []
        }, {
            title: "fal fa-route",
            searchTerms: []
        }, {
            title: "fas fa-rss",
            searchTerms: [ "blog" ]
        }, {
            title: "far fa-rss",
            searchTerms: [ "blog" ]
        }, {
            title: "fal fa-rss",
            searchTerms: [ "blog" ]
        }, {
            title: "fas fa-rss-square",
            searchTerms: [ "feed", "blog" ]
        }, {
            title: "far fa-rss-square",
            searchTerms: [ "feed", "blog" ]
        }, {
            title: "fal fa-rss-square",
            searchTerms: [ "feed", "blog" ]
        }, {
            title: "fas fa-ruble-sign",
            searchTerms: [ "rub", "rub" ]
        }, {
            title: "far fa-ruble-sign",
            searchTerms: [ "rub", "rub" ]
        }, {
            title: "fal fa-ruble-sign",
            searchTerms: [ "rub", "rub" ]
        }, {
            title: "fas fa-rupee-sign",
            searchTerms: [ "indian", "inr" ]
        }, {
            title: "far fa-rupee-sign",
            searchTerms: [ "indian", "inr" ]
        }, {
            title: "fal fa-rupee-sign",
            searchTerms: [ "indian", "inr" ]
        }, {
            title: "fab fa-safari",
            searchTerms: [ "browser" ]
        }, {
            title: "fab fa-sass",
            searchTerms: []
        }, {
            title: "fas fa-save",
            searchTerms: [ "floppy", "floppy-o" ]
        }, {
            title: "far fa-save",
            searchTerms: [ "floppy", "floppy-o" ]
        }, {
            title: "fal fa-save",
            searchTerms: [ "floppy", "floppy-o" ]
        }, {
            title: "fas fa-scanner",
            searchTerms: []
        }, {
            title: "far fa-scanner",
            searchTerms: []
        }, {
            title: "fal fa-scanner",
            searchTerms: []
        }, {
            title: "fas fa-scanner-keyboard",
            searchTerms: []
        }, {
            title: "far fa-scanner-keyboard",
            searchTerms: []
        }, {
            title: "fal fa-scanner-keyboard",
            searchTerms: []
        }, {
            title: "fas fa-scanner-touchscreen",
            searchTerms: []
        }, {
            title: "far fa-scanner-touchscreen",
            searchTerms: []
        }, {
            title: "fal fa-scanner-touchscreen",
            searchTerms: []
        }, {
            title: "fab fa-schlix",
            searchTerms: []
        }, {
            title: "fab fa-scribd",
            searchTerms: []
        }, {
            title: "fas fa-scrubber",
            searchTerms: []
        }, {
            title: "far fa-scrubber",
            searchTerms: []
        }, {
            title: "fal fa-scrubber",
            searchTerms: []
        }, {
            title: "fas fa-search",
            searchTerms: [ "magnify", "zoom", "enlarge", "bigger", "preview" ]
        }, {
            title: "far fa-search",
            searchTerms: [ "magnify", "zoom", "enlarge", "bigger", "preview" ]
        }, {
            title: "fal fa-search",
            searchTerms: [ "magnify", "zoom", "enlarge", "bigger", "preview" ]
        }, {
            title: "fas fa-search-minus",
            searchTerms: [ "magnify", "minify", "zoom", "smaller", "zoom out" ]
        }, {
            title: "far fa-search-minus",
            searchTerms: [ "magnify", "minify", "zoom", "smaller", "zoom out" ]
        }, {
            title: "fal fa-search-minus",
            searchTerms: [ "magnify", "minify", "zoom", "smaller", "zoom out" ]
        }, {
            title: "fas fa-search-plus",
            searchTerms: [ "magnify", "zoom", "enlarge", "bigger", "zoom in" ]
        }, {
            title: "far fa-search-plus",
            searchTerms: [ "magnify", "zoom", "enlarge", "bigger", "zoom in" ]
        }, {
            title: "fal fa-search-plus",
            searchTerms: [ "magnify", "zoom", "enlarge", "bigger", "zoom in" ]
        }, {
            title: "fab fa-searchengin",
            searchTerms: []
        }, {
            title: "fas fa-seedling",
            searchTerms: []
        }, {
            title: "far fa-seedling",
            searchTerms: []
        }, {
            title: "fal fa-seedling",
            searchTerms: []
        }, {
            title: "fab fa-sellcast",
            searchTerms: [ "eercast" ]
        }, {
            title: "fab fa-sellsy",
            searchTerms: []
        }, {
            title: "fas fa-server",
            searchTerms: []
        }, {
            title: "far fa-server",
            searchTerms: []
        }, {
            title: "fal fa-server",
            searchTerms: []
        }, {
            title: "fab fa-servicestack",
            searchTerms: []
        }, {
            title: "fas fa-share",
            searchTerms: []
        }, {
            title: "far fa-share",
            searchTerms: []
        }, {
            title: "fal fa-share",
            searchTerms: []
        }, {
            title: "fas fa-share-all",
            searchTerms: []
        }, {
            title: "far fa-share-all",
            searchTerms: []
        }, {
            title: "fal fa-share-all",
            searchTerms: []
        }, {
            title: "fas fa-share-alt",
            searchTerms: []
        }, {
            title: "far fa-share-alt",
            searchTerms: []
        }, {
            title: "fal fa-share-alt",
            searchTerms: []
        }, {
            title: "fas fa-share-alt-square",
            searchTerms: []
        }, {
            title: "far fa-share-alt-square",
            searchTerms: []
        }, {
            title: "fal fa-share-alt-square",
            searchTerms: []
        }, {
            title: "fas fa-share-square",
            searchTerms: [ "social", "send" ]
        }, {
            title: "far fa-share-square",
            searchTerms: [ "social", "send" ]
        }, {
            title: "fal fa-share-square",
            searchTerms: [ "social", "send" ]
        }, {
            title: "fas fa-shekel-sign",
            searchTerms: [ "ils", "ils" ]
        }, {
            title: "far fa-shekel-sign",
            searchTerms: [ "ils", "ils" ]
        }, {
            title: "fal fa-shekel-sign",
            searchTerms: [ "ils", "ils" ]
        }, {
            title: "fas fa-shield",
            searchTerms: [ "award", "achievement", "security", "winner" ]
        }, {
            title: "far fa-shield",
            searchTerms: [ "award", "achievement", "security", "winner" ]
        }, {
            title: "fal fa-shield",
            searchTerms: [ "award", "achievement", "security", "winner" ]
        }, {
            title: "fas fa-shield-alt",
            searchTerms: [ "shield" ]
        }, {
            title: "far fa-shield-alt",
            searchTerms: [ "shield" ]
        }, {
            title: "fal fa-shield-alt",
            searchTerms: [ "shield" ]
        }, {
            title: "fas fa-shield-check",
            searchTerms: [ "award", "achievement", "security", "winner", "success" ]
        }, {
            title: "far fa-shield-check",
            searchTerms: [ "award", "achievement", "security", "winner", "success" ]
        }, {
            title: "fal fa-shield-check",
            searchTerms: [ "award", "achievement", "security", "winner", "success" ]
        }, {
            title: "fas fa-ship",
            searchTerms: [ "boat", "sea" ]
        }, {
            title: "far fa-ship",
            searchTerms: [ "boat", "sea" ]
        }, {
            title: "fal fa-ship",
            searchTerms: [ "boat", "sea" ]
        }, {
            title: "fas fa-shipping-fast",
            searchTerms: []
        }, {
            title: "far fa-shipping-fast",
            searchTerms: []
        }, {
            title: "fal fa-shipping-fast",
            searchTerms: []
        }, {
            title: "fas fa-shipping-timed",
            searchTerms: []
        }, {
            title: "far fa-shipping-timed",
            searchTerms: []
        }, {
            title: "fal fa-shipping-timed",
            searchTerms: []
        }, {
            title: "fab fa-shirtsinbulk",
            searchTerms: []
        }, {
            title: "fas fa-shopping-bag",
            searchTerms: []
        }, {
            title: "far fa-shopping-bag",
            searchTerms: []
        }, {
            title: "fal fa-shopping-bag",
            searchTerms: []
        }, {
            title: "fas fa-shopping-basket",
            searchTerms: []
        }, {
            title: "far fa-shopping-basket",
            searchTerms: []
        }, {
            title: "fal fa-shopping-basket",
            searchTerms: []
        }, {
            title: "fas fa-shopping-cart",
            searchTerms: [ "checkout", "buy", "purchase", "payment" ]
        }, {
            title: "far fa-shopping-cart",
            searchTerms: [ "checkout", "buy", "purchase", "payment" ]
        }, {
            title: "fal fa-shopping-cart",
            searchTerms: [ "checkout", "buy", "purchase", "payment" ]
        }, {
            title: "fas fa-shower",
            searchTerms: []
        }, {
            title: "far fa-shower",
            searchTerms: []
        }, {
            title: "fal fa-shower",
            searchTerms: []
        }, {
            title: "fas fa-shuttlecock",
            searchTerms: []
        }, {
            title: "far fa-shuttlecock",
            searchTerms: []
        }, {
            title: "fal fa-shuttlecock",
            searchTerms: []
        }, {
            title: "fas fa-sign",
            searchTerms: []
        }, {
            title: "far fa-sign",
            searchTerms: []
        }, {
            title: "fal fa-sign",
            searchTerms: []
        }, {
            title: "fas fa-sign-in",
            searchTerms: [ "enter", "join", "log in", "login", "sign up", "sign in", "signin", "signup", "arrow" ]
        }, {
            title: "far fa-sign-in",
            searchTerms: [ "enter", "join", "log in", "login", "sign up", "sign in", "signin", "signup", "arrow" ]
        }, {
            title: "fal fa-sign-in",
            searchTerms: [ "enter", "join", "log in", "login", "sign up", "sign in", "signin", "signup", "arrow" ]
        }, {
            title: "fas fa-sign-in-alt",
            searchTerms: [ "enter", "join", "log in", "login", "sign up", "sign in", "signin", "signup", "arrow", "sign-in" ]
        }, {
            title: "far fa-sign-in-alt",
            searchTerms: [ "enter", "join", "log in", "login", "sign up", "sign in", "signin", "signup", "arrow", "sign-in" ]
        }, {
            title: "fal fa-sign-in-alt",
            searchTerms: [ "enter", "join", "log in", "login", "sign up", "sign in", "signin", "signup", "arrow", "sign-in" ]
        }, {
            title: "fas fa-sign-language",
            searchTerms: []
        }, {
            title: "far fa-sign-language",
            searchTerms: []
        }, {
            title: "fal fa-sign-language",
            searchTerms: []
        }, {
            title: "fas fa-sign-out",
            searchTerms: [ "log out", "logout", "leave", "exit", "arrow" ]
        }, {
            title: "far fa-sign-out",
            searchTerms: [ "log out", "logout", "leave", "exit", "arrow" ]
        }, {
            title: "fal fa-sign-out",
            searchTerms: [ "log out", "logout", "leave", "exit", "arrow" ]
        }, {
            title: "fas fa-sign-out-alt",
            searchTerms: [ "log out", "logout", "leave", "exit", "arrow", "sign-out" ]
        }, {
            title: "far fa-sign-out-alt",
            searchTerms: [ "log out", "logout", "leave", "exit", "arrow", "sign-out" ]
        }, {
            title: "fal fa-sign-out-alt",
            searchTerms: [ "log out", "logout", "leave", "exit", "arrow", "sign-out" ]
        }, {
            title: "fas fa-signal",
            searchTerms: [ "graph", "bars", "status", "online" ]
        }, {
            title: "far fa-signal",
            searchTerms: [ "graph", "bars", "status", "online" ]
        }, {
            title: "fal fa-signal",
            searchTerms: [ "graph", "bars", "status", "online" ]
        }, {
            title: "fab fa-simplybuilt",
            searchTerms: []
        }, {
            title: "fab fa-sistrix",
            searchTerms: []
        }, {
            title: "fas fa-sitemap",
            searchTerms: [ "directory", "hierarchy", "organization" ]
        }, {
            title: "far fa-sitemap",
            searchTerms: [ "directory", "hierarchy", "organization" ]
        }, {
            title: "fal fa-sitemap",
            searchTerms: [ "directory", "hierarchy", "organization" ]
        }, {
            title: "fab fa-skyatlas",
            searchTerms: []
        }, {
            title: "fab fa-skype",
            searchTerms: []
        }, {
            title: "fab fa-slack",
            searchTerms: [ "hashtag", "anchor", "hash" ]
        }, {
            title: "fab fa-slack-hash",
            searchTerms: [ "hashtag", "anchor", "hash" ]
        }, {
            title: "fas fa-sliders-h",
            searchTerms: [ "settings", "sliders" ]
        }, {
            title: "far fa-sliders-h",
            searchTerms: [ "settings", "sliders" ]
        }, {
            title: "fal fa-sliders-h",
            searchTerms: [ "settings", "sliders" ]
        }, {
            title: "fas fa-sliders-h-square",
            searchTerms: []
        }, {
            title: "far fa-sliders-h-square",
            searchTerms: []
        }, {
            title: "fal fa-sliders-h-square",
            searchTerms: []
        }, {
            title: "fas fa-sliders-v",
            searchTerms: []
        }, {
            title: "far fa-sliders-v",
            searchTerms: []
        }, {
            title: "fal fa-sliders-v",
            searchTerms: []
        }, {
            title: "fas fa-sliders-v-square",
            searchTerms: []
        }, {
            title: "far fa-sliders-v-square",
            searchTerms: []
        }, {
            title: "fal fa-sliders-v-square",
            searchTerms: []
        }, {
            title: "fab fa-slideshare",
            searchTerms: []
        }, {
            title: "fas fa-smile",
            searchTerms: [ "face", "emoticon", "happy", "approve", "satisfied", "rating" ]
        }, {
            title: "far fa-smile",
            searchTerms: [ "face", "emoticon", "happy", "approve", "satisfied", "rating" ]
        }, {
            title: "fal fa-smile",
            searchTerms: [ "face", "emoticon", "happy", "approve", "satisfied", "rating" ]
        }, {
            title: "fas fa-smile-plus",
            searchTerms: []
        }, {
            title: "far fa-smile-plus",
            searchTerms: []
        }, {
            title: "fal fa-smile-plus",
            searchTerms: []
        }, {
            title: "fas fa-smoking",
            searchTerms: [ "smoking status", "cigarette", "nicotine" ]
        }, {
            title: "far fa-smoking",
            searchTerms: [ "smoking status", "cigarette", "nicotine" ]
        }, {
            title: "fal fa-smoking",
            searchTerms: [ "smoking status", "cigarette", "nicotine" ]
        }, {
            title: "fab fa-snapchat",
            searchTerms: []
        }, {
            title: "fab fa-snapchat-ghost",
            searchTerms: []
        }, {
            title: "fab fa-snapchat-square",
            searchTerms: []
        }, {
            title: "fas fa-snowflake",
            searchTerms: []
        }, {
            title: "far fa-snowflake",
            searchTerms: []
        }, {
            title: "fal fa-snowflake",
            searchTerms: []
        }, {
            title: "fas fa-sort",
            searchTerms: [ "order" ]
        }, {
            title: "far fa-sort",
            searchTerms: [ "order" ]
        }, {
            title: "fal fa-sort",
            searchTerms: [ "order" ]
        }, {
            title: "fas fa-sort-alpha-down",
            searchTerms: [ "sort-alpha-asc" ]
        }, {
            title: "far fa-sort-alpha-down",
            searchTerms: [ "sort-alpha-asc" ]
        }, {
            title: "fal fa-sort-alpha-down",
            searchTerms: [ "sort-alpha-asc" ]
        }, {
            title: "fas fa-sort-alpha-up",
            searchTerms: [ "sort-alpha-desc" ]
        }, {
            title: "far fa-sort-alpha-up",
            searchTerms: [ "sort-alpha-desc" ]
        }, {
            title: "fal fa-sort-alpha-up",
            searchTerms: [ "sort-alpha-desc" ]
        }, {
            title: "fas fa-sort-amount-down",
            searchTerms: [ "sort-amount-asc" ]
        }, {
            title: "far fa-sort-amount-down",
            searchTerms: [ "sort-amount-asc" ]
        }, {
            title: "fal fa-sort-amount-down",
            searchTerms: [ "sort-amount-asc" ]
        }, {
            title: "fas fa-sort-amount-up",
            searchTerms: [ "sort-amount-desc" ]
        }, {
            title: "far fa-sort-amount-up",
            searchTerms: [ "sort-amount-desc" ]
        }, {
            title: "fal fa-sort-amount-up",
            searchTerms: [ "sort-amount-desc" ]
        }, {
            title: "fas fa-sort-down",
            searchTerms: [ "arrow", "descending", "sort-desc" ]
        }, {
            title: "far fa-sort-down",
            searchTerms: [ "arrow", "descending", "sort-desc" ]
        }, {
            title: "fal fa-sort-down",
            searchTerms: [ "arrow", "descending", "sort-desc" ]
        }, {
            title: "fas fa-sort-numeric-down",
            searchTerms: [ "numbers", "sort-numeric-asc" ]
        }, {
            title: "far fa-sort-numeric-down",
            searchTerms: [ "numbers", "sort-numeric-asc" ]
        }, {
            title: "fal fa-sort-numeric-down",
            searchTerms: [ "numbers", "sort-numeric-asc" ]
        }, {
            title: "fas fa-sort-numeric-up",
            searchTerms: [ "numbers", "sort-numeric-desc" ]
        }, {
            title: "far fa-sort-numeric-up",
            searchTerms: [ "numbers", "sort-numeric-desc" ]
        }, {
            title: "fal fa-sort-numeric-up",
            searchTerms: [ "numbers", "sort-numeric-desc" ]
        }, {
            title: "fas fa-sort-up",
            searchTerms: [ "arrow", "ascending", "sort-asc" ]
        }, {
            title: "far fa-sort-up",
            searchTerms: [ "arrow", "ascending", "sort-asc" ]
        }, {
            title: "fal fa-sort-up",
            searchTerms: [ "arrow", "ascending", "sort-asc" ]
        }, {
            title: "fab fa-soundcloud",
            searchTerms: []
        }, {
            title: "fas fa-space-shuttle",
            searchTerms: [ "nasa", "astronaut", "rocket", "machine", "transportation" ]
        }, {
            title: "far fa-space-shuttle",
            searchTerms: [ "nasa", "astronaut", "rocket", "machine", "transportation" ]
        }, {
            title: "fal fa-space-shuttle",
            searchTerms: [ "nasa", "astronaut", "rocket", "machine", "transportation" ]
        }, {
            title: "fas fa-spade",
            searchTerms: []
        }, {
            title: "far fa-spade",
            searchTerms: []
        }, {
            title: "fal fa-spade",
            searchTerms: []
        }, {
            title: "fab fa-speakap",
            searchTerms: []
        }, {
            title: "fas fa-spinner",
            searchTerms: [ "loading", "progress" ]
        }, {
            title: "far fa-spinner",
            searchTerms: [ "loading", "progress" ]
        }, {
            title: "fal fa-spinner",
            searchTerms: [ "loading", "progress" ]
        }, {
            title: "fas fa-spinner-third",
            searchTerms: []
        }, {
            title: "far fa-spinner-third",
            searchTerms: []
        }, {
            title: "fal fa-spinner-third",
            searchTerms: []
        }, {
            title: "fab fa-spotify",
            searchTerms: []
        }, {
            title: "fas fa-square",
            searchTerms: [ "block", "box" ]
        }, {
            title: "far fa-square",
            searchTerms: [ "block", "box" ]
        }, {
            title: "fal fa-square",
            searchTerms: [ "block", "box" ]
        }, {
            title: "fas fa-square-full",
            searchTerms: []
        }, {
            title: "far fa-square-full",
            searchTerms: []
        }, {
            title: "fal fa-square-full",
            searchTerms: []
        }, {
            title: "fab fa-stack-exchange",
            searchTerms: []
        }, {
            title: "fab fa-stack-overflow",
            searchTerms: []
        }, {
            title: "fas fa-star",
            searchTerms: [ "award", "achievement", "night", "rating", "score", "favorite" ]
        }, {
            title: "far fa-star",
            searchTerms: [ "award", "achievement", "night", "rating", "score", "favorite" ]
        }, {
            title: "fal fa-star",
            searchTerms: [ "award", "achievement", "night", "rating", "score", "favorite" ]
        }, {
            title: "fas fa-star-exclamation",
            searchTerms: [ "award", "achievement", "night", "rating", "score", "favorite" ]
        }, {
            title: "far fa-star-exclamation",
            searchTerms: [ "award", "achievement", "night", "rating", "score", "favorite" ]
        }, {
            title: "fal fa-star-exclamation",
            searchTerms: [ "award", "achievement", "night", "rating", "score", "favorite" ]
        }, {
            title: "fas fa-star-half",
            searchTerms: [ "award", "achievement", "rating", "score", "star-half-empty", "star-half-full" ]
        }, {
            title: "far fa-star-half",
            searchTerms: [ "award", "achievement", "rating", "score", "star-half-empty", "star-half-full" ]
        }, {
            title: "fal fa-star-half",
            searchTerms: [ "award", "achievement", "rating", "score", "star-half-empty", "star-half-full" ]
        }, {
            title: "fab fa-staylinked",
            searchTerms: []
        }, {
            title: "fab fa-steam",
            searchTerms: []
        }, {
            title: "fab fa-steam-square",
            searchTerms: []
        }, {
            title: "fab fa-steam-symbol",
            searchTerms: []
        }, {
            title: "fas fa-step-backward",
            searchTerms: [ "rewind", "previous", "beginning", "start", "first" ]
        }, {
            title: "far fa-step-backward",
            searchTerms: [ "rewind", "previous", "beginning", "start", "first" ]
        }, {
            title: "fal fa-step-backward",
            searchTerms: [ "rewind", "previous", "beginning", "start", "first" ]
        }, {
            title: "fas fa-step-forward",
            searchTerms: [ "next", "end", "last" ]
        }, {
            title: "far fa-step-forward",
            searchTerms: [ "next", "end", "last" ]
        }, {
            title: "fal fa-step-forward",
            searchTerms: [ "next", "end", "last" ]
        }, {
            title: "fas fa-stethoscope",
            searchTerms: []
        }, {
            title: "far fa-stethoscope",
            searchTerms: []
        }, {
            title: "fal fa-stethoscope",
            searchTerms: []
        }, {
            title: "fab fa-sticker-mule",
            searchTerms: []
        }, {
            title: "fas fa-sticky-note",
            searchTerms: []
        }, {
            title: "far fa-sticky-note",
            searchTerms: []
        }, {
            title: "fal fa-sticky-note",
            searchTerms: []
        }, {
            title: "fas fa-stop",
            searchTerms: [ "block", "box", "square" ]
        }, {
            title: "far fa-stop",
            searchTerms: [ "block", "box", "square" ]
        }, {
            title: "fal fa-stop",
            searchTerms: [ "block", "box", "square" ]
        }, {
            title: "fas fa-stop-circle",
            searchTerms: []
        }, {
            title: "far fa-stop-circle",
            searchTerms: []
        }, {
            title: "fal fa-stop-circle",
            searchTerms: []
        }, {
            title: "fas fa-stopwatch",
            searchTerms: [ "time" ]
        }, {
            title: "far fa-stopwatch",
            searchTerms: [ "time" ]
        }, {
            title: "fal fa-stopwatch",
            searchTerms: [ "time" ]
        }, {
            title: "fab fa-strava",
            searchTerms: []
        }, {
            title: "fas fa-street-view",
            searchTerms: [ "map" ]
        }, {
            title: "far fa-street-view",
            searchTerms: [ "map" ]
        }, {
            title: "fal fa-street-view",
            searchTerms: [ "map" ]
        }, {
            title: "fas fa-strikethrough",
            searchTerms: []
        }, {
            title: "far fa-strikethrough",
            searchTerms: []
        }, {
            title: "fal fa-strikethrough",
            searchTerms: []
        }, {
            title: "fab fa-stripe",
            searchTerms: []
        }, {
            title: "fab fa-stripe-s",
            searchTerms: []
        }, {
            title: "fab fa-studiovinari",
            searchTerms: []
        }, {
            title: "fab fa-stumbleupon",
            searchTerms: []
        }, {
            title: "fab fa-stumbleupon-circle",
            searchTerms: []
        }, {
            title: "fas fa-subscript",
            searchTerms: []
        }, {
            title: "far fa-subscript",
            searchTerms: []
        }, {
            title: "fal fa-subscript",
            searchTerms: []
        }, {
            title: "fas fa-subway",
            searchTerms: [ "vehicle", "train", "railway", "machine", "transportation" ]
        }, {
            title: "far fa-subway",
            searchTerms: [ "vehicle", "train", "railway", "machine", "transportation" ]
        }, {
            title: "fal fa-subway",
            searchTerms: [ "vehicle", "train", "railway", "machine", "transportation" ]
        }, {
            title: "fas fa-suitcase",
            searchTerms: [ "trip", "luggage", "travel", "move", "baggage" ]
        }, {
            title: "far fa-suitcase",
            searchTerms: [ "trip", "luggage", "travel", "move", "baggage" ]
        }, {
            title: "fal fa-suitcase",
            searchTerms: [ "trip", "luggage", "travel", "move", "baggage" ]
        }, {
            title: "fas fa-sun",
            searchTerms: [ "weather", "contrast", "lighter", "brighten", "day" ]
        }, {
            title: "far fa-sun",
            searchTerms: [ "weather", "contrast", "lighter", "brighten", "day" ]
        }, {
            title: "fal fa-sun",
            searchTerms: [ "weather", "contrast", "lighter", "brighten", "day" ]
        }, {
            title: "fab fa-superpowers",
            searchTerms: []
        }, {
            title: "fas fa-superscript",
            searchTerms: [ "exponential" ]
        }, {
            title: "far fa-superscript",
            searchTerms: [ "exponential" ]
        }, {
            title: "fal fa-superscript",
            searchTerms: [ "exponential" ]
        }, {
            title: "fab fa-supple",
            searchTerms: []
        }, {
            title: "fas fa-sync",
            searchTerms: [ "reload", "refresh", "exchange", "swap" ]
        }, {
            title: "far fa-sync",
            searchTerms: [ "reload", "refresh", "exchange", "swap" ]
        }, {
            title: "fal fa-sync",
            searchTerms: [ "reload", "refresh", "exchange", "swap" ]
        }, {
            title: "fas fa-sync-alt",
            searchTerms: [ "reload", "refresh" ]
        }, {
            title: "far fa-sync-alt",
            searchTerms: [ "reload", "refresh" ]
        }, {
            title: "fal fa-sync-alt",
            searchTerms: [ "reload", "refresh" ]
        }, {
            title: "fas fa-syringe",
            searchTerms: [ "immunizations", "needle" ]
        }, {
            title: "far fa-syringe",
            searchTerms: [ "immunizations", "needle" ]
        }, {
            title: "fal fa-syringe",
            searchTerms: [ "immunizations", "needle" ]
        }, {
            title: "fas fa-table",
            searchTerms: [ "data", "excel", "spreadsheet" ]
        }, {
            title: "far fa-table",
            searchTerms: [ "data", "excel", "spreadsheet" ]
        }, {
            title: "fal fa-table",
            searchTerms: [ "data", "excel", "spreadsheet" ]
        }, {
            title: "fas fa-table-tennis",
            searchTerms: []
        }, {
            title: "far fa-table-tennis",
            searchTerms: []
        }, {
            title: "fal fa-table-tennis",
            searchTerms: []
        }, {
            title: "fas fa-tablet",
            searchTerms: [ "device", "screen", "apple", "ipad", "kindle" ]
        }, {
            title: "far fa-tablet",
            searchTerms: [ "device", "screen", "apple", "ipad", "kindle" ]
        }, {
            title: "fal fa-tablet",
            searchTerms: [ "device", "screen", "apple", "ipad", "kindle" ]
        }, {
            title: "fas fa-tablet-alt",
            searchTerms: [ "device", "screen", "apple", "ipad", "kindle" ]
        }, {
            title: "far fa-tablet-alt",
            searchTerms: [ "device", "screen", "apple", "ipad", "kindle" ]
        }, {
            title: "fal fa-tablet-alt",
            searchTerms: [ "device", "screen", "apple", "ipad", "kindle" ]
        }, {
            title: "fas fa-tablet-android",
            searchTerms: [ "device", "screen" ]
        }, {
            title: "far fa-tablet-android",
            searchTerms: [ "device", "screen" ]
        }, {
            title: "fal fa-tablet-android",
            searchTerms: [ "device", "screen" ]
        }, {
            title: "fas fa-tablet-android-alt",
            searchTerms: [ "device", "screen" ]
        }, {
            title: "far fa-tablet-android-alt",
            searchTerms: [ "device", "screen" ]
        }, {
            title: "fal fa-tablet-android-alt",
            searchTerms: [ "device", "screen" ]
        }, {
            title: "fas fa-tablet-rugged",
            searchTerms: [ "device", "screen", "tough", "durable" ]
        }, {
            title: "far fa-tablet-rugged",
            searchTerms: [ "device", "screen", "tough", "durable" ]
        }, {
            title: "fal fa-tablet-rugged",
            searchTerms: [ "device", "screen", "tough", "durable" ]
        }, {
            title: "fas fa-tablets",
            searchTerms: [ "medicine", "drugs" ]
        }, {
            title: "far fa-tablets",
            searchTerms: [ "medicine", "drugs" ]
        }, {
            title: "fal fa-tablets",
            searchTerms: [ "medicine", "drugs" ]
        }, {
            title: "fas fa-tachometer",
            searchTerms: [ "speedometer", "fast", "dashboard" ]
        }, {
            title: "far fa-tachometer",
            searchTerms: [ "speedometer", "fast", "dashboard" ]
        }, {
            title: "fal fa-tachometer",
            searchTerms: [ "speedometer", "fast", "dashboard" ]
        }, {
            title: "fas fa-tachometer-alt",
            searchTerms: [ "tachometer", "dashboard" ]
        }, {
            title: "far fa-tachometer-alt",
            searchTerms: [ "tachometer", "dashboard" ]
        }, {
            title: "fal fa-tachometer-alt",
            searchTerms: [ "tachometer", "dashboard" ]
        }, {
            title: "fas fa-tag",
            searchTerms: [ "label" ]
        }, {
            title: "far fa-tag",
            searchTerms: [ "label" ]
        }, {
            title: "fal fa-tag",
            searchTerms: [ "label" ]
        }, {
            title: "fas fa-tags",
            searchTerms: [ "labels" ]
        }, {
            title: "far fa-tags",
            searchTerms: [ "labels" ]
        }, {
            title: "fal fa-tags",
            searchTerms: [ "labels" ]
        }, {
            title: "fas fa-tape",
            searchTerms: []
        }, {
            title: "far fa-tape",
            searchTerms: []
        }, {
            title: "fal fa-tape",
            searchTerms: []
        }, {
            title: "fas fa-tasks",
            searchTerms: [ "progress", "loading", "downloading", "downloads", "settings" ]
        }, {
            title: "far fa-tasks",
            searchTerms: [ "progress", "loading", "downloading", "downloads", "settings" ]
        }, {
            title: "fal fa-tasks",
            searchTerms: [ "progress", "loading", "downloading", "downloads", "settings" ]
        }, {
            title: "fas fa-taxi",
            searchTerms: [ "vehicle", "machine", "transportation", "cab", "cabbie", "car", "uber", "lyft", "car service" ]
        }, {
            title: "far fa-taxi",
            searchTerms: [ "vehicle", "machine", "transportation", "cab", "cabbie", "car", "uber", "lyft", "car service" ]
        }, {
            title: "fal fa-taxi",
            searchTerms: [ "vehicle", "machine", "transportation", "cab", "cabbie", "car", "uber", "lyft", "car service" ]
        }, {
            title: "fab fa-telegram",
            searchTerms: []
        }, {
            title: "fab fa-telegram-plane",
            searchTerms: []
        }, {
            title: "fab fa-tencent-weibo",
            searchTerms: []
        }, {
            title: "fas fa-tennis-ball",
            searchTerms: []
        }, {
            title: "far fa-tennis-ball",
            searchTerms: []
        }, {
            title: "fal fa-tennis-ball",
            searchTerms: []
        }, {
            title: "fas fa-terminal",
            searchTerms: [ "command", "prompt", "code", "console" ]
        }, {
            title: "far fa-terminal",
            searchTerms: [ "command", "prompt", "code", "console" ]
        }, {
            title: "fal fa-terminal",
            searchTerms: [ "command", "prompt", "code", "console" ]
        }, {
            title: "fas fa-text-height",
            searchTerms: []
        }, {
            title: "far fa-text-height",
            searchTerms: []
        }, {
            title: "fal fa-text-height",
            searchTerms: []
        }, {
            title: "fas fa-text-width",
            searchTerms: []
        }, {
            title: "far fa-text-width",
            searchTerms: []
        }, {
            title: "fal fa-text-width",
            searchTerms: []
        }, {
            title: "fas fa-th",
            searchTerms: [ "blocks", "squares", "boxes", "grid" ]
        }, {
            title: "far fa-th",
            searchTerms: [ "blocks", "squares", "boxes", "grid" ]
        }, {
            title: "fal fa-th",
            searchTerms: [ "blocks", "squares", "boxes", "grid" ]
        }, {
            title: "fas fa-th-large",
            searchTerms: [ "blocks", "squares", "boxes", "grid" ]
        }, {
            title: "far fa-th-large",
            searchTerms: [ "blocks", "squares", "boxes", "grid" ]
        }, {
            title: "fal fa-th-large",
            searchTerms: [ "blocks", "squares", "boxes", "grid" ]
        }, {
            title: "fas fa-th-list",
            searchTerms: [ "ul", "ol", "checklist", "finished", "completed", "done", "todo" ]
        }, {
            title: "far fa-th-list",
            searchTerms: [ "ul", "ol", "checklist", "finished", "completed", "done", "todo" ]
        }, {
            title: "fal fa-th-list",
            searchTerms: [ "ul", "ol", "checklist", "finished", "completed", "done", "todo" ]
        }, {
            title: "fab fa-themeisle",
            searchTerms: []
        }, {
            title: "fas fa-thermometer",
            searchTerms: [ "temperature", "fever" ]
        }, {
            title: "far fa-thermometer",
            searchTerms: [ "temperature", "fever" ]
        }, {
            title: "fal fa-thermometer",
            searchTerms: [ "temperature", "fever" ]
        }, {
            title: "fas fa-thermometer-empty",
            searchTerms: [ "status" ]
        }, {
            title: "far fa-thermometer-empty",
            searchTerms: [ "status" ]
        }, {
            title: "fal fa-thermometer-empty",
            searchTerms: [ "status" ]
        }, {
            title: "fas fa-thermometer-full",
            searchTerms: [ "status" ]
        }, {
            title: "far fa-thermometer-full",
            searchTerms: [ "status" ]
        }, {
            title: "fal fa-thermometer-full",
            searchTerms: [ "status" ]
        }, {
            title: "fas fa-thermometer-half",
            searchTerms: [ "status" ]
        }, {
            title: "far fa-thermometer-half",
            searchTerms: [ "status" ]
        }, {
            title: "fal fa-thermometer-half",
            searchTerms: [ "status" ]
        }, {
            title: "fas fa-thermometer-quarter",
            searchTerms: [ "status" ]
        }, {
            title: "far fa-thermometer-quarter",
            searchTerms: [ "status" ]
        }, {
            title: "fal fa-thermometer-quarter",
            searchTerms: [ "status" ]
        }, {
            title: "fas fa-thermometer-three-quarters",
            searchTerms: [ "status" ]
        }, {
            title: "far fa-thermometer-three-quarters",
            searchTerms: [ "status" ]
        }, {
            title: "fal fa-thermometer-three-quarters",
            searchTerms: [ "status" ]
        }, {
            title: "fas fa-thumbs-down",
            searchTerms: [ "dislike", "disapprove", "disagree", "hand", "thumbs-o-down" ]
        }, {
            title: "far fa-thumbs-down",
            searchTerms: [ "dislike", "disapprove", "disagree", "hand", "thumbs-o-down" ]
        }, {
            title: "fal fa-thumbs-down",
            searchTerms: [ "dislike", "disapprove", "disagree", "hand", "thumbs-o-down" ]
        }, {
            title: "fas fa-thumbs-up",
            searchTerms: [ "like", "favorite", "approve", "agree", "hand", "thumbs-o-up", "success", "yes", "ok", "okay", "you got it dude" ]
        }, {
            title: "far fa-thumbs-up",
            searchTerms: [ "like", "favorite", "approve", "agree", "hand", "thumbs-o-up", "success", "yes", "ok", "okay", "you got it dude" ]
        }, {
            title: "fal fa-thumbs-up",
            searchTerms: [ "like", "favorite", "approve", "agree", "hand", "thumbs-o-up", "success", "yes", "ok", "okay", "you got it dude" ]
        }, {
            title: "fas fa-thumbtack",
            searchTerms: [ "marker", "pin", "location", "coordinates", "thumb-tack" ]
        }, {
            title: "far fa-thumbtack",
            searchTerms: [ "marker", "pin", "location", "coordinates", "thumb-tack" ]
        }, {
            title: "fal fa-thumbtack",
            searchTerms: [ "marker", "pin", "location", "coordinates", "thumb-tack" ]
        }, {
            title: "fas fa-ticket",
            searchTerms: [ "movie", "pass", "support" ]
        }, {
            title: "far fa-ticket",
            searchTerms: [ "movie", "pass", "support" ]
        }, {
            title: "fal fa-ticket",
            searchTerms: [ "movie", "pass", "support" ]
        }, {
            title: "fas fa-ticket-alt",
            searchTerms: [ "ticket" ]
        }, {
            title: "far fa-ticket-alt",
            searchTerms: [ "ticket" ]
        }, {
            title: "fal fa-ticket-alt",
            searchTerms: [ "ticket" ]
        }, {
            title: "fas fa-times",
            searchTerms: [ "close", "exit", "x", "cross", "error", "problem", "notification", "notify", "notice", "wrong", "incorrect" ]
        }, {
            title: "far fa-times",
            searchTerms: [ "close", "exit", "x", "cross", "error", "problem", "notification", "notify", "notice", "wrong", "incorrect" ]
        }, {
            title: "fal fa-times",
            searchTerms: [ "close", "exit", "x", "cross", "error", "problem", "notification", "notify", "notice", "wrong", "incorrect" ]
        }, {
            title: "fas fa-times-circle",
            searchTerms: [ "close", "exit", "x", "cross", "problem", "notification", "notify", "notice", "wrong", "incorrect" ]
        }, {
            title: "far fa-times-circle",
            searchTerms: [ "close", "exit", "x", "cross", "problem", "notification", "notify", "notice", "wrong", "incorrect" ]
        }, {
            title: "fal fa-times-circle",
            searchTerms: [ "close", "exit", "x", "cross", "problem", "notification", "notify", "notice", "wrong", "incorrect" ]
        }, {
            title: "fas fa-times-hexagon",
            searchTerms: [ "close", "exit", "x", "cross", "problem", "notification", "notify", "notice", "wrong", "incorrect" ]
        }, {
            title: "far fa-times-hexagon",
            searchTerms: [ "close", "exit", "x", "cross", "problem", "notification", "notify", "notice", "wrong", "incorrect" ]
        }, {
            title: "fal fa-times-hexagon",
            searchTerms: [ "close", "exit", "x", "cross", "problem", "notification", "notify", "notice", "wrong", "incorrect" ]
        }, {
            title: "fas fa-times-octagon",
            searchTerms: [ "close", "exit", "x", "cross", "problem", "notification", "notify", "notice", "wrong", "incorrect" ]
        }, {
            title: "far fa-times-octagon",
            searchTerms: [ "close", "exit", "x", "cross", "problem", "notification", "notify", "notice", "wrong", "incorrect" ]
        }, {
            title: "fal fa-times-octagon",
            searchTerms: [ "close", "exit", "x", "cross", "problem", "notification", "notify", "notice", "wrong", "incorrect" ]
        }, {
            title: "fas fa-times-square",
            searchTerms: [ "window", "close", "cross", "problem", "notification", "notify", "notice", "wrong", "incorrect" ]
        }, {
            title: "far fa-times-square",
            searchTerms: [ "window", "close", "cross", "problem", "notification", "notify", "notice", "wrong", "incorrect" ]
        }, {
            title: "fal fa-times-square",
            searchTerms: [ "window", "close", "cross", "problem", "notification", "notify", "notice", "wrong", "incorrect" ]
        }, {
            title: "fas fa-tint",
            searchTerms: [ "raindrop", "waterdrop", "drop", "droplet" ]
        }, {
            title: "far fa-tint",
            searchTerms: [ "raindrop", "waterdrop", "drop", "droplet" ]
        }, {
            title: "fal fa-tint",
            searchTerms: [ "raindrop", "waterdrop", "drop", "droplet" ]
        }, {
            title: "fas fa-toggle-off",
            searchTerms: [ "switch" ]
        }, {
            title: "far fa-toggle-off",
            searchTerms: [ "switch" ]
        }, {
            title: "fal fa-toggle-off",
            searchTerms: [ "switch" ]
        }, {
            title: "fas fa-toggle-on",
            searchTerms: [ "switch" ]
        }, {
            title: "far fa-toggle-on",
            searchTerms: [ "switch" ]
        }, {
            title: "fal fa-toggle-on",
            searchTerms: [ "switch" ]
        }, {
            title: "fas fa-trademark",
            searchTerms: []
        }, {
            title: "far fa-trademark",
            searchTerms: []
        }, {
            title: "fal fa-trademark",
            searchTerms: []
        }, {
            title: "fas fa-train",
            searchTerms: [ "bullet", "locomotive", "railway" ]
        }, {
            title: "far fa-train",
            searchTerms: [ "bullet", "locomotive", "railway" ]
        }, {
            title: "fal fa-train",
            searchTerms: [ "bullet", "locomotive", "railway" ]
        }, {
            title: "fas fa-transgender",
            searchTerms: [ "intersex" ]
        }, {
            title: "far fa-transgender",
            searchTerms: [ "intersex" ]
        }, {
            title: "fal fa-transgender",
            searchTerms: [ "intersex" ]
        }, {
            title: "fas fa-transgender-alt",
            searchTerms: []
        }, {
            title: "far fa-transgender-alt",
            searchTerms: []
        }, {
            title: "fal fa-transgender-alt",
            searchTerms: []
        }, {
            title: "fas fa-trash",
            searchTerms: [ "garbage", "delete", "remove", "hide" ]
        }, {
            title: "far fa-trash",
            searchTerms: [ "garbage", "delete", "remove", "hide" ]
        }, {
            title: "fal fa-trash",
            searchTerms: [ "garbage", "delete", "remove", "hide" ]
        }, {
            title: "fas fa-trash-alt",
            searchTerms: [ "garbage", "delete", "remove", "hide", "trash", "trash-o" ]
        }, {
            title: "far fa-trash-alt",
            searchTerms: [ "garbage", "delete", "remove", "hide", "trash", "trash-o" ]
        }, {
            title: "fal fa-trash-alt",
            searchTerms: [ "garbage", "delete", "remove", "hide", "trash", "trash-o" ]
        }, {
            title: "fas fa-tree",
            searchTerms: []
        }, {
            title: "far fa-tree",
            searchTerms: []
        }, {
            title: "fal fa-tree",
            searchTerms: []
        }, {
            title: "fas fa-tree-alt",
            searchTerms: []
        }, {
            title: "far fa-tree-alt",
            searchTerms: []
        }, {
            title: "fal fa-tree-alt",
            searchTerms: []
        }, {
            title: "fab fa-trello",
            searchTerms: []
        }, {
            title: "fas fa-triangle",
            searchTerms: []
        }, {
            title: "far fa-triangle",
            searchTerms: []
        }, {
            title: "fal fa-triangle",
            searchTerms: []
        }, {
            title: "fab fa-tripadvisor",
            searchTerms: []
        }, {
            title: "fas fa-trophy",
            searchTerms: [ "award", "achievement", "cup", "winner", "game" ]
        }, {
            title: "far fa-trophy",
            searchTerms: [ "award", "achievement", "cup", "winner", "game" ]
        }, {
            title: "fal fa-trophy",
            searchTerms: [ "award", "achievement", "cup", "winner", "game" ]
        }, {
            title: "fas fa-trophy-alt",
            searchTerms: [ "award", "achievement", "cup", "winner", "game", "star" ]
        }, {
            title: "far fa-trophy-alt",
            searchTerms: [ "award", "achievement", "cup", "winner", "game", "star" ]
        }, {
            title: "fal fa-trophy-alt",
            searchTerms: [ "award", "achievement", "cup", "winner", "game", "star" ]
        }, {
            title: "fas fa-truck",
            searchTerms: [ "shipping", "delivery" ]
        }, {
            title: "far fa-truck",
            searchTerms: [ "shipping", "delivery" ]
        }, {
            title: "fal fa-truck",
            searchTerms: [ "shipping", "delivery" ]
        }, {
            title: "fas fa-truck-container",
            searchTerms: []
        }, {
            title: "far fa-truck-container",
            searchTerms: []
        }, {
            title: "fal fa-truck-container",
            searchTerms: []
        }, {
            title: "fas fa-truck-couch",
            searchTerms: []
        }, {
            title: "far fa-truck-couch",
            searchTerms: []
        }, {
            title: "fal fa-truck-couch",
            searchTerms: []
        }, {
            title: "fas fa-truck-loading",
            searchTerms: []
        }, {
            title: "far fa-truck-loading",
            searchTerms: []
        }, {
            title: "fal fa-truck-loading",
            searchTerms: []
        }, {
            title: "fas fa-truck-moving",
            searchTerms: []
        }, {
            title: "far fa-truck-moving",
            searchTerms: []
        }, {
            title: "fal fa-truck-moving",
            searchTerms: []
        }, {
            title: "fas fa-truck-ramp",
            searchTerms: []
        }, {
            title: "far fa-truck-ramp",
            searchTerms: []
        }, {
            title: "fal fa-truck-ramp",
            searchTerms: []
        }, {
            title: "fas fa-tty",
            searchTerms: []
        }, {
            title: "far fa-tty",
            searchTerms: []
        }, {
            title: "fal fa-tty",
            searchTerms: []
        }, {
            title: "fab fa-tumblr",
            searchTerms: []
        }, {
            title: "fab fa-tumblr-square",
            searchTerms: []
        }, {
            title: "fas fa-tv",
            searchTerms: [ "display", "computer", "monitor", "television" ]
        }, {
            title: "far fa-tv",
            searchTerms: [ "display", "computer", "monitor", "television" ]
        }, {
            title: "fal fa-tv",
            searchTerms: [ "display", "computer", "monitor", "television" ]
        }, {
            title: "fas fa-tv-retro",
            searchTerms: []
        }, {
            title: "far fa-tv-retro",
            searchTerms: []
        }, {
            title: "fal fa-tv-retro",
            searchTerms: []
        }, {
            title: "fab fa-twitch",
            searchTerms: []
        }, {
            title: "fab fa-twitter",
            searchTerms: [ "tweet", "social network" ]
        }, {
            title: "fab fa-twitter-square",
            searchTerms: [ "tweet", "social network" ]
        }, {
            title: "fab fa-typo3",
            searchTerms: []
        }, {
            title: "fab fa-uber",
            searchTerms: []
        }, {
            title: "fab fa-uikit",
            searchTerms: []
        }, {
            title: "fas fa-umbrella",
            searchTerms: []
        }, {
            title: "far fa-umbrella",
            searchTerms: []
        }, {
            title: "fal fa-umbrella",
            searchTerms: []
        }, {
            title: "fas fa-underline",
            searchTerms: []
        }, {
            title: "far fa-underline",
            searchTerms: []
        }, {
            title: "fal fa-underline",
            searchTerms: []
        }, {
            title: "fas fa-undo",
            searchTerms: [ "back", "exchange", "swap", "return", "control z", "oops" ]
        }, {
            title: "far fa-undo",
            searchTerms: [ "back", "exchange", "swap", "return", "control z", "oops" ]
        }, {
            title: "fal fa-undo",
            searchTerms: [ "back", "exchange", "swap", "return", "control z", "oops" ]
        }, {
            title: "fas fa-undo-alt",
            searchTerms: [ "back", "exchange", "swap", "return", "control z", "oops" ]
        }, {
            title: "far fa-undo-alt",
            searchTerms: [ "back", "exchange", "swap", "return", "control z", "oops" ]
        }, {
            title: "fal fa-undo-alt",
            searchTerms: [ "back", "exchange", "swap", "return", "control z", "oops" ]
        }, {
            title: "fab fa-uniregistry",
            searchTerms: []
        }, {
            title: "fas fa-universal-access",
            searchTerms: []
        }, {
            title: "far fa-universal-access",
            searchTerms: []
        }, {
            title: "fal fa-universal-access",
            searchTerms: []
        }, {
            title: "fas fa-university",
            searchTerms: [ "bank", "institution" ]
        }, {
            title: "far fa-university",
            searchTerms: [ "bank", "institution" ]
        }, {
            title: "fal fa-university",
            searchTerms: [ "bank", "institution" ]
        }, {
            title: "fas fa-unlink",
            searchTerms: [ "remove", "chain", "chain-broken" ]
        }, {
            title: "far fa-unlink",
            searchTerms: [ "remove", "chain", "chain-broken" ]
        }, {
            title: "fal fa-unlink",
            searchTerms: [ "remove", "chain", "chain-broken" ]
        }, {
            title: "fas fa-unlock",
            searchTerms: [ "protect", "admin", "password", "lock" ]
        }, {
            title: "far fa-unlock",
            searchTerms: [ "protect", "admin", "password", "lock" ]
        }, {
            title: "fal fa-unlock",
            searchTerms: [ "protect", "admin", "password", "lock" ]
        }, {
            title: "fas fa-unlock-alt",
            searchTerms: [ "protect", "admin", "password", "lock" ]
        }, {
            title: "far fa-unlock-alt",
            searchTerms: [ "protect", "admin", "password", "lock" ]
        }, {
            title: "fal fa-unlock-alt",
            searchTerms: [ "protect", "admin", "password", "lock" ]
        }, {
            title: "fab fa-untappd",
            searchTerms: []
        }, {
            title: "fas fa-upload",
            searchTerms: [ "import" ]
        }, {
            title: "far fa-upload",
            searchTerms: [ "import" ]
        }, {
            title: "fal fa-upload",
            searchTerms: [ "import" ]
        }, {
            title: "fab fa-usb",
            searchTerms: []
        }, {
            title: "fas fa-usd-circle",
            searchTerms: [ "price" ]
        }, {
            title: "far fa-usd-circle",
            searchTerms: [ "price" ]
        }, {
            title: "fal fa-usd-circle",
            searchTerms: [ "price" ]
        }, {
            title: "fas fa-usd-square",
            searchTerms: [ "price" ]
        }, {
            title: "far fa-usd-square",
            searchTerms: [ "price" ]
        }, {
            title: "fal fa-usd-square",
            searchTerms: [ "price" ]
        }, {
            title: "fas fa-user",
            searchTerms: [ "person", "man", "head", "profile", "account" ]
        }, {
            title: "far fa-user",
            searchTerms: [ "person", "man", "head", "profile", "account" ]
        }, {
            title: "fal fa-user",
            searchTerms: [ "person", "man", "head", "profile", "account" ]
        }, {
            title: "fas fa-user-alt",
            searchTerms: [ "person", "man", "head", "profile", "account" ]
        }, {
            title: "far fa-user-alt",
            searchTerms: [ "person", "man", "head", "profile", "account" ]
        }, {
            title: "fal fa-user-alt",
            searchTerms: [ "person", "man", "head", "profile", "account" ]
        }, {
            title: "fas fa-user-circle",
            searchTerms: [ "person", "man", "head", "profile", "account" ]
        }, {
            title: "far fa-user-circle",
            searchTerms: [ "person", "man", "head", "profile", "account" ]
        }, {
            title: "fal fa-user-circle",
            searchTerms: [ "person", "man", "head", "profile", "account" ]
        }, {
            title: "fas fa-user-md",
            searchTerms: [ "doctor", "profile", "medical", "nurse", "job", "occupation" ]
        }, {
            title: "far fa-user-md",
            searchTerms: [ "doctor", "profile", "medical", "nurse", "job", "occupation" ]
        }, {
            title: "fal fa-user-md",
            searchTerms: [ "doctor", "profile", "medical", "nurse", "job", "occupation" ]
        }, {
            title: "fas fa-user-plus",
            searchTerms: [ "sign up", "signup" ]
        }, {
            title: "far fa-user-plus",
            searchTerms: [ "sign up", "signup" ]
        }, {
            title: "fal fa-user-plus",
            searchTerms: [ "sign up", "signup" ]
        }, {
            title: "fas fa-user-secret",
            searchTerms: [ "whisper", "spy", "incognito", "privacy" ]
        }, {
            title: "far fa-user-secret",
            searchTerms: [ "whisper", "spy", "incognito", "privacy" ]
        }, {
            title: "fal fa-user-secret",
            searchTerms: [ "whisper", "spy", "incognito", "privacy" ]
        }, {
            title: "fas fa-user-times",
            searchTerms: []
        }, {
            title: "far fa-user-times",
            searchTerms: []
        }, {
            title: "fal fa-user-times",
            searchTerms: []
        }, {
            title: "fas fa-users",
            searchTerms: [ "people", "profiles", "persons" ]
        }, {
            title: "far fa-users",
            searchTerms: [ "people", "profiles", "persons" ]
        }, {
            title: "fal fa-users",
            searchTerms: [ "people", "profiles", "persons" ]
        }, {
            title: "fab fa-ussunnah",
            searchTerms: []
        }, {
            title: "fas fa-utensil-fork",
            searchTerms: []
        }, {
            title: "far fa-utensil-fork",
            searchTerms: []
        }, {
            title: "fal fa-utensil-fork",
            searchTerms: []
        }, {
            title: "fas fa-utensil-knife",
            searchTerms: []
        }, {
            title: "far fa-utensil-knife",
            searchTerms: []
        }, {
            title: "fal fa-utensil-knife",
            searchTerms: []
        }, {
            title: "fas fa-utensil-spoon",
            searchTerms: [ "spoon" ]
        }, {
            title: "far fa-utensil-spoon",
            searchTerms: [ "spoon" ]
        }, {
            title: "fal fa-utensil-spoon",
            searchTerms: [ "spoon" ]
        }, {
            title: "fas fa-utensils",
            searchTerms: [ "food", "restaurant", "spoon", "knife", "dinner", "eat", "cutlery" ]
        }, {
            title: "far fa-utensils",
            searchTerms: [ "food", "restaurant", "spoon", "knife", "dinner", "eat", "cutlery" ]
        }, {
            title: "fal fa-utensils",
            searchTerms: [ "food", "restaurant", "spoon", "knife", "dinner", "eat", "cutlery" ]
        }, {
            title: "fas fa-utensils-alt",
            searchTerms: []
        }, {
            title: "far fa-utensils-alt",
            searchTerms: []
        }, {
            title: "fal fa-utensils-alt",
            searchTerms: []
        }, {
            title: "fab fa-vaadin",
            searchTerms: []
        }, {
            title: "fas fa-venus",
            searchTerms: [ "female" ]
        }, {
            title: "far fa-venus",
            searchTerms: [ "female" ]
        }, {
            title: "fal fa-venus",
            searchTerms: [ "female" ]
        }, {
            title: "fas fa-venus-double",
            searchTerms: []
        }, {
            title: "far fa-venus-double",
            searchTerms: []
        }, {
            title: "fal fa-venus-double",
            searchTerms: []
        }, {
            title: "fas fa-venus-mars",
            searchTerms: []
        }, {
            title: "far fa-venus-mars",
            searchTerms: []
        }, {
            title: "fal fa-venus-mars",
            searchTerms: []
        }, {
            title: "fab fa-viacoin",
            searchTerms: []
        }, {
            title: "fab fa-viadeo",
            searchTerms: []
        }, {
            title: "fab fa-viadeo-square",
            searchTerms: []
        }, {
            title: "fas fa-vial",
            searchTerms: [ "test tube" ]
        }, {
            title: "far fa-vial",
            searchTerms: [ "test tube" ]
        }, {
            title: "fal fa-vial",
            searchTerms: [ "test tube" ]
        }, {
            title: "fas fa-vials",
            searchTerms: [ "lab results", "test tubes" ]
        }, {
            title: "far fa-vials",
            searchTerms: [ "lab results", "test tubes" ]
        }, {
            title: "fal fa-vials",
            searchTerms: [ "lab results", "test tubes" ]
        }, {
            title: "fab fa-viber",
            searchTerms: []
        }, {
            title: "fas fa-video",
            searchTerms: [ "film", "movie", "record", "camera", "video-camera" ]
        }, {
            title: "far fa-video",
            searchTerms: [ "film", "movie", "record", "camera", "video-camera" ]
        }, {
            title: "fal fa-video",
            searchTerms: [ "film", "movie", "record", "camera", "video-camera" ]
        }, {
            title: "fas fa-video-plus",
            searchTerms: []
        }, {
            title: "far fa-video-plus",
            searchTerms: []
        }, {
            title: "fal fa-video-plus",
            searchTerms: []
        }, {
            title: "fas fa-video-slash",
            searchTerms: []
        }, {
            title: "far fa-video-slash",
            searchTerms: []
        }, {
            title: "fal fa-video-slash",
            searchTerms: []
        }, {
            title: "fab fa-vimeo",
            searchTerms: []
        }, {
            title: "fab fa-vimeo-square",
            searchTerms: []
        }, {
            title: "fab fa-vimeo-v",
            searchTerms: [ "vimeo" ]
        }, {
            title: "fab fa-vine",
            searchTerms: []
        }, {
            title: "fab fa-vk",
            searchTerms: []
        }, {
            title: "fab fa-vnv",
            searchTerms: []
        }, {
            title: "fas fa-volleyball-ball",
            searchTerms: []
        }, {
            title: "far fa-volleyball-ball",
            searchTerms: []
        }, {
            title: "fal fa-volleyball-ball",
            searchTerms: []
        }, {
            title: "fas fa-volume-down",
            searchTerms: [ "audio", "lower", "quieter", "sound", "music", "speaker" ]
        }, {
            title: "far fa-volume-down",
            searchTerms: [ "audio", "lower", "quieter", "sound", "music", "speaker" ]
        }, {
            title: "fal fa-volume-down",
            searchTerms: [ "audio", "lower", "quieter", "sound", "music", "speaker" ]
        }, {
            title: "fas fa-volume-mute",
            searchTerms: [ "audio", "mute", "sound", "music" ]
        }, {
            title: "far fa-volume-mute",
            searchTerms: [ "audio", "mute", "sound", "music" ]
        }, {
            title: "fal fa-volume-mute",
            searchTerms: [ "audio", "mute", "sound", "music" ]
        }, {
            title: "fas fa-volume-off",
            searchTerms: [ "audio", "mute", "sound", "music" ]
        }, {
            title: "far fa-volume-off",
            searchTerms: [ "audio", "mute", "sound", "music" ]
        }, {
            title: "fal fa-volume-off",
            searchTerms: [ "audio", "mute", "sound", "music" ]
        }, {
            title: "fas fa-volume-up",
            searchTerms: [ "audio", "higher", "louder", "sound", "music", "speaker" ]
        }, {
            title: "far fa-volume-up",
            searchTerms: [ "audio", "higher", "louder", "sound", "music", "speaker" ]
        }, {
            title: "fal fa-volume-up",
            searchTerms: [ "audio", "higher", "louder", "sound", "music", "speaker" ]
        }, {
            title: "fab fa-vuejs",
            searchTerms: []
        }, {
            title: "fas fa-warehouse",
            searchTerms: []
        }, {
            title: "far fa-warehouse",
            searchTerms: []
        }, {
            title: "fal fa-warehouse",
            searchTerms: []
        }, {
            title: "fas fa-warehouse-alt",
            searchTerms: []
        }, {
            title: "far fa-warehouse-alt",
            searchTerms: []
        }, {
            title: "fal fa-warehouse-alt",
            searchTerms: []
        }, {
            title: "fas fa-watch",
            searchTerms: []
        }, {
            title: "far fa-watch",
            searchTerms: []
        }, {
            title: "fal fa-watch",
            searchTerms: []
        }, {
            title: "fab fa-weibo",
            searchTerms: []
        }, {
            title: "fas fa-weight",
            searchTerms: [ "scale" ]
        }, {
            title: "far fa-weight",
            searchTerms: [ "scale" ]
        }, {
            title: "fal fa-weight",
            searchTerms: [ "scale" ]
        }, {
            title: "fab fa-weixin",
            searchTerms: []
        }, {
            title: "fab fa-whatsapp",
            searchTerms: []
        }, {
            title: "fab fa-whatsapp-square",
            searchTerms: []
        }, {
            title: "fas fa-wheelchair",
            searchTerms: [ "handicap", "person" ]
        }, {
            title: "far fa-wheelchair",
            searchTerms: [ "handicap", "person" ]
        }, {
            title: "fal fa-wheelchair",
            searchTerms: [ "handicap", "person" ]
        }, {
            title: "fas fa-whistle",
            searchTerms: []
        }, {
            title: "far fa-whistle",
            searchTerms: []
        }, {
            title: "fal fa-whistle",
            searchTerms: []
        }, {
            title: "fab fa-whmcs",
            searchTerms: []
        }, {
            title: "fas fa-wifi",
            searchTerms: []
        }, {
            title: "far fa-wifi",
            searchTerms: []
        }, {
            title: "fal fa-wifi",
            searchTerms: []
        }, {
            title: "fab fa-wikipedia-w",
            searchTerms: []
        }, {
            title: "fas fa-window",
            searchTerms: []
        }, {
            title: "far fa-window",
            searchTerms: []
        }, {
            title: "fal fa-window",
            searchTerms: []
        }, {
            title: "fas fa-window-alt",
            searchTerms: []
        }, {
            title: "far fa-window-alt",
            searchTerms: []
        }, {
            title: "fal fa-window-alt",
            searchTerms: []
        }, {
            title: "fas fa-window-close",
            searchTerms: []
        }, {
            title: "far fa-window-close",
            searchTerms: []
        }, {
            title: "fal fa-window-close",
            searchTerms: []
        }, {
            title: "fas fa-window-maximize",
            searchTerms: []
        }, {
            title: "far fa-window-maximize",
            searchTerms: []
        }, {
            title: "fal fa-window-maximize",
            searchTerms: []
        }, {
            title: "fas fa-window-minimize",
            searchTerms: []
        }, {
            title: "far fa-window-minimize",
            searchTerms: []
        }, {
            title: "fal fa-window-minimize",
            searchTerms: []
        }, {
            title: "fas fa-window-restore",
            searchTerms: []
        }, {
            title: "far fa-window-restore",
            searchTerms: []
        }, {
            title: "fal fa-window-restore",
            searchTerms: []
        }, {
            title: "fab fa-windows",
            searchTerms: [ "microsoft" ]
        }, {
            title: "fas fa-wine-glass",
            searchTerms: []
        }, {
            title: "far fa-wine-glass",
            searchTerms: []
        }, {
            title: "fal fa-wine-glass",
            searchTerms: []
        }, {
            title: "fas fa-won-sign",
            searchTerms: [ "krw", "krw" ]
        }, {
            title: "far fa-won-sign",
            searchTerms: [ "krw", "krw" ]
        }, {
            title: "fal fa-won-sign",
            searchTerms: [ "krw", "krw" ]
        }, {
            title: "fab fa-wordpress",
            searchTerms: []
        }, {
            title: "fab fa-wordpress-simple",
            searchTerms: []
        }, {
            title: "fab fa-wpbeginner",
            searchTerms: []
        }, {
            title: "fab fa-wpexplorer",
            searchTerms: []
        }, {
            title: "fab fa-wpforms",
            searchTerms: []
        }, {
            title: "fas fa-wrench",
            searchTerms: [ "settings", "fix", "update", "spanner", "tool" ]
        }, {
            title: "far fa-wrench",
            searchTerms: [ "settings", "fix", "update", "spanner", "tool" ]
        }, {
            title: "fal fa-wrench",
            searchTerms: [ "settings", "fix", "update", "spanner", "tool" ]
        }, {
            title: "fas fa-x-ray",
            searchTerms: [ "radiological images", "radiology" ]
        }, {
            title: "far fa-x-ray",
            searchTerms: [ "radiological images", "radiology" ]
        }, {
            title: "fal fa-x-ray",
            searchTerms: [ "radiological images", "radiology" ]
        }, {
            title: "fab fa-xbox",
            searchTerms: []
        }, {
            title: "fab fa-xing",
            searchTerms: []
        }, {
            title: "fab fa-xing-square",
            searchTerms: []
        }, {
            title: "fab fa-y-combinator",
            searchTerms: []
        }, {
            title: "fab fa-yahoo",
            searchTerms: []
        }, {
            title: "fab fa-yandex",
            searchTerms: []
        }, {
            title: "fab fa-yandex-international",
            searchTerms: []
        }, {
            title: "fab fa-yelp",
            searchTerms: []
        }, {
            title: "fas fa-yen-sign",
            searchTerms: [ "jpy", "jpy" ]
        }, {
            title: "far fa-yen-sign",
            searchTerms: [ "jpy", "jpy" ]
        }, {
            title: "fal fa-yen-sign",
            searchTerms: [ "jpy", "jpy" ]
        }, {
            title: "fab fa-yoast",
            searchTerms: []
        }, {
            title: "fab fa-youtube",
            searchTerms: [ "video", "film", "youtube-play", "youtube-square" ]
        }, {
            title: "fab fa-youtube-square",
            searchTerms: []
        } ]
    });
});