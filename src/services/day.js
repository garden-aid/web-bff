
'use strict';

const BbPromise = require('bluebird');
const stampit = require('stampit');
const moment = require('moment');

const Logger = require('../logger');

const DayService = stampit().
  refs({
    dayTable: null
  }).
  init((opts) => {
    if(!opts.instance.dayTable) throw new Error('dayTable is required');
  }).
  methods({
    getLastHours(clientId, hours) {
      //const after = moment().subtract(hours, 'hours').valueOf();
      //console.log('Retreiving records after: ' + after);

      return this.dayTable
        .query(clientId)
        .execAsync()
        .then((resp) => this.logResults(resp))
        .then((resp) => this.convertResults(resp.Items))
        .catch((err) => {
          this.log('Error running query', err);
          throw err;
        });
    },

    logResults(resp) {
      this.log('Found', resp.Count, 'items');
      this.log('Items: ', resp.Items);

      if(resp.ConsumedCapacity) {
        this.log('Query consumed: ', resp.ConsumedCapacity);
      }

      return resp;
    },

    convertResults(items) {
      const result = items.map(item => {
        const data = item.attrs.Data;
        return {
          date: data.Recorded,
          moisture: data.Level,
        };
      });

      return result;
    },
  }).
  compose(Logger);

module.exports = DayService;
