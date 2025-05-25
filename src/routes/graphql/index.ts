import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate} from 'graphql';
import { schema } from './types/schema.js';
import depthLimit from 'graphql-depth-limit';
import { getApplicationLoader } from './loaders/loaders.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;
      const parsedQuery = parse(query);
      const validationErrors = validate(
        schema,
        parsedQuery,
        [depthLimit(5)]
      )

      if (validationErrors.length) {
        return {
          errors: validationErrors.map(({message}) => ({
            message,
          }
        )
      )}
    }
    
      const result = await graphql({
        schema: schema,
        source: query,
        contextValue: {
          prisma,
          loader: getApplicationLoader(prisma)
        },
        variableValues: variables,
      })

      return result
  }});
};



export default plugin;
