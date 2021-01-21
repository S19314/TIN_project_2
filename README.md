# TIN_project_2
MP2
Version 4.11:{
	Проблема с негенерируемые страницы заключалась в том, что в контроллере не передавались данные. Неободимые для отрисовки страниц типа "Edit", "Create new", 
	но непотребные (с точки зрения пользователя, ведь их не видно из-за параметра disabled в datalist).
	Поэтому принято решение, передавать пустой массив, чтобы поменьше заебывать  Базу Данных запросами, результаты которых всё равно не будут использоваться.
}
Version 4.23:{
	Недоработка из-за которой на странице Details\szegoly в таблице в колонке название_елемента - не добавлялась к ссылке на Details\szegoly elementa_komputera
	( в z_e_k.element_komputera._id ) заключалась в том, что в KomputerRepository  "_id: firstRow.komp_id, [ /*  firstRow._id, */]" по неверному названию колонки брались 
	данные. 
}
Version 4.24:{
	Причина из-за которой формой не отправляются некоторые поля в том, что input не имеет атрибута name="";
}
Version 4.25:{
	1. Изменил ElementKomputeraRepository - в getElement_KomputeraById с row.model i row.komp_id на firstRow.model i firstRow.komp_id;[И для остальных полей так же.]
	2. B KomputerContoller передавался пустой komputerId, так как в komputerRepository был шаблон ссылки с :elementId, а не :komputerID. иЗМЕНИЛ И ЗАРАБОТАЛО.
}
Version 5.1:{
	Не хотело генереировать страницы, так как в туториале описано добавление .catch(validationError: err.details) в методах по обраотке POST-запросов 
																		[ElementKomputeraController].
	Но не об изменениях в методах show [в ElementKomputeraController], где при генерации страницы необходима переменная(-массив) validationError: =>
	РЕШЕНИЕ __ validationError:[] __;
	При генерации страница использует - есть откуда брать, а берет null и отлично живёт.
}

Version 5.7:{
	Причина по которой не генерировалась страница - заключалась в том, что рендеринг страницы был вне поля .then(), который получал данные с Базы данных. 
	Из-за чего, для рендеринга использовалась переменная с значением undefined или Promise, когда как везло. А из-за того, что render() находился в блоке .then(),
	то выполнялась чёткая последовательность. И переменные были готовы к использованию в начале рендеринга страницы.
}

Version 5.8:{
	Не верно был написан код, в komputerRepository, что делало невозможным добавление/обновления данных в БД(Не верная последовательность кода).
}

Version 5.9:{
	Если дата была пуста/не пустая (в зависимости от генерируемой страницы [create/update]) то из-за выполнения ".toISOString().split('T')[0]" на undefined - выбивало ошибку.
	Будет добавлена конвертация выходных данных, перед отправкой как параметр в render() в Controller'e. 
	Общие моменты/участки кода в отдельные функции. 
}

Version 5.13:{
	Причина из-за которой не срабатывала проверка формы по стороне клиента	заключалась в том, что в блоке <div class="form-buttons">, 
	в <p id="errorSummary" class="errors-text"></p>, был "errorsSummary", a должен быть "errorSummary" (буз S внутри). Из-за чего JS-code не находил необходимый элемент 
	по id и останавливася с ошибкой. Но так как js-код  не был на прямую вклеин в html страницу, то инфо об exception'ов не отобрадалось в консоли.
	И ошибка в JS-коде была[сравнишь по двум commit'aм].
}
Version 5.19:{
	Изменю последовательность выполнения метода createElem in Repo: Create in FileSSystem image(id папки получит благодаря коду SQL[
		SELECT AUTO_INCREMENT
		FROM  INFORMATION_SCHEMA.TABLES
		WHERE TABLE_SCHEMA = 'tin-computer-state'
		AND   TABLE_NAME   = 'Element_komputera';
	]), then add all info into DataBase and return query promise  sql-code insert into.	
}

Version 5.23:{
	1. moveToUniqueDirectory() должен был возвращать Promise, благодаря которому можно получить targetPath to image.
	А так, получал но то ли не тот Promise, то ли вообще не Promise.
	2. Фотография нормально не отображается, так как путь относительно repository, а не формы.
}

Version 5.30:{
	Проверил через консольку [console.log] - какие типы ошибок приходят клиенту. И добавил такие ты в Joi errMessages.
}
Version 5.31:{
	Добавил функию reBuild(zestaw) в ZestawController, которая решает 1 и 2.
	Два трабла из-за которых отображалась пустая форма после проверки формы createNewZestaw:
	1. komputerId и elementId - передавлаись как поля zestawu, а должны были быть полямы zestaw = { komputer:{_id:1} i element:{_id:1} }; В zestaw'e 2 obj (komp i eleme),	
	a в кждом из obj - _id;
	2. Поля temperatura, szybkosc i t.d. - были неверно названы, поээтому form не могла найти эти поля. 
	3. При генерации <select > в form bpvtybk проверку на момент пустоты zestaw._id, так как при создании этого параметра и так не будет, будет только после создания.
	А он мешает выбору поля, который был выбран перед валидацией, и должен отобразиться валидации с иформацией о ошибке для клиента.
}
