from django.urls import path

from core import views


app_name = 'core'

urlpatterns = [

    # Homepage
    path('', views.index, name='index'),
    path('products/', views.product_list_view, name='product_list'),
    path('product/<pid>/', views.product_detail_view, name='product_detail'),

    # Category
    path('category/', views.category_list_view, name='category_list'),
    path('category/<cid>/', views.category_product_list_view, name='category_product_list'),

    # Vendor
    path('vendors/', views.vendor_list_view, name='vendor_list'),
    path('vendor/<vid>/', views.vendor_detail_view, name='vendor_detail'),
]
