var express                 =       require('express'),
    app                     =       express(),
    bodyParser              =       require('body-parser'),
    mongoose                =       require('mongoose'),
    expressSanitizer        =       require('express-sanitizer'),
    methodOverride          =       require('method-override'),
    passport                =       require('passport'),
    flash                   =       require('connect-flash'),
    Blog                    =       require('./models/blog'),
    Comment                 =       require('./models/comment'),
    moment                  =       require('moment'),
    session                 =       require('express-session'),
    cookieParser            =       require('cookie-parser'),
    authRoutes              =       require('./routes/index')(app, passport),
    blogRoutes              =       require('./routes/blogs'),
    commentRoutes           =       require('./routes/comments'),
    userRoutes              =       require('./routes/users'),
    port                    =       process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/NUFC_blog2');

require('./config/passport')(passport); // pass passport for configuration


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(cookierParser()); // read cookies (needed for auth)

app.set('view engine', 'ejs');

// use routes located in specified folders
app.use(authRoutes);
app.use('/blogs', blogRoutes);
app.use('/blogs/:id/comments', commentRoutes);
app.use(userRoutes);

// required for passport
app.use(session({ secret: 'toonaresocool'})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // messages

// Listening route
app.listen(port);
console.log('Listening on port ' + port);
