import { Router } from 'express';
import verifyMiddleware from '@middlewares/verify.middleware';
import userRoute from '@modules/user/user.controller';
import authRoute from '@modules/auth/auth.controller';

const router = Router();

const api = router.use(userRoute);
const auth = router.use(authRoute);

router.use('/api', verifyMiddleware, api);
router.use('/auth', auth);

export default router;
