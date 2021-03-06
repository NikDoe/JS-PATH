//обращаемся к нашим инпутам
const inputBYN = document.querySelector('#byn'),
    inputUSD = document.querySelector('#usd');

//добавляем обработчик событий на наш импут inputBYN
inputBYN.addEventListener('input', () => {
    //формируем в нашей переменной новый запрос
    const request = new XMLHttpRequest();// у конструктора нет аргументов

    //далее инициализируем наш запрос, и определяем основные параметры запроса (HTTP-метод, и ссылку куда отправить запрос)
    request.open('GET', 'js/current.json');

    //Устанавливаем заголовок запроса с именем name и значением value. Делается это для того чтобы наши протоколы передачи данных четко понимали что он передает, и чтобы сервер точно понимал что он принимает в себя
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    //устанавливаем соединение и отсылает запрос к серверу
    request.send();

    //добавляем нашему запросу обработчик 'load' - который сработает один раз когда запрос уже полностью готов, это не значит что он завершен успешно
    request.addEventListener('load', () => {

        //далее формируем условие что если статус нашего запроса 200, т.е. всё хорошо
        if (request.status === 200) {
            //тогда создаём переменную в которую положим ответ, который вернет нам сервер, и при этом обязательно распарсим его, чтобы могли с ним работать
            const data = JSON.parse(request.response);

            //после этого в наш второй импут выводим преобразования
            inputUSD.value = (+inputBYN.value / data.current.usd).toFixed(2);
        } else { //в случае если произошла какая-то ошибка, например путь куда отправить запрос был указан не верно, то выведем сообщение для нашего пользователя
            inputUSD.value = 'smth was wrong...';
        }
    });
});