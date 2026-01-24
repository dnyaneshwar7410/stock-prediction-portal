from django.contrib.auth.models import User
from rest_framework import serializers

class UserSirializer(serializers.ModelSerializer):
     password = serializers.CharField(write_only = True, min_length=8, style={'input_type':'password'}) # can not see with the get request
     class Meta:
         model = User
         fields = ['username','email','password']


     def create(self, validated_data):
         # User.objects.create = save the password in plain text
         # User.objects.create_user = sautomatically hash the password
         user = User.objects.create_user(
             validated_data['username'],
             validated_data['email'],
             validated_data['password'],
         )
         return user
         # ==>  we can also write like this
         # user = User.objects.create_user(**validated_data)
        



