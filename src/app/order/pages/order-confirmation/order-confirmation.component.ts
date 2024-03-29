import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  FoodOrder,
  OrderStatus,
  OrderTracking,
  OrderUpdateRequest,
} from 'src/app/model/localchef';
import { ContextService } from 'src/app/services/context.service';
import { FoodOrderService } from 'src/app/services/food-order.service';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css'],
})
export class OrderConfirmationComponent {
  order: FoodOrder;
  redirectStatus: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: FoodOrderService,
    private utils: Utils,
  ) {
  }

  // Stripe returns to this url:
  //http://localhost:4200/order-confirmation/7a022f19-d82f-4b8a-9525-86a768af35b0?
  //payment_intent=pi_3Nkt1IJtRMxkXWc31hypLmHB&
  //payment_intent_client_secret=pi_3Nkt1IJtRMxkXWc31hypLmHB_secret_zD9W7MrKPXyS2awWy2vUQVnvp&
  //redirect_status=succeeded

  ngOnInit() {
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
        if (this.redirectStatus === 'succeeded' && o.status === 'PAID') {
          this.orderService.destroy();
        }
      } else {
        console.log('Order not found');
      }
    });
    
  }
}
