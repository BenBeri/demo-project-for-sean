import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Role} from "../../enums/role.enum";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({unique: true})
    username: string;

    @Column({unique: true})
    email: string;

    @Column({type: 'varchar'})
    role: Role;

    @Column()
    hash: string;

    @Column()
    salt: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}
