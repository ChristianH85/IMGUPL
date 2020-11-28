import React , {useState,useEffect} from 'react'
import axios from 'axios'
import patient from '../utils/patient.gif'
function Gallery(){
    const [imgs, setImgs]=useState([])
    useEffect(() => {
        axios.get('/api/pics/mypics')
            .then(res=>{
                setImgs(res.data)
            })
            .catch(err => console.log(err));
      }, [])

      const handleDelete = (event)=>{
          event.preventDefault();
        console.log(event.target.name)
        let id= event.target.name
        let items=imgs
        let newPlist= items.splice(items.findIndex(function(i){
            return i._id === id;
        }), 1)
        console.log(newPlist)
        
        axios.delete('/api/pics/'+id).then(data=>{
            console.log(data);
        })

      }
    // const showImgs=()=>{
    //     axios.get('/api/pics/mypics').then(res=>{
    //         setImgs(res.data)
    //     })
    // }
return(
    <div className="container gallery">
        {/* <button onClick={showImgs}> Show Imgs </button> */}
        <div className="row">
        {imgs.length >0? 
        imgs.map((data)=>{
            return(
            <div className="col-md-12 col-lg-6">
                <div className="card" key={data._id}>
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
                            <img src={data.url}class="img-fluid" alt={patient} id="upImg"/>
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