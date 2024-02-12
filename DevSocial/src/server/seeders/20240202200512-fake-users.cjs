'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					avatar: '/mafia/mafia.jpg',
					username: 'TestUser',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					avatar: '/woman/woman.jpg',
					username: 'TestUser2',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},
	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	},
};
