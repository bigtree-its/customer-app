import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import {
  CustomerOrder,
  CustomerOrderList,
  FoodOrderItem,
  LocalChef,
  Orders,
  OrderSearchQuery,
  OrderTracking,
  OrderUpdateRequest,
  SupplierOrders,
} from '../model/localchef';
import { UserSession } from '../model/common-models';
import { PaymentIntentRequest, PaymentIntentResponse } from '../model/order';
import { Utils } from './utils';
import { ServiceLocator } from './service.locator';
import { LocalService } from './local.service';
import { ChefService } from './chef.service';

@Injectable({
  providedIn: 'root',
})
export class FoodOrderService {

  userSession: UserSession;
  ipAddress: any;
  supplier: LocalChef;
  foodOrderKey: string;
  private storageItem = "c_order";
  public orderSubject$: BehaviorSubject<CustomerOrder>;

  constructor(
    private http: HttpClient,
    private chefService: ChefService,
    private localService: LocalService,
    private serviceLocator: ServiceLocator
  ) {
  }

  updateStatus(orderTracking: OrderTracking) {
    this.http.post<OrderTracking>(this.serviceLocator.OrderTrackingUrl, orderTracking).subscribe(e=>{
      console.log('Update status response. '+ JSON.stringify(e))
    });
  }

  saveOrder(order: CustomerOrder): Observable<CustomerOrder> {
    return this.http
      .post<CustomerOrder>(this.serviceLocator.CustomerOrdersUrl, order)
      .pipe(
        tap(result => {
          this.setData(result);
        })
      );
  }

  retrieveOrder(reference: string): Observable<CustomerOrder> {
    var url = this.serviceLocator.CustomerOrdersUrl + '/reference/' + reference;
    return this.http.get<CustomerOrder>(url)
      .pipe(
        tap(data => {
          this.setData(data[0]);
        })
      );
  }

  retrievePaymentIntent(orderId: string): Observable<PaymentIntentResponse> {
    var params = new HttpParams();
    if (orderId !== null && orderId !== undefined) {
      params = params.set('orderId', orderId);
    }
    return this.http.get<PaymentIntentResponse>(this.serviceLocator.PaymentIntentUrl, { params });
  }

  getSupplierOrders(
    orderSearchQuery: OrderSearchQuery
  ): Observable<SupplierOrders> {
    var params = new HttpParams();
    if (
      orderSearchQuery.reference !== null &&
      orderSearchQuery.reference !== undefined
    ) {
      params = params.set('reference', orderSearchQuery.reference);
    }
    if (
      orderSearchQuery.customerEmail !== null &&
      orderSearchQuery.customerEmail !== undefined
    ) {
      params = params.set('customerEmail', orderSearchQuery.customerEmail);
    }
    if (
      orderSearchQuery.chefId !== null &&
      orderSearchQuery.chefId !== undefined
    ) {
      params = params.set('chefId', orderSearchQuery.chefId);
    }
    if (
      orderSearchQuery.orderId !== null &&
      orderSearchQuery.orderId !== undefined
    ) {
      params = params.set('orderId', orderSearchQuery.orderId);
    }
    if (orderSearchQuery.thisMonth) {
      params = params.set('thisMonth', 'true');
    }
    if (orderSearchQuery.thisYear) {
      params = params.set('thisYear', 'true');
    }
    if (orderSearchQuery.all) {
      params = params.set('all', 'true');
    }
    return this.http.get<SupplierOrders>(this.serviceLocator.CustomerOrderSearchUrl, { params });
  }

  getOrders(orderSearchQuery: OrderSearchQuery): Observable<Orders> {
    var params = new HttpParams();
    if (
      orderSearchQuery.reference !== null &&
      orderSearchQuery.reference !== undefined
    ) {
      params = params.set('reference', orderSearchQuery.reference);
    }
    if (
      orderSearchQuery.customerEmail !== null &&
      orderSearchQuery.customerEmail !== undefined
    ) {
      params = params.set('customerEmail', orderSearchQuery.customerEmail);
    }
    if (
      orderSearchQuery.chefId !== null &&
      orderSearchQuery.chefId !== undefined
    ) {
      params = params.set('chefId', orderSearchQuery.chefId);
    }
    if (
      orderSearchQuery.orderId !== null &&
      orderSearchQuery.orderId !== undefined
    ) {
      params = params.set('orderId', orderSearchQuery.orderId);
    }
    if (orderSearchQuery.thisMonth) {
      params = params.set('thisMonth', 'true');
    }
    if (orderSearchQuery.thisYear) {
      params = params.set('thisYear', 'true');
    }
    if (orderSearchQuery.all) {
      params = params.set('all', 'true');
    }
    return this.http.get<Orders>(this.serviceLocator.CustomerOrderSearchUrl, { params });
  }

