// @ts-check

export default {
  translation: {
    appName: 'Менеджер задач',
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
          noAccess: 'У вас нет прав для редактирования этого пользователя',
        },
        delete: {
          error: 'Не удалось удалить пользователя',
          success: 'Пользователь успешно удален',
          noAccess: 'У вас нет прав для удаления этого пользователя',
          noRemove: 'Нельзя удалить пользователя, имеющего задачи',
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
          noAccess: 'Нельзя удалить статус, используемый в задачах',
        },
      },
      labels: {
        create: {
          error: 'Ошибка при создании метки',
          success: 'Метка успешно создана',
        },
        update: {
          error: 'Ошибка при изменении метки',
          success: 'Метка успешно обновлена',
        },
        delete: {
          error: 'Ошибка при удалении метки',
          success: 'Метка успешно удалена',
          noAccess: 'Нельзя удалить метку, используемую в задачах',
        },
      },
      tasks: {
        create: {
          error: 'Ошибка при создании задачи',
          success: 'Задача успешно создана',
        },
        update: {
          error: 'Ошибка при редактировании задачи',
          success: 'Задача успешно изменена',
        },
        delete: {
          error: 'Ошибка при удалении задачи',
          success: 'Задача успешно удалена',
          noAccess: 'У вас нет прав для удаления этой задачи',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
    },
    layouts: {
      application: {
        users: 'Пользователи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
        nav: {
          statuses: 'Статусы',
          labels: 'Метки',
          tasks: 'Задачи',
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
          name: 'Наименование',
          description: 'Описание',
          statusId: 'Статус',
          executorId: 'Исполнитель',
          labels: 'Метки',
        },
        filter: {
          status: 'Статус',
          executor: 'Исполнитель',
          label: 'Метка',
          isCreatorUser: 'Только мои задачи',
          submit: 'Показать',
        },
      },
      statuses: {
        title: 'Статусы',
        createBtn: 'Создать статус',
        table: {
          id: 'ID',
          name: 'Наименование',
          createdAt: 'Дата создания',
          actions: 'Действия',
          action: {
            change: 'Изменить',
            delete: 'Удалить',
          },
        },
        new: {
          title: 'Создание статуса',
          submit: 'Создать',
        },
        edit: {
          title: 'Изменение статуса',
          submit: 'Изменить',
        },
      },
      labels: {
        title: 'Метки',
        createBtn: 'Создать метку',
        table: {
          id: 'ID',
          name: 'Наименование',
          createdAt: 'Дата создания',
          actions: 'Действия',
          action: {
            change: 'Изменить',
            delete: 'Удалить',
          },
        },
        new: {
          title: 'Создание метки',
          submit: 'Создать',
        },
        edit: {
          title: 'Изменение метки',
          submit: 'Изменить',
        },
      },
      tasks: {
        title: 'Задачи',
        createBtn: 'Создать задачу',
        table: {
          id: 'ID',
          name: 'Наименование',
          status: 'Статус',
          author: 'Автор',
          executor: 'Исполнитель',
          createdAt: 'Дата создания',
          actions: 'Действия',
          action: {
            change: 'Изменить',
            delete: 'Удалить',
          },
        },
        new: {
          title: 'Создание задачи',
          submit: 'Создать',
        },
        edit: {
          title: 'Изменение задачи',
          submit: 'Изменить',
        },
        page: {
          creator: 'Автор',
          executor: 'Исполнитель',
          createdAt: 'Дата создания',
          action: {
            change: 'Изменить',
            delete: 'Удалить',
          },
        },
      },
    },
  },
};
