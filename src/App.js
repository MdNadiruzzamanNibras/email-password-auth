import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import './App.css';
import app from "./firebase.init";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { useState } from "react";


const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [registration, setRegistration] =useState(false);
  const [email, setEmail] = useState('')
  const [error, setError]= useState('')
  const [password, setPassword] = useState('')
  const handleEmailBlur= event=>{
   setEmail(event.target.value)
  }
  const handlePasswordBlur= event=>{
    setPassword(event.target.value)
  }
  const handleCheck = event =>{
    setRegistration(event.target.checked)
  }
  const handleSubmit= event=>{
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      
      event.stopPropagation();
      return;
    }
    if(!/(?=.*[!@#$%^&*])/.test(password)){
      setError('please enter special and number chactor')
      return;
    }
    setValidated(true);
    setError('')
    if(registration){
      signInWithEmailAndPassword(auth, email, password)
      .then((result)=>{
        const user = result.user
        console.log(user)
      })
      .catch((error)=>{
        console.log(error)
        setError(error.massage)
      })
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
    .then((result)=>{
      const user = result.user
      console.log(user)
      setEmail('')
      setPassword('')
      verify()
    })
    .catch((error)=>{
      console.log(error)
      setError(error.massage)
    })
   
    }
    event.preventDefault();
  }

  const verify= ()=>{
    sendEmailVerification(auth.currentUser)
    .then(()=>{
      console.log('Email verification sent')
    })
  }
  const handleForget =()=>{
    sendPasswordResetEmail(auth, email)
    .then(()=>{
      console.log('email sent')
    })
  }
  return (
    <div>
     
      <div className="registration w-50 mx-auto">
      <h2 className="text-primary mt-4">Please {registration ? 'Login' : "Registration"}</h2>
      <Form noValidate validated={validated}  onSubmit={handleSubmit}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
    <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
    <Form.Control.Feedback type="invalid">
              Please enter 6 digit and choose a special charactor
            </Form.Control.Feedback>
            <p className="text-danger">{error}</p>
     <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" onChange={handleCheck} label="Already registar " />
  </Form.Group>
  <Button onClick={handleForget} variant="link">Link</Button>
  </Form.Group>
  <Button variant="primary" type="submit">
  {registration ? 'Login' : "Registration"}
  </Button>
</Form>
      </div>
    </div>
  );
}

export default App;
