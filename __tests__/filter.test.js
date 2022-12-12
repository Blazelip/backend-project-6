import fastify from 'fastify';
import init from '../server/plugin.js';
import { prepareData, makeLogin } from './helpers/index.js';

describe('Filter tasks GET', () => {
  let app;
  let knex;
  let models;
  let mockData;
  let cookie;

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: 'pino-pretty' },
    });
    await init(app);
    knex = app.objection.knex;
    models = app.objection.models;
    await knex.migrate.latest();
  });

  beforeEach(async () => {
    mockData = await prepareData(app);
    cookie = await makeLogin(app, mockData.users.existing.creator);
  });

  it('taskFilter', async () => {
    const [statuses, labels] = await Promise.all([
      models.status.query(),
      models.label.query(),
    ]);

    const query = {
      label: labels[0].id,
      status: statuses[0].id,
      executor: '',
      isCreatorUser: '',
    };

    const response = await app.inject({
      method: 'GET',
      query,
      url: app.reverse('getTasks'),
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  afterEach(async () => {
    await knex('users').truncate();
    await knex('statuses').truncate();
    await knex('tasks').truncate();
    await knex('labels').truncate();
    await knex('tasks_labels').truncate();
  });

  afterAll(async () => {
    await app.close();
  });
});
