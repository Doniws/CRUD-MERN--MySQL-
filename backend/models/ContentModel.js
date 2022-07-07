import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Content = db.define('content', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    video: DataTypes.STRING,
    url: DataTypes.STRING
}, {
    freezeTableName: true
});

export default Content;

(async () => {
    await db.sync();
})();