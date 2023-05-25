const pokedex = document.getElementById("pokedex");

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i < 152; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((response) => response.json()));
  }
  Promise.all(promises).then((results) => {
    const pokemon = results.map((data) => {
      const moves = data.moves.map((move) => move.move.name);
      const randomMoves = moves.sort(() => 0.5 - Math.random()).slice(0, 5);

      return {
        name: data.name,
        id: data.id,
        image: data.sprites.other.home["front_default"],
        type: data.types.map((type) => type.type.name).join(", "),
        attacks: randomMoves.join(", "),
        abilities: data.abilities
          .map((ability) => ability.ability.name)
          .join(", "),
        weight: data.weight / 10 + " kg",
        experience: data.base_experience,
        height: data.height / 10 + " m",
        helditem: data.held_items.map((item) => item.item.name).join(", "),
        wholedata: data,
        healthpoints: data.stats[0].base_stat,
        attackpoints: data.stats[1].base_stat,
        defencepoints: data.stats[2].base_stat,
        specialattackpoints: data.stats[3].base_stat,
        specialdefencepoints: data.stats[4].base_stat,
        speedpoints: data.stats[5].base_stat,
      };
    });

    displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) => `<div class="card">
    <img  class="card-image" src="${pokeman.image}"/>
    <h2 class="card-title"> ${pokeman.id}. ${pokeman.name}</h2>
    <p class="card-subtitle"> Type: ${pokeman.type}</p>
    <div class="stats-container"> 
      <p class="card-stats"> HP:<br> ${pokeman.healthpoints}</p>
      <p class="card-stats"> ATK:<br> ${pokeman.attackpoints}</p>
      <p class="card-stats"> DEF:<br> ${pokeman.defencepoints}</p>
      <p class="card-stats"> SP-ATK:<br> ${pokeman.specialattackpoints}</p>
      <p class="card-stats"> SP-DEF:<br> ${pokeman.specialdefencepoints}</p>
      <p class="card-stats"> INIT:<br> ${pokeman.speedpoints}</p>
    </div>
    
    <p class="card-subtitle"> Abilities: ${pokeman.abilities}</p>
    <p class="card-subtitle"> Attacks: ${pokeman.attacks}</p>
    <p class="card-subtitle" > Weight: ${pokeman.weight}</p>
    <p class="card-subtitle"> Height: ${pokeman.height}</p>
  </div>`
    )
    .join(``);
  pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
