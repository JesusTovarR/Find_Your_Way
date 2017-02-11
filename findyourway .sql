-- Adminer 4.2.5 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `chemin`;
CREATE TABLE `chemin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_dest_finale` int(11) NOT NULL,
  `id_lieu1` int(11) NOT NULL,
  `id_lieu2` int(11) NOT NULL,
  `id_lieu3` int(11) NOT NULL,
  `id_lieu4` int(11) NOT NULL,
  `id_lieu5` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_dest_finale` (`id_dest_finale`),
  KEY `id_lieu1` (`id_lieu1`),
  KEY `id_lieu2` (`id_lieu2`),
  KEY `id_lieu3` (`id_lieu3`),
  KEY `id_lieu4` (`id_lieu4`),
  KEY `id_lieu5` (`id_lieu5`),
  CONSTRAINT `chemin_ibfk_1` FOREIGN KEY (`id_dest_finale`) REFERENCES `lieu` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chemin_ibfk_2` FOREIGN KEY (`id_lieu1`) REFERENCES `lieu` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chemin_ibfk_3` FOREIGN KEY (`id_lieu2`) REFERENCES `lieu` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chemin_ibfk_4` FOREIGN KEY (`id_lieu3`) REFERENCES `lieu` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chemin_ibfk_5` FOREIGN KEY (`id_lieu4`) REFERENCES `lieu` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chemin_ibfk_6` FOREIGN KEY (`id_lieu5`) REFERENCES `lieu` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `chemin` (`id`, `id_dest_finale`, `id_lieu1`, `id_lieu2`, `id_lieu3`, `id_lieu4`, `id_lieu5`) VALUES
(27,	2,	6,	5,	6,	1,	4),
(28,	2,	5,	4,	1,	1,	4),
(29,	1,	4,	4,	4,	5,	3),
(30,	2,	3,	4,	4,	6,	3),
(31,	2,	6,	3,	5,	6,	5),
(32,	2,	3,	3,	6,	5,	4),
(33,	2,	4,	5,	6,	1,	6),
(35,	2,	3,	4,	1,	6,	5),
(36,	2,	6,	1,	4,	3,	5),
(37,	2,	3,	1,	5,	6,	4),
(38,	1,	5,	2,	3,	4,	6),
(39,	1,	2,	5,	4,	6,	3),
(40,	2,	1,	3,	6,	4,	5),
(41,	1,	4,	6,	2,	3,	5),
(42,	1,	2,	5,	6,	4,	3),
(43,	2,	4,	3,	1,	5,	6),
(44,	2,	5,	3,	1,	4,	6),
(45,	1,	6,	5,	2,	4,	3),
(46,	2,	6,	4,	1,	3,	5),
(47,	1,	4,	2,	6,	5,	3),
(48,	1,	4,	2,	5,	6,	3),
(49,	1,	6,	2,	5,	4,	3),
(50,	1,	3,	2,	6,	4,	5),
(51,	1,	4,	2,	5,	3,	6),
(52,	2,	3,	6,	5,	4,	1),
(53,	1,	4,	6,	2,	5,	3),
(54,	1,	4,	5,	3,	2,	6),
(55,	2,	4,	1,	3,	6,	5),
(56,	1,	6,	2,	4,	5,	3),
(57,	2,	1,	6,	4,	5,	3),
(58,	2,	1,	6,	4,	5,	3),
(59,	2,	4,	5,	1,	3,	6),
(60,	2,	4,	6,	1,	3,	5),
(61,	2,	3,	1,	4,	6,	5),
(62,	2,	1,	4,	5,	3,	6),
(63,	2,	4,	1,	3,	6,	5),
(64,	1,	4,	2,	3,	5,	6),
(65,	1,	6,	2,	3,	5,	4),
(66,	1,	2,	3,	6,	4,	5);

DROP TABLE IF EXISTS `lieu`;
CREATE TABLE `lieu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom_lieu` varchar(150) NOT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL,
  `indication` varchar(150) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `image` varchar(200) NOT NULL,
  `indice1` varchar(150) DEFAULT NULL,
  `indice2` varchar(150) DEFAULT NULL,
  `indice3` varchar(150) DEFAULT NULL,
  `indice4` varchar(150) DEFAULT NULL,
  `indice5` varchar(150) DEFAULT NULL,
  `dest_finale` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `lieu` (`id`, `nom_lieu`, `lat`, `lng`, `indication`, `description`, `image`, `indice1`, `indice2`, `indice3`, `indice4`, `indice5`, `dest_finale`) VALUES
