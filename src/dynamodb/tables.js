
'use strict';

const vogels = require('vogels-promisified');
const Joi    = require('joi');

const Day = vogels.define('Day', {
  hashKey: 'ClientId',
  rangeKey: 'Timestamp',
  schema: {
    ClientId: Joi.string(),
    Timestamp: Joi.date(),
    Data: Joi.object().keys({
      DeviceId: Joi.string(),
      Level: Joi.number(),
      Recorded: Joi.date(),
    }),
  },
  tableName: 'moisture_data_raw'
});

exports.Day = Day;
