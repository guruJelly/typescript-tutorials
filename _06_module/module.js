// nodejs의 모듈 시스템 : commonjs
// 파일을 쪼개는 효과.

const hello = 'module';
module.exports = hello;

const hi = require('./module');

exports.a = 'b';
exports.b = false;

module.exports = {
    a: 'b',
    b: false,
}

module.exports = function() {

}

const { a, b } = require('./module'); 


// TypeScriptjs의 모듈 시스템 : ES2015 계승.

const a = 'b';
const b = false;

export { a };
export { b };

export const a = 'b';
export const b = false;

// export와 export default 안 겹침.
export default function() {

}


// run.js
import { a, b } from './module';
// common.js에서 가져오는 방식. (module.exports일 경우)
import * as hi from './module';



// module과 <script>의 차이.
// 파일 중에 export, import 있으면 모듈 / 없으면 스크립트.