import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("./routes/auth/layout.tsx", [route("auth", "./routes/auth/auth.tsx")]),
  layout("./routes/todo/layout.tsx", [
    route("todo", "./routes/todo/index.tsx"),
    route("todo/create", "./routes/todo/createTask.tsx"),
  ]),
] satisfies RouteConfig;  
