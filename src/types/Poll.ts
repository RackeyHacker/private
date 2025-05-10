export interface PollOption {
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  createdAt: string;
  multipleChoice?: boolean;
}

export type PollList = Poll[];
