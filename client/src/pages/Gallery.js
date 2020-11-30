import React , {useState,useEffect} from 'react'
import axios from 'axios'
import patient from '../utils/patient.gif'
import {Redirect} from 'react-router-dom'
function Gallery(){
    const [imgs, setImgs]=useState([])
    const[refresh,setRefresh]=useState(false)

    useEffect(() => {
        axios.get('/api/pics/mypics')
            .then(res=>{
                setImgs(res.data)
            })
            .catch(err => console.log(err));
      }, [refresh])

      const handleDelete = (event)=>{
        event.preventDefault();
        let id= event.target.name
        let items=imgs
        let i = items.findIndex(function(i){
            return i._id === id;
        })
        
       
        console.log(items)
        setImgs(items)
        axios.delete('/api/pics/'+id).then(data=>{
            console.log(data);
            setRefresh(true)
        })
    
      }

return(
    <div className="container gallery">
        <div className="row">
        {imgs.length >0? 
        imgs.map((data)=>{
            return(
            <div className="col-md-12 col-lg-6"key={data._id}>
                <div className="card">
                    <div className="row" id="tRow">
                        <div className="col-sm-10">
                            <h2 className="card-title">{data.title}</h2>
                        </div>
                        <div className="col-sm-2">
                            <button name={data._id} onClick={handleDelete} className="delete-btn">X</button>
                        </div>
                    </div>
                    <div className="row" >
                            <div className='cImg'>
                            <img src={data.url}className="img-fluid" alt={patient} id="upImg"/>
                            </div>
                    </div>
                    <div className="row cRow" id ="caption">
                        <p>{data.caption}</p>
                    </div>       
                </div>
            </div>)
        }):<div></div>}
        </div>

    </div>
)
}
export default Gallery;