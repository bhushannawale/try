from django.urls import path
from .views import list_products,create_product,update_product,delete_product,view_product,index,login,success,register,index2,myCart,addToCart,removeFromCart,checkout,confirmOrder,myOrders

urlpatterns=[
      path('products',list_products,name='list_products'),
      path('new',create_product,name='create_products'),
      path('update/<int:id>/',update_product, name='update_product'),
      path('delete/<int:id>/',delete_product, name='delete_product'),
      path('view',view_product, name='view_product'),
      path('', index, name='index'),
      path('2', index2, name='index2'),
      path('register', register, name='register'),
      path('login', login, name='login'),
      path('success', success, name='success'),
      path('myCart', myCart, name='myCart'),
      path('addToCart/<int:id>', addToCart, name="addToCart"),
      path('removeFromCart/<int:id>', removeFromCart, name="removeFromCart"),
      path('checkout/<int:id>', checkout, name="checkout"),
      path('confirmOrder/<int:id>', confirmOrder, name="confirmOrder"),
      path('myOrders', myOrders, name='myOrders'),
]
