const mongoose = require('mongoose');
const clc = require('cli-color');
const logOk = clc.green.bold;
const logErr = clc.red.bold;

const carSchema = new mongoose.Schema({
    brand: String,
    model: String
})
const Car = mongoose.model('Car', carSchema);
exports.carModel = Car;

const annonceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: false
    },
    images: [{
        type: String
    }],
    price: {
        type: Number,
        required: true
    },
    car: {
        brand: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        details: {
            version: {
                type: String,
                required: true
            },
            color: {
                type: String,
                required: true
            },
            places: {
                type: Number,
                required: true
            },
            doors: {
                type: Number,
                required: true
            },
            km: {
                type: Number,
                required: true
            },
            energy: {
                type: String,
                required: true
            },
            productionYear: {
                type: Number,
                required: true
            },
            transmission: {
                type: String,
                required: true
            },
            hp: {
                type: Number,
                required: true
            },
            cf: {
                type: String,
                required: true
            }
        }
    }
});
const Annonce = mongoose.model('Annonce', annonceSchema);
exports.annonceModel = Annonce;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: false,
        default: null,
    },
    professional: {
        type: Boolean,
        required: false,
        default: false
    },
    zip: {
        type: Number,
        required: false,
        default: null
    },
    annonces: [annonceSchema]
});
const User = mongoose.model('User', userSchema);
exports.userModel = User;


exports.connect = () => {
    mongoose.connect(
        'mongodb+srv://' + process.env.MONGOUSER + ':' + process.env.MONGOPASS + '@' + process.env.MONGOURL + '/' + process.env.MONGO_DB_CARS,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(value => {
            console.log(logOk('MongoDB Connected'));
        })
        .catch(error => {
            console.log(logErr('DB Error\n') + error);
        });
};


// let user = {
//     username: 'Admin1',
//     name: '1',
//     surname: 'Admin',
//     mail: 'test@gmail.com',
//     phone: '0123456789',
//     professional: false,
//     zip: 77140,
// };


// let annonce = {
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     price: 6500,
//     car: {
//         brand: 'AAATest',
//         model: 'X5',
//         details: {
//             version: 'TDI II',
//             color: 'Rouge',
//             places: 5,
//             doors: 5,
//             km: 196000,
//             energy: 'Diesel',
//             productionYear: 2012,
//             transmission: 'Manuelle',
//             hp: 212,
//             cf: 5
//         }
//     }
// };

// let newAnnonce = new Annonce(annonce);
// newAnnonce.save()
//     .then((annonce) => {
//         console.log(annonce);
//     })
//     .catch((err) => {
//         console.log(err);
//     });;


// let newUser = new User(user);
// newUser.save()
//     .then((user) => {
//         console.log(user);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

function getUserWithPosts(username) {
    return User.findOne({username: username})
        .populate('annonces').exec((err, annonces) => {
            console.log("Populated User " + annonces);
        })
}

// getUserWithPosts('Admin1');