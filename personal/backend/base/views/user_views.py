from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from ..models import Product 
from rest_framework import generics
from ..serializers import *
from django.db import IntegrityError

from rest_framework import status
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
       def validate(self, attrs: dict[str, any]) -> dict[str, str]:
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        

        return data
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer




class GetRouteView(APIView):
    def get(self, request):
        return Response({'message': 'Hello'})


    
@permission_classes([IsAdminUser])
class GetUsersView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
@permission_classes([IsAdminUser])
class GetUserById(APIView):
    def get(self, request, pk):
        users = User.objects.get(id=pk)
        serializer = UserSerializer(users, many=False)
        return Response(serializer.data)
    

@permission_classes([IsAdminUser])
class UpdateUser(APIView):

    def put(self, request, pk):
        user = User.objects.get(id=pk)
        data = request.data
        # Update user profile details
        user.first_name = data['name']
        user.username = data['email']
        user.email = data['email']
        user.is_staff = data['isAdmin']


        # Update password if provided


        # Save updated user profile
        user.save()
        serializer = UserSerializer(user, many=False)

        # Return updated user data
        return Response(serializer.data)
    


    

from django.contrib.auth.validators import UnicodeUsernameValidator

class RegisterUser(APIView):

    def post(self, request):
        data = request.data

        # Check password length
        if len(data['password']) < 8:
            content = {'detail': 'Password must be at least 8 characters long.'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        # Check password for username and email
        username_validator = UnicodeUsernameValidator()
        if username_validator(data['password']):
            content = {'detail': 'Password cannot contain username or email.'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        # Check for minimum number of upper and lowercase characters
        uppercase_count = sum(1 for c in data['password'] if c.isupper())
        lowercase_count = sum(1 for c in data['password'] if c.islower())
        if uppercase_count < 1 or lowercase_count < 1:
            content = {'detail': 'Password must contain at least one uppercase and lowercase character.'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        # Check for minimum number of digits and special characters
        digit_count = sum(1 for c in data['password'] if c.isdigit())
        special_count = sum(1 for c in data['password'] if not c.isalnum())
        if digit_count < 1 or special_count < 1:
            content = {'detail': 'Password must contain at least one digit and one special character.'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        # Create user
        try:
            user = User.objects.create_user(
                first_name=data['name'],
                username=data['email'],
                email=data['email'],
                password=data['password'],
            )
        except IntegrityError:
            message = {'detail': 'User with this email already exists.'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)



@permission_classes([IsAuthenticated]) 
class GetUserProfile(APIView):

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    

@permission_classes([IsAuthenticated])
class UpdateUserProfile(APIView):

    def put(self, request):
        user = request.user
        serializer = UserSerializerWithToken(user, many=False)
        data = request.data

        # Update password if provided
        if 'password' in data and data['password'] != '':
            # Add password strength checks here
            if len(data['password']) < 8:
                content = {'detail': 'Password must be at least 8 characters long.'}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)

            uppercase_count = sum(1 for c in data['password'] if c.isupper())
            lowercase_count = sum(1 for c in data['password'] if c.islower())
            if uppercase_count < 1 or lowercase_count < 1:
                content = {'detail': 'Password must contain at least one uppercase and lowercase character.'}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)

            digit_count = sum(1 for c in data['password'] if c.isdigit())
            special_count = sum(1 for c in data['password'] if not c.isalnum())
            if digit_count < 1 or special_count < 1:
                content = {'detail': 'Password must contain at least one digit and one special character.'}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)

            user.password = make_password(data['password'])

        # Update user profile details
        user.first_name = data.get('name', user.first_name)
        user.username = data.get('email', user.username)
        user.email = data.get('email', user.email)

        # Save updated user profile
        user.save()

        # Return updated user data
        return Response(serializer.data)
    


@permission_classes([IsAuthenticated])
class deleteAccount(APIView):
    def delete(self, request):
        # Use request.user to get the authenticated user
        user_for_deletion = request.user

        # Delete the user
        user_for_deletion.delete()

        return Response("The user was deleted successfully")

    
@permission_classes([IsAdminUser])
class deleteUser(APIView):
    def delete(self, request, pk):
        userForDeletion = User.objects.get(id=pk)
        userForDeletion.delete()
        return Response("The user Was Deleted Successfully")







