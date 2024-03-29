// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  AUTH_SERVER: 'bigtree-auth-service-672f06320174.herokuapp.com',
  ORDER_SERVER: 'polar-fortress-28097-08459456d8d7.herokuapp.com',
  ADS_SERVER_REMOTE: 'chef-service-1b2023ebc956.herokuapp.com',
  ADS_SERVER_LOCAL: 'http://localhost:8082',
  CURRENCY: 'GBP',
  CURRENCY_SYMBOL: '£',

  // ====================
  // Ads Service Remote
  // ====================
  // GroupsUrl: 'https://chef-service-1b2023ebc956.herokuapp.com/ads/v1/groups',
  // ProductsUrl: 'https://chef-service-1b2023ebc956.herokuapp.com/ads/v1/products',
  // FeedbacksUrl: 'https://chef-service-1b2023ebc956.herokuapp.com/ads/v1/feedbacks',
  // CollectionsUrl:
  //   'https://chef-service-1b2023ebc956.herokuapp.com/ads/v1/collections',
  // ChefsUrl: 'https://chef-service-1b2023ebc956.herokuapp.com/ads/v1/chefs',
  // CuisinesUrl:
  //   'https://chef-service-1b2023ebc956.herokuapp.com/ads/v1/cuisines',
  // DishesUrl: 'https://chef-service-1b2023ebc956.herokuapp.com/ads/v1/dishes',
  // ReviewsUrl: 'https://chef-service-1b2023ebc956.herokuapp.com/ads/v1/reviews',
  // ServiceAreasUrl:
  //   'https://chef-service-1b2023ebc956.herokuapp.com/ads/v1/serviceareas',
  // MenusUrl: 'https://chef-service-1b2023ebc956.herokuapp.com/ads/v1/menus',
  // CalendersUrl:
  //   'https://chef-service-1b2023ebc956.herokuapp.com/ads/v1/calendars',

  // ====================
  // Order Service Remote
  // ====================
  OrderTrackingUrl:
    'https://polar-fortress-28097-08459456d8d7.herokuapp.com/api/order-tracking',
  FoodOrdersUrl:
    'https://polar-fortress-28097-08459456d8d7.herokuapp.com/api/customer-orders',
  FoodOrderSearchUrl:
    'https://polar-fortress-28097-08459456d8d7.herokuapp.com/api/customer-orders/search',
  StripePaymentsUrl:
    'https://polar-fortress-28097-08459456d8d7.herokuapp.com/api/stripe-payments',
  PaymentIntentUrl:
    'https://polar-fortress-28097-08459456d8d7.herokuapp.com/api/stripe-payments/payment-intent',

  // ====================
  // Order Service Remote
  // ====================
  // OrderTrackingUrl: 'http://localhost:8082/api/order-tracking',
  // FoodOrdersUrl: 'http://localhost:8082/api/customer-orders',
  // FoodOrderSearchUrl: 'http://localhost:8082/api/customer-orders/search',
  // StripePaymentsUrl: 'http://localhost:8082/api/stripe-payments',
  // PaymentIntentUrl: 'http://localhost:8082/api/stripe-payments/payment-intent',
  OrdersUrl: 'http://localhost:8082/orders/v1',
  PaymentsUrl: 'http://localhost:8082/payments/v1',


  // ====================
  // Auth Service Remote
  // ====================
  // LoginUrl:
  //   'https://bigtree-auth-service-672f06320174.herokuapp.com/v1/auth/token',
  // LogoutUrl:
  //   'https://bigtree-auth-service-672f06320174.herokuapp.com/v1/auth/logout',
  // RegisterUrl:
  //   'https://bigtree-auth-service-672f06320174.herokuapp.com/v1/users/signup',
  // PasswordResetInitiateUrl:
  //   'https://bigtree-auth-service-672f06320174.herokuapp.com/v1/auth/passwords/reset_initiate',
  // PasswordResetSubmitUrl:
  //   'https://bigtree-auth-service-672f06320174.herokuapp.com/v1/auth/passwords/reset_submit',
  // GetCustomerPreferencesUrl:
  //   'https://bigtree-auth-service-672f06320174.herokuapp.com/v1/customers/replace-me/preferences',
  // CreateOrUpdateCustomerPreferencesUrl:
  //   'https://bigtree-auth-service-672f06320174.herokuapp.com/v1/customers/preferences',
  // CreateContactsUrl:
  //   'https://bigtree-auth-service-672f06320174.herokuapp.com/v1/contacts',
  // UpdatePersonalDetails:
  //   'https://bigtree-auth-service-672f06320174.herokuapp.com/v1/users/update_personal',
 


