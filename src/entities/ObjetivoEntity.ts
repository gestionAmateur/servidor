import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EquipoCompetitivo } from '@/entities/EquipoCompetitivoEntity';

@Entity('objetivos')
export class Objetivo {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => EquipoCompetitivo, (equipo) => equipo.objetivos)
    equipo!: EquipoCompetitivo;

    @Column({ type: 'varchar', length: 64, nullable: true })
    type?: string;

    @Column({ type: 'boolean', nullable: true })
    first?: boolean;

    @Column({ type: 'int', unsigned: true, nullable: true })
    kills?: number;
}
