import axios from 'axios'
import {Alert,Button, Card, Form, Row, Col} from 'react-bootstrap'
import {useState, useEffect} from 'react'

import AddDataSet from './modal-add-data-set'

const DataSetCard =(props)=>{
    const [modalOpen, setModalOpen] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [dataSet, setDataSet] = useState('')
    const [dataSetFormData, setDataSetFormData] = useState([])
    const [selectedDataSetId, setSelectedDataSetId] = useState(null)

    useEffect(() => {
        getFormData()
        getData(selectedDataSetId)
    }, []);
    
    useEffect(()=> {
        getData(dataSetFormData[0]?.value)
    },[dataSetFormData])
    
    const getFormData = async () => {
        try{    
            const formResponse = await axios.get('http://localhost:8000/api/data-set-form-data')
            setDataSetFormData(formResponse.data.dataSetOptions)
            setSelectedDataSetId(formResponse.data.dataSetOptions[0]?.value)
        }catch(e){
            console.error(e)
        }
    }

    const getData = async (id) => {
        if (id){
            try{
                const dataResponse = await axios.get(`http://localhost:8000/api/data-set/${id}`)
                setDataSet(dataResponse.data)
            }catch(e){
                console.error(e)
            }
        } else{
            setDataSet(null)
        }
        
    }


    const handleSelect = async (e) =>{
        setSelectedDataSetId(e)
        getData(e)
    }

    const handleDelete = async () =>{
        try{
            await axios.delete(`http://localhost:8000/api/data-set/${selectedDataSetId}`)
            await getFormData()
        }catch(e){
            console.error(e)
        }


    }

    return(
        <>
            <Card style={{ width: '75%', color: "black", fontSize: "80%"}}>
                <Card.Header>
                    <Row >
                        <Col xs = {2}>
                            Select data set:                
                        </Col>
                        <Col xs = {3} >
                            <Form.Select 
                                size="lg" 
                                onChange= {(e)=> handleSelect(e.target.value)}
                                disabled = {dataSetFormData.length == 0}
                                >
                            {
                               dataSetFormData.map( (opt) => 
                                <option key = {opt.value} value={opt.value}> {opt.label}</option> )
                            }
                            </Form.Select>
                        </Col>
                        <Col xs = {3} style={{disply:'flex', justifyContent:'left'}}>
                            <Button 
                                variant= {'danger'} 
                                size = 'lg' 
                                onClick = {handleDelete}
                                disabled = {!selectedDataSetId}
                                >
                                Delete selected dataset
                            </Button> 
                        </Col>
                    </Row>
                    <Row xs = {1}>
                        <AddDataSet 
                            refreshParentFormData = {getFormData}
                        /> 
                    </Row>
                </Card.Header>
                { dataSet && (
                <Card.Body style = {{color:'black'}}>
                    <Card.Title >
                    Benford law from {dataSet.name} data set 
                    </Card.Title >
                   Data set { dataSet.benfordLaw ? "conformes" : "does not conform"} to  Benford's law of first digits
                    <Card.Img src={dataSet.graph} />
                </Card.Body>)}
            </Card>
        </>
    )
}

export default DataSetCard