import React, { useState } from 'react'
import axios from 'axios'
// import Home from "../../../../fsl/select-countries/src/world-countries-states-cities/Home"
import emailjs from '@emailjs/browser'
import "./form.css"
import { useEffect } from 'react'
function Form() {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [message, setmessage] = useState('')
  const [file, setfile] = useState('');
  const [states, setstates] = useState([])
  const [cities, setcities] = useState([])

  // const handlesubmit = async (e) => {
  //   e.preventDefault();


  //   const serviceId = "service_1lxhoab";
  //   const templateId = "template_b9xwplr"
  //   const publicKey = "477DGgg4A_-dG5iJF"

  //   const templateParams = {
  //     from_name: name,
  //     from_email: email,
  //     to_name: 'aditya kamodiya',
  //     message: message,
  //   };

  //   // emailjs.send(serviceId, templateId, templateParams, publicKey)
  //   //   .then(
  //   //     (response) => {
  //   //       console.log('SUCCESS!', response);
  //   //       setname('');
  //   //       setemail('');
  //   //       setmessage('');
  //   //     })
  //   //   .catch((error) => {
  //   //     console.log('FAILED...', error);
  //   //   });


  //   //  THIS IS DATA UPLOADING CONTENTS--------------

  //   if (!file) {
  //     console.log("No file selected");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('name', name);

  //   try {
  //     const response = await axios.post('http://localhost:8002/upload ', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     console.log('File uploaded successfully:', response.data);
  //   }
  //   catch (error) {
  //     console.error('Error uploading file:', error);
  //   }

  // }




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
        console.log(response);
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
        console.log(response);
        setcities(response);
      })
      .catch(error => console.log('error', error));
  }



  return (
    <>
      <div id="wrapper">
        <form action="" onSubmit={''}>
          <input type="text" placeholder='name' value={name} onChange={(e) => { setname(e.target.value) }} />
          <input type="number" name="" id="" placeholder='write your numbers' />
          <input type="email" placeholder='your email' value={email} onChange={(e) => setemail(e.target.emaiL)} />
    
         
          <select onChange={(e) => { AllCities(e.target.value) }} className='states' >
            <option selected disabled>select state</option>
            {
              states.map((result) => {
                return <option value={result.iso2}  >{result.name}</option>
              })
            }
          </select>

          <select onChange={''} className='cities'   >
            <option selected disabled>select city</option>
            {
              cities.map((result) => {
                return <option value={''}  >{result.name}</option>
              })
            }
          </select>
          <textarea rows='10' cols='20' placeholder='message' value={message} onChange={(e) => setmessage(e.target.value)}></textarea>
          <input className='file' type="file" onChange={(e) => { setfile(e.target.files[0]) }} />

          <button type='submit'> submit</button>
        </form>
      </div>

      {/* <Home></Home> */}
    </>
  )
}

export default Form
