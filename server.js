const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
// public 폴더 안의 HTML을 보여줍니다
app.use(express.static(path.join(__dirname, 'public')));

// 데이터를 담아둘 중앙 저장소
let store = {};

// [서버 연결 테스트용]
app.get('/api/debug', (req, res) => {
    res.json(store);
});

// 데이터 가져오기
app.get('/api/get', (req, res) => {
    res.json({ value: store[req.query.k] || null });
});

// 데이터 저장하기
app.post('/api/set', (req, res) => {
    store[req.body.k] = req.body.v;
    res.json({ ok: true });
});

// 참여자 목록 조회
app.get('/api/list', (req, res) => {
    const pfx = req.query.pfx || '';
    const keys = Object.keys(store).filter(k => k.startsWith(pfx));
    res.json({ keys: keys });
});

// 데이터 삭제
app.post('/api/del', (req, res) => {
    delete store[req.body.k];
    res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`서버가 포트 ${PORT}에서 작동 중입니다.`);
});
