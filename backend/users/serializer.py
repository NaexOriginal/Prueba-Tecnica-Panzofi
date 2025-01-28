from rest_framework import serializers
from .models import CustomUser, Role

class CustomUserSerializer(serializers.ModelSerializer):
  class Meta:
    model = CustomUser
    fields = '__all__'
    extra_kwargs = {
      "password": {"write_only": True}
    }
    
  def create(self, validated_data):
    user = CustomUser(
      email = validated_data["email"],
      role = validated_data.get("role", Role.USER),
    )    
    user.set_password(validated_data["password"])
    user.save()
    return user