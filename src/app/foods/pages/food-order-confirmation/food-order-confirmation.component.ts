import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Utils } from 'src/app/helpers/utils';
import { FoodOrder, LocalChef, OrderSupplier, OrderUpdateRequest } from 'src/app/model/localchef';
import { FoodOrderService } from 'src/app/services/food-order.service';

@Component({
  selector: 'app-food-order-confirmation',
  templateUrl: './food-order-confirmation.component.html',
  styleUrls: ['./food-order-confirmation.component.css']
})
export class FoodOrderConfirmationComponent {

  cartTotal: number = 0;
  order: FoodOrder;
  chef: LocalChef;
  price: number = 0.0;
  redirectStatus: any;

  activatedRoute=inject(ActivatedRoute);
  orderService=inject(FoodOrderService);
  supplier: OrderSupplier;
  error: boolean;
  loading: boolean;

  ngOnInit() {
    this.loading = true;
    this.redirectStatus = this.activatedRoute.snapshot.queryParamMap.get('redirect_status');
    const paymentIntent = this.activatedRoute.snapshot.queryParamMap.get('payment_intent');
    console.log('paymentIntent '+ paymentIntent);
    console.log('redirect_status '+ this.redirectStatus);
    var obj : OrderUpdateRequest = {
      "paymentIntentId": paymentIntent,
      "paymentStatus": this.redirectStatus
    }
    this.orderService.updateOrder(obj ).subscribe((o) => {
      this.order = o;
      if (Utils.isValid(this.order)) {
        this.loading = false;
        console.log('Retrieved order from server ['+ this.order.reference+", Status = "+ this.order.status+"]")
        this.supplier = this.order.supplier;
        if (this.redirectStatus === 'succeeded') {
          this.orderService.destroy();
        }
      } else {
        console.log('Order not found');
        this.error = true;
      }
    });
    
  }
}
