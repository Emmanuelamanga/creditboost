from rest_framework.response import Response
from rest_framework.views import APIView
from .models import LearningContent, UserProgress,Question, UserProgress, UserAnswer,Choice
from .serializers import LearningContentSerializer,UserAnswerSerializer,UserProgressSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

class LatestModulesAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        # Fetch learning contents where user hasn't completed progress
        incomplete_modules = LearningContent.objects.exclude(
            user_progress__user=user, user_progress__completed=True
        ).order_by('-created_at')[:2]  # Get latest 2 modules

        serializer = LearningContentSerializer(incomplete_modules, many=True)
        return Response(serializer.data)
    

class SubmitAnswersAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        answers = request.data.get('answers', [])
        content_id = request.data.get('content_id')  # Get content_id from the request body
        
        if not content_id:
            return Response({'error': 'content_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Fetch the learning content by content_id
            learning_content = LearningContent.objects.get(id=content_id)
        except LearningContent.DoesNotExist:
            return Response({'error': 'Module not found'}, status=status.HTTP_404_NOT_FOUND)

        # Get or create user progress for this module
        user_progress, created = UserProgress.objects.get_or_create(
            user=user, learning_content=learning_content
        )
        
        total_points = 0
        
        for answer_data in answers:
            question_id = answer_data.get('question_id')
            choice_id = answer_data.get('choice_id')
            
            try:
                # Ensure the question belongs to the current learning content
                question = Question.objects.get(id=question_id, learning_content=learning_content)
            except Question.DoesNotExist:
                return Response({'error': f'Question {question_id} not found in this module'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                # Ensure the choice belongs to the correct question
                selected_choice = Choice.objects.get(id=choice_id, question=question)
            except Choice.DoesNotExist:
                return Response({'error': f'Choice {choice_id} is invalid for question {question_id}'}, status=status.HTTP_400_BAD_REQUEST)

            # Check if the selected choice is correct
            is_correct = selected_choice == question.correct_choice
            points_earned = question.points if is_correct else 0
            total_points += points_earned

            # Save the user answer
            UserAnswer.objects.create(
                user_progress=user_progress,
                question=question,
                is_correct=is_correct,
                earned_points=points_earned
            )
        
        # Mark the module as complete and update total points
        user_progress.completed = True
        user_progress.total_points = total_points
        user_progress.save()

        return Response({'message': 'Answers submitted successfully', 'total_points': total_points})
    
    
class UserProgressAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_progress = UserProgress.objects.filter(user=user)
        
        serializer = UserProgressSerializer(user_progress, many=True)
        return Response(serializer.data)