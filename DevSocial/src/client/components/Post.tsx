import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';

const GET_POSTS = gql`
{
  posts {
    id
    text
    user {
      avatar
      username
    }
  }
}
`;

const ADD_POST = gql`
mutation addPost($post: PostInput!) {
  addPost(post: $post) {
    id
    text
    user {
      username
      avatar
    }
  }
}
`;

const Post = () => {
  const [addPost] = useMutation(ADD_POST);
  const { loading, error, data } = useQuery(GET_POSTS);
  const [postContent, setPostContent] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { posts } = data;
  console.log(posts);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (postContent.trim()) { // Ensure non-empty submission
      addPost({ variables: { post: { text: postContent } } });
      setPostContent('');
    }
  };

  return (
    <Container fluid>
      <Row className='justify-content-center'>
        <Col sm={12} md={6} lg={6}>
          <Form onSubmit={handleSubmit} className="mb-3">
            <Form.Group>
              <Form.Label>Message</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                value={postContent} 
                onChange={(e) => setPostContent(e.target.value)} 
                placeholder="Write your message here..." 
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {posts.map((post) => (
            <Card key={post.id} className='w-100 m-5 text-center'>
              <Card.Img variant='top' src={post.user.avatar} />
              <Card.Body>
                <Card.Title>{post.user.username}</Card.Title>
                <Card.Text>{post.text}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Post;
