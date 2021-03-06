'use strict';

//ключевое словое this - указывает на текущий контекст
//функция может вызываться 4мя способами
//1 способом - это обычный вызов нашей функции

function showThis() {
    console.log(this);
}

//в зависимости включен ли строгий режим или нет, текущий контекст будет разным
//в случае если включен, то контекст будет undefined
//если выключен 'use strict', то контекстом будет глобальный обьект window
showThis(); //undefined

//если функцию используется внутри функции, то this во внутренней фукнции будет указывать на тот же контекст что и у внешней
function _showThis() {
    function someFunction() {
        console.log(this); //всё равно будет равен undefined, так как включен строгий режим, если бы был выключен - то this ссылася бы на window
    }

    someFunction();
}

_showThis();

//практический пример
function $showThis(a, b) {
    function someFunction() {
        return a + b;
        // return this.a + this.b //так бы не сработало, так как у нашей функции нету этих переменных, и поэтому лучше использовать обычное замыкание
    }

    console.log(someFunction()); //22
}

$showThis(9, 13);

//2 способ вызов..это когда мы фукнцию задаем как метод обьекта

const obj = {
    a: 20,
    b: 15,
    someMethod: function () {
        console.log(this.a); //this всегда указывает на тот обьект в контексте которого было вызвано
    }
};

obj.someMethod(); //20

//если мы обьявим новую функцию внутри метода обьекта

const _obj = {
    someMethod: function () {
        function someFunction() {
            console.log(this); //undefined
        }
        someFunction(); //контекст был потерян, потому что обычный вызов функцию которая лежим в методе нашего обьекта
    }
};

_obj.someMethod();

//также мы можем сделать чтобы метод вызываемый для нашего обьекта, указывал на котекст другого обькта, для этого есть встроенный метод bind, в параметры которого будет передавать контекст того обьекта, к которому хотим применить метод

function sayHello() {
    console.log('привет ', this);
}

const $obj = {

    name: 'Person',
    someFunction: sayHello.bind(window)//либо мы можем просто указать this, так как this === window по умолчанию

};

//теперь если мы применим метод к нашему обьекту, то контекст будет для того обьекта который мы указали в bind , а значит результат выполнения данного метода будет именно для забинденого обьекта
$obj.someFunction();
//либо мы можем забиндить прямо в вызове метода для нашего обьекта
// $obj.someFunction.bind(this)();

//более усложненный варианта
//у нас есть два обьекта, и только в одном из них будет метод info

const person = {
    name: 'NikDoe', 
    info: function(){
        console.log(`тебя зовут ${this.name}`); //так как this всегда указывает на контекст обьекта в котором был вызван, мы можем также обращаться через this и к свойстам этого обьекта
    }
};

//добавим другой обьект
const lena = {
    name: 'Lena'
};

//теперь с помощью bind мы можем сделать так чтобы наш метод info вызвался и обьекта lena
person.info.bind(lena)();// тебя зовут Lena
//обязательно для bind нужно ставить (), потому что bind не вызывает эту функцию, он создает новыую функцию которую нужно вызвать

//усложним ещё, и теперь будет передавать в наш метод дополнительные параметры

const _person = {
    name: 'NikDoe',
    info: function(job, phone) {
        console.log(`тебя зовут ${this.name}`);
        console.log(`твоя должность ${job}`);
        console.log(`твой телефон ${phone}`);
    }
};

//с помощью бинда мы также можем передавать эти параметры
_person.info.bind(lena)('frontend', '375-25-777-77-77');
//либо же мы можем создать отдельную переменную, куда поместим в неё биндинг, и при вызове это новой переменной укажаем параметры
const infoAboutLena = _person.info.bind(lena);
infoAboutLena('backend', '375-25-999-00-99');

//но самым правильным будет эти параметры указать, после указаная обьекта на контекст которого мы указываем
const _infoAboutLena = _person.info.bind(lena, 'devops', '375-25-111-00-11');
_infoAboutLena();//таким способом мы можем вызвать bind там где нам удобно

