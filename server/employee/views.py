from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from rest_framework import status
from .serailizers import *
from .models import *

# Create your views here.


class GetEmployee(APIView):

    def get(self,request):

        emp = Employee.objects.all()
        ser = EmpSerializer(emp,many=True)
        return Response(ser.data,status=200)


class CreateEmployeeView(APIView):

    def post(self, request, format=None):
        print(request.data)
     
        serializer = EmpSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                'success': True,
                'message': 'Employee created successfully',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            'success': False,
            'message': 'Employee creation failed',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

        
class EmployeeDeleteView(APIView):
    
    def delete(self, request, employee_id, format=None):
        """
        Delete employee by ID
        DELETE /api/employees/{id}/
        """
        try:
            # Try to get the employee
            employee = Employee.objects.get(id=employee_id)
            
            # Store info for response
            employee_data = {
                'id': employee.id,
                'emp_id': employee.emp_id,
                'name': employee.name
            }
            
            # Simply call delete() method
            employee.delete()
            
            return Response({
                'success': True,
                'message': 'Employee deleted successfully',
                'deleted_employee': employee_data
            }, status=status.HTTP_200_OK)
            
        except Employee.DoesNotExist:
            return Response({
                'success': False,
                'message': f'Employee with ID {employee_id} not found',
                'error': 'Not Found'
            }, status=status.HTTP_404_NOT_FOUND)
            
        except Exception as e:
            return Response({
                'success': False,
                'message': 'Failed to delete employee',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetDepartments(APIView):

    def get(self,request): 

        dpt = Department.objects.all()
        ser = DeptSerializer(dpt , many=True)

        return Response(ser.data, status=200)  



class GetAttendance(APIView):

    def get(self,request): 

        att = Attendance.objects.all()

        ser = AttendanceSerializer(att , many=True)

        return Response(ser.data, status=200) 



class MarkAttendance(APIView):

    def post(self,request):
        data = request.data
        date = data.get('date')
        present = data.get("present")
        absent = data.get("absent")
        marked_by = data.get("marked_by")

        try:

            emp_present = Employee.objects.filter(emp_id__in = present)
            emp_absent = Employee.objects.filter(emp_id__in = absent)

            att = Attendance.objects.create(
                date = date,marked_by = marked_by
            )

            for emp in emp_present:
                att.present.add(emp.id)
            
            for emp in emp_absent:
                att.absent.add(emp.id)
            
            att.save()
            return Response({"message":"Attendance Saved"},status=200)
        
        except Exception as e:
            print(e)
            return Response({"messsage":"An Error Occured"},status=500)


