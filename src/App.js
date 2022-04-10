import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const auth = getAuth(app);

function App() {

  const [email, setEmail] = useState('');
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState();
  const [registered, setRegistered] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const googleProvider = new GoogleAuthProvider();
  const gitHubProvder=new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log('error', error);
      })
  }

  const handleGithubSignIn=()=>{
    signInWithPopup(auth,gitHubProvder)
    .then((result)=>{
      const user=result.user;
      console.log(user);
    })
    .catch(errror=>{
      console.log('error',error);
    })
  }

  const getEmail=(event)=>{
    setEmail(event.target.value);
  }

  const getPassword=(event)=>{
    setPassword(event.target.value);
  }

  const toggleOption=(event)=>{
   setRegistered(event.target.checked);
  }

  const handleUser=(event)=>{

    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      
      event.stopPropagation();
    }

    if(!/(?=.*?[#?!@$%^&*-])/.test(password)){
      setError('Please input atleast one special character');
      return;
    }

    setValidated(true);
    setError('');

    if(registered){
      signInWithEmailAndPassword(auth,email,password)
      .then(userCredential=>{
        const user=userCredential.user;
        console.log(user);
      })
      .catch(error=>{
        console.log(error);
      })
    }
    else{
      createUserWithEmailAndPassword(auth,email,password)
      .then(userCredential=>{
        const user=userCredential.user;
        verifyEmail();
        console.log(user);
      })
    .catch(error=>{
        console.log(error);
    })
    }
  }

  const verifyEmail=()=>{
    sendEmailVerification(auth.currentUser);
  }

  const handleSignOut=()=>{
    signOut(auth)
    .then(()=>{
      console.log('sign out succesful');
      setUser('');
    })
  }


  return (
    <div className="App">
      <h1 className='text-primary'>{registered ? 'Please Login !!' : 'Please Register'}</h1>
      {/* <p>Name: {user.displayName}</p> */}
      <div className='w-25 mx-auto'>
        <Form noValidate validated={validated} onSubmit={handleUser}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={getEmail} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={getPassword} type="password" placeholder="Password" />
            <p>{error}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onClick={toggleOption} type="checkbox" label="Already Have an account" />
          </Form.Group>
          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>
          <br />
        </Form>
        <div className='mt-3'>
          <Button onClick={handleGoogleSignIn} className='mt-2' variant="outline-info">Google</Button>
          <Button onClick={handleGithubSignIn} className='ms-2 mt-2' variant="outline-info">Github</Button>
          <Button onClick={handleSignOut} className='ms-2 mt-2' variant="outline-info">SignOut</Button>

        </div>
      </div>
    </div>
  );
}

export default App;
