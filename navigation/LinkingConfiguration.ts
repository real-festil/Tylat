import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl(`/`)],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TileScreen: `one`,
            },
          },
          TabTwo: {
            screens: {
              ProfileScreen: `two`,
            },
          },
        },
      },
      NotFound: `*`,
    },
  },
};
