// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/labels', { name: 'getLabels', preValidation: app.authenticate }, async (req, reply) => {
      const labels = await app.objection.models.label.query();
      reply.render('labels/index', { labels });
      return reply;
    })
    .get('/labels/new', { name: 'newLabel', preValidation: app.authenticate }, async (req, reply) => {
      const label = new app.objection.models.label();
      reply.render('labels/new', { label });
      return reply;
    })
    .post('/labels', { name: 'createLabel', preValidation: app.authenticate }, async (req, reply) => {
      const label = new app.objection.models.label();
      label.$set(req.body.data);

      try {
        const validLabel = await app.objection.models.label.fromJson(req.body.data);
        await app.objection.models.label.query().insert(validLabel);
        req.flash('info', i18next.t('flash.labels.create.success'));
        reply.redirect(app.reverse('getLabels'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.labels.create.error'));
        reply.render('/labels/new', { label, errors: data });
      }

      return reply;
    })
    .get('/labels/:id/edit', { name: 'editLabel', preValidation: app.authenticate }, async (req, reply) => {
      const labelId = Number(req.params.id);
      const label = await app.objection.models.label.query().findById(labelId);

      reply.render('labels/edit', { label });
      return reply;
    })
    .patch('/labels/:id', { name: 'updateLabel', preValidation: app.authenticate }, async (req, reply) => {
      const labelId = Number(req.params.id);
      const label = await app.objection.models.label.query().findById(labelId);

      try {
        const validLabel = await app.objection.models.label.fromJson(req.body.data);
        await label.$query().update(validLabel);
        req.flash('info', i18next.t('flash.labels.update.success'));
        reply.redirect(app.reverse('getLabels'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.labels.update.error'));
        reply.render('labels/edit', { label, errors: data });
      }
      return reply;
    })
    .delete('/labels/:id', { name: 'deleteLabel', preValidation: app.authenticate }, async (req, reply) => {
      const labelId = Number(req.params.id);

      const label = await app.objection.models.label.query().findById(labelId);
      const labelTasks = await label.$relatedQuery('tasks');

      if (labelTasks.length) {
        req.flash('error', i18next.t('flash.labels.delete.noAccess'));
        return reply.redirect(app.reverse('getLabels'));
      }

      try {
        await app.objection.models.label.query().deleteById(labelId);
        req.flash('info', i18next.t('flash.labels.delete.success'));
      } catch (err) {
        req.flash('error', i18next.t('flash.labels.delete.error'));
      }

      reply.redirect(app.reverse('getLabels'));
      return reply;
    });
};
