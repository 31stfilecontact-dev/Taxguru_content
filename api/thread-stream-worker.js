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

// ../../node_modules/.pnpm/real-require@0.2.0/node_modules/real-require/src/index.js
var require_src = __commonJS({
  "../../node_modules/.pnpm/real-require@0.2.0/node_modules/real-require/src/index.js"(exports, module) {
    var realImport2 = new Function("modulePath", "return import(modulePath)");
    function realRequire2(modulePath) {
      if (typeof __non_webpack__require__ === "function") {
        return __non_webpack__require__(modulePath);
      }
      return __require(modulePath);
    }
    module.exports = { realImport: realImport2, realRequire: realRequire2 };
  }
});

// ../../node_modules/.pnpm/thread-stream@3.1.0/node_modules/thread-stream/lib/indexes.js
var require_indexes = __commonJS({
  "../../node_modules/.pnpm/thread-stream@3.1.0/node_modules/thread-stream/lib/indexes.js"(exports, module) {
    "use strict";
    var WRITE_INDEX2 = 4;
    var READ_INDEX2 = 8;
    module.exports = {
      WRITE_INDEX: WRITE_INDEX2,
      READ_INDEX: READ_INDEX2
    };
  }
});

// ../../node_modules/.pnpm/thread-stream@3.1.0/node_modules/thread-stream/lib/wait.js
var require_wait = __commonJS({
  "../../node_modules/.pnpm/thread-stream@3.1.0/node_modules/thread-stream/lib/wait.js"(exports, module) {
    "use strict";
    var MAX_TIMEOUT = 1e3;
    function wait(state2, index, expected, timeout, done) {
      const max = Date.now() + timeout;
      let current = Atomics.load(state2, index);
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
            current = Atomics.load(state2, index);
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
    function waitDiff2(state2, index, expected, timeout, done) {
      const max = Date.now() + timeout;
      let current = Atomics.load(state2, index);
      if (current !== expected) {
        done(null, "ok");
        return;
      }
      const check = (backoff) => {
        if (Date.now() > max) {
          done(null, "timed-out");
        } else {
          setTimeout(() => {
            current = Atomics.load(state2, index);
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
    module.exports = { wait, waitDiff: waitDiff2 };
  }
});

// ../../node_modules/.pnpm/thread-stream@3.1.0/node_modules/thread-stream/lib/worker.js
var { realImport, realRequire } = require_src();
var { workerData, parentPort } = __require("worker_threads");
var { WRITE_INDEX, READ_INDEX } = require_indexes();
var { waitDiff } = require_wait();
var {
  dataBuf,
  filename,
  stateBuf
} = workerData;
var destination;
var state = new Int32Array(stateBuf);
var data = Buffer.from(dataBuf);
async function start() {
  let worker;
  try {
    if (filename.endsWith(".ts") || filename.endsWith(".cts")) {
      if (!process[/* @__PURE__ */ Symbol.for("ts-node.register.instance")]) {
        realRequire("ts-node/register");
      } else if (process.env.TS_NODE_DEV) {
        realRequire("ts-node-dev");
      }
      worker = realRequire(decodeURIComponent(filename.replace(process.platform === "win32" ? "file:///" : "file://", "")));
    } else {
      worker = await realImport(filename);
    }
  } catch (error) {
    if ((error.code === "ENOTDIR" || error.code === "ERR_MODULE_NOT_FOUND") && filename.startsWith("file://")) {
      worker = realRequire(decodeURIComponent(filename.replace("file://", "")));
    } else if (error.code === void 0 || error.code === "ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING") {
      try {
        worker = realRequire(decodeURIComponent(filename.replace(process.platform === "win32" ? "file:///" : "file://", "")));
      } catch {
        throw error;
      }
    } else {
      throw error;
    }
  }
  if (typeof worker === "object") worker = worker.default;
  if (typeof worker === "object") worker = worker.default;
  destination = await worker(workerData.workerData);
  destination.on("error", function(err) {
    Atomics.store(state, WRITE_INDEX, -2);
    Atomics.notify(state, WRITE_INDEX);
    Atomics.store(state, READ_INDEX, -2);
    Atomics.notify(state, READ_INDEX);
    parentPort.postMessage({
      code: "ERROR",
      err
    });
  });
  destination.on("close", function() {
    const end = Atomics.load(state, WRITE_INDEX);
    Atomics.store(state, READ_INDEX, end);
    Atomics.notify(state, READ_INDEX);
    setImmediate(() => {
      process.exit(0);
    });
  });
}
start().then(function() {
  parentPort.postMessage({
    code: "READY"
  });
  process.nextTick(run);
});
function run() {
  const current = Atomics.load(state, READ_INDEX);
  const end = Atomics.load(state, WRITE_INDEX);
  if (end === current) {
    if (end === data.length) {
      waitDiff(state, READ_INDEX, end, Infinity, run);
    } else {
      waitDiff(state, WRITE_INDEX, end, Infinity, run);
    }
    return;
  }
  if (end === -1) {
    destination.end();
    return;
  }
  const toWrite = data.toString("utf8", current, end);
  const res = destination.write(toWrite);
  if (res) {
    Atomics.store(state, READ_INDEX, end);
    Atomics.notify(state, READ_INDEX);
    setImmediate(run);
  } else {
    destination.once("drain", function() {
      Atomics.store(state, READ_INDEX, end);
      Atomics.notify(state, READ_INDEX);
      run();
    });
  }
}
process.on("unhandledRejection", function(err) {
  parentPort.postMessage({
    code: "ERROR",
    err
  });
  process.exit(1);
});
process.on("uncaughtException", function(err) {
  parentPort.postMessage({
    code: "ERROR",
    err
  });
  process.exit(1);
});
process.once("exit", (exitCode) => {
  if (exitCode !== 0) {
    process.exit(exitCode);
    return;
  }
  if (destination?.writableNeedDrain && !destination?.writableEnded) {
    parentPort.postMessage({
      code: "WARNING",
      err: new Error("ThreadStream: process exited before destination stream was drained. this may indicate that the destination stream try to write to a another missing stream")
    });
  }
  process.exit(0);
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3JlYWwtcmVxdWlyZUAwLjIuMC9ub2RlX21vZHVsZXMvcmVhbC1yZXF1aXJlL3NyYy9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vdGhyZWFkLXN0cmVhbUAzLjEuMC9ub2RlX21vZHVsZXMvdGhyZWFkLXN0cmVhbS9saWIvaW5kZXhlcy5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vdGhyZWFkLXN0cmVhbUAzLjEuMC9ub2RlX21vZHVsZXMvdGhyZWFkLXN0cmVhbS9saWIvd2FpdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vdGhyZWFkLXN0cmVhbUAzLjEuMC9ub2RlX21vZHVsZXMvdGhyZWFkLXN0cmVhbS9saWIvd29ya2VyLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXctZnVuYywgY2FtZWxjYXNlICovXG4vKiBnbG9iYWxzIF9fbm9uX3dlYnBhY2tfX3JlcXVpcmVfXyAqL1xuXG5jb25zdCByZWFsSW1wb3J0ID0gbmV3IEZ1bmN0aW9uKCdtb2R1bGVQYXRoJywgJ3JldHVybiBpbXBvcnQobW9kdWxlUGF0aCknKVxuXG5mdW5jdGlvbiByZWFsUmVxdWlyZShtb2R1bGVQYXRoKSB7XG4gIGlmICh0eXBlb2YgX19ub25fd2VicGFja19fcmVxdWlyZV9fID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIF9fbm9uX3dlYnBhY2tfX3JlcXVpcmVfXyhtb2R1bGVQYXRoKVxuICB9XG5cbiAgcmV0dXJuIHJlcXVpcmUobW9kdWxlUGF0aClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IHJlYWxJbXBvcnQsIHJlYWxSZXF1aXJlIH1cbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgV1JJVEVfSU5ERVggPSA0XG5jb25zdCBSRUFEX0lOREVYID0gOFxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgV1JJVEVfSU5ERVgsXG4gIFJFQURfSU5ERVhcbn1cbiIsICIndXNlIHN0cmljdCdcblxuY29uc3QgTUFYX1RJTUVPVVQgPSAxMDAwXG5cbmZ1bmN0aW9uIHdhaXQgKHN0YXRlLCBpbmRleCwgZXhwZWN0ZWQsIHRpbWVvdXQsIGRvbmUpIHtcbiAgY29uc3QgbWF4ID0gRGF0ZS5ub3coKSArIHRpbWVvdXRcbiAgbGV0IGN1cnJlbnQgPSBBdG9taWNzLmxvYWQoc3RhdGUsIGluZGV4KVxuICBpZiAoY3VycmVudCA9PT0gZXhwZWN0ZWQpIHtcbiAgICBkb25lKG51bGwsICdvaycpXG4gICAgcmV0dXJuXG4gIH1cbiAgbGV0IHByaW9yID0gY3VycmVudFxuICBjb25zdCBjaGVjayA9IChiYWNrb2ZmKSA9PiB7XG4gICAgaWYgKERhdGUubm93KCkgPiBtYXgpIHtcbiAgICAgIGRvbmUobnVsbCwgJ3RpbWVkLW91dCcpXG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBwcmlvciA9IGN1cnJlbnRcbiAgICAgICAgY3VycmVudCA9IEF0b21pY3MubG9hZChzdGF0ZSwgaW5kZXgpXG4gICAgICAgIGlmIChjdXJyZW50ID09PSBwcmlvcikge1xuICAgICAgICAgIGNoZWNrKGJhY2tvZmYgPj0gTUFYX1RJTUVPVVQgPyBNQVhfVElNRU9VVCA6IGJhY2tvZmYgKiAyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChjdXJyZW50ID09PSBleHBlY3RlZCkgZG9uZShudWxsLCAnb2snKVxuICAgICAgICAgIGVsc2UgZG9uZShudWxsLCAnbm90LWVxdWFsJylcbiAgICAgICAgfVxuICAgICAgfSwgYmFja29mZilcbiAgICB9XG4gIH1cbiAgY2hlY2soMSlcbn1cblxuLy8gbGV0IHdhaXREaWZmQ291bnQgPSAwXG5mdW5jdGlvbiB3YWl0RGlmZiAoc3RhdGUsIGluZGV4LCBleHBlY3RlZCwgdGltZW91dCwgZG9uZSkge1xuICAvLyBjb25zdCBpZCA9IHdhaXREaWZmQ291bnQrK1xuICAvLyBwcm9jZXNzLl9yYXdEZWJ1ZyhgPj4+IHdhaXREaWZmICR7aWR9YClcbiAgY29uc3QgbWF4ID0gRGF0ZS5ub3coKSArIHRpbWVvdXRcbiAgbGV0IGN1cnJlbnQgPSBBdG9taWNzLmxvYWQoc3RhdGUsIGluZGV4KVxuICBpZiAoY3VycmVudCAhPT0gZXhwZWN0ZWQpIHtcbiAgICBkb25lKG51bGwsICdvaycpXG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3QgY2hlY2sgPSAoYmFja29mZikgPT4ge1xuICAgIC8vIHByb2Nlc3MuX3Jhd0RlYnVnKGAke2lkfSAke2luZGV4fSBjdXJyZW50ICR7Y3VycmVudH0gZXhwZWN0ZWQgJHtleHBlY3RlZH1gKVxuICAgIC8vIHByb2Nlc3MuX3Jhd0RlYnVnKCcnICsgYmFja29mZilcbiAgICBpZiAoRGF0ZS5ub3coKSA+IG1heCkge1xuICAgICAgZG9uZShudWxsLCAndGltZWQtb3V0JylcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGN1cnJlbnQgPSBBdG9taWNzLmxvYWQoc3RhdGUsIGluZGV4KVxuICAgICAgICBpZiAoY3VycmVudCAhPT0gZXhwZWN0ZWQpIHtcbiAgICAgICAgICBkb25lKG51bGwsICdvaycpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hlY2soYmFja29mZiA+PSBNQVhfVElNRU9VVCA/IE1BWF9USU1FT1VUIDogYmFja29mZiAqIDIpXG4gICAgICAgIH1cbiAgICAgIH0sIGJhY2tvZmYpXG4gICAgfVxuICB9XG4gIGNoZWNrKDEpXG59XG5cbm1vZHVsZS5leHBvcnRzID0geyB3YWl0LCB3YWl0RGlmZiB9XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHsgcmVhbEltcG9ydCwgcmVhbFJlcXVpcmUgfSA9IHJlcXVpcmUoJ3JlYWwtcmVxdWlyZScpXG5jb25zdCB7IHdvcmtlckRhdGEsIHBhcmVudFBvcnQgfSA9IHJlcXVpcmUoJ3dvcmtlcl90aHJlYWRzJylcbmNvbnN0IHsgV1JJVEVfSU5ERVgsIFJFQURfSU5ERVggfSA9IHJlcXVpcmUoJy4vaW5kZXhlcycpXG5jb25zdCB7IHdhaXREaWZmIH0gPSByZXF1aXJlKCcuL3dhaXQnKVxuXG5jb25zdCB7XG4gIGRhdGFCdWYsXG4gIGZpbGVuYW1lLFxuICBzdGF0ZUJ1ZlxufSA9IHdvcmtlckRhdGFcblxubGV0IGRlc3RpbmF0aW9uXG5cbmNvbnN0IHN0YXRlID0gbmV3IEludDMyQXJyYXkoc3RhdGVCdWYpXG5jb25zdCBkYXRhID0gQnVmZmVyLmZyb20oZGF0YUJ1ZilcblxuYXN5bmMgZnVuY3Rpb24gc3RhcnQgKCkge1xuICBsZXQgd29ya2VyXG4gIHRyeSB7XG4gICAgaWYgKGZpbGVuYW1lLmVuZHNXaXRoKCcudHMnKSB8fCBmaWxlbmFtZS5lbmRzV2l0aCgnLmN0cycpKSB7XG4gICAgICAvLyBUT0RPOiBhZGQgc3VwcG9ydCBmb3IgdGhlIFRTTSBtb2R1bGVzIGxvYWRlciAoIGh0dHBzOi8vZ2l0aHViLmNvbS9sdWtlZWQvdHNtICkuXG4gICAgICBpZiAoIXByb2Nlc3NbU3ltYm9sLmZvcigndHMtbm9kZS5yZWdpc3Rlci5pbnN0YW5jZScpXSkge1xuICAgICAgICByZWFsUmVxdWlyZSgndHMtbm9kZS9yZWdpc3RlcicpXG4gICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52LlRTX05PREVfREVWKSB7XG4gICAgICAgIHJlYWxSZXF1aXJlKCd0cy1ub2RlLWRldicpXG4gICAgICB9XG4gICAgICAvLyBUT0RPOiBTdXBwb3J0IEVTIGltcG9ydHMgb25jZSB0c2MsIHRhcCAmIHRzLW5vZGUgcHJvdmlkZSBiZXR0ZXIgY29tcGF0aWJpbGl0eSBndWFyYW50ZWVzLlxuICAgICAgLy8gUmVtb3ZlIGV4dHJhIGZvcndhcmRzbGFzaCBvbiBXaW5kb3dzXG4gICAgICB3b3JrZXIgPSByZWFsUmVxdWlyZShkZWNvZGVVUklDb21wb25lbnQoZmlsZW5hbWUucmVwbGFjZShwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInID8gJ2ZpbGU6Ly8vJyA6ICdmaWxlOi8vJywgJycpKSlcbiAgICB9IGVsc2Uge1xuICAgICAgd29ya2VyID0gKGF3YWl0IHJlYWxJbXBvcnQoZmlsZW5hbWUpKVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyBBIHlhcm4gdXNlciB0aGF0IHRyaWVzIHRvIHN0YXJ0IGEgVGhyZWFkU3RyZWFtIGZvciBhbiBleHRlcm5hbCBtb2R1bGVcbiAgICAvLyBwcm92aWRlcyBhIGZpbGVuYW1lIHBvaW50aW5nIHRvIGEgemlwIGZpbGUuXG4gICAgLy8gZWcuIHJlcXVpcmUucmVzb2x2ZSgncGluby1lbGFzdGljc2VhcmNoJykgLy8gcmV0dXJucyAvZm9vL3Bpbm8tZWxhc3RpY3NlYXJjaC1ucG0tNi4xLjAtMGMwMzA3OTQ3OC02OTE1NDM1MTcyLnppcC9iYXIuanNcbiAgICAvLyBUaGUgYGltcG9ydGAgd2lsbCBmYWlsIHRvIHRyeSB0byBsb2FkIGl0LlxuICAgIC8vIFRoaXMgY2F0Y2ggYmxvY2sgZXhlY3V0ZXMgdGhlIGByZXF1aXJlYCBmYWxsYmFjayB0byBsb2FkIHRoZSBtb2R1bGUgY29ycmVjdGx5LlxuICAgIC8vIEluIGZhY3QsIHlhcm4gbW9kaWZpZXMgdGhlIGByZXF1aXJlYCBmdW5jdGlvbiB0byBtYW5hZ2UgdGhlIHppcHBlZCBwYXRoLlxuICAgIC8vIE1vcmUgZGV0YWlscyBhdCBodHRwczovL2dpdGh1Yi5jb20vcGlub2pzL3Bpbm8vcHVsbC8xMTEzXG4gICAgLy8gVGhlIGVycm9yIGNvZGVzIG1heSBjaGFuZ2UgYmFzZWQgb24gdGhlIG5vZGUuanMgdmVyc2lvbiAoRU5PVERJUiA+IDEyLCBFUlJfTU9EVUxFX05PVF9GT1VORCA8PSAxMiApXG4gICAgaWYgKChlcnJvci5jb2RlID09PSAnRU5PVERJUicgfHwgZXJyb3IuY29kZSA9PT0gJ0VSUl9NT0RVTEVfTk9UX0ZPVU5EJykgJiZcbiAgICAgZmlsZW5hbWUuc3RhcnRzV2l0aCgnZmlsZTovLycpKSB7XG4gICAgICB3b3JrZXIgPSByZWFsUmVxdWlyZShkZWNvZGVVUklDb21wb25lbnQoZmlsZW5hbWUucmVwbGFjZSgnZmlsZTovLycsICcnKSkpXG4gICAgfSBlbHNlIGlmIChlcnJvci5jb2RlID09PSB1bmRlZmluZWQgfHwgZXJyb3IuY29kZSA9PT0gJ0VSUl9WTV9EWU5BTUlDX0lNUE9SVF9DQUxMQkFDS19NSVNTSU5HJykge1xuICAgICAgLy8gV2hlbiBidW5kbGVkIHdpdGggcGtnLCBhbiB1bmRlZmluZWQgZXJyb3IgaXMgdGhyb3duIHdoZW4gY2FsbGVkIHdpdGggcmVhbEltcG9ydFxuICAgICAgLy8gV2hlbiBidW5kbGVkIHdpdGggcGtnIGFuZCB1c2luZyBub2RlIHYyMCwgYW4gRVJSX1ZNX0RZTkFNSUNfSU1QT1JUX0NBTExCQUNLX01JU1NJTkcgZXJyb3IgaXMgdGhyb3duIHdoZW4gY2FsbGVkIHdpdGggcmVhbEltcG9ydFxuICAgICAgLy8gTW9yZSBpbmZvIGF0OiBodHRwczovL2dpdGh1Yi5jb20vcGlub2pzL3RocmVhZC1zdHJlYW0vaXNzdWVzLzE0M1xuICAgICAgdHJ5IHtcbiAgICAgICAgd29ya2VyID0gcmVhbFJlcXVpcmUoZGVjb2RlVVJJQ29tcG9uZW50KGZpbGVuYW1lLnJlcGxhY2UocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJyA/ICdmaWxlOi8vLycgOiAnZmlsZTovLycsICcnKSkpXG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgdGhyb3cgZXJyb3JcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZXJyb3JcbiAgICB9XG4gIH1cblxuICAvLyBEZXBlbmRpbmcgb24gaG93IHRoZSBkZWZhdWx0IGV4cG9ydCBpcyBwZXJmb3JtZWQsIGFuZCBvbiBob3cgdGhlIGNvZGUgaXNcbiAgLy8gdHJhbnNwaWxlZCwgd2UgbWF5IGZpbmQgY2FzZXMgb2YgdHdvIG5lc3RlZCBcImRlZmF1bHRcIiBvYmplY3RzLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3Bpbm9qcy9waW5vL2lzc3Vlcy8xMjQzI2lzc3VlY29tbWVudC05ODI3NzQ3NjJcbiAgaWYgKHR5cGVvZiB3b3JrZXIgPT09ICdvYmplY3QnKSB3b3JrZXIgPSB3b3JrZXIuZGVmYXVsdFxuICBpZiAodHlwZW9mIHdvcmtlciA9PT0gJ29iamVjdCcpIHdvcmtlciA9IHdvcmtlci5kZWZhdWx0XG5cbiAgZGVzdGluYXRpb24gPSBhd2FpdCB3b3JrZXIod29ya2VyRGF0YS53b3JrZXJEYXRhKVxuXG4gIGRlc3RpbmF0aW9uLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBBdG9taWNzLnN0b3JlKHN0YXRlLCBXUklURV9JTkRFWCwgLTIpXG4gICAgQXRvbWljcy5ub3RpZnkoc3RhdGUsIFdSSVRFX0lOREVYKVxuXG4gICAgQXRvbWljcy5zdG9yZShzdGF0ZSwgUkVBRF9JTkRFWCwgLTIpXG4gICAgQXRvbWljcy5ub3RpZnkoc3RhdGUsIFJFQURfSU5ERVgpXG5cbiAgICBwYXJlbnRQb3J0LnBvc3RNZXNzYWdlKHtcbiAgICAgIGNvZGU6ICdFUlJPUicsXG4gICAgICBlcnJcbiAgICB9KVxuICB9KVxuXG4gIGRlc3RpbmF0aW9uLm9uKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBwcm9jZXNzLl9yYXdEZWJ1Zygnd29ya2VyIGNsb3NlIGVtaXR0ZWQnKVxuICAgIGNvbnN0IGVuZCA9IEF0b21pY3MubG9hZChzdGF0ZSwgV1JJVEVfSU5ERVgpXG4gICAgQXRvbWljcy5zdG9yZShzdGF0ZSwgUkVBRF9JTkRFWCwgZW5kKVxuICAgIEF0b21pY3Mubm90aWZ5KHN0YXRlLCBSRUFEX0lOREVYKVxuICAgIHNldEltbWVkaWF0ZSgoKSA9PiB7XG4gICAgICBwcm9jZXNzLmV4aXQoMClcbiAgICB9KVxuICB9KVxufVxuXG4vLyBObyAuY2F0Y2goKSBoYW5kbGVyLFxuLy8gaW4gY2FzZSB0aGVyZSBpcyBhbiBlcnJvciBpdCBnb2VzXG4vLyB0byB1bmhhbmRsZWRSZWplY3Rpb25cbnN0YXJ0KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gIHBhcmVudFBvcnQucG9zdE1lc3NhZ2Uoe1xuICAgIGNvZGU6ICdSRUFEWSdcbiAgfSlcblxuICBwcm9jZXNzLm5leHRUaWNrKHJ1bilcbn0pXG5cbmZ1bmN0aW9uIHJ1biAoKSB7XG4gIGNvbnN0IGN1cnJlbnQgPSBBdG9taWNzLmxvYWQoc3RhdGUsIFJFQURfSU5ERVgpXG4gIGNvbnN0IGVuZCA9IEF0b21pY3MubG9hZChzdGF0ZSwgV1JJVEVfSU5ERVgpXG5cbiAgLy8gcHJvY2Vzcy5fcmF3RGVidWcoYHByZSBzdGF0ZSAke2N1cnJlbnR9ICR7ZW5kfWApXG5cbiAgaWYgKGVuZCA9PT0gY3VycmVudCkge1xuICAgIGlmIChlbmQgPT09IGRhdGEubGVuZ3RoKSB7XG4gICAgICB3YWl0RGlmZihzdGF0ZSwgUkVBRF9JTkRFWCwgZW5kLCBJbmZpbml0eSwgcnVuKVxuICAgIH0gZWxzZSB7XG4gICAgICB3YWl0RGlmZihzdGF0ZSwgV1JJVEVfSU5ERVgsIGVuZCwgSW5maW5pdHksIHJ1bilcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBwcm9jZXNzLl9yYXdEZWJ1ZyhgcG9zdCBzdGF0ZSAke2N1cnJlbnR9ICR7ZW5kfWApXG5cbiAgaWYgKGVuZCA9PT0gLTEpIHtcbiAgICAvLyBwcm9jZXNzLl9yYXdEZWJ1ZygnZW5kJylcbiAgICBkZXN0aW5hdGlvbi5lbmQoKVxuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgdG9Xcml0ZSA9IGRhdGEudG9TdHJpbmcoJ3V0ZjgnLCBjdXJyZW50LCBlbmQpXG4gIC8vIHByb2Nlc3MuX3Jhd0RlYnVnKCd3b3JrZXIgd3JpdGluZzogJyArIHRvV3JpdGUpXG5cbiAgY29uc3QgcmVzID0gZGVzdGluYXRpb24ud3JpdGUodG9Xcml0ZSlcblxuICBpZiAocmVzKSB7XG4gICAgQXRvbWljcy5zdG9yZShzdGF0ZSwgUkVBRF9JTkRFWCwgZW5kKVxuICAgIEF0b21pY3Mubm90aWZ5KHN0YXRlLCBSRUFEX0lOREVYKVxuICAgIHNldEltbWVkaWF0ZShydW4pXG4gIH0gZWxzZSB7XG4gICAgZGVzdGluYXRpb24ub25jZSgnZHJhaW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICBBdG9taWNzLnN0b3JlKHN0YXRlLCBSRUFEX0lOREVYLCBlbmQpXG4gICAgICBBdG9taWNzLm5vdGlmeShzdGF0ZSwgUkVBRF9JTkRFWClcbiAgICAgIHJ1bigpXG4gICAgfSlcbiAgfVxufVxuXG5wcm9jZXNzLm9uKCd1bmhhbmRsZWRSZWplY3Rpb24nLCBmdW5jdGlvbiAoZXJyKSB7XG4gIHBhcmVudFBvcnQucG9zdE1lc3NhZ2Uoe1xuICAgIGNvZGU6ICdFUlJPUicsXG4gICAgZXJyXG4gIH0pXG4gIHByb2Nlc3MuZXhpdCgxKVxufSlcblxucHJvY2Vzcy5vbigndW5jYXVnaHRFeGNlcHRpb24nLCBmdW5jdGlvbiAoZXJyKSB7XG4gIHBhcmVudFBvcnQucG9zdE1lc3NhZ2Uoe1xuICAgIGNvZGU6ICdFUlJPUicsXG4gICAgZXJyXG4gIH0pXG4gIHByb2Nlc3MuZXhpdCgxKVxufSlcblxucHJvY2Vzcy5vbmNlKCdleGl0JywgZXhpdENvZGUgPT4ge1xuICBpZiAoZXhpdENvZGUgIT09IDApIHtcbiAgICBwcm9jZXNzLmV4aXQoZXhpdENvZGUpXG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKGRlc3RpbmF0aW9uPy53cml0YWJsZU5lZWREcmFpbiAmJiAhZGVzdGluYXRpb24/LndyaXRhYmxlRW5kZWQpIHtcbiAgICBwYXJlbnRQb3J0LnBvc3RNZXNzYWdlKHtcbiAgICAgIGNvZGU6ICdXQVJOSU5HJyxcbiAgICAgIGVycjogbmV3IEVycm9yKCdUaHJlYWRTdHJlYW06IHByb2Nlc3MgZXhpdGVkIGJlZm9yZSBkZXN0aW5hdGlvbiBzdHJlYW0gd2FzIGRyYWluZWQuIHRoaXMgbWF5IGluZGljYXRlIHRoYXQgdGhlIGRlc3RpbmF0aW9uIHN0cmVhbSB0cnkgdG8gd3JpdGUgdG8gYSBhbm90aGVyIG1pc3Npbmcgc3RyZWFtJylcbiAgICB9KVxuICB9XG5cbiAgcHJvY2Vzcy5leGl0KDApXG59KVxuIl0sCiAgIm1hcHBpbmdz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QUFDO0FBQUEsRUFDSDtBQUNGO0FBRUEsUUFBUSxHQUFHLHNCQUFzQixTQUFVLEtBQUs7QUFDOUMsYUFBVyxZQUFZO0FBQUEsSUFDckIsTUFBTTtBQUFBLElBQ047QUFBQSxFQUNGLENBQUM7QUFDRCxVQUFRLEtBQUssQ0FBQztBQUNoQixDQUFDO0FBRUQsUUFBUSxHQUFHLHFCQUFxQixTQUFVLEtBQUs7QUFDN0MsYUFBVyxZQUFZO0FBQUEsSUFDckIsTUFBTTtBQUFBLElBQ047QUFBQSxFQUNGLENBQUM7QUFDRCxVQUFRLEtBQUssQ0FBQztBQUNoQixDQUFDO0FBRUQsUUFBUSxLQUFLLFFBQVEsY0FBWTtBQUMvQixNQUFJLGFBQWEsR0FBRztBQUNsQixZQUFRLEtBQUssUUFBUTtBQUNyQjtBQUFBLEVBQ0Y7QUFDQSxNQUFJLGFBQWEscUJBQXFCLENBQUMsYUFBYSxlQUFlO0FBQ2pFLGVBQVcsWUFBWTtBQUFBLE1BQ3JCLE1BQU07QUFBQSxNQUNOLEtBQUssSUFBSSxNQUFNLDRKQUE0SjtBQUFBLElBQzdLLENBQUM7QUFBQSxFQUNIO0FBRUEsVUFBUSxLQUFLLENBQUM7QUFDaEIsQ0FBQzsiLAogICJuYW1lcyI6IFsicmVhbEltcG9ydCIsICJyZWFsUmVxdWlyZSIsICJXUklURV9JTkRFWCIsICJSRUFEX0lOREVYIiwgInN0YXRlIiwgIndhaXREaWZmIl0KfQo=
