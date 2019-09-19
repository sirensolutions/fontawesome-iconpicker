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
        replaceOriginalIcons: false,
        customIcons: [],
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
            var d = a(this.options.templates.iconpickerItem);
            if (b.options.replaceOriginalIcons && b.options.customIcons.length > 0) {
                b.options.icons = b.options.customIcons;
            }
            if (!b.options.replaceOriginalIcons) {
                b.options.icons = b.options.icons.concat(b.options.customIcons);
            }
            var e = [];
            for (var f in this.options.icons) {
                if (typeof this.options.icons[f].title === "string") {
                    var g = d.clone();
                    g.find("i").addClass(this.options.fullClassFormatter(this.options.icons[f].title));
                    g.data("iconpickerValue", this.options.icons[f].title).on("click.iconpicker", c);
                    g.attr("title", "." + this.options.icons[f].title);
                    if (this.options.icons[f].searchTerms.length > 0) {
                        var h = "";
                        for (var i = 0; i < this.options.icons[f].searchTerms.length; i++) {
                            h = h + this.options.icons[f].searchTerms[i] + " ";
                        }
                        g.attr("data-search-terms", h);
                    }
                    e.push(g);
                }
            }
            this.iconpicker.find(".iconpicker-items").append(e);
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
            searchTerms: [ "accessibility", "handicap", "person", "wheelchair", "wheelchair-alt" ]
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
            title: "fas fa-air-freshener",
            searchTerms: []
        }, {
            title: "far fa-air-freshener",
            searchTerms: []
        }, {
            title: "fal fa-air-freshener",
            searchTerms: []
        }, {
            title: "fas fa-alarm-clock",
            searchTerms: [ "date", "late", "timer", "timestamp", "watch" ]
        }, {
            title: "far fa-alarm-clock",
            searchTerms: [ "date", "late", "timer", "timestamp", "watch" ]
        }, {
            title: "fal fa-alarm-clock",
            searchTerms: [ "date", "late", "timer", "timestamp", "watch" ]
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
            searchTerms: [ "freckles", "hand", "intolerances", "pox", "spots" ]
        }, {
            title: "far fa-allergies",
            searchTerms: [ "freckles", "hand", "intolerances", "pox", "spots" ]
        }, {
            title: "fal fa-allergies",
            searchTerms: [ "freckles", "hand", "intolerances", "pox", "spots" ]
        }, {
            title: "fab fa-amazon",
            searchTerms: []
        }, {
            title: "fab fa-amazon-pay",
            searchTerms: []
        }, {
            title: "fas fa-ambulance",
            searchTerms: [ "help", "machine", "support", "vehicle" ]
        }, {
            title: "far fa-ambulance",
            searchTerms: [ "help", "machine", "support", "vehicle" ]
        }, {
            title: "fal fa-ambulance",
            searchTerms: [ "help", "machine", "support", "vehicle" ]
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
            searchTerms: [ "arrows", "back", "laquo", "previous", "quote" ]
        }, {
            title: "far fa-angle-double-left",
            searchTerms: [ "arrows", "back", "laquo", "previous", "quote" ]
        }, {
            title: "fal fa-angle-double-left",
            searchTerms: [ "arrows", "back", "laquo", "previous", "quote" ]
        }, {
            title: "fas fa-angle-double-right",
            searchTerms: [ "arrows", "forward", "next", "quote", "raquo" ]
        }, {
            title: "far fa-angle-double-right",
            searchTerms: [ "arrows", "forward", "next", "quote", "raquo" ]
        }, {
            title: "fal fa-angle-double-right",
            searchTerms: [ "arrows", "forward", "next", "quote", "raquo" ]
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
            searchTerms: [ "arrow", "back", "previous" ]
        }, {
            title: "far fa-angle-left",
            searchTerms: [ "arrow", "back", "previous" ]
        }, {
            title: "fal fa-angle-left",
            searchTerms: [ "arrow", "back", "previous" ]
        }, {
            title: "fas fa-angle-right",
            searchTerms: [ "arrow", "forward", "next" ]
        }, {
            title: "far fa-angle-right",
            searchTerms: [ "arrow", "forward", "next" ]
        }, {
            title: "fal fa-angle-right",
            searchTerms: [ "arrow", "forward", "next" ]
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
            title: "fas fa-angry",
            searchTerms: [ "disapprove", "emoticon", "face", "mad", "upset" ]
        }, {
            title: "far fa-angry",
            searchTerms: [ "disapprove", "emoticon", "face", "mad", "upset" ]
        }, {
            title: "fal fa-angry",
            searchTerms: [ "disapprove", "emoticon", "face", "mad", "upset" ]
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
            searchTerms: [ "food", "fruit", "osx" ]
        }, {
            title: "fas fa-apple-alt",
            searchTerms: []
        }, {
            title: "far fa-apple-alt",
            searchTerms: []
        }, {
            title: "fal fa-apple-alt",
            searchTerms: []
        }, {
            title: "fab fa-apple-pay",
            searchTerms: []
        }, {
            title: "fas fa-archive",
            searchTerms: [ "box", "package", "storage" ]
        }, {
            title: "far fa-archive",
            searchTerms: [ "box", "package", "storage" ]
        }, {
            title: "fal fa-archive",
            searchTerms: [ "box", "package", "storage" ]
        }, {
            title: "fas fa-archway",
            searchTerms: [ "arc", "monument", "road", "street" ]
        }, {
            title: "far fa-archway",
            searchTerms: [ "arc", "monument", "road", "street" ]
        }, {
            title: "fal fa-archway",
            searchTerms: [ "arc", "monument", "road", "street" ]
        }, {
            title: "fas fa-arrow-alt-circle-down",
            searchTerms: [ "arrow-circle-o-down", "download" ]
        }, {
            title: "far fa-arrow-alt-circle-down",
            searchTerms: [ "arrow-circle-o-down", "download" ]
        }, {
            title: "fal fa-arrow-alt-circle-down",
            searchTerms: [ "arrow-circle-o-down", "download" ]
        }, {
            title: "fas fa-arrow-alt-circle-left",
            searchTerms: [ "arrow-circle-o-left", "back", "previous" ]
        }, {
            title: "far fa-arrow-alt-circle-left",
            searchTerms: [ "arrow-circle-o-left", "back", "previous" ]
        }, {
            title: "fal fa-arrow-alt-circle-left",
            searchTerms: [ "arrow-circle-o-left", "back", "previous" ]
        }, {
            title: "fas fa-arrow-alt-circle-right",
            searchTerms: [ "arrow-circle-o-right", "forward", "next" ]
        }, {
            title: "far fa-arrow-alt-circle-right",
            searchTerms: [ "arrow-circle-o-right", "forward", "next" ]
        }, {
            title: "fal fa-arrow-alt-circle-right",
            searchTerms: [ "arrow-circle-o-right", "forward", "next" ]
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
            searchTerms: [ "back", "previous" ]
        }, {
            title: "far fa-arrow-alt-from-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-alt-from-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fas fa-arrow-alt-from-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "far fa-arrow-alt-from-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-alt-from-right",
            searchTerms: [ "forward", "next" ]
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
            searchTerms: [ "back", "previous" ]
        }, {
            title: "far fa-arrow-alt-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-alt-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fas fa-arrow-alt-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "far fa-arrow-alt-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-alt-right",
            searchTerms: [ "forward", "next" ]
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
            searchTerms: [ "back", "previous" ]
        }, {
            title: "far fa-arrow-alt-square-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-alt-square-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fas fa-arrow-alt-square-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "far fa-arrow-alt-square-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-alt-square-right",
            searchTerms: [ "forward", "next" ]
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
            searchTerms: [ "back", "previous" ]
        }, {
            title: "far fa-arrow-alt-to-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-alt-to-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fas fa-arrow-alt-to-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "far fa-arrow-alt-to-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-alt-to-right",
            searchTerms: [ "forward", "next" ]
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
            searchTerms: [ "back", "previous" ]
        }, {
            title: "far fa-arrow-circle-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-circle-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fas fa-arrow-circle-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "far fa-arrow-circle-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-circle-right",
            searchTerms: [ "forward", "next" ]
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
            searchTerms: [ "back", "previous" ]
        }, {
            title: "far fa-arrow-from-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-from-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fas fa-arrow-from-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "far fa-arrow-from-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-from-right",
            searchTerms: [ "forward", "next" ]
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
            searchTerms: [ "back", "previous" ]
        }, {
            title: "far fa-arrow-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fas fa-arrow-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "far fa-arrow-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-right",
            searchTerms: [ "forward", "next" ]
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
            searchTerms: [ "back", "previous" ]
        }, {
            title: "far fa-arrow-square-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-square-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fas fa-arrow-square-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "far fa-arrow-square-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-square-right",
            searchTerms: [ "forward", "next" ]
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
            searchTerms: [ "back", "previous" ]
        }, {
            title: "far fa-arrow-to-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-to-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fas fa-arrow-to-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "far fa-arrow-to-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-to-right",
            searchTerms: [ "forward", "next" ]
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
            searchTerms: [ "move", "position", "reorder", "resize" ]
        }, {
            title: "far fa-arrows",
            searchTerms: [ "move", "position", "reorder", "resize" ]
        }, {
            title: "fal fa-arrows",
            searchTerms: [ "move", "position", "reorder", "resize" ]
        }, {
            title: "fas fa-arrows-alt",
            searchTerms: [ "arrow", "arrows", "bigger", "enlarge", "expand", "fullscreen", "move", "position", "reorder", "resize" ]
        }, {
            title: "far fa-arrows-alt",
            searchTerms: [ "arrow", "arrows", "bigger", "enlarge", "expand", "fullscreen", "move", "position", "reorder", "resize" ]
        }, {
            title: "fal fa-arrows-alt",
            searchTerms: [ "arrow", "arrows", "bigger", "enlarge", "expand", "fullscreen", "move", "position", "reorder", "resize" ]
        }, {
            title: "fas fa-arrows-alt-h",
            searchTerms: [ "arrows-h", "resize" ]
        }, {
            title: "far fa-arrows-alt-h",
            searchTerms: [ "arrows-h", "resize" ]
        }, {
            title: "fal fa-arrows-alt-h",
            searchTerms: [ "arrows-h", "resize" ]
        }, {
            title: "fas fa-arrows-alt-v",
            searchTerms: [ "arrows-v", "resize" ]
        }, {
            title: "far fa-arrows-alt-v",
            searchTerms: [ "arrows-v", "resize" ]
        }, {
            title: "fal fa-arrows-alt-v",
            searchTerms: [ "arrows-v", "resize" ]
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
            searchTerms: [ "e-mail", "email" ]
        }, {
            title: "far fa-at",
            searchTerms: [ "e-mail", "email" ]
        }, {
            title: "fal fa-at",
            searchTerms: [ "e-mail", "email" ]
        }, {
            title: "fas fa-atlas",
            searchTerms: [ "book", "directions", "geography", "map", "wayfinding" ]
        }, {
            title: "far fa-atlas",
            searchTerms: [ "book", "directions", "geography", "map", "wayfinding" ]
        }, {
            title: "fal fa-atlas",
            searchTerms: [ "book", "directions", "geography", "map", "wayfinding" ]
        }, {
            title: "fas fa-atom",
            searchTerms: []
        }, {
            title: "far fa-atom",
            searchTerms: []
        }, {
            title: "fal fa-atom",
            searchTerms: []
        }, {
            title: "fas fa-atom-alt",
            searchTerms: []
        }, {
            title: "far fa-atom-alt",
            searchTerms: []
        }, {
            title: "fal fa-atom-alt",
            searchTerms: []
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
            title: "fas fa-award",
            searchTerms: [ "honor", "praise", "prize", "recognition", "ribbon" ]
        }, {
            title: "far fa-award",
            searchTerms: [ "honor", "praise", "prize", "recognition", "ribbon" ]
        }, {
            title: "fal fa-award",
            searchTerms: [ "honor", "praise", "prize", "recognition", "ribbon" ]
        }, {
            title: "fab fa-aws",
            searchTerms: []
        }, {
            title: "fas fa-backpack",
            searchTerms: []
        }, {
            title: "far fa-backpack",
            searchTerms: []
        }, {
            title: "fal fa-backpack",
            searchTerms: []
        }, {
            title: "fas fa-backspace",
            searchTerms: [ "command", "delete", "keyboard", "undo" ]
        }, {
            title: "far fa-backspace",
            searchTerms: [ "command", "delete", "keyboard", "undo" ]
        }, {
            title: "fal fa-backspace",
            searchTerms: [ "command", "delete", "keyboard", "undo" ]
        }, {
            title: "fas fa-backward",
            searchTerms: [ "previous", "rewind" ]
        }, {
            title: "far fa-backward",
            searchTerms: [ "previous", "rewind" ]
        }, {
            title: "fal fa-backward",
            searchTerms: [ "previous", "rewind" ]
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
            searchTerms: [ "accept", "achievement", "agree", "award", "confirm", "correct", "done", "ok", "security", "select", "success", "winner", "yes" ]
        }, {
            title: "far fa-badge-check",
            searchTerms: [ "accept", "achievement", "agree", "award", "confirm", "correct", "done", "ok", "security", "select", "success", "winner", "yes" ]
        }, {
            title: "fal fa-badge-check",
            searchTerms: [ "accept", "achievement", "agree", "award", "confirm", "correct", "done", "ok", "security", "select", "success", "winner", "yes" ]
        }, {
            title: "fas fa-balance-scale",
            searchTerms: [ "balanced", "justice", "legal", "measure", "weight" ]
        }, {
            title: "far fa-balance-scale",
            searchTerms: [ "balanced", "justice", "legal", "measure", "weight" ]
        }, {
            title: "fal fa-balance-scale",
            searchTerms: [ "balanced", "justice", "legal", "measure", "weight" ]
        }, {
            title: "fas fa-balance-scale-left",
            searchTerms: [ "justice", "legal", "measure", "unbalanced", "weight" ]
        }, {
            title: "far fa-balance-scale-left",
            searchTerms: [ "justice", "legal", "measure", "unbalanced", "weight" ]
        }, {
            title: "fal fa-balance-scale-left",
            searchTerms: [ "justice", "legal", "measure", "unbalanced", "weight" ]
        }, {
            title: "fas fa-balance-scale-right",
            searchTerms: [ "justice", "legal", "measure", "unbalanced", "weight" ]
        }, {
            title: "far fa-balance-scale-right",
            searchTerms: [ "justice", "legal", "measure", "unbalanced", "weight" ]
        }, {
            title: "fal fa-balance-scale-right",
            searchTerms: [ "justice", "legal", "measure", "unbalanced", "weight" ]
        }, {
            title: "fas fa-ban",
            searchTerms: [ "abort", "ban", "block", "cancel", "delete", "hide", "prohibit", "remove", "stop", "trash" ]
        }, {
            title: "far fa-ban",
            searchTerms: [ "abort", "ban", "block", "cancel", "delete", "hide", "prohibit", "remove", "stop", "trash" ]
        }, {
            title: "fal fa-ban",
            searchTerms: [ "abort", "ban", "block", "cancel", "delete", "hide", "prohibit", "remove", "stop", "trash" ]
        }, {
            title: "fas fa-band-aid",
            searchTerms: [ "bandage", "boo boo", "ouch" ]
        }, {
            title: "far fa-band-aid",
            searchTerms: [ "bandage", "boo boo", "ouch" ]
        }, {
            title: "fal fa-band-aid",
            searchTerms: [ "bandage", "boo boo", "ouch" ]
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
            searchTerms: [ "checklist", "drag", "hamburger", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "todo", "ul" ]
        }, {
            title: "far fa-bars",
            searchTerms: [ "checklist", "drag", "hamburger", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "todo", "ul" ]
        }, {
            title: "fal fa-bars",
            searchTerms: [ "checklist", "drag", "hamburger", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "todo", "ul" ]
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
            searchTerms: [ "lodging", "sleep", "travel" ]
        }, {
            title: "far fa-bed",
            searchTerms: [ "lodging", "sleep", "travel" ]
        }, {
            title: "fal fa-bed",
            searchTerms: [ "lodging", "sleep", "travel" ]
        }, {
            title: "fas fa-beer",
            searchTerms: [ "alcohol", "bar", "drink", "liquor", "mug", "stein" ]
        }, {
            title: "far fa-beer",
            searchTerms: [ "alcohol", "bar", "drink", "liquor", "mug", "stein" ]
        }, {
            title: "fal fa-beer",
            searchTerms: [ "alcohol", "bar", "drink", "liquor", "mug", "stein" ]
        }, {
            title: "fab fa-behance",
            searchTerms: []
        }, {
            title: "fab fa-behance-square",
            searchTerms: []
        }, {
            title: "fas fa-bell",
            searchTerms: [ "alert", "notification", "reminder" ]
        }, {
            title: "far fa-bell",
            searchTerms: [ "alert", "notification", "reminder" ]
        }, {
            title: "fal fa-bell",
            searchTerms: [ "alert", "notification", "reminder" ]
        }, {
            title: "fas fa-bell-school",
            searchTerms: []
        }, {
            title: "far fa-bell-school",
            searchTerms: []
        }, {
            title: "fal fa-bell-school",
            searchTerms: []
        }, {
            title: "fas fa-bell-school-slash",
            searchTerms: []
        }, {
            title: "far fa-bell-school-slash",
            searchTerms: []
        }, {
            title: "fal fa-bell-school-slash",
            searchTerms: []
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
            title: "fas fa-bezier-curve",
            searchTerms: [ "curves", "illustrator", "lines", "path", "vector" ]
        }, {
            title: "far fa-bezier-curve",
            searchTerms: [ "curves", "illustrator", "lines", "path", "vector" ]
        }, {
            title: "fal fa-bezier-curve",
            searchTerms: [ "curves", "illustrator", "lines", "path", "vector" ]
        }, {
            title: "fas fa-bicycle",
            searchTerms: [ "bike", "gears", "transportation", "vehicle" ]
        }, {
            title: "far fa-bicycle",
            searchTerms: [ "bike", "gears", "transportation", "vehicle" ]
        }, {
            title: "fal fa-bicycle",
            searchTerms: [ "bike", "gears", "transportation", "vehicle" ]
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
            searchTerms: [ "bitbucket-square", "git" ]
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
            title: "fas fa-blender",
            searchTerms: []
        }, {
            title: "far fa-blender",
            searchTerms: []
        }, {
            title: "fal fa-blender",
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
            searchTerms: [ "electricity", "lightning", "weather", "zap" ]
        }, {
            title: "far fa-bolt",
            searchTerms: [ "electricity", "lightning", "weather", "zap" ]
        }, {
            title: "fal fa-bolt",
            searchTerms: [ "electricity", "lightning", "weather", "zap" ]
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
            title: "fas fa-bone",
            searchTerms: []
        }, {
            title: "far fa-bone",
            searchTerms: []
        }, {
            title: "fal fa-bone",
            searchTerms: []
        }, {
            title: "fas fa-bone-break",
            searchTerms: []
        }, {
            title: "far fa-bone-break",
            searchTerms: []
        }, {
            title: "fal fa-bone-break",
            searchTerms: []
        }, {
            title: "fas fa-bong",
            searchTerms: [ "aparatus", "cannabis", "marijuana", "pipe", "smoke", "smoking" ]
        }, {
            title: "far fa-bong",
            searchTerms: [ "aparatus", "cannabis", "marijuana", "pipe", "smoke", "smoking" ]
        }, {
            title: "fal fa-bong",
            searchTerms: [ "aparatus", "cannabis", "marijuana", "pipe", "smoke", "smoking" ]
        }, {
            title: "fas fa-book",
            searchTerms: [ "documentation", "read" ]
        }, {
            title: "far fa-book",
            searchTerms: [ "documentation", "read" ]
        }, {
            title: "fal fa-book",
            searchTerms: [ "documentation", "read" ]
        }, {
            title: "fas fa-book-alt",
            searchTerms: []
        }, {
            title: "far fa-book-alt",
            searchTerms: []
        }, {
            title: "fal fa-book-alt",
            searchTerms: []
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
            title: "fas fa-book-open",
            searchTerms: [ "flyer", "notebook", "open book", "pamphlet", "reading" ]
        }, {
            title: "far fa-book-open",
            searchTerms: [ "flyer", "notebook", "open book", "pamphlet", "reading" ]
        }, {
            title: "fal fa-book-open",
            searchTerms: [ "flyer", "notebook", "open book", "pamphlet", "reading" ]
        }, {
            title: "fas fa-book-reader",
            searchTerms: [ "library" ]
        }, {
            title: "far fa-book-reader",
            searchTerms: [ "library" ]
        }, {
            title: "fal fa-book-reader",
            searchTerms: [ "library" ]
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
            title: "fas fa-books",
            searchTerms: []
        }, {
            title: "far fa-books",
            searchTerms: []
        }, {
            title: "fal fa-books",
            searchTerms: []
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
            searchTerms: [ "accept", "ackage", "agree", "confirm", "correct", "done", "ok", "select", "success", "todo", "yes" ]
        }, {
            title: "far fa-box-check",
            searchTerms: [ "accept", "ackage", "agree", "confirm", "correct", "done", "ok", "select", "success", "todo", "yes" ]
        }, {
            title: "fal fa-box-check",
            searchTerms: [ "accept", "ackage", "agree", "confirm", "correct", "done", "ok", "select", "success", "todo", "yes" ]
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
            searchTerms: [ "$", "dollar-sign", "money", "usd" ]
        }, {
            title: "far fa-box-usd",
            searchTerms: [ "$", "dollar-sign", "money", "usd" ]
        }, {
            title: "fal fa-box-usd",
            searchTerms: [ "$", "dollar-sign", "money", "usd" ]
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
            title: "fas fa-brain",
            searchTerms: []
        }, {
            title: "far fa-brain",
            searchTerms: []
        }, {
            title: "fal fa-brain",
            searchTerms: []
        }, {
            title: "fas fa-briefcase",
            searchTerms: [ "bag", "business", "luggage", "office", "work" ]
        }, {
            title: "far fa-briefcase",
            searchTerms: [ "bag", "business", "luggage", "office", "work" ]
        }, {
            title: "fal fa-briefcase",
            searchTerms: [ "bag", "business", "luggage", "office", "work" ]
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
            title: "fas fa-broadcast-tower",
            searchTerms: [ "airwaves", "radio", "waves" ]
        }, {
            title: "far fa-broadcast-tower",
            searchTerms: [ "airwaves", "radio", "waves" ]
        }, {
            title: "fal fa-broadcast-tower",
            searchTerms: [ "airwaves", "radio", "waves" ]
        }, {
            title: "fas fa-broom",
            searchTerms: []
        }, {
            title: "far fa-broom",
            searchTerms: []
        }, {
            title: "fal fa-broom",
            searchTerms: []
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
            title: "fas fa-brush",
            searchTerms: [ "bristles", "color", "handle", "painting" ]
        }, {
            title: "far fa-brush",
            searchTerms: [ "bristles", "color", "handle", "painting" ]
        }, {
            title: "fal fa-brush",
            searchTerms: [ "bristles", "color", "handle", "painting" ]
        }, {
            title: "fab fa-btc",
            searchTerms: []
        }, {
            title: "fas fa-bug",
            searchTerms: [ "insect", "report" ]
        }, {
            title: "far fa-bug",
            searchTerms: [ "insect", "report" ]
        }, {
            title: "fal fa-bug",
            searchTerms: [ "insect", "report" ]
        }, {
            title: "fas fa-building",
            searchTerms: [ "apartment", "business", "company", "office", "work" ]
        }, {
            title: "far fa-building",
            searchTerms: [ "apartment", "business", "company", "office", "work" ]
        }, {
            title: "fal fa-building",
            searchTerms: [ "apartment", "business", "company", "office", "work" ]
        }, {
            title: "fas fa-bullhorn",
            searchTerms: [ "announcement", "broadcast", "louder", "megaphone", "share" ]
        }, {
            title: "far fa-bullhorn",
            searchTerms: [ "announcement", "broadcast", "louder", "megaphone", "share" ]
        }, {
            title: "fal fa-bullhorn",
            searchTerms: [ "announcement", "broadcast", "louder", "megaphone", "share" ]
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
            searchTerms: [ "machine", "public transportation", "transportation", "vehicle" ]
        }, {
            title: "far fa-bus",
            searchTerms: [ "machine", "public transportation", "transportation", "vehicle" ]
        }, {
            title: "fal fa-bus",
            searchTerms: [ "machine", "public transportation", "transportation", "vehicle" ]
        }, {
            title: "fas fa-bus-alt",
            searchTerms: [ "machine", "public transportation", "transportation", "vehicle" ]
        }, {
            title: "far fa-bus-alt",
            searchTerms: [ "machine", "public transportation", "transportation", "vehicle" ]
        }, {
            title: "fal fa-bus-alt",
            searchTerms: [ "machine", "public transportation", "transportation", "vehicle" ]
        }, {
            title: "fas fa-bus-school",
            searchTerms: []
        }, {
            title: "far fa-bus-school",
            searchTerms: []
        }, {
            title: "fal fa-bus-school",
            searchTerms: []
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
            searchTerms: [ "calendar-o", "date", "event", "schedule", "time", "when" ]
        }, {
            title: "far fa-calendar",
            searchTerms: [ "calendar-o", "date", "event", "schedule", "time", "when" ]
        }, {
            title: "fal fa-calendar",
            searchTerms: [ "calendar-o", "date", "event", "schedule", "time", "when" ]
        }, {
            title: "fas fa-calendar-alt",
            searchTerms: [ "calendar", "date", "event", "schedule", "time", "when" ]
        }, {
            title: "far fa-calendar-alt",
            searchTerms: [ "calendar", "date", "event", "schedule", "time", "when" ]
        }, {
            title: "fal fa-calendar-alt",
            searchTerms: [ "calendar", "date", "event", "schedule", "time", "when" ]
        }, {
            title: "fas fa-calendar-check",
            searchTerms: [ "accept", "agree", "appointment", "confirm", "correct", "done", "ok", "select", "success", "todo" ]
        }, {
            title: "far fa-calendar-check",
            searchTerms: [ "accept", "agree", "appointment", "confirm", "correct", "done", "ok", "select", "success", "todo" ]
        }, {
            title: "fal fa-calendar-check",
            searchTerms: [ "accept", "agree", "appointment", "confirm", "correct", "done", "ok", "select", "success", "todo" ]
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
            searchTerms: [ "important" ]
        }, {
            title: "far fa-calendar-exclamation",
            searchTerms: [ "important" ]
        }, {
            title: "fal fa-calendar-exclamation",
            searchTerms: [ "important" ]
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
            title: "fas fa-cannabis",
            searchTerms: [ "bud", "chronic", "drugs", "endica", "endo", "ganja", "marijuana", "mary jane", "pot", "reefer", "sativa", "spliff", "weed", "whacky-tabacky" ]
        }, {
            title: "far fa-cannabis",
            searchTerms: [ "bud", "chronic", "drugs", "endica", "endo", "ganja", "marijuana", "mary jane", "pot", "reefer", "sativa", "spliff", "weed", "whacky-tabacky" ]
        }, {
            title: "fal fa-cannabis",
            searchTerms: [ "bud", "chronic", "drugs", "endica", "endo", "ganja", "marijuana", "mary jane", "pot", "reefer", "sativa", "spliff", "weed", "whacky-tabacky" ]
        }, {
            title: "fas fa-capsules",
            searchTerms: [ "drugs", "medicine" ]
        }, {
            title: "far fa-capsules",
            searchTerms: [ "drugs", "medicine" ]
        }, {
            title: "fal fa-capsules",
            searchTerms: [ "drugs", "medicine" ]
        }, {
            title: "fas fa-car",
            searchTerms: [ "machine", "transportation", "vehicle" ]
        }, {
            title: "far fa-car",
            searchTerms: [ "machine", "transportation", "vehicle" ]
        }, {
            title: "fal fa-car",
            searchTerms: [ "machine", "transportation", "vehicle" ]
        }, {
            title: "fas fa-car-alt",
            searchTerms: []
        }, {
            title: "far fa-car-alt",
            searchTerms: []
        }, {
            title: "fal fa-car-alt",
            searchTerms: []
        }, {
            title: "fas fa-car-battery",
            searchTerms: []
        }, {
            title: "far fa-car-battery",
            searchTerms: []
        }, {
            title: "fal fa-car-battery",
            searchTerms: []
        }, {
            title: "fas fa-car-bump",
            searchTerms: []
        }, {
            title: "far fa-car-bump",
            searchTerms: []
        }, {
            title: "fal fa-car-bump",
            searchTerms: []
        }, {
            title: "fas fa-car-crash",
            searchTerms: []
        }, {
            title: "far fa-car-crash",
            searchTerms: []
        }, {
            title: "fal fa-car-crash",
            searchTerms: []
        }, {
            title: "fas fa-car-garage",
            searchTerms: []
        }, {
            title: "far fa-car-garage",
            searchTerms: []
        }, {
            title: "fal fa-car-garage",
            searchTerms: []
        }, {
            title: "fas fa-car-mechanic",
            searchTerms: []
        }, {
            title: "far fa-car-mechanic",
            searchTerms: []
        }, {
            title: "fal fa-car-mechanic",
            searchTerms: []
        }, {
            title: "fas fa-car-side",
            searchTerms: []
        }, {
            title: "far fa-car-side",
            searchTerms: []
        }, {
            title: "fal fa-car-side",
            searchTerms: []
        }, {
            title: "fas fa-car-tilt",
            searchTerms: []
        }, {
            title: "far fa-car-tilt",
            searchTerms: []
        }, {
            title: "fal fa-car-tilt",
            searchTerms: []
        }, {
            title: "fas fa-car-wash",
            searchTerms: []
        }, {
            title: "far fa-car-wash",
            searchTerms: []
        }, {
            title: "fal fa-car-wash",
            searchTerms: []
        }, {
            title: "fas fa-caret-circle-down",
            searchTerms: [ "dropdown", "menu", "more" ]
        }, {
            title: "far fa-caret-circle-down",
            searchTerms: [ "dropdown", "menu", "more" ]
        }, {
            title: "fal fa-caret-circle-down",
            searchTerms: [ "dropdown", "menu", "more" ]
        }, {
            title: "fas fa-caret-circle-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "far fa-caret-circle-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-caret-circle-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fas fa-caret-circle-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "far fa-caret-circle-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-caret-circle-right",
            searchTerms: [ "forward", "next" ]
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
            searchTerms: [ "arrow", "dropdown", "menu", "more", "triangle down" ]
        }, {
            title: "far fa-caret-down",
            searchTerms: [ "arrow", "dropdown", "menu", "more", "triangle down" ]
        }, {
            title: "fal fa-caret-down",
            searchTerms: [ "arrow", "dropdown", "menu", "more", "triangle down" ]
        }, {
            title: "fas fa-caret-left",
            searchTerms: [ "arrow", "back", "previous", "triangle left" ]
        }, {
            title: "far fa-caret-left",
            searchTerms: [ "arrow", "back", "previous", "triangle left" ]
        }, {
            title: "fal fa-caret-left",
            searchTerms: [ "arrow", "back", "previous", "triangle left" ]
        }, {
            title: "fas fa-caret-right",
            searchTerms: [ "arrow", "forward", "next", "triangle right" ]
        }, {
            title: "far fa-caret-right",
            searchTerms: [ "arrow", "forward", "next", "triangle right" ]
        }, {
            title: "fal fa-caret-right",
            searchTerms: [ "arrow", "forward", "next", "triangle right" ]
        }, {
            title: "fas fa-caret-square-down",
            searchTerms: [ "caret-square-o-down", "dropdown", "menu", "more" ]
        }, {
            title: "far fa-caret-square-down",
            searchTerms: [ "caret-square-o-down", "dropdown", "menu", "more" ]
        }, {
            title: "fal fa-caret-square-down",
            searchTerms: [ "caret-square-o-down", "dropdown", "menu", "more" ]
        }, {
            title: "fas fa-caret-square-left",
            searchTerms: [ "back", "caret-square-o-left", "previous" ]
        }, {
            title: "far fa-caret-square-left",
            searchTerms: [ "back", "caret-square-o-left", "previous" ]
        }, {
            title: "fal fa-caret-square-left",
            searchTerms: [ "back", "caret-square-o-left", "previous" ]
        }, {
            title: "fas fa-caret-square-right",
            searchTerms: [ "caret-square-o-right", "forward", "next" ]
        }, {
            title: "far fa-caret-square-right",
            searchTerms: [ "caret-square-o-right", "forward", "next" ]
        }, {
            title: "fal fa-caret-square-right",
            searchTerms: [ "caret-square-o-right", "forward", "next" ]
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
            searchTerms: [ "arrow", "triangle up" ]
        }, {
            title: "far fa-caret-up",
            searchTerms: [ "arrow", "triangle up" ]
        }, {
            title: "fal fa-caret-up",
            searchTerms: [ "arrow", "triangle up" ]
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
            title: "fas fa-chalkboard",
            searchTerms: [ "blackboard", "learning", "school", "teaching", "whiteboard", "writing" ]
        }, {
            title: "far fa-chalkboard",
            searchTerms: [ "blackboard", "learning", "school", "teaching", "whiteboard", "writing" ]
        }, {
            title: "fal fa-chalkboard",
            searchTerms: [ "blackboard", "learning", "school", "teaching", "whiteboard", "writing" ]
        }, {
            title: "fas fa-chalkboard-teacher",
            searchTerms: [ "blackboard", "instructor", "learning", "professor", "school", "whiteboard", "writing" ]
        }, {
            title: "far fa-chalkboard-teacher",
            searchTerms: [ "blackboard", "instructor", "learning", "professor", "school", "whiteboard", "writing" ]
        }, {
            title: "fal fa-chalkboard-teacher",
            searchTerms: [ "blackboard", "instructor", "learning", "professor", "school", "whiteboard", "writing" ]
        }, {
            title: "fas fa-charging-station",
            searchTerms: []
        }, {
            title: "far fa-charging-station",
            searchTerms: []
        }, {
            title: "fal fa-charging-station",
            searchTerms: []
        }, {
            title: "fas fa-chart-area",
            searchTerms: [ "analytics", "area-chart", "graph" ]
        }, {
            title: "far fa-chart-area",
            searchTerms: [ "analytics", "area-chart", "graph" ]
        }, {
            title: "fal fa-chart-area",
            searchTerms: [ "analytics", "area-chart", "graph" ]
        }, {
            title: "fas fa-chart-bar",
            searchTerms: [ "analytics", "bar-chart", "graph" ]
        }, {
            title: "far fa-chart-bar",
            searchTerms: [ "analytics", "bar-chart", "graph" ]
        }, {
            title: "fal fa-chart-bar",
            searchTerms: [ "analytics", "bar-chart", "graph" ]
        }, {
            title: "fas fa-chart-line",
            searchTerms: [ "activity", "analytics", "dashboard", "graph", "line-chart" ]
        }, {
            title: "far fa-chart-line",
            searchTerms: [ "activity", "analytics", "dashboard", "graph", "line-chart" ]
        }, {
            title: "fal fa-chart-line",
            searchTerms: [ "activity", "analytics", "dashboard", "graph", "line-chart" ]
        }, {
            title: "fas fa-chart-pie",
            searchTerms: [ "analytics", "graph", "pie-chart" ]
        }, {
            title: "far fa-chart-pie",
            searchTerms: [ "analytics", "graph", "pie-chart" ]
        }, {
            title: "fal fa-chart-pie",
            searchTerms: [ "analytics", "graph", "pie-chart" ]
        }, {
            title: "fas fa-check",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "notice", "notification", "notify", "ok", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "far fa-check",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "notice", "notification", "notify", "ok", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "fal fa-check",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "notice", "notification", "notify", "ok", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "fas fa-check-circle",
            searchTerms: [ "accept", "agree", "confirm", "correct", "done", "ok", "select", "success", "todo", "yes" ]
        }, {
            title: "far fa-check-circle",
            searchTerms: [ "accept", "agree", "confirm", "correct", "done", "ok", "select", "success", "todo", "yes" ]
        }, {
            title: "fal fa-check-circle",
            searchTerms: [ "accept", "agree", "confirm", "correct", "done", "ok", "select", "success", "todo", "yes" ]
        }, {
            title: "fas fa-check-double",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "notice", "notification", "notify", "ok", "select", "success", "tick", "todo" ]
        }, {
            title: "far fa-check-double",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "notice", "notification", "notify", "ok", "select", "success", "tick", "todo" ]
        }, {
            title: "fal fa-check-double",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "notice", "notification", "notify", "ok", "select", "success", "tick", "todo" ]
        }, {
            title: "fas fa-check-square",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "ok", "select", "success", "todo", "yes" ]
        }, {
            title: "far fa-check-square",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "ok", "select", "success", "todo", "yes" ]
        }, {
            title: "fal fa-check-square",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "ok", "select", "success", "todo", "yes" ]
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
            searchTerms: [ "arrow", "dropdown", "menu", "more" ]
        }, {
            title: "far fa-chevron-circle-down",
            searchTerms: [ "arrow", "dropdown", "menu", "more" ]
        }, {
            title: "fal fa-chevron-circle-down",
            searchTerms: [ "arrow", "dropdown", "menu", "more" ]
        }, {
            title: "fas fa-chevron-circle-left",
            searchTerms: [ "arrow", "back", "previous" ]
        }, {
            title: "far fa-chevron-circle-left",
            searchTerms: [ "arrow", "back", "previous" ]
        }, {
            title: "fal fa-chevron-circle-left",
            searchTerms: [ "arrow", "back", "previous" ]
        }, {
            title: "fas fa-chevron-circle-right",
            searchTerms: [ "arrow", "forward", "next" ]
        }, {
            title: "far fa-chevron-circle-right",
            searchTerms: [ "arrow", "forward", "next" ]
        }, {
            title: "fal fa-chevron-circle-right",
            searchTerms: [ "arrow", "forward", "next" ]
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
            searchTerms: [ "back", "bracket", "previous" ]
        }, {
            title: "far fa-chevron-double-left",
            searchTerms: [ "back", "bracket", "previous" ]
        }, {
            title: "fal fa-chevron-double-left",
            searchTerms: [ "back", "bracket", "previous" ]
        }, {
            title: "fas fa-chevron-double-right",
            searchTerms: [ "bracket", "forward", "next" ]
        }, {
            title: "far fa-chevron-double-right",
            searchTerms: [ "bracket", "forward", "next" ]
        }, {
            title: "fal fa-chevron-double-right",
            searchTerms: [ "bracket", "forward", "next" ]
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
            searchTerms: [ "back", "bracket", "previous" ]
        }, {
            title: "far fa-chevron-left",
            searchTerms: [ "back", "bracket", "previous" ]
        }, {
            title: "fal fa-chevron-left",
            searchTerms: [ "back", "bracket", "previous" ]
        }, {
            title: "fas fa-chevron-right",
            searchTerms: [ "bracket", "forward", "next" ]
        }, {
            title: "far fa-chevron-right",
            searchTerms: [ "bracket", "forward", "next" ]
        }, {
            title: "fal fa-chevron-right",
            searchTerms: [ "bracket", "forward", "next" ]
        }, {
            title: "fas fa-chevron-square-down",
            searchTerms: [ "arrow", "dropdown", "menu", "more" ]
        }, {
            title: "far fa-chevron-square-down",
            searchTerms: [ "arrow", "dropdown", "menu", "more" ]
        }, {
            title: "fal fa-chevron-square-down",
            searchTerms: [ "arrow", "dropdown", "menu", "more" ]
        }, {
            title: "fas fa-chevron-square-left",
            searchTerms: [ "arrow", "back", "previous" ]
        }, {
            title: "far fa-chevron-square-left",
            searchTerms: [ "arrow", "back", "previous" ]
        }, {
            title: "fal fa-chevron-square-left",
            searchTerms: [ "arrow", "back", "previous" ]
        }, {
            title: "fas fa-chevron-square-right",
            searchTerms: [ "arrow", "forward", "next" ]
        }, {
            title: "far fa-chevron-square-right",
            searchTerms: [ "arrow", "forward", "next" ]
        }, {
            title: "fal fa-chevron-square-right",
            searchTerms: [ "arrow", "forward", "next" ]
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
            title: "fas fa-church",
            searchTerms: [ "building", "community", "religion" ]
        }, {
            title: "far fa-church",
            searchTerms: [ "building", "community", "religion" ]
        }, {
            title: "fal fa-church",
            searchTerms: [ "building", "community", "religion" ]
        }, {
            title: "fas fa-circle",
            searchTerms: [ "circle-thin", "dot", "notification" ]
        }, {
            title: "far fa-circle",
            searchTerms: [ "circle-thin", "dot", "notification" ]
        }, {
            title: "fal fa-circle",
            searchTerms: [ "circle-thin", "dot", "notification" ]
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
            searchTerms: [ "accept", "agree", "confirm", "done", "ok", "select", "success", "todo", "yes" ]
        }, {
            title: "far fa-clipboard-check",
            searchTerms: [ "accept", "agree", "confirm", "done", "ok", "select", "success", "todo", "yes" ]
        }, {
            title: "fal fa-clipboard-check",
            searchTerms: [ "accept", "agree", "confirm", "done", "ok", "select", "success", "todo", "yes" ]
        }, {
            title: "fas fa-clipboard-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "intinerary", "ol", "schedule", "todo", "ul" ]
        }, {
            title: "far fa-clipboard-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "intinerary", "ol", "schedule", "todo", "ul" ]
        }, {
            title: "fal fa-clipboard-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "intinerary", "ol", "schedule", "todo", "ul" ]
        }, {
            title: "fas fa-clipboard-prescription",
            searchTerms: []
        }, {
            title: "far fa-clipboard-prescription",
            searchTerms: []
        }, {
            title: "fal fa-clipboard-prescription",
            searchTerms: []
        }, {
            title: "fas fa-clock",
            searchTerms: [ "date", "late", "schedule", "timer", "timestamp", "watch" ]
        }, {
            title: "far fa-clock",
            searchTerms: [ "date", "late", "schedule", "timer", "timestamp", "watch" ]
        }, {
            title: "fal fa-clock",
            searchTerms: [ "date", "late", "schedule", "timer", "timestamp", "watch" ]
        }, {
            title: "fas fa-clone",
            searchTerms: [ "copy", "duplicate" ]
        }, {
            title: "far fa-clone",
            searchTerms: [ "copy", "duplicate" ]
        }, {
            title: "fal fa-clone",
            searchTerms: [ "copy", "duplicate" ]
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
            searchTerms: [ "card", "suit" ]
        }, {
            title: "far fa-club",
            searchTerms: [ "card", "suit" ]
        }, {
            title: "fal fa-club",
            searchTerms: [ "card", "suit" ]
        }, {
            title: "fas fa-cocktail",
            searchTerms: [ "alcohol", "drink" ]
        }, {
            title: "far fa-cocktail",
            searchTerms: [ "alcohol", "drink" ]
        }, {
            title: "fal fa-cocktail",
            searchTerms: [ "alcohol", "drink" ]
        }, {
            title: "fas fa-code",
            searchTerms: [ "brackets", "html" ]
        }, {
            title: "far fa-code",
            searchTerms: [ "brackets", "html" ]
        }, {
            title: "fal fa-code",
            searchTerms: [ "brackets", "html" ]
        }, {
            title: "fas fa-code-branch",
            searchTerms: [ "branch", "code-fork", "fork", "git", "github", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "far fa-code-branch",
            searchTerms: [ "branch", "code-fork", "fork", "git", "github", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "fal fa-code-branch",
            searchTerms: [ "branch", "code-fork", "fork", "git", "github", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "fas fa-code-commit",
            searchTerms: [ "commit", "git", "github", "hash", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "far fa-code-commit",
            searchTerms: [ "commit", "git", "github", "hash", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "fal fa-code-commit",
            searchTerms: [ "commit", "git", "github", "hash", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "fas fa-code-merge",
            searchTerms: [ "git", "github", "merge", "pr", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "far fa-code-merge",
            searchTerms: [ "git", "github", "merge", "pr", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "fal fa-code-merge",
            searchTerms: [ "git", "github", "merge", "pr", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "fab fa-codepen",
            searchTerms: []
        }, {
            title: "fab fa-codiepie",
            searchTerms: []
        }, {
            title: "fas fa-coffee",
            searchTerms: [ "breakfast", "cafe", "drink", "morning", "mug", "tea" ]
        }, {
            title: "far fa-coffee",
            searchTerms: [ "breakfast", "cafe", "drink", "morning", "mug", "tea" ]
        }, {
            title: "fal fa-coffee",
            searchTerms: [ "breakfast", "cafe", "drink", "morning", "mug", "tea" ]
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
            searchTerms: [ "gears", "settings" ]
        }, {
            title: "far fa-cogs",
            searchTerms: [ "gears", "settings" ]
        }, {
            title: "fal fa-cogs",
            searchTerms: [ "gears", "settings" ]
        }, {
            title: "fas fa-coins",
            searchTerms: []
        }, {
            title: "far fa-coins",
            searchTerms: []
        }, {
            title: "fal fa-coins",
            searchTerms: []
        }, {
            title: "fas fa-columns",
            searchTerms: [ "dashboard", "panes", "split" ]
        }, {
            title: "far fa-columns",
            searchTerms: [ "dashboard", "panes", "split" ]
        }, {
            title: "fal fa-columns",
            searchTerms: [ "dashboard", "panes", "split" ]
        }, {
            title: "fas fa-comment",
            searchTerms: [ "bubble", "chat", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "far fa-comment",
            searchTerms: [ "bubble", "chat", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comment",
            searchTerms: [ "bubble", "chat", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fas fa-comment-alt",
            searchTerms: [ "bubble", "chat", "commenting", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "far fa-comment-alt",
            searchTerms: [ "bubble", "chat", "commenting", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comment-alt",
            searchTerms: [ "bubble", "chat", "commenting", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
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
            searchTerms: [ "important" ]
        }, {
            title: "far fa-comment-alt-exclamation",
            searchTerms: [ "important" ]
        }, {
            title: "fal fa-comment-alt-exclamation",
            searchTerms: [ "important" ]
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
            searchTerms: [ "happy" ]
        }, {
            title: "far fa-comment-alt-smile",
            searchTerms: [ "happy" ]
        }, {
            title: "fal fa-comment-alt-smile",
            searchTerms: [ "happy" ]
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
            searchTerms: [ "important" ]
        }, {
            title: "far fa-comment-exclamation",
            searchTerms: [ "important" ]
        }, {
            title: "fal fa-comment-exclamation",
            searchTerms: [ "important" ]
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
            searchTerms: [ "bubble", "chat", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "far fa-comments",
            searchTerms: [ "bubble", "chat", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comments",
            searchTerms: [ "bubble", "chat", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
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
            title: "fas fa-compact-disc",
            searchTerms: [ "bluray", "cd", "disc", "media" ]
        }, {
            title: "far fa-compact-disc",
            searchTerms: [ "bluray", "cd", "disc", "media" ]
        }, {
            title: "fal fa-compact-disc",
            searchTerms: [ "bluray", "cd", "disc", "media" ]
        }, {
            title: "fas fa-compass",
            searchTerms: [ "directory", "location", "menu", "safari" ]
        }, {
            title: "far fa-compass",
            searchTerms: [ "directory", "location", "menu", "safari" ]
        }, {
            title: "fal fa-compass",
            searchTerms: [ "directory", "location", "menu", "safari" ]
        }, {
            title: "fas fa-compass-slash",
            searchTerms: []
        }, {
            title: "far fa-compass-slash",
            searchTerms: []
        }, {
            title: "fal fa-compass-slash",
            searchTerms: []
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
            title: "fas fa-concierge-bell",
            searchTerms: [ "attention", "hotel", "service", "support" ]
        }, {
            title: "far fa-concierge-bell",
            searchTerms: [ "attention", "hotel", "service", "support" ]
        }, {
            title: "fal fa-concierge-bell",
            searchTerms: [ "attention", "hotel", "service", "support" ]
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
            title: "fas fa-cookie",
            searchTerms: [ "baked good", "chips", "food", "snack", "sweet", "treat" ]
        }, {
            title: "far fa-cookie",
            searchTerms: [ "baked good", "chips", "food", "snack", "sweet", "treat" ]
        }, {
            title: "fal fa-cookie",
            searchTerms: [ "baked good", "chips", "food", "snack", "sweet", "treat" ]
        }, {
            title: "fas fa-cookie-bite",
            searchTerms: [ "baked good", "bitten", "chips", "eating", "food", "snack", "sweet", "treat" ]
        }, {
            title: "far fa-cookie-bite",
            searchTerms: [ "baked good", "bitten", "chips", "eating", "food", "snack", "sweet", "treat" ]
        }, {
            title: "fal fa-cookie-bite",
            searchTerms: [ "baked good", "bitten", "chips", "eating", "food", "snack", "sweet", "treat" ]
        }, {
            title: "fas fa-copy",
            searchTerms: [ "clone", "duplicate", "file", "files-o" ]
        }, {
            title: "far fa-copy",
            searchTerms: [ "clone", "duplicate", "file", "files-o" ]
        }, {
            title: "fal fa-copy",
            searchTerms: [ "clone", "duplicate", "file", "files-o" ]
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
            title: "fab fa-creative-commons-by",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-nc",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-nc-eu",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-nc-jp",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-nd",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-pd",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-pd-alt",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-remix",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-sa",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-sampling",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-sampling-plus",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-share",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-zero",
            searchTerms: []
        }, {
            title: "fas fa-credit-card",
            searchTerms: [ "buy", "checkout", "credit-card-alt", "debit", "money", "payment", "purchase" ]
        }, {
            title: "far fa-credit-card",
            searchTerms: [ "buy", "checkout", "credit-card-alt", "debit", "money", "payment", "purchase" ]
        }, {
            title: "fal fa-credit-card",
            searchTerms: [ "buy", "checkout", "credit-card-alt", "debit", "money", "payment", "purchase" ]
        }, {
            title: "fas fa-credit-card-blank",
            searchTerms: [ "buy", "checkout", "debit", "money", "payment", "purchase" ]
        }, {
            title: "far fa-credit-card-blank",
            searchTerms: [ "buy", "checkout", "debit", "money", "payment", "purchase" ]
        }, {
            title: "fal fa-credit-card-blank",
            searchTerms: [ "buy", "checkout", "debit", "money", "payment", "purchase" ]
        }, {
            title: "fas fa-credit-card-front",
            searchTerms: [ "buy", "checkout", "chip", "debit", "money", "payment", "purchase" ]
        }, {
            title: "far fa-credit-card-front",
            searchTerms: [ "buy", "checkout", "chip", "debit", "money", "payment", "purchase" ]
        }, {
            title: "fal fa-credit-card-front",
            searchTerms: [ "buy", "checkout", "chip", "debit", "money", "payment", "purchase" ]
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
            title: "fas fa-crop-alt",
            searchTerms: []
        }, {
            title: "far fa-crop-alt",
            searchTerms: []
        }, {
            title: "fal fa-crop-alt",
            searchTerms: []
        }, {
            title: "fas fa-crosshairs",
            searchTerms: [ "gpd", "picker", "position" ]
        }, {
            title: "far fa-crosshairs",
            searchTerms: [ "gpd", "picker", "position" ]
        }, {
            title: "fal fa-crosshairs",
            searchTerms: [ "gpd", "picker", "position" ]
        }, {
            title: "fas fa-crow",
            searchTerms: [ "bird", "bullfrog", "toad" ]
        }, {
            title: "far fa-crow",
            searchTerms: [ "bird", "bullfrog", "toad" ]
        }, {
            title: "fal fa-crow",
            searchTerms: [ "bird", "bullfrog", "toad" ]
        }, {
            title: "fas fa-crown",
            searchTerms: []
        }, {
            title: "far fa-crown",
            searchTerms: []
        }, {
            title: "fal fa-crown",
            searchTerms: []
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
            searchTerms: [ "computer", "cpu", "demo", "desktop", "device", "machine", "monitor", "pc", "screen" ]
        }, {
            title: "far fa-desktop",
            searchTerms: [ "computer", "cpu", "demo", "desktop", "device", "machine", "monitor", "pc", "screen" ]
        }, {
            title: "fal fa-desktop",
            searchTerms: [ "computer", "cpu", "demo", "desktop", "device", "machine", "monitor", "pc", "screen" ]
        }, {
            title: "fas fa-desktop-alt",
            searchTerms: [ "apple", "computer", "cpu", "demo", "desktop", "device", "imac", "machine", "monitor", "screen" ]
        }, {
            title: "far fa-desktop-alt",
            searchTerms: [ "apple", "computer", "cpu", "demo", "desktop", "device", "imac", "machine", "monitor", "screen" ]
        }, {
            title: "fal fa-desktop-alt",
            searchTerms: [ "apple", "computer", "cpu", "demo", "desktop", "device", "imac", "machine", "monitor", "screen" ]
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
            title: "fas fa-dice",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "far fa-dice",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fas fa-dice-five",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "far fa-dice-five",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-five",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fas fa-dice-four",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "far fa-dice-four",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-four",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fas fa-dice-one",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "far fa-dice-one",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-one",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fas fa-dice-six",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "far fa-dice-six",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-six",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fas fa-dice-three",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "far fa-dice-three",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-three",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fas fa-dice-two",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "far fa-dice-two",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-two",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fab fa-digg",
            searchTerms: []
        }, {
            title: "fab fa-digital-ocean",
            searchTerms: []
        }, {
            title: "fas fa-digital-tachograph",
            searchTerms: []
        }, {
            title: "far fa-digital-tachograph",
            searchTerms: []
        }, {
            title: "fal fa-digital-tachograph",
            searchTerms: []
        }, {
            title: "fas fa-diploma",
            searchTerms: []
        }, {
            title: "far fa-diploma",
            searchTerms: []
        }, {
            title: "fal fa-diploma",
            searchTerms: []
        }, {
            title: "fas fa-directions",
            searchTerms: []
        }, {
            title: "far fa-directions",
            searchTerms: []
        }, {
            title: "fal fa-directions",
            searchTerms: []
        }, {
            title: "fab fa-discord",
            searchTerms: []
        }, {
            title: "fab fa-discourse",
            searchTerms: []
        }, {
            title: "fas fa-divide",
            searchTerms: []
        }, {
            title: "far fa-divide",
            searchTerms: []
        }, {
            title: "fal fa-divide",
            searchTerms: []
        }, {
            title: "fas fa-dizzy",
            searchTerms: [ "dazed", "disapprove", "emoticon", "face" ]
        }, {
            title: "far fa-dizzy",
            searchTerms: [ "dazed", "disapprove", "emoticon", "face" ]
        }, {
            title: "fal fa-dizzy",
            searchTerms: [ "dazed", "disapprove", "emoticon", "face" ]
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
            title: "fas fa-do-not-enter",
            searchTerms: []
        }, {
            title: "far fa-do-not-enter",
            searchTerms: []
        }, {
            title: "fal fa-do-not-enter",
            searchTerms: []
        }, {
            title: "fab fa-dochub",
            searchTerms: []
        }, {
            title: "fab fa-docker",
            searchTerms: []
        }, {
            title: "fas fa-dollar-sign",
            searchTerms: [ "$", "dollar-sign", "money", "price", "usd" ]
        }, {
            title: "far fa-dollar-sign",
            searchTerms: [ "$", "dollar-sign", "money", "price", "usd" ]
        }, {
            title: "fal fa-dollar-sign",
            searchTerms: [ "$", "dollar-sign", "money", "price", "usd" ]
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
            searchTerms: [ "generosity", "give" ]
        }, {
            title: "far fa-donate",
            searchTerms: [ "generosity", "give" ]
        }, {
            title: "fal fa-donate",
            searchTerms: [ "generosity", "give" ]
        }, {
            title: "fas fa-door-closed",
            searchTerms: []
        }, {
            title: "far fa-door-closed",
            searchTerms: []
        }, {
            title: "fal fa-door-closed",
            searchTerms: []
        }, {
            title: "fas fa-door-open",
            searchTerms: []
        }, {
            title: "far fa-door-open",
            searchTerms: []
        }, {
            title: "fal fa-door-open",
            searchTerms: []
        }, {
            title: "fas fa-dot-circle",
            searchTerms: [ "bullseye", "notification", "target" ]
        }, {
            title: "far fa-dot-circle",
            searchTerms: [ "bullseye", "notification", "target" ]
        }, {
            title: "fal fa-dot-circle",
            searchTerms: [ "bullseye", "notification", "target" ]
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
            title: "fas fa-drafting-compass",
            searchTerms: [ "mechanical drawing", "plot", "plotting" ]
        }, {
            title: "far fa-drafting-compass",
            searchTerms: [ "mechanical drawing", "plot", "plotting" ]
        }, {
            title: "fal fa-drafting-compass",
            searchTerms: [ "mechanical drawing", "plot", "plotting" ]
        }, {
            title: "fas fa-draw-circle",
            searchTerms: []
        }, {
            title: "far fa-draw-circle",
            searchTerms: []
        }, {
            title: "fal fa-draw-circle",
            searchTerms: []
        }, {
            title: "fas fa-draw-polygon",
            searchTerms: []
        }, {
            title: "far fa-draw-polygon",
            searchTerms: []
        }, {
            title: "fal fa-draw-polygon",
            searchTerms: []
        }, {
            title: "fas fa-draw-square",
            searchTerms: []
        }, {
            title: "far fa-draw-square",
            searchTerms: []
        }, {
            title: "fal fa-draw-square",
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
            title: "fas fa-drum",
            searchTerms: [ "instrument", "music", "percussion", "snare", "sound" ]
        }, {
            title: "far fa-drum",
            searchTerms: [ "instrument", "music", "percussion", "snare", "sound" ]
        }, {
            title: "fal fa-drum",
            searchTerms: [ "instrument", "music", "percussion", "snare", "sound" ]
        }, {
            title: "fas fa-drum-steelpan",
            searchTerms: [ "calypso", "instrument", "music", "percussion", "reggae", "snare", "sound", "steel", "tropical" ]
        }, {
            title: "far fa-drum-steelpan",
            searchTerms: [ "calypso", "instrument", "music", "percussion", "reggae", "snare", "sound", "steel", "tropical" ]
        }, {
            title: "fal fa-drum-steelpan",
            searchTerms: [ "calypso", "instrument", "music", "percussion", "reggae", "snare", "sound", "steel", "tropical" ]
        }, {
            title: "fab fa-drupal",
            searchTerms: []
        }, {
            title: "fas fa-dumbbell",
            searchTerms: [ "exercise", "gym", "strength", "weight", "weight-lifting" ]
        }, {
            title: "far fa-dumbbell",
            searchTerms: [ "exercise", "gym", "strength", "weight", "weight-lifting" ]
        }, {
            title: "fal fa-dumbbell",
            searchTerms: [ "exercise", "gym", "strength", "weight", "weight-lifting" ]
        }, {
            title: "fab fa-dyalog",
            searchTerms: []
        }, {
            title: "fas fa-ear",
            searchTerms: []
        }, {
            title: "far fa-ear",
            searchTerms: []
        }, {
            title: "fal fa-ear",
            searchTerms: []
        }, {
            title: "fab fa-earlybirds",
            searchTerms: []
        }, {
            title: "fab fa-ebay",
            searchTerms: []
        }, {
            title: "fab fa-edge",
            searchTerms: [ "browser", "ie" ]
        }, {
            title: "fas fa-edit",
            searchTerms: [ "edit", "pen", "pencil", "update", "write" ]
        }, {
            title: "far fa-edit",
            searchTerms: [ "edit", "pen", "pencil", "update", "write" ]
        }, {
            title: "fal fa-edit",
            searchTerms: [ "edit", "pen", "pencil", "update", "write" ]
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
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "far fa-ellipsis-h",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fal fa-ellipsis-h",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fas fa-ellipsis-h-alt",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "far fa-ellipsis-h-alt",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fal fa-ellipsis-h-alt",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fas fa-ellipsis-v",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "far fa-ellipsis-v",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fal fa-ellipsis-v",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fas fa-ellipsis-v-alt",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "far fa-ellipsis-v-alt",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fal fa-ellipsis-v-alt",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fab fa-ello",
            searchTerms: []
        }, {
            title: "fab fa-ember",
            searchTerms: []
        }, {
            title: "fab fa-empire",
            searchTerms: []
        }, {
            title: "fas fa-engine-warning",
            searchTerms: []
        }, {
            title: "far fa-engine-warning",
            searchTerms: []
        }, {
            title: "fal fa-engine-warning",
            searchTerms: []
        }, {
            title: "fas fa-envelope",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "far fa-envelope",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fal fa-envelope",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fas fa-envelope-open",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "far fa-envelope-open",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fal fa-envelope-open",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fas fa-envelope-square",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "far fa-envelope-square",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fal fa-envelope-square",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fab fa-envira",
            searchTerms: [ "leaf" ]
        }, {
            title: "fas fa-equals",
            searchTerms: []
        }, {
            title: "far fa-equals",
            searchTerms: []
        }, {
            title: "fal fa-equals",
            searchTerms: []
        }, {
            title: "fas fa-eraser",
            searchTerms: [ "delete", "remove" ]
        }, {
            title: "far fa-eraser",
            searchTerms: [ "delete", "remove" ]
        }, {
            title: "fal fa-eraser",
            searchTerms: [ "delete", "remove" ]
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
            searchTerms: [ "arrow", "arrows", "reciprocate", "return", "swap", "transfer" ]
        }, {
            title: "far fa-exchange",
            searchTerms: [ "arrow", "arrows", "reciprocate", "return", "swap", "transfer" ]
        }, {
            title: "fal fa-exchange",
            searchTerms: [ "arrow", "arrows", "reciprocate", "return", "swap", "transfer" ]
        }, {
            title: "fas fa-exchange-alt",
            searchTerms: [ "arrow", "arrows", "exchange", "reciprocate", "return", "swap", "transfer" ]
        }, {
            title: "far fa-exchange-alt",
            searchTerms: [ "arrow", "arrows", "exchange", "reciprocate", "return", "swap", "transfer" ]
        }, {
            title: "fal fa-exchange-alt",
            searchTerms: [ "arrow", "arrows", "exchange", "reciprocate", "return", "swap", "transfer" ]
        }, {
            title: "fas fa-exclamation",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "far fa-exclamation",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fal fa-exclamation",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fas fa-exclamation-circle",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "far fa-exclamation-circle",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fal fa-exclamation-circle",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fas fa-exclamation-square",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "far fa-exclamation-square",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fal fa-exclamation-square",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fas fa-exclamation-triangle",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "far fa-exclamation-triangle",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fal fa-exclamation-triangle",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fas fa-expand",
            searchTerms: [ "bigger", "enlarge", "resize" ]
        }, {
            title: "far fa-expand",
            searchTerms: [ "bigger", "enlarge", "resize" ]
        }, {
            title: "fal fa-expand",
            searchTerms: [ "bigger", "enlarge", "resize" ]
        }, {
            title: "fas fa-expand-alt",
            searchTerms: [ "bigger", "enlarge", "resize" ]
        }, {
            title: "far fa-expand-alt",
            searchTerms: [ "bigger", "enlarge", "resize" ]
        }, {
            title: "fal fa-expand-alt",
            searchTerms: [ "bigger", "enlarge", "resize" ]
        }, {
            title: "fas fa-expand-arrows",
            searchTerms: [ "bigger", "enlarge", "move", "resize" ]
        }, {
            title: "far fa-expand-arrows",
            searchTerms: [ "bigger", "enlarge", "move", "resize" ]
        }, {
            title: "fal fa-expand-arrows",
            searchTerms: [ "bigger", "enlarge", "move", "resize" ]
        }, {
            title: "fas fa-expand-arrows-alt",
            searchTerms: [ "arrows-alt", "bigger", "enlarge", "move", "resize" ]
        }, {
            title: "far fa-expand-arrows-alt",
            searchTerms: [ "arrows-alt", "bigger", "enlarge", "move", "resize" ]
        }, {
            title: "fal fa-expand-arrows-alt",
            searchTerms: [ "arrows-alt", "bigger", "enlarge", "move", "resize" ]
        }, {
            title: "fas fa-expand-wide",
            searchTerms: [ "bigger", "enlarge", "resize" ]
        }, {
            title: "far fa-expand-wide",
            searchTerms: [ "bigger", "enlarge", "resize" ]
        }, {
            title: "fal fa-expand-wide",
            searchTerms: [ "bigger", "enlarge", "resize" ]
        }, {
            title: "fab fa-expeditedssl",
            searchTerms: []
        }, {
            title: "fas fa-external-link",
            searchTerms: [ "new", "open" ]
        }, {
            title: "far fa-external-link",
            searchTerms: [ "new", "open" ]
        }, {
            title: "fal fa-external-link",
            searchTerms: [ "new", "open" ]
        }, {
            title: "fas fa-external-link-alt",
            searchTerms: [ "external-link", "new", "open" ]
        }, {
            title: "far fa-external-link-alt",
            searchTerms: [ "external-link", "new", "open" ]
        }, {
            title: "fal fa-external-link-alt",
            searchTerms: [ "external-link", "new", "open" ]
        }, {
            title: "fas fa-external-link-square",
            searchTerms: [ "new", "open" ]
        }, {
            title: "far fa-external-link-square",
            searchTerms: [ "new", "open" ]
        }, {
            title: "fal fa-external-link-square",
            searchTerms: [ "new", "open" ]
        }, {
            title: "fas fa-external-link-square-alt",
            searchTerms: [ "external-link-square", "new", "open" ]
        }, {
            title: "far fa-external-link-square-alt",
            searchTerms: [ "external-link-square", "new", "open" ]
        }, {
            title: "fal fa-external-link-square-alt",
            searchTerms: [ "external-link-square", "new", "open" ]
        }, {
            title: "fas fa-eye",
            searchTerms: [ "optic", "see", "seen", "show", "sight", "views", "visible" ]
        }, {
            title: "far fa-eye",
            searchTerms: [ "optic", "see", "seen", "show", "sight", "views", "visible" ]
        }, {
            title: "fal fa-eye",
            searchTerms: [ "optic", "see", "seen", "show", "sight", "views", "visible" ]
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
            searchTerms: [ "blind", "hide", "show", "toggle", "unseen", "views", "visible", "visiblity" ]
        }, {
            title: "far fa-eye-slash",
            searchTerms: [ "blind", "hide", "show", "toggle", "unseen", "views", "visible", "visiblity" ]
        }, {
            title: "fal fa-eye-slash",
            searchTerms: [ "blind", "hide", "show", "toggle", "unseen", "views", "visible", "visiblity" ]
        }, {
            title: "fab fa-facebook",
            searchTerms: [ "facebook-official", "social network" ]
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
            searchTerms: [ "beginning", "first", "previous", "rewind", "start" ]
        }, {
            title: "far fa-fast-backward",
            searchTerms: [ "beginning", "first", "previous", "rewind", "start" ]
        }, {
            title: "fal fa-fast-backward",
            searchTerms: [ "beginning", "first", "previous", "rewind", "start" ]
        }, {
            title: "fas fa-fast-forward",
            searchTerms: [ "end", "last", "next" ]
        }, {
            title: "far fa-fast-forward",
            searchTerms: [ "end", "last", "next" ]
        }, {
            title: "fal fa-fast-forward",
            searchTerms: [ "end", "last", "next" ]
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
            title: "fas fa-feather",
            searchTerms: [ "bird", "light", "plucked", "quill" ]
        }, {
            title: "far fa-feather",
            searchTerms: [ "bird", "light", "plucked", "quill" ]
        }, {
            title: "fal fa-feather",
            searchTerms: [ "bird", "light", "plucked", "quill" ]
        }, {
            title: "fas fa-feather-alt",
            searchTerms: [ "bird", "light", "plucked", "quill" ]
        }, {
            title: "far fa-feather-alt",
            searchTerms: [ "bird", "light", "plucked", "quill" ]
        }, {
            title: "fal fa-feather-alt",
            searchTerms: [ "bird", "light", "plucked", "quill" ]
        }, {
            title: "fas fa-female",
            searchTerms: [ "human", "person", "profile", "user", "woman" ]
        }, {
            title: "far fa-female",
            searchTerms: [ "human", "person", "profile", "user", "woman" ]
        }, {
            title: "fal fa-female",
            searchTerms: [ "human", "person", "profile", "user", "woman" ]
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
            searchTerms: [ "airplane", "fast", "fly", "goose", "maverick", "plane", "quick", "top gun", "transportation", "travel" ]
        }, {
            title: "far fa-fighter-jet",
            searchTerms: [ "airplane", "fast", "fly", "goose", "maverick", "plane", "quick", "top gun", "transportation", "travel" ]
        }, {
            title: "fal fa-fighter-jet",
            searchTerms: [ "airplane", "fast", "fly", "goose", "maverick", "plane", "quick", "top gun", "transportation", "travel" ]
        }, {
            title: "fas fa-file",
            searchTerms: [ "document", "new", "page", "pdf", "resume" ]
        }, {
            title: "far fa-file",
            searchTerms: [ "document", "new", "page", "pdf", "resume" ]
        }, {
            title: "fal fa-file",
            searchTerms: [ "document", "new", "page", "pdf", "resume" ]
        }, {
            title: "fas fa-file-alt",
            searchTerms: [ "document", "file-text", "invoice", "new", "page", "pdf" ]
        }, {
            title: "far fa-file-alt",
            searchTerms: [ "document", "file-text", "invoice", "new", "page", "pdf" ]
        }, {
            title: "fal fa-file-alt",
            searchTerms: [ "document", "file-text", "invoice", "new", "page", "pdf" ]
        }, {
            title: "fas fa-file-archive",
            searchTerms: [ ".zip", "bundle", "compress", "compression", "download", "zip" ]
        }, {
            title: "far fa-file-archive",
            searchTerms: [ ".zip", "bundle", "compress", "compression", "download", "zip" ]
        }, {
            title: "fal fa-file-archive",
            searchTerms: [ ".zip", "bundle", "compress", "compression", "download", "zip" ]
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
            title: "fas fa-file-certificate",
            searchTerms: []
        }, {
            title: "far fa-file-certificate",
            searchTerms: []
        }, {
            title: "fal fa-file-certificate",
            searchTerms: []
        }, {
            title: "fas fa-file-check",
            searchTerms: [ "accept", "agree", "confirm", "done", "ok", "select", "success", "synced", "todo" ]
        }, {
            title: "far fa-file-check",
            searchTerms: [ "accept", "agree", "confirm", "done", "ok", "select", "success", "synced", "todo" ]
        }, {
            title: "fal fa-file-check",
            searchTerms: [ "accept", "agree", "confirm", "done", "ok", "select", "success", "synced", "todo" ]
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
            title: "fas fa-file-contract",
            searchTerms: [ "agreement", "binding", "document", "legal", "signature" ]
        }, {
            title: "far fa-file-contract",
            searchTerms: [ "agreement", "binding", "document", "legal", "signature" ]
        }, {
            title: "fal fa-file-contract",
            searchTerms: [ "agreement", "binding", "document", "legal", "signature" ]
        }, {
            title: "fas fa-file-download",
            searchTerms: []
        }, {
            title: "far fa-file-download",
            searchTerms: []
        }, {
            title: "fal fa-file-download",
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
            searchTerms: [ "important" ]
        }, {
            title: "far fa-file-exclamation",
            searchTerms: [ "important" ]
        }, {
            title: "fal fa-file-exclamation",
            searchTerms: [ "important" ]
        }, {
            title: "fas fa-file-export",
            searchTerms: []
        }, {
            title: "far fa-file-export",
            searchTerms: []
        }, {
            title: "fal fa-file-export",
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
            title: "fas fa-file-import",
            searchTerms: []
        }, {
            title: "far fa-file-import",
            searchTerms: []
        }, {
            title: "fal fa-file-import",
            searchTerms: []
        }, {
            title: "fas fa-file-invoice",
            searchTerms: [ "bill", "document", "receipt" ]
        }, {
            title: "far fa-file-invoice",
            searchTerms: [ "bill", "document", "receipt" ]
        }, {
            title: "fal fa-file-invoice",
            searchTerms: [ "bill", "document", "receipt" ]
        }, {
            title: "fas fa-file-invoice-dollar",
            searchTerms: [ "$", "bill", "document", "dollar-sign", "money", "receipt", "usd" ]
        }, {
            title: "far fa-file-invoice-dollar",
            searchTerms: [ "$", "bill", "document", "dollar-sign", "money", "receipt", "usd" ]
        }, {
            title: "fal fa-file-invoice-dollar",
            searchTerms: [ "$", "bill", "document", "dollar-sign", "money", "receipt", "usd" ]
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
            title: "fas fa-file-prescription",
            searchTerms: [ "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "far fa-file-prescription",
            searchTerms: [ "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "fal fa-file-prescription",
            searchTerms: [ "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "fas fa-file-signature",
            searchTerms: [ "John Hancock", "contract", "document", "name" ]
        }, {
            title: "far fa-file-signature",
            searchTerms: [ "John Hancock", "contract", "document", "name" ]
        }, {
            title: "fal fa-file-signature",
            searchTerms: [ "John Hancock", "contract", "document", "name" ]
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
            title: "fas fa-file-upload",
            searchTerms: []
        }, {
            title: "far fa-file-upload",
            searchTerms: []
        }, {
            title: "fal fa-file-upload",
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
            title: "fas fa-fill",
            searchTerms: [ "bucket", "color", "paint", "paint bucket" ]
        }, {
            title: "far fa-fill",
            searchTerms: [ "bucket", "color", "paint", "paint bucket" ]
        }, {
            title: "fal fa-fill",
            searchTerms: [ "bucket", "color", "paint", "paint bucket" ]
        }, {
            title: "fas fa-fill-drip",
            searchTerms: [ "bucket", "color", "drop", "paint", "paint bucket", "spill" ]
        }, {
            title: "far fa-fill-drip",
            searchTerms: [ "bucket", "color", "drop", "paint", "paint bucket", "spill" ]
        }, {
            title: "fal fa-fill-drip",
            searchTerms: [ "bucket", "color", "drop", "paint", "paint bucket", "spill" ]
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
            title: "fas fa-fingerprint",
            searchTerms: [ "human", "id", "identification", "lock", "smudge", "touch", "unique", "unlock" ]
        }, {
            title: "far fa-fingerprint",
            searchTerms: [ "human", "id", "identification", "lock", "smudge", "touch", "unique", "unlock" ]
        }, {
            title: "fal fa-fingerprint",
            searchTerms: [ "human", "id", "identification", "lock", "smudge", "touch", "unique", "unlock" ]
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
            title: "fab fa-first-order-alt",
            searchTerms: []
        }, {
            title: "fab fa-firstdraft",
            searchTerms: []
        }, {
            title: "fas fa-fish",
            searchTerms: []
        }, {
            title: "far fa-fish",
            searchTerms: []
        }, {
            title: "fal fa-fish",
            searchTerms: []
        }, {
            title: "fas fa-flag",
            searchTerms: [ "notice", "notification", "notify", "report" ]
        }, {
            title: "far fa-flag",
            searchTerms: [ "notice", "notification", "notify", "report" ]
        }, {
            title: "fal fa-flag",
            searchTerms: [ "notice", "notification", "notify", "report" ]
        }, {
            title: "fas fa-flag-checkered",
            searchTerms: [ "notice", "notification", "notify", "report" ]
        }, {
            title: "far fa-flag-checkered",
            searchTerms: [ "notice", "notification", "notify", "report" ]
        }, {
            title: "fal fa-flag-checkered",
            searchTerms: [ "notice", "notification", "notify", "report" ]
        }, {
            title: "fas fa-flask",
            searchTerms: [ "beaker", "experimental", "labs", "science" ]
        }, {
            title: "far fa-flask",
            searchTerms: [ "beaker", "experimental", "labs", "science" ]
        }, {
            title: "fal fa-flask",
            searchTerms: [ "beaker", "experimental", "labs", "science" ]
        }, {
            title: "fab fa-flickr",
            searchTerms: []
        }, {
            title: "fab fa-flipboard",
            searchTerms: []
        }, {
            title: "fas fa-flushed",
            searchTerms: [ "embarrassed", "emoticon", "face" ]
        }, {
            title: "far fa-flushed",
            searchTerms: [ "embarrassed", "emoticon", "face" ]
        }, {
            title: "fal fa-flushed",
            searchTerms: [ "embarrassed", "emoticon", "face" ]
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
            title: "fas fa-font-awesome-logo-full",
            searchTerms: []
        }, {
            title: "far fa-font-awesome-logo-full",
            searchTerms: []
        }, {
            title: "fal fa-font-awesome-logo-full",
            searchTerms: []
        }, {
            title: "fab fa-font-awesome-logo-full",
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
            title: "fas fa-frog",
            searchTerms: [ "bullfrog", "kermit", "kiss", "prince", "toad", "wart" ]
        }, {
            title: "far fa-frog",
            searchTerms: [ "bullfrog", "kermit", "kiss", "prince", "toad", "wart" ]
        }, {
            title: "fal fa-frog",
            searchTerms: [ "bullfrog", "kermit", "kiss", "prince", "toad", "wart" ]
        }, {
            title: "fas fa-frown",
            searchTerms: [ "disapprove", "emoticon", "face", "rating", "sad" ]
        }, {
            title: "far fa-frown",
            searchTerms: [ "disapprove", "emoticon", "face", "rating", "sad" ]
        }, {
            title: "fal fa-frown",
            searchTerms: [ "disapprove", "emoticon", "face", "rating", "sad" ]
        }, {
            title: "fas fa-frown-open",
            searchTerms: [ "disapprove", "emoticon", "face", "rating", "sad" ]
        }, {
            title: "far fa-frown-open",
            searchTerms: [ "disapprove", "emoticon", "face", "rating", "sad" ]
        }, {
            title: "fal fa-frown-open",
            searchTerms: [ "disapprove", "emoticon", "face", "rating", "sad" ]
        }, {
            title: "fab fa-fulcrum",
            searchTerms: []
        }, {
            title: "fas fa-futbol",
            searchTerms: [ "ball", "football", "soccer" ]
        }, {
            title: "far fa-futbol",
            searchTerms: [ "ball", "football", "soccer" ]
        }, {
            title: "fal fa-futbol",
            searchTerms: [ "ball", "football", "soccer" ]
        }, {
            title: "fab fa-galactic-republic",
            searchTerms: []
        }, {
            title: "fab fa-galactic-senate",
            searchTerms: []
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
            title: "fas fa-gas-pump",
            searchTerms: []
        }, {
            title: "far fa-gas-pump",
            searchTerms: []
        }, {
            title: "fal fa-gas-pump",
            searchTerms: []
        }, {
            title: "fas fa-gas-pump-slash",
            searchTerms: []
        }, {
            title: "far fa-gas-pump-slash",
            searchTerms: []
        }, {
            title: "fal fa-gas-pump-slash",
            searchTerms: []
        }, {
            title: "fas fa-gavel",
            searchTerms: [ "hammer", "judge", "lawyer", "opinion" ]
        }, {
            title: "far fa-gavel",
            searchTerms: [ "hammer", "judge", "lawyer", "opinion" ]
        }, {
            title: "fal fa-gavel",
            searchTerms: [ "hammer", "judge", "lawyer", "opinion" ]
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
            searchTerms: [ "generosity", "giving", "party", "present", "wrapped" ]
        }, {
            title: "far fa-gift",
            searchTerms: [ "generosity", "giving", "party", "present", "wrapped" ]
        }, {
            title: "fal fa-gift",
            searchTerms: [ "generosity", "giving", "party", "present", "wrapped" ]
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
            searchTerms: [ "alcohol", "bar", "drink", "glass", "liquor", "martini" ]
        }, {
            title: "far fa-glass-martini",
            searchTerms: [ "alcohol", "bar", "drink", "glass", "liquor", "martini" ]
        }, {
            title: "fal fa-glass-martini",
            searchTerms: [ "alcohol", "bar", "drink", "glass", "liquor", "martini" ]
        }, {
            title: "fas fa-glass-martini-alt",
            searchTerms: []
        }, {
            title: "far fa-glass-martini-alt",
            searchTerms: []
        }, {
            title: "fal fa-glass-martini-alt",
            searchTerms: []
        }, {
            title: "fas fa-glasses",
            searchTerms: [ "foureyes", "hipster", "nerd", "reading", "sight", "spectacles" ]
        }, {
            title: "far fa-glasses",
            searchTerms: [ "foureyes", "hipster", "nerd", "reading", "sight", "spectacles" ]
        }, {
            title: "fal fa-glasses",
            searchTerms: [ "foureyes", "hipster", "nerd", "reading", "sight", "spectacles" ]
        }, {
            title: "fas fa-glasses-alt",
            searchTerms: []
        }, {
            title: "far fa-glasses-alt",
            searchTerms: []
        }, {
            title: "fal fa-glasses-alt",
            searchTerms: []
        }, {
            title: "fab fa-glide",
            searchTerms: []
        }, {
            title: "fab fa-glide-g",
            searchTerms: []
        }, {
            title: "fas fa-globe",
            searchTerms: [ "all", "coordinates", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "far fa-globe",
            searchTerms: [ "all", "coordinates", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fal fa-globe",
            searchTerms: [ "all", "coordinates", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fas fa-globe-africa",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "far fa-globe-africa",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fal fa-globe-africa",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fas fa-globe-americas",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "far fa-globe-americas",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fal fa-globe-americas",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fas fa-globe-asia",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "far fa-globe-asia",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fal fa-globe-asia",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fas fa-globe-stand",
            searchTerms: []
        }, {
            title: "far fa-globe-stand",
            searchTerms: []
        }, {
            title: "fal fa-globe-stand",
            searchTerms: []
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
            searchTerms: [ "google-plus", "social network" ]
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
            searchTerms: [ "favorite", "heart", "like", "love" ]
        }, {
            title: "fab fa-grav",
            searchTerms: []
        }, {
            title: "fas fa-greater-than",
            searchTerms: []
        }, {
            title: "far fa-greater-than",
            searchTerms: []
        }, {
            title: "fal fa-greater-than",
            searchTerms: []
        }, {
            title: "fas fa-greater-than-equal",
            searchTerms: []
        }, {
            title: "far fa-greater-than-equal",
            searchTerms: []
        }, {
            title: "fal fa-greater-than-equal",
            searchTerms: []
        }, {
            title: "fas fa-grimace",
            searchTerms: [ "cringe", "emoticon", "face" ]
        }, {
            title: "far fa-grimace",
            searchTerms: [ "cringe", "emoticon", "face" ]
        }, {
            title: "fal fa-grimace",
            searchTerms: [ "cringe", "emoticon", "face" ]
        }, {
            title: "fas fa-grin",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "far fa-grin",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fal fa-grin",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fas fa-grin-alt",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "far fa-grin-alt",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fal fa-grin-alt",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fas fa-grin-beam",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "far fa-grin-beam",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fal fa-grin-beam",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fas fa-grin-beam-sweat",
            searchTerms: [ "emoticon", "face", "smile" ]
        }, {
            title: "far fa-grin-beam-sweat",
            searchTerms: [ "emoticon", "face", "smile" ]
        }, {
            title: "fal fa-grin-beam-sweat",
            searchTerms: [ "emoticon", "face", "smile" ]
        }, {
            title: "fas fa-grin-hearts",
            searchTerms: [ "emoticon", "face", "love", "smile" ]
        }, {
            title: "far fa-grin-hearts",
            searchTerms: [ "emoticon", "face", "love", "smile" ]
        }, {
            title: "fal fa-grin-hearts",
            searchTerms: [ "emoticon", "face", "love", "smile" ]
        }, {
            title: "fas fa-grin-squint",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "far fa-grin-squint",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fal fa-grin-squint",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fas fa-grin-squint-tears",
            searchTerms: [ "emoticon", "face", "happy", "smile" ]
        }, {
            title: "far fa-grin-squint-tears",
            searchTerms: [ "emoticon", "face", "happy", "smile" ]
        }, {
            title: "fal fa-grin-squint-tears",
            searchTerms: [ "emoticon", "face", "happy", "smile" ]
        }, {
            title: "fas fa-grin-stars",
            searchTerms: [ "emoticon", "face", "star-struck" ]
        }, {
            title: "far fa-grin-stars",
            searchTerms: [ "emoticon", "face", "star-struck" ]
        }, {
            title: "fal fa-grin-stars",
            searchTerms: [ "emoticon", "face", "star-struck" ]
        }, {
            title: "fas fa-grin-tears",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "far fa-grin-tears",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fal fa-grin-tears",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fas fa-grin-tongue",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "far fa-grin-tongue",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fal fa-grin-tongue",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fas fa-grin-tongue-squint",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "far fa-grin-tongue-squint",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fal fa-grin-tongue-squint",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fas fa-grin-tongue-wink",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "far fa-grin-tongue-wink",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fal fa-grin-tongue-wink",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fas fa-grin-wink",
            searchTerms: [ "emoticon", "face", "flirt", "laugh", "smile" ]
        }, {
            title: "far fa-grin-wink",
            searchTerms: [ "emoticon", "face", "flirt", "laugh", "smile" ]
        }, {
            title: "fal fa-grin-wink",
            searchTerms: [ "emoticon", "face", "flirt", "laugh", "smile" ]
        }, {
            title: "fas fa-grip-horizontal",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "far fa-grip-horizontal",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "fal fa-grip-horizontal",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "fas fa-grip-vertical",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "far fa-grip-vertical",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "fal fa-grip-vertical",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
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
            title: "fab fa-hackerrank",
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
            searchTerms: [ "$", "dollar sign", "donation", "giving", "money", "price" ]
        }, {
            title: "far fa-hand-holding-usd",
            searchTerms: [ "$", "dollar sign", "donation", "giving", "money", "price" ]
        }, {
            title: "fal fa-hand-holding-usd",
            searchTerms: [ "$", "dollar sign", "donation", "giving", "money", "price" ]
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
            searchTerms: [ "finger", "hand-o-down", "point" ]
        }, {
            title: "far fa-hand-point-down",
            searchTerms: [ "finger", "hand-o-down", "point" ]
        }, {
            title: "fal fa-hand-point-down",
            searchTerms: [ "finger", "hand-o-down", "point" ]
        }, {
            title: "fas fa-hand-point-left",
            searchTerms: [ "back", "finger", "hand-o-left", "left", "point", "previous" ]
        }, {
            title: "far fa-hand-point-left",
            searchTerms: [ "back", "finger", "hand-o-left", "left", "point", "previous" ]
        }, {
            title: "fal fa-hand-point-left",
            searchTerms: [ "back", "finger", "hand-o-left", "left", "point", "previous" ]
        }, {
            title: "fas fa-hand-point-right",
            searchTerms: [ "finger", "forward", "hand-o-right", "next", "point", "right" ]
        }, {
            title: "far fa-hand-point-right",
            searchTerms: [ "finger", "forward", "hand-o-right", "next", "point", "right" ]
        }, {
            title: "fal fa-hand-point-right",
            searchTerms: [ "finger", "forward", "hand-o-right", "next", "point", "right" ]
        }, {
            title: "fas fa-hand-point-up",
            searchTerms: [ "finger", "hand-o-up", "point" ]
        }, {
            title: "far fa-hand-point-up",
            searchTerms: [ "finger", "hand-o-up", "point" ]
        }, {
            title: "fal fa-hand-point-up",
            searchTerms: [ "finger", "hand-o-up", "point" ]
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
            searchTerms: [ "aid", "assistance", "partnership", "volunteering" ]
        }, {
            title: "far fa-hands-helping",
            searchTerms: [ "aid", "assistance", "partnership", "volunteering" ]
        }, {
            title: "fal fa-hands-helping",
            searchTerms: [ "aid", "assistance", "partnership", "volunteering" ]
        }, {
            title: "fas fa-hands-usd",
            searchTerms: [ "$", "dollar sign", "donation", "giving", "money", "price", "usd" ]
        }, {
            title: "far fa-hands-usd",
            searchTerms: [ "$", "dollar sign", "donation", "giving", "money", "price", "usd" ]
        }, {
            title: "fal fa-hands-usd",
            searchTerms: [ "$", "dollar sign", "donation", "giving", "money", "price", "usd" ]
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
            searchTerms: [ "cpu", "hard drive", "harddrive", "machine", "save", "storage" ]
        }, {
            title: "far fa-hdd",
            searchTerms: [ "cpu", "hard drive", "harddrive", "machine", "save", "storage" ]
        }, {
            title: "fal fa-hdd",
            searchTerms: [ "cpu", "hard drive", "harddrive", "machine", "save", "storage" ]
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
            searchTerms: [ "audio", "listen", "music", "sound", "speaker" ]
        }, {
            title: "far fa-headphones",
            searchTerms: [ "audio", "listen", "music", "sound", "speaker" ]
        }, {
            title: "fal fa-headphones",
            searchTerms: [ "audio", "listen", "music", "sound", "speaker" ]
        }, {
            title: "fas fa-headphones-alt",
            searchTerms: [ "audio", "listen", "music", "sound", "speaker" ]
        }, {
            title: "far fa-headphones-alt",
            searchTerms: [ "audio", "listen", "music", "sound", "speaker" ]
        }, {
            title: "fal fa-headphones-alt",
            searchTerms: [ "audio", "listen", "music", "sound", "speaker" ]
        }, {
            title: "fas fa-headset",
            searchTerms: [ "audio", "gamer", "gaming", "listen", "live chat", "microphone", "shot caller", "sound", "support", "telemarketer" ]
        }, {
            title: "far fa-headset",
            searchTerms: [ "audio", "gamer", "gaming", "listen", "live chat", "microphone", "shot caller", "sound", "support", "telemarketer" ]
        }, {
            title: "fal fa-headset",
            searchTerms: [ "audio", "gamer", "gaming", "listen", "live chat", "microphone", "shot caller", "sound", "support", "telemarketer" ]
        }, {
            title: "fas fa-heart",
            searchTerms: [ "favorite", "like", "love" ]
        }, {
            title: "far fa-heart",
            searchTerms: [ "favorite", "like", "love" ]
        }, {
            title: "fal fa-heart",
            searchTerms: [ "favorite", "like", "love" ]
        }, {
            title: "fas fa-heart-circle",
            searchTerms: [ "favorite", "like", "love" ]
        }, {
            title: "far fa-heart-circle",
            searchTerms: [ "favorite", "like", "love" ]
        }, {
            title: "fal fa-heart-circle",
            searchTerms: [ "favorite", "like", "love" ]
        }, {
            title: "fas fa-heart-rate",
            searchTerms: []
        }, {
            title: "far fa-heart-rate",
            searchTerms: []
        }, {
            title: "fal fa-heart-rate",
            searchTerms: []
        }, {
            title: "fas fa-heart-square",
            searchTerms: [ "favorite", "like", "love" ]
        }, {
            title: "far fa-heart-square",
            searchTerms: [ "favorite", "like", "love" ]
        }, {
            title: "fal fa-heart-square",
            searchTerms: [ "favorite", "like", "love" ]
        }, {
            title: "fas fa-heartbeat",
            searchTerms: [ "ekg", "lifeline", "vital signs" ]
        }, {
            title: "far fa-heartbeat",
            searchTerms: [ "ekg", "lifeline", "vital signs" ]
        }, {
            title: "fal fa-heartbeat",
            searchTerms: [ "ekg", "lifeline", "vital signs" ]
        }, {
            title: "fas fa-helicopter",
            searchTerms: [ "airwolf", "apache", "chopper", "flight", "fly" ]
        }, {
            title: "far fa-helicopter",
            searchTerms: [ "airwolf", "apache", "chopper", "flight", "fly" ]
        }, {
            title: "fal fa-helicopter",
            searchTerms: [ "airwolf", "apache", "chopper", "flight", "fly" ]
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
            title: "fas fa-highlighter",
            searchTerms: [ "edit", "marker", "sharpie", "update", "write" ]
        }, {
            title: "far fa-highlighter",
            searchTerms: [ "edit", "marker", "sharpie", "update", "write" ]
        }, {
            title: "fal fa-highlighter",
            searchTerms: [ "edit", "marker", "sharpie", "update", "write" ]
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
            searchTerms: [ "house", "main" ]
        }, {
            title: "far fa-home",
            searchTerms: [ "house", "main" ]
        }, {
            title: "fal fa-home",
            searchTerms: [ "house", "main" ]
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
            title: "fab fa-hornbill",
            searchTerms: []
        }, {
            title: "fas fa-hospital",
            searchTerms: [ "building", "emergency room", "medical center" ]
        }, {
            title: "far fa-hospital",
            searchTerms: [ "building", "emergency room", "medical center" ]
        }, {
            title: "fal fa-hospital",
            searchTerms: [ "building", "emergency room", "medical center" ]
        }, {
            title: "fas fa-hospital-alt",
            searchTerms: [ "building", "emergency room", "medical center" ]
        }, {
            title: "far fa-hospital-alt",
            searchTerms: [ "building", "emergency room", "medical center" ]
        }, {
            title: "fal fa-hospital-alt",
            searchTerms: [ "building", "emergency room", "medical center" ]
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
            title: "fas fa-hot-tub",
            searchTerms: []
        }, {
            title: "far fa-hot-tub",
            searchTerms: []
        }, {
            title: "fal fa-hot-tub",
            searchTerms: []
        }, {
            title: "fas fa-hotel",
            searchTerms: [ "building", "lodging" ]
        }, {
            title: "far fa-hotel",
            searchTerms: [ "building", "lodging" ]
        }, {
            title: "fal fa-hotel",
            searchTerms: [ "building", "lodging" ]
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
            searchTerms: [ "document", "identification", "issued" ]
        }, {
            title: "far fa-id-card",
            searchTerms: [ "document", "identification", "issued" ]
        }, {
            title: "fal fa-id-card",
            searchTerms: [ "document", "identification", "issued" ]
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
            searchTerms: [ "album", "photo", "picture", "picture" ]
        }, {
            title: "far fa-image",
            searchTerms: [ "album", "photo", "picture", "picture" ]
        }, {
            title: "fal fa-image",
            searchTerms: [ "album", "photo", "picture", "picture" ]
        }, {
            title: "fas fa-images",
            searchTerms: [ "album", "photo", "picture" ]
        }, {
            title: "far fa-images",
            searchTerms: [ "album", "photo", "picture" ]
        }, {
            title: "fal fa-images",
            searchTerms: [ "album", "photo", "picture" ]
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
            title: "fas fa-infinity",
            searchTerms: []
        }, {
            title: "far fa-infinity",
            searchTerms: []
        }, {
            title: "fal fa-infinity",
            searchTerms: []
        }, {
            title: "fas fa-info",
            searchTerms: [ "details", "help", "information", "more" ]
        }, {
            title: "far fa-info",
            searchTerms: [ "details", "help", "information", "more" ]
        }, {
            title: "fal fa-info",
            searchTerms: [ "details", "help", "information", "more" ]
        }, {
            title: "fas fa-info-circle",
            searchTerms: [ "details", "help", "information", "more" ]
        }, {
            title: "far fa-info-circle",
            searchTerms: [ "details", "help", "information", "more" ]
        }, {
            title: "fal fa-info-circle",
            searchTerms: [ "details", "help", "information", "more" ]
        }, {
            title: "fas fa-info-square",
            searchTerms: [ "details", "help", "information", "more" ]
        }, {
            title: "far fa-info-square",
            searchTerms: [ "details", "help", "information", "more" ]
        }, {
            title: "fal fa-info-square",
            searchTerms: [ "details", "help", "information", "more" ]
        }, {
            title: "fas fa-inhaler",
            searchTerms: []
        }, {
            title: "far fa-inhaler",
            searchTerms: []
        }, {
            title: "fal fa-inhaler",
            searchTerms: []
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
            title: "fab fa-java",
            searchTerms: []
        }, {
            title: "fab fa-jedi-order",
            searchTerms: []
        }, {
            title: "fab fa-jenkins",
            searchTerms: []
        }, {
            title: "fab fa-joget",
            searchTerms: []
        }, {
            title: "fas fa-joint",
            searchTerms: [ "blunt", "cannabis", "doobie", "drugs", "marijuana", "roach", "smoke", "smoking", "spliff" ]
        }, {
            title: "far fa-joint",
            searchTerms: [ "blunt", "cannabis", "doobie", "drugs", "marijuana", "roach", "smoke", "smoking", "spliff" ]
        }, {
            title: "fal fa-joint",
            searchTerms: [ "blunt", "cannabis", "doobie", "drugs", "marijuana", "roach", "smoke", "smoking", "spliff" ]
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
            title: "fab fa-kaggle",
            searchTerms: []
        }, {
            title: "fas fa-key",
            searchTerms: [ "password", "unlock" ]
        }, {
            title: "far fa-key",
            searchTerms: [ "password", "unlock" ]
        }, {
            title: "fal fa-key",
            searchTerms: [ "password", "unlock" ]
        }, {
            title: "fab fa-keybase",
            searchTerms: []
        }, {
            title: "fas fa-keyboard",
            searchTerms: [ "input", "type" ]
        }, {
            title: "far fa-keyboard",
            searchTerms: [ "input", "type" ]
        }, {
            title: "fal fa-keyboard",
            searchTerms: [ "input", "type" ]
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
            title: "fas fa-kidneys",
            searchTerms: []
        }, {
            title: "far fa-kidneys",
            searchTerms: []
        }, {
            title: "fal fa-kidneys",
            searchTerms: []
        }, {
            title: "fas fa-kiss",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "far fa-kiss",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fal fa-kiss",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fas fa-kiss-beam",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "far fa-kiss-beam",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fal fa-kiss-beam",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fas fa-kiss-wink-heart",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "far fa-kiss-wink-heart",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fal fa-kiss-wink-heart",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fas fa-kiwi-bird",
            searchTerms: []
        }, {
            title: "far fa-kiwi-bird",
            searchTerms: []
        }, {
            title: "fal fa-kiwi-bird",
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
            searchTerms: [ "dialect", "idiom", "localize", "speech", "translate", "vernacular" ]
        }, {
            title: "far fa-language",
            searchTerms: [ "dialect", "idiom", "localize", "speech", "translate", "vernacular" ]
        }, {
            title: "fal fa-language",
            searchTerms: [ "dialect", "idiom", "localize", "speech", "translate", "vernacular" ]
        }, {
            title: "fas fa-laptop",
            searchTerms: [ "computer", "cpu", "dell", "demo", "device", "dude you're getting", "mac", "macbook", "machine", "pc", "pc" ]
        }, {
            title: "far fa-laptop",
            searchTerms: [ "computer", "cpu", "dell", "demo", "device", "dude you're getting", "mac", "macbook", "machine", "pc", "pc" ]
        }, {
            title: "fal fa-laptop",
            searchTerms: [ "computer", "cpu", "dell", "demo", "device", "dude you're getting", "mac", "macbook", "machine", "pc", "pc" ]
        }, {
            title: "fas fa-laptop-code",
            searchTerms: []
        }, {
            title: "far fa-laptop-code",
            searchTerms: []
        }, {
            title: "fal fa-laptop-code",
            searchTerms: []
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
            title: "fas fa-laugh",
            searchTerms: [ "LOL", "emoticon", "face", "laugh" ]
        }, {
            title: "far fa-laugh",
            searchTerms: [ "LOL", "emoticon", "face", "laugh" ]
        }, {
            title: "fal fa-laugh",
            searchTerms: [ "LOL", "emoticon", "face", "laugh" ]
        }, {
            title: "fas fa-laugh-beam",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "far fa-laugh-beam",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fal fa-laugh-beam",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fas fa-laugh-squint",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "far fa-laugh-squint",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fal fa-laugh-squint",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fas fa-laugh-wink",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "far fa-laugh-wink",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fal fa-laugh-wink",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fas fa-layer-group",
            searchTerms: [ "layers" ]
        }, {
            title: "far fa-layer-group",
            searchTerms: [ "layers" ]
        }, {
            title: "fal fa-layer-group",
            searchTerms: [ "layers" ]
        }, {
            title: "fas fa-layer-minus",
            searchTerms: []
        }, {
            title: "far fa-layer-minus",
            searchTerms: []
        }, {
            title: "fal fa-layer-minus",
            searchTerms: []
        }, {
            title: "fas fa-layer-plus",
            searchTerms: []
        }, {
            title: "far fa-layer-plus",
            searchTerms: []
        }, {
            title: "fal fa-layer-plus",
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
            title: "fas fa-less-than",
            searchTerms: []
        }, {
            title: "far fa-less-than",
            searchTerms: []
        }, {
            title: "fal fa-less-than",
            searchTerms: []
        }, {
            title: "fas fa-less-than-equal",
            searchTerms: []
        }, {
            title: "far fa-less-than-equal",
            searchTerms: []
        }, {
            title: "fal fa-less-than-equal",
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
            title: "fas fa-lips",
            searchTerms: []
        }, {
            title: "far fa-lips",
            searchTerms: []
        }, {
            title: "fal fa-lips",
            searchTerms: []
        }, {
            title: "fas fa-lira-sign",
            searchTerms: [ "try", "try", "turkish" ]
        }, {
            title: "far fa-lira-sign",
            searchTerms: [ "try", "try", "turkish" ]
        }, {
            title: "fal fa-lira-sign",
            searchTerms: [ "try", "try", "turkish" ]
        }, {
            title: "fas fa-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "far fa-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fal fa-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fas fa-list-alt",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "far fa-list-alt",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fal fa-list-alt",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fas fa-list-ol",
            searchTerms: [ "checklist", "list", "list", "numbers", "ol", "todo", "ul" ]
        }, {
            title: "far fa-list-ol",
            searchTerms: [ "checklist", "list", "list", "numbers", "ol", "todo", "ul" ]
        }, {
            title: "fal fa-list-ol",
            searchTerms: [ "checklist", "list", "list", "numbers", "ol", "todo", "ul" ]
        }, {
            title: "fas fa-list-ul",
            searchTerms: [ "checklist", "list", "ol", "todo", "ul" ]
        }, {
            title: "far fa-list-ul",
            searchTerms: [ "checklist", "list", "ol", "todo", "ul" ]
        }, {
            title: "fal fa-list-ul",
            searchTerms: [ "checklist", "list", "ol", "todo", "ul" ]
        }, {
            title: "fas fa-location",
            searchTerms: []
        }, {
            title: "far fa-location",
            searchTerms: []
        }, {
            title: "fal fa-location",
            searchTerms: []
        }, {
            title: "fas fa-location-arrow",
            searchTerms: [ "address", "coordinates", "gps", "location", "map", "place", "where" ]
        }, {
            title: "far fa-location-arrow",
            searchTerms: [ "address", "coordinates", "gps", "location", "map", "place", "where" ]
        }, {
            title: "fal fa-location-arrow",
            searchTerms: [ "address", "coordinates", "gps", "location", "map", "place", "where" ]
        }, {
            title: "fas fa-location-circle",
            searchTerms: []
        }, {
            title: "far fa-location-circle",
            searchTerms: []
        }, {
            title: "fal fa-location-circle",
            searchTerms: []
        }, {
            title: "fas fa-location-slash",
            searchTerms: []
        }, {
            title: "far fa-location-slash",
            searchTerms: []
        }, {
            title: "fal fa-location-slash",
            searchTerms: []
        }, {
            title: "fas fa-lock",
            searchTerms: [ "admin", "protect", "security" ]
        }, {
            title: "far fa-lock",
            searchTerms: [ "admin", "protect", "security" ]
        }, {
            title: "fal fa-lock",
            searchTerms: [ "admin", "protect", "security" ]
        }, {
            title: "fas fa-lock-alt",
            searchTerms: [ "admin", "protect", "security" ]
        }, {
            title: "far fa-lock-alt",
            searchTerms: [ "admin", "protect", "security" ]
        }, {
            title: "fal fa-lock-alt",
            searchTerms: [ "admin", "protect", "security" ]
        }, {
            title: "fas fa-lock-open",
            searchTerms: [ "admin", "lock", "open", "password", "protect" ]
        }, {
            title: "far fa-lock-open",
            searchTerms: [ "admin", "lock", "open", "password", "protect" ]
        }, {
            title: "fal fa-lock-open",
            searchTerms: [ "admin", "lock", "open", "password", "protect" ]
        }, {
            title: "fas fa-lock-open-alt",
            searchTerms: [ "admin", "lock", "password", "protect" ]
        }, {
            title: "far fa-lock-open-alt",
            searchTerms: [ "admin", "lock", "password", "protect" ]
        }, {
            title: "fal fa-lock-open-alt",
            searchTerms: [ "admin", "lock", "password", "protect" ]
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
            searchTerms: [ "back", "long-arrow-left", "previous" ]
        }, {
            title: "far fa-long-arrow-alt-left",
            searchTerms: [ "back", "long-arrow-left", "previous" ]
        }, {
            title: "fal fa-long-arrow-alt-left",
            searchTerms: [ "back", "long-arrow-left", "previous" ]
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
            searchTerms: [ "back", "previous" ]
        }, {
            title: "far fa-long-arrow-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-long-arrow-left",
            searchTerms: [ "back", "previous" ]
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
            title: "fas fa-luggage-cart",
            searchTerms: []
        }, {
            title: "far fa-luggage-cart",
            searchTerms: []
        }, {
            title: "fal fa-luggage-cart",
            searchTerms: []
        }, {
            title: "fas fa-lungs",
            searchTerms: []
        }, {
            title: "far fa-lungs",
            searchTerms: []
        }, {
            title: "fal fa-lungs",
            searchTerms: []
        }, {
            title: "fab fa-lyft",
            searchTerms: []
        }, {
            title: "fab fa-magento",
            searchTerms: []
        }, {
            title: "fas fa-magic",
            searchTerms: [ "autocomplete", "automatic", "wizard" ]
        }, {
            title: "far fa-magic",
            searchTerms: [ "autocomplete", "automatic", "wizard" ]
        }, {
            title: "fal fa-magic",
            searchTerms: [ "autocomplete", "automatic", "wizard" ]
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
            title: "fab fa-mailchimp",
            searchTerms: []
        }, {
            title: "fas fa-male",
            searchTerms: [ "human", "man", "person", "profile", "user" ]
        }, {
            title: "far fa-male",
            searchTerms: [ "human", "man", "person", "profile", "user" ]
        }, {
            title: "fal fa-male",
            searchTerms: [ "human", "man", "person", "profile", "user" ]
        }, {
            title: "fab fa-mandalorian",
            searchTerms: []
        }, {
            title: "fas fa-map",
            searchTerms: [ "coordinates", "location", "paper", "place", "travel" ]
        }, {
            title: "far fa-map",
            searchTerms: [ "coordinates", "location", "paper", "place", "travel" ]
        }, {
            title: "fal fa-map",
            searchTerms: [ "coordinates", "location", "paper", "place", "travel" ]
        }, {
            title: "fas fa-map-marked",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "paper", "pin", "place", "point of interest", "position", "route", "travel", "where" ]
        }, {
            title: "far fa-map-marked",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "paper", "pin", "place", "point of interest", "position", "route", "travel", "where" ]
        }, {
            title: "fal fa-map-marked",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "paper", "pin", "place", "point of interest", "position", "route", "travel", "where" ]
        }, {
            title: "fas fa-map-marked-alt",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "paper", "pin", "place", "point of interest", "position", "route", "travel", "where" ]
        }, {
            title: "far fa-map-marked-alt",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "paper", "pin", "place", "point of interest", "position", "route", "travel", "where" ]
        }, {
            title: "fal fa-map-marked-alt",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "paper", "pin", "place", "point of interest", "position", "route", "travel", "where" ]
        }, {
            title: "fas fa-map-marker",
            searchTerms: [ "address", "coordinates", "gps", "localize", "location", "map", "pin", "place", "position", "travel", "where" ]
        }, {
            title: "far fa-map-marker",
            searchTerms: [ "address", "coordinates", "gps", "localize", "location", "map", "pin", "place", "position", "travel", "where" ]
        }, {
            title: "fal fa-map-marker",
            searchTerms: [ "address", "coordinates", "gps", "localize", "location", "map", "pin", "place", "position", "travel", "where" ]
        }, {
            title: "fas fa-map-marker-alt",
            searchTerms: [ "address", "coordinates", "gps", "localize", "location", "map", "pin", "place", "position", "travel", "where" ]
        }, {
            title: "far fa-map-marker-alt",
            searchTerms: [ "address", "coordinates", "gps", "localize", "location", "map", "pin", "place", "position", "travel", "where" ]
        }, {
            title: "fal fa-map-marker-alt",
            searchTerms: [ "address", "coordinates", "gps", "localize", "location", "map", "pin", "place", "position", "travel", "where" ]
        }, {
            title: "fas fa-map-marker-alt-slash",
            searchTerms: []
        }, {
            title: "far fa-map-marker-alt-slash",
            searchTerms: []
        }, {
            title: "fal fa-map-marker-alt-slash",
            searchTerms: []
        }, {
            title: "fas fa-map-marker-check",
            searchTerms: []
        }, {
            title: "far fa-map-marker-check",
            searchTerms: []
        }, {
            title: "fal fa-map-marker-check",
            searchTerms: []
        }, {
            title: "fas fa-map-marker-edit",
            searchTerms: []
        }, {
            title: "far fa-map-marker-edit",
            searchTerms: []
        }, {
            title: "fal fa-map-marker-edit",
            searchTerms: []
        }, {
            title: "fas fa-map-marker-exclamation",
            searchTerms: []
        }, {
            title: "far fa-map-marker-exclamation",
            searchTerms: []
        }, {
            title: "fal fa-map-marker-exclamation",
            searchTerms: []
        }, {
            title: "fas fa-map-marker-minus",
            searchTerms: []
        }, {
            title: "far fa-map-marker-minus",
            searchTerms: []
        }, {
            title: "fal fa-map-marker-minus",
            searchTerms: []
        }, {
            title: "fas fa-map-marker-plus",
            searchTerms: []
        }, {
            title: "far fa-map-marker-plus",
            searchTerms: []
        }, {
            title: "fal fa-map-marker-plus",
            searchTerms: []
        }, {
            title: "fas fa-map-marker-question",
            searchTerms: []
        }, {
            title: "far fa-map-marker-question",
            searchTerms: []
        }, {
            title: "fal fa-map-marker-question",
            searchTerms: []
        }, {
            title: "fas fa-map-marker-slash",
            searchTerms: []
        }, {
            title: "far fa-map-marker-slash",
            searchTerms: []
        }, {
            title: "fal fa-map-marker-slash",
            searchTerms: []
        }, {
            title: "fas fa-map-marker-smile",
            searchTerms: []
        }, {
            title: "far fa-map-marker-smile",
            searchTerms: []
        }, {
            title: "fal fa-map-marker-smile",
            searchTerms: []
        }, {
            title: "fas fa-map-marker-times",
            searchTerms: []
        }, {
            title: "far fa-map-marker-times",
            searchTerms: []
        }, {
            title: "fal fa-map-marker-times",
            searchTerms: []
        }, {
            title: "fas fa-map-pin",
            searchTerms: [ "address", "coordinates", "gps", "localize", "location", "map", "marker", "place", "position", "travel", "where" ]
        }, {
            title: "far fa-map-pin",
            searchTerms: [ "address", "coordinates", "gps", "localize", "location", "map", "marker", "place", "position", "travel", "where" ]
        }, {
            title: "fal fa-map-pin",
            searchTerms: [ "address", "coordinates", "gps", "localize", "location", "map", "marker", "place", "position", "travel", "where" ]
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
            title: "fab fa-markdown",
            searchTerms: []
        }, {
            title: "fas fa-marker",
            searchTerms: [ "edit", "sharpie", "update", "write" ]
        }, {
            title: "far fa-marker",
            searchTerms: [ "edit", "sharpie", "update", "write" ]
        }, {
            title: "fal fa-marker",
            searchTerms: [ "edit", "sharpie", "update", "write" ]
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
            title: "fab fa-mastodon",
            searchTerms: []
        }, {
            title: "fab fa-maxcdn",
            searchTerms: []
        }, {
            title: "fas fa-medal",
            searchTerms: []
        }, {
            title: "far fa-medal",
            searchTerms: []
        }, {
            title: "fal fa-medal",
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
            searchTerms: [ "first aid", "firstaid", "health", "help", "support" ]
        }, {
            title: "far fa-medkit",
            searchTerms: [ "first aid", "firstaid", "health", "help", "support" ]
        }, {
            title: "fal fa-medkit",
            searchTerms: [ "first aid", "firstaid", "health", "help", "support" ]
        }, {
            title: "fab fa-medrt",
            searchTerms: []
        }, {
            title: "fab fa-meetup",
            searchTerms: []
        }, {
            title: "fab fa-megaport",
            searchTerms: []
        }, {
            title: "fas fa-meh",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "far fa-meh",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fal fa-meh",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fas fa-meh-blank",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "far fa-meh-blank",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fal fa-meh-blank",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fas fa-meh-rolling-eyes",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "far fa-meh-rolling-eyes",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fal fa-meh-rolling-eyes",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fas fa-memory",
            searchTerms: [ "DIMM", "RAM" ]
        }, {
            title: "far fa-memory",
            searchTerms: [ "DIMM", "RAM" ]
        }, {
            title: "fal fa-memory",
            searchTerms: [ "DIMM", "RAM" ]
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
            searchTerms: [ "cpu", "processor" ]
        }, {
            title: "far fa-microchip",
            searchTerms: [ "cpu", "processor" ]
        }, {
            title: "fal fa-microchip",
            searchTerms: [ "cpu", "processor" ]
        }, {
            title: "fas fa-microphone",
            searchTerms: [ "record", "sound", "voice" ]
        }, {
            title: "far fa-microphone",
            searchTerms: [ "record", "sound", "voice" ]
        }, {
            title: "fal fa-microphone",
            searchTerms: [ "record", "sound", "voice" ]
        }, {
            title: "fas fa-microphone-alt",
            searchTerms: [ "record", "sound", "voice" ]
        }, {
            title: "far fa-microphone-alt",
            searchTerms: [ "record", "sound", "voice" ]
        }, {
            title: "fal fa-microphone-alt",
            searchTerms: [ "record", "sound", "voice" ]
        }, {
            title: "fas fa-microphone-alt-slash",
            searchTerms: [ "disable", "mute", "record", "sound", "voice" ]
        }, {
            title: "far fa-microphone-alt-slash",
            searchTerms: [ "disable", "mute", "record", "sound", "voice" ]
        }, {
            title: "fal fa-microphone-alt-slash",
            searchTerms: [ "disable", "mute", "record", "sound", "voice" ]
        }, {
            title: "fas fa-microphone-slash",
            searchTerms: [ "disable", "mute", "record", "sound", "voice" ]
        }, {
            title: "far fa-microphone-slash",
            searchTerms: [ "disable", "mute", "record", "sound", "voice" ]
        }, {
            title: "fal fa-microphone-slash",
            searchTerms: [ "disable", "mute", "record", "sound", "voice" ]
        }, {
            title: "fas fa-microscope",
            searchTerms: []
        }, {
            title: "far fa-microscope",
            searchTerms: []
        }, {
            title: "fal fa-microscope",
            searchTerms: []
        }, {
            title: "fab fa-microsoft",
            searchTerms: []
        }, {
            title: "fas fa-minus",
            searchTerms: [ "collapse", "delete", "hide", "hide", "minify", "remove", "trash" ]
        }, {
            title: "far fa-minus",
            searchTerms: [ "collapse", "delete", "hide", "hide", "minify", "remove", "trash" ]
        }, {
            title: "fal fa-minus",
            searchTerms: [ "collapse", "delete", "hide", "hide", "minify", "remove", "trash" ]
        }, {
            title: "fas fa-minus-circle",
            searchTerms: [ "delete", "hide", "remove", "trash" ]
        }, {
            title: "far fa-minus-circle",
            searchTerms: [ "delete", "hide", "remove", "trash" ]
        }, {
            title: "fal fa-minus-circle",
            searchTerms: [ "delete", "hide", "remove", "trash" ]
        }, {
            title: "fas fa-minus-hexagon",
            searchTerms: [ "delete", "hide", "remove", "trash" ]
        }, {
            title: "far fa-minus-hexagon",
            searchTerms: [ "delete", "hide", "remove", "trash" ]
        }, {
            title: "fal fa-minus-hexagon",
            searchTerms: [ "delete", "hide", "remove", "trash" ]
        }, {
            title: "fas fa-minus-octagon",
            searchTerms: [ "delete", "hide", "remove", "trash" ]
        }, {
            title: "far fa-minus-octagon",
            searchTerms: [ "delete", "hide", "remove", "trash" ]
        }, {
            title: "fal fa-minus-octagon",
            searchTerms: [ "delete", "hide", "remove", "trash" ]
        }, {
            title: "fas fa-minus-square",
            searchTerms: [ "collapse", "delete", "hide", "hide", "minify", "remove", "trash" ]
        }, {
            title: "far fa-minus-square",
            searchTerms: [ "collapse", "delete", "hide", "hide", "minify", "remove", "trash" ]
        }, {
            title: "fal fa-minus-square",
            searchTerms: [ "collapse", "delete", "hide", "hide", "minify", "remove", "trash" ]
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
            searchTerms: [ "apple", "call", "cell phone", "cellphone", "device", "iphone", "number", "screen", "telephone", "text" ]
        }, {
            title: "far fa-mobile",
            searchTerms: [ "apple", "call", "cell phone", "cellphone", "device", "iphone", "number", "screen", "telephone", "text" ]
        }, {
            title: "fal fa-mobile",
            searchTerms: [ "apple", "call", "cell phone", "cellphone", "device", "iphone", "number", "screen", "telephone", "text" ]
        }, {
            title: "fas fa-mobile-alt",
            searchTerms: [ "apple", "call", "cell phone", "cellphone", "device", "iphone", "number", "screen", "telephone", "text" ]
        }, {
            title: "far fa-mobile-alt",
            searchTerms: [ "apple", "call", "cell phone", "cellphone", "device", "iphone", "number", "screen", "telephone", "text" ]
        }, {
            title: "fal fa-mobile-alt",
            searchTerms: [ "apple", "call", "cell phone", "cellphone", "device", "iphone", "number", "screen", "telephone", "text" ]
        }, {
            title: "fas fa-mobile-android",
            searchTerms: [ "android", "call", "cell phone", "cellphone", "device", "number", "screen", "telephone", "text" ]
        }, {
            title: "far fa-mobile-android",
            searchTerms: [ "android", "call", "cell phone", "cellphone", "device", "number", "screen", "telephone", "text" ]
        }, {
            title: "fal fa-mobile-android",
            searchTerms: [ "android", "call", "cell phone", "cellphone", "device", "number", "screen", "telephone", "text" ]
        }, {
            title: "fas fa-mobile-android-alt",
            searchTerms: [ "android", "call", "cell phone", "cellphone", "device", "number", "screen", "telephone", "text" ]
        }, {
            title: "far fa-mobile-android-alt",
            searchTerms: [ "android", "call", "cell phone", "cellphone", "device", "number", "screen", "telephone", "text" ]
        }, {
            title: "fal fa-mobile-android-alt",
            searchTerms: [ "android", "call", "cell phone", "cellphone", "device", "number", "screen", "telephone", "text" ]
        }, {
            title: "fab fa-modx",
            searchTerms: []
        }, {
            title: "fab fa-monero",
            searchTerms: []
        }, {
            title: "fas fa-money-bill",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "far fa-money-bill",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "fal fa-money-bill",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "fas fa-money-bill-alt",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "far fa-money-bill-alt",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "fal fa-money-bill-alt",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "fas fa-money-bill-wave",
            searchTerms: []
        }, {
            title: "far fa-money-bill-wave",
            searchTerms: []
        }, {
            title: "fal fa-money-bill-wave",
            searchTerms: []
        }, {
            title: "fas fa-money-bill-wave-alt",
            searchTerms: []
        }, {
            title: "far fa-money-bill-wave-alt",
            searchTerms: []
        }, {
            title: "fal fa-money-bill-wave-alt",
            searchTerms: []
        }, {
            title: "fas fa-money-check",
            searchTerms: [ "bank check", "cheque" ]
        }, {
            title: "far fa-money-check",
            searchTerms: [ "bank check", "cheque" ]
        }, {
            title: "fal fa-money-check",
            searchTerms: [ "bank check", "cheque" ]
        }, {
            title: "fas fa-money-check-alt",
            searchTerms: [ "bank check", "cheque" ]
        }, {
            title: "far fa-money-check-alt",
            searchTerms: [ "bank check", "cheque" ]
        }, {
            title: "fal fa-money-check-alt",
            searchTerms: [ "bank check", "cheque" ]
        }, {
            title: "fas fa-monitor-heart-rate",
            searchTerms: []
        }, {
            title: "far fa-monitor-heart-rate",
            searchTerms: []
        }, {
            title: "fal fa-monitor-heart-rate",
            searchTerms: []
        }, {
            title: "fas fa-monument",
            searchTerms: [ "building", "historic", "memoroable" ]
        }, {
            title: "far fa-monument",
            searchTerms: [ "building", "historic", "memoroable" ]
        }, {
            title: "fal fa-monument",
            searchTerms: [ "building", "historic", "memoroable" ]
        }, {
            title: "fas fa-moon",
            searchTerms: [ "contrast", "darker", "night" ]
        }, {
            title: "far fa-moon",
            searchTerms: [ "contrast", "darker", "night" ]
        }, {
            title: "fal fa-moon",
            searchTerms: [ "contrast", "darker", "night" ]
        }, {
            title: "fas fa-mortar-pestle",
            searchTerms: [ "crush", "culinary", "grind", "medical", "mix", "spices" ]
        }, {
            title: "far fa-mortar-pestle",
            searchTerms: [ "crush", "culinary", "grind", "medical", "mix", "spices" ]
        }, {
            title: "fal fa-mortar-pestle",
            searchTerms: [ "crush", "culinary", "grind", "medical", "mix", "spices" ]
        }, {
            title: "fas fa-motorcycle",
            searchTerms: [ "bike", "machine", "transportation", "vehicle" ]
        }, {
            title: "far fa-motorcycle",
            searchTerms: [ "bike", "machine", "transportation", "vehicle" ]
        }, {
            title: "fal fa-motorcycle",
            searchTerms: [ "bike", "machine", "transportation", "vehicle" ]
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
            title: "fab fa-neos",
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
            searchTerms: [ "article", "press" ]
        }, {
            title: "far fa-newspaper",
            searchTerms: [ "article", "press" ]
        }, {
            title: "fal fa-newspaper",
            searchTerms: [ "article", "press" ]
        }, {
            title: "fab fa-nimblr",
            searchTerms: []
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
            title: "fas fa-not-equal",
            searchTerms: []
        }, {
            title: "far fa-not-equal",
            searchTerms: []
        }, {
            title: "fal fa-not-equal",
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
            title: "fas fa-oil-can",
            searchTerms: []
        }, {
            title: "far fa-oil-can",
            searchTerms: []
        }, {
            title: "fal fa-oil-can",
            searchTerms: []
        }, {
            title: "fas fa-oil-temp",
            searchTerms: []
        }, {
            title: "far fa-oil-temp",
            searchTerms: []
        }, {
            title: "fal fa-oil-temp",
            searchTerms: []
        }, {
            title: "fab fa-old-republic",
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
            searchTerms: [ "eco", "leaf", "leaves", "nature", "plant", "tree" ]
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
            title: "fas fa-paint-brush-alt",
            searchTerms: []
        }, {
            title: "far fa-paint-brush-alt",
            searchTerms: []
        }, {
            title: "fal fa-paint-brush-alt",
            searchTerms: []
        }, {
            title: "fas fa-paint-roller",
            searchTerms: [ "brush", "painting", "tool" ]
        }, {
            title: "far fa-paint-roller",
            searchTerms: [ "brush", "painting", "tool" ]
        }, {
            title: "fal fa-paint-roller",
            searchTerms: [ "brush", "painting", "tool" ]
        }, {
            title: "fas fa-palette",
            searchTerms: [ "colors", "painting" ]
        }, {
            title: "far fa-palette",
            searchTerms: [ "colors", "painting" ]
        }, {
            title: "fal fa-palette",
            searchTerms: [ "colors", "painting" ]
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
            title: "fas fa-parking",
            searchTerms: []
        }, {
            title: "far fa-parking",
            searchTerms: []
        }, {
            title: "fal fa-parking",
            searchTerms: []
        }, {
            title: "fas fa-parking-circle",
            searchTerms: []
        }, {
            title: "far fa-parking-circle",
            searchTerms: []
        }, {
            title: "fal fa-parking-circle",
            searchTerms: []
        }, {
            title: "fas fa-parking-circle-slash",
            searchTerms: []
        }, {
            title: "far fa-parking-circle-slash",
            searchTerms: []
        }, {
            title: "fal fa-parking-circle-slash",
            searchTerms: []
        }, {
            title: "fas fa-parking-slash",
            searchTerms: []
        }, {
            title: "far fa-parking-slash",
            searchTerms: []
        }, {
            title: "fal fa-parking-slash",
            searchTerms: []
        }, {
            title: "fas fa-passport",
            searchTerms: [ "document", "identification", "issued" ]
        }, {
            title: "far fa-passport",
            searchTerms: [ "document", "identification", "issued" ]
        }, {
            title: "fal fa-passport",
            searchTerms: [ "document", "identification", "issued" ]
        }, {
            title: "fas fa-paste",
            searchTerms: [ "clipboard", "copy" ]
        }, {
            title: "far fa-paste",
            searchTerms: [ "clipboard", "copy" ]
        }, {
            title: "fal fa-paste",
            searchTerms: [ "clipboard", "copy" ]
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
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "far fa-pen",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "fal fa-pen",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "fas fa-pen-alt",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "far fa-pen-alt",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "fal fa-pen-alt",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "fas fa-pen-fancy",
            searchTerms: [ "design", "edit", "fountain pen", "update", "write" ]
        }, {
            title: "far fa-pen-fancy",
            searchTerms: [ "design", "edit", "fountain pen", "update", "write" ]
        }, {
            title: "fal fa-pen-fancy",
            searchTerms: [ "design", "edit", "fountain pen", "update", "write" ]
        }, {
            title: "fas fa-pen-nib",
            searchTerms: [ "design", "edit", "fountain pen", "update", "write" ]
        }, {
            title: "far fa-pen-nib",
            searchTerms: [ "design", "edit", "fountain pen", "update", "write" ]
        }, {
            title: "fal fa-pen-nib",
            searchTerms: [ "design", "edit", "fountain pen", "update", "write" ]
        }, {
            title: "fas fa-pen-square",
            searchTerms: [ "edit", "pencil-square", "update", "write" ]
        }, {
            title: "far fa-pen-square",
            searchTerms: [ "edit", "pencil-square", "update", "write" ]
        }, {
            title: "fal fa-pen-square",
            searchTerms: [ "edit", "pencil-square", "update", "write" ]
        }, {
            title: "fas fa-pencil",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "far fa-pencil",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "fal fa-pencil",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "fas fa-pencil-alt",
            searchTerms: [ "design", "edit", "pencil", "update", "write" ]
        }, {
            title: "far fa-pencil-alt",
            searchTerms: [ "design", "edit", "pencil", "update", "write" ]
        }, {
            title: "fal fa-pencil-alt",
            searchTerms: [ "design", "edit", "pencil", "update", "write" ]
        }, {
            title: "fas fa-pencil-paintbrush",
            searchTerms: []
        }, {
            title: "far fa-pencil-paintbrush",
            searchTerms: []
        }, {
            title: "fal fa-pencil-paintbrush",
            searchTerms: []
        }, {
            title: "fas fa-pencil-ruler",
            searchTerms: []
        }, {
            title: "far fa-pencil-ruler",
            searchTerms: []
        }, {
            title: "fal fa-pencil-ruler",
            searchTerms: []
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
            title: "fas fa-percentage",
            searchTerms: []
        }, {
            title: "far fa-percentage",
            searchTerms: []
        }, {
            title: "fal fa-percentage",
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
            title: "fab fa-phoenix-squadron",
            searchTerms: []
        }, {
            title: "fas fa-phone",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "far fa-phone",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "fal fa-phone",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
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
            searchTerms: [ "call", "number", "support", "telephone", "voice" ]
        }, {
            title: "far fa-phone-square",
            searchTerms: [ "call", "number", "support", "telephone", "voice" ]
        }, {
            title: "fal fa-phone-square",
            searchTerms: [ "call", "number", "support", "telephone", "voice" ]
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
            title: "fab fa-pied-piper-hat",
            searchTerms: [ "clothing" ]
        }, {
            title: "fab fa-pied-piper-pp",
            searchTerms: []
        }, {
            title: "fas fa-piggy-bank",
            searchTerms: [ "save", "savings" ]
        }, {
            title: "far fa-piggy-bank",
            searchTerms: [ "save", "savings" ]
        }, {
            title: "fal fa-piggy-bank",
            searchTerms: [ "save", "savings" ]
        }, {
            title: "fas fa-pills",
            searchTerms: [ "drugs", "medicine" ]
        }, {
            title: "far fa-pills",
            searchTerms: [ "drugs", "medicine" ]
        }, {
            title: "fal fa-pills",
            searchTerms: [ "drugs", "medicine" ]
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
            searchTerms: [ "airplane", "destination", "fly", "location", "mode", "travel", "trip" ]
        }, {
            title: "far fa-plane",
            searchTerms: [ "airplane", "destination", "fly", "location", "mode", "travel", "trip" ]
        }, {
            title: "fal fa-plane",
            searchTerms: [ "airplane", "destination", "fly", "location", "mode", "travel", "trip" ]
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
            title: "fas fa-plane-arrival",
            searchTerms: [ "airplane", "arriving", "destination", "fly", "land", "landing", "location", "mode", "travel", "trip" ]
        }, {
            title: "far fa-plane-arrival",
            searchTerms: [ "airplane", "arriving", "destination", "fly", "land", "landing", "location", "mode", "travel", "trip" ]
        }, {
            title: "fal fa-plane-arrival",
            searchTerms: [ "airplane", "arriving", "destination", "fly", "land", "landing", "location", "mode", "travel", "trip" ]
        }, {
            title: "fas fa-plane-departure",
            searchTerms: [ "airplane", "departing", "destination", "fly", "location", "mode", "take off", "taking off", "travel", "trip" ]
        }, {
            title: "far fa-plane-departure",
            searchTerms: [ "airplane", "departing", "destination", "fly", "location", "mode", "take off", "taking off", "travel", "trip" ]
        }, {
            title: "fal fa-plane-departure",
            searchTerms: [ "airplane", "departing", "destination", "fly", "location", "mode", "take off", "taking off", "travel", "trip" ]
        }, {
            title: "fas fa-play",
            searchTerms: [ "music", "playing", "sound", "start" ]
        }, {
            title: "far fa-play",
            searchTerms: [ "music", "playing", "sound", "start" ]
        }, {
            title: "fal fa-play",
            searchTerms: [ "music", "playing", "sound", "start" ]
        }, {
            title: "fas fa-play-circle",
            searchTerms: [ "playing", "start" ]
        }, {
            title: "far fa-play-circle",
            searchTerms: [ "playing", "start" ]
        }, {
            title: "fal fa-play-circle",
            searchTerms: [ "playing", "start" ]
        }, {
            title: "fab fa-playstation",
            searchTerms: []
        }, {
            title: "fas fa-plug",
            searchTerms: [ "connect", "online", "power" ]
        }, {
            title: "far fa-plug",
            searchTerms: [ "connect", "online", "power" ]
        }, {
            title: "fal fa-plug",
            searchTerms: [ "connect", "online", "power" ]
        }, {
            title: "fas fa-plus",
            searchTerms: [ "add", "create", "expand", "new" ]
        }, {
            title: "far fa-plus",
            searchTerms: [ "add", "create", "expand", "new" ]
        }, {
            title: "fal fa-plus",
            searchTerms: [ "add", "create", "expand", "new" ]
        }, {
            title: "fas fa-plus-circle",
            searchTerms: [ "add", "create", "expand", "new" ]
        }, {
            title: "far fa-plus-circle",
            searchTerms: [ "add", "create", "expand", "new" ]
        }, {
            title: "fal fa-plus-circle",
            searchTerms: [ "add", "create", "expand", "new" ]
        }, {
            title: "fas fa-plus-hexagon",
            searchTerms: [ "add", "create", "expand", "new" ]
        }, {
            title: "far fa-plus-hexagon",
            searchTerms: [ "add", "create", "expand", "new" ]
        }, {
            title: "fal fa-plus-hexagon",
            searchTerms: [ "add", "create", "expand", "new" ]
        }, {
            title: "fas fa-plus-octagon",
            searchTerms: [ "add", "create", "expand", "new" ]
        }, {
            title: "far fa-plus-octagon",
            searchTerms: [ "add", "create", "expand", "new" ]
        }, {
            title: "fal fa-plus-octagon",
            searchTerms: [ "add", "create", "expand", "new" ]
        }, {
            title: "fas fa-plus-square",
            searchTerms: [ "add", "create", "expand", "new" ]
        }, {
            title: "far fa-plus-square",
            searchTerms: [ "add", "create", "expand", "new" ]
        }, {
            title: "fal fa-plus-square",
            searchTerms: [ "add", "create", "expand", "new" ]
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
            title: "fas fa-poop",
            searchTerms: []
        }, {
            title: "far fa-poop",
            searchTerms: []
        }, {
            title: "fal fa-poop",
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
            searchTerms: [ "on", "reboot", "restart" ]
        }, {
            title: "far fa-power-off",
            searchTerms: [ "on", "reboot", "restart" ]
        }, {
            title: "fal fa-power-off",
            searchTerms: [ "on", "reboot", "restart" ]
        }, {
            title: "fas fa-prescription",
            searchTerms: [ "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "far fa-prescription",
            searchTerms: [ "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "fal fa-prescription",
            searchTerms: [ "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "fas fa-prescription-bottle",
            searchTerms: [ "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "far fa-prescription-bottle",
            searchTerms: [ "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "fal fa-prescription-bottle",
            searchTerms: [ "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "fas fa-prescription-bottle-alt",
            searchTerms: [ "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "far fa-prescription-bottle-alt",
            searchTerms: [ "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "fal fa-prescription-bottle-alt",
            searchTerms: [ "drugs", "medical", "medicine", "rx" ]
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
            title: "fas fa-project-diagram",
            searchTerms: []
        }, {
            title: "far fa-project-diagram",
            searchTerms: []
        }, {
            title: "fal fa-project-diagram",
            searchTerms: []
        }, {
            title: "fab fa-pushed",
            searchTerms: []
        }, {
            title: "fas fa-puzzle-piece",
            searchTerms: [ "add-on", "addon", "section" ]
        }, {
            title: "far fa-puzzle-piece",
            searchTerms: [ "add-on", "addon", "section" ]
        }, {
            title: "fal fa-puzzle-piece",
            searchTerms: [ "add-on", "addon", "section" ]
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
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "far fa-question",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "fal fa-question",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "fas fa-question-circle",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "far fa-question-circle",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "fal fa-question-circle",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "fas fa-question-square",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "far fa-question-square",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "fal fa-question-square",
            searchTerms: [ "help", "information", "support", "unknown" ]
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
            title: "fab fa-r-project",
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
            searchTerms: [ "shuffle", "sort" ]
        }, {
            title: "far fa-random",
            searchTerms: [ "shuffle", "sort" ]
        }, {
            title: "fal fa-random",
            searchTerms: [ "shuffle", "sort" ]
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
            title: "fas fa-receipt",
            searchTerms: [ "check", "invoice", "table" ]
        }, {
            title: "far fa-receipt",
            searchTerms: [ "check", "invoice", "table" ]
        }, {
            title: "fal fa-receipt",
            searchTerms: [ "check", "invoice", "table" ]
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
            title: "fab fa-researchgate",
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
            title: "fab fa-rev",
            searchTerms: []
        }, {
            title: "fas fa-ribbon",
            searchTerms: [ "badge", "cause", "lapel", "pin" ]
        }, {
            title: "far fa-ribbon",
            searchTerms: [ "badge", "cause", "lapel", "pin" ]
        }, {
            title: "fal fa-ribbon",
            searchTerms: [ "badge", "cause", "lapel", "pin" ]
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
            title: "fas fa-robot",
            searchTerms: []
        }, {
            title: "far fa-robot",
            searchTerms: []
        }, {
            title: "fal fa-robot",
            searchTerms: []
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
            title: "fas fa-route-highway",
            searchTerms: []
        }, {
            title: "far fa-route-highway",
            searchTerms: []
        }, {
            title: "fal fa-route-highway",
            searchTerms: []
        }, {
            title: "fas fa-route-interstate",
            searchTerms: []
        }, {
            title: "far fa-route-interstate",
            searchTerms: []
        }, {
            title: "fal fa-route-interstate",
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
            searchTerms: [ "blog", "feed" ]
        }, {
            title: "far fa-rss-square",
            searchTerms: [ "blog", "feed" ]
        }, {
            title: "fal fa-rss-square",
            searchTerms: [ "blog", "feed" ]
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
            title: "fas fa-ruler",
            searchTerms: []
        }, {
            title: "far fa-ruler",
            searchTerms: []
        }, {
            title: "fal fa-ruler",
            searchTerms: []
        }, {
            title: "fas fa-ruler-combined",
            searchTerms: []
        }, {
            title: "far fa-ruler-combined",
            searchTerms: []
        }, {
            title: "fal fa-ruler-combined",
            searchTerms: []
        }, {
            title: "fas fa-ruler-horizontal",
            searchTerms: []
        }, {
            title: "far fa-ruler-horizontal",
            searchTerms: []
        }, {
            title: "fal fa-ruler-horizontal",
            searchTerms: []
        }, {
            title: "fas fa-ruler-triangle",
            searchTerms: []
        }, {
            title: "far fa-ruler-triangle",
            searchTerms: []
        }, {
            title: "fal fa-ruler-triangle",
            searchTerms: []
        }, {
            title: "fas fa-ruler-vertical",
            searchTerms: []
        }, {
            title: "far fa-ruler-vertical",
            searchTerms: []
        }, {
            title: "fal fa-ruler-vertical",
            searchTerms: []
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
            title: "fas fa-sad-cry",
            searchTerms: [ "emoticon", "face", "tear", "tears" ]
        }, {
            title: "far fa-sad-cry",
            searchTerms: [ "emoticon", "face", "tear", "tears" ]
        }, {
            title: "fal fa-sad-cry",
            searchTerms: [ "emoticon", "face", "tear", "tears" ]
        }, {
            title: "fas fa-sad-tear",
            searchTerms: [ "emoticon", "face", "tear", "tears" ]
        }, {
            title: "far fa-sad-tear",
            searchTerms: [ "emoticon", "face", "tear", "tears" ]
        }, {
            title: "fal fa-sad-tear",
            searchTerms: [ "emoticon", "face", "tear", "tears" ]
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
            title: "fas fa-scalpel",
            searchTerms: []
        }, {
            title: "far fa-scalpel",
            searchTerms: []
        }, {
            title: "fal fa-scalpel",
            searchTerms: []
        }, {
            title: "fas fa-scalpel-path",
            searchTerms: []
        }, {
            title: "far fa-scalpel-path",
            searchTerms: []
        }, {
            title: "fal fa-scalpel-path",
            searchTerms: []
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
            title: "fas fa-school",
            searchTerms: []
        }, {
            title: "far fa-school",
            searchTerms: []
        }, {
            title: "fal fa-school",
            searchTerms: []
        }, {
            title: "fas fa-screwdriver",
            searchTerms: [ "admin", "container", "fix", "repair", "settings", "tool" ]
        }, {
            title: "far fa-screwdriver",
            searchTerms: [ "admin", "container", "fix", "repair", "settings", "tool" ]
        }, {
            title: "fal fa-screwdriver",
            searchTerms: [ "admin", "container", "fix", "repair", "settings", "tool" ]
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
            searchTerms: [ "bigger", "enlarge", "magnify", "preview", "zoom" ]
        }, {
            title: "far fa-search",
            searchTerms: [ "bigger", "enlarge", "magnify", "preview", "zoom" ]
        }, {
            title: "fal fa-search",
            searchTerms: [ "bigger", "enlarge", "magnify", "preview", "zoom" ]
        }, {
            title: "fas fa-search-minus",
            searchTerms: [ "magnify", "minify", "smaller", "zoom", "zoom out" ]
        }, {
            title: "far fa-search-minus",
            searchTerms: [ "magnify", "minify", "smaller", "zoom", "zoom out" ]
        }, {
            title: "fal fa-search-minus",
            searchTerms: [ "magnify", "minify", "smaller", "zoom", "zoom out" ]
        }, {
            title: "fas fa-search-plus",
            searchTerms: [ "bigger", "enlarge", "magnify", "zoom", "zoom in" ]
        }, {
            title: "far fa-search-plus",
            searchTerms: [ "bigger", "enlarge", "magnify", "zoom", "zoom in" ]
        }, {
            title: "fal fa-search-plus",
            searchTerms: [ "bigger", "enlarge", "magnify", "zoom", "zoom in" ]
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
            searchTerms: [ "cpu" ]
        }, {
            title: "far fa-server",
            searchTerms: [ "cpu" ]
        }, {
            title: "fal fa-server",
            searchTerms: [ "cpu" ]
        }, {
            title: "fab fa-servicestack",
            searchTerms: []
        }, {
            title: "fas fa-shapes",
            searchTerms: [ "circle", "square", "triangle" ]
        }, {
            title: "far fa-shapes",
            searchTerms: [ "circle", "square", "triangle" ]
        }, {
            title: "fal fa-shapes",
            searchTerms: [ "circle", "square", "triangle" ]
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
            searchTerms: [ "send", "social" ]
        }, {
            title: "far fa-share-square",
            searchTerms: [ "send", "social" ]
        }, {
            title: "fal fa-share-square",
            searchTerms: [ "send", "social" ]
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
            searchTerms: [ "achievement", "award", "security", "winner" ]
        }, {
            title: "far fa-shield",
            searchTerms: [ "achievement", "award", "security", "winner" ]
        }, {
            title: "fal fa-shield",
            searchTerms: [ "achievement", "award", "security", "winner" ]
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
            searchTerms: [ "achievement", "award", "security", "success", "winner" ]
        }, {
            title: "far fa-shield-check",
            searchTerms: [ "achievement", "award", "security", "success", "winner" ]
        }, {
            title: "fal fa-shield-check",
            searchTerms: [ "achievement", "award", "security", "success", "winner" ]
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
            title: "fas fa-shoe-prints",
            searchTerms: [ "feet", "footprints", "steps" ]
        }, {
            title: "far fa-shoe-prints",
            searchTerms: [ "feet", "footprints", "steps" ]
        }, {
            title: "fal fa-shoe-prints",
            searchTerms: [ "feet", "footprints", "steps" ]
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
            searchTerms: [ "buy", "checkout", "payment", "purchase" ]
        }, {
            title: "far fa-shopping-cart",
            searchTerms: [ "buy", "checkout", "payment", "purchase" ]
        }, {
            title: "fal fa-shopping-cart",
            searchTerms: [ "buy", "checkout", "payment", "purchase" ]
        }, {
            title: "fab fa-shopware",
            searchTerms: []
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
            title: "fas fa-shuttle-van",
            searchTerms: [ "machine", "public-transportation", "transportation", "vehicle" ]
        }, {
            title: "far fa-shuttle-van",
            searchTerms: [ "machine", "public-transportation", "transportation", "vehicle" ]
        }, {
            title: "fal fa-shuttle-van",
            searchTerms: [ "machine", "public-transportation", "transportation", "vehicle" ]
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
            searchTerms: [ "arrow", "enter", "join", "log in", "login", "sign in", "sign up", "signin", "signup" ]
        }, {
            title: "far fa-sign-in",
            searchTerms: [ "arrow", "enter", "join", "log in", "login", "sign in", "sign up", "signin", "signup" ]
        }, {
            title: "fal fa-sign-in",
            searchTerms: [ "arrow", "enter", "join", "log in", "login", "sign in", "sign up", "signin", "signup" ]
        }, {
            title: "fas fa-sign-in-alt",
            searchTerms: [ "arrow", "enter", "join", "log in", "login", "sign in", "sign up", "sign-in", "signin", "signup" ]
        }, {
            title: "far fa-sign-in-alt",
            searchTerms: [ "arrow", "enter", "join", "log in", "login", "sign in", "sign up", "sign-in", "signin", "signup" ]
        }, {
            title: "fal fa-sign-in-alt",
            searchTerms: [ "arrow", "enter", "join", "log in", "login", "sign in", "sign up", "sign-in", "signin", "signup" ]
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
            searchTerms: [ "arrow", "exit", "leave", "log out", "logout" ]
        }, {
            title: "far fa-sign-out",
            searchTerms: [ "arrow", "exit", "leave", "log out", "logout" ]
        }, {
            title: "fal fa-sign-out",
            searchTerms: [ "arrow", "exit", "leave", "log out", "logout" ]
        }, {
            title: "fas fa-sign-out-alt",
            searchTerms: [ "arrow", "exit", "leave", "log out", "logout", "sign-out" ]
        }, {
            title: "far fa-sign-out-alt",
            searchTerms: [ "arrow", "exit", "leave", "log out", "logout", "sign-out" ]
        }, {
            title: "fal fa-sign-out-alt",
            searchTerms: [ "arrow", "exit", "leave", "log out", "logout", "sign-out" ]
        }, {
            title: "fas fa-signal",
            searchTerms: [ "bars", "graph", "online", "status" ]
        }, {
            title: "far fa-signal",
            searchTerms: [ "bars", "graph", "online", "status" ]
        }, {
            title: "fal fa-signal",
            searchTerms: [ "bars", "graph", "online", "status" ]
        }, {
            title: "fas fa-signature",
            searchTerms: [ "John Hancock", "cursive", "name", "writing" ]
        }, {
            title: "far fa-signature",
            searchTerms: [ "John Hancock", "cursive", "name", "writing" ]
        }, {
            title: "fal fa-signature",
            searchTerms: [ "John Hancock", "cursive", "name", "writing" ]
        }, {
            title: "fab fa-simplybuilt",
            searchTerms: []
        }, {
            title: "fab fa-sistrix",
            searchTerms: []
        }, {
            title: "fas fa-sitemap",
            searchTerms: [ "directory", "hierarchy", "ia", "information architecture", "organization" ]
        }, {
            title: "far fa-sitemap",
            searchTerms: [ "directory", "hierarchy", "ia", "information architecture", "organization" ]
        }, {
            title: "fal fa-sitemap",
            searchTerms: [ "directory", "hierarchy", "ia", "information architecture", "organization" ]
        }, {
            title: "fab fa-sith",
            searchTerms: []
        }, {
            title: "fas fa-skeleton",
            searchTerms: []
        }, {
            title: "far fa-skeleton",
            searchTerms: []
        }, {
            title: "fal fa-skeleton",
            searchTerms: []
        }, {
            title: "fas fa-skull",
            searchTerms: [ "bones", "skeleton", "yorick" ]
        }, {
            title: "far fa-skull",
            searchTerms: [ "bones", "skeleton", "yorick" ]
        }, {
            title: "fal fa-skull",
            searchTerms: [ "bones", "skeleton", "yorick" ]
        }, {
            title: "fab fa-skyatlas",
            searchTerms: []
        }, {
            title: "fab fa-skype",
            searchTerms: []
        }, {
            title: "fab fa-slack",
            searchTerms: [ "anchor", "hash", "hashtag" ]
        }, {
            title: "fab fa-slack-hash",
            searchTerms: [ "anchor", "hash", "hashtag" ]
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
            searchTerms: [ "approve", "emoticon", "face", "happy", "rating", "satisfied" ]
        }, {
            title: "far fa-smile",
            searchTerms: [ "approve", "emoticon", "face", "happy", "rating", "satisfied" ]
        }, {
            title: "fal fa-smile",
            searchTerms: [ "approve", "emoticon", "face", "happy", "rating", "satisfied" ]
        }, {
            title: "fas fa-smile-beam",
            searchTerms: [ "emoticon", "face", "happy" ]
        }, {
            title: "far fa-smile-beam",
            searchTerms: [ "emoticon", "face", "happy" ]
        }, {
            title: "fal fa-smile-beam",
            searchTerms: [ "emoticon", "face", "happy" ]
        }, {
            title: "fas fa-smile-plus",
            searchTerms: [ "emoticon", "face", "happy" ]
        }, {
            title: "far fa-smile-plus",
            searchTerms: [ "emoticon", "face", "happy" ]
        }, {
            title: "fal fa-smile-plus",
            searchTerms: [ "emoticon", "face", "happy" ]
        }, {
            title: "fas fa-smile-wink",
            searchTerms: [ "emoticon", "face", "happy" ]
        }, {
            title: "far fa-smile-wink",
            searchTerms: [ "emoticon", "face", "happy" ]
        }, {
            title: "fal fa-smile-wink",
            searchTerms: [ "emoticon", "face", "happy" ]
        }, {
            title: "fas fa-smoking",
            searchTerms: [ "cigarette", "nicotine", "smoking status" ]
        }, {
            title: "far fa-smoking",
            searchTerms: [ "cigarette", "nicotine", "smoking status" ]
        }, {
            title: "fal fa-smoking",
            searchTerms: [ "cigarette", "nicotine", "smoking status" ]
        }, {
            title: "fas fa-smoking-ban",
            searchTerms: [ "no smoking", "non-smoking" ]
        }, {
            title: "far fa-smoking-ban",
            searchTerms: [ "no smoking", "non-smoking" ]
        }, {
            title: "fal fa-smoking-ban",
            searchTerms: [ "no smoking", "non-smoking" ]
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
            title: "fas fa-solar-panel",
            searchTerms: [ "clean", "eco-friendly", "energy", "green", "sun" ]
        }, {
            title: "far fa-solar-panel",
            searchTerms: [ "clean", "eco-friendly", "energy", "green", "sun" ]
        }, {
            title: "fal fa-solar-panel",
            searchTerms: [ "clean", "eco-friendly", "energy", "green", "sun" ]
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
            title: "fas fa-spa",
            searchTerms: [ "mindfullness", "plant", "wellness" ]
        }, {
            title: "far fa-spa",
            searchTerms: [ "mindfullness", "plant", "wellness" ]
        }, {
            title: "fal fa-spa",
            searchTerms: [ "mindfullness", "plant", "wellness" ]
        }, {
            title: "fas fa-space-shuttle",
            searchTerms: [ "astronaut", "machine", "nasa", "rocket", "transportation" ]
        }, {
            title: "far fa-space-shuttle",
            searchTerms: [ "astronaut", "machine", "nasa", "rocket", "transportation" ]
        }, {
            title: "fal fa-space-shuttle",
            searchTerms: [ "astronaut", "machine", "nasa", "rocket", "transportation" ]
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
            title: "fas fa-splotch",
            searchTerms: []
        }, {
            title: "far fa-splotch",
            searchTerms: []
        }, {
            title: "fal fa-splotch",
            searchTerms: []
        }, {
            title: "fab fa-spotify",
            searchTerms: []
        }, {
            title: "fas fa-spray-can",
            searchTerms: []
        }, {
            title: "far fa-spray-can",
            searchTerms: []
        }, {
            title: "fal fa-spray-can",
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
            title: "fab fa-squarespace",
            searchTerms: []
        }, {
            title: "fab fa-stack-exchange",
            searchTerms: []
        }, {
            title: "fab fa-stack-overflow",
            searchTerms: []
        }, {
            title: "fas fa-stamp",
            searchTerms: []
        }, {
            title: "far fa-stamp",
            searchTerms: []
        }, {
            title: "fal fa-stamp",
            searchTerms: []
        }, {
            title: "fas fa-star",
            searchTerms: [ "achievement", "award", "favorite", "important", "night", "rating", "score" ]
        }, {
            title: "far fa-star",
            searchTerms: [ "achievement", "award", "favorite", "important", "night", "rating", "score" ]
        }, {
            title: "fal fa-star",
            searchTerms: [ "achievement", "award", "favorite", "important", "night", "rating", "score" ]
        }, {
            title: "fas fa-star-exclamation",
            searchTerms: [ "achievement", "award", "favorite", "night", "rating", "score" ]
        }, {
            title: "far fa-star-exclamation",
            searchTerms: [ "achievement", "award", "favorite", "night", "rating", "score" ]
        }, {
            title: "fal fa-star-exclamation",
            searchTerms: [ "achievement", "award", "favorite", "night", "rating", "score" ]
        }, {
            title: "fas fa-star-half",
            searchTerms: [ "achievement", "award", "rating", "score", "star-half-empty", "star-half-full" ]
        }, {
            title: "far fa-star-half",
            searchTerms: [ "achievement", "award", "rating", "score", "star-half-empty", "star-half-full" ]
        }, {
            title: "fal fa-star-half",
            searchTerms: [ "achievement", "award", "rating", "score", "star-half-empty", "star-half-full" ]
        }, {
            title: "fas fa-star-half-alt",
            searchTerms: [ "achievement", "award", "rating", "score", "star-half-empty", "star-half-full" ]
        }, {
            title: "far fa-star-half-alt",
            searchTerms: [ "achievement", "award", "rating", "score", "star-half-empty", "star-half-full" ]
        }, {
            title: "fal fa-star-half-alt",
            searchTerms: [ "achievement", "award", "rating", "score", "star-half-empty", "star-half-full" ]
        }, {
            title: "fas fa-star-of-life",
            searchTerms: []
        }, {
            title: "far fa-star-of-life",
            searchTerms: []
        }, {
            title: "fal fa-star-of-life",
            searchTerms: []
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
            title: "fas fa-steering-wheel",
            searchTerms: []
        }, {
            title: "far fa-steering-wheel",
            searchTerms: []
        }, {
            title: "fal fa-steering-wheel",
            searchTerms: []
        }, {
            title: "fas fa-step-backward",
            searchTerms: [ "beginning", "first", "previous", "rewind", "start" ]
        }, {
            title: "far fa-step-backward",
            searchTerms: [ "beginning", "first", "previous", "rewind", "start" ]
        }, {
            title: "fal fa-step-backward",
            searchTerms: [ "beginning", "first", "previous", "rewind", "start" ]
        }, {
            title: "fas fa-step-forward",
            searchTerms: [ "end", "last", "next" ]
        }, {
            title: "far fa-step-forward",
            searchTerms: [ "end", "last", "next" ]
        }, {
            title: "fal fa-step-forward",
            searchTerms: [ "end", "last", "next" ]
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
            title: "fas fa-stomach",
            searchTerms: []
        }, {
            title: "far fa-stomach",
            searchTerms: []
        }, {
            title: "fal fa-stomach",
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
            title: "fas fa-store",
            searchTerms: []
        }, {
            title: "far fa-store",
            searchTerms: []
        }, {
            title: "fal fa-store",
            searchTerms: []
        }, {
            title: "fas fa-store-alt",
            searchTerms: []
        }, {
            title: "far fa-store-alt",
            searchTerms: []
        }, {
            title: "fal fa-store-alt",
            searchTerms: []
        }, {
            title: "fab fa-strava",
            searchTerms: []
        }, {
            title: "fas fa-stream",
            searchTerms: []
        }, {
            title: "far fa-stream",
            searchTerms: []
        }, {
            title: "fal fa-stream",
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
            title: "fas fa-stroopwafel",
            searchTerms: [ "dessert", "food", "sweets", "waffle" ]
        }, {
            title: "far fa-stroopwafel",
            searchTerms: [ "dessert", "food", "sweets", "waffle" ]
        }, {
            title: "fal fa-stroopwafel",
            searchTerms: [ "dessert", "food", "sweets", "waffle" ]
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
            searchTerms: [ "machine", "railway", "train", "transportation", "vehicle" ]
        }, {
            title: "far fa-subway",
            searchTerms: [ "machine", "railway", "train", "transportation", "vehicle" ]
        }, {
            title: "fal fa-subway",
            searchTerms: [ "machine", "railway", "train", "transportation", "vehicle" ]
        }, {
            title: "fas fa-suitcase",
            searchTerms: [ "baggage", "luggage", "move", "suitcase", "travel", "trip" ]
        }, {
            title: "far fa-suitcase",
            searchTerms: [ "baggage", "luggage", "move", "suitcase", "travel", "trip" ]
        }, {
            title: "fal fa-suitcase",
            searchTerms: [ "baggage", "luggage", "move", "suitcase", "travel", "trip" ]
        }, {
            title: "fas fa-suitcase-rolling",
            searchTerms: []
        }, {
            title: "far fa-suitcase-rolling",
            searchTerms: []
        }, {
            title: "fal fa-suitcase-rolling",
            searchTerms: []
        }, {
            title: "fas fa-sun",
            searchTerms: [ "brighten", "contrast", "day", "lighter", "weather" ]
        }, {
            title: "far fa-sun",
            searchTerms: [ "brighten", "contrast", "day", "lighter", "weather" ]
        }, {
            title: "fal fa-sun",
            searchTerms: [ "brighten", "contrast", "day", "lighter", "weather" ]
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
            title: "fas fa-surprise",
            searchTerms: [ "emoticon", "face", "shocked" ]
        }, {
            title: "far fa-surprise",
            searchTerms: [ "emoticon", "face", "shocked" ]
        }, {
            title: "fal fa-surprise",
            searchTerms: [ "emoticon", "face", "shocked" ]
        }, {
            title: "fas fa-swatchbook",
            searchTerms: []
        }, {
            title: "far fa-swatchbook",
            searchTerms: []
        }, {
            title: "fal fa-swatchbook",
            searchTerms: []
        }, {
            title: "fas fa-swimmer",
            searchTerms: [ "athlete", "head", "man", "person", "water" ]
        }, {
            title: "far fa-swimmer",
            searchTerms: [ "athlete", "head", "man", "person", "water" ]
        }, {
            title: "fal fa-swimmer",
            searchTerms: [ "athlete", "head", "man", "person", "water" ]
        }, {
            title: "fas fa-swimming-pool",
            searchTerms: [ "ladder", "recreation", "water" ]
        }, {
            title: "far fa-swimming-pool",
            searchTerms: [ "ladder", "recreation", "water" ]
        }, {
            title: "fal fa-swimming-pool",
            searchTerms: [ "ladder", "recreation", "water" ]
        }, {
            title: "fas fa-sync",
            searchTerms: [ "exchange", "refresh", "reload", "rotate", "swap" ]
        }, {
            title: "far fa-sync",
            searchTerms: [ "exchange", "refresh", "reload", "rotate", "swap" ]
        }, {
            title: "fal fa-sync",
            searchTerms: [ "exchange", "refresh", "reload", "rotate", "swap" ]
        }, {
            title: "fas fa-sync-alt",
            searchTerms: [ "refresh", "reload", "rotate" ]
        }, {
            title: "far fa-sync-alt",
            searchTerms: [ "refresh", "reload", "rotate" ]
        }, {
            title: "fal fa-sync-alt",
            searchTerms: [ "refresh", "reload", "rotate" ]
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
            searchTerms: [ "apple", "device", "ipad", "kindle", "screen" ]
        }, {
            title: "far fa-tablet",
            searchTerms: [ "apple", "device", "ipad", "kindle", "screen" ]
        }, {
            title: "fal fa-tablet",
            searchTerms: [ "apple", "device", "ipad", "kindle", "screen" ]
        }, {
            title: "fas fa-tablet-alt",
            searchTerms: [ "apple", "device", "ipad", "kindle", "screen" ]
        }, {
            title: "far fa-tablet-alt",
            searchTerms: [ "apple", "device", "ipad", "kindle", "screen" ]
        }, {
            title: "fal fa-tablet-alt",
            searchTerms: [ "apple", "device", "ipad", "kindle", "screen" ]
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
            searchTerms: [ "device", "durable", "screen", "tough" ]
        }, {
            title: "far fa-tablet-rugged",
            searchTerms: [ "device", "durable", "screen", "tough" ]
        }, {
            title: "fal fa-tablet-rugged",
            searchTerms: [ "device", "durable", "screen", "tough" ]
        }, {
            title: "fas fa-tablets",
            searchTerms: [ "drugs", "medicine" ]
        }, {
            title: "far fa-tablets",
            searchTerms: [ "drugs", "medicine" ]
        }, {
            title: "fal fa-tablets",
            searchTerms: [ "drugs", "medicine" ]
        }, {
            title: "fas fa-tachometer",
            searchTerms: [ "dashboard", "fast", "speedometer" ]
        }, {
            title: "far fa-tachometer",
            searchTerms: [ "dashboard", "fast", "speedometer" ]
        }, {
            title: "fal fa-tachometer",
            searchTerms: [ "dashboard", "fast", "speedometer" ]
        }, {
            title: "fas fa-tachometer-alt",
            searchTerms: [ "dashboard", "tachometer" ]
        }, {
            title: "far fa-tachometer-alt",
            searchTerms: [ "dashboard", "tachometer" ]
        }, {
            title: "fal fa-tachometer-alt",
            searchTerms: [ "dashboard", "tachometer" ]
        }, {
            title: "fas fa-tachometer-alt-average",
            searchTerms: []
        }, {
            title: "far fa-tachometer-alt-average",
            searchTerms: []
        }, {
            title: "fal fa-tachometer-alt-average",
            searchTerms: []
        }, {
            title: "fas fa-tachometer-alt-fast",
            searchTerms: []
        }, {
            title: "far fa-tachometer-alt-fast",
            searchTerms: []
        }, {
            title: "fal fa-tachometer-alt-fast",
            searchTerms: []
        }, {
            title: "fas fa-tachometer-alt-fastest",
            searchTerms: []
        }, {
            title: "far fa-tachometer-alt-fastest",
            searchTerms: []
        }, {
            title: "fal fa-tachometer-alt-fastest",
            searchTerms: []
        }, {
            title: "fas fa-tachometer-alt-slow",
            searchTerms: []
        }, {
            title: "far fa-tachometer-alt-slow",
            searchTerms: []
        }, {
            title: "fal fa-tachometer-alt-slow",
            searchTerms: []
        }, {
            title: "fas fa-tachometer-alt-slowest",
            searchTerms: []
        }, {
            title: "far fa-tachometer-alt-slowest",
            searchTerms: []
        }, {
            title: "fal fa-tachometer-alt-slowest",
            searchTerms: []
        }, {
            title: "fas fa-tachometer-average",
            searchTerms: []
        }, {
            title: "far fa-tachometer-average",
            searchTerms: []
        }, {
            title: "fal fa-tachometer-average",
            searchTerms: []
        }, {
            title: "fas fa-tachometer-fast",
            searchTerms: []
        }, {
            title: "far fa-tachometer-fast",
            searchTerms: []
        }, {
            title: "fal fa-tachometer-fast",
            searchTerms: []
        }, {
            title: "fas fa-tachometer-fastest",
            searchTerms: []
        }, {
            title: "far fa-tachometer-fastest",
            searchTerms: []
        }, {
            title: "fal fa-tachometer-fastest",
            searchTerms: []
        }, {
            title: "fas fa-tachometer-slow",
            searchTerms: []
        }, {
            title: "far fa-tachometer-slow",
            searchTerms: []
        }, {
            title: "fal fa-tachometer-slow",
            searchTerms: []
        }, {
            title: "fas fa-tachometer-slowest",
            searchTerms: []
        }, {
            title: "far fa-tachometer-slowest",
            searchTerms: []
        }, {
            title: "fal fa-tachometer-slowest",
            searchTerms: []
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
            searchTerms: [ "downloading", "downloads", "loading", "progress", "settings" ]
        }, {
            title: "far fa-tasks",
            searchTerms: [ "downloading", "downloads", "loading", "progress", "settings" ]
        }, {
            title: "fal fa-tasks",
            searchTerms: [ "downloading", "downloads", "loading", "progress", "settings" ]
        }, {
            title: "fas fa-taxi",
            searchTerms: [ "cab", "cabbie", "car", "car service", "lyft", "machine", "transportation", "uber", "vehicle" ]
        }, {
            title: "far fa-taxi",
            searchTerms: [ "cab", "cabbie", "car", "car service", "lyft", "machine", "transportation", "uber", "vehicle" ]
        }, {
            title: "fal fa-taxi",
            searchTerms: [ "cab", "cabbie", "car", "car service", "lyft", "machine", "transportation", "uber", "vehicle" ]
        }, {
            title: "fab fa-teamspeak",
            searchTerms: []
        }, {
            title: "fas fa-teeth",
            searchTerms: []
        }, {
            title: "far fa-teeth",
            searchTerms: []
        }, {
            title: "fal fa-teeth",
            searchTerms: []
        }, {
            title: "fas fa-teeth-open",
            searchTerms: []
        }, {
            title: "far fa-teeth-open",
            searchTerms: []
        }, {
            title: "fal fa-teeth-open",
            searchTerms: []
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
            searchTerms: [ "code", "command", "console", "prompt" ]
        }, {
            title: "far fa-terminal",
            searchTerms: [ "code", "command", "console", "prompt" ]
        }, {
            title: "fal fa-terminal",
            searchTerms: [ "code", "command", "console", "prompt" ]
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
            searchTerms: [ "blocks", "boxes", "grid", "squares" ]
        }, {
            title: "far fa-th",
            searchTerms: [ "blocks", "boxes", "grid", "squares" ]
        }, {
            title: "fal fa-th",
            searchTerms: [ "blocks", "boxes", "grid", "squares" ]
        }, {
            title: "fas fa-th-large",
            searchTerms: [ "blocks", "boxes", "grid", "squares" ]
        }, {
            title: "far fa-th-large",
            searchTerms: [ "blocks", "boxes", "grid", "squares" ]
        }, {
            title: "fal fa-th-large",
            searchTerms: [ "blocks", "boxes", "grid", "squares" ]
        }, {
            title: "fas fa-th-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "far fa-th-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fal fa-th-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fas fa-theater-masks",
            searchTerms: []
        }, {
            title: "far fa-theater-masks",
            searchTerms: []
        }, {
            title: "fal fa-theater-masks",
            searchTerms: []
        }, {
            title: "fab fa-themeco",
            searchTerms: []
        }, {
            title: "fab fa-themeisle",
            searchTerms: []
        }, {
            title: "fas fa-thermometer",
            searchTerms: [ "fever", "temperature" ]
        }, {
            title: "far fa-thermometer",
            searchTerms: [ "fever", "temperature" ]
        }, {
            title: "fal fa-thermometer",
            searchTerms: [ "fever", "temperature" ]
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
            searchTerms: [ "disagree", "disapprove", "dislike", "hand", "thumbs-o-down" ]
        }, {
            title: "far fa-thumbs-down",
            searchTerms: [ "disagree", "disapprove", "dislike", "hand", "thumbs-o-down" ]
        }, {
            title: "fal fa-thumbs-down",
            searchTerms: [ "disagree", "disapprove", "dislike", "hand", "thumbs-o-down" ]
        }, {
            title: "fas fa-thumbs-up",
            searchTerms: [ "agree", "approve", "favorite", "hand", "like", "ok", "okay", "success", "thumbs-o-up", "yes", "you got it dude" ]
        }, {
            title: "far fa-thumbs-up",
            searchTerms: [ "agree", "approve", "favorite", "hand", "like", "ok", "okay", "success", "thumbs-o-up", "yes", "you got it dude" ]
        }, {
            title: "fal fa-thumbs-up",
            searchTerms: [ "agree", "approve", "favorite", "hand", "like", "ok", "okay", "success", "thumbs-o-up", "yes", "you got it dude" ]
        }, {
            title: "fas fa-thumbtack",
            searchTerms: [ "coordinates", "location", "marker", "pin", "thumb-tack" ]
        }, {
            title: "far fa-thumbtack",
            searchTerms: [ "coordinates", "location", "marker", "pin", "thumb-tack" ]
        }, {
            title: "fal fa-thumbtack",
            searchTerms: [ "coordinates", "location", "marker", "pin", "thumb-tack" ]
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
            searchTerms: [ "close", "cross", "error", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "far fa-times",
            searchTerms: [ "close", "cross", "error", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fal fa-times",
            searchTerms: [ "close", "cross", "error", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fas fa-times-circle",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "far fa-times-circle",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fal fa-times-circle",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fas fa-times-hexagon",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "far fa-times-hexagon",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fal fa-times-hexagon",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fas fa-times-octagon",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "far fa-times-octagon",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fal fa-times-octagon",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fas fa-times-square",
            searchTerms: [ "close", "cross", "incorrect", "notice", "notification", "notify", "problem", "window", "wrong" ]
        }, {
            title: "far fa-times-square",
            searchTerms: [ "close", "cross", "incorrect", "notice", "notification", "notify", "problem", "window", "wrong" ]
        }, {
            title: "fal fa-times-square",
            searchTerms: [ "close", "cross", "incorrect", "notice", "notification", "notify", "problem", "window", "wrong" ]
        }, {
            title: "fas fa-tint",
            searchTerms: [ "drop", "droplet", "raindrop", "waterdrop" ]
        }, {
            title: "far fa-tint",
            searchTerms: [ "drop", "droplet", "raindrop", "waterdrop" ]
        }, {
            title: "fal fa-tint",
            searchTerms: [ "drop", "droplet", "raindrop", "waterdrop" ]
        }, {
            title: "fas fa-tint-slash",
            searchTerms: []
        }, {
            title: "far fa-tint-slash",
            searchTerms: []
        }, {
            title: "fal fa-tint-slash",
            searchTerms: []
        }, {
            title: "fas fa-tire",
            searchTerms: [ "wheel" ]
        }, {
            title: "far fa-tire",
            searchTerms: [ "wheel" ]
        }, {
            title: "fal fa-tire",
            searchTerms: [ "wheel" ]
        }, {
            title: "fas fa-tire-flat",
            searchTerms: []
        }, {
            title: "far fa-tire-flat",
            searchTerms: []
        }, {
            title: "fal fa-tire-flat",
            searchTerms: []
        }, {
            title: "fas fa-tire-pressure-warning",
            searchTerms: []
        }, {
            title: "far fa-tire-pressure-warning",
            searchTerms: []
        }, {
            title: "fal fa-tire-pressure-warning",
            searchTerms: []
        }, {
            title: "fas fa-tire-rugged",
            searchTerms: []
        }, {
            title: "far fa-tire-rugged",
            searchTerms: []
        }, {
            title: "fal fa-tire-rugged",
            searchTerms: []
        }, {
            title: "fas fa-tired",
            searchTerms: [ "emoticon", "face", "grumpy" ]
        }, {
            title: "far fa-tired",
            searchTerms: [ "emoticon", "face", "grumpy" ]
        }, {
            title: "fal fa-tired",
            searchTerms: [ "emoticon", "face", "grumpy" ]
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
            title: "fas fa-toolbox",
            searchTerms: [ "admin", "container", "fix", "repair", "settings", "tools" ]
        }, {
            title: "far fa-toolbox",
            searchTerms: [ "admin", "container", "fix", "repair", "settings", "tools" ]
        }, {
            title: "fal fa-toolbox",
            searchTerms: [ "admin", "container", "fix", "repair", "settings", "tools" ]
        }, {
            title: "fas fa-tooth",
            searchTerms: [ "bicuspid", "dental", "molar", "mouth", "teeth" ]
        }, {
            title: "far fa-tooth",
            searchTerms: [ "bicuspid", "dental", "molar", "mouth", "teeth" ]
        }, {
            title: "fal fa-tooth",
            searchTerms: [ "bicuspid", "dental", "molar", "mouth", "teeth" ]
        }, {
            title: "fas fa-toothbrush",
            searchTerms: []
        }, {
            title: "far fa-toothbrush",
            searchTerms: []
        }, {
            title: "fal fa-toothbrush",
            searchTerms: []
        }, {
            title: "fab fa-trade-federation",
            searchTerms: []
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
            title: "fas fa-traffic-cone",
            searchTerms: []
        }, {
            title: "far fa-traffic-cone",
            searchTerms: []
        }, {
            title: "fal fa-traffic-cone",
            searchTerms: []
        }, {
            title: "fas fa-traffic-light",
            searchTerms: []
        }, {
            title: "far fa-traffic-light",
            searchTerms: []
        }, {
            title: "fal fa-traffic-light",
            searchTerms: []
        }, {
            title: "fas fa-traffic-light-go",
            searchTerms: []
        }, {
            title: "far fa-traffic-light-go",
            searchTerms: []
        }, {
            title: "fal fa-traffic-light-go",
            searchTerms: []
        }, {
            title: "fas fa-traffic-light-slow",
            searchTerms: []
        }, {
            title: "far fa-traffic-light-slow",
            searchTerms: []
        }, {
            title: "fal fa-traffic-light-slow",
            searchTerms: []
        }, {
            title: "fas fa-traffic-light-stop",
            searchTerms: []
        }, {
            title: "far fa-traffic-light-stop",
            searchTerms: []
        }, {
            title: "fal fa-traffic-light-stop",
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
            searchTerms: [ "delete", "garbage", "hide", "remove" ]
        }, {
            title: "far fa-trash",
            searchTerms: [ "delete", "garbage", "hide", "remove" ]
        }, {
            title: "fal fa-trash",
            searchTerms: [ "delete", "garbage", "hide", "remove" ]
        }, {
            title: "fas fa-trash-alt",
            searchTerms: [ "delete", "garbage", "hide", "remove", "trash", "trash-o" ]
        }, {
            title: "far fa-trash-alt",
            searchTerms: [ "delete", "garbage", "hide", "remove", "trash", "trash-o" ]
        }, {
            title: "fal fa-trash-alt",
            searchTerms: [ "delete", "garbage", "hide", "remove", "trash", "trash-o" ]
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
            searchTerms: [ "achievement", "award", "cup", "game", "winner" ]
        }, {
            title: "far fa-trophy",
            searchTerms: [ "achievement", "award", "cup", "game", "winner" ]
        }, {
            title: "fal fa-trophy",
            searchTerms: [ "achievement", "award", "cup", "game", "winner" ]
        }, {
            title: "fas fa-trophy-alt",
            searchTerms: [ "achievement", "award", "cup", "game", "star", "winner" ]
        }, {
            title: "far fa-trophy-alt",
            searchTerms: [ "achievement", "award", "cup", "game", "star", "winner" ]
        }, {
            title: "fal fa-trophy-alt",
            searchTerms: [ "achievement", "award", "cup", "game", "star", "winner" ]
        }, {
            title: "fas fa-truck",
            searchTerms: [ "delivery", "shipping" ]
        }, {
            title: "far fa-truck",
            searchTerms: [ "delivery", "shipping" ]
        }, {
            title: "fal fa-truck",
            searchTerms: [ "delivery", "shipping" ]
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
            title: "fas fa-truck-monster",
            searchTerms: []
        }, {
            title: "far fa-truck-monster",
            searchTerms: []
        }, {
            title: "fal fa-truck-monster",
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
            title: "fas fa-truck-pickup",
            searchTerms: []
        }, {
            title: "far fa-truck-pickup",
            searchTerms: []
        }, {
            title: "fal fa-truck-pickup",
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
            title: "fas fa-tshirt",
            searchTerms: [ "cloth", "clothing" ]
        }, {
            title: "far fa-tshirt",
            searchTerms: [ "cloth", "clothing" ]
        }, {
            title: "fal fa-tshirt",
            searchTerms: [ "cloth", "clothing" ]
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
            searchTerms: [ "computer", "display", "monitor", "television" ]
        }, {
            title: "far fa-tv",
            searchTerms: [ "computer", "display", "monitor", "television" ]
        }, {
            title: "fal fa-tv",
            searchTerms: [ "computer", "display", "monitor", "television" ]
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
            searchTerms: [ "social network", "tweet" ]
        }, {
            title: "fab fa-twitter-square",
            searchTerms: [ "social network", "tweet" ]
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
            searchTerms: [ "protection", "rain" ]
        }, {
            title: "far fa-umbrella",
            searchTerms: [ "protection", "rain" ]
        }, {
            title: "fal fa-umbrella",
            searchTerms: [ "protection", "rain" ]
        }, {
            title: "fas fa-umbrella-beach",
            searchTerms: [ "protection", "recreation", "sun" ]
        }, {
            title: "far fa-umbrella-beach",
            searchTerms: [ "protection", "recreation", "sun" ]
        }, {
            title: "fal fa-umbrella-beach",
            searchTerms: [ "protection", "recreation", "sun" ]
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
            searchTerms: [ "back", "control z", "exchange", "oops", "return", "rotate", "swap" ]
        }, {
            title: "far fa-undo",
            searchTerms: [ "back", "control z", "exchange", "oops", "return", "rotate", "swap" ]
        }, {
            title: "fal fa-undo",
            searchTerms: [ "back", "control z", "exchange", "oops", "return", "rotate", "swap" ]
        }, {
            title: "fas fa-undo-alt",
            searchTerms: [ "back", "control z", "exchange", "oops", "return", "swap" ]
        }, {
            title: "far fa-undo-alt",
            searchTerms: [ "back", "control z", "exchange", "oops", "return", "swap" ]
        }, {
            title: "fal fa-undo-alt",
            searchTerms: [ "back", "control z", "exchange", "oops", "return", "swap" ]
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
            searchTerms: [ "chain", "chain-broken", "remove" ]
        }, {
            title: "far fa-unlink",
            searchTerms: [ "chain", "chain-broken", "remove" ]
        }, {
            title: "fal fa-unlink",
            searchTerms: [ "chain", "chain-broken", "remove" ]
        }, {
            title: "fas fa-unlock",
            searchTerms: [ "admin", "lock", "password", "protect" ]
        }, {
            title: "far fa-unlock",
            searchTerms: [ "admin", "lock", "password", "protect" ]
        }, {
            title: "fal fa-unlock",
            searchTerms: [ "admin", "lock", "password", "protect" ]
        }, {
            title: "fas fa-unlock-alt",
            searchTerms: [ "admin", "lock", "password", "protect" ]
        }, {
            title: "far fa-unlock-alt",
            searchTerms: [ "admin", "lock", "password", "protect" ]
        }, {
            title: "fal fa-unlock-alt",
            searchTerms: [ "admin", "lock", "password", "protect" ]
        }, {
            title: "fab fa-untappd",
            searchTerms: []
        }, {
            title: "fas fa-upload",
            searchTerms: [ "export", "publish" ]
        }, {
            title: "far fa-upload",
            searchTerms: [ "export", "publish" ]
        }, {
            title: "fal fa-upload",
            searchTerms: [ "export", "publish" ]
        }, {
            title: "fab fa-usb",
            searchTerms: []
        }, {
            title: "fas fa-usd-circle",
            searchTerms: [ "$", "dollar-sign", "money", "price", "usd" ]
        }, {
            title: "far fa-usd-circle",
            searchTerms: [ "$", "dollar-sign", "money", "price", "usd" ]
        }, {
            title: "fal fa-usd-circle",
            searchTerms: [ "$", "dollar-sign", "money", "price", "usd" ]
        }, {
            title: "fas fa-usd-square",
            searchTerms: [ "$", "dollar-sign", "money", "price", "usd" ]
        }, {
            title: "far fa-usd-square",
            searchTerms: [ "$", "dollar-sign", "money", "price", "usd" ]
        }, {
            title: "fal fa-usd-square",
            searchTerms: [ "$", "dollar-sign", "money", "price", "usd" ]
        }, {
            title: "fas fa-user",
            searchTerms: [ "account", "avatar", "head", "man", "person", "profile" ]
        }, {
            title: "far fa-user",
            searchTerms: [ "account", "avatar", "head", "man", "person", "profile" ]
        }, {
            title: "fal fa-user",
            searchTerms: [ "account", "avatar", "head", "man", "person", "profile" ]
        }, {
            title: "fas fa-user-alt",
            searchTerms: [ "account", "avatar", "head", "man", "person", "profile" ]
        }, {
            title: "far fa-user-alt",
            searchTerms: [ "account", "avatar", "head", "man", "person", "profile" ]
        }, {
            title: "fal fa-user-alt",
            searchTerms: [ "account", "avatar", "head", "man", "person", "profile" ]
        }, {
            title: "fas fa-user-alt-slash",
            searchTerms: []
        }, {
            title: "far fa-user-alt-slash",
            searchTerms: []
        }, {
            title: "fal fa-user-alt-slash",
            searchTerms: []
        }, {
            title: "fas fa-user-astronaut",
            searchTerms: [ "avatar", "clothing", "cosmonaut", "space", "suit" ]
        }, {
            title: "far fa-user-astronaut",
            searchTerms: [ "avatar", "clothing", "cosmonaut", "space", "suit" ]
        }, {
            title: "fal fa-user-astronaut",
            searchTerms: [ "avatar", "clothing", "cosmonaut", "space", "suit" ]
        }, {
            title: "fas fa-user-check",
            searchTerms: []
        }, {
            title: "far fa-user-check",
            searchTerms: []
        }, {
            title: "fal fa-user-check",
            searchTerms: []
        }, {
            title: "fas fa-user-circle",
            searchTerms: [ "account", "avatar", "head", "man", "person", "profile" ]
        }, {
            title: "far fa-user-circle",
            searchTerms: [ "account", "avatar", "head", "man", "person", "profile" ]
        }, {
            title: "fal fa-user-circle",
            searchTerms: [ "account", "avatar", "head", "man", "person", "profile" ]
        }, {
            title: "fas fa-user-clock",
            searchTerms: []
        }, {
            title: "far fa-user-clock",
            searchTerms: []
        }, {
            title: "fal fa-user-clock",
            searchTerms: []
        }, {
            title: "fas fa-user-cog",
            searchTerms: []
        }, {
            title: "far fa-user-cog",
            searchTerms: []
        }, {
            title: "fal fa-user-cog",
            searchTerms: []
        }, {
            title: "fas fa-user-edit",
            searchTerms: []
        }, {
            title: "far fa-user-edit",
            searchTerms: []
        }, {
            title: "fal fa-user-edit",
            searchTerms: []
        }, {
            title: "fas fa-user-friends",
            searchTerms: []
        }, {
            title: "far fa-user-friends",
            searchTerms: []
        }, {
            title: "fal fa-user-friends",
            searchTerms: []
        }, {
            title: "fas fa-user-graduate",
            searchTerms: [ "cap", "clothing", "commencement", "gown", "graduation", "student" ]
        }, {
            title: "far fa-user-graduate",
            searchTerms: [ "cap", "clothing", "commencement", "gown", "graduation", "student" ]
        }, {
            title: "fal fa-user-graduate",
            searchTerms: [ "cap", "clothing", "commencement", "gown", "graduation", "student" ]
        }, {
            title: "fas fa-user-lock",
            searchTerms: []
        }, {
            title: "far fa-user-lock",
            searchTerms: []
        }, {
            title: "fal fa-user-lock",
            searchTerms: []
        }, {
            title: "fas fa-user-md",
            searchTerms: [ "doctor", "job", "medical", "nurse", "occupation", "profile" ]
        }, {
            title: "far fa-user-md",
            searchTerms: [ "doctor", "job", "medical", "nurse", "occupation", "profile" ]
        }, {
            title: "fal fa-user-md",
            searchTerms: [ "doctor", "job", "medical", "nurse", "occupation", "profile" ]
        }, {
            title: "fas fa-user-minus",
            searchTerms: []
        }, {
            title: "far fa-user-minus",
            searchTerms: []
        }, {
            title: "fal fa-user-minus",
            searchTerms: []
        }, {
            title: "fas fa-user-ninja",
            searchTerms: [ "assassin", "avatar", "dangerous", "sneaky" ]
        }, {
            title: "far fa-user-ninja",
            searchTerms: [ "assassin", "avatar", "dangerous", "sneaky" ]
        }, {
            title: "fal fa-user-ninja",
            searchTerms: [ "assassin", "avatar", "dangerous", "sneaky" ]
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
            searchTerms: [ "clothing", "coat", "hat", "incognito", "privacy", "spy", "whisper" ]
        }, {
            title: "far fa-user-secret",
            searchTerms: [ "clothing", "coat", "hat", "incognito", "privacy", "spy", "whisper" ]
        }, {
            title: "fal fa-user-secret",
            searchTerms: [ "clothing", "coat", "hat", "incognito", "privacy", "spy", "whisper" ]
        }, {
            title: "fas fa-user-shield",
            searchTerms: []
        }, {
            title: "far fa-user-shield",
            searchTerms: []
        }, {
            title: "fal fa-user-shield",
            searchTerms: []
        }, {
            title: "fas fa-user-slash",
            searchTerms: []
        }, {
            title: "far fa-user-slash",
            searchTerms: []
        }, {
            title: "fal fa-user-slash",
            searchTerms: []
        }, {
            title: "fas fa-user-tag",
            searchTerms: []
        }, {
            title: "far fa-user-tag",
            searchTerms: []
        }, {
            title: "fal fa-user-tag",
            searchTerms: []
        }, {
            title: "fas fa-user-tie",
            searchTerms: [ "avatar", "business", "clothing", "formal" ]
        }, {
            title: "far fa-user-tie",
            searchTerms: [ "avatar", "business", "clothing", "formal" ]
        }, {
            title: "fal fa-user-tie",
            searchTerms: [ "avatar", "business", "clothing", "formal" ]
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
            searchTerms: [ "people", "persons", "profiles" ]
        }, {
            title: "far fa-users",
            searchTerms: [ "people", "persons", "profiles" ]
        }, {
            title: "fal fa-users",
            searchTerms: [ "people", "persons", "profiles" ]
        }, {
            title: "fas fa-users-class",
            searchTerms: []
        }, {
            title: "far fa-users-class",
            searchTerms: []
        }, {
            title: "fal fa-users-class",
            searchTerms: []
        }, {
            title: "fas fa-users-cog",
            searchTerms: []
        }, {
            title: "far fa-users-cog",
            searchTerms: []
        }, {
            title: "fal fa-users-cog",
            searchTerms: []
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
            searchTerms: [ "cutlery", "dinner", "eat", "food", "knife", "restaurant", "spoon" ]
        }, {
            title: "far fa-utensils",
            searchTerms: [ "cutlery", "dinner", "eat", "food", "knife", "restaurant", "spoon" ]
        }, {
            title: "fal fa-utensils",
            searchTerms: [ "cutlery", "dinner", "eat", "food", "knife", "restaurant", "spoon" ]
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
            title: "fas fa-vector-square",
            searchTerms: [ "anchors", "lines", "object" ]
        }, {
            title: "far fa-vector-square",
            searchTerms: [ "anchors", "lines", "object" ]
        }, {
            title: "fal fa-vector-square",
            searchTerms: [ "anchors", "lines", "object" ]
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
            searchTerms: [ "camera", "film", "movie", "record", "video-camera" ]
        }, {
            title: "far fa-video",
            searchTerms: [ "camera", "film", "movie", "record", "video-camera" ]
        }, {
            title: "fal fa-video",
            searchTerms: [ "camera", "film", "movie", "record", "video-camera" ]
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
            searchTerms: [ "audio", "lower", "music", "quieter", "sound", "speaker" ]
        }, {
            title: "far fa-volume-down",
            searchTerms: [ "audio", "lower", "music", "quieter", "sound", "speaker" ]
        }, {
            title: "fal fa-volume-down",
            searchTerms: [ "audio", "lower", "music", "quieter", "sound", "speaker" ]
        }, {
            title: "fas fa-volume-mute",
            searchTerms: [ "audio", "music", "mute", "sound" ]
        }, {
            title: "far fa-volume-mute",
            searchTerms: [ "audio", "music", "mute", "sound" ]
        }, {
            title: "fal fa-volume-mute",
            searchTerms: [ "audio", "music", "mute", "sound" ]
        }, {
            title: "fas fa-volume-off",
            searchTerms: [ "audio", "music", "mute", "sound" ]
        }, {
            title: "far fa-volume-off",
            searchTerms: [ "audio", "music", "mute", "sound" ]
        }, {
            title: "fal fa-volume-off",
            searchTerms: [ "audio", "music", "mute", "sound" ]
        }, {
            title: "fas fa-volume-up",
            searchTerms: [ "audio", "higher", "louder", "music", "sound", "speaker" ]
        }, {
            title: "far fa-volume-up",
            searchTerms: [ "audio", "higher", "louder", "music", "sound", "speaker" ]
        }, {
            title: "fal fa-volume-up",
            searchTerms: [ "audio", "higher", "louder", "music", "sound", "speaker" ]
        }, {
            title: "fab fa-vuejs",
            searchTerms: []
        }, {
            title: "fas fa-walking",
            searchTerms: []
        }, {
            title: "far fa-walking",
            searchTerms: []
        }, {
            title: "fal fa-walking",
            searchTerms: []
        }, {
            title: "fas fa-wallet",
            searchTerms: []
        }, {
            title: "far fa-wallet",
            searchTerms: []
        }, {
            title: "fal fa-wallet",
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
            title: "fas fa-watch-fitness",
            searchTerms: []
        }, {
            title: "far fa-watch-fitness",
            searchTerms: []
        }, {
            title: "fal fa-watch-fitness",
            searchTerms: []
        }, {
            title: "fab fa-weebly",
            searchTerms: []
        }, {
            title: "fab fa-weibo",
            searchTerms: []
        }, {
            title: "fas fa-weight",
            searchTerms: [ "measurement", "scale", "weight" ]
        }, {
            title: "far fa-weight",
            searchTerms: [ "measurement", "scale", "weight" ]
        }, {
            title: "fal fa-weight",
            searchTerms: [ "measurement", "scale", "weight" ]
        }, {
            title: "fas fa-weight-hanging",
            searchTerms: [ "anvil", "heavy", "measurement" ]
        }, {
            title: "far fa-weight-hanging",
            searchTerms: [ "anvil", "heavy", "measurement" ]
        }, {
            title: "fal fa-weight-hanging",
            searchTerms: [ "anvil", "heavy", "measurement" ]
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
            title: "fas fa-wine-glass-alt",
            searchTerms: []
        }, {
            title: "far fa-wine-glass-alt",
            searchTerms: []
        }, {
            title: "fal fa-wine-glass-alt",
            searchTerms: []
        }, {
            title: "fab fa-wix",
            searchTerms: []
        }, {
            title: "fab fa-wolf-pack-battalion",
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
            searchTerms: [ "fix", "settings", "spanner", "tool", "update" ]
        }, {
            title: "far fa-wrench",
            searchTerms: [ "fix", "settings", "spanner", "tool", "update" ]
        }, {
            title: "fal fa-wrench",
            searchTerms: [ "fix", "settings", "spanner", "tool", "update" ]
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
            searchTerms: [ "film", "video", "youtube-play", "youtube-square" ]
        }, {
            title: "fab fa-youtube-square",
            searchTerms: []
        }, {
            title: "fab fa-zhihu",
            searchTerms: []
        } ]
    });
});