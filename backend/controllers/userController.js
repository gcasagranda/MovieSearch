const User = require('../schemas/userSchema');

module.exports = {
    async postLogin(req, res){
        const username = req.body.username;
        const password = req.body.password;
        const dbUser = await User.findOne({username});
        if(!dbUser){
            res.status(400).json({message: 'Usuário não encontrado'});
        } else if (password === dbUser.password){
            req.session.username = dbUser.username;
            req.session.idUser = dbUser._id;
            req.session.save((err) => {
                if (err) {
                  console.error('Erro ao salvar a sessão:', err);
                  res.status(500).json({ message: 'Erro ao salvar a sessão' });
                } else {
                  console.log(req.session.idUser); // Deve mostrar o id corretamente
                  console.log('Login bem-sucedido');
                  res.status(200).json({ message: 'Login bem-sucedido', idUser: req.session.idUser});
                }
              });
        } else {
        res.status(401).json({message:'Senha incorreta'});
        }
    },
    async postLogout(req,res){
        req.session.destroy();
        console.log("Logout bem-sucedido");
        res.status(200).json({message: 'Logout bem-sucedido'});
    },
    async postSignup(req, res){
        new User({
            username: req.body.username,
            password: req.body.password
        }).save().then(() => {
            console.log('Usuário cadastrado com sucesso');
            res.status(200).json({ message: 'Usuário cadastrado com sucesso!' });
        }).catch((err) => {
            console.log('Erro ao cadastrar usuário: usuário já existente ' + err);
            res.status(400).json({ message: 'Erro: usuário já existente!' });
        });
    }
}