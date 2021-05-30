import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import "../App.css";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Register from "../Pages/Register";
import { Link } from "react-router-dom"; 
import { gql } from "apollo-boost";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Query } from "react-apollo";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Button } from 'semantic-ui-react'

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
});

const UPDATE_SHIPMENT_QUERY = gql`
  mutation updateShipment(
    $id: ID!
    $name: String!
    $waybill:String!
    $user_id: String!
    $phoneNumber:String!
    $address:String!
  ) {
    updateShipment
    (
      id: $id
      name: $name
      user_id: $user_id
      waybill: $waybill
      phoneNumber: $phoneNumber
      address: $address
    ) {
      id      
    }
  }
`;


function UPDATE_Shipment() {
    let input;
    const [updateShipment] = useMutation(UPDATE_SHIPMENT_QUERY);
    const [waybill, setWaybill] = useState('');
    const [user_id, setUser_id] = useState('');
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
  
    return (
      <div className="register">
        <form
        style={{marginLeft:"550px"}}
          onSubmit={(e) => {
            e.preventDefault();
            updateShipment({
              variables: {
                id:8,
                name: name,
                user_id: user_id,
                waybill: waybill,
                phoneNumber: phoneNumber,
                address: address,
              },
            }).then(function (response) {
              console.log(response)
              alert("you have successfully updated this Shipment !");
              window.location = "/shipmentPage";
            });
  
          }}
        >
          <input placeholder="name" style={{ height:"20px", width:"250px",marginTop:"30px"}} type="text"  onChange={event => setName(event.target.value)} /><br/><br/>
          <input placeholder="user_id" style={{ height:"20px", width:"250px"}} type="text"   onChange={event => setUser_id(event.target.value)}/><br/><br/>
          <input placeholder="waybill" type="text" style={{ height:"20px", width:"250px"}}  onChange={event => setWaybill(event.target.value)} /> <br/><br/>
          <input placeholder="phoneNumber" style={{ height:"20px", width:"250px"}} type="text"  onChange={event => setPhoneNumber(event.target.value)} /><br/><br/>
          <input placeholder="address" style={{ height:"20px", width:"250px"}} type="text"   onChange={event => setAddress(event.target.value)}/><br/><br/>
          
          
          
          <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="submit" style={{marginLeft:"20px",marginTop:"-70px",width:"150px",height:"30px",backgroundColor:"lightblue"}}>Update Shipment</button>
         
          <hr className="my-4" />
        </form>
      </div>
    );
  }
  


const editShipment = () => (
  <ApolloProvider client={client}>
    <div style={{backgroundColor:"blue"}}>   
   

    <button style={{marginLeft:"1150px",marginTop:"100px", color:"white", fontWeight:"bold", width:"150px",height:"40px",backgroundColor:"#AA86F3",borderRadius:"30px"}} onClick={()=>window.location="/"}>Logout </button>
 
 <h1 style={{marginTop:"-130px",marginBottom:"150px",paddingTop:"30px"}}>Edit Shippment</h1>



    <UPDATE_Shipment />

    </div>
  </ApolloProvider>
);




export default editShipment;




