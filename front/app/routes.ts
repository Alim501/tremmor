import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("./routes/auth/layout.tsx", [
    route("auth/login", "./routes/auth/login.tsx"),
    route("auth/register", "./routes/auth/register.tsx"),
  ]),
  layout("./routes/todo/layout.tsx", [
    route("todo", "./routes/todo/index.tsx"),
    route("todo/search", "./routes/todo/search.tsx"),
    route("todo/create", "./routes/todo/createTask.tsx"),
    route("todo/edit/:id", "./routes/todo/editTask.tsx"),
    route("todo/create/priority", "./routes/todo/createPriority.tsx"),
    route("todo/edit/priority/:id", "./routes/todo/editPriority.tsx"),
    route("todo/create/category", "./routes/todo/createCategory.tsx"),
    route("todo/edit/category/:id", "./routes/todo/editCategory.tsx"),
  ]),
] satisfies RouteConfig;