(1,	'Arc du triomphe',	48.8738,	48.8738,	'Ça a bien failli être un projet un peu fou: celui d’un éléphant gigantesque dont l’intérieur serait aménagé en musée à la gloire de l’Empereur',	'l&#39;Arc de Triomphe, dont la construction, décidée par l&#39;empereur Napoléon Ier, débuta en 1806 et s&#39;acheva en 1836 sous Louis-Philippe, est situé à Paris, dans le 8e arrondissement. Il s&#39;élève au centre de la place Charles-de-Gaulle',	'img/Arc_Triomphe.jpg',	'Ce type d&#39;ouvrages est un des éléments les plus caractéristiques de l&#39;architecture romaine',	'Utilisé pour commémorer les généraux victorieux',	'Utilisé pour commémorer les évènements importants comme le décès d&#39;un membre de la famille impériale',	'À l&#39;origine, lls sont des structures temporaires en bois. Ils sont ensuite réalisés en pierre',	'Sous sa forme la plus simple,ils se composent de deux piliers, massifs de maçonnerie supportés par des piédestaux',	1),
(2,	'Besançon',	47.2378,	6.02405,	'Prefecture du Doubs',	NULL,	'img/Besancon.jpg',	'Elle est entourée de collines et est traversée par le Doubs.',	'Réputée pour ses fortifications dessinées par Vauban',	'Ses habitants sont appelés les Bisontins',	'Parfois appelé Besac',	'Victor Hugo y a vu le jour',	1),
(3,	'Bordeaux',	44.8378,	-0.57918,	'Ville de l\'Ouest qui donne son nom à un vin',	NULL,	'img/Bordeaux.jpg',	'Zinedine Zidan à joué dans le club de cette ville',	'Réputée pour sa Place de la Bourse et son Miroir d\'eau',	'Michel de Montaigne en a été le maire',	'Nommée Burdigala durant l\'époque romaine',	'Ville de naissance de Montesquieu',	1),
(4,	'Nantes',	47.2184,	-1.55362,	'Surnommée la cité des Ducs de Bretagne',	NULL,	'img/Elephant_Nantes.jpg',	NULL,	NULL,	NULL,	NULL,	NULL,	0),
(5,	'Dijon',	47.3238,	5.03861,	'Sa moutarde est très connue',	NULL,	'img/Dijon.jpg',	NULL,	NULL,	NULL,	NULL,	NULL,	0),
(6,	'Limoges',	45.8336,	1.2611,	'Réputée pour sa porcelaine',	NULL,	'img/Limoges.jpg',	NULL,	NULL,	NULL,	NULL,	NULL,	0),
(7,	'Marseille',	43.3,	5.4,	'Appelée également la Citée Phocéenne',	NULL,	'',	'Sa basilique Notre-Dame-De-La-Garde domine la ville',	'Connue pour son Vieux-port',	'Ville d\'origine du groupe de rap IAM',	'Fernandel y est né',	'Le Pastis est la boisson emblematique de la ville',	1),
(8,	'Lyon',	45.764,	4.835,	'Ses habitants sont surnommés les Gones',	NULL,	'',	'Les pentes de La croix rousse, situées dans cette ville, sont classées au patrimoine mondiale de l\'UNESCO',	'On y trouve le siège d\'Interpol',	'La ville des lumières',	'Autrefois appelée Lugdunum',	'Ville de naissance d\'Antoine de Saint-Exupery',	1);

DROP TABLE IF EXISTS `partie`;
CREATE TABLE `partie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `distanceDF` float NOT NULL,
  `score` int(11) NOT NULL,
  `id_chemin` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_chemin` (`id_chemin`),
  CONSTRAINT `partie_ibfk_1` FOREIGN KEY (`id_chemin`) REFERENCES `chemin` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `partie` (`id`, `token`, `distanceDF`, `score`, `id_chemin`) VALUES
