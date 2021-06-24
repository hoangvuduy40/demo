import './App.css';
import React, { useState } from 'react';
import { Container, Row, Col, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import json from './data.json'  

function App() {
  const [modal, setModal] = useState(false);

  const [data, setData] = useState(json.data);
  const [user, setUser] = useState(json.user);
  const [edit, setEdit] = useState([]);
  const [pro, setPro] = useState("");

  const toggle = (ev, index,i) => {
    const value = data[index].comment[i];
  
    setEdit({
     ...edit,
     id : index,
     i_d: i,
     content  : value.content
    });
    console.log(edit.id)
    setModal(!modal)
  }
  const onclose =() => {
    setModal(!modal)
  }
  
  const onLikeComment = (ev, i, index) => {
    data[index].comment[i].status = !data[index].comment[i].status
    setData([
      ...data
    ]);
  };
  const changeInp = (ev, index) => {
    data[index].text = ev.target.value
    setData([
      ...data
    ])
  }
  const btnSubmit = (ev, index) => {
    const obj = {
      author: user.name,
      content: data[index].text
    }
    data[index].comment.push(obj);
    data[index].text = "";
    setData([...data]);
    setUser(user);
  }
 const changeEdit =(ev) =>{
      const pro = ev.target.value;
      console.log(pro)
      setPro([...pro])
 }
 const onHandleSubmit = (ev) =>{
    const {id,i_d} = edit;
    const arr = data[id].comment[i_d].content;
    if(arr === pro){
      console.log("aaaaa");
    }else{
      data[id].comment[i_d].content = pro;
    }
    setData([...data
    ])  
    setModal(!modal)
 }
  let item = data.map((data, index) => {
    return (
      <Row key={index} style={{ padding: '20px' }}>
        <Col xs='2'></Col>
        <Col className="box-shadow" xs='6'>
          <div>
            <h3 style={{ 'color': '#1e8c97', 'textAlign': 'left', 'paddingLeft': '30px' }}> {data.author} </h3>
          </div>
          <p> {data.content} </p>
        </Col>

        <Row>
          {
            data.comment.map((comment, i) => {
              return (

                <Col key={i} xs={{ size: '6', offset: '2' }} className="comment">
                  <div className="comment">
                    <div className="user">
                      {comment.author}
                    </div>
                    <div className="content">
                      {comment.content}
                    </div>
                    <span className="material-icons" style={{ fontSize: "50px", color: comment.status ? 'blue' : null, 'cursor': 'pointer' }} onClick={ev => onLikeComment(ev, i, index)}>thumb_up</span>
                    <span style={{ padding: "10px" }} className="material-icons" onClick={(e) => toggle(e, index,i)}>edit</span>
                  </div>
                </Col>

              )
            })
          }
        </Row>
        <Row>
          <Col xs={{ 'size': '6', 'offset': '2' }} style={{ 'display': 'flex', 'paddingTop': '20px' }}>
            <Input placeholder="My comment..." type="text" value={data.text} onChange={ev => changeInp(ev, index)} />
            <Button onClick={ev => btnSubmit(ev, index)}>Comment</Button>
          </Col>
        </Row>
      </Row>
    )
  })
  return (
    <div>
      <Container>
        {item}
      </Container>
      <div>

        <Modal isOpen={modal}>
          <ModalHeader toggle={onclose}>Modal title</ModalHeader>
          <ModalBody>
            <Input type="text" placeholder={edit.content} value={edit.text} onChange={ev => changeEdit(ev)} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={ev => onHandleSubmit(ev)}>Update</Button>{' '}
            <Button color="secondary" >Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default App;
