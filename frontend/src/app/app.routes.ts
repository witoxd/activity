import { Routes } from '@angular/router';
import { MostrarActivityComponent } from './Components/Activity/mostrar-Activity/mostrar-Activity.component';
import { CrearClienteComponent } from './Components/Activity/crear-cliente/crear-cliente.component';
import { EliminarClienteComponent } from './Components/Activity/eliminar-cliente/eliminar-cliente.component';


export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/', 
        pathMatch: 'full' 
    },
    {
        path: "Activitys",
        component: MostrarActivityComponent
    },
    {
        path: "Activitys/new",
        component: CrearClienteComponent
    },

];
