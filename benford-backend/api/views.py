from rest_framework import generics, mixins, status
from rest_framework.response import Response

from rest_framework.decorators import api_view
from django.views.decorators.csrf import ensure_csrf_cookie
from django.core.files import File

from api.models import DataSet
from api.serializers import DataSetSerializer, DataSetFormSerializer
from wsgiref.util import FileWrapper
from django.http import HttpResponse
import os

class DataSetGenericApiView(
        generics.GenericAPIView,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.CreateModelMixin,
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin
        ):

    queryset = DataSet.objects
    serializer_class = DataSetSerializer

    def get(self, request, pk=None):
        if pk:
            return Response(
                    self.retrieve(request).data,
                    status = status.HTTP_200_OK
                    )
        else:
            return Response(
                    self.list(request).data,
                    status = status.HTTP_200_OK
                )

    def post(self,request):
        return Response(
                self.create(request).data,
                status = status.HTTP_201_CREATED
            )


    def delete(self, request, pk = None):
        if not pk:
            return Response(
                    {"error":"Data set id is required"},
                    status = status.HTTP_404_NOT_FOUND
                )
        data_set = DataSet.objects.filter(id = pk).first()
        os.remove(data_set.graph.path)
        os.remove(data_set.file.path)

        self.destroy(request)
        return Response(
                {"message":f'Data set with id {pk} was deleted!'},
                status = status.HTTP_204_NO_CONTENT
                )

@api_view(['GET'])
def get_data_set_form_data(request):
    data = DataSet.objects.all()
    serialier = DataSetFormSerializer(data, many = True)
    return Response(
            {'data_set_options': serialier.data},
            status = status.HTTP_200_OK
            )

