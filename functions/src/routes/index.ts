import { Router } from 'express';
import subscribersRouter from './subscribers';
import blogPostsRouter from './blogPosts';
import estimateRequestsRouter from './estimateRequests';
import recaptchaRouter from './recaptcha';
const apiRouter = Router();

apiRouter.use('/subscribers', subscribersRouter);
apiRouter.use('/blog-posts', blogPostsRouter);
apiRouter.use('/estimate-requests', estimateRequestsRouter);
apiRouter.use('/', recaptchaRouter); // Use base path, verify-recaptcha.ts contains the full route.

export { apiRouter };
