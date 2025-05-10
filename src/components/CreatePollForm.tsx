import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Poll } from '../types/Poll';
import './CreatePollForm.css';

interface CreatePollFormProps {
  onCreate: (poll: Poll) => void;
}

const CreatePollForm: React.FC<CreatePollFormProps> = ({ onCreate }) => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [multipleChoice, setMultipleChoice] = useState(false);
  const [maxChoices, setMaxChoices] = useState(1);

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

    if (multipleChoice && (maxChoices < 1 || maxChoices > trimmedOptions.length)) {
      alert('Недопустимое число выборов.');
      return;
    }

    const newPoll: Poll = {
      id: Math.random().toString(36).substr(2, 9),
      question,
      options: trimmedOptions.map((text) => ({ text, votes: 0 })),
      createdAt: new Date().toISOString(),
      multipleChoice,
      maxChoices: multipleChoice ? maxChoices : 1,
    };

    onCreate(newPoll);
    setQuestion('');
    setOptions(['', '']);
    setMultipleChoice(false);
    setMaxChoices(1);
    navigate('/polls');
  };

  return (
    <div className="create-poll-form-container">
      <form onSubmit={handleSubmit} className="create-poll-form">
        <div className="form-group">
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

        <div className="form-group">
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

        <div className="multiple-choice-container">
          <label className="multiple-choice-label">
            Разрешить выбор нескольких вариантов
          </label>
          <input
            type="checkbox"
            checked={multipleChoice}
            onChange={(e) => setMultipleChoice(e.target.checked)}
            className="multiple-choice-checkbox"
          />
        </div>

        {multipleChoice && (
          <div className="form-group">
            <label>
              Максимальное количество выборов:
              <input
                type="number"
                min="1"
                value={maxChoices}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1;
                  setMaxChoices(Math.max(1, value));
                }}
              />
            </label>
          </div>
        )}

        <div className="submit-container">
          <button type="submit" className="submit-button">
            Создать голосование
          </button>
        </div>

        <div className="back-container">
          <button type="button" onClick={() => navigate(-1)} className="back-button">
            ← Назад
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePollForm;
