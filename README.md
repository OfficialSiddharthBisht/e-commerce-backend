# e-commerce-backend

To use the routes using deployed link (heroku , cyclic) you can replace localhost link with the deployed link
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

## Authentication Routes

### Register User
Post Request
```
http://localhost:3005/api/v1/register
```
```
{
    "name": "sid",
    "email": "sid@email.com",
    "password": "password",
    "role":"user"
}
```

### User Login
Post Request
```
http://localhost:3005/api/v1/login
```
```
{
    "email": "admin@email.com",
    "password": "password"
}
```

### Logout User
Post Request
```
http://localhost:3005/api/v1/logout
```

## User Routes

### 1 -> User Details (After user logged in)
Get Request
```
http://localhost:3005/api/v1/me
```

### 2 -> User Password Update
Put Request
```
http://localhost:3005/api/v1/password/update
```
```
{
    "oldPassword": "password",
    "newPassword": "password",
    "confirmPassword": "password"
}
```

### 3 -> Update User Profile
Put Request
```
http://localhost:3005/api/v1/me/update
```
```
{
    "name": "The Admin",
    "email": "admin@email.com"
}    
```

### 4 -> Get list of all users (for admin)
Get Request
```
http://localhost:3005/api/v1/admin/users
```

### 5 -> Get Single user detail (for admin)
Get Request
```
http://localhost:3005/api/v1/admin/user/6386288a6f61be886840e39a
```

## Order Routes

### Create New Order
Post Request
```
http://localhost:3005/api/v1/order/new
```
```
{
    "itemsPrice": 11000,
    "taxPrice" : 400,
    "shippingPrice": 600,
    "totalPrice": 12000,
    "orderItems" : [
        {
            "product": "6385851169cc1ec39c296460",
            "name" : "i phone 6",
            "price" : 12000,
            "image": "sampleImg",
            "quantity":1
        }
    ],
    "shippingInfo":{
        "address":"Charton Lodge Mallital Nainital",
        "city": "Nainital",
        "state":"Uttarakhand",
        "country":"India",
        "pincode":263001,
        "phoneNo":8077305268
    },
    "paymentInfo":{
        "id":"sample payment id",
        "status":"succeeded"
    }
}
```

### Get Order Details (User)
Get Request
```
http://localhost:3005/api/v1/orders/me
```

### Get All Order List (Admin)
Get Request
```
http://localhost:3005/api/v1/admin/orders
```

### Get Order Details (Admin)
Get Request
```
http://localhost:3005/api/v1/admin/order/:id
```

### Delete Order (Admin)
Delete Request
```
http://localhost:3005/api/v1/admin/order/:id
```

### Update Order Status (Admin)
Put Request
```
http://localhost:3005/api/v1/admin/order/:id
```
```
{
    "status": "Delivered"
}
```

## Reviews Routes

### Create / Update Product Reviews
Put Request
```
http://localhost:3005/api/v1/review
```
```
{
    "productId": "6385851169cc1ec39c296460",
    "comment" : "Nice product loved its features",
    "ratings" : 3
}
```

### Get Product Reviews
Get Request
```
http://localhost:3005/api/v1/reviews
```

### Delete Product Reviews
Delete Request
```
http://localhost:3005/api/v1/reviews
```
