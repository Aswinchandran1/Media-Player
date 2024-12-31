import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteHistoryAPI, getAllHistoryAPI } from '../services/allAPI'

const History = () => {
  const [allVideoHistory, setallVideoHistory] = useState([])
  useEffect(() => { getAllHistory() }, [])

  const getAllHistory = async () => {
    try {
      let result = await getAllHistoryAPI()
      if (result.status >= 200 && result.status < 300) {
        setallVideoHistory(result.data)
      }
      else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const removeHistory = async (id) => {
    try {
      await deleteHistoryAPI(id)
      getAllHistory()
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div style={{ paddingTop: '100px' }}>
      <div className="d-flex justify-content-between container">
        <h3>Watch History</h3>
        <Link to={'/home'}>Back to Home</Link>
      </div>
      <table className='container my-5 table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Caption</th>
            <th>Link</th>
            <th>Time Stamp</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          {
            allVideoHistory?.length > 0 ?
              allVideoHistory?.map((videoDetails, index) => (
                <tr key={videoDetails?.id}>
                  <td>{index + 1}</td>
                  <td>{videoDetails?.caption}</td>
                  <td>{videoDetails?.youtubeLink}</td>
                  <td>{videoDetails?.timeStamp}</td>
                  <td><button onClick={() =>removeHistory(videoDetails?.id)}  className='btn'><i class="fa-solid fa-trash text-danger"></i></button></td>
                </tr>
              )) :
              <div className='fw-bolder text-danger fs-5 fw-bolder text-danger fs-5'>You Dont't Watch any video Yet</div>
          }
        </tbody>
      </table>
    </div>
  )
}

export default History