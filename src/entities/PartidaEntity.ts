import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { CategoriaPartida } from '@/entities/CategoriaPartidaEntity';
import { EquipoCompetitivo } from '@/entities/EquipoCompetitivoEntity';
import { Participante } from '@/entities/ParticipanteEntity';

@Entity('partidas')
export class Partida {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 128, unique: true })
    matchId!: string;

    @ManyToOne(() => CategoriaPartida, (categoria) => categoria.partidas)
    categoria!: CategoriaPartida;

    @ManyToOne(() => EquipoCompetitivo, (equipo) => equipo.partidas1, {
        nullable: true,
    })
    equipo1?: EquipoCompetitivo;

    @ManyToOne(() => EquipoCompetitivo, (equipo) => equipo.partidas2, {
        nullable: true,
    })
    equipo2?: EquipoCompetitivo;

    @Column({ type: 'bigint', unsigned: true, nullable: true })
    gameCreation?: number;

    @Column({ type: 'bigint', unsigned: true, nullable: true })
    gameDuration?: number;

    @Column({ type: 'bigint', unsigned: true, nullable: true })
    gameEndTimestamp?: number;

    @Column({ type: 'bigint', unsigned: true, nullable: true })
    gameId?: number;

    @Column({ type: 'varchar', length: 64, nullable: true })
    gameMode?: string;

    @Column({ type: 'varchar', length: 128, nullable: true })
    gameName?: string;

    @Column({ type: 'bigint', unsigned: true, nullable: true })
    gameStartTimestamp?: number;

    @Column({ type: 'varchar', length: 64, nullable: true })
    gameType?: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    gameVersion?: string;

    @Column({ type: 'int', unsigned: true, nullable: true })
    mapId?: number;

    @Column({ type: 'varchar', length: 64, nullable: true })
    platformId?: string;

    @Column({ type: 'int', unsigned: true, nullable: true })
    queueId?: number;

    @Column({ type: 'varchar', length: 64, nullable: true })
    tournamentCode?: string;

    @OneToMany(() => Participante, (participante) => participante.partida)
    participantes!: Participante[];
}
