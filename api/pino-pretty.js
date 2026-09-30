import { createRequire as __bannerCrReq } from 'node:module';
import __bannerPath from 'node:path';
import __bannerUrl from 'node:url';

globalThis.require = __bannerCrReq(import.meta.url);
globalThis.__filename = __bannerUrl.fileURLToPath(import.meta.url);
globalThis.__dirname = __bannerPath.dirname(globalThis.__filename);
    
var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// ../../node_modules/.pnpm/colorette@2.0.20/node_modules/colorette/index.cjs
var require_colorette = __commonJS({
  "../../node_modules/.pnpm/colorette@2.0.20/node_modules/colorette/index.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tty = __require("tty");
    function _interopNamespace(e) {
      if (e && e.__esModule) return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    var tty__namespace = /* @__PURE__ */ _interopNamespace(tty);
    var {
      env = {},
      argv = [],
      platform = ""
    } = typeof process === "undefined" ? {} : process;
    var isDisabled = "NO_COLOR" in env || argv.includes("--no-color");
    var isForced = "FORCE_COLOR" in env || argv.includes("--color");
    var isWindows = platform === "win32";
    var isDumbTerminal = env.TERM === "dumb";
    var isCompatibleTerminal = tty__namespace && tty__namespace.isatty && tty__namespace.isatty(1) && env.TERM && !isDumbTerminal;
    var isCI = "CI" in env && ("GITHUB_ACTIONS" in env || "GITLAB_CI" in env || "CIRCLECI" in env);
    var isColorSupported = !isDisabled && (isForced || isWindows && !isDumbTerminal || isCompatibleTerminal || isCI);
    var replaceClose = (index, string, close, replace, head = string.substring(0, index) + replace, tail = string.substring(index + close.length), next = tail.indexOf(close)) => head + (next < 0 ? tail : replaceClose(next, tail, close, replace));
    var clearBleed = (index, string, open, close, replace) => index < 0 ? open + string + close : open + replaceClose(index, string, close, replace) + close;
    var filterEmpty = (open, close, replace = open, at = open.length + 1) => (string) => string || !(string === "" || string === void 0) ? clearBleed(
      ("" + string).indexOf(close, at),
      string,
      open,
      close,
      replace
    ) : "";
    var init = (open, close, replace) => filterEmpty(`\x1B[${open}m`, `\x1B[${close}m`, replace);
    var colors = {
      reset: init(0, 0),
      bold: init(1, 22, "\x1B[22m\x1B[1m"),
      dim: init(2, 22, "\x1B[22m\x1B[2m"),
      italic: init(3, 23),
      underline: init(4, 24),
      inverse: init(7, 27),
      hidden: init(8, 28),
      strikethrough: init(9, 29),
      black: init(30, 39),
      red: init(31, 39),
      green: init(32, 39),
      yellow: init(33, 39),
      blue: init(34, 39),
      magenta: init(35, 39),
      cyan: init(36, 39),
      white: init(37, 39),
      gray: init(90, 39),
      bgBlack: init(40, 49),
      bgRed: init(41, 49),
      bgGreen: init(42, 49),
      bgYellow: init(43, 49),
      bgBlue: init(44, 49),
      bgMagenta: init(45, 49),
      bgCyan: init(46, 49),
      bgWhite: init(47, 49),
      blackBright: init(90, 39),
      redBright: init(91, 39),
      greenBright: init(92, 39),
      yellowBright: init(93, 39),
      blueBright: init(94, 39),
      magentaBright: init(95, 39),
      cyanBright: init(96, 39),
      whiteBright: init(97, 39),
      bgBlackBright: init(100, 49),
      bgRedBright: init(101, 49),
      bgGreenBright: init(102, 49),
      bgYellowBright: init(103, 49),
      bgBlueBright: init(104, 49),
      bgMagentaBright: init(105, 49),
      bgCyanBright: init(106, 49),
      bgWhiteBright: init(107, 49)
    };
    var createColors = ({ useColor = isColorSupported } = {}) => useColor ? colors : Object.keys(colors).reduce(
      (colors2, key) => ({ ...colors2, [key]: String }),
      {}
    );
    var {
      reset,
      bold,
      dim,
      italic,
      underline,
      inverse,
      hidden,
      strikethrough,
      black,
      red,
      green,
      yellow,
      blue,
      magenta,
      cyan,
      white,
      gray,
      bgBlack,
      bgRed,
      bgGreen,
      bgYellow,
      bgBlue,
      bgMagenta,
      bgCyan,
      bgWhite,
      blackBright,
      redBright,
      greenBright,
      yellowBright,
      blueBright,
      magentaBright,
      cyanBright,
      whiteBright,
      bgBlackBright,
      bgRedBright,
      bgGreenBright,
      bgYellowBright,
      bgBlueBright,
      bgMagentaBright,
      bgCyanBright,
      bgWhiteBright
    } = createColors();
    exports.bgBlack = bgBlack;
    exports.bgBlackBright = bgBlackBright;
    exports.bgBlue = bgBlue;
    exports.bgBlueBright = bgBlueBright;
    exports.bgCyan = bgCyan;
    exports.bgCyanBright = bgCyanBright;
    exports.bgGreen = bgGreen;
    exports.bgGreenBright = bgGreenBright;
    exports.bgMagenta = bgMagenta;
    exports.bgMagentaBright = bgMagentaBright;
    exports.bgRed = bgRed;
    exports.bgRedBright = bgRedBright;
    exports.bgWhite = bgWhite;
    exports.bgWhiteBright = bgWhiteBright;
    exports.bgYellow = bgYellow;
    exports.bgYellowBright = bgYellowBright;
    exports.black = black;
    exports.blackBright = blackBright;
    exports.blue = blue;
    exports.blueBright = blueBright;
    exports.bold = bold;
    exports.createColors = createColors;
    exports.cyan = cyan;
    exports.cyanBright = cyanBright;
    exports.dim = dim;
    exports.gray = gray;
    exports.green = green;
    exports.greenBright = greenBright;
    exports.hidden = hidden;
    exports.inverse = inverse;
    exports.isColorSupported = isColorSupported;
    exports.italic = italic;
    exports.magenta = magenta;
    exports.magentaBright = magentaBright;
    exports.red = red;
    exports.redBright = redBright;
    exports.reset = reset;
    exports.strikethrough = strikethrough;
    exports.underline = underline;
    exports.white = white;
    exports.whiteBright = whiteBright;
    exports.yellow = yellow;
    exports.yellowBright = yellowBright;
  }
});

// ../../node_modules/.pnpm/wrappy@1.0.2/node_modules/wrappy/wrappy.js
var require_wrappy = __commonJS({
  "../../node_modules/.pnpm/wrappy@1.0.2/node_modules/wrappy/wrappy.js"(exports, module) {
    module.exports = wrappy;
    function wrappy(fn, cb) {
      if (fn && cb) return wrappy(fn)(cb);
      if (typeof fn !== "function")
        throw new TypeError("need wrapper function");
      Object.keys(fn).forEach(function(k) {
        wrapper[k] = fn[k];
      });
      return wrapper;
      function wrapper() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        var ret = fn.apply(this, args);
        var cb2 = args[args.length - 1];
        if (typeof ret === "function" && ret !== cb2) {
          Object.keys(cb2).forEach(function(k) {
            ret[k] = cb2[k];
          });
        }
        return ret;
      }
    }
  }
});

// ../../node_modules/.pnpm/once@1.4.0/node_modules/once/once.js
var require_once = __commonJS({
  "../../node_modules/.pnpm/once@1.4.0/node_modules/once/once.js"(exports, module) {
    var wrappy = require_wrappy();
    module.exports = wrappy(once);
    module.exports.strict = wrappy(onceStrict);
    once.proto = once(function() {
      Object.defineProperty(Function.prototype, "once", {
        value: function() {
          return once(this);
        },
        configurable: true
      });
      Object.defineProperty(Function.prototype, "onceStrict", {
        value: function() {
          return onceStrict(this);
        },
        configurable: true
      });
    });
    function once(fn) {
      var f = function() {
        if (f.called) return f.value;
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      f.called = false;
      return f;
    }
    function onceStrict(fn) {
      var f = function() {
        if (f.called)
          throw new Error(f.onceError);
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      var name = fn.name || "Function wrapped with `once`";
      f.onceError = name + " shouldn't be called more than once";
      f.called = false;
      return f;
    }
  }
});

// ../../node_modules/.pnpm/end-of-stream@1.4.5/node_modules/end-of-stream/index.js
var require_end_of_stream = __commonJS({
  "../../node_modules/.pnpm/end-of-stream@1.4.5/node_modules/end-of-stream/index.js"(exports, module) {
    var once = require_once();
    var noop = function() {
    };
    var qnt = global.Bare ? queueMicrotask : process.nextTick.bind(process);
    var isRequest = function(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    };
    var isChildProcess = function(stream) {
      return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3;
    };
    var eos = function(stream, opts, callback) {
      if (typeof opts === "function") return eos(stream, null, opts);
      if (!opts) opts = {};
      callback = once(callback || noop);
      var ws = stream._writableState;
      var rs = stream._readableState;
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;
      var cancelled = false;
      var onlegacyfinish = function() {
        if (!stream.writable) onfinish();
      };
      var onfinish = function() {
        writable = false;
        if (!readable) callback.call(stream);
      };
      var onend = function() {
        readable = false;
        if (!writable) callback.call(stream);
      };
      var onexit = function(exitCode) {
        callback.call(stream, exitCode ? new Error("exited with error code: " + exitCode) : null);
      };
      var onerror = function(err) {
        callback.call(stream, err);
      };
      var onclose = function() {
        qnt(onclosenexttick);
      };
      var onclosenexttick = function() {
        if (cancelled) return;
        if (readable && !(rs && (rs.ended && !rs.destroyed))) return callback.call(stream, new Error("premature close"));
        if (writable && !(ws && (ws.ended && !ws.destroyed))) return callback.call(stream, new Error("premature close"));
      };
      var onrequest = function() {
        stream.req.on("finish", onfinish);
      };
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req) onrequest();
        else stream.on("request", onrequest);
      } else if (writable && !ws) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      if (isChildProcess(stream)) stream.on("exit", onexit);
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false) stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        cancelled = true;
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req) stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("exit", onexit);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    };
    module.exports = eos;
  }
});

// ../../node_modules/.pnpm/pump@3.0.4/node_modules/pump/index.js
var require_pump = __commonJS({
  "../../node_modules/.pnpm/pump@3.0.4/node_modules/pump/index.js"(exports, module) {
    var once = require_once();
    var eos = require_end_of_stream();
    var fs;
    try {
      fs = __require("fs");
    } catch (e) {
    }
    var noop = function() {
    };
    var ancient = typeof process === "undefined" ? false : /^v?\.0/.test(process.version);
    var isFn = function(fn) {
      return typeof fn === "function";
    };
    var isFS = function(stream) {
      if (!ancient) return false;
      if (!fs) return false;
      return (stream instanceof (fs.ReadStream || noop) || stream instanceof (fs.WriteStream || noop)) && isFn(stream.close);
    };
    var isRequest = function(stream) {
      return stream.setHeader && isFn(stream.abort);
    };
    var destroyer = function(stream, reading, writing, callback) {
      callback = once(callback);
      var closed = false;
      stream.on("close", function() {
        closed = true;
      });
      eos(stream, { readable: reading, writable: writing }, function(err) {
        if (err) return callback(err);
        closed = true;
        callback();
      });
      var destroyed = false;
      return function(err) {
        if (closed) return;
        if (destroyed) return;
        destroyed = true;
        if (isFS(stream)) return stream.close(noop);
        if (isRequest(stream)) return stream.abort();
        if (isFn(stream.destroy)) return stream.destroy();
        callback(err || new Error("stream was destroyed"));
      };
    };
    var call = function(fn) {
      fn();
    };
    var pipe = function(from, to) {
      return from.pipe(to);
    };
    var pump = function() {
      var streams = Array.prototype.slice.call(arguments);
      var callback = isFn(streams[streams.length - 1] || noop) && streams.pop() || noop;
      if (Array.isArray(streams[0])) streams = streams[0];
      if (streams.length < 2) throw new Error("pump requires two streams per minimum");
      var error;
      var destroys = streams.map(function(stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return destroyer(stream, reading, writing, function(err) {
          if (!error) error = err;
          if (err) destroys.forEach(call);
          if (reading) return;
          destroys.forEach(call);
          callback(error);
        });
      });
      return streams.reduce(pipe);
    };
    module.exports = pump;
  }
});

// ../../node_modules/.pnpm/split2@4.2.0/node_modules/split2/index.js
var require_split2 = __commonJS({
  "../../node_modules/.pnpm/split2@4.2.0/node_modules/split2/index.js"(exports, module) {
    "use strict";
    var { Transform } = __require("stream");
    var { StringDecoder } = __require("string_decoder");
    var kLast = /* @__PURE__ */ Symbol("last");
    var kDecoder = /* @__PURE__ */ Symbol("decoder");
    function transform(chunk, enc, cb) {
      let list;
      if (this.overflow) {
        const buf = this[kDecoder].write(chunk);
        list = buf.split(this.matcher);
        if (list.length === 1) return cb();
        list.shift();
        this.overflow = false;
      } else {
        this[kLast] += this[kDecoder].write(chunk);
        list = this[kLast].split(this.matcher);
      }
      this[kLast] = list.pop();
      for (let i = 0; i < list.length; i++) {
        try {
          push(this, this.mapper(list[i]));
        } catch (error) {
          return cb(error);
        }
      }
      this.overflow = this[kLast].length > this.maxLength;
      if (this.overflow && !this.skipOverflow) {
        cb(new Error("maximum buffer reached"));
        return;
      }
      cb();
    }
    function flush(cb) {
      this[kLast] += this[kDecoder].end();
      if (this[kLast]) {
        try {
          push(this, this.mapper(this[kLast]));
        } catch (error) {
          return cb(error);
        }
      }
      cb();
    }
    function push(self, val) {
      if (val !== void 0) {
        self.push(val);
      }
    }
    function noop(incoming) {
      return incoming;
    }
    function split(matcher, mapper, options) {
      matcher = matcher || /\r?\n/;
      mapper = mapper || noop;
      options = options || {};
      switch (arguments.length) {
        case 1:
          if (typeof matcher === "function") {
            mapper = matcher;
            matcher = /\r?\n/;
          } else if (typeof matcher === "object" && !(matcher instanceof RegExp) && !matcher[Symbol.split]) {
            options = matcher;
            matcher = /\r?\n/;
          }
          break;
        case 2:
          if (typeof matcher === "function") {
            options = mapper;
            mapper = matcher;
            matcher = /\r?\n/;
          } else if (typeof mapper === "object") {
            options = mapper;
            mapper = noop;
          }
      }
      options = Object.assign({}, options);
      options.autoDestroy = true;
      options.transform = transform;
      options.flush = flush;
      options.readableObjectMode = true;
      const stream = new Transform(options);
      stream[kLast] = "";
      stream[kDecoder] = new StringDecoder("utf8");
      stream.matcher = matcher;
      stream.mapper = mapper;
      stream.maxLength = options.maxLength;
      stream.skipOverflow = options.skipOverflow || false;
      stream.overflow = false;
      stream._destroy = function(err, cb) {
        this._writableState.errorEmitted = false;
        cb(err);
      };
      return stream;
    }
    module.exports = split;
  }
});

// ../../node_modules/.pnpm/pino-abstract-transport@3.0.0/node_modules/pino-abstract-transport/index.js
var require_pino_abstract_transport = __commonJS({
  "../../node_modules/.pnpm/pino-abstract-transport@3.0.0/node_modules/pino-abstract-transport/index.js"(exports, module) {
    "use strict";
    var metadata = /* @__PURE__ */ Symbol.for("pino.metadata");
    var split = require_split2();
    var { Duplex } = __require("stream");
    var { parentPort, workerData } = __require("worker_threads");
    function createDeferred() {
      let resolve;
      let reject;
      const promise = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
      });
      promise.resolve = resolve;
      promise.reject = reject;
      return promise;
    }
    module.exports = function build(fn, opts = {}) {
      const waitForConfig = opts.expectPinoConfig === true && workerData?.workerData?.pinoWillSendConfig === true;
      const parseLines = opts.parse === "lines";
      const parseLine = typeof opts.parseLine === "function" ? opts.parseLine : JSON.parse;
      const close = opts.close || defaultClose;
      const stream = split(function(line) {
        let value;
        try {
          value = parseLine(line);
        } catch (error) {
          this.emit("unknown", line, error);
          return;
        }
        if (value === null) {
          this.emit("unknown", line, "Null value ignored");
          return;
        }
        if (typeof value !== "object") {
          value = {
            data: value,
            time: Date.now()
          };
        }
        if (stream[metadata]) {
          stream.lastTime = value.time;
          stream.lastLevel = value.level;
          stream.lastObj = value;
        }
        if (parseLines) {
          return line;
        }
        return value;
      }, { autoDestroy: true });
      stream._destroy = function(err, cb) {
        const promise = close(err, cb);
        if (promise && typeof promise.then === "function") {
          promise.then(cb, cb);
        }
      };
      if (opts.expectPinoConfig === true && workerData?.workerData?.pinoWillSendConfig !== true) {
        setImmediate(() => {
          stream.emit("error", new Error("This transport is not compatible with the current version of pino. Please upgrade pino to the latest version."));
        });
      }
      if (opts.metadata !== false) {
        stream[metadata] = true;
        stream.lastTime = 0;
        stream.lastLevel = 0;
        stream.lastObj = null;
      }
      if (waitForConfig) {
        let pinoConfig = {};
        const configReceived = createDeferred();
        parentPort.on("message", function handleMessage(message) {
          if (message.code === "PINO_CONFIG") {
            pinoConfig = message.config;
            configReceived.resolve();
            parentPort.off("message", handleMessage);
          }
        });
        Object.defineProperties(stream, {
          levels: {
            get() {
              return pinoConfig.levels;
            }
          },
          messageKey: {
            get() {
              return pinoConfig.messageKey;
            }
          },
          errorKey: {
            get() {
              return pinoConfig.errorKey;
            }
          }
        });
        return configReceived.then(finish);
      }
      return finish();
      function finish() {
        let res = fn(stream);
        if (res && typeof res.catch === "function") {
          res.catch((err) => {
            stream.destroy(err);
          });
          res = null;
        } else if (opts.enablePipelining && res) {
          return Duplex.from({ writable: stream, readable: res });
        }
        return stream;
      }
    };
    function defaultClose(err, cb) {
      process.nextTick(cb, err);
    }
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/constants.js
var require_constants = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/constants.js"(exports, module) {
    "use strict";
    module.exports = {
      DATE_FORMAT: "yyyy-mm-dd HH:MM:ss.l o",
      DATE_FORMAT_SIMPLE: "HH:MM:ss.l",
      /**
       * @type {K_ERROR_LIKE_KEYS}
       */
      ERROR_LIKE_KEYS: ["err", "error"],
      MESSAGE_KEY: "msg",
      LEVEL_KEY: "level",
      LEVEL_LABEL: "levelLabel",
      TIMESTAMP_KEY: "time",
      LEVELS: {
        default: "USERLVL",
        60: "FATAL",
        50: "ERROR",
        40: "WARN",
        30: "INFO",
        20: "DEBUG",
        10: "TRACE"
      },
      LEVEL_NAMES: {
        fatal: 60,
        error: 50,
        warn: 40,
        info: 30,
        debug: 20,
        trace: 10
      },
      // Object keys that probably came from a logger like Pino or Bunyan.
      LOGGER_KEYS: [
        "pid",
        "hostname",
        "name",
        "level",
        "time",
        "timestamp",
        "caller"
      ]
    };
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/get-level-label-data.js
var require_get_level_label_data = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/get-level-label-data.js"(exports, module) {
    "use strict";
    module.exports = getLevelLabelData;
    var { LEVELS, LEVEL_NAMES } = require_constants();
    function getLevelLabelData(useOnlyCustomProps, customLevels, customLevelNames) {
      const levels = useOnlyCustomProps ? customLevels || LEVELS : Object.assign({}, LEVELS, customLevels);
      const levelNames = useOnlyCustomProps ? customLevelNames || LEVEL_NAMES : Object.assign({}, LEVEL_NAMES, customLevelNames);
      return function(level) {
        let levelNum = "default";
        if (Number.isInteger(+level)) {
          levelNum = Object.prototype.hasOwnProperty.call(levels, level) ? level : levelNum;
        } else {
          levelNum = Object.prototype.hasOwnProperty.call(levelNames, level.toLowerCase()) ? levelNames[level.toLowerCase()] : levelNum;
        }
        return [levels[levelNum], levelNum];
      };
    }
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/colors.js
var require_colors = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/colors.js"(exports, module) {
    "use strict";
    var nocolor = (input) => input;
    var plain = {
      default: nocolor,
      60: nocolor,
      50: nocolor,
      40: nocolor,
      30: nocolor,
      20: nocolor,
      10: nocolor,
      message: nocolor,
      greyMessage: nocolor,
      property: nocolor
    };
    var { createColors } = require_colorette();
    var getLevelLabelData = require_get_level_label_data();
    var availableColors = createColors({ useColor: true });
    var { white, bgRed, red, yellow, green, blue, gray, cyan, magenta } = availableColors;
    var colored = {
      default: white,
      60: bgRed,
      50: red,
      40: yellow,
      30: green,
      20: blue,
      10: gray,
      message: cyan,
      greyMessage: gray,
      property: magenta
    };
    function resolveCustomColoredColorizer(customColors) {
      return customColors.reduce(
        function(agg, [level, color]) {
          agg[level] = typeof availableColors[color] === "function" ? availableColors[color] : white;
          return agg;
        },
        { default: white, message: cyan, greyMessage: gray, property: magenta }
      );
    }
    function colorizeLevel(useOnlyCustomProps) {
      return function(level, colorizer, { customLevels, customLevelNames } = {}) {
        const [levelStr, levelNum] = getLevelLabelData(useOnlyCustomProps, customLevels, customLevelNames)(level);
        return Object.prototype.hasOwnProperty.call(colorizer, levelNum) ? colorizer[levelNum](levelStr) : colorizer.default(levelStr);
      };
    }
    function plainColorizer(useOnlyCustomProps) {
      const newPlainColorizer = colorizeLevel(useOnlyCustomProps);
      const customColoredColorizer = function(level, opts) {
        return newPlainColorizer(level, plain, opts);
      };
      customColoredColorizer.message = plain.message;
      customColoredColorizer.greyMessage = plain.greyMessage;
      customColoredColorizer.property = plain.property;
      customColoredColorizer.colors = createColors({ useColor: false });
      return customColoredColorizer;
    }
    function coloredColorizer(useOnlyCustomProps) {
      const newColoredColorizer = colorizeLevel(useOnlyCustomProps);
      const customColoredColorizer = function(level, opts) {
        return newColoredColorizer(level, colored, opts);
      };
      customColoredColorizer.message = colored.message;
      customColoredColorizer.property = colored.property;
      customColoredColorizer.greyMessage = colored.greyMessage;
      customColoredColorizer.colors = availableColors;
      return customColoredColorizer;
    }
    function customColoredColorizerFactory(customColors, useOnlyCustomProps) {
      const onlyCustomColored = resolveCustomColoredColorizer(customColors);
      const customColored = useOnlyCustomProps ? onlyCustomColored : Object.assign({}, colored, onlyCustomColored);
      const colorizeLevelCustom = colorizeLevel(useOnlyCustomProps);
      const customColoredColorizer = function(level, opts) {
        return colorizeLevelCustom(level, customColored, opts);
      };
      customColoredColorizer.colors = availableColors;
      customColoredColorizer.message = customColoredColorizer.message || customColored.message;
      customColoredColorizer.property = customColoredColorizer.property || customColored.property;
      customColoredColorizer.greyMessage = customColoredColorizer.greyMessage || customColored.greyMessage;
      return customColoredColorizer;
    }
    module.exports = function getColorizer(useColors = false, customColors, useOnlyCustomProps) {
      if (useColors && customColors !== void 0) {
        return customColoredColorizerFactory(customColors, useOnlyCustomProps);
      } else if (useColors) {
        return coloredColorizer(useOnlyCustomProps);
      }
      return plainColorizer(useOnlyCustomProps);
    };
  }
});

// ../../node_modules/.pnpm/atomic-sleep@1.0.0/node_modules/atomic-sleep/index.js
var require_atomic_sleep = __commonJS({
  "../../node_modules/.pnpm/atomic-sleep@1.0.0/node_modules/atomic-sleep/index.js"(exports, module) {
    "use strict";
    if (typeof SharedArrayBuffer !== "undefined" && typeof Atomics !== "undefined") {
      let sleep = function(ms) {
        const valid = ms > 0 && ms < Infinity;
        if (valid === false) {
          if (typeof ms !== "number" && typeof ms !== "bigint") {
            throw TypeError("sleep: ms must be a number");
          }
          throw RangeError("sleep: ms must be a number that is greater than 0 but less than Infinity");
        }
        Atomics.wait(nil, 0, 0, Number(ms));
      };
      const nil = new Int32Array(new SharedArrayBuffer(4));
      module.exports = sleep;
    } else {
      let sleep = function(ms) {
        const valid = ms > 0 && ms < Infinity;
        if (valid === false) {
          if (typeof ms !== "number" && typeof ms !== "bigint") {
            throw TypeError("sleep: ms must be a number");
          }
          throw RangeError("sleep: ms must be a number that is greater than 0 but less than Infinity");
        }
        const target = Date.now() + Number(ms);
        while (target > Date.now()) {
        }
      };
      module.exports = sleep;
    }
  }
});

// ../../node_modules/.pnpm/sonic-boom@4.2.1/node_modules/sonic-boom/index.js
var require_sonic_boom = __commonJS({
  "../../node_modules/.pnpm/sonic-boom@4.2.1/node_modules/sonic-boom/index.js"(exports, module) {
    "use strict";
    var fs = __require("fs");
    var EventEmitter = __require("events");
    var inherits = __require("util").inherits;
    var path = __require("path");
    var sleep = require_atomic_sleep();
    var assert = __require("assert");
    var BUSY_WRITE_TIMEOUT = 100;
    var kEmptyBuffer = Buffer.allocUnsafe(0);
    var MAX_WRITE = 16 * 1024;
    var kContentModeBuffer = "buffer";
    var kContentModeUtf8 = "utf8";
    var [major, minor] = (process.versions.node || "0.0").split(".").map(Number);
    var kCopyBuffer = major >= 22 && minor >= 7;
    function openFile(file, sonic) {
      sonic._opening = true;
      sonic._writing = true;
      sonic._asyncDrainScheduled = false;
      function fileOpened(err, fd) {
        if (err) {
          sonic._reopening = false;
          sonic._writing = false;
          sonic._opening = false;
          if (sonic.sync) {
            process.nextTick(() => {
              if (sonic.listenerCount("error") > 0) {
                sonic.emit("error", err);
              }
            });
          } else {
            sonic.emit("error", err);
          }
          return;
        }
        const reopening = sonic._reopening;
        sonic.fd = fd;
        sonic.file = file;
        sonic._reopening = false;
        sonic._opening = false;
        sonic._writing = false;
        if (sonic.sync) {
          process.nextTick(() => sonic.emit("ready"));
        } else {
          sonic.emit("ready");
        }
        if (sonic.destroyed) {
          return;
        }
        if (!sonic._writing && sonic._len > sonic.minLength || sonic._flushPending) {
          sonic._actualWrite();
        } else if (reopening) {
          process.nextTick(() => sonic.emit("drain"));
        }
      }
      const flags = sonic.append ? "a" : "w";
      const mode = sonic.mode;
      if (sonic.sync) {
        try {
          if (sonic.mkdir) fs.mkdirSync(path.dirname(file), { recursive: true });
          const fd = fs.openSync(file, flags, mode);
          fileOpened(null, fd);
        } catch (err) {
          fileOpened(err);
          throw err;
        }
      } else if (sonic.mkdir) {
        fs.mkdir(path.dirname(file), { recursive: true }, (err) => {
          if (err) return fileOpened(err);
          fs.open(file, flags, mode, fileOpened);
        });
      } else {
        fs.open(file, flags, mode, fileOpened);
      }
    }
    function SonicBoom(opts) {
      if (!(this instanceof SonicBoom)) {
        return new SonicBoom(opts);
      }
      let { fd, dest, minLength, maxLength, maxWrite, periodicFlush, sync, append = true, mkdir, retryEAGAIN, fsync, contentMode, mode } = opts || {};
      fd = fd || dest;
      this._len = 0;
      this.fd = -1;
      this._bufs = [];
      this._lens = [];
      this._writing = false;
      this._ending = false;
      this._reopening = false;
      this._asyncDrainScheduled = false;
      this._flushPending = false;
      this._hwm = Math.max(minLength || 0, 16387);
      this.file = null;
      this.destroyed = false;
      this.minLength = minLength || 0;
      this.maxLength = maxLength || 0;
      this.maxWrite = maxWrite || MAX_WRITE;
      this._periodicFlush = periodicFlush || 0;
      this._periodicFlushTimer = void 0;
      this.sync = sync || false;
      this.writable = true;
      this._fsync = fsync || false;
      this.append = append || false;
      this.mode = mode;
      this.retryEAGAIN = retryEAGAIN || (() => true);
      this.mkdir = mkdir || false;
      let fsWriteSync;
      let fsWrite;
      if (contentMode === kContentModeBuffer) {
        this._writingBuf = kEmptyBuffer;
        this.write = writeBuffer;
        this.flush = flushBuffer;
        this.flushSync = flushBufferSync;
        this._actualWrite = actualWriteBuffer;
        fsWriteSync = () => fs.writeSync(this.fd, this._writingBuf);
        fsWrite = () => fs.write(this.fd, this._writingBuf, this.release);
      } else if (contentMode === void 0 || contentMode === kContentModeUtf8) {
        this._writingBuf = "";
        this.write = write;
        this.flush = flush;
        this.flushSync = flushSync;
        this._actualWrite = actualWrite;
        fsWriteSync = () => {
          if (Buffer.isBuffer(this._writingBuf)) {
            return fs.writeSync(this.fd, this._writingBuf);
          }
          return fs.writeSync(this.fd, this._writingBuf, "utf8");
        };
        fsWrite = () => {
          if (Buffer.isBuffer(this._writingBuf)) {
            return fs.write(this.fd, this._writingBuf, this.release);
          }
          return fs.write(this.fd, this._writingBuf, "utf8", this.release);
        };
      } else {
        throw new Error(`SonicBoom supports "${kContentModeUtf8}" and "${kContentModeBuffer}", but passed ${contentMode}`);
      }
      if (typeof fd === "number") {
        this.fd = fd;
        process.nextTick(() => this.emit("ready"));
      } else if (typeof fd === "string") {
        openFile(fd, this);
      } else {
        throw new Error("SonicBoom supports only file descriptors and files");
      }
      if (this.minLength >= this.maxWrite) {
        throw new Error(`minLength should be smaller than maxWrite (${this.maxWrite})`);
      }
      this.release = (err, n) => {
        if (err) {
          if ((err.code === "EAGAIN" || err.code === "EBUSY") && this.retryEAGAIN(err, this._writingBuf.length, this._len - this._writingBuf.length)) {
            if (this.sync) {
              try {
                sleep(BUSY_WRITE_TIMEOUT);
                this.release(void 0, 0);
              } catch (err2) {
                this.release(err2);
              }
            } else {
              setTimeout(fsWrite, BUSY_WRITE_TIMEOUT);
            }
          } else {
            this._writing = false;
            this.emit("error", err);
          }
          return;
        }
        this.emit("write", n);
        const releasedBufObj = releaseWritingBuf(this._writingBuf, this._len, n);
        this._len = releasedBufObj.len;
        this._writingBuf = releasedBufObj.writingBuf;
        if (this._writingBuf.length) {
          if (!this.sync) {
            fsWrite();
            return;
          }
          try {
            do {
              const n2 = fsWriteSync();
              const releasedBufObj2 = releaseWritingBuf(this._writingBuf, this._len, n2);
              this._len = releasedBufObj2.len;
              this._writingBuf = releasedBufObj2.writingBuf;
            } while (this._writingBuf.length);
          } catch (err2) {
            this.release(err2);
            return;
          }
        }
        if (this._fsync) {
          fs.fsyncSync(this.fd);
        }
        const len = this._len;
        if (this._reopening) {
          this._writing = false;
          this._reopening = false;
          this.reopen();
        } else if (len > this.minLength) {
          this._actualWrite();
        } else if (this._ending) {
          if (len > 0) {
            this._actualWrite();
          } else {
            this._writing = false;
            actualClose(this);
          }
        } else {
          this._writing = false;
          if (this.sync) {
            if (!this._asyncDrainScheduled) {
              this._asyncDrainScheduled = true;
              process.nextTick(emitDrain, this);
            }
          } else {
            this.emit("drain");
          }
        }
      };
      this.on("newListener", function(name) {
        if (name === "drain") {
          this._asyncDrainScheduled = false;
        }
      });
      if (this._periodicFlush !== 0) {
        this._periodicFlushTimer = setInterval(() => this.flush(null), this._periodicFlush);
        this._periodicFlushTimer.unref();
      }
    }
    function releaseWritingBuf(writingBuf, len, n) {
      if (typeof writingBuf === "string") {
        writingBuf = Buffer.from(writingBuf);
      }
      len = Math.max(len - n, 0);
      writingBuf = writingBuf.subarray(n);
      return { writingBuf, len };
    }
    function emitDrain(sonic) {
      const hasListeners = sonic.listenerCount("drain") > 0;
      if (!hasListeners) return;
      sonic._asyncDrainScheduled = false;
      sonic.emit("drain");
    }
    inherits(SonicBoom, EventEmitter);
    function mergeBuf(bufs, len) {
      if (bufs.length === 0) {
        return kEmptyBuffer;
      }
      if (bufs.length === 1) {
        return bufs[0];
      }
      return Buffer.concat(bufs, len);
    }
    function write(data) {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      data = "" + data;
      const dataLen = Buffer.byteLength(data);
      const len = this._len + dataLen;
      const bufs = this._bufs;
      if (this.maxLength && len > this.maxLength) {
        this.emit("drop", data);
        return this._len < this._hwm;
      }
      if (bufs.length === 0 || Buffer.byteLength(bufs[bufs.length - 1]) + dataLen > this.maxWrite) {
        bufs.push(data);
      } else {
        bufs[bufs.length - 1] += data;
      }
      this._len = len;
      if (!this._writing && this._len >= this.minLength) {
        this._actualWrite();
      }
      return this._len < this._hwm;
    }
    function writeBuffer(data) {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      const len = this._len + data.length;
      const bufs = this._bufs;
      const lens = this._lens;
      if (this.maxLength && len > this.maxLength) {
        this.emit("drop", data);
        return this._len < this._hwm;
      }
      if (bufs.length === 0 || lens[lens.length - 1] + data.length > this.maxWrite) {
        bufs.push([data]);
        lens.push(data.length);
      } else {
        bufs[bufs.length - 1].push(data);
        lens[lens.length - 1] += data.length;
      }
      this._len = len;
      if (!this._writing && this._len >= this.minLength) {
        this._actualWrite();
      }
      return this._len < this._hwm;
    }
    function callFlushCallbackOnDrain(cb) {
      this._flushPending = true;
      const onDrain = () => {
        if (!this._fsync) {
          try {
            fs.fsync(this.fd, (err) => {
              this._flushPending = false;
              cb(err);
            });
          } catch (err) {
            cb(err);
          }
        } else {
          this._flushPending = false;
          cb();
        }
        this.off("error", onError);
      };
      const onError = (err) => {
        this._flushPending = false;
        cb(err);
        this.off("drain", onDrain);
      };
      this.once("drain", onDrain);
      this.once("error", onError);
    }
    function flush(cb) {
      if (cb != null && typeof cb !== "function") {
        throw new Error("flush cb must be a function");
      }
      if (this.destroyed) {
        const error = new Error("SonicBoom destroyed");
        if (cb) {
          cb(error);
          return;
        }
        throw error;
      }
      if (this.minLength <= 0) {
        cb?.();
        return;
      }
      if (cb) {
        callFlushCallbackOnDrain.call(this, cb);
      }
      if (this._writing) {
        return;
      }
      if (this._bufs.length === 0) {
        this._bufs.push("");
      }
      this._actualWrite();
    }
    function flushBuffer(cb) {
      if (cb != null && typeof cb !== "function") {
        throw new Error("flush cb must be a function");
      }
      if (this.destroyed) {
        const error = new Error("SonicBoom destroyed");
        if (cb) {
          cb(error);
          return;
        }
        throw error;
      }
      if (this.minLength <= 0) {
        cb?.();
        return;
      }
      if (cb) {
        callFlushCallbackOnDrain.call(this, cb);
      }
      if (this._writing) {
        return;
      }
      if (this._bufs.length === 0) {
        this._bufs.push([]);
        this._lens.push(0);
      }
      this._actualWrite();
    }
    SonicBoom.prototype.reopen = function(file) {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      if (this._opening) {
        this.once("ready", () => {
          this.reopen(file);
        });
        return;
      }
      if (this._ending) {
        return;
      }
      if (!this.file) {
        throw new Error("Unable to reopen a file descriptor, you must pass a file to SonicBoom");
      }
      if (file) {
        this.file = file;
      }
      this._reopening = true;
      if (this._writing) {
        return;
      }
      const fd = this.fd;
      this.once("ready", () => {
        if (fd !== this.fd) {
          fs.close(fd, (err) => {
            if (err) {
              return this.emit("error", err);
            }
          });
        }
      });
      openFile(this.file, this);
    };
    SonicBoom.prototype.end = function() {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      if (this._opening) {
        this.once("ready", () => {
          this.end();
        });
        return;
      }
      if (this._ending) {
        return;
      }
      this._ending = true;
      if (this._writing) {
        return;
      }
      if (this._len > 0 && this.fd >= 0) {
        this._actualWrite();
      } else {
        actualClose(this);
      }
    };
    function flushSync() {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      if (this.fd < 0) {
        throw new Error("sonic boom is not ready yet");
      }
      if (!this._writing && this._writingBuf.length > 0) {
        this._bufs.unshift(this._writingBuf);
        this._writingBuf = "";
      }
      let buf = "";
      while (this._bufs.length || buf.length) {
        if (buf.length <= 0) {
          buf = this._bufs[0];
        }
        try {
          const n = Buffer.isBuffer(buf) ? fs.writeSync(this.fd, buf) : fs.writeSync(this.fd, buf, "utf8");
          const releasedBufObj = releaseWritingBuf(buf, this._len, n);
          buf = releasedBufObj.writingBuf;
          this._len = releasedBufObj.len;
          if (buf.length <= 0) {
            this._bufs.shift();
          }
        } catch (err) {
          const shouldRetry = err.code === "EAGAIN" || err.code === "EBUSY";
          if (shouldRetry && !this.retryEAGAIN(err, buf.length, this._len - buf.length)) {
            throw err;
          }
          sleep(BUSY_WRITE_TIMEOUT);
        }
      }
      try {
        fs.fsyncSync(this.fd);
      } catch {
      }
    }
    function flushBufferSync() {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      if (this.fd < 0) {
        throw new Error("sonic boom is not ready yet");
      }
      if (!this._writing && this._writingBuf.length > 0) {
        this._bufs.unshift([this._writingBuf]);
        this._writingBuf = kEmptyBuffer;
      }
      let buf = kEmptyBuffer;
      while (this._bufs.length || buf.length) {
        if (buf.length <= 0) {
          buf = mergeBuf(this._bufs[0], this._lens[0]);
        }
        try {
          const n = fs.writeSync(this.fd, buf);
          buf = buf.subarray(n);
          this._len = Math.max(this._len - n, 0);
          if (buf.length <= 0) {
            this._bufs.shift();
            this._lens.shift();
          }
        } catch (err) {
          const shouldRetry = err.code === "EAGAIN" || err.code === "EBUSY";
          if (shouldRetry && !this.retryEAGAIN(err, buf.length, this._len - buf.length)) {
            throw err;
          }
          sleep(BUSY_WRITE_TIMEOUT);
        }
      }
    }
    SonicBoom.prototype.destroy = function() {
      if (this.destroyed) {
        return;
      }
      actualClose(this);
    };
    function actualWrite() {
      const release = this.release;
      this._writing = true;
      this._writingBuf = this._writingBuf.length ? this._writingBuf : this._bufs.shift() || "";
      if (this.sync) {
        try {
          const written = Buffer.isBuffer(this._writingBuf) ? fs.writeSync(this.fd, this._writingBuf) : fs.writeSync(this.fd, this._writingBuf, "utf8");
          release(null, written);
        } catch (err) {
          release(err);
        }
      } else {
        fs.write(this.fd, this._writingBuf, release);
      }
    }
    function actualWriteBuffer() {
      const release = this.release;
      this._writing = true;
      this._writingBuf = this._writingBuf.length ? this._writingBuf : mergeBuf(this._bufs.shift(), this._lens.shift());
      if (this.sync) {
        try {
          const written = fs.writeSync(this.fd, this._writingBuf);
          release(null, written);
        } catch (err) {
          release(err);
        }
      } else {
        if (kCopyBuffer) {
          this._writingBuf = Buffer.from(this._writingBuf);
        }
        fs.write(this.fd, this._writingBuf, release);
      }
    }
    function actualClose(sonic) {
      if (sonic.fd === -1) {
        sonic.once("ready", actualClose.bind(null, sonic));
        return;
      }
      if (sonic._periodicFlushTimer !== void 0) {
        clearInterval(sonic._periodicFlushTimer);
      }
      sonic.destroyed = true;
      sonic._bufs = [];
      sonic._lens = [];
      assert(typeof sonic.fd === "number", `sonic.fd must be a number, got ${typeof sonic.fd}`);
      try {
        fs.fsync(sonic.fd, closeWrapped);
      } catch {
      }
      function closeWrapped() {
        if (sonic.fd !== 1 && sonic.fd !== 2) {
          fs.close(sonic.fd, done);
        } else {
          done();
        }
      }
      function done(err) {
        if (err) {
          sonic.emit("error", err);
          return;
        }
        if (sonic._ending && !sonic._writing) {
          sonic.emit("finish");
        }
        sonic.emit("close");
      }
    }
    SonicBoom.SonicBoom = SonicBoom;
    SonicBoom.default = SonicBoom;
    module.exports = SonicBoom;
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/noop.js
var require_noop = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/noop.js"(exports, module) {
    "use strict";
    module.exports = function noop() {
    };
  }
});

// ../../node_modules/.pnpm/on-exit-leak-free@2.1.2/node_modules/on-exit-leak-free/index.js
var require_on_exit_leak_free = __commonJS({
  "../../node_modules/.pnpm/on-exit-leak-free@2.1.2/node_modules/on-exit-leak-free/index.js"(exports, module) {
    "use strict";
    var refs = {
      exit: [],
      beforeExit: []
    };
    var functions = {
      exit: onExit,
      beforeExit: onBeforeExit
    };
    var registry;
    function ensureRegistry() {
      if (registry === void 0) {
        registry = new FinalizationRegistry(clear);
      }
    }
    function install(event) {
      if (refs[event].length > 0) {
        return;
      }
      process.on(event, functions[event]);
    }
    function uninstall(event) {
      if (refs[event].length > 0) {
        return;
      }
      process.removeListener(event, functions[event]);
      if (refs.exit.length === 0 && refs.beforeExit.length === 0) {
        registry = void 0;
      }
    }
    function onExit() {
      callRefs("exit");
    }
    function onBeforeExit() {
      callRefs("beforeExit");
    }
    function callRefs(event) {
      for (const ref of refs[event]) {
        const obj = ref.deref();
        const fn = ref.fn;
        if (obj !== void 0) {
          fn(obj, event);
        }
      }
      refs[event] = [];
    }
    function clear(ref) {
      for (const event of ["exit", "beforeExit"]) {
        const index = refs[event].indexOf(ref);
        refs[event].splice(index, index + 1);
        uninstall(event);
      }
    }
    function _register(event, obj, fn) {
      if (obj === void 0) {
        throw new Error("the object can't be undefined");
      }
      install(event);
      const ref = new WeakRef(obj);
      ref.fn = fn;
      ensureRegistry();
      registry.register(obj, ref);
      refs[event].push(ref);
    }
    function register(obj, fn) {
      _register("exit", obj, fn);
    }
    function registerBeforeExit(obj, fn) {
      _register("beforeExit", obj, fn);
    }
    function unregister(obj) {
      if (registry === void 0) {
        return;
      }
      registry.unregister(obj);
      for (const event of ["exit", "beforeExit"]) {
        refs[event] = refs[event].filter((ref) => {
          const _obj = ref.deref();
          return _obj && _obj !== obj;
        });
        uninstall(event);
      }
    }
    module.exports = {
      register,
      registerBeforeExit,
      unregister
    };
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/build-safe-sonic-boom.js
var require_build_safe_sonic_boom = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/build-safe-sonic-boom.js"(exports, module) {
    "use strict";
    module.exports = buildSafeSonicBoom;
    var { isMainThread } = __require("node:worker_threads");
    var SonicBoom = require_sonic_boom();
    var noop = require_noop();
    function buildSafeSonicBoom(opts) {
      const stream = new SonicBoom(opts);
      stream.on("error", filterBrokenPipe);
      if (!opts.sync && isMainThread) {
        setupOnExit(stream);
      }
      return stream;
      function filterBrokenPipe(err) {
        if (err.code === "EPIPE") {
          stream.write = noop;
          stream.end = noop;
          stream.flushSync = noop;
          stream.destroy = noop;
          return;
        }
        stream.removeListener("error", filterBrokenPipe);
      }
    }
    function setupOnExit(stream) {
      if (global.WeakRef && global.WeakMap && global.FinalizationRegistry) {
        const onExit = require_on_exit_leak_free();
        onExit.register(stream, autoEnd);
        stream.on("close", function() {
          onExit.unregister(stream);
        });
      }
    }
    function autoEnd(stream, eventName) {
      if (stream.destroyed) {
        return;
      }
      if (eventName === "beforeExit") {
        stream.flush();
        stream.on("drain", function() {
          stream.end();
        });
      } else {
        stream.flushSync();
      }
    }
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/is-valid-date.js
var require_is_valid_date = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/is-valid-date.js"(exports, module) {
    "use strict";
    module.exports = isValidDate;
    function isValidDate(date) {
      return date instanceof Date && !Number.isNaN(date.getTime());
    }
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/create-date.js
var require_create_date = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/create-date.js"(exports, module) {
    "use strict";
    module.exports = createDate;
    var isValidDate = require_is_valid_date();
    function createDate(epoch) {
      let date = new Date(epoch);
      if (isValidDate(date)) {
        return date;
      }
      date = /* @__PURE__ */ new Date(+epoch);
      return date;
    }
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/split-property-key.js
var require_split_property_key = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/split-property-key.js"(exports, module) {
    "use strict";
    module.exports = splitPropertyKey;
    function splitPropertyKey(key) {
      const result = [];
      let backslash = false;
      let segment = "";
      for (let i = 0; i < key.length; i++) {
        const c = key.charAt(i);
        if (c === "\\") {
          backslash = true;
          continue;
        }
        if (backslash) {
          backslash = false;
          segment += c;
          continue;
        }
        if (c === ".") {
          result.push(segment);
          segment = "";
          continue;
        }
        segment += c;
      }
      if (segment.length) {
        result.push(segment);
      }
      return result;
    }
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/get-property-value.js
var require_get_property_value = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/get-property-value.js"(exports, module) {
    "use strict";
    module.exports = getPropertyValue;
    var splitPropertyKey = require_split_property_key();
    function getPropertyValue(obj, property) {
      const props = Array.isArray(property) ? property : splitPropertyKey(property);
      for (const prop of props) {
        if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
          return;
        }
        obj = obj[prop];
      }
      return obj;
    }
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/delete-log-property.js
var require_delete_log_property = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/delete-log-property.js"(exports, module) {
    "use strict";
    module.exports = deleteLogProperty;
    var getPropertyValue = require_get_property_value();
    var splitPropertyKey = require_split_property_key();
    function deleteLogProperty(log, property) {
      const props = splitPropertyKey(property);
      const propToDelete = props.pop();
      log = getPropertyValue(log, props);
      if (log !== null && typeof log === "object" && Object.prototype.hasOwnProperty.call(log, propToDelete)) {
        delete log[propToDelete];
      }
    }
  }
});

// ../../node_modules/.pnpm/fast-copy@4.0.3/node_modules/fast-copy/dist/cjs/index.cjs
var require_cjs = __commonJS({
  "../../node_modules/.pnpm/fast-copy@4.0.3/node_modules/fast-copy/dist/cjs/index.cjs"(exports) {
    "use strict";
    var toStringFunction = Function.prototype.toString;
    var toStringObject = Object.prototype.toString;
    function getCleanClone(prototype) {
      if (!prototype) {
        return /* @__PURE__ */ Object.create(null);
      }
      const Constructor = prototype.constructor;
      if (Constructor === Object) {
        return prototype === Object.prototype ? {} : Object.create(prototype);
      }
      if (Constructor && ~toStringFunction.call(Constructor).indexOf("[native code]")) {
        try {
          return new Constructor();
        } catch (_a) {
        }
      }
      return Object.create(prototype);
    }
    function getTag(value) {
      const stringTag = value[Symbol.toStringTag];
      if (stringTag) {
        return stringTag;
      }
      const type = toStringObject.call(value);
      return type.substring(8, type.length - 1);
    }
    var { hasOwnProperty, propertyIsEnumerable } = Object.prototype;
    function copyOwnDescriptor(original, clone, property, state) {
      const ownDescriptor = Object.getOwnPropertyDescriptor(original, property) || {
        configurable: true,
        enumerable: true,
        value: original[property],
        writable: true
      };
      const descriptor = ownDescriptor.get || ownDescriptor.set ? ownDescriptor : {
        configurable: ownDescriptor.configurable,
        enumerable: ownDescriptor.enumerable,
        value: state.copier(ownDescriptor.value, state),
        writable: ownDescriptor.writable
      };
      try {
        Object.defineProperty(clone, property, descriptor);
      } catch (_a) {
        clone[property] = descriptor.get ? descriptor.get() : descriptor.value;
      }
    }
    function copyOwnPropertiesStrict(value, clone, state) {
      const names = Object.getOwnPropertyNames(value);
      for (let index = 0; index < names.length; ++index) {
        copyOwnDescriptor(value, clone, names[index], state);
      }
      const symbols = Object.getOwnPropertySymbols(value);
      for (let index = 0; index < symbols.length; ++index) {
        copyOwnDescriptor(value, clone, symbols[index], state);
      }
      return clone;
    }
    function copyArrayLoose(array, state) {
      const clone = new state.Constructor();
      state.cache.set(array, clone);
      for (let index = 0; index < array.length; ++index) {
        clone[index] = state.copier(array[index], state);
      }
      return clone;
    }
    function copyArrayStrict(array, state) {
      const clone = new state.Constructor();
      state.cache.set(array, clone);
      return copyOwnPropertiesStrict(array, clone, state);
    }
    function copyArrayBuffer(arrayBuffer, _state) {
      return arrayBuffer.slice(0);
    }
    function copyBlob(blob, _state) {
      return blob.slice(0, blob.size, blob.type);
    }
    function copyDataView(dataView, state) {
      return new state.Constructor(copyArrayBuffer(dataView.buffer));
    }
    function copyDate(date, state) {
      return new state.Constructor(date.getTime());
    }
    function copyMapLoose(map, state) {
      const clone = new state.Constructor();
      state.cache.set(map, clone);
      map.forEach((value, key) => {
        clone.set(key, state.copier(value, state));
      });
      return clone;
    }
    function copyMapStrict(map, state) {
      return copyOwnPropertiesStrict(map, copyMapLoose(map, state), state);
    }
    function copyObjectLoose(object, state) {
      const clone = getCleanClone(state.prototype);
      state.cache.set(object, clone);
      for (const key in object) {
        if (hasOwnProperty.call(object, key)) {
          clone[key] = state.copier(object[key], state);
        }
      }
      const symbols = Object.getOwnPropertySymbols(object);
      for (let index = 0; index < symbols.length; ++index) {
        const symbol = symbols[index];
        if (propertyIsEnumerable.call(object, symbol)) {
          clone[symbol] = state.copier(object[symbol], state);
        }
      }
      return clone;
    }
    function copyObjectStrict(object, state) {
      const clone = getCleanClone(state.prototype);
      state.cache.set(object, clone);
      return copyOwnPropertiesStrict(object, clone, state);
    }
    function copyPrimitiveWrapper(primitiveObject, state) {
      return new state.Constructor(primitiveObject.valueOf());
    }
    function copyRegExp(regExp, state) {
      const clone = new state.Constructor(regExp.source, regExp.flags);
      clone.lastIndex = regExp.lastIndex;
      return clone;
    }
    function copySelf(value, _state) {
      return value;
    }
    function copySetLoose(set, state) {
      const clone = new state.Constructor();
      state.cache.set(set, clone);
      set.forEach((value) => {
        clone.add(state.copier(value, state));
      });
      return clone;
    }
    function copySetStrict(set, state) {
      return copyOwnPropertiesStrict(set, copySetLoose(set, state), state);
    }
    function createDefaultCache() {
      return /* @__PURE__ */ new WeakMap();
    }
    function getOptions({ createCache: createCacheOverride, methods: methodsOverride, strict }) {
      const defaultMethods = {
        array: strict ? copyArrayStrict : copyArrayLoose,
        arrayBuffer: copyArrayBuffer,
        asyncGenerator: copySelf,
        blob: copyBlob,
        dataView: copyDataView,
        date: copyDate,
        error: copySelf,
        generator: copySelf,
        map: strict ? copyMapStrict : copyMapLoose,
        object: strict ? copyObjectStrict : copyObjectLoose,
        regExp: copyRegExp,
        set: strict ? copySetStrict : copySetLoose
      };
      const methods = methodsOverride ? Object.assign(defaultMethods, methodsOverride) : defaultMethods;
      const copiers = getTagSpecificCopiers(methods);
      const createCache = createCacheOverride || createDefaultCache;
      if (!copiers.Object || !copiers.Array) {
        throw new Error("An object and array copier must be provided.");
      }
      return { createCache, copiers, methods, strict: Boolean(strict) };
    }
    function getTagSpecificCopiers(methods) {
      return {
        Arguments: methods.object,
        Array: methods.array,
        ArrayBuffer: methods.arrayBuffer,
        AsyncGenerator: methods.asyncGenerator,
        BigInt64Array: methods.arrayBuffer,
        BigUint64Array: methods.arrayBuffer,
        Blob: methods.blob,
        Boolean: copyPrimitiveWrapper,
        DataView: methods.dataView,
        Date: methods.date,
        Error: methods.error,
        Float32Array: methods.arrayBuffer,
        Float64Array: methods.arrayBuffer,
        Generator: methods.generator,
        Int8Array: methods.arrayBuffer,
        Int16Array: methods.arrayBuffer,
        Int32Array: methods.arrayBuffer,
        Map: methods.map,
        Number: copyPrimitiveWrapper,
        Object: methods.object,
        Promise: copySelf,
        RegExp: methods.regExp,
        Set: methods.set,
        String: copyPrimitiveWrapper,
        WeakMap: copySelf,
        WeakSet: copySelf,
        Uint8Array: methods.arrayBuffer,
        Uint8ClampedArray: methods.arrayBuffer,
        Uint16Array: methods.arrayBuffer,
        Uint32Array: methods.arrayBuffer
      };
    }
    function createCopier(options = {}) {
      const { createCache, copiers } = getOptions(options);
      const { Array: copyArray, Object: copyObject } = copiers;
      function copier(value, state) {
        state.prototype = state.Constructor = void 0;
        if (!value || typeof value !== "object") {
          return value;
        }
        if (state.cache.has(value)) {
          return state.cache.get(value);
        }
        state.prototype = Object.getPrototypeOf(value);
        state.Constructor = state.prototype && state.prototype.constructor;
        if (!state.Constructor || state.Constructor === Object) {
          return copyObject(value, state);
        }
        if (Array.isArray(value)) {
          return copyArray(value, state);
        }
        const tagSpecificCopier = copiers[getTag(value)];
        if (tagSpecificCopier) {
          return tagSpecificCopier(value, state);
        }
        return typeof value.then === "function" ? value : copyObject(value, state);
      }
      return function copy2(value) {
        return copier(value, {
          Constructor: void 0,
          cache: createCache(),
          copier,
          prototype: void 0
        });
      };
    }
    var copyStrict = createCopier({ strict: true });
    var copy = createCopier();
    exports.copy = copy;
    exports.copyStrict = copyStrict;
    exports.createCopier = createCopier;
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/filter-log.js
var require_filter_log = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/filter-log.js"(exports, module) {
    "use strict";
    module.exports = filterLog;
    var { createCopier } = require_cjs();
    var fastCopy = createCopier({});
    var deleteLogProperty = require_delete_log_property();
    function filterLog({ log, context }) {
      const { ignoreKeys, includeKeys } = context;
      const logCopy = fastCopy(log);
      if (includeKeys) {
        const logIncluded = {};
        includeKeys.forEach((key) => {
          logIncluded[key] = logCopy[key];
        });
        return logIncluded;
      }
      ignoreKeys.forEach((ignoreKey) => {
        deleteLogProperty(logCopy, ignoreKey);
      });
      return logCopy;
    }
  }
});

// ../../node_modules/.pnpm/dateformat@4.6.3/node_modules/dateformat/lib/dateformat.js
var require_dateformat = __commonJS({
  "../../node_modules/.pnpm/dateformat@4.6.3/node_modules/dateformat/lib/dateformat.js"(exports, module) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    (function(global2) {
      var _arguments = arguments;
      var dateFormat = /* @__PURE__ */ (function() {
        var token = /d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|W{1,2}|[LlopSZN]|"[^"]*"|'[^']*'/g;
        var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
        var timezoneClip = /[^-+\dA-Z]/g;
        return function(date, mask, utc, gmt) {
          if (_arguments.length === 1 && kindOf(date) === "string" && !/\d/.test(date)) {
            mask = date;
            date = void 0;
          }
          date = date || date === 0 ? date : /* @__PURE__ */ new Date();
          if (!(date instanceof Date)) {
            date = new Date(date);
          }
          if (isNaN(date)) {
            throw TypeError("Invalid date");
          }
          mask = String(dateFormat.masks[mask] || mask || dateFormat.masks["default"]);
          var maskSlice = mask.slice(0, 4);
          if (maskSlice === "UTC:" || maskSlice === "GMT:") {
            mask = mask.slice(4);
            utc = true;
            if (maskSlice === "GMT:") {
              gmt = true;
            }
          }
          var _ = function _2() {
            return utc ? "getUTC" : "get";
          };
          var _d = function d() {
            return date[_() + "Date"]();
          };
          var D = function D2() {
            return date[_() + "Day"]();
          };
          var _m = function m() {
            return date[_() + "Month"]();
          };
          var y = function y2() {
            return date[_() + "FullYear"]();
          };
          var _H = function H() {
            return date[_() + "Hours"]();
          };
          var _M = function M() {
            return date[_() + "Minutes"]();
          };
          var _s = function s() {
            return date[_() + "Seconds"]();
          };
          var _L = function L() {
            return date[_() + "Milliseconds"]();
          };
          var _o = function o() {
            return utc ? 0 : date.getTimezoneOffset();
          };
          var _W = function W() {
            return getWeek(date);
          };
          var _N = function N() {
            return getDayOfWeek(date);
          };
          var flags = { d: function d() {
            return _d();
          }, dd: function dd() {
            return pad(_d());
          }, ddd: function ddd() {
            return dateFormat.i18n.dayNames[D()];
          }, DDD: function DDD() {
            return getDayName({ y: y(), m: _m(), d: _d(), _: _(), dayName: dateFormat.i18n.dayNames[D()], short: true });
          }, dddd: function dddd() {
            return dateFormat.i18n.dayNames[D() + 7];
          }, DDDD: function DDDD() {
            return getDayName({ y: y(), m: _m(), d: _d(), _: _(), dayName: dateFormat.i18n.dayNames[D() + 7] });
          }, m: function m() {
            return _m() + 1;
          }, mm: function mm() {
            return pad(_m() + 1);
          }, mmm: function mmm() {
            return dateFormat.i18n.monthNames[_m()];
          }, mmmm: function mmmm() {
            return dateFormat.i18n.monthNames[_m() + 12];
          }, yy: function yy() {
            return String(y()).slice(2);
          }, yyyy: function yyyy() {
            return pad(y(), 4);
          }, h: function h() {
            return _H() % 12 || 12;
          }, hh: function hh() {
            return pad(_H() % 12 || 12);
          }, H: function H() {
            return _H();
          }, HH: function HH() {
            return pad(_H());
          }, M: function M() {
            return _M();
          }, MM: function MM() {
            return pad(_M());
          }, s: function s() {
            return _s();
          }, ss: function ss() {
            return pad(_s());
          }, l: function l() {
            return pad(_L(), 3);
          }, L: function L() {
            return pad(Math.floor(_L() / 10));
          }, t: function t() {
            return _H() < 12 ? dateFormat.i18n.timeNames[0] : dateFormat.i18n.timeNames[1];
          }, tt: function tt() {
            return _H() < 12 ? dateFormat.i18n.timeNames[2] : dateFormat.i18n.timeNames[3];
          }, T: function T() {
            return _H() < 12 ? dateFormat.i18n.timeNames[4] : dateFormat.i18n.timeNames[5];
          }, TT: function TT() {
            return _H() < 12 ? dateFormat.i18n.timeNames[6] : dateFormat.i18n.timeNames[7];
          }, Z: function Z() {
            return gmt ? "GMT" : utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, "").replace(/GMT\+0000/g, "UTC");
          }, o: function o() {
            return (_o() > 0 ? "-" : "+") + pad(Math.floor(Math.abs(_o()) / 60) * 100 + Math.abs(_o()) % 60, 4);
          }, p: function p() {
            return (_o() > 0 ? "-" : "+") + pad(Math.floor(Math.abs(_o()) / 60), 2) + ":" + pad(Math.floor(Math.abs(_o()) % 60), 2);
          }, S: function S() {
            return ["th", "st", "nd", "rd"][_d() % 10 > 3 ? 0 : (_d() % 100 - _d() % 10 != 10) * _d() % 10];
          }, W: function W() {
            return _W();
          }, WW: function WW() {
            return pad(_W());
          }, N: function N() {
            return _N();
          } };
          return mask.replace(token, function(match) {
            if (match in flags) {
              return flags[match]();
            }
            return match.slice(1, match.length - 1);
          });
        };
      })();
      dateFormat.masks = { default: "ddd mmm dd yyyy HH:MM:ss", shortDate: "m/d/yy", paddedShortDate: "mm/dd/yyyy", mediumDate: "mmm d, yyyy", longDate: "mmmm d, yyyy", fullDate: "dddd, mmmm d, yyyy", shortTime: "h:MM TT", mediumTime: "h:MM:ss TT", longTime: "h:MM:ss TT Z", isoDate: "yyyy-mm-dd", isoTime: "HH:MM:ss", isoDateTime: "yyyy-mm-dd'T'HH:MM:sso", isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'", expiresHeaderFormat: "ddd, dd mmm yyyy HH:MM:ss Z" };
      dateFormat.i18n = { dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"] };
      var pad = function pad2(val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) {
          val = "0" + val;
        }
        return val;
      };
      var getDayName = function getDayName2(_ref) {
        var y = _ref.y, m = _ref.m, d = _ref.d, _ = _ref._, dayName = _ref.dayName, _ref$short = _ref["short"], _short = _ref$short === void 0 ? false : _ref$short;
        var today = /* @__PURE__ */ new Date();
        var yesterday = /* @__PURE__ */ new Date();
        yesterday.setDate(yesterday[_ + "Date"]() - 1);
        var tomorrow = /* @__PURE__ */ new Date();
        tomorrow.setDate(tomorrow[_ + "Date"]() + 1);
        var today_d = function today_d2() {
          return today[_ + "Date"]();
        };
        var today_m = function today_m2() {
          return today[_ + "Month"]();
        };
        var today_y = function today_y2() {
          return today[_ + "FullYear"]();
        };
        var yesterday_d = function yesterday_d2() {
          return yesterday[_ + "Date"]();
        };
        var yesterday_m = function yesterday_m2() {
          return yesterday[_ + "Month"]();
        };
        var yesterday_y = function yesterday_y2() {
          return yesterday[_ + "FullYear"]();
        };
        var tomorrow_d = function tomorrow_d2() {
          return tomorrow[_ + "Date"]();
        };
        var tomorrow_m = function tomorrow_m2() {
          return tomorrow[_ + "Month"]();
        };
        var tomorrow_y = function tomorrow_y2() {
          return tomorrow[_ + "FullYear"]();
        };
        if (today_y() === y && today_m() === m && today_d() === d) {
          return _short ? "Tdy" : "Today";
        } else if (yesterday_y() === y && yesterday_m() === m && yesterday_d() === d) {
          return _short ? "Ysd" : "Yesterday";
        } else if (tomorrow_y() === y && tomorrow_m() === m && tomorrow_d() === d) {
          return _short ? "Tmw" : "Tomorrow";
        }
        return dayName;
      };
      var getWeek = function getWeek2(date) {
        var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        targetThursday.setDate(targetThursday.getDate() - (targetThursday.getDay() + 6) % 7 + 3);
        var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);
        firstThursday.setDate(firstThursday.getDate() - (firstThursday.getDay() + 6) % 7 + 3);
        var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
        targetThursday.setHours(targetThursday.getHours() - ds);
        var weekDiff = (targetThursday - firstThursday) / (864e5 * 7);
        return 1 + Math.floor(weekDiff);
      };
      var getDayOfWeek = function getDayOfWeek2(date) {
        var dow = date.getDay();
        if (dow === 0) {
          dow = 7;
        }
        return dow;
      };
      var kindOf = function kindOf2(val) {
        if (val === null) {
          return "null";
        }
        if (val === void 0) {
          return "undefined";
        }
        if (_typeof(val) !== "object") {
          return _typeof(val);
        }
        if (Array.isArray(val)) {
          return "array";
        }
        return {}.toString.call(val).slice(8, -1).toLowerCase();
      };
      if (typeof define === "function" && define.amd) {
        define(function() {
          return dateFormat;
        });
      } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
        module.exports = dateFormat;
      } else {
        global2.dateFormat = dateFormat;
      }
    })(void 0);
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/format-time.js
var require_format_time = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/format-time.js"(exports, module) {
    "use strict";
    module.exports = formatTime;
    var {
      DATE_FORMAT,
      DATE_FORMAT_SIMPLE
    } = require_constants();
    var dateformat = require_dateformat();
    var createDate = require_create_date();
    var isValidDate = require_is_valid_date();
    function formatTime(epoch, translateTime = false) {
      if (translateTime === false) {
        return epoch;
      }
      const instant = createDate(epoch);
      if (!isValidDate(instant)) {
        return epoch;
      }
      if (translateTime === true) {
        return dateformat(instant, DATE_FORMAT_SIMPLE);
      }
      const upperFormat = translateTime.toUpperCase();
      if (upperFormat === "SYS:STANDARD") {
        return dateformat(instant, DATE_FORMAT);
      }
      const prefix = upperFormat.substr(0, 4);
      if (prefix === "SYS:" || prefix === "UTC:") {
        if (prefix === "UTC:") {
          return dateformat(instant, translateTime);
        }
        return dateformat(instant, translateTime.slice(4));
      }
      return dateformat(instant, `UTC:${translateTime}`);
    }
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/handle-custom-levels-names-opts.js
var require_handle_custom_levels_names_opts = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/handle-custom-levels-names-opts.js"(exports, module) {
    "use strict";
    module.exports = handleCustomLevelsNamesOpts;
    function handleCustomLevelsNamesOpts(cLevels) {
      if (!cLevels) return {};
      if (typeof cLevels === "string") {
        return cLevels.split(",").reduce((agg, value, idx) => {
          const [levelName, levelNum = idx] = value.split(":");
          agg[levelName.toLowerCase()] = levelNum;
          return agg;
        }, {});
      } else if (Object.prototype.toString.call(cLevels) === "[object Object]") {
        return Object.keys(cLevels).reduce((agg, levelName) => {
          agg[levelName.toLowerCase()] = cLevels[levelName];
          return agg;
        }, {});
      } else {
        return {};
      }
    }
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/handle-custom-levels-opts.js
var require_handle_custom_levels_opts = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/handle-custom-levels-opts.js"(exports, module) {
    "use strict";
    module.exports = handleCustomLevelsOpts;
    function handleCustomLevelsOpts(cLevels) {
      if (!cLevels) return {};
      if (typeof cLevels === "string") {
        return cLevels.split(",").reduce(
          (agg, value, idx) => {
            const [levelName, levelNum = idx] = value.split(":");
            agg[levelNum] = levelName.toUpperCase();
            return agg;
          },
          { default: "USERLVL" }
        );
      } else if (Object.prototype.toString.call(cLevels) === "[object Object]") {
        return Object.keys(cLevels).reduce((agg, levelName) => {
          agg[cLevels[levelName]] = levelName.toUpperCase();
          return agg;
        }, { default: "USERLVL" });
      } else {
        return {};
      }
    }
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/interpret-conditionals.js
var require_interpret_conditionals = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/interpret-conditionals.js"(exports, module) {
    "use strict";
    module.exports = interpretConditionals;
    var getPropertyValue = require_get_property_value();
    function interpretConditionals(messageFormat, log) {
      messageFormat = messageFormat.replace(/{if (.*?)}(.*?){end}/g, replacer);
      messageFormat = messageFormat.replace(/{if (.*?)}/g, "");
      messageFormat = messageFormat.replace(/{end}/g, "");
      return messageFormat.replace(/\s+/g, " ").trim();
      function replacer(_, key, value) {
        const propertyValue = getPropertyValue(log, key);
        if (propertyValue && value.includes(key)) {
          return value.replace(new RegExp("{" + key + "}", "g"), propertyValue);
        } else {
          return "";
        }
      }
    }
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/is-object.js
var require_is_object = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/is-object.js"(exports, module) {
    "use strict";
    module.exports = isObject;
    function isObject(input) {
      return Object.prototype.toString.apply(input) === "[object Object]";
    }
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/join-lines-with-indentation.js
var require_join_lines_with_indentation = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/join-lines-with-indentation.js"(exports, module) {
    "use strict";
    module.exports = joinLinesWithIndentation;
    function joinLinesWithIndentation({ input, ident = "    ", eol = "\n" }) {
      const lines = input.split(/\r?\n/);
      for (let i = 1; i < lines.length; i += 1) {
        lines[i] = ident + lines[i];
      }
      return lines.join(eol);
    }
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/parse-factory-options.js
var require_parse_factory_options = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/parse-factory-options.js"(exports, module) {
    "use strict";
    module.exports = parseFactoryOptions;
    var {
      LEVEL_NAMES
    } = require_constants();
    var colors = require_colors();
    var handleCustomLevelsOpts = require_handle_custom_levels_opts();
    var handleCustomLevelsNamesOpts = require_handle_custom_levels_names_opts();
    var handleLevelLabelData = require_get_level_label_data();
    function parseFactoryOptions(options) {
      const EOL = options.crlf ? "\r\n" : "\n";
      const IDENT = "    ";
      const {
        customPrettifiers,
        errorLikeObjectKeys,
        hideObject,
        levelFirst,
        levelKey,
        levelLabel,
        messageFormat,
        messageKey,
        minimumLevel,
        singleLine,
        timestampKey,
        translateTime
      } = options;
      const errorProps = options.errorProps.split(",");
      const useOnlyCustomProps = typeof options.useOnlyCustomProps === "boolean" ? options.useOnlyCustomProps : options.useOnlyCustomProps === "true";
      const customLevels = handleCustomLevelsOpts(options.customLevels);
      const customLevelNames = handleCustomLevelsNamesOpts(options.customLevels);
      const getLevelLabelData = handleLevelLabelData(useOnlyCustomProps, customLevels, customLevelNames);
      let customColors;
      if (options.customColors) {
        if (typeof options.customColors === "string") {
          customColors = options.customColors.split(",").reduce((agg, value) => {
            const [level, color] = value.split(":");
            const condition = useOnlyCustomProps ? options.customLevels : customLevelNames[level] !== void 0;
            const levelNum = condition ? customLevelNames[level] : LEVEL_NAMES[level];
            const colorIdx = levelNum !== void 0 ? levelNum : level;
            agg.push([colorIdx, color]);
            return agg;
          }, []);
        } else if (typeof options.customColors === "object") {
          customColors = Object.keys(options.customColors).reduce((agg, value) => {
            const [level, color] = [value, options.customColors[value]];
            const condition = useOnlyCustomProps ? options.customLevels : customLevelNames[level] !== void 0;
            const levelNum = condition ? customLevelNames[level] : LEVEL_NAMES[level];
            const colorIdx = levelNum !== void 0 ? levelNum : level;
            agg.push([colorIdx, color]);
            return agg;
          }, []);
        } else {
          throw new Error("options.customColors must be of type string or object.");
        }
      }
      const customProperties = { customLevels, customLevelNames };
      if (useOnlyCustomProps === true && !options.customLevels) {
        customProperties.customLevels = void 0;
        customProperties.customLevelNames = void 0;
      }
      const includeKeys = options.include !== void 0 ? new Set(options.include.split(",")) : void 0;
      const ignoreKeys = !includeKeys && options.ignore ? new Set(options.ignore.split(",")) : void 0;
      const colorizer = colors(options.colorize, customColors, useOnlyCustomProps);
      const objectColorizer = options.colorizeObjects ? colorizer : colors(false, [], false);
      return {
        EOL,
        IDENT,
        colorizer,
        customColors,
        customLevelNames,
        customLevels,
        customPrettifiers,
        customProperties,
        errorLikeObjectKeys,
        errorProps,
        getLevelLabelData,
        hideObject,
        ignoreKeys,
        includeKeys,
        levelFirst,
        levelKey,
        levelLabel,
        messageFormat,
        messageKey,
        minimumLevel,
        objectColorizer,
        singleLine,
        timestampKey,
        translateTime,
        useOnlyCustomProps
      };
    }
  }
});

// ../../node_modules/.pnpm/fast-safe-stringify@2.1.1/node_modules/fast-safe-stringify/index.js
var require_fast_safe_stringify = __commonJS({
  "../../node_modules/.pnpm/fast-safe-stringify@2.1.1/node_modules/fast-safe-stringify/index.js"(exports, module) {
    module.exports = stringify;
    stringify.default = stringify;
    stringify.stable = deterministicStringify;
    stringify.stableStringify = deterministicStringify;
    var LIMIT_REPLACE_NODE = "[...]";
    var CIRCULAR_REPLACE_NODE = "[Circular]";
    var arr = [];
    var replacerStack = [];
    function defaultOptions() {
      return {
        depthLimit: Number.MAX_SAFE_INTEGER,
        edgesLimit: Number.MAX_SAFE_INTEGER
      };
    }
    function stringify(obj, replacer, spacer, options) {
      if (typeof options === "undefined") {
        options = defaultOptions();
      }
      decirc(obj, "", 0, [], void 0, 0, options);
      var res;
      try {
        if (replacerStack.length === 0) {
          res = JSON.stringify(obj, replacer, spacer);
        } else {
          res = JSON.stringify(obj, replaceGetterValues(replacer), spacer);
        }
      } catch (_) {
        return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
      } finally {
        while (arr.length !== 0) {
          var part = arr.pop();
          if (part.length === 4) {
            Object.defineProperty(part[0], part[1], part[3]);
          } else {
            part[0][part[1]] = part[2];
          }
        }
      }
      return res;
    }
    function setReplace(replace, val, k, parent) {
      var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k);
      if (propertyDescriptor.get !== void 0) {
        if (propertyDescriptor.configurable) {
          Object.defineProperty(parent, k, { value: replace });
          arr.push([parent, k, val, propertyDescriptor]);
        } else {
          replacerStack.push([val, k, replace]);
        }
      } else {
        parent[k] = replace;
        arr.push([parent, k, val]);
      }
    }
    function decirc(val, k, edgeIndex, stack, parent, depth, options) {
      depth += 1;
      var i;
      if (typeof val === "object" && val !== null) {
        for (i = 0; i < stack.length; i++) {
          if (stack[i] === val) {
            setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
            return;
          }
        }
        if (typeof options.depthLimit !== "undefined" && depth > options.depthLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        if (typeof options.edgesLimit !== "undefined" && edgeIndex + 1 > options.edgesLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        stack.push(val);
        if (Array.isArray(val)) {
          for (i = 0; i < val.length; i++) {
            decirc(val[i], i, i, stack, val, depth, options);
          }
        } else {
          var keys = Object.keys(val);
          for (i = 0; i < keys.length; i++) {
            var key = keys[i];
            decirc(val[key], key, i, stack, val, depth, options);
          }
        }
        stack.pop();
      }
    }
    function compareFunction(a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    }
    function deterministicStringify(obj, replacer, spacer, options) {
      if (typeof options === "undefined") {
        options = defaultOptions();
      }
      var tmp = deterministicDecirc(obj, "", 0, [], void 0, 0, options) || obj;
      var res;
      try {
        if (replacerStack.length === 0) {
          res = JSON.stringify(tmp, replacer, spacer);
        } else {
          res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer);
        }
      } catch (_) {
        return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
      } finally {
        while (arr.length !== 0) {
          var part = arr.pop();
          if (part.length === 4) {
            Object.defineProperty(part[0], part[1], part[3]);
          } else {
            part[0][part[1]] = part[2];
          }
        }
      }
      return res;
    }
    function deterministicDecirc(val, k, edgeIndex, stack, parent, depth, options) {
      depth += 1;
      var i;
      if (typeof val === "object" && val !== null) {
        for (i = 0; i < stack.length; i++) {
          if (stack[i] === val) {
            setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
            return;
          }
        }
        try {
          if (typeof val.toJSON === "function") {
            return;
          }
        } catch (_) {
          return;
        }
        if (typeof options.depthLimit !== "undefined" && depth > options.depthLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        if (typeof options.edgesLimit !== "undefined" && edgeIndex + 1 > options.edgesLimit) {
          setReplace(LIMIT_REPLACE_NODE, val, k, parent);
          return;
        }
        stack.push(val);
        if (Array.isArray(val)) {
          for (i = 0; i < val.length; i++) {
            deterministicDecirc(val[i], i, i, stack, val, depth, options);
          }
        } else {
          var tmp = {};
          var keys = Object.keys(val).sort(compareFunction);
          for (i = 0; i < keys.length; i++) {
            var key = keys[i];
            deterministicDecirc(val[key], key, i, stack, val, depth, options);
            tmp[key] = val[key];
          }
          if (typeof parent !== "undefined") {
            arr.push([parent, k, val]);
            parent[k] = tmp;
          } else {
            return tmp;
          }
        }
        stack.pop();
      }
    }
    function replaceGetterValues(replacer) {
      replacer = typeof replacer !== "undefined" ? replacer : function(k, v) {
        return v;
      };
      return function(key, val) {
        if (replacerStack.length > 0) {
          for (var i = 0; i < replacerStack.length; i++) {
            var part = replacerStack[i];
            if (part[1] === key && part[0] === val) {
              val = part[2];
              replacerStack.splice(i, 1);
              break;
            }
          }
        }
        return replacer.call(this, key, val);
      };
    }
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/prettify-error.js
var require_prettify_error = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/prettify-error.js"(exports, module) {
    "use strict";
    module.exports = prettifyError;
    var joinLinesWithIndentation = require_join_lines_with_indentation();
    function prettifyError({ keyName, lines, eol, ident }) {
      let result = "";
      const joinedLines = joinLinesWithIndentation({ input: lines, ident, eol });
      const splitLines = `${ident}${keyName}: ${joinedLines}${eol}`.split(eol);
      for (let j = 0; j < splitLines.length; j += 1) {
        if (j !== 0) result += eol;
        const line = splitLines[j];
        if (/^\s*"stack"/.test(line)) {
          const matches = /^(\s*"stack":)\s*(".*"),?$/.exec(line);
          if (matches && matches.length === 3) {
            const indentSize = /^\s*/.exec(line)[0].length + 4;
            const indentation = " ".repeat(indentSize);
            const stackMessage = matches[2];
            result += matches[1] + eol + indentation + JSON.parse(stackMessage).replace(/\n/g, eol + indentation);
          } else {
            result += line;
          }
        } else {
          result += line;
        }
      }
      return result;
    }
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/prettify-object.js
var require_prettify_object = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/prettify-object.js"(exports, module) {
    "use strict";
    module.exports = prettifyObject;
    var {
      LOGGER_KEYS
    } = require_constants();
    var stringifySafe = require_fast_safe_stringify();
    var joinLinesWithIndentation = require_join_lines_with_indentation();
    var prettifyError = require_prettify_error();
    function prettifyObject({
      log,
      excludeLoggerKeys = true,
      skipKeys = [],
      context
    }) {
      const {
        EOL: eol,
        IDENT: ident,
        customPrettifiers,
        errorLikeObjectKeys: errorLikeKeys,
        objectColorizer,
        singleLine,
        colorizer
      } = context;
      const keysToIgnore = [].concat(skipKeys);
      if (excludeLoggerKeys === true) Array.prototype.push.apply(keysToIgnore, LOGGER_KEYS);
      let result = "";
      const { plain, errors } = Object.entries(log).reduce(({ plain: plain2, errors: errors2 }, [k, v]) => {
        if (keysToIgnore.includes(k) === false) {
          const pretty = typeof customPrettifiers[k] === "function" ? customPrettifiers[k](v, k, log, { colors: colorizer.colors }) : v;
          if (errorLikeKeys.includes(k)) {
            errors2[k] = pretty;
          } else {
            plain2[k] = pretty;
          }
        }
        return { plain: plain2, errors: errors2 };
      }, { plain: {}, errors: {} });
      if (singleLine) {
        if (Object.keys(plain).length > 0) {
          result += objectColorizer.greyMessage(stringifySafe(plain));
        }
        result += eol;
        result = result.replace(/\\\\/gi, "\\");
      } else {
        Object.entries(plain).forEach(([keyName, keyValue]) => {
          let lines = typeof customPrettifiers[keyName] === "function" ? keyValue : stringifySafe(keyValue, null, 2);
          if (lines === void 0) return;
          lines = lines.replace(/\\\\/gi, "\\");
          const joinedLines = joinLinesWithIndentation({ input: lines, ident, eol });
          result += `${ident}${objectColorizer.property(keyName)}:${joinedLines.startsWith(eol) ? "" : " "}${joinedLines}${eol}`;
        });
      }
      Object.entries(errors).forEach(([keyName, keyValue]) => {
        const lines = typeof customPrettifiers[keyName] === "function" ? keyValue : stringifySafe(keyValue, null, 2);
        if (lines === void 0) return;
        result += prettifyError({ keyName, lines, eol, ident });
      });
      return result;
    }
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/prettify-error-log.js
var require_prettify_error_log = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/prettify-error-log.js"(exports, module) {
    "use strict";
    module.exports = prettifyErrorLog;
    var {
      LOGGER_KEYS
    } = require_constants();
    var isObject = require_is_object();
    var joinLinesWithIndentation = require_join_lines_with_indentation();
    var prettifyObject = require_prettify_object();
    function prettifyErrorLog({ log, context }) {
      const {
        EOL: eol,
        IDENT: ident,
        errorProps: errorProperties,
        messageKey
      } = context;
      const stack = log.stack;
      const joinedLines = joinLinesWithIndentation({ input: stack, ident, eol });
      let result = `${ident}${joinedLines}${eol}`;
      if (errorProperties.length > 0) {
        const excludeProperties = LOGGER_KEYS.concat(messageKey, "type", "stack");
        let propertiesToPrint;
        if (errorProperties[0] === "*") {
          propertiesToPrint = Object.keys(log).filter((k) => excludeProperties.includes(k) === false);
        } else {
          propertiesToPrint = errorProperties.filter((k) => excludeProperties.includes(k) === false);
        }
        for (let i = 0; i < propertiesToPrint.length; i += 1) {
          const key = propertiesToPrint[i];
          if (key in log === false) continue;
          if (isObject(log[key])) {
            const prettifiedObject = prettifyObject({
              log: log[key],
              excludeLoggerKeys: false,
              context: {
                ...context,
                IDENT: ident + ident
              }
            });
            result = `${result}${ident}${key}: {${eol}${prettifiedObject}${ident}}${eol}`;
            continue;
          }
          result = `${result}${ident}${key}: ${log[key]}${eol}`;
        }
      }
      return result;
    }
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/prettify-level.js
var require_prettify_level = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/prettify-level.js"(exports, module) {
    "use strict";
    module.exports = prettifyLevel;
    var getPropertyValue = require_get_property_value();
    function prettifyLevel({ log, context }) {
      const {
        colorizer,
        customLevels,
        customLevelNames,
        levelKey,
        getLevelLabelData
      } = context;
      const prettifier = context.customPrettifiers?.level;
      const output = getPropertyValue(log, levelKey);
      if (output === void 0) return void 0;
      const labelColorized = colorizer(output, { customLevels, customLevelNames });
      if (prettifier) {
        const [label] = getLevelLabelData(output);
        return prettifier(output, levelKey, log, { label, labelColorized, colors: colorizer.colors });
      }
      return labelColorized;
    }
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/prettify-message.js
var require_prettify_message = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/prettify-message.js"(exports, module) {
    "use strict";
    module.exports = prettifyMessage;
    var {
      LEVELS
    } = require_constants();
    var getPropertyValue = require_get_property_value();
    var interpretConditionals = require_interpret_conditionals();
    function prettifyMessage({ log, context }) {
      const {
        colorizer,
        customLevels,
        levelKey,
        levelLabel,
        messageFormat,
        messageKey,
        useOnlyCustomProps
      } = context;
      if (messageFormat && typeof messageFormat === "string") {
        const parsedMessageFormat = interpretConditionals(messageFormat, log);
        const message = String(parsedMessageFormat).replace(
          /{([^{}]+)}/g,
          function(match, p1) {
            let level;
            if (p1 === levelLabel && (level = getPropertyValue(log, levelKey)) !== void 0) {
              const condition = useOnlyCustomProps ? customLevels === void 0 : customLevels[level] === void 0;
              return condition ? LEVELS[level] : customLevels[level];
            }
            const value = getPropertyValue(log, p1);
            return value !== void 0 ? value : "";
          }
        );
        return colorizer.message(message);
      }
      if (messageFormat && typeof messageFormat === "function") {
        const msg = messageFormat(log, messageKey, levelLabel, { colors: colorizer.colors });
        return colorizer.message(msg);
      }
      if (messageKey in log === false) return void 0;
      if (typeof log[messageKey] !== "string" && typeof log[messageKey] !== "number" && typeof log[messageKey] !== "boolean") return void 0;
      return colorizer.message(log[messageKey]);
    }
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/prettify-metadata.js
var require_prettify_metadata = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/prettify-metadata.js"(exports, module) {
    "use strict";
    module.exports = prettifyMetadata;
    function prettifyMetadata({ log, context }) {
      const { customPrettifiers: prettifiers, colorizer } = context;
      let line = "";
      if (log.name || log.pid || log.hostname) {
        line += "(";
        if (log.name) {
          line += prettifiers.name ? prettifiers.name(log.name, "name", log, { colors: colorizer.colors }) : log.name;
        }
        if (log.pid) {
          const prettyPid = prettifiers.pid ? prettifiers.pid(log.pid, "pid", log, { colors: colorizer.colors }) : log.pid;
          if (log.name && log.pid) {
            line += "/" + prettyPid;
          } else {
            line += prettyPid;
          }
        }
        if (log.hostname) {
          const prettyHostname = prettifiers.hostname ? prettifiers.hostname(log.hostname, "hostname", log, { colors: colorizer.colors }) : log.hostname;
          line += `${line === "(" ? "on" : " on"} ${prettyHostname}`;
        }
        line += ")";
      }
      if (log.caller) {
        const prettyCaller = prettifiers.caller ? prettifiers.caller(log.caller, "caller", log, { colors: colorizer.colors }) : log.caller;
        line += `${line === "" ? "" : " "}<${prettyCaller}>`;
      }
      if (line === "") {
        return void 0;
      } else {
        return line;
      }
    }
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/prettify-time.js
var require_prettify_time = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/prettify-time.js"(exports, module) {
    "use strict";
    module.exports = prettifyTime;
    var formatTime = require_format_time();
    function prettifyTime({ log, context }) {
      const {
        timestampKey,
        translateTime: translateFormat
      } = context;
      const prettifier = context.customPrettifiers?.time;
      let time = null;
      if (timestampKey in log) {
        time = log[timestampKey];
      } else if ("timestamp" in log) {
        time = log.timestamp;
      }
      if (time === null) return void 0;
      const output = translateFormat ? formatTime(time, translateFormat) : time;
      return prettifier ? prettifier(output) : `[${output}]`;
    }
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/index.js
var require_utils = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/utils/index.js"(exports, module) {
    "use strict";
    module.exports = {
      buildSafeSonicBoom: require_build_safe_sonic_boom(),
      createDate: require_create_date(),
      deleteLogProperty: require_delete_log_property(),
      filterLog: require_filter_log(),
      formatTime: require_format_time(),
      getPropertyValue: require_get_property_value(),
      handleCustomLevelsNamesOpts: require_handle_custom_levels_names_opts(),
      handleCustomLevelsOpts: require_handle_custom_levels_opts(),
      interpretConditionals: require_interpret_conditionals(),
      isObject: require_is_object(),
      isValidDate: require_is_valid_date(),
      joinLinesWithIndentation: require_join_lines_with_indentation(),
      noop: require_noop(),
      parseFactoryOptions: require_parse_factory_options(),
      prettifyErrorLog: require_prettify_error_log(),
      prettifyError: require_prettify_error(),
      prettifyLevel: require_prettify_level(),
      prettifyMessage: require_prettify_message(),
      prettifyMetadata: require_prettify_metadata(),
      prettifyObject: require_prettify_object(),
      prettifyTime: require_prettify_time(),
      splitPropertyKey: require_split_property_key(),
      getLevelLabelData: require_get_level_label_data()
    };
  }
});

// ../../node_modules/.pnpm/secure-json-parse@4.1.0/node_modules/secure-json-parse/index.js
var require_secure_json_parse = __commonJS({
  "../../node_modules/.pnpm/secure-json-parse@4.1.0/node_modules/secure-json-parse/index.js"(exports, module) {
    "use strict";
    var hasBuffer = typeof Buffer !== "undefined";
    var suspectProtoRx = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/;
    var suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
    function _parse(text, reviver, options) {
      if (options == null) {
        if (reviver !== null && typeof reviver === "object") {
          options = reviver;
          reviver = void 0;
        }
      }
      if (hasBuffer && Buffer.isBuffer(text)) {
        text = text.toString();
      }
      if (text && text.charCodeAt(0) === 65279) {
        text = text.slice(1);
      }
      const obj = JSON.parse(text, reviver);
      if (obj === null || typeof obj !== "object") {
        return obj;
      }
      const protoAction = options && options.protoAction || "error";
      const constructorAction = options && options.constructorAction || "error";
      if (protoAction === "ignore" && constructorAction === "ignore") {
        return obj;
      }
      if (protoAction !== "ignore" && constructorAction !== "ignore") {
        if (suspectProtoRx.test(text) === false && suspectConstructorRx.test(text) === false) {
          return obj;
        }
      } else if (protoAction !== "ignore" && constructorAction === "ignore") {
        if (suspectProtoRx.test(text) === false) {
          return obj;
        }
      } else {
        if (suspectConstructorRx.test(text) === false) {
          return obj;
        }
      }
      return filter(obj, { protoAction, constructorAction, safe: options && options.safe });
    }
    function filter(obj, { protoAction = "error", constructorAction = "error", safe } = {}) {
      let next = [obj];
      while (next.length) {
        const nodes = next;
        next = [];
        for (const node of nodes) {
          if (protoAction !== "ignore" && Object.prototype.hasOwnProperty.call(node, "__proto__")) {
            if (safe === true) {
              return null;
            } else if (protoAction === "error") {
              throw new SyntaxError("Object contains forbidden prototype property");
            }
            delete node.__proto__;
          }
          if (constructorAction !== "ignore" && Object.prototype.hasOwnProperty.call(node, "constructor") && node.constructor !== null && typeof node.constructor === "object" && Object.prototype.hasOwnProperty.call(node.constructor, "prototype")) {
            if (safe === true) {
              return null;
            } else if (constructorAction === "error") {
              throw new SyntaxError("Object contains forbidden prototype property");
            }
            delete node.constructor;
          }
          for (const key in node) {
            const value = node[key];
            if (value && typeof value === "object") {
              next.push(value);
            }
          }
        }
      }
      return obj;
    }
    function parse(text, reviver, options) {
      const { stackTraceLimit } = Error;
      Error.stackTraceLimit = 0;
      try {
        return _parse(text, reviver, options);
      } finally {
        Error.stackTraceLimit = stackTraceLimit;
      }
    }
    function safeParse(text, reviver) {
      const { stackTraceLimit } = Error;
      Error.stackTraceLimit = 0;
      try {
        return _parse(text, reviver, { safe: true });
      } catch {
        return void 0;
      } finally {
        Error.stackTraceLimit = stackTraceLimit;
      }
    }
    module.exports = parse;
    module.exports.default = parse;
    module.exports.parse = parse;
    module.exports.safeParse = safeParse;
    module.exports.scan = filter;
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/pretty.js
var require_pretty = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/lib/pretty.js"(exports, module) {
    "use strict";
    module.exports = pretty;
    var sjs = require_secure_json_parse();
    var isObject = require_is_object();
    var prettifyErrorLog = require_prettify_error_log();
    var prettifyLevel = require_prettify_level();
    var prettifyMessage = require_prettify_message();
    var prettifyMetadata = require_prettify_metadata();
    var prettifyObject = require_prettify_object();
    var prettifyTime = require_prettify_time();
    var filterLog = require_filter_log();
    var {
      LEVELS,
      LEVEL_KEY,
      LEVEL_NAMES
    } = require_constants();
    var jsonParser = (input) => {
      try {
        return { value: sjs.parse(input, { protoAction: "remove" }) };
      } catch (err) {
        return { err };
      }
    };
    function pretty(inputData) {
      let log;
      if (!isObject(inputData)) {
        const parsed = jsonParser(inputData);
        if (parsed.err || !isObject(parsed.value)) {
          return inputData + this.EOL;
        }
        log = parsed.value;
      } else {
        log = inputData;
      }
      if (this.minimumLevel) {
        let condition;
        if (this.useOnlyCustomProps) {
          condition = this.customLevels;
        } else {
          condition = this.customLevelNames[this.minimumLevel] !== void 0;
        }
        let minimum;
        if (condition) {
          minimum = this.customLevelNames[this.minimumLevel];
        } else {
          minimum = LEVEL_NAMES[this.minimumLevel];
        }
        if (!minimum) {
          minimum = typeof this.minimumLevel === "string" ? LEVEL_NAMES[this.minimumLevel] : LEVEL_NAMES[LEVELS[this.minimumLevel].toLowerCase()];
        }
        const level = log[this.levelKey === void 0 ? LEVEL_KEY : this.levelKey];
        if (level < minimum) return;
      }
      const prettifiedMessage = prettifyMessage({ log, context: this.context });
      if (this.ignoreKeys || this.includeKeys) {
        log = filterLog({ log, context: this.context });
      }
      const prettifiedLevel = prettifyLevel({
        log,
        context: {
          ...this.context,
          // This is odd. The colorizer ends up relying on the value of
          // `customProperties` instead of the original `customLevels` and
          // `customLevelNames`.
          ...this.context.customProperties
        }
      });
      const prettifiedMetadata = prettifyMetadata({ log, context: this.context });
      const prettifiedTime = prettifyTime({ log, context: this.context });
      let line = "";
      if (this.levelFirst && prettifiedLevel) {
        line = `${prettifiedLevel}`;
      }
      if (prettifiedTime && line === "") {
        line = `${prettifiedTime}`;
      } else if (prettifiedTime) {
        line = `${line} ${prettifiedTime}`;
      }
      if (!this.levelFirst && prettifiedLevel) {
        if (line.length > 0) {
          line = `${line} ${prettifiedLevel}`;
        } else {
          line = prettifiedLevel;
        }
      }
      if (prettifiedMetadata) {
        if (line.length > 0) {
          line = `${line} ${prettifiedMetadata}:`;
        } else {
          line = prettifiedMetadata;
        }
      }
      if (line.endsWith(":") === false && line !== "") {
        line += ":";
      }
      if (prettifiedMessage !== void 0) {
        if (line.length > 0) {
          line = `${line} ${prettifiedMessage}`;
        } else {
          line = prettifiedMessage;
        }
      }
      if (line.length > 0 && !this.singleLine) {
        line += this.EOL;
      }
      if (log.type === "Error" && typeof log.stack === "string") {
        const prettifiedErrorLog = prettifyErrorLog({ log, context: this.context });
        if (this.singleLine) line += this.EOL;
        line += prettifiedErrorLog;
      } else if (this.hideObject === false) {
        const skipKeys = [
          this.messageKey,
          this.levelKey,
          this.timestampKey
        ].map((key) => key.replaceAll(/\\/g, "")).filter((key) => {
          return typeof log[key] === "string" || typeof log[key] === "number" || typeof log[key] === "boolean";
        });
        const prettifiedObject = prettifyObject({
          log,
          skipKeys,
          context: this.context
        });
        if (this.singleLine && !/^\s$/.test(prettifiedObject)) {
          line += " ";
        }
        line += prettifiedObject;
      }
      return line;
    }
  }
});

// ../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/index.js
var require_pino_pretty = __commonJS({
  "../../node_modules/.pnpm/pino-pretty@13.1.3/node_modules/pino-pretty/index.js"(exports, module) {
    var { isColorSupported } = require_colorette();
    var pump = require_pump();
    var { Transform } = __require("node:stream");
    var abstractTransport = require_pino_abstract_transport();
    var colors = require_colors();
    var {
      ERROR_LIKE_KEYS,
      LEVEL_KEY,
      LEVEL_LABEL,
      MESSAGE_KEY,
      TIMESTAMP_KEY
    } = require_constants();
    var {
      buildSafeSonicBoom,
      parseFactoryOptions
    } = require_utils();
    var pretty = require_pretty();
    var defaultOptions = {
      colorize: isColorSupported,
      colorizeObjects: true,
      crlf: false,
      customColors: null,
      customLevels: null,
      customPrettifiers: {},
      errorLikeObjectKeys: ERROR_LIKE_KEYS,
      errorProps: "",
      hideObject: false,
      ignore: "hostname",
      include: void 0,
      levelFirst: false,
      levelKey: LEVEL_KEY,
      levelLabel: LEVEL_LABEL,
      messageFormat: null,
      messageKey: MESSAGE_KEY,
      minimumLevel: void 0,
      outputStream: process.stdout,
      singleLine: false,
      timestampKey: TIMESTAMP_KEY,
      translateTime: true,
      useOnlyCustomProps: true
    };
    function prettyFactory(options) {
      const context = parseFactoryOptions(Object.assign({}, defaultOptions, options));
      return pretty.bind({ ...context, context });
    }
    function build(opts = {}) {
      let pretty2 = prettyFactory(opts);
      let destination;
      return abstractTransport(function(source) {
        source.on("message", function pinoConfigListener(message) {
          if (!message || message.code !== "PINO_CONFIG") return;
          Object.assign(opts, {
            messageKey: message.config.messageKey,
            errorLikeObjectKeys: Array.from(/* @__PURE__ */ new Set([...opts.errorLikeObjectKeys || ERROR_LIKE_KEYS, message.config.errorKey])),
            customLevels: message.config.levels.values
          });
          pretty2 = prettyFactory(opts);
          source.off("message", pinoConfigListener);
        });
        const stream = new Transform({
          objectMode: true,
          autoDestroy: true,
          transform(chunk, enc, cb) {
            const line = pretty2(chunk);
            cb(null, line);
          }
        });
        if (typeof opts.destination === "object" && typeof opts.destination.write === "function") {
          destination = opts.destination;
        } else {
          destination = buildSafeSonicBoom({
            dest: opts.destination || 1,
            append: opts.append,
            mkdir: opts.mkdir,
            sync: opts.sync
            // by default sonic will be async
          });
        }
        source.on("unknown", function(line) {
          destination.write(line + "\n");
        });
        pump(source, stream, destination);
        return stream;
      }, {
        parse: "lines",
        close(err, cb) {
          destination.on("close", () => {
            cb(err);
          });
        }
      });
    }
    module.exports = build;
    module.exports.build = build;
    module.exports.PinoPretty = build;
    module.exports.prettyFactory = prettyFactory;
    module.exports.colorizerFactory = colors;
    module.exports.isColorSupported = isColorSupported;
    module.exports.default = build;
  }
});
export default require_pino_pretty();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2NvbG9yZXR0ZUAyLjAuMjAvbm9kZV9tb2R1bGVzL2NvbG9yZXR0ZS9pbmRleC5janMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3dyYXBweUAxLjAuMi9ub2RlX21vZHVsZXMvd3JhcHB5L3dyYXBweS5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vb25jZUAxLjQuMC9ub2RlX21vZHVsZXMvb25jZS9vbmNlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9lbmQtb2Ytc3RyZWFtQDEuNC41L25vZGVfbW9kdWxlcy9lbmQtb2Ytc3RyZWFtL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9wdW1wQDMuMC40L25vZGVfbW9kdWxlcy9wdW1wL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9zcGxpdDJANC4yLjAvbm9kZV9tb2R1bGVzL3NwbGl0Mi9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vcGluby1hYnN0cmFjdC10cmFuc3BvcnRAMy4wLjAvbm9kZV9tb2R1bGVzL3Bpbm8tYWJzdHJhY3QtdHJhbnNwb3J0L2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9waW5vLXByZXR0eUAxMy4xLjMvbm9kZV9tb2R1bGVzL3Bpbm8tcHJldHR5L2xpYi9jb25zdGFudHMuanMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3Bpbm8tcHJldHR5QDEzLjEuMy9ub2RlX21vZHVsZXMvcGluby1wcmV0dHkvbGliL3V0aWxzL2dldC1sZXZlbC1sYWJlbC1kYXRhLmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9waW5vLXByZXR0eUAxMy4xLjMvbm9kZV9tb2R1bGVzL3Bpbm8tcHJldHR5L2xpYi9jb2xvcnMuanMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2F0b21pYy1zbGVlcEAxLjAuMC9ub2RlX21vZHVsZXMvYXRvbWljLXNsZWVwL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9zb25pYy1ib29tQDQuMi4xL25vZGVfbW9kdWxlcy9zb25pYy1ib29tL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9waW5vLXByZXR0eUAxMy4xLjMvbm9kZV9tb2R1bGVzL3Bpbm8tcHJldHR5L2xpYi91dGlscy9ub29wLmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9vbi1leGl0LWxlYWstZnJlZUAyLjEuMi9ub2RlX21vZHVsZXMvb24tZXhpdC1sZWFrLWZyZWUvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3Bpbm8tcHJldHR5QDEzLjEuMy9ub2RlX21vZHVsZXMvcGluby1wcmV0dHkvbGliL3V0aWxzL2J1aWxkLXNhZmUtc29uaWMtYm9vbS5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vcGluby1wcmV0dHlAMTMuMS4zL25vZGVfbW9kdWxlcy9waW5vLXByZXR0eS9saWIvdXRpbHMvaXMtdmFsaWQtZGF0ZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vcGluby1wcmV0dHlAMTMuMS4zL25vZGVfbW9kdWxlcy9waW5vLXByZXR0eS9saWIvdXRpbHMvY3JlYXRlLWRhdGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3Bpbm8tcHJldHR5QDEzLjEuMy9ub2RlX21vZHVsZXMvcGluby1wcmV0dHkvbGliL3V0aWxzL3NwbGl0LXByb3BlcnR5LWtleS5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vcGluby1wcmV0dHlAMTMuMS4zL25vZGVfbW9kdWxlcy9waW5vLXByZXR0eS9saWIvdXRpbHMvZ2V0LXByb3BlcnR5LXZhbHVlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9waW5vLXByZXR0eUAxMy4xLjMvbm9kZV9tb2R1bGVzL3Bpbm8tcHJldHR5L2xpYi91dGlscy9kZWxldGUtbG9nLXByb3BlcnR5LmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9mYXN0LWNvcHlANC4wLjMvbm9kZV9tb2R1bGVzL3NyYy91dGlscy50cyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vZmFzdC1jb3B5QDQuMC4zL25vZGVfbW9kdWxlcy9zcmMvY29waWVyLnRzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9mYXN0LWNvcHlANC4wLjMvbm9kZV9tb2R1bGVzL3NyYy9vcHRpb25zLnRzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9mYXN0LWNvcHlANC4wLjMvbm9kZV9tb2R1bGVzL3NyYy9pbmRleC50cyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vcGluby1wcmV0dHlAMTMuMS4zL25vZGVfbW9kdWxlcy9waW5vLXByZXR0eS9saWIvdXRpbHMvZmlsdGVyLWxvZy5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vZGF0ZWZvcm1hdEA0LjYuMy9ub2RlX21vZHVsZXMvZGF0ZWZvcm1hdC9saWIvZGF0ZWZvcm1hdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vcGluby1wcmV0dHlAMTMuMS4zL25vZGVfbW9kdWxlcy9waW5vLXByZXR0eS9saWIvdXRpbHMvZm9ybWF0LXRpbWUuanMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3Bpbm8tcHJldHR5QDEzLjEuMy9ub2RlX21vZHVsZXMvcGluby1wcmV0dHkvbGliL3V0aWxzL2hhbmRsZS1jdXN0b20tbGV2ZWxzLW5hbWVzLW9wdHMuanMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3Bpbm8tcHJldHR5QDEzLjEuMy9ub2RlX21vZHVsZXMvcGluby1wcmV0dHkvbGliL3V0aWxzL2hhbmRsZS1jdXN0b20tbGV2ZWxzLW9wdHMuanMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3Bpbm8tcHJldHR5QDEzLjEuMy9ub2RlX21vZHVsZXMvcGluby1wcmV0dHkvbGliL3V0aWxzL2ludGVycHJldC1jb25kaXRpb25hbHMuanMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3Bpbm8tcHJldHR5QDEzLjEuMy9ub2RlX21vZHVsZXMvcGluby1wcmV0dHkvbGliL3V0aWxzL2lzLW9iamVjdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vcGluby1wcmV0dHlAMTMuMS4zL25vZGVfbW9kdWxlcy9waW5vLXByZXR0eS9saWIvdXRpbHMvam9pbi1saW5lcy13aXRoLWluZGVudGF0aW9uLmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9waW5vLXByZXR0eUAxMy4xLjMvbm9kZV9tb2R1bGVzL3Bpbm8tcHJldHR5L2xpYi91dGlscy9wYXJzZS1mYWN0b3J5LW9wdGlvbnMuanMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2Zhc3Qtc2FmZS1zdHJpbmdpZnlAMi4xLjEvbm9kZV9tb2R1bGVzL2Zhc3Qtc2FmZS1zdHJpbmdpZnkvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3Bpbm8tcHJldHR5QDEzLjEuMy9ub2RlX21vZHVsZXMvcGluby1wcmV0dHkvbGliL3V0aWxzL3ByZXR0aWZ5LWVycm9yLmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9waW5vLXByZXR0eUAxMy4xLjMvbm9kZV9tb2R1bGVzL3Bpbm8tcHJldHR5L2xpYi91dGlscy9wcmV0dGlmeS1vYmplY3QuanMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3Bpbm8tcHJldHR5QDEzLjEuMy9ub2RlX21vZHVsZXMvcGluby1wcmV0dHkvbGliL3V0aWxzL3ByZXR0aWZ5LWVycm9yLWxvZy5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vcGluby1wcmV0dHlAMTMuMS4zL25vZGVfbW9kdWxlcy9waW5vLXByZXR0eS9saWIvdXRpbHMvcHJldHRpZnktbGV2ZWwuanMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3Bpbm8tcHJldHR5QDEzLjEuMy9ub2RlX21vZHVsZXMvcGluby1wcmV0dHkvbGliL3V0aWxzL3ByZXR0aWZ5LW1lc3NhZ2UuanMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3Bpbm8tcHJldHR5QDEzLjEuMy9ub2RlX21vZHVsZXMvcGluby1wcmV0dHkvbGliL3V0aWxzL3ByZXR0aWZ5LW1ldGFkYXRhLmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9waW5vLXByZXR0eUAxMy4xLjMvbm9kZV9tb2R1bGVzL3Bpbm8tcHJldHR5L2xpYi91dGlscy9wcmV0dGlmeS10aW1lLmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9waW5vLXByZXR0eUAxMy4xLjMvbm9kZV9tb2R1bGVzL3Bpbm8tcHJldHR5L2xpYi91dGlscy9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vc2VjdXJlLWpzb24tcGFyc2VANC4xLjAvbm9kZV9tb2R1bGVzL3NlY3VyZS1qc29uLXBhcnNlL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9waW5vLXByZXR0eUAxMy4xLjMvbm9kZV9tb2R1bGVzL3Bpbm8tcHJldHR5L2xpYi9wcmV0dHkuanMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3Bpbm8tcHJldHR5QDEzLjEuMy9ub2RlX21vZHVsZXMvcGluby1wcmV0dHkvaW5kZXguanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxudmFyIHR0eSA9IHJlcXVpcmUoJ3R0eScpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcE5hbWVzcGFjZShlKSB7XG4gIGlmIChlICYmIGUuX19lc01vZHVsZSkgcmV0dXJuIGU7XG4gIHZhciBuID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgaWYgKGUpIHtcbiAgICBPYmplY3Qua2V5cyhlKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICBpZiAoayAhPT0gJ2RlZmF1bHQnKSB7XG4gICAgICAgIHZhciBkID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlLCBrKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG4sIGssIGQuZ2V0ID8gZCA6IHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZVtrXTsgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBuW1wiZGVmYXVsdFwiXSA9IGU7XG4gIHJldHVybiBPYmplY3QuZnJlZXplKG4pO1xufVxuXG52YXIgdHR5X19uYW1lc3BhY2UgPSAvKiNfX1BVUkVfXyovX2ludGVyb3BOYW1lc3BhY2UodHR5KTtcblxuY29uc3Qge1xuICBlbnYgPSB7fSxcbiAgYXJndiA9IFtdLFxuICBwbGF0Zm9ybSA9IFwiXCIsXG59ID0gdHlwZW9mIHByb2Nlc3MgPT09IFwidW5kZWZpbmVkXCIgPyB7fSA6IHByb2Nlc3M7XG5cbmNvbnN0IGlzRGlzYWJsZWQgPSBcIk5PX0NPTE9SXCIgaW4gZW52IHx8IGFyZ3YuaW5jbHVkZXMoXCItLW5vLWNvbG9yXCIpO1xuY29uc3QgaXNGb3JjZWQgPSBcIkZPUkNFX0NPTE9SXCIgaW4gZW52IHx8IGFyZ3YuaW5jbHVkZXMoXCItLWNvbG9yXCIpO1xuY29uc3QgaXNXaW5kb3dzID0gcGxhdGZvcm0gPT09IFwid2luMzJcIjtcbmNvbnN0IGlzRHVtYlRlcm1pbmFsID0gZW52LlRFUk0gPT09IFwiZHVtYlwiO1xuXG5jb25zdCBpc0NvbXBhdGlibGVUZXJtaW5hbCA9XG4gIHR0eV9fbmFtZXNwYWNlICYmIHR0eV9fbmFtZXNwYWNlLmlzYXR0eSAmJiB0dHlfX25hbWVzcGFjZS5pc2F0dHkoMSkgJiYgZW52LlRFUk0gJiYgIWlzRHVtYlRlcm1pbmFsO1xuXG5jb25zdCBpc0NJID1cbiAgXCJDSVwiIGluIGVudiAmJlxuICAoXCJHSVRIVUJfQUNUSU9OU1wiIGluIGVudiB8fCBcIkdJVExBQl9DSVwiIGluIGVudiB8fCBcIkNJUkNMRUNJXCIgaW4gZW52KTtcblxuY29uc3QgaXNDb2xvclN1cHBvcnRlZCA9XG4gICFpc0Rpc2FibGVkICYmXG4gIChpc0ZvcmNlZCB8fCAoaXNXaW5kb3dzICYmICFpc0R1bWJUZXJtaW5hbCkgfHwgaXNDb21wYXRpYmxlVGVybWluYWwgfHwgaXNDSSk7XG5cbmNvbnN0IHJlcGxhY2VDbG9zZSA9IChcbiAgaW5kZXgsXG4gIHN0cmluZyxcbiAgY2xvc2UsXG4gIHJlcGxhY2UsXG4gIGhlYWQgPSBzdHJpbmcuc3Vic3RyaW5nKDAsIGluZGV4KSArIHJlcGxhY2UsXG4gIHRhaWwgPSBzdHJpbmcuc3Vic3RyaW5nKGluZGV4ICsgY2xvc2UubGVuZ3RoKSxcbiAgbmV4dCA9IHRhaWwuaW5kZXhPZihjbG9zZSlcbikgPT4gaGVhZCArIChuZXh0IDwgMCA/IHRhaWwgOiByZXBsYWNlQ2xvc2UobmV4dCwgdGFpbCwgY2xvc2UsIHJlcGxhY2UpKTtcblxuY29uc3QgY2xlYXJCbGVlZCA9IChpbmRleCwgc3RyaW5nLCBvcGVuLCBjbG9zZSwgcmVwbGFjZSkgPT5cbiAgaW5kZXggPCAwXG4gICAgPyBvcGVuICsgc3RyaW5nICsgY2xvc2VcbiAgICA6IG9wZW4gKyByZXBsYWNlQ2xvc2UoaW5kZXgsIHN0cmluZywgY2xvc2UsIHJlcGxhY2UpICsgY2xvc2U7XG5cbmNvbnN0IGZpbHRlckVtcHR5ID1cbiAgKG9wZW4sIGNsb3NlLCByZXBsYWNlID0gb3BlbiwgYXQgPSBvcGVuLmxlbmd0aCArIDEpID0+XG4gIChzdHJpbmcpID0+XG4gICAgc3RyaW5nIHx8ICEoc3RyaW5nID09PSBcIlwiIHx8IHN0cmluZyA9PT0gdW5kZWZpbmVkKVxuICAgICAgPyBjbGVhckJsZWVkKFxuICAgICAgICAgIChcIlwiICsgc3RyaW5nKS5pbmRleE9mKGNsb3NlLCBhdCksXG4gICAgICAgICAgc3RyaW5nLFxuICAgICAgICAgIG9wZW4sXG4gICAgICAgICAgY2xvc2UsXG4gICAgICAgICAgcmVwbGFjZVxuICAgICAgICApXG4gICAgICA6IFwiXCI7XG5cbmNvbnN0IGluaXQgPSAob3BlbiwgY2xvc2UsIHJlcGxhY2UpID0+XG4gIGZpbHRlckVtcHR5KGBcXHgxYlske29wZW59bWAsIGBcXHgxYlske2Nsb3NlfW1gLCByZXBsYWNlKTtcblxuY29uc3QgY29sb3JzID0ge1xuICByZXNldDogaW5pdCgwLCAwKSxcbiAgYm9sZDogaW5pdCgxLCAyMiwgXCJcXHgxYlsyMm1cXHgxYlsxbVwiKSxcbiAgZGltOiBpbml0KDIsIDIyLCBcIlxceDFiWzIybVxceDFiWzJtXCIpLFxuICBpdGFsaWM6IGluaXQoMywgMjMpLFxuICB1bmRlcmxpbmU6IGluaXQoNCwgMjQpLFxuICBpbnZlcnNlOiBpbml0KDcsIDI3KSxcbiAgaGlkZGVuOiBpbml0KDgsIDI4KSxcbiAgc3RyaWtldGhyb3VnaDogaW5pdCg5LCAyOSksXG4gIGJsYWNrOiBpbml0KDMwLCAzOSksXG4gIHJlZDogaW5pdCgzMSwgMzkpLFxuICBncmVlbjogaW5pdCgzMiwgMzkpLFxuICB5ZWxsb3c6IGluaXQoMzMsIDM5KSxcbiAgYmx1ZTogaW5pdCgzNCwgMzkpLFxuICBtYWdlbnRhOiBpbml0KDM1LCAzOSksXG4gIGN5YW46IGluaXQoMzYsIDM5KSxcbiAgd2hpdGU6IGluaXQoMzcsIDM5KSxcbiAgZ3JheTogaW5pdCg5MCwgMzkpLFxuICBiZ0JsYWNrOiBpbml0KDQwLCA0OSksXG4gIGJnUmVkOiBpbml0KDQxLCA0OSksXG4gIGJnR3JlZW46IGluaXQoNDIsIDQ5KSxcbiAgYmdZZWxsb3c6IGluaXQoNDMsIDQ5KSxcbiAgYmdCbHVlOiBpbml0KDQ0LCA0OSksXG4gIGJnTWFnZW50YTogaW5pdCg0NSwgNDkpLFxuICBiZ0N5YW46IGluaXQoNDYsIDQ5KSxcbiAgYmdXaGl0ZTogaW5pdCg0NywgNDkpLFxuICBibGFja0JyaWdodDogaW5pdCg5MCwgMzkpLFxuICByZWRCcmlnaHQ6IGluaXQoOTEsIDM5KSxcbiAgZ3JlZW5CcmlnaHQ6IGluaXQoOTIsIDM5KSxcbiAgeWVsbG93QnJpZ2h0OiBpbml0KDkzLCAzOSksXG4gIGJsdWVCcmlnaHQ6IGluaXQoOTQsIDM5KSxcbiAgbWFnZW50YUJyaWdodDogaW5pdCg5NSwgMzkpLFxuICBjeWFuQnJpZ2h0OiBpbml0KDk2LCAzOSksXG4gIHdoaXRlQnJpZ2h0OiBpbml0KDk3LCAzOSksXG4gIGJnQmxhY2tCcmlnaHQ6IGluaXQoMTAwLCA0OSksXG4gIGJnUmVkQnJpZ2h0OiBpbml0KDEwMSwgNDkpLFxuICBiZ0dyZWVuQnJpZ2h0OiBpbml0KDEwMiwgNDkpLFxuICBiZ1llbGxvd0JyaWdodDogaW5pdCgxMDMsIDQ5KSxcbiAgYmdCbHVlQnJpZ2h0OiBpbml0KDEwNCwgNDkpLFxuICBiZ01hZ2VudGFCcmlnaHQ6IGluaXQoMTA1LCA0OSksXG4gIGJnQ3lhbkJyaWdodDogaW5pdCgxMDYsIDQ5KSxcbiAgYmdXaGl0ZUJyaWdodDogaW5pdCgxMDcsIDQ5KSxcbn07XG5cbmNvbnN0IGNyZWF0ZUNvbG9ycyA9ICh7IHVzZUNvbG9yID0gaXNDb2xvclN1cHBvcnRlZCB9ID0ge30pID0+XG4gIHVzZUNvbG9yXG4gICAgPyBjb2xvcnNcbiAgICA6IE9iamVjdC5rZXlzKGNvbG9ycykucmVkdWNlKFxuICAgICAgICAoY29sb3JzLCBrZXkpID0+ICh7IC4uLmNvbG9ycywgW2tleV06IFN0cmluZyB9KSxcbiAgICAgICAge31cbiAgICAgICk7XG5cbmNvbnN0IHtcbiAgcmVzZXQsXG4gIGJvbGQsXG4gIGRpbSxcbiAgaXRhbGljLFxuICB1bmRlcmxpbmUsXG4gIGludmVyc2UsXG4gIGhpZGRlbixcbiAgc3RyaWtldGhyb3VnaCxcbiAgYmxhY2ssXG4gIHJlZCxcbiAgZ3JlZW4sXG4gIHllbGxvdyxcbiAgYmx1ZSxcbiAgbWFnZW50YSxcbiAgY3lhbixcbiAgd2hpdGUsXG4gIGdyYXksXG4gIGJnQmxhY2ssXG4gIGJnUmVkLFxuICBiZ0dyZWVuLFxuICBiZ1llbGxvdyxcbiAgYmdCbHVlLFxuICBiZ01hZ2VudGEsXG4gIGJnQ3lhbixcbiAgYmdXaGl0ZSxcbiAgYmxhY2tCcmlnaHQsXG4gIHJlZEJyaWdodCxcbiAgZ3JlZW5CcmlnaHQsXG4gIHllbGxvd0JyaWdodCxcbiAgYmx1ZUJyaWdodCxcbiAgbWFnZW50YUJyaWdodCxcbiAgY3lhbkJyaWdodCxcbiAgd2hpdGVCcmlnaHQsXG4gIGJnQmxhY2tCcmlnaHQsXG4gIGJnUmVkQnJpZ2h0LFxuICBiZ0dyZWVuQnJpZ2h0LFxuICBiZ1llbGxvd0JyaWdodCxcbiAgYmdCbHVlQnJpZ2h0LFxuICBiZ01hZ2VudGFCcmlnaHQsXG4gIGJnQ3lhbkJyaWdodCxcbiAgYmdXaGl0ZUJyaWdodCxcbn0gPSBjcmVhdGVDb2xvcnMoKTtcblxuZXhwb3J0cy5iZ0JsYWNrID0gYmdCbGFjaztcbmV4cG9ydHMuYmdCbGFja0JyaWdodCA9IGJnQmxhY2tCcmlnaHQ7XG5leHBvcnRzLmJnQmx1ZSA9IGJnQmx1ZTtcbmV4cG9ydHMuYmdCbHVlQnJpZ2h0ID0gYmdCbHVlQnJpZ2h0O1xuZXhwb3J0cy5iZ0N5YW4gPSBiZ0N5YW47XG5leHBvcnRzLmJnQ3lhbkJyaWdodCA9IGJnQ3lhbkJyaWdodDtcbmV4cG9ydHMuYmdHcmVlbiA9IGJnR3JlZW47XG5leHBvcnRzLmJnR3JlZW5CcmlnaHQgPSBiZ0dyZWVuQnJpZ2h0O1xuZXhwb3J0cy5iZ01hZ2VudGEgPSBiZ01hZ2VudGE7XG5leHBvcnRzLmJnTWFnZW50YUJyaWdodCA9IGJnTWFnZW50YUJyaWdodDtcbmV4cG9ydHMuYmdSZWQgPSBiZ1JlZDtcbmV4cG9ydHMuYmdSZWRCcmlnaHQgPSBiZ1JlZEJyaWdodDtcbmV4cG9ydHMuYmdXaGl0ZSA9IGJnV2hpdGU7XG5leHBvcnRzLmJnV2hpdGVCcmlnaHQgPSBiZ1doaXRlQnJpZ2h0O1xuZXhwb3J0cy5iZ1llbGxvdyA9IGJnWWVsbG93O1xuZXhwb3J0cy5iZ1llbGxvd0JyaWdodCA9IGJnWWVsbG93QnJpZ2h0O1xuZXhwb3J0cy5ibGFjayA9IGJsYWNrO1xuZXhwb3J0cy5ibGFja0JyaWdodCA9IGJsYWNrQnJpZ2h0O1xuZXhwb3J0cy5ibHVlID0gYmx1ZTtcbmV4cG9ydHMuYmx1ZUJyaWdodCA9IGJsdWVCcmlnaHQ7XG5leHBvcnRzLmJvbGQgPSBib2xkO1xuZXhwb3J0cy5jcmVhdGVDb2xvcnMgPSBjcmVhdGVDb2xvcnM7XG5leHBvcnRzLmN5YW4gPSBjeWFuO1xuZXhwb3J0cy5jeWFuQnJpZ2h0ID0gY3lhbkJyaWdodDtcbmV4cG9ydHMuZGltID0gZGltO1xuZXhwb3J0cy5ncmF5ID0gZ3JheTtcbmV4cG9ydHMuZ3JlZW4gPSBncmVlbjtcbmV4cG9ydHMuZ3JlZW5CcmlnaHQgPSBncmVlbkJyaWdodDtcbmV4cG9ydHMuaGlkZGVuID0gaGlkZGVuO1xuZXhwb3J0cy5pbnZlcnNlID0gaW52ZXJzZTtcbmV4cG9ydHMuaXNDb2xvclN1cHBvcnRlZCA9IGlzQ29sb3JTdXBwb3J0ZWQ7XG5leHBvcnRzLml0YWxpYyA9IGl0YWxpYztcbmV4cG9ydHMubWFnZW50YSA9IG1hZ2VudGE7XG5leHBvcnRzLm1hZ2VudGFCcmlnaHQgPSBtYWdlbnRhQnJpZ2h0O1xuZXhwb3J0cy5yZWQgPSByZWQ7XG5leHBvcnRzLnJlZEJyaWdodCA9IHJlZEJyaWdodDtcbmV4cG9ydHMucmVzZXQgPSByZXNldDtcbmV4cG9ydHMuc3RyaWtldGhyb3VnaCA9IHN0cmlrZXRocm91Z2g7XG5leHBvcnRzLnVuZGVybGluZSA9IHVuZGVybGluZTtcbmV4cG9ydHMud2hpdGUgPSB3aGl0ZTtcbmV4cG9ydHMud2hpdGVCcmlnaHQgPSB3aGl0ZUJyaWdodDtcbmV4cG9ydHMueWVsbG93ID0geWVsbG93O1xuZXhwb3J0cy55ZWxsb3dCcmlnaHQgPSB5ZWxsb3dCcmlnaHQ7XG4iLCAiLy8gUmV0dXJucyBhIHdyYXBwZXIgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgd3JhcHBlZCBjYWxsYmFja1xuLy8gVGhlIHdyYXBwZXIgZnVuY3Rpb24gc2hvdWxkIGRvIHNvbWUgc3R1ZmYsIGFuZCByZXR1cm4gYVxuLy8gcHJlc3VtYWJseSBkaWZmZXJlbnQgY2FsbGJhY2sgZnVuY3Rpb24uXG4vLyBUaGlzIG1ha2VzIHN1cmUgdGhhdCBvd24gcHJvcGVydGllcyBhcmUgcmV0YWluZWQsIHNvIHRoYXRcbi8vIGRlY29yYXRpb25zIGFuZCBzdWNoIGFyZSBub3QgbG9zdCBhbG9uZyB0aGUgd2F5LlxubW9kdWxlLmV4cG9ydHMgPSB3cmFwcHlcbmZ1bmN0aW9uIHdyYXBweSAoZm4sIGNiKSB7XG4gIGlmIChmbiAmJiBjYikgcmV0dXJuIHdyYXBweShmbikoY2IpXG5cbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJylcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCduZWVkIHdyYXBwZXIgZnVuY3Rpb24nKVxuXG4gIE9iamVjdC5rZXlzKGZuKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgd3JhcHBlcltrXSA9IGZuW2tdXG4gIH0pXG5cbiAgcmV0dXJuIHdyYXBwZXJcblxuICBmdW5jdGlvbiB3cmFwcGVyKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldXG4gICAgfVxuICAgIHZhciByZXQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKVxuICAgIHZhciBjYiA9IGFyZ3NbYXJncy5sZW5ndGgtMV1cbiAgICBpZiAodHlwZW9mIHJldCA9PT0gJ2Z1bmN0aW9uJyAmJiByZXQgIT09IGNiKSB7XG4gICAgICBPYmplY3Qua2V5cyhjYikuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgICByZXRba10gPSBjYltrXVxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIHJldFxuICB9XG59XG4iLCAidmFyIHdyYXBweSA9IHJlcXVpcmUoJ3dyYXBweScpXG5tb2R1bGUuZXhwb3J0cyA9IHdyYXBweShvbmNlKVxubW9kdWxlLmV4cG9ydHMuc3RyaWN0ID0gd3JhcHB5KG9uY2VTdHJpY3QpXG5cbm9uY2UucHJvdG8gPSBvbmNlKGZ1bmN0aW9uICgpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZ1bmN0aW9uLnByb3RvdHlwZSwgJ29uY2UnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvbmNlKHRoaXMpXG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSlcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRnVuY3Rpb24ucHJvdG90eXBlLCAnb25jZVN0cmljdCcsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9uY2VTdHJpY3QodGhpcylcbiAgICB9LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KVxufSlcblxuZnVuY3Rpb24gb25jZSAoZm4pIHtcbiAgdmFyIGYgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGYuY2FsbGVkKSByZXR1cm4gZi52YWx1ZVxuICAgIGYuY2FsbGVkID0gdHJ1ZVxuICAgIHJldHVybiBmLnZhbHVlID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICB9XG4gIGYuY2FsbGVkID0gZmFsc2VcbiAgcmV0dXJuIGZcbn1cblxuZnVuY3Rpb24gb25jZVN0cmljdCAoZm4pIHtcbiAgdmFyIGYgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGYuY2FsbGVkKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGYub25jZUVycm9yKVxuICAgIGYuY2FsbGVkID0gdHJ1ZVxuICAgIHJldHVybiBmLnZhbHVlID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICB9XG4gIHZhciBuYW1lID0gZm4ubmFtZSB8fCAnRnVuY3Rpb24gd3JhcHBlZCB3aXRoIGBvbmNlYCdcbiAgZi5vbmNlRXJyb3IgPSBuYW1lICsgXCIgc2hvdWxkbid0IGJlIGNhbGxlZCBtb3JlIHRoYW4gb25jZVwiXG4gIGYuY2FsbGVkID0gZmFsc2VcbiAgcmV0dXJuIGZcbn1cbiIsICJ2YXIgb25jZSA9IHJlcXVpcmUoJ29uY2UnKTtcblxudmFyIG5vb3AgPSBmdW5jdGlvbigpIHt9O1xuXG52YXIgcW50ID0gZ2xvYmFsLkJhcmUgPyBxdWV1ZU1pY3JvdGFzayA6IHByb2Nlc3MubmV4dFRpY2suYmluZChwcm9jZXNzKTtcblxudmFyIGlzUmVxdWVzdCA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuXHRyZXR1cm4gc3RyZWFtLnNldEhlYWRlciAmJiB0eXBlb2Ygc3RyZWFtLmFib3J0ID09PSAnZnVuY3Rpb24nO1xufTtcblxudmFyIGlzQ2hpbGRQcm9jZXNzID0gZnVuY3Rpb24oc3RyZWFtKSB7XG5cdHJldHVybiBzdHJlYW0uc3RkaW8gJiYgQXJyYXkuaXNBcnJheShzdHJlYW0uc3RkaW8pICYmIHN0cmVhbS5zdGRpby5sZW5ndGggPT09IDNcbn07XG5cbnZhciBlb3MgPSBmdW5jdGlvbihzdHJlYW0sIG9wdHMsIGNhbGxiYWNrKSB7XG5cdGlmICh0eXBlb2Ygb3B0cyA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIGVvcyhzdHJlYW0sIG51bGwsIG9wdHMpO1xuXHRpZiAoIW9wdHMpIG9wdHMgPSB7fTtcblxuXHRjYWxsYmFjayA9IG9uY2UoY2FsbGJhY2sgfHwgbm9vcCk7XG5cblx0dmFyIHdzID0gc3RyZWFtLl93cml0YWJsZVN0YXRlO1xuXHR2YXIgcnMgPSBzdHJlYW0uX3JlYWRhYmxlU3RhdGU7XG5cdHZhciByZWFkYWJsZSA9IG9wdHMucmVhZGFibGUgfHwgKG9wdHMucmVhZGFibGUgIT09IGZhbHNlICYmIHN0cmVhbS5yZWFkYWJsZSk7XG5cdHZhciB3cml0YWJsZSA9IG9wdHMud3JpdGFibGUgfHwgKG9wdHMud3JpdGFibGUgIT09IGZhbHNlICYmIHN0cmVhbS53cml0YWJsZSk7XG5cdHZhciBjYW5jZWxsZWQgPSBmYWxzZTtcblxuXHR2YXIgb25sZWdhY3lmaW5pc2ggPSBmdW5jdGlvbigpIHtcblx0XHRpZiAoIXN0cmVhbS53cml0YWJsZSkgb25maW5pc2goKTtcblx0fTtcblxuXHR2YXIgb25maW5pc2ggPSBmdW5jdGlvbigpIHtcblx0XHR3cml0YWJsZSA9IGZhbHNlO1xuXHRcdGlmICghcmVhZGFibGUpIGNhbGxiYWNrLmNhbGwoc3RyZWFtKTtcblx0fTtcblxuXHR2YXIgb25lbmQgPSBmdW5jdGlvbigpIHtcblx0XHRyZWFkYWJsZSA9IGZhbHNlO1xuXHRcdGlmICghd3JpdGFibGUpIGNhbGxiYWNrLmNhbGwoc3RyZWFtKTtcblx0fTtcblxuXHR2YXIgb25leGl0ID0gZnVuY3Rpb24oZXhpdENvZGUpIHtcblx0XHRjYWxsYmFjay5jYWxsKHN0cmVhbSwgZXhpdENvZGUgPyBuZXcgRXJyb3IoJ2V4aXRlZCB3aXRoIGVycm9yIGNvZGU6ICcgKyBleGl0Q29kZSkgOiBudWxsKTtcblx0fTtcblxuXHR2YXIgb25lcnJvciA9IGZ1bmN0aW9uKGVycikge1xuXHRcdGNhbGxiYWNrLmNhbGwoc3RyZWFtLCBlcnIpO1xuXHR9O1xuXG5cdHZhciBvbmNsb3NlID0gZnVuY3Rpb24oKSB7XG5cdFx0cW50KG9uY2xvc2VuZXh0dGljayk7XG5cdH07XG5cblx0dmFyIG9uY2xvc2VuZXh0dGljayA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmIChjYW5jZWxsZWQpIHJldHVybjtcblx0XHRpZiAocmVhZGFibGUgJiYgIShycyAmJiAocnMuZW5kZWQgJiYgIXJzLmRlc3Ryb3llZCkpKSByZXR1cm4gY2FsbGJhY2suY2FsbChzdHJlYW0sIG5ldyBFcnJvcigncHJlbWF0dXJlIGNsb3NlJykpO1xuXHRcdGlmICh3cml0YWJsZSAmJiAhKHdzICYmICh3cy5lbmRlZCAmJiAhd3MuZGVzdHJveWVkKSkpIHJldHVybiBjYWxsYmFjay5jYWxsKHN0cmVhbSwgbmV3IEVycm9yKCdwcmVtYXR1cmUgY2xvc2UnKSk7XG5cdH07XG5cblx0dmFyIG9ucmVxdWVzdCA9IGZ1bmN0aW9uKCkge1xuXHRcdHN0cmVhbS5yZXEub24oJ2ZpbmlzaCcsIG9uZmluaXNoKTtcblx0fTtcblxuXHRpZiAoaXNSZXF1ZXN0KHN0cmVhbSkpIHtcblx0XHRzdHJlYW0ub24oJ2NvbXBsZXRlJywgb25maW5pc2gpO1xuXHRcdHN0cmVhbS5vbignYWJvcnQnLCBvbmNsb3NlKTtcblx0XHRpZiAoc3RyZWFtLnJlcSkgb25yZXF1ZXN0KCk7XG5cdFx0ZWxzZSBzdHJlYW0ub24oJ3JlcXVlc3QnLCBvbnJlcXVlc3QpO1xuXHR9IGVsc2UgaWYgKHdyaXRhYmxlICYmICF3cykgeyAvLyBsZWdhY3kgc3RyZWFtc1xuXHRcdHN0cmVhbS5vbignZW5kJywgb25sZWdhY3lmaW5pc2gpO1xuXHRcdHN0cmVhbS5vbignY2xvc2UnLCBvbmxlZ2FjeWZpbmlzaCk7XG5cdH1cblxuXHRpZiAoaXNDaGlsZFByb2Nlc3Moc3RyZWFtKSkgc3RyZWFtLm9uKCdleGl0Jywgb25leGl0KTtcblxuXHRzdHJlYW0ub24oJ2VuZCcsIG9uZW5kKTtcblx0c3RyZWFtLm9uKCdmaW5pc2gnLCBvbmZpbmlzaCk7XG5cdGlmIChvcHRzLmVycm9yICE9PSBmYWxzZSkgc3RyZWFtLm9uKCdlcnJvcicsIG9uZXJyb3IpO1xuXHRzdHJlYW0ub24oJ2Nsb3NlJywgb25jbG9zZSk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGNhbmNlbGxlZCA9IHRydWU7XG5cdFx0c3RyZWFtLnJlbW92ZUxpc3RlbmVyKCdjb21wbGV0ZScsIG9uZmluaXNoKTtcblx0XHRzdHJlYW0ucmVtb3ZlTGlzdGVuZXIoJ2Fib3J0Jywgb25jbG9zZSk7XG5cdFx0c3RyZWFtLnJlbW92ZUxpc3RlbmVyKCdyZXF1ZXN0Jywgb25yZXF1ZXN0KTtcblx0XHRpZiAoc3RyZWFtLnJlcSkgc3RyZWFtLnJlcS5yZW1vdmVMaXN0ZW5lcignZmluaXNoJywgb25maW5pc2gpO1xuXHRcdHN0cmVhbS5yZW1vdmVMaXN0ZW5lcignZW5kJywgb25sZWdhY3lmaW5pc2gpO1xuXHRcdHN0cmVhbS5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvbmxlZ2FjeWZpbmlzaCk7XG5cdFx0c3RyZWFtLnJlbW92ZUxpc3RlbmVyKCdmaW5pc2gnLCBvbmZpbmlzaCk7XG5cdFx0c3RyZWFtLnJlbW92ZUxpc3RlbmVyKCdleGl0Jywgb25leGl0KTtcblx0XHRzdHJlYW0ucmVtb3ZlTGlzdGVuZXIoJ2VuZCcsIG9uZW5kKTtcblx0XHRzdHJlYW0ucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25lcnJvcik7XG5cdFx0c3RyZWFtLnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIG9uY2xvc2UpO1xuXHR9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBlb3M7XG4iLCAidmFyIG9uY2UgPSByZXF1aXJlKCdvbmNlJylcbnZhciBlb3MgPSByZXF1aXJlKCdlbmQtb2Ytc3RyZWFtJylcbnZhciBmc1xuXG50cnkge1xuICBmcyA9IHJlcXVpcmUoJ2ZzJykgLy8gd2Ugb25seSBuZWVkIGZzIHRvIGdldCB0aGUgUmVhZFN0cmVhbSBhbmQgV3JpdGVTdHJlYW0gcHJvdG90eXBlc1xufSBjYXRjaCAoZSkge31cblxudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fVxudmFyIGFuY2llbnQgPSB0eXBlb2YgcHJvY2VzcyA9PT0gJ3VuZGVmaW5lZCcgPyBmYWxzZSA6IC9edj9cXC4wLy50ZXN0KHByb2Nlc3MudmVyc2lvbilcblxudmFyIGlzRm4gPSBmdW5jdGlvbiAoZm4pIHtcbiAgcmV0dXJuIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJ1xufVxuXG52YXIgaXNGUyA9IGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgaWYgKCFhbmNpZW50KSByZXR1cm4gZmFsc2UgLy8gbmV3ZXIgbm9kZSB2ZXJzaW9uIGRvIG5vdCBuZWVkIHRvIGNhcmUgYWJvdXQgZnMgaXMgYSBzcGVjaWFsIHdheVxuICBpZiAoIWZzKSByZXR1cm4gZmFsc2UgLy8gYnJvd3NlclxuICByZXR1cm4gKHN0cmVhbSBpbnN0YW5jZW9mIChmcy5SZWFkU3RyZWFtIHx8IG5vb3ApIHx8IHN0cmVhbSBpbnN0YW5jZW9mIChmcy5Xcml0ZVN0cmVhbSB8fCBub29wKSkgJiYgaXNGbihzdHJlYW0uY2xvc2UpXG59XG5cbnZhciBpc1JlcXVlc3QgPSBmdW5jdGlvbiAoc3RyZWFtKSB7XG4gIHJldHVybiBzdHJlYW0uc2V0SGVhZGVyICYmIGlzRm4oc3RyZWFtLmFib3J0KVxufVxuXG52YXIgZGVzdHJveWVyID0gZnVuY3Rpb24gKHN0cmVhbSwgcmVhZGluZywgd3JpdGluZywgY2FsbGJhY2spIHtcbiAgY2FsbGJhY2sgPSBvbmNlKGNhbGxiYWNrKVxuXG4gIHZhciBjbG9zZWQgPSBmYWxzZVxuICBzdHJlYW0ub24oJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgIGNsb3NlZCA9IHRydWVcbiAgfSlcblxuICBlb3Moc3RyZWFtLCB7cmVhZGFibGU6IHJlYWRpbmcsIHdyaXRhYmxlOiB3cml0aW5nfSwgZnVuY3Rpb24gKGVycikge1xuICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgY2xvc2VkID0gdHJ1ZVxuICAgIGNhbGxiYWNrKClcbiAgfSlcblxuICB2YXIgZGVzdHJveWVkID0gZmFsc2VcbiAgcmV0dXJuIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoY2xvc2VkKSByZXR1cm5cbiAgICBpZiAoZGVzdHJveWVkKSByZXR1cm5cbiAgICBkZXN0cm95ZWQgPSB0cnVlXG5cbiAgICBpZiAoaXNGUyhzdHJlYW0pKSByZXR1cm4gc3RyZWFtLmNsb3NlKG5vb3ApIC8vIHVzZSBjbG9zZSBmb3IgZnMgc3RyZWFtcyB0byBhdm9pZCBmZCBsZWFrc1xuICAgIGlmIChpc1JlcXVlc3Qoc3RyZWFtKSkgcmV0dXJuIHN0cmVhbS5hYm9ydCgpIC8vIHJlcXVlc3QuZGVzdHJveSBqdXN0IGRvIC5lbmQgLSAuYWJvcnQgaXMgd2hhdCB3ZSB3YW50XG5cbiAgICBpZiAoaXNGbihzdHJlYW0uZGVzdHJveSkpIHJldHVybiBzdHJlYW0uZGVzdHJveSgpXG5cbiAgICBjYWxsYmFjayhlcnIgfHwgbmV3IEVycm9yKCdzdHJlYW0gd2FzIGRlc3Ryb3llZCcpKVxuICB9XG59XG5cbnZhciBjYWxsID0gZnVuY3Rpb24gKGZuKSB7XG4gIGZuKClcbn1cblxudmFyIHBpcGUgPSBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcbiAgcmV0dXJuIGZyb20ucGlwZSh0bylcbn1cblxudmFyIHB1bXAgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdHJlYW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICB2YXIgY2FsbGJhY2sgPSBpc0ZuKHN0cmVhbXNbc3RyZWFtcy5sZW5ndGggLSAxXSB8fCBub29wKSAmJiBzdHJlYW1zLnBvcCgpIHx8IG5vb3BcblxuICBpZiAoQXJyYXkuaXNBcnJheShzdHJlYW1zWzBdKSkgc3RyZWFtcyA9IHN0cmVhbXNbMF1cbiAgaWYgKHN0cmVhbXMubGVuZ3RoIDwgMikgdGhyb3cgbmV3IEVycm9yKCdwdW1wIHJlcXVpcmVzIHR3byBzdHJlYW1zIHBlciBtaW5pbXVtJylcblxuICB2YXIgZXJyb3JcbiAgdmFyIGRlc3Ryb3lzID0gc3RyZWFtcy5tYXAoZnVuY3Rpb24gKHN0cmVhbSwgaSkge1xuICAgIHZhciByZWFkaW5nID0gaSA8IHN0cmVhbXMubGVuZ3RoIC0gMVxuICAgIHZhciB3cml0aW5nID0gaSA+IDBcbiAgICByZXR1cm4gZGVzdHJveWVyKHN0cmVhbSwgcmVhZGluZywgd3JpdGluZywgZnVuY3Rpb24gKGVycikge1xuICAgICAgaWYgKCFlcnJvcikgZXJyb3IgPSBlcnJcbiAgICAgIGlmIChlcnIpIGRlc3Ryb3lzLmZvckVhY2goY2FsbClcbiAgICAgIGlmIChyZWFkaW5nKSByZXR1cm5cbiAgICAgIGRlc3Ryb3lzLmZvckVhY2goY2FsbClcbiAgICAgIGNhbGxiYWNrKGVycm9yKVxuICAgIH0pXG4gIH0pXG5cbiAgcmV0dXJuIHN0cmVhbXMucmVkdWNlKHBpcGUpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHVtcFxuIiwgIi8qXG5Db3B5cmlnaHQgKGMpIDIwMTQtMjAyMSwgTWF0dGVvIENvbGxpbmEgPGhlbGxvQG1hdHRlb2NvbGxpbmEuY29tPlxuXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZCwgcHJvdmlkZWQgdGhhdCB0aGUgYWJvdmVcbmNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2UgYXBwZWFyIGluIGFsbCBjb3BpZXMuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTXG5XSVRIIFJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GXG5NRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUlxuQU5ZIFNQRUNJQUwsIERJUkVDVCwgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFU1xuV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTSBMT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOXG5BQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1IgT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUlxuSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1IgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cbiovXG5cbid1c2Ugc3RyaWN0J1xuXG5jb25zdCB7IFRyYW5zZm9ybSB9ID0gcmVxdWlyZSgnc3RyZWFtJylcbmNvbnN0IHsgU3RyaW5nRGVjb2RlciB9ID0gcmVxdWlyZSgnc3RyaW5nX2RlY29kZXInKVxuY29uc3Qga0xhc3QgPSBTeW1ib2woJ2xhc3QnKVxuY29uc3Qga0RlY29kZXIgPSBTeW1ib2woJ2RlY29kZXInKVxuXG5mdW5jdGlvbiB0cmFuc2Zvcm0gKGNodW5rLCBlbmMsIGNiKSB7XG4gIGxldCBsaXN0XG4gIGlmICh0aGlzLm92ZXJmbG93KSB7IC8vIExpbmUgYnVmZmVyIGlzIGZ1bGwuIFNraXAgdG8gc3RhcnQgb2YgbmV4dCBsaW5lLlxuICAgIGNvbnN0IGJ1ZiA9IHRoaXNba0RlY29kZXJdLndyaXRlKGNodW5rKVxuICAgIGxpc3QgPSBidWYuc3BsaXQodGhpcy5tYXRjaGVyKVxuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSByZXR1cm4gY2IoKSAvLyBMaW5lIGVuZGluZyBub3QgZm91bmQuIERpc2NhcmQgZW50aXJlIGNodW5rLlxuXG4gICAgLy8gTGluZSBlbmRpbmcgZm91bmQuIERpc2NhcmQgdHJhaWxpbmcgZnJhZ21lbnQgb2YgcHJldmlvdXMgbGluZSBhbmQgcmVzZXQgb3ZlcmZsb3cgc3RhdGUuXG4gICAgbGlzdC5zaGlmdCgpXG4gICAgdGhpcy5vdmVyZmxvdyA9IGZhbHNlXG4gIH0gZWxzZSB7XG4gICAgdGhpc1trTGFzdF0gKz0gdGhpc1trRGVjb2Rlcl0ud3JpdGUoY2h1bmspXG4gICAgbGlzdCA9IHRoaXNba0xhc3RdLnNwbGl0KHRoaXMubWF0Y2hlcilcbiAgfVxuXG4gIHRoaXNba0xhc3RdID0gbGlzdC5wb3AoKVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHRyeSB7XG4gICAgICBwdXNoKHRoaXMsIHRoaXMubWFwcGVyKGxpc3RbaV0pKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gY2IoZXJyb3IpXG4gICAgfVxuICB9XG5cbiAgdGhpcy5vdmVyZmxvdyA9IHRoaXNba0xhc3RdLmxlbmd0aCA+IHRoaXMubWF4TGVuZ3RoXG4gIGlmICh0aGlzLm92ZXJmbG93ICYmICF0aGlzLnNraXBPdmVyZmxvdykge1xuICAgIGNiKG5ldyBFcnJvcignbWF4aW11bSBidWZmZXIgcmVhY2hlZCcpKVxuICAgIHJldHVyblxuICB9XG5cbiAgY2IoKVxufVxuXG5mdW5jdGlvbiBmbHVzaCAoY2IpIHtcbiAgLy8gZm9yd2FyZCBhbnkgZ2liYmVyaXNoIGxlZnQgaW4gdGhlcmVcbiAgdGhpc1trTGFzdF0gKz0gdGhpc1trRGVjb2Rlcl0uZW5kKClcblxuICBpZiAodGhpc1trTGFzdF0pIHtcbiAgICB0cnkge1xuICAgICAgcHVzaCh0aGlzLCB0aGlzLm1hcHBlcih0aGlzW2tMYXN0XSkpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBjYihlcnJvcilcbiAgICB9XG4gIH1cblxuICBjYigpXG59XG5cbmZ1bmN0aW9uIHB1c2ggKHNlbGYsIHZhbCkge1xuICBpZiAodmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICBzZWxmLnB1c2godmFsKVxuICB9XG59XG5cbmZ1bmN0aW9uIG5vb3AgKGluY29taW5nKSB7XG4gIHJldHVybiBpbmNvbWluZ1xufVxuXG5mdW5jdGlvbiBzcGxpdCAobWF0Y2hlciwgbWFwcGVyLCBvcHRpb25zKSB7XG4gIC8vIFNldCBkZWZhdWx0cyBmb3IgYW55IGFyZ3VtZW50cyBub3Qgc3VwcGxpZWQuXG4gIG1hdGNoZXIgPSBtYXRjaGVyIHx8IC9cXHI/XFxuL1xuICBtYXBwZXIgPSBtYXBwZXIgfHwgbm9vcFxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gIC8vIFRlc3QgYXJndW1lbnRzIGV4cGxpY2l0bHkuXG4gIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGNhc2UgMTpcbiAgICAgIC8vIElmIG1hcHBlciBpcyBvbmx5IGFyZ3VtZW50LlxuICAgICAgaWYgKHR5cGVvZiBtYXRjaGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG1hcHBlciA9IG1hdGNoZXJcbiAgICAgICAgbWF0Y2hlciA9IC9cXHI/XFxuL1xuICAgICAgLy8gSWYgb3B0aW9ucyBpcyBvbmx5IGFyZ3VtZW50LlxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWF0Y2hlciA9PT0gJ29iamVjdCcgJiYgIShtYXRjaGVyIGluc3RhbmNlb2YgUmVnRXhwKSAmJiAhbWF0Y2hlcltTeW1ib2wuc3BsaXRdKSB7XG4gICAgICAgIG9wdGlvbnMgPSBtYXRjaGVyXG4gICAgICAgIG1hdGNoZXIgPSAvXFxyP1xcbi9cbiAgICAgIH1cbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlIDI6XG4gICAgICAvLyBJZiBtYXBwZXIgYW5kIG9wdGlvbnMgYXJlIGFyZ3VtZW50cy5cbiAgICAgIGlmICh0eXBlb2YgbWF0Y2hlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvcHRpb25zID0gbWFwcGVyXG4gICAgICAgIG1hcHBlciA9IG1hdGNoZXJcbiAgICAgICAgbWF0Y2hlciA9IC9cXHI/XFxuL1xuICAgICAgLy8gSWYgbWF0Y2hlciBhbmQgb3B0aW9ucyBhcmUgYXJndW1lbnRzLlxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWFwcGVyID09PSAnb2JqZWN0Jykge1xuICAgICAgICBvcHRpb25zID0gbWFwcGVyXG4gICAgICAgIG1hcHBlciA9IG5vb3BcbiAgICAgIH1cbiAgfVxuXG4gIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKVxuICBvcHRpb25zLmF1dG9EZXN0cm95ID0gdHJ1ZVxuICBvcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuICBvcHRpb25zLmZsdXNoID0gZmx1c2hcbiAgb3B0aW9ucy5yZWFkYWJsZU9iamVjdE1vZGUgPSB0cnVlXG5cbiAgY29uc3Qgc3RyZWFtID0gbmV3IFRyYW5zZm9ybShvcHRpb25zKVxuXG4gIHN0cmVhbVtrTGFzdF0gPSAnJ1xuICBzdHJlYW1ba0RlY29kZXJdID0gbmV3IFN0cmluZ0RlY29kZXIoJ3V0ZjgnKVxuICBzdHJlYW0ubWF0Y2hlciA9IG1hdGNoZXJcbiAgc3RyZWFtLm1hcHBlciA9IG1hcHBlclxuICBzdHJlYW0ubWF4TGVuZ3RoID0gb3B0aW9ucy5tYXhMZW5ndGhcbiAgc3RyZWFtLnNraXBPdmVyZmxvdyA9IG9wdGlvbnMuc2tpcE92ZXJmbG93IHx8IGZhbHNlXG4gIHN0cmVhbS5vdmVyZmxvdyA9IGZhbHNlXG4gIHN0cmVhbS5fZGVzdHJveSA9IGZ1bmN0aW9uIChlcnIsIGNiKSB7XG4gICAgLy8gV2VpcmQgTm9kZSB2MTIgYnVnIHRoYXQgd2UgbmVlZCB0byB3b3JrIGFyb3VuZFxuICAgIHRoaXMuX3dyaXRhYmxlU3RhdGUuZXJyb3JFbWl0dGVkID0gZmFsc2VcbiAgICBjYihlcnIpXG4gIH1cblxuICByZXR1cm4gc3RyZWFtXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3BsaXRcbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgbWV0YWRhdGEgPSBTeW1ib2wuZm9yKCdwaW5vLm1ldGFkYXRhJylcbmNvbnN0IHNwbGl0ID0gcmVxdWlyZSgnc3BsaXQyJylcbmNvbnN0IHsgRHVwbGV4IH0gPSByZXF1aXJlKCdzdHJlYW0nKVxuY29uc3QgeyBwYXJlbnRQb3J0LCB3b3JrZXJEYXRhIH0gPSByZXF1aXJlKCd3b3JrZXJfdGhyZWFkcycpXG5cbmZ1bmN0aW9uIGNyZWF0ZURlZmVycmVkICgpIHtcbiAgbGV0IHJlc29sdmVcbiAgbGV0IHJlamVjdFxuICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKF9yZXNvbHZlLCBfcmVqZWN0KSA9PiB7XG4gICAgcmVzb2x2ZSA9IF9yZXNvbHZlXG4gICAgcmVqZWN0ID0gX3JlamVjdFxuICB9KVxuICBwcm9taXNlLnJlc29sdmUgPSByZXNvbHZlXG4gIHByb21pc2UucmVqZWN0ID0gcmVqZWN0XG4gIHJldHVybiBwcm9taXNlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGQgKGZuLCBvcHRzID0ge30pIHtcbiAgY29uc3Qgd2FpdEZvckNvbmZpZyA9IG9wdHMuZXhwZWN0UGlub0NvbmZpZyA9PT0gdHJ1ZSAmJiB3b3JrZXJEYXRhPy53b3JrZXJEYXRhPy5waW5vV2lsbFNlbmRDb25maWcgPT09IHRydWVcbiAgY29uc3QgcGFyc2VMaW5lcyA9IG9wdHMucGFyc2UgPT09ICdsaW5lcydcbiAgY29uc3QgcGFyc2VMaW5lID0gdHlwZW9mIG9wdHMucGFyc2VMaW5lID09PSAnZnVuY3Rpb24nID8gb3B0cy5wYXJzZUxpbmUgOiBKU09OLnBhcnNlXG4gIGNvbnN0IGNsb3NlID0gb3B0cy5jbG9zZSB8fCBkZWZhdWx0Q2xvc2VcbiAgY29uc3Qgc3RyZWFtID0gc3BsaXQoZnVuY3Rpb24gKGxpbmUpIHtcbiAgICBsZXQgdmFsdWVcblxuICAgIHRyeSB7XG4gICAgICB2YWx1ZSA9IHBhcnNlTGluZShsaW5lKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLmVtaXQoJ3Vua25vd24nLCBsaW5lLCBlcnJvcilcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5lbWl0KCd1bmtub3duJywgbGluZSwgJ051bGwgdmFsdWUgaWdub3JlZCcpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgdmFsdWUgPSB7XG4gICAgICAgIGRhdGE6IHZhbHVlLFxuICAgICAgICB0aW1lOiBEYXRlLm5vdygpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN0cmVhbVttZXRhZGF0YV0pIHtcbiAgICAgIHN0cmVhbS5sYXN0VGltZSA9IHZhbHVlLnRpbWVcbiAgICAgIHN0cmVhbS5sYXN0TGV2ZWwgPSB2YWx1ZS5sZXZlbFxuICAgICAgc3RyZWFtLmxhc3RPYmogPSB2YWx1ZVxuICAgIH1cblxuICAgIGlmIChwYXJzZUxpbmVzKSB7XG4gICAgICByZXR1cm4gbGluZVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZVxuICB9LCB7IGF1dG9EZXN0cm95OiB0cnVlIH0pXG5cbiAgc3RyZWFtLl9kZXN0cm95ID0gZnVuY3Rpb24gKGVyciwgY2IpIHtcbiAgICBjb25zdCBwcm9taXNlID0gY2xvc2UoZXJyLCBjYilcbiAgICBpZiAocHJvbWlzZSAmJiB0eXBlb2YgcHJvbWlzZS50aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBwcm9taXNlLnRoZW4oY2IsIGNiKVxuICAgIH1cbiAgfVxuXG4gIGlmIChvcHRzLmV4cGVjdFBpbm9Db25maWcgPT09IHRydWUgJiYgd29ya2VyRGF0YT8ud29ya2VyRGF0YT8ucGlub1dpbGxTZW5kQ29uZmlnICE9PSB0cnVlKSB7XG4gICAgc2V0SW1tZWRpYXRlKCgpID0+IHtcbiAgICAgIHN0cmVhbS5lbWl0KCdlcnJvcicsIG5ldyBFcnJvcignVGhpcyB0cmFuc3BvcnQgaXMgbm90IGNvbXBhdGlibGUgd2l0aCB0aGUgY3VycmVudCB2ZXJzaW9uIG9mIHBpbm8uIFBsZWFzZSB1cGdyYWRlIHBpbm8gdG8gdGhlIGxhdGVzdCB2ZXJzaW9uLicpKVxuICAgIH0pXG4gIH1cblxuICBpZiAob3B0cy5tZXRhZGF0YSAhPT0gZmFsc2UpIHtcbiAgICBzdHJlYW1bbWV0YWRhdGFdID0gdHJ1ZVxuICAgIHN0cmVhbS5sYXN0VGltZSA9IDBcbiAgICBzdHJlYW0ubGFzdExldmVsID0gMFxuICAgIHN0cmVhbS5sYXN0T2JqID0gbnVsbFxuICB9XG5cbiAgaWYgKHdhaXRGb3JDb25maWcpIHtcbiAgICBsZXQgcGlub0NvbmZpZyA9IHt9XG4gICAgY29uc3QgY29uZmlnUmVjZWl2ZWQgPSBjcmVhdGVEZWZlcnJlZCgpXG4gICAgcGFyZW50UG9ydC5vbignbWVzc2FnZScsIGZ1bmN0aW9uIGhhbmRsZU1lc3NhZ2UgKG1lc3NhZ2UpIHtcbiAgICAgIGlmIChtZXNzYWdlLmNvZGUgPT09ICdQSU5PX0NPTkZJRycpIHtcbiAgICAgICAgcGlub0NvbmZpZyA9IG1lc3NhZ2UuY29uZmlnXG4gICAgICAgIGNvbmZpZ1JlY2VpdmVkLnJlc29sdmUoKVxuICAgICAgICBwYXJlbnRQb3J0Lm9mZignbWVzc2FnZScsIGhhbmRsZU1lc3NhZ2UpXG4gICAgICB9XG4gICAgfSlcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHN0cmVhbSwge1xuICAgICAgbGV2ZWxzOiB7XG4gICAgICAgIGdldCAoKSB7IHJldHVybiBwaW5vQ29uZmlnLmxldmVscyB9XG4gICAgICB9LFxuICAgICAgbWVzc2FnZUtleToge1xuICAgICAgICBnZXQgKCkgeyByZXR1cm4gcGlub0NvbmZpZy5tZXNzYWdlS2V5IH1cbiAgICAgIH0sXG4gICAgICBlcnJvcktleToge1xuICAgICAgICBnZXQgKCkgeyByZXR1cm4gcGlub0NvbmZpZy5lcnJvcktleSB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBjb25maWdSZWNlaXZlZC50aGVuKGZpbmlzaClcbiAgfVxuXG4gIHJldHVybiBmaW5pc2goKVxuXG4gIGZ1bmN0aW9uIGZpbmlzaCAoKSB7XG4gICAgbGV0IHJlcyA9IGZuKHN0cmVhbSlcblxuICAgIGlmIChyZXMgJiYgdHlwZW9mIHJlcy5jYXRjaCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVzLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgc3RyZWFtLmRlc3Ryb3koZXJyKVxuICAgICAgfSlcblxuICAgICAgLy8gc2V0IGl0IHRvIG51bGwgdG8gbm90IHJldGFpbiBhIHJlZmVyZW5jZSB0byB0aGUgcHJvbWlzZVxuICAgICAgcmVzID0gbnVsbFxuICAgIH0gZWxzZSBpZiAob3B0cy5lbmFibGVQaXBlbGluaW5nICYmIHJlcykge1xuICAgICAgcmV0dXJuIER1cGxleC5mcm9tKHsgd3JpdGFibGU6IHN0cmVhbSwgcmVhZGFibGU6IHJlcyB9KVxuICAgIH1cblxuICAgIHJldHVybiBzdHJlYW1cbiAgfVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0Q2xvc2UgKGVyciwgY2IpIHtcbiAgcHJvY2Vzcy5uZXh0VGljayhjYiwgZXJyKVxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIEEgc2V0IG9mIHByb3BlcnR5IG5hbWVzIHRoYXQgaW5kaWNhdGUgdGhlIHZhbHVlIHJlcHJlc2VudHMgYW4gZXJyb3Igb2JqZWN0LlxuICpcbiAqIEB0eXBlZGVmIHtzdHJpbmdbXX0gS19FUlJPUl9MSUtFX0tFWVNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgREFURV9GT1JNQVQ6ICd5eXl5LW1tLWRkIEhIOk1NOnNzLmwgbycsXG4gIERBVEVfRk9STUFUX1NJTVBMRTogJ0hIOk1NOnNzLmwnLFxuXG4gIC8qKlxuICAgKiBAdHlwZSB7S19FUlJPUl9MSUtFX0tFWVN9XG4gICAqL1xuICBFUlJPUl9MSUtFX0tFWVM6IFsnZXJyJywgJ2Vycm9yJ10sXG5cbiAgTUVTU0FHRV9LRVk6ICdtc2cnLFxuXG4gIExFVkVMX0tFWTogJ2xldmVsJyxcblxuICBMRVZFTF9MQUJFTDogJ2xldmVsTGFiZWwnLFxuXG4gIFRJTUVTVEFNUF9LRVk6ICd0aW1lJyxcblxuICBMRVZFTFM6IHtcbiAgICBkZWZhdWx0OiAnVVNFUkxWTCcsXG4gICAgNjA6ICdGQVRBTCcsXG4gICAgNTA6ICdFUlJPUicsXG4gICAgNDA6ICdXQVJOJyxcbiAgICAzMDogJ0lORk8nLFxuICAgIDIwOiAnREVCVUcnLFxuICAgIDEwOiAnVFJBQ0UnXG4gIH0sXG5cbiAgTEVWRUxfTkFNRVM6IHtcbiAgICBmYXRhbDogNjAsXG4gICAgZXJyb3I6IDUwLFxuICAgIHdhcm46IDQwLFxuICAgIGluZm86IDMwLFxuICAgIGRlYnVnOiAyMCxcbiAgICB0cmFjZTogMTBcbiAgfSxcblxuICAvLyBPYmplY3Qga2V5cyB0aGF0IHByb2JhYmx5IGNhbWUgZnJvbSBhIGxvZ2dlciBsaWtlIFBpbm8gb3IgQnVueWFuLlxuICBMT0dHRVJfS0VZUzogW1xuICAgICdwaWQnLFxuICAgICdob3N0bmFtZScsXG4gICAgJ25hbWUnLFxuICAgICdsZXZlbCcsXG4gICAgJ3RpbWUnLFxuICAgICd0aW1lc3RhbXAnLFxuICAgICdjYWxsZXInXG4gIF1cbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRMZXZlbExhYmVsRGF0YVxuY29uc3QgeyBMRVZFTFMsIExFVkVMX05BTUVTIH0gPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKVxuXG4vKipcbiAqIEdpdmVuIGluaXRpYWwgc2V0dGluZ3MgZm9yIGN1c3RvbSBsZXZlbHMvbmFtZXMgYW5kIHVzZSBvZiBvbmx5IGN1c3RvbSBwcm9wc1xuICogZ2V0IHRoZSBsZXZlbCBsYWJlbCB0aGF0IGNvcnJlc3BvbmRzIHdpdGggYSBnaXZlbiBsZXZlbCBudW1iZXJcbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHVzZU9ubHlDdXN0b21Qcm9wc1xuICogQHBhcmFtIHtvYmplY3R9IGN1c3RvbUxldmVsc1xuICogQHBhcmFtIHtvYmplY3R9IGN1c3RvbUxldmVsTmFtZXNcbiAqXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIG51bWJlciBsZXZlbCBhbmQgcmV0dXJucyB0aGUgbGV2ZWwncyBsYWJlbCBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gZ2V0TGV2ZWxMYWJlbERhdGEgKHVzZU9ubHlDdXN0b21Qcm9wcywgY3VzdG9tTGV2ZWxzLCBjdXN0b21MZXZlbE5hbWVzKSB7XG4gIGNvbnN0IGxldmVscyA9IHVzZU9ubHlDdXN0b21Qcm9wcyA/IGN1c3RvbUxldmVscyB8fCBMRVZFTFMgOiBPYmplY3QuYXNzaWduKHt9LCBMRVZFTFMsIGN1c3RvbUxldmVscylcbiAgY29uc3QgbGV2ZWxOYW1lcyA9IHVzZU9ubHlDdXN0b21Qcm9wcyA/IGN1c3RvbUxldmVsTmFtZXMgfHwgTEVWRUxfTkFNRVMgOiBPYmplY3QuYXNzaWduKHt9LCBMRVZFTF9OQU1FUywgY3VzdG9tTGV2ZWxOYW1lcylcbiAgcmV0dXJuIGZ1bmN0aW9uIChsZXZlbCkge1xuICAgIGxldCBsZXZlbE51bSA9ICdkZWZhdWx0J1xuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKCtsZXZlbCkpIHtcbiAgICAgIGxldmVsTnVtID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGxldmVscywgbGV2ZWwpID8gbGV2ZWwgOiBsZXZlbE51bVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXZlbE51bSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChsZXZlbE5hbWVzLCBsZXZlbC50b0xvd2VyQ2FzZSgpKSA/IGxldmVsTmFtZXNbbGV2ZWwudG9Mb3dlckNhc2UoKV0gOiBsZXZlbE51bVxuICAgIH1cblxuICAgIHJldHVybiBbbGV2ZWxzW2xldmVsTnVtXSwgbGV2ZWxOdW1dXG4gIH1cbn1cbiIsICIndXNlIHN0cmljdCdcblxuY29uc3Qgbm9jb2xvciA9IGlucHV0ID0+IGlucHV0XG5jb25zdCBwbGFpbiA9IHtcbiAgZGVmYXVsdDogbm9jb2xvcixcbiAgNjA6IG5vY29sb3IsXG4gIDUwOiBub2NvbG9yLFxuICA0MDogbm9jb2xvcixcbiAgMzA6IG5vY29sb3IsXG4gIDIwOiBub2NvbG9yLFxuICAxMDogbm9jb2xvcixcbiAgbWVzc2FnZTogbm9jb2xvcixcbiAgZ3JleU1lc3NhZ2U6IG5vY29sb3IsXG4gIHByb3BlcnR5OiBub2NvbG9yXG59XG5cbmNvbnN0IHsgY3JlYXRlQ29sb3JzIH0gPSByZXF1aXJlKCdjb2xvcmV0dGUnKVxuY29uc3QgZ2V0TGV2ZWxMYWJlbERhdGEgPSByZXF1aXJlKCcuL3V0aWxzL2dldC1sZXZlbC1sYWJlbC1kYXRhJylcbmNvbnN0IGF2YWlsYWJsZUNvbG9ycyA9IGNyZWF0ZUNvbG9ycyh7IHVzZUNvbG9yOiB0cnVlIH0pXG5jb25zdCB7IHdoaXRlLCBiZ1JlZCwgcmVkLCB5ZWxsb3csIGdyZWVuLCBibHVlLCBncmF5LCBjeWFuLCBtYWdlbnRhIH0gPSBhdmFpbGFibGVDb2xvcnNcblxuY29uc3QgY29sb3JlZCA9IHtcbiAgZGVmYXVsdDogd2hpdGUsXG4gIDYwOiBiZ1JlZCxcbiAgNTA6IHJlZCxcbiAgNDA6IHllbGxvdyxcbiAgMzA6IGdyZWVuLFxuICAyMDogYmx1ZSxcbiAgMTA6IGdyYXksXG4gIG1lc3NhZ2U6IGN5YW4sXG4gIGdyZXlNZXNzYWdlOiBncmF5LFxuICBwcm9wZXJ0eTogbWFnZW50YVxufVxuXG5mdW5jdGlvbiByZXNvbHZlQ3VzdG9tQ29sb3JlZENvbG9yaXplciAoY3VzdG9tQ29sb3JzKSB7XG4gIHJldHVybiBjdXN0b21Db2xvcnMucmVkdWNlKFxuICAgIGZ1bmN0aW9uIChhZ2csIFtsZXZlbCwgY29sb3JdKSB7XG4gICAgICBhZ2dbbGV2ZWxdID0gdHlwZW9mIGF2YWlsYWJsZUNvbG9yc1tjb2xvcl0gPT09ICdmdW5jdGlvbicgPyBhdmFpbGFibGVDb2xvcnNbY29sb3JdIDogd2hpdGVcblxuICAgICAgcmV0dXJuIGFnZ1xuICAgIH0sXG4gICAgeyBkZWZhdWx0OiB3aGl0ZSwgbWVzc2FnZTogY3lhbiwgZ3JleU1lc3NhZ2U6IGdyYXksIHByb3BlcnR5OiBtYWdlbnRhIH1cbiAgKVxufVxuXG5mdW5jdGlvbiBjb2xvcml6ZUxldmVsICh1c2VPbmx5Q3VzdG9tUHJvcHMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChsZXZlbCwgY29sb3JpemVyLCB7IGN1c3RvbUxldmVscywgY3VzdG9tTGV2ZWxOYW1lcyB9ID0ge30pIHtcbiAgICBjb25zdCBbbGV2ZWxTdHIsIGxldmVsTnVtXSA9IGdldExldmVsTGFiZWxEYXRhKHVzZU9ubHlDdXN0b21Qcm9wcywgY3VzdG9tTGV2ZWxzLCBjdXN0b21MZXZlbE5hbWVzKShsZXZlbClcblxuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29sb3JpemVyLCBsZXZlbE51bSkgPyBjb2xvcml6ZXJbbGV2ZWxOdW1dKGxldmVsU3RyKSA6IGNvbG9yaXplci5kZWZhdWx0KGxldmVsU3RyKVxuICB9XG59XG5cbmZ1bmN0aW9uIHBsYWluQ29sb3JpemVyICh1c2VPbmx5Q3VzdG9tUHJvcHMpIHtcbiAgY29uc3QgbmV3UGxhaW5Db2xvcml6ZXIgPSBjb2xvcml6ZUxldmVsKHVzZU9ubHlDdXN0b21Qcm9wcylcbiAgY29uc3QgY3VzdG9tQ29sb3JlZENvbG9yaXplciA9IGZ1bmN0aW9uIChsZXZlbCwgb3B0cykge1xuICAgIHJldHVybiBuZXdQbGFpbkNvbG9yaXplcihsZXZlbCwgcGxhaW4sIG9wdHMpXG4gIH1cbiAgY3VzdG9tQ29sb3JlZENvbG9yaXplci5tZXNzYWdlID0gcGxhaW4ubWVzc2FnZVxuICBjdXN0b21Db2xvcmVkQ29sb3JpemVyLmdyZXlNZXNzYWdlID0gcGxhaW4uZ3JleU1lc3NhZ2VcbiAgY3VzdG9tQ29sb3JlZENvbG9yaXplci5wcm9wZXJ0eSA9IHBsYWluLnByb3BlcnR5XG4gIGN1c3RvbUNvbG9yZWRDb2xvcml6ZXIuY29sb3JzID0gY3JlYXRlQ29sb3JzKHsgdXNlQ29sb3I6IGZhbHNlIH0pXG4gIHJldHVybiBjdXN0b21Db2xvcmVkQ29sb3JpemVyXG59XG5cbmZ1bmN0aW9uIGNvbG9yZWRDb2xvcml6ZXIgKHVzZU9ubHlDdXN0b21Qcm9wcykge1xuICBjb25zdCBuZXdDb2xvcmVkQ29sb3JpemVyID0gY29sb3JpemVMZXZlbCh1c2VPbmx5Q3VzdG9tUHJvcHMpXG4gIGNvbnN0IGN1c3RvbUNvbG9yZWRDb2xvcml6ZXIgPSBmdW5jdGlvbiAobGV2ZWwsIG9wdHMpIHtcbiAgICByZXR1cm4gbmV3Q29sb3JlZENvbG9yaXplcihsZXZlbCwgY29sb3JlZCwgb3B0cylcbiAgfVxuICBjdXN0b21Db2xvcmVkQ29sb3JpemVyLm1lc3NhZ2UgPSBjb2xvcmVkLm1lc3NhZ2VcbiAgY3VzdG9tQ29sb3JlZENvbG9yaXplci5wcm9wZXJ0eSA9IGNvbG9yZWQucHJvcGVydHlcbiAgY3VzdG9tQ29sb3JlZENvbG9yaXplci5ncmV5TWVzc2FnZSA9IGNvbG9yZWQuZ3JleU1lc3NhZ2VcbiAgY3VzdG9tQ29sb3JlZENvbG9yaXplci5jb2xvcnMgPSBhdmFpbGFibGVDb2xvcnNcbiAgcmV0dXJuIGN1c3RvbUNvbG9yZWRDb2xvcml6ZXJcbn1cblxuZnVuY3Rpb24gY3VzdG9tQ29sb3JlZENvbG9yaXplckZhY3RvcnkgKGN1c3RvbUNvbG9ycywgdXNlT25seUN1c3RvbVByb3BzKSB7XG4gIGNvbnN0IG9ubHlDdXN0b21Db2xvcmVkID0gcmVzb2x2ZUN1c3RvbUNvbG9yZWRDb2xvcml6ZXIoY3VzdG9tQ29sb3JzKVxuICBjb25zdCBjdXN0b21Db2xvcmVkID0gdXNlT25seUN1c3RvbVByb3BzID8gb25seUN1c3RvbUNvbG9yZWQgOiBPYmplY3QuYXNzaWduKHt9LCBjb2xvcmVkLCBvbmx5Q3VzdG9tQ29sb3JlZClcbiAgY29uc3QgY29sb3JpemVMZXZlbEN1c3RvbSA9IGNvbG9yaXplTGV2ZWwodXNlT25seUN1c3RvbVByb3BzKVxuXG4gIGNvbnN0IGN1c3RvbUNvbG9yZWRDb2xvcml6ZXIgPSBmdW5jdGlvbiAobGV2ZWwsIG9wdHMpIHtcbiAgICByZXR1cm4gY29sb3JpemVMZXZlbEN1c3RvbShsZXZlbCwgY3VzdG9tQ29sb3JlZCwgb3B0cylcbiAgfVxuICBjdXN0b21Db2xvcmVkQ29sb3JpemVyLmNvbG9ycyA9IGF2YWlsYWJsZUNvbG9yc1xuICBjdXN0b21Db2xvcmVkQ29sb3JpemVyLm1lc3NhZ2UgPSBjdXN0b21Db2xvcmVkQ29sb3JpemVyLm1lc3NhZ2UgfHwgY3VzdG9tQ29sb3JlZC5tZXNzYWdlXG4gIGN1c3RvbUNvbG9yZWRDb2xvcml6ZXIucHJvcGVydHkgPSBjdXN0b21Db2xvcmVkQ29sb3JpemVyLnByb3BlcnR5IHx8IGN1c3RvbUNvbG9yZWQucHJvcGVydHlcbiAgY3VzdG9tQ29sb3JlZENvbG9yaXplci5ncmV5TWVzc2FnZSA9IGN1c3RvbUNvbG9yZWRDb2xvcml6ZXIuZ3JleU1lc3NhZ2UgfHwgY3VzdG9tQ29sb3JlZC5ncmV5TWVzc2FnZVxuXG4gIHJldHVybiBjdXN0b21Db2xvcmVkQ29sb3JpemVyXG59XG5cbi8qKlxuICogQXBwbGllcyBjb2xvcml6YXRpb24sIGlmIHBvc3NpYmxlLCB0byBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHBhc3NlZCBpblxuICogYGxldmVsYC4gRm9yIGV4YW1wbGUsIHRoZSBkZWZhdWx0IGNvbG9yaXplciB3aWxsIHJldHVybiBhIFwiZ3JlZW5cIiBjb2xvcmVkXG4gKiBzdHJpbmcgZm9yIHRoZSBcImluZm9cIiBsZXZlbC5cbiAqXG4gKiBAdHlwZWRlZiB7ZnVuY3Rpb259IENvbG9yaXplckZ1bmNcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gbGV2ZWwgSW4gZWl0aGVyIGNhc2UsIHRoZSBpbnB1dCB3aWxsIG1hcCB0byBhIGNvbG9yXG4gKiBmb3IgdGhlIHNwZWNpZmllZCBsZXZlbCBvciB0byB0aGUgY29sb3IgZm9yIGBVU0VSTFZMYCBpZiB0aGUgbGV2ZWwgaXMgbm90XG4gKiByZWNvZ25pemVkLlxuICogQHByb3BlcnR5IHtmdW5jdGlvbn0gbWVzc2FnZSBBY2NlcHRzIG9uZSBzdHJpbmcgcGFyYW1ldGVyIHRoYXQgd2lsbCBiZVxuICogY29sb3JpemVkIHRvIGEgcHJlZGVmaW5lZCBjb2xvci5cbiAqIEBwcm9wZXJ0eSB7Q29sb3JldHRlLkNvbG9yZXR0ZX0gY29sb3JzIEF2YWlsYWJsZSBjb2xvciBmdW5jdGlvbnMgYmFzZWQgb24gYHVzZUNvbG9yYCAob3IgYGNvbG9yaXplYCkgY29udGV4dFxuICovXG5cbi8qKlxuICogRmFjdG9yeSBmdW5jdGlvbiBnZXQgYSBmdW5jdGlvbiB0byBjb2xvcml6ZWQgbGV2ZWxzLiBUaGUgcmV0dXJuZWQgZnVuY3Rpb25cbiAqIGFsc28gaW5jbHVkZXMgYSBgLm1lc3NhZ2Uoc3RyKWAgbWV0aG9kIHRvIGNvbG9yaXplIHN0cmluZ3MuXG4gKlxuICogQHBhcmFtIHtib29sZWFufSBbdXNlQ29sb3JzPWZhbHNlXSBXaGVuIGB0cnVlYCBhIGZ1bmN0aW9uIHRoYXQgYXBwbGllcyBzdGFuZGFyZFxuICogdGVybWluYWwgY29sb3JzIGlzIHJldHVybmVkLlxuICogQHBhcmFtIHthcnJheVtdfSBbY3VzdG9tQ29sb3JzXSBUdXBsZSB3aGVyZSBmaXJzdCBpdGVtIG9mIGVhY2ggYXJyYXkgaXMgdGhlXG4gKiBsZXZlbCBpbmRleCBhbmQgdGhlIHNlY29uZCBpdGVtIGlzIHRoZSBjb2xvclxuICogQHBhcmFtIHtib29sZWFufSBbdXNlT25seUN1c3RvbVByb3BzXSBXaGVuIGB0cnVlYCwgb25seSB1c2UgdGhlIHByb3ZpZGVkXG4gKiBjdXN0b20gY29sb3JzIHByb3ZpZGVkIGFuZCBub3QgZmFsbGJhY2sgdG8gZGVmYXVsdFxuICpcbiAqIEByZXR1cm5zIHtDb2xvcml6ZXJGdW5jfSBgZnVuY3Rpb24gKGxldmVsKSB7fWAgaGFzIGEgYC5tZXNzYWdlKHN0cilgIG1ldGhvZCB0b1xuICogYXBwbHkgY29sb3JpemF0aW9uIHRvIGEgc3RyaW5nLiBUaGUgY29yZSBmdW5jdGlvbiBhY2NlcHRzIGVpdGhlciBhbiBpbnRlZ2VyXG4gKiBgbGV2ZWxgIG9yIGEgYHN0cmluZ2AgbGV2ZWwuIFRoZSBpbnRlZ2VyIGxldmVsIHdpbGwgbWFwIHRvIGEga25vd24gbGV2ZWxcbiAqIHN0cmluZyBvciB0byBgVVNFUkxWTGAgaWYgbm90IGtub3duLiAgVGhlIHN0cmluZyBgbGV2ZWxgIHdpbGwgbWFwIHRvIHRoZSBzYW1lXG4gKiBjb2xvcnMgYXMgdGhlIGludGVnZXIgYGxldmVsYCBhbmQgd2lsbCBhbHNvIGRlZmF1bHQgdG8gYFVTRVJMVkxgIGlmIHRoZSBnaXZlblxuICogc3RyaW5nIGlzIG5vdCBhIHJlY29nbml6ZWQgbGV2ZWwgbmFtZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRDb2xvcml6ZXIgKHVzZUNvbG9ycyA9IGZhbHNlLCBjdXN0b21Db2xvcnMsIHVzZU9ubHlDdXN0b21Qcm9wcykge1xuICBpZiAodXNlQ29sb3JzICYmIGN1c3RvbUNvbG9ycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGN1c3RvbUNvbG9yZWRDb2xvcml6ZXJGYWN0b3J5KGN1c3RvbUNvbG9ycywgdXNlT25seUN1c3RvbVByb3BzKVxuICB9IGVsc2UgaWYgKHVzZUNvbG9ycykge1xuICAgIHJldHVybiBjb2xvcmVkQ29sb3JpemVyKHVzZU9ubHlDdXN0b21Qcm9wcylcbiAgfVxuXG4gIHJldHVybiBwbGFpbkNvbG9yaXplcih1c2VPbmx5Q3VzdG9tUHJvcHMpXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbi8qIGdsb2JhbCBTaGFyZWRBcnJheUJ1ZmZlciwgQXRvbWljcyAqL1xuXG5pZiAodHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgQXRvbWljcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgY29uc3QgbmlsID0gbmV3IEludDMyQXJyYXkobmV3IFNoYXJlZEFycmF5QnVmZmVyKDQpKVxuXG4gIGZ1bmN0aW9uIHNsZWVwIChtcykge1xuICAgIC8vIGFsc28gZmlsdGVycyBvdXQgTmFOLCBub24tbnVtYmVyIHR5cGVzLCBpbmNsdWRpbmcgZW1wdHkgc3RyaW5ncywgYnV0IGFsbG93cyBiaWdpbnRzXG4gICAgY29uc3QgdmFsaWQgPSBtcyA+IDAgJiYgbXMgPCBJbmZpbml0eSBcbiAgICBpZiAodmFsaWQgPT09IGZhbHNlKSB7XG4gICAgICBpZiAodHlwZW9mIG1zICE9PSAnbnVtYmVyJyAmJiB0eXBlb2YgbXMgIT09ICdiaWdpbnQnKSB7XG4gICAgICAgIHRocm93IFR5cGVFcnJvcignc2xlZXA6IG1zIG11c3QgYmUgYSBudW1iZXInKVxuICAgICAgfVxuICAgICAgdGhyb3cgUmFuZ2VFcnJvcignc2xlZXA6IG1zIG11c3QgYmUgYSBudW1iZXIgdGhhdCBpcyBncmVhdGVyIHRoYW4gMCBidXQgbGVzcyB0aGFuIEluZmluaXR5JylcbiAgICB9XG5cbiAgICBBdG9taWNzLndhaXQobmlsLCAwLCAwLCBOdW1iZXIobXMpKVxuICB9XG4gIG1vZHVsZS5leHBvcnRzID0gc2xlZXBcbn0gZWxzZSB7XG5cbiAgZnVuY3Rpb24gc2xlZXAgKG1zKSB7XG4gICAgLy8gYWxzbyBmaWx0ZXJzIG91dCBOYU4sIG5vbi1udW1iZXIgdHlwZXMsIGluY2x1ZGluZyBlbXB0eSBzdHJpbmdzLCBidXQgYWxsb3dzIGJpZ2ludHNcbiAgICBjb25zdCB2YWxpZCA9IG1zID4gMCAmJiBtcyA8IEluZmluaXR5IFxuICAgIGlmICh2YWxpZCA9PT0gZmFsc2UpIHtcbiAgICAgIGlmICh0eXBlb2YgbXMgIT09ICdudW1iZXInICYmIHR5cGVvZiBtcyAhPT0gJ2JpZ2ludCcpIHtcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdzbGVlcDogbXMgbXVzdCBiZSBhIG51bWJlcicpXG4gICAgICB9XG4gICAgICB0aHJvdyBSYW5nZUVycm9yKCdzbGVlcDogbXMgbXVzdCBiZSBhIG51bWJlciB0aGF0IGlzIGdyZWF0ZXIgdGhhbiAwIGJ1dCBsZXNzIHRoYW4gSW5maW5pdHknKVxuICAgIH1cbiAgICBjb25zdCB0YXJnZXQgPSBEYXRlLm5vdygpICsgTnVtYmVyKG1zKVxuICAgIHdoaWxlICh0YXJnZXQgPiBEYXRlLm5vdygpKXt9XG4gIH1cblxuICBtb2R1bGUuZXhwb3J0cyA9IHNsZWVwXG5cbn1cbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG5jb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKVxuY29uc3QgaW5oZXJpdHMgPSByZXF1aXJlKCd1dGlsJykuaW5oZXJpdHNcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IHNsZWVwID0gcmVxdWlyZSgnYXRvbWljLXNsZWVwJylcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5cbmNvbnN0IEJVU1lfV1JJVEVfVElNRU9VVCA9IDEwMFxuY29uc3Qga0VtcHR5QnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKDApXG5cbi8vIDE2IEtCLiBEb24ndCB3cml0ZSBtb3JlIHRoYW4gZG9ja2VyIGJ1ZmZlciBzaXplLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL21vYnkvbW9ieS9ibG9iLzUxM2VjNzM4MzEyNjk5NDdkMzhhNjQ0YzI3OGNlM2NhYzM2NzgzYjIvZGFlbW9uL2xvZ2dlci9jb3BpZXIuZ28jTDEzXG5jb25zdCBNQVhfV1JJVEUgPSAxNiAqIDEwMjRcblxuY29uc3Qga0NvbnRlbnRNb2RlQnVmZmVyID0gJ2J1ZmZlcidcbmNvbnN0IGtDb250ZW50TW9kZVV0ZjggPSAndXRmOCdcblxuY29uc3QgW21ham9yLCBtaW5vcl0gPSAocHJvY2Vzcy52ZXJzaW9ucy5ub2RlIHx8ICcwLjAnKS5zcGxpdCgnLicpLm1hcChOdW1iZXIpXG5jb25zdCBrQ29weUJ1ZmZlciA9IG1ham9yID49IDIyICYmIG1pbm9yID49IDdcblxuZnVuY3Rpb24gb3BlbkZpbGUgKGZpbGUsIHNvbmljKSB7XG4gIHNvbmljLl9vcGVuaW5nID0gdHJ1ZVxuICBzb25pYy5fd3JpdGluZyA9IHRydWVcbiAgc29uaWMuX2FzeW5jRHJhaW5TY2hlZHVsZWQgPSBmYWxzZVxuXG4gIC8vIE5PVEU6ICdlcnJvcicgYW5kICdyZWFkeScgZXZlbnRzIGVtaXR0ZWQgYmVsb3cgb25seSByZWxldmFudCB3aGVuIHNvbmljLnN5bmM9PT1mYWxzZVxuICAvLyBmb3Igc3luYyBtb2RlLCB0aGVyZSBpcyBubyB3YXkgdG8gYWRkIGEgbGlzdGVuZXIgdGhhdCB3aWxsIHJlY2VpdmUgdGhlc2VcblxuICBmdW5jdGlvbiBmaWxlT3BlbmVkIChlcnIsIGZkKSB7XG4gICAgaWYgKGVycikge1xuICAgICAgc29uaWMuX3Jlb3BlbmluZyA9IGZhbHNlXG4gICAgICBzb25pYy5fd3JpdGluZyA9IGZhbHNlXG4gICAgICBzb25pYy5fb3BlbmluZyA9IGZhbHNlXG5cbiAgICAgIGlmIChzb25pYy5zeW5jKSB7XG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgIGlmIChzb25pYy5saXN0ZW5lckNvdW50KCdlcnJvcicpID4gMCkge1xuICAgICAgICAgICAgc29uaWMuZW1pdCgnZXJyb3InLCBlcnIpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc29uaWMuZW1pdCgnZXJyb3InLCBlcnIpXG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCByZW9wZW5pbmcgPSBzb25pYy5fcmVvcGVuaW5nXG5cbiAgICBzb25pYy5mZCA9IGZkXG4gICAgc29uaWMuZmlsZSA9IGZpbGVcbiAgICBzb25pYy5fcmVvcGVuaW5nID0gZmFsc2VcbiAgICBzb25pYy5fb3BlbmluZyA9IGZhbHNlXG4gICAgc29uaWMuX3dyaXRpbmcgPSBmYWxzZVxuXG4gICAgaWYgKHNvbmljLnN5bmMpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soKCkgPT4gc29uaWMuZW1pdCgncmVhZHknKSlcbiAgICB9IGVsc2Uge1xuICAgICAgc29uaWMuZW1pdCgncmVhZHknKVxuICAgIH1cblxuICAgIGlmIChzb25pYy5kZXN0cm95ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIHN0YXJ0XG4gICAgaWYgKCghc29uaWMuX3dyaXRpbmcgJiYgc29uaWMuX2xlbiA+IHNvbmljLm1pbkxlbmd0aCkgfHwgc29uaWMuX2ZsdXNoUGVuZGluZykge1xuICAgICAgc29uaWMuX2FjdHVhbFdyaXRlKClcbiAgICB9IGVsc2UgaWYgKHJlb3BlbmluZykge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljaygoKSA9PiBzb25pYy5lbWl0KCdkcmFpbicpKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGZsYWdzID0gc29uaWMuYXBwZW5kID8gJ2EnIDogJ3cnXG4gIGNvbnN0IG1vZGUgPSBzb25pYy5tb2RlXG5cbiAgaWYgKHNvbmljLnN5bmMpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKHNvbmljLm1rZGlyKSBmcy5ta2RpclN5bmMocGF0aC5kaXJuYW1lKGZpbGUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KVxuICAgICAgY29uc3QgZmQgPSBmcy5vcGVuU3luYyhmaWxlLCBmbGFncywgbW9kZSlcbiAgICAgIGZpbGVPcGVuZWQobnVsbCwgZmQpXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBmaWxlT3BlbmVkKGVycilcbiAgICAgIHRocm93IGVyclxuICAgIH1cbiAgfSBlbHNlIGlmIChzb25pYy5ta2Rpcikge1xuICAgIGZzLm1rZGlyKHBhdGguZGlybmFtZShmaWxlKSwgeyByZWN1cnNpdmU6IHRydWUgfSwgKGVycikgPT4ge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGZpbGVPcGVuZWQoZXJyKVxuICAgICAgZnMub3BlbihmaWxlLCBmbGFncywgbW9kZSwgZmlsZU9wZW5lZClcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGZzLm9wZW4oZmlsZSwgZmxhZ3MsIG1vZGUsIGZpbGVPcGVuZWQpXG4gIH1cbn1cblxuZnVuY3Rpb24gU29uaWNCb29tIChvcHRzKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTb25pY0Jvb20pKSB7XG4gICAgcmV0dXJuIG5ldyBTb25pY0Jvb20ob3B0cylcbiAgfVxuXG4gIGxldCB7IGZkLCBkZXN0LCBtaW5MZW5ndGgsIG1heExlbmd0aCwgbWF4V3JpdGUsIHBlcmlvZGljRmx1c2gsIHN5bmMsIGFwcGVuZCA9IHRydWUsIG1rZGlyLCByZXRyeUVBR0FJTiwgZnN5bmMsIGNvbnRlbnRNb2RlLCBtb2RlIH0gPSBvcHRzIHx8IHt9XG5cbiAgZmQgPSBmZCB8fCBkZXN0XG5cbiAgdGhpcy5fbGVuID0gMFxuICB0aGlzLmZkID0gLTFcbiAgdGhpcy5fYnVmcyA9IFtdXG4gIHRoaXMuX2xlbnMgPSBbXVxuICB0aGlzLl93cml0aW5nID0gZmFsc2VcbiAgdGhpcy5fZW5kaW5nID0gZmFsc2VcbiAgdGhpcy5fcmVvcGVuaW5nID0gZmFsc2VcbiAgdGhpcy5fYXN5bmNEcmFpblNjaGVkdWxlZCA9IGZhbHNlXG4gIHRoaXMuX2ZsdXNoUGVuZGluZyA9IGZhbHNlXG4gIHRoaXMuX2h3bSA9IE1hdGgubWF4KG1pbkxlbmd0aCB8fCAwLCAxNjM4NylcbiAgdGhpcy5maWxlID0gbnVsbFxuICB0aGlzLmRlc3Ryb3llZCA9IGZhbHNlXG4gIHRoaXMubWluTGVuZ3RoID0gbWluTGVuZ3RoIHx8IDBcbiAgdGhpcy5tYXhMZW5ndGggPSBtYXhMZW5ndGggfHwgMFxuICB0aGlzLm1heFdyaXRlID0gbWF4V3JpdGUgfHwgTUFYX1dSSVRFXG4gIHRoaXMuX3BlcmlvZGljRmx1c2ggPSBwZXJpb2RpY0ZsdXNoIHx8IDBcbiAgdGhpcy5fcGVyaW9kaWNGbHVzaFRpbWVyID0gdW5kZWZpbmVkXG4gIHRoaXMuc3luYyA9IHN5bmMgfHwgZmFsc2VcbiAgdGhpcy53cml0YWJsZSA9IHRydWVcbiAgdGhpcy5fZnN5bmMgPSBmc3luYyB8fCBmYWxzZVxuICB0aGlzLmFwcGVuZCA9IGFwcGVuZCB8fCBmYWxzZVxuICB0aGlzLm1vZGUgPSBtb2RlXG4gIHRoaXMucmV0cnlFQUdBSU4gPSByZXRyeUVBR0FJTiB8fCAoKCkgPT4gdHJ1ZSlcbiAgdGhpcy5ta2RpciA9IG1rZGlyIHx8IGZhbHNlXG5cbiAgbGV0IGZzV3JpdGVTeW5jXG4gIGxldCBmc1dyaXRlXG4gIGlmIChjb250ZW50TW9kZSA9PT0ga0NvbnRlbnRNb2RlQnVmZmVyKSB7XG4gICAgdGhpcy5fd3JpdGluZ0J1ZiA9IGtFbXB0eUJ1ZmZlclxuICAgIHRoaXMud3JpdGUgPSB3cml0ZUJ1ZmZlclxuICAgIHRoaXMuZmx1c2ggPSBmbHVzaEJ1ZmZlclxuICAgIHRoaXMuZmx1c2hTeW5jID0gZmx1c2hCdWZmZXJTeW5jXG4gICAgdGhpcy5fYWN0dWFsV3JpdGUgPSBhY3R1YWxXcml0ZUJ1ZmZlclxuICAgIGZzV3JpdGVTeW5jID0gKCkgPT4gZnMud3JpdGVTeW5jKHRoaXMuZmQsIHRoaXMuX3dyaXRpbmdCdWYpXG4gICAgZnNXcml0ZSA9ICgpID0+IGZzLndyaXRlKHRoaXMuZmQsIHRoaXMuX3dyaXRpbmdCdWYsIHRoaXMucmVsZWFzZSlcbiAgfSBlbHNlIGlmIChjb250ZW50TW9kZSA9PT0gdW5kZWZpbmVkIHx8IGNvbnRlbnRNb2RlID09PSBrQ29udGVudE1vZGVVdGY4KSB7XG4gICAgdGhpcy5fd3JpdGluZ0J1ZiA9ICcnXG4gICAgdGhpcy53cml0ZSA9IHdyaXRlXG4gICAgdGhpcy5mbHVzaCA9IGZsdXNoXG4gICAgdGhpcy5mbHVzaFN5bmMgPSBmbHVzaFN5bmNcbiAgICB0aGlzLl9hY3R1YWxXcml0ZSA9IGFjdHVhbFdyaXRlXG4gICAgZnNXcml0ZVN5bmMgPSAoKSA9PiB7XG4gICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKHRoaXMuX3dyaXRpbmdCdWYpKSB7XG4gICAgICAgIHJldHVybiBmcy53cml0ZVN5bmModGhpcy5mZCwgdGhpcy5fd3JpdGluZ0J1ZilcbiAgICAgIH1cbiAgICAgIHJldHVybiBmcy53cml0ZVN5bmModGhpcy5mZCwgdGhpcy5fd3JpdGluZ0J1ZiwgJ3V0ZjgnKVxuICAgIH1cbiAgICBmc1dyaXRlID0gKCkgPT4ge1xuICAgICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih0aGlzLl93cml0aW5nQnVmKSkge1xuICAgICAgICByZXR1cm4gZnMud3JpdGUodGhpcy5mZCwgdGhpcy5fd3JpdGluZ0J1ZiwgdGhpcy5yZWxlYXNlKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZzLndyaXRlKHRoaXMuZmQsIHRoaXMuX3dyaXRpbmdCdWYsICd1dGY4JywgdGhpcy5yZWxlYXNlKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFNvbmljQm9vbSBzdXBwb3J0cyBcIiR7a0NvbnRlbnRNb2RlVXRmOH1cIiBhbmQgXCIke2tDb250ZW50TW9kZUJ1ZmZlcn1cIiwgYnV0IHBhc3NlZCAke2NvbnRlbnRNb2RlfWApXG4gIH1cblxuICBpZiAodHlwZW9mIGZkID09PSAnbnVtYmVyJykge1xuICAgIHRoaXMuZmQgPSBmZFxuICAgIHByb2Nlc3MubmV4dFRpY2soKCkgPT4gdGhpcy5lbWl0KCdyZWFkeScpKVxuICB9IGVsc2UgaWYgKHR5cGVvZiBmZCA9PT0gJ3N0cmluZycpIHtcbiAgICBvcGVuRmlsZShmZCwgdGhpcylcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbmljQm9vbSBzdXBwb3J0cyBvbmx5IGZpbGUgZGVzY3JpcHRvcnMgYW5kIGZpbGVzJylcbiAgfVxuICBpZiAodGhpcy5taW5MZW5ndGggPj0gdGhpcy5tYXhXcml0ZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgbWluTGVuZ3RoIHNob3VsZCBiZSBzbWFsbGVyIHRoYW4gbWF4V3JpdGUgKCR7dGhpcy5tYXhXcml0ZX0pYClcbiAgfVxuXG4gIHRoaXMucmVsZWFzZSA9IChlcnIsIG4pID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBpZiAoKGVyci5jb2RlID09PSAnRUFHQUlOJyB8fCBlcnIuY29kZSA9PT0gJ0VCVVNZJykgJiYgdGhpcy5yZXRyeUVBR0FJTihlcnIsIHRoaXMuX3dyaXRpbmdCdWYubGVuZ3RoLCB0aGlzLl9sZW4gLSB0aGlzLl93cml0aW5nQnVmLmxlbmd0aCkpIHtcbiAgICAgICAgaWYgKHRoaXMuc3luYykge1xuICAgICAgICAgIC8vIFRoaXMgZXJyb3IgY29kZSBzaG91bGQgbm90IGhhcHBlbiBpbiBzeW5jIG1vZGUsIGJlY2F1c2UgaXQgaXNcbiAgICAgICAgICAvLyBub3QgdXNpbmcgdGhlIHVuZGVybGluaW5nIG9wZXJhdGluZyBzeXN0ZW0gYXN5bmNocm9ub3VzIGZ1bmN0aW9ucy5cbiAgICAgICAgICAvLyBIb3dldmVyIGl0IGhhcHBlbnMsIGFuZCBzbyB3ZSBoYW5kbGUgaXQuXG4gICAgICAgICAgLy8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vcGlub2pzL3Bpbm8vaXNzdWVzLzc4M1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzbGVlcChCVVNZX1dSSVRFX1RJTUVPVVQpXG4gICAgICAgICAgICB0aGlzLnJlbGVhc2UodW5kZWZpbmVkLCAwKVxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhpcy5yZWxlYXNlKGVycilcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gTGV0J3MgZ2l2ZSB0aGUgZGVzdGluYXRpb24gc29tZSB0aW1lIHRvIHByb2Nlc3MgdGhlIGNodW5rLlxuICAgICAgICAgIHNldFRpbWVvdXQoZnNXcml0ZSwgQlVTWV9XUklURV9USU1FT1VUKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl93cml0aW5nID0gZmFsc2VcblxuICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKVxuICAgICAgfVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5lbWl0KCd3cml0ZScsIG4pXG4gICAgY29uc3QgcmVsZWFzZWRCdWZPYmogPSByZWxlYXNlV3JpdGluZ0J1Zih0aGlzLl93cml0aW5nQnVmLCB0aGlzLl9sZW4sIG4pXG4gICAgdGhpcy5fbGVuID0gcmVsZWFzZWRCdWZPYmoubGVuXG4gICAgdGhpcy5fd3JpdGluZ0J1ZiA9IHJlbGVhc2VkQnVmT2JqLndyaXRpbmdCdWZcblxuICAgIGlmICh0aGlzLl93cml0aW5nQnVmLmxlbmd0aCkge1xuICAgICAgaWYgKCF0aGlzLnN5bmMpIHtcbiAgICAgICAgZnNXcml0ZSgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgY29uc3QgbiA9IGZzV3JpdGVTeW5jKClcbiAgICAgICAgICBjb25zdCByZWxlYXNlZEJ1Zk9iaiA9IHJlbGVhc2VXcml0aW5nQnVmKHRoaXMuX3dyaXRpbmdCdWYsIHRoaXMuX2xlbiwgbilcbiAgICAgICAgICB0aGlzLl9sZW4gPSByZWxlYXNlZEJ1Zk9iai5sZW5cbiAgICAgICAgICB0aGlzLl93cml0aW5nQnVmID0gcmVsZWFzZWRCdWZPYmoud3JpdGluZ0J1ZlxuICAgICAgICB9IHdoaWxlICh0aGlzLl93cml0aW5nQnVmLmxlbmd0aClcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICB0aGlzLnJlbGVhc2UoZXJyKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZnN5bmMpIHtcbiAgICAgIGZzLmZzeW5jU3luYyh0aGlzLmZkKVxuICAgIH1cblxuICAgIGNvbnN0IGxlbiA9IHRoaXMuX2xlblxuICAgIGlmICh0aGlzLl9yZW9wZW5pbmcpIHtcbiAgICAgIHRoaXMuX3dyaXRpbmcgPSBmYWxzZVxuICAgICAgdGhpcy5fcmVvcGVuaW5nID0gZmFsc2VcbiAgICAgIHRoaXMucmVvcGVuKClcbiAgICB9IGVsc2UgaWYgKGxlbiA+IHRoaXMubWluTGVuZ3RoKSB7XG4gICAgICB0aGlzLl9hY3R1YWxXcml0ZSgpXG4gICAgfSBlbHNlIGlmICh0aGlzLl9lbmRpbmcpIHtcbiAgICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgIHRoaXMuX2FjdHVhbFdyaXRlKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3dyaXRpbmcgPSBmYWxzZVxuICAgICAgICBhY3R1YWxDbG9zZSh0aGlzKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl93cml0aW5nID0gZmFsc2VcbiAgICAgIGlmICh0aGlzLnN5bmMpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hc3luY0RyYWluU2NoZWR1bGVkKSB7XG4gICAgICAgICAgdGhpcy5fYXN5bmNEcmFpblNjaGVkdWxlZCA9IHRydWVcbiAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGVtaXREcmFpbiwgdGhpcylcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkcmFpbicpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5vbignbmV3TGlzdGVuZXInLCBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmIChuYW1lID09PSAnZHJhaW4nKSB7XG4gICAgICB0aGlzLl9hc3luY0RyYWluU2NoZWR1bGVkID0gZmFsc2VcbiAgICB9XG4gIH0pXG5cbiAgaWYgKHRoaXMuX3BlcmlvZGljRmx1c2ggIT09IDApIHtcbiAgICB0aGlzLl9wZXJpb2RpY0ZsdXNoVGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLmZsdXNoKG51bGwpLCB0aGlzLl9wZXJpb2RpY0ZsdXNoKVxuICAgIHRoaXMuX3BlcmlvZGljRmx1c2hUaW1lci51bnJlZigpXG4gIH1cbn1cblxuLyoqXG4gKiBSZWxlYXNlIHRoZSB3cml0aW5nQnVmIGFmdGVyIGZzLndyaXRlIG4gYnl0ZXMgZGF0YVxuICogQHBhcmFtIHtzdHJpbmcgfCBCdWZmZXJ9IHdyaXRpbmdCdWYgLSBjdXJyZW50bHkgd3JpdGluZyBidWZmZXIsIHVzdWFsbHkgYmUgaW5zdGFuY2UuX3dyaXRpbmdCdWYuXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuIC0gY3VycmVudGx5IGJ1ZmZlciBsZW5ndGgsIHVzdWFsbHkgYmUgaW5zdGFuY2UuX2xlbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBuIC0gbnVtYmVyIG9mIGJ5dGVzIGZzIGFscmVhZHkgd3JpdHRlblxuICogQHJldHVybnMge3t3cml0aW5nQnVmOiBzdHJpbmcgfCBCdWZmZXIsIGxlbjogbnVtYmVyfX0gcmVsZWFzZWQgd3JpdGluZ0J1ZiBhbmQgbGVuZ3RoXG4gKi9cbmZ1bmN0aW9uIHJlbGVhc2VXcml0aW5nQnVmICh3cml0aW5nQnVmLCBsZW4sIG4pIHtcbiAgaWYgKHR5cGVvZiB3cml0aW5nQnVmID09PSAnc3RyaW5nJykge1xuICAgIHdyaXRpbmdCdWYgPSBCdWZmZXIuZnJvbSh3cml0aW5nQnVmKVxuICB9XG5cbiAgbGVuID0gTWF0aC5tYXgobGVuIC0gbiwgMClcbiAgd3JpdGluZ0J1ZiA9IHdyaXRpbmdCdWYuc3ViYXJyYXkobilcbiAgcmV0dXJuIHsgd3JpdGluZ0J1ZiwgbGVuIH1cbn1cblxuZnVuY3Rpb24gZW1pdERyYWluIChzb25pYykge1xuICBjb25zdCBoYXNMaXN0ZW5lcnMgPSBzb25pYy5saXN0ZW5lckNvdW50KCdkcmFpbicpID4gMFxuICBpZiAoIWhhc0xpc3RlbmVycykgcmV0dXJuXG4gIHNvbmljLl9hc3luY0RyYWluU2NoZWR1bGVkID0gZmFsc2VcbiAgc29uaWMuZW1pdCgnZHJhaW4nKVxufVxuXG5pbmhlcml0cyhTb25pY0Jvb20sIEV2ZW50RW1pdHRlcilcblxuZnVuY3Rpb24gbWVyZ2VCdWYgKGJ1ZnMsIGxlbikge1xuICBpZiAoYnVmcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4ga0VtcHR5QnVmZmVyXG4gIH1cblxuICBpZiAoYnVmcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gYnVmc1swXVxuICB9XG5cbiAgcmV0dXJuIEJ1ZmZlci5jb25jYXQoYnVmcywgbGVuKVxufVxuXG5mdW5jdGlvbiB3cml0ZSAoZGF0YSkge1xuICBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbmljQm9vbSBkZXN0cm95ZWQnKVxuICB9XG5cbiAgZGF0YSA9ICcnICsgZGF0YVxuICBjb25zdCBkYXRhTGVuID0gQnVmZmVyLmJ5dGVMZW5ndGgoZGF0YSlcbiAgY29uc3QgbGVuID0gdGhpcy5fbGVuICsgZGF0YUxlblxuICBjb25zdCBidWZzID0gdGhpcy5fYnVmc1xuXG4gIGlmICh0aGlzLm1heExlbmd0aCAmJiBsZW4gPiB0aGlzLm1heExlbmd0aCkge1xuICAgIHRoaXMuZW1pdCgnZHJvcCcsIGRhdGEpXG4gICAgcmV0dXJuIHRoaXMuX2xlbiA8IHRoaXMuX2h3bVxuICB9XG5cbiAgaWYgKFxuICAgIGJ1ZnMubGVuZ3RoID09PSAwIHx8XG4gICAgQnVmZmVyLmJ5dGVMZW5ndGgoYnVmc1tidWZzLmxlbmd0aCAtIDFdKSArIGRhdGFMZW4gPiB0aGlzLm1heFdyaXRlXG4gICkge1xuICAgIGJ1ZnMucHVzaChkYXRhKVxuICB9IGVsc2Uge1xuICAgIGJ1ZnNbYnVmcy5sZW5ndGggLSAxXSArPSBkYXRhXG4gIH1cblxuICB0aGlzLl9sZW4gPSBsZW5cblxuICBpZiAoIXRoaXMuX3dyaXRpbmcgJiYgdGhpcy5fbGVuID49IHRoaXMubWluTGVuZ3RoKSB7XG4gICAgdGhpcy5fYWN0dWFsV3JpdGUoKVxuICB9XG5cbiAgcmV0dXJuIHRoaXMuX2xlbiA8IHRoaXMuX2h3bVxufVxuXG5mdW5jdGlvbiB3cml0ZUJ1ZmZlciAoZGF0YSkge1xuICBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbmljQm9vbSBkZXN0cm95ZWQnKVxuICB9XG5cbiAgY29uc3QgbGVuID0gdGhpcy5fbGVuICsgZGF0YS5sZW5ndGhcbiAgY29uc3QgYnVmcyA9IHRoaXMuX2J1ZnNcbiAgY29uc3QgbGVucyA9IHRoaXMuX2xlbnNcblxuICBpZiAodGhpcy5tYXhMZW5ndGggJiYgbGVuID4gdGhpcy5tYXhMZW5ndGgpIHtcbiAgICB0aGlzLmVtaXQoJ2Ryb3AnLCBkYXRhKVxuICAgIHJldHVybiB0aGlzLl9sZW4gPCB0aGlzLl9od21cbiAgfVxuXG4gIGlmIChcbiAgICBidWZzLmxlbmd0aCA9PT0gMCB8fFxuICAgIGxlbnNbbGVucy5sZW5ndGggLSAxXSArIGRhdGEubGVuZ3RoID4gdGhpcy5tYXhXcml0ZVxuICApIHtcbiAgICBidWZzLnB1c2goW2RhdGFdKVxuICAgIGxlbnMucHVzaChkYXRhLmxlbmd0aClcbiAgfSBlbHNlIHtcbiAgICBidWZzW2J1ZnMubGVuZ3RoIC0gMV0ucHVzaChkYXRhKVxuICAgIGxlbnNbbGVucy5sZW5ndGggLSAxXSArPSBkYXRhLmxlbmd0aFxuICB9XG5cbiAgdGhpcy5fbGVuID0gbGVuXG5cbiAgaWYgKCF0aGlzLl93cml0aW5nICYmIHRoaXMuX2xlbiA+PSB0aGlzLm1pbkxlbmd0aCkge1xuICAgIHRoaXMuX2FjdHVhbFdyaXRlKClcbiAgfVxuXG4gIHJldHVybiB0aGlzLl9sZW4gPCB0aGlzLl9od21cbn1cblxuZnVuY3Rpb24gY2FsbEZsdXNoQ2FsbGJhY2tPbkRyYWluIChjYikge1xuICB0aGlzLl9mbHVzaFBlbmRpbmcgPSB0cnVlXG4gIGNvbnN0IG9uRHJhaW4gPSAoKSA9PiB7XG4gICAgLy8gb25seSBpZiBfZnN5bmMgaXMgZmFsc2UgdG8gYXZvaWQgZG91YmxlIGZzeW5jXG4gICAgaWYgKCF0aGlzLl9mc3luYykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZnMuZnN5bmModGhpcy5mZCwgKGVycikgPT4ge1xuICAgICAgICAgIHRoaXMuX2ZsdXNoUGVuZGluZyA9IGZhbHNlXG4gICAgICAgICAgY2IoZXJyKVxuICAgICAgICB9KVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNiKGVycilcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZmx1c2hQZW5kaW5nID0gZmFsc2VcbiAgICAgIGNiKClcbiAgICB9XG4gICAgdGhpcy5vZmYoJ2Vycm9yJywgb25FcnJvcilcbiAgfVxuICBjb25zdCBvbkVycm9yID0gKGVycikgPT4ge1xuICAgIHRoaXMuX2ZsdXNoUGVuZGluZyA9IGZhbHNlXG4gICAgY2IoZXJyKVxuICAgIHRoaXMub2ZmKCdkcmFpbicsIG9uRHJhaW4pXG4gIH1cblxuICB0aGlzLm9uY2UoJ2RyYWluJywgb25EcmFpbilcbiAgdGhpcy5vbmNlKCdlcnJvcicsIG9uRXJyb3IpXG59XG5cbmZ1bmN0aW9uIGZsdXNoIChjYikge1xuICBpZiAoY2IgIT0gbnVsbCAmJiB0eXBlb2YgY2IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZsdXNoIGNiIG11c3QgYmUgYSBmdW5jdGlvbicpXG4gIH1cblxuICBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcignU29uaWNCb29tIGRlc3Ryb3llZCcpXG4gICAgaWYgKGNiKSB7XG4gICAgICBjYihlcnJvcilcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRocm93IGVycm9yXG4gIH1cblxuICBpZiAodGhpcy5taW5MZW5ndGggPD0gMCkge1xuICAgIGNiPy4oKVxuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKGNiKSB7XG4gICAgY2FsbEZsdXNoQ2FsbGJhY2tPbkRyYWluLmNhbGwodGhpcywgY2IpXG4gIH1cblxuICBpZiAodGhpcy5fd3JpdGluZykge1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKHRoaXMuX2J1ZnMubGVuZ3RoID09PSAwKSB7XG4gICAgdGhpcy5fYnVmcy5wdXNoKCcnKVxuICB9XG5cbiAgdGhpcy5fYWN0dWFsV3JpdGUoKVxufVxuXG5mdW5jdGlvbiBmbHVzaEJ1ZmZlciAoY2IpIHtcbiAgaWYgKGNiICE9IG51bGwgJiYgdHlwZW9mIGNiICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdmbHVzaCBjYiBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuICB9XG5cbiAgaWYgKHRoaXMuZGVzdHJveWVkKSB7XG4gICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoJ1NvbmljQm9vbSBkZXN0cm95ZWQnKVxuICAgIGlmIChjYikge1xuICAgICAgY2IoZXJyb3IpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aHJvdyBlcnJvclxuICB9XG5cbiAgaWYgKHRoaXMubWluTGVuZ3RoIDw9IDApIHtcbiAgICBjYj8uKClcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChjYikge1xuICAgIGNhbGxGbHVzaENhbGxiYWNrT25EcmFpbi5jYWxsKHRoaXMsIGNiKVxuICB9XG5cbiAgaWYgKHRoaXMuX3dyaXRpbmcpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmICh0aGlzLl9idWZzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRoaXMuX2J1ZnMucHVzaChbXSlcbiAgICB0aGlzLl9sZW5zLnB1c2goMClcbiAgfVxuXG4gIHRoaXMuX2FjdHVhbFdyaXRlKClcbn1cblxuU29uaWNCb29tLnByb3RvdHlwZS5yZW9wZW4gPSBmdW5jdGlvbiAoZmlsZSkge1xuICBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbmljQm9vbSBkZXN0cm95ZWQnKVxuICB9XG5cbiAgaWYgKHRoaXMuX29wZW5pbmcpIHtcbiAgICB0aGlzLm9uY2UoJ3JlYWR5JywgKCkgPT4ge1xuICAgICAgdGhpcy5yZW9wZW4oZmlsZSlcbiAgICB9KVxuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKHRoaXMuX2VuZGluZykge1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKCF0aGlzLmZpbGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byByZW9wZW4gYSBmaWxlIGRlc2NyaXB0b3IsIHlvdSBtdXN0IHBhc3MgYSBmaWxlIHRvIFNvbmljQm9vbScpXG4gIH1cblxuICBpZiAoZmlsZSkge1xuICAgIHRoaXMuZmlsZSA9IGZpbGVcbiAgfVxuICB0aGlzLl9yZW9wZW5pbmcgPSB0cnVlXG5cbiAgaWYgKHRoaXMuX3dyaXRpbmcpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IGZkID0gdGhpcy5mZFxuICB0aGlzLm9uY2UoJ3JlYWR5JywgKCkgPT4ge1xuICAgIGlmIChmZCAhPT0gdGhpcy5mZCkge1xuICAgICAgZnMuY2xvc2UoZmQsIChlcnIpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSlcblxuICBvcGVuRmlsZSh0aGlzLmZpbGUsIHRoaXMpXG59XG5cblNvbmljQm9vbS5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbmljQm9vbSBkZXN0cm95ZWQnKVxuICB9XG5cbiAgaWYgKHRoaXMuX29wZW5pbmcpIHtcbiAgICB0aGlzLm9uY2UoJ3JlYWR5JywgKCkgPT4ge1xuICAgICAgdGhpcy5lbmQoKVxuICAgIH0pXG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAodGhpcy5fZW5kaW5nKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB0aGlzLl9lbmRpbmcgPSB0cnVlXG5cbiAgaWYgKHRoaXMuX3dyaXRpbmcpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmICh0aGlzLl9sZW4gPiAwICYmIHRoaXMuZmQgPj0gMCkge1xuICAgIHRoaXMuX2FjdHVhbFdyaXRlKClcbiAgfSBlbHNlIHtcbiAgICBhY3R1YWxDbG9zZSh0aGlzKVxuICB9XG59XG5cbmZ1bmN0aW9uIGZsdXNoU3luYyAoKSB7XG4gIGlmICh0aGlzLmRlc3Ryb3llZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU29uaWNCb29tIGRlc3Ryb3llZCcpXG4gIH1cblxuICBpZiAodGhpcy5mZCA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NvbmljIGJvb20gaXMgbm90IHJlYWR5IHlldCcpXG4gIH1cblxuICBpZiAoIXRoaXMuX3dyaXRpbmcgJiYgdGhpcy5fd3JpdGluZ0J1Zi5sZW5ndGggPiAwKSB7XG4gICAgdGhpcy5fYnVmcy51bnNoaWZ0KHRoaXMuX3dyaXRpbmdCdWYpXG4gICAgdGhpcy5fd3JpdGluZ0J1ZiA9ICcnXG4gIH1cblxuICBsZXQgYnVmID0gJydcbiAgd2hpbGUgKHRoaXMuX2J1ZnMubGVuZ3RoIHx8IGJ1Zi5sZW5ndGgpIHtcbiAgICBpZiAoYnVmLmxlbmd0aCA8PSAwKSB7XG4gICAgICBidWYgPSB0aGlzLl9idWZzWzBdXG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBjb25zdCBuID0gQnVmZmVyLmlzQnVmZmVyKGJ1ZilcbiAgICAgICAgPyBmcy53cml0ZVN5bmModGhpcy5mZCwgYnVmKVxuICAgICAgICA6IGZzLndyaXRlU3luYyh0aGlzLmZkLCBidWYsICd1dGY4JylcbiAgICAgIGNvbnN0IHJlbGVhc2VkQnVmT2JqID0gcmVsZWFzZVdyaXRpbmdCdWYoYnVmLCB0aGlzLl9sZW4sIG4pXG4gICAgICBidWYgPSByZWxlYXNlZEJ1Zk9iai53cml0aW5nQnVmXG4gICAgICB0aGlzLl9sZW4gPSByZWxlYXNlZEJ1Zk9iai5sZW5cbiAgICAgIGlmIChidWYubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgdGhpcy5fYnVmcy5zaGlmdCgpXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zdCBzaG91bGRSZXRyeSA9IGVyci5jb2RlID09PSAnRUFHQUlOJyB8fCBlcnIuY29kZSA9PT0gJ0VCVVNZJ1xuICAgICAgaWYgKHNob3VsZFJldHJ5ICYmICF0aGlzLnJldHJ5RUFHQUlOKGVyciwgYnVmLmxlbmd0aCwgdGhpcy5fbGVuIC0gYnVmLmxlbmd0aCkpIHtcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgICB9XG5cbiAgICAgIHNsZWVwKEJVU1lfV1JJVEVfVElNRU9VVClcbiAgICB9XG4gIH1cblxuICB0cnkge1xuICAgIGZzLmZzeW5jU3luYyh0aGlzLmZkKVxuICB9IGNhdGNoIHtcbiAgICAvLyBTa2lwIHRoZSBlcnJvci4gVGhlIGZkIG1pZ2h0IG5vdCBzdXBwb3J0IGZzeW5jLlxuICB9XG59XG5cbmZ1bmN0aW9uIGZsdXNoQnVmZmVyU3luYyAoKSB7XG4gIGlmICh0aGlzLmRlc3Ryb3llZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU29uaWNCb29tIGRlc3Ryb3llZCcpXG4gIH1cblxuICBpZiAodGhpcy5mZCA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NvbmljIGJvb20gaXMgbm90IHJlYWR5IHlldCcpXG4gIH1cblxuICBpZiAoIXRoaXMuX3dyaXRpbmcgJiYgdGhpcy5fd3JpdGluZ0J1Zi5sZW5ndGggPiAwKSB7XG4gICAgdGhpcy5fYnVmcy51bnNoaWZ0KFt0aGlzLl93cml0aW5nQnVmXSlcbiAgICB0aGlzLl93cml0aW5nQnVmID0ga0VtcHR5QnVmZmVyXG4gIH1cblxuICBsZXQgYnVmID0ga0VtcHR5QnVmZmVyXG4gIHdoaWxlICh0aGlzLl9idWZzLmxlbmd0aCB8fCBidWYubGVuZ3RoKSB7XG4gICAgaWYgKGJ1Zi5sZW5ndGggPD0gMCkge1xuICAgICAgYnVmID0gbWVyZ2VCdWYodGhpcy5fYnVmc1swXSwgdGhpcy5fbGVuc1swXSlcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG4gPSBmcy53cml0ZVN5bmModGhpcy5mZCwgYnVmKVxuICAgICAgYnVmID0gYnVmLnN1YmFycmF5KG4pXG4gICAgICB0aGlzLl9sZW4gPSBNYXRoLm1heCh0aGlzLl9sZW4gLSBuLCAwKVxuICAgICAgaWYgKGJ1Zi5sZW5ndGggPD0gMCkge1xuICAgICAgICB0aGlzLl9idWZzLnNoaWZ0KClcbiAgICAgICAgdGhpcy5fbGVucy5zaGlmdCgpXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zdCBzaG91bGRSZXRyeSA9IGVyci5jb2RlID09PSAnRUFHQUlOJyB8fCBlcnIuY29kZSA9PT0gJ0VCVVNZJ1xuICAgICAgaWYgKHNob3VsZFJldHJ5ICYmICF0aGlzLnJldHJ5RUFHQUlOKGVyciwgYnVmLmxlbmd0aCwgdGhpcy5fbGVuIC0gYnVmLmxlbmd0aCkpIHtcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgICB9XG5cbiAgICAgIHNsZWVwKEJVU1lfV1JJVEVfVElNRU9VVClcbiAgICB9XG4gIH1cbn1cblxuU29uaWNCb29tLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuICBhY3R1YWxDbG9zZSh0aGlzKVxufVxuXG5mdW5jdGlvbiBhY3R1YWxXcml0ZSAoKSB7XG4gIGNvbnN0IHJlbGVhc2UgPSB0aGlzLnJlbGVhc2VcbiAgdGhpcy5fd3JpdGluZyA9IHRydWVcbiAgdGhpcy5fd3JpdGluZ0J1ZiA9IHRoaXMuX3dyaXRpbmdCdWYubGVuZ3RoID8gdGhpcy5fd3JpdGluZ0J1ZiA6IHRoaXMuX2J1ZnMuc2hpZnQoKSB8fCAnJ1xuXG4gIGlmICh0aGlzLnN5bmMpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgd3JpdHRlbiA9IEJ1ZmZlci5pc0J1ZmZlcih0aGlzLl93cml0aW5nQnVmKVxuICAgICAgICA/IGZzLndyaXRlU3luYyh0aGlzLmZkLCB0aGlzLl93cml0aW5nQnVmKVxuICAgICAgICA6IGZzLndyaXRlU3luYyh0aGlzLmZkLCB0aGlzLl93cml0aW5nQnVmLCAndXRmOCcpXG4gICAgICByZWxlYXNlKG51bGwsIHdyaXR0ZW4pXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZWxlYXNlKGVycilcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZnMud3JpdGUodGhpcy5mZCwgdGhpcy5fd3JpdGluZ0J1ZiwgcmVsZWFzZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBhY3R1YWxXcml0ZUJ1ZmZlciAoKSB7XG4gIGNvbnN0IHJlbGVhc2UgPSB0aGlzLnJlbGVhc2VcbiAgdGhpcy5fd3JpdGluZyA9IHRydWVcbiAgdGhpcy5fd3JpdGluZ0J1ZiA9IHRoaXMuX3dyaXRpbmdCdWYubGVuZ3RoID8gdGhpcy5fd3JpdGluZ0J1ZiA6IG1lcmdlQnVmKHRoaXMuX2J1ZnMuc2hpZnQoKSwgdGhpcy5fbGVucy5zaGlmdCgpKVxuXG4gIGlmICh0aGlzLnN5bmMpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgd3JpdHRlbiA9IGZzLndyaXRlU3luYyh0aGlzLmZkLCB0aGlzLl93cml0aW5nQnVmKVxuICAgICAgcmVsZWFzZShudWxsLCB3cml0dGVuKVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmVsZWFzZShlcnIpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGZzLndyaXRlIHdpbGwgbmVlZCB0byBjb3B5IHN0cmluZyB0byBidWZmZXIgYW55d2F5IHNvXG4gICAgLy8gd2UgZG8gaXQgaGVyZSB0byBhdm9pZCB0aGUgb3ZlcmhlYWQgb2YgY2FsY3VsYXRpbmcgdGhlIGJ1ZmZlciBzaXplXG4gICAgLy8gaW4gcmVsZWFzZVdyaXRpbmdCdWYuXG4gICAgaWYgKGtDb3B5QnVmZmVyKSB7XG4gICAgICB0aGlzLl93cml0aW5nQnVmID0gQnVmZmVyLmZyb20odGhpcy5fd3JpdGluZ0J1ZilcbiAgICB9XG4gICAgZnMud3JpdGUodGhpcy5mZCwgdGhpcy5fd3JpdGluZ0J1ZiwgcmVsZWFzZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBhY3R1YWxDbG9zZSAoc29uaWMpIHtcbiAgaWYgKHNvbmljLmZkID09PSAtMSkge1xuICAgIHNvbmljLm9uY2UoJ3JlYWR5JywgYWN0dWFsQ2xvc2UuYmluZChudWxsLCBzb25pYykpXG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAoc29uaWMuX3BlcmlvZGljRmx1c2hUaW1lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY2xlYXJJbnRlcnZhbChzb25pYy5fcGVyaW9kaWNGbHVzaFRpbWVyKVxuICB9XG5cbiAgc29uaWMuZGVzdHJveWVkID0gdHJ1ZVxuICBzb25pYy5fYnVmcyA9IFtdXG4gIHNvbmljLl9sZW5zID0gW11cblxuICBhc3NlcnQodHlwZW9mIHNvbmljLmZkID09PSAnbnVtYmVyJywgYHNvbmljLmZkIG11c3QgYmUgYSBudW1iZXIsIGdvdCAke3R5cGVvZiBzb25pYy5mZH1gKVxuICB0cnkge1xuICAgIGZzLmZzeW5jKHNvbmljLmZkLCBjbG9zZVdyYXBwZWQpXG4gIH0gY2F0Y2gge1xuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2VXcmFwcGVkICgpIHtcbiAgICAvLyBXZSBza2lwIGVycm9ycyBpbiBmc3luY1xuXG4gICAgaWYgKHNvbmljLmZkICE9PSAxICYmIHNvbmljLmZkICE9PSAyKSB7XG4gICAgICBmcy5jbG9zZShzb25pYy5mZCwgZG9uZSlcbiAgICB9IGVsc2Uge1xuICAgICAgZG9uZSgpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZG9uZSAoZXJyKSB7XG4gICAgaWYgKGVycikge1xuICAgICAgc29uaWMuZW1pdCgnZXJyb3InLCBlcnIpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoc29uaWMuX2VuZGluZyAmJiAhc29uaWMuX3dyaXRpbmcpIHtcbiAgICAgIHNvbmljLmVtaXQoJ2ZpbmlzaCcpXG4gICAgfVxuICAgIHNvbmljLmVtaXQoJ2Nsb3NlJylcbiAgfVxufVxuXG4vKipcbiAqIFRoZXNlIGV4cG9ydCBjb25maWd1cmF0aW9ucyBlbmFibGUgSlMgYW5kIFRTIGRldmVsb3BlcnNcbiAqIHRvIGNvbnN1bWVyIFNvbmljQm9vbSBpbiB3aGF0ZXZlciB3YXkgYmVzdCBzdWl0cyB0aGVpciBuZWVkcy5cbiAqIFNvbWUgZXhhbXBsZXMgb2Ygc3VwcG9ydGVkIGltcG9ydCBzeW50YXggaW5jbHVkZXM6XG4gKiAtIGBjb25zdCBTb25pY0Jvb20gPSByZXF1aXJlKCdTb25pY0Jvb20nKWBcbiAqIC0gYGNvbnN0IHsgU29uaWNCb29tIH0gPSByZXF1aXJlKCdTb25pY0Jvb20nKWBcbiAqIC0gYGltcG9ydCAqIGFzIFNvbmljQm9vbSBmcm9tICdTb25pY0Jvb20nYFxuICogLSBgaW1wb3J0IHsgU29uaWNCb29tIH0gZnJvbSAnU29uaWNCb29tJ2BcbiAqIC0gYGltcG9ydCBTb25pY0Jvb20gZnJvbSAnU29uaWNCb29tJ2BcbiAqL1xuU29uaWNCb29tLlNvbmljQm9vbSA9IFNvbmljQm9vbVxuU29uaWNCb29tLmRlZmF1bHQgPSBTb25pY0Jvb21cbm1vZHVsZS5leHBvcnRzID0gU29uaWNCb29tXG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9vcCAoKSB7fVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCByZWZzID0ge1xuICBleGl0OiBbXSxcbiAgYmVmb3JlRXhpdDogW11cbn1cbmNvbnN0IGZ1bmN0aW9ucyA9IHtcbiAgZXhpdDogb25FeGl0LFxuICBiZWZvcmVFeGl0OiBvbkJlZm9yZUV4aXRcbn1cblxubGV0IHJlZ2lzdHJ5XG5cbmZ1bmN0aW9uIGVuc3VyZVJlZ2lzdHJ5ICgpIHtcbiAgaWYgKHJlZ2lzdHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICByZWdpc3RyeSA9IG5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeShjbGVhcilcbiAgfVxufVxuXG5mdW5jdGlvbiBpbnN0YWxsIChldmVudCkge1xuICBpZiAocmVmc1tldmVudF0ubGVuZ3RoID4gMCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgcHJvY2Vzcy5vbihldmVudCwgZnVuY3Rpb25zW2V2ZW50XSlcbn1cblxuZnVuY3Rpb24gdW5pbnN0YWxsIChldmVudCkge1xuICBpZiAocmVmc1tldmVudF0ubGVuZ3RoID4gMCkge1xuICAgIHJldHVyblxuICB9XG4gIHByb2Nlc3MucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGZ1bmN0aW9uc1tldmVudF0pXG4gIGlmIChyZWZzLmV4aXQubGVuZ3RoID09PSAwICYmIHJlZnMuYmVmb3JlRXhpdC5sZW5ndGggPT09IDApIHtcbiAgICByZWdpc3RyeSA9IHVuZGVmaW5lZFxuICB9XG59XG5cbmZ1bmN0aW9uIG9uRXhpdCAoKSB7XG4gIGNhbGxSZWZzKCdleGl0Jylcbn1cblxuZnVuY3Rpb24gb25CZWZvcmVFeGl0ICgpIHtcbiAgY2FsbFJlZnMoJ2JlZm9yZUV4aXQnKVxufVxuXG5mdW5jdGlvbiBjYWxsUmVmcyAoZXZlbnQpIHtcbiAgZm9yIChjb25zdCByZWYgb2YgcmVmc1tldmVudF0pIHtcbiAgICBjb25zdCBvYmogPSByZWYuZGVyZWYoKVxuICAgIGNvbnN0IGZuID0gcmVmLmZuXG5cbiAgICAvLyBUaGlzIHNob3VsZCBhbHdheXMgaGFwcGVuLCBob3dldmVyIEdDIGlzXG4gICAgLy8gdW5kZXRlcm1pbmlzdGljIHNvIGl0IG1pZ2h0IG5vdCBoYXBwZW4uXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAob2JqICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZuKG9iaiwgZXZlbnQpXG4gICAgfVxuICB9XG4gIHJlZnNbZXZlbnRdID0gW11cbn1cblxuZnVuY3Rpb24gY2xlYXIgKHJlZikge1xuICBmb3IgKGNvbnN0IGV2ZW50IG9mIFsnZXhpdCcsICdiZWZvcmVFeGl0J10pIHtcbiAgICBjb25zdCBpbmRleCA9IHJlZnNbZXZlbnRdLmluZGV4T2YocmVmKVxuICAgIHJlZnNbZXZlbnRdLnNwbGljZShpbmRleCwgaW5kZXggKyAxKVxuICAgIHVuaW5zdGFsbChldmVudClcbiAgfVxufVxuXG5mdW5jdGlvbiBfcmVnaXN0ZXIgKGV2ZW50LCBvYmosIGZuKSB7XG4gIGlmIChvYmogPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndGhlIG9iamVjdCBjYW5cXCd0IGJlIHVuZGVmaW5lZCcpXG4gIH1cbiAgaW5zdGFsbChldmVudClcbiAgY29uc3QgcmVmID0gbmV3IFdlYWtSZWYob2JqKVxuICByZWYuZm4gPSBmblxuXG4gIGVuc3VyZVJlZ2lzdHJ5KClcbiAgcmVnaXN0cnkucmVnaXN0ZXIob2JqLCByZWYpXG4gIHJlZnNbZXZlbnRdLnB1c2gocmVmKVxufVxuXG5mdW5jdGlvbiByZWdpc3RlciAob2JqLCBmbikge1xuICBfcmVnaXN0ZXIoJ2V4aXQnLCBvYmosIGZuKVxufVxuXG5mdW5jdGlvbiByZWdpc3RlckJlZm9yZUV4aXQgKG9iaiwgZm4pIHtcbiAgX3JlZ2lzdGVyKCdiZWZvcmVFeGl0Jywgb2JqLCBmbilcbn1cblxuZnVuY3Rpb24gdW5yZWdpc3RlciAob2JqKSB7XG4gIGlmIChyZWdpc3RyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgcmVnaXN0cnkudW5yZWdpc3RlcihvYmopXG4gIGZvciAoY29uc3QgZXZlbnQgb2YgWydleGl0JywgJ2JlZm9yZUV4aXQnXSkge1xuICAgIHJlZnNbZXZlbnRdID0gcmVmc1tldmVudF0uZmlsdGVyKChyZWYpID0+IHtcbiAgICAgIGNvbnN0IF9vYmogPSByZWYuZGVyZWYoKVxuICAgICAgcmV0dXJuIF9vYmogJiYgX29iaiAhPT0gb2JqXG4gICAgfSlcbiAgICB1bmluc3RhbGwoZXZlbnQpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJlZ2lzdGVyLFxuICByZWdpc3RlckJlZm9yZUV4aXQsXG4gIHVucmVnaXN0ZXJcbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBidWlsZFNhZmVTb25pY0Jvb21cblxuY29uc3QgeyBpc01haW5UaHJlYWQgfSA9IHJlcXVpcmUoJ25vZGU6d29ya2VyX3RocmVhZHMnKVxuY29uc3QgU29uaWNCb29tID0gcmVxdWlyZSgnc29uaWMtYm9vbScpXG5jb25zdCBub29wID0gcmVxdWlyZSgnLi9ub29wJylcblxuLyoqXG4gKiBDcmVhdGVzIGEgc2FmZSBTb25pY0Jvb20gaW5zdGFuY2VcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0cyBPcHRpb25zIGZvciBTb25pY0Jvb21cbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBBIG5ldyBTb25pY0Jvb20gc3RyZWFtXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkU2FmZVNvbmljQm9vbSAob3B0cykge1xuICBjb25zdCBzdHJlYW0gPSBuZXcgU29uaWNCb29tKG9wdHMpXG4gIHN0cmVhbS5vbignZXJyb3InLCBmaWx0ZXJCcm9rZW5QaXBlKVxuICAvLyBpZiB3ZSBhcmUgc3luYzogZmFsc2UsIHdlIG11c3QgZmx1c2ggb24gZXhpdFxuICBpZiAoIW9wdHMuc3luYyAmJiBpc01haW5UaHJlYWQpIHtcbiAgICBzZXR1cE9uRXhpdChzdHJlYW0pXG4gIH1cbiAgcmV0dXJuIHN0cmVhbVxuXG4gIGZ1bmN0aW9uIGZpbHRlckJyb2tlblBpcGUgKGVycikge1xuICAgIGlmIChlcnIuY29kZSA9PT0gJ0VQSVBFJykge1xuICAgICAgc3RyZWFtLndyaXRlID0gbm9vcFxuICAgICAgc3RyZWFtLmVuZCA9IG5vb3BcbiAgICAgIHN0cmVhbS5mbHVzaFN5bmMgPSBub29wXG4gICAgICBzdHJlYW0uZGVzdHJveSA9IG5vb3BcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBzdHJlYW0ucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgZmlsdGVyQnJva2VuUGlwZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXR1cE9uRXhpdCAoc3RyZWFtKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChnbG9iYWwuV2Vha1JlZiAmJiBnbG9iYWwuV2Vha01hcCAmJiBnbG9iYWwuRmluYWxpemF0aW9uUmVnaXN0cnkpIHtcbiAgICAvLyBUaGlzIGlzIGxlYWsgZnJlZSwgaXQgZG9lcyBub3QgbGVhdmUgZXZlbnQgaGFuZGxlcnNcbiAgICBjb25zdCBvbkV4aXQgPSByZXF1aXJlKCdvbi1leGl0LWxlYWstZnJlZScpXG5cbiAgICBvbkV4aXQucmVnaXN0ZXIoc3RyZWFtLCBhdXRvRW5kKVxuXG4gICAgc3RyZWFtLm9uKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIG9uRXhpdC51bnJlZ2lzdGVyKHN0cmVhbSlcbiAgICB9KVxuICB9XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5mdW5jdGlvbiBhdXRvRW5kIChzdHJlYW0sIGV2ZW50TmFtZSkge1xuICAvLyBUaGlzIGNoZWNrIGlzIG5lZWRlZCBvbmx5IG9uIHNvbWUgcGxhdGZvcm1zXG5cbiAgaWYgKHN0cmVhbS5kZXN0cm95ZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChldmVudE5hbWUgPT09ICdiZWZvcmVFeGl0Jykge1xuICAgIC8vIFdlIHN0aWxsIGhhdmUgYW4gZXZlbnQgbG9vcCwgbGV0J3MgdXNlIGl0XG4gICAgc3RyZWFtLmZsdXNoKClcbiAgICBzdHJlYW0ub24oJ2RyYWluJywgZnVuY3Rpb24gKCkge1xuICAgICAgc3RyZWFtLmVuZCgpXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICAvLyBXZSBkbyBub3QgaGF2ZSBhbiBldmVudCBsb29wLCBzbyBmbHVzaCBzeW5jaHJvbm91c2x5XG4gICAgc3RyZWFtLmZsdXNoU3luYygpXG4gIH1cbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBpc1ZhbGlkRGF0ZVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgYXJndW1lbnQgaXMgYSBKUyBEYXRlIGFuZCBub3QgJ0ludmFsaWQgRGF0ZScuXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIFRoZSBkYXRlIHRvIGNoZWNrLlxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBhcmd1bWVudCBpcyBhIEpTIERhdGUgYW5kIG5vdCAnSW52YWxpZCBEYXRlJy5cbiAqL1xuZnVuY3Rpb24gaXNWYWxpZERhdGUgKGRhdGUpIHtcbiAgcmV0dXJuIGRhdGUgaW5zdGFuY2VvZiBEYXRlICYmICFOdW1iZXIuaXNOYU4oZGF0ZS5nZXRUaW1lKCkpXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlRGF0ZVxuXG5jb25zdCBpc1ZhbGlkRGF0ZSA9IHJlcXVpcmUoJy4vaXMtdmFsaWQtZGF0ZScpXG5cbi8qKlxuICogQ29uc3RydWN0cyBhIEpTIERhdGUgZnJvbSBhIG51bWJlciBvciBzdHJpbmcuIEFjY2VwdHMgYW55IHNpbmdsZSBudW1iZXJcbiAqIG9yIHNpbmdsZSBzdHJpbmcgYXJndW1lbnQgdGhhdCBpcyB2YWxpZCBmb3IgdGhlIERhdGUoKSBjb25zdHJ1Y3RvcixcbiAqIG9yIGFuIGVwb2NoIGFzIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gZXBvY2ggVGhlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBEYXRlLlxuICpcbiAqIEByZXR1cm5zIHtEYXRlfSBUaGUgY29uc3RydWN0ZWQgRGF0ZS5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRGF0ZSAoZXBvY2gpIHtcbiAgLy8gSWYgZXBvY2ggaXMgYWxyZWFkeSBhIHZhbGlkIGFyZ3VtZW50LCByZXR1cm4gdGhlIHZhbGlkIERhdGVcbiAgbGV0IGRhdGUgPSBuZXcgRGF0ZShlcG9jaClcbiAgaWYgKGlzVmFsaWREYXRlKGRhdGUpKSB7XG4gICAgcmV0dXJuIGRhdGVcbiAgfVxuXG4gIC8vIENvbnZlcnQgdG8gYSBudW1iZXIgdG8gcGVybWl0IGVwb2NoIGFzIGEgc3RyaW5nXG4gIGRhdGUgPSBuZXcgRGF0ZSgrZXBvY2gpXG4gIHJldHVybiBkYXRlXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gc3BsaXRQcm9wZXJ0eUtleVxuXG4vKipcbiAqIFNwbGl0cyB0aGUgcHJvcGVydHkga2V5IGRlbGltaXRlZCBieSBhIGRvdCBjaGFyYWN0ZXIgYnV0IG5vdCB3aGVuIGl0IGlzIHByZWNlZGVkXG4gKiBieSBhIGJhY2tzbGFzaC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IEEgc3RyaW5nIGlkZW50aWZ5aW5nIHRoZSBwcm9wZXJ0eS5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nW119IFJldHVybnMgYSBsaXN0IG9mIHN0cmluZyBjb250YWluaW5nIGVhY2ggZGVsaW1pdGVkIHByb3BlcnR5LlxuICogZS5nLiBgJ3Byb3AyXFwuZG9tYWluXFwuY29ycC5wcm9wMidgIHNob3VsZCByZXR1cm4gWyAncHJvcDIuZG9tYWluLmNvbScsICdwcm9wMicgXVxuICovXG5mdW5jdGlvbiBzcGxpdFByb3BlcnR5S2V5IChrZXkpIHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgbGV0IGJhY2tzbGFzaCA9IGZhbHNlXG4gIGxldCBzZWdtZW50ID0gJydcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGtleS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGMgPSBrZXkuY2hhckF0KGkpXG5cbiAgICBpZiAoYyA9PT0gJ1xcXFwnKSB7XG4gICAgICBiYWNrc2xhc2ggPSB0cnVlXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGlmIChiYWNrc2xhc2gpIHtcbiAgICAgIGJhY2tzbGFzaCA9IGZhbHNlXG4gICAgICBzZWdtZW50ICs9IGNcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgLyogTm9uLWVzY2FwZWQgZG90LCBwdXNoIHRvIHJlc3VsdCAqL1xuICAgIGlmIChjID09PSAnLicpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHNlZ21lbnQpXG4gICAgICBzZWdtZW50ID0gJydcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgc2VnbWVudCArPSBjXG4gIH1cblxuICAvKiBQdXNoIGxhc3QgZW50cnkgdG8gcmVzdWx0ICovXG4gIGlmIChzZWdtZW50Lmxlbmd0aCkge1xuICAgIHJlc3VsdC5wdXNoKHNlZ21lbnQpXG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UHJvcGVydHlWYWx1ZVxuXG5jb25zdCBzcGxpdFByb3BlcnR5S2V5ID0gcmVxdWlyZSgnLi9zcGxpdC1wcm9wZXJ0eS1rZXknKVxuXG4vKipcbiAqIEdldHMgYSBzcGVjaWZpZWQgcHJvcGVydHkgZnJvbSBhbiBvYmplY3QgaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBiZSBzZWFyY2hlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBwcm9wZXJ0eSBBIHN0cmluZywgb3IgYW4gYXJyYXkgb2Ygc3RyaW5ncywgaWRlbnRpZnlpbmdcbiAqIHRoZSBwcm9wZXJ0eSB0byBiZSByZXRyaWV2ZWQgZnJvbSB0aGUgb2JqZWN0LlxuICogQWNjZXB0cyBuZXN0ZWQgcHJvcGVydGllcyBkZWxpbWl0ZWQgYnkgYSBgLmAuXG4gKiBEZWxpbWl0ZXIgY2FuIGJlIGVzY2FwZWQgdG8gcHJlc2VydmUgcHJvcGVydHkgbmFtZXMgdGhhdCBjb250YWluIHRoZSBkZWxpbWl0ZXIuXG4gKiBlLmcuIGAncHJvcDEucHJvcDInYCBvciBgJ3Byb3AyXFwuZG9tYWluXFwuY29ycC5wcm9wMidgLlxuICpcbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiBnZXRQcm9wZXJ0eVZhbHVlIChvYmosIHByb3BlcnR5KSB7XG4gIGNvbnN0IHByb3BzID0gQXJyYXkuaXNBcnJheShwcm9wZXJ0eSkgPyBwcm9wZXJ0eSA6IHNwbGl0UHJvcGVydHlLZXkocHJvcGVydHkpXG5cbiAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BzKSB7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIG9iaiA9IG9ialtwcm9wXVxuICB9XG5cbiAgcmV0dXJuIG9ialxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlbGV0ZUxvZ1Byb3BlcnR5XG5cbmNvbnN0IGdldFByb3BlcnR5VmFsdWUgPSByZXF1aXJlKCcuL2dldC1wcm9wZXJ0eS12YWx1ZScpXG5jb25zdCBzcGxpdFByb3BlcnR5S2V5ID0gcmVxdWlyZSgnLi9zcGxpdC1wcm9wZXJ0eS1rZXknKVxuXG4vKipcbiAqIERlbGV0ZXMgYSBzcGVjaWZpZWQgcHJvcGVydHkgZnJvbSBhIGxvZyBvYmplY3QgaWYgaXQgZXhpc3RzLlxuICogVGhpcyBmdW5jdGlvbiBtdXRhdGVzIHRoZSBwYXNzZWQgaW4gYGxvZ2Agb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBsb2cgVGhlIGxvZyBvYmplY3QgdG8gYmUgbW9kaWZpZWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgQSBzdHJpbmcgaWRlbnRpZnlpbmcgdGhlIHByb3BlcnR5IHRvIGJlIGRlbGV0ZWQgZnJvbVxuICogdGhlIGxvZyBvYmplY3QuIEFjY2VwdHMgbmVzdGVkIHByb3BlcnRpZXMgZGVsaW1pdGVkIGJ5IGEgYC5gXG4gKiBEZWxpbWl0ZXIgY2FuIGJlIGVzY2FwZWQgdG8gcHJlc2VydmUgcHJvcGVydHkgbmFtZXMgdGhhdCBjb250YWluIHRoZSBkZWxpbWl0ZXIuXG4gKiBlLmcuIGAncHJvcDEucHJvcDInYCBvciBgJ3Byb3AyXFwuZG9tYWluXFwuY29ycC5wcm9wMidgXG4gKi9cbmZ1bmN0aW9uIGRlbGV0ZUxvZ1Byb3BlcnR5IChsb2csIHByb3BlcnR5KSB7XG4gIGNvbnN0IHByb3BzID0gc3BsaXRQcm9wZXJ0eUtleShwcm9wZXJ0eSlcbiAgY29uc3QgcHJvcFRvRGVsZXRlID0gcHJvcHMucG9wKClcblxuICBsb2cgPSBnZXRQcm9wZXJ0eVZhbHVlKGxvZywgcHJvcHMpXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKGxvZyAhPT0gbnVsbCAmJiB0eXBlb2YgbG9nID09PSAnb2JqZWN0JyAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobG9nLCBwcm9wVG9EZWxldGUpKSB7XG4gICAgZGVsZXRlIGxvZ1twcm9wVG9EZWxldGVdXG4gIH1cbn1cbiIsICJleHBvcnQgaW50ZXJmYWNlIENhY2hlIHtcbiAgaGFzOiAodmFsdWU6IGFueSkgPT4gYm9vbGVhbjtcbiAgc2V0OiAoa2V5OiBhbnksIHZhbHVlOiBhbnkpID0+IHZvaWQ7XG4gIGdldDogKGtleTogYW55KSA9PiBhbnk7XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvdW5ib3VuZC1tZXRob2RcbmNvbnN0IHRvU3RyaW5nRnVuY3Rpb24gPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3VuYm91bmQtbWV0aG9kXG5jb25zdCB0b1N0cmluZ09iamVjdCA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogR2V0IGFuIGVtcHR5IHZlcnNpb24gb2YgdGhlIG9iamVjdCB3aXRoIHRoZSBzYW1lIHByb3RvdHlwZSBpdCBoYXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGVhbkNsb25lKHByb3RvdHlwZTogYW55KTogYW55IHtcbiAgaWYgKCFwcm90b3R5cGUpIHtcbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgfVxuXG4gIGNvbnN0IENvbnN0cnVjdG9yID0gcHJvdG90eXBlLmNvbnN0cnVjdG9yO1xuXG4gIGlmIChDb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgcmV0dXJuIHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZSA/IHt9IDogT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUgYXMgb2JqZWN0IHwgbnVsbCk7XG4gIH1cblxuICBpZiAoQ29uc3RydWN0b3IgJiYgfnRvU3RyaW5nRnVuY3Rpb24uY2FsbChDb25zdHJ1Y3RvcikuaW5kZXhPZignW25hdGl2ZSBjb2RlXScpKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBuZXcgQ29uc3RydWN0b3IoKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIElnbm9yZVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSBhcyBvYmplY3QgfCBudWxsKTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHRhZyBvZiB0aGUgdmFsdWUgcGFzc2VkLCBzbyB0aGF0IHRoZSBjb3JyZWN0IGNvcGllciBjYW4gYmUgdXNlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRhZyh2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgY29uc3Qgc3RyaW5nVGFnID0gdmFsdWVbU3ltYm9sLnRvU3RyaW5nVGFnXTtcblxuICBpZiAoc3RyaW5nVGFnKSB7XG4gICAgcmV0dXJuIHN0cmluZ1RhZztcbiAgfVxuXG4gIGNvbnN0IHR5cGUgPSB0b1N0cmluZ09iamVjdC5jYWxsKHZhbHVlKTtcblxuICByZXR1cm4gdHlwZS5zdWJzdHJpbmcoOCwgdHlwZS5sZW5ndGggLSAxKTtcbn1cbiIsICJpbXBvcnQgeyBnZXRDbGVhbkNsb25lIH0gZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgdHlwZSB7IENhY2hlIH0gZnJvbSAnLi91dGlscy50cyc7XG5cbmV4cG9ydCB0eXBlIEludGVybmFsQ29waWVyPFZhbHVlPiA9ICh2YWx1ZTogVmFsdWUsIHN0YXRlOiBTdGF0ZSkgPT4gVmFsdWU7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xuICBDb25zdHJ1Y3RvcjogYW55O1xuICBjYWNoZTogQ2FjaGU7XG4gIGNvcGllcjogSW50ZXJuYWxDb3BpZXI8YW55PjtcbiAgcHJvdG90eXBlOiBhbnk7XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvdW5ib3VuZC1tZXRob2RcbmNvbnN0IHsgaGFzT3duUHJvcGVydHksIHByb3BlcnR5SXNFbnVtZXJhYmxlIH0gPSBPYmplY3QucHJvdG90eXBlO1xuXG5mdW5jdGlvbiBjb3B5T3duRGVzY3JpcHRvcjxWYWx1ZSBleHRlbmRzIG9iamVjdD4oXG4gIG9yaWdpbmFsOiBWYWx1ZSxcbiAgY2xvbmU6IFZhbHVlLFxuICBwcm9wZXJ0eTogc3RyaW5nIHwgc3ltYm9sLFxuICBzdGF0ZTogU3RhdGUsXG4pOiB2b2lkIHtcbiAgY29uc3Qgb3duRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob3JpZ2luYWwsIHByb3BlcnR5KSB8fCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgdmFsdWU6IG9yaWdpbmFsW3Byb3BlcnR5IGFzIGtleW9mIFZhbHVlXSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgfTtcbiAgY29uc3QgZGVzY3JpcHRvciA9XG4gICAgb3duRGVzY3JpcHRvci5nZXQgfHwgb3duRGVzY3JpcHRvci5zZXRcbiAgICAgID8gb3duRGVzY3JpcHRvclxuICAgICAgOiB7XG4gICAgICAgICAgY29uZmlndXJhYmxlOiBvd25EZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSxcbiAgICAgICAgICBlbnVtZXJhYmxlOiBvd25EZXNjcmlwdG9yLmVudW1lcmFibGUsXG4gICAgICAgICAgdmFsdWU6IHN0YXRlLmNvcGllcihvd25EZXNjcmlwdG9yLnZhbHVlLCBzdGF0ZSksXG4gICAgICAgICAgd3JpdGFibGU6IG93bkRlc2NyaXB0b3Iud3JpdGFibGUsXG4gICAgICAgIH07XG5cbiAgdHJ5IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2xvbmUsIHByb3BlcnR5LCBkZXNjcmlwdG9yKTtcbiAgfSBjYXRjaCB7XG4gICAgLy8gVGhlIGFib3ZlIGNhbiBmYWlsIG9uIG5vZGUgaW4gZXh0cmVtZSBlZGdlIGNhc2VzLCBzbyBmYWxsIGJhY2sgdG8gdGhlIGxvb3NlIGFzc2lnbm1lbnQuXG4gICAgY2xvbmVbcHJvcGVydHkgYXMga2V5b2YgVmFsdWVdID0gZGVzY3JpcHRvci5nZXQgPyBkZXNjcmlwdG9yLmdldCgpIDogZGVzY3JpcHRvci52YWx1ZTtcbiAgfVxufVxuXG4vKipcbiAqIFN0cmljbHR5IGNvcHkgYWxsIHByb3BlcnRpZXMgY29udGFpbmVkIG9uIHRoZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGNvcHlPd25Qcm9wZXJ0aWVzU3RyaWN0PFZhbHVlIGV4dGVuZHMgb2JqZWN0Pih2YWx1ZTogVmFsdWUsIGNsb25lOiBWYWx1ZSwgc3RhdGU6IFN0YXRlKTogVmFsdWUge1xuICBjb25zdCBuYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlKTtcblxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbmFtZXMubGVuZ3RoOyArK2luZGV4KSB7XG4gICAgY29weU93bkRlc2NyaXB0b3IodmFsdWUsIGNsb25lLCBuYW1lc1tpbmRleF0hLCBzdGF0ZSk7XG4gIH1cblxuICBjb25zdCBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh2YWx1ZSk7XG5cbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHN5bWJvbHMubGVuZ3RoOyArK2luZGV4KSB7XG4gICAgY29weU93bkRlc2NyaXB0b3IodmFsdWUsIGNsb25lLCBzeW1ib2xzW2luZGV4XSEsIHN0YXRlKTtcbiAgfVxuXG4gIHJldHVybiBjbG9uZTtcbn1cblxuLyoqXG4gKiBEZWVwbHkgY29weSB0aGUgaW5kZXhlZCB2YWx1ZXMgaW4gdGhlIGFycmF5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weUFycmF5TG9vc2UoYXJyYXk6IGFueVtdLCBzdGF0ZTogU3RhdGUpIHtcbiAgY29uc3QgY2xvbmUgPSBuZXcgc3RhdGUuQ29uc3RydWN0b3IoKTtcblxuICAvLyBzZXQgaW4gdGhlIGNhY2hlIGltbWVkaWF0ZWx5IHRvIGJlIGFibGUgdG8gcmV1c2UgdGhlIG9iamVjdCByZWN1cnNpdmVseVxuICBzdGF0ZS5jYWNoZS5zZXQoYXJyYXksIGNsb25lKTtcblxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXJyYXkubGVuZ3RoOyArK2luZGV4KSB7XG4gICAgY2xvbmVbaW5kZXhdID0gc3RhdGUuY29waWVyKGFycmF5W2luZGV4XSwgc3RhdGUpO1xuICB9XG5cbiAgcmV0dXJuIGNsb25lO1xufVxuXG4vKipcbiAqIERlZXBseSBjb3B5IHRoZSBpbmRleGVkIHZhbHVlcyBpbiB0aGUgYXJyYXksIGFzIHdlbGwgYXMgYW55IGN1c3RvbSBwcm9wZXJ0aWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weUFycmF5U3RyaWN0PFZhbHVlIGV4dGVuZHMgYW55W10+KGFycmF5OiBWYWx1ZSwgc3RhdGU6IFN0YXRlKSB7XG4gIGNvbnN0IGNsb25lID0gbmV3IHN0YXRlLkNvbnN0cnVjdG9yKCkgYXMgVmFsdWU7XG5cbiAgLy8gc2V0IGluIHRoZSBjYWNoZSBpbW1lZGlhdGVseSB0byBiZSBhYmxlIHRvIHJldXNlIHRoZSBvYmplY3QgcmVjdXJzaXZlbHlcbiAgc3RhdGUuY2FjaGUuc2V0KGFycmF5LCBjbG9uZSk7XG5cbiAgcmV0dXJuIGNvcHlPd25Qcm9wZXJ0aWVzU3RyaWN0KGFycmF5LCBjbG9uZSwgc3RhdGUpO1xufVxuXG4vKipcbiAqIENvcHkgdGhlIGNvbnRlbnRzIG9mIHRoZSBBcnJheUJ1ZmZlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcHlBcnJheUJ1ZmZlcjxWYWx1ZSBleHRlbmRzIEFycmF5QnVmZmVyTGlrZT4oYXJyYXlCdWZmZXI6IFZhbHVlLCBfc3RhdGU6IFN0YXRlKTogVmFsdWUge1xuICByZXR1cm4gYXJyYXlCdWZmZXIuc2xpY2UoMCkgYXMgVmFsdWU7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IEJsb2Igd2l0aCB0aGUgY29udGVudHMgb2YgdGhlIG9yaWdpbmFsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weUJsb2I8VmFsdWUgZXh0ZW5kcyBCbG9iPihibG9iOiBWYWx1ZSwgX3N0YXRlOiBTdGF0ZSk6IFZhbHVlIHtcbiAgcmV0dXJuIGJsb2Iuc2xpY2UoMCwgYmxvYi5zaXplLCBibG9iLnR5cGUpIGFzIFZhbHVlO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBEYXRhVmlldyB3aXRoIHRoZSBjb250ZW50cyBvZiB0aGUgb3JpZ2luYWwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5RGF0YVZpZXc8VmFsdWUgZXh0ZW5kcyBEYXRhVmlldz4oZGF0YVZpZXc6IFZhbHVlLCBzdGF0ZTogU3RhdGUpOiBWYWx1ZSB7XG4gIHJldHVybiBuZXcgc3RhdGUuQ29uc3RydWN0b3IoY29weUFycmF5QnVmZmVyKGRhdGFWaWV3LmJ1ZmZlciwgc3RhdGUpKTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgRGF0ZSBiYXNlZCBvbiB0aGUgdGltZSBvZiB0aGUgb3JpZ2luYWwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5RGF0ZTxWYWx1ZSBleHRlbmRzIERhdGU+KGRhdGU6IFZhbHVlLCBzdGF0ZTogU3RhdGUpOiBWYWx1ZSB7XG4gIHJldHVybiBuZXcgc3RhdGUuQ29uc3RydWN0b3IoZGF0ZS5nZXRUaW1lKCkpO1xufVxuXG4vKipcbiAqIERlZXBseSBjb3B5IHRoZSBrZXlzIGFuZCB2YWx1ZXMgb2YgdGhlIG9yaWdpbmFsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weU1hcExvb3NlPFZhbHVlIGV4dGVuZHMgTWFwPGFueSwgYW55Pj4obWFwOiBWYWx1ZSwgc3RhdGU6IFN0YXRlKTogVmFsdWUge1xuICBjb25zdCBjbG9uZSA9IG5ldyBzdGF0ZS5Db25zdHJ1Y3RvcigpIGFzIFZhbHVlO1xuXG4gIC8vIHNldCBpbiB0aGUgY2FjaGUgaW1tZWRpYXRlbHkgdG8gYmUgYWJsZSB0byByZXVzZSB0aGUgb2JqZWN0IHJlY3Vyc2l2ZWx5XG4gIHN0YXRlLmNhY2hlLnNldChtYXAsIGNsb25lKTtcblxuICBtYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgIGNsb25lLnNldChrZXksIHN0YXRlLmNvcGllcih2YWx1ZSwgc3RhdGUpKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNsb25lO1xufVxuXG4vKipcbiAqIERlZXBseSBjb3B5IHRoZSBrZXlzIGFuZCB2YWx1ZXMgb2YgdGhlIG9yaWdpbmFsLCBhcyB3ZWxsIGFzIGFueSBjdXN0b20gcHJvcGVydGllcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcHlNYXBTdHJpY3Q8VmFsdWUgZXh0ZW5kcyBNYXA8YW55LCBhbnk+PihtYXA6IFZhbHVlLCBzdGF0ZTogU3RhdGUpIHtcbiAgcmV0dXJuIGNvcHlPd25Qcm9wZXJ0aWVzU3RyaWN0KG1hcCwgY29weU1hcExvb3NlKG1hcCwgc3RhdGUpLCBzdGF0ZSk7XG59XG5cbi8qKlxuICogRGVlcGx5IGNvcHkgdGhlIHByb3BlcnRpZXMgKGtleXMgYW5kIHN5bWJvbHMpIGFuZCB2YWx1ZXMgb2YgdGhlIG9yaWdpbmFsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weU9iamVjdExvb3NlPFZhbHVlIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgYW55Pj4ob2JqZWN0OiBWYWx1ZSwgc3RhdGU6IFN0YXRlKTogVmFsdWUge1xuICBjb25zdCBjbG9uZSA9IGdldENsZWFuQ2xvbmUoc3RhdGUucHJvdG90eXBlKTtcblxuICAvLyBzZXQgaW4gdGhlIGNhY2hlIGltbWVkaWF0ZWx5IHRvIGJlIGFibGUgdG8gcmV1c2UgdGhlIG9iamVjdCByZWN1cnNpdmVseVxuICBzdGF0ZS5jYWNoZS5zZXQob2JqZWN0LCBjbG9uZSk7XG5cbiAgZm9yIChjb25zdCBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICBjbG9uZVtrZXldID0gc3RhdGUuY29waWVyKG9iamVjdFtrZXldLCBzdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KTtcblxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc3ltYm9scy5sZW5ndGg7ICsraW5kZXgpIHtcbiAgICBjb25zdCBzeW1ib2wgPSBzeW1ib2xzW2luZGV4XSE7XG5cbiAgICBpZiAocHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmplY3QsIHN5bWJvbCkpIHtcbiAgICAgIGNsb25lW3N5bWJvbF0gPSBzdGF0ZS5jb3BpZXIoKG9iamVjdCBhcyBhbnkpW3N5bWJvbF0sIHN0YXRlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY2xvbmU7XG59XG5cbi8qKlxuICogRGVlcGx5IGNvcHkgdGhlIHByb3BlcnRpZXMgKGtleXMgYW5kIHN5bWJvbHMpIGFuZCB2YWx1ZXMgb2YgdGhlIG9yaWdpbmFsLCBhcyB3ZWxsXG4gKiBhcyBhbnkgaGlkZGVuIG9yIG5vbi1lbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5T2JqZWN0U3RyaWN0PFZhbHVlIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgYW55Pj4ob2JqZWN0OiBWYWx1ZSwgc3RhdGU6IFN0YXRlKTogVmFsdWUge1xuICBjb25zdCBjbG9uZSA9IGdldENsZWFuQ2xvbmUoc3RhdGUucHJvdG90eXBlKTtcblxuICAvLyBzZXQgaW4gdGhlIGNhY2hlIGltbWVkaWF0ZWx5IHRvIGJlIGFibGUgdG8gcmV1c2UgdGhlIG9iamVjdCByZWN1cnNpdmVseVxuICBzdGF0ZS5jYWNoZS5zZXQob2JqZWN0LCBjbG9uZSk7XG5cbiAgcmV0dXJuIGNvcHlPd25Qcm9wZXJ0aWVzU3RyaWN0KG9iamVjdCwgY2xvbmUsIHN0YXRlKTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgcHJpbWl0aXZlIHdyYXBwZXIgZnJvbSB0aGUgdmFsdWUgb2YgdGhlIG9yaWdpbmFsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weVByaW1pdGl2ZVdyYXBwZXI8XG4gIC8vIFNwZWNpZmljYWxseSB1c2UgdGhlIG9iamVjdCBjb25zdHJ1Y3RvciB0eXBlc1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXdyYXBwZXItb2JqZWN0LXR5cGVzXG4gIFZhbHVlIGV4dGVuZHMgQm9vbGVhbiB8IE51bWJlciB8IFN0cmluZyxcbj4ocHJpbWl0aXZlT2JqZWN0OiBWYWx1ZSwgc3RhdGU6IFN0YXRlKTogVmFsdWUge1xuICByZXR1cm4gbmV3IHN0YXRlLkNvbnN0cnVjdG9yKHByaW1pdGl2ZU9iamVjdC52YWx1ZU9mKCkpO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBSZWdFeHAgYmFzZWQgb24gdGhlIHZhbHVlIGFuZCBmbGFncyBvZiB0aGUgb3JpZ2luYWwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5UmVnRXhwPFZhbHVlIGV4dGVuZHMgUmVnRXhwPihyZWdFeHA6IFZhbHVlLCBzdGF0ZTogU3RhdGUpOiBWYWx1ZSB7XG4gIGNvbnN0IGNsb25lID0gbmV3IHN0YXRlLkNvbnN0cnVjdG9yKHJlZ0V4cC5zb3VyY2UsIHJlZ0V4cC5mbGFncykgYXMgVmFsdWU7XG5cbiAgY2xvbmUubGFzdEluZGV4ID0gcmVnRXhwLmxhc3RJbmRleDtcblxuICByZXR1cm4gY2xvbmU7XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBvcmlnaW5hbCB2YWx1ZSAoYW4gaWRlbnRpdHkgZnVuY3Rpb24pLlxuICpcbiAqIEBub3RlXG4gKiBUSGlzIGlzIHVzZWQgZm9yIG9iamVjdHMgdGhhdCBjYW5ub3QgYmUgY29waWVkLCBzdWNoIGFzIFdlYWtNYXAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5U2VsZjxWYWx1ZT4odmFsdWU6IFZhbHVlLCBfc3RhdGU6IFN0YXRlKTogVmFsdWUge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbi8qKlxuICogRGVlcGx5IGNvcHkgdGhlIHZhbHVlcyBvZiB0aGUgb3JpZ2luYWwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5U2V0TG9vc2U8VmFsdWUgZXh0ZW5kcyBTZXQ8YW55Pj4oc2V0OiBWYWx1ZSwgc3RhdGU6IFN0YXRlKTogVmFsdWUge1xuICBjb25zdCBjbG9uZSA9IG5ldyBzdGF0ZS5Db25zdHJ1Y3RvcigpIGFzIFZhbHVlO1xuXG4gIC8vIHNldCBpbiB0aGUgY2FjaGUgaW1tZWRpYXRlbHkgdG8gYmUgYWJsZSB0byByZXVzZSB0aGUgb2JqZWN0IHJlY3Vyc2l2ZWx5XG4gIHN0YXRlLmNhY2hlLnNldChzZXQsIGNsb25lKTtcblxuICBzZXQuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICBjbG9uZS5hZGQoc3RhdGUuY29waWVyKHZhbHVlLCBzdGF0ZSkpO1xuICB9KTtcblxuICByZXR1cm4gY2xvbmU7XG59XG5cbi8qKlxuICogRGVlcGx5IGNvcHkgdGhlIHZhbHVlcyBvZiB0aGUgb3JpZ2luYWwsIGFzIHdlbGwgYXMgYW55IGN1c3RvbSBwcm9wZXJ0aWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weVNldFN0cmljdDxWYWx1ZSBleHRlbmRzIFNldDxhbnk+PihzZXQ6IFZhbHVlLCBzdGF0ZTogU3RhdGUpOiBWYWx1ZSB7XG4gIHJldHVybiBjb3B5T3duUHJvcGVydGllc1N0cmljdChzZXQsIGNvcHlTZXRMb29zZShzZXQsIHN0YXRlKSwgc3RhdGUpO1xufVxuIiwgImltcG9ydCB7XG4gIGNvcHlBcnJheUJ1ZmZlcixcbiAgY29weUFycmF5TG9vc2UsXG4gIGNvcHlBcnJheVN0cmljdCxcbiAgY29weUJsb2IsXG4gIGNvcHlEYXRhVmlldyxcbiAgY29weURhdGUsXG4gIGNvcHlNYXBMb29zZSxcbiAgY29weU1hcFN0cmljdCxcbiAgY29weU9iamVjdExvb3NlLFxuICBjb3B5T2JqZWN0U3RyaWN0LFxuICBjb3B5UHJpbWl0aXZlV3JhcHBlcixcbiAgY29weVJlZ0V4cCxcbiAgY29weVNlbGYsXG4gIGNvcHlTZXRMb29zZSxcbiAgY29weVNldFN0cmljdCxcbn0gZnJvbSAnLi9jb3BpZXIuanMnO1xuaW1wb3J0IHR5cGUgeyBJbnRlcm5hbENvcGllciB9IGZyb20gJy4vY29waWVyLnRzJztcbmltcG9ydCB0eXBlIHsgQ2FjaGUgfSBmcm9tICcuL3V0aWxzLnRzJztcblxuZXhwb3J0IGludGVyZmFjZSBDb3BpZXJNZXRob2RzIHtcbiAgYXJyYXk/OiBJbnRlcm5hbENvcGllcjxhbnlbXT47XG4gIGFycmF5QnVmZmVyPzogSW50ZXJuYWxDb3BpZXI8QXJyYXlCdWZmZXI+O1xuICBhc3luY0dlbmVyYXRvcj86IEludGVybmFsQ29waWVyPEFzeW5jR2VuZXJhdG9yPjtcbiAgYmxvYj86IEludGVybmFsQ29waWVyPEJsb2I+O1xuICBkYXRhVmlldz86IEludGVybmFsQ29waWVyPERhdGFWaWV3PjtcbiAgZGF0ZT86IEludGVybmFsQ29waWVyPERhdGU+O1xuICBlcnJvcj86IEludGVybmFsQ29waWVyPEVycm9yPjtcbiAgZ2VuZXJhdG9yPzogSW50ZXJuYWxDb3BpZXI8R2VuZXJhdG9yPjtcbiAgbWFwPzogSW50ZXJuYWxDb3BpZXI8TWFwPGFueSwgYW55Pj47XG4gIG9iamVjdD86IEludGVybmFsQ29waWVyPFJlY29yZDxzdHJpbmcsIGFueT4+O1xuICByZWdFeHA/OiBJbnRlcm5hbENvcGllcjxSZWdFeHA+O1xuICBzZXQ/OiBJbnRlcm5hbENvcGllcjxTZXQ8YW55Pj47XG59XG5cbmludGVyZmFjZSBDb3BpZXJzIHtcbiAgW2tleTogc3RyaW5nXTogSW50ZXJuYWxDb3BpZXI8YW55PiB8IHVuZGVmaW5lZDtcblxuICBBcmd1bWVudHM6IEludGVybmFsQ29waWVyPFJlY29yZDxzdHJpbmcsIGFueT4+O1xuICBBcnJheTogSW50ZXJuYWxDb3BpZXI8YW55W10+O1xuICBBcnJheUJ1ZmZlcjogSW50ZXJuYWxDb3BpZXI8QXJyYXlCdWZmZXI+O1xuICBBc3luY0dlbmVyYXRvcjogSW50ZXJuYWxDb3BpZXI8QXN5bmNHZW5lcmF0b3I+O1xuICBCaWdJbnQ2NEFycmF5OiBJbnRlcm5hbENvcGllcjxBcnJheUJ1ZmZlcj47XG4gIEJpZ1VpbnQ2NEFycmF5OiBJbnRlcm5hbENvcGllcjxBcnJheUJ1ZmZlcj47XG4gIEJsb2I6IEludGVybmFsQ29waWVyPEJsb2I+O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXdyYXBwZXItb2JqZWN0LXR5cGVzXG4gIEJvb2xlYW46IEludGVybmFsQ29waWVyPEJvb2xlYW4+O1xuICBEYXRhVmlldzogSW50ZXJuYWxDb3BpZXI8RGF0YVZpZXc+O1xuICBEYXRlOiBJbnRlcm5hbENvcGllcjxEYXRlPjtcbiAgRXJyb3I6IEludGVybmFsQ29waWVyPEVycm9yPjtcbiAgRmxvYXQzMkFycmF5OiBJbnRlcm5hbENvcGllcjxBcnJheUJ1ZmZlcj47XG4gIEZsb2F0NjRBcnJheTogSW50ZXJuYWxDb3BpZXI8QXJyYXlCdWZmZXI+O1xuICBHZW5lcmF0b3I6IEludGVybmFsQ29waWVyPEdlbmVyYXRvcj47XG4gIEludDhBcnJheTogSW50ZXJuYWxDb3BpZXI8QXJyYXlCdWZmZXI+O1xuICBJbnQxNkFycmF5OiBJbnRlcm5hbENvcGllcjxBcnJheUJ1ZmZlcj47XG4gIEludDMyQXJyYXk6IEludGVybmFsQ29waWVyPEFycmF5QnVmZmVyPjtcbiAgTWFwOiBJbnRlcm5hbENvcGllcjxNYXA8YW55LCBhbnk+PjtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby13cmFwcGVyLW9iamVjdC10eXBlc1xuICBOdW1iZXI6IEludGVybmFsQ29waWVyPE51bWJlcj47XG4gIE9iamVjdDogSW50ZXJuYWxDb3BpZXI8UmVjb3JkPHN0cmluZywgYW55Pj47XG4gIFByb21pc2U6IEludGVybmFsQ29waWVyPFByb21pc2U8YW55Pj47XG4gIFJlZ0V4cDogSW50ZXJuYWxDb3BpZXI8UmVnRXhwPjtcbiAgU2V0OiBJbnRlcm5hbENvcGllcjxTZXQ8YW55Pj47XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8td3JhcHBlci1vYmplY3QtdHlwZXNcbiAgU3RyaW5nOiBJbnRlcm5hbENvcGllcjxTdHJpbmc+O1xuICBXZWFrTWFwOiBJbnRlcm5hbENvcGllcjxXZWFrTWFwPGFueSwgYW55Pj47XG4gIFdlYWtTZXQ6IEludGVybmFsQ29waWVyPFdlYWtTZXQ8YW55Pj47XG4gIFVpbnQ4QXJyYXk6IEludGVybmFsQ29waWVyPEFycmF5QnVmZmVyPjtcbiAgVWludDhDbGFtcGVkQXJyYXk6IEludGVybmFsQ29waWVyPEFycmF5QnVmZmVyPjtcbiAgVWludDE2QXJyYXk6IEludGVybmFsQ29waWVyPEFycmF5QnVmZmVyPjtcbiAgVWludDMyQXJyYXk6IEludGVybmFsQ29waWVyPEFycmF5QnVmZmVyPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDcmVhdGVDb3BpZXJPcHRpb25zIHtcbiAgY3JlYXRlQ2FjaGU/OiAoKSA9PiBDYWNoZTtcbiAgbWV0aG9kcz86IENvcGllck1ldGhvZHM7XG4gIHN0cmljdD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWlyZWRDcmVhdGVDb3BpZXJPcHRpb25zIGV4dGVuZHMgT21pdDxSZXF1aXJlZDxDcmVhdGVDb3BpZXJPcHRpb25zPiwgJ21ldGhvZHMnPiB7XG4gIGNvcGllcnM6IENvcGllcnM7XG4gIG1ldGhvZHM6IFJlcXVpcmVkPENvcGllck1ldGhvZHM+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGVmYXVsdENhY2hlKCk6IENhY2hlIHtcbiAgcmV0dXJuIG5ldyBXZWFrTWFwKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRPcHRpb25zKHtcbiAgY3JlYXRlQ2FjaGU6IGNyZWF0ZUNhY2hlT3ZlcnJpZGUsXG4gIG1ldGhvZHM6IG1ldGhvZHNPdmVycmlkZSxcbiAgc3RyaWN0LFxufTogQ3JlYXRlQ29waWVyT3B0aW9ucyk6IFJlcXVpcmVkQ3JlYXRlQ29waWVyT3B0aW9ucyB7XG4gIGNvbnN0IGRlZmF1bHRNZXRob2RzID0ge1xuICAgIGFycmF5OiBzdHJpY3QgPyBjb3B5QXJyYXlTdHJpY3QgOiBjb3B5QXJyYXlMb29zZSxcbiAgICBhcnJheUJ1ZmZlcjogY29weUFycmF5QnVmZmVyLFxuICAgIGFzeW5jR2VuZXJhdG9yOiBjb3B5U2VsZixcbiAgICBibG9iOiBjb3B5QmxvYixcbiAgICBkYXRhVmlldzogY29weURhdGFWaWV3LFxuICAgIGRhdGU6IGNvcHlEYXRlLFxuICAgIGVycm9yOiBjb3B5U2VsZixcbiAgICBnZW5lcmF0b3I6IGNvcHlTZWxmLFxuICAgIG1hcDogc3RyaWN0ID8gY29weU1hcFN0cmljdCA6IGNvcHlNYXBMb29zZSxcbiAgICBvYmplY3Q6IHN0cmljdCA/IGNvcHlPYmplY3RTdHJpY3QgOiBjb3B5T2JqZWN0TG9vc2UsXG4gICAgcmVnRXhwOiBjb3B5UmVnRXhwLFxuICAgIHNldDogc3RyaWN0ID8gY29weVNldFN0cmljdCA6IGNvcHlTZXRMb29zZSxcbiAgfTtcblxuICBjb25zdCBtZXRob2RzID0gbWV0aG9kc092ZXJyaWRlID8gT2JqZWN0LmFzc2lnbihkZWZhdWx0TWV0aG9kcywgbWV0aG9kc092ZXJyaWRlKSA6IGRlZmF1bHRNZXRob2RzO1xuICBjb25zdCBjb3BpZXJzID0gZ2V0VGFnU3BlY2lmaWNDb3BpZXJzKG1ldGhvZHMpO1xuICBjb25zdCBjcmVhdGVDYWNoZSA9IGNyZWF0ZUNhY2hlT3ZlcnJpZGUgfHwgY3JlYXRlRGVmYXVsdENhY2hlO1xuXG4gIC8vIEV4dHJhIHNhZmV0eSBjaGVjayB0byBlbnN1cmUgdGhhdCBvYmplY3QgYW5kIGFycmF5IGNvcGllcnMgYXJlIGFsd2F5cyBwcm92aWRlZCxcbiAgLy8gYXZvaWRpbmcgcnVudGltZSBlcnJvcnMuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5uZWNlc3NhcnktY29uZGl0aW9uXG4gIGlmICghY29waWVycy5PYmplY3QgfHwgIWNvcGllcnMuQXJyYXkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FuIG9iamVjdCBhbmQgYXJyYXkgY29waWVyIG11c3QgYmUgcHJvdmlkZWQuJyk7XG4gIH1cblxuICByZXR1cm4geyBjcmVhdGVDYWNoZSwgY29waWVycywgbWV0aG9kcywgc3RyaWN0OiBCb29sZWFuKHN0cmljdCkgfTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGNvcGllcnMgdXNlZCBmb3IgZWFjaCBzcGVjaWZpYyBvYmplY3QgdGFnLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFnU3BlY2lmaWNDb3BpZXJzKG1ldGhvZHM6IFJlcXVpcmVkPENvcGllck1ldGhvZHM+KTogQ29waWVycyB7XG4gIHJldHVybiB7XG4gICAgQXJndW1lbnRzOiBtZXRob2RzLm9iamVjdCxcbiAgICBBcnJheTogbWV0aG9kcy5hcnJheSxcbiAgICBBcnJheUJ1ZmZlcjogbWV0aG9kcy5hcnJheUJ1ZmZlcixcbiAgICBBc3luY0dlbmVyYXRvcjogbWV0aG9kcy5hc3luY0dlbmVyYXRvcixcbiAgICBCaWdJbnQ2NEFycmF5OiBtZXRob2RzLmFycmF5QnVmZmVyLFxuICAgIEJpZ1VpbnQ2NEFycmF5OiBtZXRob2RzLmFycmF5QnVmZmVyLFxuICAgIEJsb2I6IG1ldGhvZHMuYmxvYixcbiAgICBCb29sZWFuOiBjb3B5UHJpbWl0aXZlV3JhcHBlcixcbiAgICBEYXRhVmlldzogbWV0aG9kcy5kYXRhVmlldyxcbiAgICBEYXRlOiBtZXRob2RzLmRhdGUsXG4gICAgRXJyb3I6IG1ldGhvZHMuZXJyb3IsXG4gICAgRmxvYXQzMkFycmF5OiBtZXRob2RzLmFycmF5QnVmZmVyLFxuICAgIEZsb2F0NjRBcnJheTogbWV0aG9kcy5hcnJheUJ1ZmZlcixcbiAgICBHZW5lcmF0b3I6IG1ldGhvZHMuZ2VuZXJhdG9yLFxuICAgIEludDhBcnJheTogbWV0aG9kcy5hcnJheUJ1ZmZlcixcbiAgICBJbnQxNkFycmF5OiBtZXRob2RzLmFycmF5QnVmZmVyLFxuICAgIEludDMyQXJyYXk6IG1ldGhvZHMuYXJyYXlCdWZmZXIsXG4gICAgTWFwOiBtZXRob2RzLm1hcCxcbiAgICBOdW1iZXI6IGNvcHlQcmltaXRpdmVXcmFwcGVyLFxuICAgIE9iamVjdDogbWV0aG9kcy5vYmplY3QsXG4gICAgUHJvbWlzZTogY29weVNlbGYsXG4gICAgUmVnRXhwOiBtZXRob2RzLnJlZ0V4cCxcbiAgICBTZXQ6IG1ldGhvZHMuc2V0LFxuICAgIFN0cmluZzogY29weVByaW1pdGl2ZVdyYXBwZXIsXG4gICAgV2Vha01hcDogY29weVNlbGYsXG4gICAgV2Vha1NldDogY29weVNlbGYsXG4gICAgVWludDhBcnJheTogbWV0aG9kcy5hcnJheUJ1ZmZlcixcbiAgICBVaW50OENsYW1wZWRBcnJheTogbWV0aG9kcy5hcnJheUJ1ZmZlcixcbiAgICBVaW50MTZBcnJheTogbWV0aG9kcy5hcnJheUJ1ZmZlcixcbiAgICBVaW50MzJBcnJheTogbWV0aG9kcy5hcnJheUJ1ZmZlcixcbiAgfTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFN0YXRlIH0gZnJvbSAnLi9jb3BpZXIudHMnO1xuaW1wb3J0IHsgZ2V0T3B0aW9ucyB9IGZyb20gJy4vb3B0aW9ucy5qcyc7XG5pbXBvcnQgdHlwZSB7IENyZWF0ZUNvcGllck9wdGlvbnMgfSBmcm9tICcuL29wdGlvbnMudHMnO1xuaW1wb3J0IHsgZ2V0VGFnIH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmV4cG9ydCB0eXBlIHsgU3RhdGUgfSBmcm9tICcuL2NvcGllci50cyc7XG5leHBvcnQgdHlwZSB7IENyZWF0ZUNvcGllck9wdGlvbnMgfSBmcm9tICcuL29wdGlvbnMudHMnO1xuXG4vKipcbiAqIENyZWF0ZSBhIGN1c3RvbSBjb3BpZXIgYmFzZWQgb24gY3VzdG9tIG9wdGlvbnMgZm9yIGFueSBvZiB0aGUgZm9sbG93aW5nOlxuICogICAtIGBjcmVhdGVDYWNoZWAgbWV0aG9kIHRvIGNyZWF0ZSBhIGNhY2hlIGZvciBjb3BpZWQgb2JqZWN0c1xuICogICAtIGN1c3RvbSBjb3BpZXIgYG1ldGhvZHNgIGZvciBzcGVjaWZpYyBvYmplY3QgdHlwZXNcbiAqICAgLSBgc3RyaWN0YCBtb2RlIHRvIGNvcHkgYWxsIHByb3BlcnRpZXMgd2l0aCB0aGVpciBkZXNjcmlwdG9yc1xuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29waWVyKG9wdGlvbnM6IENyZWF0ZUNvcGllck9wdGlvbnMgPSB7fSkge1xuICBjb25zdCB7IGNyZWF0ZUNhY2hlLCBjb3BpZXJzIH0gPSBnZXRPcHRpb25zKG9wdGlvbnMpO1xuICBjb25zdCB7IEFycmF5OiBjb3B5QXJyYXksIE9iamVjdDogY29weU9iamVjdCB9ID0gY29waWVycztcblxuICBmdW5jdGlvbiBjb3BpZXIodmFsdWU6IGFueSwgc3RhdGU6IFN0YXRlKTogYW55IHtcbiAgICBzdGF0ZS5wcm90b3R5cGUgPSBzdGF0ZS5Db25zdHJ1Y3RvciA9IHVuZGVmaW5lZDtcblxuICAgIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGlmIChzdGF0ZS5jYWNoZS5oYXModmFsdWUpKSB7XG4gICAgICByZXR1cm4gc3RhdGUuY2FjaGUuZ2V0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBzdGF0ZS5wcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsdWUpO1xuICAgIC8vIFVzaW5nIGxvZ2ljYWwgQU5EIGZvciBzcGVlZCwgc2luY2Ugb3B0aW9uYWwgY2hhaW5pbmcgdHJhbnNmb3JtcyB0b1xuICAgIC8vIGEgbG9jYWwgdmFyaWFibGUgdXNhZ2UuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9wcmVmZXItb3B0aW9uYWwtY2hhaW5cbiAgICBzdGF0ZS5Db25zdHJ1Y3RvciA9IHN0YXRlLnByb3RvdHlwZSAmJiBzdGF0ZS5wcm90b3R5cGUuY29uc3RydWN0b3I7XG5cbiAgICAvLyBwbGFpbiBvYmplY3RzXG4gICAgaWYgKCFzdGF0ZS5Db25zdHJ1Y3RvciB8fCBzdGF0ZS5Db25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICByZXR1cm4gY29weU9iamVjdCh2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBzdGF0ZSk7XG4gICAgfVxuXG4gICAgLy8gYXJyYXlzXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY29weUFycmF5KHZhbHVlLCBzdGF0ZSk7XG4gICAgfVxuXG4gICAgY29uc3QgdGFnU3BlY2lmaWNDb3BpZXIgPSBjb3BpZXJzW2dldFRhZyh2YWx1ZSldO1xuXG4gICAgaWYgKHRhZ1NwZWNpZmljQ29waWVyKSB7XG4gICAgICByZXR1cm4gdGFnU3BlY2lmaWNDb3BpZXIodmFsdWUsIHN0YXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicgPyB2YWx1ZSA6IGNvcHlPYmplY3QodmFsdWUgYXMgUmVjb3JkPHN0cmluZywgYW55Piwgc3RhdGUpO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGNvcHk8VmFsdWU+KHZhbHVlOiBWYWx1ZSk6IFZhbHVlIHtcbiAgICByZXR1cm4gY29waWVyKHZhbHVlLCB7XG4gICAgICBDb25zdHJ1Y3RvcjogdW5kZWZpbmVkLFxuICAgICAgY2FjaGU6IGNyZWF0ZUNhY2hlKCksXG4gICAgICBjb3BpZXIsXG4gICAgICBwcm90b3R5cGU6IHVuZGVmaW5lZCxcbiAgICB9KTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDb3B5IGFuIHZhbHVlIGRlZXBseSBhcyBtdWNoIGFzIHBvc3NpYmxlLCB3aGVyZSBzdHJpY3QgcmVjcmVhdGlvbiBvZiBvYmplY3QgcHJvcGVydGllc1xuICogYXJlIG1haW50YWluZWQuIEFsbCBwcm9wZXJ0aWVzIChpbmNsdWRpbmcgbm9uLWVudW1lcmFibGUgb25lcykgYXJlIGNvcGllZCB3aXRoIHRoZWlyXG4gKiBvcmlnaW5hbCBwcm9wZXJ0eSBkZXNjcmlwdG9ycyBvbiBib3RoIG9iamVjdHMgYW5kIGFycmF5cy5cbiAqL1xuZXhwb3J0IGNvbnN0IGNvcHlTdHJpY3QgPSBjcmVhdGVDb3BpZXIoeyBzdHJpY3Q6IHRydWUgfSk7XG5cbi8qKlxuICogQ29weSBhbiB2YWx1ZSBkZWVwbHkgYXMgbXVjaCBhcyBwb3NzaWJsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGNvcHkgPSBjcmVhdGVDb3BpZXIoKTtcbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBmaWx0ZXJMb2dcblxuY29uc3QgeyBjcmVhdGVDb3BpZXIgfSA9IHJlcXVpcmUoJ2Zhc3QtY29weScpXG5jb25zdCBmYXN0Q29weSA9IGNyZWF0ZUNvcGllcih7fSlcblxuY29uc3QgZGVsZXRlTG9nUHJvcGVydHkgPSByZXF1aXJlKCcuL2RlbGV0ZS1sb2ctcHJvcGVydHknKVxuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IEZpbHRlckxvZ1BhcmFtc1xuICogQHByb3BlcnR5IHtvYmplY3R9IGxvZyBUaGUgbG9nIG9iamVjdCB0byBiZSBtb2RpZmllZC5cbiAqIEBwcm9wZXJ0eSB7UHJldHR5Q29udGV4dH0gY29udGV4dCBUaGUgY29udGV4dCBvYmplY3QgYnVpbHQgZnJvbSBwYXJzaW5nXG4gKiB0aGUgb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEZpbHRlciBhIGxvZyBvYmplY3QgYnkgcmVtb3Zpbmcgb3IgaW5jbHVkaW5nIGtleXMgYWNjb3JkaW5nbHkuXG4gKiBXaGVuIGBpbmNsdWRlS2V5c2AgaXMgcGFzc2VkLCBgaWdub3JlZEtleXNgIHdpbGwgYmUgaWdub3JlZC5cbiAqIE9uZSBvZiBpZ25vcmVLZXlzIG9yIGluY2x1ZGVLZXlzIG11c3QgYmUgcGFzcyBpbi5cbiAqXG4gKiBAcGFyYW0ge0ZpbHRlckxvZ1BhcmFtc30gaW5wdXRcbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBBIG5ldyBgbG9nYCBvYmplY3QgaW5zdGFuY2UgdGhhdFxuICogIGVpdGhlciBvbmx5IGluY2x1ZGVzIHRoZSBrZXlzIGluIGlnbm9yZUtleXNcbiAqICBvciBkb2VzIG5vdCBpbmNsdWRlIHRob3NlIGluIGlnbm9yZWRLZXlzLlxuICovXG5mdW5jdGlvbiBmaWx0ZXJMb2cgKHsgbG9nLCBjb250ZXh0IH0pIHtcbiAgY29uc3QgeyBpZ25vcmVLZXlzLCBpbmNsdWRlS2V5cyB9ID0gY29udGV4dFxuICBjb25zdCBsb2dDb3B5ID0gZmFzdENvcHkobG9nKVxuXG4gIGlmIChpbmNsdWRlS2V5cykge1xuICAgIGNvbnN0IGxvZ0luY2x1ZGVkID0ge31cblxuICAgIGluY2x1ZGVLZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgbG9nSW5jbHVkZWRba2V5XSA9IGxvZ0NvcHlba2V5XVxuICAgIH0pXG4gICAgcmV0dXJuIGxvZ0luY2x1ZGVkXG4gIH1cblxuICBpZ25vcmVLZXlzLmZvckVhY2goKGlnbm9yZUtleSkgPT4ge1xuICAgIGRlbGV0ZUxvZ1Byb3BlcnR5KGxvZ0NvcHksIGlnbm9yZUtleSlcbiAgfSlcbiAgcmV0dXJuIGxvZ0NvcHlcbn1cbiIsICJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfdHlwZW9mKG9iail7XCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO2lmKHR5cGVvZiBTeW1ib2w9PT1cImZ1bmN0aW9uXCImJnR5cGVvZiBTeW1ib2wuaXRlcmF0b3I9PT1cInN5bWJvbFwiKXtfdHlwZW9mPWZ1bmN0aW9uIF90eXBlb2Yob2JqKXtyZXR1cm4gdHlwZW9mIG9ian19ZWxzZXtfdHlwZW9mPWZ1bmN0aW9uIF90eXBlb2Yob2JqKXtyZXR1cm4gb2JqJiZ0eXBlb2YgU3ltYm9sPT09XCJmdW5jdGlvblwiJiZvYmouY29uc3RydWN0b3I9PT1TeW1ib2wmJm9iaiE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2Ygb2JqfX1yZXR1cm4gX3R5cGVvZihvYmopfShmdW5jdGlvbihnbG9iYWwpe3ZhciBfYXJndW1lbnRzPWFyZ3VtZW50czt2YXIgZGF0ZUZvcm1hdD1mdW5jdGlvbigpe3ZhciB0b2tlbj0vZHsxLDR9fER7Myw0fXxtezEsNH18eXkoPzp5eSk/fChbSGhNc1R0XSlcXDE/fFd7MSwyfXxbTGxvcFNaTl18XCJbXlwiXSpcInwnW14nXSonL2c7dmFyIHRpbWV6b25lPS9cXGIoPzpbUE1DRUFdW1NEUF1UfCg/OlBhY2lmaWN8TW91bnRhaW58Q2VudHJhbHxFYXN0ZXJufEF0bGFudGljKSAoPzpTdGFuZGFyZHxEYXlsaWdodHxQcmV2YWlsaW5nKSBUaW1lfCg/OkdNVHxVVEMpKD86Wy0rXVxcZHs0fSk/KVxcYi9nO3ZhciB0aW1lem9uZUNsaXA9L1teLStcXGRBLVpdL2c7cmV0dXJuIGZ1bmN0aW9uKGRhdGUsbWFzayx1dGMsZ210KXtpZihfYXJndW1lbnRzLmxlbmd0aD09PTEmJmtpbmRPZihkYXRlKT09PVwic3RyaW5nXCImJiEvXFxkLy50ZXN0KGRhdGUpKXttYXNrPWRhdGU7ZGF0ZT11bmRlZmluZWR9ZGF0ZT1kYXRlfHxkYXRlPT09MD9kYXRlOm5ldyBEYXRlO2lmKCEoZGF0ZSBpbnN0YW5jZW9mIERhdGUpKXtkYXRlPW5ldyBEYXRlKGRhdGUpfWlmKGlzTmFOKGRhdGUpKXt0aHJvdyBUeXBlRXJyb3IoXCJJbnZhbGlkIGRhdGVcIil9bWFzaz1TdHJpbmcoZGF0ZUZvcm1hdC5tYXNrc1ttYXNrXXx8bWFza3x8ZGF0ZUZvcm1hdC5tYXNrc1tcImRlZmF1bHRcIl0pO3ZhciBtYXNrU2xpY2U9bWFzay5zbGljZSgwLDQpO2lmKG1hc2tTbGljZT09PVwiVVRDOlwifHxtYXNrU2xpY2U9PT1cIkdNVDpcIil7bWFzaz1tYXNrLnNsaWNlKDQpO3V0Yz10cnVlO2lmKG1hc2tTbGljZT09PVwiR01UOlwiKXtnbXQ9dHJ1ZX19dmFyIF89ZnVuY3Rpb24gXygpe3JldHVybiB1dGM/XCJnZXRVVENcIjpcImdldFwifTt2YXIgX2Q9ZnVuY3Rpb24gZCgpe3JldHVybiBkYXRlW18oKStcIkRhdGVcIl0oKX07dmFyIEQ9ZnVuY3Rpb24gRCgpe3JldHVybiBkYXRlW18oKStcIkRheVwiXSgpfTt2YXIgX209ZnVuY3Rpb24gbSgpe3JldHVybiBkYXRlW18oKStcIk1vbnRoXCJdKCl9O3ZhciB5PWZ1bmN0aW9uIHkoKXtyZXR1cm4gZGF0ZVtfKCkrXCJGdWxsWWVhclwiXSgpfTt2YXIgX0g9ZnVuY3Rpb24gSCgpe3JldHVybiBkYXRlW18oKStcIkhvdXJzXCJdKCl9O3ZhciBfTT1mdW5jdGlvbiBNKCl7cmV0dXJuIGRhdGVbXygpK1wiTWludXRlc1wiXSgpfTt2YXIgX3M9ZnVuY3Rpb24gcygpe3JldHVybiBkYXRlW18oKStcIlNlY29uZHNcIl0oKX07dmFyIF9MPWZ1bmN0aW9uIEwoKXtyZXR1cm4gZGF0ZVtfKCkrXCJNaWxsaXNlY29uZHNcIl0oKX07dmFyIF9vPWZ1bmN0aW9uIG8oKXtyZXR1cm4gdXRjPzA6ZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpfTt2YXIgX1c9ZnVuY3Rpb24gVygpe3JldHVybiBnZXRXZWVrKGRhdGUpfTt2YXIgX049ZnVuY3Rpb24gTigpe3JldHVybiBnZXREYXlPZldlZWsoZGF0ZSl9O3ZhciBmbGFncz17ZDpmdW5jdGlvbiBkKCl7cmV0dXJuIF9kKCl9LGRkOmZ1bmN0aW9uIGRkKCl7cmV0dXJuIHBhZChfZCgpKX0sZGRkOmZ1bmN0aW9uIGRkZCgpe3JldHVybiBkYXRlRm9ybWF0LmkxOG4uZGF5TmFtZXNbRCgpXX0sREREOmZ1bmN0aW9uIERERCgpe3JldHVybiBnZXREYXlOYW1lKHt5OnkoKSxtOl9tKCksZDpfZCgpLF86XygpLGRheU5hbWU6ZGF0ZUZvcm1hdC5pMThuLmRheU5hbWVzW0QoKV0sc2hvcnQ6dHJ1ZX0pfSxkZGRkOmZ1bmN0aW9uIGRkZGQoKXtyZXR1cm4gZGF0ZUZvcm1hdC5pMThuLmRheU5hbWVzW0QoKSs3XX0sRERERDpmdW5jdGlvbiBEREREKCl7cmV0dXJuIGdldERheU5hbWUoe3k6eSgpLG06X20oKSxkOl9kKCksXzpfKCksZGF5TmFtZTpkYXRlRm9ybWF0LmkxOG4uZGF5TmFtZXNbRCgpKzddfSl9LG06ZnVuY3Rpb24gbSgpe3JldHVybiBfbSgpKzF9LG1tOmZ1bmN0aW9uIG1tKCl7cmV0dXJuIHBhZChfbSgpKzEpfSxtbW06ZnVuY3Rpb24gbW1tKCl7cmV0dXJuIGRhdGVGb3JtYXQuaTE4bi5tb250aE5hbWVzW19tKCldfSxtbW1tOmZ1bmN0aW9uIG1tbW0oKXtyZXR1cm4gZGF0ZUZvcm1hdC5pMThuLm1vbnRoTmFtZXNbX20oKSsxMl19LHl5OmZ1bmN0aW9uIHl5KCl7cmV0dXJuIFN0cmluZyh5KCkpLnNsaWNlKDIpfSx5eXl5OmZ1bmN0aW9uIHl5eXkoKXtyZXR1cm4gcGFkKHkoKSw0KX0saDpmdW5jdGlvbiBoKCl7cmV0dXJuIF9IKCklMTJ8fDEyfSxoaDpmdW5jdGlvbiBoaCgpe3JldHVybiBwYWQoX0goKSUxMnx8MTIpfSxIOmZ1bmN0aW9uIEgoKXtyZXR1cm4gX0goKX0sSEg6ZnVuY3Rpb24gSEgoKXtyZXR1cm4gcGFkKF9IKCkpfSxNOmZ1bmN0aW9uIE0oKXtyZXR1cm4gX00oKX0sTU06ZnVuY3Rpb24gTU0oKXtyZXR1cm4gcGFkKF9NKCkpfSxzOmZ1bmN0aW9uIHMoKXtyZXR1cm4gX3MoKX0sc3M6ZnVuY3Rpb24gc3MoKXtyZXR1cm4gcGFkKF9zKCkpfSxsOmZ1bmN0aW9uIGwoKXtyZXR1cm4gcGFkKF9MKCksMyl9LEw6ZnVuY3Rpb24gTCgpe3JldHVybiBwYWQoTWF0aC5mbG9vcihfTCgpLzEwKSl9LHQ6ZnVuY3Rpb24gdCgpe3JldHVybiBfSCgpPDEyP2RhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbMF06ZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1sxXX0sdHQ6ZnVuY3Rpb24gdHQoKXtyZXR1cm4gX0goKTwxMj9kYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzJdOmRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbM119LFQ6ZnVuY3Rpb24gVCgpe3JldHVybiBfSCgpPDEyP2RhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbNF06ZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1s1XX0sVFQ6ZnVuY3Rpb24gVFQoKXtyZXR1cm4gX0goKTwxMj9kYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzZdOmRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbN119LFo6ZnVuY3Rpb24gWigpe3JldHVybiBnbXQ/XCJHTVRcIjp1dGM/XCJVVENcIjooU3RyaW5nKGRhdGUpLm1hdGNoKHRpbWV6b25lKXx8W1wiXCJdKS5wb3AoKS5yZXBsYWNlKHRpbWV6b25lQ2xpcCxcIlwiKS5yZXBsYWNlKC9HTVRcXCswMDAwL2csXCJVVENcIil9LG86ZnVuY3Rpb24gbygpe3JldHVybihfbygpPjA/XCItXCI6XCIrXCIpK3BhZChNYXRoLmZsb29yKE1hdGguYWJzKF9vKCkpLzYwKSoxMDArTWF0aC5hYnMoX28oKSklNjAsNCl9LHA6ZnVuY3Rpb24gcCgpe3JldHVybihfbygpPjA/XCItXCI6XCIrXCIpK3BhZChNYXRoLmZsb29yKE1hdGguYWJzKF9vKCkpLzYwKSwyKStcIjpcIitwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhfbygpKSU2MCksMil9LFM6ZnVuY3Rpb24gUygpe3JldHVybltcInRoXCIsXCJzdFwiLFwibmRcIixcInJkXCJdW19kKCklMTA+Mz8wOihfZCgpJTEwMC1fZCgpJTEwIT0xMCkqX2QoKSUxMF19LFc6ZnVuY3Rpb24gVygpe3JldHVybiBfVygpfSxXVzpmdW5jdGlvbiBXVygpe3JldHVybiBwYWQoX1coKSl9LE46ZnVuY3Rpb24gTigpe3JldHVybiBfTigpfX07cmV0dXJuIG1hc2sucmVwbGFjZSh0b2tlbixmdW5jdGlvbihtYXRjaCl7aWYobWF0Y2ggaW4gZmxhZ3Mpe3JldHVybiBmbGFnc1ttYXRjaF0oKX1yZXR1cm4gbWF0Y2guc2xpY2UoMSxtYXRjaC5sZW5ndGgtMSl9KX19KCk7ZGF0ZUZvcm1hdC5tYXNrcz17ZGVmYXVsdDpcImRkZCBtbW0gZGQgeXl5eSBISDpNTTpzc1wiLHNob3J0RGF0ZTpcIm0vZC95eVwiLHBhZGRlZFNob3J0RGF0ZTpcIm1tL2RkL3l5eXlcIixtZWRpdW1EYXRlOlwibW1tIGQsIHl5eXlcIixsb25nRGF0ZTpcIm1tbW0gZCwgeXl5eVwiLGZ1bGxEYXRlOlwiZGRkZCwgbW1tbSBkLCB5eXl5XCIsc2hvcnRUaW1lOlwiaDpNTSBUVFwiLG1lZGl1bVRpbWU6XCJoOk1NOnNzIFRUXCIsbG9uZ1RpbWU6XCJoOk1NOnNzIFRUIFpcIixpc29EYXRlOlwieXl5eS1tbS1kZFwiLGlzb1RpbWU6XCJISDpNTTpzc1wiLGlzb0RhdGVUaW1lOlwieXl5eS1tbS1kZCdUJ0hIOk1NOnNzb1wiLGlzb1V0Y0RhdGVUaW1lOlwiVVRDOnl5eXktbW0tZGQnVCdISDpNTTpzcydaJ1wiLGV4cGlyZXNIZWFkZXJGb3JtYXQ6XCJkZGQsIGRkIG1tbSB5eXl5IEhIOk1NOnNzIFpcIn07ZGF0ZUZvcm1hdC5pMThuPXtkYXlOYW1lczpbXCJTdW5cIixcIk1vblwiLFwiVHVlXCIsXCJXZWRcIixcIlRodVwiLFwiRnJpXCIsXCJTYXRcIixcIlN1bmRheVwiLFwiTW9uZGF5XCIsXCJUdWVzZGF5XCIsXCJXZWRuZXNkYXlcIixcIlRodXJzZGF5XCIsXCJGcmlkYXlcIixcIlNhdHVyZGF5XCJdLG1vbnRoTmFtZXM6W1wiSmFuXCIsXCJGZWJcIixcIk1hclwiLFwiQXByXCIsXCJNYXlcIixcIkp1blwiLFwiSnVsXCIsXCJBdWdcIixcIlNlcFwiLFwiT2N0XCIsXCJOb3ZcIixcIkRlY1wiLFwiSmFudWFyeVwiLFwiRmVicnVhcnlcIixcIk1hcmNoXCIsXCJBcHJpbFwiLFwiTWF5XCIsXCJKdW5lXCIsXCJKdWx5XCIsXCJBdWd1c3RcIixcIlNlcHRlbWJlclwiLFwiT2N0b2JlclwiLFwiTm92ZW1iZXJcIixcIkRlY2VtYmVyXCJdLHRpbWVOYW1lczpbXCJhXCIsXCJwXCIsXCJhbVwiLFwicG1cIixcIkFcIixcIlBcIixcIkFNXCIsXCJQTVwiXX07dmFyIHBhZD1mdW5jdGlvbiBwYWQodmFsLGxlbil7dmFsPVN0cmluZyh2YWwpO2xlbj1sZW58fDI7d2hpbGUodmFsLmxlbmd0aDxsZW4pe3ZhbD1cIjBcIit2YWx9cmV0dXJuIHZhbH07dmFyIGdldERheU5hbWU9ZnVuY3Rpb24gZ2V0RGF5TmFtZShfcmVmKXt2YXIgeT1fcmVmLnksbT1fcmVmLm0sZD1fcmVmLmQsXz1fcmVmLl8sZGF5TmFtZT1fcmVmLmRheU5hbWUsX3JlZiRzaG9ydD1fcmVmW1wic2hvcnRcIl0sX3Nob3J0PV9yZWYkc2hvcnQ9PT12b2lkIDA/ZmFsc2U6X3JlZiRzaG9ydDt2YXIgdG9kYXk9bmV3IERhdGU7dmFyIHllc3RlcmRheT1uZXcgRGF0ZTt5ZXN0ZXJkYXkuc2V0RGF0ZSh5ZXN0ZXJkYXlbXytcIkRhdGVcIl0oKS0xKTt2YXIgdG9tb3Jyb3c9bmV3IERhdGU7dG9tb3Jyb3cuc2V0RGF0ZSh0b21vcnJvd1tfK1wiRGF0ZVwiXSgpKzEpO3ZhciB0b2RheV9kPWZ1bmN0aW9uIHRvZGF5X2QoKXtyZXR1cm4gdG9kYXlbXytcIkRhdGVcIl0oKX07dmFyIHRvZGF5X209ZnVuY3Rpb24gdG9kYXlfbSgpe3JldHVybiB0b2RheVtfK1wiTW9udGhcIl0oKX07dmFyIHRvZGF5X3k9ZnVuY3Rpb24gdG9kYXlfeSgpe3JldHVybiB0b2RheVtfK1wiRnVsbFllYXJcIl0oKX07dmFyIHllc3RlcmRheV9kPWZ1bmN0aW9uIHllc3RlcmRheV9kKCl7cmV0dXJuIHllc3RlcmRheVtfK1wiRGF0ZVwiXSgpfTt2YXIgeWVzdGVyZGF5X209ZnVuY3Rpb24geWVzdGVyZGF5X20oKXtyZXR1cm4geWVzdGVyZGF5W18rXCJNb250aFwiXSgpfTt2YXIgeWVzdGVyZGF5X3k9ZnVuY3Rpb24geWVzdGVyZGF5X3koKXtyZXR1cm4geWVzdGVyZGF5W18rXCJGdWxsWWVhclwiXSgpfTt2YXIgdG9tb3Jyb3dfZD1mdW5jdGlvbiB0b21vcnJvd19kKCl7cmV0dXJuIHRvbW9ycm93W18rXCJEYXRlXCJdKCl9O3ZhciB0b21vcnJvd19tPWZ1bmN0aW9uIHRvbW9ycm93X20oKXtyZXR1cm4gdG9tb3Jyb3dbXytcIk1vbnRoXCJdKCl9O3ZhciB0b21vcnJvd195PWZ1bmN0aW9uIHRvbW9ycm93X3koKXtyZXR1cm4gdG9tb3Jyb3dbXytcIkZ1bGxZZWFyXCJdKCl9O2lmKHRvZGF5X3koKT09PXkmJnRvZGF5X20oKT09PW0mJnRvZGF5X2QoKT09PWQpe3JldHVybiBfc2hvcnQ/XCJUZHlcIjpcIlRvZGF5XCJ9ZWxzZSBpZih5ZXN0ZXJkYXlfeSgpPT09eSYmeWVzdGVyZGF5X20oKT09PW0mJnllc3RlcmRheV9kKCk9PT1kKXtyZXR1cm4gX3Nob3J0P1wiWXNkXCI6XCJZZXN0ZXJkYXlcIn1lbHNlIGlmKHRvbW9ycm93X3koKT09PXkmJnRvbW9ycm93X20oKT09PW0mJnRvbW9ycm93X2QoKT09PWQpe3JldHVybiBfc2hvcnQ/XCJUbXdcIjpcIlRvbW9ycm93XCJ9cmV0dXJuIGRheU5hbWV9O3ZhciBnZXRXZWVrPWZ1bmN0aW9uIGdldFdlZWsoZGF0ZSl7dmFyIHRhcmdldFRodXJzZGF5PW5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSxkYXRlLmdldE1vbnRoKCksZGF0ZS5nZXREYXRlKCkpO3RhcmdldFRodXJzZGF5LnNldERhdGUodGFyZ2V0VGh1cnNkYXkuZ2V0RGF0ZSgpLSh0YXJnZXRUaHVyc2RheS5nZXREYXkoKSs2KSU3KzMpO3ZhciBmaXJzdFRodXJzZGF5PW5ldyBEYXRlKHRhcmdldFRodXJzZGF5LmdldEZ1bGxZZWFyKCksMCw0KTtmaXJzdFRodXJzZGF5LnNldERhdGUoZmlyc3RUaHVyc2RheS5nZXREYXRlKCktKGZpcnN0VGh1cnNkYXkuZ2V0RGF5KCkrNiklNyszKTt2YXIgZHM9dGFyZ2V0VGh1cnNkYXkuZ2V0VGltZXpvbmVPZmZzZXQoKS1maXJzdFRodXJzZGF5LmdldFRpbWV6b25lT2Zmc2V0KCk7dGFyZ2V0VGh1cnNkYXkuc2V0SG91cnModGFyZ2V0VGh1cnNkYXkuZ2V0SG91cnMoKS1kcyk7dmFyIHdlZWtEaWZmPSh0YXJnZXRUaHVyc2RheS1maXJzdFRodXJzZGF5KS8oODY0ZTUqNyk7cmV0dXJuIDErTWF0aC5mbG9vcih3ZWVrRGlmZil9O3ZhciBnZXREYXlPZldlZWs9ZnVuY3Rpb24gZ2V0RGF5T2ZXZWVrKGRhdGUpe3ZhciBkb3c9ZGF0ZS5nZXREYXkoKTtpZihkb3c9PT0wKXtkb3c9N31yZXR1cm4gZG93fTt2YXIga2luZE9mPWZ1bmN0aW9uIGtpbmRPZih2YWwpe2lmKHZhbD09PW51bGwpe3JldHVyblwibnVsbFwifWlmKHZhbD09PXVuZGVmaW5lZCl7cmV0dXJuXCJ1bmRlZmluZWRcIn1pZihfdHlwZW9mKHZhbCkhPT1cIm9iamVjdFwiKXtyZXR1cm4gX3R5cGVvZih2YWwpfWlmKEFycmF5LmlzQXJyYXkodmFsKSl7cmV0dXJuXCJhcnJheVwifXJldHVybnt9LnRvU3RyaW5nLmNhbGwodmFsKS5zbGljZSg4LC0xKS50b0xvd2VyQ2FzZSgpfTtpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gZGF0ZUZvcm1hdH0pfWVsc2UgaWYoKHR5cGVvZiBleHBvcnRzPT09XCJ1bmRlZmluZWRcIj9cInVuZGVmaW5lZFwiOl90eXBlb2YoZXhwb3J0cykpPT09XCJvYmplY3RcIil7bW9kdWxlLmV4cG9ydHM9ZGF0ZUZvcm1hdH1lbHNle2dsb2JhbC5kYXRlRm9ybWF0PWRhdGVGb3JtYXR9fSkodm9pZCAwKTsiLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gZm9ybWF0VGltZVxuXG5jb25zdCB7XG4gIERBVEVfRk9STUFULFxuICBEQVRFX0ZPUk1BVF9TSU1QTEVcbn0gPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKVxuXG5jb25zdCBkYXRlZm9ybWF0ID0gcmVxdWlyZSgnZGF0ZWZvcm1hdCcpXG5jb25zdCBjcmVhdGVEYXRlID0gcmVxdWlyZSgnLi9jcmVhdGUtZGF0ZScpXG5jb25zdCBpc1ZhbGlkRGF0ZSA9IHJlcXVpcmUoJy4vaXMtdmFsaWQtZGF0ZScpXG5cbi8qKlxuICogQ29udmVydHMgYSBnaXZlbiBgZXBvY2hgIHRvIGEgZGVzaXJlZCBkaXNwbGF5IGZvcm1hdC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IGVwb2NoIFRoZSB0aW1lIHRvIGNvbnZlcnQuIE1heSBiZSBhbnkgdmFsdWUgdGhhdCBpc1xuICogdmFsaWQgZm9yIGBuZXcgRGF0ZSgpYC5cbiAqIEBwYXJhbSB7Ym9vbGVhbnxzdHJpbmd9IFt0cmFuc2xhdGVUaW1lPWZhbHNlXSBXaGVuIGBmYWxzZWAsIHRoZSBnaXZlbiBgZXBvY2hgXG4gKiB3aWxsIHNpbXBseSBiZSByZXR1cm5lZC4gV2hlbiBgdHJ1ZWAsIHRoZSBnaXZlbiBgZXBvY2hgIHdpbGwgYmUgY29udmVydGVkXG4gKiB0byBhIHN0cmluZyBhdCBVVEMgdXNpbmcgdGhlIGBEQVRFX0ZPUk1BVF9TSU1QTEVgIGNvbnN0YW50LiBJZiBgdHJhbnNsYXRlVGltZWAgaXNcbiAqIGEgc3RyaW5nLCB0aGUgZm9sbG93aW5nIHJ1bGVzIGFyZSBhdmFpbGFibGU6XG4gKlxuICogLSBgPGZvcm1hdCBzdHJpbmc+YDogVGhlIHN0cmluZyBpcyBhIGxpdGVyYWwgZm9ybWF0IHN0cmluZy4gVGhpcyBmb3JtYXRcbiAqIHN0cmluZyB3aWxsIGJlIHVzZWQgdG8gaW50ZXJwcmV0IHRoZSBgZXBvY2hgIGFuZCByZXR1cm4gYSBkaXNwbGF5IHN0cmluZ1xuICogYXQgVVRDLlxuICogLSBgU1lTOlNUQU5EQVJEYDogVGhlIHJldHVybmVkIGRpc3BsYXkgc3RyaW5nIHdpbGwgZm9sbG93IHRoZSBgREFURV9GT1JNQVRgXG4gKiBjb25zdGFudCBhdCB0aGUgc3lzdGVtJ3MgbG9jYWwgdGltZXpvbmUuXG4gKiAtIGBTWVM6PGZvcm1hdCBzdHJpbmc+YDogVGhlIHJldHVybmVkIGRpc3BsYXkgc3RyaW5nIHdpbGwgZm9sbG93IHRoZSBnaXZlblxuICogYDxmb3JtYXQgc3RyaW5nPmAgYXQgdGhlIHN5c3RlbSdzIGxvY2FsIHRpbWV6b25lLlxuICogLSBgVVRDOjxmb3JtYXQgc3RyaW5nPmA6IFRoZSByZXR1cm5lZCBkaXNwbGF5IHN0cmluZyB3aWxsIGZvbGxvdyB0aGUgZ2l2ZW5cbiAqIGA8Zm9ybWF0IHN0cmluZz5gIGF0IFVUQy5cbiAqXG4gKiBAcmV0dXJucyB7bnVtYmVyfHN0cmluZ30gVGhlIGZvcm1hdHRlZCB0aW1lLlxuICovXG5mdW5jdGlvbiBmb3JtYXRUaW1lIChlcG9jaCwgdHJhbnNsYXRlVGltZSA9IGZhbHNlKSB7XG4gIGlmICh0cmFuc2xhdGVUaW1lID09PSBmYWxzZSkge1xuICAgIHJldHVybiBlcG9jaFxuICB9XG5cbiAgY29uc3QgaW5zdGFudCA9IGNyZWF0ZURhdGUoZXBvY2gpXG5cbiAgLy8gSWYgdGhlIERhdGUgaXMgaW52YWxpZCwgZG8gbm90IGF0dGVtcHQgdG8gZm9ybWF0XG4gIGlmICghaXNWYWxpZERhdGUoaW5zdGFudCkpIHtcbiAgICByZXR1cm4gZXBvY2hcbiAgfVxuXG4gIGlmICh0cmFuc2xhdGVUaW1lID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIGRhdGVmb3JtYXQoaW5zdGFudCwgREFURV9GT1JNQVRfU0lNUExFKVxuICB9XG5cbiAgY29uc3QgdXBwZXJGb3JtYXQgPSB0cmFuc2xhdGVUaW1lLnRvVXBwZXJDYXNlKClcbiAgaWYgKHVwcGVyRm9ybWF0ID09PSAnU1lTOlNUQU5EQVJEJykge1xuICAgIHJldHVybiBkYXRlZm9ybWF0KGluc3RhbnQsIERBVEVfRk9STUFUKVxuICB9XG5cbiAgY29uc3QgcHJlZml4ID0gdXBwZXJGb3JtYXQuc3Vic3RyKDAsIDQpXG4gIGlmIChwcmVmaXggPT09ICdTWVM6JyB8fCBwcmVmaXggPT09ICdVVEM6Jykge1xuICAgIGlmIChwcmVmaXggPT09ICdVVEM6Jykge1xuICAgICAgcmV0dXJuIGRhdGVmb3JtYXQoaW5zdGFudCwgdHJhbnNsYXRlVGltZSlcbiAgICB9XG4gICAgcmV0dXJuIGRhdGVmb3JtYXQoaW5zdGFudCwgdHJhbnNsYXRlVGltZS5zbGljZSg0KSlcbiAgfVxuXG4gIHJldHVybiBkYXRlZm9ybWF0KGluc3RhbnQsIGBVVEM6JHt0cmFuc2xhdGVUaW1lfWApXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gaGFuZGxlQ3VzdG9tTGV2ZWxzTmFtZXNPcHRzXG5cbi8qKlxuICogUGFyc2UgYSBDU1Ygc3RyaW5nIG9yIG9wdGlvbnMgb2JqZWN0IHRoYXQgbWFwcyBsZXZlbFxuICogbGFiZWxzIHRvIGxldmVsIHZhbHVlcy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IGNMZXZlbHMgQW4gb2JqZWN0IG1hcHBpbmcgbGV2ZWxcbiAqIG5hbWVzIHRvIGxldmVsIHZhbHVlcywgZS5nLiBgeyBpbmZvOiAzMCwgZGVidWc6IDY1IH1gLCBvciBhXG4gKiBDU1Ygc3RyaW5nIGluIHRoZSBmb3JtYXQgYGxldmVsX25hbWU6bGV2ZWxfdmFsdWVgLCBlLmcuXG4gKiBgaW5mbzozMCxkZWJ1Zzo2NWAuXG4gKlxuICogQHJldHVybnMge29iamVjdH0gQW4gb2JqZWN0IG1hcHBpbmcgbGV2ZWxzIG5hbWVzIHRvIGxldmVsIHZhbHVlc1xuICogZS5nLiBgeyBpbmZvOiAzMCwgZGVidWc6IDY1IH1gLlxuICovXG5mdW5jdGlvbiBoYW5kbGVDdXN0b21MZXZlbHNOYW1lc09wdHMgKGNMZXZlbHMpIHtcbiAgaWYgKCFjTGV2ZWxzKSByZXR1cm4ge31cblxuICBpZiAodHlwZW9mIGNMZXZlbHMgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGNMZXZlbHNcbiAgICAgIC5zcGxpdCgnLCcpXG4gICAgICAucmVkdWNlKChhZ2csIHZhbHVlLCBpZHgpID0+IHtcbiAgICAgICAgY29uc3QgW2xldmVsTmFtZSwgbGV2ZWxOdW0gPSBpZHhdID0gdmFsdWUuc3BsaXQoJzonKVxuICAgICAgICBhZ2dbbGV2ZWxOYW1lLnRvTG93ZXJDYXNlKCldID0gbGV2ZWxOdW1cbiAgICAgICAgcmV0dXJuIGFnZ1xuICAgICAgfSwge30pXG4gIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGNMZXZlbHMpID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIHJldHVybiBPYmplY3RcbiAgICAgIC5rZXlzKGNMZXZlbHMpXG4gICAgICAucmVkdWNlKChhZ2csIGxldmVsTmFtZSkgPT4ge1xuICAgICAgICBhZ2dbbGV2ZWxOYW1lLnRvTG93ZXJDYXNlKCldID0gY0xldmVsc1tsZXZlbE5hbWVdXG4gICAgICAgIHJldHVybiBhZ2dcbiAgICAgIH0sIHt9KVxuICB9IGVsc2Uge1xuICAgIHJldHVybiB7fVxuICB9XG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gaGFuZGxlQ3VzdG9tTGV2ZWxzT3B0c1xuXG4vKipcbiAqIFBhcnNlIGEgQ1NWIHN0cmluZyBvciBvcHRpb25zIG9iamVjdCB0aGF0IHNwZWNpZmllc1xuICogY29uZmlndXJhdGlvbiBmb3IgY3VzdG9tIGxldmVscy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IGNMZXZlbHMgQW4gb2JqZWN0IG1hcHBpbmcgbGV2ZWxcbiAqIG5hbWVzIHRvIHZhbHVlcywgZS5nLiBgeyBpbmZvOiAzMCwgZGVidWc6IDY1IH1gLCBvciBhXG4gKiBDU1Ygc3RyaW5nIGluIHRoZSBmb3JtYXQgYGxldmVsX25hbWU6bGV2ZWxfdmFsdWVgLCBlLmcuXG4gKiBgaW5mbzozMCxkZWJ1Zzo2NWAuXG4gKlxuICogQHJldHVybnMge29iamVjdH0gQW4gb2JqZWN0IG1hcHBpbmcgbGV2ZWxzIHRvIGxhYmVscyB0aGF0XG4gKiBhcHBlYXIgaW4gbG9ncywgZS5nLiBgeyAnMzAnOiAnSU5GTycsICc2NSc6ICdERUJVRycgfWAuXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUN1c3RvbUxldmVsc09wdHMgKGNMZXZlbHMpIHtcbiAgaWYgKCFjTGV2ZWxzKSByZXR1cm4ge31cblxuICBpZiAodHlwZW9mIGNMZXZlbHMgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGNMZXZlbHNcbiAgICAgIC5zcGxpdCgnLCcpXG4gICAgICAucmVkdWNlKChhZ2csIHZhbHVlLCBpZHgpID0+IHtcbiAgICAgICAgY29uc3QgW2xldmVsTmFtZSwgbGV2ZWxOdW0gPSBpZHhdID0gdmFsdWUuc3BsaXQoJzonKVxuICAgICAgICBhZ2dbbGV2ZWxOdW1dID0gbGV2ZWxOYW1lLnRvVXBwZXJDYXNlKClcbiAgICAgICAgcmV0dXJuIGFnZ1xuICAgICAgfSxcbiAgICAgIHsgZGVmYXVsdDogJ1VTRVJMVkwnIH0pXG4gIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGNMZXZlbHMpID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIHJldHVybiBPYmplY3RcbiAgICAgIC5rZXlzKGNMZXZlbHMpXG4gICAgICAucmVkdWNlKChhZ2csIGxldmVsTmFtZSkgPT4ge1xuICAgICAgICBhZ2dbY0xldmVsc1tsZXZlbE5hbWVdXSA9IGxldmVsTmFtZS50b1VwcGVyQ2FzZSgpXG4gICAgICAgIHJldHVybiBhZ2dcbiAgICAgIH0sIHsgZGVmYXVsdDogJ1VTRVJMVkwnIH0pXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHt9XG4gIH1cbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBpbnRlcnByZXRDb25kaXRpb25hbHNcblxuY29uc3QgZ2V0UHJvcGVydHlWYWx1ZSA9IHJlcXVpcmUoJy4vZ2V0LXByb3BlcnR5LXZhbHVlJylcblxuLyoqXG4gKiBUcmFuc2xhdGVzIGFsbCBjb25kaXRpb25hbCBibG9ja3MgZnJvbSB3aXRoaW4gdGhlIG1lc3NhZ2VGb3JtYXQuIFRyYW5zbGF0ZXNcbiAqIGFueSBtYXRjaGluZyB7aWYga2V5fXtrZXl9e2VuZH0gc3RhdGVtZW50cyBhbmQgcmV0dXJucyBldmVyeXRoaW5nIGJldHdlZW5cbiAqIGlmIGFuZCBlbHNlIGJsb2NrcyBpZiB0aGUga2V5IHByb3ZpZGVkIHdhcyBmb3VuZCBpbiBsb2cuXG4gKlxuICogQHBhcmFtIHtNZXNzYWdlRm9ybWF0U3RyaW5nfE1lc3NhZ2VGb3JtYXRGdW5jdGlvbn0gbWVzc2FnZUZvcm1hdCBBIGZvcm1hdFxuICogc3RyaW5nIG9yIGZ1bmN0aW9uIHRoYXQgZGVmaW5lcyBob3cgdGhlIGxvZ2dlZCBtZXNzYWdlIHNob3VsZCBiZVxuICogY29uZGl0aW9uYWxseSBmb3JtYXR0ZWQuXG4gKiBAcGFyYW0ge29iamVjdH0gbG9nIFRoZSBsb2cgb2JqZWN0IHRvIGJlIG1vZGlmaWVkLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBwYXJzZWQgbWVzc2FnZUZvcm1hdC5cbiAqL1xuZnVuY3Rpb24gaW50ZXJwcmV0Q29uZGl0aW9uYWxzIChtZXNzYWdlRm9ybWF0LCBsb2cpIHtcbiAgbWVzc2FnZUZvcm1hdCA9IG1lc3NhZ2VGb3JtYXQucmVwbGFjZSgve2lmICguKj8pfSguKj8pe2VuZH0vZywgcmVwbGFjZXIpXG5cbiAgLy8gUmVtb3ZlIG5vbi10ZXJtaW5hdGVkIGlmIGJsb2Nrc1xuICBtZXNzYWdlRm9ybWF0ID0gbWVzc2FnZUZvcm1hdC5yZXBsYWNlKC97aWYgKC4qPyl9L2csICcnKVxuICAvLyBSZW1vdmUgZmxvYXRpbmcgZW5kIGJsb2Nrc1xuICBtZXNzYWdlRm9ybWF0ID0gbWVzc2FnZUZvcm1hdC5yZXBsYWNlKC97ZW5kfS9nLCAnJylcblxuICByZXR1cm4gbWVzc2FnZUZvcm1hdC5yZXBsYWNlKC9cXHMrL2csICcgJykudHJpbSgpXG5cbiAgZnVuY3Rpb24gcmVwbGFjZXIgKF8sIGtleSwgdmFsdWUpIHtcbiAgICBjb25zdCBwcm9wZXJ0eVZhbHVlID0gZ2V0UHJvcGVydHlWYWx1ZShsb2csIGtleSlcbiAgICBpZiAocHJvcGVydHlWYWx1ZSAmJiB2YWx1ZS5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICByZXR1cm4gdmFsdWUucmVwbGFjZShuZXcgUmVnRXhwKCd7JyArIGtleSArICd9JywgJ2cnKSwgcHJvcGVydHlWYWx1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuICB9XG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RcblxuZnVuY3Rpb24gaXNPYmplY3QgKGlucHV0KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmFwcGx5KGlucHV0KSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBqb2luTGluZXNXaXRoSW5kZW50YXRpb25cblxuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBKb2luTGluZXNXaXRoSW5kZW50YXRpb25QYXJhbXNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpbnB1dCBUaGUgc3RyaW5nIHRvIHNwbGl0IGFuZCByZWZvcm1hdC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbaWRlbnRdIFRoZSBpbmRlbnRhdGlvbiBzdHJpbmcuIERlZmF1bHQ6IGAgICAgYCAoNCBzcGFjZXMpLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtlb2xdIFRoZSBlbmQgb2YgbGluZSBzZXF1ZW5jZSB0byB1c2Ugd2hlbiByZWpvaW5pbmdcbiAqIHRoZSBsaW5lcy4gRGVmYXVsdDogYCdcXG4nYC5cbiAqL1xuXG4vKipcbiAqIEdpdmVuIGEgc3RyaW5nIHdpdGggbGluZSBzZXBhcmF0b3JzLCBlaXRoZXIgYFxcclxcbmAgb3IgYFxcbmAsIGFkZCBpbmRlbnRhdGlvblxuICogdG8gYWxsIGxpbmVzIHN1YnNlcXVlbnQgdG8gdGhlIGZpcnN0IGxpbmUgYW5kIHJlam9pbiB0aGUgbGluZXMgdXNpbmcgYW5cbiAqIGVuZCBvZiBsaW5lIHNlcXVlbmNlLlxuICpcbiAqIEBwYXJhbSB7Sm9pbkxpbmVzV2l0aEluZGVudGF0aW9uUGFyYW1zfSBpbnB1dFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5nIHdpdGggbGluZXMgc3Vic2VxdWVudCB0byB0aGUgZmlyc3QgaW5kZW50ZWRcbiAqIHdpdGggdGhlIGdpdmVuIGluZGVudGF0aW9uIHNlcXVlbmNlLlxuICovXG5mdW5jdGlvbiBqb2luTGluZXNXaXRoSW5kZW50YXRpb24gKHsgaW5wdXQsIGlkZW50ID0gJyAgICAnLCBlb2wgPSAnXFxuJyB9KSB7XG4gIGNvbnN0IGxpbmVzID0gaW5wdXQuc3BsaXQoL1xccj9cXG4vKVxuICBmb3IgKGxldCBpID0gMTsgaSA8IGxpbmVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgbGluZXNbaV0gPSBpZGVudCArIGxpbmVzW2ldXG4gIH1cbiAgcmV0dXJuIGxpbmVzLmpvaW4oZW9sKVxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlRmFjdG9yeU9wdGlvbnNcblxuY29uc3Qge1xuICBMRVZFTF9OQU1FU1xufSA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpXG5jb25zdCBjb2xvcnMgPSByZXF1aXJlKCcuLi9jb2xvcnMnKVxuY29uc3QgaGFuZGxlQ3VzdG9tTGV2ZWxzT3B0cyA9IHJlcXVpcmUoJy4vaGFuZGxlLWN1c3RvbS1sZXZlbHMtb3B0cycpXG5jb25zdCBoYW5kbGVDdXN0b21MZXZlbHNOYW1lc09wdHMgPSByZXF1aXJlKCcuL2hhbmRsZS1jdXN0b20tbGV2ZWxzLW5hbWVzLW9wdHMnKVxuY29uc3QgaGFuZGxlTGV2ZWxMYWJlbERhdGEgPSByZXF1aXJlKCcuL2dldC1sZXZlbC1sYWJlbC1kYXRhJylcblxuLyoqXG4gKiBBIGBQcmV0dHlDb250ZXh0YCBpcyBhbiBvYmplY3QgdG8gYmUgdXNlZCBieSB0aGUgdmFyaW91cyBmdW5jdGlvbnMgdGhhdFxuICogcHJvY2VzcyBsb2cgZGF0YS4gSXQgaXMgZGVyaXZlZCBmcm9tIHRoZSBwcm92aWRlZCB7QGxpbmsgUGlub1ByZXR0eU9wdGlvbnN9LlxuICogSXQgbWF5IGJlIHVzZWQgYXMgYSBgdGhpc2AgY29udGV4dC5cbiAqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBQcmV0dHlDb250ZXh0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gRU9MIFRoZSBlc2NhcGUgc2VxdWVuY2UgY2hvc2VuIGFzIHRoZSBsaW5lIHRlcm1pbmF0b3IuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gSURFTlQgVGhlIHN0cmluZyB0byB1c2UgYXMgdGhlIGluZGVudGF0aW9uIHNlcXVlbmNlLlxuICogQHByb3BlcnR5IHtDb2xvcml6ZXJGdW5jfSBjb2xvcml6ZXIgQSBjb25maWd1cmVkIGNvbG9yaXplciBmdW5jdGlvbi5cbiAqIEBwcm9wZXJ0eSB7QXJyYXlbQXJyYXk8bnVtYmVyLCBzdHJpbmc+XX0gY3VzdG9tQ29sb3JzIEEgc2V0IG9mIGN1c3RvbSBjb2xvclxuICogbmFtZXMgYXNzb2NpYXRlZCB3aXRoIGxldmVsIG51bWJlcnMuXG4gKiBAcHJvcGVydHkge29iamVjdH0gY3VzdG9tTGV2ZWxOYW1lcyBBIGhhc2ggb2YgbGV2ZWwgbnVtYmVycyB0byBsZXZlbCBuYW1lcyxcbiAqIGUuZy4gYHsgMzA6IFwiaW5mb1wiIH1gLlxuICogQHByb3BlcnR5IHtvYmplY3R9IGN1c3RvbUxldmVscyBBIGhhc2ggb2YgbGV2ZWwgbmFtZXMgdG8gbGV2ZWwgbnVtYmVycyxcbiAqIGUuZy4gYHsgaW5mbzogMzAgfWAuXG4gKiBAcHJvcGVydHkge0N1c3RvbVByZXR0aWZpZXJzfSBjdXN0b21QcmV0dGlmaWVycyBBIGhhc2ggb2YgY3VzdG9tIHByZXR0aWZpZXJcbiAqIGZ1bmN0aW9ucy5cbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBjdXN0b21Qcm9wZXJ0aWVzIENvbXByaXNlZCBvZiBgY3VzdG9tTGV2ZWxzYCBhbmRcbiAqIGBjdXN0b21MZXZlbE5hbWVzYCBpZiBzdWNoIG9wdGlvbnMgYXJlIHByb3ZpZGVkLlxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gZXJyb3JMaWtlT2JqZWN0S2V5cyBUaGUga2V5IG5hbWVzIGluIHRoZSBsb2cgZGF0YSB0aGF0XG4gKiBzaG91bGQgYmUgY29uc2lkZXJlZCBhcyBob2xkaW5nIGVycm9yIG9iamVjdHMuXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBlcnJvclByb3BzIEEgbGlzdCBvZiBlcnJvciBvYmplY3Qga2V5cyB0aGF0IHNob3VsZCBiZVxuICogaW5jbHVkZWQgaW4gdGhlIG91dHB1dC5cbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IGdldExldmVsTGFiZWxEYXRhIFBhc3MgYSBudW1lcmljIGxldmVsIHRvIHJldHVybiBbbGV2ZWxMYWJlbFN0cmluZyxsZXZlbE51bV1cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaGlkZU9iamVjdCBJbmRpY2F0ZXMgdGhlIHByZXR0aWZpZXIgc2hvdWxkIG9taXQgb2JqZWN0c1xuICogaW4gdGhlIG91dHB1dC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IGlnbm9yZUtleXMgU2V0IG9mIGxvZyBkYXRhIGtleXMgdG8gb21pdC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IGluY2x1ZGVLZXlzIE9wcG9zaXRlIG9mIGBpZ25vcmVLZXlzYC5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gbGV2ZWxGaXJzdCBJbmRpY2F0ZXMgdGhlIGxldmVsIHNob3VsZCBiZSBwcmludGVkIGZpcnN0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGxldmVsS2V5IE5hbWUgb2YgdGhlIGtleSBpbiB0aGUgbG9nIGRhdGEgdGhhdCBjb250YWluc1xuICogdGhlIG1lc3NhZ2UuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbGV2ZWxMYWJlbCBGb3JtYXQgdG9rZW4gdG8gcmVwcmVzZW50IHRoZSBwb3NpdGlvbiBvZiB0aGVcbiAqIGxldmVsIG5hbWUgaW4gdGhlIG91dHB1dCBzdHJpbmcuXG4gKiBAcHJvcGVydHkge01lc3NhZ2VGb3JtYXRTdHJpbmd8TWVzc2FnZUZvcm1hdEZ1bmN0aW9ufSBtZXNzYWdlRm9ybWF0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWVzc2FnZUtleSBOYW1lIG9mIHRoZSBrZXkgaW4gdGhlIGxvZyBkYXRhIHRoYXQgY29udGFpbnNcbiAqIHRoZSBtZXNzYWdlLlxuICogQHByb3BlcnR5IHtzdHJpbmd8bnVtYmVyfSBtaW5pbXVtTGV2ZWwgVGhlIG1pbmltdW0gbG9nIGxldmVsIHRvIHByb2Nlc3NcbiAqIGFuZCBvdXRwdXQuXG4gKiBAcHJvcGVydHkge0NvbG9yaXplckZ1bmN9IG9iamVjdENvbG9yaXplclxuICogQHByb3BlcnR5IHtib29sZWFufSBzaW5nbGVMaW5lIEluZGljYXRlcyBvYmplY3RzIHNob3VsZCBiZSBwcmludGVkIG9uIGFcbiAqIHNpbmdsZSBvdXRwdXQgbGluZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0aW1lc3RhbXBLZXkgVGhlIG5hbWUgb2YgdGhlIGtleSBpbiB0aGUgbG9nIGRhdGEgdGhhdFxuICogY29udGFpbnMgdGhlIGxvZyB0aW1lc3RhbXAuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHRyYW5zbGF0ZVRpbWUgSW5kaWNhdGVzIGlmIHRpbWVzdGFtcHMgc2hvdWxkIGJlXG4gKiB0cmFuc2xhdGVkIHRvIGEgaHVtYW4tcmVhZGFibGUgc3RyaW5nLlxuICogQHByb3BlcnR5IHtib29sZWFufSB1c2VPbmx5Q3VzdG9tUHJvcHNcbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7UGlub1ByZXR0eU9wdGlvbnN9IG9wdGlvbnMgVGhlIHVzZXIgc3VwcGxpZWQgb2JqZWN0IG9mIG9wdGlvbnMuXG4gKlxuICogQHJldHVybnMge1ByZXR0eUNvbnRleHR9XG4gKi9cbmZ1bmN0aW9uIHBhcnNlRmFjdG9yeU9wdGlvbnMgKG9wdGlvbnMpIHtcbiAgY29uc3QgRU9MID0gb3B0aW9ucy5jcmxmID8gJ1xcclxcbicgOiAnXFxuJ1xuICBjb25zdCBJREVOVCA9ICcgICAgJ1xuICBjb25zdCB7XG4gICAgY3VzdG9tUHJldHRpZmllcnMsXG4gICAgZXJyb3JMaWtlT2JqZWN0S2V5cyxcbiAgICBoaWRlT2JqZWN0LFxuICAgIGxldmVsRmlyc3QsXG4gICAgbGV2ZWxLZXksXG4gICAgbGV2ZWxMYWJlbCxcbiAgICBtZXNzYWdlRm9ybWF0LFxuICAgIG1lc3NhZ2VLZXksXG4gICAgbWluaW11bUxldmVsLFxuICAgIHNpbmdsZUxpbmUsXG4gICAgdGltZXN0YW1wS2V5LFxuICAgIHRyYW5zbGF0ZVRpbWVcbiAgfSA9IG9wdGlvbnNcbiAgY29uc3QgZXJyb3JQcm9wcyA9IG9wdGlvbnMuZXJyb3JQcm9wcy5zcGxpdCgnLCcpXG4gIGNvbnN0IHVzZU9ubHlDdXN0b21Qcm9wcyA9IHR5cGVvZiBvcHRpb25zLnVzZU9ubHlDdXN0b21Qcm9wcyA9PT0gJ2Jvb2xlYW4nXG4gICAgPyBvcHRpb25zLnVzZU9ubHlDdXN0b21Qcm9wc1xuICAgIDogKG9wdGlvbnMudXNlT25seUN1c3RvbVByb3BzID09PSAndHJ1ZScpXG4gIGNvbnN0IGN1c3RvbUxldmVscyA9IGhhbmRsZUN1c3RvbUxldmVsc09wdHMob3B0aW9ucy5jdXN0b21MZXZlbHMpXG4gIGNvbnN0IGN1c3RvbUxldmVsTmFtZXMgPSBoYW5kbGVDdXN0b21MZXZlbHNOYW1lc09wdHMob3B0aW9ucy5jdXN0b21MZXZlbHMpXG4gIGNvbnN0IGdldExldmVsTGFiZWxEYXRhID0gaGFuZGxlTGV2ZWxMYWJlbERhdGEodXNlT25seUN1c3RvbVByb3BzLCBjdXN0b21MZXZlbHMsIGN1c3RvbUxldmVsTmFtZXMpXG5cbiAgbGV0IGN1c3RvbUNvbG9yc1xuICBpZiAob3B0aW9ucy5jdXN0b21Db2xvcnMpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuY3VzdG9tQ29sb3JzID09PSAnc3RyaW5nJykge1xuICAgICAgY3VzdG9tQ29sb3JzID0gb3B0aW9ucy5jdXN0b21Db2xvcnMuc3BsaXQoJywnKS5yZWR1Y2UoKGFnZywgdmFsdWUpID0+IHtcbiAgICAgICAgY29uc3QgW2xldmVsLCBjb2xvcl0gPSB2YWx1ZS5zcGxpdCgnOicpXG4gICAgICAgIGNvbnN0IGNvbmRpdGlvbiA9IHVzZU9ubHlDdXN0b21Qcm9wc1xuICAgICAgICAgID8gb3B0aW9ucy5jdXN0b21MZXZlbHNcbiAgICAgICAgICA6IGN1c3RvbUxldmVsTmFtZXNbbGV2ZWxdICE9PSB1bmRlZmluZWRcbiAgICAgICAgY29uc3QgbGV2ZWxOdW0gPSBjb25kaXRpb25cbiAgICAgICAgICA/IGN1c3RvbUxldmVsTmFtZXNbbGV2ZWxdXG4gICAgICAgICAgOiBMRVZFTF9OQU1FU1tsZXZlbF1cbiAgICAgICAgY29uc3QgY29sb3JJZHggPSBsZXZlbE51bSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBsZXZlbE51bVxuICAgICAgICAgIDogbGV2ZWxcbiAgICAgICAgYWdnLnB1c2goW2NvbG9ySWR4LCBjb2xvcl0pXG4gICAgICAgIHJldHVybiBhZ2dcbiAgICAgIH0sIFtdKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuY3VzdG9tQ29sb3JzID09PSAnb2JqZWN0Jykge1xuICAgICAgY3VzdG9tQ29sb3JzID0gT2JqZWN0LmtleXMob3B0aW9ucy5jdXN0b21Db2xvcnMpLnJlZHVjZSgoYWdnLCB2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCBbbGV2ZWwsIGNvbG9yXSA9IFt2YWx1ZSwgb3B0aW9ucy5jdXN0b21Db2xvcnNbdmFsdWVdXVxuICAgICAgICBjb25zdCBjb25kaXRpb24gPSB1c2VPbmx5Q3VzdG9tUHJvcHNcbiAgICAgICAgICA/IG9wdGlvbnMuY3VzdG9tTGV2ZWxzXG4gICAgICAgICAgOiBjdXN0b21MZXZlbE5hbWVzW2xldmVsXSAhPT0gdW5kZWZpbmVkXG4gICAgICAgIGNvbnN0IGxldmVsTnVtID0gY29uZGl0aW9uXG4gICAgICAgICAgPyBjdXN0b21MZXZlbE5hbWVzW2xldmVsXVxuICAgICAgICAgIDogTEVWRUxfTkFNRVNbbGV2ZWxdXG4gICAgICAgIGNvbnN0IGNvbG9ySWR4ID0gbGV2ZWxOdW0gIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gbGV2ZWxOdW1cbiAgICAgICAgICA6IGxldmVsXG4gICAgICAgIGFnZy5wdXNoKFtjb2xvcklkeCwgY29sb3JdKVxuICAgICAgICByZXR1cm4gYWdnXG4gICAgICB9LCBbXSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdvcHRpb25zLmN1c3RvbUNvbG9ycyBtdXN0IGJlIG9mIHR5cGUgc3RyaW5nIG9yIG9iamVjdC4nKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGN1c3RvbVByb3BlcnRpZXMgPSB7IGN1c3RvbUxldmVscywgY3VzdG9tTGV2ZWxOYW1lcyB9XG4gIGlmICh1c2VPbmx5Q3VzdG9tUHJvcHMgPT09IHRydWUgJiYgIW9wdGlvbnMuY3VzdG9tTGV2ZWxzKSB7XG4gICAgY3VzdG9tUHJvcGVydGllcy5jdXN0b21MZXZlbHMgPSB1bmRlZmluZWRcbiAgICBjdXN0b21Qcm9wZXJ0aWVzLmN1c3RvbUxldmVsTmFtZXMgPSB1bmRlZmluZWRcbiAgfVxuXG4gIGNvbnN0IGluY2x1ZGVLZXlzID0gb3B0aW9ucy5pbmNsdWRlICE9PSB1bmRlZmluZWRcbiAgICA/IG5ldyBTZXQob3B0aW9ucy5pbmNsdWRlLnNwbGl0KCcsJykpXG4gICAgOiB1bmRlZmluZWRcbiAgY29uc3QgaWdub3JlS2V5cyA9ICghaW5jbHVkZUtleXMgJiYgb3B0aW9ucy5pZ25vcmUpXG4gICAgPyBuZXcgU2V0KG9wdGlvbnMuaWdub3JlLnNwbGl0KCcsJykpXG4gICAgOiB1bmRlZmluZWRcblxuICBjb25zdCBjb2xvcml6ZXIgPSBjb2xvcnMob3B0aW9ucy5jb2xvcml6ZSwgY3VzdG9tQ29sb3JzLCB1c2VPbmx5Q3VzdG9tUHJvcHMpXG4gIGNvbnN0IG9iamVjdENvbG9yaXplciA9IG9wdGlvbnMuY29sb3JpemVPYmplY3RzXG4gICAgPyBjb2xvcml6ZXJcbiAgICA6IGNvbG9ycyhmYWxzZSwgW10sIGZhbHNlKVxuXG4gIHJldHVybiB7XG4gICAgRU9MLFxuICAgIElERU5ULFxuICAgIGNvbG9yaXplcixcbiAgICBjdXN0b21Db2xvcnMsXG4gICAgY3VzdG9tTGV2ZWxOYW1lcyxcbiAgICBjdXN0b21MZXZlbHMsXG4gICAgY3VzdG9tUHJldHRpZmllcnMsXG4gICAgY3VzdG9tUHJvcGVydGllcyxcbiAgICBlcnJvckxpa2VPYmplY3RLZXlzLFxuICAgIGVycm9yUHJvcHMsXG4gICAgZ2V0TGV2ZWxMYWJlbERhdGEsXG4gICAgaGlkZU9iamVjdCxcbiAgICBpZ25vcmVLZXlzLFxuICAgIGluY2x1ZGVLZXlzLFxuICAgIGxldmVsRmlyc3QsXG4gICAgbGV2ZWxLZXksXG4gICAgbGV2ZWxMYWJlbCxcbiAgICBtZXNzYWdlRm9ybWF0LFxuICAgIG1lc3NhZ2VLZXksXG4gICAgbWluaW11bUxldmVsLFxuICAgIG9iamVjdENvbG9yaXplcixcbiAgICBzaW5nbGVMaW5lLFxuICAgIHRpbWVzdGFtcEtleSxcbiAgICB0cmFuc2xhdGVUaW1lLFxuICAgIHVzZU9ubHlDdXN0b21Qcm9wc1xuICB9XG59XG4iLCAibW9kdWxlLmV4cG9ydHMgPSBzdHJpbmdpZnlcbnN0cmluZ2lmeS5kZWZhdWx0ID0gc3RyaW5naWZ5XG5zdHJpbmdpZnkuc3RhYmxlID0gZGV0ZXJtaW5pc3RpY1N0cmluZ2lmeVxuc3RyaW5naWZ5LnN0YWJsZVN0cmluZ2lmeSA9IGRldGVybWluaXN0aWNTdHJpbmdpZnlcblxudmFyIExJTUlUX1JFUExBQ0VfTk9ERSA9ICdbLi4uXSdcbnZhciBDSVJDVUxBUl9SRVBMQUNFX05PREUgPSAnW0NpcmN1bGFyXSdcblxudmFyIGFyciA9IFtdXG52YXIgcmVwbGFjZXJTdGFjayA9IFtdXG5cbmZ1bmN0aW9uIGRlZmF1bHRPcHRpb25zICgpIHtcbiAgcmV0dXJuIHtcbiAgICBkZXB0aExpbWl0OiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUixcbiAgICBlZGdlc0xpbWl0OiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxuICB9XG59XG5cbi8vIFJlZ3VsYXIgc3RyaW5naWZ5XG5mdW5jdGlvbiBzdHJpbmdpZnkgKG9iaiwgcmVwbGFjZXIsIHNwYWNlciwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgb3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zKClcbiAgfVxuXG4gIGRlY2lyYyhvYmosICcnLCAwLCBbXSwgdW5kZWZpbmVkLCAwLCBvcHRpb25zKVxuICB2YXIgcmVzXG4gIHRyeSB7XG4gICAgaWYgKHJlcGxhY2VyU3RhY2subGVuZ3RoID09PSAwKSB7XG4gICAgICByZXMgPSBKU09OLnN0cmluZ2lmeShvYmosIHJlcGxhY2VyLCBzcGFjZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcyA9IEpTT04uc3RyaW5naWZ5KG9iaiwgcmVwbGFjZUdldHRlclZhbHVlcyhyZXBsYWNlciksIHNwYWNlcilcbiAgICB9XG4gIH0gY2F0Y2ggKF8pIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoJ1t1bmFibGUgdG8gc2VyaWFsaXplLCBjaXJjdWxhciByZWZlcmVuY2UgaXMgdG9vIGNvbXBsZXggdG8gYW5hbHl6ZV0nKVxuICB9IGZpbmFsbHkge1xuICAgIHdoaWxlIChhcnIubGVuZ3RoICE9PSAwKSB7XG4gICAgICB2YXIgcGFydCA9IGFyci5wb3AoKVxuICAgICAgaWYgKHBhcnQubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwYXJ0WzBdLCBwYXJ0WzFdLCBwYXJ0WzNdKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFydFswXVtwYXJ0WzFdXSA9IHBhcnRbMl1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBzZXRSZXBsYWNlIChyZXBsYWNlLCB2YWwsIGssIHBhcmVudCkge1xuICB2YXIgcHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwYXJlbnQsIGspXG4gIGlmIChwcm9wZXJ0eURlc2NyaXB0b3IuZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAocHJvcGVydHlEZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHBhcmVudCwgaywgeyB2YWx1ZTogcmVwbGFjZSB9KVxuICAgICAgYXJyLnB1c2goW3BhcmVudCwgaywgdmFsLCBwcm9wZXJ0eURlc2NyaXB0b3JdKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXBsYWNlclN0YWNrLnB1c2goW3ZhbCwgaywgcmVwbGFjZV0pXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHBhcmVudFtrXSA9IHJlcGxhY2VcbiAgICBhcnIucHVzaChbcGFyZW50LCBrLCB2YWxdKVxuICB9XG59XG5cbmZ1bmN0aW9uIGRlY2lyYyAodmFsLCBrLCBlZGdlSW5kZXgsIHN0YWNrLCBwYXJlbnQsIGRlcHRoLCBvcHRpb25zKSB7XG4gIGRlcHRoICs9IDFcbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbCAhPT0gbnVsbCkge1xuICAgIGZvciAoaSA9IDA7IGkgPCBzdGFjay5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHN0YWNrW2ldID09PSB2YWwpIHtcbiAgICAgICAgc2V0UmVwbGFjZShDSVJDVUxBUl9SRVBMQUNFX05PREUsIHZhbCwgaywgcGFyZW50KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0eXBlb2Ygb3B0aW9ucy5kZXB0aExpbWl0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgZGVwdGggPiBvcHRpb25zLmRlcHRoTGltaXRcbiAgICApIHtcbiAgICAgIHNldFJlcGxhY2UoTElNSVRfUkVQTEFDRV9OT0RFLCB2YWwsIGssIHBhcmVudClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBvcHRpb25zLmVkZ2VzTGltaXQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICBlZGdlSW5kZXggKyAxID4gb3B0aW9ucy5lZGdlc0xpbWl0XG4gICAgKSB7XG4gICAgICBzZXRSZXBsYWNlKExJTUlUX1JFUExBQ0VfTk9ERSwgdmFsLCBrLCBwYXJlbnQpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBzdGFjay5wdXNoKHZhbClcbiAgICAvLyBPcHRpbWl6ZSBmb3IgQXJyYXlzLiBCaWcgYXJyYXlzIGNvdWxkIGtpbGwgdGhlIHBlcmZvcm1hbmNlIG90aGVyd2lzZSFcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRlY2lyYyh2YWxbaV0sIGksIGksIHN0YWNrLCB2YWwsIGRlcHRoLCBvcHRpb25zKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbClcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2ldXG4gICAgICAgIGRlY2lyYyh2YWxba2V5XSwga2V5LCBpLCBzdGFjaywgdmFsLCBkZXB0aCwgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9XG4gICAgc3RhY2sucG9wKClcbiAgfVxufVxuXG4vLyBTdGFibGUtc3RyaW5naWZ5XG5mdW5jdGlvbiBjb21wYXJlRnVuY3Rpb24gKGEsIGIpIHtcbiAgaWYgKGEgPCBiKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKGEgPiBiKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuICByZXR1cm4gMFxufVxuXG5mdW5jdGlvbiBkZXRlcm1pbmlzdGljU3RyaW5naWZ5IChvYmosIHJlcGxhY2VyLCBzcGFjZXIsIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAndW5kZWZpbmVkJykge1xuICAgIG9wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucygpXG4gIH1cblxuICB2YXIgdG1wID0gZGV0ZXJtaW5pc3RpY0RlY2lyYyhvYmosICcnLCAwLCBbXSwgdW5kZWZpbmVkLCAwLCBvcHRpb25zKSB8fCBvYmpcbiAgdmFyIHJlc1xuICB0cnkge1xuICAgIGlmIChyZXBsYWNlclN0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmVzID0gSlNPTi5zdHJpbmdpZnkodG1wLCByZXBsYWNlciwgc3BhY2VyKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXMgPSBKU09OLnN0cmluZ2lmeSh0bXAsIHJlcGxhY2VHZXR0ZXJWYWx1ZXMocmVwbGFjZXIpLCBzcGFjZXIpXG4gICAgfVxuICB9IGNhdGNoIChfKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KCdbdW5hYmxlIHRvIHNlcmlhbGl6ZSwgY2lyY3VsYXIgcmVmZXJlbmNlIGlzIHRvbyBjb21wbGV4IHRvIGFuYWx5emVdJylcbiAgfSBmaW5hbGx5IHtcbiAgICAvLyBFbnN1cmUgdGhhdCB3ZSByZXN0b3JlIHRoZSBvYmplY3QgYXMgaXQgd2FzLlxuICAgIHdoaWxlIChhcnIubGVuZ3RoICE9PSAwKSB7XG4gICAgICB2YXIgcGFydCA9IGFyci5wb3AoKVxuICAgICAgaWYgKHBhcnQubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwYXJ0WzBdLCBwYXJ0WzFdLCBwYXJ0WzNdKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFydFswXVtwYXJ0WzFdXSA9IHBhcnRbMl1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBkZXRlcm1pbmlzdGljRGVjaXJjICh2YWwsIGssIGVkZ2VJbmRleCwgc3RhY2ssIHBhcmVudCwgZGVwdGgsIG9wdGlvbnMpIHtcbiAgZGVwdGggKz0gMVxuICB2YXIgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsICE9PSBudWxsKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IHN0YWNrLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoc3RhY2tbaV0gPT09IHZhbCkge1xuICAgICAgICBzZXRSZXBsYWNlKENJUkNVTEFSX1JFUExBQ0VfTk9ERSwgdmFsLCBrLCBwYXJlbnQpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cbiAgICB0cnkge1xuICAgICAgaWYgKHR5cGVvZiB2YWwudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBvcHRpb25zLmRlcHRoTGltaXQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICBkZXB0aCA+IG9wdGlvbnMuZGVwdGhMaW1pdFxuICAgICkge1xuICAgICAgc2V0UmVwbGFjZShMSU1JVF9SRVBMQUNFX05PREUsIHZhbCwgaywgcGFyZW50KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdHlwZW9mIG9wdGlvbnMuZWRnZXNMaW1pdCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIGVkZ2VJbmRleCArIDEgPiBvcHRpb25zLmVkZ2VzTGltaXRcbiAgICApIHtcbiAgICAgIHNldFJlcGxhY2UoTElNSVRfUkVQTEFDRV9OT0RFLCB2YWwsIGssIHBhcmVudClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHN0YWNrLnB1c2godmFsKVxuICAgIC8vIE9wdGltaXplIGZvciBBcnJheXMuIEJpZyBhcnJheXMgY291bGQga2lsbCB0aGUgcGVyZm9ybWFuY2Ugb3RoZXJ3aXNlIVxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZGV0ZXJtaW5pc3RpY0RlY2lyYyh2YWxbaV0sIGksIGksIHN0YWNrLCB2YWwsIGRlcHRoLCBvcHRpb25zKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDcmVhdGUgYSB0ZW1wb3Jhcnkgb2JqZWN0IGluIHRoZSByZXF1aXJlZCB3YXlcbiAgICAgIHZhciB0bXAgPSB7fVxuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh2YWwpLnNvcnQoY29tcGFyZUZ1bmN0aW9uKVxuICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgICAgZGV0ZXJtaW5pc3RpY0RlY2lyYyh2YWxba2V5XSwga2V5LCBpLCBzdGFjaywgdmFsLCBkZXB0aCwgb3B0aW9ucylcbiAgICAgICAgdG1wW2tleV0gPSB2YWxba2V5XVxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBwYXJlbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGFyci5wdXNoKFtwYXJlbnQsIGssIHZhbF0pXG4gICAgICAgIHBhcmVudFtrXSA9IHRtcFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRtcFxuICAgICAgfVxuICAgIH1cbiAgICBzdGFjay5wb3AoKVxuICB9XG59XG5cbi8vIHdyYXBzIHJlcGxhY2VyIGZ1bmN0aW9uIHRvIGhhbmRsZSB2YWx1ZXMgd2UgY291bGRuJ3QgcmVwbGFjZVxuLy8gYW5kIG1hcmsgdGhlbSBhcyByZXBsYWNlZCB2YWx1ZVxuZnVuY3Rpb24gcmVwbGFjZUdldHRlclZhbHVlcyAocmVwbGFjZXIpIHtcbiAgcmVwbGFjZXIgPVxuICAgIHR5cGVvZiByZXBsYWNlciAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gcmVwbGFjZXJcbiAgICAgIDogZnVuY3Rpb24gKGssIHYpIHtcbiAgICAgICAgcmV0dXJuIHZcbiAgICAgIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIChrZXksIHZhbCkge1xuICAgIGlmIChyZXBsYWNlclN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVwbGFjZXJTdGFjay5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcGFydCA9IHJlcGxhY2VyU3RhY2tbaV1cbiAgICAgICAgaWYgKHBhcnRbMV0gPT09IGtleSAmJiBwYXJ0WzBdID09PSB2YWwpIHtcbiAgICAgICAgICB2YWwgPSBwYXJ0WzJdXG4gICAgICAgICAgcmVwbGFjZXJTdGFjay5zcGxpY2UoaSwgMSlcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsKVxuICB9XG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gcHJldHRpZnlFcnJvclxuXG5jb25zdCBqb2luTGluZXNXaXRoSW5kZW50YXRpb24gPSByZXF1aXJlKCcuL2pvaW4tbGluZXMtd2l0aC1pbmRlbnRhdGlvbicpXG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gUHJldHRpZnlFcnJvclBhcmFtc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IGtleU5hbWUgVGhlIGtleSBhc3NpZ25lZCB0byB0aGlzIGVycm9yIGluIHRoZSBsb2cgb2JqZWN0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGxpbmVzIFRoZSBTVFJJTkdJRklFRCBlcnJvci4gSWYgdGhlIGVycm9yIGZpZWxkIGhhcyBhXG4gKiAgY3VzdG9tIHByZXR0aWZpZXIsIHRoYXQgc2hvdWxkIGJlIHByZS1hcHBsaWVkIGFzIHdlbGwuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWRlbnQgVGhlIGluZGVudGF0aW9uIHNlcXVlbmNlIHRvIHVzZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlb2wgVGhlIEVPTCBzZXF1ZW5jZSB0byB1c2UuXG4gKi9cblxuLyoqXG4gKiBQcmV0dGlmaWVzIGFuIGVycm9yIHN0cmluZyBpbnRvIGEgbXVsdGktbGluZSBmb3JtYXQuXG4gKlxuICogQHBhcmFtIHtQcmV0dGlmeUVycm9yUGFyYW1zfSBpbnB1dFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHByZXR0aWZ5RXJyb3IgKHsga2V5TmFtZSwgbGluZXMsIGVvbCwgaWRlbnQgfSkge1xuICBsZXQgcmVzdWx0ID0gJydcbiAgY29uc3Qgam9pbmVkTGluZXMgPSBqb2luTGluZXNXaXRoSW5kZW50YXRpb24oeyBpbnB1dDogbGluZXMsIGlkZW50LCBlb2wgfSlcbiAgY29uc3Qgc3BsaXRMaW5lcyA9IGAke2lkZW50fSR7a2V5TmFtZX06ICR7am9pbmVkTGluZXN9JHtlb2x9YC5zcGxpdChlb2wpXG5cbiAgZm9yIChsZXQgaiA9IDA7IGogPCBzcGxpdExpbmVzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgaWYgKGogIT09IDApIHJlc3VsdCArPSBlb2xcblxuICAgIGNvbnN0IGxpbmUgPSBzcGxpdExpbmVzW2pdXG4gICAgaWYgKC9eXFxzKlwic3RhY2tcIi8udGVzdChsaW5lKSkge1xuICAgICAgY29uc3QgbWF0Y2hlcyA9IC9eKFxccypcInN0YWNrXCI6KVxccyooXCIuKlwiKSw/JC8uZXhlYyhsaW5lKVxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmIChtYXRjaGVzICYmIG1hdGNoZXMubGVuZ3RoID09PSAzKSB7XG4gICAgICAgIGNvbnN0IGluZGVudFNpemUgPSAvXlxccyovLmV4ZWMobGluZSlbMF0ubGVuZ3RoICsgNFxuICAgICAgICBjb25zdCBpbmRlbnRhdGlvbiA9ICcgJy5yZXBlYXQoaW5kZW50U2l6ZSlcbiAgICAgICAgY29uc3Qgc3RhY2tNZXNzYWdlID0gbWF0Y2hlc1syXVxuICAgICAgICByZXN1bHQgKz0gbWF0Y2hlc1sxXSArIGVvbCArIGluZGVudGF0aW9uICsgSlNPTi5wYXJzZShzdGFja01lc3NhZ2UpLnJlcGxhY2UoL1xcbi9nLCBlb2wgKyBpbmRlbnRhdGlvbilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCArPSBsaW5lXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCArPSBsaW5lXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IHByZXR0aWZ5T2JqZWN0XG5cbmNvbnN0IHtcbiAgTE9HR0VSX0tFWVNcbn0gPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKVxuXG5jb25zdCBzdHJpbmdpZnlTYWZlID0gcmVxdWlyZSgnZmFzdC1zYWZlLXN0cmluZ2lmeScpXG5jb25zdCBqb2luTGluZXNXaXRoSW5kZW50YXRpb24gPSByZXF1aXJlKCcuL2pvaW4tbGluZXMtd2l0aC1pbmRlbnRhdGlvbicpXG5jb25zdCBwcmV0dGlmeUVycm9yID0gcmVxdWlyZSgnLi9wcmV0dGlmeS1lcnJvcicpXG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gUHJldHRpZnlPYmplY3RQYXJhbXNcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBsb2cgVGhlIG9iamVjdCB0byBwcmV0dGlmeS5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2V4Y2x1ZGVMb2dnZXJLZXlzXSBJbmRpY2F0ZXMgaWYga25vd24gbG9nZ2VyIHNwZWNpZmljXG4gKiBrZXlzIHNob3VsZCBiZSBleGNsdWRlZCBmcm9tIHByZXR0aWZpY2F0aW9uLiBEZWZhdWx0OiBgdHJ1ZWAuXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBbc2tpcEtleXNdIEEgc2V0IG9mIG9iamVjdCBrZXlzIHRvIGV4Y2x1ZGUgZnJvbSB0aGVcbiAqICAqIHByZXR0aWZpZWQgcmVzdWx0LiBEZWZhdWx0OiBgW11gLlxuICogQHByb3BlcnR5IHtQcmV0dHlDb250ZXh0fSBjb250ZXh0IFRoZSBjb250ZXh0IG9iamVjdCBidWlsdCBmcm9tIHBhcnNpbmdcbiAqIHRoZSBvcHRpb25zLlxuICovXG5cbi8qKlxuICogUHJldHRpZmllcyBhIHN0YW5kYXJkIG9iamVjdC4gU3BlY2lhbCBjYXJlIGlzIHRha2VuIHdoZW4gcHJvY2Vzc2luZyB0aGUgb2JqZWN0XG4gKiB0byBoYW5kbGUgY2hpbGQgb2JqZWN0cyB0aGF0IGFyZSBhdHRhY2hlZCB0byBrZXlzIGtub3duIHRvIGNvbnRhaW4gZXJyb3JcbiAqIG9iamVjdHMuXG4gKlxuICogQHBhcmFtIHtQcmV0dGlmeU9iamVjdFBhcmFtc30gaW5wdXRcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcHJldHRpZmllZCBzdHJpbmcuIFRoaXMgY2FuIGJlIGFzIGxpdHRsZSBhcyBgJydgIGlmXG4gKiB0aGVyZSB3YXMgbm90aGluZyB0byBwcmV0dGlmeS5cbiAqL1xuZnVuY3Rpb24gcHJldHRpZnlPYmplY3QgKHtcbiAgbG9nLFxuICBleGNsdWRlTG9nZ2VyS2V5cyA9IHRydWUsXG4gIHNraXBLZXlzID0gW10sXG4gIGNvbnRleHRcbn0pIHtcbiAgY29uc3Qge1xuICAgIEVPTDogZW9sLFxuICAgIElERU5UOiBpZGVudCxcbiAgICBjdXN0b21QcmV0dGlmaWVycyxcbiAgICBlcnJvckxpa2VPYmplY3RLZXlzOiBlcnJvckxpa2VLZXlzLFxuICAgIG9iamVjdENvbG9yaXplcixcbiAgICBzaW5nbGVMaW5lLFxuICAgIGNvbG9yaXplclxuICB9ID0gY29udGV4dFxuICBjb25zdCBrZXlzVG9JZ25vcmUgPSBbXS5jb25jYXQoc2tpcEtleXMpXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKGV4Y2x1ZGVMb2dnZXJLZXlzID09PSB0cnVlKSBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShrZXlzVG9JZ25vcmUsIExPR0dFUl9LRVlTKVxuXG4gIGxldCByZXN1bHQgPSAnJ1xuXG4gIC8vIFNwbGl0IG9iamVjdCBrZXlzIGludG8gdHdvIGNhdGVnb3JpZXM6IGVycm9yIGFuZCBub24tZXJyb3JcbiAgY29uc3QgeyBwbGFpbiwgZXJyb3JzIH0gPSBPYmplY3QuZW50cmllcyhsb2cpLnJlZHVjZSgoeyBwbGFpbiwgZXJyb3JzIH0sIFtrLCB2XSkgPT4ge1xuICAgIGlmIChrZXlzVG9JZ25vcmUuaW5jbHVkZXMoaykgPT09IGZhbHNlKSB7XG4gICAgICAvLyBQcmUtYXBwbHkgY3VzdG9tIHByZXR0aWZpZXJzLCBiZWNhdXNlIGFsbCAzIGNhc2VzIGJlbG93IHdpbGwgbmVlZCB0aGlzXG4gICAgICBjb25zdCBwcmV0dHkgPSB0eXBlb2YgY3VzdG9tUHJldHRpZmllcnNba10gPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBjdXN0b21QcmV0dGlmaWVyc1trXSh2LCBrLCBsb2csIHsgY29sb3JzOiBjb2xvcml6ZXIuY29sb3JzIH0pXG4gICAgICAgIDogdlxuICAgICAgaWYgKGVycm9yTGlrZUtleXMuaW5jbHVkZXMoaykpIHtcbiAgICAgICAgZXJyb3JzW2tdID0gcHJldHR5XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwbGFpbltrXSA9IHByZXR0eVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBwbGFpbiwgZXJyb3JzIH1cbiAgfSwgeyBwbGFpbjoge30sIGVycm9yczoge30gfSlcblxuICBpZiAoc2luZ2xlTGluZSkge1xuICAgIC8vIFN0cmluZ2lmeSB0aGUgZW50aXJlIG9iamVjdCBhcyBhIHNpbmdsZSBKU09OIGxpbmVcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmIChPYmplY3Qua2V5cyhwbGFpbikubGVuZ3RoID4gMCkge1xuICAgICAgcmVzdWx0ICs9IG9iamVjdENvbG9yaXplci5ncmV5TWVzc2FnZShzdHJpbmdpZnlTYWZlKHBsYWluKSlcbiAgICB9XG4gICAgcmVzdWx0ICs9IGVvbFxuICAgIC8vIEF2b2lkIHByaW50aW5nIHRoZSBlc2NhcGUgY2hhcmFjdGVyIG9uIGVzY2FwZWQgYmFja3NsYXNoZXMuXG4gICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoL1xcXFxcXFxcL2dpLCAnXFxcXCcpXG4gIH0gZWxzZSB7XG4gICAgLy8gUHV0IGVhY2ggb2JqZWN0IGVudHJ5IG9uIGl0cyBvd24gbGluZVxuICAgIE9iamVjdC5lbnRyaWVzKHBsYWluKS5mb3JFYWNoKChba2V5TmFtZSwga2V5VmFsdWVdKSA9PiB7XG4gICAgICAvLyBjdXN0b20gcHJldHRpZmllcnMgYXJlIGFscmVhZHkgYXBwbGllZCBhYm92ZSwgc28gd2UgY2FuIHNraXAgaXQgbm93XG4gICAgICBsZXQgbGluZXMgPSB0eXBlb2YgY3VzdG9tUHJldHRpZmllcnNba2V5TmFtZV0gPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBrZXlWYWx1ZVxuICAgICAgICA6IHN0cmluZ2lmeVNhZmUoa2V5VmFsdWUsIG51bGwsIDIpXG5cbiAgICAgIGlmIChsaW5lcyA9PT0gdW5kZWZpbmVkKSByZXR1cm5cblxuICAgICAgLy8gQXZvaWQgcHJpbnRpbmcgdGhlIGVzY2FwZSBjaGFyYWN0ZXIgb24gZXNjYXBlZCBiYWNrc2xhc2hlcy5cbiAgICAgIGxpbmVzID0gbGluZXMucmVwbGFjZSgvXFxcXFxcXFwvZ2ksICdcXFxcJylcblxuICAgICAgY29uc3Qgam9pbmVkTGluZXMgPSBqb2luTGluZXNXaXRoSW5kZW50YXRpb24oeyBpbnB1dDogbGluZXMsIGlkZW50LCBlb2wgfSlcbiAgICAgIHJlc3VsdCArPSBgJHtpZGVudH0ke29iamVjdENvbG9yaXplci5wcm9wZXJ0eShrZXlOYW1lKX06JHtqb2luZWRMaW5lcy5zdGFydHNXaXRoKGVvbCkgPyAnJyA6ICcgJ30ke2pvaW5lZExpbmVzfSR7ZW9sfWBcbiAgICB9KVxuICB9XG5cbiAgLy8gRXJyb3JzXG4gIE9iamVjdC5lbnRyaWVzKGVycm9ycykuZm9yRWFjaCgoW2tleU5hbWUsIGtleVZhbHVlXSkgPT4ge1xuICAgIC8vIGN1c3RvbSBwcmV0dGlmaWVycyBhcmUgYWxyZWFkeSBhcHBsaWVkIGFib3ZlLCBzbyB3ZSBjYW4gc2tpcCBpdCBub3dcbiAgICBjb25zdCBsaW5lcyA9IHR5cGVvZiBjdXN0b21QcmV0dGlmaWVyc1trZXlOYW1lXSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyBrZXlWYWx1ZVxuICAgICAgOiBzdHJpbmdpZnlTYWZlKGtleVZhbHVlLCBudWxsLCAyKVxuXG4gICAgaWYgKGxpbmVzID09PSB1bmRlZmluZWQpIHJldHVyblxuXG4gICAgcmVzdWx0ICs9IHByZXR0aWZ5RXJyb3IoeyBrZXlOYW1lLCBsaW5lcywgZW9sLCBpZGVudCB9KVxuICB9KVxuXG4gIHJldHVybiByZXN1bHRcbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBwcmV0dGlmeUVycm9yTG9nXG5cbmNvbnN0IHtcbiAgTE9HR0VSX0tFWVNcbn0gPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKVxuXG5jb25zdCBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXMtb2JqZWN0JylcbmNvbnN0IGpvaW5MaW5lc1dpdGhJbmRlbnRhdGlvbiA9IHJlcXVpcmUoJy4vam9pbi1saW5lcy13aXRoLWluZGVudGF0aW9uJylcbmNvbnN0IHByZXR0aWZ5T2JqZWN0ID0gcmVxdWlyZSgnLi9wcmV0dGlmeS1vYmplY3QnKVxuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IFByZXR0aWZ5RXJyb3JMb2dQYXJhbXNcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBsb2cgVGhlIGVycm9yIGxvZyB0byBwcmV0dGlmeS5cbiAqIEBwcm9wZXJ0eSB7UHJldHR5Q29udGV4dH0gY29udGV4dCBUaGUgY29udGV4dCBvYmplY3QgYnVpbHQgZnJvbSBwYXJzaW5nXG4gKiB0aGUgb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEdpdmVuIGEgbG9nIG9iamVjdCB0aGF0IGhhcyBhIGB0eXBlOiAnRXJyb3InYCBrZXksIHByZXR0aWZ5IHRoZSBvYmplY3QgYW5kXG4gKiByZXR1cm4gdGhlIHJlc3VsdC4gSW4gb3RoZXJcbiAqXG4gKiBAcGFyYW0ge1ByZXR0aWZ5RXJyb3JMb2dQYXJhbXN9IGlucHV0XG4gKlxuICogQHJldHVybnMge3N0cmluZ30gQSBzdHJpbmcgdGhhdCByZXByZXNlbnRzIHRoZSBwcmV0dGlmaWVkIGVycm9yIGxvZy5cbiAqL1xuZnVuY3Rpb24gcHJldHRpZnlFcnJvckxvZyAoeyBsb2csIGNvbnRleHQgfSkge1xuICBjb25zdCB7XG4gICAgRU9MOiBlb2wsXG4gICAgSURFTlQ6IGlkZW50LFxuICAgIGVycm9yUHJvcHM6IGVycm9yUHJvcGVydGllcyxcbiAgICBtZXNzYWdlS2V5XG4gIH0gPSBjb250ZXh0XG4gIGNvbnN0IHN0YWNrID0gbG9nLnN0YWNrXG4gIGNvbnN0IGpvaW5lZExpbmVzID0gam9pbkxpbmVzV2l0aEluZGVudGF0aW9uKHsgaW5wdXQ6IHN0YWNrLCBpZGVudCwgZW9sIH0pXG4gIGxldCByZXN1bHQgPSBgJHtpZGVudH0ke2pvaW5lZExpbmVzfSR7ZW9sfWBcblxuICBpZiAoZXJyb3JQcm9wZXJ0aWVzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBleGNsdWRlUHJvcGVydGllcyA9IExPR0dFUl9LRVlTLmNvbmNhdChtZXNzYWdlS2V5LCAndHlwZScsICdzdGFjaycpXG4gICAgbGV0IHByb3BlcnRpZXNUb1ByaW50XG4gICAgaWYgKGVycm9yUHJvcGVydGllc1swXSA9PT0gJyonKSB7XG4gICAgICAvLyBQcmludCBhbGwgc2libGluZyBwcm9wZXJ0aWVzIGV4Y2VwdCBmb3IgdGhlIHN0YW5kYXJkIGV4Y2x1c2lvbnMuXG4gICAgICBwcm9wZXJ0aWVzVG9QcmludCA9IE9iamVjdC5rZXlzKGxvZykuZmlsdGVyKGsgPT4gZXhjbHVkZVByb3BlcnRpZXMuaW5jbHVkZXMoaykgPT09IGZhbHNlKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBQcmludCBvbmx5IHNwZWNpZmllZCBwcm9wZXJ0aWVzIHVubGVzcyB0aGUgcHJvcGVydHkgaXMgYSBzdGFuZGFyZCBleGNsdXNpb24uXG4gICAgICBwcm9wZXJ0aWVzVG9QcmludCA9IGVycm9yUHJvcGVydGllcy5maWx0ZXIoayA9PiBleGNsdWRlUHJvcGVydGllcy5pbmNsdWRlcyhrKSA9PT0gZmFsc2UpXG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzVG9QcmludC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3Qga2V5ID0gcHJvcGVydGllc1RvUHJpbnRbaV1cbiAgICAgIGlmIChrZXkgaW4gbG9nID09PSBmYWxzZSkgY29udGludWVcbiAgICAgIGlmIChpc09iamVjdChsb2dba2V5XSkpIHtcbiAgICAgICAgLy8gVGhlIG5lc3RlZCBvYmplY3QgbWF5IGhhdmUgXCJsb2dnZXJcIiB0eXBlIGtleXMgYnV0IHNpbmNlIHRoZXkgYXJlIG5vdFxuICAgICAgICAvLyBhdCB0aGUgcm9vdCBsZXZlbCBvZiB0aGUgb2JqZWN0IGJlaW5nIHByb2Nlc3NlZCwgd2Ugd2FudCB0byBwcmludCB0aGVtLlxuICAgICAgICAvLyBUaHVzLCB3ZSBpbnZva2Ugd2l0aCBgZXhjbHVkZUxvZ2dlcktleXM6IGZhbHNlYC5cbiAgICAgICAgY29uc3QgcHJldHRpZmllZE9iamVjdCA9IHByZXR0aWZ5T2JqZWN0KHtcbiAgICAgICAgICBsb2c6IGxvZ1trZXldLFxuICAgICAgICAgIGV4Y2x1ZGVMb2dnZXJLZXlzOiBmYWxzZSxcbiAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICAuLi5jb250ZXh0LFxuICAgICAgICAgICAgSURFTlQ6IGlkZW50ICsgaWRlbnRcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJlc3VsdCA9IGAke3Jlc3VsdH0ke2lkZW50fSR7a2V5fTogeyR7ZW9sfSR7cHJldHRpZmllZE9iamVjdH0ke2lkZW50fX0ke2VvbH1gXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICByZXN1bHQgPSBgJHtyZXN1bHR9JHtpZGVudH0ke2tleX06ICR7bG9nW2tleV19JHtlb2x9YFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBwcmV0dGlmeUxldmVsXG5cbmNvbnN0IGdldFByb3BlcnR5VmFsdWUgPSByZXF1aXJlKCcuL2dldC1wcm9wZXJ0eS12YWx1ZScpXG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gUHJldHRpZnlMZXZlbFBhcmFtc1xuICogQHByb3BlcnR5IHtvYmplY3R9IGxvZyBUaGUgbG9nIG9iamVjdC5cbiAqIEBwcm9wZXJ0eSB7UHJldHR5Q29udGV4dH0gY29udGV4dCBUaGUgY29udGV4dCBvYmplY3QgYnVpbHQgZnJvbSBwYXJzaW5nXG4gKiB0aGUgb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgcGFzc2VkIGluIGxvZyBoYXMgYSBgbGV2ZWxgIHZhbHVlIGFuZCByZXR1cm5zIGEgcHJldHRpZmllZFxuICogc3RyaW5nIGZvciB0aGF0IGxldmVsIGlmIHNvLlxuICpcbiAqIEBwYXJhbSB7UHJldHRpZnlMZXZlbFBhcmFtc30gaW5wdXRcbiAqXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfHN0cmluZ30gSWYgYGxvZ2AgZG9lcyBub3QgaGF2ZSBhIGBsZXZlbGAgcHJvcGVydHkgdGhlblxuICogYHVuZGVmaW5lZGAgd2lsbCBiZSByZXR1cm5lZC4gT3RoZXJ3aXNlLCBhIHN0cmluZyBmcm9tIHRoZSBzcGVjaWZpZWRcbiAqIGBjb2xvcml6ZXJgIGlzIHJldHVybmVkLlxuICovXG5mdW5jdGlvbiBwcmV0dGlmeUxldmVsICh7IGxvZywgY29udGV4dCB9KSB7XG4gIGNvbnN0IHtcbiAgICBjb2xvcml6ZXIsXG4gICAgY3VzdG9tTGV2ZWxzLFxuICAgIGN1c3RvbUxldmVsTmFtZXMsXG4gICAgbGV2ZWxLZXksXG4gICAgZ2V0TGV2ZWxMYWJlbERhdGFcbiAgfSA9IGNvbnRleHRcbiAgY29uc3QgcHJldHRpZmllciA9IGNvbnRleHQuY3VzdG9tUHJldHRpZmllcnM/LmxldmVsXG4gIGNvbnN0IG91dHB1dCA9IGdldFByb3BlcnR5VmFsdWUobG9nLCBsZXZlbEtleSlcbiAgaWYgKG91dHB1dCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdW5kZWZpbmVkXG4gIGNvbnN0IGxhYmVsQ29sb3JpemVkID0gY29sb3JpemVyKG91dHB1dCwgeyBjdXN0b21MZXZlbHMsIGN1c3RvbUxldmVsTmFtZXMgfSlcbiAgaWYgKHByZXR0aWZpZXIpIHtcbiAgICBjb25zdCBbbGFiZWxdID0gZ2V0TGV2ZWxMYWJlbERhdGEob3V0cHV0KVxuICAgIHJldHVybiBwcmV0dGlmaWVyKG91dHB1dCwgbGV2ZWxLZXksIGxvZywgeyBsYWJlbCwgbGFiZWxDb2xvcml6ZWQsIGNvbG9yczogY29sb3JpemVyLmNvbG9ycyB9KVxuICB9XG4gIHJldHVybiBsYWJlbENvbG9yaXplZFxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IHByZXR0aWZ5TWVzc2FnZVxuXG5jb25zdCB7XG4gIExFVkVMU1xufSA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpXG5cbmNvbnN0IGdldFByb3BlcnR5VmFsdWUgPSByZXF1aXJlKCcuL2dldC1wcm9wZXJ0eS12YWx1ZScpXG5jb25zdCBpbnRlcnByZXRDb25kaXRpb25hbHMgPSByZXF1aXJlKCcuL2ludGVycHJldC1jb25kaXRpb25hbHMnKVxuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IFByZXR0aWZ5TWVzc2FnZVBhcmFtc1xuICogQHByb3BlcnR5IHtvYmplY3R9IGxvZyBUaGUgbG9nIG9iamVjdCB3aXRoIHRoZSBtZXNzYWdlIHRvIGNvbG9yaXplLlxuICogQHByb3BlcnR5IHtQcmV0dHlDb250ZXh0fSBjb250ZXh0IFRoZSBjb250ZXh0IG9iamVjdCBidWlsdCBmcm9tIHBhcnNpbmdcbiAqIHRoZSBvcHRpb25zLlxuICovXG5cbi8qKlxuICogUHJldHRpZmllcyBhIG1lc3NhZ2Ugc3RyaW5nIGlmIHRoZSBnaXZlbiBgbG9nYCBoYXMgYSBtZXNzYWdlIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7UHJldHRpZnlNZXNzYWdlUGFyYW1zfSBpbnB1dFxuICpcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR8c3RyaW5nfSBJZiB0aGUgbWVzc2FnZSBrZXkgaXMgbm90IGZvdW5kLCBvciB0aGUgbWVzc2FnZVxuICoga2V5IGlzIG5vdCBhIHN0cmluZywgdGhlbiBgdW5kZWZpbmVkYCB3aWxsIGJlIHJldHVybmVkLiBPdGhlcndpc2UsIGEgc3RyaW5nXG4gKiB0aGF0IGlzIHRoZSBwcmV0dGlmaWVkIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIHByZXR0aWZ5TWVzc2FnZSAoeyBsb2csIGNvbnRleHQgfSkge1xuICBjb25zdCB7XG4gICAgY29sb3JpemVyLFxuICAgIGN1c3RvbUxldmVscyxcbiAgICBsZXZlbEtleSxcbiAgICBsZXZlbExhYmVsLFxuICAgIG1lc3NhZ2VGb3JtYXQsXG4gICAgbWVzc2FnZUtleSxcbiAgICB1c2VPbmx5Q3VzdG9tUHJvcHNcbiAgfSA9IGNvbnRleHRcbiAgaWYgKG1lc3NhZ2VGb3JtYXQgJiYgdHlwZW9mIG1lc3NhZ2VGb3JtYXQgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgcGFyc2VkTWVzc2FnZUZvcm1hdCA9IGludGVycHJldENvbmRpdGlvbmFscyhtZXNzYWdlRm9ybWF0LCBsb2cpXG5cbiAgICBjb25zdCBtZXNzYWdlID0gU3RyaW5nKHBhcnNlZE1lc3NhZ2VGb3JtYXQpLnJlcGxhY2UoXG4gICAgICAveyhbXnt9XSspfS9nLFxuICAgICAgZnVuY3Rpb24gKG1hdGNoLCBwMSkge1xuICAgICAgICAvLyByZXR1cm4gbG9nIGxldmVsIGFzIHN0cmluZyBpbnN0ZWFkIG9mIGludFxuICAgICAgICBsZXQgbGV2ZWxcbiAgICAgICAgaWYgKHAxID09PSBsZXZlbExhYmVsICYmIChsZXZlbCA9IGdldFByb3BlcnR5VmFsdWUobG9nLCBsZXZlbEtleSkpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zdCBjb25kaXRpb24gPSB1c2VPbmx5Q3VzdG9tUHJvcHMgPyBjdXN0b21MZXZlbHMgPT09IHVuZGVmaW5lZCA6IGN1c3RvbUxldmVsc1tsZXZlbF0gPT09IHVuZGVmaW5lZFxuICAgICAgICAgIHJldHVybiBjb25kaXRpb24gPyBMRVZFTFNbbGV2ZWxdIDogY3VzdG9tTGV2ZWxzW2xldmVsXVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUGFyc2UgbmVzdGVkIGtleSBhY2Nlc3MsIGUuZy4gYHtrZXlBLnN1YktleUJ9YC5cbiAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRQcm9wZXJ0eVZhbHVlKGxvZywgcDEpXG4gICAgICAgIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiAnJ1xuICAgICAgfSlcbiAgICByZXR1cm4gY29sb3JpemVyLm1lc3NhZ2UobWVzc2FnZSlcbiAgfVxuICBpZiAobWVzc2FnZUZvcm1hdCAmJiB0eXBlb2YgbWVzc2FnZUZvcm1hdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnN0IG1zZyA9IG1lc3NhZ2VGb3JtYXQobG9nLCBtZXNzYWdlS2V5LCBsZXZlbExhYmVsLCB7IGNvbG9yczogY29sb3JpemVyLmNvbG9ycyB9KVxuICAgIHJldHVybiBjb2xvcml6ZXIubWVzc2FnZShtc2cpXG4gIH1cbiAgaWYgKG1lc3NhZ2VLZXkgaW4gbG9nID09PSBmYWxzZSkgcmV0dXJuIHVuZGVmaW5lZFxuICBpZiAodHlwZW9mIGxvZ1ttZXNzYWdlS2V5XSAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIGxvZ1ttZXNzYWdlS2V5XSAhPT0gJ251bWJlcicgJiYgdHlwZW9mIGxvZ1ttZXNzYWdlS2V5XSAhPT0gJ2Jvb2xlYW4nKSByZXR1cm4gdW5kZWZpbmVkXG4gIHJldHVybiBjb2xvcml6ZXIubWVzc2FnZShsb2dbbWVzc2FnZUtleV0pXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gcHJldHRpZnlNZXRhZGF0YVxuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IFByZXR0aWZ5TWV0YWRhdGFQYXJhbXNcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBsb2cgVGhlIGxvZyB0aGF0IG1heSBvciBtYXkgbm90IGNvbnRhaW4gbWV0YWRhdGEgdG9cbiAqIGJlIHByZXR0aWZpZWQuXG4gKiBAcHJvcGVydHkge1ByZXR0eUNvbnRleHR9IGNvbnRleHQgVGhlIGNvbnRleHQgb2JqZWN0IGJ1aWx0IGZyb20gcGFyc2luZ1xuICogdGhlIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBQcmV0dGlmaWVzIG1ldGFkYXRhIHRoYXQgaXMgdXN1YWxseSBwcmVzZW50IGluIGEgUGlubyBsb2cgbGluZS4gSXQgbG9va3MgZm9yXG4gKiBmaWVsZHMgYG5hbWVgLCBgcGlkYCwgYGhvc3RuYW1lYCwgYW5kIGBjYWxsZXJgIGFuZCByZXR1cm5zIGEgZm9ybWF0dGVkIHN0cmluZyB1c2luZ1xuICogdGhlIGZpZWxkcyBpdCBmaW5kcy5cbiAqXG4gKiBAcGFyYW0ge1ByZXR0aWZ5TWV0YWRhdGFQYXJhbXN9IGlucHV0XG4gKlxuICogQHJldHVybnMge3VuZGVmaW5lZHxzdHJpbmd9IElmIG5vIG1ldGFkYXRhIGlzIGZvdW5kIHRoZW4gYHVuZGVmaW5lZGAgaXNcbiAqIHJldHVybmVkLiBPdGhlcndpc2UsIGEgc3RyaW5nIG9mIHByZXR0aWZpZWQgbWV0YWRhdGEgaXMgcmV0dXJuZWQuXG4gKi9cbmZ1bmN0aW9uIHByZXR0aWZ5TWV0YWRhdGEgKHsgbG9nLCBjb250ZXh0IH0pIHtcbiAgY29uc3QgeyBjdXN0b21QcmV0dGlmaWVyczogcHJldHRpZmllcnMsIGNvbG9yaXplciB9ID0gY29udGV4dFxuICBsZXQgbGluZSA9ICcnXG5cbiAgaWYgKGxvZy5uYW1lIHx8IGxvZy5waWQgfHwgbG9nLmhvc3RuYW1lKSB7XG4gICAgbGluZSArPSAnKCdcblxuICAgIGlmIChsb2cubmFtZSkge1xuICAgICAgbGluZSArPSBwcmV0dGlmaWVycy5uYW1lXG4gICAgICAgID8gcHJldHRpZmllcnMubmFtZShsb2cubmFtZSwgJ25hbWUnLCBsb2csIHsgY29sb3JzOiBjb2xvcml6ZXIuY29sb3JzIH0pXG4gICAgICAgIDogbG9nLm5hbWVcbiAgICB9XG5cbiAgICBpZiAobG9nLnBpZCkge1xuICAgICAgY29uc3QgcHJldHR5UGlkID0gcHJldHRpZmllcnMucGlkXG4gICAgICAgID8gcHJldHRpZmllcnMucGlkKGxvZy5waWQsICdwaWQnLCBsb2csIHsgY29sb3JzOiBjb2xvcml6ZXIuY29sb3JzIH0pXG4gICAgICAgIDogbG9nLnBpZFxuICAgICAgaWYgKGxvZy5uYW1lICYmIGxvZy5waWQpIHtcbiAgICAgICAgbGluZSArPSAnLycgKyBwcmV0dHlQaWRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpbmUgKz0gcHJldHR5UGlkXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGxvZy5ob3N0bmFtZSkge1xuICAgICAgLy8gSWYgYHBpZGAgYW5kIGBuYW1lYCB3ZXJlIGluIHRoZSBpZ25vcmUga2V5cyBsaXN0IHRoZW4gd2UgZG9uJ3QgbmVlZFxuICAgICAgLy8gdGhlIGxlYWRpbmcgc3BhY2UuXG4gICAgICBjb25zdCBwcmV0dHlIb3N0bmFtZSA9IHByZXR0aWZpZXJzLmhvc3RuYW1lXG4gICAgICAgID8gcHJldHRpZmllcnMuaG9zdG5hbWUobG9nLmhvc3RuYW1lLCAnaG9zdG5hbWUnLCBsb2csIHsgY29sb3JzOiBjb2xvcml6ZXIuY29sb3JzIH0pXG4gICAgICAgIDogbG9nLmhvc3RuYW1lXG5cbiAgICAgIGxpbmUgKz0gYCR7bGluZSA9PT0gJygnID8gJ29uJyA6ICcgb24nfSAke3ByZXR0eUhvc3RuYW1lfWBcbiAgICB9XG5cbiAgICBsaW5lICs9ICcpJ1xuICB9XG5cbiAgaWYgKGxvZy5jYWxsZXIpIHtcbiAgICBjb25zdCBwcmV0dHlDYWxsZXIgPSBwcmV0dGlmaWVycy5jYWxsZXJcbiAgICAgID8gcHJldHRpZmllcnMuY2FsbGVyKGxvZy5jYWxsZXIsICdjYWxsZXInLCBsb2csIHsgY29sb3JzOiBjb2xvcml6ZXIuY29sb3JzIH0pXG4gICAgICA6IGxvZy5jYWxsZXJcblxuICAgIGxpbmUgKz0gYCR7bGluZSA9PT0gJycgPyAnJyA6ICcgJ308JHtwcmV0dHlDYWxsZXJ9PmBcbiAgfVxuXG4gIGlmIChsaW5lID09PSAnJykge1xuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGluZVxuICB9XG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gcHJldHRpZnlUaW1lXG5cbmNvbnN0IGZvcm1hdFRpbWUgPSByZXF1aXJlKCcuL2Zvcm1hdC10aW1lJylcblxuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBQcmV0dGlmeVRpbWVQYXJhbXNcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBsb2cgVGhlIGxvZyBvYmplY3Qgd2l0aCB0aGUgdGltZXN0YW1wIHRvIGJlIHByZXR0aWZpZWQuXG4gKiBAcHJvcGVydHkge1ByZXR0eUNvbnRleHR9IGNvbnRleHQgVGhlIGNvbnRleHQgb2JqZWN0IGJ1aWx0IGZyb20gcGFyc2luZ1xuICogdGhlIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBQcmV0dGlmaWVzIGEgdGltZXN0YW1wIGlmIHRoZSBnaXZlbiBgbG9nYCBoYXMgZWl0aGVyIGB0aW1lYCwgYHRpbWVzdGFtcGAgb3IgY3VzdG9tIHNwZWNpZmllZCB0aW1lc3RhbXBcbiAqIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7UHJldHRpZnlUaW1lUGFyYW1zfSBpbnB1dFxuICpcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR8c3RyaW5nfSBJZiBhIHRpbWVzdGFtcCBwcm9wZXJ0eSBjYW5ub3QgYmUgZm91bmQgdGhlblxuICogYHVuZGVmaW5lZGAgaXMgcmV0dXJuZWQuIE90aGVyd2lzZSwgdGhlIHByZXR0aWZpZWQgdGltZSBpcyByZXR1cm5lZCBhcyBhXG4gKiBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIHByZXR0aWZ5VGltZSAoeyBsb2csIGNvbnRleHQgfSkge1xuICBjb25zdCB7XG4gICAgdGltZXN0YW1wS2V5LFxuICAgIHRyYW5zbGF0ZVRpbWU6IHRyYW5zbGF0ZUZvcm1hdFxuICB9ID0gY29udGV4dFxuICBjb25zdCBwcmV0dGlmaWVyID0gY29udGV4dC5jdXN0b21QcmV0dGlmaWVycz8udGltZVxuICBsZXQgdGltZSA9IG51bGxcblxuICBpZiAodGltZXN0YW1wS2V5IGluIGxvZykge1xuICAgIHRpbWUgPSBsb2dbdGltZXN0YW1wS2V5XVxuICB9IGVsc2UgaWYgKCd0aW1lc3RhbXAnIGluIGxvZykge1xuICAgIHRpbWUgPSBsb2cudGltZXN0YW1wXG4gIH1cblxuICBpZiAodGltZSA9PT0gbnVsbCkgcmV0dXJuIHVuZGVmaW5lZFxuICBjb25zdCBvdXRwdXQgPSB0cmFuc2xhdGVGb3JtYXQgPyBmb3JtYXRUaW1lKHRpbWUsIHRyYW5zbGF0ZUZvcm1hdCkgOiB0aW1lXG5cbiAgcmV0dXJuIHByZXR0aWZpZXIgPyBwcmV0dGlmaWVyKG91dHB1dCkgOiBgWyR7b3V0cHV0fV1gXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBidWlsZFNhZmVTb25pY0Jvb206IHJlcXVpcmUoJy4vYnVpbGQtc2FmZS1zb25pYy1ib29tLmpzJyksXG4gIGNyZWF0ZURhdGU6IHJlcXVpcmUoJy4vY3JlYXRlLWRhdGUuanMnKSxcbiAgZGVsZXRlTG9nUHJvcGVydHk6IHJlcXVpcmUoJy4vZGVsZXRlLWxvZy1wcm9wZXJ0eS5qcycpLFxuICBmaWx0ZXJMb2c6IHJlcXVpcmUoJy4vZmlsdGVyLWxvZy5qcycpLFxuICBmb3JtYXRUaW1lOiByZXF1aXJlKCcuL2Zvcm1hdC10aW1lLmpzJyksXG4gIGdldFByb3BlcnR5VmFsdWU6IHJlcXVpcmUoJy4vZ2V0LXByb3BlcnR5LXZhbHVlLmpzJyksXG4gIGhhbmRsZUN1c3RvbUxldmVsc05hbWVzT3B0czogcmVxdWlyZSgnLi9oYW5kbGUtY3VzdG9tLWxldmVscy1uYW1lcy1vcHRzLmpzJyksXG4gIGhhbmRsZUN1c3RvbUxldmVsc09wdHM6IHJlcXVpcmUoJy4vaGFuZGxlLWN1c3RvbS1sZXZlbHMtb3B0cy5qcycpLFxuICBpbnRlcnByZXRDb25kaXRpb25hbHM6IHJlcXVpcmUoJy4vaW50ZXJwcmV0LWNvbmRpdGlvbmFscy5qcycpLFxuICBpc09iamVjdDogcmVxdWlyZSgnLi9pcy1vYmplY3QuanMnKSxcbiAgaXNWYWxpZERhdGU6IHJlcXVpcmUoJy4vaXMtdmFsaWQtZGF0ZS5qcycpLFxuICBqb2luTGluZXNXaXRoSW5kZW50YXRpb246IHJlcXVpcmUoJy4vam9pbi1saW5lcy13aXRoLWluZGVudGF0aW9uLmpzJyksXG4gIG5vb3A6IHJlcXVpcmUoJy4vbm9vcC5qcycpLFxuICBwYXJzZUZhY3RvcnlPcHRpb25zOiByZXF1aXJlKCcuL3BhcnNlLWZhY3Rvcnktb3B0aW9ucy5qcycpLFxuICBwcmV0dGlmeUVycm9yTG9nOiByZXF1aXJlKCcuL3ByZXR0aWZ5LWVycm9yLWxvZy5qcycpLFxuICBwcmV0dGlmeUVycm9yOiByZXF1aXJlKCcuL3ByZXR0aWZ5LWVycm9yLmpzJyksXG4gIHByZXR0aWZ5TGV2ZWw6IHJlcXVpcmUoJy4vcHJldHRpZnktbGV2ZWwuanMnKSxcbiAgcHJldHRpZnlNZXNzYWdlOiByZXF1aXJlKCcuL3ByZXR0aWZ5LW1lc3NhZ2UuanMnKSxcbiAgcHJldHRpZnlNZXRhZGF0YTogcmVxdWlyZSgnLi9wcmV0dGlmeS1tZXRhZGF0YS5qcycpLFxuICBwcmV0dGlmeU9iamVjdDogcmVxdWlyZSgnLi9wcmV0dGlmeS1vYmplY3QuanMnKSxcbiAgcHJldHRpZnlUaW1lOiByZXF1aXJlKCcuL3ByZXR0aWZ5LXRpbWUuanMnKSxcbiAgc3BsaXRQcm9wZXJ0eUtleTogcmVxdWlyZSgnLi9zcGxpdC1wcm9wZXJ0eS1rZXkuanMnKSxcbiAgZ2V0TGV2ZWxMYWJlbERhdGE6IHJlcXVpcmUoJy4vZ2V0LWxldmVsLWxhYmVsLWRhdGEnKVxufVxuXG4vLyBUaGUgcmVtYWluZGVyIG9mIHRoaXMgZmlsZSBjb25zaXN0cyBvZiBqc2RvYyBibG9ja3MgdGhhdCBhcmUgZGlmZmljdWx0IHRvXG4vLyBkZXRlcm1pbmUgYSBtb3JlIGFwcHJvcHJpYXRlIFwiaG9tZVwiIGZvci4gQXMgYW4gZXhhbXBsZSwgdGhlIGJsb2NrcyBhc3NvY2lhdGVkXG4vLyB3aXRoIGN1c3RvbSBwcmV0dGlmaWVycyBjb3VsZCBsaXZlIGluIGVpdGhlciB0aGUgYHByZXR0aWZ5LWxldmVsYCxcbi8vIGBwcmV0dGlmeS1tZXRhZGF0YWAsIG9yIGBwcmV0dGlmeS10aW1lYCBmaWxlcyBzaW5jZSB0aGV5IGFyZSB0aGUgcHJpbWFyeVxuLy8gZmlsZXMgd2hlcmUgc3VjaCBjb2RlIGlzIHVzZWQuIEJ1dCB3ZSB3YW50IGEgY2VudHJhbCBwbGFjZSB0byBkZWZpbmUgY29tbW9uXG4vLyBkb2MgYmxvY2tzLCBzbyB3ZSBhcmUgcGlja2luZyB0aGlzIGZpbGUgYXMgdGhlIGFuc3dlci5cblxuLyoqXG4gKiBBIGhhc2ggb2YgbG9nIHByb3BlcnR5IG5hbWVzIG1hcHBlZCB0byBwcmV0dGlmaWVyIGZ1bmN0aW9ucy4gV2hlbiB0aGVcbiAqIGluY29taW5nIGxvZyBkYXRhIGlzIGJlaW5nIHByb2Nlc3NlZCBmb3IgcHJldHRpZmljYXRpb24sIGFueSBrZXkgb24gdGhlIGxvZ1xuICogdGhhdCBtYXRjaGVzIGEga2V5IGluIGEgY3VzdG9tIHByZXR0aWZpZXJzIGhhc2ggd2lsbCBiZSBwcmV0dGlmaWVkIHVzaW5nXG4gKiB0aGF0IG1hdGNoaW5nIGN1c3RvbSBwcmV0dGlmaWVyLiBUaGUgdmFsdWUgcGFzc2VkIHRvIHRoZSBjdXN0b20gcHJldHRpZmllclxuICogd2lsbCB0aGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIHRoZSBjb3JyZXNwb25kaW5nIGxvZyBrZXkuXG4gKlxuICogVGhlIGhhc2ggbWF5IGNvbnRhaW4gYW55IGFyYml0cmFyeSBrZXlzIGZvciBhcmJpdHJhcnkgbG9nIHByb3BlcnRpZXMsIGJ1dCBpdFxuICogbWF5IGFsc28gY29udGFpbiBhIHNldCBvZiBwcmVkZWZpbmVkIGtleSBuYW1lcyB0aGF0IG1hcCB0byB3ZWxsLWtub3duIGxvZ1xuICogcHJvcGVydGllcy4gVGhlc2Uga2V5cyBhcmU6XG4gKlxuICogKyBgdGltZWAgKGZvciB0aGUgdGltZXN0YW1wIGZpZWxkKVxuICogKyBgbGV2ZWxgIChmb3IgdGhlIGxldmVsIGxhYmVsIGZpZWxkOyB2YWx1ZSBtYXkgYmUgYSBsZXZlbCBudW1iZXIgaW5zdGVhZFxuICogb2YgYSBsZXZlbCBsYWJlbClcbiAqICsgYGhvc3RuYW1lYFxuICogKyBgcGlkYFxuICogKyBgbmFtZWBcbiAqICsgYGNhbGxlcmBcbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0LjxzdHJpbmcsIEN1c3RvbVByZXR0aWZpZXJGdW5jPn0gQ3VzdG9tUHJldHRpZmllcnNcbiAqL1xuXG4vKipcbiAqIEEgc3luY2hyb25vdXMgZnVuY3Rpb24gdG8gYmUgdXNlZCBmb3IgcHJldHRpZnlpbmcgYSBsb2cgcHJvcGVydHkuIEl0IG11c3RcbiAqIHJldHVybiBhIHN0cmluZy5cbiAqXG4gKiBAdHlwZWRlZiB7ZnVuY3Rpb259IEN1c3RvbVByZXR0aWZpZXJGdW5jXG4gKiBAcGFyYW0ge2FueX0gdmFsdWUgVGhlIHZhbHVlIHRvIGJlIHByZXR0aWZpZWQgZm9yIHRoZSBrZXkgYXNzb2NpYXRlZCB3aXRoXG4gKiB0aGUgcHJldHRpZmllci5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cblxuLyoqXG4gKiBBIHRva2VuaXplZCBzdHJpbmcgdGhhdCBpbmRpY2F0ZXMgaG93IHRoZSBwcmV0dGlmaWVkIGxvZyBsaW5lIHNob3VsZCBiZVxuICogZm9ybWF0dGVkLiBUb2tlbnMgYXJlIGVpdGhlciBsb2cgcHJvcGVydGllcyBlbmNsb3NlZCBpbiBjdXJseSBicmFjZXMsIGUuZy5cbiAqIGB7bGV2ZWxMYWJlbH1gLCBge3BpZH1gLCBvciBge3JlcS51cmx9YCwgb3IgY29uZGl0aW9uYWwgZGlyZWN0aXZlcyBpbiBjdXJseVxuICogYnJhY2VzLiBUaGUgb25seSBjb25kaXRpb25hbCBkaXJlY3RpdmVzIHN1cHBvcnRlZCBhcmUgYGlmYCBhbmQgYGVuZGAsIGUuZy5cbiAqIGB7aWYgcGlkfXtwaWR9e2VuZH1gOyBldmVyeSBgaWZgIG11c3QgaGF2ZSBhIG1hdGNoaW5nIGBlbmRgLiBOZXN0ZWRcbiAqIGNvbmRpdGlvbnMgYXJlIG5vdCBzdXBwb3J0ZWQuXG4gKlxuICogQHR5cGVkZWYge3N0cmluZ30gTWVzc2FnZUZvcm1hdFN0cmluZ1xuICpcbiAqIEBleGFtcGxlXG4gKiBge2xldmVsTGFiZWx9IC0ge2lmIHBpZH17cGlkfSAtIHtlbmR9dXJsOntyZXEudXJsfWBcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IFByZXR0aWZ5TWVzc2FnZUV4dHJhc1xuICogQHByb3BlcnR5IHtvYmplY3R9IGNvbG9ycyBBdmFpbGFibGUgY29sb3IgZnVuY3Rpb25zIGJhc2VkIG9uIGB1c2VDb2xvcmAgKG9yIGBjb2xvcml6ZWApIGNvbnRleHRcbiAqIHRoZSBvcHRpb25zLlxuICovXG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IGFjY2VwdHMgYSBsb2cgb2JqZWN0LCBuYW1lIG9mIHRoZSBtZXNzYWdlIGtleSwgYW5kIG5hbWUgb2ZcbiAqIHRoZSBsZXZlbCBsYWJlbCBrZXkgYW5kIHJldHVybnMgYSBmb3JtYXR0ZWQgbG9nIGxpbmUuXG4gKlxuICogTm90ZTogdGhpcyBmdW5jdGlvbiBtdXN0IGJlIHN5bmNocm9ub3VzLlxuICpcbiAqIEB0eXBlZGVmIHtmdW5jdGlvbn0gTWVzc2FnZUZvcm1hdEZ1bmN0aW9uXG4gKiBAcGFyYW0ge29iamVjdH0gbG9nIFRoZSBsb2cgb2JqZWN0IHRvIGJlIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlS2V5IFRoZSBuYW1lIG9mIHRoZSBrZXkgaW4gdGhlIGBsb2dgIG9iamVjdCB0aGF0XG4gKiBjb250YWlucyB0aGUgbG9nIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gbGV2ZWxMYWJlbCBUaGUgbmFtZSBvZiB0aGUga2V5IGluIHRoZSBgbG9nYCBvYmplY3QgdGhhdFxuICogY29udGFpbnMgdGhlIGxvZyBsZXZlbCBuYW1lLlxuICogQHBhcmFtIHtQcmV0dGlmeU1lc3NhZ2VFeHRyYXN9IGV4dHJhcyBBZGRpdGlvbmFsIGRhdGEgYXZhaWxhYmxlIGZvciBtZXNzYWdlIGNvbnRleHRcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKlxuICogQGV4YW1wbGVcbiAqIGZ1bmN0aW9uIChsb2csIG1lc3NhZ2VLZXksIGxldmVsTGFiZWwpIHtcbiAqICAgcmV0dXJuIGAke2xvZ1tsZXZlbExhYmVsXX0gLSAke2xvZ1ttZXNzYWdlS2V5XX1gXG4gKiB9XG4gKi9cbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgaGFzQnVmZmVyID0gdHlwZW9mIEJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCdcbmNvbnN0IHN1c3BlY3RQcm90b1J4ID0gL1wiKD86X3xcXFxcdTAwNVtGZl0pKD86X3xcXFxcdTAwNVtGZl0pKD86cHxcXFxcdTAwNzApKD86cnxcXFxcdTAwNzIpKD86b3xcXFxcdTAwNltGZl0pKD86dHxcXFxcdTAwNzQpKD86b3xcXFxcdTAwNltGZl0pKD86X3xcXFxcdTAwNVtGZl0pKD86X3xcXFxcdTAwNVtGZl0pXCJcXHMqOi9cbmNvbnN0IHN1c3BlY3RDb25zdHJ1Y3RvclJ4ID0gL1wiKD86Y3xcXFxcdTAwNjMpKD86b3xcXFxcdTAwNltGZl0pKD86bnxcXFxcdTAwNltFZV0pKD86c3xcXFxcdTAwNzMpKD86dHxcXFxcdTAwNzQpKD86cnxcXFxcdTAwNzIpKD86dXxcXFxcdTAwNzUpKD86Y3xcXFxcdTAwNjMpKD86dHxcXFxcdTAwNzQpKD86b3xcXFxcdTAwNltGZl0pKD86cnxcXFxcdTAwNzIpXCJcXHMqOi9cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gSW50ZXJuYWwgcGFyc2UgZnVuY3Rpb24gdGhhdCBwYXJzZXMgSlNPTiB0ZXh0IHdpdGggc2VjdXJpdHkgY2hlY2tzLlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfEJ1ZmZlcn0gdGV4dCAtIFRoZSBKU09OIHRleHQgc3RyaW5nIG9yIEJ1ZmZlciB0byBwYXJzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZXZpdmVyXSAtIFRoZSBKU09OLnBhcnNlKCkgb3B0aW9uYWwgcmV2aXZlciBhcmd1bWVudC5cbiAqIEBwYXJhbSB7aW1wb3J0KCcuL3R5cGVzJykuUGFyc2VPcHRpb25zfSBbb3B0aW9uc10gLSBPcHRpb25hbCBjb25maWd1cmF0aW9uIG9iamVjdC5cbiAqIEByZXR1cm5zIHsqfSBUaGUgcGFyc2VkIG9iamVjdC5cbiAqIEB0aHJvd3Mge1N5bnRheEVycm9yfSBJZiBhIGZvcmJpZGRlbiBwcm90b3R5cGUgcHJvcGVydHkgaXMgZm91bmQgYW5kIGBvcHRpb25zLnByb3RvQWN0aW9uYCBvclxuICogYG9wdGlvbnMuY29uc3RydWN0b3JBY3Rpb25gIGlzIGAnZXJyb3InYC5cbiAqL1xuZnVuY3Rpb24gX3BhcnNlICh0ZXh0LCByZXZpdmVyLCBvcHRpb25zKSB7XG4gIC8vIE5vcm1hbGl6ZSBhcmd1bWVudHNcbiAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgIGlmIChyZXZpdmVyICE9PSBudWxsICYmIHR5cGVvZiByZXZpdmVyID09PSAnb2JqZWN0Jykge1xuICAgICAgb3B0aW9ucyA9IHJldml2ZXJcbiAgICAgIHJldml2ZXIgPSB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBpZiAoaGFzQnVmZmVyICYmIEJ1ZmZlci5pc0J1ZmZlcih0ZXh0KSkge1xuICAgIHRleHQgPSB0ZXh0LnRvU3RyaW5nKClcbiAgfVxuXG4gIC8vIEJPTSBjaGVja2VyXG4gIGlmICh0ZXh0ICYmIHRleHQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgdGV4dCA9IHRleHQuc2xpY2UoMSlcbiAgfVxuXG4gIC8vIFBhcnNlIG5vcm1hbGx5LCBhbGxvd2luZyBleGNlcHRpb25zXG4gIGNvbnN0IG9iaiA9IEpTT04ucGFyc2UodGV4dCwgcmV2aXZlcilcblxuICAvLyBJZ25vcmUgbnVsbCBhbmQgbm9uLW9iamVjdHNcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBvYmpcbiAgfVxuXG4gIGNvbnN0IHByb3RvQWN0aW9uID0gKG9wdGlvbnMgJiYgb3B0aW9ucy5wcm90b0FjdGlvbikgfHwgJ2Vycm9yJ1xuICBjb25zdCBjb25zdHJ1Y3RvckFjdGlvbiA9IChvcHRpb25zICYmIG9wdGlvbnMuY29uc3RydWN0b3JBY3Rpb24pIHx8ICdlcnJvcidcblxuICAvLyBvcHRpb25zOiAnZXJyb3InIChkZWZhdWx0KSAvICdyZW1vdmUnIC8gJ2lnbm9yZSdcbiAgaWYgKHByb3RvQWN0aW9uID09PSAnaWdub3JlJyAmJiBjb25zdHJ1Y3RvckFjdGlvbiA9PT0gJ2lnbm9yZScpIHtcbiAgICByZXR1cm4gb2JqXG4gIH1cblxuICBpZiAocHJvdG9BY3Rpb24gIT09ICdpZ25vcmUnICYmIGNvbnN0cnVjdG9yQWN0aW9uICE9PSAnaWdub3JlJykge1xuICAgIGlmIChzdXNwZWN0UHJvdG9SeC50ZXN0KHRleHQpID09PSBmYWxzZSAmJiBzdXNwZWN0Q29uc3RydWN0b3JSeC50ZXN0KHRleHQpID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIG9ialxuICAgIH1cbiAgfSBlbHNlIGlmIChwcm90b0FjdGlvbiAhPT0gJ2lnbm9yZScgJiYgY29uc3RydWN0b3JBY3Rpb24gPT09ICdpZ25vcmUnKSB7XG4gICAgaWYgKHN1c3BlY3RQcm90b1J4LnRlc3QodGV4dCkgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gb2JqXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChzdXNwZWN0Q29uc3RydWN0b3JSeC50ZXN0KHRleHQpID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIG9ialxuICAgIH1cbiAgfVxuXG4gIC8vIFNjYW4gcmVzdWx0IGZvciBwcm90byBrZXlzXG4gIHJldHVybiBmaWx0ZXIob2JqLCB7IHByb3RvQWN0aW9uLCBjb25zdHJ1Y3RvckFjdGlvbiwgc2FmZTogb3B0aW9ucyAmJiBvcHRpb25zLnNhZmUgfSlcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gU2NhbnMgYW5kIGZpbHRlcnMgYW4gb2JqZWN0IGZvciBmb3JiaWRkZW4gcHJvdG90eXBlIHByb3BlcnRpZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gVGhlIG9iamVjdCBiZWluZyBzY2FubmVkLlxuICogQHBhcmFtIHtpbXBvcnQoJy4vdHlwZXMnKS5QYXJzZU9wdGlvbnN9IFtvcHRpb25zXSAtIE9wdGlvbmFsIGNvbmZpZ3VyYXRpb24gb2JqZWN0LlxuICogQHJldHVybnMge09iamVjdHxudWxsfSBUaGUgZmlsdGVyZWQgb2JqZWN0LCBvciBgbnVsbGAgaWYgc2FmZSBtb2RlIGlzIGVuYWJsZWQgYW5kIGlzc3VlcyBhcmUgZm91bmQuXG4gKiBAdGhyb3dzIHtTeW50YXhFcnJvcn0gSWYgYSBmb3JiaWRkZW4gcHJvdG90eXBlIHByb3BlcnR5IGlzIGZvdW5kIGFuZCBgb3B0aW9ucy5wcm90b0FjdGlvbmAgb3JcbiAqIGBvcHRpb25zLmNvbnN0cnVjdG9yQWN0aW9uYCBpcyBgJ2Vycm9yJ2AuXG4gKi9cbmZ1bmN0aW9uIGZpbHRlciAob2JqLCB7IHByb3RvQWN0aW9uID0gJ2Vycm9yJywgY29uc3RydWN0b3JBY3Rpb24gPSAnZXJyb3InLCBzYWZlIH0gPSB7fSkge1xuICBsZXQgbmV4dCA9IFtvYmpdXG5cbiAgd2hpbGUgKG5leHQubGVuZ3RoKSB7XG4gICAgY29uc3Qgbm9kZXMgPSBuZXh0XG4gICAgbmV4dCA9IFtdXG5cbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgIGlmIChwcm90b0FjdGlvbiAhPT0gJ2lnbm9yZScgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5vZGUsICdfX3Byb3RvX18nKSkgeyAvLyBBdm9pZCBjYWxsaW5nIG5vZGUuaGFzT3duUHJvcGVydHkgZGlyZWN0bHlcbiAgICAgICAgaWYgKHNhZmUgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9IGVsc2UgaWYgKHByb3RvQWN0aW9uID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdPYmplY3QgY29udGFpbnMgZm9yYmlkZGVuIHByb3RvdHlwZSBwcm9wZXJ0eScpXG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGUgbm9kZS5fX3Byb3RvX18gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b1xuICAgICAgfVxuXG4gICAgICBpZiAoY29uc3RydWN0b3JBY3Rpb24gIT09ICdpZ25vcmUnICYmXG4gICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5vZGUsICdjb25zdHJ1Y3RvcicpICYmXG4gICAgICAgICAgbm9kZS5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJlxuICAgICAgICAgIHR5cGVvZiBub2RlLmNvbnN0cnVjdG9yID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChub2RlLmNvbnN0cnVjdG9yLCAncHJvdG90eXBlJykpIHsgLy8gQXZvaWQgY2FsbGluZyBub2RlLmhhc093blByb3BlcnR5IGRpcmVjdGx5XG4gICAgICAgIGlmIChzYWZlID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfSBlbHNlIGlmIChjb25zdHJ1Y3RvckFjdGlvbiA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignT2JqZWN0IGNvbnRhaW5zIGZvcmJpZGRlbiBwcm90b3R5cGUgcHJvcGVydHknKVxuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIG5vZGUuY29uc3RydWN0b3JcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gbm9kZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG5vZGVba2V5XVxuICAgICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIG5leHQucHVzaCh2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqXG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFBhcnNlcyBhIGdpdmVuIEpTT04tZm9ybWF0dGVkIHRleHQgaW50byBhbiBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ3xCdWZmZXJ9IHRleHQgLSBUaGUgSlNPTiB0ZXh0IHN0cmluZyBvciBCdWZmZXIgdG8gcGFyc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmV2aXZlcl0gLSBUaGUgYEpTT04ucGFyc2UoKWAgb3B0aW9uYWwgcmV2aXZlciBhcmd1bWVudCwgb3Igb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi90eXBlcycpLlBhcnNlT3B0aW9uc30gW29wdGlvbnNdIC0gT3B0aW9uYWwgY29uZmlndXJhdGlvbiBvYmplY3QuXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHBhcnNlZCBvYmplY3QuXG4gKiBAdGhyb3dzIHtTeW50YXhFcnJvcn0gSWYgdGhlIEpTT04gdGV4dCBpcyBtYWxmb3JtZWQgb3IgY29udGFpbnMgZm9yYmlkZGVuIHByb3RvdHlwZSBwcm9wZXJ0aWVzXG4gKiB3aGVuIGBvcHRpb25zLnByb3RvQWN0aW9uYCBvciBgb3B0aW9ucy5jb25zdHJ1Y3RvckFjdGlvbmAgaXMgYCdlcnJvcidgLlxuICovXG5mdW5jdGlvbiBwYXJzZSAodGV4dCwgcmV2aXZlciwgb3B0aW9ucykge1xuICBjb25zdCB7IHN0YWNrVHJhY2VMaW1pdCB9ID0gRXJyb3JcbiAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID0gMFxuICB0cnkge1xuICAgIHJldHVybiBfcGFyc2UodGV4dCwgcmV2aXZlciwgb3B0aW9ucylcbiAgfSBmaW5hbGx5IHtcbiAgICBFcnJvci5zdGFja1RyYWNlTGltaXQgPSBzdGFja1RyYWNlTGltaXRcbiAgfVxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBTYWZlbHkgcGFyc2VzIGEgZ2l2ZW4gSlNPTi1mb3JtYXR0ZWQgdGV4dCBpbnRvIGFuIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfEJ1ZmZlcn0gdGV4dCAtIFRoZSBKU09OIHRleHQgc3RyaW5nIG9yIEJ1ZmZlciB0byBwYXJzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZXZpdmVyXSAtIFRoZSBgSlNPTi5wYXJzZSgpYCBvcHRpb25hbCByZXZpdmVyIGFyZ3VtZW50LlxuICogQHJldHVybnMgeyp8bnVsbHx1bmRlZmluZWR9IFRoZSBwYXJzZWQgb2JqZWN0LCBgbnVsbGAgaWYgc2VjdXJpdHkgaXNzdWVzIGZvdW5kLCBvciBgdW5kZWZpbmVkYCBvbiBwYXJzZSBlcnJvci5cbiAqL1xuZnVuY3Rpb24gc2FmZVBhcnNlICh0ZXh0LCByZXZpdmVyKSB7XG4gIGNvbnN0IHsgc3RhY2tUcmFjZUxpbWl0IH0gPSBFcnJvclxuICBFcnJvci5zdGFja1RyYWNlTGltaXQgPSAwXG4gIHRyeSB7XG4gICAgcmV0dXJuIF9wYXJzZSh0ZXh0LCByZXZpdmVyLCB7IHNhZmU6IHRydWUgfSlcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9IGZpbmFsbHkge1xuICAgIEVycm9yLnN0YWNrVHJhY2VMaW1pdCA9IHN0YWNrVHJhY2VMaW1pdFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyc2Vcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBwYXJzZVxubW9kdWxlLmV4cG9ydHMucGFyc2UgPSBwYXJzZVxubW9kdWxlLmV4cG9ydHMuc2FmZVBhcnNlID0gc2FmZVBhcnNlXG5tb2R1bGUuZXhwb3J0cy5zY2FuID0gZmlsdGVyXG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gcHJldHR5XG5cbmNvbnN0IHNqcyA9IHJlcXVpcmUoJ3NlY3VyZS1qc29uLXBhcnNlJylcblxuY29uc3QgaXNPYmplY3QgPSByZXF1aXJlKCcuL3V0aWxzL2lzLW9iamVjdCcpXG5jb25zdCBwcmV0dGlmeUVycm9yTG9nID0gcmVxdWlyZSgnLi91dGlscy9wcmV0dGlmeS1lcnJvci1sb2cnKVxuY29uc3QgcHJldHRpZnlMZXZlbCA9IHJlcXVpcmUoJy4vdXRpbHMvcHJldHRpZnktbGV2ZWwnKVxuY29uc3QgcHJldHRpZnlNZXNzYWdlID0gcmVxdWlyZSgnLi91dGlscy9wcmV0dGlmeS1tZXNzYWdlJylcbmNvbnN0IHByZXR0aWZ5TWV0YWRhdGEgPSByZXF1aXJlKCcuL3V0aWxzL3ByZXR0aWZ5LW1ldGFkYXRhJylcbmNvbnN0IHByZXR0aWZ5T2JqZWN0ID0gcmVxdWlyZSgnLi91dGlscy9wcmV0dGlmeS1vYmplY3QnKVxuY29uc3QgcHJldHRpZnlUaW1lID0gcmVxdWlyZSgnLi91dGlscy9wcmV0dGlmeS10aW1lJylcbmNvbnN0IGZpbHRlckxvZyA9IHJlcXVpcmUoJy4vdXRpbHMvZmlsdGVyLWxvZycpXG5cbmNvbnN0IHtcbiAgTEVWRUxTLFxuICBMRVZFTF9LRVksXG4gIExFVkVMX05BTUVTXG59ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKVxuXG5jb25zdCBqc29uUGFyc2VyID0gaW5wdXQgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiB7IHZhbHVlOiBzanMucGFyc2UoaW5wdXQsIHsgcHJvdG9BY3Rpb246ICdyZW1vdmUnIH0pIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIHsgZXJyIH1cbiAgfVxufVxuXG4vKipcbiAqIE9yY2hlc3RyYXRlcyBwcm9jZXNzaW5nIHRoZSByZWNlaXZlZCBsb2cgZGF0YSBhY2NvcmRpbmcgdG8gdGhlIHByb3ZpZGVkXG4gKiBjb25maWd1cmF0aW9uIGFuZCByZXR1cm5zIGEgcHJldHRpZmllZCBsb2cgc3RyaW5nLlxuICpcbiAqIEB0eXBlZGVmIHtmdW5jdGlvbn0gTG9nUHJldHRpZmllckZ1bmNcbiAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gaW5wdXREYXRhIEEgbG9nIHN0cmluZyBvciBhIGxvZy1saWtlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5nIHRoYXQgcmVwcmVzZW50cyB0aGUgcHJldHRpZmllZCBsb2cgZGF0YS5cbiAqL1xuZnVuY3Rpb24gcHJldHR5IChpbnB1dERhdGEpIHtcbiAgbGV0IGxvZ1xuICBpZiAoIWlzT2JqZWN0KGlucHV0RGF0YSkpIHtcbiAgICBjb25zdCBwYXJzZWQgPSBqc29uUGFyc2VyKGlucHV0RGF0YSlcbiAgICBpZiAocGFyc2VkLmVyciB8fCAhaXNPYmplY3QocGFyc2VkLnZhbHVlKSkge1xuICAgICAgLy8gcGFzcyB0aHJvdWdoXG4gICAgICByZXR1cm4gaW5wdXREYXRhICsgdGhpcy5FT0xcbiAgICB9XG4gICAgbG9nID0gcGFyc2VkLnZhbHVlXG4gIH0gZWxzZSB7XG4gICAgbG9nID0gaW5wdXREYXRhXG4gIH1cblxuICBpZiAodGhpcy5taW5pbXVtTGV2ZWwpIHtcbiAgICAvLyBXZSBuZWVkIHRvIGZpZ3VyZSBvdXQgaWYgdGhlIGN1c3RvbSBsZXZlbHMgaGFzIHRoZSBkZXNpcmVkIG1pbmltdW1cbiAgICAvLyBsZXZlbCAmIHVzZSB0aGF0IG9uZSBpZiBmb3VuZC4gSWYgbm90LCBkZXRlcm1pbmUgaWYgdGhlIGxldmVsIGV4aXN0c1xuICAgIC8vIGluIHRoZSBzdGFuZGFyZCBsZXZlbHMuIEluIGJvdGggY2FzZXMsIG1ha2Ugc3VyZSB3ZSBoYXZlIHRoZSBsZXZlbFxuICAgIC8vIG51bWJlciBpbnN0ZWFkIG9mIHRoZSBsZXZlbCBuYW1lLlxuICAgIGxldCBjb25kaXRpb25cbiAgICBpZiAodGhpcy51c2VPbmx5Q3VzdG9tUHJvcHMpIHtcbiAgICAgIGNvbmRpdGlvbiA9IHRoaXMuY3VzdG9tTGV2ZWxzXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmRpdGlvbiA9IHRoaXMuY3VzdG9tTGV2ZWxOYW1lc1t0aGlzLm1pbmltdW1MZXZlbF0gIT09IHVuZGVmaW5lZFxuICAgIH1cbiAgICBsZXQgbWluaW11bVxuICAgIGlmIChjb25kaXRpb24pIHtcbiAgICAgIG1pbmltdW0gPSB0aGlzLmN1c3RvbUxldmVsTmFtZXNbdGhpcy5taW5pbXVtTGV2ZWxdXG4gICAgfSBlbHNlIHtcbiAgICAgIG1pbmltdW0gPSBMRVZFTF9OQU1FU1t0aGlzLm1pbmltdW1MZXZlbF1cbiAgICB9XG4gICAgaWYgKCFtaW5pbXVtKSB7XG4gICAgICBtaW5pbXVtID0gdHlwZW9mIHRoaXMubWluaW11bUxldmVsID09PSAnc3RyaW5nJ1xuICAgICAgICA/IExFVkVMX05BTUVTW3RoaXMubWluaW11bUxldmVsXVxuICAgICAgICA6IExFVkVMX05BTUVTW0xFVkVMU1t0aGlzLm1pbmltdW1MZXZlbF0udG9Mb3dlckNhc2UoKV1cbiAgICB9XG5cbiAgICBjb25zdCBsZXZlbCA9IGxvZ1t0aGlzLmxldmVsS2V5ID09PSB1bmRlZmluZWQgPyBMRVZFTF9LRVkgOiB0aGlzLmxldmVsS2V5XVxuICAgIGlmIChsZXZlbCA8IG1pbmltdW0pIHJldHVyblxuICB9XG5cbiAgY29uc3QgcHJldHRpZmllZE1lc3NhZ2UgPSBwcmV0dGlmeU1lc3NhZ2UoeyBsb2csIGNvbnRleHQ6IHRoaXMuY29udGV4dCB9KVxuXG4gIGlmICh0aGlzLmlnbm9yZUtleXMgfHwgdGhpcy5pbmNsdWRlS2V5cykge1xuICAgIGxvZyA9IGZpbHRlckxvZyh7IGxvZywgY29udGV4dDogdGhpcy5jb250ZXh0IH0pXG4gIH1cblxuICBjb25zdCBwcmV0dGlmaWVkTGV2ZWwgPSBwcmV0dGlmeUxldmVsKHtcbiAgICBsb2csXG4gICAgY29udGV4dDoge1xuICAgICAgLi4udGhpcy5jb250ZXh0LFxuICAgICAgLy8gVGhpcyBpcyBvZGQuIFRoZSBjb2xvcml6ZXIgZW5kcyB1cCByZWx5aW5nIG9uIHRoZSB2YWx1ZSBvZlxuICAgICAgLy8gYGN1c3RvbVByb3BlcnRpZXNgIGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGBjdXN0b21MZXZlbHNgIGFuZFxuICAgICAgLy8gYGN1c3RvbUxldmVsTmFtZXNgLlxuICAgICAgLi4udGhpcy5jb250ZXh0LmN1c3RvbVByb3BlcnRpZXNcbiAgICB9XG4gIH0pXG4gIGNvbnN0IHByZXR0aWZpZWRNZXRhZGF0YSA9IHByZXR0aWZ5TWV0YWRhdGEoeyBsb2csIGNvbnRleHQ6IHRoaXMuY29udGV4dCB9KVxuICBjb25zdCBwcmV0dGlmaWVkVGltZSA9IHByZXR0aWZ5VGltZSh7IGxvZywgY29udGV4dDogdGhpcy5jb250ZXh0IH0pXG5cbiAgbGV0IGxpbmUgPSAnJ1xuICBpZiAodGhpcy5sZXZlbEZpcnN0ICYmIHByZXR0aWZpZWRMZXZlbCkge1xuICAgIGxpbmUgPSBgJHtwcmV0dGlmaWVkTGV2ZWx9YFxuICB9XG5cbiAgaWYgKHByZXR0aWZpZWRUaW1lICYmIGxpbmUgPT09ICcnKSB7XG4gICAgbGluZSA9IGAke3ByZXR0aWZpZWRUaW1lfWBcbiAgfSBlbHNlIGlmIChwcmV0dGlmaWVkVGltZSkge1xuICAgIGxpbmUgPSBgJHtsaW5lfSAke3ByZXR0aWZpZWRUaW1lfWBcbiAgfVxuXG4gIGlmICghdGhpcy5sZXZlbEZpcnN0ICYmIHByZXR0aWZpZWRMZXZlbCkge1xuICAgIGlmIChsaW5lLmxlbmd0aCA+IDApIHtcbiAgICAgIGxpbmUgPSBgJHtsaW5lfSAke3ByZXR0aWZpZWRMZXZlbH1gXG4gICAgfSBlbHNlIHtcbiAgICAgIGxpbmUgPSBwcmV0dGlmaWVkTGV2ZWxcbiAgICB9XG4gIH1cblxuICBpZiAocHJldHRpZmllZE1ldGFkYXRhKSB7XG4gICAgaWYgKGxpbmUubGVuZ3RoID4gMCkge1xuICAgICAgbGluZSA9IGAke2xpbmV9ICR7cHJldHRpZmllZE1ldGFkYXRhfTpgXG4gICAgfSBlbHNlIHtcbiAgICAgIGxpbmUgPSBwcmV0dGlmaWVkTWV0YWRhdGFcbiAgICB9XG4gIH1cblxuICBpZiAobGluZS5lbmRzV2l0aCgnOicpID09PSBmYWxzZSAmJiBsaW5lICE9PSAnJykge1xuICAgIGxpbmUgKz0gJzonXG4gIH1cblxuICBpZiAocHJldHRpZmllZE1lc3NhZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChsaW5lLmxlbmd0aCA+IDApIHtcbiAgICAgIGxpbmUgPSBgJHtsaW5lfSAke3ByZXR0aWZpZWRNZXNzYWdlfWBcbiAgICB9IGVsc2Uge1xuICAgICAgbGluZSA9IHByZXR0aWZpZWRNZXNzYWdlXG4gICAgfVxuICB9XG5cbiAgaWYgKGxpbmUubGVuZ3RoID4gMCAmJiAhdGhpcy5zaW5nbGVMaW5lKSB7XG4gICAgbGluZSArPSB0aGlzLkVPTFxuICB9XG5cbiAgLy8gcGlub0A3KyBkb2VzIG5vdCBsb2cgdGhpcyBhbnltb3JlXG4gIGlmIChsb2cudHlwZSA9PT0gJ0Vycm9yJyAmJiB0eXBlb2YgbG9nLnN0YWNrID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IHByZXR0aWZpZWRFcnJvckxvZyA9IHByZXR0aWZ5RXJyb3JMb2coeyBsb2csIGNvbnRleHQ6IHRoaXMuY29udGV4dCB9KVxuICAgIGlmICh0aGlzLnNpbmdsZUxpbmUpIGxpbmUgKz0gdGhpcy5FT0xcbiAgICBsaW5lICs9IHByZXR0aWZpZWRFcnJvckxvZ1xuICB9IGVsc2UgaWYgKHRoaXMuaGlkZU9iamVjdCA9PT0gZmFsc2UpIHtcbiAgICBjb25zdCBza2lwS2V5cyA9IFtcbiAgICAgIHRoaXMubWVzc2FnZUtleSxcbiAgICAgIHRoaXMubGV2ZWxLZXksXG4gICAgICB0aGlzLnRpbWVzdGFtcEtleVxuICAgIF1cbiAgICAgIC5tYXAoKGtleSkgPT4ga2V5LnJlcGxhY2VBbGwoL1xcXFwvZywgJycpKVxuICAgICAgLmZpbHRlcihrZXkgPT4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGxvZ1trZXldID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgIHR5cGVvZiBsb2dba2V5XSA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgICB0eXBlb2YgbG9nW2tleV0gPT09ICdib29sZWFuJ1xuICAgICAgfSlcbiAgICBjb25zdCBwcmV0dGlmaWVkT2JqZWN0ID0gcHJldHRpZnlPYmplY3Qoe1xuICAgICAgbG9nLFxuICAgICAgc2tpcEtleXMsXG4gICAgICBjb250ZXh0OiB0aGlzLmNvbnRleHRcbiAgICB9KVxuXG4gICAgLy8gSW4gc2luZ2xlIGxpbmUgbW9kZSwgaW5jbHVkZSBhIHNwYWNlIG9ubHkgaWYgcHJldHRpZmllZCB2ZXJzaW9uIGlzbid0IGVtcHR5XG4gICAgaWYgKHRoaXMuc2luZ2xlTGluZSAmJiAhL15cXHMkLy50ZXN0KHByZXR0aWZpZWRPYmplY3QpKSB7XG4gICAgICBsaW5lICs9ICcgJ1xuICAgIH1cbiAgICBsaW5lICs9IHByZXR0aWZpZWRPYmplY3RcbiAgfVxuXG4gIHJldHVybiBsaW5lXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHsgaXNDb2xvclN1cHBvcnRlZCB9ID0gcmVxdWlyZSgnY29sb3JldHRlJylcbmNvbnN0IHB1bXAgPSByZXF1aXJlKCdwdW1wJylcbmNvbnN0IHsgVHJhbnNmb3JtIH0gPSByZXF1aXJlKCdub2RlOnN0cmVhbScpXG5jb25zdCBhYnN0cmFjdFRyYW5zcG9ydCA9IHJlcXVpcmUoJ3Bpbm8tYWJzdHJhY3QtdHJhbnNwb3J0JylcbmNvbnN0IGNvbG9ycyA9IHJlcXVpcmUoJy4vbGliL2NvbG9ycycpXG5jb25zdCB7XG4gIEVSUk9SX0xJS0VfS0VZUyxcbiAgTEVWRUxfS0VZLFxuICBMRVZFTF9MQUJFTCxcbiAgTUVTU0FHRV9LRVksXG4gIFRJTUVTVEFNUF9LRVlcbn0gPSByZXF1aXJlKCcuL2xpYi9jb25zdGFudHMnKVxuY29uc3Qge1xuICBidWlsZFNhZmVTb25pY0Jvb20sXG4gIHBhcnNlRmFjdG9yeU9wdGlvbnNcbn0gPSByZXF1aXJlKCcuL2xpYi91dGlscycpXG5jb25zdCBwcmV0dHkgPSByZXF1aXJlKCcuL2xpYi9wcmV0dHknKVxuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IFBpbm9QcmV0dHlPcHRpb25zXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtjb2xvcml6ZV0gSW5kaWNhdGVzIGlmIGNvbG9ycyBzaG91bGQgYmUgdXNlZCB3aGVuXG4gKiBwcmV0dGlmeWluZy4gVGhlIGRlZmF1bHQgd2lsbCBiZSBkZXRlcm1pbmVkIGJ5IHRoZSB0ZXJtaW5hbCBjYXBhYmlsaXRpZXMgYXRcbiAqIHJ1biB0aW1lLlxuICogQHByb3BlcnR5IHtib29sZWFufSBbY29sb3JpemVPYmplY3RzPXRydWVdIEFwcGx5IGNvbG9yaW5nIHRvIHJlbmRlcmVkIG9iamVjdHNcbiAqIHdoZW4gY29sb3JpbmcgaXMgZW5hYmxlZC5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2NybGY9ZmFsc2VdIEVuZCBsaW5lcyB3aXRoIGBcXHJcXG5gIGluc3RlYWQgb2YgYFxcbmAuXG4gKiBAcHJvcGVydHkge3N0cmluZ3xudWxsfSBbY3VzdG9tQ29sb3JzPW51bGxdIEEgY29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgY29sb3JzXG4gKiB0byB1c2UgZm9yIHNwZWNpZmljIGxldmVsIGxhYmVscywgZS5nLiBgZXJyOnJlZCxpbmZvOmJsdWVgLlxuICogQHByb3BlcnR5IHtzdHJpbmd8bnVsbH0gW2N1c3RvbUxldmVscz1udWxsXSBBIGNvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIHVzZXJcbiAqIGRlZmluZWQgbGV2ZWwgbmFtZXMgYW5kIG51bWJlcnMsIGUuZy4gYGVycjo5OSxpbmZvOjFgLlxuICogQHByb3BlcnR5IHtDdXN0b21QcmV0dGlmaWVyc30gW2N1c3RvbVByZXR0aWZpZXJzPXt9XSBBIHNldCBvZiBwcmV0dGlmaWVyXG4gKiBmdW5jdGlvbnMgdG8gYXBwbHkgdG8ga2V5cyBkZWZpbmVkIGluIHRoaXMgb2JqZWN0LlxuICogQHByb3BlcnR5IHtLX0VSUk9SX0xJS0VfS0VZU30gW2Vycm9yTGlrZU9iamVjdEtleXNdIEEgbGlzdCBvZiBzdHJpbmcgcHJvcGVydHlcbiAqIG5hbWVzIHRvIGNvbnNpZGVyIGFzIGVycm9yIG9iamVjdHMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2Vycm9yUHJvcHM9JyddIEEgY29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgcHJvcGVydGllcyBvblxuICogZXJyb3Igb2JqZWN0cyB0byBpbmNsdWRlIGluIHRoZSBvdXRwdXQuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtoaWRlT2JqZWN0PWZhbHNlXSBXaGVuIGB0cnVlYCwgZGF0YSBvYmplY3RzIHdpbGwgYmVcbiAqIG9taXR0ZWQgZnJvbSB0aGUgb3V0cHV0IChleGNlcHQgZm9yIGVycm9yIG9iamVjdHMpLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtpZ25vcmU9J2hvc3RuYW1lJ10gQSBjb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBsb2cga2V5c1xuICogdG8gb21pdCB3aGVuIG91dHB1dHRpbmcgdGhlIHByZXR0aWZpZWQgbG9nIGluZm9ybWF0aW9uLlxuICogQHByb3BlcnR5IHt1bmRlZmluZWR8c3RyaW5nfSBbaW5jbHVkZT11bmRlZmluZWRdIEEgY29tbWEgc2VwYXJhdGVkIGxpc3Qgb2ZcbiAqIGxvZyBrZXlzIHRvIGluY2x1ZGUgaW4gdGhlIHByZXR0aWZpZWQgbG9nIGluZm9ybWF0aW9uLiBPbmx5IHRoZSBrZXlzIGluIHRoaXNcbiAqIGxpc3Qgd2lsbCBiZSBpbmNsdWRlZCBpbiB0aGUgb3V0cHV0LlxuICogQHByb3BlcnR5IHtib29sZWFufSBbbGV2ZWxGaXJzdD1mYWxzZV0gV2hlbiB0cnVlLCB0aGUgbG9nIGxldmVsIHdpbGwgYmUgdGhlXG4gKiBmaXJzdCBmaWVsZCBpbiB0aGUgcHJldHRpZmllZCBvdXRwdXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2xldmVsS2V5PSdsZXZlbCddIFRoZSBrZXkgbmFtZSBpbiB0aGUgbG9nIGRhdGEgdGhhdFxuICogY29udGFpbnMgdGhlIGxldmVsIHZhbHVlIGZvciB0aGUgbG9nLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtsZXZlbExhYmVsPSdsZXZlbExhYmVsJ10gVG9rZW4gbmFtZSB0byB1c2UgaW5cbiAqIGBtZXNzYWdlRm9ybWF0YCB0byByZXByZXNlbnQgdGhlIG5hbWUgb2YgdGhlIGxvZ2dlZCBsZXZlbC5cbiAqIEBwcm9wZXJ0eSB7bnVsbHxNZXNzYWdlRm9ybWF0U3RyaW5nfE1lc3NhZ2VGb3JtYXRGdW5jdGlvbn0gW21lc3NhZ2VGb3JtYXQ9bnVsbF1cbiAqIFdoZW4gYSBzdHJpbmcsIGRlZmluZXMgaG93IHRoZSBwcmV0dGlmaWVkIGxpbmUgc2hvdWxkIGJlIGZvcm1hdHRlZCBhY2NvcmRpbmdcbiAqIHRvIGRlZmluZWQgdG9rZW5zLiBXaGVuIGEgZnVuY3Rpb24sIGEgc3luY2hyb25vdXMgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFcbiAqIGZvcm1hdHRlZCBzdHJpbmcuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW21lc3NhZ2VLZXk9J21zZyddIERlZmluZXMgdGhlIGtleSBpbiBpbmNvbWluZyBsb2dzIHRoYXRcbiAqIGNvbnRhaW5zIHRoZSBtZXNzYWdlIG9mIHRoZSBsb2csIGlmIHByZXNlbnQuXG4gKiBAcHJvcGVydHkge3VuZGVmaW5lZHxzdHJpbmd8bnVtYmVyfSBbbWluaW11bUxldmVsPXVuZGVmaW5lZF0gVGhlIG1pbmltdW1cbiAqIGxldmVsIGZvciBsb2dzIHRoYXQgc2hvdWxkIGJlIHByb2Nlc3NlZC4gQW55IGxvZ3MgYmVsb3cgdGhpcyBsZXZlbCB3aWxsXG4gKiBiZSBvbWl0dGVkLlxuICogQHByb3BlcnR5IHtvYmplY3R9IFtvdXRwdXRTdHJlYW09cHJvY2Vzcy5zdGRvdXRdIFRoZSBzdHJlYW0gdG8gd3JpdGVcbiAqIHByZXR0aWZpZWQgbG9nIGxpbmVzIHRvLlxuICogQHByb3BlcnR5IHtib29sZWFufSBbc2luZ2xlTGluZT1mYWxzZV0gV2hlbiBgdHJ1ZWAgYW55IG9iamVjdHMsIGV4Y2VwdCBlcnJvclxuICogb2JqZWN0cywgaW4gdGhlIGxvZyBkYXRhIHdpbGwgYmUgcHJpbnRlZCBhcyBhIHNpbmdsZSBsaW5lIGluc3RlYWQgYXMgbXVsdGlwbGVcbiAqIGxpbmVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFt0aW1lc3RhbXBLZXk9J3RpbWUnXSBEZWZpbmVzIHRoZSBrZXkgaW4gaW5jb21pbmcgbG9nc1xuICogdGhhdCBjb250YWlucyB0aGUgdGltZXN0YW1wIG9mIHRoZSBsb2csIGlmIHByZXNlbnQuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW58c3RyaW5nfSBbdHJhbnNsYXRlVGltZT10cnVlXSBXaGVuIHRydWUsIHdpbGwgdHJhbnNsYXRlIGFcbiAqIEphdmFTY3JpcHQgZGF0ZSBpbnRlZ2VyIGludG8gYSBodW1hbi1yZWFkYWJsZSBzdHJpbmcuIElmIHNldCB0byBhIHN0cmluZyxcbiAqIGl0IG11c3QgYmUgYSBmb3JtYXQgc3RyaW5nLlxuICogQHByb3BlcnR5IHtib29sZWFufSBbdXNlT25seUN1c3RvbVByb3BzPXRydWVdIFdoZW4gdHJ1ZSwgb25seSBjdXN0b20gbGV2ZWxzXG4gKiBhbmQgY29sb3JzIHdpbGwgYmUgdXNlZCBpZiB0aGV5IGhhdmUgYmVlbiBwcm92aWRlZC5cbiAqL1xuXG4vKipcbiAqIFRoZSBkZWZhdWx0IG9wdGlvbnMgdGhhdCB3aWxsIGJlIHVzZWQgd2hlbiBwcmV0dGlmeWluZyBsb2cgbGluZXMuXG4gKlxuICogQHR5cGUge1Bpbm9QcmV0dHlPcHRpb25zfVxuICovXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgY29sb3JpemU6IGlzQ29sb3JTdXBwb3J0ZWQsXG4gIGNvbG9yaXplT2JqZWN0czogdHJ1ZSxcbiAgY3JsZjogZmFsc2UsXG4gIGN1c3RvbUNvbG9yczogbnVsbCxcbiAgY3VzdG9tTGV2ZWxzOiBudWxsLFxuICBjdXN0b21QcmV0dGlmaWVyczoge30sXG4gIGVycm9yTGlrZU9iamVjdEtleXM6IEVSUk9SX0xJS0VfS0VZUyxcbiAgZXJyb3JQcm9wczogJycsXG4gIGhpZGVPYmplY3Q6IGZhbHNlLFxuICBpZ25vcmU6ICdob3N0bmFtZScsXG4gIGluY2x1ZGU6IHVuZGVmaW5lZCxcbiAgbGV2ZWxGaXJzdDogZmFsc2UsXG4gIGxldmVsS2V5OiBMRVZFTF9LRVksXG4gIGxldmVsTGFiZWw6IExFVkVMX0xBQkVMLFxuICBtZXNzYWdlRm9ybWF0OiBudWxsLFxuICBtZXNzYWdlS2V5OiBNRVNTQUdFX0tFWSxcbiAgbWluaW11bUxldmVsOiB1bmRlZmluZWQsXG4gIG91dHB1dFN0cmVhbTogcHJvY2Vzcy5zdGRvdXQsXG4gIHNpbmdsZUxpbmU6IGZhbHNlLFxuICB0aW1lc3RhbXBLZXk6IFRJTUVTVEFNUF9LRVksXG4gIHRyYW5zbGF0ZVRpbWU6IHRydWUsXG4gIHVzZU9ubHlDdXN0b21Qcm9wczogdHJ1ZVxufVxuXG4vKipcbiAqIFByb2Nlc3NlcyB0aGUgc3VwcGxpZWQgb3B0aW9ucyBhbmQgcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyBsb2cgZGF0YVxuICogYW5kIHByb2R1Y2VzIGEgcHJldHRpZmllZCBsb2cgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7UGlub1ByZXR0eU9wdGlvbnN9IG9wdGlvbnMgQ29uZmlndXJhdGlvbiBmb3IgdGhlIHByZXR0aWZpZXIuXG4gKiBAcmV0dXJucyB7TG9nUHJldHRpZmllckZ1bmN9XG4gKi9cbmZ1bmN0aW9uIHByZXR0eUZhY3RvcnkgKG9wdGlvbnMpIHtcbiAgY29uc3QgY29udGV4dCA9IHBhcnNlRmFjdG9yeU9wdGlvbnMoT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpKVxuICByZXR1cm4gcHJldHR5LmJpbmQoeyAuLi5jb250ZXh0LCBjb250ZXh0IH0pXG59XG5cbi8qKlxuICogQHR5cGVkZWYge1Bpbm9QcmV0dHlPcHRpb25zfSBCdWlsZFN0cmVhbU9wdHNcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fG51bWJlcnxzdHJpbmd9IFtkZXN0aW5hdGlvbl0gQSBkZXN0aW5hdGlvbiBzdHJlYW0sIGZpbGVcbiAqIGRlc2NyaXB0b3IsIG9yIHRhcmdldCBwYXRoIHRvIGEgZmlsZS5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2FwcGVuZF1cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW21rZGlyXVxuICogQHByb3BlcnR5IHtib29sZWFufSBbc3luYz1mYWxzZV1cbiAqL1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYSB7QGxpbmsgTG9nUHJldHRpZmllckZ1bmN9IGFuZCBhIHN0cmVhbSB0byB3aGljaCB0aGUgcHJvZHVjZWRcbiAqIHByZXR0aWZpZWQgbG9nIGRhdGEgd2lsbCBiZSB3cml0dGVuLlxuICpcbiAqIEBwYXJhbSB7QnVpbGRTdHJlYW1PcHRzfSBvcHRzXG4gKiBAcmV0dXJucyB7VHJhbnNmb3JtIHwgKFRyYW5zZm9ybSAmIE9uVW5rbm93bil9XG4gKi9cbmZ1bmN0aW9uIGJ1aWxkIChvcHRzID0ge30pIHtcbiAgbGV0IHByZXR0eSA9IHByZXR0eUZhY3Rvcnkob3B0cylcbiAgbGV0IGRlc3RpbmF0aW9uXG4gIHJldHVybiBhYnN0cmFjdFRyYW5zcG9ydChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgc291cmNlLm9uKCdtZXNzYWdlJywgZnVuY3Rpb24gcGlub0NvbmZpZ0xpc3RlbmVyIChtZXNzYWdlKSB7XG4gICAgICBpZiAoIW1lc3NhZ2UgfHwgbWVzc2FnZS5jb2RlICE9PSAnUElOT19DT05GSUcnKSByZXR1cm5cbiAgICAgIE9iamVjdC5hc3NpZ24ob3B0cywge1xuICAgICAgICBtZXNzYWdlS2V5OiBtZXNzYWdlLmNvbmZpZy5tZXNzYWdlS2V5LFxuICAgICAgICBlcnJvckxpa2VPYmplY3RLZXlzOiBBcnJheS5mcm9tKG5ldyBTZXQoWy4uLihvcHRzLmVycm9yTGlrZU9iamVjdEtleXMgfHwgRVJST1JfTElLRV9LRVlTKSwgbWVzc2FnZS5jb25maWcuZXJyb3JLZXldKSksXG4gICAgICAgIGN1c3RvbUxldmVsczogbWVzc2FnZS5jb25maWcubGV2ZWxzLnZhbHVlc1xuICAgICAgfSlcbiAgICAgIHByZXR0eSA9IHByZXR0eUZhY3Rvcnkob3B0cylcbiAgICAgIHNvdXJjZS5vZmYoJ21lc3NhZ2UnLCBwaW5vQ29uZmlnTGlzdGVuZXIpXG4gICAgfSlcbiAgICBjb25zdCBzdHJlYW0gPSBuZXcgVHJhbnNmb3JtKHtcbiAgICAgIG9iamVjdE1vZGU6IHRydWUsXG4gICAgICBhdXRvRGVzdHJveTogdHJ1ZSxcbiAgICAgIHRyYW5zZm9ybSAoY2h1bmssIGVuYywgY2IpIHtcbiAgICAgICAgY29uc3QgbGluZSA9IHByZXR0eShjaHVuaylcbiAgICAgICAgY2IobnVsbCwgbGluZSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKHR5cGVvZiBvcHRzLmRlc3RpbmF0aW9uID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb3B0cy5kZXN0aW5hdGlvbi53cml0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZGVzdGluYXRpb24gPSBvcHRzLmRlc3RpbmF0aW9uXG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc3RpbmF0aW9uID0gYnVpbGRTYWZlU29uaWNCb29tKHtcbiAgICAgICAgZGVzdDogb3B0cy5kZXN0aW5hdGlvbiB8fCAxLFxuICAgICAgICBhcHBlbmQ6IG9wdHMuYXBwZW5kLFxuICAgICAgICBta2Rpcjogb3B0cy5ta2RpcixcbiAgICAgICAgc3luYzogb3B0cy5zeW5jIC8vIGJ5IGRlZmF1bHQgc29uaWMgd2lsbCBiZSBhc3luY1xuICAgICAgfSlcbiAgICB9XG5cbiAgICBzb3VyY2Uub24oJ3Vua25vd24nLCBmdW5jdGlvbiAobGluZSkge1xuICAgICAgZGVzdGluYXRpb24ud3JpdGUobGluZSArICdcXG4nKVxuICAgIH0pXG5cbiAgICBwdW1wKHNvdXJjZSwgc3RyZWFtLCBkZXN0aW5hdGlvbilcbiAgICByZXR1cm4gc3RyZWFtXG4gIH0sIHtcbiAgICBwYXJzZTogJ2xpbmVzJyxcbiAgICBjbG9zZSAoZXJyLCBjYikge1xuICAgICAgZGVzdGluYXRpb24ub24oJ2Nsb3NlJywgKCkgPT4ge1xuICAgICAgICBjYihlcnIpXG4gICAgICB9KVxuICAgIH1cbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidWlsZFxubW9kdWxlLmV4cG9ydHMuYnVpbGQgPSBidWlsZFxubW9kdWxlLmV4cG9ydHMuUGlub1ByZXR0eSA9IGJ1aWxkXG5tb2R1bGUuZXhwb3J0cy5wcmV0dHlGYWN0b3J5ID0gcHJldHR5RmFjdG9yeVxubW9kdWxlLmV4cG9ydHMuY29sb3JpemVyRmFjdG9yeSA9IGNvbG9yc1xubW9kdWxlLmV4cG9ydHMuaXNDb2xvclN1cHBvcnRlZCA9IGlzQ29sb3JTdXBwb3J0ZWRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBidWlsZFxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFFQSxXQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFFNUQsUUFBSSxNQUFNLFVBQVEsS0FBSztBQUV2QixhQUFTLGtCQUFrQixHQUFHO0FBQzVCLFVBQUksS0FBSyxFQUFFLFdBQVksUUFBTztBQUM5QixVQUFJLElBQUksdUJBQU8sT0FBTyxJQUFJO0FBQzFCLFVBQUksR0FBRztBQUNMLGVBQU8sS0FBSyxDQUFDLEVBQUUsUUFBUSxTQUFVLEdBQUc7QUFDbEMsY0FBSSxNQUFNLFdBQVc7QUFDbkIsZ0JBQUksSUFBSSxPQUFPLHlCQUF5QixHQUFHLENBQUM7QUFDNUMsbUJBQU8sZUFBZSxHQUFHLEdBQUcsRUFBRSxNQUFNLElBQUk7QUFBQSxjQUN0QyxZQUFZO0FBQUEsY0FDWixLQUFLLFdBQVk7QUFBRSx1QkFBTyxFQUFFLENBQUM7QUFBQSxjQUFHO0FBQUEsWUFDbEMsQ0FBQztBQUFBLFVBQ0g7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNIO0FBQ0EsUUFBRSxTQUFTLElBQUk7QUFDZixhQUFPLE9BQU8sT0FBTyxDQUFDO0FBQUEsSUFDeEI7QUFFQSxRQUFJLGlCQUE4QixrQ0FBa0IsR0FBRztBQUV2RCxRQUFNO0FBQUEsTUFDSixNQUFNLENBQUM7QUFBQSxNQUNQLE9BQU8sQ0FBQztBQUFBLE1B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LG1CQUFPLE1BQUksV0FBUztBQUFBLFVBQUs7QUFBRSxjQUFJLEtBQUcsU0FBUyxJQUFHO0FBQUMsbUJBQU8sS0FBSyxFQUFFLElBQUUsTUFBTSxFQUFFO0FBQUEsVUFBQztBQUFFLGNBQUksSUFBRSxTQUFTQyxLQUFHO0FBQUMsbUJBQU8sS0FBSyxFQUFFLElBQUUsS0FBSyxFQUFFO0FBQUEsVUFBQztBQUFFLGNBQUksS0FBRyxTQUFTLElBQUc7QUFBQyxtQkFBTyxLQUFLLEVBQUUsSUFBRSxPQUFPLEVBQUU7QUFBQSxVQUFDO0FBQUUsY0FBSSxJQUFFLFNBQVNDLEtBQUc7QUFBQyxtQkFBTyxLQUFLLEVBQUUsSUFBRSxVQUFVLEVBQUU7QUFBQSxVQUFDO0FBQUUsY0FBSSxLQUFHLFNBQVMsSUFBRztBQUFDLG1CQUFPLEtBQUssRUFBRSxJQUFFLE9BQU8sRUFBRTtBQUFBLFVBQUM7QUFBRSxjQUFJLEtBQUcsU0FBUyxJQUFHO0FBQUMsbUJBQU8sS0FBSyxFQUFFLElBQUUsU0FBUyxFQUFFO0FBQUEsVUFBQztBQUFFLGNBQUksS0FBRyxTQUFTLElBQUc7QUFBQyxtQkFBTyxLQUFLLEVBQUUsSUFBRSxTQUFTLEVBQUU7QUFBQSxVQUFDO0FBQUUsY0FBSSxLQUFHLFNBQVMsSUFBRztBQUFDLG1CQUFPLEtBQUssRUFBRSxJQUFFLGNBQWMsRUFBRTtBQUFBLFVBQUM7QUFBRSxjQUFJLEtBQUcsU0FBUyxJQUFHO0FBQUMsbUJBQU8sTUFBSSxJQUFFLEtBQUssa0JBQWtCO0FBQUEsVUFBQztBQUFFLGNBQUksS0FBRyxTQUFTLElBQUc7QUFBQyxtQkFBTyxRQUFRLElBQUk7QUFBQSxVQUFDO0FBQUUsY0FBSSxLQUFHLFNBQVMsSUFBRztBQUFDLG1CQUFPLGFBQWEsSUFBSTtBQUFBLFVBQUM7QUFBRSxjQUFJLFFBQU0sRUFBQyxHQUFFLFNBQVMsSUFBRztBQUFDLG1CQUFPLEdBQUc7QUFBQSxVQUFDLEdBQUUsSUFBRyxTQUFTLEtBQUk7QUFBQyxtQkFBTyxJQUFJLEdBQUcsQ0FBQztBQUFBLFVBQUMsR0FBRSxLQUFJLFNBQVMsTUFBSztBQUFDLG1CQUFPLFdBQVcsS0FBSyxTQUFTLEVBQUUsQ0FBQztBQUFBLFVBQUMsR0FBRSxLQUFJLFNBQVMsTUFBSztBQUFDLG1CQUFPLFdBQVcsRUFBQyxHQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUcsR0FBRSxHQUFFLEdBQUcsR0FBRSxHQUFFLEVBQUUsR0FBRSxTQUFRLFdBQVcsS0FBSyxTQUFTLEVBQUUsQ0FBQyxHQUFFLE9BQU0sS0FBSSxDQUFDO0FBQUEsVUFBQyxHQUFFLE1BQUssU0FBUyxPQUFNO0FBQUMsbUJBQU8sV0FBVyxLQUFLLFNBQVMsRUFBRSxJQUFFLENBQUM7QUFBQSxVQUFDLEdBQUUsTUFBSyxTQUFTLE9BQU07QUFBQyxtQkFBTyxXQUFXLEVBQUMsR0FBRSxFQUFFLEdBQUUsR0FBRSxHQUFHLEdBQUUsR0FBRSxHQUFHLEdBQUUsR0FBRSxFQUFFLEdBQUUsU0FBUSxXQUFXLEtBQUssU0FBUyxFQUFFLElBQUUsQ0FBQyxFQUFDLENBQUM7QUFBQSxVQUFDLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxHQUFHLElBQUU7QUFBQSxVQUFDLEdBQUUsSUFBRyxTQUFTLEtBQUk7QUFBQyxtQkFBTyxJQUFJLEdBQUcsSUFBRSxDQUFDO0FBQUEsVUFBQyxHQUFFLEtBQUksU0FBUyxNQUFLO0FBQUMsbUJBQU8sV0FBVyxLQUFLLFdBQVcsR0FBRyxDQUFDO0FBQUEsVUFBQyxHQUFFLE1BQUssU0FBUyxPQUFNO0FBQUMsbUJBQU8sV0FBVyxLQUFLLFdBQVcsR0FBRyxJQUFFLEVBQUU7QUFBQSxVQUFDLEdBQUUsSUFBRyxTQUFTLEtBQUk7QUFBQyxtQkFBTyxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQztBQUFBLFVBQUMsR0FBRSxNQUFLLFNBQVMsT0FBTTtBQUFDLG1CQUFPLElBQUksRUFBRSxHQUFFLENBQUM7QUFBQSxVQUFDLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxHQUFHLElBQUUsTUFBSTtBQUFBLFVBQUUsR0FBRSxJQUFHLFNBQVMsS0FBSTtBQUFDLG1CQUFPLElBQUksR0FBRyxJQUFFLE1BQUksRUFBRTtBQUFBLFVBQUMsR0FBRSxHQUFFLFNBQVMsSUFBRztBQUFDLG1CQUFPLEdBQUc7QUFBQSxVQUFDLEdBQUUsSUFBRyxTQUFTLEtBQUk7QUFBQyxtQkFBTyxJQUFJLEdBQUcsQ0FBQztBQUFBLFVBQUMsR0FBRSxHQUFFLFNBQVMsSUFBRztBQUFDLG1CQUFPLEdBQUc7QUFBQSxVQUFDLEdBQUUsSUFBRyxTQUFTLEtBQUk7QUFBQyxtQkFBTyxJQUFJLEdBQUcsQ0FBQztBQUFBLFVBQUMsR0FBRSxHQUFFLFNBQVMsSUFBRztBQUFDLG1CQUFPLEdBQUc7QUFBQSxVQUFDLEdBQUUsSUFBRyxTQUFTLEtBQUk7QUFBQyxtQkFBTyxJQUFJLEdBQUcsQ0FBQztBQUFBLFVBQUMsR0FBRSxHQUFFLFNBQVMsSUFBRztBQUFDLG1CQUFPLElBQUksR0FBRyxHQUFFLENBQUM7QUFBQSxVQUFDLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxJQUFJLEtBQUssTUFBTSxHQUFHLElBQUUsRUFBRSxDQUFDO0FBQUEsVUFBQyxHQUFFLEdBQUUsU0FBUyxJQUFHO0FBQUMsbUJBQU8sR0FBRyxJQUFFLEtBQUcsV0FBVyxLQUFLLFVBQVUsQ0FBQyxJQUFFLFdBQVcsS0FBSyxVQUFVLENBQUM7QUFBQSxVQUFDLEdBQUUsSUFBRyxTQUFTLEtBQUk7QUFBQyxtQkFBTyxHQUFHLElBQUUsS0FBRyxXQUFXLEtBQUssVUFBVSxDQUFDLElBQUUsV0FBVyxLQUFLLFVBQVUsQ0FBQztBQUFBLFVBQUMsR0FBRSxHQUFFLFNBQVMsSUFBRztBQUFDLG1CQUFPLEdBQUcsSUFBRSxLQUFHLFdBQVcsS0FBSyxVQUFVLENBQUMsSUFBRSxXQUFXLEtBQUssVUFBVSxDQUFDO0FBQUEsVUFBQyxHQUFFLElBQUcsU0FBUyxLQUFJO0FBQUMsbUJBQU8sR0FBRyxJQUFFLEtBQUcsV0FBVyxLQUFLLFVBQVUsQ0FBQyxJQUFFLFdBQVcsS0FBSyxVQUFVLENBQUM7QUFBQSxVQUFDLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxNQUFJLFFBQU0sTUFBSSxTQUFPLE9BQU8sSUFBSSxFQUFFLE1BQU0sUUFBUSxLQUFHLENBQUMsRUFBRSxHQUFHLElBQUksRUFBRSxRQUFRLGNBQWEsRUFBRSxFQUFFLFFBQVEsY0FBYSxLQUFLO0FBQUEsVUFBQyxHQUFFLEdBQUUsU0FBUyxJQUFHO0FBQUMsb0JBQU8sR0FBRyxJQUFFLElBQUUsTUFBSSxPQUFLLElBQUksS0FBSyxNQUFNLEtBQUssSUFBSSxHQUFHLENBQUMsSUFBRSxFQUFFLElBQUUsTUFBSSxLQUFLLElBQUksR0FBRyxDQUFDLElBQUUsSUFBRyxDQUFDO0FBQUEsVUFBQyxHQUFFLEdBQUUsU0FBUyxJQUFHO0FBQUMsb0JBQU8sR0FBRyxJQUFFLElBQUUsTUFBSSxPQUFLLElBQUksS0FBSyxNQUFNLEtBQUssSUFBSSxHQUFHLENBQUMsSUFBRSxFQUFFLEdBQUUsQ0FBQyxJQUFFLE1BQUksSUFBSSxLQUFLLE1BQU0sS0FBSyxJQUFJLEdBQUcsQ0FBQyxJQUFFLEVBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxHQUFFLEdBQUUsU0FBUyxJQUFHO0FBQUMsbUJBQU0sQ0FBQyxNQUFLLE1BQUssTUFBSyxJQUFJLEVBQUUsR0FBRyxJQUFFLEtBQUcsSUFBRSxLQUFHLEdBQUcsSUFBRSxNQUFJLEdBQUcsSUFBRSxNQUFJLE1BQUksR0FBRyxJQUFFLEVBQUU7QUFBQSxVQUFDLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxHQUFHO0FBQUEsVUFBQyxHQUFFLElBQUcsU0FBUyxLQUFJO0FBQUMsbUJBQU8sSUFBSSxHQUFHLENBQUM7QUFBQSxVQUFDLEdBQUUsR0FBRSxTQUFTLElBQUc7QUFBQyxtQkFBTyxHQUFHO0FBQUEsVUFBQyxFQUFDO0FBQUUsaUJBQU8sS0FBSyxRQUFRLE9BQU0sU0FBUyxPQUFNO0FBQUMsZ0JBQUcsU0FBUyxPQUFNO0FBQUMscUJBQU8sTUFBTSxLQUFLLEVBQUU7QUFBQSxZQUFDO0FBQUMsbUJBQU8sTUFBTSxN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QUM7QUFBQSxRQUNIO0FBRUEsZUFBTyxHQUFHLFdBQVcsU0FBVSxNQUFNO0FBQ25DLHNCQUFZLE1BQU0sT0FBTyxJQUFJO0FBQUEsUUFDL0IsQ0FBQztBQUVELGFBQUssUUFBUSxRQUFRLFdBQVc7QUFDaEMsZUFBTztBQUFBLE1BQ1QsR0FBRztBQUFBLFFBQ0QsT0FBTztBQUFBLFFBQ1AsTUFBTyxLQUFLLElBQUk7QUFDZCxzQkFBWSxHQUFHLFNBQVMsTUFBTTtBQUM1QixlQUFHLEdBQUc7QUFBQSxVQUNSLENBQUM7QUFBQSxRQUNIO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUVBLFdBQU8sVUFBVTtBQUNqQixXQUFPLFFBQVEsUUFBUTtBQUN2QixXQUFPLFFBQVEsYUFBYTtBQUM1QixXQUFPLFFBQVEsZ0JBQWdCO0FBQy9CLFdBQU8sUUFBUSxtQkFBbUI7QUFDbEMsV0FBTyxRQUFRLG1CQUFtQjtBQUNsQyxXQUFPLFFBQVEsVUFBVTtBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbImNvbG9ycyIsICJjYiIsICJlcnIiLCAibiIsICJyZWxlYXNlZEJ1Zk9iaiIsICJjb3B5IiwgIl90eXBlb2YiLCAib2JqIiwgImdsb2JhbCIsICJfIiwgIkQiLCAieSIsICJwYWQiLCAiZ2V0RGF5TmFtZSIsICJ0b2RheV9kIiwgInRvZGF5X20iLCAidG9kYXlfeSIsICJ5ZXN0ZXJkYXlfZCIsICJ5ZXN0ZXJkYXlfbSIsICJ5ZXN0ZXJkYXlfeSIsICJ0b21vcnJvd19kIiwgInRvbW9ycm93X20iLCAidG9tb3Jyb3dfeSIsICJnZXRXZWVrIiwgImdldERheU9mV2VlayIsICJraW5kT2YiLCAicGxhaW4iLCAiZXJyb3JzIiwgInByZXR0eSJdCn0K
