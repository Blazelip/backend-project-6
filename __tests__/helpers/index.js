// @ts-check

// TODO: использовать для фикстур https://github.com/viglucci/simple-knex-fixtures

const fillDataBase = async (app, data) => {
  const { knex } = app.objection;

  // получаем данные из фикстур и заполняем БД
  await knex('users').insert(data);
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

export { fillDataBase, makeLogin };
