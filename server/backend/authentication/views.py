from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from djoser.social.views import ProviderAuthView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import BusinessDetail
from .serializers import BusinessDetailSerializer
from rest_framework import generics
from pyairtable import Api
from os import getenv
from rest_framework import serializers


class CustomProviderAuthView(ProviderAuthView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 201:
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')
            

            response.set_cookie(
                'access',
                access_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )
            response.set_cookie(
                'refresh',
                refresh_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )

        return response


class CustomTokenObtainPairView(TokenObtainPairView):
            
        
    def post(self, request, *args, **kwargs):
        # Get the original response from TokenObtainPairView
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = Response(serializer.validated_data, status=status.HTTP_200_OK)
        
        # Access the user directly from the validated data
        user = serializer.user

        # Add extra details to the response
        response.data['name'] = user.name
        response.data['email'] = user.email
        response.data['details_updated'] = user.details_updated
        
         # Set cookies for access and refresh tokens
        response.set_cookie(
            'access',
            response.data.get('access'),
            max_age=settings.AUTH_COOKIE_MAX_AGE,
            path=settings.AUTH_COOKIE_PATH,
            secure=settings.AUTH_COOKIE_SECURE,
            httponly=settings.AUTH_COOKIE_HTTP_ONLY,
            samesite=settings.AUTH_COOKIE_SAMESITE
        )
        response.set_cookie(
            'refresh',
            response.data.get('refresh'),
            max_age=settings.AUTH_COOKIE_MAX_AGE,
            path=settings.AUTH_COOKIE_PATH,
            secure=settings.AUTH_COOKIE_SECURE,
            httponly=settings.AUTH_COOKIE_HTTP_ONLY,
            samesite=settings.AUTH_COOKIE_SAMESITE
        )

        return response
    
        # response = super().post(request, *args, **kwargs)

        # if response.status_code == 200:
        #     access_token = response.data.get('access')
        #     refresh_token = response.data.get('refresh')
            
        #     # Fetch the user
        #     user=self.request.user
        #     #response.data['name'] = user.first_name
        #     # response.data['email'] = user.email
        #     # response.data['details_updated'] = user.details_updated

        #     response.set_cookie(
        #         'access',
        #         access_token,
        #         max_age=settings.AUTH_COOKIE_MAX_AGE,
        #         path=settings.AUTH_COOKIE_PATH,
        #         secure=settings.AUTH_COOKIE_SECURE,
        #         httponly=settings.AUTH_COOKIE_HTTP_ONLY,
        #         samesite=settings.AUTH_COOKIE_SAMESITE
        #     )
        #     response.set_cookie(
        #         'refresh',
        #         refresh_token,
        #         max_age=settings.AUTH_COOKIE_MAX_AGE,
        #         path=settings.AUTH_COOKIE_PATH,
        #         secure=settings.AUTH_COOKIE_SECURE,
        #         httponly=settings.AUTH_COOKIE_HTTP_ONLY,
        #         samesite=settings.AUTH_COOKIE_SAMESITE
        #     )

        # return response


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')
        print("Refresh Token from Cookies:", refresh_token)

        if request.data is None:
            request.data = {}
        if refresh_token:
            request.data['refresh'] = refresh_token
        else:
            print('no refresh token')
            return Response(
                {"detail": "Refresh token not found"},
                status=status.HTTP_400_BAD_REQUEST
            )

        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get('access')

            response.set_cookie(
                'access',
                access_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )

        return response


class CustomTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        access_token = request.COOKIES.get('access')

        if access_token:
            request.data['token'] = access_token

        return super().post(request, *args, **kwargs)


class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie('access')
        response.delete_cookie('refresh')

        return response
    
    
class BusinessDetailCreateView(generics.CreateAPIView):
    queryset = BusinessDetail.objects.all()
    serializer_class = BusinessDetailSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # supplier=serializer.save(user=self.request.user)
        # self.request.user.details_updated = True
        # self.request.user.save()
        
        # self.add_to_airtable(supplier)
        
         # Access the validated data
        validated_data = serializer.validated_data
        
        # Create a supplier instance without saving it to the database
        business = BusinessDetail(**validated_data, user=self.request.user)
        
        try:
            # Perform the Airtable update
            self.add_to_airtable(business)
            
            # If Airtable update is successful, save to the Django database
            business.save()
            self.request.user.details_updated = True
            self.request.user.save()

        except Exception as e:
            # If Airtable update fails, return a 400 error with a custom message
            print(e)
            raise serializers.ValidationError({"detail": "Details update failed. Airtable update error: " })

        
    def add_to_airtable(self, business):
        # Assuming you have these in your settings.py
        airtable_api_key = getenv("AIRTABLE_API_KEY")
        base_id = getenv("AIRTABLE_BASE_ID")
        table_name =getenv("AIRTABLE_SUPPLIER_TABLE_NAME")
        #print(table_name,base_id,airtable_api_key,'hh')

        api= Api(airtable_api_key)
        table = api.table(base_id, table_name)

        record = {
            "Business Name": business.user.name,
            "Business Email": business.user.email,
            "Business Phone Number": business.phone_number,
            "Business Description": business.description,
            "Business Location": business.location,
            "Business WhatsApp Number": business.whatsapp_number,
            "Business Facebook Link": business.facebook_link,
            "Business LinkedIn Link": business.linkedin_link,
            
            # "Product Name": product.name,
            # "Product Category": product.category,
            # "Product Description": product.description,
            # "Product ID": str(product.product_id),
            # "Date Created": product.date_created.isoformat(), 
        }

        table.create(record)

class BusinessDetailRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = BusinessDetail.objects.all()
    serializer_class = BusinessDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return BusinessDetail.objects.get(user=self.request.user)
    
    def perform_update(self, serializer):
        serializer.save()
        if not self.request.user.details_updated:
            self.request.user.details_updated = True
            self.request.user.save()

