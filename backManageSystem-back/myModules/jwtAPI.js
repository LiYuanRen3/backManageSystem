// 导入jwt包
const jwt = require('jsonwebtoken');
// 定义secretKey秘钥
const secretKey = require('./secretKeyApi');
// 定义secretKey秘钥
const roleType = require('./myType/roleType');

const createToken = (data) => {
  return token = jwt.sign(
    data,
    secretKey,
    { algorithm: 'HS256', expiresIn: '168h' }
  );
}

const verifyPower = (req, res, next) => {
  let token = req.body.token;
  return jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      res.send({
        meta: {
          statu: false,
          msg: 'token无效！'
        }
      })
    } else {
      next();
    }
  })
}

const verifyPowerSeler = (req, res, next) => {
  let token = req.body.token;
  return jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      res.send({
        meta: {
          statu: false,
          msg: 'token无效！'
        }
      })
    } else {
      if (decoded.role === roleType.seller) {
        next();
      } else {
        res.send({
          meta: {
            statu: false,
            msg: '权限不足！！！'
          }
        })
      }
    }
  })
}

const verifyPowerAdmin = (req, res, next) => {
  let token = req.headers.authorization.split(' ')[1] || '';
  // 处理token，鉴权
  return jwt.verify(token, secretKey, (error, decoded) => {
    console.log(decoded);
    if (error) {
      res.send({
        meta: {
          statu: false,
          msg: 'token无效！'
        }
      })
    } else {
      if (decoded.role === roleType.admin) {
        next();
      } else {
        res.send({
          meta: {
            statu: false,
            msg: '权限不足！！！'
          }
        })
      }
    }
  })
}

const verifyPowerSuperAdmin = (req, res, next) => {
  let token = req.headers.authorization.split(' ')[1] || '';
  return jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      res.send({
        meta: {
          statu: false,
          msg: 'token无效！'
        }
      })
    } else {
      if (decoded.role === roleType.superAdmin) {
        next();
      } else {
        res.send({
          meta: {
            statu: false,
            msg: '权限不足！！！'
          }
        })
      }
    }
  })
}

function verifyPowerStay(token) {
  return new Promise((resolve, reject) => {
    return jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        reject({
          meta: {
            statu: false,
            msg: 'token无效！'
          }
        })
      } else {
        resolve({
          data: { info: decoded },
          meta: { statu: true }
        })
      }
    })
  })
}

module.exports = {
  createToken,
  verifyPower,
  verifyPowerSeler,
  verifyPowerAdmin,
  verifyPowerSuperAdmin,
  verifyPowerStay
};
