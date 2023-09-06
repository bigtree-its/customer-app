import { Address, ChefContact, Contact, User } from "./common-models";

export interface OrderSupplier{
    id: string;
    name: string;
    image: string;
    mobile: string;
    email: string;
    address: Address;
}

export class OrderStatus{
    readonly created: string = "CREATED";
    readonly accepted: string = "ACCEPTED";
    readonly processing: string = "PROCESSING";
    readonly collected: string = "COLLECTED";
    readonly delivered: string = "DELIVERED";
    readonly cancelled: string = "CANCELLED";
    readonly refunded: string = "REFUNDED";
}

export interface OrderCustomer{
    name: string;
    mobile: string;
    email: string;
    address: Address;
}

export interface LocalChef {
    _id: string | undefined;
    coverPhoto: string | undefined;
    name: string;
    email: string;
    displayName: string;
    days: string[];
    description: string[];
    cuisines: Cuisine[];
    slots: string[];
    serviceAreas: LocalArea[];
    categories: string[];
    specials: string[];
    gallery: string[];
    rating: number;
    reviews: number;
    address: Address;
    contact: ChefContact;
    active: boolean;
    minimumOrder: number;
    packagingFee: number;
    delivery: boolean;
    partyOrders: boolean;
    freeDeliveryOver: number;
    deliveryMinimum: number;
    deliveryFee: number;
    deliveryDistance: number;
    minimumPartyOrder: number;
}

export interface Cuisine {
    _id: string;
    name: string;
}


export interface Collection {
    _id: string;
    chefId: string;
    image: string;
    name: string;
    displayName: string;
    foods: Food[];
    active: boolean;
}

export interface LocalAreaSearchResponse {
    localAreas: LocalArea[];
}

export interface LocalArea {
    _id: string;
    name: string;
    city: string;
    slug: string;
    country: string;
}

export interface Extra {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Food {
    _id: string;
    _uid: number;
    chefId: string;
    category: string;
    image: string;
    vegetarian: boolean;
    spice: number;
    extras: Extra[];
    choices: Extra[];
    description: string;
    name: string;
    price: number;
    discounted: boolean;
    discountedPrice: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Calendar {
    _id: string;
    chefId: string;
    description: string[];
    orderBefore: Date;
    foods: Food[];
    collectionStartDate: Date;
    collectionEndDate: Date;
    deliveryStartDate: Date;
    deliveryEndDate: Date;
}

export interface LocalChefSearchQuery {
    serviceAreaSlug: string;
    cuisines: string;
    slots: string;
    email: string;
    serviceAreas: string;
    status: string;
    noMinimumOrder: boolean;
    collectionOnly: boolean;
    delivery: boolean;
    takingOrdersNow: boolean;
}

export interface FoodOrder {
    id: string;
    chefId: string;
    customerEmail: string;
    customerMobile: string;
    reference: string;
    currency: string;
    paymentReference: string;
    status: string;
    items: FoodOrderItem[];
    subTotal: number;
    total: number;
    deliveryFee: number;
    packagingFee: number;
    saleTax: number;
    orderTime: Date;
    delivery: boolean;
    pickup: boolean;
    pickupTime: Date;
    deliveryTime: Date;
    customer: User;
    chef: Chef;
    review: Review;
    serviceMode: string;
}

export interface SupplierOrder{
    id: string;
    chefId: string;
    customerEmail: string;
    customerMobile: string;
    reference: string;
    currency: string;
    serviceMode: string;
    paymentReference: string;
    status: string;
    items: FoodOrderItem[];
    subTotal: number;
    total: number;
    deliveryFee: number;
    packagingFee: number;
    saleTax: number;
    dateCreated: Date;
    dateUpdated: Date;
    dateDeleted: Date;
    orderCreated: Date;
    orderAccepted: Date;
    orderCollected: Date;
    orderDelivered: Date;
    orderRejected: Date;
    delivery: boolean;
    pickup: boolean;
    pickupTime: Date;
    deliveryTime: Date;
    customer: User;
    chef: Chef;
    review: Review;
    notes: string;
}

export interface CustomerOrder {
    id: string;
    supplier: OrderSupplier;
    customer: OrderCustomer;
    reference: string;
    status: string;
    currency: string;
    serviceMode: string;
    items: FoodOrderItem[];
    subTotal: number;
    total: number;
    deliveryFee: number;
    packingFee: number;
    serviceFee: number;
    dateCreated: Date;
    collectBy: Date;
    dateDeleted: Date;
    expectedDeliveryDate: Date;
    dateAccepted: Date;
    dateDelivered: Date;
    dateCollected: Date;
    notes: string;
}

export interface SupplierSummary{
    totalOrdersWeekly: number;
    totalOrdersMonthly: number;
    totalOrdersYearly: number;
    
    totalRevenueWeekly: number;
    totalRevenueMonthly: number;
    totalRevenueYearly: number;
   
    ordersWeekly: FoodOrder[];
    ordersMonthly: FoodOrder[];
    ordersYearly: FoodOrder[];

    weeklyGrouping: Map<Date, number>;
    monthlyGrouping: Map<Date, number>;
    yearlyGrouping: Map<string, number>;
}

export interface OrderSearchQuery {
    reference: string;
    customerEmail: string;
    chefId: string;
    thisMonth: boolean;
    thisYear: boolean;
    all: boolean;
    orderId: string;
}

export interface OrderUpdateRequest {
    reference: string;
    id: string;
    status: string;
    chefNotes: string;
    customerComments: string;
    expectedCollectionDate: Date;
    expectedDeliveryDate: Date;
    customerRating: number;
}

export interface CustomerReview {
    customerEmail: string;
    chefId: string;
    comments: string;
    reviewDate: Date;
    rating: number;
    customerName: string;
    customerMobile: string;
}

export interface Review {
    comments: string;
    rating: number;
}

export interface CustomerOrderList {
    orders: CustomerOrder[]
}

export interface Orders {
    orders: FoodOrder[]
}

export interface SupplierOrders{
    orders: SupplierOrder[]
}

export interface Chef {
    _id: string;
    coverPhoto: string;
    name: string;
    email: string;
    displayName: string;
    days: string[];
    description: string[];
    cuisines: Cuisine[];
    slots: string[];
    serviceAreas: LocalArea[];
    categories: string[];
    specials: string[];
    gallery: string[];
    rating: number;
    reviews: number;
    address: Address;
    contact: ChefContact;
    active: boolean;
    minimumOrder: number;
    packagingFee: number;
    delivery: boolean;
    partyOrders: boolean;
    freeDeliveryOver: number;
    deliveryMinimum: number;
    deliveryFee: number;
    deliveryDistance: number;
    minimumPartyOrder: number;
}


export interface FoodOrderItem {
    _tempId: number;
    id: string;
    image: string;
    name: string;
    quantity: number;
    price: number;
    extras: Extra[];
    choice: Extra;
    subTotal: number;
    specialInstruction: string;
}