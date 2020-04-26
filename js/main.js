const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

window.onload = () => {
    document.getElementById('new-game').onclick = () => {
        console.log('primero');
        newGame();
    }
};

function newGame() {
    console.log('segundo');
    document.getElementById('start').style.display = 'none';
    document.getElementById('game').style.display = 'block';
}