//есть анлогичные методы call и apply их отличие в том, что когда мы их применяет они тут же вызывают нашу функцию
_person.info.call(lena, 'team lead', '777777777777');
_person.info.apply(lena, ['team lead', '777777777777']); //отличие apply от call лишь в том что мы должны передавать дополнительные параметры вкачестве массива

//3 способ вызова функции - это когда наша функция конструктор
//когда такая функция будет вызвана она создаст новый обьект
//и контекстом для такого нового обьекта будет этот новый обьект

function User(name, age) {
    this.$name = name;
    this.$age = age;
    //даже если здесь будут методы, то this всё равно будет ссылать на контекст нашего нового обьекта, котороый только что создался
    this.hello = function () {
        console.log(`привет ${this.$name}`); //важно указывать не аргумент который мы передаем через фукнцию конструктор а this.переменная
    };
}

let user = new User('NikDoe', 27);
console.log(user); //User {$name: "NikDoe", $age: 27, hello: ƒ}
// console.log(user.hello());

//это очень удобно для тех случаев, когда мы будет создавать много новых экземпляров нашего обьекта, то просто запоминаются те данные, которые были у конкретного экземпляра

// ====== ПРАКТИКА ====== //

//контекст и обработчики событий
//контекст будет указывать на элемент к которому мы применяем событие
const btn = document.querySelector('button');

btn.addEventListener('click', function() {
    console.log(this); // <button>кнопка</button>
});

//здесь this будет тоже самое что и event.target, и чаще всего используется именно event.target
//поэтому мы можем манипулировать нашим элементом с помощью this, точно также как и с помощью event.target

btn.addEventListener('click', function (e) {
    this.style.backgroundColor = 'red';
    // e.target.style.backgroundColor = 'red';
});

//контекст и прототипы

//представим ситуацию что у нас есть массива, и функция которая будет умножать каждый элемент этого массива на 2

//как бы мы это сделали без прототипов и контекста

const array = [1, 2, 3];
 //функция будет принимать наш массив и число на которое мы будем умножать
function multBy (arr, n) {
    //с помозью forEach мы не можем перебрать массива, так как это просто итератор который ничего не возвращет, поэтому воспользуемя map, который также может перебрат массив, но и вернуть при это значения
    return arr.map( function(i) {
        return i * n;
    });
}

console.log(multBy(array, 2)); //[2, 4, 6]

//теперь перепишем весь наш функционал воспользовавшись связкой контекст + прототипы
 Array.prototype._multBy = function (n) {
    //только теперь вместо arr, который мы уже не переадаем, мы можем написать this которое будет ссылаться на тот массив к которому мы будем применять наш метод
    return this.map( function(i) {
        return i * n;
    });
 };

 console.log(array._multBy(5));//[5, 10, 15]

 //контекст и стрелочные функции
 //самое важное это то, что у стрелочной функции нет своего собственного контекста, она всегда его брать у своего родителя

 //стрелочная и обработчики

 btn.addEventListener('click', () => {
     //теперь this указывает не на сам элемент, а на его родителя, в данном случае это будет глобальный обьект window
     console.log(this);
 });

 //стрелочная и обьекта

 const arrowObj = {
     //this также будет указывать не на сам обьект в контексте которого вызван, а на его родителя, в нашем случе это опять window
     name: 'NikDoe',
     someFunction: () => {
         console.log(this);
     }
 };

 arrowObj.someFunction();

 //вариант когда стрелочная функция будет лежать внутри нашего метода

 const _arrowObj = {
     name: 'Lena',
     someFunction: function () {
         const sayHello = () => {
             //для обычной функции не могли написать this.name, так как она не обладала своим name, для стрелочной можем, так как контекстом является контекст функции которая ее оборачивает
             console.log('привет ' + this.name);
         };

         sayHello();

     }
 };

 _arrowObj.someFunction();

 //стрелочная функция может использовать для укорочения кода, благодаря своему синтаксису

 const $arrowObj = {
     a: 5,
     someFunction: function () {
         const doubleArrowFunc = b => console.log(this.a * b);
         doubleArrowFunc(5);
     }
 };

 $arrowObj.someFunction();
 