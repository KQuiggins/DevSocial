import { Card, Container, Row, Col } from 'react-bootstrap';
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
		addPost({ variables: { post: { text: postContent } } });
		setPostContent('');
	};

	return (
		<Container fluid>
			<Row className='flex flex-row justify-content-center sm={12} md={6} lg={6}'>
				<Col>
					{posts.map((post) => (
						<Card key={post.id} className='w-25 m-5 text-center'>
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
