import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';


@Entity()
export class TransactionItem {
    @PrimaryGeneratedColumn()
    transaction_item_id: number;

    @Column()
    transaction_id: number;

    @Column()
    menu_id: number;

    @Column()
    quantity: number;

    @Column()
    subtotal: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
