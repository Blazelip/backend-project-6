// @ts-check
import {
  generateUsers, generateStatuses, generateTasks, generateLabels,
} from './faker.js';
// TODO: использовать для фикстур https://github.com/viglucci/simple-knex-fixtures

const prepareData = async (app) => {
  const { knex } = app.objection;
  const userMocks = generateUsers();
  const statusesMocks = generateStatuses();
  const labelsMocks = generateLabels();
  // получаем данные из фикстур и заполняем БД
  await knex('users').insert(userMocks.seeds);
  await knex('statuses').insert(statusesMocks.seeds);
  await knex('labels').insert(labelsMocks.seeds);

  const users = await knex('users');
  const statuses = await knex('statuses');
  const tasksMocks = generateTasks(users, statuses);

  await knex('tasks').insert(tasksMocks.seeds);
  return {
    users: userMocks,
    statuses: statusesMocks,
    tasks: tasksMocks,
    labels: labelsMocks,
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
