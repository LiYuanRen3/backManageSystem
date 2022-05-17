const express = require('express');
const router = express.Router();
//导入mysql模块
const mysql = require('mysql')
//建立mysql连接
const config = require('../../myModules/sqlConfigApi')
const pool = mysql.createPool(config)

// 返回首页初始数据
router.post('/', async function (req, res) {
  if (false) {
    let sql1 = `SELECT * FROM tab_goods;`;
    pool.query(sql1, function (err, result) {
      let goodId = result.length + 1;
      // 男款
      // 女款
      // 通用款
      let goodMsg = '通用款';
      let inventory = 360;
      let sellerID = 1;
      let gooddetailID = 31;
      let insertInfo = [
        // {
        //   goodName: `XXX`,
        //   goodImg: 'XXX',
        //   goodimages: [
        //     'XXX',
        //     'XXX',
        //     'XXX',
        //     'XXX',
        //   ],
        // },
        // {
        //   goodName: `XXX`,
        //   goodImg: 'XXX',
        //   goodimages: [
        //     'XXX',
        //     'XXX',
        //     'XXX',
        //     'XXX',
        //   ],
        // },
        // {
        //   goodName: `XXX`,
        //   goodImg: 'XXX',
        //   goodimages: [
        //     'XXX',
        //     'XXX',
        //     'XXX',
        //     'XXX',
        //   ],
        // },
        // {
        //   goodName: `XXX`,
        //   goodImg: 'XXX',
        //   goodimages: [
        //     'XXX',
        //     'XXX',
        //     'XXX',
        //     'XXX',
        //   ],
        // },
        // {
        //   goodName: `XXX`,
        //   goodImg: 'XXX',
        //   goodimages: [
        //     'XXX',
        //     'XXX',
        //     'XXX',
        //     'XXX',
        //   ],
        // },
        // {
        //   goodName: `XXX`,
        //   goodImg: 'XXX',
        //   goodimages: [
        //     'XXX',
        //     'XXX',
        //     'XXX',
        //     'XXX',
        //   ],
        // },
        // {
        //   goodName: `XXX`,
        //   goodImg: 'XXX',
        //   goodimages: [
        //     'XXX',
        //     'XXX',
        //     'XXX',
        //     'XXX',
        //   ],
        // },
        // {
        //   goodName: `XXX`,
        //   goodImg: 'XXX',
        //   goodimages: [
        //     'XXX',
        //     'XXX',
        //     'XXX',
        //     'XXX',
        //   ],
        // },
      ]

      for (let i = 0; i < insertInfo.length; i++) {
        let XQstr = {
          lx1: ['Xs', 'S', 'M', 'L', 'Xl', 'Avg'],
          lx2: ['39', '40', '41', '42', '43', '44', '45'],
          lx3: ['50ml', '100ml', '150ml', '250ml', '350ml', '450ml'],
          lx4: ['5片', '10片', '15片', '20片', '25片', '30片'],
          lx5: ['红色', '橙色', '黄色', '绿色', '蓝色', '靛色', '紫色'],
          lx6: ['透明色', '米白色', '香槟色', '粉紫色', '蜜桃色', '肉桂色'],
          lx7: ['4+64GB', '8+128GB', '8+256GB', '12+256GB', '12+512GB'],
          lx8: [
            '8+128GB+1T', '8+256GB+1T', '8+512GB+1T',
            '12+128GB+1T', '12+256GB+1T', '12+512GB+1T',
            '16+128GB+1T', '16+256GB+1T', '16+512GB+1T',
            '32+128GB+1T', '32+256GB+1T', '32+512GB+1T'
          ],
          lx9: [
            '1800W+8GB', '1800W+16GB', '1800W+32GB',
            '4800W+8GB', '4800W+16GB', '4800W+32GB',
            '6400W+8GB', '6400W+16GB', '6400W+32GB',
            '9800W+8GB', '9800W+16GB', '9800W+32GB',
          ],
          lx10: ['黑轴', '茶轴', '红轴', '青轴', '白轴'],
          lx11: [
            '4档+2200w', '6档+2600w',
            '8档+3000w', '10档+3400w',
            '12档+3800w'
          ],
          lx12: [
            '1L+800w', '2L+1600w',
            '3L+2200w'
          ],
          lx13: [
            '1机4芯', '1机6芯',
            '1机8芯', '2机8芯',
            '2机12芯', '2机16芯'
          ],
          lx14: [
            '2刀+200W', '4刀+300W',
            '6刀+400W',
          ],
          lx15: [
            '150mm/S', '180mm/S',
            '200mm/S',
          ],
          lx16: [
            '1200流明+1080P', '1200流明+2K',
            '1200流明+4K', '1200流明+8K',
            '1800流明+1080P', '1800流明+2K',
            '1800流明+4K', '1800流明+8K',
            '2400流明+1080P', '2400流明+2K',
            '2400流明+4K', '2400流明+8K',
          ],
          lx17: [
            '1匹 三级', '1.5匹 三级',
            '2匹 三级', '3匹 三级',
          ],
          lx18: [
            '12000Pa+2200w', '30000Pa+2600w',
            '45000Pa+3000w', '60000Pa+3400w',
            '80000Pa+3800w'
          ],
        }
        let goodXQ = 'INSERT INTO tab_goodsdetail(goods_id,goods_size,goods_gender,goods_stock) VALUES';
        let listType = XQstr.lx18;
        for (let k = 0; k < listType.length; k++) {
          if (k != listType.length - 1) {
            goodXQ += `(${goodId},'${listType[k]}','${goodMsg}',${inventory}),`
          } else {
            goodXQ += `(${goodId},'${listType[k]}','${goodMsg}',${inventory});`
          }
        }
        let goosIMG = 'INSERT INTO tab_goodsdetailimage(goods_id,goods_goodimgs) VALUES'
        for (let j = 0; j < insertInfo[i].goodimages.length; j++) {
          if (j != insertInfo[i].goodimages.length - 1) {
            goosIMG += `(${goodId},'${insertInfo[i].goodimages[j]}'),`
          } else {
            goosIMG += `(${goodId},'${insertInfo[i].goodimages[j]}');`
          }
        }
        // let goodsSQL = 'INSERT INTO tab_goods(goods_id,goods_name,goods_price,goods_img,goods_discount,sel_id,cateDetail_id) VALUES(?,?,?,?,?,?,?);'
        let goodDiscount = Math.ceil(Math.random() * 1000000000 % 9) / 10;
        let goodPrice = Math.ceil(Math.random() * (1000 - 50) + 50)

        let goodsSQL = `INSERT INTO tab_goods(goods_id,goods_name,goods_price,goods_img,goods_discount,sel_id,cateDetail_id) VALUES(${goodId},'${insertInfo[i].goodName}',${goodPrice},'${insertInfo[i].goodImg}',${goodDiscount},${sellerID},${gooddetailID});`
        pool.query(goodsSQL,
          [
            goodId,
            insertInfo[i].goodName,
            goodPrice,
            insertInfo[i].goodImg,
            goodDiscount,
            sellerID,
            gooddetailID
          ],

          function (err, result) {
            if (err) {
              console.log(err.message);
              return;
            }
            pool.query(goodXQ, function (err, result) {
              if (err) {
                console.log(err.message);
                return;
              }
              pool.query(goosIMG, function (err, result) {
                if (err) {
                  console.log(err.message);
                  return;
                }
                console.log('插入成功！！！');
              })
            })
          })
        goodId++
      }
    })
  }
  res.send('yes')
})

module.exports = router;
