import { gql } from 'apollo-server-express';
import { find, remove } from 'lodash';

const contactsData = [
    {
      id: '1',
      firstName: 'Paul',
      lastName: 'Lam'
    },
    {
      id: '2',
      firstName: 'John',
      lastName: 'Smith'
    },
    {
      id: '3',
      firstName: 'Jane',
      lastName: 'Doe'
    }
  ]

  const typeDefs = gql`
    type Contact {
        id: String!
        firstName: String
        lastName: String
    }

    type Query {
        contact(id: String!): Contact
        contacts: [Contact]
    }

    `

    const resolvers = {
        Query: {
            contact(parent, args, context, info) {
                return find(contactsData, { id: args.id });
            },
            contacts: () => contactsData
        },
    }

export { typeDefs, resolvers };