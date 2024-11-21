import { Component } from '@angular/core';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
