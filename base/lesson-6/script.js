//условия

if (9 == 9) {
    console.log('верно');
} else {
    console.log('неверно');
}

if (4) {
    console.log('верно');
} else {
    console.log('неверно');
}

const num = 42;

if (num < 41) {
    console.log('мало');
} else if (num > 100) {
    console.log('много');
} else {
    console.log('ок');
}

//терарнарный оператор, тернарный потому что учавствует три аргумента, единственный тернарный оператор в js на данный момент

const firstCheck = false,
    secondCheck = false,
    access = firstCheck ? "Доступ запрещен" : secondCheck ? "Доступ запрещен" : "Доступ разрешен";

console.log(access);

//При присвоении значения также возможно выполнение более одной операции. В этом случае переменной будет присвоено то значение, которое стоит последним в списке значений, разделенных запятой

const age = 16;

const url = age > 18 ? (
    alert("Хорошо, вы можете продолжить."),
    // alert вернет "undefined", но это будет проигнорировано, потому что
    // не является последним в списке значений, разделенных запятой
    "continue.html" // значение будет присвоено, если age > 18
) : (
    alert("Вы слишком молоды!"),
    alert("Простите :-("),
    // ит.д. ит.д.
    "stop.html" // значение будет присвоено, если !(age > 18)
);

console.log(url);

//switch - данная конструкция всегда идёт на строгое сравнение

const foo = 1;
switch (true) { // Постоянное значение true вместо foo
    case foo >= 0 && foo <= 3:
        console.log('yes');
        break;
    default:
        console.log('not');
}
