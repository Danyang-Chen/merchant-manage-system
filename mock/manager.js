import mockjs from 'mockjs';

export default {
  'GET /api/managers': (req, res) => {
    res.json({
      respCode: 200,
      ...mockjs.mock({
        'data|20': [
          {
            name: '@name',
            phone: /1\d{10}/,
            category: '超市',
            ...mockjs.mock({
              'merchantList|2': '@name',
            }),
          },
        ],
      }),
    });
  },
};
