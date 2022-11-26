import { faker } from '@faker-js/faker';
import _ from 'lodash';
import encrypt from '../../server/lib/secure.cjs';
// import { faker } from '@faker-js/faker/locale/de';

const createRandomUser = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

const generateData = (length = 1) => {
  const data = [];

  Array.from({ length }).forEach(() => {
    data.push(createRandomUser());
  });

  return data;
};

const generateUsers = () => {
  const newUser = generateData(1);
  const users = generateData(3);
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

export { generateUsers };
