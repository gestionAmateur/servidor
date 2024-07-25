import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { EquipoCompetitivo } from '@/entities/EquipoCompetitivoEntity';
import { CuentaInvocador } from '@/entities/CuentaInvocadorEntity';
import { HistorialEquipo } from '@/entities/HistorialEquipoEntity';

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 64, unique: true })
    discordId!: string;

    @Column({ type: 'varchar', length: 128 })
    nombre!: string;

    @Column({ type: 'varchar', length: 128, nullable: true })
    email?: string;

    @ManyToOne(() => EquipoCompetitivo, (equipo) => equipo.usuarios, {
        nullable: true,
    })
    equipoActual?: EquipoCompetitivo;

    @OneToMany(() => CuentaInvocador, (cuenta) => cuenta.usuario)
    cuentasInvocador!: CuentaInvocador[];

    @OneToMany(() => HistorialEquipo, (historial) => historial.usuario)
    historial!: HistorialEquipo[];
}
