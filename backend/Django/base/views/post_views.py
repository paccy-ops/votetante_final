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


@api_view(['GET'])
def getPosts(request):
    try:
        posts = Post.objects.all()

        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)
    except:
        content = 'NO POSTS  TO SHOW'
        return Response(content)


@api_view(['GET'])
def getPost(request, pk):
    try:
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(post, many=False)
        return Response(serializer.data)
    except:
        content = 'POST WAS NOT FOUND'
        return Response(content)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createPost(request):
    try:
        user = request.user
        post = Post.objects.create(
            user=user,
            title='Post title',
            description='Post Description'
        )
        serializer = PostSerializer(post, many=False)
        return Response(serializer.data)
    except:
        content = 'POST WAS NOT CREATED'
        return Response(content)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deletePost(request, pk):
    try:
        post = Post.objects.get(id=pk)
        post.delete()
        return Response('Post Successfully deleted')

    except:
        content = 'POST WAS NOT FOUND'
        return Response(content)


@api_view(['PATCH'])
@permission_classes([IsAdminUser])
def updatePost(request, pk):
    try:
        post = Post.objects.get(id=pk)

        data = request.data
        post.title = data['title']
        post.description = data['description']
        post.isActive = data['isActive']
        post.isApplying = data['isApplying']
        post.isVoting = data['isVoting']
        post.save()
        serializer = PostSerializer(post, many=False)

        return Response(serializer.data)
    except:
        content = 'CAN  NOT UPDATE POST'
        return Response(content)


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    post_id = data['post_id']
    post = Post.objects.get(id=post_id)

    post.post_image = request.FILES.get('post_image')
    post.save()

    return Response('Image was uploaded')



