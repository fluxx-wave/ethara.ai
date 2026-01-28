from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *



class DeptSerializer(ModelSerializer):

    class Meta:
        model = Department
        fields = '__all__'


class EmpSerializer(ModelSerializer):
    # Nested department serializer
    department = DeptSerializer(read_only=True)
    department_id = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(),
        source='department',
        write_only=True,
        required=True
    )
    
    class Meta:
        model = Employee
        fields = ['id', 'emp_id', 'name', 'email_address', 'department', 'department_id', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at', 'department']
    
    def validate_emp_id(self, value):
        """Validate emp_id uniqueness"""
        if Employee.objects.filter(emp_id=value).exists():
            raise serializers.ValidationError("An employee with this ID already exists.")
        return value
    
    def validate_email_address(self, value):
        """Validate email uniqueness"""
        if Employee.objects.filter(email_address=value).exists():
            raise serializers.ValidationError("This email address is already registered.")
        return value





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




