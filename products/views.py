
from django.shortcuts import render,redirect,HttpResponse
from .models import Product
from .forms import ProductForm
from .models import User
from .models import Cart
from .models import Order
from django.contrib import messages
from django.utils import timezone

from django.core.mail import send_mail
from django.conf import settings


def list_products(request):
    products=Product.objects.all()
    count=Product.objects.all().count()
    return render(request,'products.html',{'products':products, 'count':count})

def create_product(request):
    form= ProductForm(request.POST or None)

    if form.is_valid():
        form.save()
        messages.success(request, ('Product Has Been Added Successfully!!!! '))
        return redirect('list_products')

    return render(request,'products-form.html',{'form':form})

def update_product(request,id):
    product=Product.objects.get(id=id)
    form=ProductForm(request.POST or None,instance=product)

    if form.is_valid():
        form.save()
        messages.success(request, ('Product Has Been Updated Successfully!!!! '))
        return redirect('list_products')

    return render(request,'products-form.html',{'form':form})

def delete_product(request,id):
    product=Product.objects.get(id=id)

    if request.method=='POST':
        product.delete()
        messages.success(request, ('Product Has Been Deleted Successfully!!!! '))
        return redirect('list_products')

    return render(request,'prod-delete-confirm.html',{'product':product})

def  view_product(request):
    if request.method == 'POST':
        search_query = request.POST['sb']
        print("Search Query : ",search_query)
        product=Product.objects.filter(title__icontains=search_query)

    return render(request, 'only-prod.html',{'product':product})


def index(request):
    return render(request, 'index.html')


def index2(request):
    return render(request, 'index2.html')


def register(request):
    errors = User.objects.validator(request.POST)
    if len(errors):
        for tag, error in errors.items():
            messages.error(request, error, extra_tags=tag)
        return redirect('/')

    hashed_password = request.POST['password'].encode('utf-8')
    user = User.objects.create(first_name=request.POST['first_name'], last_name=request.POST['last_name'], password=hashed_password, email=request.POST['email'])
    user.save()
    request.session['id'] = user.id
    return redirect('/success')

def login(request):
    if (User.objects.filter(email=request.POST['login_email']).exists()):
        user = User.objects.filter(email=request.POST['login_email'])[0]
        if (request.POST['login_password'].encode('utf-8'), user.password.encode('utf-8')):
            request.session['id'] = user.id
            return redirect('/products')

def success(request):
    user = User.objects.get(id=request.session['id'])
    context = {
        "user": user
    }
    return render(request, 'success.html', context)

def addToCart(request, id):
    u = User.objects.get(id=request.session['id'])
    pro = Product.objects.get(id=id)
    if Cart.objects.filter(product=pro, user=u).exists():
        c = Cart.objects.get(product=pro, user=u).unit + 1
        i = Cart.objects.get(product=pro, user=u)
        i.unit = c
        i.total = c * pro.price
        i.save()
    else:
        item = Cart.objects.create(product=pro, user=u, unit=1)
        item.total = pro.price
        item.save()
    messages.success(request, (' Added To Cart '))
    return redirect('/myCart')

def myCart(request):
    u = User.objects.get(id=request.session['id'])
    items = Cart.objects.filter(user=u)
    return render(request, 'myCart.html', {'items':items})

def removeFromCart(request, id):
    u = User.objects.get(id=request.session['id'])
    pro = Product.objects.get(id=id)
    item = Cart.objects.filter(product=pro, user=u)
    item.delete()
    return redirect('/myCart')

def checkout(request, id):
    u = User.objects.get(id=request.session['id'])
    pro = Product.objects.get(id=id)
    item = Cart.objects.get(product=pro, user=u)
    return render(request, 'checkout.html', {'item':item})

def confirmOrder(request, id):
    u = User.objects.get(id=request.session['id'])
    pro = Product.objects.get(id=id)
    cart    =   Cart.objects.get(product=pro, user=u)
    item = Order.objects.create(product=pro, user=u, quantity=cart.unit, total=cart.total)
    item.save()

    subject = 'ORDER CONFIRMATION'
    message = 'Your order of \n Product : '+ pro.title + '\n Price : '+ str(item.total) + '\n is confirmed'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [u.email,]
    send_mail( subject, message, email_from, recipient_list )


    return render(request, 'confirmOrder.html', {'item':item})

def myOrders(request):
    u = User.objects.get(id=request.session['id'])
    items = Order.objects.filter(user=u).order_by('-order_time')
    return render(request, 'myOrders.html', {'items':items})