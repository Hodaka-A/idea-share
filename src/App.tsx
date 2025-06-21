// eslint-disable-next-line import/no-duplicates
import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// gemini モジュールをデフォルトエクスポートとしてインポートする
import { startGemini } from './functions/gemini';
import icon from './images/test.png';
import './index.css';


function Hello() {
  const [outputText, setOutputText] = useState('');
  const [userVisible, setUserVisible] = useState(true); // ユーザー入力フィールドとボタンの表示状態を管理

  const handleButtonClick = async () => {
    // Gemini APIを呼び出し、テキストを生成
    const inputTextElement = document.getElementById(
      'inputText',
    ) as HTMLInputElement;
    const inputText = inputTextElement ? inputTextElement.value : '';
    const response = await startGemini(inputText);
    // ボタンをクリックしたら、ユーザー入力フィールドとボタンを非表示にする
    setUserVisible(false);
    // 生成されたテキストをUIに表示
    setOutputText(response);
  };

  return (
    <div>
      <div className="arona">
        {userVisible && (
          <div className="user">
            <input id="inputText" type="text" placeholder="Enter your name" />
            <button type="button" onClick={handleButtonClick}>
              Submit
            </button>
          </div>
        )}
        {outputText}
      </div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      {/* ユーザー入力フィールドとボタンの表示状態に応じて表示するか非表示にする */}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
