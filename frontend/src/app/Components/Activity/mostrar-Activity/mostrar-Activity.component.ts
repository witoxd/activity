import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../../Services/Activity.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import { ActivityI } from '../../../Models/Activity';
import { CardModule } from 'primeng/card';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { PrimeIcons, MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-mostrar-Activity',
  standalone: true,
  imports: [RouterModule,
    PanelMenuModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule
  ],
  providers: [MessageService],
  templateUrl: './mostrar-Activity.component.html',
  styleUrl: './mostrar-Activity.component.css',
  styles: [`
    .outofstock {
        font-weight: 700;
        color: #FF5252;
        text-decoration: line-through;
    }

    .lowstock {
        font-weight: 700;
        color: #FFA726;
    }

    .instock {
        font-weight: 700;
        color: #66BB6A;
    }

    :host ::ng-deep .row-accessories {
        background-color: rgba(0,0,0,.15) !important;
    }
`
]

})
export class MostrarActivityComponent implements OnInit {
  public Activitys:ActivityI[] = []
  constructor(
    private messageService: MessageService,
    private ActivityService: ActivityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarActivitys()
  }

  

  mostrarActivitys() {
    this.ActivityService.getAllActivity()
      .subscribe({
        next: (data) => {
          this.Activitys = data.Activitys
          console.log(this.Activitys)
        }
      })
  }

  eliminar(id: number): void{
    this.router.navigateByUrl('/Activitys');
    this.ActivityService.deleteActivity(id).subscribe(
      () => {
        this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Activity Eliminado', life:5000});
        this.mostrarActivitys();
      },
      err => {
        console.log('error')
        this.router.navigateByUrl('/Activitys');

      }
    );
  }

  actualizarActivity(Activity: ActivityI): void {
    if (Activity.UserId && Activity.date_act && Activity.description && Activity.name) {
      console.log('Actualizando Activity:', Activity);
      this.ActivityService.updateActivity(Activity.id, Activity).subscribe(
        () => {
          console.log('Activity actualizado correctamente');
        },
        err => {
          console.error('Error al actualizar Activity:', err);
        }
      );
    } else {
      console.error('Datos incompletos, no se puede actualizar:', Activity);
      this.mostrarActivitys()
    }
  }
  
}
