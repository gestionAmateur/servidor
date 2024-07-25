import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { Usuario } from '@/entities/UsuarioEntity';

@Entity('sesiones')
export class Sesion {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 164, unique: true })
    token!: string;

    @Column({ type: 'int', unsigned: true })
    createdAt!: number;

    @Column({ type: 'int', unsigned: true })
    expiredAt!: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.sesiones, { nullable: false })
    usuario!: Usuario;
}
