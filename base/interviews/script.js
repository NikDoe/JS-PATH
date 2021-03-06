//БАЗОВЫЙ JS

// Какое будет выведено значение:
let x = 5;
alert(x++); //5 так как постфиксная форма записи
let y = 5;
alert(x++); //6 потому что префиксная


// Чему равно такое выражение:
console.log([] + false - null + true); //NaN
//в данном случае [] тоже самое что и пустая строка
//когда мы что либо конкатинируем со строкой на вернется строка
//дальше мы из строки пытаемся вычесть null,а это не мат операция, поэтому будет NaN
//и в конце когда мы прибавим к NaN true, то всё равно будет NaN


// Что выведет этот код: 
let _y = 1;
let _x = _y = 2; //сначало мы y присвоили 2, а зачем x присвоили y, это называется последовательное присваивание
console.log(_x); //2 


// Чему равна сумма 
console.log([] + 1 + 2); //12
//в данном случае [] тоже самое что и пустая строка
//когда мы что либо конкатинируем со строкой на вернется строка
//так как 1 теперь строка, и мы снова конкатинируем то на выходе будет 12 - тоже строка


// Что выведет этот код: 
console.log('1' [0]); //здесь мы обращаемся к строке, а именно к символу под индексом 0
console.log('banana' [2]); //выведет n


// Чему равно 
//когда мы имеем множественное логическое "и" оно будет проверять пары до тех пор пока не наткнется на первое ложное
//в данном случее первым ложным будет null
//после этого проверка дальше не пойде и нам просто вернется в консоль первое ложное, как будто есть return
console.log(2 && 1 && null && 0 && undefined); //null
//в свою очередь логическое 'или' останавливается на правде


// Есть ли разница между выражениями !!( a && b ) и (a && b)?
//подставив числа одинаковые в первом случае мы получим логическое значения благодаря !!(динамическая типизация), поэтому они не будут равны
console.log(!!(1 && 2) === (1 && 2)); // false


// Что выведет этот код: 
//когда мы не знаем какой оператор выполниться первее, мы всегда должны смотреть таблица приоритетов
//логическое И выше по приоритету чем ИЛИ
//первым делом выполниться 2 && 3 и вернется 3, потому что в данном случае сработает true
//когда у оператора И true то всегда возвращается правая часть
console.log(2 && 3); //3
console.log(3 && null); //в случае если одно из сравнений false, то мы помнинм что всегда вернется то которое false
console.log(null && ''); //когда оба false, то вернется первое из false поэтому null
//когда идет сравнение оператом ИЛИ, мы помним что он останавливается на true и выводит то значение которое true
console.log(null || 3); //3
//если когда ИЛИ оператор оба выражение true то вернется правая, правая вернется и тогда когда левое будет true
console.log(2 || 3); //2
console.log(2 || undefined); // 2
console.log(0 || ''); //когда оба false при логическом возвращается то вернется правое, поэтому в консоле мы получим пустую строку
console.log(null || 2 && 3 || 4); // поэтому здесь вернется true


// Правда ли что a == b ?
let a = [1, 2, 3],
    b = [1, 2, 3]; // ответ нет
//можно представить что это два ящика с 3 требя одинаковыми яблоками
//хоть яблоки все одинаковые, но ящика то разные, ящик а и ящик b в нашем случае


// Что выведет этот код: 
console.log(+"Infinity");//выведет Infinity(бесокнечность) которое будет являться числом
//если быдет другое слово и мы попытаемся сложить с числом мы получим NaN
console.log(+'fff' + 4);


// Верно ли сравнение:
// вданном случае идет посимвольное сравнение с правилами юникода
console.log("Ёжик" > "яблоко"); //false


console.log(0 || '' || 2 || undefined || true || falsе); //2