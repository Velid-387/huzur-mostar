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
// Multiple recipients: separate email addresses with commas
$recipientEmail = 'info@huzurmostar.ba, huzur.mostar@gmail.com'; // Add multiple emails separated by commas
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
        @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Poppins:wght@300;400;500;600&display=swap');

        body {
            font-family: 'Poppins', sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #d14d72 0%, #ff6b98 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-family: 'Alex Brush', cursive;
            font-size: 36px;
            font-weight: normal;
        }
        .header p {
            margin: 5px 0 0 0;
            font-size: 14px;
            opacity: 0.9;
        }
        .content {
            background-color: white;
            padding: 30px;
        }
        .field {
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #f0f0f0;
        }
        .field:last-of-type {
            border-bottom: none;
        }
        .field-label {
            display: block;
            font-weight: 600;
            color: #d14d72;
            margin-bottom: 8px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .field-value {
            color: #333;
            font-size: 16px;
        }
        .message-content {
            background-color: #fef5f8;
            padding: 20px;
            border-left: 4px solid #d14d72;
            border-radius: 5px;
            margin-top: 8px;
            white-space: pre-wrap;
            font-size: 15px;
            line-height: 1.8;
        }
        .footer {
            background-color: #f9f9f9;
            padding: 20px;
            text-align: center;
            border-top: 2px solid #d14d72;
        }
        .footer p {
            color: #666;
            font-size: 13px;
            margin: 5px 0;
        }
        .footer a {
            color: #d14d72;
            text-decoration: none;
        }
        .flower-icon {
            font-size: 24px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <div class='flower-icon'>🌸</div>
            <h1>Huzur Mostar</h1>
            <p>Nova poruka sa kontakt forme</p>
        </div>
        <div class='content'>
            <div class='field'>
                <span class='field-label'>Ime i prezime</span>
                <div class='field-value'>{$name}</div>
            </div>
            <div class='field'>
                <span class='field-label'>Email adresa</span>
                <div class='field-value'>{$email}</div>
            </div>
            <div class='field'>
                <span class='field-label'>Naslov poruke</span>
                <div class='field-value'>{$subject}</div>
            </div>
            <div class='field'>
                <span class='field-label'>Poruka</span>
                <div class='message-content'>{$message}</div>
            </div>
        </div>
        <div class='footer'>
            <p>🌸 Ova poruka je poslata sa kontakt forme 🌸</p>
            <p><a href='https://www.huzurmostar.ba'>www.huzurmostar.ba</a></p>
            <p style='color: #999; font-size: 12px; margin-top: 10px;'>
                Maršala Tita 134, Mostar | +387 60 33 52 011
            </p>
        </div>
    </div>
</body>
</html>
";

// Plain text version as fallback
$emailBodyPlain = "
🌸 HUZUR MOSTAR 🌸
Nova poruka sa kontakt forme
=============================

IME I PREZIME
{$name}

EMAIL ADRESA
{$email}

NASLOV PORUKE
{$subject}

PORUKA
{$message}

---
🌸 Ova poruka je poslata sa kontakt forme 🌸
www.huzurmostar.ba
Maršala Tita 134, Mostar | +387 60 33 52 011
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
