// @ts-check

import _ from 'lodash';
import fastify from 'fastify';

import init from '../server/plugin.js';
import encrypt from '../server/lib/secure.cjs';
import { generateUsers } from './helpers/faker.js';
import { fillDataBase, makeLogin } from './helpers/index.js';

describe('test users CRUD', () => {
  let app;
  let knex;
  let models;
  let users;
  // Получаем данные для теста

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: 'pino-pretty' },
    });
    await init(app);
    knex = app.objection.knex;
    models = app.objection.models;

    // TODO: пока один раз перед тестами
    // тесты не должны зависеть друг от друга
    // перед каждым тестом выполняем миграции
    // и заполняем БД тестовыми данными
    users = generateUsers();
  });

  beforeEach(async () => {
    await knex.migrate.latest();
    await fillDataBase(app, users.seeds);
  });

  // Идем на список юзеров и получаем 200
  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('users'),
    });

    expect(response.statusCode).toBe(200);
  });

  // Идем на страницу нового юзера и получаем 200
  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newUser'),
    });

    expect(response.statusCode).toBe(200);
  });

  // Отправляем POST на создание нового юзера с параметрами
  it('create', async () => {
    // Получаем креды для создания нового пользователя
    const params = users.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('users'),
      payload: {
        data: params,
      },
    });

    // Ждем редирект после создание нового юзера
    expect(response.statusCode).toBe(302);
    // Формируем данные для проверки, удаляем из тестового объекта
    // С данными буквенный пароль и вставляем поле с шифрованным
    const expected = {
      ..._.omit(params, 'password'),
      passwordDigest: encrypt(params.password),
    };
    // Делаем запрос к БД по Email пользователя, полученного из тестовых данных
    const user = await models.user.query().findOne({ email: params.email });
    // СРавниваем то, что забрали из БД с кредами полученными в POST
    expect(user).toMatchObject(expected);
  });

  it('update', async () => {
    const modifiedLastName = 'Avada-kedavra';
    const creds = users.existing.creator;
    const cookie = makeLogin(app, creds);
    const user = await models.user.query().findOne({ email: creds.email });

    const response = await app.inject({
      method: 'PATCH',
      url: app.reverse('updateUser', { id: user.id }),
      payload: {
        data: {
          ...creds,
          lastName: modifiedLastName,
        },
      },
      cookies: cookie,
    });
    expect(response.statusCode).toBe(302);

    const reFetchedUser = await user.$query();
    expect(reFetchedUser.lastName).toEqual(modifiedLastName);
  });

  it('delete', async () => {
    const creds = users.existing.forDelete;
    const cookie = makeLogin(app, creds);
    const user = await models.user.query().findOne({ email: creds.email });

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('deleteUser', { id: user.id }),
      cookies: cookie,
    });
    expect(response.statusCode).toBe(302);

    const reFetchedUser = await user.$query();
    expect(reFetchedUser).toBeUndefined();
  });

  afterEach(async () => {
    await models.user.query().truncate();
  });

  afterAll(async () => {
    await app.close();
  });
});
