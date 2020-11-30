import React,{useState} from "react";
import axios from 'axios'
import patient from '../utils/patient.gif'
import {Redirect} from 'react-router-dom'

function Upform(){
    const[imgData, setImgD]=useState('')
    const[upImg, setUp]=useState("")
    const[title, setTitle]=useState('')
    const[caption,setCaption]=useState('')
    const[showUp, setShow]=useState(true)
    const[redirect,setRedirect]=useState(false)

    ////// track change of file input and capture data
    const handleIChange=(event)=>{
      console.log(event.target.files[0])
      setImgD(event.target.files[0])
    }
    ///////// handle form inputs and saves data for sending to db
    const handleDChange=(event)=>{
      let name=event.target.id
      let val=event.target.value
      if (name==="title"){
        setTitle(val)
      }
      else if(name==="caption"){
        setCaption(val)
      }
    }
    const handlefile=(event)=>{
      event.preventDefault()
      setShow(false)
    //################## package file info and send it back
      var formData = new FormData();
      formData.append('file',imgData );
      /////// function for viewing form data
      for (var p of formData) {
        console.log(p);
      }
      axios.post('/api/pics/imgup',formData).then((response)=>{
        console.log (response)
        setUp(response.data)
        setShow(false)
      })
      //##################
  }
  //////////add url caption and title to db
  const addPic=()=>{
    const pObj={
      title:title,
      url: upImg,
      caption:caption
    }
    axios.post('/api/pics/dbpic',pObj).then(res=>{
      console.log(res)
      setRedirect(true)
    })
  }
  return(
      <div>
        {redirect?<Redirect push to='/'/>:<div></div>}
        {showUp?
        <div className="row space">
          <div className="col-sm-10 offset-sm-1 col-md-6 offset-md-3">  
            < div  className="card">
              <h1>Upload Image</h1>
              <p>please use optimized photos to keep size down</p>
              <input id="imgI" type='file' accept="image/*" name="file" encType="multipart/form-data" onChange={handleIChange} />
              <button id="upload"type='button'  onClick={handlefile}>Upload</button>
            </div>
          </div>
        </div>:
            <>
            </>
        }
            {!showUp?
              <div className="row space">
              <div className="col-xs-10 offset-xs-1 col-md-6 offset-md-3">
                  <div className="card">
                        <input id='title' name='title' type='text' placeholder="Title" value={title} onChange={handleDChange} />
                        <img id="upImg"src={upImg} alt={patient}/>
                        <textarea id='caption' name='caption' type='text' placeholder="Caption this" value={caption}onChange={handleDChange} />
                        <button id='addPic' onClick={addPic}>Add To Pictures</button>                      
                  </div>
              </div>          
          </div>:
          <></>
            }
      </div>
  )
}
export default Upform