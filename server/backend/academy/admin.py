from django.contrib import admin
from .models import (
    LearningContent, 
    Question, 
    Choice, 
    UserProgress, 
    UserAnswer,
)

# Register LearningContent
@admin.register(LearningContent)
class LearningContentAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'created_at')
    search_fields = ('title',)
    ordering = ('-created_at',)

# Register Question
@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'learning_content', 'question_text', 'correct_choice', 'points')
    search_fields = ('question_text', 'learning_content__title')
    list_filter = ('learning_content',)

# Register Choice
@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'question', 'text', 'letter')
    search_fields = ('text',)
    list_filter = ('question',)

# Register UserProgress
@admin.register(UserProgress)
class UserProgressAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'learning_content', 'completed', 'total_points')
    search_fields = ('user__email', 'learning_content__title')
    list_filter = ('completed', 'learning_content')

# Register UserAnswer
@admin.register(UserAnswer)
class UserAnswerAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_progress', 'question', 'is_correct', 'earned_points')
    search_fields = ('user_progress__user__email', 'question__question_text')
    list_filter = ('is_correct',)


