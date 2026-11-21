import {
  Activity, Armchair, Award, Baby, Clock, Cpu, Crown, Droplets, Gem, HeartPulse, Layers, Scissors,
  ShieldCheck, Siren, Smile, Sparkles, Stethoscope, Users, Wallet, type LucideProps,
} from "lucide-react";
import type { IconName } from "@/data/services";

/** Custom tooth icon (Lucide has none) — matches Lucide's 24px / 2px stroke style. */
export function ToothIcon(props: LucideProps) {
  const { size = 24, strokeWidth = 2, ...rest } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      <path d="M12 5.5C10.5 4 8.6 3 6.8 3.3 4.4 3.7 3 5.9 3.2 8.6c.2 2.4 1.2 4 1.8 6.2.6 2.2.8 6.2 2.6 6.2 1.6 0 1.8-3 2.2-4.7.3-1.2.9-2.1 2.2-2.1s1.9.9 2.2 2.1c.4 1.7.6 4.7 2.2 4.7 1.8 0 2-4 2.6-6.2.6-2.2 1.6-3.8 1.8-6.2.2-2.7-1.2-4.9-3.6-5.3C15.4 3 13.5 4 12 5.5Z" />
      <path d="M9.5 6.6 12 8l2.5-1.4" />
    </svg>
  );
}

const map = {
  tooth: ToothIcon, stethoscope: Stethoscope, crown: Crown, smile: Smile, sparkles: Sparkles, gem: Gem,
  layers: Layers, scissors: Scissors, baby: Baby, droplets: Droplets, activity: Activity, siren: Siren,
  shield: ShieldCheck, armchair: Armchair, cpu: Cpu, award: Award, heart: HeartPulse, wallet: Wallet, users: Users, clock: Clock,
} satisfies Record<IconName, React.ComponentType<LucideProps>>;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = map[name];
  return <C aria-hidden="true" {...props} />;
}
