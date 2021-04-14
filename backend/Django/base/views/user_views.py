from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from base.models import *
from base.serializers import PostSerializer, CustomerUserSerializer, CustomerUserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status


# Create your views here.


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = CustomerUserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# this route will give us all users

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    try:
        users = CustomerUser.objects.all()
        serializer = CustomerUserSerializer(users, many=True)
        return Response(serializer.data)
    except:
        content = 'NO USERS  TO SHOW'
        return Response(content)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    try:
        user = request.user
        serializer = CustomerUserSerializer(user, many=False)
        return Response(serializer.data)
    except:
        content = 'USER NOT FOUND'
        return Response(content)


# update user profile

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    try:
        user = request.user
        serializer = CustomerUserSerializerWithToken(user, many=False)

        data = request.data
        user.first_name = data['name']
        user.username = data['email']
        user.email = data['email']
        user.bio = data['bio']
        user.location = data['location']

        if data['password'] != '':
            user.password = make_password(data['password'])

        user.save()

        return Response(serializer.data)
    except:
        content = 'SOMETHING WRONG COULD NOT UPDATE YOUR PROFILE,CHECK YOUR CREDENTIAL'
        return Response(content)


# Register user
@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = CustomerUser.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])

        )
    except:
        message = {'detail': 'User with this email already exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    serializer = CustomerUserSerializerWithToken(user, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = CustomerUser.objects.get(id=pk)
    userForDeletion.delete()
    return Response('USER WAS DELETED')


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    try:
        user = CustomerUser.objects.get(id=pk)
        serializer = CustomerUserSerializer(user, many=False)
        return Response(serializer.data)
    except:
        content = 'USER  NOT FOUND'
        return Response(content)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    try:
        user = CustomerUser.objects.get(id=pk)

        data = request.data
        user.first_name = data['name']
        user.username = data['email']
        user.email = data['email']
        user.bio = data['bio']
        user.location = data['location']
        user.is_staff = data['isAdmin']
        user.isCandidate = data['isCandidate']

        user.save()
        serializer = CustomerUserSerializerWithToken(user, many=False)

        return Response(serializer.data)
    except:
        content = 'SOMETHING WRONG COULD NOT UPDATE YOUR PROFILE,CHECK YOUR CREDENTIAL'
        return Response(content)


@api_view(['POST'])
def UseruploadImage(request):
    data = request.data

    user_id = data['user_id']
    user = CustomerUser.objects.get(id=user_id)

    user.image = request.FILES.get('image')
    user.save()

    return Response('Image was uploaded')
