from rest_framework.test import APITestCase
from django.core.files.uploadedfile import SimpleUploadedFile

from api.models import DataSet


class DataSetTest(APITestCase):
    url = "/api/data-set"

    def setUp(self):
        DataSet.objects.create(
                name = 'dataset1',
                file = 'file',
                graph = 'graph',
                data_column = 'column',
                benford_law = True
                )

        DataSet.objects.create(
                name = 'dataset2',
                file = 'file',
                graph = 'graph',
                data_column = 'column',
                benford_law = True
                )

    def test_retrieve_dataset(self):

        response = self.client.get(f'{self.url}/1')
        result = response.json()
        del result['uploadDate']        

        expected_response = {'id': 1, 
                    'file': 
                    'http://testserver/media/file', 
                    'graph': 'http://testserver/media/graph', 
                    'name': 'dataset1', 
                    'dataColumn':'column', 
                    'benfordLaw': True
                    } 

        self.assertEqual(response.status_code, 200)   
        self.assertIsInstance(result, dict)
        self.assertEqual(result, expected_response)    

    def test_list_dataset(self):

        response = self.client.get(self.url)
        results = response.json()

        self.assertEqual(response.status_code, 200)   
        self.assertIsInstance(results, list)

    def test_create_delete_data_set(self):

        with open('./api./test_data/good.dms') as file:            
            response = self.client.post(self.url, {
                    'name': 'dataset3',
                    'file' : file,
                    'data_column': 'column',
                })


        delete_response = self.client.delete(f'{self.url}/3')        

        self.assertEqual(response.status_code, 201)       
        self.assertEqual(delete_response.status_code, 204)   
    