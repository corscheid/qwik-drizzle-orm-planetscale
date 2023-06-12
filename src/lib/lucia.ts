import { planetscale } from "@lucia-auth/adapter-mysql";
import lucia from "lucia-auth"
import { qwik } from "lucia-auth/middleware"
import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

export const connection = connect({
  url: process.env.CONNECTION_STRING
});

export const db = drizzle(connection);

export const auth = lucia({
  adapter: planetscale(connection),
  env: process.env.NODE_ENV === "production" ? "PROD" : "DEV",
  middleware: qwik(),
  transformDatabaseUser: (user) => ({
    userId: user.id,
    username: user.username,
    names: user.names,
    last_names: user.last_names
  })
});

export type Auth = typeof auth;