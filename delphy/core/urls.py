from django.urls import path

from core import views


app_name = 'core'

urlpatterns = [
    path('', views.index, name='index'),
    path('products', views.product_list_view, name='product_list'),
    # path('', views.index, name='index'),
]
