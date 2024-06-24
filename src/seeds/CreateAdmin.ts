import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Admin } from '../entity/Admin';
import bcrypt from 'bcrypt';

export default class CreateAdmins implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Admin)()
      .map(async (admin: Admin) => {
        admin.password = await bcrypt.hash('123456', 10); // Hash password
        return admin;
      })
      .createMany(3);
  }
}
