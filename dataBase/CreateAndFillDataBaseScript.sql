CREATE SCHEMA IF NOT EXISTS `tin-computer-state`;

CREATE TABLE IF NOT EXISTS `tin-computer-state`.`Element_komputera`
	( `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	  `nazwa` VARCHAR(100) NOT NULL,
	  `opis` TEXT NOT NULL,
	  `foto_Path` VARCHAR(MAX) NOT NULL,
	  PRIMARY KEY (`_id`),
	  UNIQUE INDEX `element_id_UNIQUE` (`_id` ASC )
	) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-computer-state`.`Komputer`
	( `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	  `model` VARCHAR(200) NOT NULL,
	  `zaintstalowany_System_Operacyjny` VARCHAR(100) NOT NULL,
	  `typ_Komputera` VARCHAR(100) NOT NULL,
	  `data_Stworzenia` DATETIME NOT NULL,
	  PRIMARY KEY (`_id`),
	  UNIQUE INDEX `computer_id_UNIQUE` (`_id` ASC)
	) ENGINE =  InnoDB CHARSET=utf8 COLLATE utf8_general_ci;
-- Делать относительно начально описаной БД.
CREATE TABLE IF NOT EXISTS `tin-computer-state`.`Zestaw_Elementow_Komputera`
	( `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	  `aktuakna_Temperatura` DECIMAL(10,2) NOT NULL,
	  `procent_Wykorzystanych_Zasobow` DECIMAL(3,2) NOT NULL,
	  `aktualna_Szybkosc_Przekazania_Danych` DECIMAL(3,2) NOT NULL,
	  `typPolaczenia` VARCHAR(100) NOT NULL,
	  `element_id` INT UNSIGNED NOT NULL,
	  `computer_id` INT UNSIGNED NOT NULL,
	  PRIMARY KEY (`_id`),
	  UNIQUE INDEX `zestaw_id_UNIQUE` (`_id` ASC),
	  CONSTRAINT `element_fk` FOREIGN KEY (`element_id`) REFERENCES `tin-computer-state`.`Element_komputera`,
	  CONSTRAINT `computer_dk` FOREIGN KEY (`computer_id`) REFERENCES `tin-computer-state`.`Komputer` (`_id`)
	) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

INSERT IGNORE INTO `tin-computer-state`.`Element_komputera`(`_id`, `nazwa`, `opis`, `foto_Path`)
	VALUES
	(1, `Gigabyte GeForce GTX 1660 SUPER OC 6GB GDDR6`, `Przygotuj się na szybki i niezawodny gaming o wyjątkowych efektach graficznych, z nowymi układami w architekturze NVIDIA Turing. Gigabyte GeForce GTX 1660 SUPER OC to fabrycznie podkręcania konstrukcja wyposażona w 6GB pamięci GDDR6 oraz 192-bitowy interfejs pamięci. Wydajne chłodzenie Windforce 2X zadba o optymalne temperatury, jednocześnie wyłączając się podczas mniej obciążających GPU zadań. Całą konstrukcję dodatkowo usztywnia od spodu stylowy backplate. Sprawdź, jak Gigabyte GeForce GTX 1660 SUPER OC wygląda w rzeczywistości. Chwyć zdjęcie poniżej i przeciągnij je w lewo lub prawo aby obrócić produkt lub skorzystaj z przycisków nawigacyjnych.`, `https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2019/10/pr_2019_10_25_13_53_0_788_06.jpg`),
	(2, `AMD Ryzen 5 3600 3,6GHz BOX (100-100000031BOX)`, `Typ i model procesora AMD Ryzen 5 3600. Typ gniazda (socket) socket - AM4 Liczba rdzeni 6 Liczba wątków 12 Częstotliwość t aktowania 3,6 - 4,2 GHz Zintegrowany układ graficzny nie posiada Odblokowany mnożnik tak Pamięć podręczna Cache L2 3 MB Pamięć podręczna Cache L3 32 MB Proces technologiczny 7 nm Architektura 64-bit tak Pobór mocy 65 W`, `https://image.ceneostatic.pl/data/products/83359603/i-amd-ryzen-5-3600-3-6ghz-box-100-100000031box.jpg`)
	(3, `MSI MPG Z490 GAMING PLUS`, `Graj ze stylem i zwyciężaj dzięki płycie głównej MSI MPG Z490 GAMING PLUS. To unikalna konstrukcja wyposażona w socket LGA 1200, pozwalający Ci wykorzystać moc nowych procesorów Intel Core 10. generacji. W połączeniu z pamięciami RAM DDR4 o taktowaniu nawet 4800 MHz (OC) oraz szybkimi dyskami SSD NVMe, zyskasz wydajność jakiej potrzebujesz. A stylowy design uzupełniony o podświetlenie RGB Mystic Light doskonale odnajdzie się w każdej obudowie.`,`https://cdn.x-kom.pl/i/setup/images/prod/big/product-large,,2020/5/pr_2020_5_5_21_26_6_576_00.jpg`)
	;

INSERT IGNORE INTO `tin-computer-state`.`Komputer`( `_id`, `model`, `zaintstalowany_System_Operacyjny`, `typ_Komputera`, `data_Stworzenia`)
	VALUES
	(1, `Jaguar 3000`, `Tornado 6.1.0`, `Komputer stacjonarny`, `2017-06-01`),
	(2, `Actina by Corsair`, `Windows NT 3.5 Server`, `Monoblok`, `2012-02-20`)
	;

INSERT IGNORE INTO `tin-computer-state`.`Zestaw_Elementow_Komputera`( `_id`, `aktuakna_Temperatura`, `procent_Wykorzystanych_Zasobow`, `aktualna_Szybkosc_Przekazania_Danych`,`typPolaczenia`,`element_id`,`computer_id`)
	VALUES
	(1, 56, 15, 0.4,`Przewodowy`, 1, 1),
	(2, 60, 20, 1, `Bezprzewodowy`, 2,2)
	;
