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
      const user = new app.objection.models.user(); // Создает пустой экземпляр модели user
      reply.render('users/new', { user });// Рендерит форму создания с данными user
    })
    .get('/users/:id/edit', { name: 'editUser' }, async (req, reply) => {
      const { id } = req.params;
      const user = await app.objection.models.user.query().findById(id);
      reply.render('users/edit', { user });
      return reply;
    })
    .patch('/users/:id', { name: 'updateUser' }, async (req, reply) => {
      const user = new app.objection.models.user();
      user.$set(req.body.data);
      const { id } = req.params;

      try {
        const validUser = await app.objection.models.user.fromJson(req.body.data);
        console.log('VALID-USER:', validUser);
        const result = await app.objection.models.user.query().findById(id).patch(validUser);
        console.log('PATCH-RESULT', result);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect(app.reverse('users'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/edit', { user, errors: data });
      }

      return reply;
    })
    .post('/users', async (req, reply) => {
      const user = new app.objection.models.user();
      user.$set(req.body.data);

      try {
        const validUser = await app.objection.models.user.fromJson(req.body.data);
        await app.objection.models.user.query().insert(validUser);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect(app.reverse('root'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user, errors: data });
      }

      return reply;
    });
};
