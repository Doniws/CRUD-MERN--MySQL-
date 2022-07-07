import React,{useState,useEffect} from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';

const ContentList = () => {
    const [contents , setContents] = useState([]);

    useEffect(()=>{
        getContents();
    },[])
    const getContents = async() =>{
        const response = await axios.get("http://localhost:5000/contents");
        setContents(response.data);
    }

    const deleteContent = async(contentId) => {
        try {
            await axios.delete(`http://localhost:5000/contents/${contentId}`);
            getContents();
        } catch (error) {
            console.log(error)
        }
    }

    

    return (
        <div className='container mt-5'>
            <Link to="/add" className="button is-success">Add new</Link>
            <div className="columns is-multiline">
                {contents.map((content)=>(
                     <div className="column is-one-quarter" key={content.id}>
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-4by3">
                                <img src={content.url} alt="Placeholder image" />
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="media">

                                <div className="media-content">
                                    <p className="title is-4">{content.name}</p>
                                    <p className="subtitle is-6">{content.email}</p>
                                </div>
                            </div>

                        <footer className="card-footer">
                            <Link to={`edit/${content.id}`} className="card-footer-item">Edit</Link>
                                    <a onClick={() => deleteContent(content.id)} className="card-footer-item">Delete</a>
                        </footer>
                        </div>
                    </div>

                </div>
                ))}
                
            </div>
        </div>
    )
}

export default ContentList