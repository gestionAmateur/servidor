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

    @Column({ type: 'varchar', length: 32 })
    nombreInvocador!: string;

    @Column({ type: 'varchar', length: 5 })
    tagInvocador!: string;

    @Column({ type: 'varchar', length: 12 })
    posicionInvocador!: string;

    @Column({ type: 'varchar', length: 128 })
    puuid!: string;

    @Column({ type: 'varchar', length: 128 })
    cuentaId!: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.cuentasInvocador)
    usuario!: Usuario;

    @OneToMany(() => Participante, (participante) => participante.cuenta)
    participantes!: Participante[];
}
