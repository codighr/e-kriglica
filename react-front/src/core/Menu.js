import React from 'react';
import { Link, withRouter } from "react-router-dom/cjs/react-router-dom";
import { signout, isAuthenticated } from '../auth';
import DefaultPost from '../images/kriglica.png';

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#17141e" }
    else return { color: "#ffffff" }
}

const Menu = ({ history }) => (
    <nav className="navbar navbar-expand-lg navbar-dark  static-top" style={{background:'#f28e1c'}}>
        <div className="container">
            <a className="navbar-brand" href="#">
                <img src={`${DefaultPost}`} style={{
                    height: '50px',
                    width: '100%',
                    objectFit: 'cover'
                }} />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/users")} to="/users">Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to={`/post/create`}
                            style={isActive(history, `/post/create`)}
                            className="nav-link"
                        >
                            Create Post
                         </Link>
                    </li>
                    {!isAuthenticated() && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">Sign in</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">Sign up</Link>
                            </li>
                        </>
                    )}
                    {isAuthenticated() && (
                        <>

                            <li className="nav-item">
                                <Link
                                    to={`/findpeople`}
                                    style={isActive(history, `/findpeople`)}
                                    className="nav-link"
                                >
                                    Find People
                        </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    to={`/user/${isAuthenticated().user._id}`}
                                    style={isActive(history, `/user/${isAuthenticated().user._id}`)}
                                    className="nav-link"
                                >
                                    {`${isAuthenticated().user.name}'s profile`}
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    style={{ cursor: 'pointer', color: '#fff' }}
                                    onClick={() => signout(() => history.push('/'))}
                                >Sign out
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    </nav>









    // <div>      
    //     <ul className="nav nav-tabs bg-primary ml-auto">
    //         <li className="nav-item">
    //             <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
    //         </li>

    //         <li className="nav-item">
    //             <Link className="nav-link" style={isActive(history, "/users")} to="/users">Users</Link>
    //         </li>
    //         <li className="nav-item">
    //                 <Link
    //                         to={`/post/create`}
    //                         style={isActive(history, `/post/create`)}
    //                         className="nav-link"
    //                     >
    //                         Create Post
    //                     </Link>
    //                 </li>
    //         {!isAuthenticated() && (
    //             <>
    //                 <li className="nav-item">
    //                     <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">Sign in</Link>
    //                 </li>
    //                 <li className="nav-item">
    //                     <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">Sign up</Link>
    //                 </li>
    //             </>
    //         )}
    //         {isAuthenticated() && (
    //             <>

    //                 <li className="nav-item">
    //                 <Link
    //                         to={`/findpeople`}
    //                         style={isActive(history, `/findpeople`)}
    //                         className="nav-link"
    //                     >
    //                         Find People
    //                     </Link>
    //                 </li>

    //                 <li className="nav-item">
    //                 <Link
    //                         to={`/user/${isAuthenticated().user._id}`}
    //                         style={isActive(history, `/user/${isAuthenticated().user._id}`)}
    //                         className="nav-link"
    //                     >
    //                         {`${isAuthenticated().user.name}'s profile`}
    //                     </Link>
    //                 </li>

    //                 <li className="nav-item">
    //                     <span
    //                         className="nav-link"
    //                         style={{ cursor: 'pointer', color: '#fff' }}
    //                         onClick={() => signout(() => history.push('/'))}
    //                     >
    //                         Sign Out
    //                     </span>
    //                 </li>
    //             </>
    //         )}
    //     </ul>
    // </div>
)

export default withRouter(Menu);

