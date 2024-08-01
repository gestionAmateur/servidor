import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '@/entities/UsuarioEntity';
import { EquipoCompetitivo } from '@/entities/EquipoCompetitivoEntity';

@Entity('historial_equipo')
export class HistorialEquipo {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.historial)
    usuario!: Usuario;

    @ManyToOne(() => EquipoCompetitivo, (equipo) => equipo.historial)
    equipo!: EquipoCompetitivo;

    @Column({ type: 'bigint' })
    fechaInicio!: number;

    @Column({ type: 'bigint', nullable: true })
    fechaFin?: number;
}
