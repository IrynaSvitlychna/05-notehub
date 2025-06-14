// import { useState } from 'react';

import css from './App.module.css';

export default function App() {
  

  return (
    <div className={css.app}>
	<header className={css.toolbar}>
		{/* Компонент SearchBox */}
		{/* Пагінація */}
        {/* Кнопка створення нотатки */}
        <button className={css.button}>Create note +</button>
  </header>
</div>
  )
}


