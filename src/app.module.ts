import responseCachePlugin from '@apollo/server-plugin-response-cache';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { GqlThrottlerGuard } from './middlewares/throttling';
import { HelloModule } from './modules/hello/hello.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60, limit: 1000 }],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault(),
        responseCachePlugin(),
      ],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      context: ({ req, res }) => ({ req, res }),
    }),
    HelloModule,
    PrismaModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/database_orm.sqlite',
      autoLoadEntities: true,
      synchronize: true,
      migrations: ['../typeorm/migrations/*.ts'],
    }),
    PokemonModule,
    CacheModule.registerAsync({
      useFactory: () => ({
        ttl: 5,
      }),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useExisting: GqlThrottlerGuard,
    },

    GqlThrottlerGuard,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheModule,
    },
  ],
})
export class AppModule {}
