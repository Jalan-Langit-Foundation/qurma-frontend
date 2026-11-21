export interface TermsItem {
  term?: string;
  text: string;
  items?: string[];
}

export interface TermsSection {
  id: string;
  title: string;
  intro?: string;
  items: TermsItem[];
  outro?: string;
}

export interface TermsDocument {
  title: string;
  updatedAt: string;
  isDraft: boolean;
  draftNote?: string | null;
  intro: string;
  sections: TermsSection[];
}
