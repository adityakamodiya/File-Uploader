import React, { useState } from 'react'
import emailjs  from '@emailjs/browser'
function Form() {
const [name,setname] = useState('')
const [email, setemail] = useState('')
const [message , setmessage] = useState('')

    const  handlesubmit = (e)=>{
        e.preventDefault();
        // alert("jdjfdjfd");

        const serviceId = "service_1lxhoab";
        const templateId = "template_b9xwplr"
        const publicKey =  "477DGgg4A_-dG5iJF"

        const templateParams = {
            from_name : name,
            from_email: email,
            to_name: 'aditya kamodiya',
            message : message,
        };

        emailjs.send(serviceId,templateId, templateParams,publicKey)
        .then(
            (response) => {
              console.log('SUCCESS!', response);
              setname('');
              setemail('');
              setmessage('');
            })
            .catch((error) => {
              console.log('FAILED...', error);
            });
          
        }
  return (
<>
<form action="" onSubmit={handlesubmit}>
    <input type="text" placeholder='name' value={name} onChange={(e)=>{setname(e.target.value)}} />
    <br />
    <input type="email" placeholder='your email'value={email} onChange={(e)=> setemail(e.target.emaiL)} />
    <br />
<textarea rows='10' cols='20' placeholder='message' value={message} onChange={(e)=> setmessage(e.target.message)}></textarea>
<br />
    <button type='submit'> submit</button>
</form>
</>
  )
}

export default Form
