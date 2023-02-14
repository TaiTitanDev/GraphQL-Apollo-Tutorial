const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const cors = require('cors')

// Load schema & resolvers
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')

// Load db methods
const mongoDataMethods = require('./data/db')

// Connect to MongoDB

const MONGODB_URL = "mongodb+srv://admin:Jb7RTuN4tg8tlCWu@cluster0.cvnhjvr.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
	try {
		await mongoose.connect(MONGODB_URL, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		})

		console.log('MongoDB connected')
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}

connectDB()

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => ({ mongoDataMethods })
})

const app = express()
app.use(cors())
server.applyMiddleware({ app })

app.listen({ port: process.env.PORT || 4000 }, () =>
	console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
)
