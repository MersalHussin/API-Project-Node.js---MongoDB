    import jwt from 'jsonwebtoken'

    const token = (payload)=>{
            return jwt.sign(payload, 
                process.env.JWT_SECRET_KEY,
                 {expiresIn:'1m'})
        }

        export{
            token as generateJWT
        }