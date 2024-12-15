from django.shortcuts import render
from .models import User, Profile, PaperDetailAddress
from .serializer import RegisterSerializer, UserTokenObtainPairSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.response import Response

#uuid
import uuid

class UserTokenObtainPairView(TokenObtainPairView):
    serializer_class = UserTokenObtainPairSerializer


class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


#method to test the auth tokens
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        response = f"Congratulation {request.user}, your API just responded to GET request. your name is {request.user.profile.full_name}"
        return Response({'response': response}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get("text")
        response = f"Hello {request.user}, your text is {text}"
        return Response({'response': response}, status=status.HTTP_201_CREATED)

    return Response({}, status= status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_post_address(request):
    if request.method == 'POST':
        # Retrieve data from the request
        address_id = request.data.get('address_id')  # Assuming the client sends the address ID in the request data
        #address_id = request.POST.get("address_id")

        # Get the current user's profile
        profile = request.user.profile
        print("abs")
        # Check if the address already exists in the profile
        if profile.paper_detail_addresses.filter(addressId=address_id).exists():
            return Response({'error': 'Address already exists in the profile.'}, status=status.HTTP_400_BAD_REQUEST)

        # If the address doesn't exist, create a new Address instance
        PaperDetailAddress.objects.create(addressId=address_id, user_profile= profile)

        # Add the address to the user's profile
        #profile.postAddresses.add(address)
        response = f"Address added Successfully!, the added address  is {address_id}"
        return Response({'message': response}, status=status.HTTP_200_OK)

    return Response({'error': 'Invalid request method.'}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def generate_unique_id(request):
    if request.method == 'GET':
        respone = uuid.uuid4()
        return Response({'response': respone}, status=status.HTTP_200_OK)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_addressViewStat(request, address_id):
    if request.method == 'POST':
        try:
            # Read the Profile email corresponding to the AddressID
            post_address = PaperDetailAddress.objects.get(addressId=address_id)
            profile = post_address.user_profile
            #prof_serializer = ProfileSerializer(profile)
            prof_id = profile.id
            current_user_prof_id = request.user.profile.id
            #serializer = PostAddressSerializer(post_address)
            if prof_id == current_user_prof_id:
                response = "Same User, No Need of an Update"
            else:
                if post_address.hasViewedData == False:
                    post_address.hasViewedData = True #Change the Bool Value
                    post_address.save() # Save changes to the database
                response = f"View Status Updated for {post_address.addressId}"
            return Response({'response': response}, status=status.HTTP_200_OK)
        except PaperDetailAddress.DoesNotExist:
            return Response({'response': 'ID Does Not Exist'}, status=status.HTTP_404_NOT_FOUND)
    return Response ({},status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_addresses(request):
    if request.method == 'GET':
        profile = request.user.profile
        post_addresses = [address for address in profile.paper_detail_addresses.all()]
        #post_addresses = [address.addressId for address in profile.post_addresses.all()]
        #view_status = [address.hasViewedData for address in profile.post_addresses.all()]
        response_dict = {}
        for address in post_addresses:
            address_id = address.addressId
            view_status = address.hasViewedData
            response_dict[address_id] = view_status
        #user_profile_email = [address.user_profile.user.email for address in profile.post_addresses.all()]
        #response = f"Name : {profile.full_name}, Post Addresses {post_addresses}, Has viewed statuses {view_status}, Email {user_profile_email}"
        response = response_dict
        return Response ({'response': response}, status=status.HTTP_200_OK)
    return Response ({},status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_address(request, address_id):
    if request.method == 'DELETE':
        try:
            post_address = PaperDetailAddress.objects.get(addressId=address_id)
        except PaperDetailAddress.DoesNotExist:
            return Response({'response': 'ID Does Not Exist'}, status=status.HTTP_404_NOT_FOUND)

        post_address.delete()

        # Return a success response
        return Response({'response': 'PostAddress deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

    return Response ({},status=status.HTTP_400_BAD_REQUEST)