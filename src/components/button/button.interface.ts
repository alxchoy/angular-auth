export interface Button {
  class?: 'primary' | 'outline';
  type?: 'btn' | 'link';
  label: string;
  goTo?: string;
  onAction?: () => void;
}
