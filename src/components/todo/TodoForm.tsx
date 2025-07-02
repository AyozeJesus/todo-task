import React, { useState } from 'react';
import { TodoFormProps } from '../../types/components';
import { UI_TEXT } from '../../constants/uiText';

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAdd(input)) {
      setInput(''); // Clear input on successful addition
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form" role="form" aria-label="Formulario para añadir nueva tarea">
      <label htmlFor="todo-input" className="sr-only">
        {UI_TEXT.FORM.INPUT_LABEL}
      </label>
      <input
        id="todo-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={UI_TEXT.FORM.PLACEHOLDER}
        className="todo-input"
        maxLength={20}
        aria-describedby="todo-input-help"
        aria-required="true"
      />
      <div id="todo-input-help" className="sr-only">
        {UI_TEXT.FORM.INPUT_HELP}
      </div>
      <button 
        type="submit" 
        className="todo-button"
        aria-describedby="todo-button-help"
      >
        {UI_TEXT.FORM.BUTTON}
      </button>
      <div id="todo-button-help" className="sr-only">
        {UI_TEXT.FORM.BUTTON_HELP}
      </div>
    </form>
  );
}; 