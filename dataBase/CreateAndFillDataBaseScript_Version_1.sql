CREATE SCHEMA IF NOT EXISTS `tin-computer-state`;

CREATE TABLE IF NOT EXISTS `tin-computer-state`.`Element_komputera`
	( `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	  `nazwa` VARCHAR(100) NOT NULL,
	  `opis` TEXT NOT NULL,
	  `fotoPath` VARCHAR(MAX) NOT NULL,
	  PRIMARY KEY (`idElementa`),
	  UNIQUE INDEX `element_id_UNIQUE` (`_id` ASC )
	) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-computer-state`.`Komputer`
	( `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	  `model` VARCHAR(200) NOT NULL,
	  `zaintstalowanySystemOperacyjny` VARCHAR(100) NOT NULL,
	  `typKomputera` VARCHAR(100) NOT NULL,
	  `dataStworzenia` DATETIME NOT NULL,
	  PRIMARY KEY (`_id`),
	  UNIQUE INDEX `computer_id_UNIQUE` (`_id` ASC)
	) ENGINE =  InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-computer-state`.`Zestaw_Elementow_Komputera`
	( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	  `aktuaknaTemperatura` DECIMAL(10,2) NOT NULL,
	  `procentWykorzystanychZasobow` DECIMAL(3,2) NOT NULL,
	  `

