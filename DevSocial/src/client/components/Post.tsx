import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import '../../index.css';

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
  const { loading, error, data } = useQuery(GET_POSTS);
  const [postContent, setPostContent] = useState('');

  const [addPost] = useMutation(ADD_POST, {
    optimisticResponse: {
      __typename: 'mutation',
      addPost: {
        __typename: 'Post',
        text: postContent,
        id: -1, // Assuming negative IDs are used for optimistic updates
        user: {
          __typename: 'User',
          username: 'Loading...',
          avatar: '/public/loading.gif',
        },
      },
    },
    update(cache, { data: { addPost } }) {
      cache.modify({
        fields: {
          posts(existingPosts = []) {
            const newPostRef = cache.writeFragment({
              data: addPost,
              fragment: gql`
                fragment NewPost on Post {
                  id
                  text
                }
              `,
            });
            return [newPostRef, ...existingPosts];
          },
        },
      });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (postContent.trim()) {
      addPost({ variables: { post: { text: postContent } } });
      setPostContent('');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // Destructure posts after checking loading and error states
  const { posts } = data;

  return (
    <Container fluid>
      <Row className='justify-content-center'>
        <Col sm={12} md={6} lg={6}>
          <Form onSubmit={handleSubmit} className='mb-3'>
            <Form.Group>
              <Form.Label>Message</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder='Write your message here...'
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
          {posts && posts.map((post) => (
            <Card key={post.id} className={`w-100 m-5 text-center ${post.id < 0 ? 'optimistic' : ''}`}>
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
