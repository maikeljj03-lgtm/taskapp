import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import type { Prioridad, Tarea } from '../models/tarea';

type NuevaTarea = Omit<Tarea, 'id' | 'completada'>;

@Component({
  selector: 'app-tarea-form',
  templateUrl: './tarea-form.component.html',
  styleUrls: ['./tarea-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonModal,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonTitle,
    IonToolbar,
  ],
})
export class TareaFormComponent {
  private formBuilder = inject(FormBuilder);

  @Input() abierto = false;
  @Output() tareaCreada = new EventEmitter<NuevaTarea>();
  @Output() cerrar = new EventEmitter<void>();

  formulario = this.formBuilder.group({
    titulo: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/\S/)]],
    descripcion: [''],
    prioridad: ['Media' as Prioridad, Validators.required],
  });

  constructor() {
    addIcons({ closeOutline });
  }

  enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const { titulo, descripcion, prioridad } = this.formulario.getRawValue();
    this.tareaCreada.emit({
      titulo: titulo!.trim(),
      descripcion: descripcion?.trim() ?? '',
      prioridad: prioridad!,
    });
    this.formulario.reset({ prioridad: 'Media', descripcion: '', titulo: '' });
  }

  alCerrar(): void {
    this.cerrar.emit();
  }
}
