import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const initialPosts = [
	{
		id: 2,
		text: 'Lorem ipsum',
		user: {
			avatar: '/mafia/mafia.jpg',
			username: 'Test User',
		},
	},
	{
		id: 1,
		text: 'Lorem ipsum',
		user: {
			avatar: '/woman/woman.jpg',
			username: 'Test User 2',
		},
	},
];

function App() {
	const [post, setPosts] = useState(0);

	return (
		<>
			<div className='container '>
				<div className='feed'>
					{initialPosts.map((post, i) => (
						<Card style={{ width: '18rem' }}>
							<Card.Img variant='top' src={post.user.avatar} />
							<Card.Body>
								<Card.Title>{post.user.username}</Card.Title>
								<Card.Text>{post.text}</Card.Text>
							</Card.Body>
						</Card>
					))}
				</div>
			</div>
		</>
	);
}

export default App;
