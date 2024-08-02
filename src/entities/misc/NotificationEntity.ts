import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Usuario } from '@/entities/UsuarioEntity';

@Entity('notificaciones')
export class Notificacion {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    titulo!: string;

    @Column({ type: 'text' })
    descripcion!: string;

    @ManyToOne(() => Usuario, { nullable: false })
    @JoinColumn({ name: 'enviadoPor' })
    enviadoPor!: Usuario;

    @Column({ type: 'boolean', default: false })
    leida!: boolean;

    @Column({ type: 'boolean', default: false })
    borrada!: boolean;

    @ManyToOne(() => Usuario, (usuario) => usuario.notificaciones)
    usuario!: Usuario;
}
