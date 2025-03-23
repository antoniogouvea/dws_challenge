import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Filter, Pagination, Sort } from '../helpers/dto/filter.dto';
import { filterHelper } from '../helpers/filter.helper';
import { PrismaService } from '../modules/prisma/prisma.service';
import { Pokemon } from './models/pokemon.models';

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) {}

  async findManyPokemons(
    filter: Filter,
    pagination: Pagination,
    sort: Sort,
  ): Promise<Pokemon[]> {
    const newFilter = filterHelper(filter, pagination, sort);
    return await this.prisma.pokemon.findMany(newFilter);
  }

  async create(createPokemon: {
    name: string;
    type: string;
  }): Promise<Pokemon> {
    if (createPokemon?.type === null) {
      throw new Error('type is required');
    }
    if (!createPokemon || createPokemon?.name === null) {
      throw new Error('name is required');
    }

    return this.prisma.pokemon.create({ data: createPokemon });
  }

  async update(pokemonUpdate: {
    id: number;
    name: string;
    type: string;
  }): Promise<Pokemon> {
    if (!pokemonUpdate || pokemonUpdate?.id === null) {
      throw new Error('id is required');
    }
    if (pokemonUpdate?.type === null) {
      throw new Error('type is required');
    }
    if (pokemonUpdate?.name === null) {
      throw new Error('name is required');
    }
    return this.prisma.pokemon.update({
      where: { id: pokemonUpdate.id },
      data: { name: pokemonUpdate.name, type: pokemonUpdate.type },
    });
  }

  async delete(id: number): Promise<{ ok: boolean }> {
    if (id === null) {
      throw new Error('id is required');
    }
    const ok = await this.prisma.pokemon.delete({ where: { id } });
    return { ok: !!ok };
  }

  async importPokemonById(id: number): Promise<Pokemon> {
    if (id === null) {
      throw new Error('id is required');
    }
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`,
      );
      const pokemon = {
        id: id,
        type: response?.data?.types[0]?.type?.name,
        name: response?.data?.name,
      };
      return this.prisma.pokemon.upsert({
        where: { id: pokemon.id },
        update: pokemon,
        create: pokemon,
      });
    } catch (error) {
      throw new Error(
        `Failed to import pokemon with id ${id}: ${error.message}`,
      );
    }
  }
}
