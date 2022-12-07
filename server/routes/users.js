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
    .get('/users/:id/edit', { name: 'editUser', preValidation: app.authenticate }, async (req, reply) => {
      const userId = Number(req.params.id);
      const currentUser = req.user;

      if (userId !== currentUser.id) {
        req.flash('error', i18next.t('flash.users.update.noAccess'));
        return reply.redirect(app.reverse('users'));
      }

      const user = await app.objection.models.user.query().findById(userId);
      reply.render('users/edit', { user });
      return reply;
    })
    .patch('/users/:id', { name: 'updateUser', preValidation: app.authenticate }, async (req, reply) => {
      const userId = Number(req.params.id);
      const user = await app.objection.models.user.query().findById(userId);

      try {
        const validUser = await app.objection.models.user.fromJson(req.body.data);
        await user.$query().update(validUser);
        req.flash('info', i18next.t('flash.users.update.success'));
        reply.redirect(app.reverse('users'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.users.update.error'));
        reply.render('users/edit', { user, errors: data });
      }

      return reply;
    })
    .delete('/users/:id', { name: 'deleteUser', preValidation: app.authenticate }, async (req, reply) => {
      const userId = Number(req.params.id);
      const currentUser = req.user;

      if (userId !== currentUser.id) {
        req.flash('error', i18next.t('flash.users.delete.noAccess'));
        return reply.redirect(app.reverse('users'));
      }

      const user = await app.objection.models.user.query().findById(userId);
      const userTasks = await user.$relatedQuery('tasks');

      if (userTasks.length) {
        req.flash('error', i18next.t('flash.users.delete.noRemove'));
        return reply.redirect(app.reverse('users'));
      }

      try {
        await app.objection.models.user.query().deleteById(userId);
        req.logOut();
        req.flash('info', i18next.t('flash.users.delete.success'));
        reply.redirect(app.reverse('users'));
      } catch (err) {
        req.flash('error', i18next.t('flash.users.delete.error'));
        reply.redirect(app.reverse('users'));
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
        await req.logIn(validUser);
        reply.redirect(app.reverse('root'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user, errors: data });
      }

      return reply;
    });
};
