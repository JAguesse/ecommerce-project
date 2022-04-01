import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination 
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  previousKeyWord: string = null;


  // inject our ProductService
  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute) { }

  // Ce qui permet à angular de chercher et charger toutes les données qui seront après amenées à être utilisées. 
  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });

  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProduct();
    }
  }

  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //if we have a different keyword than previous
    // then set thePageNumber to 1
    //

    if (this.previousKeyWord != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyWord = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`)

    this.productService.searchProductsPaginate(this.thePageNumber - 1,
      this.thePageSize,
      theKeyword).subscribe(this.processResult())
  }

  handleListProduct() {

    // check if "id" parameter is available 
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      // get the "id" param string. Convert string to a number using the "+" symbol. 
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      //not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    //
    // Check if we have a different category than previous
    // Note : Angular will reuse a component if it is currently being viewed
    //

    // if we have a different category id than previous
    // thenn set the Page Number back to 1

    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);


    //this method is invoked once you "subscribe()"
    // got the product of the given category id
    this.productService.getProductListPaginate(this.thePageNumber -1 ,
      this.thePageSize,
      this.currentCategoryId)
      .subscribe(this.processResult());


  }

  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(theProduct: Product) {
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
    
  }

}
