import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { FormArrayComponent } from './form-array/form-array.component';

const routes: Routes = [
  { path: 'registration', component: StudentRegistrationComponent },
  { path: 'form', component: FormArrayComponent},
  { path: '', redirectTo: '/registration', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
