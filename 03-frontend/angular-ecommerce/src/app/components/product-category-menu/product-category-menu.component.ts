import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[]; 
  constructor(private productServices: ProductService) { }

  ngOnInit(): void {
    this.listProductCategories(); 
  }


  listProductCategories() {
    
    this.productServices.getProductCategories().subscribe(
      data => {
        // To display something with JSON format
        //console.log('Product Categories = ' + JSON.stringify(data));
        this.productCategories = data;
      } 
    );
  }

}
