function getBabelOptions(target, type) {
  let babelOptions = {
    "presets": [
      [ "env", {
        "targets": {
          "chrome": 25
        },
        "modules": false,
        "useBuiltIns": true,
        "debug": true
      }
      ],
      'es2015',
    ],
    plugins: ['transform-regenerator', 'transform-runtime', 'transform-exponentiation-operator'],
    babelrc: false,
  };

  if (target === 'webos') {
    babelOptions = {
      "presets": [
        [ "env", {
          "targets": {
            "chrome": 27
          },
          "modules": false,
          "useBuiltIns": true,
          "debug": true
        }
        ],
        'es2015',
      ],
      plugins: ['transform-regenerator', 'transform-runtime', 'transform-exponentiation-operator'],
      babelrc: false,
    };
  }

  if (target === 'android') {
    babelOptions = {
      "presets": [
        [ "env", {
          "targets": {
            "chrome": 53
          },
          "modules": false,
          "useBuiltIns": true,
          "debug": true
        }
        ],
      ],
      plugins: ['transform-async-super', 'transform-runtime', 'transform-regenerator', 'transform-exponentiation-operator'],
      babelrc: false,
    };
  }
  return babelOptions;
}

function getBrowserList(target, type) {
  if (target === 'android') {
    return "chrome 53";
  }
  if (target === 'webos') {
    return "chrome 27";
  }
  return "chrome 25";
}

module.exports = {
  getBabelOptions,
  getBrowserList,
};
