import mockjs from 'mockjs';

export default {
  // 查
  'GET /api/merchants': (request, response) => {
    response.json({
      respCode: 200,
      ...mockjs.mock({
        'data|20': [
          {
            id: /\d{10}/,
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
  // 增
  'POST /api/merchants': (request, response) => {
    const name = request.body.name;
    const category = request.body.category;
    const address = request.body.address;
    const startDate = request.body.startDate;
    const endDate = request.body.endDate;
    const manager = request.body.manager;
    const phone = request.body.phone;
    response.json({
      respCode: 200,
      data: {
        name,
        category,
        address,
        startDate,
        endDate,
        manager,
        phone,
      },
    });
  },
  // 改
  'PUT /api/merchants/:merchantId': (request, response) => {
    const name = request.body.name;
    const category = request.body.category;
    const address = request.body.address;
    const startDate = request.body.startDate;
    const endDate = request.body.endDate;
    const manager = request.body.manager;
    const phone = request.body.phone;
    response.json({
      respCode: 200,
      data: {
        name,
        category,
        address,
        startDate,
        endDate,
        manager,
        phone,
      },
    });
  },
  // 删
  'DELETE /api/merchants/:merchantId': (request, response) => {
    const merchantId = request.params.merchantId;
    response.json({
      respCode: 200,
      data: `${merchantId}删除成功`,
    });
  },
};
