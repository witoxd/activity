import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [PanelMenuModule, DividerModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  items: MenuItem[] = [];


  ngOnInit(): void {
    this.items = [
      {
        label: 'Activitys',
        icon: 'pi pi-fw pi-users',
        //routerLink: '/clientes',
        items: [
          {
            label: 'Mostrar',
            routerLink: '/Activitys'
          },
          {
            label: 'Nuevo',
            routerLink: 'Activitys/nuevo'
          }
        ]
      }
    ]
  }
}
