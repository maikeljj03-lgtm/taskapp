import { Injectable } from '@angular/core';
import type { Tarea } from '../models/tarea';

const STORAGE_KEY = 'taskapp-tareas';

@Injectable({ providedIn: 'root' })
export class TareasService {
  private tareas: Tarea[] = this.cargarTareas();

  obtenerTareas(): Tarea[] {
    return [...this.tareas];
  }

  agregarTarea(datos: Omit<Tarea, 'id' | 'completada'>): void {
    this.tareas = [
      { ...datos, id: Date.now(), completada: false },
      ...this.tareas,
    ];
    this.guardarTareas();
  }

  cambiarEstado(id: number, completada: boolean): void {
    this.tareas = this.tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, completada } : tarea,
    );
    this.guardarTareas();
  }

  eliminarTarea(id: number): void {
    this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
    this.guardarTareas();
  }

  private cargarTareas(): Tarea[] {
    const ejemplos: Tarea[] = [
      {
        id: 1,
        titulo: 'Leer capítulo 1',
        descripcion: 'Repasar los fundamentos de la asignatura',
        prioridad: 'Alta',
        completada: false,
      },
      {
        id: 2,
        titulo: 'Entregar práctica',
        descripcion: 'Preparar y subir el trabajo de esta semana',
        prioridad: 'Media',
        completada: false,
      },
    ];

    try {
      const guardadas = localStorage.getItem(STORAGE_KEY);
      if (!guardadas) return ejemplos;

      const tareas: unknown = JSON.parse(guardadas);
      return Array.isArray(tareas) ? (tareas as Tarea[]) : ejemplos;
    } catch {
      return ejemplos;
    }
  }

  private guardarTareas(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tareas));
    } catch {
      // La lista sigue funcionando mientras la app esté abierta.
    }
  }
}
