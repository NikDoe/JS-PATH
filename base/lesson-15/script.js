//передача по значению

let a = 9,
    b = a;

b = 42;

console.log(b); //42
console.log(a); //осталось 9

//передача по ссылке

const obj = {
    c: 9,
    d: 42
};

const _obj = obj; //ссылка, а не сама структура обьекта
_obj.d = 56;

console.log(_obj); //56
console.log(obj); //здесь тоже 56

//это произошло по тому что, когда мы работаем с примитивами то данные передаются по значению
//а когда мы работаем с обьектами, функциями и т.д. то данные не передаются по значению, в строке 18 мы просто создали ссылку на наш начальный обьект, копия не создается таким образом мы модифицируем сам обьект через ссылку

//чтобы копировать обьекты, можно создать свою функцию которая будет копировать наш исходный обьект

function objectCopyFunction(mainObject) {

    //создадим новый обьект, который по умолчанию пустой
    const mainObjectCopy = {};

    //далее воспользуемся циклом for in чтобы пробежаться по исходному обьекту
    let key;
    for (key in mainObject) {

        //присвоим каждое свойство скопированного обьекта от нашего исходного
        mainObjectCopy[key] = mainObject[key];
    }

    //вернем наружу наш обьект который мы скопировали
    return mainObjectCopy;

}

//для теста нашей функции создадим новый обьект

const newObj = {
    name: 'NikDoe',
    age: 28,
    body: {
        weight: 90
    }
};

//создадим переменную в которую положим копию нашего исходного обьекта, применив нашу фукнцию

const _newCopyObject = objectCopyFunction(newObj);

//попытаемся изменить что-то в нашей новой копии обьекта

_newCopyObject.age = 30;
console.log(_newCopyObject); //как видим в копии значение свойства age теперь 30
console.log(newObj); //в исходном обьекте значение свойства age осталось 28

//однако если мы попробуем изменить исвойство вложенного обьекта body, свойство измениться и у оригинального обьекта

_newCopyObject.body.weight = 80;
console.log(_newCopyObject); //80
console.log(newObj); //80

//так произошло потомучто мы создали только поверхностную копью обьекта
//при поверхностной копии, для вложенных обьектов сохраняется передача по ссылке
//для того чтобы не заменялись и вложенные данные нам нужна глубокая копия обьекта

//есть и нативный метод для создания поверхностной копии
//созадим ещё один обьект

const $newObject = {
    nikname: 'doe_nik',
    password: '1234'
};

//создадим переменую и склеим в ней два наших обьекта

const $newCopyObject = Object.assign(newObj, $newObject);

//вызовем нашу новую склеинную копию

console.log($newCopyObject);

/* получаем вот такой обьект на выходе
{
  name: 'NikDoe',
  age: 28,
  body: { weight: 80 },
  nikname: 'doe_nik',
  password: '1234'
}
*/

//порядок передаваемых параметров в Object.assign() можно изменять

//теперь изменим какой нибудь не вложенное свойство в нашем склеином обьекте

$newCopyObject.password = '4321';

console.log($newCopyObject); //в склеиной копии значение теперь 4321
console.log($newObject); //в исходном втором обьекте осталось 1234

//для массива создать такую копию куда проще

//создадим произвольный массив

const oldArr = [1, 2, 3];

//создадим новую переменную которой присвоим наш массив

//если мы напишем способом ниже то снова создаться ссылка
// const newArr = oldArr;

//поэтому

const newArr = oldArr.slice(); //slice возвращает копию исходного массива или его часть

//изменим что-то в нашем новом массиве
newArr[1] = 'text';

//выведем оба наших массива
console.log(oldArr); // [ 1, 2, 3 ], элемент с индексом 2 - не поменялся
console.log(newArr); // [ 1, 'text', 3 ]

//еще один способ создание копии является spread оператор, по простому оператор разварачивания
//для массивов spread появвился в es6
//для обьектов в es8

//создадим функцию которая будет принимать три параметра

const spreadFunction = (a, b, c) => {
    console.log(a);
    console.log(b);
    console.log(c);
};

//теперь создадим массив с элементами

const $newArr = [1, 2, 3];

//чтобы передать элементы из нашего массива в аргументы нашей функции мы можем также воспользоваться spread оператором

spreadFunction(...$newArr);// получим поочердный вывод 1 затем 2 затем 3

//spread оператор для массивов вместо slice

const _oldArr = ['one', 'two', 3],
      _newArr = [..._oldArr];

_newArr[2] = 'three';
console.log(_newArr); //[ 'one', 'two', 'three' ]
console.log(_oldArr); //[ 'one', 'two', 3 ]

//spread для обьектов

const fruit = {1:'apple', 2:'banana'},
      newFruit = {...fruit};

newFruit['2'] = 'orange';
console.log(fruit); //{ '1': 'apple', '2': 'banana' }
console.log(newFruit); //{ '1': 'apple', '2': 'orange' }