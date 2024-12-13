from django.contrib import admin
from .models import User, Profile, PaperDetailAddress

#user table display
class UserAdmin(admin.ModelAdmin):
    list_display = ['username','email']

class PaperDetailAddressAdmin(admin.ModelAdmin):
    list_display = ('addressId', 'hasViewedData','user_profile')  # Specify which fields to display in the list view
    list_editable = ['hasViewedData']

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user','full_name','display_paper_addresses']
    list_editable = ['full_name']

    def display_paper_addresses(self, obj):
        # Assuming you want to display a comma-separated list of addressIds
        return ", ".join([address.addressId for address in obj.paper_detail_addresses.all()])

    display_paper_addresses.short_description = 'Paper Addresses'

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.prefetch_related('paper_detail_addresses')


admin.site.register(User, UserAdmin)
admin.site.register(Profile,ProfileAdmin)
admin.site.register(PaperDetailAddress,PaperDetailAddressAdmin)