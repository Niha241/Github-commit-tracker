document.getElementById("commitForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const repo = document.getElementById("repo").value;
    const list = document.getElementById("commit-list");

    list.innerHTML = "<p>Loading commits...</p>";
    try{
        const response = await fetch('https://api.github.com/repos/${username}/${repo}/commits');
        if(!response.ok) {
            throw new Error("Repository not found or is private!");
        }
        const data = await response.json();
        if (data.length === 0) {
        list.innerHTML = "<p>No commits found.</p>";
        return;
    }

    data.slice(0,10).forEach(commit => {
        const item = document.createElement("div");
        item.className = "commit";
        item.innerHTML =`<p><strong>Message:</strong> ${commit.commit.message}</p> 
                         <p><strong>Author:</strong> ${commit.commit.author.name}</p>
                         <p><strong>Date:</strong> ${new Date(commit.commit.author.date).toLocaleString()}</p>`;
        list.appendChild(item);
    });
    } catch (error) {
    list.innerHTML ='<p>Error: ${error.message}</p>';
    }
});
