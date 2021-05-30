import React from "react";
import { Redirect, Link } from "react-router-dom";
import { gql } from "@apollo/client";

class Home extends React.Component {
  state = {
    auth: 0,
    err: "",
    token: "",
  };

  loginCheck = async (e) => {
    console.log(this.props.client)
    e.preventDefault();
    const testQuery = gql`
    mutation{
      loginUser(
          email:"${document.querySelector("#inputEmail").value}"
          password:"${document.querySelector("#inputPassword").value}"
          )
    }
    `;
    this.props.client
      .mutate({
        mutation: testQuery,
      })
      .then((res) => {
        console.log(res)
        if (res.data.loginUser !== null) {
          window.localStorage.setItem("token", res.data.loginUser);
          this.setState({ token: res.data.loginUser });
          console.log(res);
          alert("Login Successfully");
          this.setState({ auth: 200 });
        } else {
          alert("Login Failed");
          this.setState({ auth: 400 });
        }
      });
  };

  render() {
    if (this.state.auth === 200) {
      return (
        <Redirect
          to={{
            pathname: `./shipmentPage`,
            state: { token: this.state.token },
          }}
        />
      );
    }

    return (
      <>
        <div className="home">
        <h1 style={{marginLeft:"600px",paddingTop:"50px"}}>Login Page</h1>
          <div className="container ">
            <div className="row ">
              <div className="col-sm-9 col-md-7 col-lg-5 mx-auto ">
                <div className="card card-signin my-5 ">
                  <div className="card-body">
                    <form
                      className="form-signin"
                      onSubmit={this.loginCheck}
                      method="post"
                    >                    
                      <input placeholder="Email" id="inputEmail" style={{marginLeft:"550px", height:"20px", width:"250px"}} type="email"  /><br/><br/>
                      <input type="password" id="inputPassword" style={{marginLeft:"550px", height:"20px", width:"250px"}}  /> 
                      <br/><br/><br/>
                      <Link
                        style={{ marginLeft: "56%",marginTop:"55px" }}
                        to={{
                          pathname: "./register",
                        }}
                      >
                        <span>Register</span>
                      </Link>
                      <div style={{marginTop:"-26px"}}>
                        <button
                          type="submit"
                          style={{marginLeft:"630px",width:"100px",height:"30px",backgroundColor:"lightblue"}}
                        >
                          Sign in
                        </button>
                      </div>              
                      <hr style={{marginLeft:"41%"}} />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Home;
