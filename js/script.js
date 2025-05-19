
let lcd = null; // displayen

let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /

let isComma = false; //Om komma finns

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
        if (btn === 'comma') {
            addComma();
        } else if (btn === 'clear') {
            memClear();
        } else if (btn === 'enter') {
            calculate();
        } else {
            setOperator(btn);
        }
    }   
}

/**
 *  Lägger till siffra på display.
 */
function addDigit(digit) {
    lcd.value += digit; //lägger till nästa nummber
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
 * Sparar operator.
 * +, -, *, /
 */
function setOperator(operator){
    if (arithmetic === null) {
        memory = lcd.value;
        clearLCD();
        isComma = false;
    }

    if (operator === 'add') {
        arithmetic = '+';
    }

    if (operator === 'sub') {
        arithmetic = '-';
    }

    if (operator === 'mul') {
        arithmetic = '*';
    }

    if (operator === 'div') {
        arithmetic = '/';
    }

}

/**
 * Beräknar ovh visar resultatet på displayen.
 */
function calculate() {
    let x = Number(memory)
    let y = Number(lcd.value)

    if (arithmetic === '+') {
        lcd.value = x + y;
    }

    if (arithmetic === '-') {
        lcd.value = x - y;
    }

    if (arithmetic === '*') {
        lcd.value = x * y;
    }

    if (arithmetic === '/') {
        if (y === 0) {
            lcd.value = 'ERROR CANT DIVIDE BY 0'
        } else {
            lcd.value = x / y;
        }
    }

    arithmetic = null;
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
