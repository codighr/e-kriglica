import React, { Component } from 'react';
import { list } from "./apiUser";
import DefaultProfile from '../images/avatar.jpg';
import { Link } from 'react-router-dom';

class Users extends Component {
    constructor() {
        super()
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data })
            }
        })
    }

    renderUsers = (users) => (
        <div className="row">{
            users.map((user, i) => (
                <div className="card col-md-4 mt-1 mb-1 mr-0,5 ml-0,5"  key={i}>
                    <img style={{height: "200px", width: 'auto'}} className="img-thumbnail rounded-circle rounded mx-auto d-block mt-3" src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} onError={i => (i.target.src = `${DefaultProfile}`)} alt={user.name}/>

                    <div className="card-body text-center">
                        <h5 className="card-title text-center">{user.name}</h5>
                        <p className="card-text text-center">{user.email}</p>
                        <Link 
                            to={`/user/${user._id}`}
                            className="btn btn-outline btn-success btn-sm center"
                        >
                            View Profile
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )

    render() {
        const { users } = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Users</h2>
                {this.renderUsers(users)}
            </div>
        );
    }
}

export default Users