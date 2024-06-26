import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { BecomeAPartnerComponent } from './pages/become-a-partner/become-a-partner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderByDatePipe } from '../pipes/order-by-date.pipe';
import { ManageOrderComponent } from './pages/manage-order/manage-order.component';
import { SharedModule } from '../shared';
import { PaymentsModule } from '../payments';

const routes: Routes = [
  { path: 'my_orders', component: MyOrdersComponent },
  { path: 'my_orders/manage', component: ManageOrderComponent },
  { path: 'my_profile', component: MyProfileComponent },
  { path: 'contact_us', component: BecomeAPartnerComponent }
]


@NgModule({
  declarations: [
    MyOrdersComponent,
    MyProfileComponent,
    BecomeAPartnerComponent,
    OrderByDatePipe,
    ManageOrderComponent
  ],
  imports: [
    CommonModule,
    PaymentsModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
