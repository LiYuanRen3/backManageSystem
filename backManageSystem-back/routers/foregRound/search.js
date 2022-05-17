const express = require('express');
const router = express.Router();

const selectApi = require('../../myModules/mysqlmode/selectApi')

// 返回查询商品数据
router.post('/searchAll', function (req, res) {
  let { searchName } = req.body;
  selectApi.selectGoodNameLink(searchName).then(value => {
    let { list } = value.data;
    res.send({
      data: { list },
      meta: { statu: false, msg: '搜索成功！' }
    })
  }).catch((error) => {
    console.log(error);
    res.send({
      meta: { statu: false, msg: '暂无该商品...' }
    })
  })
})

// 搜索商品排序
router.post('/searchSort', function (req, res) {
  let { searchName, shotType } = req.body;
  selectApi.selectGoodNameLinkSort(searchName, shotType).then(value => {
    let { list } = value.data;
    res.send({
      data: { list },
      meta: { statu: false, msg: '搜索成功！' }
    })
  }).catch((error) => {
    console.log(error);
    res.send({
      meta: { statu: false, msg: '暂无该商品...' }
    })
  })
})

module.exports = router;
