from core.models import Product, Category, Vendor, CartOrder, CartOrderItems, ProductImages, ProductReview, Wishlist, Address


def default(request):
    categories = Category.objects.all()

    return {
        'categories': categories
    }
