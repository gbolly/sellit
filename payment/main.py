import os
import requests
import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.background import BackgroundTasks
from redis_om import get_redis_connection, HashModel
from starlette.requests import Request


ORDER_STATUS = {
    "pending": "PENDING",
    "completed": "SUCCESS",
    "refunded": "REFUND",
    "failed": "FAILURE"
}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_methods=['*'],
    allow_headers=['*']
)

redis = get_redis_connection(
    host=os.environ.get("PUBLIC_ENDPOINT"),
    port=int(os.environ.get("PORT")),
    password=os.environ.get("USER_PASSWORD"),
    decode_responses=True
)

class Order(HashModel):
    product_id: str
    price: float
    fee: float
    total: float
    quantity: int
    status: str

    class Meta:
        database = redis


@app.get('/orders/{pk}')
async def get(pk: str):
    return Order.get(pk)


@app.post('/orders')
async def create(request: Request, background_tasks: BackgroundTasks):  # id, quantity
    body = await request.json()
    req = requests.get(f"http://localhost:8080/products/{body.get('id')}")
    product = req.json()
    quantity = body.get("quantity")
    price = product["price"]
    total = quantity * price
    fee = 0.02 * total
    order_total = total + fee

    order = Order(
        product_id=body.get("id"),
        price=price,
        quantity=quantity,
        fee=fee,
        total=order_total,
        status=ORDER_STATUS["pending"]
    )
    order.save()

    background_tasks.add_task(order_completed, order)

    return order


def order_completed(order: Order):
    time.sleep(10)
    order.status = ORDER_STATUS["completed"]
    order.save()
    redis.xadd('order_completed', order.dict(), '*')
