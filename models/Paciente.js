import mongosee from "mongoose";

const pacienteSchema = mongosee.Schema(
	{
		nombre: {
			type: String,
			required: true,
		},
		propietario: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		fecha: {
			type: Date,
			required: true,
			default: Date.now(),
		},
		sintomas: {
			type: String,
			required: true,
		},
		veterinario: {
			type: mongosee.Schema.Types.ObjectId,
			ref: "Veterinario",
		},
	},
	{
		timestamps: true,
	}
);

const Paciente = mongosee.model("Paciente", pacienteSchema);

export default Paciente;
