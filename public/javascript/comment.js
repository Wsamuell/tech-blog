console.log("comment.js is running") //just to check that this file gets run at all
async function commentFormHandler(event) {
    event.preventDefault();
    console.log("comment button hit")

    const comment_text = document.querySelector('#comment-body').value.trim();

    const post_id = document.querySelector('input[name="post-id"]').value;

    if (comment_text) {
        const response = await fetch ('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.reload();
          } else {
            alert(response.statusText);
          }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
