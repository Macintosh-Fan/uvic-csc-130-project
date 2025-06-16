<?php
$POST_FILENAME = "posts.json";

if (
    !(
        isset($_POST["postTitle"]) &&
        isset($_POST["postContent"]) &&
        isset($_POST["outerColour"]) &&
        isset($_POST["innerColour"])
    )
) {
    die("Something ain't set.");
}

$posts = json_decode(file_get_contents($POST_FILENAME), true);

$author = isset($_COOKIE["username"]) ? $_COOKIE["username"] : null;
$newPost = [
    "author" => $author,
    "time" => (int) (microtime(true) * 1000),
    "title" => $_POST["postTitle"],
    "content" => $_POST["postContent"],
    "outerColour" => $_POST["outerColour"],
    "innerColour" => $_POST["innerColour"],
    "comments" => [],
];
array_push($posts, $newPost);

file_put_contents($POST_FILENAME, json_encode($posts, JSON_PRETTY_PRINT));

header("Location: post.html?id=" . (count($posts) - 1));
?>
