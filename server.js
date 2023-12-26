const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000; // 포트 설정, 기본값은 3001
const mysql = require("mysql2"); // MariaDB 드라이버

// MariaDB 연결 설정
const connection = mysql.createConnection({
  host:"localhost",
  user:"bang",
  password:"0000",
  database:"test",
  
});

// 정적 파일 제공 (React 앱을 포함한 정적 파일들을 서빙)
app.use(express.static(path.join(__dirname, "dist"))); // dist 폴더로부터 정적 파일 서빙

// POST 요청을 위한 미들웨어
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 회원가입 API 엔드포인트
app.post("/signup", (req, res) => {
  const {name, username, password} = req.body;

  // 비밀번호를 해싱하여 안전하게 저장 (보안을 위해 bcrypt 등의 라이브러리 사용 권장)
  // 이 예시에서는 단순히 비밀번호를 저장
  const hashedPassword = password;

  // 회원가입 정보를 DB에 삽입
  const query = "INSERT INTO hi (name, username, password) VALUES (?, ?, ?)";
  connection.query(query, [name, username, hashedPassword], (err, results, fields) => {
    if (err) {
      console.error("Error signing up:", err);
      res.status(500).json({message: "회원가입에 실패했습니다."});
      return;
    }
    res.status(200).json({message: "회원가입이 완료되었습니다."});
  });
});

// 로그인 API 엔드포인트
app.post("/login", (req, res) => {
  const {username, password} = req.body;

  // 해당 사용자가 존재하는지 확인하는 쿼리
  const query = "SELECT * FROM hi WHERE username = ? AND password = ?";
  connection.query(query, [username, password], (err, results, fields) => {
    if (err) {
      console.error("Error logging in:", err);
      res.status(500).json({message: "로그인에 실패했습니다."});
      return;
    }

    // 로그인 성공 여부 확인
    if (results.length > 0) {
      res.status(200).json({message: "로그인 성공"});
    } else {
      res.status(401).json({message: "아이디 또는 비밀번호가 올바르지 않습니다."});
    }
  });
});

// 라우팅 - React 앱으로 모든 요청을 보냄 (SPA에서 사용하기 위해)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});