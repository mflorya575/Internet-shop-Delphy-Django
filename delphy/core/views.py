from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from taggit.models import Tag

from core.models import Product, Category, Vendor, CartOrder, CartOrderItems, ProductImages, ProductReview, Wishlist, Address
from core.forms import ProductReviewForm
from django.db.models import Count, Avg


def index(request):
    products = Product.objects.filter(product_status='published', featured=True)

    context = {
        'products': products,
    }

    return render(request, 'core/index.html', context)


def product_list_view(request):
    products = Product.objects.filter(product_status='published')

    context = {
        'products': products,
    }

    return render(request, 'core/product-list.html', context)


def category_list_view(request):
    categories = Category.objects.all()  # categories = Category.objects.all().annotate(product_count=Count("product"))

    context = {
        'categories': categories,
    }

    return render(request, 'core/category-list.html', context)


def category_product_list_view(request, cid):
    category = Category.objects.get(cid=cid)
    products = Product.objects.filter(product_status='published', category=category)

    context = {
        'category': category,
        'products': products,
    }

    return render(request, 'core/category-product-list.html', context)


def vendor_list_view(request):
    vendors = Vendor.objects.all()

    context = {
        'vendors': vendors,
    }

    return render(request, 'core/vendor-list.html', context)


def vendor_detail_view(request, vid):
    vendor = Vendor.objects.get(vid=vid)
    products = Product.objects.filter(vendor=vendor, product_status='published')

    context = {
        'vendor': vendor,
        'products': products,
    }

    return render(request, 'core/vendor-detail.html', context)


def product_detail_view(request, pid):
    product = Product.objects.get(pid=pid)
    # product = get_object_or_404(Product, pid=pid)
    products = Product.objects.filter(category=product.category).exclude(pid=pid)

    # Getting all reviews related to a product
    reviews = ProductReview.objects.filter(product=product).order_by('-date')

    # Getting average review
    average_rating = ProductReview.objects.filter(product=product).aggregate(rating=Avg('rating'))

    # Product review form
    review_form = ProductReviewForm()

    make_review = True

    if request.user.is_authenticated:
        user_request_count = ProductReview.objects.filter(user=request.user, product=product).count()

        if user_request_count > 0:
            make_review = False

    p_image = product.p_images.all()

    context = {
        'p': product,
        'p_image': p_image,
        'make_review': make_review,
        'review_form': review_form,
        'average_rating': average_rating,
        'reviews': reviews,
        'products': products,
    }

    return render(request, 'core/product-detail.html', context)


def tag_list(request, tag_slug=None):
    products = Product.objects.filter(product_status='published').order_by('-id')

    tag = None
    if tag_slug:
        tag = get_object_or_404(Tag, slug=tag_slug)
        products = products.filter(tags__in=[tag])

    context = {
        'products': products,
        'tag': tag,
    }

    return render(request, 'core/tag.html', context)


def ajax_add_review(request, pid):
    product = Product.objects.get(pk=pid)

    # Проверяем, аутентифицирован ли пользователь
    if request.user.is_authenticated:
        user = request.user
    else:
        # Обработка случая, когда пользователь не аутентифицирован
        return JsonResponse({'error': 'User is not authenticated'})

    review = ProductReview.objects.create(
        user=user,
        product=product,
        review=request.POST['review'],
        rating=request.POST['rating'],
    )

    context = {
        'user': user.username,
        'review': request.POST['review'],
        'rating': request.POST['rating'],
    }

    average_reviews = ProductReview.objects.filter(product=product).aggregate(rating=Avg('rating'))

    return JsonResponse(
        {
            'bool': True,
            'context': context,
            'average_reviews': average_reviews,
        }
    )


