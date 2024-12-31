import React from 'react'
import { Link } from 'react-router-dom'
import landingImg from '../assets/music.png'
import feature1 from '../assets/music-card-one.jpg'
import feature2 from '../assets/music-card-two.jpg'
import feature3 from '../assets/music-card-three.jpg'
import { Card } from 'react-bootstrap'



const Landing = () => {
  return (
    <div style={{ paddingTop: "100px" }} className='container'>
      {/* LANDING PART */}
      <div className="row align-items-center">
        <div className="col-lg-5" >
          <h3>Welcome to <span className='text-warning'>Media Player</span></h3>
          <p style={{ textAlign: 'justify' }}>Media Player App will allow user to add or remove their uploaded videos from youTube and also allow them to arrange it in different categories by drag and drop. User can also have the provision to manage their watch history as well. What are you waiting for, let starts exploring our site!!!</p>
          <Link to={'/home'} className='btn btn-info'>Get Started</Link>
        </div>
        <div className="col"></div>
        <div className="col-lg-6">
          <img src={landingImg} alt="" className='img-fluid' />
        </div>
      </div>
      {/* FEATURE PART */}
      <div className='my-5'>
        <h3 className="text-center">Features</h3>
        <div className="row mt-5">

          <div className="col-lg-4">
            <Card style={{ width: '20rem' }}>
              <Card.Img variant="top" src={feature1} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4">
            <Card style={{ width: '20rem' }}>
              <Card.Img variant="top" src={feature3} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4">
            <Card style={{ width: '20rem' }}>
              <Card.Img variant="top" src={feature3} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>


        </div>
      </div>
      {/* LAST SECTON */}
      <div className="my-5 row align-items-center border rounded p-5">

        <div className="col-lg-5">
          <h3 className='text-warning'>Simple,Fast and powerful</h3>

          <p style={{ textAlign: "justify" }}><span className='fs-5 fw-bolder'>Play Everything : </span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse ipsa, nemo repellat voluptatibus neque vitae aut! Qui inventore explicabo ex expedita eius. </p>
          <p style={{ textAlign: "justify" }}><span className='fs-5 fw-bolder'>Play Everything : </span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse ipsa, nemo repellat voluptatibus neque vitae aut! Qui inventore explicabo ex expedita eius. </p>
          <p style={{ textAlign: "justify" }}><span className='fs-5 fw-bolder'>Play Everything : </span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse ipsa, nemo repellat voluptatibus neque vitae aut! Qui inventore explicabo ex expedita eius. </p>
        </div>
        <div className="col"></div>
        <div className="col-lg-6">
        <iframe width="100%" height="400" src="https://www.youtube.com/embed/5dy3azady4w" title="MARCO Official Teaser | Unni Mukundan | Shareef Muhammed | Haneef Adeni | Ravi Basrur"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>

      </div>
    </div>
  )
}

export default Landing