  getCustomerOrders(
    orderSearchQuery: OrderSearchQuery
  ): Observable<CustomerOrderList> {
    var params = new HttpParams();
    if (
      orderSearchQuery.reference !== null &&
      orderSearchQuery.reference !== undefined
    ) {
      params = params.set('reference', orderSearchQuery.reference);
    }
    if (
      orderSearchQuery.customerEmail !== null &&
      orderSearchQuery.customerEmail !== undefined
    ) {
      params = params.set('customerEmail', orderSearchQuery.customerEmail);
    }
    if (
      orderSearchQuery.chefId !== null &&
      orderSearchQuery.chefId !== undefined
    ) {
      params = params.set('chefId', orderSearchQuery.chefId);
    }
    if (orderSearchQuery.thisMonth) {
      params = params.set('thisMonth', 'true');
    }
    if (orderSearchQuery.thisYear) {
      params = params.set('thisYear', 'true');
    }
    if (orderSearchQuery.all) {
      params = params.set('all', 'true');
    }
    return this.http.get<CustomerOrderList>(this.serviceLocator.CustomerOrderSearchUrl, { params });
  }

  private getIPAddress() {
    this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
      this.ipAddress = res.ip;
    });
  }


  public addToOrder(foodOrderItem: FoodOrderItem) {
    var order = this.getData();
    if ( order === undefined){
      this.createOrder();
    }
    if (order.items === null) {
      order.items = [];
    }
    order.items.push(foodOrderItem);
    this.calculateTotal(order);
  }

  removeItem(itemToDelete: FoodOrderItem) {
    var order = this.getData();
    for (var i = 0; i < order.items.length; i++) {
      var item = order.items[i];
      if (item._tempId === itemToDelete._tempId) {
        order.items.splice(i, 1);
      }
    }
    this.calculateTotal(order);
  }

  updateItem(item: FoodOrderItem) {
    var order = this.getData();
    for (var i = 0; i < order.items.length; i++) {
      var fi = order.items[i];
      if (fi._tempId === item._tempId) {
        order.items.splice(i, 1);
        order.items.push(item);
        this.calculateTotal(order);
        break;
      }
    }
  }

  public calculateTotal(order: CustomerOrder) {
    var subTotal: number = 0.0;
    if (
      order.items !== null &&
      order.items !== undefined &&
      order.items.length > 0
    ) {
      order.items.forEach((item) => {
        subTotal = subTotal + item.subTotal;
      });
    }
    order.deliveryFee = 0.0;
    order.packingFee = 0.0;
    order.serviceFee = 0.0;
    order.subTotal = subTotal;
    if (subTotal !== 0) {
      order.serviceFee = 0.5;
      if (order.serviceMode === 'DELIVERY') {
        order.deliveryFee = 0.5;
      }
    }

    var totalToPay: number =
      order.subTotal + order.deliveryFee + order.packingFee + order.serviceFee;
    console.log('Calculating SubTotal: ' + subTotal);
    console.log('Calculating TotalPay: ' + totalToPay);
    order.total = totalToPay;
    order.total = +(+order.total).toFixed(2);
    console.log('The calculated order total: ' + order.total);
    this.setData(order);
  }


  createPaymentIntentForOrder(
    customerOrder: CustomerOrder
  ): Observable<PaymentIntentResponse> {
    console.log('Creating intent for order: ' + JSON.stringify(customerOrder));
    const paymentIntentRequest: PaymentIntentRequest = {
      currency: 'GBP',
      amount: customerOrder.total,
      orderReference: customerOrder.reference,
    };
    console.log(
      'Creating payment intent: ' +
      this.serviceLocator.PaymentIntentUrl +
        ', ' +
        JSON.stringify(paymentIntentRequest)
    );
    return this.http.post<PaymentIntentResponse>(this.serviceLocator.PaymentIntentUrl, paymentIntentRequest);
  }

  createPaymentIntent(
    paymentIntentRequest: PaymentIntentRequest
  ): Observable<PaymentIntentResponse> {
    console.log(
      'Creating payment intent: ' +
      this.serviceLocator.PaymentIntentUrl +
        ', ' +
        JSON.stringify(paymentIntentRequest)
    );
    return this.http.post<PaymentIntentResponse>(this.serviceLocator.PaymentIntentUrl, paymentIntentRequest);
  }

  public createOrder(): CustomerOrder {
    console.log('Creating empty new order');
    if (Utils.isValid(this.supplier)) {
      this.supplier = this.chefService.getCurrentChef();
    }

    var customerOrder = {
      id: '',
      items: [],
      supplier: {
        _id: this.supplier._id,
        name: this.supplier.name,
        image: this.supplier.coverPhoto,
        mobile: this.supplier.contact.mobile,
        email: this.supplier.contact.email,
        address: {
          addressLine1: this.supplier.address.addressLine1,
          addressLine2: this.supplier.address.addressLine2,
          city: this.supplier.address.city,
          country: this.supplier.address.country,
          postcode: this.supplier.address.postcode,
          latitude: this.supplier.address.latitude,
          longitude: this.supplier.address.longitude,
        },
      },
      customer: {
        name: '',
        mobile: '',
        email: '',
        address: {
          addressLine1: '',
          addressLine2: '',
          city: '',
          country: '',
          postcode: '',
          latitude: '',
          longitude: '',
        },
      },
      currency: 'GBP',
      reference: '',
      subTotal: 0.0,
      total: 0.0,
      deliveryFee: this.getDeliveryFee(),
      packingFee: this.getPackagingFee(),
      serviceFee: 0.0,
      dateCreated: new Date(),
      dateAccepted: null,
      expectedDeliveryDate: null,
      dateCollected: null,
      dateDelivered: null,
      collectBy: null,
      dateDeleted: null,
      serviceMode: 'COLLECTION',
      status: 'CREATED',
      notes: '',
    };
    console.log('Created a brand new Order '+ JSON.stringify(customerOrder));
    return customerOrder;
  }

  getDeliveryFee(): number {
    var deliveryFee = 0.0;
    if (this.supplier !== null && this.supplier !== undefined) {
      this.supplier.deliveryFee;
    }
    return deliveryFee;
  }

  getPackagingFee(): number {
    var packagingFee = 0.0;
    if (this.supplier !== null && this.supplier !== undefined) {
      this.supplier.packagingFee;
    }
    return packagingFee;
  }

  updateOrder(orderUpdateRequest: OrderUpdateRequest) {
    console.log(
      'Updating Order: ' + this.serviceLocator.CustomerOrdersUrl + ', ' + JSON.stringify(orderUpdateRequest)
    );
    this.http.put<OrderUpdateRequest>(this.serviceLocator.CustomerOrdersUrl, orderUpdateRequest).subscribe({
      next: (data) => {
        var response = JSON.stringify(data);
        console.log('Order Updated: ' + response);
      },
      error: (e) => {
        console.error('Error when updating order ' + e);
      },
    });
  }

  placeOrder(customerOrder: CustomerOrder): Observable<CustomerOrder> {
    console.log(
      'Placing an order for LocalChef : ' +
      this.serviceLocator.CustomerOrdersUrl +
        ', ' +
        JSON.stringify(customerOrder)
    );
    return this.http.post<CustomerOrder>(this.serviceLocator.CustomerOrdersUrl, customerOrder);
    // .subscribe({
    //   next: data => {
    //     var response = JSON.stringify(data);
    //     this.foodOrder = data;
    //     console.log('FoodOrder created: ' + response);
    //   },
    //   error: e => { console.error('Error when creating order ' + e) }
    // });
  }

  setData(data: CustomerOrder) {
    console.info('Storing customer order..')
    this.localService.saveData(this.storageItem, JSON.stringify(data));
    this.orderSubject$.next(data);
  }

  purgeData(){
    console.log('Purging order.');
    this.localService.removeData(this.storageItem);
    this.orderSubject$.next(null);
  }

  getData(): CustomerOrder {
    var json = this.localService.getData(this.storageItem);
    if ( json === undefined){
      return undefined;
    }
    if ( json !== "" && json !== null && json !== undefined){
      var obj = JSON.parse(json);
      return obj.constructor.name === 'Array'? obj[0]: obj;
    }
    return null;
  }
}
