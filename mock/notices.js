import mockjs from 'mockjs';

export default {
  'GET /api/notices': (req, res) => {
    res.json({
      respCode: 200,
      ...mockjs.mock({
        'data|10': [
          {
            title: `${mockjs.Random.cname()}商家剩余${mockjs.Random.natural(
              1,
              5,
            )}个月到期`,
            date: '@date',
            status: '@boolean',
          },
        ],
      }),
    });
  },
};
