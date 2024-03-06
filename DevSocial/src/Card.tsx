import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Card = () => {
	return (
		<Container fluid>
			<Row className='flex flex-row justify-content-center sm={12} md={6} lg={6}'>
				<Col>
					{initialPosts.map((post) => (
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

export default Card;
