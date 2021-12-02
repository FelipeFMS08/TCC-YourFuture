const express = require('express');
const app = express();
const consign = require('consign');
consign().include('database').into(app)
const session = require('express-session');
const multer= require('multer');

var questionsFunction = require('./questions.js');
var academico = require('./utils/academico-arrays/academico.js')
var carreira = require('./utils/carreira-arrays/carreira.js')

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use('/js', express.static(__dirname + 'public/assets/js'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'yourfuture_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000000 }
}));

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'public/assets/uploads/')
    },
    filename:(req,file,cb) => {
		cb(null, file.originalname);
	}
});


const upload =multer({ storage });

app.get('/', function(req, res) {
    let sess = req.session

    if (sess.logado == 1) {
        res.render('index.ejs', {'logado': sess.logado});
    } else {
        res.render('index.ejs');
    }

});

app.get('/academico', function(req, res) {
    res.render('academico.ejs', { 'vestibulares': academico.vestibulares, 'phrases': academico.frases });
})

app.get('/myprofile', function(req, res) {
    let session = req.session
    let connection = app.database.connection()
    let databaseUser = new app.database.databaseUser(connection)
    databaseUser.searchUser(session.idUser, function(error, sucess) {
        var userInformations = sucess
        console.log(userInformations)

        res.render('myprofile.ejs', {'userInformations': userInformations});
    })
    

    
})

app.get('/carreira', function(req, res) {
    res.render('carreira.ejs', { 'carreiras': carreira.carreiras, 'phrases': carreira.frases});
})

app.get('/result', function(req, res) {
    res.render('resulttest.ejs');

});

app.post('/academico-saiba-mais/:id', function (req, res) {
    var id = req.params.id;
    const array = academico.vestibulares.filter(element => {
        if (element.id == id) {
            return element
        }
    });

    res.render('saibamais.ejs', {'more': array})
   
});

app.post('/carreira-saiba-mais/:id', function (req, res) {
    var id = req.params.id;
    const array = carreira.carreiras.filter(element => {
        if (element.id == id) {
            return element
        }
    });

    res.render('saibamais.ejs', {'more': array})
   
});

app.get('/register', function(req, res) {
    res.render('cadastro-login/register.ejs');
});

app.get('/login', function(req, res) {
    res.render('cadastro-login/login.ejs');
});

app.post('/form', function(req, res) {

    const dados = req.body;
    let pergunta = dados.pergunta;
    let resposta = dados.resposta;
    questionsFunction.respostas.push(resposta);

    if (pergunta == (questionsFunction.questions.length - 1)) {
        var resultadosCont = questionsFunction.contarRespostas(questionsFunction.respostas);
        res.render('resulttest.ejs', {'results': resultadosCont});
    } else {
        pergunta++; 
        res.render('teste-forms.ejs', { 'questions': questionsFunction.questions, 'pergunta': pergunta });
    }
})

let registerData = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    imageprofile: ''
};

app.post('/register', function(req, res) {
    var data = req.body;
    registerData = {
        email: data.email,
        password: data.password,
        firstname: '',
        lastname: '',
        imageprofile: ''
    };
    console.log(registerData)

    res.render('cadastro-login/yourname.ejs');
});

app.post('/complete-register', upload.single('profile'), (req, res) => {
    let data = req.body;
    let connection = app.database.connection()
    let databaseUser = new app.database.databaseUser(connection)

    registerData = {
        email: registerData.email,
        password: registerData.password,
        firstname: data.firstname,
        lastname: data.lastname,
        imageprofile: '/assets/img/academico/Vetor-Woman-Run.png'
    };

    console.log(registerData)

    databaseUser.searchAll(function(error, result) {
        if (!error) {
            if (!result.filter(x => x.email == data.email).length > 0) {
                databaseUser.createUser(registerData, (error) => {
                    if (error) {
                        console.log(error)
                    }
                })
            }
        } else {
            console.log(error)
        }
    })
    res.redirect('/')
})


app.post('/logged',function(req,res){
    var sess = req.session;
    var data = req.body;
    var connection = app.database.connection();
    var databaseUser = new app.database.databaseUser(connection);
    databaseUser.verifyEmail(data,function(error,success){
      if(success.length){
          databaseUser.verifyEmailAndPassword(data, function(error, sucess) {
            if (sucess.length) {
                sess.logado = 1;
                sess.idUser = sucess[0].id;
                res.redirect('/');
               
            } else {
                var erroPassword = "Senha incorreta.";
                res.render('login.ejs',{'erroPassword':erroPassword});
            }
          })
      }else{
        var erroEmail = "O email que você inseriu não está conectado a uma conta.";
        res.render('login.ejs',{'erroEmail':erroEmail});
      }
    });
  });


app.get('/teste', function(req, res) {
    questionsFunction.respostas = [];

    res.render('teste-forms.ejs', { 'questions': questionsFunction.questions, 'pergunta': 0 });
})

app.get('/logout',function(req,res){
    var sess = req.session;
    sess.logado=0;
    sess.destroy();
    res.redirect('/');
  });

  app.post('/updateProfile', upload.single('profile'), function(req,res){
    const data = req.body;
    var file = req.file.originalname;
    file = 'assets/uploads/'+file;
    const datas =[{
        data: data,
        profileImage: file
    }];
   


  });

app.listen(3000, () => {
    console.log("YourFuture -> Online");
});