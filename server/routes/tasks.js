// @ts-check
import i18next from 'i18next';

export default (app) => {
  app
    .get('/tasks', { name: 'getTasks', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.user;
      const {
        executor, status, label, isCreatorUser,
      } = req.query;

      const tasksQuery = app.objection.models.task.query().withGraphJoined('[creator, executor, status, labels]');

      tasksQuery.skipUndefined().modify('filterExecutor', executor || undefined);
      tasksQuery.skipUndefined().modify('filterStatus', status || undefined);
      tasksQuery.skipUndefined().modify('filterLabel', label || undefined);

      if (isCreatorUser === 'on') {
        tasksQuery.skipUndefined().modify('filterCreator', id || undefined);
      }

      const [tasks, users, statuses, labels] = await Promise.all([
        tasksQuery,
        app.objection.models.user.query(),
        app.objection.models.status.query(),
        app.objection.models.label.query(),
      ]);

      reply.render('tasks/index', {
        tasks, statuses, users, labels,
      });
      return reply;
    })
    .get('/tasks/new', { name: 'newTask', preValidation: app.authenticate }, async (req, reply) => {
      const task = new app.objection.models.task();
      const [users, statuses, labels] = await Promise.all([
        app.objection.models.user.query(),
        app.objection.models.status.query(),
        app.objection.models.label.query(),
      ]);
      reply.render('tasks/new', {
        task, statuses, users, labels,
      });
      return reply;
    })
    .post('/tasks', { name: 'createTask', preValidation: app.authenticate }, async (req, reply) => {
      const { id: creatorId } = req.user;
      const task = new app.objection.models.task();
      const {
        name, description, statusId, executorId, labels: labelsList = [],
      } = req.body.data;
      const taskData = {
        name,
        description,
        statusId: Number(statusId),
        executorId: Number(executorId),
        creatorId,
      };
      const labelIds = [...labelsList].map((id) => ({ id: parseInt(id, 10) }));
      task.$set({ ...taskData, labels: labelIds });
      try {
        const validTask = await app.objection.models.task.fromJson(taskData);
        await app.objection.models.task.transaction(async (trx) => {
          const newTask = {
            ...validTask,
            labels: labelIds,
          };
          const insertTask = await app.objection.models.task.query(trx).insertGraph(newTask, { relate: ['labels'] });
          return insertTask;
        });
        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('getTasks'));
      } catch ({ data }) {
        const [users, statuses, labels] = await Promise.all([
          app.objection.models.user.query(),
          app.objection.models.status.query(),
          app.objection.models.label.query(),
        ]);
        req.flash('error', i18next.t('flash.tasks.create.error'));
        reply.render('tasks/new', {
          task, statuses, users, labels, errors: data,
        });
      }

      return reply;
    })
    .get('/tasks/:id', { name: 'taskPage', preValidation: app.authenticate }, async (req, reply) => {
      const taskId = Number(req.params.id);
      const task = await app.objection.models.task.query().withGraphJoined('[creator, executor, status, labels]').findById(taskId);

      reply.render('tasks/task', { task });
      return reply;
    })
    .get('/tasks/:id/edit', { name: 'editTask', preValidation: app.authenticate }, async (req, reply) => {
      const taskId = Number(req.params.id);
      const task = await app.objection.models.task.query().withGraphJoined('labels').findById(taskId);
      const [users, statuses, labels] = await Promise.all([
        app.objection.models.user.query(),
        app.objection.models.status.query(),
        app.objection.models.label.query(),
      ]);

      reply.render('tasks/edit', {
        task, statuses, users, labels,
      });
      return reply;
    })
    .patch('/tasks/:id', { name: 'updateTask', preValidation: app.authenticate }, async (req, reply) => {
      const { id: creatorId } = req.user;
      const taskId = Number(req.params.id);

      const task = new app.objection.models.task();

      const {
        name, description, statusId, executorId, labels: labelsList = [],
      } = req.body.data;
      const taskData = {
        name,
        description,
        statusId: Number(statusId),
        executorId: Number(executorId),
        creatorId,
      };
      const labelIds = [...labelsList].map((id) => ({ id: parseInt(id, 10) }));
      task.$set({ ...taskData, labels: labelIds });
      try {
        const validTask = await app.objection.models.task.fromJson(taskData);
        await app.objection.models.task.transaction(async (trx) => {
          const updatedTask = {
            id: taskId,
            ...validTask,
            labels: labelIds,
          };
          const insertTask = await app.objection.models.task.query(trx)
            .upsertGraph(updatedTask, { relate: true, unrelate: true });
          return insertTask;
        });
        req.flash('info', i18next.t('flash.tasks.update.success'));
        reply.redirect(app.reverse('getTasks'));
      } catch ({ data }) {
        const [users, statuses, labels] = await Promise.all([
          app.objection.models.user.query(),
          app.objection.models.status.query(),
          app.objection.models.label.query(),
        ]);
        req.flash('error', i18next.t('flash.tasks.update.error'));
        reply.render('tasks/edit', {
          task, statuses, users, labels, errors: data,
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
        await app.objection.models.task.transaction(async (trx) => {
          await task.$relatedQuery('labels', trx).unrelate();
          await task.$query(trx).delete();
        });
        req.flash('info', i18next.t('flash.tasks.delete.success'));
        reply.redirect(app.reverse('getTasks'));
      } catch (err) {
        req.flash('error', i18next.t('flash.tasks.delete.error'));
        reply.redirect(app.reverse('getTasks'));
      }

      return reply;
    });
};
