import { useRef, type KeyboardEvent } from "react";
import { Form, useSubmit } from "react-router";
import Button from "view/components/Button";
import Textarea from "view/components/Textarea";
import SendHorizontalIcon from "view/svg/SendHorizontalIcon";

export function TranslateForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit(formRef.current!);
      formRef.current!.reset();
    }
  };

  return (
    <div className="border-t p-4">
      <div className="max-w-3xl mx-auto">
        <Form
          ref={formRef}
          className="contents"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            submit(e.currentTarget);
            e.currentTarget.reset();
          }}
        >
          <fieldset className="w-full rounded-lg border bg-card-background text-white shadow-sm flex items-end p-2">
            <Textarea
              name="text"
              placeholder="Enter the text to translate here"
              className="w-full border-none outline-none field-sizing-content max-h-[200px]"
              onKeyDown={handleKeyDown}
            />

            <div className="mb-1">
              <Button
                type="submit"
                variant="primary"
                className="p-2! rounded-full!"
              >
                <SendHorizontalIcon />
              </Button>
            </div>
          </fieldset>
        </Form>
      </div>
    </div>
  );
}
