!(function () { window.webOS = window.webOS || {}, typeof module === 'object' && module.exports && (module.exports = window.webOS); }()), (function () {
  if (webOS.platform = {}, window.PalmSystem) {
    if (navigator.userAgent.indexOf('SmartWatch') > -1)webOS.platform.watch = !0; else if (navigator.userAgent.indexOf('SmartTV') > -1 || navigator.userAgent.indexOf('Large Screen') > -1)webOS.platform.tv = !0; else {
      try {
        const e = JSON.parse(PalmSystem.deviceInfo || '{}'); if (e.platformVersionMajor && e.platformVersionMinor) {
          let t = parseInt(e.platformVersionMajor),
         o = parseInt(e.platformVersionMinor); t < 3 || t == 3 && o <= 0 ? webOS.platform.legacy = !0 : webOS.platform.open = !0;
        }
      } catch (i) { webOS.platform.open = !0; }window.Mojo = window.Mojo || { relaunch(e) {} }, window.PalmSystem && PalmSystem.stageReady && PalmSystem.stageReady();
    }
  } else webOS.platform.unknown = !0;
}()), (function () {
  webOS.fetchAppId = function () { if (window.PalmSystem && PalmSystem.identifier) return PalmSystem.identifier.split(' ')[0]; }, webOS.fetchAppInfo = function (e, t) {
    if (webOS.appInfo)e && e(webOS.appInfo); else {
      let o = function (t, o) { if (!t && o) try { webOS.appInfo = JSON.parse(o), e && e(webOS.appInfo); } catch (i) { console.error(`Unable to parse appinfo.json file for ${appID}`), e && e(); } else e && e(); },
        i = new XMLHttpRequest(); i.onreadystatechange = function () { i.readyState == 4 && (i.status >= 200 && i.status < 300 || i.status === 0 ? o(void 0, i.responseText) : o({ status: 404 })); }; try { i.open('GET', t || 'appinfo.json', !0), i.send(null); } catch (s) { o({ status: 404 }); }
    }
  }, webOS.fetchAppRootPath = function () { let e = window.location.href; if ('baseURI' in window.document)e = window.document.baseURI; else { const t = window.document.getElementsByTagName('base'); t.length > 0 && (e = t[0].href); } const o = e.match(new RegExp('.*://[^#]*/')); return o ? o[0] : ''; }, webOS.platformBack = function () { if (window.PalmSystem && PalmSystem.platformBack) return PalmSystem.platformBack(); };
}()), (function () { webOS.deviceInfo = function (e) { if (this.device)e(this.device); else { this.device = {}; try { const t = JSON.parse(PalmSystem.deviceInfo); this.device.modelName = t.modelName, this.device.modelNameAscii = t.modelNameAscii, this.device.version = t.platformVersion, this.device.versionMajor = t.platformVersionMajor, this.device.versionMinor = t.platformVersionMinor, this.device.versionDot = t.platformVersionDot, this.device.sdkVersion = t.platformVersion, this.device.screenWidth = t.screenWidth, this.device.screenHeight = t.screenHeight; } catch (o) { this.device.modelName = this.device.modelNameAscii = 'webOS Device'; } this.device.screenHeight = this.device.screenHeight || screen.height, this.device.screenWidth = this.device.screenWidth || screen.width; const i = this; webOS.platform.tv ? webOS.service.request('luna://com.webos.service.tv.systemproperty', { method: 'getSystemInfo', parameters: { keys: ['firmwareVersion', 'modelName', 'sdkVersion', 'UHD'] }, onSuccess(t) { if (i.device.modelName = t.modelName || i.device.modelName, i.device.modelNameAscii = t.modelName || i.device.modelNameAscii, i.device.sdkVersion = t.sdkVersion || i.device.sdkVersion, i.device.uhd = t.UHD === 'true', t.firmwareVersion && t.firmwareVersion !== '0.0.0' || (t.firmwareVersion = t.sdkVersion), t.firmwareVersion) { i.device.version = t.firmwareVersion; for (let o = i.device.version.split('.'), s = ['versionMajor', 'versionMinor', 'versionDot'], n = 0; n < s.length; n++) try { i.device[s[n]] = parseInt(o[n]); } catch (r) { i.device[s[n]] = o[n]; } }e(i.device); }, onFailure(t) { e(i.device); } }) : (webOS.platform.watch && (this.device.modelName = this.device.modelNameAscii = 'webOS Watch'), e(this.device)); } }; }()), (function () { webOS.feedback = { play(e) { if (webOS && webOS.platform && webOS.platform.watch) { const t = { name: e || 'touch', sink: 'pfeedback' }; if (!window.PalmServiceBridge) return; webOS.service.request('luna://com.palm.audio/systemsounds', { method: 'playFeedback', parameters: t, subscribe: !1, resubscribe: !1 }); } } }; }()), (function () { webOS.keyboard = { isShowing() { return !!(PalmSystem && PalmSystem.isKeyboardVisible && PalmSystem.isKeyboardVisible()); } }; }()), (function () {
  webOS.notification = { showToast(e, t) {
    let o = e.message || '',
      i = e.icon || '',
      s = webOS.fetchAppId(),
      n = e.appId || s,
      r = e.appParams || {},
      a = e.target,
      c = e.noaction,
      l = e.stale || !1,
      m = e.soundClass || '',
      u = e.soundFile || '',
      d = e.soundDurationMs || ''; if (webOS.platform.legacy || webOS.platform.open) { const f = (e.response || { banner: !0 }, PalmSystem.addBannerMessage(o, JSON.stringify(r), i, m, u, d)); t && t(f); } else { o.length > 60 && console.warn('Toast notification message is longer than recommended. May not display as intended'); const b = { sourceId: s, message: o, stale: l, noaction: c }; i && i.length > 0 && (b.iconUrl = i), c || (a ? b.onclick = { target: a } : b.onclick = { appId: n, params: r }), this.showToastRequest = webOS.service.request('palm://com.webos.notification', { method: 'createToast', parameters: b, onSuccess(e) { t && t(e.toastId); }, onFailure(e) { console.error(`Failed to create toast: ${JSON.stringify(e)}`), t && t(); } }); }
  },
    removeToast(e) { if (webOS.platform.legacy || webOS.platform.open) try { PalmSystem.removeBannerMessage(e); } catch (t) { console.warn(t), PalmSystem.clearBannerMessage(); } else this.removeToastRequest = webOS.service.request('palm://com.webos.notification', { method: 'closeToast', parameters: { toastId: e } }); },
    supportsDashboard() { return webOS.platform.legacy || webOS.platform.open; },
    showDashboard(e, t) { if (webOS.platform.legacy || webOS.platform.open) { const o = window.open(e, '_blank', 'attributes={"window":"dashboard"}'); return t && o.document.write(t), o.PalmSystem && o.PalmSystem.stageReady(), o; }console.warn('Dashboards are not supported on this version of webOS.'); } };
}()), (function () {
  let e = 0,
    t = 1,
    o = 2,
    i = 3,
    s = 4,
    n = 5,
    r = 6,
    a = 7,
    c = function (e) { return !!e && typeof e === 'object' && Object.prototype.toString.call(e) !== '[object Array]'; },
    l = function (e, t, o, s) { window.PalmSystem && (o && !c(o) && (e = i, o = { msgid: t }, t = 'MISMATCHED_FMT', s = null, console.warn('webOSLog called with invalid format: keyVals must be an object')), t || e == a || console.warn('webOSLog called with invalid format: messageId was empty'), o && (o = JSON.stringify(o)), window.PalmSystem.PmLogString ? e == a ? window.PalmSystem.PmLogString(e, null, null, s) : window.PalmSystem.PmLogString(e, t, o, s) : console.error('Unable to send log; PmLogString not found in this version of PalmSystem')); }; webOS.emergency = function (t, o, i) { l(e, t, o, i); }, webOS.alert = function (e, o, i) { l(t, e, o, i); }, webOS.critical = function (e, t, i) { l(o, e, t, i); }, webOS.error = function (e, t, o) { l(i, e, t, o); }, webOS.warning = function (e, t, o) { l(s, e, t, o); }, webOS.notice = function (e, t, o) { l(n, e, t, o); }, webOS.info = function (e, t, o) { l(r, e, t, o); }, webOS.debug = function (e) { l(a, '', '', e); };
}()), (function () { function e(e, t) { this.uri = e, t = t || {}, t.method && (this.uri.charAt(this.uri.length - 1) != '/' && (this.uri += '/'), this.uri += t.method), typeof t.onSuccess === 'function' && (this.onSuccess = t.onSuccess), typeof t.onFailure === 'function' && (this.onFailure = t.onFailure), typeof t.onComplete === 'function' && (this.onComplete = t.onComplete), this.params = typeof t.parameters === 'object' ? t.parameters : {}, this.subscribe = t.subscribe || !1, this.subscribe && (this.params.subscribe = t.subscribe), this.params.subscribe && (this.subscribe = this.params.subscribe), this.resubscribe = t.resubscribe || !1, this.send(); }e.prototype.send = function () { if (!window.PalmServiceBridge) return this.onFailure && this.onFailure({ errorCode: -1, errorText: 'PalmServiceBridge not found.', returnValue: !1 }), this.onComplete && this.onComplete({ errorCode: -1, errorText: 'PalmServiceBridge not found.', returnValue: !1 }), void console.error('PalmServiceBridge not found.'); this.bridge = new PalmServiceBridge(); const t = this; this.bridge.onservicecallback = this.callback = function (o) { let i; if (!t.cancelled) { try { i = JSON.parse(o); } catch (s) { i = { errorCode: -1, errorText: o, returnValue: !1 }; }(i.errorCode || i.returnValue == 0) && t.onFailure ? (t.onFailure(i), t.resubscribe && t.subscribe && (t.delayID = setTimeout(() => { t.send(); }, e.resubscribeDelay))) : t.onSuccess && t.onSuccess(i), t.onComplete && t.onComplete(i), t.subscribe || t.cancel(); } }, this.bridge.call(this.uri, JSON.stringify(this.params)); }, e.prototype.cancel = function () { this.cancelled = !0, this.resubscribeJob && clearTimeout(this.delayID), this.bridge && (this.bridge.cancel(), this.bridge = void 0); }, e.prototype.toString = function () { return '[LS2Request]'; }, e.resubscribeDelay = 1e4, webOS.service = { request(t, o) { return new e(t, o); }, systemPrefix: 'com.webos.', protocol: 'luna://' }, navigator.service = { request: webOS.service.request }, navigator.service.Request = navigator.service.request; }()), (function () { webOS.libVersion = '0.1.0'; }()), (function () {
  webOS.voicereadout = { readAlert(e, t) {
    const o = typeof t !== 'boolean' || t; if (webOS && webOS.platform && webOS.platform.watch) {
      var i,
        s,
        n = function (e) { webOS.service.request('luna://com.webos.settingsservice', { method: 'getSystemSettings', parameters: { category: 'VoiceReadOut' }, onSuccess(t) { t && t.settings.talkbackEnable && e(); }, onFailure(e) { console.error(`Failed to get system VoiceReadOut settings: ${JSON.stringify(e)}`); } }); },
        r = function (e) { webOS.service.request('luna://com.webos.settingsservice', { method: 'getSystemSettings', parameters: { keys: ['localeInfo'] }, onSuccess(t) { i = t.settings.localeInfo.locales.TTS, e(); }, onFailure(e) { console.error(`Failed to get system localeInfo settings: ${JSON.stringify(e)}`); } }); },
        a = function (e) { webOS.service.request('luna://com.webos.settingsservice', { method: 'getSystemSettings', parameters: { category: 'option', key: 'ttsSpeechRate' }, onSuccess(t) { s = Number(t.settings.ttsSpeechRate), e(); }, onFailure(e) { console.error(`Failed to get system speechRate settings: ${JSON.stringify(e)}`); } }); },
        c = function () { webOS.service.request('luna://com.lge.service.tts', { method: 'speak', parameters: { locale: i, text: e, speechRate: s } }); }; n(() => { r(() => { a(c); }); });
    } else if (webOS && webOS.platform && webOS.platform.tv) {
      var l = function (e) { webOS.service.request('luna://com.webos.settingsservice', { method: 'getSystemSettings', parameters: { keys: ['audioGuidance'], category: 'option' }, onSuccess(t) { t && t.settings.audioGuidance === 'on' && e(); }, onFailure(e) { console.error(`Failed to get system AudioGuidance settings: ${JSON.stringify(e)}`); } }); },
        c = function () { webOS.service.request('luna://com.webos.service.tts', { method: 'speak', parameters: { text: e, clear: o }, onFailure(e) { console.error(`Failed to readAlertMessage: ${JSON.stringify(e)}`); } }); }; l(c);
    } else console.warn("Platform doesn't support TTS api.");
  } };
}());
