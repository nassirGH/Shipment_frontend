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

const DELETE_SHIPMENT_QUERY = gql`
  mutation deleteShipment(
    $id: ID!
  ) {
    deleteShipment
    (
      id: $id
      
    ) {
      id      
    }
  }
`;


function DELETE_Shipment() {
    let input;
    const [deleteShipment] = useMutation(DELETE_SHIPMENT_QUERY);
  
    return (
      <div className="register">
        <form
        style={{marginLeft:"550px"}}
          onSubmit={(e) => {
            e.preventDefault();
            deleteShipment({
              variables: {
                id:1,
              },
            }).then(function (response) {
              console.log(response)
              alert("you have successfully deleted this Shipment !");
              window.location = "/shipmentPage";
            });
  
          }}
        >
          
          
          
          <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="submit" style={{marginLeft:"20px",marginTop:"-70px",width:"150px",height:"30px",backgroundColor:"lightblue"}}>Delete Shipment</button>
         
          <hr className="my-4" />
        </form>
      </div>
    );
  }
  


const deleteShipment = () => (
  <ApolloProvider client={client}>
    <div style={{backgroundColor:"blue",height:"150px"}}> 
    <button style={{marginLeft:"1150px",marginTop:"100px", color:"white", fontWeight:"bold", width:"150px",height:"40px",backgroundColor:"#AA86F3",borderRadius:"30px"}} onClick={()=>window.location="/"}>Logout </button>
 
    <h1 style={{marginTop:"-130px",marginBottom:"150px",paddingTop:"30px"}}>Delete Shippment</h1>
   
    <DELETE_Shipment />

    </div>
  </ApolloProvider>
);




export default deleteShipment;




