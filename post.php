<?php
header('Content-Type: application/json');


if ($_SERVER['HTTP_REFERER'] != "http://yamaguchi-service-moskva.ru/post.php") {
    header("HTTP/1.0 403 Forbidden");
    echo "Доступ запрещен";
    exit;
}

$blobinfo = md5(date('Y-m') . "77_JSKjmk.m#");
$url = 'https://orders.borboza.com/site/service2023/new-service-task/blobinfo/' . $blobinfo;


$data = [
    'name' => $_POST['name'] ?? false,
    'phone' => $_POST['tel'] ?? false,
    'comment' => $_POST['message'] ?? false,
];

$options = [
    'http' => [
        'method' => 'POST',
        'header' => [
            'header' => implode("\r\n", array(
                'Content-Type: application/x-www-form-urlencoded',
                'X-Requested-With: XMLHttpRequest'
            )),
        ],
        'content' => http_build_query($data),

    ],
];
$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);

if (($response)) {
    echo json_encode(['id' => $response]);
} else {
    echo false;
}

