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

// ../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/err-helpers.js
var require_err_helpers = __commonJS({
  "../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/err-helpers.js"(exports, module) {
    "use strict";
    var isErrorLike = (err) => {
      return err && typeof err.message === "string";
    };
    var getErrorCause = (err) => {
      if (!err) return;
      const cause = err.cause;
      if (typeof cause === "function") {
        const causeResult = err.cause();
        return isErrorLike(causeResult) ? causeResult : void 0;
      } else {
        return isErrorLike(cause) ? cause : void 0;
      }
    };
    var _stackWithCauses = (err, seen) => {
      if (!isErrorLike(err)) return "";
      const stack = err.stack || "";
      if (seen.has(err)) {
        return stack + "\ncauses have become circular...";
      }
      const cause = getErrorCause(err);
      if (cause) {
        seen.add(err);
        return stack + "\ncaused by: " + _stackWithCauses(cause, seen);
      } else {
        return stack;
      }
    };
    var stackWithCauses = (err) => _stackWithCauses(err, /* @__PURE__ */ new Set());
    var _messageWithCauses = (err, seen, skip) => {
      if (!isErrorLike(err)) return "";
      const message = skip ? "" : err.message || "";
      if (seen.has(err)) {
        return message + ": ...";
      }
      const cause = getErrorCause(err);
      if (cause) {
        seen.add(err);
        const skipIfVErrorStyleCause = typeof err.cause === "function";
        return message + (skipIfVErrorStyleCause ? "" : ": ") + _messageWithCauses(cause, seen, skipIfVErrorStyleCause);
      } else {
        return message;
      }
    };
    var messageWithCauses = (err) => _messageWithCauses(err, /* @__PURE__ */ new Set());
    module.exports = {
      isErrorLike,
      getErrorCause,
      stackWithCauses,
      messageWithCauses
    };
  }
});

// ../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/err-proto.js
var require_err_proto = __commonJS({
  "../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/err-proto.js"(exports, module) {
    "use strict";
    var seen = /* @__PURE__ */ Symbol("circular-ref-tag");
    var rawSymbol = /* @__PURE__ */ Symbol("pino-raw-err-ref");
    var pinoErrProto = Object.create({}, {
      type: {
        enumerable: true,
        writable: true,
        value: void 0
      },
      message: {
        enumerable: true,
        writable: true,
        value: void 0
      },
      stack: {
        enumerable: true,
        writable: true,
        value: void 0
      },
      aggregateErrors: {
        enumerable: true,
        writable: true,
        value: void 0
      },
      raw: {
        enumerable: false,
        get: function() {
          return this[rawSymbol];
        },
        set: function(val) {
          this[rawSymbol] = val;
        }
      }
    });
    Object.defineProperty(pinoErrProto, rawSymbol, {
      writable: true,
      value: {}
    });
    module.exports = {
      pinoErrProto,
      pinoErrorSymbols: {
        seen,
        rawSymbol
      }
    };
  }
});

// ../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/err.js
var require_err = __commonJS({
  "../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/err.js"(exports, module) {
    "use strict";
    module.exports = errSerializer;
    var { messageWithCauses, stackWithCauses, isErrorLike } = require_err_helpers();
    var { pinoErrProto, pinoErrorSymbols } = require_err_proto();
    var { seen } = pinoErrorSymbols;
    var { toString } = Object.prototype;
    function errSerializer(err) {
      if (!isErrorLike(err)) {
        return err;
      }
      err[seen] = void 0;
      const _err = Object.create(pinoErrProto);
      _err.type = toString.call(err.constructor) === "[object Function]" ? err.constructor.name : err.name;
      _err.message = messageWithCauses(err);
      _err.stack = stackWithCauses(err);
      if (Array.isArray(err.errors)) {
        _err.aggregateErrors = err.errors.map((err2) => errSerializer(err2));
      }
      for (const key in err) {
        if (_err[key] === void 0) {
          const val = err[key];
          if (isErrorLike(val)) {
            if (key !== "cause" && !Object.prototype.hasOwnProperty.call(val, seen)) {
              _err[key] = errSerializer(val);
            }
          } else {
            _err[key] = val;
          }
        }
      }
      delete err[seen];
      _err.raw = err;
      return _err;
    }
  }
});

// ../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/err-with-cause.js
var require_err_with_cause = __commonJS({
  "../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/err-with-cause.js"(exports, module) {
    "use strict";
    module.exports = errWithCauseSerializer;
    var { isErrorLike } = require_err_helpers();
    var { pinoErrProto, pinoErrorSymbols } = require_err_proto();
    var { seen } = pinoErrorSymbols;
    var { toString } = Object.prototype;
    function errWithCauseSerializer(err) {
      if (!isErrorLike(err)) {
        return err;
      }
      err[seen] = void 0;
      const _err = Object.create(pinoErrProto);
      _err.type = toString.call(err.constructor) === "[object Function]" ? err.constructor.name : err.name;
      _err.message = err.message;
      _err.stack = err.stack;
      if (Array.isArray(err.errors)) {
        _err.aggregateErrors = err.errors.map((err2) => errWithCauseSerializer(err2));
      }
      if (isErrorLike(err.cause) && !Object.prototype.hasOwnProperty.call(err.cause, seen)) {
        _err.cause = errWithCauseSerializer(err.cause);
      }
      for (const key in err) {
        if (_err[key] === void 0) {
          const val = err[key];
          if (isErrorLike(val)) {
            if (!Object.prototype.hasOwnProperty.call(val, seen)) {
              _err[key] = errWithCauseSerializer(val);
            }
          } else {
            _err[key] = val;
          }
        }
      }
      delete err[seen];
      _err.raw = err;
      return _err;
    }
  }
});

// ../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/req.js
var require_req = __commonJS({
  "../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/req.js"(exports, module) {
    "use strict";
    module.exports = {
      mapHttpRequest,
      reqSerializer
    };
    var rawSymbol = /* @__PURE__ */ Symbol("pino-raw-req-ref");
    var pinoReqProto = Object.create({}, {
      id: {
        enumerable: true,
        writable: true,
        value: ""
      },
      method: {
        enumerable: true,
        writable: true,
        value: ""
      },
      url: {
        enumerable: true,
        writable: true,
        value: ""
      },
      query: {
        enumerable: true,
        writable: true,
        value: ""
      },
      params: {
        enumerable: true,
        writable: true,
        value: ""
      },
      headers: {
        enumerable: true,
        writable: true,
        value: {}
      },
      remoteAddress: {
        enumerable: true,
        writable: true,
        value: ""
      },
      remotePort: {
        enumerable: true,
        writable: true,
        value: ""
      },
      raw: {
        enumerable: false,
        get: function() {
          return this[rawSymbol];
        },
        set: function(val) {
          this[rawSymbol] = val;
        }
      }
    });
    Object.defineProperty(pinoReqProto, rawSymbol, {
      writable: true,
      value: {}
    });
    function reqSerializer(req) {
      const connection = req.info || req.socket;
      const _req = Object.create(pinoReqProto);
      _req.id = typeof req.id === "function" ? req.id() : req.id || (req.info ? req.info.id : void 0);
      _req.method = req.method;
      if (req.originalUrl) {
        _req.url = req.originalUrl;
      } else {
        const path = req.path;
        _req.url = typeof path === "string" ? path : req.url ? req.url.path || req.url : void 0;
      }
      if (req.query) {
        _req.query = req.query;
      }
      if (req.params) {
        _req.params = req.params;
      }
      _req.headers = req.headers;
      _req.remoteAddress = connection && connection.remoteAddress;
      _req.remotePort = connection && connection.remotePort;
      _req.raw = req.raw || req;
      return _req;
    }
    function mapHttpRequest(req) {
      return {
        req: reqSerializer(req)
      };
    }
  }
});

// ../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/res.js
var require_res = __commonJS({
  "../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/res.js"(exports, module) {
    "use strict";
    module.exports = {
      mapHttpResponse,
      resSerializer
    };
    var rawSymbol = /* @__PURE__ */ Symbol("pino-raw-res-ref");
    var pinoResProto = Object.create({}, {
      statusCode: {
        enumerable: true,
        writable: true,
        value: 0
      },
      headers: {
        enumerable: true,
        writable: true,
        value: ""
      },
      raw: {
        enumerable: false,
        get: function() {
          return this[rawSymbol];
        },
        set: function(val) {
          this[rawSymbol] = val;
        }
      }
    });
    Object.defineProperty(pinoResProto, rawSymbol, {
      writable: true,
      value: {}
    });
    function resSerializer(res) {
      const _res = Object.create(pinoResProto);
      _res.statusCode = res.headersSent ? res.statusCode : null;
      _res.headers = res.getHeaders ? res.getHeaders() : res._headers;
      _res.raw = res;
      return _res;
    }
    function mapHttpResponse(res) {
      return {
        res: resSerializer(res)
      };
    }
  }
});

// ../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/index.js
var require_pino_std_serializers = __commonJS({
  "../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/index.js"(exports, module) {
    "use strict";
    var errSerializer = require_err();
    var errWithCauseSerializer = require_err_with_cause();
    var reqSerializers = require_req();
    var resSerializers = require_res();
    module.exports = {
      err: errSerializer,
      errWithCause: errWithCauseSerializer,
      mapHttpRequest: reqSerializers.mapHttpRequest,
      mapHttpResponse: resSerializers.mapHttpResponse,
      req: reqSerializers.reqSerializer,
      res: resSerializers.resSerializer,
      wrapErrorSerializer: function wrapErrorSerializer(customSerializer) {
        if (customSerializer === errSerializer) return customSerializer;
        return function wrapErrSerializer(err) {
          return customSerializer(errSerializer(err));
        };
      },
      wrapRequestSerializer: function wrapRequestSerializer(customSerializer) {
        if (customSerializer === reqSerializers.reqSerializer) return customSerializer;
        return function wrappedReqSerializer(req) {
          return customSerializer(reqSerializers.reqSerializer(req));
        };
      },
      wrapResponseSerializer: function wrapResponseSerializer(customSerializer) {
        if (customSerializer === resSerializers.resSerializer) return customSerializer;
        return function wrappedResSerializer(res) {
          return customSerializer(resSerializers.resSerializer(res));
        };
      }
    };
  }
});

// ../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/caller.js
var require_caller = __commonJS({
  "../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/caller.js"(exports, module) {
    "use strict";
    function noOpPrepareStackTrace(_, stack) {
      return stack;
    }
    module.exports = function getCallers() {
      const originalPrepare = Error.prepareStackTrace;
      Error.prepareStackTrace = noOpPrepareStackTrace;
      const stack = new Error().stack;
      Error.prepareStackTrace = originalPrepare;
      if (!Array.isArray(stack)) {
        return void 0;
      }
      const entries = stack.slice(2);
      const fileNames = [];
      for (const entry of entries) {
        if (!entry) {
          continue;
        }
        fileNames.push(entry.getFileName());
      }
      return fileNames;
    };
  }
});

// ../../node_modules/.pnpm/@pinojs+redact@0.4.0/node_modules/@pinojs/redact/index.js
var require_redact = __commonJS({
  "../../node_modules/.pnpm/@pinojs+redact@0.4.0/node_modules/@pinojs/redact/index.js"(exports, module) {
    "use strict";
    function deepClone(obj) {
      if (obj === null || typeof obj !== "object") {
        return obj;
      }
      if (obj instanceof Date) {
        return new Date(obj.getTime());
      }
      if (obj instanceof Array) {
        const cloned = [];
        for (let i = 0; i < obj.length; i++) {
          cloned[i] = deepClone(obj[i]);
        }
        return cloned;
      }
      if (typeof obj === "object") {
        const cloned = Object.create(Object.getPrototypeOf(obj));
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            cloned[key] = deepClone(obj[key]);
          }
        }
        return cloned;
      }
      return obj;
    }
    function parsePath(path) {
      const parts = [];
      let current = "";
      let inBrackets = false;
      let inQuotes = false;
      let quoteChar = "";
      for (let i = 0; i < path.length; i++) {
        const char = path[i];
        if (!inBrackets && char === ".") {
          if (current) {
            parts.push(current);
            current = "";
          }
        } else if (char === "[") {
          if (current) {
            parts.push(current);
            current = "";
          }
          inBrackets = true;
        } else if (char === "]" && inBrackets) {
          parts.push(current);
          current = "";
          inBrackets = false;
          inQuotes = false;
        } else if ((char === '"' || char === "'") && inBrackets) {
          if (!inQuotes) {
            inQuotes = true;
            quoteChar = char;
          } else if (char === quoteChar) {
            inQuotes = false;
            quoteChar = "";
          } else {
            current += char;
          }
        } else {
          current += char;
        }
      }
      if (current) {
        parts.push(current);
      }
      return parts;
    }
    function setValue(obj, parts, value) {
      let current = obj;
      for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i];
        if (typeof current !== "object" || current === null || !(key in current)) {
          return false;
        }
        if (typeof current[key] !== "object" || current[key] === null) {
          return false;
        }
        current = current[key];
      }
      const lastKey = parts[parts.length - 1];
      if (lastKey === "*") {
        if (Array.isArray(current)) {
          for (let i = 0; i < current.length; i++) {
            current[i] = value;
          }
        } else if (typeof current === "object" && current !== null) {
          for (const key in current) {
            if (Object.prototype.hasOwnProperty.call(current, key)) {
              current[key] = value;
            }
          }
        }
      } else {
        if (typeof current === "object" && current !== null && lastKey in current && Object.prototype.hasOwnProperty.call(current, lastKey)) {
          current[lastKey] = value;
        }
      }
      return true;
    }
    function removeKey(obj, parts) {
      let current = obj;
      for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i];
        if (typeof current !== "object" || current === null || !(key in current)) {
          return false;
        }
        if (typeof current[key] !== "object" || current[key] === null) {
          return false;
        }
        current = current[key];
      }
      const lastKey = parts[parts.length - 1];
      if (lastKey === "*") {
        if (Array.isArray(current)) {
          for (let i = 0; i < current.length; i++) {
            current[i] = void 0;
          }
        } else if (typeof current === "object" && current !== null) {
          for (const key in current) {
            if (Object.prototype.hasOwnProperty.call(current, key)) {
              delete current[key];
            }
          }
        }
      } else {
        if (typeof current === "object" && current !== null && lastKey in current && Object.prototype.hasOwnProperty.call(current, lastKey)) {
          delete current[lastKey];
        }
      }
      return true;
    }
    var PATH_NOT_FOUND = /* @__PURE__ */ Symbol("PATH_NOT_FOUND");
    function getValueIfExists(obj, parts) {
      let current = obj;
      for (const part of parts) {
        if (current === null || current === void 0) {
          return PATH_NOT_FOUND;
        }
        if (typeof current !== "object" || current === null) {
          return PATH_NOT_FOUND;
        }
        if (!(part in current)) {
          return PATH_NOT_FOUND;
        }
        current = current[part];
      }
      return current;
    }
    function getValue(obj, parts) {
      let current = obj;
      for (const part of parts) {
        if (current === null || current === void 0) {
          return void 0;
        }
        if (typeof current !== "object" || current === null) {
          return void 0;
        }
        current = current[part];
      }
      return current;
    }
    function redactPaths(obj, paths, censor, remove = false) {
      for (const path of paths) {
        const parts = parsePath(path);
        if (parts.includes("*")) {
          redactWildcardPath(obj, parts, censor, path, remove);
        } else {
          if (remove) {
            removeKey(obj, parts);
          } else {
            const value = getValueIfExists(obj, parts);
            if (value === PATH_NOT_FOUND) {
              continue;
            }
            const actualCensor = typeof censor === "function" ? censor(value, parts) : censor;
            setValue(obj, parts, actualCensor);
          }
        }
      }
    }
    function redactWildcardPath(obj, parts, censor, originalPath, remove = false) {
      const wildcardIndex = parts.indexOf("*");
      if (wildcardIndex === parts.length - 1) {
        const parentParts = parts.slice(0, -1);
        let current = obj;
        for (const part of parentParts) {
          if (current === null || current === void 0) return;
          if (typeof current !== "object" || current === null) return;
          current = current[part];
        }
        if (Array.isArray(current)) {
          if (remove) {
            for (let i = 0; i < current.length; i++) {
              current[i] = void 0;
            }
          } else {
            for (let i = 0; i < current.length; i++) {
              const indexPath = [...parentParts, i.toString()];
              const actualCensor = typeof censor === "function" ? censor(current[i], indexPath) : censor;
              current[i] = actualCensor;
            }
          }
        } else if (typeof current === "object" && current !== null) {
          if (remove) {
            const keysToDelete = [];
            for (const key in current) {
              if (Object.prototype.hasOwnProperty.call(current, key)) {
                keysToDelete.push(key);
              }
            }
            for (const key of keysToDelete) {
              delete current[key];
            }
          } else {
            for (const key in current) {
              const keyPath = [...parentParts, key];
              const actualCensor = typeof censor === "function" ? censor(current[key], keyPath) : censor;
              current[key] = actualCensor;
            }
          }
        }
      } else {
        redactIntermediateWildcard(obj, parts, censor, wildcardIndex, originalPath, remove);
      }
    }
    function redactIntermediateWildcard(obj, parts, censor, wildcardIndex, originalPath, remove = false) {
      const beforeWildcard = parts.slice(0, wildcardIndex);
      const afterWildcard = parts.slice(wildcardIndex + 1);
      const pathArray = [];
      function traverse(current, pathLength) {
        if (pathLength === beforeWildcard.length) {
          if (Array.isArray(current)) {
            for (let i = 0; i < current.length; i++) {
              pathArray[pathLength] = i.toString();
              traverse(current[i], pathLength + 1);
            }
          } else if (typeof current === "object" && current !== null) {
            for (const key in current) {
              pathArray[pathLength] = key;
              traverse(current[key], pathLength + 1);
            }
          }
        } else if (pathLength < beforeWildcard.length) {
          const nextKey = beforeWildcard[pathLength];
          if (current && typeof current === "object" && current !== null && nextKey in current) {
            pathArray[pathLength] = nextKey;
            traverse(current[nextKey], pathLength + 1);
          }
        } else {
          if (afterWildcard.includes("*")) {
            const wrappedCensor = typeof censor === "function" ? (value, path) => {
              const fullPath = [...pathArray.slice(0, pathLength), ...path];
              return censor(value, fullPath);
            } : censor;
            redactWildcardPath(current, afterWildcard, wrappedCensor, originalPath, remove);
          } else {
            if (remove) {
              removeKey(current, afterWildcard);
            } else {
              const actualCensor = typeof censor === "function" ? censor(getValue(current, afterWildcard), [...pathArray.slice(0, pathLength), ...afterWildcard]) : censor;
              setValue(current, afterWildcard, actualCensor);
            }
          }
        }
      }
      if (beforeWildcard.length === 0) {
        traverse(obj, 0);
      } else {
        let current = obj;
        for (let i = 0; i < beforeWildcard.length; i++) {
          const part = beforeWildcard[i];
          if (current === null || current === void 0) return;
          if (typeof current !== "object" || current === null) return;
          current = current[part];
          pathArray[i] = part;
        }
        if (current !== null && current !== void 0) {
          traverse(current, beforeWildcard.length);
        }
      }
    }
    function buildPathStructure(pathsToClone) {
      if (pathsToClone.length === 0) {
        return null;
      }
      const pathStructure = /* @__PURE__ */ new Map();
      for (const path of pathsToClone) {
        const parts = parsePath(path);
        let current = pathStructure;
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          if (!current.has(part)) {
            current.set(part, /* @__PURE__ */ new Map());
          }
          current = current.get(part);
        }
      }
      return pathStructure;
    }
    function selectiveClone(obj, pathStructure) {
      if (!pathStructure) {
        return obj;
      }
      function cloneSelectively(source, pathMap, depth = 0) {
        if (!pathMap || pathMap.size === 0) {
          return source;
        }
        if (source === null || typeof source !== "object") {
          return source;
        }
        if (source instanceof Date) {
          return new Date(source.getTime());
        }
        if (Array.isArray(source)) {
          const cloned2 = [];
          for (let i = 0; i < source.length; i++) {
            const indexStr = i.toString();
            if (pathMap.has(indexStr) || pathMap.has("*")) {
              cloned2[i] = cloneSelectively(source[i], pathMap.get(indexStr) || pathMap.get("*"));
            } else {
              cloned2[i] = source[i];
            }
          }
          return cloned2;
        }
        const cloned = Object.create(Object.getPrototypeOf(source));
        for (const key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (pathMap.has(key) || pathMap.has("*")) {
              cloned[key] = cloneSelectively(source[key], pathMap.get(key) || pathMap.get("*"));
            } else {
              cloned[key] = source[key];
            }
          }
        }
        return cloned;
      }
      return cloneSelectively(obj, pathStructure);
    }
    function validatePath(path) {
      if (typeof path !== "string") {
        throw new Error("Paths must be (non-empty) strings");
      }
      if (path === "") {
        throw new Error("Invalid redaction path ()");
      }
      if (path.includes("..")) {
        throw new Error(`Invalid redaction path (${path})`);
      }
      if (path.includes(",")) {
        throw new Error(`Invalid redaction path (${path})`);
      }
      let bracketCount = 0;
      let inQuotes = false;
      let quoteChar = "";
      for (let i = 0; i < path.length; i++) {
        const char = path[i];
        if ((char === '"' || char === "'") && bracketCount > 0) {
          if (!inQuotes) {
            inQuotes = true;
            quoteChar = char;
          } else if (char === quoteChar) {
            inQuotes = false;
            quoteChar = "";
          }
        } else if (char === "[" && !inQuotes) {
          bracketCount++;
        } else if (char === "]" && !inQuotes) {
          bracketCount--;
          if (bracketCount < 0) {
            throw new Error(`Invalid redaction path (${path})`);
          }
        }
      }
      if (bracketCount !== 0) {
        throw new Error(`Invalid redaction path (${path})`);
      }
    }
    function validatePaths(paths) {
      if (!Array.isArray(paths)) {
        throw new TypeError("paths must be an array");
      }
      for (const path of paths) {
        validatePath(path);
      }
    }
    function slowRedact(options = {}) {
      const {
        paths = [],
        censor = "[REDACTED]",
        serialize = JSON.stringify,
        strict = true,
        remove = false
      } = options;
      validatePaths(paths);
      const pathStructure = buildPathStructure(paths);
      return function redact(obj) {
        if (strict && (obj === null || typeof obj !== "object")) {
          if (obj === null || obj === void 0) {
            return serialize ? serialize(obj) : obj;
          }
          if (typeof obj !== "object") {
            return serialize ? serialize(obj) : obj;
          }
        }
        const cloned = selectiveClone(obj, pathStructure);
        const original = obj;
        let actualCensor = censor;
        if (typeof censor === "function") {
          actualCensor = censor;
        }
        redactPaths(cloned, paths, actualCensor, remove);
        if (serialize === false) {
          cloned.restore = function() {
            return deepClone(original);
          };
          return cloned;
        }
        if (typeof serialize === "function") {
          return serialize(cloned);
        }
        return JSON.stringify(cloned);
      };
    }
    module.exports = slowRedact;
  }
});

// ../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/symbols.js
var require_symbols = __commonJS({
  "../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/symbols.js"(exports, module) {
    "use strict";
    var setLevelSym = /* @__PURE__ */ Symbol("pino.setLevel");
    var getLevelSym = /* @__PURE__ */ Symbol("pino.getLevel");
    var levelValSym = /* @__PURE__ */ Symbol("pino.levelVal");
    var levelCompSym = /* @__PURE__ */ Symbol("pino.levelComp");
    var useLevelLabelsSym = /* @__PURE__ */ Symbol("pino.useLevelLabels");
    var useOnlyCustomLevelsSym = /* @__PURE__ */ Symbol("pino.useOnlyCustomLevels");
    var mixinSym = /* @__PURE__ */ Symbol("pino.mixin");
    var lsCacheSym = /* @__PURE__ */ Symbol("pino.lsCache");
    var chindingsSym = /* @__PURE__ */ Symbol("pino.chindings");
    var asJsonSym = /* @__PURE__ */ Symbol("pino.asJson");
    var writeSym = /* @__PURE__ */ Symbol("pino.write");
    var redactFmtSym = /* @__PURE__ */ Symbol("pino.redactFmt");
    var timeSym = /* @__PURE__ */ Symbol("pino.time");
    var timeSliceIndexSym = /* @__PURE__ */ Symbol("pino.timeSliceIndex");
    var streamSym = /* @__PURE__ */ Symbol("pino.stream");
    var stringifySym = /* @__PURE__ */ Symbol("pino.stringify");
    var stringifySafeSym = /* @__PURE__ */ Symbol("pino.stringifySafe");
    var stringifiersSym = /* @__PURE__ */ Symbol("pino.stringifiers");
    var endSym = /* @__PURE__ */ Symbol("pino.end");
    var formatOptsSym = /* @__PURE__ */ Symbol("pino.formatOpts");
    var messageKeySym = /* @__PURE__ */ Symbol("pino.messageKey");
    var errorKeySym = /* @__PURE__ */ Symbol("pino.errorKey");
    var nestedKeySym = /* @__PURE__ */ Symbol("pino.nestedKey");
    var nestedKeyStrSym = /* @__PURE__ */ Symbol("pino.nestedKeyStr");
    var mixinMergeStrategySym = /* @__PURE__ */ Symbol("pino.mixinMergeStrategy");
    var msgPrefixSym = /* @__PURE__ */ Symbol("pino.msgPrefix");
    var wildcardFirstSym = /* @__PURE__ */ Symbol("pino.wildcardFirst");
    var serializersSym = /* @__PURE__ */ Symbol.for("pino.serializers");
    var formattersSym = /* @__PURE__ */ Symbol.for("pino.formatters");
    var hooksSym = /* @__PURE__ */ Symbol.for("pino.hooks");
    var needsMetadataGsym = /* @__PURE__ */ Symbol.for("pino.metadata");
    module.exports = {
      setLevelSym,
      getLevelSym,
      levelValSym,
      levelCompSym,
      useLevelLabelsSym,
      mixinSym,
      lsCacheSym,
      chindingsSym,
      asJsonSym,
      writeSym,
      serializersSym,
      redactFmtSym,
      timeSym,
      timeSliceIndexSym,
      streamSym,
      stringifySym,
      stringifySafeSym,
      stringifiersSym,
      endSym,
      formatOptsSym,
      messageKeySym,
      errorKeySym,
      nestedKeySym,
      wildcardFirstSym,
      needsMetadataGsym,
      useOnlyCustomLevelsSym,
      formattersSym,
      hooksSym,
      nestedKeyStrSym,
      mixinMergeStrategySym,
      msgPrefixSym
    };
  }
});

// ../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/redaction.js
var require_redaction = __commonJS({
  "../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/redaction.js"(exports, module) {
    "use strict";
    var Redact = require_redact();
    var { redactFmtSym, wildcardFirstSym } = require_symbols();
    var rx = /[^.[\]]+|\[([^[\]]*?)\]/g;
    var CENSOR = "[Redacted]";
    var strict = false;
    function redaction(opts, serialize) {
      const { paths, censor, remove } = handle(opts);
      const shape = paths.reduce((o, str) => {
        rx.lastIndex = 0;
        const first = rx.exec(str);
        const next = rx.exec(str);
        let ns = first[1] !== void 0 ? first[1].replace(/^(?:"|'|`)(.*)(?:"|'|`)$/, "$1") : first[0];
        if (ns === "*") {
          ns = wildcardFirstSym;
        }
        if (next === null) {
          o[ns] = null;
          return o;
        }
        if (o[ns] === null) {
          return o;
        }
        const { index } = next;
        const nextPath = `${str.substr(index, str.length - 1)}`;
        o[ns] = o[ns] || [];
        if (ns !== wildcardFirstSym && o[ns].length === 0) {
          o[ns].push(...o[wildcardFirstSym] || []);
        }
        if (ns === wildcardFirstSym) {
          Object.keys(o).forEach(function(k) {
            if (o[k]) {
              o[k].push(nextPath);
            }
          });
        }
        o[ns].push(nextPath);
        return o;
      }, {});
      const result = {
        [redactFmtSym]: Redact({ paths, censor, serialize, strict, remove })
      };
      const topCensor = (...args) => {
        return typeof censor === "function" ? serialize(censor(...args)) : serialize(censor);
      };
      return [...Object.keys(shape), ...Object.getOwnPropertySymbols(shape)].reduce((o, k) => {
        if (shape[k] === null) {
          o[k] = (value) => topCensor(value, [k]);
        } else {
          const wrappedCensor = typeof censor === "function" ? (value, path) => {
            return censor(value, [k, ...path]);
          } : censor;
          o[k] = Redact({
            paths: shape[k],
            censor: wrappedCensor,
            serialize,
            strict,
            remove
          });
        }
        return o;
      }, result);
    }
    function handle(opts) {
      if (Array.isArray(opts)) {
        opts = { paths: opts, censor: CENSOR };
        return opts;
      }
      let { paths, censor = CENSOR, remove } = opts;
      if (Array.isArray(paths) === false) {
        throw Error("pino \u2013 redact must contain an array of strings");
      }
      if (remove === true) censor = void 0;
      return { paths, censor, remove };
    }
    module.exports = redaction;
  }
});

// ../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/time.js
var require_time = __commonJS({
  "../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/time.js"(exports, module) {
    "use strict";
    var nullTime = () => "";
    var epochTime = () => `,"time":${Date.now()}`;
    var unixTime = () => `,"time":${Math.round(Date.now() / 1e3)}`;
    var isoTime = () => `,"time":"${new Date(Date.now()).toISOString()}"`;
    var NS_PER_MS = 1000000n;
    var NS_PER_SEC = 1000000000n;
    var startWallTimeNs = BigInt(Date.now()) * NS_PER_MS;
    var startHrTime = process.hrtime.bigint();
    var isoTimeNano = () => {
      const elapsedNs = process.hrtime.bigint() - startHrTime;
      const currentTimeNs = startWallTimeNs + elapsedNs;
      const secondsSinceEpoch = currentTimeNs / NS_PER_SEC;
      const nanosWithinSecond = currentTimeNs % NS_PER_SEC;
      const msSinceEpoch = Number(secondsSinceEpoch * 1000n + nanosWithinSecond / 1000000n);
      const date = new Date(msSinceEpoch);
      const year = date.getUTCFullYear();
      const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
      const day = date.getUTCDate().toString().padStart(2, "0");
      const hours = date.getUTCHours().toString().padStart(2, "0");
      const minutes = date.getUTCMinutes().toString().padStart(2, "0");
      const seconds = date.getUTCSeconds().toString().padStart(2, "0");
      return `,"time":"${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${nanosWithinSecond.toString().padStart(9, "0")}Z"`;
    };
    module.exports = { nullTime, epochTime, unixTime, isoTime, isoTimeNano };
  }
});

// ../../node_modules/.pnpm/quick-format-unescaped@4.0.4/node_modules/quick-format-unescaped/index.js
var require_quick_format_unescaped = __commonJS({
  "../../node_modules/.pnpm/quick-format-unescaped@4.0.4/node_modules/quick-format-unescaped/index.js"(exports, module) {
    "use strict";
    function tryStringify(o) {
      try {
        return JSON.stringify(o);
      } catch (e) {
        return '"[Circular]"';
      }
    }
    module.exports = format;
    function format(f, args, opts) {
      var ss = opts && opts.stringify || tryStringify;
      var offset = 1;
      if (typeof f === "object" && f !== null) {
        var len = args.length + offset;
        if (len === 1) return f;
        var objects = new Array(len);
        objects[0] = ss(f);
        for (var index = 1; index < len; index++) {
          objects[index] = ss(args[index]);
        }
        return objects.join(" ");
      }
      if (typeof f !== "string") {
        return f;
      }
      var argLen = args.length;
      if (argLen === 0) return f;
      var str = "";
      var a = 1 - offset;
      var lastPos = -1;
      var flen = f && f.length || 0;
      for (var i = 0; i < flen; ) {
        if (f.charCodeAt(i) === 37 && i + 1 < flen) {
          lastPos = lastPos > -1 ? lastPos : 0;
          switch (f.charCodeAt(i + 1)) {
            case 100:
            // 'd'
            case 102:
              if (a >= argLen)
                break;
              if (args[a] == null) break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += Number(args[a]);
              lastPos = i + 2;
              i++;
              break;
            case 105:
              if (a >= argLen)
                break;
              if (args[a] == null) break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += Math.floor(Number(args[a]));
              lastPos = i + 2;
              i++;
              break;
            case 79:
            // 'O'
            case 111:
            // 'o'
            case 106:
              if (a >= argLen)
                break;
              if (args[a] === void 0) break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              var type = typeof args[a];
              if (type === "string") {
                str += "'" + args[a] + "'";
                lastPos = i + 2;
                i++;
                break;
              }
              if (type === "function") {
                str += args[a].name || "<anonymous>";
                lastPos = i + 2;
                i++;
                break;
              }
              str += ss(args[a]);
              lastPos = i + 2;
              i++;
              break;
            case 115:
              if (a >= argLen)
                break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += String(args[a]);
              lastPos = i + 2;
              i++;
              break;
            case 37:
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += "%";
              lastPos = i + 2;
              i++;
              a--;
              break;
          }
          ++a;
        }
        ++i;
      }
      if (lastPos === -1)
        return f;
      else if (lastPos < flen) {
        str += f.slice(lastPos);
      }
      return str;
    }
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

// ../../node_modules/.pnpm/thread-stream@3.1.0/node_modules/thread-stream/package.json
var require_package = __commonJS({
  "../../node_modules/.pnpm/thread-stream@3.1.0/node_modules/thread-stream/package.json"(exports, module) {
    module.exports = {
      name: "thread-stream",
      version: "3.1.0",
      description: "A streaming way to send data to a Node.js Worker Thread",
      main: "index.js",
      types: "index.d.ts",
      dependencies: {
        "real-require": "^0.2.0"
      },
      devDependencies: {
        "@types/node": "^20.1.0",
        "@types/tap": "^15.0.0",
        "@yao-pkg/pkg": "^5.11.5",
        desm: "^1.3.0",
        fastbench: "^1.0.1",
        husky: "^9.0.6",
        "pino-elasticsearch": "^8.0.0",
        "sonic-boom": "^4.0.1",
        standard: "^17.0.0",
        tap: "^16.2.0",
        "ts-node": "^10.8.0",
        typescript: "^5.3.2",
        "why-is-node-running": "^2.2.2"
      },
      scripts: {
        build: "tsc --noEmit",
        test: 'standard && npm run build && npm run transpile && tap "test/**/*.test.*js" && tap --ts test/*.test.*ts',
        "test:ci": "standard && npm run transpile && npm run test:ci:js && npm run test:ci:ts",
        "test:ci:js": 'tap --no-check-coverage --timeout=120 --coverage-report=lcovonly "test/**/*.test.*js"',
        "test:ci:ts": 'tap --ts --no-check-coverage --coverage-report=lcovonly "test/**/*.test.*ts"',
        "test:yarn": 'npm run transpile && tap "test/**/*.test.js" --no-check-coverage',
        transpile: "sh ./test/ts/transpile.sh",
        prepare: "husky install"
      },
      standard: {
        ignore: [
          "test/ts/**/*",
          "test/syntax-error.mjs"
        ]
      },
      repository: {
        type: "git",
        url: "git+https://github.com/mcollina/thread-stream.git"
      },
      keywords: [
        "worker",
        "thread",
        "threads",
        "stream"
      ],
      author: "Matteo Collina <hello@matteocollina.com>",
      license: "MIT",
      bugs: {
        url: "https://github.com/mcollina/thread-stream/issues"
      },
      homepage: "https://github.com/mcollina/thread-stream#readme"
    };
  }
});

// ../../node_modules/.pnpm/thread-stream@3.1.0/node_modules/thread-stream/lib/wait.js
var require_wait = __commonJS({
  "../../node_modules/.pnpm/thread-stream@3.1.0/node_modules/thread-stream/lib/wait.js"(exports, module) {
    "use strict";
    var MAX_TIMEOUT = 1e3;
    function wait(state, index, expected, timeout, done) {
      const max = Date.now() + timeout;
      let current = Atomics.load(state, index);
      if (current === expected) {
        done(null, "ok");
        return;
      }
      let prior = current;
      const check = (backoff) => {
        if (Date.now() > max) {
          done(null, "timed-out");
        } else {
          setTimeout(() => {
            prior = current;
            current = Atomics.load(state, index);
            if (current === prior) {
              check(backoff >= MAX_TIMEOUT ? MAX_TIMEOUT : backoff * 2);
            } else {
              if (current === expected) done(null, "ok");
              else done(null, "not-equal");
            }
          }, backoff);
        }
      };
      check(1);
    }
    function waitDiff(state, index, expected, timeout, done) {
      const max = Date.now() + timeout;
      let current = Atomics.load(state, index);
      if (current !== expected) {
        done(null, "ok");
        return;
      }
      const check = (backoff) => {
        if (Date.now() > max) {
          done(null, "timed-out");
        } else {
          setTimeout(() => {
            current = Atomics.load(state, index);
            if (current !== expected) {
              done(null, "ok");
            } else {
              check(backoff >= MAX_TIMEOUT ? MAX_TIMEOUT : backoff * 2);
            }
          }, backoff);
        }
      };
      check(1);
    }
    module.exports = { wait, waitDiff };
  }
});

// ../../node_modules/.pnpm/thread-stream@3.1.0/node_modules/thread-stream/lib/indexes.js
var require_indexes = __commonJS({
  "../../node_modules/.pnpm/thread-stream@3.1.0/node_modules/thread-stream/lib/indexes.js"(exports, module) {
    "use strict";
    var WRITE_INDEX = 4;
    var READ_INDEX = 8;
    module.exports = {
      WRITE_INDEX,
      READ_INDEX
    };
  }
});

// ../../node_modules/.pnpm/thread-stream@3.1.0/node_modules/thread-stream/index.js
var require_thread_stream = __commonJS({
  "../../node_modules/.pnpm/thread-stream@3.1.0/node_modules/thread-stream/index.js"(exports, module) {
    "use strict";
    var { version } = require_package();
    var { EventEmitter } = __require("events");
    var { Worker } = __require("worker_threads");
    var { join } = __require("path");
    var { pathToFileURL } = __require("url");
    var { wait } = require_wait();
    var {
      WRITE_INDEX,
      READ_INDEX
    } = require_indexes();
    var buffer = __require("buffer");
    var assert = __require("assert");
    var kImpl = /* @__PURE__ */ Symbol("kImpl");
    var MAX_STRING = buffer.constants.MAX_STRING_LENGTH;
    var FakeWeakRef = class {
      constructor(value) {
        this._value = value;
      }
      deref() {
        return this._value;
      }
    };
    var FakeFinalizationRegistry = class {
      register() {
      }
      unregister() {
      }
    };
    var FinalizationRegistry2 = process.env.NODE_V8_COVERAGE ? FakeFinalizationRegistry : global.FinalizationRegistry || FakeFinalizationRegistry;
    var WeakRef2 = process.env.NODE_V8_COVERAGE ? FakeWeakRef : global.WeakRef || FakeWeakRef;
    var registry = new FinalizationRegistry2((worker) => {
      if (worker.exited) {
        return;
      }
      worker.terminate();
    });
    function createWorker(stream, opts) {
      const { filename, workerData } = opts;
      const bundlerOverrides = "__bundlerPathsOverrides" in globalThis ? globalThis.__bundlerPathsOverrides : {};
      const toExecute = bundlerOverrides["thread-stream-worker"] || join(__dirname, "lib", "worker.js");
      const worker = new Worker(toExecute, {
        ...opts.workerOpts,
        trackUnmanagedFds: false,
        workerData: {
          filename: filename.indexOf("file://") === 0 ? filename : pathToFileURL(filename).href,
          dataBuf: stream[kImpl].dataBuf,
          stateBuf: stream[kImpl].stateBuf,
          workerData: {
            $context: {
              threadStreamVersion: version
            },
            ...workerData
          }
        }
      });
      worker.stream = new FakeWeakRef(stream);
      worker.on("message", onWorkerMessage);
      worker.on("exit", onWorkerExit);
      registry.register(stream, worker);
      return worker;
    }
    function drain(stream) {
      assert(!stream[kImpl].sync);
      if (stream[kImpl].needDrain) {
        stream[kImpl].needDrain = false;
        stream.emit("drain");
      }
    }
    function nextFlush(stream) {
      const writeIndex = Atomics.load(stream[kImpl].state, WRITE_INDEX);
      let leftover = stream[kImpl].data.length - writeIndex;
      if (leftover > 0) {
        if (stream[kImpl].buf.length === 0) {
          stream[kImpl].flushing = false;
          if (stream[kImpl].ending) {
            end(stream);
          } else if (stream[kImpl].needDrain) {
            process.nextTick(drain, stream);
          }
          return;
        }
        let toWrite = stream[kImpl].buf.slice(0, leftover);
        let toWriteBytes = Buffer.byteLength(toWrite);
        if (toWriteBytes <= leftover) {
          stream[kImpl].buf = stream[kImpl].buf.slice(leftover);
          write(stream, toWrite, nextFlush.bind(null, stream));
        } else {
          stream.flush(() => {
            if (stream.destroyed) {
              return;
            }
            Atomics.store(stream[kImpl].state, READ_INDEX, 0);
            Atomics.store(stream[kImpl].state, WRITE_INDEX, 0);
            while (toWriteBytes > stream[kImpl].data.length) {
              leftover = leftover / 2;
              toWrite = stream[kImpl].buf.slice(0, leftover);
              toWriteBytes = Buffer.byteLength(toWrite);
            }
            stream[kImpl].buf = stream[kImpl].buf.slice(leftover);
            write(stream, toWrite, nextFlush.bind(null, stream));
          });
        }
      } else if (leftover === 0) {
        if (writeIndex === 0 && stream[kImpl].buf.length === 0) {
          return;
        }
        stream.flush(() => {
          Atomics.store(stream[kImpl].state, READ_INDEX, 0);
          Atomics.store(stream[kImpl].state, WRITE_INDEX, 0);
          nextFlush(stream);
        });
      } else {
        destroy(stream, new Error("overwritten"));
      }
    }
    function onWorkerMessage(msg) {
      const stream = this.stream.deref();
      if (stream === void 0) {
        this.exited = true;
        this.terminate();
        return;
      }
      switch (msg.code) {
        case "READY":
          this.stream = new WeakRef2(stream);
          stream.flush(() => {
            stream[kImpl].ready = true;
            stream.emit("ready");
          });
          break;
        case "ERROR":
          destroy(stream, msg.err);
          break;
        case "EVENT":
          if (Array.isArray(msg.args)) {
            stream.emit(msg.name, ...msg.args);
          } else {
            stream.emit(msg.name, msg.args);
          }
          break;
        case "WARNING":
          process.emitWarning(msg.err);
          break;
        default:
          destroy(stream, new Error("this should not happen: " + msg.code));
      }
    }
    function onWorkerExit(code) {
      const stream = this.stream.deref();
      if (stream === void 0) {
        return;
      }
      registry.unregister(stream);
      stream.worker.exited = true;
      stream.worker.off("exit", onWorkerExit);
      destroy(stream, code !== 0 ? new Error("the worker thread exited") : null);
    }
    var ThreadStream = class extends EventEmitter {
      constructor(opts = {}) {
        super();
        if (opts.bufferSize < 4) {
          throw new Error("bufferSize must at least fit a 4-byte utf-8 char");
        }
        this[kImpl] = {};
        this[kImpl].stateBuf = new SharedArrayBuffer(128);
        this[kImpl].state = new Int32Array(this[kImpl].stateBuf);
        this[kImpl].dataBuf = new SharedArrayBuffer(opts.bufferSize || 4 * 1024 * 1024);
        this[kImpl].data = Buffer.from(this[kImpl].dataBuf);
        this[kImpl].sync = opts.sync || false;
        this[kImpl].ending = false;
        this[kImpl].ended = false;
        this[kImpl].needDrain = false;
        this[kImpl].destroyed = false;
        this[kImpl].flushing = false;
        this[kImpl].ready = false;
        this[kImpl].finished = false;
        this[kImpl].errored = null;
        this[kImpl].closed = false;
        this[kImpl].buf = "";
        this.worker = createWorker(this, opts);
        this.on("message", (message, transferList) => {
          this.worker.postMessage(message, transferList);
        });
      }
      write(data) {
        if (this[kImpl].destroyed) {
          error(this, new Error("the worker has exited"));
          return false;
        }
        if (this[kImpl].ending) {
          error(this, new Error("the worker is ending"));
          return false;
        }
        if (this[kImpl].flushing && this[kImpl].buf.length + data.length >= MAX_STRING) {
          try {
            writeSync(this);
            this[kImpl].flushing = true;
          } catch (err) {
            destroy(this, err);
            return false;
          }
        }
        this[kImpl].buf += data;
        if (this[kImpl].sync) {
          try {
            writeSync(this);
            return true;
          } catch (err) {
            destroy(this, err);
            return false;
          }
        }
        if (!this[kImpl].flushing) {
          this[kImpl].flushing = true;
          setImmediate(nextFlush, this);
        }
        this[kImpl].needDrain = this[kImpl].data.length - this[kImpl].buf.length - Atomics.load(this[kImpl].state, WRITE_INDEX) <= 0;
        return !this[kImpl].needDrain;
      }
      end() {
        if (this[kImpl].destroyed) {
          return;
        }
        this[kImpl].ending = true;
        end(this);
      }
      flush(cb) {
        if (this[kImpl].destroyed) {
          if (typeof cb === "function") {
            process.nextTick(cb, new Error("the worker has exited"));
          }
          return;
        }
        const writeIndex = Atomics.load(this[kImpl].state, WRITE_INDEX);
        wait(this[kImpl].state, READ_INDEX, writeIndex, Infinity, (err, res) => {
          if (err) {
            destroy(this, err);
            process.nextTick(cb, err);
            return;
          }
          if (res === "not-equal") {
            this.flush(cb);
            return;
          }
          process.nextTick(cb);
        });
      }
      flushSync() {
        if (this[kImpl].destroyed) {
          return;
        }
        writeSync(this);
        flushSync(this);
      }
      unref() {
        this.worker.unref();
      }
      ref() {
        this.worker.ref();
      }
      get ready() {
        return this[kImpl].ready;
      }
      get destroyed() {
        return this[kImpl].destroyed;
      }
      get closed() {
        return this[kImpl].closed;
      }
      get writable() {
        return !this[kImpl].destroyed && !this[kImpl].ending;
      }
      get writableEnded() {
        return this[kImpl].ending;
      }
      get writableFinished() {
        return this[kImpl].finished;
      }
      get writableNeedDrain() {
        return this[kImpl].needDrain;
      }
      get writableObjectMode() {
        return false;
      }
      get writableErrored() {
        return this[kImpl].errored;
      }
    };
    function error(stream, err) {
      setImmediate(() => {
        stream.emit("error", err);
      });
    }
    function destroy(stream, err) {
      if (stream[kImpl].destroyed) {
        return;
      }
      stream[kImpl].destroyed = true;
      if (err) {
        stream[kImpl].errored = err;
        error(stream, err);
      }
      if (!stream.worker.exited) {
        stream.worker.terminate().catch(() => {
        }).then(() => {
          stream[kImpl].closed = true;
          stream.emit("close");
        });
      } else {
        setImmediate(() => {
          stream[kImpl].closed = true;
          stream.emit("close");
        });
      }
    }
    function write(stream, data, cb) {
      const current = Atomics.load(stream[kImpl].state, WRITE_INDEX);
      const length = Buffer.byteLength(data);
      stream[kImpl].data.write(data, current);
      Atomics.store(stream[kImpl].state, WRITE_INDEX, current + length);
      Atomics.notify(stream[kImpl].state, WRITE_INDEX);
      cb();
      return true;
    }
    function end(stream) {
      if (stream[kImpl].ended || !stream[kImpl].ending || stream[kImpl].flushing) {
        return;
      }
      stream[kImpl].ended = true;
      try {
        stream.flushSync();
        let readIndex = Atomics.load(stream[kImpl].state, READ_INDEX);
        Atomics.store(stream[kImpl].state, WRITE_INDEX, -1);
        Atomics.notify(stream[kImpl].state, WRITE_INDEX);
        let spins = 0;
        while (readIndex !== -1) {
          Atomics.wait(stream[kImpl].state, READ_INDEX, readIndex, 1e3);
          readIndex = Atomics.load(stream[kImpl].state, READ_INDEX);
          if (readIndex === -2) {
            destroy(stream, new Error("end() failed"));
            return;
          }
          if (++spins === 10) {
            destroy(stream, new Error("end() took too long (10s)"));
            return;
          }
        }
        process.nextTick(() => {
          stream[kImpl].finished = true;
          stream.emit("finish");
        });
      } catch (err) {
        destroy(stream, err);
      }
    }
    function writeSync(stream) {
      const cb = () => {
        if (stream[kImpl].ending) {
          end(stream);
        } else if (stream[kImpl].needDrain) {
          process.nextTick(drain, stream);
        }
      };
      stream[kImpl].flushing = false;
      while (stream[kImpl].buf.length !== 0) {
        const writeIndex = Atomics.load(stream[kImpl].state, WRITE_INDEX);
        let leftover = stream[kImpl].data.length - writeIndex;
        if (leftover === 0) {
          flushSync(stream);
          Atomics.store(stream[kImpl].state, READ_INDEX, 0);
          Atomics.store(stream[kImpl].state, WRITE_INDEX, 0);
          continue;
        } else if (leftover < 0) {
          throw new Error("overwritten");
        }
        let toWrite = stream[kImpl].buf.slice(0, leftover);
        let toWriteBytes = Buffer.byteLength(toWrite);
        if (toWriteBytes <= leftover) {
          stream[kImpl].buf = stream[kImpl].buf.slice(leftover);
          write(stream, toWrite, cb);
        } else {
          flushSync(stream);
          Atomics.store(stream[kImpl].state, READ_INDEX, 0);
          Atomics.store(stream[kImpl].state, WRITE_INDEX, 0);
          while (toWriteBytes > stream[kImpl].buf.length) {
            leftover = leftover / 2;
            toWrite = stream[kImpl].buf.slice(0, leftover);
            toWriteBytes = Buffer.byteLength(toWrite);
          }
          stream[kImpl].buf = stream[kImpl].buf.slice(leftover);
          write(stream, toWrite, cb);
        }
      }
    }
    function flushSync(stream) {
      if (stream[kImpl].flushing) {
        throw new Error("unable to flush while flushing");
      }
      const writeIndex = Atomics.load(stream[kImpl].state, WRITE_INDEX);
      let spins = 0;
      while (true) {
        const readIndex = Atomics.load(stream[kImpl].state, READ_INDEX);
        if (readIndex === -2) {
          throw Error("_flushSync failed");
        }
        if (readIndex !== writeIndex) {
          Atomics.wait(stream[kImpl].state, READ_INDEX, readIndex, 1e3);
        } else {
          break;
        }
        if (++spins === 10) {
          throw new Error("_flushSync took too long (10s)");
        }
      }
    }
    module.exports = ThreadStream;
  }
});

// ../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/transport.js
var require_transport = __commonJS({
  "../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/transport.js"(exports, module) {
    "use strict";
    var { createRequire } = __require("module");
    var getCallers = require_caller();
    var { join, isAbsolute, sep } = __require("node:path");
    var sleep = require_atomic_sleep();
    var onExit = require_on_exit_leak_free();
    var ThreadStream = require_thread_stream();
    function setupOnExit(stream) {
      onExit.register(stream, autoEnd);
      onExit.registerBeforeExit(stream, flush);
      stream.on("close", function() {
        onExit.unregister(stream);
      });
    }
    function buildStream(filename, workerData, workerOpts, sync) {
      const stream = new ThreadStream({
        filename,
        workerData,
        workerOpts,
        sync
      });
      stream.on("ready", onReady);
      stream.on("close", function() {
        process.removeListener("exit", onExit2);
      });
      process.on("exit", onExit2);
      function onReady() {
        process.removeListener("exit", onExit2);
        stream.unref();
        if (workerOpts.autoEnd !== false) {
          setupOnExit(stream);
        }
      }
      function onExit2() {
        if (stream.closed) {
          return;
        }
        stream.flushSync();
        sleep(100);
        stream.end();
      }
      return stream;
    }
    function autoEnd(stream) {
      stream.ref();
      stream.flushSync();
      stream.end();
      stream.once("close", function() {
        stream.unref();
      });
    }
    function flush(stream) {
      stream.flushSync();
    }
    function transport(fullOptions) {
      const { pipeline, targets, levels, dedupe, worker = {}, caller = getCallers(), sync = false } = fullOptions;
      const options = {
        ...fullOptions.options
      };
      const callers = typeof caller === "string" ? [caller] : caller;
      const bundlerOverrides = "__bundlerPathsOverrides" in globalThis ? globalThis.__bundlerPathsOverrides : {};
      let target = fullOptions.target;
      if (target && targets) {
        throw new Error("only one of target or targets can be specified");
      }
      if (targets) {
        target = bundlerOverrides["pino-worker"] || join(__dirname, "worker.js");
        options.targets = targets.filter((dest) => dest.target).map((dest) => {
          return {
            ...dest,
            target: fixTarget(dest.target)
          };
        });
        options.pipelines = targets.filter((dest) => dest.pipeline).map((dest) => {
          return dest.pipeline.map((t) => {
            return {
              ...t,
              level: dest.level,
              // duplicate the pipeline `level` property defined in the upper level
              target: fixTarget(t.target)
            };
          });
        });
      } else if (pipeline) {
        target = bundlerOverrides["pino-worker"] || join(__dirname, "worker.js");
        options.pipelines = [pipeline.map((dest) => {
          return {
            ...dest,
            target: fixTarget(dest.target)
          };
        })];
      }
      if (levels) {
        options.levels = levels;
      }
      if (dedupe) {
        options.dedupe = dedupe;
      }
      options.pinoWillSendConfig = true;
      return buildStream(fixTarget(target), options, worker, sync);
      function fixTarget(origin) {
        origin = bundlerOverrides[origin] || origin;
        if (isAbsolute(origin) || origin.indexOf("file://") === 0) {
          return origin;
        }
        if (origin === "pino/file") {
          return join(__dirname, "..", "file.js");
        }
        let fixTarget2;
        for (const filePath of callers) {
          try {
            const context = filePath === "node:repl" ? process.cwd() + sep : filePath;
            fixTarget2 = createRequire(context).resolve(origin);
            break;
          } catch (err) {
            continue;
          }
        }
        if (!fixTarget2) {
          throw new Error(`unable to determine transport target for "${origin}"`);
        }
        return fixTarget2;
      }
    }
    module.exports = transport;
  }
});

// ../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/tools.js
var require_tools = __commonJS({
  "../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/tools.js"(exports, module) {
    "use strict";
    var diagChan = __require("node:diagnostics_channel");
    var format = require_quick_format_unescaped();
    var { mapHttpRequest, mapHttpResponse } = require_pino_std_serializers();
    var SonicBoom = require_sonic_boom();
    var onExit = require_on_exit_leak_free();
    var {
      lsCacheSym,
      chindingsSym,
      writeSym,
      serializersSym,
      formatOptsSym,
      endSym,
      stringifiersSym,
      stringifySym,
      stringifySafeSym,
      wildcardFirstSym,
      nestedKeySym,
      formattersSym,
      messageKeySym,
      errorKeySym,
      nestedKeyStrSym,
      msgPrefixSym
    } = require_symbols();
    var { isMainThread } = __require("worker_threads");
    var transport = require_transport();
    var asJsonChan;
    if (typeof diagChan.tracingChannel === "function") {
      asJsonChan = diagChan.tracingChannel("pino_asJson");
    } else {
      asJsonChan = {
        hasSubscribers: false,
        traceSync(fn, store, thisArg, ...args) {
          return fn.call(thisArg, ...args);
        }
      };
    }
    function noop() {
    }
    function genLog(level, hook) {
      if (!hook) return LOG;
      return function hookWrappedLog(...args) {
        hook.call(this, args, LOG, level);
      };
      function LOG(o, ...n) {
        if (typeof o === "object") {
          let msg = o;
          if (o !== null) {
            if (o.method && o.headers && o.socket) {
              o = mapHttpRequest(o);
            } else if (typeof o.setHeader === "function") {
              o = mapHttpResponse(o);
            }
          }
          let formatParams;
          if (msg === null && n.length === 0) {
            formatParams = [null];
          } else {
            msg = n.shift();
            formatParams = n;
          }
          if (typeof this[msgPrefixSym] === "string" && msg !== void 0 && msg !== null) {
            msg = this[msgPrefixSym] + msg;
          }
          this[writeSym](o, format(msg, formatParams, this[formatOptsSym]), level);
        } else {
          let msg = o === void 0 ? n.shift() : o;
          if (typeof this[msgPrefixSym] === "string" && msg !== void 0 && msg !== null) {
            msg = this[msgPrefixSym] + msg;
          }
          this[writeSym](null, format(msg, n, this[formatOptsSym]), level);
        }
      }
    }
    function asString(str) {
      let result = "";
      let last = 0;
      let found = false;
      let point = 255;
      const l = str.length;
      if (l > 100) {
        return JSON.stringify(str);
      }
      for (var i = 0; i < l && point >= 32; i++) {
        point = str.charCodeAt(i);
        if (point === 34 || point === 92) {
          result += str.slice(last, i) + "\\";
          last = i;
          found = true;
        }
      }
      if (!found) {
        result = str;
      } else {
        result += str.slice(last);
      }
      return point < 32 ? JSON.stringify(str) : '"' + result + '"';
    }
    function asJson(obj, msg, num, time) {
      if (asJsonChan.hasSubscribers === false) {
        return _asJson.call(this, obj, msg, num, time);
      }
      const store = { instance: this, arguments };
      return asJsonChan.traceSync(_asJson, store, this, obj, msg, num, time);
    }
    function _asJson(obj, msg, num, time) {
      const stringify2 = this[stringifySym];
      const stringifySafe = this[stringifySafeSym];
      const stringifiers = this[stringifiersSym];
      const end = this[endSym];
      const chindings = this[chindingsSym];
      const serializers = this[serializersSym];
      const formatters = this[formattersSym];
      const messageKey = this[messageKeySym];
      const errorKey = this[errorKeySym];
      let data = this[lsCacheSym][num] + time;
      data = data + chindings;
      let value;
      if (formatters.log) {
        obj = formatters.log(obj);
      }
      const wildcardStringifier = stringifiers[wildcardFirstSym];
      let propStr = "";
      for (const key in obj) {
        value = obj[key];
        if (Object.prototype.hasOwnProperty.call(obj, key) && value !== void 0) {
          if (serializers[key]) {
            value = serializers[key](value);
          } else if (key === errorKey && serializers.err) {
            value = serializers.err(value);
          }
          const stringifier = stringifiers[key] || wildcardStringifier;
          switch (typeof value) {
            case "undefined":
            case "function":
              continue;
            case "number":
              if (Number.isFinite(value) === false) {
                value = null;
              }
            // this case explicitly falls through to the next one
            case "boolean":
              if (stringifier) value = stringifier(value);
              break;
            case "string":
              value = (stringifier || asString)(value);
              break;
            default:
              value = (stringifier || stringify2)(value, stringifySafe);
          }
          if (value === void 0) continue;
          const strKey = asString(key);
          propStr += "," + strKey + ":" + value;
        }
      }
      let msgStr = "";
      if (msg !== void 0) {
        value = serializers[messageKey] ? serializers[messageKey](msg) : msg;
        const stringifier = stringifiers[messageKey] || wildcardStringifier;
        switch (typeof value) {
          case "function":
            break;
          case "number":
            if (Number.isFinite(value) === false) {
              value = null;
            }
          // this case explicitly falls through to the next one
          case "boolean":
            if (stringifier) value = stringifier(value);
            msgStr = ',"' + messageKey + '":' + value;
            break;
          case "string":
            value = (stringifier || asString)(value);
            msgStr = ',"' + messageKey + '":' + value;
            break;
          default:
            value = (stringifier || stringify2)(value, stringifySafe);
            msgStr = ',"' + messageKey + '":' + value;
        }
      }
      if (this[nestedKeySym] && propStr) {
        return data + this[nestedKeyStrSym] + propStr.slice(1) + "}" + msgStr + end;
      } else {
        return data + propStr + msgStr + end;
      }
    }
    function asChindings(instance, bindings) {
      let value;
      let data = instance[chindingsSym];
      const stringify2 = instance[stringifySym];
      const stringifySafe = instance[stringifySafeSym];
      const stringifiers = instance[stringifiersSym];
      const wildcardStringifier = stringifiers[wildcardFirstSym];
      const serializers = instance[serializersSym];
      const formatter = instance[formattersSym].bindings;
      bindings = formatter(bindings);
      for (const key in bindings) {
        value = bindings[key];
        const valid = (key.length < 5 || key !== "level" && key !== "serializers" && key !== "formatters" && key !== "customLevels") && bindings.hasOwnProperty(key) && value !== void 0;
        if (valid === true) {
          value = serializers[key] ? serializers[key](value) : value;
          value = (stringifiers[key] || wildcardStringifier || stringify2)(value, stringifySafe);
          if (value === void 0) continue;
          data += ',"' + key + '":' + value;
        }
      }
      return data;
    }
    function hasBeenTampered(stream) {
      return stream.write !== stream.constructor.prototype.write;
    }
    function buildSafeSonicBoom(opts) {
      const stream = new SonicBoom(opts);
      stream.on("error", filterBrokenPipe);
      if (!opts.sync && isMainThread) {
        onExit.register(stream, autoEnd);
        stream.on("close", function() {
          onExit.unregister(stream);
        });
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
        stream.emit("error", err);
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
    function createArgsNormalizer(defaultOptions) {
      return function normalizeArgs(instance, caller, opts = {}, stream) {
        if (typeof opts === "string") {
          stream = buildSafeSonicBoom({ dest: opts });
          opts = {};
        } else if (typeof stream === "string") {
          if (opts && opts.transport) {
            throw Error("only one of option.transport or stream can be specified");
          }
          stream = buildSafeSonicBoom({ dest: stream });
        } else if (opts instanceof SonicBoom || opts.writable || opts._writableState) {
          stream = opts;
          opts = {};
        } else if (opts.transport) {
          if (opts.transport instanceof SonicBoom || opts.transport.writable || opts.transport._writableState) {
            throw Error("option.transport do not allow stream, please pass to option directly. e.g. pino(transport)");
          }
          if (opts.transport.targets && opts.transport.targets.length && opts.formatters && typeof opts.formatters.level === "function") {
            throw Error("option.transport.targets do not allow custom level formatters");
          }
          let customLevels;
          if (opts.customLevels) {
            customLevels = opts.useOnlyCustomLevels ? opts.customLevels : Object.assign({}, opts.levels, opts.customLevels);
          }
          stream = transport({ caller, ...opts.transport, levels: customLevels });
        }
        opts = Object.assign({}, defaultOptions, opts);
        opts.serializers = Object.assign({}, defaultOptions.serializers, opts.serializers);
        opts.formatters = Object.assign({}, defaultOptions.formatters, opts.formatters);
        if (opts.prettyPrint) {
          throw new Error("prettyPrint option is no longer supported, see the pino-pretty package (https://github.com/pinojs/pino-pretty)");
        }
        const { enabled, onChild } = opts;
        if (enabled === false) opts.level = "silent";
        if (!onChild) opts.onChild = noop;
        if (!stream) {
          if (!hasBeenTampered(process.stdout)) {
            stream = buildSafeSonicBoom({ fd: process.stdout.fd || 1 });
          } else {
            stream = process.stdout;
          }
        }
        return { opts, stream };
      };
    }
    function stringify(obj, stringifySafeFn) {
      try {
        return JSON.stringify(obj);
      } catch (_) {
        try {
          const stringify2 = stringifySafeFn || this[stringifySafeSym];
          return stringify2(obj);
        } catch (_2) {
          return '"[unable to serialize, circular reference is too complex to analyze]"';
        }
      }
    }
    function buildFormatters(level, bindings, log) {
      return {
        level,
        bindings,
        log
      };
    }
    function normalizeDestFileDescriptor(destination) {
      const fd = Number(destination);
      if (typeof destination === "string" && Number.isFinite(fd)) {
        return fd;
      }
      if (destination === void 0) {
        return 1;
      }
      return destination;
    }
    module.exports = {
      noop,
      buildSafeSonicBoom,
      asChindings,
      asJson,
      genLog,
      createArgsNormalizer,
      stringify,
      buildFormatters,
      normalizeDestFileDescriptor
    };
  }
});

// ../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/constants.js
var require_constants = __commonJS({
  "../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/constants.js"(exports, module) {
    var DEFAULT_LEVELS = {
      trace: 10,
      debug: 20,
      info: 30,
      warn: 40,
      error: 50,
      fatal: 60
    };
    var SORTING_ORDER = {
      ASC: "ASC",
      DESC: "DESC"
    };
    module.exports = {
      DEFAULT_LEVELS,
      SORTING_ORDER
    };
  }
});

// ../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/levels.js
var require_levels = __commonJS({
  "../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/levels.js"(exports, module) {
    "use strict";
    var {
      lsCacheSym,
      levelValSym,
      useOnlyCustomLevelsSym,
      streamSym,
      formattersSym,
      hooksSym,
      levelCompSym
    } = require_symbols();
    var { noop, genLog } = require_tools();
    var { DEFAULT_LEVELS, SORTING_ORDER } = require_constants();
    var levelMethods = {
      fatal: (hook) => {
        const logFatal = genLog(DEFAULT_LEVELS.fatal, hook);
        return function(...args) {
          const stream = this[streamSym];
          logFatal.call(this, ...args);
          if (typeof stream.flushSync === "function") {
            try {
              stream.flushSync();
            } catch (e) {
            }
          }
        };
      },
      error: (hook) => genLog(DEFAULT_LEVELS.error, hook),
      warn: (hook) => genLog(DEFAULT_LEVELS.warn, hook),
      info: (hook) => genLog(DEFAULT_LEVELS.info, hook),
      debug: (hook) => genLog(DEFAULT_LEVELS.debug, hook),
      trace: (hook) => genLog(DEFAULT_LEVELS.trace, hook)
    };
    var nums = Object.keys(DEFAULT_LEVELS).reduce((o, k) => {
      o[DEFAULT_LEVELS[k]] = k;
      return o;
    }, {});
    var initialLsCache = Object.keys(nums).reduce((o, k) => {
      o[k] = '{"level":' + Number(k);
      return o;
    }, {});
    function genLsCache(instance) {
      const formatter = instance[formattersSym].level;
      const { labels } = instance.levels;
      const cache = {};
      for (const label in labels) {
        const level = formatter(labels[label], Number(label));
        cache[label] = JSON.stringify(level).slice(0, -1);
      }
      instance[lsCacheSym] = cache;
      return instance;
    }
    function isStandardLevel(level, useOnlyCustomLevels) {
      if (useOnlyCustomLevels) {
        return false;
      }
      switch (level) {
        case "fatal":
        case "error":
        case "warn":
        case "info":
        case "debug":
        case "trace":
          return true;
        default:
          return false;
      }
    }
    function setLevel(level) {
      const { labels, values } = this.levels;
      if (typeof level === "number") {
        if (labels[level] === void 0) throw Error("unknown level value" + level);
        level = labels[level];
      }
      if (values[level] === void 0) throw Error("unknown level " + level);
      const preLevelVal = this[levelValSym];
      const levelVal = this[levelValSym] = values[level];
      const useOnlyCustomLevelsVal = this[useOnlyCustomLevelsSym];
      const levelComparison = this[levelCompSym];
      const hook = this[hooksSym].logMethod;
      for (const key in values) {
        if (levelComparison(values[key], levelVal) === false) {
          this[key] = noop;
          continue;
        }
        this[key] = isStandardLevel(key, useOnlyCustomLevelsVal) ? levelMethods[key](hook) : genLog(values[key], hook);
      }
      this.emit(
        "level-change",
        level,
        levelVal,
        labels[preLevelVal],
        preLevelVal,
        this
      );
    }
    function getLevel(level) {
      const { levels, levelVal } = this;
      return levels && levels.labels ? levels.labels[levelVal] : "";
    }
    function isLevelEnabled(logLevel) {
      const { values } = this.levels;
      const logLevelVal = values[logLevel];
      return logLevelVal !== void 0 && this[levelCompSym](logLevelVal, this[levelValSym]);
    }
    function compareLevel(direction, current, expected) {
      if (direction === SORTING_ORDER.DESC) {
        return current <= expected;
      }
      return current >= expected;
    }
    function genLevelComparison(levelComparison) {
      if (typeof levelComparison === "string") {
        return compareLevel.bind(null, levelComparison);
      }
      return levelComparison;
    }
    function mappings(customLevels = null, useOnlyCustomLevels = false) {
      const customNums = customLevels ? Object.keys(customLevels).reduce((o, k) => {
        o[customLevels[k]] = k;
        return o;
      }, {}) : null;
      const labels = Object.assign(
        Object.create(Object.prototype, { Infinity: { value: "silent" } }),
        useOnlyCustomLevels ? null : nums,
        customNums
      );
      const values = Object.assign(
        Object.create(Object.prototype, { silent: { value: Infinity } }),
        useOnlyCustomLevels ? null : DEFAULT_LEVELS,
        customLevels
      );
      return { labels, values };
    }
    function assertDefaultLevelFound(defaultLevel, customLevels, useOnlyCustomLevels) {
      if (typeof defaultLevel === "number") {
        const values = [].concat(
          Object.keys(customLevels || {}).map((key) => customLevels[key]),
          useOnlyCustomLevels ? [] : Object.keys(nums).map((level) => +level),
          Infinity
        );
        if (!values.includes(defaultLevel)) {
          throw Error(`default level:${defaultLevel} must be included in custom levels`);
        }
        return;
      }
      const labels = Object.assign(
        Object.create(Object.prototype, { silent: { value: Infinity } }),
        useOnlyCustomLevels ? null : DEFAULT_LEVELS,
        customLevels
      );
      if (!(defaultLevel in labels)) {
        throw Error(`default level:${defaultLevel} must be included in custom levels`);
      }
    }
    function assertNoLevelCollisions(levels, customLevels) {
      const { labels, values } = levels;
      for (const k in customLevels) {
        if (k in values) {
          throw Error("levels cannot be overridden");
        }
        if (customLevels[k] in labels) {
          throw Error("pre-existing level values cannot be used for new levels");
        }
      }
    }
    function assertLevelComparison(levelComparison) {
      if (typeof levelComparison === "function") {
        return;
      }
      if (typeof levelComparison === "string" && Object.values(SORTING_ORDER).includes(levelComparison)) {
        return;
      }
      throw new Error('Levels comparison should be one of "ASC", "DESC" or "function" type');
    }
    module.exports = {
      initialLsCache,
      genLsCache,
      levelMethods,
      getLevel,
      setLevel,
      isLevelEnabled,
      mappings,
      assertNoLevelCollisions,
      assertDefaultLevelFound,
      genLevelComparison,
      assertLevelComparison
    };
  }
});

// ../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/meta.js
var require_meta = __commonJS({
  "../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/meta.js"(exports, module) {
    "use strict";
    module.exports = { version: "9.14.0" };
  }
});

// ../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/proto.js
var require_proto = __commonJS({
  "../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/proto.js"(exports, module) {
    "use strict";
    var { EventEmitter } = __require("node:events");
    var {
      lsCacheSym,
      levelValSym,
      setLevelSym,
      getLevelSym,
      chindingsSym,
      parsedChindingsSym,
      mixinSym,
      asJsonSym,
      writeSym,
      mixinMergeStrategySym,
      timeSym,
      timeSliceIndexSym,
      streamSym,
      serializersSym,
      formattersSym,
      errorKeySym,
      messageKeySym,
      useOnlyCustomLevelsSym,
      needsMetadataGsym,
      redactFmtSym,
      stringifySym,
      formatOptsSym,
      stringifiersSym,
      msgPrefixSym,
      hooksSym
    } = require_symbols();
    var {
      getLevel,
      setLevel,
      isLevelEnabled,
      mappings,
      initialLsCache,
      genLsCache,
      assertNoLevelCollisions
    } = require_levels();
    var {
      asChindings,
      asJson,
      buildFormatters,
      stringify,
      noop
    } = require_tools();
    var {
      version
    } = require_meta();
    var redaction = require_redaction();
    var constructor = class Pino {
    };
    var prototype = {
      constructor,
      child,
      bindings,
      setBindings,
      flush,
      isLevelEnabled,
      version,
      get level() {
        return this[getLevelSym]();
      },
      set level(lvl) {
        this[setLevelSym](lvl);
      },
      get levelVal() {
        return this[levelValSym];
      },
      set levelVal(n) {
        throw Error("levelVal is read-only");
      },
      get msgPrefix() {
        return this[msgPrefixSym];
      },
      get [Symbol.toStringTag]() {
        return "Pino";
      },
      [lsCacheSym]: initialLsCache,
      [writeSym]: write,
      [asJsonSym]: asJson,
      [getLevelSym]: getLevel,
      [setLevelSym]: setLevel
    };
    Object.setPrototypeOf(prototype, EventEmitter.prototype);
    module.exports = function() {
      return Object.create(prototype);
    };
    var resetChildingsFormatter = (bindings2) => bindings2;
    function child(bindings2, options) {
      if (!bindings2) {
        throw Error("missing bindings for child Pino");
      }
      const serializers = this[serializersSym];
      const formatters = this[formattersSym];
      const instance = Object.create(this);
      if (options == null) {
        if (instance[formattersSym].bindings !== resetChildingsFormatter) {
          instance[formattersSym] = buildFormatters(
            formatters.level,
            resetChildingsFormatter,
            formatters.log
          );
        }
        instance[chindingsSym] = asChindings(instance, bindings2);
        instance[setLevelSym](this.level);
        if (this.onChild !== noop) {
          this.onChild(instance);
        }
        return instance;
      }
      if (options.hasOwnProperty("serializers") === true) {
        instance[serializersSym] = /* @__PURE__ */ Object.create(null);
        for (const k in serializers) {
          instance[serializersSym][k] = serializers[k];
        }
        const parentSymbols = Object.getOwnPropertySymbols(serializers);
        for (var i = 0; i < parentSymbols.length; i++) {
          const ks = parentSymbols[i];
          instance[serializersSym][ks] = serializers[ks];
        }
        for (const bk in options.serializers) {
          instance[serializersSym][bk] = options.serializers[bk];
        }
        const bindingsSymbols = Object.getOwnPropertySymbols(options.serializers);
        for (var bi = 0; bi < bindingsSymbols.length; bi++) {
          const bks = bindingsSymbols[bi];
          instance[serializersSym][bks] = options.serializers[bks];
        }
      } else instance[serializersSym] = serializers;
      if (options.hasOwnProperty("formatters")) {
        const { level, bindings: chindings, log } = options.formatters;
        instance[formattersSym] = buildFormatters(
          level || formatters.level,
          chindings || resetChildingsFormatter,
          log || formatters.log
        );
      } else {
        instance[formattersSym] = buildFormatters(
          formatters.level,
          resetChildingsFormatter,
          formatters.log
        );
      }
      if (options.hasOwnProperty("customLevels") === true) {
        assertNoLevelCollisions(this.levels, options.customLevels);
        instance.levels = mappings(options.customLevels, instance[useOnlyCustomLevelsSym]);
        genLsCache(instance);
      }
      if (typeof options.redact === "object" && options.redact !== null || Array.isArray(options.redact)) {
        instance.redact = options.redact;
        const stringifiers = redaction(instance.redact, stringify);
        const formatOpts = { stringify: stringifiers[redactFmtSym] };
        instance[stringifySym] = stringify;
        instance[stringifiersSym] = stringifiers;
        instance[formatOptsSym] = formatOpts;
      }
      if (typeof options.msgPrefix === "string") {
        instance[msgPrefixSym] = (this[msgPrefixSym] || "") + options.msgPrefix;
      }
      instance[chindingsSym] = asChindings(instance, bindings2);
      const childLevel = options.level || this.level;
      instance[setLevelSym](childLevel);
      this.onChild(instance);
      return instance;
    }
    function bindings() {
      const chindings = this[chindingsSym];
      const chindingsJson = `{${chindings.substr(1)}}`;
      const bindingsFromJson = JSON.parse(chindingsJson);
      delete bindingsFromJson.pid;
      delete bindingsFromJson.hostname;
      return bindingsFromJson;
    }
    function setBindings(newBindings) {
      const chindings = asChindings(this, newBindings);
      this[chindingsSym] = chindings;
      delete this[parsedChindingsSym];
    }
    function defaultMixinMergeStrategy(mergeObject, mixinObject) {
      return Object.assign(mixinObject, mergeObject);
    }
    function write(_obj, msg, num) {
      const t = this[timeSym]();
      const mixin = this[mixinSym];
      const errorKey = this[errorKeySym];
      const messageKey = this[messageKeySym];
      const mixinMergeStrategy = this[mixinMergeStrategySym] || defaultMixinMergeStrategy;
      let obj;
      const streamWriteHook = this[hooksSym].streamWrite;
      if (_obj === void 0 || _obj === null) {
        obj = {};
      } else if (_obj instanceof Error) {
        obj = { [errorKey]: _obj };
        if (msg === void 0) {
          msg = _obj.message;
        }
      } else {
        obj = _obj;
        if (msg === void 0 && _obj[messageKey] === void 0 && _obj[errorKey]) {
          msg = _obj[errorKey].message;
        }
      }
      if (mixin) {
        obj = mixinMergeStrategy(obj, mixin(obj, num, this));
      }
      const s = this[asJsonSym](obj, msg, num, t);
      const stream = this[streamSym];
      if (stream[needsMetadataGsym] === true) {
        stream.lastLevel = num;
        stream.lastObj = obj;
        stream.lastMsg = msg;
        stream.lastTime = t.slice(this[timeSliceIndexSym]);
        stream.lastLogger = this;
      }
      stream.write(streamWriteHook ? streamWriteHook(s) : s);
    }
    function flush(cb) {
      if (cb != null && typeof cb !== "function") {
        throw Error("callback must be a function");
      }
      const stream = this[streamSym];
      if (typeof stream.flush === "function") {
        stream.flush(cb || noop);
      } else if (cb) cb();
    }
  }
});

// ../../node_modules/.pnpm/safe-stable-stringify@2.5.0/node_modules/safe-stable-stringify/index.js
var require_safe_stable_stringify = __commonJS({
  "../../node_modules/.pnpm/safe-stable-stringify@2.5.0/node_modules/safe-stable-stringify/index.js"(exports, module) {
    "use strict";
    var { hasOwnProperty } = Object.prototype;
    var stringify = configure();
    stringify.configure = configure;
    stringify.stringify = stringify;
    stringify.default = stringify;
    exports.stringify = stringify;
    exports.configure = configure;
    module.exports = stringify;
    var strEscapeSequencesRegExp = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]/;
    function strEscape(str) {
      if (str.length < 5e3 && !strEscapeSequencesRegExp.test(str)) {
        return `"${str}"`;
      }
      return JSON.stringify(str);
    }
    function sort(array, comparator) {
      if (array.length > 200 || comparator) {
        return array.sort(comparator);
      }
      for (let i = 1; i < array.length; i++) {
        const currentValue = array[i];
        let position = i;
        while (position !== 0 && array[position - 1] > currentValue) {
          array[position] = array[position - 1];
          position--;
        }
        array[position] = currentValue;
      }
      return array;
    }
    var typedArrayPrototypeGetSymbolToStringTag = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(
        Object.getPrototypeOf(
          new Int8Array()
        )
      ),
      Symbol.toStringTag
    ).get;
    function isTypedArrayWithEntries(value) {
      return typedArrayPrototypeGetSymbolToStringTag.call(value) !== void 0 && value.length !== 0;
    }
    function stringifyTypedArray(array, separator, maximumBreadth) {
      if (array.length < maximumBreadth) {
        maximumBreadth = array.length;
      }
      const whitespace = separator === "," ? "" : " ";
      let res = `"0":${whitespace}${array[0]}`;
      for (let i = 1; i < maximumBreadth; i++) {
        res += `${separator}"${i}":${whitespace}${array[i]}`;
      }
      return res;
    }
    function getCircularValueOption(options) {
      if (hasOwnProperty.call(options, "circularValue")) {
        const circularValue = options.circularValue;
        if (typeof circularValue === "string") {
          return `"${circularValue}"`;
        }
        if (circularValue == null) {
          return circularValue;
        }
        if (circularValue === Error || circularValue === TypeError) {
          return {
            toString() {
              throw new TypeError("Converting circular structure to JSON");
            }
          };
        }
        throw new TypeError('The "circularValue" argument must be of type string or the value null or undefined');
      }
      return '"[Circular]"';
    }
    function getDeterministicOption(options) {
      let value;
      if (hasOwnProperty.call(options, "deterministic")) {
        value = options.deterministic;
        if (typeof value !== "boolean" && typeof value !== "function") {
          throw new TypeError('The "deterministic" argument must be of type boolean or comparator function');
        }
      }
      return value === void 0 ? true : value;
    }
    function getBooleanOption(options, key) {
      let value;
      if (hasOwnProperty.call(options, key)) {
        value = options[key];
        if (typeof value !== "boolean") {
          throw new TypeError(`The "${key}" argument must be of type boolean`);
        }
      }
      return value === void 0 ? true : value;
    }
    function getPositiveIntegerOption(options, key) {
      let value;
      if (hasOwnProperty.call(options, key)) {
        value = options[key];
        if (typeof value !== "number") {
          throw new TypeError(`The "${key}" argument must be of type number`);
        }
        if (!Number.isInteger(value)) {
          throw new TypeError(`The "${key}" argument must be an integer`);
        }
        if (value < 1) {
          throw new RangeError(`The "${key}" argument must be >= 1`);
        }
      }
      return value === void 0 ? Infinity : value;
    }
    function getItemCount(number) {
      if (number === 1) {
        return "1 item";
      }
      return `${number} items`;
    }
    function getUniqueReplacerSet(replacerArray) {
      const replacerSet = /* @__PURE__ */ new Set();
      for (const value of replacerArray) {
        if (typeof value === "string" || typeof value === "number") {
          replacerSet.add(String(value));
        }
      }
      return replacerSet;
    }
    function getStrictOption(options) {
      if (hasOwnProperty.call(options, "strict")) {
        const value = options.strict;
        if (typeof value !== "boolean") {
          throw new TypeError('The "strict" argument must be of type boolean');
        }
        if (value) {
          return (value2) => {
            let message = `Object can not safely be stringified. Received type ${typeof value2}`;
            if (typeof value2 !== "function") message += ` (${value2.toString()})`;
            throw new Error(message);
          };
        }
      }
    }
    function configure(options) {
      options = { ...options };
      const fail = getStrictOption(options);
      if (fail) {
        if (options.bigint === void 0) {
          options.bigint = false;
        }
        if (!("circularValue" in options)) {
          options.circularValue = Error;
        }
      }
      const circularValue = getCircularValueOption(options);
      const bigint = getBooleanOption(options, "bigint");
      const deterministic = getDeterministicOption(options);
      const comparator = typeof deterministic === "function" ? deterministic : void 0;
      const maximumDepth = getPositiveIntegerOption(options, "maximumDepth");
      const maximumBreadth = getPositiveIntegerOption(options, "maximumBreadth");
      function stringifyFnReplacer(key, parent, stack, replacer, spacer, indentation) {
        let value = parent[key];
        if (typeof value === "object" && value !== null && typeof value.toJSON === "function") {
          value = value.toJSON(key);
        }
        value = replacer.call(parent, key, value);
        switch (typeof value) {
          case "string":
            return strEscape(value);
          case "object": {
            if (value === null) {
              return "null";
            }
            if (stack.indexOf(value) !== -1) {
              return circularValue;
            }
            let res = "";
            let join = ",";
            const originalIndentation = indentation;
            if (Array.isArray(value)) {
              if (value.length === 0) {
                return "[]";
              }
              if (maximumDepth < stack.length + 1) {
                return '"[Array]"';
              }
              stack.push(value);
              if (spacer !== "") {
                indentation += spacer;
                res += `
${indentation}`;
                join = `,
${indentation}`;
              }
              const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
              let i = 0;
              for (; i < maximumValuesToStringify - 1; i++) {
                const tmp2 = stringifyFnReplacer(String(i), value, stack, replacer, spacer, indentation);
                res += tmp2 !== void 0 ? tmp2 : "null";
                res += join;
              }
              const tmp = stringifyFnReplacer(String(i), value, stack, replacer, spacer, indentation);
              res += tmp !== void 0 ? tmp : "null";
              if (value.length - 1 > maximumBreadth) {
                const removedKeys = value.length - maximumBreadth - 1;
                res += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
              }
              if (spacer !== "") {
                res += `
${originalIndentation}`;
              }
              stack.pop();
              return `[${res}]`;
            }
            let keys = Object.keys(value);
            const keyLength = keys.length;
            if (keyLength === 0) {
              return "{}";
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Object]"';
            }
            let whitespace = "";
            let separator = "";
            if (spacer !== "") {
              indentation += spacer;
              join = `,
${indentation}`;
              whitespace = " ";
            }
            const maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
            if (deterministic && !isTypedArrayWithEntries(value)) {
              keys = sort(keys, comparator);
            }
            stack.push(value);
            for (let i = 0; i < maximumPropertiesToStringify; i++) {
              const key2 = keys[i];
              const tmp = stringifyFnReplacer(key2, value, stack, replacer, spacer, indentation);
              if (tmp !== void 0) {
                res += `${separator}${strEscape(key2)}:${whitespace}${tmp}`;
                separator = join;
              }
            }
            if (keyLength > maximumBreadth) {
              const removedKeys = keyLength - maximumBreadth;
              res += `${separator}"...":${whitespace}"${getItemCount(removedKeys)} not stringified"`;
              separator = join;
            }
            if (spacer !== "" && separator.length > 1) {
              res = `
${indentation}${res}
${originalIndentation}`;
            }
            stack.pop();
            return `{${res}}`;
          }
          case "number":
            return isFinite(value) ? String(value) : fail ? fail(value) : "null";
          case "boolean":
            return value === true ? "true" : "false";
          case "undefined":
            return void 0;
          case "bigint":
            if (bigint) {
              return String(value);
            }
          // fallthrough
          default:
            return fail ? fail(value) : void 0;
        }
      }
      function stringifyArrayReplacer(key, value, stack, replacer, spacer, indentation) {
        if (typeof value === "object" && value !== null && typeof value.toJSON === "function") {
          value = value.toJSON(key);
        }
        switch (typeof value) {
          case "string":
            return strEscape(value);
          case "object": {
            if (value === null) {
              return "null";
            }
            if (stack.indexOf(value) !== -1) {
              return circularValue;
            }
            const originalIndentation = indentation;
            let res = "";
            let join = ",";
            if (Array.isArray(value)) {
              if (value.length === 0) {
                return "[]";
              }
              if (maximumDepth < stack.length + 1) {
                return '"[Array]"';
              }
              stack.push(value);
              if (spacer !== "") {
                indentation += spacer;
                res += `
${indentation}`;
                join = `,
${indentation}`;
              }
              const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
              let i = 0;
              for (; i < maximumValuesToStringify - 1; i++) {
                const tmp2 = stringifyArrayReplacer(String(i), value[i], stack, replacer, spacer, indentation);
                res += tmp2 !== void 0 ? tmp2 : "null";
                res += join;
              }
              const tmp = stringifyArrayReplacer(String(i), value[i], stack, replacer, spacer, indentation);
              res += tmp !== void 0 ? tmp : "null";
              if (value.length - 1 > maximumBreadth) {
                const removedKeys = value.length - maximumBreadth - 1;
                res += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
              }
              if (spacer !== "") {
                res += `
${originalIndentation}`;
              }
              stack.pop();
              return `[${res}]`;
            }
            stack.push(value);
            let whitespace = "";
            if (spacer !== "") {
              indentation += spacer;
              join = `,
${indentation}`;
              whitespace = " ";
            }
            let separator = "";
            for (const key2 of replacer) {
              const tmp = stringifyArrayReplacer(key2, value[key2], stack, replacer, spacer, indentation);
              if (tmp !== void 0) {
                res += `${separator}${strEscape(key2)}:${whitespace}${tmp}`;
                separator = join;
              }
            }
            if (spacer !== "" && separator.length > 1) {
              res = `
${indentation}${res}
${originalIndentation}`;
            }
            stack.pop();
            return `{${res}}`;
          }
          case "number":
            return isFinite(value) ? String(value) : fail ? fail(value) : "null";
          case "boolean":
            return value === true ? "true" : "false";
          case "undefined":
            return void 0;
          case "bigint":
            if (bigint) {
              return String(value);
            }
          // fallthrough
          default:
            return fail ? fail(value) : void 0;
        }
      }
      function stringifyIndent(key, value, stack, spacer, indentation) {
        switch (typeof value) {
          case "string":
            return strEscape(value);
          case "object": {
            if (value === null) {
              return "null";
            }
            if (typeof value.toJSON === "function") {
              value = value.toJSON(key);
              if (typeof value !== "object") {
                return stringifyIndent(key, value, stack, spacer, indentation);
              }
              if (value === null) {
                return "null";
              }
            }
            if (stack.indexOf(value) !== -1) {
              return circularValue;
            }
            const originalIndentation = indentation;
            if (Array.isArray(value)) {
              if (value.length === 0) {
                return "[]";
              }
              if (maximumDepth < stack.length + 1) {
                return '"[Array]"';
              }
              stack.push(value);
              indentation += spacer;
              let res2 = `
${indentation}`;
              const join2 = `,
${indentation}`;
              const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
              let i = 0;
              for (; i < maximumValuesToStringify - 1; i++) {
                const tmp2 = stringifyIndent(String(i), value[i], stack, spacer, indentation);
                res2 += tmp2 !== void 0 ? tmp2 : "null";
                res2 += join2;
              }
              const tmp = stringifyIndent(String(i), value[i], stack, spacer, indentation);
              res2 += tmp !== void 0 ? tmp : "null";
              if (value.length - 1 > maximumBreadth) {
                const removedKeys = value.length - maximumBreadth - 1;
                res2 += `${join2}"... ${getItemCount(removedKeys)} not stringified"`;
              }
              res2 += `
${originalIndentation}`;
              stack.pop();
              return `[${res2}]`;
            }
            let keys = Object.keys(value);
            const keyLength = keys.length;
            if (keyLength === 0) {
              return "{}";
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Object]"';
            }
            indentation += spacer;
            const join = `,
${indentation}`;
            let res = "";
            let separator = "";
            let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
            if (isTypedArrayWithEntries(value)) {
              res += stringifyTypedArray(value, join, maximumBreadth);
              keys = keys.slice(value.length);
              maximumPropertiesToStringify -= value.length;
              separator = join;
            }
            if (deterministic) {
              keys = sort(keys, comparator);
            }
            stack.push(value);
            for (let i = 0; i < maximumPropertiesToStringify; i++) {
              const key2 = keys[i];
              const tmp = stringifyIndent(key2, value[key2], stack, spacer, indentation);
              if (tmp !== void 0) {
                res += `${separator}${strEscape(key2)}: ${tmp}`;
                separator = join;
              }
            }
            if (keyLength > maximumBreadth) {
              const removedKeys = keyLength - maximumBreadth;
              res += `${separator}"...": "${getItemCount(removedKeys)} not stringified"`;
              separator = join;
            }
            if (separator !== "") {
              res = `
${indentation}${res}
${originalIndentation}`;
            }
            stack.pop();
            return `{${res}}`;
          }
          case "number":
            return isFinite(value) ? String(value) : fail ? fail(value) : "null";
          case "boolean":
            return value === true ? "true" : "false";
          case "undefined":
            return void 0;
          case "bigint":
            if (bigint) {
              return String(value);
            }
          // fallthrough
          default:
            return fail ? fail(value) : void 0;
        }
      }
      function stringifySimple(key, value, stack) {
        switch (typeof value) {
          case "string":
            return strEscape(value);
          case "object": {
            if (value === null) {
              return "null";
            }
            if (typeof value.toJSON === "function") {
              value = value.toJSON(key);
              if (typeof value !== "object") {
                return stringifySimple(key, value, stack);
              }
              if (value === null) {
                return "null";
              }
            }
            if (stack.indexOf(value) !== -1) {
              return circularValue;
            }
            let res = "";
            const hasLength = value.length !== void 0;
            if (hasLength && Array.isArray(value)) {
              if (value.length === 0) {
                return "[]";
              }
              if (maximumDepth < stack.length + 1) {
                return '"[Array]"';
              }
              stack.push(value);
              const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
              let i = 0;
              for (; i < maximumValuesToStringify - 1; i++) {
                const tmp2 = stringifySimple(String(i), value[i], stack);
                res += tmp2 !== void 0 ? tmp2 : "null";
                res += ",";
              }
              const tmp = stringifySimple(String(i), value[i], stack);
              res += tmp !== void 0 ? tmp : "null";
              if (value.length - 1 > maximumBreadth) {
                const removedKeys = value.length - maximumBreadth - 1;
                res += `,"... ${getItemCount(removedKeys)} not stringified"`;
              }
              stack.pop();
              return `[${res}]`;
            }
            let keys = Object.keys(value);
            const keyLength = keys.length;
            if (keyLength === 0) {
              return "{}";
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Object]"';
            }
            let separator = "";
            let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
            if (hasLength && isTypedArrayWithEntries(value)) {
              res += stringifyTypedArray(value, ",", maximumBreadth);
              keys = keys.slice(value.length);
              maximumPropertiesToStringify -= value.length;
              separator = ",";
            }
            if (deterministic) {
              keys = sort(keys, comparator);
            }
            stack.push(value);
            for (let i = 0; i < maximumPropertiesToStringify; i++) {
              const key2 = keys[i];
              const tmp = stringifySimple(key2, value[key2], stack);
              if (tmp !== void 0) {
                res += `${separator}${strEscape(key2)}:${tmp}`;
                separator = ",";
              }
            }
            if (keyLength > maximumBreadth) {
              const removedKeys = keyLength - maximumBreadth;
              res += `${separator}"...":"${getItemCount(removedKeys)} not stringified"`;
            }
            stack.pop();
            return `{${res}}`;
          }
          case "number":
            return isFinite(value) ? String(value) : fail ? fail(value) : "null";
          case "boolean":
            return value === true ? "true" : "false";
          case "undefined":
            return void 0;
          case "bigint":
            if (bigint) {
              return String(value);
            }
          // fallthrough
          default:
            return fail ? fail(value) : void 0;
        }
      }
      function stringify2(value, replacer, space) {
        if (arguments.length > 1) {
          let spacer = "";
          if (typeof space === "number") {
            spacer = " ".repeat(Math.min(space, 10));
          } else if (typeof space === "string") {
            spacer = space.slice(0, 10);
          }
          if (replacer != null) {
            if (typeof replacer === "function") {
              return stringifyFnReplacer("", { "": value }, [], replacer, spacer, "");
            }
            if (Array.isArray(replacer)) {
              return stringifyArrayReplacer("", value, [], getUniqueReplacerSet(replacer), spacer, "");
            }
          }
          if (spacer.length !== 0) {
            return stringifyIndent("", value, [], spacer, "");
          }
        }
        return stringifySimple("", value, []);
      }
      return stringify2;
    }
  }
});

// ../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/multistream.js
var require_multistream = __commonJS({
  "../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/multistream.js"(exports, module) {
    "use strict";
    var metadata = /* @__PURE__ */ Symbol.for("pino.metadata");
    var { DEFAULT_LEVELS } = require_constants();
    var DEFAULT_INFO_LEVEL = DEFAULT_LEVELS.info;
    function multistream(streamsArray, opts) {
      streamsArray = streamsArray || [];
      opts = opts || { dedupe: false };
      const streamLevels = Object.create(DEFAULT_LEVELS);
      streamLevels.silent = Infinity;
      if (opts.levels && typeof opts.levels === "object") {
        Object.keys(opts.levels).forEach((i) => {
          streamLevels[i] = opts.levels[i];
        });
      }
      const res = {
        write,
        add,
        remove,
        emit,
        flushSync,
        end,
        minLevel: 0,
        lastId: 0,
        streams: [],
        clone,
        [metadata]: true,
        streamLevels
      };
      if (Array.isArray(streamsArray)) {
        streamsArray.forEach(add, res);
      } else {
        add.call(res, streamsArray);
      }
      streamsArray = null;
      return res;
      function write(data) {
        let dest;
        const level = this.lastLevel;
        const { streams } = this;
        let recordedLevel = 0;
        let stream;
        for (let i = initLoopVar(streams.length, opts.dedupe); checkLoopVar(i, streams.length, opts.dedupe); i = adjustLoopVar(i, opts.dedupe)) {
          dest = streams[i];
          if (dest.level <= level) {
            if (recordedLevel !== 0 && recordedLevel !== dest.level) {
              break;
            }
            stream = dest.stream;
            if (stream[metadata]) {
              const { lastTime, lastMsg, lastObj, lastLogger } = this;
              stream.lastLevel = level;
              stream.lastTime = lastTime;
              stream.lastMsg = lastMsg;
              stream.lastObj = lastObj;
              stream.lastLogger = lastLogger;
            }
            stream.write(data);
            if (opts.dedupe) {
              recordedLevel = dest.level;
            }
          } else if (!opts.dedupe) {
            break;
          }
        }
      }
      function emit(...args) {
        for (const { stream } of this.streams) {
          if (typeof stream.emit === "function") {
            stream.emit(...args);
          }
        }
      }
      function flushSync() {
        for (const { stream } of this.streams) {
          if (typeof stream.flushSync === "function") {
            stream.flushSync();
          }
        }
      }
      function add(dest) {
        if (!dest) {
          return res;
        }
        const isStream = typeof dest.write === "function" || dest.stream;
        const stream_ = dest.write ? dest : dest.stream;
        if (!isStream) {
          throw Error("stream object needs to implement either StreamEntry or DestinationStream interface");
        }
        const { streams, streamLevels: streamLevels2 } = this;
        let level;
        if (typeof dest.levelVal === "number") {
          level = dest.levelVal;
        } else if (typeof dest.level === "string") {
          level = streamLevels2[dest.level];
        } else if (typeof dest.level === "number") {
          level = dest.level;
        } else {
          level = DEFAULT_INFO_LEVEL;
        }
        const dest_ = {
          stream: stream_,
          level,
          levelVal: void 0,
          id: ++res.lastId
        };
        streams.unshift(dest_);
        streams.sort(compareByLevel);
        this.minLevel = streams[0].level;
        return res;
      }
      function remove(id) {
        const { streams } = this;
        const index = streams.findIndex((s) => s.id === id);
        if (index >= 0) {
          streams.splice(index, 1);
          streams.sort(compareByLevel);
          this.minLevel = streams.length > 0 ? streams[0].level : -1;
        }
        return res;
      }
      function end() {
        for (const { stream } of this.streams) {
          if (typeof stream.flushSync === "function") {
            stream.flushSync();
          }
          stream.end();
        }
      }
      function clone(level) {
        const streams = new Array(this.streams.length);
        for (let i = 0; i < streams.length; i++) {
          streams[i] = {
            level,
            stream: this.streams[i].stream
          };
        }
        return {
          write,
          add,
          remove,
          minLevel: level,
          streams,
          clone,
          emit,
          flushSync,
          [metadata]: true
        };
      }
    }
    function compareByLevel(a, b) {
      return a.level - b.level;
    }
    function initLoopVar(length, dedupe) {
      return dedupe ? length - 1 : 0;
    }
    function adjustLoopVar(i, dedupe) {
      return dedupe ? i - 1 : i + 1;
    }
    function checkLoopVar(i, length, dedupe) {
      return dedupe ? i >= 0 : i < length;
    }
    module.exports = multistream;
  }
});

// ../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/pino.js
var require_pino = __commonJS({
  "../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/pino.js"(exports, module) {
    function pinoBundlerAbsolutePath(p) {
      try {
        const path = __require("path");
        const outputDir = "C:\\Users\\Admin\\OneDrive\\Desktop\\31stfile content\\api";
        return path.resolve(outputDir, p.replace(/^\.\//, ""));
      } catch (e) {
        const f = new Function("p", "return new URL(p, import.meta.url).pathname");
        return f(p);
      }
    }
    globalThis.__bundlerPathsOverrides = { ...globalThis.__bundlerPathsOverrides || {}, "thread-stream-worker": pinoBundlerAbsolutePath("./thread-stream-worker.js"), "pino-worker": pinoBundlerAbsolutePath("./pino-worker.js"), "pino/file": pinoBundlerAbsolutePath("./pino-file.js"), "pino-pretty": pinoBundlerAbsolutePath("./pino-pretty.js") };
    var os = __require("node:os");
    var stdSerializers = require_pino_std_serializers();
    var caller = require_caller();
    var redaction = require_redaction();
    var time = require_time();
    var proto = require_proto();
    var symbols = require_symbols();
    var { configure } = require_safe_stable_stringify();
    var { assertDefaultLevelFound, mappings, genLsCache, genLevelComparison, assertLevelComparison } = require_levels();
    var { DEFAULT_LEVELS, SORTING_ORDER } = require_constants();
    var {
      createArgsNormalizer,
      asChindings,
      buildSafeSonicBoom,
      buildFormatters,
      stringify,
      normalizeDestFileDescriptor,
      noop
    } = require_tools();
    var { version } = require_meta();
    var {
      chindingsSym,
      redactFmtSym,
      serializersSym,
      timeSym,
      timeSliceIndexSym,
      streamSym,
      stringifySym,
      stringifySafeSym,
      stringifiersSym,
      setLevelSym,
      endSym,
      formatOptsSym,
      messageKeySym,
      errorKeySym,
      nestedKeySym,
      mixinSym,
      levelCompSym,
      useOnlyCustomLevelsSym,
      formattersSym,
      hooksSym,
      nestedKeyStrSym,
      mixinMergeStrategySym,
      msgPrefixSym
    } = symbols;
    var { epochTime, nullTime } = time;
    var { pid } = process;
    var hostname = os.hostname();
    var defaultErrorSerializer = stdSerializers.err;
    var defaultOptions = {
      level: "info",
      levelComparison: SORTING_ORDER.ASC,
      levels: DEFAULT_LEVELS,
      messageKey: "msg",
      errorKey: "err",
      nestedKey: null,
      enabled: true,
      base: { pid, hostname },
      serializers: Object.assign(/* @__PURE__ */ Object.create(null), {
        err: defaultErrorSerializer
      }),
      formatters: Object.assign(/* @__PURE__ */ Object.create(null), {
        bindings(bindings) {
          return bindings;
        },
        level(label, number) {
          return { level: number };
        }
      }),
      hooks: {
        logMethod: void 0,
        streamWrite: void 0
      },
      timestamp: epochTime,
      name: void 0,
      redact: null,
      customLevels: null,
      useOnlyCustomLevels: false,
      depthLimit: 5,
      edgeLimit: 100
    };
    var normalize = createArgsNormalizer(defaultOptions);
    var serializers = Object.assign(/* @__PURE__ */ Object.create(null), stdSerializers);
    function pino(...args) {
      const instance = {};
      const { opts, stream } = normalize(instance, caller(), ...args);
      if (opts.level && typeof opts.level === "string" && DEFAULT_LEVELS[opts.level.toLowerCase()] !== void 0) opts.level = opts.level.toLowerCase();
      const {
        redact,
        crlf,
        serializers: serializers2,
        timestamp,
        messageKey,
        errorKey,
        nestedKey,
        base,
        name,
        level,
        customLevels,
        levelComparison,
        mixin,
        mixinMergeStrategy,
        useOnlyCustomLevels,
        formatters,
        hooks,
        depthLimit,
        edgeLimit,
        onChild,
        msgPrefix
      } = opts;
      const stringifySafe = configure({
        maximumDepth: depthLimit,
        maximumBreadth: edgeLimit
      });
      const allFormatters = buildFormatters(
        formatters.level,
        formatters.bindings,
        formatters.log
      );
      const stringifyFn = stringify.bind({
        [stringifySafeSym]: stringifySafe
      });
      const stringifiers = redact ? redaction(redact, stringifyFn) : {};
      const formatOpts = redact ? { stringify: stringifiers[redactFmtSym] } : { stringify: stringifyFn };
      const end = "}" + (crlf ? "\r\n" : "\n");
      const coreChindings = asChindings.bind(null, {
        [chindingsSym]: "",
        [serializersSym]: serializers2,
        [stringifiersSym]: stringifiers,
        [stringifySym]: stringify,
        [stringifySafeSym]: stringifySafe,
        [formattersSym]: allFormatters
      });
      let chindings = "";
      if (base !== null) {
        if (name === void 0) {
          chindings = coreChindings(base);
        } else {
          chindings = coreChindings(Object.assign({}, base, { name }));
        }
      }
      const time2 = timestamp instanceof Function ? timestamp : timestamp ? epochTime : nullTime;
      const timeSliceIndex = time2().indexOf(":") + 1;
      if (useOnlyCustomLevels && !customLevels) throw Error("customLevels is required if useOnlyCustomLevels is set true");
      if (mixin && typeof mixin !== "function") throw Error(`Unknown mixin type "${typeof mixin}" - expected "function"`);
      if (msgPrefix && typeof msgPrefix !== "string") throw Error(`Unknown msgPrefix type "${typeof msgPrefix}" - expected "string"`);
      assertDefaultLevelFound(level, customLevels, useOnlyCustomLevels);
      const levels = mappings(customLevels, useOnlyCustomLevels);
      if (typeof stream.emit === "function") {
        stream.emit("message", { code: "PINO_CONFIG", config: { levels, messageKey, errorKey } });
      }
      assertLevelComparison(levelComparison);
      const levelCompFunc = genLevelComparison(levelComparison);
      Object.assign(instance, {
        levels,
        [levelCompSym]: levelCompFunc,
        [useOnlyCustomLevelsSym]: useOnlyCustomLevels,
        [streamSym]: stream,
        [timeSym]: time2,
        [timeSliceIndexSym]: timeSliceIndex,
        [stringifySym]: stringify,
        [stringifySafeSym]: stringifySafe,
        [stringifiersSym]: stringifiers,
        [endSym]: end,
        [formatOptsSym]: formatOpts,
        [messageKeySym]: messageKey,
        [errorKeySym]: errorKey,
        [nestedKeySym]: nestedKey,
        // protect against injection
        [nestedKeyStrSym]: nestedKey ? `,${JSON.stringify(nestedKey)}:{` : "",
        [serializersSym]: serializers2,
        [mixinSym]: mixin,
        [mixinMergeStrategySym]: mixinMergeStrategy,
        [chindingsSym]: chindings,
        [formattersSym]: allFormatters,
        [hooksSym]: hooks,
        silent: noop,
        onChild,
        [msgPrefixSym]: msgPrefix
      });
      Object.setPrototypeOf(instance, proto());
      genLsCache(instance);
      instance[setLevelSym](level);
      return instance;
    }
    module.exports = pino;
    module.exports.destination = (dest = process.stdout.fd) => {
      if (typeof dest === "object") {
        dest.dest = normalizeDestFileDescriptor(dest.dest || process.stdout.fd);
        return buildSafeSonicBoom(dest);
      } else {
        return buildSafeSonicBoom({ dest: normalizeDestFileDescriptor(dest), minLength: 0 });
      }
    };
    module.exports.transport = require_transport();
    module.exports.multistream = require_multistream();
    module.exports.levels = mappings();
    module.exports.stdSerializers = serializers;
    module.exports.stdTimeFunctions = Object.assign({}, time);
    module.exports.symbols = symbols;
    module.exports.version = version;
    module.exports.default = pino;
    module.exports.pino = pino;
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

// ../../node_modules/.pnpm/pino-abstract-transport@2.0.0/node_modules/pino-abstract-transport/index.js
var require_pino_abstract_transport = __commonJS({
  "../../node_modules/.pnpm/pino-abstract-transport@2.0.0/node_modules/pino-abstract-transport/index.js"(exports, module) {
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

// ../../node_modules/.pnpm/real-require@0.2.0/node_modules/real-require/src/index.js
var require_src = __commonJS({
  "../../node_modules/.pnpm/real-require@0.2.0/node_modules/real-require/src/index.js"(exports, module) {
    var realImport = new Function("modulePath", "return import(modulePath)");
    function realRequire(modulePath) {
      if (typeof __non_webpack__require__ === "function") {
        return __non_webpack__require__(modulePath);
      }
      return __require(modulePath);
    }
    module.exports = { realImport, realRequire };
  }
});

// ../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/transport-stream.js
var require_transport_stream = __commonJS({
  "../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/transport-stream.js"(exports, module) {
    "use strict";
    var { realImport, realRequire } = require_src();
    module.exports = loadTransportStreamBuilder;
    async function loadTransportStreamBuilder(target) {
      let fn;
      try {
        const toLoad = target.startsWith("file://") ? target : "file://" + target;
        if (toLoad.endsWith(".ts") || toLoad.endsWith(".cts")) {
          if (process[/* @__PURE__ */ Symbol.for("ts-node.register.instance")]) {
            realRequire("ts-node/register");
          } else if (process.env && process.env.TS_NODE_DEV) {
            realRequire("ts-node-dev");
          }
          fn = realRequire(decodeURIComponent(target));
        } else {
          fn = await realImport(toLoad);
        }
      } catch (error) {
        if (error.code === "ENOTDIR" || error.code === "ERR_MODULE_NOT_FOUND") {
          fn = realRequire(target);
        } else if (error.code === void 0 || error.code === "ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING") {
          try {
            fn = realRequire(decodeURIComponent(target));
          } catch {
            throw error;
          }
        } else {
          throw error;
        }
      }
      if (typeof fn === "object") fn = fn.default;
      if (typeof fn === "object") fn = fn.default;
      if (typeof fn !== "function") throw Error("exported worker is not a function");
      return fn;
    }
  }
});

// ../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/worker.js
var require_worker = __commonJS({
  "../../node_modules/.pnpm/pino@9.14.0/node_modules/pino/lib/worker.js"(exports, module) {
    var EE = __require("node:events");
    var { pipeline, PassThrough } = __require("node:stream");
    var pino = require_pino();
    var build = require_pino_abstract_transport();
    var loadTransportStreamBuilder = require_transport_stream();
    module.exports = async function({ targets, pipelines, levels, dedupe }) {
      const targetStreams = [];
      if (targets && targets.length) {
        targets = await Promise.all(targets.map(async (t) => {
          const fn = await loadTransportStreamBuilder(t.target);
          const stream = await fn(t.options);
          return {
            level: t.level,
            stream
          };
        }));
        targetStreams.push(...targets);
      }
      if (pipelines && pipelines.length) {
        pipelines = await Promise.all(
          pipelines.map(async (p) => {
            let level;
            const pipeDests = await Promise.all(
              p.map(
                async (t) => {
                  level = t.level;
                  const fn = await loadTransportStreamBuilder(t.target);
                  const stream = await fn(t.options);
                  return stream;
                }
              )
            );
            return {
              level,
              stream: createPipeline(pipeDests)
            };
          })
        );
        targetStreams.push(...pipelines);
      }
      if (targetStreams.length === 1) {
        return targetStreams[0].stream;
      } else {
        return build(process2, {
          parse: "lines",
          metadata: true,
          close(err, cb) {
            let expected = 0;
            for (const transport of targetStreams) {
              expected++;
              transport.stream.on("close", closeCb);
              transport.stream.end();
            }
            function closeCb() {
              if (--expected === 0) {
                cb(err);
              }
            }
          }
        });
      }
      function process2(stream) {
        const multi = pino.multistream(targetStreams, { levels, dedupe });
        stream.on("data", function(chunk) {
          const { lastTime, lastMsg, lastObj, lastLevel } = this;
          multi.lastLevel = lastLevel;
          multi.lastTime = lastTime;
          multi.lastMsg = lastMsg;
          multi.lastObj = lastObj;
          multi.write(chunk + "\n");
        });
      }
      function createPipeline(streams) {
        const ee = new EE();
        const stream = new PassThrough({
          autoDestroy: true,
          destroy(_, cb) {
            ee.on("error", cb);
            ee.on("closed", cb);
          }
        });
        pipeline(stream, ...streams, function(err) {
          if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
            ee.emit("error", err);
            return;
          }
          ee.emit("closed");
        });
        return stream;
      }
    };
  }
});
export default require_worker();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3Bpbm8tc3RkLXNlcmlhbGl6ZXJzQDcuMS4wL25vZGVfbW9kdWxlcy9waW5vLXN0ZC1zZXJpYWxpemVycy9saWIvZXJyLWhlbHBlcnMuanMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3Bpbm8tc3RkLXNlcmlhbGl6ZXJzQDcuMS4wL25vZGVfbW9kdWxlcy9waW5vLXN0ZC1zZXJpYWxpemVycy9saWIvZXJyLXByb3RvLmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9waW5vLXN0ZC1zZXJpYWxpemVyc0A3LjEuMC9ub2RlX21vZHVsZXMvcGluby1zdGQtc2VyaWFsaXplcnMvbGliL2Vyci5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vcGluby1zdGQtc2VyaWFsaXplcnNANy4xLjAvbm9kZV9tb2R1bGVzL3Bpbm8tc3RkLXNlcmlhbGl6ZXJzL2xpYi9lcnItd2l0aC1jYXVzZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vcGluby1zdGQtc2VyaWFsaXplcnNANy4xLjAvbm9kZV9tb2R1bGVzL3Bpbm8tc3RkLXNlcmlhbGl6ZXJzL2xpYi9yZXEuanMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3Bpbm8tc3RkLXNlcmlhbGl6ZXJzQDcuMS4wL25vZGVfbW9kdWxlcy9waW5vLXN0ZC1zZXJpYWxpemVycy9saWIvcmVzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9waW5vLXN0ZC1zZXJpYWxpemVyc0A3LjEuMC9ub2RlX21vZHVsZXMvcGluby1zdGQtc2VyaWFsaXplcnMvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3Bpbm9AOS4xNC4wL25vZGVfbW9kdWxlcy9waW5vL2xpYi9jYWxsZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BwaW5vanMrcmVkYWN0QDAuNC4wL25vZGVfbW9kdWxlcy9AcGlub2pzL3JlZGFjdC9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vcGlub0A5LjE0LjAvbm9kZV9tb2R1bGVzL3Bpbm8vbGliL3N5bWJvbHMuanMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3Bpbm9AOS4xNC4wL25vZGVfbW9kdWxlcy9waW5vL2xpYi9yZWRhY3Rpb24uanMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3Bpbm9AOS4xNC4wL25vZGVfbW9kdWxlcy9waW5vL2xpYi90aW1lLmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9xdWljay1mb3JtYXQtdW5lc2NhcGVkQDQuMC40L25vZGVfbW9kdWxlcy9xdWljay1mb3JtYXQtdW5lc2NhcGVkL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9hdG9taWMtc2xlZXBAMS4wLjAvbm9kZV9tb2R1bGVzL2F0b21pYy1zbGVlcC9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vc29uaWMtYm9vbUA0LjIuMS9ub2RlX21vZHVsZXMvc29uaWMtYm9vbS9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vb24tZXhpdC1sZWFrLWZyZWVAMi4xLjIvbm9kZV9tb2R1bGVzL29uLWV4aXQtbGVhay1mcmVlL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS90aHJlYWQtc3RyZWFtQDMuMS4wL25vZGVfbW9kdWxlcy90aHJlYWQtc3RyZWFtL3BhY2thZ2UuanNvbiIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vdGhyZWFkLXN0cmVhbUAzLjEuMC9ub2RlX21vZHVsZXMvdGhyZWFkLXN0cmVhbS9saWIvd2FpdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vdGhyZWFkLXN0cmVhbUAzLjEuMC9ub2RlX21vZHVsZXMvdGhyZWFkLXN0cmVhbS9saWIvaW5kZXhlcy5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vdGhyZWFkLXN0cmVhbUAzLjEuMC9ub2RlX21vZHVsZXMvdGhyZWFkLXN0cmVhbS9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vcGlub0A5LjE0LjAvbm9kZV9tb2R1bGVzL3Bpbm8vbGliL3RyYW5zcG9ydC5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vcGlub0A5LjE0LjAvbm9kZV9tb2R1bGVzL3Bpbm8vbGliL3Rvb2xzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9waW5vQDkuMTQuMC9ub2RlX21vZHVsZXMvcGluby9saWIvY29uc3RhbnRzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9waW5vQDkuMTQuMC9ub2RlX21vZHVsZXMvcGluby9saWIvbGV2ZWxzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9waW5vQDkuMTQuMC9ub2RlX21vZHVsZXMvcGluby9saWIvbWV0YS5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vcGlub0A5LjE0LjAvbm9kZV9tb2R1bGVzL3Bpbm8vbGliL3Byb3RvLmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9zYWZlLXN0YWJsZS1zdHJpbmdpZnlAMi41LjAvbm9kZV9tb2R1bGVzL3NhZmUtc3RhYmxlLXN0cmluZ2lmeS9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vcGlub0A5LjE0LjAvbm9kZV9tb2R1bGVzL3Bpbm8vbGliL211bHRpc3RyZWFtLmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9waW5vQDkuMTQuMC9ub2RlX21vZHVsZXMvcGluby9waW5vLmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9zcGxpdDJANC4yLjAvbm9kZV9tb2R1bGVzL3NwbGl0Mi9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vcGluby1hYnN0cmFjdC10cmFuc3BvcnRAMi4wLjAvbm9kZV9tb2R1bGVzL3Bpbm8tYWJzdHJhY3QtdHJhbnNwb3J0L2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9yZWFsLXJlcXVpcmVAMC4yLjAvbm9kZV9tb2R1bGVzL3JlYWwtcmVxdWlyZS9zcmMvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3Bpbm9AOS4xNC4wL25vZGVfbW9kdWxlcy9waW5vL2xpYi90cmFuc3BvcnQtc3RyZWFtLmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9waW5vQDkuMTQuMC9ub2RlX21vZHVsZXMvcGluby9saWIvd29ya2VyLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIndXNlIHN0cmljdCdcblxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICogQ29kZSBpbml0aWFsbHkgY29waWVkL2FkYXB0ZWQgZnJvbSBcInBvbnktY2F1c2VcIiBucG0gbW9kdWxlICpcbi8vICogUGxlYXNlIHVwc3RyZWFtIGltcHJvdmVtZW50cyB0aGVyZSAgICAgICAgICAgICAgICAgICAgICAgICAqXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5jb25zdCBpc0Vycm9yTGlrZSA9IChlcnIpID0+IHtcbiAgcmV0dXJuIGVyciAmJiB0eXBlb2YgZXJyLm1lc3NhZ2UgPT09ICdzdHJpbmcnXG59XG5cbi8qKlxuICogQHBhcmFtIHtFcnJvcnx7IGNhdXNlPzogdW5rbm93bnwoKCk9PmVycil9fSBlcnJcbiAqIEByZXR1cm5zIHtFcnJvcnxPYmplY3R8dW5kZWZpbmVkfVxuICovXG5jb25zdCBnZXRFcnJvckNhdXNlID0gKGVycikgPT4ge1xuICBpZiAoIWVycikgcmV0dXJuXG5cbiAgLyoqIEB0eXBlIHt1bmtub3dufSAqL1xuICAvLyBAdHMtaWdub3JlXG4gIGNvbnN0IGNhdXNlID0gZXJyLmNhdXNlXG5cbiAgLy8gVkVycm9yIC8gTkVycm9yIHN0eWxlIGNhdXNlc1xuICBpZiAodHlwZW9mIGNhdXNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IGNhdXNlUmVzdWx0ID0gZXJyLmNhdXNlKClcblxuICAgIHJldHVybiBpc0Vycm9yTGlrZShjYXVzZVJlc3VsdClcbiAgICAgID8gY2F1c2VSZXN1bHRcbiAgICAgIDogdW5kZWZpbmVkXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGlzRXJyb3JMaWtlKGNhdXNlKVxuICAgICAgPyBjYXVzZVxuICAgICAgOiB1bmRlZmluZWRcbiAgfVxufVxuXG4vKipcbiAqIEludGVybmFsIG1ldGhvZCB0aGF0IGtlZXBzIGEgdHJhY2sgb2Ygd2hpY2ggZXJyb3Igd2UgaGF2ZSBhbHJlYWR5IGFkZGVkLCB0byBhdm9pZCBjaXJjdWxhciByZWN1cnNpb25cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1NldDxFcnJvcj59IHNlZW5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmNvbnN0IF9zdGFja1dpdGhDYXVzZXMgPSAoZXJyLCBzZWVuKSA9PiB7XG4gIGlmICghaXNFcnJvckxpa2UoZXJyKSkgcmV0dXJuICcnXG5cbiAgY29uc3Qgc3RhY2sgPSBlcnIuc3RhY2sgfHwgJydcblxuICAvLyBFbnN1cmUgd2UgZG9uJ3QgZ28gY2lyY3VsYXIgb3IgY3JhemlseSBkZWVwXG4gIGlmIChzZWVuLmhhcyhlcnIpKSB7XG4gICAgcmV0dXJuIHN0YWNrICsgJ1xcbmNhdXNlcyBoYXZlIGJlY29tZSBjaXJjdWxhci4uLidcbiAgfVxuXG4gIGNvbnN0IGNhdXNlID0gZ2V0RXJyb3JDYXVzZShlcnIpXG5cbiAgaWYgKGNhdXNlKSB7XG4gICAgc2Vlbi5hZGQoZXJyKVxuICAgIHJldHVybiAoc3RhY2sgKyAnXFxuY2F1c2VkIGJ5OiAnICsgX3N0YWNrV2l0aENhdXNlcyhjYXVzZSwgc2VlbikpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHN0YWNrXG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmNvbnN0IHN0YWNrV2l0aENhdXNlcyA9IChlcnIpID0+IF9zdGFja1dpdGhDYXVzZXMoZXJyLCBuZXcgU2V0KCkpXG5cbi8qKlxuICogSW50ZXJuYWwgbWV0aG9kIHRoYXQga2VlcHMgYSB0cmFjayBvZiB3aGljaCBlcnJvciB3ZSBoYXZlIGFscmVhZHkgYWRkZWQsIHRvIGF2b2lkIGNpcmN1bGFyIHJlY3Vyc2lvblxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7U2V0PEVycm9yPn0gc2VlblxuICogQHBhcmFtIHtib29sZWFufSBbc2tpcF1cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmNvbnN0IF9tZXNzYWdlV2l0aENhdXNlcyA9IChlcnIsIHNlZW4sIHNraXApID0+IHtcbiAgaWYgKCFpc0Vycm9yTGlrZShlcnIpKSByZXR1cm4gJydcblxuICBjb25zdCBtZXNzYWdlID0gc2tpcCA/ICcnIDogKGVyci5tZXNzYWdlIHx8ICcnKVxuXG4gIC8vIEVuc3VyZSB3ZSBkb24ndCBnbyBjaXJjdWxhciBvciBjcmF6aWx5IGRlZXBcbiAgaWYgKHNlZW4uaGFzKGVycikpIHtcbiAgICByZXR1cm4gbWVzc2FnZSArICc6IC4uLidcbiAgfVxuXG4gIGNvbnN0IGNhdXNlID0gZ2V0RXJyb3JDYXVzZShlcnIpXG5cbiAgaWYgKGNhdXNlKSB7XG4gICAgc2Vlbi5hZGQoZXJyKVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHNraXBJZlZFcnJvclN0eWxlQ2F1c2UgPSB0eXBlb2YgZXJyLmNhdXNlID09PSAnZnVuY3Rpb24nXG5cbiAgICByZXR1cm4gKG1lc3NhZ2UgK1xuICAgICAgKHNraXBJZlZFcnJvclN0eWxlQ2F1c2UgPyAnJyA6ICc6ICcpICtcbiAgICAgIF9tZXNzYWdlV2l0aENhdXNlcyhjYXVzZSwgc2Vlbiwgc2tpcElmVkVycm9yU3R5bGVDYXVzZSkpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG1lc3NhZ2VcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuY29uc3QgbWVzc2FnZVdpdGhDYXVzZXMgPSAoZXJyKSA9PiBfbWVzc2FnZVdpdGhDYXVzZXMoZXJyLCBuZXcgU2V0KCkpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0Vycm9yTGlrZSxcbiAgZ2V0RXJyb3JDYXVzZSxcbiAgc3RhY2tXaXRoQ2F1c2VzLFxuICBtZXNzYWdlV2l0aENhdXNlc1xufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBzZWVuID0gU3ltYm9sKCdjaXJjdWxhci1yZWYtdGFnJylcbmNvbnN0IHJhd1N5bWJvbCA9IFN5bWJvbCgncGluby1yYXctZXJyLXJlZicpXG5cbmNvbnN0IHBpbm9FcnJQcm90byA9IE9iamVjdC5jcmVhdGUoe30sIHtcbiAgdHlwZToge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgdmFsdWU6IHVuZGVmaW5lZFxuICB9LFxuICBtZXNzYWdlOiB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogdW5kZWZpbmVkXG4gIH0sXG4gIHN0YWNrOiB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogdW5kZWZpbmVkXG4gIH0sXG4gIGFnZ3JlZ2F0ZUVycm9yczoge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgdmFsdWU6IHVuZGVmaW5lZFxuICB9LFxuICByYXc6IHtcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzW3Jhd1N5bWJvbF1cbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgdGhpc1tyYXdTeW1ib2xdID0gdmFsXG4gICAgfVxuICB9XG59KVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHBpbm9FcnJQcm90bywgcmF3U3ltYm9sLCB7XG4gIHdyaXRhYmxlOiB0cnVlLFxuICB2YWx1ZToge31cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwaW5vRXJyUHJvdG8sXG4gIHBpbm9FcnJvclN5bWJvbHM6IHtcbiAgICBzZWVuLFxuICAgIHJhd1N5bWJvbFxuICB9XG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gZXJyU2VyaWFsaXplclxuXG5jb25zdCB7IG1lc3NhZ2VXaXRoQ2F1c2VzLCBzdGFja1dpdGhDYXVzZXMsIGlzRXJyb3JMaWtlIH0gPSByZXF1aXJlKCcuL2Vyci1oZWxwZXJzJylcbmNvbnN0IHsgcGlub0VyclByb3RvLCBwaW5vRXJyb3JTeW1ib2xzIH0gPSByZXF1aXJlKCcuL2Vyci1wcm90bycpXG5jb25zdCB7IHNlZW4gfSA9IHBpbm9FcnJvclN5bWJvbHNcblxuY29uc3QgeyB0b1N0cmluZyB9ID0gT2JqZWN0LnByb3RvdHlwZVxuXG5mdW5jdGlvbiBlcnJTZXJpYWxpemVyIChlcnIpIHtcbiAgaWYgKCFpc0Vycm9yTGlrZShlcnIpKSB7XG4gICAgcmV0dXJuIGVyclxuICB9XG5cbiAgZXJyW3NlZW5dID0gdW5kZWZpbmVkIC8vIHRhZyB0byBwcmV2ZW50IHJlLWxvb2tpbmcgYXQgdGhpc1xuICBjb25zdCBfZXJyID0gT2JqZWN0LmNyZWF0ZShwaW5vRXJyUHJvdG8pXG4gIF9lcnIudHlwZSA9IHRvU3RyaW5nLmNhbGwoZXJyLmNvbnN0cnVjdG9yKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJ1xuICAgID8gZXJyLmNvbnN0cnVjdG9yLm5hbWVcbiAgICA6IGVyci5uYW1lXG4gIF9lcnIubWVzc2FnZSA9IG1lc3NhZ2VXaXRoQ2F1c2VzKGVycilcbiAgX2Vyci5zdGFjayA9IHN0YWNrV2l0aENhdXNlcyhlcnIpXG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoZXJyLmVycm9ycykpIHtcbiAgICBfZXJyLmFnZ3JlZ2F0ZUVycm9ycyA9IGVyci5lcnJvcnMubWFwKGVyciA9PiBlcnJTZXJpYWxpemVyKGVycikpXG4gIH1cblxuICBmb3IgKGNvbnN0IGtleSBpbiBlcnIpIHtcbiAgICBpZiAoX2VycltrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHZhbCA9IGVycltrZXldXG4gICAgICBpZiAoaXNFcnJvckxpa2UodmFsKSkge1xuICAgICAgICAvLyBXZSBhcHBlbmQgY2F1c2UgbWVzc2FnZXMgYW5kIHN0YWNrcyB0byBfZXJyLCB0aGVyZWZvcmUgc2tpcHBpbmcgY2F1c2VzIGhlcmVcbiAgICAgICAgaWYgKGtleSAhPT0gJ2NhdXNlJyAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbCwgc2VlbikpIHtcbiAgICAgICAgICBfZXJyW2tleV0gPSBlcnJTZXJpYWxpemVyKHZhbClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2VycltrZXldID0gdmFsXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlIGVycltzZWVuXSAvLyBjbGVhbiB1cCB0YWcgaW4gY2FzZSBlcnIgaXMgc2VyaWFsaXplZCBhZ2FpbiBsYXRlclxuICBfZXJyLnJhdyA9IGVyclxuICByZXR1cm4gX2VyclxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVycldpdGhDYXVzZVNlcmlhbGl6ZXJcblxuY29uc3QgeyBpc0Vycm9yTGlrZSB9ID0gcmVxdWlyZSgnLi9lcnItaGVscGVycycpXG5jb25zdCB7IHBpbm9FcnJQcm90bywgcGlub0Vycm9yU3ltYm9scyB9ID0gcmVxdWlyZSgnLi9lcnItcHJvdG8nKVxuY29uc3QgeyBzZWVuIH0gPSBwaW5vRXJyb3JTeW1ib2xzXG5cbmNvbnN0IHsgdG9TdHJpbmcgfSA9IE9iamVjdC5wcm90b3R5cGVcblxuZnVuY3Rpb24gZXJyV2l0aENhdXNlU2VyaWFsaXplciAoZXJyKSB7XG4gIGlmICghaXNFcnJvckxpa2UoZXJyKSkge1xuICAgIHJldHVybiBlcnJcbiAgfVxuXG4gIGVycltzZWVuXSA9IHVuZGVmaW5lZCAvLyB0YWcgdG8gcHJldmVudCByZS1sb29raW5nIGF0IHRoaXNcbiAgY29uc3QgX2VyciA9IE9iamVjdC5jcmVhdGUocGlub0VyclByb3RvKVxuICBfZXJyLnR5cGUgPSB0b1N0cmluZy5jYWxsKGVyci5jb25zdHJ1Y3RvcikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSdcbiAgICA/IGVyci5jb25zdHJ1Y3Rvci5uYW1lXG4gICAgOiBlcnIubmFtZVxuICBfZXJyLm1lc3NhZ2UgPSBlcnIubWVzc2FnZVxuICBfZXJyLnN0YWNrID0gZXJyLnN0YWNrXG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoZXJyLmVycm9ycykpIHtcbiAgICBfZXJyLmFnZ3JlZ2F0ZUVycm9ycyA9IGVyci5lcnJvcnMubWFwKGVyciA9PiBlcnJXaXRoQ2F1c2VTZXJpYWxpemVyKGVycikpXG4gIH1cblxuICBpZiAoaXNFcnJvckxpa2UoZXJyLmNhdXNlKSAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGVyci5jYXVzZSwgc2VlbikpIHtcbiAgICBfZXJyLmNhdXNlID0gZXJyV2l0aENhdXNlU2VyaWFsaXplcihlcnIuY2F1c2UpXG4gIH1cblxuICBmb3IgKGNvbnN0IGtleSBpbiBlcnIpIHtcbiAgICBpZiAoX2VycltrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHZhbCA9IGVycltrZXldXG4gICAgICBpZiAoaXNFcnJvckxpa2UodmFsKSkge1xuICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWwsIHNlZW4pKSB7XG4gICAgICAgICAgX2VycltrZXldID0gZXJyV2l0aENhdXNlU2VyaWFsaXplcih2YWwpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9lcnJba2V5XSA9IHZhbFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZSBlcnJbc2Vlbl0gLy8gY2xlYW4gdXAgdGFnIGluIGNhc2UgZXJyIGlzIHNlcmlhbGl6ZWQgYWdhaW4gbGF0ZXJcbiAgX2Vyci5yYXcgPSBlcnJcbiAgcmV0dXJuIF9lcnJcbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1hcEh0dHBSZXF1ZXN0LFxuICByZXFTZXJpYWxpemVyXG59XG5cbmNvbnN0IHJhd1N5bWJvbCA9IFN5bWJvbCgncGluby1yYXctcmVxLXJlZicpXG5jb25zdCBwaW5vUmVxUHJvdG8gPSBPYmplY3QuY3JlYXRlKHt9LCB7XG4gIGlkOiB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogJydcbiAgfSxcbiAgbWV0aG9kOiB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogJydcbiAgfSxcbiAgdXJsOiB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogJydcbiAgfSxcbiAgcXVlcnk6IHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiAnJ1xuICB9LFxuICBwYXJhbXM6IHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiAnJ1xuICB9LFxuICBoZWFkZXJzOiB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZToge31cbiAgfSxcbiAgcmVtb3RlQWRkcmVzczoge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgdmFsdWU6ICcnXG4gIH0sXG4gIHJlbW90ZVBvcnQ6IHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiAnJ1xuICB9LFxuICByYXc6IHtcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzW3Jhd1N5bWJvbF1cbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgdGhpc1tyYXdTeW1ib2xdID0gdmFsXG4gICAgfVxuICB9XG59KVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHBpbm9SZXFQcm90bywgcmF3U3ltYm9sLCB7XG4gIHdyaXRhYmxlOiB0cnVlLFxuICB2YWx1ZToge31cbn0pXG5cbmZ1bmN0aW9uIHJlcVNlcmlhbGl6ZXIgKHJlcSkge1xuICAvLyByZXEuaW5mbyBpcyBmb3IgaGFwaSBjb21wYXQuXG4gIGNvbnN0IGNvbm5lY3Rpb24gPSByZXEuaW5mbyB8fCByZXEuc29ja2V0XG4gIGNvbnN0IF9yZXEgPSBPYmplY3QuY3JlYXRlKHBpbm9SZXFQcm90bylcbiAgX3JlcS5pZCA9ICh0eXBlb2YgcmVxLmlkID09PSAnZnVuY3Rpb24nID8gcmVxLmlkKCkgOiAocmVxLmlkIHx8IChyZXEuaW5mbyA/IHJlcS5pbmZvLmlkIDogdW5kZWZpbmVkKSkpXG4gIF9yZXEubWV0aG9kID0gcmVxLm1ldGhvZFxuICAvLyByZXEub3JpZ2luYWxVcmwgaXMgZm9yIGV4cHJlc3NqcyBjb21wYXQuXG4gIGlmIChyZXEub3JpZ2luYWxVcmwpIHtcbiAgICBfcmVxLnVybCA9IHJlcS5vcmlnaW5hbFVybFxuICB9IGVsc2Uge1xuICAgIGNvbnN0IHBhdGggPSByZXEucGF0aFxuICAgIC8vIHBhdGggZm9yIHNhZmUgaGFwaSBjb21wYXQuXG4gICAgX3JlcS51cmwgPSB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycgPyBwYXRoIDogKHJlcS51cmwgPyByZXEudXJsLnBhdGggfHwgcmVxLnVybCA6IHVuZGVmaW5lZClcbiAgfVxuXG4gIGlmIChyZXEucXVlcnkpIHtcbiAgICBfcmVxLnF1ZXJ5ID0gcmVxLnF1ZXJ5XG4gIH1cblxuICBpZiAocmVxLnBhcmFtcykge1xuICAgIF9yZXEucGFyYW1zID0gcmVxLnBhcmFtc1xuICB9XG5cbiAgX3JlcS5oZWFkZXJzID0gcmVxLmhlYWRlcnNcbiAgX3JlcS5yZW1vdGVBZGRyZXNzID0gY29ubmVjdGlvbiAmJiBjb25uZWN0aW9uLnJlbW90ZUFkZHJlc3NcbiAgX3JlcS5yZW1vdGVQb3J0ID0gY29ubmVjdGlvbiAmJiBjb25uZWN0aW9uLnJlbW90ZVBvcnRcbiAgLy8gcmVxLnJhdyBpcyAgZm9yIGhhcGkgY29tcGF0L2VxdWl2YWxlbmNlXG4gIF9yZXEucmF3ID0gcmVxLnJhdyB8fCByZXFcbiAgcmV0dXJuIF9yZXFcbn1cblxuZnVuY3Rpb24gbWFwSHR0cFJlcXVlc3QgKHJlcSkge1xuICByZXR1cm4ge1xuICAgIHJlcTogcmVxU2VyaWFsaXplcihyZXEpXG4gIH1cbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1hcEh0dHBSZXNwb25zZSxcbiAgcmVzU2VyaWFsaXplclxufVxuXG5jb25zdCByYXdTeW1ib2wgPSBTeW1ib2woJ3Bpbm8tcmF3LXJlcy1yZWYnKVxuY29uc3QgcGlub1Jlc1Byb3RvID0gT2JqZWN0LmNyZWF0ZSh7fSwge1xuICBzdGF0dXNDb2RlOiB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogMFxuICB9LFxuICBoZWFkZXJzOiB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogJydcbiAgfSxcbiAgcmF3OiB7XG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpc1tyYXdTeW1ib2xdXG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIHRoaXNbcmF3U3ltYm9sXSA9IHZhbFxuICAgIH1cbiAgfVxufSlcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwaW5vUmVzUHJvdG8sIHJhd1N5bWJvbCwge1xuICB3cml0YWJsZTogdHJ1ZSxcbiAgdmFsdWU6IHt9XG59KVxuXG5mdW5jdGlvbiByZXNTZXJpYWxpemVyIChyZXMpIHtcbiAgY29uc3QgX3JlcyA9IE9iamVjdC5jcmVhdGUocGlub1Jlc1Byb3RvKVxuICBfcmVzLnN0YXR1c0NvZGUgPSByZXMuaGVhZGVyc1NlbnQgPyByZXMuc3RhdHVzQ29kZSA6IG51bGxcbiAgX3Jlcy5oZWFkZXJzID0gcmVzLmdldEhlYWRlcnMgPyByZXMuZ2V0SGVhZGVycygpIDogcmVzLl9oZWFkZXJzXG4gIF9yZXMucmF3ID0gcmVzXG4gIHJldHVybiBfcmVzXG59XG5cbmZ1bmN0aW9uIG1hcEh0dHBSZXNwb25zZSAocmVzKSB7XG4gIHJldHVybiB7XG4gICAgcmVzOiByZXNTZXJpYWxpemVyKHJlcylcbiAgfVxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBlcnJTZXJpYWxpemVyID0gcmVxdWlyZSgnLi9saWIvZXJyJylcbmNvbnN0IGVycldpdGhDYXVzZVNlcmlhbGl6ZXIgPSByZXF1aXJlKCcuL2xpYi9lcnItd2l0aC1jYXVzZScpXG5jb25zdCByZXFTZXJpYWxpemVycyA9IHJlcXVpcmUoJy4vbGliL3JlcScpXG5jb25zdCByZXNTZXJpYWxpemVycyA9IHJlcXVpcmUoJy4vbGliL3JlcycpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBlcnI6IGVyclNlcmlhbGl6ZXIsXG4gIGVycldpdGhDYXVzZTogZXJyV2l0aENhdXNlU2VyaWFsaXplcixcbiAgbWFwSHR0cFJlcXVlc3Q6IHJlcVNlcmlhbGl6ZXJzLm1hcEh0dHBSZXF1ZXN0LFxuICBtYXBIdHRwUmVzcG9uc2U6IHJlc1NlcmlhbGl6ZXJzLm1hcEh0dHBSZXNwb25zZSxcbiAgcmVxOiByZXFTZXJpYWxpemVycy5yZXFTZXJpYWxpemVyLFxuICByZXM6IHJlc1NlcmlhbGl6ZXJzLnJlc1NlcmlhbGl6ZXIsXG5cbiAgd3JhcEVycm9yU2VyaWFsaXplcjogZnVuY3Rpb24gd3JhcEVycm9yU2VyaWFsaXplciAoY3VzdG9tU2VyaWFsaXplcikge1xuICAgIGlmIChjdXN0b21TZXJpYWxpemVyID09PSBlcnJTZXJpYWxpemVyKSByZXR1cm4gY3VzdG9tU2VyaWFsaXplclxuICAgIHJldHVybiBmdW5jdGlvbiB3cmFwRXJyU2VyaWFsaXplciAoZXJyKSB7XG4gICAgICByZXR1cm4gY3VzdG9tU2VyaWFsaXplcihlcnJTZXJpYWxpemVyKGVycikpXG4gICAgfVxuICB9LFxuXG4gIHdyYXBSZXF1ZXN0U2VyaWFsaXplcjogZnVuY3Rpb24gd3JhcFJlcXVlc3RTZXJpYWxpemVyIChjdXN0b21TZXJpYWxpemVyKSB7XG4gICAgaWYgKGN1c3RvbVNlcmlhbGl6ZXIgPT09IHJlcVNlcmlhbGl6ZXJzLnJlcVNlcmlhbGl6ZXIpIHJldHVybiBjdXN0b21TZXJpYWxpemVyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZWRSZXFTZXJpYWxpemVyIChyZXEpIHtcbiAgICAgIHJldHVybiBjdXN0b21TZXJpYWxpemVyKHJlcVNlcmlhbGl6ZXJzLnJlcVNlcmlhbGl6ZXIocmVxKSlcbiAgICB9XG4gIH0sXG5cbiAgd3JhcFJlc3BvbnNlU2VyaWFsaXplcjogZnVuY3Rpb24gd3JhcFJlc3BvbnNlU2VyaWFsaXplciAoY3VzdG9tU2VyaWFsaXplcikge1xuICAgIGlmIChjdXN0b21TZXJpYWxpemVyID09PSByZXNTZXJpYWxpemVycy5yZXNTZXJpYWxpemVyKSByZXR1cm4gY3VzdG9tU2VyaWFsaXplclxuICAgIHJldHVybiBmdW5jdGlvbiB3cmFwcGVkUmVzU2VyaWFsaXplciAocmVzKSB7XG4gICAgICByZXR1cm4gY3VzdG9tU2VyaWFsaXplcihyZXNTZXJpYWxpemVycy5yZXNTZXJpYWxpemVyKHJlcykpXG4gICAgfVxuICB9XG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmZ1bmN0aW9uIG5vT3BQcmVwYXJlU3RhY2tUcmFjZSAoXywgc3RhY2spIHtcbiAgcmV0dXJuIHN0YWNrXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0Q2FsbGVycyAoKSB7XG4gIGNvbnN0IG9yaWdpbmFsUHJlcGFyZSA9IEVycm9yLnByZXBhcmVTdGFja1RyYWNlXG4gIEVycm9yLnByZXBhcmVTdGFja1RyYWNlID0gbm9PcFByZXBhcmVTdGFja1RyYWNlXG4gIGNvbnN0IHN0YWNrID0gbmV3IEVycm9yKCkuc3RhY2tcbiAgRXJyb3IucHJlcGFyZVN0YWNrVHJhY2UgPSBvcmlnaW5hbFByZXBhcmVcblxuICBpZiAoIUFycmF5LmlzQXJyYXkoc3RhY2spKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG5cbiAgY29uc3QgZW50cmllcyA9IHN0YWNrLnNsaWNlKDIpXG5cbiAgY29uc3QgZmlsZU5hbWVzID0gW11cblxuICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGZpbGVOYW1lcy5wdXNoKGVudHJ5LmdldEZpbGVOYW1lKCkpXG4gIH1cblxuICByZXR1cm4gZmlsZU5hbWVzXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmZ1bmN0aW9uIGRlZXBDbG9uZSAob2JqKSB7XG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gb2JqXG4gIH1cblxuICBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIHJldHVybiBuZXcgRGF0ZShvYmouZ2V0VGltZSgpKVxuICB9XG5cbiAgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgY29uc3QgY2xvbmVkID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgY2xvbmVkW2ldID0gZGVlcENsb25lKG9ialtpXSlcbiAgICB9XG4gICAgcmV0dXJuIGNsb25lZFxuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgY29uc3QgY2xvbmVkID0gT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSlcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGNsb25lZFtrZXldID0gZGVlcENsb25lKG9ialtrZXldKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2xvbmVkXG4gIH1cblxuICByZXR1cm4gb2JqXG59XG5cbmZ1bmN0aW9uIHBhcnNlUGF0aCAocGF0aCkge1xuICBjb25zdCBwYXJ0cyA9IFtdXG4gIGxldCBjdXJyZW50ID0gJydcbiAgbGV0IGluQnJhY2tldHMgPSBmYWxzZVxuICBsZXQgaW5RdW90ZXMgPSBmYWxzZVxuICBsZXQgcXVvdGVDaGFyID0gJydcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGFyID0gcGF0aFtpXVxuXG4gICAgaWYgKCFpbkJyYWNrZXRzICYmIGNoYXIgPT09ICcuJykge1xuICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgcGFydHMucHVzaChjdXJyZW50KVxuICAgICAgICBjdXJyZW50ID0gJydcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNoYXIgPT09ICdbJykge1xuICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgcGFydHMucHVzaChjdXJyZW50KVxuICAgICAgICBjdXJyZW50ID0gJydcbiAgICAgIH1cbiAgICAgIGluQnJhY2tldHMgPSB0cnVlXG4gICAgfSBlbHNlIGlmIChjaGFyID09PSAnXScgJiYgaW5CcmFja2V0cykge1xuICAgICAgLy8gQWx3YXlzIHB1c2ggdGhlIGN1cnJlbnQgdmFsdWUgd2hlbiBjbG9zaW5nIGJyYWNrZXRzLCBldmVuIGlmIGl0J3MgYW4gZW1wdHkgc3RyaW5nXG4gICAgICBwYXJ0cy5wdXNoKGN1cnJlbnQpXG4gICAgICBjdXJyZW50ID0gJydcbiAgICAgIGluQnJhY2tldHMgPSBmYWxzZVxuICAgICAgaW5RdW90ZXMgPSBmYWxzZVxuICAgIH0gZWxzZSBpZiAoKGNoYXIgPT09ICdcIicgfHwgY2hhciA9PT0gXCInXCIpICYmIGluQnJhY2tldHMpIHtcbiAgICAgIGlmICghaW5RdW90ZXMpIHtcbiAgICAgICAgaW5RdW90ZXMgPSB0cnVlXG4gICAgICAgIHF1b3RlQ2hhciA9IGNoYXJcbiAgICAgIH0gZWxzZSBpZiAoY2hhciA9PT0gcXVvdGVDaGFyKSB7XG4gICAgICAgIGluUXVvdGVzID0gZmFsc2VcbiAgICAgICAgcXVvdGVDaGFyID0gJydcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnQgKz0gY2hhclxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50ICs9IGNoYXJcbiAgICB9XG4gIH1cblxuICBpZiAoY3VycmVudCkge1xuICAgIHBhcnRzLnB1c2goY3VycmVudClcbiAgfVxuXG4gIHJldHVybiBwYXJ0c1xufVxuXG5mdW5jdGlvbiBzZXRWYWx1ZSAob2JqLCBwYXJ0cywgdmFsdWUpIHtcbiAgbGV0IGN1cnJlbnQgPSBvYmpcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgIGNvbnN0IGtleSA9IHBhcnRzW2ldXG4gICAgLy8gVHlwZSBzYWZldHk6IENoZWNrIGlmIGN1cnJlbnQgaXMgYW4gb2JqZWN0IGJlZm9yZSB1c2luZyAnaW4nIG9wZXJhdG9yXG4gICAgaWYgKHR5cGVvZiBjdXJyZW50ICE9PSAnb2JqZWN0JyB8fCBjdXJyZW50ID09PSBudWxsIHx8ICEoa2V5IGluIGN1cnJlbnQpKSB7XG4gICAgICByZXR1cm4gZmFsc2UgLy8gUGF0aCBkb2Vzbid0IGV4aXN0LCBkb24ndCBjcmVhdGUgaXRcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjdXJyZW50W2tleV0gIT09ICdvYmplY3QnIHx8IGN1cnJlbnRba2V5XSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlIC8vIFBhdGggZG9lc24ndCBleGlzdCBwcm9wZXJseVxuICAgIH1cbiAgICBjdXJyZW50ID0gY3VycmVudFtrZXldXG4gIH1cblxuICBjb25zdCBsYXN0S2V5ID0gcGFydHNbcGFydHMubGVuZ3RoIC0gMV1cbiAgaWYgKGxhc3RLZXkgPT09ICcqJykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGN1cnJlbnQpKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY3VycmVudFtpXSA9IHZhbHVlXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY3VycmVudCA9PT0gJ29iamVjdCcgJiYgY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gY3VycmVudCkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGN1cnJlbnQsIGtleSkpIHtcbiAgICAgICAgICBjdXJyZW50W2tleV0gPSB2YWx1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIFR5cGUgc2FmZXR5OiBDaGVjayBpZiBjdXJyZW50IGlzIGFuIG9iamVjdCBiZWZvcmUgdXNpbmcgJ2luJyBvcGVyYXRvclxuICAgIGlmICh0eXBlb2YgY3VycmVudCA9PT0gJ29iamVjdCcgJiYgY3VycmVudCAhPT0gbnVsbCAmJiBsYXN0S2V5IGluIGN1cnJlbnQgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGN1cnJlbnQsIGxhc3RLZXkpKSB7XG4gICAgICBjdXJyZW50W2xhc3RLZXldID0gdmFsdWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuZnVuY3Rpb24gcmVtb3ZlS2V5IChvYmosIHBhcnRzKSB7XG4gIGxldCBjdXJyZW50ID0gb2JqXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICBjb25zdCBrZXkgPSBwYXJ0c1tpXVxuICAgIC8vIFR5cGUgc2FmZXR5OiBDaGVjayBpZiBjdXJyZW50IGlzIGFuIG9iamVjdCBiZWZvcmUgdXNpbmcgJ2luJyBvcGVyYXRvclxuICAgIGlmICh0eXBlb2YgY3VycmVudCAhPT0gJ29iamVjdCcgfHwgY3VycmVudCA9PT0gbnVsbCB8fCAhKGtleSBpbiBjdXJyZW50KSkge1xuICAgICAgcmV0dXJuIGZhbHNlIC8vIFBhdGggZG9lc24ndCBleGlzdCwgZG9uJ3QgY3JlYXRlIGl0XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY3VycmVudFtrZXldICE9PSAnb2JqZWN0JyB8fCBjdXJyZW50W2tleV0gPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZSAvLyBQYXRoIGRvZXNuJ3QgZXhpc3QgcHJvcGVybHlcbiAgICB9XG4gICAgY3VycmVudCA9IGN1cnJlbnRba2V5XVxuICB9XG5cbiAgY29uc3QgbGFzdEtleSA9IHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdXG4gIGlmIChsYXN0S2V5ID09PSAnKicpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjdXJyZW50KSkge1xuICAgICAgLy8gRm9yIGFycmF5cywgd2UgY2FuJ3QgcmVhbGx5IFwicmVtb3ZlXCIgYWxsIGl0ZW1zIGFzIHRoYXQgd291bGQgY2hhbmdlIGluZGljZXNcbiAgICAgIC8vIEluc3RlYWQsIHdlIHNldCB0aGVtIHRvIHVuZGVmaW5lZCB3aGljaCB3aWxsIGJlIG9taXR0ZWQgYnkgSlNPTi5zdHJpbmdpZnlcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjdXJyZW50W2ldID0gdW5kZWZpbmVkXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY3VycmVudCA9PT0gJ29iamVjdCcgJiYgY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gY3VycmVudCkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGN1cnJlbnQsIGtleSkpIHtcbiAgICAgICAgICBkZWxldGUgY3VycmVudFtrZXldXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gVHlwZSBzYWZldHk6IENoZWNrIGlmIGN1cnJlbnQgaXMgYW4gb2JqZWN0IGJlZm9yZSB1c2luZyAnaW4nIG9wZXJhdG9yXG4gICAgaWYgKHR5cGVvZiBjdXJyZW50ID09PSAnb2JqZWN0JyAmJiBjdXJyZW50ICE9PSBudWxsICYmIGxhc3RLZXkgaW4gY3VycmVudCAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY3VycmVudCwgbGFzdEtleSkpIHtcbiAgICAgIGRlbGV0ZSBjdXJyZW50W2xhc3RLZXldXG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbi8vIFNlbnRpbmVsIG9iamVjdCB0byBkaXN0aW5ndWlzaCBiZXR3ZWVuIHVuZGVmaW5lZCB2YWx1ZSBhbmQgbm9uLWV4aXN0ZW50IHBhdGhcbmNvbnN0IFBBVEhfTk9UX0ZPVU5EID0gU3ltYm9sKCdQQVRIX05PVF9GT1VORCcpXG5cbmZ1bmN0aW9uIGdldFZhbHVlSWZFeGlzdHMgKG9iaiwgcGFydHMpIHtcbiAgbGV0IGN1cnJlbnQgPSBvYmpcblxuICBmb3IgKGNvbnN0IHBhcnQgb2YgcGFydHMpIHtcbiAgICBpZiAoY3VycmVudCA9PT0gbnVsbCB8fCBjdXJyZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBQQVRIX05PVF9GT1VORFxuICAgIH1cbiAgICAvLyBUeXBlIHNhZmV0eTogQ2hlY2sgaWYgY3VycmVudCBpcyBhbiBvYmplY3QgYmVmb3JlIHByb3BlcnR5IGFjY2Vzc1xuICAgIGlmICh0eXBlb2YgY3VycmVudCAhPT0gJ29iamVjdCcgfHwgY3VycmVudCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFBBVEhfTk9UX0ZPVU5EXG4gICAgfVxuICAgIC8vIENoZWNrIGlmIHRoZSBwcm9wZXJ0eSBleGlzdHMgYmVmb3JlIGFjY2Vzc2luZyBpdFxuICAgIGlmICghKHBhcnQgaW4gY3VycmVudCkpIHtcbiAgICAgIHJldHVybiBQQVRIX05PVF9GT1VORFxuICAgIH1cbiAgICBjdXJyZW50ID0gY3VycmVudFtwYXJ0XVxuICB9XG5cbiAgcmV0dXJuIGN1cnJlbnRcbn1cblxuZnVuY3Rpb24gZ2V0VmFsdWUgKG9iaiwgcGFydHMpIHtcbiAgbGV0IGN1cnJlbnQgPSBvYmpcblxuICBmb3IgKGNvbnN0IHBhcnQgb2YgcGFydHMpIHtcbiAgICBpZiAoY3VycmVudCA9PT0gbnVsbCB8fCBjdXJyZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG4gICAgLy8gVHlwZSBzYWZldHk6IENoZWNrIGlmIGN1cnJlbnQgaXMgYW4gb2JqZWN0IGJlZm9yZSBwcm9wZXJ0eSBhY2Nlc3NcbiAgICBpZiAodHlwZW9mIGN1cnJlbnQgIT09ICdvYmplY3QnIHx8IGN1cnJlbnQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG4gICAgY3VycmVudCA9IGN1cnJlbnRbcGFydF1cbiAgfVxuXG4gIHJldHVybiBjdXJyZW50XG59XG5cbmZ1bmN0aW9uIHJlZGFjdFBhdGhzIChvYmosIHBhdGhzLCBjZW5zb3IsIHJlbW92ZSA9IGZhbHNlKSB7XG4gIGZvciAoY29uc3QgcGF0aCBvZiBwYXRocykge1xuICAgIGNvbnN0IHBhcnRzID0gcGFyc2VQYXRoKHBhdGgpXG5cbiAgICBpZiAocGFydHMuaW5jbHVkZXMoJyonKSkge1xuICAgICAgcmVkYWN0V2lsZGNhcmRQYXRoKG9iaiwgcGFydHMsIGNlbnNvciwgcGF0aCwgcmVtb3ZlKVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocmVtb3ZlKSB7XG4gICAgICAgIHJlbW92ZUtleShvYmosIHBhcnRzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gR2V0IHZhbHVlIG9ubHkgaWYgcGF0aCBleGlzdHMgLSBzaW5nbGUgdHJhdmVyc2FsXG4gICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsdWVJZkV4aXN0cyhvYmosIHBhcnRzKVxuICAgICAgICBpZiAodmFsdWUgPT09IFBBVEhfTk9UX0ZPVU5EKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFjdHVhbENlbnNvciA9IHR5cGVvZiBjZW5zb3IgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IGNlbnNvcih2YWx1ZSwgcGFydHMpXG4gICAgICAgICAgOiBjZW5zb3JcbiAgICAgICAgc2V0VmFsdWUob2JqLCBwYXJ0cywgYWN0dWFsQ2Vuc29yKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZWRhY3RXaWxkY2FyZFBhdGggKG9iaiwgcGFydHMsIGNlbnNvciwgb3JpZ2luYWxQYXRoLCByZW1vdmUgPSBmYWxzZSkge1xuICBjb25zdCB3aWxkY2FyZEluZGV4ID0gcGFydHMuaW5kZXhPZignKicpXG5cbiAgaWYgKHdpbGRjYXJkSW5kZXggPT09IHBhcnRzLmxlbmd0aCAtIDEpIHtcbiAgICBjb25zdCBwYXJlbnRQYXJ0cyA9IHBhcnRzLnNsaWNlKDAsIC0xKVxuICAgIGxldCBjdXJyZW50ID0gb2JqXG5cbiAgICBmb3IgKGNvbnN0IHBhcnQgb2YgcGFyZW50UGFydHMpIHtcbiAgICAgIGlmIChjdXJyZW50ID09PSBudWxsIHx8IGN1cnJlbnQgPT09IHVuZGVmaW5lZCkgcmV0dXJuXG4gICAgICAvLyBUeXBlIHNhZmV0eTogQ2hlY2sgaWYgY3VycmVudCBpcyBhbiBvYmplY3QgYmVmb3JlIHByb3BlcnR5IGFjY2Vzc1xuICAgICAgaWYgKHR5cGVvZiBjdXJyZW50ICE9PSAnb2JqZWN0JyB8fCBjdXJyZW50ID09PSBudWxsKSByZXR1cm5cbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3BhcnRdXG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY3VycmVudCkpIHtcbiAgICAgIGlmIChyZW1vdmUpIHtcbiAgICAgICAgLy8gRm9yIGFycmF5cywgc2V0IGFsbCBpdGVtcyB0byB1bmRlZmluZWQgd2hpY2ggd2lsbCBiZSBvbWl0dGVkIGJ5IEpTT04uc3RyaW5naWZ5XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGN1cnJlbnRbaV0gPSB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgaW5kZXhQYXRoID0gWy4uLnBhcmVudFBhcnRzLCBpLnRvU3RyaW5nKCldXG4gICAgICAgICAgY29uc3QgYWN0dWFsQ2Vuc29yID0gdHlwZW9mIGNlbnNvciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyBjZW5zb3IoY3VycmVudFtpXSwgaW5kZXhQYXRoKVxuICAgICAgICAgICAgOiBjZW5zb3JcbiAgICAgICAgICBjdXJyZW50W2ldID0gYWN0dWFsQ2Vuc29yXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjdXJyZW50ID09PSAnb2JqZWN0JyAmJiBjdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICBpZiAocmVtb3ZlKSB7XG4gICAgICAgIC8vIENvbGxlY3Qga2V5cyB0byBkZWxldGUgdG8gYXZvaWQgaXNzdWVzIHdpdGggZGVsZXRpbmcgZHVyaW5nIGl0ZXJhdGlvblxuICAgICAgICBjb25zdCBrZXlzVG9EZWxldGUgPSBbXVxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBjdXJyZW50KSB7XG4gICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjdXJyZW50LCBrZXkpKSB7XG4gICAgICAgICAgICBrZXlzVG9EZWxldGUucHVzaChrZXkpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXNUb0RlbGV0ZSkge1xuICAgICAgICAgIGRlbGV0ZSBjdXJyZW50W2tleV1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gY3VycmVudCkge1xuICAgICAgICAgIGNvbnN0IGtleVBhdGggPSBbLi4ucGFyZW50UGFydHMsIGtleV1cbiAgICAgICAgICBjb25zdCBhY3R1YWxDZW5zb3IgPSB0eXBlb2YgY2Vuc29yID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICA/IGNlbnNvcihjdXJyZW50W2tleV0sIGtleVBhdGgpXG4gICAgICAgICAgICA6IGNlbnNvclxuICAgICAgICAgIGN1cnJlbnRba2V5XSA9IGFjdHVhbENlbnNvclxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJlZGFjdEludGVybWVkaWF0ZVdpbGRjYXJkKG9iaiwgcGFydHMsIGNlbnNvciwgd2lsZGNhcmRJbmRleCwgb3JpZ2luYWxQYXRoLCByZW1vdmUpXG4gIH1cbn1cblxuZnVuY3Rpb24gcmVkYWN0SW50ZXJtZWRpYXRlV2lsZGNhcmQgKG9iaiwgcGFydHMsIGNlbnNvciwgd2lsZGNhcmRJbmRleCwgb3JpZ2luYWxQYXRoLCByZW1vdmUgPSBmYWxzZSkge1xuICBjb25zdCBiZWZvcmVXaWxkY2FyZCA9IHBhcnRzLnNsaWNlKDAsIHdpbGRjYXJkSW5kZXgpXG4gIGNvbnN0IGFmdGVyV2lsZGNhcmQgPSBwYXJ0cy5zbGljZSh3aWxkY2FyZEluZGV4ICsgMSlcbiAgY29uc3QgcGF0aEFycmF5ID0gW10gLy8gQ2FjaGVkIGFycmF5IHRvIGF2b2lkIGFsbG9jYXRpb25zXG5cbiAgZnVuY3Rpb24gdHJhdmVyc2UgKGN1cnJlbnQsIHBhdGhMZW5ndGgpIHtcbiAgICBpZiAocGF0aExlbmd0aCA9PT0gYmVmb3JlV2lsZGNhcmQubGVuZ3RoKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjdXJyZW50KSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBwYXRoQXJyYXlbcGF0aExlbmd0aF0gPSBpLnRvU3RyaW5nKClcbiAgICAgICAgICB0cmF2ZXJzZShjdXJyZW50W2ldLCBwYXRoTGVuZ3RoICsgMSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY3VycmVudCA9PT0gJ29iamVjdCcgJiYgY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBjdXJyZW50KSB7XG4gICAgICAgICAgcGF0aEFycmF5W3BhdGhMZW5ndGhdID0ga2V5XG4gICAgICAgICAgdHJhdmVyc2UoY3VycmVudFtrZXldLCBwYXRoTGVuZ3RoICsgMSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocGF0aExlbmd0aCA8IGJlZm9yZVdpbGRjYXJkLmxlbmd0aCkge1xuICAgICAgY29uc3QgbmV4dEtleSA9IGJlZm9yZVdpbGRjYXJkW3BhdGhMZW5ndGhdXG4gICAgICAvLyBUeXBlIHNhZmV0eTogQ2hlY2sgaWYgY3VycmVudCBpcyBhbiBvYmplY3QgYmVmb3JlIHVzaW5nICdpbicgb3BlcmF0b3JcbiAgICAgIGlmIChjdXJyZW50ICYmIHR5cGVvZiBjdXJyZW50ID09PSAnb2JqZWN0JyAmJiBjdXJyZW50ICE9PSBudWxsICYmIG5leHRLZXkgaW4gY3VycmVudCkge1xuICAgICAgICBwYXRoQXJyYXlbcGF0aExlbmd0aF0gPSBuZXh0S2V5XG4gICAgICAgIHRyYXZlcnNlKGN1cnJlbnRbbmV4dEtleV0sIHBhdGhMZW5ndGggKyAxKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDaGVjayBpZiBhZnRlcldpbGRjYXJkIGNvbnRhaW5zIG1vcmUgd2lsZGNhcmRzXG4gICAgICBpZiAoYWZ0ZXJXaWxkY2FyZC5pbmNsdWRlcygnKicpKSB7XG4gICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGhhbmRsZSByZW1haW5pbmcgd2lsZGNhcmRzXG4gICAgICAgIC8vIFdyYXAgY2Vuc29yIHRvIHByZXBlbmQgY3VycmVudCBwYXRoIGNvbnRleHRcbiAgICAgICAgY29uc3Qgd3JhcHBlZENlbnNvciA9IHR5cGVvZiBjZW5zb3IgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/ICh2YWx1ZSwgcGF0aCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBmdWxsUGF0aCA9IFsuLi5wYXRoQXJyYXkuc2xpY2UoMCwgcGF0aExlbmd0aCksIC4uLnBhdGhdXG4gICAgICAgICAgICAgIHJldHVybiBjZW5zb3IodmFsdWUsIGZ1bGxQYXRoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDogY2Vuc29yXG4gICAgICAgIHJlZGFjdFdpbGRjYXJkUGF0aChjdXJyZW50LCBhZnRlcldpbGRjYXJkLCB3cmFwcGVkQ2Vuc29yLCBvcmlnaW5hbFBhdGgsIHJlbW92ZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE5vIG1vcmUgd2lsZGNhcmRzLCBhcHBseSB0aGUgcmVkYWN0aW9uIGRpcmVjdGx5XG4gICAgICAgIGlmIChyZW1vdmUpIHtcbiAgICAgICAgICByZW1vdmVLZXkoY3VycmVudCwgYWZ0ZXJXaWxkY2FyZClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBhY3R1YWxDZW5zb3IgPSB0eXBlb2YgY2Vuc29yID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICA/IGNlbnNvcihnZXRWYWx1ZShjdXJyZW50LCBhZnRlcldpbGRjYXJkKSwgWy4uLnBhdGhBcnJheS5zbGljZSgwLCBwYXRoTGVuZ3RoKSwgLi4uYWZ0ZXJXaWxkY2FyZF0pXG4gICAgICAgICAgICA6IGNlbnNvclxuICAgICAgICAgIHNldFZhbHVlKGN1cnJlbnQsIGFmdGVyV2lsZGNhcmQsIGFjdHVhbENlbnNvcilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChiZWZvcmVXaWxkY2FyZC5sZW5ndGggPT09IDApIHtcbiAgICB0cmF2ZXJzZShvYmosIDApXG4gIH0gZWxzZSB7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmpcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJlZm9yZVdpbGRjYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwYXJ0ID0gYmVmb3JlV2lsZGNhcmRbaV1cbiAgICAgIGlmIChjdXJyZW50ID09PSBudWxsIHx8IGN1cnJlbnQgPT09IHVuZGVmaW5lZCkgcmV0dXJuXG4gICAgICAvLyBUeXBlIHNhZmV0eTogQ2hlY2sgaWYgY3VycmVudCBpcyBhbiBvYmplY3QgYmVmb3JlIHByb3BlcnR5IGFjY2Vzc1xuICAgICAgaWYgKHR5cGVvZiBjdXJyZW50ICE9PSAnb2JqZWN0JyB8fCBjdXJyZW50ID09PSBudWxsKSByZXR1cm5cbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3BhcnRdXG4gICAgICBwYXRoQXJyYXlbaV0gPSBwYXJ0XG4gICAgfVxuICAgIGlmIChjdXJyZW50ICE9PSBudWxsICYmIGN1cnJlbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdHJhdmVyc2UoY3VycmVudCwgYmVmb3JlV2lsZGNhcmQubGVuZ3RoKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBidWlsZFBhdGhTdHJ1Y3R1cmUgKHBhdGhzVG9DbG9uZSkge1xuICBpZiAocGF0aHNUb0Nsb25lLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBudWxsIC8vIE5vIHBhdGhzIHRvIHJlZGFjdFxuICB9XG5cbiAgLy8gUGFyc2UgYWxsIHBhdGhzIGFuZCBvcmdhbml6ZSBieSBkZXB0aFxuICBjb25zdCBwYXRoU3RydWN0dXJlID0gbmV3IE1hcCgpXG4gIGZvciAoY29uc3QgcGF0aCBvZiBwYXRoc1RvQ2xvbmUpIHtcbiAgICBjb25zdCBwYXJ0cyA9IHBhcnNlUGF0aChwYXRoKVxuICAgIGxldCBjdXJyZW50ID0gcGF0aFN0cnVjdHVyZVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHBhcnQgPSBwYXJ0c1tpXVxuICAgICAgaWYgKCFjdXJyZW50LmhhcyhwYXJ0KSkge1xuICAgICAgICBjdXJyZW50LnNldChwYXJ0LCBuZXcgTWFwKCkpXG4gICAgICB9XG4gICAgICBjdXJyZW50ID0gY3VycmVudC5nZXQocGFydClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHBhdGhTdHJ1Y3R1cmVcbn1cblxuZnVuY3Rpb24gc2VsZWN0aXZlQ2xvbmUgKG9iaiwgcGF0aFN0cnVjdHVyZSkge1xuICBpZiAoIXBhdGhTdHJ1Y3R1cmUpIHtcbiAgICByZXR1cm4gb2JqIC8vIE5vIHBhdGhzIHRvIHJlZGFjdCwgcmV0dXJuIG9yaWdpbmFsXG4gIH1cblxuICBmdW5jdGlvbiBjbG9uZVNlbGVjdGl2ZWx5IChzb3VyY2UsIHBhdGhNYXAsIGRlcHRoID0gMCkge1xuICAgIGlmICghcGF0aE1hcCB8fCBwYXRoTWFwLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiBzb3VyY2UgLy8gTm8gbW9yZSBwYXRocyB0byBjbG9uZSwgcmV0dXJuIHJlZmVyZW5jZVxuICAgIH1cblxuICAgIGlmIChzb3VyY2UgPT09IG51bGwgfHwgdHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBzb3VyY2VcbiAgICB9XG5cbiAgICBpZiAoc291cmNlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKHNvdXJjZS5nZXRUaW1lKCkpXG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgY29uc3QgY2xvbmVkID0gW11cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGluZGV4U3RyID0gaS50b1N0cmluZygpXG4gICAgICAgIGlmIChwYXRoTWFwLmhhcyhpbmRleFN0cikgfHwgcGF0aE1hcC5oYXMoJyonKSkge1xuICAgICAgICAgIGNsb25lZFtpXSA9IGNsb25lU2VsZWN0aXZlbHkoc291cmNlW2ldLCBwYXRoTWFwLmdldChpbmRleFN0cikgfHwgcGF0aE1hcC5nZXQoJyonKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjbG9uZWRbaV0gPSBzb3VyY2VbaV0gLy8gU2hhcmUgcmVmZXJlbmNlIGZvciBub24tcmVkYWN0ZWQgaXRlbXNcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNsb25lZFxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBvYmplY3RzXG4gICAgY29uc3QgY2xvbmVkID0gT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc291cmNlKSlcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIGlmIChwYXRoTWFwLmhhcyhrZXkpIHx8IHBhdGhNYXAuaGFzKCcqJykpIHtcbiAgICAgICAgICBjbG9uZWRba2V5XSA9IGNsb25lU2VsZWN0aXZlbHkoc291cmNlW2tleV0sIHBhdGhNYXAuZ2V0KGtleSkgfHwgcGF0aE1hcC5nZXQoJyonKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjbG9uZWRba2V5XSA9IHNvdXJjZVtrZXldIC8vIFNoYXJlIHJlZmVyZW5jZSBmb3Igbm9uLXJlZGFjdGVkIHByb3BlcnRpZXNcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2xvbmVkXG4gIH1cblxuICByZXR1cm4gY2xvbmVTZWxlY3RpdmVseShvYmosIHBhdGhTdHJ1Y3R1cmUpXG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlUGF0aCAocGF0aCkge1xuICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQYXRocyBtdXN0IGJlIChub24tZW1wdHkpIHN0cmluZ3MnKVxuICB9XG5cbiAgaWYgKHBhdGggPT09ICcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHJlZGFjdGlvbiBwYXRoICgpJylcbiAgfVxuXG4gIC8vIENoZWNrIGZvciBkb3VibGUgZG90c1xuICBpZiAocGF0aC5pbmNsdWRlcygnLi4nKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCByZWRhY3Rpb24gcGF0aCAoJHtwYXRofSlgKVxuICB9XG5cbiAgLy8gQ2hlY2sgZm9yIGNvbW1hLXNlcGFyYXRlZCBwYXRocyAoaW52YWxpZCBzeW50YXgpXG4gIGlmIChwYXRoLmluY2x1ZGVzKCcsJykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcmVkYWN0aW9uIHBhdGggKCR7cGF0aH0pYClcbiAgfVxuXG4gIC8vIENoZWNrIGZvciB1bm1hdGNoZWQgYnJhY2tldHNcbiAgbGV0IGJyYWNrZXRDb3VudCA9IDBcbiAgbGV0IGluUXVvdGVzID0gZmFsc2VcbiAgbGV0IHF1b3RlQ2hhciA9ICcnXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2hhciA9IHBhdGhbaV1cblxuICAgIGlmICgoY2hhciA9PT0gJ1wiJyB8fCBjaGFyID09PSBcIidcIikgJiYgYnJhY2tldENvdW50ID4gMCkge1xuICAgICAgaWYgKCFpblF1b3Rlcykge1xuICAgICAgICBpblF1b3RlcyA9IHRydWVcbiAgICAgICAgcXVvdGVDaGFyID0gY2hhclxuICAgICAgfSBlbHNlIGlmIChjaGFyID09PSBxdW90ZUNoYXIpIHtcbiAgICAgICAgaW5RdW90ZXMgPSBmYWxzZVxuICAgICAgICBxdW90ZUNoYXIgPSAnJ1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2hhciA9PT0gJ1snICYmICFpblF1b3Rlcykge1xuICAgICAgYnJhY2tldENvdW50KytcbiAgICB9IGVsc2UgaWYgKGNoYXIgPT09ICddJyAmJiAhaW5RdW90ZXMpIHtcbiAgICAgIGJyYWNrZXRDb3VudC0tXG4gICAgICBpZiAoYnJhY2tldENvdW50IDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcmVkYWN0aW9uIHBhdGggKCR7cGF0aH0pYClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoYnJhY2tldENvdW50ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHJlZGFjdGlvbiBwYXRoICgke3BhdGh9KWApXG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVQYXRocyAocGF0aHMpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHBhdGhzKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BhdGhzIG11c3QgYmUgYW4gYXJyYXknKVxuICB9XG5cbiAgZm9yIChjb25zdCBwYXRoIG9mIHBhdGhzKSB7XG4gICAgdmFsaWRhdGVQYXRoKHBhdGgpXG4gIH1cbn1cblxuZnVuY3Rpb24gc2xvd1JlZGFjdCAob3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHtcbiAgICBwYXRocyA9IFtdLFxuICAgIGNlbnNvciA9ICdbUkVEQUNURURdJyxcbiAgICBzZXJpYWxpemUgPSBKU09OLnN0cmluZ2lmeSxcbiAgICBzdHJpY3QgPSB0cnVlLFxuICAgIHJlbW92ZSA9IGZhbHNlXG4gIH0gPSBvcHRpb25zXG5cbiAgLy8gVmFsaWRhdGUgcGF0aHMgdXBmcm9udCB0byBtYXRjaCBmYXN0LXJlZGFjdCBiZWhhdmlvclxuICB2YWxpZGF0ZVBhdGhzKHBhdGhzKVxuXG4gIC8vIEJ1aWxkIHBhdGggc3RydWN0dXJlIG9uY2UgZHVyaW5nIHNldHVwLCBub3Qgb24gZXZlcnkgY2FsbFxuICBjb25zdCBwYXRoU3RydWN0dXJlID0gYnVpbGRQYXRoU3RydWN0dXJlKHBhdGhzKVxuXG4gIHJldHVybiBmdW5jdGlvbiByZWRhY3QgKG9iaikge1xuICAgIGlmIChzdHJpY3QgJiYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JykpIHtcbiAgICAgIGlmIChvYmogPT09IG51bGwgfHwgb2JqID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHNlcmlhbGl6ZSA/IHNlcmlhbGl6ZShvYmopIDogb2JqXG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIHNlcmlhbGl6ZSA/IHNlcmlhbGl6ZShvYmopIDogb2JqXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gT25seSBjbG9uZSBwYXRocyB0aGF0IG5lZWQgcmVkYWN0aW9uXG4gICAgY29uc3QgY2xvbmVkID0gc2VsZWN0aXZlQ2xvbmUob2JqLCBwYXRoU3RydWN0dXJlKVxuICAgIGNvbnN0IG9yaWdpbmFsID0gb2JqIC8vIEtlZXAgcmVmZXJlbmNlIHRvIG9yaWdpbmFsIGZvciByZXN0b3JlXG5cbiAgICBsZXQgYWN0dWFsQ2Vuc29yID0gY2Vuc29yXG4gICAgaWYgKHR5cGVvZiBjZW5zb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFjdHVhbENlbnNvciA9IGNlbnNvclxuICAgIH1cblxuICAgIHJlZGFjdFBhdGhzKGNsb25lZCwgcGF0aHMsIGFjdHVhbENlbnNvciwgcmVtb3ZlKVxuXG4gICAgaWYgKHNlcmlhbGl6ZSA9PT0gZmFsc2UpIHtcbiAgICAgIGNsb25lZC5yZXN0b3JlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZGVlcENsb25lKG9yaWdpbmFsKSAvLyBGdWxsIGNsb25lIG9ubHkgd2hlbiByZXN0b3JlIGlzIGNhbGxlZFxuICAgICAgfVxuICAgICAgcmV0dXJuIGNsb25lZFxuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygc2VyaWFsaXplID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gc2VyaWFsaXplKGNsb25lZClcbiAgICB9XG5cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoY2xvbmVkKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2xvd1JlZGFjdFxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBzZXRMZXZlbFN5bSA9IFN5bWJvbCgncGluby5zZXRMZXZlbCcpXG5jb25zdCBnZXRMZXZlbFN5bSA9IFN5bWJvbCgncGluby5nZXRMZXZlbCcpXG5jb25zdCBsZXZlbFZhbFN5bSA9IFN5bWJvbCgncGluby5sZXZlbFZhbCcpXG5jb25zdCBsZXZlbENvbXBTeW0gPSBTeW1ib2woJ3Bpbm8ubGV2ZWxDb21wJylcbmNvbnN0IHVzZUxldmVsTGFiZWxzU3ltID0gU3ltYm9sKCdwaW5vLnVzZUxldmVsTGFiZWxzJylcbmNvbnN0IHVzZU9ubHlDdXN0b21MZXZlbHNTeW0gPSBTeW1ib2woJ3Bpbm8udXNlT25seUN1c3RvbUxldmVscycpXG5jb25zdCBtaXhpblN5bSA9IFN5bWJvbCgncGluby5taXhpbicpXG5cbmNvbnN0IGxzQ2FjaGVTeW0gPSBTeW1ib2woJ3Bpbm8ubHNDYWNoZScpXG5jb25zdCBjaGluZGluZ3NTeW0gPSBTeW1ib2woJ3Bpbm8uY2hpbmRpbmdzJylcblxuY29uc3QgYXNKc29uU3ltID0gU3ltYm9sKCdwaW5vLmFzSnNvbicpXG5jb25zdCB3cml0ZVN5bSA9IFN5bWJvbCgncGluby53cml0ZScpXG5jb25zdCByZWRhY3RGbXRTeW0gPSBTeW1ib2woJ3Bpbm8ucmVkYWN0Rm10JylcblxuY29uc3QgdGltZVN5bSA9IFN5bWJvbCgncGluby50aW1lJylcbmNvbnN0IHRpbWVTbGljZUluZGV4U3ltID0gU3ltYm9sKCdwaW5vLnRpbWVTbGljZUluZGV4JylcbmNvbnN0IHN0cmVhbVN5bSA9IFN5bWJvbCgncGluby5zdHJlYW0nKVxuY29uc3Qgc3RyaW5naWZ5U3ltID0gU3ltYm9sKCdwaW5vLnN0cmluZ2lmeScpXG5jb25zdCBzdHJpbmdpZnlTYWZlU3ltID0gU3ltYm9sKCdwaW5vLnN0cmluZ2lmeVNhZmUnKVxuY29uc3Qgc3RyaW5naWZpZXJzU3ltID0gU3ltYm9sKCdwaW5vLnN0cmluZ2lmaWVycycpXG5jb25zdCBlbmRTeW0gPSBTeW1ib2woJ3Bpbm8uZW5kJylcbmNvbnN0IGZvcm1hdE9wdHNTeW0gPSBTeW1ib2woJ3Bpbm8uZm9ybWF0T3B0cycpXG5jb25zdCBtZXNzYWdlS2V5U3ltID0gU3ltYm9sKCdwaW5vLm1lc3NhZ2VLZXknKVxuY29uc3QgZXJyb3JLZXlTeW0gPSBTeW1ib2woJ3Bpbm8uZXJyb3JLZXknKVxuY29uc3QgbmVzdGVkS2V5U3ltID0gU3ltYm9sKCdwaW5vLm5lc3RlZEtleScpXG5jb25zdCBuZXN0ZWRLZXlTdHJTeW0gPSBTeW1ib2woJ3Bpbm8ubmVzdGVkS2V5U3RyJylcbmNvbnN0IG1peGluTWVyZ2VTdHJhdGVneVN5bSA9IFN5bWJvbCgncGluby5taXhpbk1lcmdlU3RyYXRlZ3knKVxuY29uc3QgbXNnUHJlZml4U3ltID0gU3ltYm9sKCdwaW5vLm1zZ1ByZWZpeCcpXG5cbmNvbnN0IHdpbGRjYXJkRmlyc3RTeW0gPSBTeW1ib2woJ3Bpbm8ud2lsZGNhcmRGaXJzdCcpXG5cbi8vIHB1YmxpYyBzeW1ib2xzLCBubyBuZWVkIHRvIHVzZSB0aGUgc2FtZSBwaW5vXG4vLyB2ZXJzaW9uIGZvciB0aGVzZVxuY29uc3Qgc2VyaWFsaXplcnNTeW0gPSBTeW1ib2wuZm9yKCdwaW5vLnNlcmlhbGl6ZXJzJylcbmNvbnN0IGZvcm1hdHRlcnNTeW0gPSBTeW1ib2wuZm9yKCdwaW5vLmZvcm1hdHRlcnMnKVxuY29uc3QgaG9va3NTeW0gPSBTeW1ib2wuZm9yKCdwaW5vLmhvb2tzJylcbmNvbnN0IG5lZWRzTWV0YWRhdGFHc3ltID0gU3ltYm9sLmZvcigncGluby5tZXRhZGF0YScpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXRMZXZlbFN5bSxcbiAgZ2V0TGV2ZWxTeW0sXG4gIGxldmVsVmFsU3ltLFxuICBsZXZlbENvbXBTeW0sXG4gIHVzZUxldmVsTGFiZWxzU3ltLFxuICBtaXhpblN5bSxcbiAgbHNDYWNoZVN5bSxcbiAgY2hpbmRpbmdzU3ltLFxuICBhc0pzb25TeW0sXG4gIHdyaXRlU3ltLFxuICBzZXJpYWxpemVyc1N5bSxcbiAgcmVkYWN0Rm10U3ltLFxuICB0aW1lU3ltLFxuICB0aW1lU2xpY2VJbmRleFN5bSxcbiAgc3RyZWFtU3ltLFxuICBzdHJpbmdpZnlTeW0sXG4gIHN0cmluZ2lmeVNhZmVTeW0sXG4gIHN0cmluZ2lmaWVyc1N5bSxcbiAgZW5kU3ltLFxuICBmb3JtYXRPcHRzU3ltLFxuICBtZXNzYWdlS2V5U3ltLFxuICBlcnJvcktleVN5bSxcbiAgbmVzdGVkS2V5U3ltLFxuICB3aWxkY2FyZEZpcnN0U3ltLFxuICBuZWVkc01ldGFkYXRhR3N5bSxcbiAgdXNlT25seUN1c3RvbUxldmVsc1N5bSxcbiAgZm9ybWF0dGVyc1N5bSxcbiAgaG9va3NTeW0sXG4gIG5lc3RlZEtleVN0clN5bSxcbiAgbWl4aW5NZXJnZVN0cmF0ZWd5U3ltLFxuICBtc2dQcmVmaXhTeW1cbn1cbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgUmVkYWN0ID0gcmVxdWlyZSgnQHBpbm9qcy9yZWRhY3QnKVxuY29uc3QgeyByZWRhY3RGbXRTeW0sIHdpbGRjYXJkRmlyc3RTeW0gfSA9IHJlcXVpcmUoJy4vc3ltYm9scycpXG5cbi8vIEN1c3RvbSByeCByZWdleCBlcXVpdmFsZW50IHRvIGZhc3QtcmVkYWN0J3MgcnhcbmNvbnN0IHJ4ID0gL1teLltcXF1dK3xcXFsoW15bXFxdXSo/KVxcXS9nXG5cbmNvbnN0IENFTlNPUiA9ICdbUmVkYWN0ZWRdJ1xuY29uc3Qgc3RyaWN0ID0gZmFsc2UgLy8gVE9ETyBzaG91bGQgdGhpcyBiZSBjb25maWd1cmFibGU/XG5cbmZ1bmN0aW9uIHJlZGFjdGlvbiAob3B0cywgc2VyaWFsaXplKSB7XG4gIGNvbnN0IHsgcGF0aHMsIGNlbnNvciwgcmVtb3ZlIH0gPSBoYW5kbGUob3B0cylcblxuICBjb25zdCBzaGFwZSA9IHBhdGhzLnJlZHVjZSgobywgc3RyKSA9PiB7XG4gICAgcngubGFzdEluZGV4ID0gMFxuICAgIGNvbnN0IGZpcnN0ID0gcnguZXhlYyhzdHIpXG4gICAgY29uc3QgbmV4dCA9IHJ4LmV4ZWMoc3RyKVxuXG4gICAgLy8gbnMgaXMgdGhlIHRvcC1sZXZlbCBwYXRoIHNlZ21lbnQsIGJyYWNrZXRzICsgcXVvdGluZyByZW1vdmVkLlxuICAgIGxldCBucyA9IGZpcnN0WzFdICE9PSB1bmRlZmluZWRcbiAgICAgID8gZmlyc3RbMV0ucmVwbGFjZSgvXig/OlwifCd8YCkoLiopKD86XCJ8J3xgKSQvLCAnJDEnKVxuICAgICAgOiBmaXJzdFswXVxuXG4gICAgaWYgKG5zID09PSAnKicpIHtcbiAgICAgIG5zID0gd2lsZGNhcmRGaXJzdFN5bVxuICAgIH1cblxuICAgIC8vIHRvcCBsZXZlbCBrZXk6XG4gICAgaWYgKG5leHQgPT09IG51bGwpIHtcbiAgICAgIG9bbnNdID0gbnVsbFxuICAgICAgcmV0dXJuIG9cbiAgICB9XG5cbiAgICAvLyBwYXRoIHdpdGggYXQgbGVhc3QgdHdvIHNlZ21lbnRzOlxuICAgIC8vIGlmIG5zIGlzIGFscmVhZHkgcmVkYWN0ZWQgYXQgdGhlIHRvcCBsZXZlbCwgaWdub3JlIGxvd2VyIGxldmVsIHJlZGFjdGlvbnNcbiAgICBpZiAob1tuc10gPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBvXG4gICAgfVxuXG4gICAgY29uc3QgeyBpbmRleCB9ID0gbmV4dFxuICAgIGNvbnN0IG5leHRQYXRoID0gYCR7c3RyLnN1YnN0cihpbmRleCwgc3RyLmxlbmd0aCAtIDEpfWBcblxuICAgIG9bbnNdID0gb1tuc10gfHwgW11cblxuICAgIC8vIHNoYXBlIGlzIGEgbWl4IG9mIHBhdGhzIGJlZ2lubmluZyB3aXRoIGxpdGVyYWwgdmFsdWVzIGFuZCB3aWxkY2FyZFxuICAgIC8vIHBhdGhzIFsgXCJhLmIuY1wiLCBcIiouYi56XCIgXSBzaG91bGQgcmVkdWNlIHRvIGEgc2hhcGUgb2ZcbiAgICAvLyB7IFwiYVwiOiBbIFwiYi5jXCIsIFwiYi56XCIgXSwgKjogWyBcImIuelwiIF0gfVxuICAgIC8vIG5vdGU6IFwiYi56XCIgaXMgaW4gYm90aCBcImFcIiBhbmQgKiBhcnJheXMgYmVjYXVzZSBcImFcIiBtYXRjaGVzIHRoZSB3aWxkY2FyZC5cbiAgICAvLyAoKiBlbnRyeSBoYXMgd2lsZGNhcmRGaXJzdFN5bSBhcyBrZXkpXG4gICAgaWYgKG5zICE9PSB3aWxkY2FyZEZpcnN0U3ltICYmIG9bbnNdLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gZmlyc3QgdGltZSBucydzIGdldCBhbGwgJyonIHJlZGFjdGlvbnMgc28gZmFyXG4gICAgICBvW25zXS5wdXNoKC4uLihvW3dpbGRjYXJkRmlyc3RTeW1dIHx8IFtdKSlcbiAgICB9XG5cbiAgICBpZiAobnMgPT09IHdpbGRjYXJkRmlyc3RTeW0pIHtcbiAgICAgIC8vIG5ldyAqIHBhdGggZ2V0cyBhZGRlZCB0byBhbGwgcHJldmlvdXNseSByZWdpc3RlcmVkIGxpdGVyYWwgbnMncy5cbiAgICAgIE9iamVjdC5rZXlzKG8pLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAgaWYgKG9ba10pIHtcbiAgICAgICAgICBvW2tdLnB1c2gobmV4dFBhdGgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgb1tuc10ucHVzaChuZXh0UGF0aClcbiAgICByZXR1cm4gb1xuICB9LCB7fSlcblxuICAvLyB0aGUgcmVkYWN0b3IgYXNzaWduZWQgdG8gdGhlIGZvcm1hdCBzeW1ib2wga2V5XG4gIC8vIHByb3ZpZGVzIHRvcCBsZXZlbCByZWRhY3Rpb24gZm9yIGluc3RhbmNlcyB3aGVyZVxuICAvLyBhbiBvYmplY3QgaXMgaW50ZXJwb2xhdGVkIGludG8gdGhlIG1zZyBzdHJpbmdcbiAgY29uc3QgcmVzdWx0ID0ge1xuICAgIFtyZWRhY3RGbXRTeW1dOiBSZWRhY3QoeyBwYXRocywgY2Vuc29yLCBzZXJpYWxpemUsIHN0cmljdCwgcmVtb3ZlIH0pXG4gIH1cblxuICBjb25zdCB0b3BDZW5zb3IgPSAoLi4uYXJncykgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgY2Vuc29yID09PSAnZnVuY3Rpb24nID8gc2VyaWFsaXplKGNlbnNvciguLi5hcmdzKSkgOiBzZXJpYWxpemUoY2Vuc29yKVxuICB9XG5cbiAgcmV0dXJuIFsuLi5PYmplY3Qua2V5cyhzaGFwZSksIC4uLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc2hhcGUpXS5yZWR1Y2UoKG8sIGspID0+IHtcbiAgICAvLyB0b3AgbGV2ZWwga2V5OlxuICAgIGlmIChzaGFwZVtrXSA9PT0gbnVsbCkge1xuICAgICAgb1trXSA9ICh2YWx1ZSkgPT4gdG9wQ2Vuc29yKHZhbHVlLCBba10pXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHdyYXBwZWRDZW5zb3IgPSB0eXBlb2YgY2Vuc29yID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gKHZhbHVlLCBwYXRoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2Vuc29yKHZhbHVlLCBbaywgLi4ucGF0aF0pXG4gICAgICAgICAgfVxuICAgICAgICA6IGNlbnNvclxuICAgICAgb1trXSA9IFJlZGFjdCh7XG4gICAgICAgIHBhdGhzOiBzaGFwZVtrXSxcbiAgICAgICAgY2Vuc29yOiB3cmFwcGVkQ2Vuc29yLFxuICAgICAgICBzZXJpYWxpemUsXG4gICAgICAgIHN0cmljdCxcbiAgICAgICAgcmVtb3ZlXG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gb1xuICB9LCByZXN1bHQpXG59XG5cbmZ1bmN0aW9uIGhhbmRsZSAob3B0cykge1xuICBpZiAoQXJyYXkuaXNBcnJheShvcHRzKSkge1xuICAgIG9wdHMgPSB7IHBhdGhzOiBvcHRzLCBjZW5zb3I6IENFTlNPUiB9XG4gICAgcmV0dXJuIG9wdHNcbiAgfVxuICBsZXQgeyBwYXRocywgY2Vuc29yID0gQ0VOU09SLCByZW1vdmUgfSA9IG9wdHNcbiAgaWYgKEFycmF5LmlzQXJyYXkocGF0aHMpID09PSBmYWxzZSkgeyB0aHJvdyBFcnJvcigncGlubyBcdTIwMTMgcmVkYWN0IG11c3QgY29udGFpbiBhbiBhcnJheSBvZiBzdHJpbmdzJykgfVxuICBpZiAocmVtb3ZlID09PSB0cnVlKSBjZW5zb3IgPSB1bmRlZmluZWRcblxuICByZXR1cm4geyBwYXRocywgY2Vuc29yLCByZW1vdmUgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZGFjdGlvblxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBudWxsVGltZSA9ICgpID0+ICcnXG5cbmNvbnN0IGVwb2NoVGltZSA9ICgpID0+IGAsXCJ0aW1lXCI6JHtEYXRlLm5vdygpfWBcblxuY29uc3QgdW5peFRpbWUgPSAoKSA9PiBgLFwidGltZVwiOiR7TWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMC4wKX1gXG5cbmNvbnN0IGlzb1RpbWUgPSAoKSA9PiBgLFwidGltZVwiOlwiJHtuZXcgRGF0ZShEYXRlLm5vdygpKS50b0lTT1N0cmluZygpfVwiYCAvLyB1c2luZyBEYXRlLm5vdygpIGZvciB0ZXN0YWJpbGl0eVxuXG5jb25zdCBOU19QRVJfTVMgPSAxXzAwMF8wMDBuXG5jb25zdCBOU19QRVJfU0VDID0gMV8wMDBfMDAwXzAwMG5cblxuY29uc3Qgc3RhcnRXYWxsVGltZU5zID0gQmlnSW50KERhdGUubm93KCkpICogTlNfUEVSX01TXG5jb25zdCBzdGFydEhyVGltZSA9IHByb2Nlc3MuaHJ0aW1lLmJpZ2ludCgpXG5cbmNvbnN0IGlzb1RpbWVOYW5vID0gKCkgPT4ge1xuICBjb25zdCBlbGFwc2VkTnMgPSBwcm9jZXNzLmhydGltZS5iaWdpbnQoKSAtIHN0YXJ0SHJUaW1lXG4gIGNvbnN0IGN1cnJlbnRUaW1lTnMgPSBzdGFydFdhbGxUaW1lTnMgKyBlbGFwc2VkTnNcblxuICBjb25zdCBzZWNvbmRzU2luY2VFcG9jaCA9IGN1cnJlbnRUaW1lTnMgLyBOU19QRVJfU0VDXG4gIGNvbnN0IG5hbm9zV2l0aGluU2Vjb25kID0gY3VycmVudFRpbWVOcyAlIE5TX1BFUl9TRUNcblxuICBjb25zdCBtc1NpbmNlRXBvY2ggPSBOdW1iZXIoc2Vjb25kc1NpbmNlRXBvY2ggKiAxMDAwbiArIG5hbm9zV2l0aGluU2Vjb25kIC8gMV8wMDBfMDAwbilcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKG1zU2luY2VFcG9jaClcblxuICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRVVENGdWxsWWVhcigpXG4gIGNvbnN0IG1vbnRoID0gKGRhdGUuZ2V0VVRDTW9udGgoKSArIDEpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKVxuICBjb25zdCBkYXkgPSBkYXRlLmdldFVUQ0RhdGUoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJylcbiAgY29uc3QgaG91cnMgPSBkYXRlLmdldFVUQ0hvdXJzKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpXG4gIGNvbnN0IG1pbnV0ZXMgPSBkYXRlLmdldFVUQ01pbnV0ZXMoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJylcbiAgY29uc3Qgc2Vjb25kcyA9IGRhdGUuZ2V0VVRDU2Vjb25kcygpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKVxuXG4gIHJldHVybiBgLFwidGltZVwiOlwiJHt5ZWFyfS0ke21vbnRofS0ke2RheX1UJHtob3Vyc306JHttaW51dGVzfToke3NlY29uZHN9LiR7bmFub3NXaXRoaW5TZWNvbmRcbiAgICAudG9TdHJpbmcoKVxuICAgIC5wYWRTdGFydCg5LCAnMCcpfVpcImBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IG51bGxUaW1lLCBlcG9jaFRpbWUsIHVuaXhUaW1lLCBpc29UaW1lLCBpc29UaW1lTmFubyB9XG4iLCAiJ3VzZSBzdHJpY3QnXG5mdW5jdGlvbiB0cnlTdHJpbmdpZnkgKG8pIHtcbiAgdHJ5IHsgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG8pIH0gY2F0Y2goZSkgeyByZXR1cm4gJ1wiW0NpcmN1bGFyXVwiJyB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZm9ybWF0XG5cbmZ1bmN0aW9uIGZvcm1hdChmLCBhcmdzLCBvcHRzKSB7XG4gIHZhciBzcyA9IChvcHRzICYmIG9wdHMuc3RyaW5naWZ5KSB8fCB0cnlTdHJpbmdpZnlcbiAgdmFyIG9mZnNldCA9IDFcbiAgaWYgKHR5cGVvZiBmID09PSAnb2JqZWN0JyAmJiBmICE9PSBudWxsKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoICsgb2Zmc2V0XG4gICAgaWYgKGxlbiA9PT0gMSkgcmV0dXJuIGZcbiAgICB2YXIgb2JqZWN0cyA9IG5ldyBBcnJheShsZW4pXG4gICAgb2JqZWN0c1swXSA9IHNzKGYpXG4gICAgZm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8IGxlbjsgaW5kZXgrKykge1xuICAgICAgb2JqZWN0c1tpbmRleF0gPSBzcyhhcmdzW2luZGV4XSlcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdHMuam9pbignICcpXG4gIH1cbiAgaWYgKHR5cGVvZiBmICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmXG4gIH1cbiAgdmFyIGFyZ0xlbiA9IGFyZ3MubGVuZ3RoXG4gIGlmIChhcmdMZW4gPT09IDApIHJldHVybiBmXG4gIHZhciBzdHIgPSAnJ1xuICB2YXIgYSA9IDEgLSBvZmZzZXRcbiAgdmFyIGxhc3RQb3MgPSAtMVxuICB2YXIgZmxlbiA9IChmICYmIGYubGVuZ3RoKSB8fCAwXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZmxlbjspIHtcbiAgICBpZiAoZi5jaGFyQ29kZUF0KGkpID09PSAzNyAmJiBpICsgMSA8IGZsZW4pIHtcbiAgICAgIGxhc3RQb3MgPSBsYXN0UG9zID4gLTEgPyBsYXN0UG9zIDogMFxuICAgICAgc3dpdGNoIChmLmNoYXJDb2RlQXQoaSArIDEpKSB7XG4gICAgICAgIGNhc2UgMTAwOiAvLyAnZCdcbiAgICAgICAgY2FzZSAxMDI6IC8vICdmJ1xuICAgICAgICAgIGlmIChhID49IGFyZ0xlbilcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgaWYgKGFyZ3NbYV0gPT0gbnVsbCkgIGJyZWFrXG4gICAgICAgICAgaWYgKGxhc3RQb3MgPCBpKVxuICAgICAgICAgICAgc3RyICs9IGYuc2xpY2UobGFzdFBvcywgaSlcbiAgICAgICAgICBzdHIgKz0gTnVtYmVyKGFyZ3NbYV0pXG4gICAgICAgICAgbGFzdFBvcyA9IGkgKyAyXG4gICAgICAgICAgaSsrXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAxMDU6IC8vICdpJ1xuICAgICAgICAgIGlmIChhID49IGFyZ0xlbilcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgaWYgKGFyZ3NbYV0gPT0gbnVsbCkgIGJyZWFrXG4gICAgICAgICAgaWYgKGxhc3RQb3MgPCBpKVxuICAgICAgICAgICAgc3RyICs9IGYuc2xpY2UobGFzdFBvcywgaSlcbiAgICAgICAgICBzdHIgKz0gTWF0aC5mbG9vcihOdW1iZXIoYXJnc1thXSkpXG4gICAgICAgICAgbGFzdFBvcyA9IGkgKyAyXG4gICAgICAgICAgaSsrXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA3OTogLy8gJ08nXG4gICAgICAgIGNhc2UgMTExOiAvLyAnbydcbiAgICAgICAgY2FzZSAxMDY6IC8vICdqJ1xuICAgICAgICAgIGlmIChhID49IGFyZ0xlbilcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgaWYgKGFyZ3NbYV0gPT09IHVuZGVmaW5lZCkgYnJlYWtcbiAgICAgICAgICBpZiAobGFzdFBvcyA8IGkpXG4gICAgICAgICAgICBzdHIgKz0gZi5zbGljZShsYXN0UG9zLCBpKVxuICAgICAgICAgIHZhciB0eXBlID0gdHlwZW9mIGFyZ3NbYV1cbiAgICAgICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHN0ciArPSAnXFwnJyArIGFyZ3NbYV0gKyAnXFwnJ1xuICAgICAgICAgICAgbGFzdFBvcyA9IGkgKyAyXG4gICAgICAgICAgICBpKytcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBzdHIgKz0gYXJnc1thXS5uYW1lIHx8ICc8YW5vbnltb3VzPidcbiAgICAgICAgICAgIGxhc3RQb3MgPSBpICsgMlxuICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdHIgKz0gc3MoYXJnc1thXSlcbiAgICAgICAgICBsYXN0UG9zID0gaSArIDJcbiAgICAgICAgICBpKytcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDExNTogLy8gJ3MnXG4gICAgICAgICAgaWYgKGEgPj0gYXJnTGVuKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBpZiAobGFzdFBvcyA8IGkpXG4gICAgICAgICAgICBzdHIgKz0gZi5zbGljZShsYXN0UG9zLCBpKVxuICAgICAgICAgIHN0ciArPSBTdHJpbmcoYXJnc1thXSlcbiAgICAgICAgICBsYXN0UG9zID0gaSArIDJcbiAgICAgICAgICBpKytcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM3OiAvLyAnJSdcbiAgICAgICAgICBpZiAobGFzdFBvcyA8IGkpXG4gICAgICAgICAgICBzdHIgKz0gZi5zbGljZShsYXN0UG9zLCBpKVxuICAgICAgICAgIHN0ciArPSAnJSdcbiAgICAgICAgICBsYXN0UG9zID0gaSArIDJcbiAgICAgICAgICBpKytcbiAgICAgICAgICBhLS1cbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgKythXG4gICAgfVxuICAgICsraVxuICB9XG4gIGlmIChsYXN0UG9zID09PSAtMSlcbiAgICByZXR1cm4gZlxuICBlbHNlIGlmIChsYXN0UG9zIDwgZmxlbikge1xuICAgIHN0ciArPSBmLnNsaWNlKGxhc3RQb3MpXG4gIH1cblxuICByZXR1cm4gc3RyXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbi8qIGdsb2JhbCBTaGFyZWRBcnJheUJ1ZmZlciwgQXRvbWljcyAqL1xuXG5pZiAodHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgQXRvbWljcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgY29uc3QgbmlsID0gbmV3IEludDMyQXJyYXkobmV3IFNoYXJlZEFycmF5QnVmZmVyKDQpKVxuXG4gIGZ1bmN0aW9uIHNsZWVwIChtcykge1xuICAgIC8vIGFsc28gZmlsdGVycyBvdXQgTmFOLCBub24tbnVtYmVyIHR5cGVzLCBpbmNsdWRpbmcgZW1wdHkgc3RyaW5ncywgYnV0IGFsbG93cyBiaWdpbnRzXG4gICAgY29uc3QgdmFsaWQgPSBtcyA+IDAgJiYgbXMgPCBJbmZpbml0eSBcbiAgICBpZiAodmFsaWQgPT09IGZhbHNlKSB7XG4gICAgICBpZiAodHlwZW9mIG1zICE9PSAnbnVtYmVyJyAmJiB0eXBlb2YgbXMgIT09ICdiaWdpbnQnKSB7XG4gICAgICAgIHRocm93IFR5cGVFcnJvcignc2xlZXA6IG1zIG11c3QgYmUgYSBudW1iZXInKVxuICAgICAgfVxuICAgICAgdGhyb3cgUmFuZ2VFcnJvcignc2xlZXA6IG1zIG11c3QgYmUgYSBudW1iZXIgdGhhdCBpcyBncmVhdGVyIHRoYW4gMCBidXQgbGVzcyB0aGFuIEluZmluaXR5JylcbiAgICB9XG5cbiAgICBBdG9taWNzLndhaXQobmlsLCAwLCAwLCBOdW1iZXIobXMpKVxuICB9XG4gIG1vZHVsZS5leHBvcnRzID0gc2xlZXBcbn0gZWxzZSB7XG5cbiAgZnVuY3Rpb24gc2xlZXAgKG1zKSB7XG4gICAgLy8gYWxzbyBmaWx0ZXJzIG91dCBOYU4sIG5vbi1udW1iZXIgdHlwZXMsIGluY2x1ZGluZyBlbXB0eSBzdHJpbmdzLCBidXQgYWxsb3dzIGJpZ2ludHNcbiAgICBjb25zdCB2YWxpZCA9IG1zID4gMCAmJiBtcyA8IEluZmluaXR5IFxuICAgIGlmICh2YWxpZCA9PT0gZmFsc2UpIHtcbiAgICAgIGlmICh0eXBlb2YgbXMgIT09ICdudW1iZXInICYmIHR5cGVvZiBtcyAhPT0gJ2JpZ2ludCcpIHtcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdzbGVlcDogbXMgbXVzdCBiZSBhIG51bWJlcicpXG4gICAgICB9XG4gICAgICB0aHJvdyBSYW5nZUVycm9yKCdzbGVlcDogbXMgbXVzdCBiZSBhIG51bWJlciB0aGF0IGlzIGdyZWF0ZXIgdGhhbiAwIGJ1dCBsZXNzIHRoYW4gSW5maW5pdHknKVxuICAgIH1cbiAgICBjb25zdCB0YXJnZXQgPSBEYXRlLm5vdygpICsgTnVtYmVyKG1zKVxuICAgIHdoaWxlICh0YXJnZXQgPiBEYXRlLm5vdygpKXt9XG4gIH1cblxuICBtb2R1bGUuZXhwb3J0cyA9IHNsZWVwXG5cbn1cbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG5jb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKVxuY29uc3QgaW5oZXJpdHMgPSByZXF1aXJlKCd1dGlsJykuaW5oZXJpdHNcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IHNsZWVwID0gcmVxdWlyZSgnYXRvbWljLXNsZWVwJylcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5cbmNvbnN0IEJVU1lfV1JJVEVfVElNRU9VVCA9IDEwMFxuY29uc3Qga0VtcHR5QnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKDApXG5cbi8vIDE2IEtCLiBEb24ndCB3cml0ZSBtb3JlIHRoYW4gZG9ja2VyIGJ1ZmZlciBzaXplLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL21vYnkvbW9ieS9ibG9iLzUxM2VjNzM4MzEyNjk5NDdkMzhhNjQ0YzI3OGNlM2NhYzM2NzgzYjIvZGFlbW9uL2xvZ2dlci9jb3BpZXIuZ28jTDEzXG5jb25zdCBNQVhfV1JJVEUgPSAxNiAqIDEwMjRcblxuY29uc3Qga0NvbnRlbnRNb2RlQnVmZmVyID0gJ2J1ZmZlcidcbmNvbnN0IGtDb250ZW50TW9kZVV0ZjggPSAndXRmOCdcblxuY29uc3QgW21ham9yLCBtaW5vcl0gPSAocHJvY2Vzcy52ZXJzaW9ucy5ub2RlIHx8ICcwLjAnKS5zcGxpdCgnLicpLm1hcChOdW1iZXIpXG5jb25zdCBrQ29weUJ1ZmZlciA9IG1ham9yID49IDIyICYmIG1pbm9yID49IDdcblxuZnVuY3Rpb24gb3BlbkZpbGUgKGZpbGUsIHNvbmljKSB7XG4gIHNvbmljLl9vcGVuaW5nID0gdHJ1ZVxuICBzb25pYy5fd3JpdGluZyA9IHRydWVcbiAgc29uaWMuX2FzeW5jRHJhaW5TY2hlZHVsZWQgPSBmYWxzZVxuXG4gIC8vIE5PVEU6ICdlcnJvcicgYW5kICdyZWFkeScgZXZlbnRzIGVtaXR0ZWQgYmVsb3cgb25seSByZWxldmFudCB3aGVuIHNvbmljLnN5bmM9PT1mYWxzZVxuICAvLyBmb3Igc3luYyBtb2RlLCB0aGVyZSBpcyBubyB3YXkgdG8gYWRkIGEgbGlzdGVuZXIgdGhhdCB3aWxsIHJlY2VpdmUgdGhlc2VcblxuICBmdW5jdGlvbiBmaWxlT3BlbmVkIChlcnIsIGZkKSB7XG4gICAgaWYgKGVycikge1xuICAgICAgc29uaWMuX3Jlb3BlbmluZyA9IGZhbHNlXG4gICAgICBzb25pYy5fd3JpdGluZyA9IGZhbHNlXG4gICAgICBzb25pYy5fb3BlbmluZyA9IGZhbHNlXG5cbiAgICAgIGlmIChzb25pYy5zeW5jKSB7XG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgIGlmIChzb25pYy5saXN0ZW5lckNvdW50KCdlcnJvcicpID4gMCkge1xuICAgICAgICAgICAgc29uaWMuZW1pdCgnZXJyb3InLCBlcnIpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc29uaWMuZW1pdCgnZXJyb3InLCBlcnIpXG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCByZW9wZW5pbmcgPSBzb25pYy5fcmVvcGVuaW5nXG5cbiAgICBzb25pYy5mZCA9IGZkXG4gICAgc29uaWMuZmlsZSA9IGZpbGVcbiAgICBzb25pYy5fcmVvcGVuaW5nID0gZmFsc2VcbiAgICBzb25pYy5fb3BlbmluZyA9IGZhbHNlXG4gICAgc29uaWMuX3dyaXRpbmcgPSBmYWxzZVxuXG4gICAgaWYgKHNvbmljLnN5bmMpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soKCkgPT4gc29uaWMuZW1pdCgncmVhZHknKSlcbiAgICB9IGVsc2Uge1xuICAgICAgc29uaWMuZW1pdCgncmVhZHknKVxuICAgIH1cblxuICAgIGlmIChzb25pYy5kZXN0cm95ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIHN0YXJ0XG4gICAgaWYgKCghc29uaWMuX3dyaXRpbmcgJiYgc29uaWMuX2xlbiA+IHNvbmljLm1pbkxlbmd0aCkgfHwgc29uaWMuX2ZsdXNoUGVuZGluZykge1xuICAgICAgc29uaWMuX2FjdHVhbFdyaXRlKClcbiAgICB9IGVsc2UgaWYgKHJlb3BlbmluZykge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljaygoKSA9PiBzb25pYy5lbWl0KCdkcmFpbicpKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGZsYWdzID0gc29uaWMuYXBwZW5kID8gJ2EnIDogJ3cnXG4gIGNvbnN0IG1vZGUgPSBzb25pYy5tb2RlXG5cbiAgaWYgKHNvbmljLnN5bmMpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKHNvbmljLm1rZGlyKSBmcy5ta2RpclN5bmMocGF0aC5kaXJuYW1lKGZpbGUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KVxuICAgICAgY29uc3QgZmQgPSBmcy5vcGVuU3luYyhmaWxlLCBmbGFncywgbW9kZSlcbiAgICAgIGZpbGVPcGVuZWQobnVsbCwgZmQpXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBmaWxlT3BlbmVkKGVycilcbiAgICAgIHRocm93IGVyclxuICAgIH1cbiAgfSBlbHNlIGlmIChzb25pYy5ta2Rpcikge1xuICAgIGZzLm1rZGlyKHBhdGguZGlybmFtZShmaWxlKSwgeyByZWN1cnNpdmU6IHRydWUgfSwgKGVycikgPT4ge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGZpbGVPcGVuZWQoZXJyKVxuICAgICAgZnMub3BlbihmaWxlLCBmbGFncywgbW9kZSwgZmlsZU9wZW5lZClcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGZzLm9wZW4oZmlsZSwgZmxhZ3MsIG1vZGUsIGZpbGVPcGVuZWQpXG4gIH1cbn1cblxuZnVuY3Rpb24gU29uaWNCb29tIChvcHRzKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTb25pY0Jvb20pKSB7XG4gICAgcmV0dXJuIG5ldyBTb25pY0Jvb20ob3B0cylcbiAgfVxuXG4gIGxldCB7IGZkLCBkZXN0LCBtaW5MZW5ndGgsIG1heExlbmd0aCwgbWF4V3JpdGUsIHBlcmlvZGljRmx1c2gsIHN5bmMsIGFwcGVuZCA9IHRydWUsIG1rZGlyLCByZXRyeUVBR0FJTiwgZnN5bmMsIGNvbnRlbnRNb2RlLCBtb2RlIH0gPSBvcHRzIHx8IHt9XG5cbiAgZmQgPSBmZCB8fCBkZXN0XG5cbiAgdGhpcy5fbGVuID0gMFxuICB0aGlzLmZkID0gLTFcbiAgdGhpcy5fYnVmcyA9IFtdXG4gIHRoaXMuX2xlbnMgPSBbXVxuICB0aGlzLl93cml0aW5nID0gZmFsc2VcbiAgdGhpcy5fZW5kaW5nID0gZmFsc2VcbiAgdGhpcy5fcmVvcGVuaW5nID0gZmFsc2VcbiAgdGhpcy5fYXN5bmNEcmFpblNjaGVkdWxlZCA9IGZhbHNlXG4gIHRoaXMuX2ZsdXNoUGVuZGluZyA9IGZhbHNlXG4gIHRoaXMuX2h3bSA9IE1hdGgubWF4KG1pbkxlbmd0aCB8fCAwLCAxNjM4NylcbiAgdGhpcy5maWxlID0gbnVsbFxuICB0aGlzLmRlc3Ryb3llZCA9IGZhbHNlXG4gIHRoaXMubWluTGVuZ3RoID0gbWluTGVuZ3RoIHx8IDBcbiAgdGhpcy5tYXhMZW5ndGggPSBtYXhMZW5ndGggfHwgMFxuICB0aGlzLm1heFdyaXRlID0gbWF4V3JpdGUgfHwgTUFYX1dSSVRFXG4gIHRoaXMuX3BlcmlvZGljRmx1c2ggPSBwZXJpb2RpY0ZsdXNoIHx8IDBcbiAgdGhpcy5fcGVyaW9kaWNGbHVzaFRpbWVyID0gdW5kZWZpbmVkXG4gIHRoaXMuc3luYyA9IHN5bmMgfHwgZmFsc2VcbiAgdGhpcy53cml0YWJsZSA9IHRydWVcbiAgdGhpcy5fZnN5bmMgPSBmc3luYyB8fCBmYWxzZVxuICB0aGlzLmFwcGVuZCA9IGFwcGVuZCB8fCBmYWxzZVxuICB0aGlzLm1vZGUgPSBtb2RlXG4gIHRoaXMucmV0cnlFQUdBSU4gPSByZXRyeUVBR0FJTiB8fCAoKCkgPT4gdHJ1ZSlcbiAgdGhpcy5ta2RpciA9IG1rZGlyIHx8IGZhbHNlXG5cbiAgbGV0IGZzV3JpdGVTeW5jXG4gIGxldCBmc1dyaXRlXG4gIGlmIChjb250ZW50TW9kZSA9PT0ga0NvbnRlbnRNb2RlQnVmZmVyKSB7XG4gICAgdGhpcy5fd3JpdGluZ0J1ZiA9IGtFbXB0eUJ1ZmZlclxuICAgIHRoaXMud3JpdGUgPSB3cml0ZUJ1ZmZlclxuICAgIHRoaXMuZmx1c2ggPSBmbHVzaEJ1ZmZlclxuICAgIHRoaXMuZmx1c2hTeW5jID0gZmx1c2hCdWZmZXJTeW5jXG4gICAgdGhpcy5fYWN0dWFsV3JpdGUgPSBhY3R1YWxXcml0ZUJ1ZmZlclxuICAgIGZzV3JpdGVTeW5jID0gKCkgPT4gZnMud3JpdGVTeW5jKHRoaXMuZmQsIHRoaXMuX3dyaXRpbmdCdWYpXG4gICAgZnNXcml0ZSA9ICgpID0+IGZzLndyaXRlKHRoaXMuZmQsIHRoaXMuX3dyaXRpbmdCdWYsIHRoaXMucmVsZWFzZSlcbiAgfSBlbHNlIGlmIChjb250ZW50TW9kZSA9PT0gdW5kZWZpbmVkIHx8IGNvbnRlbnRNb2RlID09PSBrQ29udGVudE1vZGVVdGY4KSB7XG4gICAgdGhpcy5fd3JpdGluZ0J1ZiA9ICcnXG4gICAgdGhpcy53cml0ZSA9IHdyaXRlXG4gICAgdGhpcy5mbHVzaCA9IGZsdXNoXG4gICAgdGhpcy5mbHVzaFN5bmMgPSBmbHVzaFN5bmNcbiAgICB0aGlzLl9hY3R1YWxXcml0ZSA9IGFjdHVhbFdyaXRlXG4gICAgZnNXcml0ZVN5bmMgPSAoKSA9PiB7XG4gICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKHRoaXMuX3dyaXRpbmdCdWYpKSB7XG4gICAgICAgIHJldHVybiBmcy53cml0ZVN5bmModGhpcy5mZCwgdGhpcy5fd3JpdGluZ0J1ZilcbiAgICAgIH1cbiAgICAgIHJldHVybiBmcy53cml0ZVN5bmModGhpcy5mZCwgdGhpcy5fd3JpdGluZ0J1ZiwgJ3V0ZjgnKVxuICAgIH1cbiAgICBmc1dyaXRlID0gKCkgPT4ge1xuICAgICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih0aGlzLl93cml0aW5nQnVmKSkge1xuICAgICAgICByZXR1cm4gZnMud3JpdGUodGhpcy5mZCwgdGhpcy5fd3JpdGluZ0J1ZiwgdGhpcy5yZWxlYXNlKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZzLndyaXRlKHRoaXMuZmQsIHRoaXMuX3dyaXRpbmdCdWYsICd1dGY4JywgdGhpcy5yZWxlYXNlKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFNvbmljQm9vbSBzdXBwb3J0cyBcIiR7a0NvbnRlbnRNb2RlVXRmOH1cIiBhbmQgXCIke2tDb250ZW50TW9kZUJ1ZmZlcn1cIiwgYnV0IHBhc3NlZCAke2NvbnRlbnRNb2RlfWApXG4gIH1cblxuICBpZiAodHlwZW9mIGZkID09PSAnbnVtYmVyJykge1xuICAgIHRoaXMuZmQgPSBmZFxuICAgIHByb2Nlc3MubmV4dFRpY2soKCkgPT4gdGhpcy5lbWl0KCdyZWFkeScpKVxuICB9IGVsc2UgaWYgKHR5cGVvZiBmZCA9PT0gJ3N0cmluZycpIHtcbiAgICBvcGVuRmlsZShmZCwgdGhpcylcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbmljQm9vbSBzdXBwb3J0cyBvbmx5IGZpbGUgZGVzY3JpcHRvcnMgYW5kIGZpbGVzJylcbiAgfVxuICBpZiAodGhpcy5taW5MZW5ndGggPj0gdGhpcy5tYXhXcml0ZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgbWluTGVuZ3RoIHNob3VsZCBiZSBzbWFsbGVyIHRoYW4gbWF4V3JpdGUgKCR7dGhpcy5tYXhXcml0ZX0pYClcbiAgfVxuXG4gIHRoaXMucmVsZWFzZSA9IChlcnIsIG4pID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBpZiAoKGVyci5jb2RlID09PSAnRUFHQUlOJyB8fCBlcnIuY29kZSA9PT0gJ0VCVVNZJykgJiYgdGhpcy5yZXRyeUVBR0FJTihlcnIsIHRoaXMuX3dyaXRpbmdCdWYubGVuZ3RoLCB0aGlzLl9sZW4gLSB0aGlzLl93cml0aW5nQnVmLmxlbmd0aCkpIHtcbiAgICAgICAgaWYgKHRoaXMuc3luYykge1xuICAgICAgICAgIC8vIFRoaXMgZXJyb3IgY29kZSBzaG91bGQgbm90IGhhcHBlbiBpbiBzeW5jIG1vZGUsIGJlY2F1c2UgaXQgaXNcbiAgICAgICAgICAvLyBub3QgdXNpbmcgdGhlIHVuZGVybGluaW5nIG9wZXJhdGluZyBzeXN0ZW0gYXN5bmNocm9ub3VzIGZ1bmN0aW9ucy5cbiAgICAgICAgICAvLyBIb3dldmVyIGl0IGhhcHBlbnMsIGFuZCBzbyB3ZSBoYW5kbGUgaXQuXG4gICAgICAgICAgLy8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vcGlub2pzL3Bpbm8vaXNzdWVzLzc4M1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzbGVlcChCVVNZX1dSSVRFX1RJTUVPVVQpXG4gICAgICAgICAgICB0aGlzLnJlbGVhc2UodW5kZWZpbmVkLCAwKVxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhpcy5yZWxlYXNlKGVycilcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gTGV0J3MgZ2l2ZSB0aGUgZGVzdGluYXRpb24gc29tZSB0aW1lIHRvIHByb2Nlc3MgdGhlIGNodW5rLlxuICAgICAgICAgIHNldFRpbWVvdXQoZnNXcml0ZSwgQlVTWV9XUklURV9USU1FT1VUKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl93cml0aW5nID0gZmFsc2VcblxuICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKVxuICAgICAgfVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5lbWl0KCd3cml0ZScsIG4pXG4gICAgY29uc3QgcmVsZWFzZWRCdWZPYmogPSByZWxlYXNlV3JpdGluZ0J1Zih0aGlzLl93cml0aW5nQnVmLCB0aGlzLl9sZW4sIG4pXG4gICAgdGhpcy5fbGVuID0gcmVsZWFzZWRCdWZPYmoubGVuXG4gICAgdGhpcy5fd3JpdGluZ0J1ZiA9IHJlbGVhc2VkQnVmT2JqLndyaXRpbmdCdWZcblxuICAgIGlmICh0aGlzLl93cml0aW5nQnVmLmxlbmd0aCkge1xuICAgICAgaWYgKCF0aGlzLnN5bmMpIHtcbiAgICAgICAgZnNXcml0ZSgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgY29uc3QgbiA9IGZzV3JpdGVTeW5jKClcbiAgICAgICAgICBjb25zdCByZWxlYXNlZEJ1Zk9iaiA9IHJlbGVhc2VXcml0aW5nQnVmKHRoaXMuX3dyaXRpbmdCdWYsIHRoaXMuX2xlbiwgbilcbiAgICAgICAgICB0aGlzLl9sZW4gPSByZWxlYXNlZEJ1Zk9iai5sZW5cbiAgICAgICAgICB0aGlzLl93cml0aW5nQnVmID0gcmVsZWFzZWRCdWZPYmoud3JpdGluZ0J1ZlxuICAgICAgICB9IHdoaWxlICh0aGlzLl93cml0aW5nQnVmLmxlbmd0aClcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICB0aGlzLnJlbGVhc2UoZXJyKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZnN5bmMpIHtcbiAgICAgIGZzLmZzeW5jU3luYyh0aGlzLmZkKVxuICAgIH1cblxuICAgIGNvbnN0IGxlbiA9IHRoaXMuX2xlblxuICAgIGlmICh0aGlzLl9yZW9wZW5pbmcpIHtcbiAgICAgIHRoaXMuX3dyaXRpbmcgPSBmYWxzZVxuICAgICAgdGhpcy5fcmVvcGVuaW5nID0gZmFsc2VcbiAgICAgIHRoaXMucmVvcGVuKClcbiAgICB9IGVsc2UgaWYgKGxlbiA+IHRoaXMubWluTGVuZ3RoKSB7XG4gICAgICB0aGlzLl9hY3R1YWxXcml0ZSgpXG4gICAgfSBlbHNlIGlmICh0aGlzLl9lbmRpbmcpIHtcbiAgICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgIHRoaXMuX2FjdHVhbFdyaXRlKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3dyaXRpbmcgPSBmYWxzZVxuICAgICAgICBhY3R1YWxDbG9zZSh0aGlzKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl93cml0aW5nID0gZmFsc2VcbiAgICAgIGlmICh0aGlzLnN5bmMpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hc3luY0RyYWluU2NoZWR1bGVkKSB7XG4gICAgICAgICAgdGhpcy5fYXN5bmNEcmFpblNjaGVkdWxlZCA9IHRydWVcbiAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGVtaXREcmFpbiwgdGhpcylcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkcmFpbicpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5vbignbmV3TGlzdGVuZXInLCBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmIChuYW1lID09PSAnZHJhaW4nKSB7XG4gICAgICB0aGlzLl9hc3luY0RyYWluU2NoZWR1bGVkID0gZmFsc2VcbiAgICB9XG4gIH0pXG5cbiAgaWYgKHRoaXMuX3BlcmlvZGljRmx1c2ggIT09IDApIHtcbiAgICB0aGlzLl9wZXJpb2RpY0ZsdXNoVGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLmZsdXNoKG51bGwpLCB0aGlzLl9wZXJpb2RpY0ZsdXNoKVxuICAgIHRoaXMuX3BlcmlvZGljRmx1c2hUaW1lci51bnJlZigpXG4gIH1cbn1cblxuLyoqXG4gKiBSZWxlYXNlIHRoZSB3cml0aW5nQnVmIGFmdGVyIGZzLndyaXRlIG4gYnl0ZXMgZGF0YVxuICogQHBhcmFtIHtzdHJpbmcgfCBCdWZmZXJ9IHdyaXRpbmdCdWYgLSBjdXJyZW50bHkgd3JpdGluZyBidWZmZXIsIHVzdWFsbHkgYmUgaW5zdGFuY2UuX3dyaXRpbmdCdWYuXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuIC0gY3VycmVudGx5IGJ1ZmZlciBsZW5ndGgsIHVzdWFsbHkgYmUgaW5zdGFuY2UuX2xlbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBuIC0gbnVtYmVyIG9mIGJ5dGVzIGZzIGFscmVhZHkgd3JpdHRlblxuICogQHJldHVybnMge3t3cml0aW5nQnVmOiBzdHJpbmcgfCBCdWZmZXIsIGxlbjogbnVtYmVyfX0gcmVsZWFzZWQgd3JpdGluZ0J1ZiBhbmQgbGVuZ3RoXG4gKi9cbmZ1bmN0aW9uIHJlbGVhc2VXcml0aW5nQnVmICh3cml0aW5nQnVmLCBsZW4sIG4pIHtcbiAgaWYgKHR5cGVvZiB3cml0aW5nQnVmID09PSAnc3RyaW5nJykge1xuICAgIHdyaXRpbmdCdWYgPSBCdWZmZXIuZnJvbSh3cml0aW5nQnVmKVxuICB9XG5cbiAgbGVuID0gTWF0aC5tYXgobGVuIC0gbiwgMClcbiAgd3JpdGluZ0J1ZiA9IHdyaXRpbmdCdWYuc3ViYXJyYXkobilcbiAgcmV0dXJuIHsgd3JpdGluZ0J1ZiwgbGVuIH1cbn1cblxuZnVuY3Rpb24gZW1pdERyYWluIChzb25pYykge1xuICBjb25zdCBoYXNMaXN0ZW5lcnMgPSBzb25pYy5saXN0ZW5lckNvdW50KCdkcmFpbicpID4gMFxuICBpZiAoIWhhc0xpc3RlbmVycykgcmV0dXJuXG4gIHNvbmljLl9hc3luY0RyYWluU2NoZWR1bGVkID0gZmFsc2VcbiAgc29uaWMuZW1pdCgnZHJhaW4nKVxufVxuXG5pbmhlcml0cyhTb25pY0Jvb20sIEV2ZW50RW1pdHRlcilcblxuZnVuY3Rpb24gbWVyZ2VCdWYgKGJ1ZnMsIGxlbikge1xuICBpZiAoYnVmcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4ga0VtcHR5QnVmZmVyXG4gIH1cblxuICBpZiAoYnVmcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gYnVmc1swXVxuICB9XG5cbiAgcmV0dXJuIEJ1ZmZlci5jb25jYXQoYnVmcywgbGVuKVxufVxuXG5mdW5jdGlvbiB3cml0ZSAoZGF0YSkge1xuICBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbmljQm9vbSBkZXN0cm95ZWQnKVxuICB9XG5cbiAgZGF0YSA9ICcnICsgZGF0YVxuICBjb25zdCBkYXRhTGVuID0gQnVmZmVyLmJ5dGVMZW5ndGgoZGF0YSlcbiAgY29uc3QgbGVuID0gdGhpcy5fbGVuICsgZGF0YUxlblxuICBjb25zdCBidWZzID0gdGhpcy5fYnVmc1xuXG4gIGlmICh0aGlzLm1heExlbmd0aCAmJiBsZW4gPiB0aGlzLm1heExlbmd0aCkge1xuICAgIHRoaXMuZW1pdCgnZHJvcCcsIGRhdGEpXG4gICAgcmV0dXJuIHRoaXMuX2xlbiA8IHRoaXMuX2h3bVxuICB9XG5cbiAgaWYgKFxuICAgIGJ1ZnMubGVuZ3RoID09PSAwIHx8XG4gICAgQnVmZmVyLmJ5dGVMZW5ndGgoYnVmc1tidWZzLmxlbmd0aCAtIDFdKSArIGRhdGFMZW4gPiB0aGlzLm1heFdyaXRlXG4gICkge1xuICAgIGJ1ZnMucHVzaChkYXRhKVxuICB9IGVsc2Uge1xuICAgIGJ1ZnNbYnVmcy5sZW5ndGggLSAxXSArPSBkYXRhXG4gIH1cblxuICB0aGlzLl9sZW4gPSBsZW5cblxuICBpZiAoIXRoaXMuX3dyaXRpbmcgJiYgdGhpcy5fbGVuID49IHRoaXMubWluTGVuZ3RoKSB7XG4gICAgdGhpcy5fYWN0dWFsV3JpdGUoKVxuICB9XG5cbiAgcmV0dXJuIHRoaXMuX2xlbiA8IHRoaXMuX2h3bVxufVxuXG5mdW5jdGlvbiB3cml0ZUJ1ZmZlciAoZGF0YSkge1xuICBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbmljQm9vbSBkZXN0cm95ZWQnKVxuICB9XG5cbiAgY29uc3QgbGVuID0gdGhpcy5fbGVuICsgZGF0YS5sZW5ndGhcbiAgY29uc3QgYnVmcyA9IHRoaXMuX2J1ZnNcbiAgY29uc3QgbGVucyA9IHRoaXMuX2xlbnNcblxuICBpZiAodGhpcy5tYXhMZW5ndGggJiYgbGVuID4gdGhpcy5tYXhMZW5ndGgpIHtcbiAgICB0aGlzLmVtaXQoJ2Ryb3AnLCBkYXRhKVxuICAgIHJldHVybiB0aGlzLl9sZW4gPCB0aGlzLl9od21cbiAgfVxuXG4gIGlmIChcbiAgICBidWZzLmxlbmd0aCA9PT0gMCB8fFxuICAgIGxlbnNbbGVucy5sZW5ndGggLSAxXSArIGRhdGEubGVuZ3RoID4gdGhpcy5tYXhXcml0ZVxuICApIHtcbiAgICBidWZzLnB1c2goW2RhdGFdKVxuICAgIGxlbnMucHVzaChkYXRhLmxlbmd0aClcbiAgfSBlbHNlIHtcbiAgICBidWZzW2J1ZnMubGVuZ3RoIC0gMV0ucHVzaChkYXRhKVxuICAgIGxlbnNbbGVucy5sZW5ndGggLSAxXSArPSBkYXRhLmxlbmd0aFxuICB9XG5cbiAgdGhpcy5fbGVuID0gbGVuXG5cbiAgaWYgKCF0aGlzLl93cml0aW5nICYmIHRoaXMuX2xlbiA+PSB0aGlzLm1pbkxlbmd0aCkge1xuICAgIHRoaXMuX2FjdHVhbFdyaXRlKClcbiAgfVxuXG4gIHJldHVybiB0aGlzLl9sZW4gPCB0aGlzLl9od21cbn1cblxuZnVuY3Rpb24gY2FsbEZsdXNoQ2FsbGJhY2tPbkRyYWluIChjYikge1xuICB0aGlzLl9mbHVzaFBlbmRpbmcgPSB0cnVlXG4gIGNvbnN0IG9uRHJhaW4gPSAoKSA9PiB7XG4gICAgLy8gb25seSBpZiBfZnN5bmMgaXMgZmFsc2UgdG8gYXZvaWQgZG91YmxlIGZzeW5jXG4gICAgaWYgKCF0aGlzLl9mc3luYykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZnMuZnN5bmModGhpcy5mZCwgKGVycikgPT4ge1xuICAgICAgICAgIHRoaXMuX2ZsdXNoUGVuZGluZyA9IGZhbHNlXG4gICAgICAgICAgY2IoZXJyKVxuICAgICAgICB9KVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNiKGVycilcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZmx1c2hQZW5kaW5nID0gZmFsc2VcbiAgICAgIGNiKClcbiAgICB9XG4gICAgdGhpcy5vZmYoJ2Vycm9yJywgb25FcnJvcilcbiAgfVxuICBjb25zdCBvbkVycm9yID0gKGVycikgPT4ge1xuICAgIHRoaXMuX2ZsdXNoUGVuZGluZyA9IGZhbHNlXG4gICAgY2IoZXJyKVxuICAgIHRoaXMub2ZmKCdkcmFpbicsIG9uRHJhaW4pXG4gIH1cblxuICB0aGlzLm9uY2UoJ2RyYWluJywgb25EcmFpbilcbiAgdGhpcy5vbmNlKCdlcnJvcicsIG9uRXJyb3IpXG59XG5cbmZ1bmN0aW9uIGZsdXNoIChjYikge1xuICBpZiAoY2IgIT0gbnVsbCAmJiB0eXBlb2YgY2IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZsdXNoIGNiIG11c3QgYmUgYSBmdW5jdGlvbicpXG4gIH1cblxuICBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcignU29uaWNCb29tIGRlc3Ryb3llZCcpXG4gICAgaWYgKGNiKSB7XG4gICAgICBjYihlcnJvcilcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRocm93IGVycm9yXG4gIH1cblxuICBpZiAodGhpcy5taW5MZW5ndGggPD0gMCkge1xuICAgIGNiPy4oKVxuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKGNiKSB7XG4gICAgY2FsbEZsdXNoQ2FsbGJhY2tPbkRyYWluLmNhbGwodGhpcywgY2IpXG4gIH1cblxuICBpZiAodGhpcy5fd3JpdGluZykge1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKHRoaXMuX2J1ZnMubGVuZ3RoID09PSAwKSB7XG4gICAgdGhpcy5fYnVmcy5wdXNoKCcnKVxuICB9XG5cbiAgdGhpcy5fYWN0dWFsV3JpdGUoKVxufVxuXG5mdW5jdGlvbiBmbHVzaEJ1ZmZlciAoY2IpIHtcbiAgaWYgKGNiICE9IG51bGwgJiYgdHlwZW9mIGNiICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdmbHVzaCBjYiBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuICB9XG5cbiAgaWYgKHRoaXMuZGVzdHJveWVkKSB7XG4gICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoJ1NvbmljQm9vbSBkZXN0cm95ZWQnKVxuICAgIGlmIChjYikge1xuICAgICAgY2IoZXJyb3IpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aHJvdyBlcnJvclxuICB9XG5cbiAgaWYgKHRoaXMubWluTGVuZ3RoIDw9IDApIHtcbiAgICBjYj8uKClcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChjYikge1xuICAgIGNhbGxGbHVzaENhbGxiYWNrT25EcmFpbi5jYWxsKHRoaXMsIGNiKVxuICB9XG5cbiAgaWYgKHRoaXMuX3dyaXRpbmcpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmICh0aGlzLl9idWZzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRoaXMuX2J1ZnMucHVzaChbXSlcbiAgICB0aGlzLl9sZW5zLnB1c2goMClcbiAgfVxuXG4gIHRoaXMuX2FjdHVhbFdyaXRlKClcbn1cblxuU29uaWNCb29tLnByb3RvdHlwZS5yZW9wZW4gPSBmdW5jdGlvbiAoZmlsZSkge1xuICBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbmljQm9vbSBkZXN0cm95ZWQnKVxuICB9XG5cbiAgaWYgKHRoaXMuX29wZW5pbmcpIHtcbiAgICB0aGlzLm9uY2UoJ3JlYWR5JywgKCkgPT4ge1xuICAgICAgdGhpcy5yZW9wZW4oZmlsZSlcbiAgICB9KVxuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKHRoaXMuX2VuZGluZykge1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKCF0aGlzLmZpbGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byByZW9wZW4gYSBmaWxlIGRlc2NyaXB0b3IsIHlvdSBtdXN0IHBhc3MgYSBmaWxlIHRvIFNvbmljQm9vbScpXG4gIH1cblxuICBpZiAoZmlsZSkge1xuICAgIHRoaXMuZmlsZSA9IGZpbGVcbiAgfVxuICB0aGlzLl9yZW9wZW5pbmcgPSB0cnVlXG5cbiAgaWYgKHRoaXMuX3dyaXRpbmcpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IGZkID0gdGhpcy5mZFxuICB0aGlzLm9uY2UoJ3JlYWR5JywgKCkgPT4ge1xuICAgIGlmIChmZCAhPT0gdGhpcy5mZCkge1xuICAgICAgZnMuY2xvc2UoZmQsIChlcnIpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSlcblxuICBvcGVuRmlsZSh0aGlzLmZpbGUsIHRoaXMpXG59XG5cblNvbmljQm9vbS5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbmljQm9vbSBkZXN0cm95ZWQnKVxuICB9XG5cbiAgaWYgKHRoaXMuX29wZW5pbmcpIHtcbiAgICB0aGlzLm9uY2UoJ3JlYWR5JywgKCkgPT4ge1xuICAgICAgdGhpcy5lbmQoKVxuICAgIH0pXG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAodGhpcy5fZW5kaW5nKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB0aGlzLl9lbmRpbmcgPSB0cnVlXG5cbiAgaWYgKHRoaXMuX3dyaXRpbmcpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmICh0aGlzLl9sZW4gPiAwICYmIHRoaXMuZmQgPj0gMCkge1xuICAgIHRoaXMuX2FjdHVhbFdyaXRlKClcbiAgfSBlbHNlIHtcbiAgICBhY3R1YWxDbG9zZSh0aGlzKVxuICB9XG59XG5cbmZ1bmN0aW9uIGZsdXNoU3luYyAoKSB7XG4gIGlmICh0aGlzLmRlc3Ryb3llZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU29uaWNCb29tIGRlc3Ryb3llZCcpXG4gIH1cblxuICBpZiAodGhpcy5mZCA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NvbmljIGJvb20gaXMgbm90IHJlYWR5IHlldCcpXG4gIH1cblxuICBpZiAoIXRoaXMuX3dyaXRpbmcgJiYgdGhpcy5fd3JpdGluZ0J1Zi5sZW5ndGggPiAwKSB7XG4gICAgdGhpcy5fYnVmcy51bnNoaWZ0KHRoaXMuX3dyaXRpbmdCdWYpXG4gICAgdGhpcy5fd3JpdGluZ0J1ZiA9ICcnXG4gIH1cblxuICBsZXQgYnVmID0gJydcbiAgd2hpbGUgKHRoaXMuX2J1ZnMubGVuZ3RoIHx8IGJ1Zi5sZW5ndGgpIHtcbiAgICBpZiAoYnVmLmxlbmd0aCA8PSAwKSB7XG4gICAgICBidWYgPSB0aGlzLl9idWZzWzBdXG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBjb25zdCBuID0gQnVmZmVyLmlzQnVmZmVyKGJ1ZilcbiAgICAgICAgPyBmcy53cml0ZVN5bmModGhpcy5mZCwgYnVmKVxuICAgICAgICA6IGZzLndyaXRlU3luYyh0aGlzLmZkLCBidWYsICd1dGY4JylcbiAgICAgIGNvbnN0IHJlbGVhc2VkQnVmT2JqID0gcmVsZWFzZVdyaXRpbmdCdWYoYnVmLCB0aGlzLl9sZW4sIG4pXG4gICAgICBidWYgPSByZWxlYXNlZEJ1Zk9iai53cml0aW5nQnVmXG4gICAgICB0aGlzLl9sZW4gPSByZWxlYXNlZEJ1Zk9iai5sZW5cbiAgICAgIGlmIChidWYubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgdGhpcy5fYnVmcy5zaGlmdCgpXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zdCBzaG91bGRSZXRyeSA9IGVyci5jb2RlID09PSAnRUFHQUlOJyB8fCBlcnIuY29kZSA9PT0gJ0VCVVNZJ1xuICAgICAgaWYgKHNob3VsZFJldHJ5ICYmICF0aGlzLnJldHJ5RUFHQUlOKGVyciwgYnVmLmxlbmd0aCwgdGhpcy5fbGVuIC0gYnVmLmxlbmd0aCkpIHtcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgICB9XG5cbiAgICAgIHNsZWVwKEJVU1lfV1JJVEVfVElNRU9VVClcbiAgICB9XG4gIH1cblxuICB0cnkge1xuICAgIGZzLmZzeW5jU3luYyh0aGlzLmZkKVxuICB9IGNhdGNoIHtcbiAgICAvLyBTa2lwIHRoZSBlcnJvci4gVGhlIGZkIG1pZ2h0IG5vdCBzdXBwb3J0IGZzeW5jLlxuICB9XG59XG5cbmZ1bmN0aW9uIGZsdXNoQnVmZmVyU3luYyAoKSB7XG4gIGlmICh0aGlzLmRlc3Ryb3llZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU29uaWNCb29tIGRlc3Ryb3llZCcpXG4gIH1cblxuICBpZiAodGhpcy5mZCA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NvbmljIGJvb20gaXMgbm90IHJlYWR5IHlldCcpXG4gIH1cblxuICBpZiAoIXRoaXMuX3dyaXRpbmcgJiYgdGhpcy5fd3JpdGluZ0J1Zi5sZW5ndGggPiAwKSB7XG4gICAgdGhpcy5fYnVmcy51bnNoaWZ0KFt0aGlzLl93cml0aW5nQnVmXSlcbiAgICB0aGlzLl93cml0aW5nQnVmID0ga0VtcHR5QnVmZmVyXG4gIH1cblxuICBsZXQgYnVmID0ga0VtcHR5QnVmZmVyXG4gIHdoaWxlICh0aGlzLl9idWZzLmxlbmd0aCB8fCBidWYubGVuZ3RoKSB7XG4gICAgaWYgKGJ1Zi5sZW5ndGggPD0gMCkge1xuICAgICAgYnVmID0gbWVyZ2VCdWYodGhpcy5fYnVmc1swXSwgdGhpcy5fbGVuc1swXSlcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG4gPSBmcy53cml0ZVN5bmModGhpcy5mZCwgYnVmKVxuICAgICAgYnVmID0gYnVmLnN1YmFycmF5KG4pXG4gICAgICB0aGlzLl9sZW4gPSBNYXRoLm1heCh0aGlzLl9sZW4gLSBuLCAwKVxuICAgICAgaWYgKGJ1Zi5sZW5ndGggPD0gMCkge1xuICAgICAgICB0aGlzLl9idWZzLnNoaWZ0KClcbiAgICAgICAgdGhpcy5fbGVucy5zaGlmdCgpXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zdCBzaG91bGRSZXRyeSA9IGVyci5jb2RlID09PSAnRUFHQUlOJyB8fCBlcnIuY29kZSA9PT0gJ0VCVVNZJ1xuICAgICAgaWYgKHNob3VsZFJldHJ5ICYmICF0aGlzLnJldHJ5RUFHQUlOKGVyciwgYnVmLmxlbmd0aCwgdGhpcy5fbGVuIC0gYnVmLmxlbmd0aCkpIHtcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgICB9XG5cbiAgICAgIHNsZWVwKEJVU1lfV1JJVEVfVElNRU9VVClcbiAgICB9XG4gIH1cbn1cblxuU29uaWNCb29tLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuICBhY3R1YWxDbG9zZSh0aGlzKVxufVxuXG5mdW5jdGlvbiBhY3R1YWxXcml0ZSAoKSB7XG4gIGNvbnN0IHJlbGVhc2UgPSB0aGlzLnJlbGVhc2VcbiAgdGhpcy5fd3JpdGluZyA9IHRydWVcbiAgdGhpcy5fd3JpdGluZ0J1ZiA9IHRoaXMuX3dyaXRpbmdCdWYubGVuZ3RoID8gdGhpcy5fd3JpdGluZ0J1ZiA6IHRoaXMuX2J1ZnMuc2hpZnQoKSB8fCAnJ1xuXG4gIGlmICh0aGlzLnN5bmMpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgd3JpdHRlbiA9IEJ1ZmZlci5pc0J1ZmZlcih0aGlzLl93cml0aW5nQnVmKVxuICAgICAgICA/IGZzLndyaXRlU3luYyh0aGlzLmZkLCB0aGlzLl93cml0aW5nQnVmKVxuICAgICAgICA6IGZzLndyaXRlU3luYyh0aGlzLmZkLCB0aGlzLl93cml0aW5nQnVmLCAndXRmOCcpXG4gICAgICByZWxlYXNlKG51bGwsIHdyaXR0ZW4pXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZWxlYXNlKGVycilcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZnMud3JpdGUodGhpcy5mZCwgdGhpcy5fd3JpdGluZ0J1ZiwgcmVsZWFzZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBhY3R1YWxXcml0ZUJ1ZmZlciAoKSB7XG4gIGNvbnN0IHJlbGVhc2UgPSB0aGlzLnJlbGVhc2VcbiAgdGhpcy5fd3JpdGluZyA9IHRydWVcbiAgdGhpcy5fd3JpdGluZ0J1ZiA9IHRoaXMuX3dyaXRpbmdCdWYubGVuZ3RoID8gdGhpcy5fd3JpdGluZ0J1ZiA6IG1lcmdlQnVmKHRoaXMuX2J1ZnMuc2hpZnQoKSwgdGhpcy5fbGVucy5zaGlmdCgpKVxuXG4gIGlmICh0aGlzLnN5bmMpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgd3JpdHRlbiA9IGZzLndyaXRlU3luYyh0aGlzLmZkLCB0aGlzLl93cml0aW5nQnVmKVxuICAgICAgcmVsZWFzZShudWxsLCB3cml0dGVuKVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmVsZWFzZShlcnIpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGZzLndyaXRlIHdpbGwgbmVlZCB0byBjb3B5IHN0cmluZyB0byBidWZmZXIgYW55d2F5IHNvXG4gICAgLy8gd2UgZG8gaXQgaGVyZSB0byBhdm9pZCB0aGUgb3ZlcmhlYWQgb2YgY2FsY3VsYXRpbmcgdGhlIGJ1ZmZlciBzaXplXG4gICAgLy8gaW4gcmVsZWFzZVdyaXRpbmdCdWYuXG4gICAgaWYgKGtDb3B5QnVmZmVyKSB7XG4gICAgICB0aGlzLl93cml0aW5nQnVmID0gQnVmZmVyLmZyb20odGhpcy5fd3JpdGluZ0J1ZilcbiAgICB9XG4gICAgZnMud3JpdGUodGhpcy5mZCwgdGhpcy5fd3JpdGluZ0J1ZiwgcmVsZWFzZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBhY3R1YWxDbG9zZSAoc29uaWMpIHtcbiAgaWYgKHNvbmljLmZkID09PSAtMSkge1xuICAgIHNvbmljLm9uY2UoJ3JlYWR5JywgYWN0dWFsQ2xvc2UuYmluZChudWxsLCBzb25pYykpXG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAoc29uaWMuX3BlcmlvZGljRmx1c2hUaW1lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY2xlYXJJbnRlcnZhbChzb25pYy5fcGVyaW9kaWNGbHVzaFRpbWVyKVxuICB9XG5cbiAgc29uaWMuZGVzdHJveWVkID0gdHJ1ZVxuICBzb25pYy5fYnVmcyA9IFtdXG4gIHNvbmljLl9sZW5zID0gW11cblxuICBhc3NlcnQodHlwZW9mIHNvbmljLmZkID09PSAnbnVtYmVyJywgYHNvbmljLmZkIG11c3QgYmUgYSBudW1iZXIsIGdvdCAke3R5cGVvZiBzb25pYy5mZH1gKVxuICB0cnkge1xuICAgIGZzLmZzeW5jKHNvbmljLmZkLCBjbG9zZVdyYXBwZWQpXG4gIH0gY2F0Y2gge1xuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2VXcmFwcGVkICgpIHtcbiAgICAvLyBXZSBza2lwIGVycm9ycyBpbiBmc3luY1xuXG4gICAgaWYgKHNvbmljLmZkICE9PSAxICYmIHNvbmljLmZkICE9PSAyKSB7XG4gICAgICBmcy5jbG9zZShzb25pYy5mZCwgZG9uZSlcbiAgICB9IGVsc2Uge1xuICAgICAgZG9uZSgpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZG9uZSAoZXJyKSB7XG4gICAgaWYgKGVycikge1xuICAgICAgc29uaWMuZW1pdCgnZXJyb3InLCBlcnIpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoc29uaWMuX2VuZGluZyAmJiAhc29uaWMuX3dyaXRpbmcpIHtcbiAgICAgIHNvbmljLmVtaXQoJ2ZpbmlzaCcpXG4gICAgfVxuICAgIHNvbmljLmVtaXQoJ2Nsb3NlJylcbiAgfVxufVxuXG4vKipcbiAqIFRoZXNlIGV4cG9ydCBjb25maWd1cmF0aW9ucyBlbmFibGUgSlMgYW5kIFRTIGRldmVsb3BlcnNcbiAqIHRvIGNvbnN1bWVyIFNvbmljQm9vbSBpbiB3aGF0ZXZlciB3YXkgYmVzdCBzdWl0cyB0aGVpciBuZWVkcy5cbiAqIFNvbWUgZXhhbXBsZXMgb2Ygc3VwcG9ydGVkIGltcG9ydCBzeW50YXggaW5jbHVkZXM6XG4gKiAtIGBjb25zdCBTb25pY0Jvb20gPSByZXF1aXJlKCdTb25pY0Jvb20nKWBcbiAqIC0gYGNvbnN0IHsgU29uaWNCb29tIH0gPSByZXF1aXJlKCdTb25pY0Jvb20nKWBcbiAqIC0gYGltcG9ydCAqIGFzIFNvbmljQm9vbSBmcm9tICdTb25pY0Jvb20nYFxuICogLSBgaW1wb3J0IHsgU29uaWNCb29tIH0gZnJvbSAnU29uaWNCb29tJ2BcbiAqIC0gYGltcG9ydCBTb25pY0Jvb20gZnJvbSAnU29uaWNCb29tJ2BcbiAqL1xuU29uaWNCb29tLlNvbmljQm9vbSA9IFNvbmljQm9vbVxuU29uaWNCb29tLmRlZmF1bHQgPSBTb25pY0Jvb21cbm1vZHVsZS5leHBvcnRzID0gU29uaWNCb29tXG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHJlZnMgPSB7XG4gIGV4aXQ6IFtdLFxuICBiZWZvcmVFeGl0OiBbXVxufVxuY29uc3QgZnVuY3Rpb25zID0ge1xuICBleGl0OiBvbkV4aXQsXG4gIGJlZm9yZUV4aXQ6IG9uQmVmb3JlRXhpdFxufVxuXG5sZXQgcmVnaXN0cnlcblxuZnVuY3Rpb24gZW5zdXJlUmVnaXN0cnkgKCkge1xuICBpZiAocmVnaXN0cnkgPT09IHVuZGVmaW5lZCkge1xuICAgIHJlZ2lzdHJ5ID0gbmV3IEZpbmFsaXphdGlvblJlZ2lzdHJ5KGNsZWFyKVxuICB9XG59XG5cbmZ1bmN0aW9uIGluc3RhbGwgKGV2ZW50KSB7XG4gIGlmIChyZWZzW2V2ZW50XS5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBwcm9jZXNzLm9uKGV2ZW50LCBmdW5jdGlvbnNbZXZlbnRdKVxufVxuXG5mdW5jdGlvbiB1bmluc3RhbGwgKGV2ZW50KSB7XG4gIGlmIChyZWZzW2V2ZW50XS5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgcHJvY2Vzcy5yZW1vdmVMaXN0ZW5lcihldmVudCwgZnVuY3Rpb25zW2V2ZW50XSlcbiAgaWYgKHJlZnMuZXhpdC5sZW5ndGggPT09IDAgJiYgcmVmcy5iZWZvcmVFeGl0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJlZ2lzdHJ5ID0gdW5kZWZpbmVkXG4gIH1cbn1cblxuZnVuY3Rpb24gb25FeGl0ICgpIHtcbiAgY2FsbFJlZnMoJ2V4aXQnKVxufVxuXG5mdW5jdGlvbiBvbkJlZm9yZUV4aXQgKCkge1xuICBjYWxsUmVmcygnYmVmb3JlRXhpdCcpXG59XG5cbmZ1bmN0aW9uIGNhbGxSZWZzIChldmVudCkge1xuICBmb3IgKGNvbnN0IHJlZiBvZiByZWZzW2V2ZW50XSkge1xuICAgIGNvbnN0IG9iaiA9IHJlZi5kZXJlZigpXG4gICAgY29uc3QgZm4gPSByZWYuZm5cblxuICAgIC8vIFRoaXMgc2hvdWxkIGFsd2F5cyBoYXBwZW4sIGhvd2V2ZXIgR0MgaXNcbiAgICAvLyB1bmRldGVybWluaXN0aWMgc28gaXQgbWlnaHQgbm90IGhhcHBlbi5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmIChvYmogIT09IHVuZGVmaW5lZCkge1xuICAgICAgZm4ob2JqLCBldmVudClcbiAgICB9XG4gIH1cbiAgcmVmc1tldmVudF0gPSBbXVxufVxuXG5mdW5jdGlvbiBjbGVhciAocmVmKSB7XG4gIGZvciAoY29uc3QgZXZlbnQgb2YgWydleGl0JywgJ2JlZm9yZUV4aXQnXSkge1xuICAgIGNvbnN0IGluZGV4ID0gcmVmc1tldmVudF0uaW5kZXhPZihyZWYpXG4gICAgcmVmc1tldmVudF0uc3BsaWNlKGluZGV4LCBpbmRleCArIDEpXG4gICAgdW5pbnN0YWxsKGV2ZW50KVxuICB9XG59XG5cbmZ1bmN0aW9uIF9yZWdpc3RlciAoZXZlbnQsIG9iaiwgZm4pIHtcbiAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgb2JqZWN0IGNhblxcJ3QgYmUgdW5kZWZpbmVkJylcbiAgfVxuICBpbnN0YWxsKGV2ZW50KVxuICBjb25zdCByZWYgPSBuZXcgV2Vha1JlZihvYmopXG4gIHJlZi5mbiA9IGZuXG5cbiAgZW5zdXJlUmVnaXN0cnkoKVxuICByZWdpc3RyeS5yZWdpc3RlcihvYmosIHJlZilcbiAgcmVmc1tldmVudF0ucHVzaChyZWYpXG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyIChvYmosIGZuKSB7XG4gIF9yZWdpc3RlcignZXhpdCcsIG9iaiwgZm4pXG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyQmVmb3JlRXhpdCAob2JqLCBmbikge1xuICBfcmVnaXN0ZXIoJ2JlZm9yZUV4aXQnLCBvYmosIGZuKVxufVxuXG5mdW5jdGlvbiB1bnJlZ2lzdGVyIChvYmopIHtcbiAgaWYgKHJlZ2lzdHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuICByZWdpc3RyeS51bnJlZ2lzdGVyKG9iailcbiAgZm9yIChjb25zdCBldmVudCBvZiBbJ2V4aXQnLCAnYmVmb3JlRXhpdCddKSB7XG4gICAgcmVmc1tldmVudF0gPSByZWZzW2V2ZW50XS5maWx0ZXIoKHJlZikgPT4ge1xuICAgICAgY29uc3QgX29iaiA9IHJlZi5kZXJlZigpXG4gICAgICByZXR1cm4gX29iaiAmJiBfb2JqICE9PSBvYmpcbiAgICB9KVxuICAgIHVuaW5zdGFsbChldmVudClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmVnaXN0ZXIsXG4gIHJlZ2lzdGVyQmVmb3JlRXhpdCxcbiAgdW5yZWdpc3RlclxufVxuIiwgIntcbiAgXCJuYW1lXCI6IFwidGhyZWFkLXN0cmVhbVwiLFxuICBcInZlcnNpb25cIjogXCIzLjEuMFwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiQSBzdHJlYW1pbmcgd2F5IHRvIHNlbmQgZGF0YSB0byBhIE5vZGUuanMgV29ya2VyIFRocmVhZFwiLFxuICBcIm1haW5cIjogXCJpbmRleC5qc1wiLFxuICBcInR5cGVzXCI6IFwiaW5kZXguZC50c1wiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJyZWFsLXJlcXVpcmVcIjogXCJeMC4yLjBcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4yMC4xLjBcIixcbiAgICBcIkB0eXBlcy90YXBcIjogXCJeMTUuMC4wXCIsXG4gICAgXCJAeWFvLXBrZy9wa2dcIjogXCJeNS4xMS41XCIsXG4gICAgXCJkZXNtXCI6IFwiXjEuMy4wXCIsXG4gICAgXCJmYXN0YmVuY2hcIjogXCJeMS4wLjFcIixcbiAgICBcImh1c2t5XCI6IFwiXjkuMC42XCIsXG4gICAgXCJwaW5vLWVsYXN0aWNzZWFyY2hcIjogXCJeOC4wLjBcIixcbiAgICBcInNvbmljLWJvb21cIjogXCJeNC4wLjFcIixcbiAgICBcInN0YW5kYXJkXCI6IFwiXjE3LjAuMFwiLFxuICAgIFwidGFwXCI6IFwiXjE2LjIuMFwiLFxuICAgIFwidHMtbm9kZVwiOiBcIl4xMC44LjBcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS4zLjJcIixcbiAgICBcIndoeS1pcy1ub2RlLXJ1bm5pbmdcIjogXCJeMi4yLjJcIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYnVpbGRcIjogXCJ0c2MgLS1ub0VtaXRcIixcbiAgICBcInRlc3RcIjogXCJzdGFuZGFyZCAmJiBucG0gcnVuIGJ1aWxkICYmIG5wbSBydW4gdHJhbnNwaWxlICYmIHRhcCBcXFwidGVzdC8qKi8qLnRlc3QuKmpzXFxcIiAmJiB0YXAgLS10cyB0ZXN0LyoudGVzdC4qdHNcIixcbiAgICBcInRlc3Q6Y2lcIjogXCJzdGFuZGFyZCAmJiBucG0gcnVuIHRyYW5zcGlsZSAmJiBucG0gcnVuIHRlc3Q6Y2k6anMgJiYgbnBtIHJ1biB0ZXN0OmNpOnRzXCIsXG4gICAgXCJ0ZXN0OmNpOmpzXCI6IFwidGFwIC0tbm8tY2hlY2stY292ZXJhZ2UgLS10aW1lb3V0PTEyMCAtLWNvdmVyYWdlLXJlcG9ydD1sY292b25seSBcXFwidGVzdC8qKi8qLnRlc3QuKmpzXFxcIlwiLFxuICAgIFwidGVzdDpjaTp0c1wiOiBcInRhcCAtLXRzIC0tbm8tY2hlY2stY292ZXJhZ2UgLS1jb3ZlcmFnZS1yZXBvcnQ9bGNvdm9ubHkgXFxcInRlc3QvKiovKi50ZXN0Lip0c1xcXCJcIixcbiAgICBcInRlc3Q6eWFyblwiOiBcIm5wbSBydW4gdHJhbnNwaWxlICYmIHRhcCBcXFwidGVzdC8qKi8qLnRlc3QuanNcXFwiIC0tbm8tY2hlY2stY292ZXJhZ2VcIixcbiAgICBcInRyYW5zcGlsZVwiOiBcInNoIC4vdGVzdC90cy90cmFuc3BpbGUuc2hcIixcbiAgICBcInByZXBhcmVcIjogXCJodXNreSBpbnN0YWxsXCJcbiAgfSxcbiAgXCJzdGFuZGFyZFwiOiB7XG4gICAgXCJpZ25vcmVcIjogW1xuICAgICAgXCJ0ZXN0L3RzLyoqLypcIixcbiAgICAgIFwidGVzdC9zeW50YXgtZXJyb3IubWpzXCJcbiAgICBdXG4gIH0sXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJnaXQraHR0cHM6Ly9naXRodWIuY29tL21jb2xsaW5hL3RocmVhZC1zdHJlYW0uZ2l0XCJcbiAgfSxcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJ3b3JrZXJcIixcbiAgICBcInRocmVhZFwiLFxuICAgIFwidGhyZWFkc1wiLFxuICAgIFwic3RyZWFtXCJcbiAgXSxcbiAgXCJhdXRob3JcIjogXCJNYXR0ZW8gQ29sbGluYSA8aGVsbG9AbWF0dGVvY29sbGluYS5jb20+XCIsXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcImJ1Z3NcIjoge1xuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL21jb2xsaW5hL3RocmVhZC1zdHJlYW0vaXNzdWVzXCJcbiAgfSxcbiAgXCJob21lcGFnZVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9tY29sbGluYS90aHJlYWQtc3RyZWFtI3JlYWRtZVwiXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IE1BWF9USU1FT1VUID0gMTAwMFxuXG5mdW5jdGlvbiB3YWl0IChzdGF0ZSwgaW5kZXgsIGV4cGVjdGVkLCB0aW1lb3V0LCBkb25lKSB7XG4gIGNvbnN0IG1heCA9IERhdGUubm93KCkgKyB0aW1lb3V0XG4gIGxldCBjdXJyZW50ID0gQXRvbWljcy5sb2FkKHN0YXRlLCBpbmRleClcbiAgaWYgKGN1cnJlbnQgPT09IGV4cGVjdGVkKSB7XG4gICAgZG9uZShudWxsLCAnb2snKVxuICAgIHJldHVyblxuICB9XG4gIGxldCBwcmlvciA9IGN1cnJlbnRcbiAgY29uc3QgY2hlY2sgPSAoYmFja29mZikgPT4ge1xuICAgIGlmIChEYXRlLm5vdygpID4gbWF4KSB7XG4gICAgICBkb25lKG51bGwsICd0aW1lZC1vdXQnKVxuICAgIH0gZWxzZSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcHJpb3IgPSBjdXJyZW50XG4gICAgICAgIGN1cnJlbnQgPSBBdG9taWNzLmxvYWQoc3RhdGUsIGluZGV4KVxuICAgICAgICBpZiAoY3VycmVudCA9PT0gcHJpb3IpIHtcbiAgICAgICAgICBjaGVjayhiYWNrb2ZmID49IE1BWF9USU1FT1VUID8gTUFYX1RJTUVPVVQgOiBiYWNrb2ZmICogMilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoY3VycmVudCA9PT0gZXhwZWN0ZWQpIGRvbmUobnVsbCwgJ29rJylcbiAgICAgICAgICBlbHNlIGRvbmUobnVsbCwgJ25vdC1lcXVhbCcpXG4gICAgICAgIH1cbiAgICAgIH0sIGJhY2tvZmYpXG4gICAgfVxuICB9XG4gIGNoZWNrKDEpXG59XG5cbi8vIGxldCB3YWl0RGlmZkNvdW50ID0gMFxuZnVuY3Rpb24gd2FpdERpZmYgKHN0YXRlLCBpbmRleCwgZXhwZWN0ZWQsIHRpbWVvdXQsIGRvbmUpIHtcbiAgLy8gY29uc3QgaWQgPSB3YWl0RGlmZkNvdW50KytcbiAgLy8gcHJvY2Vzcy5fcmF3RGVidWcoYD4+PiB3YWl0RGlmZiAke2lkfWApXG4gIGNvbnN0IG1heCA9IERhdGUubm93KCkgKyB0aW1lb3V0XG4gIGxldCBjdXJyZW50ID0gQXRvbWljcy5sb2FkKHN0YXRlLCBpbmRleClcbiAgaWYgKGN1cnJlbnQgIT09IGV4cGVjdGVkKSB7XG4gICAgZG9uZShudWxsLCAnb2snKVxuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IGNoZWNrID0gKGJhY2tvZmYpID0+IHtcbiAgICAvLyBwcm9jZXNzLl9yYXdEZWJ1ZyhgJHtpZH0gJHtpbmRleH0gY3VycmVudCAke2N1cnJlbnR9IGV4cGVjdGVkICR7ZXhwZWN0ZWR9YClcbiAgICAvLyBwcm9jZXNzLl9yYXdEZWJ1ZygnJyArIGJhY2tvZmYpXG4gICAgaWYgKERhdGUubm93KCkgPiBtYXgpIHtcbiAgICAgIGRvbmUobnVsbCwgJ3RpbWVkLW91dCcpXG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjdXJyZW50ID0gQXRvbWljcy5sb2FkKHN0YXRlLCBpbmRleClcbiAgICAgICAgaWYgKGN1cnJlbnQgIT09IGV4cGVjdGVkKSB7XG4gICAgICAgICAgZG9uZShudWxsLCAnb2snKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoZWNrKGJhY2tvZmYgPj0gTUFYX1RJTUVPVVQgPyBNQVhfVElNRU9VVCA6IGJhY2tvZmYgKiAyKVxuICAgICAgICB9XG4gICAgICB9LCBiYWNrb2ZmKVxuICAgIH1cbiAgfVxuICBjaGVjaygxKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgd2FpdCwgd2FpdERpZmYgfVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBXUklURV9JTkRFWCA9IDRcbmNvbnN0IFJFQURfSU5ERVggPSA4XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBXUklURV9JTkRFWCxcbiAgUkVBRF9JTkRFWFxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCB7IHZlcnNpb24gfSA9IHJlcXVpcmUoJy4vcGFja2FnZS5qc29uJylcbmNvbnN0IHsgRXZlbnRFbWl0dGVyIH0gPSByZXF1aXJlKCdldmVudHMnKVxuY29uc3QgeyBXb3JrZXIgfSA9IHJlcXVpcmUoJ3dvcmtlcl90aHJlYWRzJylcbmNvbnN0IHsgam9pbiB9ID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCB7IHBhdGhUb0ZpbGVVUkwgfSA9IHJlcXVpcmUoJ3VybCcpXG5jb25zdCB7IHdhaXQgfSA9IHJlcXVpcmUoJy4vbGliL3dhaXQnKVxuY29uc3Qge1xuICBXUklURV9JTkRFWCxcbiAgUkVBRF9JTkRFWFxufSA9IHJlcXVpcmUoJy4vbGliL2luZGV4ZXMnKVxuY29uc3QgYnVmZmVyID0gcmVxdWlyZSgnYnVmZmVyJylcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5cbmNvbnN0IGtJbXBsID0gU3ltYm9sKCdrSW1wbCcpXG5cbi8vIFY4IGxpbWl0IGZvciBzdHJpbmcgc2l6ZVxuY29uc3QgTUFYX1NUUklORyA9IGJ1ZmZlci5jb25zdGFudHMuTUFYX1NUUklOR19MRU5HVEhcblxuY2xhc3MgRmFrZVdlYWtSZWYge1xuICBjb25zdHJ1Y3RvciAodmFsdWUpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlXG4gIH1cblxuICBkZXJlZiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlXG4gIH1cbn1cblxuY2xhc3MgRmFrZUZpbmFsaXphdGlvblJlZ2lzdHJ5IHtcbiAgcmVnaXN0ZXIgKCkge31cblxuICB1bnJlZ2lzdGVyICgpIHt9XG59XG5cbi8vIEN1cnJlbnRseSB1c2luZyBGaW5hbGl6YXRpb25SZWdpc3RyeSB3aXRoIGNvZGUgY292ZXJhZ2UgYnJlYWtzIHRoZSB3b3JsZFxuLy8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvaXNzdWVzLzQ5MzQ0XG5jb25zdCBGaW5hbGl6YXRpb25SZWdpc3RyeSA9IHByb2Nlc3MuZW52Lk5PREVfVjhfQ09WRVJBR0UgPyBGYWtlRmluYWxpemF0aW9uUmVnaXN0cnkgOiBnbG9iYWwuRmluYWxpemF0aW9uUmVnaXN0cnkgfHwgRmFrZUZpbmFsaXphdGlvblJlZ2lzdHJ5XG5jb25zdCBXZWFrUmVmID0gcHJvY2Vzcy5lbnYuTk9ERV9WOF9DT1ZFUkFHRSA/IEZha2VXZWFrUmVmIDogZ2xvYmFsLldlYWtSZWYgfHwgRmFrZVdlYWtSZWZcblxuY29uc3QgcmVnaXN0cnkgPSBuZXcgRmluYWxpemF0aW9uUmVnaXN0cnkoKHdvcmtlcikgPT4ge1xuICBpZiAod29ya2VyLmV4aXRlZCkge1xuICAgIHJldHVyblxuICB9XG4gIHdvcmtlci50ZXJtaW5hdGUoKVxufSlcblxuZnVuY3Rpb24gY3JlYXRlV29ya2VyIChzdHJlYW0sIG9wdHMpIHtcbiAgY29uc3QgeyBmaWxlbmFtZSwgd29ya2VyRGF0YSB9ID0gb3B0c1xuXG4gIGNvbnN0IGJ1bmRsZXJPdmVycmlkZXMgPSAnX19idW5kbGVyUGF0aHNPdmVycmlkZXMnIGluIGdsb2JhbFRoaXMgPyBnbG9iYWxUaGlzLl9fYnVuZGxlclBhdGhzT3ZlcnJpZGVzIDoge31cbiAgY29uc3QgdG9FeGVjdXRlID0gYnVuZGxlck92ZXJyaWRlc1sndGhyZWFkLXN0cmVhbS13b3JrZXInXSB8fCBqb2luKF9fZGlybmFtZSwgJ2xpYicsICd3b3JrZXIuanMnKVxuXG4gIGNvbnN0IHdvcmtlciA9IG5ldyBXb3JrZXIodG9FeGVjdXRlLCB7XG4gICAgLi4ub3B0cy53b3JrZXJPcHRzLFxuICAgIHRyYWNrVW5tYW5hZ2VkRmRzOiBmYWxzZSxcbiAgICB3b3JrZXJEYXRhOiB7XG4gICAgICBmaWxlbmFtZTogZmlsZW5hbWUuaW5kZXhPZignZmlsZTovLycpID09PSAwXG4gICAgICAgID8gZmlsZW5hbWVcbiAgICAgICAgOiBwYXRoVG9GaWxlVVJMKGZpbGVuYW1lKS5ocmVmLFxuICAgICAgZGF0YUJ1Zjogc3RyZWFtW2tJbXBsXS5kYXRhQnVmLFxuICAgICAgc3RhdGVCdWY6IHN0cmVhbVtrSW1wbF0uc3RhdGVCdWYsXG4gICAgICB3b3JrZXJEYXRhOiB7XG4gICAgICAgICRjb250ZXh0OiB7XG4gICAgICAgICAgdGhyZWFkU3RyZWFtVmVyc2lvbjogdmVyc2lvblxuICAgICAgICB9LFxuICAgICAgICAuLi53b3JrZXJEYXRhXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIC8vIFdlIGtlZXAgYSBzdHJvbmcgcmVmZXJlbmNlIGZvciBub3csXG4gIC8vIHdlIG5lZWQgdG8gc3RhcnQgd3JpdGluZyBmaXJzdFxuICB3b3JrZXIuc3RyZWFtID0gbmV3IEZha2VXZWFrUmVmKHN0cmVhbSlcblxuICB3b3JrZXIub24oJ21lc3NhZ2UnLCBvbldvcmtlck1lc3NhZ2UpXG4gIHdvcmtlci5vbignZXhpdCcsIG9uV29ya2VyRXhpdClcbiAgcmVnaXN0cnkucmVnaXN0ZXIoc3RyZWFtLCB3b3JrZXIpXG5cbiAgcmV0dXJuIHdvcmtlclxufVxuXG5mdW5jdGlvbiBkcmFpbiAoc3RyZWFtKSB7XG4gIGFzc2VydCghc3RyZWFtW2tJbXBsXS5zeW5jKVxuICBpZiAoc3RyZWFtW2tJbXBsXS5uZWVkRHJhaW4pIHtcbiAgICBzdHJlYW1ba0ltcGxdLm5lZWREcmFpbiA9IGZhbHNlXG4gICAgc3RyZWFtLmVtaXQoJ2RyYWluJylcbiAgfVxufVxuXG5mdW5jdGlvbiBuZXh0Rmx1c2ggKHN0cmVhbSkge1xuICBjb25zdCB3cml0ZUluZGV4ID0gQXRvbWljcy5sb2FkKHN0cmVhbVtrSW1wbF0uc3RhdGUsIFdSSVRFX0lOREVYKVxuICBsZXQgbGVmdG92ZXIgPSBzdHJlYW1ba0ltcGxdLmRhdGEubGVuZ3RoIC0gd3JpdGVJbmRleFxuXG4gIGlmIChsZWZ0b3ZlciA+IDApIHtcbiAgICBpZiAoc3RyZWFtW2tJbXBsXS5idWYubGVuZ3RoID09PSAwKSB7XG4gICAgICBzdHJlYW1ba0ltcGxdLmZsdXNoaW5nID0gZmFsc2VcblxuICAgICAgaWYgKHN0cmVhbVtrSW1wbF0uZW5kaW5nKSB7XG4gICAgICAgIGVuZChzdHJlYW0pXG4gICAgICB9IGVsc2UgaWYgKHN0cmVhbVtrSW1wbF0ubmVlZERyYWluKSB7XG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2soZHJhaW4sIHN0cmVhbSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IHRvV3JpdGUgPSBzdHJlYW1ba0ltcGxdLmJ1Zi5zbGljZSgwLCBsZWZ0b3ZlcilcbiAgICBsZXQgdG9Xcml0ZUJ5dGVzID0gQnVmZmVyLmJ5dGVMZW5ndGgodG9Xcml0ZSlcbiAgICBpZiAodG9Xcml0ZUJ5dGVzIDw9IGxlZnRvdmVyKSB7XG4gICAgICBzdHJlYW1ba0ltcGxdLmJ1ZiA9IHN0cmVhbVtrSW1wbF0uYnVmLnNsaWNlKGxlZnRvdmVyKVxuICAgICAgLy8gcHJvY2Vzcy5fcmF3RGVidWcoJ3dyaXRpbmcgJyArIHRvV3JpdGUubGVuZ3RoKVxuICAgICAgd3JpdGUoc3RyZWFtLCB0b1dyaXRlLCBuZXh0Rmx1c2guYmluZChudWxsLCBzdHJlYW0pKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBtdWx0aS1ieXRlIHV0Zi04XG4gICAgICBzdHJlYW0uZmx1c2goKCkgPT4ge1xuICAgICAgICAvLyBlcnIgaXMgYWxyZWFkeSBoYW5kbGVkIGluIGZsdXNoKClcbiAgICAgICAgaWYgKHN0cmVhbS5kZXN0cm95ZWQpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIEF0b21pY3Muc3RvcmUoc3RyZWFtW2tJbXBsXS5zdGF0ZSwgUkVBRF9JTkRFWCwgMClcbiAgICAgICAgQXRvbWljcy5zdG9yZShzdHJlYW1ba0ltcGxdLnN0YXRlLCBXUklURV9JTkRFWCwgMClcblxuICAgICAgICAvLyBGaW5kIGEgdG9Xcml0ZSBsZW5ndGggdGhhdCBmaXRzIHRoZSBidWZmZXJcbiAgICAgICAgLy8gaXQgbXVzdCBleGlzdHMgYXMgdGhlIGJ1ZmZlciBpcyBhdCBsZWFzdCA0IGJ5dGVzIGxlbmd0aFxuICAgICAgICAvLyBhbmQgdGhlIG1heCB1dGYtOCBsZW5ndGggZm9yIGEgY2hhciBpcyA0IGJ5dGVzLlxuICAgICAgICB3aGlsZSAodG9Xcml0ZUJ5dGVzID4gc3RyZWFtW2tJbXBsXS5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgIGxlZnRvdmVyID0gbGVmdG92ZXIgLyAyXG4gICAgICAgICAgdG9Xcml0ZSA9IHN0cmVhbVtrSW1wbF0uYnVmLnNsaWNlKDAsIGxlZnRvdmVyKVxuICAgICAgICAgIHRvV3JpdGVCeXRlcyA9IEJ1ZmZlci5ieXRlTGVuZ3RoKHRvV3JpdGUpXG4gICAgICAgIH1cbiAgICAgICAgc3RyZWFtW2tJbXBsXS5idWYgPSBzdHJlYW1ba0ltcGxdLmJ1Zi5zbGljZShsZWZ0b3ZlcilcbiAgICAgICAgd3JpdGUoc3RyZWFtLCB0b1dyaXRlLCBuZXh0Rmx1c2guYmluZChudWxsLCBzdHJlYW0pKVxuICAgICAgfSlcbiAgICB9XG4gIH0gZWxzZSBpZiAobGVmdG92ZXIgPT09IDApIHtcbiAgICBpZiAod3JpdGVJbmRleCA9PT0gMCAmJiBzdHJlYW1ba0ltcGxdLmJ1Zi5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIHdlIGhhZCBhIGZsdXNoU3luYyBpbiB0aGUgbWVhbndoaWxlXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgc3RyZWFtLmZsdXNoKCgpID0+IHtcbiAgICAgIEF0b21pY3Muc3RvcmUoc3RyZWFtW2tJbXBsXS5zdGF0ZSwgUkVBRF9JTkRFWCwgMClcbiAgICAgIEF0b21pY3Muc3RvcmUoc3RyZWFtW2tJbXBsXS5zdGF0ZSwgV1JJVEVfSU5ERVgsIDApXG4gICAgICBuZXh0Rmx1c2goc3RyZWFtKVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgLy8gVGhpcyBzaG91bGQgbmV2ZXIgaGFwcGVuXG4gICAgZGVzdHJveShzdHJlYW0sIG5ldyBFcnJvcignb3ZlcndyaXR0ZW4nKSlcbiAgfVxufVxuXG5mdW5jdGlvbiBvbldvcmtlck1lc3NhZ2UgKG1zZykge1xuICBjb25zdCBzdHJlYW0gPSB0aGlzLnN0cmVhbS5kZXJlZigpXG4gIGlmIChzdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuZXhpdGVkID0gdHJ1ZVxuICAgIC8vIFRlcm1pbmF0ZSB0aGUgd29ya2VyLlxuICAgIHRoaXMudGVybWluYXRlKClcbiAgICByZXR1cm5cbiAgfVxuXG4gIHN3aXRjaCAobXNnLmNvZGUpIHtcbiAgICBjYXNlICdSRUFEWSc6XG4gICAgICAvLyBSZXBsYWNlIHRoZSBGYWtlV2Vha1JlZiB3aXRoIGFcbiAgICAgIC8vIHByb3BlciBvbmUuXG4gICAgICB0aGlzLnN0cmVhbSA9IG5ldyBXZWFrUmVmKHN0cmVhbSlcblxuICAgICAgc3RyZWFtLmZsdXNoKCgpID0+IHtcbiAgICAgICAgc3RyZWFtW2tJbXBsXS5yZWFkeSA9IHRydWVcbiAgICAgICAgc3RyZWFtLmVtaXQoJ3JlYWR5JylcbiAgICAgIH0pXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0VSUk9SJzpcbiAgICAgIGRlc3Ryb3koc3RyZWFtLCBtc2cuZXJyKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdFVkVOVCc6XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShtc2cuYXJncykpIHtcbiAgICAgICAgc3RyZWFtLmVtaXQobXNnLm5hbWUsIC4uLm1zZy5hcmdzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyZWFtLmVtaXQobXNnLm5hbWUsIG1zZy5hcmdzKVxuICAgICAgfVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdXQVJOSU5HJzpcbiAgICAgIHByb2Nlc3MuZW1pdFdhcm5pbmcobXNnLmVycilcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIGRlc3Ryb3koc3RyZWFtLCBuZXcgRXJyb3IoJ3RoaXMgc2hvdWxkIG5vdCBoYXBwZW46ICcgKyBtc2cuY29kZSkpXG4gIH1cbn1cblxuZnVuY3Rpb24gb25Xb3JrZXJFeGl0IChjb2RlKSB7XG4gIGNvbnN0IHN0cmVhbSA9IHRoaXMuc3RyZWFtLmRlcmVmKClcbiAgaWYgKHN0cmVhbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gTm90aGluZyB0byBkbywgdGhlIHdvcmtlciBhbHJlYWR5IGV4aXRcbiAgICByZXR1cm5cbiAgfVxuICByZWdpc3RyeS51bnJlZ2lzdGVyKHN0cmVhbSlcbiAgc3RyZWFtLndvcmtlci5leGl0ZWQgPSB0cnVlXG4gIHN0cmVhbS53b3JrZXIub2ZmKCdleGl0Jywgb25Xb3JrZXJFeGl0KVxuICBkZXN0cm95KHN0cmVhbSwgY29kZSAhPT0gMCA/IG5ldyBFcnJvcigndGhlIHdvcmtlciB0aHJlYWQgZXhpdGVkJykgOiBudWxsKVxufVxuXG5jbGFzcyBUaHJlYWRTdHJlYW0gZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvciAob3B0cyA9IHt9KSB7XG4gICAgc3VwZXIoKVxuXG4gICAgaWYgKG9wdHMuYnVmZmVyU2l6ZSA8IDQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYnVmZmVyU2l6ZSBtdXN0IGF0IGxlYXN0IGZpdCBhIDQtYnl0ZSB1dGYtOCBjaGFyJylcbiAgICB9XG5cbiAgICB0aGlzW2tJbXBsXSA9IHt9XG4gICAgdGhpc1trSW1wbF0uc3RhdGVCdWYgPSBuZXcgU2hhcmVkQXJyYXlCdWZmZXIoMTI4KVxuICAgIHRoaXNba0ltcGxdLnN0YXRlID0gbmV3IEludDMyQXJyYXkodGhpc1trSW1wbF0uc3RhdGVCdWYpXG4gICAgdGhpc1trSW1wbF0uZGF0YUJ1ZiA9IG5ldyBTaGFyZWRBcnJheUJ1ZmZlcihvcHRzLmJ1ZmZlclNpemUgfHwgNCAqIDEwMjQgKiAxMDI0KVxuICAgIHRoaXNba0ltcGxdLmRhdGEgPSBCdWZmZXIuZnJvbSh0aGlzW2tJbXBsXS5kYXRhQnVmKVxuICAgIHRoaXNba0ltcGxdLnN5bmMgPSBvcHRzLnN5bmMgfHwgZmFsc2VcbiAgICB0aGlzW2tJbXBsXS5lbmRpbmcgPSBmYWxzZVxuICAgIHRoaXNba0ltcGxdLmVuZGVkID0gZmFsc2VcbiAgICB0aGlzW2tJbXBsXS5uZWVkRHJhaW4gPSBmYWxzZVxuICAgIHRoaXNba0ltcGxdLmRlc3Ryb3llZCA9IGZhbHNlXG4gICAgdGhpc1trSW1wbF0uZmx1c2hpbmcgPSBmYWxzZVxuICAgIHRoaXNba0ltcGxdLnJlYWR5ID0gZmFsc2VcbiAgICB0aGlzW2tJbXBsXS5maW5pc2hlZCA9IGZhbHNlXG4gICAgdGhpc1trSW1wbF0uZXJyb3JlZCA9IG51bGxcbiAgICB0aGlzW2tJbXBsXS5jbG9zZWQgPSBmYWxzZVxuICAgIHRoaXNba0ltcGxdLmJ1ZiA9ICcnXG5cbiAgICAvLyBUT0RPIChmaXgpOiBNYWtlIHByaXZhdGU/XG4gICAgdGhpcy53b3JrZXIgPSBjcmVhdGVXb3JrZXIodGhpcywgb3B0cykgLy8gVE9ETyAoZml4KTogbWFrZSBwcml2YXRlXG4gICAgdGhpcy5vbignbWVzc2FnZScsIChtZXNzYWdlLCB0cmFuc2Zlckxpc3QpID0+IHtcbiAgICAgIHRoaXMud29ya2VyLnBvc3RNZXNzYWdlKG1lc3NhZ2UsIHRyYW5zZmVyTGlzdClcbiAgICB9KVxuICB9XG5cbiAgd3JpdGUgKGRhdGEpIHtcbiAgICBpZiAodGhpc1trSW1wbF0uZGVzdHJveWVkKSB7XG4gICAgICBlcnJvcih0aGlzLCBuZXcgRXJyb3IoJ3RoZSB3b3JrZXIgaGFzIGV4aXRlZCcpKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKHRoaXNba0ltcGxdLmVuZGluZykge1xuICAgICAgZXJyb3IodGhpcywgbmV3IEVycm9yKCd0aGUgd29ya2VyIGlzIGVuZGluZycpKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKHRoaXNba0ltcGxdLmZsdXNoaW5nICYmIHRoaXNba0ltcGxdLmJ1Zi5sZW5ndGggKyBkYXRhLmxlbmd0aCA+PSBNQVhfU1RSSU5HKSB7XG4gICAgICB0cnkge1xuICAgICAgICB3cml0ZVN5bmModGhpcylcbiAgICAgICAgdGhpc1trSW1wbF0uZmx1c2hpbmcgPSB0cnVlXG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgZGVzdHJveSh0aGlzLCBlcnIpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXNba0ltcGxdLmJ1ZiArPSBkYXRhXG5cbiAgICBpZiAodGhpc1trSW1wbF0uc3luYykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgd3JpdGVTeW5jKHRoaXMpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgZGVzdHJveSh0aGlzLCBlcnIpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdGhpc1trSW1wbF0uZmx1c2hpbmcpIHtcbiAgICAgIHRoaXNba0ltcGxdLmZsdXNoaW5nID0gdHJ1ZVxuICAgICAgc2V0SW1tZWRpYXRlKG5leHRGbHVzaCwgdGhpcylcbiAgICB9XG5cbiAgICB0aGlzW2tJbXBsXS5uZWVkRHJhaW4gPSB0aGlzW2tJbXBsXS5kYXRhLmxlbmd0aCAtIHRoaXNba0ltcGxdLmJ1Zi5sZW5ndGggLSBBdG9taWNzLmxvYWQodGhpc1trSW1wbF0uc3RhdGUsIFdSSVRFX0lOREVYKSA8PSAwXG4gICAgcmV0dXJuICF0aGlzW2tJbXBsXS5uZWVkRHJhaW5cbiAgfVxuXG4gIGVuZCAoKSB7XG4gICAgaWYgKHRoaXNba0ltcGxdLmRlc3Ryb3llZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpc1trSW1wbF0uZW5kaW5nID0gdHJ1ZVxuICAgIGVuZCh0aGlzKVxuICB9XG5cbiAgZmx1c2ggKGNiKSB7XG4gICAgaWYgKHRoaXNba0ltcGxdLmRlc3Ryb3llZCkge1xuICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGNiLCBuZXcgRXJyb3IoJ3RoZSB3b3JrZXIgaGFzIGV4aXRlZCcpKVxuICAgICAgfVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gVE9ETyB3cml0ZSBhbGwgLmJ1ZlxuICAgIGNvbnN0IHdyaXRlSW5kZXggPSBBdG9taWNzLmxvYWQodGhpc1trSW1wbF0uc3RhdGUsIFdSSVRFX0lOREVYKVxuICAgIC8vIHByb2Nlc3MuX3Jhd0RlYnVnKGAoZmx1c2gpIHJlYWRJbmRleCAoJHtBdG9taWNzLmxvYWQodGhpcy5zdGF0ZSwgUkVBRF9JTkRFWCl9KSB3cml0ZUluZGV4ICgke0F0b21pY3MubG9hZCh0aGlzLnN0YXRlLCBXUklURV9JTkRFWCl9KWApXG4gICAgd2FpdCh0aGlzW2tJbXBsXS5zdGF0ZSwgUkVBRF9JTkRFWCwgd3JpdGVJbmRleCwgSW5maW5pdHksIChlcnIsIHJlcykgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBkZXN0cm95KHRoaXMsIGVycilcbiAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhjYiwgZXJyKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmIChyZXMgPT09ICdub3QtZXF1YWwnKSB7XG4gICAgICAgIC8vIFRPRE8gaGFuZGxlIGRlYWRsb2NrXG4gICAgICAgIHRoaXMuZmx1c2goY2IpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjYilcbiAgICB9KVxuICB9XG5cbiAgZmx1c2hTeW5jICgpIHtcbiAgICBpZiAodGhpc1trSW1wbF0uZGVzdHJveWVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB3cml0ZVN5bmModGhpcylcbiAgICBmbHVzaFN5bmModGhpcylcbiAgfVxuXG4gIHVucmVmICgpIHtcbiAgICB0aGlzLndvcmtlci51bnJlZigpXG4gIH1cblxuICByZWYgKCkge1xuICAgIHRoaXMud29ya2VyLnJlZigpXG4gIH1cblxuICBnZXQgcmVhZHkgKCkge1xuICAgIHJldHVybiB0aGlzW2tJbXBsXS5yZWFkeVxuICB9XG5cbiAgZ2V0IGRlc3Ryb3llZCAoKSB7XG4gICAgcmV0dXJuIHRoaXNba0ltcGxdLmRlc3Ryb3llZFxuICB9XG5cbiAgZ2V0IGNsb3NlZCAoKSB7XG4gICAgcmV0dXJuIHRoaXNba0ltcGxdLmNsb3NlZFxuICB9XG5cbiAgZ2V0IHdyaXRhYmxlICgpIHtcbiAgICByZXR1cm4gIXRoaXNba0ltcGxdLmRlc3Ryb3llZCAmJiAhdGhpc1trSW1wbF0uZW5kaW5nXG4gIH1cblxuICBnZXQgd3JpdGFibGVFbmRlZCAoKSB7XG4gICAgcmV0dXJuIHRoaXNba0ltcGxdLmVuZGluZ1xuICB9XG5cbiAgZ2V0IHdyaXRhYmxlRmluaXNoZWQgKCkge1xuICAgIHJldHVybiB0aGlzW2tJbXBsXS5maW5pc2hlZFxuICB9XG5cbiAgZ2V0IHdyaXRhYmxlTmVlZERyYWluICgpIHtcbiAgICByZXR1cm4gdGhpc1trSW1wbF0ubmVlZERyYWluXG4gIH1cblxuICBnZXQgd3JpdGFibGVPYmplY3RNb2RlICgpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGdldCB3cml0YWJsZUVycm9yZWQgKCkge1xuICAgIHJldHVybiB0aGlzW2tJbXBsXS5lcnJvcmVkXG4gIH1cbn1cblxuZnVuY3Rpb24gZXJyb3IgKHN0cmVhbSwgZXJyKSB7XG4gIHNldEltbWVkaWF0ZSgoKSA9PiB7XG4gICAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXJyKVxuICB9KVxufVxuXG5mdW5jdGlvbiBkZXN0cm95IChzdHJlYW0sIGVycikge1xuICBpZiAoc3RyZWFtW2tJbXBsXS5kZXN0cm95ZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuICBzdHJlYW1ba0ltcGxdLmRlc3Ryb3llZCA9IHRydWVcblxuICBpZiAoZXJyKSB7XG4gICAgc3RyZWFtW2tJbXBsXS5lcnJvcmVkID0gZXJyXG4gICAgZXJyb3Ioc3RyZWFtLCBlcnIpXG4gIH1cblxuICBpZiAoIXN0cmVhbS53b3JrZXIuZXhpdGVkKSB7XG4gICAgc3RyZWFtLndvcmtlci50ZXJtaW5hdGUoKVxuICAgICAgLmNhdGNoKCgpID0+IHt9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBzdHJlYW1ba0ltcGxdLmNsb3NlZCA9IHRydWVcbiAgICAgICAgc3RyZWFtLmVtaXQoJ2Nsb3NlJylcbiAgICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgc2V0SW1tZWRpYXRlKCgpID0+IHtcbiAgICAgIHN0cmVhbVtrSW1wbF0uY2xvc2VkID0gdHJ1ZVxuICAgICAgc3RyZWFtLmVtaXQoJ2Nsb3NlJylcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIHdyaXRlIChzdHJlYW0sIGRhdGEsIGNiKSB7XG4gIC8vIGRhdGEgaXMgc21hbGxlciB0aGFuIHRoZSBzaGFyZWQgYnVmZmVyIGxlbmd0aFxuICBjb25zdCBjdXJyZW50ID0gQXRvbWljcy5sb2FkKHN0cmVhbVtrSW1wbF0uc3RhdGUsIFdSSVRFX0lOREVYKVxuICBjb25zdCBsZW5ndGggPSBCdWZmZXIuYnl0ZUxlbmd0aChkYXRhKVxuICBzdHJlYW1ba0ltcGxdLmRhdGEud3JpdGUoZGF0YSwgY3VycmVudClcbiAgQXRvbWljcy5zdG9yZShzdHJlYW1ba0ltcGxdLnN0YXRlLCBXUklURV9JTkRFWCwgY3VycmVudCArIGxlbmd0aClcbiAgQXRvbWljcy5ub3RpZnkoc3RyZWFtW2tJbXBsXS5zdGF0ZSwgV1JJVEVfSU5ERVgpXG4gIGNiKClcbiAgcmV0dXJuIHRydWVcbn1cblxuZnVuY3Rpb24gZW5kIChzdHJlYW0pIHtcbiAgaWYgKHN0cmVhbVtrSW1wbF0uZW5kZWQgfHwgIXN0cmVhbVtrSW1wbF0uZW5kaW5nIHx8IHN0cmVhbVtrSW1wbF0uZmx1c2hpbmcpIHtcbiAgICByZXR1cm5cbiAgfVxuICBzdHJlYW1ba0ltcGxdLmVuZGVkID0gdHJ1ZVxuXG4gIHRyeSB7XG4gICAgc3RyZWFtLmZsdXNoU3luYygpXG5cbiAgICBsZXQgcmVhZEluZGV4ID0gQXRvbWljcy5sb2FkKHN0cmVhbVtrSW1wbF0uc3RhdGUsIFJFQURfSU5ERVgpXG5cbiAgICAvLyBwcm9jZXNzLl9yYXdEZWJ1Zygnd3JpdGluZyBpbmRleCcpXG4gICAgQXRvbWljcy5zdG9yZShzdHJlYW1ba0ltcGxdLnN0YXRlLCBXUklURV9JTkRFWCwgLTEpXG4gICAgLy8gcHJvY2Vzcy5fcmF3RGVidWcoYChlbmQpIHJlYWRJbmRleCAoJHtBdG9taWNzLmxvYWQoc3RyZWFtLnN0YXRlLCBSRUFEX0lOREVYKX0pIHdyaXRlSW5kZXggKCR7QXRvbWljcy5sb2FkKHN0cmVhbS5zdGF0ZSwgV1JJVEVfSU5ERVgpfSlgKVxuICAgIEF0b21pY3Mubm90aWZ5KHN0cmVhbVtrSW1wbF0uc3RhdGUsIFdSSVRFX0lOREVYKVxuXG4gICAgLy8gV2FpdCBmb3IgdGhlIHByb2Nlc3MgdG8gY29tcGxldGVcbiAgICBsZXQgc3BpbnMgPSAwXG4gICAgd2hpbGUgKHJlYWRJbmRleCAhPT0gLTEpIHtcbiAgICAgIC8vIHByb2Nlc3MuX3Jhd0RlYnVnKGByZWFkID0gJHtyZWFkfWApXG4gICAgICBBdG9taWNzLndhaXQoc3RyZWFtW2tJbXBsXS5zdGF0ZSwgUkVBRF9JTkRFWCwgcmVhZEluZGV4LCAxMDAwKVxuICAgICAgcmVhZEluZGV4ID0gQXRvbWljcy5sb2FkKHN0cmVhbVtrSW1wbF0uc3RhdGUsIFJFQURfSU5ERVgpXG5cbiAgICAgIGlmIChyZWFkSW5kZXggPT09IC0yKSB7XG4gICAgICAgIGRlc3Ryb3koc3RyZWFtLCBuZXcgRXJyb3IoJ2VuZCgpIGZhaWxlZCcpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKCsrc3BpbnMgPT09IDEwKSB7XG4gICAgICAgIGRlc3Ryb3koc3RyZWFtLCBuZXcgRXJyb3IoJ2VuZCgpIHRvb2sgdG9vIGxvbmcgKDEwcyknKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzcy5uZXh0VGljaygoKSA9PiB7XG4gICAgICBzdHJlYW1ba0ltcGxdLmZpbmlzaGVkID0gdHJ1ZVxuICAgICAgc3RyZWFtLmVtaXQoJ2ZpbmlzaCcpXG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVzdHJveShzdHJlYW0sIGVycilcbiAgfVxuICAvLyBwcm9jZXNzLl9yYXdEZWJ1ZygnZW5kIGZpbmlzaGVkLi4uJylcbn1cblxuZnVuY3Rpb24gd3JpdGVTeW5jIChzdHJlYW0pIHtcbiAgY29uc3QgY2IgPSAoKSA9PiB7XG4gICAgaWYgKHN0cmVhbVtrSW1wbF0uZW5kaW5nKSB7XG4gICAgICBlbmQoc3RyZWFtKVxuICAgIH0gZWxzZSBpZiAoc3RyZWFtW2tJbXBsXS5uZWVkRHJhaW4pIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZHJhaW4sIHN0cmVhbSlcbiAgICB9XG4gIH1cbiAgc3RyZWFtW2tJbXBsXS5mbHVzaGluZyA9IGZhbHNlXG5cbiAgd2hpbGUgKHN0cmVhbVtrSW1wbF0uYnVmLmxlbmd0aCAhPT0gMCkge1xuICAgIGNvbnN0IHdyaXRlSW5kZXggPSBBdG9taWNzLmxvYWQoc3RyZWFtW2tJbXBsXS5zdGF0ZSwgV1JJVEVfSU5ERVgpXG4gICAgbGV0IGxlZnRvdmVyID0gc3RyZWFtW2tJbXBsXS5kYXRhLmxlbmd0aCAtIHdyaXRlSW5kZXhcbiAgICBpZiAobGVmdG92ZXIgPT09IDApIHtcbiAgICAgIGZsdXNoU3luYyhzdHJlYW0pXG4gICAgICBBdG9taWNzLnN0b3JlKHN0cmVhbVtrSW1wbF0uc3RhdGUsIFJFQURfSU5ERVgsIDApXG4gICAgICBBdG9taWNzLnN0b3JlKHN0cmVhbVtrSW1wbF0uc3RhdGUsIFdSSVRFX0lOREVYLCAwKVxuICAgICAgY29udGludWVcbiAgICB9IGVsc2UgaWYgKGxlZnRvdmVyIDwgMCkge1xuICAgICAgLy8gc3RyZWFtIHNob3VsZCBuZXZlciBoYXBwZW5cbiAgICAgIHRocm93IG5ldyBFcnJvcignb3ZlcndyaXR0ZW4nKVxuICAgIH1cblxuICAgIGxldCB0b1dyaXRlID0gc3RyZWFtW2tJbXBsXS5idWYuc2xpY2UoMCwgbGVmdG92ZXIpXG4gICAgbGV0IHRvV3JpdGVCeXRlcyA9IEJ1ZmZlci5ieXRlTGVuZ3RoKHRvV3JpdGUpXG4gICAgaWYgKHRvV3JpdGVCeXRlcyA8PSBsZWZ0b3Zlcikge1xuICAgICAgc3RyZWFtW2tJbXBsXS5idWYgPSBzdHJlYW1ba0ltcGxdLmJ1Zi5zbGljZShsZWZ0b3ZlcilcbiAgICAgIC8vIHByb2Nlc3MuX3Jhd0RlYnVnKCd3cml0aW5nICcgKyB0b1dyaXRlLmxlbmd0aClcbiAgICAgIHdyaXRlKHN0cmVhbSwgdG9Xcml0ZSwgY2IpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG11bHRpLWJ5dGUgdXRmLThcbiAgICAgIGZsdXNoU3luYyhzdHJlYW0pXG4gICAgICBBdG9taWNzLnN0b3JlKHN0cmVhbVtrSW1wbF0uc3RhdGUsIFJFQURfSU5ERVgsIDApXG4gICAgICBBdG9taWNzLnN0b3JlKHN0cmVhbVtrSW1wbF0uc3RhdGUsIFdSSVRFX0lOREVYLCAwKVxuXG4gICAgICAvLyBGaW5kIGEgdG9Xcml0ZSBsZW5ndGggdGhhdCBmaXRzIHRoZSBidWZmZXJcbiAgICAgIC8vIGl0IG11c3QgZXhpc3RzIGFzIHRoZSBidWZmZXIgaXMgYXQgbGVhc3QgNCBieXRlcyBsZW5ndGhcbiAgICAgIC8vIGFuZCB0aGUgbWF4IHV0Zi04IGxlbmd0aCBmb3IgYSBjaGFyIGlzIDQgYnl0ZXMuXG4gICAgICB3aGlsZSAodG9Xcml0ZUJ5dGVzID4gc3RyZWFtW2tJbXBsXS5idWYubGVuZ3RoKSB7XG4gICAgICAgIGxlZnRvdmVyID0gbGVmdG92ZXIgLyAyXG4gICAgICAgIHRvV3JpdGUgPSBzdHJlYW1ba0ltcGxdLmJ1Zi5zbGljZSgwLCBsZWZ0b3ZlcilcbiAgICAgICAgdG9Xcml0ZUJ5dGVzID0gQnVmZmVyLmJ5dGVMZW5ndGgodG9Xcml0ZSlcbiAgICAgIH1cbiAgICAgIHN0cmVhbVtrSW1wbF0uYnVmID0gc3RyZWFtW2tJbXBsXS5idWYuc2xpY2UobGVmdG92ZXIpXG4gICAgICB3cml0ZShzdHJlYW0sIHRvV3JpdGUsIGNiKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBmbHVzaFN5bmMgKHN0cmVhbSkge1xuICBpZiAoc3RyZWFtW2tJbXBsXS5mbHVzaGluZykge1xuICAgIHRocm93IG5ldyBFcnJvcigndW5hYmxlIHRvIGZsdXNoIHdoaWxlIGZsdXNoaW5nJylcbiAgfVxuXG4gIC8vIHByb2Nlc3MuX3Jhd0RlYnVnKCdmbHVzaFN5bmMgc3RhcnRlZCcpXG5cbiAgY29uc3Qgd3JpdGVJbmRleCA9IEF0b21pY3MubG9hZChzdHJlYW1ba0ltcGxdLnN0YXRlLCBXUklURV9JTkRFWClcblxuICBsZXQgc3BpbnMgPSAwXG5cbiAgLy8gVE9ETyBoYW5kbGUgZGVhZGxvY2tcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBjb25zdCByZWFkSW5kZXggPSBBdG9taWNzLmxvYWQoc3RyZWFtW2tJbXBsXS5zdGF0ZSwgUkVBRF9JTkRFWClcblxuICAgIGlmIChyZWFkSW5kZXggPT09IC0yKSB7XG4gICAgICB0aHJvdyBFcnJvcignX2ZsdXNoU3luYyBmYWlsZWQnKVxuICAgIH1cblxuICAgIC8vIHByb2Nlc3MuX3Jhd0RlYnVnKGAoZmx1c2hTeW5jKSByZWFkSW5kZXggKCR7cmVhZEluZGV4fSkgd3JpdGVJbmRleCAoJHt3cml0ZUluZGV4fSlgKVxuICAgIGlmIChyZWFkSW5kZXggIT09IHdyaXRlSW5kZXgpIHtcbiAgICAgIC8vIFRPRE8gc3RyZWFtIHRpbWVvdXRzIGZvciBzb21lIHJlYXNvbi5cbiAgICAgIEF0b21pY3Mud2FpdChzdHJlYW1ba0ltcGxdLnN0YXRlLCBSRUFEX0lOREVYLCByZWFkSW5kZXgsIDEwMDApXG4gICAgfSBlbHNlIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgaWYgKCsrc3BpbnMgPT09IDEwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ19mbHVzaFN5bmMgdG9vayB0b28gbG9uZyAoMTBzKScpXG4gICAgfVxuICB9XG4gIC8vIHByb2Nlc3MuX3Jhd0RlYnVnKCdmbHVzaFN5bmMgZmluaXNoZWQnKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRocmVhZFN0cmVhbVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCB7IGNyZWF0ZVJlcXVpcmUgfSA9IHJlcXVpcmUoJ21vZHVsZScpXG5jb25zdCBnZXRDYWxsZXJzID0gcmVxdWlyZSgnLi9jYWxsZXInKVxuY29uc3QgeyBqb2luLCBpc0Fic29sdXRlLCBzZXAgfSA9IHJlcXVpcmUoJ25vZGU6cGF0aCcpXG5jb25zdCBzbGVlcCA9IHJlcXVpcmUoJ2F0b21pYy1zbGVlcCcpXG5jb25zdCBvbkV4aXQgPSByZXF1aXJlKCdvbi1leGl0LWxlYWstZnJlZScpXG5jb25zdCBUaHJlYWRTdHJlYW0gPSByZXF1aXJlKCd0aHJlYWQtc3RyZWFtJylcblxuZnVuY3Rpb24gc2V0dXBPbkV4aXQgKHN0cmVhbSkge1xuICAvLyBUaGlzIGlzIGxlYWsgZnJlZSwgaXQgZG9lcyBub3QgbGVhdmUgZXZlbnQgaGFuZGxlcnNcbiAgb25FeGl0LnJlZ2lzdGVyKHN0cmVhbSwgYXV0b0VuZClcbiAgb25FeGl0LnJlZ2lzdGVyQmVmb3JlRXhpdChzdHJlYW0sIGZsdXNoKVxuXG4gIHN0cmVhbS5vbignY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgb25FeGl0LnVucmVnaXN0ZXIoc3RyZWFtKVxuICB9KVxufVxuXG5mdW5jdGlvbiBidWlsZFN0cmVhbSAoZmlsZW5hbWUsIHdvcmtlckRhdGEsIHdvcmtlck9wdHMsIHN5bmMpIHtcbiAgY29uc3Qgc3RyZWFtID0gbmV3IFRocmVhZFN0cmVhbSh7XG4gICAgZmlsZW5hbWUsXG4gICAgd29ya2VyRGF0YSxcbiAgICB3b3JrZXJPcHRzLFxuICAgIHN5bmNcbiAgfSlcblxuICBzdHJlYW0ub24oJ3JlYWR5Jywgb25SZWFkeSlcbiAgc3RyZWFtLm9uKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICBwcm9jZXNzLnJlbW92ZUxpc3RlbmVyKCdleGl0Jywgb25FeGl0KVxuICB9KVxuXG4gIHByb2Nlc3Mub24oJ2V4aXQnLCBvbkV4aXQpXG5cbiAgZnVuY3Rpb24gb25SZWFkeSAoKSB7XG4gICAgcHJvY2Vzcy5yZW1vdmVMaXN0ZW5lcignZXhpdCcsIG9uRXhpdClcbiAgICBzdHJlYW0udW5yZWYoKVxuXG4gICAgaWYgKHdvcmtlck9wdHMuYXV0b0VuZCAhPT0gZmFsc2UpIHtcbiAgICAgIHNldHVwT25FeGl0KHN0cmVhbSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkV4aXQgKCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKHN0cmVhbS5jbG9zZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBzdHJlYW0uZmx1c2hTeW5jKClcbiAgICAvLyBBcHBhcmVudGx5IHRoZXJlIGlzIGEgdmVyeSBzcG9yYWRpYyByYWNlIGNvbmRpdGlvblxuICAgIC8vIHRoYXQgaW4gY2VydGFpbiBPUyB3b3VsZCBwcmV2ZW50IHRoZSBtZXNzYWdlcyB0byBiZSBmbHVzaGVkXG4gICAgLy8gYmVjYXVzZSB0aGUgdGhyZWFkIG1pZ2h0IG5vdCBoYXZlIGJlZW4gY3JlYXRlZCBzdGlsbC5cbiAgICAvLyBVbmZvcnR1bmF0ZWx5IHdlIG5lZWQgdG8gc2xlZXAoMTAwKSBpbiB0aGlzIGNhc2UuXG4gICAgc2xlZXAoMTAwKVxuICAgIHN0cmVhbS5lbmQoKVxuICB9XG5cbiAgcmV0dXJuIHN0cmVhbVxufVxuXG5mdW5jdGlvbiBhdXRvRW5kIChzdHJlYW0pIHtcbiAgc3RyZWFtLnJlZigpXG4gIHN0cmVhbS5mbHVzaFN5bmMoKVxuICBzdHJlYW0uZW5kKClcbiAgc3RyZWFtLm9uY2UoJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgIHN0cmVhbS51bnJlZigpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGZsdXNoIChzdHJlYW0pIHtcbiAgc3RyZWFtLmZsdXNoU3luYygpXG59XG5cbmZ1bmN0aW9uIHRyYW5zcG9ydCAoZnVsbE9wdGlvbnMpIHtcbiAgY29uc3QgeyBwaXBlbGluZSwgdGFyZ2V0cywgbGV2ZWxzLCBkZWR1cGUsIHdvcmtlciA9IHt9LCBjYWxsZXIgPSBnZXRDYWxsZXJzKCksIHN5bmMgPSBmYWxzZSB9ID0gZnVsbE9wdGlvbnNcblxuICBjb25zdCBvcHRpb25zID0ge1xuICAgIC4uLmZ1bGxPcHRpb25zLm9wdGlvbnNcbiAgfVxuXG4gIC8vIEJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gIGNvbnN0IGNhbGxlcnMgPSB0eXBlb2YgY2FsbGVyID09PSAnc3RyaW5nJyA/IFtjYWxsZXJdIDogY2FsbGVyXG5cbiAgLy8gVGhpcyB3aWxsIGJlIGV2ZW50dWFsbHkgbW9kaWZpZWQgYnkgYnVuZGxlcnNcbiAgY29uc3QgYnVuZGxlck92ZXJyaWRlcyA9ICdfX2J1bmRsZXJQYXRoc092ZXJyaWRlcycgaW4gZ2xvYmFsVGhpcyA/IGdsb2JhbFRoaXMuX19idW5kbGVyUGF0aHNPdmVycmlkZXMgOiB7fVxuXG4gIGxldCB0YXJnZXQgPSBmdWxsT3B0aW9ucy50YXJnZXRcblxuICBpZiAodGFyZ2V0ICYmIHRhcmdldHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ29ubHkgb25lIG9mIHRhcmdldCBvciB0YXJnZXRzIGNhbiBiZSBzcGVjaWZpZWQnKVxuICB9XG5cbiAgaWYgKHRhcmdldHMpIHtcbiAgICB0YXJnZXQgPSBidW5kbGVyT3ZlcnJpZGVzWydwaW5vLXdvcmtlciddIHx8IGpvaW4oX19kaXJuYW1lLCAnd29ya2VyLmpzJylcbiAgICBvcHRpb25zLnRhcmdldHMgPSB0YXJnZXRzLmZpbHRlcihkZXN0ID0+IGRlc3QudGFyZ2V0KS5tYXAoKGRlc3QpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmRlc3QsXG4gICAgICAgIHRhcmdldDogZml4VGFyZ2V0KGRlc3QudGFyZ2V0KVxuICAgICAgfVxuICAgIH0pXG4gICAgb3B0aW9ucy5waXBlbGluZXMgPSB0YXJnZXRzLmZpbHRlcihkZXN0ID0+IGRlc3QucGlwZWxpbmUpLm1hcCgoZGVzdCkgPT4ge1xuICAgICAgcmV0dXJuIGRlc3QucGlwZWxpbmUubWFwKCh0KSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4udCxcbiAgICAgICAgICBsZXZlbDogZGVzdC5sZXZlbCwgLy8gZHVwbGljYXRlIHRoZSBwaXBlbGluZSBgbGV2ZWxgIHByb3BlcnR5IGRlZmluZWQgaW4gdGhlIHVwcGVyIGxldmVsXG4gICAgICAgICAgdGFyZ2V0OiBmaXhUYXJnZXQodC50YXJnZXQpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfSBlbHNlIGlmIChwaXBlbGluZSkge1xuICAgIHRhcmdldCA9IGJ1bmRsZXJPdmVycmlkZXNbJ3Bpbm8td29ya2VyJ10gfHwgam9pbihfX2Rpcm5hbWUsICd3b3JrZXIuanMnKVxuICAgIG9wdGlvbnMucGlwZWxpbmVzID0gW3BpcGVsaW5lLm1hcCgoZGVzdCkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uZGVzdCxcbiAgICAgICAgdGFyZ2V0OiBmaXhUYXJnZXQoZGVzdC50YXJnZXQpXG4gICAgICB9XG4gICAgfSldXG4gIH1cblxuICBpZiAobGV2ZWxzKSB7XG4gICAgb3B0aW9ucy5sZXZlbHMgPSBsZXZlbHNcbiAgfVxuXG4gIGlmIChkZWR1cGUpIHtcbiAgICBvcHRpb25zLmRlZHVwZSA9IGRlZHVwZVxuICB9XG5cbiAgb3B0aW9ucy5waW5vV2lsbFNlbmRDb25maWcgPSB0cnVlXG5cbiAgcmV0dXJuIGJ1aWxkU3RyZWFtKGZpeFRhcmdldCh0YXJnZXQpLCBvcHRpb25zLCB3b3JrZXIsIHN5bmMpXG5cbiAgZnVuY3Rpb24gZml4VGFyZ2V0IChvcmlnaW4pIHtcbiAgICBvcmlnaW4gPSBidW5kbGVyT3ZlcnJpZGVzW29yaWdpbl0gfHwgb3JpZ2luXG5cbiAgICBpZiAoaXNBYnNvbHV0ZShvcmlnaW4pIHx8IG9yaWdpbi5pbmRleE9mKCdmaWxlOi8vJykgPT09IDApIHtcbiAgICAgIHJldHVybiBvcmlnaW5cbiAgICB9XG5cbiAgICBpZiAob3JpZ2luID09PSAncGluby9maWxlJykge1xuICAgICAgcmV0dXJuIGpvaW4oX19kaXJuYW1lLCAnLi4nLCAnZmlsZS5qcycpXG4gICAgfVxuXG4gICAgbGV0IGZpeFRhcmdldFxuXG4gICAgZm9yIChjb25zdCBmaWxlUGF0aCBvZiBjYWxsZXJzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gZmlsZVBhdGggPT09ICdub2RlOnJlcGwnXG4gICAgICAgICAgPyBwcm9jZXNzLmN3ZCgpICsgc2VwXG4gICAgICAgICAgOiBmaWxlUGF0aFxuXG4gICAgICAgIGZpeFRhcmdldCA9IGNyZWF0ZVJlcXVpcmUoY29udGV4dCkucmVzb2x2ZShvcmlnaW4pXG4gICAgICAgIGJyZWFrXG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gU2lsZW50IGNhdGNoXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFmaXhUYXJnZXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5hYmxlIHRvIGRldGVybWluZSB0cmFuc3BvcnQgdGFyZ2V0IGZvciBcIiR7b3JpZ2lufVwiYClcbiAgICB9XG5cbiAgICByZXR1cm4gZml4VGFyZ2V0XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0cmFuc3BvcnRcbiIsICIndXNlIHN0cmljdCdcblxuLyogZXNsaW50IG5vLXByb3RvdHlwZS1idWlsdGluczogMCAqL1xuXG5jb25zdCBkaWFnQ2hhbiA9IHJlcXVpcmUoJ25vZGU6ZGlhZ25vc3RpY3NfY2hhbm5lbCcpXG5jb25zdCBmb3JtYXQgPSByZXF1aXJlKCdxdWljay1mb3JtYXQtdW5lc2NhcGVkJylcbmNvbnN0IHsgbWFwSHR0cFJlcXVlc3QsIG1hcEh0dHBSZXNwb25zZSB9ID0gcmVxdWlyZSgncGluby1zdGQtc2VyaWFsaXplcnMnKVxuY29uc3QgU29uaWNCb29tID0gcmVxdWlyZSgnc29uaWMtYm9vbScpXG5jb25zdCBvbkV4aXQgPSByZXF1aXJlKCdvbi1leGl0LWxlYWstZnJlZScpXG5jb25zdCB7XG4gIGxzQ2FjaGVTeW0sXG4gIGNoaW5kaW5nc1N5bSxcbiAgd3JpdGVTeW0sXG4gIHNlcmlhbGl6ZXJzU3ltLFxuICBmb3JtYXRPcHRzU3ltLFxuICBlbmRTeW0sXG4gIHN0cmluZ2lmaWVyc1N5bSxcbiAgc3RyaW5naWZ5U3ltLFxuICBzdHJpbmdpZnlTYWZlU3ltLFxuICB3aWxkY2FyZEZpcnN0U3ltLFxuICBuZXN0ZWRLZXlTeW0sXG4gIGZvcm1hdHRlcnNTeW0sXG4gIG1lc3NhZ2VLZXlTeW0sXG4gIGVycm9yS2V5U3ltLFxuICBuZXN0ZWRLZXlTdHJTeW0sXG4gIG1zZ1ByZWZpeFN5bVxufSA9IHJlcXVpcmUoJy4vc3ltYm9scycpXG5jb25zdCB7IGlzTWFpblRocmVhZCB9ID0gcmVxdWlyZSgnd29ya2VyX3RocmVhZHMnKVxuY29uc3QgdHJhbnNwb3J0ID0gcmVxdWlyZSgnLi90cmFuc3BvcnQnKVxuXG5sZXQgYXNKc29uQ2hhblxuLy8gTm9kZSA+PSAxOC4xOSBzdXBwb3J0cyBkaWFnbm9zdGljc19jaGFubmVsLnRyYWNpbmdDaGFubmVsXG5pZiAodHlwZW9mIGRpYWdDaGFuLnRyYWNpbmdDaGFubmVsID09PSAnZnVuY3Rpb24nKSB7XG4gIGFzSnNvbkNoYW4gPSBkaWFnQ2hhbi50cmFjaW5nQ2hhbm5lbCgncGlub19hc0pzb24nKVxufSBlbHNlIHtcbiAgLy8gT2xkZXIgTm9kZSAxOC54IChlLmcuIDE4LjE4KSwgcHJvdmlkZWQgYSBuby1vcCBmYWxsYmFja1xuICBhc0pzb25DaGFuID0ge1xuICAgIGhhc1N1YnNjcmliZXJzOiBmYWxzZSxcbiAgICB0cmFjZVN5bmMgKGZuLCBzdG9yZSwgdGhpc0FyZywgLi4uYXJncykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhpc0FyZywgLi4uYXJncylcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbm9vcCAoKSB7XG59XG5cbmZ1bmN0aW9uIGdlbkxvZyAobGV2ZWwsIGhvb2spIHtcbiAgaWYgKCFob29rKSByZXR1cm4gTE9HXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGhvb2tXcmFwcGVkTG9nICguLi5hcmdzKSB7XG4gICAgaG9vay5jYWxsKHRoaXMsIGFyZ3MsIExPRywgbGV2ZWwpXG4gIH1cblxuICBmdW5jdGlvbiBMT0cgKG8sIC4uLm4pIHtcbiAgICBpZiAodHlwZW9mIG8gPT09ICdvYmplY3QnKSB7XG4gICAgICBsZXQgbXNnID0gb1xuICAgICAgaWYgKG8gIT09IG51bGwpIHtcbiAgICAgICAgaWYgKG8ubWV0aG9kICYmIG8uaGVhZGVycyAmJiBvLnNvY2tldCkge1xuICAgICAgICAgIG8gPSBtYXBIdHRwUmVxdWVzdChvKVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvLnNldEhlYWRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIG8gPSBtYXBIdHRwUmVzcG9uc2UobylcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGV0IGZvcm1hdFBhcmFtc1xuICAgICAgaWYgKG1zZyA9PT0gbnVsbCAmJiBuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBmb3JtYXRQYXJhbXMgPSBbbnVsbF1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1zZyA9IG4uc2hpZnQoKVxuICAgICAgICBmb3JtYXRQYXJhbXMgPSBuXG4gICAgICB9XG4gICAgICAvLyBXZSBkbyBub3QgdXNlIGEgY29lcmNpdmUgY2hlY2sgZm9yIGBtc2dgIGFzIGl0IGlzXG4gICAgICAvLyBtZWFzdXJhYmx5IHNsb3dlciB0aGFuIHRoZSBleHBsaWNpdCBjaGVja3MuXG4gICAgICBpZiAodHlwZW9mIHRoaXNbbXNnUHJlZml4U3ltXSA9PT0gJ3N0cmluZycgJiYgbXNnICE9PSB1bmRlZmluZWQgJiYgbXNnICE9PSBudWxsKSB7XG4gICAgICAgIG1zZyA9IHRoaXNbbXNnUHJlZml4U3ltXSArIG1zZ1xuICAgICAgfVxuICAgICAgdGhpc1t3cml0ZVN5bV0obywgZm9ybWF0KG1zZywgZm9ybWF0UGFyYW1zLCB0aGlzW2Zvcm1hdE9wdHNTeW1dKSwgbGV2ZWwpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBtc2cgPSBvID09PSB1bmRlZmluZWQgPyBuLnNoaWZ0KCkgOiBvXG5cbiAgICAgIC8vIFdlIGRvIG5vdCB1c2UgYSBjb2VyY2l2ZSBjaGVjayBmb3IgYG1zZ2AgYXMgaXQgaXNcbiAgICAgIC8vIG1lYXN1cmFibHkgc2xvd2VyIHRoYW4gdGhlIGV4cGxpY2l0IGNoZWNrcy5cbiAgICAgIGlmICh0eXBlb2YgdGhpc1ttc2dQcmVmaXhTeW1dID09PSAnc3RyaW5nJyAmJiBtc2cgIT09IHVuZGVmaW5lZCAmJiBtc2cgIT09IG51bGwpIHtcbiAgICAgICAgbXNnID0gdGhpc1ttc2dQcmVmaXhTeW1dICsgbXNnXG4gICAgICB9XG4gICAgICB0aGlzW3dyaXRlU3ltXShudWxsLCBmb3JtYXQobXNnLCBuLCB0aGlzW2Zvcm1hdE9wdHNTeW1dKSwgbGV2ZWwpXG4gICAgfVxuICB9XG59XG5cbi8vIG1hZ2ljYWxseSBlc2NhcGUgc3RyaW5ncyBmb3IganNvblxuLy8gcmVseWluZyBvbiB0aGVpciBjaGFyQ29kZUF0XG4vLyBldmVyeXRoaW5nIGJlbG93IDMyIG5lZWRzIEpTT04uc3RyaW5naWZ5KClcbi8vIDM0IGFuZCA5MiBoYXBwZW5zIGFsbCB0aGUgdGltZSwgc28gd2Vcbi8vIGhhdmUgYSBmYXN0IGNhc2UgZm9yIHRoZW1cbmZ1bmN0aW9uIGFzU3RyaW5nIChzdHIpIHtcbiAgbGV0IHJlc3VsdCA9ICcnXG4gIGxldCBsYXN0ID0gMFxuICBsZXQgZm91bmQgPSBmYWxzZVxuICBsZXQgcG9pbnQgPSAyNTVcbiAgY29uc3QgbCA9IHN0ci5sZW5ndGhcbiAgaWYgKGwgPiAxMDApIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoc3RyKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbCAmJiBwb2ludCA+PSAzMjsgaSsrKSB7XG4gICAgcG9pbnQgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGlmIChwb2ludCA9PT0gMzQgfHwgcG9pbnQgPT09IDkyKSB7XG4gICAgICByZXN1bHQgKz0gc3RyLnNsaWNlKGxhc3QsIGkpICsgJ1xcXFwnXG4gICAgICBsYXN0ID0gaVxuICAgICAgZm91bmQgPSB0cnVlXG4gICAgfVxuICB9XG4gIGlmICghZm91bmQpIHtcbiAgICByZXN1bHQgPSBzdHJcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgKz0gc3RyLnNsaWNlKGxhc3QpXG4gIH1cbiAgcmV0dXJuIHBvaW50IDwgMzIgPyBKU09OLnN0cmluZ2lmeShzdHIpIDogJ1wiJyArIHJlc3VsdCArICdcIidcbn1cblxuLyoqXG4gKiBgYXNKc29uYCB3cmFwcyBgX2FzSnNvbmAgaW4gb3JkZXIgdG8gZmFjaWxpdGF0ZSBnZW5lcmF0aW5nIGRpYWdub3N0aWNzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmogVGhlIG1lcmdpbmcgb2JqZWN0IHBhc3NlZCB0byB0aGUgbG9nIG1ldGhvZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtc2cgVGhlIGxvZyBtZXNzYWdlIHBhc3NlZCB0byB0aGUgbG9nIG1ldGhvZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBudW0gVGhlIGxvZyBsZXZlbCBudW1iZXIuXG4gKiBAcGFyYW0ge251bWJlcn0gdGltZSBUaGUgbG9nIHRpbWUgaW4gbWlsbGlzZWNvbmRzLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGFzSnNvbiAob2JqLCBtc2csIG51bSwgdGltZSkge1xuICBpZiAoYXNKc29uQ2hhbi5oYXNTdWJzY3JpYmVycyA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gX2FzSnNvbi5jYWxsKHRoaXMsIG9iaiwgbXNnLCBudW0sIHRpbWUpXG4gIH1cblxuICBjb25zdCBzdG9yZSA9IHsgaW5zdGFuY2U6IHRoaXMsIGFyZ3VtZW50cyB9XG4gIHJldHVybiBhc0pzb25DaGFuLnRyYWNlU3luYyhfYXNKc29uLCBzdG9yZSwgdGhpcywgb2JqLCBtc2csIG51bSwgdGltZSlcbn1cblxuLyoqXG4gKiBgX2FzSnNvbmAgcGFyc2VzIGFsbCBjb2xsZWN0ZWQgZGF0YSBhbmQgZ2VuZXJhdGVzIHRoZSBmaW5hbGl6ZWQgbmV3bGluZVxuICogZGVsaW1pdGVkIEpTT04gc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmogVGhlIG1lcmdpbmcgb2JqZWN0IHBhc3NlZCB0byB0aGUgbG9nIG1ldGhvZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtc2cgVGhlIGxvZyBtZXNzYWdlIHBhc3NlZCB0byB0aGUgbG9nIG1ldGhvZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBudW0gVGhlIGxvZyBsZXZlbCBudW1iZXIuXG4gKiBAcGFyYW0ge251bWJlcn0gdGltZSBUaGUgbG9nIHRpbWUgaW4gbWlsbGlzZWNvbmRzLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmaW5hbGl6ZWQgbG9nIHN0cmluZyB0ZXJtaW5hdGVkIHdpdGggYSBuZXdsaW5lLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gX2FzSnNvbiAob2JqLCBtc2csIG51bSwgdGltZSkge1xuICBjb25zdCBzdHJpbmdpZnkgPSB0aGlzW3N0cmluZ2lmeVN5bV1cbiAgY29uc3Qgc3RyaW5naWZ5U2FmZSA9IHRoaXNbc3RyaW5naWZ5U2FmZVN5bV1cbiAgY29uc3Qgc3RyaW5naWZpZXJzID0gdGhpc1tzdHJpbmdpZmllcnNTeW1dXG4gIGNvbnN0IGVuZCA9IHRoaXNbZW5kU3ltXVxuICBjb25zdCBjaGluZGluZ3MgPSB0aGlzW2NoaW5kaW5nc1N5bV1cbiAgY29uc3Qgc2VyaWFsaXplcnMgPSB0aGlzW3NlcmlhbGl6ZXJzU3ltXVxuICBjb25zdCBmb3JtYXR0ZXJzID0gdGhpc1tmb3JtYXR0ZXJzU3ltXVxuICBjb25zdCBtZXNzYWdlS2V5ID0gdGhpc1ttZXNzYWdlS2V5U3ltXVxuICBjb25zdCBlcnJvcktleSA9IHRoaXNbZXJyb3JLZXlTeW1dXG4gIGxldCBkYXRhID0gdGhpc1tsc0NhY2hlU3ltXVtudW1dICsgdGltZVxuXG4gIC8vIHdlIG5lZWQgdGhlIGNoaWxkIGJpbmRpbmdzIGFkZGVkIHRvIHRoZSBvdXRwdXQgZmlyc3Qgc28gaW5zdGFuY2UgbG9nZ2VkXG4gIC8vIG9iamVjdHMgY2FuIHRha2UgcHJlY2VkZW5jZSB3aGVuIEpTT04ucGFyc2UtaW5nIHRoZSByZXN1bHRpbmcgbG9nIGxpbmVcbiAgZGF0YSA9IGRhdGEgKyBjaGluZGluZ3NcblxuICBsZXQgdmFsdWVcbiAgaWYgKGZvcm1hdHRlcnMubG9nKSB7XG4gICAgb2JqID0gZm9ybWF0dGVycy5sb2cob2JqKVxuICB9XG4gIGNvbnN0IHdpbGRjYXJkU3RyaW5naWZpZXIgPSBzdHJpbmdpZmllcnNbd2lsZGNhcmRGaXJzdFN5bV1cbiAgbGV0IHByb3BTdHIgPSAnJ1xuICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICB2YWx1ZSA9IG9ialtrZXldXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHNlcmlhbGl6ZXJzW2tleV0pIHtcbiAgICAgICAgdmFsdWUgPSBzZXJpYWxpemVyc1trZXldKHZhbHVlKVxuICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGVycm9yS2V5ICYmIHNlcmlhbGl6ZXJzLmVycikge1xuICAgICAgICB2YWx1ZSA9IHNlcmlhbGl6ZXJzLmVycih2YWx1ZSlcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3RyaW5naWZpZXIgPSBzdHJpbmdpZmllcnNba2V5XSB8fCB3aWxkY2FyZFN0cmluZ2lmaWVyXG5cbiAgICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgIC8qIGVzbGludCBuby1mYWxsdGhyb3VnaDogXCJvZmZcIiAqL1xuICAgICAgICAgIGlmIChOdW1iZXIuaXNGaW5pdGUodmFsdWUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdmFsdWUgPSBudWxsXG4gICAgICAgICAgfVxuICAgICAgICAvLyB0aGlzIGNhc2UgZXhwbGljaXRseSBmYWxscyB0aHJvdWdoIHRvIHRoZSBuZXh0IG9uZVxuICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICBpZiAoc3RyaW5naWZpZXIpIHZhbHVlID0gc3RyaW5naWZpZXIodmFsdWUpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICB2YWx1ZSA9IChzdHJpbmdpZmllciB8fCBhc1N0cmluZykodmFsdWUpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB2YWx1ZSA9IChzdHJpbmdpZmllciB8fCBzdHJpbmdpZnkpKHZhbHVlLCBzdHJpbmdpZnlTYWZlKVxuICAgICAgfVxuICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIGNvbnRpbnVlXG4gICAgICBjb25zdCBzdHJLZXkgPSBhc1N0cmluZyhrZXkpXG4gICAgICBwcm9wU3RyICs9ICcsJyArIHN0cktleSArICc6JyArIHZhbHVlXG4gICAgfVxuICB9XG5cbiAgbGV0IG1zZ1N0ciA9ICcnXG4gIGlmIChtc2cgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhbHVlID0gc2VyaWFsaXplcnNbbWVzc2FnZUtleV0gPyBzZXJpYWxpemVyc1ttZXNzYWdlS2V5XShtc2cpIDogbXNnXG4gICAgY29uc3Qgc3RyaW5naWZpZXIgPSBzdHJpbmdpZmllcnNbbWVzc2FnZUtleV0gfHwgd2lsZGNhcmRTdHJpbmdpZmllclxuXG4gICAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIC8qIGVzbGludCBuby1mYWxsdGhyb3VnaDogXCJvZmZcIiAqL1xuICAgICAgICBpZiAoTnVtYmVyLmlzRmluaXRlKHZhbHVlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICB2YWx1ZSA9IG51bGxcbiAgICAgICAgfVxuICAgICAgLy8gdGhpcyBjYXNlIGV4cGxpY2l0bHkgZmFsbHMgdGhyb3VnaCB0byB0aGUgbmV4dCBvbmVcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICBpZiAoc3RyaW5naWZpZXIpIHZhbHVlID0gc3RyaW5naWZpZXIodmFsdWUpXG4gICAgICAgIG1zZ1N0ciA9ICcsXCInICsgbWVzc2FnZUtleSArICdcIjonICsgdmFsdWVcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIHZhbHVlID0gKHN0cmluZ2lmaWVyIHx8IGFzU3RyaW5nKSh2YWx1ZSlcbiAgICAgICAgbXNnU3RyID0gJyxcIicgKyBtZXNzYWdlS2V5ICsgJ1wiOicgKyB2YWx1ZVxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFsdWUgPSAoc3RyaW5naWZpZXIgfHwgc3RyaW5naWZ5KSh2YWx1ZSwgc3RyaW5naWZ5U2FmZSlcbiAgICAgICAgbXNnU3RyID0gJyxcIicgKyBtZXNzYWdlS2V5ICsgJ1wiOicgKyB2YWx1ZVxuICAgIH1cbiAgfVxuXG4gIGlmICh0aGlzW25lc3RlZEtleVN5bV0gJiYgcHJvcFN0cikge1xuICAgIC8vIHBsYWNlIGFsbCB0aGUgb2JqIHByb3BlcnRpZXMgdW5kZXIgdGhlIHNwZWNpZmllZCBrZXlcbiAgICAvLyB0aGUgbmVzdGVkIGtleSBpcyBhbHJlYWR5IGZvcm1hdHRlZCBmcm9tIHRoZSBjb25zdHJ1Y3RvclxuICAgIHJldHVybiBkYXRhICsgdGhpc1tuZXN0ZWRLZXlTdHJTeW1dICsgcHJvcFN0ci5zbGljZSgxKSArICd9JyArIG1zZ1N0ciArIGVuZFxuICB9IGVsc2Uge1xuICAgIHJldHVybiBkYXRhICsgcHJvcFN0ciArIG1zZ1N0ciArIGVuZFxuICB9XG59XG5cbmZ1bmN0aW9uIGFzQ2hpbmRpbmdzIChpbnN0YW5jZSwgYmluZGluZ3MpIHtcbiAgbGV0IHZhbHVlXG4gIGxldCBkYXRhID0gaW5zdGFuY2VbY2hpbmRpbmdzU3ltXVxuICBjb25zdCBzdHJpbmdpZnkgPSBpbnN0YW5jZVtzdHJpbmdpZnlTeW1dXG4gIGNvbnN0IHN0cmluZ2lmeVNhZmUgPSBpbnN0YW5jZVtzdHJpbmdpZnlTYWZlU3ltXVxuICBjb25zdCBzdHJpbmdpZmllcnMgPSBpbnN0YW5jZVtzdHJpbmdpZmllcnNTeW1dXG4gIGNvbnN0IHdpbGRjYXJkU3RyaW5naWZpZXIgPSBzdHJpbmdpZmllcnNbd2lsZGNhcmRGaXJzdFN5bV1cbiAgY29uc3Qgc2VyaWFsaXplcnMgPSBpbnN0YW5jZVtzZXJpYWxpemVyc1N5bV1cbiAgY29uc3QgZm9ybWF0dGVyID0gaW5zdGFuY2VbZm9ybWF0dGVyc1N5bV0uYmluZGluZ3NcbiAgYmluZGluZ3MgPSBmb3JtYXR0ZXIoYmluZGluZ3MpXG5cbiAgZm9yIChjb25zdCBrZXkgaW4gYmluZGluZ3MpIHtcbiAgICB2YWx1ZSA9IGJpbmRpbmdzW2tleV1cbiAgICBjb25zdCB2YWxpZCA9IChrZXkubGVuZ3RoIDwgNSB8fCAoa2V5ICE9PSAnbGV2ZWwnICYmXG4gICAgICBrZXkgIT09ICdzZXJpYWxpemVycycgJiZcbiAgICAgIGtleSAhPT0gJ2Zvcm1hdHRlcnMnICYmXG4gICAgICBrZXkgIT09ICdjdXN0b21MZXZlbHMnKSkgJiZcbiAgICAgIGJpbmRpbmdzLmhhc093blByb3BlcnR5KGtleSkgJiZcbiAgICAgIHZhbHVlICE9PSB1bmRlZmluZWRcbiAgICBpZiAodmFsaWQgPT09IHRydWUpIHtcbiAgICAgIHZhbHVlID0gc2VyaWFsaXplcnNba2V5XSA/IHNlcmlhbGl6ZXJzW2tleV0odmFsdWUpIDogdmFsdWVcbiAgICAgIHZhbHVlID0gKHN0cmluZ2lmaWVyc1trZXldIHx8IHdpbGRjYXJkU3RyaW5naWZpZXIgfHwgc3RyaW5naWZ5KSh2YWx1ZSwgc3RyaW5naWZ5U2FmZSlcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSBjb250aW51ZVxuICAgICAgZGF0YSArPSAnLFwiJyArIGtleSArICdcIjonICsgdmFsdWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRhdGFcbn1cblxuZnVuY3Rpb24gaGFzQmVlblRhbXBlcmVkIChzdHJlYW0pIHtcbiAgcmV0dXJuIHN0cmVhbS53cml0ZSAhPT0gc3RyZWFtLmNvbnN0cnVjdG9yLnByb3RvdHlwZS53cml0ZVxufVxuXG5mdW5jdGlvbiBidWlsZFNhZmVTb25pY0Jvb20gKG9wdHMpIHtcbiAgY29uc3Qgc3RyZWFtID0gbmV3IFNvbmljQm9vbShvcHRzKVxuICBzdHJlYW0ub24oJ2Vycm9yJywgZmlsdGVyQnJva2VuUGlwZSlcbiAgLy8gSWYgd2UgYXJlIHN5bmM6IGZhbHNlLCB3ZSBtdXN0IGZsdXNoIG9uIGV4aXRcbiAgaWYgKCFvcHRzLnN5bmMgJiYgaXNNYWluVGhyZWFkKSB7XG4gICAgb25FeGl0LnJlZ2lzdGVyKHN0cmVhbSwgYXV0b0VuZClcblxuICAgIHN0cmVhbS5vbignY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBvbkV4aXQudW5yZWdpc3RlcihzdHJlYW0pXG4gICAgfSlcbiAgfVxuICByZXR1cm4gc3RyZWFtXG5cbiAgZnVuY3Rpb24gZmlsdGVyQnJva2VuUGlwZSAoZXJyKSB7XG4gICAgLy8gSW1wb3NzaWJsZSB0byByZXBsaWNhdGUgYWNyb3NzIGFsbCBvcGVyYXRpbmcgc3lzdGVtc1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKGVyci5jb2RlID09PSAnRVBJUEUnKSB7XG4gICAgICAvLyBJZiB3ZSBnZXQgRVBJUEUsIHdlIHNob3VsZCBzdG9wIGxvZ2dpbmcgaGVyZVxuICAgICAgLy8gaG93ZXZlciB3ZSBoYXZlIG5vIGNvbnRyb2wgdG8gdGhlIGNvbnN1bWVyIG9mXG4gICAgICAvLyBTb25pY0Jvb20sIHNvIHdlIGp1c3Qgb3ZlcndyaXRlIHRoZSB3cml0ZSBtZXRob2RcbiAgICAgIHN0cmVhbS53cml0ZSA9IG5vb3BcbiAgICAgIHN0cmVhbS5lbmQgPSBub29wXG4gICAgICBzdHJlYW0uZmx1c2hTeW5jID0gbm9vcFxuICAgICAgc3RyZWFtLmRlc3Ryb3kgPSBub29wXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgc3RyZWFtLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGZpbHRlckJyb2tlblBpcGUpXG4gICAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXJyKVxuICB9XG59XG5cbmZ1bmN0aW9uIGF1dG9FbmQgKHN0cmVhbSwgZXZlbnROYW1lKSB7XG4gIC8vIFRoaXMgY2hlY2sgaXMgbmVlZGVkIG9ubHkgb24gc29tZSBwbGF0Zm9ybXNcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKHN0cmVhbS5kZXN0cm95ZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChldmVudE5hbWUgPT09ICdiZWZvcmVFeGl0Jykge1xuICAgIC8vIFdlIHN0aWxsIGhhdmUgYW4gZXZlbnQgbG9vcCwgbGV0J3MgdXNlIGl0XG4gICAgc3RyZWFtLmZsdXNoKClcbiAgICBzdHJlYW0ub24oJ2RyYWluJywgZnVuY3Rpb24gKCkge1xuICAgICAgc3RyZWFtLmVuZCgpXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICAvLyBGb3Igc29tZSByZWFzb24gaXN0YW5idWwgaXMgbm90IGRldGVjdGluZyB0aGlzLCBidXQgaXQncyB0aGVyZVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLy8gV2UgZG8gbm90IGhhdmUgYW4gZXZlbnQgbG9vcCwgc28gZmx1c2ggc3luY2hyb25vdXNseVxuICAgIHN0cmVhbS5mbHVzaFN5bmMoKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUFyZ3NOb3JtYWxpemVyIChkZWZhdWx0T3B0aW9ucykge1xuICByZXR1cm4gZnVuY3Rpb24gbm9ybWFsaXplQXJncyAoaW5zdGFuY2UsIGNhbGxlciwgb3B0cyA9IHt9LCBzdHJlYW0pIHtcbiAgICAvLyBzdXBwb3J0IHN0cmVhbSBhcyBhIHN0cmluZ1xuICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHN0cmVhbSA9IGJ1aWxkU2FmZVNvbmljQm9vbSh7IGRlc3Q6IG9wdHMgfSlcbiAgICAgIG9wdHMgPSB7fVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHN0cmVhbSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChvcHRzICYmIG9wdHMudHJhbnNwb3J0KSB7XG4gICAgICAgIHRocm93IEVycm9yKCdvbmx5IG9uZSBvZiBvcHRpb24udHJhbnNwb3J0IG9yIHN0cmVhbSBjYW4gYmUgc3BlY2lmaWVkJylcbiAgICAgIH1cbiAgICAgIHN0cmVhbSA9IGJ1aWxkU2FmZVNvbmljQm9vbSh7IGRlc3Q6IHN0cmVhbSB9KVxuICAgIH0gZWxzZSBpZiAob3B0cyBpbnN0YW5jZW9mIFNvbmljQm9vbSB8fCBvcHRzLndyaXRhYmxlIHx8IG9wdHMuX3dyaXRhYmxlU3RhdGUpIHtcbiAgICAgIHN0cmVhbSA9IG9wdHNcbiAgICAgIG9wdHMgPSB7fVxuICAgIH0gZWxzZSBpZiAob3B0cy50cmFuc3BvcnQpIHtcbiAgICAgIGlmIChvcHRzLnRyYW5zcG9ydCBpbnN0YW5jZW9mIFNvbmljQm9vbSB8fCBvcHRzLnRyYW5zcG9ydC53cml0YWJsZSB8fCBvcHRzLnRyYW5zcG9ydC5fd3JpdGFibGVTdGF0ZSkge1xuICAgICAgICB0aHJvdyBFcnJvcignb3B0aW9uLnRyYW5zcG9ydCBkbyBub3QgYWxsb3cgc3RyZWFtLCBwbGVhc2UgcGFzcyB0byBvcHRpb24gZGlyZWN0bHkuIGUuZy4gcGlubyh0cmFuc3BvcnQpJylcbiAgICAgIH1cbiAgICAgIGlmIChvcHRzLnRyYW5zcG9ydC50YXJnZXRzICYmIG9wdHMudHJhbnNwb3J0LnRhcmdldHMubGVuZ3RoICYmIG9wdHMuZm9ybWF0dGVycyAmJiB0eXBlb2Ygb3B0cy5mb3JtYXR0ZXJzLmxldmVsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdvcHRpb24udHJhbnNwb3J0LnRhcmdldHMgZG8gbm90IGFsbG93IGN1c3RvbSBsZXZlbCBmb3JtYXR0ZXJzJylcbiAgICAgIH1cblxuICAgICAgbGV0IGN1c3RvbUxldmVsc1xuICAgICAgaWYgKG9wdHMuY3VzdG9tTGV2ZWxzKSB7XG4gICAgICAgIGN1c3RvbUxldmVscyA9IG9wdHMudXNlT25seUN1c3RvbUxldmVscyA/IG9wdHMuY3VzdG9tTGV2ZWxzIDogT2JqZWN0LmFzc2lnbih7fSwgb3B0cy5sZXZlbHMsIG9wdHMuY3VzdG9tTGV2ZWxzKVxuICAgICAgfVxuICAgICAgc3RyZWFtID0gdHJhbnNwb3J0KHsgY2FsbGVyLCAuLi5vcHRzLnRyYW5zcG9ydCwgbGV2ZWxzOiBjdXN0b21MZXZlbHMgfSlcbiAgICB9XG4gICAgb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBvcHRzKVxuICAgIG9wdHMuc2VyaWFsaXplcnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucy5zZXJpYWxpemVycywgb3B0cy5zZXJpYWxpemVycylcbiAgICBvcHRzLmZvcm1hdHRlcnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucy5mb3JtYXR0ZXJzLCBvcHRzLmZvcm1hdHRlcnMpXG5cbiAgICBpZiAob3B0cy5wcmV0dHlQcmludCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdwcmV0dHlQcmludCBvcHRpb24gaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCwgc2VlIHRoZSBwaW5vLXByZXR0eSBwYWNrYWdlIChodHRwczovL2dpdGh1Yi5jb20vcGlub2pzL3Bpbm8tcHJldHR5KScpXG4gICAgfVxuXG4gICAgY29uc3QgeyBlbmFibGVkLCBvbkNoaWxkIH0gPSBvcHRzXG4gICAgaWYgKGVuYWJsZWQgPT09IGZhbHNlKSBvcHRzLmxldmVsID0gJ3NpbGVudCdcbiAgICBpZiAoIW9uQ2hpbGQpIG9wdHMub25DaGlsZCA9IG5vb3BcbiAgICBpZiAoIXN0cmVhbSkge1xuICAgICAgaWYgKCFoYXNCZWVuVGFtcGVyZWQocHJvY2Vzcy5zdGRvdXQpKSB7XG4gICAgICAgIC8vIElmIHByb2Nlc3Muc3Rkb3V0LmZkIGlzIHVuZGVmaW5lZCwgaXQgbWVhbnMgdGhhdCB3ZSBhcmUgcnVubmluZ1xuICAgICAgICAvLyBpbiBhIHdvcmtlciB0aHJlYWQuIExldCdzIGFzc3VtZSB3ZSBhcmUgbG9nZ2luZyB0byBmaWxlIGRlc2NyaXB0b3IgMS5cbiAgICAgICAgc3RyZWFtID0gYnVpbGRTYWZlU29uaWNCb29tKHsgZmQ6IHByb2Nlc3Muc3Rkb3V0LmZkIHx8IDEgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0cmVhbSA9IHByb2Nlc3Muc3Rkb3V0XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IG9wdHMsIHN0cmVhbSB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5IChvYmosIHN0cmluZ2lmeVNhZmVGbikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopXG4gIH0gY2F0Y2ggKF8pIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3RyaW5naWZ5ID0gc3RyaW5naWZ5U2FmZUZuIHx8IHRoaXNbc3RyaW5naWZ5U2FmZVN5bV1cbiAgICAgIHJldHVybiBzdHJpbmdpZnkob2JqKVxuICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgIHJldHVybiAnXCJbdW5hYmxlIHRvIHNlcmlhbGl6ZSwgY2lyY3VsYXIgcmVmZXJlbmNlIGlzIHRvbyBjb21wbGV4IHRvIGFuYWx5emVdXCInXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRm9ybWF0dGVycyAobGV2ZWwsIGJpbmRpbmdzLCBsb2cpIHtcbiAgcmV0dXJuIHtcbiAgICBsZXZlbCxcbiAgICBiaW5kaW5ncyxcbiAgICBsb2dcbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnQgYSBzdHJpbmcgaW50ZWdlciBmaWxlIGRlc2NyaXB0b3IgdG8gYSBwcm9wZXIgbmF0aXZlIGludGVnZXJcbiAqIGZpbGUgZGVzY3JpcHRvci5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZGVzdGluYXRpb24gVGhlIGZpbGUgZGVzY3JpcHRvciBzdHJpbmcgdG8gYXR0ZW1wdCB0byBjb252ZXJ0LlxuICpcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZURlc3RGaWxlRGVzY3JpcHRvciAoZGVzdGluYXRpb24pIHtcbiAgY29uc3QgZmQgPSBOdW1iZXIoZGVzdGluYXRpb24pXG4gIGlmICh0eXBlb2YgZGVzdGluYXRpb24gPT09ICdzdHJpbmcnICYmIE51bWJlci5pc0Zpbml0ZShmZCkpIHtcbiAgICByZXR1cm4gZmRcbiAgfVxuICAvLyBkZXN0aW5hdGlvbiBjb3VsZCBiZSB1bmRlZmluZWQgaWYgd2UgYXJlIGluIGEgd29ya2VyXG4gIGlmIChkZXN0aW5hdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gVGhpcyBpcyBzdGRvdXQgaW4gVU5JWCBzeXN0ZW1zXG4gICAgcmV0dXJuIDFcbiAgfVxuICByZXR1cm4gZGVzdGluYXRpb25cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG5vb3AsXG4gIGJ1aWxkU2FmZVNvbmljQm9vbSxcbiAgYXNDaGluZGluZ3MsXG4gIGFzSnNvbixcbiAgZ2VuTG9nLFxuICBjcmVhdGVBcmdzTm9ybWFsaXplcixcbiAgc3RyaW5naWZ5LFxuICBidWlsZEZvcm1hdHRlcnMsXG4gIG5vcm1hbGl6ZURlc3RGaWxlRGVzY3JpcHRvclxufVxuIiwgIi8qKlxuICogUmVwcmVzZW50cyBkZWZhdWx0IGxvZyBsZXZlbCB2YWx1ZXNcbiAqXG4gKiBAZW51bSB7bnVtYmVyfVxuICovXG5jb25zdCBERUZBVUxUX0xFVkVMUyA9IHtcbiAgdHJhY2U6IDEwLFxuICBkZWJ1ZzogMjAsXG4gIGluZm86IDMwLFxuICB3YXJuOiA0MCxcbiAgZXJyb3I6IDUwLFxuICBmYXRhbDogNjBcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHNvcnQgb3JkZXIgZGlyZWN0aW9uOiBgYXNjZW5kaW5nYCBvciBgZGVzY2VuZGluZ2BcbiAqXG4gKiBAZW51bSB7c3RyaW5nfVxuICovXG5jb25zdCBTT1JUSU5HX09SREVSID0ge1xuICBBU0M6ICdBU0MnLFxuICBERVNDOiAnREVTQydcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIERFRkFVTFRfTEVWRUxTLFxuICBTT1JUSU5HX09SREVSXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG4vKiBlc2xpbnQgbm8tcHJvdG90eXBlLWJ1aWx0aW5zOiAwICovXG5jb25zdCB7XG4gIGxzQ2FjaGVTeW0sXG4gIGxldmVsVmFsU3ltLFxuICB1c2VPbmx5Q3VzdG9tTGV2ZWxzU3ltLFxuICBzdHJlYW1TeW0sXG4gIGZvcm1hdHRlcnNTeW0sXG4gIGhvb2tzU3ltLFxuICBsZXZlbENvbXBTeW1cbn0gPSByZXF1aXJlKCcuL3N5bWJvbHMnKVxuY29uc3QgeyBub29wLCBnZW5Mb2cgfSA9IHJlcXVpcmUoJy4vdG9vbHMnKVxuY29uc3QgeyBERUZBVUxUX0xFVkVMUywgU09SVElOR19PUkRFUiB9ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKVxuXG5jb25zdCBsZXZlbE1ldGhvZHMgPSB7XG4gIGZhdGFsOiAoaG9vaykgPT4ge1xuICAgIGNvbnN0IGxvZ0ZhdGFsID0gZ2VuTG9nKERFRkFVTFRfTEVWRUxTLmZhdGFsLCBob29rKVxuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgY29uc3Qgc3RyZWFtID0gdGhpc1tzdHJlYW1TeW1dXG4gICAgICBsb2dGYXRhbC5jYWxsKHRoaXMsIC4uLmFyZ3MpXG4gICAgICBpZiAodHlwZW9mIHN0cmVhbS5mbHVzaFN5bmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzdHJlYW0uZmx1c2hTeW5jKClcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9waW5vanMvcGluby9wdWxsLzc0MCNkaXNjdXNzaW9uX3IzNDY3ODgzMTNcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgZXJyb3I6IChob29rKSA9PiBnZW5Mb2coREVGQVVMVF9MRVZFTFMuZXJyb3IsIGhvb2spLFxuICB3YXJuOiAoaG9vaykgPT4gZ2VuTG9nKERFRkFVTFRfTEVWRUxTLndhcm4sIGhvb2spLFxuICBpbmZvOiAoaG9vaykgPT4gZ2VuTG9nKERFRkFVTFRfTEVWRUxTLmluZm8sIGhvb2spLFxuICBkZWJ1ZzogKGhvb2spID0+IGdlbkxvZyhERUZBVUxUX0xFVkVMUy5kZWJ1ZywgaG9vayksXG4gIHRyYWNlOiAoaG9vaykgPT4gZ2VuTG9nKERFRkFVTFRfTEVWRUxTLnRyYWNlLCBob29rKVxufVxuXG5jb25zdCBudW1zID0gT2JqZWN0LmtleXMoREVGQVVMVF9MRVZFTFMpLnJlZHVjZSgobywgaykgPT4ge1xuICBvW0RFRkFVTFRfTEVWRUxTW2tdXSA9IGtcbiAgcmV0dXJuIG9cbn0sIHt9KVxuXG5jb25zdCBpbml0aWFsTHNDYWNoZSA9IE9iamVjdC5rZXlzKG51bXMpLnJlZHVjZSgobywgaykgPT4ge1xuICBvW2tdID0gJ3tcImxldmVsXCI6JyArIE51bWJlcihrKVxuICByZXR1cm4gb1xufSwge30pXG5cbmZ1bmN0aW9uIGdlbkxzQ2FjaGUgKGluc3RhbmNlKSB7XG4gIGNvbnN0IGZvcm1hdHRlciA9IGluc3RhbmNlW2Zvcm1hdHRlcnNTeW1dLmxldmVsXG4gIGNvbnN0IHsgbGFiZWxzIH0gPSBpbnN0YW5jZS5sZXZlbHNcbiAgY29uc3QgY2FjaGUgPSB7fVxuICBmb3IgKGNvbnN0IGxhYmVsIGluIGxhYmVscykge1xuICAgIGNvbnN0IGxldmVsID0gZm9ybWF0dGVyKGxhYmVsc1tsYWJlbF0sIE51bWJlcihsYWJlbCkpXG4gICAgY2FjaGVbbGFiZWxdID0gSlNPTi5zdHJpbmdpZnkobGV2ZWwpLnNsaWNlKDAsIC0xKVxuICB9XG4gIGluc3RhbmNlW2xzQ2FjaGVTeW1dID0gY2FjaGVcbiAgcmV0dXJuIGluc3RhbmNlXG59XG5cbmZ1bmN0aW9uIGlzU3RhbmRhcmRMZXZlbCAobGV2ZWwsIHVzZU9ubHlDdXN0b21MZXZlbHMpIHtcbiAgaWYgKHVzZU9ubHlDdXN0b21MZXZlbHMpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHN3aXRjaCAobGV2ZWwpIHtcbiAgICBjYXNlICdmYXRhbCc6XG4gICAgY2FzZSAnZXJyb3InOlxuICAgIGNhc2UgJ3dhcm4nOlxuICAgIGNhc2UgJ2luZm8nOlxuICAgIGNhc2UgJ2RlYnVnJzpcbiAgICBjYXNlICd0cmFjZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRMZXZlbCAobGV2ZWwpIHtcbiAgY29uc3QgeyBsYWJlbHMsIHZhbHVlcyB9ID0gdGhpcy5sZXZlbHNcbiAgaWYgKHR5cGVvZiBsZXZlbCA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAobGFiZWxzW2xldmVsXSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcigndW5rbm93biBsZXZlbCB2YWx1ZScgKyBsZXZlbClcbiAgICBsZXZlbCA9IGxhYmVsc1tsZXZlbF1cbiAgfVxuICBpZiAodmFsdWVzW2xldmVsXSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcigndW5rbm93biBsZXZlbCAnICsgbGV2ZWwpXG4gIGNvbnN0IHByZUxldmVsVmFsID0gdGhpc1tsZXZlbFZhbFN5bV1cbiAgY29uc3QgbGV2ZWxWYWwgPSB0aGlzW2xldmVsVmFsU3ltXSA9IHZhbHVlc1tsZXZlbF1cbiAgY29uc3QgdXNlT25seUN1c3RvbUxldmVsc1ZhbCA9IHRoaXNbdXNlT25seUN1c3RvbUxldmVsc1N5bV1cbiAgY29uc3QgbGV2ZWxDb21wYXJpc29uID0gdGhpc1tsZXZlbENvbXBTeW1dXG4gIGNvbnN0IGhvb2sgPSB0aGlzW2hvb2tzU3ltXS5sb2dNZXRob2RcblxuICBmb3IgKGNvbnN0IGtleSBpbiB2YWx1ZXMpIHtcbiAgICBpZiAobGV2ZWxDb21wYXJpc29uKHZhbHVlc1trZXldLCBsZXZlbFZhbCkgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzW2tleV0gPSBub29wXG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICB0aGlzW2tleV0gPSBpc1N0YW5kYXJkTGV2ZWwoa2V5LCB1c2VPbmx5Q3VzdG9tTGV2ZWxzVmFsKSA/IGxldmVsTWV0aG9kc1trZXldKGhvb2spIDogZ2VuTG9nKHZhbHVlc1trZXldLCBob29rKVxuICB9XG5cbiAgdGhpcy5lbWl0KFxuICAgICdsZXZlbC1jaGFuZ2UnLFxuICAgIGxldmVsLFxuICAgIGxldmVsVmFsLFxuICAgIGxhYmVsc1twcmVMZXZlbFZhbF0sXG4gICAgcHJlTGV2ZWxWYWwsXG4gICAgdGhpc1xuICApXG59XG5cbmZ1bmN0aW9uIGdldExldmVsIChsZXZlbCkge1xuICBjb25zdCB7IGxldmVscywgbGV2ZWxWYWwgfSA9IHRoaXNcbiAgLy8gcHJvdGVjdGlvbiBhZ2FpbnN0IHBvdGVudGlhbCBsb3NzIG9mIFBpbm8gc2NvcGUgZnJvbSBzZXJpYWxpemVycyAoZWRnZSBjYXNlIHdpdGggY2lyY3VsYXIgcmVmcyAtIGh0dHBzOi8vZ2l0aHViLmNvbS9waW5vanMvcGluby9pc3N1ZXMvODMzKVxuICByZXR1cm4gKGxldmVscyAmJiBsZXZlbHMubGFiZWxzKSA/IGxldmVscy5sYWJlbHNbbGV2ZWxWYWxdIDogJydcbn1cblxuZnVuY3Rpb24gaXNMZXZlbEVuYWJsZWQgKGxvZ0xldmVsKSB7XG4gIGNvbnN0IHsgdmFsdWVzIH0gPSB0aGlzLmxldmVsc1xuICBjb25zdCBsb2dMZXZlbFZhbCA9IHZhbHVlc1tsb2dMZXZlbF1cbiAgcmV0dXJuIGxvZ0xldmVsVmFsICE9PSB1bmRlZmluZWQgJiYgdGhpc1tsZXZlbENvbXBTeW1dKGxvZ0xldmVsVmFsLCB0aGlzW2xldmVsVmFsU3ltXSlcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgdGhlIGdpdmVuIGBjdXJyZW50YCBsZXZlbCBpcyBlbmFibGVkIGJ5IGNvbXBhcmluZyBpdFxuICogYWdhaW5zdCB0aGUgY3VycmVudCB0aHJlc2hvbGQgKGBleHBlY3RlZGApLlxuICpcbiAqIEBwYXJhbSB7U09SVElOR19PUkRFUn0gZGlyZWN0aW9uIGNvbXBhcmlzb24gZGlyZWN0aW9uIFwiQVNDXCIgb3IgXCJERVNDXCJcbiAqIEBwYXJhbSB7bnVtYmVyfSBjdXJyZW50IGN1cnJlbnQgbG9nIGxldmVsIG51bWJlciByZXByZXNlbnRhdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IGV4cGVjdGVkIHRocmVzaG9sZCB2YWx1ZSB0byBjb21wYXJlIHdpdGhcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBjb21wYXJlTGV2ZWwgKGRpcmVjdGlvbiwgY3VycmVudCwgZXhwZWN0ZWQpIHtcbiAgaWYgKGRpcmVjdGlvbiA9PT0gU09SVElOR19PUkRFUi5ERVNDKSB7XG4gICAgcmV0dXJuIGN1cnJlbnQgPD0gZXhwZWN0ZWRcbiAgfVxuXG4gIHJldHVybiBjdXJyZW50ID49IGV4cGVjdGVkXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgbGV2ZWwgY29tcGFyaXNvbiBmdW5jdGlvbiBiYXNlZCBvbiBgbGV2ZWxDb21wYXJpc29uYFxuICogaXQgY291bGQgYSBkZWZhdWx0IGZ1bmN0aW9uIHdoaWNoIGNvbXBhcmVzIGxldmVscyBlaXRoZXIgaW4gXCJhc2NlbmRpbmdcIiBvciBcImRlc2NlbmRpbmdcIiBvcmRlciBvciBjdXN0b20gY29tcGFyaXNvbiBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7U09SVElOR19PUkRFUiB8IEZ1bmN0aW9ufSBsZXZlbENvbXBhcmlzb24gc29ydCBsZXZlbHMgb3JkZXIgZGlyZWN0aW9uIG9yIGN1c3RvbSBjb21wYXJpc29uIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyBGdW5jdGlvblxuICovXG5mdW5jdGlvbiBnZW5MZXZlbENvbXBhcmlzb24gKGxldmVsQ29tcGFyaXNvbikge1xuICBpZiAodHlwZW9mIGxldmVsQ29tcGFyaXNvbiA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gY29tcGFyZUxldmVsLmJpbmQobnVsbCwgbGV2ZWxDb21wYXJpc29uKVxuICB9XG5cbiAgcmV0dXJuIGxldmVsQ29tcGFyaXNvblxufVxuXG5mdW5jdGlvbiBtYXBwaW5ncyAoY3VzdG9tTGV2ZWxzID0gbnVsbCwgdXNlT25seUN1c3RvbUxldmVscyA9IGZhbHNlKSB7XG4gIGNvbnN0IGN1c3RvbU51bXMgPSBjdXN0b21MZXZlbHNcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICAgID8gT2JqZWN0LmtleXMoY3VzdG9tTGV2ZWxzKS5yZWR1Y2UoKG8sIGspID0+IHtcbiAgICAgICAgb1tjdXN0b21MZXZlbHNba11dID0ga1xuICAgICAgICByZXR1cm4gb1xuICAgICAgfSwge30pXG4gICAgOiBudWxsXG4gICAgLyogZXNsaW50LWVuYWJsZSAqL1xuXG4gIGNvbnN0IGxhYmVscyA9IE9iamVjdC5hc3NpZ24oXG4gICAgT2JqZWN0LmNyZWF0ZShPYmplY3QucHJvdG90eXBlLCB7IEluZmluaXR5OiB7IHZhbHVlOiAnc2lsZW50JyB9IH0pLFxuICAgIHVzZU9ubHlDdXN0b21MZXZlbHMgPyBudWxsIDogbnVtcyxcbiAgICBjdXN0b21OdW1zXG4gIClcbiAgY29uc3QgdmFsdWVzID0gT2JqZWN0LmFzc2lnbihcbiAgICBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUsIHsgc2lsZW50OiB7IHZhbHVlOiBJbmZpbml0eSB9IH0pLFxuICAgIHVzZU9ubHlDdXN0b21MZXZlbHMgPyBudWxsIDogREVGQVVMVF9MRVZFTFMsXG4gICAgY3VzdG9tTGV2ZWxzXG4gIClcbiAgcmV0dXJuIHsgbGFiZWxzLCB2YWx1ZXMgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnREZWZhdWx0TGV2ZWxGb3VuZCAoZGVmYXVsdExldmVsLCBjdXN0b21MZXZlbHMsIHVzZU9ubHlDdXN0b21MZXZlbHMpIHtcbiAgaWYgKHR5cGVvZiBkZWZhdWx0TGV2ZWwgPT09ICdudW1iZXInKSB7XG4gICAgY29uc3QgdmFsdWVzID0gW10uY29uY2F0KFxuICAgICAgT2JqZWN0LmtleXMoY3VzdG9tTGV2ZWxzIHx8IHt9KS5tYXAoa2V5ID0+IGN1c3RvbUxldmVsc1trZXldKSxcbiAgICAgIHVzZU9ubHlDdXN0b21MZXZlbHMgPyBbXSA6IE9iamVjdC5rZXlzKG51bXMpLm1hcChsZXZlbCA9PiArbGV2ZWwpLFxuICAgICAgSW5maW5pdHlcbiAgICApXG4gICAgaWYgKCF2YWx1ZXMuaW5jbHVkZXMoZGVmYXVsdExldmVsKSkge1xuICAgICAgdGhyb3cgRXJyb3IoYGRlZmF1bHQgbGV2ZWw6JHtkZWZhdWx0TGV2ZWx9IG11c3QgYmUgaW5jbHVkZWQgaW4gY3VzdG9tIGxldmVsc2ApXG4gICAgfVxuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgbGFiZWxzID0gT2JqZWN0LmFzc2lnbihcbiAgICBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUsIHsgc2lsZW50OiB7IHZhbHVlOiBJbmZpbml0eSB9IH0pLFxuICAgIHVzZU9ubHlDdXN0b21MZXZlbHMgPyBudWxsIDogREVGQVVMVF9MRVZFTFMsXG4gICAgY3VzdG9tTGV2ZWxzXG4gIClcbiAgaWYgKCEoZGVmYXVsdExldmVsIGluIGxhYmVscykpIHtcbiAgICB0aHJvdyBFcnJvcihgZGVmYXVsdCBsZXZlbDoke2RlZmF1bHRMZXZlbH0gbXVzdCBiZSBpbmNsdWRlZCBpbiBjdXN0b20gbGV2ZWxzYClcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnROb0xldmVsQ29sbGlzaW9ucyAobGV2ZWxzLCBjdXN0b21MZXZlbHMpIHtcbiAgY29uc3QgeyBsYWJlbHMsIHZhbHVlcyB9ID0gbGV2ZWxzXG4gIGZvciAoY29uc3QgayBpbiBjdXN0b21MZXZlbHMpIHtcbiAgICBpZiAoayBpbiB2YWx1ZXMpIHtcbiAgICAgIHRocm93IEVycm9yKCdsZXZlbHMgY2Fubm90IGJlIG92ZXJyaWRkZW4nKVxuICAgIH1cbiAgICBpZiAoY3VzdG9tTGV2ZWxzW2tdIGluIGxhYmVscykge1xuICAgICAgdGhyb3cgRXJyb3IoJ3ByZS1leGlzdGluZyBsZXZlbCB2YWx1ZXMgY2Fubm90IGJlIHVzZWQgZm9yIG5ldyBsZXZlbHMnKVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFZhbGlkYXRlcyB3aGV0aGVyIGBsZXZlbENvbXBhcmlzb25gIGlzIGNvcnJlY3RcbiAqXG4gKiBAdGhyb3dzIEVycm9yXG4gKiBAcGFyYW0ge1NPUlRJTkdfT1JERVIgfCBGdW5jdGlvbn0gbGV2ZWxDb21wYXJpc29uIC0gdmFsdWUgdG8gdmFsaWRhdGVcbiAqIEByZXR1cm5zXG4gKi9cbmZ1bmN0aW9uIGFzc2VydExldmVsQ29tcGFyaXNvbiAobGV2ZWxDb21wYXJpc29uKSB7XG4gIGlmICh0eXBlb2YgbGV2ZWxDb21wYXJpc29uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAodHlwZW9mIGxldmVsQ29tcGFyaXNvbiA9PT0gJ3N0cmluZycgJiYgT2JqZWN0LnZhbHVlcyhTT1JUSU5HX09SREVSKS5pbmNsdWRlcyhsZXZlbENvbXBhcmlzb24pKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ0xldmVscyBjb21wYXJpc29uIHNob3VsZCBiZSBvbmUgb2YgXCJBU0NcIiwgXCJERVNDXCIgb3IgXCJmdW5jdGlvblwiIHR5cGUnKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdGlhbExzQ2FjaGUsXG4gIGdlbkxzQ2FjaGUsXG4gIGxldmVsTWV0aG9kcyxcbiAgZ2V0TGV2ZWwsXG4gIHNldExldmVsLFxuICBpc0xldmVsRW5hYmxlZCxcbiAgbWFwcGluZ3MsXG4gIGFzc2VydE5vTGV2ZWxDb2xsaXNpb25zLFxuICBhc3NlcnREZWZhdWx0TGV2ZWxGb3VuZCxcbiAgZ2VuTGV2ZWxDb21wYXJpc29uLFxuICBhc3NlcnRMZXZlbENvbXBhcmlzb25cbn1cbiIsICIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICc5LjE0LjAnIH1cbiIsICIndXNlIHN0cmljdCdcblxuLyogZXNsaW50IG5vLXByb3RvdHlwZS1idWlsdGluczogMCAqL1xuXG5jb25zdCB7IEV2ZW50RW1pdHRlciB9ID0gcmVxdWlyZSgnbm9kZTpldmVudHMnKVxuY29uc3Qge1xuICBsc0NhY2hlU3ltLFxuICBsZXZlbFZhbFN5bSxcbiAgc2V0TGV2ZWxTeW0sXG4gIGdldExldmVsU3ltLFxuICBjaGluZGluZ3NTeW0sXG4gIHBhcnNlZENoaW5kaW5nc1N5bSxcbiAgbWl4aW5TeW0sXG4gIGFzSnNvblN5bSxcbiAgd3JpdGVTeW0sXG4gIG1peGluTWVyZ2VTdHJhdGVneVN5bSxcbiAgdGltZVN5bSxcbiAgdGltZVNsaWNlSW5kZXhTeW0sXG4gIHN0cmVhbVN5bSxcbiAgc2VyaWFsaXplcnNTeW0sXG4gIGZvcm1hdHRlcnNTeW0sXG4gIGVycm9yS2V5U3ltLFxuICBtZXNzYWdlS2V5U3ltLFxuICB1c2VPbmx5Q3VzdG9tTGV2ZWxzU3ltLFxuICBuZWVkc01ldGFkYXRhR3N5bSxcbiAgcmVkYWN0Rm10U3ltLFxuICBzdHJpbmdpZnlTeW0sXG4gIGZvcm1hdE9wdHNTeW0sXG4gIHN0cmluZ2lmaWVyc1N5bSxcbiAgbXNnUHJlZml4U3ltLFxuICBob29rc1N5bVxufSA9IHJlcXVpcmUoJy4vc3ltYm9scycpXG5jb25zdCB7XG4gIGdldExldmVsLFxuICBzZXRMZXZlbCxcbiAgaXNMZXZlbEVuYWJsZWQsXG4gIG1hcHBpbmdzLFxuICBpbml0aWFsTHNDYWNoZSxcbiAgZ2VuTHNDYWNoZSxcbiAgYXNzZXJ0Tm9MZXZlbENvbGxpc2lvbnNcbn0gPSByZXF1aXJlKCcuL2xldmVscycpXG5jb25zdCB7XG4gIGFzQ2hpbmRpbmdzLFxuICBhc0pzb24sXG4gIGJ1aWxkRm9ybWF0dGVycyxcbiAgc3RyaW5naWZ5LFxuICBub29wXG59ID0gcmVxdWlyZSgnLi90b29scycpXG5jb25zdCB7XG4gIHZlcnNpb25cbn0gPSByZXF1aXJlKCcuL21ldGEnKVxuY29uc3QgcmVkYWN0aW9uID0gcmVxdWlyZSgnLi9yZWRhY3Rpb24nKVxuXG4vLyBub3RlOiB1c2Ugb2YgY2xhc3MgaXMgc2F0aXJpY2FsXG4vLyBodHRwczovL2dpdGh1Yi5jb20vcGlub2pzL3Bpbm8vcHVsbC80MzMjcHVsbHJlcXVlc3RyZXZpZXctMTI3NzAzMTI3XG5jb25zdCBjb25zdHJ1Y3RvciA9IGNsYXNzIFBpbm8ge31cbmNvbnN0IHByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3IsXG4gIGNoaWxkLFxuICBiaW5kaW5ncyxcbiAgc2V0QmluZGluZ3MsXG4gIGZsdXNoLFxuICBpc0xldmVsRW5hYmxlZCxcbiAgdmVyc2lvbixcbiAgZ2V0IGxldmVsICgpIHsgcmV0dXJuIHRoaXNbZ2V0TGV2ZWxTeW1dKCkgfSxcbiAgc2V0IGxldmVsIChsdmwpIHsgdGhpc1tzZXRMZXZlbFN5bV0obHZsKSB9LFxuICBnZXQgbGV2ZWxWYWwgKCkgeyByZXR1cm4gdGhpc1tsZXZlbFZhbFN5bV0gfSxcbiAgc2V0IGxldmVsVmFsIChuKSB7IHRocm93IEVycm9yKCdsZXZlbFZhbCBpcyByZWFkLW9ubHknKSB9LFxuICBnZXQgbXNnUHJlZml4ICgpIHsgcmV0dXJuIHRoaXNbbXNnUHJlZml4U3ltXSB9LFxuICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10gKCkgeyByZXR1cm4gJ1Bpbm8nIH0sXG4gIFtsc0NhY2hlU3ltXTogaW5pdGlhbExzQ2FjaGUsXG4gIFt3cml0ZVN5bV06IHdyaXRlLFxuICBbYXNKc29uU3ltXTogYXNKc29uLFxuICBbZ2V0TGV2ZWxTeW1dOiBnZXRMZXZlbCxcbiAgW3NldExldmVsU3ltXTogc2V0TGV2ZWxcbn1cblxuT2JqZWN0LnNldFByb3RvdHlwZU9mKHByb3RvdHlwZSwgRXZlbnRFbWl0dGVyLnByb3RvdHlwZSlcblxuLy8gZXhwb3J0aW5nIGFuZCBjb25zdW1pbmcgdGhlIHByb3RvdHlwZSBvYmplY3QgdXNpbmcgZmFjdG9yeSBwYXR0ZXJuIGZpeGVzIHNjb3BpbmcgaXNzdWVzIHdpdGggZ2V0dGVycyB3aGVuIHNlcmlhbGl6aW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5jcmVhdGUocHJvdG90eXBlKVxufVxuXG5jb25zdCByZXNldENoaWxkaW5nc0Zvcm1hdHRlciA9IGJpbmRpbmdzID0+IGJpbmRpbmdzXG5mdW5jdGlvbiBjaGlsZCAoYmluZGluZ3MsIG9wdGlvbnMpIHtcbiAgaWYgKCFiaW5kaW5ncykge1xuICAgIHRocm93IEVycm9yKCdtaXNzaW5nIGJpbmRpbmdzIGZvciBjaGlsZCBQaW5vJylcbiAgfVxuICBjb25zdCBzZXJpYWxpemVycyA9IHRoaXNbc2VyaWFsaXplcnNTeW1dXG4gIGNvbnN0IGZvcm1hdHRlcnMgPSB0aGlzW2Zvcm1hdHRlcnNTeW1dXG4gIGNvbnN0IGluc3RhbmNlID0gT2JqZWN0LmNyZWF0ZSh0aGlzKVxuXG4gIC8vIElmIGFuIGBvcHRpb25zYCBvYmplY3Qgd2FzIG5vdCBzdXBwbGllZCwgd2UgY2FuIGltcHJvdmVcbiAgLy8gdGhlIHBlcmZvcm1hbmNlIG9mIGNoaWxkIGNyZWF0aW9uIGJ5IHNraXBwaW5nXG4gIC8vIHRoZSBjaGVja3MgZm9yIHNldCBvcHRpb25zIGFuZCBzaW1wbHkgcmV0dXJuXG4gIC8vIGEgYmFzZWxpbmUgaW5zdGFuY2UuXG4gIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICBpZiAoaW5zdGFuY2VbZm9ybWF0dGVyc1N5bV0uYmluZGluZ3MgIT09IHJlc2V0Q2hpbGRpbmdzRm9ybWF0dGVyKSB7XG4gICAgICBpbnN0YW5jZVtmb3JtYXR0ZXJzU3ltXSA9IGJ1aWxkRm9ybWF0dGVycyhcbiAgICAgICAgZm9ybWF0dGVycy5sZXZlbCxcbiAgICAgICAgcmVzZXRDaGlsZGluZ3NGb3JtYXR0ZXIsXG4gICAgICAgIGZvcm1hdHRlcnMubG9nXG4gICAgICApXG4gICAgfVxuXG4gICAgaW5zdGFuY2VbY2hpbmRpbmdzU3ltXSA9IGFzQ2hpbmRpbmdzKGluc3RhbmNlLCBiaW5kaW5ncylcblxuICAgIC8vIEFsd2F5cyBjYWxsIHNldExldmVsIHRvIGVuc3VyZSBjaGlsZCBnZXRzIG93biBtZXRob2QgcmVmZXJlbmNlc1xuICAgIC8vIFRoaXMgcHJldmVudHMgaXNzdWVzIHdoZW4gcGFyZW50IG1ldGhvZHMgYXJlIHdyYXBwZWQgKGUuZy4sIGJ5IFNpbm9uKVxuICAgIGluc3RhbmNlW3NldExldmVsU3ltXSh0aGlzLmxldmVsKVxuXG4gICAgaWYgKHRoaXMub25DaGlsZCAhPT0gbm9vcCkge1xuICAgICAgdGhpcy5vbkNoaWxkKGluc3RhbmNlKVxuICAgIH1cblxuICAgIHJldHVybiBpbnN0YW5jZVxuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3NlcmlhbGl6ZXJzJykgPT09IHRydWUpIHtcbiAgICBpbnN0YW5jZVtzZXJpYWxpemVyc1N5bV0gPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgICBmb3IgKGNvbnN0IGsgaW4gc2VyaWFsaXplcnMpIHtcbiAgICAgIGluc3RhbmNlW3NlcmlhbGl6ZXJzU3ltXVtrXSA9IHNlcmlhbGl6ZXJzW2tdXG4gICAgfVxuICAgIGNvbnN0IHBhcmVudFN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNlcmlhbGl6ZXJzKVxuICAgIC8qIGVzbGludCBuby12YXI6IG9mZiAqL1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyZW50U3ltYm9scy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qga3MgPSBwYXJlbnRTeW1ib2xzW2ldXG4gICAgICBpbnN0YW5jZVtzZXJpYWxpemVyc1N5bV1ba3NdID0gc2VyaWFsaXplcnNba3NdXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBiayBpbiBvcHRpb25zLnNlcmlhbGl6ZXJzKSB7XG4gICAgICBpbnN0YW5jZVtzZXJpYWxpemVyc1N5bV1bYmtdID0gb3B0aW9ucy5zZXJpYWxpemVyc1tia11cbiAgICB9XG4gICAgY29uc3QgYmluZGluZ3NTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvcHRpb25zLnNlcmlhbGl6ZXJzKVxuICAgIGZvciAodmFyIGJpID0gMDsgYmkgPCBiaW5kaW5nc1N5bWJvbHMubGVuZ3RoOyBiaSsrKSB7XG4gICAgICBjb25zdCBia3MgPSBiaW5kaW5nc1N5bWJvbHNbYmldXG4gICAgICBpbnN0YW5jZVtzZXJpYWxpemVyc1N5bV1bYmtzXSA9IG9wdGlvbnMuc2VyaWFsaXplcnNbYmtzXVxuICAgIH1cbiAgfSBlbHNlIGluc3RhbmNlW3NlcmlhbGl6ZXJzU3ltXSA9IHNlcmlhbGl6ZXJzXG4gIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdmb3JtYXR0ZXJzJykpIHtcbiAgICBjb25zdCB7IGxldmVsLCBiaW5kaW5nczogY2hpbmRpbmdzLCBsb2cgfSA9IG9wdGlvbnMuZm9ybWF0dGVyc1xuICAgIGluc3RhbmNlW2Zvcm1hdHRlcnNTeW1dID0gYnVpbGRGb3JtYXR0ZXJzKFxuICAgICAgbGV2ZWwgfHwgZm9ybWF0dGVycy5sZXZlbCxcbiAgICAgIGNoaW5kaW5ncyB8fCByZXNldENoaWxkaW5nc0Zvcm1hdHRlcixcbiAgICAgIGxvZyB8fCBmb3JtYXR0ZXJzLmxvZ1xuICAgIClcbiAgfSBlbHNlIHtcbiAgICBpbnN0YW5jZVtmb3JtYXR0ZXJzU3ltXSA9IGJ1aWxkRm9ybWF0dGVycyhcbiAgICAgIGZvcm1hdHRlcnMubGV2ZWwsXG4gICAgICByZXNldENoaWxkaW5nc0Zvcm1hdHRlcixcbiAgICAgIGZvcm1hdHRlcnMubG9nXG4gICAgKVxuICB9XG4gIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdjdXN0b21MZXZlbHMnKSA9PT0gdHJ1ZSkge1xuICAgIGFzc2VydE5vTGV2ZWxDb2xsaXNpb25zKHRoaXMubGV2ZWxzLCBvcHRpb25zLmN1c3RvbUxldmVscylcbiAgICBpbnN0YW5jZS5sZXZlbHMgPSBtYXBwaW5ncyhvcHRpb25zLmN1c3RvbUxldmVscywgaW5zdGFuY2VbdXNlT25seUN1c3RvbUxldmVsc1N5bV0pXG4gICAgZ2VuTHNDYWNoZShpbnN0YW5jZSlcbiAgfVxuXG4gIC8vIHJlZGFjdCBtdXN0IHBsYWNlIGJlZm9yZSBhc0NoaW5kaW5ncyBhbmQgb25seSByZXBsYWNlIGlmIGV4aXN0XG4gIGlmICgodHlwZW9mIG9wdGlvbnMucmVkYWN0ID09PSAnb2JqZWN0JyAmJiBvcHRpb25zLnJlZGFjdCAhPT0gbnVsbCkgfHwgQXJyYXkuaXNBcnJheShvcHRpb25zLnJlZGFjdCkpIHtcbiAgICBpbnN0YW5jZS5yZWRhY3QgPSBvcHRpb25zLnJlZGFjdCAvLyByZXBsYWNlIHJlZGFjdCBkaXJlY3RseVxuICAgIGNvbnN0IHN0cmluZ2lmaWVycyA9IHJlZGFjdGlvbihpbnN0YW5jZS5yZWRhY3QsIHN0cmluZ2lmeSlcbiAgICBjb25zdCBmb3JtYXRPcHRzID0geyBzdHJpbmdpZnk6IHN0cmluZ2lmaWVyc1tyZWRhY3RGbXRTeW1dIH1cbiAgICBpbnN0YW5jZVtzdHJpbmdpZnlTeW1dID0gc3RyaW5naWZ5XG4gICAgaW5zdGFuY2Vbc3RyaW5naWZpZXJzU3ltXSA9IHN0cmluZ2lmaWVyc1xuICAgIGluc3RhbmNlW2Zvcm1hdE9wdHNTeW1dID0gZm9ybWF0T3B0c1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLm1zZ1ByZWZpeCA9PT0gJ3N0cmluZycpIHtcbiAgICBpbnN0YW5jZVttc2dQcmVmaXhTeW1dID0gKHRoaXNbbXNnUHJlZml4U3ltXSB8fCAnJykgKyBvcHRpb25zLm1zZ1ByZWZpeFxuICB9XG5cbiAgaW5zdGFuY2VbY2hpbmRpbmdzU3ltXSA9IGFzQ2hpbmRpbmdzKGluc3RhbmNlLCBiaW5kaW5ncylcbiAgY29uc3QgY2hpbGRMZXZlbCA9IG9wdGlvbnMubGV2ZWwgfHwgdGhpcy5sZXZlbFxuICBpbnN0YW5jZVtzZXRMZXZlbFN5bV0oY2hpbGRMZXZlbClcbiAgdGhpcy5vbkNoaWxkKGluc3RhbmNlKVxuICByZXR1cm4gaW5zdGFuY2Vcbn1cblxuZnVuY3Rpb24gYmluZGluZ3MgKCkge1xuICBjb25zdCBjaGluZGluZ3MgPSB0aGlzW2NoaW5kaW5nc1N5bV1cbiAgY29uc3QgY2hpbmRpbmdzSnNvbiA9IGB7JHtjaGluZGluZ3Muc3Vic3RyKDEpfX1gIC8vIGF0IGxlYXN0IGNvbnRhaW5zICxcInBpZFwiOjcwNjgsXCJob3N0bmFtZVwiOlwibXlNYWNcIlxuICBjb25zdCBiaW5kaW5nc0Zyb21Kc29uID0gSlNPTi5wYXJzZShjaGluZGluZ3NKc29uKVxuICBkZWxldGUgYmluZGluZ3NGcm9tSnNvbi5waWRcbiAgZGVsZXRlIGJpbmRpbmdzRnJvbUpzb24uaG9zdG5hbWVcbiAgcmV0dXJuIGJpbmRpbmdzRnJvbUpzb25cbn1cblxuZnVuY3Rpb24gc2V0QmluZGluZ3MgKG5ld0JpbmRpbmdzKSB7XG4gIGNvbnN0IGNoaW5kaW5ncyA9IGFzQ2hpbmRpbmdzKHRoaXMsIG5ld0JpbmRpbmdzKVxuICB0aGlzW2NoaW5kaW5nc1N5bV0gPSBjaGluZGluZ3NcbiAgZGVsZXRlIHRoaXNbcGFyc2VkQ2hpbmRpbmdzU3ltXVxufVxuXG4vKipcbiAqIERlZmF1bHQgc3RyYXRlZ3kgZm9yIGNyZWF0aW5nIGBtZXJnZU9iamVjdGAgZnJvbSBhcmd1bWVudHMgYW5kIHRoZSByZXN1bHQgZnJvbSBgbWl4aW4oKWAuXG4gKiBGaWVsZHMgZnJvbSBgbWVyZ2VPYmplY3RgIGhhdmUgaGlnaGVyIHByaW9yaXR5IGluIHRoaXMgc3RyYXRlZ3kuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG1lcmdlT2JqZWN0IFRoZSBvYmplY3QgYSB1c2VyIGhhcyBzdXBwbGllZCB0byB0aGUgbG9nZ2luZyBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBtaXhpbk9iamVjdCBUaGUgcmVzdWx0IG9mIHRoZSBgbWl4aW5gIG1ldGhvZC5cbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdE1peGluTWVyZ2VTdHJhdGVneSAobWVyZ2VPYmplY3QsIG1peGluT2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKG1peGluT2JqZWN0LCBtZXJnZU9iamVjdClcbn1cblxuZnVuY3Rpb24gd3JpdGUgKF9vYmosIG1zZywgbnVtKSB7XG4gIGNvbnN0IHQgPSB0aGlzW3RpbWVTeW1dKClcbiAgY29uc3QgbWl4aW4gPSB0aGlzW21peGluU3ltXVxuICBjb25zdCBlcnJvcktleSA9IHRoaXNbZXJyb3JLZXlTeW1dXG4gIGNvbnN0IG1lc3NhZ2VLZXkgPSB0aGlzW21lc3NhZ2VLZXlTeW1dXG4gIGNvbnN0IG1peGluTWVyZ2VTdHJhdGVneSA9IHRoaXNbbWl4aW5NZXJnZVN0cmF0ZWd5U3ltXSB8fCBkZWZhdWx0TWl4aW5NZXJnZVN0cmF0ZWd5XG4gIGxldCBvYmpcbiAgY29uc3Qgc3RyZWFtV3JpdGVIb29rID0gdGhpc1tob29rc1N5bV0uc3RyZWFtV3JpdGVcblxuICBpZiAoX29iaiA9PT0gdW5kZWZpbmVkIHx8IF9vYmogPT09IG51bGwpIHtcbiAgICBvYmogPSB7fVxuICB9IGVsc2UgaWYgKF9vYmogaW5zdGFuY2VvZiBFcnJvcikge1xuICAgIG9iaiA9IHsgW2Vycm9yS2V5XTogX29iaiB9XG4gICAgaWYgKG1zZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBtc2cgPSBfb2JqLm1lc3NhZ2VcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgb2JqID0gX29ialxuICAgIGlmIChtc2cgPT09IHVuZGVmaW5lZCAmJiBfb2JqW21lc3NhZ2VLZXldID09PSB1bmRlZmluZWQgJiYgX29ialtlcnJvcktleV0pIHtcbiAgICAgIG1zZyA9IF9vYmpbZXJyb3JLZXldLm1lc3NhZ2VcbiAgICB9XG4gIH1cblxuICBpZiAobWl4aW4pIHtcbiAgICBvYmogPSBtaXhpbk1lcmdlU3RyYXRlZ3kob2JqLCBtaXhpbihvYmosIG51bSwgdGhpcykpXG4gIH1cblxuICBjb25zdCBzID0gdGhpc1thc0pzb25TeW1dKG9iaiwgbXNnLCBudW0sIHQpXG5cbiAgY29uc3Qgc3RyZWFtID0gdGhpc1tzdHJlYW1TeW1dXG4gIGlmIChzdHJlYW1bbmVlZHNNZXRhZGF0YUdzeW1dID09PSB0cnVlKSB7XG4gICAgc3RyZWFtLmxhc3RMZXZlbCA9IG51bVxuICAgIHN0cmVhbS5sYXN0T2JqID0gb2JqXG4gICAgc3RyZWFtLmxhc3RNc2cgPSBtc2dcbiAgICBzdHJlYW0ubGFzdFRpbWUgPSB0LnNsaWNlKHRoaXNbdGltZVNsaWNlSW5kZXhTeW1dKVxuICAgIHN0cmVhbS5sYXN0TG9nZ2VyID0gdGhpcyAvLyBmb3IgY2hpbGQgbG9nZ2Vyc1xuICB9XG4gIHN0cmVhbS53cml0ZShzdHJlYW1Xcml0ZUhvb2sgPyBzdHJlYW1Xcml0ZUhvb2socykgOiBzKVxufVxuXG5mdW5jdGlvbiBmbHVzaCAoY2IpIHtcbiAgaWYgKGNiICE9IG51bGwgJiYgdHlwZW9mIGNiICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgRXJyb3IoJ2NhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbicpXG4gIH1cblxuICBjb25zdCBzdHJlYW0gPSB0aGlzW3N0cmVhbVN5bV1cblxuICBpZiAodHlwZW9mIHN0cmVhbS5mbHVzaCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHN0cmVhbS5mbHVzaChjYiB8fCBub29wKVxuICB9IGVsc2UgaWYgKGNiKSBjYigpXG59XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHsgaGFzT3duUHJvcGVydHkgfSA9IE9iamVjdC5wcm90b3R5cGVcblxuY29uc3Qgc3RyaW5naWZ5ID0gY29uZmlndXJlKClcblxuLy8gQHRzLWV4cGVjdC1lcnJvclxuc3RyaW5naWZ5LmNvbmZpZ3VyZSA9IGNvbmZpZ3VyZVxuLy8gQHRzLWV4cGVjdC1lcnJvclxuc3RyaW5naWZ5LnN0cmluZ2lmeSA9IHN0cmluZ2lmeVxuXG4vLyBAdHMtZXhwZWN0LWVycm9yXG5zdHJpbmdpZnkuZGVmYXVsdCA9IHN0cmluZ2lmeVxuXG4vLyBAdHMtZXhwZWN0LWVycm9yIHVzZWQgZm9yIG5hbWVkIGV4cG9ydFxuZXhwb3J0cy5zdHJpbmdpZnkgPSBzdHJpbmdpZnlcbi8vIEB0cy1leHBlY3QtZXJyb3IgdXNlZCBmb3IgbmFtZWQgZXhwb3J0XG5leHBvcnRzLmNvbmZpZ3VyZSA9IGNvbmZpZ3VyZVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0cmluZ2lmeVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udHJvbC1yZWdleFxuY29uc3Qgc3RyRXNjYXBlU2VxdWVuY2VzUmVnRXhwID0gL1tcXHUwMDAwLVxcdTAwMWZcXHUwMDIyXFx1MDA1Y1xcdWQ4MDAtXFx1ZGZmZl0vXG5cbi8vIEVzY2FwZSBDMCBjb250cm9sIGNoYXJhY3RlcnMsIGRvdWJsZSBxdW90ZXMsIHRoZSBiYWNrc2xhc2ggYW5kIGV2ZXJ5IGNvZGVcbi8vIHVuaXQgd2l0aCBhIG51bWVyaWMgdmFsdWUgaW4gdGhlIGluY2x1c2l2ZSByYW5nZSAweEQ4MDAgdG8gMHhERkZGLlxuZnVuY3Rpb24gc3RyRXNjYXBlIChzdHIpIHtcbiAgLy8gU29tZSBtYWdpYyBudW1iZXJzIHRoYXQgd29ya2VkIG91dCBmaW5lIHdoaWxlIGJlbmNobWFya2luZyB3aXRoIHY4IDguMFxuICBpZiAoc3RyLmxlbmd0aCA8IDUwMDAgJiYgIXN0ckVzY2FwZVNlcXVlbmNlc1JlZ0V4cC50ZXN0KHN0cikpIHtcbiAgICByZXR1cm4gYFwiJHtzdHJ9XCJgXG4gIH1cbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHN0cilcbn1cblxuZnVuY3Rpb24gc29ydCAoYXJyYXksIGNvbXBhcmF0b3IpIHtcbiAgLy8gSW5zZXJ0aW9uIHNvcnQgaXMgdmVyeSBlZmZpY2llbnQgZm9yIHNtYWxsIGlucHV0IHNpemVzLCBidXQgaXQgaGFzIGEgYmFkXG4gIC8vIHdvcnN0IGNhc2UgY29tcGxleGl0eS4gVGh1cywgdXNlIG5hdGl2ZSBhcnJheSBzb3J0IGZvciBiaWdnZXIgdmFsdWVzLlxuICBpZiAoYXJyYXkubGVuZ3RoID4gMmUyIHx8IGNvbXBhcmF0b3IpIHtcbiAgICByZXR1cm4gYXJyYXkuc29ydChjb21wYXJhdG9yKVxuICB9XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBhcnJheVtpXVxuICAgIGxldCBwb3NpdGlvbiA9IGlcbiAgICB3aGlsZSAocG9zaXRpb24gIT09IDAgJiYgYXJyYXlbcG9zaXRpb24gLSAxXSA+IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgYXJyYXlbcG9zaXRpb25dID0gYXJyYXlbcG9zaXRpb24gLSAxXVxuICAgICAgcG9zaXRpb24tLVxuICAgIH1cbiAgICBhcnJheVtwb3NpdGlvbl0gPSBjdXJyZW50VmFsdWVcbiAgfVxuICByZXR1cm4gYXJyYXlcbn1cblxuY29uc3QgdHlwZWRBcnJheVByb3RvdHlwZUdldFN5bWJvbFRvU3RyaW5nVGFnID1cbiAgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihcbiAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2YoXG4gICAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2YoXG4gICAgICAgIG5ldyBJbnQ4QXJyYXkoKVxuICAgICAgKVxuICAgICksXG4gICAgU3ltYm9sLnRvU3RyaW5nVGFnXG4gICkuZ2V0XG5cbmZ1bmN0aW9uIGlzVHlwZWRBcnJheVdpdGhFbnRyaWVzICh2YWx1ZSkge1xuICByZXR1cm4gdHlwZWRBcnJheVByb3RvdHlwZUdldFN5bWJvbFRvU3RyaW5nVGFnLmNhbGwodmFsdWUpICE9PSB1bmRlZmluZWQgJiYgdmFsdWUubGVuZ3RoICE9PSAwXG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeVR5cGVkQXJyYXkgKGFycmF5LCBzZXBhcmF0b3IsIG1heGltdW1CcmVhZHRoKSB7XG4gIGlmIChhcnJheS5sZW5ndGggPCBtYXhpbXVtQnJlYWR0aCkge1xuICAgIG1heGltdW1CcmVhZHRoID0gYXJyYXkubGVuZ3RoXG4gIH1cbiAgY29uc3Qgd2hpdGVzcGFjZSA9IHNlcGFyYXRvciA9PT0gJywnID8gJycgOiAnICdcbiAgbGV0IHJlcyA9IGBcIjBcIjoke3doaXRlc3BhY2V9JHthcnJheVswXX1gXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbWF4aW11bUJyZWFkdGg7IGkrKykge1xuICAgIHJlcyArPSBgJHtzZXBhcmF0b3J9XCIke2l9XCI6JHt3aGl0ZXNwYWNlfSR7YXJyYXlbaV19YFxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gZ2V0Q2lyY3VsYXJWYWx1ZU9wdGlvbiAob3B0aW9ucykge1xuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCAnY2lyY3VsYXJWYWx1ZScpKSB7XG4gICAgY29uc3QgY2lyY3VsYXJWYWx1ZSA9IG9wdGlvbnMuY2lyY3VsYXJWYWx1ZVxuICAgIGlmICh0eXBlb2YgY2lyY3VsYXJWYWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBgXCIke2NpcmN1bGFyVmFsdWV9XCJgXG4gICAgfVxuICAgIGlmIChjaXJjdWxhclZhbHVlID09IG51bGwpIHtcbiAgICAgIHJldHVybiBjaXJjdWxhclZhbHVlXG4gICAgfVxuICAgIGlmIChjaXJjdWxhclZhbHVlID09PSBFcnJvciB8fCBjaXJjdWxhclZhbHVlID09PSBUeXBlRXJyb3IpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRvU3RyaW5nICgpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDb252ZXJ0aW5nIGNpcmN1bGFyIHN0cnVjdHVyZSB0byBKU09OJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJjaXJjdWxhclZhbHVlXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIHN0cmluZyBvciB0aGUgdmFsdWUgbnVsbCBvciB1bmRlZmluZWQnKVxuICB9XG4gIHJldHVybiAnXCJbQ2lyY3VsYXJdXCInXG59XG5cbmZ1bmN0aW9uIGdldERldGVybWluaXN0aWNPcHRpb24gKG9wdGlvbnMpIHtcbiAgbGV0IHZhbHVlXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdGlvbnMsICdkZXRlcm1pbmlzdGljJykpIHtcbiAgICB2YWx1ZSA9IG9wdGlvbnMuZGV0ZXJtaW5pc3RpY1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdib29sZWFuJyAmJiB0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImRldGVybWluaXN0aWNcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgYm9vbGVhbiBvciBjb21wYXJhdG9yIGZ1bmN0aW9uJylcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB0cnVlIDogdmFsdWVcbn1cblxuZnVuY3Rpb24gZ2V0Qm9vbGVhbk9wdGlvbiAob3B0aW9ucywga2V5KSB7XG4gIGxldCB2YWx1ZVxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCBrZXkpKSB7XG4gICAgdmFsdWUgPSBvcHRpb25zW2tleV1cbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSBcIiR7a2V5fVwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBib29sZWFuYClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB0cnVlIDogdmFsdWVcbn1cblxuZnVuY3Rpb24gZ2V0UG9zaXRpdmVJbnRlZ2VyT3B0aW9uIChvcHRpb25zLCBrZXkpIHtcbiAgbGV0IHZhbHVlXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdGlvbnMsIGtleSkpIHtcbiAgICB2YWx1ZSA9IG9wdGlvbnNba2V5XVxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgXCIke2tleX1cIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgbnVtYmVyYClcbiAgICB9XG4gICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlIFwiJHtrZXl9XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBpbnRlZ2VyYClcbiAgICB9XG4gICAgaWYgKHZhbHVlIDwgMSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYFRoZSBcIiR7a2V5fVwiIGFyZ3VtZW50IG11c3QgYmUgPj0gMWApXG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gSW5maW5pdHkgOiB2YWx1ZVxufVxuXG5mdW5jdGlvbiBnZXRJdGVtQ291bnQgKG51bWJlcikge1xuICBpZiAobnVtYmVyID09PSAxKSB7XG4gICAgcmV0dXJuICcxIGl0ZW0nXG4gIH1cbiAgcmV0dXJuIGAke251bWJlcn0gaXRlbXNgXG59XG5cbmZ1bmN0aW9uIGdldFVuaXF1ZVJlcGxhY2VyU2V0IChyZXBsYWNlckFycmF5KSB7XG4gIGNvbnN0IHJlcGxhY2VyU2V0ID0gbmV3IFNldCgpXG4gIGZvciAoY29uc3QgdmFsdWUgb2YgcmVwbGFjZXJBcnJheSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJlcGxhY2VyU2V0LmFkZChTdHJpbmcodmFsdWUpKVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVwbGFjZXJTZXRcbn1cblxuZnVuY3Rpb24gZ2V0U3RyaWN0T3B0aW9uIChvcHRpb25zKSB7XG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdGlvbnMsICdzdHJpY3QnKSkge1xuICAgIGNvbnN0IHZhbHVlID0gb3B0aW9ucy5zdHJpY3RcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcInN0cmljdFwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBib29sZWFuJylcbiAgICB9XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICByZXR1cm4gKHZhbHVlKSA9PiB7XG4gICAgICAgIGxldCBtZXNzYWdlID0gYE9iamVjdCBjYW4gbm90IHNhZmVseSBiZSBzdHJpbmdpZmllZC4gUmVjZWl2ZWQgdHlwZSAke3R5cGVvZiB2YWx1ZX1gXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicpIG1lc3NhZ2UgKz0gYCAoJHt2YWx1ZS50b1N0cmluZygpfSlgXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjb25maWd1cmUgKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IHsgLi4ub3B0aW9ucyB9XG4gIGNvbnN0IGZhaWwgPSBnZXRTdHJpY3RPcHRpb24ob3B0aW9ucylcbiAgaWYgKGZhaWwpIHtcbiAgICBpZiAob3B0aW9ucy5iaWdpbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3B0aW9ucy5iaWdpbnQgPSBmYWxzZVxuICAgIH1cbiAgICBpZiAoISgnY2lyY3VsYXJWYWx1ZScgaW4gb3B0aW9ucykpIHtcbiAgICAgIG9wdGlvbnMuY2lyY3VsYXJWYWx1ZSA9IEVycm9yXG4gICAgfVxuICB9XG4gIGNvbnN0IGNpcmN1bGFyVmFsdWUgPSBnZXRDaXJjdWxhclZhbHVlT3B0aW9uKG9wdGlvbnMpXG4gIGNvbnN0IGJpZ2ludCA9IGdldEJvb2xlYW5PcHRpb24ob3B0aW9ucywgJ2JpZ2ludCcpXG4gIGNvbnN0IGRldGVybWluaXN0aWMgPSBnZXREZXRlcm1pbmlzdGljT3B0aW9uKG9wdGlvbnMpXG4gIGNvbnN0IGNvbXBhcmF0b3IgPSB0eXBlb2YgZGV0ZXJtaW5pc3RpYyA9PT0gJ2Z1bmN0aW9uJyA/IGRldGVybWluaXN0aWMgOiB1bmRlZmluZWRcbiAgY29uc3QgbWF4aW11bURlcHRoID0gZ2V0UG9zaXRpdmVJbnRlZ2VyT3B0aW9uKG9wdGlvbnMsICdtYXhpbXVtRGVwdGgnKVxuICBjb25zdCBtYXhpbXVtQnJlYWR0aCA9IGdldFBvc2l0aXZlSW50ZWdlck9wdGlvbihvcHRpb25zLCAnbWF4aW11bUJyZWFkdGgnKVxuXG4gIGZ1bmN0aW9uIHN0cmluZ2lmeUZuUmVwbGFjZXIgKGtleSwgcGFyZW50LCBzdGFjaywgcmVwbGFjZXIsIHNwYWNlciwgaW5kZW50YXRpb24pIHtcbiAgICBsZXQgdmFsdWUgPSBwYXJlbnRba2V5XVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlLnRvSlNPTiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFsdWUgPSB2YWx1ZS50b0pTT04oa2V5KVxuICAgIH1cbiAgICB2YWx1ZSA9IHJlcGxhY2VyLmNhbGwocGFyZW50LCBrZXksIHZhbHVlKVxuXG4gICAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIHJldHVybiBzdHJFc2NhcGUodmFsdWUpXG4gICAgICBjYXNlICdvYmplY3QnOiB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiAnbnVsbCdcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhY2suaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIGNpcmN1bGFyVmFsdWVcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXMgPSAnJ1xuICAgICAgICBsZXQgam9pbiA9ICcsJ1xuICAgICAgICBjb25zdCBvcmlnaW5hbEluZGVudGF0aW9uID0gaW5kZW50YXRpb25cblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1tdJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWF4aW11bURlcHRoIDwgc3RhY2subGVuZ3RoICsgMSkge1xuICAgICAgICAgICAgcmV0dXJuICdcIltBcnJheV1cIidcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RhY2sucHVzaCh2YWx1ZSlcbiAgICAgICAgICBpZiAoc3BhY2VyICE9PSAnJykge1xuICAgICAgICAgICAgaW5kZW50YXRpb24gKz0gc3BhY2VyXG4gICAgICAgICAgICByZXMgKz0gYFxcbiR7aW5kZW50YXRpb259YFxuICAgICAgICAgICAgam9pbiA9IGAsXFxuJHtpbmRlbnRhdGlvbn1gXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IG1heGltdW1WYWx1ZXNUb1N0cmluZ2lmeSA9IE1hdGgubWluKHZhbHVlLmxlbmd0aCwgbWF4aW11bUJyZWFkdGgpXG4gICAgICAgICAgbGV0IGkgPSAwXG4gICAgICAgICAgZm9yICg7IGkgPCBtYXhpbXVtVmFsdWVzVG9TdHJpbmdpZnkgLSAxOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHRtcCA9IHN0cmluZ2lmeUZuUmVwbGFjZXIoU3RyaW5nKGkpLCB2YWx1ZSwgc3RhY2ssIHJlcGxhY2VyLCBzcGFjZXIsIGluZGVudGF0aW9uKVxuICAgICAgICAgICAgcmVzICs9IHRtcCAhPT0gdW5kZWZpbmVkID8gdG1wIDogJ251bGwnXG4gICAgICAgICAgICByZXMgKz0gam9pblxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB0bXAgPSBzdHJpbmdpZnlGblJlcGxhY2VyKFN0cmluZyhpKSwgdmFsdWUsIHN0YWNrLCByZXBsYWNlciwgc3BhY2VyLCBpbmRlbnRhdGlvbilcbiAgICAgICAgICByZXMgKz0gdG1wICE9PSB1bmRlZmluZWQgPyB0bXAgOiAnbnVsbCdcbiAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoIC0gMSA+IG1heGltdW1CcmVhZHRoKSB7XG4gICAgICAgICAgICBjb25zdCByZW1vdmVkS2V5cyA9IHZhbHVlLmxlbmd0aCAtIG1heGltdW1CcmVhZHRoIC0gMVxuICAgICAgICAgICAgcmVzICs9IGAke2pvaW59XCIuLi4gJHtnZXRJdGVtQ291bnQocmVtb3ZlZEtleXMpfSBub3Qgc3RyaW5naWZpZWRcImBcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNwYWNlciAhPT0gJycpIHtcbiAgICAgICAgICAgIHJlcyArPSBgXFxuJHtvcmlnaW5hbEluZGVudGF0aW9ufWBcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RhY2sucG9wKClcbiAgICAgICAgICByZXR1cm4gYFske3Jlc31dYFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSlcbiAgICAgICAgY29uc3Qga2V5TGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAgICAgaWYgKGtleUxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiAne30nXG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1heGltdW1EZXB0aCA8IHN0YWNrLmxlbmd0aCArIDEpIHtcbiAgICAgICAgICByZXR1cm4gJ1wiW09iamVjdF1cIidcbiAgICAgICAgfVxuICAgICAgICBsZXQgd2hpdGVzcGFjZSA9ICcnXG4gICAgICAgIGxldCBzZXBhcmF0b3IgPSAnJ1xuICAgICAgICBpZiAoc3BhY2VyICE9PSAnJykge1xuICAgICAgICAgIGluZGVudGF0aW9uICs9IHNwYWNlclxuICAgICAgICAgIGpvaW4gPSBgLFxcbiR7aW5kZW50YXRpb259YFxuICAgICAgICAgIHdoaXRlc3BhY2UgPSAnICdcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtYXhpbXVtUHJvcGVydGllc1RvU3RyaW5naWZ5ID0gTWF0aC5taW4oa2V5TGVuZ3RoLCBtYXhpbXVtQnJlYWR0aClcbiAgICAgICAgaWYgKGRldGVybWluaXN0aWMgJiYgIWlzVHlwZWRBcnJheVdpdGhFbnRyaWVzKHZhbHVlKSkge1xuICAgICAgICAgIGtleXMgPSBzb3J0KGtleXMsIGNvbXBhcmF0b3IpXG4gICAgICAgIH1cbiAgICAgICAgc3RhY2sucHVzaCh2YWx1ZSlcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXhpbXVtUHJvcGVydGllc1RvU3RyaW5naWZ5OyBpKyspIHtcbiAgICAgICAgICBjb25zdCBrZXkgPSBrZXlzW2ldXG4gICAgICAgICAgY29uc3QgdG1wID0gc3RyaW5naWZ5Rm5SZXBsYWNlcihrZXksIHZhbHVlLCBzdGFjaywgcmVwbGFjZXIsIHNwYWNlciwgaW5kZW50YXRpb24pXG4gICAgICAgICAgaWYgKHRtcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXMgKz0gYCR7c2VwYXJhdG9yfSR7c3RyRXNjYXBlKGtleSl9OiR7d2hpdGVzcGFjZX0ke3RtcH1gXG4gICAgICAgICAgICBzZXBhcmF0b3IgPSBqb2luXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChrZXlMZW5ndGggPiBtYXhpbXVtQnJlYWR0aCkge1xuICAgICAgICAgIGNvbnN0IHJlbW92ZWRLZXlzID0ga2V5TGVuZ3RoIC0gbWF4aW11bUJyZWFkdGhcbiAgICAgICAgICByZXMgKz0gYCR7c2VwYXJhdG9yfVwiLi4uXCI6JHt3aGl0ZXNwYWNlfVwiJHtnZXRJdGVtQ291bnQocmVtb3ZlZEtleXMpfSBub3Qgc3RyaW5naWZpZWRcImBcbiAgICAgICAgICBzZXBhcmF0b3IgPSBqb2luXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNwYWNlciAhPT0gJycgJiYgc2VwYXJhdG9yLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICByZXMgPSBgXFxuJHtpbmRlbnRhdGlvbn0ke3Jlc31cXG4ke29yaWdpbmFsSW5kZW50YXRpb259YFxuICAgICAgICB9XG4gICAgICAgIHN0YWNrLnBvcCgpXG4gICAgICAgIHJldHVybiBgeyR7cmVzfX1gXG4gICAgICB9XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICByZXR1cm4gaXNGaW5pdGUodmFsdWUpID8gU3RyaW5nKHZhbHVlKSA6IGZhaWwgPyBmYWlsKHZhbHVlKSA6ICdudWxsJ1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZSdcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgIGNhc2UgJ2JpZ2ludCc6XG4gICAgICAgIGlmIChiaWdpbnQpIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKVxuICAgICAgICB9XG4gICAgICAgIC8vIGZhbGx0aHJvdWdoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFpbCA/IGZhaWwodmFsdWUpIDogdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3RyaW5naWZ5QXJyYXlSZXBsYWNlciAoa2V5LCB2YWx1ZSwgc3RhY2ssIHJlcGxhY2VyLCBzcGFjZXIsIGluZGVudGF0aW9uKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlLnRvSlNPTiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFsdWUgPSB2YWx1ZS50b0pTT04oa2V5KVxuICAgIH1cblxuICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICByZXR1cm4gc3RyRXNjYXBlKHZhbHVlKVxuICAgICAgY2FzZSAnb2JqZWN0Jzoge1xuICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gJ251bGwnXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YWNrLmluZGV4T2YodmFsdWUpICE9PSAtMSkge1xuICAgICAgICAgIHJldHVybiBjaXJjdWxhclZhbHVlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvcmlnaW5hbEluZGVudGF0aW9uID0gaW5kZW50YXRpb25cbiAgICAgICAgbGV0IHJlcyA9ICcnXG4gICAgICAgIGxldCBqb2luID0gJywnXG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuICdbXSdcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1heGltdW1EZXB0aCA8IHN0YWNrLmxlbmd0aCArIDEpIHtcbiAgICAgICAgICAgIHJldHVybiAnXCJbQXJyYXldXCInXG4gICAgICAgICAgfVxuICAgICAgICAgIHN0YWNrLnB1c2godmFsdWUpXG4gICAgICAgICAgaWYgKHNwYWNlciAhPT0gJycpIHtcbiAgICAgICAgICAgIGluZGVudGF0aW9uICs9IHNwYWNlclxuICAgICAgICAgICAgcmVzICs9IGBcXG4ke2luZGVudGF0aW9ufWBcbiAgICAgICAgICAgIGpvaW4gPSBgLFxcbiR7aW5kZW50YXRpb259YFxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBtYXhpbXVtVmFsdWVzVG9TdHJpbmdpZnkgPSBNYXRoLm1pbih2YWx1ZS5sZW5ndGgsIG1heGltdW1CcmVhZHRoKVxuICAgICAgICAgIGxldCBpID0gMFxuICAgICAgICAgIGZvciAoOyBpIDwgbWF4aW11bVZhbHVlc1RvU3RyaW5naWZ5IC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB0bXAgPSBzdHJpbmdpZnlBcnJheVJlcGxhY2VyKFN0cmluZyhpKSwgdmFsdWVbaV0sIHN0YWNrLCByZXBsYWNlciwgc3BhY2VyLCBpbmRlbnRhdGlvbilcbiAgICAgICAgICAgIHJlcyArPSB0bXAgIT09IHVuZGVmaW5lZCA/IHRtcCA6ICdudWxsJ1xuICAgICAgICAgICAgcmVzICs9IGpvaW5cbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdG1wID0gc3RyaW5naWZ5QXJyYXlSZXBsYWNlcihTdHJpbmcoaSksIHZhbHVlW2ldLCBzdGFjaywgcmVwbGFjZXIsIHNwYWNlciwgaW5kZW50YXRpb24pXG4gICAgICAgICAgcmVzICs9IHRtcCAhPT0gdW5kZWZpbmVkID8gdG1wIDogJ251bGwnXG4gICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCAtIDEgPiBtYXhpbXVtQnJlYWR0aCkge1xuICAgICAgICAgICAgY29uc3QgcmVtb3ZlZEtleXMgPSB2YWx1ZS5sZW5ndGggLSBtYXhpbXVtQnJlYWR0aCAtIDFcbiAgICAgICAgICAgIHJlcyArPSBgJHtqb2lufVwiLi4uICR7Z2V0SXRlbUNvdW50KHJlbW92ZWRLZXlzKX0gbm90IHN0cmluZ2lmaWVkXCJgXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzcGFjZXIgIT09ICcnKSB7XG4gICAgICAgICAgICByZXMgKz0gYFxcbiR7b3JpZ2luYWxJbmRlbnRhdGlvbn1gXG4gICAgICAgICAgfVxuICAgICAgICAgIHN0YWNrLnBvcCgpXG4gICAgICAgICAgcmV0dXJuIGBbJHtyZXN9XWBcbiAgICAgICAgfVxuICAgICAgICBzdGFjay5wdXNoKHZhbHVlKVxuICAgICAgICBsZXQgd2hpdGVzcGFjZSA9ICcnXG4gICAgICAgIGlmIChzcGFjZXIgIT09ICcnKSB7XG4gICAgICAgICAgaW5kZW50YXRpb24gKz0gc3BhY2VyXG4gICAgICAgICAgam9pbiA9IGAsXFxuJHtpbmRlbnRhdGlvbn1gXG4gICAgICAgICAgd2hpdGVzcGFjZSA9ICcgJ1xuICAgICAgICB9XG4gICAgICAgIGxldCBzZXBhcmF0b3IgPSAnJ1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiByZXBsYWNlcikge1xuICAgICAgICAgIGNvbnN0IHRtcCA9IHN0cmluZ2lmeUFycmF5UmVwbGFjZXIoa2V5LCB2YWx1ZVtrZXldLCBzdGFjaywgcmVwbGFjZXIsIHNwYWNlciwgaW5kZW50YXRpb24pXG4gICAgICAgICAgaWYgKHRtcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXMgKz0gYCR7c2VwYXJhdG9yfSR7c3RyRXNjYXBlKGtleSl9OiR7d2hpdGVzcGFjZX0ke3RtcH1gXG4gICAgICAgICAgICBzZXBhcmF0b3IgPSBqb2luXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzcGFjZXIgIT09ICcnICYmIHNlcGFyYXRvci5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgcmVzID0gYFxcbiR7aW5kZW50YXRpb259JHtyZXN9XFxuJHtvcmlnaW5hbEluZGVudGF0aW9ufWBcbiAgICAgICAgfVxuICAgICAgICBzdGFjay5wb3AoKVxuICAgICAgICByZXR1cm4gYHske3Jlc319YFxuICAgICAgfVxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgcmV0dXJuIGlzRmluaXRlKHZhbHVlKSA/IFN0cmluZyh2YWx1ZSkgOiBmYWlsID8gZmFpbCh2YWx1ZSkgOiAnbnVsbCdcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gdmFsdWUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnXG4gICAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICBjYXNlICdiaWdpbnQnOlxuICAgICAgICBpZiAoYmlnaW50KSB7XG4gICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgICAvLyBmYWxsdGhyb3VnaFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhaWwgPyBmYWlsKHZhbHVlKSA6IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0cmluZ2lmeUluZGVudCAoa2V5LCB2YWx1ZSwgc3RhY2ssIHNwYWNlciwgaW5kZW50YXRpb24pIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgcmV0dXJuIHN0ckVzY2FwZSh2YWx1ZSlcbiAgICAgIGNhc2UgJ29iamVjdCc6IHtcbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuICdudWxsJ1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZS50b0pTT04oa2V5KVxuICAgICAgICAgIC8vIFByZXZlbnQgY2FsbGluZyBgdG9KU09OYCBhZ2Fpbi5cbiAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ2lmeUluZGVudChrZXksIHZhbHVlLCBzdGFjaywgc3BhY2VyLCBpbmRlbnRhdGlvbilcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gJ251bGwnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFjay5pbmRleE9mKHZhbHVlKSAhPT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gY2lyY3VsYXJWYWx1ZVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsSW5kZW50YXRpb24gPSBpbmRlbnRhdGlvblxuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAnW10nXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtYXhpbXVtRGVwdGggPCBzdGFjay5sZW5ndGggKyAxKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1wiW0FycmF5XVwiJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdGFjay5wdXNoKHZhbHVlKVxuICAgICAgICAgIGluZGVudGF0aW9uICs9IHNwYWNlclxuICAgICAgICAgIGxldCByZXMgPSBgXFxuJHtpbmRlbnRhdGlvbn1gXG4gICAgICAgICAgY29uc3Qgam9pbiA9IGAsXFxuJHtpbmRlbnRhdGlvbn1gXG4gICAgICAgICAgY29uc3QgbWF4aW11bVZhbHVlc1RvU3RyaW5naWZ5ID0gTWF0aC5taW4odmFsdWUubGVuZ3RoLCBtYXhpbXVtQnJlYWR0aClcbiAgICAgICAgICBsZXQgaSA9IDBcbiAgICAgICAgICBmb3IgKDsgaSA8IG1heGltdW1WYWx1ZXNUb1N0cmluZ2lmeSAtIDE7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdG1wID0gc3RyaW5naWZ5SW5kZW50KFN0cmluZyhpKSwgdmFsdWVbaV0sIHN0YWNrLCBzcGFjZXIsIGluZGVudGF0aW9uKVxuICAgICAgICAgICAgcmVzICs9IHRtcCAhPT0gdW5kZWZpbmVkID8gdG1wIDogJ251bGwnXG4gICAgICAgICAgICByZXMgKz0gam9pblxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB0bXAgPSBzdHJpbmdpZnlJbmRlbnQoU3RyaW5nKGkpLCB2YWx1ZVtpXSwgc3RhY2ssIHNwYWNlciwgaW5kZW50YXRpb24pXG4gICAgICAgICAgcmVzICs9IHRtcCAhPT0gdW5kZWZpbmVkID8gdG1wIDogJ251bGwnXG4gICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCAtIDEgPiBtYXhpbXVtQnJlYWR0aCkge1xuICAgICAgICAgICAgY29uc3QgcmVtb3ZlZEtleXMgPSB2YWx1ZS5sZW5ndGggLSBtYXhpbXVtQnJlYWR0aCAtIDFcbiAgICAgICAgICAgIHJlcyArPSBgJHtqb2lufVwiLi4uICR7Z2V0SXRlbUNvdW50KHJlbW92ZWRLZXlzKX0gbm90IHN0cmluZ2lmaWVkXCJgXG4gICAgICAgICAgfVxuICAgICAgICAgIHJlcyArPSBgXFxuJHtvcmlnaW5hbEluZGVudGF0aW9ufWBcbiAgICAgICAgICBzdGFjay5wb3AoKVxuICAgICAgICAgIHJldHVybiBgWyR7cmVzfV1gXG4gICAgICAgIH1cblxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKVxuICAgICAgICBjb25zdCBrZXlMZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgICBpZiAoa2V5TGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuICd7fSdcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF4aW11bURlcHRoIDwgc3RhY2subGVuZ3RoICsgMSkge1xuICAgICAgICAgIHJldHVybiAnXCJbT2JqZWN0XVwiJ1xuICAgICAgICB9XG4gICAgICAgIGluZGVudGF0aW9uICs9IHNwYWNlclxuICAgICAgICBjb25zdCBqb2luID0gYCxcXG4ke2luZGVudGF0aW9ufWBcbiAgICAgICAgbGV0IHJlcyA9ICcnXG4gICAgICAgIGxldCBzZXBhcmF0b3IgPSAnJ1xuICAgICAgICBsZXQgbWF4aW11bVByb3BlcnRpZXNUb1N0cmluZ2lmeSA9IE1hdGgubWluKGtleUxlbmd0aCwgbWF4aW11bUJyZWFkdGgpXG4gICAgICAgIGlmIChpc1R5cGVkQXJyYXlXaXRoRW50cmllcyh2YWx1ZSkpIHtcbiAgICAgICAgICByZXMgKz0gc3RyaW5naWZ5VHlwZWRBcnJheSh2YWx1ZSwgam9pbiwgbWF4aW11bUJyZWFkdGgpXG4gICAgICAgICAga2V5cyA9IGtleXMuc2xpY2UodmFsdWUubGVuZ3RoKVxuICAgICAgICAgIG1heGltdW1Qcm9wZXJ0aWVzVG9TdHJpbmdpZnkgLT0gdmFsdWUubGVuZ3RoXG4gICAgICAgICAgc2VwYXJhdG9yID0gam9pblxuICAgICAgICB9XG4gICAgICAgIGlmIChkZXRlcm1pbmlzdGljKSB7XG4gICAgICAgICAga2V5cyA9IHNvcnQoa2V5cywgY29tcGFyYXRvcilcbiAgICAgICAgfVxuICAgICAgICBzdGFjay5wdXNoKHZhbHVlKVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1heGltdW1Qcm9wZXJ0aWVzVG9TdHJpbmdpZnk7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGtleSA9IGtleXNbaV1cbiAgICAgICAgICBjb25zdCB0bXAgPSBzdHJpbmdpZnlJbmRlbnQoa2V5LCB2YWx1ZVtrZXldLCBzdGFjaywgc3BhY2VyLCBpbmRlbnRhdGlvbilcbiAgICAgICAgICBpZiAodG1wICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlcyArPSBgJHtzZXBhcmF0b3J9JHtzdHJFc2NhcGUoa2V5KX06ICR7dG1wfWBcbiAgICAgICAgICAgIHNlcGFyYXRvciA9IGpvaW5cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleUxlbmd0aCA+IG1heGltdW1CcmVhZHRoKSB7XG4gICAgICAgICAgY29uc3QgcmVtb3ZlZEtleXMgPSBrZXlMZW5ndGggLSBtYXhpbXVtQnJlYWR0aFxuICAgICAgICAgIHJlcyArPSBgJHtzZXBhcmF0b3J9XCIuLi5cIjogXCIke2dldEl0ZW1Db3VudChyZW1vdmVkS2V5cyl9IG5vdCBzdHJpbmdpZmllZFwiYFxuICAgICAgICAgIHNlcGFyYXRvciA9IGpvaW5cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VwYXJhdG9yICE9PSAnJykge1xuICAgICAgICAgIHJlcyA9IGBcXG4ke2luZGVudGF0aW9ufSR7cmVzfVxcbiR7b3JpZ2luYWxJbmRlbnRhdGlvbn1gXG4gICAgICAgIH1cbiAgICAgICAgc3RhY2sucG9wKClcbiAgICAgICAgcmV0dXJuIGB7JHtyZXN9fWBcbiAgICAgIH1cbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHJldHVybiBpc0Zpbml0ZSh2YWx1ZSkgPyBTdHJpbmcodmFsdWUpIDogZmFpbCA/IGZhaWwodmFsdWUpIDogJ251bGwnXG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJ1xuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgY2FzZSAnYmlnaW50JzpcbiAgICAgICAgaWYgKGJpZ2ludCkge1xuICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpXG4gICAgICAgIH1cbiAgICAgICAgLy8gZmFsbHRocm91Z2hcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWlsID8gZmFpbCh2YWx1ZSkgOiB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdHJpbmdpZnlTaW1wbGUgKGtleSwgdmFsdWUsIHN0YWNrKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIHJldHVybiBzdHJFc2NhcGUodmFsdWUpXG4gICAgICBjYXNlICdvYmplY3QnOiB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiAnbnVsbCdcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlLnRvSlNPTiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9KU09OKGtleSlcbiAgICAgICAgICAvLyBQcmV2ZW50IGNhbGxpbmcgYHRvSlNPTmAgYWdhaW5cbiAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ2lmeVNpbXBsZShrZXksIHZhbHVlLCBzdGFjaylcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gJ251bGwnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFjay5pbmRleE9mKHZhbHVlKSAhPT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gY2lyY3VsYXJWYWx1ZVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlcyA9ICcnXG5cbiAgICAgICAgY29uc3QgaGFzTGVuZ3RoID0gdmFsdWUubGVuZ3RoICE9PSB1bmRlZmluZWRcbiAgICAgICAgaWYgKGhhc0xlbmd0aCAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAnW10nXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtYXhpbXVtRGVwdGggPCBzdGFjay5sZW5ndGggKyAxKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1wiW0FycmF5XVwiJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdGFjay5wdXNoKHZhbHVlKVxuICAgICAgICAgIGNvbnN0IG1heGltdW1WYWx1ZXNUb1N0cmluZ2lmeSA9IE1hdGgubWluKHZhbHVlLmxlbmd0aCwgbWF4aW11bUJyZWFkdGgpXG4gICAgICAgICAgbGV0IGkgPSAwXG4gICAgICAgICAgZm9yICg7IGkgPCBtYXhpbXVtVmFsdWVzVG9TdHJpbmdpZnkgLSAxOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHRtcCA9IHN0cmluZ2lmeVNpbXBsZShTdHJpbmcoaSksIHZhbHVlW2ldLCBzdGFjaylcbiAgICAgICAgICAgIHJlcyArPSB0bXAgIT09IHVuZGVmaW5lZCA/IHRtcCA6ICdudWxsJ1xuICAgICAgICAgICAgcmVzICs9ICcsJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB0bXAgPSBzdHJpbmdpZnlTaW1wbGUoU3RyaW5nKGkpLCB2YWx1ZVtpXSwgc3RhY2spXG4gICAgICAgICAgcmVzICs9IHRtcCAhPT0gdW5kZWZpbmVkID8gdG1wIDogJ251bGwnXG4gICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCAtIDEgPiBtYXhpbXVtQnJlYWR0aCkge1xuICAgICAgICAgICAgY29uc3QgcmVtb3ZlZEtleXMgPSB2YWx1ZS5sZW5ndGggLSBtYXhpbXVtQnJlYWR0aCAtIDFcbiAgICAgICAgICAgIHJlcyArPSBgLFwiLi4uICR7Z2V0SXRlbUNvdW50KHJlbW92ZWRLZXlzKX0gbm90IHN0cmluZ2lmaWVkXCJgXG4gICAgICAgICAgfVxuICAgICAgICAgIHN0YWNrLnBvcCgpXG4gICAgICAgICAgcmV0dXJuIGBbJHtyZXN9XWBcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpXG4gICAgICAgIGNvbnN0IGtleUxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAgIGlmIChrZXlMZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gJ3t9J1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXhpbXVtRGVwdGggPCBzdGFjay5sZW5ndGggKyAxKSB7XG4gICAgICAgICAgcmV0dXJuICdcIltPYmplY3RdXCInXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlcGFyYXRvciA9ICcnXG4gICAgICAgIGxldCBtYXhpbXVtUHJvcGVydGllc1RvU3RyaW5naWZ5ID0gTWF0aC5taW4oa2V5TGVuZ3RoLCBtYXhpbXVtQnJlYWR0aClcbiAgICAgICAgaWYgKGhhc0xlbmd0aCAmJiBpc1R5cGVkQXJyYXlXaXRoRW50cmllcyh2YWx1ZSkpIHtcbiAgICAgICAgICByZXMgKz0gc3RyaW5naWZ5VHlwZWRBcnJheSh2YWx1ZSwgJywnLCBtYXhpbXVtQnJlYWR0aClcbiAgICAgICAgICBrZXlzID0ga2V5cy5zbGljZSh2YWx1ZS5sZW5ndGgpXG4gICAgICAgICAgbWF4aW11bVByb3BlcnRpZXNUb1N0cmluZ2lmeSAtPSB2YWx1ZS5sZW5ndGhcbiAgICAgICAgICBzZXBhcmF0b3IgPSAnLCdcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGV0ZXJtaW5pc3RpYykge1xuICAgICAgICAgIGtleXMgPSBzb3J0KGtleXMsIGNvbXBhcmF0b3IpXG4gICAgICAgIH1cbiAgICAgICAgc3RhY2sucHVzaCh2YWx1ZSlcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXhpbXVtUHJvcGVydGllc1RvU3RyaW5naWZ5OyBpKyspIHtcbiAgICAgICAgICBjb25zdCBrZXkgPSBrZXlzW2ldXG4gICAgICAgICAgY29uc3QgdG1wID0gc3RyaW5naWZ5U2ltcGxlKGtleSwgdmFsdWVba2V5XSwgc3RhY2spXG4gICAgICAgICAgaWYgKHRtcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXMgKz0gYCR7c2VwYXJhdG9yfSR7c3RyRXNjYXBlKGtleSl9OiR7dG1wfWBcbiAgICAgICAgICAgIHNlcGFyYXRvciA9ICcsJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5TGVuZ3RoID4gbWF4aW11bUJyZWFkdGgpIHtcbiAgICAgICAgICBjb25zdCByZW1vdmVkS2V5cyA9IGtleUxlbmd0aCAtIG1heGltdW1CcmVhZHRoXG4gICAgICAgICAgcmVzICs9IGAke3NlcGFyYXRvcn1cIi4uLlwiOlwiJHtnZXRJdGVtQ291bnQocmVtb3ZlZEtleXMpfSBub3Qgc3RyaW5naWZpZWRcImBcbiAgICAgICAgfVxuICAgICAgICBzdGFjay5wb3AoKVxuICAgICAgICByZXR1cm4gYHske3Jlc319YFxuICAgICAgfVxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgcmV0dXJuIGlzRmluaXRlKHZhbHVlKSA/IFN0cmluZyh2YWx1ZSkgOiBmYWlsID8gZmFpbCh2YWx1ZSkgOiAnbnVsbCdcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gdmFsdWUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnXG4gICAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICBjYXNlICdiaWdpbnQnOlxuICAgICAgICBpZiAoYmlnaW50KSB7XG4gICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgICAvLyBmYWxsdGhyb3VnaFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhaWwgPyBmYWlsKHZhbHVlKSA6IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0cmluZ2lmeSAodmFsdWUsIHJlcGxhY2VyLCBzcGFjZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgbGV0IHNwYWNlciA9ICcnXG4gICAgICBpZiAodHlwZW9mIHNwYWNlID09PSAnbnVtYmVyJykge1xuICAgICAgICBzcGFjZXIgPSAnICcucmVwZWF0KE1hdGgubWluKHNwYWNlLCAxMCkpXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzcGFjZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgc3BhY2VyID0gc3BhY2Uuc2xpY2UoMCwgMTApXG4gICAgICB9XG4gICAgICBpZiAocmVwbGFjZXIgIT0gbnVsbCkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcGxhY2VyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIHN0cmluZ2lmeUZuUmVwbGFjZXIoJycsIHsgJyc6IHZhbHVlIH0sIFtdLCByZXBsYWNlciwgc3BhY2VyLCAnJylcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXBsYWNlcikpIHtcbiAgICAgICAgICByZXR1cm4gc3RyaW5naWZ5QXJyYXlSZXBsYWNlcignJywgdmFsdWUsIFtdLCBnZXRVbmlxdWVSZXBsYWNlclNldChyZXBsYWNlciksIHNwYWNlciwgJycpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzcGFjZXIubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmdpZnlJbmRlbnQoJycsIHZhbHVlLCBbXSwgc3BhY2VyLCAnJylcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0cmluZ2lmeVNpbXBsZSgnJywgdmFsdWUsIFtdKVxuICB9XG5cbiAgcmV0dXJuIHN0cmluZ2lmeVxufVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBtZXRhZGF0YSA9IFN5bWJvbC5mb3IoJ3Bpbm8ubWV0YWRhdGEnKVxuY29uc3QgeyBERUZBVUxUX0xFVkVMUyB9ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKVxuXG5jb25zdCBERUZBVUxUX0lORk9fTEVWRUwgPSBERUZBVUxUX0xFVkVMUy5pbmZvXG5cbmZ1bmN0aW9uIG11bHRpc3RyZWFtIChzdHJlYW1zQXJyYXksIG9wdHMpIHtcbiAgc3RyZWFtc0FycmF5ID0gc3RyZWFtc0FycmF5IHx8IFtdXG4gIG9wdHMgPSBvcHRzIHx8IHsgZGVkdXBlOiBmYWxzZSB9XG5cbiAgY29uc3Qgc3RyZWFtTGV2ZWxzID0gT2JqZWN0LmNyZWF0ZShERUZBVUxUX0xFVkVMUylcbiAgc3RyZWFtTGV2ZWxzLnNpbGVudCA9IEluZmluaXR5XG4gIGlmIChvcHRzLmxldmVscyAmJiB0eXBlb2Ygb3B0cy5sZXZlbHMgPT09ICdvYmplY3QnKSB7XG4gICAgT2JqZWN0LmtleXMob3B0cy5sZXZlbHMpLmZvckVhY2goaSA9PiB7XG4gICAgICBzdHJlYW1MZXZlbHNbaV0gPSBvcHRzLmxldmVsc1tpXVxuICAgIH0pXG4gIH1cblxuICBjb25zdCByZXMgPSB7XG4gICAgd3JpdGUsXG4gICAgYWRkLFxuICAgIHJlbW92ZSxcbiAgICBlbWl0LFxuICAgIGZsdXNoU3luYyxcbiAgICBlbmQsXG4gICAgbWluTGV2ZWw6IDAsXG4gICAgbGFzdElkOiAwLFxuICAgIHN0cmVhbXM6IFtdLFxuICAgIGNsb25lLFxuICAgIFttZXRhZGF0YV06IHRydWUsXG4gICAgc3RyZWFtTGV2ZWxzXG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShzdHJlYW1zQXJyYXkpKSB7XG4gICAgc3RyZWFtc0FycmF5LmZvckVhY2goYWRkLCByZXMpXG4gIH0gZWxzZSB7XG4gICAgYWRkLmNhbGwocmVzLCBzdHJlYW1zQXJyYXkpXG4gIH1cblxuICAvLyBjbGVhbiB0aGlzIG9iamVjdCB1cFxuICAvLyBvciBpdCB3aWxsIHN0YXkgYWxsb2NhdGVkIGZvcmV2ZXJcbiAgLy8gYXMgaXQgaXMgY2xvc2VkIG9uIHRoZSBmb2xsb3dpbmcgY2xvc3VyZXNcbiAgc3RyZWFtc0FycmF5ID0gbnVsbFxuXG4gIHJldHVybiByZXNcblxuICAvLyB3ZSBjYW4gZXhpdCBlYXJseSBiZWNhdXNlIHRoZSBzdHJlYW1zIGFyZSBvcmRlcmVkIGJ5IGxldmVsXG4gIGZ1bmN0aW9uIHdyaXRlIChkYXRhKSB7XG4gICAgbGV0IGRlc3RcbiAgICBjb25zdCBsZXZlbCA9IHRoaXMubGFzdExldmVsXG4gICAgY29uc3QgeyBzdHJlYW1zIH0gPSB0aGlzXG4gICAgLy8gZm9yIGhhbmRsaW5nIHNpdHVhdGlvbiB3aGVuIHNldmVyYWwgc3RyZWFtcyBoYXMgdGhlIHNhbWUgbGV2ZWxcbiAgICBsZXQgcmVjb3JkZWRMZXZlbCA9IDBcbiAgICBsZXQgc3RyZWFtXG5cbiAgICAvLyBpZiBkZWR1cGUgc2V0IHRvIHRydWUgd2Ugc2VuZCBsb2dzIHRvIHRoZSBzdHJlYW0gd2l0aCB0aGUgaGlnaGVzdCBsZXZlbFxuICAgIC8vIHRoZXJlZm9yZSwgd2UgaGF2ZSB0byBjaGFuZ2Ugc29ydGluZyBvcmRlclxuICAgIGZvciAobGV0IGkgPSBpbml0TG9vcFZhcihzdHJlYW1zLmxlbmd0aCwgb3B0cy5kZWR1cGUpOyBjaGVja0xvb3BWYXIoaSwgc3RyZWFtcy5sZW5ndGgsIG9wdHMuZGVkdXBlKTsgaSA9IGFkanVzdExvb3BWYXIoaSwgb3B0cy5kZWR1cGUpKSB7XG4gICAgICBkZXN0ID0gc3RyZWFtc1tpXVxuICAgICAgaWYgKGRlc3QubGV2ZWwgPD0gbGV2ZWwpIHtcbiAgICAgICAgaWYgKHJlY29yZGVkTGV2ZWwgIT09IDAgJiYgcmVjb3JkZWRMZXZlbCAhPT0gZGVzdC5sZXZlbCkge1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgc3RyZWFtID0gZGVzdC5zdHJlYW1cbiAgICAgICAgaWYgKHN0cmVhbVttZXRhZGF0YV0pIHtcbiAgICAgICAgICBjb25zdCB7IGxhc3RUaW1lLCBsYXN0TXNnLCBsYXN0T2JqLCBsYXN0TG9nZ2VyIH0gPSB0aGlzXG4gICAgICAgICAgc3RyZWFtLmxhc3RMZXZlbCA9IGxldmVsXG4gICAgICAgICAgc3RyZWFtLmxhc3RUaW1lID0gbGFzdFRpbWVcbiAgICAgICAgICBzdHJlYW0ubGFzdE1zZyA9IGxhc3RNc2dcbiAgICAgICAgICBzdHJlYW0ubGFzdE9iaiA9IGxhc3RPYmpcbiAgICAgICAgICBzdHJlYW0ubGFzdExvZ2dlciA9IGxhc3RMb2dnZXJcbiAgICAgICAgfVxuICAgICAgICBzdHJlYW0ud3JpdGUoZGF0YSlcbiAgICAgICAgaWYgKG9wdHMuZGVkdXBlKSB7XG4gICAgICAgICAgcmVjb3JkZWRMZXZlbCA9IGRlc3QubGV2ZWxcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghb3B0cy5kZWR1cGUpIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlbWl0ICguLi5hcmdzKSB7XG4gICAgZm9yIChjb25zdCB7IHN0cmVhbSB9IG9mIHRoaXMuc3RyZWFtcykge1xuICAgICAgaWYgKHR5cGVvZiBzdHJlYW0uZW1pdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBzdHJlYW0uZW1pdCguLi5hcmdzKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoU3luYyAoKSB7XG4gICAgZm9yIChjb25zdCB7IHN0cmVhbSB9IG9mIHRoaXMuc3RyZWFtcykge1xuICAgICAgaWYgKHR5cGVvZiBzdHJlYW0uZmx1c2hTeW5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHN0cmVhbS5mbHVzaFN5bmMoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZCAoZGVzdCkge1xuICAgIGlmICghZGVzdCkge1xuICAgICAgcmV0dXJuIHJlc1xuICAgIH1cblxuICAgIC8vIENoZWNrIHRoYXQgZGVzdCBpbXBsZW1lbnRzIGVpdGhlciBTdHJlYW1FbnRyeSBvciBEZXN0aW5hdGlvblN0cmVhbVxuICAgIGNvbnN0IGlzU3RyZWFtID0gdHlwZW9mIGRlc3Qud3JpdGUgPT09ICdmdW5jdGlvbicgfHwgZGVzdC5zdHJlYW1cbiAgICBjb25zdCBzdHJlYW1fID0gZGVzdC53cml0ZSA/IGRlc3QgOiBkZXN0LnN0cmVhbVxuICAgIC8vIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIHByb3ZpZGUgYSBtZWFuaW5nZnVsIGVycm9yIG1lc3NhZ2UsIG90aGVyd2lzZSBpdCB0aHJvd3Mgc29tZXdoZXJlIGluc2lkZSB3cml0ZSgpXG4gICAgaWYgKCFpc1N0cmVhbSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ3N0cmVhbSBvYmplY3QgbmVlZHMgdG8gaW1wbGVtZW50IGVpdGhlciBTdHJlYW1FbnRyeSBvciBEZXN0aW5hdGlvblN0cmVhbSBpbnRlcmZhY2UnKVxuICAgIH1cblxuICAgIGNvbnN0IHsgc3RyZWFtcywgc3RyZWFtTGV2ZWxzIH0gPSB0aGlzXG5cbiAgICBsZXQgbGV2ZWxcbiAgICBpZiAodHlwZW9mIGRlc3QubGV2ZWxWYWwgPT09ICdudW1iZXInKSB7XG4gICAgICBsZXZlbCA9IGRlc3QubGV2ZWxWYWxcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZXN0LmxldmVsID09PSAnc3RyaW5nJykge1xuICAgICAgbGV2ZWwgPSBzdHJlYW1MZXZlbHNbZGVzdC5sZXZlbF1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZXN0LmxldmVsID09PSAnbnVtYmVyJykge1xuICAgICAgbGV2ZWwgPSBkZXN0LmxldmVsXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldmVsID0gREVGQVVMVF9JTkZPX0xFVkVMXG4gICAgfVxuXG4gICAgY29uc3QgZGVzdF8gPSB7XG4gICAgICBzdHJlYW06IHN0cmVhbV8sXG4gICAgICBsZXZlbCxcbiAgICAgIGxldmVsVmFsOiB1bmRlZmluZWQsXG4gICAgICBpZDogKytyZXMubGFzdElkXG4gICAgfVxuXG4gICAgc3RyZWFtcy51bnNoaWZ0KGRlc3RfKVxuICAgIHN0cmVhbXMuc29ydChjb21wYXJlQnlMZXZlbClcblxuICAgIHRoaXMubWluTGV2ZWwgPSBzdHJlYW1zWzBdLmxldmVsXG5cbiAgICByZXR1cm4gcmVzXG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmUgKGlkKSB7XG4gICAgY29uc3QgeyBzdHJlYW1zIH0gPSB0aGlzXG4gICAgY29uc3QgaW5kZXggPSBzdHJlYW1zLmZpbmRJbmRleChzID0+IHMuaWQgPT09IGlkKVxuXG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIHN0cmVhbXMuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgc3RyZWFtcy5zb3J0KGNvbXBhcmVCeUxldmVsKVxuICAgICAgdGhpcy5taW5MZXZlbCA9IHN0cmVhbXMubGVuZ3RoID4gMCA/IHN0cmVhbXNbMF0ubGV2ZWwgOiAtMVxuICAgIH1cblxuICAgIHJldHVybiByZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuZCAoKSB7XG4gICAgZm9yIChjb25zdCB7IHN0cmVhbSB9IG9mIHRoaXMuc3RyZWFtcykge1xuICAgICAgaWYgKHR5cGVvZiBzdHJlYW0uZmx1c2hTeW5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHN0cmVhbS5mbHVzaFN5bmMoKVxuICAgICAgfVxuICAgICAgc3RyZWFtLmVuZCgpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvbmUgKGxldmVsKSB7XG4gICAgY29uc3Qgc3RyZWFtcyA9IG5ldyBBcnJheSh0aGlzLnN0cmVhbXMubGVuZ3RoKVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJlYW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzdHJlYW1zW2ldID0ge1xuICAgICAgICBsZXZlbCxcbiAgICAgICAgc3RyZWFtOiB0aGlzLnN0cmVhbXNbaV0uc3RyZWFtXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlLFxuICAgICAgYWRkLFxuICAgICAgcmVtb3ZlLFxuICAgICAgbWluTGV2ZWw6IGxldmVsLFxuICAgICAgc3RyZWFtcyxcbiAgICAgIGNsb25lLFxuICAgICAgZW1pdCxcbiAgICAgIGZsdXNoU3luYyxcbiAgICAgIFttZXRhZGF0YV06IHRydWVcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY29tcGFyZUJ5TGV2ZWwgKGEsIGIpIHtcbiAgcmV0dXJuIGEubGV2ZWwgLSBiLmxldmVsXG59XG5cbmZ1bmN0aW9uIGluaXRMb29wVmFyIChsZW5ndGgsIGRlZHVwZSkge1xuICByZXR1cm4gZGVkdXBlID8gbGVuZ3RoIC0gMSA6IDBcbn1cblxuZnVuY3Rpb24gYWRqdXN0TG9vcFZhciAoaSwgZGVkdXBlKSB7XG4gIHJldHVybiBkZWR1cGUgPyBpIC0gMSA6IGkgKyAxXG59XG5cbmZ1bmN0aW9uIGNoZWNrTG9vcFZhciAoaSwgbGVuZ3RoLCBkZWR1cGUpIHtcbiAgcmV0dXJuIGRlZHVwZSA/IGkgPj0gMCA6IGkgPCBsZW5ndGhcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtdWx0aXN0cmVhbVxuIiwgIlxuICAgICAgICAgIGZ1bmN0aW9uIHBpbm9CdW5kbGVyQWJzb2x1dGVQYXRoKHApIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG4gICAgICAgICAgICAgIC8vIEFsd2F5cyByZXNvbHZlIHRvIHRoZSBhYnNvbHV0ZSBvdXRwdXQgZGlyZWN0b3J5IHdoZXJlIHdvcmtlciBmaWxlcyBhcmUgbG9jYXRlZFxuICAgICAgICAgICAgICBjb25zdCBvdXRwdXREaXIgPSBcIkM6XFxcXFVzZXJzXFxcXEFkbWluXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcMzFzdGZpbGUgY29udGVudFxcXFxhcGlcIjtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhdGgucmVzb2x2ZShvdXRwdXREaXIsIHAucmVwbGFjZSgvXlxcLlxcLy8sICcnKSk7XG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgLy8gRVNNIGZhbGxiYWNrOiByZXNvbHZlIHJlbGF0aXZlIHRvIHRoaXMgYnVuZGxlJ3MgbG9jYXRpb24gIFxuICAgICAgICAgICAgICBjb25zdCBmID0gbmV3IEZ1bmN0aW9uKCdwJywgJ3JldHVybiBuZXcgVVJMKHAsIGltcG9ydC5tZXRhLnVybCkucGF0aG5hbWUnKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGYocCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICBnbG9iYWxUaGlzLl9fYnVuZGxlclBhdGhzT3ZlcnJpZGVzID0geyAuLi4oZ2xvYmFsVGhpcy5fX2J1bmRsZXJQYXRoc092ZXJyaWRlcyB8fCB7fSksICd0aHJlYWQtc3RyZWFtLXdvcmtlcic6IHBpbm9CdW5kbGVyQWJzb2x1dGVQYXRoKCcuL3RocmVhZC1zdHJlYW0td29ya2VyLmpzJyksJ3Bpbm8td29ya2VyJzogcGlub0J1bmRsZXJBYnNvbHV0ZVBhdGgoJy4vcGluby13b3JrZXIuanMnKSwncGluby9maWxlJzogcGlub0J1bmRsZXJBYnNvbHV0ZVBhdGgoJy4vcGluby1maWxlLmpzJyksJ3Bpbm8tcHJldHR5JzogcGlub0J1bmRsZXJBYnNvbHV0ZVBhdGgoJy4vcGluby1wcmV0dHkuanMnKX1cbiAgICAgICAgJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IG9zID0gcmVxdWlyZSgnbm9kZTpvcycpXG5jb25zdCBzdGRTZXJpYWxpemVycyA9IHJlcXVpcmUoJ3Bpbm8tc3RkLXNlcmlhbGl6ZXJzJylcbmNvbnN0IGNhbGxlciA9IHJlcXVpcmUoJy4vbGliL2NhbGxlcicpXG5jb25zdCByZWRhY3Rpb24gPSByZXF1aXJlKCcuL2xpYi9yZWRhY3Rpb24nKVxuY29uc3QgdGltZSA9IHJlcXVpcmUoJy4vbGliL3RpbWUnKVxuY29uc3QgcHJvdG8gPSByZXF1aXJlKCcuL2xpYi9wcm90bycpXG5jb25zdCBzeW1ib2xzID0gcmVxdWlyZSgnLi9saWIvc3ltYm9scycpXG5jb25zdCB7IGNvbmZpZ3VyZSB9ID0gcmVxdWlyZSgnc2FmZS1zdGFibGUtc3RyaW5naWZ5JylcbmNvbnN0IHsgYXNzZXJ0RGVmYXVsdExldmVsRm91bmQsIG1hcHBpbmdzLCBnZW5Mc0NhY2hlLCBnZW5MZXZlbENvbXBhcmlzb24sIGFzc2VydExldmVsQ29tcGFyaXNvbiB9ID0gcmVxdWlyZSgnLi9saWIvbGV2ZWxzJylcbmNvbnN0IHsgREVGQVVMVF9MRVZFTFMsIFNPUlRJTkdfT1JERVIgfSA9IHJlcXVpcmUoJy4vbGliL2NvbnN0YW50cycpXG5jb25zdCB7XG4gIGNyZWF0ZUFyZ3NOb3JtYWxpemVyLFxuICBhc0NoaW5kaW5ncyxcbiAgYnVpbGRTYWZlU29uaWNCb29tLFxuICBidWlsZEZvcm1hdHRlcnMsXG4gIHN0cmluZ2lmeSxcbiAgbm9ybWFsaXplRGVzdEZpbGVEZXNjcmlwdG9yLFxuICBub29wXG59ID0gcmVxdWlyZSgnLi9saWIvdG9vbHMnKVxuY29uc3QgeyB2ZXJzaW9uIH0gPSByZXF1aXJlKCcuL2xpYi9tZXRhJylcbmNvbnN0IHtcbiAgY2hpbmRpbmdzU3ltLFxuICByZWRhY3RGbXRTeW0sXG4gIHNlcmlhbGl6ZXJzU3ltLFxuICB0aW1lU3ltLFxuICB0aW1lU2xpY2VJbmRleFN5bSxcbiAgc3RyZWFtU3ltLFxuICBzdHJpbmdpZnlTeW0sXG4gIHN0cmluZ2lmeVNhZmVTeW0sXG4gIHN0cmluZ2lmaWVyc1N5bSxcbiAgc2V0TGV2ZWxTeW0sXG4gIGVuZFN5bSxcbiAgZm9ybWF0T3B0c1N5bSxcbiAgbWVzc2FnZUtleVN5bSxcbiAgZXJyb3JLZXlTeW0sXG4gIG5lc3RlZEtleVN5bSxcbiAgbWl4aW5TeW0sXG4gIGxldmVsQ29tcFN5bSxcbiAgdXNlT25seUN1c3RvbUxldmVsc1N5bSxcbiAgZm9ybWF0dGVyc1N5bSxcbiAgaG9va3NTeW0sXG4gIG5lc3RlZEtleVN0clN5bSxcbiAgbWl4aW5NZXJnZVN0cmF0ZWd5U3ltLFxuICBtc2dQcmVmaXhTeW1cbn0gPSBzeW1ib2xzXG5jb25zdCB7IGVwb2NoVGltZSwgbnVsbFRpbWUgfSA9IHRpbWVcbmNvbnN0IHsgcGlkIH0gPSBwcm9jZXNzXG5jb25zdCBob3N0bmFtZSA9IG9zLmhvc3RuYW1lKClcbmNvbnN0IGRlZmF1bHRFcnJvclNlcmlhbGl6ZXIgPSBzdGRTZXJpYWxpemVycy5lcnJcbmNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICBsZXZlbDogJ2luZm8nLFxuICBsZXZlbENvbXBhcmlzb246IFNPUlRJTkdfT1JERVIuQVNDLFxuICBsZXZlbHM6IERFRkFVTFRfTEVWRUxTLFxuICBtZXNzYWdlS2V5OiAnbXNnJyxcbiAgZXJyb3JLZXk6ICdlcnInLFxuICBuZXN0ZWRLZXk6IG51bGwsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIGJhc2U6IHsgcGlkLCBob3N0bmFtZSB9LFxuICBzZXJpYWxpemVyczogT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKG51bGwpLCB7XG4gICAgZXJyOiBkZWZhdWx0RXJyb3JTZXJpYWxpemVyXG4gIH0pLFxuICBmb3JtYXR0ZXJzOiBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUobnVsbCksIHtcbiAgICBiaW5kaW5ncyAoYmluZGluZ3MpIHtcbiAgICAgIHJldHVybiBiaW5kaW5nc1xuICAgIH0sXG4gICAgbGV2ZWwgKGxhYmVsLCBudW1iZXIpIHtcbiAgICAgIHJldHVybiB7IGxldmVsOiBudW1iZXIgfVxuICAgIH1cbiAgfSksXG4gIGhvb2tzOiB7XG4gICAgbG9nTWV0aG9kOiB1bmRlZmluZWQsXG4gICAgc3RyZWFtV3JpdGU6IHVuZGVmaW5lZFxuICB9LFxuICB0aW1lc3RhbXA6IGVwb2NoVGltZSxcbiAgbmFtZTogdW5kZWZpbmVkLFxuICByZWRhY3Q6IG51bGwsXG4gIGN1c3RvbUxldmVsczogbnVsbCxcbiAgdXNlT25seUN1c3RvbUxldmVsczogZmFsc2UsXG4gIGRlcHRoTGltaXQ6IDUsXG4gIGVkZ2VMaW1pdDogMTAwXG59XG5cbmNvbnN0IG5vcm1hbGl6ZSA9IGNyZWF0ZUFyZ3NOb3JtYWxpemVyKGRlZmF1bHRPcHRpb25zKVxuXG5jb25zdCBzZXJpYWxpemVycyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShudWxsKSwgc3RkU2VyaWFsaXplcnMpXG5cbmZ1bmN0aW9uIHBpbm8gKC4uLmFyZ3MpIHtcbiAgY29uc3QgaW5zdGFuY2UgPSB7fVxuICBjb25zdCB7IG9wdHMsIHN0cmVhbSB9ID0gbm9ybWFsaXplKGluc3RhbmNlLCBjYWxsZXIoKSwgLi4uYXJncylcblxuICBpZiAob3B0cy5sZXZlbCAmJiB0eXBlb2Ygb3B0cy5sZXZlbCA9PT0gJ3N0cmluZycgJiYgREVGQVVMVF9MRVZFTFNbb3B0cy5sZXZlbC50b0xvd2VyQ2FzZSgpXSAhPT0gdW5kZWZpbmVkKSBvcHRzLmxldmVsID0gb3B0cy5sZXZlbC50b0xvd2VyQ2FzZSgpXG5cbiAgY29uc3Qge1xuICAgIHJlZGFjdCxcbiAgICBjcmxmLFxuICAgIHNlcmlhbGl6ZXJzLFxuICAgIHRpbWVzdGFtcCxcbiAgICBtZXNzYWdlS2V5LFxuICAgIGVycm9yS2V5LFxuICAgIG5lc3RlZEtleSxcbiAgICBiYXNlLFxuICAgIG5hbWUsXG4gICAgbGV2ZWwsXG4gICAgY3VzdG9tTGV2ZWxzLFxuICAgIGxldmVsQ29tcGFyaXNvbixcbiAgICBtaXhpbixcbiAgICBtaXhpbk1lcmdlU3RyYXRlZ3ksXG4gICAgdXNlT25seUN1c3RvbUxldmVscyxcbiAgICBmb3JtYXR0ZXJzLFxuICAgIGhvb2tzLFxuICAgIGRlcHRoTGltaXQsXG4gICAgZWRnZUxpbWl0LFxuICAgIG9uQ2hpbGQsXG4gICAgbXNnUHJlZml4XG4gIH0gPSBvcHRzXG5cbiAgY29uc3Qgc3RyaW5naWZ5U2FmZSA9IGNvbmZpZ3VyZSh7XG4gICAgbWF4aW11bURlcHRoOiBkZXB0aExpbWl0LFxuICAgIG1heGltdW1CcmVhZHRoOiBlZGdlTGltaXRcbiAgfSlcblxuICBjb25zdCBhbGxGb3JtYXR0ZXJzID0gYnVpbGRGb3JtYXR0ZXJzKFxuICAgIGZvcm1hdHRlcnMubGV2ZWwsXG4gICAgZm9ybWF0dGVycy5iaW5kaW5ncyxcbiAgICBmb3JtYXR0ZXJzLmxvZ1xuICApXG5cbiAgY29uc3Qgc3RyaW5naWZ5Rm4gPSBzdHJpbmdpZnkuYmluZCh7XG4gICAgW3N0cmluZ2lmeVNhZmVTeW1dOiBzdHJpbmdpZnlTYWZlXG4gIH0pXG4gIGNvbnN0IHN0cmluZ2lmaWVycyA9IHJlZGFjdCA/IHJlZGFjdGlvbihyZWRhY3QsIHN0cmluZ2lmeUZuKSA6IHt9XG4gIGNvbnN0IGZvcm1hdE9wdHMgPSByZWRhY3RcbiAgICA/IHsgc3RyaW5naWZ5OiBzdHJpbmdpZmllcnNbcmVkYWN0Rm10U3ltXSB9XG4gICAgOiB7IHN0cmluZ2lmeTogc3RyaW5naWZ5Rm4gfVxuICBjb25zdCBlbmQgPSAnfScgKyAoY3JsZiA/ICdcXHJcXG4nIDogJ1xcbicpXG4gIGNvbnN0IGNvcmVDaGluZGluZ3MgPSBhc0NoaW5kaW5ncy5iaW5kKG51bGwsIHtcbiAgICBbY2hpbmRpbmdzU3ltXTogJycsXG4gICAgW3NlcmlhbGl6ZXJzU3ltXTogc2VyaWFsaXplcnMsXG4gICAgW3N0cmluZ2lmaWVyc1N5bV06IHN0cmluZ2lmaWVycyxcbiAgICBbc3RyaW5naWZ5U3ltXTogc3RyaW5naWZ5LFxuICAgIFtzdHJpbmdpZnlTYWZlU3ltXTogc3RyaW5naWZ5U2FmZSxcbiAgICBbZm9ybWF0dGVyc1N5bV06IGFsbEZvcm1hdHRlcnNcbiAgfSlcblxuICBsZXQgY2hpbmRpbmdzID0gJydcbiAgaWYgKGJhc2UgIT09IG51bGwpIHtcbiAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjaGluZGluZ3MgPSBjb3JlQ2hpbmRpbmdzKGJhc2UpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNoaW5kaW5ncyA9IGNvcmVDaGluZGluZ3MoT2JqZWN0LmFzc2lnbih7fSwgYmFzZSwgeyBuYW1lIH0pKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHRpbWUgPSAodGltZXN0YW1wIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgPyB0aW1lc3RhbXBcbiAgICA6ICh0aW1lc3RhbXAgPyBlcG9jaFRpbWUgOiBudWxsVGltZSlcbiAgY29uc3QgdGltZVNsaWNlSW5kZXggPSB0aW1lKCkuaW5kZXhPZignOicpICsgMVxuXG4gIGlmICh1c2VPbmx5Q3VzdG9tTGV2ZWxzICYmICFjdXN0b21MZXZlbHMpIHRocm93IEVycm9yKCdjdXN0b21MZXZlbHMgaXMgcmVxdWlyZWQgaWYgdXNlT25seUN1c3RvbUxldmVscyBpcyBzZXQgdHJ1ZScpXG4gIGlmIChtaXhpbiAmJiB0eXBlb2YgbWl4aW4gIT09ICdmdW5jdGlvbicpIHRocm93IEVycm9yKGBVbmtub3duIG1peGluIHR5cGUgXCIke3R5cGVvZiBtaXhpbn1cIiAtIGV4cGVjdGVkIFwiZnVuY3Rpb25cImApXG4gIGlmIChtc2dQcmVmaXggJiYgdHlwZW9mIG1zZ1ByZWZpeCAhPT0gJ3N0cmluZycpIHRocm93IEVycm9yKGBVbmtub3duIG1zZ1ByZWZpeCB0eXBlIFwiJHt0eXBlb2YgbXNnUHJlZml4fVwiIC0gZXhwZWN0ZWQgXCJzdHJpbmdcImApXG5cbiAgYXNzZXJ0RGVmYXVsdExldmVsRm91bmQobGV2ZWwsIGN1c3RvbUxldmVscywgdXNlT25seUN1c3RvbUxldmVscylcbiAgY29uc3QgbGV2ZWxzID0gbWFwcGluZ3MoY3VzdG9tTGV2ZWxzLCB1c2VPbmx5Q3VzdG9tTGV2ZWxzKVxuXG4gIGlmICh0eXBlb2Ygc3RyZWFtLmVtaXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBzdHJlYW0uZW1pdCgnbWVzc2FnZScsIHsgY29kZTogJ1BJTk9fQ09ORklHJywgY29uZmlnOiB7IGxldmVscywgbWVzc2FnZUtleSwgZXJyb3JLZXkgfSB9KVxuICB9XG5cbiAgYXNzZXJ0TGV2ZWxDb21wYXJpc29uKGxldmVsQ29tcGFyaXNvbilcbiAgY29uc3QgbGV2ZWxDb21wRnVuYyA9IGdlbkxldmVsQ29tcGFyaXNvbihsZXZlbENvbXBhcmlzb24pXG5cbiAgT2JqZWN0LmFzc2lnbihpbnN0YW5jZSwge1xuICAgIGxldmVscyxcbiAgICBbbGV2ZWxDb21wU3ltXTogbGV2ZWxDb21wRnVuYyxcbiAgICBbdXNlT25seUN1c3RvbUxldmVsc1N5bV06IHVzZU9ubHlDdXN0b21MZXZlbHMsXG4gICAgW3N0cmVhbVN5bV06IHN0cmVhbSxcbiAgICBbdGltZVN5bV06IHRpbWUsXG4gICAgW3RpbWVTbGljZUluZGV4U3ltXTogdGltZVNsaWNlSW5kZXgsXG4gICAgW3N0cmluZ2lmeVN5bV06IHN0cmluZ2lmeSxcbiAgICBbc3RyaW5naWZ5U2FmZVN5bV06IHN0cmluZ2lmeVNhZmUsXG4gICAgW3N0cmluZ2lmaWVyc1N5bV06IHN0cmluZ2lmaWVycyxcbiAgICBbZW5kU3ltXTogZW5kLFxuICAgIFtmb3JtYXRPcHRzU3ltXTogZm9ybWF0T3B0cyxcbiAgICBbbWVzc2FnZUtleVN5bV06IG1lc3NhZ2VLZXksXG4gICAgW2Vycm9yS2V5U3ltXTogZXJyb3JLZXksXG4gICAgW25lc3RlZEtleVN5bV06IG5lc3RlZEtleSxcbiAgICAvLyBwcm90ZWN0IGFnYWluc3QgaW5qZWN0aW9uXG4gICAgW25lc3RlZEtleVN0clN5bV06IG5lc3RlZEtleSA/IGAsJHtKU09OLnN0cmluZ2lmeShuZXN0ZWRLZXkpfTp7YCA6ICcnLFxuICAgIFtzZXJpYWxpemVyc1N5bV06IHNlcmlhbGl6ZXJzLFxuICAgIFttaXhpblN5bV06IG1peGluLFxuICAgIFttaXhpbk1lcmdlU3RyYXRlZ3lTeW1dOiBtaXhpbk1lcmdlU3RyYXRlZ3ksXG4gICAgW2NoaW5kaW5nc1N5bV06IGNoaW5kaW5ncyxcbiAgICBbZm9ybWF0dGVyc1N5bV06IGFsbEZvcm1hdHRlcnMsXG4gICAgW2hvb2tzU3ltXTogaG9va3MsXG4gICAgc2lsZW50OiBub29wLFxuICAgIG9uQ2hpbGQsXG4gICAgW21zZ1ByZWZpeFN5bV06IG1zZ1ByZWZpeFxuICB9KVxuXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihpbnN0YW5jZSwgcHJvdG8oKSlcblxuICBnZW5Mc0NhY2hlKGluc3RhbmNlKVxuXG4gIGluc3RhbmNlW3NldExldmVsU3ltXShsZXZlbClcblxuICByZXR1cm4gaW5zdGFuY2Vcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwaW5vXG5cbm1vZHVsZS5leHBvcnRzLmRlc3RpbmF0aW9uID0gKGRlc3QgPSBwcm9jZXNzLnN0ZG91dC5mZCkgPT4ge1xuICBpZiAodHlwZW9mIGRlc3QgPT09ICdvYmplY3QnKSB7XG4gICAgZGVzdC5kZXN0ID0gbm9ybWFsaXplRGVzdEZpbGVEZXNjcmlwdG9yKGRlc3QuZGVzdCB8fCBwcm9jZXNzLnN0ZG91dC5mZClcbiAgICByZXR1cm4gYnVpbGRTYWZlU29uaWNCb29tKGRlc3QpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJ1aWxkU2FmZVNvbmljQm9vbSh7IGRlc3Q6IG5vcm1hbGl6ZURlc3RGaWxlRGVzY3JpcHRvcihkZXN0KSwgbWluTGVuZ3RoOiAwIH0pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMudHJhbnNwb3J0ID0gcmVxdWlyZSgnLi9saWIvdHJhbnNwb3J0Jylcbm1vZHVsZS5leHBvcnRzLm11bHRpc3RyZWFtID0gcmVxdWlyZSgnLi9saWIvbXVsdGlzdHJlYW0nKVxuXG5tb2R1bGUuZXhwb3J0cy5sZXZlbHMgPSBtYXBwaW5ncygpXG5tb2R1bGUuZXhwb3J0cy5zdGRTZXJpYWxpemVycyA9IHNlcmlhbGl6ZXJzXG5tb2R1bGUuZXhwb3J0cy5zdGRUaW1lRnVuY3Rpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGltZSlcbm1vZHVsZS5leHBvcnRzLnN5bWJvbHMgPSBzeW1ib2xzXG5tb2R1bGUuZXhwb3J0cy52ZXJzaW9uID0gdmVyc2lvblxuXG4vLyBFbmFibGVzIGRlZmF1bHQgYW5kIG5hbWUgZXhwb3J0IHdpdGggVHlwZVNjcmlwdCBhbmQgQmFiZWxcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBwaW5vXG5tb2R1bGUuZXhwb3J0cy5waW5vID0gcGlub1xuIiwgIi8qXG5Db3B5cmlnaHQgKGMpIDIwMTQtMjAyMSwgTWF0dGVvIENvbGxpbmEgPGhlbGxvQG1hdHRlb2NvbGxpbmEuY29tPlxuXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZCwgcHJvdmlkZWQgdGhhdCB0aGUgYWJvdmVcbmNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2UgYXBwZWFyIGluIGFsbCBjb3BpZXMuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTXG5XSVRIIFJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GXG5NRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUlxuQU5ZIFNQRUNJQUwsIERJUkVDVCwgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFU1xuV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTSBMT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOXG5BQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1IgT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUlxuSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1IgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cbiovXG5cbid1c2Ugc3RyaWN0J1xuXG5jb25zdCB7IFRyYW5zZm9ybSB9ID0gcmVxdWlyZSgnc3RyZWFtJylcbmNvbnN0IHsgU3RyaW5nRGVjb2RlciB9ID0gcmVxdWlyZSgnc3RyaW5nX2RlY29kZXInKVxuY29uc3Qga0xhc3QgPSBTeW1ib2woJ2xhc3QnKVxuY29uc3Qga0RlY29kZXIgPSBTeW1ib2woJ2RlY29kZXInKVxuXG5mdW5jdGlvbiB0cmFuc2Zvcm0gKGNodW5rLCBlbmMsIGNiKSB7XG4gIGxldCBsaXN0XG4gIGlmICh0aGlzLm92ZXJmbG93KSB7IC8vIExpbmUgYnVmZmVyIGlzIGZ1bGwuIFNraXAgdG8gc3RhcnQgb2YgbmV4dCBsaW5lLlxuICAgIGNvbnN0IGJ1ZiA9IHRoaXNba0RlY29kZXJdLndyaXRlKGNodW5rKVxuICAgIGxpc3QgPSBidWYuc3BsaXQodGhpcy5tYXRjaGVyKVxuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSByZXR1cm4gY2IoKSAvLyBMaW5lIGVuZGluZyBub3QgZm91bmQuIERpc2NhcmQgZW50aXJlIGNodW5rLlxuXG4gICAgLy8gTGluZSBlbmRpbmcgZm91bmQuIERpc2NhcmQgdHJhaWxpbmcgZnJhZ21lbnQgb2YgcHJldmlvdXMgbGluZSBhbmQgcmVzZXQgb3ZlcmZsb3cgc3RhdGUuXG4gICAgbGlzdC5zaGlmdCgpXG4gICAgdGhpcy5vdmVyZmxvdyA9IGZhbHNlXG4gIH0gZWxzZSB7XG4gICAgdGhpc1trTGFzdF0gKz0gdGhpc1trRGVjb2Rlcl0ud3JpdGUoY2h1bmspXG4gICAgbGlzdCA9IHRoaXNba0xhc3RdLnNwbGl0KHRoaXMubWF0Y2hlcilcbiAgfVxuXG4gIHRoaXNba0xhc3RdID0gbGlzdC5wb3AoKVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHRyeSB7XG4gICAgICBwdXNoKHRoaXMsIHRoaXMubWFwcGVyKGxpc3RbaV0pKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gY2IoZXJyb3IpXG4gICAgfVxuICB9XG5cbiAgdGhpcy5vdmVyZmxvdyA9IHRoaXNba0xhc3RdLmxlbmd0aCA+IHRoaXMubWF4TGVuZ3RoXG4gIGlmICh0aGlzLm92ZXJmbG93ICYmICF0aGlzLnNraXBPdmVyZmxvdykge1xuICAgIGNiKG5ldyBFcnJvcignbWF4aW11bSBidWZmZXIgcmVhY2hlZCcpKVxuICAgIHJldHVyblxuICB9XG5cbiAgY2IoKVxufVxuXG5mdW5jdGlvbiBmbHVzaCAoY2IpIHtcbiAgLy8gZm9yd2FyZCBhbnkgZ2liYmVyaXNoIGxlZnQgaW4gdGhlcmVcbiAgdGhpc1trTGFzdF0gKz0gdGhpc1trRGVjb2Rlcl0uZW5kKClcblxuICBpZiAodGhpc1trTGFzdF0pIHtcbiAgICB0cnkge1xuICAgICAgcHVzaCh0aGlzLCB0aGlzLm1hcHBlcih0aGlzW2tMYXN0XSkpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBjYihlcnJvcilcbiAgICB9XG4gIH1cblxuICBjYigpXG59XG5cbmZ1bmN0aW9uIHB1c2ggKHNlbGYsIHZhbCkge1xuICBpZiAodmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICBzZWxmLnB1c2godmFsKVxuICB9XG59XG5cbmZ1bmN0aW9uIG5vb3AgKGluY29taW5nKSB7XG4gIHJldHVybiBpbmNvbWluZ1xufVxuXG5mdW5jdGlvbiBzcGxpdCAobWF0Y2hlciwgbWFwcGVyLCBvcHRpb25zKSB7XG4gIC8vIFNldCBkZWZhdWx0cyBmb3IgYW55IGFyZ3VtZW50cyBub3Qgc3VwcGxpZWQuXG4gIG1hdGNoZXIgPSBtYXRjaGVyIHx8IC9cXHI/XFxuL1xuICBtYXBwZXIgPSBtYXBwZXIgfHwgbm9vcFxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gIC8vIFRlc3QgYXJndW1lbnRzIGV4cGxpY2l0bHkuXG4gIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGNhc2UgMTpcbiAgICAgIC8vIElmIG1hcHBlciBpcyBvbmx5IGFyZ3VtZW50LlxuICAgICAgaWYgKHR5cGVvZiBtYXRjaGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG1hcHBlciA9IG1hdGNoZXJcbiAgICAgICAgbWF0Y2hlciA9IC9cXHI/XFxuL1xuICAgICAgLy8gSWYgb3B0aW9ucyBpcyBvbmx5IGFyZ3VtZW50LlxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWF0Y2hlciA9PT0gJ29iamVjdCcgJiYgIShtYXRjaGVyIGluc3RhbmNlb2YgUmVnRXhwKSAmJiAhbWF0Y2hlcltTeW1ib2wuc3BsaXRdKSB7XG4gICAgICAgIG9wdGlvbnMgPSBtYXRjaGVyXG4gICAgICAgIG1hdGNoZXIgPSAvXFxyP1xcbi9cbiAgICAgIH1cbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlIDI6XG4gICAgICAvLyBJZiBtYXBwZXIgYW5kIG9wdGlvbnMgYXJlIGFyZ3VtZW50cy5cbiAgICAgIGlmICh0eXBlb2YgbWF0Y2hlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvcHRpb25zID0gbWFwcGVyXG4gICAgICAgIG1hcHBlciA9IG1hdGNoZXJcbiAgICAgICAgbWF0Y2hlciA9IC9cXHI/XFxuL1xuICAgICAgLy8gSWYgbWF0Y2hlciBhbmQgb3B0aW9ucyBhcmUgYXJndW1lbnRzLlxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWFwcGVyID09PSAnb2JqZWN0Jykge1xuICAgICAgICBvcHRpb25zID0gbWFwcGVyXG4gICAgICAgIG1hcHBlciA9IG5vb3BcbiAgICAgIH1cbiAgfVxuXG4gIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKVxuICBvcHRpb25zLmF1dG9EZXN0cm95ID0gdHJ1ZVxuICBvcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuICBvcHRpb25zLmZsdXNoID0gZmx1c2hcbiAgb3B0aW9ucy5yZWFkYWJsZU9iamVjdE1vZGUgPSB0cnVlXG5cbiAgY29uc3Qgc3RyZWFtID0gbmV3IFRyYW5zZm9ybShvcHRpb25zKVxuXG4gIHN0cmVhbVtrTGFzdF0gPSAnJ1xuICBzdHJlYW1ba0RlY29kZXJdID0gbmV3IFN0cmluZ0RlY29kZXIoJ3V0ZjgnKVxuICBzdHJlYW0ubWF0Y2hlciA9IG1hdGNoZXJcbiAgc3RyZWFtLm1hcHBlciA9IG1hcHBlclxuICBzdHJlYW0ubWF4TGVuZ3RoID0gb3B0aW9ucy5tYXhMZW5ndGhcbiAgc3RyZWFtLnNraXBPdmVyZmxvdyA9IG9wdGlvbnMuc2tpcE92ZXJmbG93IHx8IGZhbHNlXG4gIHN0cmVhbS5vdmVyZmxvdyA9IGZhbHNlXG4gIHN0cmVhbS5fZGVzdHJveSA9IGZ1bmN0aW9uIChlcnIsIGNiKSB7XG4gICAgLy8gV2VpcmQgTm9kZSB2MTIgYnVnIHRoYXQgd2UgbmVlZCB0byB3b3JrIGFyb3VuZFxuICAgIHRoaXMuX3dyaXRhYmxlU3RhdGUuZXJyb3JFbWl0dGVkID0gZmFsc2VcbiAgICBjYihlcnIpXG4gIH1cblxuICByZXR1cm4gc3RyZWFtXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3BsaXRcbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgbWV0YWRhdGEgPSBTeW1ib2wuZm9yKCdwaW5vLm1ldGFkYXRhJylcbmNvbnN0IHNwbGl0ID0gcmVxdWlyZSgnc3BsaXQyJylcbmNvbnN0IHsgRHVwbGV4IH0gPSByZXF1aXJlKCdzdHJlYW0nKVxuY29uc3QgeyBwYXJlbnRQb3J0LCB3b3JrZXJEYXRhIH0gPSByZXF1aXJlKCd3b3JrZXJfdGhyZWFkcycpXG5cbmZ1bmN0aW9uIGNyZWF0ZURlZmVycmVkICgpIHtcbiAgbGV0IHJlc29sdmVcbiAgbGV0IHJlamVjdFxuICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKF9yZXNvbHZlLCBfcmVqZWN0KSA9PiB7XG4gICAgcmVzb2x2ZSA9IF9yZXNvbHZlXG4gICAgcmVqZWN0ID0gX3JlamVjdFxuICB9KVxuICBwcm9taXNlLnJlc29sdmUgPSByZXNvbHZlXG4gIHByb21pc2UucmVqZWN0ID0gcmVqZWN0XG4gIHJldHVybiBwcm9taXNlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGQgKGZuLCBvcHRzID0ge30pIHtcbiAgY29uc3Qgd2FpdEZvckNvbmZpZyA9IG9wdHMuZXhwZWN0UGlub0NvbmZpZyA9PT0gdHJ1ZSAmJiB3b3JrZXJEYXRhPy53b3JrZXJEYXRhPy5waW5vV2lsbFNlbmRDb25maWcgPT09IHRydWVcbiAgY29uc3QgcGFyc2VMaW5lcyA9IG9wdHMucGFyc2UgPT09ICdsaW5lcydcbiAgY29uc3QgcGFyc2VMaW5lID0gdHlwZW9mIG9wdHMucGFyc2VMaW5lID09PSAnZnVuY3Rpb24nID8gb3B0cy5wYXJzZUxpbmUgOiBKU09OLnBhcnNlXG4gIGNvbnN0IGNsb3NlID0gb3B0cy5jbG9zZSB8fCBkZWZhdWx0Q2xvc2VcbiAgY29uc3Qgc3RyZWFtID0gc3BsaXQoZnVuY3Rpb24gKGxpbmUpIHtcbiAgICBsZXQgdmFsdWVcblxuICAgIHRyeSB7XG4gICAgICB2YWx1ZSA9IHBhcnNlTGluZShsaW5lKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLmVtaXQoJ3Vua25vd24nLCBsaW5lLCBlcnJvcilcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5lbWl0KCd1bmtub3duJywgbGluZSwgJ051bGwgdmFsdWUgaWdub3JlZCcpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgdmFsdWUgPSB7XG4gICAgICAgIGRhdGE6IHZhbHVlLFxuICAgICAgICB0aW1lOiBEYXRlLm5vdygpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN0cmVhbVttZXRhZGF0YV0pIHtcbiAgICAgIHN0cmVhbS5sYXN0VGltZSA9IHZhbHVlLnRpbWVcbiAgICAgIHN0cmVhbS5sYXN0TGV2ZWwgPSB2YWx1ZS5sZXZlbFxuICAgICAgc3RyZWFtLmxhc3RPYmogPSB2YWx1ZVxuICAgIH1cblxuICAgIGlmIChwYXJzZUxpbmVzKSB7XG4gICAgICByZXR1cm4gbGluZVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZVxuICB9LCB7IGF1dG9EZXN0cm95OiB0cnVlIH0pXG5cbiAgc3RyZWFtLl9kZXN0cm95ID0gZnVuY3Rpb24gKGVyciwgY2IpIHtcbiAgICBjb25zdCBwcm9taXNlID0gY2xvc2UoZXJyLCBjYilcbiAgICBpZiAocHJvbWlzZSAmJiB0eXBlb2YgcHJvbWlzZS50aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBwcm9taXNlLnRoZW4oY2IsIGNiKVxuICAgIH1cbiAgfVxuXG4gIGlmIChvcHRzLmV4cGVjdFBpbm9Db25maWcgPT09IHRydWUgJiYgd29ya2VyRGF0YT8ud29ya2VyRGF0YT8ucGlub1dpbGxTZW5kQ29uZmlnICE9PSB0cnVlKSB7XG4gICAgc2V0SW1tZWRpYXRlKCgpID0+IHtcbiAgICAgIHN0cmVhbS5lbWl0KCdlcnJvcicsIG5ldyBFcnJvcignVGhpcyB0cmFuc3BvcnQgaXMgbm90IGNvbXBhdGlibGUgd2l0aCB0aGUgY3VycmVudCB2ZXJzaW9uIG9mIHBpbm8uIFBsZWFzZSB1cGdyYWRlIHBpbm8gdG8gdGhlIGxhdGVzdCB2ZXJzaW9uLicpKVxuICAgIH0pXG4gIH1cblxuICBpZiAob3B0cy5tZXRhZGF0YSAhPT0gZmFsc2UpIHtcbiAgICBzdHJlYW1bbWV0YWRhdGFdID0gdHJ1ZVxuICAgIHN0cmVhbS5sYXN0VGltZSA9IDBcbiAgICBzdHJlYW0ubGFzdExldmVsID0gMFxuICAgIHN0cmVhbS5sYXN0T2JqID0gbnVsbFxuICB9XG5cbiAgaWYgKHdhaXRGb3JDb25maWcpIHtcbiAgICBsZXQgcGlub0NvbmZpZyA9IHt9XG4gICAgY29uc3QgY29uZmlnUmVjZWl2ZWQgPSBjcmVhdGVEZWZlcnJlZCgpXG4gICAgcGFyZW50UG9ydC5vbignbWVzc2FnZScsIGZ1bmN0aW9uIGhhbmRsZU1lc3NhZ2UgKG1lc3NhZ2UpIHtcbiAgICAgIGlmIChtZXNzYWdlLmNvZGUgPT09ICdQSU5PX0NPTkZJRycpIHtcbiAgICAgICAgcGlub0NvbmZpZyA9IG1lc3NhZ2UuY29uZmlnXG4gICAgICAgIGNvbmZpZ1JlY2VpdmVkLnJlc29sdmUoKVxuICAgICAgICBwYXJlbnRQb3J0Lm9mZignbWVzc2FnZScsIGhhbmRsZU1lc3NhZ2UpXG4gICAgICB9XG4gICAgfSlcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHN0cmVhbSwge1xuICAgICAgbGV2ZWxzOiB7XG4gICAgICAgIGdldCAoKSB7IHJldHVybiBwaW5vQ29uZmlnLmxldmVscyB9XG4gICAgICB9LFxuICAgICAgbWVzc2FnZUtleToge1xuICAgICAgICBnZXQgKCkgeyByZXR1cm4gcGlub0NvbmZpZy5tZXNzYWdlS2V5IH1cbiAgICAgIH0sXG4gICAgICBlcnJvcktleToge1xuICAgICAgICBnZXQgKCkgeyByZXR1cm4gcGlub0NvbmZpZy5lcnJvcktleSB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBjb25maWdSZWNlaXZlZC50aGVuKGZpbmlzaClcbiAgfVxuXG4gIHJldHVybiBmaW5pc2goKVxuXG4gIGZ1bmN0aW9uIGZpbmlzaCAoKSB7XG4gICAgbGV0IHJlcyA9IGZuKHN0cmVhbSlcblxuICAgIGlmIChyZXMgJiYgdHlwZW9mIHJlcy5jYXRjaCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVzLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgc3RyZWFtLmRlc3Ryb3koZXJyKVxuICAgICAgfSlcblxuICAgICAgLy8gc2V0IGl0IHRvIG51bGwgdG8gbm90IHJldGFpbiBhIHJlZmVyZW5jZSB0byB0aGUgcHJvbWlzZVxuICAgICAgcmVzID0gbnVsbFxuICAgIH0gZWxzZSBpZiAob3B0cy5lbmFibGVQaXBlbGluaW5nICYmIHJlcykge1xuICAgICAgcmV0dXJuIER1cGxleC5mcm9tKHsgd3JpdGFibGU6IHN0cmVhbSwgcmVhZGFibGU6IHJlcyB9KVxuICAgIH1cblxuICAgIHJldHVybiBzdHJlYW1cbiAgfVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0Q2xvc2UgKGVyciwgY2IpIHtcbiAgcHJvY2Vzcy5uZXh0VGljayhjYiwgZXJyKVxufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIG5vLW5ldy1mdW5jLCBjYW1lbGNhc2UgKi9cbi8qIGdsb2JhbHMgX19ub25fd2VicGFja19fcmVxdWlyZV9fICovXG5cbmNvbnN0IHJlYWxJbXBvcnQgPSBuZXcgRnVuY3Rpb24oJ21vZHVsZVBhdGgnLCAncmV0dXJuIGltcG9ydChtb2R1bGVQYXRoKScpXG5cbmZ1bmN0aW9uIHJlYWxSZXF1aXJlKG1vZHVsZVBhdGgpIHtcbiAgaWYgKHR5cGVvZiBfX25vbl93ZWJwYWNrX19yZXF1aXJlX18gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gX19ub25fd2VicGFja19fcmVxdWlyZV9fKG1vZHVsZVBhdGgpXG4gIH1cblxuICByZXR1cm4gcmVxdWlyZShtb2R1bGVQYXRoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVhbEltcG9ydCwgcmVhbFJlcXVpcmUgfVxuIiwgIid1c2Ugc3RyaWN0J1xuXG5jb25zdCB7IHJlYWxJbXBvcnQsIHJlYWxSZXF1aXJlIH0gPSByZXF1aXJlKCdyZWFsLXJlcXVpcmUnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxvYWRUcmFuc3BvcnRTdHJlYW1CdWlsZGVyXG5cbi8qKlxuICogTG9hZHMgJiByZXR1cm5zIGEgZnVuY3Rpb24gdG8gYnVpbGQgdHJhbnNwb3J0IHN0cmVhbXNcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YXJnZXRcbiAqIEByZXR1cm5zIHtQcm9taXNlPGZ1bmN0aW9uKG9iamVjdCk6IFByb21pc2U8aW1wb3J0KCdub2RlOnN0cmVhbScpLldyaXRhYmxlPj59XG4gKiBAdGhyb3dzIHtFcnJvcn0gSW4gY2FzZSB0aGUgdGFyZ2V0IG1vZHVsZSBkb2VzIG5vdCBleHBvcnQgYSBmdW5jdGlvblxuICovXG5hc3luYyBmdW5jdGlvbiBsb2FkVHJhbnNwb3J0U3RyZWFtQnVpbGRlciAodGFyZ2V0KSB7XG4gIGxldCBmblxuICB0cnkge1xuICAgIGNvbnN0IHRvTG9hZCA9IHRhcmdldC5zdGFydHNXaXRoKCdmaWxlOi8vJykgPyB0YXJnZXQgOiAnZmlsZTovLycgKyB0YXJnZXRcblxuICAgIGlmICh0b0xvYWQuZW5kc1dpdGgoJy50cycpIHx8IHRvTG9hZC5lbmRzV2l0aCgnLmN0cycpKSB7XG4gICAgICAvLyBUT0RPOiBhZGQgc3VwcG9ydCBmb3IgdGhlIFRTTSBtb2R1bGVzIGxvYWRlciAoIGh0dHBzOi8vZ2l0aHViLmNvbS9sdWtlZWQvdHNtICkuXG4gICAgICBpZiAocHJvY2Vzc1tTeW1ib2wuZm9yKCd0cy1ub2RlLnJlZ2lzdGVyLmluc3RhbmNlJyldKSB7XG4gICAgICAgIHJlYWxSZXF1aXJlKCd0cy1ub2RlL3JlZ2lzdGVyJylcbiAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuVFNfTk9ERV9ERVYpIHtcbiAgICAgICAgcmVhbFJlcXVpcmUoJ3RzLW5vZGUtZGV2JylcbiAgICAgIH1cbiAgICAgIC8vIFRPRE86IFN1cHBvcnQgRVMgaW1wb3J0cyBvbmNlIHRzYywgdGFwICYgdHMtbm9kZSBwcm92aWRlIGJldHRlciBjb21wYXRpYmlsaXR5IGd1YXJhbnRlZXMuXG4gICAgICBmbiA9IHJlYWxSZXF1aXJlKGRlY29kZVVSSUNvbXBvbmVudCh0YXJnZXQpKVxuICAgIH0gZWxzZSB7XG4gICAgICBmbiA9IChhd2FpdCByZWFsSW1wb3J0KHRvTG9hZCkpXG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8vIFNlZSB0aGlzIFBSIGZvciBkZXRhaWxzOiBodHRwczovL2dpdGh1Yi5jb20vcGlub2pzL3RocmVhZC1zdHJlYW0vcHVsbC8zNFxuICAgIGlmICgoZXJyb3IuY29kZSA9PT0gJ0VOT1RESVInIHx8IGVycm9yLmNvZGUgPT09ICdFUlJfTU9EVUxFX05PVF9GT1VORCcpKSB7XG4gICAgICBmbiA9IHJlYWxSZXF1aXJlKHRhcmdldClcbiAgICB9IGVsc2UgaWYgKGVycm9yLmNvZGUgPT09IHVuZGVmaW5lZCB8fCBlcnJvci5jb2RlID09PSAnRVJSX1ZNX0RZTkFNSUNfSU1QT1JUX0NBTExCQUNLX01JU1NJTkcnKSB7XG4gICAgICAvLyBXaGVuIGJ1bmRsZWQgd2l0aCBwa2csIGFuIHVuZGVmaW5lZCBlcnJvciBpcyB0aHJvd24gd2hlbiBjYWxsZWQgd2l0aCByZWFsSW1wb3J0XG4gICAgICAvLyBXaGVuIGJ1bmRsZWQgd2l0aCBwa2cgYW5kIHVzaW5nIG5vZGUgdjIwLCBhbiBFUlJfVk1fRFlOQU1JQ19JTVBPUlRfQ0FMTEJBQ0tfTUlTU0lORyBlcnJvciBpcyB0aHJvd24gd2hlbiBjYWxsZWQgd2l0aCByZWFsSW1wb3J0XG4gICAgICAvLyBNb3JlIGluZm8gYXQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9waW5vanMvdGhyZWFkLXN0cmVhbS9pc3N1ZXMvMTQzXG4gICAgICB0cnkge1xuICAgICAgICBmbiA9IHJlYWxSZXF1aXJlKGRlY29kZVVSSUNvbXBvbmVudCh0YXJnZXQpKVxuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIHRocm93IGVycm9yXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVycm9yXG4gICAgfVxuICB9XG5cbiAgLy8gRGVwZW5kaW5nIG9uIGhvdyB0aGUgZGVmYXVsdCBleHBvcnQgaXMgcGVyZm9ybWVkLCBhbmQgb24gaG93IHRoZSBjb2RlIGlzXG4gIC8vIHRyYW5zcGlsZWQsIHdlIG1heSBmaW5kIGNhc2VzIG9mIHR3byBuZXN0ZWQgXCJkZWZhdWx0XCIgb2JqZWN0cy5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9waW5vanMvcGluby9pc3N1ZXMvMTI0MyNpc3N1ZWNvbW1lbnQtOTgyNzc0NzYyXG4gIGlmICh0eXBlb2YgZm4gPT09ICdvYmplY3QnKSBmbiA9IGZuLmRlZmF1bHRcbiAgaWYgKHR5cGVvZiBmbiA9PT0gJ29iamVjdCcpIGZuID0gZm4uZGVmYXVsdFxuICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBFcnJvcignZXhwb3J0ZWQgd29ya2VyIGlzIG5vdCBhIGZ1bmN0aW9uJylcblxuICByZXR1cm4gZm5cbn1cbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgRUUgPSByZXF1aXJlKCdub2RlOmV2ZW50cycpXG5jb25zdCB7IHBpcGVsaW5lLCBQYXNzVGhyb3VnaCB9ID0gcmVxdWlyZSgnbm9kZTpzdHJlYW0nKVxuY29uc3QgcGlubyA9IHJlcXVpcmUoJy4uL3Bpbm8uanMnKVxuY29uc3QgYnVpbGQgPSByZXF1aXJlKCdwaW5vLWFic3RyYWN0LXRyYW5zcG9ydCcpXG5jb25zdCBsb2FkVHJhbnNwb3J0U3RyZWFtQnVpbGRlciA9IHJlcXVpcmUoJy4vdHJhbnNwb3J0LXN0cmVhbScpXG5cbi8vIFRoaXMgZmlsZSBpcyBub3QgY2hlY2tlZCBieSB0aGUgY29kZSBjb3ZlcmFnZSB0b29sLFxuLy8gYXMgaXQgaXMgbm90IHJlbGlhYmxlLlxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgZmlsZSAqL1xuXG4vKlxuICogPiBNdWx0aXBsZSB0YXJnZXRzICYgcGlwZWxpbmVzXG4gKlxuICpcbiAqIFx1MjUwQ1x1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUxMCAgICBcdTI1MENcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MTBcbiAqIFx1MjUwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdTI1MDIgICAgXHUyNTAyICBwICBcdTI1MDJcbiAqIFx1MjUwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdTI1MDIgICAgXHUyNTAyICBpICBcdTI1MDJcbiAqIFx1MjUwMiAgICAgICAgICAgICAgICAgICB0YXJnZXQgICAgICAgICAgICAgICAgICAgICAgICBcdTI1MDIgICAgXHUyNTAyICBuICBcdTI1MDJcbiAqIFx1MjUwMiAgICAgICAgICAgICAgIFx1MjUwMiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1M0NcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MjQgIG8gIFx1MjUwMlxuICogXHUyNTAyICAgdGFyZ2V0cyAgICAgXHUyNTAyICAgdGFyZ2V0ICAgICAgICAgICAgICAgICAgICAgICAgXHUyNTAyICAgIFx1MjUwMiAgLiAgXHUyNTAyXG4gKiBcdTI1MDIgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNUJBIFx1MjUwMiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1M0NcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MjQgIG0gIFx1MjUwMiAgICAgICBzb3VyY2VcbiAqIFx1MjUwMiAgICAgICAgICAgICAgIFx1MjUwMiAgIHRhcmdldCAgICAgICAgICAgICAgICAgICAgICAgIFx1MjUwMiAgICBcdTI1MDIgIHUgIFx1MjUwMiAgICAgICAgIFx1MjUwMlxuICogXHUyNTAyICAgICAgICAgICAgICAgXHUyNTAyIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUzQ1x1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUyNCAgbCAgXHUyNTAyICAgICAgICAgXHUyNTAyd3JpdGVcbiAqIFx1MjUwMiAgICAgICAgICAgICAgIFx1MjUwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx1MjUwMiAgICBcdTI1MDIgIHQgIFx1MjUwMiAgICAgICAgIFx1MjVCQ1xuICogXHUyNTAyICAgICAgICAgICAgICAgXHUyNTAyICBwaXBlbGluZSAgIFx1MjUwQ1x1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUxMCAgIFx1MjUwMiAgICBcdTI1MDIgIGkgIFx1MjUwMiAgICAgIFx1MjUwQ1x1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUxMFxuICogXHUyNTAyICAgICAgICAgICAgICAgXHUyNTAyIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjVCQSBcdTI1MDIgIFBhc3NUaHJvdWdoICBcdTI1MUNcdTI1MDBcdTI1MDBcdTI1MDBcdTI1M0NcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MjQgIHMgIFx1MjUxQ1x1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUyNCAgICAgICAgXHUyNTAyXG4gKiBcdTI1MDIgICAgICAgICAgICAgICBcdTI1MDIgICAgICAgICAgICAgXHUyNTE0XHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTE4ICAgXHUyNTAyICAgIFx1MjUwMiAgdCAgXHUyNTAyIHdyaXRlXHUyNTAyIFRocmVhZCBcdTI1MDJcbiAqIFx1MjUwMiAgICAgICAgICAgICAgIFx1MjUwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx1MjUwMiAgICBcdTI1MDIgIHIgIFx1MjUwMlx1MjVDNFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUyNCBTdHJlYW0gXHUyNTAyXG4gKiBcdTI1MDIgICAgICAgICAgICAgICBcdTI1MDIgIHBpcGVsaW5lICAgXHUyNTBDXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTEwICAgXHUyNTAyICAgIFx1MjUwMiAgZSAgXHUyNTAyICAgICAgXHUyNTAyICAgICAgICBcdTI1MDJcbiAqIFx1MjUwMiAgICAgICAgICAgICAgIFx1MjUwMiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1QkEgXHUyNTAyICBQYXNzVGhyb3VnaCAgXHUyNTFDXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTNDXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTI0ICBhICBcdTI1MDIgICAgICBcdTI1MTRcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MThcbiAqIFx1MjUwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHUyNTE0XHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTE4ICAgXHUyNTAyICAgIFx1MjUwMiAgbSAgXHUyNTAyXG4gKiBcdTI1MDIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHUyNTAyICAgIFx1MjUwMiAgICAgXHUyNTAyXG4gKiBcdTI1MTRcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MTggICAgXHUyNTE0XHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTE4XG4gKlxuICpcbiAqXG4gKiAgPiBPbmUgc2luZ2xlIHBpcGVsaW5lIG9yIHRhcmdldFxuICpcbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdTI1MDJcbiAqIFx1MjUwQ1x1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUxMCAgICAgICAgICBcdTI1MDJ3cml0ZVxuICogXHUyNTAyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHUyNTAyICAgICAgICAgIFx1MjVCQ1xuICogXHUyNTAyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHUyNTAyICAgICAgXHUyNTBDXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTEwXG4gKiBcdTI1MDIgICB0YXJnZXRzICAgICBcdTI1MDIgICB0YXJnZXQgICAgICAgICAgICAgICAgICAgICAgIFx1MjUwMiAgICAgIFx1MjUwMiAgICAgICAgXHUyNTAyXG4gKiBcdTI1MDIgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNUJBIFx1MjUwMiAgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTI0ICAgICAgXHUyNTAyICAgICAgICBcdTI1MDJcbiAqIFx1MjUwMiAgICAgICAgICAgICAgIFx1MjUwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHUyNTAyICAgICAgXHUyNTAyICAgICAgICBcdTI1MDJcbiAqIFx1MjUwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx1MjUxQ1x1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUyNCAgICAgICAgXHUyNTAyXG4gKiBcdTI1MDIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdTI1MDIgICAgICBcdTI1MDIgICAgICAgIFx1MjUwMlxuICogXHUyNTAyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHUyNTAyICAgICAgXHUyNTAyICAgICAgICBcdTI1MDJcbiAqIFx1MjUwMiAgICAgICAgICAgICAgICAgICAgIE9SICAgICAgICAgICAgICAgICAgICAgICAgIFx1MjUwMiAgICAgIFx1MjUwMiAgICAgICAgXHUyNTAyXG4gKiBcdTI1MDIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdTI1MDIgICAgICBcdTI1MDIgICAgICAgIFx1MjUwMlxuICogXHUyNTAyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHUyNTAyICAgICAgXHUyNTAyICAgICAgICBcdTI1MDJcbiAqIFx1MjUwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdTI1MENcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MTAgXHUyNTAyICAgICAgXHUyNTAyICAgICAgICBcdTI1MDJcbiAqIFx1MjUwMiAgIHRhcmdldHMgICAgIFx1MjUwMiAgIHBpcGVsaW5lICAgIFx1MjUwMiAgICAgICAgICAgICAgXHUyNTAyIFx1MjUwMiAgICAgIFx1MjUwMiBUaHJlYWQgXHUyNTAyXG4gKiBcdTI1MDIgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNUJBIFx1MjUwMiAgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNUJBXHUyNTAyIFBhc3NUaHJvdWdoICBcdTI1MUNcdTI1MDBcdTI1MjQgICAgICBcdTI1MDIgU3RyZWFtIFx1MjUwMlxuICogXHUyNTAyICAgICAgICAgICAgICAgXHUyNTAyICAgICAgICAgICAgICAgXHUyNTAyICAgICAgICAgICAgICBcdTI1MDIgXHUyNTAyICAgICAgXHUyNTAyICAgICAgICBcdTI1MDJcbiAqIFx1MjUwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdTI1MTRcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MTggXHUyNTAyICAgICAgXHUyNTAyICAgICAgICBcdTI1MDJcbiAqIFx1MjUwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx1MjUwMiAgICAgIFx1MjUwMiAgICAgICAgXHUyNTAyXG4gKiBcdTI1MDIgICAgICAgICAgICAgICAgICAgICBPUiAgICAgICAgICAgICAgICAgICAgICAgICBcdTI1MDIgd3JpdGVcdTI1MDIgICAgICAgIFx1MjUwMlxuICogXHUyNTAyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHUyNTAyXHUyNUM0XHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTI0ICAgICAgICBcdTI1MDJcbiAqIFx1MjUwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx1MjUwMiAgICAgIFx1MjUwMiAgICAgICAgXHUyNTAyXG4gKiBcdTI1MDIgICAgICAgICAgICAgICAgXHUyNTBDXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTEwICAgICAgICAgICAgICAgIFx1MjUwMiAgICAgIFx1MjUwMiAgICAgICAgXHUyNTAyXG4gKiBcdTI1MDIgICAgcGlwZWxpbmUgICAgXHUyNTAyICAgICAgICAgICAgICBcdTI1MDIgICAgICAgICAgICAgICAgXHUyNTAyICAgICAgXHUyNTAyICAgICAgICBcdTI1MDJcbiAqIFx1MjUwMiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1QkFcdTI1MDIgUGFzc1Rocm91Z2ggIFx1MjUxQ1x1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUyNCAgICAgIFx1MjUwMiAgICAgICAgXHUyNTAyXG4gKiBcdTI1MDIgICAgICAgICAgICAgICAgXHUyNTAyICAgICAgICAgICAgICBcdTI1MDIgICAgICAgICAgICAgICAgXHUyNTAyICAgICAgXHUyNTAyICAgICAgICBcdTI1MDJcbiAqIFx1MjUwMiAgICAgICAgICAgICAgICBcdTI1MTRcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MTggICAgICAgICAgICAgICAgXHUyNTAyICAgICAgXHUyNTE0XHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTE4XG4gKiBcdTI1MDIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdTI1MDJcbiAqIFx1MjUwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx1MjUwMlxuICogXHUyNTE0XHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTE4XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyBmdW5jdGlvbiAoeyB0YXJnZXRzLCBwaXBlbGluZXMsIGxldmVscywgZGVkdXBlIH0pIHtcbiAgY29uc3QgdGFyZ2V0U3RyZWFtcyA9IFtdXG5cbiAgLy8gUHJvY2VzcyB0YXJnZXRzXG4gIGlmICh0YXJnZXRzICYmIHRhcmdldHMubGVuZ3RoKSB7XG4gICAgdGFyZ2V0cyA9IGF3YWl0IFByb21pc2UuYWxsKHRhcmdldHMubWFwKGFzeW5jICh0KSA9PiB7XG4gICAgICBjb25zdCBmbiA9IGF3YWl0IGxvYWRUcmFuc3BvcnRTdHJlYW1CdWlsZGVyKHQudGFyZ2V0KVxuICAgICAgY29uc3Qgc3RyZWFtID0gYXdhaXQgZm4odC5vcHRpb25zKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGV2ZWw6IHQubGV2ZWwsXG4gICAgICAgIHN0cmVhbVxuICAgICAgfVxuICAgIH0pKVxuXG4gICAgdGFyZ2V0U3RyZWFtcy5wdXNoKC4uLnRhcmdldHMpXG4gIH1cblxuICAvLyBQcm9jZXNzIHBpcGVsaW5lc1xuICBpZiAocGlwZWxpbmVzICYmIHBpcGVsaW5lcy5sZW5ndGgpIHtcbiAgICBwaXBlbGluZXMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIHBpcGVsaW5lcy5tYXAoYXN5bmMgKHApID0+IHtcbiAgICAgICAgbGV0IGxldmVsXG4gICAgICAgIGNvbnN0IHBpcGVEZXN0cyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICAgIHAubWFwKGFzeW5jICh0KSA9PiB7XG4gICAgICAgICAgICAvLyBsZXZlbCBhc3NpZ25lZCB0byBwaXBlbGluZSBpcyBkdXBsaWNhdGVkIG92ZXIgYWxsIGl0cyB0YXJnZXRzLCBqdXN0IHN0b3JlIGl0XG4gICAgICAgICAgICBsZXZlbCA9IHQubGV2ZWxcbiAgICAgICAgICAgIGNvbnN0IGZuID0gYXdhaXQgbG9hZFRyYW5zcG9ydFN0cmVhbUJ1aWxkZXIodC50YXJnZXQpXG4gICAgICAgICAgICBjb25zdCBzdHJlYW0gPSBhd2FpdCBmbih0Lm9wdGlvbnMpXG4gICAgICAgICAgICByZXR1cm4gc3RyZWFtXG4gICAgICAgICAgfVxuICAgICAgICAgICkpXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBsZXZlbCxcbiAgICAgICAgICBzdHJlYW06IGNyZWF0ZVBpcGVsaW5lKHBpcGVEZXN0cylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApXG4gICAgdGFyZ2V0U3RyZWFtcy5wdXNoKC4uLnBpcGVsaW5lcylcbiAgfVxuXG4gIC8vIFNraXAgYnVpbGRpbmcgdGhlIG11bHRpc3RyZWFtIHN0ZXAgaWYgZWl0aGVyIG9uZSBzaW5nbGUgcGlwZWxpbmUgb3IgdGFyZ2V0IGlzIGRlZmluZWQgYW5kXG4gIC8vIHJldHVybiBkaXJlY3RseSB0aGUgc3RyZWFtIGluc3RhbmNlIGJhY2sgdG8gVHJlYWRTdHJlYW0uXG4gIC8vIFRoaXMgaXMgZXF1aXZhbGVudCB0byBkZWZpbmUgZWl0aGVyOlxuICAvL1xuICAvLyBwaW5vLnRyYW5zcG9ydCh7IHRhcmdldDogLi4uIH0pXG4gIC8vXG4gIC8vIE9SXG4gIC8vXG4gIC8vIHBpbm8udHJhbnNwb3J0KHsgcGlwZWxpbmU6IC4uLiB9KVxuICBpZiAodGFyZ2V0U3RyZWFtcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gdGFyZ2V0U3RyZWFtc1swXS5zdHJlYW1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYnVpbGQocHJvY2Vzcywge1xuICAgICAgcGFyc2U6ICdsaW5lcycsXG4gICAgICBtZXRhZGF0YTogdHJ1ZSxcbiAgICAgIGNsb3NlIChlcnIsIGNiKSB7XG4gICAgICAgIGxldCBleHBlY3RlZCA9IDBcbiAgICAgICAgZm9yIChjb25zdCB0cmFuc3BvcnQgb2YgdGFyZ2V0U3RyZWFtcykge1xuICAgICAgICAgIGV4cGVjdGVkKytcbiAgICAgICAgICB0cmFuc3BvcnQuc3RyZWFtLm9uKCdjbG9zZScsIGNsb3NlQ2IpXG4gICAgICAgICAgdHJhbnNwb3J0LnN0cmVhbS5lbmQoKVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2xvc2VDYiAoKSB7XG4gICAgICAgICAgaWYgKC0tZXhwZWN0ZWQgPT09IDApIHtcbiAgICAgICAgICAgIGNiKGVycilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8gVE9ETzogV2h5IHNwbGl0MiB3YXMgbm90IHVzZWQgZm9yIHBpcGVsaW5lcz9cbiAgZnVuY3Rpb24gcHJvY2VzcyAoc3RyZWFtKSB7XG4gICAgY29uc3QgbXVsdGkgPSBwaW5vLm11bHRpc3RyZWFtKHRhcmdldFN0cmVhbXMsIHsgbGV2ZWxzLCBkZWR1cGUgfSlcbiAgICAvLyBUT0RPIG1hbmFnZSBiYWNrcHJlc3N1cmVcbiAgICBzdHJlYW0ub24oJ2RhdGEnLCBmdW5jdGlvbiAoY2h1bmspIHtcbiAgICAgIGNvbnN0IHsgbGFzdFRpbWUsIGxhc3RNc2csIGxhc3RPYmosIGxhc3RMZXZlbCB9ID0gdGhpc1xuICAgICAgbXVsdGkubGFzdExldmVsID0gbGFzdExldmVsXG4gICAgICBtdWx0aS5sYXN0VGltZSA9IGxhc3RUaW1lXG4gICAgICBtdWx0aS5sYXN0TXNnID0gbGFzdE1zZ1xuICAgICAgbXVsdGkubGFzdE9iaiA9IGxhc3RPYmpcblxuICAgICAgLy8gVE9ETyBoYW5kbGUgYmFja3ByZXNzdXJlXG4gICAgICBtdWx0aS53cml0ZShjaHVuayArICdcXG4nKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAqIENyZWF0ZXMgYSBwaXBlbGluZSB1c2luZyB0aGUgcHJvdmlkZWQgc3RyZWFtcyBhbmQgcmV0dXJuIGFuIGluc3RhbmNlIG9mIGBQYXNzVGhyb3VnaGAgc3RyZWFtXG4gKiBhcyBhIHNvdXJjZSBmb3IgdGhlIHBpcGVsaW5lLlxuICpcbiAqIEBwYXJhbSB7KFRyYW5zZm9ybVN0cmVhbXxXcml0YWJsZVN0cmVhbSlbXX0gc3RyZWFtcyBBbiBhcnJheSBvZiBzdHJlYW1zLlxuICogICBBbGwgaW50ZXJtZWRpYXRlIHN0cmVhbXMgaW4gdGhlIGFycmF5ICpNVVNUKiBiZSBgVHJhbnNmb3JtYCBzdHJlYW1zIGFuZCBvbmx5IHRoZSBsYXN0IG9uZSBgV3JpdGFibGVgLlxuICogQHJldHVybnMgQSBgUGFzc1Rocm91Z2hgIHN0cmVhbSBpbnN0YW5jZSByZXByZXNlbnRpbmcgdGhlIHNvdXJjZSBzdHJlYW0gb2YgdGhlIHBpcGVsaW5lXG4gKi9cbiAgZnVuY3Rpb24gY3JlYXRlUGlwZWxpbmUgKHN0cmVhbXMpIHtcbiAgICBjb25zdCBlZSA9IG5ldyBFRSgpXG4gICAgY29uc3Qgc3RyZWFtID0gbmV3IFBhc3NUaHJvdWdoKHtcbiAgICAgIGF1dG9EZXN0cm95OiB0cnVlLFxuICAgICAgZGVzdHJveSAoXywgY2IpIHtcbiAgICAgICAgZWUub24oJ2Vycm9yJywgY2IpXG4gICAgICAgIGVlLm9uKCdjbG9zZWQnLCBjYilcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcGlwZWxpbmUoc3RyZWFtLCAuLi5zdHJlYW1zLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBpZiAoZXJyICYmIGVyci5jb2RlICE9PSAnRVJSX1NUUkVBTV9QUkVNQVRVUkVfQ0xPU0UnKSB7XG4gICAgICAgIGVlLmVtaXQoJ2Vycm9yJywgZXJyKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgZWUuZW1pdCgnY2xvc2VkJylcbiAgICB9KVxuXG4gICAgcmV0dXJuIHN0cmVhbVxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQU9BLFFBQU0sY0FBYyxDQUFDLFFBQVE7QUFDM0IsYUFBTyxPQUFPLE9BQU8sSUFBSSxZQUFZO0FBQUEsSUFDdkM7QUFNQSxRQUFNLGdCQUFnQixDQUFDLFFBQVE7QUFDN0IsVUFBSSxDQUFDLElBQUs7QUFJVixZQUFNLFFBQVEsSUFBSTtBQUds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QUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNIO0FBR0EsZUFBU0EsU0FBUyxRQUFRO0FBQ3hCLGNBQU0sUUFBUSxLQUFLLFlBQVksZUFBZSxFQUFFLFFBQVEsT0FBTyxDQUFDO0FBRWhFLGVBQU8sR0FBRyxRQUFRLFNBQVUsT0FBTztBQUNqQyxnQkFBTSxFQUFFLFVBQVUsU0FBUyxTQUFTLFVBQVUsSUFBSTtBQUNsRCxnQkFBTSxZQUFZO0FBQ2xCLGdCQUFNLFdBQVc7QUFDakIsZ0JBQU0sVUFBVTtBQUNoQixnQkFBTSxVQUFVO0FBR2hCLGdCQUFNLE1BQU0sUUFBUSxJQUFJO0FBQUEsUUFDMUIsQ0FBQztBQUFBLE1BQ0g7QUFVQSxlQUFTLGVBQWdCLFNBQVM7QUFDaEMsY0FBTSxLQUFLLElBQUksR0FBRztBQUNsQixjQUFNLFNBQVMsSUFBSSxZQUFZO0FBQUEsVUFDN0IsYUFBYTtBQUFBLFVBQ2IsUUFBUyxHQUFHLElBQUk7QUFDZCxlQUFHLEdBQUcsU0FBUyxFQUFFO0FBQ2pCLGVBQUcsR0FBRyxVQUFVLEVBQUU7QUFBQSxVQUNwQjtBQUFBLFFBQ0YsQ0FBQztBQUVELGlCQUFTLFFBQVEsR0FBRyxTQUFTLFNBQVUsS0FBSztBQUMxQyxjQUFJLE9BQU8sSUFBSSxTQUFTLDhCQUE4QjtBQUNwRCxlQUFHLEtBQUssU0FBUyxHQUFHO0FBQ3BCO0FBQUEsVUFDRjtBQUVBLGFBQUcsS0FBSyxRQUFRO0FBQUEsUUFDbEIsQ0FBQztBQUVELGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbImVyciIsICJlcnIiLCAiY2xvbmVkIiwgImVyciIsICJuIiwgInJlbGVhc2VkQnVmT2JqIiwgIkZpbmFsaXphdGlvblJlZ2lzdHJ5IiwgIldlYWtSZWYiLCAib25FeGl0IiwgImZpeFRhcmdldCIsICJzdHJpbmdpZnkiLCAiXyIsICJiaW5kaW5ncyIsICJ2YWx1ZSIsICJ0bXAiLCAia2V5IiwgInJlcyIsICJqb2luIiwgInN0cmluZ2lmeSIsICJzdHJlYW1MZXZlbHMiLCAic2VyaWFsaXplcnMiLCAidGltZSIsICJwcm9jZXNzIl0KfQo=
