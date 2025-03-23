import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class PokemonCreate {
  @Field(() => String)
  @IsNotEmpty()
  'name': string;
  @Field(() => String)
  @IsNotEmpty()
  'type': string;
}

@InputType()
export class PokemonUpdate {
  @Field(() => Number)
  @IsNotEmpty()
  'id': number;
  @Field(() => String)
  @IsNotEmpty()
  'name': string;
  @Field(() => String)
  @IsNotEmpty()
  'type': string;
}

@InputType()
export class PokemonFilter {
  @Field()
  'id': number;
  @Field()
  'name': string;
  @Field()
  'type': string;
}

@InputType()
export class PokemonSort {
  @Field()
  field: string;
  order: 'asc' | 'desc';
}

@InputType()
export class PokemonPagination {
  @Field()
  'offset': number;
  @Field()
  'limit': number;
}
