<?php
$POST_FILENAME = "posts.json";

if (!(isset($_POST["newComment"]) && isset($_POST["postId"]))) {
    die("Something ain't set.");
}

$author = isset($_COOKIE["username"]) ? $_COOKIE["username"] : null;
$comment = [
    "author" => $author,
    "time" => (int) (microtime(true) * 1000),
    "content" => $_POST["newComment"],
];

$postId = $_POST["postId"];
$posts = json_decode(file_get_contents($POST_FILENAME), true);
$post = $posts[(int) $postId];
array_push($post["comments"], $comment);

file_put_contents($POST_FILENAME, json_encode($posts, JSON_PRETTY_PRINT));

header("Location: post.html?id=" . $postId);
?>
