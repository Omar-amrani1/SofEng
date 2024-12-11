-- MySQL dump 10.13  Distrib 9.1.0, for macos14 (arm64)
--
-- Host: localhost    Database: hss_smart_rentals
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `availability`
--

DROP TABLE IF EXISTS `availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `availability` (
  `room_id` int DEFAULT NULL,
  `property_id` int DEFAULT NULL,
  `status` enum('available','not available') NOT NULL,
  KEY `property_id` (`property_id`),
  CONSTRAINT `availability_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `availability`
--

LOCK TABLES `availability` WRITE;
/*!40000 ALTER TABLE `availability` DISABLE KEYS */;
INSERT INTO `availability` VALUES (1,1,'not available'),(2,1,'available'),(3,1,'available'),(4,1,'available'),(5,1,'available'),(1,2,'available'),(2,2,'not available'),(3,2,'available'),(4,2,'available'),(5,2,'available'),(1,3,'available'),(2,3,'available'),(3,3,'not available'),(4,3,'available'),(5,3,'available'),(1,4,'available'),(2,4,'available'),(3,4,'available'),(4,4,'not available'),(5,4,'available'),(1,5,'available'),(2,5,'available'),(3,5,'available'),(4,5,'available'),(5,5,'not available'),(1,6,'available'),(2,6,'available'),(3,6,'not available'),(4,6,'available'),(5,6,'available'),(1,7,'not available'),(2,7,'available'),(3,7,'available'),(4,7,'available'),(5,7,'available'),(1,8,'available'),(2,8,'not available'),(3,8,'available'),(4,8,'available'),(5,8,'available'),(1,9,'available'),(2,9,'available'),(3,9,'available'),(4,9,'not available'),(5,9,'available'),(1,10,'available'),(2,10,'available'),(3,10,'available'),(4,10,'available'),(5,10,'not available');
/*!40000 ALTER TABLE `availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property` (
  `property_id` int NOT NULL AUTO_INCREMENT,
  `location` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `bedrooms` int NOT NULL,
  `bathrooms` int NOT NULL,
  `ssh_features` text NOT NULL,
  PRIMARY KEY (`property_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES (1,'Birmingham',600.00,5,5,'SSH Hub, SSH Camera'),(2,'Birmingham',550.00,5,5,'SSH Hub'),(3,'Birmingham',640.00,5,5,'SSH Camera'),(4,'Birmingham',500.00,5,5,'SSH Hub'),(5,'London',850.00,5,5,'SSH Camera'),(6,'London',900.00,5,5,'SSH Console Table'),(7,'London',1050.00,5,5,'SSH Camera'),(8,'Manchester',1100.00,5,5,'SSH Hub'),(9,'Manchester',700.00,5,5,'SSH Hub'),(10,'Liverpool',660.00,5,5,'SSH Hub, SSH Camera');
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_ssh_device`
--

DROP TABLE IF EXISTS `property_ssh_device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_ssh_device` (
  `property_id` int DEFAULT NULL,
  `device_id` int DEFAULT NULL,
  KEY `property_id` (`property_id`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `property_ssh_device_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`),
  CONSTRAINT `property_ssh_device_ibfk_2` FOREIGN KEY (`device_id`) REFERENCES `ssh_device` (`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_ssh_device`
--

LOCK TABLES `property_ssh_device` WRITE;
/*!40000 ALTER TABLE `property_ssh_device` DISABLE KEYS */;
INSERT INTO `property_ssh_device` VALUES (1,1),(1,2),(2,1),(3,2),(4,1),(5,2),(6,3),(7,2),(8,1),(9,1),(10,1),(10,2);
/*!40000 ALTER TABLE `property_ssh_device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_id` int NOT NULL,
  `property_id` int NOT NULL,
  `status` enum('available','not available') NOT NULL,
  PRIMARY KEY (`property_id`,`room_id`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,1,'not available'),(2,1,'available'),(3,1,'available'),(4,1,'available'),(5,1,'available'),(1,2,'available'),(2,2,'not available'),(3,2,'available'),(4,2,'available'),(5,2,'available'),(1,3,'available'),(2,3,'available'),(3,3,'not available'),(4,3,'available'),(5,3,'available'),(1,4,'available'),(2,4,'available'),(3,4,'available'),(4,4,'not available'),(5,4,'available'),(1,5,'available'),(2,5,'available'),(3,5,'available'),(4,5,'available'),(5,5,'not available'),(1,6,'available'),(2,6,'available'),(3,6,'not available'),(4,6,'available'),(5,6,'available'),(1,7,'not available'),(2,7,'available'),(3,7,'available'),(4,7,'available'),(5,7,'available'),(1,8,'available'),(2,8,'not available'),(3,8,'available'),(4,8,'available'),(5,8,'available'),(1,9,'available'),(2,9,'available'),(3,9,'available'),(4,9,'not available'),(5,9,'available'),(1,10,'available'),(2,10,'available'),(3,10,'available'),(4,10,'available'),(5,10,'not available');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ssh_device`
--

DROP TABLE IF EXISTS `ssh_device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ssh_device` (
  `device_id` int NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  `benefits` text NOT NULL,
  PRIMARY KEY (`device_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ssh_device`
--

LOCK TABLES `ssh_device` WRITE;
/*!40000 ALTER TABLE `ssh_device` DISABLE KEYS */;
INSERT INTO `ssh_device` VALUES (1,'SSH Hub','Central hub for controlling all SSH devices'),(2,'SSH Camera','Monitor the property with real-time video feed'),(3,'SSH Console Table','A stylish console table with embedded SSH control');
/*!40000 ALTER TABLE `ssh_device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `contact_info` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `account_password` varchar(255) NOT NULL,
  `property_id` int DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `room_id` (`room_id`),
  KEY `user_ibfk_2` (`property_id`,`room_id`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`property_id`, `room_id`) REFERENCES `room` (`property_id`, `room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'John Doe','1234567890','john@example.com','password123',1,1),(2,'Jane Smith','2345678901','jane@example.com','password456',2,2),(3,'Jim Brown','3456789012','jim@example.com','password789',3,3),(4,'Jack White','4567890123','jack@example.com','password321',4,4),(5,'Jill Black','5678901234','jill@example.com','password654',5,5),(6,'Charlie Green','6789012345','charlie@example.com','password987',6,3),(7,'Chris Blue','7890123456','chris@example.com','password654',7,1),(8,'Catherine Red','8901234567','catherine@example.com','password321',8,2),(9,'Cameron Yellow','9012345678','cameron@example.com','password123',9,4),(10,'Claire Pink','0123456789','claire@example.com','password456',10,5),(20,'Omar Amrani','07936417457','omaramrani@gmail.com','omar123',NULL,NULL),(21,'guardiola','0512345678','xavialonso@gmail.com','ghano',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-06 15:58:12
