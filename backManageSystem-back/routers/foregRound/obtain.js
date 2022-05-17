const express = require('express');
const router = express.Router();
//导入mysql模块
const mysql = require('mysql')
//建立mysql连接
const config = require('../../myModules/sqlConfigApi')
const pool = mysql.createPool(config)
// 导入自定义jwt模块
let jwtAPI = require('../../myModules/jwtAPI')
let selectApi = require('../../myModules/mysqlmode/selectApi')

// 返回首页初始数据
router.get('/firstObtain', function (req, res) {
  // 定义需要返回的数据载体
  let initiaList = null;
  // 查询分类
  let categoryState = 0;
  selectApi.selectCategoryState(categoryState).then(cateValue => {
    initiaList = cateValue.data.info;
    // 遍历分类
    for (let i = 0; i < initiaList.length; i++) {
      selectApi.selectCateIdDatl(initiaList[i].category_id).then(catedlValue => {
        // 将分类详情添加到分类下
        initiaList[i].catedl = catedlValue.data.info;
        // 遍历分类详情
        for (let j = 0; j < initiaList[i].catedl.length; j++) {
          selectApi.selectCateDatlIdGood(initiaList[i].catedl[j].cateDetail_id).then(goodsValue => {
            // 将商品添加到分类详情下
            initiaList[i].catedl[j].goods = goodsValue.data.info.slice(0, 4);
          })
        }
      })
    }
  }).catch(error => {
    console.log(error);
    res.send({
      meta: {
        statu: false,
        msg: '获取商品信息出错'
      }
    })
  })

  // 返回总数据
  setTimeout(() => {
    if (initiaList) {
      res.send({
        data: { list: initiaList },
        meta: { statu: true }
      })
    } else {
      res.send({
        meta: { statu: false, msg: '暂无商品信息' }
      })
    }
  }, 100);
})

// 根据分类返回数据
router.post('/classObtain', function (req, res) {
  // 接收post参数
  let categoryName = req.body.categoryName;
  let cateDetailName = req.body.cateDetailName;
  // 定义需要返回的数据载体
  let initiaList = null;
  selectApi.selectCategoryName(categoryName).then(cateValue => {
    // 将商品分类赋值给initiaList
    initiaList = cateValue.data.info[0];
    selectApi.selectCateIdNameDatl(initiaList.category_id, cateDetailName).then(catedlValue => {
      // 将分类详情添加到分类下
      initiaList.catedl = catedlValue.data.info[0];
      selectApi.selectCateDatlIdGood(initiaList.catedl.cateDetail_id).then(goodsValue => {
        // 将商品添加到分类详情下
        initiaList.catedl.goods = goodsValue.data.info;
        // 返回总数据
        res.send({
          data: { list: initiaList },
          meta: { statu: true }
        })
      })
    })
  }).catch(error => {
    console.log(error);
    res.send({
      meta: {
        statu: false,
        msg: '获取商品信息出错'
      }
    })
  })
})

// 返回轮播图数据
router.get('/getBanner', function (req, res) {
  let sql = `SELECT * FROM tab_banner;`;
  pool.query(sql, function (err, result) {
    if (err) {
      console.log(err.message);
      res.send({ obtainState: false });
    } else {
      let bannerList = []; //轮播图数组
      let randomList = []; //生成的随机数组
      let randomNum = 4;
      let randomlength = 15;
      while (randomList.length < randomNum) {
        let num = Math.floor(Math.random() * randomlength);
        if (randomList.indexOf(num) == -1) {
          randomList.push(num)
          bannerList.push(result[num])
        }
      }
      res.send({ obtainState: true, list: bannerList })
    }
  })
})


// jwtAPI.verifyPower,
// 根据商品id返回数据
router.post('/goodCatedl', function (req, res) {
  let { goodId } = req.body;
  // 定义需要返回的数据载体
  let initiaList = null;
  selectApi.selectGoodId(goodId).then(goodValue => {
    // 将商品信息赋值给数据载体
    initiaList = goodValue.data.info[0];
    selectApi.selectGoodDatlId(initiaList.goods_id).then(goodtlValue => {
      // 将商品详情添加到商品下
      initiaList.goodtl = goodtlValue.data.info[0];
      selectApi.selectGoodDatlImgId(initiaList.goods_id).then(goodimgValue => {
        // 将所有商品图片到商品详情下
        initiaList.goodtl.imglist = goodimgValue.data.info;

        // 返回数据
        res.send({
          data: { info: initiaList },
          meta: { statu: true }
        })
      })
    })
  }).catch((error) => {
    console.log(error);
    res.send({
      meta: {
        statu: false,
        msg: '获取商品信息出错'
      }
    })
  })
})



module.exports = router;


