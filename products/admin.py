from django.contrib import admin

# Register your models here.

from .models import Product
from .models import User
from .models import Cart
from .models import Order
admin.site.register(Product)
list_field=['Products']

