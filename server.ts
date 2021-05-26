import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import Serve from "koa-static";
import { errorHandler } from "./middlewares/errorHandler";
import { userRouter } from "./routers/user";
import { memoRouter } from "./routers/memo";
import { tagRouter } from "./routers/tag";
import { wxRouter } from "./routers/wx";

const app = new Koa();

// 错误处理中间件
app.use(errorHandler);

// 跨域（仅供 dev 使用）
if (process.env.NODE_ENV === "dev") {
  app.use(
    cors({
      credentials: true,
    })
  );
}
app.use(bodyParser());

// static files server
app.use(Serve("./web/dist/"));

app.use(userRouter.routes());
app.use(memoRouter.routes());
app.use(tagRouter.routes());
app.use(wxRouter.routes());

app.listen(8080, () => {
  console.log("server started in :8080");
});
