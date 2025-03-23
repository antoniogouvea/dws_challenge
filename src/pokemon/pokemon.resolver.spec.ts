import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../modules/prisma/prisma.service';
import { PokemonResolver } from './pokemon.resolver';
import { PokemonService } from './pokemon.service';

describe('PokemonResolver', () => {
  let resolver: PokemonResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonResolver, PrismaService, PokemonService],
    }).compile();

    resolver = module.get<PokemonResolver>(PokemonResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  it('should return an array with all pokemons ', async () => {
    const result = await resolver.findManyPokemons(null, null, null);
    expect(Array.isArray(result)).toEqual(true);
  });
  it('should return an array with one pokemon ', async () => {
    const result = await resolver.findManyPokemons(
      { id: 1, name: null, type: null },
      null,
      null,
    );
    expect(Array.isArray(result)).toEqual(true);
    expect(result.length).toEqual(1);
  });
  it('should return an array with filter by name ', async () => {
    const result = await resolver.findManyPokemons(
      { id: null, name: 'charmander', type: null },
      null,
      null,
    );
    expect(Array.isArray(result)).toEqual(true);
    expect(result.length).toEqual(1);
  });
  it('should return an array with filter by type ', async () => {
    const result = await resolver.findManyPokemons(
      { id: null, name: null, type: 'fire' },
      null,
      null,
    );
    expect(Array.isArray(result)).toEqual(true);
    expect(result.length).toEqual(12);
  });
  it('should return an array with pagination limit', async () => {
    const result = await resolver.findManyPokemons(
      null,
      { limit: 10, offset: null },
      null,
    );
    expect(Array.isArray(result)).toEqual(true);
    expect(result.length).toEqual(10);
  });
  it('should return an array with pagination offset', async () => {
    const result = await resolver.findManyPokemons(
      null,
      { limit: 10, offset: 2 },
      null,
    );
    expect(Array.isArray(result)).toEqual(true);
    expect(result.length).toEqual(10);
    expect(result[0].id).toEqual(3);
  });
  it('should return an array with sort', async () => {
    const result = await resolver.findManyPokemons(null, null, {
      field: 'name',
      order: 'asc',
    });
    expect(Array.isArray(result)).toEqual(true);
    expect(result[0].id).toEqual(63);
    expect(result[0].name).toEqual('abra');
  });
  it('should return a new pokemon', async () => {
    const result = await resolver.createPokemon({
      name: 'teste123',
      type: 'water',
    });
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('type');
    expect(result).toHaveProperty('created_at');
  });
  it('should return an updated pokemon', async () => {
    const result = await resolver.updatePokemon({
      id: 161,
      name: 'teste123',
      type: 'water',
    });
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('type');
    expect(result).toHaveProperty('created_at');
  });
  it('should delete pokemon', async () => {
    const result = await resolver.deletePokemon(161);
    expect(result).toEqual({ ok: true });
  });
  it('should return an error with null on create', async () => {
    try {
      await resolver.createPokemon(null);
    } catch (err) {
      expect(err.message).toEqual('name is required');
    }
  });
  it('should return an error with no type on create', async () => {
    try {
      await resolver.createPokemon({ name: 'abra', type: null });
    } catch (err) {
      expect(err.message).toEqual('type is required');
    }
  });
  it('should return an error with null on update on create', async () => {
    try {
      await resolver.updatePokemon(null);
    } catch (err) {
      expect(err.message).toEqual('id is required');
    }
  });
  it('should return an error with no name on update', async () => {
    try {
      await resolver.updatePokemon({ id: 154, name: null, type: 'water' });
    } catch (err) {
      expect(err.message).toEqual('name is required');
    }
  });
  it('should return an error with no type on update', async () => {
    try {
      await resolver.updatePokemon({ id: 154, name: 'abra', type: null });
    } catch (err) {
      expect(err.message).toEqual('type is required');
    }
  });
  it('should return an error with no id on update', async () => {
    try {
      await resolver.updatePokemon({ id: null, name: 'abra', type: 'water' });
    } catch (err) {
      expect(err.message).toEqual('id is required');
    }
  });
  it('should return an error with no id on delete', async () => {
    try {
      await resolver.deletePokemon(null);
    } catch (err) {
      expect(err.message).toEqual('id is required');
    }
  });
});
