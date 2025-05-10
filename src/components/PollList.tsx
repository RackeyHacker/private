import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PollOption {
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  createdAt: string;
}

interface PollListProps {
  polls: Poll[];
  onSelect: (poll: Poll) => void;
  onDelete: (pollId: string) => void;
}

const PollList: React.FC<PollListProps> = ({ polls, onSelect, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = (pollId: string) => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить это голосование?');
    if (confirmed) {
      onDelete(pollId);
    }
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="poll-list">
      <button onClick={() => navigate(-1)} className="back-button">← Назад</button>
      <h3>Ваши голосования</h3>
      {polls.map((poll) => (
        <div key={poll.id} className="poll-item">
          <div className="poll-header">
            <button onClick={() => onSelect(poll)} className="poll-question-btn">
              {poll.question}
            </button>
            <button onClick={() => handleDelete(poll.id)} className="delete-button">
              Удалить
            </button>
          </div>
          <div style={{ height: '10px' }}></div>
          <div className="poll-date">
            {formatDateTime(poll.createdAt)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PollList;
