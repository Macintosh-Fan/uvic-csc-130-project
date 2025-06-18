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

async function loadPost() {
    try {
        const response = await fetch('posts.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const posts = await response.json();

        const idParam = parseInt(new URLSearchParams(window.location.search).get('id'), 10);
        if (isNaN(idParam) || idParam < 0 || idParam >= posts.length) {
            window.location.href = 'index.html';
            return;
        }

        const post = posts[idParam];

        //title 
        const titleEl = document.getElementById('postTitle');
        titleEl.textContent = post.title;
        titleEl.style.color = post.outerColour;

      
        const infoEl = document.getElementById('postInfo');
        const postDate = new Date(post.time);
        infoEl.textContent =
            (post.author ?? 'Guest user') +
            ' - ' + String(postDate.getHours()).padStart(2, '0') +
            ':' + String(postDate.getMinutes()).padStart(2, '0') +
            ' on ' + getMonthString(postDate.getMonth()) +
            ' ' + postDate.getDate() +
            ', ' + postDate.getFullYear();
        infoEl.style.color = post.outerColour;

        
        const contentEl = document.getElementById('postContent');
        contentEl.textContent = post.content;
        contentEl.style.color = post.innerColour;

        
        const commentsContainer = document.getElementById('commentsContainer');
    
        commentsContainer.innerHTML = '';

        posts[idParam].comments
            .slice()              
            .reverse()            // latest first
            .forEach(comment => {
                const commentEl = document.createElement('div');
                commentEl.className = 'comment';

                const cDate = new Date(comment.time);
                const info = document.createElement('h5');
                info.className = 'commentInfo';
                info.textContent =
                    (comment.author ?? 'Guest user') +
                    ' - ' + String(cDate.getHours()).padStart(2, '0') +
                    ':' + String(cDate.getMinutes()).padStart(2, '0') +
                    ' on ' + getMonthString(cDate.getMonth()) +
                    ' ' + cDate.getDate() +
                    ', ' + cDate.getFullYear();
                commentEl.appendChild(info);

                const p = document.createElement('p');
                p.className = 'commentContent';
                p.textContent = comment.content;
                commentEl.appendChild(p);

                commentsContainer.appendChild(commentEl);
            });

    } catch (err) {
        console.error('no way:', err);
    }
}

document.addEventListener('DOMContentLoaded', loadPost);
