import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Update() { 
 
  const { _id } = useParams();
  const navigate = useNavigate(); 

  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [checkbox, setCheckbox] = useState(false);  

  useEffect(() => {
    axios
      .get(`https://64e7bf5db0fd9648b7904d83.mockapi.io/fakeData/${_id}`)
      .then((response) => {
        setId(response.data.id);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setCheckbox(response.data.checkbox); 
      })
      .catch((error) => {
        // Handle the error here, e.g., log it or show a user-friendly message.
        console.error("Error fetching data:", error);
      });
  }, [_id]); 
  const updateAPIData = () => { 
    axios
      .put(`https://64e7bf5db0fd9648b7904d83.mockapi.io/fakeData/${id}`, {
        firstName,
        lastName,
        checkbox
      })
      .then(() => {
        // Navigate to the root page
        navigate('/');
      })
      
  };

  return (
    <div>
      <Form className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="I agree to the Terms and Conditions"
            checked={checkbox}
            onChange={() => setCheckbox(!checkbox)}
          />
        </Form.Field>

        <Button onClick={updateAPIData}>Update</Button>
        <Link to='/'> <Button>Cancel</Button> </Link> 
      </Form>
    </div>
  );
}
