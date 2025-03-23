import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  PokemonCreate,
  PokemonFilter,
  PokemonPagination,
  PokemonSort,
  PokemonUpdate,
} from './dto/pokemon.dto';
import { Pokemon } from './models/pokemon.models';
import { PokemonService } from './pokemon.service';

@Resolver('Pokemon')
export class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Query('findManyPokemons')
  findManyPokemons(
    @Args('filter') filter: PokemonFilter,
    @Args('pagination') pagination: PokemonPagination,
    @Args('sort') sort: PokemonSort,
  ): Promise<Pokemon[]> {
    return this.pokemonService.findManyPokemons(filter, pagination, sort);
  }

  @Mutation('createPokemon')
  createPokemon(
    @Args('createPokemon') createPokemon: PokemonCreate,
  ): Promise<Pokemon> {
    return this.pokemonService.create(createPokemon);
  }

  @Mutation('updatePokemon')
  updatePokemon(
    @Args('updatePokemon') updatePokemon: PokemonUpdate,
  ): Promise<Pokemon> {
    return this.pokemonService.update(updatePokemon);
  }

  @Mutation('deletePokemon')
  deletePokemon(@Args('id') id: number): Promise<{ ok: boolean }> {
    return this.pokemonService.delete(id);
  }

  @Mutation('importPokemonById')
  importPokemonById(@Args('id') id: number): Promise<Pokemon> {
    return this.pokemonService.importPokemonById(id);
  }
}
