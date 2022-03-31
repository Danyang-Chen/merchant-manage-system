import mockjs from 'mockjs';

export default {
  'GET /api/merchants': (request, result) => {
    result.json({
      respCode: 200,
      ...mockjs.mock({
        'data|20': [
          {
            name: '@name',
            address: '@city',
            category: '超市',
            startDate: '@date',
            endDate: '@date',
            manager: '@name',
            phone: /1\d{10}/,
          },
        ],
      }),
    });
  },
};
