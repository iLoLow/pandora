-- SQLBook: Code

DROP TABLE users;

DROP TABLE annonces;

/* Création de la table users */

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

/* Création de la table annonces */

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

/* Création de la table boutique */

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

/* Création de la table banner */

CREATE TABLE
    banners(
        id INT AUTO_INCREMENT PRIMARY KEY,
        image_url VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    Webhooks(
        id INT AUTO_INCREMENT PRIMARY KEY,
        webhook_url VARCHAR(255) NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT false,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );