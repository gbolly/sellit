import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from redis_om import get_redis_connection, HashModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_methods=["*"],
    allow_headers=["*"],
)

redis = get_redis_connection(
    host=os.environ.get("PUBLIC_ENDPOINT"),
    port=int(os.environ.get("PORT")),
    password=os.environ.get("USER_PASSWORD"),
    decode_responses=True
)


class Product(HashModel):
    name: str
    price: float
    quantity: int

    class Meta:
        database = redis


def format(pk: str):
    product = Product.get(pk)

    return {
        "id": product.pk,
        "name": product.name,
        "price": product.price,
        "quantity": product.quantity
    }


@app.get("/products")
async def get_products():
    return [format(pk) for pk in Product.all_pks()]


@app.get("/products/{pk}")
async def get_product(pk: str):
    return Product.get(pk)


@app.post("/products")
async def create_product(product: Product):
    return product.save()


@app.delete("/products/{pk}")
async def get_product(pk: str):
    return Product.delete(pk)
