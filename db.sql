-- MySQL dump 10.13  Distrib 5.7.16, for Win64 (x86_64)
--
-- Host: localhost    Database: warehouse
-- ------------------------------------------------------
-- Server version	5.7.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES gbk */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `warehouse`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `warehouse` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */;

USE `warehouse`;

--
-- Table structure for table `cargo`
--

DROP TABLE IF EXISTS `cargo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cargo` (
  `cargoid` int(11) NOT NULL AUTO_INCREMENT,
  `cargoname` varchar(64) COLLATE utf8mb4_bin DEFAULT NULL,
  `cargovalue` double DEFAULT NULL,
  `cargoisvalid` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`cargoid`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargo`
--

LOCK TABLES `cargo` WRITE;
/*!40000 ALTER TABLE `cargo` DISABLE KEYS */;
INSERT INTO `cargo` VALUES (1,'可口可乐箱(240mlx12)',21.5,0),(2,'雪碧箱(240mlx12)',21.5,1),(3,'康师傅红烧牛肉面五连包',12.5,1),(4,'康师傅老坛酸菜牛肉面五连包',12.5,1),(5,'奥利奥巧脆卷香草味55g',3.8,1),(6,'奥利奥巧脆卷巧克力口味威化饼干55g',4.3,1),(7,'奥利奥夹心巧克力味饼干390g',16.4,1),(8,'可口可乐箱(240mlx12)',21.5,1),(12,'傻逼',0,0),(15,'货物名称',0,0),(17,'可比克 番茄味 薯片 60g',4.9,1),(18,'旺旺 仙贝 加量装 540g?',17.5,1),(19,'卫龙?大面筋（辣条） 116g/袋?',2.5,1);
/*!40000 ALTER TABLE `cargo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cargotype`
--

DROP TABLE IF EXISTS `cargotype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cargotype` (
  `cargotypeid` int(11) NOT NULL AUTO_INCREMENT,
  `cargotypename` varchar(64) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`cargotypeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargotype`
--

LOCK TABLES `cargotype` WRITE;
/*!40000 ALTER TABLE `cargotype` DISABLE KEYS */;
/*!40000 ALTER TABLE `cargotype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list_cargo`
--

DROP TABLE IF EXISTS `list_cargo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `list_cargo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listid` int(11) DEFAULT NULL,
  `cargoid` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_cargo`
--

LOCK TABLES `list_cargo` WRITE;
/*!40000 ALTER TABLE `list_cargo` DISABLE KEYS */;
INSERT INTO `list_cargo` VALUES (1,1,4,3),(2,2,5,2),(3,2,7,3),(7,26,2,1),(8,27,8,1),(9,28,8,1),(10,29,8,1),(12,31,3,1),(13,32,19,10),(14,32,18,20),(15,33,7,1),(16,34,19,10),(17,35,18,20);
/*!40000 ALTER TABLE `list_cargo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packinglist`
--

DROP TABLE IF EXISTS `packinglist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `packinglist` (
  `listid` int(11) NOT NULL AUTO_INCREMENT,
  `listdate` datetime DEFAULT NULL,
  `listtype` tinyint(4) DEFAULT NULL,
  `listoperator` varchar(64) COLLATE utf8mb4_bin DEFAULT NULL,
  `listremark` varchar(128) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`listid`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packinglist`
--

LOCK TABLES `packinglist` WRITE;
/*!40000 ALTER TABLE `packinglist` DISABLE KEYS */;
INSERT INTO `packinglist` VALUES (1,'2016-11-01 00:00:37',1,'admin','正常'),(2,'2016-11-01 00:47:19',1,'admin','正常'),(26,'2016-11-03 02:34:01',0,'admin','1'),(27,'2016-11-03 12:08:30',0,'admin','1'),(28,'2016-11-03 12:08:41',0,'admin','1'),(29,'2016-11-03 12:09:03',0,'admin','1'),(31,'2016-11-03 12:41:41',1,'admin','1'),(32,'2016-11-03 14:55:43',0,NULL,'1'),(33,'2016-11-03 14:56:59',0,'admin','1'),(34,'2016-11-03 14:59:28',1,'admin','备注：正常'),(35,'2016-11-03 15:01:06',1,'admin','备注：正常');
/*!40000 ALTER TABLE `packinglist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('21YKMMv3wTMlEsPUcuFfkl-FgpiO0J3s',1478243455,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"logined\":true,\"username\":\"admin\"}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storage`
--

DROP TABLE IF EXISTS `storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storage` (
  `storageid` int(11) NOT NULL AUTO_INCREMENT,
  `cargoid` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`storageid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storage`
--

LOCK TABLES `storage` WRITE;
/*!40000 ALTER TABLE `storage` DISABLE KEYS */;
INSERT INTO `storage` VALUES (1,3,2),(2,4,5),(3,8,2),(6,7,1);
/*!40000 ALTER TABLE `storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) COLLATE utf8mb4_bin DEFAULT NULL,
  `password` varchar(32) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `unique_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin');
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

-- Dump completed on 2016-11-03 15:16:14
