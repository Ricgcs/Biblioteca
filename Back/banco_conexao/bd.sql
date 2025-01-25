-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb3 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`acervo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`acervo` (
  `cod` INT NOT NULL AUTO_INCREMENT,
  `nome_obra` VARCHAR(45) NOT NULL,
  `nome_autor` VARCHAR(45) NOT NULL,
  `genero` VARCHAR(45) NOT NULL,
  `qtd_paginas` VARCHAR(45) NOT NULL,
  `quantidade` INT NULL DEFAULT NULL,
  `popularidade` INT NULL DEFAULT NULL,
  `avaliacao_aluno` DECIMAL(10,4) NULL DEFAULT NULL,
  PRIMARY KEY (`cod`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`aluno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`aluno` (
  `cod` INT NOT NULL AUTO_INCREMENT,
  `Nome_escola` VARCHAR(45) NOT NULL,
  `Nome` VARCHAR(45) NOT NULL,
  `Nome_sala` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(255) NOT NULL,
  `Senha` VARCHAR(45) NOT NULL,
  `Alunocol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cod`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`escola`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`escola` (
  `cod` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Senha` VARCHAR(45) NOT NULL,
  `img` LONGBLOB NULL DEFAULT NULL,
  PRIMARY KEY (`cod`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`emprestimo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`emprestimo` (
  `cod` INT NOT NULL AUTO_INCREMENT,
  `Acervo_cod` INT NOT NULL,
  `Escola_cod` INT NOT NULL,
  `Aluno_cod` INT NOT NULL,
  `Data` DATE NOT NULL,
  PRIMARY KEY (`cod`, `Acervo_cod`, `Escola_cod`, `Aluno_cod`),
  INDEX `fk_emprestimo_Acervo1_idx` (`Acervo_cod` ASC) VISIBLE,
  INDEX `fk_emprestimo_Escola1_idx` (`Escola_cod` ASC) VISIBLE,
  INDEX `fk_emprestimo_Aluno1_idx` (`Aluno_cod` ASC) VISIBLE,
  CONSTRAINT `fk_emprestimo_Acervo1`
    FOREIGN KEY (`Acervo_cod`)
    REFERENCES `mydb`.`acervo` (`cod`),
  CONSTRAINT `fk_emprestimo_Aluno1`
    FOREIGN KEY (`Aluno_cod`)
    REFERENCES `mydb`.`aluno` (`cod`),
  CONSTRAINT `fk_emprestimo_Escola1`
    FOREIGN KEY (`Escola_cod`)
    REFERENCES `mydb`.`escola` (`cod`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`generos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`generos` (
  `cod` INT NOT NULL AUTO_INCREMENT,
  `nome_escola` VARCHAR(225) NOT NULL,
  `Nome` VARCHAR(225) NOT NULL,
  `Descricao` VARCHAR(225) NOT NULL,
  `imagem` LONGBLOB NOT NULL,
  PRIMARY KEY (`cod`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`professor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`professor` (
  `cod` INT NOT NULL AUTO_INCREMENT,
  `Escola_cod` INT NOT NULL,
  `nome` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `materia` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cod`, `Escola_cod`),
  INDEX `fk_Professor_Escola1_idx` (`Escola_cod` ASC) VISIBLE,
  CONSTRAINT `fk_Professor_Escola1`
    FOREIGN KEY (`Escola_cod`)
    REFERENCES `mydb`.`escola` (`cod`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`sala`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`sala` (
  `cod` INT NOT NULL AUTO_INCREMENT,
  `Nome_escola` VARCHAR(255) NOT NULL,
  `Nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cod`))
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
