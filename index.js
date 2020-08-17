const firebase = require('firebase')
var express = require('express');
var app = express();
const router = express.Router()

var config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

app.get('/favicon.ico', (req, res) => res.status(204));

router.get("/:id",((req,res,next)=>{
    firebase.database().ref('urls/').child(req.params.id).on("value", function (redirect_url) {
        console.log(redirect_url.val());
        res.redirect("http://" + redirect_url.val());
        next()
    })
}))

app.use('/',router)

app.get('/', function(req, res){

   invalid_method = '{"Error" : "Method not allowed !"}'
   res.send(JSON.parse(invalid_method));
});

app.listen(3000, () => console.log('Local app listening on port 3000!'));