import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row, ListGroup} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

const User = props => {
  const {user} = props;
  return (
    <ListGroup.Item key={user.uid}  style={{display: 'flex', justifyContent: 'space-between'}}>
      <div className="container-fluid" style={{marginRight: 10}}>
        <Row style={{justifyContent: 'space-between', flexDirection: 'column'}}>
          <h5>{user.displayName}</h5>
          <NavLink to={`/perfil/${user.uid}`}>{`@${user.userName}`}</NavLink>
        </Row>
        <Row>
          <Col md={12}>
            <h3>{user.content}</h3>
          </Col>
        </Row>
      </div>
      <div>
        <img className="profile-photo" src={user.photoURL} alt="Foto do usuario" />
      </div>
    </ListGroup.Item>

  );
};

User.propTypes = {
  user: PropTypes.object.isRequired
};

export default User;
