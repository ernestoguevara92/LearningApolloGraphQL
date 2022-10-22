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