// @ts-check
import { generateUsers, generateStatuses } from './faker.js';
// TODO: использовать для фикстур https://github.com/viglucci/simple-knex-fixtures

const prepareData = async (app) => {
  const { knex } = app.objection;
  const userMocks = generateUsers();
  const statusesMocks = generateStatuses();
  // получаем данные из фикстур и заполняем БД
  await knex('users').insert(userMocks.seeds);
  await knex('statuses').insert(statusesMocks.seeds);

  return {
    users: userMocks,
    statuses: statusesMocks,
  };
};

const makeLogin = async (app, credentials) => {
  const response = await app.inject({
    method: 'POST',
    url: app.reverse('session'),
    payload: {
      data: credentials,
    },
  });

  const [sessionCookie] = response.cookies;
  const { name, value } = sessionCookie;
  const cookie = { [name]: value };

  return cookie;
};

export { prepareData, makeLogin };
