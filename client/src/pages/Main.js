import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Card, Modal } from "react-bootstrap";
import axios, { Authenticate } from "../axios.js";
import { Link } from "react-router-dom";

const Main = () => {
    const [post, setpost] = useState('');
    const [posting, setposting] = useState([]);
    const [editPost, seteditPost] = useState('');
    const [editID, seteditID] = useState('');
    const [edit, setedit] = useState(false);

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
        axios.post('api/posts', { title: post })
            .then(response => {
                setposting(posting => {
                    posting = [...posting, response.data]
                    return posting;
                });

            })
            .catch(function (error) {
                console.log(error)
            })
    }
    var postings = []
    if (posting) {
        posting.map(el => {
            postings = [...postings, <div key={el._id} className="row mb-3" style={{ borderBottom: '1px solid black' }}>
                <p className="col">{el.title}</p>
                <Button id={el._id} className="col-2 btn btn-primary m-1" onClick={e => deletePost(e.currentTarget.id)}>Delete</Button>
                <Button id={el._id} className="col-2 btn btn-primary m-1" onClick={e => {
                    seteditID(e.currentTarget.id); setedit(true);
                    posting.map(l => {
                        if (l.id == el.id) {
                            seteditPost(l.title)
                        }
                    })
                }}>Edit</Button>
            </div>]
        })
    }


    return (
        <>
            <div  style={{ textAlign: 'right'}} className="mr-4">
                <div  style={{ display:'inline-flex',alignItems:'baseline',flexDirection:'column',width:'fit-content'}}>
                <Link to="/map">Go to ARCGIS map</Link>
                <Link to="/Leafletmap">Go to leaflet map</Link>
                </div>
            </div>
            <div className="container mt-5">
                <Form.Group as={Row}>
                    <Form.Label column sm="2">Post something:</Form.Label>
                    <Col>
                        <Form.Control
                            type="text"
                            onChange={(e) => {
                                setpost(e.target.value);
                            }}
                            style={{ height: '80px' }}
                        />
                    </Col>
                    <Button className="btn btn-primary" column sm="2" onClick={updatePost}>Post</Button>
                </Form.Group>
                <Card style={{ height: '80vh' }} className="p-4">
                    {postings}
                </Card>
                <Link to="/Login">Logout</Link>
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