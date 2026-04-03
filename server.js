{\rtf1\ansi\ansicpg949\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const express = require('express');\
const path = require('path');\
const app = express();\
\
app.use(express.json());\
// public \uc0\u54260 \u45908  \u50504 \u51032  index.html\u51012  \u48372 \u50668 \u51469 \u45768 \u45796 \
app.use(express.static(path.join(__dirname, 'public')));\
\
// \uc0\u47784 \u46304  \u54540 \u47112 \u51060 \u50612 \u51032  \u45936 \u51060 \u53552 \u47484  \u51200 \u51109 \u54624  \u51473 \u50521  \u47700 \u47784 \u47532 \
const store = \{\};\
\
// \uc0\u54532 \u47200 \u53944 \u50644 \u46300 (HTML)\u44032  \u45936 \u51060 \u53552 \u47484  \u50836 \u52397 \u54624  \u46412  \u52376 \u47532 \u54616 \u45716  API\
app.get('/api/get', (req, res) => \{\
    res.json(\{ value: store[req.query.k] || null \});\
\});\
\
app.post('/api/set', (req, res) => \{\
    store[req.body.k] = req.body.v;\
    res.json(\{ ok: true \});\
\});\
\
app.get('/api/list', (req, res) => \{\
    const keys = Object.keys(store).filter(k => k.startsWith(req.query.pfx));\
    res.json(\{ keys: keys \});\
\});\
\
app.post('/api/del', (req, res) => \{\
    delete store[req.body.k];\
    res.json(\{ ok: true \});\
\});\
\
const PORT = process.env.PORT || 3000;\
app.listen(PORT, () => \{\
    console.log(`\uc0\u49436 \u48260 \u44032  \u54252 \u53944  $\{PORT\}\u50640 \u49436  \u49892 \u54665  \u51473 \u51077 \u45768 \u45796 .`);\
\});}