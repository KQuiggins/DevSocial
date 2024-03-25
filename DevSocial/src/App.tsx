import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import Post from './client/components/Post';
import Chats from './client/components/Chats';

function App() {
  return (
    <Container fluid className="p-0 m-0">
      <Helmet>
        <title>Dev Social 😎</title>
        <meta name="description" content="A social media app for developers." />
      </Helmet>
      <Row noGutters className="flex-nowrap">
        <Col xs={12} md={4} lg={3} className="p-3">
          <Chats />
        </Col>
        <Col xs={12} md={8} lg={9} className="p-3">
          <Post />
          {/* You can add more posts or other components here */}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
