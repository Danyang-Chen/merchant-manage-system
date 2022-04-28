export default {
  'GET /api/categories': (req, res) => {
    res.json({
      respCode: 200,
      data: [
        { name: '超市', icon: 'shangdian' },
        { name: '饮品', icon: 'naicha' },
        { name: '食物', icon: 'hanbao' },
        { name: '电子产品', icon: 'a-diannaoweihudiannaobaoyangbijibenweixiu' },
        { name: '快递', icon: 'kuaidi' },
        { name: '医药', icon: 'yao' },
        { name: '美容美发', icon: 'meifa' },
        { name: '洗衣店', icon: 'xiyi' },
      ],
    });
  },
};
