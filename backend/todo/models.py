from django.db import models

# Create your models here.

class Todo(models.Model):
  title = models.CharField(max_length=100)
  input_time = models.DateTimeField(auto_now_add=True)
  # edit_time = models.DateTimeField(auto_now=True)
  goal_time = models.DateTimeField(null=True)
  completion_time = models.DateTimeField(null=True)
  description = models.TextField()
  completed = models.BooleanField(default=False)
  tags = models.CharField(max_length = 100, default = '')
  
  def _str_(self):
    return self.title
  
