import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    OneToMany,
} from 'typeorm';
import { EquipoCompetitivo } from '@/entities/EquipoCompetitivoEntity';
import { CuentaInvocador } from '@/entities/CuentaInvocadorEntity';
import { HistorialEquipo } from '@/entities/HistorialEquipoEntity';
import { Sesion } from '@/entities/misc/SesionEntity';

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 64, unique: true })
    discordId!: string;

    @Column({ type: 'varchar', length: 64, unique: true })
    discordAvatar!: string;

    @Column({ type: 'varchar', length: 128 })
    nombre!: string;

    @Column({ type: 'varchar', length: 128, nullable: true })
    email?: string;

    @Column({ type: 'int', nullable: false, default: 0 })
    rol?: number;

    @Column({ type: 'json', nullable: true })
    redesSociales?: {
        twitter?: string;
        twitch?: string;
        instagram?: string;
        discord?: string;
    };

    @ManyToMany(() => EquipoCompetitivo, (equipo) => equipo.usuarios)
    @JoinTable()
    equipos!: EquipoCompetitivo[];

    @OneToMany(() => CuentaInvocador, (cuenta) => cuenta.usuario)
    cuentasInvocador!: CuentaInvocador[];

    @OneToMany(() => HistorialEquipo, (historial) => historial.usuario)
    historial!: HistorialEquipo[];

    @OneToMany(() => Sesion, (sesion) => sesion.usuario)
    sesiones!: Sesion[];
}
