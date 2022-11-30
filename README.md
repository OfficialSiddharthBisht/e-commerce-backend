# e-commerce-backend

## Product Routes-
### 1 -> To get all the products
Get Request
```
http://localhost:3005/api/v1/products
```

### 2 -> Create New Product(admin)
Post Request
```
http://localhost:3005/api/v1/product/new
```
```
{
    "name" : "i phone 8",
    "price": 15000,
    "description" : "Old is gold but here is 8",
    "categories" : "Smartphones",
    "images" : {
        "public_id" : "sample id",
        "url" : "http://google.com"
    }
}
```
### 3 -> Update Product (admin)
Put Request
```
http://localhost:3005/api/v1/product/6385851169cc1ec39c296460
```
```
{
    "name" : "i phone 6",
    "price": 12000,
    "description" : "Here is i phone 6",
    "categories" : "Smartphones",
    "images" : {
        "public_id" : "sample id",
        "url" : "http://google.com"
    }
}
```
### 4 -> Delete Product (admin)
Delete Request
```
http://localhost:3005/api/v1/product/635038da3c973c2971ecadd5

```
### 5 -> Product Details
Get Request
```
http://localhost:3005/api/v1/product/635038da3c973c2971ecadd5
```

## Product Feature Routes

### 1 -> Search Feature
Get Request
```
http://localhost:3005/api/v1/products?keyword=iphone
```

### 2 -> Filter By Category Feature
Get Request
```
http://localhost:3005/api/v1/products?keyword=i&category=Smartphones
```

### 3 -> Filter by price feature
Get request
```
http://localhost:3005/api/v1/products?keyword=i&price[gte]=100&price[lt]=200000
```


