import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Usuario } from '@/entities/UsuarioEntity';
import { Participante } from '@/entities/ParticipanteEntity';

@Entity('cuentas_invocador')
export class CuentaInvocador {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 128 })
    cuentaId!: string;

    @Column({ type: 'varchar', length: 128 })
    nombreInvocador!: string;

    @Column({ type: 'tinyint', unsigned: true, nullable: true })
    nivelInvocador?: number;

    @Column({ type: 'varchar', length: 64 })
    puuid!: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.cuentasInvocador)
    usuario!: Usuario;

    @OneToMany(() => Participante, (participante) => participante.cuenta)
    participantes!: Participante[];
}
