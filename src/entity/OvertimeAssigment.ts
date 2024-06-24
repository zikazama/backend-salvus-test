import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class OvertimeAssignment {
  @PrimaryGeneratedColumn()
  overtime_assigment_id: number;

  @Column()
  overtime_date: Date;

  @Column()
  kasir_id: number;

  @Column()
  admin_id: number;

  @Column()
  overtime_hour: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
