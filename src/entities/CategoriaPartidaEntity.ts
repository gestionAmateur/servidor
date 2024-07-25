import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Partida } from '@/entities/PartidaEntity';

@Entity('categorias_partida')
export class CategoriaPartida {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 128, unique: true })
    nombre!: string;

    @Column({ type: 'text', nullable: true })
    descripcion?: string;

    @OneToMany(() => Partida, (partida) => partida.categoria)
    partidas!: Partida[];
}
