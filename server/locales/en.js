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
        },
        delete: {
          error: 'Failed to delete',
          success: 'User is successfully deleted',
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
        },
      },

      authError: 'Access denied! Please login',
      noAccess: "You can't edit the user",
    },
    layouts: {
      application: {
        users: 'Users',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
        statuses: {
          title: 'Statuses',
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
        },
      },
      statuses: {
        navTitle: 'Statuses',
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
    },
  },
};
