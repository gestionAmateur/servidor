import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from '@/entities/UsuarioEntity';
import { Participante } from '@/entities/ParticipanteEntity';
import { Ban } from '@/entities/BanEntity';
import { Objetivo } from '@/entities/ObjetivoEntity';
import { HistorialEquipo } from '@/entities/HistorialEquipoEntity';
import { Partida } from '@/entities/PartidaEntity';

@Entity('equipos_competitivos')
export class EquipoCompetitivo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 128, unique: true })
    nombre!: string;

    @Column({ type: 'text', nullable: true })
    descripcion?: string;

    @Column({ type: 'date', nullable: true })
    fundacion?: Date;

    @Column({ type: 'varchar', length: 64, nullable: true })
    pais?: string;

    @OneToMany(() => Usuario, (usuario) => usuario.equipoActual)
    usuarios!: Usuario[];

    @OneToMany(() => Participante, (participante) => participante.equipo)
    participantes!: Participante[];

    @OneToMany(() => Ban, (ban) => ban.equipo)
    bans!: Ban[];

    @OneToMany(() => Objetivo, (objetivo) => objetivo.equipo)
    objetivos!: Objetivo[];

    @OneToMany(() => HistorialEquipo, (historial) => historial.equipo)
    historial!: HistorialEquipo[];

    @OneToMany(() => Partida, (partida) => partida.equipo1)
    partidas1!: Partida[];

    @OneToMany(() => Partida, (partida) => partida.equipo2)
    partidas2!: Partida[];
}
