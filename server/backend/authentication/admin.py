from django.contrib import admin

# Register your models here.
from .models import UserAccount,BusinessDetail


# Register BusinessDetail
@admin.register(BusinessDetail)
class BusinessDetailAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone_number', 'location')
    search_fields = ('user__email', 'location')

# Register UserAccount
@admin.register(UserAccount)
class UserAccountAdmin(admin.ModelAdmin):
    list_display = ('email', 'name', 'is_active', 'is_staff')
    search_fields = ('email', 'name')
    list_filter = ('is_active', 'is_staff')
