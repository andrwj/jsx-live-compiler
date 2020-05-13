import React, {useState, useRef, useCallback} from 'react';
import './App.css';

const save = (src) => localStorage.setItem("live-source", src);
const read = () => localStorage.getItem("live-source");

function App() {

  const source = useRef(null);
  const [output, setOutput] = useState("");
  const [errorMessage, setError] = useState("");

  const refresh = useCallback((e) => {
    if(e.which === 13 && e.ctrlKey) {
      console.log(source.current.value);
      try {
        setOutput( window.Babel.transform(source.current.value, {presets: ["es2015", "react"]}).code );
        save(source.current.value);
        setError("");
      } catch(e) {
        setError(e.message);
      }
    } else {
      if(errorMessage) setError("");
    }
  });

  return (
    <div>
      <header className={errorMessage ? "error" : ""}>{errorMessage}</header>
      <div className="container">
        <textarea ref={source} defaultValue={read()} onKeyDown={refresh} />
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default App;
