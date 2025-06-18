<?php

$title       = isset($_POST['postTitle'])    ? trim($_POST['postTitle'])    : '';
$content     = isset($_POST['postContent'])  ? trim($_POST['postContent'])  : '';
$outerColour = isset($_POST['outerColour'])  ? trim($_POST['outerColour'])  : '';
$innerColour = isset($_POST['innerColour'])  ? trim($_POST['innerColour'])  : '';

if ($title === '' || $content === '' || $outerColour === '' || $innerColour === '') {
    http_response_code(400);
    die('cant be empty');
}

$postsFile = __DIR__ . '/posts.json';
$data      = file_get_contents($postsFile);
if ($data === false) {
    http_response_code(500);
    die('no file');
}

$posts = json_decode($data, true);
if (!is_array($posts)) {
    $posts = [];
}

$author = isset($_COOKIE['username']) && $_COOKIE['username']
        ? htmlspecialchars($_COOKIE['username'], ENT_QUOTES, 'UTF-8')
        : 'Guest';

$newPost = [
    'author'      => $author,
    'time'        => (int) (microtime(true) * 1000),
    'title'       => htmlspecialchars($title, ENT_QUOTES, 'UTF-8'),
    'content'     => htmlspecialchars($content, ENT_QUOTES, 'UTF-8'),
    'outerColour' => htmlspecialchars($outerColour, ENT_QUOTES, 'UTF-8'),
    'innerColour' => htmlspecialchars($innerColour, ENT_QUOTES, 'UTF-8'),
    'comments'    => []
];

$posts[] = $newPost;
$options = JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE;
if (file_put_contents($postsFile, json_encode($posts, $options)) === false) {
    http_response_code(500);
    die('file might be locked (very rare)');
}
header('Location: index.html');
exit;
