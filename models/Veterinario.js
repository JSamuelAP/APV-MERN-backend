import moongoose from "mongoose";
import bcrypt from "bcrypt";
import generarID from "../helpers/generarID.js";

const veterinarioSchema = moongoose.Schema({
	nombre: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	telefono: {
		type: String,
		default: null,
		trim: true,
	},
	web: {
		type: String,
		default: null,
	},
	token: {
		type: String,
		default: generarID(),
	},
	confirmado: {
		type: Boolean,
		default: false,
	},
});

// Modificar antes de que se almacene
veterinarioSchema.pre("save", async function (next) {
	// Si ya está hasheado, no volver a hashear
	if (!this.isModified("password")) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

veterinarioSchema.methods.comprobarPassword = async function (
	passwordFormulario
) {
	return await bcrypt.compare(passwordFormulario, this.password);
};

const Veterinario = moongoose.model("Veterinario", veterinarioSchema);

export default Veterinario;

// Samuel: nuevopassowrd
// Manuel: passwordxd
