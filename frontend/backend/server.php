<?php

include 'config.php';
include 'database.php';
session_start();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action'])) {
        if ($_GET['action'] === 'fetchMovies') {
            include 'fetchMovies.php';
            exit;
        } elseif ($_GET['action'] === 'logout') {
            session_destroy();
            echo json_encode(['status' => 'success', 'message' => 'Logged out successfully']);
            exit;
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        if ($_POST['action'] === 'login') {
            include 'login.php';
            exit;
        } elseif ($_POST['action'] === 'postMovie') {
            include 'autoPost.php';
            exit;
        }
    }
}

echo json_encode(['status' => 'error', 'message' => 'Invalid request']);

?>