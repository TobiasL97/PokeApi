const getButton = document.querySelector('#get-pokemon-button');
const pokemonContainer = document.querySelector('#pokemon-container');
const errorMessage = document.querySelector('#error-message');


const pokemonList = [];

const getPokemon = async () => {
    
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=1');
        const data = await response.json();
        const totalPokemonCount = data.count;

        const randomPokemon = Math.floor(Math.random() * totalPokemonCount) + 1;

        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`);
        const pokemonData = await pokemonResponse.json();

        return pokemonData;
    }

    catch {

    }

    
}

const populatePokemonCard = async () => {

    if(pokemonList.length < 6) {

        pokemon = await getPokemon();
        pokemonList.push(pokemon);

        for(let i = 0; i < pokemonList.length; i++) {
            if(pokemonList != null) {
                pokemonCard = document.createElement('div');
                pokemonCard.classList.add('pokemon-card');
                
                // Make first letter in name a capital letter
                const firstLetterCap = pokemonList[i].name.charAt(0).toUpperCase();
                const remainingLetters = pokemonList[i].name.slice(1);
                const fullPokemonName = firstLetterCap + remainingLetters;

                

                pokemonCard.innerHTML = `
                
                    <h1 id="pokemon-name">${fullPokemonName}</h1> 
                    <div class="types">
                        
                    </div>
                    <img id="pokemon-image" alt="${pokemonList[i].name}" src="${pokemonList[i].sprites.front_default}"/>
                    <div class="background">
                        <div class="stats-container">

                        </div>
                    </div>
                `;
                
                // Get Pokemon Type and based on type get the right background color
                if( pokemonList[i].types != null) {
                    pokemonList[i].types.forEach(type => {
                        const types = pokemonCard.querySelector('.types');
                        const typeBox = document.createElement('div');
                        
                        

                        typeBox.innerHTML = type.type.name.toUpperCase();

                        const pokemonTypeString = type.type.name.toUpperCase();
                        

                        switch(pokemonTypeString) {
                            case 'FIRE':
                                typeBox.style.backgroundColor = '#EE8130';
                            break;

                            case 'WATER':
                                typeBox.style.backgroundColor = '#6390F0';
                            break;

                            case 'GRASS':
                                typeBox.style.backgroundColor = '#7AC74C';
                            break;

                            case 'NORMAL':
                                typeBox.style.backgroundColor = '#A8A77A';
                            break;

                            case 'ELECTRIC':
                                typeBox.style.backgroundColor = '#F7D02C';
                            break;

                            case 'DARK':
                                typeBox.style.backgroundColor = '#705746';
                            break;

                            case 'ICE':
                                typeBox.style.backgroundColor = '#96D9D6';
                            break;

                            case 'FIGHTING':
                                typeBox.style.backgroundColor = '#C22E28';
                            break;

                            case 'POISON':
                                typeBox.style.backgroundColor = '#A33EA1';
                            break;

                            case 'GROUND':
                                typeBox.style.backgroundColor = '#E2BF65';
                            break;

                            case 'FLYING':
                                typeBox.style.backgroundColor = '#A98FF3';
                            break;

                            case 'PSYCHIC':
                                typeBox.style.backgroundColor = '#F95587';
                            break;

                            case 'BUG':
                                typeBox.style.backgroundColor = '#A6B91A';
                            break;

                            case 'ROCK':
                                typeBox.style.backgroundColor = '#B6A136';
                            break;

                            case 'GHOST':
                                typeBox.style.backgroundColor = '#735797';
                            break;

                            case 'DRAGON':
                                typeBox.style.backgroundColor = '#6F35FC';
                            break;

                            case 'STEEL':
                                typeBox.style.backgroundColor = '#B7B7CE';
                            break;

                            case 'FAIRY':
                                typeBox.style.backgroundColor = '#D685AD';
                            break;

                        }

                        console.log(typeBox.innerHTML)
                        console.log(pokemonList);

                        types.appendChild(typeBox);

                    });
                }

                // Get all pokemon stats and populate elements
                if (pokemonList[i].stats != null ) {
                    pokemonList[i].stats.forEach(stat => {
                        const statsContainer = pokemonCard.querySelector('.stats-container');

                        const stats = document.createElement('div');
                        stats.classList.add('stats')

                        const statName = document.createElement('p');
                        statName.classList.add('stat-name');

                        const statValue = document.createElement('p');
                        statValue.classList.add('stat-value')
                        
                        statsContainer.appendChild(stats)

                        statName.innerHTML = stat.stat.name.toUpperCase() + ' ' + ':';
                        statValue.innerHTML = stat.base_stat;

                        stats.appendChild(statName);
                        stats.appendChild(statValue);

                        
                        
                    })
                }

                const background = pokemonCard.querySelector('.background')
                const id = document.createElement('p');
                id.classList.add('pokemon-id')

                id.innerHTML = 'ID: ' + pokemonList[i].id;

                background.appendChild(id);
            }
        }

        pokemonContainer.appendChild(pokemonCard);
        

        setTimeout(() => {
            pokemonCard.style.opacity = '100';
        }, 50);
        
    } else {
        errorMessage.innerHTML = `You can only have six pokemon in your team`
        errorMessage.classList.add('error-message');
    }

}


getButton.addEventListener('click', async e => {

    populatePokemonCard();

});
