module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module-resolver", {
        "root": "./src",
        "alias": {
            "features": "./features",
            "screens": "./screens",
            "assets": "./assets",
        }
      }]
    ]
  };
};
