# Business API

This API provides endpoints to manage products, customers, and bills in a business system. It allows users to create, read, update, and delete products, customers, and bills.

## Features
- **Product Management**: Create, read, update, and delete products.
- **Customer Management**: Create, read, update, and delete customer data.
- **Bill Management**: Create and view bills for customers.


## Endpoints

### Products

- **POST `/api/product`**: Create a new product
    - Request body:
    ```json
    {
      "name": "Product Name",
      "price": "Product Price",
      "description": "Product Description"
    }
    ```

- **GET `/api/product/:id`**: Get a product by ID
    - URL parameter: `id` (Product ID)

- **GET `/api/product`**: Get all products

- **PUT `/api/product/:id`**: Update a product by ID
    - URL parameter: `id` (Product ID)
    - Request body:
    ```json
    {
      "name": "Updated Product Name",
      "price": "Updated Product Price",
      "description": "Updated Product Description"
    }
    ```

- **DELETE `/api/product/:id`**: Delete a product by ID
    - URL parameter: `id` (Product ID)

---

### Customers

- **POST `/api/customer`**: Create a new customer
    - Request body:
    ```json
    {
      "name": "Customer Name",
      "email": "Customer Email",
      "address": "Customer Address"
    }
    ```

- **GET `/api/customer/:id`**: Get a customer by ID
    - URL parameter: `id` (Customer ID)

- **GET `/api/customer`**: Get all customers

- **PUT `/api/customer/:id`**: Update a customer by ID
    - URL parameter: `id` (Customer ID)
    - Request body:
    ```json
    {
      "name": "Updated Customer Name",
      "email": "Updated Customer Email",
      "address": "Updated Customer Address"
    }
    ```

- **DELETE `/api/customer/:id`**: Delete a customer by ID
    - URL parameter: `id` (Customer ID)

---

### Bills

- **POST `/api/bill`**: Create a new bill
    - Request body:
    ```json
    {
      "customerId": "Customer ID",
      "products": [
        {"productId": "Product ID", "quantity": 2},
        {"productId": "Another Product ID", "quantity": 1}
      ],
      "totalAmount": "Total Amount"
    }
    ```

- **GET `/api/bill/:id`**: Get a bill by ID
    - URL parameter: `id` (Bill ID)

- **GET `/api/bill`**: Get all bills


## Link de Postman
Puedes acceder a la colección de Postman en el siguiente enlace:  
[Documentación de Postman](https://procesosdelnegocio1.postman.co/workspace/4e387bf0-6c1e-4968-8bf5-7d9d87470d65)

![Postman Logo](https://www.postman.com/downloads/postman-logo-orange.svg)
