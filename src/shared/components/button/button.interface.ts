export interface Button {
  class?: 'primary' | 'outline';
  label: string;
  onAction?: () => void;
}
