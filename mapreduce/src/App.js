import './App.css';
import { useState , useEffect} from 'react';
import FrequencyTable from './components/frequencyTable'
import axios from 'axios'
function App() {

  const [file,setFile]=useState()
  const [items,setItems]=useState([])
  const uploadFile=async(e)=>{
    e.preventDefault()
		const formData=new FormData()
		formData.append('file',file)
		setFile()
    console.log(formData)
		await axios.post("http://localhost:4000/client/upload-data",formData)
    console.log("upload done")
  }

  const getFrequencies=()=>{
      axios.get("http://localhost:4000/client/get-frequency")
      .then(({data})=>{
        setItems(items=>[...items,...data.data])
      })
  }

  return (
    <div className="App">
     <h1>Map Reduce</h1>
     <input type='file' onChange={(e)=>setFile(e.target.files[0])}/>
     &emsp;
	  <button type='submit' onClick={uploadFile}>Upload File</button>
    &emsp;
    <button type='submit' onClick={getFrequencies}>Get Frequencies</button>
    <h2>Word Frequency</h2>
    {
      <FrequencyTable items={items}/>
    }
    </div>
  );
}

export default App;
