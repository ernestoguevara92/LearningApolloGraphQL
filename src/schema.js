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

    type Mutation {
        addContact(id: String!, firstName: String!, lastName: String!): Contact
        updateContact(id: String!, firstName: String, lastName: String): Contact
        removeContact(id: String!): Contact
    }
    `

    const resolvers = {
        Query: {
            contact(parent, args, context, info) {
                return find(contactsData, { id: args.id });
            },
            contacts: () => contactsData
        },
        Mutation: {
            addContact: (root, args) =>{
                const newContact = {
                    id: args.id,
                    firstName: args.firstName,
                    lastName: args.lastName
                }
                contactsData.push(newContact);
                return newContact;
            },
            updateContact: (root, args) => {
                const contact = find(contactsData, { id: args.id });

                if (!contact) {
                    throw new Error(`Couldn't find contact with id ${args.id}`);
                }

                contact.firstName = args.firstName;
                contact.lastName = args.lastName;

                return contact;
            },
            removeContact: (root, args) => {
                const removedContact = find(contactsData, { id: args.id });

                if (!removedContact) {
                    throw new Error(`Couldn't find contact with id ${args.id}`);
                }

                remove(contactsData, contact => {
                    return contact.id === args.id
                });

                return removedContact;
            }
        }
    }

export { typeDefs, resolvers };