
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;


let rolesValidos= {
	values: ['ADMIN_ROLE', 'USER_ROLE'],
	message: '{VALUE} no es un rol valido'
};

let usuarioSchema = new Schema({
	nombre:{
		type: String,
		required: [true,'El nombre es necesario']
	},
	email:{
		type: String,
		unique: true,
		required: [true, 'El correo es necesario']
	},
	password:{
		type: String,
		required: [true, 'La contrasena es obligatoria']
	},
	img:{
		type: String,
		required: false
	},// no es obligatoria
	role: {
		type: String,
		default: 'USER_ROLE',
		enum: rolesValidos
	}, //default: 'USER_ROLE'
	estado: {
		type: Boolean,
		default: true

	}, //Boolean
	google: {
		type: Boolean,
		default: false
	} //boolean
});

usuarioSchema.methods.toJSON =  function(){

	let user = this;
	let userObject =  user.toObject();

	delete userObject.password;
	return userObject;

}

usuarioSchema.plugin(uniqueValidator, {message:'{PATH} debe de ser unico'});

module.exports= mongoose.model('Usuario', usuarioSchema);