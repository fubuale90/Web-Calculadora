// Obtener el display
const display = document.getElementById('display');

// Función para agregar números al display
function appendNumber(number) {
    display.value += number;
}

// Función para agregar operadores al display (incluyendo porcentaje)
function appendOperator(operator) {
    if (operator === '%') {
        handlePercentage();
    } else {
        display.value += operator;
    }
}

// Función para limpiar el display
function clearDisplay() {
    display.value = '';
}

// Función para eliminar el último carácter
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Función para realizar el cálculo
function calculate() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}

// Función para manejar el porcentaje
function handlePercentage() {
    let currentValue = display.value;
    let lastOperatorIndex = findLastOperatorIndex(currentValue);
    
    if (lastOperatorIndex !== -1) {
        let operator = currentValue[lastOperatorIndex];
        let numberBeforeOperator = currentValue.slice(0, lastOperatorIndex);
        let numberAfterOperator = currentValue.slice(lastOperatorIndex + 1);

        // Calculamos el porcentaje
        let percentageValue = (parseFloat(numberBeforeOperator) * parseFloat(numberAfterOperator)) / 100;

        // Si el operador es '-', restamos el porcentaje
        if (operator === '-') {
            display.value = parseFloat(numberBeforeOperator) - percentageValue;
        } else if (operator === '+') {
            display.value = parseFloat(numberBeforeOperator) + percentageValue;
        } else {
            // Si es otro operador, simplemente añadimos el porcentaje
            display.value += (parseFloat(numberAfterOperator) / 100).toString();
        }
    } else {
        // Si no hay operadores, calculamos el porcentaje del número actual
        display.value = (parseFloat(currentValue) / 100).toString();
    }
}

// Encuentra el último operador en la expresión
function findLastOperatorIndex(value) {
    const operators = ['+', '-', '*', '/'];
    let lastIndex = -1;

    operators.forEach(op => {
        let index = value.lastIndexOf(op);
        if (index > lastIndex) {
            lastIndex = index;
        }
    });

    return lastIndex;
}

// Evento que escucha el teclado
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (!isNaN(key)) {  // Si es un número
        appendNumber(key);
    } else if (key === '+') {
        appendOperator('+');
    } else if (key === '-') {
        appendOperator('-');
    } else if (key === '*') {
        appendOperator('*');
    } else if (key === '/') {
        appendOperator('/');
    } else if (key === '.') {
        appendOperator('.');
    } else if (key === 'Enter') {
        event.preventDefault();  // Prevenir el comportamiento por defecto del Enter
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {  // Limpiar la pantalla con la tecla Escape
        clearDisplay();
    }
});
