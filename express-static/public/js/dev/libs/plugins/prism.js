/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+applescript+aspnet+c+csharp+cpp+coffeescript+css-extras+git+haml+handlebars+jade+java+less+markdown+objectivec+perl+php+php-extras+python+jsx+ruby+scss+scheme+smarty+sql+stylus+swift+typescript&plugins=line-numbers */
self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {};
var Prism = function () {
  var e = /\blang(?:uage)?-(?!\*)(\w+)\b/i, t = self.Prism = {
    util: {
      encode: function (e) {
        return e instanceof n ? new n(e.type, t.util.encode(e.content), e.alias) : "Array" === t.util.type(e) ? e.map(t.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
      }, type: function (e) {
        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
      }, clone: function (e) {
        var n = t.util.type(e);
        switch (n) {
          case"Object":
            var a = {};
            for (var r in e)e.hasOwnProperty(r) && (a[r] = t.util.clone(e[r]));
            return a;
          case"Array":
            return e.map(function (e) {
              return t.util.clone(e)
            })
        }
        return e
      }
    }, languages: {
      extend: function (e, n) {
        var a = t.util.clone(t.languages[e]);
        for (var r in n)a[r] = n[r];
        return a
      }, insertBefore: function (e, n, a, r) {
        r = r || t.languages;
        var i = r[e];
        if (2 == arguments.length) {
          a = arguments[1];
          for (var l in a)a.hasOwnProperty(l) && (i[l] = a[l]);
          return i
        }
        var s = {};
        for (var o in i)if (i.hasOwnProperty(o)) {
          if (o == n)for (var l in a)a.hasOwnProperty(l) && (s[l] = a[l]);
          s[o] = i[o]
        }
        return t.languages.DFS(t.languages, function (t, n) {
          n === r[e] && t != e && (this[t] = s)
        }), r[e] = s
      }, DFS: function (e, n, a) {
        for (var r in e)e.hasOwnProperty(r) && (n.call(e, r, e[r], a || r), "Object" === t.util.type(e[r]) ? t.languages.DFS(e[r], n) : "Array" === t.util.type(e[r]) && t.languages.DFS(e[r], n, r))
      }
    }, highlightAll: function (e, n) {
      for (var a, r = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), i = 0; a = r[i++];)t.highlightElement(a, e === !0, n)
    }, highlightElement: function (a, r, i) {
      for (var l, s, o = a; o && !e.test(o.className);)o = o.parentNode;
      if (o && (l = (o.className.match(e) || [, ""])[1], s = t.languages[l]), s) {
        a.className = a.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l, o = a.parentNode, /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l);
        var u = a.textContent;
        if (u) {
          u = u.replace(/^(?:\r?\n|\r)/, "");
          var g = {element: a, language: l, grammar: s, code: u};
          if (t.hooks.run("before-highlight", g), r && self.Worker) {
            var c = new Worker(t.filename);
            c.onmessage = function (e) {
              g.highlightedCode = n.stringify(JSON.parse(e.data), l), t.hooks.run("before-insert", g), g.element.innerHTML = g.highlightedCode, i && i.call(g.element), t.hooks.run("after-highlight", g)
            }, c.postMessage(JSON.stringify({language: g.language, code: g.code}))
          } else g.highlightedCode = t.highlight(g.code, g.grammar, g.language), t.hooks.run("before-insert", g), g.element.innerHTML = g.highlightedCode, i && i.call(a), t.hooks.run("after-highlight", g)
        }
      }
    }, highlight: function (e, a, r) {
      var i = t.tokenize(e, a);
      return n.stringify(t.util.encode(i), r)
    }, tokenize: function (e, n) {
      var a = t.Token, r = [e], i = n.rest;
      if (i) {
        for (var l in i)n[l] = i[l];
        delete n.rest
      }
      e:for (var l in n)if (n.hasOwnProperty(l) && n[l]) {
        var s = n[l];
        s = "Array" === t.util.type(s) ? s : [s];
        for (var o = 0; o < s.length; ++o) {
          var u = s[o], g = u.inside, c = !!u.lookbehind, f = 0, h = u.alias;
          u = u.pattern || u;
          for (var p = 0; p < r.length; p++) {
            var d = r[p];
            if (r.length > e.length)break e;
            if (!(d instanceof a)) {
              u.lastIndex = 0;
              var m = u.exec(d);
              if (m) {
                c && (f = m[1].length);
                var y = m.index - 1 + f, m = m[0].slice(f), v = m.length, k = y + v, b = d.slice(0, y + 1), w = d.slice(k + 1), N = [p, 1];
                b && N.push(b);
                var O = new a(l, g ? t.tokenize(m, g) : m, h);
                N.push(O), w && N.push(w), Array.prototype.splice.apply(r, N)
              }
            }
          }
        }
      }
      return r
    }, hooks: {
      all: {}, add: function (e, n) {
        var a = t.hooks.all;
        a[e] = a[e] || [], a[e].push(n)
      }, run: function (e, n) {
        var a = t.hooks.all[e];
        if (a && a.length)for (var r, i = 0; r = a[i++];)r(n)
      }
    }
  }, n = t.Token = function (e, t, n) {
    this.type = e, this.content = t, this.alias = n
  };
  if (n.stringify = function (e, a, r) {
      if ("string" == typeof e)return e;
      if ("Array" === t.util.type(e))return e.map(function (t) {
        return n.stringify(t, a, e)
      }).join("");
      var i = {
        type: e.type,
        content: n.stringify(e.content, a, r),
        tag: "span",
        classes: ["token", e.type],
        attributes: {},
        language: a,
        parent: r
      };
      if ("comment" == i.type && (i.attributes.spellcheck = "true"), e.alias) {
        var l = "Array" === t.util.type(e.alias) ? e.alias : [e.alias];
        Array.prototype.push.apply(i.classes, l)
      }
      t.hooks.run("wrap", i);
      var s = "";
      for (var o in i.attributes)s += o + '="' + (i.attributes[o] || "") + '"';
      return "<" + i.tag + ' class="' + i.classes.join(" ") + '" ' + s + ">" + i.content + "</" + i.tag + ">"
    }, !self.document)return self.addEventListener ? (self.addEventListener("message", function (e) {
    var n = JSON.parse(e.data), a = n.language, r = n.code;
    self.postMessage(JSON.stringify(t.util.encode(t.tokenize(r, t.languages[a])))), self.close()
  }, !1), self.Prism) : self.Prism;
  var a = document.getElementsByTagName("script");
  return a = a[a.length - 1], a && (t.filename = a.src, document.addEventListener && !a.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", t.highlightAll)), self.Prism
}();
"undefined" != typeof module && module.exports && (module.exports = Prism);
;
Prism.languages.markup = {
  comment: /<!--[\w\W]*?-->/,
  prolog: /<\?.+?\?>/,
  doctype: /<!DOCTYPE.+?>/,
  cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
  tag: {
    pattern: /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/i,
    inside: {
      tag: {pattern: /^<\/?[\w:-]+/i, inside: {punctuation: /^<\/?/, namespace: /^[\w-]+?:/}},
      "attr-value": {pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i, inside: {punctuation: /=|>|"/}},
      punctuation: /\/?>/,
      "attr-name": {pattern: /[\w:-]+/, inside: {namespace: /^[\w-]+?:/}}
    }
  },
  entity: /&#?[\da-z]{1,8};/i
}, Prism.hooks.add("wrap", function (t) {
  "entity" === t.type && (t.attributes.title = t.content.replace(/&amp;/, "&"))
});
;
Prism.languages.css = {
  comment: /\/\*[\w\W]*?\*\//,
  atrule: {pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i, inside: {punctuation: /[;:]/}},
  url: /url\((?:(["'])(\\\n|\\?.)*?\1|.*?)\)/i,
  selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/,
  string: /("|')(\\\n|\\?.)*?\1/,
  property: /(\b|\B)[\w-]+(?=\s*:)/i,
  important: /\B!important\b/i,
  punctuation: /[\{\};:]/,
  "function": /[-a-z0-9]+(?=\()/i
}, Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
  style: {
    pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/i,
    inside: {
      tag: {pattern: /<style[\w\W]*?>|<\/style>/i, inside: Prism.languages.markup.tag.inside},
      rest: Prism.languages.css
    },
    alias: "language-css"
  }
}), Prism.languages.insertBefore("inside", "attr-value", {
  "style-attr": {
    pattern: /\s*style=("|').*?\1/i,
    inside: {
      "attr-name": {pattern: /^\s*style/i, inside: Prism.languages.markup.tag.inside},
      punctuation: /^\s*=\s*['"]|['"]\s*$/,
      "attr-value": {pattern: /.+/i, inside: Prism.languages.css}
    },
    alias: "language-css"
  }
}, Prism.languages.markup.tag));
;
Prism.languages.clike = {
  comment: [{pattern: /(^|[^\\])\/\*[\w\W]*?\*\//, lookbehind: !0}, {
    pattern: /(^|[^\\:])\/\/.+/,
    lookbehind: !0
  }],
  string: /("|')(\\\n|\\?.)*?\1/,
  "class-name": {
    pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
    lookbehind: !0,
    inside: {punctuation: /(\.|\\)/}
  },
  keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  "boolean": /\b(true|false)\b/,
  "function": {pattern: /[a-z0-9_]+\(/i, inside: {punctuation: /\(/}},
  number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,
  operator: /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/,
  ignore: /&(lt|gt|amp);/i,
  punctuation: /[{}[\];(),.:]/
};
;
Prism.languages.javascript = Prism.languages.extend("clike", {
  keyword: /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/,
  number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|-?Infinity)\b/,
  "function": /(?!\d)[a-z0-9_$]+(?=\()/i
}), Prism.languages.insertBefore("javascript", "keyword", {
  regex: {
    pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
    lookbehind: !0
  }
}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
  script: {
    pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/i,
    inside: {
      tag: {pattern: /<script[\w\W]*?>|<\/script>/i, inside: Prism.languages.markup.tag.inside},
      rest: Prism.languages.javascript
    },
    alias: "language-javascript"
  }
});
;
Prism.languages.applescript = {
  comment: [/\(\*[\w\W]*?\*\)/, /--.+/, /#.+/],
  string: /"(?:\\?.)*?"/,
  operator: [/[&=≠≤≥*+\-\/÷^]|[<>]=?/, /\b(?:(?:start|begin|end)s? with|(?:(?:does not|doesn't) contain|contains?)|(?:is|isn't|is not) (?:in|contained by)|(?:(?:is|isn't|is not) )?(?:greater|less) than(?: or equal)?(?: to)?|(?:(?:does not|doesn't) come|comes) (?:before|after)|(?:is|isn't|is not) equal(?: to)?|(?:(?:does not|doesn't) equal|equals|equal to|isn't|is not)|(?:a )?(?:ref(?: to)?|reference to)|(?:and|or|div|mod|as|not))\b/],
  keyword: /\b(?:about|above|after|against|and|apart from|around|as|aside from|at|back|before|beginning|behind|below|beneath|beside|between|but|by|considering|contain|contains|continue|copy|div|does|eighth|else|end|equal|equals|error|every|exit|false|fifth|first|for|fourth|from|front|get|given|global|if|ignoring|in|instead of|into|is|it|its|last|local|me|middle|mod|my|ninth|not|of|on|onto|or|out of|over|prop|property|put|ref|reference|repeat|return|returning|script|second|set|seventh|since|sixth|some|tell|tenth|that|the|then|third|through|thru|timeout|times|to|transaction|true|try|until|where|while|whose|with|without)\b/,
  "class": {
    pattern: /\b(?:alias|application|boolean|class|constant|date|file|integer|list|number|POSIX file|real|record|reference|RGB color|script|text|centimetres|centimeters|feet|inches|kilometres|kilometers|metres|meters|miles|yards|square feet|square kilometres|square kilometers|square metres|square meters|square miles|square yards|cubic centimetres|cubic centimeters|cubic feet|cubic inches|cubic metres|cubic meters|cubic yards|gallons|litres|liters|quarts|grams|kilograms|ounces|pounds|degrees Celsius|degrees Fahrenheit|degrees Kelvin)\b/,
    alias: "builtin"
  },
  number: /\b-?\d*\.?\d+([Ee]-?\d+)?\b/,
  punctuation: /[{}():,¬«»《》]/
};
;
Prism.languages.aspnet = Prism.languages.extend("markup", {
  "page-directive tag": {
    pattern: /<%\s*@.*%>/i,
    inside: {
      "page-directive tag": /<%\s*@\s*(?:Assembly|Control|Implements|Import|Master|MasterType|OutputCache|Page|PreviousPageType|Reference|Register)?|%>/i,
      rest: Prism.languages.markup.tag.inside
    }
  },
  "directive tag": {
    pattern: /<%.*%>/i,
    inside: {"directive tag": /<%\s*?[$=%#:]{0,2}|%>/i, rest: Prism.languages.csharp}
  }
}), Prism.languages.insertBefore("inside", "punctuation", {"directive tag": Prism.languages.aspnet["directive tag"]}, Prism.languages.aspnet.tag.inside["attr-value"]), Prism.languages.insertBefore("aspnet", "comment", {"asp comment": /<%--[\w\W]*?--%>/}), Prism.languages.insertBefore("aspnet", Prism.languages.javascript ? "script" : "tag", {
  "asp script": {
    pattern: /<script(?=.*runat=['"]?server['"]?)[\w\W]*?>[\w\W]*?<\/script>/i,
    inside: {
      tag: {
        pattern: /<\/?script\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|\w+))?\s*)*\/?>/i,
        inside: Prism.languages.aspnet.tag.inside
      }, rest: Prism.languages.csharp || {}
    }
  }
}), Prism.languages.aspnet.style && (Prism.languages.aspnet.style.inside.tag.pattern = /<\/?style\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|\w+))?\s*)*\/?>/i, Prism.languages.aspnet.style.inside.tag.inside = Prism.languages.aspnet.tag.inside), Prism.languages.aspnet.script && (Prism.languages.aspnet.script.inside.tag.pattern = Prism.languages.aspnet["asp script"].inside.tag.pattern, Prism.languages.aspnet.script.inside.tag.inside = Prism.languages.aspnet.tag.inside);
;
Prism.languages.c = Prism.languages.extend("clike", {
  string: /("|')([^\n\\\1]|\\.|\\\r*\n)*?\1/,
  keyword: /\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
  operator: /[-+]{1,2}|!=?|<{1,2}=?|>{1,2}=?|\->|={1,2}|\^|~|%|&{1,2}|\|?\||\?|\*|\//
}), Prism.languages.insertBefore("c", "string", {
  property: {
    pattern: /((^|\n)\s*)#\s*[a-z]+([^\n\\]|\\.|\\\r*\n)*/i,
    lookbehind: !0,
    inside: {string: {pattern: /(#\s*include\s*)(<.+?>|("|')(\\?.)+?\3)/, lookbehind: !0}}
  }
}), delete Prism.languages.c["class-name"], delete Prism.languages.c["boolean"];
;
Prism.languages.csharp = Prism.languages.extend("clike", {
  keyword: /\b(abstract|as|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|is|lock|long|namespace|new|null|object|operator|out|override|params|private|protected|public|readonly|ref|return|sbyte|sealed|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|virtual|void|volatile|while|add|alias|ascending|async|await|descending|dynamic|from|get|global|group|into|join|let|orderby|partial|remove|select|set|value|var|where|yield)\b/,
  string: /@?("|')(\\?.)*?\1/,
  preprocessor: /^\s*#.*/m,
  number: /\b-?(0x[\da-f]+|\d*\.?\d+)\b/i
});
;
Prism.languages.cpp = Prism.languages.extend("c", {
  keyword: /\b(alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|delete\[\]|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|new\[\]|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
  "boolean": /\b(true|false)\b/,
  operator: /[-+]{1,2}|!=?|<{1,2}=?|>{1,2}=?|\->|:{1,2}|={1,2}|\^|~|%|&{1,2}|\|?\||\?|\*|\/|\b(and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/
}), Prism.languages.insertBefore("cpp", "keyword", {"class-name": {pattern: /(class\s+)[a-z0-9_]+/i, lookbehind: !0}});
;
!function (e) {
  var n = /#(?!\{).+/, t = {pattern: /#\{[^}]+\}/, alias: "variable"};
  e.languages.coffeescript = e.languages.extend("javascript", {
    comment: n,
    string: [/'(?:\\?[\s\S])*?'/, {pattern: /"(?:\\?[\s\S])*?"/, inside: {interpolation: t}}],
    keyword: /\b(and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
    "class-member": {pattern: /@(?!\d)\w+/, alias: "variable"}
  }), e.languages.insertBefore("coffeescript", "comment", {
    "multiline-comment": {
      pattern: /###[\s\S]+?###/,
      alias: "comment"
    }, "block-regex": {pattern: /\/{3}[\s\S]*?\/{3}/, alias: "regex", inside: {comment: n, interpolation: t}}
  }), e.languages.insertBefore("coffeescript", "string", {
    "inline-javascript": {
      pattern: /`(?:\\?[\s\S])*?`/,
      inside: {delimiter: {pattern: /^`|`$/, alias: "punctuation"}, rest: e.languages.javascript}
    },
    "multiline-string": [{pattern: /'''[\s\S]*?'''/, alias: "string"}, {
      pattern: /"""[\s\S]*?"""/,
      alias: "string",
      inside: {interpolation: t}
    }]
  }), e.languages.insertBefore("coffeescript", "keyword", {property: /(?!\d)\w+(?=\s*:(?!:))/})
}(Prism);
;
Prism.languages.css.selector = {
  pattern: /[^\{\}\s][^\{\}]*(?=\s*\{)/,
  inside: {
    "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
    "pseudo-class": /:[-\w]+(?:\(.*\))?/,
    "class": /\.[-:\.\w]+/,
    id: /#[-:\.\w]+/
  }
}, Prism.languages.insertBefore("css", "function", {
  hexcode: /#[\da-f]{3,6}/i,
  entity: /\\[\da-f]{1,8}/i,
  number: /[\d%\.]+/
});
;
Prism.languages.git = {
  comment: /^#.*$/m,
  string: /("|')(\\?.)*?\1/m,
  command: {pattern: /^.*\$ git .*$/m, inside: {parameter: /\s(--|-)\w+/m}},
  coord: /^@@.*@@$/m,
  deleted: /^-(?!-).+$/m,
  inserted: /^\+(?!\+).+$/m,
  commit_sha1: /^commit \w{40}$/m
};
;
!function (e) {
  e.languages.haml = {
    "multiline-comment": [{
      pattern: /((?:^|\n)([\t ]*))\/.*(\n\2[\t ]+.+)*/,
      lookbehind: !0,
      alias: "comment"
    }, {pattern: /((?:^|\n)([\t ]*))-#.*(\n\2[\t ]+.+)*/, lookbehind: !0, alias: "comment"}],
    "multiline-code": [{
      pattern: /((?:^|\n)([\t ]*)(?:[~-]|[&!]?=)).*,[\t ]*(\n\2[\t ]+.*,[\t ]*)*(\n\2[\t ]+.+)/,
      lookbehind: !0,
      inside: {rest: e.languages.ruby}
    }, {
      pattern: /((?:^|\n)([\t ]*)(?:[~-]|[&!]?=)).*\|[\t ]*(\n\2[\t ]+.*\|[\t ]*)*/,
      lookbehind: !0,
      inside: {rest: e.languages.ruby}
    }],
    filter: {
      pattern: /((?:^|\n)([\t ]*)):[\w-]+(\n(?:\2[\t ]+.+|\s*?(?=\n)))+/,
      lookbehind: !0,
      inside: {"filter-name": {pattern: /^:[\w-]+/, alias: "variable"}}
    },
    markup: {pattern: /((?:^|\n)[\t ]*)<.+/, lookbehind: !0, inside: {rest: e.languages.markup}},
    doctype: {pattern: /((?:^|\n)[\t ]*)!!!(?: .+)?/, lookbehind: !0},
    tag: {
      pattern: /((?:^|\n)[\t ]*)[%.#][\w\-#.]*[\w\-](?:\([^)]+\)|\{(?:\{[^}]+\}|[^}])+\}|\[[^\]]+\])*[\/<>]*/,
      lookbehind: !0,
      inside: {
        attributes: [{
          pattern: /(^|[^#])\{(?:\{[^}]+\}|[^}])+\}/,
          lookbehind: !0,
          inside: {rest: e.languages.ruby}
        }, {
          pattern: /\([^)]+\)/,
          inside: {
            "attr-value": {pattern: /(=\s*)(?:"(?:\\?.)*?"|[^)\s]+)/, lookbehind: !0},
            "attr-name": /[\w:-]+(?=\s*!?=|\s*[,)])/,
            punctuation: /[=(),]/
          }
        }, {pattern: /\[[^\]]+\]/, inside: {rest: e.languages.ruby}}], punctuation: /[<>]/
      }
    },
    code: {pattern: /((?:^|\n)[\t ]*(?:[~-]|[&!]?=)).+/, lookbehind: !0, inside: {rest: e.languages.ruby}},
    interpolation: {
      pattern: /#\{[^}]+\}/,
      inside: {delimiter: {pattern: /^#\{|\}$/, alias: "punctuation"}, rest: e.languages.ruby}
    },
    punctuation: {pattern: /((?:^|\n)[\t ]*)[~=\-&!]/, lookbehind: !0}
  };
  for (var t = "((?:^|\\n)([\\t ]*)):{{filter_name}}(\\n(?:\\2[\\t ]+.+|\\s*?(?=\\n)))+", n = ["css", {
    filter: "coffee",
    language: "coffeescript"
  }, "erb", "javascript", "less", "markdown", "ruby", "scss", "textile"], a = {}, i = 0, r = n.length; r > i; i++) {
    var l = n[i];
    l = "string" == typeof l ? {
      filter: l,
      language: l
    } : l, e.languages[l.language] && (a["filter-" + l.filter] = {
      pattern: RegExp(t.replace("{{filter_name}}", l.filter)),
      lookbehind: !0,
      inside: {"filter-name": {pattern: /^:[\w-]+/, alias: "variable"}, rest: e.languages[l.language]}
    })
  }
  e.languages.insertBefore("haml", "filter", a)
}(Prism);
;
!function (e) {
  var a = /\{\{\{[\w\W]+?\}\}\}|\{\{[\w\W]+?\}\}/g;
  e.languages.handlebars = e.languages.extend("markup", {
    handlebars: {
      pattern: a,
      inside: {
        delimiter: {pattern: /^\{\{\{?|\}\}\}?$/i, alias: "punctuation"},
        string: /(["'])(\\?.)+?\1/,
        number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,
        "boolean": /\b(true|false)\b/,
        block: {pattern: /^(\s*~?\s*)[#\/]\w+/i, lookbehind: !0, alias: "keyword"},
        brackets: {pattern: /\[[^\]]+\]/, inside: {punctuation: /\[|\]/, variable: /[\w\W]+/}},
        punctuation: /[!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]/,
        variable: /[^!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]+/
      }
    }
  }), e.languages.insertBefore("handlebars", "tag", {
    "handlebars-comment": {
      pattern: /\{\{![\w\W]*?\}\}/,
      alias: ["handlebars", "comment"]
    }
  }), e.hooks.add("before-highlight", function (e) {
    "handlebars" === e.language && (e.tokenStack = [], e.backupCode = e.code, e.code = e.code.replace(a, function (a) {
      return e.tokenStack.push(a), "___HANDLEBARS" + e.tokenStack.length + "___"
    }))
  }), e.hooks.add("before-insert", function (e) {
    "handlebars" === e.language && (e.code = e.backupCode, delete e.backupCode)
  }), e.hooks.add("after-highlight", function (a) {
    if ("handlebars" === a.language) {
      for (var n, t = 0; n = a.tokenStack[t]; t++)a.highlightedCode = a.highlightedCode.replace("___HANDLEBARS" + (t + 1) + "___", e.highlight(n, a.grammar, "handlebars"));
      a.element.innerHTML = a.highlightedCode
    }
  })
}(Prism);
;
!function (e) {
  e.languages.jade = {
    "multiline-comment": {
      pattern: /((?:^|\n)([\t ]*))\/\/.*(\n\2[\t ]+.+)*/,
      lookbehind: !0,
      alias: "comment"
    },
    "multiline-script": {
      pattern: /((?:^|\n)([\t ]*)script\b.*\.[\t ]*)(\n(?:\2[\t ]+.+|\s*?(?=\n)))+/,
      lookbehind: !0,
      inside: {rest: e.languages.javascript}
    },
    filter: {
      pattern: /((?:^|\n)([\t ]*)):.+(\n(?:\2[\t ]+.+|\s*?(?=\n)))+/,
      lookbehind: !0,
      inside: {"filter-name": {pattern: /^:[\w-]+/, alias: "variable"}}
    },
    "multiline-plain-text": {
      pattern: /((?:^|\n)([\t ]*)[\w\-#.]+\.[\t ]*)(\n(?:\2[\t ]+.+|\s*?(?=\n)))+/,
      lookbehind: !0
    },
    markup: {pattern: /((?:^|\n)[\t ]*)<.+/, lookbehind: !0, inside: {rest: e.languages.markup}},
    comment: {pattern: /((?:^|\n)[\t ]*)\/\/.+/, lookbehind: !0},
    doctype: {pattern: /((?:^|\n)[\t ]*)doctype(?: .+)?/, lookbehind: !0},
    "flow-control": {
      pattern: /((?:^|\n)[\t ]*)(?:if|unless|else|case|when|default|each|while)(?: .+)?/,
      lookbehind: !0,
      inside: {
        each: {
          pattern: /((?:^|\n)[\t ]*)each .+? in\b/,
          lookbehind: !0,
          inside: {keyword: /\b(?:each|in)\b/, punctuation: /,/}
        },
        branch: {
          pattern: /((?:^|\n)[\t ]*)(?:if|unless|else|case|when|default|while)/,
          lookbehind: !0,
          alias: "keyword"
        },
        rest: e.languages.javascript
      }
    },
    keyword: {pattern: /((?:^|\n)[\t ]*)(?:block|extends|include|append|prepend)\b.+/, lookbehind: !0},
    mixin: [{
      pattern: /((?:^|\n)[\t ]*)mixin .+/,
      lookbehind: !0,
      inside: {keyword: /^mixin/, "function": /\w+(?=\s*\(|\s*$)/, punctuation: /[(),.]/}
    }, {
      pattern: /((?:^|\n)[\t ]*)\+.+/,
      lookbehind: !0,
      inside: {name: {pattern: /^\+\w+/, alias: "function"}, rest: e.languages.javascript}
    }],
    script: {
      pattern: /((?:^|\n)[\t ]*script(?:(?:&[^(]+)?\([^)]+\))*) .+/,
      lookbehind: !0,
      inside: {rest: e.languages.javascript}
    },
    "plain-text": {pattern: /((?:^|\n)[\t ]*(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]+).+/, lookbehind: !0},
    tag: {
      pattern: /((?:^|\n)[\t ]*)(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/,
      lookbehind: !0,
      inside: {
        attributes: [{pattern: /&[^(]+\([^)]+\)/, inside: {rest: e.languages.javascript}}, {
          pattern: /\([^)]+\)/,
          inside: {
            "attr-value": {
              pattern: /(=\s*)(?:\{[^}]*\}|[^,)\n]+)/,
              lookbehind: !0,
              inside: {rest: e.languages.javascript}
            }, "attr-name": /[\w-]+(?=\s*!?=|\s*[,)])/, punctuation: /[!=(),]/
          }
        }], punctuation: /[:]/
      }
    },
    code: [{pattern: /((?:^|\n)[\t ]*(?:-|!?=)).+/, lookbehind: !0, inside: {rest: e.languages.javascript}}],
    punctuation: /[.\-!=|]/
  };
  for (var t = "((?:^|\\n)([\\t ]*)):{{filter_name}}(\\n(?:\\2[\\t ]+.+|\\s*?(?=\\n)))+", n = [{
    filter: "atpl",
    language: "twig"
  }, {
    filter: "coffee",
    language: "coffeescript"
  }, "ejs", "handlebars", "hogan", "less", "livescript", "markdown", "mustache", "plates", {
    filter: "sass",
    language: "scss"
  }, "stylus", "swig"], a = {}, i = 0, s = n.length; s > i; i++) {
    var l = n[i];
    l = "string" == typeof l ? {
      filter: l,
      language: l
    } : l, e.languages[l.language] && (a["filter-" + l.filter] = {
      pattern: RegExp(t.replace("{{filter_name}}", l.filter)),
      lookbehind: !0,
      inside: {"filter-name": {pattern: /^:[\w-]+/, alias: "variable"}, rest: e.languages[l.language]}
    })
  }
  e.languages.insertBefore("jade", "filter", a)
}(Prism);
;
Prism.languages.java = Prism.languages.extend("clike", {
  keyword: /\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,
  number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+[e]?[\d]*[df]\b|\b\d*\.?\d+\b/i,
  operator: {
    pattern: /(^|[^\.])(?:\+=|\+\+?|-=|--?|!=?|<{1,2}=?|>{1,3}=?|==?|&=|&&?|\|=|\|\|?|\?|\*=?|\/=?|%=?|\^=?|:|~)/m,
    lookbehind: !0
  }
});
;
Prism.languages.less = Prism.languages.extend("css", {
  comment: [/\/\*[\w\W]*?\*\//, {
    pattern: /(^|[^\\])\/\/.+/,
    lookbehind: !0
  }],
  atrule: {pattern: /@[\w-]+?(?:\([^{}]+\)|[^(){};])*?(?=\s*\{)/i, inside: {punctuation: /[:()]/}},
  selector: {
    pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\([^{}]*\)|[^{};@])*?(?=\s*\{)/,
    inside: {variable: /@+[\w-]+/}
  },
  property: /(\b|\B)(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
  punctuation: /[{}();:,]/,
  operator: /[+\-*\/]/
}), Prism.languages.insertBefore("less", "punctuation", {"function": Prism.languages.less.function}), Prism.languages.insertBefore("less", "property", {
  variable: [{
    pattern: /@[\w-]+\s*:/,
    inside: {punctuation: /:/}
  }, /@@?[\w-]+/], "mixin-usage": {pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/, lookbehind: !0, alias: "function"}
});
;
Prism.languages.markdown = Prism.languages.extend("markup", {}), Prism.languages.insertBefore("markdown", "prolog", {
  blockquote: {
    pattern: /(^|\n)>(?:[\t ]*>)*/,
    lookbehind: !0,
    alias: "punctuation"
  },
  code: [{pattern: /(^|\n)(?: {4}|\t).+/, lookbehind: !0, alias: "keyword"}, {
    pattern: /``.+?``|`[^`\n]+`/,
    alias: "keyword"
  }],
  title: [{
    pattern: /\w+.*\n(?:==+|--+)/,
    alias: "important",
    inside: {punctuation: /==+$|--+$/}
  }, {pattern: /((?:^|\n)\s*)#+.+/, lookbehind: !0, alias: "important", inside: {punctuation: /^#+|#+$/}}],
  hr: {pattern: /((?:^|\n)\s*)([*-])([\t ]*\2){2,}(?=\s*(?:\n|$))/, lookbehind: !0, alias: "punctuation"},
  list: {pattern: /((?:^|\n)\s*)(?:[*+-]|\d+\.)(?=[\t ].)/, lookbehind: !0, alias: "punctuation"},
  "url-reference": {
    pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:[^>]|\\>)+>)(?:[\t ]+(?:"(?:[^"]|\\")*"|'(?:[^']|\\')*'|\((?:[^)]|\\\))*\)))?/,
    inside: {
      variable: {pattern: /^(!?\[)[^\]]+/, lookbehind: !0},
      string: /(?:"(?:[^"]|\\")*"|'(?:[^']|\\')*'|\((?:[^)]|\\\))*\))$/,
      punctuation: /[[\]\(\)<>:]/
    },
    alias: "url"
  },
  bold: {
    pattern: /(^|[^\\])(\*\*|__)(?:\n(?!\n)|.)+?\2/,
    lookbehind: !0,
    inside: {punctuation: /^\*\*|^__|\*\*\s*$|__\s*$/}
  },
  italic: {
    pattern: /(^|[^\\])(?:\*(?:\n(?!\n)|.)+?\*|_(?:\n(?!\n)|.)+?_)/,
    lookbehind: !0,
    inside: {punctuation: /^[*_]|[*_]$/}
  },
  url: {
    pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:[^"]|\\")*")?\)| ?\[[^\]\n]*\])/,
    inside: {variable: {pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0}, string: {pattern: /"(?:[^"]|\\")*"(?=\)$)/}}
  }
}), Prism.languages.markdown.bold.inside.url = Prism.util.clone(Prism.languages.markdown.url), Prism.languages.markdown.italic.inside.url = Prism.util.clone(Prism.languages.markdown.url), Prism.languages.markdown.bold.inside.italic = Prism.util.clone(Prism.languages.markdown.italic), Prism.languages.markdown.italic.inside.bold = Prism.util.clone(Prism.languages.markdown.bold);
;
Prism.languages.objectivec = Prism.languages.extend("c", {
  keyword: /(\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b)|((?=[\w|@])(@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b)/,
  string: /(?:("|')([^\n\\\1]|\\.|\\\r*\n)*?\1)|(@"([^\n\\"]|\\.|\\\r*\n)*?")/,
  operator: /[-+]{1,2}|!=?|<{1,2}=?|>{1,2}=?|\->|={1,2}|\^|~|%|&{1,2}|\|?\||\?|\*|\/|@/
});
;
Prism.languages.perl = {
  comment: [{
    pattern: /((?:^|\n)\s*)=\w+[\s\S]*?=cut.*/,
    lookbehind: !0
  }, {pattern: /(^|[^\\$])#.*?(\r?\n|$)/, lookbehind: !0}],
  string: [/\b(?:q|qq|qx|qw)\s*([^a-zA-Z0-9\s\{\(\[<])(\\?.)*?\s*\1/, /\b(?:q|qq|qx|qw)\s+([a-zA-Z0-9])(\\?.)*?\s*\1/, /\b(?:q|qq|qx|qw)\s*\(([^()]|\\.)*\s*\)/, /\b(?:q|qq|qx|qw)\s*\{([^{}]|\\.)*\s*\}/, /\b(?:q|qq|qx|qw)\s*\[([^[\]]|\\.)*\s*\]/, /\b(?:q|qq|qx|qw)\s*<([^<>]|\\.)*\s*>/, /("|'|`)(\\?.)*?\1/],
  regex: [/\b(?:m|qr)\s*([^a-zA-Z0-9\s\{\(\[<])(\\?.)*?\s*\1[msixpodualgc]*/, /\b(?:m|qr)\s+([a-zA-Z0-9])(\\?.)*?\s*\1[msixpodualgc]*/, /\b(?:m|qr)\s*\(([^()]|\\.)*\s*\)[msixpodualgc]*/, /\b(?:m|qr)\s*\{([^{}]|\\.)*\s*\}[msixpodualgc]*/, /\b(?:m|qr)\s*\[([^[\]]|\\.)*\s*\][msixpodualgc]*/, /\b(?:m|qr)\s*<([^<>]|\\.)*\s*>[msixpodualgc]*/, /\b(?:s|tr|y)\s*([^a-zA-Z0-9\s\{\(\[<])(\\?.)*?\s*\1\s*((?!\1).|\\.)*\s*\1[msixpodualgcer]*/, /\b(?:s|tr|y)\s+([a-zA-Z0-9])(\\?.)*?\s*\1\s*((?!\1).|\\.)*\s*\1[msixpodualgcer]*/, /\b(?:s|tr|y)\s*\(([^()]|\\.)*\s*\)\s*\(\s*([^()]|\\.)*\s*\)[msixpodualgcer]*/, /\b(?:s|tr|y)\s*\{([^{}]|\\.)*\s*\}\s*\{\s*([^{}]|\\.)*\s*\}[msixpodualgcer]*/, /\b(?:s|tr|y)\s*\[([^[\]]|\\.)*\s*\]\s*\[\s*([^[\]]|\\.)*\s*\][msixpodualgcer]*/, /\b(?:s|tr|y)\s*<([^<>]|\\.)*\s*>\s*<\s*([^<>]|\\.)*\s*>[msixpodualgcer]*/, /\/(\[.+?]|\\.|[^\/\r\n])*\/[msixpodualgc]*(?=\s*($|[\r\n,.;})&|\-+*=~<>!?^]|(lt|gt|le|ge|eq|ne|cmp|not|and|or|xor|x)\b))/],
  variable: [/[&*\$@%]\{\^[A-Z]+\}/, /[&*\$@%]\^[A-Z_]/, /[&*\$@%]#?(?=\{)/, /[&*\$@%]#?((::)*'?(?!\d)[\w$]+)+(::)*/i, /[&*\$@%]\d+/, /[\$@%][!"#\$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/],
  filehandle: {pattern: /<(?!=).*>|\b_\b/, alias: "symbol"},
  vstring: {pattern: /v\d+(\.\d+)*|\d+(\.\d+){2,}/, alias: "string"},
  "function": {pattern: /sub [a-z0-9_]+/i, inside: {keyword: /sub/}},
  keyword: /\b(any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|say|state|sub|switch|undef|unless|until|use|when|while)\b/,
  number: /(\n|\b)-?(0x[\dA-Fa-f](_?[\dA-Fa-f])*|0b[01](_?[01])*|(\d(_?\d)*)?\.?\d(_?\d)*([Ee]-?\d+)?)\b/,
  operator: /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|[-+*=~\/|&]{1,2}|<=?|>=?|\.{1,3}|[!?\\^]|\b(lt|gt|le|ge|eq|ne|cmp|not|and|or|xor|x)\b/,
  punctuation: /[{}[\];(),:]/
};
;
Prism.languages.php = Prism.languages.extend("clike", {
  keyword: /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
  constant: /\b[A-Z0-9_]{2,}\b/,
  comment: {pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])(\/\/).*?(\r?\n|$))/, lookbehind: !0}
}), Prism.languages.insertBefore("php", "class-name", {
  "shell-comment": {
    pattern: /(^|[^\\])#.*?(\r?\n|$)/,
    lookbehind: !0,
    alias: "comment"
  }
}), Prism.languages.insertBefore("php", "keyword", {
  delimiter: /(\?>|<\?php|<\?)/i,
  variable: /(\$\w+)\b/i,
  "package": {pattern: /(\\|namespace\s+|use\s+)[\w\\]+/, lookbehind: !0, inside: {punctuation: /\\/}}
}), Prism.languages.insertBefore("php", "operator", {
  property: {
    pattern: /(->)[\w]+/,
    lookbehind: !0
  }
}), Prism.languages.markup && (Prism.hooks.add("before-highlight", function (e) {
  "php" === e.language && (e.tokenStack = [], e.backupCode = e.code, e.code = e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi, function (n) {
    return e.tokenStack.push(n), "{{{PHP" + e.tokenStack.length + "}}}"
  }))
}), Prism.hooks.add("before-insert", function (e) {
  "php" === e.language && (e.code = e.backupCode, delete e.backupCode)
}), Prism.hooks.add("after-highlight", function (e) {
  if ("php" === e.language) {
    for (var n, a = 0; n = e.tokenStack[a]; a++)e.highlightedCode = e.highlightedCode.replace("{{{PHP" + (a + 1) + "}}}", Prism.highlight(n, e.grammar, "php"));
    e.element.innerHTML = e.highlightedCode
  }
}), Prism.hooks.add("wrap", function (e) {
  "php" === e.language && "markup" === e.type && (e.content = e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, '<span class="token php">$1</span>'))
}), Prism.languages.insertBefore("php", "comment", {
  markup: {pattern: /<[^?]\/?(.*?)>/, inside: Prism.languages.markup},
  php: /\{\{\{PHP[0-9]+\}\}\}/
}));
;
Prism.languages.insertBefore("php", "variable", {
  "this": /\$this/,
  global: /\$_?(GLOBALS|SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)/,
  scope: {pattern: /\b[\w\\]+::/, inside: {keyword: /(static|self|parent)/, punctuation: /(::|\\)/}}
});
;
Prism.languages.python = {
  comment: {pattern: /(^|[^\\])#.*?(\r?\n|$)/, lookbehind: !0},
  string: /"""[\s\S]+?"""|'''[\s\S]+?'''|("|')(\\?.)*?\1/,
  keyword: /\b(as|assert|break|class|continue|def|del|elf|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/,
  "boolean": /\b(True|False)\b/,
  number: /\b-?(0[box])?(?:[\da-f]+\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
  operator: /[-+]|<=?|>=?|!|={1,2}|&{1,2}|\|?\||\?|\*|\/|~|\^|%|\b(or|and|not)\b/,
  punctuation: /[{}[\];(),.:]/
};
;
!function (a) {
  var s = a.util.clone(a.languages.javascript);
  a.languages.jsx = a.languages.extend("markup", s), a.languages.jsx.tag.pattern = /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?\})))?\s*)*\/?>/i, a.languages.jsx.tag.inside["attr-value"].pattern = /=[^\{](?:('|")[\w\W]*?(\1)|[^\s>]+)/i, a.languages.insertBefore("inside", "attr-value", {
    script: {
      pattern: /=(\{[\w\W]*?\})/i,
      inside: {
        "function": a.languages.javascript.function,
        punctuation: /[={}[\];(),.:]/,
        keyword: a.languages.javascript.keyword
      },
      alias: "language-javascript"
    }
  }, a.languages.jsx.tag)
}(Prism);
;
Prism.languages.ruby = Prism.languages.extend("clike", {
  comment: /#[^\r\n]*(\r?\n|$)/,
  keyword: /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/,
  builtin: /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
  constant: /\b[A-Z][a-zA-Z_0-9]*[?!]?\b/
}), Prism.languages.insertBefore("ruby", "keyword", {
  regex: {
    pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
    lookbehind: !0
  }, variable: /[@$]+\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/, symbol: /:\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/
});
;
Prism.languages.scss = Prism.languages.extend("css", {
  comment: {
    pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/,
    lookbehind: !0
  },
  atrule: /@[\w-]+(?=\s+(\(|\{|;))/i,
  url: /([-a-z]+-)*url(?=\()/i,
  selector: /([^@;\{\}\(\)]?([^@;\{\}\(\)]|&|#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/m
}), Prism.languages.insertBefore("scss", "atrule", {keyword: /@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)|(?=@for\s+\$[-_\w]+\s)+from/i}), Prism.languages.insertBefore("scss", "property", {variable: /((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i}), Prism.languages.insertBefore("scss", "function", {
  placeholder: /%[-_\w]+/i,
  statement: /\B!(default|optional)\b/i,
  "boolean": /\b(true|false)\b/,
  "null": /\b(null)\b/,
  operator: /\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|%)\s+/
});
;
Prism.languages.scheme = {
  "boolean": /#(t|f){1}/,
  comment: /;.*/,
  keyword: {
    pattern: /([(])(define(-syntax|-library|-values)?|(case-)?lambda|let(-values|(rec)?(\*)?)?|else|if|cond|begin|delay|delay-force|parameterize|guard|set!|(quasi-)?quote|syntax-rules)/,
    lookbehind: !0
  },
  builtin: {
    pattern: /([(])(cons|car|cdr|null\?|pair\?|boolean\?|eof-object\?|char\?|procedure\?|number\?|port\?|string\?|vector\?|symbol\?|bytevector\?|list|call-with-current-continuation|call\/cc|append|abs|apply|eval)\b/,
    lookbehind: !0
  },
  string: /(["])(?:(?=(\\?))\2.)*?\1|'[^('|\s)]+/,
  number: /(\s|\))[-+]?[0-9]*\.?[0-9]+((\s*)[-+]{1}(\s*)[0-9]*\.?[0-9]+i)?/,
  operator: /(\*|\+|\-|%|\/|<=|=>|>=|<|=|>)/,
  "function": {pattern: /([(])[^(\s|\))]*\s/, lookbehind: !0},
  punctuation: /[()]/
};
;
!function (e) {
  var t = /\{\*[\w\W]+?\*\}|\{[\w\W]+?\}/g, a = "{literal}", n = "{/literal}", o = !1;
  e.languages.smarty = e.languages.extend("markup", {
    smarty: {
      pattern: t,
      inside: {
        delimiter: {pattern: /^\{|\}$/i, alias: "punctuation"},
        string: /(["'])(\\?.)*?\1/,
        number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,
        variable: [/\$(?!\d)\w+/, /#(?!\d)\w+#/, {
          pattern: /(\.|->)(?!\d)\w+/,
          lookbehind: !0
        }, {pattern: /(\[)(?!\d)\w+(?=\])/, lookbehind: !0}],
        "function": [{pattern: /(\|\s*)@?(?!\d)\w+/, lookbehind: !0}, /^\/?(?!\d)\w+/, /(?!\d)\w+(?=\()/],
        "attr-name": {
          pattern: /\w+\s*=\s*(?:(?!\d)\w+)?/,
          inside: {variable: {pattern: /(=\s*)(?!\d)\w+/, lookbehind: !0}, punctuation: /=/}
        },
        punctuation: /[\[\]().,=\|:`]|\->/,
        operator: [/[+\-*\/%]|===?|[!<>]=?|&&|\|\|/, /\bis\s+(?:not\s+)?(?:div|even|odd)(?:\s+by)?\b/, /\b(?:eq|neq?|gt|lt|gt?e|lt?e|not|mod|or|and)\b/],
        keyword: /\b(?:false|off|on|no|true|yes)\b/
      }
    }
  }), e.languages.insertBefore("smarty", "tag", {
    "smarty-comment": {
      pattern: /\{\*[\w\W]*?\*\}/,
      alias: ["smarty", "comment"]
    }
  }), e.hooks.add("before-highlight", function (e) {
    "smarty" === e.language && (e.tokenStack = [], e.backupCode = e.code, e.code = e.code.replace(t, function (t) {
      return t === n && (o = !1), o ? t : (t === a && (o = !0), e.tokenStack.push(t), "___SMARTY" + e.tokenStack.length + "___")
    }))
  }), e.hooks.add("before-insert", function (e) {
    "smarty" === e.language && (e.code = e.backupCode, delete e.backupCode)
  }), e.hooks.add("after-highlight", function (t) {
    if ("smarty" === t.language) {
      for (var a, n = 0; a = t.tokenStack[n]; n++)t.highlightedCode = t.highlightedCode.replace("___SMARTY" + (n + 1) + "___", e.highlight(a, t.grammar, "smarty"));
      t.element.innerHTML = t.highlightedCode
    }
  })
}(Prism);
;
Prism.languages.sql = {
  comment: {pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|((--)|(\/\/)|#).*?(\r?\n|$))/, lookbehind: !0},
  string: {pattern: /(^|[^@])("|')(\\?[\s\S])*?\2/, lookbehind: !0},
  variable: /@[\w.$]+|@("|'|`)(\\?[\s\S])+?\1/,
  "function": /\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/i,
  keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALTER|ANALYZE|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADE|CASCADED|CASE|CHAIN|CHAR VARYING|CHARACTER VARYING|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATA|DATABASE|DATABASES|DATETIME|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DOUBLE PRECISION|DROP|DUMMY|DUMP|DUMPFILE|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE|ESCAPED BY|EXCEPT|EXEC|EXECUTE|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR|FOR EACH ROW|FORCE|FOREIGN|FREETEXT|FREETEXTTABLE|FROM|FULL|FUNCTION|GEOMETRY|GEOMETRYCOLLECTION|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY|IDENTITY_INSERT|IDENTITYCOL|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEY|KEYS|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONGBLOB|LONGTEXT|MATCH|MATCHED|MEDIUMBLOB|MEDIUMINT|MEDIUMTEXT|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTILINESTRING|MULTIPOINT|MULTIPOLYGON|NATIONAL|NATIONAL CHAR VARYING|NATIONAL CHARACTER|NATIONAL CHARACTER VARYING|NATIONAL VARCHAR|NATURAL|NCHAR|NCHAR VARCHAR|NEXT|NO|NO SQL|NOCHECK|NOCYCLE|NONCLUSTERED|NULLIF|NUMERIC|OF|OFF|OFFSETS|ON|OPEN|OPENDATASOURCE|OPENQUERY|OPENROWSET|OPTIMIZE|OPTION|OPTIONALLY|ORDER|OUT|OUTER|OUTFILE|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC|PROCEDURE|PUBLIC|PURGE|QUICK|RAISERROR|READ|READS SQL DATA|READTEXT|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURN|RETURNS|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROWCOUNT|ROWGUIDCOL|ROWS?|RTREE|RULE|SAVE|SAVEPOINT|SCHEMA|SELECT|SERIAL|SERIALIZABLE|SESSION|SESSION_USER|SET|SETUSER|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START|STARTING BY|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLE|TABLES|TABLESPACE|TEMP(?:ORARY)?|TEMPTABLE|TERMINATED BY|TEXT|TEXTSIZE|THEN|TIMESTAMP|TINYBLOB|TINYINT|TINYTEXT|TO|TOP|TRAN|TRANSACTION|TRANSACTIONS|TRIGGER|TRUNCATE|TSEQUAL|TYPE|TYPES|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNPIVOT|UPDATE|UPDATETEXT|USAGE|USE|USER|USING|VALUE|VALUES|VARBINARY|VARCHAR|VARCHARACTER|VARYING|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH|WITH ROLLUP|WITHIN|WORK|WRITE|WRITETEXT)\b/i,
  "boolean": /\b(?:TRUE|FALSE|NULL)\b/i,
  number: /\b-?(0x)?\d*\.?[\da-f]+\b/,
  operator: /\b(?:ALL|AND|ANY|BETWEEN|EXISTS|IN|LIKE|NOT|OR|IS|UNIQUE|CHARACTER SET|COLLATE|DIV|OFFSET|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b|[-+]|!|[=<>]{1,2}|(&){1,2}|\|?\||\?|\*|\//i,
  punctuation: /[;[\]()`,.]/
};
;
Prism.languages.stylus = {
  comment: {pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g, lookbehind: !0},
  keyword: /(px|r?em|ex|ch|vw|vh|vmin|vmax|deg|grad|rad|turn|m?s|k?Hz|dpi|dppx|dpcm)\b|\b(is|defined|not|isnt|and|or|unless|for|in)\b/g,
  atrule: /@[\w-]+(?=\s+\S+)/gi,
  url: /url\((["']?).*?\1\)/gi,
  variable: /^\s*([\w-]+)(?=\s*[+-\\]?=)/gm,
  string: /("|')(\\\n|\\?.)*?\1/g,
  important: /\B!important\b/gi,
  hexcode: /#[\da-f]{3,6}/gi,
  entity: /\\[\da-f]{1,8}/gi,
  number: /\d+\.?\d*%?/g,
  selector: [{
    pattern: /::?(after|before|first-letter|first-line|selection)/g,
    alias: "pseudo-element"
  }, {
    pattern: /:(?:active|checked|disabled|empty|enabled|first-child|first-of-type|focus|hover|in-range|invalid|lang|last-child|last-of-type|link|not|nth-child|nth-last-child|nth-last-of-type|nth-of-type|only-of-type|only-child|optional|out-of-range|read-only|read-write|required|root|target|valid|visited)(?:\(.*\))?/g,
    alias: "pseudo-class"
  }, {
    pattern: /\[[\w-]+?\s*[*~$^|=]?(?:=\s*\S+)?\]/g,
    inside: {
      "attr-name": {pattern: /(\[)([\w-]+)(?=\s*[*~$^|=]{0,2})/g, lookbehind: !0},
      punctuation: /\[|\]/g,
      operator: /[*~$^|=]/g,
      "attr-value": {pattern: /\S+/}
    },
    alias: "attr"
  }, {pattern: /\.[a-z-]+/i, alias: "class"}, {
    pattern: /#[a-z-]+/i,
    alias: "id"
  }, {
    pattern: /\b(html|head|title|base|link|meta|style|script|noscript|template|body|section|nav|article|aside|h[1-6]|header|footer|address|main|p|hr|pre|blockquote|ol|ul|li|dl|dt|dd|figure|figcaption|div|a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|dbo|span|br|wbr|ins|del|image|iframe|embed|object|param|video|audio|source|track|canvas|map|area|sv|math|table|caption|colgroup|col|tbody|thead|tfoot|tr|td|th|form|fieldset|legeng|label|input|button|select|datalist|optgroup|option|textarea|keygen|output|progress|meter|details|summary|menuitem|menu)\b/g,
    alias: "tag"
  }],
  property: [/^\s*([a-z-]+)(?=\s+[\w\W]+|\s*:)(?!\s*\{|\r?\n)/gim, {
    pattern: /(\(\s*)([a-z-]+)(?=\s*:)/gi,
    lookbehind: !0
  }],
  "function": /[-a-z0-9]+(?=\()/gi,
  punctuation: /[\{\};:]/g,
  operator: /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/g
};
;
Prism.languages.swift = Prism.languages.extend("clike", {
  keyword: /\b(as|associativity|break|case|class|continue|convenience|default|deinit|didSet|do|dynamicType|else|enum|extension|fallthrough|final|for|func|get|if|import|in|infix|init|inout|internal|is|lazy|left|let|mutating|new|none|nonmutating|operator|optional|override|postfix|precedence|prefix|private|protocol|public|required|return|right|safe|self|Self|set|static|struct|subscript|super|switch|Type|typealias|unowned|unowned|unsafe|var|weak|where|while|willSet|__COLUMN__|__FILE__|__FUNCTION__|__LINE__)\b/,
  number: /\b([\d_]+(\.[\de_]+)?|0x[a-f0-9_]+(\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
  constant: /\b(nil|[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
  atrule: /@\b(IBOutlet|IBDesignable|IBAction|IBInspectable|class_protocol|exported|noreturn|NSCopying|NSManaged|objc|UIApplicationMain|auto_closure)\b/,
  builtin: /\b([A-Z]\S+|abs|advance|alignof|alignofValue|assert|contains|count|countElements|debugPrint|debugPrintln|distance|dropFirst|dropLast|dump|enumerate|equal|filter|find|first|getVaList|indices|isEmpty|join|last|lazy|lexicographicalCompare|map|max|maxElement|min|minElement|numericCast|overlaps|partition|prefix|print|println|reduce|reflect|reverse|sizeof|sizeofValue|sort|sorted|split|startsWith|stride|strideof|strideofValue|suffix|swap|toDebugString|toString|transcode|underestimateCount|unsafeBitCast|withExtendedLifetime|withUnsafeMutablePointer|withUnsafeMutablePointers|withUnsafePointer|withUnsafePointers|withVaList)\b/
});
;
Prism.languages.typescript = Prism.languages.extend("javascript", {keyword: /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield|module|declare|constructor|string|Function|any|number|boolean|Array|enum)\b/});
;
Prism.hooks.add("after-highlight", function (e) {
  var n = e.element.parentNode;
  if (n && /pre/i.test(n.nodeName) && -1 !== n.className.indexOf("line-numbers")) {
    var t, a = 1 + e.code.split("\n").length;
    lines = new Array(a), lines = lines.join("<span></span>"), t = document.createElement("span"), t.className = "line-numbers-rows", t.innerHTML = lines, n.hasAttribute("data-start") && (n.style.counterReset = "linenumber " + (parseInt(n.getAttribute("data-start"), 10) - 1)), e.element.appendChild(t)
  }
});
;
