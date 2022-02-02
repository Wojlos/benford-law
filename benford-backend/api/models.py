from django.db import models

class DataSet(models.Model):
    upload_date = models.DateTimeField(
            auto_now_add=True,
            blank = True,
            null = False
            )
    name = models.CharField(max_length=200, unique=True)
    file = models.FileField(upload_to='uploads/')
    data_column = models.CharField(max_length=200)
    benford_law = models.BooleanField(null = True, blank = True)
    graph = models.ImageField(upload_to='images/', null = True, blank = True)