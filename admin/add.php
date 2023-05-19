<?php
// GitHub repository information
$owner = 'bashamega';
$repo = 'eduquiz';
$branch = 'main';

// Path to the JSON file within the repository
$file_path = 'https://bashamega.github.io/eduquiz/data/quiz/tiles.json';

// Personal access token with appropriate permissions
$access_token = 'your-personal-access-token';

// API endpoint URL
$url = "https://api.github.com/repos/{$owner}/{$repo}/contents/{$file_path}";

// Updated JSON content
$new_content = json_encode([
    'key1' => 'new-value1',
    'key2' => 'new-value2'
]);

// API request payload
$payload = [
    'message' => 'Update JSON file',
    'content' => base64_encode($new_content),
    'branch' => $branch
];

// Headers
$headers = [
    'Authorization: token ' . $access_token,
    'Accept: application/vnd.github.v3+json',
    'User-Agent: Your-App'
];

// Initialize cURL
$ch = curl_init($url);

// Set cURL options
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Execute the cURL request
$response = curl_exec($ch);

// Check for errors
if (curl_errno($ch)) {
    echo 'Error: ' . curl_error($ch);
} else {
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($http_code === 200 || $http_code === 201) {
        
        echo 'JSON file updated successfully.';
    } else {
        echo 'Error updating JSON file. HTTP Status Code: ' . $http_code;
    }
}

// Close cURL
curl_close($ch);
?>
