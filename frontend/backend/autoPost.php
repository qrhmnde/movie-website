<?php

include 'config.php';

// Function to send a message to Telegram channel
function sendMessageToTelegram($message) {
    $url = API_URL . "sendMessage";
    
    $data = [
        'chat_id' => CHAT_ID,
        'text' => $message,
        'parse_mode' => 'HTML'
    ];
    
    $options = [
        'http' => [
            'header'  => "Content-Type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data)
        ]
    ];
    
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    return $result;
}

// Example: Auto-posting a movie
$movieTitle = "🔥 New Movie Available! 🔥";
$movieLink = "https://t.me/c/" . CHAT_ID . "/1"; // Replace with actual message ID
$message = "$movieTitle\nWatch Now: <a href='$movieLink'>Click Here</a>";

$response = sendMessageToTelegram($message);
echo "Movie Auto-Posted! Response: " . $response;

?>
