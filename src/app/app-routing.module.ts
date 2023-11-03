import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { GetComponent } from './components/get/get.component';

const routes: Routes = [
  { path: 'add', component: AddComponent },
  { path: '', component: GetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
