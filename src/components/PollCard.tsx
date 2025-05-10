import React, { useState } from 'react';
import './PollCard.css';

interface PollCardProps {
  question: string;
  options: { text: string; votes: number }[];
  onVote: (selectedIndices: number[]) => void;
  hasVoted: boolean;
  maxChoices?: number;
}

const PollCard: React.FC<PollCardProps> = ({ question, options, onVote, hasVoted, maxChoices }) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const toggleOption = (index: number) => {
    if (hasVoted) return;

    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter(i => i !== index));
    } else {
      if (!maxChoices || selectedIndices.length < maxChoices) {
        setSelectedIndices([...selectedIndices, index]);
      } else {
        alert(`Вы можете выбрать максимум ${maxChoices} вариант(а/ов).`);
      }
    }
  };

  const handleVoteSubmit = () => {
    if (selectedIndices.length === 0) {
      alert('Выберите хотя бы один вариант.');
      return;
    }
    onVote(selectedIndices);
  };

  return (
    <div className="poll-card">
      <h2>{question}</h2>
      <ul>
        {options.map((option, index) => {
          const percent = totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(1) : '0.0';
          return (
            <li key={index} className="poll-option">
              <div className="option-left">
                <div className="option-text">{option.text}</div>
                <div className="option-votes">{option.votes} голосов ({percent}%)</div>
              </div>
              <input
                type="checkbox"
                disabled={hasVoted}
                checked={selectedIndices.includes(index)}
                onChange={() => toggleOption(index)}
                className="option-checkbox"
              />
            </li>
          );
        })}
      </ul>
      {!hasVoted && (
        <button onClick={handleVoteSubmit} className="vote-button">Проголосовать</button>
      )}
      {hasVoted && (
        <div className="vote-thank-you">
          Спасибо за голос!
        </div>
      )}
    </div>
  );
};

export default PollCard;
