from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serailizers import *
from .models import *

# Create your views here.


class GetEmployee(APIView):

    def get(self,request):

        emp = Employee.objects.all()
        ser = EmpSerializer(emp,many=True)
        return Response(ser.data,status=200)

        
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