// ====================
  // Auth Service Local
  // ====================
  LoginUrl:
    'http://localhost:8081/v1/auth/token',
  LogoutUrl:
    'http://localhost:8081/v1/auth/logout',
  RegisterUrl:
    'http://localhost:8081/v1/users/signup',
  PasswordResetInitiateUrl:
    'http://localhost:8081/v1/auth/passwords/reset_initiate',
  PasswordResetSubmitUrl:
    'http://localhost:8081/v1/auth/passwords/reset_submit',
  GetCustomerPreferencesUrl:
    'http://localhost:8081/v1/customers/replace-me/preferences',
  CreateOrUpdateCustomerPreferencesUrl:
    'http://localhost:8081/v1/customers/preferences',
  CreateContactsUrl:
    'http://localhost:8081/v1/contacts',
  UpdatePersonalDetails:
    'http://localhost:8081/v1/users/update_personal',

  // ====================
  // Ads Service Local
  // ====================
  CollectionsUrl: "http://localhost:8083/ads/v1/collections",
  ChefsUrl: "http://localhost:8083/ads/v1/chefs",
  CuisinesUrl: "http://localhost:8083/ads/v1/cuisines",
  DishesUrl: "http://localhost:8083/ads/v1/dishes",
  ReviewsUrl: "http://localhost:8083/ads/v1/reviews",
  ServiceAreasUrl: "http://localhost:8083/ads/v1/serviceareas",
  MenusUrl: "http://localhost:8083/ads/v1/menus",
  CalendersUrl: "http://localhost:8083/ads/v1/calendars",
  GroupsUrl: 'http://localhost:8083/ads/v1/groups',
  ProductsUrl: 'http://localhost:8083/ads/v1/products',
  SupplierUrl: 'http://localhost:8083/ads/v1/suppliers',
  FeedbacksUrl: 'http://localhost:8083/ads/v1/feedbacks',
  

  debug: window['env']['debug'] || false,

  /** RapidAPI  */
  X_RapidAPI_Url:
    window['env']['X_RapidAPI_Url'] ||
    'https://samsinfield-postcodes-4-u-uk-address-finder.p.rapidapi.com/ByPostcode/json',
  X_RapidAPI_Host:
    window['env']['X_RapidAPI_Host'] ||
    'samsinfield-postcodes-4-u-uk-address-finder.p.rapidapi.com',
  X_RapidAPI_Key:
    window['env']['X_RapidAPI_Key'] ||
    '249a5c6ab3mshce3cf38f2ca8130p195a93jsn3ad1c6002c20',
  CUSTOMER_APP_ACCESS_TOKEN:
    'eyJhbGciOiJIUzUxMiJ9.eyJmaXJzdE5hbWUiOiJDdXN0b21lckFwcCIsImxhc3ROYW1lIjoiQ3VzdG9tZXJBcHAiLCJjbGllbnRUeXBlIjoiQ3VzdG9tZXJBcHAiLCJtb2JpbGUiOiIwNzk3OTE5MTE3NiIsImN1c3RvbWVySWQiOiI2NThlY2YxYjUyOTAyNDI0OTc2MzYxMDUiLCJleHAiOjE3MzkwNDg0NDIsInN1YiI6IlRoZUN1c3RvbWVyQXBwQGdtYWlsLmNvbSJ9.k0sPPCwRHRjZjh20koEAOSY1UNdNaggQJaqc0TfcmdbhpNIiHOHmtcZxu2Jp3kDSMNCfmoKyQX51eTF71jWWfQ',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
