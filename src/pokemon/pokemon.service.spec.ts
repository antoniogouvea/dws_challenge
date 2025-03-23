import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../modules/prisma/prisma.service';
import { PokemonResolver } from './pokemon.resolver';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonService, PokemonResolver, PrismaService],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should test service creation with null', async () => {
    try {
      await service.importPokemonById(null);
    } catch (error) {
      expect(error.message).toEqual('id is required');
    }
  });
  it('should test service creation with unused id', async () => {
    try {
      await service.importPokemonById(10000);
    } catch (error) {
      expect(error.message).toEqual(
        'Failed to import pokemon with id 10000: Request failed with status code 404',
      );
    }
  });
  it('should test service creation with id', async () => {
    const result = await service.importPokemonById(160);
    expect(result.name).toEqual('feraligatr');
    expect(result.type).toEqual('water');
    expect(result.id).toEqual(160);
    expect(result).toHaveProperty('created_at');
  });
});
