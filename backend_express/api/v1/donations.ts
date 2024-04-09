import { Router, Request, Response } from 'express';
import { getDonations, getPaginatedDonations } from './repositories/donations';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    const pageSize = req.query.pageSize;
    const pageNumber = req.query.pageNumber;
    if(!pageSize || !pageNumber) {
      const donations = getDonations();
      res.json(donations);
      return;
    }

    const donations = getPaginatedDonations(Number(pageSize), Number(pageNumber));
    res.json(donations);
});

export default router;
