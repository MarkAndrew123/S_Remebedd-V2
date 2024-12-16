require('dotenv').config();
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME || 'user_superset', process.env.DB_USER || 'root', process.env.DB_PASS ||'2003',{
    host: process.env.DB_HOST,
    dialect: 'mysql',

})

const dbConnection = async () => {
    try{
        await sequelize.authenticate();
        console.log("database connected ")  
}  catch (error) {
    console.error("unable to connect", error, error.message)
}

}
module.exports = {sequelize , dbConnection}
