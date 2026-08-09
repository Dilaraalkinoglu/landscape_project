import { Award, BrickWall, Clock, Droplets, Heart, Leaf, Lightbulb, PenTool, Ruler, Scissors, ShieldCheck, Trees } from 'lucide-react';

const icons = { Award, Brick: BrickWall, Clock, Droplets, Heart, Leaf, Lightbulb, PenTool, Ruler, Scissors, ShieldCheck, Trees };

export function Icon({ name, className = 'h-5 w-5' }: { name: string; className?: string }) {
  const Component = icons[name as keyof typeof icons] ?? Leaf;
  return <Component className={className} />;
}
