// @ts-check

export default {
  translation: {
    appName: 'Task manager',
    flash: {
      session: {
        create: {
          success: 'You are logged in',
          error: 'Wrong email or password',
        },
        delete: {
          success: 'You are logged out',
        },
      },
      users: {
        create: {
          error: 'Failed to register',
          success: 'User registered successfully',
        },
        update: {
          error: 'Failed to update',
          success: 'User is successfully updated',
          noAccess: "You don't have rights to edit the user",
        },
        delete: {
          error: 'Failed to delete',
          success: 'User is successfully deleted',
          noAccess: "You don't have rights to delete the user",
          noRemove: 'Impossible to delete user, having tasks',
        },
      },
      statuses: {
        create: {
          error: 'Failed to create status',
          success: 'Status created successfully',
        },
        update: {
          error: 'Failed to update status',
          success: 'Status updated successfully',
        },
        delete: {
          error: 'Failed to delete status',
          success: 'Status deleted successfully',
          noAccess: 'Impossible to delete status, used in tasks',
        },
      },
      labels: {
        create: {
          error: 'Failed to create label',
          success: 'Label created successfully',
        },
        update: {
          error: 'Failed to update label',
          success: 'Label updated successfully',
        },
        delete: {
          error: 'Failed to delete label',
          success: 'Label deleted successfully',
          noAccess: 'Impossible to delete label, used in tasks',
        },
      },
      tasks: {
        create: {
          error: 'Failed to create task',
          success: 'Task created successfully',
        },
        update: {
          error: 'Failed to update task',
          success: 'Task updated successfully',
        },
        delete: {
          error: 'Failed to delete task',
          success: 'Task deleted successfully',
          noAccess: "You don't have rights to delete the task",
        },
      },
      authError: 'Access denied! Please login',
    },
    layouts: {
      application: {
        users: 'Users',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
        nav: {
          statuses: 'Statuses',
          labels: 'Labels',
          tasks: 'Tasks',
        },
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Login',
          submit: 'Login',
        },
      },
      users: {
        id: 'ID',
        fullName: 'Full name',
        email: 'Email',
        createdAt: 'Created at',
        actions: 'Actions',
        action: {
          change: 'Сhange',
          delete: 'Delete',
        },
        new: {
          submit: 'Sign up',
          signUp: 'Sign up',
        },
        edit: 'User edit',
      },
      welcome: {
        index: {
          hello: 'Hello from Hexlet!',
          description: 'Online programming school',
          more: 'Learn more',
        },
      },
      form: {
        placeholders: {
          firstName: 'Firstname',
          lastName: 'Lastname',
          email: 'Email',
          password: 'Password',
          title: 'Title',
          name: 'Name',
          description: 'Description',
          statusId: 'Status',
          executorId: 'Executor',
          labelId: 'Labels',
        },
      },
      statuses: {
        title: 'Statuses',
        createBtn: 'Create status',
        table: {
          id: 'ID',
          title: 'Title',
          createdAt: 'Created at',
          actions: 'Actions',
          action: {
            change: 'Сhange',
            delete: 'Delete',
          },
        },
        new: {
          title: 'Status creation',
          submit: 'Create',
        },
        edit: {
          title: 'Status edit',
          submit: 'Edit',
        },
      },
      labels: {
        title: 'Labels',
        createBtn: 'Create label',
        table: {
          id: 'ID',
          name: 'Title',
          createdAt: 'Created at',
          actions: 'Actions',
          action: {
            change: 'Сhange',
            delete: 'Delete',
          },
        },
        new: {
          title: 'Label creation',
          submit: 'Create',
        },
        edit: {
          title: 'Label edit',
          submit: 'Edit',
        },
      },
      tasks: {
        title: 'Tasks',
        createBtn: 'Create task',
        table: {
          id: 'ID',
          name: 'Name',
          status: 'Status',
          author: 'Author',
          executor: 'Executor',
          createdAt: 'Created at',
          actions: 'Actions',
          action: {
            change: 'Edit',
            delete: 'Delete',
          },
        },
        new: {
          title: 'Task creation',
          submit: 'Create',
        },
        edit: {
          title: 'Task edit',
          submit: 'Edit',
        },
        page: {
          creator: 'Author',
          executor: 'Executor',
          createdAt: 'Created at',
          action: {
            change: 'Edit',
            delete: 'Delete',
          },
        },
      },
    },
  },
};
