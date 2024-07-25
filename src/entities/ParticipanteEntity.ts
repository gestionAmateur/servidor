import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Partida } from '@/entities/PartidaEntity';
import { CuentaInvocador } from '@/entities/CuentaInvocadorEntity';
import { EquipoCompetitivo } from '@/entities/EquipoCompetitivoEntity';

@Entity('participantes')
export class Participante {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Partida, (partida) => partida.participantes)
    partida!: Partida;

    @ManyToOne(() => EquipoCompetitivo, (equipo) => equipo.participantes)
    equipo?: EquipoCompetitivo;

    @Column({ type: 'varchar', length: 64, nullable: true })
    puuid?: string;

    @ManyToOne(() => CuentaInvocador, (cuenta) => cuenta.participantes, {
        nullable: true,
    })
    cuenta?: CuentaInvocador;

    @Column({ type: 'varchar', length: 64, nullable: true })
    summonerId?: string;

    @Column({ type: 'varchar', length: 128, nullable: true })
    summonerName?: string;

    @Column({ type: 'tinyint', unsigned: true, nullable: true })
    summonerLevel?: number;

    @Column({ type: 'int', unsigned: true, nullable: true })
    championId?: number;

    @Column({ type: 'varchar', length: 24, nullable: true })
    championName?: string;

    @Column({ type: 'varchar', length: 24, nullable: true })
    role?: string;

    @Column({ type: 'varchar', length: 24, nullable: true })
    lane?: string;

    @Column({ type: 'int', unsigned: true, nullable: true })
    kills?: number;

    @Column({ type: 'int', unsigned: true, nullable: true })
    deaths?: number;

    @Column({ type: 'int', unsigned: true, nullable: true })
    assists?: number;

    @Column({ type: 'int', unsigned: true, nullable: true })
    totalDamageDealt?: number;

    @Column({ type: 'int', unsigned: true, nullable: true })
    totalDamageDealtToChampions?: number;

    @Column({ type: 'int', unsigned: true, nullable: true })
    totalDamageTaken?: number;

    @Column({ type: 'int', unsigned: true, nullable: true })
    totalHeal?: number;

    @Column({ type: 'int', unsigned: true, nullable: true })
    visionScore?: number;

    @Column({ type: 'int', unsigned: true, nullable: true })
    goldEarned?: number;

    @Column({ type: 'int', unsigned: true, nullable: true })
    goldSpent?: number;

    @Column({ type: 'boolean', nullable: true })
    win?: boolean;
}
