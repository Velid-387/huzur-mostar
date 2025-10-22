<?php
// send-email.php - Clean version without any potential BOM or whitespace issues
// Disable all output buffering and error display
error_reporting(0);
ini_set('display_errors', 0);

// Set headers first
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

// CORS handling
$allowed_origins = [
    'https://huzurmostar.ba',
    'https://www.huzurmostar.ba',
    'https://stage.huzurmostar.ba',
    'https://www.stage.huzurmostar.ba',
    'http://stage.huzurmostar.ba',
    'http://www.stage.huzurmostar.ba',
    'http://localhost:4200',
    'http://localhost'
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Only POST allowed
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['success' => false, 'error' => 'Method not allowed']));
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    die(json_encode(['success' => false, 'error' => 'No data received']));
}

// Validate and sanitize
$name = isset($input['name']) ? trim(strip_tags($input['name'])) : '';
$email = isset($input['email']) ? trim($input['email']) : '';
$subject = isset($input['subject']) ? trim(strip_tags($input['subject'])) : '';
$message = isset($input['message']) ? trim(strip_tags($input['message'])) : '';

// Validation
if (empty($name)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'error' => 'Ime je obavezno']));
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'error' => 'Validna email adresa je obavezna']));
}

if (empty($subject)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'error' => 'Naslov je obavezan']));
}

if (empty($message)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'error' => 'Poruka je obavezna']));
}

// Email configuration
$to = 'info@huzurmostar.ba';
$email_subject = 'Kontakt forma: ' . $subject;

// Build email body
$email_body = "Nova poruka sa kontakt forme:\n\n";
$email_body .= "Ime: " . $name . "\n";
$email_body .= "Email: " . $email . "\n";
$email_body .= "Predmet: " . $subject . "\n\n";
$email_body .= "Poruka:\n" . $message . "\n\n";
$email_body .= "---\n";
$email_body .= "Poslano sa: " . $_SERVER['HTTP_HOST'] . "\n";
$email_body .= "Datum: " . date('Y-m-d H:i:s') . "\n";
$email_body .= "IP adresa: " . $_SERVER['REMOTE_ADDR'];

// Email headers
$headers = "From: noreply@huzurmostar.ba\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Log attempt
$log_file = __DIR__ . '/email_log.txt';
$log_entry = sprintf(
    "[%s] Email from: %s <%s> - Subject: %s\n",
    date('Y-m-d H:i:s'),
    $name,
    $email,
    $subject
);
@file_put_contents($log_file, $log_entry, FILE_APPEND);

// Send email
$mail_result = @mail($to, $email_subject, $email_body, $headers);

// Log result
$result_log = sprintf("[%s] Result: %s\n", date('Y-m-d H:i:s'), $mail_result ? 'SUCCESS' : 'FAILED');
@file_put_contents($log_file, $result_log, FILE_APPEND);

// Return response
if ($mail_result) {
    http_response_code(200);
    die(json_encode(['success' => true, 'message' => 'Poruka uspješno poslana']));
} else {
    http_response_code(500);
    die(json_encode(['success' => false, 'error' => 'Greška prilikom slanja emaila']));
}
