from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *


class CustomerUserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomerUser
        fields = ['id', 'email', 'username', 'name', 'isAdmin', 'image', 'bio', 'location', 'isCandidate']

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name


class CustomerUserSerializerWithToken(CustomerUserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomerUser
        fields = ['id', 'email', 'username', 'name', 'isAdmin', 'image', 'bio', 'location', 'isCandidate', 'token']

    @staticmethod
    def get_token(obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    candidates = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    def get_candidates(self, obj):
        candidates = obj.candidate_set.all()
        serializer = CandidateSerializer(candidates, many=True)
        return serializer.data


class VotingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = '__all__'


class CandidateSerializer(serializers.ModelSerializer):
    votes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Candidate
        fields = '__all__'

    def get_votes(self, obj):
        votes = obj.vote_set.all()
        serializer = VotingSerializer(votes, many=True)
        return serializer.data
