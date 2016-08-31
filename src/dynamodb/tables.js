
'use strict';

const vogels = require('vogels-promisified');
const Joi    = require('joi');

module.exports = () => {
  const moistureTableName = process.env.moistureTableName;

  if(!moistureTableName) {
    throw new Error("Missing moisture table name");
  }

  const Moisture = vogels.define('Moisture', {
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
    tableName: moistureTableName
  });

  return {
    Moisture: Moisture
  };
}
