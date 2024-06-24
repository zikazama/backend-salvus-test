import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Menu } from '../entity/Menu';

export default class CreateMenus implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Menu)()
      .map(async (menu: Menu) => {
        menu.menu_uid = uuidv4();
        return menu;
      })
      .createMany(30);
  }
}
