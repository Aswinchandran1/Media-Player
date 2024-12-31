import React, { useState } from 'react'
import Add from '../components/Add'
import View from '../components/View'

import { Link } from 'react-router-dom'
import Category from '../components/Category'

const Home = () => {

  const [deleteResponseFromView, setDeleteResponseFromView] = useState("")
  const [addResponseFromHome, setAddResponseFromHome] = useState("")
  const [deleteResponseFromCategory, setDeleteResponseFromCategory] = useState("")

  return (
    <div style={{ paddingTop: '100px' }}>
      <div className="d-flex justify-content-between container mb-5">
        <Add setAddResponseFromHome={setAddResponseFromHome} />
        <Link to={'/history'}>Watch History</Link>
      </div>
      <div className="container-fluid row my-5">
        <div className="col-lg-6">
          <h3>All Videos</h3>
          <View setDeleteResponseFromView={setDeleteResponseFromView} deleteResponseFromCategory={deleteResponseFromCategory} addResponseFromHome={addResponseFromHome} />
        </div>
        <div className="col-lg-6">
          <Category deleteResponseFromView={deleteResponseFromView} setDeleteResponseFromCategory={setDeleteResponseFromCategory} />
        </div>
      </div>
    </div>
  )
}

export default Home