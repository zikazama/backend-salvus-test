import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class OvertimeAssignment {
  @PrimaryGeneratedColumn()
  overtime_assigment_id: number;

  @Column()
  overtime_assigment_uid: string;

  @Column()
  overtime_date: Date;

  @Column()
  cashier_uid: string;

  @Column()
  admin_uid: string;

  @Column()
  overtime_hour: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
