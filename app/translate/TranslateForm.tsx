import { AppContext } from "contexts/app.context";
import { useContext, useRef, type KeyboardEvent } from "react";
import { Form, useSubmit } from "react-router";
import Button from "view/components/Button";
import Textarea from "view/components/Textarea";
import LoaderCircleIcon from "view/svg/LoaderCircleIcon";
import SendHorizontalIcon from "view/svg/SendHorizontalIcon";
import EngineSelect from "./EngineSelect";

export function TranslateForm() {
  const submit = useSubmit();
  const formRef = useRef<HTMLFormElement>(null);
  const { isLoading, setIsLoading } = useContext(AppContext);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setIsLoading(true);
    await submit(formRef.current!).finally(() => setIsLoading(false));
    formRef.current!.reset();
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await handleSubmit();
    }
  };

  return (
    <div className="border-t p-4">
      <div className="max-w-3xl mx-auto">
        <Form
          ref={formRef}
          className="contents"
          method="POST"
          onSubmit={handleSubmit}
        >
          <fieldset>
            <EngineSelect />
            <div className="mt-3 w-full rounded-lg border bg-card-background text-white shadow-sm flex items-end p-2">
              <Textarea
                name="text"
                placeholder="Enter the text to translate here"
                className="w-full border-none outline-none field-sizing-content max-h-[200px]"
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />

              <div className="mb-1">
                <Button
                  type="submit"
                  variant="primary"
                  className="p-2! rounded-full!"
                  disabled={isLoading}
                >
                  {isLoading ? <LoaderCircleIcon /> : <SendHorizontalIcon />}
                </Button>
              </div>
            </div>
          </fieldset>
        </Form>
      </div>
    </div>
  );
}
