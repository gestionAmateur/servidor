import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CuentaInvocador } from '@/entities/CuentaInvocadorEntity';

@Entity('historial_rangos')
export class HistorialRangos {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 64 })
    leagueId!: string;

    @Column({ type: 'varchar', length: 32 })
    queueType!: string;

    @Column({ type: 'varchar', length: 16 })
    tier!: string;

    @Column({ type: 'varchar', length: 8 })
    rank!: string;

    @Column({ type: 'varchar', length: 64 })
    summonerId!: string;

    @Column({ type: 'int' })
    leaguePoints!: number;

    @Column({ type: 'int' })
    wins!: number;

    @Column({ type: 'int' })
    losses!: number;

    @Column({ type: 'boolean' })
    veteran!: boolean;

    @Column({ type: 'boolean' })
    inactive!: boolean;

    @Column({ type: 'boolean' })
    freshBlood!: boolean;

    @Column({ type: 'boolean' })
    hotStreak!: boolean;

    @Column({ type: 'bigint' })
    fechaRegistro!: number;

    @ManyToOne(
        () => CuentaInvocador,
        (cuentaInvocador) => cuentaInvocador.historialRangos,
    )
    cuentaInvocador!: CuentaInvocador;
}
