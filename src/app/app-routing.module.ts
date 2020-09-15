import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigComponent } from './config/config.component';
import { TimerComponent } from './timer/timer.component';

const routes: Routes = [
  {path:'config', component: ConfigComponent},
  {path:'timer/:mins', component: TimerComponent},
  {path: '',  redirectTo: 'config',  pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
