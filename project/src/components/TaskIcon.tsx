import {
  Lightbulb,
  MessageCircle,
  ListChecks,
  FileText,
  Route,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  lightbulb: Lightbulb,
  'message-circle': MessageCircle,
  'list-checks': ListChecks,
  'file-text': FileText,
  route: Route,
};

export function TaskIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] ?? Lightbulb;
  return <Icon className={className} />;
}
