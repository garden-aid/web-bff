
module.exports = (config, secure) => {
  Object.keys(config).forEach((key) => {
    const value = config[key];
    process.env[key] = value;

    console.log(`Env: ${key}=${secure ? 'secure' : value}`);
  });
};
