export default {
  'GET /api/categories': (req, res) => {
    res.json({
      respCode: 200,
      data: [
        { name: '超市', icon: 'shangdian', color: 'lime' },
        { name: '饮品', icon: 'naicha', color: 'green' },
        { name: '食物', icon: 'hanbao', color: 'gold' },
        {
          name: '电子产品',
          icon: 'a-diannaoweihudiannaobaoyangbijibenweixiu',
          color: 'blue',
        },
        { name: '快递', icon: 'kuaidi', color: 'cyan' },
        { name: '医药', icon: 'yao', color: 'green' },
        { name: '美容美发', icon: 'meifa', color: 'pink' },
        { name: '洗衣店', icon: 'xiyi', color: 'blue' },
      ],
    });
  },
};
