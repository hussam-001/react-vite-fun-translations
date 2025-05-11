import { useContext } from "react";

import { AppContext } from "contexts/app.context";
import Button from "view/components/Button";
import Trash2Icon from "view/svg/Trash2Icon";

export default function ClearHistoryButton() {
  const { handleClearStorage } = useContext(AppContext);

  return (
    <Button
      variant="danger"
      className="w-full bg-transparent"
      onClick={handleClearStorage}
    >
      <Trash2Icon />
      <span>Clear History</span>
    </Button>
  );
}
