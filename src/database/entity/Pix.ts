import {
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    UpdateDateColumn
} from "typeorm";

import User from "./User";

@Entity()
class Pix{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    status: string;

    @Column()
    value: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    requestingUser: User;

    @ManyToOne(() => User, user => user.id, {nullable: true})
    @JoinColumn()
    payingUser: User;
}

export default Pix;