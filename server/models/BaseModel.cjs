// @ts-check

const { Model } = require('objection');
// Класс BaseModel расширяет класс Model, добавляя в него новый статический геттер
// modelPaths, которая отдает в массиву ссылку на папку, гле лежит BaseModel
module.exports = class BaseModel extends Model {
  static get modelPaths() {
    return [__dirname];
  }
};
