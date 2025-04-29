import React from 'react';

interface PollCardProps {
  question: string;
  options: { text: string; votes: number }[];
  onVote: (optionIndex: number) => void;
  hasVoted: boolean;
}

const PollCard: React.FC<PollCardProps> = ({ question, options, onVote, hasVoted }) => {
  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="poll-card">
      <h2>{question}</h2>
      <ul>
        {options.map((option, index) => {
          const percent = totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(1) : '0.0';
          return (
            <li key={index} className="poll-option">
              <button
                onClick={() => onVote(index)}
                disabled={hasVoted}
              >
                {option.text}
              </button>
              <span>
                {option.votes} голосов ({percent}%)
              </span>
            </li>
          );
        })}
      </ul>
      {hasVoted && <p>Спасибо за ваш голос!</p>}
    </div>
  );
};

export default PollCard;
