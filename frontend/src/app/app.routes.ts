import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AdminComponent } from './features/admin/admin.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ResetpassComponent } from './features/resetpass/resetpass.component';
import { ProfileComponent}  from './features/profile/profile.component';
import { ProductComponent } from './features/product/product.component';
import{ AddproductComponent } from './features/addproduct/addproduct.component';
import { AuthGuard } from './core/service/guards/auth.guard';


export const routes: Routes = [
    { path: '', redirectTo: '/Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    {
        path: 'Admin',
        component: AdminComponent,
        canActivate: [AuthGuard],  
        data: { expectedRole: 'ROLE_ADMIN' }  
    },
    {
        path: 'Products',
        component: ProductComponent,
        canActivate: [AuthGuard],  
        data: { expectedRole: 'ROLE_ADMIN' }  
    }, 
    {
        path: 'Addproducts',
        component: AddproductComponent,
        canActivate: [AuthGuard], 
        data: { expectedRole: 'ROLE_ADMIN' }  
    }, 
    { path: 'Login', component: LoginComponent },
    { path: 'Register', component: RegisterComponent },
    { path: 'ResetPass', component: ResetpassComponent },
    { path: 'Profile', component: ProfileComponent},
    { path: '**', redirectTo: '/Home', pathMatch: 'full' }
];
