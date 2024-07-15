import {Route} from "@angular/router";

export const appRoutes: Route[] = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadComponent: () => import("@users/home").then((c) => c.HomeComponent),
  },
  {
    path: "posts",
    loadComponent: () =>
      import("@users/test/posts").then((c) => c.PostsListComponent),
  },
  {
    path: "contacts",
    redirectTo: "home",
  },
];
