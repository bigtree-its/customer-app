import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { BecomeAPartnerComponent } from './pages/become-a-partner/become-a-partner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  { path: 'my_orders', component: MyOrdersComponent },
  { path: 'my_profile', component: MyProfileComponent },
  { path: 'become_a_partner', component: BecomeAPartnerComponent }
]


@NgModule({
  declarations: [
    MyOrdersComponent,
    MyProfileComponent,
    BecomeAPartnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
