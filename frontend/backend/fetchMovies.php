<?php

include 'config.php';

// Function to fetch updates from Telegram channel
function fetchMoviesFromTelegram() {
    $url = API_URL . "getUpdates";
    
    $response = file_get_contents($url);
    $updates = json_decode($response, true);
    
    $movies = [];
    
    if (isset($updates['result'])) {
        foreach ($updates['result'] as $update) {
            if (isset($update['message']['text']) && isset($update['message']['chat']['id']) && $update['message']['chat']['id'] == CHAT_ID) {
                $movies[] = [
                    'title' => $update['message']['text'],
                    'link'  => "https://t.me/c/" . CHAT_ID . "/" . $update['message']['message_id']
                ];
            }
        }
    }
    
    return $movies;
}

// Fetch movies and display them as JSON
$movies = fetchMoviesFromTelegram();
header('Content-Type: application/json');
echo json_encode($movies);

?>