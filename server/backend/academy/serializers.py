from rest_framework import serializers
from .models import LearningContent, Question, UserAnswer, UserProgress,Choice


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'letter', 'text']

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)
    class Meta:
        model = Question
        fields = ['id', 'question_text', 'points','choices']

class LearningContentSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = LearningContent
        fields = ['id', 'title', 'content', 'questions']

class UserProgressSerializer(serializers.ModelSerializer):
    learning_content = serializers.CharField(source='learning_content.title')
    
    class Meta:
        model = UserProgress
        fields = ['learning_content', 'completed', 'total_points']

class UserAnswerSerializer(serializers.Serializer):
    question_id = serializers.IntegerField()
    answer_correct = serializers.BooleanField()
