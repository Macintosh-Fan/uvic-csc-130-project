<?php
$postId      = isset($_POST['postId'])      ? (int) $_POST['postId']      : null;
$rawComment  = isset($_POST['newComment'])  ? trim($_POST['newComment']) : '';

if ($postId === null) {
    http_response_code(400);
    die('no post');
}

$postsFile = __DIR__ . '/posts.json';
$data      = file_get_contents($postsFile);
if ($data === false) {
    http_response_code(500);
    die('no file');
}

$posts = json_decode($data, true);
// if (!is_array($posts) || !isset($posts[$postId])) {
//     http_response_code(404);
//     die('no post');
// }

$author = (isset($_COOKIE['username']) && $_COOKIE['username'])
        ? htmlspecialchars($_COOKIE['username'], ENT_QUOTES, 'UTF-8')
        : 'Guest';

$comment = [
    'author'  => $author,
    'time'    => (int) (microtime(true) * 1000),
    'content' => htmlspecialchars($rawComment, ENT_QUOTES, 'UTF-8'),
];

$posts[$postId]['comments'][] = $comment;

$options = JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE;
if (file_put_contents($postsFile, json_encode($posts, $options)) === false) {
    http_response_code(500);
    die('file might be locked (very rare)');
}

header('Location: post.html?id=' . $postId);
exit;