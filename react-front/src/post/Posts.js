import React, { Component } from 'react';
import { list } from "./apiPost";
import DefaultPost from '../images/beer.jpg';
import { Link } from 'react-router-dom';

class Posts extends Component {
    constructor() {
        super()
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data })
            }
        })
    }

    renderPosts = (posts) => {
        return (
            <div className="row">{
                posts.map((post, i) => {
                    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : " "
                    const posterName = post.postedBy ? post.postedBy.name : " Unknown"

                    return (
                     
                        <div className="col-lg-4 mb-4" key={i}>
                            <div className="card h-100 border-0 shadow">
                                <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} alt={post.title} onError={i => i.target.src = `${DefaultPost}`} className="img-thunbnail mb-3" style={{ height: '200px', width: '100%' }}></img>
                                <div className="card-body">
                                    <h4 className="card-title" />
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">{post.body.substring(0, 100)}</p>
                                    <p className="font-italic mark" >
                                        Posted by <Link to={`${posterId}`}>{posterName}{" "}</Link>
                                        on {new Date(post.created).toDateString()}
                                    </p>
                                    <Link to={`/post/${post._id}`} className="btn btn-raised btn-sm" style={{background:'#F28D1B', color:"white"}}>
                                        Read more
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        const { posts } = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5" style={{ color: '#272e3c' }}>{!posts.length ? 'Loading...' : "Recent posts"}</h2>
                {this.renderPosts(posts)}
            </div>
        );
    }
}

export default Posts