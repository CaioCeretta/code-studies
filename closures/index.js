/* A closure is a feature where an inner function has access to the outer (enclosing) function's variables. */

function esterna() {
	const messaggio = "Ciao, dallo scope esterno";

	function interna() {
		console.log(messaggio);
	}

	return interna;
}

const fn = esterna();
fn();

function creaContatore() {
	let conteggio = 0;

	return () => {
		conteggio++;
		console.log(conteggio);
	};
}

const contatore = creaContatore();

contatore(); // 1
contatore(); // 2
contatore(); // 3

const altroContatore = creaContatore();

altroContatore(); // 1
altroContatore(); // 2
contatore(); // 4 (Continues from where it stopped)

// ===========================================**===============================================

// Esempio 2

function creaUtente(nome) {
	let password = "1234"; //privato

	return {
		getNome() {
			return nome;
		},

		verificaPassword(tentativo) {
			return tentativo === password;
		},

		cambiaPassword(nuovaPassword) {
			password = nuovaPassword;
		},
	};
}

const utente = creaUtente("Caio");

console.log(utente.getNome()); // Caio
console.log(utente.verificaPassword("1234")); // true
utente.cambiaPassword("abcd");
console.log(utente.verificaPassword("1234")); // false

// Funzione che utilizza una variabile esterna come parametro per quella interna

function funzioneEsterna(variabileEsterna) {
	return function funzioneInterna(variabileInterna) {
		console.log("Variabile esterna: " + variabileEsterna);
		console.log("Variabile interna: " + variabileInterna);
	};
}

const nuovaFunzione = funzioneEsterna("fuori");
nuovaFunzione("dentro");
