
module.exports = function(config) {
  console.log('Setting up env vars');

  console.log('Config: ', config);

  Object.keys(config).forEach((key, index) => {
    process.env[key] = config[key];
  });

  console.log('Env: ', process.env);
}
