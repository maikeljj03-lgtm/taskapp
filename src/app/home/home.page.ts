import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  IonBadge,
  IonButton,
  IonCheckbox,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline } from 'ionicons/icons';
import type { Prioridad, Tarea } from '../models/tarea';
import { TareasService } from '../services/tareas.service';
import { TareaFormComponent } from '../tarea-form/tarea-form.component';

type NuevaTarea = Omit<Tarea, 'id' | 'completada'>;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    TareaFormComponent,
    IonBadge,
    IonButton,
    IonCheckbox,
    IonContent,
    IonFab,
    IonFabButton,
    IonFooter,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonTitle,
    IonToolbar,
  ],
})
export class HomePage {
  private tareasService = inject(TareasService);
  tareas: Tarea[];
  formularioAbierto = false;

  constructor() {
    addIcons({ addOutline, trashOutline });
    this.tareas = this.tareasService.obtenerTareas();
  }

  get pendientes(): number {
    return this.tareas.filter((tarea) => !tarea.completada).length;
  }

  abrirFormulario(): void {
    this.formularioAbierto = true;
  }

  cerrarFormulario(): void {
    this.formularioAbierto = false;
  }

  guardarTarea(datos: NuevaTarea): void {
    this.tareasService.agregarTarea(datos);
    this.actualizarLista();
    this.cerrarFormulario();
  }

  cambiarEstado(tarea: Tarea, completada: boolean): void {
    this.tareasService.cambiarEstado(tarea.id, completada);
    this.actualizarLista();
  }

  eliminarTarea(tarea: Tarea): void {
    this.tareasService.eliminarTarea(tarea.id);
    this.actualizarLista();
  }

  colorPrioridad(prioridad: Prioridad): string {
    return { Alta: 'danger', Media: 'warning', Baja: 'success' }[prioridad];
  }

  private actualizarLista(): void {
    this.tareas = this.tareasService.obtenerTareas();
  }
}
