import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {
    console.log("test")
    // check if we already have the item in out cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {

      //find the item in the cart bassed on item id
      //for (let tempCartItem of this.cartItems) {
      //if (theCartItem.id === tempCartItem.id) {
      //existingCartItem = tempCartItem;
      //break;
      //}


      // to replace the for loop - this is a refactor code way
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);

    }

    // check if we found it 
    alreadyExistsInCart = (existingCartItem != undefined);


    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem.quantity += 1;
    }
    else {
      this.cartItems.push(theCartItem);
    }

    // compute cart total quantity and quality
    this.computeCartTotal();


  }

  decrementQuantity(theCartItem: CartItem) {

    theCartItem.quantity--;
    if (theCartItem.quantity == 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotal();
    }
  }

  remove(theCartItem: CartItem) {

    // get index of item in the array 
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id == theCartItem.id); 
    
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotal();
    }
    
  }






  computeCartTotal() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let tempCartItem of this.cartItems) {
      totalPriceValue += tempCartItem.unitPrice * tempCartItem.quantity;
      totalQuantityValue += tempCartItem.quantity;
    }

    // public the new values -- This will publish events to all subscribers (1 event for each varaible)
    // .next(...) will publish/send the event
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);

  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log("Contents of the cart");
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.unitPrice * tempCartItem.quantity;
      console.log(`name: ${tempCartItem.name}, quantity= ${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subtotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log("------");
  }


}
