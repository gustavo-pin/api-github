console.clear()
const readline = require('readline');
const log = (log)=>{console.log(log)};

const rd = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getUserGithub(username){
    const request = await fetch(`https://api.github.com/users/${username}`);
    const userData = await request.json();
    return userData;
}

async function getRepositories(username){
    const request = await fetch(`https://api.github.com/users/${username}/repos`);
    const userRepos = await request.json();
    return userRepos;
}

async function main(name){
    try{
        const user = await getUserGithub(name);
        const repos = await getRepositories(name);

        log(`O nome é: ${user.name}`);
        log(`A bio do perfil é: ${user.bio}`);
        log(`Numero de repositorios: ${repos.length}`)
        log(`Link para foto de perfil: ${user.avatar_url}`)
    }catch(error){
        console.error('deu erro: ', error)
    }
    return;
}

rd.question('Digite o seu nome de usuario do GitHub: ', (firstStepName) => {
    main(firstStepName);
    rd.close()
});