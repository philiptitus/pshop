from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class SpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specification
        fields = '__all__'
 


class BookMarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookMark
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'



class DatabaseCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatabaseCart
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    specifications = serializers.SerializerMethodField(read_only=True)



    class Meta:
        model = Product
        fields = '__all__'  # Update with actual fields from the Product model

    def get_reviews(self,obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data
    
    def get_specifications(self,obj):
        specifications = obj.specification_set.all()
        serializer = SpecificationSerializer(specifications, many=True)
        return serializer.data





class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']  


    def get__id(self, obj):
        return obj.id
    
    def get_isAdmin(self, obj):
        return obj.is_staff

        
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name



class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']  

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'
        
class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data
    

    def get_shippingAddress(self, obj):
        try:
            seriallizer = ShippingAddressSerializer(
                obj.shippingaddress, many = False
            )
        except:
            seriallizer = False
        return seriallizer.data

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
    

# THE MAIN FUNCTION OF SERIALIZERS IS TO TURN THE DATA TO JSON FORMAT 
# THIS IS BECAUSE THE REACT ON THE FRONT-END ONLY UNDERSTAND JSON



class BookMarkSerializer(serializers.ModelSerializer):

    class Meta:
        model = BookMark
        fields = '__all__'
    

