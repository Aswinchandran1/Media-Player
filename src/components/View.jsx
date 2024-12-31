import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import VideoCard from './VideoCard'
import { getAllVideosAPI, saveVideoAPI, updateCategoryAPI } from '../services/allAPI'


const View = ({ addResponseFromHome, deleteResponseFromCategory, setDeleteResponseFromView }) => {

  const [deletevideoResponseFromVideoCard, setDeletevideoResponseFromVideoCard] = useState("")
  const [allVideos, setAllVideos] = useState([])
  useEffect(() => { getAllVideos() }, [addResponseFromHome, deletevideoResponseFromVideoCard, deleteResponseFromCategory])

  // console.log(`allVideos ${allVideos}`);

  const getAllVideos = async () => {
    try {
      let result = await getAllVideosAPI()
      console.log(result);
      if (result.status >= 200 && result.status < 300) {
        // console.log(result.data);
        setAllVideos(result.data)
      } else {
        console.log("API Call Failed");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const dragOverView = (e) => {
    e.preventDefault()
  }

  const categoryVideoDragOverView = async (e) => {
    // console.log("inside categoryVideoDragOverView");
    const { video, categoryDetails } = JSON.parse(e.dataTransfer.getData("dragData"))
    // console.log(video,categoryDetails);
    //Updating the category by delete video from category
    const updateCategoryVideoList = categoryDetails?.allVideos?.filter(item => item.id != video?.id)
    const updateCategory = { ...categoryDetails, allVideos: updateCategoryVideoList }
    console.log(updateCategory);
    const result = await updateCategoryAPI(updateCategory)
    //Use State lifting to communicate data from view to category
    setDeleteResponseFromView(result)
    //Use API to Upload video 
    await saveVideoAPI(video)
    //Call getALLVideos 
    getAllVideos()
  }

  return (
    <>
      <Row droppable="true" onDragOver={dragOverView} onDrop={e => categoryVideoDragOverView(e)}>
        {
          allVideos?.length > 0 ?
            allVideos.map(video => (
              <Col key={video?.id} sm={12} md={6} lg={4} >
                <VideoCard setDeletevideoResponseFromVideoCard={setDeletevideoResponseFromVideoCard} displayData={video} />
              </Col>
            ))
            : <div className='fw-bolder text-danger fs-5'>No Videos are uploaded...</div>
        }
      </Row>
    </>
  )
}

export default View