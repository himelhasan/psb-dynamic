import { PlayerForm } from "../PlayerForm";

export default function NewPlayerPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold uppercase tracking-tight">
        Add player
      </h1>
      <PlayerForm />
    </div>
  );
}
