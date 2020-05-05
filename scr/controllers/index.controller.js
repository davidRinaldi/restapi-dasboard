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
    var data = {
        'status': 200,
        'success': 'true',
        'message': 'users',
        'data': response.rows
    };
    res.json(data);
    res.end();
}

const getUserById = async (req, res) => {

    const id = req.params.id;
    //res.send('User id '+ req.params.id)
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(response.rows);
};

const createUser = async (req, res) => {
    const {
        nip,
        name,
        pass,
        instansi,
        email
    } = req.body;

    const response = await pool.query('INSERT INTO users (nip, name, pass, instansi, email) VALUES ($1, $2, $3, $4, $5)', [nip, name, pass, instansi, email]);
    console.log(response);
    res.json({
        message : 'Sukses menambah user',
        body: {
            user: {
                nip,
                name,
                pass,
                instansi,
                email
            }
        }
    })
}

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const {
        nip, name, pass, instansi, email
    } = req.body;

    const response = await pool.query('UPDATE users SET nip = $1, name = $2, pass = $3, instansi = $4, email = $5 WHERE id = $6', [
        nip, name, pass, instansi, email,id
    ]);
    res.json('User Updated Successfully');
};

const deleteUser = async (req, res) => {
  const id =req.params.id;
  //res.send('User id '+ req.params.id)
  const response = await pool.query('DELETE FROM users WHERE id = $1', [id]);
  console.log(response)
  res.json(`User ID ${id} deleted Successfully`);
}

const loginUser = async (req, res) => {
    const {
        email,
        pass,
    } = req.body;

    const response = await pool.query('SELECT * FROM users WHERE email = $1 AND pass = MD5($2)',[email,pass]);
    if (response.rowCount == 1) {
        //request.session.loggedin = true;
        //request.session.email = email;
        //response.redirect('/home');
        console.log(response);
        var data = {
            'status': 200,
            'success': 'true',
            'message': 'login successfully',
            'data': response.rows
            };
            res.json(data);
            res.end();
    } else {
        //response.send('')
        console.log(response);
        var data = {
            'status': 400,
            'success': 'false',
            'message': 'login username or password wrong',
            'data': response.rows
        };
        res.json(data);
        res.end();
    }   
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser
}
