import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Cashier } from '../entity/Cashier';

define(Cashier, (faker: typeof Faker) => {
  const cashier = new Cashier();
  cashier.email = faker.internet.email();
  cashier.username = faker.internet.userName();
  cashier.password = faker.internet.password(); 
  return cashier;
});
