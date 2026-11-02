/**
 * ============================================================================
 * KVTM AGENT - APPSFLYER.JS (PURE PROXY EVAL BRIDGE)
 * ============================================================================
 * - Mock Appsflyer SDK: Chống crash game & chặn telemetry.
 * - Dual Bridge: ADB File IPC (/sdcard/kvtm_cmd.json) & WebSocket (ws://127.0.0.1:8765).
 * - Cổng thực thi: Tiếp nhận lệnh EVAL trực tiếp từ Python (Runtime.evaluate).
 * - Không chứa logic nghiệp vụ cứng. Toàn bộ logic được điều khiển từ Python.
 * ============================================================================
 */

// 1. MOCK APPSFLYER SDK (Bắt buộc để game không crash khi khởi động)
!function (global) {
  "use strict";
  var fr = void 0 !== global.fr ? global.fr : {};

  function AppsflyerMock() { }
  AppsflyerMock.prototype.init = function () { return !0; };
  AppsflyerMock.prototype.trackEvent = function () { return !0; };
  AppsflyerMock.prototype.setUserId = function () { return !0; };
  AppsflyerMock.prototype.logEvent = function () { return !0; };
  AppsflyerMock.prototype.trackPurchase = function () { return !0; };
  AppsflyerMock.prototype.trackCustomEvent = function () { return !0; };
  AppsflyerMock.prototype.getInstance = function () { return this; };
  AppsflyerMock.getInstance = function () { return fr.appsflyer; };

  fr.appsflyer = new AppsflyerMock();
  fr.Appsflyer = AppsflyerMock;
  global.fr = fr;
  global.Appsflyer = AppsflyerMock;
}("undefined" != typeof window ? window : "undefined" != typeof global ? global : this);

// 2. WEBSOCKET & FILE IPC PROXY BRIDGE
(function (global) {
  "use strict";

  var ws = null;
  var reconnectTimer = null;

  function dispatchCommand(msg) {
    if (!msg || !msg.cmd) return { success: false, reason: "invalid_cmd" };
    var cmd = msg.cmd;
    var req_id = msg.req_id;

    if (cmd === "PING") {
      return { cmd: "PONG", success: true, req_id: req_id, time: Date.now() };
    } else if (cmd === "EVAL") {
      var res = "";
      try {
        res = String(eval(msg.code));
      } catch (err) {
        res = "ERR: " + String(err);
      }
      return { cmd: "EVAL_RES", result: res, req_id: req_id, id: msg.id || 0 };
    }
    return { success: false, reason: "unknown_cmd", cmd: cmd, req_id: req_id };
  }

  // WebSocket Bridge
  function initWebSocket() {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    try {
      if (typeof WebSocket === "undefined") return;
      var cur = new WebSocket("ws://127.0.0.1:8765");
      ws = cur;
      ws.onopen = function () {
        if (ws !== cur) return;
        var token = "";
        try {
          var idPaths = ["/sdcard/Android/data/vn.kvtm.js/files/kvtm_id.txt", "/sdcard/kvtm_id.txt"];
          for (var ii = 0; ii < idPaths.length && !token; ii++) {
            if (jsb.fileUtils.isFileExist(idPaths[ii])) {
              token = String(jsb.fileUtils.getStringFromFile(idPaths[ii]) || "").trim();
            }
          }
        } catch (eId) { }
        try { ws.send(JSON.stringify({ cmd: "IDENTIFY", device_id: token })); } catch (eS) { }
        try { ws.send(JSON.stringify({ cmd: "PING" })); } catch (eP) { }
        if (typeof cc !== "undefined" && cc.log) {
          cc.log("[KVTMAgent] WS connected, identify=" + token);
        }
      };

      ws.onmessage = function (event) {
        try {
          var msg = JSON.parse(event.data);
          if (!msg) return;
          if (msg.cmd === "PONG") return;
          var res = dispatchCommand(msg);
          if (ws && ws.readyState === 1) {
            ws.send(JSON.stringify(res));
          }
        } catch (e) { }
      };
      ws.onerror = function () { };
      ws.onclose = function () {
        if (ws !== cur) return;
        ws = null;
        reconnectTimer = setTimeout(initWebSocket, 3000);
      };
    } catch (e) {
      reconnectTimer = setTimeout(initWebSocket, 3000);
    }
  }

  // ADB File IPC (Dự phòng qua thẻ nhớ sdcard)
  var fileIpcTimer = null;
  var CMD_CANDIDATE_PATHS = [
    "/sdcard/Android/data/vn.kvtm.js/files/kvtm_cmd.json",
    "/sdcard/kvtm_cmd.json"
  ];
  var RES_FILE_PRIMARY = "/sdcard/Android/data/vn.kvtm.js/files/kvtm_res.json";
  var RES_FILE_SECONDARY = "/sdcard/kvtm_res.json";

  function initFileIpc() {
    if (fileIpcTimer) {
      clearInterval(fileIpcTimer);
      fileIpcTimer = null;
    }
    if (typeof jsb === "undefined" || !jsb.fileUtils) return;

    fileIpcTimer = setInterval(function () {
      try {
        if (!jsb.fileUtils) return;
        for (var i = 0; i < CMD_CANDIDATE_PATHS.length; i++) {
          var cmdPath = CMD_CANDIDATE_PATHS[i];
          if (jsb.fileUtils.isFileExist(cmdPath)) {
            var raw = jsb.fileUtils.getStringFromFile(cmdPath);
            try { jsb.fileUtils.removeFile(cmdPath); } catch (eRem) { }
            if (!raw || raw.trim().length === 0) continue;

            var msg = null;
            try { msg = JSON.parse(raw); } catch (errJson) { continue; }

            var res = dispatchCommand(msg);
            var resStr = JSON.stringify(res);
            try { jsb.fileUtils.writeStringToFile(resStr, RES_FILE_PRIMARY); } catch (eW1) { }
            try { jsb.fileUtils.writeStringToFile(resStr, RES_FILE_SECONDARY); } catch (eW2) { }
            break;
          }
        }
      } catch (e) { }
    }, 35);
  }

  // Khởi động các cổng giao tiếp
  try {
    initWebSocket();
    initFileIpc();
  } catch (eInit) { }

})(this);
