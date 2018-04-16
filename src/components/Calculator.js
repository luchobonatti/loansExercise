var calculateAmortization = function( amount, rate, terms ){
    var principal = parseFloat(amount);
    var interest = parseFloat(rate)  / 100 / 12;
    var payments = parseFloat(terms);

    var x = Math.pow(1 + interest, payments); //Math.pow computes powers
    var monthly = (principal*x*interest)/(x-1);

    return {
        payment: monthly.toFixed(2),
        total: (monthly * payments).toFixed(2),
        totalinterest: ((monthly*payments)-principal).toFixed(2)
    }
};

//vars: Fecha del prestamos, fecha X (> fecha prestamo)
// La diferencia nos dará la cantidad de meses computados desde/hasta
//El balance deberá calcular los meses que faltan a partir de esta diferencia y la cantidad de meses (terms)
//Aqui ya obtenemos un dato para la formula siguiente (número de meses (pagos/cuotas) que faltan para completar el período del prestamo).

function calculate_balance(monthly_payment, interest_rate, term_remaining) {
    var PV = monthly_payment * (1 - Math.pow(1 + interest_rate, -term_remaining)) / interest_rate
    return round_decimals(PV, 2)
}

function round_decimals(original_number, decimals) {
    var result1 = original_number * Math.pow(10, decimals)
    var result2 = Math.round(result1)
    var result3 = result2 / Math.pow(10, decimals)
    return (result3)
}

var monthly_payment = 200
var interest_rate = 0.09
var term_remaining = 2
var loan_balance = calculate_balance(monthly_payment, interest_rate / 12,
    term_remaining)