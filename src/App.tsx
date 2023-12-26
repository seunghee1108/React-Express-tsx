import React, {useState} from "react";
import "./App.css"
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";


	
const Join:React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // 회원가입 요청을 서버로 보내는 함수
  const handleJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, password }),
      });
      
      if (response.ok) {
        setMessage("회원가입이 완료되었습니다."); // 성공 메시지 설정
      } else {
        setMessage("회원가입에 실패했습니다."); // 실패 메시지 설정
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("회원가입 중 오류가 발생했습니다."); // 오류 메시지 설정
    }
  };
  return (
    <div className="join">
    <form onSubmit={handleJoin}>
      <h1>회원가입</h1>
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">회원가입</button>
      </form>
      {message && <p>{message}</p>}
      <Link to="/">로그인</Link>

    </div>
  )
}




const Login: React.FC = () => {
  // 로그인 시 필요한 상태 값
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


  // 로그인 요청을 서버로 보내는 함수
  const handleLogin = async () => {
    trㅅㅈ y {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        setMessage("로그인이 완료되었습니다."); // 성공 메시지 설정
      } else {
        setMessage("로그인에 실패했습니다."); // 실패 메시지 설정
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("로그인 중 오류가 발생했습니다."); // 오류 메시지 설정
    }
  };

  return (
    <div className="login">
      <h1>로그인</h1>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
      {message && <p>{message}</p>}
      <Link to="/join">회원가입</Link>
    </div>
  );
};

const App:React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/join" element={<Join />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;