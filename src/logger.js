
const stampit = require('stampit');

const isTest = process.env.NODE_ENV = 'test';
const noOp = () => {};

const Logger = stampit({
  methods: {
    log: isTest ? noOp : console.log,
  },
});

module.exports = Logger;
