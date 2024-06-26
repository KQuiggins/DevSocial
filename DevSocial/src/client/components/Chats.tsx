import { Container, Row, Image } from 'react-bootstrap';
import { gql, useQuery } from '@apollo/client';

const GET_CHATS = gql`
	{
		chats {
			id
			users {
				id
				avatar
				username
			}
			lastMessage {
				text
			}
		}
	}
`;



const usernamesToString = (users) => {
	if (users.length <= 1) return '';
	const userList = users.slice(1);
	return userList.map((user) => user.username).join(', ');
};

const shorten = (text) => {
	return text.length > 12 ? `${text.substring(0, 9)}...` : text;
};

const Chats = () => {
	const { loading, error, data } = useQuery(GET_CHATS);
	if (loading)
		return (
			<div className='chats'>
				<p>Loading...</p>
			</div>
		);
	if (error)
		return (
			<div className='chats'>
				<p>{error.message}</p>
			</div>
		);
	const { chats } = data;
	return (
		<Container
			fluid
			className='p-0 chats'
			style={{
				height: '50vh', // This line adjusts the height to 50% of the viewport height
				width: '200px',
				backgroundColor: '#eee',
				borderLeft: '1px solid #c3c3c3',
				overflowY: 'scroll', // Add scroll for overflow
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
						<span>{chat?.lastMessage?.text}</span>
					</div>
				</Row>
			))}
		</Container>
	);
};

export default Chats;
