import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { TransactionItem } from './TransactionItem';


@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    transaction_id: number;

    @Column()
    transaction_uid: string;

    @Column()
    total_transaction: number;

    @Column()
    cashier_uid: string;

    @OneToMany(() => TransactionItem, (transactionItem) => transactionItem.transaction_uid)
    @JoinColumn({ name: 'transaction_uid', referencedColumnName: 'transaction_uid' })
    public transaction_items: TransactionItem[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
