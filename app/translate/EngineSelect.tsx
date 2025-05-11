import { AppContext } from "contexts/app.context";
import type { Engine } from "domain/types/Engine";
import { useContext } from "react";
import { Select, SelectOption } from "view/components/Select";

export default function EngineSelect() {
  const { engine, setEngine } = useContext(AppContext);
  return (
    <Select
      value={engine}
      onChange={(e) => setEngine(e.target.value as Engine)}
    >
      <SelectOption value="yoda">Yoda</SelectOption>
      <SelectOption value="pirate">Pirate</SelectOption>
    </Select>
  );
}
