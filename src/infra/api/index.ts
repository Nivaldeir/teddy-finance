import AuthController from "./controllers/auth-controller"
import ShortenedController from "./controllers/shortened-controller"
import UserController from "./controllers/user-controller"
import ExpressAdapter from "./server/ExpressAdapter"

const server = new ExpressAdapter()

new UserController(server)
new ShortenedController(server)
new AuthController(server)
server.listen(parseInt(process.env.PORT!) | 8080)
export default server