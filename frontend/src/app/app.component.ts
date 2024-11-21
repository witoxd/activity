import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideComponent } from './Components/Layout/aside/aside.component';
import { ContentComponent } from './Components/Layout/content/content.component';
import { FooterComponent } from './Components/Layout/footer/footer.component';
import { HeaderComponent } from './Components/Layout/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
     AsideComponent,
    ContentComponent,
    FooterComponent, 
    HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
