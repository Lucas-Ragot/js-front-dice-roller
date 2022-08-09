// Nombre aléatoire
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fonction permettant de lancer un dé
function rollDice(target) {
    // Création du dé
    var dice = document.createElement('div');
    dice.className = 'dice';

    var randomNumber = getRandom(1, 6);
    dice.style.backgroundPositionX = (randomNumber - 1) * -100 + 'px';

    var player = document.getElementById(target);
    player.appendChild(dice);
}

function play(target = 'player') {
    for (var i = 0; i < nbDices; i++) {
        rollDice(target); // Premier appel pour player et deuxième pour dealer
    }
    if (target === 'player') { // Vrai que lors du premier appel
        setTimeout(play, 1500, 'dealer'); // Dans 1.5 secondes, play('dealer')
    }
}

function reset() {
    // On met un textContent vide sur nos éléments #player et #dealer pour les vider de leurs enfants (les dés)
    document.getElementById('player').textContent = '';
    document.getElementById('dealer').textContent = '';
}

function newGame() {
    reset();
    play();
}

// Nombre de dés par défaut indiqué dans l'interface
var nbDices = 3;

// Sélection de l'input range
var nbDiceSlider = document.getElementById('nb-dice');

function changeNbDices(event) {
    // On cible l'élément HTML qui a déclenché l'évènement et on récupère sa value
    nbDices = parseInt(event.target.value);
    // On met à jour le nombre affiché
    document.getElementById('nb-dice-display').value = nbDices;
    // event.stopPropagation(); // Empêche l'évènement de remonter au(x) éléments parent(s)
}

// A chaque fois que la valeur de mon input de type range change, on exécute la fonction changeNbDices()
nbDiceSlider.addEventListener('input', changeNbDices);

var playButton = document.getElementById('play-button');
// On ajoute un écouteur d'évènement pour les "clics" qui exécutera la fonction newGame()
playButton.addEventListener('click', newGame);
