export type ComplaintStatus = 'Submitted' | 'Acknowledged' | 'In Progress' | 'Resolved' | 'Closed';

export type TimelineEvent = {
  id: string;
  date: string;
  status: ComplaintStatus;
  comment: string;
};

export type Complaint = {
  id: string;
  title: string;
  description: string;
  location: string;
  status: ComplaintStatus;
  submittedBy: string;
  department: string;
  createdAt: string;
  updatedAt: string;
  timeline: TimelineEvent[];
  fileUrl?: string;
};
