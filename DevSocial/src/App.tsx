import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const initialPosts = [
	{
		id: 2,
		text: 'Contract Killer',
		user: {
			avatar: '/mafia/mafia.jpg',
			username: 'Mafia Man',
		},
	},
	{
		id: 1,
		text: 'Just along for the ride',
		user: {
			avatar: '/woman/woman.jpg',
			username: 'Mafia Woman',
		},
	},
];

function App() {
	const [post, setPosts] = useState(0);

	return (
		<>
			<Container fluid>
				<Row className='flex flex-row justify-content-center sm={12} md={6} lg={6}'>
					<Col>
					{initialPosts.map((post, i) => (
						<Card className='w-25 m-5 text-center'>
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
		</>
	);
}

export default App;
