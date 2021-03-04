import dotenv from 'dotenv';
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, './../.env')
})

const { USER } = process.env;
const { HOST } = process.env;
const { DATABASE } = process.env;
const { PASSWORD } = process.env;
const { PORT } = process.env || 3333;

module.exports = {
  USER, HOST, PASSWORD, DATABASE, PORT
};


