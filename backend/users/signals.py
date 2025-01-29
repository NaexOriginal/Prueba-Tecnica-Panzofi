from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.utils import timezone
from .models import UserActivity

@receiver(user_logged_in)
def create_activity(sender, request, user, **kwargs):
  print(f"Usuario inicio sesión: {user.email}")
  UserActivity.objects.create(user = user)

@receiver(user_logged_out)
def end_activity(sender, request, user, **kwargs):
  activity = UserActivity.objects.filter(user=user, end_time__isnull=True).last()
  if activity:
    activity.end_time = timezone.now()
    activity.save()