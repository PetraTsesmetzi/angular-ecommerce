import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})

export class ProductService  {


  private baseUrl='http://localhost:8080/api/products';
  private categoryUrl='http://localhost:8080/api/product-category';
  constructor(private httpClient:HttpClient) {}

  getProductListPaginate(thePage:number, thePageSize: number, theCategoryId: number): Observable<GetResponseProducts>{
    console.log('thePage',thePage);
    console.log('thePageSize',thePageSize);
    console.log('theCategoryId',theCategoryId);
    //@TODO: need to build URL based category id
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`+`&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
    // return this.getProducts(searchUrl)
  }

  getProductList(theCategoryId: number): Observable<Product[]>{
    console.log('theID',theCategoryId);
    
    //@TODO: need to build URL based category id
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`

    return this.getProducts(searchUrl)
  }
  getProductCategories():Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response=>response._embedded.productCategory)
    )
  }

  searchProducts(theKeyword: string):Observable<Product[]>{
    //@TODO: need to build URL based keyword id
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
    return this.getProducts(searchUrl)
  }

  searchProductsPaginate(thePage:number, thePageSize: number, theKeyword:string): Observable<GetResponseProducts>{
    console.log('thePage',thePage);
    console.log('thePageSize',thePageSize);
   
    //@TODO: need to build URL based on keyword,page and size
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`+`&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
    // return this.getProducts(searchUrl)
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProduct(theProductId: number):Observable<Product> {
    //need to build URL based on product id (http://localhost:8080/api/products/11)
    const productUrl=`${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl)
  }

}
interface GetResponseProducts{
  _embedded:{
    products:Product[]
  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}
interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[]
  }
}
