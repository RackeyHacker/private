import React, { useState } from 'react';
import { Poll } from '../types/Poll';
import './CreatePollForm.css';

interface CreatePollFormProps {
  onCreate: (poll: Poll) => void;
}

const CreatePollForm: React.FC<CreatePollFormProps> = ({ onCreate }) => {
  const [question, setQuestion] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['', '']);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
      setOptions([...options, '']);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const trimmedOptions = options.map((opt) => opt.trim());
  
    if (trimmedOptions.some((opt) => opt === '')) {
      alert('Пожалуйста, заполните все варианты.');
      return;
    }
  
    const uniqueOptions = new Set(trimmedOptions);
    if (uniqueOptions.size !== trimmedOptions.length) {
      alert('Варианты ответов должны быть уникальными.');
      return;
    }
  
    const newPoll: Poll = {
      id: Math.random().toString(36).substr(2, 9),
      question,
      options: trimmedOptions.map((text) => ({ text, votes: 0 })),
      createdAt: new Date().toISOString(),
    };
  
    onCreate(newPoll);
    setQuestion('');
    setOptions(['', '']);
  };
  
  return (
    <div className="create-poll-form-container">
      <form onSubmit={handleSubmit} className="create-poll-form">
        <div>
          <label>
            Вопрос:
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>Варианты:</label>
          <div className="options-container">
            {options.map((option, index) => (
              <div key={index} className="option-input-row">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    className="delete-option-button"
                    onClick={() => handleRemoveOption(index)}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="buttons-container">
          <button type="button" className="add-button" onClick={addOption}>
            Добавить вариант
          </button>
        </div>

        <div className="submit-container">
          <button type="submit" className="submit-button">
            Создать голосование
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePollForm;
