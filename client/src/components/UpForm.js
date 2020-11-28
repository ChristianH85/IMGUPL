import React,{useState} from "react";
import Dropzone from 'react-dropzone'
import axios from 'axios'

function Upform(){
    const[imgData, setImgD]=useState('')
    const[upImg, setUp]=useState("http://res.cloudinary.com/dm2obdaq7/image/upload/v1606513823/trvr1yzvg3pz0mq44v6k.gif")
    const[title, setTitle]=useState('')
    const[caption,setCaption]=useState('')
    const[showUp, setShow]=useState(true)
    const handleIChange=(event)=>{
      console.log(event.target.files[0])
      setImgD(event.target.files[0])
    }
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

      for (var p of formData) {
        console.log(p);
      }
      axios.post('/api/pics/i2',formData).then((response)=>{
        console.log (response)
        setUp(response.data)
        setShow(false)
      })
      //##################
  }
  const addPic=()=>{
    const pObj={
      title:title,
      url: upImg,
      caption:caption
    }
    axios.post('/api/pics/dbpic',pObj).then(res=>{
      console.log(res)
    })
  }
  return(
      <div>
        {showUp?
        <div className="row">
          <div className="col-sm-10 offset-sm-1">  
            < div  className="card">
              <input id="imgI" type='file' accept="image/*" name="file" encType="multipart/form-data" onChange={handleIChange} />
              <button id="upload"type='button'  onClick={handlefile}>Upload</button>

              {/* <form  action="/api/pics/image" method="post" encType="multipart/form-data" >
                  <input type="file" name="avatar" />
                  <button id='picB' type = "submit" >submit</button>
              </form> */}
            </div>
          </div>
        </div>:
            <>
            </>

        }
            {/* <input id="imgI" type='file' accept="image/*" name="file" encType="multipart/form-data" onChange={handleIChange} />
            <input type='button' value="Upload" onClick={handlefile}/>

            <form  action="/api/pics/image" method="post" encType="multipart/form-data" >
                <input type="file" name="avatar" />
                <button type = "submit" >submit</button>
            </form> */}
            {!showUp?
              <div className="row">
              <div className="col-sm-10 offset-sm-1 col-md-6 offset-md-3">
                  <div className="card">
                      

                        <input id='title' name='title' type='text' placeholder="Title" value={title} onChange={handleDChange} />
                        <img id="upImg"src={upImg} alt="No Image Yet"/>
                        <textarea id='caption' name='caption' type='text' placeholder="Caption this" value={caption}onChange={handleDChange} />
                        <button id='addPic' onClick={addPic}>Add To Pictures</button>
                      
                  </div>
              </div>          
          </div>:<></>
            }
          
            
      </div>
  )
}
export default Upform