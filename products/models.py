from __future__ import unicode_literals
from django.db import models
from datetime import datetime
from django.utils.timezone import now


# Create your models here.
class Product(models.Model):
  title      =models.CharField(max_length=120)
  description=models.CharField(max_length=200)
  price      =models.DecimalField(decimal_places=2,max_digits=10000)
  summary    =models.CharField(max_length=250)

def __str__(self):
  return self.title

class UserManager(models.Manager):
    def validator(self, postData):
        errors = {}
        if (postData['first_name'].isalpha()) == False:
            if len(postData['first_name']) < 2:
                errors['first_name'] = "First name can not be shorter than 2 characters"

        if (postData['last_name'].isalpha()) == False:
            if len(postData['last_name']) < 2:
                errors['last_name'] = "Last name can not be shorter than 2 characters"

        if len(postData['email']) == 0:
            errors['email'] = "You must enter an email"

        if len(postData['password']) < 8:
            errors['password'] = "Password is too short!"

        return errors


class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    objects = UserManager()

class Cart(models.Model):
    product = models.ForeignKey("Product", on_delete=models.CASCADE)
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    unit = models.PositiveIntegerField(default=0)
    total = models.PositiveIntegerField(default=0)
    

class Order(models.Model):
    product = models.ForeignKey("Product", on_delete=models.CASCADE)
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)
    total = models.PositiveIntegerField(default=0)
    order_time = models.DateTimeField(default=now)
