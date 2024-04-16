-- Create table for authors
CREATE TABLE authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(100) NOT NULL
);

-- Create table for genres
CREATE TABLE genres (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    genre_name VARCHAR(50) NOT NULL
);

-- Create table for books
CREATE TABLE books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT,
    genre_id INT,
    ISBN VARCHAR(20),
    publication_year INT,
    category VARCHAR(50),
    total_books INT DEFAULT 1, -- Assuming each book entry starts with one copy
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
);

-- Create table for users
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    role ENUM('admin', 'user') DEFAULT 'user'
);

-- Create table for user activity logs
CREATE TABLE user_activity_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    activity_description TEXT,
    activity_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create table for user library
CREATE TABLE user_libraries (
    library_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create table for user library books
CREATE TABLE user_library_books (
    library_book_id INT AUTO_INCREMENT PRIMARY KEY,
    library_id INT,
    book_id INT,
    FOREIGN KEY (library_id) REFERENCES user_libraries(library_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);
