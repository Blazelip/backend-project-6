const objectionUnique = require('objection-unique');
const BaseModel = require('./BaseModel.cjs');

const unique = objectionUnique({ fields: ['title'] });

module.exports = class Status extends unique(BaseModel) {
  static get tableName() {
    return 'statuses';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1 },
      },
    };
  }
};
