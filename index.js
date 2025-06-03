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
        author: "arcadkonoval",
        time: 0,
        title: "Reminder to dress-up for the cold",
        content:
            "Please dress-up, as it is going to get quite cold within the next few days:\nThursday ☼: -6°C / -12°C\nFriday ☼: -8°C / -14°C\nSaturday ❄: -5°C / -11°C\nSunday ❄: -1°C / -2°C",
        outerColour: "blue",
        innerColour: "royalblue",
        comments: [
            {
                author: "arcadkonoval-fr",
                time: 60000,
                content: "Oui. Il fera très froid.",
            },
        ],
    },
    {
        author: "arcadkonoval-es",
        time: 1764380580000,
        title: "¿Quién quiere hablar español?",
        content:
            "¡Quiero hablar español con la gente pronto! ¿Pueden venir el domingo a las 14:00 en el centro comunitario?",
        outerColour: "green",
        innerColour: "yellow",
        comments: [],
    },
    {
        author: "arcadkonoval",
        time: 1748498760000,
        title: "Sample post",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        outerColour: "magenta",
        innerColour: "chocolate",
        comments: [
            {
                author: "arcadkonoval",
                time: 1748498820000,
                content: "Nice Latin I wrote.",
            },
            {
                author: "arcadkonoval-it",
                time: 1748498880000,
                content: "Sì.",
            },
        ],
    },
];

for (let i = jsonContent.length - 1; i > -1; i--) {
    let post = jsonContent[i];

    let postPreviewElement = document.createElement("div");
    postPreviewElement.style.borderColor = post.outerColour;
    postPreviewElement.className = "postPreview";

    let titleElement = document.createElement("h3");
    titleElement.className = "postPreviewTitle";
    titleElement.style.color = post.outerColour;
    titleElement.textContent = post.title;
    postPreviewElement.appendChild(titleElement);

    let infoElement = document.createElement("h5");
    infoElement.className = "postPreviewInfo";
    infoElement.style.color = post.outerColour;
    let postDate = new Date(post.time);
    infoElement.textContent =
        post.author +
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
    postPreviewElement.appendChild(infoElement);

    let brElement1 = document.createElement("br");
    postPreviewElement.appendChild(brElement1);

    let previewContentElement = document.createElement("pre");
    previewContentElement.className = "postPreviewContent";
    previewContentElement.style.color = post.innerColour;
    previewContentElement.textContent = post.content;
    postPreviewElement.appendChild(previewContentElement);

    let brElement2 = document.createElement("br");
    postPreviewElement.appendChild(brElement2);

    let viewPostButtonElement = document.createElement("button");
    viewPostButtonElement.onclick = function () {
        document.location.href = "post.html?id=" + i;
    };
    viewPostButtonElement.textContent = "View post";
    postPreviewElement.appendChild(viewPostButtonElement);

    document.body.appendChild(postPreviewElement);
}
