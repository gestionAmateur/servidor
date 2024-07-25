import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EquipoCompetitivo } from '@/entities/EquipoCompetitivoEntity';

@Entity('bans')
export class Ban {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => EquipoCompetitivo, (equipo) => equipo.bans)
    equipo!: EquipoCompetitivo;

    @Column({ type: 'int', unsigned: true, nullable: true })
    championId?: number;

    @Column({ type: 'tinyint', unsigned: true })
    pickTurn!: number;
}
