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

async function loadPosts() {
    try {
        const response = await fetch('posts.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const jsonContent = await response.json();
        renderPosts(jsonContent);
    } catch (err) {
        console.error('sth wrong with json?', err);
    }
}

function renderPosts(jsonContent) {
    // iterate in reverse order
    for (let i = jsonContent.length - 1; i >= 0; i--) {
        const post = jsonContent[i];

        const postPreviewElement = document.createElement('div');
        postPreviewElement.className = 'postPreview';
        postPreviewElement.style.borderColor = post.outerColour;

        const titleElement = document.createElement('h3');
        titleElement.className = 'postPreviewTitle';
        titleElement.style.color = post.outerColour;
        titleElement.textContent = post.title;
        postPreviewElement.appendChild(titleElement);

        const infoElement = document.createElement('h5');
        infoElement.className = 'postPreviewInfo';
        infoElement.style.color = post.outerColour;
        const postDate = new Date(post.time);
        infoElement.textContent =
            (post.author ?? 'Guest') +
            ' - ' + String(postDate.getHours()).padStart(2, '0') + ':' + String(postDate.getMinutes()).padStart(2, '0') +
            ' on ' + getMonthString(postDate.getMonth()) + ' ' + postDate.getDate() + ', ' + postDate.getFullYear();
        postPreviewElement.appendChild(infoElement);

        postPreviewElement.appendChild(document.createElement('br'));

        const previewContentElement = document.createElement('pre');
        previewContentElement.className = 'postPreviewContent';
        previewContentElement.style.color = post.innerColour;
        previewContentElement.textContent = post.content;
        postPreviewElement.appendChild(previewContentElement);

        postPreviewElement.appendChild(document.createElement('br'));

        const viewPostButton = document.createElement('button');
        viewPostButton.textContent = 'View post';
        viewPostButton.onclick = () => {
            document.location.href = `post.html?id=${i}`;
        };
        postPreviewElement.appendChild(viewPostButton);

        document.body.appendChild(postPreviewElement);
    }
}

document.addEventListener('DOMContentLoaded', loadPosts);
