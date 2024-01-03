from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from ..models import Product,Review 
from rest_framework.decorators import permission_classes

from rest_framework import generics
from ..serializers import *
from rest_framework import status



class GetProductsView(APIView):
    def get(self, request):
        qs = Product.objects.all()
        name = request.query_params.get('name')
        
        if name is not None:
            qs = qs.filter(name__icontains=name).order_by('-createdAt')
        
        serializer = ProductSerializer(qs, many=True)
        return Response(serializer.data)

class GetProduct(APIView):
    def get(self, request, pk):
        product = Product.objects.get(_id=pk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)

@permission_classes([IsAdminUser])
class createProduct(APIView):
    def post(self, request):
        user = request.user
        product = Product.objects.create(
            user =user,
            name = 'samsung',
            price = 0,
            countinStock=0,
            description = 'good phone'

        )
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    
class updateProduct(APIView):
    def put(self, request, pk):
        product = Product.objects.get(_id=pk)
        data = request.data
        brand = data['brand']
        category = data['category']
        product.name = data['name']
        product.price = data['price']
        product.brand = Brand.objects.get(name = brand)
        product.countinStock = data['countinStock']
        product.category = Category.objects.get(name=category)
        product.description = data['description']

        product.save()


        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    

@permission_classes([IsAdminUser])
class deleteProduct(APIView):
    def delete(self, request, pk):
        product = Product.objects.get(_id=pk)
        product.delete()
        return Response("Product Deleted")

class uploadImage(APIView):
    def post(self, request):
        data = request.data

        product_id = data['product_id']
        product = Product.objects.get(_id = product_id)

        product.image = request.FILES.get('image')
        product.save()
        return Response('image was uploaded')
    
@permission_classes([IsAuthenticated])
class createProductReview(APIView):
    def post(self,request,pk):
        user = request.user
        product = Product.objects.get(_id=pk)
        data = request.data

        # 1. If Review already exists
        alreadyExists = Review.objects.filter(user=user, product=product).exists()

        if alreadyExists :
            content = {'detail':'Product already Reviewed'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        
        # 2 - No rating or 0
        elif data['rating'] == 0:
            content = {'detail':'Please Select A rating'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        # 3. Everything is ok
        else:
            review = Review.objects.create(
                user = user,
                product = product,
                name = user.first_name,
                rating = data['rating'],
                comment=data['comment']
            )

            reviews = product.review_set.all()
            product.numReviews = len(reviews)

            total = 0
            for i in reviews:
                total += i.rating

            product.rating = total / len (reviews)
            product.save()
            

            return Response('Review Saved')

@permission_classes([IsAuthenticated])
class addBookmarkItems(APIView):
    def post(self,request,pk):
        user = request.user
        product = Product.objects.get(_id=pk)

        # 1. If Review already exists
        alreadyExists = BookMark.objects.filter(user=user , product=product).exists()

        if alreadyExists :
            content = {'detail':'Product already Bookmarked'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        
        # 2 - No rating or 0
        # 3. Everything is ok
        else:
            bookmark = BookMark.objects.create(
                user = user,
                product = product,

            )

            

            return Response('Bookmark Saved')



@permission_classes([IsAuthenticated])
class getMyBookMarks(APIView):
    def get(self, request):
        user = request.user
        bookmarks = user.bookmark_set.all()
        serializer = BookMarkSerializer(bookmarks, many=True)
        return Response(serializer.data)
    

@permission_classes([IsAuthenticated])
class deleteBookMark(APIView):
    def delete(self, request, pk):
        bookmarkForDeletion = BookMark.objects.get(_id=pk)
        bookmarkForDeletion.delete()
        return Response("The Bookmark Was Deleted Successfully")






@permission_classes([IsAuthenticated])
class adddatabaseCartItems(APIView):
    def post(self,request,pk):
        user = request.user
        product = Product.objects.get(_id=pk)
        data = request.data

        # 1. If Review already exists
        alreadyExists = DatabaseCart.objects.filter(user=user , product=product).exists()

        if alreadyExists :
            content = {'detail':'Already added to Cart'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        
        # 2 - No rating or 0
        # 3. Everything is ok
        else:
            databaseCart = DatabaseCart.objects.create(
                user = user,
                product = product,
                DatabaseCart_product_qty = data["qty"]

            )

            

            return Response('Added To Cart Successfully...')
        


@permission_classes([IsAuthenticated])
class getMyDatabasecartItems(APIView):
    def get(self, request):
        user = request.user
        databaseCartItems = user.databasecart_set.all()
        serializer = DatabaseCartSerializer(databaseCartItems, many=True)
        return Response(serializer.data)
    




@permission_classes([IsAuthenticated])
class deleteCartItem(APIView):
    def delete(self, request, pk):
        ItemForDeletion = DatabaseCart.objects.get(_id=pk)
        ItemForDeletion.delete()
        return Response("The Item Was Removed From Your Cart Successfuly Successfully")
    


@permission_classes([IsAuthenticated])
class DeleteCartItems(APIView):
    def delete(self, request):
        # Assuming DatabaseCart has a ForeignKey field named 'user' for the user
        # Adjust the field name accordingly if it's different in your model
        items_for_deletion = DatabaseCart.objects.filter(user=request.user)

        if items_for_deletion.exists():
            items_for_deletion.delete()
            return Response("All Cart Items Were Removed From Your Cart Successfully")
        else:
            return Response("No Cart Items Found for the User", status=status.HTTP_404_NOT_FOUND)







class updateCartItems(APIView):
    def put(self, request, pk):
        product = DatabaseCart.objects.get(_id=pk)
        data = request.data

        product.DatabaseCart_product_qty = data['qty']


        product.save()


        serializer = DatabaseCartSerializer(product, many=False)
        return Response(serializer.data)
    

class GetCartItem(APIView):
    def get(self, request, pk):
        product = DatabaseCart.objects.get(_id=pk)
        serializer = DatabaseCartSerializer(product, many=False)
        return Response(serializer.data)
    

class GetCategory(APIView):
    def get(self, request):
        qs = Category.objects.all()
        name = request.query_params.get('name')
        
        if name is not None:
            qs = qs.filter(name__icontains=name)

        serializer = CategorySerializer(qs, many=True)
        return Response(serializer.data)
    

class GetSpecificCategory(APIView):
    def get(self, request, pk):
        category = Category.objects.get(_id=pk)
        serializer = CategorySerializer(category, many=False)
        return Response(serializer.data)
        

        








class GetBrand(APIView):
    def get(self, request):
        qs = Brand.objects.all()
        name = request.query_params.get('name')
        
        if name is not None:
            qs = qs.filter(name__icontains=name)

        serializer = BrandSerializer(qs, many=True)
        return Response(serializer.data)




class GetSpecificBrand(APIView):
    def get(self, request, pk):
        brand = Brand.objects.get(_id=pk)
        serializer = BrandSerializer(brand, many=False)
        return Response(serializer.data)
    


class GetSpecificBrandItems(APIView):
    def get(self, request, pk):
        brand = Product.objects.filter(brand=pk)
        serializer = ProductSerializer(brand, many=True)
        return Response(serializer.data)
    

class GetSpecificCategoryItems(APIView):
    def get(self, request, pk):
        category = Product.objects.filter(category=pk)
        serializer = ProductSerializer(category, many=True)
        return Response(serializer.data)

