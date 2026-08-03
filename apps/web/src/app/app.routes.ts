import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { RequestPage } from './pages/request/request.page';
import { SuccessPage } from './pages/success/success.page';
import { StaffLoginPage } from './pages/staff-login/staff-login.page';
import { StaffAgendaPage } from './pages/staff-agenda/staff-agenda.page';
export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'solicitar', component: RequestPage },
  { path: 'solicitar/enviada', component: SuccessPage },
  { path: 'staff/login', component: StaffLoginPage },
  { path: 'staff', component: StaffAgendaPage },
  { path: '**', redirectTo: '' },
];
