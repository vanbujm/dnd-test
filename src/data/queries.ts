import { gql } from '@apollo/client';

export const CLASSES = gql`
  query getClasses {
    classes {
      name
      spells
      subclasses {
        name
      }
    }
    subclasses {
      name
      spells {
        spell {
          name
        }
      }
    }
  }
`;
