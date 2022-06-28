import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn('uuid')
    uid: string;
    @Column()
    firstName: string
    @Column()
    lastName: string
    @Column({default: false})
    checkpoint1: boolean
    @Column({default: false})
    checkpoint2: boolean
    @Column({default: false})
    checkpoint3: boolean
    @Column({default: false})
    checkpoint4: boolean
    @Column({default: false})
    checkpoint5: boolean
    @Column({default: false})
    checkpoint6: boolean
    @Column({default: false})
    checkpoint7: boolean
    @Column({default: false})
    checkpoint8: boolean
    @Column({default: false})
    checkpoint9: boolean
    @Column({default: false})
    checkpoint10: boolean
    @Column({ type: 'timestamp', default: () => 'NOW()'})
    createdAt: Date
}