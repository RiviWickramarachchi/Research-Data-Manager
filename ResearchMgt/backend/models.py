from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save


class User(AbstractUser):
    username = models.CharField(max_length=75)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f"UserName={self.username}, Email={self.email}"

#model class that keeps track of user profile info
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length= 300)

#model class that keeps track of research paper addresses
class PaperDetailAddress(models.Model):
    addressId = models.CharField(max_length = 1000)
    hasViewedData = models.BooleanField(default=False)
    user_profile = models.ForeignKey(Profile, null = True, on_delete=models.CASCADE, related_name='paper_detail_addresses')

#creates user profile
def createUserProfile(sender, instance, created, **kwargs):
    if created:
        profile = Profile.objects.create(user = instance)
        profile.full_name = f"{instance.first_name} {instance.last_name}"

def saveUserProfile(sender, instance, **kwargs):
     instance.profile.save()

post_save.connect(createUserProfile, sender=User)
post_save.connect(saveUserProfile, sender=User)

