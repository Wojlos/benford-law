
import benford as bf
import matplotlib.pyplot as plt
import matplotlib as mlp
import numpy as np
import pandas as pd

from api.models import DataSet
from django.core.files import File
from django.core.exceptions import ValidationError
from rest_framework import serializers


class DataSetSerializer(serializers.ModelSerializer):
    file = serializers.FileField()
    graph = serializers.ImageField(required=False)

    class Meta:
        model = DataSet
        fields = '__all__'

    def create(self, validated_data):
        mlp.use("Agg")
        data = pd.read_table(validated_data['file'])
        if not (validated_data['data_column'] in data):
            raise ValidationError( 
                    {'message': 
                            f'Column \"{validated_data["data_column"]}\
                            " does not exist in datafile'
                            }
                    )

        data.rename(
                columns={validated_data['data_column']:'data_column'},
                inplace = True
                )
        data['data_column'] = data.data_column.astype(np.float64) 

        benf = bf.Benford((data,'data_column' ), confidence = 95, decimals=0)
        benf_F1D = benf.F1D
        benf_F1D.show_plot(save_plot='./images/tmp')
        validated_data['benford_law'] = (
                benf_F1D.critical_values['KS'] > benf.F1D.KS
                )
        plt.show()

        instance = super().create(validated_data)
        instance.graph = File(open('./images/tmp.png', 'rb'))
        instance.save()
        plt.close('all')
        return instance

class DataSetFormSerializer(serializers.ModelSerializer):
    value = serializers.IntegerField(source = "id")
    label = serializers.CharField(source = "name")

    class Meta:
        model = DataSet
        fields = ('value','label')
