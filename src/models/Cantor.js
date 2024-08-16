module.exports = (sequelize, Sequelize) => {
	const Cantor = sequelize.define('cantor', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		nome: {
			allowNull: false,
			type: Sequelize.STRING,
		},
        descricao: {
			allowNull: false,
			type: Sequelize.STRING,
		},
	});
	return Cantor;
};
