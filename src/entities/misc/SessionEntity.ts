import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { Usuario } from '@/entities/UsuarioEntity';

@Entity('sessions')
export class Session {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.sessions)
    usuario!: Usuario;

    @Column({ type: 'varchar', length: 255 })
    token!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @Column({ type: 'timestamp' })
    expiresAt!: Date;
}
