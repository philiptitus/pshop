from django.urls import path
from ..views.product_views import  *


urlpatterns = [
    path('', GetProductsView.as_view(), name='get_products'),
    path('create/', createProduct.as_view(), name='product-create'),
    path('upload/', uploadImage.as_view(), name='image-upload'),
    path('bookmarks/', getMyBookMarks.as_view(), name='my-bookmarks'),
    path('brands/', GetBrand.as_view(), name='brands'),
    path('categorys/', GetCategory.as_view(), name='categorys'),

    path('databasecarts/', getMyDatabasecartItems.as_view(), name='my-database-cart'),
    path('databasecarts/delete/', DeleteCartItems.as_view(), name='cart-delete-all'),
    path('databasecarts/delete/<str:pk>/', deleteCartItem.as_view(), name='cart-delete'),
    path('category/<str:pk>/', GetSpecificCategory.as_view(), name='category'),
    path('brand/<str:pk>/', GetSpecificBrand.as_view(), name='brand'),
    path('brandspecific/<str:pk>/', GetSpecificBrandItems.as_view(), name='brandspecific'),
    path('categoryspecific/<str:pk>/', GetSpecificCategoryItems.as_view(), name='categoryspecific'),




    path('updatecart/<str:pk>/', updateCartItems.as_view(), name='cart-update'),
    path('<str:pk>/add/', addBookmarkItems.as_view(), name='create-bookmark'),
    path('databasecart/<str:pk>/', GetCartItem.as_view(), name='get_cart_item'),
    path('<str:pk>/add/cart/', adddatabaseCartItems.as_view(), name='create-cart'),
    path('<str:pk>/reviews/', createProductReview.as_view(), name='create-review'),
    path('<str:pk>/', GetProduct.as_view(), name='get_product'),
    path('delete/<str:pk>/', deleteProduct.as_view(), name='product-delete'),
    path('update/<str:pk>/', updateProduct.as_view(), name='product-update'),
    path('bookmarks/delete/<str:pk>/', deleteBookMark.as_view(), name='bookmark-delete'),





]
