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

const  SHIPMENT_QUERY = gql`
{
  shipments {
    waybill
    address
    name
    phoneNumber
    id
    user {
      name
      id
      email
    }
  }
}
`;

function ShipmentPAGE() {
  const { loading, error, data } = useQuery(SHIPMENT_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error has occured !</p>;
  return data.shipments.map(({ name, waybill,address,phoneNumber,user,id }) => (
    <div key={name} style={{backgroundColor:"lightblue"}}>
      <p style={{marginLeft:"22px",marginTop:"10px"}}>
      name :  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name} <button style={{marginTop:"20px"}} className="EditBtn" onClick={()=>window.location="/editShipment"}  >Edit Shipment</button><br/><br/>
      waybill: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{waybill}<button className="DeleteBtn" onClick={()=>window.location="/deleteShipment"} >Delete Shipment</button><br/><br/>
      address : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{address}<br/><br/>
      Phone number:&nbsp;&nbsp;&nbsp;&nbsp; {phoneNumber}<br/><br/>
      User name: &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.name} <br/><br/>
      User Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.email}<br/>
      ----------------------------------------

      </p>
    </div>
  ));
}

const Shipment = () => (
  <ApolloProvider client={client}>
    <div style={{backgroundColor:"blue",height:"150px"}}>
    <h1 style={{alignContent:"center"}}>Shipping Details</h1>
      <button style={{marginLeft:"20px", paddingTop:"-50px", color:"white", fontWeight:"bold", width:"150px",height:"40px",backgroundColor:"#AA86F3",borderRadius:"30px",marginTop:"-20px"}} onClick={()=>window.location="/newShipment"}>Add New Shippment</button>
      <button style={{marginLeft:"1000px",paddingTop:"-50px", color:"white", fontWeight:"bold", width:"150px",height:"40px",backgroundColor:"#AA86F3",borderRadius:"30px",marginTop:"-20px"}} onClick={()=>window.location="/"}>Logout </button>
      <ShipmentPAGE/>

    

    </div>
  </ApolloProvider>
);

export default Shipment;
