import { Form, useSubmit } from "react-router";
import Button from "view/components/Button";
import Input from "view/components/Input";

export function TranslateForm() {
  const submit = useSubmit();
  return (
    <div className="border-t p-4">
      <div className="max-w-3xl mx-auto">
        <Form
          className="contents"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            submit(e.currentTarget);
            e.currentTarget.reset();
          }}
        >
          <fieldset className="flex items-center gap-6">
            {/* implement translation engine here */}
            <Input name="text" placeholder="Enter the text to translate here" />
            <Button type="submit">Translate</Button>
          </fieldset>
        </Form>
      </div>
    </div>
  );
}
