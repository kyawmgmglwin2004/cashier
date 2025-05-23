let bodyParser = require('body-parser');
const db = require('../db')

let middleware = bodyParser.urlencoded({extended:false});
module.exports = run;




function run(app) {
    
    function isAuthenticated(req, res, next) {
        if (req.session && req.session.email  && !req.session.suspended) {
            next();
        } else {
            res.redirect('/index.html');
        }
    }
    
    
    app.get('/', (req, res)=>{
        res.sendFile(__dirname + '/index.html')
    });
    app.post('/registerData', middleware, (req, res)=>{
        const {userName, password, email} = req.body;
        db.query('INSERT INTO users (userName, password, email) VALUES (? ,  ?, ?)', [userName, password, email],
            (err, results)=>{
                if (err) {
                    return res.status(500).send("Database ERROR");
                }
               console.log("User Registered Successfully");
               res.redirect('/index.html')
            }
        )
    });

    
    
    app.post('/login', middleware, (req, res)=>{
        const {email, password} = req.body;

        db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err,results)=>{
            if (err){
                return res.status(500).send("Database ERROR");
            }
          
             if(results.length === 0){
                res.redirect('/index.html');
                // return res.json({ success:false, message:"login Error"});
            } else {
                const user = results[0];
                req.session.email = user.email;
                req.session.role = user.role;
                req.session.suspended = user.suspended;
                
                if(user.suspended) {
                    return res.redirect("/index.html");
                    
                }else {
                    if(user.role === 'admin') {
                    
                     res.redirect('/admin');
                    // return res.json({ success:true, message:"Admin login successful"});

                } else if(user.role === 'user') {
                    res.redirect('/success');
                }else {
                    return res.status(403).json({ success:false, message:"Access Denied"});
                }
                }

                
            }
           
        }); 
    });

    app.get('/admin',isAuthenticated, (req, res) =>{
        if(req.session.role !== 'admin'){
            return res.redirect('/');
        }
        db.query('SELECT * FROM users', (err, usersResults) =>{
            if(err){
                return res.status(500).send('Database Error');
            }
            db.query('SELECT * FROM products', (err, productsResults) =>{
                if(err){
                    return res.status(500).send('Database Error');
                }
                res.render('admin', {users: usersResults, products: productsResults});
            });
        });
        
    });

    app.get('/logout', (req, res)=>{
        req.session.destroy(err=>{
            if(err){
                return res.status(500).send("Logout Fail")
            }
            res.redirect('/index.html');
        });
    } );

    app.delete('/deleteUser/:id', middleware, (req, res)=>{
        let id = req.params.id;
        db.query("DELETE FROM users WHERE id = ?", [id],
            (err)=>{
                if(err) {
                    return res.status(500).send("Database ERROR");
                }
                db.query("TRUNCATE  TABLE users AUTO_INCREMENT = 1 ", (err)=>{
                    if(err){
                        return res.status(500).send("Database ERROR")
                    }
                    res.redirect('/admin')
                })
            }
        )
    })

    app.post('/suspend/:id', middleware, (req, res)=>{
        let id = req.params.id;
        db.query("UPDATE users SET suspended = 1 WHERE id = ?", [id],
            (err)=>{
                return res.status(500).send('Database ERROR');
            }
        )
    });

    app.post('/unsuspend/:id', middleware, (req, res)=>{
        let id = req.params.id;
        db.query("UPDATE users SET suspended = 0 WHERE id = ?", [id],
            (err)=>{
                return res.status(500).send("Database ERROR");
            }
        )
    });
    
    app.get('/success',(req, res)=>{
        if(!req.session.email){
            return res.redirect('/')
        }
        db.query("SELECT * FROM products",(err, results)=>{
            if(err){
                return res.status(500).send('Database Error');
            }
            res.render('user-view', {data:results});
        })
       
        
    });

    app.get('/profile', isAuthenticated, (req, res)=>{
        if(!res.session.email) {
            return res.redirect('/')
        }
        
    });

    app.post('/add',middleware, (req, res)=>{
        let {id, name, price, stock } = req.body;
        db.query('INSERT INTO products (id, name, price, stock ) VALUES (?, ?, ?, ?)', [ id, name, price, stock], (err)=>{
        if(err) {
            return res.status(500).send('Database Error');
        } 
            res.redirect('/success');  
        })
        
    });
    
    app.delete('/deleteItem/:id', middleware, (req, res)=>{
        let id = req.params.id;
        db.query('DELETE FROM products WHERE id = ?', [id], (err)=> {
            
                return res.status(500).send('Database Error');
             })

    })

    app.post('/voucher-data', (req, res)=>{
        voucherData = req.body;
        // res.json({success:true});
        // res.render('voucher', {voucherData});
        res.redirect('/voucher')
    });
   
    app.get('/voucher', (req, res)=>{
        res.render('voucher', {voucherData});
    })

}