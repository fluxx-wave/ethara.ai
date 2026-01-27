from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *


class EmpSerializer(ModelSerializer):

    class Meta:
        model = Employee
        fields = '__all__'



class DeptSerializer(ModelSerializer):

    class Meta:
        model = Department
        fields = '__all__'



class AttendanceSerializer(ModelSerializer):
    present_details = serializers.SerializerMethodField()
    
    # Get full employee details for absent employees
    absent_details = serializers.SerializerMethodField()
    
    # For write operations (accept employee IDs)
    present_employee_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        write_only=True,
        queryset=Employee.objects.all(),
        source='present'
    )
    
    absent_employee_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        write_only=True,
        queryset=Employee.objects.all(),
        source='absent',
        required=False
    )

    class Meta:
        model = Attendance
        fields = '__all__'

    def get_present_details(self, obj):
        """Get full employee details for present employees"""
        employees = obj.present.all()
        return EmpSerializer(employees, many=True).data
    
    def get_absent_details(self, obj):
        """Get full employee details for absent employees"""
        employees = obj.absent.all()
        return EmpSerializer(employees, many=True).data




