let bodyParser = require('body-parser');
const db = require('../db')

let middleware = bodyParser.urlencoded({extended:false});
module.exports = run;




function run(app) {
    
    
    
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
        const {userName, password} = req.body;

        db.query('SELECT * FROM users WHERE userName = ? AND password = ?', [userName, password], (err,results)=>{
            if (err){
                return res.status(500).send("Database ERROR");
            }
            if(results.length === 0){
                res.redirect('/index.html');
                // return res.json({ success:false, message:"login Error"});
            } else {
                const user = results[0];
                req.session.userName = user.userName;
                req.session.role = user.role;

                if(user.role === 'admin') {
                     res.redirect('/admin');
                    // return res.json({ success:true, message:"Admin login successful"});

                } else if(user.role === 'user') {
                    res.redirect('/success');
                }else {
                    return res.status(403).json({ success:false, message:"Access Denied"});
                }
            }
        }); 
    });

    app.get('/admin', (req, res) =>{
        if(!req.session.userName){
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
        
    })
    
    app.get('/success',(req, res)=>{
        if(!req.session.userName){
            return res.redirect('/')
        }
        db.query("SELECT * FROM products",(err, results)=>{
            if(err){
                return res.status(500).send('Database Error');
            }
            res.render('success', {data:results});
        })
       
        
    });
    app.post('/add',middleware, (req, res)=>{
        let {id, name, price } = req.body;
        db.query('INSERT INTO products (id, name, price ) VALUES (?, ?, ?)', [ id, name, price], (err)=>{
        if(err) {
            return res.status(500).send('Database Error');
        } 
            res.redirect('/success');  
        })
        
    });
    
    app.delete('/delete/:id', middleware, (req, res)=>{
        let id = req.params.id;
        db.query('DELETE FROM products WHERE id = ?', [id], (err)=> {
            if (err) {
                return res.status(500).send('Database Error');
            }
            db.query('ALTER TABLE products AUTO_INCREMENT = 1', (err)=>{
                if(err) {
                    return res.status(500).send('Database Error')
                }
                res.redirect('/success');
            })

            
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