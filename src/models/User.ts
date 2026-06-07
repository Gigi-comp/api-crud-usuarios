import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
@Entity("user")
export class User {
@PrimaryGeneratedColumn()
id!: number;

@Column()
nome!: string;
@Column()
email!: string;
@Column()
senha!: string;
@Column()
idade!: number;
@CreateDateColumn()
createdAt!: Date;
@UpdateDateColumn()
updatedAt!: Date;
}

