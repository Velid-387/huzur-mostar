<?php
/**
 * Simple email test script
 * This helps verify if PHP mail() function is working
 *
 * Usage:
 * Local: http://localhost:8000/api/test-email.php
 * Production: https://huzurmostar.ba/api/test-email.php
 */

// Configuration
$to = 'info@huzurmostar.ba'; // Change this to your email
$subject = 'Test Email from Huzur Mostar Website';
$message = "This is a test email sent at " . date('Y-m-d H:i:s') . "\n\n";
$message .= "If you receive this, your PHP mail configuration is working correctly.\n\n";
$message .= "Server: " . $_SERVER['HTTP_HOST'] . "\n";
$message .= "PHP Version: " . phpversion();

$headers = "From: noreply@huzurmostar.ba\r\n";
$headers .= "Reply-To: noreply@huzurmostar.ba\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Try to send
$result = mail($to, $subject, $message, $headers);

// Display result
?>
<!DOCTYPE html>
<html>
<head>
    <title>Email Test Result</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .result {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .success {
            color: #28a745;
            font-weight: bold;
            font-size: 24px;
        }
        .error {
            color: #dc3545;
            font-weight: bold;
            font-size: 24px;
        }
        .info {
            margin-top: 20px;
            padding: 15px;
            background-color: #e7f3ff;
            border-left: 4px solid #2196F3;
        }
        .warning {
            margin-top: 20px;
            padding: 15px;
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
        }
        pre {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <div class="result">
        <h1>Email Test Result</h1>

        <?php if ($result): ?>
            <p class="success">✓ mail() function returned SUCCESS</p>
            <div class="info">
                <h3>Email Details:</h3>
                <p><strong>To:</strong> <?php echo htmlspecialchars($to); ?></p>
                <p><strong>Subject:</strong> <?php echo htmlspecialchars($subject); ?></p>
                <p><strong>Time:</strong> <?php echo date('Y-m-d H:i:s'); ?></p>
            </div>

            <div class="warning">
                <h3>Important Notes:</h3>
                <ul>
                    <li><strong>Local Development:</strong> The mail() function may return success but the email won't actually be sent because no mail server is configured.</li>
                    <li><strong>Production Server:</strong> Check your inbox (including spam/junk folders) in a few minutes.</li>
                    <li><strong>Delivery Time:</strong> Emails can take 1-5 minutes to arrive.</li>
                    <li><strong>Spam Filters:</strong> Emails from PHP mail() are often flagged as spam. Check your spam folder.</li>
                </ul>
            </div>
        <?php else: ?>
            <p class="error">✗ mail() function FAILED</p>
            <div class="info">
                <h3>Troubleshooting:</h3>
                <ul>
                    <li>Check PHP error logs</li>
                    <li>Verify mail server configuration in php.ini</li>
                    <li>Contact your hosting provider about email sending</li>
                    <li>Consider using SMTP instead of mail()</li>
                </ul>
            </div>
        <?php endif; ?>

        <div class="info">
            <h3>Server Information:</h3>
            <pre><?php
echo "PHP Version: " . phpversion() . "\n";
echo "Server: " . $_SERVER['HTTP_HOST'] . "\n";
echo "Operating System: " . PHP_OS . "\n";
echo "Mail Function Available: " . (function_exists('mail') ? 'Yes' : 'No') . "\n";

// Try to get sendmail path
$sendmail_path = ini_get('sendmail_path');
echo "Sendmail Path: " . ($sendmail_path ? $sendmail_path : 'Not configured') . "\n";
            ?></pre>
        </div>
    </div>
</body>
</html>
