from .models import User, Profile, PaperDetailAddress
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username','email']

class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email
        token['full_name'] = user.profile.full_name

        return token

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('__all__')

class PaperDetailAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaperDetailAddress
        fields = ('__all__')

class RegisterSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirmPwd = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'first_name', 'last_name','password', 'confirmPwd')

    def validate(self, attrs):
        if attrs['password'] != attrs['confirmPwd']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        firstname = validated_data.pop('first_name')
        lastname = validated_data.pop('last_name')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=firstname,
            last_name=lastname
        )
        user.set_password(validated_data['password'])
        user.save()

        return user