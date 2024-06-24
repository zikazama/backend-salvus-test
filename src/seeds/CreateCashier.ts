import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import bcrypt from 'bcrypt';
import { Cashier } from '../entity/Cashier';
import { v4 as uuidv4 } from 'uuid';

export default class CreateCashiers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Cashier)()
      .map(async (cashier: Cashier) => {
        cashier.cashier_uid = uuidv4();
        cashier.password = await bcrypt.hash('123456', 10); // Hash password
        return cashier;
      })
      .createMany(3);
  }
}
