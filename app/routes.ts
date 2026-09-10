import { type RouteConfig, index,route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
route("detailPage/:id", "routes/detailPage/detail.tsx"),
route("becomeSeller", "routes/becomeSeller/seller.tsx")
] satisfies RouteConfig;
