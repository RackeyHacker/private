import React, { useState, useEffect } from 'react';
import PollCard from './components/PollCard';
import CreatePollForm from './components/CreatePollForm';
import PollList from './components/PollList';
import { Poll, PollList as PollListType } from './types/Poll';
import './App.css';

const App: React.FC = () => {
  const loadPollsFromLocalStorage = (): PollListType => {
    const savedPolls = localStorage.getItem('polls');
    return savedPolls ? JSON.parse(savedPolls) : [];
  };

  const [polls, setPolls] = useState<PollListType>(loadPollsFromLocalStorage());
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      return savedTheme === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const hasVoted = selectedPoll
    ? localStorage.getItem(`hasVoted_${selectedPoll.id}`) === 'true'
    : false;

  useEffect(() => {
    localStorage.setItem('polls', JSON.stringify(polls));
  }, [polls]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleCreatePoll = (newPoll: Poll) => {
    setPolls([...polls, newPoll]);
    setSelectedPoll(newPoll);
  };

  const handleSelectPoll = (poll: Poll) => {
    setSelectedPoll(poll);
  };

  const handleVote = (selectedIndexes: number[]) => {
    if (!selectedPoll || hasVoted) return;

    const updatedPoll = { ...selectedPoll };
    selectedIndexes.forEach(i => {
      updatedPoll.options[i].votes += 1;
    });
    setSelectedPoll(updatedPoll);

    const updatedPolls = polls.map((poll) =>
      poll.id === updatedPoll.id ? updatedPoll : poll
    );
    setPolls(updatedPolls);

    localStorage.setItem(`hasVoted_${selectedPoll.id}`, 'true');
  };

  const resetVote = () => {
    if (!selectedPoll) return;

    const updatedPoll = { ...selectedPoll };
    updatedPoll.options.forEach((option) => (option.votes = 0));
    setSelectedPoll(updatedPoll);

    const updatedPolls = polls.map((poll) =>
      poll.id === updatedPoll.id ? updatedPoll : poll
    );
    setPolls(updatedPolls);

    localStorage.removeItem(`hasVoted_${selectedPoll.id}`);
  };

  const handleDeletePoll = (pollId: string) => {
    const updatedPolls = polls.filter((poll) => poll.id !== pollId);
    setPolls(updatedPolls);

    if (selectedPoll?.id === pollId) {
      setSelectedPoll(null);
    }

    localStorage.removeItem(`hasVoted_${pollId}`);
  };

  return (
    <div className="app-container">
      <button onClick={toggleDarkMode} className="theme-toggle">
        {darkMode ? '☀️' : '🌙'}
      </button>
      <h1 className="header">Платформа для голосования</h1>
      <div className="content">
        <CreatePollForm onCreate={handleCreatePoll} />
        <PollList
          polls={polls}
          onSelect={handleSelectPoll}
          onDelete={handleDeletePoll}
        />
        {selectedPoll && (
          <div className="poll-details">
            <PollCard
              question={selectedPoll.question}
              options={selectedPoll.options}
              onVote={handleVote}
              hasVoted={hasVoted}
              multipleChoice={selectedPoll.multipleChoice}
              maxChoices={selectedPoll.maxChoices}
            />
            {hasVoted && (
              <button onClick={resetVote} className="reset-button">
                Отменить голос
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
