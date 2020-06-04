-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 04, 2020 alle 04:35
-- Versione del server: 10.4.11-MariaDB
-- Versione PHP: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `amazon_project`
--
CREATE DATABASE IF NOT EXISTS `amazon_project` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `amazon_project`;

-- --------------------------------------------------------

--
-- Struttura della tabella `accessori`
--

CREATE TABLE `accessori` (
  `id` int(32) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `colore` varchar(50) NOT NULL,
  `lunghezza(cm)` int(32) NOT NULL,
  `larghezza(cm)` int(32) NOT NULL,
  `imgPath` varchar(50) NOT NULL,
  `prezzo` int(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `accessori`
--

INSERT INTO `accessori` (`id`, `nome`, `categoria`, `colore`, `lunghezza(cm)`, `larghezza(cm)`, `imgPath`, `prezzo`) VALUES
(1, 'amazon_echo', 'elettronica', 'grigio', 10, 8, 'img/accessori/amazon_echo.jpg', 40),
(2, 'amazon_echo_plus', 'elettronica', 'grigio', 20, 8, 'img/accessori/amazon_echo_plus.jpg', 60),
(3, 'L\'ottmista Impaziente Bill Gates ', 'Libro', 'nero', 8, 5, 'img/accessori/bill_gates_libro.jpg', 20),
(4, 'Cassa Bluetooth JBL ', 'elettronica', 'nero', 20, 7, 'img/accessori/cassa_bluethoot.jpg', 70),
(5, 'Cover Iphone 10 xs ', 'Informatica', 'nero-bianco', 10, 5, 'img/accessori/cover_iphone.jpg', 10),
(6, 'cuffie Wireless JBL', 'elettronica', 'rosso', 10, 8, 'img/accessori/cuffie_jbl.jpg', 30),
(7, 'Dondolo giardino Casa', 'casa', 'bianco', 180, 120, 'img/accessori/dondolo_giardino_casa.jpg', 300),
(8, 'Elon Musk ', 'Libro', 'nero-arancione', 13, 7, 'img/accessori/elon_musk_libro.jpg', 20),
(9, 'Mobili', 'casa', 'bianco', 90, 50, 'img/accessori/mobili_casa.jpg', 80),
(10, 'Poggia Telefono', 'informatica', 'grigio', 10, 14, 'img/accessori/poggia_telefono.jpg', 10),
(11, 'Scrivania Ufficio', 'casa', 'nero', 120, 80, 'img/accessori/scrivania_casa.jpg', 160),
(12, 'Divano Giardino', 'casa', 'grigio', 110, 60, 'img/accessori/sofa_giardino.jpg', 360),
(13, 'ssd 1TB', 'informatica', 'nero', 10, 5, 'img/accessori/ssd_1TB.jpg', 130),
(14, 'ssd 2TB', 'informatica', 'nero', 15, 10, 'img/accessori/ssd_2TB.jpg', 460),
(15, 'ssd 550GB', 'informatica', 'nero', 12, 7, 'img/accessori/ssd_550gb.jpg', 60),
(16, 'USB 64 gb', 'informatica', 'grigio', 7, 3, 'img/accessori/usb_64gb.jpg', 40),
(17, 'USB 128GB', 'informatica', 'nero', 7, 3, 'img/accessori/usb_128gb.jpg', 70),
(18, 'IL METODO DI WARREN BUFFETT', 'Libro', 'giallo', 20, 10, 'img/accessori/warren_buffett_libro.jpg', 30);

-- --------------------------------------------------------

--
-- Struttura della tabella `credentials`
--

CREATE TABLE `credentials` (
  `id` int(11) NOT NULL,
  `cognome` varchar(50) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `indirizzo` varchar(100) NOT NULL,
  `telefono` int(15) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `pwd` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `credentials`
--

INSERT INTO `credentials` (`id`, `cognome`, `nome`, `indirizzo`, `telefono`, `mail`, `username`, `pwd`) VALUES
(4, 'rathore', 'OMKAR', 'Regione Brignola 209/a', 2147483647, 'o.rathore.0773@vallauri.edu', 'omkar', '68115705108ddd6f7ba9a458bb175363');

-- --------------------------------------------------------

--
-- Struttura della tabella `informatica`
--

CREATE TABLE `informatica` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `modello` varchar(50) NOT NULL,
  `ram` varchar(50) NOT NULL,
  `ssd` varchar(50) NOT NULL,
  `processore` varchar(50) NOT NULL,
  `risoluzione` varchar(50) NOT NULL,
  `peso(kg)` int(64) NOT NULL,
  `imgPath` varchar(50) NOT NULL,
  `prezzo` double(64,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `informatica`
--

INSERT INTO `informatica` (`id`, `nome`, `modello`, `ram`, `ssd`, `processore`, `risoluzione`, `peso(kg)`, `imgPath`, `prezzo`) VALUES
(1, 'MACBOOK PRO 13\'\'', '2017', '8GB ', '256GB', 'Intel Core i5 quad‑core a 1,4GHz (Turbo Boost fino', '2560*1600 a 227pixel', 2, 'img/informatica/macbook_pro.jpg', 1500),
(2, 'Apple Macbook Air 13', '2020', '8GB ', '1TB', 'Intel Core i3 dual‑core di decimo generazione a 1,', '2560*1600 240pixel', 1, 'img/informatica/macbook_air.jpg', 1199),
(3, 'DELL XPS 15 ', '9570 (2019) ', '16GB', '1TB', ' Intel® Core™ i9 di ottava generazione i9-8950HK d', '1920*1080 ', 2, 'img/informatica/dell-xps-15.jpg', 2499),
(4, 'MICROSOFT SURFACE PRO X', '2020 portatile 2-in-1', '8GB', '128GB', 'Intel Core 10^gen 3GHz', '1920*1080 ', 1, 'img/informatica/surface_pro_7.jpg', 1199),
(5, 'MICROSOFT SURFACE LAPTOP 3  13 Pollici', '2020', '8GB', '128GB', 'Intel CoreTM i5-1035G7 10th gen 1.2Ghz', '2560*1440', 2, 'img/informatica/surface_laptop.jpg', 1082),
(6, 'Lenovo Yoga ', '530 (2018)', '8GB ', '256GB', 'AMD A8 Ryzen  3.4 GHz', '1920*1080 ', 1, 'img/informatica/Lenovo_Yoga.jpg', 699),
(7, 'Ipad Pro', '2020 WI-FI 4^ Generazione', '12GB', '1TB', 'Chip A12X Bionic con architettura a 64 bit, Neural', '2560*1440', 2, 'img/informatica/Ipad-pro.jpg', 1299);

-- --------------------------------------------------------

--
-- Struttura della tabella `libri`
--

CREATE TABLE `libri` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `colore` varchar(50) NOT NULL,
  `pagine` int(32) NOT NULL,
  `genere` varchar(50) NOT NULL,
  `imgPath` varchar(50) NOT NULL,
  `prezzo` int(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `libri`
--

INSERT INTO `libri` (`id`, `nome`, `colore`, `pagine`, `genere`, `imgPath`, `prezzo`) VALUES
(1, 'La ragazza del neve', 'azzurro', 352, 'Storica', 'img/libri/la-ragazza-del-neve.jpg', 5),
(2, 'Steve Jobs', 'bianco-nero', 648, 'biografia', 'img/libri/steve-jobs.jpg', 16),
(3, 'Elon Musk ', 'nero', 350, 'biografia', 'img/libri/elon_musk.jpg', 24),
(4, 'La fiamma nel buio', 'viola-tramonto', 393, 'giallo', 'img/libri/la-fiamma-nel-buio.jpg', 19),
(5, 'Nel mare ci sono i coccodrilli', 'blu', 151, 'romanzo ', 'img/libri/nel-mare-ci-sono-i-coccodrilli.jpg', 11);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `accessori`
--
ALTER TABLE `accessori`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `credentials`
--
ALTER TABLE `credentials`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `informatica`
--
ALTER TABLE `informatica`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `libri`
--
ALTER TABLE `libri`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `accessori`
--
ALTER TABLE `accessori`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT per la tabella `credentials`
--
ALTER TABLE `credentials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `informatica`
--
ALTER TABLE `informatica`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT per la tabella `libri`
--
ALTER TABLE `libri`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
