const { Pool } = require('pg');

const pool = new Pool({
    host : 'localhost',
    user : 'postgres',
    password : 'kirara@123',
    database : 'dasboard',
    port : '5432'
});

const getUsers = async(req , res) => {
    const response = await pool.query('SELECT * FROM users');
    res.status(200).json(response.rows);
}

const getUserById = async (req, res) => {
    const id = req.params.id;
    //res.send('User id '+ req.params.id)
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(response.rows);
};

const createUser = async (req, res) => {
    const { name, email } = req.body;

    const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
    console.log(response);
    res.json({
        message : 'Sukses menambah user',
        body: {
            user: {name, email}            
        }
    })
}

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const {
        name,
        email
    } = req.body;

    const response = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        name,
        email,
        id
    ]);
    res.json('User Updated Successfully');
};

const deleteUser = async (req, res) => {
  const id =req.params.id;
  //res.send('User id '+ req.params.id)
  const response = await pool.query('DELETE FROM users WHERE id = $1', [id]);
  console.log(response)
  res.json(`User ${id} deleted Successfully`);
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}
