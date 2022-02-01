import {useState} from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import axios from 'axios'
// import {API_URL} from '../../constants/index'

const AddDataSet =(props)=>{
    const [modalOpen, setModalOpen] = useState(false)
    const [name, setName] = useState('')
    const [dataColumn, setDataColumn] = useState('')
    const [dataSet, setDataSet] = useState(null)




    
    const handleOpenModal = () =>{
        setModalOpen(true)
    } 


    const handleDataSet = (event) =>{
        setDataSet(event.target.files[0])
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', dataSet  )
        formData.append('name',name)
        formData.append('dataColumn',dataColumn)


        try{
            // `${API_URL}
            await axios({method: 'post',
            url: 'http://localhost:8000/api/data-set',
            data: formData,
            header: {
                      'Accept': 'application/json',
                      'Content-Type': 'multipart/form-data',
                    },
              })
              props.refreshParentFormData()
            setModalOpen(false)   
        }catch (error){
            console.log(error)
        }

    }


    return(
        <>
        <Button 
            variant="success"
            size = 'lg'
            onClick = {handleOpenModal}
            disabled = {false}
        > Add new data set </Button>
        <Modal show = {modalOpen}>
            <Modal.Header>
                Add new data set
            </Modal.Header> 
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            as="input" 
                            name = 'name' 
                            onChange = {(e)=> setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Data column</Form.Label>
                        <Form.Control 
                            as="input" 
                            name = 'dataColumn'
                            onChange = {(e)=> setDataColumn(e.target.value)}
                            />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Data set</Form.Label>
                        <Form.Control 
                            type = "file" 
                            name= 'dataSet'
                            onChange = {handleDataSet}
                            />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick = {(e) => handleSubmit(e)}
                    variant="success"
                > Save </Button>
                <Button
                    onClick = {() => setModalOpen(false)}
                >Close</Button>
            </Modal.Footer>
        </Modal>
        </>
        
    )
}

export default AddDataSet