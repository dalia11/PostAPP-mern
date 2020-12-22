import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Card, Modal } from "react-bootstrap";
import axios, { Authenticate } from "../axios.js";
import { Link } from "react-router-dom";
import Header from '../components/Header.js'

const Main = () => {
    const [post, setpost] = useState('');
    const [posting, setposting] = useState([]);
    const [editPost, seteditPost] = useState('');
    const [editID, seteditID] = useState('');
    const [edit, setedit] = useState(false);
    const [error, seterror] = useState("");

    useEffect(() => {

        let data = Authenticate();
        if (data) {
            getPost();
        }
    }, []);
    const getPost = () => {
        axios.get('api/posts')
            .then(response => {
                setposting(posting => {
                    posting = response.data
                    return posting;
                });

            })
            .catch(function (error) {
                console.log(error)
            })

    }
    const deletePost = (id) => {
        axios.delete('api/posts/' + id)
            .then(response => {
                setposting(posting => {
                    posting = [...response.data]
                    return posting;
                });
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    const editPosts = () => {
        axios.put('api/posts/' + editID, { id: editID, title: editPost })
            .then(response => {
                setposting(posting => {
                    posting = [...response.data]
                    return posting;
                });
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    const updatePost = () => {
        setpost("")
        axios.post('api/posts', { title: post })
            .then(response => {
                setposting(posting => {
                    posting = [...posting, response.data]
                    return posting;
                });

            })
            .catch(function (error) {
                console.log(error)
                seterror(error.response.data.msg)
            })
    }
    var postings = []
    if (posting) {
        posting.map(el => {
            postings = [...postings, <div key={el._id} className="row mb-3" style={{ borderBottom: '1px solid black' }}>
                <p className="col">{el.title}</p>
                <Button id={el._id} className="col-2 btn btn-primary m-1" onClick={e => deletePost(e.currentTarget.id)}>Delete</Button>
                <Button id={el._id} className="col-2 btn btn-primary m-1" onClick={e => {
                    seteditID(e.currentTarget.id); setedit(true); seteditPost(el.title)
                }}>Edit</Button>
            </div>]
        })
    }

    return (
        <>
            <Header />
            <div className="container mt-5">
                <Form.Group as={Col}>
                    <Form.Label column >What's on your mind?</Form.Label>

                    <Form.Control
                        placeholder="Write Something..."
                        type="text"
                        onChange={(e) => {
                            seterror("")
                            setpost(e.target.value);
                        }}
                        value={post}
                        style={{ height: '80px' }}
                    />
                    <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>
                    <Button className="btn btn-primary mt-2" onClick={updatePost}>Post</Button>
                </Form.Group>
                <Card style={{ height: '60vh', overflow: 'scroll' }} className="p-4">
                    {postings}
                </Card>
                <Modal show={edit} onHide={() => setedit(false)}>
                    <Modal.Header>Edit Post</Modal.Header>
                    <Modal.Body><Form.Control type="text" value={editPost} onChange={e => { seteditPost(e.target.value) }} /></Modal.Body>
                    <Modal.Footer><button className="btn btn-primary" onClick={() => { editPosts(); setedit(false) }}>Edit</button></Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default Main;