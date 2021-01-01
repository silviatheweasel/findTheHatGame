const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(fieldArr) {
        this.fieldArr = fieldArr;
        this.x = 0;
        this.y = 0;
        this.endGame = false;
    }
    print() {
        this.fieldArr.forEach(element => {
            console.log(element.join(''));
        });
    }
    moveTo() {
        let yourMove = prompt('Which way? ');
        if (yourMove.toLowerCase() == 'r') {
            this.x += 1;
         } else if (yourMove.toLowerCase() == 'l') {
            this.x -= 1;
        } else if (yourMove.toLowerCase() == 'd') {
            this.y += 1;
        } else if (yourMove.toLowerCase() == 'u') {
            this.y -= 1;
        } else {
            console.log('Please input "r", "l", "u" or "d"');
        }
        return this.fieldArr[this.y][this.x];
    }
    checkGame() {
        if (this.y < 0 || this.y > this.fieldArr.length || this.x < 0 || this.x > this.fieldArr[this.y].length) {
            console.log('Out of bounds');
            this.endGame = true;
        }
        if (this.fieldArr[this.y][this.x] === hole) {
            console.log('Sorry, you fell down a hole');
            this.endGame = true;
        }
        if (this.fieldArr[this.y][this.x] === hat ) {
            console.log('Congrats, you found the hat!');
            this.endGame = true;
        }
    }
    gameLoop() {
        this.print();
        while(!this.endGame) {
            this.moveTo();
            this.checkGame();
            if (this.fieldArr[this.y][this.x]==fieldCharacter) {
                this.fieldArr[this.y].splice(this.x, 1, pathCharacter);
                this.print();
            }         
        }
    }
    static generateField(fieldHeight, fieldWidth, percentage) {
        let newFieldArr = [];
        for (let i = 0; i < fieldHeight; i ++ ) {
            newFieldArr[i] = [];
            for (let j = 0; j < fieldWidth; j++) {
                newFieldArr[i][j] = fieldCharacter;
            }             
        }
        let holeNum = Math.round(fieldWidth*fieldHeight*percentage);
        for (let i = 0; i <= holeNum; i++) {
            newFieldArr[Math.floor(Math.random()*fieldHeight)][Math.floor(Math.random()*fieldWidth)] = hole;
        }
        newFieldArr[Math.floor(Math.random()*fieldHeight)][Math.floor(Math.random()*fieldWidth)] = hat;

        if (newFieldArr[0][0] == hat) {
            newFieldArr[Math.floor(Math.random()*fieldHeight)][Math.floor(Math.random()*fieldWidth)] = hat;
        }
        newFieldArr[0][0] = pathCharacter;
        return newFieldArr;
    }
}

const myField = new Field(Field.generateField(5, 5, 0.5));
myField.gameLoop();

