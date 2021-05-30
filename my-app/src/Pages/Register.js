import {React, useState} from 'react'
import {useParams} from 'react-router-dom'
import Home from "../Pages/Home";
import { Link } from "react-router-dom"; 
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
});

const ADD_USER = gql`
  mutation createUser(
    $name: String!
    $email: String!
    $password:String!
  ) {
    createUser
    (
      name: $name
      email: $email
      password: $password
    ) {
      id      
    }
  }
`;

function ADD_User() {
  let input;
  const [createUser] = useMutation(ADD_USER);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState("");

  return (
    <div className="register">
        <h1 style={{marginLeft:"600px",paddingTop:"50px"}}>Register Page</h1>
      <form
      style={{marginLeft:"550px"}}
        onSubmit={(e) => {
          e.preventDefault();
          createUser({
            variables: {
              name: name,
              email: email,
              password:password
            },
          }).then(function (response) {
            console.log(response)
            alert("you have successfully create an account!");
            window.location = "/shipmentPage";
          });

        }}
      >
        <input placeholder="name" style={{ height:"20px", width:"250px"}} type="text"  name="name" onChange={event => setName(event.target.value)} /><br/><br/>
        <input placeholder="Email" style={{ height:"20px", width:"250px"}} type="email" name="email"  onChange={event => setEmail(event.target.value)}/><br/><br/>
        <input type="password" style={{ height:"20px", width:"250px"}} name="password" onChange={event => setPassword(event.target.value)} /> 
        <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="submit" style={{marginLeft:"40px",marginTop:"10px",width:"100px",height:"30px",backgroundColor:"lightblue"}}>Create user</button>
        <Link
        style={{ marginLeft: "4%" }}
        to={{
          pathname: "./",
        }}
        >
        <span>Login</span>
        </Link>
        <hr className="my-4" />
      </form>
    </div>
  );
}

const Register = () => (
  <ApolloProvider client={client}>
    <div>
      <ADD_User />
    </div>
  </ApolloProvider>
);

export default Register;