'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					avatar: '/uploads/mafia.jpg',
					username: 'TestUser',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					avatar: '/uploads/woman.jpg',
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
