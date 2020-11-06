import { Title } from '@angular/platform-browser';

export interface Card {
    id_carta: number;
    nombre: string;
    descripcion?: string;
    horario?: string;
    imagen?: string;
    posicion: number;

}