import './App.css';
import { useState , useEffect} from 'react';
import FrequencyTable from './components/frequencyTable'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LoadingButton from './components/LoadingButton';
import {setGlobalState} from './states'
function App() {

  const [file,setFile]=useState()
  const [items,setItems]=useState([])
  const [upLoading,setupLoading]=useState(false)
  const [submit,setSubmit]=useState(false)
  const navigate=useNavigate()
  const uploadFile=async(e)=>{
    e.preventDefault()
		const formData=new FormData()
		formData.append('file',file)
		setFile()
    console.log(formData)
    setupLoading(true)
		await axios.post("http://localhost:4000/client/upload-data",formData)
    setupLoading(false)
  }

  const getFrequencies=async(e)=>{
    e.preventDefault()
      setSubmit(true)
      const {data}=await axios.get("http://localhost:4000/client/get-frequency")
      setItems(items=>[...items,...data.data])
      setSubmit(false)
      console.log(data)
      console.log(data.logs)
      setGlobalState("logs",data.logs)
  }

  return (
    <div className="App">
     <h1>Map Reduce</h1>
     <input type='file' onChange={(e)=>setFile(e.target.files[0])}/>
     &emsp;
	 {upLoading?<LoadingButton text="Uploading your file..."/>:(<button type='submit' className='btn btn-primary' onClick={uploadFile}>Upload File</button>)}
    &emsp;
    {submit?<LoadingButton text="Generating your solution..."/>:(<button type='submit' className='btn btn-primary' onClick={getFrequencies}>Get Frequencies</button>)}
    &emsp;
    <button type='submit' className='btn btn-primary' onClick={()=>navigate("/logs")}>View Logs</button>
    <h2>Word Frequency</h2>
    {
      <FrequencyTable items={items}/>
    }
    </div>
  );
}

export default App;
