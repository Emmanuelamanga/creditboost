from rest_framework import serializers
from .models import BusinessDetail

# BusinessDetailSerializer
class BusinessDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessDetail
        fields = '__all__'
        read_only_fields = ('user',)