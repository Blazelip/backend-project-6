// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/tasks', { name: 'getTasks', preValidation: app.authenticate }, async (req, reply) => {
      const tasks = await app.objection.models.task.query().withGraphJoined('[creator, executor, status, labels]');
      console.log("🚀 ~ file: tasks.js:9 ~ .get ~ tasks", tasks);
      reply.render('tasks/index', { tasks });
      return reply;
    })
    .get('/tasks/new', { name: 'newTask', preValidation: app.authenticate }, async (req, reply) => {
      const task = new app.objection.models.task();
      const statuses = await app.objection.models.status.query();
      const users = await app.objection.models.user.query();
      const labels = await app.objection.models.label.query();
      console.log("🚀 ~ file: tasks.js:18 ~ .get ~ labels", labels);
      reply.render('tasks/new', {
        task, statuses, users, labels,
      });
      return reply;
    })
    .post('/tasks', { name: 'createTask', preValidation: app.authenticate }, async (req, reply) => {
      const { id: creatorId } = req.user;
      const task = new app.objection.models.task();
      const {
        name,
        description,
        statusId,
        executorId,
      } = req.body.data;
      const taskData = {
        name,
        description,
        statusId: Number(statusId),
        executorId: Number(executorId),
        creatorId,
      };
      task.$set(taskData);
      try {
        const validTask = await app.objection.models.task.fromJson(taskData);
        await app.objection.models.task.query().insert(validTask);
        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('getTasks'));
      } catch ({ data }) {
        const statuses = await app.objection.models.status.query();
        const users = await app.objection.models.user.query();
        req.flash('error', i18next.t('flash.tasks.create.error'));
        reply.render('tasks/new', {
          task,
          statuses,
          users,
          errors: data,
        });
      }

      return reply;
    })
    .get('/tasks/:id', { name: 'taskPage', preValidation: app.authenticate }, async (req, reply) => {
      const taskId = Number(req.params.id);
      const task = await app.objection.models.task.query().withGraphJoined('[creator, executor, status]').findById(taskId);

      reply.render('tasks/task', { task });
      return reply;
    })
    .get('/tasks/:id/edit', { name: 'editTask', preValidation: app.authenticate }, async (req, reply) => {
      const taskId = Number(req.params.id);
      const task = await app.objection.models.task.query().findById(taskId);
      const statuses = await app.objection.models.status.query();
      const users = await app.objection.models.user.query();

      reply.render('tasks/edit', { task, statuses, users });
      return reply;
    })
    .patch('/tasks/:id', { name: 'updateTask', preValidation: app.authenticate }, async (req, reply) => {
      const { id: creatorId } = req.user;
      const taskId = Number(req.params.id);

      const task = await app.objection.models.task.query().findById(taskId);

      const {
        name,
        description,
        statusId,
        executorId,
      } = req.body.data;
      const taskData = {
        name,
        description,
        statusId: Number(statusId),
        executorId: Number(executorId),
        creatorId,
      };
      try {
        const validTask = await app.objection.models.task.fromJson(taskData);
        await task.$query().update(validTask);
        req.flash('info', i18next.t('flash.tasks.update.success'));
        reply.redirect(app.reverse('getTasks'));
      } catch ({ data }) {
        const statuses = await app.objection.models.status.query();
        const users = await app.objection.models.user.query();
        req.flash('error', i18next.t('flash.tasks.update.error'));
        reply.render('tasks/edit', {
          task,
          statuses,
          users,
          errors: data,
        });
      }

      return reply;
    })
    .delete('/tasks/:id', { name: 'deleteTask', preValidation: app.authenticate }, async (req, reply) => {
      const { id: currentUser } = req.user;
      const taskId = Number(req.params.id);

      const task = await app.objection.models.task.query().findById(taskId);

      if (currentUser !== task.creatorId) {
        req.flash('error', i18next.t('flash.tasks.delete.noAccess'));
        return reply.redirect(app.reverse('getTasks'));
      }

      try {
        await app.objection.models.task.query().deleteById(taskId);
        req.flash('info', i18next.t('flash.tasks.delete.success'));
        reply.redirect(app.reverse('getTasks'));
      } catch (err) {
        req.flash('error', i18next.t('flash.tasks.delete.error'));
        reply.redirect(app.reverse('getTasks'));
      }

      return reply;
    });
};
