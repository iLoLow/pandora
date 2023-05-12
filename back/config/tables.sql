/* table users */

DROP TABLE users;

CREATE TABLE
    users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        avatar_url VARCHAR(255) NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT false,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

/* table annonces */

DROP TABLE annonces;

CREATE TABLE
    annonces (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description LONGTEXT NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        likes INT NOT NULL DEFAULT 0,
        liked_users LONGTEXT NOT NULL DEFAULT '[]',
        disliked_users LONGTEXT NOT NULL DEFAULT '[]',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        user_id VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        avatar_url VARCHAR(255) NOT NULL
    );

/* table boutique */

DROP TABLE boutique_items;

CREATE TABLE
    boutique_items(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name_article VARCHAR(255) NOT NULL,
        description LONGTEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        type_vehicule VARCHAR(255) NOT NULL,
        image_url LONGTEXT NOT NULL DEFAULT '[]',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    abonnements(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name_abonnement VARCHAR(255) NOT NULL,
        description LONGTEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image_url LONGTEXT NOT NULL DEFAULT '[]',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

/* table banner */

DROP TABLE banners;

CREATE TABLE
    banners(
        id INT AUTO_INCREMENT PRIMARY KEY,
        image_url VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

DROP TABLE webhooks;

CREATE TABLE
    webhooks(
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(255) NOT NULL,
        webhook_url VARCHAR(255) NOT NULL,
        server_id VARCHAR(255) NOT NULL,
        role_id VARCHAR(255) NOT NULL,
        active BOOLEAN NOT NULL DEFAULT false,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

DROP TABLE equipe;

CREATE TABLE
    equipe(
        id INT AUTO_INCREMENT PRIMARY KEY,
        pseudo_discord VARCHAR(255) NOT NULL,
        nom_prenom_rp VARCHAR(255) NOT NULL,
        fonction VARCHAR(255) NOT NULL,
        description LONGTEXT NOT NULL,
        avatar_url VARCHAR(255) NOT NULL,
        order_id INT,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

UPDATE equipe
SET order_id = LAST_INSERT_ID()
WHERE id = LAST_INSERT_ID();