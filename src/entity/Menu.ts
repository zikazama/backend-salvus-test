import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';


@Entity()
export class Menu {
    @PrimaryGeneratedColumn()
    menu_id: number;

    @Column()
    menu_uid: string;

    @Column()
    menu_name: string;

    @Column()
    menu_description: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