(11,	'1jt9h29n7pz7z3qfcfxb1fdppic9ks7x',	100,	0,	28),
(12,	'lv41lpjdvlvwn4qp5awpaz3w2jux2pqw',	100,	0,	29),
(13,	'r6xtnv3v832ipvlgzvvr1btcqutozbo6',	100,	0,	30),
(14,	'mxqy8nmkmgojid375m1em9sinaoa6t32',	100,	0,	31),
(15,	'v9mndw1md8knd1orfeepmv6krgfpy2y1',	100,	0,	32),
(16,	'dpigjk4vxjqoap54fgudstm9spa9zoqk',	100,	0,	33),
(17,	'tl9ohxdxwv9juuhl8xdwwm5lx15mwafq',	100,	0,	35),
(18,	'mten1q28d31gstkxvdvnba39kvgegpx1',	100,	0,	36),
(19,	'mt2a8c24djutjptwofof25eju69i886v',	100,	0,	37),
(20,	'h8lr8zb7zk6b2krr5e4t4r1hevwjp6ov',	100,	0,	38),
(21,	'dd13pkfvwq7rbla3n242qb45b4dr4leu',	100,	0,	39),
(22,	'sxldqrdewmsv625zwwzj58op4p81t5fd',	100,	0,	40),
(23,	'ljs9lmb7lh2vzvr96fplciklhn11nall',	100,	0,	41),
(24,	'rljhcczreg2arr5kxq4zw78dtgnbrqgm',	100,	0,	42),
(25,	'6no4zipyi3u376a2majaubt5aafcv4v7',	100,	0,	43),
(26,	'gmotgo2aawwfijjazddt2dhhhcw7yikw',	100,	0,	44),
(27,	'su9mj2tzezcb6trzqmvm241wlbo3vfs1',	100,	0,	45),
(28,	's6d5xjzmqqgvl63c8hri8o5xq75mrjf3',	100,	0,	46),
(29,	'sbrj1z8xwvqdrtdl8o4ohchncja5xorh',	100,	0,	47),
(30,	'tj6rmfcezxz712tsunejm4nq4erobzi7',	100,	0,	48),
(31,	'9luxia9epjoexbtlc72uv5xrqqctce7q',	100,	0,	49),
(32,	'nagp1memjmi9s3juoxmbpniqr6piwljz',	100,	0,	50),
(33,	'liqnk4wzu87ptf7v8ooi32t7gp2583z1',	100,	0,	51),
(34,	'f2zs21zxyi1bp8adjzsgw12qyxgtm49q',	100,	0,	52),
(35,	'b5xlasu1eadg8ve19uveue6owps3ik3e',	100,	0,	53),
(36,	'8rizjn936no19cmxh8nlz72lp9yi2a54',	100,	0,	54),
(37,	'mxilm8cuizg4u13wsuokpd1c9np7mbbb',	100,	0,	55),
(38,	'trn3ujho2nk8wca4posbexqeorov9nwx',	100,	0,	56),
(39,	'nrbhxdj656w5j835p3j2g83s8mbbg9i3',	100,	0,	57),
(40,	'zy4jr28ptmasv4nyxtiiwfjvkvczaguw',	100,	0,	58),
(41,	'6y2h6ssrs5tf98kp9t2ljb4j2lb196jz',	100,	0,	59),
(42,	'afpccb9gpvxvjgvuiapxoirnwwr7kz2z',	100,	0,	60),
(43,	'cihc1oxg4oxwdniso2m4yi8vlkaewbd1',	100,	0,	61),
(44,	'vgk7ll1e1up5zxof7hg33qb21zradb2c',	100,	0,	62),
(45,	'8lkceuja2lv15ivb2q5pzwdrrdgyb5fu',	5000,	0,	63),
(46,	'dbcpmhqslah1cry616jf7s936tanh81p',	5000,	0,	64),
(47,	'2im6y8n8m1n1ft7zubtuftjntjf2579p',	5000,	0,	65),
(48,	'ut23lsl89ved2rzcipv8bfiqo3oh14vb',	5000,	0,	66);

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE `utilisateur` (
  `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `nv_droit` int(11) NOT NULL,
  PRIMARY KEY (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- 2017-02-10 22:38:40
