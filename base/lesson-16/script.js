//ООП
//смысл ооп в том, что мы представляем любую вещь как обьект с набором свойст и методов
//в js используется прототипно ориентированный подходт
//прототип это первообразец чего либо
//для примера создадим создадим обьект

const obj = {
    name: 'NikDoe',
    sayHello: function () {
        console.log(`${this.name} привет!`);
    }
};

//вызовем у нашего обьекта этот метод

obj.sayHello();

//но если мы попытаемся вызвать какой-то несуществующий метод мы получим ошибку

// obj.callMe(); - будет ошибка, потому что такого метода не существует у нашего обьекта

//однако если мы вызовем к примеру метод toString() мы ошибки не получим, но почему?
//всё потому что у нашего обьекта есть прототип, тот самый первообраз, у которого есть этот метод
//в момент когда мы инициализируем обьект он создается от своего прототипа, и наследует всего его методы
//чтобы убедится в этом мы можем стандартную запись const obj = {}; представить по другому

const _obj = new Object({ //эта запись аналогична записи const _obj = {name: 'Elena'};
    name: 'Elena'
});

//Object (обязательно с большой буквы) и есть наш главный прототип, который содержит toString()
//для других типов данных есть свои прототипы, к примеру у строки это String
//одна наш прототип Object является прототипом вообще для всего, в том числе и для прототипов других типов
//чтобы в этом убедится применим toString() к примеру для числового типа

const num = 5;
console.log(num.toString());

//почему для чисел тоже работает?
//когда мы применяем toString() к нашему num js видит что у самого нам такого метода нету
//далее он обращается к его прототипу String, и тоже видит что его нету
//а так как прототипом для String является Object, у которого есть такой метод, то мы можем применить его и к num

//мы можем также создавать свои собственные методы для Object или для его потомков прототипов String и других

Object.prototype.saySomething = () => {
    console.log('wazaaaap');
};

//метод saySomething доступен теперь для любых типов даных

[].saySomething();

const str = 'NikDoe';
str.saySomething();

const _num = 5;
_num.saySomething();

//либо мы можем создать только для прототипа отдельного тип

String.prototype.onlyString = () => {
    console.log('eeeee');
};

//если мы сейчас попытаемя применить его к любому типу данных кроме строки, то это не сработает

const $num = 10;
// $num.onlyString(); //$num.onlyString is not a function

//всё потому что данный метод есть только у прототипа String, его даже нет у нашего главное прототипа Object

//но как сделать так чтобы у нашего другого обьекта тоже был метод sayHello, но при этом его не нужно было создавать в прототипе
//ответ наследование

const $obj = Object.create(obj); // здесь говориться создать обьект $obj от главное прототипа Object, унаследовать все его поля и методы, а также унаследовать всё от обьекта который указан в скобках
//и действительно если мы попытаемс вызвать сейчас поле name у $obj - оно отобразиться, хотя мы его явно не задавали даже

console.log($obj.name); //NikDoe

//в том числе вызовется и метод

// $obj.sayHello(); //NikDoe привет!

//мы можем также задавать собственные поля, чтобы они не брались из наследуемого обьекта

$obj.name = 'Elena';
console.log($obj.name);
$obj.sayHello(); //Elena привет!
