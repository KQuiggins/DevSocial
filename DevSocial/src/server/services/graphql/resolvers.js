import logger from "../../helpers/logger.js";

let posts = [
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


export default function resolver() {
    const { db } = this;
    console.log(this);
    const { Post } = db.models;
    console.log(Post);

    const resolvers = {
        RootQuery: {
            posts(root, args, context) {
                return Post.findAll({order: [['createdAt', 'DESC']]});
            }
        },
        RootMutation: {
            addPost(root, { post, user }, context) {
                const postObject = {
                    ...post,
                    user,
                    id: posts.length + 1
                };
                posts.push(postObject);
                logger.log({ level: 'info', message: 'Post added', post: postObject})
                return postObject;
            },
        }
    };
    return resolvers;
}

