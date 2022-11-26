// @ts-check

import {
  describe, beforeAll, it, expect,
} from '@jest/globals';

import fastify from 'fastify';
import init from '../server/plugin.js';

describe('requests', () => {
  let app;

  // Инициализирует инстанс сервера и подключает к нему все написанные
  // настройки и плагины
  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: 'pino-pretty' },
    });
    await init(app);
  });

  // Проверяет запрос к главной странице
  it('GET 200', async () => {
    const res = await app.inject({
      method: 'GET',
      url: app.reverse('root'),
    });
    expect(res.statusCode).toBe(200);
  });

  // Проверяет ответ к несуществующей странице
  it('GET 404', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/wrong-path',
    });
    expect(res.statusCode).toBe(404);
  });

  // Убивает сервер
  afterAll(async () => {
    await app.close();
  });
});
