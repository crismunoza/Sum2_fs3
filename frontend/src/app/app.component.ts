import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeadersComponent } from './shared/components/headers/headers.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';  
import { AuthInterceptor } from './core/interceptors/auth.interceptor';  

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, HeadersComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }  
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  showFooter: boolean = true;
  showNavbar: boolean = true;
  showHeader: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showHeader = event.url !== '/Login' && event.url !== '/Register' && event.url !== '/ResetPass';
        this.showNavbar = event.url !== '/Login' && event.url !== '/Register' && event.url !== '/ResetPass';
        this.showFooter = event.url !== '/Login' && event.url !== '/Register' && event.url !== '/ResetPass' && event.url !== '/Profile' && event.url !== '/Admin' && event.url !== '/Products' && event.url !== '/Addproducts';     
      });
  }
}
