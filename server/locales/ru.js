// @ts-check

export default {
  translation: {
    appName: 'Fastify Шаблон',
    flash: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный емейл или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
        update: {
          error: 'Не удалось обновить',
          success: 'Данные юзера успешно обновлены',
        },
        delete: {
          error: 'Не удалось удалить пользователя',
          success: 'Пользователь успешно удален',
        },
      },
      statuses: {
        create: {
          error: 'Ошибка при создании статуса',
          success: 'Статус успешно создан',
        },
        update: {
          error: 'Ошибка при изменении статуса',
          success: 'Статус успешно обновлен',
        },
        delete: {
          error: 'Ошибка при удалении статуса',
          success: 'Статус успешно удален',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
      noAccess: 'У вас нет прав для редактирования этого пользователя',
    },
    layouts: {
      application: {
        users: 'Пользователи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
        statuses: {
          title: 'Статусы',
        },
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Вход',
          submit: 'Войти',
        },
      },
      users: {
        id: 'ID',
        fullName: 'Полное имя',
        email: 'Email',
        createdAt: 'Дата создания',
        actions: 'Действия',
        action: {
          change: 'Изменить',
          delete: 'Удалить',
        },
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
        },
        edit: 'Изменение пользователя',
      },
      welcome: {
        index: {
          hello: 'Привет от Хекслета!',
          description: 'Практические курсы по программированию',
          more: 'Узнать Больше',
        },
      },
      form: {
        placeholders: {
          firstName: 'Имя',
          lastName: 'Фамилия',
          email: 'Email',
          password: 'Пароль',
          title: 'Наименование',
        },
      },
      statuses: {
        navTitle: 'Статусы',
        createBtn: 'Создать статус',
        table: {
          id: 'ID',
          title: 'Наименование',
          createdAt: 'Дата создания',
          actions: 'Действия',
          action: {
            change: 'Изменить',
            delete: 'Удалить',
          },
        },
        new: {
          title: 'Создание статуса',
          sumbit: 'Создать',
        },
        edit: {
          title: 'Изменение статуса',
          submit: 'Изменить',
        },
      },
    },
  },
};
