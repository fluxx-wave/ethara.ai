from django.urls import path
from .views import *


urlpatterns = [
   path('employee',GetEmployee.as_view()),
   path('add-emp',CreateEmployeeView.as_view()),
   path('del-emp/<int:employee_id>/',EmployeeDeleteView.as_view()),
   path('departments',GetDepartments.as_view()),
   path('attendance',GetAttendance.as_view()),
   path('mark-att',MarkAttendance.as_view()),
]