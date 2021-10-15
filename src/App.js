import { useState, useEffect } from 'react';
import './App.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Axios from 'axios';

function App() {
  const [movieContent, setMovieContent] = useState({
    title: '',
    content: ''
  })

  const [viewContent, setViewContent] = useState([]);

  useEffect(()=>{
    Axios.get('http://localhost:8000/api/get').then((response)=>{
      setViewContent(response.data);
     
    })
  },[viewContent])

  const submitReview = ()=>{
    Axios.post('http://localhost:8000/api/insert', {
      title: movieContent.title,
      content: movieContent.content
    }).then(()=>{
      alert('등록 완료!');
    })
  };
  const moiveDelete= (idx) => {
    Axios.post('http://localhost:8000/api/delete',{
     idx: idx
    }).then(()=>{
      alert('삭제 완료!');
    })
  }

  const getValue = e => {
    const { name, value } = e.target;
    setMovieContent({
      ...movieContent,
      [name]: value
    })
  };


  return (
    <div className="App">
      <h1>Movie Review</h1>
      <div className='movie-container'>
        {viewContent.map(element =>
          <div style={{ border: '1px solid #333' }}>
            <h2>{element.title}</h2>
            <div>
              {element.content}
            </div>
            <button onClick={()=>moiveDelete(element.idx)}>삭제</button>
          </div>
        )}
      </div>
      <div className='form-wrapper'>
        <input className="title-input"
          type='text'
          placeholder='제목'
          onChange={getValue}
          name='title'
        />
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onReady={editor => {
            
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setMovieContent({
              ...movieContent,
              content: data
            })
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
      </div>
      <button
        className="submit-button"
        onClick={submitReview}
        >입력</button>
    </div>
  );
}

export default App;
