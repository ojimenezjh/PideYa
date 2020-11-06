/*import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Group = sequelize.define('groups',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.TEXT
    },
    descripcion: {
        type: Sequelize.TEXT
    },
    imagen: {
        type: Sequelize.TEXT
    }
}, 
{
    tableName: 'groups',
    timestamps: false, // Evita errores con datos de tiempo
    freezeTableName: true
});

Group.schema("public");

export default Group;*/