import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Menu } from '../entity/Menu';

define(Menu, (faker: typeof Faker) => {
  const menu = new Menu();
  menu.menu_name = faker.random.word();
  menu.menu_description = faker.random.word();
  menu.price = faker.random.number();  
  menu.quantity = faker.random.number();  
  return menu;
});
