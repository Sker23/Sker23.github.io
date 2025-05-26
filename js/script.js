
let lcd = null; // displayen

let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /

let isComma = false; //Om komma finns
let operatorExist = true;//håller koll så att det bara finns en operator efter varje tal

function init() {
    lcd = document.getElementById('lcd');
    let keyBoard = document.getElementById('keyBoard')
    keyBoard.onclick = buttonClick;
}

/**
 * Händelsehanterare för kalkylatorns tangentbord
 */
function buttonClick(e) {
    let btn = e.target.id; //id för den tangent som tryckte ner

    // kollar om siffertangent är nedtryckt
    if (btn.substring(0, 1) === 'b') {
        let digit = btn.substring(1, 2); // plockar ut siffran från id:et
        addDigit(digit);
    } else { // Inte en siffertangent, övriga tangenter.
        switch (btn) {
            case 'add':
                addOperator('+');
                break;
            case 'sub':
                addOperator('-');
                break;
            case 'mul':
                addOperator('*');
                break;
            case 'div':
                addOperator('/');
                break;
            case 'comma':
                addComma();
                break;
            case 'enter':
                calculate();
                break;
            case 'clear':
                memClear();
                break;
        }
    }   
}

/**
 *  Lägger till siffra på display.
 */
function addDigit(digit) {
    lcd.value += digit; //lägger till nästa nummber
    operatorExist = false
}

/**
 * Lägger till operator
 */
function addOperator(operator) {
    if (operatorExist === false) {
        lcd.value += operator;
    }

    operatorExist = true;
    isComma = false;
}
/**
 * Lägger till decimaltecken
 */
function addComma() {
    if (isComma === false) {
        lcd.value += '.';
        isComma = true;
    }
}

/**
 * 
 * Beräknar ovh visar resultatet på displayen.
 */
function calculate() {
    let mulDivArray = lcd.value.split(/([+\-*\/])/);//splittar stringen vid varje operator
    let addSubArray = [];//används senare för uträkning av + och -.

    for (let i = 0; i < mulDivArray.length; i++) {
        if (mulDivArray[i] === '*' || mulDivArray[i] === '/' ) {//chekcar om det är en div/mul 
            let firstNumber = parseFloat(addSubArray.pop());//poppar eftersom den ska räknas med och ersättas med nytt tal
            let secondNumber = parseFloat(mulDivArray[i+1]);

            if (mulDivArray[i] === '*') {
                addSubArray.push(firstNumber * secondNumber);
            } else {
                if (secondNumber === 0) {//om divisionen är 0 avbryts funktionen.
                    lcd.value = 'CANT DIVIDE BY 0';
                    return;
                } else {
                    addSubArray.push(firstNumber / secondNumber);
                }// pushar in talen till den nya arrayen
            }
            i++//skippare andra talet eftersom det använts och ligger nu i addSubArrayen
        } else {//annars pushar in till andra arrayen för senare användning
            console.log('else');
            addSubArray.push(mulDivArray[i]);
        }
    }//tar hand om alla multiplikationer och divisioner

    let sum = parseFloat(addSubArray[0]);
    for (let i = 0; i < addSubArray.length; i++) {
        if (addSubArray[i] === '+' || addSubArray[i] === '-') {
            if (addSubArray[i] === '+') {
                sum = sum + parseFloat(addSubArray[i+1]);
                i++
            } else {
                sum = sum - parseFloat(addSubArray[i+1]);
                i++
            }
        }
    }//tar hand om all aditioner och subtraktioner skapar slutvärdet

    lcd.value = sum;
}

/** Rensar display */
function clearLCD() {
    lcd.value = '';
    isComma = false;
}

/** Rensar allt, reset */
function memClear(){
    memory = 0;
    arithmetic = null;
    clearLCD();
}

window.onload = init;
