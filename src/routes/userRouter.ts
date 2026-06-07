import { Router } from "express";
import { UserController } from "../controllers/userController.js";
import { validate } from "../middlewares/validates.js";
import { createUserSchema, updateUserSchema } from "../schema/userSchema.js";

const routes = Router();
const userController= new UserController();

routes.post("/user", validate(createUserSchema), userController.create);
routes.get("/user", userController.list);
routes.get("/user/:id", userController.findById);
routes.put("/user/:id", validate(updateUserSchema), userController.update);
routes.delete("/user/:id", userController.delete);

export default routes;
