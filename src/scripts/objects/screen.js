const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `
        <div class="info">
            <img src="${user.avatarUrl}" alt="Foto de perfil do usuario"/>
        <div class="data">
            <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
            <p>${user.bio ?? 'Não possui bio cadastrado 😢'}</p>
            <p>Seguidores: ${user.followers}</p>
            <p>Seguindo: ${user.following}</p>
        </div>
        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens +=
            `<li>
            <a href="${repo.html_url}" target="_blank">${repo.name}
            <div class="interactions">
            <p>🍴${repo.forks_count}</p>
            <p>⭐${repo.stargazers_count}</p>
            <p>👀${repo.watchers_count}</p>
            <p>🧑‍💻${repo.language ?? "Não definida"}</p>
            </div>
            </a>
            </li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                <h2>Repositórios</h2>
                <ul>${repositoriesItens}</ul>
            </div>`
        }

        let eventsItens = ''
        user.events.forEach(event => {
            if (event.type === "PushEvent") {
                eventsItens += `
                <li>${event.repo.name}<span> - ${event.payload.commits[0].message}</span>
                </li>`
            } else if (event.type === "CreatEvent") {
                eventsItens += `
                <li>${event.repo.name}<span>${event.payload.ref_type}</span>
                </li>`
            }
        })

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `
            <div class="events">
                <h2>Eventos</h2>
    
                <ul>${eventsItens}</ul>
            </div>`
        }
        else {
            this.userProfile.innerHTML += `
            <div class="events">
                <h2>Eventos</h2>
                <h3>Este usuário não possui eventos 😢</h3>
            </div>`
        }

    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuario não encontrado</h3>"
    }
}

export { screen }