webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(12);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Metric = __webpack_require__(558);

var _Metric2 = _interopRequireDefault(_Metric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = void 0;

var Metric = function (_TargetMetric) {
  (0, _inherits3.default)(Metric, _TargetMetric);

  function Metric() {
    (0, _classCallCheck3.default)(this, Metric);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Metric.__proto__ || (0, _getPrototypeOf2.default)(Metric)).call(this));

    if (instance) {
      throw new Error('The instance of Metric must be obtained by Metric.getInstance() method');
    }
    instance = _this;
    return _this;
  }

  (0, _createClass3.default)(Metric, null, [{
    key: 'getInstance',
    value: function getInstance() {
      if (!instance) {
        instance = new Metric();
      }
      return instance;
    }
  }]);
  return Metric;
}(_Metric2.default);

exports.default = Metric;

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  methods: {
    arrayToItems: function arrayToItems(array) {
      return array.map(function (x) {
        if (x.tvshow_id) {
          return {
            type: 'tvshow',
            id: x.tvshow_id
          };
        } else if (x.video_id) {
          return {
            type: 'video',
            id: x.video_id
          };
        }
        return {};
      });
    },
    startTimeInterval: function startTimeInterval() {
      var _this = this;

      this.time = (0, _moment2.default)().unix();
      clearInterval(this.intervalId);
      this.intervalId = setInterval(function () {
        _this.time = (0, _moment2.default)().unix();
      }, 5000);
    },
    stopTimeInterval: function stopTimeInterval() {
      clearInterval(this.intervalId);
      this.intervalId = null;
    },
    isChannelAdultLocked: function isChannelAdultLocked(channel) {
      return channel.age_rating === '18+' && this.$backend.settings.getParentControl();
    }
  }
};

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(710)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(515),
  /* template */
  __webpack_require__(890),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  methods: {
    addToFavorite: function addToFavorite(id, type) {
      switch (type) {
        case 'channel':
          this.addFavoriteChannel(id);
          break;
        case 'tvshow':
          this.addFavoriteTvshow(id);
          break;
        case 'video':
          this.addFavoriteVideo(id);
          break;
        default:
          break;
      }
    },
    removeFromFavorite: function removeFromFavorite(id, type) {
      switch (type) {
        case 'channel':
          this.removeFavoriteChannel(id);
          break;
        case 'tvshow':
          this.removeFavoriteTvshow(id);
          break;
        case 'video':
          this.removeFavoriteVideo(id);
          break;
        default:
          break;
      }
    },
    addFavoriteChannel: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(id) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.$backend.favorite.addChannel(id);

              case 2:
                _context.t0 = this.$store;
                _context.next = 5;
                return this.$backend.favorite.getChannels();

              case 5:
                _context.t1 = _context.sent;

                _context.t0.commit.call(_context.t0, 'setFavoriteChannels', _context.t1);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addFavoriteChannel(_x) {
        return _ref.apply(this, arguments);
      }

      return addFavoriteChannel;
    }(),
    removeFavoriteChannel: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(id) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.$backend.favorite.removeChannel(id);

              case 2:
                _context2.t0 = this.$store;
                _context2.next = 5;
                return this.$backend.favorite.getChannels();

              case 5:
                _context2.t1 = _context2.sent;

                _context2.t0.commit.call(_context2.t0, 'setFavoriteChannels', _context2.t1);

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function removeFavoriteChannel(_x2) {
        return _ref2.apply(this, arguments);
      }

      return removeFavoriteChannel;
    }(),
    addFavoriteTvshow: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(id) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.$backend.favorite.addTvshow(id);

              case 2:
                _context3.t0 = this.$store;
                _context3.next = 5;
                return this.$backend.favorite.getTvshows();

              case 5:
                _context3.t1 = _context3.sent;

                _context3.t0.commit.call(_context3.t0, 'setFavoriteTvshows', _context3.t1);

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addFavoriteTvshow(_x3) {
        return _ref3.apply(this, arguments);
      }

      return addFavoriteTvshow;
    }(),
    removeFavoriteTvshow: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(id) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.$backend.favorite.removeTvshow(id);

              case 2:
                _context4.t0 = this.$store;
                _context4.next = 5;
                return this.$backend.favorite.getTvshows();

              case 5:
                _context4.t1 = _context4.sent;

                _context4.t0.commit.call(_context4.t0, 'setFavoriteTvshows', _context4.t1);

              case 7:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function removeFavoriteTvshow(_x4) {
        return _ref4.apply(this, arguments);
      }

      return removeFavoriteTvshow;
    }(),
    addFavoriteVideo: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(id) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.$backend.favorite.addVideo(id);

              case 2:
                _context5.t0 = this.$store;
                _context5.next = 5;
                return this.$backend.favorite.getVideos();

              case 5:
                _context5.t1 = _context5.sent;

                _context5.t0.commit.call(_context5.t0, 'setFavoriteVideos', _context5.t1);

              case 7:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function addFavoriteVideo(_x5) {
        return _ref5.apply(this, arguments);
      }

      return addFavoriteVideo;
    }(),
    removeFavoriteVideo: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(id) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.$backend.favorite.removeVideo(id);

              case 2:
                _context6.t0 = this.$store;
                _context6.next = 5;
                return this.$backend.favorite.getVideos();

              case 5:
                _context6.t1 = _context6.sent;

                _context6.t0.commit.call(_context6.t0, 'setFavoriteVideos', _context6.t1);

              case 7:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function removeFavoriteVideo(_x6) {
        return _ref6.apply(this, arguments);
      }

      return removeFavoriteVideo;
    }(),
    checkFavorite: function checkFavorite(id, type) {
      switch (type) {
        case 'channel':
          return this.$store.getters.favoriteChannels.some(function (channel) {
            return channel.channel_id === id;
          });

        case 'tvshow':
          return this.$store.getters.favoriteTvshows.some(function (tvshow) {
            return tvshow.tvshow_id === id;
          });

        case 'video':
          return this.$store.getters.favoriteVideos.some(function (video) {
            return video.video_id === id;
          });

        default:
          return false;
      }
    }
  }
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  methods: {
    getChannelFrame: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(channelId, time) {
        var transform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'none';
        var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var height = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
        var t, channel, url;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                t = Math.round(time / 60) * 60;
                _context.next = 3;
                return this.$backend.content.getChannel(channelId);

              case 3:
                channel = _context.sent;

                if (!channel.frame_url) {
                  _context.next = 8;
                  break;
                }

                url = channel.frame_url;

                if (channel.frame_url.length) {
                  /* eslint-disable no-template-curly-in-string */
                  url = url.replace('${channelId}', channelId).replace('${t}', time).replace('${transform}', transform).replace('${width}', width).replace('${height}', height);
                }
                return _context.abrupt('return', url);

              case 8:
                return _context.abrupt('return', 'https://persik.by/utils/show-frame.php?c=' + channelId + '&t=' + t + '&tr=' + transform + '&w=' + width + '&h=' + height);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getChannelFrame(_x4, _x5) {
        return _ref.apply(this, arguments);
      }

      return getChannelFrame;
    }(),
    getTvshowFrame: function getTvshowFrame(tvshow) {
      var transform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
      var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      var l = tvshow.stop - tvshow.start;
      var time = tvshow.start + 3 / 7 * l;
      return this.getChannelFrame(tvshow.channel_id, time, transform, width, height);
    },
    getVideoFrame: function getVideoFrame(videoId, time) {
      var transform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'none';
      var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var height = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

      var t = Math.round(time / 60) * 60;
      return 'https://persik.by/utils/show-frame-video.php?v=' + videoId + '&t=' + t + '&tr=' + transform + '&w=' + width + '&h=' + height;
    },
    getChannelLogo: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(channelId) {
        var channel;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.$backend.content.getChannel(channelId);

              case 2:
                channel = _context2.sent;
                return _context2.abrupt('return', channel.logo);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getChannelLogo(_x12) {
        return _ref2.apply(this, arguments);
      }

      return getChannelLogo;
    }()
  }
};

/***/ }),
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatTime(time) {
  var hours = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var seconds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  function pad(num) {
    return num.toString().padStart(2, '0');
  }
  var parts = [];
  var m = Math.floor(time / 60);

  if (hours) {
    var h = Math.floor(m / 60);
    m %= 60;
    parts.push(h);
  }
  parts.push(m);
  if (seconds) {
    var s = Math.floor(time % 60);
    parts.push(s);
  }

  return parts.map(pad).join(':');
}

function momentFormat(time, format) {
  return (0, _moment2.default)(time).format(format);
}

exports.default = {
  methods: {
    getMoment: function getMoment(unixtime) {
      return _moment2.default.unix(unixtime).utcOffset(this.$store.getters.utcOffset);
    },

    formatTime: formatTime,
    momentFormat: momentFormat,
    getTime: function getTime() {
      return (0, _moment2.default)().valueOf();
    }
  },
  filters: {
    formatTime: formatTime,
    momentFormat: momentFormat
  }
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _slicedToArray2 = __webpack_require__(97);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _imagePromise = __webpack_require__(308);

var _imagePromise2 = _interopRequireDefault(_imagePromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getImageUrl = function getImageUrl(url, action, width, height) {
  var pattern = 'https?:[\\/]{2}img[.]persik[.]by[\\/]([\\w\\/]*)?\\w*[.](jpg|png|gif)';
  var regex = new RegExp(pattern);
  var result = regex.exec(url);
  if (result !== null) {
    var _url$match = url.match(/([^/]+)\/([^/]+)$/),
        _url$match2 = (0, _slicedToArray3.default)(_url$match, 3),
        bucketName = _url$match2[1],
        pictureName = _url$match2[2];

    switch (action) {
      case 'crop':
        return 'https://ir.persik.by/crop/' + width + '/' + height + '/' + bucketName + '/' + pictureName;
      case 'resizeFull':
        return 'https://ir.persik.by/resize/' + width + '/' + height + '/' + bucketName + '/' + pictureName;
      case 'resizeWidth':
        return 'https://ir.persik.by/resize/' + width + '/-/' + bucketName + '/' + pictureName;
      case 'resizeHeight':
        return 'https://ir.persik.by/resize/-/' + height + '/' + bucketName + '/' + pictureName;
      default:
        return url;
    }
  } else return url;
};

exports.default = {
  methods: {
    crop: function crop(url, width, height) {
      return getImageUrl(url, 'crop', width, height);
    },
    resize: function resize(url, width, height) {
      return getImageUrl(url, 'resizeFull', width, height);
    },
    resizeW: function resizeW(url, width) {
      return getImageUrl(url, 'resizeWidth', width, null);
    },
    resizeH: function resizeH(url, height) {
      return getImageUrl(url, 'resizeHeight', null, height);
    },
    loadImage: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return (0, _imagePromise2.default)(url);

              case 3:
                _context.next = 8;
                break;

              case 5:
                _context.prev = 5;
                _context.t0 = _context['catch'](0);
                return _context.abrupt('return', '');

              case 8:
                return _context.abrupt('return', url);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 5]]);
      }));

      function loadImage(_x) {
        return _ref.apply(this, arguments);
      }

      return loadImage;
    }()
  },
  filters: {
    crop: function crop(url, width, height) {
      return getImageUrl(url, 'crop', width, height);
    },
    resize: function resize(url, width, height) {
      return getImageUrl(url, 'resizeFull', width, height);
    },
    'resize-w': function resizeW(url, width) {
      return getImageUrl(url, 'resizeWidth', width, null);
    },
    'resize-h': function resizeH(url, height) {
      return getImageUrl(url, 'resizeHeight', null, height);
    }
  }
};

/***/ }),
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(741)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(506),
  /* template */
  __webpack_require__(922),
  /* scopeId */
  "data-v-e43ef320",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 60 */,
/* 61 */,
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isInteger = __webpack_require__(578);

var _isInteger2 = _interopRequireDefault(_isInteger);

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = __webpack_require__(43);

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = __webpack_require__(12);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _lodash = __webpack_require__(76);

var _lodash2 = _interopRequireDefault(_lodash);

var _eventDispatcher = __webpack_require__(61);

var _eventDispatcher2 = _interopRequireDefault(_eventDispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = void 0;

var Epg = function (_EventDispatcher) {
  (0, _inherits3.default)(Epg, _EventDispatcher);
  (0, _createClass3.default)(Epg, null, [{
    key: 'DB_READY_STATE',
    get: function get() {
      return 'DB_READY_STATE';
    }
  }]);

  function Epg() {
    (0, _classCallCheck3.default)(this, Epg);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Epg.__proto__ || (0, _getPrototypeOf2.default)(Epg)).call(this));

    if (instance) {
      throw new Error('The instance of Epg must be obtained by Epg.getInstance() method');
    }
    instance = _this;
    _this.db = null;
    _this.resetCache();
    return _this;
  }

  (0, _createClass3.default)(Epg, [{
    key: 'resetCache',
    value: function resetCache() {
      this.cachedPrevTvshows = {};
      this.cachedNextTvshows = {};
      this.emptyChannelsIndex = {};
    }
  }, {
    key: 'openDb',
    value: function openDb(dbName) {
      var _this2 = this;

      this.dbName = dbName;
      var final = function final(dbStore) {
        var stores = dbStore.objectStoreNames;

        if (stores.length && stores.contains('person')) {
          dbStore.deleteObjectStore('person');
        }
        var objectStore = void 0;
        objectStore = dbStore.createObjectStore('person', { keyPath: 'person_id' });
        objectStore.createIndex('ts', 'ts');

        if (stores.length && stores.contains('tvshow')) {
          dbStore.deleteObjectStore('tvshow');
        }
        objectStore = dbStore.createObjectStore('tvshow', { keyPath: 'tvshow_id' });
        objectStore.createIndex('channel_id', 'channel_id');
        objectStore.createIndex('id_stop', 'id_stop');
        objectStore.createIndex('id_start', 'id_start');
        objectStore.createIndex('ts', 'ts');

        if (stores.length && stores.contains('video')) {
          dbStore.deleteObjectStore('video');
        }
        objectStore = dbStore.createObjectStore('video', { keyPath: 'video_id' });
        objectStore.createIndex('ts', 'ts');
      };

      var versionControlDb = [final, final];

      var version = 2;

      return new _promise2.default(function (resolve) {
        var request = Epg.indexedDB.open(dbName, version);
        request.onupgradeneeded = function (event) {
          var dbStore = event.target.result;
          var oldVersion = event.oldVersion;
          var newVersion = event.newVersion;
          if (oldVersion === 0 || typeof oldVersion === 'undefined') {
            console.log('Create EPG database'); //eslint-disable-line
            versionControlDb[0].call(this, dbStore);
          } else {
            //eslint-disable-next-line
            console.log('Upgrade DB from version ' + oldVersion + ' to ' + newVersion);
            for (var i = oldVersion; i < newVersion; i += 1) {
              if (versionControlDb[i]) {
                //eslint-disable-next-line
                console.log('Applying migration DB patch #' + i);
                versionControlDb[i].call(this, dbStore);
              }
            }
          }
        };
        request.onsuccess = function (event) {
          _this2.db = event.target.result;
          Epg.dispatchEvent(Epg.DB_READY_STATE);
          resolve();
        };
      });
    }
  }, {
    key: 'deleteDb',
    value: function deleteDb() {
      var _this3 = this;

      if (Epg.indexedDB.deleteDatabase) {
        return new _promise2.default(function (resolve, reject) {
          //eslint-disable-next-line
          console.log('Delete EPG database ...');
          _this3.db.close();
          var request = Epg.indexedDB.deleteDatabase(_this3.dbName);
          request.onerror = function () {
            reject('Error deleting database');
          };

          request.onblocked = function () {
            reject('EPG database blocked');
          };

          request.onsuccess = function () {
            //eslint-disable-next-line
            console.log('EPG database deleted successfully');
            resolve();
          };
        });
      }
      return false;
    }
  }, {
    key: 'clearCounter',
    value: function clearCounter() {
      this.total = 0;
      this.currentCount = 0;
      this.percents = 0;
    }
  }, {
    key: 'deleteFullData',
    value: function deleteFullData(table, minStart) {
      var _this4 = this;

      return new _promise2.default(function (resolve) {
        var transaction = _this4.db.transaction([table], 'readwrite');
        var objectStore = transaction.objectStore(table);
        objectStore.openCursor().onsuccess = function (eventCursor) {
          var cursor = eventCursor.target.result;
          if (cursor) {
            if (cursor.value.deleted || table === 'tvshow' && cursor.value.start < minStart) {
              cursor.delete();
            }
            cursor.continue();
          } else {
            resolve();
          }
        };
      });
    }
  }, {
    key: 'deleteDeletedData',
    value: function deleteDeletedData(table) {
      var _this5 = this;

      return new _promise2.default(function (resolve) {
        var transaction = _this5.db.transaction([table], 'readwrite');
        var objectStore = transaction.objectStore(table);
        objectStore.openCursor().onsuccess = function (eventCursor) {
          var cursor = eventCursor.target.result;
          if (cursor) {
            if (cursor.value.deleted) {
              cursor.delete();
            }
            cursor.continue();
          } else {
            resolve();
          }
        };
      });
    }
  }, {
    key: 'deleteOldData',
    value: function deleteOldData(table, minStart) {
      var _this6 = this;

      return new _promise2.default(function (resolve) {
        var transaction = _this6.db.transaction([table], 'readwrite');
        var objectStore = transaction.objectStore(table);
        console.log('Deleting old data from ' + table); //eslint-disable-line
        // let deleted = 0;
        objectStore.openCursor().onsuccess = function (eventCursor) {
          var cursor = eventCursor.target.result;
          if (cursor) {
            if (table === 'tvshow' && cursor.value.start < minStart) {
              cursor.delete();
              // deleted += 1;
            }
            cursor.continue();
          } else {
            // console.log(`Deleted ${deleted} rows from ${table}`); //eslint-disable-line
            resolve();
          }
        };
      });
    }
  }, {
    key: 'importDataTvshows',
    value: function importDataTvshows(data) {
      var _this7 = this;

      var count = 0;
      return new _promise2.default(function (resolve) {
        var transaction = _this7.db.transaction(['tvshow'], 'readwrite');
        var objectStore = transaction.objectStore('tvshow');
        data.tvshows.items.forEach(function (row) {
          objectStore.put({
            id_stop: row.channel_id + '_' + row.stop,
            id_start: row.channel_id + '_' + row.start,
            tvshow_id: row.tvshow_id,
            channel_id: parseInt(row.channel_id, 10),
            title: row.title,
            date: row.date,
            start: parseInt(row.start, 10),
            stop: parseInt(row.stop, 10),
            video_id: parseInt(row.video_id, 10),
            deleted: !!parseInt(row.deleted, 10),
            ts: parseInt(row.ts, 10)
          });
          count += 1;
        });
        _this7.resetCache();
        console.log('Imported ' + count + ' tvshows'); //eslint-disable-line
        resolve();
      });
    }
  }, {
    key: 'importDataVideos',
    value: function importDataVideos(data) {
      var _this8 = this;

      var count = 0;
      return new _promise2.default(function (resolve) {
        var transaction = _this8.db.transaction(['video'], 'readwrite');
        var objectStore = transaction.objectStore('video');
        data.videos.items.forEach(function (row) {
          var deleted = !!parseInt(row.deleted, 10);
          if (!deleted) {
            var participants = null;
            try {
              participants = row.participants ? JSON.parse(row.participants) : null;
            } catch (e) {
              console.error(e); //eslint-disable-line
            }
            objectStore.put({
              video_id: parseInt(row.video_id, 10),
              name: row.name,
              international_name: row.international_name,
              year: row.year,
              description: row.description,
              participants: participants,
              age_rating: row.age_rating,
              cover: row.cover,
              deleted: deleted,
              ts: parseInt(row.ts, 10)
            });
            count += 1;
          }
        });
        _this8.resetCache();
        console.log('Imported ' + count + ' videos'); //eslint-disable-line
        resolve();
      });
    }
  }, {
    key: 'importDataPersons',
    value: function importDataPersons(data) {
      var _this9 = this;

      var count = 0;
      return new _promise2.default(function (resolve) {
        var transaction = _this9.db.transaction(['person'], 'readwrite');
        var objectStore = transaction.objectStore('person');
        data.persons.items.forEach(function (row) {
          var deleted = !!parseInt(row.deleted, 10);
          if (!deleted) {
            objectStore.put({
              person_id: parseInt(row.person_id, 10),
              name: row.name,
              international_name: row.international_name,
              info: row.info,
              photo: row.photo,
              deleted: !!parseInt(row.deleted, 10),
              ts: parseInt(row.ts, 10)
            });
            count += 1;
          }
        });
        _this9.resetCache();
        console.log('Imported ' + count + ' persons'); //eslint-disable-line
        resolve();
      });
    }
  }, {
    key: 'getLastTs',
    value: function getLastTs(table) {
      var _this10 = this;

      return new _promise2.default(function (resolve) {
        var maxTs = 0;
        var transaction = _this10.db.transaction(table, 'readonly');
        var objectStore = transaction.objectStore(table);
        var cursor = objectStore.index('ts').openCursor(null, 'prev');
        cursor.onsuccess = function (event) {
          if (event.target.result) {
            maxTs = event.target.result.value.ts;
          }
        };
        transaction.oncomplete = function () {
          resolve(maxTs);
        };
      });
    }
  }, {
    key: 'hasChannel',
    value: function hasChannel(channelId) {
      var _this11 = this;

      if (_lodash2.default.has(this.emptyChannelsIndex, channelId)) {
        return this.emptyChannelsIndex[channelId];
      }
      return new _promise2.default(function (resolve) {
        var transaction = _this11.db.transaction('tvshow', 'readonly');
        var objectStore = transaction.objectStore('tvshow');
        var key = Epg.keyRange.only(channelId);
        var cursor = objectStore.index('channel_id').openCursor(key);
        cursor.onsuccess = function (event) {
          var result = !!event.target.result;
          _this11.emptyChannelsIndex[channelId] = result;
          resolve(result);
        };
      });
    }
  }, {
    key: 'getDatesByChannelId',
    value: function getDatesByChannelId(channelId) {
      var _this12 = this;

      return new _promise2.default(function (resolve) {
        var dates = [];
        var transaction = _this12.db.transaction('tvshow', 'readonly');
        var objectStore = transaction.objectStore('tvshow');
        var key = Epg.keyRange.only(channelId);
        var cursor = objectStore.index('channel_id').openCursor(key);
        cursor.onsuccess = function (event) {
          var cur = event.target.result;
          if (cur) {
            var date = event.target.result.value.date;
            if (!dates.includes(date)) {
              dates.push(date);
            }
            cur.continue();
          } else {
            dates.sort();
            resolve(dates);
          }
        };
      });
    }
  }, {
    key: 'getActualTvshowsNext',
    value: function getActualTvshowsNext(channelId, dt, limit) {
      var _this13 = this;

      return new _promise2.default(function (resolve) {
        var tvshows = [];
        var tvshowObjectStore = _this13.db.transaction('tvshow').objectStore('tvshow', 'readonly');
        var key = channelId + '_' + dt;
        var request = tvshowObjectStore.index('id_stop').openCursor(Epg.keyRange.lowerBound(key, true));
        request.onsuccess = function (eventTv) {
          var tvshowCursor = eventTv.target.result;
          if (tvshowCursor) {
            if (parseInt(channelId, 10) === tvshowCursor.value.channel_id) {
              tvshows.push(tvshowCursor.value);
              if (tvshows.length >= limit) {
                tvshows.sort(function (a, b) {
                  return a.stop - b.stop;
                });
                tvshows = tvshows.slice(0, limit);
                resolve(tvshows);
              } else {
                tvshowCursor.continue();
              }
            } else {
              resolve(tvshows);
            }
          } else {
            tvshows.sort(function (a, b) {
              return a.stop - b.stop;
            });
            tvshows = tvshows.slice(0, limit);
            resolve(tvshows);
          }
        };
      });
    }
  }, {
    key: 'getActualTvshowsPrev',
    value: function getActualTvshowsPrev(channelId, dt, limit) {
      var _this14 = this;

      return new _promise2.default(function (resolve) {
        var tvshows = [];
        var tvshowObjectStore = _this14.db.transaction('tvshow').objectStore('tvshow', 'readonly');
        var param = Epg.options.supportPrev ? 'prev' : 'next';
        tvshowObjectStore.index('id_start').openCursor(Epg.keyRange.upperBound(channelId + '_' + dt), param).onsuccess = function (eventTv) {
          var tvshowCursor = eventTv.target.result;
          if (tvshowCursor) {
            if (parseInt(channelId, 10) === tvshowCursor.value.channel_id) {
              tvshows.push(tvshowCursor.value);
              if (tvshows.length >= limit && Epg.options.supportPrev) {
                tvshows.sort(function (a, b) {
                  return b.start - a.start;
                });
                tvshows = tvshows.slice(0, limit);
                resolve(tvshows);
              } else {
                tvshowCursor.continue();
              }
            } else {
              resolve([]);
            }
          } else {
            tvshows.sort(function (a, b) {
              return a.stop - b.stop;
            });
            tvshows = tvshows.slice(0, limit);
            resolve(tvshows);
          }
        };
      });
    }
  }, {
    key: 'getObjectStoreItemById',
    value: function getObjectStoreItemById(table, id) {
      var _this15 = this;

      return new _promise2.default(function (resolve, reject) {
        var objectStore = _this15.db.transaction(table, 'readonly').objectStore(table);
        objectStore.get(id).onsuccess = function (eventStore) {
          var value = eventStore.target.result;
          if (typeof value !== 'undefined') {
            resolve(Epg.removeServiceProps(value));
          } else {
            reject(table + ' #' + id + ' not found');
          }
        };
      });
    }
  }, {
    key: 'getTvshowById',
    value: function getTvshowById(id) {
      return this.getObjectStoreItemById('tvshow', id);
    }
  }, {
    key: 'getVideoById',
    value: function getVideoById(id) {
      return this.getObjectStoreItemById('video', id);
    }
  }, {
    key: 'attachVideo',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(tvshow) {
        var video;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.getVideoById(tvshow.video_id);

              case 3:
                video = _context.sent;
                return _context.abrupt('return', (0, _assign2.default)({}, video, tvshow));

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);

                // eslint-disable-next-line
                console.error(_context.t0);
                return _context.abrupt('return', tvshow);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function attachVideo(_x) {
        return _ref.apply(this, arguments);
      }

      return attachVideo;
    }()
  }, {
    key: 'getTvshowsRange',
    value: function getTvshowsRange(channelId, start, stop) {
      var _this16 = this;

      return new _promise2.default(function (resolve) {
        var tvshows = [];
        var tvshowObjectStore = _this16.db.transaction('tvshow').objectStore('tvshow', 'readonly');
        tvshowObjectStore.index('channel_id').openCursor(channelId).onsuccess = function (eventTv) {
          var tvshowCursor = eventTv.target.result;
          if (tvshowCursor) {
            if (tvshowCursor.value.start >= start && tvshowCursor.value.stop <= stop) {
              tvshows.push(tvshowCursor.value);
            }
            tvshowCursor.continue();
          } else {
            tvshows.sort(function (a, b) {
              return a.start - b.start;
            });
            resolve(tvshows);
          }
        };
      });
    }

    /**
     *
     * @param {Number} channelId
     * @param {String} date as yyyy-mm-dd
     * @return {Promise<any>}
     */

  }, {
    key: 'getTvshowsByDate',
    value: function getTvshowsByDate(channelId, date) {
      var _this17 = this;

      return new _promise2.default(function (resolve) {
        var tvshows = [];
        var tvshowObjectStore = _this17.db.transaction('tvshow').objectStore('tvshow', 'readonly');
        tvshowObjectStore.index('channel_id').openCursor(channelId).onsuccess = function (eventTv) {
          var tvshowCursor = eventTv.target.result;
          if (tvshowCursor) {
            if (tvshowCursor.value.date === date) {
              tvshows.push(tvshowCursor.value);
            }
            tvshowCursor.continue();
          } else {
            tvshows.sort(function (a, b) {
              return a.start - b.start;
            });
            resolve(tvshows);
          }
        };
      });
    }
  }, {
    key: 'getNextTvshows',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(channelId, time, limit) {
        var res, intChannelId, dt, cache, tvshows, i, firstTvshow;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (channelId) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return', []);

              case 2:
                _context2.next = 4;
                return this.hasChannel(channelId);

              case 4:
                res = _context2.sent;

                if (res) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt('return', []);

              case 7:
                intChannelId = parseInt(channelId, 10);
                dt = (0, _isInteger2.default)(time) ? time : (0, _moment2.default)(time).unix();

                if (!(this.cachedNextTvshows[intChannelId] && this.cachedNextTvshows[intChannelId].tvshows.length)) {
                  _context2.next = 13;
                  break;
                }

                cache = this.cachedNextTvshows[intChannelId];

                if (!(cache.tvshows.length && cache.range && cache.range.start < dt && cache.range.stop > dt && cache.limit >= limit)) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt('return', cache.tvshows.slice(0, limit));

              case 13:
                _context2.next = 15;
                return this.getActualTvshowsNext(intChannelId, dt, limit);

              case 15:
                tvshows = _context2.sent;
                i = 0;

              case 17:
                if (!(i < tvshows.length)) {
                  _context2.next = 24;
                  break;
                }

                _context2.next = 20;
                return this.attachVideo(tvshows[i]);

              case 20:
                tvshows[i] = _context2.sent;

              case 21:
                i += 1;
                _context2.next = 17;
                break;

              case 24:

                if (tvshows.length) {
                  firstTvshow = tvshows[0];

                  this.cachedNextTvshows[intChannelId] = {
                    range: {
                      start: firstTvshow.start,
                      stop: firstTvshow.stop
                    },
                    limit: limit,
                    tvshows: tvshows
                  };
                }
                return _context2.abrupt('return', tvshows.slice(0, limit));

              case 26:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getNextTvshows(_x2, _x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return getNextTvshows;
    }()
  }, {
    key: 'getPrevTvshows',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(channelId, time, limit) {
        var _this18 = this;

        var intChannelId, dt, cache, tvshows, p, firstTvshow;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                intChannelId = channelId * 1;
                dt = (0, _isInteger2.default)(time) ? time : (0, _moment2.default)(time).unix();

                if (!(this.cachedPrevTvshows[intChannelId] && this.cachedPrevTvshows[intChannelId].tvshows.length)) {
                  _context3.next = 6;
                  break;
                }

                cache = this.cachedPrevTvshows[intChannelId];

                if (!(cache.tvshows.length && cache.range.start <= dt && cache.range.stop > dt && cache.limit >= limit)) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt('return', cache.tvshows.slice(0, limit));

              case 6:
                _context3.next = 8;
                return this.getActualTvshowsPrev(channelId, dt, limit + 1);

              case 8:
                tvshows = _context3.sent;
                p = [];

                tvshows.forEach(function (element) {
                  p.push(_this18.attachVideo(element));
                });

                _context3.next = 13;
                return _promise2.default.all(p);

              case 13:
                tvshows = _context3.sent;

                if (tvshows.length) {
                  firstTvshow = tvshows.shift();

                  tvshows.reverse();
                  this.cachedPrevTvshows[intChannelId] = {
                    range: {
                      start: firstTvshow.start,
                      stop: firstTvshow.stop
                    },
                    limit: limit,
                    tvshows: tvshows
                  };
                }
                return _context3.abrupt('return', tvshows.slice(0, limit));

              case 16:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getPrevTvshows(_x5, _x6, _x7) {
        return _ref3.apply(this, arguments);
      }

      return getPrevTvshows;
    }()
  }, {
    key: 'getPersonById',
    value: function getPersonById(id) {
      return this.getObjectStoreItemById('person', id);
    }

    /**
     *
     * @return {Promise}
     */

  }, {
    key: 'loadParticipants',
    value: function loadParticipants(object) {
      var _this19 = this;

      return new _promise2.default(function (resolve) {
        var allPersons = [];
        if (object.participants) {
          if (object.participants.director) {
            allPersons = _lodash2.default.concat(allPersons, object.participants.director);
          }
          if (object.participants.cast) {
            allPersons = _lodash2.default.concat(allPersons, object.participants.cast);
          }
        }
        if (!allPersons.length) {
          resolve(object);
        } else {
          var persons = {};
          allPersons.forEach(function () {
            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(id, index) {
              var person, personId, itemize, newObject;
              return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return _this19.getPersonById(id);

                    case 2:
                      person = _context4.sent;
                      personId = person.person_id;

                      persons[personId] = {
                        person_id: person.person_id,
                        name: person.name,
                        international_name: person.international_name,
                        info: person.info,
                        photo: person.photo
                      };
                      if (index === allPersons.length - 1) {
                        itemize = function itemize(pid) {
                          return persons[pid];
                        };

                        newObject = _lodash2.default.cloneDeep(object);

                        if (newObject.participants.director) {
                          newObject.participants.director = newObject.participants.director.map(itemize);
                        }
                        if (newObject.participants.cast) {
                          newObject.participants.cast = newObject.participants.cast.map(itemize);
                        }
                        resolve(newObject);
                      }

                    case 6:
                    case 'end':
                      return _context4.stop();
                  }
                }
              }, _callee4, _this19);
            }));

            return function (_x8, _x9) {
              return _ref4.apply(this, arguments);
            };
          }());
        }
      });
    }

    /**
     *
     * @return {Promise}
     */

  }, {
    key: 'loadVideo',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(videoId) {
        var video;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                video = this.getVideoById(videoId);
                _context5.next = 3;
                return this.loadParticipants(video);

              case 3:
                video = _context5.sent;
                return _context5.abrupt('return', video);

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function loadVideo(_x10) {
        return _ref5.apply(this, arguments);
      }

      return loadVideo;
    }()
  }, {
    key: 'close',
    value: function close() {
      this.db.close();
    }
  }], [{
    key: 'getInstance',
    value: function getInstance() {
      if (!instance) {
        instance = new Epg();
      }
      return instance;
    }
  }, {
    key: 'setIndexedDB',
    value: function setIndexedDB(db, keyRange) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      Epg.indexedDB = db;
      Epg.keyRange = keyRange;
      Epg.options = (0, _assign2.default)({ supportPrev: true }, options);
    }
  }, {
    key: 'removeServiceProps',
    value: function removeServiceProps(value) {
      var newValue = _lodash2.default.clone(value);
      delete newValue.deleted;
      if (newValue.id_start) {
        delete newValue.id_start;
      }
      if (newValue.id_stop) {
        delete newValue.id_stop;
      }
      delete newValue.ts;
      return newValue;
    }
  }]);
  return Epg;
}(_eventDispatcher2.default);

exports.default = Epg;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(12);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _DeviceInfo = __webpack_require__(557);

var _DeviceInfo2 = _interopRequireDefault(_DeviceInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = void 0;

/**
 * @interface IDeviceInfo
 */

var DeviceInfo = function (_TargetDeviceInfo) {
  (0, _inherits3.default)(DeviceInfo, _TargetDeviceInfo);

  function DeviceInfo() {
    (0, _classCallCheck3.default)(this, DeviceInfo);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DeviceInfo.__proto__ || (0, _getPrototypeOf2.default)(DeviceInfo)).call(this));

    if (instance) {
      throw new Error('The instance of DeviceInfo must be obtained by DeviceInfo.getInstance() method');
    }
    instance = _this;
    return _this;
  }

  (0, _createClass3.default)(DeviceInfo, null, [{
    key: 'getInstance',
    value: function getInstance() {
      if (!instance) {
        instance = new DeviceInfo();
      }
      return instance;
    }
  }]);
  return DeviceInfo;
}(_DeviceInfo2.default);

exports.default = DeviceInfo;

/***/ }),
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(729)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(477),
  /* template */
  __webpack_require__(909),
  /* scopeId */
  "data-v-7cf48c35",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _uaParserJs = __webpack_require__(435);

var _uaParserJs2 = _interopRequireDefault(_uaParserJs);

var _compareVersions = __webpack_require__(174);

var _compareVersions2 = _interopRequireDefault(_compareVersions);

var _EpgReaderWebWorker = __webpack_require__(566);

var _EpgReaderWebWorker2 = _interopRequireDefault(_EpgReaderWebWorker);

var _EpgReaderDefault = __webpack_require__(565);

var _EpgReaderDefault2 = _interopRequireDefault(_EpgReaderDefault);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = void 0;

var EpgReader = function () {
  function EpgReader() {
    (0, _classCallCheck3.default)(this, EpgReader);

    throw new Error('The instance of EpgReader must be obtained by EpgReader.getInstance() method');
  }

  (0, _createClass3.default)(EpgReader, null, [{
    key: 'getInstance',
    value: function getInstance() {
      if (!instance) {
        var parser = new _uaParserJs2.default();
        var result = parser.getResult();
        if (result.browser.name.match(/^Chrom/i)
        // отключаем Web Workers в глючной WebOS
        && !result.ua.match(/Web0S/i) && !result.ua.match(/WebOS/i)
        // удаляем 4-ый блок из версии "65.0.3325.162" -> "65.0.3325"
        && (0, _compareVersions2.default)(result.browser.version.replace(/\.\d+$/, ''), '37.0.0') >= 0) {
          console.log('EpgReader will use Web Worker');
          instance = new _EpgReaderWebWorker2.default();
        } else {
          instance = new _EpgReaderDefault2.default();
        }
      }
      return instance;
    }
  }]);
  return EpgReader;
}();

exports.default = EpgReader;

/***/ }),
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(577);

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = void 0;

var Storage = function () {
  function Storage() {
    (0, _classCallCheck3.default)(this, Storage);

    if (instance) {
      throw new Error('The instance of Storage must be obtained by Storage.getInstance() method');
    }
    instance = this;
    // eslint-disable-next-line
    this.localStorage = window.localStorage;
  }

  (0, _createClass3.default)(Storage, [{
    key: 'deleteAll',
    value: function deleteAll() {
      this.localStorage.clear();
    }
  }, {
    key: 'getOption',
    value: function getOption(param) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var data = this.localStorage.getItem(param);
      if (data === null) {
        return defaultValue;
      }
      try {
        return JSON.parse(data);
      } catch (e) {
        //eslint-disable-next-line
        console.warn(e);
        return defaultValue;
      }
    }
  }, {
    key: 'setOption',
    value: function setOption(param, value) {
      var option = (0, _stringify2.default)(value);
      this.localStorage.setItem(param, option);
    }
  }, {
    key: 'deleteOption',
    value: function deleteOption(param) {
      this.localStorage.removeItem(param);
    }
  }], [{
    key: 'getInstance',
    value: function getInstance() {
      if (!instance) {
        instance = new Storage();
      }
      return instance;
    }
  }]);
  return Storage;
}();

exports.default = Storage;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = __webpack_require__(43);

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  methods: {
    prompt: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(title, type, maxLength) {
        var _this = this;

        var validator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var extraButtons = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', new _promise2.default(function (resolve) {
                  var extraButtonsBinded = extraButtons.map(function (button) {
                    return {
                      title: button.title,
                      action: function action() {
                        _this.$root.$emit('prompt', null);
                        button.action();
                        resolve(false);
                      }
                    };
                  });
                  var promptData = {
                    title: title,
                    type: type,
                    maxLength: maxLength,
                    errorMessage: '',
                    returnHandler: function () {
                      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(text) {
                        var valid;
                        return _regenerator2.default.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                valid = true;

                                if (!validator) {
                                  _context.next = 5;
                                  break;
                                }

                                _context.next = 4;
                                return validator.validate(text);

                              case 4:
                                valid = _context.sent;

                              case 5:
                                if (valid) {
                                  _this.$root.$emit('prompt', null);
                                  resolve(text);
                                } else {
                                  promptData.errorMessage = validator.errorMessage;
                                  if (validator.resetInvalid) {
                                    _this.$root.$emit('prompt', null);
                                  }
                                  _this.$root.$emit('prompt', promptData);
                                }

                              case 6:
                              case 'end':
                                return _context.stop();
                            }
                          }
                        }, _callee, _this);
                      }));

                      function returnHandler(_x6) {
                        return _ref2.apply(this, arguments);
                      }

                      return returnHandler;
                    }(),
                    cancelHandler: function cancelHandler() {
                      _this.$root.$emit('prompt', null);
                      resolve(false);
                    },
                    changeHandler: function changeHandler() {
                      promptData.errorMessage = '';
                      _this.$root.$emit('prompt', promptData);
                    },
                    extraButtons: extraButtonsBinded
                  };
                  _this.$root.$emit('prompt', promptData);
                }));

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function prompt(_x3, _x4, _x5) {
        return _ref.apply(this, arguments);
      }

      return prompt;
    }(),
    isValidPin: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(pin) {
        var currentPin;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.$backend.account.getPin();

              case 2:
                currentPin = _context3.sent;
                return _context3.abrupt('return', pin === currentPin);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function isValidPin(_x7) {
        return _ref3.apply(this, arguments);
      }

      return isValidPin;
    }(),
    isValidPassword: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(password) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt('return', this.$backend.account.checkPassword(password));

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function isValidPassword(_x8) {
        return _ref4.apply(this, arguments);
      }

      return isValidPassword;
    }(),
    checkPin: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(title) {
        var extraButtons = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var validator, result;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this.$backend.settings.getParentControl()) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt('return', true);

              case 2:
                validator = {
                  isValidPin: this.isValidPin.bind(this),
                  validate: function () {
                    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(value) {
                      var valid;
                      return _regenerator2.default.wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              this.errorMessage = '';
                              _context5.next = 3;
                              return this.isValidPin(value);

                            case 3:
                              valid = _context5.sent;

                              if (!valid) {
                                _context5.next = 6;
                                break;
                              }

                              return _context5.abrupt('return', true);

                            case 6:
                              this.errorMessage = this.$lang.messages.messages.invalid_pin;
                              return _context5.abrupt('return', false);

                            case 8:
                            case 'end':
                              return _context5.stop();
                          }
                        }
                      }, _callee5, this);
                    }));

                    function validate(_x11) {
                      return _ref6.apply(this, arguments);
                    }

                    return validate;
                  }(),

                  resetInvalid: true
                };
                _context6.next = 5;
                return this.prompt(title, 'pin', 4, validator, extraButtons);

              case 5:
                result = _context6.sent;
                return _context6.abrupt('return', !!result);

              case 7:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function checkPin(_x10) {
        return _ref5.apply(this, arguments);
      }

      return checkPin;
    }(),
    checkPassword: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
        var validator, result;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                validator = {
                  isValidPassword: this.isValidPassword.bind(this),
                  validate: function () {
                    var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(value) {
                      var valid;
                      return _regenerator2.default.wrap(function _callee7$(_context7) {
                        while (1) {
                          switch (_context7.prev = _context7.next) {
                            case 0:
                              this.errorMessage = '';
                              _context7.next = 3;
                              return this.isValidPassword(value);

                            case 3:
                              valid = _context7.sent;

                              if (!valid) {
                                _context7.next = 6;
                                break;
                              }

                              return _context7.abrupt('return', true);

                            case 6:
                              this.errorMessage = this.$lang.messages.messages.invalid_password;
                              return _context7.abrupt('return', false);

                            case 8:
                            case 'end':
                              return _context7.stop();
                          }
                        }
                      }, _callee7, this);
                    }));

                    function validate(_x12) {
                      return _ref8.apply(this, arguments);
                    }

                    return validate;
                  }()
                };
                _context8.next = 3;
                return this.prompt(this.$lang.messages.parentCtrl.enter_pass, 'password', 32, validator);

              case 3:
                result = _context8.sent;
                return _context8.abrupt('return', !!result);

              case 5:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function checkPassword() {
        return _ref7.apply(this, arguments);
      }

      return checkPassword;
    }(),
    checkPinOrPassword: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(title) {
        var forgot, result;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                forgot = false;
                _context9.next = 3;
                return this.checkPin(title, [{
                  title: this.$lang.messages.buttons.forgot,
                  action: function action() {
                    forgot = true;
                  }
                }]);

              case 3:
                result = _context9.sent;

                if (!forgot) {
                  _context9.next = 8;
                  break;
                }

                _context9.next = 7;
                return this.checkPassword();

              case 7:
                result = _context9.sent;

              case 8:
                return _context9.abrupt('return', result);

              case 9:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function checkPinOrPassword(_x13) {
        return _ref9.apply(this, arguments);
      }

      return checkPinOrPassword;
    }()
  }
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(12);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(119);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Video = __webpack_require__(559);

var _Video2 = _interopRequireDefault(_Video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = void 0;

var Video = function (_TargetVideo) {
  (0, _inherits3.default)(Video, _TargetVideo);

  function Video() {
    (0, _classCallCheck3.default)(this, Video);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Video.__proto__ || (0, _getPrototypeOf2.default)(Video)).call(this));

    if (instance) {
      throw new Error('The instance of Video must be obtained by Video.getInstance() method');
    }
    instance = _this;
    return _this;
  }

  (0, _createClass3.default)(Video, [{
    key: 'open',
    value: function open() {
      clearTimeout(this.closeTimer);
      (0, _get3.default)(Video.prototype.__proto__ || (0, _getPrototypeOf2.default)(Video.prototype), 'open', this).call(this);
    }
  }, {
    key: 'close',
    value: function close() {
      var _this2 = this;

      var deffer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      clearTimeout(this.closeTimer);
      if (deffer) {
        this.closeTimer = setTimeout(function () {
          (0, _get3.default)(Video.prototype.__proto__ || (0, _getPrototypeOf2.default)(Video.prototype), 'close', _this2).call(_this2);
        }, 10);
      } else {
        (0, _get3.default)(Video.prototype.__proto__ || (0, _getPrototypeOf2.default)(Video.prototype), 'close', this).call(this);
      }
    }
  }], [{
    key: 'getInstance',
    value: function getInstance() {
      if (!instance) {
        instance = new Video();
      }
      return instance;
    }
  }]);
  return Video;
}(_Video2.default);

exports.default = Video;

/***/ }),
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(717)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(471),
  /* template */
  __webpack_require__(897),
  /* scopeId */
  "data-v-6245bccc",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(724)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(516),
  /* template */
  __webpack_require__(904),
  /* scopeId */
  "data-v-6ec2826c",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(466),
  /* template */
  __webpack_require__(918),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(171);

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(12);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(119);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _boomerangCache = __webpack_require__(99);

var _boomerangCache2 = _interopRequireDefault(_boomerangCache);

var _BatchRequest2 = __webpack_require__(528);

var _BatchRequest3 = _interopRequireDefault(_BatchRequest2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BatchRequestCached = function (_BatchRequest) {
  (0, _inherits3.default)(BatchRequestCached, _BatchRequest);

  function BatchRequestCached(cacheBucket) {
    var ttl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 43200;
    (0, _classCallCheck3.default)(this, BatchRequestCached);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BatchRequestCached.__proto__ || (0, _getPrototypeOf2.default)(BatchRequestCached)).call(this));

    _this.ttl = ttl;
    _this.cache = _boomerangCache2.default.create(cacheBucket, { storage: 'local', encrypt: false });

    setInterval(_this.clearOld.bind(_this), 3600000);
    _this.clearOld();
    return _this;
  }

  (0, _createClass3.default)(BatchRequestCached, [{
    key: 'getItem',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(id) {
        var item;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                item = this.cache.get(id);

                if (item) {
                  _context.next = 6;
                  break;
                }

                _context.next = 4;
                return (0, _get3.default)(BatchRequestCached.prototype.__proto__ || (0, _getPrototypeOf2.default)(BatchRequestCached.prototype), 'getItem', this).call(this, id);

              case 4:
                item = _context.sent;

                this.cache.set(id, item, this.ttl);

              case 6:
                return _context.abrupt('return', item);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getItem(_x2) {
        return _ref.apply(this, arguments);
      }

      return getItem;
    }()
  }, {
    key: 'clearOld',
    value: function clearOld() {
      var _this2 = this;

      (0, _keys2.default)(this.cache.getAll()).forEach(function (key) {
        _this2.cache.get(key);
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.cache.clear();
    }
  }]);
  return BatchRequestCached;
}(_BatchRequest3.default);

exports.default = BatchRequestCached;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  methods: {
    toggleFullscreen: function toggleFullscreen() {
      if (this.isFullscreenActive()) {
        this.closeFullscreen();
      } else {
        this.openFullscreen();
      }
    },
    isFullscreenSupport: function isFullscreenSupport() {
      console.log('FULL SCREEN SUPPORT CHECK');
      return document.fullscreenEnabled || document.mozFullscreenEnabled || document.webkitFullscreenEnabled;
    },
    isFullscreenActive: function isFullscreenActive() {
      if (document.fullScreenElement && document.fullScreenElement !== null || document.mozFullScreen || document.webkitIsFullScreen) return true;
      return false;
    },
    openFullscreen: function openFullscreen() {
      var app = document.getElementById('app');
      var elem = app.querySelector('.app-content');
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    },
    closeFullscreen: function closeFullscreen() {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }
};

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(12);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _eventDispatcher = __webpack_require__(61);

var _eventDispatcher2 = _interopRequireDefault(_eventDispatcher);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _Backend = __webpack_require__(168);

var _Backend2 = _interopRequireDefault(_Backend);

var _Storage = __webpack_require__(94);

var _Storage2 = _interopRequireDefault(_Storage);

var _Epg = __webpack_require__(62);

var _Epg2 = _interopRequireDefault(_Epg);

var _EpgReader = __webpack_require__(78);

var _EpgReader2 = _interopRequireDefault(_EpgReader);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line
var instance = void 0;
// eslint-disable-next-line

var EpgManager = function (_EventDispatcher) {
  (0, _inherits3.default)(EpgManager, _EventDispatcher);
  (0, _createClass3.default)(EpgManager, null, [{
    key: 'ONE_UNIX_DAY',
    get: function get() {
      return 86400;
    }
  }, {
    key: 'PROGRESS_CHANGE',
    get: function get() {
      return 'PROGRESS_CHANGE';
    }
  }, {
    key: 'COMPLETE',
    get: function get() {
      return 'COMPLETE';
    }
  }]);

  function EpgManager() {
    (0, _classCallCheck3.default)(this, EpgManager);

    var _this = (0, _possibleConstructorReturn3.default)(this, (EpgManager.__proto__ || (0, _getPrototypeOf2.default)(EpgManager)).call(this));

    if (instance) {
      throw new Error('The instance of EpgManager must be obtained by EpgManager.getInstance() method');
    }
    instance = _this;
    _this.epg = _Epg2.default.getInstance();
    _this.epgReader = _EpgReader2.default.getInstance();
    _this.backend = _Backend2.default.getInstance();
    _this.storage = _Storage2.default.getInstance();

    _this.UPDATE_INTERVAL = 0.5; // days
    _this.dayRangeFrom = 3;
    _this.dayRangeTo = 8;

    window.epgm = _this;
    return _this;
  }

  (0, _createClass3.default)(EpgManager, [{
    key: 'resetLoaded',
    value: function resetLoaded() {
      this.loaded = {
        tvshow: 0.0,
        newTvshow: 0.0,
        video: 0.0,
        person: 0.0,
        deletion: 0.0
      };
    }
  }, {
    key: 'openDb',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.epg.openDb('EPG');

              case 2:
                _context.next = 4;
                return this.epgReader.openDb('EPG');

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function openDb() {
        return _ref.apply(this, arguments);
      }

      return openDb;
    }()
  }, {
    key: 'init',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.openDb();

              case 2:
                setInterval(this.lazyUpdate.bind(this), 3600000);
                return _context2.abrupt('return', this.lazyUpdate());

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function init() {
        return _ref2.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: 'lazyUpdate',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var mode, startTime, loadTime;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.isUpdateNeeded()) {
                  _context3.next = 7;
                  break;
                }

                mode = this.isFirstUpdate() ? 'init' : 'update';
                startTime = (0, _moment2.default)().valueOf();
                _context3.next = 5;
                return this.updateEpg();

              case 5:
                loadTime = (0, _moment2.default)().valueOf() - startTime;

                _Metric2.default.getInstance().timing('epg', mode, loadTime);

              case 7:
                return _context3.abrupt('return', null);

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function lazyUpdate() {
        return _ref3.apply(this, arguments);
      }

      return lazyUpdate;
    }()
  }, {
    key: 'isUpdateNeeded',
    value: function isUpdateNeeded() {
      var date = Math.round(new Date().getTime() / 1000);
      var lastUpdate = this.storage.getOption('last_update_epg');
      return lastUpdate === undefined || date - lastUpdate > this.UPDATE_INTERVAL * EpgManager.ONE_UNIX_DAY;
    }
  }, {
    key: 'isFirstUpdate',
    value: function isFirstUpdate() {
      return !this.storage.getOption('last_update_epg');
    }
  }, {
    key: 'updateEpg',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.resetLoaded();
                this.dispatchEvent(EpgManager.PROGRESS_CHANGE, this.percents);

                _context4.next = 4;
                return this.fetchTvshows();

              case 4:
                this.dispatchEvent(EpgManager.PROGRESS_CHANGE, this.percents);

                _context4.next = 7;
                return this.fetchVideos();

              case 7:
                this.dispatchEvent(EpgManager.PROGRESS_CHANGE, this.percents);

                _context4.next = 10;
                return this.fetchPersons();

              case 10:
                this.dispatchEvent(EpgManager.PROGRESS_CHANGE, this.percents);

                this.epg.deleteFullData('tvshow', this.validRange.from);
                this.loaded.deletion = 0.33;
                this.dispatchEvent(EpgManager.PROGRESS_CHANGE, this.percents);
                this.epg.deleteFullData('video');
                this.loaded.deletion = 0.66;
                this.dispatchEvent(EpgManager.PROGRESS_CHANGE, this.percents);
                this.epg.deleteFullData('person');
                this.loaded.deletion = 1;
                this.dispatchEvent(EpgManager.PROGRESS_CHANGE, this.percents);

                this.storage.setOption('last_update_epg', (0, _moment2.default)().unix());
                this.dispatchEvent(EpgManager.COMPLETE);

              case 22:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateEpg() {
        return _ref4.apply(this, arguments);
      }

      return updateEpg;
    }()
  }, {
    key: 'fetchTvshows',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        var channelsIds, lastTs, emptyChannelsIds;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.getChannelsIds();

              case 2:
                channelsIds = _context5.sent;
                _context5.next = 5;
                return this.epg.getLastTs('tvshow');

              case 5:
                lastTs = _context5.sent;
                _context5.next = 8;
                return this.fetchTvshowsForChannels(channelsIds, lastTs, 'tvshow');

              case 8:
                if (!(lastTs > 0)) {
                  _context5.next = 15;
                  break;
                }

                emptyChannelsIds = this.getEmptyChannelsIds();

                if (!emptyChannelsIds.length) {
                  _context5.next = 13;
                  break;
                }

                _context5.next = 13;
                return this.fetchTvshowsForChannels(emptyChannelsIds, 0, 'newTvshow');

              case 13:
                _context5.next = 17;
                break;

              case 15:
                this.loaded.newTvshow = 1;
                this.dispatchEvent(EpgManager.PROGRESS_CHANGE, this.percents);

              case 17:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function fetchTvshows() {
        return _ref5.apply(this, arguments);
      }

      return fetchTvshows;
    }()
  }, {
    key: 'getChannelsIds',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        var channels;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.backend.content.getChannels();

              case 2:
                channels = _context6.sent;
                return _context6.abrupt('return', channels.map(function (x) {
                  return x.channel_id;
                }));

              case 4:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getChannelsIds() {
        return _ref6.apply(this, arguments);
      }

      return getChannelsIds;
    }()
  }, {
    key: 'getEmptyChannelsIds',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
        var channelsIds, filteredChannelsIds, i, channelId, channelExists;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.getChannelsIds();

              case 2:
                channelsIds = _context7.sent;
                filteredChannelsIds = [];
                i = 0;

              case 5:
                if (!(i < channelsIds.length)) {
                  _context7.next = 14;
                  break;
                }

                channelId = channelsIds[i];
                _context7.next = 9;
                return this.epg.hasChannel(channelId);

              case 9:
                channelExists = _context7.sent;
                //eslint-disable-line
                if (!channelExists) {
                  filteredChannelsIds.push(channelId);
                }

              case 11:
                i += 1;
                _context7.next = 5;
                break;

              case 14:
                return _context7.abrupt('return', filteredChannelsIds);

              case 15:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getEmptyChannelsIds() {
        return _ref7.apply(this, arguments);
      }

      return getEmptyChannelsIds;
    }()
  }, {
    key: 'fetchTvshowsForChannels',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(channelsIds, lastTs, counterName) {
        var loaded, skip, limit, result, total;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                loaded = 0;
                skip = 0;
                limit = 3000;

              case 3:
                if (false) {
                  _context8.next = 19;
                  break;
                }

                //eslint-disable-line
                //eslint-disable-next-line
                console.log('Fetch EPG tvshows ' + skip + ' ... ' + (skip + limit));
                _context8.next = 7;
                return this.backend.epg.getTvshows( //eslint-disable-line
                channelsIds, lastTs, skip, limit, _moment2.default.unix(this.validRange.from).format('YYYY-MM-DD'), _moment2.default.unix(this.validRange.to).format('YYYY-MM-DD'));

              case 7:
                result = _context8.sent;
                _context8.next = 10;
                return this.epg.importDataTvshows(result);

              case 10:
                //eslint-disable-line
                // items.length может быть фактически больше total из-за возможности клонирования каналов
                loaded = skip + result.tvshows.items.length;
                total = result.tvshows.total;


                this.loaded[counterName] = total > 0 ? loaded / total : 1;

                this.dispatchEvent(EpgManager.PROGRESS_CHANGE, this.percents);

                if (!(result.tvshows.items.length < limit)) {
                  _context8.next = 16;
                  break;
                }

                return _context8.abrupt('break', 19);

              case 16:
                skip += limit;
                _context8.next = 3;
                break;

              case 19:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function fetchTvshowsForChannels(_x, _x2, _x3) {
        return _ref8.apply(this, arguments);
      }

      return fetchTvshowsForChannels;
    }()
  }, {
    key: 'fetchVideos',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
        var loaded, skip, limit, lastTs, result, total;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                loaded = 0;
                skip = 0;
                limit = 3000;
                _context9.next = 5;
                return this.epg.getLastTs('video');

              case 5:
                lastTs = _context9.sent;

              case 6:
                if (false) {
                  _context9.next = 22;
                  break;
                }

                //eslint-disable-line
                //eslint-disable-next-line
                console.log('Fetch EPG videos ' + skip + ' ... ' + (skip + limit));
                _context9.next = 10;
                return this.backend.epg.getVideos(lastTs, skip, limit);

              case 10:
                result = _context9.sent;
                _context9.next = 13;
                return this.epg.importDataVideos(result);

              case 13:
                //eslint-disable-line
                loaded += result.videos.items.length;
                total = result.videos.total;


                this.loaded.video = total > 0 ? loaded / total : 1;
                this.dispatchEvent(EpgManager.PROGRESS_CHANGE, this.percents);

                if (!(result.videos.items.length < limit)) {
                  _context9.next = 19;
                  break;
                }

                return _context9.abrupt('break', 22);

              case 19:
                skip += limit;
                _context9.next = 6;
                break;

              case 22:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function fetchVideos() {
        return _ref9.apply(this, arguments);
      }

      return fetchVideos;
    }()
  }, {
    key: 'fetchPersons',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
        var loaded, skip, limit, lastTs, result, total;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                loaded = 0;
                skip = 0;
                limit = 3000;
                _context10.next = 5;
                return this.epg.getLastTs('person');

              case 5:
                lastTs = _context10.sent;

              case 6:
                if (false) {
                  _context10.next = 22;
                  break;
                }

                //eslint-disable-line
                //eslint-disable-next-line
                console.log('Fetch EPG persons ' + skip + ' ... ' + (skip + limit));
                _context10.next = 10;
                return this.backend.epg.getPersons(lastTs, skip, limit);

              case 10:
                result = _context10.sent;
                _context10.next = 13;
                return this.epg.importDataPersons(result);

              case 13:
                //eslint-disable-line
                loaded += result.persons.items.length;
                total = result.persons.total;


                this.loaded.person = total > 0 ? loaded / total : 1;

                this.dispatchEvent(EpgManager.PROGRESS_CHANGE, this.percents);

                if (!(result.persons.items.length < limit)) {
                  _context10.next = 19;
                  break;
                }

                return _context10.abrupt('break', 22);

              case 19:
                skip += limit;
                _context10.next = 6;
                break;

              case 22:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function fetchPersons() {
        return _ref10.apply(this, arguments);
      }

      return fetchPersons;
    }()
  }, {
    key: 'deleteEpg',
    value: function deleteEpg() {
      this.storage.deleteOption('last_update_epg');
      this.epgReader.close();
      return this.epg.deleteDb();
    }
  }, {
    key: 'percents',
    get: function get() {
      return Math.round(this.loaded.tvshow * 45 + this.loaded.newTvshow * 10 + this.loaded.video * 20 + this.loaded.person * 15 + this.loaded.deletion * 10);
    }
  }, {
    key: 'validRange',
    get: function get() {
      var currentUnixDate = Math.round(new Date().getTime() / 1000);
      return {
        from: currentUnixDate - EpgManager.ONE_UNIX_DAY * this.dayRangeFrom,
        to: currentUnixDate + EpgManager.ONE_UNIX_DAY * this.dayRangeTo
      };
    }
  }], [{
    key: 'getInstance',
    value: function getInstance() {
      if (!instance) {
        instance = new EpgManager();
      }
      return instance;
    }
  }]);
  return EpgManager;
}(_eventDispatcher2.default);

exports.default = EpgManager;

/***/ }),
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/cancel.c102b50.png";

/***/ }),
/* 164 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEeCAYAAAAwzyjTAAAd1UlEQVR42u3d+ZvcVZn38Xd1dZJOQshKCFvAKKuAihBERZFFRWVTGC/g4XFEHAZ1FFDUR+YZo0RcQQMKQ8CRzQECghhGZEe2BALBJP3d11o63dlDNrJ1en6obrJDL9VVp7o+r+vqP6DP+fbd59znPvcBEZFq6wBayZLjCCJuwaFAMxuxWEHAraTsQ4eGSURMCFZFxhHyAxwCLDbRTMdbPxYbcbkTnxEaLBGpjtnAQjLEHIbHnVhs3C5QbR+0VhJzgQZNRKqzqkrJEnEcLq/STPtug1XpZws+L2rgRKTywSpPlohzcYhoZss7BKuuVdZSDZ6IVDZYtTCUgG9hU+xWoNr6s1EDKCKVkQcSxhDwI2xW9TBYddDMBg2iiPS/ApCwLwG/x2JDL4KVtoQiUgExkONoXB7DYnOvglUzHfi8rsEUkf7TQpaQk3GZ3e3k+q5XVxsJ+akGVETK71+BlMFEnIlD2utA1fVjkyfmKA2siJRXqWxhCCGXY7O0z8GqmQ5c7iDHEA2uiJTPIiDPGHyux2ZFWYKVQ0LIR1ih4RWRcmkjQ8xB+NyFxfqyBCuLdQR8gxwNGmARKY88GRKOxOeJblyz6X6hqM8txOypTg0i0ndzgJQGYj7SeSdwS5mC1RZcniBgPAs1zCLSV6Xk+iBCzsXBL2Ow6sDlZWKOJq9hFpFyBKuU4QRcgs3isgWqUglDjoDTeUXDLCLlCFY59ui8E7i6zMHqDQIuICWrgRaRvlkMpOyNx+1YrC1rsLJYh8cVJDQxW0MtIn3RBp0ngQ+/bXfQ3l698biVVCeCItLXLWCBBiI+hMvzZU2ubz0RnEnEePVjEJG+BqssIZ/AwSpzoOo6EWwm5BgiDbeI9FYRSGgk4vzO7qBbyh6sbBYS8gliMhpwEemde4A8w/C5Apu2fllZ2Swl4KskNGrARaR32oCY0YRMLXvZwtYk+3p8fkbIYCXZRaR3SjVWE/C5t2wXmHf+acdjOnlGKliJSO8sBiKOxGPmTq8vl/NE0OMxIt6lYCUivZOSIWYyLs/2S3J964mgRcRRxBpyEenNFjBPIyEfxWF+vwYrmyIRnyWnE0ER6akllMoWYs7FodBvgaoUrNYQ8DXyZPmVhl5EeuIRSn3XA67ApqVfg5XFRlx+TMIw5a1EpGdagZiRhPwAm+X9HKw243EfEeMVrESkZ+YDKePw+XU/li1se0dwNjETadXQi0hPLAUSJuJxT9m7Lez6tRuLiMlKsotIz1hAyrs7a6w293uwsllOyPlEClYi0hM5Gkg4Gp+nscr2os3b5a3W4nMVIUOUtxKR7ukAimSI+Agu/+jXGqttTwR9fkfCCAUrEeme2UCeBmLOwcHt90C1Ncn+CDHjCDUFItLdlVWOJgIuxiFXoWDVgcOLhLyXpzQFItLdYJUwnJDLsFlRsWBlkyPkVL0jKCLds4bSW4E+U7FYU7FgZfEGPueR09NcItIdrUCe0fj8Dqufmu7t/kTw38kxVEl2EeneNjBiAh43VaB6fdtg1Y7HnaQ6ERSR7pgDxOyHz/SKFIRufyL4DBGTuF/TICLvpAjkOQC3QtXr258IRoQcqxNBEXlnMRliDsfnyX5sZ7y7E8FFhJxBXkl2EXk7pbKFDCGTcXmhItXr2+etVhJyJQUGKW8lIrv3EtBKAzEndl616ahwsNqEz+/I0cQMTYeIvJ2UBiI+h4Nf8WBVSrLPIGZvZmoqROTtFMkScnZFr9ps/9rNPEKOZrmmQkR25xqgyCACzu/3hyJ2n2RvIeKT5GnQhIjIrt0H5BhEypdwaK1SsFpFyOXkyPITTYmI7ErpNHAwIVdis6Qqwar0gMTPSGjSiaCI7NoSSpeYA75V0Y4L2/+043EvMfsyRVMiIrtSBBKG4fNd7Ap2XNj5RPAVIg6hXVMiIrvbBqYMJeCnFe24sHPeKiHiOAp6QEJEdmUKUGAEIVOrHKyWEvB/yZNV3kpEdrYAaGE0IT/BZl3VgpXFRjx+RMpgBSsR2dljQMRIAq7DZkPVglUzm/G4m5hxClYisrMYSBhFwK1YvFnFYNWVZD9QwUpEdlaqs9oHnzsq2iV013krn4QTaFGSXUR21ArE7IvH9Ir3sto5WC0j4BJyunYjIjtaDCSMw+OPFe8SuutXmqeQMJjZmhoR2daizmDlcw9WVRPsXZXsDxMxXu1iRGR7xbe2gX8wIFh14PIaEYfga2pEZFsFIGECHrdVfRtYekAiJuYUVbKLyPbagJixeNxd9QR7KW+1moDLKCrJLiLbWgrE7IXHfUZsAy024XENEUP5nKZHRLp0ADH7dJYubKx6sCol2R8kZB/Wa3pEpEsIJIzF42YjclalvNV8Qg6hoOkRke1XViPxuN2IbWApWOUJOY1ISXYR2T5YjcLnhirfDdw2b7WegG9SIMscTZGIdCmyJz5TDQpWm/CYRsIoXWoWkZI2IMdQAqZgGxKsSkn2x4jZj39oikQEuhLsTQRMqWqn0J3zVhYRh+FpikQEulrEDMPn+1i8YUywsmnB52x8FYeKyNZgNQSPy7BZZUywsngTj/9HSKMmSURKOas8WSIuwWa5McGqmXZ8fk9OSXYR6ZKjgZBzsGkxKFhtweV1EibxB02RiAC4ZAj4JA45g4JVBzYpEZ9Qm2MRKUnIEPAJHGyjgpXFKjwuxyarSRKRUrCKeT8ucw0LVpvx+TURQ5W3EhFwgYjDcHiFZrYYlrd6goj9eVbTJCKl8oV34/E0zbQbtbpy8Ak4hgXKW4nIDCBiPzzuNS5Y2Swh5Hwl2UWktLJy2ROXW4zpabX9peZfkTKIWZoqkfr2CJAyDM+gNjHb561mELGXkuwiAnmGEnAllkFXbra91BzwAWxNk4i2gQlZQi7ENugy89a81VICPqdLzSICERkizsFhoYHBagMRU4kZxGJNlYiCVcyJxlWxd+WtHP5IyhjlrUTqXZEMMYd3VrFvMS5gucwj4n3kNFUi9W0REDERj78aGaxsluNzFo7qrUQUrBJG4nIbzYbVWm198eY7JAzRVlCknpWe5GrC4xcG1lp1YLEFjweJGK1gJVLvQgYTcBk2KwxMsnfgMJeUo5inqRKpbwkNeHwGiyVGBiubFQR8gZzyViL1LQVCTsQhNDJYWWzA4ypi5a1E6ttcIOZgXJ4xMlg1047Ln4kYp2AlUs9eACLG4vEAlmGtYrZuBZsJOJyXNF0i9asDSBmKz/VYbDA0WK0i4MsEyluJ1LciWQK+atRT8tv/bMbjWlKatBUUqWcFMoScadgbgjv2t3qSiIkKViL1zAYijsTlNUODVQcOOSKOI6/pEqn3vNU4XB438o5gKW+1kpCLSMhqdSVS38FqBD6/MTbJbtGOx81EDOURTZlI/UppwOcSLNYauxV0+Tsxk7SyEqlnOTJEnIxDYmywKrU6/pQ6h4rUs2VAzEGdLzR3GLoVXI/HlcQM1oSJ1O/KCnKMxmMGFpsMLmGYScgYCpoykfo0DYgYis/3jextte0TXQnHKliJ1DOLDD5nY7PS4K3gWnwuVssYkXq2Cog4FgfL2GDVTDse1xGxB4mmTKQ+OUDKaFweNrY4tFTC8CIhB3GrpkykfsU04fNjo/NWNgsJ+TiptoIi9Ws+GXxOx2a50SUMPtcQ0qgCUZF61QGEHIXDfIPzVh24PEjIaHxNmUh9Og+IGInHnUbnrRwiQj7CjzRlIvXps0BMIwHfw2KdwVvBdfh8hZAGTZpIvSrdEzwVm1ajSxhcZhAxgp9oykTq03wg5EAcXjV8K7iAkENxNGUi9akDSNgDj+sMvidYasgXcDGJtoIi9csnQ8AF2KwxvJr9BkI9JCFSv5YCMYfiMM/wEoZ/EPJuYk2ZSH2ygRx74nG/sY+flk4FlxLwGSJtBUXqV8ogAv4Fy+CtYKkh33XENOlUUKRePQqEHIdD0eitoMNzRIznN5oykfp0DeAzCocZRpcw2LQR8Gk9Ly9Szzwa8Pm20V0YmtmEx38QMUgTJlKvEiDk/dh4BgerLTg8T8hEZmjKROpTBxAwCo9HDN8KLsLnRG0FRepZyCB8Ljd6K2ixiYBriRjELZoykfo0Fwg4HpuC4aeCjxMygZc1ZSL1uxWM2BPX8B5XdmeBqBryidQxlwwBXzN8K7gZl6vxGay7giL16hUg5CBs4+8KvkDA/uQ1ZSL1K2QYLrcY3jZmEQEnk+hUUKR+NZPB51NYrDB4K7gRj2mE2gqK1K+XgJADcHnJ8FPBvxMxgVmaMpH65dCAx9U10EH0bCxtBUXqVwSEHIONb/DqajMevyJhqCZMpF6V+rMPw+U+wx+TsAiZpK2gSD3LkyHkPCxWGpxof4OAC9RBVKTeV1cxB+Aw1/Caq/8mYrhOBU3VBuQYTsq7KHI0Bd5LxIEk7EmRLKs7PzaRvvAYhM93jE60OwREHE+q6TJTjgYiPoDHXbgk2CzCphWHGJdnCfkuIR8mxzjaaNCrINIrPwR8jjX6crPFRnz+jbxOBc0VMRkHa7cJUIt2LFbgMIeQa0k5khYGsVarLunBVtBjMC63GJxo34LH34gYz3maMnP5/JXmbj6hZNGOQ4zH7UScS559WUmDApe8w1YQQj6DTZvBNVcLCfgwtlZXZrN7eS3CZj0eLxPwbyQcSZEmminV2Ih0uQPwGYnL40Y/1dXVlE//fA3XzOY+t91wKBJyGxEfJWUUi8mQ09AKYNOAxxeMflvQYTYRe/MXTZf5yvchbcFmBQ7PEfI9ckyklSytGuK6zl2FHIjD6wZvBVfjcyGetoK1we2H6xEWG3FoxudGIk4nz1gWg6qG68wiMvh8E4uNxibaXabjq+aqdnjc1e2ke2//g3k8TshFpEyihUEsQSeMA92DQMh7cPmHwaurPCHH8Jymq3aEfAybJRWpcXEICJhOwmQKDGc5GQWuAcohi8sv+vWfYV8T7T5fI6JRk1VL8ozC4ckKfijt2CzC4zFCvknKwSymgdWaigH0TxBiDsMmMPj6zbMkjGO9pqu25ACfy7BYX5XG/g4WPj8n5OOkjGGRVl017UkgoomAm7H6eALdny2PQ84k0XTVnseAhHG4PFHV5KfFSlyeIOCLJOxPnkY6lOuqOQngMxmLRQZXtN9IyCB+q+mqTSngcSYWq43ILTjYBEwj5RiKDKMA3Kdpqgkxw/H4b2Ov4DhEBBxNs6aqdl0LRIzAY5oxN+ktNmOzEJeZRHyVHAewmIwq6Q3WAQSchM1yYxPtHv+KS1aTVeuKQMB+ODxv3H9Hm024vIrPDwmZTJERynUZGKzyNOEx3eCaq6cImcAZmq6B4TUg4Xhcmg396NqxWUrIQ0ScTspetJBRHY0h//AiPo1j6JNdFssIOIlQFe0Dy0IyhJyCQ2h0V0iL1TjMIeIachxCnkYWoSR9tVZXMU2dfdpN/Fa24PNfpDTp+xiImskScRIOc4wt/Nu+NMLD42ZiTqfAnqqkr7AAiDnJ2PYxpQcljtQ3MZC1kCHhUDweMvqm/c7XgB4i4DwS9qNIVh9pBcQMx+fPRp4MWmzC47sUtRUc+FqBPCMJ+QYOttG9uLf/SN/EZS4BXyfHu2ihUa2d+8laIOT4ilzv6l1F+yxiDuAFTVV98IEiWVImEvINXGzjt4k73l/0+U9SPkyBwcwD7tS0lnF1NQSPaYaurlbhcQbztLqqz8TqchrIcRg+V+Mw39irF7tKutq04HEnEWeykDH4ynP12RNAxAk4Ruau2vF4iJCRmqh6D1xFGkiZRMB1OCRYNbLiKuW51uLzMCGfJ8/eLKGBNk1rrxTJ4vFLI1dXNi1ETOYNTZMAvAm0kSXhCHymYbPM6KfHd151rcPlNUIuI2EfWmjgb5rWHuU3Qw7B7ocGkOUpEr2RQD3aZcfVlgXkGUbMR/G4A5s3aiZodSXoHeYS8GMKvIdlegWoW1KyeFxnZFrAoZmQI9WNQXZvBZBnKBHn4/KswW1xd9+ny2UBIT8gxxEsVODarVlAwgE42AbO5SY8riCnRLt0Z8W1jAx5xhMyBQe/ZhLz2wcuF5+riDmYHI08qKndYXXVQMC3qtJD7Z1XV68TcJD+2Uj3LQBaaSDhPQRM6/Xbh9XvFhHjcy0RkyhoxQWdKYCUvY18CcdiDQFfIKRBEyU9910gz3AiTsPjESP/I3enlsvGxeOn5DmEljoPXAuBgLOxWGdgY75HiBhJXn960hcvAXnGEHIVDlbNFJ7uvFWcT8DlxJ0rrofqcMufMhKP+w0sY2gl5GMU9Ocm5RABeRqIOZSAu2ruNHHbu2kuCwj4ZxL2oq2O+nIlQMAnsVllYBnDHwgYzHT9qUk5tdFVBvFZPF6quaT8tt0rXWYR8RXyjKCVgV8530IjHrcYV2/nkBIxmUf15yX9ZQ0ZUibhMbWz6LSjJn9KHSJmknA6RYYM2KC1Bog4EofIuCs4LlNpVttjqUxOZAghZ+DyfE0m5bf+l1+Ozw1EHEs8ACusi2QJ+KVx17AcUnyO5gb9OUklXE/pbcSU8QT83Ng2Jd3NpdgUCbiaPBMoDpD8lg/E7IdjWOtsi01EXEVerzdLNVZbOYYQcxIez9dM763dlUK4vELEhbQwlGKNz02eBjy+hMUGw7bj84nYX/VxUj0RGVIOwGcqNgtreLXVgc0KPO4i5nhaOx+GrUUJe+PxknF3QD2+rSJRqb5ZQJ5GIs7E5eWaPUns2iY6FAj4FgkTWFpjbysuA0I+a1ybbIdniBmr1ZWYs0VcSIYc++HzWyzjan96vk30eIkcp9NGI5tqZB5SBuFyq2FjuQGfLxHrgrOYpoXSIwcBF+Awr6Z6bu16ZdBKwPXk2d/4xoEdQMSHsGkxrE/73wgZzxz9eYjJq62YD+DxYE2XP3RdrPZ4mpjTWW5wCUSRBnyuxTLon4TFWnzOoUV/FmK60vWe0YRcg01rTQet0mqrjZDvkzLOuP5NLUDCOBxeMewKzuMEyl1JLa22ijQScyouc2p+i2ixAY+niDieFrKsNmScV9DVlWG1QaeuKwk4lUi5K6m1oNVKhphD8bgNizdrfLW1BYeEiCtoYzgLDBjfPMPxmGnUPwSPmeQYwVz9CUgtuh0oMIKQq7Ep1PwW0WYNHreScHBV+26tBCLeZ9S222YJMWfg6rOXWuYAebLEnI7LvJrstbXze3qvE3MyaZWKTfM04vMDo8bS44/kGMJN+uRlIGwRc2SIeQ8h9xp3haS37+qFXEWeofgVHEsPiJlo1AMTNm8Q8klSfeoykLwGFBlHyBRslg6AoPUGPjeRsk/F2v62Ah5nGZUX9LidPHvoA5eB5/dAjsGEfBkHbwCcIm7u7FX+AQo09HsblSKNuNxk0O+/koCTa+o6k0iP3AjkaCDkWBxeprmm7yJ21R/NJ+Y08mT7La+VAAnvNahJ3xY8HiVhhD5qGfhayJByID531NzDrrveIhbw+ToJQ2jth/FaBgR8x5gmfTZLiTkVS5+y1ItSV9NxBPwQm+UDIGitwOf7pIzinjKPU6n26lGDcld/Js9w/kufsdRb0Co1B/wyDukAyGutJ+CXxIxlYZnGaDUQcZQxF51Lj6L+E2v1+Ur9rrSyxHxoAF3puZ8ce5flLb6FNBDxM2N6jzk8QMIeujMo9R20imSIOBKPh417UKE3PbZ8HiTPgazp49ikjMPlVUN+r3V4fJ6cPlkReACIOQif6QY+ud6bsoe/EHMEq3o5HqUHUj+OxUpD+l09Q8h4ra5EuvhAnhH4/AKLFTVf9uDxGDGH9GpVUiSLzxQjtskW6wj4gnHtdkSqbgWQMISASwdAZXw7Li8QM4m4B2NgAREHGXMVx+EVQsbxlD5PkV3ntfIMIeQsHOIaD1qbcXmaiMO73T54KeDzRSO6uFqsxeOreglH5J200UDMqZ0dNttrvCp+JiGHdOv+YY5GXKYbsrqaQ8R4/qDPUaQ7f7xdTQEfr/mg5fEXUvZ+297nFpBjfxwWGLC6asfn/5NX7kqk+xYBMe/C4/6afg+x9KzYvcSMYfZuftcWIORfjGjH42CT59CKdaUQGTCKQMS+BNxa0+2XS8Wlt5AwZpe/Z4EmPP5kSNPCKRTJ6uMT6Y37gZRR+EzDruFHXC3W43M1OYZuV9fUBiS8G9uAgwabNgI+iKPPTqT3WoEcw/D5d2zDnmrvWUBYTcTXSMm+dXqYkiHm6wacDm4h5BZShuqDE+mrPJBjOCGXYddwgWmp5fI5bz2RlWMELs8Y8bhEyGS1PxYpl9LF6SEEfKWmX+dxcAl5P28AMe/Hps2Aazh/JWWPsrbKEal7c4GUBgIuxCat4XKHmcTsj8+lVT8FtVhLxD+zWJ+XSPnNAxwaiPk0DrkaTcK343E3Hk8bsOJ7jojRLNGnJdJ/28M8jUScVrNXeSw2YrGp6oEz4Ds4KhQV6X8FGgj5jBFV4rWZT0uIOUotZEQqF7QyRJyCg1XzHUwrnUtzuJYCjfqIRCopIUPEcTg4Clo9LGV4Tp+PSOWlNBDxIVxeU0DqVinD3cR6yVmkehYAESfgMFsrrbdNtq8i4FSW6pMRqa7XgYjjcJmroLXbZPvL5BiLp89FpPoiMkQcg6tE/G5KGX5MTh1FRcyRdOa0HF5XoNou2R4QcDihPhER01ZaEHEyDvO00nrr6fnbyDFIH4eIiUqPtn4Mh1CrK9YRcpYKRUVMlpJV0KIDj6dJGaeAJWK6wlsXpr06TbZvwucSXXIWqaXtYcy52DXa5aFv28EcMYdodSVSKzoAhywBXxwAr0z37N6gzwzyDNFHIFJrQSthMAEXYbO8TlZXK4n4FEVNv0jtWQLkGELIVXURtBxmk2MskaZepJZXWkPw+REW6wb0dtDlZxTVpE+ktjUDCXvgMxWLjQN0O7iUiBN5U9MtMlBWWmMJmG7Ec/Hlr72aQWGHB1xFpMaDVsxeuPyJ5iq/YlP+2quLsTXFIgOLD8QciMMTA+beoU2BgMO5SdMrMvCEgMdRuMwZILVXt5LQpIkVGbhBK0PI8bgENd9VNOIUFmlKRQa2Ig2knFXTV3gc5pEwAV/TKTKwdVB61CLkUmxW1mDAasflRgpkNZki9WAN0MIQfK7EYn2NJdsXEzKZnKZRpH7MARJG4XN9TQUth7+TMlK1VyL15i4gYiwuD2CxqSZOBz2mUtBVHJH61AykTMTl+ZrozBByii46i9SzBIg5Dpd5hr/o/Ag5vegsIj4ZAj6HTauxbw56XE6btoMiApBnECGXYrHKwO3gMiImM1vTJCJQqtHK0UTA9ca1pHF5kZjRmiQR2WoWEDIOl7uNuShtsRmfb1LQE/QisqOLgIjDcXnRkO3gEiI+qLuDIrJrrUDER3EoGlAs+jIFxrBO0yIiu5OSJeTCqj5mYbGFgBtItB0UkbczDUhowmdK1R6zsFlOzGks1XSIyDspdXfYE487aKa9CtvBl4gZpbuDItI9vwUiDsZhdhUemvg1kbaDItITHhk8TsCiUMH81XpCzmaNhl9Eeh60Ggm4FKtCjf9cIhIO1nZQRHqu9GTYUDxurkg7Go9baWOwBl5EemcVkLAPLo/2ayV86d3Bi0g15CLSF3OAgONwSPsxYC0i4H38ScMtIn0V0kjAhVis6Kft4PO67Cwi5RPR1E894dvx+TaL9DKOiJTLY0DIaFweKXN1+wpiTsDSEItIOb1MVz7LLWN1+wLyTGCWhldEys0ng8+XsFhdpvqreygwSAMrIuXXAQSMKEt9ls0mIr7B/2hYRaS/hEDEPjjM6mPAypNwOEUNqYj0pxwZAk7G7kN9lstTFPSUl4hUQkAWn+/1utTB4ze0qTuDiFRCBxAyFo/7enx1p3Qd5/+wQcMoIpWyCAh5Lw5BD8sZlhLxQdo0hCJSSSnZzlKHFT3IXz1DzBgNnohUVumC9DA8ft/NUoct+PyQ5XqKXkSq4QEgZmK3WiuXuoueSauGTUSqZSEZAs7BfocupTZFYg7jVQ2ZiFRTzDA8fvK2W0OHWSSM0mCJSHWVru4cgMOc3ZQ6bCHkdgo0arBEpPpCMvicik3bLvJXbxJyvtohi4gp20JIGIzHb7B2WGXZtBJxBAUNk4iYYhkQMQmH53cIWK8RMU7PeYmIWdoAn7OwWLVNwegMAvW/EhHTlN42HNbZC35z54Xn/1A7GREx02Ig4iBc5mGzgZDPs0TDIiKmypEh4ou4zCHkUDZpSETEVE8CIU2kXExKkwZETPC/+nYPntdK+PUAAAAASUVORK5CYII="

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/check_yellow.132f9f0.png";

/***/ }),
/* 166 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDEzIDE2Ij4KICAgIDxwYXRoIGZpbGw9IiNFMDVGMjAiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTS4yNSAwdjE1LjI3M2wxMi03LjYzN3oiLz4KPC9zdmc+Cg=="

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(706)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(469),
  /* template */
  __webpack_require__(886),
  /* scopeId */
  "data-v-48c6e8dc",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(12);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Backend = __webpack_require__(527);

var _Backend2 = _interopRequireDefault(_Backend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = void 0;

var Backend = function (_TargetBackend) {
  (0, _inherits3.default)(Backend, _TargetBackend);

  function Backend() {
    (0, _classCallCheck3.default)(this, Backend);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Backend.__proto__ || (0, _getPrototypeOf2.default)(Backend)).call(this));

    if (instance) {
      throw new Error('The instance of Backend must be obtained by Backend.getInstance() method');
    }
    instance = _this;
    return _this;
  }

  (0, _createClass3.default)(Backend, null, [{
    key: 'getInstance',
    value: function getInstance() {
      if (!instance) {
        instance = new Backend();
      }
      return instance;
    }
  }]);
  return Backend;
}(_Backend2.default);

exports.default = Backend;

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable class-methods-use-this */

var IEpgReader = function () {
  function IEpgReader() {
    (0, _classCallCheck3.default)(this, IEpgReader);
  }

  (0, _createClass3.default)(IEpgReader, [{
    key: 'openDb',
    value: function openDb() {
      throw new Error('IEpgReader method not implemented (see details in stack trace)');
    }
  }, {
    key: 'getNextTvshows',
    value: function getNextTvshows() {
      throw new Error('IEpgReader method not implemented (see details in stack trace)');
    }
  }, {
    key: 'getPrevTvshows',
    value: function getPrevTvshows() {
      throw new Error('IEpgReader method not implemented (see details in stack trace)');
    }
  }, {
    key: 'getTvshowsByDate',
    value: function getTvshowsByDate() {
      throw new Error('IEpgReader method not implemented (see details in stack trace)');
    }
  }, {
    key: 'getTvshowById',
    value: function getTvshowById() {
      throw new Error('IEpgReader method not implemented (see details in stack trace)');
    }
  }, {
    key: 'getTvshowsRange',
    value: function getTvshowsRange() {
      throw new Error('IEpgReader method not implemented (see details in stack trace)');
    }
  }, {
    key: 'getVideoById',
    value: function getVideoById() {
      throw new Error('IEpgReader method not implemented (see details in stack trace)');
    }
  }, {
    key: 'getDatesByChannelId',
    value: function getDatesByChannelId() {
      throw new Error('IEpgReader method not implemented (see details in stack trace)');
    }
  }]);
  return IEpgReader;
}();

exports.default = IEpgReader;

/***/ }),
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(687)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(473),
  /* template */
  __webpack_require__(867),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 437 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(699)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(513),
  /* template */
  __webpack_require__(879),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 438 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(743)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(517),
  /* template */
  __webpack_require__(924),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 439 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(679)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(520),
  /* template */
  __webpack_require__(859),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 440 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(669)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(524),
  /* template */
  __webpack_require__(849),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 441 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(689)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(525),
  /* template */
  __webpack_require__(869),
  /* scopeId */
  "data-v-2a63d1ac",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 442 */,
/* 443 */,
/* 444 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(286);

__webpack_require__(291);

__webpack_require__(294);

__webpack_require__(295);

__webpack_require__(289);

__webpack_require__(292);

__webpack_require__(290);

__webpack_require__(293);

__webpack_require__(287);

__webpack_require__(288);

__webpack_require__(223);

__webpack_require__(277);

__webpack_require__(296);

__webpack_require__(297);

__webpack_require__(259);

__webpack_require__(260);

__webpack_require__(261);

__webpack_require__(262);

__webpack_require__(265);

__webpack_require__(263);

__webpack_require__(264);

__webpack_require__(266);

__webpack_require__(267);

__webpack_require__(268);

__webpack_require__(269);

__webpack_require__(271);

__webpack_require__(270);

__webpack_require__(258);

__webpack_require__(285);

__webpack_require__(247);

__webpack_require__(256);

__webpack_require__(255);

__webpack_require__(252);

__webpack_require__(253);

__webpack_require__(251);

__webpack_require__(248);

__webpack_require__(250);

__webpack_require__(254);

__webpack_require__(249);

__webpack_require__(246);

__webpack_require__(257);

__webpack_require__(222);

__webpack_require__(282);

__webpack_require__(280);

__webpack_require__(278);

__webpack_require__(283);

__webpack_require__(284);

__webpack_require__(279);

__webpack_require__(281);

__webpack_require__(272);

__webpack_require__(273);

__webpack_require__(274);

__webpack_require__(276);

__webpack_require__(275);

__webpack_require__(220);

__webpack_require__(221);

__webpack_require__(216);

__webpack_require__(219);

__webpack_require__(218);

__webpack_require__(217);

__webpack_require__(112);

__webpack_require__(242);

__webpack_require__(243);

__webpack_require__(241);

__webpack_require__(245);

__webpack_require__(244);

__webpack_require__(224);

__webpack_require__(225);

__webpack_require__(226);

__webpack_require__(227);

__webpack_require__(228);

__webpack_require__(229);

__webpack_require__(230);

__webpack_require__(231);

__webpack_require__(232);

__webpack_require__(233);

__webpack_require__(235);

__webpack_require__(234);

__webpack_require__(236);

__webpack_require__(237);

__webpack_require__(238);

__webpack_require__(239);

__webpack_require__(240);

__webpack_require__(298);

__webpack_require__(301);

__webpack_require__(299);

__webpack_require__(300);

__webpack_require__(303);

__webpack_require__(302);

__webpack_require__(306);

__webpack_require__(305);

__webpack_require__(304);

__webpack_require__(162);

var _vue = __webpack_require__(93);

var _vue2 = _interopRequireDefault(_vue);

var _vuejsLocalization = __webpack_require__(928);

var _vuejsLocalization2 = _interopRequireDefault(_vuejsLocalization);

var _vueAsyncComputed = __webpack_require__(776);

var _vueAsyncComputed2 = _interopRequireDefault(_vueAsyncComputed);

var _vue2Filters = __webpack_require__(927);

var _vue2Filters2 = _interopRequireDefault(_vue2Filters);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _jsnlog = __webpack_require__(309);

var _start = __webpack_require__(568);

var _start2 = _interopRequireDefault(_start);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jsnlog.JL.setOptions({
  defaultAjaxUrl: 'http://api.persik.by:8080/v2/utils/report-error'
});

_vue2.default.use(_vueAsyncComputed2.default);
_vue2.default.use(_vue2Filters2.default);

_vuejsLocalization2.default.requireAll(__webpack_require__(931));
_vue2.default.use(_vuejsLocalization2.default);
_vue2.default.config.productionTip = false;

_moment2.default.locale('ru');
(0, _start2.default)();

/***/ }),
/* 445 */,
/* 446 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'AtomSpinner',

  props: {
    animationDuration: {
      type: Number,
      default: 1000
    },
    size: {
      type: Number,
      default: 60
    },
    color: {
      type: String,
      default: 'red'
    }
  },

  computed: {
    spinnerStyle: function spinnerStyle() {
      return {
        height: this.size + 'px',
        width: this.size + 'px'
      };
    },
    circleStyle: function circleStyle() {
      return {
        color: this.color,
        fontSize: this.size * 0.24 + 'px'
      };
    },
    lineStyle: function lineStyle() {
      return {
        animationDuration: this.animationDuration + 'ms',
        borderLeftWidth: this.size / 25 + 'px',
        borderTopWidth: this.size / 25 + 'px',
        borderLeftColor: this.color
      };
    }
  }
};

/***/ }),
/* 447 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'BreedingRhombusSpinner',

  props: {
    animationDuration: {
      type: Number,
      default: 2000
    },
    size: {
      type: Number,
      default: 150
    },
    color: {
      type: String,
      default: '#fff'
    }
  },

  data: function data() {
    return {
      animationBaseName: 'breeding-rhombus-spinner-animation-child',
      rhombusesNum: 8
    };
  },


  computed: {
    spinnerStyle: function spinnerStyle() {
      return {
        height: this.size + 'px',
        width: this.size + 'px'
      };
    },
    rhombusStyle: function rhombusStyle() {
      return {
        height: this.size / 7.5 + 'px',
        width: this.size / 7.5 + 'px',
        animationDuration: this.animationDuration + 'ms',
        top: this.size / 2.3077 + 'px',
        left: this.size / 2.3077 + 'px',
        backgroundColor: this.color
      };
    },
    rhombusesStyles: function rhombusesStyles() {
      var rhombusesStyles = [];
      var delayModifier = this.animationDuration * 0.05;

      for (var i = 1; i <= this.rhombusesNum; i++) {
        rhombusesStyles.push((0, _assign2.default)({
          animationDelay: delayModifier * (i + 1) + 'ms'
        }, this.rhombusStyle));
      }

      return rhombusesStyles;
    },
    bigRhombusStyle: function bigRhombusStyle() {
      return {
        height: this.size / 3 + 'px',
        width: this.size / 3 + 'px',
        animationDuration: '' + this.animationDuration,
        top: this.size / 3 + 'px',
        left: this.size / 3 + 'px',
        backgroundColor: this.color
      };
    }
  }

};

/***/ }),
/* 448 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'CirclesToRhombusesSpinner',

  props: {
    animationDuration: {
      type: Number,
      default: 1200
    },
    circleSize: {
      type: Number,
      default: 15
    },
    color: {
      type: String,
      default: '#fff'
    },
    circlesNum: {
      type: Number,
      default: 3
    }
  },

  computed: {
    circleMarginLeft: function circleMarginLeft() {
      return this.circleSize * 1.125;
    },
    spinnertStyle: function spinnertStyle() {
      return {
        height: this.circleSize + 'px',
        width: (this.circleSize + this.circleMarginLeft) * this.circlesNum + 'px'
      };
    },
    circleStyle: function circleStyle() {
      return {
        borderColor: this.color,
        animationDuration: this.animationDuration + 'ms',
        height: this.circleSize + 'px',
        width: this.circleSize + 'px',
        marginLeft: this.circleMarginLeft + 'px'
      };
    },
    circlesStyles: function circlesStyles() {
      var circlesStyles = [];
      var delay = 150;

      for (var i = 1; i <= this.circlesNum; i++) {
        var style = (0, _assign2.default)({
          animationDelay: i * delay + 'ms'
        }, this.circleStyle);

        if (i === 1) {
          style.marginLeft = 0;
        }

        circlesStyles.push(style);
      }

      return circlesStyles;
    }
  }
};

/***/ }),
/* 449 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'FingerprintSpinner',

  props: {
    animationDuration: {
      type: Number,
      default: 1500
    },
    size: {
      type: Number,
      default: 60
    },
    color: {
      type: String,
      default: '#fff'
    }
  },

  data: function data() {
    return {
      ringsNum: 9,
      containerPadding: 2
    };
  },


  computed: {
    outerRingSize: function outerRingSize() {
      return this.size - this.containerPadding * 2;
    },
    spinnerStyle: function spinnerStyle() {
      return {
        height: this.size + 'px',
        width: this.size + 'px',
        padding: this.containerPadding + 'px'
      };
    },
    ringStyle: function ringStyle() {
      return {
        borderTopColor: this.color,
        animationDuration: this.animationDuration + 'ms'
      };
    },
    ringsStyles: function ringsStyles() {
      var ringsStyles = [];
      var ringBase = this.outerRingSize / this.ringsNum;
      var ringInc = ringBase;

      for (var i = 1; i <= this.ringsNum; i++) {
        var style = (0, _assign2.default)({
          animationDelay: i * 50 + 'ms',
          height: ringBase + (i - 1) * ringInc + 'px',
          width: ringBase + (i - 1) * ringInc + 'px'
        }, this.ringStyle);
        ringsStyles.push(style);
      }

      return ringsStyles;
    }
  }
};

/***/ }),
/* 450 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(160);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'FlowerSpinner',

  props: {
    animationDuration: {
      type: Number,
      default: 2500
    },
    size: {
      type: Number,
      default: 70
    },
    color: {
      type: String,
      default: '#fff'
    }
  },

  data: function data() {
    return {
      smallerDotAnimationBaseName: 'flower-spinner-smaller-dot-animation',
      biggerDotAnimationBaseName: 'flower-spinner-bigger-dot-animation',
      currentSmallerDotAnimationBaseName: '',
      currentBiggerDotAnimationBaseName: ''
    };
  },


  computed: {
    dotSize: function dotSize() {
      return this.size / 7;
    },
    spinnerStyle: function spinnerStyle() {
      return {
        width: this.size + 'px',
        height: this.size + 'px'
      };
    },
    dotsContainerStyle: function dotsContainerStyle() {
      return {
        width: this.dotSize + 'px',
        height: this.dotSize + 'px'
      };
    },
    smallerDotStyle: function smallerDotStyle() {
      return {
        background: this.color,
        animationDuration: this.animationDuration + 'ms',
        animationName: this.currentSmallerDotAnimationBaseName
      };
    },
    biggerDotStyle: function biggerDotStyle() {
      return {
        background: this.color,
        animationDuration: this.animationDuration + 'ms',
        animationName: this.currentBiggerDotAnimationBaseName
      };
    }
  },

  watch: {
    '$props': {
      handler: function handler() {
        this.updateAnimation();
      },

      deep: true
    }
  },

  mounted: function mounted() {
    this.updateAnimation();
  },


  methods: {
    updateAnimation: function updateAnimation() {
      this.updateAnimationName();
      _utils2.default.appendKeyframes(this.currentSmallerDotAnimationBaseName, this.generateSmallerDotKeyframes());
      _utils2.default.appendKeyframes(this.currentBiggerDotAnimationBaseName, this.generateBiggerDotKeyframes());
    },
    updateAnimationName: function updateAnimationName() {
      this.currentSmallerDotAnimationBaseName = this.smallerDotAnimationBaseName + '-' + Date.now();
      this.currentBiggerDotAnimationBaseName = this.biggerDotAnimationBaseName + '-' + Date.now();
    },
    generateSmallerDotKeyframes: function generateSmallerDotKeyframes() {
      return '0%, 100% {\n                  box-shadow: 0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ';\n                }\n                25%, 75% {\n                  box-shadow: ' + this.dotSize * 1.4 + 'px 0 0 ' + this.color + ',\n                              -' + this.dotSize * 1.4 + 'px 0 0 ' + this.color + ',\n                              0 ' + this.dotSize * 1.4 + 'px 0 ' + this.color + ',\n                              0 -' + this.dotSize * 1.4 + 'px 0 ' + this.color + ',\n                              ' + this.dotSize + 'px -' + this.dotSize + 'px 0 ' + this.color + ',\n                              ' + this.dotSize + 'px ' + this.dotSize + 'px 0 ' + this.color + ',\n                              -' + this.dotSize + 'px -' + this.dotSize + 'px 0 ' + this.color + ',\n                              -' + this.dotSize + 'px ' + this.dotSize + 'px 0 ' + this.color + ';\n\n                }\n                100% {\n                  box-shadow: 0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ';\n                }';
    },
    generateBiggerDotKeyframes: function generateBiggerDotKeyframes() {
      return '0%, 100% {\n                  box-shadow: 0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ';\n                }\n                50% {\n                  transform: rotate(180deg);\n                }\n                25%, 75% {\n                  box-shadow: ' + this.dotSize * 2.6 + 'px 0 0 ' + this.color + ',\n                              -' + this.dotSize * 2.6 + 'px 0 0 ' + this.color + ',\n                              0 ' + this.dotSize * 2.6 + 'px 0 ' + this.color + ',\n                              0 -' + this.dotSize * 2.6 + 'px 0 ' + this.color + ',\n                              ' + this.dotSize * 1.9 + 'px -' + this.dotSize * 1.9 + 'px 0 ' + this.color + ',\n                              ' + this.dotSize * 1.9 + 'px ' + this.dotSize * 1.9 + 'px 0 ' + this.color + ',\n                              -' + this.dotSize * 1.9 + 'px -' + this.dotSize * 1.9 + 'px 0 ' + this.color + ',\n                              -' + this.dotSize * 1.9 + 'px ' + this.dotSize * 1.9 + 'px 0 ' + this.color + ';\n\n                }\n                100% {\n                  transform: rotate(360deg);\n                  box-shadow: 0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ',\n                              0 0 0 ' + this.color + ';\n                }';
    }
  }
};

/***/ }),
/* 451 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'FulfillingBouncingCircleSpinner',

  props: {
    animationDuration: {
      type: Number,
      default: 4000
    },
    size: {
      type: Number,
      default: 60
    },
    color: {
      type: String,
      default: '#fff'
    }
  },

  computed: {
    spinnerStyle: function spinnerStyle() {
      return {
        height: this.size + 'px',
        width: this.size + 'px',
        animationDuration: this.animationDuration + 'ms'
      };
    },
    orbitStyle: function orbitStyle() {
      return {
        height: this.size + 'px',
        width: this.size + 'px',
        borderColor: this.color,
        borderWidth: this.size * 0.03 + 'px',
        animationDuration: this.animationDuration + 'ms'
      };
    },
    circleStyle: function circleStyle() {
      return {
        height: this.size + 'px',
        width: this.size + 'px',
        borderColor: this.color,
        color: this.color,
        borderWidth: this.size * 0.1 + 'px',
        animationDuration: this.animationDuration + 'ms'
      };
    }
  }
};

/***/ }),
/* 452 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'FulfillingSquareSpinner',

  props: {
    animationDuration: {
      type: Number,
      default: 4000
    },
    size: {
      type: Number,
      default: 50
    },
    color: {
      type: String,
      default: '#fff'
    }
  },

  computed: {
    spinnerStyle: function spinnerStyle() {
      return {
        height: this.size + 'px',
        width: this.size + 'px',
        borderColor: this.color
      };
    },
    spinnerInnerStyle: function spinnerInnerStyle() {
      return {
        backgroundColor: this.color
      };
    }
  }
};

/***/ }),
/* 453 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'HalfCircleSpinner',

  props: {
    animationDuration: {
      type: Number,
      default: 1000
    },
    size: {
      type: Number,
      default: 60
    },
    color: {
      type: String,
      default: '#fff'
    }
  },

  computed: {
    spinnerStyle: function spinnerStyle() {
      return {
        height: this.size + 'px',
        width: this.size + 'px'
      };
    },
    circleStyle: function circleStyle() {
      return {
        borderWidth: this.size / 10 + 'px',
        animationDuration: this.animationDuration + 'ms'
      };
    },
    circle1Style: function circle1Style() {
      return (0, _assign2.default)({
        borderTopColor: this.color
      }, this.circleStyle);
    },
    circle2Style: function circle2Style() {
      return (0, _assign2.default)({
        borderBottomColor: this.color
      }, this.circleStyle);
    }
  }
};

/***/ }),
/* 454 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'HollowDotsSpinner',

  props: {
    animationDuration: {
      type: Number,
      default: 1000
    },
    dotSize: {
      type: Number,
      default: 15
    },
    dotsNum: {
      type: Number,
      default: 3
    },
    color: {
      type: String,
      default: '#fff'
    }
  },

  computed: {
    horizontalMargin: function horizontalMargin() {
      return this.dotSize / 2;
    },
    spinnerStyle: function spinnerStyle() {
      return {
        height: this.dotSize + 'px',
        width: (this.dotSize + this.horizontalMargin * 2) * this.dotsNum + 'px'
      };
    },
    dotStyle: function dotStyle() {
      return {
        animationDuration: this.animationDuration + 'ms',
        width: this.dotSize + 'px',
        height: this.dotSize + 'px',
        margin: '0 ' + this.horizontalMargin + 'px',
        borderWidth: this.dotSize / 5 + 'px',
        borderColor: this.color
      };
    },
    dotsStyles: function dotsStyles() {
      var dotsStyles = [];
      var delayModifier = 0.3;
      var basicDelay = 1000;

      for (var i = 1; i <= this.dotsNum; i++) {
        var style = (0, _assign2.default)({
          animationDelay: basicDelay * i * delayModifier + 'ms'
        }, this.dotStyle);

        dotsStyles.push(style);
      }

      return dotsStyles;
    }
  }
};

/***/ }),
/* 455 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'IntersectingCirclesSpinner',

  props: {
    animationDuration: {
      type: Number,
      default: 1200
    },
    size: {
      type: Number,
      default: 70
    },
    color: {
      type: String,
      default: '#fff'
    }
  },

  computed: {
    circleSize: function circleSize() {
      return this.size / 2;
    },
    spinnerStyle: function spinnerStyle() {
      return {
        width: this.size + 'px',
        height: this.size + 'px'
      };
    },
    spinnerBlockStyle: function spinnerBlockStyle() {
      return {
        animationDuration: this.animationDuration + 'ms',
        width: this.circleSize + 'px',
        height: this.circleSize + 'px'
      };
    },
    circleStyle: function circleStyle() {
      return {
        borderColor: this.color
      };
    },
    circleStyles: function circleStyles() {
      var _this = this;

      var circlesPositions = [{ top: 0, left: 0 }, { left: this.circleSize * -0.36 + 'px', top: this.circleSize * 0.2 + 'px' }, { left: this.circleSize * -0.36 + 'px', top: this.circleSize * -0.2 + 'px' }, { left: 0, top: this.circleSize * -0.36 + 'px' }, { left: this.circleSize * 0.36 + 'px', top: this.circleSize * -0.2 + 'px' }, { left: this.circleSize * 0.36 + 'px', top: this.circleSize * 0.2 + 'px' }, { left: 0, top: this.circleSize * 0.36 + 'px' }];

      return circlesPositions.map(function (cp) {
        return (0, _assign2.default)(cp, _this.circleStyle);
      });
    }
  }
};

/***/ }),
/* 456 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'LoopingRhombusesSpinner',

  props: {
    animationDuration: {
      type: Number,
      default: 2500
    },
    rhombusSize: {
      type: Number,
      default: 15
    },
    color: {
      type: String,
      default: '#fff'
    }
  },

  data: function data() {
    return {
      rhombusesNum: 3
    };
  },


  computed: {
    spinnerStyle: function spinnerStyle() {
      return {
        height: this.rhombusSize + 'px',
        width: this.rhombusSize * 4 + 'px'
      };
    },
    rhombusStyle: function rhombusStyle() {
      return {
        height: this.rhombusSize + 'px',
        width: this.rhombusSize + 'px',
        backgroundColor: this.color,
        animationDuration: this.animationDuration + 'ms',
        left: this.rhombusSize * 4 + 'px'
      };
    },
    rhombusesStyles: function rhombusesStyles() {
      var rhombusesStyles = [];
      var delay = -this.animationDuration / 1.5;

      for (var i = 1; i <= this.rhombusesNum; i++) {
        var style = (0, _assign2.default)({
          animationDelay: i * delay + 'ms'
        }, this.rhombusStyle);

        rhombusesStyles.push(style);
      }

      return rhombusesStyles;
    }
  }
};

/***/ }),
/* 457 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'OrbitSpinner',

  props: {
    animationDuration: {
      type: Number,
      default: 1000
    },
    size: {
      type: Number,
      default: 50
    },
    color: {
      type: String,
      default: '#fff'
    }
  },

  computed: {
    spinnerStyle: function spinnerStyle() {
      return {
        height: this.size + 'px',
        width: this.size + 'px'
      };
    },
    orbitStyle: function orbitStyle() {
      return {
        borderColor: this.color,
        animationDuration: this.animationDuration + 'ms'
      };
    }
  }
};

/***/ }),
/* 458 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(160);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'PixelSpinner',

  props: {
    animationDuration: {
      type: Number,
      default: 1500
    },
    size: {
      type: Number,
      default: 70
    },
    color: {
      type: String,
      default: '#fff'
    }
  },

  data: function data() {
    return {
      animationBaseName: 'pixel-spinner-animation',
      currentAnimationName: ''
    };
  },


  computed: {
    pixelSize: function pixelSize() {
      return this.size / 7;
    },
    spinnerStyle: function spinnerStyle() {
      return {
        width: this.size + 'px',
        height: this.size + 'px'
      };
    },
    spinnerInnerStyle: function spinnerInnerStyle() {
      return {
        animationDuration: this.animationDuration + 'ms',
        animationName: this.currentAnimationName,
        width: this.pixelSize + 'px',
        height: this.pixelSize + 'px',
        backgroundColor: this.color,
        color: this.color,
        boxShadow: '\n                      ' + this.pixelSize * 1.5 + 'px ' + this.pixelSize * 1.5 + 'px 0 0,\n                      ' + this.pixelSize * -1.5 + 'px ' + this.pixelSize * -1.5 + 'px 0 0,\n                      ' + this.pixelSize * 1.5 + 'px ' + this.pixelSize * -1.5 + 'px 0 0,\n                      ' + this.pixelSize * -1.5 + 'px ' + this.pixelSize * 1.5 + 'px 0 0,\n                      0 ' + this.pixelSize * 1.5 + 'px 0 0,\n                      ' + this.pixelSize * 1.5 + 'px 0 0 0,\n                      ' + this.pixelSize * -1.5 + 'px 0 0 0,\n                      0 ' + this.pixelSize * -1.5 + 'px 0 0\n                    '
      };
    }
  },

  watch: {
    '$props': {
      handler: function handler() {
        this.updateAnimation();
      },

      deep: true
    }
  },

  mounted: function mounted() {
    this.updateAnimation();
  },


  methods: {
    updateAnimation: function updateAnimation() {
      this.updateAnimationName();
      _utils2.default.appendKeyframes(this.currentAnimationName, this.generateKeyframes());
    },
    updateAnimationName: function updateAnimationName() {
      this.currentAnimationName = this.animationBaseName + '-' + Date.now();
    },
    generateKeyframes: function generateKeyframes() {
      return '\n      50% {\n        box-shadow:  ' + this.pixelSize * 2 + 'px ' + this.pixelSize * 2 + 'px 0 0,\n                     ' + this.pixelSize * -2 + 'px ' + this.pixelSize * -2 + 'px 0 0,\n                     ' + this.pixelSize * 2 + 'px ' + this.pixelSize * -2 + 'px 0 0,\n                     ' + this.pixelSize * -2 + 'px ' + this.pixelSize * 2 + 'px 0 0,\n                     0 ' + this.pixelSize + 'px 0 0,\n                     ' + this.pixelSize + 'px 0 0 0,\n                     ' + this.pixelSize * -1 + 'px 0 0 0,\n                     0 ' + this.pixelSize * -1 + 'px 0 0;\n      }\n\n\n      75% {\n        box-shadow:  ' + this.pixelSize * 2 + 'px ' + this.pixelSize * 2 + 'px 0 0,\n                     ' + this.pixelSize * -2 + 'px ' + this.pixelSize * -2 + 'px 0 0,\n                     ' + this.pixelSize * 2 + 'px ' + this.pixelSize * -2 + 'px 0 0,\n                     ' + this.pixelSize * -2 + 'px ' + this.pixelSize * 2 + 'px 0 0,\n                     0 ' + this.pixelSize + 'px 0 0,\n                     ' + this.pixelSize + 'px 0 0 0,\n                     ' + this.pixelSize * -1 + 'px 0 0 0,\n                     0 ' + this.pixelSize * -1 + 'px 0 0;\n      }\n\n      100% {\n        transform: rotate(360deg);\n      }';
    }
  }
};

/***/ }),
/* 459 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'RadarSpinner',

  props: {
    animationDuration: {
      type: Number,
      default: 2000
    },
    size: {
      type: Number,
      default: 110
    },
    color: {
      type: String,
      default: '#fff'
    }
  },

  data: function data() {
    return {
      circlesNum: 4
    };
  },


  computed: {
    borderWidth: function borderWidth() {
      return this.size * 5 / 110;
    },
    spinnerStyle: function spinnerStyle() {
      return {
        height: this.size + 'px',
        width: this.size + 'px'
      };
    },
    circleStyle: function circleStyle() {
      return {
        animationDuration: this.animationDuration + 'ms'
      };
    },
    circleInnerContainerStyle: function circleInnerContainerStyle() {
      return {
        borderWidth: this.borderWidth + 'px'
      };
    },
    circleInnerStyle: function circleInnerStyle() {
      return {
        borderLeftColor: this.color,
        borderRightColor: this.color,
        borderWidth: this.borderWidth + 'px'
      };
    },
    circlesStyles: function circlesStyles() {
      var circlesStyles = [];
      var delay = this.animationDuration * 0.15;

      for (var i = 0; i < this.circlesNum; i++) {
        circlesStyles.push((0, _assign2.default)({
          padding: this.borderWidth * 2 * i + 'px',
          animationDelay: (i === this.circlesNum - 1 ? 0 : delay) + 'ms'
        }, this.circleStyle));
      }

      return circlesStyles;
    }
  }
};

/***/ }),
/* 460 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'ScalingSquaresSpinner',

  props: {
    animationDuration: {
      type: Number,
      default: 1250
    },
    size: {
      type: Number,
      default: 65
    },
    color: {
      type: String,
      default: '#fff'
    }
  },

  data: function data() {
    return {
      squaresNum: 4
    };
  },


  computed: {
    spinnerStyle: function spinnerStyle() {
      return {
        height: this.size + 'px',
        width: this.size + 'px',
        animationDuration: this.animationDuration + 'ms'
      };
    },
    squareStyle: function squareStyle() {
      return {
        height: this.size * 0.25 / 1.3 + 'px',
        width: this.size * 0.25 / 1.3 + 'px',
        animationDuration: this.animationDuration + 'ms',
        borderWidth: this.size * 0.04 / 1.3 + 'px',
        borderColor: this.color
      };
    },
    squaresStyles: function squaresStyles() {
      var squaresStyles = [];

      for (var i = 1; i <= this.squaresNum; i++) {
        squaresStyles.push((0, _assign2.default)({}, this.squareStyle));
      }

      return squaresStyles;
    }
  }
};

/***/ }),
/* 461 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'SelfBuildingSquareSpinner',

  props: {
    animationDuration: {
      type: Number,
      default: 6000
    },
    size: {
      type: Number,
      default: 40
    },
    color: {
      type: String,
      default: '#fff'
    }
  },

  data: function data() {
    return {
      squaresNum: 9
    };
  },


  computed: {
    squareSize: function squareSize() {
      return this.size / 4;
    },
    initialTopPosition: function initialTopPosition() {
      return -this.squareSize * 2 / 3;
    },
    spinnerStyle: function spinnerStyle() {
      return {
        top: -this.initialTopPosition + 'px',
        height: this.size + 'px',
        width: this.size + 'px'
      };
    },
    squareStyle: function squareStyle() {
      return {
        height: this.squareSize + 'px',
        width: this.squareSize + 'px',
        top: this.initialTopPosition + 'px',
        marginRight: this.squareSize / 3 + 'px',
        marginTop: this.squareSize / 3 + 'px',
        animationDuration: this.animationDuration + 'ms',
        background: this.color
      };
    },
    squaresStyles: function squaresStyles() {
      var squaresStyles = [];
      var delaysMultipliers = [6, 7, 8, 3, 4, 5, 0, 1, 2];
      var delayModifier = this.animationDuration * 0.05;

      for (var i = 0; i < this.squaresNum; i++) {
        squaresStyles.push((0, _assign2.default)({
          animationDelay: delayModifier * delaysMultipliers[i] + 'ms'
        }, this.squareStyle));
      }

      return squaresStyles;
    }
  }
};

/***/ }),
/* 462 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'SemipolarSpinner',

  props: {
    animationDuration: {
      type: Number,
      default: 2000
    },
    size: {
      type: Number,
      default: 65
    },
    color: {
      type: String,
      default: '#fff'
    }
  },

  data: function data() {
    return {
      ringsNum: 5
    };
  },


  computed: {
    spinnerStyle: function spinnerStyle() {
      return {
        height: this.size + 'px',
        width: this.size + 'px'
      };
    },
    ringStyle: function ringStyle() {
      return {
        animationDuration: this.animationDuration + 'ms',
        borderTopColor: this.color,
        borderLeftColor: this.color
      };
    },
    ringsStyles: function ringsStyles() {
      var ringsStyles = [];
      var delayModifier = 0.1;
      var ringWidth = this.size * 0.05;
      var positionIncrement = ringWidth * 2;
      var sizeDecrement = this.size * 0.2;

      for (var i = 0; i < this.ringsNum; i++) {
        var computedSize = this.size - sizeDecrement * i + 'px';
        var computedPosition = positionIncrement * i + 'px';
        var style = (0, _assign2.default)({
          animationDelay: this.animationDuration * delayModifier * (this.ringsNum - i - 1) + 'ms',
          height: computedSize,
          width: computedSize,
          left: computedPosition,
          top: computedPosition,
          borderWidth: ringWidth + 'px'
        }, this.ringStyle);
        ringsStyles.push(style);
      }

      return ringsStyles;
    }
  }
};

/***/ }),
/* 463 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(160);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'SpringSpinner',

  props: {
    animationDuration: {
      type: Number,
      default: 3000
    },
    size: {
      type: Number,
      default: 70
    },
    color: {
      type: String,
      default: '#fff'
    }
  },

  data: function data() {
    return {
      animationBaseName: 'spring-spinner-animation',
      currentAnimationName: ''
    };
  },


  computed: {
    spinnerStyle: function spinnerStyle() {
      return {
        height: this.size + 'px',
        width: this.size + 'px'
      };
    },
    spinnerPartStyle: function spinnerPartStyle() {
      return {
        height: this.size / 2 + 'px',
        width: this.size + 'px'
      };
    },
    rotatorStyle: function rotatorStyle() {
      return {
        height: this.size + 'px',
        width: this.size + 'px',
        borderRightColor: this.color,
        borderTopColor: this.color,
        borderWidth: this.size / 7 + 'px',
        animationDuration: this.animationDuration + 'ms',
        animationName: this.currentAnimationName
      };
    }
  },

  watch: {
    '$props': {
      handler: function handler() {
        this.updateAnimation();
      },

      deep: true
    }
  },

  mounted: function mounted() {
    this.updateAnimation();
  },


  methods: {
    updateAnimation: function updateAnimation() {
      this.updateAnimationName();
      _utils2.default.appendKeyframes(this.currentAnimationName, this.generateKeyframes());
    },
    updateAnimationName: function updateAnimationName() {
      this.currentAnimationName = this.animationBaseName + '-' + Date.now();
    },
    generateKeyframes: function generateKeyframes() {
      return '\n        0% {\n          border-width: ' + this.size / 7 + 'px;\n        }\n        25% {\n          border-width: ' + this.size / 23.33 + 'px;\n        }\n        50% {\n          transform: rotate(115deg);\n          border-width: ' + this.size / 7 + 'px;\n        }\n        75% {\n          border-width: ' + this.size / 23.33 + 'px;\n         }\n        100% {\n         border-width: ' + this.size / 7 + 'px;\n        }';
    }
  }
};

/***/ }),
/* 464 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'SwappingSquaresSpinner',

  props: {
    animationDuration: {
      type: Number,
      default: 1000
    },
    size: {
      type: Number,
      default: 65
    },
    color: {
      type: String,
      default: '#fff'
    }
  },

  data: function data() {
    return {
      animationBaseName: 'swapping-squares-animation-child',
      squaresNum: 4
    };
  },


  computed: {
    spinnerStyle: function spinnerStyle() {
      return {
        height: this.size + 'px',
        width: this.size + 'px'
      };
    },
    squareStyle: function squareStyle() {
      return {
        height: this.size * 0.25 / 1.3 + 'px',
        width: this.size * 0.25 / 1.3 + 'px',
        animationDuration: this.animationDuration + 'ms',
        borderWidth: this.size * 0.04 / 1.3 + 'px',
        borderColor: this.color
      };
    },
    squaresStyles: function squaresStyles() {
      var squaresStyles = [];
      var delay = this.animationDuration * 0.5;

      for (var i = 1; i <= this.squaresNum; i++) {
        squaresStyles.push((0, _assign2.default)({
          animationDelay: (i % 2 === 0 ? delay : 0) + 'ms'
        }, this.squareStyle));
      }

      return squaresStyles;
    }
  }
};

/***/ }),
/* 465 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'TrinityRingsSpinner',

  props: {
    animationDuration: {
      type: Number,
      default: 1500
    },
    size: {
      type: Number,
      default: 60
    },
    color: {
      type: String,
      default: '#fff'
    }
  },

  data: function data() {
    return {
      containerPadding: 3
    };
  },


  computed: {
    outerRingSize: function outerRingSize() {
      return this.size - this.containerPadding * 2;
    },
    spinnerStyle: function spinnerStyle() {
      return {
        height: this.size + 'px',
        width: this.size + 'px',
        padding: this.containerPadding + 'px'
      };
    },
    ring1Style: function ring1Style() {
      return {
        height: this.outerRingSize + 'px',
        width: this.outerRingSize + 'px',
        borderColor: this.color,
        animationDuration: this.animationDuration + 'ms'
      };
    },
    ring2Style: function ring2Style() {
      return {
        height: this.outerRingSize * 0.65 + 'px',
        width: this.outerRingSize * 0.65 + 'px',
        borderColor: this.color,
        animationDuration: this.animationDuration + 'ms'
      };
    },
    ring3Style: function ring3Style() {
      return {
        height: this.outerRingSize * 0.1 + 'px',
        width: this.outerRingSize * 0.1 + 'px',
        borderColor: this.color,
        animationDuration: this.animationDuration + 'ms'
      };
    }
  }
};

/***/ }),
/* 466 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(93);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(92);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof window !== 'undefined') {
  var slick = __webpack_require__(760);
}

exports.default = {
  props: {
    options: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },

  mounted: function mounted() {
    this.create();
  },

  destroyed: function destroyed() {
    (0, _jquery2.default)(this.$el).slick('unslick');
  },

  methods: {
    create: function create() {
      var $slick = (0, _jquery2.default)(this.$el);

      $slick.on('afterChange', this.onAfterChange);
      $slick.on('beforeChange', this.onBeforeChange);
      $slick.on('breakpoint', this.onBreakpoint);
      $slick.on('destroy', this.onDestroy);
      $slick.on('edge', this.onEdge);
      $slick.on('init', this.onInit);
      $slick.on('reInit', this.onReInit);
      $slick.on('setPosition', this.onSetPosition);
      $slick.on('swipe', this.onSwipe);
      $slick.on('lazyLoaded', this.onLazyLoaded);
      $slick.on('lazyLoadError', this.onLazyLoadError);

      $slick.slick(this.options);
    },

    destroy: function destroy() {
      var $slick = (0, _jquery2.default)(this.$el);

      $slick.off('afterChange', this.onAfterChange);
      $slick.off('beforeChange', this.onBeforeChange);
      $slick.off('breakpoint', this.onBreakpoint);
      $slick.off('destroy', this.onDestroy);
      $slick.off('edge', this.onEdge);
      $slick.off('init', this.onInit);
      $slick.off('reInit', this.onReInit);
      $slick.off('setPosition', this.onSetPosition);
      $slick.off('swipe', this.onSwipe);
      $slick.off('lazyLoaded', this.onLazyLoaded);
      $slick.off('lazyLoadError', this.onLazyLoadError);
      (0, _jquery2.default)(this.$el).slick('unslick');
    },

    reSlick: function reSlick() {
      this.destroy();
      this.create();
    },

    next: function next() {
      (0, _jquery2.default)(this.$el).slick('slickNext');
    },

    prev: function prev() {
      (0, _jquery2.default)(this.$el).slick('slickPrev');
    },

    pause: function pause() {
      (0, _jquery2.default)(this.$el).slick('slickPause');
    },

    play: function play() {
      (0, _jquery2.default)(this.$el).slick('slickPlay');
    },

    goTo: function goTo(index, dontAnimate) {
      (0, _jquery2.default)(this.$el).slick('slickGoTo', index, dontAnimate);
    },

    currentSlide: function currentSlide() {
      return (0, _jquery2.default)(this.$el).slick('slickCurrentSlide');
    },

    add: function add(element, index, addBefore) {
      (0, _jquery2.default)(this.$el).slick('slickAdd', element, index, addBefore);
    },

    remove: function remove(index, removeBefore) {
      (0, _jquery2.default)(this.$el).slick('slickRemove', index, removeBefore);
    },

    filter: function filter(filterData) {
      (0, _jquery2.default)(this.$el).slick('slickFilter', filterData);
    },

    unfilter: function unfilter() {
      (0, _jquery2.default)(this.$el).slick('slickUnfilter');
    },

    getOption: function getOption(option) {
      (0, _jquery2.default)(this.$el).slick('slickGetOption', option);
    },

    setOption: function setOption(option, value, refresh) {
      (0, _jquery2.default)(this.$el).slick('slickSetOption', option, value, refresh);
    },

    setPosition: function setPosition() {
      (0, _jquery2.default)(this.$el).slick('setPosition');
    },

    onAfterChange: function onAfterChange(event, slick, currentSlide) {
      this.$emit('afterChange', event, slick, currentSlide);
    },

    onBeforeChange: function onBeforeChange(event, slick, currentSlide, nextSlide) {
      this.$emit('beforeChange', event, slick, currentSlide, nextSlide);
    },

    onBreakpoint: function onBreakpoint(event, slick, breakpoint) {
      this.$emit('breakpoint', event, slick, breakpoint);
    },

    onDestroy: function onDestroy(event, slick) {
      this.$emit('destroy', event, slick);
    },

    onEdge: function onEdge(event, slick, direction) {
      this.$emit('edge', event, slick, direction);
    },

    onInit: function onInit(event, slick) {
      this.$emit('init', event, slick);
    },

    onReInit: function onReInit(event, slick) {
      this.$emit('reInit', event, slick);
    },

    onSetPosition: function onSetPosition(event, slick) {
      this.$emit('setPosition', event, slick);
    },

    onSwipe: function onSwipe(event, slick, direction) {
      this.$emit('swipe', event, slick, direction);
    },

    onLazyLoaded: function onLazyLoaded(event, slick, image, imageSource) {
      this.$emit('lazyLoaded', event, slick, image, imageSource);
    },

    onLazyLoadError: function onLazyLoadError(event, slick, image, imageSource) {
      this.$emit('lazyLoadError', event, slick, image, imageSource);
    }
  }

};

/***/ }),
/* 467 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = __webpack_require__(43);

var _promise2 = _interopRequireDefault(_promise);

var _jquery = __webpack_require__(92);

var _jquery2 = _interopRequireDefault(_jquery);

var _Scroller = __webpack_require__(570);

var _Scroller2 = _interopRequireDefault(_Scroller);

var _EpgManager = __webpack_require__(118);

var _EpgManager2 = _interopRequireDefault(_EpgManager);

var _WProgressBarLine = __webpack_require__(114);

var _WProgressBarLine2 = _interopRequireDefault(_WProgressBarLine);

var _PContextMenu = __webpack_require__(807);

var _PContextMenu2 = _interopRequireDefault(_PContextMenu);

var _WNotifications = __webpack_require__(839);

var _WNotifications2 = _interopRequireDefault(_WNotifications);

var _WModal = __webpack_require__(437);

var _WModal2 = _interopRequireDefault(_WModal);

var _WConnectionStatus = __webpack_require__(833);

var _WConnectionStatus2 = _interopRequireDefault(_WConnectionStatus);

var _WMemoryUsage = __webpack_require__(838);

var _WMemoryUsage2 = _interopRequireDefault(_WMemoryUsage);

var _WCrazyMonkey = __webpack_require__(834);

var _WCrazyMonkey2 = _interopRequireDefault(_WCrazyMonkey);

var _WPrompts = __webpack_require__(841);

var _WPrompts2 = _interopRequireDefault(_WPrompts);

var _WExitModal = __webpack_require__(835);

var _WExitModal2 = _interopRequireDefault(_WExitModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function delay(timeInterval) {
  return new _promise2.default(function (resolve) {
    setTimeout(function () {
      resolve();
    }, timeInterval);
  });
}

var epgManager = _EpgManager2.default.getInstance();

exports.default = {
  components: {
    WPrompts: _WPrompts2.default,
    WCrazyMonkey: _WCrazyMonkey2.default,
    WProgressBarLine: _WProgressBarLine2.default,
    PContextMenu: _PContextMenu2.default,
    WNotifications: _WNotifications2.default,
    WModal: _WModal2.default,
    WConnectionStatus: _WConnectionStatus2.default,
    WMemoryUsage: _WMemoryUsage2.default,
    WExitModal: _WExitModal2.default
  },
  name: 'app',
  props: ['username'],
  data: function data() {
    return {
      epg: null,
      baseFontSize: 16,
      showInfo: false,
      progressModal: null,
      contextButtons: [],
      contextMenuVisible: false,
      isExitNeeded: false,
      exitCounter: 0,
      isShowUpArrow: false,
      scrollTimer: null,
      readyFlag: {
        epg: false
      }
    };
  },

  computed: {
    ready: function ready() {
      return this.readyFlag.epg;
    },
    connected: function connected() {
      return this.$store.getters.getConnectionStatus;
    },
    authorized: function authorized() {
      return this.$store.getters.getAuthorized;
    }
  },
  watch: {
    connected: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(value) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!value) {
                  _context.next = 10;
                  break;
                }

                _context.prev = 1;

                if (this.readyFlag.epg) {
                  _context.next = 5;
                  break;
                }

                _context.next = 5;
                return this.loadEpg();

              case 5:
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](1);

                this.$nm.showError(_context.t0.message);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 7]]);
      }));

      function connected(_x) {
        return _ref.apply(this, arguments);
      }

      return connected;
    }()
  },
  created: function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var _this = this;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log('App created');

              this.$lang.setLang('ru');

              this.$store.commit('authorized', this.$backend.authorized);

              setInterval(this.syncVuexWithBackend.bind(this), 3600000);
              _context2.next = 6;
              return this.syncVuexWithBackend();

            case 6:

              this.$root.$on('scrollTo', function (el) {
                _Scroller2.default.scrollTo(el);
              });
              this.$root.$on('afterReset', function () {
                _this.readyFlag.epg = false;
                _this.$router.push('/');
                _this.$nm.showMessage(_this.$lang.messages.messages.data_reset, 0, _this.$lang.messages.messages.reloading, function () {
                  return window.location.reload();
                });
              });

              epgManager.addEventListener(_EpgManager2.default.PROGRESS_CHANGE, function (func, value) {
                _this.progressModal = {
                  id: 100,
                  contentType: 'progress',
                  header: '',
                  title: '',
                  progress: value
                };
              });
              epgManager.addEventListener(_EpgManager2.default.COMPLETE, function () {
                _this.progressModal = null;
              });

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function created() {
      return _ref2.apply(this, arguments);
    }

    return created;
  }(),
  mounted: function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var isTimeChecked;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              window.addEventListener('resize', this.handleResize);
              this.handleResize();
              window.app = this;

              if (!this.connected) {
                _context3.next = 8;
                break;
              }

              _context3.next = 6;
              return this.$backend.utils.checkTime();

            case 6:
              isTimeChecked = _context3.sent;

              if (!isTimeChecked) {
                this.$nm.showMessage(this.$lang.messages.messages.check_time_settings, 0);
              }

            case 8:
              this.$root.$on('navigateBack', this.navigateBack);

            case 9:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function mounted() {
      return _ref3.apply(this, arguments);
    }

    return mounted;
  }(),
  destroyed: function destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  updated: function updated() {},

  methods: {
    scrollToTop: function scrollToTop() {
      this.$refs.content.scrollTop = 0;
    },
    scrollHandler: function scrollHandler(t) {
      var _this2 = this;

      var delta = t.target.scrollHeight - (t.target.scrollTop + t.target.clientHeight);
      clearInterval(this.scrollTimer);
      if (delta < 500) {
        this.scrollTimer = setTimeout(function () {
          _this2.$root.$emit('bottomIsClose');
        }, 500);
      }
      if (t.target.scrollTop > 0) {
        this.isShowUpArrow = true;
      } else {
        this.isShowUpArrow = false;
      }
      var headerHeight = 0;
      if (document.getElementsByClassName('header')[0]) {
        headerHeight = document.getElementsByClassName('header')[0].getBoundingClientRect().height;
      }
      if (headerHeight >= t.target.scrollTop) {
        var result = headerHeight - t.target.scrollTop;
        var header = document.getElementsByClassName('header')[0];
        if (document.getElementsByClassName('sidebar')[0]) {
          document.getElementsByClassName('sidebar')[0].style.top = result + 'px';
        }
        if (header) {
          header.style.position = 'relative';
          header.style.width = '100%';
          header.style.color = 'white';
        }
        if (document.getElementsByClassName('header__burger')[0]) {
          document.getElementsByClassName('header__burger')[0].style.opacity = 0;
        }
        var tags = document.getElementsByClassName('tags')[0];
        if (tags) {
          tags.style.top = headerHeight + 'px';
          tags.style.height = 'calc(100vh - 2.5rem)';
        }
      } else {
        document.getElementsByClassName('sidebar')[0].style.top = headerHeight + 'px';
        var _header = document.getElementsByClassName('header')[0];
        if (_header) {
          _header.style.position = 'fixed';
          _header.style.width = '3.4rem';
          _header.style.color = '#111111';
        }
        document.getElementsByClassName('header__burger')[0].style.opacity = 1;
        var _tags = document.getElementsByClassName('tags')[0];
        if (_tags) {
          _tags.style.top = 0;
          _tags.style.height = '100vh';
        }
      }
    },
    closeExitModal: function closeExitModal() {
      this.isExitNeeded = false;
    },
    loadEpg: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var repeatCounter;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.log('App epgm init:');
                repeatCounter = 3;

              case 2:
                if (!(repeatCounter > 0)) {
                  _context4.next = 23;
                  break;
                }

                repeatCounter -= 1;
                _context4.prev = 4;
                _context4.next = 7;
                return epgManager.init();

              case 7:
                console.log('App epgm inited');
                this.readyFlag.epg = true;
                return _context4.abrupt('return');

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4['catch'](4);

                console.error(_context4.t0);

                if (!(repeatCounter > 0)) {
                  _context4.next = 20;
                  break;
                }

                _context4.next = 18;
                return delay(2000);

              case 18:
                _context4.next = 21;
                break;

              case 20:
                this.$nm.showMessage(this.$lang.messages.messages.reloading_error + '.<br>' + _context4.t0, 0, this.$lang.messages.messages.reloading, function () {
                  return window.location.reload();
                });

              case 21:
                _context4.next = 2;
                break;

              case 23:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[4, 12]]);
      }));

      function loadEpg() {
        return _ref4.apply(this, arguments);
      }

      return loadEpg;
    }(),
    handleResize: function handleResize() {
      this.baseFontSize = 16 * this.$el.clientWidth / 1280;
      (0, _jquery2.default)('html').css({ fontSize: this.baseFontSize });
    },
    requestFullscreen: function requestFullscreen() {
      var elem = this.$el.querySelector('.app-content');
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    },
    navigateBack: function navigateBack() {
      var levelUpRoute = this.$router.getLevelUpRoute();
      if (!levelUpRoute) {
        if (this.exitCounter === 0) {
          this.$root.$emit('focusMenu');
          this.exitCounter += 1;
        } else {
          this.isExitNeeded = true;
          this.exitCounter = 0;
        }
      } else {
        this.$router.push(levelUpRoute);
      }
    },
    switchToNet: function switchToNet(net) {
      localStorage.setItem('network_id', net);
      location.reload();
    }
  }
};

/***/ }),
/* 468 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = __webpack_require__(76);

var _lodash2 = _interopRequireDefault(_lodash);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

var _datetime = __webpack_require__(41);

var _datetime2 = _interopRequireDefault(_datetime);

var _PHome = __webpack_require__(810);

var _PHome2 = _interopRequireDefault(_PHome);

var _PTv = __webpack_require__(818);

var _PTv2 = _interopRequireDefault(_PTv);

var _PLive = __webpack_require__(811);

var _PLive2 = _interopRequireDefault(_PLive);

var _PLogin = __webpack_require__(812);

var _PLogin2 = _interopRequireDefault(_PLogin);

var _PTvColumn = __webpack_require__(819);

var _PTvColumn2 = _interopRequireDefault(_PTvColumn);

var _PGrid = __webpack_require__(809);

var _PGrid2 = _interopRequireDefault(_PGrid);

var _PFavorites = __webpack_require__(808);

var _PFavorites2 = _interopRequireDefault(_PFavorites);

var _PSearch = __webpack_require__(816);

var _PSearch2 = _interopRequireDefault(_PSearch);

var _PAccount = __webpack_require__(805);

var _PAccount2 = _interopRequireDefault(_PAccount);

var _PVideo = __webpack_require__(820);

var _PVideo2 = _interopRequireDefault(_PVideo);

var _PSettings = __webpack_require__(817);

var _PSettings2 = _interopRequireDefault(_PSettings);

var _PVideoCartoons = __webpack_require__(821);

var _PVideoCartoons2 = _interopRequireDefault(_PVideoCartoons);

var _PVideoFilms = __webpack_require__(822);

var _PVideoFilms2 = _interopRequireDefault(_PVideoFilms);

var _PVideoSeries = __webpack_require__(823);

var _PVideoSeries2 = _interopRequireDefault(_PVideoSeries);

var _PVideoShows = __webpack_require__(824);

var _PVideoShows2 = _interopRequireDefault(_PVideoShows);

var _PActorInfo = __webpack_require__(806);

var _PActorInfo2 = _interopRequireDefault(_PActorInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'main',
  props: ['page', 'query'],
  mixins: [_datetime2.default],
  components: {
    PTv: _PTv2.default,
    PHome: _PHome2.default,
    PLive: _PLive2.default,
    PLogin: _PLogin2.default,
    PTvColumn: _PTvColumn2.default,
    PGrid: _PGrid2.default,
    PFavorites: _PFavorites2.default,
    PSearch: _PSearch2.default,
    PAccount: _PAccount2.default,
    PVideo: _PVideo2.default,
    PSettings: _PSettings2.default,
    PVideoCartoons: _PVideoCartoons2.default,
    PVideoFilms: _PVideoFilms2.default,
    PVideoSeries: _PVideoSeries2.default,
    PVideoShows: _PVideoShows2.default,
    PActorInfo: _PActorInfo2.default
  },
  data: function data() {
    return {
      currentTag: { name: this.$lang.messages.buttons.all_channels, filter: null },
      currentVideoTag: { name: this.$lang.messages.buttons.all_genres, genres: [], id: 0 },
      currentVideoTagGenre: { name: this.$lang.messages.buttons.all_genres, id: 0 },
      previousPage: null,
      tagsCollapse: false,
      isShowSearchPage: false
    };
  },

  computed: {
    homePage: function homePage() {
      return this.$backend.support.featured ? 'home' : 'tv';
    },
    normalizedPage: function normalizedPage() {
      return !this.page ? this.homePage : this.page;
    },
    menu: function menu() {
      return [{
        id: 1,
        items: [{ page: 'home', name: this.$lang.messages.main_menu.main, icon: 'fa-home', show: this.$backend.support.featured }, { page: 'tv', name: this.$lang.messages.main_menu.tv_review, icon: 'fa-th', show: true }, { page: 'live', name: this.$lang.messages.main_menu.tv_live, icon: 'fa-th-list', show: true }, { page: 'tv-column', name: this.$lang.messages.main_menu.tv_guide, icon: 'fa-columns', show: true }, { page: 'video-films', name: this.$lang.messages.main_menu.films, icon: 'fa-film', show: this.$backend.support.vod }, { page: 'video-cartoons', name: this.$lang.messages.main_menu.cartoons, icon: 'fa-film', show: this.$backend.support.vod }, { page: 'video-series', name: this.$lang.messages.main_menu.series, icon: 'fa-film', show: this.$backend.support.vod }, { page: 'video-shows', name: this.$lang.messages.main_menu.shows, icon: 'fa-film', show: this.$backend.support.vod }, { page: 'favorites', name: this.$lang.messages.main_menu.favorite, icon: 'fa-bookmark', show: this.$backend.support.auth && this.isLogged }]
      }];
    },
    isLogged: function isLogged() {
      return this.$store.getters.getAuthorized;
    },
    countFavoriteChannels: function countFavoriteChannels() {
      return this.$store.getters.countFavoriteChannels;
    },
    filter: function filter() {
      return this.$store.state.filter;
    },
    filteredChannels: function filteredChannels() {
      return this.$store.state.filteredChannels;
    },
    filterVisible: function filterVisible() {
      var haveFilterPages = ['tv', 'live', 'tv-column', 'grid'];
      return haveFilterPages.includes(this.page);
    },
    categoryFilterVisible: function categoryFilterVisible() {
      var haveFilterPages = ['videos'];
      return haveFilterPages.includes(this.page);
    },
    genreFilterVisible: function genreFilterVisible() {
      var haveFilterPages = ['video-cartoons', 'video-films', 'video-series', 'video-shows'];
      return haveFilterPages.includes(this.page);
    }
  },
  asyncComputed: {
    tags: {
      get: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          var channels, tags, genres;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.$backend.content.getChannels();

                case 2:
                  channels = _context.sent;
                  tags = [];

                  tags.push({
                    name: this.$lang.messages.buttons.all_channels,
                    filter: null,
                    count: channels.length
                  });
                  if (this.countFavoriteChannels) {
                    tags.push({ name: this.$lang.messages.main_menu.favorite, filter: 'favorites', count: this.countFavoriteChannels });
                  }
                  _context.next = 8;
                  return this.$backend.categories.getChannelGenres();

                case 8:
                  genres = _context.sent;

                  genres.forEach(function (genre) {
                    var count = channels.filter(function (channel) {
                      return channel.genres.includes(genre.id);
                    }).length;
                    if (count) {
                      tags.push({
                        name: genre.name,
                        filter: {
                          genre_id: genre.id
                        },
                        count: count
                      });
                    }
                  });
                  return _context.abrupt('return', tags);

                case 11:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function get() {
          return _ref.apply(this, arguments);
        }

        return get;
      }(),
      watch: function watch() {
        return this.countFavoriteChannels;
      }
    },
    videoTags: {
      get: function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
          var _this = this;

          var videoTags;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  videoTags = [];
                  _context2.next = 3;
                  return this.$backend.categories.getVideo();

                case 3:
                  videoTags = _context2.sent;

                  videoTags.forEach(function (tag) {
                    tag.genres.unshift({
                      id: 0,
                      name: _this.$lang.messages.buttons.all_genres,
                      is_main: true
                    });
                    tag.genres = tag.genres.filter(function (genre) {
                      return genre.is_main === true;
                    });
                  });
                  this.currentVideoTag = videoTags[0];
                  return _context2.abrupt('return', videoTags);

                case 7:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function get() {
          return _ref2.apply(this, arguments);
        }

        return get;
      }()
    }
  },
  watch: {
    filter: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(value) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = this.$store;
                _context3.next = 3;
                return this.getChannelsByFilter(value);

              case 3:
                _context3.t1 = _context3.sent;

                _context3.t0.commit.call(_context3.t0, 'setFilteredChannels', _context3.t1);

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function filter(_x) {
        return _ref3.apply(this, arguments);
      }

      return filter;
    }(),
    filterVisible: function filterVisible(value) {
      if (value) {
        this.$store.commit('setSpecialChannels', []);
      }
    }
  },
  methods: {
    scrollToTop: function scrollToTop() {
      document.getElementsByClassName('app-content')[0].scrollTop = 0;
    },
    goToMain: function goToMain() {
      this.$router.push({ name: 'Main', params: { page: 'home' } });
    },
    personal: function personal() {
      this.$router.push({ name: 'Main', params: { page: 'account' } });
      this.isShowSearchPage = false;
    },
    login: function login() {
      this.$router.push({ name: 'Main', params: { page: 'login' } });
      this.isShowSearchPage = false;
    },
    toggleSearch: function toggleSearch() {
      this.isShowSearchPage = !this.isShowSearchPage;
    },
    openFilter: function openFilter() {
      this.tagsCollapse = !this.tagsCollapse;
    },
    selectTag: function selectTag(tag) {
      this.currentTag = tag;
      this.tagsCollapse = false;
      this.$store.commit('changeFilter', tag.filter);
      this.$router.push({ name: 'Main', params: { page: this.normalizedPage }, query: { tag: this.currentTag.filter.genre_id } });
    },
    resetGenre: function resetGenre() {
      if (this.normalizedPage !== 'video' && this.previousPage !== 'video' && this.normalizedPage !== this.previousPage) {
        this.currentVideoTagGenre = this.currentVideoTag.genres[0];
      }
      this.previousPage = this.normalizedPage;
    },
    selectVideoGenre: function selectVideoGenre(genre) {
      this.tagsCollapse = false;
      this.currentVideoTagGenre = genre;
      this.$router.push({ name: 'Main', params: { page: this.normalizedPage }, query: { tag: this.currentVideoTagGenre.id } });
    },
    getChannelsByFilter: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(filter) {
        var channels;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                channels = [];

                if (!(filter === 'favorites')) {
                  _context4.next = 5;
                  break;
                }

                channels = _lodash2.default.cloneDeep(this.$store.getters.favoriteChannels);
                _context4.next = 10;
                break;

              case 5:
                _context4.next = 7;
                return this.$backend.content.getChannels();

              case 7:
                channels = _context4.sent;

                if (filter !== null && filter.genre_id) {
                  channels = channels.filter(function (e) {
                    return e.genres.includes(filter.genre_id);
                  });
                }
                channels = channels.sort(function (a, b) {
                  if (a.priority === b.priority) {
                    return b.rank - a.rank;
                  }
                  return a.priority < b.priority ? -1 : 1;
                });

              case 10:
                return _context4.abrupt('return', channels.map(function (x) {
                  return x.channel_id;
                }));

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getChannelsByFilter(_x2) {
        return _ref4.apply(this, arguments);
      }

      return getChannelsByFilter;
    }()
  },
  mounted: function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var _this2 = this;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              this.$root.mainContent = this.$refs.mainContent;
              this.$root.$on('hideFilters', function () {
                _this2.tagsCollapse = false;
              });
              _context5.t0 = this.$store;
              _context5.next = 5;
              return this.getChannelsByFilter(this.filter);

            case 5:
              _context5.t1 = _context5.sent;

              _context5.t0.commit.call(_context5.t0, 'setFilteredChannels', _context5.t1);

            case 7:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function mounted() {
      return _ref5.apply(this, arguments);
    }

    return mounted;
  }(),
  activated: function activated() {
    _Metric2.default.getInstance().screenView('home');
  },
  created: function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
      var _this3 = this;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              this.$root.$on('closeSearch', function () {
                _this3.isShowSearchPage = false;
              });

            case 1:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function created() {
      return _ref6.apply(this, arguments);
    }

    return created;
  }(),
  updated: function updated() {
    if (this.videoTags) {
      switch (this.normalizedPage) {
        case 'video-cartoons':
          this.currentVideoTag = this.videoTags.find(function (tag) {
            return tag.id === 3;
          });
          break;
        case 'video-films':
          this.currentVideoTag = this.videoTags.find(function (tag) {
            return tag.id === 1;
          });
          break;
        case 'video-series':
          this.currentVideoTag = this.videoTags.find(function (tag) {
            return tag.id === 2;
          });
          break;
        case 'video-shows':
          this.currentVideoTag = this.videoTags.find(function (tag) {
            return tag.id === 4;
          });
          break;
        default:
          break;
      }
      this.resetGenre();
    }
  }
};

/***/ }),
/* 469 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _vueSlick = __webpack_require__(115);

var _vueSlick2 = _interopRequireDefault(_vueSlick);

var _EChannel = __webpack_require__(436);

var _EChannel2 = _interopRequireDefault(_EChannel);

var _utils = __webpack_require__(22);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'b-channels',
  props: ['title', 'channels', 'isStub', 'isHaveRedirect'],
  mixins: [_utils2.default],
  components: {
    EChannel: _EChannel2.default,
    Slick: _vueSlick2.default
  },
  data: function data() {
    return {
      time: null,
      slickOptions: {
        slidesToShow: 4,
        infinite: false
      }
    };
  },
  created: function created() {
    this.startTimeInterval();
  },
  activated: function activated() {
    this.startTimeInterval();
    this.reInit();
  },
  deactivated: function deactivated() {
    this.stopTimeInterval();
  },
  destroyed: function destroyed() {
    this.stopTimeInterval();
  },

  methods: {
    showAll: function showAll() {
      this.$router.push({ name: 'Main', params: { page: 'tv' } });
    },
    startTimeInterval: function startTimeInterval() {
      var _this = this;

      this.time = (0, _moment2.default)().unix();
      clearInterval(this.intervalId);
      this.intervalId = setInterval(function () {
        _this.time = (0, _moment2.default)().unix();
      }, 5000);
    },
    stopTimeInterval: function stopTimeInterval() {
      clearInterval(this.intervalId);
      this.intervalId = null;
    },
    next: function next() {
      this.$refs.slick.next();
    },
    prev: function prev() {
      this.$refs.slick.prev();
    },
    reInit: function reInit() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.$refs.slick.reSlick();
      });
    }
  }
};

/***/ }),
/* 470 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _WProgressBarLine = __webpack_require__(114);

var _WProgressBarLine2 = _interopRequireDefault(_WProgressBarLine);

var _imagePromise = __webpack_require__(308);

var _imagePromise2 = _interopRequireDefault(_imagePromise);

var _datetime = __webpack_require__(41);

var _datetime2 = _interopRequireDefault(_datetime);

var _frames = __webpack_require__(35);

var _frames2 = _interopRequireDefault(_frames);

var _images = __webpack_require__(42);

var _images2 = _interopRequireDefault(_images);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'b-guide-tvshow',
  props: ['tvshow', 'time', 'index', 'translateX', 'isArchive'],
  mixins: [_datetime2.default, _frames2.default, _images2.default],
  components: {
    WProgressBarLine: _WProgressBarLine2.default
  },
  computed: {
    offsetX: function offsetX() {
      var index = this.index + this.translateX;
      var offset = 13 + index * 13;
      if (index > 0) {
        offset += 26 * Math.min(index, 1);
      }
      return offset;
    },
    infoOpacity: function infoOpacity() {
      var opacity = 0;
      var index = Math.abs(this.index + this.translateX);
      if (index < 1) {
        opacity = 1 - index;
      }
      return opacity;
    },
    isCurrent: function isCurrent() {
      return this.index === 0;
    },
    isLive: function isLive() {
      return this.time >= this.tvshow.start && this.time < this.tvshow.stop;
    },
    isFuture: function isFuture() {
      return this.time < this.tvshow.start;
    },
    progress: function progress() {
      var l = this.tvshow.stop - this.tvshow.start;
      var p = (this.time - this.tvshow.start) / l;
      if (p < 0) {
        p = 0;
      }
      if (p > 1) {
        p = 1;
      }
      return p;
    },
    startTime: function startTime() {
      return this.getMoment(this.tvshow.start).format('HH:mm');
    },
    stopTime: function stopTime() {
      return this.getMoment(this.tvshow.stop).format('HH:mm');
    }
  },
  asyncComputed: {
    logo: function logo() {
      if (!this.tvshow) {
        return '';
      }
      return this.getChannelLogo(this.tvshow.channel_id);
    },
    frameUrl: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var url;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.tvshow) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', '');

              case 2:
                url = '';

                if (!this.isFuture) {
                  _context.next = 7;
                  break;
                }

                if (this.tvshow.cover) {
                  url = this.tvshow.cover;
                }
                _context.next = 16;
                break;

              case 7:
                if (!this.isLive) {
                  _context.next = 13;
                  break;
                }

                _context.next = 10;
                return this.getChannelFrame(this.tvshow.channel_id, this.time, 'crop', 288, 168);

              case 10:
                url = _context.sent;
                _context.next = 16;
                break;

              case 13:
                _context.next = 15;
                return this.getTvshowFrame(this.tvshow, 'crop', 288, 168);

              case 15:
                url = _context.sent;

              case 16:
                if (!(url !== '')) {
                  _context.next = 25;
                  break;
                }

                _context.prev = 17;
                _context.next = 20;
                return (0, _imagePromise2.default)(url);

              case 20:
                _context.next = 25;
                break;

              case 22:
                _context.prev = 22;
                _context.t0 = _context['catch'](17);

                url = '';

              case 25:
                return _context.abrupt('return', url);

              case 26:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[17, 22]]);
      }));

      function frameUrl() {
        return _ref.apply(this, arguments);
      }

      return frameUrl;
    }()
  },
  methods: {
    playTvShow: function playTvShow() {
      if (this.isArchive) {
        this.$router.push({ name: 'PlayerVideo', params: { type: 'tvshow', id: this.tvshow.tvshow_id } });
      }
    }
  }
};

/***/ }),
/* 471 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vueSlick = __webpack_require__(115);

var _vueSlick2 = _interopRequireDefault(_vueSlick);

var _EVideo = __webpack_require__(77);

var _EVideo2 = _interopRequireDefault(_EVideo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    EVideo: _EVideo2.default,
    Slick: _vueSlick2.default
  },
  name: 'b-videos',
  props: {
    title: String,
    items: Array,
    mode: {
      type: String,
      default: 'horizontal'
    },
    play: {
      type: Boolean,
      default: false
    },
    isStub: {
      type: Boolean,
      default: true
    },
    isHaveRedirect: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      slickOptions: {
        slidesToShow: 4,
        infinite: false
      }
    };
  },
  activated: function activated() {
    this.reInit();
  },
  mounted: function mounted() {
    this.reInit();
  },

  watch: {
    items: function items() {
      console.log('items changed');
      this.reInit();
    }
  },
  methods: {
    next: function next() {
      this.$refs.slick.next();
    },
    prev: function prev() {
      this.$refs.slick.prev();
    },
    reInit: function reInit() {
      var _this = this;

      this.$nextTick(function () {
        _this.$refs.slick.reSlick();
      });
    },
    showAll: function showAll() {
      if (this.title === 'Фильмы') {
        this.$router.push({ name: 'Main', params: { page: 'video-films' } });
      } else if (this.items[0].type === 'tvshow') {
        this.$router.push({ name: 'Main', params: { page: 'video-shows' } });
      } else {
        this.$router.push({ name: 'Main', params: { page: 'video-series' } });
      }
    }
  }
};

/***/ }),
/* 472 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _favorite = __webpack_require__(34);

var _favorite2 = _interopRequireDefault(_favorite);

var _frames = __webpack_require__(35);

var _frames2 = _interopRequireDefault(_frames);

var _images = __webpack_require__(42);

var _images2 = _interopRequireDefault(_images);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'e-actor-film',
  props: {
    type: {
      type: String,
      required: true,
      validator: function validator(value) {
        return value === 'video' || value === 'tvshow';
      }
    },
    id: {
      type: [String, Number],
      required: true
    },
    mode: {
      type: String,
      default: 'horizontal'
    },
    play: {
      type: Boolean,
      default: false
    }
  },
  mixins: [_favorite2.default, _frames2.default, _images2.default],
  data: function data() {
    return {
      name: '...',
      cover: ''
    };
  },
  created: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function created() {
      return _ref.apply(this, arguments);
    }

    return created;
  }(),

  computed: {
    isFavorite: function isFavorite() {
      return this.checkFavorite(this.id, this.type);
    },
    contentMode: function contentMode() {
      return 'archive';
    }
  },
  methods: {
    hoverHandler: function hoverHandler() {
      this.$root.$emit('focus', this.$el);
    },
    clickHandler: function clickHandler() {
      if (this.play) {
        this.$router.push({ name: 'PlayerVideo', params: { type: this.type, id: this.id } });
      } else {
        this.$router.push({
          name: 'Main',
          params: { page: 'video' },
          query: { type: this.type, id: this.id }
        });
      }
    }
  },
  i18n: false
};

/***/ }),
/* 473 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(97);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _WProgressBarLine = __webpack_require__(114);

var _WProgressBarLine2 = _interopRequireDefault(_WProgressBarLine);

var _EpgReader = __webpack_require__(78);

var _EpgReader2 = _interopRequireDefault(_EpgReader);

var _favorite = __webpack_require__(34);

var _favorite2 = _interopRequireDefault(_favorite);

var _frames = __webpack_require__(35);

var _frames2 = _interopRequireDefault(_frames);

var _images = __webpack_require__(42);

var _images2 = _interopRequireDefault(_images);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'e-channel',
  props: ['id', 'sleep', 'time'],
  mixins: [_favorite2.default, _frames2.default, _images2.default],
  components: {
    WProgressBarLine: _WProgressBarLine2.default
  },
  data: function data() {
    return {
      channel: null,
      tvshow: null,
      internalTime: null,
      roundTime: null
    };
  },

  computed: {
    channelName: function channelName() {
      return this.channel ? this.channel.name : '...';
    },
    tvshowTitle: function tvshowTitle() {
      return this.tvshow ? this.tvshow.title : '';
    },
    progress: function progress() {
      if (this.tvshow) {
        var total = this.tvshow.stop - this.tvshow.start;
        var onePercent = total / 100;
        var passed = this.internalTime - this.tvshow.start;
        return passed / onePercent;
      }
      return 0;
    },
    isFavorite: function isFavorite() {
      return this.checkFavorite(this.id, 'channel');
    }
  },
  asyncComputed: {
    logo: function logo() {
      return this.getChannelLogo(this.id);
    },
    frameUrl: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var url;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.sleep || !this.roundTime || this.channel && this.channel.age_rating === '18+')) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', '');

              case 2:
                _context.next = 4;
                return this.getChannelFrame(this.id, this.roundTime, 'crop', 256, 144);

              case 4:
                url = _context.sent;
                return _context.abrupt('return', this.loadImage(url));

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function frameUrl() {
        return _ref.apply(this, arguments);
      }

      return frameUrl;
    }()
  },
  watch: {
    time: function time(val) {
      if (!this.sleep) {
        this.internalTime = val;
      }
    },
    internalTime: function internalTime(val) {
      this.roundTime = Math.round(val / 60) * 60;
      this.update();
    },
    sleep: function sleep(val) {
      if (!val) {
        this.internalTime = this.time;
        this.update();
      }
    }
  },
  methods: {
    toggleFavorite: function toggleFavorite() {
      if (!this.isFavorite) {
        this.addToFavorite(this.id, 'channel');
      } else {
        this.removeFromFavorite(this.id, 'channel');
      }
    },
    openChannel: function openChannel() {
      this.$router.push({ name: 'PlayerLive', params: { load: true, channelId: this.id } });
      this.$root.$emit('closeSearch');
    },
    focusHandler: function focusHandler() {
      this.$emit('focusChannel', this.id);
    },
    update: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var _ref3, _ref4;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.channel) {
                  _context2.next = 4;
                  break;
                }

                _context2.next = 3;
                return this.$backend.content.getChannel(this.id);

              case 3:
                this.channel = _context2.sent;

              case 4:
                if (!(this.internalTime && !this.runned && (!this.tvshow || this.tvshow.stop < this.internalTime))) {
                  _context2.next = 18;
                  break;
                }

                this.runned = true;
                _context2.prev = 6;
                _context2.next = 9;
                return _EpgReader2.default.getInstance().getNextTvshows(this.id, this.internalTime, 1);

              case 9:
                _ref3 = _context2.sent;
                _ref4 = (0, _slicedToArray3.default)(_ref3, 1);
                this.tvshow = _ref4[0];
                _context2.next = 17;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2['catch'](6);

                this.$nm.showError(_context2.t0.message, 5000);

              case 17:
                this.runned = false;

              case 18:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[6, 14]]);
      }));

      function update() {
        return _ref2.apply(this, arguments);
      }

      return update;
    }()
  }
};

/***/ }),
/* 474 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _favorite = __webpack_require__(34);

var _favorite2 = _interopRequireDefault(_favorite);

var _frames = __webpack_require__(35);

var _frames2 = _interopRequireDefault(_frames);

var _images = __webpack_require__(42);

var _images2 = _interopRequireDefault(_images);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'e-channel',
  props: ['id', 'num', 'active'],
  mixins: [_favorite2.default, _frames2.default, _images2.default],
  data: function data() {
    return {
      name: null,
      logo: null
    };
  },
  created: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var channel;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.$backend.content.getChannel(this.id);

            case 2:
              channel = _context.sent;

              this.name = channel.name;
              _context.next = 6;
              return this.getChannelLogo(this.id);

            case 6:
              this.logo = _context.sent;

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function created() {
      return _ref.apply(this, arguments);
    }

    return created;
  }(),

  computed: {
    isFavorite: function isFavorite() {
      return this.checkFavorite(this.id, 'channel');
    }
  },
  methods: {
    toggleFavorite: function toggleFavorite() {
      if (this.isFavorite) {
        this.removeFromFavorite(this.id, 'channel');
      } else {
        this.addToFavorite(this.id, 'channel');
      }
    }
  }
};

/***/ }),
/* 475 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _datetime = __webpack_require__(41);

var _datetime2 = _interopRequireDefault(_datetime);

var _favorite = __webpack_require__(34);

var _favorite2 = _interopRequireDefault(_favorite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'e-column-tvshow',
  props: ['tvshow', 'id', 'active', 'time'],
  mixins: [_datetime2.default, _favorite2.default],
  data: function data() {
    return {
      startTime: '...',
      title: '...',
      start: 0,
      stop: 0,
      dvr: 0
    };
  },
  created: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var tvshow;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = this.tvshow;

              if (_context.t0) {
                _context.next = 5;
                break;
              }

              _context.next = 4;
              return this.$backend.content.getTvshow(this.id);

            case 4:
              _context.t0 = _context.sent;

            case 5:
              tvshow = _context.t0;
              _context.next = 8;
              return this.$backend.content.getChannel(tvshow.channel_id);

            case 8:
              this.channel = _context.sent;

              this.dvr = this.channel.dvr_sec;
              this.startTime = this.getMoment(tvshow.start).format('HH:mm');
              this.start = tvshow.start;
              this.stop = tvshow.stop;
              this.title = tvshow.title;

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function created() {
      return _ref.apply(this, arguments);
    }

    return created;
  }(),

  computed: {
    dvrStart: function dvrStart() {
      return this.time - this.dvr;
    },
    isArchive: function isArchive() {
      return this.start > this.dvrStart && this.stop < this.time;
    },
    isFuture: function isFuture() {
      return this.start > this.time;
    },
    isLive: function isLive() {
      return this.time >= this.start && this.time < this.stop;
    },
    progress: function progress() {
      if (!this.start) {
        return 0;
      }
      var l = this.stop - this.start;
      var p = (this.time - this.start) / l;
      p = Math.max(0, Math.min(1, p));
      return p * 100;
    },
    mode: function mode() {
      if (this.isLive) return 'live';
      if (this.isArchive) return 'archive';
      if (this.isFuture) return 'future';
      return 'past';
    },
    isFavorite: function isFavorite() {
      return this.checkFavorite(this.id, 'tvshow');
    }
  },
  methods: {
    toggleFavorite: function toggleFavorite() {
      if (this.isFavorite) {
        this.removeFromFavorite(this.id, 'tvshow');
      } else {
        this.addToFavorite(this.id, 'tvshow');
      }
    },
    clickHandler: function clickHandler() {
      if (this.isLive) {
        this.$router.push({ name: 'PlayerLive', params: { load: false, channelId: this.channel.channel_id } });
      } else {
        this.$router.push({ name: 'Main', params: { page: 'video' }, query: { type: 'tvshow', id: this.id } });
      }
    }
  },
  i18n: false
};

/***/ }),
/* 476 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(97);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _EpgReader = __webpack_require__(78);

var _EpgReader2 = _interopRequireDefault(_EpgReader);

var _WProgressBarLine = __webpack_require__(114);

var _WProgressBarLine2 = _interopRequireDefault(_WProgressBarLine);

var _frames = __webpack_require__(35);

var _frames2 = _interopRequireDefault(_frames);

var _images = __webpack_require__(42);

var _images2 = _interopRequireDefault(_images);

var _favorite = __webpack_require__(34);

var _favorite2 = _interopRequireDefault(_favorite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'e-live-channel',
  props: ['id', 'sleep', 'time'],
  mixins: [_frames2.default, _images2.default, _favorite2.default],
  components: {
    WProgressBarLine: _WProgressBarLine2.default
  },
  data: function data() {
    return {
      channel: null,
      tvshow: null,
      nextTvshow: null,
      roundTime: null,
      internalTime: null
    };
  },

  watch: {
    time: function time(val) {
      if (!this.sleep) {
        this.internalTime = val;
      }
    },
    internalTime: function internalTime(val) {
      this.roundTime = Math.round(val / 60) * 60;
      this.update();
    },
    sleep: function sleep(val) {
      if (!val) {
        this.internalTime = this.time;
        this.update();
      }
    }
  },
  computed: {
    ageRating: function ageRating() {
      return this.channel ? this.channel.age_rating : '';
    },
    isChannelFavorite: function isChannelFavorite() {
      return this.checkFavorite(this.id, 'channel');
    },
    isTvshowFavorite: function isTvshowFavorite() {
      if (this.tvshow) {
        return this.checkFavorite(this.tvshow.tvshow_id, 'tvshow');
      }
      return false;
    },
    isNextTvshowFavorite: function isNextTvshowFavorite() {
      if (this.nextTvshow) {
        return this.checkFavorite(this.nextTvshow.tvshow_id, 'tvshow');
      }
      return false;
    },
    progress: function progress() {
      if (!this.tvshow) {
        return 0;
      }
      var duration = this.tvshow.stop - this.tvshow.start;
      var passed = this.internalTime - this.tvshow.start;
      return Math.max(0, Math.min(100, passed / duration * 100));
    },
    nextTvshowLeftTime: function nextTvshowLeftTime() {
      var time = _moment2.default.unix(this.internalTime).from(_moment2.default.unix(this.nextTvshow.start), true);
      return time;
    }
  },
  asyncComputed: {
    logo: function logo() {
      return this.getChannelLogo(this.id);
    },
    frameUrl: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var url;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.sleep || !this.roundTime || this.channel && this.channel.age_rating === '18+')) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', '');

              case 2:
                _context.next = 4;
                return this.getChannelFrame(this.id, this.roundTime, 'crop', 256, 144);

              case 4:
                url = _context.sent;
                return _context.abrupt('return', this.loadImage(url));

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function frameUrl() {
        return _ref.apply(this, arguments);
      }

      return frameUrl;
    }()
  },
  created: function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.$backend.content.getChannel(this.id);

            case 2:
              this.channel = _context2.sent;

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function created() {
      return _ref2.apply(this, arguments);
    }

    return created;
  }(),

  methods: {
    toggleChannelFavorite: function toggleChannelFavorite() {
      if (!this.isChannelFavorite) {
        this.addToFavorite(this.id, 'channel');
      } else {
        this.removeFromFavorite(this.id, 'channel');
      }
    },
    toggleTvshowFavorite: function toggleTvshowFavorite() {
      if (!this.isTvshowFavorite) {
        this.addToFavorite(this.tvshow.tvshow_id, 'tvshow');
      } else {
        this.removeFromFavorite(this.tvshow.tvshow_id, 'tvshow');
      }
    },
    toggleNextTvshowFavorite: function toggleNextTvshowFavorite() {
      if (!this.isNextTvshowFavorite) {
        this.addToFavorite(this.nextTvshow.tvshow_id, 'tvshow');
      } else {
        this.removeFromFavorite(this.nextTvshow.tvshow_id, 'tvshow');
      }
    },
    update: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var _ref4, _ref5;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log('update');

                if (this.channel) {
                  _context3.next = 5;
                  break;
                }

                _context3.next = 4;
                return this.$backend.content.getChannel(this.id);

              case 4:
                this.channel = _context3.sent;

              case 5:
                if (!(this.internalTime && !this.runned && (!this.tvshow || this.tvshow.stop < this.internalTime))) {
                  _context3.next = 20;
                  break;
                }

                this.runned = true;
                _context3.prev = 7;
                _context3.next = 10;
                return _EpgReader2.default.getInstance().getNextTvshows(this.id, this.internalTime, 2);

              case 10:
                _ref4 = _context3.sent;
                _ref5 = (0, _slicedToArray3.default)(_ref4, 2);
                this.tvshow = _ref5[0];
                this.nextTvshow = _ref5[1];
                _context3.next = 19;
                break;

              case 16:
                _context3.prev = 16;
                _context3.t0 = _context3['catch'](7);

                this.$nm.showError(_context3.t0.message, 5000);

              case 19:
                this.runned = false;

              case 20:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[7, 16]]);
      }));

      function update() {
        return _ref3.apply(this, arguments);
      }

      return update;
    }(),
    openChannel: function openChannel(id) {
      this.$router.push({ name: 'PlayerLive', params: { load: true, channelId: id } });
    }
  }
};

/***/ }),
/* 477 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _favorite = __webpack_require__(34);

var _favorite2 = _interopRequireDefault(_favorite);

var _frames = __webpack_require__(35);

var _frames2 = _interopRequireDefault(_frames);

var _images = __webpack_require__(42);

var _images2 = _interopRequireDefault(_images);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'e-video',
  props: {
    type: {
      type: String,
      required: true,
      validator: function validator(value) {
        return value === 'video' || value === 'tvshow';
      }
    },
    id: {
      type: [String, Number],
      required: true
    },
    mode: {
      type: String,
      default: 'horizontal'
    },
    play: {
      type: Boolean,
      default: false
    }
  },
  mixins: [_favorite2.default, _frames2.default, _images2.default],
  data: function data() {
    return {
      name: '...',
      cover: ''
    };
  },
  created: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var tvshow, videoId, video, cover;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tvshow = void 0;

              if (!(this.type === 'tvshow')) {
                _context.next = 5;
                break;
              }

              _context.next = 4;
              return this.$backend.content.getTvshow(this.id);

            case 4:
              tvshow = _context.sent;

            case 5:
              videoId = this.type === 'video' ? this.id : tvshow.video_id;
              _context.next = 8;
              return this.$backend.content.getVideo(videoId);

            case 8:
              video = _context.sent;
              cover = video.cover;

              if (!((!cover || !cover.length) && tvshow)) {
                _context.next = 14;
                break;
              }

              _context.next = 13;
              return this.getTvshowFrame(tvshow, 'crop', 256, 144);

            case 13:
              cover = _context.sent;

            case 14:
              this.cover = cover;
              if (tvshow) {
                this.name = tvshow.title;
              } else {
                this.name = video.name;
              }

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function created() {
      return _ref.apply(this, arguments);
    }

    return created;
  }(),

  computed: {
    isFavorite: function isFavorite() {
      return this.checkFavorite(this.id, this.type);
    },
    contentMode: function contentMode() {
      return 'archive';
    }
  },
  methods: {
    toggleFavorite: function toggleFavorite() {
      if (this.isFavorite) {
        this.removeFromFavorite(this.id, this.type);
      } else {
        this.addToFavorite(this.id, this.type);
      }
    },
    clickHandler: function clickHandler() {
      if (this.play) {
        this.$router.push({ name: 'PlayerVideo', params: { type: this.type, id: this.id } });
      } else {
        this.$router.push({
          name: 'Main',
          params: { page: 'video' },
          query: { type: this.type, id: this.id }
        });
      }
      this.$root.$emit('closeSearch');
    }
  },
  i18n: false
};

/***/ }),
/* 478 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

var _PSubscriptions = __webpack_require__(827);

var _PSubscriptions2 = _interopRequireDefault(_PSubscriptions);

var _PPurchases = __webpack_require__(826);

var _PPurchases2 = _interopRequireDefault(_PPurchases);

var _PProfile = __webpack_require__(825);

var _PProfile2 = _interopRequireDefault(_PProfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    PProfile: _PProfile2.default,
    PPurchases: _PPurchases2.default,
    PSubscriptions: _PSubscriptions2.default
  },
  name: 'p-account',
  props: ['tab'],
  data: function data() {
    return {
      tabs: [{ name: this.$lang.messages.account.subscriptions, id: 'subscriptions' }, { name: this.$lang.messages.account.purchases, id: 'purchases' }, { name: this.$lang.messages.account.profile, id: 'profile' }]
    };
  },

  computed: {
    activeTab: function activeTab() {
      return this.tab ? this.tab : 'subscriptions';
    }
  },
  watch: {
    tab: function tab() {
      this.$root.$emit('focus', this.$refs.tab, true);
    }
  },
  created: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.$backend.account.getInfo();

            case 2:
              this.userInfo = _context.sent;

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function created() {
      return _ref.apply(this, arguments);
    }

    return created;
  }(),
  mounted: function mounted() {
    _Metric2.default.getInstance().screenView('account');
    this.$root.$emit('focus', this.$el);
  },

  methods: {
    gotoTab: function gotoTab(tab) {
      this.$router.push({
        name: 'Main',
        params: { page: 'account' },
        query: { tab: tab }
      });
    },
    logout: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var title, isValid;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                title = this.$lang.messages.parentCtrl.action;
                _context2.next = 3;
                return this.checkPin(title);

              case 3:
                isValid = _context2.sent;

                if (isValid) {
                  if (!this.$crazyMonkey.enabled) {
                    this.$backend.account.logout();
                    this.$store.commit('authorized', false);
                    this.$router.push({ name: 'Main', params: { page: 'home' } });
                    this.$nm.showMessage(this.$lang.messages.account.afterLogout, 5000);
                    this.$backend.clear();
                  }
                }

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function logout() {
        return _ref2.apply(this, arguments);
      }

      return logout;
    }()
  }
};

/***/ }),
/* 479 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _EActorFilm = __webpack_require__(801);

var _EActorFilm2 = _interopRequireDefault(_EActorFilm);

var _EVideo = __webpack_require__(77);

var _EVideo2 = _interopRequireDefault(_EVideo);

var _utils = __webpack_require__(22);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'p-actor-info',
  mixins: [_utils2.default],
  props: ['id'],
  components: {
    EActorFilm: _EActorFilm2.default,
    EVideo: _EVideo2.default
  },
  data: function data() {
    return {
      featured: []
    };
  },
  created: function created() {
    this.loadFeatured();
  },
  deactivated: function deactivated() {},
  destroyed: function destroyed() {},
  mounted: function mounted() {
    this.$root.$emit('focus', this.$el);
  },

  computed: {},
  methods: {
    loadFeatured: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var featured, i, section;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.$backend.featured.getIndex();

              case 2:
                featured = _context.sent;

                for (i = 0; i < featured.length; i += 1) {
                  section = featured[i];

                  section.mode = section.type === 'video' ? 'vertical' : 'horizontal';
                  section.items = this.arrayToItems(section.videos);
                }
                this.featured = featured;

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadFeatured() {
        return _ref.apply(this, arguments);
      }

      return loadFeatured;
    }()
  }
};

/***/ }),
/* 480 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'p-context-menu',
  props: ['visible', 'list'],
  data: function data() {
    return {};
  },

  watch: {
    visible: function visible() {
      var _this = this;

      if (this.visible === true) {
        setTimeout(function () {
          _this.$emit('focusMe', _this.$el);
        }, 0);
      }
    }
  },
  methods: {
    startFunction: function startFunction(id) {
      this.$cm.callFunc(id);
    },
    closeContextMenu: function closeContextMenu() {
      this.$cm.close();
    },
    focusHandler: function focusHandler(event) {
      this.$emit('focus', event);
    },
    onFocus: function onFocus(el) {
      this.$emit('focusMe', el);
    }
  }
};

/***/ }),
/* 481 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BChannels = __webpack_require__(167);

var _BChannels2 = _interopRequireDefault(_BChannels);

var _BVideos = __webpack_require__(113);

var _BVideos2 = _interopRequireDefault(_BVideos);

var _WPlaceholder = __webpack_require__(33);

var _WPlaceholder2 = _interopRequireDefault(_WPlaceholder);

var _WButton = __webpack_require__(59);

var _WButton2 = _interopRequireDefault(_WButton);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

var _utils = __webpack_require__(22);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'p-favorites',
  mixins: [_utils2.default],
  components: {
    BChannels: _BChannels2.default,
    BVideos: _BVideos2.default,
    WPlaceholder: _WPlaceholder2.default,
    WButton: _WButton2.default
  },
  data: function data() {
    return {
      showPlaceholder: false
    };
  },
  activated: function activated() {
    var _this = this;

    _Metric2.default.getInstance().screenView('favorites');
    setTimeout(function () {
      _this.$root.$emit('focus', _this.$el);
    }, 0);
    this.$store.commit('setSpecialChannels', this.channels);
  },

  computed: {
    hasContent: function hasContent() {
      return !!(this.channels.length + this.videos.length + this.tvshows.length);
    },
    channels: function channels() {
      var channels = this.$store.getters.favoriteChannels || [];
      return channels.map(function (x) {
        return x.channel_id;
      });
    },
    tvshows: function tvshows() {
      var tvshows = this.$store.getters.favoriteTvshows || [];
      return this.arrayToItems(tvshows);
    },
    videos: function videos() {
      var videos = this.$store.getters.favoriteVideos || [];
      return this.arrayToItems(videos);
    }
  },
  watch: {
    channels: function channels() {
      this.$store.commit('setSpecialChannels', this.channels);
      this.$root.$emit('focus', this.$el, true);
    },
    tvshows: function tvshows() {
      this.$store.commit('setSpecialChannels', this.channels);
      this.$root.$emit('focus', this.$el, true);
    },
    videos: function videos() {
      this.$store.commit('setSpecialChannels', this.channels);
      this.$root.$emit('focus', this.$el, true);
    }
  },
  methods: {
    goMain: function goMain() {
      this.$router.push({ name: 'Main', params: { page: 'home' } });
    }
  }
};

/***/ }),
/* 482 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _Epg = __webpack_require__(62);

var _Epg2 = _interopRequireDefault(_Epg);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var epg = _Epg2.default.getInstance();

exports.default = {
  name: 'p-grid',
  props: [],
  data: function data() {
    return {
      channels: [],
      channelsForShow: [],
      channelRange: 10,
      timeScale: {
        scale: [],
        left: 0
      },
      time: 0,
      timeShift: 6,
      curDate: {
        time: Math.round(new Date().getTime() / 1000, 0),
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds()
      },
      timelinePosition: 0,
      cursor: {
        init: false,
        id: 0,
        tvshowid: 0,
        start: 0,
        stop: 0,
        posX: 0,
        row: 0,
        height: 3
      },
      translate: {
        x: 0,
        y: 0
      }
    };
  },

  computed: {},
  watch: {
    time: function time(value) {
      if (value > 0) {
        this.moveTimeLine(value);
      }
    }
  },
  methods: {
    focusHandler: function focusHandler(event) {
      this.$emit('focus', event);
    },
    moveTimeLine: function moveTimeLine() {
      var date = new Date();
      var hours = date.getHours();
      var minutes = date.getMinutes() * 60;
      var seconds = date.getSeconds();
      this.timelinePosition = ((hours - this.curDate.hours) * 3600 + minutes + seconds) * 0.005;
    },
    getChannelList: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var _this = this;

        var channelList;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.$backend.content.getChannels();

              case 2:
                channelList = _context.sent;

                channelList.sort(function (a, b) {
                  return a.channel_id - b.channel_id;
                });
                channelList.forEach(function (elem, index) {
                  var a = 'http://persik.by/images/channels/logos/';
                  var b = elem.channel_id;
                  var c = '.png';
                  var picture = a.concat(b, c);
                  _this.channels.push({ id: parseInt(elem.channel_id, 10),
                    num: index + 1,
                    name: elem.name,
                    logo: picture,
                    tvshows: []
                  });
                  if (index < _this.channelRange) {
                    _this.channelsForShow.push({ id: elem.channel_id,
                      num: index + 1,
                      name: elem.name,
                      logo: picture,
                      tvshows: []
                    });
                  }
                });
                this.getTvShowsList();

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getChannelList() {
        return _ref.apply(this, arguments);
      }

      return getChannelList;
    }(),
    getTvShowsList: function getTvShowsList() {
      var _this2 = this;

      var hours = this.curDate.time - this.curDate.minutes * 60;
      var start = hours - this.timeShift * 3600;
      var stop = hours + this.timeShift * 3600;
      this.channelsForShow.forEach(function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(channel, index) {
          var tvshows;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return epg.getTvshowsRange(channel.id, start, stop);

                case 2:
                  tvshows = _context2.sent;

                  _this2.channelsForShow[index].tvshows = tvshows;

                case 4:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function (_x, _x2) {
          return _ref2.apply(this, arguments);
        };
      }());
    },
    initCursor: function initCursor() {
      var _this3 = this;

      var date = Math.round(new Date().getTime() / 1000, 0);
      this.channelsForShow[0].tvshows.forEach(function (tvshow, index) {
        if (date > tvshow.start && date < tvshow.stop) {
          var d = Math.round((parseInt(tvshow.stop, 10) - parseInt(tvshow.start, 10)) / 2, 0);
          var tvshowPosX = parseInt(tvshow.start, 10) + d;
          _this3.cursor = {
            init: true,
            id: index,
            start: parseInt(tvshow.start, 10),
            stop: parseInt(tvshow.stop, 10),
            posX: tvshowPosX,
            row: 0,
            tvshowid: parseInt(tvshow.tvshow_id, 10),
            height: _this3.cursor.height,
            title: tvshow.title
          };
        }
      });
    },
    checkCursor: function checkCursor(tvshowId) {
      if (parseInt(tvshowId, 10) === this.cursor.tvshowid) {
        return true;
      }
      return false;
    },
    checkChannel: function checkChannel(channel) {
      if (channel.num - 1 === this.cursor.row) {
        return true;
      }
      return false;
    },
    checkTimeLineHover: function checkTimeLineHover(tvshow) {
      var width = (tvshow.stop - tvshow.start) * 0.005;
      var left = (tvshow.start - (this.curDate.time - this.curDate.minutes * 60 - this.curDate.seconds)) * 0.005;
      if (this.timelinePosition > left && this.timelinePosition < left + width) {
        return true;
      }
      return false;
    },
    initTimeScale: function initTimeScale() {
      for (var i = this.curDate.hours - 4; i < this.curDate.hours + 5; i += 1) {
        this.timeScale.scale.push(i);
      }
      this.timeScale.left = -54;
    },
    horizontalMoving: function horizontalMoving(index) {
      var tvshow = this.channelsForShow[this.cursor.row].tvshows[index];
      if (tvshow !== undefined) {
        var d = Math.round((parseInt(tvshow.stop, 10) - parseInt(tvshow.start, 10)) / 2, 0);
        var tvshowPosX = parseInt(tvshow.start, 10) + d;
        this.cursor = {
          init: true,
          id: index,
          start: parseInt(tvshow.start, 10),
          stop: parseInt(tvshow.stop, 10),
          posX: tvshowPosX,
          row: this.cursor.row,
          tvshowid: parseInt(tvshow.tvshow_id, 10),
          height: this.cursor.height,
          title: tvshow.title
        };
        this.moveChannelsGrid('horizontal');
      }
    },
    verticalMoving: function verticalMoving(row) {
      var channel = this.channelsForShow[row];
      var result = false;
      if (channel !== undefined) {
        for (var i = 0; i < channel.tvshows.length; i += 1) {
          var tvshow = channel.tvshows[i];
          if (tvshow.start <= this.cursor.posX && tvshow.stop >= this.cursor.posX) {
            this.cursor = {
              init: true,
              id: i,
              start: parseInt(tvshow.start, 10),
              stop: parseInt(tvshow.stop, 10),
              posX: this.cursor.posX,
              row: row,
              tvshowid: parseInt(tvshow.tvshow_id, 10),
              height: this.cursor.height,
              title: tvshow.title
            };
            i = channel.tvshows.length;
            result = true;
          }
        }
        this.moveChannelsGrid('vertical');
      }
      return result;
    },
    getDomPosition: function getDomPosition(tvshow) {
      var width = (tvshow.stop - tvshow.start) * 0.005;
      var left = (tvshow.start - (this.curDate.time - this.curDate.minutes * 60 - this.curDate.seconds)) * 0.005;
      return {
        left: left + 'rem',
        width: width + 'rem'
      };
    },
    addRow: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var newRowIndex, hours, start, stop, tvshows;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                newRowIndex = this.channelsForShow.length;

                this.channelsForShow.push(this.channels[newRowIndex]);
                hours = this.curDate.time - this.curDate.minutes * 60;
                start = hours - this.timeShift * 3600;
                stop = hours + this.timeShift * 3600;
                _context3.next = 7;
                return epg.getTvshowsRange(this.channels[newRowIndex].id, start, stop);

              case 7:
                tvshows = _context3.sent;

                this.channelsForShow[newRowIndex].tvshows = tvshows;
                if (this.cursor.row >= this.channelRange) {
                  this.channelsForShow[this.cursor.row - this.channelRange].tvshows = [];
                }

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addRow() {
        return _ref3.apply(this, arguments);
      }

      return addRow;
    }(),
    deleteRow: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var indx, hours, start, stop, tvshows;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.cursor.row >= this.channelRange - 1)) {
                  _context4.next = 11;
                  break;
                }

                indx = this.cursor.row - (this.channelRange - 1);

                this.channelsForShow[indx] = this.channels[indx];
                hours = this.curDate.time - this.curDate.minutes * 60;
                start = hours - this.timeShift * 3600;
                stop = hours + this.timeShift * 3600;
                _context4.next = 8;
                return epg.getTvshowsRange(this.channels[indx].id, start, stop);

              case 8:
                tvshows = _context4.sent;

                this.channelsForShow[indx].tvshows = tvshows;
                this.channelsForShow.length -= 1;

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function deleteRow() {
        return _ref4.apply(this, arguments);
      }

      return deleteRow;
    }(),
    loadPartNext: function loadPartNext() {
      var _this4 = this;

      this.channelsForShow.forEach(function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(channel, index) {
          var tvshows, lastTvShow, start, stop, nextTvShows;
          return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  tvshows = channel.tvshows;
                  lastTvShow = tvshows[tvshows.length - 1];
                  start = parseInt(lastTvShow.stop, 10);
                  stop = start + _this4.timeShift * 3600;
                  _context5.next = 6;
                  return epg.getTvshowsRange(channel.id, start, stop);

                case 6:
                  nextTvShows = _context5.sent;

                  _this4.channelsForShow[index].tvshows = _this4.channelsForShow[index].tvshows.concat(nextTvShows);

                case 8:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, _this4);
        }));

        return function (_x3, _x4) {
          return _ref5.apply(this, arguments);
        };
      }());
    },
    loadPartPrev: function loadPartPrev() {
      var _this5 = this;

      this.channelsForShow.forEach(function () {
        var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(channel, index) {
          var tvshows, firstTvShow, stop, start, nextTvShows;
          return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  tvshows = channel.tvshows;
                  firstTvShow = tvshows[0];
                  stop = parseInt(firstTvShow.start, 10);
                  start = stop - _this5.timeShift * 3600;
                  _context6.next = 6;
                  return epg.getTvshowsRange(channel.id, start, stop);

                case 6:
                  nextTvShows = _context6.sent;

                  if (_this5.cursor.row === index) {
                    _this5.cursor.id += nextTvShows.length;
                  }
                  _this5.channelsForShow[index].tvshows = nextTvShows.concat(_this5.channelsForShow[index].tvshows);

                case 9:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, _this5);
        }));

        return function (_x5, _x6) {
          return _ref6.apply(this, arguments);
        };
      }());
    },
    refreshTimeScale: function refreshTimeScale(vector) {
      var scale = this.timeScale.scale;
      switch (vector) {
        case 'left':
          {
            if (scale[0] > 0) {
              scale.unshift(scale[0] - 1);
            } else {
              scale.unshift(23);
            }
            scale.length -= 1;
            this.timeScale.left -= 18;
            break;
          }
        case 'right':
          {
            if (scale[scale.length - 1] < 23) {
              scale[scale.length] = scale[scale.length - 1] + 1;
            } else {
              scale[scale.length] = 0;
            }
            this.timeScale.scale.shift();
            this.timeScale.left += 18;
            break;
          }
        default:
          {
            break;
          }
      }
    },
    moveChannelsGrid: function moveChannelsGrid(vector) {
      switch (vector) {
        case 'vertical':
          {
            var step = 3;
            if (this.cursor.row - step > 0) {
              if (this.cursor.height * this.cursor.row + this.translate.y > this.cursor.height * step) {
                this.translate.y -= step * this.cursor.height;
              }
              if (this.cursor.height * this.cursor.row + this.translate.y < this.cursor.height * step) {
                this.translate.y += step * this.cursor.height;
              }
            }
            break;
          }
        case 'horizontal':
          {
            var startTime = this.curDate.time - this.curDate.minutes * 60;
            var delta = (this.cursor.posX - startTime - 4) * 0.005 + this.translate.x;
            if (delta < 5) {
              this.translate.x += (this.cursor.stop - this.cursor.start) * 0.005 + 5;
              this.loadPartPrev();
            }
            if (delta > 40) {
              this.translate.x -= (this.cursor.stop - this.cursor.start) * 0.005 + 5;
              this.loadPartNext();
            }
            break;
          }
        default:
          {
            break;
          }
      }
    }
  },
  mounted: function mounted() {
    var _this6 = this;

    _Metric2.default.getInstance().screenView('tv-grid');
    this.$emit('focusMe', this.$el);
    this.getChannelList();
    this.initTimeScale();
    setInterval(function () {
      _this6.time = new Date().getSeconds();
    }, 4000);
  }
};

/***/ }),
/* 483 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _BChannels = __webpack_require__(167);

var _BChannels2 = _interopRequireDefault(_BChannels);

var _vueSlick = __webpack_require__(115);

var _vueSlick2 = _interopRequireDefault(_vueSlick);

var _BVideos = __webpack_require__(113);

var _BVideos2 = _interopRequireDefault(_BVideos);

var _WPlaceholder = __webpack_require__(33);

var _WPlaceholder2 = _interopRequireDefault(_WPlaceholder);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

var _utils = __webpack_require__(22);

var _utils2 = _interopRequireDefault(_utils);

var _favorite = __webpack_require__(34);

var _favorite2 = _interopRequireDefault(_favorite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UPDATE_INTERVAL = 3600;

exports.default = {
  name: 'p-home',
  mixins: [_utils2.default, _favorite2.default],
  components: {
    BChannels: _BChannels2.default,
    BVideos: _BVideos2.default,
    WPlaceholder: _WPlaceholder2.default,
    Slick: _vueSlick2.default
  },
  data: function data() {
    return {
      channels: [],
      featured: [],
      banners: [],
      showPlaceholder: true,
      lastUpdate: 0,
      bannerSlickOptions: {
        slidesToShow: 1,
        infinite: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000
      }
    };
  },

  computed: {
    connected: function connected() {
      return this.$store.getters.getConnectionStatus;
    },
    wrapper: function wrapper() {
      return document.getElementsByClassName('app-content')[0];
    },
    authorized: function authorized() {
      return this.$store.getters.getAuthorized;
    }
  },
  watch: {
    channels: function channels() {
      this.$store.commit('setSpecialChannels', this.channels);
    }
  },
  activated: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _Metric2.default.getInstance().screenView('home');
              this.updateTimer = setInterval(this.lazyUpdate.bind(this), UPDATE_INTERVAL * 1000);
              this.lazyUpdate();
              this.$store.commit('setSpecialChannels', this.channels);
              this.reInit();
              _context.next = 7;
              return this.$backend.content.getBanners();

            case 7:
              this.banners = _context.sent;

              this.reInit();

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function activated() {
      return _ref.apply(this, arguments);
    }

    return activated;
  }(),
  deactivated: function deactivated() {
    clearInterval(this.updateTimer);
  },

  methods: {
    isFavorite: function isFavorite(id, content) {
      return this.checkFavorite(id, content);
    },
    bannerRedirect: function bannerRedirect(type, id, url) {
      switch (type) {
        case 'video':
          this.$router.push({
            name: 'Main',
            params: { page: 'video' },
            query: { type: type, id: id, utm_source: 'newpersik' } });
          break;
        case 'channel':
          this.$router.push({
            name: 'PlayerLive',
            params: { load: true, channelId: id }
          });
          break;
        case 'site':
          window.location = url + '?utm_source=newpersik';
          break;
        default:
          break;
      }
    },
    bannerToFavorite: function bannerToFavorite(id, content) {
      if (!this.isFavorite(id, content)) {
        this.addToFavorite(id, content);
      } else {
        this.removeFromFavorite(id, content);
      }
    },
    reInit: function reInit() {
      var _this = this;

      if (this.$refs.slick) {
        this.$nextTick(function () {
          _this.$refs.slick.reSlick();
        });
      }
    },
    lazyUpdate: function lazyUpdate() {
      if (this.lastUpdate < (0, _moment2.default)().unix() - UPDATE_INTERVAL) {
        this.loadData();
        this.lastUpdate = (0, _moment2.default)().unix();
      }
    },
    loadData: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.loadChannels();

              case 2:
                _context2.next = 4;
                return this.loadFeatured();

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadData() {
        return _ref2.apply(this, arguments);
      }

      return loadData;
    }(),
    loadFeatured: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var featured, i, section;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.$backend.featured.getIndex();

              case 2:
                featured = _context3.sent;

                for (i = 0; i < featured.length; i += 1) {
                  section = featured[i];

                  section.mode = section.type === 'video' ? 'vertical' : 'horizontal';
                  section.items = this.arrayToItems(section.videos);
                }
                this.featured = featured;

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function loadFeatured() {
        return _ref3.apply(this, arguments);
      }

      return loadFeatured;
    }(),
    loadChannels: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var _ref5, channels;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.$backend.featured.getChannels(10);

              case 2:
                _ref5 = _context4.sent;
                channels = _ref5.channels;

                this.channels = channels.map(function (x) {
                  return x.channel_id;
                });
                this.contentReady();

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function loadChannels() {
        return _ref4.apply(this, arguments);
      }

      return loadChannels;
    }(),
    getButtonName: function getButtonName(type) {
      switch (type) {
        case 'video':
          return 'Смотреть фильм';
        case 'channel':
          return 'Смотреть канал';
        default:
          return 'Подробнее';
      }
    },
    contentReady: function contentReady() {
      this.showPlaceholder = false;
    }
  }
};

/***/ }),
/* 484 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _WPlaceholder = __webpack_require__(33);

var _WPlaceholder2 = _interopRequireDefault(_WPlaceholder);

var _ELiveChannel = __webpack_require__(804);

var _ELiveChannel2 = _interopRequireDefault(_ELiveChannel);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

var _utils = __webpack_require__(22);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'p-live',
  props: ['channels', 'pageTitle'],
  mixins: [_utils2.default],
  components: {
    WPlaceholder: _WPlaceholder2.default,
    ELiveChannel: _ELiveChannel2.default
  },
  data: function data() {
    return {
      time: null,
      unsleepFrom: -6,
      unsleepTo: 7,
      ready: false
    };
  },

  watch: {
    channels: function channels() {
      this.time = (0, _moment2.default)().unix();
    }
  },
  created: function created() {
    this.startTimeInterval();
  },
  mounted: function mounted() {
    var _this = this;

    setTimeout(function () {
      _this.ready = true;
    }, 100);
  },
  activated: function activated() {
    _Metric2.default.getInstance().screenView('tv-live');
    this.startTimeInterval();
  },
  deactivated: function deactivated() {
    this.stopTimeInterval();
  },
  destroyed: function destroyed() {
    this.stopTimeInterval();
  },

  computed: {
    showPlaceholder: function showPlaceholder() {
      return !this.ready;
    }
  },
  methods: {
    hideFilter: function hideFilter() {
      this.$root.$emit('hideFilters');
    }
  }
};

/***/ }),
/* 485 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _WButton = __webpack_require__(59);

var _WButton2 = _interopRequireDefault(_WButton);

var _WProgressBarThrobber = __webpack_require__(438);

var _WProgressBarThrobber2 = _interopRequireDefault(_WProgressBarThrobber);

var _DeviceInfo = __webpack_require__(63);

var _DeviceInfo2 = _interopRequireDefault(_DeviceInfo);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    WProgressBarThrobber: _WProgressBarThrobber2.default,
    WButton: _WButton2.default
  },
  name: 'p-login',
  data: function data() {
    return {
      userExists: false,
      step: 1,
      email: '',
      password: '',
      password2: '',
      message: null,
      username: null,
      device: null,
      isTrialAvailable: true,
      isMain: true,
      trialInfo: null,
      quickenter: ['@gmail', '@mail', '@yandex', '@persik.by', '.ru', '.com', '.by'],
      inputType: 'text'
    };
  },
  created: function created() {
    this.device = _DeviceInfo2.default.getInstance();
    this.checkTrial();
  },
  destroyed: function destroyed() {},

  computed: {
    authorized: function authorized() {
      return this.$store.getters.getAuthorized;
    },
    showCheckTrobber: function showCheckTrobber() {
      return this.$store.getters.getLoadingCount('check') > 0;
    },
    showLoginTrobber: function showLoginTrobber() {
      return this.$store.getters.getLoadingCount('login') > 0;
    },
    activeField: function activeField() {
      if (this.step === 1) {
        return 'email';
      } else if (this.step === 2) {
        return 'password';
      } else if (this.step === 3) {
        return 'password2';
      }
      throw new Error('PLogin.step must be 1, 2 or 3');
    },
    visibleText: function visibleText() {
      if (this[this.activeField].length) {
        if (this.keyboardType === 'password') {
          return this[this.activeField].replace(/./g, '*');
        }
        return this[this.activeField];
      }
      return this.$lang.messages.auth[this.placeholder];
    },
    showPrevStep: function showPrevStep() {
      return this.step > 1;
    },
    nextStepName: function nextStepName() {
      if (this.step > 1) {
        if (this.userExists) {
          return this.$lang.messages.auth.enter;
        } else if (this.step === 3) {
          return this.$lang.messages.auth.register;
        }
      }
      return this.$lang.messages.auth.next_step;
    },
    keyboardType: function keyboardType() {
      if (this.step === 1) {
        return 'email';
      }
      return 'password';
    },
    actionTitle: function actionTitle() {
      if (this.step > 1) {
        if (this.userExists) {
          return this.$lang.messages.auth.welcome;
        }
        return this.$lang.messages.auth.registration;
      }
      return this.$lang.messages.auth.authorization;
    },
    placeholder: function placeholder() {
      if (this.step === 1) {
        return 'enter_email';
      } else if (this.step === 2) {
        if (this.userExists) {
          return 'enter_password';
        }
        return 'create_password';
      } else if (this.step === 3) {
        return 'confirm_password';
      }
      return '';
    },
    countSteps: function countSteps() {
      return this.step === 1 || this.userExists ? 2 : 3;
    },
    inputIsEmpty: function inputIsEmpty() {
      return !this[this.activeField].length;
    }
  },
  methods: {
    addText: function addText(text) {
      this.$refs.inputField.value += text;
      this.$refs.inputField.focus();
    },
    checkKey: function checkKey(e) {
      this.message = '';
      if (+e.keyCode === 13) {
        this.nextStep();
        this.$refs.inputField.focus();
      }
    },
    showMain: function showMain() {
      var _this = this;

      this.isMain = true;
      setTimeout(function () {
        _this.$root.$emit('focus', _this.$el);
      }, 0);
    },
    activateTrial: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var uuid, res;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                uuid = this.device.uuid;
                _context.next = 3;
                return this.$backend.account.activateTrial(uuid);

              case 3:
                res = _context.sent;

                this.trialInfo = Math.round(((0, _moment2.default)(res.expired_at, 'YYYY-M-D H-mm-ss').unix() - (0, _moment2.default)().unix()) / 86400);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function activateTrial() {
        return _ref.apply(this, arguments);
      }

      return activateTrial;
    }(),
    checkTrial: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var uuid, res;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                uuid = this.device.uuid;
                _context2.prev = 1;
                _context2.next = 4;
                return this.$backend.account.isTestPeriodAvailable(uuid);

              case 4:
                res = _context2.sent;

                if (res) {
                  this.trialInfo = Math.round(((0, _moment2.default)(res.expired_at, 'YYYY-M-D H-mm-ss').unix() - (0, _moment2.default)().unix()) / 86400);
                  if (this.trialInfo <= 0) {
                    this.isMain = true;
                  }
                } else {
                  this.isTrialAvailable = false;
                  this.isMain = true;
                }
                _context2.next = 12;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2['catch'](1);

                this.isTrialAvailable = true;
                this.isMain = false;

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 8]]);
      }));

      function checkTrial() {
        return _ref2.apply(this, arguments);
      }

      return checkTrial;
    }(),
    gotoFirstStep: function gotoFirstStep() {
      this.step = 1;
      this.username = null;
      this.userExists = false;
      this.password = '';
      this.password2 = '';
      this.message = null;
      this.clearField();
      this.inputType = 'text';
    },
    registration: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.password2 = this.$refs.inputField.value;

                if (this.password2.length) {
                  _context3.next = 3;
                  break;
                }

                throw new Error(this.$lang.messages.auth.enter_field);

              case 3:
                if (!(this.password !== this.password2)) {
                  _context3.next = 5;
                  break;
                }

                throw new Error(this.$lang.messages.auth.passwords_dont_match);

              case 5:
                _context3.next = 7;
                return this.$backend.account.register(this.email, this.password);

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function registration() {
        return _ref3.apply(this, arguments);
      }

      return registration;
    }(),
    login: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.password = this.$refs.inputField.value;

                if (!(this.email.length > 0 && this.password.length > 0)) {
                  _context4.next = 10;
                  break;
                }

                _context4.next = 4;
                return this.$backend.account.login(this.email, this.password, 1);

              case 4:
                this.$store.commit('authorized', true);
                this.$backend.clear();
                this.syncVuexWithBackend();
                this.$router.push({ name: 'Start' });
                _context4.next = 11;
                break;

              case 10:
                throw new Error(this.$lang.messages.auth.enter_field);

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function login() {
        return _ref4.apply(this, arguments);
      }

      return login;
    }(),
    checkEmail: function checkEmail() {
      var pattern = /[\w\S]+@[\w\S]+\.[\w\S]+/g;
      this.email = this.$refs.inputField.value;
      if (pattern.test(this.email)) {
        var res = this.$backend.account.checkEmail(this.email);
        this.clearField();
        return res;
      }
      return false;
    },
    checkPassword: function checkPassword() {
      this.password = this.$refs.inputField.value;
      return this.password.length >= 6;
    },
    prevStep: function prevStep() {
      if (this.step === 3) {
        this.step = 2;
        this.password2 = '';
      } else if (this.step === 2) {
        this.gotoFirstStep();
      }
    },
    clearField: function clearField() {
      this.$refs.inputField.value = '';
    },
    nextStep: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        var res;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(this.step === 1)) {
                  _context5.next = 14;
                  break;
                }

                this.inputType = 'text';
                _context5.prev = 2;
                _context5.next = 5;
                return this.checkEmail();

              case 5:
                res = _context5.sent;

                if (res) {
                  this.step = 2;
                  this.inputType = 'password';
                  this.userExists = res.exists;
                  if (res.exists) {
                    this.username = res.name;
                  } else {
                    this.username = this.email;
                  }
                } else {
                  this.message = this.$lang.messages.auth.invalid_email;
                }
                _context5.next = 12;
                break;

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5['catch'](2);

                this.message = _context5.t0.message;

              case 12:
                _context5.next = 43;
                break;

              case 14:
                if (!(this.step === 2)) {
                  _context5.next = 29;
                  break;
                }

                if (!this.userExists) {
                  _context5.next = 26;
                  break;
                }

                _context5.prev = 16;
                _context5.next = 19;
                return this.login();

              case 19:
                _context5.next = 24;
                break;

              case 21:
                _context5.prev = 21;
                _context5.t1 = _context5['catch'](16);

                this.message = _context5.t1.message;

              case 24:
                _context5.next = 27;
                break;

              case 26:
                if (this.checkPassword()) {
                  this.step = 3;
                  this.clearField();
                } else {
                  this.message = this.$lang.messages.messages.invalid_password;
                }

              case 27:
                _context5.next = 43;
                break;

              case 29:
                if (!(this.step === 3)) {
                  _context5.next = 43;
                  break;
                }

                _context5.prev = 30;
                _context5.next = 33;
                return this.registration();

              case 33:
                this.step = 2;
                this.userExists = true;
                _context5.next = 37;
                return this.login();

              case 37:
                this.clearField();
                _context5.next = 43;
                break;

              case 40:
                _context5.prev = 40;
                _context5.t2 = _context5['catch'](30);

                this.message = _context5.t2.message;

              case 43:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 9], [16, 21], [30, 40]]);
      }));

      function nextStep() {
        return _ref5.apply(this, arguments);
      }

      return nextStep;
    }()
  },
  mounted: function mounted() {
    _Metric2.default.getInstance().screenView('login');
    this.$refs.inputField.focus();
  }
};

/***/ }),
/* 486 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _vueSlick = __webpack_require__(115);

var _vueSlick2 = _interopRequireDefault(_vueSlick);

var _EpgReader = __webpack_require__(78);

var _EpgReader2 = _interopRequireDefault(_EpgReader);

var _Video = __webpack_require__(96);

var _Video2 = _interopRequireDefault(_Video);

var _tween = __webpack_require__(445);

var _tween2 = _interopRequireDefault(_tween);

var _epicSpinners = __webpack_require__(159);

var _BGuideTvshow = __webpack_require__(800);

var _BGuideTvshow2 = _interopRequireDefault(_BGuideTvshow);

var _WVolume = __webpack_require__(439);

var _WVolume2 = _interopRequireDefault(_WVolume);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

var _dialogs = __webpack_require__(95);

var _dialogs2 = _interopRequireDefault(_dialogs);

var _frames = __webpack_require__(35);

var _frames2 = _interopRequireDefault(_frames);

var _images = __webpack_require__(42);

var _images2 = _interopRequireDefault(_images);

var _utils = __webpack_require__(22);

var _utils2 = _interopRequireDefault(_utils);

var _fullscreen = __webpack_require__(117);

var _fullscreen2 = _interopRequireDefault(_fullscreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'p-player-live',
  props: {
    channelId: {}
  },
  mixins: [_dialogs2.default, _frames2.default, _images2.default, _utils2.default, _fullscreen2.default],
  components: {
    BGuideTvshow: _BGuideTvshow2.default,
    LoopingRhombusesSpinner: _epicSpinners.LoopingRhombusesSpinner,
    Slick: _vueSlick2.default,
    WVolume: _WVolume2.default
  },
  data: function data() {
    return {
      infoBlock: false,
      channel: null,
      paused: false,
      hideTimer: null,
      volumeTimer: null,
      isVolumeBarVisible: false,
      tvshows: {
        current: null,
        next: null,
        prev: null,
        animateDirection: 0
      },
      time: null,
      trackTime: null,
      translateX: null,
      showTvGuide: false,
      showTvTape: true,
      showNav: false,
      playableChannelId: 0,
      buttons: [{ name: 'Close' }, { name: 'Menu' }, { name: 'Test' }, { name: 'Test' }, { name: 'Test' }],
      title: '',
      description: '',
      throbberVisible: false,
      dontAskPin: false,
      authorizeAlertEmitted: false,
      purchaseAlertEmitted: false,
      isAdultLocked: false,
      targetChannelId: null,
      pausedTime: null,
      showTracker: false,
      isNeedCheckPin: false,
      errorPinMessage: null
    };
  },

  computed: {
    genreId: function genreId() {
      return this.$store.getters.getFilter;
    },
    intChannelId: function intChannelId() {
      return parseInt(this.channelId, 0);
    },
    channelIndex: function channelIndex() {
      return this.channels.indexOf(this.intChannelId);
    },
    targetChannelIndex: function targetChannelIndex() {
      return this.channels.indexOf(this.targetChannelId);
    },
    currentChannelId: function currentChannelId() {
      return this.channel ? this.channel.channel_id : null;
    },
    volume: function volume() {
      return this.$store.getters.volume;
    },
    connected: function connected() {
      return this.$store.getters.getConnectionStatus;
    },
    channels: function channels() {
      return this.$store.state.filteredChannels;
    },
    authorized: function authorized() {
      return this.$store.getters.getAuthorized;
    },
    isAvailable: function isAvailable() {
      return this.channel ? this.channel.available : null;
    },
    isPlayable: function isPlayable() {
      return this.channel && this.isAvailable && !this.isAdultLocked;
    },
    channelName: function channelName() {
      return this.channel ? this.channel.name : '';
    },
    dvrStart: function dvrStart() {
      return this.time - this.channel.dvr_sec;
    },
    duration: function duration() {
      return this.tvshows.current.stop - this.tvshows.current.start;
    },
    buffered: function buffered() {
      return (this.time - this.tvshows.current.start) / this.duration;
    },
    current: function current() {
      return (this.pausedTime - this.tvshows.current.start) / this.duration;
    }
  },
  asyncComputed: {
    channelsLogos: {
      get: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          var logos, i;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  logos = [];
                  i = 0;

                case 2:
                  if (!(i < this.channels.length)) {
                    _context.next = 11;
                    break;
                  }

                  _context.t0 = logos;
                  _context.next = 6;
                  return this.getChannelLogo(this.channels[i]);

                case 6:
                  _context.t1 = _context.sent;

                  _context.t0.push.call(_context.t0, _context.t1);

                case 8:
                  i += 1;
                  _context.next = 2;
                  break;

                case 11:
                  return _context.abrupt('return', logos);

                case 12:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function get() {
          return _ref.apply(this, arguments);
        }

        return get;
      }(),
      watch: function watch() {
        return this.channels;
      }
    }
  },
  watch: {
    intChannelId: function intChannelId(value) {
      var _this = this;

      clearTimeout(this.loadDelay);
      this.loadDelay = setTimeout((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.$backend.content.getChannel(_this.intChannelId);

              case 2:
                _this.channel = _context2.sent;

                _this.updateTvshows(_this.time);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      })), 0);
      this.trackTime = null;
      this.targetChannelId = value;
    },
    trackTime: function trackTime(value) {
      if (value > 0) {
        this.updateTvshows(value);
      }
    },
    tvshows: function tvshows(value) {
      if (value.animateDirection < 0) {
        this.animateRight();
      }
      if (value.animateDirection > 0) {
        this.animateLeft();
      }

      value.animateDirection = 0;
    },
    volume: function volume(value) {
      this.video.volume = value / 100;
    },
    connected: function connected(value) {
      if (!value) {
        this.throbberVisible = true;
        this.video.pause();
      } else if (this.video.url) {
        this.video.resume();
      } else {
        this.video.stop();
        this.loadVideo();
      }
    },
    targetChannelId: function targetChannelId(value) {
      var _this2 = this;

      clearTimeout(this.switchChannelDelay);
      this.switchChannelDelay = setTimeout(function () {
        _this2.routeChannel(value);
      }, 500);
    }
  },
  created: function created() {
    var _this3 = this;

    this.targetChannelId = this.intChannelId;
    this.playableChannelId = this.intChannelId;
    this.handlers = {};
    this.intervalId = null;
    this.tween = null;
    this.time = (0, _moment2.default)().unix();
    this.intervalId = setInterval(function () {
      _this3.time = (0, _moment2.default)().unix();
    }, 1000);
    this.handlers.videoReadyHandler = this.videoReadyHandler.bind(this);
    this.handlers.videoErrorHandler = this.videoErrorHandler.bind(this);
    this.handlers.videoWaitingHandler = this.videoWaitingHandler.bind(this);
    this.handlers.videoTimeUpdateHandler = this.videoTimeUpdateHandler.bind(this);
    document.addEventListener('keydown', this.keypressHandler);
  },
  mounted: function mounted() {
    this.playableChannelId = this.intChannelId;
    _Metric2.default.getInstance().screenView('player-live');
    this.video = _Video2.default.getInstance();
    this.video.open();
    this.video.useHls = this.$backend.settings.getVideoUseHls();
    this.video.volume = this.volume / 100;
    this.video.addEventListener(_Video2.default.PLAY_ERROR, this.handlers.videoErrorHandler);
    this.video.addEventListener(_Video2.default.TIME_UPDATE, this.handlers.videoTimeUpdateHandler);
    this.video.addEventListener(_Video2.default.READY_STATE, this.handlers.videoReadyHandler);
    this.video.addEventListener(_Video2.default.WAITING, this.handlers.videoWaitingHandler);
    this.updateTvshows(this.time);
    this.loadVideo();
    this.video.setViewPort(0, 0, 0, 0);
    this.$root.$emit('focus', this.$el, true);
    this.showAllBarsWithAutohide();
  },
  destroyed: function destroyed() {
    clearInterval(this.intervalId);
    clearTimeout(this.stateTimeout);
    clearTimeout(this.loadDelay);
    clearTimeout(this.keepPlayTimer);
    this.video.removeEventListener(_Video2.default.PLAY_ERROR, this.handlers.videoErrorHandler);
    this.video.removeEventListener(_Video2.default.TIME_UPDATE, this.handlers.videoTimeUpdateHandler);
    this.video.removeEventListener(_Video2.default.READY_STATE, this.handlers.videoReadyHandler);
    this.video.removeEventListener(_Video2.default.WAITING, this.handlers.videoWaitingHandler);
    this.video.setViewPort(10, 10, 0, 0);
    this.video.close(true);
    this.video = null;
    document.removeEventListener('keydown', this.keypressHandler);
    this.pageCloseFullscreen();
  },

  methods: {
    volumeChangeHandler: function volumeChangeHandler(e) {
      var _this4 = this;

      if (e.deltaY < 0) {
        this.$store.commit('volume', this.volume + 1);
      } else {
        this.$store.commit('volume', this.volume - 1);
      }
      clearTimeout(this.volumeTimer);
      this.isVolumeBarVisible = true;
      this.volumeTimer = setTimeout(function () {
        _this4.isVolumeBarVisible = false;
      }, 1000);
    },
    togglePause: function togglePause() {
      if (this.paused) {
        this.video.stop();
        this.paused = false;
        var deltaTime = this.time - this.pausedTime;
        this.pausedTime = null;
        var deltaUrl = this.channel.stream_url.replace(/playlist/, 'timeshift').concat('&s=' + deltaTime);
        this.video.play(deltaUrl);
        this.showAllBarsWithAutohide();
      } else {
        this.video.pause();
        this.paused = true;
        this.pausedTime = this.time;
        this.showAllBars();
      }
    },
    next: function next() {
      this.$refs.slick.next();
    },
    prev: function prev() {
      this.$refs.slick.prev();
    },
    reInit: function reInit() {
      var _this5 = this;

      this.$nextTick(function () {
        _this5.$refs.slick.reSlick();
      });
    },
    stateController: function stateController() {
      var _this6 = this;

      if (this.connected) {
        clearTimeout(this.stateTimeout);
        this.stateTimeout = setTimeout((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _this6.showAllBars();
                  if (!_this6.isAdultLocked) {
                    _this6.$nm.showError('Сервер не отвечает.', 5000);
                  }
                  _context3.next = 4;
                  return _this6.$backend.content.getChannel(_this6.intChannelId);

                case 4:
                  _this6.channel = _context3.sent;

                  if (_this6.channel.stream_url && _this6.channel.available && !_this6.isAdultLocked) {
                    _this6.video.stop();
                    _this6.playVideo(_this6.channel.stream_url);
                  }
                  _this6.stateController();
                  _Metric2.default.getInstance().event('tv', 'play error', _this6.channel.name + ' (#' + _this6.channel.channel_id + ')');

                case 8:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this6);
        })), 60000);
      }
    },
    pageCloseFullscreen: function pageCloseFullscreen() {
      if (this.isFullscreenActive()) {
        this.closeFullscreen();
      }
    },
    goBack: function goBack() {
      this.pageCloseFullscreen();
      this.$root.$emit('navigateBack');
    },
    loadVideo: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var _this7 = this;

        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.intChannelId;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.$backend.content.getChannel(id);

              case 2:
                this.channel = _context4.sent;

                this.playableChannelId = id;
                this.targetChannelId = id;
                if (this.channel.available) {
                  try {
                    this.isAdultLocked = this.isChannelAdultLocked(this.channel);
                    if (this.isAdultLocked && !this.dontAskPin) {
                      this.isNeedCheckPin = true;
                    }
                    if (!this.isAdultLocked) {
                      this.playVideo(this.channel.stream_url);
                    }
                  } catch (e) {
                    this.showAllBars();
                    this.$nm.showMessage(e.message, 0);
                    this.showTvGuide = true;
                    this.showTvTape = true;
                  }
                } else if (!this.authorized) {
                  if (!this.authorizeAlertEmitted) {
                    this.showAllBars();
                    this.$nm.showError(this.$lang.messages.auth.need_auth, 0, this.$lang.messages.auth.auth, function () {
                      _this7.$router.push({ name: 'Main', params: { page: 'login' } });
                    });
                    this.authorizeAlertEmitted = true;
                  }
                } else if (!this.purchaseAlertEmitted) {
                  this.showAllBars();
                  this.$nm.showError(this.$lang.messages.messages.unavailable_channel, 0, this.$lang.messages.buttons.purchase, function () {
                    _this7.$router.push({
                      name: 'Main',
                      params: { page: 'account' },
                      query: { tab: 'purchases' }
                    });
                  });
                  this.purchaseAlertEmitted = true;
                }

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function loadVideo() {
        return _ref4.apply(this, arguments);
      }

      return loadVideo;
    }(),
    checkPin: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(pin) {
        var currentPin;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.$backend.account.getPin();

              case 2:
                currentPin = _context5.sent;

                if (currentPin === pin) {
                  this.playVideo(this.channel.stream_url);
                  this.closeParentControlDialog();
                } else {
                  this.errorPinMessage = 'Неверный ПИН';
                }

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function checkPin(_x2) {
        return _ref5.apply(this, arguments);
      }

      return checkPin;
    }(),
    closeParentControlDialog: function closeParentControlDialog() {
      this.isNeedCheckPin = false;
    },
    keypressInputEvent: function keypressInputEvent(key) {
      this.errorPinMessage = null;
      if (key.which === 13) {
        this.checkPin(this.$refs.pinField.value);
      }
    },
    keypressHandler: function keypressHandler(e) {
      if (e.keyCode === 27) {
        this.goBack();
      }
    },
    showAllBarsWithAutohide: function showAllBarsWithAutohide() {
      var _this8 = this;

      clearInterval(this.hideTimer);
      this.showAllBars();
      this.hideTimer = setTimeout(function () {
        _this8.hideAllBars();
      }, 5000);
    },
    showAllBars: function showAllBars() {
      this.showNav = true;
      this.showTvGuide = true;
      this.showTvTape = true;
      clearInterval(this.hideTimer);
    },
    hideAllBars: function hideAllBars() {
      this.showNav = false;
      this.showTvGuide = false;
      this.showTvTape = false;
    },
    playVideo: function playVideo(url) {
      if (this.video.played && this.video.url === url) {
        return;
      }
      this.throbberVisible = true;
      this.video.stop();
      this.startPlayTime = (0, _moment2.default)().valueOf();
      this.video.play(url);
      _Metric2.default.getInstance().event('tv', 'play', this.channel.name + ' (#' + this.channel.channel_id + ')');
    },
    animateRight: function animateRight() {
      this.translateX -= 1;
      this.tweenTranslateX();
    },
    animateLeft: function animateLeft() {
      this.translateX += 1;
      this.tweenTranslateX();
    },
    tweenTranslateX: function tweenTranslateX() {
      var _this9 = this;

      if (this.tween) {
        _tween2.default.remove(this.tween);
      }
      this.tween = new _tween2.default.Tween(this).easing(_tween2.default.Easing.Sinusoidal.Out).to({ translateX: 0 }, 300).onComplete(function () {
        _tween2.default.remove(_this9.tween);
        _this9.tween = null;
      }).start();
      requestAnimationFrame(this.animate.bind(this));
    },
    animate: function animate(time) {
      _tween2.default.update(time);
      if (this.tween) {
        requestAnimationFrame(this.animate.bind(this));
      }
    },
    gotoNextTvshow: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
        var nextTvshow;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this.tvshows.next && this.tvshows.next.length) {
                  nextTvshow = this.tvshows.next[0];

                  this.trackTime = nextTvshow.start;
                  this.tvshows.animateDirection = 1;
                }

              case 1:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function gotoNextTvshow() {
        return _ref6.apply(this, arguments);
      }

      return gotoNextTvshow;
    }(),
    gotoPrevTvshow: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
        var prevTvshow;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this.tvshows.prev && this.tvshows.prev.length) {
                  prevTvshow = this.tvshows.prev[this.tvshows.prev.length - 1];

                  this.trackTime = prevTvshow.start;
                  this.tvshows.animateDirection = -1;
                }

              case 1:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function gotoPrevTvshow() {
        return _ref7.apply(this, arguments);
      }

      return gotoPrevTvshow;
    }(),
    updateTvshows: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(time) {
        var epg, trackTvshows, nextTvshows;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                epg = _EpgReader2.default.getInstance();
                trackTvshows = {};
                _context8.next = 4;
                return epg.getNextTvshows(this.intChannelId, _moment2.default.unix(time), 3);

              case 4:
                nextTvshows = _context8.sent;

                trackTvshows.current = nextTvshows.shift();
                trackTvshows.next = nextTvshows;
                _context8.next = 9;
                return epg.getPrevTvshows(this.intChannelId, _moment2.default.unix(time), 2);

              case 9:
                trackTvshows.prev = _context8.sent;

                trackTvshows.animateDirection = this.tvshows.animateDirection;
                this.tvshows = trackTvshows;

              case 12:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function updateTvshows(_x3) {
        return _ref8.apply(this, arguments);
      }

      return updateTvshows;
    }(),
    routeChannel: function routeChannel(channelId) {
      this.$router.push({
        name: 'PlayerLive',
        params: { channelId: channelId }
      });
    },
    isCurrent: function isCurrent() {
      return this.tvshows.current.start < this.time && this.tvshows.current.stop > this.time;
    },
    isOtherChannel: function isOtherChannel() {
      return this.channel.channel_id !== this.playableChannelId;
    },
    changeChannel: function changeChannel(id) {
      this.video.stop();
      this.closeParentControlDialog();
      this.loadVideo(id);
    },
    videoReadyHandler: function videoReadyHandler() {
      var _this10 = this;

      setTimeout(function () {
        if (_this10.video) {
          _this10.video.setViewPort(0, 0, 0, 0);
        }
      }, 500);
    },
    videoTimeUpdateHandler: function videoTimeUpdateHandler() {
      var _this11 = this;

      this.throbberVisible = false;
      this.stateController();
      if (this.startPlayTime) {
        var loadTime = (0, _moment2.default)().valueOf() - this.startPlayTime;
        this.startPlayTime = null;
        _Metric2.default.getInstance().timing('play live', this.channel.channel_id, loadTime, { timingLabel: this.channel.name });
      }
      if (!this.keepPlayTimer) {
        this.keepPlayTimer = setTimeout(function () {
          _Metric2.default.getInstance().event('tv', 'playing', _this11.channel.name + ' (#' + _this11.channel.channel_id + ')');
          _this11.keepPlayTimer = null;
        }, 20 * 60 * 1000);
      }
    },
    videoWaitingHandler: function videoWaitingHandler() {
      this.throbberVisible = true;
    },
    videoErrorHandler: function videoErrorHandler(func, error) {
      this.showAllBars();
      this.$nm.showError(error, 2000);
    },
    isArchive: function isArchive(tvshow) {
      if (tvshow) {
        return tvshow.start > this.dvrStart && tvshow.stop < this.time;
      }
      return false;
    }
  }
};

/***/ }),
/* 487 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(43);

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _Video = __webpack_require__(96);

var _Video2 = _interopRequireDefault(_Video);

var _WButton = __webpack_require__(59);

var _WButton2 = _interopRequireDefault(_WButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { WButton: _WButton2.default },
  name: 'p-player-test',
  props: [],
  data: function data() {
    return {
      infoBlock: [],
      mediaInfo: {}
    };
  },

  computed: {
    connected: function connected() {
      return this.$store.getters.getConnectionStatus;
    },
    volume: function volume() {
      return this.$store.getters.volume;
    }
  },
  watch: {
    connected: function connected(value) {
      var er = void 0;
      if (!value) {
        er = this.getCurrentTime() + ': no connection';
      } else {
        er = this.getCurrentTime() + ': connected';
      }
      this.infoBlock.push(er);
    },
    volume: function volume(value) {
      this.video.volume = value / 100;
    }
  },
  created: function created() {
    var _this = this;

    this.handlers = {};
    this.eventHandlerBinded = this.eventHandler.bind(this);
    this.timeUpdateHandler = function () {
      _this.mediaInfo = _this.getMediaInfo();
    };
    this.video = _Video2.default.getInstance();
    this.video.open();
    this.video.useHls = this.$backend.settings.getVideoUseHls();
    this.video.volume = this.volume / 100;
    this.video.addEventListener(_Video2.default.PLAY_ERROR, this.eventHandlerBinded);
    this.video.addEventListener(_Video2.default.READY_STATE, this.eventHandlerBinded);
    this.video.addEventListener(_Video2.default.PLAY_ENDED, this.eventHandlerBinded);
    this.video.addEventListener(_Video2.default.START_LOADING, this.eventHandlerBinded);
    this.video.addEventListener(_Video2.default.PLAY_START, this.eventHandlerBinded);
    this.video.addEventListener(_Video2.default.LOAD_PROGRESS, this.eventHandlerBinded);
    this.video.addEventListener(_Video2.default.START_SEEK, this.eventHandlerBinded);
    this.video.addEventListener(_Video2.default.STOP_SEEK, this.eventHandlerBinded);
    this.video.addEventListener(_Video2.default.VOLUME_CHANGE, this.eventHandlerBinded);
    this.video.addEventListener(_Video2.default.STOPPED, this.eventHandlerBinded);
    this.video.addEventListener(_Video2.default.WAITING, this.eventHandlerBinded);
    this.video.addEventListener(_Video2.default.TIME_UPDATE, this.timeUpdateHandler);
    this.refreshInterval = null;
  },
  destroyed: function destroyed() {
    this.video.removeEventListener(_Video2.default.PLAY_ERROR, this.eventHandlerBinded);
    this.video.removeEventListener(_Video2.default.READY_STATE, this.eventHandlerBinded);
    this.video.removeEventListener(_Video2.default.PLAY_ENDED, this.eventHandlerBinded);
    this.video.removeEventListener(_Video2.default.START_LOADING, this.eventHandlerBinded);
    this.video.removeEventListener(_Video2.default.PLAY_START, this.eventHandlerBinded);
    this.video.removeEventListener(_Video2.default.LOAD_PROGRESS, this.eventHandlerBinded);
    this.video.removeEventListener(_Video2.default.START_SEEK, this.eventHandlerBinded);
    this.video.removeEventListener(_Video2.default.STOP_SEEK, this.eventHandlerBinded);
    this.video.removeEventListener(_Video2.default.VOLUME_CHANGE, this.eventHandlerBinded);
    this.video.removeEventListener(_Video2.default.STOPPED, this.eventHandlerBinded);
    this.video.removeEventListener(_Video2.default.WAITING, this.eventHandlerBinded);
    this.video.removeEventListener(_Video2.default.TIME_UPDATE, this.timeUpdateHandler);
    this.video.close();
    clearInterval(this.refreshInterval);
  },

  methods: {
    getCurrentTime: function getCurrentTime() {
      return (0, _moment2.default)().format('HH:mm:ss');
    },
    playVod: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'normal';
        var url, stream;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = null;
                stream = null;

                if (!(mode !== 'normal')) {
                  _context.next = 6;
                  break;
                }

                stream = 'https://play.m3u8';
                _context.next = 10;
                break;

              case 6:
                url = 'https://persik.by/test-vod.php';
                _context.next = 9;
                return this.getStream(url);

              case 9:
                stream = _context.sent;

              case 10:
                this.playStream(stream);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function playVod() {
        return _ref.apply(this, arguments);
      }

      return playVod;
    }(),
    playLive: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var lifetime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;
        var url, stream;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                url = null;
                stream = null;

                if (!(lifetime !== 'error')) {
                  _context2.next = 9;
                  break;
                }

                url = 'https://persik.by/test-live.php?t=' + lifetime;
                _context2.next = 6;
                return this.getStream(url);

              case 6:
                stream = _context2.sent;
                _context2.next = 10;
                break;

              case 9:
                stream = 'http://play.m3u8';

              case 10:
                this.playStream(stream);

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function playLive() {
        return _ref2.apply(this, arguments);
      }

      return playLive;
    }(),
    playStream: function playStream(url) {
      var _this2 = this;

      this.infoBlock.push(this.getCurrentTime() + ': play stream ' + url);
      clearInterval(this.refreshInterval);
      this.video.setViewPort(59, 2, 20, 11.25);
      this.video.play(url);
      this.refreshInterval = setInterval(function () {
        _this2.mediaInfo = _this2.getMediaInfo();
      }, 1000);
    },
    eventHandler: function eventHandler(e) {
      console.log(e);
      var error = this.getCurrentTime() + ': Event ' + e.type;
      this.infoBlock.push(error);
    },
    getStream: function getStream(url) {
      return new _promise2.default(function (resolve) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
          if (xhr.status === 200 && xhr.readyState === 4) {
            resolve(JSON.parse(xhr.responseText).stream_url);
          }
        };
        xhr.send();
      });
    },
    getMediaInfo: function getMediaInfo() {
      return {
        state: this.video.state,
        duration: Math.round(this.video.duration * 100) / 100,
        currentTime: Math.round(this.video.currentTime * 100) / 100,
        buffered: Math.round(this.video.buffered * 100) / 100,
        played: this.video.played
      };
    },
    videoErrorHandler: function videoErrorHandler(func, er) {
      var error = this.getCurrentTime() + ': error\n      ' + er.event + ', type="' + er.type + '", details="' + er.details + '"';
      this.infoBlock.push(error);
    },
    refresh: function refresh() {
      this.video.close();
      clearInterval(this.refreshInterval);
      this.infoBlock = [];
      this.mediaInfo = null;
    },
    clearEvents: function clearEvents() {
      this.infoBlock = [];
    },
    pause: function pause() {
      this.video.pause();
      var mes = this.getCurrentTime() + ': pause';
      this.infoBlock.push(mes);
    },
    resume: function resume() {
      this.video.resume();
      var mes = this.getCurrentTime() + ': resume';
      this.infoBlock.push(mes);
    },
    stop: function stop() {
      this.video.stop();
      var mes = this.getCurrentTime() + ': stop';
      this.infoBlock.push(mes);
    },
    seekLeft: function seekLeft() {
      var seekValue = this.video.currentTime - 20;
      this.video.seek = seekValue;
      var mes = this.getCurrentTime() + ': seek -20s';
      this.infoBlock.push(mes);
    },
    seekRight: function seekRight() {
      var seekValue = this.video.currentTime + 20;
      this.video.seek = seekValue;
      var mes = this.getCurrentTime() + ': seek +20s';
      this.infoBlock.push(mes);
    }
  }
};

/***/ }),
/* 488 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _WPlayerTimeline = __webpack_require__(843);

var _WPlayerTimeline2 = _interopRequireDefault(_WPlayerTimeline);

var _WPlayerTracker = __webpack_require__(844);

var _WPlayerTracker2 = _interopRequireDefault(_WPlayerTracker);

var _WPlayerThumbs = __webpack_require__(842);

var _WPlayerThumbs2 = _interopRequireDefault(_WPlayerThumbs);

var _WVolume = __webpack_require__(439);

var _WVolume2 = _interopRequireDefault(_WVolume);

var _epicSpinners = __webpack_require__(159);

var _Video = __webpack_require__(96);

var _Video2 = _interopRequireDefault(_Video);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

var _frames = __webpack_require__(35);

var _frames2 = _interopRequireDefault(_frames);

var _fullscreen = __webpack_require__(117);

var _fullscreen2 = _interopRequireDefault(_fullscreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'p-player-video',
  props: ['id', 'type'],
  mixins: [_frames2.default, _fullscreen2.default],
  components: {
    WPlayerTimeline: _WPlayerTimeline2.default,
    WPlayerTracker: _WPlayerTracker2.default,
    WPlayerThumbs: _WPlayerThumbs2.default,
    LoopingRhombusesSpinner: _epicSpinners.LoopingRhombusesSpinner,
    WVolume: _WVolume2.default
  },
  data: function data() {
    return {
      keyCounter: 0,
      throbberVisible: true,
      showControls: false,
      buffered: 0,
      isVolumeBarVisible: false,
      trackingMode: false,
      volumeTimer: null,
      trackerTime: 0,
      duration: null,
      time: 0,
      showNavbar: false,
      paused: false,
      name: '-',
      hideTimer: null
    };
  },

  computed: {
    seekStep: function seekStep() {
      var index = Math.min(Math.floor(this.keyCounter / this.modeCounter), this.steps.length - 1);
      return this.steps[index];
    },
    trackerPosition: function trackerPosition() {
      return this.duration ? this.trackerTime / this.duration : 0;
    },
    position: function position() {
      return this.duration ? this.time / this.duration : 0;
    },
    volume: function volume() {
      return this.$store.getters.volume;
    },
    connected: function connected() {
      return this.$store.getters.getConnectionStatus;
    }
  },
  asyncComputed: {
    thumbnail: function thumbnail() {
      if (this.trackingMode) {
        if (this.type === 'video') {
          return this.getVideoFrame(this.id, this.trackerTime, 'resize', 384);
        } else if (this.type === 'tvshow' && this.tvshow) {
          return this.getChannelFrame(this.tvshow.channel_id, this.tvshow.start + this.trackerTime, 'resize', 384);
        }
      }
      return '';
    },
    thumbnails: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var result, step, i, t;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                result = [];
                step = this.duration / this.thumbnailsCount;
                i = 0;

              case 3:
                if (!(i < this.thumbnailsCount)) {
                  _context.next = 18;
                  break;
                }

                t = (i + 0.5) * step;

                if (!(this.type === 'video')) {
                  _context.next = 9;
                  break;
                }

                result.push(this.getVideoFrame(this.id, t, 'resize', 160));
                _context.next = 15;
                break;

              case 9:
                if (!(this.type === 'tvshow' && this.tvshow)) {
                  _context.next = 15;
                  break;
                }

                _context.t0 = result;
                _context.next = 13;
                return this.getChannelFrame(this.tvshow.channel_id, this.tvshow.start + t, 'resize', 160);

              case 13:
                _context.t1 = _context.sent;

                _context.t0.push.call(_context.t0, _context.t1);

              case 15:
                i += 1;
                _context.next = 3;
                break;

              case 18:
                return _context.abrupt('return', result);

              case 19:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function thumbnails() {
        return _ref.apply(this, arguments);
      }

      return thumbnails;
    }()
  },
  watch: {
    showControls: function showControls(value) {
      if (value) {
        this.autoHideControls();
      }
    },
    volume: function volume(value) {
      if (this.video) {
        this.video.volume = value / 100;
      }
    },
    connected: function connected(value) {
      if (!value) {
        this.throbberVisible = true;
        this.video.pause();
      } else {
        this.throbberVisible = false;
        if (!this.paused) {
          this.video.resume();
        }
      }
    }
  },
  methods: {
    checkCode: function checkCode(e) {
      switch (+e.keyCode) {
        case 32:
          this.togglePause();
          break;
        case 27:
          this.pageCloseFullscreen();
          this.goBack();
          break;
        default:
          break;
      }
    },
    pageCloseFullscreen: function pageCloseFullscreen() {
      if (this.isFullscreenActive()) {
        this.closeFullscreen();
      }
    },
    showAllBars: function showAllBars() {
      this.showNavbar = true;
      this.showControls = true;
    },
    hideAllBars: function hideAllBars() {
      this.showNavbar = false;
      this.showControls = false;
    },
    showAllBarsWithAutohide: function showAllBarsWithAutohide() {
      var _this = this;

      clearTimeout(this.hideTimer);
      this.showAllBars();
      this.hideTimer = setTimeout(function () {
        _this.hideAllBars();
      }, 4000);
    },
    changeVolumeHandler: function changeVolumeHandler(e) {
      var _this2 = this;

      if (e.deltaY < 0) {
        this.$store.commit('volume', this.volume + 1);
      } else {
        this.$store.commit('volume', this.volume - 1);
      }
      clearTimeout(this.volumeTimer);
      this.isVolumeBarVisible = true;
      this.volumeTimer = setTimeout(function () {
        _this2.isVolumeBarVisible = false;
      }, 1000);
    },
    changeCurrentTime: function changeCurrentTime(timePercent) {
      this.video.seek = this.video.duration * timePercent;
      this.trackingMode = false;
      _Metric2.default.getInstance().event(this.type, 'seek', this.name + ' (#' + this.id + ')');
    },
    togglePause: function togglePause() {
      if (this.video.played) {
        this.video.pause();
        this.showAllBars();
        this.paused = true;
        _Metric2.default.getInstance().event(this.type, 'pause', this.name + ' (#' + this.id + ')');
        this.showAllBars();
      } else {
        this.video.resume();
        this.paused = false;
        _Metric2.default.getInstance().event(this.type, 'resume', this.name + ' (#' + this.id + ')');
        this.showAllBarsWithAutohide();
      }
    },
    showTracker: function showTracker() {
      this.showControls = true;
    },
    hideTracker: function hideTracker() {
      this.showControls = false;
    },
    toggleControls: function toggleControls() {
      this.showControls = !this.showControls;
    },
    enterEvent: function enterEvent() {
      if (!this.autoSeek && this.trackingMode) {
        this.video.seek = this.trackerTime;
        this.trackingMode = false;
        _Metric2.default.getInstance().event(this.type, 'seek', this.name + ' (#' + this.id + ')');
      } else if (this.video.played) {
        this.video.pause();
        this.paused = true;
        _Metric2.default.getInstance().event(this.type, 'pause', this.name + ' (#' + this.id + ')');
      } else {
        this.video.resume();
        this.paused = false;
        _Metric2.default.getInstance().event(this.type, 'resume', this.name + ' (#' + this.id + ')');
      }
    },
    loadVideo: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var _this3 = this;

        var streamData, url;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.id === null || typeof this.id === 'undefined')) {
                  _context2.next = 6;
                  break;
                }

                this.throbberVisible = false;
                this.$nm.showMessage('Null reference!', 0, '');
                this.showAllBars();
                _context2.next = 24;
                break;

              case 6:
                streamData = void 0;
                _context2.prev = 7;

                if (!(this.type === 'video')) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 11;
                return this.$backend.stream.getVideo(this.id);

              case 11:
                streamData = _context2.sent;
                _context2.next = 18;
                break;

              case 14:
                if (!(this.type === 'tvshow')) {
                  _context2.next = 18;
                  break;
                }

                _context2.next = 17;
                return this.$backend.stream.getTvshow(this.id);

              case 17:
                streamData = _context2.sent;

              case 18:
                if (streamData.stream_url) {
                  url = streamData.stream_url;

                  this.paused = false;
                  this.startPlayTime = (0, _moment2.default)().valueOf();
                  this.video.play(url);
                  _Metric2.default.getInstance().event(this.type, 'play', this.name + ' (#' + this.id + ')');
                } else {
                  this.showAllBars();
                  this.$nm.showError(this.$lang.messages.messages.server_ask_error, 5000);
                }
                _context2.next = 24;
                break;

              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2['catch'](7);

                if (_context2.t0.status === 401) {
                  this.showAllBars();
                  this.$nm.showError(_context2.t0.message, 0, this.$lang.messages.auth.auth, function () {
                    _this3.$router.push({ name: 'Main', params: { page: 'login' } });
                  });
                } else {
                  this.showAllBars();
                  this.$nm.showError(_context2.t0.message, 5000);
                }

              case 24:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[7, 21]]);
      }));

      function loadVideo() {
        return _ref2.apply(this, arguments);
      }

      return loadVideo;
    }(),
    refreshStreamData: function refreshStreamData() {
      var currentTime = this.video.currentTime;
      this.time = currentTime;
      if (!this.trackingMode) {
        this.trackerTime = currentTime;
      }
    },
    trackStep: function trackStep(direction) {
      this.showControls = true;
      var trackerTime = this.trackerTime + direction * this.seekStep;
      trackerTime = Math.max(0, Math.min(this.duration, trackerTime));
      if (this.trackerTime !== trackerTime) {
        this.trackerTime = trackerTime;
        this.trackingMode = true;
      }
      this.incrementKeyCounter();
      this.autoHideControls();
    },
    autoHideControls: function autoHideControls() {
      var _this4 = this;

      clearTimeout(this.autohideControlsTimeoutId);
      if (this.showControls) {
        this.autohideControlsTimeoutId = setTimeout(function () {
          _this4.showControls = false;
        }, 10000);
      }
    },
    incrementKeyCounter: function incrementKeyCounter() {
      var _this5 = this;

      clearTimeout(this.keyCounterTimerId);
      this.keyCounter += 1;
      this.keyCounterTimerId = setTimeout(function () {
        _this5.keyCounter = 0;
      }, 200);
    },
    goBack: function goBack() {
      this.$root.$emit('navigateBack');
    },
    timeUpdateControl: function timeUpdateControl() {
      var _this6 = this;

      this.throbberVisible = false;
      clearTimeout(this.updateTimer);
      if (this.notifId) {
        this.$nm.deleteNotif(this.notifId);
        this.notifId = null;
      }
      if (!this.paused) {
        this.updateTimer = setTimeout(function () {
          _this6.throbberVisible = true;
          _this6.notifId = _this6.$nm.showMessage(_this6.$lang.messages.messages.server_dontask, 0);
          _Metric2.default.getInstance().event(_this6.type, 'play error', _this6.name + ' (#' + _this6.id + ')');
        }, 20000);
      }
      if (this.startPlayTime) {
        var loadTime = (0, _moment2.default)().valueOf() - this.startPlayTime;
        this.startPlayTime = null;
        _Metric2.default.getInstance().timing('play ' + this.type, this.id, loadTime, { timingLabel: this.name });
      }
      if (!this.keepPlayTimer) {
        this.keepPlayTimer = setTimeout(function () {
          _Metric2.default.getInstance().event(_this6.type, 'playing', _this6.name + ' (#' + _this6.id + ')');
          _this6.keepPlayTimer = null;
        }, 20 * 60 * 1000);
      }
    },
    videoErrorHandler: function videoErrorHandler(func, error) {
      this.showAllBars();
      this.$nm.showMessage(error, 2000);
    },
    videoReadyHandler: function videoReadyHandler() {
      var _this7 = this;

      setTimeout(function () {
        _this7.throbberVisible = false;
        if (_this7.video) {
          _this7.duration = _this7.video.duration;
          _this7.video.setViewPort(0, 0, 0, 0);
        }
      }, 500);
    },
    videoWaitingHandler: function videoWaitingHandler() {
      this.throbberVisible = true;
    },
    videoTimeUpdateHandler: function videoTimeUpdateHandler() {
      if (!isFinite(this.duration)) {
        this.duration = this.video.duration;
      }
      this.refreshStreamData();
      this.timeUpdateControl();
    },
    videoLoadProgressHandler: function videoLoadProgressHandler() {
      this.buffered = this.video.buffered / this.video.duration;
    },
    videoStartSeekHandler: function videoStartSeekHandler() {
      this.throbberVisible = true;
    },
    videoStopSeekHandler: function videoStopSeekHandler() {
      this.throbberVisible = false;
      this.trackingMode = false;
    },
    videoPlayEndedHandler: function videoPlayEndedHandler() {
      this.goBack();
    }
  },
  created: function created() {
    this.tvshow = null;
    this.video = null;
    this.thumbnailsCount = 12;
    this.autohideControlsTimeoutId = null;
    this.modeCounter = 10;
    this.steps = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60];
    this.keyCounterTimerId = null;
    this.notifId = null;
    this.updateTimer = null;
    this.handlers = {};
    this.handlers.videoReadyHandler = this.videoReadyHandler.bind(this);
    this.handlers.videoErrorHandler = this.videoErrorHandler.bind(this);
    this.handlers.videoWaitingHandler = this.videoWaitingHandler.bind(this);
    this.handlers.videoTimeUpdateHandler = this.videoTimeUpdateHandler.bind(this);
    this.handlers.videoLoadProgressHandler = this.videoLoadProgressHandler.bind(this);
    this.handlers.videoStartSeekHandler = this.videoStartSeekHandler.bind(this);
    this.handlers.videoStopSeekHandler = this.videoStopSeekHandler.bind(this);
    this.handlers.videoPlayEndedHandler = this.videoPlayEndedHandler.bind(this);
    document.addEventListener('keydown', this.checkCode);
  },
  mounted: function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var video;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _Metric2.default.getInstance().screenView('player-video');

              if (!(this.type === 'tvshow')) {
                _context3.next = 8;
                break;
              }

              _context3.next = 4;
              return this.$backend.content.getTvshow(this.id);

            case 4:
              this.tvshow = _context3.sent;

              this.name = this.tvshow.title;
              _context3.next = 13;
              break;

            case 8:
              if (!(this.type === 'video')) {
                _context3.next = 13;
                break;
              }

              _context3.next = 11;
              return this.$backend.content.getVideo(this.id);

            case 11:
              video = _context3.sent;

              this.name = video.name;

            case 13:

              this.video = _Video2.default.getInstance();
              this.video.open();
              this.video.useHls = this.$backend.settings.getVideoUseHls();
              this.video.volume = this.volume / 100;

              this.video.addEventListener(_Video2.default.PLAY_ERROR, this.handlers.videoErrorHandler);
              this.video.addEventListener(_Video2.default.TIME_UPDATE, this.handlers.videoTimeUpdateHandler);
              this.video.addEventListener(_Video2.default.READY_STATE, this.handlers.videoReadyHandler);
              this.video.addEventListener(_Video2.default.WAITING, this.handlers.videoWaitingHandler);
              this.video.addEventListener(_Video2.default.LOAD_PROGRESS, this.handlers.videoLoadProgressHandler);
              this.video.addEventListener(_Video2.default.START_SEEK, this.handlers.videoStartSeekHandler);
              this.video.addEventListener(_Video2.default.STOP_SEEK, this.handlers.videoStopSeekHandler);
              this.video.addEventListener(_Video2.default.PLAY_ENDED, this.handlers.videoPlayEndedHandler);
              this.loadVideo();

            case 26:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function mounted() {
      return _ref3.apply(this, arguments);
    }

    return mounted;
  }(),
  destroyed: function destroyed() {
    clearTimeout(this.updateTimer);
    clearTimeout(this.keepPlayTimer);
    this.video.setViewPort(10, 10, 0, 0);
    this.video.close();
    this.video.removeEventListener(_Video2.default.PLAY_ERROR, this.handlers.videoErrorHandler);
    this.video.removeEventListener(_Video2.default.TIME_UPDATE, this.handlers.videoTimeUpdateHandler);
    this.video.removeEventListener(_Video2.default.READY_STATE, this.handlers.videoReadyHandler);
    this.video.removeEventListener(_Video2.default.WAITING, this.handlers.videoWaitingHandler);
    this.video.removeEventListener(_Video2.default.LOAD_PROGRESS, this.handlers.videoLoadProgressHandler);
    this.video.removeEventListener(_Video2.default.START_SEEK, this.handlers.videoStartSeekHandler);
    this.video.removeEventListener(_Video2.default.STOP_SEEK, this.handlers.videoStopSeekHandler);
    this.video.removeEventListener(_Video2.default.PLAY_ENDED, this.handlers.videoPlayEndedHandler);
    _Metric2.default.getInstance().event(this.type, 'end', this.name + ' (#' + this.id + ')');
    document.removeEventListener('keydown', this.checkCode);
    this.pageCloseFullscreen();
  }
};

/***/ }),
/* 489 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _BVideos = __webpack_require__(113);

var _BVideos2 = _interopRequireDefault(_BVideos);

var _BChannels = __webpack_require__(167);

var _BChannels2 = _interopRequireDefault(_BChannels);

var _WProgressBarThrobber = __webpack_require__(438);

var _WProgressBarThrobber2 = _interopRequireDefault(_WProgressBarThrobber);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

var _utils = __webpack_require__(22);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'p-search',
  mixins: [_utils2.default],
  components: {
    BChannels: _BChannels2.default,
    BVideos: _BVideos2.default,
    WProgressBarThrobber: _WProgressBarThrobber2.default
  },
  data: function data() {
    return {
      channels: null,
      tvshows: null,
      videos: null,
      message: null,
      defaultLang: 'en',
      isHaveValue: false
    };
  },

  computed: {
    showSearchTrobber: function showSearchTrobber() {
      return this.$store.getters.getLoadingCount('search') > 0;
    },
    notEmptyChannels: function notEmptyChannels() {
      return this.channels !== null && this.channels.length !== 0;
    },
    notEmptyTvshows: function notEmptyTvshows() {
      return this.tvshows !== null && this.tvshows.length !== 0;
    },
    notEmptyVideos: function notEmptyVideos() {
      return this.videos !== null && this.videos.length !== 0;
    },
    hasContent: function hasContent() {
      return this.notEmptyChannels || this.notEmptyTvshows || this.notEmptyVideos;
    },
    connected: function connected() {
      return this.$store.getters.getConnectionStatus;
    }
  },
  activated: function activated() {
    _Metric2.default.getInstance().screenView('search');
    this.$root.$emit('focus', this.$el);
    this.$store.commit('setSpecialChannels', this.channels);
    this.defaultLang = this.$lang.getLang();
  },

  methods: {
    clearSearch: function clearSearch() {
      this.$refs.searchInput.value = '';
      this.isHaveValue = false;
      this.tvshows = null;
      this.videos = null;
      this.channels = null;
    },
    keyPressHandler: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(key) {
        var searchInput;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (key.code === 'Enter') {
                  searchInput = this.$refs.searchInput.value;

                  if (searchInput.length > 2) {
                    this.findContent(searchInput);
                  } else if (searchInput.length <= 2 && searchInput.length > 0) {
                    this.message = this.$lang.messages.search.more_letters;
                  } else {
                    this.message = this.$lang.messages.search.empty_field;
                  }
                } else {
                  this.message = null;
                }
                this.isHaveValue = this.$refs.searchInput.value.length > 0;

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function keyPressHandler(_x) {
        return _ref.apply(this, arguments);
      }

      return keyPressHandler;
    }(),
    closeSearchPage: function closeSearchPage() {
      this.$root.$emit('closeSearch');
    },
    keyboardReachBound: function keyboardReachBound(bound) {
      if (bound === 'left') {
        this.$root.$emit('focusMenu');
      }
      if (bound === 'bottom' && this.hasContent) {
        this.$root.$emit('focus', this.$refs.searchResults);
      }
    },
    findContent: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(text) {
        var content;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.channels = null;
                this.videos = null;
                this.tvshows = null;
                _context2.next = 5;
                return this.$backend.search.search(text);

              case 5:
                content = _context2.sent;

                this.channels = content.channels.map(function (x) {
                  return x.channel_id;
                });
                this.$store.commit('setSpecialChannels', this.channels);

                this.tvshows = this.arrayToItems(content.tvshows);
                this.videos = this.arrayToItems(content.videos);
                if (!this.hasContent) {
                  this.message = this.$lang.messages.search.not_found;
                }

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function findContent(_x2) {
        return _ref2.apply(this, arguments);
      }

      return findContent;
    }()
  }
};

/***/ }),
/* 490 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

var _PParentControl = __webpack_require__(829);

var _PParentControl2 = _interopRequireDefault(_PParentControl);

var _PDiagnostic = __webpack_require__(828);

var _PDiagnostic2 = _interopRequireDefault(_PDiagnostic);

var _PSettingsVideo = __webpack_require__(831);

var _PSettingsVideo2 = _interopRequireDefault(_PSettingsVideo);

var _PSettingsLocation = __webpack_require__(830);

var _PSettingsLocation2 = _interopRequireDefault(_PSettingsLocation);

var _PSpeedTest = __webpack_require__(832);

var _PSpeedTest2 = _interopRequireDefault(_PSpeedTest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    PDiagnostic: _PDiagnostic2.default,
    PParentControl: _PParentControl2.default,
    PSettingsVideo: _PSettingsVideo2.default,
    PSettingsLocation: _PSettingsLocation2.default,
    PSpeedTest: _PSpeedTest2.default
  },
  name: 'p-settings',
  props: ['tab'],
  computed: {
    authorized: function authorized() {
      return this.$store.getters.getAuthorized;
    },
    activeTab: function activeTab() {
      return this.tab ? this.tab : 'diagnostic';
    },
    connected: function connected() {
      return this.$store.getters.getConnectionStatus;
    },
    hasVideoSettings: function hasVideoSettings() {
      return this.$backend.settings.hasVideoSettings();
    }
  },
  methods: {
    gotoTab: function gotoTab(tab) {
      this.$router.push({
        name: 'Main',
        params: { page: 'settings' },
        query: { tab: tab }
      });
    }
  },
  created: function created() {},
  mounted: function mounted() {
    _Metric2.default.getInstance().screenView('settings');
    this.$root.$emit('focus', this.$el);
  }
};

/***/ }),
/* 491 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _EChannel = __webpack_require__(436);

var _EChannel2 = _interopRequireDefault(_EChannel);

var _WPlaceholder = __webpack_require__(33);

var _WPlaceholder2 = _interopRequireDefault(_WPlaceholder);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

var _utils = __webpack_require__(22);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SLEEP_DELAY = 200;

exports.default = {
  name: 'p-tv',
  props: ['channels', 'pageTitle'],
  mixins: [_utils2.default],
  components: {
    EChannel: _EChannel2.default,
    WPlaceholder: _WPlaceholder2.default
  },
  data: function data() {
    return {
      time: null,
      unsleepFrom: -11,
      unsleepTo: 12,
      ready: false
    };
  },

  computed: {
    showPlaceholder: function showPlaceholder() {
      return !this.ready;
    }
  },
  watch: {
    channels: function channels() {
      this.time = (0, _moment2.default)().unix();
    }
  },
  created: function created() {
    this.startTimeInterval();
  },
  mounted: function mounted() {
    var _this = this;

    setTimeout(function () {
      _this.ready = true;
      _this.$root.$emit('focus', _this.$el, true);
    }, 100);
  },
  activated: function activated() {
    _Metric2.default.getInstance().screenView('tv-navigator');
    this.startTimeInterval();
  },
  deactivated: function deactivated() {
    this.stopTimeInterval();
  },
  destroyed: function destroyed() {
    this.stopTimeInterval();
  },

  methods: {
    hideFilters: function hideFilters() {
      this.$root.$emit('hideFilters');
    },
    focusChannelHandler: function focusChannelHandler(id) {
      var _this2 = this;

      clearTimeout(this.refreshTimeoutId);
      this.refreshTimeoutId = setTimeout(function () {
        _this2.refreshTimeoutId = null;
        var index = _this2.channels.indexOf(id);
        var RANGE_FROM = -11;
        var RANGE_TO = 11;
        _this2.unsleepFrom = index + RANGE_FROM;
        _this2.unsleepTo = index + RANGE_TO;
      }, SLEEP_DELAY);
    }
  }
};

/***/ }),
/* 492 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(97);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _datetime = __webpack_require__(41);

var _datetime2 = _interopRequireDefault(_datetime);

var _EpgReader = __webpack_require__(78);

var _EpgReader2 = _interopRequireDefault(_EpgReader);

var _WPlaceholder = __webpack_require__(33);

var _WPlaceholder2 = _interopRequireDefault(_WPlaceholder);

var _EColumnChannel = __webpack_require__(802);

var _EColumnChannel2 = _interopRequireDefault(_EColumnChannel);

var _EColumnTvshow = __webpack_require__(803);

var _EColumnTvshow2 = _interopRequireDefault(_EColumnTvshow);

var _Video = __webpack_require__(96);

var _Video2 = _interopRequireDefault(_Video);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

var _utils = __webpack_require__(22);

var _utils2 = _interopRequireDefault(_utils);

var _fullscreen = __webpack_require__(117);

var _fullscreen2 = _interopRequireDefault(_fullscreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var epg = _EpgReader2.default.getInstance();

exports.default = {
  name: 'p-tv-column',
  props: ['channels'],
  mixins: [_datetime2.default, _utils2.default, _fullscreen2.default],
  components: {
    WPlaceholder: _WPlaceholder2.default,
    EColumnChannel: _EColumnChannel2.default,
    EColumnTvshow: _EColumnTvshow2.default
  },
  data: function data() {
    return {
      isActive: false,
      dates: [],
      tvshows: [],
      time: null,
      activeChannelId: null,
      activeDate: null,
      activeTvshow: null,
      title: '',
      description: '',
      ready: false,
      smoothScroll: true
    };
  },

  computed: {
    authorized: function authorized() {
      return this.$store.getters.getAuthorized;
    },
    volume: function volume() {
      return this.$store.getters.volume;
    },
    isAdultLocked: function isAdultLocked() {
      return this.isChannelAdultLocked(this.activeChannel);
    },
    isAvailable: function isAvailable() {
      return this.activeChannel ? this.activeChannel.available : null;
    },
    isPlayable: function isPlayable() {
      return this.isActive && this.isAvailable && !this.isAdultLocked;
    },
    showPlaceholder: function showPlaceholder() {
      return !this.ready;
    }
  },
  asyncComputed: {
    activeChannel: {
      get: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (this.activeChannelId) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt('return', null);

                case 2:
                  return _context.abrupt('return', this.$backend.content.getChannel(this.activeChannelId));

                case 3:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function get() {
          return _ref.apply(this, arguments);
        }

        return get;
      }(),
      watch: function watch() {
        return this.activeChannelId;
      }
    }
  },
  watch: {
    channels: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.autoSelectChannel();

              case 2:
                this.time = (0, _moment2.default)().unix();

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function channels() {
        return _ref2.apply(this, arguments);
      }

      return channels;
    }(),
    activeTvshow: function activeTvshow() {
      var _this = this;

      clearTimeout(this.activeTvshowTimerId);
      if (this.activeTvshow) {
        this.activeTvshowTimerId = setTimeout((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
          var tvshow, video;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return _this.$backend.content.getTvshow(_this.activeTvshow);

                case 2:
                  tvshow = _context3.sent;

                  _this.title = tvshow.title;
                  _context3.next = 6;
                  return epg.getVideoById(tvshow.video_id);

                case 6:
                  video = _context3.sent;

                  _this.description = video.description;

                case 8:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this);
        })), 500);
      } else {
        this.title = '';
        this.description = '';
      }
    },
    volume: function volume(value) {
      if (this.video) {
        this.video.volume = value / 100;
      }
    },
    isActive: function isActive(value) {
      if (value && this.activeChannel && this.isPlayable) {
        this.loadVideo();
      }
    },
    activeChannel: function activeChannel() {
      if (this.isActive) {
        if (this.isPlayable) {
          this.loadVideo();
        } else {
          this.video.stop();
        }
      }
    }
  },
  created: function created() {
    this.isHaveData = false;
    this.video = _Video2.default.getInstance();
    this.video.open();
    this.video.useHls = this.$backend.settings.getVideoUseHls();
    this.setViewPort();
    this.startTimeInterval();
    this.isActive = true;
    this.selectChannel(this.channels[0]);
  },
  mounted: function mounted() {
    var _this2 = this;

    setTimeout(function () {
      _this2.ready = true;
    }, 100);
  },
  activated: function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.autoSelectChannel();
              _Metric2.default.getInstance().screenView('tv-column');
              this.video = _Video2.default.getInstance();
              this.video.open();
              this.video.useHls = this.$backend.settings.getVideoUseHls();
              this.setViewPort();
              this.video.volume = this.volume / 100;
              this.isActive = true;
              this.startTimeInterval();

            case 9:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function activated() {
      return _ref4.apply(this, arguments);
    }

    return activated;
  }(),
  deactivated: function deactivated() {
    this.video.close(true);
    this.video.setViewPort(10, 10, 0, 0);
    this.video = null;
    this.stopTimeInterval();
    this.isActive = false;
  },
  destroyed: function destroyed() {
    this.stopTimeInterval();
    this.isActive = false;
    this.video.setViewPort(10, 10, 0, 0);
  },

  methods: {
    fullScreen: function fullScreen() {
      this.$router.push({
        name: 'PlayerLive',
        params: {
          load: false,
          channelId: this.activeChannelId
        }
      });
      this.openFullscreen();
    },
    hideFilter: function hideFilter() {
      this.$root.$emit('hideFilters');
    },
    autoSelectChannel: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        var _this3 = this;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this.ready) {
                  if (!this.activeChannelId || !this.channels.includes(this.activeChannelId)) {
                    this.selectChannel(this.channels[0]);
                  }
                  setTimeout(function () {
                    _this3.$root.$emit('focus', _this3.$refs['channel-active'][0].$el);
                  }, 0);
                }

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function autoSelectChannel() {
        return _ref5.apply(this, arguments);
      }

      return autoSelectChannel;
    }(),
    restoreViewPort: function restoreViewPort() {
      if (this.video) {
        this.video.setViewPort(0, 0, 0, 0);
      }
    },
    setViewPort: function setViewPort() {
      if (this.video) {
        this.video.setViewPort(59, 4, 18, 10.125);
      }
    },
    selectChannel: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(id) {
        var _ref7, _ref8, currentTvshow, currentDate;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(this.activeChannelId === id)) {
                  _context6.next = 4;
                  break;
                }

                this.$router.push({ name: 'PlayerLive', params: { load: false, channelId: id } });
                _context6.next = 21;
                break;

              case 4:
                this.activeChannelId = id;
                _context6.next = 7;
                return this.loadDates(id);

              case 7:
                _context6.next = 9;
                return epg.getNextTvshows(this.activeChannelId, this.time, 1);

              case 9:
                _ref7 = _context6.sent;
                _ref8 = (0, _slicedToArray3.default)(_ref7, 1);
                currentTvshow = _ref8[0];

                if (!currentTvshow) {
                  _context6.next = 19;
                  break;
                }

                currentDate = currentTvshow.date;
                _context6.next = 16;
                return this.selectDate(currentDate);

              case 16:
                this.activeTvshow = currentTvshow.tvshow_id;
                _context6.next = 21;
                break;

              case 19:
                this.tvshows = [];
                this.activeTvshow = null;

              case 21:
                this.scrollToActiveShow();

              case 22:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function selectChannel(_x) {
        return _ref6.apply(this, arguments);
      }

      return selectChannel;
    }(),
    scrollToActiveShow: function scrollToActiveShow() {
      setTimeout(function () {
        var element = document.getElementsByClassName('e-column-tvshow_active')[0];
        var container = document.getElementsByClassName('tv-column__scrollable')[1];
        container.scrollTo(0, 0);
        var elPos = element.getBoundingClientRect().top;
        var contHeight = container.getBoundingClientRect().height;
        container.scrollTo(0, elPos - contHeight / 2);
      }, 0);
    },
    loadDates: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return epg.getDatesByChannelId(this.activeChannelId);

              case 2:
                this.dates = _context7.sent;

              case 3:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function loadDates() {
        return _ref9.apply(this, arguments);
      }

      return loadDates;
    }(),
    selectDate: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(date) {
        var tvshows;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return epg.getTvshowsByDate(this.activeChannelId, date);

              case 2:
                tvshows = _context8.sent;

                this.activeDate = date;
                this.tvshows = tvshows;
                if (this.tvshows.length) {
                  this.smoothScroll = false;
                }

              case 6:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function selectDate(_x2) {
        return _ref10.apply(this, arguments);
      }

      return selectDate;
    }(),
    loadVideo: function () {
      var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
        var url;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (this.isActive) {
                  _context9.next = 2;
                  break;
                }

                return _context9.abrupt('return');

              case 2:
                _context9.next = 4;
                return this.getStreamUrl();

              case 4:
                url = _context9.sent;

                if (!(this.video.played && this.video.url === url)) {
                  _context9.next = 7;
                  break;
                }

                return _context9.abrupt('return');

              case 7:
                this.video.play(url);
                _Metric2.default.getInstance().event('tv-window', 'play', this.activeChannel.name + ' (#' + this.activeChannel.channel_id + ')');

              case 9:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function loadVideo() {
        return _ref11.apply(this, arguments);
      }

      return loadVideo;
    }(),
    getStreamUrl: function () {
      var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10() {
        var streamUrl, stream;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                streamUrl = this.activeChannel.stream_url;

                if (streamUrl) {
                  _context10.next = 13;
                  break;
                }

                _context10.prev = 2;
                _context10.next = 5;
                return this.$backend.stream.getChannel(this.activeChannel.channel_id);

              case 5:
                stream = _context10.sent;

                streamUrl = stream.stream_url;
                _context10.next = 13;
                break;

              case 9:
                _context10.prev = 9;
                _context10.t0 = _context10['catch'](2);

                console.error(_context10.t0);
                this.$nm.showMessage(_context10.t0.message);

              case 13:
                return _context10.abrupt('return', streamUrl);

              case 14:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this, [[2, 9]]);
      }));

      function getStreamUrl() {
        return _ref12.apply(this, arguments);
      }

      return getStreamUrl;
    }()
  }
};

/***/ }),
/* 493 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(43);

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = __webpack_require__(76);

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _hls = __webpack_require__(307);

var _hls2 = _interopRequireDefault(_hls);

var _BVideos = __webpack_require__(113);

var _BVideos2 = _interopRequireDefault(_BVideos);

var _WPlaceholder = __webpack_require__(33);

var _WPlaceholder2 = _interopRequireDefault(_WPlaceholder);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

var _datetime = __webpack_require__(41);

var _datetime2 = _interopRequireDefault(_datetime);

var _favorite = __webpack_require__(34);

var _favorite2 = _interopRequireDefault(_favorite);

var _frames = __webpack_require__(35);

var _frames2 = _interopRequireDefault(_frames);

var _utils = __webpack_require__(22);

var _utils2 = _interopRequireDefault(_utils);

var _images = __webpack_require__(42);

var _images2 = _interopRequireDefault(_images);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'p-video',
  props: ['type', 'id'],
  mixins: [_images2.default, _datetime2.default, _favorite2.default, _frames2.default, _utils2.default],
  components: {
    BVideos: _BVideos2.default,
    WPlaceholder: _WPlaceholder2.default
  },
  data: function data() {
    return {
      video: null,
      tvshow: null,
      channel: null,
      series: [],
      seasonSelect: 0,
      showPlaceholder: true,
      isAvailable: true
    };
  },
  created: function created() {
    this.showPlaceholder = true;
    this.video = null;
    this.tvshow = null;
    this.channel = null;
    this.series = [];
    this.seasonSelect = 0;
    this.updateVideoInfo();
    console.log(this.id);
  },
  activated: function activated() {
    _Metric2.default.getInstance().screenView('video');
  },

  computed: {
    name: function name() {
      if (this.video && this.video.name.length) {
        return this.video.name;
      }
      if (this.tvshow) {
        return this.tvshow.title;
      }
      return '-';
    },
    time: function time() {
      return (0, _moment2.default)().unix();
    },
    art: function art() {
      if (this.video.art && this.video.art.length) {
        return this.video.art;
      }
      if (this.video.cover && this.video.cover.length) {
        return this.video.cover;
      }
      if (this.tvshow) {
        return this.getTvshowFrame(this.tvshow);
      }
      return null;
    },
    duration: function duration() {
      if (this.tvshow) {
        return Math.round((this.tvshow.stop - this.tvshow.start) / 60);
      }
      return this.video.duration;
    },
    startTime: function startTime() {
      if (this.tvshow) {
        return this.getMoment(this.tvshow.start).calendar().toLowerCase();
      }
      return '-';
    },
    isPlayable: function isPlayable() {
      switch (this.type) {
        case 'video':
          return true;
        case 'tvshow':
          return this.tvshow.stop < this.time && this.tvshow.start > this.time - this.channel.dvr_sec;
        default:
          return false;
      }
    },
    canFavorite: function canFavorite() {
      return this.isPlayable || this.type === 'tvshow' && this.time < this.tvshow.stop;
    },
    isFavorite: function isFavorite() {
      return this.checkFavorite(this.id, this.type);
    },
    showBack: function showBack() {
      return !this.canFavorite && !this.isPlayable;
    },
    authorized: function authorized() {
      return this.$store.getters.getAuthorized;
    }
  },
  asyncComputed: {
    cover: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var cover;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.video) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', '');

              case 2:
                cover = this.video.cover;

                if (!((!cover || !cover.length) && this.tvshow)) {
                  _context.next = 7;
                  break;
                }

                _context.next = 6;
                return this.getTvshowFrame(this.tvshow, 'resize', 512);

              case 6:
                cover = _context.sent;

              case 7:
                return _context.abrupt('return', cover);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function cover() {
        return _ref.apply(this, arguments);
      }

      return cover;
    }()
  },
  methods: {
    clearGenre: function clearGenre(genre) {
      if (genre) {
        var genreSplit = genre.split(') ');
        if (genreSplit[1]) return genreSplit[1];
        return genre;
      }return null;
    },
    showActorInfo: function showActorInfo(person) {
      this.$router.push({
        name: 'Main',
        params: { page: 'actor-info' },
        query: { id: person.person_id }
      });
    },
    getSubscription: function getSubscription() {
      this.$router.push({ name: 'Main', params: { page: 'account' } });
    },
    login: function login() {
      this.$router.push({ name: 'Main', params: { page: 'login' } });
    },
    updateVideoInfo: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var _this = this;

        var videoId, streamData, streamUrl, hls;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.type === 'tvshow')) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 3;
                return this.$backend.content.getTvshow(this.id);

              case 3:
                this.tvshow = _context2.sent;
                _context2.next = 6;
                return this.$backend.content.getChannel(this.tvshow.channel_id);

              case 6:
                this.channel = _context2.sent;

                this.isAvailable = this.channel.available;
                _context2.next = 12;
                break;

              case 10:
                this.tvshow = null;
                this.channel = null;

              case 12:
                videoId = this.type === 'video' ? this.id : this.tvshow.video_id;
                _context2.next = 15;
                return this.$backend.content.getVideo(videoId);

              case 15:
                this.video = _context2.sent;
                _context2.next = 18;
                return _promise2.default.all(this.video.genres.map(function (id) {
                  return _this.$backend.categories.getGenreName(id);
                }));

              case 18:
                this.video.genres = _context2.sent;

                this.showPlaceholder = false;
                _context2.next = 22;
                return this.castConvert();

              case 22:
                this.getSeasons();

                if (!this.authorized) {
                  _context2.next = 41;
                  break;
                }

                streamData = void 0;

                if (!(this.type === 'video')) {
                  _context2.next = 31;
                  break;
                }

                _context2.next = 28;
                return this.$backend.stream.getVideo(this.id);

              case 28:
                streamData = _context2.sent;
                _context2.next = 37;
                break;

              case 31:
                if (!(this.type === 'tvshow')) {
                  _context2.next = 37;
                  break;
                }

                console.log(this.id);
                _context2.next = 35;
                return this.$backend.stream.getTvshow(+this.id);

              case 35:
                streamData = _context2.sent;

                console.log(streamData);

              case 37:
                streamUrl = streamData.stream_url;
                hls = new _hls2.default();

                hls.loadSource(streamUrl);
                hls.on(_hls2.default.Events.ERROR, function () {
                  _this.isAvailable = false;
                });

              case 41:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updateVideoInfo() {
        return _ref2.apply(this, arguments);
      }

      return updateVideoInfo;
    }(),
    showVideo: function showVideo() {
      var id = this.id;
      var type = this.type;
      if (this.video.is_series && this.series.length) {
        var firstSerie = this.series[0];
        id = firstSerie.id;
        type = firstSerie.type;
      }
      this.$router.push({ name: 'PlayerVideo', params: { type: type, id: id } });
    },
    castConvert: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var actors, directors;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.video.cast && this.video.cast.length)) {
                  _context3.next = 5;
                  break;
                }

                _context3.next = 3;
                return this.$backend.content.getPerson(this.video.cast);

              case 3:
                actors = _context3.sent;

                this.video.cast = actors.persons;

              case 5:
                if (!(this.video.director && this.video.director.length)) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 8;
                return this.$backend.content.getPerson(this.video.director);

              case 8:
                directors = _context3.sent;

                this.video.director = directors.persons;

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function castConvert() {
        return _ref3.apply(this, arguments);
      }

      return castConvert;
    }(),
    getSeasons: function getSeasons() {
      if (this.video.is_series) {
        var episodes = this.video.episodes;
        var seasons = _lodash2.default.uniq(episodes.map(function (s) {
          return s.season;
        })).sort();
        this.video.seasons = seasons;
        this.openSeason(seasons[0]);
      }
    },
    openSeason: function openSeason(season) {
      var _this2 = this;

      this.series = [];
      setTimeout(function () {
        _this2.series = _this2.arrayToItems(_this2.video.episodes.filter(function (e) {
          return e.season === season;
        }).sort(function (a, b) {
          return a.episode.localeCompare(b.episode);
        }));
        _this2.seasonSelect = season;
      }, 200);
    },
    addFavorite: function addFavorite() {
      this.addToFavorite(this.id, this.type);
    },
    removeFavorite: function removeFavorite() {
      this.removeFromFavorite(this.id, this.type);
    },
    back: function back() {
      this.$root.$emit('navigateBack');
    }
  },
  watch: {
    id: function id() {
      this.updateVideoInfo();
    }
  }
};

/***/ }),
/* 494 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(44);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _WPlaceholder = __webpack_require__(33);

var _WPlaceholder2 = _interopRequireDefault(_WPlaceholder);

var _EVideo = __webpack_require__(77);

var _EVideo2 = _interopRequireDefault(_EVideo);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

var _utils = __webpack_require__(22);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'p-video-cartoons',
  props: {
    genreId: {
      default: null
    },
    pageTitle: {
      default: 'Мультфильмы'
    }
  },
  mixins: [_utils2.default],
  components: {
    WPlaceholder: _WPlaceholder2.default,
    EVideo: _EVideo2.default
  },
  data: function data() {
    return {
      items: [],
      sort: 'last',
      order: 'desc',
      categoryId: 3,
      pageSize: 40,
      showPlaceholder: true,
      showLoadMoreButton: false,
      isHaveData: false,
      isNeedWatchUpdater: true,
      title: 'Мультфильмы'
    };
  },

  watch: {
    connected: function connected() {
      if (!this.isHaveData && this.connected) {
        this.loadData();
      }
    },
    genreId: function genreId() {
      this.loadData();
    },
    pageTitle: function pageTitle(value) {
      if (value.split(') ')[1]) {
        this.title = value.split(') ')[1];
      } else {
        this.title = value;
      }
    }
  },
  computed: {
    connected: function connected() {
      return this.$store.getters.getConnectionStatus;
    }
  },
  created: function created() {
    this.$root.$on('bottomIsClose', this.loadVideo);
  },
  activated: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _Metric2.default.getInstance().screenView('videos');
              if (this.connected && !this.isHaveData) {
                this.loadData();
              }

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function activated() {
      return _ref.apply(this, arguments);
    }

    return activated;
  }(),

  methods: {
    loadData: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.isNeedWatchUpdater) {
                  _context2.next = 8;
                  break;
                }

                this.isNeedWatchUpdater = false;
                this.items = [];
                _context2.next = 5;
                return this.loadVideo();

              case 5:
                this.contentReady();
                this.isHaveData = true;
                this.isNeedWatchUpdater = true;

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadData() {
        return _ref2.apply(this, arguments);
      }

      return loadData;
    }(),
    hideFilter: function hideFilter() {
      this.$root.$emit('hideFilters');
    },
    contentReady: function contentReady() {
      this.showPlaceholder = false;
    },
    loadVideo: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var count, result;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                count = this.items.length;
                _context3.next = 3;
                return this.$backend.content.getVideos({ category_id: this.categoryId, genre_id: +this.$route.query.tag }, this.sort, this.order, count, this.pageSize);

              case 3:
                result = _context3.sent;

                if (result.videos.length) {
                  this.items = [].concat((0, _toConsumableArray3.default)(this.items), (0, _toConsumableArray3.default)(this.arrayToItems(result.videos)));
                }

                this.showLoadMoreButton = result.videos.length + count < result.total;

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function loadVideo() {
        return _ref3.apply(this, arguments);
      }

      return loadVideo;
    }()
  }
};

/***/ }),
/* 495 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(44);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _WPlaceholder = __webpack_require__(33);

var _WPlaceholder2 = _interopRequireDefault(_WPlaceholder);

var _EVideo = __webpack_require__(77);

var _EVideo2 = _interopRequireDefault(_EVideo);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

var _utils = __webpack_require__(22);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'p-video-films',
  props: {
    genreId: {
      default: null
    },
    pageTitle: {
      default: 'Фильмы'
    }
  },
  mixins: [_utils2.default],
  components: {
    WPlaceholder: _WPlaceholder2.default,
    EVideo: _EVideo2.default
  },
  data: function data() {
    return {
      items: [],
      sort: 'last',
      order: 'desc',
      pageSize: 40,
      categoryId: 1,
      showPlaceholder: true,
      showLoadMoreButton: false,
      isHaveData: false,
      isNeedWatchUpdater: true,
      title: 'Фильмы'
    };
  },

  watch: {
    connected: function connected() {
      if (!this.isHaveData && this.connected) {
        this.loadData();
      }
    },
    genreId: function genreId() {
      this.loadData();
    },
    pageTitle: function pageTitle(value) {
      if (value.split(') ')[1]) {
        this.title = value.split(') ')[1];
      } else {
        this.title = value;
      }
    }
  },
  computed: {
    connected: function connected() {
      return this.$store.getters.getConnectionStatus;
    }
  },
  created: function created() {
    this.$root.$on('bottomIsClose', this.loadVideo);
  },
  activated: function activated() {
    _Metric2.default.getInstance().screenView('videos');
    if (this.connected && !this.isHaveData) {
      this.loadData();
    }
  },

  methods: {
    hideFilter: function hideFilter() {
      this.$root.$emit('hideFilters');
    },
    loadData: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.isNeedWatchUpdater) {
                  _context.next = 8;
                  break;
                }

                this.isNeedWatchUpdater = false;
                this.items = [];
                _context.next = 5;
                return this.loadVideo();

              case 5:
                this.contentReady();
                this.isHaveData = true;
                this.isNeedWatchUpdater = true;

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData() {
        return _ref.apply(this, arguments);
      }

      return loadData;
    }(),
    contentReady: function contentReady() {
      this.showPlaceholder = false;
    },
    loadVideo: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var count, result;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                count = this.items.length;
                _context2.next = 3;
                return this.$backend.content.getVideos({ category_id: this.categoryId, genre_id: +this.$route.query.tag }, this.sort, this.order, count, this.pageSize);

              case 3:
                result = _context2.sent;

                if (result.videos.length) {
                  this.items = [].concat((0, _toConsumableArray3.default)(this.items), (0, _toConsumableArray3.default)(this.arrayToItems(result.videos)));
                }
                this.showLoadMoreButton = result.videos.length + count < result.total;

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadVideo() {
        return _ref2.apply(this, arguments);
      }

      return loadVideo;
    }()
  }
};

/***/ }),
/* 496 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(44);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _WPlaceholder = __webpack_require__(33);

var _WPlaceholder2 = _interopRequireDefault(_WPlaceholder);

var _EVideo = __webpack_require__(77);

var _EVideo2 = _interopRequireDefault(_EVideo);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

var _utils = __webpack_require__(22);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'p-video-series',
  props: {
    genreId: {
      default: null
    },
    pageTitle: {
      default: 'Сериалы'
    }
  },
  mixins: [_utils2.default],
  components: {
    WPlaceholder: _WPlaceholder2.default,
    EVideo: _EVideo2.default
  },
  data: function data() {
    return {
      items: [],
      sort: 'last',
      order: 'desc',
      categoryId: 2,
      pageSize: 40,
      showPlaceholder: true,
      showLoadMoreButton: false,
      isHaveData: false,
      isNeedWatchUpdater: true,
      title: 'Сериалы'
    };
  },

  watch: {
    connected: function connected() {
      if (!this.isHaveData && this.connected) {
        this.loadData();
      }
    },
    genreId: function genreId() {
      this.loadData();
    },
    pageTitle: function pageTitle(value) {
      if (value.split(') ')[1]) {
        this.title = value.split(') ')[1];
      } else {
        this.title = value;
      }
    }
  },
  computed: {
    connected: function connected() {
      return this.$store.getters.getConnectionStatus;
    }
  },
  activated: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _Metric2.default.getInstance().screenView('videos');
              if (this.connected && !this.isHaveData) {
                this.loadData();
              }

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function activated() {
      return _ref.apply(this, arguments);
    }

    return activated;
  }(),
  created: function created() {
    this.$root.$on('bottomIsClose', this.loadVideo);
  },

  methods: {
    hideFilter: function hideFilter() {
      this.$root.$emit('hideFilters');
    },
    loadData: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.isNeedWatchUpdater) {
                  _context2.next = 8;
                  break;
                }

                this.isNeedWatchUpdater = false;
                this.items = [];
                _context2.next = 5;
                return this.loadVideo();

              case 5:
                this.contentReady();
                this.isHaveData = true;
                this.isNeedWatchUpdater = true;

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadData() {
        return _ref2.apply(this, arguments);
      }

      return loadData;
    }(),
    contentReady: function contentReady() {
      this.showPlaceholder = false;
    },
    loadVideo: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var count, result;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                count = this.items.length;
                _context3.next = 3;
                return this.$backend.content.getVideos({ category_id: this.categoryId, genre_id: this.genreId }, this.sort, this.order, count, this.pageSize);

              case 3:
                result = _context3.sent;

                if (result.videos.length) {
                  this.items = [].concat((0, _toConsumableArray3.default)(this.items), (0, _toConsumableArray3.default)(this.arrayToItems(result.videos)));
                }
                this.showLoadMoreButton = result.videos.length + count < result.total;

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function loadVideo() {
        return _ref3.apply(this, arguments);
      }

      return loadVideo;
    }()
  }
};

/***/ }),
/* 497 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(44);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _WPlaceholder = __webpack_require__(33);

var _WPlaceholder2 = _interopRequireDefault(_WPlaceholder);

var _EVideo = __webpack_require__(77);

var _EVideo2 = _interopRequireDefault(_EVideo);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

var _utils = __webpack_require__(22);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'p-video-shows',
  props: {
    genreId: {
      default: null
    },
    pageTitle: {
      default: 'Передачи'
    }
  },
  mixins: [_utils2.default],
  components: {
    WPlaceholder: _WPlaceholder2.default,
    EVideo: _EVideo2.default
  },
  data: function data() {
    return {
      items: [],
      sort: 'last',
      order: 'desc',
      categoryId: 4,
      pageSize: 40,
      showPlaceholder: true,
      showLoadMoreButton: false,
      isHaveData: false,
      title: 'Передачи'
    };
  },

  watch: {
    connected: function connected() {
      if (!this.isHaveData && this.connected) {
        this.loadData();
      }
    },
    categoryId: function categoryId() {
      this.items = [];
      this.loadVideo();
    },
    genreId: function genreId() {
      this.items = [];
      this.loadVideo();
    },
    pageTitle: function pageTitle(value) {
      if (value.split(') ')[1]) {
        this.title = value.split(') ')[1];
      } else {
        this.title = value;
      }
    }
  },
  computed: {
    connected: function connected() {
      return this.$store.getters.getConnectionStatus;
    }
  },
  activated: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _Metric2.default.getInstance().screenView('videos');
              this.$root.$emit('focus', this.$el);
              if (this.connected && !this.isHaveData) {
                this.loadData();
              }

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function activated() {
      return _ref.apply(this, arguments);
    }

    return activated;
  }(),
  created: function created() {
    this.$root.$on('bottomIsClose', this.loadVideo);
  },

  methods: {
    hideFilter: function hideFilter() {
      this.$root.$emit('hideFilters');
    },
    loadData: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.loadVideo();

              case 2:
                this.contentReady();
                this.$root.$emit('focus', this.$el);
                this.isHaveData = true;

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadData() {
        return _ref2.apply(this, arguments);
      }

      return loadData;
    }(),
    contentReady: function contentReady() {
      var _this = this;

      this.showPlaceholder = false;
      setTimeout(function () {
        _this.$root.$emit('focus', _this.$el);
      }, 0);
    },
    loadVideo: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var _this2 = this;

        var count, result;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                count = this.items.length;
                _context3.next = 3;
                return this.$backend.content.getVideos({ category_id: this.categoryId, genre_id: this.genreId }, this.sort, this.order, count, this.pageSize);

              case 3:
                result = _context3.sent;

                if (result.videos.length) {
                  this.items = [].concat((0, _toConsumableArray3.default)(this.items), (0, _toConsumableArray3.default)(this.arrayToItems(result.videos)));
                  setTimeout(function () {
                    _this2.$root.$emit('focus', _this2.$el.querySelectorAll('.p-video__list-item')[count]);
                  }, 0);
                }

                this.showLoadMoreButton = result.videos.length + count < result.total;

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function loadVideo() {
        return _ref3.apply(this, arguments);
      }

      return loadVideo;
    }()
  }
};

/***/ }),
/* 498 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

var _dialogs = __webpack_require__(95);

var _dialogs2 = _interopRequireDefault(_dialogs);

var _WButton = __webpack_require__(59);

var _WButton2 = _interopRequireDefault(_WButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'p-profile',
  components: { WButton: _WButton2.default },
  mixins: [_dialogs2.default],
  data: function data() {
    return {
      userInfo: {},
      isShowConfirmModal: false
    };
  },
  created: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.$backend.account.getInfo();

            case 2:
              this.userInfo = _context.sent;

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function created() {
      return _ref.apply(this, arguments);
    }

    return created;
  }(),
  mounted: function mounted() {
    _Metric2.default.getInstance().screenView('account/profile');
  },

  methods: {
    toggleModal: function toggleModal() {
      this.isShowConfirmModal = !this.isShowConfirmModal;
    },
    logout: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.$backend.account.logout();
                this.$store.commit('authorized', false);
                this.$router.push({ name: 'Main', params: { page: 'home' } });
                this.$nm.showMessage(this.$lang.messages.account.afterLogout, 5000);
                this.$backend.clear();
                this.toggleModal();

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function logout() {
        return _ref2.apply(this, arguments);
      }

      return logout;
    }()
  }
};

/***/ }),
/* 499 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

var _qrcodeSvg = __webpack_require__(755);

var _qrcodeSvg2 = _interopRequireDefault(_qrcodeSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'p-purchases',
  data: function data() {
    return {
      options: null,
      products: null,
      paySystems: null,
      selectedProductId: null,
      selectedProductOptionId: null
    };
  },

  computed: {
    productOptions: function productOptions() {
      var _this = this;

      if (this.selectedProductId) {
        return this.products.find(function (x) {
          return x.product_id === _this.selectedProductId;
        }).options;
      }
      return null;
    }
  },
  watch: {
    selectedProductId: function selectedProductId() {
      this.selectedProductOptionId = null;
    }
  },
  created: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.load();

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function created() {
      return _ref.apply(this, arguments);
    }

    return created;
  }(),
  mounted: function mounted() {
    _Metric2.default.getInstance().screenView('account/purchases');
  },

  methods: {
    showOptions: function showOptions(id) {
      this.selectedProductId = id;
      this.scrollToBottom();
    },
    showPayWays: function showPayWays(id) {
      this.selectedProductOptionId = id;
      this.scrollToBottom();
    },
    scrollToBottom: function scrollToBottom() {
      setTimeout(function () {
        var block = document.getElementsByClassName('p-account__page')[0];
        block.scrollTo(0, 5000);
      }, 300);
    },
    createPayment: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(paySys) {
        var res, svg;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.$backend.billing.createPayment([this.selectedProductOptionId], paySys);

              case 3:
                res = _context2.sent;

                if (res.description) {
                  this.$nm.showModal('simple', '<span style="white-space: pre-line">' + res.description + '</span>');
                } else {
                  svg = new _qrcodeSvg2.default(res.payment_page_url).svg();

                  this.$nm.showModal('simple', '<div style="margin-bottom: 1rem;">\u0414\u043B\u044F \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u044F \u043E\u043F\u043B\u0430\u0442\u044B, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430 \u043F\u0440\u043E\u0441\u043A\u0430\u043D\u0438\u0440\u0443\u0439\u0442\u0435 QR-\u043A\u043E\u0434:</div>' + svg + '<div style="margin-top: 1rem;">\u042D\u0442\u043E \u043C\u043E\u0436\u043D\u043E \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043A\u0430\u043C\u0435\u0440\u044B \u0432 iPhone \u0438\u043B\u0438 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F QR Code Reader \u0434\u043B\u044F Android.</div>');
                }
                _context2.next = 10;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2['catch'](0);

                this.$nm.showError(_context2.t0, 0);

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function createPayment(_x) {
        return _ref2.apply(this, arguments);
      }

      return createPayment;
    }(),
    load: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var res;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.$backend.billing.getProducts();

              case 3:
                res = _context3.sent;

                this.products = res.products;
                this.paySystems = res.pay_sys;
                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3['catch'](0);

                this.$nm.showError(_context3.t0, 0);

              case 11:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 8]]);
      }));

      function load() {
        return _ref3.apply(this, arguments);
      }

      return load;
    }()
  }
};

/***/ }),
/* 500 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _datetime = __webpack_require__(41);

var _datetime2 = _interopRequireDefault(_datetime);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'p-subscriptions',
  mixins: [_datetime2.default],
  data: function data() {
    return {
      subscriptions: null
    };
  },
  created: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.getSubscriptions();

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function created() {
      return _ref.apply(this, arguments);
    }

    return created;
  }(),
  mounted: function mounted() {
    _Metric2.default.getInstance().screenView('account/subscriptions');
  },

  methods: {
    getDayLeft: function getDayLeft(expiredDatetime) {
      var expiredMoment = (0, _moment2.default)(expiredDatetime);
      if (expiredMoment.unix() < (0, _moment2.default)().unix()) {
        return false;
      }
      return expiredMoment.fromNow(true);
    },
    getSubscriptions: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.$backend.billing.getSubscriptions();

              case 3:
                this.subscriptions = _context2.sent;
                _context2.next = 9;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2['catch'](0);

                this.$nm.showError(_context2.t0, 0);

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 6]]);
      }));

      function getSubscriptions() {
        return _ref2.apply(this, arguments);
      }

      return getSubscriptions;
    }()
  }
};

/***/ }),
/* 501 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _DeviceInfo = __webpack_require__(63);

var _DeviceInfo2 = _interopRequireDefault(_DeviceInfo);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

var _EpgManager = __webpack_require__(118);

var _EpgManager2 = _interopRequireDefault(_EpgManager);

var _WButton = __webpack_require__(59);

var _WButton2 = _interopRequireDefault(_WButton);

var _dialogs = __webpack_require__(95);

var _dialogs2 = _interopRequireDefault(_dialogs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var epgManager = _EpgManager2.default.getInstance();

exports.default = {
  name: 'p-diagnostic',
  props: [],
  mixins: [_dialogs2.default],
  components: { WButton: _WButton2.default },
  data: function data() {
    return {
      info: {
        vendor: null,
        model: null,
        target: null,
        resolution: null,
        uuid: null,
        build: null
      }
    };
  },

  computed: {
    connected: function connected() {
      return this.$store.getters.getConnectionStatus;
    },
    authorized: function authorized() {
      return this.$store.getters.getAuthorized;
    }
  },
  methods: {
    resetAll: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var isValid;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.authorized) {
                  _context.next = 7;
                  break;
                }

                _context.next = 3;
                return this.checkPin('parentCtrl.action');

              case 3:
                isValid = _context.sent;

                if (isValid) {
                  this.reset();
                }
                _context.next = 8;
                break;

              case 7:
                this.reset();

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function resetAll() {
        return _ref.apply(this, arguments);
      }

      return resetAll;
    }(),
    reset: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.$crazyMonkey.enabled) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 3;
                return epgManager.deleteEpg();

              case 3:
                this.$backend.reset();
                this.$root.$emit('afterReset');

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function reset() {
        return _ref2.apply(this, arguments);
      }

      return reset;
    }(),
    sync: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var title, isValid;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                title = this.$lang.messages.parentCtrl.action;
                _context3.next = 3;
                return this.checkPin(title);

              case 3:
                isValid = _context3.sent;

                if (isValid) {
                  epgManager.updateEpg();
                  this.$backend.clear();
                  this.syncVuexWithBackend();
                }

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function sync() {
        return _ref3.apply(this, arguments);
      }

      return sync;
    }(),
    reloadApp: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.$crazyMonkey.enabled) {
                  this.$router.push('/');
                  window.location.reload();
                }

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function reloadApp() {
        return _ref4.apply(this, arguments);
      }

      return reloadApp;
    }(),
    getInfo: function getInfo() {
      this.getDeviceInfo();
      this.getUuid();
      var env = __webpack_require__.i({"NODE_ENV":"production","BUILD_DATE":"201810240919","BUILD_NUMBER":'N/A'});
      var buildNumber = env.BUILD_NUMBER ? '#' + env.BUILD_NUMBER : 'N/A';
      this.info.build = buildNumber + ' (' + env.BUILD_DATE + ')';
      this.info.resolution = this.device.display.width + 'x' + this.device.display.height;
    },
    getDeviceInfo: function getDeviceInfo() {
      var di = this.device;
      this.info.vendor = di.vendor;
      this.info.model = di.model;
      this.info.target = di.engine;
    },
    getUuid: function getUuid() {
      var uuid = this.device.uuid;
      if (uuid === null) {
        uuid = this.device.getUuid();
      }
      this.info.uuid = uuid;
    }
  },
  created: function created() {
    this.device = _DeviceInfo2.default.getInstance();
    this.getInfo();
  },
  mounted: function mounted() {
    _Metric2.default.getInstance().screenView('settings/diagnostic');
  }
};

/***/ }),
/* 502 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

var _WSettingsItem = __webpack_require__(441);

var _WSettingsItem2 = _interopRequireDefault(_WSettingsItem);

var _WFormCheckbox = __webpack_require__(440);

var _WFormCheckbox2 = _interopRequireDefault(_WFormCheckbox);

var _dialogs = __webpack_require__(95);

var _dialogs2 = _interopRequireDefault(_dialogs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'p-parent-control',
  mixins: [_dialogs2.default],
  components: {
    WFormCheckbox: _WFormCheckbox2.default,
    WSettingsItem: _WSettingsItem2.default
  },
  data: function data() {
    return {
      parentControl: this.$backend.settings.getParentControl()
    };
  },

  methods: {
    toggleParentControl: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var valid;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.$crazyMonkey.enabled) {
                  _context.next = 10;
                  break;
                }

                if (this.parentControl) {
                  _context.next = 6;
                  break;
                }

                this.parentControl = true;
                this.$backend.settings.setParentControl(this.parentControl);
                _context.next = 10;
                break;

              case 6:
                _context.next = 8;
                return this.checkPinOrPassword('parentCtrl.action');

              case 8:
                valid = _context.sent;

                if (valid) {
                  this.parentControl = false;
                  this.$backend.settings.setParentControl(this.parentControl);
                }

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function toggleParentControl() {
        return _ref.apply(this, arguments);
      }

      return toggleParentControl;
    }(),
    changePin: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var isValid, newPin;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.$crazyMonkey.enabled) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 3;
                return this.checkPinOrPassword('parentCtrl.enter_old_pin');

              case 3:
                isValid = _context2.sent;

                if (!isValid) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 7;
                return this.prompt('parentCtrl.enter_new_pin', 'pin', 4);

              case 7:
                newPin = _context2.sent;

                if (!newPin) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 11;
                return this.$backend.account.setPin(newPin);

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function changePin() {
        return _ref2.apply(this, arguments);
      }

      return changePin;
    }()
  },
  mounted: function mounted() {
    _Metric2.default.getInstance().screenView('settings/parent-control');
  }
};

/***/ }),
/* 503 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'p-settings-location',
  props: [],
  data: function data() {
    return {};
  },

  computed: {
    curLang: function curLang() {
      return this.$lang.getLang();
    }
  },
  methods: {
    changeLocalization: function changeLocalization(lang) {
      if (lang !== this.curLang) {
        this.$lang.setLang(lang);
      }
    }
  }
};

/***/ }),
/* 504 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

var _WSettingsItem = __webpack_require__(441);

var _WSettingsItem2 = _interopRequireDefault(_WSettingsItem);

var _WFormCheckbox = __webpack_require__(440);

var _WFormCheckbox2 = _interopRequireDefault(_WFormCheckbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    WFormCheckbox: _WFormCheckbox2.default,
    WSettingsItem: _WSettingsItem2.default
  },
  name: 'p-settings-video',
  props: [],
  data: function data() {
    return {
      useHls: this.$backend.settings.getVideoUseHls()
    };
  },

  methods: {
    toggleUseHls: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.useHls = !this.useHls;
                this.$backend.settings.setVideoUseHls(this.useHls);

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function toggleUseHls() {
        return _ref.apply(this, arguments);
      }

      return toggleUseHls;
    }()
  },
  mounted: function mounted() {
    _Metric2.default.getInstance().screenView('settings/video');
  }
};

/***/ }),
/* 505 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _WButton = __webpack_require__(59);

var _WButton2 = _interopRequireDefault(_WButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'p-speed-test',
  props: [],
  components: { WButton: _WButton2.default },
  data: function data() {
    return {
      timeInterval: null,
      dots: null,
      sendWay: {
        by: false,
        other: false,
        internet: false
      },
      activeDotPosition: 0,
      downloadSize: 1986284,
      speed: {
        by: null,
        other: null,
        internet: null
      },
      countryCode: null
    };
  },

  computed: {
    curLang: function curLang() {
      return this.$lang.getLang();
    },
    isSendData: function isSendData() {
      if (!this.sendWay.by && !this.sendWay.other && !this.sendWay.internet) return false;
      return true;
    }
  },
  created: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.dots = document.getElementsByClassName('loading-line__dot');

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function created() {
      return _ref.apply(this, arguments);
    }

    return created;
  }(),

  methods: {
    getImageUrl: function getImageUrl(loc) {
      var urlBy = 'https://sttv.persik.by/speedtest/random1000x1000.jpg';
      var urlOther = 'http://vod.persik.by/speedtest/random1000x1000.jpg';
      var urlInt = 'http://sttv.persik.tv/speedtest/random1000x1000.jpg';
      switch (loc) {
        case 'by':
          return urlBy;

        case 'other':
          return urlOther;

        case 'internet':
          return urlInt;

        default:
          return urlInt;
      }
    },
    startTest: function startTest(loc) {
      this.initiateSpeedDetection(loc);
    },
    initiateSpeedDetection: function initiateSpeedDetection(loc) {
      var _this = this;

      this.startDotCounter();
      this.sendWay[loc] = true;
      setTimeout(function () {
        _this.measureConnectionSpeed(loc);
      }, 1);
    },
    showAlert: function showAlert() {
      this.$nm.showMessage('Дождитесь завершения теста', 5000);
    },
    measureConnectionSpeed: function measureConnectionSpeed(loc) {
      var _this2 = this;

      var endTime = void 0;
      var download = new Image();
      var startTime = new Date().getTime();
      download.onload = function () {
        endTime = new Date().getTime();
        _this2.showResults(endTime, startTime, loc);
        _this2.sendWay[loc] = false;
        _this2.stopDotCounter();
      };
      var cacheBuster = '?'.concat(startTime);
      download.src = this.getImageUrl(loc) + cacheBuster;
    },
    showResults: function showResults(endTime, startTime, loc) {
      var duration = (endTime - startTime) / 1000;
      var bitsLoaded = this.downloadSize * 8;
      var speedBps = (bitsLoaded / duration).toFixed(2);
      var speedKbps = (speedBps / 1024).toFixed(2);
      var speedMbps = (speedKbps / 1024).toFixed(2);
      this.speed[loc] = speedMbps;
    },
    startDotCounter: function startDotCounter() {
      this.downLoading();
    },
    stopDotCounter: function stopDotCounter() {
      clearInterval(this.timeInterval);
      for (var i = 0; i < this.dots.length; i += 1) {
        this.dots[i].className = 'loading-line__dot';
      }
    },
    upLoading: function upLoading() {
      var _this3 = this;

      this.timeInterval = setInterval(function () {
        if (_this3.activeDotPosition > 0) {
          if (_this3.dots[_this3.activeDotPosition + 1]) {
            _this3.dots[_this3.activeDotPosition + 1].className = 'loading-line__dot loading-line__dot_active';
          }
          _this3.dots[_this3.activeDotPosition].className = 'loading-line__dot loading-line__dot_active checked';
          _this3.activeDotPosition -= 1;
        } else {
          clearInterval(_this3.timeInterval);
          _this3.downLoading();
        }
      }, 100);
    },
    downLoading: function downLoading() {
      var _this4 = this;

      this.timeInterval = setInterval(function () {
        if (_this4.activeDotPosition < _this4.dots.length - 1) {
          if (_this4.dots[_this4.activeDotPosition - 1]) {
            _this4.dots[_this4.activeDotPosition - 1].className = 'loading-line__dot loading-line__dot_active';
          }
          _this4.dots[_this4.activeDotPosition].className = 'loading-line__dot loading-line__dot_active checked';
          _this4.activeDotPosition += 1;
        } else {
          clearInterval(_this4.timeInterval);
          _this4.upLoading();
        }
      }, 150);
    }
  }
};

/***/ }),
/* 506 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'w-button',
  props: ['caption', 'active', 'width']
};

/***/ }),
/* 507 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DeviceInfo = __webpack_require__(63);

var _DeviceInfo2 = _interopRequireDefault(_DeviceInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'w-connection-status',
  data: function data() {
    return {
      text: this.$lang.messages.connection.online
    };
  },

  computed: {
    connected: function connected() {
      return this.$store.getters.getConnectionStatus;
    }
  },
  watch: {
    connected: function connected(value) {
      if (value) {
        this.text = this.$lang.messages.connection.online;
      } else {
        this.text = this.$lang.messages.connection.offline;
      }
    }
  },
  created: function created() {
    var _this = this;

    var deviceInfo = _DeviceInfo2.default.getInstance();
    this.$store.commit('connected', deviceInfo.online);
    deviceInfo.addEventListener(_DeviceInfo2.default.ONLINE, function () {
      _this.$store.commit('connected', true);
    });
    deviceInfo.addEventListener(_DeviceInfo2.default.OFFLINE, function () {
      _this.$store.commit('connected', false);
    });
  }
};

/***/ }),
/* 508 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'w-crazy-monkey',
  data: function data() {
    return {
      crazyMonkeyEnabled: false
    };
  },

  methods: {
    getMonkeyOffImage: function getMonkeyOffImage() {
      var n = Math.floor(Math.random() * 3) + 1;
      return 'http://media.persik.by/app/abu-off-' + n + '.gif';
    },
    getMonkeyOnImage: function getMonkeyOnImage() {
      var n = Math.floor(Math.random() * 3) + 1;
      return 'http://media.persik.by/app/abu-on-' + n + '.gif';
    }
  }
};

/***/ }),
/* 509 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'w-exit-modal',
  props: ['closeExitModal'],
  data: function data() {
    return {
      lastId: 0
    };
  },
  mounted: function mounted() {
    this.$root.$emit('focus', this.$el);
  },

  methods: {
    closeModal: function closeModal() {
      this.closeExitModal();
    },
    exitApp: function exitApp() {
      window.close();
    }
  }
};

/***/ }),
/* 510 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WInfoMessage = __webpack_require__(837);

var _WInfoMessage2 = _interopRequireDefault(_WInfoMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'w-info-block',
  props: ['notif'],
  components: {
    WInfoMessage: _WInfoMessage2.default
  },
  watch: {
    notif: function notif() {
      this.lastId = this.notif.length - 1;
    }
  },
  data: function data() {
    return {
      lastId: 0
    };
  },

  methods: {}
};

/***/ }),
/* 511 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'w-info-message',
  props: ['notify', 'active', 'index'],
  data: function data() {
    return {
      activeButtonId: 0
    };
  },

  computed: {
    hasExtraButtons: function hasExtraButtons() {
      return this.notify.btName !== undefined && this.notify.fnName !== '';
    }
  },
  created: function created() {},
  destroyed: function destroyed() {},

  methods: {
    deleteMessage: function deleteMessage(id) {
      this.$nm.deleteNotif(id);
    },
    doAction: function doAction() {
      this.$nm.callFunc(this.notify.id);
    }
  }
};

/***/ }),
/* 512 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'w-memory-usage',
  data: function data() {
    return {
      total: 0,
      used: 0,
      limit: 0,
      danger: 100 * 1024 * 1024
    };
  },

  filters: {
    humanizeSize: function humanizeSize(value) {
      if (!value) {
        return '-';
      }
      return Math.round(value / (1024 * 1024)) + 'MB';
    }
  },
  computed: {
    backgroundColor: function backgroundColor() {
      var p = Math.min(1, this.total / this.danger);
      var r = p > 0.5 ? 255 : Math.floor(255 * (p * 2));
      var g = p < 0.5 ? 255 : Math.floor(255 * 2 * (1 - p));
      var b = 0;
      return 'rgba(' + r + ', ' + g + ', ' + b + ', 0.5)';
    }
  },
  mounted: function mounted() {
    this.timer = setInterval(this.update, 2000);
  },
  destroyed: function destroyed() {
    clearInterval(this.timer);
  },

  methods: {
    update: function update() {
      this.total = window.performance.memory.totalJSHeapSize;
      this.used = window.performance.memory.usedJSHeapSize;
      this.limit = window.performance.memory.jsHeapSizeLimit;
    }
  }
};

/***/ }),
/* 513 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _favorite = __webpack_require__(34);

var _favorite2 = _interopRequireDefault(_favorite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'w-modal',
  props: ['modal'],
  mixins: [_favorite2.default],
  components: {},
  data: function data() {
    return {
      contextMenu: [],
      activeButtonIndex: 0
    };
  },
  created: function created() {},
  mounted: function mounted() {
    this.$root.$emit('focus', this.$el);
    this.initializeContextMenu();
  },
  destroyed: function destroyed() {},

  computed: {
    authorized: function authorized() {
      return this.$store.getters.getAuthorized;
    }
  },
  methods: {
    initializeContextMenu: function initializeContextMenu() {
      var _this = this;

      var type = this.modal.contentType;
      var mode = this.modal.contentMode;
      var isFavorite = this.isFavorite();
      var items = {
        addFavorite: { name: this.$lang.messages.context.add_favorite, action: this.addFavorite },
        removeFavorite: {
          name: this.$lang.messages.context.remove_favorite,
          action: this.removeFavorite
        },
        watchChannel: {
          name: this.$lang.messages.context.watch,
          action: this.watchChannel
        },
        watchVideo: { name: this.$lang.messages.context.watch, action: this.watchVideo },
        info: { name: this.$lang.messages.context.show_info, action: this.showInfo },
        sample: {
          name: this.$lang.messages.context.add_favorite,
          action: function action() {
            _this.$root.$emit('contextSampleClicked');
          }
        },
        close: { name: this.$lang.messages.context.close, action: this.closeModal }
      };

      if (type === 'sample') {
        this.contextMenu.push(items.sample);
      }

      if (type === 'channel') {
        this.contextMenu.push(items.watchChannel);
        if (this.authorized) {
          this.contextMenu.push(isFavorite ? items.removeFavorite : items.addFavorite);
        }
      }
      if (type === 'video') {
        this.contextMenu.push(items.info);
        this.contextMenu.push(items.watchVideo);
        if (this.authorized) {
          this.contextMenu.push(isFavorite ? items.removeFavorite : items.addFavorite);
        }
      }
      if (type === 'tvshow') {
        switch (mode) {
          case 'archive':
            this.contextMenu.push(items.info);
            this.contextMenu.push(items.watchVideo);
            if (this.authorized) {
              this.contextMenu.push(isFavorite ? items.removeFavorite : items.addFavorite);
            }
            break;

          case 'live':
            this.contextMenu.push(items.watchChannel);
            this.contextMenu.push(items.info);
            if (this.authorized) {
              this.contextMenu.push(isFavorite ? items.removeFavorite : items.addFavorite);
            }
            break;

          case 'future':
            if (this.authorized) {
              this.contextMenu.push(isFavorite ? items.removeFavorite : items.addFavorite);
            }
            this.contextMenu.push(items.info);
            break;

          case 'past':
            this.contextMenu.push(items.info);
            break;

          default:
            break;
        }
      }
      this.contextMenu.push(items.close);
    },
    isFavorite: function isFavorite() {
      return this.checkFavorite(this.modal.contentId, this.modal.contentType);
    },
    addFavorite: function addFavorite() {
      this.addToFavorite(this.modal.contentId, this.modal.contentType);
    },
    removeFavorite: function removeFavorite() {
      this.removeFromFavorite(this.modal.contentId, this.modal.contentType);
    },
    showInfo: function showInfo() {
      this.$router.push({
        name: 'Main',
        params: { page: 'video' },
        query: { type: this.modal.contentType, id: this.modal.contentId }
      });
    },
    watchChannel: function watchChannel() {
      this.$router.push({ name: 'PlayerLive', params: { load: true, channelId: this.modal.contentId } });
    },
    watchVideo: function watchVideo() {
      this.$router.push({ name: 'PlayerVideo', params: { type: this.modal.contentType, id: this.modal.contentId } });
    },
    closeModal: function closeModal() {
      this.$nm.deleteModal(this.modal.id);
    }
  }
};

/***/ }),
/* 514 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _WModal = __webpack_require__(437);

var _WModal2 = _interopRequireDefault(_WModal);

var _WInfoBlock = __webpack_require__(836);

var _WInfoBlock2 = _interopRequireDefault(_WInfoBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  name: 'w-notifications',
  components: {
    WModal: _WModal2.default,
    WInfoBlock: _WInfoBlock2.default
  },
  data: function data() {
    return {
      notifications: [],
      modals: []
    };
  },
  created: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var _this = this;

      var notifications;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.$nm.addEventListener('notificationEvent', function (func, notif) {
                _this.notifications = notif;
              });

              this.$nm.addEventListener('modalEvent', function (func, modals) {
                _this.modals = modals;
              });

              _context.next = 4;
              return this.$backend.notifications.getGlobalNotifications();

            case 4:
              notifications = _context.sent;

              this.notificationDispatcher(notifications);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function created() {
      return _ref.apply(this, arguments);
    }

    return created;
  }(),
  mounted: function mounted() {},

  watch: {},
  methods: {
    notificationDispatcher: function notificationDispatcher(notifications) {
      var _this2 = this;

      if (notifications !== null && notifications.length > 0) {
        notifications.forEach(function (notice) {
          if (notice.modal) {
            _this2.$nm.showModal('simple', notice.message);
          } else {
            _this2.$nm.showMessage(notice.message, 0);
          }
        });
      }
    }
  }
};

/***/ }),
/* 515 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _epicSpinners = __webpack_require__(159);

exports.default = {
  name: 'w-placeholder',
  components: {
    LoopingRhombusesSpinner: _epicSpinners.LoopingRhombusesSpinner
  },
  data: function data() {
    return {};
  }
};

/***/ }),
/* 516 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'w-progress-bar-line',
  props: ['passed', 'focused'],
  data: function data() {
    return {
      allWay: 100
    };
  },

  computed: {
    progress: function progress() {
      return this.passed / this.allWay;
    }
  }
};

/***/ }),
/* 517 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'w-progress-bar-throbber',
  props: ['inShow'],
  data: function data() {
    return {};
  }
};

/***/ }),
/* 518 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(44);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _lodash = __webpack_require__(76);

var _lodash2 = _interopRequireDefault(_lodash);

var _WButton = __webpack_require__(59);

var _WButton2 = _interopRequireDefault(_WButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'w-prompt',

  props: ['id', 'title', 'type', 'maxLength', 'extraButtons', 'errorMessage'],
  components: {
    WButton: _WButton2.default
  },
  data: function data() {
    return {
      text: '',
      activeButtonIndex: -1
    };
  },

  computed: {
    visibleText: function visibleText() {
      if (this.type === 'password' || this.type === 'pin') {
        return this.text.replace(/./g, '*');
      }
      return this.text;
    },
    buttons: function buttons() {
      return [{ title: this.$lang.messages.buttons.ok, action: this.actionOk.bind(this) }, { title: this.$lang.messages.buttons.cancel, action: this.close.bind(this) }].concat((0, _toConsumableArray3.default)(this.extraButtons || []));
    },
    keyboardType: function keyboardType() {
      if (this.type === 'pin') {
        return 'int';
      }
      return this.type;
    }
  },
  watch: {
    id: function id() {
      this.text = '';
    }
  },
  created: function created() {},
  mounted: function mounted() {
    this.$root.$emit('focus', this.$el);
  },
  destroyed: function destroyed() {},

  methods: {
    keyboardReachBound: function keyboardReachBound(bound) {
      if (bound === 'bottom') {
        this.$root.$emit('focus', this.$refs.buttons);
        this.activeButtonIndex = 0;
      }
    },
    actionHandler: function actionHandler(index) {
      var action = this.buttons[index].action;
      if (_lodash2.default.isFunction(action)) {
        action();
      } else {
        this.$emit(action);
      }
    },
    actionOk: function actionOk() {
      this.$emit('return', this.text);
    },
    close: function close() {
      this.$emit('close');
    }
  }
};

/***/ }),
/* 519 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WPrompt = __webpack_require__(840);

var _WPrompt2 = _interopRequireDefault(_WPrompt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'w-prompts',
  components: {
    WPrompt: _WPrompt2.default
  },
  data: function data() {
    return {
      promptData: null,
      id: null
    };
  },
  created: function created() {
    var _this = this;

    this.$root.$on('prompt', function (params) {
      _this.promptData = params;
      if (!params) {
        _this.id = Math.random();
      }
    });
  },

  methods: {
    returnHandler: function returnHandler(value) {
      this.promptData.returnHandler(value);
    },
    cancelHandler: function cancelHandler() {
      this.promptData.cancelHandler();
    },
    changeHandler: function changeHandler(value) {
      if (this.promptData.changeHandler) {
        this.promptData.changeHandler(value);
      }
    }
  }
};

/***/ }),
/* 520 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'w-volume',
  props: ['visible'],
  data: function data() {
    return {
      showTimer: null
    };
  },

  computed: {
    volume: function volume() {
      return this.$store.getters.volume;
    }
  },
  watch: {
    volume: function volume(value) {
      this.$backend.settings.setVolume(value);
    }
  },
  created: function created() {
    this.$store.commit('volume', this.$backend.settings.getVolume());
  },
  destroyed: function destroyed() {},

  methods: {}
};

/***/ }),
/* 521 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'w-player-thumbs',
  props: ['thumbs'],
  computed: {
    thumbWidth: function thumbWidth() {
      return 80 / this.thumbs.length + 'rem';
    },
    thumbHeight: function thumbHeight() {
      return 9 / 16 * (80 / this.thumbs.length) + 'rem';
    }
  }
};

/***/ }),
/* 522 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _datetime = __webpack_require__(41);

var _datetime2 = _interopRequireDefault(_datetime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_datetime2.default],
  name: 'w-player-timeline',
  props: ['current', 'duration', 'buffered', 'changeCurrent'],
  computed: {
    rest: function rest() {
      return 1 - Math.max(this.played, this.buffered);
    },
    played: function played() {
      return this.current / this.duration;
    }
  },
  methods: {
    changeTimePosition: function changeTimePosition(event) {
      var lineWidth = document.getElementsByClassName('player-timeline')[0].getBoundingClientRect().width;
      var selectedTimePercent = event.clientX / lineWidth;
      this.changeCurrent(selectedTimePercent);
    }
  }
};

/***/ }),
/* 523 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _datetime = __webpack_require__(41);

var _datetime2 = _interopRequireDefault(_datetime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_datetime2.default],
  name: 'w-player-tracker',
  props: ['position', 'time', 'thumbnail'],
  computed: {
    positionThumbnail: function positionThumbnail() {
      var width = 16;
      var margin = width / 2 / 80;
      if (this.position < 0.1) {
        var offset = (margin - this.position) / margin;
        return 'calc(' + offset * (width / 2) + 'rem + 1px)';
      }
      if (this.position > 0.9) {
        var _offset = (this.position - (1 - margin)) / margin;
        return 'calc(-' + _offset * (width / 2) + 'rem - 1px)';
      }
      return '0';
    }
  }
};

/***/ }),
/* 524 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'w-form-checkbox',
  props: ['checked']
};

/***/ }),
/* 525 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'w-settings-item',
  props: ['label']
};

/***/ }),
/* 526 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IBackend = function () {
  function IBackend() {
    (0, _classCallCheck3.default)(this, IBackend);
  }

  (0, _createClass3.default)(IBackend, [{
    key: 'init',

    //eslint-disable-next-line
    value: function init() {
      throw new Error('IBackend method not implemented (see details in stack trace)');
    }
    //eslint-disable-next-line

  }, {
    key: 'support',
    get: function get() {
      throw new Error('IBackend getter not implemented (see details in stack trace)');
    }
    //eslint-disable-next-line

  }, {
    key: 'logo',
    get: function get() {
      throw new Error('IBackend getter not implemented (see details in stack trace)');
    }
    //eslint-disable-next-line

  }, {
    key: 'code',
    get: function get() {
      throw new Error('IBackend getter not implemented (see details in stack trace)');
    }
    //eslint-disable-next-line

  }, {
    key: 'metricId',
    get: function get() {
      throw new Error('IBackend getter not implemented (see details in stack trace)');
    }
  }]);
  return IBackend;
}();

exports.default = IBackend;

/***/ }),
/* 527 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(12);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = __webpack_require__(76);

var _lodash2 = _interopRequireDefault(_lodash);

var _IBackend2 = __webpack_require__(526);

var _IBackend3 = _interopRequireDefault(_IBackend2);

var _Api = __webpack_require__(572);

var _Api2 = _interopRequireDefault(_Api);

var _api_modules = __webpack_require__(548);

var _api_modules2 = _interopRequireDefault(_api_modules);

var _Storage = __webpack_require__(94);

var _Storage2 = _interopRequireDefault(_Storage);

var _DeviceInfo = __webpack_require__(63);

var _DeviceInfo2 = _interopRequireDefault(_DeviceInfo);

var _modules = __webpack_require__(537);

var _modules2 = _interopRequireDefault(_modules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logo = __webpack_require__(770); /* eslint-disable import/no-extraneous-dependencies, import/first */

var Backend = function (_IBackend) {
  (0, _inherits3.default)(Backend, _IBackend);

  function Backend() {
    (0, _classCallCheck3.default)(this, Backend);
    return (0, _possibleConstructorReturn3.default)(this, (Backend.__proto__ || (0, _getPrototypeOf2.default)(Backend)).apply(this, arguments));
  }

  (0, _createClass3.default)(Backend, [{
    key: 'init',
    value: function init() {
      this.storage = _Storage2.default.getInstance();
      this.initApi();
      this.loadModules();
    }
  }, {
    key: 'initApi',
    value: function initApi() {
      this.api = new _Api2.default();
      this.api.setBaseUrl('https://api.persik.tv/');
      this.api.addModules(_api_modules2.default);
      this.api.setGlobalParam('device', 'web-by'); // this.api.setGlobalParam('device', DeviceInfo.getInstance().platform);
      this.api.setGlobalParam('lang', 'ru');
      this.api.setGlobalParam('uuid', _DeviceInfo2.default.getInstance().uuid);
    }
  }, {
    key: 'loadModules',
    value: function loadModules() {
      var _this2 = this;

      _lodash2.default.forOwn(_modules2.default, function (methods, moduleName) {
        _this2[moduleName] = _lodash2.default.mapValues(methods, function (f) {
          return f.bind(_this2);
        });
      });
      _lodash2.default.keys(_modules2.default).forEach(function (moduleName) {
        _this2[moduleName].init();
      });
    }

    //eslint-disable-next-line

  }, {
    key: 'reset',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.content.reset();

              case 2:
                _context.next = 4;
                return this.account.reset();

              case 4:
                _context.next = 6;
                return this.categories.reset();

              case 6:
                _context.next = 8;
                return this.favorite.reset();

              case 8:
                _context.next = 10;
                return this.featured.reset();

              case 10:
                _context.next = 12;
                return this.settings.reset();

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function reset() {
        return _ref.apply(this, arguments);
      }

      return reset;
    }()
  }, {
    key: 'clear',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.content.clear();

              case 2:
                _context2.next = 4;
                return this.account.clear();

              case 4:
                _context2.next = 6;
                return this.categories.clear();

              case 6:
                _context2.next = 8;
                return this.favorite.clear();

              case 8:
                _context2.next = 10;
                return this.featured.clear();

              case 10:
                _context2.next = 12;
                return this.settings.clear();

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function clear() {
        return _ref2.apply(this, arguments);
      }

      return clear;
    }()
  }, {
    key: 'code',


    //eslint-disable-next-line
    get: function get() {
      return 'persik';
    }
  }, {
    key: 'support',
    get: function get() {
      return {
        auth: true,
        vod: true,
        search: true,
        favorite: true,
        featured: true,
        epg: true
      };
    }

    //eslint-disable-next-line

  }, {
    key: 'logo',
    get: function get() {
      return logo;
    }

    //eslint-disable-next-line

  }, {
    key: 'metricId',
    get: function get() {
      return 'UA-45377324-17';
    }

    // TODO: реализовать каждый модуль

  }, {
    key: 'billing',
    get: function get() {
      return this.api.billing;
    }
  }, {
    key: 'epg',
    get: function get() {
      return this.api.epg;
    }
  }, {
    key: 'stream',
    get: function get() {
      return this.api.stream;
    }
  }, {
    key: 'notifications',
    get: function get() {
      return this.api.notifications;
    }
  }]);
  return Backend;
}(_IBackend3.default);

exports.default = Backend;

/***/ }),
/* 528 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from = __webpack_require__(170);

var _from2 = _interopRequireDefault(_from);

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = __webpack_require__(43);

var _promise2 = _interopRequireDefault(_promise);

var _set = __webpack_require__(583);

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BatchRequest = function () {

  /**
   * @param delay Задержка для накопления очереди запросов
   */
  function BatchRequest() {
    var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;
    (0, _classCallCheck3.default)(this, BatchRequest);

    this.delay = delay;
    this.promises = [];
    this.queue = new _set2.default();
    this.timer = null;
  }

  (0, _createClass3.default)(BatchRequest, [{
    key: 'getItem',
    value: function getItem(id) {
      var _this = this;

      this.queue.add(id);
      var promiseParams = { id: id };
      var p = new _promise2.default(function (resolve, reject) {
        promiseParams.resolve = resolve;
        promiseParams.reject = reject;
      });
      this.promises.push(promiseParams);

      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(function () {
        _this.timer = null;
        _this.processQueue();
      }, this.delay);

      return p;
    }

    //eslint-disable-next-line

  }, {
    key: 'getContent',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ids) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                throw new Error('Function BatchRequest.getContent must be override');

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getContent(_x2) {
        return _ref.apply(this, arguments);
      }

      return getContent;
    }()

    //eslint-disable-next-line

  }, {
    key: 'getIdFromData',
    value: function getIdFromData(ids) {
      throw new Error('Function BatchRequest.getIdFromData must be override');
    }
  }, {
    key: 'processQueue',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var _this2 = this;

        var ids, items;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                ids = (0, _from2.default)(this.queue);

                this.queue = new _set2.default();
                _context2.prev = 2;
                _context2.next = 5;
                return this.getContent(ids);

              case 5:
                items = _context2.sent;

                items.forEach(function (item) {
                  _this2.resolveItem(item);
                });
                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](2);

                ids.forEach(function (id) {
                  _this2.rejectItem(id, _context2.t0);
                });

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 9]]);
      }));

      function processQueue() {
        return _ref2.apply(this, arguments);
      }

      return processQueue;
    }()
  }, {
    key: 'findPromiseIndex',
    value: function findPromiseIndex(id) {
      return this.promises.findIndex(function (p) {
        return p.id === id;
      });
    }
  }, {
    key: 'resolveItem',
    value: function resolveItem(data) {
      var id = this.getIdFromData(data);
      var index = this.findPromiseIndex(id);
      while (index !== -1) {
        this.promises[index].resolve(data);
        this.promises.splice(index, 1);
        index = this.findPromiseIndex(id);
      }
    }
  }, {
    key: 'rejectItem',
    value: function rejectItem(id, e) {
      var index = this.findPromiseIndex(id);
      while (index !== -1) {
        this.promises[index].reject('Error get item #' + id + ': ' + e.toString());
        this.promises.splice(index, 1);
        index = this.findPromiseIndex(id);
      }
    }
  }]);
  return BatchRequest;
}();

exports.default = BatchRequest;

/***/ }),
/* 529 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(12);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _BatchRequestCached2 = __webpack_require__(116);

var _BatchRequestCached3 = _interopRequireDefault(_BatchRequestCached2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BatchRequestChannel = function (_BatchRequestCached) {
  (0, _inherits3.default)(BatchRequestChannel, _BatchRequestCached);

  function BatchRequestChannel(api) {
    (0, _classCallCheck3.default)(this, BatchRequestChannel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BatchRequestChannel.__proto__ || (0, _getPrototypeOf2.default)(BatchRequestChannel)).call(this, 'channel'));

    _this.api = api;
    return _this;
  }

  (0, _createClass3.default)(BatchRequestChannel, [{
    key: 'getContent',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(queue) {
        var res;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.api.content.getChannel(queue);

              case 2:
                res = _context.sent;
                return _context.abrupt('return', res.channels);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getContent(_x) {
        return _ref.apply(this, arguments);
      }

      return getContent;
    }()

    //eslint-disable-next-line

  }, {
    key: 'getIdFromData',
    value: function getIdFromData(data) {
      return data.channel_id;
    }
  }]);
  return BatchRequestChannel;
}(_BatchRequestCached3.default);

exports.default = BatchRequestChannel;

/***/ }),
/* 530 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(12);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _BatchRequestCached2 = __webpack_require__(116);

var _BatchRequestCached3 = _interopRequireDefault(_BatchRequestCached2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BatchRequestTvshow = function (_BatchRequestCached) {
  (0, _inherits3.default)(BatchRequestTvshow, _BatchRequestCached);

  function BatchRequestTvshow(api) {
    (0, _classCallCheck3.default)(this, BatchRequestTvshow);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BatchRequestTvshow.__proto__ || (0, _getPrototypeOf2.default)(BatchRequestTvshow)).call(this, 'tvshow'));

    _this.api = api;
    return _this;
  }

  (0, _createClass3.default)(BatchRequestTvshow, [{
    key: 'getContent',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(queue) {
        var res;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.api.content.getTvshow(queue);

              case 2:
                res = _context.sent;
                return _context.abrupt('return', res.tvshows);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getContent(_x) {
        return _ref.apply(this, arguments);
      }

      return getContent;
    }()

    //eslint-disable-next-line

  }, {
    key: 'getIdFromData',
    value: function getIdFromData(data) {
      return data.tvshow_id;
    }
  }]);
  return BatchRequestTvshow;
}(_BatchRequestCached3.default);

exports.default = BatchRequestTvshow;

/***/ }),
/* 531 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(12);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _BatchRequestCached2 = __webpack_require__(116);

var _BatchRequestCached3 = _interopRequireDefault(_BatchRequestCached2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BatchRequestVideo = function (_BatchRequestCached) {
  (0, _inherits3.default)(BatchRequestVideo, _BatchRequestCached);

  function BatchRequestVideo(api) {
    (0, _classCallCheck3.default)(this, BatchRequestVideo);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BatchRequestVideo.__proto__ || (0, _getPrototypeOf2.default)(BatchRequestVideo)).call(this, 'video'));

    _this.api = api;
    return _this;
  }

  (0, _createClass3.default)(BatchRequestVideo, [{
    key: 'getContent',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(queue) {
        var res;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.api.content.getVideo(queue);

              case 2:
                res = _context.sent;
                return _context.abrupt('return', res.videos);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getContent(_x) {
        return _ref.apply(this, arguments);
      }

      return getContent;
    }()

    //eslint-disable-next-line

  }, {
    key: 'getIdFromData',
    value: function getIdFromData(data) {
      return data.video_id;
    }
  }]);
  return BatchRequestVideo;
}(_BatchRequestCached3.default);

exports.default = BatchRequestVideo;

/***/ }),
/* 532 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _sha = __webpack_require__(759);

var _sha2 = _interopRequireDefault(_sha);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  init: function init() {
    if (this.storage.getOption('token')) {
      this.api.setGlobalParam('auth_token', this.storage.getOption('token'));
      this.authorized = true;
    } else {
      this.authorized = false;
    }
  },
  reset: function reset() {
    this.storage.deleteOption('token');
    this.storage.deleteOption('user_id');
  },
  clear: function clear() {},
  login: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var _api$account;

      var res,
          _args = arguments;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (_api$account = this.api.account).login.apply(_api$account, _args);

            case 2:
              res = _context.sent;

              this.api.setGlobalParam('auth_token', res.auth_token);
              this.storage.setOption('token', res.auth_token);
              this.storage.setOption('user_id', res.user_id);
              this.authorized = true;
              this.clear();
              _Metric2.default.getInstance().setUserId(res.user_id);
              return _context.abrupt('return', res);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function login() {
      return _ref.apply(this, arguments);
    }

    return login;
  }(),
  logout: function logout() {
    this.storage.deleteOption('token');
    this.storage.deleteOption('user_id');
    this.api.removeGlobalParam('auth_token');
    this.authorized = false;
    this.clear();
  },
  checkEmail: function checkEmail(email) {
    return this.api.account.checkEmail(email);
  },
  checkPassword: function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(password) {
      var res;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.api.account.checkPassword((0, _sha2.default)(password));

            case 2:
              res = _context2.sent;
              return _context2.abrupt('return', res.valid);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function checkPassword(_x) {
      return _ref2.apply(this, arguments);
    }

    return checkPassword;
  }(),
  register: function register(email, password) {
    return this.api.account.register(email, password);
  },
  getInfo: function getInfo() {
    return this.api.account.getInfo();
  },
  setInfo: function setInfo(info) {
    return this.api.account.setInfo(info);
  },
  getPin: function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var info;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.api.account.getInfo();

            case 2:
              info = _context3.sent;
              return _context3.abrupt('return', info.pass_code);

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getPin() {
      return _ref3.apply(this, arguments);
    }

    return getPin;
  }(),
  setPin: function setPin(pin) {
    return this.api.account.setInfo({ pass_code: pin });
  },
  isTestPeriodAvailable: function isTestPeriodAvailable(uuid) {
    return this.api.account.isTestPeriodAvailable(uuid);
  },
  activateTrial: function activateTrial(uuid) {
    return this.api.account.activateTrial(uuid);
  },
  getUserId: function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      var userId, info;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              userId = this.storage.getOption('user_id');

              if (userId) {
                _context4.next = 7;
                break;
              }

              _context4.next = 4;
              return this.api.account.getInfo();

            case 4:
              info = _context4.sent;

              userId = info.user_id;
              this.storage.setOption('user_id', userId);

            case 7:
              return _context4.abrupt('return', userId);

            case 8:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function getUserId() {
      return _ref4.apply(this, arguments);
    }

    return getUserId;
  }()
};

/***/ }),
/* 533 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _boomerangCache = __webpack_require__(99);

var _boomerangCache2 = _interopRequireDefault(_boomerangCache);

var _semaphoreAsyncAwait = __webpack_require__(434);

var _semaphoreAsyncAwait2 = _interopRequireDefault(_semaphoreAsyncAwait);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TTL = 6 * 3600;

var cache = _boomerangCache2.default.create('categories', { storage: 'local', encrypt: false });
var lockChannel = new _semaphoreAsyncAwait2.default(1);
var lockVideo = new _semaphoreAsyncAwait2.default(1);
var lockGenre = new _semaphoreAsyncAwait2.default(1);

exports.default = {
  init: function init() {
    this.genresIndex = null;
  },
  reset: function reset() {
    this.clear();
  },
  clear: function clear() {
    cache.clear();
    this.genresIndex = null;
  },
  getChannelGenres: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var channel;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return lockChannel.waitFor(5000);

            case 2:
              channel = cache.get('channel');

              if (channel) {
                _context.next = 8;
                break;
              }

              _context.next = 6;
              return this.api.categories.getChannel();

            case 6:
              channel = _context.sent;

              cache.set('channel', channel, TTL);

            case 8:
              lockChannel.release();
              return _context.abrupt('return', channel);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getChannelGenres() {
      return _ref.apply(this, arguments);
    }

    return getChannelGenres;
  }(),
  getVideo: function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var video;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return lockVideo.waitFor(5000);

            case 2:
              video = cache.get('video');

              if (video) {
                _context2.next = 8;
                break;
              }

              _context2.next = 6;
              return this.api.categories.getVideo();

            case 6:
              video = _context2.sent;

              cache.set('video', video, TTL);

            case 8:
              lockVideo.release();
              return _context2.abrupt('return', video);

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getVideo() {
      return _ref2.apply(this, arguments);
    }

    return getVideo;
  }(),
  indexingGenres: function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var _this = this;

      var result;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.genresIndex = {};
              _context3.next = 3;
              return this.categories.getChannelGenres();

            case 3:
              result = _context3.sent;

              result.forEach(function (genre) {
                _this.genresIndex[genre.id] = genre.name;
              });

              _context3.next = 7;
              return this.categories.getVideo();

            case 7:
              result = _context3.sent;

              result.forEach(function (category) {
                category.genres.forEach(function (genre) {
                  _this.genresIndex[genre.id] = genre.name;
                });
              });

            case 9:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function indexingGenres() {
      return _ref3.apply(this, arguments);
    }

    return indexingGenres;
  }(),
  getGenreName: function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(id) {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return lockGenre.waitFor(5000);

            case 2:
              if (this.genresIndex) {
                _context4.next = 5;
                break;
              }

              _context4.next = 5;
              return this.categories.indexingGenres();

            case 5:
              lockGenre.release();
              return _context4.abrupt('return', this.genresIndex[id]);

            case 7:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function getGenreName(_x) {
      return _ref4.apply(this, arguments);
    }

    return getGenreName;
  }()
};

/***/ }),
/* 534 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _boomerangCache = __webpack_require__(99);

var _boomerangCache2 = _interopRequireDefault(_boomerangCache);

var _memoryCache = __webpack_require__(750);

var _memoryCache2 = _interopRequireDefault(_memoryCache);

var _semaphoreAsyncAwait = __webpack_require__(434);

var _semaphoreAsyncAwait2 = _interopRequireDefault(_semaphoreAsyncAwait);

var _BatchRequestChannel = __webpack_require__(529);

var _BatchRequestChannel2 = _interopRequireDefault(_BatchRequestChannel);

var _BatchRequestVideo = __webpack_require__(531);

var _BatchRequestVideo2 = _interopRequireDefault(_BatchRequestVideo);

var _BatchRequestTvshow = __webpack_require__(530);

var _BatchRequestTvshow2 = _interopRequireDefault(_BatchRequestTvshow);

var _Epg = __webpack_require__(62);

var _Epg2 = _interopRequireDefault(_Epg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TTL = 6 * 3600;
//eslint-disable-next-line


var cache = _boomerangCache2.default.create('content', { storage: 'local', encrypt: false });
var epg = _Epg2.default.getInstance();
var lockChannels = new _semaphoreAsyncAwait2.default(1);

exports.default = {
  init: function init() {
    this.batchRequestChannel = new _BatchRequestChannel2.default(this.api);
    this.batchRequestVideo = new _BatchRequestVideo2.default(this.api);
    this.batchRequestTvshow = new _BatchRequestTvshow2.default(this.api);
  },
  reset: function reset() {
    this.clear();
  },
  clear: function clear() {
    cache.clear();
    this.batchRequestChannel.clear();
    this.batchRequestVideo.clear();
    this.batchRequestTvshow.clear();
  },
  getChannels: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var channels, res;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              channels = cache.get('channels');

              if (channels) {
                _context.next = 7;
                break;
              }

              _context.next = 4;
              return this.api.content.getChannels();

            case 4:
              res = _context.sent;

              channels = res.channels;
              cache.set('channels', channels, TTL);

            case 7:
              return _context.abrupt('return', channels);

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getChannels() {
      return _ref.apply(this, arguments);
    }

    return getChannels;
  }(),
  getVideos: function getVideos() {
    var _api$content;

    return (_api$content = this.api.content).getVideos.apply(_api$content, arguments);
  },
  getVideo: function getVideo(id) {
    var intId = parseInt(id, 10);
    return this.batchRequestVideo.getItem(intId);
  },
  getTvshow: function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(id) {
      var tvshow;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              tvshow = void 0;
              _context2.prev = 1;
              _context2.next = 4;
              return epg.getTvshowById(id);

            case 4:
              tvshow = _context2.sent;
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2['catch'](1);

              console.log(_context2.t0);

            case 10:
              if (!tvshow) {
                tvshow = this.batchRequestTvshow.getItem(id);
              }
              return _context2.abrupt('return', tvshow);

            case 12:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[1, 7]]);
    }));

    function getTvshow(_x) {
      return _ref2.apply(this, arguments);
    }

    return getTvshow;
  }(),
  getChannel: function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(id) {
      var intId, channel, channels;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              intId = parseInt(id, 10);
              _context3.next = 3;
              return lockChannels.acquire();

            case 3:
              channel = void 0;
              _context3.prev = 4;
              channels = _memoryCache2.default.get('channels');

              if (!(channels === null)) {
                _context3.next = 11;
                break;
              }

              _context3.next = 9;
              return this.content.getChannels();

            case 9:
              channels = _context3.sent;

              _memoryCache2.default.put('channels', channels, 10000);

            case 11:
              channel = channels.find(function (x) {
                return x.channel_id === intId;
              });
              _context3.next = 17;
              break;

            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3['catch'](4);

              console.error(_context3.t0);

            case 17:
              lockChannels.release();

              if (channel) {
                _context3.next = 22;
                break;
              }

              _context3.next = 21;
              return this.batchRequestChannel.getItem(intId);

            case 21:
              channel = _context3.sent;

            case 22:
              return _context3.abrupt('return', channel);

            case 23:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[4, 14]]);
    }));

    function getChannel(_x2) {
      return _ref3.apply(this, arguments);
    }

    return getChannel;
  }(),
  getPerson: function getPerson() {
    var _api$content2;

    return (_api$content2 = this.api.content).getPerson.apply(_api$content2, arguments);
  },
  getBanners: function getBanners() {
    return this.api.content.getBanners();
  }
};

/***/ }),
/* 535 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(44);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _boomerangCache = __webpack_require__(99);

var _boomerangCache2 = _interopRequireDefault(_boomerangCache);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TTL = 6 * 3600;

var cache = _boomerangCache2.default.create('favorite', { storage: 'local', encrypt: false });

exports.default = {
  init: function init() {},
  reset: function reset() {
    this.clear();
  },
  clear: function clear() {
    cache.clear();
  },
  getChannels: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var channels, res;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (this.authorized) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', []);

            case 2:
              channels = cache.get('channels');

              if (channels) {
                _context.next = 9;
                break;
              }

              _context.next = 6;
              return this.api.favorite.getChannels();

            case 6:
              res = _context.sent;

              channels = res.channels;
              cache.set('channels', channels, TTL);

            case 9:
              return _context.abrupt('return', channels);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getChannels() {
      return _ref.apply(this, arguments);
    }

    return getChannels;
  }(),
  getVideos: function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var videos, res;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (this.authorized) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return', []);

            case 2:
              videos = cache.get('videos');

              if (videos) {
                _context2.next = 9;
                break;
              }

              _context2.next = 6;
              return this.api.favorite.getVideos();

            case 6:
              res = _context2.sent;

              videos = res.videos;
              cache.set('videos', videos, TTL);

            case 9:
              return _context2.abrupt('return', videos);

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getVideos() {
      return _ref2.apply(this, arguments);
    }

    return getVideos;
  }(),
  getTvshows: function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var tvshows, res;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (this.authorized) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt('return', []);

            case 2:
              tvshows = cache.get('tvshows');

              if (tvshows) {
                _context3.next = 9;
                break;
              }

              _context3.next = 6;
              return this.api.favorite.getTvshows();

            case 6:
              res = _context3.sent;

              tvshows = res.tvshows;
              cache.set('tvshows', tvshows, TTL);

            case 9:
              return _context3.abrupt('return', tvshows);

            case 10:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getTvshows() {
      return _ref3.apply(this, arguments);
    }

    return getTvshows;
  }(),
  addChannel: function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(id) {
      var channels;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (this.authorized) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt('return');

            case 2:
              _context4.next = 4;
              return this.favorite.getChannels();

            case 4:
              _context4.t0 = _context4.sent;

              if (_context4.t0) {
                _context4.next = 7;
                break;
              }

              _context4.t0 = [];

            case 7:
              channels = _context4.t0;

              if (!channels.find(function (x) {
                return x.channel_id === id;
              })) {
                channels = [{
                  channel_id: id,
                  added_time: (0, _moment2.default)().unix()
                }].concat((0, _toConsumableArray3.default)(channels));
              }
              cache.set('channels', channels, TTL);
              this.api.favorite.addChannel(id);

            case 11:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function addChannel(_x) {
      return _ref4.apply(this, arguments);
    }

    return addChannel;
  }(),
  addVideo: function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(id) {
      var videos;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (this.authorized) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt('return');

            case 2:
              _context5.next = 4;
              return this.favorite.getVideos();

            case 4:
              _context5.t0 = _context5.sent;

              if (_context5.t0) {
                _context5.next = 7;
                break;
              }

              _context5.t0 = [];

            case 7:
              videos = _context5.t0;

              if (!videos.find(function (x) {
                return x.video_id === id;
              })) {
                videos = [{
                  video_id: id,
                  added_time: (0, _moment2.default)().unix()
                }].concat((0, _toConsumableArray3.default)(videos));
              }
              cache.set('videos', videos, TTL);
              this.api.favorite.addVideo(id);

            case 11:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function addVideo(_x2) {
      return _ref5.apply(this, arguments);
    }

    return addVideo;
  }(),
  addTvshow: function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(id) {
      var tvshows;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (this.authorized) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt('return');

            case 2:
              _context6.next = 4;
              return this.favorite.getTvshows();

            case 4:
              _context6.t0 = _context6.sent;

              if (_context6.t0) {
                _context6.next = 7;
                break;
              }

              _context6.t0 = [];

            case 7:
              tvshows = _context6.t0;

              if (!tvshows.find(function (x) {
                return x.tvshow_id === id;
              })) {
                tvshows = [{
                  tvshow_id: id,
                  added_time: (0, _moment2.default)().unix()
                }].concat((0, _toConsumableArray3.default)(tvshows));
              }
              cache.set('tvshows', tvshows, TTL);
              this.api.favorite.addTvshow(id);

            case 11:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function addTvshow(_x3) {
      return _ref6.apply(this, arguments);
    }

    return addTvshow;
  }(),
  removeChannel: function () {
    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(id) {
      var channels;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (this.authorized) {
                _context7.next = 2;
                break;
              }

              return _context7.abrupt('return');

            case 2:
              _context7.next = 4;
              return this.favorite.getChannels();

            case 4:
              _context7.t0 = _context7.sent;

              if (_context7.t0) {
                _context7.next = 7;
                break;
              }

              _context7.t0 = [];

            case 7:
              channels = _context7.t0;

              channels = channels.filter(function (x) {
                return x.channel_id !== id;
              });
              cache.set('channels', channels, TTL);
              this.api.favorite.removeChannel(id);

            case 11:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function removeChannel(_x4) {
      return _ref7.apply(this, arguments);
    }

    return removeChannel;
  }(),
  removeVideo: function () {
    var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(id) {
      var videos;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (this.authorized) {
                _context8.next = 2;
                break;
              }

              return _context8.abrupt('return');

            case 2:
              _context8.next = 4;
              return this.favorite.getVideos();

            case 4:
              _context8.t0 = _context8.sent;

              if (_context8.t0) {
                _context8.next = 7;
                break;
              }

              _context8.t0 = [];

            case 7:
              videos = _context8.t0;

              videos = videos.filter(function (x) {
                return x.video_id !== id;
              });
              cache.set('videos', videos, TTL);
              this.api.favorite.removeVideo(id);

            case 11:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function removeVideo(_x5) {
      return _ref8.apply(this, arguments);
    }

    return removeVideo;
  }(),
  removeTvshow: function () {
    var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(id) {
      var tvshows;
      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (this.authorized) {
                _context9.next = 2;
                break;
              }

              return _context9.abrupt('return');

            case 2:
              _context9.next = 4;
              return this.favorite.getTvshows();

            case 4:
              _context9.t0 = _context9.sent;

              if (_context9.t0) {
                _context9.next = 7;
                break;
              }

              _context9.t0 = [];

            case 7:
              tvshows = _context9.t0;

              tvshows = tvshows.filter(function (x) {
                return x.tvshow_id !== id;
              });
              cache.set('tvshows', tvshows, TTL);
              this.api.favorite.removeTvshow(id);

            case 11:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function removeTvshow(_x6) {
      return _ref9.apply(this, arguments);
    }

    return removeTvshow;
  }()
};

/***/ }),
/* 536 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  init: function init() {},
  reset: function reset() {},
  clear: function clear() {},
  getChannels: function getChannels(size) {
    return this.api.featured.getChannels(size);
  },
  getIndex: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var res, i, section, source, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.api.featured.getIndex();

            case 2:
              res = _context.sent;
              i = 0;

            case 4:
              if (!(i < res.sections.length)) {
                _context.next = 14;
                break;
              }

              section = res.sections[i];
              source = section.source;
              //eslint-disable-next-line

              _context.next = 9;
              return this.api.exec('POST', source.version, source.module, source.action, source.params, true);

            case 9:
              data = _context.sent;

              (0, _assign2.default)(section, data);

            case 11:
              i += 1;
              _context.next = 4;
              break;

            case 14:
              return _context.abrupt('return', res.sections);

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getIndex() {
      return _ref.apply(this, arguments);
    }

    return getIndex;
  }()
};

/***/ }),
/* 537 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _account = __webpack_require__(532);

var _account2 = _interopRequireDefault(_account);

var _categories = __webpack_require__(533);

var _categories2 = _interopRequireDefault(_categories);

var _content = __webpack_require__(534);

var _content2 = _interopRequireDefault(_content);

var _favorite = __webpack_require__(535);

var _favorite2 = _interopRequireDefault(_favorite);

var _featured = __webpack_require__(536);

var _featured2 = _interopRequireDefault(_featured);

var _search = __webpack_require__(538);

var _search2 = _interopRequireDefault(_search);

var _settings = __webpack_require__(539);

var _settings2 = _interopRequireDefault(_settings);

var _utils = __webpack_require__(540);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  account: _account2.default,
  categories: _categories2.default,
  content: _content2.default,
  favorite: _favorite2.default,
  featured: _featured2.default,
  search: _search2.default,
  settings: _settings2.default,
  utils: _utils2.default
};

/***/ }),
/* 538 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = __webpack_require__(44);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  init: function init() {},
  reset: function reset() {},
  clear: function clear() {},
  search: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(query) {
      var _api$search;

      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (query === 'develop123') {
                this.settings.setDeveloperMode(!this.settings.getDeveloperMode());
                window.location.reload();
              }
              return _context.abrupt('return', (_api$search = this.api.search).search.apply(_api$search, [query].concat((0, _toConsumableArray3.default)(rest))));

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function search(_x) {
      return _ref.apply(this, arguments);
    }

    return search;
  }()
};

/***/ }),
/* 539 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compareVersions = __webpack_require__(174);

var _compareVersions2 = _interopRequireDefault(_compareVersions);

var _DeviceInfo = __webpack_require__(63);

var _DeviceInfo2 = _interopRequireDefault(_DeviceInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deviceInfo = _DeviceInfo2.default.getInstance();

exports.default = {
  init: function init() {},
  reset: function reset() {
    this.storage.deleteOption('volume');
    this.storage.deleteOption('parent_control');
    this.storage.deleteOption('developer_mode');
    this.storage.deleteOption('skip_tutorial');
    this.storage.deleteOption('video_use_hls');
  },
  clear: function clear() {},
  getVolume: function getVolume() {
    var DEFAULT_VOLUME = 25;
    return this.storage.getOption('volume', DEFAULT_VOLUME);
  },
  setVolume: function setVolume(value) {
    this.storage.setOption('volume', parseInt(value, 10));
  },
  setParentControl: function setParentControl(value) {
    return this.storage.setOption('parent_control', !!value);
  },
  getParentControl: function getParentControl() {
    if (!this.authorized) {
      return false;
    }
    return this.storage.getOption('parent_control', true);
  },
  getDeveloperMode: function getDeveloperMode() {
    return this.storage.getOption('developer_mode', false);
  },
  setDeveloperMode: function setDeveloperMode(value) {
    return this.storage.setOption('developer_mode', !!value);
  },
  setSkipTutorial: function setSkipTutorial(value) {
    this.storage.setOption('skip_tutorial', !!value);
  },
  getSkipTutorial: function getSkipTutorial() {
    return this.storage.getOption('skip_tutorial', false);
  },
  setVideoUseHls: function setVideoUseHls(value) {
    this.storage.setOption('video_use_hls', !!value);
  },
  getVideoUseHls: function getVideoUseHls() {
    var defaultValue = true;
    if (deviceInfo.platform === 'android') {
      if ((0, _compareVersions2.default)(deviceInfo.version, '5.0.0') < 0) {
        defaultValue = false;
      }
    }
    return this.storage.getOption('video_use_hls', defaultValue);
  },
  hasVideoSettings: function hasVideoSettings() {
    return deviceInfo.platform === 'android' || deviceInfo.platform === 'pc';
  }
};

/***/ }),
/* 540 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  init: function init() {},
  reset: function reset() {},
  clear: function clear() {},
  checkTime: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var serverTime, localTime, delta, MAX_DELTA;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.api.utils.getTime();

            case 2:
              serverTime = _context.sent.unix;
              localTime = (0, _moment2.default)().unix();
              delta = Math.abs(localTime - serverTime);
              MAX_DELTA = 300;
              return _context.abrupt('return', delta <= MAX_DELTA);

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function checkTime() {
      return _ref.apply(this, arguments);
    }

    return checkTime;
  }(),
  getCountryCodeByIP: function getCountryCodeByIP() {
    return this.api.utils.getCountryCodeByIP();
  }
};

/***/ }),
/* 541 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  init: function init() {},
  checkEmail: function checkEmail(email) {
    var version = 2;
    var method = 'POST';
    var action = 'check';
    var module = 'auth';
    var params = {
      email: email
    };
    return this.exec(method, version, module, action, params, true);
  },
  checkPassword: function checkPassword(password) {
    var version = 2;
    var method = 'POST';
    var action = 'check-password';
    var module = 'auth';
    var params = {
      password: password
    };
    return this.exec(method, version, module, action, params, true);
  },
  login: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(email, password, nocookie) {
      var version, method, action, module, params;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              version = 1;
              method = 'POST';
              action = 'login';
              module = 'account';
              params = {
                email: email,
                password: password,
                nocookie: nocookie,
                newsite: true
              };
              return _context.abrupt('return', this.exec(method, version, module, action, params, true));

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function login(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    }

    return login;
  }(),
  changePassword: function changePassword(oldPassword, newPassword) {
    var version = 1;
    var method = 'POST';
    var action = 'password';
    var module = 'account';
    var params = {
      old_password: oldPassword,
      new_password: newPassword
    };
    return this.exec(method, version, module, action, params);
  },
  rememberPassword: function rememberPassword(email) {
    var version = 1;
    var method = 'POST';
    var action = 'forgot';
    var module = 'account';
    var params = {
      email: email
    };
    return this.exec(method, version, module, action, params);
  },
  register: function register(email, password) {
    var version = 1;
    var method = 'POST';
    var action = 'registration';
    var module = 'account';
    var params = {
      email: email,
      password: password
    };
    return this.exec(method, version, module, action, params);
  },
  getInfo: function getInfo() {
    var version = 1;
    var method = 'GET';
    var action = 'info';
    var module = 'account';
    var params = {};
    return this.exec(method, version, module, action, params, true);
  },
  setInfo: function setInfo(info) {
    var version = 1;
    var method = 'POST';
    var action = 'info';
    var module = 'account';
    return this.exec(method, version, module, action, info);
  },
  isTestPeriodAvailable: function isTestPeriodAvailable(uuid) {
    var version = 1;
    var method = 'GET';
    var action = 'trial';
    var module = 'purchases';
    var params = {
      uuid: uuid
    };
    return this.exec(method, version, module, action, params);
  },
  activateTrial: function activateTrial(uuid) {
    var version = 1;
    var method = 'POST';
    var action = 'trial?uuid=' + uuid;
    var module = 'purchases';
    var params = {
      uuid: uuid
    };
    return this.exec(method, version, module, action, params);
  }
};

/***/ }),
/* 542 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  getProducts: function getProducts() {
    var currency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var version = 2;
    var module = 'billing';
    var method = 'GET';
    var action = 'products';
    var params = {};
    if (currency !== null) {
      params.currency = currency;
    }
    return this.exec(method, version, module, action, params, true);
  },
  getSubscriptions: function getSubscriptions() {
    var version = 2;
    var module = 'billing';
    var method = 'GET';
    var action = 'subscriptions';
    return this.exec(method, version, module, action, {}, true);
  },
  createPayment: function createPayment(ids, paySys) {
    var version = 2;
    var module = 'billing';
    var method = 'POST';
    var action = 'payment';
    var params = {
      product_option_id: ids,
      pay_sys: paySys
    };
    return this.exec(method, version, module, action, params);
  }
};

/***/ }),
/* 543 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  getChannel: function getChannel() {
    var version = 2;
    var module = 'categories';
    var method = 'GET';
    var action = 'channel';
    var params = {};
    return this.exec(method, version, module, action, params, true);
  },
  getVideo: function getVideo() {
    var version = 2;
    var module = 'categories';
    var method = 'GET';
    var action = 'video';
    var params = {};
    return this.exec(method, version, module, action, params, true);
  }
};

/***/ }),
/* 544 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  getChannels: function getChannels() {
    var version = 2;
    var method = 'GET';
    var module = 'content';
    var action = 'channels';
    var params = {};
    return this.exec(method, version, module, action, params, true);
  },
  getVideos: function getVideos(filter, sort, order) {
    var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var size = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 20;

    var version = 2;
    var module = 'content';
    var method = 'GET';
    var action = 'videos';
    var params = (0, _assign2.default)({}, filter, { sort: sort, order: order, offset: offset, size: size });
    return this.exec(method, version, module, action, params, true);
  },
  getVideo: function getVideo(id) {
    var version = 2;
    var module = 'content';
    var method = 'GET';
    var action = 'video';
    var params = {
      id: id
    };
    return this.exec(method, version, module, action, params, true);
  },
  getTvshow: function getTvshow(id) {
    var version = 2;
    var module = 'content';
    var method = 'GET';
    var action = 'tvshow';
    var params = {
      id: id
    };
    return this.exec(method, version, module, action, params, true);
  },
  getChannel: function getChannel(id) {
    var version = 2;
    var module = 'content';
    var method = 'GET';
    var action = 'channel';
    var params = {
      id: id
    };
    return this.exec(method, version, module, action, params, true);
  },
  getPerson: function getPerson(id) {
    var version = 2;
    var module = 'content';
    var method = 'GET';
    var action = 'person';
    var params = {
      id: id
    };
    return this.exec(method, version, module, action, params, true);
  },
  getBanners: function getBanners() {
    var version = 2;
    var module = 'content';
    var method = 'GET';
    var action = 'banners2';
    var params = {};
    return this.exec(method, version, module, action, params, true);
  }
};

/***/ }),
/* 545 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  getTvshows: function getTvshows() {
    var channels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var ts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var skip = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10000;
    var from = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var to = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

    return this.exec('GET', 2, 'epg', 'tvshows', { channels: channels, ts: ts, skip: skip, limit: limit, from: from, to: to }, true);
  },
  getPersons: function getPersons() {
    var ts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10000;

    return this.exec('GET', 2, 'epg', 'persons', { ts: ts, skip: skip, limit: limit }, true);
  },
  getVideos: function getVideos() {
    var ts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10000;

    return this.exec('GET', 2, 'epg', 'videos', { ts: ts, skip: skip, limit: limit }, true);
  }
};

/***/ }),
/* 546 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  getChannels: function getChannels() {
    var version = 2;
    var module = 'favorite';
    var method = 'GET';
    var action = 'channels';
    var params = {};
    return this.exec(method, version, module, action, params, true);
  },
  getVideos: function getVideos() {
    var version = 2;
    var module = 'favorite';
    var method = 'GET';
    var action = 'videos';
    var params = {};
    return this.exec(method, version, module, action, params, true);
  },
  getTvshows: function getTvshows() {
    var version = 2;
    var module = 'favorite';
    var method = 'GET';
    var action = 'tvshows';
    var params = {};
    return this.exec(method, version, module, action, params, true);
  },
  addChannel: function addChannel(id) {
    var version = 2;
    var module = 'favorite';
    var method = 'POST';
    var action = 'channel';
    var params = {
      id: id
    };
    return this.exec(method, version, module, action, params, true);
  },
  addVideo: function addVideo(id) {
    var version = 2;
    var module = 'favorite';
    var method = 'POST';
    var action = 'video';
    var params = {
      id: id
    };
    return this.exec(method, version, module, action, params, true);
  },
  addTvshow: function addTvshow(id) {
    var version = 2;
    var module = 'favorite';
    var method = 'POST';
    var action = 'tvshow';
    var params = {
      id: id
    };
    return this.exec(method, version, module, action, params, true);
  },
  removeChannel: function removeChannel(id) {
    var version = 2;
    var module = 'favorite';
    var method = 'DELETE';
    var action = 'channel';
    var params = {
      id: id
    };
    return this.exec(method, version, module, action, params, true);
  },
  removeVideo: function removeVideo(id) {
    var version = 2;
    var module = 'favorite';
    var method = 'DELETE';
    var action = 'video';
    var params = {
      id: id
    };
    return this.exec(method, version, module, action, params, true);
  },
  removeTvshow: function removeTvshow(id) {
    var version = 2;
    var module = 'favorite';
    var method = 'DELETE';
    var action = 'tvshow';
    var params = {
      id: id
    };
    return this.exec(method, version, module, action, params, true);
  }
};

/***/ }),
/* 547 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  getChannels: function getChannels(size) {
    var version = 2;
    var module = 'featured';
    var method = 'GET';
    var action = 'channels';
    var params = {
      size: size
    };
    return this.exec(method, version, module, action, params, true);
  },
  getIndex: function getIndex() {
    var version = 2;
    var module = 'featured';
    var method = 'GET';
    var action = '';
    var params = {};
    return this.exec(method, version, module, action, params, true);
  }
};

/***/ }),
/* 548 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _account = __webpack_require__(541);

var _account2 = _interopRequireDefault(_account);

var _content = __webpack_require__(544);

var _content2 = _interopRequireDefault(_content);

var _featured = __webpack_require__(547);

var _featured2 = _interopRequireDefault(_featured);

var _favorite = __webpack_require__(546);

var _favorite2 = _interopRequireDefault(_favorite);

var _search = __webpack_require__(550);

var _search2 = _interopRequireDefault(_search);

var _billing = __webpack_require__(542);

var _billing2 = _interopRequireDefault(_billing);

var _epg = __webpack_require__(545);

var _epg2 = _interopRequireDefault(_epg);

var _stream = __webpack_require__(551);

var _stream2 = _interopRequireDefault(_stream);

var _notifications = __webpack_require__(549);

var _notifications2 = _interopRequireDefault(_notifications);

var _categories = __webpack_require__(543);

var _categories2 = _interopRequireDefault(_categories);

var _utils = __webpack_require__(552);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  account: _account2.default,
  content: _content2.default,
  featured: _featured2.default,
  favorite: _favorite2.default,
  search: _search2.default,
  billing: _billing2.default,
  epg: _epg2.default,
  stream: _stream2.default,
  notifications: _notifications2.default,
  categories: _categories2.default,
  utils: _utils2.default
};

/***/ }),
/* 549 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  getGlobalNotifications: function getGlobalNotifications() {
    var version = 2;
    var module = 'notice';
    var method = 'GET';
    var action = '';
    var params = {};
    return this.exec(method, version, module, action, params, true);
  }
};

/***/ }),
/* 550 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  search: function search(query) {
    var channels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var videos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var tvshows = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    var version = 2;
    var module = 'search';
    var method = 'GET';
    var action = '';
    var params = {
      query: query,
      channels: channels === true ? 1 : 0,
      videos: videos === true ? 1 : 0,
      tvshows: tvshows === true ? 1 : 0
    };
    return this.exec(method, version, module, action, params, true);
  }
};

/***/ }),
/* 551 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  getChannel: function getChannel(id) {
    var bitrate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 600;

    var version = 1;
    var method = 'GET';
    var module = 'stream';
    var action = 'channel';
    var params = {
      id: id,
      bitrate: bitrate
    };
    return this.exec(method, version, module, action, params, true);
  },
  getTvshow: function getTvshow(id) {
    var version = 1;
    var method = 'GET';
    var module = 'stream';
    var action = 'show';
    var params = {
      id: id
    };
    return this.exec(method, version, module, action, params, true);
  },
  getVideo: function getVideo(id) {
    var version = 1;
    var method = 'GET';
    var module = 'stream';
    var action = 'video';
    var params = {
      id: id
    };
    return this.exec(method, version, module, action, params, true);
  }
};

/***/ }),
/* 552 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  getTime: function getTime() {
    var version = 2;
    var module = 'utils';
    var method = 'GET';
    var action = 'time';
    var params = {};
    return this.exec(method, version, module, action, params, true);
  },
  getCountryCodeByIP: function getCountryCodeByIP() {
    var version = 1;
    var module = 'utils';
    var method = 'GET';
    var action = 'geo';
    return this.exec(method, version, module, action);
  }
};

/***/ }),
/* 553 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _vue = __webpack_require__(93);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(929);

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

var store = new _vuex2.default.Store({
  state: {
    loadingCounter: {
      search: 0,
      login: 0,
      check: 0
    },
    authorized: false,
    utcOffset: 180,
    filter: null,
    connected: false,
    volume: 0,

    favoriteChannels: [],
    favoriteTvshows: [],
    favoriteVideos: [],

    filteredChannels: [],
    specialChannels: []
  },
  getters: {
    getAuthorized: function getAuthorized(state) {
      return state.authorized;
    },

    // eslint-disable-next-line
    getLoadingCount: function getLoadingCount(state) {
      return function (param) {
        return state.loadingCounter[param];
      };
    },
    getLoadingCounter: function getLoadingCounter(state) {
      return state.loadingCounter;
    },
    utcOffset: function utcOffset(state) {
      return state.utcOffset;
    },
    getFilter: function getFilter(state) {
      return state.filter;
    },
    getConnectionStatus: function getConnectionStatus(state) {
      return state.connected;
    },
    volume: function volume(state) {
      return state.volume;
    },
    countFavoriteChannels: function countFavoriteChannels(state) {
      return state.favoriteChannels.length;
    },
    favoriteChannels: function favoriteChannels(state) {
      return state.favoriteChannels;
    },
    favoriteTvshows: function favoriteTvshows(state) {
      return state.favoriteTvshows;
    },
    favoriteVideos: function favoriteVideos(state) {
      return state.favoriteVideos;
    }
  },
  mutations: {
    loadingCounterAdd: function loadingCounterAdd(state, param) {
      if (param === '') {
        state.loadingCounter.search += 1;
      } else {
        state.loadingCounter[param] += 1;
      }
    },
    loadingCounterPop: function loadingCounterPop(state, param) {
      if (param === '') {
        state.loadingCounter.search -= 1;
      } else {
        state.loadingCounter[param] -= 1;
      }
    },
    authorized: function authorized(state, n) {
      state.authorized = n;
    },
    changeFilter: function changeFilter(state, value) {
      state.filter = value;
    },
    connected: function connected(state, isConn) {
      state.connected = isConn;
    },
    volume: function volume(state, value) {
      state.volume = Math.max(0, Math.min(100, parseFloat(value)));
    },
    setFavoriteChannels: function setFavoriteChannels(state, value) {
      state.favoriteChannels = value || [];
    },
    setFavoriteTvshows: function setFavoriteTvshows(state, value) {
      state.favoriteTvshows = value || [];
    },
    setFavoriteVideos: function setFavoriteVideos(state, value) {
      state.favoriteVideos = value || [];
    },
    setCurrentChannels: function setCurrentChannels(state, value) {
      state.currentChannels = value || [];
    },
    setFilteredChannels: function setFilteredChannels(state, value) {
      state.filteredChannels = value || [];
    },
    setSpecialChannels: function setSpecialChannels(state, value) {
      state.specialChannels = value || [];
    }
  }
});

_vue2.default.mixin({
  methods: {
    syncVuexWithBackend: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = store;
                _context.next = 3;
                return this.$backend.favorite.getChannels();

              case 3:
                _context.t1 = _context.sent;

                _context.t0.commit.call(_context.t0, 'setFavoriteChannels', _context.t1);

                _context.t2 = store;
                _context.next = 8;
                return this.$backend.favorite.getTvshows();

              case 8:
                _context.t3 = _context.sent;

                _context.t2.commit.call(_context.t2, 'setFavoriteTvshows', _context.t3);

                _context.t4 = store;
                _context.next = 13;
                return this.$backend.favorite.getVideos();

              case 13:
                _context.t5 = _context.sent;

                _context.t4.commit.call(_context.t4, 'setFavoriteVideos', _context.t5);

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function syncVuexWithBackend() {
        return _ref.apply(this, arguments);
      }

      return syncVuexWithBackend;
    }()
  }
});

exports.default = store;

/***/ }),
/* 554 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(12);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _eventDispatcher = __webpack_require__(61);

var _eventDispatcher2 = _interopRequireDefault(_eventDispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @interface
 */
var IDeviceInfo = function (_EventDispatcher) {
  (0, _inherits3.default)(IDeviceInfo, _EventDispatcher);

  function IDeviceInfo() {
    (0, _classCallCheck3.default)(this, IDeviceInfo);
    return (0, _possibleConstructorReturn3.default)(this, (IDeviceInfo.__proto__ || (0, _getPrototypeOf2.default)(IDeviceInfo)).apply(this, arguments));
  }

  (0, _createClass3.default)(IDeviceInfo, [{
    key: 'init',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                throw new Error('IDeviceInfo.init() method not implemented');

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: 'platform',
    get: function get() {
      throw new Error('IDeviceInfo getter not implemented (see details in stack trace)');
    }
  }, {
    key: 'vendor',
    get: function get() {
      throw new Error('IDeviceInfo getter not implemented (see details in stack trace)');
    }
  }, {
    key: 'model',
    get: function get() {
      throw new Error('IDeviceInfo getter not implemented (see details in stack trace)');
    }
  }, {
    key: 'engine',
    get: function get() {
      throw new Error('IDeviceInfo getter not implemented (see details in stack trace)');
    }
  }, {
    key: 'uuid',
    get: function get() {
      throw new Error('IDeviceInfo getter not implemented (see details in stack trace)');
    }
  }, {
    key: 'display',
    get: function get() {
      throw new Error('IDeviceInfo getter not implemented (see details in stack trace)');
    }
  }, {
    key: 'online',
    get: function get() {
      throw new Error('IDeviceInfo getter not implemented (see details in stack trace)');
    }
  }], [{
    key: 'ONLINE',
    get: function get() {
      return 'ONLINE';
    }
  }, {
    key: 'OFFLINE',
    get: function get() {
      return 'OFFLINE';
    }
  }]);
  return IDeviceInfo;
}(_eventDispatcher2.default); /* eslint-disable class-methods-use-this */


exports.default = IDeviceInfo;

/***/ }),
/* 555 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable class-methods-use-this */
/**
 * @interface
 */
var IMetric = function () {
  function IMetric() {
    (0, _classCallCheck3.default)(this, IMetric);
  }

  (0, _createClass3.default)(IMetric, [{
    key: 'init',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                throw new Error('IMetric.init() method not implemented');

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: 'setDeviceType',
    value: function setDeviceType() {
      throw new Error('IMetric method not implemented (see details in stack trace)');
    }
  }, {
    key: 'setDeviceVendor',
    value: function setDeviceVendor() {
      throw new Error('IMetric method not implemented (see details in stack trace)');
    }
  }, {
    key: 'setDeviceModel',
    value: function setDeviceModel() {
      throw new Error('IMetric method not implemented (see details in stack trace)');
    }
  }, {
    key: 'setClientId',
    value: function setClientId() {
      throw new Error('IMetric method not implemented (see details in stack trace)');
    }
  }, {
    key: 'setUserId',
    value: function setUserId() {
      throw new Error('IMetric method not implemented (see details in stack trace)');
    }
  }, {
    key: 'screenView',
    value: function screenView() {
      throw new Error('IMetric method not implemented (see details in stack trace)');
    }
  }, {
    key: 'event',
    value: function event() {
      throw new Error('IMetric method not implemented (see details in stack trace)');
    }
  }, {
    key: 'timing',
    value: function timing() {
      throw new Error('IMetric method not implemented (see details in stack trace)');
    }
  }]);
  return IMetric;
}();

exports.default = IMetric;

/***/ }),
/* 556 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(12);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _eventDispatcher = __webpack_require__(61);

var _eventDispatcher2 = _interopRequireDefault(_eventDispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @interface
 */
var IVideo = function (_EventDispatcher) {
  (0, _inherits3.default)(IVideo, _EventDispatcher);

  function IVideo() {
    (0, _classCallCheck3.default)(this, IVideo);
    return (0, _possibleConstructorReturn3.default)(this, (IVideo.__proto__ || (0, _getPrototypeOf2.default)(IVideo)).apply(this, arguments));
  }

  (0, _createClass3.default)(IVideo, [{
    key: 'play',


    /**
     * Open video and play, params: url
     * @param {String} url
     */
    value: function play(url) {
      throw new Error('IVideo method not implemented (see details in stack trace)');
    }
  }, {
    key: 'resume',
    value: function resume() {
      throw new Error('IVideo method not implemented (see details in stack trace)');
    } // method, resume playback video, no params

  }, {
    key: 'stop',
    value: function stop() {
      throw new Error('IVideo method not implemented (see details in stack trace)');
    } // method, stop video, no params

  }, {
    key: 'pause',
    value: function pause() {
      throw new Error('IVideo method not implemented (see details in stack trace)');
    } // method, pause video, no params

  }, {
    key: 'close',
    value: function close() {
      throw new Error('IVideo method not implemented (see details in stack trace)');
    } // method, stop and close video streaming, no params

    /**
     * Cancels the pending method close
     */

  }, {
    key: 'open',
    value: function open() {
      throw new Error('IVideo method not implemented (see details in stack trace)');
    }
  }, {
    key: 'setViewPort',
    value: function setViewPort() {
      throw new Error('IVideo method not implemented (see details in stack trace)');
    } // property, for set window's player size

  }, {
    key: 'seek',
    set: function set(value) {
      throw new Error('IVideo setter not implemented (see details in stack trace)');
    } // property, set concrete time in video, params: time

  }, {
    key: 'volume',
    get: function get() {
      throw new Error('IVideo getter not implemented (see details in stack trace)');
    } // property, get/set volume, for set option need parameter from 0 to 1
    ,
    set: function set(value) {
      throw new Error('IVideo setter not implemented (see details in stack trace)');
    } // property, get/set volume, for set option need parameter from 0 to 1

  }, {
    key: 'currentTime',
    get: function get() {
      throw new Error('IVideo getter not implemented (see details in stack trace)');
    } // property, get current time from video track

  }, {
    key: 'duration',
    get: function get() {
      throw new Error('IVideo getter not implemented (see details in stack trace)');
    } // property, get video duration

  }, {
    key: 'buffered',
    get: function get() {
      throw new Error('IVideo getter not implemented (see details in stack trace)');
    } // property, get buffered time

  }, {
    key: 'played',
    get: function get() {
      throw new Error('IVideo getter not implemented (see details in stack trace)');
    } // property, get true if video played

  }, {
    key: 'state',
    get: function get() {
      throw new Error('IVideo getter not implemented (see details in stack trace)');
    } // property, return player state

    /**
     * Текущий проигрываемый url
     */

  }, {
    key: 'url',
    get: function get() {
      throw new Error('IVideo getter not implemented (see details in stack trace)');
    }
  }], [{
    key: 'ABORT',
    get: function get() {
      return 'ABORT';
    }
  }, {
    key: 'HAVE_NOTHING',
    get: function get() {
      return 'HAVE_NOTHING';
    }
  }, {
    key: 'HAVE_METADATA',
    get: function get() {
      return 'HAVE_METADATA';
    }
  }, {
    key: 'HAVE_CURRENT_DATA',
    get: function get() {
      return 'HAVE_CURRENT_DATA';
    }
  }, {
    key: 'HAVE_FUTURE_DATA',
    get: function get() {
      return 'HAVE_FUTURE_DATA';
    }
  }, {
    key: 'HAVE_ENOUGH_DATA',
    get: function get() {
      return 'HAVE_ENOUGH_DATA';
    }
  }, {
    key: 'READY_STATE',
    get: function get() {
      return 'READY_STATE';
    }
  }, {
    key: 'PLAY_ENDED',
    get: function get() {
      return 'PLAY_ENDED';
    }
  }, {
    key: 'START_LOADING',
    get: function get() {
      return 'START_LOADING';
    }
    // Воспроизведение после паузы

  }, {
    key: 'PLAYED',
    get: function get() {
      return 'PLAYED';
    }
  }, {
    key: 'PAUSED',
    get: function get() {
      return 'PAUSED';
    }
    // Стартовое воспроизведение воспроизведение

  }, {
    key: 'PLAY_START',
    get: function get() {
      return 'PLAY_START';
    }
  }, {
    key: 'LOAD_PROGRESS',
    get: function get() {
      return 'LOAD_PROGRESS';
    }
  }, {
    key: 'START_SEEK',
    get: function get() {
      return 'START_SEEK';
    }
  }, {
    key: 'STOP_SEEK',
    get: function get() {
      return 'STOP_SEEK';
    }
  }, {
    key: 'VOLUME_CHANGE',
    get: function get() {
      return 'VOLUME_CHANGE';
    }
  }, {
    key: 'STOPPED',
    get: function get() {
      return 'STOPPED';
    }
  }, {
    key: 'TIME_UPDATE',
    get: function get() {
      return 'TIME_UPDATE';
    }
  }, {
    key: 'WAITING',
    get: function get() {
      return 'WAITING';
    }
  }, {
    key: 'PLAY_ERROR',
    get: function get() {
      return 'PLAY_ERROR';
    }
  }]);
  return IVideo;
}(_eventDispatcher2.default); /* eslint-disable class-methods-use-this,no-unused-vars */

exports.default = IVideo;

/***/ }),
/* 557 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DeviceInfoHtml = __webpack_require__(561);

var _DeviceInfoHtml2 = _interopRequireDefault(_DeviceInfoHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _DeviceInfoHtml2.default;

/***/ }),
/* 558 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MetricHtml = __webpack_require__(562);

var _MetricHtml2 = _interopRequireDefault(_MetricHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _MetricHtml2.default;

/***/ }),
/* 559 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VideoHtmlHls = __webpack_require__(564);

var _VideoHtmlHls2 = _interopRequireDefault(_VideoHtmlHls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _VideoHtmlHls2.default;

/***/ }),
/* 560 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(444);

/***/ }),
/* 561 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(12);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _uaParserJs = __webpack_require__(435);

var _uaParserJs2 = _interopRequireDefault(_uaParserJs);

var _jsCookie = __webpack_require__(747);

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _jquery = __webpack_require__(92);

var _jquery2 = _interopRequireDefault(_jquery);

var _IDeviceInfo2 = __webpack_require__(554);

var _IDeviceInfo3 = _interopRequireDefault(_IDeviceInfo2);

var _Storage = __webpack_require__(94);

var _Storage2 = _interopRequireDefault(_Storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//eslint-disable-line

/**
 * @interface IDeviceInfo
 */
var DeviceInfoHtml5 = function (_IDeviceInfo) {
  (0, _inherits3.default)(DeviceInfoHtml5, _IDeviceInfo);

  function DeviceInfoHtml5() {
    (0, _classCallCheck3.default)(this, DeviceInfoHtml5);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DeviceInfoHtml5.__proto__ || (0, _getPrototypeOf2.default)(DeviceInfoHtml5)).call(this));

    _this.storage = _Storage2.default.getInstance();
    _this.window = window;
    _this.window.addEventListener('online', function () {
      _this.dispatchEvent(DeviceInfoHtml5.ONLINE);
    });
    _this.window.addEventListener('offline', function () {
      _this.dispatchEvent(DeviceInfoHtml5.OFFLINE);
    });

    var parser = new _uaParserJs2.default();
    _this.ua = parser.getResult();
    return _this;
  }

  (0, _createClass3.default)(DeviceInfoHtml5, [{
    key: 'init',


    // eslint-disable-next-line
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: 'platform',


    //eslint-disable-next-line
    get: function get() {
      return 'pc';
    }
  }, {
    key: 'vendor',
    get: function get() {
      if (this.ua.device.vendor !== undefined) {
        return this.ua.device.vendor;
      }
      return this.ua.os.name;
    }
  }, {
    key: 'model',
    get: function get() {
      if (this.ua.device.model !== undefined) {
        return this.ua.device.model;
      }
      return this.ua.browser.name;
    }
  }, {
    key: 'engine',
    get: function get() {
      return this.ua.browser.name + ' ' + this.ua.browser.version + ' (' + this.ua.os.name + ' ' + this.ua.os.version + ')';
    }
  }, {
    key: 'uuid',
    get: function get() {
      var storageUuid = void 0;
      try {
        storageUuid = this.storage.getOption('uuid');
      } catch (e) {
        console.error(e);
      }
      var cookieUuid = _jsCookie2.default.get('uuid');
      if (!storageUuid && !cookieUuid) {
        var uuid = this.constructor.generateUuid();
        this.storage.setOption('uuid', uuid);
        _jsCookie2.default.set('uuid', uuid);
      } else if (!storageUuid) {
        this.storage.setOption('uuid', cookieUuid);
      } else if (!cookieUuid) {
        _jsCookie2.default.set('uuid', storageUuid);
      }
      return this.storage.getOption('uuid');
    }
  }, {
    key: 'display',
    get: function get() {
      return {
        width: (0, _jquery2.default)(this.window).width(),
        height: (0, _jquery2.default)(this.window).height()
      };
    }
  }, {
    key: 'online',
    get: function get() {
      return this.window.navigator.onLine;
    }
  }], [{
    key: 'generateUuid',
    value: function generateUuid() {
      var uuid = '';
      var words = '23456789ABCDEFGHKLMNPRSTUVWXYZ';
      var maxPosition = words.length - 1;
      for (var i = 0; i < 16; i += 1) {
        var position = Math.floor(Math.random() * maxPosition);
        uuid += words.substring(position, position + 1);
      }
      return uuid;
    }
  }]);
  return DeviceInfoHtml5;
}(_IDeviceInfo3.default);

exports.default = DeviceInfoHtml5;

/***/ }),
/* 562 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(12);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _universalGa = __webpack_require__(762);

var _universalGa2 = _interopRequireDefault(_universalGa);

var _IMetric2 = __webpack_require__(555);

var _IMetric3 = _interopRequireDefault(_IMetric2);

var _v = __webpack_require__(775);

var _v2 = _interopRequireDefault(_v);

var _jsMd = __webpack_require__(748);

var _jsMd2 = _interopRequireDefault(_jsMd);

var _uuidValidate = __webpack_require__(772);

var _uuidValidate2 = _interopRequireDefault(_uuidValidate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MetricHtml = function (_IMetric) {
  (0, _inherits3.default)(MetricHtml, _IMetric);
  (0, _createClass3.default)(MetricHtml, null, [{
    key: 'DEVICE_TYPE',
    get: function get() {
      return 'dimension1';
    }
  }, {
    key: 'DEVICE_VENDOR',
    get: function get() {
      return 'dimension2';
    }
  }, {
    key: 'DEVICE_MODEL',
    get: function get() {
      return 'dimension3';
    }
  }]);

  function MetricHtml() {
    (0, _classCallCheck3.default)(this, MetricHtml);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MetricHtml.__proto__ || (0, _getPrototypeOf2.default)(MetricHtml)).call(this));

    _this.analytics = _universalGa2.default;
    return _this;
  }

  (0, _createClass3.default)(MetricHtml, [{
    key: 'init',
    value: function init(id) {
      var params = {
        storage: 'none'
      };
      if (this.clientId) {
        params.clientId = this.clientId;
      }
      this.analytics.initialize(id, params);
      this.analytics.set('checkProtocolTask', null);
      this.analytics.set('checkStorageTask', null);
      this.analytics.set('historyImportTask', null);
      this.options = {};
    }

    /**
     *
     * Устанавливать параметр нужно до выполнения init()
     *
     * @param value UUID v4 or any string (with auto convert to uuid v4)
     */

  }, {
    key: 'setClientId',
    value: function setClientId(value) {
      if ((0, _uuidValidate2.default)(value, 4)) {
        this.clientId = value;
      } else {
        this.clientId = (0, _v2.default)({ random: _jsMd2.default.array(value) });
      }
    }
  }, {
    key: 'setUserId',
    value: function setUserId(value) {
      if (value) {
        this.analytics.set('userId', value);
      }
    }
  }, {
    key: 'setDeviceType',
    value: function setDeviceType(value) {
      this.analytics.custom(this.constructor.DEVICE_TYPE, value);
    }
  }, {
    key: 'setDeviceVendor',
    value: function setDeviceVendor(value) {
      this.analytics.custom(this.constructor.DEVICE_VENDOR, value);
    }
  }, {
    key: 'setDeviceModel',
    value: function setDeviceModel(value) {
      this.analytics.custom(this.constructor.DEVICE_MODEL, value);
    }
  }, {
    key: 'setAppName',
    value: function setAppName(value) {
      this.options.appName = value;
    }
  }, {
    key: 'setAppVersion',
    value: function setAppVersion(value) {
      this.options.appVersion = value;
    }
  }, {
    key: 'screenView',
    value: function screenView(screenName) {
      this.analytics.screenview(screenName, this.options);
    }
  }, {
    key: 'event',
    value: function event(category, action) {
      var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var nonInteraction = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      var params = { nonInteraction: nonInteraction };
      if (label !== null) {
        params.eventLabel = label;
      }
      if (value !== null) {
        params.eventValue = value;
      }
      this.analytics.event(category, action, params);
    }
  }, {
    key: 'timing',
    value: function timing(category, timingVar, value, options) {
      this.analytics.timing(category, timingVar, value, options);
    }
  }]);
  return MetricHtml;
}(_IMetric3.default);

exports.default = MetricHtml;

/***/ }),
/* 563 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(12);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _IVideo2 = __webpack_require__(556);

var _IVideo3 = _interopRequireDefault(_IVideo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VideoHtml = function (_IVideo) {
  (0, _inherits3.default)(VideoHtml, _IVideo);

  function VideoHtml() {
    (0, _classCallCheck3.default)(this, VideoHtml);

    // TODO: убрать после отладки
    var _this = (0, _possibleConstructorReturn3.default)(this, (VideoHtml.__proto__ || (0, _getPrototypeOf2.default)(VideoHtml)).call(this));

    window.videoPlayer = _this;

    _this.lastUrl = null;
    _this.ready = false;

    _this.createVideoTag();

    _this.video.addEventListener('canplay', function () {
      _this.dispatchEvent(_IVideo3.default.READY_STATE);
      _this.ready = true;
    });
    _this.video.addEventListener('loadstart', function () {
      _this.dispatchEvent(_IVideo3.default.START_LOADING);
    });
    _this.video.addEventListener('play', function () {
      _this.dispatchEvent(_IVideo3.default.PLAY);
    });
    _this.video.addEventListener('pause', function () {
      _this.dispatchEvent(_IVideo3.default.PAUSE);
    });
    _this.video.addEventListener('playing', function () {
      _this.dispatchEvent(_IVideo3.default.PLAY_START);
    });
    _this.video.addEventListener('progress', function () {
      _this.dispatchEvent(_IVideo3.default.LOAD_PROGRESS);
    });
    _this.video.addEventListener('seeking', function () {
      _this.dispatchEvent(_IVideo3.default.START_SEEK);
    });
    _this.video.addEventListener('seeked', function () {
      _this.dispatchEvent(_IVideo3.default.STOP_SEEK);
    });
    _this.video.addEventListener('volumechange', function () {
      _this.dispatchEvent(_IVideo3.default.VOLUME_CHANGE);
    });
    _this.video.addEventListener('timeupdate', function () {
      _this.dispatchEvent(_IVideo3.default.TIME_UPDATE);
    });
    _this.video.addEventListener('waiting', function () {
      _this.dispatchEvent(_IVideo3.default.WAITING);
    });
    _this.video.addEventListener('ended', function () {
      _this.dispatchEvent(_IVideo3.default.PLAY_ENDED);
    });
    _this.video.addEventListener('error', function () {
      var error = {
        event: 'Html video tag event',
        type: _this.video.error.code,
        details: _this.video.error.message
      };
      _this.dispatchEvent(_IVideo3.default.PLAY_ERROR, error);
    });
    return _this;
  }

  (0, _createClass3.default)(VideoHtml, [{
    key: 'play',
    value: function play(url) {
      this.ready = false;
      this.stop();
      this.video.setAttribute('src', url);
      this.video.load();
      this.video.play();
      this.lastUrl = url;
    }
  }, {
    key: 'resume',
    value: function resume() {
      this.video.play();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.lastUrl = null;
      this.video.pause();
      this.video.removeAttribute('src');
    }

    // eslint-disable-next-line

  }, {
    key: 'open',
    value: function open() {}
  }, {
    key: 'close',
    value: function close() {
      this.stop();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.video.pause();
    }
  }, {
    key: 'setViewPort',
    value: function setViewPort(x, y, width, height) {
      if (width !== 0 && height !== 0 && y !== 0 && x !== 0) {
        this.video.style.width = width + 'rem';
        this.video.style.height = height + 'rem';
        this.video.style.top = y + 'rem';
        this.video.style.left = x + 'rem';
      } else if (x === 10 && y === 10) {
        this.video.style.width = '99.5%';
        this.video.style.height = '100vh';
        this.video.style.top = '0';
        this.video.style.left = '0';
      } else {
        this.video.style.width = '100%';
        this.video.style.height = '100vh';
        this.video.style.top = '0';
        this.video.style.left = '0';
      }
    }
  }, {
    key: 'createVideoTag',
    value: function createVideoTag() {
      var video = document.createElement('video');
      video.setAttribute('id', 'player_window');
      var content = document.querySelector('.app-content');
      content.insertBefore(video, content.firstChild);
      this.video = video;
    }
  }, {
    key: 'volume',
    get: function get() {
      return this.video.volume;
    },
    set: function set(value) {
      this.video.volume = value;
    }
  }, {
    key: 'seek',
    set: function set(value) {
      this.video.currentTime = value;
    }
  }, {
    key: 'currentTime',
    get: function get() {
      return this.video.currentTime;
    }
  }, {
    key: 'duration',
    get: function get() {
      return this.video.duration;
    }
  }, {
    key: 'buffered',
    get: function get() {
      var maxBuffered = 0;
      for (var i = 0; i < this.video.buffered.length; i += 1) {
        if (this.video.buffered.end(i) > maxBuffered) {
          maxBuffered = this.video.buffered.end(i);
        }
      }
      return maxBuffered;
    }
  }, {
    key: 'state',
    get: function get() {
      if (this.ready) {
        if (this.played) return _IVideo3.default.PLAYED;
        if (this.video.paused) return _IVideo3.default.PAUSED;
        return _IVideo3.default.READY_STATE;
      }
      var readyState = this.video.readyState;
      if (readyState === 0) return _IVideo3.default.HAVE_NOTHING;
      if (readyState === 1) return _IVideo3.default.HAVE_METADATA;
      if (readyState === 2) return _IVideo3.default.HAVE_CURRENT_DATA;
      if (readyState === 3) return _IVideo3.default.HAVE_FUTURE_DATA;
      if (readyState === 4) return _IVideo3.default.HAVE_ENOUGH_DATA;
      return _IVideo3.default.ABORT;
    }
  }, {
    key: 'played',
    get: function get() {
      return this.video.currentTime > 0 && !this.video.paused && !this.video.ended && this.video.readyState > 2;
    }
  }, {
    key: 'url',
    get: function get() {
      return this.lastUrl;
    }
  }]);
  return VideoHtml;
}(_IVideo3.default);

exports.default = VideoHtml;

/***/ }),
/* 564 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(12);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(119);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _hls = __webpack_require__(307);

var _hls2 = _interopRequireDefault(_hls);

var _VideoHtml2 = __webpack_require__(563);

var _VideoHtml3 = _interopRequireDefault(_VideoHtml2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VideoHtmlHls = function (_VideoHtml) {
  (0, _inherits3.default)(VideoHtmlHls, _VideoHtml);

  function VideoHtmlHls() {
    (0, _classCallCheck3.default)(this, VideoHtmlHls);

    var _this = (0, _possibleConstructorReturn3.default)(this, (VideoHtmlHls.__proto__ || (0, _getPrototypeOf2.default)(VideoHtmlHls)).call(this));

    _this.useHls = true;
    return _this;
  }

  (0, _createClass3.default)(VideoHtmlHls, [{
    key: 'setupHls',
    value: function setupHls() {
      var _this2 = this;

      this.hls = new _hls2.default();
      this.recoverAttemptsRemaining = 5;

      this.hls.on(_hls2.default.Events.MANIFEST_PARSED, (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _this2.video.play();

              case 3:
                _context.next = 7;
                break;

              case 5:
                _context.prev = 5;
                _context.t0 = _context['catch'](0);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2, [[0, 5]]);
      })) //eslint-disable-line
      );

      this.hls.on(_hls2.default.Events.ERROR, function (event, data) {
        var error = {
          event: event,
          type: data.type,
          details: data.details
        };
        // подавление нефатальных ошибок
        if (!data.fatal) {
          console.log(data);
        } else if (_this2.recoverAttemptsRemaining > 0) {
          switch (data.type) {
            case _hls2.default.ErrorTypes.NETWORK_ERROR:
              // try to recover network error
              console.log('Hls: fatal network error encountered, try to recover');
              _this2.hls.startLoad();
              break;
            case _hls2.default.ErrorTypes.MEDIA_ERROR:
              console.log('Hls: fatal media error encountered, try to recover');
              _this2.hls.recoverMediaError();
              break;
            default:
              // cannot recover
              _this2.stop();
              break;
          }
          _this2.recoverAttemptsRemaining -= 1;
        } else {
          console.error(data);
          _this2.stop();
          _this2.dispatchEvent(VideoHtmlHls.PLAY_ERROR, error);
        }
      });
    }
  }, {
    key: 'play',
    value: function play(url) {
      if (this.useHls && _hls2.default.isSupported()) {
        if (!this.hls) {
          this.setupHls();
        }
        this.hls.loadSource(url);
        this.hls.attachMedia(this.video);
        this.lastUrl = url;
      } else {
        (0, _get3.default)(VideoHtmlHls.prototype.__proto__ || (0, _getPrototypeOf2.default)(VideoHtmlHls.prototype), 'play', this).call(this, url);
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this.useHls && _hls2.default.isSupported()) {
        this.lastUrl = null;
        if (this.hls) {
          this.hls.stopLoad();
          this.hls.detachMedia();
          this.destroyHls();
        }
      } else {
        (0, _get3.default)(VideoHtmlHls.prototype.__proto__ || (0, _getPrototypeOf2.default)(VideoHtmlHls.prototype), 'stop', this).call(this);
      }
    }
  }, {
    key: 'destroyHls',
    value: function destroyHls() {
      this.hls.destroy();
      var tmpHls = this.hls;
      setTimeout(function () {
        // улучшенная очистка памяти hls
        // таймаут нужен для завершения таймаутов самого HLS
        //eslint-disable-next-line
        if (tmpHls.abrController && tmpHls.abrController._bwEstimator) {
          //eslint-disable-next-line
          tmpHls.abrController._bwEstimator.hls = null;
        }

        if (tmpHls.coreComponents && tmpHls.coreComponents.length) {
          tmpHls.coreComponents.forEach(function (component) {
            component.hls = null;
            component.media = null;
            component.cea608Parser = null;
          });
        }
        if (tmpHls.networkControllers && tmpHls.networkControllers.length) {
          tmpHls.networkControllers.forEach(function (component) {
            component.hls = null;
          });
        }
        tmpHls.coreComponents = null;
        tmpHls.networkControllers = null;
      }, 5000);
      this.hls = null;
    }
  }]);
  return VideoHtmlHls;
}(_VideoHtml3.default);

exports.default = VideoHtmlHls;

/***/ }),
/* 565 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(12);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Epg = __webpack_require__(62);

var _Epg2 = _interopRequireDefault(_Epg);

var _IEpgReader2 = __webpack_require__(169);

var _IEpgReader3 = _interopRequireDefault(_IEpgReader2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EpgReaderDefault = function (_IEpgReader) {
  (0, _inherits3.default)(EpgReaderDefault, _IEpgReader);

  function EpgReaderDefault() {
    (0, _classCallCheck3.default)(this, EpgReaderDefault);

    var _this = (0, _possibleConstructorReturn3.default)(this, (EpgReaderDefault.__proto__ || (0, _getPrototypeOf2.default)(EpgReaderDefault)).call(this));

    _this.epg = _Epg2.default.getInstance();
    return _this;
  }
  //eslint-disable-next-line


  (0, _createClass3.default)(EpgReaderDefault, [{
    key: 'openDb',
    value: function openDb() {}
    // epg already opened

    //eslint-disable-next-line

  }, {
    key: 'close',
    value: function close() {}
  }, {
    key: 'getNextTvshows',
    value: function getNextTvshows() {
      var _epg;

      return (_epg = this.epg).getNextTvshows.apply(_epg, arguments);
    }
  }, {
    key: 'getPrevTvshows',
    value: function getPrevTvshows() {
      var _epg2;

      return (_epg2 = this.epg).getPrevTvshows.apply(_epg2, arguments);
    }
  }, {
    key: 'getTvshowsByDate',
    value: function getTvshowsByDate() {
      var _epg3;

      return (_epg3 = this.epg).getTvshowsByDate.apply(_epg3, arguments);
    }
  }, {
    key: 'getTvshowById',
    value: function getTvshowById() {
      var _epg4;

      return (_epg4 = this.epg).getTvshowById.apply(_epg4, arguments);
    }
  }, {
    key: 'getTvshowsRange',
    value: function getTvshowsRange() {
      var _epg5;

      return (_epg5 = this.epg).getTvshowsRange.apply(_epg5, arguments);
    }
  }, {
    key: 'getVideoById',
    value: function getVideoById() {
      var _epg6;

      return (_epg6 = this.epg).getVideoById.apply(_epg6, arguments);
    }
  }, {
    key: 'getDatesByChannelId',
    value: function getDatesByChannelId() {
      var _epg7;

      return (_epg7 = this.epg).getDatesByChannelId.apply(_epg7, arguments);
    }
  }]);
  return EpgReaderDefault;
}(_IEpgReader3.default);

exports.default = EpgReaderDefault;

/***/ }),
/* 566 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(12);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _promiseWorker = __webpack_require__(753);

var _promiseWorker2 = _interopRequireDefault(_promiseWorker);

var _webworkifyWebpack = __webpack_require__(930);

var _webworkifyWebpack2 = _interopRequireDefault(_webworkifyWebpack);

var _IEpgReader2 = __webpack_require__(169);

var _IEpgReader3 = _interopRequireDefault(_IEpgReader2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var epgWorker = (0, _webworkifyWebpack2.default)(/*require.resolve*/(567));
var promiseEpgWorker = new _promiseWorker2.default(epgWorker);

var EpgReaderWebWorker = function (_IEpgReader) {
  (0, _inherits3.default)(EpgReaderWebWorker, _IEpgReader);

  function EpgReaderWebWorker() {
    (0, _classCallCheck3.default)(this, EpgReaderWebWorker);
    return (0, _possibleConstructorReturn3.default)(this, (EpgReaderWebWorker.__proto__ || (0, _getPrototypeOf2.default)(EpgReaderWebWorker)).apply(this, arguments));
  }

  (0, _createClass3.default)(EpgReaderWebWorker, [{
    key: 'postMessage',

    //eslint-disable-next-line
    value: function postMessage(method, args) {
      return promiseEpgWorker.postMessage({ method: method, args: args });
    }
  }, {
    key: 'openDb',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', this.postMessage('openDb', args));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function openDb() {
        return _ref.apply(this, arguments);
      }

      return openDb;
    }()
  }, {
    key: 'close',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', this.postMessage('close', []));

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function close() {
        return _ref2.apply(this, arguments);
      }

      return close;
    }()
  }, {
    key: 'getNextTvshows',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', this.postMessage('getNextTvshows', args));

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getNextTvshows() {
        return _ref3.apply(this, arguments);
      }

      return getNextTvshows;
    }()
  }, {
    key: 'getPrevTvshows',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt('return', this.postMessage('getPrevTvshows', args));

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getPrevTvshows() {
        return _ref4.apply(this, arguments);
      }

      return getPrevTvshows;
    }()
  }, {
    key: 'getTvshowsByDate',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt('return', this.postMessage('getTvshowsByDate', args));

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getTvshowsByDate() {
        return _ref5.apply(this, arguments);
      }

      return getTvshowsByDate;
    }()
  }, {
    key: 'getTvshowById',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt('return', this.postMessage('getTvshowById', args));

              case 1:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getTvshowById() {
        return _ref6.apply(this, arguments);
      }

      return getTvshowById;
    }()
  }, {
    key: 'getTvshowsRange',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          args[_key6] = arguments[_key6];
        }

        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt('return', this.postMessage('getTvshowsRange', args));

              case 1:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getTvshowsRange() {
        return _ref7.apply(this, arguments);
      }

      return getTvshowsRange;
    }()
  }, {
    key: 'getVideoById',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
        for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
          args[_key7] = arguments[_key7];
        }

        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt('return', this.postMessage('getVideoById', args));

              case 1:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getVideoById() {
        return _ref8.apply(this, arguments);
      }

      return getVideoById;
    }()
  }, {
    key: 'getDatesByChannelId',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
        for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
          args[_key8] = arguments[_key8];
        }

        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                return _context9.abrupt('return', this.postMessage('getDatesByChannelId', args));

              case 1:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getDatesByChannelId() {
        return _ref9.apply(this, arguments);
      }

      return getDatesByChannelId;
    }()
  }]);
  return EpgReaderWebWorker;
}(_IEpgReader3.default);

exports.default = EpgReaderWebWorker;

/***/ }),
/* 567 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(44);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = myWorker;

__webpack_require__(286);

__webpack_require__(291);

__webpack_require__(294);

__webpack_require__(295);

__webpack_require__(289);

__webpack_require__(292);

__webpack_require__(290);

__webpack_require__(293);

__webpack_require__(287);

__webpack_require__(288);

__webpack_require__(223);

__webpack_require__(277);

__webpack_require__(296);

__webpack_require__(297);

__webpack_require__(259);

__webpack_require__(260);

__webpack_require__(261);

__webpack_require__(262);

__webpack_require__(265);

__webpack_require__(263);

__webpack_require__(264);

__webpack_require__(266);

__webpack_require__(267);

__webpack_require__(268);

__webpack_require__(269);

__webpack_require__(271);

__webpack_require__(270);

__webpack_require__(258);

__webpack_require__(285);

__webpack_require__(247);

__webpack_require__(256);

__webpack_require__(255);

__webpack_require__(252);

__webpack_require__(253);

__webpack_require__(251);

__webpack_require__(248);

__webpack_require__(250);

__webpack_require__(254);

__webpack_require__(249);

__webpack_require__(246);

__webpack_require__(257);

__webpack_require__(222);

__webpack_require__(282);

__webpack_require__(280);

__webpack_require__(278);

__webpack_require__(283);

__webpack_require__(284);

__webpack_require__(279);

__webpack_require__(281);

__webpack_require__(272);

__webpack_require__(273);

__webpack_require__(274);

__webpack_require__(276);

__webpack_require__(275);

__webpack_require__(220);

__webpack_require__(221);

__webpack_require__(216);

__webpack_require__(219);

__webpack_require__(218);

__webpack_require__(217);

__webpack_require__(112);

__webpack_require__(242);

__webpack_require__(243);

__webpack_require__(241);

__webpack_require__(245);

__webpack_require__(244);

__webpack_require__(224);

__webpack_require__(225);

__webpack_require__(226);

__webpack_require__(227);

__webpack_require__(228);

__webpack_require__(229);

__webpack_require__(230);

__webpack_require__(231);

__webpack_require__(232);

__webpack_require__(233);

__webpack_require__(235);

__webpack_require__(234);

__webpack_require__(236);

__webpack_require__(237);

__webpack_require__(238);

__webpack_require__(239);

__webpack_require__(240);

__webpack_require__(298);

__webpack_require__(301);

__webpack_require__(299);

__webpack_require__(300);

__webpack_require__(303);

__webpack_require__(302);

__webpack_require__(306);

__webpack_require__(305);

__webpack_require__(304);

__webpack_require__(162);

var _register = __webpack_require__(754);

var _register2 = _interopRequireDefault(_register);

var _Epg = __webpack_require__(62);

var _Epg2 = _interopRequireDefault(_Epg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Epg2.default.setIndexedDB(indexedDB, IDBKeyRange);
var epg = _Epg2.default.getInstance();

function myWorker() {
  (0, _register2.default)(function (message) {
    var method = message.method;
    var args = message.args;
    return epg[method].apply(epg, (0, _toConsumableArray3.default)(args));
  });
}

/***/ }),
/* 568 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _vue = __webpack_require__(93);

var _vue2 = _interopRequireDefault(_vue);

var _jsnlog = __webpack_require__(309);

var _App = __webpack_require__(798);

var _App2 = _interopRequireDefault(_App);

var _router = __webpack_require__(571);

var _router2 = _interopRequireDefault(_router);

var _NotificationsManager = __webpack_require__(569);

var _NotificationsManager2 = _interopRequireDefault(_NotificationsManager);

var _DeviceInfo = __webpack_require__(63);

var _DeviceInfo2 = _interopRequireDefault(_DeviceInfo);

var _Metric = __webpack_require__(8);

var _Metric2 = _interopRequireDefault(_Metric);

var _EpgManager = __webpack_require__(118);

var _EpgManager2 = _interopRequireDefault(_EpgManager);

var _Backend = __webpack_require__(168);

var _Backend2 = _interopRequireDefault(_Backend);

var _vuex = __webpack_require__(553);

var _vuex2 = _interopRequireDefault(_vuex);

var _vueBemCn = __webpack_require__(777);

var _vueBemCn2 = _interopRequireDefault(_vueBemCn);

var _Epg = __webpack_require__(62);

var _Epg2 = _interopRequireDefault(_Epg);

var _Storage = __webpack_require__(94);

var _Storage2 = _interopRequireDefault(_Storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line
exports.default = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  var deviceInfo, backend, env, appVersion, metric, userId, epgm, currentBackend, nm;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          deviceInfo = _DeviceInfo2.default.getInstance();
          _context.next = 3;
          return deviceInfo.init();

        case 3:
          _jsnlog.JL.setOptions({
            defaultAjaxUrl: 'http://api.persik.by:8080/v2/utils/report-error?uuid=' + encodeURIComponent(deviceInfo.uuid) + '&device=' + deviceInfo.platform
          });

          _Epg2.default.setIndexedDB(window.indexedDB, window.IDBKeyRange);

          backend = _Backend2.default.getInstance();

          console.log('Backend init:');
          _context.next = 9;
          return backend.init();

        case 9:
          console.log('Backend', backend.code, 'inited');

          env = __webpack_require__.i({"NODE_ENV":"production","BUILD_DATE":"201810240919","BUILD_NUMBER":'N/A'});
          appVersion = env.BUILD_NUMBER ? '#' + env.BUILD_NUMBER + ' (' + env.BUILD_DATE + ')' : 'N/A';
          metric = _Metric2.default.getInstance();

          metric.setClientId(deviceInfo.uuid);

          _context.next = 16;
          return metric.init(backend.metricId);

        case 16:
          metric.setDeviceType('tv');
          metric.setDeviceVendor(deviceInfo.vendor);
          metric.setDeviceModel(deviceInfo.model);

          if (!backend.authorized) {
            _context.next = 30;
            break;
          }

          _context.prev = 20;
          _context.next = 23;
          return backend.account.getUserId();

        case 23:
          userId = _context.sent;

          metric.setUserId(userId);
          _context.next = 30;
          break;

        case 27:
          _context.prev = 27;
          _context.t0 = _context['catch'](20);

          console.log(_context.t0);

        case 30:
          metric.setAppName(backend.code);
          metric.setAppVersion(appVersion);
          metric.screenView('splash');

          epgm = _EpgManager2.default.getInstance();
          // полный сброс всего, если бекэнд изменился

          currentBackend = _Storage2.default.getInstance().getOption('backend', backend.code) || backend.code;

          if (!(currentBackend !== backend.code)) {
            _context.next = 43;
            break;
          }

          console.log('Backend will change from', currentBackend, 'to', backend.code);
          _context.next = 39;
          return backend.reset();

        case 39:
          _context.next = 41;
          return epgm.openDb();

        case 41:
          _context.next = 43;
          return epgm.deleteEpg();

        case 43:
          _Storage2.default.getInstance().setOption('backend', backend.code);

          nm = new _NotificationsManager2.default();
          // const km = KeyboardManager.getInstance();
          // km.init();

          Object.defineProperty(_vue2.default.prototype, '$backend', { value: backend });
          // Object.defineProperty(Vue.prototype, '$km', { value: km });
          Object.defineProperty(_vue2.default.prototype, '$nm', { value: nm });
          // Object.defineProperty(Vue.prototype, '$crazyMonkey', { value: new CrazyMonkey(km) });

          _vue2.default.use(_vueBemCn2.default, { delimiters: {
              ns: '', // namespace
              el: '__', // element delimeter
              mod: '_', // modifier delimeter
              modVal: '-' // value delimeter for modifier
            } });

          // eslint-disable no-new
          window.vm = new _vue2.default({
            el: '#app',
            router: _router2.default,
            store: _vuex2.default,
            data: {
              username: 'user name'
            },
            template: '<App v-bind:username="username" />',
            components: { App: _App2.default }
          });

        case 49:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this, [[20, 27]]);
}));
// eslint-disable-next-line

// import CrazyMonkey from '@/persik/ui/CrazyMonkey';

// import KeyboardManager from '@/persik/ui/KeyboardManager.es6';

/***/ }),
/* 569 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(12);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _eventDispatcher = __webpack_require__(61);

var _eventDispatcher2 = _interopRequireDefault(_eventDispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotificationsManager = function (_EventDispatcher) {
  (0, _inherits3.default)(NotificationsManager, _EventDispatcher);
  (0, _createClass3.default)(NotificationsManager, null, [{
    key: 'MESSAGE',
    get: function get() {
      return 'message';
    }
  }, {
    key: 'ERROR',
    get: function get() {
      return 'error';
    }
  }, {
    key: 'WARNING',
    get: function get() {
      return 'warning';
    }
  }]);

  function NotificationsManager() {
    (0, _classCallCheck3.default)(this, NotificationsManager);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NotificationsManager.__proto__ || (0, _getPrototypeOf2.default)(NotificationsManager)).call(this));

    _this.Ncounter = 0;
    _this.Mcounter = 0;
    _this.notifications = [];
    _this.modals = [];
    _this.lifetimeIntervalId = null;
    return _this;
  }

  (0, _createClass3.default)(NotificationsManager, [{
    key: 'setNotification',
    value: function setNotification(textMsg, lifeMsg, nameButton, func, category) {
      if (!this.notifications.some(function (notif) {
        return notif.message === textMsg;
      })) {
        var id = this.idIncNotif();
        this.notifications.push({
          id: id,
          methodName: category,
          message: textMsg,
          btName: nameButton,
          func: func,
          lifetime: lifeMsg,
          passed: 0
        });
        if (!this.lifetimeIntervalId) {
          this.lifetimeNotification();
        }
        this.dispatchEvent('notificationEvent', this.notifications);
        return id;
      }
      return null;
    }
  }, {
    key: 'setModal',
    value: function setModal(contentType, message, progress, contentId, contentMode) {
      this.modals.push({
        id: this.idIncModals(),
        contentType: contentType,
        message: message,
        progress: progress,
        contentId: contentId,
        contentMode: contentMode
      });
      this.dispatchEvent('modalEvent', this.modals);
    }
  }, {
    key: 'showMessage',
    value: function showMessage(message, lifetime, nameButton, func) {
      return this.setNotification(message, lifetime, nameButton, func, NotificationsManager.MESSAGE);
    }
  }, {
    key: 'showError',
    value: function showError(message, lifetime, nameButton, func) {
      return this.setNotification(message, lifetime, nameButton, func, NotificationsManager.ERROR);
    }
  }, {
    key: 'showWarning',
    value: function showWarning(message, lifetime, nameButton, func) {
      return this.setNotification(message, lifetime, nameButton, func, NotificationsManager.WARNING);
    }
  }, {
    key: 'showModal',
    value: function showModal(contentType) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var progress = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var contentId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var contentMode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

      this.setModal(contentType, message, progress, contentId, contentMode);
    }
  }, {
    key: 'getNotifications',
    value: function getNotifications() {
      return this.notifications;
    }
  }, {
    key: 'getModals',
    value: function getModals() {
      return this.modals;
    }
  }, {
    key: 'deleteNotif',
    value: function deleteNotif(id) {
      for (var j = 0; j < this.notifications.length; j += 1) {
        if (this.notifications[j].id === id) {
          this.notifications.splice(j, 1);
        }
      }
      if (!this.notifications.length) {
        clearInterval(this.lifetimeIntervalId);
        this.lifetimeIntervalId = null;
      }
    }
  }, {
    key: 'deleteModal',
    value: function deleteModal(id) {
      for (var j = 0; j < this.modals.length; j += 1) {
        if (this.modals[j].id === id) {
          this.modals.splice(j, 1);
        }
      }
    }
  }, {
    key: 'lifetimeNotification',
    value: function lifetimeNotification() {
      var _this2 = this;

      this.lifetimeIntervalId = setInterval(function () {
        for (var i = 0; i < _this2.notifications.length; i += 1) {
          if (_this2.notifications[i].lifetime) {
            if (_this2.notifications[i].passed < _this2.notifications[i].lifetime) {
              _this2.notifications[i].passed += 100;
            } else {
              _this2.deleteNotif(_this2.notifications[i].id);
            }
          }
        }
      }, 100);
    }
  }, {
    key: 'idIncNotif',
    value: function idIncNotif() {
      this.Ncounter += 1;
      return this.Ncounter;
    }
  }, {
    key: 'idIncModals',
    value: function idIncModals() {
      this.Mcounter += 1;
      return this.Mcounter;
    }
  }, {
    key: 'callFunc',
    value: function callFunc(id) {
      for (var i = 0; i < this.notifications.length; i += 1) {
        if (this.notifications[i].id === id) {
          this.notifications[i].func();
        }
      }
      this.deleteNotif(id);
    }
  }]);
  return NotificationsManager;
}(_eventDispatcher2.default);

exports.default = NotificationsManager;

/***/ }),
/* 570 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(171);

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = __webpack_require__(98);

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _jquery = __webpack_require__(92);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Scroller = function () {
  function Scroller() {
    (0, _classCallCheck3.default)(this, Scroller);
  }

  (0, _createClass3.default)(Scroller, null, [{
    key: 'setProps',
    value: function setProps(object, propsArray, value) {
      propsArray.forEach(function (prop) {
        object[prop] = value;
      });
    }
  }, {
    key: 'convertToPx',
    value: function convertToPx(value) {
      var baseFontSize = parseFloat((0, _jquery2.default)('html').css('font-size'));
      return parseFloat(value) * baseFontSize;
    }
  }, {
    key: 'parseAttribute',
    value: function parseAttribute(attr, object) {
      var values = attr.trim().split(/\s+/).map(Scroller.convertToPx);

      if (values[0]) {
        Scroller.setProps(object, ['left', 'top', 'right', 'bottom'], values[0]);
      }
      if (values[1]) {
        Scroller.setProps(object, ['top', 'bottom'], values[1]);
      }
      if (values[2]) {
        Scroller.setProps(object, ['left'], values[2]);
      }
      if (values[3]) {
        Scroller.setProps(object, ['bottom'], values[3]);
      }
    }
  }, {
    key: 'getOverScroll',
    value: function getOverScroll(element) {
      var defaultOverScrollPx = Scroller.convertToPx(Scroller.DEFAULT_OVER_SCROLL);
      var result = {
        left: defaultOverScrollPx,
        top: defaultOverScrollPx,
        right: defaultOverScrollPx,
        bottom: defaultOverScrollPx
      };
      var elem = (0, _jquery2.default)(element);
      var attr = elem.attr('scroll-margin');
      if ((typeof attr === 'undefined' ? 'undefined' : (0, _typeof3.default)(attr)) !== ( true ? 'undefined' : (0, _typeof3.default)(undefined)) && attr !== false) {
        Scroller.parseAttribute(attr, result);
      }
      return result;
    }
  }, {
    key: 'getThreshold',
    value: function getThreshold(element) {
      var result = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
      var elem = (0, _jquery2.default)(element);
      var attr = elem.attr('scroll-threshold');
      if ((typeof attr === 'undefined' ? 'undefined' : (0, _typeof3.default)(attr)) !== ( true ? 'undefined' : (0, _typeof3.default)(undefined)) && attr !== false) {
        Scroller.parseAttribute(attr, result);
      }
      return result;
    }
  }, {
    key: 'scrollTo',
    value: function scrollTo(element) {
      var ANIMATION_DURATION = 300;

      var el = (0, _jquery2.default)(element);
      var container = el.parent().closest('[data-scrollable], [data-scrollable-x], [data-scrollable-y], [scrollable], [scrollable-x], [scrollable-y]');
      if (container.length) {
        var overScroll = Scroller.getOverScroll(element);
        var threshold = Scroller.getThreshold(element);
        var containerElement = container.get(0);
        var containerScrollableX = container.is('[data-scrollable], [data-scrollable-x], [scrollable], [scrollable-x]');
        var containerScrollableY = container.is('[data-scrollable], [data-scrollable-y], [scrollable], [scrollable-y]');
        var computedStyle = getComputedStyle(containerElement);
        var isOverflowXVisible = computedStyle.overflowX === 'visible';
        var isOverflowYVisible = computedStyle.overflowY === 'visible';
        var scrollLeft = 0;
        var scrollTop = 0;

        var animateProps = {};

        if (containerScrollableX) {
          var contentWidth = containerElement.scrollWidth;
          var width = containerElement.clientWidth;
          if (width < contentWidth) {
            var offset = 0;
            if (isOverflowXVisible) {
              offset = container.data('scrollLeft') || 0;
            }
            var posLeft = el.offset().left - container.offset().left;
            var left = posLeft - offset;
            var right = left + element.offsetWidth;

            var freeWidth = width - element.offsetWidth;
            if (freeWidth < overScroll.left + overScroll.right) {
              // TODO: делить в соответствии с исходными пропорциями
              overScroll.left = freeWidth / 2;
              overScroll.right = freeWidth / 2;
            }

            scrollLeft = isOverflowXVisible ? offset : containerElement.scrollLeft;
            if (right > width) {
              // scroll to left
              scrollLeft += right + overScroll.right;
              scrollLeft -= width;
            } else if (left < 0) {
              // scroll to right
              scrollLeft -= -left + overScroll.left;
            }

            var maxScrollLeft = contentWidth - width;
            if (scrollLeft < 0) {
              scrollLeft = 0;
            } else if (scrollLeft > maxScrollLeft) {
              scrollLeft = maxScrollLeft;
            }

            if (!isOverflowXVisible) {
              animateProps.scrollLeft = scrollLeft;
              scrollLeft = 0;
            }
          }
        }

        if (containerScrollableY) {
          var contentHeight = containerElement.scrollHeight;
          var height = containerElement.clientHeight;

          if (height < contentHeight) {
            var _offset = 0;
            if (isOverflowYVisible) {
              _offset = container.data('scrollTop') || 0;
            }
            var posTop = el.offset().top - container.offset().top;

            var top = posTop - _offset;
            var bottom = top + element.offsetHeight;

            var freeHeight = height - element.offsetHeight;
            if (freeHeight < overScroll.top + overScroll.bottom) {
              // TODO: делить в соответствии с исходными пропорциями
              overScroll.top = freeHeight / 2;
              overScroll.bottom = freeHeight / 2;
            }

            scrollTop = isOverflowYVisible ? _offset : containerElement.scrollTop;
            if (bottom + threshold.bottom > height) {
              // scroll to top
              scrollTop += bottom + overScroll.bottom;
              scrollTop -= height;
            } else if (top - threshold.top < 0) {
              // scroll to bottom
              scrollTop -= -top + overScroll.top;
            }
            var maxScrollTop = contentHeight - height;
            if (scrollTop < 0) {
              scrollTop = 0;
            } else if (scrollTop > maxScrollTop) {
              scrollTop = maxScrollTop;
            }

            if (!isOverflowYVisible) {
              animateProps.scrollTop = scrollTop;
              scrollTop = 0;
            }
          }
        }
        if ((0, _keys2.default)(animateProps).length > 0) {
          container.stop(true, false);
          container.animate(animateProps, ANIMATION_DURATION);
        }

        if (isOverflowXVisible || isOverflowYVisible) {
          container.data('scrollTop', scrollTop);
          container.data('scrollLeft', scrollLeft);
          scrollLeft = -scrollLeft;
          scrollTop = -scrollTop;
          container.css('transform', 'translateX(' + scrollLeft + 'px) translateY(' + scrollTop + 'px)');
        }

        this.scrollTo(containerElement);
      }
    }
  }, {
    key: 'DEFAULT_OVER_SCROLL',
    get: function get() {
      return 6;
    }
  }]);
  return Scroller;
}();

exports.default = Scroller;

/***/ }),
/* 571 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(17);

var _assign2 = _interopRequireDefault(_assign);

var _vue = __webpack_require__(93);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(925);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _Main = __webpack_require__(799);

var _Main2 = _interopRequireDefault(_Main);

var _PPlayerLive = __webpack_require__(813);

var _PPlayerLive2 = _interopRequireDefault(_PPlayerLive);

var _PPlayerVideo = __webpack_require__(815);

var _PPlayerVideo2 = _interopRequireDefault(_PPlayerVideo);

var _PPlayerTest = __webpack_require__(814);

var _PPlayerTest2 = _interopRequireDefault(_PPlayerTest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

var router = new _vueRouter2.default({
  //  mode: 'history',
  routes: [{
    path: '/',
    name: 'Start',
    component: _Main2.default
  }, {
    path: '/main/:page',
    name: 'Main',
    props: function props(route) {
      return (0, _assign2.default)({}, route.params, { query: route.query });
    },
    component: _Main2.default
  }, {
    path: '/player-video/:type/:id',
    name: 'PlayerVideo',
    props: true,
    component: _PPlayerVideo2.default,
    alias: '/mega-player'
  }, {
    path: '/player-live/:channelId',
    name: 'PlayerLive',
    props: function props(route) {
      return (0, _assign2.default)({}, route.params, { query: route.query });
    },
    component: _PPlayerLive2.default
  }, {
    path: '/player-test',
    name: 'PlayerTest',
    component: _PPlayerTest2.default
  }]
});

var stack = [];
router.afterEach(function (to, from) {
  stack.push(from);
});

var rules = [{ pattern: /^\/player-video/, level: 3 }, { pattern: /^\/player-live/, level: 3 }, { pattern: /^\/main\/actor-info/, level: 3 }, { pattern: /^\/main\/video-films/, level: 1 }, { pattern: /^\/main\/video-cartoons/, level: 1 }, { pattern: /^\/main\/video-series/, level: 1 }, { pattern: /^\/main\/video-shows/, level: 1 }, { pattern: /^\/main\/video/, level: 2 }, { pattern: /^\//, level: 0 }];

function getRouteLevel(route) {
  var rule = rules.find(function (item) {
    return item.pattern.test(route.path);
  });
  return rule ? rule.level : 0;
}

router.getLevelUpRoute = function () {
  var currentRoute = router.currentRoute;
  var currentLevel = getRouteLevel(currentRoute);
  var defaultRoute = { name: 'Start' };
  if (currentLevel > 0) {
    for (var i = stack.length - 1; i > 0; i -= 1) {
      var route = stack[i];
      var level = getRouteLevel(route);
      if (level < currentLevel) {
        return { name: route.name, params: route.params, query: route.query };
      }
    }
    return defaultRoute;
  }
  return null;
};

exports.default = router;

/***/ }),
/* 572 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = __webpack_require__(98);

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = __webpack_require__(43);

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = __webpack_require__(4);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _getPrototypeOf = __webpack_require__(12);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(14);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = __webpack_require__(76);

var _lodash2 = _interopRequireDefault(_lodash);

var _eventDispatcher = __webpack_require__(61);

var _eventDispatcher2 = _interopRequireDefault(_eventDispatcher);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var ConnectionError = function (_Error) {
  (0, _inherits3.default)(ConnectionError, _Error);

  function ConnectionError(message, status) {
    (0, _classCallCheck3.default)(this, ConnectionError);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ConnectionError.__proto__ || (0, _getPrototypeOf2.default)(ConnectionError)).call(this, message));

    _this.status = status;
    _this.name = 'ConnectionError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(_this, _this.constructor);
    }
    return _this;
  }

  return ConnectionError;
}(Error);

var RequestError = function (_Error2) {
  (0, _inherits3.default)(RequestError, _Error2);

  function RequestError(message, status) {
    (0, _classCallCheck3.default)(this, RequestError);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (RequestError.__proto__ || (0, _getPrototypeOf2.default)(RequestError)).call(this, message));

    _this2.status = status;
    _this2.name = 'RequestError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(_this2, _this2.constructor);
    }
    return _this2;
  }

  return RequestError;
}(Error);

var Api = function (_EventDispatcher) {
  (0, _inherits3.default)(Api, _EventDispatcher);

  function Api() {
    (0, _classCallCheck3.default)(this, Api);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (Api.__proto__ || (0, _getPrototypeOf2.default)(Api)).call(this));

    _this3.baseUrl = 'https://api.persik.tv/';
    _this3.timeout = 20000;
    _this3.repeatCounter = 5;
    _this3.globalParams = {};
    return _this3;
  }

  (0, _createClass3.default)(Api, [{
    key: 'setBaseUrl',
    value: function setBaseUrl(url) {
      this.baseUrl = url;
    }
  }, {
    key: 'setGlobalParam',
    value: function setGlobalParam(key, value) {
      this.globalParams[key] = value;
    }
  }, {
    key: 'removeGlobalParam',
    value: function removeGlobalParam(key) {
      delete this.globalParams[key];
    }
  }, {
    key: 'resetGlobalParams',
    value: function resetGlobalParams() {
      this.globalParams = {};
    }
  }, {
    key: 'exec',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(method, version, module, action, params) {
        var repeat = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
        var repeatCounter, result, error, timeInterval;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                repeatCounter = repeat ? this.repeatCounter : 1;
                result = void 0;
                error = void 0;
                timeInterval = 5000;

              case 4:
                if (!(repeatCounter > 0)) {
                  _context.next = 26;
                  break;
                }

                repeatCounter -= 1;
                timeInterval *= 2;
                _context.prev = 7;
                _context.next = 10;
                return this.execOnce(method, version, module, action, params);

              case 10:
                result = _context.sent;
                return _context.abrupt('return', result);

              case 14:
                _context.prev = 14;
                _context.t0 = _context['catch'](7);

                if (!(_context.t0.name === 'ConnectionError')) {
                  _context.next = 23;
                  break;
                }

                if (!(repeatCounter > 0)) {
                  _context.next = 20;
                  break;
                }

                _context.next = 20;
                return Api.timeDelay(timeInterval);

              case 20:
                error = _context.t0;
                _context.next = 24;
                break;

              case 23:
                throw _context.t0;

              case 24:
                _context.next = 4;
                break;

              case 26:
                throw error;

              case 27:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[7, 14]]);
      }));

      function exec(_x2, _x3, _x4, _x5, _x6) {
        return _ref.apply(this, arguments);
      }

      return exec;
    }()
  }, {
    key: 'execOnce',
    value: function execOnce(method, version, module, action, params) {
      var _this4 = this;

      return new _promise2.default(function (resolve, reject) {
        var fullUrl = _this4.baseUrl.concat('v', version, '/', module, '/', action);
        var myParams = _lodash2.default.merge({}, _this4.globalParams, params);
        var body = _this4.constructor.serialize(myParams);

        var xhr = new XMLHttpRequest();

        xhr.timeout = _this4.timeout;

        if (method === 'POST') {
          xhr.open(method, fullUrl, true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.send(body);
        } else if (method === 'GET' || method === 'DELETE') {
          xhr.open(method, fullUrl.concat('?', body), true);
          xhr.send();
        }

        xhr.ontimeout = function () {
          reject(new ConnectionError('Запрос на сервер не был выполнен по истечении заданного времени'));
        };
        xhr.onabort = function () {
          reject(new ConnectionError('Запрос на сервер был сброшен'));
        };
        xhr.onerror = function () {
          reject(new ConnectionError('Ошибка соединения с сервером'));
        };

        xhr.onreadystatechange = function () {
          if (xhr.readyState !== 4) return;
          if (xhr.status === 200) {
            resolve(Api.jsonParseSafe(xhr.responseText));
          } else if (xhr.status >= 400 && xhr.status < 500) {
            var data = Api.jsonParseSafe(xhr.responseText);
            reject(new RequestError(data && data.error ? data.error : 'Неизвестная ошибка API', xhr.status));
          } else if (xhr.status >= 500 && xhr.status < 527) {
            var _data = Api.jsonParseSafe(xhr.responseText);
            reject(new ConnectionError(_data && _data.error ? _data.error : 'Неизвестная ошибка API', xhr.status));
          }
        };
      });
    }
  }, {
    key: 'addModule',
    value: function addModule(moduleName, methods) {
      var _this5 = this;

      this[moduleName] = {};
      _lodash2.default.forOwn(methods, function (method, methodName) {
        _this5[moduleName][methodName] = method.bind(_this5);
      });
    }
  }, {
    key: 'addModules',
    value: function addModules(modulesObject) {
      var _this6 = this;

      _lodash2.default.forOwn(modulesObject, function (methods, moduleName) {
        _this6.addModule(moduleName, methods);
      });
    }
  }], [{
    key: 'jsonParseSafe',
    value: function jsonParseSafe(text) {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.warn(e);
        return null;
      }
    }
  }, {
    key: 'timeDelay',
    value: function timeDelay(timeInterval) {
      return new _promise2.default(function (resolve) {
        setTimeout(function () {
          resolve();
        }, timeInterval);
      });
    }
  }, {
    key: 'serialize',
    value: function serialize(obj, prefix) {
      var _this7 = this;

      var str = [];
      _lodash2.default.forIn(obj, function (value, key) {
        if (_lodash2.default.hasIn(obj, key)) {
          var k = prefix ? prefix + '[' + key + ']' : key;
          var v = obj[key];
          if (_lodash2.default.isArray(v)) {
            for (var i = 0; i < v.length; i += 1) {
              var keyArray = k + '[]';
              str.push(encodeURIComponent(keyArray) + '=' + encodeURIComponent(v[i]));
            }
          } else if ((typeof v === 'undefined' ? 'undefined' : (0, _typeof3.default)(v)) === 'object') {
            str.push(_this7.serialize(v, k));
          } else {
            str.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
          }
        }
      });
      return str.join("&");
    }
  }]);
  return Api;
}(_eventDispatcher2.default);

exports.default = Api;

/***/ }),
/* 573 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  main_menu: {
    search: 'Search',
    main: 'Main page',
    tv_review: 'TV: Review',
    tv_live: 'TV: Live',
    tv_guide: 'TV: Guide',
    films: 'Films',
    cartoons: 'Cartoons',
    series: 'Series',
    shows: 'TV Shows',
    favorite: 'Favorites',
    settings: 'Settings',
    account: 'My account',
    login: 'Login'
  },
  auth: {
    after_exit: 'You are exit!',
    authorization: 'Sign in',
    registration: 'registration',
    after_auth: 'You are logged!',
    after_register: 'Thank you for registration!',
    passwords_dont_match: 'Passwords don\'t match!',
    user_exists: 'User already exists!',
    step: 'Step',
    enter_email: 'Your e-mail',
    enter_field: 'Fill in the field',
    enter_all_fiedls: 'All fields are required!',
    invalid_email: 'Invalid email!',
    invalid_password: 'Password must contain at least 6 characters',
    login: 'Email',
    enter_password: 'Enter your password',
    create_password: 'Create password',
    confirm_password: 'Confirm password ',
    change_login: 'Change email',
    enter: 'Enter',
    register: 'Register',
    ok: 'Ok',
    exit: 'Exit',
    need_auth: 'Need authorization!',
    auth: 'Log in',
    welcome: 'Welcome',
    next_step: 'Next',
    prev_step: 'Back'
  },
  search: {
    search: 'Search',
    not_found: 'Not Found!',
    empty_field: 'Empty field!',
    found_channels: 'Found channels',
    found_tvshows: 'Found TV Shows',
    found_videos: 'Found Videos'
  },
  home: {
    live: 'Live',
    films: 'Films',
    a_series: 'AMedia TV',
    shows: 'TV shows'
  },
  account: {
    subscriptions: 'Subscriptions',
    promotions: 'Promotions',
    purchases: 'Purchases',
    quit: 'Quit',
    date: 'Date',
    service: 'Service',
    amount: 'Amount',
    package: 'Package of',
    buy: 'buy',
    select_package: 'Select the package',
    select_option: 'select the option',
    select_pay_sys: 'select the paysystem',
    days_left: 'Days left',
    payMts: 'Payment from MTS account',
    pay_info: 'For acquaintance with tariffs and payment methods, please go to the website',
    payErip: 'Pay through ERIP',
    payLife: 'Pay with Life :)',
    afterLogout: 'You are logout!',
    youEntered: 'You entered!',
    profile: 'Profile',
    you_login: 'You login as',
    logout: 'Logout',
    pay_sys: {
      ipay_mts: 'MTC',
      ipay_life: 'Life :)',
      ipay_erip: 'ЕРИП',
      assist: 'Credit card',
      yandex: 'Yandex.Cashbox'
    }
  },
  title: {
    attention: 'Attention!'
  },
  test: 'test (en)',
  device: {
    param: 'Parameter',
    value: 'Value',
    vendor: 'Vendor',
    model: 'Model',
    target: 'Target',
    resolution: 'Display',
    uuid: 'UUID',
    build: 'Build'
  },
  monthShort: {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
  },
  days: {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    0: 'Sunday'
  },
  context: {
    add_favorite: 'Add to favorites',
    remove_favorite: 'Remove from favorites',
    show_info: 'Show info',
    watch: 'Watch',
    close: 'Close',
    Back: 'back'
  },
  parentCtrl: {
    adultContent: 'Канал содержит контент 18+. Для разблокировки введите PIN код.',
    action: 'Please, enter your PIN',
    enter_old_pin: 'Введите старый PIN код.',
    enter_new_pin: 'Введите новый PIN код.',
    enter_pass: 'Enter your account password'
  },
  connection: {
    online: 'Online',
    offline: 'Offline'
  },
  favorite: {
    no_favorites: 'Nothing to show in the "Favorite" section ',
    channels: 'Favorite channels',
    shows: 'Favorite TV shows',
    videos: 'Favorite videos'
  },
  settings: {
    diagnostic: 'Diagnostics',
    parent_control: 'Parent Control',
    video: 'Video',
    language: 'Language',
    use_hls: 'Use a programm HLS-player',
    parent_ctrl: 'parent control',
    on: 'Turn on',
    off: 'Turn off',
    change_pin: 'Change PIN',
    speed_test: 'Speed test'
  },
  messages: {
    adult_locked_named: 'The channel is blocked by parent control',
    unavailable_channel_named: 'To view the channel you need to buy the appropriate subscription',
    adult_locked: 'Канал заблокирован родительским контролем',
    unavailable_channel: 'You must buy the appropriate subscription to view the channel',
    invalid_pin: 'Wrong PIN',
    invalid_password: 'Wrong password',
    no_tvguide: 'No TV guide',
    data_reset: 'All data were reset',
    reloading: 'Reloading',
    check_time_settings: 'Please, check your time settings',
    reloading_error: 'Load EPG error. <br> Please try to reload application',
    server_ask_error: 'The server response error',
    server_dontask: "The server doesn't response"
  },
  video: {
    cast: 'Cast',
    director: 'Director',
    directors: 'Directors',
    description: 'Description',
    country: 'Country',
    year: 'Year',
    kinopoisk: 'Kinopoisk',
    age_limit: 'Age limit',
    channel: 'Channel',
    ether: 'Ether',
    duration: 'Duration',
    team: 'Team',
    watch: 'Watch',
    add_favorite: 'Add to favorites',
    remove_favorite: 'Remove from favorites'
  },
  buttons: {
    ok: 'Ok',
    cancel: 'Cancel',
    forgot: 'I forgot',
    dont_ask: "Don't ask",
    purchase: 'To subscribe',
    sync: 'Synchronization',
    reset: 'Full resret',
    reload: 'Reload application',
    to_main: 'Go to the home page',
    all_genres: 'All genres',
    all_channels: 'All channels',
    load_more: 'Load more',
    login: 'Login',
    subscr: 'Subscribe'
  },
  exit: {
    title: 'Do you want to close application?',
    yes: 'Yes',
    no: 'No'
  },
  tutorial: {
    navigation: 'Navigation',
    but_back: 'Button BACK/RETURN',
    context: 'Context menu',
    you: 'You ',
    start: {
      title_rus: 'Пожалуйста, выберите язык',
      title_en: 'Please, select a language'
    },
    finish: {
      learn: 'The training is over. If this training appears again, you can close it immediately with Back button.',
      title: 'Our application is still at the testing and improvement stage. There may be some errors in it - do not hesitate to inform us about them to the mail',
      like: 'If you like it, then you can put an appraisal and review in the app store - we will be very grateful.'
    },
    mark: {
      good: 'Good',
      excellent: 'Excellent',
      lets: "Let's start",
      again: 'I want to start again'
    },
    step1: {
      title1: 'Welcome to the Persik TV application.',
      title2: "First of all let's understand the navigation of the application.",
      title3: 'Point to the item number 6 and click OK.'
    },
    step2: {
      title1: "Now let's figure out how to go back to the previous screens of the application.",
      title2: 'The BACK / RETURN button is used for this. You can go to the previous screen With it or open the main menu.',
      title3: 'Now find the BACK button on the remote control and press it.'
    },
    step3: {
      title1: 'And the last task. we will learn how to open context menus for additional actions with content (for example, such as adding or deleting to the favorites)',
      title2: '1. Press and hold OK button on the remote control for 2 seconds.',
      title3: '2. And then select "Add to Favorites"'
    },
    example: 'Content example',
    you_are: ['are adorable', 'are incomparable', 'are unique', 'are incredible', 'are phenomenal', 'are charming'],
    ok: ['Excellent', 'Gloriously', 'Good', 'Wow!'],
    good: ['Terrific', 'Great', 'Brilliantly', 'Awesome', 'Fabulously', 'Elegantly', 'Wonderful', 'Luxuriously', 'Brilliantly', 'Perfectly', 'Marvelously'],
    best: ['Great', 'Excellent', 'Stunning ', 'Ideal', 'Amazing', 'Greatly', 'Unmatched', 'Incomparable', 'Unrepeatable', 'Delightful', 'Elegant', 'Fantastically', 'Incredibly', 'Phenomenally'],
    wrong: "Not quite that, but you're already on the target"
  }
};

/***/ }),
/* 574 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  main_menu: {
    search: 'Поиск',
    main: 'Главная',
    tv_review: 'ТВ: Обзор',
    tv_live: 'ТВ: Сейчас в эфире',
    tv_guide: 'ТВ: Программа передач',
    films: 'Фильмы',
    cartoons: 'Мультфильмы',
    series: 'Сериалы',
    shows: 'Передачи',
    favorite: 'Избранное',
    settings: 'Настройки',
    account: 'Личный кабинет',
    login: 'Вход'
  },
  auth: {
    after_exit: 'Вы вышли',
    authorization: 'Авторизация',
    registration: 'регистрация',
    after_auth: 'Вы вошли',
    after_register: 'Спасибо за регистрацию',
    passwords_dont_match: 'Пароли не совпадают',
    step: 'Шаг',
    enter_email: 'Введите Ваш e-mail',
    enter_field: 'Заполните поле',
    invalid_email: 'Проверьте правильность ввода e-mail',
    invalid_password: 'Пароль должен содержать не менее 6 символов',
    login: 'Email',
    enter_password: 'Введите Ваш пароль',
    create_password: 'Придумайте пароль',
    confirm_password: 'Повторите пароль',
    change_login: 'Другой email',
    enter: 'Войти',
    register: 'Зарегистрироваться',
    ok: 'Ок',
    exit: 'Выйти',
    need_auth: 'Необходимо авторизоваться',
    auth: 'Авторизоваться',
    welcome: 'Добро пожаловать',
    next_step: 'Далее',
    prev_step: 'Назад'
  },
  search: {
    search: 'Искать',
    not_found: 'По вашему запросу ничего не найдено. Попробуйте изменить запрос.',
    empty_field: 'Поле для поиска пустое. Введите любое слово.',
    more_letters: 'В поле для поиска должно быть более двух символов.',
    found_channels: 'Найденные каналы',
    found_tvshows: 'Найденные передачи',
    found_videos: 'Найденное видео'
  },
  home: {
    live: 'Сейчас в эфире',
    films: 'Фильмы',
    a_series: 'Сериалы Амедиатека',
    shows: 'Передачи'
  },
  account: {
    subscriptions: 'Подписки',
    purchases: 'Покупки',
    profile: 'Аккаунт',
    quit: 'Выход',
    date: 'Дата',
    service: 'Услуга',
    package: 'Пакет',
    amount: 'Сумма',
    buy: 'купить',
    select_package: 'выберите пакет',
    select_option: 'выберите опцию',
    select_pay_sys: 'выберите способ оплаты',
    days_left: 'Осталось',
    payMts: 'Оплата со счета МТС',
    payErip: 'Оплатить через ЕРИП',
    payLife: 'Оплатить со счета Life:)',
    logout: 'Выйти из аккаунта',
    afterLogout: 'Вы вышли из аккаунта',
    you_login: 'Вы вошли как',
    pay_info: 'Для ознакомления с тарифами и способами оплаты, пожалуйста, перейдите на сайт',
    pay_sys: {
      ipay_mts: 'MTC',
      ipay_life: 'Life :)',
      ipay_erip: 'ЕРИП',
      assist: 'Банковская карта',
      yandex: 'Яндекс.Касса'
    }
  },
  title: {
    attention: 'Внимание!',
    not_available: 'Выбранный Вами канал не доступен на Вашем тарифном плане.'
  },
  test: 'тест (ru)',
  device: {
    param: 'Параметр',
    value: 'Значение',
    vendor: 'Производитель',
    model: 'Модель',
    target: 'Движок',
    resolution: 'Разрешение',
    uuid: 'UUID',
    build: 'Сборка'
  },
  monthShort: {
    1: 'янв',
    2: 'фев',
    3: 'мар',
    4: 'апр',
    5: 'май',
    6: 'июн',
    7: 'июл',
    8: 'авг',
    9: 'сен',
    10: 'окт',
    11: 'ноя',
    12: 'дек'
  },
  days: {
    1: 'Понедельник',
    2: 'Вторник',
    3: 'Среда',
    4: 'Четверг',
    5: 'Пятница',
    6: 'Суббота',
    0: 'Воскресенье'
  },
  context: {
    add_favorite: 'Добавить в избранное',
    remove_favorite: 'Удалить из избранного',
    show_info: 'Показать информацию',
    watch: 'Перейти к просмотру',
    close: 'Закрыть',
    back: 'назад'
  },
  parentCtrl: {
    adultContent: 'Канал содержит контент 18+. Для разблокировки введите PIN код.',
    action: 'Для выполнения действия введите PIN код.',
    enter_old_pin: 'Введите старый PIN код.',
    enter_new_pin: 'Введите новый PIN код.',
    enter_pass: 'Введите пароль от личного кабинета.'
  },
  connection: {
    online: 'Подключено',
    offline: 'Нет подключения'
  },
  favorite: {
    no_favorites: 'В разделе "Избранное" ничего нет',
    channels: 'Избранные каналы',
    shows: 'Избранные передачи',
    videos: 'Избранное видео'
  },
  settings: {
    video: 'Видео',
    diagnostic: 'Диагностика',
    parent_control: 'Родительский контроль',
    language: 'Язык',
    use_hls: 'Использовать программный HLS-проигрыватель',
    parent_ctrl: 'родительский контроль',
    on: 'Включить',
    off: 'Выключить',
    change_pin: 'Сменить пинкод',
    speed_test: 'Тест скорости'
  },
  messages: {
    adult_locked_named: 'Канал "{name}" заблокирован родительским контролем',
    unavailable_channel_named: 'Для просмотра канала "{name}" необходимо приобрести соотвествующую подписку',
    adult_locked: 'Канал заблокирован родительским контролем',
    unavailable_channel: 'Для просмотра канала необходимо приобрести соотвествующую подписку',
    invalid_pin: 'Неверный PIN',
    invalid_password: 'Неверный пароль',
    no_tvguide: 'Нет программы передач',
    data_reset: 'Все данные сброшены',
    reloading: 'Перезагрузка',
    check_time_settings: 'Пожалуйста, проверьте настройки времени',
    reloading_error: 'Ошибка при загрузке EPG. <br> Попробуйте перезагрузить приложение',
    server_ask_error: 'Ошибка ответа сервера',
    server_dontask: 'Сервер не отвечает'
  },
  video: {
    cast: 'В ролях',
    director: 'Режиссер',
    directors: 'Режиссеры',
    description: 'Описание',
    country: 'Страна',
    year: 'Год',
    kinopoisk: 'Кинопоиск',
    age_limit: 'Возрастное ограничени',
    channel: 'Канал',
    ether: 'Эфир',
    duration: 'Продолжительность',
    team: 'Команда',
    watch: 'Смотреть',
    add_favorite: 'Добавить в избранное',
    remove_favorite: 'Удалить из избранного'
  },
  buttons: {
    ok: 'Ok',
    cancel: 'Отмена',
    forgot: 'Забыл',
    dont_ask: 'Не спрашивать',
    purchase: 'Приобрести подписку',
    sync: 'Синхронизация',
    reset: 'Полный сброс',
    reload: 'Перезагрузить',
    to_main: 'На главную',
    all_genres: 'Все жанры',
    all_channels: 'Все каналы',
    load_more: 'Загрузить еще',
    login: 'Войти в аккаунт',
    subscr: 'Приобрести подписку'
  },
  exit: {
    title: 'Хотите выйти из приложения?',
    yes: 'Да',
    no: 'Нет'
  },
  tutorial: {
    navigation: 'Навигация',
    but_back: 'Кнопка BACK/RETURN',
    context: 'Контекстное меню',
    you: 'Вы ',
    start: {
      title_rus: 'Пожалуйста, выберите язык',
      title_en: 'Please, select a language'
    },
    finish: {
      learn: 'Вот мы и закончили обучение. Если данное обучение появится снова, то Вы можете сразу его закрыть кнопкой Back.',
      title: 'Наше приложение пока находится еще на стадии тестирования и улучшения. В нем могут встречаться те или иные ошибки - не стесняйтесь нам о них сообщать на почту',
      like: 'Если оно Вам понравится, то вы можете поставить ему оценку и отзыв в магазине приложений - мы будем очень признательны.'
    },
    mark: {
      good: 'Хорошо',
      excellent: 'Отлично',
      lets: 'Давайте уже начнем',
      again: 'Хочу пройти все с начала'
    },
    step1: {
      title1: 'Добро пожаловать в телевизионное приложение Persik.',
      title2: 'Давайте для начала разберемся с навигацией по приложению.',
      title3: 'Наведите курсор на элемент под номером 6 и нажмите OK'
    },
    step2: {
      title1: 'Давайте теперь разберемся, как возвращаться назад на предыдующие экраны приложения.',
      title2: 'Для этого предназначена кнопка BACK/RETURN. С помощью нее Вы сможете переходить к предыдущему экрану или открывать главное меню.',
      title3: 'Теперь найдите, пожалуйста, на пульте ДУ кнопку BACK и нажимите ее.'
    },
    step3: {
      title1: 'И последнее задание. В нем мы научимся открывать контекстные меню для дополнительных действий с контентом (например, таких как добавление или удаление в избранное)',
      title2: '1. Нажмите и удерживайте в течении 2 секунд кнопку ОК на пульте ДУ.',
      title3: '2. А затем выберите пункт "Добавить в избранное"'
    },
    example: 'Пример контента',
    you_are: ['восхитительны', 'несравненны', 'неповторимы', 'невероятны', 'очаровательны', 'феноменальны', 'обворожительны'],
    ok: ['Отлично', 'Славно', 'Хорошо', 'Здорово'],
    good: ['Потрясающе', 'Замечательно', 'Блистательно', 'Потрясно', 'Сказочно', 'Шикарно', 'Чудесно', 'Роскошно', 'Блестяще', 'Отменно', 'Дивно'],
    best: ['Великолепно', 'Превосходно', 'Ошеломляюще', 'Идеально', 'Изумительно', 'Грандиозно', 'Бесподобно', 'Несравненно', 'Неповторимо', 'Восхитительно', 'Элеганто', 'Фантастически', 'Невероятно', 'Феноменально'],
    wrong: 'Не совсем то, но вы уже у цели'
  }
};

/***/ }),
/* 575 */,
/* 576 */,
/* 577 */,
/* 578 */,
/* 579 */,
/* 580 */,
/* 581 */,
/* 582 */,
/* 583 */,
/* 584 */,
/* 585 */,
/* 586 */,
/* 587 */,
/* 588 */,
/* 589 */,
/* 590 */,
/* 591 */,
/* 592 */,
/* 593 */,
/* 594 */,
/* 595 */,
/* 596 */,
/* 597 */,
/* 598 */,
/* 599 */,
/* 600 */,
/* 601 */,
/* 602 */,
/* 603 */,
/* 604 */,
/* 605 */,
/* 606 */,
/* 607 */,
/* 608 */,
/* 609 */,
/* 610 */,
/* 611 */,
/* 612 */,
/* 613 */,
/* 614 */,
/* 615 */,
/* 616 */,
/* 617 */,
/* 618 */,
/* 619 */,
/* 620 */,
/* 621 */,
/* 622 */,
/* 623 */,
/* 624 */,
/* 625 */,
/* 626 */,
/* 627 */,
/* 628 */,
/* 629 */,
/* 630 */,
/* 631 */,
/* 632 */,
/* 633 */,
/* 634 */,
/* 635 */,
/* 636 */,
/* 637 */,
/* 638 */,
/* 639 */,
/* 640 */,
/* 641 */,
/* 642 */,
/* 643 */,
/* 644 */,
/* 645 */,
/* 646 */,
/* 647 */,
/* 648 */,
/* 649 */,
/* 650 */,
/* 651 */,
/* 652 */,
/* 653 */,
/* 654 */,
/* 655 */,
/* 656 */,
/* 657 */,
/* 658 */,
/* 659 */,
/* 660 */,
/* 661 */,
/* 662 */,
/* 663 */,
/* 664 */,
/* 665 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 666 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 667 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 668 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 669 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 670 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 671 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 672 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 673 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 674 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 675 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 676 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 677 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 678 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 679 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 680 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 681 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 682 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 683 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 684 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 685 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 686 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 687 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 688 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 689 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 690 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 691 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 692 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 693 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 694 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 695 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 696 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 697 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 698 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 699 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 700 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 701 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 702 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 703 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 704 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 705 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 706 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 707 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 708 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 709 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 710 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 711 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 712 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 713 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 714 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 715 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 716 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 717 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 718 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 719 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 720 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 721 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 722 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 723 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 724 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 725 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 726 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 727 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 728 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 729 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 730 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 731 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 732 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 733 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 734 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 735 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 736 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 737 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 738 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 739 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 740 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 741 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 742 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 743 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 744 */,
/* 745 */,
/* 746 */,
/* 747 */,
/* 748 */,
/* 749 */,
/* 750 */,
/* 751 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 310,
	"./af.js": 310,
	"./ar": 317,
	"./ar-dz": 311,
	"./ar-dz.js": 311,
	"./ar-kw": 312,
	"./ar-kw.js": 312,
	"./ar-ly": 313,
	"./ar-ly.js": 313,
	"./ar-ma": 314,
	"./ar-ma.js": 314,
	"./ar-sa": 315,
	"./ar-sa.js": 315,
	"./ar-tn": 316,
	"./ar-tn.js": 316,
	"./ar.js": 317,
	"./az": 318,
	"./az.js": 318,
	"./be": 319,
	"./be.js": 319,
	"./bg": 320,
	"./bg.js": 320,
	"./bm": 321,
	"./bm.js": 321,
	"./bn": 322,
	"./bn.js": 322,
	"./bo": 323,
	"./bo.js": 323,
	"./br": 324,
	"./br.js": 324,
	"./bs": 325,
	"./bs.js": 325,
	"./ca": 326,
	"./ca.js": 326,
	"./cs": 327,
	"./cs.js": 327,
	"./cv": 328,
	"./cv.js": 328,
	"./cy": 329,
	"./cy.js": 329,
	"./da": 330,
	"./da.js": 330,
	"./de": 333,
	"./de-at": 331,
	"./de-at.js": 331,
	"./de-ch": 332,
	"./de-ch.js": 332,
	"./de.js": 333,
	"./dv": 334,
	"./dv.js": 334,
	"./el": 335,
	"./el.js": 335,
	"./en-au": 336,
	"./en-au.js": 336,
	"./en-ca": 337,
	"./en-ca.js": 337,
	"./en-gb": 338,
	"./en-gb.js": 338,
	"./en-ie": 339,
	"./en-ie.js": 339,
	"./en-il": 340,
	"./en-il.js": 340,
	"./en-nz": 341,
	"./en-nz.js": 341,
	"./eo": 342,
	"./eo.js": 342,
	"./es": 345,
	"./es-do": 343,
	"./es-do.js": 343,
	"./es-us": 344,
	"./es-us.js": 344,
	"./es.js": 345,
	"./et": 346,
	"./et.js": 346,
	"./eu": 347,
	"./eu.js": 347,
	"./fa": 348,
	"./fa.js": 348,
	"./fi": 349,
	"./fi.js": 349,
	"./fo": 350,
	"./fo.js": 350,
	"./fr": 353,
	"./fr-ca": 351,
	"./fr-ca.js": 351,
	"./fr-ch": 352,
	"./fr-ch.js": 352,
	"./fr.js": 353,
	"./fy": 354,
	"./fy.js": 354,
	"./gd": 355,
	"./gd.js": 355,
	"./gl": 356,
	"./gl.js": 356,
	"./gom-latn": 357,
	"./gom-latn.js": 357,
	"./gu": 358,
	"./gu.js": 358,
	"./he": 359,
	"./he.js": 359,
	"./hi": 360,
	"./hi.js": 360,
	"./hr": 361,
	"./hr.js": 361,
	"./hu": 362,
	"./hu.js": 362,
	"./hy-am": 363,
	"./hy-am.js": 363,
	"./id": 364,
	"./id.js": 364,
	"./is": 365,
	"./is.js": 365,
	"./it": 366,
	"./it.js": 366,
	"./ja": 367,
	"./ja.js": 367,
	"./jv": 368,
	"./jv.js": 368,
	"./ka": 369,
	"./ka.js": 369,
	"./kk": 370,
	"./kk.js": 370,
	"./km": 371,
	"./km.js": 371,
	"./kn": 372,
	"./kn.js": 372,
	"./ko": 373,
	"./ko.js": 373,
	"./ky": 374,
	"./ky.js": 374,
	"./lb": 375,
	"./lb.js": 375,
	"./lo": 376,
	"./lo.js": 376,
	"./lt": 377,
	"./lt.js": 377,
	"./lv": 378,
	"./lv.js": 378,
	"./me": 379,
	"./me.js": 379,
	"./mi": 380,
	"./mi.js": 380,
	"./mk": 381,
	"./mk.js": 381,
	"./ml": 382,
	"./ml.js": 382,
	"./mn": 383,
	"./mn.js": 383,
	"./mr": 384,
	"./mr.js": 384,
	"./ms": 386,
	"./ms-my": 385,
	"./ms-my.js": 385,
	"./ms.js": 386,
	"./mt": 387,
	"./mt.js": 387,
	"./my": 388,
	"./my.js": 388,
	"./nb": 389,
	"./nb.js": 389,
	"./ne": 390,
	"./ne.js": 390,
	"./nl": 392,
	"./nl-be": 391,
	"./nl-be.js": 391,
	"./nl.js": 392,
	"./nn": 393,
	"./nn.js": 393,
	"./pa-in": 394,
	"./pa-in.js": 394,
	"./pl": 395,
	"./pl.js": 395,
	"./pt": 397,
	"./pt-br": 396,
	"./pt-br.js": 396,
	"./pt.js": 397,
	"./ro": 398,
	"./ro.js": 398,
	"./ru": 399,
	"./ru.js": 399,
	"./sd": 400,
	"./sd.js": 400,
	"./se": 401,
	"./se.js": 401,
	"./si": 402,
	"./si.js": 402,
	"./sk": 403,
	"./sk.js": 403,
	"./sl": 404,
	"./sl.js": 404,
	"./sq": 405,
	"./sq.js": 405,
	"./sr": 407,
	"./sr-cyrl": 406,
	"./sr-cyrl.js": 406,
	"./sr.js": 407,
	"./ss": 408,
	"./ss.js": 408,
	"./sv": 409,
	"./sv.js": 409,
	"./sw": 410,
	"./sw.js": 410,
	"./ta": 411,
	"./ta.js": 411,
	"./te": 412,
	"./te.js": 412,
	"./tet": 413,
	"./tet.js": 413,
	"./tg": 414,
	"./tg.js": 414,
	"./th": 415,
	"./th.js": 415,
	"./tl-ph": 416,
	"./tl-ph.js": 416,
	"./tlh": 417,
	"./tlh.js": 417,
	"./tr": 418,
	"./tr.js": 418,
	"./tzl": 419,
	"./tzl.js": 419,
	"./tzm": 421,
	"./tzm-latn": 420,
	"./tzm-latn.js": 420,
	"./tzm.js": 421,
	"./ug-cn": 422,
	"./ug-cn.js": 422,
	"./uk": 423,
	"./uk.js": 423,
	"./ur": 424,
	"./ur.js": 424,
	"./uz": 426,
	"./uz-latn": 425,
	"./uz-latn.js": 425,
	"./uz.js": 426,
	"./vi": 427,
	"./vi.js": 427,
	"./x-pseudo": 428,
	"./x-pseudo.js": 428,
	"./yo": 429,
	"./yo.js": 429,
	"./zh-cn": 430,
	"./zh-cn.js": 430,
	"./zh-hk": 431,
	"./zh-hk.js": 431,
	"./zh-tw": 432,
	"./zh-tw.js": 432
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 751;

/***/ }),
/* 752 */,
/* 753 */,
/* 754 */,
/* 755 */,
/* 756 */,
/* 757 */,
/* 758 */,
/* 759 */,
/* 760 */,
/* 761 */,
/* 762 */,
/* 763 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/Spinner.1b99816.gif";

/***/ }),
/* 764 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAMAAADImI+JAAAAjVBMVEUAJH0OMIQPMYUQMoVYcKpieK9iea99j71+kL1/kb6Akr6erM6frM6frc6grc+suNTAyd/PFCvaTF7bTV/bTl/bUGHbUWLcVGTcVWXgZXTmucPnipbni5bnjJfnusToj5nowMnpwMnw1tzzwsjzw8nzxsv0x8z14eb32Nz32d357vH57/H79fb8+Pn///8pdguvAAAA4ElEQVR42sXTyRKCMBBF0WZQAUENDogTggMo+v7/8yRpSRm0LHfe9VkknQ7FB+AaWtTmQjTBpTZrsJqJxZmWQtHI/gxtTzGAglxTEzLbMauHRI6iR3kA24DM5ifJHCKSdJ+IKVMNX1jEzKSjHsOe32Uu1x8XWbqugDvDcpNuL8Bt0n8CQjeGb5H4sT/Cny+jxzO5AZdtuikZ3oFqnWbFWI9H5UQ1cJqL2c5vBz66AsepSPYBD9xk3usThh3qDDXrLAXTWCxzSSU7L5i9r1nU0IOixGzFzIAmJcUG375CqOgDi8Q+w2/CRkgAAAAASUVORK5CYII="

/***/ }),
/* 765 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsSAAALEgHS3X78AAATiklEQVR4nOU7a1SV15X7fI97wXsR8AbHQmrUJDCICIogCUnDozBh6tI8RtcaSzDLVk1D1qSJTDBRI+IyNpbGxmlj7GKJq7YNMbQRS40oUilaM6ZqVcTABESJYgAJV8D7+B57fnD2zcn1IiZinMe31ll8nO+c/Tp777P3PucyRIT/z490J5Gbpsl0XZfvJA3sTmmAYRiyLMsmANxRFbwjGsCZN86fPz/+rbfeWuB2u2UAgDuiDYj4jTbDMCREhC1btjwRHBx8JTQ09NKVK1eCERFM02TfND3fNPMyIsKKFStehCHVx3vuuedjt9stuVwuddeuXZnXrl2z/p8TgGEYzO12WxAR9u/fnwIAhsVi0QAA4+PjjzY3N98VHx9/2Gaz9XR3d49FRNB1XfpfLQDDMCRN0xTTNCVx9b/3ve/tAABUVdUDAJiYmPjn2bNn/wkAcNKkSY3Xrl1jiAimaYJpmpKmaQqZze1ocnFx8aj6FMMwZACQJEkyJUkyAQDb29snHDhw4KGysrJ/rayszNd1PRgRJQBgvb293+rs7LzPNE3ZNE2lv79f/vzzz+02m60/LCxsQJZlkzGG/LskSdLo7hqjJUld1yVaZUSE5ubmu9esWfPjxMTEg6qqDsCQzZuMMdr6EACQMYb+fQCAiqIMJCUl/Xnt2rXPNzc33y1oljya5nHLACiYQUSGiFBXVzczJyfnd6qqXiOmAQBlWTYURdHo/0CNMWYqiqLJsmyIc1VVHczJyfldXV3dTBHnaOwat2znnHk4efLk5Ozs7Hf5KvuYkSRJD7TCIzXGmCnLsq4oisYYMxljCABmdnb2uydPnpzMtU6+Vf9wKyovIyLzer3w0ksvvSjL8iCttCzL2tdhegRh+DRDVdXBFStWvOj1egERSQO/OQFomiYjIrS1tY2fNWvWPs64LsuyPlpMD9dEPLNmzdrX1tY2XqTptgtA0zQFEaG+vj5h3Lhx7dxhjeqK34xGcH+C48aNa6+vr08QabttAiAEO3fufMhqtfbxFdG+KcYDaIMGAGi1Wvt27tz50NcRwle1eaitrZ2tKMpVxhhKknTbVX6kxp0sKopytba2drZI66gJgDzt8ePHp9jt9kuE+E4zLwoBANBut186fvz4FJHmWxYA7bV9fX3W2NjYI3da7Ucyh9jY2CN9fX1WkfZbEgCp0+LFi38GMOTw/JEzxgxFUTRFUXQeAqMkSRTUfC0HSVsfjyVEmBQbGP5ziLbFixf/7GZN4aaY37179yNcykYAIkc0BWHczQjClGX5poKnQOOIxt27dz9yM0IYtiSGiMAYA7fbzVJSUg6fPn36AUmSDNM0ZQAAnuiAaZpSRETE+Tlz5rz/8MMPN0yaNOkCInoMw7CfPXs2et++fdn79++f4/V6Q2VZNnh2yALh5I7VNAxDDgoKcubk5PwxMzOzdurUqS2yLA8wxqzt7e0TGxoaHq6urn68u7v7HpEOTpdhmqYcHx9/5OjRo2lBQUFIvAzLaAC7B4/HoyIibNq0aSFXL99Kk9MJCgrqKSkpecbpdAa0Ofq/vb09Ii8vbxMA6JIkmYHUlzFmcGb0vLy8N9rb2yNuBNPpdFpLSkqeCQoK6hFpEmndtGnTQkQEj8ejmqY5sgmYpgmapvnia4/HA7GxsUc5AkNEFBMT81FjY+O3ucf1JUMBhOnLEisrK7NsNtsVYlhkHgDQZrNdqayszCSYVEsI0BjBbGxs/HZMTMxHIm1Ea2xs7FGPx+PbyTRNk/0FIW51PqBer1dqaWmJWrVq1fMcoCkCjo6O/ltnZ+dYLiQrIkJzc3Pkhg0bnl2wYEFZVlZWxdNPP/2LrVu3Luju7rYhIrjd7iBEhNra2mRFUZzkG8iG+T6eLI7t7u62bd26dcHTTz/9i6ysrIoFCxaUbdiw4dnm5uZIEXdnZ+fY6Ojov/ktlAkAuGrVqudbWlqivF6vrzBjGAb7kgAMw2CmaUq6rsP27dsfj4uL+ysAaGKuTn9VVe378MMPY0i1dF2HoqKiFbIsD4jj6G94ePiFHTt2zEVEuHbtWhAiwubNm/PIYZHT2rx5c5445te//vXc8PDwC4FgyrI8UFRUtELXdZ+pfvjhhzGqqvb5j+dZpBYXF3dk+/btT+i6Tlo55P/opaury5aRkbGTpMeJ89kVvRcVFRVxLbEYhgFz587dxgWj+e8SiqLo1Ldu3bpnaB4iQmpq6p9oXGpq6p/Eb+vWrXuWBCT6HupTVVUDAJw7d+42wzB884qKiopEWuldlmXyL5iRkfFeV1eXnRYeeJBjmT59eh0AoMVi8aiq6vVzUCYA4JgxY7ra2toiSH3WrFnzPHeGbgBAu93+2cKFC99au3bty9nZ2RWSJLk4EwYA6Hv37k2luRUVFY8S/IqKikepf8+ePQ8AgMFjCkOSJFd2dva7a9eufXnhwoW/tNvtn4k416xZ8zzNbWtrixgzZkyXSDM1VVW9FovFAwA4bdq0P/f29lp9JpCfn/8GMc8nmunp6ZXh4eGX+Ep6AQBzc3PfIWQdHR1hoaGhnxKCuLi4+nPnzjnEvbempibJbrd3cjXEtLS0P9L83t7eoLCwsM6wsLDO3t7eIOpPS0ur5gyg3W7vrKmpSRJhnjt3zhEXF1dPeENDQz/t6OgIo/m5ubnviDSHh4d3pqen/x4ATEmSTIvF4gYAzM/P/zkiAhw4cGAmY8xFKsIY8+zYsWNOR0dHuKIo/SQ9AMCSkpJ/I0Tl5eWPcXNBVVWdp06dmszVWNU0TfF4PBZEhLKysie5KqIsy1ebmpp89b2MjIzKjIyM39P/TU1N35ZleUCWZQQALCsr+xfuayyapiler1dFRDh16tRkVVWdvECK5eXl8whGSUnJ8yLNiqIMdHR0hO/YsWMOY8wjOEh3TU3NLPj+97+/ha++l9vqszz6y/C3w23btj1GiJYvX76aViEjI2MX4pdTUdqve3p67HfddVcHja2urn6EVrS/v9/a399vpdWtqqrKoHHjxo272N3dHeIfCxCOjIyMXTR2+fLlq+n7tm3bHvP3P7t3785ARCguLi4QhfPkk09ulWpra78LAOD1etWoqKjmH/3oR+UAAJ9++mkkAAA3CXo89OJ0OoPo3eFw9PGxvoFc7cFut7tCQ0MHqP/q1atBAEOmZ7fbPXa73YOI9M1K40JCQgZsNpuL/4sC3C/h9KdFpJFoJ16ee+65bVFRUS2apqkAAIcOHcqUurq6JnJJwQMPPHDE4XC4AAC6urrGg9/jdrsd9H7fffddpPcTJ04kejwekCQJKSjyer0qAMDZs2cnt7a2TibCJ06c+BkJiAdPjIQ1efJk+gbnz5+f1NzcPBkAQNM0lYIfSZLQ4/HAiRMnEgPRItJID/HicDhcDz744BEAAFmWja6urokSAKhEgM1mGxDmhQjvCABw8uTJadSRlpZ2GIbUyWhtbU3YuHHjM4wxgzOKFotFBwAoLi5eBQBWRITIyMj/mjZtWhMAgCRJdCaAdNgRFxfXNGHChFauEZZVq1atBADgsJAxBowxY+PGjc+0trYmqKpqwJBzPUx0nTx5Ml6k2Z+XMWPGDNACAIAKVqv1CjmTtLS0GrKl4uLiNTBkSxpFV/fff/9Rt9sNiChxj/1H+MKm9GXLlq0/c+bMpK6urvCGhobpmZmZ78HQluUCACwsLCwSPbrYqG/58uUvi3MyMzPfa2homN7V1RV+5syZScuWLVsPADrZsbCzSG63G+6//35f6E7pcXFx8RrCk5qaWsO/o9VqvQIpKSm11AEAnkOHDiUgIqxcudInABBCy8rKykcI2LFjx6JtNlsPX3EPDDlNj91u7wUAgzGGVqvVDQCYkJDwl6tXr6r+Ts3faV69etWSkJDQAABotVrdfKUMu93eK8uyR8Rls9l6jh07Fk0wKisrHxFpJdpXrly5BhHh0KFDCQDgoQWfOXNmLZSWlv5AWEWcMWNGAyJCaWnpUj8B6ACASUlJ+71eL9klHDx4MJniAZ7pUfDki8sTEhIOXrp0yUHRlz/z1OjbpUuX7kpISKinlfSDaQLf/w8ePJjMdwbV6/VCUlLSfpFWor20tHQpIkJiYmKDyGtpaekPwOl0qtHR0R/xDx4AwJSUlH0FBQWvEgHgFw4XFhauQERwuVxBiAgXLlxwLFmy5CcRERFt8EUO4ZoyZcqJ9evXLxscHFS4E2P8NOm6LI9OebgQ2ODgoLJ+/fplU6ZMOcEYc1FMHxER0bZkyZINFy5ccIg0FBYWrhBpFGkvKCh4NSUlZb/IY3R09EdOp9NC4eeDAKDxoMZDakeAxEZAN27cuIQTrlIW6XQ6LadOnbq3vr4+oaWl5W6Px0MZmMQTLiastk8IYtprmqZPUDwIklpaWu6ur69POHXq1L1Op9PC58u6rquICBs3blziv1h+zWCMoaqqpP7anj17HkRE8Dmft99++wkAcJONUWAUoJkUYDz11FObent7h73eYpom43cEfH2NjY2TDh8+PE3s0zSN1dfXz/773/8eK8wFPndYf9Hb2xv81FNPbeIrb8AwJTeLxeLLAwDA/fbbbz9BWvclD1xXV5cYHR19RLDngADFWqDD4Ti3evXqHzc1NU3UNI2RLRuGIRGTBP/9999PBwAXAOCrr776AjH0wgsvvMJh6++8884/iXNM0wTBNEDTNNbU1DRx9erVP3Y4HOdI7W9EK/mN6OjoI3V1dYki/Ou2IZfLJVVVVWXMnz+/DABuWPAUEcuy7IqJiTmenJxcs3fv3lkcpiSGrz/84Q9/TnOnTp16hHBPnTr1CPUvXrz4DXEOwdi7d29icnLy3piYmOOyLLv8F+IGTZ8/f35ZVVVVusvlkvy3YX9HJInlMP8qyzASNniZ2leLKy8vf4IzIQ+nAUVFRS8S3pKSkme4g3LW1NSk+glPRkQoLy//Z+7Z6SQoYGnc31dFR0f/TSyL+TvggAVRt9tt5Z71ZXE7uVFjjJnkN7Zv3/6YSLxot42NjZMPHz4c71+bO3HixL2ffPLJt/z9CcHYvn37o2TPN1MyJ5oLCwtfRkRwu93WQIXR4fZjCXEo7VQU5UulrhGQkgY87i8Af8ZEzy/sCMw/ThA0IFfEMdJi8LEDlKYPd1QW8KaoJEkmr62fmzdv3ru8zwg09qs8/LKTZBiGJGaZHJ9kmiaMxiUoonXevHnvxsfHnzNNU6bzg+vG3gAOAgAUFha+AQBu0zQV6rtF4kx+R/i6/lG6AYacVjenHeAGdA8rADqhSU1NPbNo0aItiAi8tnennpu6R6woioGIsGjRoi2pqalneAodcPUBRrgsTRNfe+21dePHj2/TdV3xK5D4PwgAMDAwEMr/91VIfE5nhAevPzZjAAAul2uciCPQwxgzdV1Xxo8f3/baa6+tE3kY7rmhABhjaBiGHBkZ+fmbb775HAc4Eg/Q2Nj4jwFgAYxwPf9G306fPn0dTP+HaHvzzTefi4yM/NwwDJlqHTdEOlLTdV1BRCgoKCgG+CKb8m+UhU2bNu2vhmEAIjLaetxut+LxeBQxqvPfeUzTlFwul+L1en1RIN8ZYPr06YdEHP6NaCooKCgWaR6p3ZQA+L1d2TRNyM3N3XEDIfjS4fr6+iTOuAUR4ZVXXnkxMzPzD5xZWdd1RdM0X6NtMTk5+YPXX399qTi3vr5+hgD7uu2YaMnJyfmNYRhAO8qoCUDYw9ng4KCSnp6+azghUGiam5v7W8QvTns+/vjju8eOHds1b9683/T19fkSKIoNLl++HJKZmfmHsLCwT8+fPx8hzp07d+5vRNiBmE9PT99FafdXuUF60wLgK8cQkQ0MDCiZmZk7iQD/kJR+CvOrX/3qcb6SdIAaFRMTc1hRlL6cnJx31q5d+++rV69+KScn5z0A6J8xY0bdJ598Ml6cU1ZWNo+rvv8dY0NgfqdYc/gqPH0lAZAQ6CB10aJFP+UMG+K9IYrEgoODeyn7crvdVn7kDXv27HkoPz//lzNmzNifnJy8Pz8/f/O+fftmk3kQ83V1dQnBwcFXRJgcn+8cMj8/v9Tr9X7pwPO2CoCEINQR5hOR4i1O4cy/a/fu3d/BIcckUyktUNM0zSJcy3nIZrN1ibBE+BaL5cqWLVvmE9yvw/zXFgDZL6WsZ8+ejczKynqXE+vTCEmSdK662tKlS39y8eLFMMGfBPIxcPHixbFLly5dDwBeHh3qtOLkYLOysnaePXs2kgstYNHktguAGr+2LiEiVFVVfWfmzJl/IUGQj6BqTEhIyGd5eXn/UVFRkXv69OlJPT09YT09PaGnT5+eVFFR8WheXt7mkJCQy3yFvWTjBGvmzJl/qaqqeoQEdiuXpEdNANwkfNfmDcOA6urqtDlz5vw2KCioj7bHALvFNYfD0elwODplWb7m/53mBAUF9c2ZM+e31dXVD/HYYlSuyVMb1R9OUuRF4efFixcdH3zwwXdrampyjh07ltLR0TFZ13XbjWAoijIYFRXVnpSU9J+5ubn7cnNzD0RFRfUAAKXQjI7yRuO5Lb8c1XVdZoyBSKimadKFCxf+obW19Z7Lly9Hdnd3O/r7+4MBAEJCQlwRERG9EyZMuHTvvfe2T5w48TNVVX0xPFWdb0cydlt/OssDHVEYN4vMd2GL3xK5bUR+o78dFqpADIRM0UfM0KWmETO40Xzu2I+n/6c8/w13uPJw0HFitAAAAABJRU5ErkJggg=="

/***/ }),
/* 766 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiCQcRCgYJ984ZAAABDUlEQVRo3u2ZsQnDMBBFT0GFN/ACgZRZwOA2Y1gTpHXG8ARZI23AAzhlwAt4g3SXzr7ACWEhcs3/lTjJX8+cJawTcVo9ZYr7tPkh17yUAGAO4EX7Q291zJLtvtBLjZ+oWtvig5z+9dY8YRUAYJPXw3ykpvBMo5t3AFBD98IAgVQA8xQAwBzA021tx/b8Bz0z3Vu6qPGB6sST3BX/I+r0MeYpAAAAAAAAAAAAAAAAAAAAAAAAeHHyW5xeFWk5173VwxzE4VQvVP4cTsuoE+4oVAJAKFYnHCkUnmncBeBmvaxYXuYpAIA5gONto49dWg0us3LOga5qh7i0kqugorM6PFXVjKuOOAqZpwAA5gBfCosBSOqBFiMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDktMDdUMTc6MTA6MDYrMDI6MDAIq9k4AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA5LTA3VDE3OjEwOjA2KzAyOjAwefZhhAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="

/***/ }),
/* 767 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAOUlEQVR42u3TUQ0AIAwD0aIGt5OFBtx0mCBNljsD7+uWXwoEDPwPrvKJwJINDDwLvtqZnSwZGHgU3Kx2NIuI4wdUAAAAAElFTkSuQmCC"

/***/ }),
/* 768 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/server.b1dfa91.png";

/***/ }),
/* 769 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/tv.93b19fa.png";

/***/ }),
/* 770 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRvcjogQ29yZWxEUkFXIFg2IC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWw6c3BhY2U9InByZXNlcnZlIgogICB3aWR0aD0iNjguMzE1OTAzbW0iCiAgIGhlaWdodD0iMjEuNTM3MzU3bW0iCiAgIHZlcnNpb249IjEuMSIKICAgc3R5bGU9ImNsaXAtcnVsZTpldmVub2RkO2ZpbGwtcnVsZTpldmVub2RkO2ltYWdlLXJlbmRlcmluZzpvcHRpbWl6ZVF1YWxpdHk7c2hhcGUtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjt0ZXh0LXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb24iCiAgIHZpZXdCb3g9IjAgMCA0ODY4LjI2NjMgMTUzNC42NjcxIgogICBpZD0ic3ZnMiIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45MSByMTM3MjUiCiAgIHNvZGlwb2RpOmRvY25hbWU9ItC/0LXRgNGB0LjQui5zdmciPjxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTUyIj48cmRmOlJERj48Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+PGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+PGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPjxkYzp0aXRsZT48L2RjOnRpdGxlPjwvY2M6V29yaz48L3JkZjpSREY+PC9tZXRhZGF0YT48c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEiCiAgICAgb2JqZWN0dG9sZXJhbmNlPSIxMCIKICAgICBncmlkdG9sZXJhbmNlPSIxMCIKICAgICBndWlkZXRvbGVyYW5jZT0iMTAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjEyODQiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iNjc3IgogICAgIGlkPSJuYW1lZHZpZXc1MCIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6em9vbT0iMS45MjMxNjY2IgogICAgIGlua3NjYXBlOmN4PSI2OC44MDgwOTUiCiAgICAgaW5rc2NhcGU6Y3k9IjkuNTAxOTAzIgogICAgIGlua3NjYXBlOndpbmRvdy14PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjAiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ic3ZnMiIKICAgICBmaXQtbWFyZ2luLXRvcD0iMCIKICAgICBmaXQtbWFyZ2luLWxlZnQ9IjAiCiAgICAgZml0LW1hcmdpbi1yaWdodD0iMCIKICAgICBmaXQtbWFyZ2luLWJvdHRvbT0iMCIgLz48ZGVmcwogICAgIGlkPSJkZWZzNCI+PHN0eWxlCiAgICAgICB0eXBlPSJ0ZXh0L2NzcyIKICAgICAgIGlkPSJzdHlsZTYiPjwhW0NEQVRBWwogICAgLmZpbDQge2ZpbGw6IzY3QjQzN30KICAgIC5maWwzIHtmaWxsOiNGRUZFRkV9CiAgICAuZmlsNSB7ZmlsbDojRkVGRUZFO2ZpbGwtcnVsZTpub256ZXJvfQogICAgLmZpbDAge2ZpbGw6dXJsKCNpZDEpfQogICAgLmZpbDIge2ZpbGw6dXJsKCNpZDIpfQogICAgLmZpbDEge2ZpbGw6dXJsKCNpZDMpfQogICBdXT48L3N0eWxlPjxsaW5lYXJHcmFkaWVudAogICAgICAgaWQ9ImlkMSIKICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIgogICAgICAgeDE9IjIwNTIuOTI5OSIKICAgICAgIHkxPSIyMjE5LjEzOTkiCiAgICAgICB4Mj0iMjAxMS4wNjk5IgogICAgICAgeTI9IjEyMTMuOTgiPjxzdG9wCiAgICAgICAgIG9mZnNldD0iMCIKICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6I0YyOEUxNiIKICAgICAgICAgaWQ9InN0b3AxMiIgLz48c3RvcAogICAgICAgICBvZmZzZXQ9IjAuNTY4NjI3IgogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojRjI4RTE2IgogICAgICAgICBpZD0ic3RvcDE0IiAvPjxzdG9wCiAgICAgICAgIG9mZnNldD0iMSIKICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6I0NDM0QyMyIKICAgICAgICAgaWQ9InN0b3AxNiIgLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudAogICAgICAgaWQ9ImlkMiIKICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIgogICAgICAgeDE9IjIzNDkuNTUiCiAgICAgICB5MT0iMTM4My44OCIKICAgICAgIHgyPSIyMjkxLjMzMDEiCiAgICAgICB5Mj0iMTE1Ny43OCI+PHN0b3AKICAgICAgICAgb2Zmc2V0PSIwIgogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojRkVENjQ2IgogICAgICAgICBpZD0ic3RvcDE5IiAvPjxzdG9wCiAgICAgICAgIG9mZnNldD0iMSIKICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6I0NDM0QyMyIKICAgICAgICAgaWQ9InN0b3AyMSIgLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudAogICAgICAgaWQ9ImlkMyIKICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIgogICAgICAgeDE9IjI3ODIuMTc5OSIKICAgICAgIHkxPSIxMzAwLjEyIgogICAgICAgeDI9IjI4MzIuODc5OSIKICAgICAgIHkyPSIxMTEzLjM2Ij48c3RvcAogICAgICAgICBvZmZzZXQ9IjAiCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNFNTE0NjgiCiAgICAgICAgIGlkPSJzdG9wMjQiIC8+PHN0b3AKICAgICAgICAgb2Zmc2V0PSIxIgogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojRkVENjQ2IgogICAgICAgICBpZD0ic3RvcDI2IiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnCiAgICAgaWQ9Il84ODQxOTc5MjAiCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE2MjMuNzM0LC03NjMuMzQ0MDQpIj48ZwogICAgICAgaWQ9ImczNCI+PHBhdGgKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgc3R5bGU9ImZpbGw6dXJsKCNpZDEpIgogICAgICAgICBpZD0icGF0aDM2IgogICAgICAgICBkPSJtIDIwMjUsMjIzMyBjIC0zMywtMTUgLTY0LC0zMiAtOTQsLTUzIC01NCwtMzYgLTEwMCwtODEgLTE0MSwtMTMxIC02MSwtNzUgLTEwOCwtMTczIC0xMzMsLTI2NiAtOCwtMjkgLTE0LC01OCAtMTksLTg3IC00LC0yMyAtNywtNDcgLTEwLC03MSAtMiwtMjIgLTMsLTQ0IC00LC02NiAtMSwtMjIgMSwtNDYgMywtNjcgOCwtODcgMzIsLTE3MCA4OSwtMjM4IDE3LC0yMCAzNSwtMzYgNTYsLTUxIDE3LC0xMyAzOCwtMjQgNTgsLTMyIDYyLC0yNyAxMzMsLTM1IDIwMSwtMjkgMTksMiA1Nyw0IDc2LDggNiwxIDExLDIgMTcsNCA0LDEgMjEsNyA4LDggLTQwLDQgLTgzLDEwIC0xMjIsMjIgLTM2LDExIC03MywyNSAtMTAzLDQ3IC0yMSwxNSAtNDEsMzIgLTU3LDUzIC0xMCwxMyAtMTgsMjYgLTI3LDQwIC04LDE1IC0xNiwzMiAtMjEsNDggLTE2LDQ2IC0yMiw5MiAtMjQsMTM5IGwgMCw0NiAxMSwxMDMgYyA1LDMxIDExLDYxIDE5LDkxIDYsMjQgMTQsNDcgMjEsNzEgOSwyNiAyMSw1MiAzMyw3OCA2MSwxMjkgMTY2LDIzNyAyOTQsMzAxIDU1LDI3IDExMSw0NiAxNzEsNjAgMzksOSA3OCwxNCAxMTgsMjAgLTExMCwyMSAtMzE1LDIgLTQxNywtNDUgeiIKICAgICAgICAgY2xhc3M9ImZpbDAiIC8+PHBhdGgKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgc3R5bGU9ImZpbGw6dXJsKCNpZDMpIgogICAgICAgICBpZD0icGF0aDM4IgogICAgICAgICBkPSJtIDI4MDUsMTE3MSBjIC0xNywtMTggLTM2LC0zNCAtNTYsLTQ4IC04LC01IC0xNSwtMTAgLTIzLC0xNSAtNywtNSAtMTUsLTkgLTIzLC0xMyAtMjgsLTIwIC02NCwtMjggLTEwMCwtMzUgbCAtNTIsLTYgYyA1MSwtMTIgMTAzLC0xNiAxNTYsLTExIDU5LDUgMTAwLDIyIDE1MCw1MiAxMTAsNjYgMTcyLDE3MCAyMDgsMjgyIGwgLTE0NSwwIGMgLTIzLC03NiAtNTksLTE0OCAtMTE1LC0yMDQgeiIKICAgICAgICAgY2xhc3M9ImZpbDEiIC8+PHBhdGgKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgc3R5bGU9ImZpbGw6dXJsKCNpZDIpIgogICAgICAgICBpZD0icGF0aDQwIgogICAgICAgICBkPSJtIDIzMTQsMTI4MiBjIC0zMSwtMzAgLTY5LC01NyAtMTA2LC04MCAtMjUsLTE2IC01MiwtMzAgLTc3LC00NSA3MCw0IDE3OSwzNyAyMzYsNzYgMzcsMjYgNzAsNTUgOTksODkgMTcsMjAgMzEsNDEgNDUsNjIgbCAtMTExLDAgYyAtMjQsLTM4IC01MiwtNzEgLTg1LC0xMDIgeiIKICAgICAgICAgY2xhc3M9ImZpbDIiIC8+PHBvbHlnb24KICAgICAgICAgc3R5bGU9ImZpbGw6I2ZlZmVmZSIKICAgICAgICAgaWQ9InBvbHlnb240MiIKICAgICAgICAgcG9pbnRzPSIyMzE3LDE0ODUgMjgzOSwxNDg1IDI4MzksMTU3MSAyNjI4LDE1NzEgMjYyOCwyMjg2IDI1MjcsMjI4NiAyNTI3LDE1NzEgMjMxNywxNTcxICIKICAgICAgICAgY2xhc3M9ImZpbDMiIC8+PHBvbHlnb24KICAgICAgICAgc3R5bGU9ImZpbGw6I2ZlZmVmZSIKICAgICAgICAgaWQ9InBvbHlnb240NCIKICAgICAgICAgcG9pbnRzPSIzMDA0LDE0ODUgMzE4NiwyMTMyIDMzNjksMTQ4NSAzNDgwLDE0ODUgMzIzMSwyMjg2IDMxNDMsMjI4NiAyODk0LDE0ODUgIgogICAgICAgICBjbGFzcz0iZmlsMyIgLz48cGF0aAogICAgICAgICBzdHlsZT0iZmlsbDojNjdiNDM3IgogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgICAgICBpZD0icGF0aDQ2IgogICAgICAgICBkPSJtIDIxODUsMTEwOCBjIC0yMjQsLTE5IC0zMTYsLTE2NiAtMzM5LC0zMzYgMjkzLC0zNyA0ODIsNDMgNTY3LDI0MCAtODYsLTEzNSAtMjQ1LC0xOTkgLTQ0MywtMTkwIDI2LDE5MCAxOTEsMjU3IDUzNiwyMzggbCAyNCwtNCAzNiwtNSBjIC0xMTgsMzggLTI0Miw2NSAtMzgyLDU4IGwgMCwwIHoiCiAgICAgICAgIGNsYXNzPSJmaWw0IiAvPjwvZz48cGF0aAogICAgICAgc3R5bGU9ImZpbGw6I2ZlZmVmZTtmaWxsLXJ1bGU6bm9uemVybyIKICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgICBpZD0icGF0aDQ4IgogICAgICAgZD0ibSAzOTcxLDE5ODAgMCwzMDggLTk5LDAgMCwtNzg2IDI1MSwwIGMgMzgsMCA3Miw2IDEwMSwxOCAyOSwxMiA1NCwyOSA3NCw1MCAyMCwyMSAzNSw0NyA0NSw3NiAxMCwyOSAxNSw2MiAxNSw5NiAwLDM4IC01LDcyIC0xNSwxMDEgLTEwLDMwIC0yNSw1NSAtNDUsNzUgLTIwLDIwIC00NSwzNiAtNzQsNDYgLTI5LDExIC02MywxNiAtMTAwLDE2IGwgLTE1MiwwIHogbSAwLC04NSAxNTIsMCBjIDI0LDAgNDUsLTQgNjIsLTExIDE3LC04IDMxLC0xOCA0MiwtMzIgMTEsLTEzIDE5LC0yOSAyNCwtNDggNSwtMTggOCwtMzkgOCwtNjEgMCwtMjAgLTMsLTQwIC04LC01OSAtNSwtMTkgLTEzLC0zNiAtMjQsLTUwIC0xMSwtMTQgLTI1LC0yNiAtNDIsLTM0IC0xNywtOSAtMzgsLTEzIC02MiwtMTMgbCAtMTUyLDAgMCwzMDggeiBtIDcwMyw0MDMgYyAtMzUsMCAtNjcsLTUgLTk1LC0xNiAtMjgsLTExIC01MiwtMjYgLTcyLC00OCAtMjAsLTIxIC0zNSwtNDggLTQ1LC04MSAtMTEsLTMzIC0xNiwtNzEgLTE2LC0xMTYgbCAwLC02NiBjIDAsLTUxIDYsLTk1IDE4LC0xMzAgMTIsLTM2IDI4LC02NCA0OCwtODYgMjAsLTIyIDQzLC0zOCA2OSwtNDggMjYsLTEwIDUzLC0xNSA4MSwtMTUgMzcsMCA2OCw2IDk0LDE4IDI2LDEyIDQ3LDMwIDY0LDUzIDE3LDIzIDI5LDUyIDM2LDg2IDgsMzQgMTEsNzQgMTEsMTE4IGwgMCw1NSAtMzI2LDAgMCwxNCBjIDAsNjIgMTIsMTA4IDM1LDEzNyAyNCwyOCA1OCw0MyAxMDIsNDMgMTYsMCAzMSwtMiA0NCwtNSAxMywtMyAyNSwtOCAzNiwtMTQgMTEsLTYgMjEsLTEzIDMwLC0yMSA5LC04IDE3LC0xNyAyNSwtMjcgbCA1MCw2MCBjIC04LDExIC0xOCwyMiAtMjksMzIgLTExLDEwIC0yNSwyMCAtNDAsMjggLTE1LDggLTMzLDE1IC01MywyMCAtMjAsNSAtNDMsOCAtNjgsOCB6IG0gLTExLC01MjQgYyAtMTcsMCAtMzIsMiAtNDYsOCAtMTQsNSAtMjYsMTQgLTM3LDI3IC0xMSwxMyAtMTksMzAgLTI2LDUyIC02LDIyIC0xMSw0OSAtMTIsODEgbCAyMzAsMCAwLC0xMyBjIC0xLC0yMyAtNCwtNDMgLTcsLTYyIC00LC0xOSAtMTAsLTM1IC0xOCwtNDkgLTgsLTE0IC0xOSwtMjQgLTMzLC0zMiAtMTQsLTggLTMxLC0xMSAtNTIsLTExIHogbSA1NjEsMTggYyAtOCwtMSAtMTUsLTIgLTIxLC0zIC02LC0xIC0xNCwtMSAtMjIsLTEgLTI2LDAgLTQ3LDcgLTY0LDIyIC0xNywxNCAtMzAsMzQgLTM5LDU5IGwgMCw0MTggLTk1LDAgMCwtNTg0IDkzLDAgMSw1OSBjIDEyLC0yMiAyNywtMzkgNDUsLTUxIDE4LC0xMyAzOSwtMTkgNjQsLTE5IDMsMCA2LDAgMTAsMSA0LDEgOCwxIDExLDIgMywxIDcsMSAxMCwyIDMsMSA1LDIgNywyIGwgMSw5MyB6IG0gMzc5LDM0NSBjIDAsLTExIC0yLC0yMCAtNiwtMjkgLTQsLTkgLTExLC0xNyAtMjAsLTI1IC05LC04IC0yMSwtMTYgLTM1LC0yNCAtMTQsLTggLTMyLC0xNyAtNTMsLTI2IC0yNywtMTEgLTUxLC0yMiAtNzMsLTMzIC0yMSwtMTEgLTM5LC0yMyAtNTQsLTM2IC0xNSwtMTMgLTI2LC0yOCAtMzMsLTQ2IC04LC0xNyAtMTIsLTM3IC0xMiwtNjEgMCwtMjMgNCwtNDUgMTMsLTY1IDksLTIwIDIxLC0zOCAzNywtNTMgMTYsLTE1IDM2LC0yNyA1OCwtMzUgMjMsLTkgNDgsLTEzIDc2LC0xMyAyOSwwIDU2LDUgNzksMTQgMjMsOSA0MywyMSA2MCwzNyAxNiwxNiAyOSwzNSAzNyw1NiA5LDIyIDEzLDQ1IDEzLDcwIGwgLTk1LDAgYyAwLC0xMiAtMiwtMjMgLTYsLTM1IC00LC0xMSAtMTAsLTIxIC0xOCwtMzAgLTgsLTkgLTE4LC0xNiAtMjksLTIyIC0xMSwtNiAtMjUsLTggLTQwLC04IC0xNiwwIC0zMCwyIC00MSw3IC0xMSw1IC0yMSwxMSAtMjgsMTggLTcsNyAtMTMsMTYgLTE2LDI2IC0zLDEwIC01LDIwIC01LDMwIDAsMTEgMiwyMCA1LDI4IDMsOCA4LDE1IDE2LDIyIDgsNyAxOCwxNCAzMSwyMCAxMyw3IDMwLDE1IDUxLDI0IDI5LDEyIDU2LDIzIDc5LDM1IDIzLDEyIDQyLDI1IDU4LDM4IDE1LDE0IDI3LDMwIDM1LDQ3IDgsMTggMTIsMzggMTIsNjIgMCwyNiAtNSw0OSAtMTQsNjkgLTksMjEgLTIyLDM4IC0zOSw1MyAtMTcsMTUgLTM3LDI2IC02MSwzNCAtMjQsOCAtNTAsMTIgLTc5LDEyIC0zMywwIC02MiwtNSAtODgsLTE1IC0yNiwtMTAgLTQ3LC0yNCAtNjQsLTQxIC0xNywtMTcgLTMwLC0zNyAtMzksLTU5IC05LC0yMiAtMTMsLTQ2IC0xMywtNzAgbCA5NiwwIGMgMSwyMCA0LDM3IDExLDUxIDcsMTMgMTUsMjQgMjYsMzIgMTAsOCAyMiwxMyAzNCwxNiAxMywzIDI1LDUgMzcsNSAzMiwwIDU2LC03IDcyLC0yMSAxNywtMTQgMjUsLTMzIDI1LC01OCB6IG0gMzIzLDE1MCAtOTUsMCAwLC01ODQgOTUsMCAwLDU4NCB6IG0gLTEwMSwtNzM5IGMgMCwtMTYgNSwtMzAgMTQsLTQxIDksLTExIDIyLC0xNyA0MCwtMTcgMTgsMCAzMiw2IDQxLDE3IDksMTEgMTQsMjUgMTQsNDEgMCwxNiAtNCwzMCAtMTMsNDEgLTksMTEgLTIzLDE2IC00MSwxNiAtMTgsMCAtMzEsLTUgLTQwLC0xNiAtOSwtMTEgLTE0LC0yNCAtMTQsLTQxIHogbSAzOTgsNDcyIC01MSw1OCAwLDIwOSAtOTUsMCAwLC04MjkgOTUsMCAwLDQ5NiA0MywtNTkgMTM5LC0xOTIgMTE0LDAgLTE4NiwyNDQgMjEwLDM0MCAtMTExLDAgLTE1OSwtMjY3IHoiCiAgICAgICBjbGFzcz0iZmlsNSIgLz48L2c+PC9zdmc+"

/***/ }),
/* 771 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMiA2aDMuODI4Yy0xLjMzNSAyLjkwNS0xLjMzNSA5LjA5NiAwIDEyaC0zLjgyOGMtMS4zMTEtMS4xMDgtMi0zLjU1MS0yLTUuOTk1IDAtMi40NS42OTItNC45IDItNi4wMDV6bTIyIDYuMDA1Yy4wMDUgOC4wMzEtMy4xNDUgMTIuODY0LTYuMTIxIDExLjg2NC0uNzc0LS4yNi05LjU2Ny01LjU3OS05LjU2Ny01LjU3OS0xLjk5My0yLjIyLTEuOTkzLTEwLjI4OCAwLTEyLjUwOCAwIDAgOS4xNjEtNS40NzYgOS41NDgtNS42MzMgMi42OTEtMS4wODYgNi4xMzYgMy44MiA2LjE0IDExLjg1NnptLTMuMzgzLTcuNjkzYy0xLjA1My0yLjI2NC0zLjAwMi0yLjIyNi00LjAzNC4wMDItLjU4OCAxLjI3MS0uOTkzIDMuMTY1LTEuMjEgNC43OTdoLjUyN2MxLjU4NyAwIDIuODczIDEuMjg3IDIuODczIDIuODc1cy0xLjI4NiAyLjg3NS0yLjg3MyAyLjg3NWgtLjUxNWMuMjE3IDEuNjAzLjYxNiAzLjUzOCAxLjIwNiA0Ljg5Ljk4OCAyLjI3MSAzLjA2MiAyLjIzMiA0LjAzMy0uMDAyIDEuOTQ2LTQuNDc3IDEuNzcyLTExLjYwOS0uMDA3LTE1LjQzN3oiLz48L3N2Zz4="

/***/ }),
/* 772 */,
/* 773 */,
/* 774 */,
/* 775 */,
/* 776 */,
/* 777 */,
/* 778 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(727)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(446),
  /* template */
  __webpack_require__(907),
  /* scopeId */
  "data-v-764ab786",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 779 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(698)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(447),
  /* template */
  __webpack_require__(878),
  /* scopeId */
  "data-v-36aedd76",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 780 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(685)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(448),
  /* template */
  __webpack_require__(865),
  /* scopeId */
  "data-v-22dcda9c",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 781 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(707)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(449),
  /* template */
  __webpack_require__(887),
  /* scopeId */
  "data-v-4b0f1bf0",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 782 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(740)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(450),
  /* template */
  __webpack_require__(921),
  /* scopeId */
  "data-v-e19c749a",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 783 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(731)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(451),
  /* template */
  __webpack_require__(911),
  /* scopeId */
  "data-v-8d377a52",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 784 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(737)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(452),
  /* template */
  __webpack_require__(917),
  /* scopeId */
  "data-v-b82ca3a2",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 785 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(695)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(453),
  /* template */
  __webpack_require__(875),
  /* scopeId */
  "data-v-3553adab",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 786 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(666)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(454),
  /* template */
  __webpack_require__(846),
  /* scopeId */
  "data-v-00e6ce16",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 787 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(684)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(455),
  /* template */
  __webpack_require__(864),
  /* scopeId */
  "data-v-22904a94",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 788 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(715)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(456),
  /* template */
  __webpack_require__(895),
  /* scopeId */
  "data-v-5e6b8d9c",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 789 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(673)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(457),
  /* template */
  __webpack_require__(853),
  /* scopeId */
  "data-v-0ec311ec",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 790 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(686)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(458),
  /* template */
  __webpack_require__(866),
  /* scopeId */
  "data-v-22efa74e",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 791 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(693)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(459),
  /* template */
  __webpack_require__(873),
  /* scopeId */
  "data-v-33fbd264",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 792 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(713)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(460),
  /* template */
  __webpack_require__(893),
  /* scopeId */
  "data-v-5774ed1f",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 793 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(670)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(461),
  /* template */
  __webpack_require__(850),
  /* scopeId */
  "data-v-067cc01e",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 794 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(700)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(462),
  /* template */
  __webpack_require__(880),
  /* scopeId */
  "data-v-3b319cf8",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 795 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(683)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(463),
  /* template */
  __webpack_require__(863),
  /* scopeId */
  "data-v-20f84a7e",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 796 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(714)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(464),
  /* template */
  __webpack_require__(894),
  /* scopeId */
  "data-v-5cc81783",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 797 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(691)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(465),
  /* template */
  __webpack_require__(871),
  /* scopeId */
  "data-v-2fdf3654",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 798 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(692)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(467),
  /* template */
  __webpack_require__(872),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 799 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(723)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(468),
  /* template */
  __webpack_require__(903),
  /* scopeId */
  "data-v-6aff9602",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 800 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(730)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(470),
  /* template */
  __webpack_require__(910),
  /* scopeId */
  "data-v-89a6cb6e",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 801 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(725)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(472),
  /* template */
  __webpack_require__(905),
  /* scopeId */
  "data-v-705de8d3",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 802 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(716)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(474),
  /* template */
  __webpack_require__(896),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 803 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(667)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(475),
  /* template */
  __webpack_require__(847),
  /* scopeId */
  "data-v-01524aaa",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 804 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(719)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(476),
  /* template */
  __webpack_require__(899),
  /* scopeId */
  "data-v-63b3dab1",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 805 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(742)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(478),
  /* template */
  __webpack_require__(923),
  /* scopeId */
  "data-v-e541ddde",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 806 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(675)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(479),
  /* template */
  __webpack_require__(855),
  /* scopeId */
  "data-v-1344edb2",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 807 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(735)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(480),
  /* template */
  __webpack_require__(915),
  /* scopeId */
  "data-v-adb02fdc",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 808 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(681)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(481),
  /* template */
  __webpack_require__(861),
  /* scopeId */
  "data-v-1d3d6d8a",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 809 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(668)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(482),
  /* template */
  __webpack_require__(848),
  /* scopeId */
  "data-v-059b68dc",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 810 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(722)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(483),
  /* template */
  __webpack_require__(902),
  /* scopeId */
  "data-v-657b7eaa",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 811 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(701)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(484),
  /* template */
  __webpack_require__(881),
  /* scopeId */
  "data-v-3ebd2e38",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 812 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(672)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(485),
  /* template */
  __webpack_require__(852),
  /* scopeId */
  "data-v-0e2a8966",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 813 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(688)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(486),
  /* template */
  __webpack_require__(868),
  /* scopeId */
  "data-v-28e9358e",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 814 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(712)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(487),
  /* template */
  __webpack_require__(892),
  /* scopeId */
  "data-v-52b0b5df",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 815 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(738)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(488),
  /* template */
  __webpack_require__(919),
  /* scopeId */
  "data-v-c85e9f04",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 816 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(720)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(489),
  /* template */
  __webpack_require__(900),
  /* scopeId */
  "data-v-64dec7f4",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 817 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(665)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(490),
  /* template */
  __webpack_require__(845),
  /* scopeId */
  "data-v-00216822",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 818 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(705)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(491),
  /* template */
  __webpack_require__(885),
  /* scopeId */
  "data-v-44e32464",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 819 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(674)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(492),
  /* template */
  __webpack_require__(854),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 820 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(734)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(493),
  /* template */
  __webpack_require__(914),
  /* scopeId */
  "data-v-a24ff142",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 821 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(696)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(494),
  /* template */
  __webpack_require__(876),
  /* scopeId */
  "data-v-35d2c8c4",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 822 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(704)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(495),
  /* template */
  __webpack_require__(884),
  /* scopeId */
  "data-v-4425ce00",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 823 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(702)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(496),
  /* template */
  __webpack_require__(882),
  /* scopeId */
  "data-v-429a4594",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 824 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(676)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(497),
  /* template */
  __webpack_require__(856),
  /* scopeId */
  "data-v-13816c27",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 825 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(682)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(498),
  /* template */
  __webpack_require__(862),
  /* scopeId */
  "data-v-207a4f2f",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 826 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(678)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(499),
  /* template */
  __webpack_require__(858),
  /* scopeId */
  "data-v-1b402118",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 827 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(711)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(500),
  /* template */
  __webpack_require__(891),
  /* scopeId */
  "data-v-4ffb577c",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 828 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(718)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(501),
  /* template */
  __webpack_require__(898),
  /* scopeId */
  "data-v-6377987f",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 829 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(709)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(502),
  /* template */
  __webpack_require__(889),
  /* scopeId */
  "data-v-4bca84ab",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 830 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(677)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(503),
  /* template */
  __webpack_require__(857),
  /* scopeId */
  "data-v-18bc4950",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 831 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(708)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(504),
  /* template */
  __webpack_require__(888),
  /* scopeId */
  "data-v-4bc65ef0",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 832 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(703)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(505),
  /* template */
  __webpack_require__(883),
  /* scopeId */
  "data-v-42dc9dd1",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 833 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(733)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(507),
  /* template */
  __webpack_require__(913),
  /* scopeId */
  "data-v-99f955a4",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 834 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(721)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(508),
  /* template */
  __webpack_require__(901),
  /* scopeId */
  "data-v-64e41e76",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 835 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(739)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(509),
  /* template */
  __webpack_require__(920),
  /* scopeId */
  "data-v-ca13d03e",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 836 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(697)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(510),
  /* template */
  __webpack_require__(877),
  /* scopeId */
  "data-v-36a04831",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 837 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(694)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(511),
  /* template */
  __webpack_require__(874),
  /* scopeId */
  "data-v-3448f8aa",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 838 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(680)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(512),
  /* template */
  __webpack_require__(860),
  /* scopeId */
  "data-v-1cd7edd2",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 839 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(690)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(514),
  /* template */
  __webpack_require__(870),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 840 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(732)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(518),
  /* template */
  __webpack_require__(912),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 841 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(671)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(519),
  /* template */
  __webpack_require__(851),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 842 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(726)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(521),
  /* template */
  __webpack_require__(906),
  /* scopeId */
  "data-v-74490f20",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 843 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(728)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(522),
  /* template */
  __webpack_require__(908),
  /* scopeId */
  "data-v-7748de94",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 844 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(736)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(523),
  /* template */
  __webpack_require__(916),
  /* scopeId */
  "data-v-b7c14b96",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 845 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "p-settings",
    attrs: {
      "data-xy-group": "",
      "data-xy-open-left": ""
    }
  }, [_c('div', {
    staticClass: "p-settings__menu",
    attrs: {
      "data-xy-group-vertical": "",
      "data-xy-open-left": ""
    }
  }, [_c('div', {
    staticClass: "p-settings__menu-item",
    class: [_vm.activeTab === 'diagnostic' ? 'p-settings__menu-item_active' : null],
    attrs: {
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.gotoTab('diagnostic')
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.$lang.messages.settings.diagnostic) + "\n      ")]), _vm._v(" "), (_vm.hasVideoSettings) ? _c('div', {
    staticClass: "p-settings__menu-item",
    class: [_vm.activeTab === 'video' ? 'p-settings__menu-item_active' : null],
    attrs: {
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.gotoTab('video')
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.$lang.messages.settings.video) + "\n      ")]) : _vm._e(), _vm._v(" "), (_vm.authorized) ? _c('div', {
    staticClass: "p-settings__menu-item",
    class: [_vm.activeTab === 'parent-control' ? 'p-settings__menu-item_active' : null],
    attrs: {
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.gotoTab('parent-control')
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.$lang.messages.settings.parent_control) + "\n      ")]) : _vm._e(), _vm._v(" "), (_vm.connected) ? _c('div', {
    staticClass: "p-settings__menu-item",
    class: [_vm.activeTab === 'speed-test' ? 'p-settings__menu-item_active' : null],
    attrs: {
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.gotoTab('speed-test')
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.$lang.messages.settings.speed_test) + "\n      ")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "p-settings__page"
  }, [(_vm.activeTab === 'video') ? _c('p-settings-video') : _vm._e(), _vm._v(" "), (_vm.activeTab === 'diagnostic') ? _c('p-diagnostic') : _vm._e(), _vm._v(" "), (_vm.activeTab === 'parent-control') ? _c('p-parent-control') : _vm._e(), _vm._v(" "), (_vm.activeTab === 'location') ? _c('p-settings-location') : _vm._e(), _vm._v(" "), (_vm.activeTab === 'speed-test') ? _c('p-speed-test') : _vm._e()], 1)])
},staticRenderFns: []}

/***/ }),
/* 846 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "hollow-dots-spinner",
    style: (_vm.spinnerStyle)
  }, _vm._l((_vm.dotsStyles), function(ds, index) {
    return _c('div', {
      key: index,
      staticClass: "dot",
      style: (ds)
    })
  }))
},staticRenderFns: []}

/***/ }),
/* 847 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "e-column-tvshow",
    class: {
      'e-column-tvshow_future': _vm.isFuture, 'e-column-tvshow_active': _vm.active
    },
    attrs: {
      "scroll-margin": "0 15 0 15",
      "content-id": _vm.id,
      "content-type": "tvshow",
      "content-mode": _vm.mode
    },
    on: {
      "click": _vm.clickHandler
    }
  }, [(_vm.isArchive) ? _c('div', {
    staticClass: "e-column-tvshow__icon e-column-tvshow__icon_archive",
    attrs: {
      "title": "Программа доступна для просмотра из архива"
    }
  }, [_c('i', {
    staticClass: "fa fa-hdd"
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "e-column-tvshow__icon",
    class: {
      'e-column-tvshow__icon_favorite': _vm.isFavorite
    },
    attrs: {
      "title": _vm.isFavorite ? 'Удалить программу из избранного' : 'Добавить программу в избранное'
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        return _vm.toggleFavorite($event)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-bookmark"
  })]), _vm._v(" "), _c('div', {
    staticClass: "e-column-tvshow__title"
  }, [_c('strong', [_vm._v(_vm._s(_vm.startTime))]), _vm._v(" – " + _vm._s(_vm.title) + "\n  ")]), _vm._v(" "), (_vm.isLive) ? _c('div', {
    staticClass: "e-column-tvshow__progress"
  }, [_c('div', {
    staticClass: "e-column-tvshow__progress-line",
    style: ({
      width: _vm.progress + '%'
    })
  })]) : _vm._e(), _vm._v(" "), _c('hr', {
    staticClass: "e-column-tvshow__divider"
  })])
},staticRenderFns: []}

/***/ }),
/* 848 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "main-grid"
  }, [_c('div', {
    staticClass: "grid"
  }, [_c('div', {
    staticClass: "grid__channel-list",
    style: ({
      transform: 'translate(' + (0) + 'rem,' + (_vm.translate.y) + 'rem)'
    })
  }, _vm._l((_vm.channelsForShow), function(channel) {
    return _c('div', {
      staticClass: "grid__channel-list-item",
      class: {
        'grid__channel-list-item_active': _vm.checkChannel(channel)
      },
      style: ({
        height: _vm.cursor.height + 'rem'
      })
    }, [_c('div', {
      staticClass: "channel-list-item_logo"
    }, [_vm._v("logo")]), _vm._v(" "), _c('div', {
      staticClass: "channel-list-item_name"
    }, [_vm._v(_vm._s(channel.name))])])
  })), _vm._v(" "), _c('div', {
    staticClass: "grid__time-line",
    style: ({
      transform: 'translate(' + (_vm.translate.x) + 'rem,' + (0) + 'rem)',
      left: (_vm.timeScale.left) + 'rem'
    })
  }, _vm._l((_vm.timeScale.scale), function(hour) {
    return _c('div', {
      staticClass: "grid__time-point"
    }, [_vm._v(_vm._s(hour) + ":00")])
  })), _vm._v(" "), _c('div', {
    staticClass: "grid__tvshows-group",
    style: ({
      transform: 'translate(' + (_vm.translate.x) + 'rem,' + (_vm.translate.y) + 'rem)'
    })
  }, [_c('div', {
    staticClass: "grid__time-marker",
    style: ({
      left: _vm.timelinePosition + 'rem'
    })
  }), _vm._v(" "), _vm._l((_vm.channelsForShow), function(channel) {
    return _c('div', {
      staticClass: "grid__tvshows-row",
      style: ({
        height: _vm.cursor.height + 'rem'
      })
    }, _vm._l((channel.tvshows), function(tvshow) {
      return _c('div', {
        staticClass: "grid__tvshow-item",
        class: {
          'grid__tvshow-item_active': _vm.checkCursor(tvshow.tvshow_id), 'grid__tvshow-item_current': _vm.checkTimeLineHover(tvshow)
        },
        style: (_vm.getDomPosition(tvshow))
      }, [_vm._v(_vm._s(tvshow.title))])
    }))
  })], 2)]), _vm._v(" "), _c('div', {
    staticClass: "show-details"
  }, [_c('div', {
    staticClass: "show-details__thumb"
  }), _vm._v(" "), _c('div', {
    staticClass: "show-details__info"
  }, [_c('span', {
    staticClass: "info_name"
  }, [_vm._v(_vm._s(_vm.cursor.title))]), _vm._v(" "), _c('span', {
    staticClass: "info_description"
  }, [_vm._v("Some water text")])])])])
},staticRenderFns: []}

/***/ }),
/* 849 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w-form-checkbox",
    class: {
      'w-form-checkbox_checked': _vm.checked
    }
  }, [_c('div', {
    staticClass: "w-form-checkbox__button"
  })])
},staticRenderFns: []}

/***/ }),
/* 850 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "self-building-square-spinner",
    style: (_vm.spinnerStyle)
  }, _vm._l((_vm.squaresStyles), function(ss, index) {
    return _c('div', {
      key: index,
      staticClass: "square",
      class: {
        'clear': index && index % 3 === 0
      },
      style: (ss)
    })
  }))
},staticRenderFns: []}

/***/ }),
/* 851 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.promptData) ? _c('w-prompt', _vm._b({
    attrs: {
      "id": _vm.id
    },
    on: {
      "return": _vm.returnHandler,
      "close": _vm.cancelHandler,
      "change": _vm.changeHandler
    }
  }, 'w-prompt', _vm.promptData, false)) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 852 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "p-login"
  }, [_c('div', {
    staticClass: "p-login__main"
  }, [_c('div', {
    staticClass: "p-login__auth"
  }, [_vm._v(_vm._s(_vm.actionTitle)), (_vm.username) ? _c('span', [_vm._v(", "), _c('span', {
    staticClass: "p-login__username"
  }, [_vm._v(_vm._s(_vm.username))])]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "p-login__input"
  }, [_c('span', {
    staticClass: "p-login__input-step"
  }, [_vm._v(_vm._s(_vm.$lang.messages.auth.step) + " " + _vm._s(_vm.step) + "/" + _vm._s(_vm.countSteps) + ":")]), _vm._v(" "), _c('input', {
    ref: "inputField",
    staticClass: "p-login__input-field",
    attrs: {
      "type": _vm.inputType,
      "placeholder": _vm.visibleText
    },
    on: {
      "keypress": _vm.checkKey
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "p-login__notification"
  }, [(_vm.message) ? _c('span', [_vm._v(_vm._s(_vm.message))]) : _vm._e()]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.step == 1),
      expression: "step == 1"
    }],
    staticClass: "p-login__quickenter"
  }, _vm._l((_vm.quickenter), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "p-login__quickenter-item",
      on: {
        "click": function($event) {
          _vm.addText(item)
        }
      }
    }, [_vm._v(_vm._s(item))])
  })), _vm._v(" "), _c('div', {
    ref: "buttons",
    staticClass: "p-login__button-group"
  }, [_c('w-button', {
    staticClass: "p-login__button",
    attrs: {
      "caption": _vm.nextStepName
    },
    on: {
      "click": _vm.nextStep
    }
  }), _vm._v(" "), (_vm.showPrevStep) ? _c('w-button', {
    staticClass: "p-login__button",
    attrs: {
      "caption": _vm.$lang.messages.auth.prev_step
    },
    on: {
      "click": _vm.prevStep
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "p-login__qrcode",
    staticStyle: {
      "display": "none"
    }
  })])])
},staticRenderFns: []}

/***/ }),
/* 853 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "orbit-spinner",
    style: (_vm.spinnerStyle)
  }, [_c('div', {
    staticClass: "orbit one",
    style: (_vm.orbitStyle)
  }), _vm._v(" "), _c('div', {
    staticClass: "orbit two",
    style: (_vm.orbitStyle)
  }), _vm._v(" "), _c('div', {
    staticClass: "orbit three",
    style: (_vm.orbitStyle)
  })])
},staticRenderFns: []}

/***/ }),
/* 854 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tv-column",
    on: {
      "click": _vm.hideFilter
    }
  }, [(_vm.showPlaceholder) ? _c('w-placeholder') : [_c('div', {
    staticClass: "tv-column__channels"
  }, [_c('div', {
    staticClass: "tv-column__scrollable tv-column__scrollable_smooth"
  }, _vm._l((_vm.channels), function(id, index) {
    return _c('e-column-channel', {
      key: id,
      ref: id === _vm.activeChannelId ? 'channel-active' : '',
      refInFor: true,
      attrs: {
        "id": id,
        "num": index + 1,
        "active": id === _vm.activeChannelId
      },
      on: {
        "click": function($event) {
          _vm.selectChannel(id)
        }
      }
    })
  }))]), _vm._v(" "), _c('div', {
    staticClass: "tv-column__dates"
  }, [_vm._l((_vm.dates), function(date, index) {
    return _c('div', {
      key: index,
      staticClass: "tv-column__dates-item",
      class: {
        'tv-column__dates-item_active': _vm.activeDate === date
      },
      on: {
        "click": function($event) {
          _vm.selectDate(date)
        }
      }
    }, [_c('strong', [_vm._v(_vm._s(_vm._f("momentFormat")(date, 'DD')) + " " + _vm._s(_vm.$lang.messages.monthShort[_vm.momentFormat(date, 'M')]))]), _vm._v(" – " + _vm._s(_vm.$lang.messages.days[_vm.momentFormat(date, 'd')]) + "\n      ")])
  }), _vm._v(" "), (!_vm.dates.length) ? _c('div', {
    staticClass: "tv-column__dates-empty"
  }, [_vm._v(_vm._s(_vm.$lang.messages.messages.no_tvguide))]) : _vm._e()], 2), _vm._v(" "), _c('div', {
    staticClass: "tv-column__tvshows-list"
  }, [(!_vm.tvshows.length) ? _c('div', {
    staticClass: "tv-column__tvshows-list-empty"
  }, [_vm._v(_vm._s(_vm.$lang.messages.messages.no_tvguide))]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "tv-column__scrollable",
    class: {
      'tv-column__scrollable_smooth': _vm.smoothScroll
    }
  }, _vm._l((_vm.tvshows), function(tvshow) {
    return _c('e-column-tvshow', {
      key: tvshow.tvshow_id,
      ref: _vm.activeTvshow === tvshow.tvshow_id ? 'tvshow-active' : '',
      refInFor: true,
      attrs: {
        "tvshow": tvshow,
        "id": tvshow.tvshow_id,
        "time": _vm.time,
        "active": _vm.activeTvshow === tvshow.tvshow_id
      }
    })
  }))]), _vm._v(" "), (!_vm.isPlayable) ? _c('div', {
    staticClass: "tv-column__lock"
  }, [_c('i', {
    staticClass: "tv-column__lock-icon fa fa-lock"
  }), _vm._v(" "), (!_vm.authorized) ? _c('div', {
    staticClass: "tv-column__lock-info"
  }, [_vm._v("\n          " + _vm._s(_vm.$lang.messages.auth.need_auth) + "\n        ")]) : (!_vm.isAvailable) ? _c('div', {
    staticClass: "tv-column__lock-info"
  }, [_vm._v("\n          " + _vm._s(_vm.$lang.messages.messages.unavailable_channel) + "\n        ")]) : (_vm.isAdultLocked) ? _c('div', {
    staticClass: "tv-column__lock-info"
  }, [_vm._v("\n          " + _vm._s(_vm.$lang.messages.messages.adult_locked) + "\n        ")]) : _vm._e()]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "tv-column__preview",
    class: {
      'tv-column__preview_holey': _vm.isPlayable
    }
  }, [_c('img', {
    staticClass: "tv-column__preview-fullscreen",
    attrs: {
      "src": __webpack_require__(766),
      "alt": "",
      "title": "На весь экран"
    },
    on: {
      "click": function($event) {
        _vm.fullScreen()
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "tv-column__preview-title"
  }, [_vm._v("\n        " + _vm._s(_vm.title) + "\n      ")]), _vm._v(" "), _c('div', {
    staticClass: "tv-column__preview-description",
    domProps: {
      "innerHTML": _vm._s(_vm.description)
    }
  })])]], 2)
},staticRenderFns: []}

/***/ }),
/* 855 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "info",
    attrs: {
      "data-xy-group-horizontal": "",
      "data-xy-open-left": ""
    }
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "info__video-group",
    attrs: {
      "scrollable-y": "",
      "data-xy-group": "",
      "data-xy-open-left": ""
    }
  }, _vm._l((_vm.featured[0].items), function(item) {
    return _c('div', {
      key: item.id,
      staticClass: "b-videos__list-item"
    }, [_c('e-video', {
      attrs: {
        "type": item.type,
        "id": item.id,
        "mode": 'horizontal'
      }
    })], 1)
  }))])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "info__actor"
  }, [_c('div', {
    staticClass: "info__actor-image"
  }), _vm._v(" "), _c('div', {
    staticClass: "info__actor-name"
  }, [_vm._v("Стив Джобс")])])
}]}

/***/ }),
/* 856 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "p-video",
    on: {
      "click": _vm.hideFilter
    }
  }, [_c('h1', {
    staticClass: "section-title"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), (_vm.showPlaceholder) ? _c('w-placeholder') : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "p-video__inner"
  }, [_c('div', {
    staticClass: "p-video__list"
  }, _vm._l((_vm.items), function(item) {
    return _c('e-video', {
      key: item.id,
      staticClass: "p-video__list-item",
      attrs: {
        "type": item.type,
        "id": item.id,
        "mode": 'horizontal'
      }
    })
  })), _vm._v(" "), (_vm.connected && _vm.showLoadMoreButton) ? _c('div', {
    staticClass: "p-video__btn-load-more",
    on: {
      "click": function($event) {
        _vm.loadVideo()
      }
    }
  }, [_vm._v("\n      " + _vm._s(_vm.$lang.messages.buttons.load_more) + "\n    ")]) : _vm._e()])], 1)
},staticRenderFns: []}

/***/ }),
/* 857 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "p-settings-location",
    attrs: {
      "data-xy-group-vertical": "",
      "data-xy-open-left": ""
    }
  }, [_c('div', {
    staticClass: "button-group",
    attrs: {
      "data-xy-group-horizontal": "",
      "data-xy-open-left": ""
    }
  }, [_c('div', {
    staticClass: "button",
    class: [_vm.curLang === 'ru' ? 'button_active' : null],
    attrs: {
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.changeLocalization('ru')
      }
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(767),
      "alt": "ru"
    }
  }), _vm._v("\n      Русский\n    ")]), _vm._v(" "), _c('div', {
    staticClass: "button",
    class: [_vm.curLang === 'en' ? 'button_active' : null],
    attrs: {
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.changeLocalization('en')
      }
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(764),
      "alt": "en"
    }
  }), _vm._v("\n      English\n    ")])])])
},staticRenderFns: []}

/***/ }),
/* 858 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.products) ? _c('div', {
    class: _vm.b()
  }, [(_vm.paySystems.length === 0) ? _c('div', {
    class: _vm.b('info')
  }, [_vm._v("\n     " + _vm._s(_vm.$lang.messages.account.pay_info)), _c('br'), _vm._v("persik.by/info/tariffs\n  ")]) : [_c('div', {
    class: _vm.b('block')
  }, [_c('h3', {
    class: _vm.b('block-header')
  }, [_vm._v(_vm._s(_vm.$lang.messages.account.select_package))]), _vm._v(" "), _c('div', {
    class: _vm.b('block-package')
  }, _vm._l((_vm.products), function(product) {
    return _c('div', {
      key: product.product_id,
      class: _vm.b('block-package-item', {
        active: product.product_id === _vm.selectedProductId
      }),
      attrs: {
        "scroll-margin": "0 15 0 0",
        "scroll-threshold": "0 15 0 0"
      },
      on: {
        "click": function($event) {
          _vm.showOptions(product.product_id)
        }
      }
    }, [_vm._v("\n          " + _vm._s(product.name) + "\n          "), _c('div', {
      class: _vm.b('block-package-item-add')
    }, [_c('i', {
      staticClass: "fa fa-plus"
    })])])
  }))]), _vm._v(" "), (_vm.productOptions) ? _c('div', {
    class: _vm.b('block')
  }, [_c('h3', {
    class: _vm.b('block-header')
  }, [_vm._v(" " + _vm._s(_vm.$lang.messages.account.select_option))]), _vm._v(" "), _c('div', {
    class: _vm.b('block-tariffs')
  }, _vm._l((_vm.productOptions), function(productOption) {
    return _c('div', {
      key: productOption.product_option_id,
      ref: "options",
      refInFor: true,
      class: _vm.b('block-tariffs-option', {
        active: productOption.product_option_id === _vm.selectedProductOptionId
      }),
      attrs: {
        "scroll-margin": "0 0 0 20",
        "scroll-threshold": "0 0 0 10"
      },
      on: {
        "click": function($event) {
          _vm.showPayWays(productOption.product_option_id)
        }
      }
    }, [_vm._v("\n          " + _vm._s(productOption.name) + " – " + _vm._s(productOption.price_formatted) + "\n          "), _c('i', {
      class: _vm.b('block-tariffs-option-add', 'fa fa-plus')
    })])
  }))]) : _vm._e(), _vm._v(" "), (_vm.selectedProductOptionId) ? _c('div', {
    class: _vm.b('block')
  }, [_c('h3', {
    class: _vm.b('block-header', {
      paysys: true
    })
  }, [_vm._v(_vm._s(_vm.$lang.messages.account.select_pay_sys))]), _vm._v(" "), _c('div', {
    class: _vm.b('block-paysys')
  }, _vm._l((_vm.paySystems), function(paySystem) {
    return _c('div', {
      key: paySystem,
      ref: "pay_sys",
      refInFor: true,
      class: _vm.b('block-paysys-item'),
      on: {
        "click": function($event) {
          _vm.createPayment(paySystem)
        }
      }
    }, [_vm._v("\n          " + _vm._s(_vm.$lang.messages.account.pay_sys[paySystem]) + "\n        ")])
  }))]) : _vm._e()]], 2) : _vm._e()
},staticRenderFns: []}

/***/ }),
/* 859 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [(_vm.visible) ? _c('div', {
    staticClass: "volume"
  }, [_c('img', {
    staticClass: "volume__picture",
    attrs: {
      "src": __webpack_require__(771)
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "volume__text"
  }, [_vm._v(_vm._s(_vm.volume))]), _vm._v(" "), _c('div', {
    staticClass: "volume__scale"
  }, [_c('div', {
    staticClass: "volume__scale-level",
    style: ({
      height: _vm.volume + '%'
    })
  })])]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 860 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w-memory-usage",
    style: ({
      backgroundColor: _vm.backgroundColor
    })
  }, [_vm._v("Mem: " + _vm._s(_vm._f("humanizeSize")(_vm.used)) + " | " + _vm._s(_vm._f("humanizeSize")(_vm.total)) + " | " + _vm._s(_vm._f("humanizeSize")(_vm.limit)) + " |")])
},staticRenderFns: []}

/***/ }),
/* 861 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "p-favorites"
  }, [(_vm.showPlaceholder) ? _c('w-placeholder') : _c('div', {
    staticClass: "p-favorites__block"
  }, [(!_vm.hasContent) ? _c('div', {
    staticClass: "p-favorites__block-nocontent"
  }, [_c('span', {
    staticClass: "p-favorites__block-nocontent-title"
  }, [_vm._v(_vm._s(_vm.$lang.messages.favorite.no_favorites))]), _vm._v(" "), _c('w-button', {
    staticClass: "p-favorites__block-nocontent-button",
    attrs: {
      "caption": _vm.$lang.messages.buttons.to_main
    },
    on: {
      "click": function($event) {
        _vm.goMain()
      }
    }
  })], 1) : _vm._e(), _vm._v(" "), (_vm.channels.length) ? _c('b-channels', {
    staticClass: "p-favorites__channels",
    attrs: {
      "title": _vm.$lang.messages.favorite.channels,
      "channels": _vm.channels,
      "isStub": false,
      "isHaveRedirect": false
    }
  }) : _vm._e(), _vm._v(" "), (_vm.tvshows.length) ? _c('b-videos', {
    staticClass: "p-favorites__videos",
    attrs: {
      "isStub": false,
      "title": _vm.$lang.messages.favorite.shows,
      "items": _vm.tvshows,
      "mode": "'horizontal'",
      "isHaveRedirect": false
    }
  }) : _vm._e(), _vm._v(" "), (_vm.videos.length) ? _c('b-videos', {
    staticClass: "p-favorites__videos",
    attrs: {
      "isStub": false,
      "title": _vm.$lang.messages.favorite.videos,
      "items": _vm.videos,
      "mode": "'vertical'",
      "isHaveRedirect": false
    }
  }) : _vm._e()], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 862 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: _vm.b()
  }, [_c('div', {
    class: _vm.b('user-info')
  }, [_vm._v(_vm._s(_vm.$lang.messages.account.you_login) + ": " + _vm._s(_vm.userInfo.email))]), _vm._v(" "), _c('w-button', {
    attrs: {
      "caption": _vm.$lang.messages.account.logout
    },
    on: {
      "click": _vm.toggleModal
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isShowConfirmModal),
      expression: "isShowConfirmModal"
    }],
    staticClass: "confirm-modal"
  }, [_c('div', {
    staticClass: "confirm-modal__content"
  }, [_c('span', {
    staticClass: "confirm-modal__content-text"
  }, [_vm._v("Вы уверены, что хотите выйти из аккаунта?")]), _vm._v(" "), _c('div', {
    staticClass: "confirm-modal__content-buttons"
  }, [_c('div', {
    staticClass: "confirm-modal__content-buttons-item",
    on: {
      "click": _vm.logout
    }
  }, [_vm._v("Выйти")]), _vm._v(" "), _c('div', {
    staticClass: "confirm-modal__content-buttons-item",
    on: {
      "click": _vm.toggleModal
    }
  }, [_vm._v("Отмена")])])])])], 1)
},staticRenderFns: []}

/***/ }),
/* 863 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spring-spinner",
    style: (_vm.spinnerStyle)
  }, [_c('div', {
    staticClass: "spring-spinner-part top",
    style: (_vm.spinnerPartStyle)
  }, [_c('div', {
    staticClass: "spring-spinner-rotator",
    style: (_vm.rotatorStyle)
  })]), _vm._v(" "), _c('div', {
    staticClass: "spring-spinner-part bottom",
    style: (_vm.spinnerPartStyle)
  }, [_c('div', {
    staticClass: "spring-spinner-rotator",
    style: (_vm.rotatorStyle)
  })])])
},staticRenderFns: []}

/***/ }),
/* 864 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "intersecting-circles-spinner",
    style: (_vm.spinnerStyle)
  }, [_c('div', {
    staticClass: "spinnerBlock",
    style: (_vm.spinnerBlockStyle)
  }, _vm._l((_vm.circleStyles), function(cs, index) {
    return _c('span', {
      key: index,
      staticClass: "circle",
      style: (cs)
    })
  }))])
},staticRenderFns: []}

/***/ }),
/* 865 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "circles-to-rhombuses-spinner",
    style: (_vm.spinnertStyle)
  }, _vm._l((_vm.circlesStyles), function(cs, index) {
    return _c('div', {
      key: index,
      staticClass: "circle",
      style: (cs)
    })
  }))
},staticRenderFns: []}

/***/ }),
/* 866 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "pixel-spinner",
    style: (_vm.spinnerStyle)
  }, [_c('div', {
    staticClass: "pixel-spinner-inner",
    style: (_vm.spinnerInnerStyle)
  })])
},staticRenderFns: []}

/***/ }),
/* 867 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "e-channel",
    class: {
      'e-channel_sleep': _vm.sleep
    },
    attrs: {
      "content-id": _vm.id,
      "content-type": "channel",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.openChannel()
      },
      "focus": _vm.focusHandler
    }
  }, [(!_vm.sleep) ? [(!_vm.sleep) ? _c('div', {
    staticClass: "e-channel__frame",
    style: ({
      backgroundImage: 'url(' + _vm.resize(_vm.logo, 144, 72) + ')'
    })
  }, [_c('div', {
    staticClass: "e-channel__frame-picture",
    style: ({
      backgroundImage: 'url(' + _vm.frameUrl + ')'
    })
  }), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "e-channel__bookmark",
    class: {
      'e-channel__bookmark_favorite': _vm.isFavorite
    },
    attrs: {
      "title": _vm.isFavorite ? 'Удалить канал из избранного' : 'Добавить канал в избранное'
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        return _vm.toggleFavorite($event)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-bookmark"
  })]), _vm._v(" "), (!_vm.sleep) ? _c('w-progress-bar-line', {
    attrs: {
      "passed": _vm.progress
    }
  }) : _vm._e()], 1) : _vm._e(), _vm._v(" "), (!_vm.sleep) ? _c('span', {
    staticClass: "e-channel__item_name"
  }, [_vm._v(_vm._s(_vm.channelName))]) : _vm._e(), _vm._v(" "), (!_vm.sleep) ? _c('span', {
    staticClass: "e-channel__item_title"
  }, [_vm._v(_vm._s(_vm.tvshowTitle))]) : _vm._e()] : _vm._e()], 2)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "e-channel__frame-play-button"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(166)
    }
  })])
}]}

/***/ }),
/* 868 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "player-live"
  }, [_c('w-volume', {
    attrs: {
      "visible": _vm.isVolumeBarVisible
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "wrapper",
    on: {
      "wheel": _vm.volumeChangeHandler,
      "mousemove": _vm.showAllBarsWithAutohide
    }
  }), _vm._v(" "), (_vm.throbberVisible) ? _c('div', {
    staticClass: "player-live__throbber"
  }, [_c('looping-rhombuses-spinner', {
    attrs: {
      "animation-duration": 2500,
      "rhombus-size": 15
    }
  })], 1) : _vm._e(), _vm._v(" "), (_vm.isNeedCheckPin) ? _c('div', {
    staticClass: "player-live__adult"
  }, [_c('span', {
    staticClass: "player-live__adult-title"
  }, [_vm._v("Для просмотра канала введите ПИН родительского контроля")]), _vm._v(" "), _c('input', {
    ref: "pinField",
    staticClass: "player-live__adult-input",
    attrs: {
      "type": "text",
      "maxlength": "4"
    },
    on: {
      "keypress": _vm.keypressInputEvent
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.errorPinMessage),
      expression: "errorPinMessage"
    }],
    staticClass: "player-live__adult-error"
  }, [_vm._v(_vm._s(_vm.errorPinMessage))]), _vm._v(" "), _c('div', {
    staticClass: "player-live__adult-buttons"
  }, [_c('div', {
    staticClass: "player-live__adult-buttons-item",
    on: {
      "click": function($event) {
        _vm.checkPin(_vm.$refs.pinField.value)
      }
    }
  }, [_vm._v("OК")]), _vm._v(" "), _c('div', {
    staticClass: "player-live__adult-buttons-item",
    on: {
      "click": _vm.closeParentControlDialog
    }
  }, [_vm._v("Отмена")])])]) : _vm._e(), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade-nav"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showNav),
      expression: "showNav"
    }],
    staticClass: "nav",
    on: {
      "mouseenter": _vm.showAllBars,
      "mousemove": _vm.showAllBars
    }
  }, [_c('div', {
    staticClass: "nav__button nav__button_back",
    on: {
      "click": _vm.goBack
    }
  }, [_vm._v("Назад")]), _vm._v(" "), (_vm.isFullscreenSupport) ? _c('div', {
    staticClass: "nav__button nav__button_fullscreen",
    on: {
      "click": _vm.toggleFullscreen
    }
  }) : _vm._e()])]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade-pause"
    }
  }, [(_vm.paused) ? _c('div', {
    staticClass: "player-live__pause",
    on: {
      "click": function($event) {
        _vm.togglePause()
      }
    }
  }, [_c('i', {
    staticClass: "far fa-pause-circle"
  })]) : _vm._e()]), _vm._v(" "), (!_vm.isPlayable) ? _c('div', {
    staticClass: "player-live__guard"
  }, [_c('div', {
    staticClass: "player-live__guard-group"
  }, [_c('i', {
    staticClass: "player-live__guard-group-icon fa fa-lock"
  }), _vm._v(" "), (!_vm.authorized) ? _c('p', {
    staticClass: "player-live__guard-group-title"
  }, [_vm._v("\n        " + _vm._s(_vm.$lang.messages.auth.need_auth) + "\n      ")]) : (!_vm.isAvailable) ? _c('p', {
    staticClass: "player-live__guard-group-title"
  }, [_vm._v("\n        " + _vm._s(_vm.$lang.messages.messages.unavailable_channel_named) + "\n      ")]) : (_vm.isAdultLocked) ? _c('p', {
    staticClass: "player-live__guard-group-title"
  }, [_vm._v("\n        " + _vm._s(_vm.$lang.messages.messages.adult_locked_named) + "\n      ")]) : _vm._e()])]) : _vm._e(), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade-tvguide"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showTvGuide),
      expression: "showTvGuide"
    }],
    staticClass: "player-live__channels",
    on: {
      "mouseenter": _vm.showAllBars,
      "mousemove": _vm.showAllBars
    }
  }, [_c('div', {
    ref: "channels",
    staticClass: "player-live__channels-col"
  }, _vm._l((_vm.channels), function(id, index) {
    return _c('div', {
      key: index,
      staticClass: "player-live__channel",
      class: {
        'player-live__channel_active': id === _vm.playableChannelId
      },
      on: {
        "click": function($event) {
          _vm.changeChannel(id)
        }
      }
    }, [_c('div', {
      staticClass: "player-live__channel-num"
    }, [_vm._v(_vm._s(index + 1))]), _vm._v(" "), (_vm.channelsLogos) ? _c('div', {
      staticClass: "player-live__channel-logo",
      style: ({
        backgroundImage: 'url(' + _vm.resize(_vm.channelsLogos[index], 144, 72) + ')'
      })
    }) : _vm._e()])
  }))])]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade-tvtape"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showTvTape),
      expression: "showTvTape"
    }],
    staticClass: "player-live__guide",
    on: {
      "mouseenter": _vm.showAllBars,
      "mousemove": _vm.showAllBars
    }
  }, [_c('span', {
    staticClass: "player-live__guide-arrow",
    on: {
      "click": _vm.gotoPrevTvshow
    }
  }, [_vm._v("<")]), _vm._v(" "), _c('div', {
    staticClass: "player-live__guide-row"
  }, [_vm._l((_vm.tvshows.prev), function(tvshow, index) {
    return _c('b-guide-tvshow', {
      key: tvshow.tvshow_id,
      attrs: {
        "tvshow": tvshow,
        "time": _vm.time,
        "index": index - _vm.tvshows.prev.length,
        "isArchive": _vm.isArchive(tvshow),
        "translateX": _vm.translateX
      }
    })
  }), _vm._v(" "), _c('b-guide-tvshow', {
    attrs: {
      "tvshow": _vm.tvshows.current,
      "time": _vm.time,
      "selected": true,
      "index": 0,
      "isArchive": _vm.isArchive(_vm.tvshows.current),
      "translateX": _vm.translateX
    }
  }), _vm._v(" "), _vm._l((_vm.tvshows.next), function(tvshow, index) {
    return _c('b-guide-tvshow', {
      key: tvshow.tvshow_id,
      attrs: {
        "tvshow": tvshow,
        "time": _vm.time,
        "index": index + 1,
        "isArchive": _vm.isArchive(tvshow),
        "translateX": _vm.translateX
      }
    })
  })], 2), _vm._v(" "), _c('span', {
    staticClass: "player-live__guide-arrow",
    on: {
      "click": _vm.gotoNextTvshow
    }
  }, [_vm._v(">")])])]), _vm._v(" "), (_vm.showTracker) ? _c('div', {
    staticClass: "player-live__tracker"
  }, [_c('div', {
    staticClass: "trackline"
  }, [_c('div', {
    staticClass: "trackline__inside trackline__inside_buffer",
    style: ({
      width: 100 * _vm.buffered + '%'
    })
  }), _vm._v(" "), _c('div', {
    staticClass: "trackline__inside trackline__inside_current",
    style: ({
      width: 100 * _vm.current + '%'
    })
  })])]) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 869 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w-settings-item",
    attrs: {
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "focus": function($event) {
        _vm.$emit('focus')
      },
      "click": function($event) {
        _vm.$emit('click')
      }
    }
  }, [_c('span', {
    staticClass: "w-settings-item__label"
  }, [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('span', {
    staticClass: "w-settings-item__control"
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}

/***/ }),
/* 870 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('w-info-block', {
    attrs: {
      "notif": _vm.notifications,
      "data-xy-group": ""
    }
  }), _vm._v(" "), _vm._l((_vm.modals), function(modal, index) {
    return _c('w-modal', {
      key: modal.id,
      class: [index !== _vm.modals.length - 1 ? 'invisible' : 'visible'],
      attrs: {
        "modal": modal,
        "data-xy-group": ""
      }
    })
  })], 2)
},staticRenderFns: []}

/***/ }),
/* 871 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "trinity-rings-spinner",
    style: (_vm.spinnerStyle)
  }, [_c('div', {
    staticClass: "circle circle1",
    style: (_vm.ring1Style)
  }), _vm._v(" "), _c('div', {
    staticClass: "circle circle2",
    style: (_vm.ring2Style)
  }), _vm._v(" "), _c('div', {
    staticClass: "circle circle3",
    style: (_vm.ring3Style)
  })])
},staticRenderFns: []}

/***/ }),
/* 872 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [(_vm.$backend.settings.getDeveloperMode()) ? _c('div', {
    staticClass: "dev-menu"
  }, [(_vm.$backend.code.includes('b2b')) ? _c('span', [_vm._v("\n      B2B: "), _c('a', {
    attrs: {
      "href": "#"
    },
    on: {
      "click": function($event) {
        _vm.switchToNet(0)
      }
    }
  }, [_vm._v("More TV")]), _vm._v(" "), _c('a', {
    attrs: {
      "href": "#"
    },
    on: {
      "click": function($event) {
        _vm.switchToNet(1)
      }
    }
  }, [_vm._v("WikiLink")]), _vm._v(" "), _c('a', {
    attrs: {
      "href": "#"
    },
    on: {
      "click": function($event) {
        _vm.switchToNet(2)
      }
    }
  }, [_vm._v("Velcom")]), _vm._v("|\n    ")]) : _vm._e(), _vm._v(" "), _c('w-memory-usage', {
    staticStyle: {
      "display": "inline-block"
    }
  }), _vm._v(" |\n    "), _c('w-crazy-monkey'), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/player-test",
      "tag": "button"
    }
  }, [_c('i', {
    staticClass: "fa fa-play"
  })]), _vm._v(" "), _c('button', {
    on: {
      "click": _vm.requestFullscreen
    }
  }, [_c('i', {
    staticClass: "fa fa-expand"
  })])], 1) : _vm._e(), _vm._v(" "), _c('div', {
    ref: "content",
    staticClass: "app-content",
    on: {
      "scroll": _vm.scrollHandler
    }
  }, [_c('w-connection-status'), _vm._v(" "), _c('w-notifications'), _vm._v(" "), (_vm.progressModal != null) ? _c('w-modal', {
    attrs: {
      "modal": _vm.progressModal
    }
  }) : _vm._e(), _vm._v(" "), _c('keep-alive', {
    attrs: {
      "include": "main"
    }
  }, [(_vm.ready) ? _c('router-view') : _vm._e()], 1), _vm._v(" "), _c('w-prompts'), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade-arrowup"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isShowUpArrow),
      expression: "isShowUpArrow"
    }],
    staticClass: "up-arrow",
    on: {
      "click": _vm.scrollToTop
    }
  }, [_c('i', {
    staticClass: "fa fa-chevron-up"
  })])]), _vm._v(" "), (_vm.isExitNeeded) ? _c('w-exit-modal', {
    attrs: {
      "closeExitModal": _vm.closeExitModal
    }
  }) : _vm._e()], 1)])
},staticRenderFns: []}

/***/ }),
/* 873 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "radar-spinner",
    style: (_vm.spinnerStyle)
  }, _vm._l((_vm.circlesStyles), function(cs, index) {
    return _c('div', {
      key: index,
      staticClass: "circle",
      style: (cs)
    }, [_c('div', {
      staticClass: "circle-inner-container",
      style: (_vm.circleInnerContainerStyle)
    }, [_c('div', {
      staticClass: "circle-inner",
      style: (_vm.circleInnerStyle)
    })])])
  }))
},staticRenderFns: []}

/***/ }),
/* 874 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "notify",
    class: [_vm.index === 0 ? 'notify_active' : '']
  }, [_c('div', {
    staticClass: "notify__message"
  }, [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.notify.message)
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "notify__buttons"
  }, [_c('button', {
    staticClass: "notify__buttons-button",
    class: [_vm.activeButtonId === 0 ? 'notify__buttons-button_hover' : ''],
    on: {
      "click": function($event) {
        _vm.deleteMessage(_vm.notify.id)
      }
    }
  }, [_vm._v("Закрыть")]), _c('br'), _vm._v(" "), (_vm.hasExtraButtons) ? _c('button', {
    staticClass: "notify__buttons-button",
    class: [_vm.activeButtonId === 1 ? 'notify__buttons-button_hover' : ''],
    on: {
      "click": function($event) {
        _vm.doAction()
      }
    }
  }, [_vm._v(_vm._s(_vm.notify.btName))]) : _vm._e()])])
},staticRenderFns: []}

/***/ }),
/* 875 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "half-circle-spinner",
    style: (_vm.spinnerStyle)
  }, [_c('div', {
    staticClass: "circle circle-1",
    style: (_vm.circle1Style)
  }), _vm._v(" "), _c('div', {
    staticClass: "circle circle-2",
    style: (_vm.circle2Style)
  })])
},staticRenderFns: []}

/***/ }),
/* 876 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "p-video",
    on: {
      "click": _vm.hideFilter
    }
  }, [_c('h1', {
    staticClass: "section-title"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), (_vm.showPlaceholder) ? _c('w-placeholder') : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "p-video__inner"
  }, [_c('div', {
    staticClass: "p-video__list"
  }, _vm._l((_vm.items), function(item) {
    return _c('e-video', {
      key: item.id,
      staticClass: "p-video__list-item",
      attrs: {
        "type": item.type,
        "id": item.id,
        "mode": 'vertical'
      }
    })
  })), _vm._v(" "), (_vm.connected && _vm.showLoadMoreButton) ? _c('div', {
    staticClass: "p-video__btn-load-more",
    on: {
      "click": function($event) {
        _vm.loadVideo()
      }
    }
  }, [_vm._v("\n      " + _vm._s(_vm.$lang.messages.buttons.load_more) + "\n    ")]) : _vm._e()])], 1)
},staticRenderFns: []}

/***/ }),
/* 877 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "notifications"
  }, _vm._l((_vm.notif.slice().reverse()), function(notify, index) {
    return (_vm.notif !== null) ? _c('div', {
      key: index,
      staticClass: "notifications__item"
    }, [_c('w-info-message', {
      attrs: {
        "notify": notify,
        "active": _vm.notif[_vm.notif.length - 1].id,
        "index": index
      }
    })], 1) : _vm._e()
  }))
},staticRenderFns: []}

/***/ }),
/* 878 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "breeding-rhombus-spinner",
    style: (_vm.spinnerStyle)
  }, [_vm._l((_vm.rhombusesStyles), function(rs, index) {
    return _c('div', {
      key: index,
      staticClass: "rhombus",
      class: ("child-" + (index + 1)),
      style: (rs)
    })
  }), _vm._v(" "), _c('div', {
    staticClass: "rhombus big",
    style: (_vm.bigRhombusStyle)
  })], 2)
},staticRenderFns: []}

/***/ }),
/* 879 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.modal.contentType === 'progress') ? _c('div', {
    staticClass: "modal-progress"
  }, [_c('div', {
    staticClass: "modal-progress__wrapper"
  }, [_c('img', {
    staticClass: "modal-progress__wrapper-logo",
    attrs: {
      "src": _vm.$backend.logo
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "modal-progress__wrapper-progress-bar"
  }, [_c('div', {
    staticClass: "modal-progress__wrapper-progress-bar-line",
    style: ({
      width: _vm.modal.progress + '%'
    })
  })]), _vm._v(" "), _c('div', {
    staticClass: "modal-progress__wrapper-progress-status"
  }, [_vm._v(_vm._s(_vm.modal.progress) + "%")])])]) : _vm._e(), _vm._v(" "), (_vm.modal.contentType === 'simple') ? _c('div', {
    staticClass: "modal-simple"
  }, [_c('div', {
    staticClass: "modal-simple__info"
  }, [_c('div', {
    staticClass: "modal-simple__info-text"
  }, [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.modal.message)
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "modal-simple__info-button",
    on: {
      "click": _vm.closeModal
    }
  }, [_vm._v("OK")])])]) : _vm._e(), _vm._v(" "), (_vm.modal.contentType === 'sample' || _vm.modal.contentType === 'channel' || _vm.modal.contentType === 'tvshow' || _vm.modal.contentType === 'video') ? _c('div', {
    staticClass: "modal-simple"
  }, [_c('div', {
    staticClass: "modal-simple__group"
  }, _vm._l((_vm.contextMenu), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "modal-simple__group-button",
      class: {
        'modal-simple__group-button_hover': _vm.activeButtonIndex === index
      },
      on: {
        "click": item.action
      }
    }, [_vm._v(_vm._s(item.name))])
  }))]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 880 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "semipolar-spinner",
    style: (_vm.spinnerStyle)
  }, _vm._l((_vm.ringsStyles), function(rs, index) {
    return _c('div', {
      key: index,
      staticClass: "ring",
      style: (rs)
    })
  }))
},staticRenderFns: []}

/***/ }),
/* 881 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "p-live",
    on: {
      "click": _vm.hideFilter
    }
  }, [_c('h1', {
    staticClass: "section-title"
  }, [_vm._v(_vm._s(_vm.pageTitle))]), _vm._v(" "), (_vm.showPlaceholder) ? _c('w-placeholder') : _c('div', {
    staticClass: "p-live__channels"
  }, _vm._l((_vm.channels), function(id) {
    return _c('e-live-channel', {
      key: id,
      attrs: {
        "id": id,
        "time": _vm.time
      }
    })
  }))], 1)
},staticRenderFns: []}

/***/ }),
/* 882 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "p-video",
    on: {
      "click": _vm.hideFilter
    }
  }, [_c('h1', {
    staticClass: "section-title"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), (_vm.showPlaceholder) ? _c('w-placeholder') : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "p-video__inner"
  }, [_c('div', {
    staticClass: "p-video__list"
  }, _vm._l((_vm.items), function(item) {
    return _c('e-video', {
      key: item.id,
      staticClass: "p-video__list-item",
      attrs: {
        "type": item.type,
        "id": item.id,
        "mode": 'vertical'
      }
    })
  })), _vm._v(" "), (_vm.connected && _vm.showLoadMoreButton) ? _c('div', {
    staticClass: "p-video__btn-load-more",
    on: {
      "click": function($event) {
        _vm.loadVideo()
      }
    }
  }, [_vm._v("\n      " + _vm._s(_vm.$lang.messages.buttons.load_more) + "\n    ")]) : _vm._e()])], 1)
},staticRenderFns: []}

/***/ }),
/* 883 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "p-speed-test",
    attrs: {
      "data-xy-group-vertical": "",
      "data-xy-open-left": ""
    }
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "button-group",
    attrs: {
      "data-xy-group-vertical": ""
    }
  }, [_c('div', {
    staticClass: "button-group__ceil"
  }, [(!_vm.sendWay.by && !_vm.isSendData) ? _c('div', {
    staticClass: "button-group__ceil-button",
    attrs: {
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.startTest('by')
      }
    }
  }, [_vm._v("Тест для РБ")]) : _vm._e(), _vm._v(" "), (_vm.isSendData && !_vm.sendWay.by) ? _c('div', {
    staticClass: "button-group__ceil-button",
    attrs: {
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": _vm.showAlert
    }
  }, [_vm._v("Тест для РБ")]) : _vm._e(), _vm._v(" "), (_vm.sendWay.by) ? _c('div', {
    staticClass: "button-group__ceil-button button-group__ceil-button_active",
    attrs: {
      "data-xy-focusable": "",
      "tabindex": "-1"
    }
  }, [_vm._v("В процессе")]) : _vm._e(), _vm._v(" "), (_vm.speed.by) ? _c('div', {
    staticClass: "button-group__ceil-info"
  }, [_c('span', [_vm._v(_vm._s(_vm.speed.by) + " Мбит/сек")]), _vm._v(" "), (_vm.speed.by >= 10) ? _c('img', {
    attrs: {
      "src": __webpack_require__(164),
      "alt": ""
    }
  }) : _vm._e(), _vm._v(" "), (_vm.speed.by < 10 && _vm.speed.by >= 5) ? _c('img', {
    attrs: {
      "src": __webpack_require__(165),
      "alt": ""
    }
  }) : _vm._e(), _vm._v(" "), (_vm.speed.by < 5) ? _c('img', {
    attrs: {
      "src": __webpack_require__(163),
      "alt": ""
    }
  }) : _vm._e()]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "button-group__ceil"
  }, [(!_vm.sendWay.other && !_vm.isSendData) ? _c('div', {
    staticClass: "button-group__ceil-button",
    attrs: {
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.startTest('other')
      }
    }
  }, [_vm._v("Тест для других регионов (кроме РБ)")]) : _vm._e(), _vm._v(" "), (_vm.isSendData && !_vm.sendWay.other) ? _c('div', {
    staticClass: "button-group__ceil-button",
    attrs: {
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": _vm.showAlert
    }
  }, [_vm._v("Тест для других регионов (кроме РБ)")]) : _vm._e(), _vm._v(" "), (_vm.sendWay.other) ? _c('div', {
    staticClass: "button-group__ceil-button button-group__ceil-button_active",
    attrs: {
      "data-xy-focusable": "",
      "tabindex": "-1"
    }
  }, [_vm._v("В процессе")]) : _vm._e(), _vm._v(" "), (_vm.speed.other) ? _c('div', {
    staticClass: "button-group__ceil-info"
  }, [_c('span', [_vm._v(_vm._s(_vm.speed.other) + " Мбит/сек")]), _vm._v(" "), (_vm.speed.other >= 10) ? _c('img', {
    attrs: {
      "src": __webpack_require__(164),
      "alt": ""
    }
  }) : _vm._e(), _vm._v(" "), (_vm.speed.other < 10 && _vm.speed.other >= 5) ? _c('img', {
    attrs: {
      "src": __webpack_require__(165),
      "alt": ""
    }
  }) : _vm._e(), _vm._v(" "), (_vm.speed.other < 5) ? _c('img', {
    attrs: {
      "src": __webpack_require__(163),
      "alt": ""
    }
  }) : _vm._e()]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "button-group__ceil"
  }, [(!_vm.sendWay.internet && !_vm.isSendData) ? _c('div', {
    staticClass: "button-group__ceil-button",
    attrs: {
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.startTest('internet')
      }
    }
  }, [_vm._v("Тест сети Интернет")]) : _vm._e(), _vm._v(" "), (_vm.isSendData && !_vm.sendWay.internet) ? _c('div', {
    staticClass: "button-group__ceil-button",
    attrs: {
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": _vm.showAlert
    }
  }, [_vm._v("Тест сети Интернет")]) : _vm._e(), _vm._v(" "), (_vm.sendWay.internet) ? _c('div', {
    staticClass: "button-group__ceil-button button-group__ceil-button_active",
    attrs: {
      "data-xy-focusable": "",
      "tabindex": "-1"
    }
  }, [_vm._v("В процессе")]) : _vm._e(), _vm._v(" "), (_vm.speed.internet) ? _c('div', {
    staticClass: "button-group__ceil-info"
  }, [_c('span', [_vm._v(_vm._s(_vm.speed.internet) + " Мбит/сек")]), _vm._v(" "), (_vm.speed.internet >= 10) ? _c('img', {
    attrs: {
      "src": __webpack_require__(164),
      "alt": ""
    }
  }) : _vm._e(), _vm._v(" "), (_vm.speed.internet < 10 && _vm.speed.internet >= 5) ? _c('img', {
    attrs: {
      "src": __webpack_require__(165),
      "alt": ""
    }
  }) : _vm._e(), _vm._v(" "), (_vm.speed.internet < 5) ? _c('img', {
    attrs: {
      "src": __webpack_require__(163),
      "alt": ""
    }
  }) : _vm._e()]) : _vm._e()])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "group"
  }, [_c('img', {
    staticClass: "group__img",
    attrs: {
      "src": __webpack_require__(769),
      "alt": ""
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "load-area"
  }, [_c('div', {
    staticClass: "loading-line"
  }, [_c('div', {
    staticClass: "loading-line__dot"
  }), _vm._v(" "), _c('div', {
    staticClass: "loading-line__dot"
  }), _vm._v(" "), _c('div', {
    staticClass: "loading-line__dot"
  }), _vm._v(" "), _c('div', {
    staticClass: "loading-line__dot"
  }), _vm._v(" "), _c('div', {
    staticClass: "loading-line__dot"
  }), _vm._v(" "), _c('div', {
    staticClass: "loading-line__dot"
  })])]), _vm._v(" "), _c('img', {
    staticClass: "group__img",
    attrs: {
      "src": __webpack_require__(768),
      "alt": ""
    }
  })])
}]}

/***/ }),
/* 884 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "p-video",
    on: {
      "click": _vm.hideFilter
    }
  }, [_c('h1', {
    staticClass: "section-title"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), (_vm.showPlaceholder) ? _c('w-placeholder') : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "p-video__inner"
  }, [_c('div', {
    staticClass: "p-video__list"
  }, _vm._l((_vm.items), function(item) {
    return _c('e-video', {
      key: item.id,
      staticClass: "p-video__list-item",
      attrs: {
        "type": item.type,
        "id": item.id,
        "mode": 'vertical'
      }
    })
  })), _vm._v(" "), (_vm.connected && _vm.showLoadMoreButton) ? _c('div', {
    staticClass: "p-video__btn-load-more",
    on: {
      "click": function($event) {
        _vm.loadVideo()
      }
    }
  }, [_vm._v("\n      " + _vm._s(_vm.$lang.messages.buttons.load_more) + "\n    ")]) : _vm._e()])], 1)
},staticRenderFns: []}

/***/ }),
/* 885 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "main-tv-nav",
    on: {
      "click": _vm.hideFilters
    }
  }, [_c('h1', {
    staticClass: "section-title"
  }, [_vm._v(_vm._s(_vm.pageTitle))]), _vm._v(" "), (_vm.showPlaceholder) ? _c('w-placeholder') : _c('div', {
    staticClass: "main-tv-nav__channels"
  }, _vm._l((_vm.channels), function(id) {
    return _c('e-channel', {
      key: id,
      staticClass: "main-tv-nav__channels-item",
      attrs: {
        "id": id,
        "time": _vm.time
      }
    })
  }))], 1)
},staticRenderFns: []}

/***/ }),
/* 886 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "b-channels"
  }, [_c('div', {
    staticClass: "b-channels__title"
  }, [(_vm.isHaveRedirect) ? _c('h2', {
    staticClass: "b-channels__title-text b-channels__title-text_redirect",
    on: {
      "click": _vm.showAll
    }
  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm._v(" "), (!_vm.isHaveRedirect) ? _c('h2', {
    staticClass: "b-channels__title-text"
  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "b-channels__list"
  }, [_c('span', {
    staticClass: "b-channels__list-arrow",
    on: {
      "click": _vm.prev
    }
  }, [_vm._v("<")]), _vm._v(" "), _c('slick', {
    ref: "slick",
    staticClass: "b-channels__list-banner",
    attrs: {
      "options": _vm.slickOptions
    }
  }, [_vm._l((_vm.channels), function(id) {
    return _c('div', {
      key: id,
      staticClass: "b-channels__list-item"
    }, [_c('e-channel', {
      attrs: {
        "id": id,
        "time": _vm.time
      }
    })], 1)
  }), _vm._v(" "), (_vm.isStub) ? _c('div', {
    staticClass: "stub"
  }, [_c('span', {
    staticClass: "stub__link",
    on: {
      "click": _vm.showAll
    }
  }, [_vm._v("Посмотреть все")])]) : _vm._e()], 2), _vm._v(" "), _c('span', {
    staticClass: "b-channels__list-arrow b-channels__list-arrow_right",
    on: {
      "click": _vm.next
    }
  }, [_vm._v(">")])], 1)])
},staticRenderFns: []}

/***/ }),
/* 887 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "fingerprint-spinner",
    style: (_vm.spinnerStyle)
  }, _vm._l((_vm.ringsStyles), function(rs, index) {
    return _c('div', {
      key: index,
      staticClass: "spinner-ring",
      style: (rs)
    })
  }))
},staticRenderFns: []}

/***/ }),
/* 888 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "p-settings-video",
    attrs: {
      "data-xy-group-vertical": "",
      "data-xy-open-left": ""
    }
  }, [_c('w-settings-item', {
    attrs: {
      "label": _vm.$lang.messages.settings.use_hls
    },
    on: {
      "click": function($event) {
        _vm.toggleUseHls()
      }
    }
  }, [_c('w-form-checkbox', {
    attrs: {
      "checked": _vm.useHls
    }
  })], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 889 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "p-parent-control",
    attrs: {
      "data-xy-group-vertical": "",
      "data-xy-open-left": ""
    }
  }, [_c('w-settings-item', {
    attrs: {
      "label": (_vm.parentControl ? _vm.$lang.messages.settings.on : _vm.$lang.messages.settings.off) + ' ' + _vm.$lang.messages.settings.parent_ctrl
    },
    on: {
      "click": function($event) {
        _vm.toggleParentControl()
      }
    }
  }, [_c('w-form-checkbox', {
    attrs: {
      "checked": _vm.parentControl
    }
  })], 1), _vm._v(" "), (_vm.parentControl) ? _c('w-settings-item', {
    attrs: {
      "label": _vm.$lang.messages.settings.change_pin
    },
    on: {
      "click": _vm.changePin
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 890 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "placeholder",
    attrs: {
      "data-xy-focusable": "",
      "tabindex": "-1"
    }
  }, [_c('looping-rhombuses-spinner', {
    attrs: {
      "animation-duration": 2500,
      "rhombus-size": 15
    }
  })], 1)
},staticRenderFns: []}

/***/ }),
/* 891 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: _vm.b()
  }, [_c('table', {
    class: _vm.b('table')
  }, [_c('tr', {
    class: _vm.b('table-head')
  }, [_c('td', {
    class: _vm.b('table-head-col', {
      date: true
    })
  }, [_vm._v("\n        " + _vm._s(_vm.$lang.messages.account.date) + "\n      ")]), _vm._v(" "), _c('td', {
    class: _vm.b('table-head-col', {
      service: true
    })
  }, [_vm._v("\n        " + _vm._s(_vm.$lang.messages.account.service) + "\n      ")]), _vm._v(" "), _c('td', {
    class: _vm.b('table-head-col', {
      amount: true
    })
  }, [_vm._v("\n        " + _vm._s(_vm.$lang.messages.account.amount) + "\n      ")]), _vm._v(" "), _c('td', {
    class: _vm.b('table-head-col', {
      left: true
    })
  }, [_vm._v("\n        " + _vm._s(_vm.$lang.messages.account.days_left) + "\n      ")])]), _vm._v(" "), _vm._l((_vm.subscriptions), function(subscription, index) {
    return _c('tr', {
      key: index,
      class: _vm.b('table-row'),
      on: {
        "click": function($event) {
          _vm.$emit('purchase', subscription.product_id)
        }
      }
    }, [_c('td', {
      class: _vm.b('table-col')
    }, [_c('span', {
      class: _vm.b('table-col-date')
    }, [_vm._v(_vm._s(_vm._f("momentFormat")(subscription.created_at, 'DD.MM.YYYY')))])]), _vm._v(" "), _c('td', {
      class: _vm.b('table-col')
    }, [_c('span', {
      class: _vm.b('table-col-package')
    }, [_vm._v(_vm._s(_vm.$lang.messages.account.package) + " "), _c('b', [_vm._v("\"" + _vm._s(subscription.product_name) + "\"")])]), _c('br'), _vm._v("\n        " + _vm._s(subscription.product_option_name) + " (с " + _vm._s(_vm._f("momentFormat")(subscription.created_at, 'DD.MM.YYYY')) + " по " + _vm._s(_vm._f("momentFormat")(subscription.expired_at, 'DD.MM.YYYY')) + ")\n      ")]), _vm._v(" "), _c('td', {
      class: _vm.b('table-col')
    }, [_c('span', {
      class: _vm.b('table-col-cost')
    }, [_c('b', [_vm._v(_vm._s(subscription.cost))])]), _vm._v(" бел.руб\n      ")]), _vm._v(" "), _c('td', {
      class: _vm.b('table-col')
    }, [(_vm.getDayLeft(subscription.expired_at)) ? _c('span', {
      class: _vm.b('table-col-left')
    }, [_vm._v(_vm._s(_vm.getDayLeft(subscription.expired_at)))]) : _c('div', {
      class: _vm.b('table-col-buy')
    }, [_vm._v(_vm._s(_vm.$lang.messages.account.buy))])])])
  })], 2)])
},staticRenderFns: []}

/***/ }),
/* 892 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "test",
    attrs: {
      "data-xy-group": ""
    }
  }, [_c('div', {
    staticStyle: {
      "height": "100%",
      "overflow": "hidden"
    },
    attrs: {
      "scrollable-y": ""
    }
  }, [_c('div', {
    staticClass: "test__nav-block"
  }, [_c('p', [_vm._v("VoD:")]), _vm._v(" "), _c('w-button', {
    attrs: {
      "width": "15",
      "data-xy-focusable": "",
      "tabindex": "-1",
      "scroll-threshold": "0 10 0 0"
    },
    on: {
      "click": function($event) {
        _vm.playVod()
      }
    }
  }, [_vm._v("Play Video")]), _vm._v(" "), _c('w-button', {
    attrs: {
      "width": "15",
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.playVod('error')
      }
    }
  }, [_vm._v("Server not work")])], 1), _vm._v(" "), _c('div', {
    staticClass: "test__nav-block"
  }, [_c('p', [_vm._v("Live:")]), _vm._v(" "), _c('w-button', {
    attrs: {
      "width": "15",
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.playLive()
      }
    }
  }, [_vm._v("Обычный поток")]), _vm._v(" "), _c('w-button', {
    attrs: {
      "width": "15",
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.playLive('error')
      }
    }
  }, [_vm._v("Несуществующий сервер")]), _vm._v(" "), _c('w-button', {
    attrs: {
      "width": "15",
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.playLive(-1)
      }
    }
  }, [_vm._v("\"Протухшая\" ссылка")]), _vm._v(" "), _c('w-button', {
    attrs: {
      "width": "15",
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.playLive(60)
      }
    }
  }, [_vm._v("Действующая 1 минуту")])], 1), _vm._v(" "), _c('div', {
    staticClass: "test__nav-block"
  }, [_c('w-button', {
    attrs: {
      "width": "15",
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.refresh()
      }
    }
  }, [_vm._v("Сброс")]), _vm._v(" "), _c('w-button', {
    attrs: {
      "width": "15",
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.clearEvents()
      }
    }
  }, [_vm._v("Очистить лог")])], 1), _vm._v(" "), _c('div', {
    staticClass: "test__nav-block"
  }, [_c('w-button', {
    attrs: {
      "width": "15",
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.$router.push({
          name: 'Start'
        })
      }
    }
  }, [_vm._v("На главную")])], 1), _vm._v(" "), _c('div', {
    staticClass: "test__controls"
  }, [_c('w-button', {
    staticClass: "test__player-navigation-btn",
    attrs: {
      "width": "5",
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.pause()
      }
    }
  }, [_vm._v("Pause")]), _vm._v(" "), _c('w-button', {
    staticClass: "test__player-navigation-btn",
    attrs: {
      "width": "5",
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.resume()
      }
    }
  }, [_vm._v("Resume")]), _vm._v(" "), _c('w-button', {
    staticClass: "test__player-navigation-btn",
    attrs: {
      "width": "5",
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.stop()
      }
    }
  }, [_vm._v("Stop")]), _vm._v(" "), _c('w-button', {
    staticClass: "test__player-navigation-btn",
    attrs: {
      "width": "5",
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.seekLeft()
      }
    }
  }, [_vm._v("Seek <-")]), _vm._v(" "), _c('w-button', {
    staticClass: "test__player-navigation-btn",
    attrs: {
      "width": "5",
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        _vm.seekRight()
      }
    }
  }, [_vm._v("Seek ->")])], 1), _vm._v(" "), _c('table', {
    staticClass: "test__status"
  }, _vm._l((_vm.mediaInfo), function(value, name) {
    return _c('tr', [_c('td', [_vm._v(_vm._s(name) + ":")]), _vm._v(" "), _c('td', [_vm._v(_vm._s(value))])])
  })), _vm._v(" "), _c('div', {
    staticClass: "test__log"
  }, _vm._l((_vm.infoBlock), function(info, index) {
    return _c('div', {
      key: index
    }, [_vm._v(_vm._s(info))])
  }))])])
},staticRenderFns: []}

/***/ }),
/* 893 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "scaling-squares-spinner",
    style: (_vm.spinnerStyle)
  }, _vm._l((_vm.squaresStyles), function(ss, index) {
    return _c('div', {
      key: index,
      staticClass: "square",
      class: ("square-" + (index + 1)),
      style: (ss)
    })
  }))
},staticRenderFns: []}

/***/ }),
/* 894 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "swapping-squares-spinner",
    style: (_vm.spinnerStyle)
  }, _vm._l((_vm.squaresStyles), function(ss, index) {
    return _c('div', {
      key: index,
      staticClass: "square",
      class: ("square-" + (index + 1)),
      style: (ss)
    })
  }))
},staticRenderFns: []}

/***/ }),
/* 895 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "looping-rhombuses-spinner",
    style: (_vm.spinnerStyle)
  }, _vm._l((_vm.rhombusesStyles), function(rs, index) {
    return _c('div', {
      staticClass: "rhombus",
      style: (rs),
      attrs: {
        "ikey": index
      }
    })
  }))
},staticRenderFns: []}

/***/ }),
/* 896 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "e-column-channel",
    class: {
      'e-column-channel_active': _vm.active
    },
    attrs: {
      "content-id": _vm.id,
      "content-type": "channel"
    },
    on: {
      "click": function($event) {
        _vm.$emit('click')
      }
    }
  }, [_c('div', {
    staticClass: "e-column-channel-num"
  }, [_vm._v(_vm._s(_vm.num))]), _vm._v(" "), _c('div', {
    staticClass: "e-column-channel-logo",
    style: ({
      backgroundImage: 'url(' + _vm.resize(_vm.logo, 48, 24) + ')'
    })
  }), _vm._v(" "), _c('div', {
    staticClass: "e-column-channel-title"
  }, [_vm._v(_vm._s(_vm.name))]), _vm._v(" "), _c('div', {
    staticClass: "e-column-channel-icon",
    class: {
      'e-column-channel-icon_favorite': _vm.isFavorite
    },
    attrs: {
      "title": _vm.isFavorite ? 'Удалить канал из избранного' : 'Добавить канал в избранное'
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        return _vm.toggleFavorite($event)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-bookmark"
  })])])
},staticRenderFns: []}

/***/ }),
/* 897 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "b-videos"
  }, [(_vm.title) ? _c('div', {
    staticClass: "b-videos__title"
  }, [(_vm.isHaveRedirect) ? _c('h2', {
    staticClass: "b-videos__title-text b-videos__title-text_redirect",
    on: {
      "click": _vm.showAll
    }
  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm._v(" "), (!_vm.isHaveRedirect) ? _c('h2', {
    staticClass: "b-videos__title-text"
  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e()]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "b-videos__list"
  }, [_c('span', {
    staticClass: "b-videos__list-arrow",
    on: {
      "click": _vm.prev
    }
  }, [_vm._v("<")]), _vm._v(" "), _c('slick', {
    ref: "slick",
    staticClass: "b-videos__list-slider",
    attrs: {
      "options": _vm.slickOptions
    }
  }, [_vm._l((_vm.items), function(item) {
    return _c('div', {
      key: item.id,
      staticClass: "b-videos__list-item"
    }, [_c('e-video', {
      attrs: {
        "type": item.type,
        "id": item.id,
        "mode": _vm.mode,
        "play": _vm.play
      }
    })], 1)
  }), _vm._v(" "), (_vm.isStub) ? _c('div', {
    staticClass: "stub",
    class: {
      'stub_vertical': this.mode === 'vertical'
    }
  }, [_c('span', {
    staticClass: "stub__link",
    on: {
      "click": _vm.showAll
    }
  }, [_vm._v("Посмотреть все")])]) : _vm._e()], 2), _vm._v(" "), _c('span', {
    staticClass: "b-videos__list-arrow b-videos__list-arrow_right",
    on: {
      "click": _vm.next
    }
  }, [_vm._v(">")])], 1)])
},staticRenderFns: []}

/***/ }),
/* 898 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "p-diagnostic",
    attrs: {
      "data-xy-group-horizontal": "",
      "data-xy-open-left": ""
    }
  }, [_c('img', {
    staticClass: "p-diagnostic__logo",
    attrs: {
      "src": _vm.$backend.logo
    }
  }), _vm._v(" "), _c('table', {
    staticClass: "p-diagnostic__table"
  }, [_c('thead', [_c('td', {
    staticClass: "p-diagnostic__table-param-col"
  }, [_vm._v(_vm._s(_vm.$lang.messages.device.param))]), _vm._v(" "), _c('td', {
    staticClass: "p-diagnostic__table-value-col"
  }, [_vm._v(_vm._s(_vm.$lang.messages.device.value))])]), _vm._v(" "), _c('tbody', _vm._l((_vm.info), function(line, key, index) {
    return (line !== null && line !== undefined) ? _c('tr', {
      key: index
    }, [_c('td', {
      staticClass: "p-diagnostic__table-param-col_name"
    }, [_vm._v(_vm._s(_vm.$lang.messages.device[key]))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(line))])]) : _vm._e()
  }))]), _vm._v(" "), _c('div', {
    staticClass: "p-diagnostic__button-group"
  }, [(_vm.connected) ? _c('w-button', {
    staticClass: "p-diagnostic__button-group-button",
    attrs: {
      "caption": _vm.$lang.messages.buttons.sync
    },
    on: {
      "click": _vm.sync
    }
  }) : _vm._e(), _vm._v(" "), _c('w-button', {
    staticClass: "p-diagnostic__button-group-button",
    attrs: {
      "caption": _vm.$lang.messages.buttons.reset
    },
    on: {
      "click": _vm.resetAll
    }
  }), _vm._v(" "), _c('w-button', {
    staticClass: "p-diagnostic__button-group-button",
    attrs: {
      "caption": _vm.$lang.messages.buttons.reload
    },
    on: {
      "click": _vm.reloadApp
    }
  })], 1)])
},staticRenderFns: []}

/***/ }),
/* 899 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "e-live-channel",
    attrs: {
      "age-rating": _vm.ageRating
    },
    on: {
      "click": function($event) {
        _vm.openChannel(_vm.id)
      }
    }
  }, [_c('div', {
    staticClass: "e-live-channel__id"
  }, [_c('div', {
    staticClass: "e-live-channel__id-bookmark",
    class: {
      'e-live-channel__id-bookmark_favorite': _vm.isChannelFavorite
    },
    attrs: {
      "title": _vm.isChannelFavorite ? 'Удалить канал из избранного' : 'Добавить канал в избранное'
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        return _vm.toggleChannelFavorite($event)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-bookmark"
  })]), _vm._v(" "), _c('div', {
    staticClass: "e-live-channel__logo",
    style: ({
      backgroundImage: 'url(' + _vm.resize(_vm.logo, 144, 72) + ')'
    })
  })]), _vm._v(" "), (!_vm.sleep) ? _c('div', {
    staticClass: "e-live-channel__tvshow-current"
  }, [_c('div', {
    staticClass: "e-live-channel__tvshow-current-bookmark",
    class: {
      'e-live-channel__tvshow-current-bookmark_favorite': _vm.isTvshowFavorite
    },
    attrs: {
      "title": _vm.isTvshowFavorite ? 'Удалить программу из избранного' : 'Добавить программу в избранное'
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        return _vm.toggleTvshowFavorite($event)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-bookmark"
  })]), _vm._v(" "), _c('div', {
    staticClass: "e-live-channel__tvshow-current-frame",
    style: ({
      backgroundImage: 'url(' + _vm.frameUrl + '), url(' + _vm.resize(_vm.logo, 144, 72) + ')'
    })
  }, [_c('w-progress-bar-line', {
    attrs: {
      "passed": _vm.progress
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "e-live-channel__tvshow-current-info"
  }, [(_vm.tvshow) ? _c('div', {
    staticClass: "e-live-channel__tvshow-current-info-title"
  }, [_vm._v(_vm._s(_vm.tvshow.title))]) : _vm._e(), _vm._v(" "), (_vm.tvshow) ? _c('div', {
    staticClass: "e-live-channel__tvshow-current-info-description"
  }, [_vm._v(_vm._s(_vm.tvshow.description))]) : _vm._e()])]) : _vm._e(), _vm._v(" "), (!_vm.sleep) ? _c('div', {
    staticClass: "e-live-channel__tvshow-next"
  }, [_c('div', {
    staticClass: "e-live-channel__tvshow-next-bookmark",
    class: {
      'e-live-channel__tvshow-next-bookmark_favorite': _vm.isNextTvshowFavorite
    },
    attrs: {
      "title": _vm.isNextTvshowFavorite ? 'Удалить программу из избранного' : 'Добавить программу в избранное'
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        return _vm.toggleNextTvshowFavorite($event)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-bookmark"
  })]), _vm._v(" "), (_vm.nextTvshow) ? _c('div', {
    staticClass: "e-live-channel__tvshow-next-frame",
    style: ({
      backgroundImage: 'url(' + _vm.resizeW(_vm.nextTvshow.cover, 190) + '), url(' + _vm.resize(_vm.logo, 144, 72) + ')'
    })
  }, [_c('div', {
    staticClass: "e-live-channel__tvshow-next-frame-title"
  }, [_vm._v("\n        " + _vm._s(_vm.nextTvshow.title) + "\n      ")]), _vm._v(" "), _c('div', {
    staticClass: "e-live-channel__tvshow-next-frame-time"
  }, [_vm._v("\n        через " + _vm._s(_vm.nextTvshowLeftTime) + "\n      ")])]) : _c('div', {
    staticClass: "e-live-channel__tvshow-next-frame",
    style: ({
      backgroundImage: 'none, url(' + _vm.resize(_vm.logo, 144, 72) + ')'
    })
  })]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 900 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "p-search"
  }, [_c('div', {
    staticClass: "p-search__block"
  }, [_c('div', {
    staticClass: "p-search__block-search"
  }, [_c('div', {
    staticClass: "p-search__block-search-input"
  }, [_c('input', {
    ref: "searchInput",
    staticClass: "p-search__block-search-input-field",
    attrs: {
      "type": "text"
    },
    on: {
      "keyup": _vm.keyPressHandler
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isHaveValue),
      expression: "isHaveValue"
    }],
    staticClass: "p-search__block-search-input-clear",
    on: {
      "click": _vm.clearSearch
    }
  }, [_c('i', {
    staticClass: "fa fa-times"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "p-search__block-search-button",
    on: {
      "click": function($event) {
        _vm.findContent(_vm.$refs.searchInput.value)
      }
    }
  }, [_vm._v("Искать")]), _vm._v(" "), _c('div', {
    staticClass: "p-search__block-search-button",
    on: {
      "click": _vm.closeSearchPage
    }
  }, [_vm._v("Назад")])]), _vm._v(" "), (_vm.message) ? _c('div', {
    staticClass: "p-search__message"
  }, [_vm._v(_vm._s(_vm.message))]) : _vm._e(), _vm._v(" "), _c('div', {
    ref: "searchResults",
    staticClass: "p-search__results"
  }, [(_vm.notEmptyChannels) ? _c('b-channels', {
    attrs: {
      "title": _vm.$lang.messages.search.found_channels,
      "channels": _vm.channels,
      "isStub": false,
      "isHaveRedirect": false
    }
  }) : _vm._e(), _vm._v(" "), (_vm.notEmptyTvshows) ? _c('b-videos', {
    attrs: {
      "title": _vm.$lang.messages.search.found_tvshows,
      "items": _vm.tvshows,
      "isStub": false,
      "mode": 'horizontal',
      "isHaveRedirect": false
    }
  }) : _vm._e(), _vm._v(" "), (_vm.notEmptyVideos) ? _c('b-videos', {
    attrs: {
      "title": _vm.$lang.messages.search.found_videos,
      "items": _vm.videos,
      "isStub": false,
      "mode": 'vertical',
      "isHaveRedirect": false
    }
  }) : _vm._e()], 1)])])
},staticRenderFns: []}

/***/ }),
/* 901 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w-crazy-monkey"
  }, [(!_vm.crazyMonkeyEnabled) ? _c('button', {
    on: {
      "click": function($event) {
        _vm.$crazyMonkey.start();
        _vm.crazyMonkeyEnabled = true
      }
    }
  }, [_c('img', {
    staticStyle: {
      "height": "0.75rem"
    },
    attrs: {
      "src": __webpack_require__(765)
    }
  })]) : _vm._e(), _vm._v(" "), (_vm.crazyMonkeyEnabled) ? _c('button', {
    on: {
      "click": function($event) {
        _vm.$crazyMonkey.stop();
        _vm.crazyMonkeyEnabled = false
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-power-off"
  })]) : _vm._e(), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "blink"
    }
  }, [(_vm.crazyMonkeyEnabled) ? _c('div', {
    staticClass: "w-crazy-monkey__abu",
    style: ({
      backgroundImage: 'url(' + _vm.getMonkeyOnImage() + ')'
    })
  }) : _vm._e()]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "blink"
    }
  }, [(!_vm.crazyMonkeyEnabled) ? _c('div', {
    staticClass: "w-crazy-monkey__abu",
    style: ({
      backgroundImage: 'url(' + _vm.getMonkeyOffImage() + ')'
    })
  }) : _vm._e()])], 1)
},staticRenderFns: []}

/***/ }),
/* 902 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "p-home"
  }, [(_vm.showPlaceholder) ? _c('w-placeholder') : _c('div', {
    staticClass: "p-home__block"
  }, [_c('slick', {
    ref: "slick",
    staticClass: "p-home__block-banner",
    attrs: {
      "options": _vm.bannerSlickOptions
    }
  }, _vm._l((_vm.banners), function(banner) {
    return _c('div', {
      key: banner.id,
      staticClass: "banner-slide"
    }, [_c('img', {
      staticClass: "banner-slide__img",
      attrs: {
        "src": banner.img_url_desktop,
        "alt": ""
      },
      on: {
        "click": function($event) {
          _vm.bannerRedirect(banner.element_type, banner.element_id, banner.url)
        }
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "banner-slide__nav"
    }, [_c('div', {
      staticClass: "banner-slide__nav-btn banner-slide__nav-btn_show",
      on: {
        "click": function($event) {
          _vm.bannerRedirect(banner.element_type, banner.element_id, banner.url)
        }
      }
    }, [_vm._v(_vm._s(_vm.getButtonName(banner.element_type)))]), _vm._v(" "), (_vm.authorized && banner.element_type != 'site') ? _c('div', {
      staticClass: "banner-slide__nav-btn banner-slide__nav-btn_favorite",
      on: {
        "click": function($event) {
          _vm.bannerToFavorite(banner.element_type, banner.element_id)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-bookmark",
      style: (_vm.isFavorite(banner.element_type, banner.element_id) ? 'color: #e05f20' : '')
    }), _vm._v("\n              Добавить в избранное\n            ")]) : _vm._e()])])
  })), _vm._v(" "), (_vm.channels !== null) ? _c('b-channels', {
    staticClass: "p-home__channels",
    attrs: {
      "title": _vm.$lang.messages.home.live,
      "channels": _vm.channels,
      "isHaveRedirect": true,
      "isStub": true
    }
  }) : _vm._e(), _vm._v(" "), _vm._l((_vm.featured), function(section) {
    return _c('b-videos', {
      key: section.name,
      staticClass: "p-home__videos",
      attrs: {
        "title": section.name,
        "items": section.items,
        "mode": section.mode,
        "isStub": true
      }
    })
  })], 2)], 1)
},staticRenderFns: []}

/***/ }),
/* 903 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "main"
  }, [_c('div', {
    ref: "header",
    staticClass: "header"
  }, [_vm._m(0), _vm._v(" "), _c('img', {
    staticClass: "header__logo",
    attrs: {
      "src": _vm.$backend.logo
    },
    on: {
      "click": _vm.goToMain
    }
  }), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "header__items"
  }, [_vm._m(2), _vm._v(" "), _c('div', {
    staticClass: "header__items-navs"
  }, [_c('i', {
    staticClass: "fa fa-search",
    class: {
      'elem-active': _vm.isShowSearchPage
    },
    on: {
      "click": _vm.toggleSearch
    }
  }), _vm._v(" "), (!_vm.isLogged) ? _c('i', {
    staticClass: "fa fa-user",
    on: {
      "click": _vm.login
    }
  }) : _vm._e(), _vm._v(" "), (_vm.isLogged) ? _c('i', {
    staticClass: "fa fa-user",
    on: {
      "click": _vm.personal
    }
  }) : _vm._e()])])]), _vm._v(" "), _c('div', {
    ref: "mainMenu",
    staticClass: "sidebar",
    on: {
      "click": function($event) {
        _vm.isShowSearchPage = false
      }
    }
  }, [_c('div', {
    staticClass: "sidebar__col"
  }, _vm._l((_vm.menu), function(block, index) {
    return _c('div', {
      key: index,
      on: {
        "click": _vm.scrollToTop
      }
    }, _vm._l((block.items), function(item, i) {
      return _c('router-link', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: (item.show),
          expression: "item.show"
        }],
        key: i,
        staticClass: "sidebar__item",
        class: {
          sidebar__item_active: item.page === _vm.normalizedPage
        },
        attrs: {
          "tag": "div",
          "to": {
            name: 'Main',
            params: {
              page: item.page
            },
            query: {
              tag: 0
            }
          }
        }
      }, [_c('div', {
        staticClass: "sidebar__item-short"
      }, [_c('div', {
        staticClass: "sidebar__item-short-icon"
      }, [_c('i', {
        staticClass: "fa",
        class: item.icon
      })])]), _vm._v(" "), _c('div', {
        staticClass: "sidebar__item-full"
      }, [_c('div', {
        staticClass: "sidebar__item-full-icon"
      }, [_c('i', {
        staticClass: "fa",
        class: item.icon
      })]), _vm._v(" "), _c('span', {
        staticClass: "sidebar__item-full-name"
      }, [_vm._v(_vm._s(item.name))])])])
    }))
  }))]), _vm._v(" "), (_vm.filterVisible) ? _c('div', {
    staticClass: "tags",
    class: {
      'tags_open': _vm.tagsCollapse
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.tagsCollapse),
      expression: "!tagsCollapse"
    }],
    staticClass: "tags__selected",
    on: {
      "click": _vm.openFilter
    }
  }, [_vm._v(_vm._s(_vm.currentTag.name))]), _vm._v(" "), _c('div', _vm._l((_vm.tags), function(tag, index) {
    return _c('div', {
      key: index,
      staticClass: "tags__item",
      class: {
        'tags__item_active': tag.filter === _vm.currentTag.filter, 'tags__item_open': _vm.tagsCollapse
      },
      on: {
        "click": function($event) {
          _vm.selectTag(tag)
        }
      }
    }, [_c('div', {
      staticClass: "tags__item-count"
    }, [_vm._v(_vm._s(tag.count))]), _vm._v(" "), _c('div', {
      staticClass: "tags__item-name"
    }, [_vm._v(_vm._s(tag.name))])])
  }))]) : _vm._e(), _vm._v(" "), (_vm.genreFilterVisible && _vm.currentVideoTag.genres.length > 0) ? _c('div', {
    staticClass: "tags tags_genre",
    class: {
      'tags_open': _vm.tagsCollapse
    }
  }, [(!_vm.tagsCollapse && _vm.currentVideoTagGenre) ? _c('div', {
    staticClass: "tags__selected",
    on: {
      "click": _vm.openFilter
    }
  }, [_vm._v(_vm._s(_vm.currentVideoTagGenre.name))]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "tags__block"
  }, _vm._l((_vm.currentVideoTag.genres), function(genre, index) {
    return _c('div', {
      key: index,
      staticClass: "tags__item",
      class: {
        'tags__item_open': _vm.tagsCollapse
      },
      on: {
        "click": function($event) {
          _vm.selectVideoGenre(genre)
        }
      }
    }, [_c('div', {
      staticClass: "tags__item-name"
    }, [_vm._v(_vm._s(genre.name))])])
  }))]) : _vm._e(), _vm._v(" "), _c('div', {
    ref: "mainContent",
    staticClass: "main__content"
  }, [_c('keep-alive', {
    attrs: {
      "include": "p-home,p-search,p-tv,p-videos,p-live,p-tv-column,p-favorites,p-video-cartoons,p-video-films,p-video-series,p-video-shows"
    }
  }, [(_vm.normalizedPage == 'home') ? _c('p-home') : _vm._e(), _vm._v(" "), (_vm.normalizedPage == 'tv') ? _c('p-tv', {
    attrs: {
      "channels": _vm.filteredChannels,
      "pageTitle": _vm.currentTag.name
    }
  }) : _vm._e(), _vm._v(" "), (_vm.normalizedPage == 'live') ? _c('p-live', {
    attrs: {
      "channels": _vm.filteredChannels,
      "pageTitle": _vm.currentTag.name
    }
  }) : _vm._e(), _vm._v(" "), (_vm.normalizedPage == 'tv-column') ? _c('p-tv-column', {
    attrs: {
      "channels": _vm.filteredChannels
    }
  }) : _vm._e(), _vm._v(" "), (_vm.normalizedPage == 'grid') ? _c('p-grid', {
    attrs: {
      "channels": _vm.filteredChannels
    }
  }) : _vm._e(), _vm._v(" "), (_vm.normalizedPage == 'login') ? _c('p-login') : _vm._e(), _vm._v(" "), (_vm.normalizedPage == 'favorites') ? _c('p-favorites') : _vm._e(), _vm._v(" "), (_vm.normalizedPage == 'account') ? _c('p-account', {
    attrs: {
      "tab": _vm.query.tab
    }
  }) : _vm._e(), _vm._v(" "), (_vm.normalizedPage == 'video') ? _c('p-video', {
    attrs: {
      "id": _vm.query.id,
      "type": _vm.query.type
    }
  }) : _vm._e(), _vm._v(" "), (_vm.normalizedPage == 'video-cartoons') ? _c('p-video-cartoons', {
    attrs: {
      "genreId": _vm.currentVideoTagGenre.id,
      "pageTitle": _vm.currentVideoTagGenre.name
    }
  }) : _vm._e(), _vm._v(" "), (_vm.normalizedPage == 'video-films') ? _c('p-video-films', {
    attrs: {
      "genreId": _vm.currentVideoTagGenre.id,
      "pageTitle": _vm.currentVideoTagGenre.name
    }
  }) : _vm._e(), _vm._v(" "), (_vm.normalizedPage == 'video-series') ? _c('p-video-series', {
    attrs: {
      "genreId": _vm.currentVideoTagGenre.id,
      "pageTitle": _vm.currentVideoTagGenre.name
    }
  }) : _vm._e(), _vm._v(" "), (_vm.normalizedPage == 'video-shows') ? _c('p-video-shows', {
    attrs: {
      "genreId": _vm.currentVideoTagGenre.id,
      "pageTitle": _vm.currentVideoTagGenre.name
    }
  }) : _vm._e(), _vm._v(" "), (_vm.normalizedPage == 'settings') ? _c('p-settings', {
    attrs: {
      "tab": _vm.query.tab
    }
  }) : _vm._e(), _vm._v(" "), (_vm.normalizedPage == 'actor-info') ? _c('p-actor-info', {
    attrs: {
      "id": _vm.query.id
    }
  }) : _vm._e()], 1)], 1), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "search-fade"
    }
  }, [_c('p-search', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isShowSearchPage),
      expression: "isShowSearchPage"
    }]
  })], 1)], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "header__burger"
  }, [_c('div', {
    staticClass: "header__burger-line"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "header__item header__item_menu"
  }, [_c('a', {
    staticClass: "header__item-button header__item-button_active",
    attrs: {
      "href": "https://docs.google.com/forms/d/e/1FAIpQLSdj9WBRu9n_8txQLT0Lc1UqiqceJuSvLJ3-Luk8u26V_2WvQg/viewform"
    }
  }, [_vm._v("Перейти на анкету")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "header__items-phones"
  }, [_c('i', {
    staticClass: "fa fa-phone"
  }), _vm._v(" "), _c('span', [_vm._v("+375 17 3361111")]), _vm._v(" "), _c('span', [_vm._v("+375 29 3361100")])])
}]}

/***/ }),
/* 904 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "progress"
  }, [_c('div', {
    staticClass: "progress__line",
    style: ({
      transform: 'scaleX(' + _vm.progress + ')'
    })
  })])
},staticRenderFns: []}

/***/ }),
/* 905 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "e-video",
    class: {
      'e-video_horizontal': _vm.mode === 'horizontal'
    },
    attrs: {
      "content-type": _vm.type,
      "content-mode": _vm.contentMode,
      "content-id": _vm.id,
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": _vm.clickHandler,
      "mouseover": _vm.hoverHandler
    }
  }, [_c('div', {
    staticClass: "e-video__cover",
    style: ({
      backgroundImage: 'url(' + _vm.resizeW(_vm.cover, 256) + ')'
    })
  }), _vm._v(" "), (_vm.play) ? _c('div', {
    staticClass: "e-video__play-button"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(166)
    }
  })]) : _vm._e(), _vm._v(" "), _c('span', {
    staticClass: "e-video__title"
  }, [_c('span', {
    staticClass: "e-video__title-text"
  }, [_vm._v(_vm._s(_vm._f("truncate")(_vm.name, 80)))])]), _vm._v(" "), (_vm.isFavorite) ? _c('div', {
    staticClass: "e-video__icon"
  }, [_c('i', {
    staticClass: "fa fa-bookmark"
  })]) : _vm._e()])])
},staticRenderFns: []}

/***/ }),
/* 906 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w-player-thumbs",
    style: ({
      height: _vm.thumbHeight
    })
  }, _vm._l((_vm.thumbs), function(url, index) {
    return _c('div', {
      key: index,
      staticClass: "w-player-thumbs__item",
      style: ({
        backgroundImage: 'url(' + url + ')',
        width: _vm.thumbWidth,
        height: _vm.thumbHeight
      })
    })
  }))
},staticRenderFns: []}

/***/ }),
/* 907 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "atom-spinner",
    style: (_vm.spinnerStyle)
  }, [_c('div', {
    staticClass: "spinner-inner"
  }, [_c('div', {
    staticClass: "spinner-line",
    style: (_vm.lineStyle)
  }), _vm._v(" "), _c('div', {
    staticClass: "spinner-line",
    style: (_vm.lineStyle)
  }), _vm._v(" "), _c('div', {
    staticClass: "spinner-line",
    style: (_vm.lineStyle)
  }), _vm._v(" "), _c('div', {
    staticClass: "spinner-circle",
    style: (_vm.circleStyle)
  }, [_vm._v("\n      ●\n    ")])])])
},staticRenderFns: []}

/***/ }),
/* 908 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "player-timeline",
    on: {
      "click": _vm.changeTimePosition
    }
  }, [_c('div', {
    staticClass: "player-timeline__line-buffer",
    style: ({
      width: (100 * _vm.buffered) + '%'
    })
  }), _vm._v(" "), _c('div', {
    staticClass: "player-timeline__line-progress",
    style: ({
      width: (100 * _vm.played) + '%'
    })
  }), _vm._v(" "), _c('div', {
    staticClass: "player-timeline__line-all",
    style: ({
      left: (100 * (1 - _vm.rest)) + '%',
      width: (100 * _vm.rest) + '%'
    })
  }), _vm._v(" "), _c('div', {
    staticClass: "player-timeline__button",
    style: ({
      left: (100 * _vm.played) + '%'
    })
  }), _vm._v(" "), _c('div', {
    staticClass: "player-timeline__label-current"
  }, [_vm._v(_vm._s(_vm._f("formatTime")(_vm.current)))]), _vm._v(" "), _c('div', {
    staticClass: "player-timeline__label-duration"
  }, [_vm._v(_vm._s(_vm._f("formatTime")(_vm.duration)))])])
},staticRenderFns: []}

/***/ }),
/* 909 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "e-video",
    class: {
      'e-video_horizontal': _vm.mode === 'horizontal'
    },
    attrs: {
      "content-type": _vm.type,
      "content-mode": _vm.contentMode,
      "content-id": _vm.id
    },
    on: {
      "click": _vm.clickHandler
    }
  }, [_c('div', {
    staticClass: "e-video__bookmark",
    class: {
      'e-video__bookmark_favorite': _vm.isFavorite
    },
    attrs: {
      "title": _vm.isFavorite ? 'Удалить видео из избранного' : 'Добавить видео в избранное'
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        return _vm.toggleFavorite($event)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-bookmark"
  })]), _vm._v(" "), _c('div', {
    staticClass: "e-video__cover",
    style: ({
      backgroundImage: 'url(' + _vm.resizeW(_vm.cover, 256) + ')'
    })
  }), _vm._v(" "), (_vm.play) ? _c('div', {
    staticClass: "e-video__play-button"
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(166)
    }
  })]) : _vm._e(), _vm._v(" "), _c('span', {
    staticClass: "e-video__title"
  }, [_c('span', {
    staticClass: "e-video__title-text"
  }, [_vm._v(_vm._s(_vm._f("truncate")(_vm.name, 80)))])])])
},staticRenderFns: []}

/***/ }),
/* 910 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.tvshow) ? _c('div', {
    staticClass: "guide-tvshow",
    class: {
      'guide-tvshow_current': _vm.isCurrent
    },
    style: ({
      transform: 'translateX(' + _vm.offsetX + 'rem)'
    }),
    on: {
      "click": _vm.playTvShow
    }
  }, [_c('div', {
    staticClass: "guide-tvshow__time"
  }, [(_vm.isLive) ? _c('div', [_vm._v("\n          " + _vm._s(_vm.startTime) + " (в эфире)\n        ")]) : _c('div', [_vm._v("\n            " + _vm._s(_vm.startTime) + "\n        ")])]), _vm._v(" "), _c('div', {
    staticClass: "guide-tvshow__frame",
    style: ({
      backgroundImage: 'url(' + _vm.crop(_vm.frameUrl, 288, 168) + '), url(' + _vm.resize(_vm.logo, 144, 72) + ')'
    })
  }, [(_vm.isArchive) ? _c('div', {
    staticClass: "guide-tvshow__frame-isArch"
  }, [_c('i', {
    staticClass: "fa fa-hdd"
  })]) : _vm._e(), _vm._v(" "), (!_vm.isCurrent) ? _c('div', {
    staticClass: "guide-tvshow__frame-title"
  }, [_vm._v("\n            " + _vm._s(_vm.tvshow.title) + "\n        ")]) : _vm._e(), _vm._v(" "), (_vm.isLive) ? _c('div', [_c('w-progress-bar-line', {
    attrs: {
      "passed": _vm.progress * 100
    }
  })], 1) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "guide-tvshow__info",
    style: ({
      opacity: _vm.infoOpacity
    })
  }, [_c('div', {
    staticClass: "guide-tvshow__info-title"
  }, [_vm._v(_vm._s(_vm.tvshow.title))]), _vm._v(" "), _c('div', {
    staticClass: "guide-tvshow__info-description"
  }, [_vm._v(_vm._s(_vm.tvshow.description))])])]) : _vm._e()
},staticRenderFns: []}

/***/ }),
/* 911 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "fulfilling-bouncing-circle-spinner",
    style: (_vm.spinnerStyle)
  }, [_c('div', {
    staticClass: "circle",
    style: (_vm.circleStyle)
  }), _vm._v(" "), _c('div', {
    staticClass: "orbit",
    style: (_vm.orbitStyle)
  })])
},staticRenderFns: []}

/***/ }),
/* 912 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w-prompt",
    class: 'w-prompt_' + _vm.type
  }, [_c('div', {
    staticClass: "w-prompt__box"
  }, [_c('div', {
    staticClass: "w-prompt__box-title"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('div', {
    staticClass: "w-prompt__box-input"
  }, [_vm._v(_vm._s(_vm.visibleText))]), _vm._v(" "), (_vm.errorMessage) ? _c('span', {
    staticClass: "w-prompt__box-message"
  }, [_vm._v(_vm._s(_vm.errorMessage))]) : _vm._e(), _vm._v(" "), _c('div', {
    ref: "buttons",
    staticClass: "w-prompt__box-buttons"
  }, _vm._l((_vm.buttons), function(button, index) {
    return _c('w-button', {
      key: index,
      staticClass: "w-prompt__box-buttons-button",
      attrs: {
        "active": index === _vm.activeButtonIndex,
        "caption": button.title
      },
      on: {
        "click": function($event) {
          _vm.actionHandler(index)
        }
      }
    })
  }))])])
},staticRenderFns: []}

/***/ }),
/* 913 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "slide",
      "duration": 2000
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.connected),
      expression: "!connected"
    }],
    staticClass: "w-connection-status",
    class: {
      'w-connection-status_offline': !_vm.connected
    }
  }, [_vm._v(_vm._s(_vm.text))])])
},staticRenderFns: []}

/***/ }),
/* 914 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "detail-video"
  }, [(_vm.showPlaceholder) ? _c('w-placeholder') : _c('div', {
    staticClass: "detail-video__inner"
  }, [_c('div', {
    staticClass: "detail-video__art",
    style: ({
      backgroundImage: 'url(' + _vm.resizeW(_vm.art, 1920) + ')'
    })
  }), _vm._v(" "), _c('div', {
    staticClass: "detail-video__header"
  }, [_c('div', {
    staticClass: "detail-video__header-cover",
    style: ({
      backgroundImage: 'url(' + _vm.resizeW(_vm.cover, 512) + ')'
    })
  }), _vm._v(" "), _c('div', {
    staticClass: "detail-video__header-details"
  }, [_c('div', {
    staticClass: "detail-video__header-details_genres"
  }, _vm._l((_vm.video.genres), function(genre, index) {
    return _c('span', {
      key: index
    }, [_vm._v(_vm._s(_vm._f("capitalize")(_vm.clearGenre(genre))))])
  })), _vm._v(" "), _c('h1', {
    staticClass: "detail-video__header-details_big"
  }, [_vm._v(_vm._s(_vm.video.name))]), _vm._v(" "), _c('div', {
    staticClass: "detail-video__header-details_midi"
  }, [_vm._v(_vm._s(_vm.video.international_name))]), _vm._v(" "), (_vm.video.director.length) ? _c('div', {
    staticClass: "detail-video__header-details-list"
  }, [_c('span', {
    staticClass: "detail-video__header-details-list-title"
  }, [(_vm.video.director.length > 1) ? _c('span', [_vm._v(_vm._s(_vm.$lang.messages.video.directors) + ":")]) : _c('span', [_vm._v(_vm._s(_vm.$lang.messages.video.director) + ":")])]), _vm._v(" "), _vm._l((_vm.video.director), function(person) {
    return _c('span', {
      key: person.id,
      staticClass: "detail-video__header-details-list-item"
    }, [_vm._v("\n            " + _vm._s(person.name) + "\n          ")])
  })], 2) : _vm._e(), _vm._v(" "), (_vm.video.cast.length) ? _c('div', {
    staticClass: "detail-video__header-details-list"
  }, [_c('span', {
    staticClass: "detail-video__header-details-list-title"
  }, [_vm._v(_vm._s(_vm.$lang.messages.video.cast) + ": ")]), _vm._v(" "), _vm._l((_vm.video.cast), function(person) {
    return _c('span', {
      key: person.id,
      staticClass: "detail-video__header-details-list-item"
    }, [_vm._v("\n            " + _vm._s(person.name) + "\n          ")])
  })], 2) : _vm._e()]), _vm._v(" "), _c('ul', {
    staticClass: "detail-video__header-buttons"
  }, [(_vm.isPlayable && _vm.isAvailable && _vm.authorized) ? _c('li', {
    staticClass: "detail-video__header-buttons-item",
    on: {
      "click": function($event) {
        _vm.showVideo()
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-play"
  }), _vm._v("\n          " + _vm._s(_vm.$lang.messages.video.watch) + "\n        ")]) : _vm._e(), _vm._v(" "), (!_vm.isAvailable && _vm.authorized && _vm.isPlayable) ? _c('li', {
    staticClass: "detail-video__header-buttons-item detail-video__header-buttons-item_subscr",
    on: {
      "click": function($event) {
        _vm.getSubscription()
      }
    }
  }, [_vm._v(_vm._s(_vm.$lang.messages.buttons.subscr))]) : _vm._e(), _vm._v(" "), (!_vm.authorized) ? _c('li', {
    staticClass: "detail-video__header-buttons-item",
    on: {
      "click": function($event) {
        _vm.login()
      }
    }
  }, [_vm._v(_vm._s(_vm.$lang.messages.buttons.login))]) : _vm._e(), _vm._v(" "), (_vm.canFavorite && !_vm.isFavorite && _vm.authorized) ? _c('li', {
    staticClass: "detail-video__header-buttons-item",
    on: {
      "click": function($event) {
        _vm.addFavorite()
      }
    }
  }, [_vm._v(_vm._s(_vm.$lang.messages.context.add_favorite))]) : _vm._e(), _vm._v(" "), (_vm.showBack) ? _c('li', {
    staticClass: "detail-video__header-buttons-item",
    on: {
      "click": function($event) {
        _vm.back()
      }
    }
  }, [_vm._v(_vm._s(_vm.$lang.messages.context.back))]) : _vm._e(), _vm._v(" "), (_vm.isFavorite) ? _c('li', {
    staticClass: "detail-video__header-buttons-item",
    on: {
      "click": function($event) {
        _vm.removeFavorite()
      }
    }
  }, [_vm._v(_vm._s(_vm.$lang.messages.context.remove_favorite))]) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "detail-video__info"
  }, [(_vm.video.description) ? _c('div', {
    staticClass: "detail-video__info-about"
  }, [_c('span', {
    staticClass: "detail-video__info-about_big"
  }, [_vm._v(_vm._s(_vm.$lang.messages.video.description))]), _vm._v(" "), _c('span', {
    staticClass: "detail-video__info-about_description",
    domProps: {
      "innerHTML": _vm._s(_vm.video.description)
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "detail-video__info-more"
  }, [(_vm.video.countries.length) ? _c('div', {
    staticClass: "detail-video__info-more-line"
  }, [_c('span', {
    staticClass: "detail-video__info-more-line_left"
  }, [_vm._v(_vm._s(_vm.$lang.messages.video.country))]), _vm._v(" "), _c('span', {
    staticClass: "detail-video__info-more-line_right"
  }, [_vm._v(_vm._s(_vm.video.countries.join(', ')))])]) : _vm._e(), _vm._v(" "), (_vm.video.year) ? _c('div', {
    staticClass: "detail-video__info-more-line"
  }, [_c('span', {
    staticClass: "detail-video__info-more-line_left"
  }, [_vm._v(_vm._s(_vm.$lang.messages.video.year))]), _vm._v(" "), _c('span', {
    staticClass: "detail-video__info-more-line_right"
  }, [_vm._v(_vm._s(_vm.video.year))])]) : _vm._e(), _vm._v(" "), (_vm.video.ratings.imdb) ? _c('div', {
    staticClass: "detail-video__info-more-line"
  }, [_c('span', {
    staticClass: "detail-video__info-more-line_left"
  }, [_vm._v("IMDb")]), _vm._v(" "), _c('span', {
    staticClass: "detail-video__info-more-line_right"
  }, [_vm._v(_vm._s(_vm.video.ratings.imdb.value))])]) : _vm._e(), _vm._v(" "), (_vm.video.ratings.kinopoisk) ? _c('div', {
    staticClass: "detail-video__info-more-line"
  }, [_c('span', {
    staticClass: "detail-video__info-more-line_left"
  }, [_vm._v(_vm._s(_vm.$lang.messages.video.kinopoisk))]), _vm._v(" "), _c('span', {
    staticClass: "detail-video__info-more-line_right"
  }, [_vm._v(_vm._s(_vm.video.ratings.kinopoisk.value))])]) : _vm._e(), _vm._v(" "), (_vm.video.age_rating) ? _c('div', {
    staticClass: "detail-video__info-more-line"
  }, [_c('span', {
    staticClass: "detail-video__info-more-line_left"
  }, [_vm._v(_vm._s(_vm.$lang.messages.video.age_limit))]), _vm._v(" "), _c('span', {
    staticClass: "detail-video__info-more-line_right"
  }, [_vm._v(_vm._s(_vm.video.age_rating))])]) : _vm._e(), _vm._v(" "), (_vm.channel) ? _c('div', {
    staticClass: "detail-video__info-more-line"
  }, [_c('span', {
    staticClass: "detail-video__info-more-line_left"
  }, [_vm._v(_vm._s(_vm.$lang.messages.video.channel))]), _vm._v(" "), _c('span', {
    staticClass: "detail-video__info-more-line_right"
  }, [_vm._v(_vm._s(_vm.channel.name))])]) : _vm._e(), _vm._v(" "), (_vm.tvshow) ? _c('div', {
    staticClass: "detail-video__info-more-line"
  }, [_c('span', {
    staticClass: "detail-video__info-more-line_left"
  }, [_vm._v(_vm._s(_vm.$lang.messages.video.ether))]), _vm._v(" "), _c('span', {
    staticClass: "detail-video__info-more-line_right"
  }, [_vm._v(_vm._s(_vm.startTime))])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "detail-video__info-more-line"
  }, [_c('span', {
    staticClass: "detail-video__info-more-line_left"
  }, [_vm._v(_vm._s(_vm.$lang.messages.video.duration))]), _vm._v(" "), _c('span', {
    staticClass: "detail-video__info-more-line_right"
  }, [_vm._v(_vm._s(_vm.duration) + " мин.")])])])]), _vm._v(" "), (_vm.video.is_series) ? _c('div', {
    staticClass: "detail-video__seasons"
  }, [_c('ul', {
    staticClass: "detail-video__seasons-nav"
  }, _vm._l((_vm.video.seasons), function(season, index) {
    return _c('li', {
      key: index,
      staticClass: "detail-video__seasons-nav-item",
      on: {
        "click": function($event) {
          _vm.openSeason(season)
        }
      }
    }, [_vm._v("\n          " + _vm._s(season) + "\n          "), (season === _vm.seasonSelect) ? _c('span', {
      staticClass: "detail-video__seasons-nav-item-glow"
    }) : _vm._e()])
  })), _vm._v(" "), (_vm.series.length > 0) ? _c('div', {
    staticClass: "detail-video__seasons-thumbs"
  }, [_c('b-videos', {
    attrs: {
      "items": _vm.series,
      "mode": 'horizontal',
      "play": true,
      "isStub": false
    }
  })], 1) : _vm._e()]) : _vm._e()])], 1)
},staticRenderFns: []}

/***/ }),
/* 915 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.visible === true) ? _c('div', {
    staticClass: "p-context-menu"
  }, [_c('div', {
    staticClass: "p-context-menu__container"
  }, [_vm._l((_vm.list), function(item) {
    return (_vm.list !== null) ? _c('button', {
      staticClass: "p-context-menu__button",
      attrs: {
        "data-xy-focusable": "",
        "tabindex": "-1"
      },
      on: {
        "click": function($event) {
          _vm.startFunction(item.id)
        },
        "focus": _vm.focusHandler
      }
    }, [_vm._v(_vm._s(item.btName))]) : _vm._e()
  }), _vm._v(" "), _c('button', {
    staticClass: "p-context-menu__button",
    attrs: {
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": _vm.closeContextMenu,
      "focus": _vm.focusHandler
    }
  }, [_vm._v("Close")])], 2)]) : _vm._e()
},staticRenderFns: []}

/***/ }),
/* 916 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w-player-tracker",
    style: ({
      left: (100 * _vm.position) + '%'
    })
  }, [_c('div', {
    staticClass: "w-player-tracker__thumbnail",
    style: ({
      backgroundImage: 'url(' + _vm.thumbnail + ')',
      left: _vm.positionThumbnail
    })
  }, [_c('span', {
    staticClass: "w-player-tracker__time"
  }, [_vm._v(_vm._s(_vm._f("formatTime")(_vm.time)))])]), _vm._v(" "), _c('div', {
    staticClass: "w-player-tracker__button",
    style: ({
      left: _vm.position + '%'
    })
  })])
},staticRenderFns: []}

/***/ }),
/* 917 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "fulfilling-square-spinner",
    style: (_vm.spinnerStyle)
  }, [_c('div', {
    staticClass: "spinner-inner",
    style: (_vm.spinnerInnerStyle)
  })])
},staticRenderFns: []}

/***/ }),
/* 918 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),
/* 919 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "player"
  }, [_c('w-volume', {
    attrs: {
      "visible": _vm.isVolumeBarVisible
    }
  }), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "nav-controls"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showNavbar),
      expression: "showNavbar"
    }],
    staticClass: "player__navbar"
  }, [_c('div', {
    staticClass: "player__navbar-button player__navbar-button_back",
    on: {
      "click": _vm.goBack
    }
  }, [_vm._v("Назад")]), _vm._v(" "), (_vm.isFullscreenSupport) ? _c('div', {
    staticClass: "player__navbar-button player__navbar-button_fullscreen",
    on: {
      "click": _vm.toggleFullscreen
    }
  }) : _vm._e()])]), _vm._v(" "), (_vm.throbberVisible) ? _c('div', {
    staticClass: "player__throbber"
  }, [_c('looping-rhombuses-spinner', {
    attrs: {
      "animation-duration": 2500,
      "rhombus-size": 15
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade-pause"
    }
  }, [(_vm.paused) ? _c('div', {
    staticClass: "player__pause",
    on: {
      "click": function($event) {
        _vm.togglePause()
      },
      "mousemove": _vm.showAllBarsWithAutohide
    }
  }, [_c('i', {
    staticClass: "far fa-pause-circle"
  })]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "player__area player__area_video",
    on: {
      "click": function($event) {
        _vm.togglePause()
      },
      "wheel": _vm.changeVolumeHandler,
      "mousemove": _vm.showAllBarsWithAutohide
    }
  }), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade-controls"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showControls),
      expression: "showControls"
    }],
    staticClass: "player__controls",
    on: {
      "mouseenter": function($event) {
        _vm.showTracker()
      }
    }
  }, [_c('w-player-timeline', {
    attrs: {
      "current": _vm.time,
      "duration": _vm.duration,
      "buffered": _vm.buffered,
      "changeCurrent": _vm.changeCurrentTime
    }
  }), _vm._v(" "), (_vm.trackingMode) ? _c('w-player-thumbs', {
    attrs: {
      "thumbs": _vm.thumbnails
    }
  }) : _vm._e(), _vm._v(" "), (_vm.trackingMode) ? _c('w-player-tracker', {
    attrs: {
      "position": _vm.trackerPosition,
      "time": _vm.trackerTime,
      "thumbnail": _vm.thumbnail
    }
  }) : _vm._e()], 1)])], 1)
},staticRenderFns: []}

/***/ }),
/* 920 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "alert"
  }, [_c('div', {
    staticClass: "alert__modal",
    attrs: {
      "data-xy-group": ""
    }
  }, [_vm._v("\n      " + _vm._s(_vm.$lang.messages.exit.title) + "\n      "), _c('div', {
    staticClass: "button-group"
  }, [_c('div', {
    staticClass: "button",
    attrs: {
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": _vm.exitApp
    }
  }, [_vm._v(_vm._s(_vm.$lang.messages.exit.yes))]), _vm._v(" "), _c('div', {
    staticClass: "button",
    attrs: {
      "data-xy-focusable": "",
      "tabindex": "-1"
    },
    on: {
      "click": _vm.closeModal
    }
  }, [_vm._v(_vm._s(_vm.$lang.messages.exit.no))])])])])
},staticRenderFns: []}

/***/ }),
/* 921 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "flower-spinner",
    style: (_vm.spinnerStyle)
  }, [_c('div', {
    staticClass: "dots-container",
    style: (_vm.dotsContainerStyle)
  }, [_c('div', {
    staticClass: "bigger-dot",
    style: (_vm.biggerDotStyle)
  }, [_c('div', {
    staticClass: "smaller-dot",
    style: (_vm.smallerDotStyle)
  })])])])
},staticRenderFns: []}

/***/ }),
/* 922 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "w-button",
    on: {
      "click": function($event) {
        _vm.$emit('click')
      }
    }
  }, [_vm._v(_vm._s(_vm.caption))])
},staticRenderFns: []}

/***/ }),
/* 923 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "p-account"
  }, [_c('div', {
    staticClass: "p-account__menu"
  }, _vm._l((_vm.tabs), function(tabItem) {
    return _c('div', {
      key: tabItem.id,
      staticClass: "p-account__menu-item",
      class: [tabItem.id === _vm.activeTab ? 'p-account__menu-item_active' : null],
      on: {
        "click": function($event) {
          _vm.gotoTab(tabItem.id)
        }
      }
    }, [_c('span', [_vm._v(_vm._s(tabItem.name))])])
  })), _vm._v(" "), _c('div', {
    staticClass: "p-account__page"
  }, [(_vm.activeTab === 'subscriptions') ? _c('p-subscriptions', {
    on: {
      "purchase": function($event) {
        _vm.gotoTab('purchases')
      }
    }
  }) : _vm._e(), _vm._v(" "), (_vm.activeTab === 'purchases') ? _c('p-purchases') : _vm._e(), _vm._v(" "), (_vm.activeTab === 'profile') ? _c('p-profile') : _vm._e()], 1)])
},staticRenderFns: []}

/***/ }),
/* 924 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.inShow) ? _c('img', {
    attrs: {
      "id": "throbber",
      "src": __webpack_require__(763),
      "height": "200",
      "width": "200"
    }
  }) : _vm._e()
},staticRenderFns: []}

/***/ }),
/* 925 */,
/* 926 */,
/* 927 */,
/* 928 */,
/* 929 */,
/* 930 */,
/* 931 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./en/messages.js": 573,
	"./ru/messages.js": 574
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 931;

/***/ })
],[560]);