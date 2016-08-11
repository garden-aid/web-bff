
'use strict';

const BbPromise = require('bluebird');
const moment = require('moment');

const tables = require('../dynamodb/tables');

function logError(err) {
  console.log('Error running query', err);
}

function logResults(resp) {
  console.log('Found', resp.Count, 'items');
  console.log(resp.Items);

  if(resp.ConsumedCapacity) {
    console.log('----------------------------------------------------------------------');
    console.log('Query consumed: ', resp.ConsumedCapacity);
  }

  return resp;
}

function convertResults(resp) {
  const result = resp.Items.map(item => {
    const data = item.attrs.Data;
    return {
      date: data.Recorded,
      moisture: data.Level,
    };
  });

  return result;
}

class DayService {
  constructor(dayTable) {
    this.dayTable = dayTable;
  }

  getLastHours(clientId, hours) {
    //const after = moment().subtract(hours, 'hours').valueOf();
    //console.log('Retreiving records after: ' + after);

    return this.dayTable
      .query(clientId)
      .execAsync()
      .then(logResults)
      .then(convertResults)
      .catch(logError);
  }
}

module.exports = DayService;
