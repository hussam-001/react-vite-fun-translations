import Button from "view/components/Button";
import Input from "view/components/Input";

export function TranslateForm() {
  return (
    <div className="border-t p-4">
      <div className="max-w-3xl mx-auto">
        <form className="contents" method="POST" action="/translate">
          <fieldset className="flex items-center gap-6">
            {/* implement translation engine here */}
            <Input placeholder="Enter the text to translate here" />
            <Button type="submit">Translate</Button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
