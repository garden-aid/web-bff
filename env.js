
module.exports = function(config, secure) {
  Object.keys(config).forEach((key, index) => {
    const value = config[key];
    process.env[key] = value;

    console.log(`Env: ${key}=${secure ? 'secure' : value}`)
  });
}
