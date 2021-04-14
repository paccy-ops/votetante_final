from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class CustomerUser(AbstractUser):
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    isCandidate = models.BooleanField(default=False)
    image = models.ImageField(null=True, blank=True, default='profile.png')


class Post(models.Model):
    user = models.ForeignKey(CustomerUser, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=50, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    post_image = models.ImageField(null=True, blank=True, default='placeholder.png')
    applications = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateField(auto_now_add=True)
    isActive = models.BooleanField(default=False)
    isApplying = models.BooleanField(default=False)
    isVoting = models.BooleanField(default=False)
    postLive = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Candidate(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomerUser, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=50, null=True, blank=True)
    title = models.CharField(max_length=50, null=True, blank=True)
    numCasts = models.IntegerField(null=True, blank=True, default=0)
    candidate_email = models.CharField(max_length=50, null=True, blank=True)
    address = models.CharField(max_length=50, null=True, blank=True)
    whyApply = models.CharField(max_length=50, null=True, blank=True)
    bio = models.CharField(max_length=500, null=True, blank=True)
    cast_parcentage = models.IntegerField(null=True, blank=True, default=0)
    candidate_image = models.ImageField(upload_to='profile_pic', default='profile.png')
    isPass = models.BooleanField(default=False)
    applyingFor = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return self.name


class Vote(models.Model):
    user = models.OneToOneField(CustomerUser,on_delete=models.CASCADE, null=True)
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE, null=True)
    name_candidate = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return self.name_candidate
