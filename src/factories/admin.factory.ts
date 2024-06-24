import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Admin } from '../entity/Admin';

define(Admin, (faker: typeof Faker) => {
  const admin = new Admin();
  admin.email = faker.internet.email();
  admin.username = faker.internet.userName();
  admin.password = faker.internet.password(); // You should hash this password
  return admin;
});
