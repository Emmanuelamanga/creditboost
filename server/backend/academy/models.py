from django.db import models
from django.conf import settings

# Learning Content Model


class LearningContent(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

# Question Model

# Choice Model
class Choice(models.Model):
    question = models.ForeignKey('Question', on_delete=models.CASCADE, related_name='choices')
    text = models.CharField(max_length=255)
    letter = models.CharField(max_length=1)  # A, B, C, etc.

    def __str__(self):
        return f"{self.letter}: {self.text}"

class Question(models.Model):
    learning_content = models.ForeignKey(
        LearningContent, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    # Points assigned for the correct answer
    points = models.PositiveIntegerField(default=1)
    correct_choice = models.ForeignKey(Choice, on_delete=models.CASCADE, 
                                       related_name='correct_for', null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.learning_content.title} - {self.question_text}"
    


# User Progress Model

class UserProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, related_name='progress')
    learning_content = models.ForeignKey(
        LearningContent, on_delete=models.CASCADE, related_name='user_progress')
    completed = models.BooleanField(default=False)
    total_points = models.PositiveIntegerField(
        default=0)  # Total points earned for this module

    def __str__(self):
        return f"{self.user.email} - {self.learning_content.title} Progress"

# User Answer Model (To track individual question answers)


class UserAnswer(models.Model):
    user_progress = models.ForeignKey(
        UserProgress, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name='user_answers')
    is_correct = models.BooleanField(default=False)
    earned_points = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user_progress.user.email} - {self.question.learning_content.title} - {self.earned_points} Points"
