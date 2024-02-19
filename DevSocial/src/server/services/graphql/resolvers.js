import logger from '../../helpers/logger.js';


export default function resolver() {
	const { db } = this;
	console.log(this);
	const { Post, User } = db.models;
	console.log(Post);

	const resolvers = {
		Post: {
			user(post, args, context) {
				return post.getUser();
			},
		},
		RootQuery: {
			posts(root, args, context) {
				return Post.findAll({ order: [['createdAt', 'DESC']] });
			},
		},
		RootMutation: {
			addPost(root, { post }, context) {
				return User.findAll().then((users) => {
					const usersRow = users[0];
					return Post.create({
						...post,
					}).then((newPost) => {
						return Promise.all([newPost.setUser(usersRow.id)]).then(
							() => {
								logger.log({
									level: 'info',
									message: 'Post was created',
								});
								return newPost;
							},
						);
					});
				});
			},
		},
	};
	return resolvers;
}
