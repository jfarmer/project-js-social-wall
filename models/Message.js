let { Model, snakeCaseMappers } = require('objection');

class Message extends Model {
  static get columnNameMappers() {
    /*
      In JavaScript we want camel case (e.g., createdAt), but
      in SQL we want snake case (e.g., created_at).

      snakeCaseMappers tells Objection to translate between
      the two.
    */
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'messages';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'body',
      ],
      properties: {
        id: { type: 'integer' },
        body: { type: 'string', minLength: 1 }
      }
    };
  }
}

module.exports = Message;
