import { faker } from '@faker-js/faker';
import _ from 'lodash';
import encrypt from '../../server/lib/secure.cjs';

const DATA_GENERATORS = {
  user: () => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }),
  status: () => ({
    title: faker.word.noun(),
  }),
};

const generateData = (type, length = 1) => {
  const data = [];
  const generator = DATA_GENERATORS[type];

  Array.from({ length }).forEach(() => {
    data.push(generator());
  });

  return data;
};

const generateUsers = () => {
  const newUser = generateData('user', 1);
  const users = generateData('user', 3);
  const seeds = users.map((user) => ({
    ..._.omit(user, 'password'),
    passwordDigest: encrypt(user.password),
  }));
  return {
    new: newUser[0],
    existing: {
      creator: users[0],
      executor: users[1],
      forDelete: users[2],
    },
    seeds,
  };
};

const generateStatuses = () => {
  const newStatus = generateData('status', 1);
  const statuses = generateData('status', 2);
  return {
    new: newStatus[0],
    existing: {
      update: statuses[0],
      delete: statuses[1],
    },
    seeds: statuses,
  };
};

export { generateUsers, generateStatuses };
