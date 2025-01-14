const selectEl = document.getElementById('select');
const repoEl = document.getElementById('repo-el');
const fetchButton = document.getElementById('btn-el')

async function fetchRepo(e) {
    e.preventDefault

    const language = selectEl.value;
    const apiUrl = `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch repositories");

        const data = await response.json();
        const repositories = data.items;

        if (repositories.length === 0) {
            repoEl.innerHTML = `<p>No repositories found for ${language}</p>`;
            return;
        }

        const randomRepo = repositories[Math.floor(Math.random() * repositories.length)];
        repoEl.innerHTML = `
          <h2 class="repo-name"><a href="${randomRepo.html_url}" target="_blank">${randomRepo.name}</a></h2>
          <p class="repo-description">${randomRepo.description || 'No description available.'}</p>
          <div class="repo-details">
            <p class="repo-stars">⭐ Stars: ${randomRepo.stargazers_count}</p>
            <p class="repo-forks">🍴 Forks: ${randomRepo.forks_count}</p>
            <p class="repo-issues">🐞 Open Issues: ${randomRepo.open_issues_count}</p>
          </div>
        `;
    } catch (error) {
        repoEl.innerHTML = `<p class="error">Error fetching repositories: ${error.message}</p>`;
        console.error(error);
    }
    repoEl.style.display = "inline"
}
fetchButton.addEventListener('click', fetchRepo);