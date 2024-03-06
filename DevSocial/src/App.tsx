import { Helmet } from 'react-helmet';

import './App.css';
import Post from './Post';

// const initialPosts = [
// 	{
// 		id: 2,
// 		text: 'Contract Killer',
// 		user: {
// 			avatar: '/mafia/mafia.jpg',
// 			username: 'Mafia Man',
// 		},
// 	},
// 	{
// 		id: 1,
// 		text: 'Just along for the ride',
// 		user: {
// 			avatar: '/woman/woman.jpg',
// 			username: 'Mafia Woman',
// 		},
// 	},
// ];

function App() {
	

	return (
		<div className='container'>
			<Helmet>
				<title>Dev Social 😎</title>
				<meta
					name='description'
					content='A social media app for developers.'
				/>
			</Helmet>
			<Post />
			
		</div>
	);
}

export default App;
