function getMonthString(monthInteger) {
    switch (monthInteger) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        default:
            return "December";
    }
}

let jsonContent = [
    {
        author: "arcadikonoval",
        time: 0,
        title: "Reminder to dress-up for the cold",
        content:
            "Please dress-up, as it is going to get quite cold within the next few days:\nThursday ☼: -6°C / -12°C\nFriday ☼: -8°C / -14°C\nSaturday ❄: -5°C / -11°C\nSunday ❄: -1°C / -2°C",
        outerColour: "blue",
        innerColour: "royalblue",
        comments: [
            {
                author: "arcadikonoval-fr",
                time: 60000,
                content: "Oui. Il fera très froid.",
            },
        ],
    },
    {
        author: "arcadikonoval-es",
        time: 1732844580000,
        title: "¿Quién quiere hablar español?",
        content:
            "¡Quiero hablar español con la gente pronto! ¿Pueden venir el domingo a las 14:00 en el centro comunitario?",
        outerColour: "green",
        innerColour: "yellow",
        comments: [],
    },
    {
        author: "arcadikonoval",
        time: 1748498760000,
        title: "Sample post",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        outerColour: "magenta",
        innerColour: "chocolate",
        comments: [
            {
                author: "arcadikonoval",
                time: 1748498820000,
                content: "Nice Latin I wrote.",
            },
            {
                author: "arcadikonoval-it",
                time: 1748498880000,
                content: "Sì.",
            },
        ],
    },
];

const idParamInt = parseInt(
    new URLSearchParams(window.location.search).get("id"),
);

if (isNaN(idParamInt) || idParamInt < 0 || idParamInt >= jsonContent.length) {
    document.location.href = "index.html";
    throw new Error("Invalid post id");
}

for (let i = jsonContent.length - 1; i > -1; i--) {
    if (i !== idParamInt) {
        continue;
    }

    let post = jsonContent[i];

    let postTitleElement = document.getElementById("postTitle");
    postTitleElement.style.color = post.outerColour;
    postTitleElement.textContent = post.title;

    let postInfoElement = document.getElementById("postInfo");
    postInfoElement.style.color = post.outerColour;
    let postDate = new Date(post.time);
    postInfoElement.textContent =
        (post.author != null ? post.author : "Guest user") +
        " - " +
        String(postDate.getHours()).padStart(2, "0") +
        ":" +
        String(postDate.getMinutes()).padStart(2, "0") +
        " on " +
        getMonthString(postDate.getMonth()) +
        " " +
        postDate.getDay() +
        ", " +
        postDate.getFullYear();
    postInfoElement.style.color = post.outerColour;

    let postContentElement = document.getElementById("postContent");
    postContentElement.style.color = post.innerColour;
    postContentElement.textContent = post.content;

    for (let j = post.comments.length - 1; j > -1; j--) {
        let comment = post.comments[j];

        let brElement = document.createElement("br");
        document.body.appendChild(brElement);

        let commentElement = document.createElement("div");
        commentElement.className = "comment";

        let commentInfoElement = document.createElement("h5");
        commentInfoElement.className = "commentInfo";
        let commentDate = new Date(comment.time);
        commentInfoElement.textContent =
            comment.author +
            " - " +
            String(commentDate.getHours()).padStart(2, "0") +
            ":" +
            String(commentDate.getMinutes()).padStart(2, "0") +
            " on " +
            getMonthString(commentDate.getMonth()) +
            " " +
            commentDate.getDay() +
            ", " +
            commentDate.getFullYear();
        commentElement.appendChild(commentInfoElement);

        let commentContentElement = document.createElement("p");
        commentContentElement.className = "commentContent";
        commentContentElement.textContent = comment.content;
        commentElement.appendChild(commentContentElement);

        document.body.appendChild(commentElement);
    }
}
