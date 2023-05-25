const pokedex = document.getElementById("pokedex");

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i < 152; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((response) => response.json()));
  }
  Promise.all(promises).then((results) => {
    const pokemon = results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites.other.home["front_default"],
      type: data.types.map((type) => type.type.name).join(", "),
      attacks: data.moves.map((move) => move.move.name).join(", "),
      abilities: data.abilities
        .map((ability) => ability.ability.name)
        .join(", "),
      weight: data.weight,
      experience: data.base_experience,
      height: data.height,
      // helditem: data.held_items.map((item) => item.item.name).join(", "),
      helditem: data.held_items.map((item) => item.item.name).join(", "),
      wholedata: data,
      healthpoints: data.stats
        .map((base_stat) => base_stat.stat.name)
        .join(", "),
    }));
    displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) => `<li>
    <img src="${pokeman.image}"/>
    <h2> ${pokeman.id}. ${pokeman.name}</h2>
    <p> Type:${pokeman.type}</p>
    <p> Abilities:${pokeman.abilities}</p>
  </li>`
    )
    .join(``);
  pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
