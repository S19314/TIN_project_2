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
