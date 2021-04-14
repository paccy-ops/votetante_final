import time, asyncio
from asgiref.sync import sync_to_async
from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from base.models import *
from base.serializers import CandidateSerializer, PostSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCandidates(request):
    try:
        candidates = Candidate.objects.all()
        serializer = CandidateSerializer(candidates, many=True)
        return Response(serializer.data)
    except:
        content = 'NO CANDIDATE  TO SHOW'
        return Response(content)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def CreateCandidate(request, pk):
    try:
        user = request.user
        post = Post.objects.get(id=pk)

        alreadyExist = post.candidate_set.filter(user=user).exists()
        if alreadyExist:
            content = {'detail': 'You have Applied for this Post Already'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        else:
            candidate = Candidate.objects.create(
                user=user,
                post=post,
                name=user.first_name,
                title=post.title,
                candidate_email=user.email,
                address=user.location,
                bio=user.bio,
                applyingFor=post.title,
                candidate_image=user.image,
                whyApply='...?',
            )
            candidates = post.candidate_set.all()

            post.applications = len(candidates)
            post.save()

            serializer = CandidateSerializer(candidate, many=True)
            return Response(serializer.data)

    except:
        content = 'APPLYING FOR THIS POST WAS NOT SUCCESSFUL'
        return Response(content)


# admin candidate update
@api_view(['PATCH'])
@permission_classes([IsAdminUser])
def updateCandidate(request, pk):
    try:

        candidate = Candidate.objects.get(id=pk)
        data = request.data
        user = request.user
        candidate.isPass = data['isPass']
        candidate.whyApply = data['whyApply']
        user.isCandidate = True
        user.save()
        candidate.save()
        serializer = CandidateSerializer(candidate, many=False)

        return Response(serializer.data)

    except:
        content = 'CAN  NOT UPDATE CANDIDATE'
        return Response(content)


# delete candidate
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteCandidate(request, pk):
    try:
        candidate = Candidate.objects.get(id=pk)
        candidate.delete()
        return Response('Candidate Successfully deleted')

    except:
        content = 'POST WAS NOT FOUND'
        return Response(content)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCandidate(request, pk):
    try:
        candida = Candidate.objects.get(id=pk)
        serializer = CandidateSerializer(candida, many=False)
        return Response(serializer.data)
    except:
        content = 'CANDIDATE WAS NOT FOUND'
        return Response(content)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCandidateByPost(request, pk):
    try:
        candida = Candidate.objects.get(post=pk)
        serializer = CandidateSerializer(candida, many=False)
        return Response(serializer.data)

    except:
        content = 'CANDIDATE WAS NOT FOUND'
        return Response(content)


# submit a vote

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def castVote(request, pk):

    try:
        user = request.user
        candidate = Candidate.objects.get(id=pk)
        castExist = candidate.vote_set.filter(user=user).exists()

        if castExist:
            content = {'detail': 'Your vote already exist'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        else:
            vote = Vote.objects.create(
                user=user,
                candidate=candidate,
                name_candidate=candidate.name,
             )

            votes = candidate.vote_set.all()
            candidate.numCasts = len(votes)
            candidate.save()
            return Response('vote submitted')

    except:
        content = {'detail': 'Your vote already exist'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
