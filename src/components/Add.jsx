import React, { useState } from 'react'
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { saveVideoAPI } from '../services/allAPI';


const Add = ({setAddResponseFromHome}) => {
  
  const [videoDetails, setVideoDetails] = useState({
    caption: "", imgUrl: "", youtubeLink: ""
  })
  console.log(videoDetails);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [invalidYoutubeLink, setInvalidYoutubeLink] = useState(false)

  const extractEmbedLinkFromYoutubeLink = (userInputYoutubeLink) => {
    //Steps to create embed code from youtube link
    if (userInputYoutubeLink.includes('https://www.youtube.com/watch?v=')) {
      console.log(userInputYoutubeLink.split("v=")[1].slice(0, 11));
      const videoId = userInputYoutubeLink.split("v=")[1].slice(0, 11);
      setInvalidYoutubeLink(false)
      setVideoDetails({ ...videoDetails, youtubeLink: `https://www.youtube.com/embed/${videoId}` })
    } else {
      setInvalidYoutubeLink(true)
      setVideoDetails({ ...videoDetails, youtubeLink: "" })
    }
  }

  const handleUploadVideo = async () => {
    // Object Destructuring
    const { caption, imgUrl, youtubeLink } = videoDetails;
    if (caption && imgUrl && youtubeLink) {
      try {
        const result = await saveVideoAPI(videoDetails)
        console.log(result);
        if (result.status > 200 && result.status < 300) {
          alert("Video Uploaded successfully!!")
          handleClose()
          setAddResponseFromHome(result)
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please fill the form !!!")
    }
  }

  return (
    <>
      <div className='d-flex align-items-center'>
        <h5>Upload New Video</h5>
        <button onClick={handleShow} className='btn btn-warning ms-3 rounded-circle fw-bolder fs-5'>+</button>
      </div>

      {/* MODAL */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Video Details !!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="border rounded p-3">
            <FloatingLabel controlId="floatingCaption" label="Video caption">
              <Form.Control onChange={e => setVideoDetails({ ...videoDetails, caption: e.target.value })} type="text" placeholder="Video Caption" />
            </FloatingLabel>
            <FloatingLabel className='mt-3' controlId="floatingUrl" label="Video Image URL">
              <Form.Control onChange={e => setVideoDetails({ ...videoDetails, imgUrl: e.target.value })} type="text" placeholder="Video Image URL" />
            </FloatingLabel>
            <FloatingLabel className='mt-3' controlId="floatingLink" label="Video Youtube Link">
              <Form.Control onChange={e => extractEmbedLinkFromYoutubeLink(e.target.value)} type="text" placeholder="Video Youtube Link" />
            </FloatingLabel>
            {
              invalidYoutubeLink && <div className='text-danger fw-bolder pt-2'>*Invalid Youtube Link...</div>
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleUploadVideo} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add