const graphql = require('graphql');
const Spec = require('../models/spec');
const Machine = require('../models/machine');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'spec',   //book
    fields: ( ) => ({
        id: { type: GraphQLID },
        Tree_name: { type: GraphQLString }, //name
        data_element: { type: GraphQLString },     //Genre
        Description: { type: GraphQLString },
        format: { type: GraphQLString },
        length: { type: GraphQLString },
        example: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return Machine.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'machine', //author
    fields: ( ) => ({
        id: { type: GraphQLID },
        machine: { type: GraphQLString }, //name
        reporttype: { type: GraphQLString }, //age
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Spec.find({ authorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        spec: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Spec.findById(args.id);
            }
        },
        machine: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Machine.findById(args.id);
            }
        },
        specs: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Spec.find({});
            }
        },
        machines: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Machine.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                machine: { type: GraphQLString },
                reporttype: { type: GraphQLString }
            },
            resolve(parent, args){
                let machine = new Machine({
                    machine: args.machine,
                    reporttype: args.reporttype
                });
                return machine.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                Tree_name: { type: new GraphQLNonNull(GraphQLString) }, //name
                data_element: { type: new GraphQLNonNull(GraphQLString) },     //Genre
                Description: { type: new GraphQLNonNull(GraphQLString) },
                format: { type: new GraphQLNonNull(GraphQLString) },
                length: { type: new GraphQLNonNull(GraphQLString) },
                example: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let spec = new Spec({
                    Tree_name: args.Tree_name,
                    data_element: args.data_element,
                    Description: args.Description,
                    format: args.format,
                    length: args.length,
                    example: args.example,
                    authorId: args.authorId
                });
                return spec.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
