import React, { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { removeVideoAPI, saveHistoryAPI } from '../services/allAPI';



const VideoCard = ({ displayData, setDeletevideoResponseFromVideoCard, insideCategory }) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = async () => {
    setShow(true)
    const { caption, youtubeLink } = displayData;
    const sysDateTime = new Date()
    // console.log(sysDateTime);
    // console.log(sysDateTime.toLocaleString('en-US', { timeZoneName: 'short' }));
    const timeStamp = sysDateTime.toLocaleString('en-US', { timeZoneName: 'short' });
    const historyDetails = { caption, youtubeLink, timeStamp }
    try {
      await saveHistoryAPI(historyDetails)
    } catch (err) {
      console.log(err);
    }
  };

  const deleteVideo = async (id) => {
    try {
      const result = await removeVideoAPI(id)
      setDeletevideoResponseFromVideoCard(result)
    } catch (err) {
      console.log(err);
    }
  }

  const videoCardDragStarted = (e, dragVideoDetails) => {
    console.log("inside videoCardDragStarted", dragVideoDetails.id);
    // Share data using event drag start
    e.dataTransfer.setData("videoDetails", JSON.stringify(dragVideoDetails))

  }

  return (
    <>
      <Card draggable={true} onDragStart={e => { videoCardDragStarted(e, displayData) }} style={{ width: '15rem' }} className='mt-4' >
        <Card.Img onClick={handleShow} height={'180px'} variant="top" src={displayData?.imgUrl} />
        <Card.Body>
          <Card.Text className='d-flex justify-content-between'>
            <p>{displayData?.caption}</p>
            {
              !insideCategory && <button onClick={() => { deleteVideo(displayData?.id) }} className='btn'><i class="fa-solid fa-trash text-danger"></i></button>
            }
          </Card.Text>
        </Card.Body>
      </Card>

      <Modal
        size='lg'
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{displayData?.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe width="100%" height="400" src={`${displayData?.youtubeLink}?autoplay=1 `} title="MARCO Official Teaser | Unni Mukundan | Shareef Muhammed | Haneef Adeni | Ravi Basrur" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </Modal.Body>
      </Modal>
    </>

  )
}

export default VideoCard