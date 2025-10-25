<?php
/**
 * Contact Form Email Handler for GlobalHost Deployment
 *
 * This script handles contact form submissions for the huzurmostar.ba domain
 * deployed on GlobalHost. It validates input, sanitizes data, and sends emails
 * using PHP's mail() function.
 *
 * Environment: Production (www.huzurmostar.ba) and Stage (www.stage.huzurmostar.ba)
 */

// Enable error reporting for debugging (disable in production)
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// Set headers for CORS and JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Only POST requests are accepted.'
    ]);
    exit();
}

/**
 * Configuration
 */
// TODO: Replace with your actual email address
$recipientEmail = 'your-email@example.com'; // Change this to your email
$fromEmail = 'noreply@huzurmostar.ba';
$fromName = 'Huzur Mostar Contact Form';

/**
 * Get and validate input data
 */
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

// Handle JSON input
if (stripos($contentType, 'application/json') !== false) {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid JSON data.'
        ]);
        exit();
    }
} else {
    // Handle form-encoded input
    $input = $_POST;
}

/**
 * Extract and validate required fields
 */
$name = isset($input['name']) ? trim($input['name']) : '';
$email = isset($input['email']) ? trim($input['email']) : '';
$subject = isset($input['subject']) ? trim($input['subject']) : '';
$message = isset($input['message']) ? trim($input['message']) : '';

// Validation
$errors = [];

if (empty($name)) {
    $errors[] = 'Name is required.';
}

if (empty($email)) {
    $errors[] = 'Email is required.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email address.';
}

if (empty($subject)) {
    $errors[] = 'Subject is required.';
}

if (empty($message)) {
    $errors[] = 'Message is required.';
}

// Basic spam protection: check for honeypot field
if (!empty($input['bot-field'])) {
    // Likely a bot submission
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Spam detected.'
    ]);
    exit();
}

// Return validation errors
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Validation failed.',
        'errors' => $errors
    ]);
    exit();
}

/**
 * Sanitize input to prevent injection attacks
 */
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

/**
 * Prepare email
 */
$emailSubject = "[Huzur Mostar] " . $subject;

// Email body in HTML format
$emailBody = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .header {
            background-color: #4A5568;
            color: white;
            padding: 10px;
            border-radius: 5px 5px 0 0;
            text-align: center;
        }
        .content {
            background-color: white;
            padding: 20px;
            border-radius: 0 0 5px 5px;
        }
        .field {
            margin-bottom: 15px;
        }
        .field strong {
            display: inline-block;
            width: 100px;
            color: #4A5568;
        }
        .message-content {
            background-color: #f0f0f0;
            padding: 15px;
            border-left: 4px solid #4A5568;
            margin-top: 10px;
            white-space: pre-wrap;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Nova Poruka sa Kontakt Forme</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <strong>Ime:</strong> {$name}
            </div>
            <div class='field'>
                <strong>Email:</strong> {$email}
            </div>
            <div class='field'>
                <strong>Naslov:</strong> {$subject}
            </div>
            <div class='field'>
                <strong>Poruka:</strong>
                <div class='message-content'>{$message}</div>
            </div>
            <hr>
            <p style='color: #666; font-size: 12px;'>
                Ova poruka je poslata sa kontakt forme na sajtu huzurmostar.ba
            </p>
        </div>
    </div>
</body>
</html>
";

// Plain text version as fallback
$emailBodyPlain = "
Nova Poruka sa Kontakt Forme
=============================

Ime: {$name}
Email: {$email}
Naslov: {$subject}

Poruka:
{$message}

---
Ova poruka je poslata sa kontakt forme na sajtu huzurmostar.ba
";

/**
 * Email headers
 */
$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/html; charset=UTF-8";
$headers[] = "From: {$fromName} <{$fromEmail}>";
$headers[] = "Reply-To: {$name} <{$email}>";
$headers[] = "X-Mailer: PHP/" . phpversion();

/**
 * Send email
 */
$mailSent = mail($recipientEmail, $emailSubject, $emailBody, implode("\r\n", $headers));

if ($mailSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Email sent successfully.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send email. Please try again later.'
    ]);
}
?>
