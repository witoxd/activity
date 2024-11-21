import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityService } from '../../../Services/Activity.service';
import { Router } from '@angular/router';
import { ActivityI } from '../../../Models/Activity';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-crear-cliente',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule, 
    ToastModule, 
    CardModule, 
    ButtonModule],
  providers: [MessageService],
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css'] 
})
export class CrearClienteComponent implements OnInit {
  public form: FormGroup;

  ActivityService = inject(ActivityService);
 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private MessageService: MessageService
  ) {
    // Inicializa el formulario aquí
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      date_act: ['', [Validators.required]],
      description: ['', [Validators.required]],
      UserId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const formValue: ActivityI = this.form.value;
    if (  formValue.UserId && formValue.date_act && formValue.description && formValue.name) {
      this.ActivityService.createActivity(formValue).subscribe(
        () => {
          this.MessageService.add({severity:'success', summary: 'Notificación', detail: 'Activity Creado', life:5000});
          console.log('Cliente creado correctamente');
          this.router.navigateByUrl('/Activitys');
        },
        err => {
          console.log(err);
          console.log('No se ha creado correctamente');
        }
      );
    } else {
      console.log("Tener en cuenta que todos los campos son obligatorios");
    }
  }

  cancel() {
    this.router.navigateByUrl('/Activitys');
  }

  get name() { return this.form.get('name'); }
  get date_act() { return this.form.get('date_act'); }
  get description() { return this.form.get('description'); }
  get UserId() { return this.form.get('UserId'); }

}

