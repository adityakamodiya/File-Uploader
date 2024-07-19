import React, { useState } from 'react'
import axios from 'axios'
// import Home from "../../../../fsl/select-countries/src/world-countries-states-cities/Home"
import emailjs from '@emailjs/browser'
import "./form.css"
import { useEffect } from 'react'
function Form() {
  const [name, setname] = useState('')
  const [numbers, setnumbers] = useState('')
  const [email, setemail] = useState('')
  const [stateName, setstateName] = useState('')
  const [cityName, setcityName] = useState('')
  const [message, setmessage] = useState('')
  const [file, setfile] = useState('');
  const [states, setstates] = useState([])
  const [cities, setcities] = useState([])
  const [Fileformat, setFileformat] = useState(true);



  const handlesubmit = async (e) => {
    e.preventDefault();
    let btn = document.querySelector('.submitBtn')
    console.log(btn)
    btn.style.cursor = 'none'
    btn.style.backgroundColor = 'white'
    btn.style.color = 'black'
    btn.disabled = true;

    //  THIS IS EMAIL CONTENT---------

    const serviceId = "service_1lxhoab";
    const templateId = "template_b9xwplr"
    const publicKey = "477DGgg4A_-dG5iJF"

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'aditya kamodiya',
      message: message,
      Uploader_State: stateName,
      Uploader_City: cityName,
      Uploader_Mo_no: numbers,
    };


    // emailjs.send(serviceId, templateId, templateParams, publicKey)
    //   .then(
    //     (response) => {
    //       console.log('SUCCESS!', response);
    //       // setname('');
    //       // setemail('');
    //       // setmessage('');
    //       // window.location.reload();
    //     })
    //   .catch((error) => {
    //     console.log('FAILED...', error);
    //   });

   



    //  THIS IS DATA UPLOADING CONTENTS--------------

    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Number', numbers);
    formData.append('Email', email);
    formData.append('State', stateName);
    formData.append('City', cityName);
    formData.append('file', file);
    // formData.append('Message', cityName);

    try {
      const response = await axios.post('https://file-uploader-back-d5gt.onrender.com/upload ', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully:', response.data);

      alert("submitted successfully!!!")
      window.location.reload();

    }
    catch (error) {
      console.error('Error uploading file:', error);
    }







  }

  // THIS USeEFFECT IS FOR CALLING THE STATES FUNCTION---------



  // THIS USeEFFECT IS FOR CALLING THE STATES FUNCTION---------
  // THIS USeEFFECT IS FOR CALLING THE STATES FUNCTION---------
  // THIS USeEFFECT IS FOR CALLING THE STATES FUNCTION---------



  useEffect(() => {
    AllStates();
  }, []);

  function AllStates() {
    const headers = new Headers();
    headers.append("X-CSCAPI-KEY", "TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA==");

    const requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    };

    fetch("https://api.countrystatecity.in/v1/countries/IN/states", requestOptions)
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        setstates(response);
      })
      .catch(error => console.log('error', error));
  }


  // THIS function IS USED FOR CALLING ALL THE CITIES------


  function AllCities(code) {

    // console.log(code)
    const headers = new Headers();
    headers.append("X-CSCAPI-KEY", "TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA==");

    const requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    };

    fetch(`https://api.countrystatecity.in/v1/countries/IN/states/${code}/cities`, requestOptions)
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        setcities(response);
      })
      .catch(error => console.log('error', error));
  }

  // THSI FUNCTION IS USED TO GET THE STATENAME-------
  const handleStateChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const code = e.target.value;
    const name = e.target.options[selectedIndex].text;
    // console.log(code,name)
    setstateName(name);
    AllCities(code);
  };

  // THIS FUNCTION IS USED TO CHECK THE FILE EXTENSION LIKE .PDF, .DOCX, .JGG ETC -----. 
  function CheckFormat(e) {
    let format = e.target.files[0].name.slice(e.target.files[0].name.lastIndexOf('.') + 1, e.
      target.files[0].name.length);

    // console.log(format)

    if (format == 'pptx' || format == 'ppt' || format == 'docx') {
      alert('change your file fromat( ex : pdf etc. ).If your submit the form with this format your data will no have been recieved.')
       setfile('') ;  
      setFileformat(false);
    }
    else
      {
        setfile(e.target.files[0]) 
         setFileformat(true)
        // console.log(e.target.files[0]);
      }

  }


  return (
    <>
      <div id="wrapper">
        <form action="" onSubmit={(Fileformat)?handlesubmit:''}>
          <h1><span>Ek Form jo Bhej</span> De Apka Data</h1>

          <input required type="text" placeholder='Name' value={name} onChange={(e) => { setname(e.target.value) }} />

          <input required type="number" name="" id="" placeholder='Phone numbers' onChange={(e) => { setnumbers(e.target.value) }} />

          <input required type="email" placeholder='Email' value={email} onChange={(e) => setemail(e.target.value)} />


          <select required onChange={handleStateChange} className='states'>
            <option selected disabled>Select State</option>
            {
              states.map((result, index) => (
                <option key={index} value={result.iso2}>{result.name}</option>
              ))
            }
          </select>

          <select required onChange={e => { setcityName(e.target.value) }} className='cities'   >
            <option selected disabled>Select City</option>
            {
              cities.map((result) => {
                return <option value={result.name}>{result.name}</option>
              })
            }
          </select>

          <textarea required rows='10' cols='20' placeholder='message' value={message} onChange={(e) => setmessage(e.target.value)}></textarea>

          <input required className='file' type="file" onChange={(e) => { CheckFormat(e) }} />

          <button type='submit' className='submitBtn'> Submit</button>

        </form>
      </div>

      {/* <Home></Home> */}
    </>
  )
}

export default Form


