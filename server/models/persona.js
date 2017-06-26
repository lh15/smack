var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');



personaSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength : [2,"username for this group is too short!"]
    },
    // ------ One to One relationship to a User.. User can have multiple personas
    _user : {
        type: Schema.Types.ObjectId, ref : "Users",
        required : true
    },
    // ---- One to One relationship here to a team  
    _team : {
        type : Schema.Types.ObjectId, ref : "Teams",
        required : true
    },
    // -- Links to picture stored locally.
    profilePic : {
        type: Schema.Types.ObjectId, ref : "Files",
        required : true 
    },
    password : {
        type: String,
        minlength : 8,
        maxlength : 100,
        validate: {
            validator: function (password) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(password);
            },
            message: "Password failed validation, you must have at least 1 number, uppercase and special character"
        }

    }

},{timestamps : true})


userSchema.pre('save', function (done) {

    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    done();
})


mongoose.model('Personas', userSchema);