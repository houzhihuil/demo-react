import axios from 'axios';
import { Table, Button } from 'semantic-ui-react';  
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
 

export default function Read() { 
    const getData = () => {
        axios.get(`https://64e7bf5db0fd9648b7904d83.mockapi.io/fakeData`) 
            .then((getData) => {
                 setAPIData(getData.data);
             })
    } 
    
    const onDelete = (id) => {
        // Show a confirmation dialog
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        
        if (confirmDelete) {
            axios.delete(`https://64e7bf5db0fd9648b7904d83.mockapi.io/fakeData/${id}`)
                .then(() => {
                    getData();
                })
                .catch((error) => {
                    // Handle error here
                    console.error("Error deleting item:", error);
                });
        }
    }
     
/*     function setDATA(id, firstName, lastName,checkbox) {
        localStorage.setItem('id', id);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('checkbox', checkbox);
    }  */

    const [APIData, setAPIData] = useState([]);

    useEffect(() => { 
        axios.get(`https://64e7bf5db0fd9648b7904d83.mockapi.io/fakeData`) 
            .then((response) => {
                setAPIData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <> 
        <div>  
            <Link to='/create'> <Button primary>Create</Button> </Link> 
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Checked</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {APIData.map((data) => (
                        <Table.Row key={data.id}>
 
                            <Table.Cell>{data.id}</Table.Cell>
                            <Table.Cell>{data.firstName}</Table.Cell>
                            <Table.Cell>{data.lastName}</Table.Cell>
                            <Table.Cell>{data.checkbox ? 'Checked' : 'Unchecked'}</Table.Cell>
 
                            <Table.Cell> 
                                <Link to={{ pathname: `/update/${data.id}`  }}> 
                                     <Button  onClick={(e) => {console.log(  data  );
                                    /* setDATA(data.id, data.firstName, data.lastName,data.checkbox) */} }
                                    variant="info">
                                    Update</Button> 
                                </Link>
                            </Table.Cell>
                            <Table.Cell>   
                                <Button onClick={() => onDelete(data.id)}>Delete</Button> 
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table> 
        </div>
        </>
    );
}
