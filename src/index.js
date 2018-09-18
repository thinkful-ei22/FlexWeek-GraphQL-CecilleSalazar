const { GraphQLServer } = require('graphql-yoga');

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  },
  {
    id: 'link-1',
    url: 'www.howtographql1.com',
    description: 'Fullstack tutorial for GraphQL 1'
  },
  {
    id: 'link-2',
    url: 'www.howtographql2.com',
    description: 'Fullstack tutorial for GraphQL 2'
  },
  {
    id: 'link-3',
    url: 'www.howtographql3.com',
    description: 'Fullstack tutorial for GraphQL 3'
  },
  {
    id: 'link-4',
    url: 'www.howtographql1.com4',
    description: 'Fullstack tutorial for GraphQL 4'
  },
]

let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,

    feed: (_, { first }) => first === undefined ? links : links.slice(0, first),
  },
  Mutation: {
    post: (root, args) => {
       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    update: (root, args) => {
      links.map(link => {
        if(link.id === args.id) {
          link.description = args.description;
          link.url = args.url;
          return link;
        }
      });
    },
    delete: (root, args) => {
      links.map(link => {
        if(link.id === args.id) {
          const linkIndex = links.indexOf(link);
          links.splice(linkIndex, 1);
          return link;
        }
      })
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
