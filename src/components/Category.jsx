import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { deleteCategoryAPI, getAllCategoryAPI, removeVideoAPI, saveCategoryAPI, updateCategoryAPI } from '../services/allAPI';
import VideoCard from './VideoCard';

const Category = ({setDeleteResponseFromCategory,deleteResponseFromView}) => {
  const [allCategories, setAllCategories] = useState([])
  const [categoryName, setCategoryName] = useState("")
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => { getAllCategories() }, [deleteResponseFromView])

  const handleSaveCategory = async () => {
    if (categoryName) {
      const categoryDetails = { categoryName, allVideos: [] }
      try {
        const result = await saveCategoryAPI(categoryDetails)
        alert("Category Created")
        getAllCategories()
        handleClose()
      } catch (err) {
        console.log(err);

      }
    }
  }

  const getAllCategories = async () => {
    try {
      const result = await getAllCategoryAPI()
      if (result.status >= 200 && result.status < 300) {
        setAllCategories(result.data)
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  // console.log(allCategories);
  
  const removeCategory = async (id) => {
    try {
      await deleteCategoryAPI(id)
      getAllCategories()
    } catch (err) {
      console.log(err);
    }
  }

  const dragOverCategory=(e)=>{
    e.preventDefault()
  }

  const videoCardDropOverCategory = async (e, categoryDetails) => {
    console.log("inside videoCardDropOverCategory");
    // console.log(categoryDetails);
    const videoDetails=JSON.parse(e.dataTransfer.getData("videoDetails"))
    console.log(videoDetails);
    categoryDetails.allVideos.push(videoDetails)
    console.log(categoryDetails);
    await updateCategoryAPI(categoryDetails)
    getAllCategories()
    const result=await removeVideoAPI(videoDetails?.id)
    setDeleteResponseFromCategory(result)
  }

  const categoryVideoDragStarted=(e,dragVideoDetails,categoryDetails)=>{
    let dragData={video:dragVideoDetails,categoryDetails};
    e.dataTransfer.setData("dragData",JSON.stringify(dragData))
  }

  return (
    <>
      <div className='d-flex align-items-center justify-content-between'>
        <h5>All Categories</h5>
        <button onClick={handleShow} className='btn btn-info ms-3 rounded-circle fw-bolder fs-5'>+</button>
      </div>
      {/* Display All Categories */}
      <div className="container-fluid mb-3 mt-2">
        {
          allCategories?.length > 0 ?
            allCategories?.map(categoryDetails => (
              <div droppable="true" onDragOver={dragOverCategory} onDrop={e => videoCardDropOverCategory(e, categoryDetails)} key={categoryDetails?.id} className="border rounded p-3 mb-3">
                <div className="d-flex justify-content-between">
                  <h5>{categoryDetails?.categoryName}</h5>
                  <button onClick={() => { removeCategory(categoryDetails?.id) }} className='btn' ><i class="fa-solid fa-trash text-danger"></i></button>
                </div>
                {/* Display */}
                <div className="row mt-2">
                  {
                    categoryDetails?.allVideos?.length>0 &&
                    categoryDetails?.allVideos?.map(video=>(
                      <div draggable={true} onDragStart={e=>categoryVideoDragStarted(e,video,categoryDetails)} key={video?.id}  className="col-lg-4 me-3">
                        <VideoCard insideCategory={true} displayData={video}/>
                      </div>
                    ))
                  }
                </div>
              </div>
            )) :
            <div>No Categorie are Added yet</div>
        }
      </div>



      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="border rounded p-3">
            <FloatingLabel controlId="floatingCategory" label="Category Name">
              <Form.Control onChange={e => { setCategoryName(e.target.value) }} type="text" placeholder="Category Name" />
            </FloatingLabel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleSaveCategory} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Category