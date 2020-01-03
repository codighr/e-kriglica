import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate } from '../auth';
import SocialLogin from "./SocialLogin";

class Signin extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToRefere: false,
            loading: false
        }
    }

    handleChange = (name) => (event) => {
        this.setState({ error: "" })
        this.setState({ [name]: event.target.value });
    };


    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const { email, password } = this.state
        const user = {
            email,
            password
        };
        //console.log(user);
        signin(user)
            .then(data => {
                if (data.error) {
                    this.setState({ error: data.error, loading: false })
                } else {
                    // authenticate
                    authenticate(data, () => {
                        this.setState({ redirectToRefere: true })
                    })
                }
            });
    };



    signinForm = (email, password) => (
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Sign In</h5>
        <form className="form-signin">
            <div className="form-label-group">
                <label className="text-muted">Email</label>
                <input onChange={this.handleChange("email")} type="email" className="form-control" value={email}></input>
            </div>
            <div className="form-label-group">
                <label className="text-muted">Password</label>
                <input onChange={this.handleChange("password")} type="password" className="form-control" value={password}></input>
            </div>
            <button onClick={this.clickSubmit} class="btn btn-lg btn-primary btn-block text-uppercase">Submit</button>
            <Link
                        to="/forgot-password"
                        className="btn btn-lg btn-danger btn-block text-uppercase"
                    >
                        {" "}
                        Forgot Password
                    </Link>
        </form>
        </div>
        </div>
        </div>
    );

    render() {
        const { email, password, error, redirectToRefere, loading } = this.state

        if (redirectToRefere) {
            return <Redirect to="/" />
        }

        return (
            <div className="container">
            <br/>
                {/* <hr />
                <SocialLogin />

                <hr />
                <br /> */}
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                        ""
                    )}

                {this.signinForm(email, password)}
                
            </div>
        );
    }
}

export default Signin;