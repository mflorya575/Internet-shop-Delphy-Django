from core.models import Product, Category, Vendor, CartOrder,\
    CartOrderItems, ProductImages, ProductReview, Wishlist, Address

from django.core.exceptions import ObjectDoesNotExist


def default(request):
    categories = Category.objects.all()
    try:
        address = Address.objects.get(user=request.user)
    except ObjectDoesNotExist:
        address = None

    return {
        'categories': categories,
        'address': address,
    }
