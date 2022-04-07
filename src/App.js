import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import './App.css';
import app from "./firebase.init";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { useState } from "react";


const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleEmailBlur= event=>{
   setEmail(event.target.value)
  }
  const handlePasswordBlur= event=>{
    setPassword(event.target.value)
  }
  const handleSubmit= event=>{
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    createUserWithEmailAndPassword(auth, email, password)
    .then((result)=>{
      const user = result.user
      console.log(user)
    })
    .catch((error)=>{
      console.log(error)
    })
    event.preventDefault()
  }
  return (
    <div>
     
      <div className="registration w-50 mx-auto">
      <h2 className="text-primary mt-4">Please Registration</h2>
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
              Please choose a username.
            </Form.Control.Feedback>
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
      </div>
    </div>
  );
}

export default App;
