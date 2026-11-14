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
  intro: string;
  sections: TermsSection[];
}
