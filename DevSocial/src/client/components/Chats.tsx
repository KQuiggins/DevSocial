import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';

const chats = [
	{
		id: 2,
		users: [
			{
				avatar: '/uploads/mafia.jpg',
				username: 'TestUser',
				id: 3,
			},
			{
				avatar: '/uploads/woman.jpg',
				username: 'TestUser2',
				id: 4,
			},
		],
	},
];

const usernamesToString = (users) => {
	if (users.length <= 1) return '';
	const userList = users.slice(1);
	return userList.map((user) => user.username).join(', ');
};

const shorten = (text) => {
	return text.length > 12 ? `${text.substring(0, 9)}...` : text;
};

const Chats = () => {
	return (
		<Container
      fluid
      className='p-0 chats'
      style={{
        height: '50vh', // This line adjusts the height to 50% of the viewport height
        width: '200px',
        backgroundColor: '#eee',
        borderLeft: '1px solid #c3c3c3',
        overflowY: 'scroll' // Add scroll for overflow
      }}
    >
      {chats.map((chat) => (
        <Row
          key={chat.id}
          className='chat'
          noGutters
          style={{ cursor: 'pointer' }}
        >
          <Image
            src={
              chat.users.length > 2
                ? '/public/group.png'
                : chat.users[1].avatar
            }
            roundedCircle
            style={{ width: '50px', margin: '5px' }}
          />
          <div style={{ marginLeft: '5px' }}>
            <h2>{shorten(usernamesToString(chat.users))}</h2>
          </div>
        </Row>
      ))}
    </Container>
	);
};

export default Chats;
