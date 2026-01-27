from django.db import models


class Department(models.Model):
    dep_id = models.CharField(max_length=100,db_index=True)
    department_name = models.CharField(max_length=100 ,db_index=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.dep_id} {self.department_name}"
    



class Employee(models.Model):
    emp_id = models.CharField(max_length=50,db_index=True)
    name = models.CharField(max_length=100, db_index=True)
    email_address = models.EmailField()
    department = models.ForeignKey(Department, related_name='employee_dept' , on_delete=models.SET_NULL, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.emp_id} {self.name}"
    



class Attendance(models.Model):

    present = models.ManyToManyField(Employee, related_name = 'present_emp')
    absent = models.ManyToManyField(Employee, related_name = 'absent_emp',blank=True)
    date = models.DateField()

    marked_by = models.CharField(max_length=100 , null=True , blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f" {self.date}"







