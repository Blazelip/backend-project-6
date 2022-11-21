// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (req, reply) => { // Получает список юзеров на странице пользователей
      const users = await app.objection.models.user.query(); // Запрос к БД
      reply.render('users/index', { users }); // Рендер страницы со списком
      return reply;
    })
    .get('/users/new', { name: 'newUser' }, (req, reply) => { // Запрос к странице регистрации юзера
      const user = new app.objection.models.user(); // Не понятна строчка, отдает пустой массив
      console.log('USER:', user);
      reply.render('users/new', { user });
    })
    .post('/users', async (req, reply) => {
      const user = new app.objection.models.user();
      user.$set(req.body.data);

      try {
        const validUser = await app.objection.models.user.fromJson(req.body.data);
        console.log('VALID-USER', validUser);
        await app.objection.models.user.query().insert(validUser);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect(app.reverse('root'));
      } catch (err) {
        console.log('ERROR-DATA:', err);
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user, errors: {} });
      }

      return reply;
    });
};
