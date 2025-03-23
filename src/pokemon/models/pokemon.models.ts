import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType({ description: 'pokemon' })
export class Pokemon {
  @Field()
  id: number;
  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  created_at: Date;
}
