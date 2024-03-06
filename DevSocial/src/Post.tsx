import { Card, Container } from 'react-bootstrap';
import { gql, useQuery, useMutation } from '@apollo/client';

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

const Post = () => {
	const { loading, error, data } = useQuery(GET_POSTS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const { posts } = data;
	console.log(posts);

	return (
		<Container>
			{posts.map((post, i) => (
				<Card key={post.id} className='mb-3'>
					<Card.Header>
						<Card.Img
							variant='left'
							// src={}
							style={{
								width: '50px',
								height: '50px',
								borderRadius: '50%',
							}}
						/>
						{/* {post.user.username} */}
					</Card.Header>
					<Card.Body>
						<Card.Text>{post.text}</Card.Text>
					</Card.Body>
				</Card>
			))}
		</Container>
	);
};

export default Post;
