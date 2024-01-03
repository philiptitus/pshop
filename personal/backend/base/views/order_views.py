from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from ..models import *
from rest_framework import generics
from ..serializers import *
from rest_framework import status
from datetime import *
from django.utils import timezone

 

@permission_classes([IsAuthenticated])
class addOrderItems(APIView):
    def post(self, request):
        user = request.user
        data = request.data
        orderItems = data['orderItems']

        if orderItems and len(orderItems) == 0:
            return Response({'detail': 'Woops Seems You Have Nothing In Your Cart'}, status=status.HTTP_400_BAD_REQUEST)
        

        else:
            #1 Create order
            order = Order.objects.create(

                user = user,
                paymentMethod = data['paymentMethod'],
                taxPrice = data['taxPrice'],
                shippingPrice = data['shippingPrice'],
                totalPrice=data['totalPrice']




            )
            #2 Crreate Shipping Address
            shipping = ShippingAddress.objects.create(
                order = order,
                address = data['shippingAddress']['address'],
                city = data['shippingAddress']['city'],
                postalCode = data['shippingAddress']['postalCode'],
                country = data['shippingAddress']['country'],


            )
            #3 Create Order items and set order To order Items relationship
            for i in orderItems:
                product = Product.objects.get(_id=i['product'])

                item = OrderItem.objects.create(
                    product = product,
                    order = order,
                    name = product.name,
                    qty=i['DatabaseCart_product_qty'],
                    price=i['DatabaseCart_product_price'],
                    image = product.image.url,
                )
                #Update Stock
                product.countinStock -= item.qty
                product.save()




            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        

@permission_classes([IsAuthenticated])
class getOrderById(APIView):
    def get(self, request, pk):
        try:
            user = request.user
            order = Order.objects.get(_id=pk)
            if user.is_staff or order.user == user:
                serializer = OrderSerializer(order, many=False)
                return Response(serializer.data)
            else:
                Response({'detail': 'Not authorized'}, status=status.HTTP_400_BAD_REQUSET)

                # return Response
        except:
            return Response({'detail':'Looks Like the order does not exist anymore'}, status=status.HTTP_400_BAD_REQUEST)


class updateOrderToPaid(APIView):
    def put(self, request, pk):
        order = Order.objects.get(_id=pk)   
        order.isPaid = True
        order.paidAt = datetime.now()
        
        order.save()

                # Update stock only when the order is confirmed as paid
        self.update_stock_on_payment_confirmation(order)

        return Response('Order Was Paid')

    def update_stock_on_payment_confirmation(self, order):
        # Iterate through order items and update stock
        for item in order.orderItems_set.all():
            product = Product.objects.get(_id=item._id)
            product.countinStock -= item.qty
            product.save()
        

        return Response('Order Was Paid')
    


@permission_classes([IsAuthenticated])
class getMyOrders(APIView):
    def get(self, request):
        user = request.user
        orders = user.order_set.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    
@permission_classes([IsAdminUser])
class getOrders(APIView):
    def get(self, request):
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    
@permission_classes([IsAdminUser])
class updateOrderToDelivered(APIView):
    def put(self, request, pk):
        order = Order.objects.get(_id=pk)
        
        # Use timezone-aware datetime
        order.isdelivered = True
        order.deliveredAt = timezone.now()
        order.save()

        return Response('Order Was Delivered')