from django.db import models
from django.contrib.auth.models import User
import secrets
import string
from django.db import models
from django.dispatch import receiver
import random
from django.db.models.signals import pre_save, post_save



# Create your models here.

from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=264, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/meganfox.webp')
    _id = models.AutoField(primary_key=True, editable=False)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
    

class Brand(models.Model):
    name = models.CharField(max_length=264, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/meganfox.webp')
    _id = models.AutoField(primary_key=True, editable=False)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=264, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/meganfox.webp')
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    description = models.TextField(max_length=1000, null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countinStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)
    isFavourite = models.BooleanField(default=False)
    category_name = models.CharField(max_length=264, null=True, blank=True)
    brand_name = models.CharField(max_length=264, null=True, blank=True)


    

    class Meta:
        ordering = ['createdAt']

    def __str__(self):
        return self.name

    
    def save(self, *args, **kwargs):
        if self.category:
            self.category_name = self.category.name
            self.brand_name = self.brand.name

        super().save(*args, **kwargs)

    

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    name = models.CharField(max_length=264, null=True, blank=True)
    # image =
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(max_length=1000, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.comment

    def save(self, *args, **kwargs):
        if self.user:
            self.name = self.user.email  # Use email address instead of first name
        super().save(*args, **kwargs)




class Specification(models.Model):

    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    specification_one = models.CharField(max_length=264, null=True, blank=True)
    specification_two = models.CharField(max_length=264, null=True, blank=True)
    specification_three = models.CharField(max_length=264, null=True, blank=True)
    specification_four = models.CharField(max_length=264, null=True, blank=True)
    specification_five = models.CharField(max_length=264, null=True, blank=True)
    specification_six = models.CharField(max_length=264, null=True, blank=True)
    specification_seven = models.CharField(max_length=264, null=True, blank=True)
    specification_eight = models.CharField(max_length=264, null=True, blank=True)
    specification_nine = models.CharField(max_length=264, null=True, blank=True)
    specification_ten = models.CharField(max_length=264, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.product)

    def save(self, *args, **kwargs):
        if self.user:
            self.name = self.user.email  # Use email address instead of first name
        super().save(*args, **kwargs)


class SampleImages(models.Model):
    
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    image1 = models.ImageField(null=True, blank=True, default='/meganfox.webp')
    image2 = models.ImageField(null=True, blank=True, default='/meganfox.webp')
    image3 = models.ImageField(null=True, blank=True, default='/meganfox.webp')
    image4 = models.ImageField(null=True, blank=True, default='/meganfox.webp')
    image5 = models.ImageField(null=True, blank=True, default='/meganfox.webp')
    image6 = models.ImageField(null=True, blank=True, default='/meganfox.webp')
    _id = models.AutoField(primary_key=True, editable=False)



    def __str__(self):
        return str(self.product)

    def save(self, *args, **kwargs):
        if self.user:
            self.name = self.user.email  # Use email address instead of first name
        super().save(*args, **kwargs)







        

class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=264, null=True, blank=True)
    shippingPrice =  models.DecimalField(max_digits=1000,decimal_places=2, null=True, blank=True)
    taxPrice =  models.DecimalField(max_digits=1000,decimal_places=2, null=True, blank=True)
    totalPrice =  models.DecimalField(max_digits=1000,decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isdelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True )
    # image =  
    _id = models.AutoField(primary_key=True, editable=False)
    serial = models.CharField(max_length=10, unique=True, blank=True, null=True)

    def generate_serial(self):
        serial_length = 10  # Adjust the length as needed
        characters = string.ascii_letters + string.digits
        return ''.join(secrets.choice(characters) for _ in range(serial_length))

    def save(self, *args, **kwargs):
        if not self.serial:
            self.serial = self.generate_serial()
        super().save(*args, **kwargs)

    def __str__(self):
        return str(self.createdAt)




class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=264, null=True, blank=True)
    qty =  models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=1000, decimal_places=2, null=True, blank=True)
    image =  models.CharField(max_length=1000, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)


    def __str__(self):
        return str(self.name)
    

