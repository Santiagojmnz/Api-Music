const { response } = require('express');
const User = require('../../Models/user');

const { googleVerify } = require('../../helpers/google-verify');
const { createToken } = require('../../Services/jwt');
//const { createToken } = require('../../Services/jwt');

const googleSignin = async(req, res = response) => {
    
    const {id_token} = req.body;
    if(id_token){
        const {email, name, img} = await googleVerify( id_token );
        
        
        let user = await User.findOne({email});

        if ( !user ) {
            //Se deb de crear
            const data ={
                name,
                email,
                password:'',
                img,
                google: true
            };
            user = new User(data);
            await user.save()
        }
        
        //Generar el token
        const token = await createToken(user.id);
        res.json({
            user,
            token
        });

    }else{
        res.status().send({msg:'todo mal'})
    }
       
  
}

module.exports = {
    googleSignin
}