class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=264, null=True, blank=True)
    postalCode =  models.CharField(max_length=1000, null=True, blank=True)
    country =  models.CharField(max_length=1000, null=True, blank=True)
    city =  models.CharField(max_length=1000, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
    shippingPrice =  models.DecimalField(max_digits=7,decimal_places=2, null=True, blank=True)



    def __str__(self):
        return str(self.address)







class BookMark(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    bookmarked_product_name = models.CharField(max_length=264, null=True, blank=True)
    bookmarked_product_id = models.IntegerField(null=True, blank=True)
    bookmarked_product_image =  models.ImageField(null=True, blank=True, default='/meganfox.webp')

    # image =  
    _id = models.AutoField(primary_key=True, editable=False)

    def save(self, *args, **kwargs):
        if self.product:
            self.bookmarked_product_name = self.product.name
            self.bookmarked_product_id = self.product._id
            self.bookmarked_product_image = self.product.image
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} bookmarked {self.product.name}"
    

class DatabaseCart(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    DatabaseCart_product_name = models.CharField(max_length=264, null=True, blank=True, editable=False)
    DatabaseCart_product_id = models.IntegerField(null=True, blank=True, editable=False)
    DatabaseCart_product_qty = models.IntegerField(null=True,blank=True, default=0)
    DatabaseCart_product_price = models.DecimalField(max_digits=20, decimal_places=2, null=True, blank=True)
    DatabaseCart_product_image =  models.ImageField(null=True, blank=True, default='/meganfox.webp')
    DatabaseCart_product_countinStock = models.IntegerField(null=True,blank=True, default=0)



    



    # image =  
    _id = models.AutoField(primary_key=True, editable=False)

    def save(self, *args, **kwargs):
        if self.product:
            self.DatabaseCart_product_name = self.product.name
            self.DatabaseCart_product_id = self.product._id
            self.DatabaseCart_product_price = self.product.price
            self.DatabaseCart_product_image = self.product.image
            self.DatabaseCart_product_countinStock = self.product.countinStock

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username if self.user else 'No User'} - {self.DatabaseCart_product_name}"


class RandomNumber(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    generated_number = models.CharField(max_length=6, blank=True, editable=False)

    def save(self, *args, **kwargs):
        existing_random_number = RandomNumber.objects.filter(user=self.user)
        if existing_random_number.exists():
            existing_random_number.delete()

        if not self.generated_number:
            self.generated_number = self.generate_random_number()
        super(RandomNumber, self).save(*args, **kwargs)

    def generate_random_number(self):
        return str(random.randint(100000, 999999))  # 6-digit random number

    def __str__(self):
        return f"{self.user.username} - {self.generated_number}"

@receiver(pre_save, sender=RandomNumber)
def generate_and_set_random_number(sender, instance, **kwargs):
    if not instance.generated_number:
        instance.generated_number = instance.generate_random_number()

@receiver(post_save, sender=RandomNumber)
def check_user_number(sender, instance, created, **kwargs):
    if created:
        try:
            user_number_instance = UserNumber.objects.get(user=instance.user)
            user_number_instance.update_result()
        except UserNumber.DoesNotExist:
            pass  # Handle the case where UserNumber doesn't exist for this user

class UserNumber(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    user_number = models.CharField(max_length=6, blank=True, default="336028")
    result = models.BooleanField(default=False)  # Field to store True or False
    updating_result = models.BooleanField(default=False)  # Flag to prevent recursion

    def save(self, *args, **kwargs):
        existing_user_number = UserNumber.objects.filter(user=self.user)
        if existing_user_number.exists():
            existing_user_number.delete()

        super(UserNumber, self).save(*args, **kwargs)
        if not self.updating_result:
            self.updating_result = True
            self.update_result()
            self.updating_result = False

    def update_result(self):
        try:
            random_number_instance = RandomNumber.objects.get(user=self.user)
            new_result = random_number_instance.generated_number == self.user_number
            if self.result != new_result:
                self.result = new_result
                self.save()
        except RandomNumber.DoesNotExist:
            pass  # Handle the case where RandomNumber doesn't exist for this user

    def __str__(self):
        return f"{self.user.username} - {self.user_number} - Result: {self.result}"
